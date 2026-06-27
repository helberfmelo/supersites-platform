# SitePulse Lab

SitePulse Lab is the one-shot website diagnostics MVP for the SuperSites portfolio.

- Free tools: HTTP status, redirect chain, security headers, robots.txt, sitemap, TTFB and a bounded performance snapshot.
- Backend: one public control-plane endpoint under `/api/v1/sitepulse/probe`, rate-limited and SSRF-guarded.
- Privacy: URLs and probe results are never sent to analytics; client events include only `tool_slug`, route and locale.
- Gated upgrades: recurring uptime, incidents, status pages, alerts, history, multi-region probes, reports, billing, ads and external analytics.

Sprint 7.10 benchmark refinement:

- Tool pages include a Pulse score, signal checklist, severity labels, technical tabs, recommended actions, gated monitoring workflow copy and related checks.
- Public copy avoids sprint-internal labels while preserving antiabuse, billing, ads and deployment gates.
