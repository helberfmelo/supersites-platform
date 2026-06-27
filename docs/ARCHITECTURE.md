# Architecture

## Decisao base

SuperSites inicia como monorepo privado com deploy, banco, ambiente, secrets e rollback independentes por app/site.

Stack alvo:

- Backend/APIs: PHP 8.3+ e Laravel 13.
- Frontend publico: Nuxt 4, Vue 3, TypeScript, SSR/SSG.
- Admin/control plane: Vue 3/TypeScript, Inertia quando simplificar.
- Banco: MySQL 8.4 LTS alvo; compatibilidade HostGator deve ser verificada antes de usar collations ou recursos especificos.
- Cache/filas/rate limit: Redis.
- CI/CD: GitHub Actions.
- Hospedagem transitoria: HostGator/opentshost.com.
- CDN/WAF futuro: Cloudflare ou equivalente aprovado.

## Redis em producao

Redis e obrigatorio para a plataforma completa: cache, filas, rate limit, locks, workers de monitoramento e jobs de IA/metricas.

O HostGator/cPanel transitorio `opentshost.com` nao deve ser tratado como runtime Redis. Redis, workers e processos longos devem rodar no HostGator VPS ou em Redis gerenciado. O catalogo publico pode iniciar em modo sem Redis se for SSG/estatico ou usar fallback simples sem filas.

Estado em 2026-06-26: Redis inicial de producao foi provisionado na VPS HostGator como `supersites-redis.service`, autenticado por ACL, ouvindo apenas em `127.0.0.1:6381`, com dados em `/var/lib/supersites-redis` e logs em `/var/log/supersites`. Redis nao fica exposto publicamente.

## Estrutura local

- `apps/supersite`: catalogo publico.
- `apps/control-plane`: administracao e metricas.
- `apps/<site>`: apps independentes de cada produto.
- `packages/*`: bibliotecas compartilhadas.
- `infra/*`: ambientes, deploy, cron, monitoring, backups.
- `docs/*`: fontes da verdade.

## Pacotes compartilhados iniciais

Sprint 1.3 criou os primeiros pacotes TypeScript fonte-primeiro:

- `@supersites/ui`: tokens, receitas de componentes e variantes visuais compartilhadas.
- `@supersites/i18n`: idiomas iniciais, rotas localizadas, seletor de idioma e formatadores Intl.
- `@supersites/seo`: canonical, hreflang, metadata e sitemap XML.
- `@supersites/consent`: categorias de consentimento, Consent Mode, regioes e regras de exibicao segura de anuncios.
- `@supersites/analytics`: contrato versionado de eventos, sanitizacao PII-safe e payloads de data layer.
- `@supersites/ads`: policy de placements, formatos responsivos reservados, limites de densidade e bloqueios anti-clique-acidental.
- `@supersites/billing`: contrato provider-agnostic de readiness de billing, planos, entitlements e decisoes de webhook fail-closed.
- `@supersites/ai-growth`: contrato local de recomendacoes com evidencia, scores, redacao de PII/segredos, priorizacao deterministica e anomalias sem causalidade inferida.

Apps novos devem importar esses contratos antes de duplicar helpers locais.

## Consentimento e ads gated

Sprint 6.1 adiciona a fundacao de monetizacao sem ativar monetizacao real:

- `@supersites/consent` mantem categorias de consentimento, storage versionado `supersites.consent.v1`, comandos Consent Mode, deteccao de regioes que exigem consentimento/TCF e bloqueio de superficies sensiveis.
- `@supersites/ads` consome o contrato de consentimento para criar planos de slot com `shouldRenderPlaceholder` e `shouldRequestAd` separados.
- O Hub renderiza uma CMP local e um placeholder inerte com dimensoes reservadas; feature flag, delivery gate e conta AdSense permanecem desligados.
- Nenhum script externo de AdSense, GTM, GA4 ou CMP certificada e carregado ate haver gates humanos, configuracao de fornecedor e deploy especifico aprovados.

## Google integrations gated foundation

Sprint 6.2 adiciona readiness de GA4/GTM/Search Console sem ativar tags externas:

- `@supersites/analytics` exporta nomes GA4 compativeis, `resolveGoogleIntegrationGate`, `createGoogleDataLayerEvent` e planejador de propriedade Search Console.
- O gate exige producao, aprovacao humana, consentimento de analytics, feature flag, ids GA4/GTM e Search Console verificado antes de permitir tag delivery.
- `google_integrations` armazena status por site, ids configuraveis e allowlist de eventos sem guardar tokens ou segredos.
- O dashboard admin exibe os sites ainda bloqueados para acesso/verificacao/configuracao Google.

