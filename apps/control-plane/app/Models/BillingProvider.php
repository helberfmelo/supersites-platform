<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'provider',
    'account_status',
    'kyc_status',
    'terms_status',
    'tax_status',
    'payment_profile_status',
    'provider_terms_status',
    'api_key_status',
    'webhook_secret_status',
    'webhook_endpoint_status',
    'checkout_status',
    'webhook_status',
    'account_ready',
    'checkout_enabled',
    'webhooks_enabled',
    'last_validated_at',
])]
class BillingProvider extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'account_ready' => 'boolean',
            'checkout_enabled' => 'boolean',
            'last_validated_at' => 'immutable_datetime',
            'webhooks_enabled' => 'boolean',
        ];
    }

    /**
     * @return HasMany<BillingPlan, $this>
     */
    public function plans(): HasMany
    {
        return $this->hasMany(BillingPlan::class);
    }

    /**
     * @return HasMany<BillingWebhookEvent, $this>
     */
    public function webhookEvents(): HasMany
    {
        return $this->hasMany(BillingWebhookEvent::class);
    }
}
