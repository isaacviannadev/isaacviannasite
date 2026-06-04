// Compose real product screenshots into editorial mockups that match the
// site identity (near-black warm gradient, subtle accent glow, framed shot
// with rounded corners + thin border + soft shadow). Run: node scripts/make-mockups.mjs
//
// Two framing modes:
//   frame (default) — generous editorial margin; used for covers + cards.
//   tight           — minimal matte, screenshot dominates; used for gallery
//                     shots so dense dashboards stay legible and uncropped.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ACCENT = "#e8d31f";
const OUT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public/projects"
);

const bgSvg = (W, H) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="g" cx="50%" cy="34%" r="86%">
      <stop offset="0%" stop-color="#17140d"/>
      <stop offset="56%" stop-color="#0b0a09"/>
      <stop offset="100%" stop-color="#070605"/>
    </radialGradient>
    <radialGradient id="glow" cx="80%" cy="16%" r="58%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.13"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
</svg>`);

const maskSvg = (w, h, r) =>
  Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" ry="${r}" fill="#fff"/></svg>`);

const borderSvg = (w, h, r) =>
  Buffer.from(`<svg width="${w}" height="${h}"><rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="${r}" ry="${r}" fill="none" stroke="rgba(243,239,231,0.18)" stroke-width="1.5"/></svg>`);

const shadowSvg = (w, h, r, pad, alpha) =>
  Buffer.from(`<svg width="${w + 2 * pad}" height="${h + 2 * pad}"><rect x="${pad}" y="${pad}" width="${w}" height="${h}" rx="${r}" ry="${r}" fill="rgba(0,0,0,${alpha})"/></svg>`);

async function make(inPath, outName, ar, opts = {}) {
  const tight = !!opts.tight;
  const [aw, ah] = ar.split(":").map(Number);
  const longSide = opts.long ?? (tight ? 1920 : 1600);
  let W, H;
  if (aw >= ah) { W = longSide; H = Math.round((longSide * ah) / aw); }
  else { H = tight ? 1500 : 1400; W = Math.round((H * aw) / ah); }

  const fitW = tight ? 0.95 : 0.84;
  const fitH = tight ? 0.92 : 0.82;
  const meta = await sharp(inPath).metadata();
  const scale = Math.min((W * fitW) / meta.width, (H * fitH) / meta.height);
  const sw = Math.round(meta.width * scale);
  const sh = Math.round(meta.height * scale);
  const r = Math.max(
    8,
    Math.min(tight ? 14 : 22, Math.round(Math.min(sw, sh) * (tight ? 0.022 : 0.035)))
  );

  let shot = await sharp(inPath).resize(sw, sh).png().toBuffer();
  shot = await sharp(shot)
    .composite([
      { input: maskSvg(sw, sh, r), blend: "dest-in" },
      { input: borderSvg(sw, sh, r), blend: "over" },
    ])
    .png()
    .toBuffer();

  const left = Math.round((W - sw) / 2);
  const top = Math.round((H - sh) / 2);
  const pad = 46;
  const shadow = await sharp(shadowSvg(sw, sh, r, pad, tight ? 0.4 : 0.55))
    .blur(tight ? 20 : 26)
    .png()
    .toBuffer();

  await sharp(bgSvg(W, H))
    .composite([
      { input: shadow, left: Math.max(0, left - pad), top: Math.max(0, top - pad + (tight ? 16 : 26)) },
      { input: shot, left, top },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(OUT, outName));
  console.log("ok", outName, `${W}x${H}  (shot ${sw}x${sh})${tight ? "  [tight]" : ""}`);
}

const D = "/Users/isaacvianna/Downloads";
const jobs = [
  // ---- covers (16:9, generous frame) ----
  [`${D}/MacBook Pro 16_ - 13.png`, "zeloclub-cover.jpg", "16:9"],
  [`${D}/image 48.png`, "ferrari-cover.jpg", "16:9"],
  [`${D}/image 50.png`, "archimini-cover.jpg", "16:9"],
  [`${D}/Step 1 · Login.png`, "vodafone-cover.jpg", "16:9"],
  // ---- work-strip cards (4:5, frame) ----
  [`${D}/image 47.png`, "zeloclub-card.jpg", "4:5"],
  [`${D}/image 48.png`, "ferrari-card.jpg", "4:5"],
  ["/tmp/image_avif.png", "archimini-card.jpg", "4:5"],
  [`${D}/Step 1 · Login.png`, "vodafone-card.jpg", "4:5"],
  // ---- gallery shots (16:10, tight — screenshot dominates, no crop) ----
  ["/tmp/new-zeloclub.png", "zeloclub-1.jpg", "16:10", { tight: true }], // marketplace: Lista de profissionais
  [`${D}/02 _ Semana por cuidador _ padr_es e folgas.png`, "zeloclub-2.jpg", "16:10", { tight: true }], // Care: escala
  ["/tmp/new-ferrari.png", "ferrari-1.jpg", "16:10", { tight: true }], // design system in Storybook
  [`${D}/image 51.png`, "archimini-1.jpg", "16:10", { tight: true }], // product page
  ["/tmp/new-vodafone.png", "vodafone-1.jpg", "16:10", { tight: true }], // TARS login flow board
];

for (const [inPath, outName, ar, opts] of jobs) {
  await make(inPath, outName, ar, opts).catch((e) => console.error("FAIL", outName, e.message));
}
