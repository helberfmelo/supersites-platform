<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/health', function () {
    $checks = [
        'app' => ['status' => 'up'],
    ];

    if (filter_var(env('SUPERSITES_HEALTH_CHECK_CONNECTIONS', false), FILTER_VALIDATE_BOOLEAN)) {
        try {
            DB::select('select 1');
            $checks['database'] = ['status' => 'up'];
        } catch (Throwable $exception) {
            $checks['database'] = [
                'status' => 'down',
                'error' => $exception::class,
            ];
        }

        try {
            Redis::connection()->ping();
            $checks['redis'] = ['status' => 'up'];
        } catch (Throwable $exception) {
            $checks['redis'] = [
                'status' => 'down',
                'error' => $exception::class,
            ];
        }
    }

    $status = collect($checks)->contains(fn (array $check): bool => $check['status'] !== 'up')
        ? 'degraded'
        : 'ok';

    return response()->json([
        'service' => 'SuperSites Control Plane',
        'environment' => app()->environment(),
        'status' => $status,
        'checks' => $checks,
    ], $status === 'ok' ? 200 : 503);
});
