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
    await expect(page.getByRole('heading', { name: 'Categorias de dados' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Entradas das ferramentas' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Analytics e publicidade' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Cookies e preferências' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Retenção e segurança' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Direitos e contato' })).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/pt-br/privacy',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)
    await expect(page.locator('.page-footer__links--legal a')).toHaveCount(8)
    await expect(page.getByLabel(/Páginas legais e editoriais/).getByRole('link', { name: 'Status' })).toBeVisible()
    await expect(page.locator('main')).not.toContainText(
      /\bshould\b|plans to|planned|human review|legal review|paid accounts launch|final public launch|public review|revisão jurídica|revisão humana|\bdeve\b|\bdevem\b|\bprecisa\b|\bprecisam\b/i,
    )
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('privacy-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the Privacy Policy as a complete public policy on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/privacy')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/Privacy Policy/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Privacy Policy')
    await expect(page.getByRole('heading', { name: 'Data categories' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Tool inputs' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Analytics and advertising' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Cookies and preferences' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Retention and security' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Rights and contact' })).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/en/privacy',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)
    await expect(page.locator('main')).not.toContainText(
      /\bshould\b|plans to|planned|human review|legal review|paid accounts launch|final public launch|public review/i,
    )
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)

    const schemaType = await page.locator('script[type="application/ld+json"]').evaluate((script) => {
      const schema = JSON.parse(script.textContent || '{}')

      return schema['@type']
    })

    expect(schemaType).toBe('PrivacyPolicy')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('privacy-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the Cookie Policy with a working preferences link on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/cookies')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/Cookie Policy/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cookie Policy')
    await expect(page.getByRole('heading', { name: 'Cookie categories' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Necessary storage' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Preference storage' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Analytics storage' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Advertising storage' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Managing preferences' })).toBeVisible()
    await expect(page.getByRole('link', { name: /Manage privacy choices/ })).toHaveAttribute(
      'href',
      '#consent-preferences',
    )
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/en/cookies',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)
    await expect(page.locator('main')).not.toContainText(
      /plans to|planned|launch|rollout|public review|human review|quality checks|policy checks|\bshould\b|\bmust\b/i,
    )
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)

    await page.getByRole('link', { name: /Manage privacy choices/ }).click()
    const banner = page.getByTestId('consent-banner')
    await expect(banner).toBeVisible()
    await expect(page.getByLabel('Preference storage')).toBeVisible()
    await expect(page.getByLabel('Analytics storage')).toBeVisible()
    await expect(page.getByLabel('Advertising storage')).toBeVisible()

    const schemaType = await page.locator('script[type="application/ld+json"]').evaluate((script) => {
      const schema = JSON.parse(script.textContent || '{}')

      return schema['@type']
    })

    expect(schemaType).toBe('WebPage')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('cookies-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized Cookie Policy on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/cookies')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/Política de Cookies/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Política de Cookies')
    await expect(page.getByRole('heading', { name: 'Categorias de cookies' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Armazenamento necessário' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Preferências locais' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Armazenamento de analytics' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Armazenamento de publicidade' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Gerenciar preferências' })).toBeVisible()
    await expect(page.getByRole('link', { name: /Gerenciar escolhas de privacidade/ })).toHaveAttribute(
      'href',
      '#consent-preferences',
    )
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/pt-br/cookies',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)
    await expect(page.locator('main')).not.toContainText(
      /plans to|planned|launch|rollout|public review|human review|quality checks|policy checks|planeja|lançamento|revisão pública|revisão humana|\bdeve\b|\bdevem\b/i,
    )
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('cookies-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the Terms of Use as complete public terms on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/terms')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/Terms of Use/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Terms of Use')
    await expect(page.getByRole('heading', { name: 'Permitted use' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Abuse and prohibited activity' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Tool limits' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Information and results' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Future paid services' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Responsibility and contact' })).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/en/terms',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)
    await expect(page.locator('main')).not.toContainText(
      /catalog phase|launched|launch|rollout|public review|human review|legal review|quality checks|release checks|rollback|worker planned|billing disabled|ads planned|plans to|planned|\bshould\b|\bmust\b/i,
    )
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)

    const schemaType = await page.locator('script[type="application/ld+json"]').evaluate((script) => {
      const schema = JSON.parse(script.textContent || '{}')

      return schema['@type']
    })

    expect(schemaType).toBe('TermsOfService')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('terms-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized Terms of Use on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/terms')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/Termos de Uso/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Termos de Uso')
    await expect(page.getByRole('heading', { name: 'Uso permitido' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Abuso e atividades proibidas' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Limites das ferramentas' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Informações e resultados' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Serviços pagos futuros' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Responsabilidade e contato' })).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/pt-br/terms',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)
    await expect(page.locator('main')).not.toContainText(
      /fase do catálogo|lançamento|revisão pública|revisão humana|revisão jurídica|planeja|planejado|\bdeve\b|\bdevem\b|human review|legal review|quality checks|billing disabled|ads planned/i,
    )
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('terms-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the Methodology page as result-focused public guidance on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/methodology')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/Methodology/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Methodology')
    const contentHeadings = page.locator('.content-section h3')
    await expect(contentHeadings.filter({ hasText: 'Network and DNS' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Calculators' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Documents and PDF' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Images' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Email deliverability' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Website checks' })).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/en/methodology',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)
    await expect(page.locator('main')).not.toContainText(
      /launch|rollout|roadmap|public readiness|public review|human review|legal review|quality checks|release checks|rollback|adsense|billing disabled|ads planned|plans to|planned|\bshould\b|\bmust\b/i,
    )
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)

    const schemaType = await page.locator('script[type="application/ld+json"]').evaluate((script) => {
      const schema = JSON.parse(script.textContent || '{}')

      return schema['@type']
    })

    expect(schemaType).toBe('WebPage')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('methodology-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized Methodology page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/methodology')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/Metodologia/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Metodologia')
    const contentHeadings = page.locator('.content-section h3')
    await expect(contentHeadings.filter({ hasText: 'Rede e DNS' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Calculadoras' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Documentos e PDF' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Imagens' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Entregabilidade de e-mail' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Checagens de website' })).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/pt-br/methodology',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)
    await expect(page.locator('main')).not.toContainText(
      /lançamento|prontidão|roteiro|revisão pública|revisão humana|revisão jurídica|planeja|planejado|\bdeve\b|\bdevem\b|human review|legal review|quality checks|billing disabled|ads planned/i,
    )
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('methodology-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the editorial policy page on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/editorial-policy')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/Editorial Policy/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Editorial Policy')
    const contentHeadings = page.locator('.content-section h3')
    await expect(contentHeadings.filter({ hasText: 'Useful content' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Review and updates' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Corrections' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Translations' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Sources and examples' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Quality standards' })).toBeVisible()
    await expect(page.getByRole('link', { name: /Send a correction/i })).toHaveAttribute(
      'href',
      'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Editorial%20correction',
    )
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
    await expect(page.locator('main')).not.toContainText(
      /launch status|roadmap|public readiness|human review|legal review|quality checks|release checks|rollback|billing disabled|ads planned|plans to|planned|\bshould\b|\bmust\b/i,
    )
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)

    const schemaType = await page.locator('script[type="application/ld+json"]').evaluate((script) => {
      const schema = JSON.parse(script.textContent || '{}')

      return schema['@type']
    })

    expect(schemaType).toBe('WebPage')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('editorial-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized Editorial Policy on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/editorial-policy')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/Política Editorial/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Política Editorial')
    const contentHeadings = page.locator('.content-section h3')
    await expect(contentHeadings.filter({ hasText: 'Conteúdo útil' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Revisão e atualizações' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Correções' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Traduções' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Fontes e exemplos' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Padrões de qualidade' })).toBeVisible()
    await expect(page.getByRole('link', { name: /Enviar correção/i })).toHaveAttribute(
      'href',
      'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Editorial%20correction',
    )
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/pt-br/editorial-policy',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)
    await expect(page.locator('main')).not.toContainText(
      /status de lançamento|roteiro|prontidão|revisão humana|revisão jurídica|checagens de qualidade|planeja|planejado|\bdeve\b|\bdevem\b|human review|legal review|quality checks|billing disabled|ads planned/i,
    )
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('editorial-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the Public Status page as visitor availability guidance on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/status')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/Public Status/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Public Status')
    const contentHeadings = page.locator('.content-section h3')
    await expect(page.locator('main .network-panel')).toHaveCount(0)
    await expect(contentHeadings.filter({ hasText: 'Current availability' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Known incidents' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Maintenance windows' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Useful checks' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Contact' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'What this page covers' })).toBeVisible()
    await expect(page.getByRole('link', { name: /Open the SuperSites Hub/i })).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/en',
    )
    await expect(page.getByRole('link', { name: /Check website status/i })).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/sitepulse-lab/en/tools/status-checker',
    )
    await expect(page.getByRole('link', { name: /Check DNS propagation/i })).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/netprobe-atlas/en/tools/dns-propagation',
    )
    await expect(page.getByRole('link', { name: /Report a public status issue/i })).toHaveAttribute(
      'href',
      'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Public%20status%20report',
    )
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/en/status',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)
    await expect(page.locator('main')).not.toContainText(
      /hostgator|transitional|monetization|billing|dry-run|rollback|release checks|quality checks|deploy smoke|production checks|public readiness|launch status|public api live|ads planned|paid upgrades|advanced accounts|provider imports|artifacts|crawler evidence|plans to|planned|\bshould\b|\bmust\b/i,
    )
    await expect(page.locator('main')).not.toContainText('Page care')
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)

    const schemaType = await page.locator('script[type="application/ld+json"]').evaluate((script) => {
      const schema = JSON.parse(script.textContent || '{}')

      return schema['@type']
    })

    expect(schemaType).toBe('WebPage')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('status-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized Public Status page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/status')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/Status Público/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Status Público')
    const contentHeadings = page.locator('.content-section h3')
    await expect(page.locator('main .network-panel')).toHaveCount(0)
    await expect(contentHeadings.filter({ hasText: 'Disponibilidade atual' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Incidentes conhecidos' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Janelas de manutenção' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Checagens úteis' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Contato' })).toBeVisible()
    await expect(contentHeadings.filter({ hasText: 'Escopo da página' })).toBeVisible()
    await expect(page.getByRole('link', { name: /Abrir o Hub SuperSites/i })).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/pt-br',
    )
    await expect(page.getByRole('link', { name: /Checar status do website/i })).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/sitepulse-lab/pt-br/tools/status-checker',
    )
    await expect(page.getByRole('link', { name: /Checar propagação DNS/i })).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/netprobe-atlas/pt-br/tools/dns-propagation',
    )
    await expect(page.getByRole('link', { name: /Informar problema de status público/i })).toHaveAttribute(
      'href',
      'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Public%20status%20report',
    )
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/pt-br/status',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)
    await expect(page.locator('main')).not.toContainText(
      /hostgator|transitório|monetização|billing|cobrança|dry-run|rollback|release checks|quality checks|deploy smoke|production checks|prontidão|status de lançamento|public api live|ads planned|upgrades pagos|contas avançadas|importações de provedores|artefatos|evidência de crawler|planeja|planejado|\bdeve\b|\bdevem\b/i,
    )
    await expect(page.locator('main')).not.toContainText('Cuidado da página')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('status-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the About page as a public institutional page on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/about')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/About SuperSites/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('About SuperSites')
    await expect(page.getByRole('heading', { name: 'Mission' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'How the network works' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Privacy by default' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Contact and corrections' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Languages' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Responsible growth' })).toBeVisible()
    await expect(page.locator('main .network-panel')).toHaveCount(0)
    await expect(page.locator('main')).not.toContainText('Page care')
    await expect(page.getByRole('heading', { name: 'Related pages' })).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/en/about',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)
    await expect(page.locator('main')).not.toContainText(
      /Human legal review|human review|legal review|required before final public|final public launch|final public release|public review/i,
    )
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)

    const schemaType = await page.locator('script[type="application/ld+json"]').evaluate((script) => {
      const schema = JSON.parse(script.textContent || '{}')

      return schema['@type']
    })

    expect(schemaType).toBe('AboutPage')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('about-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized About page as an institutional page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/about')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/Sobre o SuperSites/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Sobre o SuperSites')
    await expect(page.getByRole('heading', { name: 'Missão' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Como a rede funciona' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Privacidade por padrão' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Contato e correções' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Idiomas' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Crescimento responsável' })).toBeVisible()
    await expect(page.locator('main .network-panel')).toHaveCount(0)
    await expect(page.locator('main')).not.toContainText('Cuidado da página')
    await expect(page.getByRole('heading', { name: 'Páginas relacionadas' })).toBeVisible()
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/pt-br/about',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)
    await expect(page.locator('main')).not.toContainText(
      /Human legal review|human review|legal review|revisão jurídica|revisão pública|revisão humana|required before final public|final public launch|final public release/i,
    )
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('about-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the Contact page as channel-based public contact on desktop', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/contact')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/Contact SuperSites/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Contact SuperSites')
    await expect(page.getByRole('heading', { name: 'Choose a channel' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Security and abuse' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Editorial corrections' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Privacy requests' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Partnership and legal' })).toBeVisible()
    await expect(page.locator('.content-link-list a[href^="mailto:contact@opentshost.com"]')).toHaveCount(5)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/en/contact',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)
    await expect(page.locator('main')).not.toContainText(
      /launch phase|first public launch|public mailbox|unfinished forms/i,
    )
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1)

    const schemaType = await page.locator('script[type="application/ld+json"]').evaluate((script) => {
      const schema = JSON.parse(script.textContent || '{}')

      return schema['@type']
    })

    expect(schemaType).toBe('ContactPage')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('contact-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized Contact page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/contact')
    await dismissConsentBanner(page)

    await expect(page).toHaveTitle(/Contato SuperSites/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Contato SuperSites')
    await expect(page.getByRole('heading', { name: 'Escolha um canal' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Segurança e abuso' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Correções editoriais' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Pedidos de privacidade' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Parcerias e legal' })).toBeVisible()
    await expect(page.locator('.content-link-list a[href^="mailto:contact@opentshost.com"]')).toHaveCount(5)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/pt-br/contact',
    )
    await expect(page.locator('link[hreflang="pt-BR"]')).toHaveCount(1)
    await expect(page.locator('main')).not.toContainText(
      /fase de lançamento|primeiro lançamento|e-mail público|caixa pública|formulários inacabados/i,
    )
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('contact-pt-mobile', { body: screenshot, contentType: 'image/png' })

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
    await expect(page.getByRole('heading', { name: 'Choose by task' })).toBeVisible()
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

    await page.locator('a[href="https://opentshost.com/supersites/netprobe-atlas/en"]').first().click()

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
        target_url: '/supersites/netprobe-atlas/en',
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

  test('renders the DevUtility Lab catalog page as a benchmark-grade developer workbench', async ({
    page,
  }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/sites/devutility-lab')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Format, inspect and compare code snippets locally.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Developer tool finder' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Search developer tools' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Pinned local shortcuts' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'All published developer tools' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Formatters', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Encoding and tokens' })).toBeVisible()

    for (const path of [
      'structured-data-formatter',
      'base64-converter',
      'jwt-inspector',
      'regex-tester',
      'text-diff',
      'cron-helper',
      'uuid-generator',
      'timestamp-converter',
      'hash-generator',
    ]) {
      await expect(
        page.locator(`.devutility-tool-grid a[href="https://opentshost.com/supersites/devutility-lab/en/tools/${path}"]`),
      ).toBeVisible()
    }

    await page.getByRole('searchbox', { name: 'Search developer tools' }).fill('uuid')
    await expect(page.locator('#devutility-lab-all .devutility-tool-card').filter({ hasText: 'UUID Generator' })).toBeVisible()
    await expect(page.locator('#devutility-lab-all .devutility-tool-card').filter({ hasText: 'JSON Formatter' })).toHaveCount(0)

    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('Quality check')
    await expect(page.locator('main')).not.toContainText('Workflow checks ready')
    await expect(page.locator('main')).not.toContainText('checkout inactive')
    await expect(page.locator('main')).not.toContainText('billing disabled')
    await expect(page.locator('main')).not.toContainText('ads planned')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('devutility-catalog-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized DevUtility Lab catalog page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/sites/devutility-lab')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Formate, inspecione e compare snippets localmente.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Buscador de ferramentas dev' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Buscar ferramentas dev' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Atalhos locais fixos' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Todas as ferramentas dev publicadas' })).toBeVisible()
    await expect(
      page.locator('.devutility-tool-grid a[href="https://opentshost.com/supersites/devutility-lab/pt-br/tools/structured-data-formatter"]'),
    ).toBeVisible()
    await expect(
      page.locator('.devutility-tool-grid a[href="https://opentshost.com/supersites/devutility-lab/pt-br/tools/hash-generator"]'),
    ).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Format, inspect and compare code snippets locally.')
    await expect(page.locator('main')).not.toContainText('Workflow checks ready')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('devutility-catalog-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the TimeNexus catalog page as a benchmark-grade time landing', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/sites/timenexus')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Plan time across cities, dates and calendars.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Current time now' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Browse by time task' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Start with time planning' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'All published TimeNexus tools' })).toBeVisible()
    await expect(page.locator('.timenexus-shortcut-grid').getByRole('heading', { name: 'World Clock' })).toBeVisible()
    await expect(page.locator('.timenexus-shortcut-grid').getByRole('heading', { name: 'Time Zones' })).toBeVisible()
    await expect(page.locator('.timenexus-shortcut-grid').getByRole('heading', { name: 'Calendar' })).toBeVisible()
    await expect(page.locator('.timenexus-shortcut-grid').getByRole('heading', { name: 'Calculators' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Search time tools' })).toBeVisible()

    for (const path of [
      'tools/timezone-converter',
      'tools/timestamp-converter',
      'tools/date-difference',
      'tools/business-days',
      'tools/age-calculator',
      'tools/percentage-calculator',
      'tools/unit-converter',
      'world-clock/americas-europe',
      'world-clock/global-product',
      'world-clock/cities/tokyo',
    ]) {
      await expect(
        page.locator(`.timenexus-tool-grid a[href="https://opentshost.com/supersites/timenexus/en/${path}"]`),
      ).toBeVisible()
    }

    await page.getByRole('searchbox', { name: 'Search time tools' }).fill('timestamp')
    await expect(page.locator('#timenexus-all .timenexus-tool-card').filter({ hasText: 'Timestamp Converter' })).toBeVisible()
    await expect(page.locator('#timenexus-all .timenexus-tool-card').filter({ hasText: 'Date Difference' })).toHaveCount(0)

    await expect(page.locator('main')).not.toContainText('No accounts or storage')
    await expect(page.locator('main')).not.toContainText('billing')
    await expect(page.locator('main')).not.toContainText('ads inactive')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('Quality check')
    await expect(page.locator('main')).not.toContainText('Workflow checks ready')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('timenexus-catalog-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized TimeNexus catalog page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/sites/timenexus')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Planeje horarios entre cidades, datas e calendarios.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Hora atual agora' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Escolha por tarefa de tempo' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Todas as ferramentas TimeNexus publicadas' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Buscar ferramentas de tempo' })).toBeVisible()
    await expect(
      page.locator('.timenexus-tool-grid a[href="https://opentshost.com/supersites/timenexus/pt-br/tools/timezone-converter"]'),
    ).toBeVisible()
    await expect(
      page.locator('.timenexus-tool-grid a[href="https://opentshost.com/supersites/timenexus/pt-br/world-clock/americas-europe"]'),
    ).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Plan time across cities, dates and calendars.')
    await expect(page.locator('main')).not.toContainText('No accounts or storage')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('timenexus-catalog-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the QRRoute catalog page as a benchmark-grade generator landing', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/sites/qrroute')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Generate a QR code or campaign asset with a live preview.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Live static preview' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Choose by asset type' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Start with the common QRRoute jobs' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Static first, dynamic later' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'All published QRRoute tools' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Search QRRoute tools' })).toBeVisible()
    await expect(page.locator('.qrroute-preview-art')).toBeVisible()

    for (const path of [
      'static-qr-code',
      'barcode-generator',
      'utm-builder',
      'vcard-qr',
      'wifi-qr',
      'preview-lab',
    ]) {
      await expect(
        page.locator(`.qrroute-tool-grid a[href="https://opentshost.com/supersites/qrroute/en/tools/${path}"]`),
      ).toBeVisible()
    }

    await page.getByRole('searchbox', { name: 'Search QRRoute tools' }).fill('wifi')
    await expect(page.locator('#qrroute-all .qrroute-tool-card').filter({ hasText: 'Wi-Fi QR Builder' })).toBeVisible()
    await expect(page.locator('#qrroute-all .qrroute-tool-card').filter({ hasText: 'UTM Builder' })).toHaveCount(0)

    await expect(page.locator('main')).not.toContainText('QR, barcode e links de campanha com preview local')
    await expect(page.locator('main')).not.toContainText('commercial redirects planned')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('Quality check')
    await expect(page.locator('main')).not.toContainText('Workflow checks ready')
    await expect(page.locator('main')).not.toContainText('billing')
    await expect(page.locator('main')).not.toContainText('ads planned')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('qrroute-catalog-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized QRRoute catalog page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/sites/qrroute')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Gere um QR ou ativo de campanha com prévia ao vivo.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Prévia estática ao vivo' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Escolha por tipo de ativo' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Todas as ferramentas QRRoute publicadas' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Buscar ferramentas QRRoute' })).toBeVisible()
    await expect(
      page.locator('.qrroute-tool-grid a[href="https://opentshost.com/supersites/qrroute/pt-br/tools/static-qr-code"]'),
    ).toBeVisible()
    await expect(
      page.locator('.qrroute-tool-grid a[href="https://opentshost.com/supersites/qrroute/pt-br/tools/wifi-qr"]'),
    ).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Generate a QR code or campaign asset with a live preview.')
    await expect(page.locator('main')).not.toContainText('preview local')
    await expect(page.locator('main')).not.toContainText('commercial redirects planned')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('qrroute-catalog-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the InvoiceCraft catalog page as a benchmark-grade document builder landing', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/sites/invoicecraft')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Create a client document and download a local PDF.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Live document preview' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Choose the document flow' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Start with the right client document' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Review before sending' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'All published InvoiceCraft tools' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Search InvoiceCraft tools' })).toBeVisible()
    await expect(page.locator('.invoicecraft-document-preview')).toBeVisible()

    for (const path of ['invoice-builder', 'quote-builder', 'receipt-builder']) {
      await expect(
        page.locator(`.invoicecraft-tool-grid a[href="https://opentshost.com/supersites/invoicecraft/en/tools/${path}"]`),
      ).toBeVisible()
    }

    await page.getByRole('searchbox', { name: 'Search InvoiceCraft tools' }).fill('receipt')
    await expect(page.locator('#invoicecraft-all .invoicecraft-tool-card').filter({ hasText: 'Receipt Builder' })).toBeVisible()
    await expect(page.locator('#invoicecraft-all .invoicecraft-tool-card').filter({ hasText: 'Invoice Builder' })).toHaveCount(0)

    await expect(page.locator('main')).not.toContainText('Faturas, orçamentos e recibos sem cadastro obrigatório.')
    await expect(page.locator('main')).not.toContainText('Payments and taxes planned')
    await expect(page.locator('main')).not.toContainText('Tax/legal review')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('Quality check')
    await expect(page.locator('main')).not.toContainText('billing')
    await expect(page.locator('main')).not.toContainText('ads planned')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expect(page.locator('main')).not.toContainText('MVP')
    await expect(page.locator('main')).not.toContainText('HUMAN_ACTION_REQUIRED')
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('invoicecraft-catalog-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized InvoiceCraft catalog page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/sites/invoicecraft')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Crie um documento de cliente e baixe um PDF local.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Prévia de documento ao vivo' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Escolha o fluxo de documento' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Todas as ferramentas InvoiceCraft publicadas' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Buscar ferramentas InvoiceCraft' })).toBeVisible()
    await expect(
      page.locator('.invoicecraft-tool-grid a[href="https://opentshost.com/supersites/invoicecraft/pt-br/tools/invoice-builder"]'),
    ).toBeVisible()
    await expect(
      page.locator('.invoicecraft-tool-grid a[href="https://opentshost.com/supersites/invoicecraft/pt-br/tools/receipt-builder"]'),
    ).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Create a client document and download a local PDF.')
    await expect(page.locator('main')).not.toContainText('tax/legal')
    await expect(page.locator('main')).not.toContainText('Payments and taxes planned')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('invoicecraft-catalog-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the MailHealth catalog page as a benchmark-grade email diagnostic landing', async ({
    page,
  }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/sites/mailhealth')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: "Check a domain's email health before changing DNS." })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Domain health report' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Choose an email diagnostic' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Start with the checks senders expect' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Point-in-time checks' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'All published MailHealth checks' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Search MailHealth checks' })).toBeVisible()
    await expect(page.locator('.mailhealth-report-panel')).toBeVisible()

    for (const path of [
      'spf-checker',
      'dkim-checker',
      'dmarc-checker',
      'mx-checker',
      'blacklist-check',
      'smtp-check',
      'header-analyzer',
    ]) {
      await expect(
        page.locator(`.mailhealth-tool-grid a[href="https://opentshost.com/supersites/mailhealth/en/tools/${path}"]`),
      ).toBeVisible()
    }

    await page.getByRole('searchbox', { name: 'Search MailHealth checks' }).fill('smtp')
    await expect(page.locator('#mailhealth-all .mailhealth-tool-card').filter({ hasText: 'SMTP Check' })).toBeVisible()
    await expect(page.locator('#mailhealth-all .mailhealth-tool-card').filter({ hasText: 'SPF Check' })).toHaveCount(0)

    await expect(page.locator('main')).not.toContainText('Email authentication and deliverability checks for safer domains.')
    await expect(page.locator('main')).not.toContainText('Monitoring gated')
    await expect(page.locator('main')).not.toContainText('monitoring planned')
    await expect(page.locator('main')).not.toContainText('worker')
    await expect(page.locator('main')).not.toContainText('billing')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expect(page.locator('main')).not.toContainText('MVP')
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('mailhealth-catalog-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized MailHealth catalog page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/sites/mailhealth')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Verifique a saúde de e-mail antes de alterar DNS.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Relatório de saúde do domínio' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Escolha um diagnóstico de e-mail' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Todas as verificacoes MailHealth publicadas' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Buscar verificacoes MailHealth' })).toBeVisible()
    await expect(
      page.locator('.mailhealth-tool-grid a[href="https://opentshost.com/supersites/mailhealth/pt-br/tools/spf-checker"]'),
    ).toBeVisible()
    await expect(
      page.locator('.mailhealth-tool-grid a[href="https://opentshost.com/supersites/mailhealth/pt-br/tools/header-analyzer"]'),
    ).toBeVisible()
    await expect(page.locator('main')).not.toContainText("Check a domain's email health before changing DNS.")
    await expect(page.locator('main')).not.toContainText('Monitoring gated')
    await expect(page.locator('main')).not.toContainText('worker')
    await expect(page.locator('main')).not.toContainText('billing')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('mailhealth-catalog-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the SitePulse catalog page as a benchmark-grade website diagnostic landing', async ({
    page,
  }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/sites/sitepulse-lab')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Check if a website is reachable before you debug deeper.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Website status report' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Choose a website check' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Start with the signals teams check first' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Point-in-time diagnostics' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'All published SitePulse checks' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Search SitePulse checks' })).toBeVisible()
    await expect(page.locator('.sitepulse-report-panel')).toBeVisible()

    for (const path of [
      'status-checker',
      'redirect-chain',
      'security-headers',
      'robots-checker',
      'sitemap-validator',
      'ttfb-check',
      'performance-snapshot',
    ]) {
      await expect(
        page.locator(`.sitepulse-tool-grid a[href="https://opentshost.com/supersites/sitepulse-lab/en/tools/${path}"]`),
      ).toBeVisible()
    }

    await page.getByRole('searchbox', { name: 'Search SitePulse checks' }).fill('robots')
    await expect(page.locator('#sitepulse-lab-all .sitepulse-tool-card').filter({ hasText: 'Robots.txt Checker' })).toBeVisible()
    await expect(page.locator('#sitepulse-lab-all .sitepulse-tool-card').filter({ hasText: 'Security Headers' })).toHaveCount(0)

    await expect(page.locator('main')).not.toContainText('Website status and performance checks for first response.')
    await expect(page.locator('main')).not.toContainText('Monitoring planned')
    await expect(page.locator('main')).not.toContainText('worker')
    await expect(page.locator('main')).not.toContainText('billing')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expect(page.locator('main')).not.toContainText('MVP')
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('sitepulse-catalog-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized SitePulse catalog page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/sites/sitepulse-lab')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Verifique se um site responde antes de investigar mais.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Relatório de status do site' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Escolha uma verificacao de site' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Todas as verificacoes SitePulse publicadas' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Buscar verificacoes SitePulse' })).toBeVisible()
    await expect(
      page.locator('.sitepulse-tool-grid a[href="https://opentshost.com/supersites/sitepulse-lab/pt-br/tools/status-checker"]'),
    ).toBeVisible()
    await expect(
      page.locator('.sitepulse-tool-grid a[href="https://opentshost.com/supersites/sitepulse-lab/pt-br/tools/performance-snapshot"]'),
    ).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Check if a website is reachable before you debug deeper.')
    await expect(page.locator('main')).not.toContainText('Monitoring planned')
    await expect(page.locator('main')).not.toContainText('worker')
    await expect(page.locator('main')).not.toContainText('billing')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('sitepulse-catalog-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the PixelBatch catalog page as a benchmark-grade image workflow landing', async ({
    page,
  }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/sites/pixelbatch')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Drop an image and make it web-ready in this browser.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Drop or choose one image' })).toBeVisible()
    await expect(page.getByText('Your image stays in this browser')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Choose an image task' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Start with visible image tasks' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'One local image at a time' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'All published PixelBatch tools' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Search PixelBatch tools' })).toBeVisible()
    await expect(page.locator('.pixelbatch-drop-panel')).toBeVisible()

    for (const path of [
      'image-compressor',
      'image-resizer',
      'image-cropper',
      'image-converter',
      'metadata-remover',
      'social-preset-generator',
    ]) {
      await expect(
        page.locator(`.pixelbatch-tool-grid a[href="https://opentshost.com/supersites/pixelbatch/en/tools/${path}"]`),
      ).toBeVisible()
    }

    await page.getByRole('searchbox', { name: 'Search PixelBatch tools' }).fill('metadata')
    await expect(page.locator('#pixelbatch-all .pixelbatch-tool-card').filter({ hasText: 'Metadata Remover' })).toBeVisible()
    await expect(page.locator('#pixelbatch-all .pixelbatch-tool-card').filter({ hasText: 'Image Resizer' })).toHaveCount(0)

    await expect(page.locator('main')).not.toContainText('Image optimization tools for web and commerce workflows.')
    await expect(page.locator('main')).not.toContainText('No server upload backend active')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('Quality check')
    await expect(page.locator('main')).not.toContainText('billing')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expect(page.locator('main')).not.toContainText('MVP')
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('pixelbatch-catalog-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized PixelBatch catalog page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/sites/pixelbatch')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Solte uma imagem e deixe-a pronta para web neste navegador.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Solte ou escolha uma imagem' })).toBeVisible()
    await expect(page.getByText('Sua imagem fica neste navegador')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Escolha uma tarefa de imagem' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Todas as ferramentas PixelBatch publicadas' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Buscar ferramentas PixelBatch' })).toBeVisible()
    await expect(
      page.locator('.pixelbatch-tool-grid a[href="https://opentshost.com/supersites/pixelbatch/pt-br/tools/image-compressor"]'),
    ).toBeVisible()
    await expect(
      page.locator('.pixelbatch-tool-grid a[href="https://opentshost.com/supersites/pixelbatch/pt-br/tools/social-preset-generator"]'),
    ).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Drop an image and make it web-ready in this browser.')
    await expect(page.locator('main')).not.toContainText('No server upload backend active')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('pixelbatch-catalog-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the DocShift catalog page as a benchmark-grade PDF workflow landing', async ({
    page,
  }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.goto('/en/sites/docshift')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Choose a PDF task and handle the file in this browser.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Drop or choose PDF files' })).toBeVisible()
    await expect(page.getByText('Files stay in this browser for supported free tasks')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Choose a PDF task', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Start with visible PDF tasks' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Small document tasks first' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'All published DocShift tools' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Search DocShift tools' })).toBeVisible()
    await expect(page.locator('.docshift-drop-panel')).toBeVisible()

    for (const path of [
      'pdf-merge',
      'pdf-split',
      'pdf-rotate',
      'pdf-compressor',
      'pdf-watermark',
      'page-numbers',
      'metadata-cleaner',
      'text-to-pdf',
    ]) {
      await expect(
        page.locator(`.docshift-tool-grid a[href="https://opentshost.com/supersites/docshift/en/tools/${path}"]`),
      ).toBeVisible()
    }

    await page.getByRole('searchbox', { name: 'Search DocShift tools' }).fill('metadata')
    await expect(page.locator('#docshift-all .docshift-tool-card').filter({ hasText: 'Metadata Cleaner' })).toBeVisible()
    await expect(page.locator('#docshift-all .docshift-tool-card').filter({ hasText: 'PDF Merge' })).toHaveCount(0)

    await expect(page.locator('main')).not.toContainText('PDF and document utilities with privacy-first processing rules.')
    await expect(page.locator('main')).not.toContainText('No server upload backend active')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('Quality check')
    await expect(page.locator('main')).not.toContainText('billing')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expect(page.locator('main')).not.toContainText('MVP')
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2)
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('docshift-catalog-desktop', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })

  test('renders the localized DocShift catalog page on mobile', async ({ page }, testInfo) => {
    const errors = collectBrowserErrors(page)

    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/pt-br/sites/docshift')
    await dismissConsentBanner(page)

    await expect(page.getByRole('heading', { name: 'Escolha uma tarefa de PDF e trate o arquivo neste navegador.' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Solte ou escolha arquivos PDF' })).toBeVisible()
    await expect(page.getByText('Os arquivos ficam neste navegador nas tarefas gratuitas compatíveis')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Escolha uma tarefa de PDF', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Todas as ferramentas DocShift publicadas' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Buscar ferramentas DocShift' })).toBeVisible()
    await expect(
      page.locator('.docshift-tool-grid a[href="https://opentshost.com/supersites/docshift/pt-br/tools/pdf-merge"]'),
    ).toBeVisible()
    await expect(
      page.locator('.docshift-tool-grid a[href="https://opentshost.com/supersites/docshift/pt-br/tools/text-to-pdf"]'),
    ).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Choose a PDF task and handle the file in this browser.')
    await expect(page.locator('main')).not.toContainText('No server upload backend active')
    await expect(page.locator('main')).not.toContainText('Temporary public URL')
    await expect(page.locator('main')).not.toContainText('Launch order')
    await expect(page.locator('main')).not.toContainText('roadmap')
    await expectNoHorizontalOverflow(page)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('docshift-catalog-pt-mobile', { body: screenshot, contentType: 'image/png' })

    expect(errors).toEqual([])
  })
})
