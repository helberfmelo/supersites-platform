<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\CustomServiceOrder;
use App\Models\Site;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class CustomServiceOrderController extends Controller
{
    private array $services = ['dns-email-setup', 'website-audit', 'light-automation', 'assisted-batch', 'on-demand-report'];

    private array $statuses = ['inquiry', 'scoping', 'proposal_sent', 'awaiting_payment', 'paid', 'in_delivery', 'completed', 'cancelled'];

    private array $paymentStatuses = ['not_applicable', 'pending_external', 'paid_external', 'refunded_external'];

    public function create(): View
    {
        return $this->formView(new CustomServiceOrder([
            'reference' => 'SVC-'.now()->format('Ymd').'-'.Str::upper(Str::random(6)),
            'status' => 'inquiry',
            'payment_status' => 'not_applicable',
            'requested_at' => now(),
        ]), 'admin.monetization.orders.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $order = CustomServiceOrder::create($this->validated($request));
        AuditLog::record($request->user(), 'admin.custom_service_orders.created', $order->site, $order, ['reference' => $order->reference]);

        return redirect()->route('admin.monetization.index')->with('status', "Service order {$order->reference} created.");
    }

    public function edit(CustomServiceOrder $customServiceOrder): View
    {
        return $this->formView($customServiceOrder, 'admin.monetization.orders.edit');
    }

    public function update(Request $request, CustomServiceOrder $customServiceOrder): RedirectResponse
    {
        $before = $customServiceOrder->only(['status', 'payment_status', 'amount_minor', 'currency', 'completed_at']);
        $customServiceOrder->update($this->validated($request, $customServiceOrder));
        AuditLog::record($request->user(), 'admin.custom_service_orders.updated', $customServiceOrder->site, $customServiceOrder, [
            'before' => $before,
            'after' => $customServiceOrder->only(array_keys($before)),
        ]);

        return redirect()->route('admin.monetization.index')->with('status', "Service order {$customServiceOrder->reference} updated.");
    }

    private function formView(CustomServiceOrder $order, string $view): View
    {
        return view($view, [
            'order' => $order,
            'sites' => Site::query()->orderBy('name')->get(),
            'services' => $this->services,
            'statuses' => $this->statuses,
            'paymentStatuses' => $this->paymentStatuses,
        ]);
    }

    private function validated(Request $request, ?CustomServiceOrder $order = null): array
    {
        $data = $request->validate([
            'site_id' => ['nullable', 'integer', 'exists:sites,id'],
            'reference' => ['required', 'string', 'max:80', Rule::unique('custom_service_orders')->ignore($order)],
            'service_slug' => ['required', Rule::in($this->services)],
            'status' => ['required', Rule::in($this->statuses)],
            'title' => ['required', 'string', 'max:160'],
            'scope_summary' => ['nullable', 'string', 'max:4000'],
            'amount_minor' => ['nullable', 'integer', 'min:0'],
            'currency' => ['nullable', 'string', 'size:3'],
            'payment_status' => ['required', Rule::in($this->paymentStatuses)],
            'requested_at' => ['nullable', 'date'],
            'completed_at' => ['nullable', 'date'],
        ]);
        $data['currency'] = isset($data['currency']) ? strtoupper($data['currency']) : null;

        return $data;
    }
}
