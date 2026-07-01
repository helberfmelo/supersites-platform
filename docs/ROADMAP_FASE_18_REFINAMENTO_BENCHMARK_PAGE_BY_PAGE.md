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
- Etapa SitePulse Lab Tools: home, HTTP Status Checker, Redirect Chain Checker, Security Headers Checker, Robots.txt Checker, Sitemap Validator, TTFB Checker e Performance Snapshot.

Proxima etapa ativa:

- **Etapa PixelBatch Tools**
- Sprints: **18.80 a 18.86**
- Escopo: PixelBatch home, Image Compressor, Image Resizer, Image Cropper, Image Converter, Metadata Remover e Social Preset Generator.

## Sprints da proxima etapa

### Sprint 18.80 - PixelBatch home

- Dropzone grande acima da dobra.
- Inspirar-se em TinyPNG/iLoveIMG/Squoosh sem copiar UI/texto/assets.
- Remover `No server upload backend active` do topo.
- Mostrar `Your image stays in this browser` como badge curto.
- Footer image tools rico.

### Sprint 18.81 - Image Compressor

- Dropzone dominante.
- Preview antes/depois.
- Resultado: original size, output size, reduction %, format e quality.
- Download claro.
- Corrigir PT-BR e ingles residual.

### Sprint 18.82 - Image Resizer

- Campos width/height e manter proporcao.
- Presets web/store/social.
- Preview e download.

### Sprint 18.83 - Image Cropper

- UI de crop real se viavel.
- Presets square, portrait, landscape, OG e marketplace.
- Preview e download.
- Se crop manual nao for viavel nesta etapa, implementar centered crop com UI honesta e backlog para crop manual.

### Sprint 18.84 - Image Converter

- Input file, output format e quality quando aplicavel.
- Preview e download.
- Aviso quando AVIF nao suportado pelo navegador.

### Sprint 18.85 - Metadata Remover

- Explicar claramente que re-encode via Canvas remove metadados comuns.
- Mostrar antes/depois quando possivel.
- Download da copia limpa.

### Sprint 18.86 - Social Preset Generator

- Presets: square, story, OG e marketplace.
- Gerar multiplos outputs se localmente viavel.
- Download individual ou zip se seguro.

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
