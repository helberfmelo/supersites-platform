<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'site_id',
    'domain_mode',
    'domain_property',
    'ga4_property_id',
    'ga4_measurement_id',
    'gtm_container_id',
    'search_console_property',
    'access_status',
    'ga4_status',
    'gtm_status',
    'search_console_status',
    'tags_enabled',
    'data_import_enabled',
    'allowed_events',
    'last_validated_at',
])]
class GoogleIntegration extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'allowed_events' => 'array',
            'data_import_enabled' => 'boolean',
            'last_validated_at' => 'immutable_datetime',
            'tags_enabled' => 'boolean',
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
