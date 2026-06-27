# ADR 0024: Consent and ads gated placeholders

Date: 2026-06-27

## Status

Accepted

## Context

Phase 6 starts monetization work, but the program rules prohibit real ads, external analytics, billing or irreversible account/legal actions before explicit gates. SuperSites also needs a reusable way to reserve ad space without CLS, respect consent, block sensitive surfaces and avoid accidental clicks.

The portfolio already has `@supersites/consent` for consent categories and safe ad placement primitives. Sprint 6.1 needs to extend that foundation and add an ads policy package without loading AdSense, GTM, GA4 or a certified CMP.

## Decision

Add `@supersites/ads` as a shared policy package. It produces an `AdSlotPlan` with separate `shouldRenderPlaceholder` and `shouldRequestAd` flags, reserved responsive dimensions, manual density limits and accidental-click blockers.

Extend `@supersites/consent` with:

- versioned local storage key `supersites.consent.v1`;
- parse/serialize helpers;
- Consent Mode command builders;
- TCF regional gate helpers;
- additional sensitive page surfaces for tools, uploads, legal pages, checkout, account, admin, login and errors.

Render the first Hub CMP and an inert reserved ad placeholder. The placeholder can appear only on public content and must keep `shouldRequestAd=false` until feature flags, delivery gates, consent, AdSense account setup, CMP/TCF requirements and deploy gates are approved.

## Consequences

- No real ad request, impression, click, auction, cookie or third-party script is created in Sprint 6.1.
- Consent choices stay local to the browser unless a future approved provider integration consumes them.
- TCF regions fail closed without a certified CMP.
- Legal pages, tool input/action/preview/result surfaces, uploads, account, checkout, login, admin and errors remain excluded.
- Future GA4/GTM/AdSense work can reuse the same contracts instead of introducing provider logic directly into app components.

## Validation

- Shared package tests cover consent storage, Consent Mode commands, TCF gating, sensitive surfaces, ad slot normalization, reserved dimensions, consent blocking, density and accidental-click risk.
- Hub Playwright verifies CMP controls, local data layer consent events, inert placeholder sizing/status and absence of AdSense/GTM/GA4 external scripts.
- Full local regression for packages, backend, Nuxt apps, preview smokes and Playwright remains required before push.
