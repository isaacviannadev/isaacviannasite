"use client";

import { useEffect } from "react";

/** Start the entrance immediately. The static document remains readable before
 * hydration; there is no simulated loading progress or blocking overlay. */
export function Preloader() {
  useEffect(() => {
    document.body.classList.remove("is-loading");
    document.querySelector<HTMLElement>("[data-hero]")?.classList.add("started");
  }, []);

  return null;
}
