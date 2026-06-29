<?php

namespace App\Http\Controllers\Api\V1\Monitoring;

use App\Http\Controllers\Controller;
use App\Support\Billing\PaidMonitorPreviewService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MonitorPreviewStoreController extends Controller
{
    public function __invoke(Request $request, PaidMonitorPreviewService $previews): JsonResponse
    {
        $validated = $request->validate([
            'site_slug' => ['required', 'string', 'max:80'],
            'monitor_type' => ['required', 'string', 'max:80'],
            'target' => ['required', 'string', 'max:255'],
            'frequency_minutes' => ['nullable', 'integer', 'min:1', 'max:10080'],
        ]);

        return response()->json(
            $previews->preview(
                $request->user(),
                $validated['site_slug'],
                $validated['monitor_type'],
                $validated['target'],
                $validated['frequency_minutes'] ?? null,
            ),
            202,
        );
    }
}
