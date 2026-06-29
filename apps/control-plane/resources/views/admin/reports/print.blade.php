@extends('layouts.admin', ['title' => $report->title.' - Print - SuperSites Control Plane'])

@section('content')
    <style>
        @media print {
            .topbar,
            .no-print {
                display: none;
            }

            .page {
                width: 100%;
                padding: 0;
            }

            .panel {
                border-color: #cbd5df;
                break-inside: avoid;
            }
        }
    </style>

    <section class="page-title" aria-labelledby="page-title">
        <div>
            <h1 id="page-title">{{ $report->title }}</h1>
            <p class="muted">
                {{ $report->period_type }} · {{ $report->period_start?->toDateString() }} to {{ $report->period_end?->toDateString() }} ·
                causality {{ $report->causality_status }}
            </p>
        </div>
        <div class="actions no-print">
            <a class="button" href="{{ route('admin.reports.show', $report) }}">Back</a>
            <a class="button primary" href="{{ route('admin.reports.export', $report) }}">Download CSV</a>
        </div>
    </section>

    @php($statusSummary = $report->data_status_summary ?? [])
    <section class="panel">
        <h2>Data status summary</h2>
        <p>
            finalized {{ $statusSummary['finalized'] ?? 0 }} ·
            estimated {{ $statusSummary['estimated'] ?? 0 }} ·
            delayed {{ $statusSummary['delayed'] ?? 0 }} ·
            unavailable {{ $statusSummary['unavailable'] ?? 0 }}
        </p>
        <p class="muted">Contract {{ $report->contract_version }} · Export ready {{ $report->export_ready ? 'yes' : 'no' }}</p>
        @if ($report->notes)
            <p>{{ $report->notes }}</p>
        @endif
    </section>

    <section class="panel">
        <h2>Report items</h2>
        <table>
            <thead>
                <tr>
                    <th>Section</th>
                    <th>Metric</th>
                    <th>Value</th>
                    <th>Data status</th>
                    <th>Source</th>
                    <th>Evidence</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($report->items as $item)
                    <tr>
                        <td>{{ $item->section }}</td>
                        <td>
                            {{ $item->label }}
                            @if ($item->site)
                                <br><span class="muted">{{ $item->site->name }}</span>
                            @endif
                        </td>
                        <td>{{ $item->value ?? 'n/a' }} {{ $item->unit }}</td>
                        <td>{{ $item->data_status }}</td>
                        <td>{{ $item->source }}</td>
                        <td>
                            {{ count($item->evidence ?? []) }}
                            @foreach (($item->evidence ?? []) as $evidence)
                                <br><span class="muted">{{ $evidence['source'] ?? 'unknown' }}</span>
                            @endforeach
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </section>
@endsection
