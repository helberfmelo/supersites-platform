<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QrRouteLink extends Model
{
    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'code',
        'destination_url',
        'destination_hash',
        'status',
        'abuse_status',
        'click_count',
        'last_accessed_at',
        'expires_at',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'click_count' => 'integer',
            'last_accessed_at' => 'datetime',
            'expires_at' => 'datetime',
        ];
    }
}
