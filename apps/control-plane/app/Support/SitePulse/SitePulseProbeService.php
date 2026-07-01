<?php

namespace App\Support\SitePulse;

use App\Support\NetProbe\NetProbeDnsResolver;
use App\Support\NetProbe\NetProbeHostGuard;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;

class SitePulseProbeService
{
    /**
     * @var string[]
     */
    public const ALLOWED_CHECKS = ['status', 'redirects', 'headers', 'robots', 'sitemap', 'ttfb', 'performance'];

    public function __construct(
        private readonly NetProbeDnsResolver $resolver,
        private readonly NetProbeHostGuard $guard,
    ) {
    }

    /**
     * @param array<int, string> $checks
     * @return array<string, mixed>
     */
    public function probe(string $rawUrl, array $checks): array
    {
        $normalizedChecks = $this->normalizeChecks($checks);
        $url = $this->normalizeUrl($rawUrl);
        $cacheKey = 'sitepulse:probe:'.hash('sha256', $url.'|'.implode(',', $normalizedChecks));

        if (Cache::has($cacheKey)) {
            /** @var array<string, mixed> $cached */
            $cached = Cache::get($cacheKey);

            return $this->withCachedFlag($cached, true);
        }

        $chain = $this->fetchRedirectChain($url);
        $final = $chain[array_key_last($chain)] ?? null;
        $warnings = [
            'This is a single one-shot probe from one runtime, not uptime monitoring.',
        ];
        $checkData = [
            'status' => $this->statusData($final),
        ];
        $findings = [
            $this->statusFinding($final),
            $this->redirectFinding($chain),
        ];

        if ($this->includes($normalizedChecks, 'headers')) {
            $headerData = $this->securityHeaderData($final);
            $checkData['headers'] = $headerData;
            $findings = array_merge($findings, $headerData['findings']);
        }

        if ($this->includes($normalizedChecks, 'ttfb')) {
            $ttfbData = $this->ttfbData($final);
            $checkData['ttfb'] = $ttfbData;
            $findings[] = $ttfbData['finding'];
        }

        if ($this->includes($normalizedChecks, 'robots')) {
            $robots = $this->fetchAuxiliaryFile($url, '/robots.txt', 64_000);
            $checkData['robots'] = $robots;
            $findings[] = $this->auxiliaryFinding('Robots.txt', $robots);
        }

        if ($this->includes($normalizedChecks, 'sitemap')) {
            $sitemap = $this->fetchAuxiliaryFile($url, '/sitemap.xml', 256_000);
            $checkData['sitemap'] = [
                ...$sitemap,
                'url_count' => $this->sitemapUrlCount((string) ($sitemap['body_sample'] ?? '')),
                'xml_shape' => $this->sitemapXmlShape((string) ($sitemap['body_sample'] ?? '')),
            ];
            $findings[] = $this->sitemapFinding($checkData['sitemap']);
        }

        if ($this->includes($normalizedChecks, 'performance')) {
            $checkData['performance'] = [
                'redirect_count' => max(count($chain) - 1, 0),
                'body_bytes_sampled' => strlen((string) ($final['body_sample'] ?? '')),
                'duration_ms' => $final['duration_ms'] ?? null,
                'security_headers_present' => $checkData['headers']['present'] ?? [],
                'same_origin_files_checked' => array_values(array_filter([
                    isset($checkData['robots']) ? 'robots.txt' : null,
                    isset($checkData['sitemap']) ? 'sitemap.xml' : null,
                ])),
            ];
        }

        $payload = [
            'data' => [
                'url' => $url,
                'final_url' => (string) ($final['url'] ?? $url),
                'status' => $this->overallStatus($findings),
                'summary' => $this->summary($findings),
                'findings' => $findings,
                'checks' => $checkData,
                'redirect_chain' => array_map(fn (array $hop): array => [
                'url' => $hop['url'],
                'status' => $hop['status'],
                'location' => $hop['location'],
                'duration_ms' => $hop['duration_ms'],
                'error' => $hop['error'] ?? null,
            ], $chain),
                'warnings' => $warnings,
            ],
            'meta' => [
                'generated_at' => now()->toISOString(),
                'cache_ttl_seconds' => 30,
                'cached' => false,
                'max_redirects' => 4,
                'allowed_checks' => self::ALLOWED_CHECKS,
            ],
        ];
        Cache::put($cacheKey, $payload, 30);

        return $this->withCachedFlag($payload, false);
    }

