<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'site_id',
    'environment',
    'workflow',
    'status',
    'reference',
    'commit_sha',
    'summary',
    'started_at',
    'finished_at',
])]
class DeploymentRecord extends Model
{
    /** @use HasFactory<\Database\Factories\DeploymentRecordFactory> */
    use HasFactory;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'finished_at' => 'immutable_datetime',
            'started_at' => 'immutable_datetime',
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
