<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\MetricSnapshot;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MetricSnapshotIndexController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $snapshots = MetricSnapshot::query()
            ->with('site')
            ->latest('period_start')
            ->limit(50)
            ->get();

        AuditLog::record($request->user(), 'api.metric_snapshots.index', metadata: [
            'count' => $snapshots->count(),
        ]);

        return response()->json([
            'data' => $snapshots->map(fn (MetricSnapshot $snapshot): array => [
                'site_slug' => $snapshot->site?->slug,
                'metric_key' => $snapshot->metric_key,
                'granularity' => $snapshot->granularity,
                'period_start' => $snapshot->period_start->toISOString(),
                'value' => $snapshot->value,
                'source' => $snapshot->source,
                'status' => $snapshot->status,
                'dimensions' => $snapshot->dimensions ?? [],
                'collected_at' => $snapshot->collected_at->toISOString(),
            ])->values(),
            'meta' => [
                'count' => $snapshots->count(),
            ],
        ]);
    }
}
