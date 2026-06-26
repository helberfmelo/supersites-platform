<?php

namespace App\Http\Controllers\Api\V1\NetProbe;

use App\Http\Controllers\Controller;
use App\Support\NetProbe\NetProbeHostGuard;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClientIpController extends Controller
{
    public function __invoke(Request $request, NetProbeHostGuard $guard): JsonResponse
    {
        $address = (string) $request->ip();
        $version = filter_var($address, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6) ? 'IPv6' : 'IPv4';

        if (! filter_var($address, FILTER_VALIDATE_IP)) {
            $version = 'unknown';
        }

        return response()->json([
            'data' => [
                'address' => $address,
                'version' => $version,
                'is_public' => $guard->isPublicIp($address),
                'source' => 'request_ip',
            ],
            'meta' => [
                'generated_at' => now()->toISOString(),
                'retention' => 'not_stored_by_this_endpoint',
                'analytics' => 'full_ip_not_sent_to_analytics',
            ],
        ]);
    }
}
