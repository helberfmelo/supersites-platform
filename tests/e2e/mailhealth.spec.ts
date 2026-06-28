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

test.describe('MailHealth MVP', () => {
  test('renders the home page on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en')

    await expect(page).toHaveTitle(/MailHealth/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Email authentication')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/mailhealth/en',
    )
    await expect(page.getByRole('heading', { name: 'SPF Checker' })).toBeVisible()
    await expect(page.getByText('Local free version')).toHaveCount(7)
    await expect(page.getByText('7 focused checks')).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('mailhealth-home-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('runs an SPF check with sanitized analytics', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.route(/.*\/api\/v1\/mailhealth\/dns$/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            check: 'spf',
            domain: 'example.com',
            status: 'pass',
            summary: 'SPF record found and parsed.',
            findings: [
              { label: 'SPF record count', status: 'pass', detail: 'Exactly one SPF record was found.', value: 1 },
              { label: 'All mechanism', status: 'pass', detail: 'SPF ends with -all.' },
            ],
            records: [{ type: 'TXT', value: 'v=spf1 include:_spf.example.net -all' }],
            warnings: ['DNS checks are point-in-time.'],
          },
          meta: {
            generated_at: '2026-06-27T00:00:00.000Z',
            cache_ttl_seconds: 120,
            cached: false,
          },
        }),
      })
    })

    await page.setViewportSize({ width: 390, height: 1040 })
    await page.goto('/en/tools/spf-checker?domain=secret.example')
    await page.getByLabel('Domain name').fill('secret.example')
    await page.getByRole('button', { name: 'Run SPF check' }).click()

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('SPF Checker')
    await expect(page.getByText('SPF record found and parsed.')).toBeVisible()
    await expect(page.getByText('Health score')).toBeVisible()
    await expect(page.getByText('100')).toBeVisible()
    await expect(page.getByText('Signal checklist')).toBeVisible()
    await expect(page.getByRole('cell', { name: 'SPF record count' })).toBeVisible()
    await expect(page.getByText('Record builders planned')).toBeVisible()
    await expect(page.getByText('Related checks')).toBeVisible()
    await expect(page.getByRole('link', { name: /DMARC Checker/ })).toBeVisible()
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
      siteSlug: 'mailhealth',
      routePath: '/en/tools/spf-checker',
      properties: {
        tool_slug: 'spf-checker',
      },
    })
    expect(JSON.stringify(analytics)).not.toContain('secret.example')
    expect(analytics.localStorageLength).toBe(0)
    expect(analytics.sessionStorageLength).toBe(0)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('mailhealth-spf-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('runs SMTP and header checks without leaking inputs to analytics', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.route(/.*\/api\/v1\/mailhealth\/smtp$/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            check: 'smtp',
            domain: 'example.com',
            status: 'pass',
            summary: 'SMTP TCP reachability succeeded for the sampled MX host.',
            findings: [
              { label: 'MX host selected', status: 'pass', detail: 'The lowest-priority MX host was selected.', value: 'mail.example.com' },
              { label: 'TCP status', status: 'pass', detail: 'TCP only; no mail sent.', value: 'open' },
            ],
            records: [{ type: 'MX', priority: 10, target: 'mail.example.com' }],
            probes: [{ mx_host: 'mail.example.com', address: '93.184.216.34', port: 25, tcp_status: 'open', latency_ms: 42 }],
            warnings: ['SMTP checks are limited.'],
          },
          meta: {
            generated_at: '2026-06-27T00:00:00.000Z',
            cache_ttl_seconds: 60,
            cached: false,
          },
        }),
      })
    })

    await page.goto('/en/tools/smtp-check')
    await page.getByLabel('Domain name').fill('smtp-secret.example')
    await page.getByRole('button', { name: 'Run SMTP check' }).click()
    await expect(page.getByText('SMTP TCP reachability succeeded')).toBeVisible()
    await expect(page.getByText('open').first()).toBeVisible()
    await expectNoHorizontalOverflow(page)
    expect(JSON.stringify(await page.evaluate(() => window.supersitesAnalyticsEvents))).not.toContain('smtp-secret.example')

    await page.setViewportSize({ width: 390, height: 1180 })
    await page.goto('/en/tools/header-analyzer')
    await page.getByLabel('Paste raw message headers').fill([
      'Authentication-Results: mx.example; spf=pass smtp.mailfrom=private.example; dkim=pass header.d=private.example; dmarc=pass header.from=private.example',
      'From: Private Sender <sender@private.example>',
      'Return-Path: <bounce@private.example>',
      'DKIM-Signature: v=1; d=private.example; s=default; b=sample',
    ].join('\n'))
    await page.getByRole('button', { name: 'Analyze headers' }).click()
    await expect(page.getByText('Headers show mostly healthy authentication signals.')).toBeVisible()
    await expect(page.getByText('Health score')).toBeVisible()
    await expect(page.getByText('Signal checklist')).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Visible alignment' })).toBeVisible()
    await expect(page.getByText('Record builders planned')).toBeVisible()
    await expectNoHorizontalOverflow(page)
    expect(JSON.stringify(await page.evaluate(() => window.supersitesAnalyticsEvents))).not.toContain('private.example')

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('mailhealth-headers-mobile', { body: screenshot, contentType: 'image/png' })

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
