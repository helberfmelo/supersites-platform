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
- arquivos ou downloads gerados localmente pelo workbench;
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
- respostas diretas, itens de timeline, metadados de zona/resultados, exemplos editados ou texto de erro derivado de input;
- erros ou mensagens que possam conter partes do input;
- combinacoes de locale, fuso e resultado que possam revelar contexto pessoal.

Sprint 7.6 nao altera o contrato de eventos: resposta direta, timeline, relacionados e paineis de upgrade/support sao UI local sem novos eventos ou propriedades. GA4, GTM, AdSense, backend de analytics externo, contas, historico salvo, widgets, API publica e storage persistente continuam desativados para o TimeNexus.

## QRRoute tools

As ferramentas client-side do QRRoute podem registrar apenas eventos de produto de baixo risco, como `tool_viewed`, `tool_started`, `tool_completed` e `tool_failed`, usando `tool_slug`, rota e locale.

Nao registrar em analytics:

- URLs, hosts, paths, query strings ou fragmentos digitados;
- parametros UTM, campaign names, source, medium, term ou content;
- vCard names, organizations, e-mails, telefones ou websites;
- Wi-Fi SSID, password, security mode ou hidden flag;
- barcode values, payloads gerados, SVG previews ou resultados;
- copy/download actions derivadas de payload, resumo de payload final, related-tool context ou static-vs-dynamic choices quando combinados com valores do usuario;
- destinos de short links, redirect codes ou scan/click facts quando a feature paga existir, salvo agregados anonimos aprovados por contrato futuro.

Sprint 7.7 nao altera o contrato de eventos: tabs de tipo, payload summary, download SVG, copy payload, related tools e paineis static-vs-dynamic/gated sao UI local sem novos eventos ou propriedades. GA4, GTM, AdSense, backend de analytics externo, contas, short links publicos, scan analytics, dominio proprio, lote, API publica e storage persistente continuam desativados para o QRRoute.

## InvoiceCraft tools

As ferramentas client-side do InvoiceCraft podem registrar apenas eventos de produto de baixo risco, como `tool_viewed`, `tool_started`, `tool_completed`, `tool_failed` e `file_downloaded`, usando `tool_slug`, rota e locale.

Nao registrar em analytics:

- nomes, enderecos, e-mails ou detalhes de emissor/cliente;
- numeros de documento, termos, notas, item descriptions ou quantidades;
- valores, totais, descontos, moedas ou ajustes/impostos manuais;
- conteudo ou nome do PDF gerado quando derivado de campos do usuario;
- erros ou mensagens que possam conter partes do documento.

Sprint 7.8 nao altera o contrato de eventos: tabs de template, document snapshot, copy de resumo, related documents e paineis de workflow gated sao UI local sem novos eventos ou propriedades. GA4, GTM, AdSense, backend de analytics externo, contas, clientes/produtos salvos, recorrencia, pagamentos, billing, API publica ou storage persistente do InvoiceCraft continuam desativados.

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

Sprint 7.9 nao altera o contrato de eventos: score de saude, checklist, severidade, fix guidance, related checks e builders de registro planejados sao UI local sem novas propriedades de analytics. GA4, GTM, AdSense, backend de analytics externo, contas, historico salvo, monitoramento recorrente, alertas, relatorios DMARC, billing, API publica paga, webhooks ou storage persistente do MailHealth continuam desativados.

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

## DocShift tools

As ferramentas do DocShift podem registrar apenas eventos de produto de baixo risco, como `tool_viewed`, `tool_started`, `file_processed`, `tool_completed`, `tool_failed` e `file_downloaded`, usando `tool_slug`, rota e locale.

Nao registrar em analytics:

- nomes de arquivo;
- texto colado ou texto de paginas;
- previews, blobs, hashes, bytes ou conteudo de PDF;
- metadados de documento, titulo, autor, producer, creator ou datas;
- page count, page range, paginas extraidas, rotacao escolhida, watermark text ou tamanho de saida;
- erros ou mensagens que possam conter nome do arquivo, conteudo, metadados ou detalhes do documento.

Sprint 5.2 nao ativa GA4, GTM, AdSense, backend de analytics externo, contas, batch, API publica, storage persistente, upload endpoint, OCR, billing ou workers de producao do DocShift.

## Consentimento e Consent Mode

Sprint 6.1 adiciona eventos locais de consentimento no `window.dataLayer`:

- `supersites_consent_default`;
- `supersites_consent_update`.

Esses eventos podem conter apenas versao do contrato, regiao normalizada, booleans de categorias e comandos Consent Mode `default`/`update`. Nao registrar locale detalhado, IP, identificador de usuario, email, URL com query/hash, payload de ferramenta, resultado, nome de arquivo ou qualquer PII.

Enquanto os gates de GA4/GTM/Search Console/AdSense nao forem aprovados, a data layer continua local e nenhum provider externo e carregado. Placeholders de ads podem expor status tecnico de policy no DOM, mas nao devem enviar eventos de impressao, clique ou receita.

## GA4, GTM e Search Console

Sprint 6.2 adiciona uma fundacao de integracao Google sem carregar providers externos:

