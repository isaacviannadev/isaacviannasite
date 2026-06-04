"use client";

import { Hero3D } from "@/components/Hero3D";
import { TypedRole } from "@/components/TypedRole";
import { useLang } from "@/components/LangProvider";

export function HeroSection() {
  const { t } = useLang();
  return (
    <header id="hero" className="panel" data-hero>
      <Hero3D />
      <div className="wrap hero-inner">
        <div className="eyebrow">
          <span className="mono" data-hero-fade>
            {t("role")}
          </span>
          <span className="mono" data-hero-fade>
            {t("avail")}
          </span>
        </div>
        <h1 data-lang="en">
          <span className="line">
            <span>Building</span>
          </span>
          <span className="line indent">
            <span>
              <em>memorable</em>
            </span>
          </span>
          <span className="line">
            <span>digital</span>
          </span>
          <span className="line">
            <span>experiences</span>
          </span>
        </h1>
        <h1 data-lang="pt">
          <span className="line">
            <span>Construindo</span>
          </span>
          <span className="line indent">
            <span>
              <em>experiências</em>
            </span>
          </span>
          <span className="line">
            <span>digitais</span>
          </span>
          <span className="line">
            <span>memoráveis</span>
          </span>
        </h1>
        <div className="hero-typed" data-hero-fade>
          <span className="lead">
            <span data-lang="en">I’m a&nbsp;</span>
            <span data-lang="pt">Sou&nbsp;</span>
          </span>
          <TypedRole />
        </div>
        <div className="hero-foot">
          <div className="hero-id" data-hero-fade>
            <span className="hero-av" data-cursor="Me">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/isaac.png" alt="Isaac Vianna" />
            </span>
            <p className="hero-bio">
              <span data-lang="en">
                <b>Isaac Vianna.</b> Crafting fast, expressive interfaces since
                2018, across Brazil &amp; Portugal.
              </span>
              <span data-lang="pt">
                <b>Isaac Vianna.</b> Criando interfaces rápidas e expressivas
                desde 2018, entre Brasil &amp; Portugal.
              </span>
            </p>
          </div>
          <div className="scroll-hint" data-hero-fade>
            <span className="mono" data-lang="en">
              Scroll
            </span>
            <span className="mono" data-lang="pt">
              Role
            </span>
            <span className="arrow" />
          </div>
        </div>
      </div>
    </header>
  );
}
