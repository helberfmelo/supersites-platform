# Provider/Growth Readiness Smoke

## Objetivo

Validar em um unico smoke local que os endpoints autenticados de go-live e growth loop continuam fail-closed antes de qualquer ativacao real de provider, monetizacao, automacao ou relatorio recorrente.

## Comando

```powershell
pnpm ops:provider-growth-readiness-smoke
```

O comando executa `ProviderGrowthReadinessSmokeTest` no Laravel control-plane e grava artefatos locais em:

- `artifacts/provider-growth-readiness/provider-growth-readiness.json`
- `artifacts/provider-growth-readiness/provider-growth-readiness.md`

## Superficies cobertas

- `/api/v1/adsense/go-live-readiness`
- `/api/v1/google/go-live-readiness`
- `/api/v1/billing/go-live-readiness`
- `/api/v1/monetization/support/go-live-readiness`
- `/api/v1/growth/ingestion-readiness`
- `/api/v1/growth/priorities`
- `/api/v1/growth/automation-readiness`
- `/api/v1/growth/reporting-readiness`

## Invariantes

O smoke deve falhar se qualquer superficie deixar de declarar:

- `side_effects=none`
- `provider_activation=false`
- anuncios, tags, checkout, widgets, webhooks, imports, workers, PRs, publicacoes, envio de email e causalidade automatica desligados
- contadores de side effects reais em `0`
- flags `should_*` de execucao real em `false`

## Limites

Este smoke usa seeders e banco de teste. Ele nao faz login em producao, nao chama provedores externos, nao publica arquivos, nao cria checkout, nao inicia workers/crons, nao abre branch/PR e nao envia relatorios.

## Quando rodar

- Depois de alterar readiness de AdSense, Google, billing, suporte monetizado ou growth loop.
- Antes de qualquer sprint que prepare provider go-live.
- Como evidencia local antes de push quando o escopo tocar endpoints autenticados do control-plane.

## Falha

Se falhar, trate como bloqueio de sprint ate identificar qual endpoint mudou a postura fail-closed. Nao continue para provider real, deploy real, worker recorrente, ad serving, checkout ou automacao enquanto o smoke estiver vermelho.
