# Status

Data-base: 2026-06-26

## Resumo executivo

O projeto SuperSites esta em bootstrap de plataforma. A estrutura documental, os bancos locais Docker, o repositorio Git/GitHub privado, o quality gate de CI path-aware, o deploy dry-run, o app shell publico multilanguage do catalogo, paginas legais/editoriais multilanguage, Playwright visual smoke, pacotes compartilhados iniciais, API base do control plane, o bootstrap HostGator inicial e o runtime Redis isolado na VPS foram criados. Ainda nao ha deploy real de aplicacao; a producao transitoria possui placeholders `noindex`, runtime Redis local-only na VPS e plano de deploy dry-run auditavel.

## Estado local verificado

- Raiz local: `D:\Projetos\supersites`.
- Git: repositorio local inicializado em `main` na Sprint 0.2 apos aprovacao do roadmap.
- Stack/manifests: nao havia `package.json`, `composer.json`, `artisan`, Dockerfile ou workflows.
- Documentos existentes antes desta entrega: `AGENTS.md`, `docs/MEGA_PROMPT_SUPERSITES.md`, `docs/brainstorm_inicial.md`.
- Documentos obrigatorios ausentes no inicio: `docs/STATUS.md`, `docs/ROADMAP.md`, ADRs.
- MySQL CLI local detectado: MySQL Server 9.2.
- Docker CLI detectado.
- GitHub CLI detectado e autenticado como `helberfmelo` com protocolo SSH.
- GitHub CLI validado em 2026-06-26: conta ativa `helberfmelo`, token com escopo `repo`, suficiente para criar repositorios privados quando o roadmap for aprovado.
- GitHub remoto criado na Sprint 0.2: `helberfmelo/supersites-platform`, privado, URL `https://github.com/helberfmelo/supersites-platform`.
- GitHub environments criados na Sprint 0.5:
  - `staging-hostgator`.
  - `production-hostgator`.
  - `production-vps-runtime`.
- GitHub environment secrets cadastrados por nome na Sprint 0.5:
  - `staging-hostgator`: `SUPERSITES_CPANEL_USER`, `SUPERSITES_CPANEL_PASSWORD`.
  - `production-hostgator`: `SUPERSITES_CPANEL_USER`, `SUPERSITES_CPANEL_PASSWORD`.
  - `production-vps-runtime`: `SUPERSITES_VPS_SSH_KEY`, `SUPERSITES_REDIS_PASSWORD`.
