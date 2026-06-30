<script setup lang="ts">
import { limitSeoText, SEO_DESCRIPTION_MAX_LENGTH } from '@supersites/seo'
import { getStatusBadgeClass } from '@supersites/ui'
import {
  getCalcHarborCatalogCopy,
  getDetailCopy,
  getDevUtilityCatalogCopy,
  getDocShiftCatalogCopy,
  getInvoiceCraftCatalogCopy,
  getMailHealthCatalogCopy,
  getNetProbeCatalogCopy,
  getPixelBatchCatalogCopy,
  getQrRouteCatalogCopy,
  getSitePulseCatalogCopy,
  getTimeNexusCatalogCopy,
  type CalcHarborCatalogCategoryKey,
  type DevUtilityCatalogCategoryKey,
  type DevUtilityCatalogToolLink,
  type DocShiftCatalogCategoryKey,
  type DocShiftCatalogToolLink,
  type InvoiceCraftCatalogCategoryKey,
  type InvoiceCraftCatalogToolLink,
  type MailHealthCatalogCategoryKey,
  type MailHealthCatalogToolLink,
  type PixelBatchCatalogCategoryKey,
  type PixelBatchCatalogToolLink,
  type QrRouteCatalogCategoryKey,
  type QrRouteCatalogToolLink,
  type SitePulseCatalogCategoryKey,
  type SitePulseCatalogToolLink,
  type TimeNexusCatalogCategoryKey,
  type TimeNexusCatalogLink,
} from '../../../data/copy'
import { localizedHomePath, localizedSitePath, normalizeLocale, toIntlLocale } from '../../../data/locales'
import { absoluteUrl, localeAlternates } from '../../../data/routes'
import { createSiteDetailStructuredData } from '../../../data/schema'
import { getCategoryLabel, getSiteBySlug, statusLabels } from '../../../data/sites'
import { trackOutboundSiteClick } from '../../../utils/analytics'

const route = useRoute()
const locale = normalizeLocale(route.params.locale?.toString())
const site = getSiteBySlug(route.params.slug?.toString())

if (!locale || !site) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Site not found',
  })
}

const copy = getDetailCopy(locale)
const netProbeCopy = getNetProbeCatalogCopy(locale)
const calcHarborCopy = getCalcHarborCatalogCopy(locale)
const devUtilityCopy = getDevUtilityCatalogCopy(locale)
const timeNexusCopy = getTimeNexusCatalogCopy(locale)
const qrRouteCopy = getQrRouteCatalogCopy(locale)
const invoiceCraftCopy = getInvoiceCraftCatalogCopy(locale)
const mailHealthCopy = getMailHealthCatalogCopy(locale)
const sitePulseCopy = getSitePulseCatalogCopy(locale)
const pixelBatchCopy = getPixelBatchCatalogCopy(locale)
const docShiftCopy = getDocShiftCatalogCopy(locale)
const siteText = site.localized[locale]
const seoDescription = limitSeoText(siteText.summary, SEO_DESCRIPTION_MAX_LENGTH)
const canonicalPath = localizedSitePath(locale, site.slug)
const structuredData = createSiteDetailStructuredData(locale, site)
const isNetProbeCatalog = site.slug === 'netprobe-atlas'
const isCalcHarborCatalog = site.slug === 'calcharbor'
const isDevUtilityCatalog = site.slug === 'devutility-lab'
const isTimeNexusCatalog = site.slug === 'timenexus'
const isQrRouteCatalog = site.slug === 'qrroute'
const isInvoiceCraftCatalog = site.slug === 'invoicecraft'
const isMailHealthCatalog = site.slug === 'mailhealth'
const isSitePulseCatalog = site.slug === 'sitepulse-lab'
const isPixelBatchCatalog = site.slug === 'pixelbatch'
const isDocShiftCatalog = site.slug === 'docshift'
const primaryNetProbePath = netProbeCopy.toolLinks[0]?.path ?? '/tools/what-is-my-ip'
const secondaryNetProbePath = netProbeCopy.toolLinks[1]?.path ?? '/tools/dns-propagation'
const primaryCalcHarborPath = calcHarborCopy.calculators.find((tool) => tool.path === '/calculators/loan-payment')?.path ?? '/calculators/loan-payment'
const calcHarborFeaturedCalculators = calcHarborCopy.calculators.filter((tool) => tool.featured)
const calcHarborSearchQuery = ref('')
const calcHarborSelectedCategory = ref<CalcHarborCatalogCategoryKey | 'all'>('all')
const filteredCalcHarborCalculators = computed(() => {
  const query = calcHarborSearchQuery.value.trim().toLowerCase()

  return calcHarborCopy.calculators.filter((tool) => {
    const matchesCategory = calcHarborSelectedCategory.value === 'all' || tool.category === calcHarborSelectedCategory.value
    const searchable = [tool.label, tool.body, tool.path, tool.glyph].join(' ').toLowerCase()

    return matchesCategory && (!query || searchable.includes(query))
  })
})
const primaryDevUtilityPath = devUtilityCopy.tools.find((tool) => tool.path === '/tools/structured-data-formatter')?.path ?? '/tools/structured-data-formatter'
const devUtilitySearchQuery = ref('')
const devUtilitySelectedCategory = ref<DevUtilityCatalogCategoryKey | 'all'>('all')
const filteredDevUtilityTools = computed(() => {
  const query = devUtilitySearchQuery.value.trim().toLowerCase()

  return devUtilityCopy.tools.filter((tool) => {
    const matchesCategory = devUtilitySelectedCategory.value === 'all' || tool.category === devUtilitySelectedCategory.value
    const searchable = [tool.label, tool.body, tool.path, tool.glyph].join(' ').toLowerCase()

    return matchesCategory && (!query || searchable.includes(query))
  })
})
const devUtilityShortcutGroups = computed(() => (
  devUtilityCopy.shortcutGroups.map((group) => ({
    ...group,
    tools: group.paths
      .map((path) => devUtilityCopy.tools.find((tool) => tool.path === path))
      .filter((tool): tool is DevUtilityCatalogToolLink => Boolean(tool)),
  }))
))
const primaryTimeNexusPath = timeNexusCopy.links.find((tool) => tool.path === '/tools/timezone-converter')?.path ?? '/tools/timezone-converter'
const timeNexusFeaturedLinks = timeNexusCopy.links.filter((tool) => tool.featured)
const timeNexusSearchQuery = ref('')
const timeNexusSelectedCategory = ref<TimeNexusCatalogCategoryKey | 'all'>('all')
const timeNexusCurrentTime = ref('')
const timeNexusCurrentDate = ref('')
let timeNexusClockTimer: ReturnType<typeof setInterval> | null = null
const filteredTimeNexusLinks = computed(() => {
  const query = timeNexusSearchQuery.value.trim().toLowerCase()

  return timeNexusCopy.links.filter((tool) => {
    const matchesCategory = timeNexusSelectedCategory.value === 'all' || tool.category === timeNexusSelectedCategory.value
    const searchable = [tool.label, tool.body, tool.path, tool.glyph].join(' ').toLowerCase()

    return matchesCategory && (!query || searchable.includes(query))
  })
})
const timeNexusShortcutGroups = computed(() => (
  timeNexusCopy.shortcutGroups.map((group) => ({
    ...group,
    links: group.paths
      .map((path) => timeNexusCopy.links.find((tool) => tool.path === path))
      .filter((tool): tool is TimeNexusCatalogLink => Boolean(tool)),
  }))
))
const primaryQrRoutePath = qrRouteCopy.tools.find((tool) => tool.path === '/tools/static-qr-code')?.path ?? '/tools/static-qr-code'
const qrRouteFeaturedTools = qrRouteCopy.tools.filter((tool) => tool.featured)
const qrRouteSearchQuery = ref('')
const qrRouteSelectedCategory = ref<QrRouteCatalogCategoryKey | 'all'>('all')
const filteredQrRouteTools = computed(() => {
  const query = qrRouteSearchQuery.value.trim().toLowerCase()

  return qrRouteCopy.tools.filter((tool) => {
    const matchesCategory = qrRouteSelectedCategory.value === 'all' || tool.category === qrRouteSelectedCategory.value
    const searchable = [tool.label, tool.body, tool.path, tool.glyph].join(' ').toLowerCase()

    return matchesCategory && (!query || searchable.includes(query))
  })
})
const qrRouteShortcutGroups = computed(() => (
  qrRouteCopy.shortcutGroups.map((group) => ({
    ...group,
    tools: group.paths
      .map((path) => qrRouteCopy.tools.find((tool) => tool.path === path))
      .filter((tool): tool is QrRouteCatalogToolLink => Boolean(tool)),
  }))
))
const primaryInvoiceCraftPath = invoiceCraftCopy.tools.find((tool) => tool.path === '/tools/invoice-builder')?.path ?? '/tools/invoice-builder'
const invoiceCraftFeaturedTools = invoiceCraftCopy.tools.filter((tool) => tool.featured)
const invoiceCraftSearchQuery = ref('')
const invoiceCraftSelectedCategory = ref<InvoiceCraftCatalogCategoryKey | 'all'>('all')
const filteredInvoiceCraftTools = computed(() => {
  const query = invoiceCraftSearchQuery.value.trim().toLowerCase()

  return invoiceCraftCopy.tools.filter((tool) => {
    const matchesCategory = invoiceCraftSelectedCategory.value === 'all' || tool.category === invoiceCraftSelectedCategory.value
    const searchable = [tool.label, tool.body, tool.path, tool.glyph].join(' ').toLowerCase()

    return matchesCategory && (!query || searchable.includes(query))
  })
})
const invoiceCraftShortcutGroups = computed(() => (
  invoiceCraftCopy.shortcutGroups.map((group) => ({
    ...group,
    tools: group.paths
      .map((path) => invoiceCraftCopy.tools.find((tool) => tool.path === path))
      .filter((tool): tool is InvoiceCraftCatalogToolLink => Boolean(tool)),
  }))
))
const primaryMailHealthPath = mailHealthCopy.tools.find((tool) => tool.path === '/tools/spf-checker')?.path ?? '/tools/spf-checker'
const mailHealthFeaturedTools = mailHealthCopy.tools.filter((tool) => tool.featured)
const mailHealthSearchQuery = ref('')
const mailHealthSelectedCategory = ref<MailHealthCatalogCategoryKey | 'all'>('all')
const filteredMailHealthTools = computed(() => {
  const query = mailHealthSearchQuery.value.trim().toLowerCase()

  return mailHealthCopy.tools.filter((tool) => {
    const matchesCategory = mailHealthSelectedCategory.value === 'all' || tool.category === mailHealthSelectedCategory.value
    const searchable = [tool.label, tool.body, tool.path, tool.glyph].join(' ').toLowerCase()

    return matchesCategory && (!query || searchable.includes(query))
  })
})
const mailHealthShortcutGroups = computed(() => (
  mailHealthCopy.shortcutGroups.map((group) => ({
    ...group,
    tools: group.paths
      .map((path) => mailHealthCopy.tools.find((tool) => tool.path === path))
      .filter((tool): tool is MailHealthCatalogToolLink => Boolean(tool)),
  }))
))
const primarySitePulsePath = sitePulseCopy.tools.find((tool) => tool.path === '/tools/status-checker')?.path ?? '/tools/status-checker'
const sitePulseFeaturedTools = sitePulseCopy.tools.filter((tool) => tool.featured)
const sitePulseSearchQuery = ref('')
const sitePulseSelectedCategory = ref<SitePulseCatalogCategoryKey | 'all'>('all')
const filteredSitePulseTools = computed(() => {
  const query = sitePulseSearchQuery.value.trim().toLowerCase()

  return sitePulseCopy.tools.filter((tool) => {
    const matchesCategory = sitePulseSelectedCategory.value === 'all' || tool.category === sitePulseSelectedCategory.value
    const searchable = [tool.label, tool.body, tool.path, tool.glyph].join(' ').toLowerCase()

    return matchesCategory && (!query || searchable.includes(query))
  })
})
const sitePulseShortcutGroups = computed(() => (
  sitePulseCopy.shortcutGroups.map((group) => ({
    ...group,
    tools: group.paths
      .map((path) => sitePulseCopy.tools.find((tool) => tool.path === path))
      .filter((tool): tool is SitePulseCatalogToolLink => Boolean(tool)),
  }))
))
const primaryPixelBatchPath = pixelBatchCopy.tools.find((tool) => tool.path === '/tools/image-compressor')?.path ?? '/tools/image-compressor'
const pixelBatchFeaturedTools = pixelBatchCopy.tools.filter((tool) => tool.featured)
const pixelBatchSearchQuery = ref('')
const pixelBatchSelectedCategory = ref<PixelBatchCatalogCategoryKey | 'all'>('all')
const filteredPixelBatchTools = computed(() => {
  const query = pixelBatchSearchQuery.value.trim().toLowerCase()

  return pixelBatchCopy.tools.filter((tool) => {
    const matchesCategory = pixelBatchSelectedCategory.value === 'all' || tool.category === pixelBatchSelectedCategory.value
    const searchable = [tool.label, tool.body, tool.path, tool.glyph].join(' ').toLowerCase()

    return matchesCategory && (!query || searchable.includes(query))
  })
})
const pixelBatchShortcutGroups = computed(() => (
  pixelBatchCopy.shortcutGroups.map((group) => ({
    ...group,
    tools: group.paths
      .map((path) => pixelBatchCopy.tools.find((tool) => tool.path === path))
      .filter((tool): tool is PixelBatchCatalogToolLink => Boolean(tool)),
  }))
))
const primaryDocShiftPath = docShiftCopy.tools.find((tool) => tool.path === '/tools/pdf-merge')?.path ?? '/tools/pdf-merge'
const docShiftFeaturedTools = docShiftCopy.tools.filter((tool) => tool.featured)
const docShiftSearchQuery = ref('')
const docShiftSelectedCategory = ref<DocShiftCatalogCategoryKey | 'all'>('all')
const filteredDocShiftTools = computed(() => {
  const query = docShiftSearchQuery.value.trim().toLowerCase()

  return docShiftCopy.tools.filter((tool) => {
    const matchesCategory = docShiftSelectedCategory.value === 'all' || tool.category === docShiftSelectedCategory.value
    const searchable = [tool.label, tool.body, tool.path, tool.glyph].join(' ').toLowerCase()

    return matchesCategory && (!query || searchable.includes(query))
  })
})
const docShiftShortcutGroups = computed(() => (
  docShiftCopy.shortcutGroups.map((group) => ({
    ...group,
    tools: group.paths
      .map((path) => docShiftCopy.tools.find((tool) => tool.path === path))
      .filter((tool): tool is DocShiftCatalogToolLink => Boolean(tool)),
  }))
))
const isLocalBrowser = ref(false)
const localNetProbeToolsUrl = computed(() => {
  if (!isLocalBrowser.value || site.slug !== 'netprobe-atlas') {
    return ''
  }

  const hostname = window.location.hostname === 'localhost' ? 'localhost' : '127.0.0.1'

  return `http://${hostname}:3002/en/tools/dns-lookup`
})

