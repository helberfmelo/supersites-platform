<?php

namespace App\Support\Analytics;

class AnalyticsEventSanitizer
{
    public const CONTRACT_VERSION = '2026-06-26.1';

    private const SKIP = '__supersites_skip__';

    /**
     * @return list<string>
     */
    public static function eventNames(): array
    {
        return [
            'tool_viewed',
            'tool_started',
            'tool_completed',
            'tool_failed',
            'result_copied',
            'file_uploaded',
            'file_processed',
            'file_downloaded',
            'monitor_created',
            'signup_started',
            'signup_completed',
            'upgrade_viewed',
            'checkout_started',
            'purchase_completed',
            'subscription_cancelled',
            'outbound_site_click',
        ];
    }

    public static function normalizeSlug(string $value): string
    {
        $slug = strtolower(trim($value));
        $slug = (string) preg_replace('/[^a-z0-9-]/', '-', $slug);
        $slug = (string) preg_replace('/-+/', '-', $slug);

        return trim($slug, '-');
    }

    public static function sanitizePath(?string $value): ?string
    {
        if ($value === null || trim($value) === '') {
            return null;
        }

        $path = parse_url($value, PHP_URL_PATH);

        if (! is_string($path) || $path === '') {
            $path = explode('#', explode('?', $value)[0])[0] ?? '/';
        }

        if (! str_starts_with($path, '/')) {
            $path = '/'.$path;
        }

        $path = (string) preg_replace('#/+#', '/', $path);
        $path = $path === '/' ? '/' : rtrim($path, '/');

        return self::redactText($path);
    }

    public static function redactText(string $value): string
    {
        $value = (string) preg_replace('/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i', '[redacted-email]', $value);
        $value = (string) preg_replace('/\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/', '[redacted-ip]', $value);
        $value = (string) preg_replace('/\b(?:\d[ -]*?){13,19}\b/', '[redacted-number]', $value);

        return (string) preg_replace('/\b[A-Za-z0-9_-]{32,}\b/', '[redacted-token]', $value);
    }

    /**
     * @param array<string, mixed>|null $properties
     * @return array<string, bool|float|int|string|null>
     */
    public static function sanitizeProperties(?array $properties): array
    {
        if ($properties === null) {
            return [];
        }

        $sanitized = [];

        foreach ($properties as $rawKey => $rawValue) {
            $key = substr((string) preg_replace('/[^a-zA-Z0-9_.-]/', '_', trim((string) $rawKey)), 0, 80);

            if ($key === '' || self::isSensitiveKey($key)) {
                continue;
            }

            $value = str_contains(strtolower($key), 'url') || str_contains(strtolower($key), 'path')
                ? self::sanitizePathValue($rawValue)
                : self::sanitizeValue($rawValue);

            if ($value !== self::SKIP) {
                $sanitized[$key] = $value;
            }
        }

        return $sanitized;
    }

    private static function isSensitiveKey(string $key): bool
    {
        return (bool) preg_match(
            '/(email|e-mail|phone|telefone|cpf|cnpj|ssn|tax|document|password|senha|secret|token|api[_-]?key|authorization|card|iban|bank|pix|name|full[_-]?name|ip|address)/i',
            $key,
        );
    }

    private static function sanitizeValue(mixed $value): bool|float|int|string|null
    {
        if ($value === null || is_bool($value) || is_int($value) || is_float($value)) {
            return $value;
        }

        if (is_string($value)) {
            return substr(self::redactText(trim($value)), 0, 500);
        }

        return self::SKIP;
    }

    private static function sanitizePathValue(mixed $value): string|null
    {
        if ($value === null || is_scalar($value)) {
            return self::sanitizePath((string) $value);
        }

        return self::SKIP;
    }

    public static function hashIdentifier(?string $value): ?string
    {
        if ($value === null || trim($value) === '') {
            return null;
        }

        return hash('sha256', config('app.key').'|'.trim($value));
    }
}
