# MailHealth Monetization Refinement Plan

Data-base: 2026-06-27

## References

- MxToolbox monitoring upsell.
- EasyDMARC/dmarcian report and SaaS upsell.

## P0

- Add gated CTAs for monitoring, alerts, DMARC reports, batch, API and white-label.
- Keep free one-off checks complete.
- Keep ad/support placeholders away from checks and results.

## P1

- Define paid DMARC report data model and retention plan.
- Add provider-policy review backlog for DNSBL and SMTP usage.

## P2

- Activate paid monitoring only after billing, entitlements, workers, retention and legal/provider gates.

## Impact expected

Natural B2B upgrade path for ongoing deliverability monitoring.

## Technical risk

High for future recurring monitoring and DMARC ingestion.

## AdSense/compliance risk

Medium due to technical diagnostics and provider-policy limits.

## Tests needed

- Verify no recurring monitors/alerts are active.
- Verify no checkout/ad serving/payment link.

## Acceptance metrics

- Real billing remains `0`.
- DNSBL checks remain bounded.
- Monitoring is clearly gated.
- Sprint 7.9 exposes monitoring/API/white-label value through inert copy only; no checkout, payment link, DMARC ingestion, alert delivery or recurring worker is active.

## Sprint 9.10 update

- The unified report improves the free diagnostic without signup.
- Paid value remains limited to inactive monitoring, alerts, DMARC report ingestion, batches, API, exports and white-label.
- No checkout, API key issuance, paid entitlement, ad serving or external analytics was activated.
- Production closure kept monetization inert: no billing provider, payment link, ad serving, affiliate link, paid entitlement or external analytics was introduced.

## Dashboard backlog

- DMARC report product gate.
- SMTP/DNSBL provider policy review.
- Monitoring worker gate.
