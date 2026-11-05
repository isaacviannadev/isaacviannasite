# Verificação da revisão do portfólio

Validado em 5 de novembro de 2026. Checkout local na branch `codex/portfolio-refresh`, a partir de `c46164fbffe239f4c4c3573a25cb51547c9448a3`. O checkout original estava limpo. A revisão preserva o scroll horizontal como experiência principal de desktop, incluindo janelas baixas; o PR utiliza apenas checks de validação, sem merge ou deploy.

## Resultado

- `corepack yarn lint`: passou, sem avisos.
- `corepack yarn typecheck`: passou.
- `corepack yarn build`: passou com Node.js 22.22.2, gerando a home, os quatro cases e a página 404 como arquivos estáticos.
- `corepack yarn test:e2e`: 12 testes passaram sobre a exportação estática.
- `git diff --check`: passou.

Os testes cobrem persistência do idioma, navegação dos quatro cases e retorno aos projetos, hashes e links de retorno, foco visível e teclado no modo horizontal, skip link, movimento reduzido e sua mudança em tempo de execução, telas de 390 e 320px, rolagem horizontal desde a primeira wheel em janelas de 1280×640 e 1024×600, visita sem JavaScript, armazenamento bloqueado, textos traduzidos nas seções já abertas e ausência de erros de execução/arquivos ausentes. Em 320px, `innerWidth` e `clientWidth` são iguais a 320, sem expansão horizontal.

A verificação automatizada com axe encontrou zero violações nos critérios WCAG A/AA configurados para a home e o case Vodafone. Revisão visual em 1440×900, 1024×768, 1280×640 e 1024×600, além de mobile; smoke adicional de navegação mobile em WebKit.

## Alterações principais

- Projetos imediatamente após a abertura, com contribuição individual visível nos cards.
- Apresentação como frontend sênior, com React, Next.js, TypeScript e visão de produto.
- Quatro cases existentes preservados e ampliados com decisões técnicas baseadas no conteúdo original.
- Links diretos para projetos, sobre e contato; e-mail disponível desde a abertura.
- Navegação horizontal preservada em telas amplas, inclusive em janelas baixas, com fallback vertical para toque, telas estreitas e movimento reduzido.
- Remoção da espera artificial de abertura, ajustes de foco, rótulos e seletor de idiomas.
- Metadados de compartilhamento, imagem social e página 404 bilíngue.

## Ativos de identidade

Os originais `isaac.png` e `fav.svg` somavam 56.072.766 bytes. Eles foram preservados, com conteúdo idêntico confirmado por SHA-256, em `source-assets/identity/`, fora da exportação pública.

O retrato usa variantes WebP de 3–81KB e o novo favicon SVG tem 14KB. Os testes confirmam que as rotas não solicitam os antigos arquivos enormes. A exportação estática completa ocupa aproximadamente 2,8MiB. O script `scripts/optimize-identity.mjs` permite regenerar os ativos.

## Revisão sem publicação

O site está conectado à Vercel. O arquivo `vercel.json` desabilita deploys automáticos somente para `codex/portfolio-refresh`, conforme a [configuração oficial de Git](https://vercel.com/docs/project-configuration/git-configuration). O workflow de GitHub Actions executa apenas validações em pull requests.

## Visualização

O servidor de prévia foi encerrado conforme solicitado. Para revisar localmente, um servidor pode servir os arquivos compilados de `out/` sem alterar produção. Os testes iniciam um servidor temporário na porta 4173 e o encerram ao terminar. A fixture HTTP/1.1 com backlog ampliado evita recusar conexões simultâneas de assets durante os checks.

Para reiniciar:

```sh
corepack yarn build
python3 -m http.server 3000 --bind 127.0.0.1 --directory out
```

Para editar com atualização automática, use `corepack yarn dev` no lugar do servidor estático.

Capturas principais: [desktop em português](desktop-pt.png), [desktop em inglês](desktop-en.png), [projetos](desktop-work-pt.png), [mobile em português](mobile-pt.png), [case Vodafone mobile](case-vodafone-mobile-pt.png) e [versão anterior](before-desktop.png).
