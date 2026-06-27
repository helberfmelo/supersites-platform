# MailHealth

Email authentication and deliverability diagnostics for the SuperSites portfolio.

Current local MVP scope:

- Nuxt SSG/SSR app with seven free checks: SPF, DKIM, DMARC, MX, blacklist sample, SMTP reachability and header analysis.
- Five localized route sets with sitemap, canonical, hreflang and structured data.
- Header analysis runs in the browser and does not call a product API.
- DNS, DNSBL and SMTP checks use bounded control-plane API endpoints with public-host validation, cache, short timeouts and a dedicated rate limit.
- Analytics events are limited to tool lifecycle metadata and `tool_slug`; domains, selectors, headers, hosts and results are not sent.

Not active:

- Accounts, saved domains, history, recurring monitoring, DMARC report ingestion, alerts, batch jobs, public paid API, billing, ads, external analytics, webhooks or production cron/worker rollout.
- Recurring monitors, alert routing, DMARC ingestion and paid API remain inactive even though the public HostGator static app is live with artifact validation, smoke and rollback.

Sprint 7.9 benchmark refinement:

- Tool pages include a health score, signal checklist, severity labels, fix guidance, planned record-builder boundaries and related-check links.
- Public copy avoids sprint-internal labels while preserving gates for monitoring, API, white-label, billing and external analytics.
