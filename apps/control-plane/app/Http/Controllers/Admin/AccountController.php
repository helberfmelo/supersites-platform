<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\UserAccountPrivacyRequest;
use App\Support\Accounts\AccountDataExporter;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\View\View;

class AccountController extends Controller
{
    public function show(Request $request, AccountDataExporter $exporter): View
    {
        $user = $request->user();
        $accountData = $exporter->export($user);

        AuditLog::record($user, 'admin.account.viewed', metadata: [
            'role_count' => count($accountData['roles']),
            'permission_count' => count($accountData['permissions']),
        ]);

        return view('admin.account.show', [
            'accountData' => $accountData,
            'privacyRequests' => $user->accountPrivacyRequests()
                ->latest('requested_at')
                ->limit(8)
                ->get(),
        ]);
    }

    public function export(Request $request, AccountDataExporter $exporter): Response
    {
        $user = $request->user();
        $privacyRequest = UserAccountPrivacyRequest::create([
            'user_id' => $user->id,
            'request_type' => UserAccountPrivacyRequest::TYPE_EXPORT,
            'status' => UserAccountPrivacyRequest::STATUS_READY,
            'metadata' => [
                'delivery' => 'download',
                'contract_version' => AccountDataExporter::CONTRACT_VERSION,
            ],
            'requested_at' => now(),
            'completed_at' => now(),
        ]);

        AuditLog::record($user, 'admin.account.exported', auditable: $privacyRequest, metadata: [
            'request_type' => UserAccountPrivacyRequest::TYPE_EXPORT,
            'status' => UserAccountPrivacyRequest::STATUS_READY,
        ]);

        $payload = json_encode($exporter->export($user), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

        return response($payload, 200, [
            'Content-Type' => 'application/json',
            'Content-Disposition' => 'attachment; filename="supersites-account-export.json"',
        ]);
    }

    public function requestDeletion(Request $request): RedirectResponse
    {
        $user = $request->user();
        $privacyRequest = UserAccountPrivacyRequest::create([
            'user_id' => $user->id,
            'request_type' => UserAccountPrivacyRequest::TYPE_DELETE,
            'status' => UserAccountPrivacyRequest::STATUS_HUMAN_REQUIRED,
            'metadata' => [
                'automatic_deletion' => false,
                'requires_manual_review' => true,
                'reason_not_stored' => true,
            ],
            'requested_at' => now(),
        ]);

        AuditLog::record($user, 'admin.account.delete_requested', auditable: $privacyRequest, metadata: [
            'request_type' => UserAccountPrivacyRequest::TYPE_DELETE,
            'status' => UserAccountPrivacyRequest::STATUS_HUMAN_REQUIRED,
        ]);

        return redirect()
            ->route('admin.account.show')
            ->with('status', 'Account deletion request recorded for manual review. No account data was deleted automatically.');
    }
}
