@csrf
@if ($order->exists) @method('PUT') @endif
<div class="field"><label for="reference">Reference</label><input id="reference" name="reference" value="{{ old('reference', $order->reference) }}" required>@error('reference')<span class="error">{{ $message }}</span>@enderror</div>
<div class="field"><label for="title">Internal title</label><input id="title" name="title" value="{{ old('title', $order->title) }}" required>@error('title')<span class="error">{{ $message }}</span>@enderror</div>
<div class="two-column">
    <div class="field"><label for="service_slug">Service</label><select id="service_slug" name="service_slug" required>@foreach($services as $service)<option value="{{ $service }}" @selected(old('service_slug', $order->service_slug) === $service)>{{ $service }}</option>@endforeach</select></div>
    <div class="field"><label for="site_id">Site</label><select id="site_id" name="site_id"><option value="">Portfolio</option>@foreach($sites as $site)<option value="{{ $site->id }}" @selected((string) old('site_id', $order->site_id) === (string) $site->id)>{{ $site->name }}</option>@endforeach</select></div>
    <div class="field"><label for="status">Status</label><select id="status" name="status" required>@foreach($statuses as $status)<option value="{{ $status }}" @selected(old('status', $order->status) === $status)>{{ $status }}</option>@endforeach</select></div>
    <div class="field"><label for="payment_status">Payment status</label><select id="payment_status" name="payment_status" required>@foreach($paymentStatuses as $status)<option value="{{ $status }}" @selected(old('payment_status', $order->payment_status) === $status)>{{ $status }}</option>@endforeach</select></div>
    <div class="field"><label for="amount_minor">Amount in minor units</label><input id="amount_minor" type="number" min="0" name="amount_minor" value="{{ old('amount_minor', $order->amount_minor) }}"></div>
    <div class="field"><label for="currency">Currency</label><input id="currency" maxlength="3" name="currency" value="{{ old('currency', $order->currency) }}" placeholder="USD"></div>
    <div class="field"><label for="requested_at">Requested at</label><input id="requested_at" type="datetime-local" name="requested_at" value="{{ old('requested_at', $order->requested_at?->format('Y-m-d\TH:i')) }}"></div>
    <div class="field"><label for="completed_at">Completed at</label><input id="completed_at" type="datetime-local" name="completed_at" value="{{ old('completed_at', $order->completed_at?->format('Y-m-d\TH:i')) }}"></div>
</div>
<div class="field"><label for="scope_summary">Non-sensitive scope summary</label><textarea id="scope_summary" name="scope_summary">{{ old('scope_summary', $order->scope_summary) }}</textarea><span class="muted">Do not paste email addresses, payment details, credentials or sensitive attachments.</span></div>
<div class="actions"><button class="button primary" type="submit">Save order</button><a class="button" href="{{ route('admin.monetization.index') }}">Cancel</a></div>
