# NetProbe Atlas Sprint Plan

Data-base: 2026-06-30

## Real sprint

- Symbol: BR-NETPROBE.
- Real number: Sprint 7.3.
- Must run after: Sprint 7.2.
- Current benchmark-grade sprint: BGR-NETPROBE-P0, Sprint 9.5.

## Current state

- Public NetProbe frontend live at `https://opentshost.com/supersites/netprobe-atlas/`.
- Public control-plane/API supports bounded NetProbe IP/DNS/RDAP/SSL/propagation/port/reachability.
- Upgrade monitor MVP exists in control-plane but production workers/billing remain gated.
- Sprint 7.3 benchmark UX is implemented and closed.
- Sprint 9.5 benchmark-grade DNS/IP UX is implemented, deployed and publicly smoke-tested: Quality Gate `28316321439`, Deploy Dry Run `28316321508` and NetProbe deploy `28316402512` passed.
- Phase 18 sprints 18.23 to 18.28 are implemented in the current branch for DNS Propagation, DNS Lookup, RDAP Domain Lookup, SSL Certificate Checker, Port Checker and Ping/Traceroute.

## Scope

- DNS propagation, DNS lookup, RDAP, SSL, port and reachability UX refinement.
- Answer-first result cards, safe copy/export actions, related checks, methodology below the answer and richer topical footer links.
- DNS Propagation is the primary NetProbe Atlas workflow, followed by What is my IP and then the remaining diagnostics.
- DNS record controls mirror the current endpoint allowlists. DNS Propagation exposes A/AAAA/CNAME/MX/NS/PTR/SOA/SRV/TXT/CAA and keeps controlled-coverage disclosure below the useful result rather than simulating worldwide coverage.
- Safe support block and inert sponsor reserve after the useful result path; no real donation, checkout, ad request or provider widget is active.

## Validation

- For the scoped Phase 18 NetProbe Tools stage: `pnpm test:netprobe`, `pnpm build:netprobe`, `pnpm validate:public-copy` and `git diff --check`.
- Backend tests if endpoint contracts change.
- Preview, Playwright, crawler, Lighthouse and public smoke stay opt-in unless the stage is QA/pre-disclosure/closure, changes high-risk surfaces or requires publication.
- Standard structure/secrets/dry-run/ci gates apply when the stage includes release/deploy, cross-package risk or explicit owner request.

## Gates

- Do not activate new probes, workers, paid API, external DNS networks, AdSense serving, donation payment or checkout.
- Do not store raw targets in analytics or dashboard opportunity records.
- Do not simulate worldwide DNS propagation, ICMP ping/traceroute hops or arbitrary port scanning beyond the bounded public endpoint behavior.
