<?php

use App\Http\Controllers\Api\V1\AnalyticsEventController;
use App\Http\Controllers\Api\V1\CurrentUserController;
use App\Http\Controllers\Api\V1\MailHealth\MailHealthBlacklistController;
use App\Http\Controllers\Api\V1\MailHealth\MailHealthDnsController;
use App\Http\Controllers\Api\V1\MailHealth\MailHealthSmtpController;
use App\Http\Controllers\Api\V1\MetricSnapshotIndexController;
use App\Http\Controllers\Api\V1\NetProbe\ClientIpController;
use App\Http\Controllers\Api\V1\NetProbe\DnsPropagationController;
use App\Http\Controllers\Api\V1\NetProbe\DnsLookupController;
use App\Http\Controllers\Api\V1\NetProbe\Monitoring\NetProbeMonitorIndexController;
use App\Http\Controllers\Api\V1\NetProbe\Monitoring\NetProbeMonitorRunController;
use App\Http\Controllers\Api\V1\NetProbe\Monitoring\NetProbeMonitorShowController;
use App\Http\Controllers\Api\V1\NetProbe\Monitoring\NetProbeMonitorStoreController;
use App\Http\Controllers\Api\V1\NetProbe\PortCheckController;
use App\Http\Controllers\Api\V1\NetProbe\RdapLookupController;
use App\Http\Controllers\Api\V1\NetProbe\ReachabilityController;
use App\Http\Controllers\Api\V1\NetProbe\SslCertificateController;
use App\Http\Controllers\Api\V1\QrRoute\QrRouteRedirectController;
use App\Http\Controllers\Api\V1\SiteIndexController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::post('/analytics/events', AnalyticsEventController::class)
        ->middleware('throttle:60,1');

    Route::prefix('netprobe')
        ->middleware('throttle:netprobe-public')
        ->group(function (): void {
            Route::get('/ip', ClientIpController::class);
            Route::post('/dns', DnsLookupController::class);
            Route::post('/propagation', DnsPropagationController::class);
            Route::post('/port', PortCheckController::class);
            Route::post('/reachability', ReachabilityController::class);
            Route::post('/rdap', RdapLookupController::class);
            Route::post('/ssl', SslCertificateController::class);
        });

    Route::prefix('mailhealth')
        ->middleware('throttle:mailhealth-public')
        ->group(function (): void {
            Route::post('/dns', MailHealthDnsController::class);
            Route::post('/blacklist', MailHealthBlacklistController::class);
            Route::post('/smtp', MailHealthSmtpController::class);
        });

    Route::get('/qrroute/r/{code}', QrRouteRedirectController::class)
        ->middleware('throttle:qrroute-redirect');
});

Route::prefix('v1')
    ->middleware('auth')
    ->group(function (): void {
        Route::get('/me', CurrentUserController::class);
        Route::get('/sites', SiteIndexController::class);
        Route::get('/metric-snapshots', MetricSnapshotIndexController::class)
            ->middleware('permission:dashboard.view');

        Route::prefix('netprobe/monitors')
            ->middleware('permission:operations.manage')
            ->group(function (): void {
                Route::get('/', NetProbeMonitorIndexController::class);
                Route::post('/', NetProbeMonitorStoreController::class);
                Route::get('/{monitor}', NetProbeMonitorShowController::class);
                Route::post('/{monitor}/run', NetProbeMonitorRunController::class);
            });
    });
