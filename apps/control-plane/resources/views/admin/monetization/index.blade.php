@extends('layouts.admin', ['title' => 'Monetization operations - SuperSites Control Plane'])

@section('content')
    <section class="page-title" aria-labelledby="page-title">
        <div>
            <h1 id="page-title">Monetization operations</h1>
            <p class="muted">Donation reconciliation and manual custom-service workflow. This page does not activate checkout.</p>
        </div>
        @if (auth()->user()?->hasPermission('operations.manage'))
            <a class="button primary" href="{{ route('admin.monetization.orders.create') }}">Add service order</a>
        @endif
    </section>

    <section class="summary-grid" aria-label="Donation summary">
        <article class="panel metric"><span class="muted">Donation sessions</span><strong>{{ $donationSummary['total'] }}</strong></article>
        <article class="panel metric"><span class="muted">Completed or paid</span><strong>{{ $donationSummary['completed'] }}</strong></article>
        <article class="panel metric"><span class="muted">Open</span><strong>{{ $donationSummary['open'] }}</strong></article>
        <article class="panel metric"><span class="muted">Service checkout</span><strong>Off</strong></article>
    </section>

    <section class="panel">
        <h2>Custom service orders</h2>
        <p class="muted">Keep customer contact in the monitored mailbox; store only a non-sensitive scope summary here.</p>
        <table>
            <thead><tr><th>Reference</th><th>Service</th><th>Status</th><th>Payment</th><th>Site</th><th></th></tr></thead>
            <tbody>
                @forelse ($orders as $order)
                    <tr>
                        <td><strong>{{ $order->reference }}</strong><br><span class="muted">{{ $order->title }}</span></td>
                        <td>{{ $order->service_slug }}</td>
                        <td><span class="status {{ $order->status === 'completed' ? 'completed' : '' }}">{{ $order->status }}</span></td>
                        <td>{{ $order->payment_status }}@if($order->amount_minor !== null)<br><span class="muted">{{ $order->currency }} {{ number_format($order->amount_minor / 100, 2) }}</span>@endif</td>
                        <td>{{ $order->site?->name ?? 'Portfolio' }}</td>
                        <td>@if (auth()->user()?->hasPermission('operations.manage'))<a class="button" href="{{ route('admin.monetization.orders.edit', $order) }}">Edit</a>@endif</td>
                    </tr>
                @empty
                    <tr><td colspan="6">No custom service orders recorded.</td></tr>
                @endforelse
            </tbody>
        </table>
    </section>

    <section class="panel">
        <h2>Recent donation checkout sessions</h2>
        <table>
            <thead><tr><th>Created</th><th>Provider</th><th>Status</th><th>Amount</th><th>Catalog</th></tr></thead>
            <tbody>
                @forelse ($recentDonations as $donation)
                    <tr>
                        <td>{{ $donation->created_at }}</td><td>{{ $donation->provider }}</td><td>{{ $donation->status }}</td>
                        <td>@if($donation->amount_minor !== null){{ strtoupper($donation->currency) }} {{ number_format($donation->amount_minor / 100, 2) }}@else n/a @endif</td>
                        <td>{{ $donation->catalog_key ?? 'custom amount' }}</td>
                    </tr>
                @empty
                    <tr><td colspan="5">No donation checkout sessions recorded.</td></tr>
                @endforelse
            </tbody>
        </table>
    </section>
@endsection
