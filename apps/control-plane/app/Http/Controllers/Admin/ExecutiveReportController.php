<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\ExecutiveReport;
use App\Models\ExecutiveReportItem;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\View\View;

class ExecutiveReportController extends Controller
{
    public function index(Request $request): View
    {
        $reports = ExecutiveReport::query()
            ->withCount('items')
            ->latest('period_end')
            ->latest()
            ->get();

        AuditLog::record($request->user(), 'admin.executive_reports.index_viewed', metadata: [
            'reports' => $reports->count(),
            'export_ready' => $reports->where('export_ready', true)->count(),
        ]);

        return view('admin.reports.index', [
            'reports' => $reports,
            'summary' => [
                'reports' => $reports->count(),
                'export_ready' => $reports->where('export_ready', true)->count(),
                'estimated_items' => ExecutiveReportItem::query()->where('data_status', 'estimated')->count(),
                'finalized_items' => ExecutiveReportItem::query()->where('data_status', 'finalized')->count(),
            ],
        ]);
    }

    public function show(Request $request, ExecutiveReport $executiveReport): View
    {
        $executiveReport->load(['items.site']);

        AuditLog::record($request->user(), 'admin.executive_reports.viewed', auditable: $executiveReport, metadata: [
            'period_type' => $executiveReport->period_type,
            'period_start' => $executiveReport->period_start?->toDateString(),
            'period_end' => $executiveReport->period_end?->toDateString(),
        ]);

        return view('admin.reports.show', [
            'report' => $executiveReport,
        ]);
    }

    public function print(Request $request, ExecutiveReport $executiveReport): View
    {
        $executiveReport->load(['items.site']);

        AuditLog::record($request->user(), 'admin.executive_reports.print_viewed', auditable: $executiveReport, metadata: [
            'period_type' => $executiveReport->period_type,
        ]);

        return view('admin.reports.print', [
            'report' => $executiveReport,
        ]);
    }

    public function exportCsv(Request $request, ExecutiveReport $executiveReport): Response
    {
        $executiveReport->load(['items.site']);

        AuditLog::record($request->user(), 'admin.executive_reports.csv_exported', auditable: $executiveReport, metadata: [
            'period_type' => $executiveReport->period_type,
            'items' => $executiveReport->items->count(),
            'causality_status' => $executiveReport->causality_status,
        ]);

        $filename = sprintf(
            'executive-report-%s-%s-%s.csv',
            $executiveReport->period_type,
            $executiveReport->period_start?->format('Ymd') ?? 'unknown',
            $executiveReport->period_end?->format('Ymd') ?? 'unknown',
        );

        return response($this->csvForReport($executiveReport), 200, [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ]);
    }

    private function csvForReport(ExecutiveReport $report): string
    {
        $rows = [
            ['report_title', $report->title],
            ['period_type', $report->period_type],
            ['period_start', $report->period_start?->toDateString() ?? ''],
            ['period_end', $report->period_end?->toDateString() ?? ''],
            ['report_status', $report->status],
            ['causality_status', $report->causality_status],
            ['data_status_summary', json_encode($report->data_status_summary, JSON_THROW_ON_ERROR)],
            [],
            [
                'section',
                'site',
                'label',
                'value',
                'unit',
                'data_status',
                'source',
                'evidence_count',
                'evidence_sources',
                'evidence_summaries',
                'causality_status',
                'notes',
            ],
        ];

        foreach ($report->items as $item) {
            $rows[] = [
                $item->section,
                $item->site?->name ?? 'Portfolio',
                $item->label,
                $item->value ?? '',
                $item->unit ?? '',
                $item->data_status,
                $item->source,
                (string) count($item->evidence ?? []),
                $this->evidenceSources($item),
                $this->evidenceSummaries($item),
                $report->causality_status,
                $item->notes ?? '',
            ];
        }

        return collect($rows)
            ->map(fn (array $row): string => collect($row)->map(fn (?string $cell): string => $this->escapeCsvCell((string) $cell))->implode(','))
            ->implode("\n");
    }

    private function escapeCsvCell(string $value): string
    {
        $normalized = str_replace(["\r", "\n"], ' ', $value);

        if (str_contains($normalized, '"') || str_contains($normalized, ',') || str_contains($normalized, "\n")) {
            return '"'.str_replace('"', '""', $normalized).'"';
        }

        return $normalized;
    }

    private function evidenceSources(ExecutiveReportItem $item): string
    {
        return collect($item->evidence ?? [])
            ->pluck('source')
            ->filter()
            ->implode(' | ');
    }

    private function evidenceSummaries(ExecutiveReportItem $item): string
    {
        return collect($item->evidence ?? [])
            ->pluck('summary')
            ->filter()
            ->implode(' | ');
    }
}
