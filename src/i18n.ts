import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { english, portuguese, spanish } from "./translations";

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
    fallbackLng: "pt-BR",
    lng: "pt-BR",
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;