## AdSense account readiness foundation

Sprint 6.3 adiciona readiness AdSense sem ativar conta, API ou anuncios:

- `@supersites/ads` exporta contrato de publisher account, publisher id, Management API e site review com falha fechada.
- O gate exige beneficiario legal, checagem de conta duplicada, termos, fiscal, perfil de pagamentos, banco, PIN, publisher id valido, dominio definitivo, deploy/smoke publico, qualidade, paginas legais, consentimento, `ads.txt`, policy review e feature flag.
- `adsense_accounts` registra apenas status operacional do publisher; nao armazena dados fiscais, bancarios, OAuth tokens, emails Google ou secrets.
- `adsense_site_reviews` registra readiness por site publico, mantendo `placements_enabled`, `auto_ads_enabled` e `ad_serving_enabled` falsos por padrao.
- O dashboard admin exibe conta `primary-publisher` e sites ainda nao submetidos para revisao.

## Billing foundation

Sprint 6.4 adiciona readiness de billing sem ativar cobranca:

- `@supersites/billing` exporta contrato para Stripe, Mercado Pago e Paddle, com normalizacao de provider, gates de checkout/webhook, builder de planos, sanitizer de entitlements e decisao idempotente de webhook.
- O gate exige contas aprovadas, KYC, termos, impostos, perfil de pagamentos, aceite de checkout, API key, webhook secret e endpoint aprovado antes de permitir checkout ou processamento de webhook.
- `billing_providers` armazena apenas readiness operacional por provider; `billing_plans` e `billing_entitlements` descrevem planos locais sem price id real no MVP; `billing_webhook_events` define ledger futuro para idempotencia e payload hash.
- O dashboard admin exibe provedores bloqueados e planos `free-preview` seedados para os sites publicos.
- Nao ha provider SDK, API key, checkout endpoint, payment link, webhook publico, assinatura, cobranca, imposto, refund, dunning ou entitlement pago nesta sprint.

## AI growth evidence engine

Sprint 6.5 adiciona auditoria e priorizacao local sem provider externo de IA:

- `@supersites/ai-growth` exporta categorias de crescimento, contrato de recomendacao, sanitizacao de PII/segredos, priorizacao deterministica e detector de anomalias com `causalityStatus=not_inferred`.
- Toda recomendacao exige evidencia, impacto, esforco, confianca e risco; registros sem evidencia ou score ficam bloqueados.
- `ai_growth_audits`, `ai_growth_recommendations` e `ai_growth_anomalies` armazenam apenas evidencia operacional, status e scores; nao armazenam prompt, resposta de provider, input bruto de ferramenta, arquivo, PII, segredo, token ou dado financeiro/cliente.
- O dashboard admin exibe recomendacoes e anomalias seedadas para readiness, mantendo `automationAllowed=false`.
- Nao ha SDK/API de IA, chamada externa, worker recorrente, auto-publicacao, alteracao de SEO, mudanca de ads, checkout/billing, Search Console import ou mutation em provider nesta sprint.

## Executive reports

Sprint 6.6 adiciona relatorios executivos locais e exportaveis no control plane:

- `@supersites/executive-reports` exporta contrato versionado para relatorios `weekly`/`monthly`, itens evidenciados, resumo de data status e CSV.
- Cada item distingue `finalized`, `estimated`, `delayed` ou `unavailable`; o resumo do relatorio agrega esses status sem misturar disponibilidade.
- `executive_reports` armazena periodo, status, versao de contrato, resumo de data status, `causality_status`, origem e flag `export_ready`.
- `executive_report_items` armazena secao, site opcional, metrica, valor, unidade, data status, fonte e evidencias; nao armazena PII, provider payload, receita individual, token ou segredo.
- `/admin/reports`, detalhe, print e export CSV usam a permissao existente `dashboard.view` e registram audit logs de visualizacao/exportacao.
- `causality_status` permanece `not_inferred`; linguagem causal bloqueia export readiness no contrato TypeScript ate existir revisao manual com evidencia.
- Nao ha importacao GA4/Search Console/AdSense/billing, envio de e-mail, agendamento recorrente, worker, provider externo, receita real ou automacao de relatorio nesta sprint.

## Benchmark refinement dashboard

Sprint 7.2 adiciona readiness de benchmark e backlog de oportunidades no control plane, conforme ADR `0030`.

