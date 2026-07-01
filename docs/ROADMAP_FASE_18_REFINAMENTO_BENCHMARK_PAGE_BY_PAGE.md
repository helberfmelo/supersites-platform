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

Proxima etapa ativa:

- **Etapa InvoiceCraft Tools**
- Sprints: **18.60 a 18.63**
- Escopo: InvoiceCraft home, Invoice Builder, Quote Builder e Receipt Builder.

## Sprints da proxima etapa

### Sprint 18.60 - InvoiceCraft home

- Home deve ser editor/document studio imediatamente, nao catalogo textual.
- Inspirar-se em Invoice Generator: editor acima da dobra, download claro.
- Remover `Payments and taxes planned` do topo.
- Nota fiscal/imposto apenas como disclaimer no fim e docs humanos.

### Sprint 18.61 - Invoice Builder

- Layout documento real: editor a esquerda, preview do documento a direita.
- Botao `Download PDF` sempre visivel apos calculo.
- Campos: issuer, client, number, issue date, due date, currency, items, tax/discount/shipping, notes e terms.
- Adicionar logo upload local opcional se ja seguro; se nao, backlog.
- Remover alertas tecnicos do topo.

### Sprint 18.62 - Quote Builder

- Mesmo editor, mas linguagem de orcamento/proposta.
- Campo `Valid until` destacado.
- Preview com titulo Quote/Estimate.
- CTA para converter em invoice como upgrade futuro.

### Sprint 18.63 - Receipt Builder

- Mesmo editor, mas com `Paid date` e status paid.
- Preview de recibo limpo.
- Nota: nao processa pagamento; apenas gera recibo.
- Mover limites para baixo.

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
