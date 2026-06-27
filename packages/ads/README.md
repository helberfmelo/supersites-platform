# Ads

Shared AdSense placement policy, reserved placeholder sizing, account readiness
and launch gates.

Sprint 6.1 keeps every slot inert by default. The package can decide whether a
manual slot is safe to reserve, but it does not load AdSense, GTM, GA4 or any
external script.

Sprint 6.3 adds a fail-closed AdSense readiness contract for one publisher
account, Management API approval and per-site review planning. It validates
publisher id shape and separates "ready to request human site review" from
"ready to serve ads"; no site is submitted automatically and no ad serving is
enabled by this package.
