<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class AccessControlSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'dashboard.view' => 'View the control plane dashboard',
            'sites.view' => 'View portfolio sites',
            'sites.manage' => 'Manage portfolio sites',
            'users.manage' => 'Manage control plane users',
            'audit.view' => 'View audit logs',
            'deployments.view' => 'View deployment records',
            'operations.manage' => 'Manage operational tasks and incidents',
        ];

        foreach ($permissions as $slug => $name) {
            Permission::updateOrCreate(['slug' => $slug], ['name' => $name]);
        }

        $roles = [
            'owner' => ['Owner', 'Full portfolio access for the project owner.', array_keys($permissions)],
            'operator' => ['Operator', 'Operational access for site status, deployments and audits.', ['dashboard.view', 'sites.view', 'sites.manage', 'audit.view', 'deployments.view', 'operations.manage']],
            'analyst' => ['Analyst', 'Read-only portfolio and deployment visibility.', ['dashboard.view', 'sites.view', 'deployments.view']],
            'site-admin' => ['Site Admin', 'Scoped management for an individual site.', ['dashboard.view', 'sites.view', 'sites.manage']],
        ];

        foreach ($roles as $slug => [$name, $description, $rolePermissions]) {
            $role = Role::updateOrCreate(
                ['slug' => $slug],
                ['name' => $name, 'description' => $description, 'system' => true],
            );

            $role->permissions()->sync(
                Permission::query()
                    ->whereIn('slug', $rolePermissions)
                    ->pluck('id')
                    ->all(),
            );
        }
    }
}
