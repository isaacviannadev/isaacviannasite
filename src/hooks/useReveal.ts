"use client";

import { useEffect } from "react";

/** Reveal once on entry, including during the horizontal track's animation.
 * Content is visible by default and reduced-motion users skip the transitions. */
export function useReveal(deps: ReadonlyArray<unknown> = []) {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-fade], .reveal-line"));
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const pending = new Set(targets.filter((element) => !element.classList.contains("in")));
    const sweep = () => {
      pending.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const visible = document.body.classList.contains("hmode")
          ? rect.left < innerWidth * 0.95 && rect.right > 0
          : rect.top < innerHeight * 0.95 && rect.bottom > 0;
        if (motion.matches || visible) {
          element.classList.add("in");
          pending.delete(element);
        }
      });
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      let element: HTMLElement | null = event.target;
      while (element) {
        if (pending.has(element)) {
          element.classList.add("in");
          pending.delete(element);
        }
        element = element.parentElement;
      }
    };
    window.__ivSweep = sweep;
    sweep();
    const frame = requestAnimationFrame(sweep);
    window.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("resize", sweep);
    window.addEventListener("load", sweep);
    document.addEventListener("focusin", onFocus);
    motion.addEventListener("change", sweep);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", sweep);
      window.removeEventListener("resize", sweep);
      window.removeEventListener("load", sweep);
      document.removeEventListener("focusin", onFocus);
      motion.removeEventListener("change", sweep);
      if (window.__ivSweep === sweep) delete window.__ivSweep;
    };
    // The caller supplies the dependency list when project content changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
