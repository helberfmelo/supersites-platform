# SitePulse Lab Monetization Refinement Plan

Data-base: 2026-06-27

## References

- Uptime/status page SaaS products.
- GTmetrix monitoring/history upsell.

## P0

- Add gated CTAs for uptime monitoring, incidents, status page, alerts, history, multi-region and reports.
- Keep free one-off test complete.
- Keep ads/support away from URL input, diagnostics and recommendations.

## P1

- Define plan limits for monitor count, frequency, regions and alert channels.
- Add dashboard backlog for worker/probe runtime.

## P2

- Activate monitors only after billing, workers, retention, alert and deploy gates.

## Impact expected

Strong paid fit for recurring availability/performance needs.

## Technical risk

High for future recurring probes and alerts.

## AdSense/compliance risk

Medium to high if diagnostics look like intrusive scanning. Keep scope bounded and documented.

## Tests needed

- Verify no recurring probes or alert delivery.
- Verify no checkout/ad serving/payment link.

## Acceptance metrics

- Free one-off status works.
- Uptime/history features remain gated.
- Real workers remain disabled.

## Dashboard backlog

- Uptime worker gate.
- Alert delivery gate.
- Status page product gate.

## Sprint 7.10 execution notes

- Monitoring, incidents, status pages, alerts, history, multi-region probes and reports remain gated/inert upgrade messaging.
- Free one-shot diagnostics remain complete without signup.
- No checkout, billing provider, ad serving, donation/support payment, affiliate link or paid API was activated.

## Sprint 9.11 execution notes

- The free home report now gives a complete one-shot status/performance answer without account creation.
- Uptime monitoring, incident workflow, status page, alerts, history and multi-region checks are still presented only as inert workflow upgrade paths.
- No checkout, billing provider, ad serving, donation/support payment, affiliate link, paid API, external analytics or production worker was activated.
