<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Site;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class SiteController extends Controller
{
    /**
     * @var array<int, string>
     */
    private array $statuses = ['foundation', 'planned', 'active', 'paused', 'retired'];

    public function index(): View
    {
        return view('admin.sites.index', [
            'sites' => Site::query()
                ->orderByRaw('launch_order is null')
                ->orderBy('launch_order')
                ->orderBy('slug')
                ->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.sites.create', [
            'site' => new Site([
                'adsense_ready' => false,
                'locales' => ['en', 'pt-br', 'es', 'fr', 'de'],
                'status' => 'planned',
            ]),
            'statuses' => $this->statuses,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $site = Site::create($this->validatedSiteData($request));

        AuditLog::record($request->user(), 'admin.sites.created', site: $site, auditable: $site, metadata: [
            'slug' => $site->slug,
        ]);

        return redirect()
            ->route('admin.sites.index')
            ->with('status', "Site {$site->name} created.");
    }

    public function edit(Site $site): View
    {
        return view('admin.sites.edit', [
            'site' => $site,
            'statuses' => $this->statuses,
        ]);
    }

    public function update(Request $request, Site $site): RedirectResponse
    {
        $before = $site->only(['name', 'status', 'temporary_url', 'adsense_ready']);

        $site->update($this->validatedSiteData($request, $site));

        AuditLog::record($request->user(), 'admin.sites.updated', site: $site, auditable: $site, metadata: [
            'before' => $before,
            'after' => $site->only(['name', 'status', 'temporary_url', 'adsense_ready']),
        ]);

        return redirect()
            ->route('admin.sites.index')
            ->with('status', "Site {$site->name} updated.");
    }

    /**
     * @return array<string, mixed>
     */
    private function validatedSiteData(Request $request, ?Site $site = null): array
    {
        $data = $request->validate([
            'slug' => [
                'required',
                'string',
                'max:80',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('sites', 'slug')->ignore($site),
            ],
            'name' => ['required', 'string', 'max:120'],
            'kind' => ['required', 'string', 'max:40'],
            'category' => ['nullable', 'string', 'max:80'],
            'launch_order' => ['nullable', 'integer', 'min:0', 'max:999'],
            'status' => ['required', 'string', Rule::in($this->statuses)],
            'temporary_url' => ['nullable', 'url', 'max:255'],
            'locales' => ['required', 'string', 'max:120'],
            'adsense_ready' => ['nullable', 'boolean'],
        ]);

        $data['adsense_ready'] = $request->boolean('adsense_ready');
        $data['category'] = $data['category'] ?? null;
        $data['launch_order'] = $data['launch_order'] ?? null;
        $data['locales'] = collect(explode(',', $data['locales']))
            ->map(fn (string $locale): string => strtolower(trim($locale)))
            ->filter()
            ->unique()
            ->values()
            ->all();

        return $data;
    }
}
