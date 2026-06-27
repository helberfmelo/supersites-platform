# MailHealth

Email authentication and deliverability diagnostics for the SuperSites portfolio.

Sprint 4.3 scope:

- Nuxt SSG/SSR app with seven free checks: SPF, DKIM, DMARC, MX, blacklist sample, SMTP reachability and header analysis.
- Five localized route sets with sitemap, canonical, hreflang and structured data.
- Header analysis runs in the browser and does not call a product API.
- DNS, DNSBL and SMTP checks use bounded control-plane API endpoints with public-host validation, cache, short timeouts and a dedicated rate limit.
- Analytics events are limited to tool lifecycle metadata and `tool_slug`; domains, selectors, headers, hosts and results are not sent.

Not active in Sprint 4.3:

- Accounts, saved domains, history, recurring monitoring, DMARC report ingestion, alerts, batch jobs, public paid API, billing, ads, external analytics, webhooks or production cron/worker rollout.
- Real MailHealth public deploy. The HostGator public URL remains a placeholder until app-specific artifact validation, smoke and rollback exist.
