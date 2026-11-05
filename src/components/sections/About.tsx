"use client";

import { useLang } from "@/components/LangProvider";

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="panel" data-reveal>
      <div className="wrap">
        <div className="sec-head">
          <h2>{t("nav_about")}</h2>
        </div>
        <div className="about-grid">
          <div className="about-photo" data-fade>
            <div className="frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/isaac-640.webp" srcSet="/isaac-640.webp 640w, /isaac-960.webp 960w" sizes="(max-width: 900px) 360px, 40vw" width="640" height="857" loading="lazy" decoding="async" alt="Isaac Vianna" />
            </div>
            <span className="mono ph-cap">Isaac Vianna · 2026</span>
          </div>
          <div className="about-body">
            <p className="lead" data-fade data-lang="en">
              Frontend engineering with a <em>product mindset.</em>
            </p>
            <p className="lead" data-fade data-lang="pt">
              Engenharia de frontend com <em>visão de produto.</em>
            </p>
            <p className="body" data-fade data-lang="en">
              Building for the web <b>since 2018</b>. Since <b>2022</b> I’ve
              worked across <b>Brazil and Portugal</b>, for dozens of companies
              and many industries, staying focused on TypeScript, design
              systems, and interfaces that feel pixel-perfect and human.
            </p>
            <p className="body" data-fade data-lang="pt">
              Construindo para a web <b>desde 2018</b>. Desde <b>2022</b>{" "}
              trabalhei entre <b>Brasil e Portugal</b>, por dezenas de empresas e
              diversos ramos, mantendo o foco em TypeScript, design systems e
              interfaces que parecem pixel-perfect e humanas.
            </p>
            <div className="facts" data-fade>
              <div className="fact">
                <span className="k">{t("role_label")}</span>
                <span className="v">
                  <span data-lang="en">
                    Senior Frontend Engineer
                  </span>
                  <span data-lang="pt">
                    Engenheiro de Frontend Sênior
                  </span>
                </span>
              </div>
              <div className="fact">
                <span className="k">
                  <span data-lang="en">Experience</span>
                  <span data-lang="pt">Experiência</span>
                </span>
                <span className="v">
                  <span data-lang="en">
                    Since <span className="acc2">2018</span>
                  </span>
                  <span data-lang="pt">
                    Desde <span className="acc2">2018</span>
                  </span>
                </span>
              </div>
              <div className="fact">
                <span className="k">
                  <span data-lang="en">Client projects</span>
                  <span data-lang="pt">Projetos para clientes</span>
                </span>
                <span className="v">Vodafone, Ferrari</span>
              </div>
              <div className="fact">
                <span className="k">
                  <span data-lang="en">Location</span>
                  <span data-lang="pt">Local</span>
                </span>
                <span className="v">
                  <span data-lang="en">Brazil &amp; Portugal · remote</span>
                  <span data-lang="pt">Brasil &amp; Portugal · remoto</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
