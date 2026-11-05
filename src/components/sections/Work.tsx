"use client";

/* Static export: images are pre-sized locally; portrait srcSet avoids shipping the source asset. */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { PROJECTS } from "@/content/portfolio";
import { useLang } from "@/components/LangProvider";
import { SlotEmpty } from "@/components/ImageSlot";

export function Work() {
  const { lang } = useLang();
  return (
    <section id="work" className="panel" aria-labelledby="work-title" tabIndex={-1}>
      <div className="wrap">
        <div className="work-head">
          <h2 className="wh-big" id="work-title">{lang === "pt" ? "Projetos selecionados" : "Selected projects"}</h2>
          <p className="wh-sub">{lang === "pt"
            ? "Sistemas de design, produtos digitais e negócios que ajudei a construir. Veja meu papel em cada projeto."
            : "Design systems, digital products and businesses I’ve helped build. Explore my role in each project."}</p>
          <span className="work-count">{lang === "pt" ? "4 projetos · Brasil e Portugal" : "4 projects · Brazil and Portugal"}</span>
        </div>
        <div className="work-strip" id="proj-list">
          {PROJECTS.map((p) => (
            <Link key={p.slug} className="wcard" href={`/project/${p.slug}/`} aria-labelledby={`title-${p.slug} contribution-${p.slug}`}>
              <div className="wc-img">
                {p.images ? <img src={p.images.card} alt="" width="1120" height="1400" loading="lazy" decoding="async" /> : <SlotEmpty cap={p.title} />}
                <span className="wc-go" aria-hidden="true">↗</span>
              </div>
              <div className="wc-meta">
                <div className="wc-heading">
                  <h3 className="wc-title" id={`title-${p.slug}`} dangerouslySetInnerHTML={{ __html: p.titleHtml }} />
                  <span className="wc-year">{p.year}</span>
                </div>
                <p className="wc-sum">{p.summary[lang]}</p>
                <p className="wc-contribution" id={`contribution-${p.slug}`}>{p.contribution[lang]}</p>
                <div className="wc-tags">{p.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <span className="wc-link">{lang === "pt" ? "Explorar case" : "Explore case"}<span aria-hidden="true">↗</span></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
