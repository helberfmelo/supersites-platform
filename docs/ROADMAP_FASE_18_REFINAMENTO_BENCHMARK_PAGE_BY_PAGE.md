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

Concluido:

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
- Etapa SitePulse Lab Tools: home, HTTP Status Checker, Redirect Chain Checker, Security Headers Checker, Robots.txt Checker, Sitemap Validator, TTFB Checker e Performance Snapshot.
- Etapa PixelBatch Tools: home, Image Compressor, Image Resizer, Image Cropper, Image Converter, Metadata Remover e Social Preset Generator.
- Etapa DocShift Tools: home, PDF Merge, PDF Split, PDF Rotate, PDF Compressor, PDF Watermark, PDF Page Numbers, PDF Metadata Cleaner e Text to PDF.
- Etapa Fechamento transversal da Fase 18: QA multilingue, placeholders AdSense-safe/doacao inertes, Lighthouse publico, dashboard/admin, relatorio e fechamento documental.

Proxima etapa ativa:

- Nenhuma etapa pendente mapeada na Fase 18 apos o fechamento 18.96-18.99.
- Proximo trabalho exige novo bloco de roadmap aprovado pelo owner.

## Sprints da etapa de fechamento concluida

### Sprint 18.96 - QA multilingue completa

- Rodar crawler em todos os idiomas.
- Detectar ingles residual fora de termos tecnicos aceitos.
- Corrigir acentos e gramatica.
- Validar `hreflang`, `canonical`, sitemap, title, description e schema.
- Registrar paginas que devem ficar `noindex` ate traducao final.

### Sprint 18.97 - AdSense-safe placeholders e doacao

- Inserir slots reservados AdSense-safe apos resultado e conteudo, nunca entre input e botao.
- Nao ativar anuncio real.
- Adicionar donation block em todos os sites apos entrega de valor.
- Nao ativar pagamento real sem gate humano.
- Atualizar `ADSENSE_PLAYBOOK.md` e `HUMAN_ACTION_REQUIRED.md`.

### Sprint 18.98 - Performance, acessibilidade e visual QA

- Rodar Lighthouse/PageSpeed quando possivel.
- Rodar GTmetrix manual ou registrar tarefa humana/API se indisponivel.
- Metas: PageSpeed mobile 90+, PageSpeed desktop 95+, LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 e GTmetrix A quando testado.
- Corrigir imagens, JS excessivo, layout shift, hydration, fonts, lazy loading e CSS critico.
- Validar responsividade 360px, 768px, 1024px e 1440px.

### Sprint 18.99 - Dashboard, relatorios e encerramento da Fase 18

- Atualizar dashboard/admin do Supersite com KPIs de refinamento.
- Criar `docs/PHASE_18_BENCHMARK_REFINEMENT_REPORT.md`.
- Atualizar `docs/STATUS.md`, `docs/ROADMAP.md`, `docs/METRICS.md` e `docs/HUMAN_ACTION_REQUIRED.md`.

Resultado: concluida em 2026-07-01. Relatorio final: `docs/PHASE_18_BENCHMARK_REFINEMENT_REPORT.md`.

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
