<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'site_id',
    'adsense_account_id',
    'public_url',
    'domain_status',
    'site_review_status',
    'ads_txt_status',
    'quality_gate_status',
    'consent_status',
    'policy_status',
    'public_smoke_status',
    'placements_enabled',
    'auto_ads_enabled',
    'ad_serving_enabled',
    'site_added_at',
    'last_validated_at',
])]
class AdSenseSiteReview extends Model
{
    protected $table = 'adsense_site_reviews';

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'ad_serving_enabled' => 'boolean',
            'auto_ads_enabled' => 'boolean',
            'last_validated_at' => 'immutable_datetime',
            'placements_enabled' => 'boolean',
            'site_added_at' => 'immutable_datetime',
        ];
    }

    /**
     * @return BelongsTo<AdSenseAccount, $this>
     */
    public function adsenseAccount(): BelongsTo
    {
        return $this->belongsTo(AdSenseAccount::class, 'adsense_account_id');
    }

    /**
     * @return BelongsTo<Site, $this>
     */
    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }
}
