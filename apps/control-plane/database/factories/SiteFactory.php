<?php

namespace Database\Factories;

use App\Models\Site;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Site>
 */
class SiteFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->words(2, true);
        $slug = str($name)->slug()->toString();

        return [
            'slug' => $slug,
            'name' => str($name)->title()->toString(),
            'kind' => 'utility',
            'category' => 'testing',
            'launch_order' => fake()->numberBetween(1, 99),
            'status' => 'planned',
            'temporary_url' => "https://opentshost.com/supersites/{$slug}/",
            'locales' => ['en', 'pt-br', 'es', 'fr', 'de'],
            'adsense_ready' => false,
        ];
    }
}
