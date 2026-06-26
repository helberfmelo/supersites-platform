<?php

namespace App\Providers;

use App\Support\NetProbe\HttpNetProbeRdapClient;
use App\Support\NetProbe\NetProbeCertificateProbe;
use App\Support\NetProbe\NetProbeDnsResolver;
use App\Support\NetProbe\NetProbeRdapClient;
use App\Support\NetProbe\NetProbeTcpProbe;
use App\Support\NetProbe\PhpNetProbeCertificateProbe;
use App\Support\NetProbe\PhpNetProbeDnsResolver;
use App\Support\NetProbe\PhpNetProbeTcpProbe;
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
        $this->app->bind(NetProbeRdapClient::class, HttpNetProbeRdapClient::class);
        $this->app->bind(NetProbeCertificateProbe::class, PhpNetProbeCertificateProbe::class);
        $this->app->bind(NetProbeTcpProbe::class, PhpNetProbeTcpProbe::class);
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
