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

Apps novos devem importar esses contratos antes de duplicar helpers locais.

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

## Sites e pastas

| App | Pasta | Papel |
|---|---|---|
| SuperSites Hub | `supersite` | Catalogo publico |
| Control Plane | `control-plane` | Admin central |
| NetProbe Atlas | `netprobe-atlas` | IP, DNS, dominio, SSL |
| CalcHarbor | `calcharbor` | Calculadoras |
| DevUtility Lab | `devutility-lab` | Ferramentas dev |
| TimeNexus | `timenexus` | Tempo/data/unidades |
| QRRoute | `qrroute` | QR, UTM, links |
| InvoiceCraft | `invoicecraft` | Faturas e recibos |
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
