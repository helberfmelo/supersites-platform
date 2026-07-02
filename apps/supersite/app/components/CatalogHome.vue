<script setup lang="ts">
import { limitSeoText, SEO_DESCRIPTION_MAX_LENGTH, SEO_TITLE_MAX_LENGTH } from '@supersites/seo'
import { computed, ref } from 'vue'
import { getHomeCopy } from '../data/copy'
import { absoluteUrl, localeAlternates } from '../data/routes'
import { createHubHomeStructuredData } from '../data/schema'
import {
  categoryCatalog,
  filterSites,
  getCategoryLabel,
  getSiteBySlug,
  type SiteSummary,
  type SiteCategory,
} from '../data/sites'
import { localizedHomePath, localizedSitePath, type LocaleCode } from '../data/locales'
import { trackOutboundSiteClick } from '../utils/analytics'

const props = defineProps<{
  locale: LocaleCode
  xDefault?: boolean
}>()

const copy = computed(() => getHomeCopy(props.locale))
const searchQuery = ref('')
const selectedCategory = ref<SiteCategory | 'all'>('all')
const filteredSites = computed(() => filterSites(searchQuery.value, selectedCategory.value, props.locale))
const canonicalPath = computed(() => (props.xDefault ? '/' : localizedHomePath(props.locale)))
const toolGlyphs: Record<string, string> = {
  '/tools/what-is-my-ip': 'IP',
  '/tools/dns-propagation': 'DNS',
  '/calculators/loan-payment': '$',
  '/tools/structured-data-formatter': '{}',
  '/tools/timezone-converter': 'TZ',
  '/tools/static-qr-code': 'QR',
  '/tools/invoice-builder': 'INV',
  '/tools/spf-checker': 'SPF',
  '/tools/status-checker': '200',
  '/tools/image-compressor': 'IMG',
  '/tools/pdf-merge': 'PDF',
}
const seoTitle = computed(() =>
  props.xDefault ? 'SuperSites Hub' : limitSeoText(`${copy.value.title} | SuperSites`, SEO_TITLE_MAX_LENGTH),
)
const seoDescription = computed(() => limitSeoText(copy.value.lead, SEO_DESCRIPTION_MAX_LENGTH))
const popularTools = computed(() => copy.value.popularTools
  .map((item) => {
    const site = getSiteBySlug(item.siteSlug)
    const url = site ? `${site.temporaryUrl}${props.locale}${item.path}` : ''

    return site ? { ...item, site, url, glyph: toolGlyphs[item.path] ?? site.name.slice(0, 3).toUpperCase() } : null
  })
  .filter((item): item is {
    siteSlug: string
    label: string
    body: string
    path: string
    site: SiteSummary
    url: string
    glyph: string
  } => Boolean(item)))
const filteredTools = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase()

  return popularTools.value.filter((item) => {
    const matchesCategory = selectedCategory.value === 'all' || item.site.category === selectedCategory.value
    const localizedSite = item.site.localized[props.locale]
    const searchableText = [
      item.label,
      item.body,
      item.site.name,
      item.site.slug,
      getCategoryLabel(item.site.category, props.locale),
      localizedSite.headline,
      localizedSite.summary,
    ]
      .join(' ')
      .toLowerCase()

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery))
  })
})
const intentClusters = computed(() => copy.value.intentClusters.map((cluster) => ({
  ...cluster,
  sites: cluster.siteSlugs
    .map((siteSlug) => getSiteBySlug(siteSlug))
    .filter((site): site is SiteSummary => Boolean(site)),
})))

function localizedPublicSiteUrl(site: SiteSummary): string {
  return `${site.temporaryUrl}${props.locale}`
}

function trackPublicSiteClick(siteSlug: string, targetUrl: string, surface: 'catalog_card' = 'catalog_card'): void {
  trackOutboundSiteClick({
    siteSlug,
    targetUrl,
    locale: props.locale,
    routePath: canonicalPath.value,
    surface,
  })
}

