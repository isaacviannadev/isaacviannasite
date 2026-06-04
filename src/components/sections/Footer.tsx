"use client";

import { useLang } from "@/components/LangProvider";

export function Footer() {
  const { t } = useLang();
  return (
    <footer id="footer" className="panel" data-reveal>
      <div className="wrap">
        <div className="f-lead mono" data-fade>
          (05) · {t("footer_cta")}
        </div>
        <a
          className="f-mail"
          href="mailto:hello@isaacvianna.com.br"
          data-magnetic="0.25"
          data-cursor="Email"
        >
          <span data-lang="en">
            Say<em>&nbsp;hello</em> →
          </span>
          <span data-lang="pt">
            Diga<em>&nbsp;olá</em> →
          </span>
        </a>
        <div className="f-grid">
          <div className="f-socials">
            <a href="https://github.com/" data-cursor="↗">
              GitHub<span className="ln" />
            </a>
            <a
              href="https://www.linkedin.com/in/isaacvianna/"
              data-cursor="↗"
            >
              LinkedIn<span className="ln" />
            </a>
            <a href="https://x.com/" data-cursor="↗">
              Twitter<span className="ln" />
            </a>
            <a href="https://www.isaacvianna.com.br/" data-cursor="↗">
              Read.cv<span className="ln" />
            </a>
          </div>
          <div className="mono" style={{ textAlign: "right" }}>
            {t("based")}
            <br />
            {t("worldwide")}
          </div>
        </div>
        <div className="f-bottom mono">
          <span>© 2026 Isaac Vianna</span>
          <span>
            <span data-lang="en">Reinvented portfolio · built with motion</span>
            <span data-lang="pt">Portfólio reinventado · feito com motion</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
