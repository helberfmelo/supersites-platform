<?php

namespace App\Http\Controllers\Api\V1\NetProbe;

use App\Http\Controllers\Controller;
use App\Support\NetProbe\ReachabilityService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReachabilityController extends Controller
{
    public function __invoke(Request $request, ReachabilityService $lookup): JsonResponse
    {
        $validated = $request->validate([
            'hostname' => ['required', 'string', 'max:253'],
        ]);

        return response()->json($lookup->check((string) $validated['hostname']));
    }
}
