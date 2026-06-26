<?php

namespace App\Http\Controllers\Api\V1\NetProbe;

use App\Http\Controllers\Controller;
use App\Support\NetProbe\DnsPropagationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DnsPropagationController extends Controller
{
    public function __invoke(Request $request, DnsPropagationService $lookup): JsonResponse
    {
        $validated = $request->validate([
            'domain' => ['required', 'string', 'max:253'],
            'type' => ['required', 'string', 'max:10'],
        ]);

        return response()->json($lookup->lookup((string) $validated['domain'], (string) $validated['type']));
    }
}
