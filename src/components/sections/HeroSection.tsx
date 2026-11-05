"use client";

/* Static export: images are pre-sized locally; portrait srcSet avoids shipping the source asset. */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Hero3D } from "@/components/Hero3D";
import { useLang } from "@/components/LangProvider";

export function HeroSection() {
  const { lang, t } = useLang();
  return (
    <header id="hero" className="panel" data-hero>
      <Hero3D />
      <div className="wrap hero-inner">
        <div className="hero-intro" data-hero-fade>
          <img className="hero-portrait" src="/isaac-192.webp" srcSet="/isaac-96.webp 96w, /isaac-192.webp 192w" sizes="56px" width="56" height="56" alt="Isaac Vianna" fetchPriority="high" />
          <div>
            <p className="hero-name">Isaac Vianna</p>
            <p className="hero-role">{t("role")}</p>
          </div>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>
              <span className="line"><span>{lang === "pt" ? "Da arquitetura" : "From architecture"}</span></span>
              <span className="line"><span>{lang === "pt" ? "à interface." : "to interface."}</span></span>
            </h1>
            <p className="hero-description" data-hero-fade>
              {lang === "pt"
                ? "Desenvolvo produtos com React, Next.js e TypeScript. De bibliotecas de componentes a aplicações completas, cuido dos detalhes que conectam design e engenharia."
                : "I build products with React, Next.js and TypeScript. From component libraries to complete applications, I care for the details that connect design and engineering."}
            </p>
            <div className="hero-actions" data-hero-fade>
              <a className="action-primary" href="#work" data-go="work">{lang === "pt" ? "Explorar projetos" : "Explore projects"}<span aria-hidden="true">↗</span></a>
              <a className="action-text" href="mailto:hello@isaacvianna.com.br">{lang === "pt" ? "Vamos conversar" : "Let’s talk"}</a>
            </div>
          </div>
          <Link className="hero-feature" href="/project/vodafone/" data-hero-fade>
            <div className="hero-feature-image">
              <img src="/projects/vodafone-card.jpg" alt={lang === "pt" ? "Interfaces do projeto Vodafone TARS" : "Vodafone TARS interface designs"} width="800" height="1000" />
              <span className="feature-open" aria-hidden="true">↗</span>
            </div>
            <div className="hero-feature-caption"><span>Vodafone</span><span>{lang === "pt" ? "Conheça o case" : "Explore the case"}</span></div>
          </Link>
        </div>
        <div className="hero-foot" data-hero-fade>
          <p>{lang === "pt" ? "Construindo para a web desde 2018" : "Building for the web since 2018"}</p>
          <p>{t("based")}</p>
        </div>
      </div>
    </header>
  );
}
