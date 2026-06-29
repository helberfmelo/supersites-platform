<?php

namespace App\Http\Controllers\Api\V1\AdSense;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Support\AdSense\AdSenseGoLiveReadiness;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdSenseGoLiveReadinessController extends Controller
{
    public function __invoke(Request $request, AdSenseGoLiveReadiness $readiness): JsonResponse
    {
        $snapshot = $readiness->snapshot();

        AuditLog::record($request->user(), 'api.adsense.go_live_readiness.viewed', metadata: [
            'contract_version' => $snapshot['meta']['contract_version'],
            'preview_available' => $snapshot['data']['ads_txt']['preview_available'],
            'site_reviews' => $snapshot['data']['summary']['site_reviews'],
            'sites_ready_for_human_review' => $snapshot['data']['summary']['sites_ready_for_human_review'],
            'sites_serving_ads' => $snapshot['data']['summary']['sites_serving_ads'],
            'provider_activation' => false,
        ]);

        return response()->json($snapshot);
    }
}
