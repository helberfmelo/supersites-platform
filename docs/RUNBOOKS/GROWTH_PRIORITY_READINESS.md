# Growth Priority Readiness

## Purpose

Prepare Phase 16 prioritization without activating provider imports, external AI or automation.

## Endpoint

- `GET /api/v1/growth/priorities`
- Requires authentication and `dashboard.view`.
- Returns contract `2026-06-29.16.2`.

## Priority Model

Priorities use existing `ai_growth_recommendations` and the deterministic model:

```text
priority_score = (impact_score * confidence_score) - effort_score - risk_score
```

The endpoint also reads `growth_provider_ingestions` to decide whether provider data is still unavailable or has a finalized snapshot for future review.

## Fail-Closed Rules

- No GA4, Search Console, AdSense or billing API request is made.
- No external AI provider is called.
- No prompt, provider payload, token, secret, query, revenue row, impression, click, invoice or customer data is stored.
- `causality_status` remains `not_inferred`.
- `automatic_prioritization_enabled`, `automatic_pr_creation_enabled`, `should_auto_apply` and `should_create_pr` remain false.
- Provider data marked `finalized` can change a priority to `real_data_ready`, but still does not enable automation or causal claims.

## Human Gates Before Real-Data Prioritization

- Provider imports approved per source/site.
- Token or secret stored only in an approved vault/secret manager.
- Data minimization, retention and deletion rules approved.
- Query/page/revenue/customer fields reviewed for privacy and aggregation.
- Causality review contract approved before any before/after claim.
- Automation/PR rules approved separately before any branch creation or auto-merge.

## Validation

Run focused checks before relying on the priority snapshot:

```powershell
pnpm --filter @supersites/ai-growth test
cd apps\control-plane
php artisan test --filter=GrowthPriorityReadinessTest
```

Broader sprint validation must still run `test:packages`, `typecheck:packages`, `php artisan test`, `composer validate --strict`, admin audit, control-plane artifact build, structure/secret checks, deploy dry-run, `ci:changes`, `git diff --check`, `validate:adsense-safe-public`, CI monitoring and public smokes.
