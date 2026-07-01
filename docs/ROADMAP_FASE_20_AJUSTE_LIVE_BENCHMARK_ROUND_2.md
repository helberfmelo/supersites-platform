# Fase 20 - Ajuste live benchmark round 2

Data-base: 2026-07-01

Status: em execucao. Criado apos auditoria live da Fase 19 em `https://opentshost.com/supersites/`.

## Achados live

- 950 paginas dos sitemaps responderam 200.
- 995 links internos unicos responderam 200.
- Persistiram 10 ocorrencias de copy operacional em paginas `pt-br/about` dos apps: "temporariamente", "rollback por release" e linguagem de publicacao tecnica.
- A pagina NetProbe DNS Propagation ja renderizava mapa e tabela apos a consulta, mas o estado inicial ainda nao deixava visivel a matriz de cidades/paises/resolvedores antes do guia.

## Etapa 20.1 - Remover copy operacional de About/Status

- Trocar texto compartilhado de paginas About para linguagem publica de produto: ferramentas gratuitas, HTTPS, sitemap publico e paginas localizadas.
- Trocar Status de "production/release/smoke/rollback" para disponibilidade publica, canonical, sitemap e privacidade.
- Fortalecer sanitizacao para reescrever `deploy smoke`, `rollback validation`, `release recovery` e `rollback` como availability/restore em vez de termos de release.

## Etapa 20.2 - DNS Propagation primeira dobra

- Exibir preview de cobertura de resolvedores antes da consulta.
- Mostrar cidade, pais, bandeira, nome do resolvedor, status de prontidao e mapa de cobertura.
- Manter valores e TTL como "aparecem apos a consulta" para nao inventar resultado.

## Validacao planejada

- `pnpm --filter @supersites/i18n test`
- `pnpm test:netprobe`
- `pnpm build:netprobe`
- `pnpm validate:public-copy`
- `git diff --check`
- Deploy dos alvos afetados: Hub, NetProbe e apps estaticos que consomem `@supersites/i18n`.
- Nova auditoria live por sitemaps/links/marcadores.
