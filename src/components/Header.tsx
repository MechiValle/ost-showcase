import { useLanguage } from "@/i18n/LanguageContext";
import "./Header.css";

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="header">
      <span className="header__title">{t("siteTitle")}</span>
      <div className="header__lang-switch">
        <button
          className={`header__lang-option ${
            language === "en" ? "header__lang-option--active" : ""
          }`}
          onClick={() => language !== "en" && toggleLanguage()}
        >
          EN
        </button>
        <button
          className={`header__lang-option ${
            language === "es" ? "header__lang-option--active" : ""
          }`}
          onClick={() => language !== "es" && toggleLanguage()}
        >
          ES
        </button>
      </div>
    </header>
  );
}