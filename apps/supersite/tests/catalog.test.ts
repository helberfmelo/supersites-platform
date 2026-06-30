import { describe, expect, it } from 'vitest'
import {
  getCalcHarborCatalogCopy,
  getDevUtilityCatalogCopy,
  getDocShiftCatalogCopy,
  getFooterCopy,
  getHomeCopy,
  getInvoiceCraftCatalogCopy,
  getMailHealthCatalogCopy,
  getNetProbeCatalogCopy,
  getPixelBatchCatalogCopy,
  getQrRouteCatalogCopy,
  getSitePulseCatalogCopy,
  getTimeNexusCatalogCopy,
} from '../app/data/copy'
import { legalPageCatalog, legalPageSlugs } from '../app/data/legal'
import { localeCodes } from '../app/data/locales'
import { contentPrerenderRoutes, prerenderRoutes, siteBaseUrl } from '../app/data/routes'
import {
  createHubHomeStructuredData,
  createLegalPageStructuredData,
  createSiteDetailStructuredData,
} from '../app/data/schema'
import { categoryCatalog, filterSites, getSiteBySlug, siteCatalog } from '../app/data/sites'
import { createCatalogOutboundClickEvent } from '../app/utils/analytics'

describe('site catalog', () => {
  it('lists the ten utility sites in launch order', () => {
    expect(siteCatalog).toHaveLength(10)
    expect(siteCatalog.map((site) => site.launchOrder)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('keeps the first build focused on NetProbe Atlas', () => {
    expect(siteCatalog[0]).toMatchObject({
      slug: 'netprobe-atlas',
      status: 'foundation',
    })
  })

  it('documents localized free value and upgrade value for every site', () => {
    for (const site of siteCatalog) {
      expect(site.freeTools.length).toBeGreaterThanOrEqual(3)
      expect(site.paidBenefits.length).toBeGreaterThanOrEqual(3)

      for (const locale of localeCodes) {
        expect(site.localized[locale].headline.length).toBeGreaterThan(24)
        expect(site.localized[locale].summary.length).toBeGreaterThan(48)
        expect(site.localized[locale].freeValue.length).toBeGreaterThan(12)
        expect(site.localized[locale].upgrade.length).toBeGreaterThan(12)
      }
    }
  })

  it('keeps category labels available for every locale', () => {
    for (const category of categoryCatalog) {
      for (const locale of localeCodes) {
        expect(category.labels[locale].length).toBeGreaterThan(2)
      }
    }
  })

  it('documents featured hub tools and workflow clusters with valid site references', () => {
    for (const locale of localeCodes) {
      const copy = getHomeCopy(locale)

      expect(copy.featuredTools).toHaveLength(4)
      expect(copy.popularTools).toHaveLength(11)
      expect(copy.intentClusters).toHaveLength(4)

      for (const item of copy.featuredTools) {
        expect(getSiteBySlug(item.siteSlug)).not.toBeNull()
        expect(item.label.length).toBeGreaterThan(6)
        expect(item.body.length).toBeGreaterThan(24)
      }

      for (const item of copy.popularTools) {
        expect(getSiteBySlug(item.siteSlug)).not.toBeNull()
        expect(item.label.length).toBeGreaterThan(5)
        expect(item.body.length).toBeGreaterThan(24)
        expect(item.path).toMatch(/^\/(tools|calculators)\//)
      }

      for (const cluster of copy.intentClusters) {
        expect(cluster.siteSlugs.length).toBeGreaterThanOrEqual(2)
        expect(cluster.siteSlugs.every((siteSlug) => Boolean(getSiteBySlug(siteSlug)))).toBe(true)
      }
    }
  })

  it('keeps the footer as deep textual navigation to real tool paths', () => {
    for (const locale of localeCodes) {
      const copy = getFooterCopy(locale)
      const footerLinks = copy.groups.flatMap((group) => group.links)

      expect(copy.groups).toHaveLength(6)
      expect(footerLinks.length).toBeGreaterThanOrEqual(36)
      expect(footerLinks.some((link) => link.path === '/tools/dns-propagation')).toBe(true)
      expect(footerLinks.some((link) => link.path === '/tools/structured-data-formatter')).toBe(true)
      expect(footerLinks.some((link) => link.path === '/tools/pdf-merge')).toBe(true)

      for (const group of copy.groups) {
        expect(group.title.length).toBeGreaterThan(3)
        expect(group.links.length).toBeGreaterThanOrEqual(6)
      }

      for (const link of footerLinks) {
        expect(getSiteBySlug(link.siteSlug)).not.toBeNull()
        expect(link.label.length).toBeGreaterThan(2)
        expect(link.path).toMatch(/^\/(tools|calculators|world-clock)\//)
      }
    }
  })

  it('keeps the public hub copy tool-first and free of operational status language', () => {
    const copy = getHomeCopy('en')
    const renderedHomeCopy = [
      copy.eyebrow,
      copy.title,
      copy.lead,
      copy.launchDeskTitle,
      copy.launchDeskBody,
      copy.featuredToolsTitle,
      copy.previewTitle,
      copy.popularToolsTitle,
      copy.popularToolsBody,
      ...copy.networkRows.flatMap((row) => [row.title, row.body]),
    ].join(' ')

    expect(copy.title).toBe('Find the right web tool in seconds.')
    expect(copy.popularToolsTitle).toBe('Free tools ready to use')
    expect(renderedHomeCopy).not.toMatch(/operating network|utility sites live|launch order|quality checks|upgrade path|ads planned|billing disabled/i)
  })

  it('keeps the NetProbe catalog page benchmark-grade and free of internal rollout language', () => {
    const expectedToolPaths = [
      '/tools/what-is-my-ip',
      '/tools/dns-propagation',
      '/tools/dns-lookup',
      '/tools/rdap-domain-lookup',
      '/tools/ssl-certificate-checker',
      '/tools/port-checker',
      '/tools/ping-traceroute',
    ]
    const forbiddenPublicTerms =
      /temporary public url|launch order|quality check|review notes|public api live|ads planned|billing disabled|external analytics inactive|release checks|rollback|human_action_required|worker planned|deploy smoke|production checks/i

    for (const locale of localeCodes) {
      const copy = getNetProbeCatalogCopy(locale)

      expect(copy.toolLinks.map((tool) => tool.path)).toEqual(expectedToolPaths)
      expect(copy.levels).toHaveLength(3)
      expect(copy.footerGroups.map((group) => group.title)).toHaveLength(5)
      expect(copy.footerGroups.flatMap((group) => group.links).length).toBeGreaterThanOrEqual(20)
      expect(JSON.stringify(copy)).not.toMatch(forbiddenPublicTerms)
    }
  })

  it('keeps the CalcHarbor catalog page benchmark-grade and linked to real calculators', () => {
    const expectedCalculatorPaths = [
      '/calculators/loan-payment',
      '/calculators/compound-interest',
      '/calculators/savings-goal',
      '/calculators/break-even-point',
      '/calculators/gross-margin',
      '/calculators/cash-runway',
      '/calculators/discount-price',
      '/calculators/roi',
    ]
    const forbiddenPublicTerms =
      /temporary public url|launch order|quality check|review notes|public api live|ads planned|billing disabled|external analytics inactive|release checks|rollback|human_action_required|worker planned|deploy smoke|production checks|workflow checks ready|checkout inactive/i

    for (const locale of localeCodes) {
      const copy = getCalcHarborCatalogCopy(locale)

      expect(copy.calculators.map((tool) => tool.path)).toEqual(expectedCalculatorPaths)
      expect(copy.calculators.filter((tool) => tool.featured).map((tool) => tool.path)).toEqual([
        '/calculators/loan-payment',
        '/calculators/break-even-point',
        '/calculators/gross-margin',
        '/calculators/roi',
      ])
      expect(copy.categories.map((category) => category.key)).toEqual(['finance', 'business', 'pricing', 'planning'])
      expect(copy.futureTopics).toHaveLength(4)
      expect(copy.footerGroups.map((group) => group.title)).toHaveLength(5)
      expect(copy.footerGroups.flatMap((group) => group.links).length).toBeGreaterThanOrEqual(17)
      expect(JSON.stringify(copy)).not.toMatch(forbiddenPublicTerms)
    }
  })

  it('keeps the DevUtility Lab catalog page benchmark-grade and linked to real developer tools', () => {
    const expectedToolPaths = [
      '/tools/structured-data-formatter',
      '/tools/base64-converter',
      '/tools/jwt-inspector',
      '/tools/regex-tester',
      '/tools/text-diff',
      '/tools/cron-helper',
      '/tools/uuid-generator',
      '/tools/timestamp-converter',
      '/tools/hash-generator',
    ]
    const forbiddenPublicTerms =
      /temporary public url|launch order|quality check|review notes|public api live|ads planned|billing disabled|external analytics inactive|release checks|rollback|human_action_required|worker planned|deploy smoke|production checks|workflow checks ready|checkout inactive|commercial redirects planned|roadmap|mvp/i

    for (const locale of localeCodes) {
      const copy = getDevUtilityCatalogCopy(locale)

      expect(copy.tools.map((tool) => tool.path)).toEqual(expectedToolPaths)
      expect(copy.tools.filter((tool) => tool.featured).map((tool) => tool.path)).toEqual(expectedToolPaths)
      expect(copy.categories.map((category) => category.key)).toEqual([
        'data',
        'encoding',
        'inspection',
        'text',
        'time',
        'identity',
        'security',
      ])
      expect(copy.shortcutGroups).toHaveLength(3)
      expect(copy.footerGroups.map((group) => group.title)).toHaveLength(5)
      expect(copy.footerGroups.flatMap((group) => group.links).length).toBeGreaterThanOrEqual(10)
      expect(JSON.stringify(copy)).not.toMatch(forbiddenPublicTerms)
    }
  })

  it('keeps the TimeNexus catalog page benchmark-grade and linked to real time tools', () => {
    const expectedToolPaths = [
      '/world-clock/americas-europe',
      '/world-clock/global-product',
      '/tools/timezone-converter',
      '/tools/timestamp-converter',
      '/tools/date-difference',
      '/tools/business-days',
      '/tools/age-calculator',
      '/tools/percentage-calculator',
      '/tools/unit-converter',
      '/world-clock/cities/tokyo',
    ]
    const forbiddenPublicTerms =
      /temporary public url|launch order|quality check|review notes|public api live|ads planned|billing disabled|external analytics inactive|release checks|rollback|human_action_required|worker planned|deploy smoke|production checks|workflow checks ready|checkout inactive|commercial redirects planned|roadmap|mvp|no accounts or storage/i

    for (const locale of localeCodes) {
      const copy = getTimeNexusCatalogCopy(locale)

      expect(copy.links.map((tool) => tool.path)).toEqual(expectedToolPaths)
      expect(copy.links.filter((tool) => tool.featured).map((tool) => tool.path)).toEqual([
        '/world-clock/americas-europe',
        '/world-clock/global-product',
        '/tools/timezone-converter',
        '/tools/timestamp-converter',
        '/tools/date-difference',
        '/tools/business-days',
      ])
      expect(copy.categories.map((category) => category.key)).toEqual(['world', 'zones', 'calendar', 'calculators'])
      expect(copy.shortcutGroups).toHaveLength(4)
      expect(copy.footerGroups.map((group) => group.title)).toHaveLength(5)
      expect(copy.footerGroups.flatMap((group) => group.links).length).toBeGreaterThanOrEqual(17)
      expect(JSON.stringify(copy)).not.toMatch(forbiddenPublicTerms)
    }
  })

  it('keeps the QRRoute catalog page benchmark-grade and linked to real QR tools', () => {
    const expectedToolPaths = [
      '/tools/static-qr-code',
      '/tools/barcode-generator',
      '/tools/utm-builder',
      '/tools/vcard-qr',
      '/tools/wifi-qr',
      '/tools/preview-lab',
    ]
    const forbiddenPublicTerms =
      /temporary public url|launch order|quality check|review notes|public api live|ads planned|billing disabled|external analytics inactive|release checks|rollback|human_action_required|worker planned|deploy smoke|production checks|workflow checks ready|checkout inactive|commercial redirects planned|roadmap|mvp|short links require|preview local/i

    for (const locale of localeCodes) {
      const copy = getQrRouteCatalogCopy(locale)

      expect(copy.tools.map((tool) => tool.path)).toEqual(expectedToolPaths)
      expect(copy.tools.filter((tool) => tool.featured).map((tool) => tool.path)).toEqual([
        '/tools/static-qr-code',
        '/tools/barcode-generator',
        '/tools/utm-builder',
        '/tools/vcard-qr',
        '/tools/wifi-qr',
      ])
      expect(copy.categories.map((category) => category.key)).toEqual([
        'qr',
        'barcode',
        'campaign',
        'contact',
        'network',
        'preview',
      ])
      expect(copy.shortcutGroups).toHaveLength(3)
      expect(copy.footerGroups.map((group) => group.title)).toHaveLength(5)
      expect(copy.footerGroups.flatMap((group) => group.links).length).toBeGreaterThanOrEqual(11)
      expect(JSON.stringify(copy)).not.toMatch(forbiddenPublicTerms)
    }
  })

  it('keeps the InvoiceCraft catalog page benchmark-grade and linked to real document builders', () => {
    const expectedToolPaths = [
      '/tools/invoice-builder',
      '/tools/quote-builder',
      '/tools/receipt-builder',
    ]
    const forbiddenPublicTerms =
      /temporary public url|launch order|quality check|review notes|public api live|ads planned|billing disabled|external analytics inactive|release checks|rollback|human_action_required|worker planned|deploy smoke|production checks|workflow checks ready|checkout inactive|commercial redirects planned|roadmap|mvp|tax\/legal review|payment collection planned/i

    for (const locale of localeCodes) {
      const copy = getInvoiceCraftCatalogCopy(locale)

      expect(copy.tools.map((tool) => tool.path)).toEqual(expectedToolPaths)
      expect(copy.tools.filter((tool) => tool.featured).map((tool) => tool.path)).toEqual(expectedToolPaths)
      expect(copy.categories.map((category) => category.key)).toEqual(['invoice', 'quote', 'receipt'])
      expect(copy.shortcutGroups).toHaveLength(3)
      expect(copy.footerGroups.map((group) => group.title)).toHaveLength(4)
      expect(copy.footerGroups.flatMap((group) => group.links)).toHaveLength(8)
      expect(copy.reviewTitle).not.toMatch(/tax\/legal review/i)
      expect(JSON.stringify(copy)).not.toMatch(forbiddenPublicTerms)
    }
  })

  it('keeps the MailHealth catalog page benchmark-grade and linked to real email checks', () => {
    const expectedToolPaths = [
      '/tools/spf-checker',
      '/tools/dkim-checker',
      '/tools/dmarc-checker',
      '/tools/mx-checker',
      '/tools/blacklist-check',
      '/tools/smtp-check',
      '/tools/header-analyzer',
    ]
    const forbiddenPublicTerms =
      /temporary public url|launch order|quality check|review notes|public api live|ads planned|billing disabled|external analytics inactive|release checks|rollback|human_action_required|worker planned|deploy smoke|production checks|workflow checks ready|checkout inactive|commercial redirects planned|roadmap|mvp|monitoring gated|monitoring planned|billing|worker/i

    for (const locale of localeCodes) {
      const copy = getMailHealthCatalogCopy(locale)

      expect(copy.tools.map((tool) => tool.path)).toEqual(expectedToolPaths)
      expect(copy.tools.filter((tool) => tool.featured).map((tool) => tool.path)).toEqual(expectedToolPaths)
      expect(copy.categories.map((category) => category.key)).toEqual([
        'authentication',
        'dns',
        'reputation',
        'transport',
        'headers',
      ])
      expect(copy.reportSignals).toHaveLength(4)
      expect(copy.shortcutGroups).toHaveLength(3)
      expect(copy.footerGroups.map((group) => group.title)).toHaveLength(5)
      expect(copy.footerGroups.flatMap((group) => group.links).length).toBeGreaterThanOrEqual(12)
      expect(JSON.stringify(copy)).not.toMatch(forbiddenPublicTerms)
    }
  })

  it('keeps the SitePulse catalog page benchmark-grade and linked to real website checks', () => {
    const expectedToolPaths = [
      '/tools/status-checker',
      '/tools/redirect-chain',
      '/tools/security-headers',
      '/tools/robots-checker',
      '/tools/sitemap-validator',
      '/tools/ttfb-check',
      '/tools/performance-snapshot',
    ]
    const forbiddenPublicTerms =
      /temporary public url|launch order|quality check|review notes|public api live|ads planned|billing disabled|external analytics inactive|release checks|rollback|human_action_required|worker planned|deploy smoke|production checks|workflow checks ready|checkout inactive|commercial redirects planned|roadmap|mvp|monitoring gated|monitoring planned|billing|worker/i

    for (const locale of localeCodes) {
      const copy = getSitePulseCatalogCopy(locale)

      expect(copy.tools.map((tool) => tool.path)).toEqual(expectedToolPaths)
      expect(copy.tools.filter((tool) => tool.featured).map((tool) => tool.path)).toEqual(expectedToolPaths)
      expect(copy.categories.map((category) => category.key)).toEqual([
        'availability',
        'routing',
        'security',
        'crawlability',
        'performance',
      ])
      expect(copy.reportSignals).toHaveLength(4)
      expect(copy.shortcutGroups).toHaveLength(4)
      expect(copy.footerGroups.map((group) => group.title)).toHaveLength(5)
      expect(copy.footerGroups.flatMap((group) => group.links).length).toBeGreaterThanOrEqual(12)
      expect(JSON.stringify(copy)).not.toMatch(forbiddenPublicTerms)
    }
  })

  it('keeps the PixelBatch catalog page benchmark-grade and linked to real image tools', () => {
    const expectedToolPaths = [
      '/tools/image-compressor',
      '/tools/image-resizer',
      '/tools/image-cropper',
      '/tools/image-converter',
      '/tools/metadata-remover',
      '/tools/social-preset-generator',
    ]
    const forbiddenPublicTerms =
      /temporary public url|launch order|quality check|review notes|public api live|ads planned|billing disabled|external analytics inactive|release checks|rollback|human_action_required|worker planned|deploy smoke|production checks|workflow checks ready|checkout inactive|commercial redirects planned|roadmap|mvp|no server upload backend active|billing|worker/i

    for (const locale of localeCodes) {
      const copy = getPixelBatchCatalogCopy(locale)

      expect(copy.tools.map((tool) => tool.path)).toEqual(expectedToolPaths)
      expect(copy.tools.filter((tool) => tool.featured).map((tool) => tool.path)).toEqual(expectedToolPaths)
      expect(copy.categories.map((category) => category.key)).toEqual([
        'optimize',
        'resize',
        'crop',
        'convert',
        'privacy',
        'presets',
      ])
      expect(copy.dropTitle.length).toBeGreaterThan(12)
      expect(copy.dropPrivacy.length).toBeGreaterThan(12)
      expect(copy.previewRows).toHaveLength(3)
      expect(copy.shortcutGroups).toHaveLength(3)
      expect(copy.footerGroups.map((group) => group.title)).toHaveLength(5)
      expect(copy.footerGroups.flatMap((group) => group.links).length).toBeGreaterThanOrEqual(11)
      expect(JSON.stringify(copy)).not.toMatch(forbiddenPublicTerms)
    }
  })

  it('keeps the DocShift catalog page benchmark-grade and linked to real PDF tools', () => {
    const expectedToolPaths = [
      '/tools/pdf-merge',
      '/tools/pdf-split',
      '/tools/pdf-rotate',
      '/tools/pdf-compressor',
      '/tools/pdf-watermark',
      '/tools/page-numbers',
      '/tools/metadata-cleaner',
      '/tools/text-to-pdf',
    ]
    const forbiddenPublicTerms =
      /temporary public url|launch order|quality check|review notes|public api live|ads planned|billing disabled|external analytics inactive|release checks|rollback|human_action_required|worker planned|deploy smoke|production checks|workflow checks ready|checkout inactive|commercial redirects planned|roadmap|mvp|no server upload backend active|billing|worker/i

    for (const locale of localeCodes) {
      const copy = getDocShiftCatalogCopy(locale)

      expect(copy.tools.map((tool) => tool.path)).toEqual(expectedToolPaths)
      expect(copy.tools.filter((tool) => tool.featured).map((tool) => tool.path)).toEqual(expectedToolPaths)
      expect(copy.categories.map((category) => category.key)).toEqual([
        'organize',
        'pages',
        'optimize',
        'annotate',
        'privacy',
        'convert',
      ])
      expect(copy.dropTitle.length).toBeGreaterThan(12)
      expect(copy.dropPrivacy.length).toBeGreaterThan(12)
      expect(copy.previewRows).toHaveLength(3)
      expect(copy.shortcutGroups).toHaveLength(3)
      expect(copy.footerGroups.map((group) => group.title)).toHaveLength(5)
      expect(copy.footerGroups.flatMap((group) => group.links).length).toBeGreaterThanOrEqual(12)
      expect(JSON.stringify(copy)).not.toMatch(forbiddenPublicTerms)
    }
  })

  it('generates the catalog prerender routes for home and localized site pages', () => {
    expect(contentPrerenderRoutes).toContain('/')
    expect(contentPrerenderRoutes).toContain('/pt-br')
    expect(contentPrerenderRoutes).toContain('/de/sites/docshift')
    expect(contentPrerenderRoutes).toContain('/fr/privacy')
    expect(contentPrerenderRoutes).toHaveLength(
      1 + localeCodes.length * (1 + siteCatalog.length + legalPageCatalog.length),
    )
    expect(prerenderRoutes).toEqual([...contentPrerenderRoutes, '/sitemap.xml'])
  })

  it('keeps temporary public URLs under the safe HostGator fallback path', () => {
    for (const site of siteCatalog) {
      expect(site.temporaryUrl).toBe(`${siteBaseUrl}/${site.slug}/`)
    }
  })

  it('filters sites by search and category', () => {
    expect(filterSites('dns', 'all').map((site) => site.slug)).toContain('netprobe-atlas')
    expect(filterSites('', 'documents').map((site) => site.slug)).toEqual(['invoicecraft', 'docshift'])
    expect(filterSites('faturas', 'all', 'pt-br').map((site) => site.slug)).toContain('invoicecraft')
  })

  it('finds detail pages by slug', () => {
    expect(getSiteBySlug('mailhealth')?.name).toBe('MailHealth')
    expect(getSiteBySlug('missing-site')).toBeNull()
  })

  it('creates a sanitized outbound click event for temporary public URLs', () => {
    const event = createCatalogOutboundClickEvent({
      siteSlug: 'NetProbe Atlas',
      targetUrl: `${siteBaseUrl}/netprobe-atlas/?email=person@example.test#result`,
      locale: 'pt-br',
      routePath: '/pt-br?utm_source=test',
      surface: 'catalog_card',
    })

    expect(event.name).toBe('outbound_site_click')
    expect(event.siteSlug).toBe('netprobe-atlas')
    expect(event.routePath).toBe('/pt-br')
    expect(event.properties.target_url).toBe('/supersites/netprobe-atlas')
  })

  it('documents legal and editorial pages for every locale', () => {
    expect(legalPageCatalog.map((page) => page.slug)).toEqual([...legalPageSlugs])

    for (const page of legalPageCatalog) {
      for (const locale of localeCodes) {
        const localized = page.localized[locale]

        expect(localized.title.length).toBeGreaterThan(5)
        expect(localized.description.length).toBeGreaterThan(60)
        expect(localized.sections).toHaveLength(3)
        expect(localized.sections.every((section) => section.paragraphs.length > 0)).toBe(true)
      }
    }
  })

  it('creates structured data for hub, site detail and legal pages', () => {
    const homeSchema = createHubHomeStructuredData('en', getHomeCopy('en'))
    expect(homeSchema.map((item) => item['@type'])).toEqual(['WebSite', 'CollectionPage', 'ItemList'])
    expect(JSON.stringify(homeSchema)).toContain('NetProbe Atlas')
    expect(JSON.stringify(homeSchema)).toContain('/netprobe-atlas/en/tools/what-is-my-ip')

    const site = getSiteBySlug('devutility-lab')
    expect(site).not.toBeNull()
    const siteSchema = createSiteDetailStructuredData('en', site!)
    expect(siteSchema[0]).toMatchObject({
      '@type': 'WebApplication',
      name: 'DevUtility Lab',
      operatingSystem: 'Web browser',
    })

    const legalPage = legalPageCatalog.find((page) => page.slug === 'privacy')
    expect(legalPage).toBeDefined()
    const legalSchema = createLegalPageStructuredData('en', legalPage!, legalPage!.localized.en)
    expect(legalSchema[0]).toMatchObject({
      name: 'Privacy Policy',
      url: `${siteBaseUrl}/en/privacy`,
    })
  })
})
