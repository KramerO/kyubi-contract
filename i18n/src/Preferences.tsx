// Sprache und Theme umschalten – in der Kopfzeile jeder App.
import { langSetting, themeSetting, useLang, useThemeMode, type Lang, type ThemeMode } from "./store";
import { t } from "./translate";

export function Preferences() {
  const lang = useLang();
  const mode = useThemeMode();
  return (
    <span className="ky-prefs">
      <select aria-label={t("Sprache")} value={lang} onChange={(e) => langSetting.set(e.target.value as Lang)}>
        <option value="de">Deutsch</option>
        <option value="en">English</option>
      </select>
      <select aria-label={t("Darstellung")} value={mode} onChange={(e) => themeSetting.set(e.target.value as ThemeMode)}>
        <option value="system">{t("System")}</option>
        <option value="light">{t("Hell")}</option>
        <option value="dark">{t("Dunkel")}</option>
      </select>
    </span>
  );
}
