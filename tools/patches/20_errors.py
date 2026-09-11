#!/usr/bin/env python3
"""Typed errors, retry and pagination for the TypeScript SDK (FR-006d to FR-006h). Idempotent."""

from __future__ import annotations

import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent.parent
SRC = ROOT / "src"
SRC.mkdir(exist_ok=True)

(SRC / "errors.ts").write_text('''/**
 * Typed errors for the Flat API.
 *
 * Branch on the error class, not the status code: rate limiting and authorization failures both
 * return HTTP 403 and are separated only by the response body's `code`.
 */

export const RATE_LIMIT_CODE = 'API_RATE_LIMIT_EXCEEDED';
const QUOTA_CODES = new Set(['QUOTA_EXCEEDED', 'CREDITS_EXHAUSTED', 'OMR_CREDITS_EXHAUSTED']);

export interface FlatErrorBody {
  code?: string;
  message?: string;
  /** Present only for internal and backend errors, so treat it as optional. */
  id?: string;
}

export class FlatError extends Error {
  readonly status?: number;
  readonly code?: string;
  readonly requestId?: string;
  readonly headers: Record<string, string>;
  readonly body: unknown;

  constructor(
    message: string,
    opts: { status?: number; code?: string; requestId?: string; headers?: Record<string, string>; body?: unknown } = {},
  ) {
    super(message);
    this.name = new.target.name;
    this.status = opts.status;
    this.code = opts.code;
    this.requestId = opts.requestId;
    this.headers = opts.headers ?? {};
    this.body = opts.body;
  }
}

/** The token is missing, invalid or expired, or a refresh failed. Re-authorize. */
export class FlatAuthenticationError extends FlatError {}
/** Authenticated but not permitted: a missing scope or insufficient permission. */
export class FlatAuthorizationError extends FlatError {}
/** The request body or parameters failed validation. */
export class FlatValidationError extends FlatError {}
/** The resource does not exist, or is not visible to this token. */
export class FlatNotFoundError extends FlatError {}
/** A metered resource, such as OMR credits, is exhausted. */
export class FlatQuotaError extends FlatError {}
/** An internal or backend error. `requestId` is normally set here. */
export class FlatServerError extends FlatError {}

/** The account or IP exceeded its request quota. Returned as HTTP 403, not 429. */
export class FlatRateLimitError extends FlatError {
  readonly limit?: number;
  readonly remaining?: number;
  /** UTC epoch seconds at which the window resets. Flat sends no Retry-After header. */
  readonly reset?: number;

  constructor(message: string, opts: ConstructorParameters<typeof FlatError>[1] = {}) {
    super(message, opts);
    this.limit = intHeader(this.headers, 'x-ratelimit-limit');
    this.remaining = intHeader(this.headers, 'x-ratelimit-remaining');
    this.reset = intHeader(this.headers, 'x-ratelimit-reset');
  }
}

function intHeader(headers: Record<string, string>, name: string): number | undefined {
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === name) {
      const parsed = Number.parseInt(value, 10);
      return Number.isNaN(parsed) ? undefined : parsed;
    }
  }
  return undefined;
}

export function fromResponse(status: number, body: unknown, headers: Record<string, string> = {}): FlatError {
  const payload = (typeof body === 'object' && body !== null ? body : {}) as FlatErrorBody;
  const message = payload.message ?? `HTTP ${status}`;
  const opts = { status, code: payload.code, requestId: payload.id, headers, body };

  if (status === 403 && payload.code === RATE_LIMIT_CODE) return new FlatRateLimitError(message, opts);
  if (payload.code && QUOTA_CODES.has(payload.code)) return new FlatQuotaError(message, opts);
  if (status === 401) return new FlatAuthenticationError(message, opts);
  if (status === 403) return new FlatAuthorizationError(message, opts);
  if (status === 404) return new FlatNotFoundError(message, opts);
  if (status === 400 || status === 422) return new FlatValidationError(message, opts);
  if (status >= 500) return new FlatServerError(message, opts);
  return new FlatError(message, opts);
}
''')

(SRC / "retry.ts").write_text('''/**
 * Retry policy for the Flat API.
 *
 * Flat does not follow the usual conventions, and getting this wrong is silent:
 *   - rate limiting returns 403, not 429
 *   - there is no Retry-After header; the reset is `X-RateLimit-Reset`, UTC epoch seconds
 *   - a plain 403 is a genuine authorization failure and must never be retried
 */

import { FlatError, FlatRateLimitError, FlatServerError } from './errors.js';

/** Methods safe to replay. A non-idempotent request that may already have been applied is not. */
const IDEMPOTENT = new Set(['GET', 'HEAD', 'OPTIONS', 'PUT', 'DELETE']);
const MAX_RATE_LIMIT_WAIT_MS = 300_000;

export interface RetryPolicy {
  attempts: number;
  backoffBaseMs: number;
  backoffMaxMs: number;
  jitter: number;
  respectRateLimitReset: boolean;
}

export const defaultRetryPolicy: RetryPolicy = {
  attempts: 3,
  backoffBaseMs: 500,
  backoffMaxMs: 30_000,
  jitter: 0.25,
  respectRateLimitReset: true,
};

/** No retries. Errors still arrive typed, and a rate-limit error still carries its reset. */
export const noRetry: RetryPolicy = { ...defaultRetryPolicy, attempts: 1 };

export function shouldRetry(policy: RetryPolicy, error: unknown, method: string, attempt: number): boolean {
  if (attempt >= policy.attempts) return false;
  if (!IDEMPOTENT.has(method.toUpperCase())) return false;
  if (error instanceof FlatRateLimitError) return true;
  if (error instanceof FlatServerError) return true;
  // A transport failure before the request was sent is safe to replay.
  return error instanceof TypeError && !(error instanceof FlatError);
}

export function delayFor(policy: RetryPolicy, error: unknown, attempt: number): number {
  if (policy.respectRateLimitReset && error instanceof FlatRateLimitError && error.reset !== undefined) {
    const waitMs = error.reset * 1000 - Date.now();
    if (waitMs > 0) return Math.min(waitMs + Math.random() * policy.jitter * 1000, MAX_RATE_LIMIT_WAIT_MS);
  }
  const exponential = Math.min(policy.backoffBaseMs * 2 ** (attempt - 1), policy.backoffMaxMs);
  return exponential + Math.random() * policy.jitter * exponential;
}

export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
''')

