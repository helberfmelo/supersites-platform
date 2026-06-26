<?php

namespace App\Jobs;

use App\Models\NetProbeMonitor;
use App\Support\NetProbe\Monitoring\NetProbeMonitorRunner;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class RunNetProbeMonitorCheck implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public function __construct(public readonly int $monitorId)
    {
        $this->onQueue('netprobe-monitors');
    }

    /**
     * @return int[]
     */
    public function backoff(): array
    {
        return [60, 300, 900];
    }

    public function handle(NetProbeMonitorRunner $runner): void
    {
        $monitor = NetProbeMonitor::query()
            ->where('status', NetProbeMonitor::STATUS_ACTIVE)
            ->find($this->monitorId);

        if (! $monitor) {
            return;
        }

        $runner->run($monitor);
    }
}
