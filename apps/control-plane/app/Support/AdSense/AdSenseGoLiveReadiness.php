<?php

namespace App\Support\AdSense;

use App\Models\AdSenseAccount;
use App\Models\AdSenseSiteReview;
use Illuminate\Support\Collection;

class AdSenseGoLiveReadiness
{
    public const CONTRACT_VERSION = '2026-06-29.15.1';

    /**
     * @return array<string, mixed>
     */
    public function snapshot(): array
    {
        $account = AdSenseAccount::query()
            ->with(['siteReviews.site:id,slug,name'])
            ->orderBy('id')
            ->first();

        $normalizedPublisherId = $this->normalizePublisherId($account?->publisher_id);
        $accountChecks = $this->accountChecks($account, $normalizedPublisherId);
        $accountReady = $account !== null && ! in_array(false, $accountChecks, true);
        $adsTxtLine = $accountReady ? $this->buildAdsTxtLine($normalizedPublisherId) : null;

        /** @var Collection<int, AdSenseSiteReview> $siteReviews */
        $siteReviews = $account?->siteReviews
            ?? AdSenseSiteReview::query()->with('site:id,slug,name')->orderBy('id')->get();

        $siteSnapshots = $siteReviews
            ->sortBy(fn (AdSenseSiteReview $review): int => (int) $review->id)
            ->values()
            ->map(fn (AdSenseSiteReview $review): array => $this->siteReviewSnapshot(
                $review,
                $accountReady,
                (bool) $account?->ad_serving_enabled,
            ))
            ->all();

        return [
            'meta' => [
                'contract_version' => self::CONTRACT_VERSION,
                'mode' => 'adsense_go_live_readiness',
                'side_effects' => 'none',
                'provider_activation' => false,
            ],
            'data' => [
                'account' => $this->accountSnapshot($account, $normalizedPublisherId, $accountChecks, $accountReady),
                'ads_txt' => [
                    'path' => '/ads.txt',
                    'preview_available' => $adsTxtLine !== null,
                    'preview_line' => $adsTxtLine,
                    'public_file_published' => false,
                    'publishing_mode' => 'manual_after_human_approval',
                    'relationship' => 'DIRECT',
                    'blockers' => $this->failedCheckKeys($accountChecks),
                ],
                'summary' => [
                    'site_reviews' => count($siteSnapshots),
                    'sites_ready_for_human_review' => count(array_filter(
                        $siteSnapshots,
                        fn (array $site): bool => (bool) $site['ready_for_human_review'],
                    )),
                    'sites_serving_ads' => count(array_filter(
                        $siteSnapshots,
                        fn (array $site): bool => (bool) $site['serving_enabled'],
                    )),
                    'automatic_submission_enabled' => false,
                    'automatic_ad_serving_enabled' => false,
                ],
                'sites' => $siteSnapshots,
            ],
        ];
    }

    private function normalizePublisherId(?string $publisherId): ?string
    {
        if ($publisherId === null) {
            return null;
        }

        $normalized = strtolower(trim($publisherId));

        return preg_match('/^ca-pub-\d{16}$/', $normalized) === 1 ? $normalized : null;
    }

    private function buildAdsTxtLine(?string $publisherId): ?string
    {
        if ($publisherId === null) {
            return null;
        }

        $sellerAccountId = preg_replace('/^ca-/', '', $publisherId);

        return "google.com, {$sellerAccountId}, DIRECT, f08c47fec0942fa0";
    }

