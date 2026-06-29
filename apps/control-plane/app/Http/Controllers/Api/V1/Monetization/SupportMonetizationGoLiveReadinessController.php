<?php

namespace App\Http\Controllers\Api\V1\Monetization;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Support\Monetization\SupportMonetizationGoLiveReadiness;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SupportMonetizationGoLiveReadinessController extends Controller
{
    public function __invoke(Request $request, SupportMonetizationGoLiveReadiness $readiness): JsonResponse
    {
        $snapshot = $readiness->snapshot();

        AuditLog::record($request->user(), 'api.support_monetization.go_live_readiness.viewed', metadata: [
            'contract_version' => $snapshot['meta']['contract_version'],
            'channels' => $snapshot['data']['summary']['channels'],
            'channels_ready_for_human_activation' => $snapshot['data']['summary']['channels_ready_for_human_activation'],
            'public_links_enabled' => $snapshot['data']['summary']['public_links_enabled'],
            'real_donation_payments_enabled' => $snapshot['data']['summary']['real_donation_payments_enabled'],
            'real_affiliate_links_enabled' => $snapshot['data']['summary']['real_affiliate_links_enabled'],
            'provider_activation' => false,
        ]);

        return response()->json($snapshot);
    }
}
