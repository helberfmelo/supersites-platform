<?php

namespace App\Support\Growth;

use App\Models\ExecutiveReport;
use App\Models\ExecutiveReportItem;
use App\Models\GrowthProviderIngestion;
use Illuminate\Support\Collection;

class GrowthReportingReadiness
{
    public const CONTRACT_VERSION = '2026-06-29.16.4';

    /**
     * @var list<string>
     */
    private const DATA_STATUSES = ['finalized', 'estimated', 'delayed', 'unavailable'];

    /**
     * @return array<string, mixed>
     */
    public function snapshot(): array
    {
        $reports = ExecutiveReport::query()
            ->with(['items.site:id,slug,name,kind'])
            ->latest('period_end')
            ->latest()
            ->get();

        $ingestions = GrowthProviderIngestion::query()
            ->with('site:id,slug,name,kind')
            ->orderBy('id')
            ->get();

        $reportSnapshots = $reports
            ->values()
            ->map(fn (ExecutiveReport $report, int $index): array => $this->reportSnapshot($report, $index + 1))
            ->all();

        $statusTotals = $this->statusTotals($reportSnapshots);
        $realProviderSnapshots = $ingestions
            ->filter(fn (GrowthProviderIngestion $record): bool => $record->data_status === 'finalized')
            ->count();
        $providerImportsEnabled = $ingestions
            ->filter(fn (GrowthProviderIngestion $record): bool => (bool) $record->import_enabled)
            ->count();

        return [
            'meta' => [
                'contract_version' => self::CONTRACT_VERSION,
                'mode' => 'growth_reporting_readiness',
                'side_effects' => 'none',
                'provider_activation' => false,
            ],
            'data' => [
                'summary' => [
                    'reports' => count($reportSnapshots),
                    'report_items' => array_sum(array_column($reportSnapshots, 'items_count')),
                    'reports_ready_for_operator_review' => count(array_filter(
                        $reportSnapshots,
                        fn (array $report): bool => $report['status'] === 'review_ready',
                    )),
                    'blocked_reports' => count(array_filter(
                        $reportSnapshots,
                        fn (array $report): bool => $report['status'] === 'blocked',
                    )),
                    'export_ready_reports' => ExecutiveReport::query()->where('export_ready', true)->count(),
                    'before_after_reports' => count(array_filter(
                        $reportSnapshots,
                        fn (array $report): bool => (bool) $report['before_after_review_ready'],
                    )),
                    'before_after_items' => array_sum(array_column($reportSnapshots, 'before_after_items')),
                    'finalized_items' => $statusTotals['finalized'],
                    'estimated_items' => $statusTotals['estimated'],
                    'delayed_items' => $statusTotals['delayed'],
                    'unavailable_items' => $statusTotals['unavailable'],
                    'real_provider_data_snapshots' => $realProviderSnapshots,
                    'provider_imports_enabled' => $providerImportsEnabled,
                    'recurring_delivery_enabled' => false,
                    'external_recipients_enabled' => false,
                    'scheduled_reports' => 0,
                    'emails_sent' => 0,
                    'revenue_reporting_enabled' => false,
                    'causality_status' => 'not_inferred',
                    'reporting_mode' => 'review_only_fail_closed',
                    'should_schedule_report' => false,
                    'should_send_email' => false,
                    'should_import_provider_data' => false,
                    'should_infer_causality' => false,
                ],
                'provider_data' => [
                    'sources' => $ingestions->count(),
                    'finalized_sources' => $realProviderSnapshots,
                    'import_enabled_sources' => $providerImportsEnabled,
                    'workers_enabled' => 0,
                    'provider_requests_enabled' => 0,
                ],
                'reports' => $reportSnapshots,
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function reportSnapshot(ExecutiveReport $report, int $rank): array
    {
        $items = $report->items;
        $statusSummary = $this->normalizeDataStatusSummary($report->data_status_summary ?? []);
        $beforeAfterItems = $items
            ->filter(fn (ExecutiveReportItem $item): bool => $this->isBeforeAfterReadyItem($item))
            ->count();
        $evidenceReadyItems = $items
            ->filter(fn (ExecutiveReportItem $item): bool => count($item->evidence ?? []) > 0)
            ->count();
        $blockers = $this->blockers($report, $items, $beforeAfterItems, $evidenceReadyItems);
        $status = count($blockers) > 0 ? 'blocked' : 'review_ready';

        return [
            'rank' => $rank,
            'report_id' => $report->id,
            'title' => $report->title,
            'period_type' => $report->period_type,
            'period_start' => $report->period_start?->toDateString(),
            'period_end' => $report->period_end?->toDateString(),
            'source' => $report->source,
            'source_status' => $report->status,
            'status' => $status,
            'export_ready' => (bool) $report->export_ready,
            'report_review_ready' => $status === 'review_ready',
            'before_after_review_ready' => $status === 'review_ready' && $beforeAfterItems > 0,
            'before_after_items' => $beforeAfterItems,
            'items_count' => $items->count(),
            'evidence_ready_items' => $evidenceReadyItems,
            'data_status' => $this->reportDataStatus($statusSummary),
            'data_status_summary' => $statusSummary,
            'causality_status' => $report->causality_status,
            'generated_at' => $report->generated_at?->toIso8601String(),
            'recurring_delivery_allowed' => false,
            'email_delivery_allowed' => false,
            'provider_import_allowed' => false,
            'revenue_reporting_allowed' => false,
            'should_schedule_report' => false,
            'should_send_email' => false,
            'should_import_provider_data' => false,
            'should_infer_causality' => false,
            'side_effects' => 'none',
            'blockers' => $blockers,
            'guardrails' => $this->guardrails($statusSummary),
        ];
    }

    /**
     * @param Collection<int, ExecutiveReportItem> $items
     * @return list<string>
     */
    private function blockers(ExecutiveReport $report, Collection $items, int $beforeAfterItems, int $evidenceReadyItems): array
    {
        $blockers = [];

        if ($report->status !== 'ready') {
            $blockers[] = 'report_not_ready';
        }

        if (! (bool) $report->export_ready) {
            $blockers[] = 'export_not_ready';
        }

        if ($report->causality_status !== 'not_inferred') {
            $blockers[] = 'causality_review_required';
        }

        if ($items->count() === 0) {
            $blockers[] = 'missing_report_items';
        }

        if ($items->count() > 0 && $evidenceReadyItems < $items->count()) {
            $blockers[] = 'missing_item_evidence';
        }

        if ($beforeAfterItems === 0) {
            $blockers[] = 'missing_before_after_items';
        }

        return array_values(array_unique($blockers));
    }

    /**
     * @param array<string, int> $statusSummary
     * @return list<string>
     */
    private function guardrails(array $statusSummary): array
    {
        $guardrails = [
            'manual_operator_review_required',
            'recurring_delivery_disabled',
            'external_recipient_delivery_disabled',
            'provider_import_disabled',
            'causal_attribution_disabled',
            'revenue_claims_disabled',
        ];

        if (($statusSummary['unavailable'] ?? 0) > 0) {
            $guardrails[] = 'unavailable_metrics_labelled';
        }

        if (($statusSummary['delayed'] ?? 0) > 0) {
            $guardrails[] = 'delayed_metrics_labelled';
        }

        return $guardrails;
    }

    private function isBeforeAfterReadyItem(ExecutiveReportItem $item): bool
    {
        return in_array($item->data_status, ['finalized', 'estimated'], true)
            && count($item->evidence ?? []) > 0;
    }

    /**
     * @param array<string, mixed> $summary
     * @return array<string, int>
     */
    private function normalizeDataStatusSummary(array $summary): array
    {
        $normalized = array_fill_keys(self::DATA_STATUSES, 0);

        foreach (self::DATA_STATUSES as $status) {
            $value = $summary[$status] ?? 0;
            $normalized[$status] = is_numeric($value) ? max(0, (int) $value) : 0;
        }

        return $normalized;
    }

    /**
     * @param array<int, array<string, mixed>> $reports
     * @return array<string, int>
     */
    private function statusTotals(array $reports): array
    {
        $totals = array_fill_keys(self::DATA_STATUSES, 0);

        foreach ($reports as $report) {
            foreach (self::DATA_STATUSES as $status) {
                $totals[$status] += (int) ($report['data_status_summary'][$status] ?? 0);
            }
        }

        return $totals;
    }

    /**
     * @param array<string, int> $statusSummary
     */
    private function reportDataStatus(array $statusSummary): string
    {
        $ready = ($statusSummary['finalized'] ?? 0) + ($statusSummary['estimated'] ?? 0);
        $pending = ($statusSummary['delayed'] ?? 0) + ($statusSummary['unavailable'] ?? 0);

        if ($ready > 0 && $pending > 0) {
            return 'mixed';
        }

        if (($statusSummary['finalized'] ?? 0) > 0) {
            return 'finalized';
        }

        if (($statusSummary['estimated'] ?? 0) > 0) {
            return 'estimated';
        }

        if (($statusSummary['delayed'] ?? 0) > 0) {
            return 'delayed';
        }

        return 'unavailable';
    }
}
