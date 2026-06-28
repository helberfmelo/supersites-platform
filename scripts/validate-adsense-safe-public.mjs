#!/usr/bin/env node
import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const DEFAULT_BASE_URL = 'https://opentshost.com'
const DEFAULT_OUTPUT_DIR = path.join('artifacts', 'adsense-safe-public')

const samplePaths = [
  '/supersites/en/',
  '/supersites/en/privacy',
  '/supersites/en/sites/netprobe-atlas',
  '/supersites/netprobe-atlas/en/',
  '/supersites/calcharbor/en/',
  '/supersites/devutility-lab/en/',
  '/supersites/timenexus/en/',
  '/supersites/qrroute/en/',
  '/supersites/invoicecraft/en/',
  '/supersites/mailhealth/en/',
  '/supersites/sitepulse-lab/en/',
  '/supersites/pixelbatch/en/',
  '/supersites/docshift/en/',
]

const blockedUrlPatterns = [
  /googlesyndication\.com/i,
  /doubleclick\.net/i,
  /googleadservices\.com/i,
  /adservice\.google\./i,
  /pagead2\.googlesyndication\.com/i,
  /\/adsbygoogle\.js/i,
  /googletagmanager\.com/i,
  /google-analytics\.com/i,
  /analytics\.google\.com/i,
  /\/gtag\/js/i,
  /stripe\.com/i,
  /paypal\.com/i,
  /buymeacoffee\.com/i,
  /ko-fi\.com/i,
]
const inertPlaceholderStatuses = new Set(['blocked-consent', 'delivery-disabled'])

function parseArgs(argv) {
  const args = {
    baseUrl: process.env.SUPERSITES_PUBLIC_BASE_URL || DEFAULT_BASE_URL,
    outputDir: DEFAULT_OUTPUT_DIR,
  }

  for (const item of argv) {
    if (item.startsWith('--base-url=')) args.baseUrl = item.slice('--base-url='.length)
    else if (item.startsWith('--output-dir=')) args.outputDir = item.slice('--output-dir='.length)
  }

  args.baseUrl = args.baseUrl.replace(/\/+$/, '')
  return args
}

function joinUrl(baseUrl, pathname) {
  return new URL(pathname, `${baseUrl}/`).toString()
}

function findBlockedUrls(urls) {
  return urls
    .filter(Boolean)
    .map((url) => String(url))
    .filter((url) => blockedUrlPatterns.some((pattern) => pattern.test(url)))
}

