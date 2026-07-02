<?php

namespace App\Support\Billing;

use App\Models\AuditLog;
use App\Models\BillingCheckoutSession;
use App\Models\BillingProvider;
use App\Models\BillingWebhookEvent;
use Illuminate\Database\Eloquent\Model;

class StripeWebhookReceiver
{
    public const CONTRACT_VERSION = '2026-07-02.24.3';

    /**
     * @var list<string>
     */
    private array $sessionEventTypes = [
        'checkout.session.async_payment_failed',
        'checkout.session.async_payment_succeeded',
        'checkout.session.completed',
        'checkout.session.expired',
    ];

    /**
     * @return array{status: int, body: array<string, mixed>}
     */
    public function receive(string $rawPayload, ?string $signatureHeader): array
    {
        $payloadHash = hash('sha256', $rawPayload);
        $maxPayloadBytes = max(1024, (int) config('billing.webhooks.max_payload_bytes', 65536));

        if (strlen($rawPayload) > $maxPayloadBytes) {
            return $this->reject(413, null, null, ['payload_too_large'], $payloadHash);
        }

        if (! (bool) config('billing.providers.stripe.webhooks_enabled', false)) {
            return $this->reject(503, null, null, ['stripe_webhooks_disabled'], $payloadHash);
        }

        $secret = config('billing.providers.stripe.webhook_secret');
        if (! is_string($secret) || trim($secret) === '') {
            return $this->reject(503, null, null, ['stripe_webhook_secret_not_configured'], $payloadHash);
        }

        $payload = json_decode($rawPayload, true);
        if (! is_array($payload)) {
            return $this->reject(422, null, null, ['invalid_json_payload'], $payloadHash);
        }

        $eventId = $this->normalizeIdentifier(data_get($payload, 'id'));
        $eventType = $this->normalizeIdentifier(data_get($payload, 'type'));
        $reasons = [];

        if ($eventId === null) {
            $reasons[] = 'missing_event_id';
        }

        if ($eventType === null) {
            $reasons[] = 'missing_event_type';
        }

        $reasons = array_values(array_unique([...$reasons, ...$this->signatureReasons($rawPayload, $signatureHeader, $secret)]));
        if ($reasons !== []) {
            $status = $this->rejectionStatus($reasons);
            $this->recordAudit('api.billing.webhook.stripe_rejected', null, [
                'provider' => 'stripe',
                'external_event_id' => $eventId,
                'event_type' => $eventType,
                'payload_hash' => $payloadHash,
                'reasons' => $reasons,
            ]);

            return $this->reject($status, $eventId, $eventType, $reasons, $payloadHash);
        }

        $existing = BillingWebhookEvent::query()
            ->where('provider', 'stripe')
            ->where('external_event_id', $eventId)
            ->first();

        if ($existing instanceof BillingWebhookEvent) {
            if ($existing->payload_hash !== $payloadHash) {
                $this->recordAudit('api.billing.webhook.stripe_idempotency_mismatch', $existing, [
                    'provider' => 'stripe',
                    'external_event_id' => $eventId,
                    'existing_payload_hash' => $existing->payload_hash,
                    'incoming_payload_hash' => $payloadHash,
                ]);

                return $this->reject(409, $eventId, $eventType, ['idempotency_payload_hash_mismatch'], $payloadHash);
            }

            return [
                'status' => 200,
                'body' => $this->acceptedBody($existing, true),
            ];
        }

        $provider = BillingProvider::query()->where('provider', 'stripe')->first();
        $providerReasons = $this->providerWebhookGateReasons($provider);
        if ($providerReasons !== []) {
            return $this->reject(503, $eventId, $eventType, $providerReasons, $payloadHash);
        }

        $sessionStatus = $this->sessionStatusForEvent($eventType);
        $sessionId = $this->normalizeIdentifier(data_get($payload, 'data.object.id'));
        $processingStatus = $sessionStatus === null ? 'ignored_verified' : 'recorded_verified';
        $checkoutSession = null;

        if ($sessionStatus !== null && $sessionId !== null) {
            $checkoutSession = BillingCheckoutSession::query()
                ->where('provider', 'stripe')
                ->where('provider_session_id', $sessionId)
                ->first();

            if ($checkoutSession instanceof BillingCheckoutSession) {
                $checkoutSession->update(['status' => $sessionStatus]);
                $processingStatus = "checkout_session_$sessionStatus";
            } else {
                $processingStatus = 'checkout_session_not_found';
            }
        }

        $event = BillingWebhookEvent::query()->create([
            'billing_provider_id' => $provider?->id,
            'provider' => 'stripe',
            'external_event_id' => $eventId,
            'event_type' => $eventType,
            'signature_status' => 'verified_live',
            'processing_status' => $processingStatus,
            'idempotency_key' => "stripe:$eventId",
            'payload_hash' => $payloadHash,
            'received_at' => now(),
            'processed_at' => now(),
        ]);

        $this->recordAudit('api.billing.webhook.stripe_received', $event, [
            'provider' => 'stripe',
            'external_event_id' => $eventId,
            'event_type' => $eventType,
            'provider_session_id' => $sessionId,
            'processing_status' => $processingStatus,
            'checkout_session_id' => $checkoutSession?->id,
            'side_effects' => $checkoutSession instanceof BillingCheckoutSession ? 'checkout_session_status_updated' : 'ledger_only',
        ]);

        return [
            'status' => 202,
            'body' => $this->acceptedBody($event, false),
        ];
    }

