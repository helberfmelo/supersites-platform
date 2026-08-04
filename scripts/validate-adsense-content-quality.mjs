import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const outputRoot = process.argv[2] ?? join(process.cwd(), 'apps', 'supersite', '.output', 'public')
const locales = ['en', 'pt-br']
const slugs = [
  'dns-propagation-troubleshooting',
  'spf-dkim-dmarc-checklist',
  'website-launch-technical-checklist',
  'private-file-processing',
]

function fail(message) {
  throw new Error(`[adsense-content] ${message}`)
}

function readRoute(route) {
  const file = join(outputRoot, ...route.split('/').filter(Boolean), 'index.html')

  try {
    return readFileSync(file, 'utf8')
  } catch {
    fail(`missing generated route ${route} at ${file}`)
  }
}

function visibleWordCount(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/iu)?.[1] ?? ''
  const text = main
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/giu, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/giu, ' ')
    .replace(/<[^>]+>/gu, ' ')
    .replace(/&(?:nbsp|amp|quot|#39);/giu, ' ')
    .replace(/\s+/gu, ' ')
    .trim()

  return text ? text.split(' ').length : 0
}

function count(html, pattern) {
  return [...html.matchAll(pattern)].length
}

const failures = []

for (const locale of locales) {
  const indexRoute = `/${locale}/guides`
  const indexHtml = readRoute(indexRoute)

  if (count(indexHtml, /<h1\b/giu) !== 1) failures.push(`${indexRoute}: expected one H1`)
  if (!indexHtml.includes(`/${locale}/guides/`)) failures.push(`${indexRoute}: guide links missing`)
  if (visibleWordCount(indexHtml) < 180) failures.push(`${indexRoute}: index content is too short`)

  for (const slug of slugs) {
    const route = `/${locale}/guides/${slug}`
    const html = readRoute(route)
    const words = visibleWordCount(html)
    const required = [
      ['one H1', count(html, /<h1\b/giu) === 1],
      ['meta description', /<meta\s+name="description"\s+content="[^"]{80,}"/iu.test(html)],
      ['canonical', new RegExp(`<link\\s+rel="canonical"\\s+href="https://opentshost\\.com/supersites/${locale}/guides/${slug}"`, 'iu').test(html)],
      ['Article schema', html.includes('&quot;@type&quot;:&quot;Article&quot;') || html.includes('"@type":"Article"')],
      ['FAQ schema', html.includes('&quot;@type&quot;:&quot;FAQPage&quot;') || html.includes('"@type":"FAQPage"')],
      ['editorial author', html.includes('SuperSites Editorial')],
      ['review date', html.includes('2026-08-04')],
      ['primary sources', count(html, /https:\/\/(?:datatracker\.ietf\.org|developers\.google\.com|owasp\.org|www\.w3\.org|developer\.mozilla\.org)/giu) >= 2],
      ['related public tools', count(html, /https:\/\/opentshost\.com\/supersites\/(?:netprobe-atlas|mailhealth|sitepulse-lab|pixelbatch|docshift)\//giu) >= 3],
      ['substantial visible content', words >= 650],
      ['no unsupported guide hreflang', !/hreflang="(?:es|fr|de)"/iu.test(html)],
      ['no active AdSense request', !/(pagead2\.googlesyndication\.com|adsbygoogle|google_ad_client)/iu.test(html)],
    ]

    for (const [label, passed] of required) {
      if (!passed) failures.push(`${route}: ${label} failed (words=${words})`)
    }
  }
}

const homeHtml = readRoute('/en')
if (!homeHtml.includes('/en/guides')) failures.push('/en: guide discovery link missing')

const sitemap = readFileSync(join(outputRoot, 'sitemap-hub.xml'), 'utf8')
for (const locale of locales) {
  for (const slug of slugs) {
    const url = `https://opentshost.com/supersites/${locale}/guides/${slug}`
    if (!sitemap.includes(url)) failures.push(`sitemap-hub.xml: missing ${url}`)
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'))
  process.exit(1)
}

console.log(`[adsense-content] PASS — ${slugs.length * locales.length} substantial guides, 2 indexes, schemas, sources, internal discovery and sitemap verified.`)
