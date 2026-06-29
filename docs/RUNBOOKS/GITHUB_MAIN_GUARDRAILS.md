# GitHub Main Guardrails

Data-base: 2026-06-29

## Objetivo

Manter `main` protegida contra exclusao acidental e pushes nao fast-forward, sem exigir pull request obrigatorio, sem bloquear pushes normais de recuperacao e sem depender de segredos no repositorio.

## Estado da Sprint 11.1

- Branch protection classico em `main`: ausente antes da sprint.
- Rulesets do repositorio antes da sprint: nenhum.
- Estrategia escolhida: ruleset ativo minimo, aplicado ao default branch, com regras `deletion` e `non_fast_forward`.
- Regras propositalmente nao ativadas nesta sprint: pull request obrigatorio, status checks obrigatorios antes de push direto, deploy required, code owners e signed commits.

## Aplicar ou reaplicar

Dry-run:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\sync-github-main-ruleset.ps1
```

Aplicar:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\sync-github-main-ruleset.ps1 -Apply
```

Validar no GitHub:

```powershell
gh api repos/helberfmelo/supersites-platform/rulesets
gh api repos/helberfmelo/supersites-platform/branches/main/protection
```

O segundo comando pode continuar retornando `Branch not protected`, porque esta sprint usa GitHub Rulesets, nao a API classica de branch protection.

## Recuperacao

Se o ruleset bloquear uma operacao legitima, um administrador do repositorio deve:

1. abrir `Settings > Rules > Rulesets`;
2. editar `SuperSites main safety guardrails`;
3. trocar `Enforcement status` para `Disabled` ou remover temporariamente a regra afetada;
4. registrar a acao em `docs/STATUS.md` antes de reabilitar.

Tambem e possivel usar a API do GitHub para alterar `enforcement` para `disabled` quando `gh` estiver autenticado com permissao de administrador.

## Evolucao futura

Um ruleset mais estrito com PR obrigatorio, status checks e code owners so deve ser ativado depois de existir um fluxo de PR/merge que nao prejudique hotfixes, rollback e deploys manuais emergenciais. Ate la, o controle operacional continua sendo Quality Gate monitorado, Deploy Dry Run e smokes publicos.
