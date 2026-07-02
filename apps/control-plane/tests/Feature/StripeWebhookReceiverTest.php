<?php

namespace Tests\Feature;

use App\Models\BillingCheckoutSession;
use App\Models\BillingProvider;
use App\Models\Site;
use Database\Seeders\BillingReadinessSeeder;
use Database\Seeders\PortfolioSiteSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StripeWebhookReceiverTest extends TestCase
{
    use RefreshDatabase;

    public function test_stripe_live_webhook_rejects_when_disabled(): void
    {
        $payload = json_encode([
            'id' => 'evt_live_disabled',
            'type' => 'checkout.session.completed',
        ], JSON_THROW_ON_ERROR);

        $this->call('POST', '/api/v1/billing/webhooks/stripe', [], [], [], [
            'CONTENT_TYPE' => 'application/json',
            'HTTP_STRIPE_SIGNATURE' => $this->stripeSignature($payload, 'whsec_test_disabled'),
        ], $payload)
            ->assertStatus(503)
            ->assertJsonPath('data.accepted', false)
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.reasons.0', 'dry_run_receiver_disabled');
    }

    public function test_verified_stripe_checkout_session_webhook_updates_session_ledger(): void
    {
        $this->seed([PortfolioSiteSeeder::class, BillingReadinessSeeder::class]);
        config([
            'billing.providers.stripe.webhooks_enabled' => true,
            'billing.providers.stripe.webhook_secret' => 'whsec_supersites_test',
            'billing.webhooks.replay_window_seconds' => 300,
        ]);

        $provider = $this->markStripeProviderWebhookReady();
        $site = Site::query()->where('slug', 'netprobe-atlas')->firstOrFail();
        BillingCheckoutSession::query()->create([
            'billing_provider_id' => $provider->id,
            'billing_plan_id' => null,
            'site_id' => $site->id,
            'provider' => 'stripe',
            'kind' => 'donation',
            'mode' => 'payment',
            'catalog_key' => 'support-donation',
            'provider_session_id' => 'cs_live_donation_123',
            'checkout_url_hash' => hash('sha256', 'https://checkout.stripe.com/c/pay/cs_live_donation_123'),
            'client_reference_id' => 'supersites:test',
            'amount_minor' => 1000,
            'currency' => 'USD',
            'status' => 'created',
            'request_fingerprint' => 'test-fingerprint',
            'metadata_hash' => hash('sha256', '{}'),
        ]);

        $payload = json_encode([
            'id' => 'evt_live_checkout_123',
            'type' => 'checkout.session.completed',
            'data' => [
                'object' => [
                    'id' => 'cs_live_donation_123',
                    'client_reference_id' => 'supersites:test',
                ],
            ],
        ], JSON_THROW_ON_ERROR);

        $this->call('POST', '/api/v1/billing/webhooks/stripe', [], [], [], [
            'CONTENT_TYPE' => 'application/json',
            'HTTP_STRIPE_SIGNATURE' => $this->stripeSignature($payload, 'whsec_supersites_test'),
        ], $payload)
            ->assertStatus(202)
            ->assertJsonPath('data.accepted', true)
            ->assertJsonPath('data.signature_status', 'verified_live')
            ->assertJsonPath('data.processing_status', 'checkout_session_completed')
            ->assertJsonPath('meta.raw_payload_stored', false);

        $this->assertDatabaseHas('billing_checkout_sessions', [
            'provider_session_id' => 'cs_live_donation_123',
            'status' => 'completed',
        ]);
        $this->assertDatabaseHas('billing_webhook_events', [
            'provider' => 'stripe',
            'external_event_id' => 'evt_live_checkout_123',
            'signature_status' => 'verified_live',
            'processing_status' => 'checkout_session_completed',
        ]);
        $this->assertDatabaseHas('audit_logs', [
            'action' => 'api.billing.webhook.stripe_received',
        ]);
    }

    public function test_verified_stripe_webhook_replay_is_idempotent(): void
    {
        $this->seed([PortfolioSiteSeeder::class, BillingReadinessSeeder::class]);
        config([
            'billing.providers.stripe.webhooks_enabled' => true,
            'billing.providers.stripe.webhook_secret' => 'whsec_supersites_test',
        ]);
        $this->markStripeProviderWebhookReady();

        $payload = json_encode([
            'id' => 'evt_live_replay_123',
            'type' => 'payment_intent.succeeded',
        ], JSON_THROW_ON_ERROR);
        $server = [
            'CONTENT_TYPE' => 'application/json',
            'HTTP_STRIPE_SIGNATURE' => $this->stripeSignature($payload, 'whsec_supersites_test'),
        ];

        $this->call('POST', '/api/v1/billing/webhooks/stripe', [], [], [], $server, $payload)
            ->assertStatus(202)
            ->assertJsonPath('meta.idempotent_replay', false);

        $this->call('POST', '/api/v1/billing/webhooks/stripe', [], [], [], $server, $payload)
            ->assertOk()
            ->assertJsonPath('meta.idempotent_replay', true);

        $this->assertDatabaseCount('billing_webhook_events', 1);
    }

    private function markStripeProviderWebhookReady(): BillingProvider
    {
        $provider = BillingProvider::query()->where('provider', 'stripe')->firstOrFail();
        $provider->update([
            'account_status' => 'approved',
            'kyc_status' => 'approved',
            'terms_status' => 'accepted',
            'tax_status' => 'complete',
            'payment_profile_status' => 'complete',
            'provider_terms_status' => 'reviewed',
            'api_key_status' => 'configured',
            'webhook_secret_status' => 'configured',
            'webhook_endpoint_status' => 'approved',
            'webhook_status' => 'ready',
            'account_ready' => true,
            'webhooks_enabled' => true,
        ]);

        return $provider;
    }

    private function stripeSignature(string $payload, string $secret): string
    {
        $timestamp = now()->getTimestamp();
        $signature = hash_hmac('sha256', $timestamp.'.'.$payload, $secret);

        return "t=$timestamp,v1=$signature";
    }
}
