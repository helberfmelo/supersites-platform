<script setup lang="ts">
import { limitSeoText, SEO_DESCRIPTION_MAX_LENGTH } from '@supersites/seo'
import { getStatusBadgeClass } from '@supersites/ui'
import {
  getCalcHarborCatalogCopy,
  getDetailCopy,
  getDevUtilityCatalogCopy,
  getNetProbeCatalogCopy,
  getTimeNexusCatalogCopy,
  type CalcHarborCatalogCategoryKey,
  type DevUtilityCatalogCategoryKey,
  type DevUtilityCatalogToolLink,
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
const siteText = site.localized[locale]
const seoDescription = limitSeoText(siteText.summary, SEO_DESCRIPTION_MAX_LENGTH)
const canonicalPath = localizedSitePath(locale, site.slug)
const structuredData = createSiteDetailStructuredData(locale, site)
const isNetProbeCatalog = site.slug === 'netprobe-atlas'
const isCalcHarborCatalog = site.slug === 'calcharbor'
const isDevUtilityCatalog = site.slug === 'devutility-lab'
const isTimeNexusCatalog = site.slug === 'timenexus'
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
