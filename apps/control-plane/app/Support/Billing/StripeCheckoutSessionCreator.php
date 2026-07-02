<?php

namespace App\Support\Billing;

use App\Models\AuditLog;
use App\Models\BillingCheckoutSession;
use App\Models\BillingPlan;
use App\Models\BillingProvider;
use App\Models\Site;
use App\Models\SupportMonetizationChannel;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class StripeCheckoutSessionCreator
{
    public const CONTRACT_VERSION = '2026-07-02.24.2';

    /** @var list<string> */
    private array $locales = ['en', 'pt-br', 'es', 'fr', 'de'];

    /**
     * @param array<string, mixed> $input
     * @return array{status: int, body: array<string, mixed>}
     */
    public function create(array $input, ?User $user = null): array
    {
        $site = Site::query()
            ->where('slug', (string) $input['site_slug'])
            ->where('kind', '!=', 'admin')
            ->first();

        if (! $site instanceof Site) {
            return $this->blocked(422, ['site_not_supported']);
        }

        $kind = (string) $input['kind'];
        $locale = $this->normalizeLocale($input['locale'] ?? null);
        $baseGateReasons = $this->baseGateReasons();

        if ($kind === 'donation') {
            return $this->createDonationSession($input, $site, $locale, $baseGateReasons, $user);
        }

        if ($kind === 'plan') {
            return $this->createPlanSession($input, $site, $locale, $baseGateReasons, $user);
        }

        if ($kind === 'service') {
            return $this->createServiceSession($input, $site, $locale, $baseGateReasons, $user);
        }

        return $this->blocked(422, ['checkout_kind_not_supported']);
    }

    /**
     * @param array<string, mixed> $input
     * @param list<string> $baseGateReasons
     * @return array{status: int, body: array<string, mixed>}
     */
    private function createDonationSession(array $input, Site $site, string $locale, array $baseGateReasons, ?User $user): array
    {
        $currency = $this->normalizeCurrency($input['currency'] ?? 'USD');
        $amountMinor = (int) ($input['amount_minor'] ?? 0);
        $allowedAmounts = config("billing.providers.stripe.allowed_donation_amounts.$currency", []);
        $reasons = $baseGateReasons;

        if (! (bool) config('billing.providers.stripe.donations_enabled', false)) {
            $reasons[] = 'stripe_donations_disabled';
        }

        if (! in_array($amountMinor, $allowedAmounts, true)) {
            $reasons[] = 'donation_amount_not_allowed';
        }

        $channel = SupportMonetizationChannel::query()
            ->where('site_id', $site->id)
            ->where('channel', 'donation')
            ->first();

        if (! $channel instanceof SupportMonetizationChannel || ! $this->donationChannelReady($channel)) {
            $reasons[] = 'donation_channel_not_ready_for_public_checkout';
        }

        $provider = BillingProvider::query()->where('provider', 'stripe')->first();
        $providerReasons = $this->providerGateReasons($provider);
        $reasons = array_values(array_unique([...$reasons, ...$providerReasons]));

        if ($reasons !== []) {
            return $this->blocked(503, $reasons, [
                'kind' => 'donation',
                'site_slug' => $site->slug,
                'currency' => $currency,
                'amount_minor' => $amountMinor,
            ]);
        }

        $catalogKey = 'support-donation';
        $sessionPayload = $this->baseStripePayload($input, $site, $locale, 'payment', $catalogKey, [
            'kind' => 'donation',
            'amount_minor' => (string) $amountMinor,
            'currency' => $currency,
        ]);
        $sessionPayload += [
            'line_items[0][quantity]' => '1',
            'line_items[0][price_data][currency]' => strtolower($currency),
            'line_items[0][price_data][unit_amount]' => (string) $amountMinor,
            'line_items[0][price_data][product_data][name]' => "{$site->name} support",
            'line_items[0][price_data][product_data][description]' => 'Optional support for free SuperSites tools.',
        ];

        return $this->sendToStripe(
            $sessionPayload,
            $provider,
            $site,
            null,
            'donation',
            'payment',
            $catalogKey,
            $amountMinor,
            $currency,
            $user,
        );
    }

    /**
     * @param array<string, mixed> $input
     * @param list<string> $baseGateReasons
     * @return array{status: int, body: array<string, mixed>}
     */
    private function createPlanSession(array $input, Site $site, string $locale, array $baseGateReasons, ?User $user): array
    {
        $planSlug = (string) ($input['plan_slug'] ?? '');
        $plan = BillingPlan::query()
            ->with('billingProvider')
            ->where('site_id', $site->id)
            ->where('slug', $planSlug)
            ->first();
        $reasons = $baseGateReasons;

        if (! $plan instanceof BillingPlan) {
            $reasons[] = 'billing_plan_not_found';
        } else {
            if ($plan->kind === 'free_preview') {
                $reasons[] = 'free_preview_plan_has_no_checkout';
            }

            if (! $this->statusReady($plan->status)) {
                $reasons[] = 'billing_plan_not_ready';
            }

            if (! $plan->checkout_enabled) {
                $reasons[] = 'billing_plan_checkout_disabled';
            }

            if ($this->normalizeProviderPriceReference($plan->provider_price_reference) === null) {
                $reasons[] = 'provider_price_reference_not_configured';
            }
        }

        $provider = $plan instanceof BillingPlan ? $plan->billingProvider : null;
        $reasons = array_values(array_unique([...$reasons, ...$this->providerGateReasons($provider)]));

        if ($reasons !== []) {
            return $this->blocked(503, $reasons, [
                'kind' => 'plan',
                'site_slug' => $site->slug,
                'plan_slug' => $planSlug,
            ]);
        }

        /** @var BillingPlan $plan */
        /** @var BillingProvider $provider */
        $mode = $plan->interval === 'one_time' || $plan->kind === 'one_time' ? 'payment' : 'subscription';
        $sessionPayload = $this->baseStripePayload($input, $site, $locale, $mode, $plan->slug, [
            'kind' => 'plan',
            'plan_slug' => $plan->slug,
            'site_slug' => $site->slug,
        ]);
        $sessionPayload += [
            'line_items[0][quantity]' => '1',
            'line_items[0][price]' => (string) $plan->provider_price_reference,
        ];

        return $this->sendToStripe(
            $sessionPayload,
            $provider,
            $site,
            $plan,
            'plan',
            $mode,
            $plan->slug,
            $plan->amount_minor,
            $plan->currency,
            $user,
        );
    }

    /**
     * @param array<string, mixed> $input
     * @param list<string> $baseGateReasons
     * @return array{status: int, body: array<string, mixed>}
     */
    private function createServiceSession(array $input, Site $site, string $locale, array $baseGateReasons, ?User $user): array
    {
        $serviceSlug = (string) ($input['service_slug'] ?? 'custom-service-deposit');
        $service = config("billing.providers.stripe.service_catalog.$serviceSlug");
        $reasons = $baseGateReasons;

        if (! (bool) config('billing.providers.stripe.service_checkout_enabled', false)) {
            $reasons[] = 'stripe_service_checkout_disabled';
        }

        if (! is_array($service) || ! (bool) ($service['enabled'] ?? false)) {
            $reasons[] = 'service_catalog_item_disabled';
        }

        $provider = BillingProvider::query()->where('provider', 'stripe')->first();
        $reasons = array_values(array_unique([...$reasons, ...$this->providerGateReasons($provider)]));

        if ($reasons !== []) {
            return $this->blocked(503, $reasons, [
                'kind' => 'service',
                'site_slug' => $site->slug,
                'service_slug' => $serviceSlug,
            ]);
        }

        /** @var BillingProvider $provider */
        $amountMinor = (int) $service['amount_minor'];
        $currency = $this->normalizeCurrency($service['currency'] ?? 'USD');
        $sessionPayload = $this->baseStripePayload($input, $site, $locale, 'payment', $serviceSlug, [
            'kind' => 'service',
            'service_slug' => $serviceSlug,
            'site_slug' => $site->slug,
        ]);
        $sessionPayload += [
            'line_items[0][quantity]' => '1',
            'line_items[0][price_data][currency]' => strtolower($currency),
            'line_items[0][price_data][unit_amount]' => (string) $amountMinor,
            'line_items[0][price_data][product_data][name]' => (string) $service['name'],
            'line_items[0][price_data][product_data][description]' => 'Hosted checkout for an approved SuperSites custom service.',
        ];

        return $this->sendToStripe(
            $sessionPayload,
            $provider,
            $site,
            null,
            'service',
            'payment',
            $serviceSlug,
            $amountMinor,
            $currency,
            $user,
        );
    }

    /**
     * @param array<string, mixed> $input
     * @param array<string, string> $metadata
     * @return array<string, string>
     */
    private function baseStripePayload(array $input, Site $site, string $locale, string $mode, string $catalogKey, array $metadata): array
    {
        $returnPath = $this->sanitizeReturnPath($input['return_path'] ?? null, $site, $locale);
        $clientReferenceId = 'supersites:'.Str::uuid()->toString();
        $successUrl = $this->appendCheckoutQuery($this->absoluteReturnUrl($returnPath), 'success');
        $cancelUrl = $this->appendCheckoutQuery($this->absoluteReturnUrl($returnPath), 'cancel');
        $base = [
            'mode' => $mode,
            'success_url' => $successUrl,
            'cancel_url' => $cancelUrl,
            'client_reference_id' => $clientReferenceId,
            'metadata[contract_version]' => self::CONTRACT_VERSION,
            'metadata[site_slug]' => $site->slug,
            'metadata[catalog_key]' => $catalogKey,
        ];

        foreach ($metadata as $key => $value) {
            $base["metadata[$key]"] = $value;
        }

        return $base;
    }

    /**
     * @return array{status: int, body: array<string, mixed>}
     */
    private function sendToStripe(
        array $payload,
        BillingProvider $provider,
        Site $site,
        ?BillingPlan $plan,
        string $kind,
        string $mode,
        string $catalogKey,
        ?int $amountMinor,
        ?string $currency,
        ?User $user,
    ): array {
        $secretKey = (string) config('billing.providers.stripe.secret_key');
        $response = Http::asForm()
            ->acceptJson()
            ->withToken($secretKey)
            ->timeout(15)
            ->post((string) config('billing.providers.stripe.checkout_sessions_endpoint'), $payload);

        if (! $response->successful()) {
            AuditLog::record($user, 'api.billing.checkout.stripe_failed', metadata: [
                'provider' => 'stripe',
                'kind' => $kind,
                'site_slug' => $site->slug,
                'status' => $response->status(),
            ]);

            return $this->blocked(502, ['stripe_checkout_session_create_failed'], [
                'kind' => $kind,
                'site_slug' => $site->slug,
            ]);
        }

        $data = $response->json();
        $sessionId = is_string(data_get($data, 'id')) ? data_get($data, 'id') : null;
        $checkoutUrl = is_string(data_get($data, 'url')) ? data_get($data, 'url') : null;

        if ($sessionId === null || $checkoutUrl === null || ! str_starts_with($checkoutUrl, 'https://')) {
            return $this->blocked(502, ['stripe_checkout_session_response_invalid'], [
                'kind' => $kind,
                'site_slug' => $site->slug,
            ]);
        }

        $session = BillingCheckoutSession::query()->create([
            'billing_provider_id' => $provider->id,
            'billing_plan_id' => $plan?->id,
            'site_id' => $site->id,
            'provider' => 'stripe',
            'kind' => $kind,
            'mode' => $mode,
            'catalog_key' => $catalogKey,
            'provider_session_id' => $sessionId,
            'checkout_url_hash' => hash('sha256', $checkoutUrl),
            'client_reference_id' => (string) $payload['client_reference_id'],
            'amount_minor' => $amountMinor,
            'currency' => $currency,
            'status' => 'created',
            'request_fingerprint' => hash('sha256', implode('|', [
                $site->slug,
                $kind,
                $catalogKey,
                (string) $amountMinor,
                (string) $currency,
                now()->format('Y-m-d-H'),
            ])),
            'metadata_hash' => hash('sha256', json_encode($this->metadataOnly($payload), JSON_THROW_ON_ERROR)),
        ]);

        AuditLog::record($user, 'api.billing.checkout.stripe_created', auditable: $session, metadata: [
            'provider' => 'stripe',
            'kind' => $kind,
            'mode' => $mode,
            'site_slug' => $site->slug,
            'catalog_key' => $catalogKey,
            'amount_minor' => $amountMinor,
            'currency' => $currency,
        ]);

        return [
            'status' => 201,
            'body' => [
                'data' => [
                    'provider' => 'stripe',
                    'kind' => $kind,
                    'mode' => $mode,
                    'site_slug' => $site->slug,
                    'catalog_key' => $catalogKey,
                    'provider_session_id' => $sessionId,
                    'checkout_url' => $checkoutUrl,
                ],
                'meta' => [
                    'contract_version' => self::CONTRACT_VERSION,
                    'mode' => 'hosted_checkout',
                    'card_data_collected_by' => 'stripe',
                    'payment_surface' => 'stripe_checkout',
                    'entitlement_mutation' => false,
                ],
            ],
        ];
    }

    /**
     * @return list<string>
     */
    private function baseGateReasons(): array
    {
        $reasons = [];

        if (! (bool) config('billing.checkout_enabled', false)) {
            $reasons[] = 'billing_checkout_disabled';
        }

        if (! (bool) config('billing.providers.stripe.checkout_enabled', false)) {
            $reasons[] = 'stripe_checkout_disabled';
        }

        if (! (bool) config('billing.provider_activation_enabled', false)) {
            $reasons[] = 'billing_provider_activation_disabled';
        }

        if (trim((string) config('billing.providers.stripe.secret_key')) === '') {
            $reasons[] = 'stripe_secret_key_not_configured';
        }

        return $reasons;
    }

    /**
     * @return list<string>
     */
    private function providerGateReasons(?BillingProvider $provider): array
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
            'checkout_status_not_ready' => $this->statusReady($provider->checkout_status),
            'account_ready_flag_false' => (bool) $provider->account_ready,
            'provider_checkout_flag_false' => (bool) $provider->checkout_enabled,
        ];

        return array_values(array_keys(array_filter(
            $checks,
            fn (bool $passed): bool => ! $passed,
        )));
    }

    private function donationChannelReady(SupportMonetizationChannel $channel): bool
    {
        return $channel->provider === 'stripe'
            && $this->statusReady($channel->account_status)
            && $this->statusReady($channel->terms_status)
            && $this->statusReady($channel->tax_status)
            && $this->statusReady($channel->disclosure_status)
            && $this->statusReady($channel->privacy_status)
            && $this->statusReady($channel->policy_status)
            && $this->statusReady($channel->human_approval_status)
            && (bool) $channel->channel_ready
            && (bool) $channel->public_enabled;
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

    private function normalizeLocale(mixed $value): string
    {
        $locale = strtolower(trim((string) ($value ?: 'en')));

        return in_array($locale, $this->locales, true) ? $locale : 'en';
    }

    private function normalizeCurrency(mixed $value): string
    {
        $currency = strtoupper(trim((string) $value));

        return preg_match('/^[A-Z]{3}$/', $currency) === 1 ? $currency : 'USD';
    }

    private function normalizeProviderPriceReference(?string $value): ?string
    {
        $normalized = trim((string) $value);

        return preg_match('/^[A-Za-z0-9._:-]{3,120}$/', $normalized) === 1 ? $normalized : null;
    }

    private function sanitizeReturnPath(mixed $value, Site $site, string $locale): string
    {
        $path = trim((string) $value);

        if (
            $path === ''
            || strlen($path) > 300
            || str_contains($path, '://')
            || str_starts_with($path, '//')
            || ! str_starts_with($path, '/supersites/')
        ) {
            return $this->defaultReturnPath($site, $locale);
        }

        return $path;
    }

    private function defaultReturnPath(Site $site, string $locale): string
    {
        if ($site->slug === 'supersite') {
            return "/supersites/$locale";
        }

        return "/supersites/{$site->slug}/$locale";
    }

    private function absoluteReturnUrl(string $path): string
    {
        $baseUrl = rtrim((string) config('billing.checkout_return_base_url'), '/');

        return $baseUrl.'/'.ltrim($path, '/');
    }

    private function appendCheckoutQuery(string $url, string $status): string
    {
        $separator = str_contains($url, '?') ? '&' : '?';

        return $url.$separator.'checkout='.$status.'&provider=stripe&session_id={CHECKOUT_SESSION_ID}';
    }

    /**
     * @param array<string, string> $payload
     * @return array<string, string>
     */
    private function metadataOnly(array $payload): array
    {
        return array_filter(
            $payload,
            fn (string $key): bool => str_starts_with($key, 'metadata['),
            ARRAY_FILTER_USE_KEY,
        );
    }

    /**
     * @param list<string> $reasons
     * @param array<string, mixed> $context
     * @return array{status: int, body: array<string, mixed>}
     */
    private function blocked(int $status, array $reasons, array $context = []): array
    {
        return [
            'status' => $status,
            'body' => [
                'data' => [
                    'created' => false,
                    'provider' => 'stripe',
                    'checkout_url' => null,
                ],
                'meta' => [
                    'contract_version' => self::CONTRACT_VERSION,
                    'mode' => 'hosted_checkout',
                    'side_effects' => 'none',
                    'reasons' => array_values(array_unique($reasons)),
                    'context' => $context,
                ],
            ],
        ];
    }
}
