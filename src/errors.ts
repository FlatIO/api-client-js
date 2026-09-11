/**
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