- `benchmark_site_readiness` registra scores estimados por superficie publica: benchmark, SEO/AIO, AdSense, monetizacao, frontend, performance e overall.
- `benchmark_opportunities` registra oportunidades por site com prioridade, impacto, esforco, confianca, risco, status, evidencia, `data_status` e gate humano.
- `/admin/benchmark-refinement` usa a permissao existente `dashboard.view` e registra auditoria de visualizacao.
- O dashboard principal mostra um resumo de readiness/backlog e a rota dedicada mostra a matriz completa.
- O Hub publico mostra apenas sinais compactos de catalogo, como quantidade de frentes de ferramenta, idiomas e monetizacao gated.
- Nao ha provider import, ad serving, billing real, doacao ativa, afiliado real, automacao de IA ou publicacao de scores como metricas reais nesta sprint.

## Stack local inicial

- Workspace Node: `pnpm@11.9.0`.
- Catalogo publico: Nuxt `4.4.8`, Vue `3.5.39`, TypeScript `6.0.3`.
- Control plane/API: Laravel `13.x` em PHP `^8.3`.
- Redis client Laravel local: `predis/predis`, evitando dependencia obrigatoria da extensao PHP Redis no workstation/CI.
- Docker local: MySQL em `127.0.0.1:3317`, Redis em `127.0.0.1:6381`, Mailpit SMTP em `127.0.0.1:1035` e UI em `127.0.0.1:8035`.

O endpoint `/health` do control plane tem modo app-only para CI e testes rapidos e modo de conexoes para smoke local contra MySQL/Redis.

## Control plane data foundation

Sprint 1.4 estabelece a API base do control plane em Laravel:

- `/api/v1/me`: retorna o usuario autenticado, roles e permissoes efetivas.
- `/api/v1/sites`: retorna o inventario ordenado dos 12 apps/sites do portfolio.
- `sites`: fonte inicial do inventario operacional, URLs temporarias, idiomas e readiness AdSense.
- RBAC: `roles`, `permissions`, `permission_role` e `role_user`, com `role_user.site_id` opcional para roles globais ou escopadas por site.
- `audit_logs`: trilha de auditoria com ULID, acao, usuario/site opcionais, alvo auditavel opcional e metadata controlada.

O control plane nao deve registrar segredos, payloads sensiveis de ferramentas ou dados de usuario desnecessarios em `audit_logs`. Permissoes publicas devem usar slugs estaveis para permitir migracao futura para pacote dedicado sem quebrar contratos.

## Control plane MVP

Sprint 1.5 inicia a interface administrativa com Laravel Blade antes de adicionar Inertia/Vue:

- login/logout por sessao, com throttle no POST de login;
- middleware `permission` usando os slugs RBAC;
- dashboard `/admin` com snapshot de sites, deploys, incidentes, tarefas e auditoria;
- inventario `/admin/sites` com criacao/edicao de sites;
- tabelas `deployment_records`, `incidents` e `operational_tasks` para o primeiro painel operacional.

Esse MVP e intencionalmente server-rendered e utilitario. Vue/Inertia fica reservado para fluxos admin que precisem de interatividade rica.

## Analytics/eventos

Sprint 1.6 adiciona a base de analytics sem PII:

- Nuxt usa `@supersites/analytics` para criar `outbound_site_click` no catalogo e gravar em `window.dataLayer` sem provedor externo ativo.
- Laravel expoe `POST /api/v1/analytics/events` para ingestao publica de eventos whitelisted.
- `analytics_events` armazena fatos sanitizados com identificadores anonimos hasheados.
- `metric_snapshots` armazena agregados internos com fonte, granularidade e status estimado/finalizado/atrasado.
- `GET /api/v1/metric-snapshots` exige autenticacao e `dashboard.view`.

## NetProbe public API module

Sprints 2.2 a 2.4 adicionam o primeiro modulo publico de lookup do NetProbe dentro do Laravel `apps/control-plane`, conforme ADR `0014-netprobe-public-api-module`.

