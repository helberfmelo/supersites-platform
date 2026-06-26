@extends('layouts.admin', ['title' => 'Sites - SuperSites Control Plane'])

@section('content')
    <section class="page-title" aria-labelledby="page-title">
        <div>
            <h1 id="page-title">Sites</h1>
            <p class="muted">Portfolio inventory, transitional URLs and operational status.</p>
        </div>
        @if (auth()->user()?->hasPermission('sites.manage'))
            <a class="button primary" href="{{ route('admin.sites.create') }}">Add site</a>
        @endif
    </section>

    <section class="panel">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Kind</th>
                    <th>Status</th>
                    <th>URL</th>
                    <th>Locales</th>
                    @if (auth()->user()?->hasPermission('sites.manage'))
                        <th></th>
                    @endif
                </tr>
            </thead>
            <tbody>
                @foreach ($sites as $site)
                    <tr>
                        <td>
                            <strong>{{ $site->name }}</strong><br>
                            <span class="muted">{{ $site->slug }}</span>
                        </td>
                        <td>{{ $site->kind }}<br><span class="muted">{{ $site->category ?? 'uncategorized' }}</span></td>
                        <td><span class="status {{ $site->status }}">{{ $site->status }}</span></td>
                        <td>
                            @if ($site->temporary_url)
                                <a href="{{ $site->temporary_url }}" rel="noreferrer" target="_blank">{{ $site->temporary_url }}</a>
                            @else
                                n/a
                            @endif
                        </td>
                        <td>{{ implode(', ', $site->locales ?? []) }}</td>
                        @if (auth()->user()?->hasPermission('sites.manage'))
                            <td><a class="button" href="{{ route('admin.sites.edit', $site) }}">Edit</a></td>
                        @endif
                    </tr>
                @endforeach
            </tbody>
        </table>
    </section>
@endsection
