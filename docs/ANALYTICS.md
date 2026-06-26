# Analytics

## Objetivo

Unificar metricas de produto, trafego, SEO, monetizacao, billing e operacao sem capturar PII.

## Camadas

- Eventos client-side sanitizados.
- Eventos server-side de negocio.
- Snapshots diarios de GA4, Search Console, AdSense e billing.
- Agregados horarios quando necessario.
- Relatorios executivos semanais e mensais.

## Regras

- Identificar dados estimados, atrasados ou finalizados.
- Tratar paginacao, quota, retry, backoff e datas ausentes.
- Alertar anomalias de trafego, CTR, erros, latencia e receita.
- Nao inferir causalidade sem evidencia.

