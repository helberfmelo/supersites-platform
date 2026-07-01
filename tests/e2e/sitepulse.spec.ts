import { expect, test, type Page } from '@playwright/test'

function collectBrowserErrors(page: Page): string[] {
  const errors: string[] = []

  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text())
    }
  })

  page.on('pageerror', (error) => {
    errors.push(error.message)
  })

  return errors
}

async function expectNoHorizontalOverflow(page: Page) {
  const metrics = await page.evaluate(() => {
    const wideElements = Array.from(document.querySelectorAll('*'))
      .map((element) => {
        const rect = element.getBoundingClientRect()

        return {
          tag: element.tagName,
          className: String(element.className || ''),
          width: rect.width,
          right: rect.right,
        }
      })
      .filter((element) => element.width > window.innerWidth + 1 || element.right > window.innerWidth + 1)
      .slice(0, 8)

    return {
      bodyScrollWidth: document.body.scrollWidth,
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      wideElements,
    }
  })

  expect(metrics.scrollWidth, JSON.stringify(metrics)).toBeLessThanOrEqual(metrics.innerWidth)
  expect(metrics.bodyScrollWidth, JSON.stringify(metrics)).toBeLessThanOrEqual(metrics.innerWidth)
  expect(metrics.wideElements, JSON.stringify(metrics)).toHaveLength(0)
}

