<?php

namespace Database\Seeders;

use App\Models\DeploymentRecord;
use Illuminate\Database\Seeder;

class DeploymentRecordSeeder extends Seeder
{
    public function run(): void
    {
        $records = [
            [
                'environment' => 'ci',
                'workflow' => 'Quality Gate',
                'status' => 'success',
                'reference' => '28235256988',
                'commit_sha' => '3e1889f',
                'summary' => 'Sprint 1.4 API foundation validated repository safety, backend, shared packages, Nuxt preview and Playwright.',
            ],
            [
                'environment' => 'dry-run',
                'workflow' => 'Deploy Dry Run',
                'status' => 'success',
                'reference' => '28235257018',
                'commit_sha' => '3e1889f',
                'summary' => 'Non-mutating deploy plan completed for the Sprint 1.4 API foundation.',
            ],
        ];

        foreach ($records as $record) {
            DeploymentRecord::updateOrCreate(
                ['workflow' => $record['workflow'], 'reference' => $record['reference']],
                [
                    ...$record,
                    'started_at' => now()->subHours(2),
                    'finished_at' => now()->subHours(2)->addMinutes(2),
                ],
            );
        }
    }
}
