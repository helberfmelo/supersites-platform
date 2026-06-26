<?php

namespace App\Http\Controllers\Api\V1\NetProbe;

use App\Http\Controllers\Controller;
use App\Support\NetProbe\RdapLookupService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RdapLookupController extends Controller
{
    public function __invoke(Request $request, RdapLookupService $lookup): JsonResponse
    {
        $validated = $request->validate([
            'domain' => ['required', 'string', 'max:253'],
        ]);

        return response()->json($lookup->lookup((string) $validated['domain']));
    }
}
