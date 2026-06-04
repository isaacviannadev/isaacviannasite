"use client";

import { useLang } from "./LangProvider";

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <span className="lang-toggle">
      <button
        type="button"
        className={lang === "en" ? "active" : ""}
        onClick={() => setLang("en")}
        data-cursor="EN"
      >
        EN
      </button>
      <span className="sep">/</span>
      <button
        type="button"
        className={lang === "pt" ? "active" : ""}
        onClick={() => setLang("pt")}
        data-cursor="PT"
      >
        PT
      </button>
    </span>
  );
}
