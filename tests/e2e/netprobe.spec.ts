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

test.describe('NetProbe Atlas public foundation', () => {
  test('renders the home page on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en')

    await expect(page).toHaveTitle(/NetProbe Atlas/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Network facts')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/netprobe-atlas/en',
    )
    await expect(page.getByRole('heading', { name: 'DNS Lookup' })).toBeVisible()
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('netprobe-home-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the DNS tool page and records sanitized preview analytics', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/en/tools/dns-lookup')
    await page.getByLabel('Domain name').fill('secret.example')
    await page.getByRole('button', { name: 'Preview result' }).click()

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('DNS Lookup')
    await expect(page.getByText('Record rows will show type')).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/netprobe-atlas/en/tools/dns-lookup',
    )
    await expectNoHorizontalOverflow(page)

    const analytics = await page.evaluate(() => ({
      localEvents: window.supersitesAnalyticsEvents,
      dataLayer: window.dataLayer,
    }))

    expect(analytics.localEvents).toHaveLength(1)
    expect(analytics.localEvents?.[0]).toMatchObject({
      name: 'tool_started',
      siteSlug: 'netprobe-atlas',
      routePath: '/en/tools/dns-lookup',
      properties: {
        tool_slug: 'dns-lookup',
      },
    })
    expect(JSON.stringify(analytics)).not.toContain('secret.example')

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('netprobe-dns-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the privacy page on mobile', async ({ page }) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/en/privacy')

    await expect(page).toHaveTitle(/Privacy Policy/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Privacy Policy')
    await expect(page.getByLabel('Legal and editorial pages').getByRole('link', { name: 'Methodology' })).toBeVisible()
    await expect(page.locator('.page-footer a')).toHaveCount(8)
    await expectNoHorizontalOverflow(page)

    expect(errors).toEqual([])
  })
})
