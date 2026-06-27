# Operating Context

Fonte da verdade operacional complementar ao `MEGA_PROMPT_SUPERSITES.md`.

## Diretrizes recebidas em 2026-06-26

- Dominio transitorio do catalogo: `opentshost.com`.
- Hospedagem atual: HostGator/cPanel da conta `opents62`.
- URL de cPanel: registrada apenas no inventario local de credenciais.
- Pasta principal remota desejada: `/home1/opents62/public_html/supersites/`.
- URL publica desejada do catalogo: `https://opentshost.com/`.
- Enquanto os dominios definitivos nao forem definidos, cada site deve ser publicado em subpasta do dominio transitorio.
- Folders remotos de site devem ficar sob `/home1/opents62/public_html/supersites/`.
- O mapeamento publico desejado para cada site e `https://opentshost.com/<pasta_do_site>`.
- Risco tecnico a validar: em HostGator, a raiz publica do dominio principal costuma ser `/home1/opents62/public_html`; para servir arquivos fisicos em `/public_html/supersites/` pela raiz do dominio, sera necessario rewrite, alias, symlink controlado ou ajuste de document root se disponivel.
- Nenhuma credencial deve ser versionada.
- Credenciais uteis recebidas por chat ou encontradas em documentos devem ficar no inventario local ignorado pelo Git.
- Nao alterar projetos de referencia localmente ou em producao.

## Projetos de referencia auditados em modo leitura

- `D:\Projetos\lumora`
- `D:\Projetos\legalchurch`
- `D:\Projetos\provadorvirtual_v2`
- `D:\Projetos\bigshop`
- `D:\Projetos\bigshopv4`
- `D:\Projetos\marcahora_novo`
- `D:\Projetos\bigshop360`

Padroes aproveitados:

- Sprint sempre inicia com leitura obrigatoria, status real e plano de validacao.
- Secrets reais ficam em arquivo local ignorado, GitHub Secrets, cPanel seguro ou cofre.
- Deploy em HostGator exige cuidado com subdiretorio, `APP_URL`, `ASSET_URL`, base path e migrations.
- Publicacao por FTP/SSH deve preservar `.env`, evitar wipe remoto total e executar smoke pos-deploy.
- Commits pequenos, push e monitoramento de deploy sao obrigatorios quando uma sprint for aprovada para execucao.
- Obstaculos tecnicos reversiveis devem ser contornados com dry-run, fallback, validacao ou modo degradado e a sprint deve continuar.
- Obstaculos humanos, juridicos, fiscais, bancarios, compra, KYC, PIN ou acoes irreversiveis devem ser registrados em `HUMAN_ACTION_REQUIRED` e o restante deve continuar.

## CI/CD SuperSites

