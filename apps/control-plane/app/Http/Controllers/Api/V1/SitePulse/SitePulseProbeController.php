<?php

namespace App\Http\Controllers\Api\V1\SitePulse;

use App\Http\Controllers\Controller;
use App\Support\SitePulse\SitePulseProbeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SitePulseProbeController extends Controller
{
    public function __invoke(Request $request, SitePulseProbeService $service): JsonResponse
    {
        $validated = $request->validate([
            'url' => ['required', 'string', 'max:2048'],
            'checks' => ['sometimes', 'array', 'max:7'],
            'checks.*' => ['string', 'max:32'],
        ]);

        return response()->json($service->probe(
            (string) $validated['url'],
            $validated['checks'] ?? ['status'],
        ));
    }
}
