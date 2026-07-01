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

Proxima etapa ativa:

- **Etapa DevUtility Lab Tools**
- Sprints: **18.34 a 18.43**
- Escopo: DevUtility home, Structured Data Formatter, Base64 Converter, JWT Inspector, Regex Tester, Text Diff, Cron Helper, UUID Generator, Timestamp Converter e Hash Generator.

## Sprints da proxima etapa

### Sprint 18.34 - DevUtility home

- Refazer como developer workbench.
- Inspiracao em CodeBeautify: navegacao densa, popular tools, recent tools e search.
- Remover `No storage or logging`, `planned`, `billing`, `ads` do topo.
- Manter privacidade com selo curto: `Runs locally when possible`.
- Footer com Developer Tools, Formatters, Encoders, Validators, Generators e Security.

### Sprint 18.35 - Structured Data Formatter

- Layout split editor: input a esquerda, output a direita.
- Abas JSON/XML/YAML/CSV no topo do editor.
- Botoes: Format, Minify, Validate, Copy, Download e Clear.
- Mostrar erro inline.
- Output com tree/table/raw tabs.
- Remover linguagem comercial do topo.

### Sprint 18.36 - Base64 Converter

- Layout input/output lado a lado.
- Botoes Encode, Decode, Swap e Copy.
- Mostrar byte length e validacao UTF-8.
- Privacy note discreta abaixo.

### Sprint 18.37 - JWT Inspector

- Campo de token grande.
- Separar header, payload e signature em cards.
- Destacar que decode nao e verify.
- Mostrar claims comuns: exp, iat, iss, aud e sub quando houver.
- Nao armazenar token.

### Sprint 18.38 - Regex Tester

- Inspiracao em Regex101 sem copiar: pattern, flags, test string e matches.
- Destacar grupos, contagem e indices.
- Worker/timeouts para evitar regex pesada.
- Adicionar `Copy pattern` e exemplos.

### Sprint 18.39 - Text Diff

- Dois inputs lado a lado.
- Resultado diff com added/removed/unchanged.
- Modo unified/split.
- Copy/download diff.

### Sprint 18.40 - Cron Helper

- Campo cron e traducao humana imediata.
- Listar proximas execucoes.
- Explicar timezone/UTC.
- Exemplos comuns.

### Sprint 18.41 - UUID Generator

- Gerar imediatamente no carregamento.
- Botoes Generate, Copy all e Download.
- Quantidade configuravel com limite.
- Opcoes v4 e futuras versoes apenas se implementadas corretamente.

### Sprint 18.42 - Timestamp Converter

- Detectar timestamp atual automaticamente.
- Inputs para seconds/ms/ISO.
- Resultado UTC, local e selected timezone.
- Copy buttons por formato.

### Sprint 18.43 - Hash Generator

- Input local; algoritmos MD5/SHA-1/SHA-256/SHA-512 conforme suporte.
- Aviso claro de que MD5/SHA-1 nao sao recomendados para seguranca.
- Output com copiar individual.

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
