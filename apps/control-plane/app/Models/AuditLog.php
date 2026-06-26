<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'user_id',
    'site_id',
    'action',
    'auditable_type',
    'auditable_id',
    'metadata',
    'occurred_at',
])]
class AuditLog extends Model
{
    use HasUlids;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'occurred_at' => 'immutable_datetime',
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
     * @param array<string, mixed> $metadata
     */
    public static function record(
        ?User $user,
        string $action,
        ?Site $site = null,
        ?Model $auditable = null,
        array $metadata = [],
    ): self {
        return self::create([
            'user_id' => $user?->id,
            'site_id' => $site?->id,
            'action' => $action,
            'auditable_type' => $auditable ? $auditable::class : null,
            'auditable_id' => $auditable ? (string) $auditable->getKey() : null,
            'metadata' => $metadata,
            'occurred_at' => now(),
        ]);
    }
}
