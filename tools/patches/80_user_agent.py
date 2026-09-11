#!/usr/bin/env python3
"""Flat-branded User-Agent for the TypeScript client. Idempotent.

typescript-fetch sets no User-Agent at all, so these calls are anonymous in the API logs.

Browsers forbid scripts from setting User-Agent (the header is on the forbidden list and the
assignment is silently dropped), so this sets it only off-browser. Sending a custom header instead
would be worse: it would require a CORS preflight allowance that the API may not grant, turning a
telemetry nicety into a broken request.
"""

from __future__ import annotations

import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent.parent
TARGET = ROOT / "src" / "userAgent.ts"
version = (ROOT / "VERSION").read_text().strip()

TARGET.write_text(f'''/**
 * Flat-branded User-Agent.
 *
 * Browsers forbid setting User-Agent from script, so this returns no header there. Node, Deno and
 * Bun all get one.
 */

export const SDK_VERSION = '{version}';

const isBrowser =
  typeof globalThis === 'object' &&
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typeof (globalThis as any).window !== 'undefined' &&
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typeof (globalThis as any).document !== 'undefined';

function runtime(): string {{
  const g = globalThis as Record<string, any>;
  if (g.Deno?.version?.deno) return `deno/${{g.Deno.version.deno}}`;
  if (g.Bun?.version) return `bun/${{g.Bun.version}}`;
  if (g.process?.versions?.node) return `node/${{g.process.versions.node}}`;
  return 'unknown';
}}

export function userAgent(): string {{
  return `Flat-SDK-TypeScript/${{SDK_VERSION}} (${{runtime()}})`;
}}

/** Headers to merge into every request. Empty in a browser, by necessity. */
export function userAgentHeaders(): Record<string, string> {{
  return isBrowser ? {{}} : {{ 'User-Agent': userAgent() }};
}}
''')

# Wire it into the client's default headers.
client = ROOT / "src" / "client.ts"
text = client.read_text()
if "userAgentHeaders" not in text:
    text = text.replace(
        "import { defaultRetryPolicy, type RetryPolicy } from './retry.js';",
        "import { defaultRetryPolicy, type RetryPolicy } from './retry.js';\n"
        "import { userAgentHeaders } from './userAgent.js';",
    )
    text = text.replace(
        "    this.configuration = new Configuration({\n"
        "      basePath: this.baseUrl,",
        "    this.configuration = new Configuration({\n"
        "      basePath: this.baseUrl,\n"
        "      headers: userAgentHeaders(),",
    )
    client.write_text(text)

if not TARGET.is_file():
    sys.exit("80_user_agent: userAgent.ts was not written (FR-025)")
print(f"    user-agent: Flat-SDK-TypeScript/{version}")
