<?php

namespace Tests\Feature;

use App\Models\AnalyticsEvent;
use App\Models\AuditLog;
use App\Models\MetricSnapshot;
use App\Models\Role;
use App\Models\Site;
use App\Models\User;
use Database\Seeders\AccessControlSeeder;
use Database\Seeders\PortfolioSiteSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AnalyticsApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_analytics_ingest_accepts_allowed_event_and_sanitizes_payload(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class]);

        $this->postJson('/api/v1/analytics/events', [
            'name' => 'outbound_site_click',
            'site_slug' => 'NetProbe Atlas',
            'locale' => 'pt-BR',
            'route_path' => '/pt-br?utm_source=test',
            'surface' => 'catalog_card',
            'anonymous_id' => 'browser-anonymous-id',
            'session_id' => 'browser-session-id',
            'occurred_at' => '2026-06-26T00:00:00.000Z',
            'properties' => [
                'target_url' => 'https://opentshost.com/supersites/netprobe-atlas/?token=abc#frag',
                'email' => 'person@example.test',
                'copied_value' => 'contact person@example.test from 192.168.0.10',
            ],
        ])
            ->assertAccepted()
            ->assertJsonPath('data.name', 'outbound_site_click')
            ->assertJsonPath('data.site_slug', 'netprobe-atlas')
            ->assertJsonPath('data.accepted', true);

        $event = AnalyticsEvent::query()->firstOrFail();

        $this->assertSame('2026-06-26.1', $event->contract_version);
        $this->assertSame('outbound_site_click', $event->event_name);
        $this->assertSame('pt-br', $event->locale);
        $this->assertSame('/pt-br', $event->route_path);
        $this->assertSame('/supersites/netprobe-atlas', $event->properties['target_url']);
        $this->assertSame('contact [redacted-email] from [redacted-ip]', $event->properties['copied_value']);
        $this->assertArrayNotHasKey('email', $event->properties);
        $this->assertNotSame('browser-anonymous-id', $event->anonymous_id_hash);
        $this->assertNotSame('browser-session-id', $event->session_id_hash);
        $this->assertSame(64, strlen((string) $event->anonymous_id_hash));
        $this->assertSame(64, strlen((string) $event->session_id_hash));
    }

    public function test_public_analytics_ingest_rejects_events_outside_contract(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class]);

        $this->postJson('/api/v1/analytics/events', [
            'name' => 'email_collected',
            'site_slug' => 'netprobe-atlas',
        ])->assertUnprocessable();

        $this->assertDatabaseCount('analytics_events', 0);
    }

    public function test_metric_snapshots_require_authentication_and_dashboard_permission(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class]);

        $site = Site::query()->where('slug', 'supersite')->firstOrFail();
        MetricSnapshot::query()->create([
            'site_id' => $site->id,
            'metric_key' => 'outbound_site_clicks',
            'granularity' => 'day',
            'period_start' => '2026-06-26 00:00:00',
            'value' => 12,
            'source' => 'internal',
            'status' => 'estimated',
            'dimensions' => ['locale' => 'pt-br'],
            'collected_at' => '2026-06-26 01:00:00',
        ]);

        $this->getJson('/api/v1/metric-snapshots')->assertUnauthorized();

        $user = User::factory()->create();
        $this->actingAs($user)
            ->getJson('/api/v1/metric-snapshots')
            ->assertForbidden();

        $user->roles()->attach(Role::query()->where('slug', 'analyst')->value('id'), ['site_id' => null]);

        $this->actingAs($user)
            ->getJson('/api/v1/metric-snapshots')
            ->assertOk()
            ->assertJsonPath('meta.count', 1)
            ->assertJsonPath('data.0.site_slug', 'supersite')
            ->assertJsonPath('data.0.metric_key', 'outbound_site_clicks')
            ->assertJsonPath('data.0.status', 'estimated')
            ->assertJsonPath('data.0.dimensions.locale', 'pt-br');

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'api.metric_snapshots.index',
        ]);

        $this->assertSame(1, AuditLog::query()->where('action', 'api.metric_snapshots.index')->firstOrFail()->metadata['count']);
    }
}