    /**
     * @param array<int, string> $checks
     * @return array<int, string>
     */
    private function normalizeChecks(array $checks): array
    {
        $requested = array_values(array_unique(array_map(
            fn (mixed $check): string => strtolower(trim((string) $check)),
            $checks,
        )));

        if ($requested === []) {
            $requested = ['status'];
        }

        $invalid = array_values(array_diff($requested, self::ALLOWED_CHECKS));
        if ($invalid !== []) {
            throw ValidationException::withMessages([
                'checks' => ['Unsupported SitePulse check requested.'],
            ]);
        }

        if (in_array('performance', $requested, true)) {
            return ['status', 'redirects', 'headers', 'robots', 'sitemap', 'ttfb', 'performance'];
        }

        if (! in_array('status', $requested, true)) {
            array_unshift($requested, 'status');
        }

        return $requested;
    }

    /**
     * @param array<int, string> $checks
     */
    private function includes(array $checks, string $check): bool
    {
        return in_array($check, $checks, true);
    }

    private function normalizeUrl(string $value): string
    {
        $url = trim($value);
        if ($url === '') {
            throw ValidationException::withMessages(['url' => ['Enter a website URL.']]);
        }

        if (! preg_match('/^https?:\/\//i', $url)) {
            $url = 'https://'.$url;
        }

        $parts = parse_url($url);
        if (! is_array($parts) || ! isset($parts['scheme'], $parts['host'])) {
            throw ValidationException::withMessages(['url' => ['Enter a valid HTTP or HTTPS URL.']]);
        }

        $scheme = strtolower((string) $parts['scheme']);
        if (! in_array($scheme, ['http', 'https'], true)) {
            throw ValidationException::withMessages(['url' => ['Only HTTP and HTTPS URLs are supported.']]);
        }

        if (isset($parts['user']) || isset($parts['pass']) || isset($parts['fragment'])) {
            throw ValidationException::withMessages(['url' => ['Credentials and fragments are not accepted in probe URLs.']]);
        }

        $port = isset($parts['port']) ? (int) $parts['port'] : ($scheme === 'https' ? 443 : 80);
        if (! in_array($port, [80, 443], true)) {
            throw ValidationException::withMessages(['url' => ['Only default web ports 80 and 443 are enabled for public probes.']]);
        }

        $host = $this->guard->normalizeHostname((string) $parts['host']);
        $this->assertPublicHost($host);
        $path = $parts['path'] ?? '/';
        $query = isset($parts['query']) ? '?'.$parts['query'] : '';
        $portPart = isset($parts['port']) ? ':'.$port : '';

        return "{$scheme}://{$host}{$portPart}{$path}{$query}";
    }

