import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: /sitepulse\.spec\.ts/,
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  outputDir: './artifacts/playwright-sitepulse-results',
  reporter: [
    ['list'],
    ['html', { outputFolder: './artifacts/playwright-sitepulse-report', open: 'never' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:3120',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'node .output/server/index.mjs',
    cwd: './apps/sitepulse-lab',
    env: {
      HOST: '127.0.0.1',
      PORT: '3120',
      NUXT_PUBLIC_SITEPULSE_API_BASE_URL: 'http://127.0.0.1:8013/api/v1/sitepulse',
    },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: 'http://127.0.0.1:3120/en',
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
