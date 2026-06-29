<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\GoogleIntegration;
use App\Models\Role;
use App\Models\User;
use Database\Seeders\AccessControlSeeder;
use Database\Seeders\GoogleIntegrationSeeder;
use Database\Seeders\PortfolioSiteSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GoogleProviderGoLiveReadinessTest extends TestCase
{
    use RefreshDatabase;

    public function test_google_go_live_readiness_requires_authentication(): void
    {
        $this->getJson('/api/v1/google/go-live-readiness')
            ->assertUnauthorized();
    }

    public function test_google_go_live_readiness_requires_dashboard_permission(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, GoogleIntegrationSeeder::class]);

        $user = User::factory()->create();

        $this->actingAs($user)
            ->getJson('/api/v1/google/go-live-readiness')
            ->assertForbidden();
    }

    public function test_operator_can_view_fail_closed_google_readiness(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, GoogleIntegrationSeeder::class]);

        $user = $this->userWithRole('operator');

        $this->actingAs($user)
            ->getJson('/api/v1/google/go-live-readiness')
            ->assertOk()
            ->assertJsonPath('meta.mode', 'google_provider_go_live_readiness')
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.provider_activation', false)
            ->assertJsonPath('data.summary.integrations', 12)
            ->assertJsonPath('data.summary.sites_ready_for_human_activation', 0)
            ->assertJsonPath('data.summary.sites_loading_ga4', 0)
            ->assertJsonPath('data.summary.sites_loading_gtm', 0)
            ->assertJsonPath('data.summary.sites_importing_search_console', 0)
            ->assertJsonPath('data.summary.automatic_tag_injection_enabled', false)
            ->assertJsonPath('data.summary.automatic_data_import_enabled', false)
            ->assertJsonPath('data.sites.0.site_slug', 'supersite')
            ->assertJsonPath('data.sites.0.ready_for_human_activation', false)
            ->assertJsonPath('data.sites.0.should_load_ga4', false)
            ->assertJsonPath('data.sites.0.should_load_gtm', false)
            ->assertJsonPath('data.sites.0.should_import_search_console', false)
            ->assertJsonPath('data.sites.0.checks.event_contract_safe', true);

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'api.google.go_live_readiness.viewed',
        ]);

        $audit = AuditLog::query()
            ->where('action', 'api.google.go_live_readiness.viewed')
            ->firstOrFail();

        $this->assertFalse($audit->metadata['provider_activation']);
        $this->assertSame(0, $audit->metadata['sites_loading_ga4']);
    }

    public function test_valid_google_configuration_is_ready_for_human_activation_without_loading_tags(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, GoogleIntegrationSeeder::class]);

        GoogleIntegration::query()
            ->whereHas('site', fn ($query) => $query->where('slug', 'supersite'))
            ->firstOrFail()
            ->update([
                'domain_mode' => 'approved',
                'domain_property' => 'sc-domain:opentshost.com',
                'ga4_property_id' => 'properties/123456789',
                'ga4_measurement_id' => 'g-abc123xyz',
                'gtm_container_id' => 'gtm-test123',
                'search_console_property' => 'sc-domain:opentshost.com',
                'access_status' => 'approved',
                'ga4_status' => 'configured',
                'gtm_status' => 'configured',
                'search_console_status' => 'verified',
                'tags_enabled' => true,
                'data_import_enabled' => true,
            ]);

        $this->actingAs($this->userWithRole('operator'))
            ->getJson('/api/v1/google/go-live-readiness')
            ->assertOk()
            ->assertJsonPath('data.summary.sites_ready_for_human_activation', 1)
            ->assertJsonPath('data.summary.sites_loading_ga4', 0)
            ->assertJsonPath('data.summary.sites_loading_gtm', 0)
            ->assertJsonPath('data.summary.sites_importing_search_console', 0)
            ->assertJsonPath('data.sites.0.ready_for_human_activation', true)
            ->assertJsonPath('data.sites.0.ga4_measurement_id_configured', true)
            ->assertJsonPath('data.sites.0.ga4_measurement_id_preview', 'G-ABC***3XYZ')
            ->assertJsonPath('data.sites.0.gtm_container_id_configured', true)
            ->assertJsonPath('data.sites.0.gtm_container_id_preview', 'GTM-T***T123')
            ->assertJsonPath('data.sites.0.should_load_ga4', false)
            ->assertJsonPath('data.sites.0.should_load_gtm', false)
            ->assertJsonPath('data.sites.0.should_import_search_console', false);
    }

    private function userWithRole(string $roleSlug): User
    {
        $user = User::factory()->create();
        $user->roles()->attach(Role::query()->where('slug', $roleSlug)->value('id'), ['site_id' => null]);

        return $user;
    }
}