onMounted(() => {
  isLocalBrowser.value = ['127.0.0.1', 'localhost'].includes(window.location.hostname)

  if (isTimeNexusCatalog) {
    updateTimeNexusClock()
    timeNexusClockTimer = setInterval(updateTimeNexusClock, 1000)
  }
})

onBeforeUnmount(() => {
  if (timeNexusClockTimer) {
    clearInterval(timeNexusClockTimer)
  }
})

function trackPublicSiteClick(): void {
  trackOutboundSiteClick({
    siteSlug: site.slug,
    targetUrl: site.temporaryUrl,
    locale,
    routePath: canonicalPath,
    surface: 'site_detail',
  })
}

function getNetProbeToolUrl(path: string): string {
  return `${site.temporaryUrl}${locale}${path}`
}

function trackNetProbeToolClick(path: string): void {
  trackOutboundSiteClick({
    siteSlug: site.slug,
    targetUrl: getNetProbeToolUrl(path),
    locale,
    routePath: canonicalPath,
    surface: 'site_detail',
  })
}

function getCalcHarborToolUrl(path: string): string {
  return `${site.temporaryUrl}${locale}${path}`
}

function getCalcHarborCategoryLabel(key: CalcHarborCatalogCategoryKey): string {
  return calcHarborCopy.categories.find((category) => category.key === key)?.label ?? key
}

function trackCalcHarborToolClick(path: string): void {
  trackOutboundSiteClick({
    siteSlug: site.slug,
    targetUrl: getCalcHarborToolUrl(path),
    locale,
    routePath: canonicalPath,
    surface: 'site_detail',
  })
}

function getDevUtilityToolUrl(path: string): string {
  return `${site.temporaryUrl}${locale}${path}`
}

function getDevUtilityCategoryLabel(key: DevUtilityCatalogCategoryKey): string {
  return devUtilityCopy.categories.find((category) => category.key === key)?.label ?? key
}

function trackDevUtilityToolClick(path: string): void {
  trackOutboundSiteClick({
    siteSlug: site.slug,
    targetUrl: getDevUtilityToolUrl(path),
    locale,
    routePath: canonicalPath,
    surface: 'site_detail',
  })
}

function getTimeNexusToolUrl(path: string): string {
  return `${site.temporaryUrl}${locale}${path}`
}

function getTimeNexusCategoryLabel(key: TimeNexusCatalogCategoryKey): string {
  return timeNexusCopy.categories.find((category) => category.key === key)?.label ?? key
}

function updateTimeNexusClock(): void {
  const now = new Date()
  const intlLocale = toIntlLocale(locale)

  timeNexusCurrentTime.value = new Intl.DateTimeFormat(intlLocale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  }).format(now)
  timeNexusCurrentDate.value = new Intl.DateTimeFormat(intlLocale, {
    weekday: 'long',
    month: 'short',
    day: '2-digit',
  }).format(now)
}

function trackTimeNexusToolClick(path: string): void {
  trackOutboundSiteClick({
    siteSlug: site.slug,
    targetUrl: getTimeNexusToolUrl(path),
    locale,
    routePath: canonicalPath,
    surface: 'site_detail',
  })
}

function getQrRouteToolUrl(path: string): string {
  return `${site.temporaryUrl}${locale}${path}`
}

function getQrRouteCategoryLabel(key: QrRouteCatalogCategoryKey): string {
  return qrRouteCopy.categories.find((category) => category.key === key)?.label ?? key
}

function trackQrRouteToolClick(path: string): void {
  trackOutboundSiteClick({
    siteSlug: site.slug,
    targetUrl: getQrRouteToolUrl(path),
    locale,
    routePath: canonicalPath,
    surface: 'site_detail',
  })
}

function getInvoiceCraftToolUrl(path: string): string {
  return `${site.temporaryUrl}${locale}${path}`
}

function getInvoiceCraftCategoryLabel(key: InvoiceCraftCatalogCategoryKey): string {
  return invoiceCraftCopy.categories.find((category) => category.key === key)?.label ?? key
}

function trackInvoiceCraftToolClick(path: string): void {
  trackOutboundSiteClick({
    siteSlug: site.slug,
    targetUrl: getInvoiceCraftToolUrl(path),
    locale,
    routePath: canonicalPath,
    surface: 'site_detail',
  })
}

function getMailHealthToolUrl(path: string): string {
  return `${site.temporaryUrl}${locale}${path}`
}

function getMailHealthCategoryLabel(key: MailHealthCatalogCategoryKey): string {
  return mailHealthCopy.categories.find((category) => category.key === key)?.label ?? key
}

function trackMailHealthToolClick(path: string): void {
  trackOutboundSiteClick({
    siteSlug: site.slug,
    targetUrl: getMailHealthToolUrl(path),
    locale,
    routePath: canonicalPath,
    surface: 'site_detail',
  })
}

function getSitePulseToolUrl(path: string): string {
  return `${site.temporaryUrl}${locale}${path}`
}

function getSitePulseCategoryLabel(key: SitePulseCatalogCategoryKey): string {
  return sitePulseCopy.categories.find((category) => category.key === key)?.label ?? key
}

function trackSitePulseToolClick(path: string): void {
  trackOutboundSiteClick({
    siteSlug: site.slug,
    targetUrl: getSitePulseToolUrl(path),
    locale,
    routePath: canonicalPath,
    surface: 'site_detail',
  })
}

function getPixelBatchToolUrl(path: string): string {
  return `${site.temporaryUrl}${locale}${path}`
}

function getPixelBatchCategoryLabel(key: PixelBatchCatalogCategoryKey): string {
  return pixelBatchCopy.categories.find((category) => category.key === key)?.label ?? key
}

function trackPixelBatchToolClick(path: string): void {
  trackOutboundSiteClick({
    siteSlug: site.slug,
    targetUrl: getPixelBatchToolUrl(path),
    locale,
    routePath: canonicalPath,
    surface: 'site_detail',
  })
}

function getDocShiftToolUrl(path: string): string {
  return `${site.temporaryUrl}${locale}${path}`
}

function getDocShiftCategoryLabel(key: DocShiftCatalogCategoryKey): string {
  return docShiftCopy.categories.find((category) => category.key === key)?.label ?? key
}

function trackDocShiftToolClick(path: string): void {
  trackOutboundSiteClick({
    siteSlug: site.slug,
    targetUrl: getDocShiftToolUrl(path),
    locale,
    routePath: canonicalPath,
    surface: 'site_detail',
  })
}

