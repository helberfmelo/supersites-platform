<?php

namespace App\Providers;

use App\Support\NetProbe\NetProbeDnsResolver;
use App\Support\NetProbe\PhpNetProbeDnsResolver;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(NetProbeDnsResolver::class, PhpNetProbeDnsResolver::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('netprobe-public', function (Request $request): Limit {
            return Limit::perMinute(30)->by($request->ip() ?: 'anonymous');
        });
    }
}
