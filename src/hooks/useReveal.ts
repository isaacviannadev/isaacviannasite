"use client";

import { useEffect } from "react";

/**
 * Per-element reveal. Each animated unit ([data-fade] block or .reveal-line)
 * reveals when IT enters the viewport — not when its whole section does. This
 * matters in horizontal mode: a panel is 100vw with side-by-side columns, so a
 * section-level trigger would fire while one column is still off-screen and its
 * animation would finish before the user ever sees it. Observing each element
 * means every element animates as it actually scrolls into view.
 *
 * Driven by a rAF/scroll/interval sweep (also called each frame by the
 * horizontal-scroll loop via window.__ivSweep) rather than IntersectionObserver,
 * which is unreliable while a fixed+transformed track is being animated.
 *
 * `deps` lets a page re-arm the sweep once async content has mounted.
 */
export function useReveal(deps: ReadonlyArray<unknown> = []) {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-fade], .reveal-line")
    );
    if (!targets.length) return;

    const reveal = (el: HTMLElement) => {
      el.classList.add("in");
      // Failsafe: force the end-state even if the transition is throttled.
      window.setTimeout(() => {
        if (el.classList.contains("reveal-line")) {
          el.querySelectorAll<HTMLElement>("*").forEach((n) => {
            n.style.transition = "none";
            n.style.transform = "translateY(0)";
          });
        } else {
          el.style.transition = "none";
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      }, 2200);
    };

    const inView = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      if (!r.width && !r.height) return false;
      if (document.body.classList.contains("hmode")) {
        const W = window.innerWidth || 0;
        // element has entered from the right and is comfortably on screen
        return r.left < W * 0.85 && r.right > W * 0.12;
      }
      const H = window.innerHeight || 0;
      return r.top < H * 0.85 && r.bottom > H * 0.12;
    };

    const pending = new Set(targets);
    const sweep = () => {
      pending.forEach((el) => {
        if (inView(el)) {
          reveal(el);
          pending.delete(el);
        }
      });
    };
    window.__ivSweep = sweep;

    sweep();
    const t1 = window.setTimeout(sweep, 80);
    const t2 = window.setTimeout(sweep, 400);
    const onScroll = () => sweep();
    const onResize = () => sweep();
    const onLoad = () => window.setTimeout(sweep, 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onLoad);
    const interval = window.setInterval(() => {
      sweep();
      if (!pending.size) window.clearInterval(interval);
    }, 240);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearInterval(interval);
      if (window.__ivSweep === sweep) delete window.__ivSweep;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
