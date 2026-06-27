<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'ulid',
    'period_type',
    'period_start',
    'period_end',
    'title',
    'status',
    'contract_version',
    'data_status_summary',
    'causality_status',
    'generated_at',
    'source',
    'notes',
    'export_ready',
])]
class ExecutiveReport extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'period_start' => 'date',
            'period_end' => 'date',
            'data_status_summary' => 'array',
            'generated_at' => 'datetime',
            'export_ready' => 'boolean',
        ];
    }

    /**
     * @return HasMany<ExecutiveReportItem, $this>
     */
    public function items(): HasMany
    {
        return $this->hasMany(ExecutiveReportItem::class)->orderBy('sort_order')->orderBy('id');
    }
}
