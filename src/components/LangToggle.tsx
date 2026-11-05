"use client";

import { useLang } from "./LangProvider";

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <span className="lang-toggle" role="group" aria-label={lang === "pt" ? "Idioma" : "Language"}>
      <button
        type="button"
        className={lang === "en" ? "active" : ""}
        aria-label="English"
        aria-pressed={lang === "en"}
        lang="en"
        onClick={() => setLang("en")}
        data-cursor="EN"
      >
        EN
      </button>
      <span className="sep" aria-hidden="true">/</span>
      <button
        type="button"
        className={lang === "pt" ? "active" : ""}
        aria-label="Português"
        aria-pressed={lang === "pt"}
        lang="pt-BR"
        onClick={() => setLang("pt")}
        data-cursor="PT"
      >
        PT
      </button>
    </span>
  );
}
