<?php

namespace App\Support\Billing;

use App\Models\AuditLog;
use App\Models\BillingProvider;
use App\Models\BillingWebhookEvent;
use Illuminate\Database\Eloquent\Model;

class BillingWebhookDryRunReceiver
{
    public const CONTRACT_VERSION = '2026-06-29.2';

    /** @var string[] */
    private const PROVIDERS = ['stripe', 'mercado_pago', 'paddle'];

    /**
     * @return array{status: int, body: array<string, mixed>}
     */
    public function receive(
        string $providerInput,
        string $rawPayload,
        ?string $timestampHeader,
        ?string $signatureHeader,
    ): array {
        $provider = $this->normalizeProvider($providerInput);
        $payloadHash = hash('sha256', $rawPayload);

        if ($provider === null) {
            return $this->reject(422, null, null, null, ['unsupported_provider'], $payloadHash);
        }

        $maxPayloadBytes = max(1024, (int) config('billing.webhooks.max_payload_bytes', 65536));
        if (strlen($rawPayload) > $maxPayloadBytes) {
            return $this->reject(413, $provider, null, null, ['payload_too_large'], $payloadHash);
        }

        if (! (bool) config('billing.webhooks.dry_run_enabled', false)) {
            return $this->reject(503, $provider, null, null, ['dry_run_receiver_disabled'], $payloadHash);
        }

        $secret = config('billing.webhooks.dry_run_secret');
        if (! is_string($secret) || trim($secret) === '') {
            return $this->reject(503, $provider, null, null, ['dry_run_secret_not_configured'], $payloadHash);
        }

        $payload = json_decode($rawPayload, true);
        if (! is_array($payload)) {
            return $this->reject(422, $provider, null, null, ['invalid_json_payload'], $payloadHash);
        }

        $eventId = $this->normalizeIdentifier(data_get($payload, 'id') ?? data_get($payload, 'event_id') ?? data_get($payload, 'event.id'));
        $eventType = $this->normalizeIdentifier(data_get($payload, 'type') ?? data_get($payload, 'event_type') ?? data_get($payload, 'event.type'));
        $signatureReasons = $this->signatureReasons($rawPayload, $timestampHeader, $signatureHeader, $secret);
        $reasons = [];

        if ($eventId === null) {
            $reasons[] = 'missing_event_id';
        }

        if ($eventType === null) {
            $reasons[] = 'missing_event_type';
        }

        $reasons = array_values(array_unique([...$reasons, ...$signatureReasons]));

        if ($reasons !== []) {
            $status = $this->rejectionStatus($reasons);
            $this->recordAudit('api.billing.webhook.rejected', null, [
                'provider' => $provider,
                'external_event_id' => $eventId,
                'event_type' => $eventType,
                'payload_hash' => $payloadHash,
                'reasons' => $reasons,
            ]);

            return $this->reject($status, $provider, $eventId, $eventType, $reasons, $payloadHash);
        }

        $idempotencyKey = "{$provider}:{$eventId}";
        $existing = BillingWebhookEvent::query()
            ->where('provider', $provider)
            ->where('external_event_id', $eventId)
            ->first();

        if ($existing instanceof BillingWebhookEvent) {
            if ($existing->payload_hash !== $payloadHash) {
                $this->recordAudit('api.billing.webhook.idempotency_mismatch', $existing, [
                    'provider' => $provider,
                    'external_event_id' => $eventId,
                    'existing_payload_hash' => $existing->payload_hash,
                    'incoming_payload_hash' => $payloadHash,
                ]);

                return $this->reject(409, $provider, $eventId, $eventType, ['idempotency_payload_hash_mismatch'], $payloadHash);
            }

            return [
                'status' => 200,
                'body' => $this->acceptedBody($existing, true),
            ];
        }

        $providerModel = BillingProvider::query()->where('provider', $provider)->first();
        $event = BillingWebhookEvent::query()->create([
            'billing_provider_id' => $providerModel?->id,
            'provider' => $provider,
            'external_event_id' => $eventId,
            'event_type' => $eventType,
            'signature_status' => 'verified_test',
            'processing_status' => 'dry_run',
            'idempotency_key' => $idempotencyKey,
            'payload_hash' => $payloadHash,
            'received_at' => now(),
            'processed_at' => null,
        ]);

        $this->recordAudit('api.billing.webhook.dry_run_received', $event, [
            'provider' => $provider,
            'external_event_id' => $eventId,
            'event_type' => $eventType,
            'idempotency_key' => $idempotencyKey,
            'processing_status' => 'dry_run',
            'provider_webhooks_enabled' => (bool) ($providerModel?->webhooks_enabled ?? false),
        ]);

        return [
            'status' => 202,
            'body' => $this->acceptedBody($event, false),
        ];
    }

