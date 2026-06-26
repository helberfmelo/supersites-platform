<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>SuperSites Control Plane</title>
        <style>
            :root {
                color-scheme: light;
                font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                line-height: 1.5;
                color: #17202a;
                background: #f6f8fb;
            }

            body {
                margin: 0;
            }

            main {
                display: grid;
                min-height: 100vh;
                place-items: center;
                padding: 32px;
            }

            .shell {
                width: min(680px, 100%);
                border: 1px solid #d9e2ec;
                border-radius: 8px;
                background: #ffffff;
                padding: 32px;
            }

            h1 {
                margin: 0 0 12px;
                font-size: clamp(1.9rem, 4vw, 3rem);
                line-height: 1.05;
                letter-spacing: 0;
            }

            p {
                margin: 0 0 24px;
                color: #4d5b68;
            }

            a {
                display: inline-flex;
                align-items: center;
                min-height: 40px;
                border-radius: 6px;
                background: #0f766e;
                color: #ffffff;
                padding: 0 16px;
                text-decoration: none;
                font-weight: 700;
            }
        </style>
    </head>
    <body>
        <main>
            <section class="shell" aria-labelledby="page-title">
                <h1 id="page-title">SuperSites Control Plane</h1>
                <p>Private operational dashboard for the SuperSites portfolio.</p>
                <a href="{{ route('login') }}">Open admin</a>
            </section>
        </main>
    </body>
</html>
