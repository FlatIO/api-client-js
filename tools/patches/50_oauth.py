#!/usr/bin/env python3
"""OAuth2, client and exports for the TypeScript SDK (FR-006g to FR-006l). Idempotent."""

from __future__ import annotations

import pathlib
import sys
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent.parent
SRC = ROOT / "src"

(SRC / "oauth.ts").write_text('''/**
 * OAuth2 support for the Flat API.
 *
 * The public specification declares one security scheme: OAuth2 authorization-code with 23 scopes.
 * A Personal Access Token is an OAuth access token for your own account, so passing a token
 * straight to the client covers both cases.
 *
 * A refresh token is only issued when the authorization request sets `access_type=offline`.
 *
 * This module never stores a token. Persistence is deployment-specific, so refreshed tokens go to a
 * callback you supply.
 */

import { FlatAuthenticationError } from './errors.js';

const AUTHORIZE_URL = 'https://flat.io/auth/oauth';
const TOKEN_URL = 'https://api.flat.io/oauth/access_token';
/** Refresh slightly before nominal expiry, to avoid racing the server clock. */
const EXPIRY_SKEW_MS = 30_000;

export interface Tokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}

export function tokensFromResponse(payload: Record<string, unknown>): Tokens {
  const expiresIn = payload.expires_in as number | undefined;
  return {
    accessToken: payload.access_token as string,
    refreshToken: payload.refresh_token as string | undefined,
    expiresAt: expiresIn ? Date.now() + expiresIn * 1000 : undefined,
  };
}

export const isExpired = (tokens: Tokens): boolean =>
  tokens.expiresAt !== undefined && Date.now() >= tokens.expiresAt - EXPIRY_SKEW_MS;

export class OAuth2Helper {
  constructor(
    private readonly clientId: string,
    private readonly clientSecret: string,
    private readonly redirectUri: string,
  ) {}

  /** URL to send a user to. `offline` is what yields a refresh token. */
  authorizeUrl(scopes: string[], state: string, { offline = true }: { offline?: boolean } = {}): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: scopes.join(' '),
      state,
    });
    if (offline) params.set('access_type', 'offline');
    return `${AUTHORIZE_URL}?${params.toString()}`;
  }

  exchangeCode(code: string): Promise<Tokens> {
    return this.tokenRequest({ grant_type: 'authorization_code', code, redirect_uri: this.redirectUri });
  }

  refresh(refreshToken: string): Promise<Tokens> {
    return this.tokenRequest({ grant_type: 'refresh_token', refresh_token: refreshToken });
  }

  private async tokenRequest(payload: Record<string, string>): Promise<Tokens> {
    const response = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ ...payload, client_id: this.clientId, client_secret: this.clientSecret }),
    });
    if (!response.ok) {
      throw new FlatAuthenticationError('OAuth2 token request failed; the user must re-authorize', {
        status: response.status,
      });
    }
    return tokensFromResponse((await response.json()) as Record<string, unknown>);
  }
}

/**
 * Holds the current tokens and refreshes them at most once at a time.
 *
 * Single-flight matters: two concurrent requests hitting an expired token must not both refresh,
 * because the second refresh would invalidate the token the first just obtained.
 */
export class TokenManager {
  private inFlight?: Promise<string>;

  constructor(
    private tokens: Tokens,
    private readonly helper?: OAuth2Helper,
    private readonly onTokenRefresh?: (tokens: Tokens) => void | Promise<void>,
  ) {}

  /**
   * The token to send, refreshed first if it has expired.
   *
   * This used to return the stored token whatever its state, which made `expiresAt` dead data:
   * every request after the expiry failed with a 401 that a refresh would have avoided. Refreshes
   * share one in-flight promise, so a burst of concurrent requests spends a single round trip.
   */
  async accessToken(): Promise<string> {
    if (!this.expired()) return this.tokens.accessToken;
    return this.refresh();
  }

  /** True once the token is within the skew of its expiry. Unknown expiry counts as not expired. */
  expired(): boolean {
    if (this.tokens.expiresAt === undefined) return false;
    return Date.now() >= this.tokens.expiresAt - EXPIRY_SKEW_MS;
  }

  async refresh(): Promise<string> {
    this.inFlight ??= this.doRefresh().finally(() => {
      this.inFlight = undefined;
    });
    return this.inFlight;
  }

  private async doRefresh(): Promise<string> {
    if (!this.helper || !this.tokens.refreshToken) {
      throw new FlatAuthenticationError(
        'the access token expired and no refresh token is available; the user must re-authorize',
      );
    }
    this.tokens = await this.helper.refresh(this.tokens.refreshToken);
    await this.onTokenRefresh?.(this.tokens);
    return this.tokens.accessToken;
  }
}
''')

