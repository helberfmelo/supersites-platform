<?php

namespace Database\Seeders;

use App\Models\Site;
use App\Models\SupportMonetizationChannel;
use Illuminate\Database\Seeder;

class SupportMonetizationReadinessSeeder extends Seeder
{
    public function run(): void
    {
        Site::query()
            ->where('kind', '!=', 'admin')
            ->orderBy('id')
            ->each(function (Site $site): void {
                foreach (['donation', 'affiliate'] as $channel) {
                    SupportMonetizationChannel::updateOrCreate(
                        [
                            'site_id' => $site->id,
                            'channel' => $channel,
                        ],
                        [
                            'provider' => "{$channel}_placeholder",
                            'label' => $channel === 'donation'
                                ? "{$site->name} support link"
                                : "{$site->name} affiliate disclosure",
                            'account_status' => 'human_required',
                            'terms_status' => 'human_required',
                            'tax_status' => 'human_required',
                            'disclosure_status' => 'human_required',
                            'privacy_status' => 'human_required',
                            'policy_status' => 'human_required',
                            'destination_url_status' => 'not_configured',
                            'webhook_status' => 'disabled',
                            'human_approval_status' => 'human_required',
                            'channel_ready' => false,
                            'public_enabled' => false,
                            'destination_url' => null,
                            'notes' => 'Readiness only; no real donation, affiliate URL, widget, QR/PIX or provider account is active.',
                        ],
                    );
                }
            });
    }
}
