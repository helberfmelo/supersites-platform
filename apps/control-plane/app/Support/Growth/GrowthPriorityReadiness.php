<?php

namespace App\Support\Growth;

use App\Models\AiGrowthRecommendation;
use App\Models\GrowthProviderIngestion;
use Illuminate\Support\Collection;

class GrowthPriorityReadiness
{
    public const CONTRACT_VERSION = '2026-06-29.16.2';

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

        $priorities = $recommendations
            ->values()
            ->map(fn (AiGrowthRecommendation $recommendation, int $index): array => $this->prioritySnapshot($recommendation, $ingestions, $index + 1))
            ->all();

        $realProviderSnapshots = $ingestions
            ->filter(fn (GrowthProviderIngestion $record): bool => $record->data_status === 'finalized')
            ->count();

        return [
            'meta' => [
                'contract_version' => self::CONTRACT_VERSION,
                'mode' => 'growth_priority_readiness',
                'side_effects' => 'none',
                'provider_activation' => false,
            ],
            'data' => [
                'summary' => [
                    'recommendations' => count($priorities),
                    'priorities_ready_for_operator_review' => count(array_filter(
                        $priorities,
                        fn (array $priority): bool => (bool) $priority['operator_review_ready'],
                    )),
                    'human_gate_required' => count(array_filter(
                        $priorities,
                        fn (array $priority): bool => $priority['status'] === 'human_required',
                    )),
                    'blocked' => count(array_filter(
                        $priorities,
                        fn (array $priority): bool => $priority['status'] === 'blocked',
                    )),
                    'provider_data_available_priorities' => count(array_filter(
                        $priorities,
                        fn (array $priority): bool => (bool) $priority['provider_data_available'],
                    )),
                    'real_provider_data_snapshots' => $realProviderSnapshots,
                    'provider_data_status' => $realProviderSnapshots > 0 ? 'finalized' : 'unavailable',
                    'priority_data_status' => count($priorities) > 0 ? 'estimated' : 'unavailable',
                    'priority_model' => 'impact_confidence_minus_effort_risk',
                    'causality_status' => 'not_inferred',
                    'automatic_prioritization_enabled' => false,
                    'automatic_pr_creation_enabled' => false,
                    'external_ai_used' => 0,
                    'should_auto_apply' => false,
                    'should_create_pr' => false,
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
                'priorities' => $priorities,
            ],
        ];
    }

    /**
     * @param Collection<int, GrowthProviderIngestion> $ingestions
     * @return array<string, mixed>
     */
    private function prioritySnapshot(AiGrowthRecommendation $recommendation, Collection $ingestions, int $rank): array
    {
        $siteIngestions = $ingestions
            ->filter(fn (GrowthProviderIngestion $record): bool => $recommendation->site_id === null || $record->site_id === $recommendation->site_id);

        $providerDataAvailable = $siteIngestions
            ->contains(fn (GrowthProviderIngestion $record): bool => $record->data_status === 'finalized');

        $status = $this->priorityStatus($recommendation, $providerDataAvailable);
        $evidenceCount = count($recommendation->evidence ?? []);

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
            'automation_allowed' => false,
            'automation_enabled_in_seed' => (bool) $recommendation->automation_enabled,
            'operator_review_ready' => $status !== 'blocked' && $evidenceCount > 0,
            'causality_status' => 'not_inferred',
            'should_auto_apply' => false,
            'should_create_pr' => false,
            'blockers' => $this->blockers($recommendation, $providerDataAvailable, $evidenceCount),
        ];
    }

    private function priorityStatus(AiGrowthRecommendation $recommendation, bool $providerDataAvailable): string
    {
        if ($recommendation->status === 'blocked' || count($recommendation->evidence ?? []) === 0) {
            return 'blocked';
        }

        if ((bool) $recommendation->human_gate_required) {
            return 'human_required';
        }

        return $providerDataAvailable ? 'real_data_ready' : 'local_evidence_only';
    }

    /**
     * @return list<string>
     */
    private function blockers(AiGrowthRecommendation $recommendation, bool $providerDataAvailable, int $evidenceCount): array
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

        if (! $providerDataAvailable) {
            $blockers[] = 'provider_data_unavailable';
        }

        return array_values(array_unique($blockers));
    }
}
