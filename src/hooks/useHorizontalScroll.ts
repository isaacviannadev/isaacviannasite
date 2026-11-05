"use client";

import { useEffect } from "react";

/** Keep the desktop horizontal presentation navigable with native hash links,
 * browser history and keyboard focus. Touch and reduced-motion users get the
 * ordinary vertical document. */
export function useHorizontalScroll() {
  useEffect(() => {
    const track = document.getElementById("htrack");
    const sizer = document.getElementById("hsizer");
    if (!track || !sizer) return;

    const nav = document.getElementById("nav");
    const railFill = document.getElementById("rail-fill");
    const railItems = Array.from(
      document.querySelectorAll<HTMLElement>("#rail [data-go]")
    );
    const panels = Array.from(track.querySelectorAll<HTMLElement>(":scope > .panel"));
    const desktop = matchMedia("(min-width: 901px) and (pointer: fine)");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let active = false;
    let maxX = 0;
    let current = 0;
    let target = 0;
    let animation = 0;
    let resizeFrame = 0;
    let disposed = false;

    const activePanel = () => {
      const middle = active ? innerWidth / 2 : innerHeight / 2;
      let closest = panels[0];
      let distance = Infinity;
      for (const panel of panels) {
        const rect = panel.getBoundingClientRect();
        const start = active ? rect.left : rect.top;
        const end = active ? rect.right : rect.bottom;
        const next = Math.max(start - middle, middle - end, 0);
        if (next < distance) {
          closest = panel;
          distance = next;
        }
      }
      return closest;
    };

    const updateChrome = () => {
      const range = active ? maxX : document.documentElement.scrollHeight - innerHeight;
      const position = active ? current : scrollY;
      const progress = range > 0 ? Math.min(1, Math.max(0, position / range)) : 0;
      if (railFill) railFill.style.width = `${progress * 100}%`;
      nav?.classList.toggle("scrolled", scrollY > 40);
      const id = activePanel()?.id;
      for (const item of railItems) {
        const selected = item.dataset.go === id;
        item.classList.toggle("active", selected);
        if (selected) item.setAttribute("aria-current", "location");
        else item.removeAttribute("aria-current");
      }
    };

    const apply = () => {
      track.style.transform = `translate3d(${-current}px,0,0)`;
      window.__HX = current;
      window.__ivSweep?.();
      updateChrome();
    };

    const loop = () => {
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.4) {
        current = target;
        animation = 0;
        apply();
        return;
      }
      apply();
      animation = requestAnimationFrame(loop);
    };

    const layout = () => {
      if (disposed) return;
      if (active) {
        maxX = Math.max(0, track.scrollWidth - innerWidth);
        sizer.style.height = `${maxX + innerHeight}px`;
        current = target = Math.min(maxX, Math.max(0, scrollY));
        apply();
      } else {
        track.style.transform = "";
        sizer.style.height = "";
        window.__HX = 0;
        window.__ivSweep?.();
        updateChrome();
      }
    };

    const moveHorizontal = (position: number, immediate: boolean) => {
      target = Math.min(maxX, Math.max(0, position));
      window.scrollTo({ top: target, left: 0, behavior: "instant" });
      if (immediate) {
        cancelAnimationFrame(animation);
        animation = 0;
        current = target;
        apply();
      } else if (!animation) animation = requestAnimationFrame(loop);
    };

    const navigate = (element: HTMLElement, focus = false, immediate = false) => {
      const panel = element.closest<HTMLElement>(".panel");
      if (active) {
        if (panel === element) element.scrollTop = 0;
        const position = panel === element
          ? element.offsetLeft
          : current + element.getBoundingClientRect().left - 24;
        moveHorizontal(position, immediate || focus);
      } else {
        const position = element.getBoundingClientRect().top + scrollY - 96;
        window.scrollTo({
          top: Math.max(0, position),
          left: 0,
          behavior: motion.matches || immediate || focus ? "instant" : "smooth",
        });
      }
      if (focus) {
        if (!element.hasAttribute("tabindex")) element.setAttribute("tabindex", "-1");
        element.focus({ preventScroll: true });
      }
    };

    const hashTarget = () => {
      try {
        return document.getElementById(decodeURIComponent(location.hash.slice(1)));
      } catch {
        return null;
      }
    };
    const goToHash = () => {
      const element = hashTarget();
      if (element && (track.contains(element) || element === track)) {
        navigate(element, false, true);
      }
    };

    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
      let element: HTMLElement | null = null;
      try { element = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
      if (!element || (!track.contains(element) && element !== track)) return;
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(null, "", url.hash);
      navigate(element, true);
    };

    const onFocus = (event: FocusEvent) => {
      if (!active) return;
      const element = event.target;
      if (!(element instanceof HTMLElement) || !track.contains(element)) return;
      if (element === track || element.classList.contains("panel")) return;
      const rect = element.getBoundingClientRect();
      if (rect.left < 16 || rect.right > innerWidth - 16) {
        moveHorizontal(current + rect.left - 24, true);
      }
      // Short desktop panels can scroll internally. Keep focused controls clear
      // of the fixed header and rail as well as the viewport's horizontal edges.
      const panel = element.closest<HTMLElement>(".panel");
      if (panel && panel.scrollHeight > panel.clientHeight) {
        const bounds = element.getBoundingClientRect();
        const safeTop = (nav?.getBoundingClientRect().bottom ?? 76) + 16;
        const safeBottom = (document.getElementById("rail")?.getBoundingClientRect().top ?? innerHeight) - 16;
        const availableHeight = safeBottom - safeTop;
        const delta = bounds.height > availableHeight || bounds.top < safeTop
          ? bounds.top - safeTop
          : Math.max(0, bounds.bottom - safeBottom);
        if (delta) panel.scrollBy({ top: delta, behavior: "instant" });
      }
      window.__ivSweep?.();
    };

    const onPanelScroll = () => window.__ivSweep?.();
    const onScroll = () => {
      if (active) {
        target = Math.min(maxX, Math.max(0, scrollY));
        if (!animation) animation = requestAnimationFrame(loop);
      } else updateChrome();
    };
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(layout);
    };
    const configure = () => {
      const panel = activePanel();
      const previous = active;
      active = desktop.matches && !motion.matches;
      document.body.classList.toggle("hmode", active);
      cancelAnimationFrame(animation);
      animation = 0;
      layout();
      if (previous !== active && panel) navigate(panel, false, true);
    };

    active = desktop.matches && !motion.matches;
    document.body.classList.toggle("hmode", active);
    layout();
    goToHash();
    document.addEventListener("click", onClick, true);
    document.addEventListener("focusin", onFocus);
    window.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("scroll", onPanelScroll, true);
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", goToHash);
    window.addEventListener("popstate", goToHash);
    window.addEventListener("load", layout);
    desktop.addEventListener("change", configure);
    motion.addEventListener("change", configure);
    const observer = new ResizeObserver(onResize);
    observer.observe(track);
    panels.forEach((panel) => observer.observe(panel));
    document.fonts.ready.then(() => {
      if (!disposed) {
        layout();
        goToHash();
      }
    });

    return () => {
      disposed = true;
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("scroll", onScroll);
      track.removeEventListener("scroll", onPanelScroll, true);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", goToHash);
      window.removeEventListener("popstate", goToHash);
      window.removeEventListener("load", layout);
      desktop.removeEventListener("change", configure);
      motion.removeEventListener("change", configure);
      observer.disconnect();
      cancelAnimationFrame(animation);
      cancelAnimationFrame(resizeFrame);
      document.body.classList.remove("hmode");
      track.style.transform = "";
      sizer.style.height = "";
      delete window.__HX;
    };
  }, []);
}
