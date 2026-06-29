<?php

use App\Http\Controllers\Admin\BenchmarkRefinementController;
use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ExecutiveReportController;
use App\Http\Controllers\Admin\SiteController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('guest')->group(function (): void {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('login.store');
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

Route::middleware('auth')->prefix('admin')->name('admin.')->group(function (): void {
    Route::get('/account', [AccountController::class, 'show'])->name('account.show');
    Route::post('/account/export', [AccountController::class, 'export'])->name('account.export');
    Route::post('/account/delete-request', [AccountController::class, 'requestDeletion'])->name('account.delete-request');

    Route::get('/', DashboardController::class)
        ->middleware('permission:dashboard.view')
        ->name('dashboard');

    Route::middleware('permission:dashboard.view')->group(function (): void {
        Route::get('/benchmark-refinement', [BenchmarkRefinementController::class, 'index'])->name('benchmark-refinement.index');
        Route::get('/reports', [ExecutiveReportController::class, 'index'])->name('reports.index');
        Route::get('/reports/{executiveReport}', [ExecutiveReportController::class, 'show'])->name('reports.show');
        Route::get('/reports/{executiveReport}/print', [ExecutiveReportController::class, 'print'])->name('reports.print');
        Route::get('/reports/{executiveReport}/export.csv', [ExecutiveReportController::class, 'exportCsv'])->name('reports.export');
    });

    Route::get('/sites', [SiteController::class, 'index'])
        ->middleware('permission:sites.view')
        ->name('sites.index');

    Route::middleware('permission:sites.manage')->group(function (): void {
        Route::get('/sites/create', [SiteController::class, 'create'])->name('sites.create');
        Route::post('/sites', [SiteController::class, 'store'])->name('sites.store');
        Route::get('/sites/{site}/edit', [SiteController::class, 'edit'])->name('sites.edit');
        Route::put('/sites/{site}', [SiteController::class, 'update'])->name('sites.update');
    });
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
