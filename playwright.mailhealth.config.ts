import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: /mailhealth\.spec\.ts/,
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  outputDir: './artifacts/playwright-mailhealth-results',
  reporter: [
    ['list'],
    ['html', { outputFolder: './artifacts/playwright-mailhealth-report', open: 'never' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:3119',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'node .output/server/index.mjs',
    cwd: './apps/mailhealth',
    env: {
      HOST: '127.0.0.1',
      PORT: '3119',
      NUXT_PUBLIC_MAILHEALTH_API_BASE_URL: 'http://127.0.0.1:8013/api/v1/mailhealth',
    },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: 'http://127.0.0.1:3119/en',
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
