# Roadmap SuperSites

Data-base: 2026-06-26

Este roadmap deve ser aprovado antes de iniciar a execucao de sprints com mutacoes externas, commits, push, deploy ou provisionamento remoto.

## Principios de execucao

- Ciclo obrigatorio: sprint -> validacao -> commit -> push -> monitoramento do deploy -> leitura obrigatoria -> proxima sprint.
- Toda sprint deve atualizar `docs/STATUS.md`.
- Mudancas de arquitetura ou processo devem gerar ADR.
- Segredos reais nunca entram no Git.
- Funcionalidade gratuita deve resolver a necessidade basica sem cadastro.
- AdSense e SEO dependem de qualidade, conteudo original, privacidade, acessibilidade e Core Web Vitals.

## Fase 0 - Fundacao, governanca e ambiente

Sprint 0.1 - Bootstrap documental e estrutura local
- Objetivo: criar estrutura do monorepo, documentos obrigatorios, ADRs iniciais, inventario local de credenciais e roadmap.
- Entregas: `apps/`, `packages/`, `infra/`, `docs/`, `scripts/`, `STATUS`, `ROADMAP`, ADRs.
- Validacao: busca de secrets em arquivos versionaveis, arvore local, leitura obrigatoria atualizada.
- Status: concluida.

Sprint 0.2 - Git, repositorio privado e protecao de secrets
- Objetivo: inicializar Git local, criar repo privado `supersites-platform`, configurar branch protection e secrets policy.
- Entregas: repo privado, `.gitignore`, primeiro commit, push, checklist de segredo.
- Validacao: `git status`, `git-secrets`/scan equivalente, GitHub repo privado, branch remota.
- Observacao: apesar do pedido de repos por site, a decisao inicial proposta e monorepo privado; repos por site entram apenas se houver independencia real.
- Status: concluida com ressalva. Git local, repo privado, primeiro commit/push e quality gate monitorado com sucesso. Branch protection em repo privado bloqueada pelo plano GitHub atual; pendencia registrada em `docs/HUMAN_ACTION_REQUIRED.md`.

Sprint 0.3 - Ambiente local Docker
- Objetivo: criar Docker Compose base com MySQL 8.4, Redis, Mailpit, backend Laravel e frontend Nuxt skeleton.
- Entregas: compose, scripts de bootstrap, bancos locais por site, `.env.example`.
- Validacao: containers saudaveis, bancos criados, conexao backend, health checks.
- Status: concluida. Docker local, bancos, Nuxt catalog, Laravel control plane, health endpoint, CI expandido e ADR de stack foram implementados; validacao local passou e GitHub Actions `28219370170` ficou verde.

Sprint 0.4 - HostGator bootstrap controlado
- Objetivo: criar pastas remotas em `/home1/opents62/public_html/supersites/`, bancos de producao, usuario MySQL e crons minimos apenas quando necessarios.
- Entregas: estrutura remota, inventario de DBs, smoke HTTP, rollback documentado, decisao de web-only vs worker runtime.
- Validacao: `https://opentshost.com/supersites/` ou mapeamento raiz desejado respondendo, cPanel DB list, cron list.
- Gate: so executar apos aprovacao do roadmap.
- Status: concluida. Foram criadas 12 pastas, 12 bancos, 12 usuarios MySQL, privilegios por app e placeholders `noindex`; 12 URLs fallback `/supersites/...` respondem HTTP 200. Nenhum cron foi criado porque ainda nao ha scheduler publicado. O mapeamento direto `/<site-folder>` segue pendente. GitHub Actions `28219966897` ficou verde.

Sprint 0.4b - Redis/VPS runtime
- Objetivo: validar/acessar o outro servidor HostGator VPS/VPN e preparar Redis, filas e workers fora do cPanel compartilhado.
- Entregas: Redis protegido, health check, firewall/rede, usuario de deploy, runbook de backup/restore.
- Validacao: `redis-cli PING`, worker smoke, fila processada, logs e acesso restrito.
- Status: concluida para runtime Redis inicial. SSH direto foi validado com a chave local `$HOME/.ssh/id_ed25519_vps_hostgator`; Redis `6.2.22` foi provisionado como `supersites-redis.service`, com bind local-only em `127.0.0.1:6381`, ACL autenticada, layout `/srv/supersites` e portas publicas Redis `6379`, `6380`, `6381` fechadas/filtradas. Workers, filas e crons ficam pendentes ate existir codigo executavel e nomes de fila definidos.

Sprint 0.5 - CI/CD foundation
- Objetivo: GitHub Actions por paths, lint/test/build, deploy staging HostGator, smoke e rollback.
- Entregas: workflows, environments, secrets cadastrados, deploy dry-run.
- Validacao: actions verdes, artefatos, logs sem secrets.
- Status: concluida em modo dry-run. `Quality Gate` foi dividido em jobs path-aware; `Deploy Dry Run` gera artefato de plano sem mutar producao; GitHub environments `staging-hostgator`, `production-hostgator` e `production-vps-runtime` foram criados com variaveis e secrets por nome; deploy real segue pendente ate empacotamento, preservacao remota, smoke e rollback estarem implementados.

## Fase 1 - SuperSites Hub e Control Plane

Sprint 1.1 - App shell publico do catalogo
- Objetivo: Nuxt SSR/SSG para home do catalogo, categorias, busca e paginas dos sites.
- Entregas: layout publico, rotas multilanguage, conteudo inicial, SEO base.
- Validacao: build, Playwright smoke, HTML SSR com title/canonical/hreflang.
- Status: concluida. O SuperSites Hub agora tem rotas `/`, `/en`, `/pt-br`, `/es`, `/fr`, `/de`, paginas individuais `/<locale>/sites/<slug>`, busca, filtro por categoria, metadados viewport/canonical/hreflang e prerender de 56 rotas de conteudo. Validacao local cobriu testes Vitest, build Nuxt, preview smoke com assets `_nuxt` HTTP 200, CDP mobile sem overflow e interacao de busca/filtro hidratada.

Sprint 1.2 - Legal pages e politicas editoriais
- Objetivo: About, contato, privacidade, cookies, termos, metodologia e politica editorial.
- Entregas: paginas em `en`, `pt-BR`, `es`, `fr`, `de`.
- Validacao: sem paginas vazias, links internos, sitemap parcial.
- Status: concluida localmente nesta sprint. O hub agora tem sete paginas legais/editoriais em cinco idiomas (`about`, `contact`, `privacy`, `cookies`, `terms`, `methodology`, `editorial-policy`), footer de links internos, sitemap XML parcial e QA Playwright com screenshots mobile/desktop.

Sprint 1.3 - Design system e i18n compartilhados
- Objetivo: pacotes `ui`, `i18n`, `seo`, `consent`.
- Entregas: tokens, componentes base, seletor de idioma, formatadores.
- Validacao: unit tests, accessibility smoke, screenshots desktop/mobile.
- Status: concluida. Foram criados os pacotes TypeScript `@supersites/ui`, `@supersites/i18n`, `@supersites/seo` e `@supersites/consent`, com testes, typecheck, ADR e uso inicial pelo hub para locale/SEO/status visual. Quality Gate `28234285250` e Deploy Dry Run `28234285286` ficaram verdes.

Sprint 1.4 - Backend Laravel e API base
- Objetivo: Laravel API, auth admin, RBAC, audit log, tenancy por site.
- Entregas: migrations, seeders, health endpoint, RBAC inicial.
- Validacao: feature tests, migrations fresh, health check.
- Status: concluida. O control plane recebeu API `/api/v1/me` e `/api/v1/sites`, migrations de sites/RBAC/audit logs, seeders de portfolio e permissoes, auditoria no endpoint de sites e testes feature cobrindo auth, forbidden, listagem autorizada e permissoes efetivas. SQLite local foi habilitado no PHP da workstation para manter o ciclo padrao de testes Laravel. Quality Gate `28235256988` e Deploy Dry Run `28235257018` ficaram verdes.

Sprint 1.5 - Control plane MVP
- Objetivo: dashboard executivo minimo com status, sites, deploys, incidentes e tarefas.
- Entregas: painel autenticado, cadastro de sites, status operacional.
- Validacao: auth/RBAC tests, smoke UI, audit log.
- Status: concluida. O control plane recebeu login/logout, middleware RBAC `permission`, dashboard `/admin`, inventario e cadastro/edicao de sites em `/admin/sites`, tabelas operacionais para deploys/incidentes/tarefas e testes feature cobrindo auth, RBAC, UI smoke e auditoria. Quality Gate `28236429748` e Deploy Dry Run `28236429773` ficaram verdes.

Sprint 1.6 - Analytics/event contract
- Objetivo: contrato de eventos, data layer sem PII e snapshots internos.
- Entregas: `tool_viewed`, `tool_started`, `tool_completed`, `outbound_site_click` e base de metricas.
- Validacao: testes de contrato, redacao de PII, fixtures.
- Status: concluida. Foi criado `@supersites/analytics` com allowlist de eventos, sanitizacao PII-safe e data layer; o catalogo passou a registrar `outbound_site_click` em modo local; o control plane recebeu `analytics_events`, `metric_snapshots`, ingestao publica sanitizada e leitura autenticada de snapshots. Quality Gate `28237428311` e Deploy Dry Run `28237428286` ficaram verdes.

Sprint 1.7 - Deploy publico do catalogo transitorio
- Objetivo: publicar catalogo em `opentshost.com` com rota temporaria dos sites.
- Entregas: build publicado, HTTPS, smoke, rollback.
- Validacao: HTTP 200, assets corretos em subdiretorio/raiz, logs sem erro.
- Status: concluida. O catalogo transitorio foi publicado em `https://opentshost.com/supersites/` como release estatico versionado no HostGator, com HTTPS, smoke publico, screenshots desktop/mobile, rollback/switch validado pelo workflow `Deploy SuperSite HostGator` run `28241763726` e raiz `https://opentshost.com/` preservada sem redirect.

## Fase 2 - NetProbe Atlas

Sprint 2.1 - Fundacao publica NetProbe
- Objetivo: app Nuxt SSR, paginas essenciais e estrutura de ferramentas.
- Entregas: home, tool pages, metodologia, legal pages site-scoped.
- Validacao: build, SEO smoke, links.
- Status: concluida localmente/CI. O app `apps/netprobe-atlas` foi criado com Nuxt SSR, rotas publicas em ingles, 7 paginas de ferramentas, paginas legais/editoriais site-scoped, sitemap, preview smoke, Playwright visual smoke e Quality Gate dedicado. O placeholder remoto `/supersites/netprobe-atlas/` permanece preservado/noindex ate o launch gate da Sprint 2.7.

Sprint 2.2 - IP e DNS lookup seguro
- Objetivo: What is my IP, IPv4/IPv6, A/AAAA/CNAME/MX/TXT/NS/SOA/CAA.
- Entregas: API segura, cache TTL, rate limit, UI de resultado.
- Validacao: unit/integration tests, SSRF guard, examples.
- Status: concluida localmente/CI. O NetProbe agora tem endpoints publicos Laravel `/api/v1/netprobe/ip` e `/api/v1/netprobe/dns`, rate limit dedicado, cache TTL por lookup, guard contra URLs, hostnames locais/reservados e resolucoes para IPs privados, UI live para IP/DNS e Playwright cobrindo resultado responsivo e analytics sanitizado. Quality Gate `28252157415` e Deploy Dry Run `28252157488` ficaram verdes.

Sprint 2.3 - RDAP, dominio e SSL
- Objetivo: RDAP/domain lookup, idade/expiracao, nameservers, certificado SSL.
- Entregas: normalizadores, mensagens de limitacao, cache.
- Validacao: fixtures, dominios exemplo, erros controlados.
- Status: concluida localmente/CI. O NetProbe agora tem `/api/v1/netprobe/rdap` e `/api/v1/netprobe/ssl`, normalizacao de RDAP com registrar/status/datas/nameservers/limitacoes, probe TLS limitado a hostnames publicos na porta 443, cache TTL, fixtures nos testes e UI live para RDAP/SSL sem capturar alvo bruto em analytics. Quality Gate `28253127358` e Deploy Dry Run `28253127375` ficaram verdes.

Sprint 2.4 - Propagation, port checker limitado, ping/traceroute
- Objetivo: diagnosticos pontuais sem abuso.
- Entregas: limites, allowlist/bloqueios, probes locais iniciais.
- Validacao: SSRF/private ranges tests, rate-limit, logs.
- Status: concluida localmente/CI. O NetProbe agora tem `/api/v1/netprobe/propagation`, `/api/v1/netprobe/port` e `/api/v1/netprobe/reachability`, propagation com snapshot do resolver local, port checker limitado a allowlist `80/443/587/993`, reachability via TCP 443 limitado e ICMP/traceroute declarados como indisponiveis ate existirem workers controlados. Quality Gate `28254182163` e Deploy Dry Run `28254182161` ficaram verdes.

Sprint 2.5 - Conteudo multilanguage e AdSense readiness
- Objetivo: conteudo original por ferramenta em 5 idiomas.
- Entregas: FAQs, metodologia, exemplos, schema, sitemap.
- Validacao: hreflang/canonical, no broken links, accessibility.
- Status: concluida localmente/CI. O NetProbe Atlas agora tem home, 7 ferramentas e 7 paginas legais/editoriais em 5 idiomas, com FAQ, metodologia, exemplos, schema JSON-LD, sitemap/canonical/hreflang e visual smoke Playwright. Quality Gate `28256931247` e Deploy Dry Run `28256931154` passaram. Nenhum anuncio ou integracao externa foi ativado antes dos gates.

Sprint 2.6 - Upgrade MVP NetProbe
- Objetivo: monitores DNS/SSL/dominio, historico, alertas e API inicial.
- Entregas: jobs, filas, webhook/email, quotas.
- Validacao: scheduler local, tests de jobs, retry/backoff.
- Status: concluida localmente/CI. O control plane recebeu monitores DNS/SSL/dominio, historico de checks, alertas e-mail/webhook guardados, quota `free_preview`, API autenticada, job enfileiravel com retry/backoff e scheduler local. Quality Gate `28257908283` e Deploy Dry Run `28257908248` passaram. Billing real, deploy de worker em producao e webhooks externos padrao continuam aguardando gates.

Sprint 2.7 - Launch gate NetProbe
- Objetivo: publicar e monitorar NetProbe.
- Entregas: deploy, smoke, status page, backup, rollback, checklist AdSense.
- Validacao: Core Web Vitals inicial, uptime, logs, incident drill.
- Status: concluida. O NetProbe recebeu status page, artifact HostGator estatico validado, workflow de deploy/rollback, smoke publico e checklist AdSense. O go-live util foi executado apos a Sprint 2.8 publicar a API publica: `Deploy NetProbe HostGator` run `28264517346` e redeploy run `28265295302` passaram, `scripts/smoke-netprobe-public.ps1` aprovou HTTPS/API base, e Playwright publico validou uma consulta DNS real com resposta API 200. AdSense, billing real, workers recorrentes e integracoes externas seguem bloqueados ate os gates comerciais/operacionais.

Sprint 2.8 - Deploy publico do control-plane/API
- Objetivo: desbloquear o go-live util do NetProbe publicando a API Laravel em `https://opentshost.com/supersites/control-plane/`.
- Entregas: artifact Laravel sem segredos, workflow manual de deploy/rollback, `.env` remoto preservado, release protegido, smoke publico de `/health`, NetProbe `/ip` e `/dns`.
- Validacao: artifact gate, testes Laravel, estrutura/secrets/dry-run, CI verde, smoke publico e rollback testavel.
- Status: concluida. O control-plane/API foi publicado no HostGator pelo workflow `Deploy Control Plane HostGator` run `28264453068`, release ativo `a33fcbfdc31c328d71c6fa046d9fac99ec610575-28264453068-1`. O smoke publico validou `/health`, `/api/v1/netprobe/ip` e `/api/v1/netprobe/dns`; rollback para placeholder foi exercitado durante as correcoes e rollback por release permanece disponivel. O handler cPanel final e `ea-php84___lsphp`.

## Fase 3 - Sites de baixo custo marginal

Sprint 3.1 - CalcHarbor MVP
- Objetivo: calculadoras financeiras/empresariais client-side com explicacao e formula.
- Upgrade: cenarios salvos, exportacao, widgets, API, sem anuncios.
- Validacao: formulas testadas, i18n, SEO.
- Status: concluida localmente/CI. O app `apps/calcharbor` foi criado com Nuxt SSG, 4 calculadoras client-side (`loan-payment`, `break-even-point`, `gross-margin`, `roi`), home e paginas legais/editoriais em 5 idiomas, formulas visiveis, exemplos, interpretacao, FAQ e schema `WebApplication`/`FAQPage`. Quality Gate dedicado foi adicionado, mas o deploy publico real continua bloqueado ate existir empacotamento HostGator, smoke publico e rollback especificos. Nenhum anuncio, billing, conta, worker, webhook ou integracao externa de analytics foi ativado.

Sprint 3.2 - DevUtility Lab MVP
- Objetivo: JSON/XML/YAML/CSV, Base64, JWT, regex, diff, cron, UUID, timestamp, hashes.
- Upgrade: historico privado, workspaces, lote, arquivos maiores, API.
- Validacao: privacidade client-side, no logging de conteudo, web workers.
- Status: concluida localmente/CI. O app `apps/devutility-lab` foi criado com Nuxt SSG, 9 ferramentas client-side (`structured-data-formatter`, `base64-converter`, `jwt-inspector`, `regex-tester`, `text-diff`, `cron-helper`, `uuid-generator`, `timestamp-converter`, `hash-generator`), Web Worker com fallback, home e paginas legais/editoriais em 5 idiomas, exemplos, privacidade, limitacoes, FAQ e schema `WebApplication`/`FAQPage`. Quality Gate dedicado foi adicionado, mas o deploy publico real continua bloqueado ate existir empacotamento HostGator, smoke publico e rollback especificos. Nenhum anuncio, billing, conta, backend, API publica, armazenamento local, worker de producao, webhook ou integracao externa de analytics foi ativado.

