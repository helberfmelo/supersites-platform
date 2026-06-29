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

Status em 2026-06-29: concluida. As Sprints 13.1 a 13.5 foram concluidas em main, sem deploy real. A Sprint 13.5 fechou a fase com matriz de dados/gates para PixelBatch/DocShift antes de qualquer provider/upload; Quality Gate `28356961011`, Deploy Dry Run `28356961015` e smokes publicos do baseline atual passaram. Nenhum checkout, billing, ads, provider externo, API paga, worker, publicacao DNS automatica, storage persistente, upload server-side ou conteudo em massa foi ativado.

| Sprint | Simbolico | Escopo | Gates/humanos |
|---:|---|---|---|
| 13.1 | DEPTH-CALCHARBOR | Expandir calculadoras priorizadas e defaults por locale/moeda | Concluida em main sem deploy real: `compound-interest`, `savings-goal`, `cash-runway`, `discount-price`, defaults `USD`/`BRL`/`EUR`, 12 testes, build/preview/Playwright/public-copy/AdSense-safe/gates locais, Quality Gate `28353160843`, Deploy Dry Run `28353160830` e smokes publicos do baseline atual passaram; revisao humana continua obrigatoria antes de temas fiscais/juridicos regulados |
| 13.2 | DEPTH-TIMENEXUS | Adicionar paginas curadas de cidade/fuso e timeline visual sem geracao ilimitada | Concluida em main sem deploy real: 8 cidades curadas x 5 idiomas, timeline visual, overlap 09:00, home links, JSON-LD, 11 testes, build/preview/Playwright/public-copy/AdSense-safe/gates locais, Quality Gate `28354017920`, Deploy Dry Run `28354017921` e smokes publicos do baseline atual passaram; sem geracao all-IANA ou calendario/provider externo |
| 13.3 | DEPTH-MAILHEALTH | Criar SPF/DMARC builders seguros e guias profundos | Concluida em main sem deploy real: builders TXT locais para SPF/DMARC, copy 5 idiomas, 10 testes, build/preview/Playwright/public-copy/AdSense-safe/gates locais, Quality Gate `28354998649`, Deploy Dry Run `28354998680` e smokes publicos do baseline atual passaram; DNSBL/provider policy, publicacao DNS e ingestao DMARC seguem gate |
| 13.4 | DEPTH-SITEPULSE | Adicionar detalhes de headers/redirects/tecnologias dentro de limites antiabuso | Concluida em main sem deploy real: redirect path, header matrix, technology clues, performance sample e bounded notes em 5 idiomas; 9 testes, build/preview/Playwright/public-copy/AdSense-safe/gates locais, Quality Gate `28355948547`, Deploy Dry Run `28355948542` e smokes publicos do baseline atual passaram; sem endpoint novo ou crawling amplo |
| 13.5 | DEPTH-PIXEL-DOC | Planejar background remover/OCR/conversoes com matriz de dados antes de qualquer provider/upload | Concluida em main sem deploy real: cards publicos/localizados para PixelBatch background cleanup/high-volume/API e DocShift OCR/Office/batch, runbook `FILE_PROVIDER_DATA_MATRIX`, gates humanos registrados, 20 testes unitarios, builds/previews/Playwright/public-copy/AdSense-safe/gates locais, Quality Gate `28356961011`, Deploy Dry Run `28356961015` e smokes publicos do baseline atual passaram; AI/OCR/provider/upload seguem gate humano |

## Evidencia de fechamento da Fase 13

| Sinal | Evidencia |
|---|---|
| Sprint 13.1 | Commit `dda2647`; Quality Gate `28353160843`; Deploy Dry Run `28353160830`; smokes publicos passaram |
| Sprint 13.2 | Commit `6abcda5`; Quality Gate `28354017920`; Deploy Dry Run `28354017921`; smokes publicos passaram |
| Sprint 13.3 | Commit `9259dd9`; Quality Gate `28354998649`; Deploy Dry Run `28354998680`; smokes publicos passaram |
| Sprint 13.4 | Commit `53809f3`; Quality Gate `28355948547`; Deploy Dry Run `28355948542`; smokes publicos passaram |
| Sprint 13.5 | Commit `e3ed365`; Quality Gate `28356961011`; Deploy Dry Run `28356961015`; smokes publicos passaram para Hub, PixelBatch, DocShift, NetProbe e control-plane |
| Ativacoes externas | 0 deploys reais de app estatico, 0 checkout/billing/ads/doacoes/afiliados, 0 providers externos, 0 uploads server-side, 0 OCR/IA/conversao provider, 0 workers/crons, 0 API paga |

## Fase 14 - Paid Upgrade Foundations

Objetivo: preparar contas, autenticacao, entitlements e limites pagos sem cobrar ate os gates estarem completos.

