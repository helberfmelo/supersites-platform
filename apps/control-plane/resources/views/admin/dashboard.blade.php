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
            <span class="muted">Growth imports live</span>
            <strong>{{ $summary['growth_ingestion_importing'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Priority reviews</span>
            <strong>{{ $summary['growth_priorities_ready'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Auto apply</span>
            <strong>{{ $summary['growth_priority_auto_apply'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Billing gated</span>
            <strong>{{ $summary['billing_gated'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Support links live</span>
            <strong>{{ $summary['support_monetization_public_enabled'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Executive reports</span>
            <strong>{{ $summary['executive_reports'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Reports export ready</span>
            <strong>{{ $summary['executive_reports_export_ready'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Estimated report items</span>
            <strong>{{ $summary['executive_report_estimated_items'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Benchmark surfaces</span>
            <strong>{{ $summary['benchmark_surfaces'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Benchmark avg score</span>
            <strong>{{ $summary['benchmark_average_score'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Benchmark backlog</span>
            <strong>{{ $summary['benchmark_open_opportunities'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Benchmark human gates</span>
            <strong>{{ $summary['benchmark_human_gates'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">AI recommendations</span>
            <strong>{{ $summary['ai_growth_recommendations'] }}</strong>
        </article>
        <article class="panel metric">
            <span class="muted">Growth human gates</span>
            <strong>{{ $summary['ai_growth_human_gates'] }}</strong>
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
        <h2>Benchmark refinement</h2>
        <p class="muted">
            Local benchmark, SEO/AIO, AdSense and monetization readiness. External provider activation:
            {{ $summary['benchmark_external_provider_active'] }}.
        </p>
        <table>
            <thead>
                <tr>
                    <th>Site</th>
                    <th>Benchmark</th>
                    <th>SEO/AIO</th>
                    <th>AdSense</th>
                    <th>Monetization</th>
                    <th>Overall</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($benchmarkReadiness as $item)
                    <tr>
                        <td>{{ $item->site?->name ?? 'Unknown site' }}</td>
                        <td>{{ $item->benchmark_score }}</td>
                        <td>{{ $item->seo_aio_score }}</td>
                        <td>{{ $item->adsense_score }}</td>
                        <td>{{ $item->monetization_score }}</td>
                        <td><strong>{{ $item->overall_score }}</strong></td>
                        <td>{{ $item->data_status }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7">No benchmark readiness records seeded.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>

        <table>
            <thead>
                <tr>
                    <th>Opportunity</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Score</th>
                    <th>Gate</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($benchmarkOpportunities as $opportunity)
                    <tr>
                        <td>{{ $opportunity->title }}<br><span class="muted">{{ $opportunity->site?->name ?? 'Unknown site' }}</span></td>
                        <td>{{ $opportunity->priority }}</td>
                        <td><span class="status {{ $opportunity->status }}">{{ $opportunity->status }}</span></td>
                        <td>{{ $opportunity->priority_score }}</td>
                        <td>{{ $opportunity->human_gate_required ? 'human_required' : 'technical' }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5">No benchmark opportunities seeded.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
        <p class="muted"><a href="{{ route('admin.benchmark-refinement.index') }}">Open benchmark refinement dashboard</a></p>
    </section>

    <section class="panel">
        <h2>Executive reports</h2>
        <p class="muted">
            Weekly and monthly exports separate finalized, estimated, delayed and unavailable data. Causality remains not inferred.
        </p>
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
                @forelse ($executiveReports as $report)
                    @php($statusSummary = $report->data_status_summary ?? [])
                    <tr>
                        <td>
                            <a href="{{ route('admin.reports.show', $report) }}">{{ $report->title }}</a>
                            <br><span class="muted">{{ $report->items_count }} items</span>
                        </td>
                        <td>{{ $report->period_type }}<br><span class="muted">{{ $report->period_start?->toDateString() }} to {{ $report->period_end?->toDateString() }}</span></td>
                        <td><span class="status {{ $report->status }}">{{ $report->status }}</span></td>
                        <td>
                            F {{ $statusSummary['finalized'] ?? 0 }} ·
                            E {{ $statusSummary['estimated'] ?? 0 }} ·
                            D {{ $statusSummary['delayed'] ?? 0 }} ·
                            U {{ $statusSummary['unavailable'] ?? 0 }}
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

    <section class="panel">
        <h2>AI growth engine</h2>
        <p class="muted">
            Evidence-backed local recommendations only. External AI, automation and paid-provider changes are disabled.
        </p>
        <table>
            <thead>
                <tr>
                    <th>Recommendation</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Score</th>
                    <th>Evidence</th>
                    <th>Gate</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($aiGrowthRecommendations as $recommendation)
                    <tr>
                        <td>
                            {{ $recommendation->title }}
                            <br><span class="muted">{{ $recommendation->site?->name ?? 'Portfolio' }}</span>
                        </td>
                        <td>{{ $recommendation->category }}</td>
                        <td><span class="status {{ $recommendation->status }}">{{ $recommendation->status }}</span></td>
                        <td>{{ $recommendation->priority_score }}</td>
                        <td>{{ count($recommendation->evidence ?? []) }}</td>
                        <td>{{ $recommendation->human_gate_required ? 'human_required' : 'technical' }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6">No AI growth recommendations seeded.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>

        <table>
            <thead>
                <tr>
                    <th>Metric</th>
                    <th>Status</th>
                    <th>Change</th>
                    <th>Causality</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($aiGrowthAnomalies as $anomaly)
                    <tr>
                        <td>{{ $anomaly->metric_key }}</td>
                        <td><span class="status {{ $anomaly->status }}">{{ $anomaly->status }}</span></td>
                        <td>{{ $anomaly->change_percent }}%</td>
                        <td>{{ $anomaly->causality_status }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4">No growth anomalies seeded.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </section>

    <section class="panel">
        <h2>Growth priorities</h2>
        <p class="muted">
            Ready for review {{ $growthPriorityReadiness['data']['summary']['priorities_ready_for_operator_review'] }} /
            {{ $growthPriorityReadiness['data']['summary']['recommendations'] }} ·
            provider data {{ $growthPriorityReadiness['data']['summary']['provider_data_status'] }} ·
            real snapshots {{ $growthPriorityReadiness['data']['summary']['real_provider_data_snapshots'] }} ·
            causality {{ $growthPriorityReadiness['data']['summary']['causality_status'] }} ·
            auto apply {{ $growthPriorityReadiness['data']['summary']['automatic_prioritization_enabled'] ? 'enabled' : 'disabled' }}
        </p>
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Score</th>
                    <th>Data</th>
                    <th>Automation</th>
                </tr>
            </thead>
            <tbody>
                @forelse (array_slice($growthPriorityReadiness['data']['priorities'], 0, 6) as $priority)
                    <tr>
                        <td>{{ $priority['rank'] }}</td>
                        <td>
                            {{ $priority['title'] }}
                            <br><span class="muted">{{ $priority['site_name'] }} · {{ $priority['category'] }}</span>
                        </td>
                        <td><span class="status {{ $priority['status'] }}">{{ $priority['status'] }}</span></td>
                        <td>{{ $priority['priority_score'] }}</td>
                        <td>{{ $priority['data_status'] }}</td>
                        <td>{{ $priority['automation_allowed'] ? 'enabled' : 'disabled' }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6">No growth priorities available for review.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </section>

    <section class="panel">
        <h2>AdSense readiness</h2>
        @if ($adsenseAccount)
            <p class="muted">
                Publisher {{ $adsenseAccount->publisher_label }} · Account {{ $adsenseAccount->account_status }} ·
                Management API {{ $adsenseAccount->management_api_enabled ? 'enabled' : 'disabled' }} ·
                Serving {{ $summary['adsense_serving_enabled'] }} / {{ $adsenseAccount->site_reviews_count }} sites
            </p>
            <p class="muted">
                Go-live readiness {{ $adsenseGoLiveReadiness['data']['account']['account_ready'] ? 'ready' : 'blocked' }} ·
                ads.txt preview {{ $adsenseGoLiveReadiness['data']['ads_txt']['preview_available'] ? 'available' : 'unavailable' }} ·
                human-review ready {{ $adsenseGoLiveReadiness['data']['summary']['sites_ready_for_human_review'] }} /
                {{ $adsenseGoLiveReadiness['data']['summary']['site_reviews'] }} sites ·
                automatic submission {{ $adsenseGoLiveReadiness['data']['summary']['automatic_submission_enabled'] ? 'enabled' : 'disabled' }}
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
        <p class="muted">
            Go-live ready {{ $billingGoLiveReadiness['data']['summary']['providers_ready_for_human_activation'] }} /
            {{ $billingGoLiveReadiness['data']['summary']['providers'] }} providers ·
            paid plans ready {{ $billingGoLiveReadiness['data']['summary']['paid_plans_ready_for_human_activation'] }} /
            {{ $billingGoLiveReadiness['data']['summary']['paid_plans'] }} ·
            checkout sessions {{ $billingGoLiveReadiness['data']['summary']['checkout_sessions_enabled'] }} ·
            live webhooks {{ $billingGoLiveReadiness['data']['summary']['live_webhooks_enabled'] }} ·
            revenue import {{ $billingGoLiveReadiness['data']['summary']['revenue_import_enabled'] }}
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
                    <th>Limits</th>
                    <th>Checkout</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($billingPlans as $plan)
                    @php($planLimits = is_array($plan->entitlements_summary) ? $plan->entitlements_summary : [])
                    <tr>
                        <td>{{ $plan->site?->name ?? 'Unknown site' }}</td>
                        <td>{{ $plan->slug }}</td>
                        <td>{{ $plan->status }}</td>
                        <td>{{ $plan->currency }} {{ number_format($plan->amount_minor / 100, 2) }}</td>
                        <td>
                            Ops {{ $planLimits['monthly_operations'] ?? 'n/a' }}
                            @if (isset($planLimits['monitor_slots']))
                                | monitors {{ $planLimits['monitor_slots'] }}
                            @endif
                            | seats {{ $planLimits['team_seats'] ?? 'n/a' }}
                        </td>
                        <td>{{ $plan->checkout_enabled ? 'enabled' : 'disabled' }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6">No billing plans seeded.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </section>

    <section class="panel">
        <h2>Google integrations</h2>
        <p class="muted">
            Go-live ready {{ $googleGoLiveReadiness['data']['summary']['sites_ready_for_human_activation'] }} /
            {{ $googleGoLiveReadiness['data']['summary']['integrations'] }} sites ·
            GA4 loading {{ $googleGoLiveReadiness['data']['summary']['sites_loading_ga4'] }} ·
            GTM loading {{ $googleGoLiveReadiness['data']['summary']['sites_loading_gtm'] }} ·
            Search Console import {{ $googleGoLiveReadiness['data']['summary']['sites_importing_search_console'] }} ·
            automatic tags {{ $googleGoLiveReadiness['data']['summary']['automatic_tag_injection_enabled'] ? 'enabled' : 'disabled' }}
        </p>
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

    <section class="panel">
        <h2>Growth ingestion</h2>
        <p class="muted">
            Sources {{ $growthIngestionReadiness['data']['summary']['sources'] }} ·
            ready {{ $growthIngestionReadiness['data']['summary']['sources_ready_for_human_activation'] }} ·
            importing {{ $growthIngestionReadiness['data']['summary']['sources_importing'] }} ·
            provider requests {{ $growthIngestionReadiness['data']['summary']['provider_requests_enabled'] }} ·
            workers {{ $growthIngestionReadiness['data']['summary']['workers_enabled'] }}
        </p>
        <table>
            <thead>
                <tr>
                    <th>Site</th>
                    <th>Source</th>
                    <th>Access</th>
                    <th>Token</th>
                    <th>Data</th>
                    <th>Import</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($growthProviderIngestions as $ingestion)
                    <tr>
                        <td>{{ $ingestion->site?->name ?? 'Unknown site' }}</td>
                        <td>{{ $ingestion->source }}</td>
                        <td><span class="status {{ $ingestion->access_status }}">{{ $ingestion->access_status }}</span></td>
                        <td>{{ $ingestion->token_status }}</td>
                        <td>{{ $ingestion->data_status }}</td>
                        <td>{{ $ingestion->import_enabled ? 'enabled' : 'disabled' }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6">No growth ingestion readiness records seeded.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </section>

    <section class="panel">
        <h2>Support monetization</h2>
        <p class="muted">
            Go-live ready {{ $supportMonetizationGoLiveReadiness['data']['summary']['channels_ready_for_human_activation'] }} /
            {{ $supportMonetizationGoLiveReadiness['data']['summary']['channels'] }} channels ·
            donation payments {{ $supportMonetizationGoLiveReadiness['data']['summary']['real_donation_payments_enabled'] }} ·
            affiliate links {{ $supportMonetizationGoLiveReadiness['data']['summary']['real_affiliate_links_enabled'] }} ·
            public links {{ $supportMonetizationGoLiveReadiness['data']['summary']['public_links_enabled'] }} ·
            widgets {{ $supportMonetizationGoLiveReadiness['data']['summary']['widgets_loaded'] }}
        </p>
        <table>
            <thead>
                <tr>
                    <th>Site</th>
                    <th>Channel</th>
                    <th>Account</th>
                    <th>Disclosure</th>
                    <th>Destination</th>
                    <th>Public</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($supportMonetizationChannels as $channel)
                    <tr>
                        <td>{{ $channel->site?->name ?? 'Unknown site' }}</td>
                        <td>{{ $channel->channel }}</td>
                        <td><span class="status {{ $channel->account_status }}">{{ $channel->account_status }}</span></td>
                        <td>{{ $channel->disclosure_status }}</td>
                        <td>{{ $channel->destination_url_status }}</td>
                        <td>{{ $channel->public_enabled ? 'enabled' : 'disabled' }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6">No support monetization readiness records seeded.</td>
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
