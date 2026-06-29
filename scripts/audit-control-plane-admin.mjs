#!/usr/bin/env node
import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const DEFAULT_BASE_URL = 'http://127.0.0.1:8014'
const DEFAULT_OUTPUT_DIR = path.join('artifacts', 'control-plane-admin-audit')

const profiles = [
  { id: 'desktop', width: 1366, height: 900, pages: ['dashboard', 'benchmark', 'reports', 'report-detail', 'sites', 'account'] },
  { id: 'mobile', width: 390, height: 844, pages: ['dashboard', 'sites', 'account'] },
]

const adminPages = {
  dashboard: {
    path: '/admin',
    label: 'Dashboard',
    expected: [
      'Portfolio status',
      'Benchmark refinement',
      'Executive reports',
      'Google integrations',
      'AdSense readiness',
      'Billing readiness',
      'AI growth engine',
      'Latest deployments',
      'Operational tasks',
    ],
  },
  benchmark: {
    path: '/admin/benchmark-refinement',
    label: 'Benchmark refinement',
    expected: [
      'Benchmark refinement',
      'Public surfaces',
      'Site readiness',
      'Opportunity backlog',
      'External providers active',
    ],
  },
  reports: {
    path: '/admin/reports',
    label: 'Executive reports',
    expected: [
      'Executive reports',
      'Weekly Executive Readiness',
      'finalized',
      'estimated',
      'not_inferred',
    ],
  },
  'report-detail': {
    path: '',
    label: 'Executive report detail',
    expected: [
      'Controls',
      'Items',
      'Download CSV',
      'Causality not_inferred',
      'Source',
    ],
  },
  sites: {
    path: '/admin/sites',
    label: 'Sites',
    expected: [
      'Sites',
      'SuperSites Hub',
      'NetProbe Atlas',
      'foundation',
      'Edit',
    ],
  },
  account: {
    path: '/admin/account',
    label: 'Account',
    expected: [
      'Account and data controls',
      'Account summary',
      'Role assignments',
      'Download account export',
      'Request deletion review',
    ],
  },
}

function parseArgs(argv) {
  const args = {
    baseUrl: process.env.SUPERSITES_ADMIN_AUDIT_BASE_URL || DEFAULT_BASE_URL,
    email: process.env.SUPERSITES_ADMIN_AUDIT_EMAIL || 'owner@supersites.local',
    credential: process.env.SUPERSITES_ADMIN_AUDIT_CREDENTIAL || 'password',
    outputDir: process.env.SUPERSITES_ADMIN_AUDIT_OUTPUT_DIR || DEFAULT_OUTPUT_DIR,
  }

  for (const item of argv) {
    if (item.startsWith('--base-url=')) args.baseUrl = item.slice('--base-url='.length)
    else if (item.startsWith('--email=')) args.email = item.slice('--email='.length)
    else if (item.startsWith('--credential=')) args.credential = item.slice('--credential='.length)
    else if (item.startsWith('--output-dir=')) args.outputDir = item.slice('--output-dir='.length)
  }

  args.baseUrl = args.baseUrl.replace(/\/+$/, '')
  const parsed = new URL(args.baseUrl)
  if (!['127.0.0.1', 'localhost'].includes(parsed.hostname)) {
    throw new Error(`Refusing authenticated admin audit against non-local host: ${parsed.hostname}`)
  }

  return args
}

function joinUrl(baseUrl, pathname) {
  return new URL(pathname, `${baseUrl}/`).toString()
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

async function login(page, baseUrl, email, credential) {
  await page.goto(joinUrl(baseUrl, '/login'), { waitUntil: 'domcontentloaded' })
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').fill(credential)
  await page.getByRole('button', { name: 'Sign in' }).click()
  await page.waitForURL(/\/admin\/?$/, { timeout: 15000 })
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {})
}

