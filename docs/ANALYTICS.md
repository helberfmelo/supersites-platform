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

## CalcHarbor calculators

As calculadoras client-side do CalcHarbor podem registrar apenas eventos de produto de baixo risco, como `tool_started`, `tool_completed` e `tool_failed`, usando `tool_slug`.

Nao registrar em analytics:

- valores digitados;
- resultados calculados;
- taxa de juros, prazo, ticket medio, custo fixo, margem, investimento ou receita;
- moeda/localidade combinada com resultado;
- cenarios, comparacoes ou exemplos ajustados pelo usuario.

Sprint 3.1 nao ativa GA4, GTM, AdSense, backend de analytics externo, contas, historico salvo ou API publica do CalcHarbor.

## DevUtility Lab tools

As ferramentas client-side do DevUtility Lab podem registrar apenas eventos de produto de baixo risco, como `tool_started`, `tool_completed` e `tool_failed`, usando `tool_slug`.

Nao registrar em analytics:

- snippets digitados ou colados;
- JSON, XML, YAML, CSV, Base64, JWT, texto de regex, diff, cron, UUID, timestamp ou hashes;
- tokens, claims, headers ou payloads JWT;
- resultados formatados, convertidos, comparados ou gerados;
- tamanho de arquivo/snippet quando combinado com conteudo ou erro especifico;
- mensagens brutas que possam conter partes do input.

Sprint 3.2 nao ativa GA4, GTM, AdSense, backend de analytics externo, contas, historico salvo, workspaces, API publica ou storage persistente do DevUtility Lab.

## TimeNexus tools

As ferramentas client-side do TimeNexus podem registrar apenas eventos de produto de baixo risco, como `tool_viewed`, `tool_started`, `tool_completed` e `tool_failed`, usando `tool_slug`, rota e locale.

Nao registrar em analytics:

- datas, horarios ou fusos digitados;
- data de nascimento, idade ou data de referencia;
- valores de porcentagem, bases, partes, unidades ou quantidades;
- timestamps, resultados convertidos, diferencas calculadas ou contagem de dias uteis;
- erros ou mensagens que possam conter partes do input;
- combinacoes de locale, fuso e resultado que possam revelar contexto pessoal.

Sprint 3.3 nao ativa GA4, GTM, AdSense, backend de analytics externo, contas, historico salvo, widgets, API publica ou storage persistente do TimeNexus.

## QRRoute tools

As ferramentas client-side do QRRoute podem registrar apenas eventos de produto de baixo risco, como `tool_viewed`, `tool_started`, `tool_completed` e `tool_failed`, usando `tool_slug`, rota e locale.

Nao registrar em analytics:

- URLs, hosts, paths, query strings ou fragmentos digitados;
- parametros UTM, campaign names, source, medium, term ou content;
- vCard names, organizations, e-mails, telefones ou websites;
- Wi-Fi SSID, password, security mode ou hidden flag;
- barcode values, payloads gerados, SVG previews ou resultados;
- destinos de short links, redirect codes ou scan/click facts quando a feature paga existir, salvo agregados anonimos aprovados por contrato futuro.

Sprint 4.1 nao ativa GA4, GTM, AdSense, backend de analytics externo, contas, short links publicos, scan analytics, dominio proprio, lote, API publica ou storage persistente do QRRoute.

## InvoiceCraft tools

As ferramentas client-side do InvoiceCraft podem registrar apenas eventos de produto de baixo risco, como `tool_viewed`, `tool_started`, `tool_completed`, `tool_failed` e `file_downloaded`, usando `tool_slug`, rota e locale.

Nao registrar em analytics:

- nomes, enderecos, e-mails ou detalhes de emissor/cliente;
- numeros de documento, termos, notas, item descriptions ou quantidades;
- valores, totais, descontos, moedas ou ajustes/impostos manuais;
- conteudo ou nome do PDF gerado quando derivado de campos do usuario;
- erros ou mensagens que possam conter partes do documento.

Sprint 4.2 nao ativa GA4, GTM, AdSense, backend de analytics externo, contas, clientes/produtos salvos, recorrencia, pagamentos, billing, API publica ou storage persistente do InvoiceCraft.

## MailHealth tools

As ferramentas do MailHealth podem registrar apenas eventos de produto de baixo risco, como `tool_viewed`, `tool_started`, `tool_completed` e `tool_failed`, usando `tool_slug`, rota e locale.

Nao registrar em analytics:

- dominios consultados;
- selectors DKIM;
- hosts MX ou SMTP;
- IPs resolvidos ou checados;
- registros SPF, DKIM, DMARC, MX, TXT ou DNSBL;
- status SMTP, latencia, porta, erro tecnico ou resposta de provider;
- headers brutos, `Authentication-Results`, `Received-SPF`, `DKIM-Signature`, `From`, `Return-Path`, Message-ID ou enderecos de email;
- resultados, warnings ou mensagens que possam conter parte do input.

Sprint 4.3 nao ativa GA4, GTM, AdSense, backend de analytics externo, contas, historico salvo, monitoramento recorrente, alertas, relatorios DMARC, billing, API publica paga, webhooks ou storage persistente do MailHealth.

## SitePulse Lab tools

As ferramentas do SitePulse Lab podem registrar apenas eventos de produto de baixo risco, como `tool_viewed`, `tool_started`, `tool_completed` e `tool_failed`, usando `tool_slug`, rota e locale.

Nao registrar em analytics:

- URLs consultadas, hosts, paths, queries ou fragments;
- redirect targets, redirect chain ou quantidade de saltos derivada do alvo;
- headers de resposta, security headers ausentes/presentes ou valores de header;
- status code, TTFB, duracao, tamanho de body, robots, sitemap ou snippets;
- warnings, erros ou mensagens que possam conter parte do alvo;
- qualquer dado retornado pelo endpoint `/api/v1/sitepulse/probe`.

Sprint 4.4 nao ativa GA4, GTM, AdSense, backend de analytics externo, contas, historico salvo, uptime recorrente, incidentes, status page, alertas, billing, API publica paga, webhooks ou storage persistente do SitePulse Lab.

## PixelBatch tools

As ferramentas do PixelBatch podem registrar apenas eventos de produto de baixo risco, como `tool_viewed`, `tool_started`, `file_processed`, `tool_completed`, `tool_failed` e `file_downloaded`, usando `tool_slug`, rota e locale.

Nao registrar em analytics:

- nomes de arquivo;
- pixels, previews, blobs, hashes ou conteudo de imagem;
- dimensoes de entrada/saida, tamanho de arquivo/blob, qualidade ou formato escolhido;
- metadados EXIF/IPTC, camera, geolocalizacao ou datas extraidas;
- preset social escolhido quando derivado do input do usuario;
- erros ou mensagens que possam conter nome do arquivo ou detalhes da imagem.

Sprint 5.1 nao ativa GA4, GTM, AdSense, backend de analytics externo, contas, batch, API publica, storage persistente, upload endpoint, IA, billing ou workers de producao do PixelBatch.

## Deploy smokes

Smokes de deploy do control-plane/API e do NetProbe devem validar apenas disponibilidade e contrato JSON, sem criar eventos externos de analytics e sem registrar alvo bruto de usuario. O alvo DNS padrao para smoke publico e `example.com`.

## Regras

- Identificar dados estimados, atrasados ou finalizados.
- Tratar paginacao, quota, retry, backoff e datas ausentes.
- Alertar anomalias de trafego, CTR, erros, latencia e receita.
- Nao inferir causalidade sem evidencia.
