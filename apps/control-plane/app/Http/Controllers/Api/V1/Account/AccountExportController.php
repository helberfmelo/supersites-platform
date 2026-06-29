<?php

namespace App\Http\Controllers\Api\V1\Account;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\UserAccountPrivacyRequest;
use App\Support\Accounts\AccountDataExporter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AccountExportController extends Controller
{
    public function __invoke(Request $request, AccountDataExporter $exporter): JsonResponse
    {
        $user = $request->user();
        $privacyRequest = UserAccountPrivacyRequest::create([
            'user_id' => $user->id,
            'request_type' => UserAccountPrivacyRequest::TYPE_EXPORT,
            'status' => UserAccountPrivacyRequest::STATUS_READY,
            'metadata' => [
                'delivery' => 'json',
                'contract_version' => AccountDataExporter::CONTRACT_VERSION,
            ],
            'requested_at' => now(),
            'completed_at' => now(),
        ]);

        AuditLog::record($user, 'api.account.exported', auditable: $privacyRequest, metadata: [
            'request_type' => UserAccountPrivacyRequest::TYPE_EXPORT,
            'status' => UserAccountPrivacyRequest::STATUS_READY,
        ]);

        return response()->json([
            'data' => $exporter->export($user),
            'meta' => [
                'request_id' => $privacyRequest->id,
                'status' => $privacyRequest->status,
            ],
        ]);
    }
}
