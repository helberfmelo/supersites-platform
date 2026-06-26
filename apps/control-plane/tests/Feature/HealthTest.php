<?php

namespace Tests\Feature;

use Tests\TestCase;

class HealthTest extends TestCase
{
    public function test_health_endpoint_returns_app_status(): void
    {
        $response = $this->getJson('/health');

        $response
            ->assertOk()
            ->assertJsonPath('service', 'SuperSites Control Plane')
            ->assertJsonPath('status', 'ok')
            ->assertJsonPath('checks.app.status', 'up');
    }
}
