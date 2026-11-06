// Paketgrenzen der Apps (WP-22.2, D-168): jede App ist einzeln baubar und auslieferbar.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const APPS = fileURLToPath(new URL("../../..", import.meta.url));
const APP_NAMES = readdirSync(APPS).filter((d) => existsSync(join(APPS, d, "vite.config.ts")));
const SHARED = readdirSync(join(APPS, "shared")).filter((d) => existsSync(join(APPS, "shared", d, "package.json")));
const IMPORT = /(?:\bfrom\s+"|^import\s+"|\bimport\(")([^"]+)"/gm;

function imports(dir: string): [string, string][] {
  const src = join(APPS, dir, "src");
  return readdirSync(src).filter((f) => /\.tsx?$/.test(f)).flatMap((f) =>
    [...readFileSync(join(src, f), "utf-8").matchAll(IMPORT)].map((m): [string, string] => [`${dir}/src/${f}`, m[1]!]));
}

describe("Paketgrenzen", () => {
  it("findet alle Apps und gemeinsamen Pakete", () => {
    expect(APP_NAMES).toEqual(expect.arrayContaining(["designer", "controlcenter", "mapper", "metahub", "hub", "repo", "service", "docs"]));
    expect(SHARED).toEqual(expect.arrayContaining(["client", "graph-canvas", "i18n", "ui"]));
  });

  it("Apps greifen nicht aus ihrem Ordner heraus und nicht auf andere Apps zu", () => {
    const bad = APP_NAMES.flatMap((app) => imports(app))
      .filter(([, target]) => target.startsWith("..") || APP_NAMES.some((a) => target === `@kyubi/${a}` || target.startsWith(`@kyubi/${a}/`)));
    expect(bad).toEqual([]);
  });

  it("gemeinsame Pakete hängen nie von einer App ab", () => {
    const bad = SHARED.flatMap((pkg) => imports(`shared/${pkg}`))
      .filter(([, target]) => target.startsWith("../") || APP_NAMES.some((a) => target.startsWith(`@kyubi/${a}`)));
    expect(bad).toEqual([]);
  });

  it("jede genutzte Fremd-Abhängigkeit steht in der package.json der App", () => {
    const bad: string[] = [];
    for (const app of APP_NAMES) {
      const pkg = JSON.parse(readFileSync(join(APPS, app, "package.json"), "utf-8")) as Record<string, Record<string, string> | undefined>;
      const declared = new Set([...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.devDependencies ?? {})]);
      for (const [file, target] of imports(app)) {
        if (target.startsWith(".") || target.endsWith(".css") && !target.includes("/")) continue;
        const name = target.startsWith("@") ? target.split("/").slice(0, 2).join("/") : target.split("/")[0]!;
        if (!declared.has(name) && !name.startsWith("node:")) bad.push(`${file}: ${name}`);
      }
    }
    expect(bad).toEqual([]);
  });
});
