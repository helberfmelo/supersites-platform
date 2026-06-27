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
            <span class="muted">AdSense gated</span>
            <strong>{{ $summary['adsense_gated'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Google gated</span>
            <strong>{{ $summary['google_gated'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Billing gated</span>
            <strong>{{ $summary['billing_gated'] }}</strong>
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

    <section class="panel">
        <h2>AdSense readiness</h2>
        @if ($adsenseAccount)
            <p class="muted">
                Publisher {{ $adsenseAccount->publisher_label }} · Account {{ $adsenseAccount->account_status }} ·
                Management API {{ $adsenseAccount->management_api_enabled ? 'enabled' : 'disabled' }} ·
                Serving {{ $summary['adsense_serving_enabled'] }} / {{ $adsenseAccount->site_reviews_count }} sites
            </p>
        @else
            <p class="muted">No AdSense publisher readiness record seeded.</p>
        @endif
        <table>
            <thead>
                <tr>
                    <th>Site</th>
                    <th>Review</th>
                    <th>ads.txt</th>
                    <th>Consent</th>
                    <th>Smoke</th>
                    <th>Serving</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($adsenseSiteReviews as $review)
                    <tr>
                        <td>{{ $review->site?->name ?? 'Unknown site' }}</td>
                        <td><span class="status {{ $review->site_review_status }}">{{ $review->site_review_status }}</span></td>
                        <td>{{ $review->ads_txt_status }}</td>
                        <td>{{ $review->consent_status }}</td>
                        <td>{{ $review->public_smoke_status }}</td>
                        <td>{{ $review->ad_serving_enabled ? 'enabled' : 'disabled' }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6">No AdSense site review records seeded.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </section>

    <section class="panel">
        <h2>Billing readiness</h2>
        <p class="muted">
            Checkout {{ $summary['billing_checkout_enabled'] }} / {{ $billingProviders->count() }} providers |
            Provider SDKs, payment links and webhook endpoints disabled until human gates pass.
        </p>
        <table>
            <thead>
                <tr>
                    <th>Provider</th>
                    <th>Account</th>
                    <th>KYC</th>
                    <th>API key</th>
                    <th>Webhook</th>
                    <th>Checkout</th>
                    <th>Plans</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($billingProviders as $provider)
                    <tr>
                        <td>{{ $provider->provider }}</td>
                        <td><span class="status {{ $provider->account_status }}">{{ $provider->account_status }}</span></td>
                        <td>{{ $provider->kyc_status }}</td>
                        <td>{{ $provider->api_key_status }}</td>
                        <td>{{ $provider->webhook_status }}</td>
                        <td>{{ $provider->checkout_enabled ? 'enabled' : 'disabled' }}</td>
                        <td>{{ $provider->plans_count }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7">No billing provider readiness records seeded.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>

        <table>
            <thead>
                <tr>
                    <th>Site</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Checkout</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($billingPlans as $plan)
                    <tr>
                        <td>{{ $plan->site?->name ?? 'Unknown site' }}</td>
                        <td>{{ $plan->slug }}</td>
                        <td>{{ $plan->status }}</td>
                        <td>{{ $plan->currency }} {{ number_format($plan->amount_minor / 100, 2) }}</td>
                        <td>{{ $plan->checkout_enabled ? 'enabled' : 'disabled' }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5">No billing plans seeded.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </section>

    <section class="panel">
        <h2>Google integrations</h2>
        <table>
            <thead>
                <tr>
                    <th>Site</th>
                    <th>Access</th>
                    <th>GA4</th>
                    <th>GTM</th>
                    <th>Search Console</th>
                    <th>Tags</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($googleIntegrations as $integration)
                    <tr>
                        <td>{{ $integration->site?->name ?? 'Unknown site' }}</td>
                        <td><span class="status {{ $integration->access_status }}">{{ $integration->access_status }}</span></td>
                        <td>{{ $integration->ga4_status }}</td>
                        <td>{{ $integration->gtm_status }}</td>
                        <td>{{ $integration->search_console_status }}</td>
                        <td>{{ $integration->tags_enabled ? 'enabled' : 'disabled' }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6">No Google integration records seeded.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
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
