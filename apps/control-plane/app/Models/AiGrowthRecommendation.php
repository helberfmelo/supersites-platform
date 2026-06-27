<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'ai_growth_audit_id',
    'site_id',
    'category',
    'title',
    'status',
    'impact_score',
    'effort_score',
    'confidence_score',
    'risk_score',
    'priority_score',
    'evidence',
    'recommendation',
    'risk_notes',
    'human_gate_required',
    'automation_enabled',
    'external_ai_used',
])]
class AiGrowthRecommendation extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'impact_score' => 'integer',
            'effort_score' => 'integer',
            'confidence_score' => 'integer',
            'risk_score' => 'integer',
            'priority_score' => 'integer',
            'evidence' => 'array',
            'human_gate_required' => 'boolean',
            'automation_enabled' => 'boolean',
            'external_ai_used' => 'boolean',
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