Sprint 3.3 - TimeNexus MVP
- Objetivo: fusos, datas, dias uteis, timestamp, idade, porcentagem, unidades.
- Upgrade: widgets, API, presets, historico.
- Validacao: timezone fixtures, locale tests, SEO.
- Status: concluida localmente/CI. O app `apps/timenexus` foi criado com Nuxt SSG, 7 ferramentas client-side (`timezone-converter`, `date-difference`, `business-days`, `timestamp-converter`, `age-calculator`, `percentage-calculator`, `unit-converter`), Web Worker com fallback, home e paginas legais/editoriais em 5 idiomas, exemplos, privacidade, limitacoes, FAQ e schema `WebApplication`/`FAQPage`. Quality Gate dedicado foi adicionado, mas o deploy publico real continua bloqueado ate existir empacotamento HostGator, smoke publico e rollback especificos. Nenhum anuncio, billing, conta, backend, API publica, armazenamento local, worker de producao, webhook ou integracao externa de analytics foi ativado.

## Fase 4 - Produtos pagos de workflow

Sprint 4.1 - QRRoute MVP
- Objetivo: QR estatico, barcode, UTM builder, vCard, Wi-Fi e preview.
- Upgrade: QR dinamico, short links, analytics, dominio proprio, lote.
- Validacao: redirect service, abuse control, analytics sem PII.
- Status: concluida localmente/CI. O app `apps/qrroute` foi criado com Nuxt SSG, 6 ferramentas client-side (`static-qr-code`, `barcode-generator`, `utm-builder`, `vcard-qr`, `wifi-qr`, `preview-lab`), preview SVG local, home e paginas legais/editoriais em 5 idiomas, exemplos, privacidade, limitacoes, FAQ e schema `WebApplication`/`FAQPage`. O control-plane recebeu fundacao de redirect service `/api/v1/qrroute/r/{code}` com tabela `qr_route_links`, rate limit e guard antiabuso. Quality Gate `28276318912` e Deploy Dry Run `28276318906` passaram, mas o deploy publico real continua bloqueado ate existir empacotamento HostGator, smoke publico e rollback especificos. Nenhum anuncio, billing, conta, short link publico, dominio proprio, worker, webhook ou integracao externa de analytics foi ativado.

Sprint 4.2 - InvoiceCraft MVP
- Objetivo: criar e baixar fatura/orcamento/recibo sem cadastro.
- Upgrade: clientes/produtos salvos, recorrencia, branding, equipe, pagamentos.
- Validacao: PDF rendering, dados locais, templates, impostos em `HUMAN_ACTION_REQUIRED`.
- Status: concluida localmente/CI. O app `apps/invoicecraft` foi criado com Nuxt SSG, 3 builders client-side (`invoice-builder`, `quote-builder`, `receipt-builder`), preview local, download PDF via `jspdf`, home e paginas legais/editoriais em 5 idiomas, FAQ, schema `WebApplication`/`FAQPage` e analytics sanitizado apenas com `tool_slug`. Dados de emissor, cliente, itens, valores, ajustes/impostos manuais e notas ficam no navegador, sem API, conta, storage persistente ou analytics de PII. Impostos oficiais, numeracao fiscal e pagamentos foram registrados como `HUMAN_ACTION_REQUIRED`. Quality Gate `28277077148` e Deploy Dry Run `28277077185` passaram, mas o deploy publico real continua bloqueado ate existir empacotamento HostGator, smoke publico e rollback especificos. Nenhum anuncio, billing, checkout, pagamento, conta, worker, webhook ou integracao externa de analytics foi ativado.

Sprint 4.3 - MailHealth MVP
- Objetivo: SPF, DKIM, DMARC, MX, blacklist, SMTP, headers.
- Upgrade: monitoramento, alertas, relatorios DMARC, lote, API, white-label.
- Validacao: DNS/SMTP workers, limites, seguranca.
- Status: concluida localmente/CI. O app `apps/mailhealth` foi criado com Nuxt SSG, 7 ferramentas (`spf-checker`, `dkim-checker`, `dmarc-checker`, `mx-checker`, `blacklist-check`, `smtp-check`, `header-analyzer`), conteudo/localizacao em 5 idiomas, analytics sanitizado apenas por `tool_slug` e analisador de headers local no navegador. O control-plane recebeu endpoints publicos limitados `/api/v1/mailhealth/dns`, `/api/v1/mailhealth/blacklist` e `/api/v1/mailhealth/smtp`, com rate limit, cache, bloqueio de ranges privados/reservados, consultas DNS/DNSBL amostradas e SMTP TCP-only sem EHLO/STARTTLS/AUTH/RCPT/DATA. Quality Gate `28278020266` e Deploy Dry Run `28278020271` passaram; a URL publica segue placeholder `noindex` sem Nuxt real. Monitoramento, alertas, relatorios DMARC, lote, API paga, white-label, ads, billing e deploy publico real seguem bloqueados ate gates especificos.

Sprint 4.4 - SitePulse Lab MVP
- Objetivo: status, redirects, headers, robots, sitemap, TTFB e teste pontual.
- Upgrade: uptime, incidentes, status page, alertas, historico, multi-regiao.
- Validacao: probes, retries, storage de historico, alertas.
- Status: concluida localmente/CI. O app `apps/sitepulse-lab` foi criado com Nuxt SSG, 7 ferramentas (`status-checker`, `redirect-chain`, `security-headers`, `robots-checker`, `sitemap-validator`, `ttfb-check`, `performance-snapshot`), conteudo/localizacao em 5 idiomas, analytics sanitizado apenas por `tool_slug` e paginas legais/editoriais. O control-plane recebeu endpoint publico limitado `/api/v1/sitepulse/probe`, com rate limit, cache curto, bloqueio de ranges privados/reservados, HTTP/HTTPS apenas, portas web, redirect chain limitada, robots/sitemap same-origin e timeouts curtos. Quality Gate `28278871466` e Deploy Dry Run `28278871478` passaram; a URL publica segue placeholder `noindex` sem Nuxt real. Uptime recorrente, incidentes, status page, alertas, historico, multi-regiao, ads, billing e deploy publico real seguem bloqueados ate gates especificos.

## Fase 5 - Processamento de arquivos

Sprint 5.1 - PixelBatch MVP
- Objetivo: resize, crop, compress, convert, remover metadados no navegador quando possivel.
- Upgrade: lote, presets, arquivos maiores, API, integracoes, alta resolucao, IA.
- Validacao: WASM/workers, upload limits, limpeza de temporarios.
- Status: concluida localmente/CI. O app `apps/pixelbatch` foi promovido de placeholder para Nuxt SSG com 6 ferramentas browser-side (`image-compressor`, `image-resizer`, `image-cropper`, `image-converter`, `metadata-remover`, `social-preset-generator`), Worker de planejamento, Canvas para preview/download, limite gratuito de 10 MB, home e paginas legais/editoriais em 5 idiomas, FAQ, schema `WebApplication`/`FAQPage` e analytics sanitizado apenas por `tool_slug`. Arquivos, pixels, nomes, dimensoes, metadados e blobs ficam no navegador; sem API de upload, storage, conta, batch worker, billing, ads, IA ou analytics externo. Quality Gate `28280343286` e Deploy Dry Run `28280343287` passaram; a URL publica segue placeholder `noindex` sem Nuxt real. O deploy publico real continua bloqueado ate existir empacotamento HostGator, smoke publico e rollback especificos.

Sprint 5.2 - DocShift MVP
- Objetivo: merge, split, rotate, compress, watermark, metadata e conversoes basicas.
- Upgrade: lote, arquivos maiores, OCR, historico, API, equipes.
- Validacao: sandbox, antivirus quando server-side, retencao.
- Status: concluida localmente/CI. O app `apps/docshift` foi promovido de placeholder para Nuxt SSG com 8 ferramentas browser-side (`pdf-merge`, `pdf-split`, `pdf-rotate`, `pdf-compressor`, `pdf-watermark`, `page-numbers`, `metadata-cleaner`, `text-to-pdf`), Worker de validacao, `pdf-lib` para preview/download, limite gratuito de 12 MB/5 PDFs, home e paginas legais/editoriais em 5 idiomas, FAQ, schema `WebApplication`/`FAQPage` e analytics sanitizado apenas por `tool_slug`. PDFs, texto, nomes de arquivo, metadados e bytes gerados ficam no navegador; sem API de upload, storage, conta, batch worker, OCR server-side, billing, ads ou analytics externo. Quality Gate `28281284720` e Deploy Dry Run `28281284718` passaram; a URL publica segue placeholder `noindex` sem Nuxt real ate existir empacotamento HostGator, smoke publico e rollback especificos.

## Fase 6 - Monetizacao, integracoes e growth

Sprint 6.1 - Consentimento e Ads component
- Objetivo: CMP, TCF, Consent Mode, ads component com placeholders sem CLS.
- Validacao: sem anuncios em paginas sensiveis, no accidental clicks.
- Status: concluida localmente/CI. `@supersites/consent` foi expandido com storage versionado, comandos Consent Mode, gate TCF por regiao, parser/serializer e superficies sensiveis; `@supersites/ads` foi criado com policy de slots, tamanhos reservados, limite de densidade e bloqueio de clique acidental. O Hub recebeu CMP local e um placeholder inerte de ad com espaco reservado, sem script AdSense/GTM/GA4, sem requisicao externa e sem anuncio real. Quality Gate `28282044449` e Deploy Dry Run `28282044425` passaram; o dry-run teve apenas anotacao conhecida de quota de artifact upload. CMP certificada/TCF, conta AdSense e qualquer request real de ads continuam bloqueados por gates humanos e tecnicos.

Sprint 6.2 - GA4, GTM e Search Console
- Objetivo: propriedades/containers por dominio quando aprovados, eventos padronizados.
- Gate humano: acessos Google e verificacoes quando necessario.
- Status: concluida localmente/CI. `@supersites/analytics` agora tem contrato Google fail-closed, nomes GA4 compativeis, allowlist de parametros, payload `dataLayer` sanitizado e planejador Search Console; o control-plane recebeu `google_integrations`, seeder e painel de readiness. Quality Gate `28282544493` e Deploy Dry Run `28282544471` passaram; Hub, control-plane/API e NetProbe passaram nos smokes publicos pos-push. Nenhuma tag GA4/GTM, conta, cookie, token OAuth, importacao Search Console ou provider externo foi ativado.

Sprint 6.3 - AdSense account integration
- Objetivo: uma conta por publisher, sites adicionados individualmente apos gate.
- Gate humano: beneficiario legal, impostos, banco, PIN, aceite.
- Status: concluida localmente/CI. `@supersites/ads` recebeu contrato AdSense fail-closed para conta publisher, Management API e site review; o control-plane recebeu `adsense_accounts`, `adsense_site_reviews`, seeder e painel de readiness. Quality Gate `28283163228` e Deploy Dry Run `28283163215` passaram; Hub, control-plane/API e NetProbe passaram nos smokes publicos pos-push. `primary-publisher` permanece sem publisher id real, `management_api_enabled=false`, `placements_enabled=false`, `auto_ads_enabled=false` e `ad_serving_enabled=false`; nenhum site foi submetido, nenhum `ads.txt` real, snippet/API/request de anuncio ou receita foi ativado.

Sprint 6.4 - Billing foundation
- Objetivo: camada agnostica Stripe/Mercado Pago/Paddle, entitlements e webhooks.
- Gate humano: contas, KYC, impostos, perfil de pagamentos.
- Status: concluida localmente/CI. `@supersites/billing` foi criado com contrato provider-agnostic para Stripe, Mercado Pago e Paddle, gates fail-closed de conta/checkout/webhook, normalizacao de planos, sanitizer de entitlements e decisao idempotente para webhooks assinados. O control-plane recebeu `billing_providers`, `billing_plans`, `billing_entitlements`, `billing_webhook_events`, seeder e painel `Billing readiness`. Quality Gate `28283768826` e Deploy Dry Run `28283768803` passaram; Hub, control-plane/API e NetProbe passaram nos smokes publicos pos-push. Todos os provedores permanecem `human_required`/`not_configured`/`disabled`; apenas planos `free-preview` sem provider, price id ou checkout foram seedados. Nenhum SDK de pagamento, API key, checkout, payment link, webhook publico, assinatura, cobranca, imposto, refund, dunning ou entitlement pago foi ativado.

Sprint 6.5 - AI growth engine
- Objetivo: auditorias tecnicas, SEO, AIO, monetizacao, anomalias e priorizacao.
- Validacao: recomendacoes sempre com evidencia, impacto, esforco, confianca e risco.
- Status: concluida localmente/CI. `@supersites/ai-growth` foi criado como motor deterministico local de recomendacoes com evidencias obrigatorias, scores de impacto/esforco/confianca/risco, redacao de PII/segredos, priorizacao estavel e anomalias sem causalidade inferida. O control-plane recebeu `ai_growth_audits`, `ai_growth_recommendations`, `ai_growth_anomalies`, models, seeder e painel `AI growth engine` com 1 auditoria, 5 recomendacoes e 2 anomalias seedadas apenas a partir de docs/runbooks/gates. Quality Gate `28284429517` e Deploy Dry Run `28284429539` passaram; o dry-run teve apenas anotacao conhecida de quota de artifact upload. Hub, control-plane/API e NetProbe passaram nos smokes publicos pos-push. Nenhum provider externo de IA, prompt egress, worker recorrente, publicacao automatica, mutacao de SEO/ads/billing, importacao Search Console, checkout, webhook, anuncio real ou API paga foi ativado.

Sprint 6.6 - Executive reports
- Objetivo: relatorios semanais/mensais exportaveis no control plane.
- Validacao: dados estimados/finalizados separados, sem causalidade inventada.
- Status: concluida localmente/CI. `@supersites/executive-reports` foi criado como contrato deterministico local para relatorios semanais/mensais, com itens evidenciados, status de dado `finalized`/`estimated`/`delayed`/`unavailable`, redacao de PII/segredos, CSV e bloqueio de claims causais. O control-plane recebeu `executive_reports`, `executive_report_items`, models, seeder, dashboard, `/admin/reports`, detalhe, print e export CSV protegidos por `dashboard.view`. O seeder cria 2 relatorios e 12 itens apenas a partir de docs/runbooks/gates, com `causality_status=not_inferred`. Quality Gate `28285130303` e Deploy Dry Run `28285130307` passaram; Hub, control-plane/API e NetProbe passaram nos smokes publicos pos-push. Nenhum provider externo, importacao GA4/Search Console/AdSense/billing, worker recorrente, envio de e-mail, receita real, checkout, webhook, ads ou analytics externo foi ativado.

## Fase 7 - Benchmark-Driven Refinement

Status geral: concluida. O prompt complementar externo de benchmark foi relido apos a Sprint 7.12; o bloco ja estava mapeado como Fase 7 e todas as sprints BR-ROADMAP a BR-DOCSHIFT foram executadas, validadas, commitadas, pushadas e monitoradas. Nenhuma Fase 8 foi criada porque o roadmap ainda nao possui novo bloco tecnico aprovado.

Sprint 7.1 - Roadmap e sprints de benchmark refinement
- Simbolico: BR-ROADMAP.
- Objetivo: transformar o prompt de benchmark, screenshots e estado real do roadmap em sprints executaveis, planos por site, matriz consolidada e KPIs de readiness.
- Entregas: `docs/SPRINTS/BENCHMARK_REFINEMENT_SPRINTS.md`, `docs/BENCHMARK_MATRIX.md`, `docs/BENCHMARK_EXECUTION_STATUS.md`, `docs/SUPERSITE_DASHBOARD_REFINEMENT_PLAN.md`, planos por site em `docs/SITES/<site>/` e atualizacoes de status/metricas.
- Validacao: docs-only, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, push e Quality Gate docs-only monitorado.
- Status: concluida. Commit `2e6e0be` criou o plano documental de benchmark, incorporou o prompt/screenshot assets, atualizou roadmap/status/metricas e criou planos por site. Validacao local passou; Quality Gate docs-only `28285643895` passou; smokes publicos de Hub, control-plane/API e NetProbe passaram. Nenhuma mudanca de codigo, anuncio real, billing real, provider externo, afiliado, doacao ativa, worker, cron ou deploy real de placeholder foi ativado nesta sprint.

Sprint 7.2 - SuperSites Catalog + Dashboard de Benchmark e Crescimento
- Simbolico: BR-SUPERSITE.
- Objetivo: evoluir o Hub publico e o control-plane para exibir benchmark readiness, SEO/AIO readiness, AdSense readiness, monetizacao readiness e backlog de oportunidades por site.
- Validacao: seguranca admin/RBAC, testes Laravel quando houver backend, testes/build/preview/Playwright do Hub quando houver frontend, gates locais e CI/dry-run.
- Status: concluida. O Hub publico ganhou sinais compactos de frentes de ferramenta, cobertura de idiomas e monetizacao gated nos cards; o control-plane recebeu tabelas `benchmark_site_readiness` e `benchmark_opportunities`, seeder, resumo no dashboard e rota `/admin/benchmark-refinement` sob `dashboard.view`. Quality Gate `28286110806`, Deploy Dry Run `28286110802` e smokes publicos de Hub/control-plane/NetProbe passaram. Nenhum provider, anuncio real, billing, checkout, afiliado, doacao, worker, cron ou deploy real de placeholder foi ativado.

Sprint 7.3 - NetProbe Atlas benchmark UX
- Simbolico: BR-NETPROBE.
- Objetivo: refinar DNS propagation e What is my IP com resultado acima da dobra, resumo simples, tabela tecnico-global, mapa leve, export/copy seguro, conteudo original, links relacionados e CTAs gated.
- Validacao: NetProbe tests/build/preview/Playwright, public smokes do NetProbe e gates locais.
- Status: concluida. O NetProbe recebeu cards de resultado para IP, valor esperado opcional em propagation, resumo de match/valores/escopo/TTL, tabela de resolvedores, mapa leve, copy local de resumo, related tools e CTA gated. Quality Gate `28286547715`, Deploy Dry Run `28286547705` e smokes publicos de Hub/control-plane/NetProbe passaram. Nenhum endpoint novo, worker/probe multirregiao, anuncio real, checkout, billing, doacao, afiliado ou provider externo foi ativado.

