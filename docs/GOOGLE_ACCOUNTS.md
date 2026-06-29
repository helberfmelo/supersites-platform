# Google Accounts

## Objetivo

Registrar contas, funcoes e responsabilidades sem segredos.

## Estrutura alvo

- Google Workspace para comunicacao humana e administrativa.
- Projetos Google Cloud separados para desenvolvimento e producao.
- GA4, GTM e Search Console por dominio/site.
- Uma unica conta AdSense por beneficiario legal/publisher.

## Eventos padronizados

- `tool_viewed`
- `tool_started`
- `tool_completed`
- `tool_failed`
- `result_copied`
- `file_uploaded`
- `file_processed`
- `file_downloaded`
- `monitor_created`
- `signup_started`
- `signup_completed`
- `upgrade_viewed`
- `checkout_started`
- `purchase_completed`
- `subscription_cancelled`
- `outbound_site_click`

## PII

Nunca enviar email, telefone, documento, nome completo, IP completo, conteudo de arquivo ou entrada de ferramenta para analytics.

## Sprint 6.2 foundation

- `@supersites/analytics` define o contrato Google, nomes GA4 compativeis e parametros allowlisted.
- `google_integrations` registra readiness por site no control-plane, sem tokens ou segredos.
- Todas as propriedades/containers/verificacoes ficam em estado `human_required` ou `not_configured` ate aprovacao.
- Nenhum script GA4/GTM, Search Console import, cookie de terceiro ou evento externo foi ativado.

## Sprint 6.3 AdSense foundation

- `@supersites/ads` define readiness de conta AdSense, publisher id, Management API e revisao por site.
- `adsense_accounts` registra somente `primary-publisher` sem publisher id real, tokens, dados fiscais, banco, PIN ou emails Google.
- `adsense_site_reviews` registra sites publicos como `not_submitted`, com `placements_enabled=false`, `auto_ads_enabled=false` e `ad_serving_enabled=false`.
- Nenhum site foi adicionado ao AdSense, nenhum `ads.txt` real foi publicado e nenhuma API/snippet/request de anuncio foi ativado.

## Sprint 12.3 readiness check

- `pnpm measure:google-ready` gera evidencia local em `artifacts/google-readiness/` sem chamar APIs Google ou AdSense.
- O check valida contratos fail-closed, seeders sem IDs reais, ausencia de snippets publicos ativos, ausencia de `ads.txt` placeholder e pendencias humanas.
- O run `2026-06-29T05-47-31Z` passou com 18 checks, 0 falhas e ativacao 0 para GA4, GTM, Search Console, AdSense e PageSpeed API.

## Pendencias humanas

Ver `docs/HUMAN_ACTION_REQUIRED.md`.
