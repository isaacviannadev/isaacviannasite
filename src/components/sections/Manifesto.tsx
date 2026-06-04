export function Manifesto() {
  return (
    <section id="manifesto" className="panel" data-reveal>
      <div className="wrap">
        <div className="sec-head">
          <span className="mono idx">(01)</span>
          <span className="mono">Manifesto</span>
        </div>
        <p className="big" data-lang="en">
          <span className="reveal-line">
            <span>I build the web</span>
          </span>
          <span className="reveal-line">
            <span>
              like it’s a <em>living thing</em>.
            </span>
          </span>
          <span className="reveal-line">
            <span>Responsive, tactile,</span>
          </span>
          <span className="reveal-line">
            <span>and a little alive.</span>
          </span>
        </p>
        <p className="big" data-lang="pt">
          <span className="reveal-line">
            <span>Construo a web</span>
          </span>
          <span className="reveal-line">
            <span>
              como algo que <em>respira</em>.
            </span>
          </span>
          <span className="reveal-line">
            <span>Responsiva, tátil</span>
          </span>
          <span className="reveal-line">
            <span>e cheia de vida.</span>
          </span>
        </p>
        <div className="sub">
          <div className="col">
            <p data-fade data-lang="en">
              Building for the web since 2018. I care about the millisecond
              between intent and feedback: the part most people never notice,
              and the part that makes software feel human.
            </p>
            <p data-fade data-lang="pt">
              Construindo para a web desde 2018. Me importo com o milissegundo
              entre intenção e resposta: a parte que quase ninguém percebe, e a
              que faz o software parecer humano.
            </p>
          </div>
          <div className="col">
            <p data-fade data-lang="en">
              Front of frontend: design engineering, motion systems, WebGL, and
              the architecture underneath it. From concept to production, I keep
              the seams invisible.
            </p>
            <p data-fade data-lang="pt">
              Front of frontend: design engineering, sistemas de motion, WebGL e
              a arquitetura por baixo. Do conceito à produção, mantenho as
              costuras invisíveis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