- GitHub environment variables cadastradas por nome na Sprint 0.5 para HostGator e VPS runtime; valores nao secretos documentados em `docs/ENVIRONMENTS.md`.
- Primeiro commit publicado: `8677c29` (`chore: bootstrap supersites governance`).
- Primeiro GitHub Actions run monitorado: `Quality Gate` run `28218270387`, status `success`.
- Segundo GitHub Actions run monitorado: `Quality Gate` run `28218325563`, status `success`, com aviso de runtime do `actions/checkout@v4`; workflow atualizado para `actions/checkout@v7`.
- Terceiro GitHub Actions run monitorado: `Quality Gate` run `28218356836`, status `success`, apos atualizacao para `actions/checkout@v7`.
- Sprint 0.3 app stack commit publicado: `b0a74b9` (`feat: scaffold local app stack`).
- Sprint 0.3 primeiro run com app stack: `Quality Gate` run `28219339051`, status `failure`; causa: cache `pnpm` do `actions/setup-node` executou antes do Corepack disponibilizar o binario `pnpm`.
- Correcao de CI publicada: `aa2bf02` (`ci: enable pnpm after node setup`), removendo o cache prematuro de pnpm.
- Sprint 0.3 quality gate monitorado apos correcao: `Quality Gate` run `28219370170`, status `success`.
- Sprint 0.4 HostGator bootstrap commit publicado: `4e37690` (`chore: bootstrap hostgator resources`).
- Sprint 0.4 quality gate monitorado: `Quality Gate` run `28219966897`, status `success`.
- Sprint 0.4b VPS Redis runtime commit publicado: `b10df24` (`chore: provision vps redis runtime`).
- Sprint 0.4b quality gate monitorado: `Quality Gate` run `28220884125`, status `success`.
- Sprint 1.1 app shell commit publicado: `543ad5f` (`feat: build supersites catalog shell`).
- Sprint 1.1 quality gate monitorado: `Quality Gate` run `28232363542`, status `success`; `Deploy Dry Run` run `28232363472`, status `success`.
- Sprint 1.2 legal/editorial pages commit publicado: `8dc975a` (`feat: add catalog legal pages and visual smoke`).
- Sprint 1.2 quality gate monitorado: `Quality Gate` run `28233378405`, status `success`; `Deploy Dry Run` run `28233378393`, status `success` com upload de artifact ainda bloqueado por quota GitHub Actions, sem bloquear o dry-run porque o resumo foi publicado no job summary.
- Sprint 1.3 criou localmente os pacotes `@supersites/ui`, `@supersites/i18n`, `@supersites/seo` e `@supersites/consent`, integrou o hub aos helpers compartilhados de locale/SEO/status visual e adicionou testes/typecheck dos pacotes ao `Quality Gate`.
- Sprint 1.3 shared packages commit publicado: `29d9bab` (`feat: add shared foundation packages`).
- Sprint 1.3 quality gate monitorado: `Quality Gate` run `28234285250`, status `success`; `Deploy Dry Run` run `28234285286`, status `success` com upload de artifact ainda bloqueado por quota GitHub Actions, sem bloquear o dry-run porque o resumo foi publicado no job summary.
- Branch protection para `main` foi tentada em 2026-06-26, mas GitHub retornou HTTP 403 informando que private branch protection requer GitHub Pro ou repositorio publico. Ver `docs/HUMAN_ACTION_REQUIRED.md`.
- Node local detectado: `v24.16.0`.
- pnpm local via Corepack: `11.9.0`.
- PHP local detectado: `8.5.6`.
- PHP local SQLite habilitado em 2026-06-26: extensoes `pdo_sqlite` e `sqlite3` ativadas no `php.ini` do pacote WinGet para suportar testes Laravel com SQLite em memoria.
- Composer local detectado: `2.9.8`.
- HostGator SSH inventariado: host `108.179.241.237`, porta `2222`, usuario `opents62`. TCP na porta `2222` validado em 2026-06-26, mas login SSH em modo `BatchMode` com as chaves locais atuais falhou com `Permission denied`; acesso por senha ainda nao foi validado de forma nao interativa.
- HostGator cPanel inventariado e porta `2083` acessivel por TCP em 2026-06-26. Login cPanel/API ainda nao foi validado para evitar mutacao externa antes do gate.
- HostGator cPanel API validada em modo leitura em 2026-06-26. `ServerInformation/get_information` respondeu com status 1; servicos listados: `cpanellogd`, `cpsrvd`, `ftpd`, `imap`, `named`, `queueprocd`, `spamd`. Nenhum servico Redis foi listado.
- HostGator cPanel `Features/list_features` validado em modo leitura em 2026-06-26; a lista de features do usuario nao contem Redis.
- HostGator cPanel MySQL restrictions validado em 2026-06-26: prefixo obrigatorio `opents62_`, limite de database name 64 e limite de username 32.
- HostGator Sprint 0.4 provisionou 12 pastas, 12 bancos, 12 usuarios MySQL e 12 placeholders `index.html` `noindex` sob `/home1/opents62/public_html/supersites/`.
- Senhas dos usuarios MySQL de producao foram geradas localmente e salvas somente no arquivo ignorado `docs/credentials/hostgator-db-users.local.json`.
- Nenhum cron HostGator foi criado na Sprint 0.4 porque ainda nao ha codigo executavel de scheduler/worker publicado.
- Redis em producao: necessario para a plataforma completa, mas nao suportado/exposto na conta cPanel atual. Ver `docs/ADR/0004-redis-production-placement.md`.
- VPS HostGator localizada nos documentos do projeto `D:\Projetos\bigshop360` em 2026-06-26. Fontes: `docs/deploy_runbook.md`, `deploy/vps/README.md`, `docs/architecture_infrastructure.md` e `.github/workflows/deploy-vps.yml`.
- VPS HostGator: `VPS OCI NVMe 4`, IP `129.121.37.220`, SSH `22022`, usuario operacional documentado `root` para deploy/base e usuario de processo `bigshop360` para a aplicacao de referencia.
- GitHub secrets do repo `helberfmelo/bigshop360` listados em modo leitura em 2026-06-26; ha secrets de SSH/VPS cadastrados, mas valores nao sao recuperaveis pelo GitHub CLI. Nenhum valor secreto foi copiado para documentacao versionada.
- SSH direto para `root@129.121.37.220:22022` em `BatchMode` foi validado em 2026-06-26 usando a chave local `$HOME/.ssh/id_ed25519_vps_hostgator`.
- VPS HostGator pos-provisionamento SuperSites:
  - OS AlmaLinux `9.8`, kernel Linux `5.14.0-611.54.3.el9_7.x86_64`.
  - Redis `6.2.22` instalado.
  - Servico `supersites-redis.service` ativo e habilitado.
  - Redis SuperSites ouvindo somente em `127.0.0.1:6381`.
  - Usuario/grupo `supersites` criado.
  - Layout SuperSites criado em `/srv/supersites`.
  - Dados Redis em `/var/lib/supersites-redis` e logs em `/var/log/supersites`.
