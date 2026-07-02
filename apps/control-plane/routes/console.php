<?php

use App\Models\BillingProvider;
use App\Models\Site;
use App\Models\SupportMonetizationChannel;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('billing:activate-stripe-donations {--disable : Return Stripe donations to fail-closed readiness}', function () {
    $endpoint = 'https://opentshost.com/supersites/control-plane/api/v1/billing/stripe/checkout-sessions';
    $disable = (bool) $this->option('disable');

    $provider = BillingProvider::updateOrCreate(
        ['provider' => 'stripe'],
        $disable
            ? [
                'account_status' => 'human_required',
                'kyc_status' => 'human_required',
                'terms_status' => 'human_required',
                'tax_status' => 'human_required',
                'payment_profile_status' => 'human_required',
                'provider_terms_status' => 'human_required',
                'api_key_status' => 'configured',
                'webhook_secret_status' => 'configured',
                'webhook_endpoint_status' => 'approved',
                'checkout_status' => 'disabled',
                'webhook_status' => 'ready',
                'account_ready' => false,
                'checkout_enabled' => false,
                'webhooks_enabled' => true,
                'last_validated_at' => now(),
            ]
            : [
                'account_status' => 'approved',
                'kyc_status' => 'approved',
                'terms_status' => 'accepted',
                'tax_status' => 'complete',
                'payment_profile_status' => 'complete',
                'provider_terms_status' => 'reviewed',
                'api_key_status' => 'configured',
                'webhook_secret_status' => 'configured',
                'webhook_endpoint_status' => 'approved',
                'checkout_status' => 'ready',
                'webhook_status' => 'ready',
                'account_ready' => true,
                'checkout_enabled' => true,
                'webhooks_enabled' => true,
                'last_validated_at' => now(),
            ],
    );

    $affected = 0;

    Site::query()
        ->where('kind', '!=', 'admin')
        ->orderBy('id')
        ->each(function (Site $site) use ($disable, $endpoint, &$affected): void {
            SupportMonetizationChannel::updateOrCreate(
                [
                    'site_id' => $site->id,
                    'channel' => 'donation',
                ],
                $disable
                    ? [
                        'provider' => 'stripe',
                        'label' => "{$site->name} support donation",
                        'account_status' => 'human_required',
                        'terms_status' => 'human_required',
                        'tax_status' => 'human_required',
                        'disclosure_status' => 'approved',
                        'privacy_status' => 'approved',
                        'policy_status' => 'approved',
                        'destination_url_status' => 'configured',
                        'webhook_status' => 'ready',
                        'human_approval_status' => 'human_required',
                        'channel_ready' => false,
                        'public_enabled' => false,
                        'destination_url' => $endpoint,
                        'notes' => 'Stripe donation checkout disabled by operational command.',
                    ]
                    : [
                        'provider' => 'stripe',
                        'label' => "{$site->name} support donation",
                        'account_status' => 'approved',
                        'terms_status' => 'accepted',
                        'tax_status' => 'complete',
                        'disclosure_status' => 'approved',
                        'privacy_status' => 'approved',
                        'policy_status' => 'approved',
                        'destination_url_status' => 'configured',
                        'webhook_status' => 'ready',
                        'human_approval_status' => 'approved',
                        'channel_ready' => true,
                        'public_enabled' => true,
                        'destination_url' => $endpoint,
                        'notes' => 'Stripe hosted donation checkout approved by owner on 2026-07-02. No paid plan, entitlement mutation or service checkout is enabled.',
                    ],
            );

            $affected++;
        });

    $this->info(sprintf(
        'Stripe donation readiness %s for provider %s and %d public sites.',
        $disable ? 'disabled' : 'activated',
        $provider->provider,
        $affected,
    ));
})->purpose('Activate or disable Stripe donation checkout readiness for public support CTAs');

Schedule::command('netprobe:dispatch-due-monitors --limit=50')
    ->everyFiveMinutes()
    ->withoutOverlapping();
