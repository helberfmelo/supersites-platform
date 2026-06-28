#!/usr/bin/env node
import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const DEFAULT_BASE_URL = 'https://opentshost.com'
const LOCALES = ['en', 'pt-br', 'es', 'fr', 'de']
const CONTENT_PAGES = ['about', 'contact', 'privacy', 'cookies', 'terms', 'methodology', 'editorial-policy', 'status']
const HUB_PAGES = ['about', 'contact', 'privacy', 'cookies', 'terms', 'methodology', 'editorial-policy', 'status']

const SITES = [
  {
    id: 'netprobe-atlas',
    name: 'NetProbe Atlas',
    basePath: '/supersites/netprobe-atlas/',
    toolPath: 'tools',
    tools: [
      'what-is-my-ip',
      'dns-lookup',
      'rdap-domain-lookup',
      'ssl-certificate-checker',
      'dns-propagation',
      'port-checker',
      'ping-traceroute',
    ],
  },
  {
    id: 'calcharbor',
    name: 'CalcHarbor',
    basePath: '/supersites/calcharbor/',
    toolPath: 'calculators',
    tools: ['loan-payment', 'break-even-point', 'gross-margin', 'roi'],
  },
  {
    id: 'devutility-lab',
    name: 'DevUtility Lab',
    basePath: '/supersites/devutility-lab/',
    toolPath: 'tools',
    tools: [
      'structured-data-formatter',
      'base64-converter',
      'jwt-inspector',
      'regex-tester',
      'text-diff',
      'cron-helper',
      'uuid-generator',
      'timestamp-converter',
      'hash-generator',
    ],
  },
  {
    id: 'timenexus',
    name: 'TimeNexus',
    basePath: '/supersites/timenexus/',
    toolPath: 'tools',
    tools: [
      'timezone-converter',
      'date-difference',
      'business-days',
      'timestamp-converter',
      'age-calculator',
      'percentage-calculator',
      'unit-converter',
    ],
  },
  {
    id: 'qrroute',
    name: 'QRRoute',
    basePath: '/supersites/qrroute/',
    toolPath: 'tools',
    tools: ['static-qr-code', 'barcode-generator', 'utm-builder', 'vcard-qr', 'wifi-qr', 'preview-lab'],
  },
  {
    id: 'invoicecraft',
    name: 'InvoiceCraft',
    basePath: '/supersites/invoicecraft/',
    toolPath: 'tools',
    tools: ['invoice-builder', 'quote-builder', 'receipt-builder'],
  },
  {
    id: 'mailhealth',
    name: 'MailHealth',
    basePath: '/supersites/mailhealth/',
    toolPath: 'tools',
    tools: ['spf-checker', 'dkim-checker', 'dmarc-checker', 'mx-checker', 'blacklist-check', 'smtp-check', 'header-analyzer'],
  },
  {
    id: 'sitepulse-lab',
    name: 'SitePulse Lab',
    basePath: '/supersites/sitepulse-lab/',
    toolPath: 'tools',
    tools: ['status-checker', 'redirect-chain', 'security-headers', 'robots-checker', 'sitemap-validator', 'ttfb-check', 'performance-snapshot'],
  },
  {
    id: 'pixelbatch',
    name: 'PixelBatch',
    basePath: '/supersites/pixelbatch/',
    toolPath: 'tools',
    tools: ['image-compressor', 'image-resizer', 'image-cropper', 'image-converter', 'metadata-remover', 'social-preset-generator'],
  },
  {
    id: 'docshift',
    name: 'DocShift',
    basePath: '/supersites/docshift/',
    toolPath: 'tools',
    tools: ['pdf-merge', 'pdf-split', 'pdf-rotate', 'pdf-compressor', 'pdf-watermark', 'page-numbers', 'metadata-cleaner', 'text-to-pdf'],
  },
]

const VIEWPORTS = [
  { name: 'desktop', width: 1366, height: 900, isMobile: false },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
]