- `GET /api/v1/netprobe/ip`: retorna o IP observado na requisicao, versao IPv4/IPv6, classificacao publica e metadados de retencao sem persistir o endereco completo.
- `POST /api/v1/netprobe/dns`: normaliza hostnames e consulta A/AAAA/CNAME/MX/TXT/NS/SOA/CAA com cache TTL e resposta estruturada.
- `POST /api/v1/netprobe/rdap`: usa bootstrap RDAP IANA, consulta o registry do TLD, normaliza registrar/status/datas/nameservers/limitacoes e omite contato pessoal.
- `POST /api/v1/netprobe/ssl`: resolve A/AAAA, bloqueia ranges privados/reservados, conecta apenas a `443` com SNI e normaliza facts do certificado servido.
- `POST /api/v1/netprobe/propagation`: retorna snapshot limitado do resolver local para A/AAAA/CNAME/MX/TXT/NS, com cache TTL e aviso de que comparacao multirregiao depende de workers futuros.
- `POST /api/v1/netprobe/port`: aceita apenas portas `80`, `443`, `587` e `993`, resolve A/AAAA publicos antes de conectar e testa no maximo dois enderecos por requisicao.
- `POST /api/v1/netprobe/reachability`: reporta TCP 443 limitado; ICMP e traceroute ficam declarados como `not_supported` no runtime web inicial.
- `netprobe-public`: rate limiter dedicado para endpoints publicos de diagnostico.
- `NetProbeDnsResolver`: contrato substituivel para testes e para futura extracao para worker/runtime separado.
- `NetProbeRdapClient`: contrato substituivel para fixtures de registry e para futura politica de retry/backoff por TLD.
- `NetProbeCertificateProbe`: contrato substituivel para o probe TLS e futura validacao de cadeia/multirregiao.
- `NetProbeTcpProbe`: contrato substituivel para probes TCP com timeout curto, hoje usado apenas depois de resolucao publica validada.
- `NetProbeHostGuard`: bloqueia URL em vez de hostname, nomes locais/reservados e respostas que apontem para IP privado, loopback, metadata ou ranges reservados.

O modulo fica no control plane para reduzir superficie operacional enquanto o contrato estabiliza. Uma extracao futura para app/API dedicado deve preservar o contrato HTTP, os testes de SSRF/rate limit e a politica de minimizacao de dados.

## NetProbe monitoring MVP

Sprint 2.6 adiciona a camada inicial de upgrade do NetProbe dentro do mesmo modulo Laravel, conforme ADR `0015-netprobe-monitoring-mvp`.

- `net_probe_monitors`: monitores autenticados para DNS, SSL e dominio, com target normalizado, quota plan, frequencia, status e settings de alerta.
- `net_probe_monitor_checks`: historico de execucoes com status `ok`, `warning` ou `failed`, resumo tecnico limitado e erro controlado.
- `net_probe_alerts`: tentativas de alerta por e-mail/webhook, com destino armazenado apenas como hash e payload operacional limitado.
- `/api/v1/netprobe/monitors`: API autenticada inicial para listar, criar, consultar e executar monitores, protegida por `operations.manage` ate existir auth/billing de clientes.
- `netprobe:dispatch-due-monitors`: comando agendado a cada cinco minutos para enfileirar monitores vencidos.
- `RunNetProbeMonitorCheck`: job da fila `netprobe-monitors`, com `tries=3` e backoff `60/300/900`.
- Alertas por e-mail sao enfileiraveis; webhooks ficam desativados por padrao e exigem HTTPS publico validado antes de qualquer chamada externa.

Esta camada cria valor de upgrade sem ativar billing real. Deploy em producao ainda depende de empacotamento, queue/runtime, backup/restore e smoke especificos do NetProbe.

## NetProbe static launch gate

Sprint 2.7 adiciona empacotamento e deploy estatico especifico do NetProbe, conforme ADR `0016-netprobe-static-launch-gate`.

- `apps/netprobe-atlas` e empacotado para HostGator com `NUXT_APP_BASE_URL=/supersites/netprobe-atlas/`.
- O bundle publico exige `NUXT_PUBLIC_NETPROBE_API_BASE_URL` HTTPS explicito; fallback local nao deve entrar no artefato.
- O release remoto fica em `/home1/opents62/public_html/supersites/netprobe-atlas/_netprobe-releases/<release-id>`.
- A troca publica usa somente o `.htaccess` gerenciado dentro de `/supersites/netprobe-atlas/`, preservando placeholder, `.env` e pastas manuais.
- O deploy real falha fechado se a API publica NetProbe nao responder aos smokes de IP e DNS.

Estado em 2026-06-26: o artefato estatico foi publicado em `https://opentshost.com/supersites/netprobe-atlas/` apos o control-plane/API ficar saudavel; `scripts/smoke-netprobe-public.ps1` e Playwright publico validaram HTTPS, API base e consulta DNS real. Ads, billing, workers recorrentes e integracoes externas continuam fora do release publico.

## Control plane public API deploy

Sprint 2.8 corretiva adiciona o caminho de deploy publico do Laravel control-plane, conforme ADR `0017-control-plane-public-api-deploy`.

