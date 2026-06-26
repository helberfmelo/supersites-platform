<?php

namespace App\Support\NetProbe;

interface NetProbeTcpProbe
{
    /**
     * @return array{status: string, latency_ms: int|null, error: string|null}
     */
    public function connect(string $address, int $port, float $timeoutSeconds): array;
}