    private function normalizeProvider(string $provider): ?string
    {
        $normalized = strtolower(str_replace('-', '_', trim($provider)));

        return in_array($normalized, self::PROVIDERS, true) ? $normalized : null;
    }

    private function normalizeIdentifier(mixed $value): ?string
    {
        if (! is_scalar($value)) {
            return null;
        }

        $normalized = trim((string) $value);

        return preg_match('/^[A-Za-z0-9._:-]{3,120}$/', $normalized) === 1 ? $normalized : null;
    }

    /**
     * @return string[]
     */
    private function signatureReasons(string $rawPayload, ?string $timestampHeader, ?string $signatureHeader, string $secret): array
    {
        $reasons = [];
        $timestamp = is_numeric($timestampHeader) ? (int) $timestampHeader : null;

        if ($timestamp === null) {
            $reasons[] = 'missing_signature_timestamp';
        }

        if (! is_string($signatureHeader) || trim($signatureHeader) === '') {
            $reasons[] = 'missing_signature';
        }

        if ($timestamp !== null) {
            $ageSeconds = abs(now()->getTimestamp() - $timestamp);
            $replayWindowSeconds = min(900, max(30, (int) config('billing.webhooks.replay_window_seconds', 300)));

            if ($ageSeconds > $replayWindowSeconds) {
                $reasons[] = 'event_outside_replay_window';
            }
        }

        if ($timestamp !== null && is_string($signatureHeader) && trim($signatureHeader) !== '') {
            $signedPayload = $timestamp.'.'.$rawPayload;
            $expected = 'sha256='.hash_hmac('sha256', $signedPayload, $secret);

            if (! hash_equals($expected, trim($signatureHeader))) {
                $reasons[] = 'signature_not_verified';
            }
        }

        return array_values(array_unique($reasons));
    }

    /**
     * @param string[] $reasons
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
            || in_array('missing_signature', $reasons, true)
            || in_array('event_outside_replay_window', $reasons, true)
            || in_array('signature_not_verified', $reasons, true)
        ) {
            return 401;
        }

        return 422;
    }

    /**
     * @param string[] $reasons
     * @return array{status: int, body: array<string, mixed>}
     */
    private function reject(
        int $status,
        ?string $provider,
        ?string $eventId,
        ?string $eventType,
        array $reasons,
        string $payloadHash,
    ): array {
        return [
            'status' => $status,
            'body' => [
                'data' => [
                    'accepted' => false,
                    'provider' => $provider,
                    'external_event_id' => $eventId,
                    'event_type' => $eventType,
                    'signature_status' => 'rejected',
                    'processing_status' => 'rejected',
                ],
                'meta' => [
                    'contract_version' => self::CONTRACT_VERSION,
                    'mode' => 'dry_run',
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
                'mode' => 'dry_run',
                'idempotent_replay' => $idempotentReplay,
                'side_effects' => 'none',
                'provider_webhooks_enabled' => false,
                'checkout_enabled' => false,
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