- O release remoto fica em `/home1/opents62/public_html/supersites/control-plane/_control-plane-releases/<release-id>`.
- O artefato local e um ZIP Laravel sem `.env`, sem arquivos de teste sensiveis e com Composer `--no-dev --classmap-authoritative`.
- O ZIP e extraido no servidor via cPanel `Fileman::fileop` e movido para a lixeira apos extracao.
- Cada release recebe `.env` remoto gerado somente a partir de GitHub environment secrets ou inventario local ignorado; o `.env` base em `/supersites/control-plane/.env` e criado apenas se ausente e preservado quando existente.
- A pasta `_control-plane-releases` e protegida por `.htaccess` com deny; o trafego passa por `/supersites/control-plane/index.php`, que faz bootstrap direto do Laravel do release ativo sem expor o codigo como arquivos baixaveis.
- O handler cPanel gerenciado deve usar `ea-php84___lsphp`; o formato sem `___lsphp` manteve PHP fora de execucao no HostGator durante a correcao.
- O smoke publico obrigatorio cobre `/health`, `/api/v1/netprobe/ip` e `/api/v1/netprobe/dns` com `example.com`.
- Migrações nao rodam automaticamente neste deploy inicial; os endpoints publicos IP/DNS devem funcionar com cache em arquivo, sessao em arquivo e fila `sync`.

## CalcHarbor client-side MVP

Sprint 3.1 adiciona o primeiro site de baixo custo marginal da Fase 3 em `apps/calcharbor`.

- O app usa Nuxt SSG/SSR com formulas financeiras e empresariais executadas no navegador.
- O MVP publica 4 calculadoras: prestacao de emprestimo, ponto de equilibrio, margem bruta e ROI.
- Cada calculadora renderiza formula, exemplo, interpretacao, FAQ e schema `WebApplication`/`FAQPage` no HTML inicial.
- O conteudo inicial cobre `en`, `pt-br`, `es`, `fr` e `de`, incluindo paginas legais/editoriais site-scoped.
- Analytics local permitido: eventos sanitizados `tool_started`, `tool_completed` e `tool_failed` com `tool_slug`.
- Valores digitados, resultados, taxas, prazos e metas financeiras nao devem ser enviados para analytics, logs, backend ou data layer.
- Nao ha backend, conta, historico, API, billing, anuncio, worker, webhook ou integracao externa nesta sprint.
- O manifesto de deploy conhece o build SSG, mas trafego publico real permanece placeholder ate existirem artifact gate, smoke publico e rollback especificos do CalcHarbor.

## DevUtility Lab browser-side MVP

Sprint 3.2 adiciona o segundo site de baixo custo marginal da Fase 3 em `apps/devutility-lab`.

- O app usa Nuxt SSG/SSR com ferramentas de desenvolvedor executadas no navegador.
- O MVP publica 9 ferramentas: formatador JSON/XML/YAML/CSV, Base64, inspetor JWT, regex tester, diff de texto, cron helper, UUID, timestamp e hashes.
- Cada ferramenta renderiza workbench split input/output, exemplo, instrucoes de privacidade, erro comum, limitacoes, related tools, FAQ, upgrade path e schema `WebApplication`/`FAQPage` no HTML inicial.
- O conteudo inicial cobre `en`, `pt-br`, `es`, `fr` e `de`, incluindo paginas legais/editoriais site-scoped.
- A execucao usa Web Worker quando disponivel, fallback local no navegador, limite de snippet de 200 KB e acoes locais de copiar/baixar resultado sem API de produto.
- Analytics local permitido: eventos sanitizados `tool_started`, `tool_completed` e `tool_failed` com `tool_slug`.
- Snippets, tokens JWT, amostras regex, hashes, inputs, resultados e arquivos `.txt` gerados nao devem ser enviados para analytics, logs, backend ou data layer.
- Nao ha backend, conta, historico, API, billing, anuncio, storage local persistente, worker de producao, webhook ou integracao externa nesta sprint.
- O manifesto de deploy conhece o build SSG, mas trafego publico real permanece placeholder ate existirem artifact gate, smoke publico e rollback especificos do DevUtility Lab.

## TimeNexus browser-side MVP

Sprint 3.3 adiciona o terceiro site de baixo custo marginal da Fase 3 em `apps/timenexus`.

