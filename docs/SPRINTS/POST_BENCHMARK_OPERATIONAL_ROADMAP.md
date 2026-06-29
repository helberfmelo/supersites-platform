# Post-Benchmark Operational Roadmap

Data-base: 2026-06-29

## Contexto

A Fase 9 fechou o bloco benchmark-grade em producao: o crawler full final `2026-06-28T20-51-53-722Z` cobriu 876 rotas e 1752 checks desktop/mobile com 0 gaps registrados. A auditoria V2 (`docs/AUDITORIA_LIVE_SUPERSITES_BENCHMARK_V2.md`) permanece versionada como evidencia de baseline e briefing, mas varias lacunas P0 citadas ali foram encerradas nas Sprints 9.3 a 9.16.

O proximo trabalho nao deve ativar anuncios reais, billing, checkout, doacoes, afiliados, analytics externo, workers pagos, DNS/dominios definitivos ou qualquer aceite juridico. A prioridade agora e transformar a superficie publica benchmark-grade em operacao acompanhada, com trilhas claras para os proximos blocos.

## Estado real verificado antes da Fase 10

| Sinal | Evidencia |
|---|---|
| Branch | `main...origin/main` com apenas `docs/AUDITORIA_LIVE_SUPERSITES_BENCHMARK_V2.md` nao rastreado antes desta fase |
| Ultimo commit remoto | `fef513f docs: close sprint 9.16 benchmark phase` |
| CI recente | Quality Gate `28336274992` passou em `fef513f` |
| Smokes publicos | `pnpm deploy:smoke-supersite-public` e `pnpm deploy:smoke-control-plane-public` passaram em 2026-06-29 |
| Crawler quick atual | `2026-06-29T01-09-47-242Z`, 95 rotas, 190 checks, 0 gaps |
| Ativacoes externas | 0 anuncios reais, 0 GTM/GA4, 0 checkout, 0 billing real, 0 doacao real, 0 afiliados, 0 worker/cron publico, 0 API paga |

## Fase 10 - Post-Benchmark Operations Watchdog

Status: concluida em 2026-06-29.

Objetivo: fechar a transicao pos-benchmark com roadmap futuro completo, evidencia de producao atual e monitoramento publico recorrente/manual que valide a superficie sem mutar producao.

| Sprint | Simbolico | Escopo | Gate de aceite |
|---:|---|---|---|
| 10.1 | POST-BENCHMARK-WATCHDOG | Versionar a auditoria V2, reconciliar roadmap/status/metricas com Fase 9 fechada, criar workflow `Public Watchdog` para smokes publicos, gate AdSense-safe e crawler quick/full agendado/manual | Concluida: smokes publicos locais passaram, crawler quick local `2026-06-29T01-09-47-242Z` teve 0 gaps, workflow versionado, Quality Gate `28342679619` verde, Deploy Dry Run `28342679627` verde, Public Watchdog manual `28342779097` verde com crawler `2026-06-29T01-22-23-919Z` e 0 gaps |

## Evidencia de fechamento da Fase 10

| Sinal | Evidencia |
|---|---|
| Commit tecnico | `5143a1f ci: add public watchdog roadmap` |
| Quality Gate | `28342679619` passed |
| Deploy Dry Run | `28342679627` passed |
| Public Watchdog | `28342779097` passed em modo `quick` |
| Watchdog crawler | `2026-06-29T01-22-23-919Z`; 95 rotas; 190 checks; 0 failures; 0 console errors; 0 gaps |
| Watchdog artifact | `public-watchdog-artifacts` ID `7940737629` |
| Smokes finais locais | Hub/API, control-plane, NetProbe API e `validate:adsense-safe-public` em 13 paginas passaram |
| Ativacoes externas | 0 anuncios reais, 0 GTM/GA4, 0 checkout, 0 billing real, 0 doacao real, 0 afiliados, 0 worker/cron publico, 0 API paga, 0 DNS/root mapping |

## Fase 11 - Operational Hardening

Objetivo: resolver pendencias criticas tecnicas antes de qualquer monetizacao real ou escala SEO.

| Sprint | Simbolico | Escopo | Gates/humanos |
|---:|---|---|---|
| 11.1 | OPS-BRANCH-PROTECTION | Configurar ruleset/branch protection de `main` sem bloquear deploys de recuperacao; documentar fallback | Tecnico reversivel; exige teste de bypass/admin |
| 11.2 | OPS-ROOT-MAPPING-DRYRUN | Decidir e simular estrategia de `https://opentshost.com/` para `/supersites/` sem sobrescrever `.htaccess` raiz nao gerenciado | Mudanca real na raiz so com smoke/rollback explicito |
| 11.3 | OPS-HOSTGATOR-RETENTION | Criar politica e script dry-run para retencao/limpeza de releases HostGator antigos | Remocao real somente apos listagem auditada |
| 11.4 | OPS-VPS-BACKUP-RESTORE | Documentar e validar backup/restore de Redis `/var/lib/supersites-redis` e runtime VPS | Antes de workers pagos/monitores recorrentes |
| 11.5 | OPS-UPTIME-RUNBOOK | Consolidar runbook de incidente, public watchdog, smokes e rollback por app | Sem provider externo obrigatorio |

## Fase 12 - Real Measurement Readiness

Objetivo: trocar proxies locais por mensuracao operacional real onde permitido.