Sprint 7.4 - CalcHarbor benchmark UX
- Simbolico: BR-CALCHARBOR.
- Objetivo: refinar calculadoras com resultado imediato, formula, memoria de calculo, interpretacao, exemplos, FAQ, links relacionados e upgrades gated.
- Validacao: formulas, testes/build/preview/Playwright do CalcHarbor e gates locais.
- Status: concluida. O CalcHarbor recebeu resultado ao vivo client-side, card primario, metricas secundarias, memoria de calculo, interpretacao por estado, disclaimers, related calculators e painel de upgrade gated/inert. Quality Gate `28286999292`, Deploy Dry Run `28286999285` e smokes publicos de Hub/control-plane/NetProbe passaram; o dry-run teve apenas a anotacao conhecida de quota de artifact upload. Nenhum deploy real, anuncio, checkout, billing, doacao, afiliado, worker ou analytics externo foi ativado.

Sprint 7.5 - DevUtility Lab benchmark UX
- Simbolico: BR-DEVUTILITY.
- Objetivo: refinar ferramentas dev com editor split, exemplos, copy/download, erros claros, privacidade visivel e upgrades gated.
- Validacao: testes/build/preview/Playwright do DevUtility e gates locais.
- Status: concluida. O DevUtility Lab recebeu workbench split input/output, exemplo, estados vazio/processando/sucesso/erro, copiar/baixar `.txt`, privacidade junto ao editor, related tools, conteudo de erro comum e upgrade gated/inert. Quality Gate `28287478977`, Deploy Dry Run `28287478989` e smokes publicos de Hub/control-plane/NetProbe passaram. Nenhum deploy real, anuncio, checkout, billing, historico salvo, workspace, API paga, worker ou analytics externo foi ativado.

Sprint 7.6 - TimeNexus benchmark UX
- Simbolico: BR-TIMENEXUS.
- Objetivo: refinar conversor de fuso, meeting planner, datas/calendario, respostas diretas, conteudo sobre UTC/DST e upgrades gated.
- Validacao: timezone fixtures, testes/build/preview/Playwright do TimeNexus e gates locais.
- Status: concluida. O TimeNexus recebeu paineis de resposta direta, timeline de timezone/timestamp, copy de limites UTC/DST/calendario, exemplos, ferramentas relacionadas e upgrade/support gated/inert. Quality Gate `28287972198`, Deploy Dry Run `28287972209` e smokes publicos de Hub/control-plane/NetProbe passaram; o dry-run teve apenas a anotacao conhecida de quota de artifact upload. Nenhum deploy real, anuncio, checkout, billing, historico salvo, widget/API publica, support payment, worker ou analytics externo foi ativado.

Sprint 7.7 - QRRoute benchmark UX
- Simbolico: BR-QRROUTE.
- Objetivo: refinar QR/barcode/UTM com tabs por tipo, preview em tempo real, download claro, educacao static vs dynamic e upgrades gated.
- Validacao: testes/build/preview/Playwright do QRRoute, redirect guard se afetado e gates locais.
- Status: concluida. O QRRoute recebeu tabs por tipo, payload final, preview/download/copy locais, educacao static vs dynamic, exemplos, related tools e upgrade gated/inert. Quality Gate `28288511784`, Deploy Dry Run `28288511790` e smokes publicos de Hub/control-plane/NetProbe passaram. Nenhum deploy real, short link publico, QR dinamico, analytics de scan/click, anuncio, checkout, billing, dominio customizado, lote/API publica ou analytics externo foi ativado.

Sprint 7.8 - InvoiceCraft benchmark UX
- Simbolico: BR-INVOICECRAFT.
- Objetivo: refinar editor/preview/PDF de faturas, orcamentos e recibos, dados locais, templates planejados, disclaimers e upgrades gated.
- Validacao: PDF rendering, testes/build/preview/Playwright do InvoiceCraft e gates locais.
- Status: concluida. O InvoiceCraft recebeu tabs de template, document snapshot, PDF/download mais claro, copy de resumo textual local, related document flows, use-cases, boas praticas e workflow pago gated/inert. Quality Gate `28288971344`, Deploy Dry Run `28288971346` e smokes publicos de Hub/control-plane/NetProbe passaram. Impostos, numeracao fiscal, checkout, pagamentos e cobranca seguem `HUMAN_ACTION_REQUIRED`.

Sprint 7.9 - MailHealth benchmark UX
- Simbolico: BR-MAILHEALTH.
- Objetivo: refinar SPF/DKIM/DMARC/MX/blacklist/SMTP/headers com score, checklist, severidade, fix guidance, record builders planejados e upgrades gated.
- Validacao: testes/build/preview/Playwright do MailHealth, DNS/SMTP bounded tests se afetados e gates locais.
- Status: concluida. O MailHealth recebeu score de saude, checklist, severidade, fix guidance, record builders planejados e related checks sem alterar endpoints, monitoramento, billing, ads ou deploy publico real. Quality Gate `28289435994`, Deploy Dry Run `28289435995` e smokes publicos de Hub/control-plane/NetProbe passaram; MailHealth segue placeholder publico.

Sprint 7.10 - SitePulse Lab benchmark UX
- Simbolico: BR-SITEPULSE.
- Objetivo: refinar status, redirects, headers, robots, sitemap, TTFB e performance snapshot com resposta simples, tabs tecnicas, recomendacoes e upgrades gated.
- Validacao: testes/build/preview/Playwright do SitePulse, probe bounded tests se afetados e gates locais.
- Status: concluida localmente/CI. O app recebeu score de saude, checklist de sinais, abas de resultado, recomendacoes, related pages, badge local e painel de monitoring workflow gated/inert sem endpoint novo. Quality Gate `28289874584` e Deploy Dry Run `28289874575` passaram; a URL publica segue placeholder `noindex` sem Nuxt real. Uptime recorrente, incidentes, status page, alertas, historico, multi-regiao, ads, billing e deploy publico real seguem bloqueados ate gates especificos.

Sprint 7.11 - PixelBatch benchmark UX
- Simbolico: BR-PIXELBATCH.
- Objetivo: refinar dropzone, preview antes/depois, fila planejada, presets, privacidade e upgrades gated para imagem.
- Validacao: worker/canvas smoke, testes/build/preview/Playwright do PixelBatch e gates locais.
- Status: concluida localmente/CI. O app recebeu dropzone com estado de arquivo, preview original/final, workflow steps, workflow snapshot, checklist de privacidade, related image tools, badge local e painel de batch queue gated/inert sem endpoint novo. Quality Gate `28290373756` e Deploy Dry Run `28290373766` passaram; a URL publica segue placeholder `noindex` sem Nuxt real. Upload server-side, batch worker, API paga, IA, ads, billing e deploy publico real seguem bloqueados ate gates especificos.

Sprint 7.12 - DocShift benchmark UX
- Simbolico: BR-DOCSHIFT.
- Objetivo: refinar grid de ferramentas PDF, dropzone, estados de arquivo, resultado/download, privacidade, related tools e upgrades gated.
- Validacao: worker/PDF rendering smoke, testes/build/preview/Playwright do DocShift e gates locais.
- Status: concluida localmente/CI. O app recebeu badges `Local MVP`, dropzone/estado de arquivo, workflow steps, workflow snapshot, checklist de privacidade, related document tools e painel server/OCR/batch/API/history gated sem endpoint novo. `pnpm test:docshift`, `pnpm build:docshift`, `pnpm validate:docshift-preview`, `pnpm test:e2e:docshift`, Quality Gate `28290860646`, Deploy Dry Run `28290860642`, smokes publicos de Hub/control-plane/NetProbe e Quality Gate docs-only `28291007581` passaram; upload server-side, OCR, batch worker, historico, API paga, ads, billing, analytics externo e deploy publico real seguem bloqueados ate gates especificos.

## Fase 8 - Public Rollout e Production Visibility

Sprint 8.1 - Roadmap de rollout publico
- Simbolico: PROD-ROADMAP.
- Objetivo: transformar as pendencias de placeholders em sprints executaveis de deploy real, preservando rollback, smoke publico, secrets e gates de monetizacao.
- Entregas: `docs/SPRINTS/PUBLIC_ROLLOUT_SPRINTS.md`, atualizacao de status/metricas/roadmap e registro de que a autorizacao atual cobre deploy tecnico reversivel, sem ads, billing, checkout, doacao, afiliado, DNS definitivo ou workers pagos.
- Validacao: docs-only, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, push e Quality Gate docs-only monitorado.
- Status: concluida. A Fase 8 foi adicionada ao roadmap como bloco de public rollout com sprints 8.1 a 8.6, guardrails de deploy estatico reversivel sob `/supersites/<app>/`, sem ativar AdSense/GTM/GA4, billing, checkout, doacoes, afiliados, DNS definitivo, workers/crons ou integracoes externas. Commit `b22431d` foi publicado e o Quality Gate docs-only `28293053566` passou.

Sprint 8.2 - Static app deploy framework
- Simbolico: PROD-STATIC-FRAMEWORK.
- Objetivo: criar scripts/workflow genericos de artifact, validacao, publish, smoke e rollback para apps Nuxt SSG que ainda estao como placeholders publicos.
- Escopo: CalcHarbor, DevUtility Lab, TimeNexus, QRRoute, InvoiceCraft, MailHealth, SitePulse Lab, PixelBatch e DocShift.
- Validacao: builds/testes afetados, artifact gates por app, smokes locais/preview, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, Quality Gate e Deploy Dry Run.
- Status: concluida. Foram criados scripts genericos `build-static-app-hostgator-artifact.ps1`, `validate-static-app-artifact.ps1`, `publish-static-app-hostgator.ps1`, `smoke-static-app-public.ps1`, configuracao `static-app-hostgator.config.ps1` e workflow manual `Deploy Static App HostGator` para deploy/rollback por `app_id`. Artifact gates locais passaram para os nove apps alvo, commit `6befb22` foi publicado, Quality Gate `28293511914` e Deploy Dry Run `28293511933` passaram, e smokes publicos de Hub/control-plane/NetProbe passaram. Nenhum traffic switch real dos nove apps foi executado nesta sprint.

Sprint 8.3 - Publicar batch A de utilitarios locais
- Simbolico: PROD-BATCH-A.
- Objetivo: publicar CalcHarbor, DevUtility Lab e TimeNexus em `/supersites/<app>/` usando releases versionados HostGator.
- Validacao: workflow de deploy real, smoke publico por app, rollback testavel por release e preservacao de placeholder como fallback.
- Status: concluida. CalcHarbor, DevUtility Lab e TimeNexus foram publicados como Nuxt SSG reais em `/supersites/<app>/` pelo workflow `Deploy Static App HostGator`, com releases versionados `ba35e78ec8ba844057841fea2f99710accc66afc-28293763206-1`, `ba35e78ec8ba844057841fea2f99710accc66afc-28293909409-1` e `ba35e78ec8ba844057841fea2f99710accc66afc-28294108090-1`. Smokes publicos locais passaram para os tres apps, e o smoke agregado do Hub agora exige esses apps reais sem placeholder/noindex e com assets `_nuxt`; placeholders permanecem recuperaveis por `rollback-placeholder`.

Sprint 8.4 - Publicar batch B de workflow/diagnostico
- Simbolico: PROD-BATCH-B.
- Objetivo: publicar QRRoute, InvoiceCraft, MailHealth e SitePulse Lab em `/supersites/<app>/` usando releases versionados HostGator.
- Validacao: workflow de deploy real, smoke publico por app, endpoints publicos seguros quando aplicavel e rollback testavel.
- Status: concluida. QRRoute, InvoiceCraft, MailHealth e SitePulse Lab foram publicados como Nuxt SSG reais em `/supersites/<app>/` pelo workflow `Deploy Static App HostGator`, com releases versionados `9700d1d25b81d3d7f2f017987d31306855511c1a-28294616168-1`, `9700d1d25b81d3d7f2f017987d31306855511c1a-28294753305-1`, `9700d1d25b81d3d7f2f017987d31306855511c1a-28294982241-1` e `9700d1d25b81d3d7f2f017987d31306855511c1a-28295133185-1`. O control-plane/API foi redeployado no release `9700d1d25b81d3d7f2f017987d31306855511c1a-28294952047-1` para expor os endpoints MailHealth/SitePulse antes dos traffic switches. Smokes publicos locais passaram para os quatro apps e o smoke agregado passou a validar Batch A, Batch B e probes JSON de MailHealth/SitePulse.

Sprint 8.5 - Publicar batch C de arquivos
- Simbolico: PROD-BATCH-C.
- Objetivo: publicar PixelBatch e DocShift em `/supersites/<app>/` usando releases versionados HostGator.
- Validacao: workflow de deploy real, smoke publico por app, assets `_nuxt`, ausencia de upload server-side/storage e rollback testavel.
- Status: concluida. PixelBatch e DocShift foram publicados como Nuxt SSG reais em `/supersites/<app>/` pelos runs `28295611998` e `28295818189`, com smokes publicos e assets `_nuxt` validados. Commit `e44dd53`, Quality Gate `28296063288`, Deploy Dry Run `28296063292` e smokes publicos pos-CI passaram.

Sprint 8.6 - Public rollout closure e operacao minima
- Simbolico: PROD-CLOSURE.
- Objetivo: fechar registros de producao, atualizar smokes publicos consolidados, revisar placeholders remanescentes, manter direct-root mapping e monetizacao como gates separados.
- Validacao: smokes publicos de Hub, control-plane/API, NetProbe e nove apps publicados; docs/status/metricas atualizados; Quality Gate docs-only monitorado.
- Status: concluida tecnicamente em producao. A auditoria de copia publica removeu textos residuais de placeholder das paginas `/en/status` e CTAs do Hub, reforcou os smokes publicos contra `noindex`/placeholder/textos antigos e redeployou Hub mais nove apps. Commit tecnico `22ac333`, Deploy Dry Run `28296597228`, commit corretivo `97ed5bf`, Quality Gate `28296704908`, redeploy final do Hub `28298231558`, redeploys dos nove apps (`28296917133`, `28297069955`, `28297229911`, `28297374719`, `28297528791`, `28297641483`, `28297781873`, `28297936033`, `28298069584`) e smokes publicos finais passaram. O primeiro Hub deploy `28296730836` falhou no smoke apos switch porque apps ainda tinham status antigo; foi corrigido pelos redeploys e pelo Hub deploy final verde. Ads, billing, checkout, workers, upload/storage, analytics externo e direct-root mapping seguem como gates separados.

## Fase 9 - Benchmark-Grade Refinement

Status geral: mapeada a partir da auditoria live `docs/AUDITORIA_LIVE_SUPERSITES_BENCHMARK.md`. A Fase 8 colocou as 12 superficies publicas no ar, mas a auditoria estimou score geral 62/100 e apontou lacunas P0 em localizacao, UX task-first, similaridade visual/funcional com benchmarks, legal/trust, AdSense readiness e linguagem publica. A Fase 9 transforma esse diagnostico em sprints sequenciais sem ativar anuncios reais, billing real, doacoes, afiliados, analytics externo, workers recorrentes, APIs pagas ou acoes irreversiveis.

Atualizacao live de 2026-06-28 apos Sprint 9.11: o crawler full navegou 876 rotas, executou 1752 checks desktop/mobile, gerou 1752 screenshots, checou 875 links internos e registrou 0 falhas de pagina, 0 links quebrados, 0 overflow, 0 console/page errors, 0 gaps de robots/sitemap e 0 gaps de title/meta/canonical/hreflang. As lacunas remanescentes sao de benchmark-grade: 872 checks sem JSON-LD schema, 26 titulos longos, 6 meta descriptions longas, Hub ainda catalog-first/consent intrusivo, CalcHarbor/TimeNexus/DevUtility ainda catalog-first e copy operacional residual em surfaces ja refinadas.

Atualizacao final de 2026-06-28 para Sprint 9.16: a sprint fechou em producao a camada de schema, metadata, AdSense-safe e crawler final. O crawler publico pre-correcao `2026-06-28T18-58-27-647Z` encontrou 680 gaps de JSON-LD na producao anterior; apos os commits `7ea0921`, `6fcd03f` e `d26bc39`, os deploys rotulados e smokes publicos passaram, e o crawler full final `2026-06-28T20-51-53-722Z` navegou 876 rotas e 1752 checks desktop/mobile com 0 falhas de pagina/browser, 0 console errors, 0 links internos quebrados, 0 overflow, 0 robots/sitemap gaps, 0 gaps de title/meta/canonical/hreflang e 0 gaps de JSON-LD. Lighthouse/PageSpeed/LHCI nao estavam disponiveis no PATH local, entao a fase registrou proxies deterministicos do crawler final: P75 load 97 ms, P75 LCP 100 ms e CLS P75 0. O gate `pnpm validate:adsense-safe-public` passou em 13 paginas publicas e confirmou que espacos de ads seguem inertes e sem requests/DOM de AdSense, GTM/GA4, pagamento, doacao ou afiliados.

Sprint 9.1 - Roadmap benchmark-grade e rotulos de deploy
- Simbolico: BGR-ROADMAP-LABELS.
- Objetivo: converter a auditoria live em roadmap executavel e fazer os workflows manuais de deploy registrarem Fase/Sprint nos nomes e logs dos runs, mantendo o Deploy Dry Run automatico compativel com `push`.
- Entregas: `docs/SPRINTS/BENCHMARK_GRADE_REFINEMENT_SPRINTS.md`, atualizacoes de `docs/ROADMAP.md`, `docs/STATUS.md`, `docs/METRICS.md`, `docs/BENCHMARK_MATRIX.md`, runbooks afetados e workflows `.github/workflows/deploy-*.yml`.
- Validacao: docs/workflow-only, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, smokes publicos aplicaveis, push e monitoramento de Quality Gate/Deploy Dry Run.
- Status: concluida. O roadmap Fase 9 foi criado, os workflows manuais de deploy receberam inputs/logs Fase/Sprint, o Deploy Dry Run automatico foi restaurado para `push`, e a validacao remota final do fechamento docs-only ficou bloqueada por billing/limite do GitHub Actions ja registrado em `docs/HUMAN_ACTION_REQUIRED.md`.

