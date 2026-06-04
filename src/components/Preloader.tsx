"use client";

import { useEffect, useRef, useState } from "react";

// Module-scoped flag: the intro splash plays once per page load. Client-side
// navigations (e.g. back from /project) keep this module alive, so the splash
// is skipped and the hero just animates in. A hard reload resets it.
let introShown = false;

// Non-breaking space between the two names so it isn't collapsed.
const NAME = ["I", "S", "A", "A", "C", " ", "V", "I", "A", "N", "N", "A"];

/**
 * Preloader: counter 0→100%, name letters rising in, then the overlay slides
 * away and the hero entrance fires. Hardened so the site never gets stuck
 * behind it (timeout failsafes + forced end-states). Ported from site.js.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  // On a client-side return to the home page the intro has already played, so
  // render nothing and let the hero animate straight in.
  const [skip] = useState(() => introShown);

  useEffect(() => {
    // Skip the splash on any mount after the first this page load.
    if (introShown) {
      document.body.classList.remove("is-loading");
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      if (hero) {
        hero.classList.add("started");
        window.setTimeout(() => {
          hero.querySelectorAll<HTMLElement>("h1 .line > span").forEach((n) => {
            n.style.transition = "none";
            n.style.transform = "translateY(0)";
          });
          hero.querySelectorAll<HTMLElement>("[data-hero-fade]").forEach((n) => {
            n.style.transition = "none";
            n.style.opacity = "1";
            n.style.transform = "none";
          });
        }, 2400);
      }
      return;
    }
    introShown = true;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pre = rootRef.current;
    const countEl = countRef.current;
    const bar = barRef.current;
    if (!pre) return;

    document.body.classList.add("is-loading");
    let done = false;
    const timers: number[] = [];

    const setCount = (v: number) => {
      if (countEl && countEl.firstChild) {
        countEl.firstChild.nodeValue = String(v).padStart(3, "0");
      }
    };

    const revealName = () => {
      nameRef.current?.querySelectorAll<HTMLElement>("span").forEach((s, i) => {
        s.animate(
          [{ transform: "translateY(110%)" }, { transform: "translateY(0)" }],
          {
            duration: 700,
            delay: 80 + i * 45,
            easing: "cubic-bezier(.22,1,.36,1)",
            fill: "forwards",
          }
        );
      });
    };

    const startSite = () => {
      document.body.classList.remove("is-loading");
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      if (hero) {
        hero.classList.add("started");
        timers.push(
          window.setTimeout(() => {
            hero.querySelectorAll<HTMLElement>("h1 .line > span").forEach((n) => {
              n.style.transition = "none";
              n.style.transform = "translateY(0)";
            });
            hero.querySelectorAll<HTMLElement>("[data-hero-fade]").forEach((n) => {
              n.style.transition = "none";
              n.style.opacity = "1";
              n.style.transform = "none";
            });
          }, 2400)
        );
      }
    };

    const finishPreloader = () => {
      if (done) return;
      done = true;
      setCount(100);
      if (bar) bar.style.width = "100%";
      const anim = pre.animate(
        [{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }],
        { duration: 900, easing: "cubic-bezier(.76,0,.24,1)", fill: "forwards" }
      );
      anim.onfinish = () => {
        pre.style.display = "none";
      };
      timers.push(window.setTimeout(() => (pre.style.display = "none"), 1000));
      startSite();
    };

    revealName();
    const dur = reduce ? 400 : 2000;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      setCount(Math.round(eased * 100));
      if (bar) bar.style.width = eased * 100 + "%";
      if (k < 1) raf = requestAnimationFrame(step);
      else finishPreloader();
    };
    raf = requestAnimationFrame(step);
    timers.push(window.setTimeout(finishPreloader, dur + 1200));

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((id) => window.clearTimeout(id));
      document.body.classList.remove("is-loading");
    };
  }, []);

  if (skip) return null;

  return (
    <div id="preloader" ref={rootRef}>
      <div className="pl-name" ref={nameRef}>
        {NAME.map((ch, i) => (
          <span key={i}>{ch}</span>
        ))}
      </div>
      <div className="pl-row">
        <div className="pl-count" id="pl-count" ref={countRef}>
          {"000"}
          <span className="u">%</span>
        </div>
        <div className="pl-meta mono">
          <span data-lang="en">Loading experience</span>
          <span data-lang="pt">Carregando experiência</span>
          <br />
          Est. 2026 · Brazil &amp; Portugal
        </div>
      </div>
      <div className="pl-bar" id="pl-bar" ref={barRef} />
    </div>
  );
}
