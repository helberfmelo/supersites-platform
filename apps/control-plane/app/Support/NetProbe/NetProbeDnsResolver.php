<?php

namespace App\Support\NetProbe;

interface NetProbeDnsResolver
{
    /**
     * @return array<int, array<string, mixed>>
     */
    public function resolve(string $hostname, string $type): array;
}