function parseArgs(argv) {
  const args = {
    baseUrl: process.env.SUPERSITES_BENCHMARK_BASE_URL || DEFAULT_BASE_URL,
    mode: 'full',
    outputDir: '',
    sprint: process.env.SUPERSITES_BENCHMARK_SPRINT || '9.2',
    symbolicSprint: process.env.SUPERSITES_BENCHMARK_SYMBOLIC_SPRINT || 'BGR-CRAWLER-BASELINE',
    writeDocs: false,
    includeContent: false,
    failOnCritical: false,
    routeLimit: 0,
  }

  for (const item of argv) {
    if (item.startsWith('--base-url=')) args.baseUrl = item.slice('--base-url='.length)
    else if (item.startsWith('--mode=')) args.mode = item.slice('--mode='.length)
    else if (item.startsWith('--output-dir=')) args.outputDir = item.slice('--output-dir='.length)
    else if (item.startsWith('--sprint=')) args.sprint = item.slice('--sprint='.length)
    else if (item.startsWith('--symbolic-sprint=')) args.symbolicSprint = item.slice('--symbolic-sprint='.length)
    else if (item === '--write-docs') args.writeDocs = true
    else if (item === '--include-content') args.includeContent = true
    else if (item === '--fail-on-critical') args.failOnCritical = true
    else if (item.startsWith('--route-limit=')) args.routeLimit = Number(item.slice('--route-limit='.length))
  }

  if (!['quick', 'full'].includes(args.mode)) {
    throw new Error(`Unsupported mode "${args.mode}". Use quick or full.`)
  }

  args.baseUrl = args.baseUrl.replace(/\/+$/, '')
  return args
}

function joinUrl(baseUrl, pathname) {
  return new URL(pathname, `${baseUrl}/`).toString()
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120)
}

function addRoute(routes, route) {
  const key = `${route.surface}:${route.locale || 'none'}:${route.kind}:${route.path}`
  if (!routes.some((candidate) => candidate.key === key)) {
    routes.push({ key, ...route })
  }
}

function buildRoutes({ mode, includeContent }) {
  const routes = []
  const locales = mode === 'quick' ? ['en', 'pt-br'] : LOCALES
  const contentPages = includeContent || mode === 'full' ? CONTENT_PAGES : ['status']
  const hubPages = includeContent || mode === 'full' ? HUB_PAGES : ['status']

  addRoute(routes, {
    surface: 'supersite',
    surfaceName: 'SuperSites Hub',
    kind: 'home',
    path: '/supersites/',
    locale: 'x-default',
    label: 'SuperSites Hub root',
  })

  for (const locale of locales) {
    addRoute(routes, {
      surface: 'supersite',
      surfaceName: 'SuperSites Hub',
      kind: 'home',
      path: `/supersites/${locale}`,
      locale,
      label: `SuperSites Hub ${locale}`,
    })

    for (const site of SITES) {
      addRoute(routes, {
        surface: 'supersite',
        surfaceName: 'SuperSites Hub',
        kind: 'site-detail',
        path: `/supersites/${locale}/sites/${site.id}`,
        locale,
        label: `Hub detail ${site.name} ${locale}`,
      })
    }

    for (const page of hubPages) {
      addRoute(routes, {
        surface: 'supersite',
        surfaceName: 'SuperSites Hub',
        kind: 'content',
        path: `/supersites/${locale}/${page}`,
        locale,
        label: `Hub ${page} ${locale}`,
      })
    }
  }

  for (const site of SITES) {
    addRoute(routes, {
      surface: site.id,
      surfaceName: site.name,
      kind: 'home',
      path: site.basePath,
      locale: 'x-default',
      label: `${site.name} root`,
    })

    for (const locale of locales) {
      addRoute(routes, {
        surface: site.id,
        surfaceName: site.name,
        kind: 'home',
        path: `${site.basePath}${locale}`,
        locale,
        label: `${site.name} ${locale}`,
      })

      const tools = mode === 'quick' ? site.tools.slice(0, 1) : site.tools
      for (const tool of tools) {
        addRoute(routes, {
          surface: site.id,
          surfaceName: site.name,
          kind: 'tool',
          path: `${site.basePath}${locale}/${site.toolPath}/${tool}`,
          locale,
          label: `${site.name} ${tool} ${locale}`,
        })
      }

      for (const page of contentPages) {
        addRoute(routes, {
          surface: site.id,
          surfaceName: site.name,
          kind: 'content',
          path: `${site.basePath}${locale}/${page}`,
          locale,
          label: `${site.name} ${page} ${locale}`,
        })
      }
    }
  }

  return routes.sort((a, b) => a.path.localeCompare(b.path))
}

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true })
}

