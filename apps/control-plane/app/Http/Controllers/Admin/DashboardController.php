<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdSenseAccount;
use App\Models\AdSenseSiteReview;
use App\Models\AuditLog;
use App\Models\BillingPlan;
use App\Models\BillingProvider;
use App\Models\DeploymentRecord;
use App\Models\GoogleIntegration;
use App\Models\Incident;
use App\Models\OperationalTask;
use App\Models\Site;
use Illuminate\Http\Request;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function __invoke(Request $request): View
    {
        $statusCounts = Site::query()
            ->selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->orderBy('status')
            ->pluck('total', 'status');

        $summary = [
            'sites' => Site::query()->count(),
            'adsense_ready' => Site::query()->where('adsense_ready', true)->count(),
            'adsense_gated' => AdSenseSiteReview::query()->where('ad_serving_enabled', false)->count(),
            'adsense_serving_enabled' => AdSenseSiteReview::query()->where('ad_serving_enabled', true)->count(),
            'billing_gated' => BillingProvider::query()->where('checkout_enabled', false)->count(),
            'billing_checkout_enabled' => BillingProvider::query()->where('checkout_enabled', true)->count(),
            'google_gated' => GoogleIntegration::query()
                ->where(function ($query): void {
                    $query
                        ->where('access_status', 'human_required')
                        ->orWhere('search_console_status', 'human_required')
                        ->orWhere('tags_enabled', false);
                })
                ->count(),
            'google_tags_enabled' => GoogleIntegration::query()->where('tags_enabled', true)->count(),
            'open_incidents' => Incident::query()->whereIn('status', ['open', 'investigating', 'monitoring'])->count(),
            'open_tasks' => OperationalTask::query()->whereIn('status', ['open', 'blocked'])->count(),
        ];

        AuditLog::record($request->user(), 'admin.dashboard.viewed', metadata: [
            'sites' => $summary['sites'],
            'open_incidents' => $summary['open_incidents'],
            'open_tasks' => $summary['open_tasks'],
        ]);

        return view('admin.dashboard', [
            'adsenseAccount' => AdSenseAccount::query()
                ->withCount('siteReviews')
                ->orderBy('id')
                ->first(),
            'adsenseSiteReviews' => AdSenseSiteReview::query()
                ->with('site:id,slug,name')
                ->orderBy('ad_serving_enabled')
                ->orderBy('site_review_status')
                ->orderBy('id')
                ->limit(6)
                ->get(),
            'billingPlans' => BillingPlan::query()
                ->with('site:id,slug,name')
                ->orderBy('checkout_enabled')
                ->orderBy('status')
                ->orderBy('id')
                ->limit(6)
                ->get(),
            'billingProviders' => BillingProvider::query()
                ->withCount('plans')
                ->orderBy('checkout_enabled')
                ->orderBy('provider')
                ->get(),
            'deployments' => DeploymentRecord::query()
                ->with('site:id,slug,name')
                ->latest('finished_at')
                ->latest()
                ->limit(5)
                ->get(),
            'googleIntegrations' => GoogleIntegration::query()
                ->with('site:id,slug,name')
                ->orderBy('tags_enabled')
                ->orderBy('access_status')
                ->orderBy('id')
                ->limit(6)
                ->get(),
            'incidents' => Incident::query()
                ->with('site:id,slug,name')
                ->latest('detected_at')
                ->latest()
                ->limit(5)
                ->get(),
            'recentAudits' => AuditLog::query()
                ->with('user:id,name,email')
                ->latest('occurred_at')
                ->latest()
                ->limit(8)
                ->get(),
            'statusCounts' => $statusCounts,
            'summary' => $summary,
            'tasks' => OperationalTask::query()
                ->with('site:id,slug,name')
                ->orderByRaw("case priority when 'high' then 0 when 'medium' then 1 else 2 end")
                ->orderBy('status')
                ->limit(6)
                ->get(),
        ]);
    }
}
