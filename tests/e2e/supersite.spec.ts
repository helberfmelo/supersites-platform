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

async function dismissConsentBanner(page: Page) {
  const button = page.getByRole('button', {
    name: /Essential only|Somente essenciais|Solo esenciales|Essentiels seulement|Nur notwendige/i,
  })

  if (await button.isVisible().catch(() => false)) {
    await button.click()
  }
}

test.describe('SuperSites public hub', () => {
  test('renders the localized privacy page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/privacy')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/SuperSites/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Privacidade')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/pt-br/privacy',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)
    await expect(page.locator('.page-footer a')).toHaveCount(8)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('privacy-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the editorial policy page on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/editorial-policy')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/Editorial Policy/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Editorial Policy')
    await expect(page.getByLabel('Legal and editorial pages').getByRole('link', { name: 'Privacy' })).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/en/editorial-policy',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('editorial-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('records sanitized outbound site clicks in the local data layer', async ({ page }) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en')
    await dismissConsentBanner(page)
    await page.evaluate(() => {
      window.addEventListener('click', (event) => event.preventDefault(), { capture: true })
    })

    await page.locator('a[href="https://opentshost.com/supersites/netprobe-atlas/"]').first().click()

    const analytics = await page.evaluate(() => ({
      localEvents: window.supersitesAnalyticsEvents,
      dataLayer: window.dataLayer,
    }))

    expect(analytics.localEvents).toHaveLength(1)
    expect(analytics.localEvents?.[0]).toMatchObject({
      name: 'outbound_site_click',
      siteSlug: 'netprobe-atlas',
      routePath: '/en',
      properties: {
        target_url: '/supersites/netprobe-atlas',
      },
    })
    expect(analytics.dataLayer?.find((entry) => entry.event === 'outbound_site_click')).toMatchObject({
      event: 'outbound_site_click',
    })
    expect(JSON.stringify(analytics)).not.toContain('?')
    expect(errors).toEqual([])
  })

  test('renders CMP controls and inert ad placeholders without external ad scripts', async ({ page }) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en')

    const banner = page.getByTestId('consent-banner')
    const adSlot = page.getByTestId('ad-placeholder-hub-home-footer-leaderboard')

    await expect(banner).toBeVisible()
    await expect(adSlot).toBeVisible()
    await expect(adSlot).toHaveAttribute('data-ad-status', 'blocked-consent')

    const reservedBox = await adSlot.boundingBox()
    expect(reservedBox?.height).toBeGreaterThanOrEqual(100)

    await page.getByRole('button', { name: 'Customize' }).click()
    await page.getByLabel('Analytics storage').check()
    await page.getByLabel('Advertising storage').check()
    await page.getByRole('button', { name: 'Save choices' }).click()

    await expect(banner).toBeHidden()
    await expect(adSlot).toHaveAttribute('data-ad-status', 'delivery-disabled')

    const consent = await page.evaluate(() => ({
      stored: window.localStorage.getItem('supersites.consent.v1'),
      dataLayer: window.dataLayer,
    }))

    expect(consent.stored).toContain('"analytics":true')
    expect(consent.stored).toContain('"ads":true')
    expect(consent.dataLayer?.some((entry) => entry.event === 'supersites_consent_update')).toBe(true)
    expect(JSON.stringify(consent)).not.toContain('@')
    await expect(page.locator('script[src*="adsbygoogle"]')).toHaveCount(0)
    await expect(page.locator('iframe[src*="googleads"]')).toHaveCount(0)
    expect(errors).toEqual([])
  })

  test('keeps legal pages free of ad placements', async ({ page }) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/privacy')
    await dismissConsentBanner(page)

    await expect(page.locator('[data-ad-slot-id]')).toHaveCount(0)
    await expect(page.locator('script[src*="adsbygoogle"]')).toHaveCount(0)
    expect(errors).toEqual([])
  })

  test('shows the local NetProbe tools shortcut from the site detail page', async ({ page }) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/sites/netprobe-atlas')
    await dismissConsentBanner(page)

    const localToolsLink = page.getByRole('link', { name: 'Open local NetProbe tools' })

    await expect(localToolsLink).toBeVisible()
    await expect(localToolsLink).toHaveAttribute('href', 'http://127.0.0.1:3002/en/tools/dns-lookup')
    await expect(page.getByRole('link', { name: 'Open public placeholder' })).toBeVisible()
    expect(errors).toEqual([])
  })
})
