<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            PortfolioSiteSeeder::class,
            AccessControlSeeder::class,
        ]);

        $user = User::factory()->create([
            'name' => 'SuperSites Owner',
            'email' => 'owner@supersites.local',
        ]);

        $ownerRoleId = Role::query()->where('slug', 'owner')->value('id');

        if ($ownerRoleId) {
            $user->roles()->syncWithoutDetaching([
                $ownerRoleId => ['site_id' => null],
            ]);
        }
    }
}
