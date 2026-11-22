# kyubi-contract

Öffentlicher Vertrag zwischen dem Kyubi-Server und den Oberflächen (D-214, D-215). Dieses Repo
enthält zwei npm-Pakete und die OpenAPI-Stände:

| Pfad | Paket / Inhalt |
|---|---|
| `src/` | `@kramero/kyubi-contract`: erzeugte API-Typen (`generated/server|hub|central.ts`) und der Katalog der englischen Server-Meldungen (`messages.en.json`) |
| `i18n/` | `@kramero/kyubi-i18n`: Übersetzung Deutsch/Englisch (Katalog, `t()`, Einstellungen) |
| `openapi/` | OpenAPI-Stände `openapi.server.json`, `openapi.hub.json`, `openapi.central.json` |

## Verhältnis zum Monorepo

Quelle der Wahrheit für Vertrag und Katalog ist bis zur vollständigen Umstellung der Server-Seite
(Schritt 4 der Aufteilung D-214) noch das Monorepo `KramerO/KyubiETL`. Dort entstehen die Dateien
mit `uv run python -m kyubi_server.contract --update`. Die Dateien in `openapi/`, `src/generated/`
und `src/messages.en.json` werden von dort **hierher synchronisiert** und nicht von Hand geändert.
Handarbeit gilt nur für `src/index.ts`, `i18n/` und die Paketkonfiguration.

Die Katalogprüfung über alle Apps (verwaiste Einträge, Texte der Apps) und die Paketgrenzen-Prüfung
der Apps bleiben im Monorepo, weil sie die Quelltexte der Apps brauchen; `i18n/src/catalog.test.ts`
prüft hier nur das eigene Paket.

## Installation (GitHub Packages)

Die Pakete liegen in der GitHub-Packages-Registry unter dem Scope `@kramero`. In der `.npmrc` des
Verbrauchers:

```
@kramero:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

`NODE_AUTH_TOKEN` ist ein Token mit `read:packages` (lokal z. B. `export NODE_AUTH_TOKEN=$(gh auth token)`).
Das Token gehört nie ins Repo.

```
npm install @kramero/kyubi-contract @kramero/kyubi-i18n
```

Die Pakete liefern TypeScript-Quellen (kein Build-Schritt); der Verbraucher bündelt sie selbst.

## Entwicklung

```
npm install          # Abhängigkeiten und Workspace
scripts/check.sh     # Gate: npm ci, typecheck, test, build
```

Der Test `test/vertrag.test.ts` prüft, dass die OpenAPI-Stände und `messages.en.json` gültiges JSON
sind. Das Gate ist lokal auszuführen; es gibt keine CI.

## Veröffentlichung

Version in beiden `package.json` anheben, Gate ausführen, dann (Token mit `write:packages`):

```
export NODE_AUTH_TOKEN=$(gh auth token)
npm publish -w @kramero/kyubi-i18n
npm publish                       # @kramero/kyubi-contract
```

Reihenfolge: erst `@kramero/kyubi-i18n` und `@kramero/kyubi-contract`, danach die Pakete aus
`kyubi-shared-ui`. Danach Tag `vX.Y.Z` setzen.

## Lizenz

Apache License 2.0 – siehe [LICENSE](LICENSE) und [NOTICE](NOTICE). Der API-Vertrag (OpenAPI-Stände, erzeugte Typen, Nachrichtenkatalog) darf frei verwendet werden, auch für eigene Clients.
