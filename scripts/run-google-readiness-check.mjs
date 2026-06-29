#!/usr/bin/env node
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const defaultOutputRoot = path.join(repoRoot, 'artifacts', 'google-readiness')

const args = parseArgs(process.argv.slice(2))
const runId = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z').replaceAll(':', '-')
const outputDir = path.resolve(args.outputDir ?? path.join(defaultOutputRoot, runId))

const checks = []

const productionCodeRoots = [
  'apps/supersite/app',
  'apps/supersite/server',
  'apps/supersite/public',
  'apps/netprobe-atlas/app',
  'apps/netprobe-atlas/server',
  'apps/netprobe-atlas/public',
  'apps/calcharbor/app',
  'apps/calcharbor/server',
  'apps/calcharbor/public',
  'apps/devutility-lab/app',
  'apps/devutility-lab/server',
  'apps/devutility-lab/public',
  'apps/timenexus/app',
  'apps/timenexus/server',
  'apps/timenexus/public',
  'apps/qrroute/app',
  'apps/qrroute/server',
  'apps/qrroute/public',
  'apps/invoicecraft/app',
  'apps/invoicecraft/server',
  'apps/invoicecraft/public',
  'apps/mailhealth/app',
  'apps/mailhealth/server',
  'apps/mailhealth/public',
  'apps/sitepulse-lab/app',
  'apps/sitepulse-lab/server',
  'apps/sitepulse-lab/public',
  'apps/pixelbatch/app',
  'apps/pixelbatch/server',
  'apps/pixelbatch/public',
  'apps/docshift/app',
  'apps/docshift/server',
  'apps/docshift/public',
  'apps/control-plane/app',
  'apps/control-plane/resources',
  'apps/control-plane/routes',
  'apps/control-plane/public',
]

