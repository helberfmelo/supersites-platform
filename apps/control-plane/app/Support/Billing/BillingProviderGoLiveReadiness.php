<?php

namespace App\Support\Billing;

use App\Models\BillingPlan;
use App\Models\BillingProvider;

class BillingProviderGoLiveReadiness
{
    public const CONTRACT_VERSION = '2026-06-29.15.3';

    /**
     * @var list<string>
     */
    private array $supportedProviders = ['stripe', 'mercado_pago', 'paddle'];

    /**
     * @return array<string, mixed>
     */
    public function snapshot(): array
    {
        $providers = BillingProvider::query()
            ->with(['plans.site:id,slug,name'])
            ->orderBy('id')
            ->get();

        $providerSnapshots = $providers
            ->map(fn (BillingProvider $provider): array => $this->providerSnapshot($provider))
            ->all();

        $plans = BillingPlan::query()
            ->with(['site:id,slug,name', 'billingProvider:id,provider'])
            ->orderBy('id')
            ->get();

        $planSnapshots = $plans
            ->map(fn (BillingPlan $plan): array => $this->planSnapshot($plan, $providerSnapshots))
            ->all();

        return [
            'meta' => [
                'contract_version' => self::CONTRACT_VERSION,
                'mode' => 'billing_provider_go_live_readiness',
                'side_effects' => 'none',
                'provider_activation' => false,
            ],
            'data' => [
                'summary' => [
                    'providers' => count($providerSnapshots),
                    'providers_ready_for_human_activation' => count(array_filter(
                        $providerSnapshots,
                        fn (array $provider): bool => (bool) $provider['ready_for_human_activation'],
                    )),
                    'paid_plans' => count(array_filter(
                        $planSnapshots,
                        fn (array $plan): bool => (bool) $plan['paid_plan'],
                    )),
                    'paid_plans_ready_for_human_activation' => count(array_filter(
                        $planSnapshots,
                        fn (array $plan): bool => (bool) $plan['ready_for_human_activation'],
                    )),
                    'checkout_sessions_enabled' => 0,
                    'live_webhooks_enabled' => 0,
                    'provider_sdk_loaded' => 0,
                    'revenue_import_enabled' => 0,
                    'automatic_checkout_enabled' => false,
                    'automatic_webhook_processing_enabled' => false,
                ],
                'providers' => $providerSnapshots,
                'plans' => $planSnapshots,
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function providerSnapshot(BillingProvider $provider): array
    {
        $checks = [
            'provider_supported' => in_array($provider->provider, $this->supportedProviders, true),
            'account_approved' => $this->statusReady($provider->account_status),
            'account_ready_flag' => (bool) $provider->account_ready,
            'kyc_approved' => $this->statusReady($provider->kyc_status),
            'terms_accepted' => $this->statusReady($provider->terms_status),
            'tax_profile_complete' => $this->statusReady($provider->tax_status),
            'payment_profile_complete' => $this->statusReady($provider->payment_profile_status),
            'provider_terms_reviewed' => $this->statusReady($provider->provider_terms_status),
            'api_key_configured' => $this->statusReady($provider->api_key_status),
            'webhook_secret_configured' => $this->statusReady($provider->webhook_secret_status),
            'webhook_endpoint_approved' => $this->statusReady($provider->webhook_endpoint_status),
            'checkout_status_ready' => $this->statusReady($provider->checkout_status),
            'webhook_status_ready' => $this->statusReady($provider->webhook_status),
            'checkout_feature_flag_enabled' => (bool) $provider->checkout_enabled,
            'webhook_feature_flag_enabled' => (bool) $provider->webhooks_enabled,
        ];

        $readyForHumanActivation = ! in_array(false, $checks, true);

        return [
            'provider' => $provider->provider,
            'account_status' => $provider->account_status,
            'kyc_status' => $provider->kyc_status,
            'terms_status' => $provider->terms_status,
            'tax_status' => $provider->tax_status,
            'payment_profile_status' => $provider->payment_profile_status,
            'provider_terms_status' => $provider->provider_terms_status,
            'api_key_status' => $provider->api_key_status,
            'webhook_secret_status' => $provider->webhook_secret_status,
            'webhook_endpoint_status' => $provider->webhook_endpoint_status,
            'checkout_status' => $provider->checkout_status,
            'webhook_status' => $provider->webhook_status,
            'checkout_enabled_in_seed' => (bool) $provider->checkout_enabled,
            'webhooks_enabled_in_seed' => (bool) $provider->webhooks_enabled,
            'plans_count' => $provider->plans->count(),
            'ready_for_human_activation' => $readyForHumanActivation,
            'should_create_checkout_session' => false,
            'should_process_live_webhooks' => false,
            'should_import_revenue' => false,
            'checks' => $checks,
            'blockers' => $this->failedCheckKeys($checks),
        ];
    }

    /**
     * @param list<array<string, mixed>> $providerSnapshots
     * @return array<string, mixed>
     */
    private function planSnapshot(BillingPlan $plan, array $providerSnapshots): array
    {
        $provider = $plan->billingProvider?->provider;
        $providerReady = $provider !== null && $this->providerReady($providerSnapshots, $provider);
        $paidPlan = $plan->kind !== 'free_preview';
        $priceReference = $this->normalizeProviderPriceReference($plan->provider_price_reference);

        $checks = [
            'paid_plan' => $paidPlan,
            'site_configured' => $plan->site !== null,
            'plan_status_ready' => $this->statusReady($plan->status),
            'amount_positive' => ! $paidPlan || $plan->amount_minor > 0,
            'provider_attached' => ! $paidPlan || $provider !== null,
            'provider_ready' => ! $paidPlan || $providerReady,
            'provider_price_reference_valid' => ! $paidPlan || $priceReference !== null,
            'checkout_feature_flag_enabled' => ! $paidPlan || (bool) $plan->checkout_enabled,
        ];

        $readyForHumanActivation = $paidPlan && ! in_array(false, $checks, true);

        return [
            'site_slug' => $plan->site?->slug,
            'site_name' => $plan->site?->name,
            'plan_slug' => $plan->slug,
            'kind' => $plan->kind,
            'paid_plan' => $paidPlan,
            'status' => $plan->status,
            'amount_minor' => $plan->amount_minor,
            'currency' => $plan->currency,
            'interval' => $plan->interval,
            'provider' => $provider,
            'provider_price_reference_configured' => $priceReference !== null,
            'provider_price_reference_preview' => $priceReference ? $this->maskIdentifier($priceReference) : null,
            'checkout_enabled_in_seed' => (bool) $plan->checkout_enabled,
            'ready_for_human_activation' => $readyForHumanActivation,
            'should_expose_checkout' => false,
            'should_create_checkout_session' => false,
            'checks' => $checks,
            'blockers' => $this->failedCheckKeys($checks),
        ];
    }

    /**
     * @param list<array<string, mixed>> $providerSnapshots
     */
    private function providerReady(array $providerSnapshots, string $provider): bool
    {
        return (bool) collect($providerSnapshots)
            ->first(
                fn (array $snapshot): bool => $snapshot['provider'] === $provider,
                ['ready_for_human_activation' => false],
            )['ready_for_human_activation'];
    }

    private function normalizeProviderPriceReference(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $normalized = trim($value);

        return preg_match('/^[A-Za-z0-9._:-]{3,120}$/', $normalized) === 1 ? $normalized : null;
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
     * @param array<string, bool> $checks
     * @return list<string>
     */
    private function failedCheckKeys(array $checks): array
    {
        return array_values(array_keys(array_filter(
            $checks,
            fn (bool $passed): bool => ! $passed,
        )));
    }

    private function maskIdentifier(string $identifier): string
    {
        if (strlen($identifier) <= 8) {
            return $identifier;
        }

        return substr($identifier, 0, 6).'***'.substr($identifier, -4);
    }
}
