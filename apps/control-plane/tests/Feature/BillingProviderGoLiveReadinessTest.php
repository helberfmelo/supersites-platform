<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\BillingPlan;
use App\Models\BillingProvider;
use App\Models\Role;
use App\Models\Site;
use App\Models\User;
use Database\Seeders\AccessControlSeeder;
use Database\Seeders\BillingReadinessSeeder;
use Database\Seeders\PortfolioSiteSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BillingProviderGoLiveReadinessTest extends TestCase
{
    use RefreshDatabase;

    public function test_billing_go_live_readiness_requires_authentication(): void
    {
        $this->getJson('/api/v1/billing/go-live-readiness')
            ->assertUnauthorized();
    }

    public function test_billing_go_live_readiness_requires_dashboard_permission(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, BillingReadinessSeeder::class]);

        $user = User::factory()->create();

        $this->actingAs($user)
            ->getJson('/api/v1/billing/go-live-readiness')
            ->assertForbidden();
    }

    public function test_operator_can_view_fail_closed_billing_readiness(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, BillingReadinessSeeder::class]);

        $user = $this->userWithRole('operator');

        $this->actingAs($user)
            ->getJson('/api/v1/billing/go-live-readiness')
            ->assertOk()
            ->assertJsonPath('meta.mode', 'billing_provider_go_live_readiness')
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.provider_activation', false)
            ->assertJsonPath('data.summary.providers', 3)
            ->assertJsonPath('data.summary.providers_ready_for_human_activation', 0)
            ->assertJsonPath('data.summary.paid_plans', 0)
            ->assertJsonPath('data.summary.paid_plans_ready_for_human_activation', 0)
            ->assertJsonPath('data.summary.checkout_sessions_enabled', 0)
            ->assertJsonPath('data.summary.live_webhooks_enabled', 0)
            ->assertJsonPath('data.summary.provider_sdk_loaded', 0)
            ->assertJsonPath('data.summary.revenue_import_enabled', 0)
            ->assertJsonPath('data.summary.automatic_checkout_enabled', false)
            ->assertJsonPath('data.summary.automatic_webhook_processing_enabled', false)
            ->assertJsonPath('data.providers.0.provider', 'stripe')
            ->assertJsonPath('data.providers.0.ready_for_human_activation', false)
            ->assertJsonPath('data.providers.0.should_create_checkout_session', false)
            ->assertJsonPath('data.providers.0.should_process_live_webhooks', false)
            ->assertJsonPath('data.providers.0.should_import_revenue', false);

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'api.billing.go_live_readiness.viewed',
        ]);

        $audit = AuditLog::query()
            ->where('action', 'api.billing.go_live_readiness.viewed')
            ->firstOrFail();

        $this->assertFalse($audit->metadata['provider_activation']);
        $this->assertSame(0, $audit->metadata['checkout_sessions_enabled']);
        $this->assertSame(0, $audit->metadata['live_webhooks_enabled']);
    }

    public function test_ready_provider_and_paid_plan_still_do_not_activate_checkout_or_webhooks(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, BillingReadinessSeeder::class]);

        $provider = BillingProvider::query()->where('provider', 'stripe')->firstOrFail();
        $provider->update([
            'account_status' => 'approved',
            'kyc_status' => 'approved',
            'terms_status' => 'accepted',
            'tax_status' => 'complete',
            'payment_profile_status' => 'complete',
            'provider_terms_status' => 'reviewed',
            'api_key_status' => 'configured',
            'webhook_secret_status' => 'configured',
            'webhook_endpoint_status' => 'approved',
            'checkout_status' => 'ready',
            'webhook_status' => 'ready',
            'account_ready' => true,
            'checkout_enabled' => true,
            'webhooks_enabled' => true,
        ]);

        BillingPlan::query()->create([
            'site_id' => Site::query()->where('slug', 'netprobe-atlas')->value('id'),
            'billing_provider_id' => $provider->id,
            'slug' => 'monitoring-pro',
            'name' => 'Monitoring Pro',
            'kind' => 'subscription',
            'amount_minor' => 1900,
            'currency' => 'USD',
            'interval' => 'month',
            'provider_price_reference' => 'price_monitoring_pro',
            'status' => 'ready',
            'checkout_enabled' => true,
            'entitlements_summary' => ['monitor_slots' => 25],
            'notes' => 'Test-only ready mapping; go-live service remains fail-closed.',
        ]);

        $response = $this->actingAs($this->userWithRole('operator'))
            ->getJson('/api/v1/billing/go-live-readiness')
            ->assertOk()
            ->assertJsonPath('data.summary.providers_ready_for_human_activation', 1)
            ->assertJsonPath('data.summary.paid_plans', 1)
            ->assertJsonPath('data.summary.paid_plans_ready_for_human_activation', 1)
            ->assertJsonPath('data.summary.checkout_sessions_enabled', 0)
            ->assertJsonPath('data.summary.live_webhooks_enabled', 0)
            ->assertJsonPath('data.summary.revenue_import_enabled', 0)
            ->assertJsonPath('data.providers.0.ready_for_human_activation', true)
            ->assertJsonPath('data.providers.0.checkout_enabled_in_seed', true)
            ->assertJsonPath('data.providers.0.webhooks_enabled_in_seed', true)
            ->assertJsonPath('data.providers.0.should_create_checkout_session', false)
            ->assertJsonPath('data.providers.0.should_process_live_webhooks', false)
            ->assertJsonPath('data.providers.0.should_import_revenue', false);

        $plan = collect($response->json('data.plans'))
            ->firstWhere('plan_slug', 'monitoring-pro');

        $this->assertIsArray($plan);
        $this->assertSame('monitoring-pro', $plan['plan_slug']);
        $this->assertTrue($plan['ready_for_human_activation']);
        $this->assertSame('price_***_pro', $plan['provider_price_reference_preview']);
        $this->assertFalse($plan['should_expose_checkout']);
        $this->assertFalse($plan['should_create_checkout_session']);
    }

    private function userWithRole(string $roleSlug): User
    {
        $user = User::factory()->create();
        $user->roles()->attach(Role::query()->where('slug', $roleSlug)->value('id'), ['site_id' => null]);

        return $user;
    }
}
