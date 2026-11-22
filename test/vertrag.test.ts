// Die mitgelieferten Vertragsdateien müssen gültiges JSON sein (aus dem Monorepo synchronisiert).
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const lese = (pfad: string): unknown => JSON.parse(readFileSync(join(ROOT, pfad), "utf-8"));

describe("OpenAPI-Stände", () => {
  for (const name of ["server", "hub", "central"]) {
    it(`openapi.${name}.json ist gültiges JSON mit Pfaden`, () => {
      const doc = lese(`openapi/openapi.${name}.json`) as { openapi?: string; paths?: object };
      expect(doc.openapi).toMatch(/^3\./);
      expect(Object.keys(doc.paths ?? {}).length).toBeGreaterThan(0);
    });
  }

  it("openapi/ enthält genau die drei erwarteten Stände", () => {
    expect(readdirSync(join(ROOT, "openapi")).sort()).toEqual(["openapi.central.json", "openapi.hub.json", "openapi.server.json"]);
  });
});

describe("Nachrichtenkatalog", () => {
  it("messages.en.json ist ein Objekt mit Textwerten", () => {
    const katalog = lese("src/messages.en.json") as Record<string, unknown>;
    expect(typeof katalog).toBe("object");
    expect(Object.keys(katalog).length).toBeGreaterThan(0);
    expect(Object.values(katalog).every((v) => typeof v === "string")).toBe(true);
  });
});
