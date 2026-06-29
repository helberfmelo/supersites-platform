<?php

namespace App\Support\Monetization;

use App\Models\SupportMonetizationChannel;

class SupportMonetizationGoLiveReadiness
{
    public const CONTRACT_VERSION = '2026-06-29.15.4';

    /**
     * @var list<string>
     */
    private array $supportedChannels = ['donation', 'affiliate'];

    /**
     * @return array<string, mixed>
     */
    public function snapshot(): array
    {
        $channels = SupportMonetizationChannel::query()
            ->with('site:id,slug,name,kind')
            ->orderBy('id')
            ->get()
            ->map(fn (SupportMonetizationChannel $channel): array => $this->channelSnapshot($channel))
            ->all();

        return [
            'meta' => [
                'contract_version' => self::CONTRACT_VERSION,
                'mode' => 'support_monetization_go_live_readiness',
                'side_effects' => 'none',
                'provider_activation' => false,
            ],
            'data' => [
                'summary' => [
                    'channels' => count($channels),
                    'donation_channels' => count(array_filter($channels, fn (array $channel): bool => $channel['channel'] === 'donation')),
                    'affiliate_channels' => count(array_filter($channels, fn (array $channel): bool => $channel['channel'] === 'affiliate')),
                    'channels_ready_for_human_activation' => count(array_filter(
                        $channels,
                        fn (array $channel): bool => (bool) $channel['ready_for_human_activation'],
                    )),
                    'public_links_enabled' => 0,
                    'real_donation_payments_enabled' => 0,
                    'real_affiliate_links_enabled' => 0,
                    'widgets_loaded' => 0,
                    'webhooks_enabled' => 0,
                    'automatic_publication_enabled' => false,
                ],
                'channels' => $channels,
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function channelSnapshot(SupportMonetizationChannel $channel): array
    {
        $destinationUrl = $this->sanitizeDestinationUrl($channel->destination_url);
        $checks = [
            'site_configured' => $channel->site !== null,
            'channel_supported' => in_array($channel->channel, $this->supportedChannels, true),
            'account_approved' => $this->statusReady($channel->account_status),
            'terms_accepted' => $this->statusReady($channel->terms_status),
            'tax_profile_complete' => $this->statusReady($channel->tax_status),
            'disclosure_approved' => $this->statusReady($channel->disclosure_status),
            'privacy_copy_approved' => $this->statusReady($channel->privacy_status),
            'policy_review_passed' => $this->statusReady($channel->policy_status),
            'destination_url_configured' => $destinationUrl !== null && $this->statusReady($channel->destination_url_status),
            'human_approval_recorded' => $this->statusReady($channel->human_approval_status),
            'channel_ready_flag' => (bool) $channel->channel_ready,
            'public_feature_flag_enabled' => (bool) $channel->public_enabled,
        ];

        $readyForHumanActivation = ! in_array(false, $checks, true);

        return [
            'site_slug' => $channel->site?->slug,
            'site_name' => $channel->site?->name,
            'site_kind' => $channel->site?->kind,
            'channel' => $channel->channel,
            'provider' => $channel->provider,
            'label' => $channel->label,
            'account_status' => $channel->account_status,
            'terms_status' => $channel->terms_status,
            'tax_status' => $channel->tax_status,
            'disclosure_status' => $channel->disclosure_status,
            'privacy_status' => $channel->privacy_status,
            'policy_status' => $channel->policy_status,
            'destination_url_status' => $channel->destination_url_status,
            'webhook_status' => $channel->webhook_status,
            'human_approval_status' => $channel->human_approval_status,
            'destination_url_configured' => $destinationUrl !== null,
            'destination_url_preview' => $destinationUrl,
            'channel_ready_in_seed' => (bool) $channel->channel_ready,
            'public_enabled_in_seed' => (bool) $channel->public_enabled,
            'ready_for_human_activation' => $readyForHumanActivation,
            'should_publish_link' => false,
            'should_load_widget' => false,
            'should_enable_webhook' => false,
            'should_track_affiliate' => false,
            'checks' => $checks,
            'blockers' => $this->failedCheckKeys($checks),
        ];
    }

    private function sanitizeDestinationUrl(?string $value): ?string
    {
        if ($value === null || trim($value) === '') {
            return null;
        }

        $parts = parse_url(trim($value));

        if (! is_array($parts) || ($parts['scheme'] ?? null) !== 'https' || empty($parts['host'])) {
            return null;
        }

        $path = isset($parts['path']) ? $parts['path'] : '/';

        return 'https://'.$parts['host'].$path;
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
            'enabled',
            'passed',
            'published',
            'ready',
            'reviewed',
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
}
