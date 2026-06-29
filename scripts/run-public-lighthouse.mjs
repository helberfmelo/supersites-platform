#!/usr/bin/env node
import { chromium } from '@playwright/test'
import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const DEFAULT_BASE_URL = 'https://opentshost.com'
const DEFAULT_OUTPUT_ROOT = path.join('artifacts', 'lighthouse-public')
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo']
const THRESHOLDS = {
  performance: 0.6,
  accessibility: 0.8,
  'best-practices': 0.8,
  seo: 0.8,
}

const pages = [
  {
    id: 'hub-home',
    label: 'SuperSites Hub home',
    path: '/supersites/en/',
    mode: 'quick',
  },
  {
    id: 'netprobe-ip',
    label: 'NetProbe What is my IP',
    path: '/supersites/netprobe-atlas/en/tools/what-is-my-ip',
    mode: 'quick',
  },
  {
    id: 'pixelbatch-compressor',
    label: 'PixelBatch Image Compressor',
    path: '/supersites/pixelbatch/en/tools/image-compressor',
    mode: 'quick',
  },
  {
    id: 'netprobe-dns-propagation',
    label: 'NetProbe DNS Propagation',
    path: '/supersites/netprobe-atlas/en/tools/dns-propagation',
    mode: 'full',
  },
  {
    id: 'calcharbor-loan',
    label: 'CalcHarbor Loan Payment',
    path: '/supersites/calcharbor/en/calculators/loan-payment',
    mode: 'full',
  },
  {
    id: 'devutility-structured-data',
    label: 'DevUtility Structured Data Formatter',
    path: '/supersites/devutility-lab/en/tools/structured-data-formatter',
    mode: 'full',
  },
  {
    id: 'timenexus-timezone',
    label: 'TimeNexus Timezone Converter',
    path: '/supersites/timenexus/en/tools/timezone-converter',
    mode: 'full',
  },
  {
    id: 'qrroute-static-qr',
    label: 'QRRoute Static QR Code',
    path: '/supersites/qrroute/en/tools/static-qr-code',
    mode: 'full',
  },
  {
    id: 'invoicecraft-builder',
    label: 'InvoiceCraft Invoice Builder',
    path: '/supersites/invoicecraft/en/tools/invoice-builder',
    mode: 'full',
  },
  {
    id: 'mailhealth-spf',
    label: 'MailHealth SPF Checker',
    path: '/supersites/mailhealth/en/tools/spf-checker',
    mode: 'full',
  },
  {
    id: 'sitepulse-status',
    label: 'SitePulse Status Checker',
    path: '/supersites/sitepulse-lab/en/tools/status-checker',
    mode: 'full',
  },
  {
    id: 'docshift-merge',
    label: 'DocShift PDF Merge',
    path: '/supersites/docshift/en/tools/pdf-merge',
    mode: 'full',
  },
]

function parseArgs(argv) {
  const args = {
    baseUrl: process.env.SUPERSITES_PUBLIC_BASE_URL || DEFAULT_BASE_URL,
    outputDir: '',
    mode: 'quick',
    routeLimit: 0,
    failOnThresholds: false,
  }

  for (const item of argv) {
    if (item.startsWith('--base-url=')) args.baseUrl = item.slice('--base-url='.length)
    else if (item.startsWith('--output-dir=')) args.outputDir = item.slice('--output-dir='.length)
    else if (item.startsWith('--mode=')) args.mode = item.slice('--mode='.length)
    else if (item.startsWith('--route-limit=')) args.routeLimit = Number(item.slice('--route-limit='.length))
    else if (item === '--fail-on-thresholds') args.failOnThresholds = true
  }

  if (!['quick', 'full'].includes(args.mode)) {
    throw new Error(`Unsupported mode "${args.mode}". Use quick or full.`)
  }

  args.baseUrl = args.baseUrl.replace(/\/+$/, '')
  return args
}

function runId() {
  return new Date().toISOString().replace(/[:.]/g, '-')
}

function joinUrl(baseUrl, pathname) {
  return new URL(pathname, `${baseUrl}/`).toString()
}

function scorePercent(category) {
  if (!category || typeof category.score !== 'number') return null
  return Math.round(category.score * 100)
}

