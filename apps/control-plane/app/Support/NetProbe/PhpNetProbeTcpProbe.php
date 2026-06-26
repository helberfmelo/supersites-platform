<?php

namespace App\Support\NetProbe;

class PhpNetProbeTcpProbe implements NetProbeTcpProbe
{
    public function connect(string $address, int $port, float $timeoutSeconds): array
    {
        $target = filter_var($address, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6)
            ? "tcp://[{$address}]:{$port}"
            : "tcp://{$address}:{$port}";

        $errorNumber = 0;
        $errorMessage = '';
        $startedAt = hrtime(true);
        $stream = @stream_socket_client(
            $target,
            $errorNumber,
            $errorMessage,
            $timeoutSeconds,
            STREAM_CLIENT_CONNECT,
        );
        $latencyMs = (int) round((hrtime(true) - $startedAt) / 1_000_000);

        if (is_resource($stream)) {
            fclose($stream);

            return [
                'status' => 'open',
                'latency_ms' => $latencyMs,
                'error' => null,
            ];
        }

        return [
            'status' => str_contains(strtolower($errorMessage), 'timed out') ? 'timeout' : 'closed',
            'latency_ms' => null,
            'error' => $errorNumber > 0 ? 'tcp_connect_failed' : 'tcp_connect_unavailable',
        ];
    }
}