async function withTimeout(promise, timeoutMs, label) {
  let timeoutId
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(`${label} timed out after ${timeoutMs}ms`)), timeoutMs)
  })

  try {
    return await Promise.race([promise, timeout])
  } finally {
    clearTimeout(timeoutId)
  }
}

async function fetchText(url) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(url, {
      headers: { 'user-agent': 'SuperSitesBenchmarkCrawler/9.2' },
      signal: controller.signal,
    })
    const text = await response.text()
    return {
      ok: response.ok,
      status: response.status,
      contentType: response.headers.get('content-type') || '',
      text,
    }
  } catch (error) {
    return {
      ok: false,
      status: 0,
      contentType: '',
      text: '',
      error: error instanceof Error ? error.message : String(error),
    }
  } finally {
    clearTimeout(timeoutId)
  }
}

async function checkRobotsAndSitemaps(baseUrl) {
  const entries = [
    { surface: 'supersite', url: joinUrl(baseUrl, '/supersites/robots.txt'), kind: 'robots' },
    { surface: 'supersite', url: joinUrl(baseUrl, '/supersites/sitemap.xml'), kind: 'sitemap' },
    ...SITES.flatMap((site) => [
      { surface: site.id, url: joinUrl(baseUrl, `${site.basePath}robots.txt`), kind: 'robots' },
      { surface: site.id, url: joinUrl(baseUrl, `${site.basePath}sitemap.xml`), kind: 'sitemap' },
    ]),
  ]

  const results = []
  for (const entry of entries) {
    const result = await fetchText(entry.url)
    results.push({
      ...entry,
      ok: result.ok,
      status: result.status,
      contentType: result.contentType,
      hasSitemapReference: entry.kind === 'robots' ? /sitemap:/i.test(result.text) : undefined,
      locCount: entry.kind === 'sitemap' ? (result.text.match(/<loc>/g) || []).length : undefined,
      error: result.error,
    })
  }

  return results
}

function createInitScript() {
  return `
    (() => {
      window.__supersitesVitals = { cls: 0, lcp: 0, longTaskDuration: 0 };
      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) window.__supersitesVitals.cls += entry.value || 0;
          }
        }).observe({ type: 'layout-shift', buffered: true });
      } catch (_) {}
      try {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const last = entries[entries.length - 1];
          if (last) window.__supersitesVitals.lcp = last.startTime || 0;
        }).observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (_) {}
      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            window.__supersitesVitals.longTaskDuration += entry.duration || 0;
          }
        }).observe({ type: 'longtask', buffered: true });
      } catch (_) {}
    })();
  `
}

