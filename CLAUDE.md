# kyubi-contract

Öffentliches npm-Repo: Vertrag (`@kramero/kyubi-contract`) und Übersetzung (`@kramero/kyubi-i18n`)
der Kyubi-Suite. Quelle der Wahrheit für `openapi/`, `src/generated/`, `src/messages.en.json` ist bis
zur Umstellung das Monorepo `KramerO/KyubiETL`: dort erzeugen, hier synchronisieren, nie von Hand ändern.

- **Sprache:** Doku, Commits, PRs auf Deutsch. Commit-Erste-Zeile ≤ 72 Zeichen. Commits enden mit
  `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.
- **Git-Ablauf (D-147):** nie direkt auf `main`/`develop`; Feature-Branch von `develop`, PR nach
  `develop`, Merge nach grünem `scripts/check.sh`; Release per PR `develop` → `main`.
- **Gate:** `scripts/check.sh` (npm ci, typecheck, test, build); es gibt keine CI. Nur melden, was grün war.
- **Geheimnisse:** nie Tokens ins Repo; Registry-Auth nur über `NODE_AUTH_TOKEN`.
- **Clean Room:** niemals Code, Binaries oder Doku von Drittprodukten (insb. Ab Initio) verwenden.
- Keine neuen Abhängigkeiten ohne Entscheidung im Monorepo (`docs/DECISIONS.md`).
