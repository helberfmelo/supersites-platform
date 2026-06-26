<?php

namespace Database\Seeders;

use App\Models\Site;
use Illuminate\Database\Seeder;

class PortfolioSiteSeeder extends Seeder
{
    public function run(): void
    {
        $locales = ['en', 'pt-br', 'es', 'fr', 'de'];
        $baseUrl = 'https://opentshost.com/supersites';

        $sites = [
            ['slug' => 'supersite', 'name' => 'SuperSites Hub', 'kind' => 'hub', 'category' => 'network', 'launch_order' => 0, 'status' => 'foundation'],
            ['slug' => 'control-plane', 'name' => 'Control Plane', 'kind' => 'admin', 'category' => 'operations', 'launch_order' => null, 'status' => 'foundation'],
            ['slug' => 'netprobe-atlas', 'name' => 'NetProbe Atlas', 'kind' => 'utility', 'category' => 'network', 'launch_order' => 1, 'status' => 'foundation'],
            ['slug' => 'calcharbor', 'name' => 'CalcHarbor', 'kind' => 'utility', 'category' => 'calculators', 'launch_order' => 2, 'status' => 'planned'],
            ['slug' => 'devutility-lab', 'name' => 'DevUtility Lab', 'kind' => 'utility', 'category' => 'developer', 'launch_order' => 3, 'status' => 'planned'],
            ['slug' => 'timenexus', 'name' => 'TimeNexus', 'kind' => 'utility', 'category' => 'time', 'launch_order' => 4, 'status' => 'planned'],
            ['slug' => 'qrroute', 'name' => 'QRRoute', 'kind' => 'utility', 'category' => 'links', 'launch_order' => 5, 'status' => 'planned'],
            ['slug' => 'invoicecraft', 'name' => 'InvoiceCraft', 'kind' => 'utility', 'category' => 'documents', 'launch_order' => 6, 'status' => 'planned'],
            ['slug' => 'mailhealth', 'name' => 'MailHealth', 'kind' => 'utility', 'category' => 'email', 'launch_order' => 7, 'status' => 'planned'],
            ['slug' => 'sitepulse-lab', 'name' => 'SitePulse Lab', 'kind' => 'utility', 'category' => 'monitoring', 'launch_order' => 8, 'status' => 'planned'],
            ['slug' => 'pixelbatch', 'name' => 'PixelBatch', 'kind' => 'utility', 'category' => 'images', 'launch_order' => 9, 'status' => 'planned'],
            ['slug' => 'docshift', 'name' => 'DocShift', 'kind' => 'utility', 'category' => 'documents', 'launch_order' => 10, 'status' => 'planned'],
        ];

        foreach ($sites as $site) {
            Site::updateOrCreate(
                ['slug' => $site['slug']],
                [
                    ...$site,
                    'temporary_url' => "{$baseUrl}/{$site['slug']}/",
                    'locales' => $locales,
                    'adsense_ready' => false,
                ],
            );
        }
    }
}