async function crawlRoute(context, route, viewport, baseUrl, screenshotDir) {
  const url = joinUrl(baseUrl, route.path)
  const page = await context.newPage()
  const consoleErrors = []
  const consoleWarnings = []
  const pageErrors = []

  page.on('console', (message) => {
    const text = message.text().slice(0, 500)
    if (message.type() === 'error') consoleErrors.push(text)
    if (message.type() === 'warning') consoleWarnings.push(text)
  })
  page.on('pageerror', (error) => pageErrors.push(error.message.slice(0, 500)))

  const startedAt = Date.now()
  let status = 0
  let finalUrl = url
  let navigationError = ''

  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 })
    status = response?.status() || 0
    finalUrl = page.url()
    await page.waitForLoadState('load', { timeout: 7000 }).catch(() => {})
    await page.waitForTimeout(350)
  } catch (error) {
    navigationError = error instanceof Error ? error.message : String(error)
  }

  const screenshotName = `${slugify(`${route.surface}-${route.kind}-${route.locale}-${path.basename(route.path) || 'root'}-${viewport.name}`)}.png`
  const screenshotPath = path.join(screenshotDir, screenshotName)
  await page.screenshot({ path: screenshotPath, fullPage: false, animations: 'disabled', caret: 'hide' }).catch(() => {})

  const details = await page.evaluate(() => {
    const metadata = {
      title: document.title || '',
      lang: document.documentElement.lang || '',
      metaDescription: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || '',
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
      alternates: Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).map((element) => ({
        hreflang: element.getAttribute('hreflang') || '',
        href: element.getAttribute('href') || '',
      })),
      h1: Array.from(document.querySelectorAll('h1')).map((element) => (element.textContent || '').trim()).filter(Boolean),
      schemaBlocks: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((element) => element.textContent || ''),
      anchors: Array.from(document.querySelectorAll('a[href]')).map((element) => ({
        href: element.getAttribute('href') || '',
        text: (element.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 120),
      })),
      imagesWithoutAlt: Array.from(document.querySelectorAll('img')).filter((image) => !image.getAttribute('alt')).length,
      buttonsWithoutName: Array.from(document.querySelectorAll('button')).filter((button) => !(button.getAttribute('aria-label') || button.textContent || '').trim()).length,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
      bodyTextLength: (document.body?.innerText || '').trim().length,
    }

    const navigation = performance.getEntriesByType('navigation')[0]
    const vitals = window.__supersitesVitals || {}
    return {
      ...metadata,
      performance: navigation ? {
        ttfbMs: Math.round(navigation.responseStart),
        domContentLoadedMs: Math.round(navigation.domContentLoadedEventEnd),
        loadMs: Math.round(navigation.loadEventEnd),
        transferSize: navigation.transferSize || 0,
        encodedBodySize: navigation.encodedBodySize || 0,
      } : {},
      vitals: {
        lcpMs: Math.round(vitals.lcp || 0),
        cls: Number((vitals.cls || 0).toFixed(4)),
        longTaskDurationMs: Math.round(vitals.longTaskDuration || 0),
      },
    }
  }).catch(() => ({
    title: '',
    lang: '',
    metaDescription: '',
    robots: '',
    canonical: '',
    alternates: [],
    h1: [],
    schemaBlocks: [],
    anchors: [],
    imagesWithoutAlt: 0,
    buttonsWithoutName: 0,
    horizontalOverflow: false,
    bodyTextLength: 0,
    performance: {},
    vitals: {},
  }))

  const schemaParseErrors = []
  for (const block of details.schemaBlocks) {
    try {
      JSON.parse(block)
    } catch (error) {
      schemaParseErrors.push(error instanceof Error ? error.message : String(error))
    }
  }

  const issues = []
  if (!status || status >= 400) issues.push(`HTTP status ${status || 'unknown'}`)
  if (navigationError) issues.push(`Navigation error: ${navigationError}`)
  if (!details.title.trim()) issues.push('Missing title')
  if (details.title.length > 70) issues.push('Title longer than 70 chars')
  if (!details.metaDescription.trim()) issues.push('Missing meta description')
  if (details.metaDescription.length > 170) issues.push('Meta description longer than 170 chars')
  if (!details.canonical.trim()) issues.push('Missing canonical')
  if (details.robots.toLowerCase().includes('noindex')) issues.push('Robots noindex present')
  if (details.alternates.length < 5) issues.push(`Low hreflang count (${details.alternates.length})`)
  if (!details.alternates.some((alternate) => alternate.hreflang === 'x-default')) issues.push('Missing x-default hreflang')
  if (details.h1.length !== 1) issues.push(`Expected one h1, found ${details.h1.length}`)
  if (!details.schemaBlocks.length) issues.push('Missing JSON-LD schema')
  if (schemaParseErrors.length) issues.push(`Invalid JSON-LD schema (${schemaParseErrors.length})`)
  if (details.horizontalOverflow) issues.push('Horizontal overflow detected')
  if (details.imagesWithoutAlt > 0) issues.push(`${details.imagesWithoutAlt} image(s) without alt`)
  if (details.buttonsWithoutName > 0) issues.push(`${details.buttonsWithoutName} button(s) without accessible name`)
  if (consoleErrors.length) issues.push(`${consoleErrors.length} console error(s)`)
  if (pageErrors.length) issues.push(`${pageErrors.length} page error(s)`)

  await page.close()

  return {
    route,
    viewport: viewport.name,
    url,
    status,
    finalUrl,
    durationMs: Date.now() - startedAt,
    screenshotPath: normalizePath(screenshotPath),
    title: details.title,
    lang: details.lang,
    metaDescriptionLength: details.metaDescription.length,
    canonical: details.canonical,
    robots: details.robots,
    hreflangCount: details.alternates.length,
    hasXDefault: details.alternates.some((alternate) => alternate.hreflang === 'x-default'),
    h1Count: details.h1.length,
    schemaCount: details.schemaBlocks.length,
    schemaParseErrors,
    consoleErrors,
    consoleWarnings,
    pageErrors,
    links: details.anchors,
    imagesWithoutAlt: details.imagesWithoutAlt,
    buttonsWithoutName: details.buttonsWithoutName,
    horizontalOverflow: details.horizontalOverflow,
    bodyTextLength: details.bodyTextLength,
    performance: details.performance,
    vitals: details.vitals,
    issues,
  }
}

