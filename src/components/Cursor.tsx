"use client";

import { useEffect, useRef } from "react";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Custom blend-mode cursor. Uses event delegation so it works across route
 * changes and dynamically rendered elements (work cards, project links).
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enables the reveal/hero transitions (CSS gates them behind html.js).
    document.documentElement.classList.add("js");
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(pointer: coarse)").matches) return;

    const label = el.querySelector<HTMLElement>(".clabel");
    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x = lerp(x, tx, 0.22);
      y = lerp(y, ty, 0.22);
      el.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };

    const interactiveSel = "a, button, [data-cursor]";
    const onOver = (e: Event) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        interactiveSel
      );
      if (!target) return;
      el.classList.add("is-hover");
      if (label) label.textContent = target.dataset.cursor || "";
    };
    const onOut = (e: Event) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        interactiveSel
      );
      if (!target) return;
      const related = (e as PointerEvent).relatedTarget as HTMLElement | null;
      if (related && related.closest(interactiveSel) === target) return;
      el.classList.remove("is-hover");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div id="cursor" ref={ref} aria-hidden>
      <span className="clabel" />
    </div>
  );
}
