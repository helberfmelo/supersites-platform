# ADR 0042 - Growth automation readiness

## Status

Accepted on 2026-06-29.

## Context

Phase 16 includes safe growth automation, but automatic branches, pull requests,
auto-merge, direct publishing, provider imports and external AI remain gated by
data governance, review policy, green CI requirements and human approval. The
platform needs an authenticated view of low-risk work that could later be
reviewed for a PR without creating any repository or production side effect.

## Decision

Add a growth automation readiness contract for Sprint 16.3.

- `@supersites/ai-growth` exports `growthAutomationContractVersion` and
  `resolveGrowthAutomationGate`.
- The control-plane exposes `GET /api/v1/growth/automation-readiness` behind
  authentication and `dashboard.view`.
- `GrowthAutomationReadiness` evaluates existing local
  `ai_growth_recommendations` and marks only evidence-backed, non-human-gated
  recommendations with `risk_score <= 2` as `pr_review_only`.
- Every snapshot reports `side_effects=none`, branch creation disabled, pull
  request creation disabled, auto-merge disabled and direct publish disabled.
- Provider data can improve operator context, but it does not enable automation.

## Consequences

Operators can distinguish low-risk candidates from blocked or human-gated work
without opening branches, PRs, merging, publishing, mutating SEO/ads/billing or
calling external AI. Real branch/PR automation, auto-merge, provider-backed
execution and direct publication require explicit human approval, green CI/deploy
policy and a separate go-live decision.