(SRC / "pagination.ts").write_text('''/**
 * Cursor pagination for the Flat API.
 *
 * Eight operations at v2.25.0 are cursor-paginated, identified by a `next` query parameter. That
 * parameter is a shared component (`#/components/parameters/next`): any tool that reads an
 * operation's parameters without resolving `$ref` under-counts them and ships collections that
 * silently truncate.
 *
 * The cursor is not in the response body. It arrives in the `Link` header, which the specification
 * does not declare, so it is parsed at runtime from the raw response.
 */

const LINK = /<([^>]+)>\\s*;\\s*rel="([^"]+)"/g;

/** Parse an RFC 5988 Link header into { rel: url }. */
export function parseLinkHeader(value: string | null | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  if (!value) return out;
  for (const match of value.matchAll(LINK)) out[match[2]] = match[1];
  return out;
}

/**
 * Extract the opaque `next` cursor from a response's Link header, if any.
 *
 * Decoded, not captured raw. The cursor arrives percent-encoded inside the Link header's URL, and
 * the client encodes whatever it is handed when it builds the next request, so passing the encoded
 * form through sends it encoded twice and the server rejects the cursor it issued a moment ago.
 * URLSearchParams applies the same rules the server used to write it, so an opaque value
 * round-trips exactly.
 */
export function nextCursor(headers: Headers | Record<string, string> | undefined): string | undefined {
  if (!headers) return undefined;
  const link = headers instanceof Headers
    ? headers.get('link')
    : Object.entries(headers).find(([k]) => k.toLowerCase() === 'link')?.[1];
  const url = parseLinkHeader(link).next;
  if (!url) return undefined;
  try {
    return new URL(url).searchParams.get('next') ?? undefined;
  } catch {
    // A relative or malformed URL: fall back to reading the query string directly.
    const query = url.includes('?') ? url.slice(url.indexOf('?') + 1) : '';
    return new URLSearchParams(query).get('next') ?? undefined;
  }
}

export interface RawPage<T> {
  value(): Promise<T[]>;
  raw: Response;
}

/**
 * Yield every item across all pages of a cursor-paginated operation.
 *
 * `fetchPage` must be the generated `*Raw` variant, which returns the Response the cursor lives in.
 * A token expiring mid-traversal is refreshed by the client and the traversal resumes from the same
 * cursor, so no page is skipped or repeated.
 */
export async function* paginate<T, P extends { next?: string }>(
  fetchPage: (params: P) => Promise<RawPage<T>>,
  params: P,
): AsyncGenerator<T, void, undefined> {
  let cursor = params.next;
  const seen = new Set<string>();

  for (;;) {
    const page = await fetchPage({ ...params, next: cursor } as P);
    for (const item of await page.value()) yield item;

    cursor = nextCursor(page.raw.headers);
    if (!cursor) return;
    // A server that returns a cursor it already gave us would loop forever.
    if (seen.has(cursor)) return;
    seen.add(cursor);
  }
}
''')
# The generated runtime throws its own ResponseError, so a caller who follows the README and
# catches FlatNotFoundError catches nothing: errors.ts defined the whole hierarchy and no code path
# ever constructed one. Rewire the single raise site that carries an HTTP status.
RUNTIME = SRC / "runtime.ts"
runtime = RUNTIME.read_text()

MARKER = "// BEGIN typed errors (tools/patches/20_errors.py)"
generated = """        if (response && (response.status >= 200 && response.status < 300)) {
            return response;
        }
        throw new ResponseError(response, 'Response returned an error code');"""
typed = """        if (response && (response.status >= 200 && response.status < 300)) {
            return response;
        }
        """ + MARKER + """
        // The body is read here rather than by the caller: a Response body can only be consumed
        // once, and the typed error needs it to tell a rate limit from an authorization failure.
        // Both are HTTP 403 and only the body's `code` separates them.
        let body: unknown;
        try {
            body = await response.clone().json();
        } catch {
            body = undefined;
        }
        const headers: Record<string, string> = {};
        response.headers.forEach((value, key) => { headers[key] = value; });
        throw fromResponse(response.status, body, headers);
        // END typed errors (tools/patches/20_errors.py)"""

if generated not in runtime and MARKER not in runtime:
    sys.exit("20_errors: could not find the raise site in runtime.ts (FR-025)")

if MARKER not in runtime:
    runtime = runtime.replace(generated, typed, 1)
    # The import goes with the other first-party imports, after the generated header block.
    import_line = "import { fromResponse } from './errors.js';\n"
    if import_line not in runtime:
        anchor_import = "export const BASE_PATH = "
        if anchor_import not in runtime:
            sys.exit("20_errors: could not find an anchor for the errors import in runtime.ts")
        runtime = runtime.replace(anchor_import, import_line + "\n" + anchor_import, 1)
    RUNTIME.write_text(runtime)

print("    typescript: errors.ts, retry.ts, pagination.ts, typed errors thrown from runtime.ts")
