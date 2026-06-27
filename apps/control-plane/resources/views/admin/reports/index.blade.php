@extends('layouts.admin', ['title' => 'Executive Reports - SuperSites Control Plane'])

@section('content')
    <section class="page-title" aria-labelledby="page-title">
        <div>
            <h1 id="page-title">Executive reports</h1>
            <p class="muted">Weekly and monthly operator exports for portfolio review.</p>
        </div>
        <a class="button" href="{{ route('admin.dashboard') }}">Dashboard</a>
    </section>

    <section class="summary-grid" aria-label="Executive report summary">
        <article class="panel metric">
            <span class="muted">Reports</span>
            <strong>{{ $summary['reports'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Export ready</span>
            <strong>{{ $summary['export_ready'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Finalized items</span>
            <strong>{{ $summary['finalized_items'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Estimated items</span>
            <strong>{{ $summary['estimated_items'] }}</strong>
        </article>
    </section>

    <section class="panel">
        <h2>Reports</h2>
        <table>
            <thead>
                <tr>
                    <th>Report</th>
                    <th>Period</th>
                    <th>Status</th>
                    <th>Data status</th>
                    <th>Causality</th>
                    <th>Exports</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($reports as $report)
                    @php($statusSummary = $report->data_status_summary ?? [])
                    <tr>
                        <td>
                            <a href="{{ route('admin.reports.show', $report) }}">{{ $report->title }}</a>
                            <br><span class="muted">{{ $report->items_count }} items · {{ $report->source }}</span>
                        </td>
                        <td>{{ $report->period_type }}<br><span class="muted">{{ $report->period_start?->toDateString() }} to {{ $report->period_end?->toDateString() }}</span></td>
                        <td><span class="status {{ $report->status }}">{{ $report->status }}</span></td>
                        <td>
                            finalized {{ $statusSummary['finalized'] ?? 0 }} ·
                            estimated {{ $statusSummary['estimated'] ?? 0 }} ·
                            delayed {{ $statusSummary['delayed'] ?? 0 }} ·
                            unavailable {{ $statusSummary['unavailable'] ?? 0 }}
                        </td>
                        <td>{{ $report->causality_status }}</td>
                        <td>
                            <a href="{{ route('admin.reports.export', $report) }}">CSV</a>
                            ·
                            <a href="{{ route('admin.reports.print', $report) }}">Print</a>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6">No executive reports seeded.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </section>
@endsection
