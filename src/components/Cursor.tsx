"use client";

import { useEffect, useRef } from "react";

/** Optional pointer decoration. Keyboard, touch and reduced-motion users keep
 * the native cursor, and there is no animation loop while the pointer is idle. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => document.documentElement.classList.toggle("js", !motion.matches);
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const available = matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const label = element.querySelector<HTMLElement>(".clabel");
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let animation = 0;
    let shown = false;
    const hide = () => {
      shown = false;
      element.style.display = "none";
      element.classList.remove("is-hover");
      document.body.classList.remove("custom-cursor");
      cancelAnimationFrame(animation);
      animation = 0;
    };
    const loop = () => {
      x += (targetX - x) * 0.35;
      y += (targetY - y) * 0.35;
      element.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
      animation = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.2
        ? requestAnimationFrame(loop)
        : 0;
    };
    const onMove = (event: PointerEvent) => {
      if (!available.matches || event.pointerType === "touch") return hide();
      targetX = event.clientX;
      targetY = event.clientY;
      if (!shown) {
        x = targetX;
        y = targetY;
        shown = true;
        element.style.display = "block";
        document.body.classList.add("custom-cursor");
      }
      if (!animation) animation = requestAnimationFrame(loop);
    };
    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("a, button, [data-cursor]");
      element.classList.toggle("is-hover", !!target);
      if (label) label.textContent = target?.dataset.cursor || "";
    };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Tab") hide(); };
    const onVisibility = () => { if (document.hidden) hide(); };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.documentElement.addEventListener("pointerleave", hide);
    document.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onVisibility);
    available.addEventListener("change", hide);
    return () => {
      hide();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVisibility);
      available.removeEventListener("change", hide);
    };
  }, []);

  return (
    <div id="cursor" ref={ref} aria-hidden="true" style={{ display: "none" }}>
      <span className="clabel" />
    </div>
  );
}
