# Cron Plan

Do not create remote crons before executable code exists.

Planned cron categories:

| App | Purpose | Cadence target |
|---|---|---|
| Control Plane | portfolio snapshots and AI recommendations | hourly/daily |
| NetProbe Atlas | DNS/SSL/domain monitors | 5m+ by plan |
| MailHealth | DNS/DMARC/blacklist monitors | 15m+ by plan |
| SitePulse Lab | uptime/performance monitors | 1m+ by plan |
| PixelBatch | temp cleanup | 15m/hourly |
| DocShift | temp cleanup/OCR queue | 15m/hourly |

Laravel scheduler should be preferred where supported:

```cron
* * * * * cd /home1/opents62/public_html/supersites/<app> && /opt/cpanel/ea-php82/root/usr/bin/php artisan schedule:run >> /dev/null 2>&1
```

Validate exact paths and PHP binary before creating crons.