# The APIs the generator emitted, read from its own barrel rather than hardcoded: a list that
# drifts from the generator is a NameError waiting for whichever call reaches it first.
apis_index = (SRC / "apis" / "index.ts").read_text()
API_CLASSES = sorted(set(re.findall(r"export \* from '\./(\w+Api)\.js';", apis_index)))
if not API_CLASSES:
    sys.exit("50_oauth: no generated *Api classes found in apis/index.ts (FR-025)")

# scores before users: two APIs define getUserScores, and paginate resolves an operation by asking
# each in turn, so the order has to be deterministic and documented.
SHORT_NAMES = {
    "AccountApi": "account",
    "ClassApi": "classes",
    "CollectionApi": "collections",
    "EduResourcesApi": "eduResources",
    "GroupApi": "groups",
    "OMRApi": "omr",
    "OrganizationApi": "organization",
    "ScoreApi": "scores",
    "TaskApi": "tasks",
    "UserApi": "users",
}
missing = [c for c in API_CLASSES if c not in SHORT_NAMES]
if missing:
    sys.exit(f"50_oauth: generated APIs with no short name: {', '.join(missing)}")

ORDER = ["AccountApi", "ClassApi", "CollectionApi", "EduResourcesApi", "GroupApi",
         "OMRApi", "OrganizationApi", "ScoreApi", "TaskApi", "UserApi"]
ordered = [c for c in ORDER if c in API_CLASSES]

api_imports = "import {\n" + "".join(f"  {c},\n" for c in ordered) + "} from './apis/index.js';"
accessors = "\n\n".join(
    f"""  /** The generated {c}, built on this client's configuration. */
  get {SHORT_NAMES[c]}(): {c} {{
    return (this.#apis.{SHORT_NAMES[c]} ??= new {c}(this.configuration)) as {c};
  }}"""
    for c in ordered
)
api_fields = "\n".join(f"    {SHORT_NAMES[c]}?: {c};" for c in ordered)
api_list = ", ".join(f"this.{SHORT_NAMES[c]}" for c in ordered)

