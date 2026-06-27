<?php

namespace Database\Seeders;

use App\Models\ExecutiveReport;
use App\Models\ExecutiveReportItem;
use App\Models\Site;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ExecutiveReportReadinessSeeder extends Seeder
{
    /**
     * @var array<int, string>
     */
    private array $dataStatuses = ['finalized', 'estimated', 'delayed', 'unavailable'];

    public function run(): void
    {
        $this->seedReport(
            [
                'period_type' => 'weekly',
                'period_start' => '2026-06-21',
                'period_end' => '2026-06-27',
                'title' => 'Weekly Executive Readiness - 2026-W26',
                'notes' => 'Readiness export only; provider data imports, external analytics, ads, billing and causality claims remain disabled.',
            ],
            [
                [
                    'section' => 'delivery',
                    'label' => 'Phase 6 sprint gates closed before reporting sprint',
                    'value' => '5',
                    'unit' => 'sprints',
                    'data_status' => 'finalized',
                    'source' => 'docs/STATUS.md',
                    'evidence' => [
                        ['source' => 'docs/STATUS.md', 'summary' => 'Sprints 6.1 through 6.5 recorded Quality Gate, deploy dry-run and public smoke results.'],
                    ],
                    'sort_order' => 10,
                ],
                [
                    'section' => 'quality',
                    'label' => 'Latest Quality Gate run',
                    'value' => '28284517799',
                    'unit' => 'run_id',
                    'data_status' => 'finalized',
                    'source' => 'docs/STATUS.md',
                    'evidence' => [
                        ['source' => 'docs/STATUS.md', 'summary' => 'Sprint 6.5 docs-only Quality Gate completed successfully.'],
                    ],
                    'sort_order' => 20,
                ],
                [
                    'section' => 'quality',
                    'label' => 'Public smokes checked',
                    'value' => '3',
                    'unit' => 'passed',
                    'data_status' => 'finalized',
                    'source' => 'docs/METRICS.md',
                    'evidence' => [
                        ['source' => 'docs/METRICS.md', 'summary' => 'Hub, control-plane and NetProbe public smokes are the active public production smoke set.'],
                    ],
                    'sort_order' => 30,
                ],
                [
                    'section' => 'monetization',
                    'label' => 'External monetization activations',
                    'value' => '0',
                    'unit' => 'activations',
                    'data_status' => 'finalized',
                    'source' => 'docs/STATUS.md',
                    'evidence' => [
                        ['source' => 'docs/STATUS.md', 'summary' => 'No real ads, checkout, webhooks, provider API calls or external analytics are active.'],
                    ],
                    'sort_order' => 40,
                ],
                [
                    'section' => 'growth',
                    'label' => 'AI growth recommendations ready for operator review',
                    'value' => '5',
                    'unit' => 'items',
                    'data_status' => 'estimated',
                    'source' => 'docs/METRICS.md',
                    'evidence' => [
                        ['source' => 'docs/METRICS.md', 'summary' => 'AI growth recommendations are seeded from local evidence and require operator review before action.'],
                    ],
                    'sort_order' => 50,
                ],
                [
                    'section' => 'billing',
                    'label' => 'Paid checkout enabled providers',
                    'value' => '0',
                    'unit' => 'providers',
                    'data_status' => 'finalized',
                    'source' => 'docs/BILLING.md',
                    'evidence' => [
                        ['source' => 'docs/BILLING.md', 'summary' => 'Billing providers are readiness records only and checkout remains disabled.'],
                    ],
                    'sort_order' => 60,
                ],
            ],
        );

        $netprobe = Site::query()->where('slug', 'netprobe-atlas')->first();

        $this->seedReport(
            [
                'period_type' => 'monthly',
                'period_start' => '2026-06-01',
                'period_end' => '2026-06-27',
                'title' => 'Monthly Portfolio Readiness - 2026-06 MTD',
                'notes' => 'Month-to-date export separates local finalized readiness from unavailable provider metrics; no causal conclusions are generated.',
            ],
            [
                [
                    'section' => 'delivery',
                    'label' => 'Apps planned',
                    'value' => '12',
                    'unit' => 'apps',
                    'data_status' => 'finalized',
                    'source' => 'docs/METRICS.md',
                    'evidence' => [
                        ['source' => 'docs/METRICS.md', 'summary' => 'Portfolio plan tracks 12 apps and 10 public utility sites.'],
                    ],
                    'sort_order' => 10,
                ],
                [
                    'section' => 'delivery',
                    'label' => 'Shared TS packages implemented',
                    'value' => '9',
                    'unit' => 'packages',
                    'data_status' => 'estimated',
                    'source' => 'docs/METRICS.md',
                    'evidence' => [
                        ['source' => 'docs/METRICS.md', 'summary' => 'Executive report contract is added in Sprint 6.6 before final validation updates metrics.'],
                    ],
                    'sort_order' => 20,
                ],
                [
                    'section' => 'traffic',
                    'label' => 'GA4 and Search Console imported traffic',
                    'value' => 'not_active',
                    'unit' => null,
                    'data_status' => 'unavailable',
                    'source' => 'docs/ANALYTICS.md',
                    'evidence' => [
                        ['source' => 'docs/ANALYTICS.md', 'summary' => 'GA4/GTM/Search Console remain gated and no provider import is active.'],
                    ],
                    'sort_order' => 30,
                ],
                [
                    'section' => 'monetization',
                    'label' => 'AdSense revenue reporting',
                    'value' => 'not_active',
                    'unit' => null,
                    'data_status' => 'unavailable',
                    'source' => 'docs/ADSENSE_PLAYBOOK.md',
                    'evidence' => [
                        ['source' => 'docs/ADSENSE_PLAYBOOK.md', 'summary' => 'Ad serving, Management API, requests, impressions, clicks and revenue remain disabled.'],
                    ],
                    'sort_order' => 40,
                ],
                [
                    'section' => 'billing',
                    'label' => 'Billing provider settlement metrics',
                    'value' => 'not_active',
                    'unit' => null,
                    'data_status' => 'delayed',
                    'source' => 'docs/BILLING.md',
                    'evidence' => [
                        ['source' => 'docs/BILLING.md', 'summary' => 'Provider accounts, KYC, tax, checkout and webhooks remain human-required before real billing metrics exist.'],
                    ],
                    'sort_order' => 50,
                ],
                [
                    'site_id' => $netprobe?->id,
                    'section' => 'operations',
                    'label' => 'Active public API smoke surface',
                    'value' => '3',
                    'unit' => 'smokes',
                    'data_status' => 'finalized',
                    'source' => 'docs/RUNBOOKS/CI_CD.md',
                    'evidence' => [
                        ['source' => 'docs/RUNBOOKS/CI_CD.md', 'summary' => 'Public smoke coverage currently validates Hub, control-plane/API and NetProbe.'],
                    ],
                    'sort_order' => 60,
                ],
            ],
        );
    }

    /**
     * @param array<string, mixed> $reportData
     * @param array<int, array<string, mixed>> $items
     */
    private function seedReport(array $reportData, array $items): void
    {
        $report = ExecutiveReport::firstOrNew([
            'period_type' => $reportData['period_type'],
            'period_start' => $reportData['period_start'],
            'period_end' => $reportData['period_end'],
        ]);

        if (! $report->exists) {
            $report->ulid = (string) Str::ulid();
        }

        $report->fill([
            ...$reportData,
            'status' => 'ready',
            'contract_version' => '2026-06-27.1',
            'data_status_summary' => $this->summarizeDataStatuses($items),
            'causality_status' => 'not_inferred',
            'generated_at' => now(),
            'source' => 'seeded',
            'export_ready' => true,
        ]);
        $report->save();

        foreach ($items as $item) {
            ExecutiveReportItem::updateOrCreate(
                [
                    'executive_report_id' => $report->id,
                    'section' => $item['section'],
                    'label' => $item['label'],
                ],
                [
                    'site_id' => $item['site_id'] ?? null,
                    'value' => $item['value'],
                    'unit' => $item['unit'] ?? null,
                    'data_status' => $item['data_status'],
                    'source' => $item['source'],
                    'evidence' => $item['evidence'],
                    'notes' => $item['notes'] ?? null,
                    'sort_order' => $item['sort_order'] ?? 0,
                ],
            );
        }
    }

    /**
     * @param array<int, array<string, mixed>> $items
     * @return array<string, int>
     */
    private function summarizeDataStatuses(array $items): array
    {
        $summary = array_fill_keys($this->dataStatuses, 0);

        foreach ($items as $item) {
            $status = in_array($item['data_status'], $this->dataStatuses, true)
                ? $item['data_status']
                : 'unavailable';

            $summary[$status]++;
        }

        return $summary;
    }
}
