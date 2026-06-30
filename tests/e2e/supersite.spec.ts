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
    await expect(page.locator('.page-footer__links--legal a')).toHaveCount(8)
    await expect(page.getByLabel(/Páginas legais e editoriais/).getByRole('link', { name: 'Status' })).toBeVisible()
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)
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
    await expect(page.locator('.footer-verticals').getByRole('link', { name: 'JSON Formatter' })).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/devutility-lab/en/tools/structured-data-formatter',
    )
    await expect(page.locator('.footer-verticals').getByRole('link', { name: 'PDF Merge' })).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/docshift/en/tools/pdf-merge',
    )
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('editorial-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the benchmark-grade tool finder and records sanitized outbound site clicks', async ({
    page,
  }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en')
    await dismissConsentBanner(page)
    await expect(page.getByRole('heading', { name: 'Find the right web tool in seconds.' })).toBeVisible()
    await expect(page.getByRole('search', { name: 'Search the catalog' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Free tools ready to use' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Choose by workflow' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Explore focused tool suites' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Support the free network' })).toBeVisible()
    await expect(page.locator('.trust-row').getByText('No account required')).toBeVisible()
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(3)
    await expect(page.locator('.tool-shortcut-card[href="https://opentshost.com/supersites/netprobe-atlas/en/tools/what-is-my-ip"]')).toBeVisible()
    await expect(page.locator('.footer-verticals a[href="https://opentshost.com/supersites/docshift/en/tools/pdf-merge"]')).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Available')
    await expect(page.locator('main')).not.toContainText('Preview')
    await expect(page.locator('main')).not.toContainText('Upgrade path')
    await expect(page.locator('main')).not.toContainText('10 utility sites live')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('hub-tool-finder-desktop', { body: screenshot, contentType: 'image/png' })

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

  test('renders the benchmark-grade tool finder in Portuguese on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Encontre a ferramenta certa em segundos.' })).toBeVisible()
    await expect(page.getByRole('search', { name: 'Buscar no catálogo' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Ferramentas gratuitas prontas para uso' })).toBeVisible()
    await expect(page.locator('.trust-row').getByText('Sem cadastro obrigatório')).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Available')
    await expect(page.locator('main')).not.toContainText('Preview')
    await expect(page.locator('main')).not.toContainText('Upgrade path')
    await expect(page.locator('main')).not.toContainText('Search the catalog')
    await expect(page.locator('main')).not.toContainText('Public API live')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('hub-tool-finder-pt-mobile', { body: screenshot, contentType: 'image/png' })

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

  test('renders the NetProbe catalog page as a benchmark-grade network landing', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/sites/netprobe-atlas')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Network diagnostics you can start now.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Start a network check' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'NetProbe tools' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'For everyone' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'For technical teams' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'For ongoing monitoring' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'DNS Tools' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'IP Tools' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Domain Tools' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'SSL Tools' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Guides' })).toBeVisible()

    for (const path of [
      'what-is-my-ip',
      'dns-propagation',
      'dns-lookup',
      'rdap-domain-lookup',
      'ssl-certificate-checker',
      'port-checker',
      'ping-traceroute',
    ]) {
      await expect(
        page.locator(`.netprobe-tool-grid a[href="https://opentshost.com/supersites/netprobe-atlas/en/tools/${path}"]`),
      ).toBeVisible()
    }

    await expect(page.locator('main')).not.toContainText('Review notes')
    await expect(page.locator('main')).not.toContainText('Available')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('Quality check')
    await expect(page.locator('main')).not.toContainText('Public API live')
    await expect(page.locator('main')).not.toContainText('billing disabled')
    await expect(page.locator('main')).not.toContainText('ads planned')
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('netprobe-catalog-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized NetProbe catalog page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/sites/netprobe-atlas')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Diagnósticos de rede para começar agora.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Comece uma verificação de rede' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Ferramentas NetProbe' })).toBeVisible()
    await expect(
      page.locator('.netprobe-tool-grid a[href="https://opentshost.com/supersites/netprobe-atlas/pt-br/tools/what-is-my-ip"]'),
    ).toBeVisible()
    await expect(
      page.locator('.netprobe-tool-grid a[href="https://opentshost.com/supersites/netprobe-atlas/pt-br/tools/dns-propagation"]'),
    ).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Network diagnostics you can start now.')
    await expect(page.locator('main')).not.toContainText('Review notes')
    await expect(page.locator('main')).not.toContainText('Available')
    await expect(page.locator('main')).not.toContainText('Public API live')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('netprobe-catalog-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the CalcHarbor catalog page as a benchmark-grade calculator landing', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/sites/calcharbor')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Find the right calculator before the spreadsheet.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Calculator finder' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Search calculators' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Popular business calculators' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'All published calculators' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Next calculator areas' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Finance calculators' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Business calculators', exact: true })).toBeVisible()

    for (const path of [
      'loan-payment',
      'compound-interest',
      'savings-goal',
      'break-even-point',
      'gross-margin',
      'cash-runway',
      'discount-price',
      'roi',
    ]) {
      await expect(
        page.locator(`.calcharbor-tool-grid a[href="https://opentshost.com/supersites/calcharbor/en/calculators/${path}"]`),
      ).toBeVisible()
    }

    await page.getByRole('searchbox', { name: 'Search calculators' }).fill('roi')
    await expect(page.locator('#calcharbor-all .calcharbor-tool-card').filter({ hasText: 'ROI Calculator' })).toBeVisible()
    await expect(page.locator('#calcharbor-all .calcharbor-tool-card').filter({ hasText: 'Loan Payment' })).toHaveCount(0)

    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('Quality check')
    await expect(page.locator('main')).not.toContainText('Workflow checks ready')
    await expect(page.locator('main')).not.toContainText('checkout inactive')
    await expect(page.locator('main')).not.toContainText('billing disabled')
    await expect(page.locator('main')).not.toContainText('ads planned')
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('calcharbor-catalog-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized CalcHarbor catalog page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/sites/calcharbor')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Encontre a calculadora certa antes da planilha.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Buscador de calculadoras' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Buscar calculadoras' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Calculadoras empresariais populares' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Todas as calculadoras publicadas' })).toBeVisible()
    await expect(
      page.locator('.calcharbor-tool-grid a[href="https://opentshost.com/supersites/calcharbor/pt-br/calculators/loan-payment"]'),
    ).toBeVisible()
    await expect(
      page.locator('.calcharbor-tool-grid a[href="https://opentshost.com/supersites/calcharbor/pt-br/calculators/roi"]'),
    ).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Find the right calculator before the spreadsheet.')
    await expect(page.locator('main')).not.toContainText('Workflow checks ready')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('calcharbor-catalog-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })
})
