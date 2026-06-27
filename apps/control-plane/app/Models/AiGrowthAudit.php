<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'site_id',
    'audit_type',
    'status',
    'source',
    'evidence_summary',
    'started_at',
    'completed_at',
])]
class AiGrowthAudit extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'evidence_summary' => 'array',
            'started_at' => 'datetime',
            'completed_at' => 'datetime',
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
     * @return HasMany<AiGrowthRecommendation, $this>
     */
    public function recommendations(): HasMany
    {
        return $this->hasMany(AiGrowthRecommendation::class);
    }

    /**
     * @return HasMany<AiGrowthAnomaly, $this>
     */
    public function anomalies(): HasMany
    {
        return $this->hasMany(AiGrowthAnomaly::class);
    }
}