- O app usa Nuxt SSG/SSR com ferramentas de tempo, data, porcentagem e unidades executadas no navegador.
- O MVP publica 7 ferramentas: conversor de fuso horario, diferenca de datas, dias uteis, timestamp, idade, porcentagem e unidades.
- Cada ferramenta renderiza exemplo, instrucoes de privacidade, limitacoes, FAQ, upgrade path e schema `WebApplication`/`FAQPage` no HTML inicial.
- O conteudo inicial cobre `en`, `pt-br`, `es`, `fr` e `de`, incluindo paginas legais/editoriais site-scoped.
- A execucao usa Web Worker quando disponivel, fallback local no navegador e sem armazenamento persistente.
- Sprint 7.6 adiciona refinamento benchmark apenas no frontend: resposta direta, timeline de timezone/timestamp, relacionados, exemplos, conteudo de limites UTC/DST/calendario e paineis de upgrade/support inertes.
- Analytics local permitido: eventos sanitizados `tool_viewed`, `tool_started`, `tool_completed` e `tool_failed` com `tool_slug`.
- Datas, fusos, idade, valores numericos, unidades, inputs e resultados nao devem ser enviados para analytics, logs, backend ou data layer.
- Nao ha backend, conta, historico, presets, widgets, API, billing, anuncio, support payment, storage local persistente, worker de producao, webhook ou integracao externa nesta sprint.
- O manifesto de deploy conhece o build SSG, mas trafego publico real permanece placeholder ate existirem artifact gate, smoke publico e rollback especificos do TimeNexus.

## QRRoute static workflow MVP

Sprint 4.1 adiciona o primeiro produto pago de workflow da Fase 4 em `apps/qrroute`.

- O app usa Nuxt SSG/SSR com builders de QR, barcode, UTM, vCard, Wi-Fi e preview executados no navegador.
- O MVP publica 6 ferramentas: `static-qr-code`, `barcode-generator`, `utm-builder`, `vcard-qr`, `wifi-qr` e `preview-lab`.
- QR e barcode sao renderizados localmente como SVG data URLs; payloads ficam visiveis e copiaveis sem criar redirect oculto.
- Cada ferramenta renderiza exemplo, instrucoes de privacidade, controles antiabuso, limitacoes, FAQ, upgrade path e schema `WebApplication`/`FAQPage` no HTML inicial.
- O conteudo inicial cobre `en`, `pt-br`, `es`, `fr` e `de`, incluindo paginas legais/editoriais site-scoped.
- Sprint 7.7 adiciona refinamento benchmark apenas no frontend: tabs por tipo, resumo de payload final, acoes locais de baixar/copiar SVG/payload, related tools, explicacao static vs dynamic e upgrade gated/inert.
- Analytics local permitido: eventos sanitizados `tool_viewed`, `tool_started`, `tool_completed` e `tool_failed` com `tool_slug`.
- URLs, parametros UTM, Wi-Fi passwords, contatos, payloads e resultados nao devem ser enviados a backend, logs, analytics ou data layer.
- O control-plane recebeu a fundacao do redirect service em `/api/v1/qrroute/r/{code}`, com tabela `qr_route_links`, `QrRouteDestinationGuard` e rate limit `qrroute-redirect`.
- O redirect service bloqueia schemes nao HTTP(S), credenciais embutidas, hostnames locais/privados, IPs privados/reservados, links inativos e links expirados; respostas de redirect usam `Referrer-Policy: no-referrer` e `X-Robots-Tag: noindex, nofollow`.
- Nao ha conta, short link publico, dominio proprio, scan analytics, billing, anuncio, worker de producao, webhook, API paga, batch, checkout ou integracao externa nesta sprint.
- O manifesto de deploy conhece o build SSG, mas trafego publico real permanece placeholder ate existirem artifact gate, smoke publico e rollback especificos do QRRoute.

## InvoiceCraft local document MVP

Sprint 4.2 adicionou o segundo produto pago de workflow da Fase 4 em `apps/invoicecraft`.

- O app usa Nuxt SSG/SSR com builders de fatura, orcamento e recibo executados no navegador.
- O MVP publica 3 ferramentas: `invoice-builder`, `quote-builder` e `receipt-builder`.
- Calculo de itens/totais, preview e download PDF rodam no cliente; `jspdf` e carregado por import dinamico apenas quando o usuario baixa o PDF.
- Sprint 7.8 adiciona refinamento benchmark local com tabs de template, document snapshot, copy de resumo textual, related documents e paineis gated de workflow pago, sem endpoint novo.
- Cada ferramenta renderiza exemplo, instrucoes de privacidade, limites fiscais/pagamento, FAQ, related flows, upgrade path e schema `WebApplication`/`FAQPage` no HTML inicial.
- O conteudo inicial cobre `en`, `pt-br`, `es`, `fr` e `de`, incluindo paginas legais/editoriais site-scoped.
- Analytics local permitido: eventos sanitizados `tool_viewed`, `tool_started`, `tool_completed`, `tool_failed` e `file_downloaded` com `tool_slug`.
- Emissor, cliente, itens, valores, numeros de documento, ajustes/impostos manuais, termos, notas e PDF nao devem ser enviados a backend, logs, analytics ou data layer.
- Impostos oficiais, numeracao fiscal, pagamentos, recorrencia, clientes/produtos salvos, branding e equipes permanecem desativados ate gates humanos/tecnicos.
- O manifesto de deploy conhece o build SSG, mas trafego publico real permanece placeholder ate existirem artifact gate, smoke publico e rollback especificos do InvoiceCraft.