Sprint 9.2 - Crawler, screenshots e baseline tecnico
- Simbolico: BGR-CRAWLER-BASELINE.
- Objetivo: criar crawler Playwright para Hub, 10 sites, ferramentas e rotas EN/PT-BR/ES/FR/DE em desktop/mobile, com screenshots, console errors, links, canonical, hreflang, sitemap, robots, title, description, schema e baseline Lighthouse/PageSpeed local.
- Validacao: crawler deterministico, artefatos em `docs/benchmarks/our-sites` ou `artifacts/`, relatorio de gaps e gates locais/CI.
- Status: concluida em producao. O crawler `scripts/benchmark-crawl.mjs` e scripts `benchmark:crawl*` foram adicionados, o baseline quick foi registrado em `docs/benchmarks/our-sites/latest-baseline.md`, artifacts locais foram gerados para Hub, NetProbe e nove apps, e `robots.txt` estatico + rota Hub `/status` foram publicados em producao por deploys rotulados Fase 9/Sprint 9.2. O repo foi tornado publico com autorizacao do usuario para remover o bloqueio de GitHub Actions em repo privado; `Quality Gate` `28308340947`, Hub deploy `28309009196`, NetProbe deploy `28311031901` e deploys dos nove apps (`28311150383`, `28311150384`, `28311150370`, `28311325342`, `28311325343`, `28311325319`, `28311485541`, `28311485547`, `28311485563`) passaram. Smokes publicos finais e checagens diretas de `robots.txt` passaram; crawler pos-deploy `2026-06-28T04-46-52-491Z` registrou 95 rotas, 190 checks, 142 gaps, 0 failures, 0 links quebrados, 0 overflow e 0 gaps de robots/sitemap.

Sprint 9.3 - Localizacao global e copia publica P0
- Simbolico: BGR-I18N-COPY-P0.
- Objetivo: corrigir fallback indevido para ingles, acentuacao e linguagem publica interna em EN/PT-BR/ES/FR/DE.
- Validacao: snapshots por locale, bloqueio de strings internas (`MVP`, `gated`, `deploy smoke`, `rollback validation`, `placeholder`) em superficies publicas onde nao forem produto/operacao interna, Playwright mobile/desktop e smokes publicos.
- Status: concluida em producao. O sanitizer compartilhado `sanitizePublicCopy` em `@supersites/i18n` foi aplicado ao Hub, paginas legais/status, homes, paginas editoriais e ferramentas dos 10 sites, removendo linguagem interna de MVP/gated/placeholder/deploy smoke/rollback validation/HUMAN_ACTION_REQUIRED das superficies publicas geradas. O novo `pnpm validate:public-copy` verificou 876 HTMLs e o Quality Gate recebeu o job `Public copy gate`. Commit `9b5a1e0`, Quality Gate `28313347776`, Deploy Dry Run `28313347789` e deploys iniciais Fase 9/Sprint 9.3 passaram; um spot check publico encontrou fallbacks visiveis em rotas localizadas, corrigidos no commit `b940561`. A correcao passou Quality Gate `28314301032`, Deploy Dry Run `28314301019`, deploys finais Hub/NetProbe/nove apps (`28314385617`, `28314386140`, `28314386658`, `28314387259`, `28314387879`, `28314388290`, `28314388782`, `28314389339`, `28314389887`, `28314390452`, `28314390962`) e smokes publicos finais, incluindo 16 paginas localizadas criticas. Nenhum anuncio real, checkout, billing, pagamento, doacao, afiliado, analytics externo, API paga, worker/cron, upload/storage ou direct-root mapping foi ativado.

Sprint 9.4 - Trust, legal e support blocks
- Simbolico: BGR-TRUST-SUPPORT.
- Objetivo: aprofundar About, Contact, Privacy, Cookies, Terms, Methodology e Editorial por idioma, alem de criar bloco configuravel de apoio/doacao sem link ou pagamento real.
- Validacao: paginas legais completas para revisao, support block inerte/fail-closed, `HUMAN_ACTION_REQUIRED` atualizado para revisao legal/doacao real e ausencia de provider de pagamento.
- Status: concluida em producao. Foi criado `buildTrustPageCopy` em `@supersites/i18n` e aplicado ao Hub, NetProbe Atlas, CalcHarbor, DevUtility Lab, TimeNexus, QRRoute, InvoiceCraft, MailHealth, SitePulse Lab, PixelBatch e DocShift para enriquecer About/Contact/Privacy/Cookies/Terms/Methodology/Editorial/Status em EN/PT-BR/ES/FR/DE. O bloco de suporte/doacao permanece apenas informativo e inerte, sem `href` de pagamento, checkout, webhook, provider SDK ou conta de pagamento. `validate-public-copy` agora tambem bloqueia URLs conhecidas de pagamento/support em `href`/`src`. Validacao local passou com typecheck/testes de pacotes, testes/builds/previews/Playwright dos 11 frontends, `validate:public-copy` em 876 HTMLs, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes` e `git diff --check`. Commit `99c0262`, Quality Gate `28315424809`, Deploy Dry Run `28315424825`, deploys Fase 9/Sprint 9.4 para Hub/NetProbe/nove apps (`28315507670`, `28315508804`, `28315509929`, `28315511100`, `28315512640`, `28315514298`, `28315516442`, `28315518113`, `28315519943`, `28315521494`, `28315523056`), smokes publicos e smoke trust/legal de 165 paginas passaram.

Sprint 9.5 - NetProbe Atlas P0 benchmark UX
- Simbolico: BGR-NETPROBE-P0.
- Objetivo: aproximar DNS Propagation e What is my IP do modelo mental dos benchmarks lideres: resultado acima da dobra, tabs de record type, tabela de resolvedores/localidades, mapa/world grid, painel visual de IP, related tools, privacy CTA e disclosure honesto de cobertura.
- Validacao: NetProbe tests/build/preview/Playwright, endpoints bounded intactos, smokes publicos NetProbe/API e sem promessa falsa de multi-regiao antes de workers.
- Status: concluida em producao. A UI do NetProbe recebeu tabs visuais de DNS, exemplo `example.com` separado do record type, workbench task-first, painel visual de IP, privacy CTA, related checks, mapa/grid CSS, headings de tabela/localidade e disclosure honesto de cobertura sem alterar endpoints bounded nem ativar probes multirregiao, workers, analytics externo, ads, billing ou API paga. Validacao local passou com `pnpm test:netprobe`, `pnpm build:netprobe`, `pnpm validate:netprobe-preview`, `pnpm test:e2e:netprobe`, screenshots desktop/mobile, package typecheck/testes, `validate:public-copy`, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes` e `git diff --check`. Commit `3fe3732`, Quality Gate `28316321439`, Deploy Dry Run `28316321508`, deploy NetProbe Fase 9/Sprint 9.5 `28316402512`, release `3fe373267c7d6086348ce42bb3aad9ac825d8396-28316402512-1`, smokes publicos e smoke live de UX passaram.

Sprint 9.6 - QRRoute tool-first generator
- Simbolico: BGR-QRROUTE-P0.
- Objetivo: abrir QRRoute diretamente no gerador com tabs QR/barcode/UTM/vCard/Wi-Fi, preview dominante, copy/download, privacidade local e upsell dinamico inerte.
- Validacao: testes/build/preview/Playwright QRRoute, artifact gate, smoke publico e redirect/abuse gates preservados.
- Status: concluida em producao. O QRRoute recebeu workbench compartilhado acima da dobra na home e nas paginas de ferramenta, com tabs de fluxo, preview SVG dominante, payload summary, copy/download, faixa de privacidade e upsell dinamico inerte sem ativar short links, QR dinamico, payload analytics, ads, billing ou API paga. Validacao local passou com testes/build/preview/Playwright QRRoute, screenshots, package gates, `validate:public-copy`, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes` e `git diff --check`. Commit `a6562c3`, Quality Gate `28317041432`, Deploy Dry Run `28317041430`, deploy QRRoute Fase 9/Sprint 9.6 `28317125920`, release `a6562c308416f693dd2a9bd15294a72f6a7f319b-28317125920-1`, smokes publicos e smoke live de UX passaram.

Sprint 9.7 - DocShift PDF workbench
- Simbolico: BGR-DOCSHIFT-P0.
- Objetivo: transformar DocShift em grid denso tipo PDF tools e paginas com dropzone dominante, preview/status/download, cross-linking e privacidade browser-side.
- Validacao: testes PDF/browser worker, build/preview/Playwright, smoke publico e ausencia de upload/storage/OCR server-side.
- Status: concluida em producao. O DocShift recebeu `DocShiftWorkbench` compartilhado na home e nas paginas de ferramenta, com tabs densas para 8 fluxos PDF, dropzone dominante, preview/download, snapshot de workflow, blocos de privacidade, workflow servidor planejado e ferramentas relacionadas. O processamento permanece `pdf-lib`/worker no navegador, sem upload, storage persistente, OCR server-side, batch, API paga, ads, billing ou analytics externo. Validacao local passou com `pnpm test:docshift`, `pnpm build:docshift`, `pnpm validate:docshift-preview`, `pnpm test:e2e:docshift`, screenshots Playwright, package gates, `validate:public-copy`, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes` e `git diff --check`. Commit `1c20e80`, Quality Gate `28317815474`, Deploy Dry Run `28317815479`, deploy DocShift Fase 9/Sprint 9.7 `28317896866`, release `1c20e80830ab8cbca6cfb9742d01b5698e917bab-28317896866-1`, smokes publicos e smoke live de UX passaram.

Sprint 9.8 - PixelBatch image workbench
- Simbolico: BGR-PIXELBATCH-P0.
- Objetivo: criar UX visual de imagem com drag-and-drop, preview antes/depois, economia de tamanho, formato/qualidade, presets por uso e download claro.
- Validacao: worker/canvas tests, build/preview/Playwright, smoke publico e ausencia de upload backend, storage ou provider externo.
- Status: concluida em producao. O PixelBatch recebeu `PixelBatchWorkbench` compartilhado na home e nas paginas de ferramenta, com tabs densas para 6 fluxos de imagem, drag-and-drop real, dropzone dominante, presets de uso, controles de formato/qualidade/dimensao, preview antes/depois, economia de tamanho, snapshot de workflow, privacidade, batch/API/IA planejados e ferramentas relacionadas. O processamento continua worker/Canvas no navegador, sem upload backend, storage persistente, provider externo, batch, API paga, ads, billing ou analytics externo. Validacao local passou com `pnpm test:pixelbatch`, `pnpm build:pixelbatch`, `pnpm validate:pixelbatch-preview`, `pnpm test:e2e:pixelbatch`, screenshots Playwright, package gates, `validate:public-copy`, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes` e `git diff --check`. Commit `9ce7df7`, Quality Gate `28318467331`, Deploy Dry Run `28318467334`, deploy PixelBatch Fase 9/Sprint 9.8 `28318554712`, release `9ce7df79eda8d034520d92d9df9a878e84df5c80-28318554712-1`, asset `https://opentshost.com/supersites/pixelbatch/_nuxt/CITr2M7k.js`, smokes publicos e smoke live de UX passaram.

Sprint 9.9 - InvoiceCraft editor-first workflow
- Simbolico: BGR-INVOICECRAFT-P0.
- Objetivo: abrir InvoiceCraft no editor/preview de fatura/orcamento/recibo com linhas editaveis, moeda/locale, desconto/frete/impostos como campos controlados e PDF local.
- Validacao: PDF rendering, dados locais, templates, Playwright download e impostos/numeracao fiscal como `HUMAN_ACTION_REQUIRED` quando aplicavel.
- Status: concluida em producao. O InvoiceCraft recebeu `InvoiceCraftWorkbench` compartilhado na home e nas paginas de ferramenta, com tabs de fatura/orcamento/recibo, linhas editaveis, moeda/locale, desconto, frete, imposto/ajuste manual, preview de exemplo local, snapshot, PDF local, copy summary, privacidade, caminho pago inerte e related documents. O processamento continua no navegador com worker/jsPDF, sem conta, storage, cliente/produto salvo, pagamento, checkout, numeracao fiscal oficial, imposto jurisdicional automatizado, billing, ads ou analytics externo. Validacao local passou com `pnpm test:invoicecraft`, `pnpm build:invoicecraft`, `pnpm validate:invoicecraft-preview`, `pnpm test:e2e:invoicecraft` e screenshots Playwright. Commit `a57083b`, Quality Gate `28319167672`, Deploy Dry Run `28319167671`, deploy InvoiceCraft Fase 9/Sprint 9.9 `28319247622`, release `a57083b70a60a34b3fc66394a86d27a0c810db52-28319247622-1`, asset `https://opentshost.com/supersites/invoicecraft/_nuxt/CAuTAoAj.js`, smokes publicos e smoke live de UX passaram.

Sprint 9.10 - MailHealth unified report
- Simbolico: BGR-MAILHEALTH-REPORT.
- Objetivo: criar diagnostico unificado de dominio com score, checklist SPF/DKIM/DMARC/MX/blacklist/SMTP/headers, severidade e guidance neutro por provedor.
- Validacao: DNS/SMTP bounded endpoints, rate limits, antiabuso, testes backend/frontend e smoke publico.
- Status: concluida em producao. O MailHealth recebeu `MailHealthReportWorkbench` na home com relatorio unificado de dominio, score 0-100, cards de SPF/DKIM/DMARC/MX/blacklist/SMTP/headers, guidance neutro por provedor, protecoes de privacidade/antiabuso e analytics sanitizado do `domain-report`. O fluxo usa endpoints publicos existentes e limitados para DNS/DNSBL/SMTP, mantendo headers locais no navegador. Validacao local passou com `pnpm test:mailhealth`, `pnpm build:mailhealth`, `pnpm validate:mailhealth-preview`, `pnpm test:e2e:mailhealth`, screenshots Playwright e gates de pacotes/public-copy/estrutura/segredos/dry-run/ci/diff. Commit `55721b1`, Quality Gate `28319796608`, Deploy Dry Run `28319796624`, deploy MailHealth Fase 9/Sprint 9.10 `28319881701`, release `55721b1aa2d0e020f73c3823d580427a48708ab4-28319881701-1`, asset `https://opentshost.com/supersites/mailhealth/_nuxt/fseKxIDq.js`, smokes publicos e smoke live de UX passaram.

Sprint 9.11 - SitePulse visual report
- Simbolico: BGR-SITEPULSE-REPORT.
- Objetivo: criar resposta visual `online/down/redirecting/slow`, score e report cards de availability, redirects, security headers, crawlability e performance; corrigir branding/prefixos indevidos.
- Validacao: probe bounded tests, SSRF guard, Playwright, smoke publico e sem monitoramento recorrente antes de worker/gate.
- Status: concluida em producao. O SitePulse recebeu `SitePulseReportWorkbench` na home com input unico de URL, estados visuais, score, metadados de HTTP/redirect/TTFB/cache, cards de availability/redirects/security headers/crawlability/performance, salvaguardas de privacidade/antiabuso e caminho de monitoramento pago inerte. O fluxo reutiliza o endpoint publico bounded `/api/v1/sitepulse/probe` com `checks: ['performance']`, sem mudanca de backend, storage, worker, probe recorrente ou analytics de URL/resultado. Validacao local passou com `pnpm test:sitepulse`, `php artisan test --filter=SitePulseProbeApiTest`, `pnpm build:sitepulse`, `pnpm validate:sitepulse-preview`, `pnpm test:e2e:sitepulse`, screenshots Playwright e gates de pacotes/public-copy/estrutura/segredos/dry-run/ci/diff. Commit `761d3f0`, Quality Gate `28320680554`, Deploy Dry Run `28320680557`, deploy SitePulse Fase 9/Sprint 9.11 `28320771689`, release `761d3f0e54f09839ba8b5ff9d7a39bc5d176b11d-28320771689-1`, asset `https://opentshost.com/supersites/sitepulse-lab/_nuxt/C9Q51oa7.js`, smokes publicos e smoke live de UX passaram.

Sprint 9.12 - CalcHarbor calculator density
- Simbolico: BGR-CALCHARBOR-DENSITY.
- Objetivo: transformar a home e paginas de calculadora de catalogo para workbench task-first com cenarios, tabelas/graficos leves, resultados auditaveis, exemplos, disclaimers e copy publica madura sem linguagem de MVP.
- Validacao: fixtures de formulas/cenarios, i18n/locale, build/preview/Playwright, auditoria visual desktop/mobile, crawler/smoke publico e analytics sem valores de calculadora.
- Status: concluida em producao. O CalcHarbor recebeu `CalcHarborWorkbench` na home com tabs, inputs reais, resultado ao vivo, metricas de apoio, grafico de barras e tabela lower/base/higher usando `buildCalculatorScenarioRows`; paginas individuais ganharam `Scenario snapshot` com tabela/grafico e copy browser-side madura. Validacao local passou com testes/build/preview/Playwright, screenshots desktop/mobile, pacote/public-copy/estrutura/segredos/dry-run/ci/diff. Commit `97c92f0`, Quality Gate `28329239451`, Deploy Dry Run `28329239457`, deploy CalcHarbor Fase 9/Sprint 9.12 `28329341280`, release `97c92f099ff741220280593c9d96eec34c9e3729-28329341280-1`, asset `https://opentshost.com/supersites/calcharbor/_nuxt/CjP6XAFu.js`, smokes publicos e smoke live de UX passaram. Nenhum valor de calculadora foi para storage/analytics; nenhum checkout, billing, pagamento, anuncio, API paga, worker, storage persistente ou automacao tax/legal foi ativado.

Sprint 9.13 - TimeNexus world clock e planner
- Simbolico: BGR-TIMENEXUS-DENSITY.
- Objetivo: substituir a primeira dobra catalog-first por painel de hora atual, world clock, timeline converter, meeting planner e paginas SEO prioritarias por cidade/fuso sem conteudo raso.
- Validacao: timezone fixtures, DST edge cases, mobile first-fold, build/preview/Playwright e smoke publico.
- Status: concluida em producao. O TimeNexus recebeu `TimeNexusPlanner` na home antes do catalogo, com relogio mundial por grupos de cidades, meeting planner, conversao UTC, status de horario comercial e tabela de slots proximos. Tambem foram adicionadas 3 paginas curadas de world-clock em 5 idiomas (`americas-europe`, `global-product`, `apac-europe`), com canonical/hreflang/sitemap e conteudo original para evitar paginas rasas em massa. Validacao local passou com `pnpm test:timenexus`, `pnpm build:timenexus`, `pnpm validate:timenexus-preview`, `pnpm test:e2e:timenexus`, smoke visual desktop/mobile, package gates, `validate:public-copy` em 891 HTMLs, estrutura, segredos, deploy dry-run, ci:changes e diff check. Commit `e74a9d9`, Quality Gate `28330255418`, Deploy Dry Run `28330255414`, deploy TimeNexus Fase 9/Sprint 9.13 `28330387022`, release `e74a9d934f68ebd16806e4f826b8ab6b089a3c18-28330387022-1`, asset `https://opentshost.com/supersites/timenexus/_nuxt/DSDvC2kq.js`, smokes publicos e smoke live de UX passaram. Nenhum preset salvo, historico, widget, API paga, checkout, billing, pagamento, anuncio, analytics externo, worker/cron, storage persistente ou calendario externo foi ativado.

