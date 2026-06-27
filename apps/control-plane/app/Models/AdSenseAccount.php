<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'publisher_label',
    'publisher_id',
    'beneficiary_status',
    'duplicate_account_status',
    'terms_status',
    'tax_status',
    'payment_profile_status',
    'bank_status',
    'pin_status',
    'management_api_status',
    'account_status',
    'account_ready',
    'management_api_enabled',
    'ad_serving_enabled',
    'last_validated_at',
])]
class AdSenseAccount extends Model
{
    protected $table = 'adsense_accounts';

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'account_ready' => 'boolean',
            'ad_serving_enabled' => 'boolean',
            'last_validated_at' => 'immutable_datetime',
            'management_api_enabled' => 'boolean',
        ];
    }

    /**
     * @return HasMany<AdSenseSiteReview, $this>
     */
    public function siteReviews(): HasMany
    {
        return $this->hasMany(AdSenseSiteReview::class, 'adsense_account_id');
    }
}