useHead({
  htmlAttrs: {
    lang: locale,
  },
  title: `${site.name} | SuperSites`,
  meta: [
    {
      name: 'description',
      content: seoDescription,
    },
    {
      property: 'og:title',
      content: `${site.name} | SuperSites`,
    },
    {
      property: 'og:description',
      content: seoDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
  link: [
    { rel: 'canonical', href: absoluteUrl(canonicalPath) },
    ...localeAlternates((targetLocale) => localizedSitePath(targetLocale, site.slug)),
  ],
  script: structuredData.map((item) => ({
    type: 'application/ld+json',
    innerHTML: JSON.stringify(item),
  })),
})
</script>

<template>
  <main class="page-shell">
    <SiteHeader
      :locale="locale"
      :path-for-locale="(targetLocale) => localizedSitePath(targetLocale, site.slug)"
    />

    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink :to="localizedHomePath(locale)">{{ copy.breadcrumbHome }}</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ site.name }}</span>
    </nav>

    <template v-if="isNetProbeCatalog">
      <section class="netprobe-hero" :aria-labelledby="`${site.slug}-title`">
        <div class="netprobe-hero__copy">
          <p class="eyebrow">{{ netProbeCopy.eyebrow }}</p>
          <h1 :id="`${site.slug}-title`">{{ netProbeCopy.title }}</h1>
          <p class="lead">{{ netProbeCopy.lead }}</p>
          <div class="netprobe-hero__actions">
            <a
              class="button-link"
              :href="getNetProbeToolUrl(primaryNetProbePath)"
              @click="trackNetProbeToolClick(primaryNetProbePath)"
            >
              {{ netProbeCopy.primaryCta }}
            </a>
            <a
              class="button-link button-link--secondary"
              :href="getNetProbeToolUrl(secondaryNetProbePath)"
              @click="trackNetProbeToolClick(secondaryNetProbePath)"
            >
              {{ netProbeCopy.secondaryCta }}
            </a>
          </div>
        </div>

        <aside class="netprobe-start-panel" :aria-labelledby="`${site.slug}-start`">
          <h2 :id="`${site.slug}-start`">{{ netProbeCopy.startTitle }}</h2>
          <p>{{ netProbeCopy.startBody }}</p>
          <div class="netprobe-start-list">
            <a
              v-for="tool in netProbeCopy.toolLinks.slice(0, 4)"
              :key="tool.path"
              class="netprobe-start-link"
              :href="getNetProbeToolUrl(tool.path)"
              @click="trackNetProbeToolClick(tool.path)"
            >
              <span>{{ tool.glyph }}</span>
              <strong>{{ tool.label }}</strong>
            </a>
          </div>
        </aside>
      </section>

      <section class="netprobe-section" :aria-labelledby="`${site.slug}-tools`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-tools`">{{ netProbeCopy.toolsTitle }}</h2>
          <p>{{ netProbeCopy.toolsBody }}</p>
        </div>
        <div class="netprobe-tool-grid">
          <a
            v-for="tool in netProbeCopy.toolLinks"
            :key="tool.path"
            class="netprobe-tool-card"
            :href="getNetProbeToolUrl(tool.path)"
            @click="trackNetProbeToolClick(tool.path)"
          >
            <span class="netprobe-tool-card__glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span class="netprobe-tool-card__body">
              <strong>{{ tool.label }}</strong>
              <span>{{ tool.body }}</span>
            </span>
            <em>{{ netProbeCopy.toolCta }}</em>
          </a>
        </div>
      </section>

      <section class="netprobe-section" :aria-labelledby="`${site.slug}-levels`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-levels`">{{ netProbeCopy.levelsTitle }}</h2>
        </div>
        <div class="netprobe-level-grid">
          <article
            v-for="level in netProbeCopy.levels"
            :key="level.title"
            class="netprobe-level-card"
          >
            <h3>{{ level.title }}</h3>
            <p>{{ level.body }}</p>
          </article>
        </div>
      </section>

      <section class="netprobe-footer-cluster" :aria-labelledby="`${site.slug}-deep-links`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-deep-links`">{{ netProbeCopy.footerTitle }}</h2>
          <p>{{ netProbeCopy.footerBody }}</p>
        </div>
        <div class="netprobe-footer-grid">
          <section v-for="group in netProbeCopy.footerGroups" :key="group.title">
            <h3>{{ group.title }}</h3>
            <ul>
              <li v-for="link in group.links" :key="`${group.title}-${link.label}`">
                <a
                  :href="getNetProbeToolUrl(link.path)"
                  @click="trackNetProbeToolClick(link.path)"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </section>
        </div>
      </section>

      <aside v-if="localNetProbeToolsUrl" class="netprobe-dev-shortcut">
        <a
          class="button-link button-link--secondary"
          :href="localNetProbeToolsUrl"
        >
          {{ copy.localDevCta }}
        </a>
      </aside>
    </template>

    <template v-else-if="isCalcHarborCatalog">
      <section class="calcharbor-hero" :aria-labelledby="`${site.slug}-title`">
        <div class="calcharbor-hero__copy">
          <p class="eyebrow">{{ calcHarborCopy.eyebrow }}</p>
          <h1 :id="`${site.slug}-title`">{{ calcHarborCopy.title }}</h1>
          <p class="lead">{{ calcHarborCopy.lead }}</p>
          <div class="calcharbor-hero__actions">
            <a
              class="button-link"
              :href="getCalcHarborToolUrl(primaryCalcHarborPath)"
              @click="trackCalcHarborToolClick(primaryCalcHarborPath)"
            >
              {{ calcHarborCopy.primaryCta }}
            </a>
            <a class="button-link button-link--secondary" :href="`#${site.slug}-all`">
              {{ calcHarborCopy.secondaryCta }}
            </a>
          </div>
        </div>

        <aside class="calcharbor-finder" :aria-labelledby="`${site.slug}-finder`">
          <h2 :id="`${site.slug}-finder`">{{ calcHarborCopy.finderTitle }}</h2>
          <p>{{ calcHarborCopy.finderBody }}</p>
          <div class="field">
            <label for="calcharbor-search">{{ calcHarborCopy.searchLabel }}</label>
            <input
              id="calcharbor-search"
              v-model="calcHarborSearchQuery"
              type="search"
              :placeholder="calcHarborCopy.searchPlaceholder"
            >
          </div>
          <div class="calcharbor-category-tabs" :aria-label="calcHarborCopy.searchLabel">
            <button
              type="button"
              :aria-pressed="calcHarborSelectedCategory === 'all'"
              @click="calcHarborSelectedCategory = 'all'"
            >
              {{ calcHarborCopy.allCategories }}
            </button>
            <button
              v-for="category in calcHarborCopy.categories"
              :key="category.key"
              type="button"
              :aria-pressed="calcHarborSelectedCategory === category.key"
              @click="calcHarborSelectedCategory = category.key"
            >
              {{ category.label }}
            </button>
          </div>
          <div class="calcharbor-finder__shortcuts">
            <a
              v-for="tool in calcHarborFeaturedCalculators"
              :key="`finder-${tool.path}`"
              :href="getCalcHarborToolUrl(tool.path)"
              @click="trackCalcHarborToolClick(tool.path)"
            >
              <span>{{ tool.glyph }}</span>
              <strong>{{ tool.label }}</strong>
            </a>
          </div>
        </aside>
      </section>

      <section class="calcharbor-section" :aria-labelledby="`${site.slug}-popular`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-popular`">{{ calcHarborCopy.popularTitle }}</h2>
          <p>{{ calcHarborCopy.popularBody }}</p>
        </div>
        <div class="calcharbor-popular-grid">
          <a
            v-for="tool in calcHarborFeaturedCalculators"
            :key="`popular-${tool.path}`"
            class="calcharbor-tool-card calcharbor-tool-card--featured"
            :href="getCalcHarborToolUrl(tool.path)"
            @click="trackCalcHarborToolClick(tool.path)"
          >
            <span class="calcharbor-tool-card__glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span class="calcharbor-tool-card__body">
              <span>{{ getCalcHarborCategoryLabel(tool.category) }}</span>
              <strong>{{ tool.label }}</strong>
              <em>{{ tool.body }}</em>
            </span>
            <b>{{ calcHarborCopy.toolCta }}</b>
          </a>
        </div>
      </section>

      <section :id="`${site.slug}-all`" class="calcharbor-section" :aria-labelledby="`${site.slug}-all-title`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-all-title`">{{ calcHarborCopy.allTitle }}</h2>
          <p>{{ calcHarborCopy.allBody }}</p>
        </div>
        <div v-if="filteredCalcHarborCalculators.length > 0" class="calcharbor-tool-grid">
          <a
            v-for="tool in filteredCalcHarborCalculators"
            :key="tool.path"
            class="calcharbor-tool-card"
            :href="getCalcHarborToolUrl(tool.path)"
            @click="trackCalcHarborToolClick(tool.path)"
          >
            <span class="calcharbor-tool-card__glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span class="calcharbor-tool-card__body">
              <span>{{ getCalcHarborCategoryLabel(tool.category) }}</span>
              <strong>{{ tool.label }}</strong>
              <em>{{ tool.body }}</em>
            </span>
            <b>{{ calcHarborCopy.toolCta }}</b>
          </a>
        </div>
        <div v-else class="calcharbor-empty" aria-live="polite">
          <h3>{{ calcHarborCopy.noResultsTitle }}</h3>
          <p>{{ calcHarborCopy.noResultsBody }}</p>
        </div>
      </section>

      <section class="calcharbor-section" :aria-labelledby="`${site.slug}-future`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-future`">{{ calcHarborCopy.futureTitle }}</h2>
          <p>{{ calcHarborCopy.futureBody }}</p>
        </div>
        <div class="calcharbor-topic-grid">
          <article v-for="topic in calcHarborCopy.futureTopics" :key="topic.title">
            <h3>{{ topic.title }}</h3>
            <p>{{ topic.body }}</p>
          </article>
        </div>
      </section>

      <section class="calcharbor-footer-cluster" :aria-labelledby="`${site.slug}-deep-links`">
        <div class="calcharbor-footer-grid">
          <section v-for="group in calcHarborCopy.footerGroups" :key="group.title">
            <h2>{{ group.title }}</h2>
            <ul>
              <li v-for="link in group.links" :key="`${group.title}-${link.label}`">
                <a
                  :href="getCalcHarborToolUrl(link.path)"
                  @click="trackCalcHarborToolClick(link.path)"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </template>

    <template v-else-if="isDevUtilityCatalog">
      <section class="devutility-hero" :aria-labelledby="`${site.slug}-title`">
        <div class="devutility-hero__copy">
          <p class="eyebrow">{{ devUtilityCopy.eyebrow }}</p>
          <h1 :id="`${site.slug}-title`">{{ devUtilityCopy.title }}</h1>
          <p class="lead">{{ devUtilityCopy.lead }}</p>
          <div class="devutility-hero__actions">
            <a
              class="button-link"
              :href="getDevUtilityToolUrl(primaryDevUtilityPath)"
              @click="trackDevUtilityToolClick(primaryDevUtilityPath)"
            >
              {{ devUtilityCopy.primaryCta }}
            </a>
            <a class="button-link button-link--secondary" :href="`#${site.slug}-all`">
              {{ devUtilityCopy.secondaryCta }}
            </a>
          </div>
        </div>

        <aside class="devutility-finder" :aria-labelledby="`${site.slug}-finder`">
          <h2 :id="`${site.slug}-finder`">{{ devUtilityCopy.finderTitle }}</h2>
          <p>{{ devUtilityCopy.finderBody }}</p>
          <div class="field">
            <label for="devutility-search">{{ devUtilityCopy.searchLabel }}</label>
            <input
              id="devutility-search"
              v-model="devUtilitySearchQuery"
              type="search"
              :placeholder="devUtilityCopy.searchPlaceholder"
            >
          </div>
          <div class="devutility-category-tabs" :aria-label="devUtilityCopy.searchLabel">
            <button
              type="button"
              :aria-pressed="devUtilitySelectedCategory === 'all'"
              @click="devUtilitySelectedCategory = 'all'"
            >
              {{ devUtilityCopy.allCategories }}
            </button>
            <button
              v-for="category in devUtilityCopy.categories"
              :key="category.key"
              type="button"
              :aria-pressed="devUtilitySelectedCategory === category.key"
              @click="devUtilitySelectedCategory = category.key"
            >
              {{ category.label }}
            </button>
          </div>
          <div class="devutility-privacy-note">
            <strong>{{ devUtilityCopy.privacyTitle }}</strong>
            <span>{{ devUtilityCopy.privacyBody }}</span>
          </div>
        </aside>
      </section>

      <section class="devutility-section" :aria-labelledby="`${site.slug}-workbench`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-workbench`">{{ devUtilityCopy.workbenchTitle }}</h2>
          <p>{{ devUtilityCopy.workbenchBody }}</p>
        </div>
        <div class="devutility-shortcut-grid">
          <article v-for="group in devUtilityShortcutGroups" :key="group.title">
            <h3>{{ group.title }}</h3>
            <p>{{ group.body }}</p>
            <div class="devutility-shortcut-list">
              <a
                v-for="tool in group.tools"
                :key="`${group.title}-${tool.path}`"
                :href="getDevUtilityToolUrl(tool.path)"
                @click="trackDevUtilityToolClick(tool.path)"
              >
                <span aria-hidden="true">{{ tool.glyph }}</span>
                <strong>{{ tool.label }}</strong>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section :id="`${site.slug}-all`" class="devutility-section" :aria-labelledby="`${site.slug}-all-title`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-all-title`">{{ devUtilityCopy.allTitle }}</h2>
          <p>{{ devUtilityCopy.allBody }}</p>
        </div>
        <div v-if="filteredDevUtilityTools.length > 0" class="devutility-tool-grid">
          <a
            v-for="tool in filteredDevUtilityTools"
            :key="tool.path"
            class="devutility-tool-card"
            :href="getDevUtilityToolUrl(tool.path)"
            @click="trackDevUtilityToolClick(tool.path)"
          >
            <span class="devutility-tool-card__glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span class="devutility-tool-card__body">
              <span>{{ getDevUtilityCategoryLabel(tool.category) }}</span>
              <strong>{{ tool.label }}</strong>
              <em>{{ tool.body }}</em>
            </span>
            <b>{{ devUtilityCopy.toolCta }}</b>
          </a>
        </div>
        <div v-else class="devutility-empty" aria-live="polite">
          <h3>{{ devUtilityCopy.noResultsTitle }}</h3>
          <p>{{ devUtilityCopy.noResultsBody }}</p>
        </div>
      </section>

      <section class="devutility-footer-cluster" :aria-labelledby="`${site.slug}-deep-links`">
        <div class="devutility-footer-grid">
          <section v-for="group in devUtilityCopy.footerGroups" :key="group.title">
            <h2>{{ group.title }}</h2>
            <ul>
              <li v-for="link in group.links" :key="`${group.title}-${link.label}`">
                <a
                  :href="getDevUtilityToolUrl(link.path)"
                  @click="trackDevUtilityToolClick(link.path)"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </template>

    <template v-else-if="isTimeNexusCatalog">
      <section class="timenexus-hero" :aria-labelledby="`${site.slug}-title`">
        <div class="timenexus-hero__copy">
          <p class="eyebrow">{{ timeNexusCopy.eyebrow }}</p>
          <h1 :id="`${site.slug}-title`">{{ timeNexusCopy.title }}</h1>
          <p class="lead">{{ timeNexusCopy.lead }}</p>
          <div class="timenexus-hero__actions">
            <a
              class="button-link"
              :href="getTimeNexusToolUrl(primaryTimeNexusPath)"
              @click="trackTimeNexusToolClick(primaryTimeNexusPath)"
            >
              {{ timeNexusCopy.primaryCta }}
            </a>
            <a class="button-link button-link--secondary" :href="`#${site.slug}-all`">
              {{ timeNexusCopy.secondaryCta }}
            </a>
          </div>
        </div>

        <aside class="timenexus-clock-panel" :aria-labelledby="`${site.slug}-clock`">
          <h2 :id="`${site.slug}-clock`">{{ timeNexusCopy.clockTitle }}</h2>
          <time class="timenexus-clock-panel__time">
            {{ timeNexusCurrentTime || timeNexusCopy.clockFallback }}
          </time>
          <span class="timenexus-clock-panel__date">
            {{ timeNexusCurrentDate || timeNexusCopy.clockDateFallback }}
          </span>
          <p>{{ timeNexusCopy.clockBody }}</p>
          <div class="timenexus-clock-links">
            <a
              v-for="tool in timeNexusFeaturedLinks.slice(0, 4)"
              :key="`clock-${tool.path}`"
              :href="getTimeNexusToolUrl(tool.path)"
              @click="trackTimeNexusToolClick(tool.path)"
            >
              <span aria-hidden="true">{{ tool.glyph }}</span>
              <strong>{{ tool.label }}</strong>
            </a>
          </div>
        </aside>
      </section>

      <section class="timenexus-section" :aria-labelledby="`${site.slug}-browse`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-browse`">{{ timeNexusCopy.browseTitle }}</h2>
          <p>{{ timeNexusCopy.browseBody }}</p>
        </div>
        <div class="timenexus-shortcut-grid">
          <article v-for="group in timeNexusShortcutGroups" :key="group.title">
            <h3>{{ group.title }}</h3>
            <p>{{ group.body }}</p>
            <div class="timenexus-shortcut-list">
              <a
                v-for="tool in group.links"
                :key="`${group.title}-${tool.path}`"
                :href="getTimeNexusToolUrl(tool.path)"
                @click="trackTimeNexusToolClick(tool.path)"
              >
                <span aria-hidden="true">{{ tool.glyph }}</span>
                <strong>{{ tool.label }}</strong>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section class="timenexus-section" :aria-labelledby="`${site.slug}-featured`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-featured`">{{ timeNexusCopy.featuredTitle }}</h2>
          <p>{{ timeNexusCopy.featuredBody }}</p>
        </div>
        <div class="timenexus-featured-grid">
          <a
            v-for="tool in timeNexusFeaturedLinks"
            :key="`featured-${tool.path}`"
            class="timenexus-tool-card timenexus-tool-card--featured"
            :href="getTimeNexusToolUrl(tool.path)"
            @click="trackTimeNexusToolClick(tool.path)"
          >
            <span class="timenexus-tool-card__glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span class="timenexus-tool-card__body">
              <span>{{ getTimeNexusCategoryLabel(tool.category) }}</span>
              <strong>{{ tool.label }}</strong>
              <em>{{ tool.body }}</em>
            </span>
            <b>{{ timeNexusCopy.toolCta }}</b>
          </a>
        </div>
      </section>

      <section :id="`${site.slug}-all`" class="timenexus-section" :aria-labelledby="`${site.slug}-all-title`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-all-title`">{{ timeNexusCopy.allTitle }}</h2>
          <p>{{ timeNexusCopy.allBody }}</p>
        </div>
        <div class="timenexus-finder" role="search" :aria-label="timeNexusCopy.searchLabel">
          <div class="field">
            <label for="timenexus-search">{{ timeNexusCopy.searchLabel }}</label>
            <input
              id="timenexus-search"
              v-model="timeNexusSearchQuery"
              type="search"
              :placeholder="timeNexusCopy.searchPlaceholder"
            >
          </div>
          <div class="timenexus-category-tabs" :aria-label="timeNexusCopy.searchLabel">
            <button
              type="button"
              :aria-pressed="timeNexusSelectedCategory === 'all'"
              @click="timeNexusSelectedCategory = 'all'"
            >
              {{ timeNexusCopy.allCategories }}
            </button>
            <button
              v-for="category in timeNexusCopy.categories"
              :key="category.key"
              type="button"
              :aria-pressed="timeNexusSelectedCategory === category.key"
              @click="timeNexusSelectedCategory = category.key"
            >
              {{ category.label }}
            </button>
          </div>
          <div class="timenexus-privacy-note">
            <strong>{{ timeNexusCopy.privacyTitle }}</strong>
            <span>{{ timeNexusCopy.privacyBody }}</span>
          </div>
        </div>
        <div v-if="filteredTimeNexusLinks.length > 0" class="timenexus-tool-grid">
          <a
            v-for="tool in filteredTimeNexusLinks"
            :key="tool.path"
            class="timenexus-tool-card"
            :href="getTimeNexusToolUrl(tool.path)"
            @click="trackTimeNexusToolClick(tool.path)"
          >
            <span class="timenexus-tool-card__glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span class="timenexus-tool-card__body">
              <span>{{ getTimeNexusCategoryLabel(tool.category) }}</span>
              <strong>{{ tool.label }}</strong>
              <em>{{ tool.body }}</em>
            </span>
            <b>{{ timeNexusCopy.toolCta }}</b>
          </a>
        </div>
        <div v-else class="timenexus-empty" aria-live="polite">
          <h3>{{ timeNexusCopy.noResultsTitle }}</h3>
          <p>{{ timeNexusCopy.noResultsBody }}</p>
        </div>
      </section>

      <section class="timenexus-footer-cluster" :aria-labelledby="`${site.slug}-deep-links`">
        <div class="timenexus-footer-grid">
          <section v-for="group in timeNexusCopy.footerGroups" :key="group.title">
            <h2>{{ group.title }}</h2>
            <ul>
              <li v-for="link in group.links" :key="`${group.title}-${link.label}`">
                <a
                  :href="getTimeNexusToolUrl(link.path)"
                  @click="trackTimeNexusToolClick(link.path)"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </template>

    <template v-else-if="isQrRouteCatalog">
      <section class="qrroute-hero" :aria-labelledby="`${site.slug}-title`">
        <div class="qrroute-hero__copy">
          <p class="eyebrow">{{ qrRouteCopy.eyebrow }}</p>
          <h1 :id="`${site.slug}-title`">{{ qrRouteCopy.title }}</h1>
          <p class="lead">{{ qrRouteCopy.lead }}</p>
          <div class="qrroute-hero__actions">
            <a
              class="button-link"
              :href="getQrRouteToolUrl(primaryQrRoutePath)"
              @click="trackQrRouteToolClick(primaryQrRoutePath)"
            >
              {{ qrRouteCopy.primaryCta }}
            </a>
            <a class="button-link button-link--secondary" :href="`#${site.slug}-all`">
              {{ qrRouteCopy.secondaryCta }}
            </a>
          </div>
        </div>

        <aside class="qrroute-preview-panel" :aria-labelledby="`${site.slug}-preview`">
          <div class="qrroute-preview-panel__header">
            <h2 :id="`${site.slug}-preview`">{{ qrRouteCopy.previewTitle }}</h2>
            <span>{{ qrRouteCopy.previewPayloadLabel }}</span>
          </div>
          <div class="qrroute-preview-panel__body">
            <div class="qrroute-preview-art" aria-hidden="true">
              <span v-for="index in 49" :key="`qr-preview-${index}`"></span>
            </div>
            <div class="qrroute-preview-payload">
              <strong>{{ qrRouteCopy.previewPayload }}</strong>
              <p>{{ qrRouteCopy.previewBody }}</p>
            </div>
          </div>
          <dl class="qrroute-preview-meta">
            <div v-for="item in qrRouteCopy.previewMeta" :key="item.label">
              <dt>{{ item.label }}</dt>
              <dd>{{ item.value }}</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section class="qrroute-section" :aria-labelledby="`${site.slug}-browse`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-browse`">{{ qrRouteCopy.browseTitle }}</h2>
          <p>{{ qrRouteCopy.browseBody }}</p>
        </div>
        <div class="qrroute-shortcut-grid">
          <article v-for="group in qrRouteShortcutGroups" :key="group.title">
            <h3>{{ group.title }}</h3>
            <p>{{ group.body }}</p>
            <div class="qrroute-shortcut-list">
              <a
                v-for="tool in group.tools"
                :key="`${group.title}-${tool.path}`"
                :href="getQrRouteToolUrl(tool.path)"
                @click="trackQrRouteToolClick(tool.path)"
              >
                <span aria-hidden="true">{{ tool.glyph }}</span>
                <strong>{{ tool.label }}</strong>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section class="qrroute-section" :aria-labelledby="`${site.slug}-featured`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-featured`">{{ qrRouteCopy.featuredTitle }}</h2>
          <p>{{ qrRouteCopy.featuredBody }}</p>
        </div>
        <div class="qrroute-featured-grid">
          <a
            v-for="tool in qrRouteFeaturedTools"
            :key="`featured-${tool.path}`"
            class="qrroute-tool-card qrroute-tool-card--featured"
            :href="getQrRouteToolUrl(tool.path)"
            @click="trackQrRouteToolClick(tool.path)"
          >
            <span class="qrroute-tool-card__glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span class="qrroute-tool-card__body">
              <span>{{ getQrRouteCategoryLabel(tool.category) }}</span>
              <strong>{{ tool.label }}</strong>
              <em>{{ tool.body }}</em>
            </span>
            <b>{{ qrRouteCopy.toolCta }}</b>
          </a>
        </div>
      </section>

      <section class="qrroute-static-note" :aria-labelledby="`${site.slug}-static-dynamic`">
        <div>
          <h2 :id="`${site.slug}-static-dynamic`">{{ qrRouteCopy.staticDynamicTitle }}</h2>
          <p>{{ qrRouteCopy.staticDynamicBody }}</p>
        </div>
        <div>
          <h3>{{ qrRouteCopy.dynamicNoteTitle }}</h3>
          <p>{{ qrRouteCopy.dynamicNoteBody }}</p>
        </div>
      </section>

      <section :id="`${site.slug}-all`" class="qrroute-section" :aria-labelledby="`${site.slug}-all-title`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-all-title`">{{ qrRouteCopy.allTitle }}</h2>
          <p>{{ qrRouteCopy.allBody }}</p>
        </div>
        <div class="qrroute-finder" role="search" :aria-label="qrRouteCopy.searchLabel">
          <div class="field">
            <label for="qrroute-search">{{ qrRouteCopy.searchLabel }}</label>
            <input
              id="qrroute-search"
              v-model="qrRouteSearchQuery"
              type="search"
              :placeholder="qrRouteCopy.searchPlaceholder"
            >
          </div>
          <div class="qrroute-category-tabs" :aria-label="qrRouteCopy.searchLabel">
            <button
              type="button"
              :aria-pressed="qrRouteSelectedCategory === 'all'"
              @click="qrRouteSelectedCategory = 'all'"
            >
              {{ qrRouteCopy.allCategories }}
            </button>
            <button
              v-for="category in qrRouteCopy.categories"
              :key="category.key"
              type="button"
              :aria-pressed="qrRouteSelectedCategory === category.key"
              @click="qrRouteSelectedCategory = category.key"
            >
              {{ category.label }}
            </button>
          </div>
          <div class="qrroute-privacy-note">
            <strong>{{ qrRouteCopy.privacyTitle }}</strong>
            <span>{{ qrRouteCopy.privacyBody }}</span>
          </div>
        </div>
        <div v-if="filteredQrRouteTools.length > 0" class="qrroute-tool-grid">
          <a
            v-for="tool in filteredQrRouteTools"
            :key="tool.path"
            class="qrroute-tool-card"
            :href="getQrRouteToolUrl(tool.path)"
            @click="trackQrRouteToolClick(tool.path)"
          >
            <span class="qrroute-tool-card__glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span class="qrroute-tool-card__body">
              <span>{{ getQrRouteCategoryLabel(tool.category) }}</span>
              <strong>{{ tool.label }}</strong>
              <em>{{ tool.body }}</em>
            </span>
            <b>{{ qrRouteCopy.toolCta }}</b>
          </a>
        </div>
        <div v-else class="qrroute-empty" aria-live="polite">
          <h3>{{ qrRouteCopy.noResultsTitle }}</h3>
          <p>{{ qrRouteCopy.noResultsBody }}</p>
        </div>
      </section>

      <section class="qrroute-footer-cluster" :aria-labelledby="`${site.slug}-deep-links`">
        <div class="qrroute-footer-grid">
          <section v-for="group in qrRouteCopy.footerGroups" :key="group.title">
            <h2>{{ group.title }}</h2>
            <ul>
              <li v-for="link in group.links" :key="`${group.title}-${link.label}`">
                <a
                  :href="getQrRouteToolUrl(link.path)"
                  @click="trackQrRouteToolClick(link.path)"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </template>

    <template v-else-if="isInvoiceCraftCatalog">
      <section class="invoicecraft-hero" :aria-labelledby="`${site.slug}-title`">
        <div class="invoicecraft-hero__copy">
          <p class="eyebrow">{{ invoiceCraftCopy.eyebrow }}</p>
          <h1 :id="`${site.slug}-title`">{{ invoiceCraftCopy.title }}</h1>
          <p class="lead">{{ invoiceCraftCopy.lead }}</p>
          <div class="invoicecraft-hero__actions">
            <a
              class="button-link"
              :href="getInvoiceCraftToolUrl(primaryInvoiceCraftPath)"
              @click="trackInvoiceCraftToolClick(primaryInvoiceCraftPath)"
            >
              {{ invoiceCraftCopy.primaryCta }}
            </a>
            <a class="button-link button-link--secondary" :href="`#${site.slug}-all`">
              {{ invoiceCraftCopy.secondaryCta }}
            </a>
          </div>
        </div>

        <aside class="invoicecraft-preview-panel" :aria-labelledby="`${site.slug}-preview`">
          <div class="invoicecraft-preview-panel__header">
            <h2 :id="`${site.slug}-preview`">{{ invoiceCraftCopy.previewTitle }}</h2>
            <span>{{ invoiceCraftCopy.previewBadge }}</span>
          </div>
          <div class="invoicecraft-document-preview">
            <div class="invoicecraft-document-preview__top">
              <div>
                <span>{{ invoiceCraftCopy.previewDocumentLabel }}</span>
                <strong>{{ invoiceCraftCopy.previewDocumentValue }}</strong>
              </div>
              <div>
                <span>{{ invoiceCraftCopy.previewClientLabel }}</span>
                <strong>{{ invoiceCraftCopy.previewClientValue }}</strong>
              </div>
            </div>
            <dl class="invoicecraft-preview-lines">
              <div v-for="row in invoiceCraftCopy.previewRows" :key="row.label">
                <dt>{{ row.label }}</dt>
                <dd>{{ row.value }}</dd>
              </div>
            </dl>
            <div class="invoicecraft-preview-total">
              <span>{{ invoiceCraftCopy.previewTotalLabel }}</span>
              <strong>{{ invoiceCraftCopy.previewTotalValue }}</strong>
            </div>
          </div>
        </aside>
      </section>

      <section class="invoicecraft-section" :aria-labelledby="`${site.slug}-browse`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-browse`">{{ invoiceCraftCopy.browseTitle }}</h2>
          <p>{{ invoiceCraftCopy.browseBody }}</p>
        </div>
        <div class="invoicecraft-shortcut-grid">
          <article v-for="group in invoiceCraftShortcutGroups" :key="group.title">
            <h3>{{ group.title }}</h3>
            <p>{{ group.body }}</p>
            <div class="invoicecraft-shortcut-list">
              <a
                v-for="tool in group.tools"
                :key="`${group.title}-${tool.path}`"
                :href="getInvoiceCraftToolUrl(tool.path)"
                @click="trackInvoiceCraftToolClick(tool.path)"
              >
                <span aria-hidden="true">{{ tool.glyph }}</span>
                <strong>{{ tool.label }}</strong>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section class="invoicecraft-section" :aria-labelledby="`${site.slug}-featured`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-featured`">{{ invoiceCraftCopy.featuredTitle }}</h2>
          <p>{{ invoiceCraftCopy.featuredBody }}</p>
        </div>
        <div class="invoicecraft-featured-grid">
          <a
            v-for="tool in invoiceCraftFeaturedTools"
            :key="`featured-${tool.path}`"
            class="invoicecraft-tool-card invoicecraft-tool-card--featured"
            :href="getInvoiceCraftToolUrl(tool.path)"
            @click="trackInvoiceCraftToolClick(tool.path)"
          >
            <span class="invoicecraft-tool-card__glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span class="invoicecraft-tool-card__body">
              <span>{{ getInvoiceCraftCategoryLabel(tool.category) }}</span>
              <strong>{{ tool.label }}</strong>
              <em>{{ tool.body }}</em>
            </span>
            <b>{{ invoiceCraftCopy.toolCta }}</b>
          </a>
        </div>
      </section>

      <section class="invoicecraft-review-note" :aria-labelledby="`${site.slug}-review`">
        <div>
          <h2 :id="`${site.slug}-review`">{{ invoiceCraftCopy.reviewTitle }}</h2>
          <p>{{ invoiceCraftCopy.reviewBody }}</p>
        </div>
        <div>
          <h3>{{ invoiceCraftCopy.privacyTitle }}</h3>
          <p>{{ invoiceCraftCopy.privacyBody }}</p>
        </div>
      </section>

      <section :id="`${site.slug}-all`" class="invoicecraft-section" :aria-labelledby="`${site.slug}-all-title`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-all-title`">{{ invoiceCraftCopy.allTitle }}</h2>
          <p>{{ invoiceCraftCopy.allBody }}</p>
        </div>
        <div class="invoicecraft-finder" role="search" :aria-label="invoiceCraftCopy.searchLabel">
          <div class="field">
            <label for="invoicecraft-search">{{ invoiceCraftCopy.searchLabel }}</label>
            <input
              id="invoicecraft-search"
              v-model="invoiceCraftSearchQuery"
              type="search"
              :placeholder="invoiceCraftCopy.searchPlaceholder"
            >
          </div>
          <div class="invoicecraft-category-tabs" :aria-label="invoiceCraftCopy.searchLabel">
            <button
              type="button"
              :aria-pressed="invoiceCraftSelectedCategory === 'all'"
              @click="invoiceCraftSelectedCategory = 'all'"
            >
              {{ invoiceCraftCopy.allCategories }}
            </button>
            <button
              v-for="category in invoiceCraftCopy.categories"
              :key="category.key"
              type="button"
              :aria-pressed="invoiceCraftSelectedCategory === category.key"
              @click="invoiceCraftSelectedCategory = category.key"
            >
              {{ category.label }}
            </button>
          </div>
        </div>
        <div v-if="filteredInvoiceCraftTools.length > 0" class="invoicecraft-tool-grid">
          <a
            v-for="tool in filteredInvoiceCraftTools"
            :key="tool.path"
            class="invoicecraft-tool-card"
            :href="getInvoiceCraftToolUrl(tool.path)"
            @click="trackInvoiceCraftToolClick(tool.path)"
          >
            <span class="invoicecraft-tool-card__glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span class="invoicecraft-tool-card__body">
              <span>{{ getInvoiceCraftCategoryLabel(tool.category) }}</span>
              <strong>{{ tool.label }}</strong>
              <em>{{ tool.body }}</em>
            </span>
            <b>{{ invoiceCraftCopy.toolCta }}</b>
          </a>
        </div>
        <div v-else class="invoicecraft-empty" aria-live="polite">
          <h3>{{ invoiceCraftCopy.noResultsTitle }}</h3>
          <p>{{ invoiceCraftCopy.noResultsBody }}</p>
        </div>
      </section>

      <section class="invoicecraft-footer-cluster" :aria-labelledby="`${site.slug}-deep-links`">
        <div class="invoicecraft-footer-grid">
          <section v-for="group in invoiceCraftCopy.footerGroups" :key="group.title">
            <h2>{{ group.title }}</h2>
            <ul>
              <li v-for="link in group.links" :key="`${group.title}-${link.label}`">
                <a
                  :href="getInvoiceCraftToolUrl(link.path)"
                  @click="trackInvoiceCraftToolClick(link.path)"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </template>

    <template v-else-if="isMailHealthCatalog">
      <section class="mailhealth-hero" :aria-labelledby="`${site.slug}-title`">
        <div class="mailhealth-hero__copy">
          <p class="eyebrow">{{ mailHealthCopy.eyebrow }}</p>
          <h1 :id="`${site.slug}-title`">{{ mailHealthCopy.title }}</h1>
          <p class="lead">{{ mailHealthCopy.lead }}</p>
          <div class="mailhealth-hero__actions">
            <a
              class="button-link"
              :href="getMailHealthToolUrl(primaryMailHealthPath)"
              @click="trackMailHealthToolClick(primaryMailHealthPath)"
            >
              {{ mailHealthCopy.primaryCta }}
            </a>
            <a class="button-link button-link--secondary" :href="`#${site.slug}-all`">
              {{ mailHealthCopy.secondaryCta }}
            </a>
          </div>
        </div>

        <aside class="mailhealth-report-panel" :aria-labelledby="`${site.slug}-report`">
          <div class="mailhealth-report-panel__header">
            <h2 :id="`${site.slug}-report`">{{ mailHealthCopy.reportTitle }}</h2>
            <span>{{ mailHealthCopy.reportGrade }}</span>
          </div>
          <div class="mailhealth-report-score">
            <div>
              <span>{{ mailHealthCopy.reportScoreLabel }}</span>
              <strong>{{ mailHealthCopy.reportScoreValue }}</strong>
            </div>
            <dl>
              <div>
                <dt>{{ mailHealthCopy.reportDomainLabel }}</dt>
                <dd>{{ mailHealthCopy.reportDomainValue }}</dd>
              </div>
            </dl>
          </div>
          <p>{{ mailHealthCopy.reportBody }}</p>
          <div class="mailhealth-signal-list">
            <article v-for="signal in mailHealthCopy.reportSignals" :key="signal.label">
              <span>{{ signal.label }}</span>
              <strong>{{ signal.status }}</strong>
              <p>{{ signal.detail }}</p>
            </article>
          </div>
        </aside>
      </section>

      <section class="mailhealth-section" :aria-labelledby="`${site.slug}-browse`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-browse`">{{ mailHealthCopy.browseTitle }}</h2>
          <p>{{ mailHealthCopy.browseBody }}</p>
        </div>
        <div class="mailhealth-shortcut-grid">
          <article v-for="group in mailHealthShortcutGroups" :key="group.title">
            <h3>{{ group.title }}</h3>
            <p>{{ group.body }}</p>
            <div class="mailhealth-shortcut-list">
              <a
                v-for="tool in group.tools"
                :key="`${group.title}-${tool.path}`"
                :href="getMailHealthToolUrl(tool.path)"
                @click="trackMailHealthToolClick(tool.path)"
              >
                <span aria-hidden="true">{{ tool.glyph }}</span>
                <strong>{{ tool.label }}</strong>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section class="mailhealth-section" :aria-labelledby="`${site.slug}-featured`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-featured`">{{ mailHealthCopy.featuredTitle }}</h2>
          <p>{{ mailHealthCopy.featuredBody }}</p>
        </div>
        <div class="mailhealth-featured-grid">
          <a
            v-for="tool in mailHealthFeaturedTools"
            :key="`featured-${tool.path}`"
            class="mailhealth-tool-card mailhealth-tool-card--featured"
            :href="getMailHealthToolUrl(tool.path)"
            @click="trackMailHealthToolClick(tool.path)"
          >
            <span class="mailhealth-tool-card__glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span class="mailhealth-tool-card__body">
              <span>{{ getMailHealthCategoryLabel(tool.category) }}</span>
              <strong>{{ tool.label }}</strong>
              <em>{{ tool.body }}</em>
            </span>
            <b>{{ mailHealthCopy.toolCta }}</b>
          </a>
        </div>
      </section>

      <section class="mailhealth-limit-note" :aria-labelledby="`${site.slug}-limits`">
        <div>
          <h2 :id="`${site.slug}-limits`">{{ mailHealthCopy.limitsTitle }}</h2>
          <p>{{ mailHealthCopy.limitsBody }}</p>
        </div>
        <div>
          <h3>{{ mailHealthCopy.privacyTitle }}</h3>
          <p>{{ mailHealthCopy.privacyBody }}</p>
        </div>
      </section>

      <section :id="`${site.slug}-all`" class="mailhealth-section" :aria-labelledby="`${site.slug}-all-title`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-all-title`">{{ mailHealthCopy.allTitle }}</h2>
          <p>{{ mailHealthCopy.allBody }}</p>
        </div>
        <div class="mailhealth-finder" role="search" :aria-label="mailHealthCopy.searchLabel">
          <div class="field">
            <label for="mailhealth-search">{{ mailHealthCopy.searchLabel }}</label>
            <input
              id="mailhealth-search"
              v-model="mailHealthSearchQuery"
              type="search"
              :placeholder="mailHealthCopy.searchPlaceholder"
            >
          </div>
          <div class="mailhealth-category-tabs" :aria-label="mailHealthCopy.searchLabel">
            <button
              type="button"
              :aria-pressed="mailHealthSelectedCategory === 'all'"
              @click="mailHealthSelectedCategory = 'all'"
            >
              {{ mailHealthCopy.allCategories }}
            </button>
            <button
              v-for="category in mailHealthCopy.categories"
              :key="category.key"
              type="button"
              :aria-pressed="mailHealthSelectedCategory === category.key"
              @click="mailHealthSelectedCategory = category.key"
            >
              {{ category.label }}
            </button>
          </div>
        </div>
        <div v-if="filteredMailHealthTools.length > 0" class="mailhealth-tool-grid">
          <a
            v-for="tool in filteredMailHealthTools"
            :key="tool.path"
            class="mailhealth-tool-card"
            :href="getMailHealthToolUrl(tool.path)"
            @click="trackMailHealthToolClick(tool.path)"
          >
            <span class="mailhealth-tool-card__glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span class="mailhealth-tool-card__body">
              <span>{{ getMailHealthCategoryLabel(tool.category) }}</span>
              <strong>{{ tool.label }}</strong>
              <em>{{ tool.body }}</em>
            </span>
            <b>{{ mailHealthCopy.toolCta }}</b>
          </a>
        </div>
        <div v-else class="mailhealth-empty" aria-live="polite">
          <h3>{{ mailHealthCopy.noResultsTitle }}</h3>
          <p>{{ mailHealthCopy.noResultsBody }}</p>
        </div>
      </section>

      <section class="mailhealth-footer-cluster" :aria-labelledby="`${site.slug}-deep-links`">
        <div class="mailhealth-footer-grid">
          <section v-for="group in mailHealthCopy.footerGroups" :key="group.title">
            <h2>{{ group.title }}</h2>
            <ul>
              <li v-for="link in group.links" :key="`${group.title}-${link.label}`">
                <a
                  :href="getMailHealthToolUrl(link.path)"
                  @click="trackMailHealthToolClick(link.path)"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </template>

    <template v-else-if="isSitePulseCatalog">
      <section class="mailhealth-hero sitepulse-hero" :aria-labelledby="`${site.slug}-title`">
        <div class="mailhealth-hero__copy sitepulse-hero__copy">
          <p class="eyebrow">{{ sitePulseCopy.eyebrow }}</p>
          <h1 :id="`${site.slug}-title`">{{ sitePulseCopy.title }}</h1>
          <p class="lead">{{ sitePulseCopy.lead }}</p>
          <div class="mailhealth-hero__actions sitepulse-hero__actions">
            <a
              class="button-link"
              :href="getSitePulseToolUrl(primarySitePulsePath)"
              @click="trackSitePulseToolClick(primarySitePulsePath)"
            >
              {{ sitePulseCopy.primaryCta }}
            </a>
            <a class="button-link button-link--secondary" :href="`#${site.slug}-all`">
              {{ sitePulseCopy.secondaryCta }}
            </a>
          </div>
        </div>

        <aside class="mailhealth-report-panel sitepulse-report-panel" :aria-labelledby="`${site.slug}-report`">
          <div class="mailhealth-report-panel__header sitepulse-report-panel__header">
            <h2 :id="`${site.slug}-report`">{{ sitePulseCopy.reportTitle }}</h2>
            <span>{{ sitePulseCopy.reportGrade }}</span>
          </div>
          <div class="mailhealth-report-score sitepulse-report-score">
            <div>
              <span>{{ sitePulseCopy.reportScoreLabel }}</span>
              <strong>{{ sitePulseCopy.reportScoreValue }}</strong>
            </div>
            <dl>
              <div>
                <dt>{{ sitePulseCopy.reportUrlLabel }}</dt>
                <dd>{{ sitePulseCopy.reportUrlValue }}</dd>
              </div>
            </dl>
          </div>
          <p>{{ sitePulseCopy.reportBody }}</p>
          <div class="mailhealth-signal-list sitepulse-signal-list">
            <article v-for="signal in sitePulseCopy.reportSignals" :key="signal.label">
              <span>{{ signal.label }}</span>
              <strong>{{ signal.status }}</strong>
              <p>{{ signal.detail }}</p>
            </article>
          </div>
        </aside>
      </section>

      <section class="mailhealth-section sitepulse-section" :aria-labelledby="`${site.slug}-browse`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-browse`">{{ sitePulseCopy.browseTitle }}</h2>
          <p>{{ sitePulseCopy.browseBody }}</p>
        </div>
        <div class="mailhealth-shortcut-grid sitepulse-shortcut-grid">
          <article v-for="group in sitePulseShortcutGroups" :key="group.title">
            <h3>{{ group.title }}</h3>
            <p>{{ group.body }}</p>
            <div class="mailhealth-shortcut-list sitepulse-shortcut-list">
              <a
                v-for="tool in group.tools"
                :key="`${group.title}-${tool.path}`"
                :href="getSitePulseToolUrl(tool.path)"
                @click="trackSitePulseToolClick(tool.path)"
              >
                <span aria-hidden="true">{{ tool.glyph }}</span>
                <strong>{{ tool.label }}</strong>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section class="mailhealth-section sitepulse-section" :aria-labelledby="`${site.slug}-featured`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-featured`">{{ sitePulseCopy.featuredTitle }}</h2>
          <p>{{ sitePulseCopy.featuredBody }}</p>
        </div>
        <div class="mailhealth-featured-grid sitepulse-featured-grid">
          <a
            v-for="tool in sitePulseFeaturedTools"
            :key="`featured-${tool.path}`"
            class="mailhealth-tool-card sitepulse-tool-card mailhealth-tool-card--featured sitepulse-tool-card--featured"
            :href="getSitePulseToolUrl(tool.path)"
            @click="trackSitePulseToolClick(tool.path)"
          >
            <span class="mailhealth-tool-card__glyph sitepulse-tool-card__glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span class="mailhealth-tool-card__body sitepulse-tool-card__body">
              <span>{{ getSitePulseCategoryLabel(tool.category) }}</span>
              <strong>{{ tool.label }}</strong>
              <em>{{ tool.body }}</em>
            </span>
            <b>{{ sitePulseCopy.toolCta }}</b>
          </a>
        </div>
      </section>

      <section class="mailhealth-limit-note sitepulse-limit-note" :aria-labelledby="`${site.slug}-limits`">
        <div>
          <h2 :id="`${site.slug}-limits`">{{ sitePulseCopy.limitsTitle }}</h2>
          <p>{{ sitePulseCopy.limitsBody }}</p>
        </div>
        <div>
          <h3>{{ sitePulseCopy.privacyTitle }}</h3>
          <p>{{ sitePulseCopy.privacyBody }}</p>
        </div>
      </section>

      <section :id="`${site.slug}-all`" class="mailhealth-section sitepulse-section" :aria-labelledby="`${site.slug}-all-title`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-all-title`">{{ sitePulseCopy.allTitle }}</h2>
          <p>{{ sitePulseCopy.allBody }}</p>
        </div>
        <div class="mailhealth-finder sitepulse-finder" role="search" :aria-label="sitePulseCopy.searchLabel">
          <div class="field">
            <label for="sitepulse-search">{{ sitePulseCopy.searchLabel }}</label>
            <input
              id="sitepulse-search"
              v-model="sitePulseSearchQuery"
              type="search"
              :placeholder="sitePulseCopy.searchPlaceholder"
            >
          </div>
          <div class="mailhealth-category-tabs sitepulse-category-tabs" :aria-label="sitePulseCopy.searchLabel">
            <button
              type="button"
              :aria-pressed="sitePulseSelectedCategory === 'all'"
              @click="sitePulseSelectedCategory = 'all'"
            >
              {{ sitePulseCopy.allCategories }}
            </button>
            <button
              v-for="category in sitePulseCopy.categories"
              :key="category.key"
              type="button"
              :aria-pressed="sitePulseSelectedCategory === category.key"
              @click="sitePulseSelectedCategory = category.key"
            >
              {{ category.label }}
            </button>
          </div>
        </div>
        <div v-if="filteredSitePulseTools.length > 0" class="mailhealth-tool-grid sitepulse-tool-grid">
          <a
            v-for="tool in filteredSitePulseTools"
            :key="tool.path"
            class="mailhealth-tool-card sitepulse-tool-card"
            :href="getSitePulseToolUrl(tool.path)"
            @click="trackSitePulseToolClick(tool.path)"
          >
            <span class="mailhealth-tool-card__glyph sitepulse-tool-card__glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span class="mailhealth-tool-card__body sitepulse-tool-card__body">
              <span>{{ getSitePulseCategoryLabel(tool.category) }}</span>
              <strong>{{ tool.label }}</strong>
              <em>{{ tool.body }}</em>
            </span>
            <b>{{ sitePulseCopy.toolCta }}</b>
          </a>
        </div>
        <div v-else class="mailhealth-empty sitepulse-empty" aria-live="polite">
          <h3>{{ sitePulseCopy.noResultsTitle }}</h3>
          <p>{{ sitePulseCopy.noResultsBody }}</p>
        </div>
      </section>

      <section class="mailhealth-footer-cluster sitepulse-footer-cluster" :aria-labelledby="`${site.slug}-deep-links`">
        <div class="mailhealth-footer-grid sitepulse-footer-grid">
          <section v-for="group in sitePulseCopy.footerGroups" :key="group.title">
            <h2>{{ group.title }}</h2>
            <ul>
              <li v-for="link in group.links" :key="`${group.title}-${link.label}`">
                <a
                  :href="getSitePulseToolUrl(link.path)"
                  @click="trackSitePulseToolClick(link.path)"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </template>

    <template v-else-if="isPixelBatchCatalog">
      <section class="mailhealth-hero pixelbatch-hero" :aria-labelledby="`${site.slug}-title`">
        <div class="mailhealth-hero__copy pixelbatch-hero__copy">
          <p class="eyebrow">{{ pixelBatchCopy.eyebrow }}</p>
          <h1 :id="`${site.slug}-title`">{{ pixelBatchCopy.title }}</h1>
          <p class="lead">{{ pixelBatchCopy.lead }}</p>
          <div class="mailhealth-hero__actions pixelbatch-hero__actions">
            <a
              class="button-link"
              :href="getPixelBatchToolUrl(primaryPixelBatchPath)"
              @click="trackPixelBatchToolClick(primaryPixelBatchPath)"
            >
              {{ pixelBatchCopy.primaryCta }}
            </a>
            <a class="button-link button-link--secondary" :href="`#${site.slug}-all`">
              {{ pixelBatchCopy.secondaryCta }}
            </a>
          </div>
        </div>

        <aside class="pixelbatch-drop-panel" :aria-labelledby="`${site.slug}-drop`">
          <div class="pixelbatch-drop-target">
            <span aria-hidden="true">IMG</span>
            <h2 :id="`${site.slug}-drop`">{{ pixelBatchCopy.dropTitle }}</h2>
            <p>{{ pixelBatchCopy.dropBody }}</p>
            <a
              :href="getPixelBatchToolUrl(primaryPixelBatchPath)"
              @click="trackPixelBatchToolClick(primaryPixelBatchPath)"
            >
              {{ pixelBatchCopy.dropAction }}
            </a>
          </div>
          <div class="pixelbatch-drop-meta">
            <div>
              <strong>{{ pixelBatchCopy.dropPrivacy }}</strong>
              <span>{{ pixelBatchCopy.dropFormatsLabel }}: {{ pixelBatchCopy.dropFormats }}</span>
            </div>
          </div>
          <div class="pixelbatch-preview-table" :aria-label="pixelBatchCopy.previewTitle">
            <h3>{{ pixelBatchCopy.previewTitle }}</h3>
            <dl>
              <div v-for="row in pixelBatchCopy.previewRows" :key="row.label">
                <dt>{{ row.label }}</dt>
                <dd>{{ row.value }}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>

      <section class="mailhealth-section pixelbatch-section" :aria-labelledby="`${site.slug}-browse`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-browse`">{{ pixelBatchCopy.browseTitle }}</h2>
          <p>{{ pixelBatchCopy.browseBody }}</p>
        </div>
        <div class="mailhealth-shortcut-grid pixelbatch-shortcut-grid">
          <article v-for="group in pixelBatchShortcutGroups" :key="group.title">
            <h3>{{ group.title }}</h3>
            <p>{{ group.body }}</p>
            <div class="mailhealth-shortcut-list pixelbatch-shortcut-list">
              <a
                v-for="tool in group.tools"
                :key="`${group.title}-${tool.path}`"
                :href="getPixelBatchToolUrl(tool.path)"
                @click="trackPixelBatchToolClick(tool.path)"
              >
                <span aria-hidden="true">{{ tool.glyph }}</span>
                <strong>{{ tool.label }}</strong>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section class="mailhealth-section pixelbatch-section" :aria-labelledby="`${site.slug}-featured`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-featured`">{{ pixelBatchCopy.featuredTitle }}</h2>
          <p>{{ pixelBatchCopy.featuredBody }}</p>
        </div>
        <div class="mailhealth-featured-grid pixelbatch-featured-grid">
          <a
            v-for="tool in pixelBatchFeaturedTools"
            :key="`featured-${tool.path}`"
            class="mailhealth-tool-card pixelbatch-tool-card mailhealth-tool-card--featured pixelbatch-tool-card--featured"
            :href="getPixelBatchToolUrl(tool.path)"
            @click="trackPixelBatchToolClick(tool.path)"
          >
            <span class="mailhealth-tool-card__glyph pixelbatch-tool-card__glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span class="mailhealth-tool-card__body pixelbatch-tool-card__body">
              <span>{{ getPixelBatchCategoryLabel(tool.category) }}</span>
              <strong>{{ tool.label }}</strong>
              <em>{{ tool.body }}</em>
            </span>
            <b>{{ pixelBatchCopy.toolCta }}</b>
          </a>
        </div>
      </section>

      <section class="mailhealth-limit-note pixelbatch-limit-note" :aria-labelledby="`${site.slug}-limits`">
        <div>
          <h2 :id="`${site.slug}-limits`">{{ pixelBatchCopy.limitsTitle }}</h2>
          <p>{{ pixelBatchCopy.limitsBody }}</p>
        </div>
        <div>
          <h3>{{ pixelBatchCopy.privacyTitle }}</h3>
          <p>{{ pixelBatchCopy.privacyBody }}</p>
        </div>
      </section>

      <section :id="`${site.slug}-all`" class="mailhealth-section pixelbatch-section" :aria-labelledby="`${site.slug}-all-title`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-all-title`">{{ pixelBatchCopy.allTitle }}</h2>
          <p>{{ pixelBatchCopy.allBody }}</p>
        </div>
        <div class="mailhealth-finder pixelbatch-finder" role="search" :aria-label="pixelBatchCopy.searchLabel">
          <div class="field">
            <label for="pixelbatch-search">{{ pixelBatchCopy.searchLabel }}</label>
            <input
              id="pixelbatch-search"
              v-model="pixelBatchSearchQuery"
              type="search"
              :placeholder="pixelBatchCopy.searchPlaceholder"
            >
          </div>
          <div class="mailhealth-category-tabs pixelbatch-category-tabs" :aria-label="pixelBatchCopy.searchLabel">
            <button
              type="button"
              :aria-pressed="pixelBatchSelectedCategory === 'all'"
              @click="pixelBatchSelectedCategory = 'all'"
            >
              {{ pixelBatchCopy.allCategories }}
            </button>
            <button
              v-for="category in pixelBatchCopy.categories"
              :key="category.key"
              type="button"
              :aria-pressed="pixelBatchSelectedCategory === category.key"
              @click="pixelBatchSelectedCategory = category.key"
            >
              {{ category.label }}
            </button>
          </div>
        </div>
        <div v-if="filteredPixelBatchTools.length > 0" class="mailhealth-tool-grid pixelbatch-tool-grid">
          <a
            v-for="tool in filteredPixelBatchTools"
            :key="tool.path"
            class="mailhealth-tool-card pixelbatch-tool-card"
            :href="getPixelBatchToolUrl(tool.path)"
            @click="trackPixelBatchToolClick(tool.path)"
          >
            <span class="mailhealth-tool-card__glyph pixelbatch-tool-card__glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span class="mailhealth-tool-card__body pixelbatch-tool-card__body">
              <span>{{ getPixelBatchCategoryLabel(tool.category) }}</span>
              <strong>{{ tool.label }}</strong>
              <em>{{ tool.body }}</em>
            </span>
            <b>{{ pixelBatchCopy.toolCta }}</b>
          </a>
        </div>
        <div v-else class="mailhealth-empty pixelbatch-empty" aria-live="polite">
          <h3>{{ pixelBatchCopy.noResultsTitle }}</h3>
          <p>{{ pixelBatchCopy.noResultsBody }}</p>
        </div>
      </section>

      <section class="mailhealth-footer-cluster pixelbatch-footer-cluster" :aria-labelledby="`${site.slug}-deep-links`">
        <div class="mailhealth-footer-grid pixelbatch-footer-grid">
          <section v-for="group in pixelBatchCopy.footerGroups" :key="group.title">
            <h2>{{ group.title }}</h2>
            <ul>
              <li v-for="link in group.links" :key="`${group.title}-${link.label}`">
                <a
                  :href="getPixelBatchToolUrl(link.path)"
                  @click="trackPixelBatchToolClick(link.path)"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </template>

    <template v-else-if="isDocShiftCatalog">
      <section class="mailhealth-hero docshift-hero" :aria-labelledby="`${site.slug}-title`">
        <div class="mailhealth-hero__copy docshift-hero__copy">
          <p class="eyebrow">{{ docShiftCopy.eyebrow }}</p>
          <h1 :id="`${site.slug}-title`">{{ docShiftCopy.title }}</h1>
          <p class="lead">{{ docShiftCopy.lead }}</p>
          <div class="mailhealth-hero__actions docshift-hero__actions">
            <a
              class="button-link"
              :href="getDocShiftToolUrl(primaryDocShiftPath)"
              @click="trackDocShiftToolClick(primaryDocShiftPath)"
            >
              {{ docShiftCopy.primaryCta }}
            </a>
            <a class="button-link button-link--secondary" :href="`#${site.slug}-all`">
              {{ docShiftCopy.secondaryCta }}
            </a>
          </div>
        </div>

        <aside class="docshift-drop-panel" :aria-labelledby="`${site.slug}-drop`">
          <div class="docshift-drop-target">
            <span aria-hidden="true">PDF</span>
            <h2 :id="`${site.slug}-drop`">{{ docShiftCopy.dropTitle }}</h2>
            <p>{{ docShiftCopy.dropBody }}</p>
            <a
              :href="getDocShiftToolUrl(primaryDocShiftPath)"
              @click="trackDocShiftToolClick(primaryDocShiftPath)"
            >
              {{ docShiftCopy.dropAction }}
            </a>
          </div>
          <div class="docshift-drop-meta">
            <div>
              <strong>{{ docShiftCopy.dropPrivacy }}</strong>
              <span>{{ docShiftCopy.dropFormatsLabel }}: {{ docShiftCopy.dropFormats }}</span>
            </div>
          </div>
          <div class="docshift-preview-table" :aria-label="docShiftCopy.previewTitle">
            <h3>{{ docShiftCopy.previewTitle }}</h3>
            <dl>
              <div v-for="row in docShiftCopy.previewRows" :key="row.label">
                <dt>{{ row.label }}</dt>
                <dd>{{ row.value }}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>

      <section class="mailhealth-section docshift-section" :aria-labelledby="`${site.slug}-browse`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-browse`">{{ docShiftCopy.browseTitle }}</h2>
          <p>{{ docShiftCopy.browseBody }}</p>
        </div>
        <div class="mailhealth-shortcut-grid docshift-shortcut-grid">
          <article v-for="group in docShiftShortcutGroups" :key="group.title">
            <h3>{{ group.title }}</h3>
            <p>{{ group.body }}</p>
            <div class="mailhealth-shortcut-list docshift-shortcut-list">
              <a
                v-for="tool in group.tools"
                :key="`${group.title}-${tool.path}`"
                :href="getDocShiftToolUrl(tool.path)"
                @click="trackDocShiftToolClick(tool.path)"
              >
                <span aria-hidden="true">{{ tool.glyph }}</span>
                <strong>{{ tool.label }}</strong>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section class="mailhealth-section docshift-section" :aria-labelledby="`${site.slug}-featured`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-featured`">{{ docShiftCopy.featuredTitle }}</h2>
          <p>{{ docShiftCopy.featuredBody }}</p>
        </div>
        <div class="mailhealth-featured-grid docshift-featured-grid">
          <a
            v-for="tool in docShiftFeaturedTools"
            :key="`featured-${tool.path}`"
            class="mailhealth-tool-card docshift-tool-card mailhealth-tool-card--featured docshift-tool-card--featured"
            :href="getDocShiftToolUrl(tool.path)"
            @click="trackDocShiftToolClick(tool.path)"
          >
            <span class="mailhealth-tool-card__glyph docshift-tool-card__glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span class="mailhealth-tool-card__body docshift-tool-card__body">
              <span>{{ getDocShiftCategoryLabel(tool.category) }}</span>
              <strong>{{ tool.label }}</strong>
              <em>{{ tool.body }}</em>
            </span>
            <b>{{ docShiftCopy.toolCta }}</b>
          </a>
        </div>
      </section>

      <section class="mailhealth-limit-note docshift-limit-note" :aria-labelledby="`${site.slug}-limits`">
        <div>
          <h2 :id="`${site.slug}-limits`">{{ docShiftCopy.limitsTitle }}</h2>
          <p>{{ docShiftCopy.limitsBody }}</p>
        </div>
        <div>
          <h3>{{ docShiftCopy.privacyTitle }}</h3>
          <p>{{ docShiftCopy.privacyBody }}</p>
        </div>
      </section>

      <section :id="`${site.slug}-all`" class="mailhealth-section docshift-section" :aria-labelledby="`${site.slug}-all-title`">
        <div class="section-heading">
          <h2 :id="`${site.slug}-all-title`">{{ docShiftCopy.allTitle }}</h2>
          <p>{{ docShiftCopy.allBody }}</p>
        </div>
        <div class="mailhealth-finder docshift-finder" role="search" :aria-label="docShiftCopy.searchLabel">
          <div class="field">
            <label for="docshift-search">{{ docShiftCopy.searchLabel }}</label>
            <input
              id="docshift-search"
              v-model="docShiftSearchQuery"
              type="search"
              :placeholder="docShiftCopy.searchPlaceholder"
            >
          </div>
          <div class="mailhealth-category-tabs docshift-category-tabs" :aria-label="docShiftCopy.searchLabel">
            <button
              type="button"
              :aria-pressed="docShiftSelectedCategory === 'all'"
              @click="docShiftSelectedCategory = 'all'"
            >
              {{ docShiftCopy.allCategories }}
            </button>
            <button
              v-for="category in docShiftCopy.categories"
              :key="category.key"
              type="button"
              :aria-pressed="docShiftSelectedCategory === category.key"
              @click="docShiftSelectedCategory = category.key"
            >
              {{ category.label }}
            </button>
          </div>
        </div>
        <div v-if="filteredDocShiftTools.length > 0" class="mailhealth-tool-grid docshift-tool-grid">
          <a
            v-for="tool in filteredDocShiftTools"
            :key="tool.path"
            class="mailhealth-tool-card docshift-tool-card"
            :href="getDocShiftToolUrl(tool.path)"
            @click="trackDocShiftToolClick(tool.path)"
          >
            <span class="mailhealth-tool-card__glyph docshift-tool-card__glyph" aria-hidden="true">{{ tool.glyph }}</span>
            <span class="mailhealth-tool-card__body docshift-tool-card__body">
              <span>{{ getDocShiftCategoryLabel(tool.category) }}</span>
              <strong>{{ tool.label }}</strong>
              <em>{{ tool.body }}</em>
            </span>
            <b>{{ docShiftCopy.toolCta }}</b>
          </a>
        </div>
        <div v-else class="mailhealth-empty docshift-empty" aria-live="polite">
          <h3>{{ docShiftCopy.noResultsTitle }}</h3>
          <p>{{ docShiftCopy.noResultsBody }}</p>
        </div>
      </section>

      <section class="mailhealth-footer-cluster docshift-footer-cluster" :aria-labelledby="`${site.slug}-deep-links`">
        <div class="mailhealth-footer-grid docshift-footer-grid">
          <section v-for="group in docShiftCopy.footerGroups" :key="group.title">
            <h2>{{ group.title }}</h2>
            <ul>
              <li v-for="link in group.links" :key="`${group.title}-${link.label}`">
                <a
                  :href="getDocShiftToolUrl(link.path)"
                  @click="trackDocShiftToolClick(link.path)"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </template>

    <template v-else>
      <section class="hero" :aria-labelledby="`${site.slug}-title`">
        <div>
          <div class="detail-topline">
            <p class="eyebrow">{{ getCategoryLabel(site.category, locale) }}</p>
            <span :class="getStatusBadgeClass(site.status)">
              {{ statusLabels[site.status][locale] }}
            </span>
          </div>
          <h1 :id="`${site.slug}-title`">{{ site.name }}</h1>
          <p class="lead">{{ siteText.headline }}</p>
        </div>

        <aside class="network-panel" :aria-label="copy.detailsTitle">
          <div class="network-panel__row">
            <div>
              <strong>{{ copy.categoryLabel }}</strong>
              <span>{{ getCategoryLabel(site.category, locale) }}</span>
            </div>
            <span class="signal" aria-hidden="true"></span>
          </div>
          <div class="network-panel__row">
            <div>
              <strong>{{ copy.freeToolsTitle }}</strong>
              <span>{{ siteText.freeValue }}</span>
            </div>
            <span class="signal" aria-hidden="true"></span>
          </div>
          <div class="network-panel__row">
            <div>
              <strong>{{ copy.publicCta }}</strong>
              <span>{{ site.temporaryUrl }}</span>
            </div>
            <span class="signal" aria-hidden="true"></span>
          </div>
        </aside>
      </section>

      <section class="detail-layout">
        <div>
          <p class="detail-copy">{{ siteText.summary }}</p>

          <section class="detail-section" :aria-labelledby="`${site.slug}-free`">
            <h2 :id="`${site.slug}-free`">{{ copy.freeToolsTitle }}</h2>
            <ul class="check-list">
              <li v-for="tool in site.freeTools" :key="tool">{{ tool }}</li>
            </ul>
          </section>

          <section class="detail-section" :aria-labelledby="`${site.slug}-paid`">
            <h2 :id="`${site.slug}-paid`">{{ copy.paidBenefitsTitle }}</h2>
            <ul class="check-list">
              <li v-for="benefit in site.paidBenefits" :key="benefit">{{ benefit }}</li>
            </ul>
          </section>
        </div>

        <aside class="band" :aria-labelledby="`${site.slug}-quality`">
          <h2 :id="`${site.slug}-quality`">{{ copy.methodologyTitle }}</h2>
          <p>{{ copy.methodologyBody }}</p>
          <dl class="fact-list">
            <div>
              <dt>{{ copy.freeToolsTitle }}</dt>
              <dd>{{ siteText.freeValue }}</dd>
            </div>
            <div>
              <dt>{{ copy.paidBenefitsTitle }}</dt>
              <dd>{{ siteText.upgrade }}</dd>
            </div>
          </dl>
          <div class="detail-actions">
            <NuxtLink class="button-link" :to="localizedHomePath(locale)">
              {{ copy.backToCatalog }}
            </NuxtLink>
            <a
              v-if="localNetProbeToolsUrl"
              class="button-link button-link--secondary"
              :href="localNetProbeToolsUrl"
            >
              {{ copy.localDevCta }}
            </a>
            <a
              class="button-link button-link--secondary"
              :href="site.temporaryUrl"
              @click="trackPublicSiteClick"
            >
              {{ copy.publicCta }}
            </a>
          </div>
        </aside>
      </section>
    </template>

    <LegalFooter :locale="locale" />
  </main>
</template>
