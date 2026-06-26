<?php

namespace App\Console\Commands;

use App\Jobs\RunNetProbeMonitorCheck;
use App\Models\NetProbeMonitor;
use Illuminate\Console\Command;

class DispatchDueNetProbeMonitorChecks extends Command
{
    protected $signature = 'netprobe:dispatch-due-monitors {--limit= : Maximum due monitors to dispatch}';

    protected $description = 'Dispatch queued checks for active NetProbe monitors that are due.';

    public function handle(): int
    {
        $limit = max(1, min(500, (int) ($this->option('limit') ?: config('netprobe.monitoring.due_dispatch_limit', 50))));
        $now = now();

        $monitors = NetProbeMonitor::query()
            ->where('status', NetProbeMonitor::STATUS_ACTIVE)
            ->where(function ($query) use ($now): void {
                $query->whereNull('next_run_at')->orWhere('next_run_at', '<=', $now);
            })
            ->orderByRaw('next_run_at is null desc')
            ->orderBy('next_run_at')
            ->limit($limit)
            ->get();

        foreach ($monitors as $monitor) {
            $monitor->forceFill([
                'next_run_at' => $now->copy()->addMinutes($monitor->frequency_minutes),
            ])->save();

            RunNetProbeMonitorCheck::dispatch($monitor->id);
        }

        $this->info('Dispatched '.$monitors->count().' due NetProbe monitor checks.');

        return self::SUCCESS;
    }
}