- `Quality Gate` e path-aware a partir da Sprint 0.5.
- `Deploy Dry Run` gera plano auditavel e nao muta producao.
- Manifesto de deploy: `infra/deployment/apps.json`.
- GitHub environments existentes: `staging-hostgator`, `production-hostgator`, `production-vps-runtime`.
- Deploy real do catalogo transitorio esta implementado a partir da Sprint 1.7 pelo workflow manual `Deploy SuperSite HostGator`.
- Deploy publico do control-plane/API esta implementado como workflow manual `Deploy Control Plane HostGator` e esta ativo em `https://opentshost.com/supersites/control-plane/`.
- Deploy publico do NetProbe Atlas esta implementado como workflow manual `Deploy NetProbe HostGator` e esta ativo em `https://opentshost.com/supersites/netprobe-atlas/`.
- CalcHarbor tem app Nuxt SSG e manifest de deploy a partir da Sprint 3.1, mas a URL publica `https://opentshost.com/supersites/calcharbor/` permanece placeholder ate existir workflow/script de deploy, smoke publico e rollback especificos.
- DevUtility Lab tem app Nuxt SSG, Quality Gate dedicado e manifest de deploy a partir da Sprint 3.2, mas a URL publica `https://opentshost.com/supersites/devutility-lab/` permanece placeholder ate existir workflow/script de deploy, smoke publico e rollback especificos.
- TimeNexus tem app Nuxt SSG, Quality Gate dedicado e manifest de deploy a partir da Sprint 3.3, mas a URL publica `https://opentshost.com/supersites/timenexus/` permanece placeholder ate existir workflow/script de deploy, smoke publico e rollback especificos.
- QRRoute tem app Nuxt SSG, Quality Gate dedicado e manifest de deploy a partir da Sprint 4.1, mas a URL publica `https://opentshost.com/supersites/qrroute/` permanece placeholder ate existir workflow/script de deploy, smoke publico e rollback especificos.
- InvoiceCraft tem app Nuxt SSG, Quality Gate dedicado e manifest de deploy a partir da Sprint 4.2, mas a URL publica `https://opentshost.com/supersites/invoicecraft/` permanece placeholder ate existir workflow/script de deploy, smoke publico e rollback especificos.
- MailHealth tem app Nuxt SSG, Quality Gate dedicado e manifest de deploy a partir da Sprint 4.3, mas a URL publica `https://opentshost.com/supersites/mailhealth/` permanece placeholder ate existir workflow/script de deploy, smoke publico e rollback especificos.
- SitePulse Lab tem app Nuxt SSG, Quality Gate dedicado e manifest de deploy a partir da Sprint 4.4, mas a URL publica `https://opentshost.com/supersites/sitepulse-lab/` permanece placeholder ate existir workflow/script de deploy, smoke publico e rollback especificos.
- PixelBatch tem app Nuxt SSG, Quality Gate dedicado e manifest de deploy a partir da Sprint 5.1, mas a URL publica `https://opentshost.com/supersites/pixelbatch/` permanece placeholder ate existir workflow/script de deploy, smoke publico e rollback especificos.
- Catalogo transitorio publico ativo: `https://opentshost.com/supersites/`.
- Release HostGator ativo do catalogo: `740e0f1968e7b0a2fd60eeb9e6edffd6252d94ae-28241237377-1`.
- Release HostGator ativo do control-plane/API: `a33fcbfdc31c328d71c6fa046d9fac99ec610575-28264453068-1`.
- Release HostGator ativo do NetProbe Atlas: `decfaa818545203597e74b898741f6114315a624-28265295302-1`.
- O deploy do catalogo sobe arquivos para `_supersites-releases/<release-id>/`, preserva `.env`, placeholders e pastas remotas gerenciadas fora do release, e troca somente o `.htaccess` gerenciado em `/supersites/`.
- O deploy do control-plane/API exige handler cPanel `ea-php84___lsphp`; o front controller gerenciado faz bootstrap direto do Laravel no release ativo.
- As entradas `skip_smoke` e `enable_diagnostics` do workflow de control-plane existem apenas para diagnostico controlado, nao para deploy normal.
- Rollback testavel: acao manual `rollback-release` do workflow `Deploy SuperSite HostGator`; run `28241763726` validou switch para o release ativo e smoke publico.
- Redirect da raiz `https://opentshost.com/` permanece desabilitado por padrao; habilitar somente com revisao explicita de `.htaccess` raiz.
- A partir da Sprint 1.1, o `Quality Gate` valida o build Nuxt com `scripts/validate-supersite-preview.ps1`; o preview do catalogo deve rodar a partir de `apps/supersite` para servir `_nuxt` assets e permitir hidratacao.
- A partir da Sprint 1.2, o `Quality Gate` tambem executa Playwright (`pnpm test:e2e:supersite`) para smoke visual desktop/mobile do hub. Relatorios locais ficam em `artifacts/playwright-report` e nao devem ser versionados.
- A partir da Sprint 1.3, o `Quality Gate` executa `pnpm test:packages` e `pnpm typecheck:packages` para `@supersites/ui`, `@supersites/i18n`, `@supersites/seo` e `@supersites/consent` antes dos testes/build Nuxt.
- Contorno Sprint 1.3: o filtro pnpm generico `./packages/*` nao selecionou workspaces no Windows; os scripts raiz usam filtros explicitos por nome de pacote.
- A partir da Sprint 1.4, o control plane expõe API versionada em `/api/v1`, com endpoints iniciais `/me` e `/sites`, RBAC global/site-scoped e audit log. Testes Laravel usam SQLite em memoria; `pdo_sqlite` e `sqlite3` devem estar habilitados no PHP local/CI.
- A partir da Sprint 1.5, o control plane tem MVP admin em Blade: `/login`, `/admin` e `/admin/sites`, protegido por sessao e RBAC. URL local validada: `http://127.0.0.1:8013/admin`.
- A partir da Sprint 1.6, `@supersites/analytics` define o contrato de eventos PII-safe; o catalogo registra `outbound_site_click` apenas no data layer local, e o control plane expoe ingestao sanitizada em `/api/v1/analytics/events` e snapshots internos em `/api/v1/metric-snapshots`.
- Front visual local do catalogo: `http://127.0.0.1:3001` via `pnpm dev:supersite`.
- Front visual local do NetProbe: `http://127.0.0.1:3002` via `pnpm dev:netprobe`.
- Front visual local do CalcHarbor: `http://127.0.0.1:3003` via `pnpm dev:calcharbor`.
- Front visual local do DevUtility Lab: `http://127.0.0.1:3004` via `pnpm dev:devutility`.
- Front visual local do TimeNexus: `http://127.0.0.1:3005` via `pnpm dev:timenexus`.
- Front visual local do QRRoute: `http://127.0.0.1:3006` via `pnpm dev:qrroute`.
- Front visual local do InvoiceCraft: `http://127.0.0.1:3007` via `pnpm dev:invoicecraft`.
- Front visual local do MailHealth: `http://127.0.0.1:3008` via `pnpm dev:mailhealth`.
- Front visual local do SitePulse Lab: `http://127.0.0.1:3009` via `pnpm dev:sitepulse`.
- Front visual local do PixelBatch: `http://127.0.0.1:3010` via `pnpm dev:pixelbatch`.