Sprint 9.14 - DevUtility Lab workbench density
- Simbolico: BGR-DEVUTILITY-WORKBENCH.
- Objetivo: evoluir DevUtility de catalogo para workbench tecnico com editor/output split, exemplos, tree/error views, copy/download/clear, favoritos/recentes locais quando seguro e navegacao densa por categoria.
- Validacao: testes por ferramenta, dados locais, estados de erro, build/preview/Playwright e smoke publico.
- Status: concluida em producao. O DevUtility recebeu `DevUtilityWorkbench` na home antes do catalogo, com trilho denso por categoria, editor/output split, exemplos, reset/clear/run, output/tree/error views, copy/download, pagina completa e recentes somente em memoria da sessao. Validacao local passou com testes/build/preview/Playwright, smoke visual desktop/mobile, public-copy em 891 HTMLs, estrutura, segredos, deploy dry-run, ci:changes e diff check. Commit `0f05619`, Quality Gate `28331265610`, Deploy Dry Run `28331265593`, deploy DevUtility Fase 9/Sprint 9.14 `28331371180`, release `0f056196427d07355a55761aa05409d406d154e1-28331371180-1`, asset `https://opentshost.com/supersites/devutility-lab/_nuxt/z8AMOABT.js`, smokes publicos e smoke live de UX passaram. Nenhum snippet, resultado, recente ou payload foi para storage/analytics/API; nenhum workspace, historico salvo, API paga, checkout, billing, pagamento, anuncio, analytics externo, worker/cron ou storage persistente foi ativado.

Sprint 9.15 - Hub, SEO/AIO e rich footers
- Simbolico: BGR-HUB-SEO-AIO.
- Objetivo: tornar o Hub e os rodapes por vertical mais visuais e navegaveis, com top tools, screenshots/preview blocks, guias, related tools, clusters SEO/AIO e schema uniforme sem criar conteudo em massa sem valor.
- Validacao: Hub tests/build/preview/Playwright, SEO technical checks, sitemap/hreflang/canonical/schema, reducao dos 872 gaps de JSON-LD e smoke publico.
- Status: concluida em producao. O Hub recebeu bloco visual `Top public tools`, preview blocks CSS, clusters `Choose by workflow`, rodape rico por verticais e JSON-LD uniforme para home/detalhe/legal sem criar paginas rasas. Validacao local passou com testes/build/preview/Playwright do Hub, typecheck/testes de pacotes, public-copy em 891 HTMLs, estrutura, segredos, deploy dry-run, ci:changes e diff check. Commit `6d5a04b`, Quality Gate `28332110747`, Deploy Dry Run `28332110760`, deploy Hub Fase 9/Sprint 9.15 `28332214304`, release `6d5a04b54c7ec3e796cf1f31140d90d651133b43-28332214304-1`, asset `https://opentshost.com/supersites/_nuxt/f2kVvvDG.js`, smokes publicos e smoke live de UX passaram. Nenhum anuncio real, checkout, billing, analytics externo, worker, API paga ou conteudo em massa foi ativado.

Sprint 9.16 - Performance, AdSense-safe closure e rollout
- Simbolico: BGR-PERF-ADSENSE-CLOSURE.
- Objetivo: fechar a Fase 9 com Lighthouse/PageSpeed local quando disponivel, AdSense-safe layout inerte, consent banner menos intrusivo, copy operacional residual tratada, smokes publicos finais, deploys com rotulo Fase/Sprint, metricas/status atualizados e pendencias humanas explicitadas.
- Validacao: testes/builds afetados, Playwright visual, crawler full final, `validate:public-copy`, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, Quality Gate/Deploy Dry Run, deploys manuais quando aprovados e smokes publicos finais.
- Status: concluida em producao. O gate `pnpm validate:adsense-safe-public` foi implementado e passou em 13 paginas publicas; `scripts/benchmark-crawl.mjs` agora aceita rotulos `--sprint`/`--symbolic-sprint`; a sprint adicionou JSON-LD para homes/paginas estaticas dos 10 apps e corrigiu metadata publica preservando sufixos de marca. Commit `7ea0921` passou Quality Gate `28333587563`, Deploy Dry Run `28333587571` e deploys dos 10 apps; a correcao `6fcd03f` passou Deploy Dry Run `28334706999`, mas o Quality Gate `28334706997` falhou apenas porque o titulo truncado do PixelBatch perdeu a marca; `d26bc39` corrigiu a preservacao do sufixo e passou Quality Gate `28334888617` e Deploy Dry Run `28334888619`. Os redeploys finais Hub/DevUtility/QRRoute/InvoiceCraft/MailHealth/PixelBatch/DocShift passaram, os smokes publicos finais passaram, e o crawler full final `2026-06-28T20-51-53-722Z` registrou 876 rotas, 1752 checks e 0 gaps. Nenhum anuncio real, GTM/GA4, analytics externo, checkout, billing, pagamento, doacao, afiliado, worker, API paga, `ads.txt`, publisher id real ou snippet AdSense foi ativado.

## Fase 10 - Post-Benchmark Operations Watchdog

Status geral: concluida em 2026-06-29 a partir do fechamento da Fase 9 e da auditoria V2 `docs/AUDITORIA_LIVE_SUPERSITES_BENCHMARK_V2.md`. A Fase 9 ja resolveu as lacunas P0 publicas de localizacao, linguagem interna, NetProbe, tool-first UX, trust/legal, schema, crawler e AdSense-safe layout. A Fase 10 fechou a reconciliacao pos-benchmark com roadmap futuro completo e monitoramento publico recorrente sem mutar producao.

Roadmap detalhado: `docs/SPRINTS/POST_BENCHMARK_OPERATIONAL_ROADMAP.md`.

Sprint 10.1 - Roadmap pos-benchmark e public watchdog
- Simbolico: POST-BENCHMARK-WATCHDOG.
- Objetivo: versionar a auditoria V2, registrar o roadmap de Fases 10 a 16, verificar o estado publico atual e criar workflow `Public Watchdog` com smokes publicos, gate AdSense-safe e crawler quick/full agendado/manual.
- Validacao: `deploy:smoke-supersite-public`, `deploy:smoke-control-plane-public`, crawler quick publico, `validate:adsense-safe-public`, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, Quality Gate/Deploy Dry Run e execucao manual do `Public Watchdog`.
- Status: concluida. Commit tecnico `5143a1f` passou Quality Gate `28342679619` e Deploy Dry Run `28342679627`; `Public Watchdog` manual `28342779097` passou em modo quick, com crawler `2026-06-29T01-22-23-919Z` registrando 95 rotas, 190 checks e 0 gaps. Smokes publicos finais locais passaram para Hub/API, control-plane, NetProbe e gate AdSense-safe em 13 paginas. Nenhum anuncio real, GTM/GA4, analytics externo, checkout, billing, pagamento, doacao, afiliado, worker/cron, API paga, DNS/root mapping ou acao irreversivel foi ativado nesta sprint.

## Fases futuras mapeadas

As fases futuras completas estao descritas em `docs/SPRINTS/POST_BENCHMARK_OPERATIONAL_ROADMAP.md`:

- Fase 11 - Operational Hardening: concluida em 2026-06-29, cobrindo branch protection, root mapping dry-run, retencao HostGator, VPS backup/restore e runbooks de uptime.
- Fase 12 - Real Measurement Readiness: concluida em 2026-06-29, cobrindo Lighthouse/LHCI, auditoria admin autenticada, readiness Google e relatorios executivos com evidencias internas/public watchdog.
- Fase 13 - Product Depth and SEO/AIO Expansion: concluida em 2026-06-29; CalcHarbor, TimeNexus, MailHealth, SitePulse e PixelBatch/DocShift receberam profundidade util/local-first sem conteudo em massa ou provider externo.
- Fase 14 - Paid Upgrade Foundations: concluida em main em 2026-06-29; auth/contas, entitlements/quotas, webhook dry-run e preview autenticado de monitores foram entregues sem cobranca real, checkout, provider externo ou secrets reais.
- Fase 15 - Provider and Monetization Go-Live: AdSense, Google providers, billing, doacoes e afiliados apenas apos gates humanos.
- Fase 16 - Continuous Growth Loop: ingestao real, priorizacao, automacoes via PR e relatorios executivos recorrentes.

## Fase 11 - Operational Hardening

Status geral: concluida em 2026-06-29. A fase fechou pendencias operacionais tecnicas antes de monetizacao real, workers recorrentes, billing ou escala SEO com provedores externos: ruleset minimo em `main`, root mapping dry-run, retencao HostGator dry-run, drill VPS backup/restore e runbook/smoke consolidado de uptime/incidentes.

Sprint 11.1 - Main branch guardrails
- Simbolico: OPS-BRANCH-PROTECTION.
- Objetivo: configurar protecao reversivel para `main` sem bloquear recovery/deploy direto governado.
- Escopo: ruleset GitHub ativo minimo para bloquear exclusao e non-fast-forward, script `scripts/sync-github-main-ruleset.ps1`, runbook `docs/RUNBOOKS/GITHUB_MAIN_GUARDRAILS.md` e registro de evidencias.
- Validacao: auditoria de protection/rulesets antes/depois, dry-run do script, aplicacao com `-Apply`, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, Quality Gate, Deploy Dry Run quando disparado e smokes publicos.
- Status: concluida. Ruleset `SuperSites main safety guardrails` ID `18241951` aplicado em `active` com regras `deletion` e `non_fast_forward`; commit `e155cbe`, Quality Gate `28347010714`, Deploy Dry Run `28347010711` e smokes publicos finais passaram. Nenhum PR obrigatorio, required checks antes de push direto, deploy required, code owners ou signed commits foi ativado.

Sprint 11.2 - Root mapping dry-run
- Simbolico: OPS-ROOT-MAPPING-DRYRUN.
- Objetivo: decidir e simular a estrategia segura para `https://opentshost.com/` apontar ao Hub em `/supersites/` sem sobrescrever `.htaccess` raiz nao gerenciado.
- Escopo: script nao mutante `scripts/plan-hostgator-root-mapping.ps1`, comando `pnpm ops:root-mapping-dry-run`, runbook `docs/RUNBOOKS/HOSTGATOR_ROOT_MAPPING.md`, probes HTTP publicos e gate opcional de inspecao cPanel sem imprimir secrets.
- Validacao: dry-run local, modo `-ProbeCpanel` fail-closed sem secrets locais, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, Quality Gate, Deploy Dry Run quando disparado e smokes publicos.
- Status: concluida. Commit `b20a0d1`, Quality Gate `28347563479`, Deploy Dry Run `28347563485` e smokes publicos finais passaram. Dry-run final `2026-06-29T04-00-22Z` manteve classificacao `blocked` ate inspecao cPanel de `.htaccess` raiz; producao permanece em `/supersites/...` sem DNS/root mapping, direct product mapping ou escrita remota.

Sprint 11.3 - HostGator retention dry-run
- Simbolico: OPS-HOSTGATOR-RETENTION.
- Objetivo: criar politica e script dry-run de retencao para releases HostGator antigos, sem remocao real.
- Escopo: script nao mutante `scripts/plan-hostgator-release-retention.ps1`, comando `pnpm ops:hostgator-retention-dry-run`, workflow manual `.github/workflows/hostgator-retention-dry-run.yml`, runbook `docs/RUNBOOKS/HOSTGATOR_RELEASE_RETENTION.md`, inventario opcional via cPanel sem imprimir secrets e politica de classificacao sem delete.
- Validacao: dry-run local, modo `-ProbeCpanel` fail-closed sem secrets locais, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, `test:packages`, `typecheck:packages`, Quality Gate, Deploy Dry Run, workflow manual HostGator Retention Dry Run e smokes publicos.
- Status: concluida. Commit `3318ff4`, Quality Gate `28348142881`, Deploy Dry Run `28348142892`, workflow manual `HostGator Retention Dry Run` `28348277067` e smokes publicos finais passaram. O inventario remoto `2026-06-29T04-18-16Z` ficou `checked`, com 12 superficies, 108 releases listados, 0 `eligible-for-future-removal`, 0 `review-only` e nenhuma remocao, deploy, upload, chmod, `.htaccess`, document root, DNS/root mapping ou escrita remota.

Sprint 11.4 - VPS backup/restore drill
- Simbolico: OPS-VPS-BACKUP-RESTORE.
- Objetivo: documentar e validar backup/restore do Redis runtime e layout `/srv/supersites` sem interromper BigShop360 nem expor credenciais.
- Escopo: script `scripts/run-vps-backup-restore-drill.ps1`, comando `pnpm ops:vps-backup-restore-drill`, runbook VPS atualizado, archive Redis em `/srv/supersites/backups/redis-drills/<run>/`, restore-test temporario, comparacao de manifestos e validacao de portas Redis publicas.
- Validacao: smokes publicos baseline, `scripts/validate-vps-runtime.ps1` antes/depois, drill backup/restore, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, `test:packages`, `typecheck:packages`, Quality Gate, Deploy Dry Run quando disparado e smokes publicos finais.
- Status: concluida. Commit `a663b62`, Quality Gate `28348620570`, Deploy Dry Run `28348620582`, smokes publicos finais e `scripts/validate-vps-runtime.ps1` pos-CI passaram. Drill `2026-06-29T04-25-08Z` passou: archive Redis SHA-256 `dc473b72253feeefabc07a4c3549dbb91287cd920355055389f491da9d35aedd`, restore manifest match `true`, extração temporaria removida, Redis sem interrupcao, portas publicas fechadas/filtradas e BigShop360 nao tocado.

Sprint 11.5 - Uptime and incident runbook
- Simbolico: OPS-UPTIME-RUNBOOK.
- Objetivo: consolidar watchdog, smokes, rollback, incidente e evidencias de producao em runbook operacional.
- Escopo: script `scripts/run-uptime-incident-readiness.ps1`, comando `pnpm ops:uptime-readiness-smoke`, runbook `docs/RUNBOOKS/UPTIME_INCIDENT_RESPONSE.md`, severidade, triagem, matriz de rollback, evidencias obrigatorias e limites humanos.
- Validacao: readiness smoke local, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, `test:packages`, `typecheck:packages`, Quality Gate, Deploy Dry Run quando disparado e smokes publicos finais.
- Status: concluida. Commit `228d8b7`, Quality Gate `28348989762`, Deploy Dry Run `28348989784` e readiness smoke final `2026-06-29T04-42-30Z` passaram. O readiness final teve 5 checks e 0 falhas: Hub/API publico, control-plane/API, NetProbe/API, `validate:adsense-safe-public` em 13 paginas e VPS Redis runtime. Nenhum provedor externo, worker/cron, alerta pago, deploy real ou rollback foi ativado.

## Fase 12 - Real Measurement Readiness

Status geral: concluida em 2026-06-29. A fase trocou proxies deterministicos por evidencias reais permitidas e reproduziveis: Lighthouse/LHCI publico sem PageSpeed API, auditoria admin autenticada local, checklist Google sem criar propriedades/tags e relatorios executivos baseados somente em evidencias internas/public watchdog.

Sprint 12.1 - Lighthouse/LHCI public measurement
- Simbolico: MEASURE-LIGHTHOUSE-CI.
- Objetivo: versionar Lighthouse/LHCI, criar comandos locais, workflow manual e evidencias publicas sem provider pago.
- Escopo: dev dependencies `lighthouse`/`@lhci/cli`, comando `pnpm measure:lighthouse-public`, comando `pnpm measure:lhci-public`, config `.lighthouserc.cjs`, workflow manual `Public Measurement Readiness`, runbook `docs/RUNBOOKS/REAL_MEASUREMENT_READINESS.md` e artefatos ignorados por git.
- Validacao: baseline publico, medicao Lighthouse quick, LHCI filesystem, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, Quality Gate, Deploy Dry Run, workflow manual de medicao e smokes publicos.
- Status: concluida. `pnpm measure:lighthouse-public -- --mode=quick --output-dir=artifacts/lighthouse-public/sprint-12-1-local` passou para Hub EN, NetProbe What is my IP e PixelBatch Image Compressor; `pnpm measure:lhci-public` passou com 3 reports filesystem. Commit `709ad60`, Quality Gate `28349863030`, Deploy Dry Run `28349863062`, workflow manual `Public Measurement Readiness` `28349998391`, artifact `7943108351` e readiness smoke final `2026-06-29T05-12-04Z` passaram. Nenhuma PageSpeed API key, propriedade Google, tag GA4/GTM, Search Console, AdSense, billing, doacao, afiliado ou provider externo foi ativado.

Sprint 12.2 - Authenticated admin dashboard audit
- Simbolico: MEASURE-DASHBOARD-AUDIT.
- Objetivo: auditar o dashboard admin autenticado com Playwright local e registrar cobertura de telas sem expor credenciais.
- Escopo: criar fluxo local de login/seed controlado, screenshots/coverage do dashboard, benchmark refinement, reports e sites, com redacao de dados sensiveis e sem acesso a producao autenticada.
- Validacao: testes Laravel/admin, Playwright local, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, CI e smokes publicos.
- Status: concluida. `pnpm measure:admin-audit` passou no run `2026-06-29T05-31-40Z`, cobrindo 7 checks autenticados em desktop/mobile via SQLite efemero e servidor local `127.0.0.1:8014`, com 0 overflow, 0 console/page errors e 0 requests externos. Commit `f553f9e`, Quality Gate `28350927064`, Deploy Dry Run `28350927046` e readiness smoke publico final `2026-06-29T05-40-30Z` passaram. Nenhuma credencial real, producao autenticada, provider externo, AdSense, Google tag, PageSpeed API, billing, doacao ou afiliado foi acessado/ativado.

