import { expect, test, type Page, type TestInfo } from '@playwright/test'

async function expectNoBrowserStorage(page: Page) {
  const storage = await page.evaluate(() => ({
    local: Object.keys(window.localStorage),
    session: Object.keys(window.sessionStorage),
  }))

  expect(storage.local).toEqual([])
  expect(storage.session).toEqual([])
}

async function createPdfThroughTextTool(page: Page, testInfo: TestInfo): Promise<string> {
  await page.goto('/en/tools/text-to-pdf')
  await page.getByLabel('Plain text').fill('Confidential client brief\nThis fixture is generated locally by DocShift Playwright.')
  await page.getByRole('button', { name: 'Process document' }).click()
  await expect(page.getByTitle('Processed PDF preview')).toBeVisible()

  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download PDF' }).click()
  const download = await downloadPromise
  const pdfPath = testInfo.outputPath('docshift-generated-source.pdf')
  await download.saveAs(pdfPath)

  return pdfPath
}

test.describe('DocShift MVP', () => {
  test('renders localized home and document tool cards', async ({ page }, testInfo) => {
    await page.goto('/en')

    await expect(page).toHaveTitle(/DocShift/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Merge, split, rotate')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://opentshost.com/supersites/docshift/en',
    )
    await expect(page.getByRole('heading', { name: 'PDF Merge' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Text to PDF' })).toBeVisible()
    await expect(page.getByText('No server upload backend active')).toBeVisible()
    await expect(page.getByText('Local free version', { exact: true })).toHaveCount(8)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('docshift-home-desktop', { body: screenshot, contentType: 'image/png' })
  })

  test('creates a PDF from text locally with sanitized analytics', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/en/tools/text-to-pdf?file=private-brief.pdf&page=1-3')

    await expect(page.getByText('Drop or choose local documents')).toBeVisible()
    await expect(page.getByText('File state')).toBeVisible()
    await expect(page.getByText('Workflow snapshot')).toBeVisible()
    await expect(page.getByText('Privacy checklist')).toBeVisible()
    await expect(page.getByText('Server workflow planned')).toBeVisible()
    await expect(page.getByText('Related document tools')).toBeVisible()

    await page.getByLabel('Plain text').fill('Private roadmap note\nGenerated locally for the DocShift smoke test.')
    await page.getByRole('button', { name: 'Process document' }).click()

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Text to PDF')
    await expect(page.getByTitle('Processed PDF preview')).toBeVisible()
    await expect(page.getByText('Actual output')).toBeVisible()

    await expectNoBrowserStorage(page)

    const events = await page.evaluate(() => window.supersitesAnalyticsEvents ?? [])
    expect(events.map((event) => event.name)).toEqual([
      'tool_viewed',
      'tool_started',
      'file_processed',
      'tool_completed',
    ])
    expect(events.at(-1)).toMatchObject({
      siteSlug: 'docshift',
      routePath: '/en/tools/text-to-pdf',
      properties: {
        tool_slug: 'text-to-pdf',
      },
    })
    expect(JSON.stringify(events)).not.toContain('private-brief')
    expect(JSON.stringify(events)).not.toContain('Private roadmap')
    expect(JSON.stringify(events)).not.toContain('1-3')

    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Download PDF' }).click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toBe('docshift-text-to-pdf.pdf')

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('docshift-text-mobile', { body: screenshot, contentType: 'image/png' })
  })

  test('rotates an uploaded generated PDF and keeps file data local', async ({ page }, testInfo) => {
    const pdfPath = await createPdfThroughTextTool(page, testInfo)

    await page.goto('/en/tools/pdf-rotate?file=secret-contract.pdf')
    await page.getByLabel('PDF file').setInputFiles(pdfPath)
    await page.getByRole('textbox', { name: 'Pages' }).fill('all')
    await page.getByRole('combobox', { name: 'Rotation' }).selectOption('180')
    await page.getByRole('button', { name: 'Process document' }).click()

    await expect(page.getByTitle('Processed PDF preview')).toBeVisible()
    await expect(page.getByText('File state')).toBeVisible()
    await expect(page.getByText('Related document tools')).toBeVisible()
    await expect(page.locator('.result-meta').getByText('browser worker', { exact: true }).or(
      page.locator('.result-meta').getByText('local fallback', { exact: true }),
    )).toBeVisible()
    await expectNoBrowserStorage(page)

    const events = await page.evaluate(() => window.supersitesAnalyticsEvents ?? [])
    expect(events.at(-1)).toMatchObject({
      siteSlug: 'docshift',
      routePath: '/en/tools/pdf-rotate',
      properties: {
        tool_slug: 'pdf-rotate',
      },
    })
    expect(JSON.stringify(events)).not.toContain('secret-contract')
    expect(JSON.stringify(events)).not.toContain('docshift-generated-source')

    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Download PDF' }).click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toMatch(/pdf-rotate\.pdf$/)
  })

  test('renders localized tool and privacy pages without overflow', async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/pt-br/tools/pdf-merge')

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Unir PDFs')
    await expect(page.getByText('Processar documento')).toBeVisible()
    await expect(page.locator('body')).toContainText('Perguntas frequentes')

    await page.goto('/fr/privacy')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Privacy Policy')
    await expect(page.getByText('Data minimization')).toBeVisible()

    const width = await page.evaluate(() => document.documentElement.scrollWidth)
    expect(width).toBeLessThanOrEqual(390)

    const screenshot = await page.screenshot({ fullPage: true })
    await testInfo.attach('docshift-privacy-mobile', { body: screenshot, contentType: 'image/png' })
  })
})
