# AI Growth

Evidence-first growth recommendation helpers for SuperSites.

This package is deterministic and local-only. It does not call external AI
providers, does not generate publishable content, and never auto-applies SEO,
ads, billing, analytics or deployment changes.

Every recommendation must include:

- evidence
- impact score
- effort score
- confidence score
- risk score

Missing evidence or scores blocks the recommendation. Human-gated work remains
closed until the relevant operational document records the required approval.

Sprint 16.2 adds `resolveGrowthPriorityGate` for authenticated priority review.
It keeps provider-data prioritization, causal claims and automation fail-closed.