const forbiddenProviderPatterns = [
  {
    label: 'Google Tag Manager loader',
    pattern: /https?:\/\/www\.googletagmanager\.com\/(?:gtm\.js|gtag\/js)/i,
  },
  {
    label: 'GA4 measurement id',
    pattern: /\bG-[A-Z0-9]{6,}\b/i,
  },
  {
    label: 'GTM container id',
    pattern: /\bGTM-[A-Z0-9]{4,}\b/i,
  },
  {
    label: 'AdSense loader',
    pattern: /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/i,
  },
  {
    label: 'AdSense publisher id',
    pattern: /\bca-pub-\d{16}\b/i,
  },
  {
    label: 'AdSense request push',
    pattern: /adsbygoogle\.push\s*\(/i,
  },
  {
    label: 'Search Console verification meta',
    pattern: /google-site-verification/i,
  },
  {
    label: 'Google Analytics collection endpoint',
    pattern: /google-analytics\.com\/(?:collect|g\/collect)/i,
  },
  {
    label: 'DoubleClick endpoint',
    pattern: /doubleclick\.net/i,
  },
]

await fs.mkdir(outputDir, { recursive: true })

await checkDocs()
await checkAnalyticsContract()
await checkAdSenseContract()
await checkControlPlaneSeeders()
await checkPublicProviderAbsence()
await checkPublicAdsTxtAbsence()
await checkValidatorCoverage()

const failedChecks = checks.filter((check) => check.status !== 'passed')
const summary = {
  runId,
  generatedAt: new Date().toISOString(),
  status: failedChecks.length === 0 ? 'passed' : 'failed',
  checkCount: checks.length,
  failedCount: failedChecks.length,
  providerActivation: {
    ga4: false,
    gtm: false,
    searchConsole: false,
    adsense: false,
    pageSpeedApi: false,
  },
  outputDir: relativePath(outputDir),
}

const report = {
  ...summary,
  checks,
}

await fs.writeFile(path.join(outputDir, 'google-readiness.json'), `${JSON.stringify(report, null, 2)}\n`)
await fs.writeFile(path.join(outputDir, 'google-readiness.md'), buildMarkdown(report))

console.log(`Google readiness status: ${summary.status}`)
console.log(`Run: ${runId}`)
console.log(`JSON: ${path.join(outputDir, 'google-readiness.json')}`)
console.log(`Markdown: ${path.join(outputDir, 'google-readiness.md')}`)

if (summary.status !== 'passed') {
  for (const check of failedChecks) {
    console.error(`FAILED ${check.id}: ${check.summary}`)
  }
  process.exit(1)
}

async function checkDocs() {
  await assertFileContains({
    id: 'human-google-gate-documented',
    category: 'human gates',
    file: 'docs/HUMAN_ACTION_REQUIRED.md',
    required: [
      /Acessos Google, GA4, GTM e Search Console/i,
      /Antes de carregar tags GA4\/GTM ou importar dados Search Console/i,
    ],
    summary: 'Google access, GA4, GTM and Search Console remain human-gated.',
  })

  await assertFileContains({
    id: 'human-adsense-gate-documented',
    category: 'human gates',
    file: 'docs/HUMAN_ACTION_REQUIRED.md',
    required: [
      /Criar\/reutilizar conta AdSense/i,
      /publisher id, adicionar sites, ativar Management API ou publicar `ads\.txt`/i,
    ],
    summary: 'AdSense account, publisher id, site review, Management API and ads.txt remain human-gated.',
  })

  await assertFileContains({
    id: 'analytics-google-gate-documented',
    category: 'documentation',
    file: 'docs/ANALYTICS.md',
    required: [
      /resolveGoogleIntegrationGate/i,
      /falha fechado/i,
      /Sprint 6\.2 nao ativa scripts GA4\/GTM/i,
      /Search Console fica planejado/i,
    ],
    summary: 'Analytics documentation describes the fail-closed Google gate and no active tags.',
  })

  await assertFileContains({
    id: 'adsense-playbook-safe-public-gate',
    category: 'documentation',
    file: 'docs/ADSENSE_PLAYBOOK.md',
    required: [
      /validate:adsense-safe-public/i,
      /deve falhar se houver requests\/DOM de AdSense, GTM\/GA4/i,
      /nao substitui aprovacao humana/i,
    ],
    summary: 'AdSense playbook requires the public safe gate and human approval before serving.',
  })

  await assertFileContains({
    id: 'google-accounts-no-provider-active',
    category: 'documentation',
    file: 'docs/GOOGLE_ACCOUNTS.md',
    required: [
      /Nenhum script GA4\/GTM/i,
      /Nenhum site foi adicionado ao AdSense/i,
      /nenhuma API\/snippet\/request de anuncio foi ativado/i,
    ],
    summary: 'Google accounts documentation states that tags, imports and ad serving are inactive.',
  })
}

async function checkAnalyticsContract() {
  const file = 'packages/analytics/src/index.ts'
  const content = await readRequiredFile(file)
  const allowedParameters = extractStringArray(
    content,
    /export const googleAllowedEventParameterNames = \[([\s\S]*?)\] as const/,
  )
  const riskyParameters = allowedParameters.filter((name) =>
    /(?:email|ip|user|client|cookie|domain|query|input|raw|revenue|amount|price)/i.test(name),
  )

  addCheck({
    id: 'analytics-google-parameter-allowlist',
    category: 'analytics contract',
    status: riskyParameters.length === 0 && allowedParameters.length > 0 ? 'passed' : 'failed',
    summary:
      riskyParameters.length === 0
        ? `Google event allowlist is limited to ${allowedParameters.join(', ')}.`
        : `Google event allowlist contains risky parameters: ${riskyParameters.join(', ')}.`,
    evidence: [file],
  })

  await assertFileContains({
    id: 'analytics-google-gate-fails-closed',
    category: 'analytics contract',
    file,
    required: [
      /export function resolveGoogleIntegrationGate/i,
      /Google tags are disabled outside production/i,
      /Google access, property creation and verification require a human gate/i,
      /GA4 measurement id is not configured/i,
      /GTM container id is not configured/i,
      /Search Console property is not verified/i,
      /status: canLoadTags \? 'configured' : input\.humanApproved \? 'not_configured' : 'human_required'/i,
    ],
    summary: 'Google integration gate stays blocked until production, consent, human approval and IDs are present.',
  })

  await assertFileContains({
    id: 'analytics-google-event-null-when-blocked',
    category: 'analytics contract',
    file,
    required: [
      /export function createGoogleDataLayerEvent/i,
      /if \(!gate\.shouldLoadGtm && !gate\.shouldLoadGa4\)/i,
      /return null/i,
    ],
    summary: 'Google data layer event creation returns null while GA4/GTM delivery is blocked.',
  })

  await assertFileContains({
    id: 'search-console-plan-human-required',
    category: 'analytics contract',
    file,
    required: [
      /export function buildSearchConsolePropertyPlan/i,
      /verificationStatus: 'human_required'/i,
      /Search Console ownership verification requires approved Google access/i,
    ],
    summary: 'Search Console planning does not create verification; ownership remains human-gated.',
  })
}

async function checkAdSenseContract() {
  await assertFileContains({
    id: 'ads-slot-delivery-disabled',
    category: 'ads contract',
    file: 'packages/ads/src/index.ts',
    required: [
      /export function createAdSlotPlan/i,
      /delivery-disabled/i,
      /Ad delivery is disabled; render an inert reserved placeholder only/i,
      /shouldRequestAd: false/i,
    ],
    summary: 'Ad slot planning supports inert placeholders without ad requests.',
  })

  await assertFileContains({
    id: 'adsense-account-human-required',
    category: 'ads contract',
    file: 'packages/ads/src/index.ts',
    required: [
      /export function resolveAdSenseAccountGate/i,
      /AdSense account actions require explicit human approval/i,
      /A valid AdSense publisher id is not configured/i,
      /canServeAds: canUsePublisherAccount/i,
    ],
    summary: 'AdSense account readiness requires human approval and a valid publisher id.',
  })

  await assertFileContains({
    id: 'adsense-site-review-not-automatic',
    category: 'ads contract',
    file: 'packages/ads/src/index.ts',
    required: [
      /export function buildAdSenseSiteReviewPlan/i,
      /shouldSubmitAutomatically: false/i,
      /shouldServeAds:/i,
      /A definitive domain must be approved before AdSense site review/i,
    ],
    summary: 'AdSense site review planning does not auto-submit sites.',
  })
}

async function checkControlPlaneSeeders() {
  await assertFileContains({
    id: 'control-plane-google-seeded-inactive',
    category: 'control plane',
    file: 'apps/control-plane/database/seeders/GoogleIntegrationSeeder.php',
    required: [
      /'ga4_measurement_id' => null/i,
      /'gtm_container_id' => null/i,
      /'search_console_property' => null/i,
      /'access_status' => 'human_required'/i,
      /'ga4_status' => 'not_configured'/i,
      /'gtm_status' => 'not_configured'/i,
      /'search_console_status' => 'human_required'/i,
      /'tags_enabled' => false/i,
      /'data_import_enabled' => false/i,
    ],
    summary: 'Control-plane Google readiness seeds no ids, tags or imports.',
  })

  await assertFileContains({
    id: 'control-plane-adsense-seeded-inactive',
    category: 'control plane',
    file: 'apps/control-plane/database/seeders/AdSenseReadinessSeeder.php',
    required: [
      /'publisher_id' => null/i,
      /'beneficiary_status' => 'human_required'/i,
      /'account_ready' => false/i,
      /'management_api_enabled' => false/i,
      /'ad_serving_enabled' => false/i,
      /'ads_txt_status' => 'not_published'/i,
      /'placements_enabled' => false/i,
      /'auto_ads_enabled' => false/i,
    ],
    summary: 'Control-plane AdSense readiness seeds no publisher id, API, placements or serving.',
  })
}

async function checkPublicProviderAbsence() {
  const files = await listExistingFiles(productionCodeRoots)
  const findings = []

  for (const file of files) {
    if (!isTextFile(file)) {
      continue
    }

    const content = await fs.readFile(file, 'utf8')
    for (const forbidden of forbiddenProviderPatterns) {
      if (forbidden.pattern.test(content)) {
        findings.push(`${relativePath(file)} (${forbidden.label})`)
      }
    }
  }

  addCheck({
    id: 'public-code-no-active-google-or-adsense-snippets',
    category: 'public surface',
    status: findings.length === 0 ? 'passed' : 'failed',
    summary:
      findings.length === 0
        ? `No active GA4/GTM/Search Console/AdSense snippets found across ${files.length} public production files.`
        : `Active provider markers found: ${findings.join('; ')}.`,
    evidence: findings.length === 0 ? productionCodeRoots : findings,
  })
}

async function checkPublicAdsTxtAbsence() {
  const roots = [
    'apps/supersite/public',
    'apps/netprobe-atlas/public',
    'apps/calcharbor/public',
    'apps/devutility-lab/public',
    'apps/timenexus/public',
    'apps/qrroute/public',
    'apps/invoicecraft/public',
    'apps/mailhealth/public',
    'apps/sitepulse-lab/public',
    'apps/pixelbatch/public',
    'apps/docshift/public',
  ]
  const files = await listExistingFiles(roots)
  const adsTxtFiles = files.filter((file) => path.basename(file).toLowerCase() === 'ads.txt')

  addCheck({
    id: 'public-no-ads-txt-placeholder',
    category: 'public surface',
    status: adsTxtFiles.length === 0 ? 'passed' : 'failed',
    summary:
      adsTxtFiles.length === 0
        ? 'No ads.txt file is published before an approved publisher id exists.'
        : `Unexpected ads.txt files found: ${adsTxtFiles.map(relativePath).join(', ')}.`,
    evidence: adsTxtFiles.length === 0 ? roots : adsTxtFiles.map(relativePath),
  })
}

async function checkValidatorCoverage() {
  await assertFileContains({
    id: 'adsense-safe-public-validator-covers-google-markers',
    category: 'validation',
    file: 'scripts/validate-adsense-safe-public.mjs',
    required: [
      /adsbygoogle/i,
      /googletagmanager/i,
      /google-analytics/i,
      /doubleclick/i,
      /No real ad, analytics, payment, donation, affiliate, checkout or billing provider was activated/i,
    ],
    summary: 'Public AdSense-safe validator blocks current ad, analytics, payment, donation and affiliate markers.',
  })

  await assertFileContains({
    id: 'package-command-registered',
    category: 'validation',
    file: 'package.json',
    required: [/\"measure:google-ready\": \"node scripts\/run-google-readiness-check\.mjs\"/i],
    summary: 'Workspace exposes the Google readiness measurement command.',
  })
}

async function assertFileContains({ id, category, file, required, summary }) {
  const content = await readRequiredFile(file)
  const missing = required.filter((pattern) => !pattern.test(content))

  addCheck({
    id,
    category,
    status: missing.length === 0 ? 'passed' : 'failed',
    summary: missing.length === 0 ? summary : `${summary} Missing patterns: ${missing.map(String).join(', ')}`,
    evidence: [file],
  })
}

async function readRequiredFile(file) {
  const absolutePath = path.join(repoRoot, file)
  try {
    return await fs.readFile(absolutePath, 'utf8')
  } catch (error) {
    addCheck({
      id: `file-present-${file.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`,
      category: 'filesystem',
      status: 'failed',
      summary: `Required file is missing: ${file}.`,
      evidence: [file],
    })
    throw error
  }
}

function extractStringArray(content, pattern) {
  const match = content.match(pattern)
  if (!match) {
    return []
  }

  return Array.from(match[1].matchAll(/'([^']+)'/g), (item) => item[1])
}

async function listExistingFiles(roots) {
  const files = []

  for (const root of roots) {
    const absoluteRoot = path.join(repoRoot, root)
    if (!(await pathExists(absoluteRoot))) {
      continue
    }

    files.push(...(await walkFiles(absoluteRoot)))
  }

  return files.sort((left, right) => left.localeCompare(right))
}

async function walkFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      if (['.nuxt', '.output', 'node_modules', 'vendor', 'storage', 'bootstrap'].includes(entry.name)) {
        continue
      }

      files.push(...(await walkFiles(absolutePath)))
    } else if (entry.isFile()) {
      files.push(absolutePath)
    }
  }

  return files
}

