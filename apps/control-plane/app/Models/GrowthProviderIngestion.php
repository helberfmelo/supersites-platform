<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GrowthProviderIngestion extends Model
{
    protected $fillable = [
        'site_id',
        'source',
        'provider_label',
        'access_status',
        'token_status',
        'quota_status',
        'data_contract_status',
        'retention_status',
        'import_status',
        'data_status',
        'import_enabled',
        'last_successful_import_at',
        'latest_snapshot_at',
        'latest_error_code',
        'evidence',
        'notes',
    ];

    protected $casts = [
        'evidence' => 'array',
        'import_enabled' => 'boolean',
        'last_successful_import_at' => 'datetime',
        'latest_snapshot_at' => 'datetime',
    ];

    /**
     * @return BelongsTo<Site, $this>
     */
    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }
}
