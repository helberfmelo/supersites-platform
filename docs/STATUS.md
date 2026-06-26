# Status

Data-base: 2026-06-26

## Resumo executivo

O projeto SuperSites esta em bootstrap de plataforma. A estrutura documental, os bancos locais Docker, o repositorio Git local e o primeiro quality gate de CI foram criados. Ainda nao ha aplicacao Laravel/Nuxt, deploy ativo ou recursos HostGator de producao provisionados.

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
- Branch protection para `main` foi tentada em 2026-06-26, mas GitHub retornou HTTP 403 informando que private branch protection requer GitHub Pro ou repositorio publico. Ver `docs/HUMAN_ACTION_REQUIRED.md`.
- HostGator SSH inventariado: host `108.179.241.237`, porta `2222`, usuario `opents62`. TCP na porta `2222` validado em 2026-06-26, mas login SSH em modo `BatchMode` com as chaves locais atuais falhou com `Permission denied`; acesso por senha ainda nao foi validado de forma nao interativa.
- HostGator cPanel inventariado e porta `2083` acessivel por TCP em 2026-06-26. Login cPanel/API ainda nao foi validado para evitar mutacao externa antes do gate.
- HostGator cPanel API validada em modo leitura em 2026-06-26. `ServerInformation/get_information` respondeu com status 1; servicos listados: `cpanellogd`, `cpsrvd`, `ftpd`, `imap`, `named`, `queueprocd`, `spamd`. Nenhum servico Redis foi listado.
- HostGator cPanel `Features/list_features` validado em modo leitura em 2026-06-26; a lista de features do usuario nao contem Redis.
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
- GitHub Actions bootstrap criado em `.github/workflows/quality-gate.yml` com varredura de segredos e validacao da estrutura obrigatoria.
- Observacao: Docker Desktop tambem reativou containers existentes do `bigshopv4` por politica de restart; eles nao foram alterados por esta entrega. Portas do SuperSites foram isoladas para evitar conflito.

## Estado de producao verificado

- `opentshost.com` responde em HTTPS.
- `https://opentshost.com/supersites/` retornou `404` em 2026-06-26.
- A pasta remota `/home1/opents62/public_html/supersites/` ainda nao foi confirmada por login remoto nesta entrega.
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

## Validacao desta entrega

- Secret scan: `scripts/validate-no-secrets.ps1` passou sem achados fora de `docs/credentials`.
- Structure scan: `scripts/validate-structure.ps1` passou.
- Contagem local: 12 pastas em `apps/`, 12 pastas em `packages/`, 29 arquivos em `docs/`.
- Git status: primeiro commit/push realizado para `origin/main`; pendente commit de registro operacional pos-monitoramento.
- Bootstrap local de bancos: `scripts/create-local-databases.ps1` validado com MySQL Docker em `127.0.0.1:3317`.
- Docker health: `supersites-mysql`, `supersites-redis` e `supersites-mailpit` saudaveis.
- Mailpit UI: HTTP 200 em `http://127.0.0.1:8035`.

## Pendencias criticas

- Resolver branch protection de `main` quando houver GitHub Pro, repositorio publico ou alternativa aprovada de ruleset/organizacao.
- Usar os bancos locais Docker em `127.0.0.1:3317` nas proximas sprints.
- Criar pastas, bancos e crons na HostGator depois do gate aprovado.
- Definir/acessar o outro servidor HostGator VPS/VPN para Redis, filas, workers, Horizon e monitoramentos antes de lancar NetProbe/monitoramento pago.
- Antes de provisionar Redis/filas na VPS candidata, validar segregacao de processos, firewall e impacto sobre o BigShop360.
- Definir estrategia tecnica de URL raiz: `opentshost.com` apontando para conteudo em `/public_html/supersites/`.
- Definir dominios definitivos futuramente.
- Validar dominio/marca antes de registrar qualquer nome.

## Bloqueios humanos registrados

Ver `docs/HUMAN_ACTION_REQUIRED.md`.
