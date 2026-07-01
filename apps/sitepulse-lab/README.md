# SitePulse Lab

SitePulse Lab is the one-shot website diagnostics app for the SuperSites portfolio.

- Free tools: HTTP status, redirect chain, security headers, robots.txt, sitemap, TTFB and a bounded performance snapshot.
- Backend: one public control-plane endpoint under `/api/v1/sitepulse/probe`, rate-limited and SSRF-guarded.
- Privacy: URLs and probe results are never sent to analytics; client events include only `tool_slug`, route and locale.
- Account workflows: recurring uptime, incidents, status pages, alerts, history, multi-region probes, reports, payments, advertising and external analytics.

Benchmark refinement:

- Tool pages include a Pulse score, signal checklist, severity labels, technical tabs, recommended actions, account workflow copy and related checks.
- Public copy avoids sprint-internal labels while preserving antiabuse, commercial and deployment boundaries.
