/**
 * Flat-branded User-Agent.
 *
 * Browsers forbid setting User-Agent from script, so this returns no header there. Node, Deno and
 * Bun all get one.
 */

export const SDK_VERSION = '1.0.0';

const isBrowser =
  typeof globalThis === 'object' &&
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typeof (globalThis as any).window !== 'undefined' &&
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typeof (globalThis as any).document !== 'undefined';

function runtime(): string {
  const g = globalThis as Record<string, any>;
  if (g.Deno?.version?.deno) return `deno/${g.Deno.version.deno}`;
  if (g.Bun?.version) return `bun/${g.Bun.version}`;
  if (g.process?.versions?.node) return `node/${g.process.versions.node}`;
  return 'unknown';
}

export function userAgent(): string {
  return `Flat-SDK-TypeScript/${SDK_VERSION} (${runtime()})`;
}

/** Headers to merge into every request. Empty in a browser, by necessity. */
export function userAgentHeaders(): Record<string, string> {
  return isBrowser ? {} : { 'User-Agent': userAgent() };
}
