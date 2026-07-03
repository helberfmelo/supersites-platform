#!/usr/bin/env node
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = parseArgs(process.argv.slice(2))
const runId = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z').replaceAll(':', '-')
const outputDir = path.resolve(args.outputDir ?? path.join(repoRoot, 'artifacts', 'google-platform-setup', runId))

const baseUrl = 'https://opentshost.com/supersites'
const sites = [
  { slug: 'supersite', name: 'SuperSites Hub', kind: 'hub', url: `${baseUrl}/` },
  { slug: 'netprobe-atlas', name: 'NetProbe Atlas', kind: 'utility', url: `${baseUrl}/netprobe-atlas/` },
  { slug: 'calcharbor', name: 'CalcHarbor', kind: 'utility', url: `${baseUrl}/calcharbor/` },
  { slug: 'devutility-lab', name: 'DevUtility Lab', kind: 'utility', url: `${baseUrl}/devutility-lab/` },
  { slug: 'timenexus', name: 'TimeNexus', kind: 'utility', url: `${baseUrl}/timenexus/` },
  { slug: 'qrroute', name: 'QRRoute', kind: 'utility', url: `${baseUrl}/qrroute/` },
  { slug: 'invoicecraft', name: 'InvoiceCraft', kind: 'utility', url: `${baseUrl}/invoicecraft/` },
  { slug: 'mailhealth', name: 'MailHealth', kind: 'utility', url: `${baseUrl}/mailhealth/` },
  { slug: 'sitepulse-lab', name: 'SitePulse Lab', kind: 'utility', url: `${baseUrl}/sitepulse-lab/` },
  { slug: 'pixelbatch', name: 'PixelBatch', kind: 'utility', url: `${baseUrl}/pixelbatch/` },
  { slug: 'docshift', name: 'DocShift', kind: 'utility', url: `${baseUrl}/docshift/` },
]

const officialReferences = {
  ga4: 'https://support.google.com/analytics/answer/9304153',
  gtm: 'https://support.google.com/tagmanager/answer/14842164',
  searchConsole: 'https://support.google.com/webmasters/answer/34592',
  adsenseAccount: 'https://support.google.com/adsense/answer/7402253',
  adsenseSite: 'https://support.google.com/adsense/answer/7584263',
  adsenseUrlRules: 'https://support.google.com/adsense/answer/2784438',
}

const packet = {
  runId,
  generatedAt: new Date().toISOString(),
  mode: 'manual_google_platform_setup_packet',
  sideEffects: 'none',
  providerActivation: {
    googleAnalytics: false,
    googleTagManager: false,
    searchConsole: false,
    adsense: false,
    pageSpeedApi: false,
  },
  humanGates: [
    'Google terms acceptance by an authorized human',
    'GA4 property creation and Measurement ID collection',
    'GTM account/container creation and Container ID collection',
    'Search Console ownership verification',
    'AdSense legal beneficiary, account reuse/creation, tax, payment profile, bank and PIN',
    'Definitive domains or approved root mapping before AdSense site submission',
    'CMP/consent review before loading external tags or ad requests',
  ],
  references: officialReferences,
  currentInternalProduction: {
    domain: 'opentshost.com',
    path: '/supersites/',
    note: 'This is internal technical production. AdSense URL rules normally require a standard domain URL without a path, so site submission remains blocked until a definitive domain/root mapping decision.',
  },
  ga4Plan: {
    accountName: 'SuperSites',
    properties: [
      {
        name: 'SuperSites Portfolio - opentshost.com',
        scope: 'current internal technical production',
        defaultUrl: `${baseUrl}/`,
        timeZone: 'America/Sao_Paulo',
        currency: 'USD',
        activationState: 'human_required',
        repoConfigurationState: 'not_configured',
      },
    ],
    allowedParameters: ['tool_slug', 'plan_slug', 'site_position', 'result_action', 'file_kind', 'target_url'],
    blockedData: ['email', 'phone', 'full_name', 'ip', 'query_string', 'tool_input', 'tool_result', 'file_content'],
  },
  gtmPlan: {
    accountName: 'SuperSites',
    containers: [
      {
        name: 'SuperSites Web - opentshost.com',
        targetPlatform: 'web',
        defaultUrl: `${baseUrl}/`,
        activationState: 'human_required',
        repoConfigurationState: 'not_configured',
      },
    ],
  },
  searchConsolePlan: [
    {
      propertyType: 'url-prefix',
      url: `${baseUrl}/`,
      activationState: 'human_required',
      verificationState: 'not_verified',
      repoConfigurationState: 'not_configured',
    },
  ],
  adsensePlan: {
    accountLabel: 'primary-publisher',
    activationState: 'human_required',
    publicAdsTxtState: 'not_published',
    siteSubmissionState: 'blocked',
    blocker: 'AdSense account/legal/payment gates and definitive domain/root mapping are still pending.',
    candidateSites: sites.map((site) => ({
      slug: site.slug,
      name: site.name,
      currentUrl: site.url,
      submitNow: false,
      reason: site.slug === 'supersite'
        ? 'Use only after publisher account, policies, consent and root/domain decision are approved.'
        : 'Current URL contains a path under opentshost.com; submit after definitive domain/root mapping and site-specific review.',
    })),
  },
  repoFollowUpAfterHumanSetup: [
    'Store GA4 Measurement ID, GTM Container ID, Search Console verification and AdSense publisher ID only in secret manager/environment.',
    'Update control-plane readiness records from human_required/not_configured to configured only after verification.',
    'Run pnpm measure:google-ready and pnpm validate:adsense-safe-public before enabling any external tag or ads.txt.',
    'Publish ads.txt only after publisher ID, legal/tax/payment gates, domain/root mapping and site review are complete.',
  ],
}