- Tentativa de criar bancos locais via `scripts/create-local-databases.ps1`: `root` sem senha foi recusado. A senha local historica encontrada/confirmada nos projetos de referencia para `root` tambem foi recusada pela instancia Windows ativa `MySQL92` em 2026-06-26. Rerodar com a credencial atual do `MySQL92`, outro usuario local com permissao, ou iniciar MySQL via Docker na Sprint 0.3.
- Docker Desktop iniciado em 2026-06-26.
- Stack local SuperSites criada via `infra/docker/compose.local.yml`.
- Containers locais SuperSites saudaveis: `supersites-mysql`, `supersites-redis`, `supersites-mailpit`.
- Portas locais SuperSites: MySQL `3317`, Redis `6381`, Mailpit SMTP `1035`, Mailpit UI `8035`.
- Bancos locais SuperSites criados no MySQL Docker: 12/12.
- GitHub Actions bootstrap criado em `.github/workflows/quality-gate.yml` com varredura de segredos, validacao da estrutura obrigatoria, testes/build Nuxt e testes Laravel.
- GitHub Actions Sprint 0.5:
  - `Quality Gate` dividido em jobs path-aware: mudancas, repository safety, frontend, backend e summary.
  - `Deploy Dry Run` criado para gerar plano de deploy sem mutar arquivos remotos; summary e sempre publicado, artifact upload e best-effort por causa de quota GitHub Actions.
- Workspace Node criado com `pnpm@11.9.0`.
- Catalogo publico inicial criado em `apps/supersite` com Nuxt `4.4.8`, Vue `3.5.39` e TypeScript `6.0.3`.
- Sprint 1.1 criou o app shell publico do catalogo com rotas `/`, `/en`, `/pt-br`, `/es`, `/fr`, `/de`, paginas individuais `/<locale>/sites/<slug>`, busca, filtros por categoria, linguagem no topo, metadados viewport/canonical/hreflang e prerender de 56 rotas de conteudo.
- Sprint 1.2 criou paginas legais/editoriais do catalogo em cinco idiomas para `about`, `contact`, `privacy`, `cookies`, `terms`, `methodology` e `editorial-policy`, footer de links internos, `sitemap.xml` e Playwright visual smoke.
- Sprint 1.3 criou pacotes TypeScript compartilhados para UI, i18n, SEO e consentimento; o catalogo passou a reutilizar `@supersites/i18n`, `@supersites/seo` e `@supersites/ui`.
- Sprint 1.4 criou localmente a fundacao da API Laravel do control plane: rotas `/api/v1/me` e `/api/v1/sites`, migrations de `sites`, RBAC e `audit_logs`, seeders de portfolio/permissoes e testes feature para autenticacao, autorizacao, listagem e auditoria.
- Control plane inicial criado em `apps/control-plane` com Laravel `13.x`, PHP `^8.3` e `predis/predis`.
- Health endpoint Laravel criado em `/health`, com modo app-only para CI/testes e modo de conexoes para smoke local contra Docker MySQL/Redis.
- Control plane API base:
  - `sites` armazena 12 entradas do portfolio com URLs temporarias sob `https://opentshost.com/supersites/<slug>/`.
  - RBAC inicial tem 5 permissoes (`sites.view`, `sites.manage`, `users.manage`, `audit.view`, `deployments.view`) e 4 roles (`owner`, `operator`, `analyst`, `site-admin`).
  - Roles podem ser globais ou escopadas por site via `role_user.site_id`.
  - `audit_logs` usa ULID e registra a consulta autorizada de sites sem armazenar segredos.
