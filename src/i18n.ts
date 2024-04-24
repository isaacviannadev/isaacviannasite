import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { english, spanish, portuguese } from "./translations";

const resources = {
  "en-US": english,
  es: spanish,
  "pt-BR": portuguese,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: ["es", "pt-BR", "en-US"],
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;
