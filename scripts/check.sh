#!/usr/bin/env bash
# Qualitäts-Gate: Installation, Typprüfung, Tests, Build (kein CI, lokal ausführen).
set -euo pipefail
cd "$(dirname "$0")/.."

step() { printf '\n==> %s\n' "$1"; shift; "$@"; }

step "install" npm ci --no-audit --no-fund
step "typecheck" npm run typecheck
step "test" npm test
step "build" npm run build
printf '\nGate grün (%s)\n' "$(git rev-parse --short HEAD 2>/dev/null || echo '-')"
