"use client";

import { useLang } from "./LangProvider";

const ITEMS = [
  { go: "hero", en: "Intro", pt: "Início" },
  { go: "work", en: "Projects", pt: "Projetos" },
  { go: "about", en: "About", pt: "Sobre" },
  { go: "caps", en: "Expertise", pt: "Atuação" },
  { go: "div", en: "DIV", pt: "DIV" },
  { go: "footer", en: "Contact", pt: "Contato" },
];

export function Rail() {
  const { lang } = useLang();
  return (
    <nav id="rail" aria-label={lang === "pt" ? "Seções do portfólio" : "Portfolio sections"}>
      <div className="rail-line" aria-hidden="true">
        <span className="rail-fill" id="rail-fill" />
      </div>
      <div className="rail-items">
        {ITEMS.map((it) => (
          <a key={it.go} href={`#${it.go}`} data-go={it.go}>
            {it[lang]}
          </a>
        ))}
      </div>
    </nav>
  );
}
