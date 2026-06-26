<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\DeploymentRecord;
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
            'open_incidents' => Incident::query()->whereIn('status', ['open', 'investigating', 'monitoring'])->count(),
            'open_tasks' => OperationalTask::query()->whereIn('status', ['open', 'blocked'])->count(),
        ];

        AuditLog::record($request->user(), 'admin.dashboard.viewed', metadata: [
            'sites' => $summary['sites'],
            'open_incidents' => $summary['open_incidents'],
            'open_tasks' => $summary['open_tasks'],
        ]);

        return view('admin.dashboard', [
            'deployments' => DeploymentRecord::query()
                ->with('site:id,slug,name')
                ->latest('finished_at')
                ->latest()
                ->limit(5)
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