    /**
     * @return list<string>
     */
    private function providerWebhookGateReasons(?BillingProvider $provider): array
    {
        if (! $provider instanceof BillingProvider || $provider->provider !== 'stripe') {
            return ['stripe_provider_not_configured'];
        }

        $checks = [
            'account_not_approved' => $this->statusReady($provider->account_status),
            'kyc_not_approved' => $this->statusReady($provider->kyc_status),
            'terms_not_accepted' => $this->statusReady($provider->terms_status),
            'tax_profile_not_complete' => $this->statusReady($provider->tax_status),
            'payment_profile_not_complete' => $this->statusReady($provider->payment_profile_status),
            'provider_terms_not_reviewed' => $this->statusReady($provider->provider_terms_status),
            'api_key_not_configured' => $this->statusReady($provider->api_key_status),
            'webhook_secret_not_configured' => $this->statusReady($provider->webhook_secret_status),
            'webhook_endpoint_not_approved' => $this->statusReady($provider->webhook_endpoint_status),
            'webhook_status_not_ready' => $this->statusReady($provider->webhook_status),
            'account_ready_flag_false' => (bool) $provider->account_ready,
            'provider_webhook_flag_false' => (bool) $provider->webhooks_enabled,
        ];

        return array_values(array_keys(array_filter(
            $checks,
            fn (bool $passed): bool => ! $passed,
        )));
    }

    private function sessionStatusForEvent(?string $eventType): ?string
    {
        if (! in_array($eventType, $this->sessionEventTypes, true)) {
            return null;
        }

        return match ($eventType) {
            'checkout.session.async_payment_failed' => 'payment_failed',
            'checkout.session.async_payment_succeeded',
            'checkout.session.completed' => 'completed',
            'checkout.session.expired' => 'expired',
            default => null,
        };
    }

    private function normalizeIdentifier(mixed $value): ?string
    {
        if (! is_scalar($value)) {
            return null;
        }

        $normalized = trim((string) $value);

        return preg_match('/^[A-Za-z0-9._:-]{3,160}$/', $normalized) === 1 ? $normalized : null;
    }

