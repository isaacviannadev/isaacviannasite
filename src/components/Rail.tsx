/** Bottom progress-rail menu. Click handling + active state are wired by
 *  useHorizontalScroll (it queries these buttons by id). */
const ITEMS: { go: string; n: string; en: string; pt: string }[] = [
  { go: "hero", n: "00", en: "Intro", pt: "Início" },
  { go: "manifesto", n: "01", en: "Manifesto", pt: "Manifesto" },
  { go: "about", n: "02", en: "About", pt: "Sobre" },
  { go: "work", n: "03", en: "Work", pt: "Projetos" },
  { go: "caps", n: "04", en: "Skills", pt: "Skills" },
  { go: "div", n: "05", en: "DIV", pt: "DIV" },
  { go: "footer", n: "06", en: "Contact", pt: "Contato" },
];

export function Rail() {
  return (
    <nav id="rail" aria-label="Sections">
      <div className="rail-line">
        <span className="rail-fill" id="rail-fill" />
      </div>
      <div className="rail-items">
        {ITEMS.map((it) => (
          <button key={it.go} type="button" data-go={it.go}>
            <span className="ri-n">{it.n}</span>
            <span className="ri-l">
              {it.en === it.pt ? (
                it.en
              ) : (
                <>
                  <span data-lang="en">{it.en}</span>
                  <span data-lang="pt">{it.pt}</span>
                </>
              )}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