test.describe('SitePulse Lab diagnostics', () => {
  test('renders the home page on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en')

    await expect(page).toHaveTitle(/SitePulse Lab/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Website health')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/sitepulse-lab/en',
    )
    await expect(page.getByRole('heading', { name: /Check if a website is up/ })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'HTTP Status Checker' })).toBeVisible()
    await expect(page.getByText('Free one-shot')).toHaveCount(7)
    await expect(page.getByText('7 focused checks')).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('sitepulse-home-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('runs the visual home report with sanitized analytics', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.route(/.*\/api\/v1\/sitepulse\/probe$/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            url: 'https://example.com',
            final_url: 'https://www.example.com',
            status: 'warn',
            summary: 'The page answered, but one or more website health signals should be reviewed.',
            findings: [
              { label: 'HTTP status', status: 'pass', detail: 'Final HTTP response status from the bounded probe.', value: 200 },
              { label: 'Redirect count', status: 'warn', detail: 'Redirect hops followed before the final response.', value: 1 },
              { label: 'Security headers present', status: 'pass', detail: 'Baseline browser security headers found on the final response.', value: 4 },
              { label: 'Security headers missing', status: 'warn', detail: 'content-security-policy should be reviewed.', value: 1 },
              { label: 'Robots.txt', status: 'pass', detail: 'Robots.txt returned HTTP 200.', value: 200 },
              { label: 'Sitemap XML', status: 'pass', detail: 'Sitemap XML shape was recognized.', value: 12 },
              { label: 'TTFB sample', status: 'pass', detail: 'Approximate first-byte/response timing sample from the bounded probe.', value: '420 ms' },
            ],
            checks: {
              status: { code: 200, content_type: 'text/html', duration_ms: 420 },
              headers: { present: ['strict-transport-security', 'x-frame-options'], missing: ['content-security-policy'] },
              robots: { status: 200, body_bytes_sampled: 120 },
              sitemap: { status: 200, xml_shape: 'urlset', url_count: 12 },
              ttfb: { duration_ms: 420 },
              performance: { redirect_count: 1, body_bytes_sampled: 4096 },
            },
            redirect_chain: [
              { url: 'https://example.com', status: 301, location: 'https://www.example.com', duration_ms: 80 },
              { url: 'https://www.example.com', status: 200, location: null, duration_ms: 420 },
            ],
            warnings: ['This is a single one-shot probe.'],
          },
          meta: {
            generated_at: '2026-06-28T00:00:00.000Z',
            cache_ttl_seconds: 30,
            cached: false,
          },
        }),
      })
    })

    await page.goto('/en')
    await page.getByLabel('Website URL').fill('https://private.example/admin')
    await page.getByRole('button', { name: 'Run visual report' }).click()

    await expect(page.getByText('Redirecting')).toBeVisible()
    await expect(page.getByText('Report cards')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Availability', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Security headers', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Crawlability', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Performance', exact: true })).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const analytics = await page.evaluate(() => ({
      localEvents: window.supersitesAnalyticsEvents,
      dataLayer: window.dataLayer,
      localStorageLength: window.localStorage.length,
      sessionStorageLength: window.sessionStorage.length,
    }))

    expect(analytics.localEvents?.map((event) => event.name)).toEqual(['tool_viewed', 'tool_started', 'tool_completed'])
    expect(analytics.localEvents?.[0]).toMatchObject({
      siteSlug: 'sitepulse-lab',
      routePath: '/en',
      properties: {
        tool_slug: 'visual-report',
      },
    })
    expect(JSON.stringify(analytics)).not.toContain('private.example')
    expect(JSON.stringify(analytics)).not.toContain('/admin')
    expect(analytics.localStorageLength).toBe(0)
    expect(analytics.sessionStorageLength).toBe(0)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('sitepulse-report-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('runs a status check with sanitized analytics', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.route(/.*\/api\/v1\/sitepulse\/probe$/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            url: 'https://example.com',
            final_url: 'https://example.com',
            status: 'pass',
            summary: 'The page answered with HTTP 200 and a bounded timing sample.',
            findings: [
              { label: 'HTTP status', status: 'pass', detail: 'Final response is in the 2xx range.', value: 200 },
              { label: 'Timing', status: 'pass', detail: 'TTFB sample was under the warning threshold.', value: '120 ms' },
            ],
            checks: {
              status: { code: 200, content_type: 'text/html', duration_ms: 120 },
              ttfb: { duration_ms: 120 },
              performance: { redirect_count: 0, body_bytes_sampled: 2048 },
            },
            redirect_chain: [],
            warnings: ['This is a single one-shot probe.'],
          },
          meta: {
            generated_at: '2026-06-27T00:00:00.000Z',
            cache_ttl_seconds: 30,
            cached: false,
          },
        }),
      })
    })

    await page.setViewportSize({ width: 390, height: 1040 })
    await page.goto('/en/tools/status-checker?url=https://private.example/admin')
    await page.getByLabel('Website URL').fill('https://private.example/admin')
    await page.getByRole('button', { name: 'Check status' }).click()

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('HTTP Status Checker')
    await expect(page.getByText('The page answered with HTTP 200')).toBeVisible()
    await expect(page.getByText('Pulse score')).toBeVisible()
    await expect(page.getByText('100')).toBeVisible()
    await expect(page.getByText('Signal checklist')).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Findings' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Technical details' })).toBeVisible()
    await page.getByRole('tab', { name: 'Findings' }).click()
    await expect(page.getByRole('cell', { name: 'HTTP status' })).toBeVisible()
    await page.getByRole('tab', { name: 'Technical details' }).click()
    await expect(page.getByRole('heading', { name: 'Redirect path' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Performance sample' })).toBeVisible()
    await expect(page.getByText('TTFB sample', { exact: true })).toBeVisible()
    await expect(page.getByText('Recommended actions')).toBeVisible()
    await expect(page.getByText('Workflow upgrade path')).toBeVisible()
    await expect(page.getByText('Related pages')).toBeVisible()
    await expect(page.locator('link[rel="alternate"]')).toHaveCount(6)
    await expectNoHorizontalOverflow(page)

    const analytics = await page.evaluate(() => ({
      localEvents: window.supersitesAnalyticsEvents,
      dataLayer: window.dataLayer,
      localStorageLength: window.localStorage.length,
      sessionStorageLength: window.sessionStorage.length,
    }))

    expect(analytics.localEvents?.map((event) => event.name)).toEqual(['tool_viewed', 'tool_started', 'tool_completed'])
    expect(analytics.localEvents?.[0]).toMatchObject({
      siteSlug: 'sitepulse-lab',
      routePath: '/en/tools/status-checker',
      properties: {
        tool_slug: 'status-checker',
      },
    })
    expect(JSON.stringify(analytics)).not.toContain('private.example')
    expect(JSON.stringify(analytics)).not.toContain('/admin')
    expect(analytics.localStorageLength).toBe(0)
    expect(analytics.sessionStorageLength).toBe(0)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('sitepulse-status-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders redirect and headers checks without leaking target inputs', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.route(/.*\/api\/v1\/sitepulse\/probe$/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            url: 'https://example.com',
            final_url: 'https://example.com/final',
            status: 'warn',
            summary: 'Redirect chain completed with two hops and a missing CSP header.',
            findings: [
              { label: 'Redirect count', status: 'warn', detail: 'Two hops were followed.', value: 2 },
              { label: 'Content-Security-Policy', status: 'warn', detail: 'CSP was not present.' },
            ],
            checks: {
              redirects: { count: 2, final_status: 200 },
              status: { code: 200, content_type: 'text/html', duration_ms: 320 },
              headers: {
                present: ['strict-transport-security', 'cache-control'],
                missing: ['content-security-policy'],
                technologies: ['CDN cache hint'],
              },
              ttfb: { duration_ms: 320 },
              performance: { redirect_count: 2, body_bytes_sampled: 4096 },
            },
            redirect_chain: [
              { url: 'https://example.com', status: 301, location: 'https://www.example.com' },
              { url: 'https://www.example.com', status: 200, location: null },
            ],
            warnings: ['Redirect traces are capped.'],
          },
          meta: {
            generated_at: '2026-06-27T00:00:00.000Z',
            cache_ttl_seconds: 30,
            cached: false,
          },
        }),
      })
    })

    await page.goto('/en/tools/redirect-chain')
    await page.getByLabel('Website URL').fill('https://secret.example/private')
    await page.getByRole('button', { name: 'Trace redirects' }).click()
    await expect(page.getByText('Redirect chain completed')).toBeVisible()
    await page.getByRole('tab', { name: 'Findings' }).click()
    await expect(page.getByRole('cell', { name: 'Redirect count' })).toBeVisible()
    await page.getByRole('tab', { name: 'Technical details' }).click()
    await expect(page.getByRole('heading', { name: 'Redirect path' })).toBeVisible()
    await expect(page.getByText('https://www.example.com').first()).toBeVisible()
    await expectNoHorizontalOverflow(page)
    expect(JSON.stringify(await page.evaluate(() => window.supersitesAnalyticsEvents))).not.toContain('secret.example')

    await page.setViewportSize({ width: 390, height: 1180 })
    await page.goto('/en/tools/security-headers')
    await page.getByLabel('Website URL').fill('https://headers-secret.example/login')
    await page.getByRole('button', { name: 'Check headers' }).click()
    await expect(page.getByText('Pulse score')).toBeVisible()
    await page.getByRole('tab', { name: 'Findings' }).click()
    await expect(page.getByRole('cell', { name: 'Content-Security-Policy' })).toBeVisible()
    await page.getByRole('tab', { name: 'Technical details' }).click()
    await expect(page.getByRole('heading', { name: 'Header matrix' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Technology clues' })).toBeVisible()
    await expect(page.getByText('Cache/CDN hint')).toBeVisible()
    await expect(page.getByText('Workflow upgrade path')).toBeVisible()
    await expectNoHorizontalOverflow(page)
    expect(JSON.stringify(await page.evaluate(() => window.supersitesAnalyticsEvents))).not.toContain('headers-secret.example')

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('sitepulse-headers-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders localized privacy page on mobile', async ({ page }) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/privacy')

    await expect(page).toHaveTitle(/Privacy Policy|Privacidade/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
    await expect(page.getByLabel('Legal and editorial pages').getByRole('link', { name: 'Metodologia' })).toBeVisible()
    await expect(page.getByLabel('Legal and editorial pages').getByRole('link', { name: 'Status' })).toBeVisible()
    await expectNoHorizontalOverflow(page)

    expect(errors).toEqual([])
  })
})
