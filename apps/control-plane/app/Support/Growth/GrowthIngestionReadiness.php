<?php

namespace App\Support\Growth;

use App\Models\GrowthProviderIngestion;

class GrowthIngestionReadiness
{
    public const CONTRACT_VERSION = '2026-06-29.16.1';

    /**
     * @var list<string>
     */
    private array $supportedSources = ['ga4', 'search_console', 'adsense', 'billing'];

    /**
     * @return array<string, mixed>
     */
    public function snapshot(): array
    {
        $records = GrowthProviderIngestion::query()
            ->with('site:id,slug,name,kind')
            ->orderBy('id')
            ->get();

        $sources = $records
            ->map(fn (GrowthProviderIngestion $record): array => $this->sourceSnapshot($record))
            ->all();

        return [
            'meta' => [
                'contract_version' => self::CONTRACT_VERSION,
                'mode' => 'growth_provider_ingestion_readiness',
                'side_effects' => 'none',
                'provider_activation' => false,
            ],
            'data' => [
                'summary' => [
                    'sources' => count($sources),
                    'supported_sources' => $this->supportedSources,
                    'sources_ready_for_human_activation' => count(array_filter(
                        $sources,
                        fn (array $source): bool => (bool) $source['ready_for_human_activation'],
                    )),
                    'sources_importing' => 0,
                    'provider_requests_enabled' => 0,
                    'workers_enabled' => 0,
                    'automatic_retry_enabled' => false,
                    'real_provider_data_snapshots' => count(array_filter(
                        $sources,
                        fn (array $source): bool => $source['data_status'] === 'finalized',
                    )),
                ],
                'sources' => $sources,
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function sourceSnapshot(GrowthProviderIngestion $record): array
    {
        $checks = [
            'site_configured' => $record->site !== null,
            'source_supported' => in_array($record->source, $this->supportedSources, true),
            'access_approved' => $this->statusReady($record->access_status),
            'token_confirmed_in_vault' => $this->statusReady($record->token_status),
            'quota_policy_approved' => $this->statusReady($record->quota_status),
            'data_contract_approved' => $this->statusReady($record->data_contract_status),
            'retention_policy_approved' => $this->statusReady($record->retention_status),
            'import_status_ready' => $this->statusReady($record->import_status),
            'import_feature_flag_enabled' => (bool) $record->import_enabled,
        ];

        $readyForHumanActivation = ! in_array(false, $checks, true);

        return [
            'site_slug' => $record->site?->slug,
            'site_name' => $record->site?->name,
            'site_kind' => $record->site?->kind,
            'source' => $record->source,
            'provider_label' => $record->provider_label,
            'access_status' => $record->access_status,
            'token_status' => $record->token_status,
            'quota_status' => $record->quota_status,
            'data_contract_status' => $record->data_contract_status,
            'retention_status' => $record->retention_status,
            'import_status' => $record->import_status,
            'data_status' => $record->data_status,
            'import_enabled_in_seed' => (bool) $record->import_enabled,
            'last_successful_import_at' => $record->last_successful_import_at?->toISOString(),
            'latest_snapshot_at' => $record->latest_snapshot_at?->toISOString(),
            'latest_error_code' => $record->latest_error_code,
            'evidence_count' => count($record->evidence ?? []),
            'ready_for_human_activation' => $readyForHumanActivation,
            'should_import' => false,
            'provider_request_enabled' => false,
            'worker_enabled' => false,
            'automatic_retry_enabled' => false,
            'checks' => $checks,
            'blockers' => $this->failedCheckKeys($checks),
        ];
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
}