Sprint 12.3 - Google readiness checklist
- Simbolico: MEASURE-GOOGLE-READY.
- Objetivo: preparar checklist tecnico para GA4/GTM/Search Console sem criar propriedades, verificacoes, containers ou tags reais.
- Escopo: validar contratos fail-closed, eventos permitidos, consent/ad gates, ausencia de snippets publicos ativos, ausencia de `ads.txt` placeholder, checklist de verificacao manual e pendencias humanas.
- Validacao: testes de analytics/ads/seo, gates publicos, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, CI e smokes publicos.
- Status: concluida. `pnpm measure:google-ready` passou no run `2026-06-29T05-47-31Z`, com 18 checks, 0 falhas, 318 arquivos publicos de producao verificados, 0 snippets ativos de GA4/GTM/Search Console/AdSense, 0 `ads.txt` publico e ativacao 0 para GA4, GTM, Search Console, AdSense e PageSpeed API. Commit `07f4c84`, Quality Gate `28351452461`, Deploy Dry Run `28351452440` e readiness smoke publico final `2026-06-29T05-53-40Z` passaram. Nenhuma propriedade, container, verificacao, tag, conta, publisher ID, API, snippet ou request de provider foi criado/ativado.

Sprint 12.4 - Executive reports evidence wiring
- Simbolico: MEASURE-EXEC-REPORTS.
- Objetivo: atualizar relatorios executivos para consumir apenas evidencias internas/public watchdog ate providers existirem.
- Escopo: evidencias internas versionadas, artefatos de public watchdog/medicao local, status de dados explicito, fontes/resumos exportaveis, sem causalidade inventada, sem receita real e sem automacao de envio.
- Validacao: testes de `@supersites/executive-reports` e Laravel admin, export CSV/print, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, CI e smokes publicos.
- Status: concluida. `@supersites/executive-reports` contrato `2026-06-29.1` classifica fontes permitidas e bloqueia fontes ativas de provider externo. O control-plane seeda 3 relatorios/18 itens, incluindo `Weekly Real Measurement Readiness - 2026-W27`, com fontes de Lighthouse, admin audit, Google readiness, smoke publico e `provider-unavailable:*`; CSV/print/detalhe exportam fontes/resumos de evidencia. Testes locais passaram: pacote executive-reports 8 testes/typecheck, `test:packages`, `typecheck:packages`, `php artisan test` 46 testes/460 assertions, `composer validate --strict` e admin audit local `2026-06-29T06-02-58Z`. Commit `6179407`, Quality Gate `28352029810`, Deploy Dry Run `28352029809` e readiness smoke publico final `2026-06-29T06-08-56Z` passaram. Nenhum provider externo, receita real, trafego real, import GA4/Search Console/AdSense/billing, envio automatico, worker, cron ou causalidade foi ativado.

## Fase 13 - Product Depth and SEO/AIO Expansion

Status geral: iniciada em 2026-06-29. A fase deve aumentar profundidade util e SEO/AIO sem conteudo em massa raso, mantendo ferramentas gratuitas completas, local-first quando aplicavel e monetizacao apenas preparada por gates.

Sprint 13.1 - CalcHarbor calculator depth
- Simbolico: DEPTH-CALCHARBOR.
- Objetivo: expandir calculadoras priorizadas e defaults por locale/moeda sem criar aconselhamento fiscal/juridico automatizado.
- Escopo: adicionar calculadoras curadas de juros compostos, meta de poupanca, runway de caixa e preco com desconto; introduzir moeda/defaults por locale; manter formulas visiveis, cenarios, copy em 5 idiomas, JSON-LD e analytics sem valores.
- Validacao: `pnpm test:calcharbor`, `pnpm build:calcharbor`, `pnpm validate:calcharbor-preview`, `pnpm test:e2e:calcharbor`, `validate:public-copy`, `validate:adsense-safe-public`, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, Quality Gate/Deploy Dry Run e smokes publicos apos push.
- Status: concluida em main, sem deploy real. O CalcHarbor passou de 4 para 8 calculadoras, com 40 paginas localizadas, defaults `USD`/`BRL`/`EUR`, exemplos localizados e testes para formulas, defaults, schema `priceCurrency` e erro de runway. Validacoes locais passaram com 12 testes Vitest, build com 173 rotas prerenderizadas, preview smoke, 3 testes Playwright, public-copy em 911 HTMLs e AdSense-safe em 13 paginas. Commit `dda2647`, Quality Gate `28353160843` e Deploy Dry Run `28353160830` passaram; smokes publicos atuais passaram para Hub agregado, CalcHarbor, NetProbe e control-plane, validando o baseline publico existente com asset CalcHarbor `https://opentshost.com/supersites/calcharbor/_nuxt/D2u6NBF-.js`. Nenhum deploy real de app estatico, checkout, billing, anuncio real, doacao, afiliado, analytics externo, provider financeiro, storage persistente, API paga, worker ou automacao tax/legal foi ativado.

Sprint 13.2 - TimeNexus curated city/timezone depth
- Simbolico: DEPTH-TIMENEXUS.
- Objetivo: adicionar paginas curadas de cidade/fuso e timeline visual sem geracao ilimitada.
- Escopo: 8 paginas curadas de cidade/fuso em EN/PT-BR/ES/FR/DE, links internos na home, canonical/hreflang/sitemap, JSON-LD `WebPage`/`Place`, timeline de expediente e snapshot de sobreposicao sem iterar todos os fusos IANA.
- Validacao: `pnpm test:timenexus`, `pnpm build:timenexus`, `pnpm validate:timenexus-preview`, `pnpm test:e2e:timenexus`, `validate:public-copy`, `validate:adsense-safe-public`, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, Quality Gate/Deploy Dry Run e smokes publicos apos push.
- Status: concluida em main, sem deploy real. Foram adicionadas 8 paginas curadas (`new-york`, `sao-paulo`, `london`, `berlin`, `san-francisco`, `tokyo`, `singapore`, `sydney`) em 5 idiomas, totalizando 40 variantes novas. A home ganhou `Curated city clocks`; o build passou com 137 rotas configuradas e 273 artefatos gerados incluindo payloads; `validate:public-copy` passou em 951 HTMLs. Commit `6abcda5`, Quality Gate `28354017920` e Deploy Dry Run `28354017921` passaram; smokes publicos atuais passaram para Hub agregado, TimeNexus, NetProbe e control-plane, validando o baseline publico existente com asset TimeNexus `https://opentshost.com/supersites/timenexus/_nuxt/BAXbawo1.js`. Nenhum deploy real de app estatico, geracao em massa de cidades/fusos, calendario externo, widget/API, historico salvo, storage persistente, worker/cron, checkout, billing, anuncio real, doacao, afiliado ou analytics externo foi ativado.

Sprint 13.3 - MailHealth DNS builders and guides
- Simbolico: DEPTH-MAILHEALTH.
- Objetivo: criar builders SPF/DMARC seguros e guias profundos com policy gate para DNSBL/provider.
- Escopo: ativar builders locais de TXT SPF e DMARC nas paginas correspondentes, com campos limitados, preview copiavel, avisos de revisao, passos DNS, copy em 5 idiomas e paineis guide-only para DKIM/MX/DNSBL/SMTP/headers.
- Validacao: `pnpm test:mailhealth`, `pnpm build:mailhealth`, `pnpm validate:mailhealth-preview`, `pnpm test:e2e:mailhealth`, `validate:public-copy`, `validate:adsense-safe-public`, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, Quality Gate/Deploy Dry Run e smokes publicos apos push.
- Status: concluida em main, sem deploy real. Foram adicionados builders SPF/DMARC locais sem endpoint novo, publicacao DNS, storage, provider, analytics de valores ou billing. `pnpm test:mailhealth` passou com 10 testes, build/prerender gerou 163 rotas, preview smoke validou asset `/_nuxt/NxyQf1L0.js`, Playwright passou com 6 testes, public-copy passou em 951 HTMLs e AdSense-safe em 13 paginas. Commit `9259dd9`, Quality Gate `28354998649` e Deploy Dry Run `28354998680` passaram; smokes publicos atuais passaram para Hub agregado, MailHealth, NetProbe e control-plane, validando o baseline publico existente com asset MailHealth `https://opentshost.com/supersites/mailhealth/_nuxt/Dm_wdR4Q.js`.

Sprint 13.4 - SitePulse response details
- Simbolico: DEPTH-SITEPULSE.
- Objetivo: detalhar headers, redirects e tecnologias dentro dos limites antiabuso existentes.
- Escopo: renderizar caminho de redirects, matriz de headers, pistas de tecnologia, amostra de performance e notas da probe limitada nas paginas de ferramenta, usando apenas o payload bounded existente e copy localizada em 5 idiomas.
- Validacao: `pnpm test:sitepulse`, `pnpm build:sitepulse`, `pnpm validate:sitepulse-preview`, `pnpm test:e2e:sitepulse`, `validate:public-copy`, `validate:adsense-safe-public`, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, Quality Gate/Deploy Dry Run e smokes publicos apos push.
- Status: concluida em main, sem deploy real. A sprint adicionou detalhes escaneaveis de redirect/header/tecnologia/performance/notas sem endpoint novo, crawling amplo, storage, historico, analytics de alvo/resultado, uptime recorrente, alerta, status page, worker, provider ou monetizacao real. Validacoes locais passaram com 9 testes Vitest, build/prerender com 163 rotas/artefatos, preview smoke asset `/_nuxt/Ba9ZxuHL.js`, 5 testes Playwright, public-copy em 951 HTMLs e AdSense-safe em 13 paginas. Commit `53809f3`, Quality Gate `28355948547` e Deploy Dry Run `28355948542` passaram; smokes publicos atuais passaram para Hub agregado, SitePulse, NetProbe e control-plane, validando o baseline publico existente com asset SitePulse `https://opentshost.com/supersites/sitepulse-lab/_nuxt/lkcC6TkC.js`.

Sprint 13.5 - PixelBatch/DocShift provider planning
- Simbolico: DEPTH-PIXEL-DOC.
- Objetivo: planejar background remover, OCR e conversoes com matriz de dados antes de qualquer provider/upload.
- Escopo: adicionar cards publicos/localizados de workflows avancados em PixelBatch e DocShift, criar matriz operacional de dados/gates para upload/provider futuro e registrar `HUMAN_ACTION_REQUIRED` antes de IA/OCR/conversao server-side.
- Validacao: `pnpm test:pixelbatch`, `pnpm test:docshift`, `pnpm build:pixelbatch`, `pnpm build:docshift`, `pnpm validate:pixelbatch-preview`, `pnpm validate:docshift-preview`, `pnpm test:e2e:pixelbatch`, `pnpm test:e2e:docshift`, `validate:public-copy`, `validate:adsense-safe-public`, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, Quality Gate/Deploy Dry Run e smokes publicos apos push.
- Status: concluida em main, sem deploy real. PixelBatch documenta background cleanup, high-volume conversion e API/integracoes; DocShift documenta OCR/table extraction, Office/image conversion e batch/API. O runbook `docs/RUNBOOKS/FILE_PROVIDER_DATA_MATRIX.md` foi criado e os gates humanos foram registrados. Validacoes locais passaram, commit `e3ed365`, Quality Gate `28356961011`, Deploy Dry Run `28356961015` e smokes publicos atuais passaram para Hub agregado, PixelBatch, DocShift, NetProbe e control-plane. Nenhum upload API, OCR, IA, conversion provider, batch queue, storage persistente, API paga, checkout, billing, anuncio real, doacao, afiliado, analytics externo, worker ou cron foi ativado.

## Fase 14 - Paid Upgrade Foundations

Status geral: concluida em main em 2026-06-29. A fase preparou contas, entitlements, quotas, webhook dry-run e monitores preview sem ativar cobranca, checkout, provider externo, secrets reais, signup publico ou exclusao automatica.

Sprint 14.1 - Paid auth and account controls
- Simbolico: PAID-AUTH-ACCOUNTS.
- Objetivo: criar fundacao autenticada de conta, exportacao, pedido de exclusao e RBAC cliente/site antes de upgrades pagos.
- Escopo: tabela `user_account_privacy_requests`, export sanitizado de conta, pedido de exclusao `human_required`, `/admin/account`, endpoints `/api/v1/account/export` e `/api/v1/account/delete-request`, RBAC global/site-scoped no export e em `/api/v1/me`, audit logs, ADR `0032` e runbook `ACCOUNT_DATA_CONTROLS`.
- Validacao: `php artisan test`, `composer validate --strict`, `measure:admin-audit`, build de artifact do control-plane, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, Quality Gate/Deploy Dry Run e smokes publicos apos push.
- Status: concluida em main, sem deploy real. Validacoes locais passaram com 49 testes Laravel/499 assertions, audit admin autenticado `2026-06-29T08-11-31Z` em 9 paginas e artifact control-plane validado com 7137 arquivos. Feature commit `da54701`, Quality Gate `28358191311`, Deploy Dry Run `28358191342` e smokes publicos de Hub/control-plane/NetProbe passaram. Politicas finais de conta paga, privacidade, retencao e exclusao foram registradas como `HUMAN_ACTION_REQUIRED`. Nenhum signup publico, exclusao automatica, checkout, cobranca, assinatura, entitlement pago, provider SDK, webhook real, secret novo, pagamento, imposto, refund, dunning, worker/cron, anuncio real, doacao, afiliado ou provider externo foi ativado.

Sprint 14.2 - Paid entitlements and quota enforcement
- Simbolico: PAID-ENTITLEMENTS.
- Objetivo: resolver limites por plano/entitlement local e aplicar quota sem checkout real.
- Escopo: entitlements `monitor-slots` e `monitor-types`, `PlanEntitlementResolver`, metadados de quota nos endpoints de monitores NetProbe, bloqueio antes da criacao acima do limite, dashboard de billing com limites, contrato `@supersites/billing` para decisao de quota, ADR `0033` e runbook `ENTITLEMENT_QUOTA_CONTROLS`.
- Validacao: testes/typecheck do pacote billing, `test:packages`, `typecheck:packages`, `php artisan test`, `composer validate --strict`, `measure:admin-audit`, build de artifact do control-plane, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, Quality Gate/Deploy Dry Run e smokes publicos apos push.
- Status: concluida em main, sem deploy real. Validacoes locais passaram com pacote billing 14 testes/typecheck, pacotes compartilhados, 50 testes Laravel/514 assertions, audit admin autenticado `2026-06-29T08-29-48Z` em 9 paginas e artifact control-plane validado com 7138 arquivos. Feature commit `26516c8`, Quality Gate `28359248342`, Deploy Dry Run `28359248307` e smokes publicos de Hub/control-plane/NetProbe passaram. Plano pago real, uso medido comercial e sincronizacao de entitlements por pagamento foram registrados como `HUMAN_ACTION_REQUIRED`. Nenhum plano pago, checkout, provider price id, provider SDK, webhook real, cobranca, assinatura, invoice, refund, dunning, imposto automatico, portal de cliente, worker/cron, anuncio real, doacao, afiliado ou provider externo foi ativado.

Sprint 14.3 - Paid webhook dry-run foundation
- Simbolico: PAID-WEBHOOK-FOUNDATION.
- Objetivo: criar endpoint assinado e idempotente em modo dry-run sem provider real.
- Escopo: config `billing.webhooks`, receiver `BillingWebhookDryRunReceiver`, rota `POST /api/v1/billing/webhooks/{provider}`, persistencia de eventos dry-run em `billing_webhook_events`, idempotencia por provider/event id/hash, status `dry_run_scaffolded`/`dry_run_only` no seeder, ADR `0034` e runbook `BILLING_WEBHOOK_DRY_RUN`.
- Validacao: `BillingWebhookDryRunTest`, `AdminPanelTest`, `php artisan test`, `composer validate --strict`, `test:packages`, `typecheck:packages`, `measure:admin-audit`, build de artifact do control-plane, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, Quality Gate/Deploy Dry Run e smokes publicos apos push.
- Status: concluida em main, sem deploy real. Validacoes locais passaram com 56 testes Laravel/553 assertions, audit admin autenticado `2026-06-29T08-48-01Z` em 9 paginas e artifact control-plane validado com 7141 arquivos. Feature commit `2bb673d`, Quality Gate `28360245701`, Deploy Dry Run `28360245696` e smokes publicos de Hub/control-plane/NetProbe passaram. Webhook real, provider secret em cofre e processamento de eventos de pagamento foram registrados como `HUMAN_ACTION_REQUIRED`. Nenhum webhook real, checkout, cobranca, provider SDK, assinatura, invoice, refund, dunning, imposto automatico, mutation de entitlement por pagamento, worker/cron, anuncio real, doacao, afiliado ou provider externo foi ativado.

Sprint 14.4 - Paid monitor previews
- Simbolico: PAID-MONITORS-PREVIEW.
- Objetivo: criar preview autenticado de monitores NetProbe/MailHealth/SitePulse sem ativar workers, alertas reais ou cobranca.
- Escopo: config de `monitor_previews`, service `PaidMonitorPreviewService`, endpoints `GET/POST /api/v1/monitoring/previews`, entitlements `monitor-types` para NetProbe/MailHealth/SitePulse, auditoria com hash do target, ADR `0035` e runbook `PAID_MONITOR_PREVIEW`.
- Validacao: `PaidMonitorPreviewTest`, `php artisan test`, `composer validate --strict`, `test:packages`, `typecheck:packages`, `measure:admin-audit`, build de artifact do control-plane, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, Quality Gate/Deploy Dry Run e smokes publicos apos push.
- Status: concluida em main, sem deploy real. Validacoes locais passaram com 62 testes Laravel/597 assertions, audit admin autenticado `2026-06-29T09-02-00Z` em 9 paginas e artifact control-plane validado com 7144 arquivos. Feature commit `f05dea4`, Quality Gate `28360961942`, Deploy Dry Run `28360961952` e smokes publicos de Hub/control-plane/NetProbe passaram. Monitores pagos reais, worker recorrente, alertas reais e uso medido comercial foram registrados como `HUMAN_ACTION_REQUIRED`. Nenhum monitor persistente de MailHealth/SitePulse, worker recorrente, alerta real, status page, DMARC recorrente, checkout, cobranca, provider SDK, invoice, uso medido comercial, worker/cron novo, anuncio real, doacao, afiliado ou provider externo foi ativado.

