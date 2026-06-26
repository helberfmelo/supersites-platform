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

Production Redis should run on the other HostGator VPS/VPN server or a managed Redis provider. This cPanel account can still serve the transitional catalog and static/public web assets.

## Planned cPanel database names

cPanel database names should be created with short suffixes to stay readable:

| App | cPanel database |
|---|---|
| SuperSites Hub | `opents62_ss_hub` |
| Control Plane | `opents62_ss_control` |
| NetProbe Atlas | `opents62_ss_netprobe` |
| CalcHarbor | `opents62_ss_calc` |
| DevUtility Lab | `opents62_ss_devutils` |
| TimeNexus | `opents62_ss_time` |
| QRRoute | `opents62_ss_qrroute` |
| InvoiceCraft | `opents62_ss_invoice` |
| MailHealth | `opents62_ss_mail` |
| SitePulse Lab | `opents62_ss_pulse` |
| PixelBatch | `opents62_ss_pixel` |
| DocShift | `opents62_ss_docshift` |

Use separate DB users if cPanel limits allow it; otherwise document the least-privilege compromise and revisit.

## Composer/PHP note

Reference projects on this account used:

```text
/opt/cpanel/ea-php82/root/usr/bin/php /home1/opents62/composer.phar install --no-dev --optimize-autoloader --no-interaction
```

Confirm PHP version before Laravel 13 decisions.
