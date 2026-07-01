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

Proxima etapa ativa:

- **Etapa CalcHarbor Tools**
- Sprints: **18.29 a 18.33**
- Escopo: CalcHarbor home, Loan Payment Calculator, Break-even Point Calculator, Gross Margin Calculator e ROI Calculator.

## Sprints da proxima etapa

### Sprint 18.29 - CalcHarbor home

- Criar hub denso de calculadoras, inspirado em Calculator.net, mas visual premium.
- Topo com busca de calculadora.
- Categorias: Finance, Business, Marketing, Commerce, Time/Date, Units.
- Remover `Workflow checks ready`, `ads/checkout inactive`.
- Adicionar popular calculators e all calculators.
- Preparar footer com calculadoras por categoria.

### Sprint 18.30 - Loan Payment Calculator

- Melhorar visual de calculadora com input a esquerda e resultado a direita em desktop.
- Resultado principal grande: monthly payment.
- Tabela de amortizacao resumida opcional.
- Grafico simples de principal vs interest.
- Formula abaixo, nao como destaque excessivo no topo.
- Remover `commercial features planned`.
- Adicionar Copy result, Download summary e Compare scenarios.

### Sprint 18.31 - Break-even Point Calculator

- Resultado principal: break-even units e revenue.
- Grafico de linha ou area mostrando prejuizo/lucro por volume.
- Tabela de cenarios.
- Explicacao leiga antes da formula tecnica.
- CTA para salvar/exportar como upgrade futuro abaixo.

### Sprint 18.32 - Gross Margin Calculator

- Resultado principal: gross margin % e gross profit.
- Mostrar diferenca entre margin e markup visualmente.
- Adicionar cenario com aumento/reducao de custo.
- Corrigir copy e localizacao.

### Sprint 18.33 - ROI Calculator

- Resultado principal: ROI % e net return.
- Adicionar tempo/periodo opcional ou nota clara se nao anualiza.
- Cenario conservador/base/agressivo.
- Export summary e related calculators.

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
