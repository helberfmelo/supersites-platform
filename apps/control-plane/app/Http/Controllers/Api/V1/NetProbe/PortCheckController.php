<?php

namespace App\Http\Controllers\Api\V1\NetProbe;

use App\Http\Controllers\Controller;
use App\Support\NetProbe\PortCheckService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PortCheckController extends Controller
{
    public function __invoke(Request $request, PortCheckService $lookup): JsonResponse
    {
        $validated = $request->validate([
            'hostname' => ['required', 'string', 'max:253'],
            'port' => ['required', 'integer', 'min:1', 'max:65535'],
        ]);

        return response()->json($lookup->check((string) $validated['hostname'], (int) $validated['port']));
    }
}
