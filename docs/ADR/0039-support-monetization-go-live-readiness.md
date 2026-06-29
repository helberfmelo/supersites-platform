# ADR 0039 - Support monetization go-live readiness

## Status

Accepted on 2026-06-29.

## Context

Phase 15 includes support/donation and affiliate go-live, but beneficiary identity, provider account setup, KYC, taxes, terms, disclosures, privacy copy, affiliate policy review and public link approval remain human-gated. The platform needs an authenticated readiness view without publishing payment links, affiliate URLs, widgets, QR/PIX payloads or webhooks.

## Decision

Add local `support_monetization_channels` readiness records for `donation` and `affiliate` channels per public site, seeded in fail-closed mode.

Add an authenticated readiness snapshot at `/api/v1/monetization/support/go-live-readiness` behind `dashboard.view`.

The snapshot validates channel type, account, terms, tax, disclosure, privacy, policy, destination URL and human approval statuses. It always reports:

- `provider_activation=false`
- `side_effects=none`
- `public_links_enabled=0`
- `real_donation_payments_enabled=0`
- `real_affiliate_links_enabled=0`
- `widgets_loaded=0`
- `webhooks_enabled=0`
- `should_publish_link=false`
- `should_load_widget=false`
- `should_enable_webhook=false`
- `should_track_affiliate=false`

The admin dashboard shows support monetization readiness next to the provider go-live panels. `@supersites/ads` owns deterministic channel normalization and URL sanitization for future public-link review.

## Consequences

- Operators can see donation/affiliate readiness without exposing public monetization links.
- Future destination URLs are sanitized for preview without credentials, query strings or fragments.
- Public surfaces continue to have zero donation links, affiliate links, payment widgets, QR/PIX payloads, provider scripts or support-payment webhooks.
