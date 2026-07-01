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

Proxima etapa ativa:

- **Etapa QRRoute Tools**
- Sprints: **18.53 a 18.59**
- Escopo: QRRoute home, Static QR Code Generator, Barcode Generator, UTM Builder, vCard QR Builder, Wi-Fi QR Builder e QR Preview Lab.

## Sprints da proxima etapa

### Sprint 18.53 - QRRoute home

- QR preview ao vivo acima da dobra.
- Remover `Commercial redirects planned`, `billing` e `ads inactive` do topo.
- Abas de tipos de QR claras.
- Footer com QR Tools, Barcode Tools, UTM Tools e Guides.
- Bloco de doacao.

### Sprint 18.54 - Static QR Code Generator

- Preview em tempo real sem exigir botao quando possivel.
- Botoes: Download SVG, Download PNG, Copy payload e Print.
- Tipos: URL, text, email e phone.
- Validacao de URL segura.
- Explicar estatico vs dinamico abaixo.
- Corrigir PT-BR: `Safe URL`, `Plain text`, `Optional label` etc.

### Sprint 18.55 - Barcode Generator

- Preview real de barcode.
- Download SVG/PNG.
- Labels e tamanho.
- Validar caracteres.

### Sprint 18.56 - UTM Builder

- Campos individuais para source, medium, campaign, term e content.
- URL final copyable.
- QR preview do link final.
- Presets de campanha.

### Sprint 18.57 - vCard QR Builder

- Campos estruturados: name, org, phone, email e website.
- Preview vCard e QR.
- Download QR e copy vCard.
- Privacidade abaixo, nao dominante.

### Sprint 18.58 - Wi-Fi QR Builder

- Campos SSID, password, encryption e hidden.
- Botao show/hide password.
- QR preview e download.
- Aviso de privacidade discreto.

### Sprint 18.59 - QR Preview Lab

- Ferramenta para colar payload e validar estrutura.
- Mostrar QR, scheme, tamanho, risco e destino.
- Explicar limites de QR impresso.

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
