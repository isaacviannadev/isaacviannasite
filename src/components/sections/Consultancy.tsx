export function Consultancy() {
  return (
    <section id="div" className="panel" data-reveal>
      <div className="wrap">
        <div className="sec-head">
          <span className="mono idx">(05)</span>
          <span className="mono">
            <span data-lang="en">Consultancy</span>
            <span data-lang="pt">Consultoria</span>
          </span>
        </div>
        <div className="div-grid">
          <div className="div-lead">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="div-logo" src="/div-logo.svg" alt="DIV" data-fade />
          </div>
          <div className="div-body">
            <p className="div-statement" data-fade data-lang="en">
              Beyond client work, I run <b>DIV</b>, a specialized consultancy
              built around <em>design systems</em> that scale, front-end{" "}
              <em>performance</em> that doesn’t slip, and code that ships{" "}
              <em>agent-ready</em>.
            </p>
            <p className="div-statement" data-fade data-lang="pt">
              Além do trabalho com clientes, eu toco a <b>DIV</b>, uma
              consultoria especializada construída em torno de{" "}
              <em>design systems</em> que escalam, <em>performance</em> de
              front-end que não escorrega e código que nasce{" "}
              <em>agent-ready</em>.
            </p>
            <p className="div-copy" data-fade data-lang="en">
              DIV partners with product teams to design, build and harden
              component libraries, then tune the front end until it’s fast and
              consistent. Agent-ready is the difference: systems and codebases
              structured so both people and AI coding agents can read them,
              extend them and stay on the rails. The same bar I hold across every
              project, now in your codebase.
            </p>
            <p className="div-copy" data-fade data-lang="pt">
              A DIV entra junto com times de produto para desenhar, construir e
              blindar bibliotecas de componentes, e então afinar o front-end até
              ficar rápido e consistente. O diferencial é ser agent-ready:
              sistemas e bases de código estruturados para que pessoas e agentes
              de IA consigam ler, estender e seguir as regras sem sair dos
              trilhos. O mesmo padrão que mantenho em cada projeto, agora no seu
              código.
            </p>
            <div className="div-chips" data-fade>
              <span>Design Systems</span>
              <span>Performance</span>
              <span>Front-end Architecture</span>
              <span>Agent-ready</span>
            </div>
            <a
              className="div-cta"
              href="https://divtecnologia.com.br"
              target="_blank"
              rel="noopener"
              data-magnetic="0.2"
              data-cursor="DIV"
              data-fade
            >
              <span data-lang="en">Visit DIV</span>
              <span data-lang="pt">Conheça a DIV</span>
              <span aria-hidden="true">&nbsp;↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