(SRC / "client.ts").write_text(f'''/** The entry point a developer actually uses. */

import {{ Configuration }} from './runtime.js';
import {{ OAuth2Helper, TokenManager, type Tokens }} from './oauth.js';
import {{ defaultRetryPolicy, shouldRetry, delayFor, sleep, type RetryPolicy }} from './retry.js';
import {{ fromResponse }} from './errors.js';
import {{ paginate, type RawPage }} from './pagination.js';
import {{ userAgentHeaders }} from './userAgent.js';
{api_imports}

export const DEFAULT_BASE_URL = 'https://api.flat.io/v2';
/** A finite default. Waiting forever is not an acceptable default for an SDK. */
export const DEFAULT_TIMEOUT_MS = 30_000;

export interface FlatClientOptions {{
  accessToken?: string;
  tokens?: Tokens;
  oauth?: OAuth2Helper;
  onTokenRefresh?: (tokens: Tokens) => void | Promise<void>;
  baseUrl?: string;
  timeoutMs?: number;
  retry?: RetryPolicy;
  fetchApi?: typeof fetch;
}}

export class FlatClient {{
  readonly tokens: TokenManager;
  readonly retry: RetryPolicy;
  readonly baseUrl: string;
  readonly timeoutMs: number;
  readonly configuration: Configuration;

  #apis: {{
{api_fields}
  }} = {{}};

  constructor(options: FlatClientOptions) {{
    const {{ accessToken, tokens, oauth, onTokenRefresh }} = options;
    if (!accessToken && !tokens) throw new Error('pass either accessToken or tokens');

    this.tokens = new TokenManager(tokens ?? {{ accessToken: accessToken as string }}, oauth, onTokenRefresh);
    this.retry = options.retry ?? defaultRetryPolicy;
    this.baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;

    this.configuration = new Configuration({{
      basePath: this.baseUrl,
      headers: userAgentHeaders(),
      // The scheme is added here. The generator assigns this value straight into the
      // Authorization header with no prefix, and Flat happens to accept a bare token, but the
      // Ruby and PHP clients both send `Bearer` and a server that tightened to require the scheme
      // would break this client alone.
      //
      // Async on purpose: the manager refreshes an expired token here, and Configuration accepts a
      // function returning a Promise, so expiry is handled before a request is ever sent.
      accessToken: async () => {{
        const token = await this.tokens.accessToken();
        return /^bearer /i.test(token) ? token : `Bearer ${{token}}`;
      }},
      fetchApi: this.#retryingFetch(options.fetchApi),
    }});
  }}

  /**
   * Every request goes through the retry policy.
   *
   * Wrapping fetch rather than each of the generated methods: typescript-fetch has no single call
   * site to wrap, and a policy that only some operations honour is worse than none. The decision
   * needs the typed error rather than the status code, because Flat returns 403 both for rate
   * limiting and for a genuine authorization failure and only the body's `code` separates them, so
   * the error is built here. The response is still returned unchanged on the last attempt: the
   * runtime throws it, which keeps one raise site.
   */
  #retryingFetch(inner?: typeof fetch): typeof fetch {{
    const base = inner ?? ((...args: Parameters<typeof fetch>) => fetch(...args));
    const policy = () => this.retry;

    return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {{
      const method = (init?.method ?? 'GET').toUpperCase();
      for (let attempt = 1; ; attempt += 1) {{
        let response: Response;
        try {{
          // A finite timeout on every request. Without it a stalled connection hangs forever,
          // which is not an acceptable default for an SDK. A caller's own signal still aborts:
          // AbortSignal.any settles on whichever fires first.
          const timeout = AbortSignal.timeout(this.timeoutMs);
          const caller = init?.signal ?? undefined;
          const signal = caller ? AbortSignal.any([caller, timeout]) : timeout;
          response = await base(input, {{ ...init, signal }});
        }} catch (error) {{
          // fetch rejects rather than resolving on a DNS or connection failure, so without this
          // the rejection escaped the loop and the retry policy never saw a transport error,
          // which is the one case it is most clearly meant to cover.
          if (!shouldRetry(policy(), error, method, attempt)) throw error;
          await sleep(delayFor(policy(), error, attempt));
          continue;
        }}
        if (response.ok) return response;

        let body: unknown;
        try {{
          body = await response.clone().json();
        }} catch {{
          body = undefined;
        }}
        const headers: Record<string, string> = {{}};
        response.headers.forEach((value, key) => {{ headers[key] = value; }});
        const error = fromResponse(response.status, body, headers);

        if (!shouldRetry(policy(), error, method, attempt)) return response;
        await sleep(delayFor(policy(), error, attempt));
      }}
    }};
  }}

{accessors}

  /**
   * Every item across every page of a cursor-paginated operation.
   *
   *   for await (const collection of client.paginate('listCollections', {{ parent: 'user' }})) {{ ... }}
   *
   * The operation is named rather than passed, because the generated methods are instance methods
   * and an unbound reference loses `this`. An operation that does not paginate yields its single
   * page, so this is always safe to reach for.
   */
  paginate<T>(operation: string, params: Record<string, unknown> = {{}}): AsyncGenerator<T, void, undefined> {{
    const method = `${{operation}}Raw`;
    const owner = [{api_list}].find(
      (api) => typeof (api as unknown as Record<string, unknown>)[method] === 'function',
    );
    if (!owner) throw new Error(`no operation ${{operation}} on any Flat API`);

    const fetchPage = (p: Record<string, unknown>) =>
      (owner as unknown as Record<string, (q: unknown) => Promise<RawPage<T>>>)[method]!(p);
    return paginate<T, Record<string, unknown> & {{ next?: string }}>(fetchPage, params);
  }}
}}
''')

index = SRC / "index.ts"
marker = "// --- flat-api ergonomic surface (tools/patches/50_oauth.py) ---"
generated = index.read_text() if index.is_file() else ""
if marker in generated:
    generated = generated.split("// --- end ---", 1)[-1]
generated = generated.lstrip("\n")

index.write_text(
    f"""{marker}
export {{ FlatClient, DEFAULT_BASE_URL, DEFAULT_TIMEOUT_MS }} from './client.js';
export type {{ FlatClientOptions }} from './client.js';
export {{
  FlatError,
  FlatAuthenticationError,
  FlatAuthorizationError,
  FlatRateLimitError,
  FlatValidationError,
  FlatNotFoundError,
  FlatQuotaError,
  FlatServerError,
  fromResponse,
}} from './errors.js';
export {{ OAuth2Helper, TokenManager }} from './oauth.js';
export type {{ Tokens }} from './oauth.js';
export {{ paginate, parseLinkHeader, nextCursor }} from './pagination.js';
export {{ defaultRetryPolicy, noRetry, shouldRetry, delayFor, sleep }} from './retry.js';
export type {{ RetryPolicy }} from './retry.js';
// --- end ---
{generated}"""
)
print("    typescript: oauth.ts, client.ts, index.ts")
