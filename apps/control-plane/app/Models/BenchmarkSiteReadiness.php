<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'site_id',
    'benchmark_score',
    'seo_aio_score',
    'adsense_score',
    'monetization_score',
    'frontend_score',
    'performance_score',
    'overall_score',
    'status',
    'data_status',
    'evidence',
    'notes',
    'external_provider_active',
    'real_ads_enabled',
    'real_billing_enabled',
])]
class BenchmarkSiteReadiness extends Model
{
    protected $table = 'benchmark_site_readiness';

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'benchmark_score' => 'integer',
            'seo_aio_score' => 'integer',
            'adsense_score' => 'integer',
            'monetization_score' => 'integer',
            'frontend_score' => 'integer',
            'performance_score' => 'integer',
            'overall_score' => 'integer',
            'evidence' => 'array',
            'external_provider_active' => 'boolean',
            'real_ads_enabled' => 'boolean',
            'real_billing_enabled' => 'boolean',
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
