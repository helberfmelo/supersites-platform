# ADR 0041 - Growth priority readiness

## Status

Accepted on 2026-06-29.

## Context

Phase 16 must turn the continuous growth loop into an operator workflow, but real GA4, Search Console, AdSense and billing data imports remain blocked by provider access, vault tokens, quotas, data contracts, retention rules and human approval. The platform already stores local AI growth recommendations and provider ingestion readiness; it needs a single authenticated priority snapshot without inventing data, inferring causality or starting automation.

## Decision

Add a growth priority readiness contract for Sprint 16.2.

- `@supersites/ai-growth` exports `growthPriorityContractVersion` and `resolveGrowthPriorityGate`.
- The control-plane exposes `GET /api/v1/growth/priorities` behind authentication and `dashboard.view`.
- `GrowthPriorityReadiness` ranks existing `ai_growth_recommendations` by the deterministic model `impact_confidence_minus_effort_risk`.
- The snapshot combines recommendation evidence with `growth_provider_ingestions` data status.
- Local recommendations can be marked `local_evidence_only`; provider-backed review can be marked `real_data_ready` only when a source has `data_status=finalized`.
- Every snapshot reports `causality_status=not_inferred`, `automatic_prioritization_enabled=false`, `automatic_pr_creation_enabled=false`, `should_auto_apply=false` and `should_create_pr=false`.

## Consequences

Operators can review a single prioritized queue without enabling provider imports, external AI, workers, PR automation, checkout, ads, billing, donations or public content changes. Finalized provider data can inform future operator review, but it still does not authorize causal claims or automated execution. Real-data prioritization, causal attribution and automation require explicit human/data-governance gates before go-live.
