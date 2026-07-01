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
- Etapa PixelBatch Tools: home, Image Compressor, Image Resizer, Image Cropper, Image Converter, Metadata Remover e Social Preset Generator.

Proxima etapa ativa:

- **Etapa DocShift Tools**
- Sprints: **18.87 a 18.95**
- Escopo: DocShift home, PDF Merge, PDF Split, PDF Rotate, PDF Compressor, PDF Watermark, PDF Page Numbers, PDF Metadata Cleaner e Text to PDF.

## Sprints da proxima etapa

### Sprint 18.87 - DocShift home

- Inspirar-se em iLovePDF sem copiar UI/texto/assets: grid de ferramentas PDF grande e direto.
- Dropzone para tarefa principal.
- Remover `No server upload backend active` do topo.
- Mostrar `Files stay in this browser for supported free tasks`.
- Footer PDF tools rico.

### Sprint 18.88 - PDF Merge

- Dropzone dominante.
- Lista de PDFs em ordem com drag/reorder se viavel.
- Botao merge/download claro.
- Progress state.
- Corrigir textos PT-BR ainda em ingles.

### Sprint 18.89 - PDF Split

- Upload/dropzone.
- Campo de page ranges.
- Preview de paginas se viavel.
- Download output.

### Sprint 18.90 - PDF Rotate

- Upload/dropzone.
- Escolher all pages ou range.
- Botoes 90/180/270.
- Download output.

### Sprint 18.91 - PDF Compressor

- Upload/dropzone.
- Mostrar size before/after.
- Explicar limites de compressao local.
- Download output.

### Sprint 18.92 - PDF Watermark

- Upload/dropzone.
- Campo texto, posicao, opacidade e tamanho.
- Preview se viavel.
- Download output.

### Sprint 18.93 - PDF Page Numbers

- Upload/dropzone.
- Opcoes: position, start number e format.
- Download output.

### Sprint 18.94 - PDF Metadata Cleaner

- Upload/dropzone.
- Mostrar title/author quando acessivel.
- Permitir limpar/substituir metadados basicos.
- Download output.

### Sprint 18.95 - Text to PDF

- Editor de texto grande.
- Opcoes simples: title, page size e font size.
- Preview/download.
- Limites claros abaixo.

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