async function inspectPage(context, baseUrl, pathname) {
  const url = joinUrl(baseUrl, pathname)
  const page = await context.newPage()
  const requestedUrls = []
  const consoleErrors = []
  const pageErrors = []

  page.on('request', (request) => requestedUrls.push(request.url()))
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text().slice(0, 300))
  })
  page.on('pageerror', (error) => pageErrors.push(error.message.slice(0, 300)))

  const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
  await page.waitForLoadState('load', { timeout: 10000 }).catch(() => {})
  await page.waitForTimeout(250)

  const dom = await page.evaluate(() => {
    const sourceUrls = Array.from(document.querySelectorAll('script[src], iframe[src], img[src], source[src], link[href], a[href]'))
      .map((element) => element.getAttribute('src') || element.getAttribute('href') || '')

    const forbiddenAdElements = Array.from(document.querySelectorAll('ins.adsbygoogle, .adsbygoogle, [data-ad-client], [data-ad-slot]'))
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        className: element.getAttribute('class') || '',
        status: element.getAttribute('data-ad-status') || '',
      }))

    const placeholders = Array.from(document.querySelectorAll('[data-ad-status]')).map((element) => {
      const style = getComputedStyle(element)
      const rect = element.getBoundingClientRect()

      return {
        id: element.getAttribute('data-ad-slot-id') || '',
        status: element.getAttribute('data-ad-status') || '',
        policyVersion: element.getAttribute('data-ad-policy-version') || '',
        minHeight: Number.parseFloat(style.minHeight || '0') || Math.round(rect.height),
        pointerEvents: style.pointerEvents,
        focusableDescendants: element.querySelectorAll('a, button, input, textarea, select, iframe, [tabindex]').length,
        scriptDescendants: element.querySelectorAll('script, iframe').length,
      }
    })

    return {
      title: document.title,
      sourceUrls,
      forbiddenAdElements,
      placeholders,
      bodyHasAdsbygoogleSnippet: document.documentElement.innerHTML.includes('adsbygoogle'),
    }
  })

  await page.close()

  const blockedRequests = findBlockedUrls(requestedUrls)
  const blockedDomUrls = findBlockedUrls(dom.sourceUrls)
  const placeholderIssues = dom.placeholders.flatMap((placeholder) => {
    const issues = []

    if (!inertPlaceholderStatuses.has(placeholder.status)) {
      issues.push(`placeholder ${placeholder.id || '(missing id)'} status is ${placeholder.status}`)
    }
    if (!placeholder.policyVersion) {
      issues.push(`placeholder ${placeholder.id || '(missing id)'} has no policy version`)
    }
    if (placeholder.minHeight < 90) {
      issues.push(`placeholder ${placeholder.id || '(missing id)'} reserves less than 90px`)
    }
    if (placeholder.pointerEvents !== 'none') {
      issues.push(`placeholder ${placeholder.id || '(missing id)'} is pointer-interactive`)
    }
    if (placeholder.focusableDescendants > 0) {
      issues.push(`placeholder ${placeholder.id || '(missing id)'} contains focusable descendants`)
    }
    if (placeholder.scriptDescendants > 0) {
      issues.push(`placeholder ${placeholder.id || '(missing id)'} contains script or iframe descendants`)
    }

    return issues
  })

  const issues = [
    ...(!response || response.status() >= 400 ? [`HTTP status ${response?.status() || 'unknown'}`] : []),
    ...blockedRequests.map((blockedUrl) => `blocked external request: ${blockedUrl}`),
    ...blockedDomUrls.map((blockedUrl) => `blocked DOM URL: ${blockedUrl}`),
    ...(dom.bodyHasAdsbygoogleSnippet ? ['adsbygoogle snippet text present in rendered HTML'] : []),
    ...dom.forbiddenAdElements
      .filter((element) => !inertPlaceholderStatuses.has(element.status))
      .map((element) => `forbidden ad element ${element.tag}.${element.className}`),
    ...placeholderIssues,
    ...consoleErrors.map((error) => `console error: ${error}`),
    ...pageErrors.map((error) => `page error: ${error}`),
  ]

  return {
    path: pathname,
    url,
    status: response?.status() || 0,
    title: dom.title,
    placeholders: dom.placeholders.length,
    blockedRequests,
    blockedDomUrls,
    issues,
  }
}

function buildMarkdown(results) {
  const rows = results.map((result) => `| \`${result.path}\` | ${result.status} | ${result.placeholders} | ${result.issues.length ? result.issues.join('<br>') : 'ok'} |`)

  return `# AdSense-Safe Public Validation

Data-base: 2026-06-28

This validation samples public SuperSites pages and confirms that ad spaces are inert placeholders only. It checks rendered DOM sources, browser requests, placeholder status, reserved dimensions and focusability.

No real ad, analytics, payment, donation, affiliate, checkout or billing provider was activated.

| Path | HTTP | Placeholders | Result |
|---|---:|---:|---|
${rows.join('\n')}
`
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const outputDir = path.resolve(args.outputDir)
  await mkdir(outputDir, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1366, height: 900 },
    userAgent: 'SuperSitesAdSenseSafeValidator/9.16',
  })

  try {
    const results = []
    for (const pathname of samplePaths) {
      process.stdout.write(`Validating AdSense-safe public layout ${pathname}\n`)
      results.push(await inspectPage(context, args.baseUrl, pathname))
    }

    await writeFile(path.join(outputDir, 'adsense-safe-public.json'), `${JSON.stringify(results, null, 2)}\n`)
    await writeFile(path.join(outputDir, 'adsense-safe-public.md'), buildMarkdown(results))

    const failures = results.flatMap((result) => result.issues.map((issue) => `${result.path}: ${issue}`))
    if (failures.length) {
      throw new Error(`AdSense-safe public validation failed:\n${failures.join('\n')}`)
    }

    console.log(`AdSense-safe public validation passed for ${results.length} pages.`)
    console.log(`Report: ${path.join(outputDir, 'adsense-safe-public.md')}`)
  } finally {
    await context.close()
    await browser.close()
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
