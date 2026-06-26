@extends('layouts.admin', ['title' => 'Dashboard - SuperSites Control Plane'])

@section('content')
    <section class="page-title" aria-labelledby="page-title">
        <div>
            <h1 id="page-title">Portfolio status</h1>
            <p class="muted">Operational snapshot for the SuperSites network.</p>
        </div>
        <a class="button primary" href="{{ route('admin.sites.index') }}">Manage sites</a>
    </section>

    <section class="summary-grid" aria-label="Portfolio summary">
        <article class="panel metric">
            <span class="muted">Sites tracked</span>
            <strong>{{ $summary['sites'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">AdSense ready</span>
            <strong>{{ $summary['adsense_ready'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Open incidents</span>
            <strong>{{ $summary['open_incidents'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Open tasks</span>
            <strong>{{ $summary['open_tasks'] }}</strong>
        </article>
    </section>

    <section class="two-column">
        <article class="panel">
            <h2>Site states</h2>
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($statusCounts as $status => $total)
                        <tr>
                            <td><span class="status {{ $status }}">{{ $status }}</span></td>
                            <td>{{ $total }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </article>

        <article class="panel">
            <h2>Latest deployments</h2>
            <table>
                <thead>
                    <tr>
                        <th>Workflow</th>
                        <th>Status</th>
                        <th>Reference</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($deployments as $deployment)
                        <tr>
                            <td>{{ $deployment->workflow }}<br><span class="muted">{{ $deployment->environment }}</span></td>
                            <td><span class="status {{ $deployment->status }}">{{ $deployment->status }}</span></td>
                            <td>{{ $deployment->reference ?? 'n/a' }}</td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="3">No deployments recorded yet.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </article>
    </section>

    <section class="two-column">
        <article class="panel">
            <h2>Incidents</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Severity</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($incidents as $incident)
                        <tr>
                            <td>{{ $incident->title }}</td>
                            <td><span class="status {{ $incident->status }}">{{ $incident->status }}</span></td>
                            <td>{{ $incident->severity }}</td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="3">No incidents recorded.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </article>

        <article class="panel">
            <h2>Operational tasks</h2>
            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($tasks as $task)
                        <tr>
                            <td>{{ $task->title }}<br><span class="muted">{{ $task->source }}</span></td>
                            <td><span class="status {{ $task->status }}">{{ $task->status }}</span></td>
                            <td>{{ $task->priority }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </article>
    </section>

    <section class="panel">
        <h2>Recent audit events</h2>
        <table>
            <thead>
                <tr>
                    <th>Action</th>
                    <th>User</th>
                    <th>When</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($recentAudits as $audit)
                    <tr>
                        <td>{{ $audit->action }}</td>
                        <td>{{ $audit->user?->email ?? 'system' }}</td>
                        <td>{{ $audit->occurred_at?->format('Y-m-d H:i') ?? 'n/a' }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="3">No audit events recorded yet.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </section>
@endsection
