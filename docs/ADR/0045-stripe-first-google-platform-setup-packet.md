# ADR 0045 - Stripe-first billing and Google platform setup packet

## Status

Accepted on 2026-07-03.

## Context

Phase 24 originally kept Pagar.me as a BRL/Brazil candidate while Stripe, Mercado Pago and Paddle were already represented in the billing foundation. On 2026-07-03, the owner clarified that Stripe can be used instead of Pagar.me.

The owner also provided a Google account credential for creating required Google platforms. Project rules still require human action for legal acceptance, identity, tax, bank, PIN, domain verification, provider-side setup and any irreversible activation.

## Decision

Use Stripe as the primary payment provider for the current go-live path. Keep Pagar.me out of the active billing contract unless a future explicit decision reopens it.

Add `pnpm ops:google-platform-setup-packet` as a local artifact generator. The packet lists recommended GA4, GTM, Search Console and AdSense setup targets for a human operator, but it does not log in, call Google APIs, accept terms, create properties, verify ownership, publish tokens, insert snippets, publish `ads.txt`, submit sites or activate ad serving.

## Consequences

- Stripe remains the governed path for the already-approved one-time donation Checkout and for future paid plans/services after separate gates.
- Pagar.me remains credential inventory/backlog only.
- Google setup can be prepared without exposing credentials or mutating provider state.
- GA4/GTM/Search Console/AdSense stay fail-closed until human legal/provider gates are complete and IDs/tokens are stored only in secret manager/environment.
