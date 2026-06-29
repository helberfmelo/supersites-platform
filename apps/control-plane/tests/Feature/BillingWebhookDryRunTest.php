<?php

namespace Tests\Feature;

use App\Models\BillingWebhookEvent;
use Database\Seeders\BillingReadinessSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BillingWebhookDryRunTest extends TestCase
{
    use RefreshDatabase;

    public function test_billing_webhook_requires_dry_run_configuration(): void
    {
        $this->seed(BillingReadinessSeeder::class);

        $payload = $this->payload();

        $this->call('POST', '/api/v1/billing/webhooks/stripe', [], [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], $payload)
            ->assertStatus(503)
            ->assertJsonPath('data.accepted', false)
            ->assertJsonPath('meta.reasons.0', 'dry_run_receiver_disabled');

        $this->assertDatabaseCount('billing_webhook_events', 0);
    }

    public function test_billing_webhook_rejects_invalid_signature(): void
    {
        $this->seed(BillingReadinessSeeder::class);
        $this->enableDryRunReceiver();

        $payload = $this->payload();

        $this->call('POST', '/api/v1/billing/webhooks/stripe', [], [], [], [
            'CONTENT_TYPE' => 'application/json',
            'HTTP_X_SUPERSITES_WEBHOOK_TIMESTAMP' => (string) now()->getTimestamp(),
            'HTTP_X_SUPERSITES_WEBHOOK_SIGNATURE' => 'sha256=invalid',
        ], $payload)
            ->assertUnauthorized()
            ->assertJsonPath('data.accepted', false)
            ->assertJsonPath('meta.reasons.0', 'signature_not_verified');

        $this->assertDatabaseCount('billing_webhook_events', 0);
        $this->assertDatabaseHas('audit_logs', [
            'action' => 'api.billing.webhook.rejected',
        ]);
    }

    public function test_signed_billing_webhook_is_recorded_as_dry_run_without_side_effects(): void
    {
        $this->seed(BillingReadinessSeeder::class);
        $this->enableDryRunReceiver();

        $payload = $this->payload();

        $this->call('POST', '/api/v1/billing/webhooks/stripe', [], [], [], $this->signedServer($payload), $payload)
            ->assertAccepted()
            ->assertJsonPath('data.accepted', true)
            ->assertJsonPath('data.provider', 'stripe')
            ->assertJsonPath('data.external_event_id', 'evt_123')
            ->assertJsonPath('data.event_type', 'checkout.session.completed')
            ->assertJsonPath('data.idempotency_key', 'stripe:evt_123')
            ->assertJsonPath('data.signature_status', 'verified_test')
            ->assertJsonPath('data.processing_status', 'dry_run')
            ->assertJsonPath('meta.mode', 'dry_run')
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.provider_webhooks_enabled', false)
            ->assertJsonPath('meta.checkout_enabled', false);

        $this->assertDatabaseHas('billing_webhook_events', [
            'provider' => 'stripe',
            'external_event_id' => 'evt_123',
            'event_type' => 'checkout.session.completed',
            'signature_status' => 'verified_test',
            'processing_status' => 'dry_run',
            'idempotency_key' => 'stripe:evt_123',
            'payload_hash' => hash('sha256', $payload),
            'processed_at' => null,
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'api.billing.webhook.dry_run_received',
        ]);
    }

    public function test_billing_webhook_replay_is_idempotent_for_same_payload(): void
    {
        $this->seed(BillingReadinessSeeder::class);
        $this->enableDryRunReceiver();

        $payload = $this->payload();

        $this->call('POST', '/api/v1/billing/webhooks/stripe', [], [], [], $this->signedServer($payload), $payload)
            ->assertAccepted();

        $this->call('POST', '/api/v1/billing/webhooks/stripe', [], [], [], $this->signedServer($payload), $payload)
            ->assertOk()
            ->assertJsonPath('data.accepted', true)
            ->assertJsonPath('meta.idempotent_replay', true);

        $this->assertSame(1, BillingWebhookEvent::query()
            ->where('provider', 'stripe')
            ->where('external_event_id', 'evt_123')
            ->count());
    }

    public function test_billing_webhook_rejects_idempotency_hash_mismatch(): void
    {
        $this->seed(BillingReadinessSeeder::class);
        $this->enableDryRunReceiver();

        $payload = $this->payload();
        $changedPayload = $this->payload(['type' => 'invoice.paid']);

        $this->call('POST', '/api/v1/billing/webhooks/stripe', [], [], [], $this->signedServer($payload), $payload)
            ->assertAccepted();

        $this->call('POST', '/api/v1/billing/webhooks/stripe', [], [], [], $this->signedServer($changedPayload), $changedPayload)
            ->assertConflict()
            ->assertJsonPath('data.accepted', false)
            ->assertJsonPath('meta.reasons.0', 'idempotency_payload_hash_mismatch');

        $this->assertSame(1, BillingWebhookEvent::query()
            ->where('provider', 'stripe')
            ->where('external_event_id', 'evt_123')
            ->count());

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'api.billing.webhook.idempotency_mismatch',
        ]);
    }

    public function test_billing_webhook_rejects_replay_window_expiry(): void
    {
        $this->seed(BillingReadinessSeeder::class);
        $this->enableDryRunReceiver();

        $payload = $this->payload();
        $timestamp = now()->subMinutes(10)->getTimestamp();

        $this->call('POST', '/api/v1/billing/webhooks/stripe', [], [], [], [
            'CONTENT_TYPE' => 'application/json',
            'HTTP_X_SUPERSITES_WEBHOOK_TIMESTAMP' => (string) $timestamp,
            'HTTP_X_SUPERSITES_WEBHOOK_SIGNATURE' => $this->signature($payload, $timestamp),
        ], $payload)
            ->assertUnauthorized()
            ->assertJsonPath('data.accepted', false)
            ->assertJsonPath('meta.reasons.0', 'event_outside_replay_window');

        $this->assertDatabaseCount('billing_webhook_events', 0);
    }

    private function enableDryRunReceiver(): void
    {
        config([
            'billing.webhooks.dry_run_enabled' => true,
            'billing.webhooks.dry_run_secret' => 'supersites-test-secret',
            'billing.webhooks.replay_window_seconds' => 300,
        ]);
    }

    /**
     * @param array<string, mixed> $overrides
     */
    private function payload(array $overrides = []): string
    {
        $payload = array_replace_recursive([
            'id' => 'evt_123',
            'type' => 'checkout.session.completed',
            'data' => [
                'object' => [
                    'mode' => 'subscription',
                    'metadata' => [
                        'site' => 'netprobe-atlas',
                    ],
                ],
            ],
        ], $overrides);

        return json_encode($payload, JSON_THROW_ON_ERROR);
    }

    /**
     * @return array<string, string>
     */
    private function signedServer(string $payload): array
    {
        $timestamp = now()->getTimestamp();

        return [
            'CONTENT_TYPE' => 'application/json',
            'HTTP_X_SUPERSITES_WEBHOOK_TIMESTAMP' => (string) $timestamp,
            'HTTP_X_SUPERSITES_WEBHOOK_SIGNATURE' => $this->signature($payload, $timestamp),
        ];
    }

    private function signature(string $payload, int $timestamp): string
    {
        return 'sha256='.hash_hmac('sha256', $timestamp.'.'.$payload, 'supersites-test-secret');
    }
}
