# HostGator Bootstrap Runbook

Execute only after roadmap approval.

## Inputs

- cPanel credentials: local-only inventory in `docs/credentials/credentials.local.md`.
- Remote base: `/home1/opents62/public_html/supersites/`.
- SSH host pattern from reference projects: `108.179.241.237:2222` with user `opents62`.
- FTP host pattern from reference projects: `ftp.opentshost.com`.

## Remote folders

Status on 2026-06-26: created and confirmed by cPanel API.

Create:

```text
/home1/opents62/public_html/supersites/
/home1/opents62/public_html/supersites/control-plane/
/home1/opents62/public_html/supersites/netprobe-atlas/
/home1/opents62/public_html/supersites/calcharbor/
/home1/opents62/public_html/supersites/devutility-lab/
/home1/opents62/public_html/supersites/timenexus/
/home1/opents62/public_html/supersites/qrroute/
/home1/opents62/public_html/supersites/invoicecraft/
/home1/opents62/public_html/supersites/mailhealth/
/home1/opents62/public_html/supersites/sitepulse-lab/
/home1/opents62/public_html/supersites/pixelbatch/
/home1/opents62/public_html/supersites/docshift/
```

## Databases

Use one database per app/site. cPanel prefixes database names with `opents62_`; planned suffixes are in `infra/environments/production/hostgator/README.md`.

Automation: `scripts/hostgator-bootstrap.ps1`.
Validation automation: `scripts/validate-hostgator-bootstrap.ps1`.

Reference checked: cPanel UAPI `Mysql::create_database`. Avoid deprecated API 2 for database creation.

Status on 2026-06-26:

- 12 databases created.
- 12 database users created.
- Privileges assigned per app database.
- Generated passwords stored only in ignored local file `docs/credentials/hostgator-db-users.local.json`.

## Crons

Do not create cron until there is executable code. Planned cron classes:

- Laravel scheduler for control plane.
- Monitor checks for NetProbe, MailHealth and SitePulse.
- Cleanup jobs for PixelBatch and DocShift.
- Snapshot imports for analytics/AdSense/Search Console.

The cPanel cron API documentation currently exposes API 2 functions and marks that API family as deprecated. Prefer cPanel UI or SSH crontab during the first bootstrap, then document the exact method used.

Status on 2026-06-26: no remote crons created because there is no deployed scheduler/worker code yet.

## Validation

- cPanel folder listing confirms folders.
- Public URL returns expected placeholder or deployed app.
- Database list confirms all DBs.
- Cron list confirms only planned entries.
- No secrets printed in logs.

Validated fallback URLs on 2026-06-26:

- `https://opentshost.com/supersites/`
- `https://opentshost.com/supersites/control-plane/`
- `https://opentshost.com/supersites/netprobe-atlas/`
- `https://opentshost.com/supersites/calcharbor/`
- `https://opentshost.com/supersites/devutility-lab/`
- `https://opentshost.com/supersites/timenexus/`
- `https://opentshost.com/supersites/qrroute/`
- `https://opentshost.com/supersites/invoicecraft/`
- `https://opentshost.com/supersites/mailhealth/`
- `https://opentshost.com/supersites/sitepulse-lab/`
- `https://opentshost.com/supersites/pixelbatch/`
- `https://opentshost.com/supersites/docshift/`
