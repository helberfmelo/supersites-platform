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

## NetProbe live tools

As ferramentas live `what-is-my-ip`, `dns-lookup`, `rdap-domain-lookup`, `ssl-certificate-checker`, `dns-propagation`, `port-checker` e `ping-traceroute` podem registrar apenas eventos de produto de baixo risco, como `tool_started`, usando `tool_slug` e metadados de UI.

Nao registrar em analytics:

- IP observado do visitante;
- hostname ou dominio consultado;
- tipos DNS selecionados quando combinados com o alvo;
- registros DNS retornados;
- fatos RDAP, registrar, nameservers ou datas de dominio consultado;
- subject, issuer, SANs, fingerprint ou datas de certificado;
- porta selecionada, status de porta, status TCP, latencia, endereco checado ou resultado de propagation/reachability;
- mensagens brutas do resolver.

## NetProbe monitoring

Monitores DNS/SSL/dominio podem gerar eventos de produto como `monitor_created` futuramente, mas sem alvo bruto, dominio, hostname, IP, webhook, e-mail, certificado, registros DNS ou fatos RDAP.

A Sprint 2.6 registra a criacao/execucao manual de monitores em `audit_logs` com `target_hash`; nenhum evento externo de analytics, GA4, GTM ou AdSense foi ativado.

## Deploy smokes

Smokes de deploy do control-plane/API e do NetProbe devem validar apenas disponibilidade e contrato JSON, sem criar eventos externos de analytics e sem registrar alvo bruto de usuario. O alvo DNS padrao para smoke publico e `example.com`.

## Regras

- Identificar dados estimados, atrasados ou finalizados.
- Tratar paginacao, quota, retry, backoff e datas ausentes.
- Alertar anomalias de trafego, CTR, erros, latencia e receita.
- Nao inferir causalidade sem evidencia.
