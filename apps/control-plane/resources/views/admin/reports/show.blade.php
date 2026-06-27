@extends('layouts.admin', ['title' => $report->title.' - SuperSites Control Plane'])

@section('content')
    <section class="page-title" aria-labelledby="page-title">
        <div>
            <h1 id="page-title">{{ $report->title }}</h1>
            <p class="muted">
                {{ $report->period_type }} · {{ $report->period_start?->toDateString() }} to {{ $report->period_end?->toDateString() }}
            </p>
        </div>
        <div class="actions">
            <a class="button" href="{{ route('admin.reports.index') }}">All reports</a>
            <a class="button" href="{{ route('admin.reports.print', $report) }}">Print</a>
            <a class="button primary" href="{{ route('admin.reports.export', $report) }}">Download CSV</a>
        </div>
    </section>

    @php($statusSummary = $report->data_status_summary ?? [])
    <section class="summary-grid" aria-label="Report metadata">
        <article class="panel metric">
            <span class="muted">Status</span>
            <strong>{{ $report->status }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Export ready</span>
            <strong>{{ $report->export_ready ? 'yes' : 'no' }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Finalized</span>
            <strong>{{ $statusSummary['finalized'] ?? 0 }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Estimated</span>
            <strong>{{ $statusSummary['estimated'] ?? 0 }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Delayed</span>
            <strong>{{ $statusSummary['delayed'] ?? 0 }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Unavailable</span>
            <strong>{{ $statusSummary['unavailable'] ?? 0 }}</strong>
        </article>
    </section>

    <section class="panel">
        <h2>Controls</h2>
        <p class="muted">
            Contract {{ $report->contract_version }} · Causality {{ $report->causality_status }} · Generated {{ $report->generated_at?->format('Y-m-d H:i') ?? 'n/a' }}
        </p>
        @if ($report->notes)
            <p>{{ $report->notes }}</p>
        @endif
    </section>

    <section class="panel">
        <h2>Items</h2>
        <table>
            <thead>
                <tr>
                    <th>Section</th>
                    <th>Site</th>
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
                        <td>{{ $item->site?->name ?? 'Portfolio' }}</td>
                        <td>
                            {{ $item->label }}
                            @if ($item->notes)
                                <br><span class="muted">{{ $item->notes }}</span>
                            @endif
                        </td>
                        <td>{{ $item->value ?? 'n/a' }} {{ $item->unit }}</td>
                        <td><span class="status {{ $item->data_status }}">{{ $item->data_status }}</span></td>
                        <td>{{ $item->source }}</td>
                        <td>{{ count($item->evidence ?? []) }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </section>
@endsection
