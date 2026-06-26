<?php

namespace App\Http\Controllers\Api\V1\NetProbe;

use App\Http\Controllers\Controller;
use App\Support\NetProbe\DnsLookupService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DnsLookupController extends Controller
{
    public function __invoke(Request $request, DnsLookupService $lookupService): JsonResponse
    {
        $validated = $request->validate([
            'domain' => ['required', 'string', 'max:253'],
            'types' => ['sometimes', 'array', 'max:8'],
            'types.*' => ['required', 'string', 'max:8'],
        ]);

        return response()->json(
            $lookupService->lookup(
                $validated['domain'],
                $validated['types'] ?? [],
            )
        );
    }
}