async function pathExists(absolutePath) {
  try {
    await fs.access(absolutePath)
    return true
  } catch {
    return false
  }
}

function isTextFile(file) {
  return /\.(?:css|html|js|json|mjs|php|ts|tsx|txt|vue|xml)$/i.test(file)
}

function addCheck(check) {
  checks.push({
    ...check,
    evidence: (check.evidence ?? []).map((item) => (path.isAbsolute(item) ? relativePath(item) : item)),
  })
}

function buildMarkdown(report) {
  const lines = [
    '# Google Readiness Check',
    '',
    `Run: \`${report.runId}\``,
    `Status: \`${report.status}\``,
    `Checks: ${report.checkCount}`,
    `Failures: ${report.failedCount}`,
    '',
    '## Provider activation',
    '',
    '| Provider | Active |',
    '|---|---:|',
    ...Object.entries(report.providerActivation).map(([provider, active]) => `| ${provider} | ${active ? 'yes' : 'no'} |`),
    '',
    '## Checks',
    '',
    '| Status | Category | Check | Summary |',
    '|---|---|---|---|',
    ...report.checks.map((check) => {
      const summary = check.summary.replace(/\|/g, '\\|')
      return `| ${check.status} | ${check.category} | \`${check.id}\` | ${summary} |`
    }),
    '',
    '## Human gates',
    '',
    '- GA4, GTM and Search Console property creation, verification and tag delivery remain in `docs/HUMAN_ACTION_REQUIRED.md`.',
    '- AdSense account, publisher id, Management API, ads.txt and site submission remain in `docs/HUMAN_ACTION_REQUIRED.md`.',
    '- This report does not create Google properties, containers, verification records, ad requests or external analytics traffic.',
    '',
  ]

  return `${lines.join('\n')}\n`
}

function relativePath(value) {
  return path.relative(repoRoot, value).replaceAll(path.sep, '/')
}

function parseArgs(rawArgs) {
  const parsed = {}

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index]

    if (arg === '--output-dir') {
      parsed.outputDir = rawArgs[index + 1]
      index += 1
    } else if (arg.startsWith('--output-dir=')) {
      parsed.outputDir = arg.slice('--output-dir='.length)
    }
  }

  return parsed
}
