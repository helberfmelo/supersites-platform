# Uptime and Incident Response Runbook

## Purpose

This runbook defines how to verify public uptime, triage incidents and record evidence for the transitional SuperSites production surface under `https://opentshost.com/supersites/`.

It does not activate external uptime providers, paid monitoring, workers, crons, ads, billing, checkout, donations, affiliates or analytics providers. It uses repository-owned smokes, GitHub Actions evidence and public read-only probes.

## Surfaces

| Surface | Public URL | Primary smoke |
|---|---|---|
| Hub and app catalog | `https://opentshost.com/supersites/` | `pnpm deploy:smoke-supersite-public` |
| Control-plane/API | `https://opentshost.com/supersites/control-plane/` | `pnpm deploy:smoke-control-plane-public` |
| NetProbe Atlas | `https://opentshost.com/supersites/netprobe-atlas/` | `pnpm deploy:smoke-netprobe-public` |
| AdSense-safe public sample | 13 public pages | `pnpm validate:adsense-safe-public` |
| VPS Redis runtime | `129.121.37.220:22022` via SSH | `scripts/validate-vps-runtime.ps1` |

## Readiness Smoke

Run from the repository root:

```powershell
pnpm ops:uptime-readiness-smoke
```

The command runs the public Hub/API, control-plane/API and NetProbe/API smokes, the AdSense-safe public gate and the VPS runtime validation. It writes:

- `artifacts/uptime-incident-readiness/uptime-incident-readiness.json`
- `artifacts/uptime-incident-readiness/uptime-incident-readiness.md`

Use `-SkipVpsRuntime` only when local SSH credentials are unavailable and public HostGator surfaces are the only incident scope. Record the reason in `docs/STATUS.md` if a sprint closes with that skip.

## Scheduled Visibility

The `Public Watchdog` GitHub Actions workflow runs daily and can be dispatched manually. It executes public smokes, the AdSense-safe gate and the benchmark crawler in quick/full mode. It is visibility only: no deploy, provider call, worker, cron or production mutation.

Manual dispatch:

```powershell
gh workflow run "Public Watchdog" --ref main -f mode=quick
```

## Severity

| Severity | Trigger | Response target |
|---|---|---|
| SEV1 | Hub/control-plane/NetProbe unreachable, public API 5xx, or deploy broke multiple product surfaces | Start triage immediately; rollback or mitigation before new feature work |
| SEV2 | One product app broken, API degraded for MailHealth/SitePulse, AdSense-safe gate fails, or VPS Redis unavailable while production monitors depend on it | Triage same work session; rollback if user-facing break persists |
| SEV3 | Single localized route, SEO metadata, crawler warning, or non-critical visual regression | Record and schedule fix in next sprint unless monetization/compliance is affected |

## Triage Flow

1. Freeze unrelated deploys and edits.
2. Run `pnpm ops:uptime-readiness-smoke`.
3. Check recent GitHub Actions runs:

```powershell
gh run list --branch main --limit 10
```

4. Inspect the failing workflow or smoke logs.
5. Identify the last known good release/run from `docs/STATUS.md` and `docs/METRICS.md`.
6. Choose mitigation:
   - rerun failed smoke if the evidence indicates transient network failure;
   - rollback the specific HostGator surface when a release switch caused the issue;
   - keep production unchanged and patch forward only when rollback risk is higher.
7. Re-run the readiness smoke and affected public smoke after mitigation.
8. Update `docs/STATUS.md` with incident start, evidence, mitigation, final validation and any follow-up.

## Rollback Matrix

| Surface | Workflow | Rollback action |
|---|---|---|
| Hub | `Deploy SuperSite HostGator` | `rollback-release` or `rollback-placeholder` |
| Control-plane/API | `Deploy Control Plane HostGator` | `rollback-release` or `rollback-placeholder` |
| NetProbe Atlas | `Deploy NetProbe HostGator` | `rollback-release` or `rollback-placeholder` |
| Static product app | `Deploy Static App HostGator` | `rollback-release` or `rollback-placeholder` with `app_id` |

Rollback runs must include `phase` and `sprint` inputs, keep smoke enabled unless the run is a documented recovery exception, and must be followed by `pnpm ops:uptime-readiness-smoke`.

## Evidence Requirements

Record in `docs/STATUS.md`:

- incident or drill timestamp;
- failing command/workflow/run ID;
- affected surface and severity;
- mitigation or rollback command/run ID;
- final public smoke/readiness result;
- whether any production mutation occurred;
- follow-up owner or sprint.

Do not paste credentials, `.env` values, Redis passwords, cPanel passwords, payment identifiers or private customer data into docs, issues, logs or screenshots.

## Human Gates

Register `docs/HUMAN_ACTION_REQUIRED.md` and continue reversible work when the response needs:

- DNS changes or root/document-root mapping;
- external uptime provider purchase/configuration;
- AdSense, Google, billing, payment, donation or affiliate activation;
- legal acceptance, KYC, tax, bank, PIN or irreversible provider action;
- destructive removal of backups, releases or production data.

## Closure Criteria

An incident is closed only after:

- the affected smoke/readiness check passes;
- public surface status is verified;
- docs are updated with run IDs and evidence;
- a docs-only Quality Gate passes when documentation changed.
