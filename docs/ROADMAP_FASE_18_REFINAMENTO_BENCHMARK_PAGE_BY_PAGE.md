# Fase 18 - Roadmap Ativo Compacto

Arquivo compacto de leitura obrigatoria. O roteiro completo e historico foi preservado em `docs/archive/ROADMAP_FASE_18_REFINAMENTO_BENCHMARK_PAGE_BY_PAGE_FULL_2026-06-30.md`.

## Objetivo

Transformar paginas MVP em superficies benchmark-grade: ferramenta/acao principal acima da dobra, linguagem publica natural, valor gratuito sem cadastro e detalhes tecnicos/metodologia abaixo do valor util.

## Cadencia atual

- Executar por etapa, nao por sprint individual.
- Fazer todas as sprints da etapa ativa.
- Depois rodar validacao minima, commit objetivo, push e Quality Gate.
- Deploy/monitoramento somente quando a etapa exigir publicacao ou quando o owner pedir.
- Validacoes profundas ficam sob demanda: screenshots, Playwright, crawler, Lighthouse, dry-run, smokes publicos e relatorios longos.

## Estado da Fase 18

Concluido ate:

- Hub principal e catalogos dos 10 sites.
- Paginas institucionais do Hub: About, Contact, Privacy, Cookies, Terms, Methodology, Editorial Policy e Public Status.
- NetProbe home.
- NetProbe What is my IP.
- Etapa NetProbe Tools: DNS Propagation, DNS Lookup, RDAP, SSL Certificate, Port Checker e Ping/Traceroute.
- Etapa CalcHarbor Tools: home, Loan Payment, Break-even Point, Gross Margin e ROI.
- Etapa DevUtility Lab Tools: home, Structured Data Formatter, Base64 Converter, JWT Inspector, Regex Tester, Text Diff, Cron Helper, UUID Generator, Timestamp Converter e Hash Generator.
- Etapa TimeNexus Tools: home, World Clock Americas + Europe, Time Zone Converter, Timestamp Converter, Date Difference, Business Days, Age Calculator, Percentage Calculator e Unit Converter.
- Etapa QRRoute Tools: home, Static QR Code Generator, Barcode Generator, UTM Builder, vCard QR Builder, Wi-Fi QR Builder e QR Preview Lab.
- Etapa InvoiceCraft Tools: home, Invoice Builder, Quote Builder e Receipt Builder.

Proxima etapa ativa:

- **Etapa MailHealth Tools**
- Sprints: **18.64 a 18.71**
- Escopo: MailHealth home, SPF Checker, DKIM Checker, DMARC Checker, MX Checker, Blacklist Check, SMTP Check e Header Analyzer.

## Sprints da proxima etapa

### Sprint 18.64 - MailHealth home

- Input de dominio unico acima da dobra.
- Score geral de email health.
- Cards SPF, DKIM, DMARC, MX, blacklist, SMTP e headers.
- Inspirar-se em MxToolbox e Mail-Tester: score simples, detalhes tecnicos abaixo.
- Remover `Monitoring planned`, `billing`, `API planned` do topo.

### Sprint 18.65 - SPF Checker

- Resultado visual: found/missing/multiple/risky.
- Mostrar record bruto, mecanismos, lookup count e all mechanism.
- Fix guidance com texto copiavel.
- Mover record builder planned para bloco futuro discreto ou remover.

### Sprint 18.66 - DKIM Checker

- Campos domain + selector claros.
- Resultado: record found, key type, version, key present e warnings.
- Explicar onde encontrar selector.
- Nao expor raw key em analytics/logs.

### Sprint 18.67 - DMARC Checker

- Resultado: policy, pct, rua, ruf, alignment e enforcement level.
- Visual progress: none -> quarantine -> reject.
- Fix guidance e exemplo de record.
- Deixar claro que report ingestion e upgrade futuro, abaixo.

### Sprint 18.68 - MX Checker

- Tabela MX por prioridade.
- Validar A/AAAA publico dos hosts.
- Status visual de inbound readiness.
- Proximos checks: SMTP e SPF.

### Sprint 18.69 - Blacklist Check

- Mostrar quais IPs foram checados e quais listas.
- Separar listed/unlisted/error/rate-limited.
- Nao prometer deliverability total.
- Proximo passo claro se listado.

### Sprint 18.70 - SMTP Check

- Resultado: reachable/refused/timeout por MX e porta.
- Sem enviar email.
- Mostrar latencia e porta.
- Limites abaixo.

### Sprint 18.71 - Header Analyzer

- Area de paste grande.
- Parse local imediato.
- Cards SPF/DKIM/DMARC/alignment.
- Highlight de Authentication-Results.
- Nao enviar header para API.

## Regras de produto

- Primeira dobra deve resolver uma intencao pratica.
- Remover linguagem interna: release, rollback, deploy smoke, ads planned, billing disabled, worker planned, human review, launch order e quality checks.
- Metodologia, privacidade, limites, ads, donation e upgrades ficam abaixo do resultado.
- PT-BR/ES/FR/DE devem ter linguagem natural e sem ingles residual indevido.
- Campos tecnicos de rota (`path`, `href`, `slug`, `url`, `canonical`, `hreflang`, `locale`, time zones) nao devem ser traduzidos/acentuados.

## Referencias

- Roadmap completo/historico: `docs/archive/ROADMAP_FASE_18_REFINAMENTO_BENCHMARK_PAGE_BY_PAGE_FULL_2026-06-30.md`
- Aceite benchmark: `docs/PHASE18_BENCHMARK_GRADE_ACCEPTANCE.md`
- Cadencia operacional: `docs/RUNBOOKS/SPRINT_EXECUTION.md`
