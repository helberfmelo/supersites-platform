# NetProbe Atlas Sprint Plan

Data-base: 2026-06-28

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

## Scope

- DNS propagation UX refinement.
- What is my IP UX refinement.
- Related tools, educational content, safe support/ads placeholders and upgrade CTAs.
- Sprint 9.5 adds visual DNS record tabs, task-first workbench layout, visual IP panel, inline privacy CTA, related checks, resolver coverage grid and honest bounded-coverage copy.

## Validation

- NetProbe frontend tests/build/preview/Playwright.
- Backend tests if endpoint contracts change.
- `pnpm validate:netprobe-preview`
- `pnpm test:e2e:netprobe`
- `pnpm deploy:smoke-netprobe-public` after push.
- Standard structure/secrets/dry-run/ci/diff gates.

## Gates

- Do not activate new probes, workers, paid API, external DNS networks, AdSense serving, donation payment or checkout.
- Do not store raw targets in analytics or dashboard opportunity records.
