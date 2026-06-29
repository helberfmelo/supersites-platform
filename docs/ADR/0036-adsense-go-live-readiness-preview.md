# ADR 0036 - AdSense go-live readiness preview

## Status

Accepted on 2026-06-29.

## Context

Phase 15 starts provider and monetization go-live, but AdSense account actions remain gated by legal beneficiary, duplicate-account checks, terms, tax profile, payment profile, bank verification and PIN. Publishing a public `ads.txt`, submitting sites for review or enabling ad serving are provider-facing actions and must not happen automatically from the repository.

## Decision

Add an authenticated AdSense go-live readiness snapshot at `/api/v1/adsense/go-live-readiness` behind `dashboard.view`.

The snapshot computes account readiness, validates `ca-pub-0000000000000000` publisher ids, exposes an `ads.txt` preview line only when the publisher account is ready, and summarizes site-level readiness for human review. It always reports:

- `provider_activation=false`
- `side_effects=none`
- `public_file_published=false`
- `should_submit_automatically=false`
- `automatic_ad_serving_enabled=false`

The admin dashboard shows the same compact readiness summary, and `@supersites/ads` owns the deterministic Google `ads.txt` line helper for shared validation.

## Consequences

- Operators can prepare the exact `ads.txt` line and site review checklist without publishing files or calling Google.
- Invalid publisher ids never produce an `ads.txt` line.
- Real `ads.txt` publication, Management API usage, site submission, Auto Ads/manual ads and ad serving remain manual/human-gated actions.
- No public AdSense snippet, iframe, request, account mutation or revenue path is activated by this sprint.
