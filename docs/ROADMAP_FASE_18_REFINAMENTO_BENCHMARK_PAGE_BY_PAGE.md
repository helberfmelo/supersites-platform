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

Proxima etapa ativa:

- **Etapa TimeNexus Tools**
- Sprints: **18.44 a 18.52**
- Escopo: TimeNexus home, World Clock Americas + Europe, Time Zone Converter, Timestamp Converter, Date Difference, Business Days, Age Calculator, Percentage Calculator e Unit Converter.

## Sprints da proxima etapa

### Sprint 18.44 - TimeNexus home

- Mostrar hora atual imediatamente.
- Inspiracao em timeanddate: secoes World Clock, Time Zones, Calendar, Calculators e Timers.
- Remover `No accounts or storage`, `billing` e `ads inactive`.
- Criar footer com cidades, fusos, datas, calendarios e conversores.

### Sprint 18.45 - World Clock Americas + Europe

- Melhorar visual com cards de cidades e timeline horizontal.
- Mostrar business hours com cor/badge.
- Mobile: lista vertical de cidades com horario grande.
- Adicionar city group switcher.

### Sprint 18.46 - Time Zone Converter

- Resultado direto acima do formulario quando exemplo carregado.
- Inputs mais simples: from city/time e to city.
- Timeline visual.
- Adicionar copy/share link.
- Mover metodologia abaixo.

### Sprint 18.47 - Timestamp Converter

- Mostrar timestamp atual automaticamente.
- Converter enquanto digita.
- Cards: Unix seconds, Unix ms, ISO, UTC, local e selected zone.
- Botoes copiar.

### Sprint 18.48 - Date Difference

- Resultado principal: days/weeks/months.
- Mostrar inclusivo vs exclusivo.
- Adicionar calendario visual pequeno ou timeline.

### Sprint 18.49 - Business Days

- Resultado principal: business days e weekend days.
- Adicionar opcao de incluir/excluir start/end.
- Adicionar aviso sobre feriados regionais abaixo.
- Futuro upgrade: holiday calendars.

### Sprint 18.50 - Age Calculator

- Resultado principal: years, months, days.
- Mostrar total days e next birthday/days until.
- Corrigir localizacao.

### Sprint 18.51 - Percentage Calculator

- Modos: percent of, percent change, add/subtract percent.
- Resultado instantaneo.
- Formula abaixo.

### Sprint 18.52 - Unit Converter

- Converter enquanto digita.
- Categorias: length, weight, temperature.
- Cards de resultados comuns.
- Footer de conversores.

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
