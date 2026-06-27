<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\BenchmarkOpportunity;
use App\Models\BenchmarkSiteReadiness;
use Illuminate\Http\Request;
use Illuminate\View\View;

class BenchmarkRefinementController extends Controller
{
    public function index(Request $request): View
    {
        $readiness = BenchmarkSiteReadiness::query()
            ->with('site:id,slug,name,launch_order,kind')
            ->get()
            ->sortBy(fn (BenchmarkSiteReadiness $item): int => $item->site?->launch_order ?? 999)
            ->values();

        $opportunities = BenchmarkOpportunity::query()
            ->with('site:id,slug,name,launch_order')
            ->orderByRaw("case priority when 'p0' then 0 when 'p1' then 1 else 2 end")
            ->orderBy('human_gate_required')
            ->orderByDesc('priority_score')
            ->orderBy('id')
            ->get();

        $summary = [
            'surfaces' => $readiness->count(),
            'average_score' => (int) round($readiness->avg('overall_score') ?? 0),
            'open_opportunities' => $opportunities->whereNotIn('status', ['completed'])->count(),
            'human_gates' => $opportunities->where('human_gate_required', true)->count(),
            'external_provider_active' => $readiness->where('external_provider_active', true)->count()
                + $opportunities->where('external_provider_active', true)->count(),
            'real_ads_enabled' => $readiness->where('real_ads_enabled', true)->count(),
            'real_billing_enabled' => $readiness->where('real_billing_enabled', true)->count(),
        ];

        AuditLog::record($request->user(), 'admin.benchmark_refinement.index_viewed', metadata: [
            'surfaces' => $summary['surfaces'],
            'open_opportunities' => $summary['open_opportunities'],
            'human_gates' => $summary['human_gates'],
        ]);

        return view('admin.benchmark-refinement.index', [
            'opportunities' => $opportunities,
            'readiness' => $readiness,
            'summary' => $summary,
        ]);
    }
}
