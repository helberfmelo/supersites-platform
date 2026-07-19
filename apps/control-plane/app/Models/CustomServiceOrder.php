<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'site_id',
    'reference',
    'service_slug',
    'status',
    'title',
    'scope_summary',
    'amount_minor',
    'currency',
    'payment_status',
    'requested_at',
    'completed_at',
])]
class CustomServiceOrder extends Model
{
    protected function casts(): array
    {
        return [
            'amount_minor' => 'integer',
            'requested_at' => 'immutable_datetime',
            'completed_at' => 'immutable_datetime',
        ];
    }

    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }
}
