<?php

namespace Database\Seeders;

use App\Models\GrowthProviderIngestion;
use App\Models\Site;
use Illuminate\Database\Seeder;

class GrowthProviderIngestionSeeder extends Seeder
{
    /**
     * @var array<string, string>
     */
    private array $providerLabels = [
        'ga4' => 'Google Analytics Data API',
        'search_console' => 'Google Search Console API',
        'adsense' => 'Google AdSense Management API',
        'billing' => 'Billing provider exports',
    ];

    public function run(): void
    {
        Site::query()
            ->orderBy('id')
            ->get()
            ->each(function (Site $site): void {
                foreach ($this->providerLabels as $source => $label) {
                    GrowthProviderIngestion::updateOrCreate(
                        [
                            'site_id' => $site->id,
                            'source' => $source,
                        ],
                        [
                            'provider_label' => $label,
                            'access_status' => 'human_required',
                            'token_status' => 'human_required',
                            'quota_status' => 'human_required',
                            'data_contract_status' => 'human_required',
                            'retention_status' => 'human_required',
                            'import_status' => 'human_required',
                            'data_status' => 'unavailable',
                            'import_enabled' => false,
                            'last_successful_import_at' => null,
                            'latest_snapshot_at' => null,
                            'latest_error_code' => null,
                            'evidence' => [
                                'docs/ANALYTICS.md',
                                'docs/DATA_GOVERNANCE.md',
                                'docs/HUMAN_ACTION_REQUIRED.md',
                                'docs/SPRINTS/POST_BENCHMARK_OPERATIONAL_ROADMAP.md',
                            ],
                            'notes' => 'Seeded fail-closed for Phase 16 provider ingestion readiness. Real provider imports require human gates and vault-managed credentials.',
                        ],
                    );
                }
            });
    }
}
