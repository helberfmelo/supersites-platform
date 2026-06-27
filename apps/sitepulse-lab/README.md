# SitePulse Lab

SitePulse Lab is the Sprint 4.4 one-shot website diagnostics MVP.

- Free tools: HTTP status, redirect chain, security headers, robots.txt, sitemap, TTFB and a bounded performance snapshot.
- Backend: one public control-plane endpoint under `/api/v1/sitepulse/probe`, rate-limited and SSRF-guarded.
- Privacy: URLs and probe results are never sent to analytics; client events include only `tool_slug`, route and locale.
- Gated upgrades: recurring uptime, incidents, status pages, alerts, history, multi-region probes, reports, billing, ads and external analytics.