Fechamento da Fase 14
- Commits tecnicos: `da54701`, `26516c8`, `2bb673d`, `f05dea4`.
- Quality Gates tecnicos: `28358191311`, `28359248342`, `28360245701`, `28360961942`.
- Deploy Dry Runs tecnicos: `28358191342`, `28359248307`, `28360245696`, `28360961952`.
- Commits documentais: `8f912d5`, `518cb1d`, `c3c5e17`, `722e9ac`; ultimo Quality Gate docs-only `28361154713`.
- Smokes publicos de Hub/control-plane/NetProbe passaram apos cada sprint tecnica, sem deploy real novo.
- Proximas fases devem manter AdSense, billing provider, checkout, webhooks reais, workers recorrentes pagos, alertas reais e monitores persistentes de MailHealth/SitePulse bloqueados ate os gates humanos/operacionais.

## Fase 15 - Provider and Monetization Go-Live

Status geral: concluida em 2026-06-29 em modo fail-closed. Como beneficiario/conta AdSense, Google access, KYC, impostos, banco, secrets, termos, doacoes e afiliados seguem pendentes de gate humano, a fase entregou somente readiness tecnico reversivel, sem ativacao de provider real.

Sprint 15.1 - AdSense account go-live readiness
- Simbolico: ADSENSE-ACCOUNT.
- Objetivo: preparar publisher id, `ads.txt` e revisao por site sem publicar arquivo publico, submeter sites ou ativar requests de anuncio.
- Escopo: helper `buildGoogleAdsTxtLine` em `@supersites/ads`, servico `AdSenseGoLiveReadiness`, endpoint autenticado `GET /api/v1/adsense/go-live-readiness`, resumo no dashboard, testes, ADR `0036`, runbook `ADSENSE_GO_LIVE_READINESS` e gate humano explicito para publicacao/submissao.
- Validacao: testes do pacote ads, `AdSenseGoLiveReadinessTest`, `php artisan test`, `composer validate --strict`, `test:packages`, `typecheck:packages`, `measure:admin-audit`, build de artifact do control-plane, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, Quality Gate/Deploy Dry Run e smokes publicos apos push.
- Status: concluida em main, sem deploy real. Passaram `pnpm test:packages` com 78 testes, `pnpm typecheck:packages`, `php artisan test` com 66 testes/635 assertions, `composer validate --strict`, admin audit `2026-06-29T09-22-22Z` em 9 paginas, artifact control-plane com 7146 arquivos/28264088 bytes/zip 8421145 bytes, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check` e `validate:adsense-safe-public` em 13 paginas. Feature commit `9f048f8`, Quality Gate `28362026582`, Deploy Dry Run `28362026601` e smokes publicos finais passaram. Nenhum `ads.txt` publico, publisher id real, snippet AdSense, Management API, site submission, Auto Ads/manual ads, request, impressao, clique, receita, doacao, afiliado, checkout, billing, secret real ou provider externo foi ativado.

Sprint 15.2 - Google providers go-live readiness
- Simbolico: GOOGLE-PROVIDERS.
- Objetivo: preparar GA4, GTM e Search Console com consentimento e sem PII, sem carregar tags, criar propriedades/containers, publicar verification tokens ou importar dados.
- Escopo: normalizadores de ID GA4/GTM em `@supersites/analytics`, servico `GoogleProviderGoLiveReadiness`, endpoint autenticado `GET /api/v1/google/go-live-readiness`, resumo no dashboard, testes, ADR `0037`, runbook `GOOGLE_PROVIDER_GO_LIVE_READINESS` e gate humano explicito para tags/imports.
- Validacao: testes do pacote analytics, `GoogleProviderGoLiveReadinessTest`, `php artisan test`, `composer validate --strict`, `test:packages`, `typecheck:packages`, `measure:admin-audit`, `measure:google-ready`, build de artifact do control-plane, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, Quality Gate/Deploy Dry Run e smokes publicos apos push.
- Status: concluida em main, sem deploy real. Passaram `pnpm test:packages` com 79 testes, `pnpm typecheck:packages`, `php artisan test` com 70 testes/670 assertions, `composer validate --strict`, `measure:google-ready` run `2026-06-29T09-37-06Z`, admin audit `2026-06-29T09-37-06Z` em 9 paginas, artifact control-plane com 7148 arquivos/28274065 bytes/zip 8423936 bytes, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check` e `validate:adsense-safe-public` em 13 paginas. Feature commit `ca89769`, Quality Gate `28362869383`, Deploy Dry Run `28362869390` e smokes publicos finais passaram. Nenhum snippet GA4/GTM, propriedade Google, container GTM, verification token Search Console, import Google, PageSpeed API, cookie externo, secret real ou provider externo foi ativado.

Sprint 15.3 - Billing providers go-live readiness
- Simbolico: BILLING-PROVIDERS.
- Objetivo: preparar Stripe, Mercado Pago e Paddle para revisao humana sem checkout, SDK, webhook live, secret real, cobranca ou revenue import.
- Escopo: normalizador de provider price reference em `@supersites/billing`, servico `BillingProviderGoLiveReadiness`, endpoint autenticado `GET /api/v1/billing/go-live-readiness`, resumo no dashboard, testes, ADR `0038`, runbook `BILLING_PROVIDER_GO_LIVE_READINESS` e gate humano explicito por provider/plano.
- Validacao: testes do pacote billing, `BillingProviderGoLiveReadinessTest`, `php artisan test`, `composer validate --strict`, `test:packages`, `typecheck:packages`, `measure:admin-audit`, build de artifact do control-plane, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, `validate:adsense-safe-public`, Quality Gate/Deploy Dry Run e smokes publicos apos push.
- Status: concluida em main, sem deploy real. Passaram `pnpm test:packages` com 80 testes, `pnpm typecheck:packages`, `php artisan test` com 74 testes/714 assertions, `composer validate --strict`, admin audit `2026-06-29T09-51-55Z` em 9 paginas, artifact control-plane com 7150 arquivos/28286453 bytes/zip 8426950 bytes, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check` e `validate:adsense-safe-public` em 13 paginas. Feature commit `12ae78b`, Quality Gate `28363695657`, Deploy Dry Run `28363695714` e smokes publicos finais passaram. Nenhum checkout, payment link, provider SDK, webhook live, assinatura, cobranca, invoice, refund, dunning, revenue import, secret real ou entitlement por pagamento foi ativado.

Sprint 15.4 - Donation and affiliate go-live readiness
- Simbolico: DONATION-AFFILIATE.
- Objetivo: preparar suporte/doacao e afiliados para revisao humana sem publicar links reais, QR/PIX, widgets, tracking, webhook ou pagamento.
- Escopo: helpers de canal/URL em `@supersites/ads`, tabela `support_monetization_channels`, seeder local, servico `SupportMonetizationGoLiveReadiness`, endpoint autenticado `GET /api/v1/monetization/support/go-live-readiness`, resumo no dashboard, testes, ADR `0039`, runbook `SUPPORT_MONETIZATION_GO_LIVE_READINESS` e gate humano explicito por canal.
- Validacao: testes do pacote ads, `SupportMonetizationGoLiveReadinessTest`, `php artisan test`, `composer validate --strict`, `test:packages`, `typecheck:packages`, `measure:admin-audit`, build de artifact do control-plane, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, `validate:adsense-safe-public`, Quality Gate/Deploy Dry Run e smokes publicos apos push.
- Status: concluida em main, sem deploy real. Passaram `pnpm --filter @supersites/ads test` com 13 testes, `SupportMonetizationGoLiveReadinessTest` com 4 testes/38 assertions, `pnpm test:packages` com 82 testes, `pnpm typecheck:packages`, `php artisan test` com 78 testes/752 assertions, `composer validate --strict`, admin audit `2026-06-29T10-08-11Z` em 9 paginas, artifact control-plane com 7155 arquivos/28302875 bytes/zip 8431872 bytes, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check` e `validate:adsense-safe-public` em 13 paginas. Feature commit `1a817df`, Quality Gate `28364679035`, Deploy Dry Run `28364679031` e smokes publicos finais passaram. Nenhum link publico de doacao, afiliado, widget de pagamento, QR/PIX, carteira, provider SDK, webhook, tracking de afiliado, secret ou pagamento real foi ativado.

Fase 15 - fechamento
- Status: concluida em main em 2026-06-29, sem deploy real e sem ativacao de provider externo. Commits tecnicos: `9f048f8`, `ca89769`, `12ae78b`, `1a817df`. Quality Gates tecnicos: `28362026582`, `28362869383`, `28363695657`, `28364679035`. Deploy Dry Runs tecnicos: `28362026601`, `28362869390`, `28363695714`, `28364679031`. Smokes publicos de Hub/control-plane/NetProbe e `validate:adsense-safe-public` passaram apos cada sprint tecnica.

## Fase 16 - Continuous Growth Loop

Status geral: concluida em main em 2026-06-29 em modo fail-closed. Como tokens, quotas, provider accounts, dados reais, workers e revisao de causalidade seguem pendentes de gate humano, a fase entregou contratos e readiness locais sem ativar imports, automacoes externas, scheduler de relatorio, e-mail externo ou causalidade.

Sprint 16.1 - Growth provider ingestion readiness
- Simbolico: GROWTH-INGEST.
- Objetivo: preparar ingestao futura de GA4, Search Console, AdSense e billing sem chamar providers, armazenar tokens, iniciar workers ou criar snapshots reais.
- Escopo: helper fail-closed em `@supersites/analytics`, tabela `growth_provider_ingestions`, seeder local com 48 registros, servico `GrowthIngestionReadiness`, endpoint autenticado `GET /api/v1/growth/ingestion-readiness`, resumo no dashboard, testes, ADR `0040`, runbook `GROWTH_PROVIDER_INGESTION_READINESS` e gate humano explicito para importacao real.
- Validacao: testes do pacote analytics, `GrowthIngestionReadinessTest`, `php artisan test`, `composer validate --strict`, `test:packages`, `typecheck:packages`, `measure:admin-audit`, build de artifact do control-plane, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, `validate:adsense-safe-public`, Quality Gate/Deploy Dry Run e smokes publicos apos push.
- Status: concluida em main, sem deploy real. Passaram `pnpm --filter @supersites/analytics test` com 12 testes, `GrowthIngestionReadinessTest` com 4 testes/30 assertions, `pnpm test:packages` com 84 testes, `pnpm typecheck:packages`, `php artisan test` com 82 testes/782 assertions, `composer validate --strict`, admin audit `2026-06-29T10-27-40Z` em 9 paginas, artifact control-plane com 7160 arquivos/28317875 bytes/zip 8436589 bytes, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check` e `validate:adsense-safe-public` em 13 paginas. Feature commit `2581eab`, Quality Gate `28365619891`, Deploy Dry Run `28365619897` e smokes publicos finais passaram. Nenhuma chamada provider, token, payload real, worker, cron, retry, snapshot real GA4/Search Console/AdSense/billing ou importacao externa foi ativada.

Sprint 16.2 - Growth priority readiness
- Simbolico: GROWTH-PRIORITIZE.
- Objetivo: preparar priorizacao por impacto/esforco/confianca/risco sem usar provider real, external AI, automacao ou causalidade inferida.
- Escopo: contrato `growthPriorityContractVersion` em `@supersites/ai-growth`, servico `GrowthPriorityReadiness`, endpoint autenticado `GET /api/v1/growth/priorities`, painel no dashboard, testes, ADR `0041`, runbook `GROWTH_PRIORITY_READINESS` e gate humano explicito para dados reais/causalidade/automacao.
- Validacao: testes do pacote ai-growth, `GrowthPriorityReadinessTest`, `php artisan test`, `composer validate --strict`, `test:packages`, `typecheck:packages`, `measure:admin-audit`, build de artifact do control-plane, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, `validate:adsense-safe-public`, Quality Gate/Deploy Dry Run e smokes publicos apos push.
- Status: concluida em main, sem deploy real. Passaram `pnpm --filter @supersites/ai-growth test` com 10 testes, `GrowthPriorityReadinessTest` com 4 testes/45 assertions, `pnpm test:packages` com 86 testes, `pnpm typecheck:packages`, `php artisan test` com 86 testes/827 assertions, `composer validate --strict`, admin audit `2026-06-29T10-44-59Z` em 9 paginas, artifact control-plane com 7162 arquivos/28330453 bytes/zip 8439510 bytes, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check` e `validate:adsense-safe-public` em 13 paginas. Feature commit `e969bac`, Quality Gate `28366584397`, Deploy Dry Run `28366584414` e smokes publicos finais passaram. Nenhuma importacao provider, external AI, prompt externo, worker, cron, branch/PR automatico, auto-merge, causalidade, alteracao SEO, anuncio, checkout, billing, doacao, afiliado ou publicacao automatica foi ativada.

Sprint 16.3 - Growth automation readiness
- Simbolico: GROWTH-AUTOMATION-SAFE.
- Objetivo: preparar uma fila autenticada de candidatos de baixo risco para revisao de PR sem criar branch, abrir PR, executar auto-merge ou publicar mudancas.
- Escopo: contrato `growthAutomationContractVersion` em `@supersites/ai-growth`, helper `resolveGrowthAutomationGate`, servico `GrowthAutomationReadiness`, endpoint autenticado `GET /api/v1/growth/automation-readiness`, painel no dashboard, testes, ADR `0042`, runbook `GROWTH_AUTOMATION_READINESS` e gate humano explicito para automacao real.
- Validacao: testes do pacote ai-growth, `GrowthAutomationReadinessTest`, `php artisan test`, `composer validate --strict`, `test:packages`, `typecheck:packages`, `measure:admin-audit`, build de artifact do control-plane, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, `validate:adsense-safe-public`, Quality Gate/Deploy Dry Run e smokes publicos apos push.
- Status: concluida em main, sem deploy real. Passaram `pnpm --filter @supersites/ai-growth test` com 12 testes, `GrowthAutomationReadinessTest` com 4 testes/68 assertions, `pnpm test:packages` com 88 testes, `pnpm typecheck:packages`, `php artisan test` com 90 testes/895 assertions, `composer validate --strict`, admin audit `2026-06-29T11-05-06Z` em 9 paginas, artifact control-plane com 7164 arquivos/28345258 bytes/zip 8442691 bytes, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check` e `validate:adsense-safe-public` em 13 paginas. Feature commit `6a48c31`, Quality Gate `28367680725`, Deploy Dry Run `28367680675` e smokes publicos finais passaram. Nenhum provider import, external AI, branch, PR, auto-merge, publish, SEO mutation, anuncio, checkout, billing, doacao, afiliado ou publicacao automatica foi ativado.

Sprint 16.4 - Growth reporting readiness
- Simbolico: GROWTH-REPORTING.
- Objetivo: preparar relatorios semanais/mensais do growth loop com antes/depois, status de dados e causalidade fail-closed, sem envio recorrente.
- Escopo: contrato `growthReportingContractVersion` em `@supersites/executive-reports`, helper `resolveGrowthReportingGate`, servico `GrowthReportingReadiness`, endpoint autenticado `GET /api/v1/growth/reporting-readiness`, painel no dashboard, testes, ADR `0043`, runbook `GROWTH_REPORTING_READINESS` e gate humano explicito para reports automaticos/dados reais/causalidade.
- Validacao: testes do pacote executive-reports, `GrowthReportingReadinessTest`, `AdminPanelTest`, `php artisan test`, `composer validate --strict`, `test:packages`, `typecheck:packages`, `measure:admin-audit`, build de artifact do control-plane, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, `validate:adsense-safe-public`, Quality Gate/Deploy Dry Run e smokes publicos apos push.
- Status: concluida em main, sem deploy real. Passaram `pnpm --filter @supersites/executive-reports test` com 10 testes, `GrowthReportingReadinessTest` com 4 testes/66 assertions, `AdminPanelTest` com 10 testes/105 assertions, `pnpm test:packages` com 90 testes, `pnpm typecheck:packages`, `php artisan test` com 94 testes/963 assertions, `composer validate --strict`, admin audit `2026-06-29T11-27-13Z` em 9 paginas, artifact control-plane com 7166 arquivos/28360526 bytes/zip 8446091 bytes, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check` e `validate:adsense-safe-public` em 13 paginas. Feature commit `ccf2c8d`, Quality Gate `28368838900`, Deploy Dry Run `28368838828` e smokes publicos finais passaram. Nenhum scheduled report, email externo, provider import, revenue reporting, causalidade, external AI, branch, PR, auto-merge, publish, anuncio, checkout, billing, doacao, afiliado ou publicacao automatica foi ativado.

Fase 16 - fechamento
- Status: concluida em main em 2026-06-29, sem deploy real e sem ativacao de provider/growth automation. Commits tecnicos: `2581eab`, `e969bac`, `6a48c31`, `ccf2c8d`. Quality Gates tecnicos: `28365619891`, `28366584397`, `28367680725`, `28368838900`. Deploy Dry Runs tecnicos: `28365619897`, `28366584414`, `28367680675`, `28368838828`. Smokes publicos de Hub/control-plane/NetProbe e `validate:adsense-safe-public` passaram apos cada sprint tecnica.

## Fase 17 - Governed Readiness Consolidation

Status geral: concluida em 2026-06-29, sem deploy real e sem ativacao de provider externo. Como o roadmap pos-benchmark mapeado terminava na Fase 16, a proxima fase tecnica reversivel consolidou os gates de provider/monetizacao/growth ja entregues antes de qualquer go-live real.

Sprint 17.1 - Provider/Growth readiness smoke
- Simbolico: OPS-PROVIDER-GROWTH-SMOKE.
- Objetivo: criar um smoke unico para validar que readiness de AdSense, Google providers, billing, suporte monetizado e growth loop continua fail-closed em conjunto.
- Escopo: `ProviderGrowthReadinessSmokeTest`, comando `pnpm ops:provider-growth-readiness-smoke`, artefatos locais em `artifacts/provider-growth-readiness/`, ADR `0044`, runbook `PROVIDER_GROWTH_READINESS_SMOKE` e atualizacao dos documentos operacionais.
- Validacao: teste focado, `php artisan test`, `composer validate --strict`, `test:packages`, `typecheck:packages`, `measure:admin-audit`, build de artifact do control-plane, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check`, `validate:adsense-safe-public`, Quality Gate/Deploy Dry Run e smokes publicos apos push.
- Status: concluida em main. Validacao local passou com smoke `2026-06-29T11-46-41Z` e smoke final `2026-06-29T11-52-48Z`, ambos com 1 teste/80 assertions; `php artisan test` passou com 95 testes/1043 assertions; `composer validate --strict`, `test:packages`, `typecheck:packages`, admin audit `2026-06-29T11-47-16Z`, artifact control-plane, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check` e `validate:adsense-safe-public` passaram. Feature commit `6d5d151`, Quality Gate `28369796751`, Deploy Dry Run `28369796640` e smokes publicos finais passaram. Nenhum provider externo, tag, anuncio, `ads.txt`, checkout, webhook real, doacao, afiliado, worker/cron, branch/PR automatico, report enviado, deploy real ou acao irreversivel foi ativado por esta fase.

