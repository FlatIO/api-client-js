/**
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
