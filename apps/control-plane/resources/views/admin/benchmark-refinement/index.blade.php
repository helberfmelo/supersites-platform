@extends('layouts.admin', ['title' => 'Benchmark Refinement - SuperSites Control Plane'])

@section('content')
    <section class="page-title" aria-labelledby="page-title">
        <div>
            <h1 id="page-title">Benchmark refinement</h1>
            <p class="muted">Local readiness, Phase 18 closure KPIs and gated monetization backlog.</p>
        </div>
        <a class="button" href="{{ route('admin.dashboard') }}">Dashboard</a>
    </section>

    <section class="summary-grid" aria-label="Benchmark refinement summary">
        <article class="panel metric">
            <span class="muted">Public surfaces</span>
            <strong>{{ $summary['surfaces'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Average readiness</span>
            <strong>{{ $summary['average_score'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Open opportunities</span>
            <strong>{{ $summary['open_opportunities'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Human gates</span>
            <strong>{{ $summary['human_gates'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">External providers active</span>
            <strong>{{ $summary['external_provider_active'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Ads / billing enabled</span>
            <strong>{{ $summary['real_ads_enabled'] }} / {{ $summary['real_billing_enabled'] }}</strong>
        </article>
    </section>

    <section class="panel">
        <h2>Site readiness</h2>
        <p class="muted">Scores are estimated from local docs, generated HTML, Lighthouse/public-copy evidence and CI. Provider imports remain disabled.</p>
        <table>
            <thead>
                <tr>
                    <th>Site</th>
                    <th>Status</th>
                    <th>Benchmark</th>
                    <th>SEO/AIO</th>
                    <th>AdSense</th>
                    <th>Monetization</th>
                    <th>Frontend</th>
                    <th>Performance</th>
                    <th>Overall</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($readiness as $item)
                    <tr>
                        <td>
                            {{ $item->site?->name ?? 'Unknown site' }}
                            <br><span class="muted">{{ $item->site?->slug ?? 'n/a' }}</span>
                        </td>
                        <td><span class="status {{ $item->status }}">{{ $item->status }}</span></td>
                        <td>{{ $item->benchmark_score }}</td>
                        <td>{{ $item->seo_aio_score }}</td>
                        <td>{{ $item->adsense_score }}</td>
                        <td>{{ $item->monetization_score }}</td>
                        <td>{{ $item->frontend_score }}</td>
                        <td>{{ $item->performance_score }}</td>
                        <td><strong>{{ $item->overall_score }}</strong></td>
                        <td>{{ $item->data_status }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="10">No benchmark readiness records seeded.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </section>

    <section class="panel">
        <h2>Opportunity backlog</h2>
        <p class="muted">Impact, effort, confidence and risk are local planning scores; automation and provider activation stay off.</p>
        <table>
            <thead>
                <tr>
                    <th>Opportunity</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>IEC/R</th>
                    <th>Score</th>
                    <th>Gate</th>
                    <th>Evidence</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($opportunities as $opportunity)
                    <tr>
                        <td>
                            {{ $opportunity->title }}
                            <br><span class="muted">{{ $opportunity->site?->name ?? 'Unknown site' }}</span>
                            <br><span class="muted">{{ $opportunity->summary }}</span>
                        </td>
                        <td>{{ $opportunity->category }}</td>
                        <td>{{ $opportunity->priority }}</td>
                        <td><span class="status {{ $opportunity->status }}">{{ $opportunity->status }}</span></td>
                        <td>
                            {{ $opportunity->impact_score }}/{{ $opportunity->effort_score }}/{{ $opportunity->confidence_score }}/{{ $opportunity->risk_score }}
                        </td>
                        <td>{{ $opportunity->priority_score }}</td>
                        <td>{{ $opportunity->human_gate_required ? 'human_required' : 'technical' }}</td>
                        <td>{{ count($opportunity->evidence ?? []) }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="8">No benchmark opportunities seeded.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </section>
@endsection
