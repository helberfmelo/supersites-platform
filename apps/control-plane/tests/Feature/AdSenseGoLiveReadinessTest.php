<?php

namespace Tests\Feature;

use App\Models\AdSenseAccount;
use App\Models\AdSenseSiteReview;
use App\Models\AuditLog;
use App\Models\Role;
use App\Models\User;
use Database\Seeders\AccessControlSeeder;
use Database\Seeders\AdSenseReadinessSeeder;
use Database\Seeders\PortfolioSiteSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdSenseGoLiveReadinessTest extends TestCase
{
    use RefreshDatabase;

    public function test_adsense_go_live_readiness_requires_authentication(): void
    {
        $this->getJson('/api/v1/adsense/go-live-readiness')
            ->assertUnauthorized();
    }

    public function test_adsense_go_live_readiness_requires_dashboard_permission(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, AdSenseReadinessSeeder::class]);

        $user = User::factory()->create();

        $this->actingAs($user)
            ->getJson('/api/v1/adsense/go-live-readiness')
            ->assertForbidden();
    }

    public function test_operator_can_view_fail_closed_adsense_readiness(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, AdSenseReadinessSeeder::class]);

        $user = $this->userWithRole('operator');

        $this->actingAs($user)
            ->getJson('/api/v1/adsense/go-live-readiness')
            ->assertOk()
            ->assertJsonPath('meta.mode', 'adsense_go_live_readiness')
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.provider_activation', false)
            ->assertJsonPath('data.account.publisher_label', 'primary-publisher')
            ->assertJsonPath('data.account.publisher_id_configured', false)
            ->assertJsonPath('data.account.account_ready', false)
            ->assertJsonPath('data.ads_txt.preview_available', false)
            ->assertJsonPath('data.ads_txt.preview_line', null)
            ->assertJsonPath('data.ads_txt.public_file_published', false)
            ->assertJsonPath('data.summary.site_reviews', 11)
            ->assertJsonPath('data.summary.sites_ready_for_human_review', 0)
            ->assertJsonPath('data.summary.sites_serving_ads', 0)
            ->assertJsonPath('data.summary.automatic_submission_enabled', false)
            ->assertJsonPath('data.sites.0.site_slug', 'supersite')
            ->assertJsonPath('data.sites.0.ready_for_human_review', false)
            ->assertJsonPath('data.sites.0.serving_enabled', false);

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'api.adsense.go_live_readiness.viewed',
        ]);

        $audit = AuditLog::query()
            ->where('action', 'api.adsense.go_live_readiness.viewed')
            ->firstOrFail();

        $this->assertFalse($audit->metadata['provider_activation']);
        $this->assertFalse($audit->metadata['preview_available']);
    }

    public function test_ads_txt_preview_requires_valid_ready_publisher_account(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, AdSenseReadinessSeeder::class]);

        $account = AdSenseAccount::query()->firstOrFail();
        $account->update($this->readyAccountAttributes([
            'publisher_id' => 'pub-1234567890123456',
        ]));

        $user = $this->userWithRole('operator');

        $this->actingAs($user)
            ->getJson('/api/v1/adsense/go-live-readiness')
            ->assertOk()
            ->assertJsonPath('data.account.publisher_id_configured', false)
            ->assertJsonPath('data.ads_txt.preview_available', false)
            ->assertJsonPath('data.ads_txt.blockers.0', 'publisher_id_valid');

        $account->update(['publisher_id' => 'ca-pub-1234567890123456']);
        AdSenseSiteReview::query()
            ->whereHas('site', fn ($query) => $query->where('slug', 'supersite'))
            ->firstOrFail()
            ->update([
                'domain_status' => 'approved',
                'site_review_status' => 'ready',
                'ads_txt_status' => 'published',
                'quality_gate_status' => 'passed',
                'consent_status' => 'ready',
                'policy_status' => 'approved',
                'public_smoke_status' => 'passed',
                'placements_enabled' => false,
                'auto_ads_enabled' => false,
                'ad_serving_enabled' => false,
            ]);

        $this->actingAs($user)
            ->getJson('/api/v1/adsense/go-live-readiness')
            ->assertOk()
            ->assertJsonPath('data.account.publisher_id_configured', true)
            ->assertJsonPath('data.account.publisher_id_preview', 'ca-pub-1234********3456')
            ->assertJsonPath('data.account.account_ready', true)
            ->assertJsonPath('data.ads_txt.preview_available', true)
            ->assertJsonPath('data.ads_txt.preview_line', 'google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0')
            ->assertJsonPath('data.ads_txt.public_file_published', false)
            ->assertJsonPath('data.summary.sites_ready_for_human_review', 1)
            ->assertJsonPath('data.summary.sites_serving_ads', 0)
            ->assertJsonPath('data.sites.0.ready_for_human_review', true)
            ->assertJsonPath('data.sites.0.should_submit_automatically', false)
            ->assertJsonPath('data.sites.0.serving_enabled', false);
    }

    /**
     * @param array<string, mixed> $overrides
     * @return array<string, mixed>
     */
    private function readyAccountAttributes(array $overrides = []): array
    {
        return [
            'beneficiary_status' => 'approved',
            'duplicate_account_status' => 'checked',
            'terms_status' => 'accepted',
            'tax_status' => 'complete',
            'payment_profile_status' => 'complete',
            'bank_status' => 'verified',
            'pin_status' => 'verified',
            'management_api_status' => 'not_configured',
            'account_status' => 'approved',
            'account_ready' => true,
            'management_api_enabled' => false,
            'ad_serving_enabled' => false,
            ...$overrides,
        ];
    }

    private function userWithRole(string $roleSlug): User
    {
        $user = User::factory()->create();
        $user->roles()->attach(Role::query()->where('slug', $roleSlug)->value('id'), ['site_id' => null]);

        return $user;
    }
}
