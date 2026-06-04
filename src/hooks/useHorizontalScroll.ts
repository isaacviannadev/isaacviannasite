"use client";

import { useEffect } from "react";

/**
 * Horizontal scroll engine + rail nav + header background. Ported from
 * hscroll.js. Desktop (fine pointer, >=901px) maps vertical scroll onto a
 * smoothed horizontal translate of #htrack; mobile/coarse stays vertical and
 * the rail navigates via anchors. Runs once for the home page.
 */
export function useHorizontalScroll() {
  useEffect(() => {
    const track = document.getElementById("htrack");
    const sizer = document.getElementById("hsizer");
    const nav = document.getElementById("nav");
    const railFill = document.getElementById("rail-fill");
    const railBtns = Array.from(
      document.querySelectorAll<HTMLButtonElement>("#rail .rail-items button")
    );
    if (!track || !sizer) return;

    const panels = Array.from(
      track.querySelectorAll<HTMLElement>(":scope > .panel")
    );
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mq = matchMedia("(min-width: 901px) and (pointer: fine)");

    let active = false;
    let maxX = 0;
    let cur = 0;
    let tgt = 0;
    let raf = 0;

    const vw = () => window.innerWidth;
    const vh = () => window.innerHeight;

    const apply = () => {
      track.style.transform = "translate3d(" + -cur + "px,0,0)";
      window.__HX = cur;
    };

    const progress = () => {
      if (active) return maxX > 0 ? cur / maxX : 0;
      const d = document.documentElement.scrollHeight - vh();
      return d > 0 ? (window.scrollY || 0) / d : 0;
    };

    const activePanel = () => {
      const cxp = vw() / 2;
      const cyp = vh() / 2;
      let best = 0;
      for (let i = 0; i < panels.length; i++) {
        const r = panels[i].getBoundingClientRect();
        if (cxp >= r.left && cxp <= r.right && cyp >= r.top && cyp <= r.bottom) {
          best = i;
          break;
        }
        if (r.left <= cxp) best = i;
      }
      return best;
    };

    const updateChrome = () => {
      const p = progress();
      if (railFill) railFill.style.width = (p * 100).toFixed(2) + "%";
      if (nav) nav.classList.toggle("scrolled", (window.scrollY || 0) > 40);
      const ai = activePanel();
      railBtns.forEach((b, i) => b.classList.toggle("active", i === ai));
    };

    const loop = () => {
      const k = reduce ? 1 : 0.085;
      cur += (tgt - cur) * (reduce ? 1 : k);
      if (typeof window.__ivSweep === "function") window.__ivSweep();
      if (Math.abs(tgt - cur) < 0.4) {
        cur = tgt;
        apply();
        updateChrome();
        raf = 0;
        return;
      }
      apply();
      updateChrome();
      raf = requestAnimationFrame(loop);
    };

    const layout = () => {
      if (active) {
        const tw = track.scrollWidth;
        maxX = Math.max(0, tw - vw());
        sizer.style.height = maxX + vh() + "px";
        tgt = Math.min(maxX, window.scrollY || 0);
        cur = tgt;
        apply();
      } else {
        sizer.style.height = "";
        track.style.transform = "";
      }
      updateChrome();
    };

    const onScroll = () => {
      if (active) {
        tgt = Math.min(maxX, Math.max(0, window.scrollY || 0));
        if (!raf) raf = requestAnimationFrame(loop);
      }
      updateChrome();
    };

    const onRailClick = (btn: HTMLButtonElement) => () => {
      const go = btn.dataset.go;
      const el = go ? document.getElementById(go) : null;
      if (!el) return;
      if (active) {
        const x = Math.min(maxX, el.offsetLeft);
        window.scrollTo({ top: x, behavior: "auto" });
        tgt = x;
        if (!raf) raf = requestAnimationFrame(loop);
      } else {
        const y = el.getBoundingClientRect().top + (window.scrollY || 0) - 40;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };
    const railHandlers = railBtns.map((btn) => {
      const h = onRailClick(btn);
      btn.addEventListener("click", h);
      return h;
    });

    const enable = (on: boolean) => {
      active = on;
      document.body.classList.toggle("hmode", on);
      layout();
    };

    // Deep-link landing: when arriving with a #section hash (e.g. the project
    // page's "Back to index" → /#work), jump straight to that panel.
    const goToHash = () => {
      const id = (window.location.hash || "").replace("#", "");
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      if (active) {
        const x = Math.min(maxX, el.offsetLeft);
        cur = tgt = x;
        window.scrollTo({ top: x, behavior: "auto" });
        apply();
        updateChrome();
      } else {
        const y = el.getBoundingClientRect().top + (window.scrollY || 0) - 40;
        window.scrollTo({ top: y, behavior: "auto" });
      }
    };

    const onMqChange = (e: MediaQueryListEvent) => enable(e.matches);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    const onLoad = () => window.setTimeout(layout, 120);
    window.addEventListener("load", onLoad);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => window.setTimeout(layout, 60));
    }
    if (mq.addEventListener) mq.addEventListener("change", onMqChange);

    enable(mq.matches);
    goToHash();
    const t1 = window.setTimeout(layout, 300);
    const t2 = window.setTimeout(layout, 900);
    const t3 = window.setTimeout(goToHash, 360);
    const t4 = window.setTimeout(goToHash, 980);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      window.removeEventListener("load", onLoad);
      if (mq.removeEventListener) mq.removeEventListener("change", onMqChange);
      railBtns.forEach((btn, i) => btn.removeEventListener("click", railHandlers[i]));
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      if (raf) cancelAnimationFrame(raf);
      document.body.classList.remove("hmode");
      track.style.transform = "";
      sizer.style.height = "";
    };
  }, []);
}
