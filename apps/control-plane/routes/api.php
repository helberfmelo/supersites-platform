<?php

use App\Http\Controllers\Api\V1\CurrentUserController;
use App\Http\Controllers\Api\V1\SiteIndexController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')
    ->middleware('auth')
    ->group(function (): void {
        Route::get('/me', CurrentUserController::class);
        Route::get('/sites', SiteIndexController::class);
    });
