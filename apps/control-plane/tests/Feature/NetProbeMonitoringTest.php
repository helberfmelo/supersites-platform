<?php

namespace Tests\Feature;

use App\Jobs\RunNetProbeMonitorCheck;
use App\Mail\NetProbeMonitorAlertMail;
use App\Models\AuditLog;
use App\Models\NetProbeAlert;
use App\Models\NetProbeMonitor;
use App\Models\Role;
use App\Models\User;
use App\Support\NetProbe\NetProbeCertificateProbe;
use App\Support\NetProbe\NetProbeDnsResolver;
use App\Support\NetProbe\NetProbeRdapClient;
use App\Support\NetProbe\Monitoring\NetProbeMonitorRunner;
use Database\Seeders\AccessControlSeeder;
use Database\Seeders\PortfolioSiteSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class NetProbeMonitoringTest extends TestCase
{
    use RefreshDatabase;

    public function test_monitor_api_requires_operations_permission_and_creates_monitor(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class]);
        Queue::fake();

        $analyst = User::factory()->create();
        $analyst->roles()->attach(Role::query()->where('slug', 'analyst')->value('id'), ['site_id' => null]);

        $this->actingAs($analyst)
            ->postJson('/api/v1/netprobe/monitors', [
                'type' => 'dns',
                'target' => 'example.com',
            ])
            ->assertForbidden();

        $operator = User::factory()->create();
        $operator->roles()->attach(Role::query()->where('slug', 'operator')->value('id'), ['site_id' => null]);

        $this->actingAs($operator)
            ->postJson('/api/v1/netprobe/monitors', [
                'type' => 'dns',
                'target' => 'Example.COM.',
                'label' => 'Primary DNS',
                'frequency_minutes' => 60,
                'settings' => [
                    'record_types' => ['a', 'MX'],
                    'expected_values' => ['93.184.216.34'],
                    'alert_email' => 'Ops@Example.com',
                    'webhook_url' => 'https://hooks.example.com/netprobe',
                ],
            ])
            ->assertCreated()
            ->assertJsonPath('data.target', 'example.com')
            ->assertJsonPath('data.settings.record_types.0', 'A')
            ->assertJsonPath('data.settings.alert_email', 'ops@example.com')
            ->assertJsonPath('meta.queued_initial_check', true);

        $monitor = NetProbeMonitor::query()->firstOrFail();

        Queue::assertPushed(RunNetProbeMonitorCheck::class, fn (RunNetProbeMonitorCheck $job): bool => $job->monitorId === $monitor->id);

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $operator->id,
            'action' => 'api.netprobe.monitors.store',
            'auditable_type' => NetProbeMonitor::class,
            'auditable_id' => (string) $monitor->id,
        ]);

        $this->assertSame($monitor->target_hash, AuditLog::query()->latest()->firstOrFail()->metadata['target_hash']);
    }

    public function test_monitor_api_enforces_free_preview_quota(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class]);
        Queue::fake();
        config(['netprobe.quotas.free_preview.max_monitors' => 1]);

        $operator = User::factory()->create();
        $operator->roles()->attach(Role::query()->where('slug', 'operator')->value('id'), ['site_id' => null]);

        $this->actingAs($operator)
            ->postJson('/api/v1/netprobe/monitors', [
                'type' => 'ssl',
                'target' => 'example.com',
            ])
            ->assertCreated();

        $this->actingAs($operator)
            ->postJson('/api/v1/netprobe/monitors', [
                'type' => 'domain',
                'target' => 'example.net',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('quota');
    }

    public function test_dns_monitor_runner_records_history_and_queues_email_alert(): void
    {
        $this->travelTo(Carbon::parse('2026-06-26 12:00:00 UTC'));
        Mail::fake();
        $this->app->instance(NetProbeDnsResolver::class, new MonitoringFakeDnsResolver([
            'example.com' => [
                'A' => [['type' => 'A', 'ttl' => 120, 'ip' => '93.184.216.34']],
                'AAAA' => [],
            ],
        ]));

        $monitor = NetProbeMonitor::create([
            'user_id' => User::factory()->create()->id,
            'type' => 'dns',
            'target' => 'example.com',
            'target_hash' => hash('sha256', 'example.com'),
            'status' => NetProbeMonitor::STATUS_ACTIVE,
            'quota_plan' => 'free_preview',
            'frequency_minutes' => 60,
            'settings' => [
                'record_types' => ['A'],
                'expected_values' => ['203.0.113.10'],
                'alert_email' => 'ops@example.com',
            ],
            'last_status' => NetProbeMonitor::CHECK_UNKNOWN,
            'next_run_at' => now(),
        ]);

        $check = app(NetProbeMonitorRunner::class)->run($monitor);

        $this->assertSame(NetProbeMonitor::CHECK_FAILED, $check->status);
        $this->assertSame(['203.0.113.10'], $check->response_summary['missing_expected_values']);
        $this->assertDatabaseHas('net_probe_alerts', [
            'monitor_id' => $monitor->id,
            'channel' => 'email',
            'status' => 'queued',
            'severity' => 'critical',
        ]);

        Mail::assertQueued(NetProbeMonitorAlertMail::class);

        $monitor->refresh();
        $this->assertSame(NetProbeMonitor::CHECK_FAILED, $monitor->last_status);
        $this->assertTrue($monitor->next_run_at->greaterThan(now()));
        $this->travelBack();
    }

    public function test_webhook_alert_delivery_is_guarded_and_can_be_enabled(): void
    {
        config(['netprobe.alerts.webhook_delivery_enabled' => true]);
        Http::fake([
            'https://hooks.example.com/*' => Http::response(['ok' => true], 200),
        ]);
        $this->app->instance(NetProbeDnsResolver::class, new MonitoringFakeDnsResolver([
            'example.com' => [
                'A' => [['type' => 'A', 'ttl' => 120, 'ip' => '93.184.216.34']],
                'AAAA' => [],
            ],
            'hooks.example.com' => [
                'A' => [['type' => 'A', 'ttl' => 120, 'ip' => '93.184.216.35']],
                'AAAA' => [],
            ],
        ]));

        $monitor = NetProbeMonitor::create([
            'user_id' => User::factory()->create()->id,
            'type' => 'dns',
            'target' => 'example.com',
            'target_hash' => hash('sha256', 'example.com'),
            'status' => NetProbeMonitor::STATUS_ACTIVE,
            'quota_plan' => 'free_preview',
            'frequency_minutes' => 60,
            'settings' => [
                'record_types' => ['A'],
                'expected_values' => ['203.0.113.10'],
                'webhook_url' => 'https://hooks.example.com/netprobe',
            ],
            'last_status' => NetProbeMonitor::CHECK_UNKNOWN,
            'next_run_at' => now(),
        ]);

        app(NetProbeMonitorRunner::class)->run($monitor);

        Http::assertSentCount(1);
        $this->assertDatabaseHas('net_probe_alerts', [
            'monitor_id' => $monitor->id,
            'channel' => 'webhook',
            'status' => 'sent',
        ]);
    }

    public function test_scheduler_command_dispatches_due_monitors_and_job_has_backoff(): void
    {
        Queue::fake();
        $user = User::factory()->create();
        $due = NetProbeMonitor::create([
            'user_id' => $user->id,
            'type' => 'ssl',
            'target' => 'example.com',
            'target_hash' => hash('sha256', 'example.com'),
            'status' => NetProbeMonitor::STATUS_ACTIVE,
            'quota_plan' => 'free_preview',
            'frequency_minutes' => 60,
            'last_status' => NetProbeMonitor::CHECK_UNKNOWN,
            'next_run_at' => now()->subMinute(),
        ]);
        $notDue = NetProbeMonitor::create([
            'user_id' => $user->id,
            'type' => 'domain',
            'target' => 'example.net',
            'target_hash' => hash('sha256', 'example.net'),
            'status' => NetProbeMonitor::STATUS_ACTIVE,
            'quota_plan' => 'free_preview',
            'frequency_minutes' => 60,
            'last_status' => NetProbeMonitor::CHECK_UNKNOWN,
            'next_run_at' => now()->addHour(),
        ]);

        $this->artisan('netprobe:dispatch-due-monitors --limit=10')
            ->expectsOutput('Dispatched 1 due NetProbe monitor checks.')
            ->assertExitCode(0);

        Queue::assertPushed(RunNetProbeMonitorCheck::class, fn (RunNetProbeMonitorCheck $job): bool => $job->monitorId === $due->id);
        Queue::assertNotPushed(RunNetProbeMonitorCheck::class, fn (RunNetProbeMonitorCheck $job): bool => $job->monitorId === $notDue->id);
        $this->assertSame([60, 300, 900], (new RunNetProbeMonitorCheck($due->id))->backoff());
        $this->assertTrue($due->fresh()->next_run_at->greaterThan(now()));
    }
}

class MonitoringFakeDnsResolver implements NetProbeDnsResolver
{
    /**
     * @param array<string, array<string, array<int, array<string, mixed>>>> $records
     */
    public function __construct(private readonly array $records)
    {
    }

    public function resolve(string $hostname, string $type): array
    {
        return $this->records[strtolower($hostname)][strtoupper($type)] ?? [];
    }
}

class MonitoringFakeRdapClient implements NetProbeRdapClient
{
    /**
     * @param array<string, mixed> $payload
     */
    public function __construct(private readonly array $payload)
    {
    }

    public function lookupDomain(string $domain): array
    {
        return $this->payload;
    }
}

class MonitoringFakeCertificateProbe implements NetProbeCertificateProbe
{
    /**
     * @param array<string, mixed> $payload
     */
    public function __construct(private readonly array $payload)
    {
    }

    public function inspect(string $hostname): array
    {
        return $this->payload;
    }
}
