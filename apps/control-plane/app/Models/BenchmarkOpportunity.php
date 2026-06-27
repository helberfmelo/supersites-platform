<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'site_id',
    'category',
    'title',
    'summary',
    'status',
    'priority',
    'impact_score',
    'effort_score',
    'confidence_score',
    'risk_score',
    'priority_score',
    'data_status',
    'evidence',
    'human_gate_required',
    'automation_enabled',
    'external_provider_active',
])]
class BenchmarkOpportunity extends Model
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
            'external_provider_active' => 'boolean',
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
