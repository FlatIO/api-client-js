#!/usr/bin/env python3
"""Drop `instanceOfX` imports the generator emits but never uses (FR-025).

For a `oneOf` model the generator imports an `instanceOfVariant` helper from every variant. It
needs them only to identify an untagged union member by shape; when the schema has a
discriminator it dispatches on the discriminator property instead and the imports go unused.

Harmless until a variant is itself a `oneOf`. A union has no `instanceOf` helper to export, so
the import resolves to nothing and tsc fails the build with TS2305. `LtiConfiguration` hits this:
it is a oneOf over `LtiConfiguration1p1` and `LtiConfiguration1p3`, and `LtiConfiguration1p3` is
a discriminated union over its three modes.

Only identifiers named `instanceOf*` that appear exactly once in the file, in the import itself,
are removed. An unused import cannot be load-bearing, so this cannot change behaviour.

Idempotent: a second run finds nothing left to remove.
"""

from __future__ import annotations

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent.parent
SOURCES = sorted((ROOT / "src").rglob("*.ts"))

IMPORTED = re.compile(r"^\s*(instanceOf[A-Za-z0-9_$]*),?\s*$")

if not SOURCES:
    sys.exit("86_dead_instanceof_imports: no sources under src/ (FR-025)")

removed = 0
touched = 0
for source in SOURCES:
    text = source.read_text()
    if "instanceOf" not in text:
        continue

    kept: list[str] = []
    dropped: list[str] = []
    for line in text.split("\n"):
        match = IMPORTED.match(line)
        # One occurrence means this import line is the only mention: nothing uses it.
        if match and len(re.findall(rf"\b{re.escape(match.group(1))}\b", text)) == 1:
            dropped.append(match.group(1))
            continue
        kept.append(line)

    if not dropped:
        continue

    new_text = "\n".join(kept)
    # An import block emptied of every specifier would leave `import {\n} from '...'`.
    new_text = re.sub(r"import \{\s*\n\s*\} from '[^']+';\n", "", new_text)
    source.write_text(new_text)
    removed += len(dropped)
    touched += 1

print(f"    dead imports: removed {removed} unused instanceOf import(s) from {touched} file(s)")
