<?php

namespace Database\Seeders;

use App\Models\GoogleIntegration;
use App\Models\Site;
use Illuminate\Database\Seeder;

class GoogleIntegrationSeeder extends Seeder
{
    /**
     * @var list<string>
     */
    private array $allowedEvents = [
        'tool_viewed',
        'tool_started',
        'tool_completed',
        'tool_failed',
        'result_copied',
        'file_uploaded',
        'file_processed',
        'file_downloaded',
        'monitor_created',
        'signup_started',
        'signup_completed',
        'upgrade_viewed',
        'checkout_started',
        'purchase_completed',
        'subscription_cancelled',
        'outbound_site_click',
    ];

    public function run(): void
    {
        Site::query()
            ->orderBy('id')
            ->each(function (Site $site): void {
                GoogleIntegration::updateOrCreate(
                    ['site_id' => $site->id],
                    [
                        'domain_mode' => 'pending_definitive_domain',
                        'domain_property' => null,
                        'ga4_property_id' => null,
                        'ga4_measurement_id' => null,
                        'gtm_container_id' => null,
                        'search_console_property' => null,
                        'access_status' => 'human_required',
                        'ga4_status' => 'not_configured',
                        'gtm_status' => 'not_configured',
                        'search_console_status' => 'human_required',
                        'tags_enabled' => false,
                        'data_import_enabled' => false,
                        'allowed_events' => $this->allowedEvents,
                        'last_validated_at' => null,
                    ],
                );
            });
    }
}
