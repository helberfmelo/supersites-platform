# Executive Reports

Deterministic contracts for SuperSites weekly and monthly executive reports.

The package keeps report exports safe by requiring item-level evidence, explicit data status labels and a fail-closed stance on causality. It does not fetch provider data, send reports, schedule jobs or activate external analytics, billing, ads or AI.

Sprint 12.4 adds source classification for report evidence. Allowed sources are internal documents, public watchdog artifacts, local measurement artifacts, control-plane seeders and explicit `provider-unavailable:*` markers. Active provider sources such as GA4, Search Console, AdSense or billing APIs remain blocked until the relevant human gates exist.
