import { useLanguage } from "@/i18n/LanguageContext";
import "./Hero.css";

interface HeroProps {
  onOpenPlayer: () => void;
}

export default function Hero({ onOpenPlayer }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <h1 className="hero__title">{t("heroTitle")}</h1>
      <p className="hero__subtitle">{t("heroSubtitle")}</p>
      <p className="hero__description">{t("heroDescription")}</p>
      <button className="hero__cta" onClick={onOpenPlayer}>
        {t("openPlayer")}
      </button>
    </section>
  );
}