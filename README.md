# Isaac Vianna · Portfolio

Bilingual portfolio built with Next.js App Router, React, TypeScript and Tailwind CSS v4. Static export compatible with the existing hosting configuration. The live site is connected to Vercel; the repository also retains its Amplify build file.

## Run locally

Use Node.js 22 (`.nvmrc`) and the pinned Yarn version through Corepack:

```sh
corepack yarn install --immutable
corepack yarn dev
```

Open <http://localhost:3000>. To preview the production export:

```sh
corepack yarn build
python3 -m http.server 3000 --bind 127.0.0.1 --directory out
```

The static export is written to `out/`. This project uses `output: "export"`; `next start` does not serve that output.

## Content and assets

- `src/content/portfolio.ts`: English and Portuguese project content, responsibilities and technical decisions.
- `src/components/sections/`: homepage sections. Projects follow the hero immediately.
- `src/components/ProjectView.tsx`: shared case study layout.
- `src/app/globals.css`: existing dark/coral identity and responsive layouts.
- `source-assets/identity/`: full-quality original portrait and favicon, preserved outside the public export.
- `public/`: right-sized identity assets and existing project imagery.

Regenerate the portrait sizes, favicon and social sharing image after changing an identity source:

```sh
node scripts/optimize-identity.mjs
```

The generator uses Sharp, already supplied by Next.js. The homepage uses horizontal navigation on fine-pointer screens at least 901px wide, including shorter desktop windows. Touch devices, narrow screens, reduced-motion preferences and JavaScript-free visits use the ordinary vertical document. Compact desktop panels remain vertically readable when their content needs more space.

## Verification

```sh
corepack yarn lint
corepack yarn typecheck
corepack yarn build
corepack yarn exec playwright install chromium
corepack yarn test:e2e
```

The Playwright suite covers language persistence, all four case routes, return links, desktop/mobile navigation, keyboard focus, reduced motion, narrow screens, JavaScript-free reading and automated WCAG A/AA checks. To reuse a browser already installed on the machine, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable path. Automated accessibility checks complement manual keyboard and visual review.

Design notes and visual evidence are in `docs/portfolio-refresh/`. The `Portfolio checks` workflow validates pull requests without deploying. `vercel.json` disables automatic deployments only for the review branch `codex/portfolio-refresh`; other branches retain their existing behavior.
