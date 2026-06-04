"use client";

import Link from "next/link";
import { PROJECTS } from "@/content/portfolio";
import { useLang } from "@/components/LangProvider";
import { SlotEmpty } from "@/components/ImageSlot";

export function Work() {
  const { t } = useLang();
  return (
    <section id="work" className="panel" data-reveal>
      <div className="wrap">
        <div className="work-head" data-fade>
          <span className="mono idx">(03)</span>
          <h2 className="wh-big">
            <span data-lang="en">
              Selected
              <br />
              <em>work</em>
            </span>
            <span data-lang="pt">
              Trabalhos
              <br />
              <em>selecionados</em>
            </span>
          </h2>
          <p className="wh-sub">
            <span data-lang="en">
              A handful of projects across many industries. Scroll on.
            </span>
            <span data-lang="pt">
              Alguns projetos em diversos ramos. Continue rolando.
            </span>
          </p>
        </div>
        <div className="work-strip" id="proj-list">
          {PROJECTS.map((p, i) => (
            <Link
              key={p.slug}
              className="wcard"
              href={`/project/${p.slug}`}
              data-cursor={t("view")}
            >
              <div className="wc-img">
                <span className="mono wc-idx">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p.images ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.images.card}
                    alt={p.title}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <SlotEmpty cap={p.title} />
                )}
                <span className="wc-go">→</span>
              </div>
              <div className="wc-meta">
                <span
                  className="wc-title"
                  dangerouslySetInnerHTML={{ __html: p.titleHtml }}
                />
                <div className="wc-row">
                  <span className="wc-sum">
                    <span data-lang="en">{p.summary.en}</span>
                    <span data-lang="pt">{p.summary.pt}</span>
                  </span>
                  <span className="wc-year">{p.year}</span>
                </div>
                <div className="wc-tags">
                  {p.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
