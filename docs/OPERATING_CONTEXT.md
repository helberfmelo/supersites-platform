# Operating Context

Fonte operacional compacta para leitura obrigatoria.

## Estado atual

- Projeto ainda nao divulgado publicamente.
- `https://opentshost.com/supersites/` e subpastas sao producao tecnica interna de desenvolvimento.
- Risco publico de quebrar UI/rotas temporariamente e relaxado ate divulgacao explicita.
- Prioridade atual: evoluir rapido, com cadencia por etapa.

## Cadencia obrigatoria atual

- Executar a etapa ativa inteira, incluindo todas as sprints planejadas nela.
- Depois fazer validacao minima local, commit objetivo e push.
- Ao fim de implementacao ou correcao que afete um app/site publicado no HostGator, acionar o deploy especifico desse alvo e monitorar o resultado.
- `Quality Gate` e `Deploy Dry Run` nao rodam automaticamente em `push`; usar manualmente somente em PR, release, fechamento, quando o owner pedir ou quando o risco da etapa justificar.
- Nao fazer commit/push/deploy por sprint individual, salvo orientacao explicita do owner.
- Se uma etapa for grande demais para esse fluxo, o owner avisara antes.

## Validacao padrao

- Padrao minimo: `git status`, revisao do diff e `git diff --check`.
- Teste/build focado apenas quando o diff indicar risco imediato de erro sintatico, import quebrado ou empacotamento.
- Nao rodar por padrao: screenshots, Playwright/E2E, crawler, Lighthouse/PageSpeed/GTmetrix, Quality Gate, deploy dry-run, smokes publicos, todos os package tests, build de todos os apps ou relatorios longos.
- O owner valida visual/produto depois e pede validacoes profundas quando quiser.

## Gates que continuam rigidos

- Nunca versionar segredos.
- Nao ativar AdSense real, checkout, pagamento, doacao real, afiliado real, provider externo, webhook externo real, storage de upload, KYC, impostos, banco, compra, aceite juridico ou acao irreversivel sem gate humano.
- Registrar `HUMAN_ACTION_REQUIRED` quando houver dependencia humana/irreversivel.
- Nao alterar projetos de referencia.

## Quando consultar docs longos

- Consultar `docs/RUNBOOKS/RISK_BASED_REFERENCE_INDEX.md` somente quando a etapa tocar seguranca, dados, billing, ads, SEO tecnico, deploy, provider externo, VPS, analytics, juridico, metricas ou fechamento de fase.
- Historico operacional completo preservado em `docs/archive/OPERATING_CONTEXT_FULL_2026-06-30.md`.
