<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'billing_plan_id',
    'code',
    'value_type',
    'boolean_value',
    'integer_value',
    'string_value',
    'source',
])]
class BillingEntitlement extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'boolean_value' => 'boolean',
            'integer_value' => 'integer',
        ];
    }

    /**
     * @return BelongsTo<BillingPlan, $this>
     */
    public function billingPlan(): BelongsTo
    {
        return $this->belongsTo(BillingPlan::class);
    }
}
