"use client";

import { useLang } from "./LangProvider";
import { LangToggle } from "./LangToggle";

export function Nav() {
  const { lang, t } = useLang();
  return (
    <>
      <a className="skip-link" href="#work" data-go="work">
        {lang === "pt" ? "Pular para os projetos" : "Skip to projects"}
      </a>
      <nav id="nav" aria-label={lang === "pt" ? "Navegação principal" : "Main navigation"}>
        <a className="brand" href="#hero" data-go="hero">
          Isaac Vianna<span className="dot">.</span>
        </a>
        <div className="nav-right">
          <div className="nav-links">
            <a href="#work" data-go="work">{t("nav_work")}</a>
            <a href="#about" data-go="about">{t("nav_about")}</a>
            <a href="#footer" data-go="footer">{t("nav_contact")}</a>
          </div>
          <LangToggle />
        </div>
      </nav>
    </>
  );
}
