// Generate static, right-sized identity assets. Run after yarn install:
// node scripts/optimize-identity.mjs
// Uses sharp, already supplied by Next.js and used by make-mockups.mjs.
// Originals remain untouched so future exports can start from full quality.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const sourceDir = path.join(root, "source-assets", "identity");
const portrait = path.join(sourceDir, "isaac.png");

for (const width of [96, 192, 640, 960]) {
  await sharp(portrait)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 86, effort: 6 })
    .toFile(path.join(publicDir, `isaac-${width}.webp`));
}

// The previous favicon is an SVG with a full-size embedded portrait. Replace
// only the embedded raster before rendering, keeping its original crop/path.
const originalIcon = await fs.readFile(path.join(sourceDir, "fav.svg"), "utf8");
const embeddedImage = originalIcon.match(/data:image\/png;base64,([^"\s]+)/)?.[1];
if (!embeddedImage) throw new Error("The original favicon portrait was not found");
const smallPortrait = await sharp(Buffer.from(embeddedImage, "base64"))
  .resize({ width: 256 })
  .png()
  .toBuffer();
const lightSvg = originalIcon.replace(
  /data:image\/png;base64,[^"\s]+/,
  `data:image/png;base64,${smallPortrait.toString("base64")}`,
);
const icon = await sharp(Buffer.from(lightSvg))
  .resize(64, 64)
  .png()
  .toBuffer();
await fs.writeFile(path.join(publicDir, "favicon-64.png"), icon);
await fs.writeFile(
  path.join(publicDir, "favicon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><image width="64" height="64" href="data:image/png;base64,${icon.toString("base64")}"/></svg>\n`,
);
await sharp(Buffer.from(lightSvg))
  .resize(180, 180)
  .png()
  .toFile(path.join(publicDir, "apple-touch-icon.png"));

// A share image with the same portrait, warm ink, paper and coral as the site.
const socialPortrait = await sharp(portrait)
  .resize(470, 630, { fit: "cover", position: "centre" })
  .toBuffer();
const socialText = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#0b0a09"/>
  <g font-family="Helvetica, Arial, sans-serif" fill="#f3efe7">
    <text x="70" y="106" font-size="24">isaacvianna.com.br</text>
    <text x="64" y="289" font-size="79" font-weight="700" letter-spacing="-3">Isaac Vianna<tspan fill="#f94b52">.</tspan></text>
    <text x="70" y="359" font-size="37">Frontend Engineer</text>
    <path d="M70 407H158" stroke="#f94b52" stroke-width="6"/>
    <text x="70" y="476" font-size="24" fill="#b5b0a6">React / Next.js / Design systems</text>
    <text x="70" y="522" font-size="21" fill="#b5b0a6">Brazil &amp; Portugal</text>
  </g>
</svg>`);
await sharp(socialText)
  .composite([{ input: socialPortrait, left: 730, top: 0 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(path.join(publicDir, "social-preview.jpg"));

for (const name of [
  ...[96, 192, 640, 960].map((width) => `isaac-${width}.webp`),
  "favicon.svg", "favicon-64.png", "apple-touch-icon.png", "social-preview.jpg",
]) {
  const filePath = path.join(publicDir, name);
  const metadata = await sharp(filePath).metadata();
  const stat = await fs.stat(filePath);
  console.log(`${name}: ${metadata.width}×${metadata.height}, ${stat.size} bytes`);
}