Status em 2026-06-29: Fase concluida. A Sprint 12.1 foi concluida com `lighthouse` 13.4.0, `@lhci/cli` 0.15.1, `pnpm measure:lighthouse-public`, `.lighthouserc.cjs`, workflow manual `Public Measurement Readiness` run `28349998391` e runbook `docs/RUNBOOKS/REAL_MEASUREMENT_READINESS.md`. A Sprint 12.2 foi concluida com `pnpm measure:admin-audit`, auditoria admin local autenticada run `2026-06-29T05-31-40Z`, Quality Gate `28350927064`, Deploy Dry Run `28350927046` e smoke publico final `2026-06-29T05-40-30Z`. A Sprint 12.3 foi concluida com `pnpm measure:google-ready` run `2026-06-29T05-47-31Z`, Quality Gate `28351452461`, Deploy Dry Run `28351452440`, smoke publico final `2026-06-29T05-53-40Z`, 18 checks e 0 ativacoes de provider. A Sprint 12.4 foi concluida com contrato executive reports `2026-06-29.1`, 3 relatorios/18 itens, evidencias internas/public watchdog/local measurement, admin audit `2026-06-29T06-02-58Z`, Quality Gate `28352029810`, Deploy Dry Run `28352029809` e smoke publico final `2026-06-29T06-08-56Z`. PageSpeed API e provedores Google/AdSense seguem bloqueados por gate humano.

| Sprint | Simbolico | Escopo | Gates/humanos |
|---:|---|---|---|
| 12.1 | MEASURE-LIGHTHOUSE-CI | Integrar Lighthouse/LHCI local ou CI se dependencias forem estaveis e sem provider pago | Sem PageSpeed API key |
| 12.2 | MEASURE-DASHBOARD-AUDIT | Auditar dashboard admin autenticado com Playwright local e registrar cobertura de telas | Sem expor credenciais |
| 12.3 | MEASURE-GOOGLE-READY | Preparar checklist tecnico para GA4/GTM/Search Console sem criar propriedades nem tags reais | Acesso/termos/verificacao Google seguem `HUMAN_ACTION_REQUIRED` |
| 12.4 | MEASURE-EXEC-REPORTS | Atualizar relatorios executivos para consumir apenas evidencias internas/public watchdog ate providers existirem | Sem causalidade inventada |

## Fase 13 - Product Depth and SEO/AIO Expansion

Objetivo: expandir profundidade util sem conteudo em massa raso.

| Sprint | Simbolico | Escopo | Gates/humanos |
|---:|---|---|---|
| 13.1 | DEPTH-CALCHARBOR | Expandir calculadoras priorizadas e defaults por locale/moeda | Revisao para temas fiscais/juridicos |
| 13.2 | DEPTH-TIMENEXUS | Adicionar paginas curadas de cidade/fuso e timeline visual sem geracao ilimitada | Evitar pagina programatica rasa |
| 13.3 | DEPTH-MAILHEALTH | Criar SPF/DMARC builders seguros e guias profundos | DNSBL/provider policy segue gate |
| 13.4 | DEPTH-SITEPULSE | Adicionar detalhes de headers/redirects/tecnologias dentro de limites antiabuso | Sem crawling amplo |
| 13.5 | DEPTH-PIXEL-DOC | Planejar background remover/OCR/conversoes com matriz de dados antes de qualquer provider/upload | AI/OCR/provider seguem gate humano |

## Fase 14 - Paid Upgrade Foundations

Objetivo: preparar contas, autenticacao, entitlements e limites pagos sem cobrar ate os gates estarem completos.

| Sprint | Simbolico | Escopo | Gates/humanos |
|---:|---|---|---|
| 14.1 | PAID-AUTH-ACCOUNTS | Contas de usuario, exclusao/exportacao e RBAC cliente/site | Politicas legais finais antes de go-live |
| 14.2 | PAID-ENTITLEMENTS | Limites por plano e quota enforcement sem checkout real | Billing provider ainda bloqueado |
| 14.3 | PAID-WEBHOOK-FOUNDATION | Endpoint assinado/idempotente em modo test/dry-run | Secrets/provider exigem cofre e aprovacao |
| 14.4 | PAID-MONITORS-PREVIEW | Monitores NetProbe/MailHealth/SitePulse em preview autenticado | Worker/backup/alerta real precisam Fase 11 |

## Fase 15 - Provider and Monetization Go-Live

Objetivo: ativar provedores somente quando as acoes humanas estiverem resolvidas.

| Sprint | Simbolico | Escopo | Gates/humanos |
|---:|---|---|---|
| 15.1 | ADSENSE-ACCOUNT | Configurar publisher id, `ads.txt` e revisao por site apos conta aprovada | Beneficiario, termos, fiscal, banco, PIN |
| 15.2 | GOOGLE-PROVIDERS | Ativar GA4/GTM/Search Console com consentimento e sem PII | Acesso Google/verificacao |
| 15.3 | BILLING-PROVIDERS | Ativar Stripe/Mercado Pago/Paddle conforme aprovado | KYC, impostos, perfil, secrets |
| 15.4 | DONATION-AFFILIATE | Ativar suporte/doacao/afiliados com disclosure e politicas | Conta, termos, impostos, aprovacao |

## Fase 16 - Continuous Growth Loop

Objetivo: operar o ciclo continuo com evidencias reais.

| Sprint | Simbolico | Escopo | Gates/humanos |
|---:|---|---|---|
| 16.1 | GROWTH-INGEST | Ingestao de GA4/Search Console/AdSense/billing quando aprovados | Tokens e quotas em cofre |
| 16.2 | GROWTH-PRIORITIZE | Priorizacao por impacto/esforco/confianca/risco com dados reais | Sem causalidade automatica |
| 16.3 | GROWTH-AUTOMATION-SAFE | Automacoes de baixo risco via PR, nunca publish direto | Auto-merge so com gates verdes |
| 16.4 | GROWTH-REPORTING | Relatorios semanais/mensais com antes/depois e status de dados | Revisao para receita/causalidade |
