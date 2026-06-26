import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: /netprobe\.spec\.ts/,
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  outputDir: './artifacts/playwright-netprobe-results',
  reporter: [
    ['list'],
    ['html', { outputFolder: './artifacts/playwright-netprobe-report', open: 'never' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:3112',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'node .output/server/index.mjs',
    cwd: './apps/netprobe-atlas',
    env: {
      HOST: '127.0.0.1',
      PORT: '3112',
    },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: 'http://127.0.0.1:3112/en',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1365, height: 900 },
      },
    },
  ],
})
