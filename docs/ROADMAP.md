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
- Status: planejada.

Sprint 8.4 - Publicar batch B de workflow/diagnostico
- Simbolico: PROD-BATCH-B.
- Objetivo: publicar QRRoute, InvoiceCraft, MailHealth e SitePulse Lab em `/supersites/<app>/` usando releases versionados HostGator.
- Validacao: workflow de deploy real, smoke publico por app, endpoints publicos seguros quando aplicavel e rollback testavel.
- Status: planejada.

Sprint 8.5 - Publicar batch C de arquivos
- Simbolico: PROD-BATCH-C.
- Objetivo: publicar PixelBatch e DocShift em `/supersites/<app>/` usando releases versionados HostGator.
- Validacao: workflow de deploy real, smoke publico por app, assets `_nuxt`, ausencia de upload server-side/storage e rollback testavel.
- Status: planejada.

Sprint 8.6 - Public rollout closure e operacao minima
- Simbolico: PROD-CLOSURE.
- Objetivo: fechar registros de producao, atualizar smokes publicos consolidados, revisar placeholders remanescentes, manter direct-root mapping e monetizacao como gates separados.
- Validacao: smokes publicos de Hub, control-plane/API, NetProbe e nove apps publicados; docs/status/metricas atualizados; Quality Gate docs-only monitorado.
- Status: planejada.

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
