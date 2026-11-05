"use client";

import { useEffect } from "react";

/** Optional pointer response, disabled for touch and reduced-motion users. */
export function useMagnetic() {
  useEffect(() => {
    const query = matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const reset = () => elements.forEach((element) => { element.style.transform = ""; });
    const cleanups = elements.map((element) => {
      const strength = parseFloat(element.dataset.magnetic || "0.4");
      const onMove = (event: PointerEvent) => {
        if (!query.matches || event.pointerType === "touch") return;
        const rect = element.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        element.style.transform = `translate(${dx * strength}px,${dy * strength}px)`;
      };
      const onLeave = () => { element.style.transform = ""; };
      element.addEventListener("pointermove", onMove);
      element.addEventListener("pointerleave", onLeave);
      element.addEventListener("blur", onLeave);
      return () => {
        element.removeEventListener("pointermove", onMove);
        element.removeEventListener("pointerleave", onLeave);
        element.removeEventListener("blur", onLeave);
        element.style.transform = "";
      };
    });
    query.addEventListener("change", reset);
    return () => {
      query.removeEventListener("change", reset);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
}
