<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'ai_growth_audit_id',
    'site_id',
    'metric_key',
    'direction',
    'baseline_value',
    'current_value',
    'threshold_percent',
    'change_percent',
    'status',
    'evidence',
    'causality_status',
    'detected_at',
])]
class AiGrowthAnomaly extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'baseline_value' => 'decimal:4',
            'current_value' => 'decimal:4',
            'threshold_percent' => 'decimal:2',
            'change_percent' => 'decimal:2',
            'evidence' => 'array',
            'detected_at' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<AiGrowthAudit, $this>
     */
    public function aiGrowthAudit(): BelongsTo
    {
        return $this->belongsTo(AiGrowthAudit::class);
    }

    /**
     * @return BelongsTo<Site, $this>
     */
    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }
}
