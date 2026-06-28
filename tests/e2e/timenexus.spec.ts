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

test.describe('TimeNexus MVP', () => {
  test('renders the home page on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en')

    await expect(page).toHaveTitle(/TimeNexus/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Time, date and unit helpers')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/timenexus/en',
    )
    await expect(page.getByRole('heading', { name: 'Time Zone Converter' })).toBeVisible()
    await expect(page.getByText('7 browser tools')).toBeVisible()
    await expect(page.getByText('Local').first()).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('timenexus-home-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('converts a time zone instant and records sanitized analytics', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/en/tools/timezone-converter?date=secret')

    await page.getByLabel('ISO date-time or UTC instant').fill('2026-06-26T15:30:00Z')
    await page.getByLabel(/Zones/).fill('America/New_York -> Europe/London')
    await page.getByRole('button', { name: 'Run tool' }).click()

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Time Zone Converter')
    await expect(page.getByRole('heading', { name: 'Direct answer' })).toBeVisible()
    await expect(page.locator('.answer-primary')).toContainText('Europe/London')
    await expect(page.getByRole('heading', { name: 'Meeting timeline' })).toBeVisible()
    await expect(page.locator('.timeline-list')).toContainText('America/New_York')
    await expect(page.locator('.result-output')).toContainText('Europe/London')
    await expect(page.getByRole('heading', { name: 'Related tools' })).toBeVisible()
    await expect(page.getByRole('link', { name: /Date Difference Calculator/ })).toBeVisible()
    await expect(page.getByRole('listitem').filter({ hasText: 'Embeddable widgets' })).toBeVisible()
    await expect(page.locator('link[rel="alternate"]')).toHaveCount(6)
    await expectNoHorizontalOverflow(page)

    const analytics = await page.evaluate(() => ({
      localEvents: window.supersitesAnalyticsEvents,
      dataLayer: window.dataLayer,
      localStorageLength: window.localStorage.length,
      sessionStorageLength: window.sessionStorage.length,
    }))

    expect(analytics.localEvents).toHaveLength(3)
    expect(analytics.localEvents?.[0]).toMatchObject({
      name: 'tool_viewed',
      siteSlug: 'timenexus',
      routePath: '/en/tools/timezone-converter',
      properties: {
        tool_slug: 'timezone-converter',
      },
    })
    expect(analytics.localEvents?.[1]).toMatchObject({
      name: 'tool_started',
      properties: {
        tool_slug: 'timezone-converter',
      },
    })
    expect(analytics.localEvents?.[2]).toMatchObject({
      name: 'tool_completed',
      properties: {
        tool_slug: 'timezone-converter',
      },
    })
    expect(JSON.stringify(analytics.localEvents)).not.toContain('2026-06-26T15:30:00Z')
    expect(JSON.stringify(analytics.dataLayer)).not.toContain('secret')
    expect(analytics.localStorageLength).toBe(0)
    expect(analytics.sessionStorageLength).toBe(0)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('timenexus-zone-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders localized unit and privacy pages on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/tools/unit-converter')

    await expect(page).toHaveTitle(/Conversor de unidades/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Conversor de unidades')
    await expect(page.getByLabel('Value')).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
    await expectNoHorizontalOverflow(page)

    await page.goto('/en/privacy')
    await expect(page).toHaveTitle(/Privacy Policy/)
    await expect(page.getByText('Data minimization')).toBeVisible()
    await expect(page.getByLabel('Legal and editorial pages').getByRole('link', { name: 'Methodology' })).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('timenexus-privacy-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })
})
