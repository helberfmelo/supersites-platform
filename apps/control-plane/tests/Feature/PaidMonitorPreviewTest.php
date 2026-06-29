<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\NetProbeMonitor;
use App\Models\Role;
use App\Models\Site;
use App\Models\User;
use Database\Seeders\AccessControlSeeder;
use Database\Seeders\BillingReadinessSeeder;
use Database\Seeders\PortfolioSiteSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PaidMonitorPreviewTest extends TestCase
{
    use RefreshDatabase;

    public function test_monitor_preview_catalog_requires_authentication(): void
    {
        $this->getJson('/api/v1/monitoring/previews')
            ->assertUnauthorized();
    }

    public function test_monitor_preview_catalog_requires_operations_permission(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, BillingReadinessSeeder::class]);

        $user = User::factory()->create();

        $this->actingAs($user)
            ->getJson('/api/v1/monitoring/previews')
            ->assertForbidden();
    }

    public function test_operator_can_view_paid_monitor_preview_catalog(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, BillingReadinessSeeder::class]);

        $this->actingAs($this->userWithRole('operator'))
            ->getJson('/api/v1/monitoring/previews')
            ->assertOk()
            ->assertJsonPath('meta.mode', 'authenticated_preview')
            ->assertJsonPath('meta.real_monitoring_enabled', false)
            ->assertJsonPath('data.0.site_slug', 'netprobe-atlas')
            ->assertJsonPath('data.0.allowed_types.2', 'domain')
            ->assertJsonPath('data.0.quota_source', 'billing_entitlements')
            ->assertJsonPath('data.0.max_monitors', 3)
            ->assertJsonPath('data.0.checkout_enabled', false)
            ->assertJsonPath('data.1.site_slug', 'mailhealth')
            ->assertJsonPath('data.1.allowed_types.2', 'smtp')
            ->assertJsonPath('data.2.site_slug', 'sitepulse-lab')
            ->assertJsonPath('data.2.allowed_types.3', 'sitemap')
            ->assertJsonPath('data.2.worker_enabled', false);
    }

    public function test_operator_can_generate_mailhealth_monitor_preview_without_persistence(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, BillingReadinessSeeder::class]);

        $user = $this->userWithRole('operator');

        $this->actingAs($user)
            ->postJson('/api/v1/monitoring/previews', [
                'site_slug' => 'mailhealth',
                'monitor_type' => 'smtp',
                'target' => 'Example.COM',
                'frequency_minutes' => 15,
            ])
            ->assertAccepted()
            ->assertJsonPath('data.site_slug', 'mailhealth')
            ->assertJsonPath('data.monitor_type', 'smtp')
            ->assertJsonPath('data.target_preview', 'example.com')
            ->assertJsonPath('data.frequency_minutes', 60)
            ->assertJsonPath('data.persisted', false)
            ->assertJsonPath('data.queued', false)
            ->assertJsonPath('data.worker_enabled', false)
            ->assertJsonPath('data.alert_delivery_enabled', false)
            ->assertJsonPath('meta.quota_source', 'billing_entitlements')
            ->assertJsonPath('meta.side_effects', 'audit_hash_only');

        $this->assertDatabaseCount('net_probe_monitors', 0);
        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'api.monitoring.preview.generated',
        ]);

        $audit = AuditLog::query()->where('action', 'api.monitoring.preview.generated')->firstOrFail();
        $this->assertSame('mailhealth', $audit->metadata['site_slug']);
        $this->assertArrayHasKey('target_hash', $audit->metadata);
        $this->assertFalse($audit->metadata['persisted']);
    }

    public function test_sitepulse_monitor_preview_normalizes_public_url_and_rejects_query_strings(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, BillingReadinessSeeder::class]);

        $user = $this->userWithRole('operator');

        $this->actingAs($user)
            ->postJson('/api/v1/monitoring/previews', [
                'site_slug' => 'sitepulse-lab',
                'monitor_type' => 'headers',
                'target' => 'example.com/about',
            ])
            ->assertAccepted()
            ->assertJsonPath('data.target_kind', 'url')
            ->assertJsonPath('data.target_preview', 'https://example.com/about')
            ->assertJsonPath('data.history_retention_days', 0);

        $this->actingAs($user)
            ->postJson('/api/v1/monitoring/previews', [
                'site_slug' => 'sitepulse-lab',
                'monitor_type' => 'headers',
                'target' => 'https://example.com/about?token=abc',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('target');
    }

    public function test_monitor_preview_rejects_types_outside_plan_and_exhausted_quota(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, BillingReadinessSeeder::class]);

        $user = $this->userWithRole('operator');

        $this->actingAs($user)
            ->postJson('/api/v1/monitoring/previews', [
                'site_slug' => 'mailhealth',
                'monitor_type' => 'ssl',
                'target' => 'example.com',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('monitor_type');

        $site = Site::query()->where('slug', 'netprobe-atlas')->firstOrFail();

        foreach (range(1, 3) as $index) {
            NetProbeMonitor::query()->create([
                'user_id' => $user->id,
                'site_id' => $site->id,
                'type' => NetProbeMonitor::TYPE_DNS,
                'label' => 'Preview quota '.$index,
                'target' => "example{$index}.com",
                'target_hash' => hash('sha256', "example{$index}.com"),
                'status' => NetProbeMonitor::STATUS_ACTIVE,
                'quota_plan' => 'free_preview',
                'frequency_minutes' => 60,
                'settings' => [],
                'last_status' => NetProbeMonitor::CHECK_UNKNOWN,
                'next_run_at' => now()->addHour(),
            ]);
        }

        $this->actingAs($user)
            ->postJson('/api/v1/monitoring/previews', [
                'site_slug' => 'netprobe-atlas',
                'monitor_type' => 'dns',
                'target' => 'example.com',
            ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('quota');
    }

    private function userWithRole(string $roleSlug): User
    {
        $user = User::factory()->create();
        $user->roles()->attach(Role::query()->where('slug', $roleSlug)->value('id'), ['site_id' => null]);

        return $user;
    }
}