    private function assertPublicHost(string $host): void
    {
        $addresses = $this->extractAddresses([
            ...$this->resolver->resolve($host, 'A'),
            ...$this->resolver->resolve($host, 'AAAA'),
        ]);

        if ($addresses === []) {
            throw ValidationException::withMessages(['url' => ['No public A or AAAA address was found before the website probe.']]);
        }

        $this->guard->assertPublicResolvedAddresses($host, $addresses);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function fetchRedirectChain(string $url): array
    {
        $chain = [];
        $current = $url;
        $seen = [];

        for ($i = 0; $i <= 4; $i++) {
            if (isset($seen[$current])) {
                $chain[] = [
                    'url' => $current,
                    'status' => 0,
                    'headers' => [],
                    'body_sample' => '',
                    'location' => null,
                    'duration_ms' => null,
                    'error' => 'Redirect loop detected.',
                ];
                break;
            }

            $seen[$current] = true;
            $hop = $this->request($current);
            $chain[] = $hop;

            $location = $hop['location'];
            $status = (int) $hop['status'];
            if (! $location || $status < 300 || $status >= 400) {
                break;
            }

            $current = $this->resolveRedirectUrl($current, (string) $location);
        }

        return $chain;
    }

    /**
     * @return array<string, mixed>
     */
    private function request(string $url): array
    {
        $url = $this->normalizeUrl($url);
        $started = microtime(true);

        try {
            $response = Http::timeout(5)
                ->connectTimeout(3)
                ->withOptions(['allow_redirects' => false])
                ->withHeaders(['User-Agent' => 'SuperSites-SitePulse/1.0'])
                ->get($url);
        } catch (\Throwable $exception) {
            return [
                'url' => $url,
                'status' => 0,
                'headers' => [],
                'body_sample' => '',
                'location' => null,
                'duration_ms' => (int) round((microtime(true) - $started) * 1000),
                'error' => 'Request failed or timed out.',
            ];
        }

        return $this->responseToHop($url, $response, $started);
    }

    /**
     * @return array<string, mixed>
     */
    private function responseToHop(string $url, Response $response, float $started): array
    {
        $headers = [];
        foreach ($response->headers() as $name => $values) {
            $headers[strtolower($name)] = array_values(array_map('strval', $values));
        }

        return [
            'url' => $url,
            'status' => $response->status(),
            'headers' => $headers,
            'body_sample' => substr($response->body(), 0, 256_000),
            'location' => $response->header('Location'),
            'duration_ms' => (int) round((microtime(true) - $started) * 1000),
            'error' => null,
        ];
    }

    private function resolveRedirectUrl(string $baseUrl, string $location): string
    {
        if (preg_match('/^https?:\/\//i', $location)) {
            return $this->normalizeUrl($location);
        }

        $base = parse_url($baseUrl);
        if (! is_array($base) || ! isset($base['scheme'], $base['host'])) {
            throw ValidationException::withMessages(['url' => ['Could not resolve redirect location.']]);
        }

        if (str_starts_with($location, '//')) {
            return $this->normalizeUrl($base['scheme'].':'.$location);
        }

        $origin = $base['scheme'].'://'.$base['host'].(isset($base['port']) ? ':'.$base['port'] : '');
        if (str_starts_with($location, '/')) {
            return $this->normalizeUrl($origin.$location);
        }

        $path = $base['path'] ?? '/';
        $directory = preg_replace('#/[^/]*$#', '/', $path) ?: '/';

        return $this->normalizeUrl($origin.$directory.$location);
    }

    /**
     * @return array<string, mixed>
     */
    private function fetchAuxiliaryFile(string $inputUrl, string $path, int $maxBytes): array
    {
        $parts = parse_url($this->normalizeUrl($inputUrl));
        $origin = $parts['scheme'].'://'.$parts['host'].(isset($parts['port']) ? ':'.$parts['port'] : '');
        $result = $this->request($origin.$path);

        return [
            'url' => $result['url'],
            'status' => $result['status'],
            'duration_ms' => $result['duration_ms'],
            'content_type' => $this->firstHeader($result, 'content-type'),
            'body_bytes_sampled' => min(strlen((string) $result['body_sample']), $maxBytes),
            'body_sample' => substr((string) $result['body_sample'], 0, $maxBytes),
            'error' => $result['error'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function statusData(?array $final): array
    {
        return [
            'code' => $final['status'] ?? 0,
            'content_type' => $final ? $this->firstHeader($final, 'content-type') : null,
            'duration_ms' => $final['duration_ms'] ?? null,
            'body_bytes_sampled' => strlen((string) ($final['body_sample'] ?? '')),
            'error' => $final['error'] ?? null,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function securityHeaderData(?array $final): array
    {
        $required = [
            'strict-transport-security',
            'content-security-policy',
            'x-frame-options',
            'referrer-policy',
            'permissions-policy',
            'x-content-type-options',
        ];
        $headers = array_keys($final['headers'] ?? []);
        $present = array_values(array_intersect($required, $headers));
        $missing = array_values(array_diff($required, $headers));

        return [
            'present' => $present,
            'missing' => $missing,
            'content_type' => $final ? $this->firstHeader($final, 'content-type') : null,
            'findings' => [
                [
                    'label' => 'Security headers present',
                    'status' => count($present) >= 3 ? 'pass' : 'warn',
                    'detail' => 'Baseline browser security headers found on the final response.',
                    'value' => count($present),
                ],
                [
                    'label' => 'Security headers missing',
                    'status' => $missing === [] ? 'pass' : 'warn',
                    'detail' => $missing === [] ? 'No baseline header gaps were detected.' : implode(', ', $missing).' should be reviewed.',
                    'value' => count($missing),
                ],
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function ttfbData(?array $final): array
    {
        $duration = $final['duration_ms'] ?? null;
        $status = is_int($duration) && $duration < 800 ? 'pass' : (is_int($duration) && $duration < 2000 ? 'warn' : 'fail');

        return [
            'duration_ms' => $duration,
            'finding' => [
                'label' => 'TTFB sample',
                'status' => $status,
                'detail' => 'Approximate first-byte/response timing sample from the bounded probe.',
                'value' => is_int($duration) ? $duration.' ms' : null,
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function statusFinding(?array $final): array
    {
        $status = (int) ($final['status'] ?? 0);
        $state = $status >= 200 && $status < 400 ? 'pass' : ($status >= 400 && $status < 500 ? 'warn' : 'fail');

        return [
            'label' => 'HTTP status',
            'status' => $state,
            'detail' => $status > 0 ? 'Final HTTP response status from the bounded probe.' : 'The request failed before a response was received.',
            'value' => $status ?: null,
        ];
    }

    /**
     * @param array<int, array<string, mixed>> $chain
     * @return array<string, mixed>
     */
    private function redirectFinding(array $chain): array
    {
        $redirects = max(count($chain) - 1, 0);

        return [
            'label' => 'Redirect count',
            'status' => $redirects <= 1 ? 'pass' : ($redirects <= 3 ? 'warn' : 'fail'),
            'detail' => 'Redirect hops followed before the final response.',
            'value' => $redirects,
        ];
    }

    /**
     * @param array<string, mixed> $auxiliary
     * @return array<string, mixed>
     */
    private function auxiliaryFinding(string $label, array $auxiliary): array
    {
        $status = (int) ($auxiliary['status'] ?? 0);

        return [
            'label' => $label,
            'status' => $status >= 200 && $status < 300 ? 'pass' : ($status === 404 ? 'warn' : 'fail'),
            'detail' => $status === 404 ? "{$label} was not found at the same origin." : "{$label} returned HTTP {$status}.",
            'value' => $status ?: null,
        ];
    }

    /**
     * @param array<string, mixed> $sitemap
     * @return array<string, mixed>
     */
    private function sitemapFinding(array $sitemap): array
    {
        $valid = ($sitemap['xml_shape'] ?? 'invalid') !== 'invalid';
        $status = (int) ($sitemap['status'] ?? 0);

        return [
            'label' => 'Sitemap XML',
            'status' => $status >= 200 && $status < 300 && $valid ? 'pass' : 'warn',
            'detail' => $valid ? 'Sitemap XML shape was recognized.' : 'Sitemap XML shape was not recognized in the sampled body.',
            'value' => $sitemap['url_count'] ?? null,
        ];
    }

    private function sitemapXmlShape(string $body): string
    {
        if (str_contains($body, '<urlset')) {
            return 'urlset';
        }

        if (str_contains($body, '<sitemapindex')) {
            return 'sitemapindex';
        }

        return 'invalid';
    }

    private function sitemapUrlCount(string $body): int
    {
        return substr_count($body, '<url>');
    }

    /**
     * @param array<int, array<string, mixed>> $records
     * @return string[]
     */
    private function extractAddresses(array $records): array
    {
        $addresses = [];

        foreach ($records as $record) {
            foreach (['ip', 'ipv6'] as $key) {
                if (isset($record[$key]) && filter_var($record[$key], FILTER_VALIDATE_IP)) {
                    $addresses[] = (string) $record[$key];
                }
            }
        }

        return array_values(array_unique($addresses));
    }

    /**
     * @param array<string, mixed> $hop
     */
    private function firstHeader(array $hop, string $header): ?string
    {
        $values = $hop['headers'][strtolower($header)] ?? [];

        return is_array($values) && isset($values[0]) ? (string) $values[0] : null;
    }

    /**
     * @param array<int, array<string, mixed>> $findings
     */
    private function overallStatus(array $findings): string
    {
        if (collect($findings)->contains(fn (array $finding): bool => ($finding['status'] ?? null) === 'fail')) {
            return 'fail';
        }

        if (collect($findings)->contains(fn (array $finding): bool => ($finding['status'] ?? null) === 'warn')) {
            return 'warn';
        }

        return 'pass';
    }

    /**
     * @param array<int, array<string, mixed>> $findings
     */
    private function summary(array $findings): string
    {
        return match ($this->overallStatus($findings)) {
            'pass' => 'The page answered cleanly for this one-shot SitePulse probe.',
            'warn' => 'The page answered, but one or more website health signals should be reviewed.',
            default => 'The SitePulse probe found a blocking website health issue or request failure.',
        };
    }

    /**
     * @param array<string, mixed> $payload
     * @return array<string, mixed>
     */
    private function withCachedFlag(array $payload, bool $cached): array
    {
        $payload['meta']['cached'] = $cached;

        return $payload;
    }
}
