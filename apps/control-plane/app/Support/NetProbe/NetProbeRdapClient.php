<?php

namespace App\Support\NetProbe;

interface NetProbeRdapClient
{
    /**
     * @return array<string, mixed>
     */
    public function lookupDomain(string $domain): array;
}