async function findFirstReportPath(page, baseUrl) {
  await page.goto(joinUrl(baseUrl, adminPages.reports.path), { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {})

  const href = await page.evaluate(() => {
    const link = Array.from(document.querySelectorAll('a[href]'))
      .map((anchor) => anchor.getAttribute('href') || '')
      .find((item) => /\/admin\/reports\/\d+$/.test(item))

    return link || ''
  })

  if (!href) throw new Error('No executive report detail link found.')
  return new URL(href, `${baseUrl}/`).pathname
}

async function auditPage(page, baseUrl, outputDir, profile, pageId, dynamicPath = '') {
  const definition = adminPages[pageId]
  const pathname = dynamicPath || definition.path
  const url = joinUrl(baseUrl, pathname)
  const consoleErrors = []
  const pageErrors = []
  const externalRequests = []

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text().slice(0, 300))
  })
  page.on('pageerror', (error) => pageErrors.push(error.message.slice(0, 300)))
  page.on('request', (request) => {
    const requestUrl = new URL(request.url())
    if (requestUrl.protocol.startsWith('http') && !['127.0.0.1', 'localhost'].includes(requestUrl.hostname)) {
      externalRequests.push(request.url())
    }
  })

  const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {})
  await page.waitForTimeout(100)

  const bodyText = await page.locator('body').innerText()
  const normalizedBodyText = bodyText.toLowerCase()
  const missingText = definition.expected.filter((text) => !normalizedBodyText.includes(text.toLowerCase()))
  const dom = await page.evaluate(() => {
    const pageElement = document.documentElement
    const body = document.body
    const horizontalOverflow = Math.max(pageElement.scrollWidth, body.scrollWidth) > pageElement.clientWidth + 1
    const navLinks = Array.from(document.querySelectorAll('nav a, .nav a')).map((link) => link.textContent?.trim()).filter(Boolean)

    return {
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.trim() || '',
      horizontalOverflow,
      documentWidth: pageElement.scrollWidth,
      viewportWidth: pageElement.clientWidth,
      navLinks,
      hasLogout: Boolean(document.querySelector('form[action$="/logout"], button')),
      signInVisible: body.innerText.includes('Sign in') && !body.innerText.includes('Portfolio status'),
    }
  })

  const screenshotPath = path.join(outputDir, `${profile.id}-${slugify(pageId)}.png`)
  await page.screenshot({ path: screenshotPath, fullPage: true })

  const failures = [
    ...(response?.ok() ? [] : [`HTTP status ${response?.status() ?? 'n/a'}`]),
    ...(missingText.length > 0 ? [`missing text: ${missingText.join(', ')}`] : []),
    ...(dom.horizontalOverflow ? [`horizontal overflow ${dom.documentWidth}/${dom.viewportWidth}`] : []),
    ...(dom.signInVisible ? ['still on sign-in surface after authentication'] : []),
    ...(consoleErrors.length > 0 ? [`console errors: ${consoleErrors.length}`] : []),
    ...(pageErrors.length > 0 ? [`page errors: ${pageErrors.length}`] : []),
    ...(externalRequests.length > 0 ? [`external requests: ${externalRequests.length}`] : []),
  ]

  page.removeAllListeners('console')
  page.removeAllListeners('pageerror')
  page.removeAllListeners('request')

  return {
    id: pageId,
    label: definition.label,
    profile: profile.id,
    url,
    status: failures.length === 0 ? 'passed' : 'failed',
    httpStatus: response?.status() ?? null,
    title: dom.title,
    h1: dom.h1,
    expectedTextCount: definition.expected.length,
    missingText,
    horizontalOverflow: dom.horizontalOverflow,
    navLinks: dom.navLinks,
    consoleErrors,
    pageErrors,
    externalRequests,
    screenshot: path.relative(process.cwd(), screenshotPath),
    failures,
  }
}

function markdownReport(summary) {
  const rows = summary.results.map((result) => `| ${result.profile} | ${result.label} | ${result.status} | ${result.httpStatus ?? 'n/a'} | ${result.h1 || 'n/a'} | ${result.expectedTextCount - result.missingText.length}/${result.expectedTextCount} | ${result.horizontalOverflow ? 'yes' : 'no'} | ${result.consoleErrors.length} | ${result.pageErrors.length} |`)
  const failed = summary.results.filter((result) => result.status !== 'passed')

  return [
    '# Control Plane Admin Audit',
    '',
    `Status: ${summary.status}`,
    `Base URL: ${summary.baseUrl}`,
    `Generated at: ${summary.generatedAt}`,
    `Profiles: ${summary.profiles.join(', ')}`,
    '',
    '| Profile | Page | Status | HTTP | H1 | Text | Overflow | Console | Page Errors |',
    '|---|---|---:|---:|---|---:|---:|---:|---:|',
    ...rows,
    '',
    '## Findings',
    '',
    failed.length === 0
      ? '- No authenticated admin audit failures were recorded.'
      : failed.flatMap((result) => result.failures.map((failure) => `- ${result.profile}/${result.id}: ${failure}`)).join('\n'),
    '',
    '## Governance',
    '',
    '- Audit target was restricted to local loopback only.',
    '- Authentication used seeded local credentials only.',
    '- No production authenticated URL, secret, external provider, billing, AdSense, Google tag or PageSpeed API was used.',
    '- Screenshots and JSON/Markdown artifacts are written under `artifacts/` and ignored by git.',
    '',
  ].join('\n')
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const outputDir = path.resolve(args.outputDir)
  await mkdir(outputDir, { recursive: true })

  const browser = await chromium.launch()
  const results = []

  try {
    for (const profile of profiles) {
      const context = await browser.newContext({
        viewport: { width: profile.width, height: profile.height },
      })
      const page = await context.newPage()

      await login(page, args.baseUrl, args.email, args.credential)
      const reportDetailPath = profile.pages.includes('report-detail')
        ? await findFirstReportPath(page, args.baseUrl)
        : ''

      for (const pageId of profile.pages) {
        results.push(await auditPage(page, args.baseUrl, outputDir, profile, pageId, pageId === 'report-detail' ? reportDetailPath : ''))
      }

      await context.close()
    }
  } finally {
    await browser.close()
  }

  const failures = results.flatMap((result) => result.failures.map((failure) => `${result.profile}/${result.id}: ${failure}`))
  const summary = {
    schemaVersion: 1,
    status: failures.length === 0 ? 'passed' : 'failed',
    baseUrl: args.baseUrl,
    generatedAt: new Date().toISOString(),
    profiles: profiles.map((profile) => profile.id),
    authenticatedUser: args.email,
    results,
    failures,
    governance: {
      localLoopbackOnly: true,
      seededCredentialsOnly: true,
      productionAuthenticatedAccess: false,
      externalProviderActivation: false,
    },
  }

  await writeFile(path.join(outputDir, 'admin-audit.json'), `${JSON.stringify(summary, null, 2)}\n`)
  await writeFile(path.join(outputDir, 'admin-audit.md'), `${markdownReport(summary)}\n`)

  console.log(`Control-plane admin audit status: ${summary.status}`)
  console.log(`Markdown: ${path.join(outputDir, 'admin-audit.md')}`)
  console.log(`JSON: ${path.join(outputDir, 'admin-audit.json')}`)

  if (failures.length > 0) process.exitCode = 1
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
