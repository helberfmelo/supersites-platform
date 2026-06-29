<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'user_id',
    'request_type',
    'status',
    'metadata',
    'requested_at',
    'completed_at',
])]
class UserAccountPrivacyRequest extends Model
{
    public const TYPE_EXPORT = 'export';

    public const TYPE_DELETE = 'delete';

    public const STATUS_READY = 'ready';

    public const STATUS_HUMAN_REQUIRED = 'human_required';

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'requested_at' => 'immutable_datetime',
            'completed_at' => 'immutable_datetime',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
