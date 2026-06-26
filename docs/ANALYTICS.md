# Analytics

## Objetivo

Unificar metricas de produto, trafego, SEO, monetizacao, billing e operacao sem capturar PII.

## Camadas

- Eventos client-side sanitizados.
- Eventos server-side de negocio.
- Snapshots diarios de GA4, Search Console, AdSense e billing.
- Agregados horarios quando necessario.
- Relatorios executivos semanais e mensais.

## Contrato Sprint 1.6

Fonte de verdade compartilhada: `packages/analytics`.

Eventos permitidos na versao `2026-06-26.1`:

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

Regras de payload:

- chaves com PII ou segredo sao descartadas;
- e-mails, IPs, numeros longos e tokens em valores string sao redigidos;
- URLs e paths perdem query string e fragmento;
- `anonymous_id` e `session_id` nunca sao armazenados crus no backend, apenas hash;
- o catalogo Nuxt grava eventos apenas em `window.supersitesAnalyticsEvents` e `window.dataLayer` ate existir consentimento e integracao externa aprovada.

Endpoints internos:

- `POST /api/v1/analytics/events`: ingestao publica de eventos whitelisted e sanitizados.
- `GET /api/v1/metric-snapshots`: snapshots internos autenticados para `dashboard.view`.

## Regras

- Identificar dados estimados, atrasados ou finalizados.
- Tratar paginacao, quota, retry, backoff e datas ausentes.
- Alertar anomalias de trafego, CTR, erros, latencia e receita.
- Nao inferir causalidade sem evidencia.