function normalizeInternalUrl(baseUrl, currentUrl, href) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
    return ''
  }

  try {
    const url = new URL(href, currentUrl)
    const base = new URL(baseUrl)
    if (url.origin !== base.origin) return ''
    if (!url.pathname.startsWith('/supersites/')) return ''
    url.hash = ''
    url.search = ''
    return url.toString()
  } catch (_) {
    return ''
  }
}

async function checkInternalLinks(baseUrl, pageResults) {
  const urls = new Set()
  for (const result of pageResults) {
    if (result.viewport !== 'desktop') continue
    for (const link of result.links || []) {
      const normalized = normalizeInternalUrl(baseUrl, result.finalUrl || result.url, link.href)
      if (normalized) urls.add(normalized)
    }
  }

  const sorted = [...urls].sort()
  const results = []
  for (const url of sorted) {
    const result = await fetchText(url)
    results.push({
      url,
      ok: result.ok,
      status: result.status,
      contentType: result.contentType,
      error: result.error,
    })
  }

  return results
}

function normalizePath(filePath) {
  return filePath.split(path.sep).join('/')
}

function percentile(values, p) {
  const clean = values.filter((value) => Number.isFinite(value)).sort((a, b) => a - b)
  if (!clean.length) return 0
  const index = Math.min(clean.length - 1, Math.max(0, Math.ceil((p / 100) * clean.length) - 1))
  return clean[index]
}

function summarize(results, linkResults, robotsResults) {
  const failingPages = results.filter((result) => !result.status || result.status >= 400 || result.pageErrors.length || result.consoleErrors.length)
  const issueRows = results.flatMap((result) => result.issues.map((issue) => ({
    surface: result.route.surfaceName,
    path: result.route.path,
    viewport: result.viewport,
    issue,
  })))
  const bySurface = new Map()

  for (const result of results) {
    const entry = bySurface.get(result.route.surfaceName) || {
      surface: result.route.surfaceName,
      checks: 0,
      pageFailures: 0,
      issues: 0,
      missingMetaDescription: 0,
      missingSchema: 0,
      lowHreflang: 0,
      horizontalOverflow: 0,
      medianTtfbMs: 0,
      medianLoadMs: 0,
      ttfbValues: [],
      loadValues: [],
    }

    entry.checks += 1
    if (!result.status || result.status >= 400 || result.pageErrors.length || result.consoleErrors.length) entry.pageFailures += 1
    entry.issues += result.issues.length
    if (!result.metaDescriptionLength) entry.missingMetaDescription += 1
    if (!result.schemaCount) entry.missingSchema += 1
    if (result.hreflangCount < 5 || !result.hasXDefault) entry.lowHreflang += 1
    if (result.horizontalOverflow) entry.horizontalOverflow += 1
    if (result.performance.ttfbMs) entry.ttfbValues.push(result.performance.ttfbMs)
    if (result.performance.loadMs) entry.loadValues.push(result.performance.loadMs)
    bySurface.set(result.route.surfaceName, entry)
  }

  const surfaceSummary = [...bySurface.values()].map((entry) => ({
    ...entry,
    medianTtfbMs: percentile(entry.ttfbValues, 50),
    medianLoadMs: percentile(entry.loadValues, 50),
    ttfbValues: undefined,
    loadValues: undefined,
  }))

  const loadValues = results.map((result) => result.performance.loadMs || 0).filter(Boolean)
  const ttfbValues = results.map((result) => result.performance.ttfbMs || 0).filter(Boolean)
  const lcpValues = results.map((result) => result.vitals.lcpMs || 0).filter(Boolean)
  const clsValues = results.map((result) => result.vitals.cls || 0).filter((value) => Number.isFinite(value))

  return {
    routeCount: new Set(results.map((result) => result.route.key)).size,
    viewportChecks: results.length,
    pageFailures: failingPages.length,
    totalIssues: issueRows.length,
    consoleErrors: results.reduce((sum, result) => sum + result.consoleErrors.length, 0),
    pageErrors: results.reduce((sum, result) => sum + result.pageErrors.length, 0),
    missingTitle: results.filter((result) => !result.title.trim()).length,
    missingMetaDescription: results.filter((result) => !result.metaDescriptionLength).length,
    missingCanonical: results.filter((result) => !result.canonical).length,
    lowHreflang: results.filter((result) => result.hreflangCount < 5 || !result.hasXDefault).length,
    missingSchema: results.filter((result) => !result.schemaCount).length,
    noindexPages: results.filter((result) => result.robots.toLowerCase().includes('noindex')).length,
    horizontalOverflow: results.filter((result) => result.horizontalOverflow).length,
    imagesWithoutAlt: results.reduce((sum, result) => sum + result.imagesWithoutAlt, 0),
    buttonsWithoutName: results.reduce((sum, result) => sum + result.buttonsWithoutName, 0),
    brokenInternalLinks: linkResults.filter((result) => !result.ok).length,
    robotsFailures: robotsResults.filter((result) => !result.ok).length,
    medianTtfbMs: percentile(ttfbValues, 50),
    p75TtfbMs: percentile(ttfbValues, 75),
    medianLoadMs: percentile(loadValues, 50),
    p75LoadMs: percentile(loadValues, 75),
    medianLcpMs: percentile(lcpValues, 50),
    p75LcpMs: percentile(lcpValues, 75),
    p75Cls: percentile(clsValues, 75),
    issueRows,
    surfaceSummary,
  }
}