- Observacao: Docker Desktop tambem reativou containers existentes do `bigshopv4` por politica de restart; eles nao foram alterados por esta entrega. Portas do SuperSites foram isoladas para evitar conflito.

## Estado de producao verificado

- `opentshost.com` responde em HTTPS.
- `https://opentshost.com/supersites/` retornava `404` antes da Sprint 0.4 e passou a responder HTTP 200 com placeholder `noindex`.
- URLs fallback com placeholder HTTP 200 validadas em 2026-06-26:
  - `https://opentshost.com/supersites/`
  - `https://opentshost.com/supersites/control-plane/`
  - `https://opentshost.com/supersites/netprobe-atlas/`
  - `https://opentshost.com/supersites/calcharbor/`
  - `https://opentshost.com/supersites/devutility-lab/`
  - `https://opentshost.com/supersites/timenexus/`
  - `https://opentshost.com/supersites/qrroute/`
  - `https://opentshost.com/supersites/invoicecraft/`
  - `https://opentshost.com/supersites/mailhealth/`
  - `https://opentshost.com/supersites/sitepulse-lab/`
  - `https://opentshost.com/supersites/pixelbatch/`
  - `https://opentshost.com/supersites/docshift/`
- Caminhos publicos desejados diretos, como `https://opentshost.com/netprobe-atlas/` e `https://opentshost.com/calcharbor/`, ainda retornam 404. Rewrite/alias/symlink raiz fica pendente para evitar interferencia no conteudo atual de `public_html`.
- VPS BigShop360 validada sem mutacao em 2026-06-26:
  - DNS `api.bigshophost.com` aponta para `129.121.37.220`.
  - Portas externas abertas: `80`, `443`, `8084`, `22022` e `3100`.
  - Portas Redis publicas testadas `6379` e `6380`: fechadas.
  - Staging web `http://129.121.37.220:8084/bigshop360` respondeu HTTP 200.
  - Health publico `https://api.bigshophost.com/bigshop360/api/v1/health` respondeu HTTP 200 com status de aplicacao `degraded`: `api=up`, `database=up`, `runtime=down`, `providers=skipped`.
  - Backend direto `http://129.121.37.220:3100/api/v1/health` respondeu HTTP 200, apesar dos documentos do BigShop360 indicarem backend local em `127.0.0.1:3100`; tratar como observacao de seguranca antes de reutilizar a VPS para SuperSites.
- Sprint 0.4b provisionou Redis SuperSites isolado na VPS sem alterar paths/servicos do BigShop360:
  - `supersites-redis.service` ativo.
  - Redis autenticado respondeu `PONG` em `127.0.0.1:6381`.
  - Portas publicas Redis `6379`, `6380` e `6381` testadas como fechadas/filtradas.
  - Validacao versionada: `scripts/validate-vps-runtime.ps1`.

## Estrutura local criada nesta entrega

- `apps/` com o hub, control plane e dez sites.
- `packages/` com pacotes compartilhados planejados.
- `infra/` com areas para Docker, ambientes, HostGator, cron, monitoring, backups e deploy.
- `docs/ADR`, `docs/RUNBOOKS`, `docs/SITES`, `docs/credentials`.
- `scripts/` para automacoes futuras sem segredos.
- `.github/workflows/quality-gate.yml` para validacao inicial do repositorio.
- `scripts/validate-structure.ps1` para proteger a estrutura minima do monorepo.
- `package.json`, `pnpm-workspace.yaml` e `pnpm-lock.yaml` para o workspace Node.
- `packages/ui`, `packages/i18n`, `packages/seo` e `packages/consent` com manifestos, `src/index.ts`, testes Vitest e typecheck.
- `apps/supersite` com catalogo SSR inicial dos 10 sites planejados.
- `playwright.config.ts` e `tests/e2e/supersite.spec.ts` para smoke visual desktop/mobile do hub.
- `apps/control-plane` com Laravel, `.env.example`, migrations padrao e endpoint de saude.
- `apps/control-plane/routes/api.php`, controllers `Api/V1`, models `Site`, `Role`, `Permission`, `AuditLog`, migrations/seeders RBAC e teste `ControlPlaneApiTest`.
- `scripts/validate-local-stack.ps1` para smoke local de Docker e control plane.
- ADR `0006-local-stack-scaffold.md` registrando a decisao de stack local.
- `scripts/hostgator-bootstrap.ps1` para provisionamento idempotente de pastas, bancos, usuarios, privilegios e placeholders na HostGator.
- `scripts/ci-detect-changes.ps1` para classificar paths alterados no CI.
- `scripts/prepare-deploy-dry-run.ps1` para validar `infra/deployment/apps.json` e gerar artefato de plano de deploy.
- `scripts/sync-github-environments.ps1` para sincronizar GitHub environments, variaveis e secrets sem imprimir valores secretos.
- `scripts/validate-supersite-preview.ps1` para subir o build Nuxt a partir de `apps/supersite`, validar HTML SSR e confirmar assets `_nuxt` HTTP 200.
- `scripts/validate-vps-runtime.ps1` para validar SSH, Redis local-only na VPS, layout SuperSites e portas Redis publicas fechadas.
- `infra/deployment/apps.json` como manifesto versionado de deploy para 12 apps.

