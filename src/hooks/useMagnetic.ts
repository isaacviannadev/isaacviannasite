"use client";

import { useEffect } from "react";

/** Magnetic hover for [data-magnetic] elements. Ported from site.js. */
export function useMagnetic() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || matchMedia("(pointer: coarse)").matches) return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnetic]")
    );
    const cleanups = els.map((el) => {
      const strength = parseFloat(el.dataset.magnetic || "0.4");
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * strength}px,${dy * strength}px)`;
      };
      const onLeave = () => {
        el.style.transform = "";
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
