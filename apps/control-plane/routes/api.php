<?php

use App\Http\Controllers\Api\V1\AnalyticsEventController;
use App\Http\Controllers\Api\V1\CurrentUserController;
use App\Http\Controllers\Api\V1\MetricSnapshotIndexController;
use App\Http\Controllers\Api\V1\SiteIndexController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::post('/analytics/events', AnalyticsEventController::class)
        ->middleware('throttle:60,1');
});

Route::prefix('v1')
    ->middleware('auth')
    ->group(function (): void {
        Route::get('/me', CurrentUserController::class);
        Route::get('/sites', SiteIndexController::class);
        Route::get('/metric-snapshots', MetricSnapshotIndexController::class)
            ->middleware('permission:dashboard.view');
    });
