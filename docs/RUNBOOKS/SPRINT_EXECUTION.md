# Sprint Execution Runbook

Data-base: 2026-06-30

Este runbook define a cadencia atual do SuperSites enquanto o projeto ainda nao foi divulgado publicamente.

## Estado operacional atual

- `opentshost.com/supersites` e as subpastas dos apps sao producao tecnica, mas ainda funcionam como ambiente interno de desenvolvimento/publicacao.
- O risco de quebrar temporariamente uma pagina publica e baixo porque o projeto ainda nao esta divulgado para usuarios finais.
- A prioridade operacional atual e velocidade de evolucao, nao preservacao impecavel de uma producao com trafego.
- Continuam bloqueados: segredos no Git, perda de dados, ativacao real de AdSense, checkout, pagamento, doacao real, afiliado real, provider externo, KYC, impostos, banco, aceite juridico, compra ou acao irreversivel.

## Conceitos

- `Quality Gate`: workflow de CI apos o push. Ele valida o commit no GitHub de forma path-aware.
- `Deploy Dry Run`: ensaio de empacotamento/deploy sem trocar producao. No fluxo atual, usar apenas quando o dono pedir ou quando a etapa mexer em deploy, manifesto, base path, secrets, primeiro deploy de app ou rollback.
- `Smoke publico`: checagem curta de URL real depois de deploy. No fluxo atual, usar apenas quando o dono pedir, quando o objetivo for publicar a etapa, ou quando a etapa mexer em rotas/deploy.

## Cadencia padrao por etapa

O fluxo padrao nao e mais sprint por sprint. O fluxo padrao e:

1. Escolher a etapa ativa.
2. Executar todas as sprints dessa etapa em sequencia.
3. Fazer validacao minima local.
4. Fazer um commit objetivo da etapa.
5. Push.
6. Monitorar o `Quality Gate`.
7. Fazer deploy/monitoramento somente se a etapa precisar aparecer no HostGator ou se o dono pedir.
8. Seguir para a proxima etapa.

Nao fazer commit, push, deploy, dry run, crawler, screenshots ou fechamento documental a cada sprint individual. Se uma etapa estiver grande demais para esse fluxo, o dono avisara antes e a etapa sera quebrada em lotes.

## Validacao minima padrao

Por padrao, use apenas checks leves:

- `git status`;
- revisao do diff;
- `git diff --check`;
- teste/build focado somente se o proprio diff indicar alto risco imediato de quebra sintatica ou de empacotamento.

Nao rodar por padrao:

- crawler benchmark quick/full;
- Lighthouse/PageSpeed/GTmetrix;
- Playwright/E2E;
- screenshots desktop/mobile;
- validacao visual profunda;
- todos os package tests;
- build de todos os apps;
- deploy dry run;
- smokes publicos;
- relatorios longos de evidencia.

O dono do projeto fara a validacao visual/produto depois e pedira validacoes adicionais quando necessario.

## Quando elevar validacao

Rodar validacoes profundas somente quando uma destas condicoes existir:

- o dono pedir explicitamente;
- a etapa for de QA, auditoria, fechamento de fase, performance, acessibilidade, SEO tecnico ou pre-divulgacao;
- houver risco de segredo, dados, pagamento, provider externo, AdSense real, checkout, webhook real, storage de upload ou acao irreversivel;
- a etapa alterar scripts/workflows de deploy, manifestos, base path, DNS/root mapping, rollback, `.htaccess`, runtime VPS ou migrations;
- a etapa criar/remover muitas rotas geradas, sitemap, canonical/hreflang ou shell global.

## Documentacao

- Atualizar docs fonte da verdade quando uma regra operacional, roadmap, criterio de aceite, pendencia humana ou decisao mudar.
- Evitar fechamento documental por sprint individual.
- `STATUS.md` e `METRICS.md` devem ser atualizados em fechamento de etapa/fase, release relevante, mudanca operacional ou quando o dono pedir.
- Preferir um unico commit de etapa com codigo e docs relacionados.

## Stop conditions

Mesmo com risco publico relaxado, parar e pedir orientacao quando houver:

- segredo real exposto;
- risco de perda de dados;
- acao irreversivel;
- ativacao de provider externo, pagamento, AdSense real, checkout, doacao real ou afiliado real;
- deploy que exige credencial/decisao humana nao disponivel;
- incerteza sobre impacto em outro projeto fora do SuperSites.