function auditMs(audits, id) {
  const audit = audits?.[id]
  return typeof audit?.numericValue === 'number' ? Math.round(audit.numericValue) : null
}

function auditValue(audits, id) {
  const audit = audits?.[id]
  if (typeof audit?.numericValue === 'number') return Number(audit.numericValue.toFixed(3))
  return null
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

async function fileExists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function resolveChromePath() {
  if (process.env.CHROME_PATH && await fileExists(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH
  }

  const executablePath = chromium.executablePath()
  if (await fileExists(executablePath)) return executablePath

  return ''
}

function toolVersion(tool) {
  const packageJsonPath = tool === 'lhci'
    ? path.resolve('node_modules', '@lhci', 'cli', 'package.json')
    : path.resolve('node_modules', tool, 'package.json')

  try {
    return JSON.parse(readFileSync(packageJsonPath, 'utf8')).version
  } catch {
    return 'unavailable'
  }
}

async function runLighthouse({ page, baseUrl, outputDir, chromePath }) {
  const reportBase = path.join(outputDir, slugify(page.id))
  const url = joinUrl(baseUrl, page.path)
  const lighthouseCli = path.resolve('node_modules', 'lighthouse', 'cli', 'index.js')
  const args = [
    lighthouseCli,
    url,
    '--quiet',
    '--preset=desktop',
    `--only-categories=${CATEGORIES.join(',')}`,
    '--output=json',
    '--output=html',
    `--output-path=${reportBase}`,
    '--chrome-flags=--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage',
  ]

  const env = { ...process.env }
  if (chromePath) env.CHROME_PATH = chromePath

  const startedAt = new Date().toISOString()
  console.log(`Measuring ${page.label}: ${url}`)

  const result = await new Promise((resolve) => {
    const child = spawn(process.execPath, args, {
      cwd: process.cwd(),
      env,
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
    })
    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString()
    })
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString()
    })
    child.on('close', (code) => resolve({ code, stdout, stderr }))
  })

  const endedAt = new Date().toISOString()
  const jsonPath = `${reportBase}.report.json`
  const htmlPath = `${reportBase}.report.html`

  if (result.code !== 0) {
    return {
      id: page.id,
      label: page.label,
      url,
      status: 'failed',
      startedAt,
      endedAt,
      exitCode: result.code,
      stdout: result.stdout.slice(-1500),
      stderr: result.stderr.slice(-1500),
    }
  }

  const lhr = JSON.parse(await readFile(jsonPath, 'utf8'))
  const categories = Object.fromEntries(
    CATEGORIES.map((category) => [category, scorePercent(lhr.categories?.[category])]),
  )

  return {
    id: page.id,
    label: page.label,
    url,
    status: 'passed',
    startedAt,
    endedAt,
    lighthouseVersion: lhr.lighthouseVersion,
    fetchTime: lhr.fetchTime,
    requestedUrl: lhr.requestedUrl,
    finalUrl: lhr.finalDisplayedUrl || lhr.finalUrl,
    categories,
    audits: {
      firstContentfulPaintMs: auditMs(lhr.audits, 'first-contentful-paint'),
      largestContentfulPaintMs: auditMs(lhr.audits, 'largest-contentful-paint'),
      totalBlockingTimeMs: auditMs(lhr.audits, 'total-blocking-time'),
      speedIndexMs: auditMs(lhr.audits, 'speed-index'),
      cumulativeLayoutShift: auditValue(lhr.audits, 'cumulative-layout-shift'),
      interactiveMs: auditMs(lhr.audits, 'interactive'),
    },
    reports: {
      json: path.relative(process.cwd(), jsonPath),
      html: path.relative(process.cwd(), htmlPath),
    },
  }
}

function thresholdFailures(results) {
  const failures = []

  for (const result of results) {
    if (result.status !== 'passed') {
      failures.push(`${result.id}: Lighthouse command failed`)
      continue
    }

    for (const [category, threshold] of Object.entries(THRESHOLDS)) {
      const score = result.categories?.[category]
      if (typeof score !== 'number' || score < threshold * 100) {
        failures.push(`${result.id}: ${category} score ${score ?? 'n/a'} below ${Math.round(threshold * 100)}`)
      }
    }
  }

  return failures
}

