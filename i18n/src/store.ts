// Sprache und Theme der Oberflächen (D-111, D-113): Wahl im Browser gespeichert,
// sonst Browser-Sprache bzw. System-Theme. Kein Framework – ein kleiner Store je Einstellung.
import { useSyncExternalStore } from "react";

export type Lang = "de" | "en";
export type ThemeMode = "system" | "light" | "dark";

const LANG_KEY = "kyubi.lang";
const THEME_KEY = "kyubi.theme";

function stored(key: string): string | null {
  try {
    return globalThis.localStorage?.getItem(key) ?? null;
  } catch {
    return null; // privater Modus o. Ä.
  }
}

function store(key: string, value: string): void {
  try {
    globalThis.localStorage?.setItem(key, value);
  } catch {
    // nur Komfort – ohne Speicher gilt die Wahl bis zum Neuladen
  }
}

export function initialLang(saved: string | null, browser: readonly string[]): Lang {
  if (saved === "de" || saved === "en") return saved;
  if (browser.length === 0) return "de"; // ohne Browser (Tests, Server): Quellsprache
  const first = browser.find((l) => /^(de|en)\b/i.test(l));
  return first?.toLowerCase().startsWith("de") ? "de" : "en";
}

class Setting<T extends string> {
  private listeners = new Set<() => void>();
  constructor(public value: T, private readonly key: string, private readonly apply: (v: T) => void) {
    apply(value);
  }
  set(value: T): void {
    if (value === this.value) return;
    this.value = value;
    store(this.key, value);
    this.apply(value);
    this.listeners.forEach((l) => l());
  }
  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
  get = (): T => this.value;
}

function root(): HTMLElement | null {
  return typeof document === "undefined" ? null : document.documentElement;
}

function systemDark(): boolean {
  return typeof window !== "undefined" && !!window.matchMedia?.("(prefers-color-scheme: dark)").matches;
}

export function resolvedTheme(mode: ThemeMode): "light" | "dark" {
  return mode === "system" ? (systemDark() ? "dark" : "light") : mode;
}

// Nur im Browser: Node ≥ 21 hat zwar ein `navigator`, aber mit der Systemsprache des Rechners –
// Tests und Server sollen unabhängig davon die Quellsprache (Deutsch) nutzen
const inBrowser = typeof document !== "undefined" && typeof navigator !== "undefined";
const navigatorLangs = inBrowser ? navigator.languages ?? [navigator.language] : [];

export const langSetting = new Setting<Lang>(
  initialLang(stored(LANG_KEY), navigatorLangs),
  LANG_KEY,
  (l) => root()?.setAttribute("lang", l),
);

const savedTheme = stored(THEME_KEY);
export const themeSetting = new Setting<ThemeMode>(
  savedTheme === "light" || savedTheme === "dark" ? savedTheme : "system",
  THEME_KEY,
  (mode) => {
    // „System“ setzt kein Attribut – das CSS folgt dann prefers-color-scheme
    if (mode === "system") root()?.removeAttribute("data-theme");
    else root()?.setAttribute("data-theme", mode);
  },
);

export function useLang(): Lang {
  return useSyncExternalStore(langSetting.subscribe, langSetting.get, langSetting.get);
}

export function useThemeMode(): ThemeMode {
  return useSyncExternalStore(themeSetting.subscribe, themeSetting.get, themeSetting.get);
}

/** Tatsächlich angezeigtes Theme (folgt bei „System“ auch Wechseln des Betriebssystems). */
export function useResolvedTheme(): "light" | "dark" {
  const mode = useThemeMode();
  const dark = useSyncExternalStore(subscribeSystem, systemDark, () => false);
  return mode === "system" ? (dark ? "dark" : "light") : mode;
}

function subscribeSystem(listener: () => void): () => void {
  const query = typeof window === "undefined" ? null : window.matchMedia?.("(prefers-color-scheme: dark)");
  query?.addEventListener("change", listener);
  return () => query?.removeEventListener("change", listener);
}
