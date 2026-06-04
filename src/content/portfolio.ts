/* ============================================================
   portfolio.ts — shared bilingual content (PT / EN)
   Ported from the design's content.js.
   ============================================================ */

export type Lang = "en" | "pt";

export type Bilingual = { en: string; pt: string };
export type BilingualList = { en: string[]; pt: string[] };

export interface Project {
  slug: string;
  title: string;
  /** Title with optional <em> markup for the composite accent. */
  titleHtml: string;
  year: string;
  tags: string[];
  summary: Bilingual;
  role: Bilingual;
  overview: Bilingual;
  did: BilingualList;
  stack: string[];
  /** Persistence/image keys (kept for parity with the design). */
  slots: [string, string, string];
  /** Real imagery under /public/projects (card = 4:5, cover = 16:9, gallery = 4:5). */
  images?: { card: string; cover: string; gallery: string[] };
}

/* ---- UI strings (chrome shared across pages) ---- */
export const STRINGS: Record<Lang, Record<string, string>> = {
  en: {
    nav_work: "Work",
    nav_about: "About",
    nav_contact: "Contact",
    avail: "Available · Q3 2026",
    role: "Software Engineer · Creative Developer",
    work_label: "Selected Work · 2018 / 2026",
    view: "View",
    back: "Back to index",
    next_project: "Next project",
    overview: "Overview",
    contribution: "What I did",
    stack: "Stack",
    year: "Year",
    role_label: "Role",
    based: "Brazil & Portugal",
    worldwide: "Working worldwide",
    footer_cta: "Let’s make something",
    typed_lead: "I’m a",
  },
  pt: {
    nav_work: "Projetos",
    nav_about: "Sobre",
    nav_contact: "Contato",
    avail: "Disponível · 3º tri 2026",
    role: "Engenheiro de Software · Desenvolvedor Criativo",
    work_label: "Trabalhos Selecionados · 2018 / 2026",
    view: "Ver",
    back: "Voltar ao índice",
    next_project: "Próximo projeto",
    overview: "Visão geral",
    contribution: "O que eu fiz",
    stack: "Stack",
    year: "Ano",
    role_label: "Função",
    based: "Brasil & Portugal",
    worldwide: "Trabalhando no mundo todo",
    footer_cta: "Vamos criar algo",
    typed_lead: "Sou",
  },
};

/* ---- Hero kinetic typed roles (cycled by the typewriter) ---- */
export const ROLES_TYPED: Record<Lang, string[]> = {
  en: [
    "Software Engineer.",
    "Creative Developer.",
    "React & Next specialist.",
    "Design systems & FE performance.",
    "Front-of-frontend dev.",
  ],
  pt: [
    "Engenheiro de Software.",
    "Desenvolvedor Criativo.",
    "Especialista em React/Next.",
    "Especialista em Design System e performance no FE.",
    "Front-of-frontend.",
  ],
};

