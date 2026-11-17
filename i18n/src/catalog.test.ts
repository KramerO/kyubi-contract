// Katalog-Test (D-113): jeder t("…")-Text hat eine englische Übersetzung, sichtbare Texte
// laufen über t(), keine verwaisten Einträge.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { en } from "./en";
import { calls, untranslated, type Finding } from "./scan";
import { translate } from "./translate";

const APPS = fileURLToPath(new URL("../../..", import.meta.url));
const DIRS = ["designer", "controlcenter", "mapper", "metahub", "keystore", "hub", "repo", "service", "docs",
  "shared/client", "shared/ui", "shared/graph-canvas", "shared/i18n"].map((d) => `${d}/src`);
// Ausnahmen: Dateien, deren Texte (noch) nicht übersetzt werden – derzeit keine
const PENDING = new Set<string>([]);

function sources(): [string, string][] {
  return DIRS.flatMap((dir) =>
    readdirSync(join(APPS, dir))
      .filter((f) => /\.tsx?$/.test(f) && !f.endsWith(".test.ts") && f !== "scan.ts")
      .map((f): [string, string] => [`${dir}/${f}`, readFileSync(join(APPS, dir, f), "utf-8")]),
  );
}

const show = (fs: Finding[]) => fs.map((f) => `${f.file}:${f.line} ${f.text}`);

describe("Übersetzungen", () => {
  it("jeder t()-Text ist übersetzt", () => {
    const missing = sources().flatMap(([file, src]) => calls(file, src)).filter((c) => !(c.text in en));
    expect(show(missing)).toEqual([]);
  });

  it("sichtbare Texte laufen über t()", () => {
    const open = sources()
      .filter(([file]) => !PENDING.has(file.split("/").pop() ?? ""))
      .flatMap(([file, src]) => untranslated(file, src));
    expect(show(open)).toEqual([]);
  });

  it("keine verwaisten Einträge", () => {
    const used = new Set(sources().flatMap(([file, src]) => calls(file, src).map((c) => c.text)));
    expect(Object.keys(en).filter((k) => !used.has(k))).toEqual([]);
  });

  it("Platzhalter stimmen überein", () => {
    const names = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
    const wrong = Object.entries(en).filter(([de, text]) => names(de).join() !== names(text).join());
    expect(wrong).toEqual([]);
  });

  it("ersetzt Platzhalter und fällt auf Deutsch zurück", () => {
    expect(translate("en", "Phase {n}", { n: 2 })).toBe("Phase 2");
    expect(translate("en", "gibt es nicht")).toBe("gibt es nicht");
    expect(translate("de", "Notiz")).toBe("Notiz");
  });
});
