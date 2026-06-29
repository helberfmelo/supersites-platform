@extends('layouts.admin')

@section('content')
    <section class="page-title">
        <div>
            <h1>Account and data controls</h1>
            <p class="muted">Authenticated account export and deletion request controls for paid-upgrade readiness.</p>
        </div>
        <form method="POST" action="{{ route('admin.account.export') }}">
            @csrf
            <button class="button primary" type="submit">Download account export</button>
        </form>
    </section>

    <h2>Account summary</h2>
    <section class="summary-grid" aria-label="Account summary">
        <article class="panel metric">
            <span class="muted">Account</span>
            <strong>{{ $accountData['account']['name'] }}</strong>
            <span>{{ $accountData['account']['email'] }}</span>
        </article>
        <article class="panel metric">
            <span class="muted">Roles</span>
            <strong>{{ count($accountData['roles']) }}</strong>
            <span>Global and site-scoped assignments</span>
        </article>
        <article class="panel metric">
            <span class="muted">Permissions</span>
            <strong>{{ count($accountData['permissions']) }}</strong>
            <span>Derived from RBAC roles</span>
        </article>
        <article class="panel metric">
            <span class="muted">Checkout</span>
            <strong>0</strong>
            <span>No paid checkout is active</span>
        </article>
    </section>

    <section class="two-column">
        <article class="panel">
            <h2>Role assignments</h2>
            <table>
                <thead>
                    <tr>
                        <th>Role</th>
                        <th>Scope</th>
                        <th>Site</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($accountData['roles'] as $role)
                        <tr>
                            <td>{{ $role['name'] }} <span class="muted">({{ $role['slug'] }})</span></td>
                            <td><span class="status {{ $role['scope'] === 'global' ? 'success' : 'warning' }}">{{ $role['scope'] }}</span></td>
                            <td>{{ $role['site_name'] ?? 'All sites' }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </article>

        <article class="panel">
            <h2>Data controls</h2>
            <p class="muted">Exports are immediate JSON downloads. Deletion remains a manual review workflow until legal, retention and billing policies are finalized.</p>
            <div class="actions" style="margin-top: 14px;">
                <form method="POST" action="{{ route('admin.account.export') }}">
                    @csrf
                    <button class="button primary" type="submit">Download account export</button>
                </form>
                <form method="POST" action="{{ route('admin.account.delete-request') }}">
                    @csrf
                    <button class="button danger" type="submit">Request deletion review</button>
                </form>
            </div>
        </article>
    </section>

    <section class="panel">
        <h2>Recent privacy requests</h2>
        <table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Requested</th>
                    <th>Completed</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($privacyRequests as $privacyRequest)
                    <tr>
                        <td>{{ $privacyRequest->request_type }}</td>
                        <td><span class="status {{ $privacyRequest->status === 'ready' ? 'success' : 'warning' }}">{{ $privacyRequest->status }}</span></td>
                        <td>{{ $privacyRequest->requested_at?->toDateTimeString() }}</td>
                        <td>{{ $privacyRequest->completed_at?->toDateTimeString() ?? 'Pending review' }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4" class="muted">No account privacy requests yet.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </section>
@endsection