## MailHealth bounded email diagnostics MVP

Sprint 4.3 adiciona o terceiro produto pago de workflow da Fase 4 em `apps/mailhealth`.

- O app usa Nuxt SSG/SSR com paginas de SPF, DKIM, DMARC, MX, blacklist, SMTP e header analysis.
- O analisador de headers roda no navegador, sem chamada de API, sem storage local e sem envio de headers para analytics.
- O control-plane recebeu endpoints publicos bounded em `/api/v1/mailhealth/dns`, `/api/v1/mailhealth/blacklist` e `/api/v1/mailhealth/smtp`.
- Os endpoints reutilizam `NetProbeHostGuard`, `NetProbeDnsResolver` e `NetProbeTcpProbe`, com `mailhealth-public` rate limit, cache curto, bloqueio de host privado/reservado e limites de DNSBL/SMTP.
- SMTP executa apenas TCP contra host derivado de MX publico, sem EHLO, AUTH, RCPT, DATA ou envio de mensagem.
- Blacklist usa amostra DNSBL pequena e declara limitacoes de provedor; auditoria ampla e monitoramento de reputacao ficam gated.
- Sprint 7.9 adiciona refinamento benchmark apenas no frontend: score de saude por ferramenta, checklist de sinais, severidade, fix guidance, builders de registro planejados e related checks.
- Analytics local permitido: eventos sanitizados `tool_viewed`, `tool_started`, `tool_completed` e `tool_failed` com `tool_slug`.
- Dominios, selectors, hosts MX/SMTP, headers, Message-IDs, resultados e respostas DNS/SMTP nao devem ir para analytics, logs publicos ou data layer.
- Nao ha conta, historico salvo, monitoramento recorrente, alertas, relatorios DMARC, lote, API publica paga, white-label, billing, anuncio, worker de producao, cron ou webhook nesta sprint.
- O manifesto de deploy conhece o build SSG, mas trafego publico real permanece placeholder ate existirem artifact gate, smoke publico e rollback especificos do MailHealth.

## SitePulse bounded web diagnostics MVP

Sprint 4.4 adiciona o quarto produto pago de workflow da Fase 4 em `apps/sitepulse-lab`.

- O app usa Nuxt SSG/SSR com paginas de status, redirects, headers, robots, sitemap, TTFB e snapshot de performance pontual.
- O control-plane recebeu endpoint publico bounded em `/api/v1/sitepulse/probe`, com rate limit `sitepulse-public`, cache curto, timeout curto e redirect chain limitado.
- O probe aceita apenas HTTP/HTTPS, bloqueia credenciais, fragmentos, portas nao web, hostnames privados/reservados e resolucoes A/AAAA privadas antes de conectar.
- Redirects sao revalidados a cada salto e limitados; robots e sitemap usam apenas caminhos same-origin padrao, com limites de bytes e sem crawling.
- Analytics local permitido: eventos sanitizados `tool_viewed`, `tool_started`, `tool_completed` e `tool_failed` com `tool_slug`.
- URLs, headers, redirect targets, tempos, status e resultados do probe nao devem ir para analytics, data layer ou logs publicos.
- Sprint 7.10 adiciona refinamento benchmark apenas no frontend: score de saude, checklist de sinais, abas Overview/Findings/Technical details, recomendacoes, related pages e painel de monitoring workflow gated.
- Nao ha conta, historico salvo, uptime recorrente, incidentes, status page, alertas, multi-regiao, billing, anuncio, worker de producao, cron ou webhook nesta sprint.
- O manifesto de deploy conhece o build SSG, mas trafego publico real permanece placeholder ate existirem artifact gate, smoke publico e rollback especificos do SitePulse Lab.

## PixelBatch browser image MVP

Sprint 5.1 adiciona o primeiro produto da Fase 5 em `apps/pixelbatch`.

