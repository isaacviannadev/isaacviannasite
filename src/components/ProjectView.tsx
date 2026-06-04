"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { Project } from "@/content/portfolio";
import { useLang } from "@/components/LangProvider";
import { useReveal } from "@/hooks/useReveal";
import { ImageSlot } from "@/components/ImageSlot";
import { LangToggle } from "@/components/LangToggle";

interface Props {
  project: Project;
  next: Project;
  index: number; // 1-based
  total: number;
}

export function ProjectView({ project: p, next, index, total }: Props) {
  const { t } = useLang();

  useEffect(() => {
    document.body.classList.add("proj-page");
    return () => document.body.classList.remove("proj-page");
  }, []);

  useReveal([p.slug]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <nav id="pj-nav">
        <Link className="back" href="/#work" data-cursor="←">
          <span className="ar">←</span>
          {t("back")}
        </Link>
        <Link className="brand" href="/" data-cursor="Home">
          Isaac Vianna<span className="dot">.</span>
        </Link>
        <LangToggle />
      </nav>

      <main id="pj-root" className="wrap">
        <section className="pj-hero" data-reveal>
          <div className="pj-meta-top">
            <span className="mono">{t("work_label")}</span>
            <span className="mono">
              {pad(index)} / {pad(total)}
            </span>
          </div>
          <h1 data-fade dangerouslySetInnerHTML={{ __html: p.titleHtml }} />
          <div className="pj-sum" data-fade>
            <span data-lang="en">{p.summary.en}</span>
            <span data-lang="pt">{p.summary.pt}</span>
          </div>
        </section>

        <section className="pj-cover" data-reveal>
          <ImageSlot cap={`${p.title} · cover`} src={p.images?.cover} />
        </section>

        <section className="pj-info" data-reveal>
          <div className="pj-overview" data-fade>
            <h2>{t("overview")}</h2>
            <p>
              <span data-lang="en">{p.overview.en}</span>
              <span data-lang="pt">{p.overview.pt}</span>
            </p>
          </div>
          <div className="pj-side">
            <div className="pj-block" data-fade>
              <div className="lbl">{t("role_label")}</div>
              <div className="one">
                <span data-lang="en">{p.role.en}</span>
                <span data-lang="pt">{p.role.pt}</span>
              </div>
            </div>
            <div className="pj-block" data-fade>
              <div className="lbl">{t("year")}</div>
              <div className="one">{p.year}</div>
            </div>
            <div className="pj-block" data-fade>
              <div className="lbl">{t("contribution")}</div>
              <ul data-lang="en">
                {p.did.en.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
              <ul data-lang="pt">
                {p.did.pt.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
            <div className="pj-block" data-fade>
              <div className="lbl">{t("stack")}</div>
              <div className="chips">
                {p.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {(() => {
          // With real imagery, render exactly the gallery shots provided (0..n).
          // Without imagery, keep two captioned placeholders.
          const gal = p.images?.gallery;
          if (gal && gal.length === 0) return null;
          const items = gal ?? [undefined, undefined];
          return (
            <section className="pj-gallery" data-reveal>
              {items.map((src, i) => (
                <ImageSlot key={i} cap={`${p.title} · detail`} src={src} />
              ))}
            </section>
          );
        })()}

        <section className="pj-next" data-reveal>
          <div className="lbl">{t("next_project")}</div>
          <Link href={`/project/${next.slug}`} data-cursor={t("view")}>
            <span dangerouslySetInnerHTML={{ __html: next.titleHtml }} />
            <span className="ar">→</span>
          </Link>
        </section>
      </main>
    </>
  );
}
