<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'site_id',
    'channel',
    'provider',
    'label',
    'account_status',
    'terms_status',
    'tax_status',
    'disclosure_status',
    'privacy_status',
    'policy_status',
    'destination_url_status',
    'webhook_status',
    'human_approval_status',
    'channel_ready',
    'public_enabled',
    'destination_url',
    'notes',
])]
class SupportMonetizationChannel extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'channel_ready' => 'boolean',
            'public_enabled' => 'boolean',
        ];
    }

    /**
     * @return BelongsTo<Site, $this>
     */
    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }
}
