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
- Etapa MailHealth Tools: home, SPF Checker, DKIM Checker, DMARC Checker, MX Checker, Blacklist Check, SMTP Check e Header Analyzer.

Proxima etapa ativa:

- **Etapa SitePulse Lab Tools**
- Sprints: **18.72 a 18.79**
- Escopo: SitePulse home, HTTP Status Checker, Redirect Chain Checker, Security Headers Checker, Robots.txt Checker, Sitemap Validator, TTFB Checker e Performance Snapshot.

## Sprints da proxima etapa

### Sprint 18.72 - SitePulse home

- Input `Check if a website is up` acima da dobra.
- Resultado simples: online/down/redirecting/slow.
- Detalhes GTmetrix-like abaixo.
- Remover `Monitoring planned` do topo.

### Sprint 18.73 - HTTP Status Checker

- Resultado principal: HTTP code, online/down, final URL e TTFB.
- Botoes copy report e check again.
- Explicacao leiga do codigo.

### Sprint 18.74 - Redirect Chain Checker

- Timeline de hops.
- Mostrar code, URL, latency, cross-domain e loop warning.
- SEO guidance abaixo.

### Sprint 18.75 - Security Headers Checker

- Score visual.
- Cards para HSTS, CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy e X-Content-Type-Options.
- Mostrar header presente/ausente e recomendacao.

### Sprint 18.76 - Robots.txt Checker

- Mostrar fetch status e conteudo resumido.
- Destacar sitemap hints e disallow gerais.
- Nao fazer crawl amplo.

### Sprint 18.77 - Sitemap Validator

- Mostrar status XML, URL count, size e errors.
- Amostra de URLs.
- Proximo passo para SEO.

### Sprint 18.78 - TTFB Checker

- Resultado principal: TTFB ms com badge good/needs work/slow.
- Explicar que e amostra unica.
- CTA para monitoramento futuro abaixo.

### Sprint 18.79 - Performance Snapshot

- Relatorio visual com status, redirects, headers, byte size e TTFB.
- Score geral.
- Nao prometer Lighthouse se nao executar Lighthouse real.
- Relacionar com PageSpeed/GTmetrix como benchmarks, nao como dados proprios.

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