await fs.mkdir(outputDir, { recursive: true })
await fs.writeFile(path.join(outputDir, 'google-platform-setup.json'), `${JSON.stringify(packet, null, 2)}\n`)
await fs.writeFile(path.join(outputDir, 'google-platform-setup.md'), buildMarkdown(packet))

console.log(`Google platform setup packet: ${path.relative(repoRoot, outputDir).replaceAll(path.sep, '/')}`)
console.log(`JSON: ${path.join(outputDir, 'google-platform-setup.json')}`)
console.log(`Markdown: ${path.join(outputDir, 'google-platform-setup.md')}`)

function buildMarkdown(data) {
  const lines = [
    '# Google Platform Setup Packet',
    '',
    `Run: \`${data.runId}\``,
    `Mode: \`${data.mode}\``,
    `Side effects: \`${data.sideEffects}\``,
    '',
    '## Provider Activation',
    '',
    '| Surface | Active |',
    '|---|---:|',
    ...Object.entries(data.providerActivation).map(([surface, active]) => `| ${surface} | ${active ? 'yes' : 'no'} |`),
    '',
    '## Current Production Context',
    '',
    `- Domain: \`${data.currentInternalProduction.domain}\``,
    `- Path: \`${data.currentInternalProduction.path}\``,
    `- Note: ${data.currentInternalProduction.note}`,
    '',
    '## Manual Human Gates',
    '',
    ...data.humanGates.map((gate) => `- ${gate}`),
    '',
    '## GA4',
    '',
    `Account: \`${data.ga4Plan.accountName}\``,
    '',
    '| Property | URL | State |',
    '|---|---|---|',
    ...data.ga4Plan.properties.map((property) => `| ${property.name} | ${property.defaultUrl} | ${property.activationState} |`),
    '',
    `Allowed event parameters: ${data.ga4Plan.allowedParameters.map((item) => `\`${item}\``).join(', ')}`,
    '',
    '## Google Tag Manager',
    '',
    `Account: \`${data.gtmPlan.accountName}\``,
    '',
    '| Container | Platform | State |',
    '|---|---|---|',
    ...data.gtmPlan.containers.map((container) => `| ${container.name} | ${container.targetPlatform} | ${container.activationState} |`),
    '',
    '## Search Console',
    '',
    '| Type | URL | Verification |',
    '|---|---|---|',
    ...data.searchConsolePlan.map((property) => `| ${property.propertyType} | ${property.url} | ${property.verificationState} |`),
    '',
    '## AdSense',
    '',
    `Account label: \`${data.adsensePlan.accountLabel}\``,
    `State: \`${data.adsensePlan.activationState}\``,
    `Blocker: ${data.adsensePlan.blocker}`,
    '',
    '| Site | Current URL | Submit Now | Reason |',
    '|---|---|---:|---|',
    ...data.adsensePlan.candidateSites.map((site) => `| ${site.name} | ${site.currentUrl} | ${site.submitNow ? 'yes' : 'no'} | ${site.reason} |`),
    '',
    '## Repo Follow-Up After Human Setup',
    '',
    ...data.repoFollowUpAfterHumanSetup.map((item) => `- ${item}`),
    '',
    '## Official References',
    '',
    ...Object.entries(data.references).map(([label, url]) => `- ${label}: ${url}`),
    '',
  ]

  return `${lines.join('\n')}\n`
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