/* ---- Projects ---- */
export const PROJECTS: Project[] = [
  {
    slug: "vodafone",
    title: "Vodafone",
    titleHtml: "Vodafone",
    year: "2024",
    tags: ["Next.js", "React", "Architecture"],
    summary: {
      en: "Telecom digital products",
      pt: "Produtos digitais de telecom",
    },
    role: { en: "Frontend Engineer", pt: "Engenheiro de Frontend" },
    overview: {
      en: "Frontend engineering for Vodafone's internal digital products, with TARS, a test automation and reporting system, as the main focus. I led the work from planning to delivery: aligning with stakeholders early to understand pain points and improvement opportunities, prototyping the new application in Figma, designing the architecture, shipping a documented component library and building the frontend of the new version. I worked closely with the backend team to integrate the new API and refine the points that needed more performance and security, always aligned with an excellent UX and Vodafone's global brand strategy.",
      pt: "Engenharia de frontend para os produtos digitais internos da Vodafone, tendo o TARS, sistema de automação de testes e relatórios, como foco principal. Conduzi o trabalho do planejamento à entrega: alinhei com stakeholders desde cedo para entender dores e oportunidades de melhoria, prototipei a nova aplicação no Figma, desenhei a arquitetura, entreguei uma biblioteca de componentes documentada e construí o frontend da nova versão. Trabalhei próximo ao time de backend para integrar a nova API e refinar os pontos que exigiam mais performance e segurança, sempre alinhado a uma entrega de UX excelente e à estratégia global da marca Vodafone.",
    },
    did: {
      en: [
        "Aligned with stakeholders from the planning phase to map pain points and improvements",
        "Prototyped the new application in Figma",
        "Designed the frontend architecture with Next.js, React and Tailwind v4",
        "Built and documented a reusable component library",
        "Developed the frontend of the new version",
        "Integrated with the new backend API, refining performance and security with the BE team",
        "Applied SOLID and clean architecture, migrating use client components to Server Components",
        "Aligned the work with Vodafone's global brand strategy and a strong UX focus",
      ],
      pt: [
        "Alinhei com stakeholders desde o planejamento para mapear dores e melhorias",
        "Prototipei a nova aplicação no Figma",
        "Desenhei a arquitetura frontend com Next.js, React e Tailwind v4",
        "Construí e documentei uma biblioteca de componentes reutilizáveis",
        "Desenvolvi o frontend da nova versão",
        "Integrei com a nova API do backend, refinando performance e segurança junto ao time de BE",
        "Apliquei SOLID e clean architecture, migrando componentes use client para Server Components",
        "Alinhei o trabalho à estratégia global da marca Vodafone com forte foco em UX",
      ],
    },
    stack: ["Next.js", "React", "Tailwind v4", "TypeScript"],
    slots: ["vodafone-1", "vodafone-2", "vodafone-3"],
    images: {
      card: "/projects/vodafone-card.jpg",
      cover: "/projects/vodafone-cover.jpg",
      gallery: ["/projects/vodafone-1.jpg"],
    },
  },
  {
    slug: "ferrari",
    title: "Ferrari",
    titleHtml: "Ferrari",
    year: "2025",
    tags: ["Design System", "Motion", "WebGL"],
    summary: {
      en: "Brand design system & motion",
      pt: "Design system & motion da marca",
    },
    role: {
      en: "Lead Frontend Engineer · Design System",
      pt: "Líder de Frontend · Design System",
    },
    overview: {
      en: "Ferrari's digital experience, where every interface detail has to carry the weight and exigence of the brand. Working directly with the Ferrari Italia team, I led the development and refactoring of their design system: a cross-framework component library in Lit and React, documented end to end in Storybook, that brings cohesion and refinement across many digital touchpoints. This pushed the front end well past the ordinary, with heavy GSAP choreography, real-time Three.js scenes and sound synced to animation, all tuned to feel as precise and emotional as the cars themselves.",
      pt: "A experiência digital da Ferrari, onde cada detalhe da interface precisa carregar o peso e a exigência da marca. Trabalhando diretamente com o time da Ferrari Italia, liderei o desenvolvimento e a refatoração do design system: uma biblioteca de componentes cross-framework em Lit e React, documentada de ponta a ponta no Storybook, que traz coesão e refinamento em múltiplos pontos de contato digitais. Isso levou o front-end muito além do comum, com coreografias pesadas de GSAP, cenas em tempo real com Three.js e som sincronizado à animação, tudo calibrado para soar tão preciso e emocional quanto os próprios carros.",
    },
    did: {
      en: [
        "Worked directly with the Ferrari Italia team, leading the design system's development and refactoring",
        "Built a cross-framework component library in Lit and React, documented end to end in Storybook",
        "Engineered advanced motion with GSAP: choreographed transitions and scroll narratives",
        "Built real-time 3D scenes with Three.js for immersive product moments",
        "Synced sound with animation for a precise, emotional, brand-true experience",
        "Held a strict bar for performance and pixel fidelity under Ferrari's brand requirements",
      ],
      pt: [
        "Trabalhei diretamente com o time da Ferrari Italia, liderando o desenvolvimento e a refatoração do design system",
        "Construí uma biblioteca de componentes cross-framework em Lit e React, documentada de ponta a ponta no Storybook",
        "Desenvolvi motion avançado com GSAP: transições coreografadas e narrativas de scroll",
        "Criei cenas 3D em tempo real com Three.js para momentos imersivos de produto",
        "Sincronizei som com animação para uma experiência precisa, emocional e fiel à marca",
        "Mantive um padrão rigoroso de performance e fidelidade pixel-perfect sob as exigências da marca Ferrari",
      ],
    },
    stack: ["Lit", "React", "GSAP", "Three.js", "Storybook"],
    slots: ["ferrari-1", "ferrari-2", "ferrari-3"],
    images: {
      card: "/projects/ferrari-card.jpg",
      cover: "/projects/ferrari-cover.jpg",
      gallery: ["/projects/ferrari-1.jpg"],
    },
  },
  {
    slug: "archimini",
    title: "Archimini",
    titleHtml: "Archi<em>mini</em>",
    year: "2026",
    tags: ["E-commerce", "Full-stack", "Stripe"],
    summary: {
      en: "Bilingual store for modular miniatures",
      pt: "Loja bilíngue de miniaturas modulares",
    },
    role: { en: "Founder & Full-stack Developer", pt: "Fundador & Desenvolvedor Full-stack" },
    overview: {
      en: "ARCHI.MINI is a product I conceived, planned and own end to end: a direct-to-consumer store for modular, scaled architectural miniatures. From the concept and brand to the engineering, I built the whole thing myself: a bilingual storefront, the kit and piece catalog, the pricing model, hosted checkout with order webhooks, transactional emails, and the deploy pipeline, turning a collectible idea into a shop that can actually take orders.",
      pt: "A ARCHI.MINI é um produto que idealizei, planejei e do qual sou dono de ponta a ponta: uma loja direta ao consumidor de miniaturas arquitetônicas modulares e escaláveis. Do conceito e da marca até a engenharia, construí tudo sozinho: o storefront bilíngue, o catálogo de kits e peças, o modelo de preços, o checkout hospedado com webhooks de pedido, os e-mails transacionais e o pipeline de deploy, transformando uma ideia colecionável em uma loja que realmente recebe pedidos.",
    },
    did: {
      en: [
        "Built a bilingual (EN/PT) storefront with Next.js 16 App Router, React Server Components and Tailwind v4 tokens",
        "Modeled the kit and piece catalog with Drizzle ORM on Postgres",
        "Integrated Stripe hosted Checkout with order webhooks, keeping Stripe as the source of truth for pricing",
        "Wired transactional order emails (customer and store) with Resend",
        "Shipped a persisted cart with Zustand and accessible headless UI with Base UI",
        "Set up SSR hosting on AWS Amplify with a health check and price-sync scripts for CI",
      ],
      pt: [
        "Construí um storefront bilíngue (EN/PT) com Next.js 16 App Router, React Server Components e tokens do Tailwind v4",
        "Modelei o catálogo de kits e peças com Drizzle ORM sobre Postgres",
        "Integrei o Checkout hospedado da Stripe com webhooks de pedido, mantendo a Stripe como fonte da verdade nos preços",
        "Implementei os e-mails transacionais de pedido (cliente e loja) com Resend",
        "Entreguei carrinho persistido com Zustand e UI headless acessível com Base UI",
        "Configurei hosting SSR na AWS Amplify com health check e scripts de sincronização de preços para CI",
      ],
    },
    stack: ["Next.js 16", "Stripe", "Drizzle / Postgres", "Resend", "Tailwind v4"],
    slots: ["archimini-1", "archimini-2", "archimini-3"],
    images: {
      card: "/projects/archimini-card.jpg",
      cover: "/projects/archimini-cover.jpg",
      gallery: ["/projects/archimini-1.jpg"],
    },
  },
  {
    slug: "zeloclub",
    title: "Zeloclub",
    titleHtml: "Zelo<em>club</em>",
    year: "2025",
    tags: ["Marketplace", "Healthcare", "Next.js"],
    summary: {
      en: "Care marketplace & B2B suite",
      pt: "Marketplace de cuidado & suíte B2B",
    },
    role: { en: "Founder · Product & Frontend", pt: "Idealizador · Produto & Frontend" },
    overview: {
      en: "Zeloclub is a venture I conceived and planned, and that I lead on the product and engineering side. It connects professional caregivers with families who need trusted help for elderly loved ones: families post jobs and hire verified professionals; caregivers build a profile, apply and earn ratings. I shaped the product and built the frontend over a .NET API, with a fully typed client generated from its spec, JWT auth and a data layer that keeps these high-trust flows reliable. I also drive Zeloclub Care, the B2B side: a management suite for clinics, care homes and home-care, with role-based apps for managers, caregivers (offline-first PWA) and families.",
      pt: "O Zeloclub é um negócio que idealizei e planejei, e que lidero no lado de produto e engenharia. Ele conecta cuidadores profissionais a famílias que precisam de ajuda confiável para pessoas idosas: as famílias publicam vagas e contratam profissionais verificados; os cuidadores montam um perfil, se candidatam e recebem avaliações. Defini o produto e construí o frontend sobre uma API .NET, com um client totalmente tipado gerado a partir do spec, autenticação JWT e uma camada de dados que mantém esses fluxos de confiança estáveis. Também conduzo o Zeloclub Care, o lado B2B: uma suíte de gestão para clínicas, ILPIs e home cares, com apps por papel para gestores, cuidadores (PWA offline-first) e famílias.",
    },
    did: {
      en: [
        "Built the Next.js 16 / React 19 frontend of the caregiver marketplace",
        "Generated a fully typed API client (Orval) from the .NET backend's OpenAPI spec",
        "Implemented JWT auth and the job-posting, application and verified-professional flows",
        "Used TanStack Query for server state and React Hook Form + Zod across every form",
        "Added product analytics (PostHog) and bot protection (Turnstile) on critical funnels",
        "Contributed to Zeloclub Care: role-based apps for clinic, caregiver (offline-first PWA) and family in a Turborepo monorepo",
      ],
      pt: [
        "Construí o frontend Next.js 16 / React 19 do marketplace de cuidadores",
        "Gerei um client de API totalmente tipado (Orval) a partir do OpenAPI do backend .NET",
        "Implementei autenticação JWT e os fluxos de publicação de vagas, candidatura e profissionais verificados",
        "Usei TanStack Query para server state e React Hook Form + Zod em todos os formulários",
        "Adicionei product analytics (PostHog) e proteção contra bots (Turnstile) nos funis críticos",
        "Contribuí no Zeloclub Care: apps por papel para clínica, cuidador (PWA offline-first) e família num monorepo Turborepo",
      ],
    },
    stack: ["Next.js", "TanStack Query", "TypeScript", "Orval · REST"],
    slots: ["zeloclub-1", "zeloclub-2", "zeloclub-3"],
    images: {
      card: "/projects/zeloclub-card.jpg",
      cover: "/projects/zeloclub-cover.jpg",
      gallery: ["/projects/zeloclub-1.jpg", "/projects/zeloclub-2.jpg"],
    },
  },
];

export const getProject = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);
