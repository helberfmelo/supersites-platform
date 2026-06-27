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
                'scores' => [74, 72, 64, 62, 80, 76],
                'status' => 'in_progress',
                'title' => 'Surface benchmark and monetization readiness in the Hub',
                'category' => 'dashboard',
                'priority' => 'p0',
                'summary' => 'Expose portfolio benchmark readiness, SEO/AIO readiness and gated monetization backlog from local evidence.',
                'human_gate_required' => false,
            ],
            'netprobe-atlas' => [
                'scores' => [78, 76, 66, 68, 82, 78],
                'status' => 'in_progress',
                'title' => 'Refine DNS propagation and IP lookup around layered answers',
                'category' => 'frontend',
                'priority' => 'p0',
                'summary' => 'Use benchmark screenshots to improve summary, technical details, related tools and safe monetization placeholders.',
                'human_gate_required' => false,
            ],
            'calcharbor' => [
                'scores' => [66, 70, 58, 62, 76, 74],
                'status' => 'planned',
                'title' => 'Make calculator cards expose formula, examples and next actions',
                'category' => 'seo_aio',
                'priority' => 'p1',
                'summary' => 'Increase educational depth and related-calculator paths without creating thin programmatic pages.',
                'human_gate_required' => false,
            ],
            'devutility-lab' => [
                'scores' => [68, 70, 56, 60, 78, 76],
                'status' => 'planned',
                'title' => 'Clarify local processing and split editor/result workflows',
                'category' => 'frontend',
                'priority' => 'p1',
                'summary' => 'Improve scanability for formatter, converter and inspector tools while keeping snippets browser-side.',
                'human_gate_required' => false,
            ],
            'timenexus' => [
                'scores' => [68, 72, 58, 60, 78, 76],
                'status' => 'planned',
                'title' => 'Add timeline-style scan patterns to time conversion pages',
                'category' => 'frontend',
                'priority' => 'p1',
                'summary' => 'Make the immediate time answer clearer before deeper explanations, widgets or API upgrades.',
                'human_gate_required' => false,
            ],
            'qrroute' => [
                'scores' => [70, 68, 58, 66, 78, 74],
                'status' => 'planned',
                'title' => 'Separate static QR value from dynamic QR paid gates',
                'category' => 'monetization',
                'priority' => 'p1',
                'summary' => 'Make preview, download and abuse-control states clearer without activating dynamic QR, short links or analytics.',
                'human_gate_required' => false,
            ],
            'invoicecraft' => [
                'scores' => [70, 68, 56, 66, 78, 74],
                'status' => 'planned',
                'title' => 'Improve document preview confidence without fiscal claims',
                'category' => 'compliance',
                'priority' => 'p1',
                'summary' => 'Use templates and PDF smoke evidence while keeping taxes, numbering and official fiscal status human-gated.',
                'human_gate_required' => true,
            ],
            'mailhealth' => [
                'scores' => [72, 70, 58, 68, 76, 74],
                'status' => 'planned',
                'title' => 'Turn email diagnostics into score, checklist and fix guidance',
                'category' => 'frontend',
                'priority' => 'p1',
                'summary' => 'Improve SPF, DKIM, DMARC, MX and SMTP result hierarchy while preserving DNS/SMTP anti-abuse limits.',
                'human_gate_required' => false,
            ],
            'sitepulse-lab' => [
                'scores' => [72, 70, 58, 68, 76, 74],
                'status' => 'planned',
                'title' => 'Put one-off status answers before technical probe detail',
                'category' => 'frontend',
                'priority' => 'p1',
                'summary' => 'Make online/offline/slow states immediate, then show redirects, headers, robots, sitemap and TTFB details.',
                'human_gate_required' => false,
            ],
            'pixelbatch' => [
                'scores' => [70, 68, 56, 66, 78, 72],
                'status' => 'planned',
                'title' => 'Strengthen visual before/after and privacy reassurance',
                'category' => 'frontend',
                'priority' => 'p1',
                'summary' => 'Improve image workflow scanability while keeping file pixels, names and metadata out of backend and analytics.',
                'human_gate_required' => false,
            ],
            'docshift' => [
                'scores' => [70, 68, 56, 66, 78, 72],
                'status' => 'planned',
                'title' => 'Make PDF tool pages feel task-first and safely gated',
                'category' => 'frontend',
                'priority' => 'p1',
                'summary' => 'Improve dropzone/result hierarchy and related tools while keeping OCR, batch and uploads behind future gates.',
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
                    'notes' => 'Sprint 7 benchmark refinement baseline uses local docs, screenshots and CI evidence only.',
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
                'status' => $profile['human_gate_required'] ? 'human_required' : 'planned',
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
            ['source' => "docs/SITES/{$slug}/SPRINT_PLAN.md", 'summary' => 'Site benchmark sprint plan exists.'],
            ['source' => "docs/SITES/{$slug}/FRONTEND_REFINEMENT_PLAN.md", 'summary' => 'Frontend refinement plan exists.'],
            ['source' => 'docs/METRICS.md', 'summary' => 'Current metric baseline shows external ads, billing, donations and affiliates at zero.'],
        ];
    }
}
