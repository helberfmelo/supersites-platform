<?php

namespace Database\Seeders;

use App\Models\AiGrowthAnomaly;
use App\Models\AiGrowthAudit;
use App\Models\AiGrowthRecommendation;
use App\Models\Site;
use Illuminate\Database\Seeder;

class AiGrowthReadinessSeeder extends Seeder
{
    public function run(): void
    {
        $audit = AiGrowthAudit::updateOrCreate(
            [
                'site_id' => null,
                'audit_type' => 'portfolio_growth_readiness',
                'source' => 'seeded',
            ],
            [
                'status' => 'ready',
                'evidence_summary' => [
                    'contract' => '2026-06-27.1',
                    'external_ai_used' => false,
                    'automation_enabled' => false,
                    'required_fields' => ['evidence', 'impact', 'effort', 'confidence', 'risk'],
                ],
                'started_at' => now()->subMinutes(5),
                'completed_at' => now(),
            ],
        );

        $sitePulse = Site::query()->where('slug', 'sitepulse-lab')->first();

        $this->upsertRecommendation($audit, null, [
            'category' => 'technical',
            'title' => 'Keep deploy dry-run reliability ahead of launch volume',
            'status' => 'candidate',
            'impact_score' => 5,
            'effort_score' => 2,
            'confidence_score' => 5,
            'risk_score' => 2,
            'recommendation' => 'Prioritize artifact, smoke and rollback evidence before increasing public launch cadence.',
            'risk_notes' => 'Known artifact quota annotations are non-blocking today but should remain visible.',
            'human_gate_required' => false,
            'evidence' => [
                [
                    'type' => 'check',
                    'source' => 'docs/STATUS.md',
                    'summary' => 'Sprint 6.4 Quality Gate, deploy dry-run and public smokes passed.',
                    'value' => 'passed',
                ],
                [
                    'type' => 'runbook',
                    'source' => 'docs/RUNBOOKS/CI_CD.md',
                    'summary' => 'Deploy dry-run remains the release gate before real hosting publish.',
                    'value' => 'dry_run_required',
                ],
            ],
        ]);

        $this->upsertRecommendation($audit, null, [
            'category' => 'aio',
            'title' => 'Build evidence-first SEO and AIO backlog before content expansion',
            'status' => 'candidate',
            'impact_score' => 4,
            'effort_score' => 3,
            'confidence_score' => 4,
            'risk_score' => 3,
            'recommendation' => 'Use launch status, sitemap coverage, structured data and hand-reviewed queries as evidence for each growth task.',
            'risk_notes' => 'Avoid mass content generation, thin pages or misleading ranking claims.',
            'human_gate_required' => false,
            'evidence' => [
                [
                    'type' => 'runbook',
                    'source' => 'docs/SEO_AIO_PLAYBOOK.md',
                    'summary' => 'SEO and AIO work must be useful, reviewable and tied to real product value.',
                    'value' => 'evidence_required',
                ],
            ],
        ]);

        $this->upsertRecommendation($audit, null, [
            'category' => 'monetization',
            'title' => 'Keep AdSense serving disabled until account and site review gates pass',
            'status' => 'human_required',
            'impact_score' => 4,
            'effort_score' => 4,
            'confidence_score' => 5,
            'risk_score' => 5,
            'recommendation' => 'Prepare readiness only; do not inject publisher ids, ad snippets, ads.txt or live ad requests without the documented human approvals.',
            'risk_notes' => 'Policy, identity and site-review steps are irreversible or account-bound.',
            'human_gate_required' => true,
            'evidence' => [
                [
                    'type' => 'human_required',
                    'source' => 'docs/HUMAN_ACTION_REQUIRED.md',
                    'summary' => 'AdSense account, review, PIN and publisher activation remain human-required.',
                    'value' => 'pending',
                ],
                [
                    'type' => 'gate',
                    'source' => 'docs/ADSENSE_PLAYBOOK.md',
                    'summary' => 'Ads remain placeholders until CMP, policy and site-specific gates pass.',
                    'value' => 'disabled',
                ],
            ],
        ]);

        $this->upsertRecommendation($audit, null, [
            'category' => 'monetization',
            'title' => 'Keep paid checkout gated until billing KYC, tax and webhook controls pass',
            'status' => 'human_required',
            'impact_score' => 5,
            'effort_score' => 4,
            'confidence_score' => 5,
            'risk_score' => 5,
            'recommendation' => 'Use local plans and entitlements for readiness only; do not create payment links, provider SDK calls or public webhook endpoints yet.',
            'risk_notes' => 'Provider accounts, tax profile, bank setup and checkout activation require human approval.',
            'human_gate_required' => true,
            'evidence' => [
                [
                    'type' => 'human_required',
                    'source' => 'docs/HUMAN_ACTION_REQUIRED.md',
                    'summary' => 'Billing provider account, KYC, taxes, payment profile and terms are pending.',
                    'value' => 'pending',
                ],
                [
                    'type' => 'gate',
                    'source' => 'docs/BILLING.md',
                    'summary' => 'Billing foundation is fail-closed and has no real checkout or webhook activation.',
                    'value' => 'disabled',
                ],
            ],
        ]);

        $this->upsertRecommendation($audit, $sitePulse, [
            'category' => 'anomaly',
            'title' => 'Track public smoke drift before SitePulse paid monitoring',
            'status' => 'watching',
            'impact_score' => 4,
            'effort_score' => 2,
            'confidence_score' => 4,
            'risk_score' => 2,
            'recommendation' => 'Compare public smoke results and local preview checks before introducing uptime history or alerting upgrades.',
            'risk_notes' => 'Do not send alerts or store external monitoring history until explicit SitePulse gates exist.',
            'human_gate_required' => false,
            'evidence' => [
                [
                    'type' => 'metric',
                    'source' => 'docs/METRICS.md',
                    'summary' => 'Recent public smokes for Hub, control-plane and NetProbe passed.',
                    'value' => '0_failures',
                ],
            ],
        ]);

        $this->upsertAnomaly($audit, null, [
            'metric_key' => 'deploy_dry_run_artifact_quota_annotations',
            'direction' => 'increase',
            'baseline_value' => 0,
            'current_value' => 1,
            'threshold_percent' => 50,
            'change_percent' => 100,
            'status' => 'watching',
            'evidence' => [
                [
                    'type' => 'check',
                    'source' => 'docs/STATUS.md',
                    'summary' => 'Sprint 6.4 deploy dry-run succeeded with a known artifact quota annotation.',
                    'value' => 'non_blocking_annotation',
                ],
            ],
        ]);

        $this->upsertAnomaly($audit, null, [
            'metric_key' => 'external_activation_count',
            'direction' => 'increase',
            'baseline_value' => 0,
            'current_value' => 0,
            'threshold_percent' => 1,
            'change_percent' => 0,
            'status' => 'within_threshold',
            'evidence' => [
                [
                    'type' => 'gate',
                    'source' => 'docs/STATUS.md',
                    'summary' => 'No real ads, analytics, billing, webhook, checkout or external AI activation is recorded.',
                    'value' => 0,
                ],
            ],
        ]);
    }

    /**
     * @param array<string, mixed> $attributes
     */
    private function upsertRecommendation(AiGrowthAudit $audit, ?Site $site, array $attributes): void
    {
        $impact = (int) $attributes['impact_score'];
        $effort = (int) $attributes['effort_score'];
        $confidence = (int) $attributes['confidence_score'];
        $risk = (int) $attributes['risk_score'];

        AiGrowthRecommendation::updateOrCreate(
            [
                'ai_growth_audit_id' => $audit->id,
                'site_id' => $site?->id,
                'title' => $attributes['title'],
            ],
            [
                ...$attributes,
                'priority_score' => ($impact * $confidence) - $effort - $risk,
                'automation_enabled' => false,
                'external_ai_used' => false,
            ],
        );
    }

    /**
     * @param array<string, mixed> $attributes
     */
    private function upsertAnomaly(AiGrowthAudit $audit, ?Site $site, array $attributes): void
    {
        AiGrowthAnomaly::updateOrCreate(
            [
                'ai_growth_audit_id' => $audit->id,
                'site_id' => $site?->id,
                'metric_key' => $attributes['metric_key'],
            ],
            [
                ...$attributes,
                'causality_status' => 'not_inferred',
                'detected_at' => now(),
            ],
        );
    }
}