useHead(() => ({
  htmlAttrs: {
    lang: props.locale,
  },
  title: seoTitle.value,
  meta: [
    {
      name: 'description',
      content: seoDescription.value,
    },
    {
      property: 'og:title',
      content: seoTitle.value,
    },
    {
      property: 'og:description',
      content: seoDescription.value,
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
  link: [
    { rel: 'canonical', href: absoluteUrl(canonicalPath.value) },
    ...localeAlternates(localizedHomePath),
  ],
  script: createHubHomeStructuredData(props.locale, copy.value).map((item) => ({
    type: 'application/ld+json',
    innerHTML: JSON.stringify(item),
  })),
}))
</script>

<template>
  <main class="page-shell">
    <SiteHeader :locale="locale" :path-for-locale="localizedHomePath" />

    <section class="tool-finder" aria-labelledby="catalog-title">
      <div class="tool-finder__intro">
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h1 id="catalog-title">{{ copy.title }}</h1>
        <p class="lead">{{ copy.lead }}</p>
      </div>

      <div class="finder-panel" role="search" :aria-label="copy.searchLabel">
        <div class="field field--finder">
          <label for="catalog-search">{{ copy.searchLabel }}</label>
          <input id="catalog-search" v-model="searchQuery" type="search" :placeholder="copy.searchPlaceholder">
        </div>

        <div class="category-tabs category-tabs--finder" :aria-label="copy.categoryLabel">
          <button type="button" :aria-pressed="selectedCategory === 'all'" @click="selectedCategory = 'all'">
            {{ copy.allCategories }}
          </button>
          <button
            v-for="category in categoryCatalog"
            :key="category.key"
            type="button"
            :aria-pressed="selectedCategory === category.key"
            @click="selectedCategory = category.key"
          >
            {{ category.labels[locale] }}
          </button>
        </div>

        <div class="trust-row" aria-label="Public tool qualities">
          <div v-for="row in copy.networkRows" :key="row.title">
            <strong>{{ row.title }}</strong>
            <span>{{ row.body }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="tool-results-section" aria-labelledby="popular-tools-title">
      <div class="section-heading">
        <p class="eyebrow">{{ copy.launchDeskTitle }}</p>
        <h2 id="popular-tools-title">{{ copy.popularToolsTitle }}</h2>
        <p>{{ copy.popularToolsBody }}</p>
      </div>

      <div class="tool-shortcut-grid tool-shortcut-grid--primary" :aria-label="copy.popularToolsTitle">
        <a
          v-for="item in filteredTools"
          :key="`${item.site.slug}-${item.path}`"
          class="tool-shortcut-card"
          :href="item.url"
          @click="trackPublicSiteClick(item.site.slug, item.url)"
        >
          <span class="tool-shortcut-card__top">
            <span class="tool-shortcut-card__glyph" aria-hidden="true">{{ item.glyph }}</span>
            <span class="tool-shortcut-card__meta">
              {{ getCategoryLabel(item.site.category, locale) }}
              <span>{{ item.site.name }}</span>
            </span>
          </span>
          <span class="tool-shortcut-card__body">
            <h3>{{ item.label }}</h3>
            <p>{{ item.body }}</p>
          </span>
          <strong>{{ copy.popularToolsCta }}</strong>
        </a>
      </div>

      <section v-if="filteredTools.length === 0" class="empty-state" aria-live="polite">
        <h2>{{ copy.noResultsTitle }}</h2>
        <p>{{ copy.noResultsBody }}</p>
      </section>
    </section>

    <section class="intent-section" aria-labelledby="intent-title">
      <div class="section-heading section-heading--compact">
        <h2 id="intent-title">{{ copy.clustersTitle }}</h2>
      </div>
      <div class="intent-grid">
        <article v-for="cluster in intentClusters" :key="cluster.title" class="intent-card">
          <h3>{{ cluster.title }}</h3>
          <p>{{ cluster.body }}</p>
          <div class="inline-link-list">
            <NuxtLink
              v-for="site in cluster.sites"
              :key="site.slug"
              :to="localizedSitePath(locale, site.slug)"
            >
              {{ site.name }}
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <section class="site-directory" aria-labelledby="site-directory-title">
      <div class="section-heading">
        <p class="eyebrow">{{ copy.featuredToolsTitle }}</p>
        <h2 id="site-directory-title">{{ copy.previewTitle }}</h2>
        <p>{{ copy.launchDeskBody }}</p>
      </div>

      <div class="catalog-grid" aria-label="SuperSites catalog">
        <article v-for="site in filteredSites" :key="site.slug" class="site-card">
          <div>
            <div class="site-card__topline">
              <span class="category">{{ getCategoryLabel(site.category, locale) }}</span>
            </div>
            <h3>{{ site.name }}</h3>
            <p>{{ site.localized[locale].headline }}</p>
          </div>
          <div class="card-actions">
            <NuxtLink class="button-link" :to="localizedSitePath(locale, site.slug)">
              {{ copy.detailCta }}
            </NuxtLink>
            <a
              class="button-link button-link--secondary"
              :href="localizedPublicSiteUrl(site)"
              @click="trackPublicSiteClick(site.slug, localizedPublicSiteUrl(site))"
            >
              {{ copy.publicCta }}
            </a>
          </div>
        </article>
      </div>
    </section>

    <section v-if="filteredSites.length === 0" class="empty-state" aria-live="polite">
      <h2>{{ copy.noResultsTitle }}</h2>
      <p>{{ copy.noResultsBody }}</p>
    </section>

    <section class="band" aria-labelledby="principles-title">
      <h2 id="principles-title">{{ copy.principlesTitle }}</h2>
      <div class="band-grid">
        <div v-for="principle in copy.principles" :key="principle.title">
          <h3>{{ principle.title }}</h3>
          <p>{{ principle.body }}</p>
        </div>
      </div>
    </section>

    <section class="support-block" aria-labelledby="support-title">
      <div>
        <p class="eyebrow">{{ copy.supportEyebrow }}</p>
        <h2 id="support-title">{{ copy.supportTitle }}</h2>
        <p>{{ copy.supportBody }}</p>
      </div>
      <ul>
        <li v-for="action in copy.supportActions" :key="action">{{ action }}</li>
      </ul>
    </section>

    <AdPlaceholder
      slot-id="hub-home-footer-leaderboard"
      :page-path="canonicalPath"
      position="footer"
      format="leaderboard"
      surface="public-content"
      :distance-to-interactive-px="180"
    />

    <LegalFooter :locale="locale" />
  </main>
</template>