- O app usa Nuxt SSG/SSR com ferramentas de compressao, resize, crop, conversao, remocao de metadados e presets sociais.
- O MVP processa uma imagem por vez no navegador, com limite gratuito de 10 MB e validacao de MIME/dimensoes antes de renderizar.
- Um Web Worker monta o plano de transformacao; o Canvas executa crop/resize/reencode e gera object URL para preview/download local.
- A remocao de metadados e feita por reencode limpo de pixels visiveis, sem parsing/armazenamento EXIF/IPTC.
- Analytics local permitido: eventos sanitizados `tool_viewed`, `tool_started`, `file_processed`, `tool_completed`, `tool_failed` e `file_downloaded` com `tool_slug`.
- Nomes de arquivo, pixels, dimensoes, formatos escolhidos, metadados, tamanho de blob e conteudo de imagem nao devem ir para backend, logs, analytics ou data layer.
- Sprint 7.11 adiciona refinamento benchmark apenas no frontend: dropzone com estado de arquivo, preview original/final, workflow steps, workflow snapshot, checklist de privacidade, related image tools e painel de batch queue gated.
- Nao ha API de upload, storage local persistente, conta, batch worker, pasta/lote, integracao, alta resolucao, IA, billing, anuncio, worker de producao, cron ou webhook nesta sprint.
- O manifesto de deploy conhece o build SSG, mas trafego publico real permanece placeholder ate existirem artifact gate, smoke publico e rollback especificos do PixelBatch.

## DocShift browser document MVP

Sprint 5.2 adiciona o segundo produto da Fase 5 em `apps/docshift`.

- O app usa Nuxt SSG/SSR com ferramentas de PDF e conversao simples executadas no navegador.
- O MVP publica 8 ferramentas: merge, split, rotate, compress/rewrite, watermark, page numbers, metadata cleaner e text-to-pdf.
- Um Web Worker valida tipo, tamanho, contagem de arquivos, selecao de paginas e tamanho de texto antes do processamento.
- `pdf-lib` e carregado por import dinamico no cliente para copiar paginas, rotacionar, adicionar texto/watermark/page numbers, limpar metadados basicos e gerar object URL de preview/download.
- O limite gratuito inicial e 5 PDFs, 12 MB totais, ate 400 paginas declaradas e 12.000 caracteres no text-to-pdf.
- Analytics local permitido: eventos sanitizados `tool_viewed`, `tool_started`, `file_processed`, `tool_completed`, `tool_failed` e `file_downloaded` com `tool_slug`.
- Nomes de arquivo, texto das paginas, texto colado, metadados, selecao de paginas, quantidade de paginas, tamanho de blob e bytes do PDF nao devem ir para backend, logs, analytics ou data layer.
- Nao ha API de upload, storage local persistente, conta, batch worker, OCR, conversao server-side, historico, billing, anuncio, worker de producao, cron ou webhook nesta sprint.
- O manifesto de deploy conhece o build SSG, mas trafego publico real permanece placeholder ate existirem artifact gate, smoke publico e rollback especificos do DocShift.

## Sites e pastas

| App | Pasta | Papel |
|---|---|---|
| SuperSites Hub | `supersite` | Catalogo publico |
| Control Plane | `control-plane` | Admin central |
| NetProbe Atlas | `netprobe-atlas` | IP, DNS, dominio, SSL, propagation, port, reachability |
| CalcHarbor | `calcharbor` | Calculadoras |
| DevUtility Lab | `devutility-lab` | Ferramentas dev |
| TimeNexus | `timenexus` | Tempo/data/unidades |
| QRRoute | `qrroute` | QR, UTM, links |
| InvoiceCraft | `invoicecraft` | Faturas, orcamentos e recibos |
| MailHealth | `mailhealth` | Email auth e entregabilidade |
| SitePulse Lab | `sitepulse-lab` | Uptime/performance/headers |
| PixelBatch | `pixelbatch` | Imagem |
| DocShift | `docshift` | PDF/documentos |

## Regra de renderizacao

Paginas indexaveis devem renderizar titulo, conteudo essencial, links, canonicals, hreflang e dados estruturados no HTML inicial.

## Fronteiras

- Ferramentas client-side ficam no navegador sempre que isso reduz custo e melhora privacidade.
- Backend entra para rede, persistencia, billing, filas, seguranca, monitoramento ou processamento pesado.
- Conteudo de usuario de ferramentas dev, imagem e documento nao deve ser logado.
- Microservico fora de Laravel exige benchmark ou biblioteca especifica.
