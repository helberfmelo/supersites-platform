# ADR 0018 - QRRoute Static MVP and Redirect Guard

Date: 2026-06-26

## Status

Accepted.

## Context

Sprint 4.1 starts QRRoute, the first workflow-paid product in Phase 4. The free MVP must solve the basic need without signup: static QR, barcode, UTM builder, vCard, Wi-Fi and preview.

The paid roadmap includes dynamic QR codes, short links, analytics, custom domains and batch workflows. Those features require a redirect service, abuse controls, retention rules, billing and operational monitoring before public traffic can be switched.

## Decision

Build the free QRRoute frontend as a Nuxt SSG app that generates static payloads and SVG previews in the browser. It must not create short links, hide redirects, store payloads, activate ads, activate billing or send payload contents to analytics.

Prepare a bounded Laravel redirect module inside `apps/control-plane` only as tested foundation:

- `qr_route_links` stores future dynamic link definitions with destination hash and aggregate click count.
- `/api/v1/qrroute/r/{code}` redirects only active, unexpired links.
- `QrRouteDestinationGuard` blocks non-HTTP(S) schemes, embedded credentials, localhost/private hostnames, private IPs and reserved IP destinations.
- The redirect route has a dedicated `qrroute-redirect` rate limiter.
- Redirect responses add `Referrer-Policy: no-referrer` and `X-Robots-Tag: noindex, nofollow`.

No QRRoute real deploy, worker, billing, custom domain, analytics provider or public short-link creation is activated in Sprint 4.1.

## Consequences

- The free MVP is useful locally/CI without account or backend dependency.
- Future dynamic QR work starts from a tested antiabuse redirect contract.
- The control-plane temporarily hosts the redirect foundation, similar to the NetProbe bounded module pattern.
- Before public dynamic links, QRRoute still needs customer auth, billing/entitlements, abuse review workflow, retention/export/deletion rules, operational monitoring, app-specific deploy/rollback/smoke and public legal review.
