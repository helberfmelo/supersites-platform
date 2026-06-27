<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'site_id',
    'billing_provider_id',
    'slug',
    'name',
    'kind',
    'amount_minor',
    'currency',
    'interval',
    'provider_price_reference',
    'status',
    'checkout_enabled',
    'entitlements_summary',
    'notes',
])]
class BillingPlan extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'amount_minor' => 'integer',
            'checkout_enabled' => 'boolean',
            'entitlements_summary' => 'array',
        ];
    }

    /**
     * @return BelongsTo<Site, $this>
     */
    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }

    /**
     * @return BelongsTo<BillingProvider, $this>
     */
    public function billingProvider(): BelongsTo
    {
        return $this->belongsTo(BillingProvider::class);
    }

    /**
     * @return HasMany<BillingEntitlement, $this>
     */
    public function entitlements(): HasMany
    {
        return $this->hasMany(BillingEntitlement::class);
    }
}
