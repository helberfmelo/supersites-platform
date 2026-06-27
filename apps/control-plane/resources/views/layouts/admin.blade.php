<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ $title ?? 'SuperSites Control Plane' }}</title>
        <style>
            :root {
                color-scheme: light;
                font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                line-height: 1.5;
                color: #17202a;
                background: #f6f8fb;
            }

            * {
                box-sizing: border-box;
            }

            body {
                margin: 0;
            }

            a {
                color: inherit;
            }

            .topbar {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 16px;
                border-bottom: 1px solid #d9e2ec;
                background: #ffffff;
                padding: 14px clamp(16px, 4vw, 40px);
            }

            .brand {
                display: grid;
                gap: 2px;
            }

            .brand strong {
                font-size: 1rem;
            }

            .brand span,
            .muted {
                color: #5d6b78;
                font-size: 0.875rem;
            }

            .nav {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                gap: 8px;
            }

            .nav a,
            .button,
            button.button {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-height: 36px;
                border: 1px solid #cbd5df;
                border-radius: 6px;
                background: #ffffff;
                color: #17202a;
                padding: 0 12px;
                text-decoration: none;
                font-weight: 700;
                cursor: pointer;
            }

            .button.primary,
            button.button.primary {
                border-color: #0f766e;
                background: #0f766e;
                color: #ffffff;
            }

            .button.danger,
            button.button.danger {
                border-color: #be4b49;
                color: #8f2725;
            }

            .page {
                display: grid;
                gap: 24px;
                width: min(1180px, 100%);
                min-width: 0;
                margin: 0 auto;
                padding: 28px clamp(16px, 4vw, 40px) 56px;
            }

            .page-title {
                display: flex;
                align-items: end;
                justify-content: space-between;
                gap: 16px;
                flex-wrap: wrap;
            }

            h1,
            h2,
            h3,
            p {
                margin: 0;
            }

            h1 {
                font-size: clamp(1.8rem, 3vw, 2.5rem);
                letter-spacing: 0;
                line-height: 1.1;
            }

            h2 {
                font-size: 1.05rem;
            }

            .summary-grid,
            .two-column {
                display: grid;
                gap: 16px;
                min-width: 0;
            }

            .summary-grid {
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            }

            .two-column {
                grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            }

            .panel {
                min-width: 0;
                overflow-x: auto;
                border: 1px solid #d9e2ec;
                border-radius: 8px;
                background: #ffffff;
                padding: 18px;
            }

            .metric {
                display: grid;
                gap: 6px;
                border-top: 4px solid #2f80ed;
            }

            .metric:nth-child(2) {
                border-top-color: #0f766e;
            }

            .metric:nth-child(3) {
                border-top-color: #d97706;
            }

            .metric:nth-child(4) {
                border-top-color: #7c3aed;
            }

            .metric strong {
                font-size: 2rem;
                line-height: 1;
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            th,
            td {
                border-bottom: 1px solid #e4ebf2;
                padding: 10px 8px;
                text-align: left;
                vertical-align: top;
                overflow-wrap: anywhere;
            }

            th {
                color: #4d5b68;
                font-size: 0.78rem;
                text-transform: uppercase;
            }

            .status {
                display: inline-flex;
                align-items: center;
                min-height: 24px;
                border-radius: 999px;
                padding: 0 9px;
                background: #eef2f7;
                color: #334155;
                font-size: 0.8rem;
                font-weight: 700;
            }

            .status.success,
            .status.active {
                background: #dff6ed;
                color: #126241;
            }

            .status.warning,
            .status.blocked,
            .status.paused {
                background: #fff3cd;
                color: #7c4a03;
            }

            .status.danger,
            .status.open {
                background: #fde2e1;
                color: #8f2725;
            }

            .notice {
                border: 1px solid #c7eadf;
                border-radius: 6px;
                background: #ecfdf6;
                padding: 12px 14px;
                color: #126241;
                font-weight: 700;
            }

            .form {
                display: grid;
                gap: 16px;
            }

            .field {
                display: grid;
                gap: 6px;
            }

            label {
                font-weight: 700;
            }

            input,
            select,
            textarea {
                width: 100%;
                min-height: 40px;
                border: 1px solid #cbd5df;
                border-radius: 6px;
                background: #ffffff;
                padding: 8px 10px;
                color: #17202a;
            }

            textarea {
                min-height: 86px;
            }

            input[type="checkbox"] {
                width: auto;
                min-height: auto;
            }

            .error {
                color: #8f2725;
                font-size: 0.875rem;
            }

            .actions {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                gap: 10px;
            }

            @media (max-width: 720px) {
                .topbar,
                .page-title {
                    align-items: start;
                    flex-direction: column;
                }

                .panel {
                    padding: 14px;
                }

                table {
                    min-width: 820px;
                }

                th,
                td {
                    overflow-wrap: normal;
                    white-space: nowrap;
                }
            }
        </style>
    </head>
    <body>
        <header class="topbar">
            <a class="brand" href="{{ route('admin.dashboard') }}">
                <strong>SuperSites Control Plane</strong>
                <span>{{ auth()->user()?->email }}</span>
            </a>
            <nav class="nav" aria-label="Primary">
                <a href="{{ route('admin.dashboard') }}">Dashboard</a>
                <a href="{{ route('admin.benchmark-refinement.index') }}">Benchmark</a>
                <a href="{{ route('admin.reports.index') }}">Reports</a>
                <a href="{{ route('admin.sites.index') }}">Sites</a>
                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button class="button danger" type="submit">Sign out</button>
                </form>
            </nav>
        </header>

        <main class="page">
            @if (session('status'))
                <div class="notice">{{ session('status') }}</div>
            @endif

            @yield('content')
        </main>
    </body>
</html>
