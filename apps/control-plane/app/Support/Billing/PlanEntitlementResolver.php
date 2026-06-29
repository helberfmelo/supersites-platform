<?php

namespace App\Support\Billing;

use App\Models\BillingEntitlement;
use App\Models\BillingPlan;
use App\Models\Site;
use Illuminate\Support\Collection;

class PlanEntitlementResolver
{
    public const FREE_PREVIEW_PLAN = 'free-preview';
    public const NETPROBE_MONITOR_SLOTS = 'monitor-slots';
    public const NETPROBE_MONITOR_TYPES = 'monitor-types';

    /**
     * @param string[] $fallbackTypes
     * @return array<string, mixed>
     */
    public function monitorQuota(?Site $site, int $fallbackMax, array $fallbackTypes): array
    {
        $plan = $site ? $this->planForSite($site) : null;
        $entitlements = $plan ? $plan->entitlements : collect();
        $max = $this->integerEntitlement($entitlements, self::NETPROBE_MONITOR_SLOTS, $fallbackMax);
        $types = $this->stringListEntitlement($entitlements, self::NETPROBE_MONITOR_TYPES, $fallbackTypes);

        return [
            'plan_slug' => $plan?->slug ?? self::FREE_PREVIEW_PLAN,
            'plan_kind' => $plan?->kind ?? 'free_preview',
            'checkout_enabled' => (bool) ($plan?->checkout_enabled ?? false),
            'source' => $max['source'],
            'max_monitors' => $max['value'],
            'allowed_types' => $types,
        ];
    }

    private function planForSite(Site $site): ?BillingPlan
    {
        return BillingPlan::query()
            ->with('entitlements')
            ->where('site_id', $site->id)
            ->where('slug', self::FREE_PREVIEW_PLAN)
            ->where('checkout_enabled', false)
            ->first();
    }

    /**
     * @param Collection<int, BillingEntitlement> $entitlements
     * @return array{value: int, source: string}
     */
    private function integerEntitlement(Collection $entitlements, string $code, int $fallback): array
    {
        $entitlement = $entitlements->firstWhere('code', $code);

        if (
            $entitlement instanceof BillingEntitlement
            && $entitlement->value_type === 'integer'
            && $entitlement->integer_value !== null
        ) {
            return [
                'value' => max(0, (int) $entitlement->integer_value),
                'source' => 'billing_entitlements',
            ];
        }

        return [
            'value' => max(0, $fallback),
            'source' => 'config_fallback',
        ];
    }

    /**
     * @param Collection<int, BillingEntitlement> $entitlements
     * @param string[] $fallback
     * @return string[]
     */
    private function stringListEntitlement(Collection $entitlements, string $code, array $fallback): array
    {
        $entitlement = $entitlements->firstWhere('code', $code);

        if (
            $entitlement instanceof BillingEntitlement
            && $entitlement->value_type === 'string'
            && is_string($entitlement->string_value)
        ) {
            $values = array_values(array_filter(array_map(
                fn (string $value): string => strtolower(trim($value)),
                explode(',', $entitlement->string_value),
            )));

            return $values === [] ? $fallback : $values;
        }

        return $fallback;
    }
}