Operacao pos-Fase 17 - Public Watchdog transient 500 hardening
- Objetivo: fechar o erro do `Public Watchdog` agendado `28372846327`, que falhou em `Public SuperSites smoke` com HTTP 500 unico, sem transformar o incidente em uma nova fase de produto.
- Escopo: endurecer `scripts/smoke-supersite-public.ps1` com retry limitado para falhas HTTP/transport transitorias e registrar a evidencia operacional em status/metricas/runbooks.
- Validacao: smokes publicos Hub/API, control-plane e NetProbe; `validate:adsense-safe-public`; crawler quick; `validate:structure`; `validate:secrets`; `deploy:dry-run`; `ci:changes`; `git diff --check`; Quality Gate; Deploy Dry Run; reteste manual do `Public Watchdog`.
- Status: concluida. Commit `91da6c1` passou Quality Gate `28379417007`, Deploy Dry Run `28379416758` e `Public Watchdog` manual `28379669654`/job `84078561656`; crawler quick `2026-06-29T14-23-06-325Z` registrou 95 rotas, 190 checks e 0 gaps. Nenhum deploy real, provider externo, anuncio, billing, checkout, worker/cron, DNS/root mapping ou acao irreversivel foi ativado.

## Fase 18 - Refinamento benchmark-driven pagina por pagina

Status geral: em andamento. A fase agora segue `docs/ROADMAP_FASE_18_REFINAMENTO_BENCHMARK_PAGE_BY_PAGE.md`, com inventario real, QA visual/crawler e correcao pagina por pagina ate remover linguagem interna da superficie publica e aproximar os fluxos dos benchmarks lideres.

Sprint 18.0/18.1 - Baseline e fundamentos publicos
- Simbolico: `PHASE18-BENCHMARK-FOUNDATION`.
- Escopo entregue: inventario documentado em `docs/ROUTE_INVENTORY_PHASE_18.md`; crawler quick baseline e pos-mudanca; Hub publico sem launch order/production evidence/monetization readiness na superficie principal; detalhes do Hub sem ordem de lancamento/URL temporaria; NetProbe What is my IP autoexecuta no carregamento; paginas diagnosticas priorizam ferramenta/resultado antes de metodologia; status/cookies/institucionais do Hub e NetProbe receberam copy publica menos operacional.
- Validacao: builds Hub/NetProbe, Vitest Hub/NetProbe, Playwright Hub/NetProbe, `validate:public-copy`, `validate:adsense-safe-public`, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes`, `git diff --check` e crawler quick `2026-06-29T20-08-13-569Z` passaram.
- Publicacao: commits `179b104` e `7777c6a`; Quality Gate final `28400509988` e Deploy Dry Run `28400510010` passaram; Hub publicado pelo run `28400789120` no release `7777c6a15caf3c724d3bee668f4cfc969dbc0971-28400789120-1`; NetProbe publicado pelo run `28401266330` no release `7777c6a15caf3c724d3bee668f4cfc969dbc0971-28401266330-1`; smokes publicos pos-deploy e checagem live do What is my IP passaram.
- Pendente para proximas sprints: crawler full sem timeout, Lighthouse/PageSpeed/GTmetrix quando disponivel, reforma page-by-page dos demais sites, QA multilíngue mais profundo, donation blocks sem link real, slots AdSense reservados por site, e arquitetura real de probes regionais antes de qualquer promessa worldwide no DNS Propagation.
- Escopo negativo: apenas releases reversiveis Hub/NetProbe HostGator foram publicados. Nenhum provider externo, anuncio real, `ads.txt`, checkout, billing, doacao, afiliado, worker/cron, DNS/root mapping, root redirect ou acao irreversivel foi ativado.

Sprint 18.2 - Hub principal benchmark-driven
- Simbolico: `PHASE18-HUB-DISCOVERY`.
- Escopo entregue: home publica do Hub com faixa localizada de 11 atalhos diretos para ferramentas gratuitas populares, rodape ampliado por clusters de vertical, JSON-LD orientado a ferramentas e bloco de suporte/doacao informativo sem link real.
- Validacao: Vitest Hub, Playwright Hub com checagem de overflow na home, build Hub, preview smoke Hub, artefato HostGator Hub, `validate:public-copy`, `validate:adsense-safe-public`, `test:packages`, `typecheck:packages`, `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes` e `git diff --check` passaram localmente.
- Status: concluida em producao. Commit `2719229`, Quality Gate `28414743413`, Deploy Dry Run `28414743406` e deploy reversivel do Hub `28414876705` passaram; release `2719229cf6e1e36c29f5f6f7bd4d153bfcbdb978-28414876705-1`, asset `C46NIGfN.js`, smokes publicos, AdSense-safe, crawler quick `2026-06-30T02-00-09-977Z` e checagem live desktop/mobile passaram.
- Escopo negativo: apenas release reversivel do Hub HostGator foi publicado. Nenhum provider externo, anuncio real, `ads.txt`, checkout, billing, doacao real, afiliado, worker/cron, DNS/root mapping, root redirect ou acao irreversivel foi ativado.

Sprint 18.2b - Correcao do aceite visual do Hub
- Simbolico: `PHASE18-HUB-BENCHMARK-CORRECTION`.
- Motivo: a revisao visual reprovou a Sprint 18.2 porque a home ainda parecia catalogo operacional/institucional. O erro de processo foi aceitar atalhos e rodape rico sem exigir que a primeira dobra fosse uma experiencia publica de uso pratico.
- Escopo entregue: home do Hub transformada em finder de ferramentas com busca, categorias, sinais publicos de confianca e 11 cards diretos de ferramenta antes do diretorio dos 10 sites; diretorio secundario sem badges de status/preview, contadores operacionais, free value, upgrade path, billing, ads ou rollout; copy e placeholder de ads sem linguagem interna.
- Gate permanente: `docs/PHASE18_BENCHMARK_GRADE_ACCEPTANCE.md` deve ser aplicado antes de qualquer sprint page-by-page. Sem screenshot desktop/mobile revisado, ferramenta/resultado/input acima da dobra, linguagem localizada e negative assertions contra termos internos, a pagina fica reprovada.
- Validacao local: Vitest Hub 13 testes, build Hub, preview smoke Hub, public-copy 951 HTMLs, Playwright Hub 7 testes com screenshots desktop EN/mobile PT-BR, structure, secrets, package typecheck/test, ci:changes, deploy dry-run, artifact HostGator Hub 211 arquivos/2808734 bytes e `git diff --check` passaram.
- Status: concluida em producao. Commit de implementacao `44f6eb1`, commit de smoke `aa8f3f8`, Quality Gate `28417419704`, Deploy Dry Run `28417419706` e deploy reversivel do Hub `28417561537` passaram; release `aa8f3f820f7b76f072ad923c552ca8f9cc345816-28417561537-1`, asset `DffgcYRx.js`, smokes publicos, AdSense-safe e crawler quick `2026-06-30T03-19-01-758Z` passaram.
- Incidente fechado: deploy `28416990131` falhou apenas por smoke obsoleto que ainda exigia o headline anterior `A curated operating network` apos a remocao intencional desse texto. A release ja havia sido apontada, o smoke foi atualizado para o novo finder benchmark-grade e o workflow seguinte ficou verde.
- Escopo negativo: nenhum provider externo, anuncio real, `ads.txt`, checkout, billing, doacao real, afiliado, worker/cron, DNS/root mapping, root redirect ou acao irreversivel foi ativado.

Sprint 18.2c - Correcao do rodape benchmark do Hub
- Simbolico: `PHASE18-HUB-FOOTER-CORRECTION`.
- Motivo: a revisao visual apontou que o rodape ainda parecia operacional e carregado de chips/botoes; o padrao benchmark esperado e menu textual em colunas com links profundos para ferramentas/subpaginas.
- Escopo entregue: `LegalFooter.vue` agora renderiza listas textuais com 38 deep links localizados para ferramentas dos 10 sites; `copy.ts` guarda grupos de links profundos por idioma; `app.vue` separa chips de conteudo do footer, aplica hover discreto e usa 6 colunas desktop, 3 em viewport intermediario e 1 no mobile.
- Gate permanente: rodapes publicos benchmark-grade nao devem voltar a usar botoes/chips para navegacao estrutural nem linkar apenas para paginas principais quando houver ferramentas publicas. Antes de fechar sprint, revisar screenshots desktop/mobile e garantir links profundos reais.
- Validacao local: Vitest Hub 14 testes, build Hub, Playwright Hub 7 testes, preview smoke Hub asset `/_nuxt/SLMjSLmn.js`, public-copy 951 HTMLs, AdSense-safe 13 paginas, structure, secrets, deploy dry-run, ci:changes, HostGator artifact Hub 211 arquivos/3280219 bytes, `git diff --check` e screenshots em `artifacts/footer-qa/` passaram.
- Status: concluida em producao. Commit `0abf5b6`, Quality Gate `28419197120`, Deploy Dry Run `28419197136` e deploy reversivel do Hub `28419357564` passaram; release `0abf5b6a27fc6e6864866e4d8f857df1b08699d3-28419357564-1`, asset `DxU4_SPz.js`, smokes publicos, AdSense-safe, crawler quick `2026-06-30T04-08-32-953Z` e screenshot live do rodape passaram.
- Escopo negativo: nenhum provider externo, anuncio real, `ads.txt`, checkout, billing, doacao real, afiliado, worker/cron, DNS/root mapping, root redirect ou acao irreversivel foi ativado.

Sprint 18.2d - Ajuste tipografico do rodape benchmark do Hub
- Simbolico: `PHASE18-HUB-FOOTER-TYPOGRAPHY`.
- Motivo: o rodape em colunas ja estava correto estruturalmente, mas a revisao visual apontou que a fonte dos menus e a descricao do SuperSites ainda estavam grandes/pesadas demais.
- Escopo entregue: `app.vue` reduziu descricao do bloco SuperSites, links de menu e titulos de coluna; links estruturais agora ficam leves em repouso, sem underline, e o hover ganha peso/escala discreta sem sublinhado.
- Gate permanente: rodapes benchmark-grade devem usar texto leve em repouso, hover com peso/escala sem underline, links profundos reais e screenshots desktop/mobile revisados antes do fechamento.
- Validacao local pre-commit: Vitest Hub 14 testes, build Hub, preview smoke Hub asset `/_nuxt/Pz7BRfek.js`, Playwright Hub 7 testes, public-copy 951 HTMLs, AdSense-safe 13 paginas, structure, secrets, deploy dry-run, ci:changes, package tests/typechecks, HostGator artifact Hub 211 arquivos/3286524 bytes, `git diff --check`, checagem computada de hover e screenshots em `artifacts/footer-qa/hub-footer-typography-*.png` passaram.
- Status: concluida em producao. Commit `f13cef7`, Quality Gate `28420829913`, Deploy Dry Run `28420829943` e deploy reversivel do Hub `28420973782` passaram; release `f13cef7ab668da1166ae1b7fafd86d54fdeaa6ed-28420973782-1`, asset `CvYAdSlM.js`, smokes publicos, AdSense-safe, crawler quick `2026-06-30T04-56-11-086Z`, screenshot live do rodape e checagem live de hover passaram.
- Escopo negativo: nenhum provider externo, anuncio real, `ads.txt`, checkout, billing, doacao real, afiliado, worker/cron, DNS/root mapping, root redirect ou acao irreversivel foi ativado.

Sprint 18.3 - Pagina de catalogo NetProbe Atlas
- Simbolico: `PHASE18-NETPROBE-CATALOG-LANDING`.
- Escopo entregue: `/supersites/en/sites/netprobe-atlas` passa a ser uma landing publica de rede/DNS/IP, com primeira dobra pratica, CTAs para IP e DNS propagation, painel de inicio rapido, 7 cards diretos de ferramentas e rodape contextual com DNS Tools, IP Tools, Domain Tools, SSL Tools e Guides.
- Gate permanente: paginas de catalogo do Hub nao podem parecer ficha interna de produto quando a sprint pede benchmark-grade. Elas devem funcionar como landing publica da familia de ferramentas, com links profundos para subpaginas reais e screenshots desktop/mobile revisados.
- Regra operacional registrada: `docs/RUNBOOKS/SPRINT_EXECUTION.md`, `docs/OPERATING_CONTEXT.md` e `docs/PHASE18_BENCHMARK_GRADE_ACCEPTANCE.md` agora reforcam o ciclo objetivo por sprint: implementar, validar, commit/push, monitorar deploy HostGator, smoke publico e proxima sprint.
- Validacao local pre-commit: Vitest Hub 15 testes, build Hub, preview smoke Hub asset `/_nuxt/58HZvkID.js`, Playwright Hub 8 testes, public-copy 951 HTMLs, AdSense-safe 13 paginas, structure, secrets, package tests/typechecks, deploy dry-run, ci:changes, HostGator artifact Hub 211 arquivos/3700277 bytes, `git diff --check` e screenshots em `artifacts/netprobe-catalog-qa/` passaram.
- Status: concluida em producao. Commit `36b11f5`, Quality Gate `28422393802`, Deploy Dry Run `28422393808` e deploy reversivel do Hub `28422499578` passaram; release `36b11f54ef984e6c6098da971cd5df3248cc1b0e-28422499578-1`, asset `BhQl-Uh-.js`, smokes publicos, AdSense-safe, crawler quick `2026-06-30T05-37-05-797Z` e screenshots live desktop/mobile da rota NetProbe passaram.
- Escopo negativo: nenhum provider externo, anuncio real, `ads.txt`, checkout, billing, doacao real, afiliado, worker/cron, DNS/root mapping, root redirect ou acao irreversivel foi ativado.

Sprint 18.4 - Pagina de catalogo CalcHarbor
- Simbolico: `PHASE18-CALCHARBOR-CATALOG-LANDING`.
- Escopo entregue localmente: `/supersites/en/sites/calcharbor` passa a ser uma landing publica de calculadoras, com busca, filtros por categoria, atalhos de alto valor para Loan Payment, Break-even Point, Gross Margin e ROI, cards densos para as 8 calculadoras existentes e topicos futuros sem links para evitar thin pages.
- Gate permanente: catalogos de site devem abrir com uso pratico, nao com ficha de produto. A rota canonica deve ter screenshots desktop/mobile, links profundos reais, negativas contra `Temporary public URL`, `Launch order`, `Quality check`, rollout, billing e ads, e smoke alinhado ao texto publico novo antes de commit/push/deploy.
- Validacao local pre-commit: Vitest Hub 16 testes, build Hub, preview smoke Hub asset `/_nuxt/RqTHRSb3.js`, Playwright Hub 10 testes, public-copy 951 HTMLs, AdSense-safe 13 paginas, structure, secrets, package tests/typechecks, deploy dry-run, ci:changes, HostGator artifact Hub 211 arquivos/4236462 bytes, `git diff --check` e screenshots em `artifacts/calcharbor-catalog-qa/` passaram.
- Status: concluida em producao. Commit `82be984`, Quality Gate `28424001584`, Deploy Dry Run `28424001574`, deploy reversivel do Hub `28424159062` e deploy reversivel do app CalcHarbor `28424625903` passaram; releases `82be98492a999dbc61d0adcc5a16d0ab9ae22928-28424159062-1` para `/supersites/` e `82be98492a999dbc61d0adcc5a16d0ab9ae22928-28424625903-1` para `/supersites/calcharbor/`, assets `tFB0kZwd.js` e `Da67e5s1.js`, smokes publicos, AdSense-safe, links das 8 calculadoras e crawler quick `2026-06-30T06-33-49-205Z` passaram.
- Escopo negativo: nenhum provider externo, anuncio real, `ads.txt`, checkout, billing, doacao real, afiliado, worker/cron, DNS/root mapping, root redirect ou acao irreversivel foi ativado.

Sprint 18.5 - Pagina de catalogo DevUtility Lab
- Simbolico: `PHASE18-DEVUTILITY-CATALOG-WORKBENCH`.
- Escopo entregue localmente: `/supersites/en/sites/devutility-lab` passa a ser uma landing publica de developer tools, com H1 pratico, CTA para JSON Formatter, busca, filtros por categoria, atalhos locais fixos, grid das 9 ferramentas reais e rodape contextual de links profundos.
- Gate permanente reforcado: quando o Hub/catalogo expuser links profundos para um app estatico, validar esses links em producao e publicar o app no mesmo ciclo se a release publica estiver antiga, com 404 ou 500.
- Validacao local pre-commit: Vitest Hub 17 testes, build Hub, preview smoke Hub asset `/_nuxt/BVxcZZ_m.js`, Playwright Hub 12 testes, public-copy 951 HTMLs, AdSense-safe 13 paginas, structure, secrets, package tests/typechecks, deploy dry-run, ci:changes, HostGator artifact Hub 211 arquivos/4765726 bytes, `git diff --check` e screenshots em `artifacts/devutility-catalog-qa/` passaram.
- Status: implementada localmente, aguardando commit, CI, deploy reversivel HostGator, smoke publico, validacao de links do app DevUtility e crawler quick.
- Escopo negativo: nenhum provider externo, anuncio real, `ads.txt`, checkout, billing, doacao real, afiliado, worker/cron, DNS/root mapping, root redirect ou acao irreversivel foi ativado.

## Definition of done do programa

- Catalogo SuperSites no ar.
- Control plane funcional.
- Dez sites listados e progressivamente publicados.
- NetProbe Atlas lancado primeiro.
- Multilingue completo nos idiomas iniciais.
- GA4/GTM/Search Console/AdSense integrados conforme aprovacoes.
- Billing e upgrades ativados nos sites com valor claro.
- Backups, rollback, monitoramento, alertas e runbooks ativos.
- Documentacao viva em `docs/`.
