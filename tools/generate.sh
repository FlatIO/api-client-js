#!/usr/bin/env bash
# Regenerate the Flat TypeScript SDK from the public OpenAPI specification.
#
# Self-contained (FR-023): fetches the spec, runs the pinned generator into a scratch tree, copies
# only the paths .sdkgen.yaml declares generated, applies patches, emits the inventory, bumps.
#
# Generating into a scratch tree and copying selectively makes FR-025d structural: the generator
# cannot write outside the declared zone, so protected files can never be clobbered.
#
#   SPEC_REF         api-reference release tag   (default: latest release)
#   SPEC_LOCAL_FILE  use this local spec instead
#   BUMP             patch | minor | major | none  (default: patch)
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"
# shellcheck source=tools/lib/generate-common.sh
source tools/lib/generate-common.sh

# VERSION is the durable source of truth, outside the generated zone.
CUR_VERSION="$(cat VERSION 2>/dev/null || true)"
[ -n "$CUR_VERSION" ] || CUR_VERSION="$(read_version || echo '2.0.0')"
log "Current version $CUR_VERSION"

resolve_spec

SCRATCH=".sdkgen-scratch"
rm -rf "$SCRATCH"
trap 'rm -rf "$SCRATCH"; cleanup_spec' EXIT

log "Generating"
run_generator "$(manifest_get 'generator.name')" "tools/openapi-config.json" "$SCRATCH/out"

log "Wiping the generated zone"
zone_wipe

log "Installing the generated zone"
mkdir -p src docs/reference .openapi-generator
cp -R "$SCRATCH/out/src/." src/
[ -d "$SCRATCH/out/docs" ] && cp -R "$SCRATCH/out/docs/." docs/reference/
[ -d "$SCRATCH/out/.openapi-generator" ] && cp -R "$SCRATCH/out/.openapi-generator/." .openapi-generator/

log "Applying post-generation patches"
for patch in tools/patches/*.py; do
  [ -f "$patch" ] || continue
  log "  $(basename "$patch")"
  python3 "$patch" || die "patch $(basename "$patch") failed (FR-025)"
done

log "Emitting operation inventory"
python3 tools/emit_inventory.py

NEW_VERSION="$(apply_bump "$CUR_VERSION")"
log "Version -> $NEW_VERSION"
python3 - "$NEW_VERSION" <<'VW'
import json, pathlib, sys
p = pathlib.Path("package.json"); d = json.loads(p.read_text())
d["version"] = sys.argv[1]
p.write_text(json.dumps(d, indent=2) + "\n")
VW
echo "$NEW_VERSION" > VERSION

log "Done. Version $NEW_VERSION"