    /**
     * @return array<string, bool>
     */
    private function accountChecks(?AdSenseAccount $account, ?string $normalizedPublisherId): array
    {
        return [
            'publisher_record_exists' => $account !== null,
            'publisher_id_valid' => $normalizedPublisherId !== null,
            'beneficiary_approved' => $this->statusReady($account?->beneficiary_status),
            'duplicate_account_checked' => $this->statusReady($account?->duplicate_account_status),
            'terms_accepted' => $this->statusReady($account?->terms_status),
            'tax_profile_complete' => $this->statusReady($account?->tax_status),
            'payment_profile_complete' => $this->statusReady($account?->payment_profile_status),
            'bank_verified' => $this->statusReady($account?->bank_status),
            'pin_verified' => $this->statusReady($account?->pin_status),
            'account_approved' => $this->statusReady($account?->account_status),
            'account_ready_flag' => (bool) $account?->account_ready,
        ];
    }

    /**
     * @param array<string, bool> $checks
     * @return array<string, mixed>|null
     */
    private function accountSnapshot(
        ?AdSenseAccount $account,
        ?string $normalizedPublisherId,
        array $checks,
        bool $accountReady,
    ): ?array {
        if ($account === null) {
            return null;
        }

        return [
            'publisher_label' => $account->publisher_label,
            'publisher_id_configured' => $normalizedPublisherId !== null,
            'publisher_id_preview' => $normalizedPublisherId ? $this->maskPublisherId($normalizedPublisherId) : null,
            'account_status' => $account->account_status,
            'account_ready' => $accountReady,
            'management_api_status' => $account->management_api_status,
            'management_api_enabled' => (bool) $account->management_api_enabled,
            'ad_serving_enabled' => (bool) $account->ad_serving_enabled,
            'checks' => $checks,
            'blockers' => $this->failedCheckKeys($checks),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function siteReviewSnapshot(
        AdSenseSiteReview $review,
        bool $accountReady,
        bool $accountServingEnabled,
    ): array {
        $checks = [
            'account_ready' => $accountReady,
            'definitive_domain_ready' => $this->statusReady($review->domain_status),
            'quality_gate_passed' => $this->statusReady($review->quality_gate_status),
            'consent_ready' => $this->statusReady($review->consent_status),
            'policy_review_passed' => $this->statusReady($review->policy_status),
            'public_smoke_passed' => $this->statusReady($review->public_smoke_status),
            'ads_txt_published' => $this->statusReady($review->ads_txt_status),
        ];

        $readyForHumanReview = ! in_array(false, $checks, true);
        $siteApproved = in_array($review->site_review_status, ['approved', 'ready'], true);
        $servingEnabled = $readyForHumanReview
            && $siteApproved
            && $accountServingEnabled
            && (bool) $review->ad_serving_enabled;

        return [
            'site_slug' => $review->site?->slug,
            'site_name' => $review->site?->name,
            'public_url' => $review->public_url,
            'domain_status' => $review->domain_status,
            'site_review_status' => $review->site_review_status,
            'ads_txt_status' => $review->ads_txt_status,
            'quality_gate_status' => $review->quality_gate_status,
            'consent_status' => $review->consent_status,
            'policy_status' => $review->policy_status,
            'public_smoke_status' => $review->public_smoke_status,
            'placements_enabled' => (bool) $review->placements_enabled,
            'auto_ads_enabled' => (bool) $review->auto_ads_enabled,
            'ready_for_human_review' => $readyForHumanReview,
            'should_submit_automatically' => false,
            'serving_enabled' => $servingEnabled,
            'checks' => $checks,
            'blockers' => $this->failedCheckKeys($checks),
        ];
    }

    private function statusReady(?string $status): bool
    {
        return in_array($status, [
            'accepted',
            'approved',
            'checked',
            'complete',
            'completed',
            'configured',
            'passed',
            'published',
            'ready',
            'verified',
        ], true);
    }

    /**
     * @param array<string, bool> $checks
     * @return list<string>
     */
    private function failedCheckKeys(array $checks): array
    {
        return array_values(array_keys(array_filter(
            $checks,
            fn (bool $passed): bool => ! $passed,
        )));
    }

    private function maskPublisherId(string $publisherId): string
    {
        return substr($publisherId, 0, 11).'********'.substr($publisherId, -4);
    }
}
