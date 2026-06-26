<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'monitor_id',
    'status',
    'started_at',
    'finished_at',
    'duration_ms',
    'response_summary',
    'error_message',
])]
class NetProbeMonitorCheck extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'started_at' => 'immutable_datetime',
            'finished_at' => 'immutable_datetime',
            'response_summary' => 'array',
        ];
    }

    /**
     * @return BelongsTo<NetProbeMonitor, $this>
     */
    public function monitor(): BelongsTo
    {
        return $this->belongsTo(NetProbeMonitor::class, 'monitor_id');
    }

    /**
     * @return HasMany<NetProbeAlert, $this>
     */
    public function alerts(): HasMany
    {
        return $this->hasMany(NetProbeAlert::class, 'monitor_check_id');
    }
}