function markdownTable(headers, rows) {
  return [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map((row) => `| ${row.map((cell) => String(cell).replace(/\|/g, '\\|')).join(' | ')} |`),
  ].join('\n')
}

function buildMarkdownReport({ args, runId, artifactDir, summary, linkResults, robotsResults }) {
  const topIssues = summary.issueRows.slice(0, 40).map((row) => [row.surface, row.viewport, `\`${row.path}\``, row.issue])
  const surfaceRows = summary.surfaceSummary.map((row) => [
    row.surface,
    row.checks,
    row.pageFailures,
    row.issues,
    row.lowHreflang,
    row.missingSchema,
    row.horizontalOverflow,
    row.medianLoadMs,
  ])
  const brokenLinks = linkResults.filter((result) => !result.ok).slice(0, 20).map((result) => [`\`${result.url}\``, result.status || 'error', result.error || ''])
  const robotsRows = robotsResults.map((result) => [
    result.surface,
    result.kind,
    result.ok ? 'ok' : 'gap',
    result.status,
    result.kind === 'sitemap' ? result.locCount ?? 0 : result.hasSitemapReference ? 'yes' : 'no',
  ])

  return `# SuperSites Benchmark Crawler Baseline

Data-base: 2026-06-28

Sprint: Fase 9 / Sprint ${args.sprint} - ${args.symbolicSprint}

Run id: \`${runId}\`

Mode: \`${args.mode}\`

Base URL: \`${args.baseUrl}\`

Artifacts: \`${normalizePath(artifactDir)}\`

This is a Playwright technical baseline for the public SuperSites portfolio. It is not an official Lighthouse, PageSpeed or GTmetrix report. Performance values are browser timing proxies captured from the public transitional HostGator URLs.

No login, paid endpoint, external analytics provider, ad request, checkout, donation link, worker, cron or user-provided payload was activated.

## Summary

${markdownTable(['Metric', 'Value'], [
    ['Routes crawled', summary.routeCount],
    ['Viewport checks', summary.viewportChecks],
    ['Page failures or browser errors', summary.pageFailures],
    ['Total recorded gaps', summary.totalIssues],
    ['Console errors', summary.consoleErrors],
    ['Missing title', summary.missingTitle],
    ['Missing meta description', summary.missingMetaDescription],
    ['Missing canonical', summary.missingCanonical],
    ['Low or incomplete hreflang', summary.lowHreflang],
    ['Missing JSON-LD schema', summary.missingSchema],
    ['Noindex pages', summary.noindexPages],
    ['Horizontal overflow', summary.horizontalOverflow],
    ['Internal broken links', summary.brokenInternalLinks],
    ['Robots/sitemap fetch gaps', summary.robotsFailures],
    ['Median TTFB proxy', `${summary.medianTtfbMs} ms`],
    ['P75 TTFB proxy', `${summary.p75TtfbMs} ms`],
    ['Median load proxy', `${summary.medianLoadMs} ms`],
    ['P75 load proxy', `${summary.p75LoadMs} ms`],
    ['Median LCP proxy', `${summary.medianLcpMs} ms`],
    ['P75 LCP proxy', `${summary.p75LcpMs} ms`],
    ['P75 CLS proxy', summary.p75Cls],
  ])}

## Surface Summary

${markdownTable(['Surface', 'Checks', 'Failures', 'Gaps', 'Hreflang gaps', 'Schema gaps', 'Overflow', 'Median load ms'], surfaceRows)}

## Robots And Sitemaps

${markdownTable(['Surface', 'Kind', 'Status', 'HTTP', 'Sitemap refs / loc count'], robotsRows)}

## Top Recorded Gaps

${topIssues.length ? markdownTable(['Surface', 'Viewport', 'Path', 'Gap'], topIssues) : 'No page-level gaps were recorded.'}

## Broken Internal Links

${brokenLinks.length ? markdownTable(['URL', 'HTTP', 'Error'], brokenLinks) : 'No broken same-origin internal links were detected in the crawled pages.'}

## Notes

- Screenshots are written under \`${normalizePath(path.join(artifactDir, 'screenshots'))}\` and are intentionally not versioned because \`artifacts/\` is ignored.
- Full mode covers all locales, all tool/calculator pages and localized content/status pages. Quick mode samples EN/PT-BR plus the first tool per product for fast validation.
- Lighthouse/PageSpeed/GTmetrix integration remains a later gate; this sprint records deterministic browser timing proxies and SEO metadata checks.
- Legal review, AdSense approval, billing, donation, affiliate, KYC, tax, bank and irreversible provider actions remain human-gated.
`
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const runId = new Date().toISOString().replace(/[:.]/g, '-')
  const artifactDir = path.resolve(args.outputDir || path.join('artifacts', 'benchmark-crawl', runId))
  const screenshotDir = path.join(artifactDir, 'screenshots')
  await ensureDir(screenshotDir)

  let routes = buildRoutes(args)
  if (args.routeLimit > 0) routes = routes.slice(0, args.routeLimit)

  const browser = await chromium.launch({ headless: true })
  const results = []

  try {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        isMobile: viewport.isMobile,
        userAgent: `SuperSitesBenchmarkCrawler/${args.sprint} ${viewport.name}`,
      })
      await context.addInitScript(createInitScript())

      for (const route of routes) {
        process.stdout.write(`Crawling ${viewport.name} ${route.path}\n`)
        const result = await withTimeout(
          crawlRoute(context, route, viewport, args.baseUrl, screenshotDir),
          35000,
          `${viewport.name} ${route.path}`,
        )
        results.push(result)
      }

      await context.close()
    }
  } finally {
    await browser.close()
  }

  const robotsResults = await checkRobotsAndSitemaps(args.baseUrl)
  const linkResults = await checkInternalLinks(args.baseUrl, results)
  const summary = summarize(results, linkResults, robotsResults)
  const report = {
    generatedAt: new Date().toISOString(),
    sprint: args.sprint,
    symbolicSprint: args.symbolicSprint,
    mode: args.mode,
    baseUrl: args.baseUrl,
    artifactDir: normalizePath(artifactDir),
    summary,
    robotsResults,
    linkResults,
    pageResults: results.map((result) => ({ ...result, links: undefined })),
  }
  const markdown = buildMarkdownReport({ args, runId, artifactDir, summary, linkResults, robotsResults })

  await writeFile(path.join(artifactDir, 'report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  await writeFile(path.join(artifactDir, 'baseline.md'), markdown, 'utf8')

  if (args.writeDocs) {
    const docsDir = path.resolve('docs', 'benchmarks', 'our-sites')
    await ensureDir(docsDir)
    await writeFile(path.join(docsDir, 'latest-baseline.md'), markdown, 'utf8')
  }

  process.stdout.write(`\nBenchmark crawl complete.\n`)
  process.stdout.write(`Routes: ${summary.routeCount}; viewport checks: ${summary.viewportChecks}; gaps: ${summary.totalIssues}\n`)
  process.stdout.write(`Report: ${normalizePath(path.join(artifactDir, 'baseline.md'))}\n`)

  if (args.failOnCritical && (summary.pageFailures || summary.brokenInternalLinks || summary.robotsFailures)) {
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : error)
  process.exitCode = 1
})
