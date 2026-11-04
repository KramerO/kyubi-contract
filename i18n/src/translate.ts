// Übersetzen im gettext-Stil (D-113): der deutsche Text ist der Schlüssel, ``en`` übersetzt.
// Fehlt eine Übersetzung, erscheint der deutsche Text (ein Test meldet fehlende Einträge).
import { langSetting, type Lang } from "./store";
import { en } from "./en";

export type Vars = Record<string, string | number>;

export function translate(lang: Lang, text: string, vars?: Vars): string {
  const base = lang === "en" ? (en[text] ?? text) : text;
  return vars ? base.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m)) : base;
}

/** Text in der aktuellen Sprache. Komponenten rufen ``useLang()``, damit sie neu zeichnen. */
export function t(text: string, vars?: Vars): string {
  return translate(langSetting.value, text, vars);
}

/** Text vom Server: Englisch, wenn gewählt und vorhanden, sonst Deutsch (D-115). */
export function pick(de: string, en: string | null | undefined): string;
export function pick(de: string | null | undefined, en: string | null | undefined): string | null | undefined;
export function pick(de: string | null | undefined, en: string | null | undefined): string | null | undefined {
  return langSetting.value === "en" && en ? en : de;
}

export function locale(): string {
  return langSetting.value === "de" ? "de-DE" : "en-GB";
}

export function fmtNumber(n: number): string {
  return n.toLocaleString(locale());
}

export function fmtDateTime(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString(locale(), { dateStyle: "short", timeStyle: "medium" });
}
