@php
    $monitor = $alert->monitor;
    $check = $alert->check;
@endphp
<!doctype html>
<html lang="en">
<body>
    <h1>NetProbe monitor alert</h1>
    <p>Status: <strong>{{ $check?->status }}</strong></p>
    <p>Monitor: {{ $monitor?->label ?: $monitor?->target }}</p>
    <p>Type: {{ $monitor?->type }}</p>
    <p>Checked at: {{ $check?->finished_at?->toISOString() }}</p>

    @if ($check?->error_message)
        <p>Error: {{ $check->error_message }}</p>
    @endif

    @if (is_array($check?->response_summary))
        <h2>Summary</h2>
        <pre>{{ json_encode($check->response_summary, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) }}</pre>
    @endif
</body>
</html>
