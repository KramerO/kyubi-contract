import { describe, expect, it } from "vitest";
import { initialLang } from "./store";

describe("Sprache", () => {
  it("gespeicherte Wahl, dann Browser, sonst Englisch; ohne Browser Deutsch", () => {
    expect(initialLang("en", ["de-DE"])).toBe("en");
    expect(initialLang(null, ["de-AT", "en"])).toBe("de");
    expect(initialLang(null, ["fr-FR", "en-US"])).toBe("en");
    expect(initialLang(null, ["fr-FR"])).toBe("en");
    expect(initialLang(null, [])).toBe("de");
  });
});
