<?php

namespace Database\Seeders;

use App\Models\BenchmarkOpportunity;
use App\Models\BenchmarkSiteReadiness;
use App\Models\Site;
use Illuminate\Database\Seeder;

class BenchmarkRefinementSeeder extends Seeder
{
    public function run(): void
    {
        $profiles = [
            'supersite' => [
                'scores' => [94, 95, 88, 80, 94, 95],
                'status' => 'completed',
                'title' => 'Surface benchmark and monetization readiness in the Hub',
                'category' => 'dashboard',
                'priority' => 'p0',
                'summary' => 'Phase 18 closed the public Hub, catalog, legal, status and dashboard benchmark refinement using local evidence only.',
                'human_gate_required' => false,
            ],
            'netprobe-atlas' => [
                'scores' => [94, 95, 88, 80, 94, 90],
                'status' => 'completed',
                'title' => 'Refine DNS propagation and IP lookup around layered answers',
                'category' => 'frontend',
                'priority' => 'p0',
                'summary' => 'Phase 18 refined NetProbe home, IP and bounded network tools around answer-first diagnostics and inert support/ads surfaces.',
                'human_gate_required' => false,
            ],
            'calcharbor' => [
                'scores' => [94, 95, 88, 80, 94, 95],
                'status' => 'completed',
                'title' => 'Make calculator cards expose formula, examples and next actions',
                'category' => 'seo_aio',
                'priority' => 'p1',
                'summary' => 'Phase 18 refined the calculator hub and tool pages with immediate answers, formulas, scenarios and related paths.',
                'human_gate_required' => false,
            ],
            'devutility-lab' => [
                'scores' => [94, 95, 88, 80, 94, 95],
                'status' => 'completed',
                'title' => 'Clarify local processing and split editor/result workflows',
                'category' => 'frontend',
                'priority' => 'p1',
                'summary' => 'Phase 18 refined developer tools into task-specific editor/result workflows while keeping local-first boundaries.',
                'human_gate_required' => false,
            ],
            'timenexus' => [
                'scores' => [94, 95, 88, 80, 94, 95],
                'status' => 'completed',
                'title' => 'Add timeline-style scan patterns to time conversion pages',
                'category' => 'frontend',
                'priority' => 'p1',
                'summary' => 'Phase 18 refined time, calendar and unit tools with live conversions, timelines and clear local utility.',
                'human_gate_required' => false,
            ],
            'qrroute' => [
                'scores' => [94, 95, 88, 80, 94, 95],
                'status' => 'completed',
                'title' => 'Separate static QR value from dynamic QR paid gates',
                'category' => 'monetization',
                'priority' => 'p1',
                'summary' => 'Phase 18 refined QR, barcode, UTM, vCard, Wi-Fi and preview flows without activating dynamic links or analytics.',
                'human_gate_required' => false,
            ],
            'invoicecraft' => [
                'scores' => [94, 95, 88, 80, 94, 95],
                'status' => 'completed',
                'title' => 'Improve document preview confidence without fiscal claims',
                'category' => 'compliance',
                'priority' => 'p1',
                'summary' => 'Phase 18 refined invoice, quote and receipt builders with local previews while fiscal, tax and payments remain gated.',
                'human_gate_required' => true,
            ],
            'mailhealth' => [
                'scores' => [94, 95, 88, 80, 94, 95],
                'status' => 'completed',
                'title' => 'Turn email diagnostics into score, checklist and fix guidance',
                'category' => 'frontend',
                'priority' => 'p1',
                'summary' => 'Phase 18 refined SPF, DKIM, DMARC, MX, blacklist, SMTP and header diagnostics around actionable results.',
                'human_gate_required' => false,
            ],
            'sitepulse-lab' => [
                'scores' => [94, 95, 88, 80, 94, 95],
                'status' => 'completed',
                'title' => 'Put one-off status answers before technical probe detail',
                'category' => 'frontend',
                'priority' => 'p1',
                'summary' => 'Phase 18 refined status, redirect, headers, robots, sitemap, TTFB and performance snapshot pages.',
                'human_gate_required' => false,
            ],
            'pixelbatch' => [
                'scores' => [94, 95, 88, 80, 94, 95],
                'status' => 'completed',
                'title' => 'Strengthen visual before/after and privacy reassurance',
                'category' => 'frontend',
                'priority' => 'p1',
                'summary' => 'Phase 18 refined browser-side image compression, resize, crop, conversion, metadata and social preset flows.',
                'human_gate_required' => false,
            ],
            'docshift' => [
                'scores' => [94, 95, 88, 80, 94, 95],
                'status' => 'completed',
                'title' => 'Make PDF tool pages feel task-first and safely gated',
                'category' => 'frontend',
                'priority' => 'p1',
                'summary' => 'Phase 18 refined browser-side PDF merge, split, rotate, compress, watermark, page number, metadata and text-to-PDF flows.',
                'human_gate_required' => false,
            ],
        ];

        foreach ($profiles as $slug => $profile) {
            $site = Site::query()->where('slug', $slug)->first();

            if (! $site) {
                continue;
            }

            $scores = $profile['scores'];

            BenchmarkSiteReadiness::updateOrCreate(
                ['site_id' => $site->id],
                [
                    'benchmark_score' => $scores[0],
                    'seo_aio_score' => $scores[1],
                    'adsense_score' => $scores[2],
                    'monetization_score' => $scores[3],
                    'frontend_score' => $scores[4],
                    'performance_score' => $scores[5],
                    'overall_score' => (int) round(array_sum($scores) / count($scores)),
                    'status' => $profile['status'],
                    'data_status' => 'estimated',
                    'evidence' => $this->evidenceFor($slug),
                    'notes' => 'Phase 18 closure uses local builds, generated HTML, public-copy, AdSense-safe, Lighthouse public audit and CI evidence only; external providers remain disabled.',
                    'external_provider_active' => false,
                    'real_ads_enabled' => false,
                    'real_billing_enabled' => false,
                ],
            );

            $this->upsertOpportunity($site, $profile);
            $this->upsertMonetizationGate($site);
        }
    }

