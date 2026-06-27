<?php

namespace Tests\Feature;

use App\Models\QrRouteLink;
use App\Support\QrRoute\QrRouteDestinationGuard;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class QrRouteRedirectTest extends TestCase
{
    use RefreshDatabase;

    public function test_redirect_service_sends_active_links_to_safe_destination_without_fragment(): void
    {
        $guard = app(QrRouteDestinationGuard::class);
        $destination = $guard->normalizeDestination('https://example.com/welcome?utm_source=test#private-note');

        QrRouteLink::query()->create([
            'code' => 'Abc_123',
            'destination_url' => $destination,
            'destination_hash' => hash('sha256', $destination),
            'status' => 'active',
            'abuse_status' => 'clear',
        ]);

        $this->get('/api/v1/qrroute/r/Abc_123')
            ->assertFound()
            ->assertHeader('location', 'https://example.com/welcome?utm_source=test')
            ->assertHeader('Referrer-Policy', 'no-referrer');

        $this->assertDatabaseHas('qr_route_links', [
            'code' => 'Abc_123',
            'click_count' => 1,
        ]);
    }

    public function test_redirect_service_blocks_inactive_expired_and_unsafe_destinations(): void
    {
        QrRouteLink::query()->create([
            'code' => 'disabled',
            'destination_url' => 'https://example.com/',
            'destination_hash' => hash('sha256', 'https://example.com/'),
            'status' => 'disabled',
        ]);

        $this->getJson('/api/v1/qrroute/r/disabled')
            ->assertGone()
            ->assertJsonPath('message', 'QRRoute link is unavailable.');

        QrRouteLink::query()->create([
            'code' => 'expired',
            'destination_url' => 'https://example.com/',
            'destination_hash' => hash('sha256', 'https://example.com/'),
            'status' => 'active',
            'expires_at' => now()->subMinute(),
        ]);

        $this->getJson('/api/v1/qrroute/r/expired')
            ->assertGone();

        QrRouteLink::query()->create([
            'code' => 'unsafe',
            'destination_url' => 'http://127.0.0.1/admin',
            'destination_hash' => hash('sha256', 'http://127.0.0.1/admin'),
            'status' => 'active',
        ]);

        $this->getJson('/api/v1/qrroute/r/unsafe')
            ->assertGone()
            ->assertJsonPath('message', 'QRRoute destination is blocked by abuse controls.');
    }

    public function test_destination_guard_rejects_abusive_url_shapes(): void
    {
        $guard = app(QrRouteDestinationGuard::class);

        foreach ([
            'javascript:alert(1)',
            'https://user:pass@example.com/',
            'http://localhost/admin',
            'http://10.0.0.1/',
            'https://router.local/',
            'ftp://example.com/file',
        ] as $destination) {
            try {
                $guard->normalizeDestination($destination);
                $this->fail("Destination should have been rejected: {$destination}");
            } catch (ValidationException $exception) {
                $this->assertArrayHasKey('destination_url', $exception->errors());
            }
        }
    }

    public function test_redirect_rate_limit_is_applied_without_storing_request_pii(): void
    {
        Cache::flush();

        $destination = 'https://example.com/';
        QrRouteLink::query()->create([
            'code' => 'ratelimit',
            'destination_url' => $destination,
            'destination_hash' => hash('sha256', $destination),
            'status' => 'active',
            'abuse_status' => 'clear',
        ]);

        for ($i = 0; $i < 60; $i++) {
            $this->withServerVariables(['REMOTE_ADDR' => '198.51.100.42'])
                ->get('/api/v1/qrroute/r/ratelimit')
                ->assertFound();
        }

        $this->withServerVariables(['REMOTE_ADDR' => '198.51.100.42'])
            ->get('/api/v1/qrroute/r/ratelimit')
            ->assertTooManyRequests();

        $this->assertDatabaseMissing('qr_route_links', [
            'code' => 'ratelimit',
            'destination_url' => '198.51.100.42',
        ]);
    }
}
