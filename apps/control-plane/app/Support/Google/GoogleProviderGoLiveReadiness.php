<?php

namespace App\Support\Google;

use App\Models\GoogleIntegration;

class GoogleProviderGoLiveReadiness
{
    public const CONTRACT_VERSION = '2026-06-29.15.2';

    /**
     * @var list<string>
     */
    private array $allowedEvents = [
        'tool_viewed',
        'tool_started',
        'tool_completed',
        'tool_failed',
        'result_copied',
        'file_uploaded',
        'file_processed',
        'file_downloaded',
        'monitor_created',
        'signup_started',
        'signup_completed',
        'upgrade_viewed',
        'checkout_started',
        'purchase_completed',
        'subscription_cancelled',
        'outbound_site_click',
    ];

    /**
     * @return array<string, mixed>
     */
    public function snapshot(): array
    {
        $integrations = GoogleIntegration::query()
            ->with('site:id,slug,name,kind')
            ->orderBy('id')
            ->get();

        $siteSnapshots = $integrations
            ->map(fn (GoogleIntegration $integration): array => $this->integrationSnapshot($integration))
            ->all();

        return [
            'meta' => [
                'contract_version' => self::CONTRACT_VERSION,
                'mode' => 'google_provider_go_live_readiness',
                'side_effects' => 'none',
                'provider_activation' => false,
            ],
            'data' => [
                'summary' => [
                    'integrations' => count($siteSnapshots),
                    'sites_ready_for_human_activation' => count(array_filter(
                        $siteSnapshots,
                        fn (array $site): bool => (bool) $site['ready_for_human_activation'],
                    )),
                    'sites_loading_ga4' => 0,
                    'sites_loading_gtm' => 0,
                    'sites_importing_search_console' => 0,
                    'automatic_tag_injection_enabled' => false,
                    'automatic_data_import_enabled' => false,
                ],
                'sites' => $siteSnapshots,
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function integrationSnapshot(GoogleIntegration $integration): array
    {
        $ga4MeasurementId = $this->normalizeGa4MeasurementId($integration->ga4_measurement_id);
        $gtmContainerId = $this->normalizeGtmContainerId($integration->gtm_container_id);
        $eventContractSafe = $this->eventContractSafe($integration->allowed_events);

        $checks = [
            'google_access_approved' => $this->statusReady($integration->access_status),
            'definitive_domain_ready' => $this->statusReady($integration->domain_mode),
            'domain_property_configured' => filled($integration->domain_property),
            'ga4_property_configured' => filled($integration->ga4_property_id),
            'ga4_measurement_id_valid' => $ga4MeasurementId !== null,
            'gtm_container_id_valid' => $gtmContainerId !== null,
            'search_console_property_configured' => filled($integration->search_console_property),
            'search_console_verified' => $this->statusReady($integration->search_console_status),
            'event_contract_safe' => $eventContractSafe,
            'tag_feature_flag_enabled' => (bool) $integration->tags_enabled,
        ];

        $readyForHumanActivation = ! in_array(false, $checks, true);

        return [
            'site_slug' => $integration->site?->slug,
            'site_name' => $integration->site?->name,
            'site_kind' => $integration->site?->kind,
            'domain_mode' => $integration->domain_mode,
            'domain_property_configured' => filled($integration->domain_property),
            'ga4_status' => $integration->ga4_status,
            'ga4_property_configured' => filled($integration->ga4_property_id),
            'ga4_measurement_id_configured' => $ga4MeasurementId !== null,
            'ga4_measurement_id_preview' => $ga4MeasurementId ? $this->maskIdentifier($ga4MeasurementId) : null,
            'gtm_status' => $integration->gtm_status,
            'gtm_container_id_configured' => $gtmContainerId !== null,
            'gtm_container_id_preview' => $gtmContainerId ? $this->maskIdentifier($gtmContainerId) : null,
            'search_console_status' => $integration->search_console_status,
            'search_console_property_configured' => filled($integration->search_console_property),
            'access_status' => $integration->access_status,
            'tags_enabled_in_seed' => (bool) $integration->tags_enabled,
            'data_import_enabled_in_seed' => (bool) $integration->data_import_enabled,
            'allowed_events_count' => count($integration->allowed_events ?? []),
            'ready_for_human_activation' => $readyForHumanActivation,
            'should_load_ga4' => false,
            'should_load_gtm' => false,
            'should_import_search_console' => false,
            'checks' => $checks,
            'blockers' => $this->failedCheckKeys($checks),
        ];
    }

    private function normalizeGa4MeasurementId(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $normalized = strtoupper(trim($value));

        return preg_match('/^G-[A-Z0-9]{4,20}$/', $normalized) === 1 ? $normalized : null;
    }

    private function normalizeGtmContainerId(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $normalized = strtoupper(trim($value));

        return preg_match('/^GTM-[A-Z0-9]{4,20}$/', $normalized) === 1 ? $normalized : null;
    }

    /**
     * @param mixed $events
     */
    private function eventContractSafe(mixed $events): bool
    {
        if (! is_array($events) || $events === []) {
            return false;
        }

        foreach ($events as $event) {
            if (! is_string($event) || ! in_array($event, $this->allowedEvents, true)) {
                return false;
            }
        }

        return true;
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
            'passed',
            'published',
            'ready',
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

        return substr($identifier, 0, 5).'***'.substr($identifier, -4);
    }
}
