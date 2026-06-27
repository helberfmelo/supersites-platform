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

## Pendencias humanas

Ver `docs/HUMAN_ACTION_REQUIRED.md`.
