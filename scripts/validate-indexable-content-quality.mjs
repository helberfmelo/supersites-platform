import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const locales = ['en', 'pt-br', 'es', 'fr', 'de']
const supportSlugs = ['about', 'contact', 'privacy', 'cookies', 'terms', 'methodology', 'editorial-policy', 'status']
const apps = [
  { id: 'netprobe-atlas' },
  { id: 'calcharbor' },
  { id: 'devutility-lab' },
  { id: 'timenexus', excluded: ['world-clock/americas-europe', 'world-clock/global-product', 'world-clock/apac-europe'] },
  { id: 'qrroute' },
  { id: 'invoicecraft' },
  { id: 'mailhealth' },
  { id: 'sitepulse-lab' },
  { id: 'pixelbatch' },
  { id: 'docshift' },
]

function fail(message) {
  throw new Error(`[indexable-content] ${message}`)
}

function htmlFile(outputRoot, route) {
  const segments = route.split('/').filter(Boolean)
  return join(outputRoot, ...segments, 'index.html')
}

function hasMeta(html, name, value) {
  return [...html.matchAll(/<meta\b[^>]*>/giu)].some(([tag]) => {
    const metaName = tag.match(/\bname=["']([^"']+)["']/iu)?.[1]
    const content = tag.match(/\bcontent=["']([^"']+)["']/iu)?.[1]
    return metaName?.toLowerCase() === name.toLowerCase() && content?.toLowerCase().includes(value.toLowerCase())
  })
}

function visibleWordCount(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/iu)?.[1] ?? ''
  const text = main
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/giu, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/giu, ' ')
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/giu, ' ')
    .replace(/<[^>]+>/gu, ' ')
    .replace(/&(?:nbsp|amp|quot|#39);/giu, ' ')
    .replace(/\s+/gu, ' ')
    .trim()

  return text ? text.split(' ').length : 0
}

let indexableCount = 0
let excludedCount = 0

for (const app of apps) {
  const outputRoot = join(process.cwd(), 'apps', app.id, '.output', 'public')
  const sitemapFile = join(outputRoot, 'sitemap.xml')
  if (!existsSync(sitemapFile)) fail(`${app.id}: build output is missing; run its production build first`)

  const sitemap = readFileSync(sitemapFile, 'utf8')
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gu)].map((match) => match[1])
  if (!sitemapUrls.length) fail(`${app.id}: sitemap has no URLs`)

  for (const url of sitemapUrls) {
    const pathname = new URL(url).pathname
    const appPath = `/${app.id}`
    const appPathIndex = pathname.indexOf(appPath)
    if (appPathIndex < 0) fail(`${app.id}: sitemap URL is outside the app path: ${url}`)
    const relativeRoute = pathname.slice(appPathIndex + appPath.length) || '/'
    const file = htmlFile(outputRoot, relativeRoute)
    if (!existsSync(file)) fail(`${app.id}: sitemap route has no generated HTML: ${relativeRoute}`)

    const html = readFileSync(file, 'utf8')
    const words = visibleWordCount(html)
    if (hasMeta(html, 'robots', 'noindex')) fail(`${app.id}: sitemap contains a noindex route: ${relativeRoute}`)
    if ((html.match(/<h1\b/giu) ?? []).length !== 1) fail(`${app.id}: ${relativeRoute} must contain exactly one H1`)
    if (words < 300) fail(`${app.id}: ${relativeRoute} is too shallow for the indexable set (${words} visible words)`)
    indexableCount++
  }

  const excludedRoutes = locales.flatMap((locale) => [
    ...supportSlugs.map((slug) => `/${locale}/${slug}`),
    ...(app.excluded ?? []).map((route) => `/${locale}/${route}`),
  ])

  for (const route of excludedRoutes) {
    const file = htmlFile(outputRoot, route)
    if (!existsSync(file)) fail(`${app.id}: excluded support route was not prerendered: ${route}`)
    const html = readFileSync(file, 'utf8')
    if (!hasMeta(html, 'robots', 'noindex')) fail(`${app.id}: ${route} is missing robots noindex`)
    if (!hasMeta(html, 'AdsBot-Google', 'noindex')) fail(`${app.id}: ${route} is missing AdsBot-Google noindex`)
    if (sitemapUrls.some((url) => new URL(url).pathname.endsWith(`/${app.id}${route}`))) {
      fail(`${app.id}: sitemap still includes excluded route ${route}`)
    }
    excludedCount++
  }
}

console.log(`[indexable-content] PASS — ${indexableCount} useful child-app URLs kept indexable; ${excludedCount} support/programmatic routes remain accessible but are noindex and absent from sitemaps.`)
