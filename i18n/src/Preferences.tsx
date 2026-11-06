// Sprache und Theme umschalten – als ⚙-Menü in der Kopfzeile jeder App (UX-Review H1: spart Platz).
import { useEffect, useRef, useState } from "react";
import { langSetting, themeSetting, useLang, useThemeMode, type Lang, type ThemeMode } from "./store";
import { t } from "./translate";

export function Preferences() {
  const lang = useLang();
  const mode = useThemeMode();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLSpanElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const outside = (e: PointerEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    const escape = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); button.current?.focus(); } };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [open]);
  return (
    <span className="ky-prefs" ref={box}>
      <button ref={button} type="button" className="ky-prefs-button" aria-expanded={open} aria-haspopup="true"
              aria-label={t("Einstellungen")} title={t("Sprache und Darstellung")} onClick={() => setOpen(!open)}>⚙</button>
      {open && (
        <span className="ky-prefs-menu" role="group" aria-label={t("Einstellungen")}>
          <label>{t("Sprache")}
            <select aria-label={t("Sprache")} value={lang} onChange={(e) => langSetting.set(e.target.value as Lang)} autoFocus>
              <option value="de">Deutsch</option>
              <option value="en">English</option>
            </select>
          </label>
          <label>{t("Darstellung")}
            <select aria-label={t("Darstellung")} value={mode} onChange={(e) => themeSetting.set(e.target.value as ThemeMode)}>
              <option value="system">{t("System")}</option>
              <option value="light">{t("Hell")}</option>
              <option value="dark">{t("Dunkel")}</option>
            </select>
          </label>
        </span>
      )}
    </span>
  );
}
