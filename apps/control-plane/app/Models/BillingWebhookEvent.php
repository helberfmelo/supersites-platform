<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'billing_provider_id',
    'provider',
    'external_event_id',
    'event_type',
    'signature_status',
    'processing_status',
    'idempotency_key',
    'payload_hash',
    'received_at',
    'processed_at',
])]
class BillingWebhookEvent extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'processed_at' => 'immutable_datetime',
            'received_at' => 'immutable_datetime',
        ];
    }

    /**
     * @return BelongsTo<BillingProvider, $this>
     */
    public function billingProvider(): BelongsTo
    {
        return $this->belongsTo(BillingProvider::class);
    }
}
