# Status

Data-base: 2026-06-26

## Resumo executivo

O projeto SuperSites esta em bootstrap de plataforma. A estrutura documental, os bancos locais Docker, o repositorio Git/GitHub privado, o quality gate de CI, os primeiros esqueletos Nuxt/Laravel e o bootstrap HostGator inicial foram criados. Ainda nao ha deploy real de aplicacao; a producao transitoria possui apenas placeholders `noindex`.

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
- Primeiro commit publicado: `8677c29` (`chore: bootstrap supersites governance`).
- Primeiro GitHub Actions run monitorado: `Quality Gate` run `28218270387`, status `success`.
- Segundo GitHub Actions run monitorado: `Quality Gate` run `28218325563`, status `success`, com aviso de runtime do `actions/checkout@v4`; workflow atualizado para `actions/checkout@v7`.
- Terceiro GitHub Actions run monitorado: `Quality Gate` run `28218356836`, status `success`, apos atualizacao para `actions/checkout@v7`.
- Sprint 0.3 app stack commit publicado: `b0a74b9` (`feat: scaffold local app stack`).
- Sprint 0.3 primeiro run com app stack: `Quality Gate` run `28219339051`, status `failure`; causa: cache `pnpm` do `actions/setup-node` executou antes do Corepack disponibilizar o binario `pnpm`.
- Correcao de CI publicada: `aa2bf02` (`ci: enable pnpm after node setup`), removendo o cache prematuro de pnpm.
- Sprint 0.3 quality gate monitorado apos correcao: `Quality Gate` run `28219370170`, status `success`.
- Branch protection para `main` foi tentada em 2026-06-26, mas GitHub retornou HTTP 403 informando que private branch protection requer GitHub Pro ou repositorio publico. Ver `docs/HUMAN_ACTION_REQUIRED.md`.
- Node local detectado: `v24.16.0`.
- pnpm local via Corepack: `11.9.0`.
- PHP local detectado: `8.5.6`.
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
- VPS HostGator candidata localizada nos documentos do projeto `D:\Projetos\bigshop360` em 2026-06-26. Fontes: `docs/deploy_runbook.md`, `deploy/vps/README.md`, `docs/architecture_infrastructure.md` e `.github/workflows/deploy-vps.yml`.
- VPS candidata: HostGator `VPS OCI NVMe 4`, IP `129.121.37.220`, SSH `22022`, usuario operacional documentado `root` para deploy/base e usuario de processo `bigshop360` para a aplicacao de referencia.
- GitHub secrets do repo `helberfmelo/bigshop360` listados em modo leitura em 2026-06-26; ha secrets de SSH/VPS cadastrados, mas valores nao sao recuperaveis pelo GitHub CLI. Nenhum valor secreto foi copiado para documentacao versionada.
- SSH direto para `root@129.121.37.220:22022` em `BatchMode` falhou com `Permission denied` usando as chaves locais atuais; conectividade TCP da porta SSH esta ok.
- Tentativa de criar bancos locais via `scripts/create-local-databases.ps1`: `root` sem senha foi recusado. A senha local historica encontrada/confirmada nos projetos de referencia para `root` tambem foi recusada pela instancia Windows ativa `MySQL92` em 2026-06-26. Rerodar com a credencial atual do `MySQL92`, outro usuario local com permissao, ou iniciar MySQL via Docker na Sprint 0.3.
- Docker Desktop iniciado em 2026-06-26.
- Stack local SuperSites criada via `infra/docker/compose.local.yml`.
- Containers locais SuperSites saudaveis: `supersites-mysql`, `supersites-redis`, `supersites-mailpit`.
- Portas locais SuperSites: MySQL `3317`, Redis `6381`, Mailpit SMTP `1035`, Mailpit UI `8035`.
- Bancos locais SuperSites criados no MySQL Docker: 12/12.
- GitHub Actions bootstrap criado em `.github/workflows/quality-gate.yml` com varredura de segredos, validacao da estrutura obrigatoria, testes/build Nuxt e testes Laravel.
- Workspace Node criado com `pnpm@11.9.0`.
- Catalogo publico inicial criado em `apps/supersite` com Nuxt `4.4.8`, Vue `3.5.39` e TypeScript `6.0.3`.
- Control plane inicial criado em `apps/control-plane` com Laravel `13.x`, PHP `^8.3` e `predis/predis`.
- Health endpoint Laravel criado em `/health`, com modo app-only para CI/testes e modo de conexoes para smoke local contra Docker MySQL/Redis.
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
- Nenhuma alteracao remota foi executada nesta entrega.

## Estrutura local criada nesta entrega

- `apps/` com o hub, control plane e dez sites.
- `packages/` com pacotes compartilhados planejados.
- `infra/` com areas para Docker, ambientes, HostGator, cron, monitoring, backups e deploy.
- `docs/ADR`, `docs/RUNBOOKS`, `docs/SITES`, `docs/credentials`.
- `scripts/` para automacoes futuras sem segredos.
- `.github/workflows/quality-gate.yml` para validacao inicial do repositorio.
- `scripts/validate-structure.ps1` para proteger a estrutura minima do monorepo.
- `package.json`, `pnpm-workspace.yaml` e `pnpm-lock.yaml` para o workspace Node.
- `apps/supersite` com catalogo SSR inicial dos 10 sites planejados.
- `apps/control-plane` com Laravel, `.env.example`, migrations padrao e endpoint de saude.
- `scripts/validate-local-stack.ps1` para smoke local de Docker e control plane.
- ADR `0006-local-stack-scaffold.md` registrando a decisao de stack local.
- `scripts/hostgator-bootstrap.ps1` para provisionamento idempotente de pastas, bancos, usuarios, privilegios e placeholders na HostGator.

## Validacao desta entrega

- Secret scan: `scripts/validate-no-secrets.ps1` passou sem achados fora de `docs/credentials`.
- Structure scan: `scripts/validate-structure.ps1` passou.
- Contagem local: 12 pastas em `apps/`, 12 pastas em `packages/`, 30 arquivos Markdown em `docs/` incluindo o inventario local ignorado.
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

## Pendencias criticas

- Resolver branch protection de `main` quando houver GitHub Pro, repositorio publico ou alternativa aprovada de ruleset/organizacao.
- Definir se o mapeamento publico direto `https://opentshost.com/<site-folder>` sera feito por rewrite, alias, symlink controlado ou ajuste de document root.
- Definir/acessar o outro servidor HostGator VPS/VPN para Redis, filas, workers, Horizon e monitoramentos antes de lancar NetProbe/monitoramento pago.
- Antes de provisionar Redis/filas na VPS candidata, validar segregacao de processos, firewall e impacto sobre o BigShop360.
- Definir estrategia tecnica de URL raiz: `opentshost.com` apontando para conteudo em `/public_html/supersites/`.
- Definir dominios definitivos futuramente.
- Validar dominio/marca antes de registrar qualquer nome.

## Bloqueios humanos registrados

Ver `docs/HUMAN_ACTION_REQUIRED.md`.
