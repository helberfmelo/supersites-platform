<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'billing_provider_id',
    'billing_plan_id',
    'site_id',
    'provider',
    'kind',
    'mode',
    'catalog_key',
    'provider_session_id',
    'checkout_url_hash',
    'client_reference_id',
    'amount_minor',
    'currency',
    'status',
    'request_fingerprint',
    'metadata_hash',
])]
class BillingCheckoutSession extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'amount_minor' => 'integer',
        ];
    }

    /**
     * @return BelongsTo<BillingProvider, $this>
     */
    public function billingProvider(): BelongsTo
    {
        return $this->belongsTo(BillingProvider::class);
    }

    /**
     * @return BelongsTo<BillingPlan, $this>
     */
    public function billingPlan(): BelongsTo
    {
        return $this->belongsTo(BillingPlan::class);
    }

    /**
     * @return BelongsTo<Site, $this>
     */
    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }
}