## Runtime VPS SuperSites

- A VPS HostGator `129.121.37.220:22022` foi aprovada e validada para runtime SuperSites inicial.
- Acesso SSH local validado com `$HOME/.ssh/id_ed25519_vps_hostgator`.
- Redis SuperSites roda como `supersites-redis.service`.
- Redis deve ouvir somente em `127.0.0.1:6381`; portas publicas Redis devem permanecer fechadas/filtradas.
- Credenciais Redis ficam somente em `docs/credentials/vps-redis.local.json` e inventario local ignorado.
- Nao alterar `/srv/bigshop360`, servicos BigShop360, Nginx existente ou bancos BigShop360 durante operacao SuperSites.
- Validacao obrigatoria apos mudancas de runtime: `scripts/validate-vps-runtime.ps1`.

## Politica de execucao externa

Antes da aprovacao formal do roadmap, executar apenas trabalho local reversivel neste projeto. Nao criar bancos HostGator, crons remotos, repositorios GitHub remotos, DNS, AdSense, Google Cloud, billing ou deploy produtivo.

Depois da aprovacao do roadmap, a execucao deve seguir `docs/RUNBOOKS/SPRINT_EXECUTION.md`.

## HUMAN_ACTION_REQUIRED permanente

Registrar em `docs/HUMAN_ACTION_REQUIRED.md` quando houver:

- compra ou registro de dominio;
- identidade, KYC, impostos, conta bancaria ou PIN;
- aceite juridico em nome do proprietario;
- decisao irreversivel de negocio;
- escolha final de beneficiario legal AdSense;
- criacao/alteracao de perfil de pagamentos;
- mudanca DNS com risco de interromper e-mail/producao sem rollback claro.
