import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const apps = [
  'supersite',
  'netprobe-atlas',
  'calcharbor',
  'devutility-lab',
  'timenexus',
  'qrroute',
  'invoicecraft',
  'mailhealth',
  'sitepulse-lab',
  'pixelbatch',
  'docshift',
]

const localeCodes = ['en', 'pt-br', 'es', 'fr', 'de']
const nonEnglishLocales = new Set(localeCodes.filter((locale) => locale !== 'en'))

const forbiddenVisibleTerms = [
  /\bMVP\b/u,
  /\bgated\b/iu,
  /\bgates?\b/iu,
  /\bbloquead[oa]s?\b/iu,
  /\bgesperrt\b/iu,
  /\b(?:bloque|bloquee|bloquees|bloques)\b/iu,
  /deploy smoke/iu,
  /rollback validation/iu,
  /HUMAN_ACTION_REQUIRED/u,
  /Ad placeholder/iu,
  /No ads active/iu,
  /No file backend active/iu,
  /Monitoring gated/iu,
  /Commercial redirects gated/iu,
]

const englishFallbackSentinels = [
  'Structured Data Formatter',
  'Base64 Converter',
  'JWT Inspector',
  'Regex Tester',
  'Text Diff',
  'Cron Helper',
  'UUID Generator',
  'Timestamp Converter',
  'Hash Generator',
  'Time Zone Converter',
  'Date Difference Calculator',
  'Business Days Calculator',
  'Age Calculator',
  'Percentage Calculator',
  'Unit Converter',
  'Static QR Code Generator',
  'Barcode Generator',
  'UTM Builder',
  'vCard QR Builder',
  'Wi-Fi QR Builder',
  'QR Preview Lab',
  'Invoice Builder',
  'Quote Builder',
  'Receipt Builder',
  'SPF Checker',
  'DKIM Checker',
  'DMARC Checker',
  'MX Checker',
  'Blacklist Check',
  'SMTP Check',
  'Header Analyzer',
  'HTTP Status Checker',
  'Redirect Chain Checker',
  'Security Headers Checker',
  'Robots.txt Checker',
  'Sitemap Validator',
  'TTFB Checker',
  'Performance Snapshot',
  'Image Compressor',
  'Image Resizer',
  'Image Cropper',
  'Image Converter',
  'Metadata Remover',
  'Social Preset Generator',
  'PDF Merge',
  'PDF Split',
  'PDF Rotate',
  'PDF Compressor',
  'PDF Watermark',
  'PDF Page Numbers',
  'PDF Metadata Cleaner',
  'Text to PDF',
  'Create a scannable static QR code',
  'Compress a PNG',
  'Combine up to five small PDFs',
  'Find the SPF TXT record',
  'Enter a domain to',
  'Enter a public',
  'The result summarizes',
  'The result shows',
  'One point-in-time',
  'One same-origin',
  'Will MailHealth',
  'Can I paste',
  'Does valid XML',
  'MailHealth reads',
  'SitePulse derives',
  'A valid sitemap',
  'Review limits',
  'Lookup target',
  'Domain name',
  'Website URL',
  'Expected value (optional)',
  'Current connection',
  'Raw headers',
  'Run IP check',
  'Run DNS lookup',
  'Run RDAP lookup',
  'Run SSL check',
  'Run propagation check',
  'Run port check',
  'Run reachability check',
  'Run SPF check',
  'Run DKIM check',
  'Run DMARC check',
  'Run MX check',
  'Run blacklist check',
  'Run SMTP check',
  'Analyze headers',
  'Check status',
  'Trace redirects',
  'Check headers',
  'Check robots.txt',
  'Validate sitemap',
  'Measure TTFB',
  'Run snapshot',
  'Final URL',
]

function walkHtmlFiles(directory) {
  if (!existsSync(directory)) {
    return []
  }

  return readdirSync(directory).flatMap((entry) => {
    const absolute = join(directory, entry)
    const stats = statSync(absolute)

    if (stats.isDirectory()) {
      return walkHtmlFiles(absolute)
    }

    return entry.endsWith('.html') ? [absolute] : []
  })
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&nbsp;/giu, ' ')
    .replace(/&amp;/giu, '&')
    .replace(/&lt;/giu, '<')
    .replace(/&gt;/giu, '>')
    .replace(/&quot;/giu, '"')
    .replace(/&#39;/giu, "'")
    .replace(/&#(\d+);/gu, (_, code) => String.fromCodePoint(Number(code)))
}

function visibleText(html) {
  return decodeHtmlEntities(html)
    .replace(/<!--[\s\S]*?-->/gu, ' ')
    .replace(/<script[\s\S]*?<\/script>/giu, ' ')
    .replace(/<style[\s\S]*?<\/style>/giu, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/giu, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/giu, ' ')
    .replace(/<[^>]+>/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim()
}

function localeForFile(publicDir, file) {
  const segments = relative(publicDir, file).replace(/\\/gu, '/').split('/')

  return segments.find((segment) => localeCodes.includes(segment)) ?? null
}

const failures = []
let scannedFiles = 0

for (const app of apps) {
  const publicDir = join('apps', app, '.output', 'public')
  const htmlFiles = walkHtmlFiles(publicDir)

  for (const file of htmlFiles) {
    scannedFiles += 1
    const text = visibleText(readFileSync(file, 'utf8'))
    const relativeFile = relative(process.cwd(), file)
    const locale = localeForFile(publicDir, file)

    for (const pattern of forbiddenVisibleTerms) {
      if (pattern.test(text)) {
        failures.push(`${relativeFile}: forbidden public term matched ${pattern}`)
      }
    }

    if (locale && nonEnglishLocales.has(locale)) {
      for (const sentinel of englishFallbackSentinels) {
        if (text.includes(sentinel)) {
          failures.push(`${relativeFile}: English fallback copy visible on ${locale}: "${sentinel}"`)
        }
      }
    }
  }
}

if (scannedFiles === 0) {
  console.log('validate-public-copy: no generated HTML found; build apps before running the full copy gate.')
  process.exit(0)
}

if (failures.length > 0) {
  console.error(`validate-public-copy: ${failures.length} issue(s) found across ${scannedFiles} HTML files.`)
  failures.slice(0, 80).forEach((failure) => console.error(`- ${failure}`))
  if (failures.length > 80) {
    console.error(`- ...and ${failures.length - 80} more.`)
  }
  process.exit(1)
}

console.log(`validate-public-copy: ${scannedFiles} HTML files passed public copy checks.`)
