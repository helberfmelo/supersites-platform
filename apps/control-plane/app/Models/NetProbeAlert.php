<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'monitor_id',
    'monitor_check_id',
    'channel',
    'destination_hash',
    'status',
    'severity',
    'triggered_at',
    'sent_at',
    'error_message',
    'payload',
])]
class NetProbeAlert extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'triggered_at' => 'immutable_datetime',
            'sent_at' => 'immutable_datetime',
            'payload' => 'array',
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
     * @return BelongsTo<NetProbeMonitorCheck, $this>
     */
    public function check(): BelongsTo
    {
        return $this->belongsTo(NetProbeMonitorCheck::class, 'monitor_check_id');
    }
}
