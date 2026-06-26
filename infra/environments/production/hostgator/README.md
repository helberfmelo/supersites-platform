# HostGator Production Target

Execute provisioning only after roadmap approval.

## Public target

- Domain: `opentshost.com`.
- Remote base: `/home1/opents62/public_html/supersites/`.
- Desired catalog URL: `https://opentshost.com/`.
- Desired site URLs: `https://opentshost.com/<site-folder>`.

## Redis and workers

Do not plan Redis, queue workers, Horizon or long-running monitors inside this cPanel/shared HostGator account.

Read-only checks on 2026-06-26 did not show Redis as a service or user feature. HostGator official compatibility marks Redis as unsupported on Shared/Reseller and supported on Dedicated/VPS.

Production Redis should run on the other HostGator VPS/VPN server or a managed Redis provider. This cPanel account can still serve the transitional catalog, the bounded public control-plane/API endpoints and static/public web assets.

## Laravel control-plane/API deploy

The control-plane public API is deployed as versioned Laravel releases under:

```text
/home1/opents62/public_html/supersites/control-plane/_control-plane-releases/<release-id>/
```

Public traffic enters through managed files in `/home1/opents62/public_html/supersites/control-plane/`:

- `.htaccess` routes requests to `index.php`.
- `index.php` includes the active release `public/index.php`.
- `_control-plane-releases/.htaccess` denies direct web access to release source files.

The deploy artifact must not include `.env`; release `.env` files are written remotely from GitHub environment secrets or ignored local inventory. The base remote `.env` is preserved when present.

The first public API deploy does not run migrations, crons or workers. NetProbe free IP/DNS smokes must pass over HTTPS before the NetProbe static frontend is published.

## Planned cPanel database names

Status on 2026-06-26: databases and matching app users were created by `scripts/hostgator-bootstrap.ps1`. Passwords are stored only in ignored local credential files.

cPanel database names should be created with short suffixes to stay readable:

| App | cPanel database | cPanel user |
|---|---|---|
| SuperSites Hub | `opents62_ss_hub` | `opents62_sshub` |
| Control Plane | `opents62_ss_control` | `opents62_ssctrl` |
| NetProbe Atlas | `opents62_ss_netprobe` | `opents62_ssnet` |
| CalcHarbor | `opents62_ss_calc` | `opents62_sscalc` |
| DevUtility Lab | `opents62_ss_devutils` | `opents62_ssdev` |
| TimeNexus | `opents62_ss_time` | `opents62_sstime` |
| QRRoute | `opents62_ss_qrroute` | `opents62_ssqr` |
| InvoiceCraft | `opents62_ss_invoice` | `opents62_ssinv` |
| MailHealth | `opents62_ss_mail` | `opents62_ssmail` |
| SitePulse Lab | `opents62_ss_pulse` | `opents62_sspuls` |
| PixelBatch | `opents62_ss_pixel` | `opents62_sspix` |
| DocShift | `opents62_ss_docshift` | `opents62_ssdoc` |

Use separate DB users if cPanel limits allow it; otherwise document the least-privilege compromise and revisit.

## Composer/PHP note

Reference projects on this account used:

```text
/opt/cpanel/ea-php82/root/usr/bin/php /home1/opents62/composer.phar install --no-dev --optimize-autoloader --no-interaction
```

Confirm PHP version before Laravel 13 decisions.