function markdownReport({ args, outputDir, chromePath, lighthouseVersion, lhciVersion, results, failures }) {
  const rows = results.map((result) => {
    if (result.status !== 'passed') {
      return `| ${result.label} | failed | - | - | - | - | - | - | ${result.exitCode ?? 'n/a'} |`
    }

    return `| ${result.label} | passed | ${result.categories.performance ?? 'n/a'} | ${result.categories.accessibility ?? 'n/a'} | ${result.categories['best-practices'] ?? 'n/a'} | ${result.categories.seo ?? 'n/a'} | ${result.audits.largestContentfulPaintMs ?? 'n/a'} | ${result.audits.cumulativeLayoutShift ?? 'n/a'} | 0 |`
  })

  const runStatus = failures.length === 0 ? 'passed' : 'needs-review'
  const reportLines = [
    '# Public Lighthouse Measurement',
    '',
    `Status: ${runStatus}`,
    `Mode: ${args.mode}`,
    `Base URL: ${args.baseUrl}`,
    `Output directory: ${path.relative(process.cwd(), outputDir)}`,
    `Lighthouse: ${lighthouseVersion}`,
    `LHCI: ${lhciVersion}`,
    `Chrome path source: ${chromePath ? 'Playwright/CHROME_PATH' : 'system auto-detect'}`,
    '',
    '| Page | Status | Perf | A11y | Best | SEO | LCP ms | CLS | Exit |',
    '|---|---:|---:|---:|---:|---:|---:|---:|---:|',
    ...rows,
    '',
    '## Thresholds',
    '',
    Object.entries(THRESHOLDS)
      .map(([category, threshold]) => `- ${category}: ${Math.round(threshold * 100)}`)
      .join('\n'),
    '',
    '## Findings',
    '',
    failures.length === 0
      ? '- No Lighthouse command or configured threshold failures were recorded.'
      : failures.map((failure) => `- ${failure}`).join('\n'),
    '',
    '## Governance',
    '',
    '- No PageSpeed API key, Google property, AdSense tag, billing provider, donation provider or affiliate integration was used.',
    '- Reports are local artifacts under `artifacts/` and are ignored by git.',
    '- Scores are point-in-time measurements of public pages, not revenue or causality claims.',
    '',
  ]

  return `${reportLines.join('\n')}\n`
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const selectedPages = pages
    .filter((page) => args.mode === 'full' || page.mode === 'quick')
    .slice(0, args.routeLimit > 0 ? args.routeLimit : undefined)
  const outputDir = path.resolve(args.outputDir || path.join(DEFAULT_OUTPUT_ROOT, runId()))
  const chromePath = await resolveChromePath()

  await mkdir(outputDir, { recursive: true })

  const lighthouseVersion = toolVersion('lighthouse')
  const lhciVersion = toolVersion('lhci')
  const results = []

  for (const page of selectedPages) {
    results.push(await runLighthouse({ page, baseUrl: args.baseUrl, outputDir, chromePath }))
  }

  const failures = thresholdFailures(results)
  const summary = {
    status: failures.length === 0 ? 'passed' : 'needs-review',
    mode: args.mode,
    baseUrl: args.baseUrl,
    outputDir: path.relative(process.cwd(), outputDir),
    generatedAt: new Date().toISOString(),
    lighthouseVersion,
    lhciVersion,
    chromePathConfigured: Boolean(chromePath),
    categories: CATEGORIES,
    thresholds: THRESHOLDS,
    results,
    failures,
    governance: {
      noPageSpeedApiKey: true,
      noGooglePropertyMutation: true,
      noAdsenseActivation: true,
      noBillingDonationAffiliateActivation: true,
    },
  }

  await writeFile(path.join(outputDir, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`)
  await writeFile(path.join(outputDir, 'summary.md'), markdownReport({
    args,
    outputDir,
    chromePath,
    lighthouseVersion,
    lhciVersion,
    results,
    failures,
  }))

  console.log(`Public Lighthouse measurement status: ${summary.status}`)
  console.log(`Markdown: ${path.join(outputDir, 'summary.md')}`)
  console.log(`JSON: ${path.join(outputDir, 'summary.json')}`)

  const commandFailures = results.filter((result) => result.status !== 'passed')
  if (commandFailures.length > 0) process.exitCode = 1
  else if (args.failOnThresholds && failures.length > 0) process.exitCode = 1
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
