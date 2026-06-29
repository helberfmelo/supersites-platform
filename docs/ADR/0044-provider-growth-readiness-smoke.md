# ADR 0044 - Provider and Growth Readiness Smoke

## Status

Accepted on 2026-06-29.

## Context

Fases 15 e 16 adicionaram oito superficies autenticadas de readiness para AdSense, Google providers, billing, suporte monetizado e growth loop. Cada endpoint foi testado isoladamente, mas a operacao precisa de uma verificacao transversal que detecte regressao acidental de fail-closed antes de qualquer go-live humano ou tecnico.

## Decision

Adicionar um smoke consolidado local:

- teste Laravel `ProviderGrowthReadinessSmokeTest`;
- comando `pnpm ops:provider-growth-readiness-smoke`;
- artefatos locais em `artifacts/provider-growth-readiness/`;
- runbook `docs/RUNBOOKS/PROVIDER_GROWTH_READINESS_SMOKE.md`.

O smoke cobre os oito endpoints autenticados de readiness e afirma os invariantes globais: `side_effects=none`, `provider_activation=false`, contadores de side effects reais em `0`, flags de execucao `should_*` falsas, sem workers/crons, sem provider externo, sem ad serving, sem checkout, sem webhooks reais, sem branch/PR, sem publicacao e sem causalidade automatica.

## Consequences

Operadores passam a ter um comando unico para validar o conjunto de gates antes de uma fase de go-live. O smoke reduz risco de regressao entre contratos, mas nao substitui testes individuais, revisao humana, cofre de secrets, matriz de dados, smokes publicos, deploy dry-run ou aprovacoes de provider.

Nenhum provider externo, checkout, tag, ad request, link de doacao, afiliado, worker, cron, branch, PR ou envio de relatorio e ativado por esta decisao.
