#!/usr/bin/env bash
# Prints the release notes for one version: that version's section of the package changelog.
#
#   bash .github/scripts/release-notes.sh 1.2.0
set -euo pipefail

version="$1"

awk -v heading="## $version" '
  $0 == heading { found = 1; next }
  /^## / { found = 0 }
  found { print }
' packages/module-01/CHANGELOG.md | cat -s | sed '/./,$!d'
