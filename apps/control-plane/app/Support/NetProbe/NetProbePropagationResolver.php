<?php

namespace App\Support\NetProbe;

interface NetProbePropagationResolver
{
    /**
     * @return array{
     *     provider: string,
     *     mode: string,
     *     snapshots: array<int, array<string, mixed>>,
     *     warnings: string[],
     *     locations_requested: int
     * }
     */
    public function lookup(string $hostname, string $type): array;
}
