# HostGator Bootstrap Runbook

Execute only after roadmap approval.

## Inputs

- cPanel credentials: local-only inventory in `docs/credentials/credentials.local.md`.
- Remote base: `/home1/opents62/public_html/supersites/`.
- SSH host pattern from reference projects: `108.179.241.237:2222` with user `opents62`.
- FTP host pattern from reference projects: `ftp.opentshost.com`.

## Remote folders

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

Automation draft: `scripts/hostgator-create-databases.ps1`.

Reference checked: cPanel UAPI `Mysql::create_database`. Avoid deprecated API 2 for database creation.

## Crons

Do not create cron until there is executable code. Planned cron classes:

- Laravel scheduler for control plane.
- Monitor checks for NetProbe, MailHealth and SitePulse.
- Cleanup jobs for PixelBatch and DocShift.
- Snapshot imports for analytics/AdSense/Search Console.

The cPanel cron API documentation currently exposes API 2 functions and marks that API family as deprecated. Prefer cPanel UI or SSH crontab during the first bootstrap, then document the exact method used.

## Validation

- cPanel folder listing confirms folders.
- Public URL returns expected placeholder or deployed app.
- Database list confirms all DBs.
- Cron list confirms only planned entries.
- No secrets printed in logs.
