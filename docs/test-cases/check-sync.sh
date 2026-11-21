#!/usr/bin/env bash
# Checks that every spec in docs/specs/ has a test-case file whose marker matches the spec's hash.
#   docs/test-cases/check-sync.sh           report stale/missing files, exit 1 if any
#   docs/test-cases/check-sync.sh --update  rewrite markers to the current spec hashes
set -euo pipefail

root="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$root"
update=false
[[ "${1:-}" == "--update" ]] && update=true
status=0

for spec in docs/specs/*.md; do
  name="$(basename "$spec")"
  cases="docs/test-cases/$name"
  hash="$(shasum -a 256 "$spec" | cut -c1-12)"

  if [[ ! -f "$cases" ]]; then
    echo "MISSING  $cases (no test cases for $spec)"
    status=1
    continue
  fi

  marker="<!-- spec: $spec sha256:$hash -->"
  if [[ "$(head -n 1 "$cases")" == "$marker" ]]; then
    echo "OK       $cases"
  elif $update; then
    { echo "$marker"; tail -n +2 "$cases"; } > "$cases.tmp" && mv "$cases.tmp" "$cases"
    echo "UPDATED  $cases"
  else
    echo "STALE    $cases ($spec changed; update the cases, then run with --update)"
    status=1
  fi
done

exit $status
