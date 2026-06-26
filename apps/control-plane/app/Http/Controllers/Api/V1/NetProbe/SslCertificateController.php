<?php

namespace App\Http\Controllers\Api\V1\NetProbe;

use App\Http\Controllers\Controller;
use App\Support\NetProbe\SslCertificateService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SslCertificateController extends Controller
{
    public function __invoke(Request $request, SslCertificateService $lookup): JsonResponse
    {
        $validated = $request->validate([
            'hostname' => ['required', 'string', 'max:253'],
        ]);

        return response()->json($lookup->inspect((string) $validated['hostname']));
    }
}