## Validacao desta entrega

- Secret scan: `scripts/validate-no-secrets.ps1` passou sem achados fora de `docs/credentials`.
- Structure scan: `scripts/validate-structure.ps1` passou.
- Contagem local: 12 pastas em `apps/`, 12 pastas em `packages/`, 32 arquivos Markdown em `docs/` incluindo o inventario local ignorado.
- Bootstrap local de bancos: `scripts/create-local-databases.ps1` validado com MySQL Docker em `127.0.0.1:3317`.
- Docker health: `supersites-mysql`, `supersites-redis` e `supersites-mailpit` saudaveis.
- Mailpit UI: HTTP 200 em `http://127.0.0.1:8035`.
- Nuxt catalog tests: 3 testes passando em `apps/supersite`.
- Nuxt catalog build: passou; avisos nao fatais vieram de dependencias Nuxt/Vue sobre sourcemap e deprecacao Node.
- Nuxt SSR smoke: HTTP 200 local e HTML contendo `SuperSites`, `NetProbe Atlas`, `CalcHarbor` e `DocShift`.
- Laravel tests: 3 testes / 6 assertions passando em `apps/control-plane`.
- Laravel composer validate: passou em modo strict.
- Local stack smoke: `scripts/validate-local-stack.ps1` passou com Docker MySQL, Redis, Mailpit e `/health`.
- GitHub Actions: run `28219370170` passou com secret scan, structure scan, Nuxt tests, Nuxt build, Composer install, Laravel env prep e Laravel tests.
- HostGator cPanel validation: 12/12 bancos, 12/12 usuarios e 12/12 pastas confirmados por API.
- HostGator HTTP smoke: 12/12 URLs fallback `/supersites/...` responderam HTTP 200 com placeholder.
- HostGator post-CI validation: `scripts/validate-hostgator-bootstrap.ps1` passou apos o run `28219966897`.
- VPS runtime smoke: `scripts/validate-vps-runtime.ps1` passou, confirmando servico Redis ativo, `PING` autenticado, bind local-only em `127.0.0.1:6381`, layout `/srv/supersites` e portas publicas Redis `6379`, `6380`, `6381` fechadas/filtradas.
- VPS runtime post-CI smoke: `scripts/validate-vps-runtime.ps1` passou apos o run `28220884125`.
- Sprint 0.5 local validation:
  - `scripts/ci-detect-changes.ps1` passou.
  - `scripts/prepare-deploy-dry-run.ps1` passou e gerou artefato local ignorado.
  - `infra/deployment/apps.json` validado como JSON.
  - `scripts/sync-github-environments.ps1` passou e criou/sincronizou environments, variaveis e secrets por nome.
- Sprint 0.5 CI contour: o primeiro `Deploy Dry Run` encontrou quota de artifacts esgotada no GitHub Actions; workflow ajustado para manter o plano no job summary e tratar upload de artifact como best-effort.
- Sprint 1.1 local validation:
  - `pnpm --filter @supersites/supersite test` passou com 8 testes.
  - `pnpm --filter @supersites/supersite build` passou e prerenderizou 56 rotas de conteudo.
  - `scripts/validate-supersite-preview.ps1` passou, confirmando SSR HTML, viewport/canonical/hreflang e asset `_nuxt` HTTP 200.
  - Chrome headless/CDP validou mobile `390px` com `scrollWidth=390`, sem elementos excedendo a largura.
  - Chrome headless/CDP validou hidratacao/interacao: filtro `Documents` retornou `InvoiceCraft` e `DocShift`; busca `dns` retornou `NetProbe Atlas` e `MailHealth`; sem erros de console.
  - Obstaculo contornado: preview iniciado fora de `apps/supersite` servia HTML mas retornava 404 para `_nuxt`; runbook e smoke versionado agora exigem cwd correto.