| Sprint | Simbolico | Escopo | Gates/humanos |
|---:|---|---|---|
| 14.1 | PAID-AUTH-ACCOUNTS | Contas de usuario, exclusao/exportacao e RBAC cliente/site | Politicas legais finais antes de go-live |
| 14.2 | PAID-ENTITLEMENTS | Limites por plano e quota enforcement sem checkout real | Billing provider ainda bloqueado |
| 14.3 | PAID-WEBHOOK-FOUNDATION | Endpoint assinado/idempotente em modo test/dry-run | Secrets/provider exigem cofre e aprovacao |
| 14.4 | PAID-MONITORS-PREVIEW | Monitores NetProbe/MailHealth/SitePulse em preview autenticado | Worker/backup/alerta real precisam Fase 11 |

| Sinal | Evidencia |
|---|---|
| Sprint 14.1 | Commit `da54701`; Quality Gate `28358191311`; Deploy Dry Run `28358191342`; smokes publicos passaram para Hub, control-plane e NetProbe |
| Sprint 14.1 local | Account export/delete request foundation implementada; `php artisan test` 49/499, `measure:admin-audit` `2026-06-29T08-11-31Z` com 9 paginas, artifact control-plane 7137 arquivos, gates locais passaram |
| Sprint 14.1 ativacoes externas | 0 signup publico, 0 exclusao automatica, 0 checkout/billing/provider/webhook real/secrets novos, 0 ads/doacoes/afiliados, 0 worker/cron |
| Sprint 14.2 | Commit `26516c8`; Quality Gate `28359248342`; Deploy Dry Run `28359248307`; smokes publicos passaram para Hub, control-plane e NetProbe |
| Sprint 14.2 local | Entitlement quota foundation implementada; billing package 14 testes/typecheck, `php artisan test` 50/514, `measure:admin-audit` `2026-06-29T08-29-48Z` com 9 paginas, artifact control-plane 7138 arquivos, gates locais passaram |
| Sprint 14.2 ativacoes externas | 0 plano pago real, 0 checkout/billing provider/provider price id/webhook real/secrets novos, 0 uso medido comercial, 0 ads/doacoes/afiliados, 0 worker/cron |
| Sprint 14.3 | Commit `2bb673d`; Quality Gate `28360245701`; Deploy Dry Run `28360245696`; smokes publicos passaram para Hub, control-plane e NetProbe |
| Sprint 14.3 local | Webhook dry-run foundation implementada; `BillingWebhookDryRunTest` 6/38, `php artisan test` 56/553, `measure:admin-audit` `2026-06-29T08-48-01Z` com 9 paginas, artifact control-plane 7141 arquivos, pacotes compartilhados passaram |
| Sprint 14.3 ativacoes externas | 0 webhook real, 0 provider SDK/checkout/billing provider/secrets reais, 0 processamento de pagamento/invoice/entitlement pago, 0 ads/doacoes/afiliados, 0 worker/cron |
| Sprint 14.4 | Commit `f05dea4`; Quality Gate `28360961942`; Deploy Dry Run `28360961952`; smokes publicos passaram para Hub, control-plane e NetProbe |
| Sprint 14.4 local | Monitor preview autenticado implementado para NetProbe/MailHealth/SitePulse; `PaidMonitorPreviewTest` 6/44, `php artisan test` 62/597, `measure:admin-audit` `2026-06-29T09-02-00Z` com 9 paginas, artifact control-plane 7144 arquivos, pacotes compartilhados passaram |
| Sprint 14.4 ativacoes externas | 0 monitor persistente MailHealth/SitePulse, 0 worker recorrente/alerta real/status page/DMARC recorrente, 0 checkout/billing provider/secrets reais, 0 ads/doacoes/afiliados, 0 worker/cron novo |
| Fase 14 fechamento | Concluida em main em 2026-06-29; commits tecnicos `da54701`, `26516c8`, `2bb673d`, `f05dea4`; ultimo docs-only Quality Gate `28361154713`; 0 signup publico/checkout/cobranca/provider SDK/webhook real/secret real/ads/doacoes/afiliados/provider externo |

## Fase 15 - Provider and Monetization Go-Live

Objetivo: ativar provedores somente quando as acoes humanas estiverem resolvidas.

Status em 2026-06-29: Fase iniciada em modo fail-closed. A Sprint 15.1 foi concluida com readiness autenticado de AdSense, preview de `ads.txt` e revisao por site sem publicar `ads.txt`, submeter sites, carregar snippet, habilitar Management API ou ativar requests/receita. Feature commit `9f048f8`, Quality Gate `28362026582`, Deploy Dry Run `28362026601` e smokes publicos passaram; gates humanos de beneficiario, termos, fiscal, banco, PIN, publisher id real e decisao por site seguem obrigatorios. A Sprint 15.2 esta preparando readiness autenticado para GA4/GTM/Search Console sem carregar tags, criar propriedades/containers, publicar verificacoes ou importar dados.

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
