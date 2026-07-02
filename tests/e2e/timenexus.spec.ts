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
    await expect(page.getByRole('heading', { name: 'Plan one meeting across cities before opening the catalog.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Current time panel' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Meeting planner' })).toBeVisible()
    await expect(page.locator('#world-clock-title')).toHaveText('World clock')
    await expect(page.getByRole('heading', { name: 'Nearby slots' })).toBeVisible()
    await expect(page.getByLabel('Local meeting time')).toHaveValue(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
    await expect(page.locator('.planner-answer')).toContainText(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/)
    await expect(page.locator('.zone-grid')).toContainText('London')
    await expect(page.locator('.zone-grid')).toContainText(/Business hours|Early|Late/)
    await page.getByLabel('City group').selectOption('global-product')
    await expect(page.locator('.zone-grid')).toContainText('Tokyo')
    await expect(page.getByRole('link', { name: 'Open city comparison' })).toHaveAttribute(
      'href',
      '/en/world-clock/global-product',
    )
    await page.getByLabel('Duration').selectOption('90')
    await expect(page.getByLabel('Duration')).toHaveValue('90')
    await expect(page.getByRole('heading', { name: 'Time Zone Converter' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Operating principles' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Immediate answer' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'World Clock, Time Zones, Calendar, Calculators and Timers' })).toBeVisible()
    await expect(page.getByText('Browser-side').first()).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Curated city clocks' })).toBeVisible()
    await expect(page.locator('a.city-card[href="/en/world-clock/cities/tokyo"]')).toHaveAttribute(
      'href',
      '/en/world-clock/cities/tokyo',
    )
    await expectNoHorizontalOverflow(page)

    const homeState = await page.evaluate(() => ({
      localStorageLength: window.localStorage.length,
      sessionStorageLength: window.sessionStorage.length,
      analytics: window.supersitesAnalyticsEvents ?? [],
      bodyText: document.body.innerText,
    }))
    expect(homeState.localStorageLength).toBe(0)
    expect(homeState.sessionStorageLength).toBe(0)
    expect(homeState.analytics).toHaveLength(0)
    expect(homeState.bodyText).not.toContain('secret')

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('timenexus-home-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('converts a time zone instant and records sanitized analytics', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/en/tools/timezone-converter?date=secret')

    await page.getByLabel('Local time or UTC instant').fill('2026-06-26T15:30:00Z')
    await page.getByLabel('Source zone').selectOption('America/New_York')
    await page.getByLabel('Target zone').selectOption('Europe/London')
    await page.getByRole('button', { name: 'Convert time' }).click()

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Time Zone Converter')
    await expect(page.getByRole('heading', { name: 'Direct answer' })).toBeVisible()
    await expect(page.locator('.answer-primary')).toContainText('Europe/London')
    await expect(page.getByRole('heading', { name: 'Meeting timeline' })).toBeVisible()
    await expect(page.locator('.timeline-list')).toContainText('America/New_York')
    await expect(page.locator('.result-output')).toContainText('Europe/London')
    await expect(page.locator('.copy-card').filter({ hasText: 'Europe/London' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Copy link' })).toBeVisible()
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
    await expect(page).toHaveTitle(/TimeNexus privacy/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('TimeNexus privacy')
    await expect(page.getByRole('heading', { name: 'Data used by the tool' })).toBeVisible()
    await expect(page.getByLabel('Legal and editorial pages').getByRole('link', { name: 'Methodology' })).toBeVisible()
    await expectNoHorizontalOverflow(page)

    await page.goto('/en/world-clock/global-product')
    await expect(page).toHaveTitle(/World clock for Global product team/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/timenexus/en/world-clock/global-product',
    )
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('World clock for Global product team')
    await expect(page.getByLabel('City group')).toHaveValue('global-product')
    await expect(page.locator('.zone-grid')).toContainText('Tokyo')
    await expect(page.getByRole('heading', { name: 'Cities and IANA zones covered' })).toBeVisible()
    await expectNoHorizontalOverflow(page)

    await page.goto('/en/world-clock/cities/tokyo')
    await expect(page).toHaveTitle(/Tokyo time zone and meeting planner/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/timenexus/en/world-clock/cities/tokyo',
    )
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Tokyo time zone and meeting planner')
    await expect(page.getByText('Asia/Tokyo').first()).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Business-day timeline' })).toBeVisible()
    await expect(page.locator('.city-timeline')).toContainText('09:00')
    await expect(page.getByRole('heading', { name: '09:00 local overlap' })).toBeVisible()
    await expect(page.locator('.city-overlap-grid')).toContainText('San Francisco')
    await expect(page.getByLabel('City group')).toHaveValue('global-product')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('timenexus-privacy-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })
})
