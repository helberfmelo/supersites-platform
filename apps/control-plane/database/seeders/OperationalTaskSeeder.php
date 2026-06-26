<?php

namespace Database\Seeders;

use App\Models\OperationalTask;
use App\Models\Site;
use Illuminate\Database\Seeder;

class OperationalTaskSeeder extends Seeder
{
    public function run(): void
    {
        $supersiteId = Site::query()->where('slug', 'supersite')->value('id');

        $tasks = [
            [
                'site_id' => $supersiteId,
                'title' => 'Implement real catalog deploy with rollback',
                'priority' => 'high',
                'status' => 'open',
                'source' => 'roadmap',
                'summary' => 'Sprint 1.7 must package the Nuxt catalog, preserve remote configuration, publish safely and run public smoke.',
            ],
            [
                'site_id' => $supersiteId,
                'title' => 'Decide direct root URL mapping',
                'priority' => 'high',
                'status' => 'open',
                'source' => 'architecture',
                'summary' => 'Choose rewrite, alias, symlink or document-root strategy for opentshost.com without disturbing current public_html content.',
            ],
            [
                'site_id' => null,
                'title' => 'Resolve main branch protection path',
                'priority' => 'medium',
                'status' => 'blocked',
                'source' => 'human_action_required',
                'summary' => 'Private branch protection is blocked by the current GitHub plan; continue with monitored Quality Gate runs until the plan or repository visibility changes.',
            ],
        ];

        foreach ($tasks as $task) {
            OperationalTask::updateOrCreate(
                ['title' => $task['title']],
                $task,
            );
        }
    }
}
