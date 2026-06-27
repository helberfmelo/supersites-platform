<?php

namespace Database\Seeders;

use App\Models\AdSenseAccount;
use App\Models\AdSenseSiteReview;
use App\Models\Site;
use Illuminate\Database\Seeder;

class AdSenseReadinessSeeder extends Seeder
{
    public function run(): void
    {
        $account = AdSenseAccount::updateOrCreate(
            ['publisher_label' => 'primary-publisher'],
            [
                'publisher_id' => null,
                'beneficiary_status' => 'human_required',
                'duplicate_account_status' => 'human_required',
                'terms_status' => 'human_required',
                'tax_status' => 'human_required',
                'payment_profile_status' => 'human_required',
                'bank_status' => 'human_required',
                'pin_status' => 'human_required',
                'management_api_status' => 'not_configured',
                'account_status' => 'human_required',
                'account_ready' => false,
                'management_api_enabled' => false,
                'ad_serving_enabled' => false,
                'last_validated_at' => null,
            ],
        );

        Site::query()
            ->where('kind', '!=', 'admin')
            ->orderBy('id')
            ->each(function (Site $site) use ($account): void {
                AdSenseSiteReview::updateOrCreate(
                    ['site_id' => $site->id],
                    [
                        'adsense_account_id' => $account->id,
                        'public_url' => $site->temporary_url,
                        'domain_status' => 'pending_definitive_domain',
                        'site_review_status' => 'not_submitted',
                        'ads_txt_status' => 'not_published',
                        'quality_gate_status' => 'not_ready',
                        'consent_status' => 'not_ready',
                        'policy_status' => 'pending_review',
                        'public_smoke_status' => in_array($site->slug, ['supersite', 'netprobe-atlas'], true)
                            ? 'passed'
                            : 'placeholder',
                        'placements_enabled' => false,
                        'auto_ads_enabled' => false,
                        'ad_serving_enabled' => false,
                        'site_added_at' => null,
                        'last_validated_at' => null,
                    ],
                );
            });
    }
}
