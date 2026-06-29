<?php

namespace App\Support\Growth;

use App\Models\AiGrowthRecommendation;
use App\Models\GrowthProviderIngestion;
use Illuminate\Support\Collection;

class GrowthAutomationReadiness
{
    public const CONTRACT_VERSION = '2026-06-29.16.3';

    private const LOW_RISK_MAX = 2;

    /**
     * @return array<string, mixed>
     */
    public function snapshot(): array
    {
        $recommendations = AiGrowthRecommendation::query()
            ->with('site:id,slug,name,kind')
            ->orderBy('human_gate_required')
            ->orderByRaw("case status when 'candidate' then 0 when 'watching' then 1 when 'human_required' then 2 else 3 end")
            ->orderByDesc('priority_score')
            ->orderBy('title')
            ->get();

        $ingestions = GrowthProviderIngestion::query()
            ->with('site:id,slug,name,kind')
            ->orderBy('id')
            ->get();

        $automationQueue = $recommendations
            ->values()
            ->map(fn (AiGrowthRecommendation $recommendation, int $index): array => $this->automationSnapshot($recommendation, $ingestions, $index + 1))
            ->all();

        $realProviderSnapshots = $ingestions
            ->filter(fn (GrowthProviderIngestion $record): bool => $record->data_status === 'finalized')
            ->count();

        return [
            'meta' => [
                'contract_version' => self::CONTRACT_VERSION,
                'mode' => 'growth_automation_readiness',
                'side_effects' => 'none',
                'provider_activation' => false,
            ],
            'data' => [
                'summary' => [
                    'recommendations' => count($automationQueue),
                    'pr_review_candidates' => count(array_filter(
                        $automationQueue,
                        fn (array $item): bool => $item['status'] === 'pr_review_only',
                    )),
                    'human_gate_required' => AiGrowthRecommendation::query()->where('human_gate_required', true)->count(),
                    'blocked' => count(array_filter(
                        $automationQueue,
                        fn (array $item): bool => $item['status'] === 'blocked',
                    )),
                    'provider_data_available_candidates' => count(array_filter(
                        $automationQueue,
                        fn (array $item): bool => $item['status'] === 'pr_review_only' && (bool) $item['provider_data_available'],
                    )),
                    'real_provider_data_snapshots' => $realProviderSnapshots,
                    'data_status' => $realProviderSnapshots > 0 ? 'finalized' : 'unavailable',
                    'automation_mode' => 'pr_review_only_fail_closed',
                    'automatic_branch_creation_enabled' => false,
                    'automatic_pr_creation_enabled' => false,
                    'auto_merge_enabled' => false,
                    'direct_publish_enabled' => false,
                    'branches_created' => 0,
                    'pull_requests_opened' => 0,
                    'auto_merges_executed' => 0,
                    'publications_executed' => 0,
                    'external_ai_used' => AiGrowthRecommendation::query()->where('external_ai_used', true)->count(),
                    'should_create_branch' => false,
                    'should_open_pull_request' => false,
                    'should_auto_merge' => false,
                    'should_publish' => false,
                ],
                'provider_data' => [
                    'sources' => $ingestions->count(),
                    'finalized_sources' => $realProviderSnapshots,
                    'import_enabled_sources' => $ingestions
                        ->filter(fn (GrowthProviderIngestion $record): bool => (bool) $record->import_enabled)
                        ->count(),
                    'workers_enabled' => 0,
                    'provider_requests_enabled' => 0,
                ],
                'automation_queue' => $automationQueue,
            ],
        ];
    }