    /**
     * @return list<string>
     */
    private function signatureReasons(string $rawPayload, ?string $signatureHeader, string $secret): array
    {
        $reasons = [];
        $parts = $this->parseStripeSignatureHeader($signatureHeader);
        $timestamp = isset($parts['t'][0]) && is_numeric($parts['t'][0]) ? (int) $parts['t'][0] : null;
        $signatures = $parts['v1'] ?? [];

        if ($timestamp === null) {
            $reasons[] = 'missing_signature_timestamp';
        }

        if ($signatures === []) {
            $reasons[] = 'missing_v1_signature';
        }

        if ($timestamp !== null) {
            $ageSeconds = abs(now()->getTimestamp() - $timestamp);
            $replayWindowSeconds = min(900, max(30, (int) config('billing.webhooks.replay_window_seconds', 300)));

            if ($ageSeconds > $replayWindowSeconds) {
                $reasons[] = 'event_outside_replay_window';
            }
        }

        if ($timestamp !== null && $signatures !== []) {
            $expected = hash_hmac('sha256', $timestamp.'.'.$rawPayload, $secret);
            $verified = false;

            foreach ($signatures as $signature) {
                if (hash_equals($expected, trim($signature))) {
                    $verified = true;
                    break;
                }
            }

            if (! $verified) {
                $reasons[] = 'signature_not_verified';
            }
        }

        return array_values(array_unique($reasons));
    }

    /**
     * @return array<string, list<string>>
     */
    private function parseStripeSignatureHeader(?string $header): array
    {
        if (! is_string($header) || trim($header) === '') {
            return [];
        }

        $parts = [];
        foreach (explode(',', $header) as $chunk) {
            [$key, $value] = array_pad(explode('=', trim($chunk), 2), 2, null);
            if ($key === null || $value === null || $key === '') {
                continue;
            }

            $parts[$key] ??= [];
            $parts[$key][] = $value;
        }

        return $parts;
    }

    /**
     * @param list<string> $reasons
     */
    private function rejectionStatus(array $reasons): int
    {
        if (in_array('payload_too_large', $reasons, true)) {
            return 413;
        }

        if (in_array('idempotency_payload_hash_mismatch', $reasons, true)) {
            return 409;
        }

        if (
            in_array('missing_signature_timestamp', $reasons, true)
            || in_array('missing_v1_signature', $reasons, true)
            || in_array('event_outside_replay_window', $reasons, true)
            || in_array('signature_not_verified', $reasons, true)
        ) {
            return 401;
        }

        return 422;
    }

    private function statusReady(?string $status): bool
    {
        return in_array($status, [
            'accepted',
            'approved',
            'checked',
            'complete',
            'completed',
            'configured',
            'enabled',
            'passed',
            'published',
            'ready',
            'reviewed',
            'verified',
        ], true);
    }

    /**
     * @param list<string> $reasons
     * @return array{status: int, body: array<string, mixed>}
     */
    private function reject(int $status, ?string $eventId, ?string $eventType, array $reasons, string $payloadHash): array
    {
        return [
            'status' => $status,
            'body' => [
                'data' => [
                    'accepted' => false,
                    'provider' => 'stripe',
                    'external_event_id' => $eventId,
                    'event_type' => $eventType,
                    'signature_status' => 'rejected',
                    'processing_status' => 'rejected',
                ],
                'meta' => [
                    'contract_version' => self::CONTRACT_VERSION,
                    'mode' => 'stripe_live_webhook',
                    'side_effects' => 'none',
                    'payload_hash' => $payloadHash,
                    'reasons' => array_values(array_unique($reasons)),
                ],
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function acceptedBody(BillingWebhookEvent $event, bool $idempotentReplay): array
    {
        return [
            'data' => [
                'id' => $event->id,
                'accepted' => true,
                'provider' => $event->provider,
                'external_event_id' => $event->external_event_id,
                'event_type' => $event->event_type,
                'idempotency_key' => $event->idempotency_key,
                'signature_status' => $event->signature_status,
                'processing_status' => $event->processing_status,
            ],
            'meta' => [
                'contract_version' => self::CONTRACT_VERSION,
                'mode' => 'stripe_live_webhook',
                'idempotent_replay' => $idempotentReplay,
                'raw_payload_stored' => false,
            ],
        ];
    }

    /**
     * @param array<string, mixed> $metadata
     */
    private function recordAudit(string $action, ?Model $auditable, array $metadata): void
    {
        AuditLog::record(null, $action, auditable: $auditable, metadata: $metadata);
    }
}
