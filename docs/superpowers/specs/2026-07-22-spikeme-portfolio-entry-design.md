# SpikeMe no portfolio, no lugar do Archimini

Data: 2026-07-22 · Aprovado em conversa

## Objetivo

Substituir o projeto Archimini pelo SpikeMe em `src/content/portfolio.ts`, com imagens no mesmo tratamento editorial dos demais projetos.

## Fonte dos fatos

README.md e PRODUCT.md de `~/DivTech/Package-spike` (repo real do SpikeMe). Nada inventado: analisador local de stack, streaming com typewriter, fatos vivos do npm, kits de adoção por agente (Claude Code, Cursor, Copilot, AGENTS.md), Supabase (Auth, Postgres/RLS, Edge Functions com claim/refund atômico de cota), Stripe (Checkout + Customer Portal + webhook), servidor MCP e CLI.

## Mudanças

1. **`src/content/portfolio.ts`**: remover a entrada `archimini`; adicionar `spikeme` na mesma posição (terceira, entre Ferrari e Zeloclub).
   - slug `spikeme`, title `SpikeMe`, titleHtml `Spike<em>Me</em>`, year `2026`
   - tags: AI, SaaS, Dev Tools
   - summary: PT "Documentos de spike com IA" / EN "AI-written spike documents"
   - role: Fundador & Desenvolvedor Full-stack / Founder & Full-stack Developer
   - overview e did bilíngues (PT/EN), grounded no repo; sem travessões em nenhum texto
   - stack: Next.js 15, Supabase, Stripe, Claude API, MCP
   - slots `spikeme-1..3`; images `spikeme-card.jpg` (4:5), `spikeme-cover.jpg` (16:9), gallery `spikeme-1.jpg` (16:10 tight)
2. **Imagens**: capturar screenshots do SpikeMe (site no ar ou app local em `Package-spike/marketing`); adicionar jobs `spikeme-*` em `scripts/make-mockups.mjs` e gerar os JPGs em `public/projects/`.
3. **Limpeza**: apagar `public/projects/archimini-*.jpg` (nada mais referencia).

## Verificação

`yarn tsc --noEmit` (ou type-check do projeto) e build Next; conferência visual das imagens geradas.
