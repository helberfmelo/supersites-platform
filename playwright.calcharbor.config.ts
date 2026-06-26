import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: /calcharbor\.spec\.ts/,
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  outputDir: './artifacts/playwright-calcharbor-results',
  reporter: [
    ['list'],
    ['html', { outputFolder: './artifacts/playwright-calcharbor-report', open: 'never' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:3114',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'node .output/server/index.mjs',
    cwd: './apps/calcharbor',
    env: {
      HOST: '127.0.0.1',
      PORT: '3114',
    },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    url: 'http://127.0.0.1:3114/en',
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
