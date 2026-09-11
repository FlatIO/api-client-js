/**
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