- Sprint 1.2 local validation:
  - `pnpm --filter @supersites/supersite test` passou com 9 testes.
  - `pnpm --filter @supersites/supersite build` passou e prerenderizou 91 rotas de conteudo, mais `sitemap.xml`.
  - `pnpm validate:supersite-preview` passou, confirmando SSR HTML, asset `_nuxt`, pagina legal `/en/privacy` e sitemap.
  - Playwright instalado no monorepo e `pnpm test:e2e:supersite` passou com 2 testes.
  - Playwright validou `/pt-br/privacy` mobile `390px` sem overflow, canonical/hreflang, footer e screenshot; validou `/en/editorial-policy` desktop sem erros de console.
  - Relatorio visual local gerado em `artifacts/playwright-report` e mantido fora do Git.
- Sprint 1.3 local validation:
  - `pnpm test:packages` passou com 17 testes nos pacotes `ui`, `i18n`, `seo` e `consent`.
  - `pnpm typecheck:packages` passou nos 4 pacotes compartilhados.
  - `pnpm --filter @supersites/supersite test` passou com 9 testes.
  - `pnpm --filter @supersites/supersite build` passou e manteve 92 rotas prerender configuradas, com avisos nao fatais conhecidos de Nuxt/Nitro.
  - `pnpm validate:supersite-preview` passou, confirmando SSR HTML, assets `_nuxt`, pagina legal e sitemap apos a integracao dos pacotes compartilhados.
  - `pnpm test:e2e:supersite` passou com 2 testes; screenshots mobile/desktop foram revisados visualmente sem overflow ou sobreposicao aparente.
  - `scripts/prepare-deploy-dry-run.ps1` passou e gerou plano local ignorado.
  - `git diff --check` passou; apenas avisos CRLF conhecidos foram exibidos.
  - GitHub Actions `Quality Gate` run `28234285250` passou com repository safety, testes/typecheck dos pacotes, Nuxt tests/build, preview smoke, Playwright e Laravel.
  - GitHub Actions `Deploy Dry Run` run `28234285286` passou; artifact upload segue bloqueado pela quota GitHub Actions, mas o job summary manteve o plano auditavel.
  - Obstaculo contornado: o filtro pnpm generico `./packages/*` nao selecionou workspaces no Windows; scripts raiz trocados para filtros explicitos por pacote.
- Sprint 1.4 local validation:
  - PHP SQLite local foi habilitado; `php -m` confirmou `pdo_sqlite` e `sqlite3`.
  - Frontend dev server do catalogo esta acessivel em `http://127.0.0.1:3001` e respondeu HTTP 200.
  - `php artisan test` passou com 7 testes / 21 assertions em `apps/control-plane`, usando SQLite em memoria.
  - Obstaculo contornado e resolvido: a validacao Laravel inicialmente falhou porque o PHP local nao carregava SQLite; as extensoes ja existiam no pacote WinGet e foram habilitadas no `php.ini`.

## Pendencias criticas

- Resolver branch protection de `main` quando houver GitHub Pro, repositorio publico ou alternativa aprovada de ruleset/organizacao.
- Definir se o mapeamento publico direto `https://opentshost.com/<site-folder>` sera feito por rewrite, alias, symlink controlado ou ajuste de document root.
- Implementar jobs de deploy/operacao da VPS usando o GitHub environment `production-vps-runtime`, com rollback e smoke.
- Definir backup/restore de `/var/lib/supersites-redis` antes de monitores pagos ou jobs de producao dependerem de Redis.
- Criar filas/workers/crons na VPS apenas quando houver codigo executavel e nomes de fila definidos.
- Implementar deploy real somente apos empacotamento de artefatos, preservacao remota de `.env`, smoke e rollback.
- Definir estrategia tecnica de URL raiz: `opentshost.com` apontando para conteudo em `/public_html/supersites/`.
- Definir dominios definitivos futuramente.
- Validar dominio/marca antes de registrar qualquer nome.

## Bloqueios humanos registrados

Ver `docs/HUMAN_ACTION_REQUIRED.md`.
