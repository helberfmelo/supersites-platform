<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Fillable([
    'slug',
    'name',
    'kind',
    'category',
    'launch_order',
    'status',
    'temporary_url',
    'locales',
    'adsense_ready',
])]
class Site extends Model
{
    /** @use HasFactory<\Database\Factories\SiteFactory> */
    use HasFactory;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'adsense_ready' => 'boolean',
            'locales' => 'array',
        ];
    }

    /**
     * @return HasMany<AuditLog, $this>
     */
    public function auditLogs(): HasMany
    {
        return $this->hasMany(AuditLog::class);
    }

    /**
     * @return HasMany<DeploymentRecord, $this>
     */
    public function deploymentRecords(): HasMany
    {
        return $this->hasMany(DeploymentRecord::class);
    }

    /**
     * @return HasMany<Incident, $this>
     */
    public function incidents(): HasMany
    {
        return $this->hasMany(Incident::class);
    }

    /**
     * @return HasMany<OperationalTask, $this>
     */
    public function operationalTasks(): HasMany
    {
        return $this->hasMany(OperationalTask::class);
    }

    /**
     * @return HasMany<AnalyticsEvent, $this>
     */
    public function analyticsEvents(): HasMany
    {
        return $this->hasMany(AnalyticsEvent::class);
    }

    /**
     * @return HasMany<MetricSnapshot, $this>
     */
    public function metricSnapshots(): HasMany
    {
        return $this->hasMany(MetricSnapshot::class);
    }

    /**
     * @return HasOne<GoogleIntegration, $this>
     */
    public function googleIntegration(): HasOne
    {
        return $this->hasOne(GoogleIntegration::class);
    }

    /**
     * @return HasOne<AdSenseSiteReview, $this>
     */
    public function adsenseSiteReview(): HasOne
    {
        return $this->hasOne(AdSenseSiteReview::class);
    }
}
