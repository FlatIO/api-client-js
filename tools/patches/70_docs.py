#!/usr/bin/env python3
"""Verify the generated TypeScript code carries the specification's documentation (FR-004).

emit_inventory.py records what the *specification* documents. That is necessary but not sufficient:
the generator can drop a description on the way through. This checks the generated source itself and
fails loudly if operation documentation is missing, so a silent regression in generator
configuration cannot ship an undocumented SDK.

Idempotent: it inspects and reports, it does not rewrite.
"""

from __future__ import annotations

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent.parent
SOURCES = ["src/apis/*.ts"]

#: Below this, the generator has stopped propagating descriptions and the config is wrong.
THRESHOLD = 0.95

OPERATION = re.compile(r"^    async (?!.*Raw\()(\w+)\(", re.M)


def main() -> int:
    files = [p for glob in SOURCES for p in ROOT.glob(glob)]
    if not files:
        print("    docs: no generated sources found", file=sys.stderr)
        return 1

    total = documented = 0
    undocumented: list[str] = []

    for path in sorted(files):
        text = path.read_text()
        for match in OPERATION.finditer(text):
            total += 1
            # The doc comment, if any, is the block immediately preceding the declaration.
            # Locate it by walking back to the nearest close marker rather than using a fixed
            # window: generated parameter docs routinely run past any window worth guessing.
            preceding = text[: match.start()]
            close = preceding.rfind("*/")
            open_ = preceding.rfind("/**", 0, close) if close != -1 else -1
            between = preceding[close + 2 :].strip() if close != -1 else "x"
            doc = preceding[open_ + 3 : close] if open_ != -1 and between == "" else ""
            if len(doc.strip()) > 20:
                documented += 1
            else:
                undocumented.append(f"{path.name}:{match.group(1)}")

    if total == 0:
        print("    docs: no operations found to check", file=sys.stderr)
        return 1

    ratio = documented / total
    print(f"    docs: {documented}/{total} operations documented ({ratio:.1%})")

    if ratio < THRESHOLD:
        print(f"    docs: FAIL below {THRESHOLD:.0%} (FR-004)", file=sys.stderr)
        for name in undocumented[:10]:
            print(f"      undocumented: {name}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
