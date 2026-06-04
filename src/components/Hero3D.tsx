"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive 3D point cloud — a Fibonacci sphere of points + nearest-neighbour
 * constellation lines, own perspective projection, reactive to pointer and
 * scroll. Ported from hero3d.js (tiffany accent, no tweaks panel).
 */
export function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ACCENT = "232,211,31";

    let W = 0;
    let H = 0;
    let DPR = 1;
    let cx = 0;
    let cy = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = parent.clientWidth;
      H = parent.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx = W / 2;
      cy = H / 2;
    };

    const N = 720;
    const R = 1;
    const pts: { x: number; y: number; z: number; acc: boolean; pr: number }[] = [];
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      pts.push({
        x: Math.sin(phi) * Math.cos(theta) * R,
        y: Math.sin(phi) * Math.sin(theta) * R,
        z: Math.cos(phi) * R,
        acc: Math.random() < 0.07,
        pr: 0.6 + Math.random() * 0.9,
      });
    }

    const links: [number, number][] = [];
    for (let i = 0; i < N; i++) {
      const a = pts[i];
      const best = [Infinity, Infinity];
      const bi = [-1, -1];
      for (let j = 0; j < N; j++) {
        if (j === i) continue;
        const b = pts[j];
        const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
        if (d < best[0]) {
          best[1] = best[0];
          bi[1] = bi[0];
          best[0] = d;
          bi[0] = j;
        } else if (d < best[1]) {
          best[1] = d;
          bi[1] = j;
        }
      }
      if (bi[0] > i) links.push([i, bi[0]]);
      if (bi[1] > i) links.push([i, bi[1]]);
    }

    let mx = 0;
    let my = 0;
    let tmx = 0;
    let tmy = 0;
    const onPointer = (e: PointerEvent) => {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    let scrollK = 0;
    const onScroll = () => {
      scrollK = (window.scrollY || 0) / window.innerHeight;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    resize();
    window.addEventListener("resize", resize);

    let ang = 0;
    let running = true;
    const proj = new Array(N);

    const frame = () => {
      if (!running) return;
      ang += reduce ? 0 : 0.0016;
      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;

      ctx.clearRect(0, 0, W, H);
      if (scrollK > 1.4) {
        requestAnimationFrame(frame);
        return;
      }

      const rotY = ang + mx * 0.6;
      const rotX = -0.25 + my * 0.5 + scrollK * 0.4;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const scale = Math.min(W, H) * 0.42 * (1 - scrollK * 0.25);
      const persp = 3.2;

      for (let i = 0; i < N; i++) {
        const p = pts[i];
        const x = p.x * cosY - p.z * sinY;
        const z = p.x * sinY + p.z * cosY;
        const y = p.y;
        const y2 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;
        const depth = persp / (persp - z2);
        proj[i] = {
          sx: cx + x * scale * depth,
          sy: cy + y2 * scale * depth,
          d: depth,
          z: z2,
          acc: p.acc,
          pr: p.pr,
        };
      }

      ctx.lineWidth = 1;
      for (let k = 0; k < links.length; k++) {
        const a = proj[links[k][0]];
        const b = proj[links[k][1]];
        const dd = (a.d + b.d) / 2;
        const o = Math.max(0, dd - 0.78) * 0.34;
        if (o <= 0.01) continue;
        ctx.strokeStyle = `rgba(140,136,126,${o})`;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }

      for (let i = 0; i < N; i++) {
        const p = proj[i];
        const o = Math.min(1, Math.max(0.05, (p.d - 0.7) * 1.5));
        const r = p.pr * p.d * 1.3;
        if (p.acc) {
          ctx.fillStyle = `rgba(${ACCENT},${Math.min(1, o)})`;
        } else {
          ctx.fillStyle = `rgba(243,239,231,${o * 0.7})`;
        }
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, 6.2832);
        ctx.fill();
      }

      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);

    return () => {
      running = false;
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas id="hero-canvas" ref={canvasRef} />;
}