    /**
     * @param array<string, mixed> $profile
     */
    private function upsertOpportunity(Site $site, array $profile): void
    {
        $impact = $profile['priority'] === 'p0' ? 5 : 4;
        $effort = $profile['human_gate_required'] ? 4 : 3;
        $confidence = 4;
        $risk = $profile['human_gate_required'] ? 4 : 2;

        BenchmarkOpportunity::updateOrCreate(
            [
                'site_id' => $site->id,
                'category' => $profile['category'],
                'title' => $profile['title'],
            ],
            [
                'summary' => $profile['summary'],
                'status' => $profile['status'] === 'completed' ? 'completed' : ($profile['human_gate_required'] ? 'human_required' : 'planned'),
                'priority' => $profile['priority'],
                'impact_score' => $impact,
                'effort_score' => $effort,
                'confidence_score' => $confidence,
                'risk_score' => $risk,
                'priority_score' => ($impact * $confidence) - $effort - $risk,
                'data_status' => 'estimated',
                'evidence' => $this->evidenceFor($site->slug),
                'human_gate_required' => $profile['human_gate_required'],
                'automation_enabled' => false,
                'external_provider_active' => false,
            ],
        );
    }

    private function upsertMonetizationGate(Site $site): void
    {
        BenchmarkOpportunity::updateOrCreate(
            [
                'site_id' => $site->id,
                'category' => 'monetization',
                'title' => 'Keep ads, donations, affiliates and checkout gated until approvals pass',
            ],
            [
                'summary' => 'Prepare placements and messaging only; real AdSense, donation payment links, affiliate URLs and checkout remain blocked by human gates.',
                'status' => 'human_required',
                'priority' => 'p1',
                'impact_score' => 4,
                'effort_score' => 4,
                'confidence_score' => 5,
                'risk_score' => 5,
                'priority_score' => 11,
                'data_status' => 'estimated',
                'evidence' => [
                    ['source' => 'docs/HUMAN_ACTION_REQUIRED.md', 'summary' => 'AdSense, donations, affiliates and billing require human approvals.'],
                    ['source' => 'docs/ADSENSE_PLAYBOOK.md', 'summary' => 'Ad slots remain inert placeholders until policy and account gates pass.'],
                    ['source' => 'docs/BILLING.md', 'summary' => 'Checkout, webhooks and paid entitlements remain disabled.'],
                ],
                'human_gate_required' => true,
                'automation_enabled' => false,
                'external_provider_active' => false,
            ],
        );
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function evidenceFor(string $slug): array
    {
        return [
            ['source' => 'docs/BENCHMARK_MATRIX.md', 'summary' => 'Portfolio benchmark matrix created in Sprint 7.1.'],
            ['source' => 'docs/PHASE_18_BENCHMARK_REFINEMENT_REPORT.md', 'summary' => 'Phase 18 closure report records page-by-page refinement, QA evidence and remaining human gates.'],
            ['source' => 'docs/ROADMAP_FASE_18_REFINAMENTO_BENCHMARK_PAGE_BY_PAGE.md', 'summary' => 'Phase 18 compact roadmap is closed through Sprint 18.99.'],
            ['source' => "docs/SITES/{$slug}/SPRINT_PLAN.md", 'summary' => 'Site benchmark sprint plan exists.'],
            ['source' => "docs/SITES/{$slug}/FRONTEND_REFINEMENT_PLAN.md", 'summary' => 'Frontend refinement plan exists.'],
            ['source' => 'docs/METRICS.md', 'summary' => 'Current metric baseline shows external ads, billing, donations and affiliates at zero.'],
        ];
    }
}
