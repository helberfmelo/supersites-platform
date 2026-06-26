<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Sign in - SuperSites Control Plane</title>
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

            main {
                display: grid;
                min-height: 100vh;
                place-items: center;
                padding: 28px;
            }

            .panel {
                display: grid;
                gap: 18px;
                width: min(420px, 100%);
                border: 1px solid #d9e2ec;
                border-radius: 8px;
                background: #ffffff;
                padding: 28px;
            }

            h1,
            p {
                margin: 0;
            }

            h1 {
                font-size: 2rem;
                letter-spacing: 0;
                line-height: 1.1;
            }

            p {
                color: #5d6b78;
            }

            form,
            .field {
                display: grid;
                gap: 12px;
            }

            label {
                font-weight: 700;
            }

            input {
                width: 100%;
                min-height: 42px;
                border: 1px solid #cbd5df;
                border-radius: 6px;
                padding: 8px 10px;
            }

            .checkbox {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .checkbox input {
                width: auto;
                min-height: auto;
            }

            button {
                min-height: 42px;
                border: 1px solid #0f766e;
                border-radius: 6px;
                background: #0f766e;
                color: #ffffff;
                padding: 0 14px;
                font-weight: 700;
                cursor: pointer;
            }

            .error {
                color: #8f2725;
                font-size: 0.875rem;
            }
        </style>
    </head>
    <body>
        <main>
            <section class="panel" aria-labelledby="page-title">
                <div>
                    <h1 id="page-title">Sign in</h1>
                    <p>Access the private SuperSites operations dashboard.</p>
                </div>

                <form method="POST" action="{{ route('login.store') }}">
                    @csrf

                    <div class="field">
                        <label for="email">Email</label>
                        <input id="email" name="email" type="email" value="{{ old('email') }}" autocomplete="email" required autofocus>
                        @error('email')
                            <div class="error">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="field">
                        <label for="password">Password</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required>
                        @error('password')
                            <div class="error">{{ $message }}</div>
                        @enderror
                    </div>

                    <label class="checkbox">
                        <input name="remember" type="checkbox" value="1">
                        Remember this session
                    </label>

                    <button type="submit">Sign in</button>
                </form>
            </section>
        </main>
    </body>
</html>
