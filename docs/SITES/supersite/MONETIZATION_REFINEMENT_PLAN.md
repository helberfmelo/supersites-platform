# SuperSites Hub Monetization Refinement Plan

Data-base: 2026-06-27

## References

- AdSense dashboard/readiness patterns.
- Stripe/billing dashboards for plan and entitlement clarity.
- Product catalogs that separate discovery from upsell.

## P0

- Show AdSense readiness and billing readiness in admin without activating providers. Sprint 7.2 adds benchmark monetization readiness/backlog while keeping providers inactive.
- Keep public Hub ad placeholders gated and away from interactive controls.
- Add donation/affiliate planning as gated backlog, not live links.

## P1

- Add per-site monetization readiness score.
- Add missing-gate explanations with links to `docs/HUMAN_ACTION_REQUIRED.md`.

## P2

- Add provider-backed metrics only after accounts, consent, imports and policies are approved.

## Impact expected

Operators can see what blocks revenue without creating policy or compliance risk.

## Technical risk

Low if reusing existing readiness tables; medium if new tables are added.

## AdSense/compliance risk

Low while placeholders remain inert and no revenue claims are shown.

## Tests needed

- Admin views should not expose provider ids, secrets, emails, payment data or PII.
- Secret scan and policy checks.

## Acceptance metrics

- Real ad serving count remains `0`.
- Checkout and webhook count remain `0`.
- Donation and affiliate links remain `not_configured` unless future human approval exists.

## Dashboard backlog

- AdSense gates by site.
- Billing gates by provider/site.
- Donation provider gate.
- Affiliate link approval gate.