- `@supersites/analytics` mapeia os 16 eventos padronizados para nomes GA4 compativeis.
- `resolveGoogleIntegrationGate` falha fechado ate existir ambiente de producao, aprovacao humana, consentimento de analytics, flag de tags, GA4 measurement id, GTM container id e Search Console verificado.
- `createGoogleDataLayerEvent` retorna `null` enquanto GA4/GTM estiverem bloqueados.
- Parametros exportaveis para Google usam allowlist estreita: `tool_slug`, `plan_slug`, `site_position`, `result_action`, `file_kind` e `target_url` sanitizado.
- `google_integrations` guarda apenas readiness operacional por site, ids configuraveis e eventos permitidos; nao guarda tokens OAuth, service-account keys ou segredos de verificacao.
- Search Console fica planejado como propriedade de dominio ou URL-prefix, mas a verificacao de propriedade e importacao de dados seguem dependentes de gate humano.

Sprint 6.2 nao ativa scripts GA4/GTM, importacao Search Console, contas Google, tags reais, cookies de terceiro, eventos externos ou coleta adicional.

## AdSense metrics

Sprint 6.3 cria somente readiness operacional de AdSense:

- `adsense_accounts` e `adsense_site_reviews` nao coletam impressoes, cliques, CTR, receita, RPM, cookies, identificadores de visitante ou dados de anuncio.
- AdSense Management API fica desligada ate haver conta publisher aprovada, OAuth/escopos/quotas definidos, consentimento aplicavel e matriz de dados.
- Qualquer snapshot futuro de AdSense deve distinguir dado estimado/finalizado, atraso de reporting, timezone, moeda e origem da API.

Sprint 6.3 nao ativa scripts AdSense, Auto Ads, requests de anuncio, Management API, `ads.txt`, site submission, cookies de terceiro ou coleta externa.

## Billing metrics

Sprint 6.4 cria somente readiness operacional de billing:

- `billing_providers`, `billing_plans`, `billing_entitlements` e `billing_webhook_events` nao coletam cartao, dados bancarios, documentos fiscais, e-mail de cliente, IP, identificador de visitante, receita, assinatura real, invoice real ou payload bruto de webhook.
- Eventos `checkout_started`, `purchase_completed` e `subscription_cancelled` continuam apenas no contrato; nenhum provider externo recebe eventos ou webhooks.
- Qualquer snapshot futuro de billing deve distinguir status estimado/finalizado, provider, moeda, timezone, impostos, refunds, chargebacks, dunning e origem do dado.

Sprint 6.4 nao ativa checkout, payment links, webhooks publicos, SDKs de provider, cobranca, assinatura, impostos automaticos, invoices, refunds, dunning ou coleta externa.

## AI growth metrics

Sprint 6.5 cria somente recomendacoes e anomalias operacionais locais:

- `ai_growth_audits`, `ai_growth_recommendations` e `ai_growth_anomalies` nao coletam PII, input de ferramenta, payload de arquivo, prompt externo, resposta de provider, dados de cliente, receita individual, IP, cookie ou segredo.
- Toda recomendacao deve distinguir evidencia, impacto, esforco, confianca, risco, status humano/bloqueado e score de prioridade.
- Toda anomalia deve distinguir baseline, valor observado, limiar, status e `causalityStatus`; causalidade nao deve ser inferida sem evidencia.
- Nenhum provider externo de IA, telemetria de IA, worker recorrente, prompt egress, auto-publicacao, Search Console import, ads, billing ou provider mutation e ativado.

## Executive reports

Sprint 6.6 cria somente relatorios executivos operacionais locais:

- `@supersites/executive-reports`, `executive_reports` e `executive_report_items` nao coletam PII, input de ferramenta, arquivo, prompt externo, resposta de provider, dados de cliente, IP, cookie, segredo, payload bruto de GA4/Search Console/AdSense/billing ou receita individual.
- Cada item exportavel deve distinguir fonte, evidencia e `data_status`: `finalized`, `estimated`, `delayed` ou `unavailable`.
- CSV e print preservam `data_status` por item e `causality_status` do relatorio.
- `causality_status` permanece `not_inferred`; causalidade nao deve ser inferida sem evidencia e revisao manual futura.
- Nenhum provider import, e-mail recorrente, worker, cron de producao, external analytics, ads, checkout, webhook, billing real ou report automation e ativado.

## Benchmark refinement metrics

Sprint 7.2 cria somente readiness e backlog local de benchmark:

- `benchmark_site_readiness` e `benchmark_opportunities` guardam scores estimados, evidencia documental, status, prioridade, impacto, esforco, confianca, risco e gates humanos.
- Esses registros nao sao analytics de usuario, nao contem trafego real, receita real, impressoes, cliques, query strings, inputs de ferramenta, arquivos, PII ou payload bruto de provider.
- O Hub publico pode emitir apenas os eventos ja permitidos de catalogo; os novos sinais de card nao adicionam novas dimensoes de analytics.
- Nenhum GA4, GTM, Search Console, AdSense, billing provider, doacao, afiliado, external AI ou worker recorrente e ativado por Sprint 7.2.

## Deploy smokes

Smokes de deploy do control-plane/API e do NetProbe devem validar apenas disponibilidade e contrato JSON, sem criar eventos externos de analytics e sem registrar alvo bruto de usuario. O alvo DNS padrao para smoke publico e `example.com`.

## Regras

- Identificar dados estimados, atrasados ou finalizados.
- Tratar paginacao, quota, retry, backoff e datas ausentes.
- Alertar anomalias de trafego, CTR, erros, latencia e receita.
- Nao inferir causalidade sem evidencia.
