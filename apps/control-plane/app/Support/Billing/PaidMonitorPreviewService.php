<?php

namespace App\Support\Billing;

use App\Models\AuditLog;
use App\Models\NetProbeMonitor;
use App\Models\Site;
use App\Models\User;
use App\Support\NetProbe\NetProbeHostGuard;
use Illuminate\Validation\ValidationException;

class PaidMonitorPreviewService
{
    public const CONTRACT_VERSION = '2026-06-29.3';

    public function __construct(
        private readonly NetProbeHostGuard $guard,
        private readonly PlanEntitlementResolver $entitlements,
    ) {
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function catalog(?User $user): array
    {
        return array_map(
            fn (string $siteSlug): array => $this->catalogItem($siteSlug, $user),
            array_keys($this->products()),
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function preview(User $user, string $siteSlug, string $monitorType, string $target, ?int $frequencyMinutes): array
    {
        $siteSlug = $this->normalizeSiteSlug($siteSlug);
        $product = $this->product($siteSlug);
        $site = Site::query()->where('slug', $siteSlug)->first();
        $quota = $this->quota($site, $product);
        $type = strtolower(trim($monitorType));

        if (! in_array($type, $quota['allowed_types'], true)) {
            throw ValidationException::withMessages([
                'monitor_type' => ['The selected monitor type is not available in this preview plan.'],
            ]);
        }

        $used = $this->usedMonitors($siteSlug, $user);
        if ($used >= (int) $quota['max_monitors']) {
            throw ValidationException::withMessages([
                'quota' => ['The preview quota does not have remaining monitor slots.'],
            ]);
        }

        $normalizedTarget = $this->normalizeTarget((string) $product['target_kind'], $target);
        $frequency = $this->normalizeFrequency($frequencyMinutes);
        $targetHash = hash('sha256', $siteSlug.'|'.$type.'|'.$normalizedTarget);

        AuditLog::record($user, 'api.monitoring.preview.generated', $site, metadata: [
            'site_slug' => $siteSlug,
            'monitor_type' => $type,
            'target_hash' => $targetHash,
            'frequency_minutes' => $frequency,
            'quota_source' => $quota['source'],
            'persisted' => false,
        ]);

        return [
            'data' => [
                'site_slug' => $siteSlug,
                'site_name' => $product['name'],
                'monitor_type' => $type,
                'target_kind' => $product['target_kind'],
                'target_preview' => $normalizedTarget,
                'target_hash' => $targetHash,
                'frequency_minutes' => $frequency,
                'activation_state' => 'preview_only',
                'persisted' => false,
                'queued' => false,
                'worker_enabled' => false,
                'alert_delivery_enabled' => false,
                'history_retention_days' => 0,
                'free_preview_resolves_basic_need' => true,
            ],
            'meta' => [
                ...$this->quotaMeta($quota, $used),
                'contract_version' => self::CONTRACT_VERSION,
                'mode' => 'authenticated_preview',
                'side_effects' => 'audit_hash_only',
                'real_monitoring_enabled' => false,
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function catalogItem(string $siteSlug, ?User $user): array
    {
        $product = $this->product($siteSlug);
        $site = Site::query()->where('slug', $siteSlug)->first();
        $quota = $this->quota($site, $product);
        $used = $user instanceof User ? $this->usedMonitors($siteSlug, $user) : 0;

        return [
            'site_slug' => $siteSlug,
            'site_name' => $product['name'],
            'target_kind' => $product['target_kind'],
            'allowed_types' => $quota['allowed_types'],
            'activation_state' => 'preview_only',
            'checkout_enabled' => false,
            'worker_enabled' => false,
            'alert_delivery_enabled' => false,
            ...$this->quotaMeta($quota, $used),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function quota(?Site $site, array $product): array
    {
        return $this->entitlements->monitorQuota(
            $site,
            (int) $product['fallback_max_monitors'],
            $product['allowed_types'],
        );
    }

    /**
     * @return array<string, mixed>
     */
    private function quotaMeta(array $quota, int $used): array
    {
        return [
            'billing_plan' => $quota['plan_slug'],
            'quota_source' => $quota['source'],
            'max_monitors' => (int) $quota['max_monitors'],
            'used_monitors' => $used,
            'remaining_monitors' => max(0, ((int) $quota['max_monitors']) - $used),
            'checkout_enabled' => (bool) $quota['checkout_enabled'],
        ];
    }

    private function usedMonitors(string $siteSlug, User $user): int
    {
        if ($siteSlug !== 'netprobe-atlas') {
            return 0;
        }

        return NetProbeMonitor::query()
            ->where('user_id', $user->id)
            ->whereIn('status', [NetProbeMonitor::STATUS_ACTIVE, NetProbeMonitor::STATUS_PAUSED])
            ->count();
    }

    private function normalizeTarget(string $targetKind, string $target): string
    {
        if ($targetKind === 'url') {
            return $this->normalizeUrl($target);
        }

        return $this->guard->normalizeHostname($target);
    }

    private function normalizeUrl(string $value): string
    {
        $url = trim($value);
        if ($url === '') {
            throw ValidationException::withMessages(['target' => ['Enter a website URL.']]);
        }

        if (! preg_match('/^https?:\/\//i', $url)) {
            $url = 'https://'.$url;
        }

        $parts = parse_url($url);
        if (! is_array($parts) || ! isset($parts['scheme'], $parts['host'])) {
            throw ValidationException::withMessages(['target' => ['Enter a valid HTTP or HTTPS URL.']]);
        }

        $scheme = strtolower((string) $parts['scheme']);
        if (! in_array($scheme, ['http', 'https'], true)) {
            throw ValidationException::withMessages(['target' => ['Only HTTP and HTTPS URLs are supported.']]);
        }

        if (isset($parts['user']) || isset($parts['pass']) || isset($parts['fragment']) || array_key_exists('query', $parts)) {
            throw ValidationException::withMessages(['target' => ['URL credentials, fragments and query strings are not accepted in monitor previews.']]);
        }

        $port = $parts['port'] ?? null;
        if ($port !== null && ! in_array((int) $port, [80, 443], true)) {
            throw ValidationException::withMessages(['target' => ['Only standard web ports are accepted in monitor previews.']]);
        }

        $host = $this->guard->normalizeHostname((string) $parts['host']);
        $path = isset($parts['path']) && is_string($parts['path']) ? $parts['path'] : '';
        $path = $path === '' ? '/' : '/'.ltrim($path, '/');

        if (strlen($path) > 160) {
            throw ValidationException::withMessages(['target' => ['URL path is too long for monitor preview.']]);
        }

        $portPart = $port !== null ? ':'.((int) $port) : '';

        return "{$scheme}://{$host}{$portPart}{$path}";
    }

    private function normalizeFrequency(?int $frequencyMinutes): int
    {
        $minimum = (int) config('billing.monitor_previews.minimum_frequency_minutes', 60);
        $maximum = (int) config('billing.monitor_previews.maximum_frequency_minutes', 1440);
        $default = (int) config('billing.monitor_previews.default_frequency_minutes', 60);
        $value = $frequencyMinutes ?? $default;

        return min($maximum, max($minimum, $value));
    }

    /**
     * @return array<string, array<string, mixed>>
     */
    private function products(): array
    {
        $products = config('billing.monitor_previews.products', []);

        return is_array($products) ? $products : [];
    }

    /**
     * @return array<string, mixed>
     */
    private function product(string $siteSlug): array
    {
        $product = $this->products()[$siteSlug] ?? null;

        if (! is_array($product)) {
            throw ValidationException::withMessages([
                'site_slug' => ['The selected site is not available for monitor preview.'],
            ]);
        }

        return $product;
    }

    private function normalizeSiteSlug(string $siteSlug): string
    {
        return strtolower(trim($siteSlug));
    }
}
