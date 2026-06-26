<?php

namespace App\Support\NetProbe;

interface NetProbeCertificateProbe
{
    /**
     * @return array<string, mixed>
     */
    public function inspect(string $hostname): array;
}
