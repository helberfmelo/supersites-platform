<?php

namespace Database\Seeders;

use App\Models\BillingEntitlement;
use App\Models\BillingPlan;
use App\Models\BillingProvider;
use App\Models\Site;
use Illuminate\Database\Seeder;

class BillingReadinessSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['stripe', 'mercado_pago', 'paddle'] as $provider) {
            BillingProvider::updateOrCreate(
                ['provider' => $provider],
                [
                    'account_status' => 'human_required',
                    'kyc_status' => 'human_required',
                    'terms_status' => 'human_required',
                    'tax_status' => 'human_required',
                    'payment_profile_status' => 'human_required',
                    'provider_terms_status' => 'human_required',
                    'api_key_status' => 'not_configured',
                    'webhook_secret_status' => 'not_configured',
                    'webhook_endpoint_status' => 'dry_run_scaffolded',
                    'checkout_status' => 'disabled',
                    'webhook_status' => 'dry_run_only',
                    'account_ready' => false,
                    'checkout_enabled' => false,
                    'webhooks_enabled' => false,
                    'last_validated_at' => null,
                ],
            );
        }

        Site::query()
            ->where('kind', '!=', 'admin')
            ->orderBy('id')
            ->each(function (Site $site): void {
                $entitlementsSummary = [
                    'free_tier' => true,
                    'monthly_operations' => 100,
                    'retention_days' => 0,
                    'team_seats' => 1,
                ];

                if (in_array($site->slug, ['netprobe-atlas', 'mailhealth', 'sitepulse-lab'], true)) {
                    $entitlementsSummary['monitor_slots'] = 3;
                }

                $monitorTypes = $this->monitorTypesForSite($site->slug);
                if ($monitorTypes !== []) {
                    $entitlementsSummary['monitor_types'] = $monitorTypes;
                }

                $plan = BillingPlan::updateOrCreate(
                    [
                        'site_id' => $site->id,
                        'slug' => 'free-preview',
                    ],
                    [
                        'billing_provider_id' => null,
                        'name' => "{$site->name} Free Preview",
                        'kind' => 'free_preview',
                        'amount_minor' => 0,
                        'currency' => 'USD',
                        'interval' => 'month',
                        'provider_price_reference' => null,
                        'status' => 'draft',
                        'checkout_enabled' => false,
                        'entitlements_summary' => $entitlementsSummary,
                        'notes' => 'Seeded readiness plan only; no paid checkout or provider mapping is active.',
                    ],
                );

                $this->upsertEntitlement($plan, 'free-tier', 'boolean', booleanValue: true);
                $this->upsertEntitlement($plan, 'checkout-enabled', 'boolean', booleanValue: false);
                $this->upsertEntitlement($plan, 'monthly-operations', 'integer', integerValue: 100);
                $this->upsertEntitlement($plan, 'retention-days', 'integer', integerValue: 0);
                $this->upsertEntitlement($plan, 'team-seats', 'integer', integerValue: 1);

                if (in_array($site->slug, ['netprobe-atlas', 'mailhealth', 'sitepulse-lab'], true)) {
                    $this->upsertEntitlement($plan, 'monitor-slots', 'integer', integerValue: 3);
                }

                $monitorTypes = $this->monitorTypesForSite($site->slug);
                if ($monitorTypes !== []) {
                    $this->upsertEntitlement($plan, 'monitor-types', 'string', stringValue: implode(',', $monitorTypes));
                }
            });
    }

    /**
     * @return string[]
     */
    private function monitorTypesForSite(string $siteSlug): array
    {
        return match ($siteSlug) {
            'netprobe-atlas' => ['dns', 'ssl', 'domain'],
            'mailhealth' => ['dns', 'blacklist', 'smtp'],
            'sitepulse-lab' => ['status', 'headers', 'robots', 'sitemap'],
            default => [],
        };
    }

    private function upsertEntitlement(
        BillingPlan $plan,
        string $code,
        string $valueType,
        ?bool $booleanValue = null,
        ?int $integerValue = null,
        ?string $stringValue = null,
    ): void {
        BillingEntitlement::updateOrCreate(
            [
                'billing_plan_id' => $plan->id,
                'code' => $code,
            ],
            [
                'value_type' => $valueType,
                'boolean_value' => $booleanValue,
                'integer_value' => $integerValue,
                'string_value' => $stringValue,
                'source' => 'seeded',
            ],
        );
    }
}
