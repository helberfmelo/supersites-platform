<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'executive_report_id',
    'site_id',
    'section',
    'label',
    'value',
    'unit',
    'data_status',
    'source',
    'evidence',
    'notes',
    'sort_order',
])]
class ExecutiveReportItem extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'evidence' => 'array',
            'sort_order' => 'integer',
        ];
    }

    /**
     * @return BelongsTo<ExecutiveReport, $this>
     */
    public function executiveReport(): BelongsTo
    {
        return $this->belongsTo(ExecutiveReport::class);
    }

    /**
     * @return BelongsTo<Site, $this>
     */
    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }
}
