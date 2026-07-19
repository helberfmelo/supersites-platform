<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\BillingCheckoutSession;
use App\Models\CustomServiceOrder;
use Illuminate\Http\Request;
use Illuminate\View\View;

class MonetizationOperationsController extends Controller
{
    public function __invoke(Request $request): View
    {
        AuditLog::record($request->user(), 'admin.monetization_operations.viewed');

        $donations = BillingCheckoutSession::query()->where('kind', 'donation');

        return view('admin.monetization.index', [
            'donationSummary' => [
                'total' => (clone $donations)->count(),
                'completed' => (clone $donations)->whereIn('status', ['complete', 'completed', 'paid'])->count(),
                'open' => (clone $donations)->whereNotIn('status', ['complete', 'completed', 'paid', 'expired', 'cancelled'])->count(),
            ],
            'recentDonations' => $donations->latest()->limit(20)->get(),
            'orders' => CustomServiceOrder::query()->with('site')->latest()->get(),
        ]);
    }
}