    /**
     * @param Collection<int, GrowthProviderIngestion> $ingestions
     * @return array<string, mixed>
     */
    private function automationSnapshot(AiGrowthRecommendation $recommendation, Collection $ingestions, int $rank): array
    {
        $siteIngestions = $ingestions
            ->filter(fn (GrowthProviderIngestion $record): bool => $recommendation->site_id === null || $record->site_id === $recommendation->site_id);

        $providerDataAvailable = $siteIngestions
            ->contains(fn (GrowthProviderIngestion $record): bool => $record->data_status === 'finalized');

        $evidenceCount = count($recommendation->evidence ?? []);
        $status = $this->automationStatus($recommendation, $evidenceCount);

        return [
            'rank' => $rank,
            'recommendation_id' => $recommendation->id,
            'site_slug' => $recommendation->site?->slug,
            'site_name' => $recommendation->site?->name ?? 'Portfolio',
            'site_kind' => $recommendation->site?->kind,
            'category' => $recommendation->category,
            'title' => $recommendation->title,
            'status' => $status,
            'source_status' => $recommendation->status,
            'risk_level' => $this->riskLevel($recommendation->risk_score),
            'impact_score' => $recommendation->impact_score,
            'effort_score' => $recommendation->effort_score,
            'confidence_score' => $recommendation->confidence_score,
            'risk_score' => $recommendation->risk_score,
            'priority_score' => $recommendation->priority_score,
            'data_status' => $providerDataAvailable ? 'finalized' : ($evidenceCount > 0 ? 'estimated' : 'unavailable'),
            'provider_data_available' => $providerDataAvailable,
            'provider_sources_finalized' => $siteIngestions
                ->filter(fn (GrowthProviderIngestion $record): bool => $record->data_status === 'finalized')
                ->pluck('source')
                ->values()
                ->all(),
            'evidence_count' => $evidenceCount,
            'human_gate_required' => (bool) $recommendation->human_gate_required,
            'external_ai_used' => (bool) $recommendation->external_ai_used,
            'automation_enabled_in_seed' => (bool) $recommendation->automation_enabled,
            'pr_review_ready' => $status === 'pr_review_only',
            'branch_creation_allowed' => false,
            'pull_request_creation_allowed' => false,
            'auto_merge_allowed' => false,
            'direct_publish_allowed' => false,
            'should_create_branch' => false,
            'should_open_pull_request' => false,
            'should_auto_merge' => false,
            'should_publish' => false,
            'side_effects' => 'none',
            'blockers' => $this->blockers($recommendation, $evidenceCount),
            'guardrails' => $this->guardrails($recommendation, $providerDataAvailable),
        ];
    }

    private function automationStatus(AiGrowthRecommendation $recommendation, int $evidenceCount): string
    {
        if ((bool) $recommendation->human_gate_required) {
            return 'human_required';
        }

        if (
            $recommendation->status === 'blocked'
            || $evidenceCount === 0
            || $recommendation->risk_score === null
            || $recommendation->risk_score > self::LOW_RISK_MAX
            || (bool) $recommendation->external_ai_used
        ) {
            return 'blocked';
        }

        return 'pr_review_only';
    }

    /**
     * @return list<string>
     */
    private function blockers(AiGrowthRecommendation $recommendation, int $evidenceCount): array
    {
        $blockers = [];

        if ($evidenceCount === 0) {
            $blockers[] = 'missing_evidence';
        }

        if ($recommendation->status === 'blocked') {
            $blockers[] = 'blocked_recommendation';
        }

        if ((bool) $recommendation->human_gate_required) {
            $blockers[] = 'human_review_required';
        }

        if ($recommendation->risk_score === null) {
            $blockers[] = 'missing_risk_score';
        } elseif ($recommendation->risk_score > self::LOW_RISK_MAX) {
            $blockers[] = 'risk_above_low_risk_threshold';
        }

        if ((bool) $recommendation->external_ai_used) {
            $blockers[] = 'external_ai_review_required';
        }

        return array_values(array_unique($blockers));
    }

    /**
     * @return list<string>
     */
    private function guardrails(AiGrowthRecommendation $recommendation, bool $providerDataAvailable): array
    {
        $guardrails = [
            'manual_operator_review_required',
            'branch_creation_disabled',
            'pull_request_creation_disabled',
            'auto_merge_disabled',
            'direct_publish_disabled',
        ];

        if (! $providerDataAvailable) {
            $guardrails[] = 'provider_data_unavailable';
        }

        if ((bool) $recommendation->automation_enabled) {
            $guardrails[] = 'seed_automation_flag_ignored';
        }

        return array_values(array_unique($guardrails));
    }

    private function riskLevel(?int $riskScore): string
    {
        if ($riskScore === null) {
            return 'unknown';
        }

        if ($riskScore <= self::LOW_RISK_MAX) {
            return 'low';
        }

        if ($riskScore <= 4) {
            return 'medium';
        }

        return 'high';
    }
}
