<?php

namespace App\Http\Controllers\Api\V1\Account;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\UserAccountPrivacyRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AccountDeletionRequestController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $request->validate([
            'acknowledge' => ['accepted'],
        ]);

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

        AuditLog::record($user, 'api.account.delete_requested', auditable: $privacyRequest, metadata: [
            'request_type' => UserAccountPrivacyRequest::TYPE_DELETE,
            'status' => UserAccountPrivacyRequest::STATUS_HUMAN_REQUIRED,
        ]);

        return response()->json([
            'data' => [
                'id' => $privacyRequest->id,
                'request_type' => $privacyRequest->request_type,
                'status' => $privacyRequest->status,
                'automatic_deletion' => false,
            ],
        ], 202);
    }
}
