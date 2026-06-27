# ADR 0028 - AI growth evidence engine

Date: 2026-06-27
Status: Accepted

## Context

Sprint 6.5 adds growth prioritization for technical audits, SEO, AIO, monetization readiness and anomaly review. The platform must not outsource data to an AI provider, infer causality from thin signals, publish content automatically, mutate ads/billing/SEO configuration or store PII/secrets while the compliance and provider gates are still closed.

## Decision

Create `@supersites/ai-growth` as a local deterministic contract for evidence-backed recommendations. Every recommendation requires evidence plus impact, effort, confidence and risk scores. Missing evidence or scores blocks the recommendation; human-gated items remain `human_required`; automation is always disabled. Add control-plane storage for `ai_growth_audits`, `ai_growth_recommendations` and `ai_growth_anomalies`, seeded only with local readiness evidence from docs/runbooks/gates and no raw tool input, customer data, provider traces, secrets or PII.

## Consequences

The admin can review prioritized, evidence-first growth work and anomaly watch items without enabling external AI, automated publishing, ad serving, billing, checkout, Search Console import or provider-side mutation. Future AI providers, automated recommendations, publishing, SEO/ad/billing changes, prompts with operational data and recurring growth workers require `HUMAN_ACTION_REQUIRED`, data-governance review, cost/legal approval, secrets in an approved store and production smoke/rollback.
