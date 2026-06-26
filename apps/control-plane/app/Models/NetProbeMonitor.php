<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable([
    'user_id',
    'site_id',
    'type',
    'label',
    'target',
    'target_hash',
    'status',
    'quota_plan',
    'frequency_minutes',
    'settings',
    'last_status',
    'last_checked_at',
    'next_run_at',
])]
class NetProbeMonitor extends Model
{
    public const TYPE_DNS = 'dns';
    public const TYPE_SSL = 'ssl';
    public const TYPE_DOMAIN = 'domain';

    public const STATUS_ACTIVE = 'active';
    public const STATUS_PAUSED = 'paused';

    public const CHECK_UNKNOWN = 'unknown';
    public const CHECK_OK = 'ok';
    public const CHECK_WARNING = 'warning';
    public const CHECK_FAILED = 'failed';

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'settings' => 'array',
            'last_checked_at' => 'immutable_datetime',
            'next_run_at' => 'immutable_datetime',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsTo<Site, $this>
     */
    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
    }

    /**
     * @return HasMany<NetProbeMonitorCheck, $this>
     */
    public function checks(): HasMany
    {
        return $this->hasMany(NetProbeMonitorCheck::class, 'monitor_id');
    }

    /**
     * @return HasOne<NetProbeMonitorCheck, $this>
     */
    public function latestCheck(): HasOne
    {
        return $this->hasOne(NetProbeMonitorCheck::class, 'monitor_id')->latestOfMany('started_at');
    }

    /**
     * @return HasMany<NetProbeAlert, $this>
     */
    public function alerts(): HasMany
    {
        return $this->hasMany(NetProbeAlert::class, 'monitor_id');
    }

    /**
     * @return string[]
     */
    public static function allowedTypes(): array
    {
        return [self::TYPE_DNS, self::TYPE_SSL, self::TYPE_DOMAIN];
    }
}
