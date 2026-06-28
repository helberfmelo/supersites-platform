<script setup lang="ts">
import { getStatusBadgeClass } from '@supersites/ui'
import { computed, ref } from 'vue'
import { getHomeCopy } from '../data/copy'
import { absoluteUrl, localeAlternates } from '../data/routes'
import { createHubHomeStructuredData } from '../data/schema'
import {
  categoryCatalog,
  filterSites,
  getCategoryLabel,
  getSiteBySlug,
  statusLabels,
  type SiteSummary,
  type SiteCategory,
} from '../data/sites'
import { localeCodes, localizedHomePath, localizedSitePath, type LocaleCode } from '../data/locales'
import { trackOutboundSiteClick } from '../utils/analytics'

const props = defineProps<{
  locale: LocaleCode
  xDefault?: boolean
}>()

const copy = computed(() => getHomeCopy(props.locale))
const searchQuery = ref('')
const selectedCategory = ref<SiteCategory | 'all'>('all')
const filteredSites = computed(() => filterSites(searchQuery.value, selectedCategory.value))
const canonicalPath = computed(() => (props.xDefault ? '/' : localizedHomePath(props.locale)))
const featuredTools = computed(() => copy.value.featuredTools
  .map((item) => {
    const site = getSiteBySlug(item.siteSlug)

    return site ? { ...item, site } : null
  })
  .filter((item): item is { siteSlug: string; label: string; body: string; site: SiteSummary } => Boolean(item)))
const intentClusters = computed(() => copy.value.intentClusters.map((cluster) => ({
  ...cluster,
  sites: cluster.siteSlugs
    .map((siteSlug) => getSiteBySlug(siteSlug))
    .filter((site): site is SiteSummary => Boolean(site)),
})))

function trackPublicSiteClick(siteSlug: string, targetUrl: string, surface = 'catalog_card'): void {
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
  title: props.xDefault ? 'SuperSites Hub' : `${copy.value.title} | SuperSites`,
  meta: [
    {
      name: 'description',
      content: copy.value.lead,
    },
    {
      property: 'og:title',
      content: 'SuperSites Hub',
    },
    {
      property: 'og:description',
      content: copy.value.lead,
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

    <section class="hero" aria-labelledby="catalog-title">
      <div>
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h1 id="catalog-title">{{ copy.title }}</h1>
        <p class="lead">{{ copy.lead }}</p>
      </div>

      <aside class="network-panel" aria-label="Network status">
        <div v-for="row in copy.networkRows" :key="row.title" class="network-panel__row">
          <div>
            <strong>{{ row.title }}</strong>
            <span>{{ row.body }}</span>
          </div>
          <span :class="['signal', row.tone === 'amber' ? 'signal--amber' : '']" aria-hidden="true"></span>
        </div>
      </aside>
    </section>

    <section class="launch-desk" aria-labelledby="launch-desk-title">
      <div class="section-heading">
        <p class="eyebrow">{{ copy.launchDeskTitle }}</p>
        <h2 id="launch-desk-title">{{ copy.featuredToolsTitle }}</h2>
        <p>{{ copy.launchDeskBody }}</p>
      </div>

      <div class="feature-grid" :aria-label="copy.featuredToolsTitle">
        <article v-for="item in featuredTools" :key="item.site.slug" class="feature-card">
          <div class="preview-frame" :data-category="item.site.category" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <i></i>
          </div>
          <div>
            <span class="category">{{ getCategoryLabel(item.site.category, locale) }}</span>
            <h3>{{ item.label }}</h3>
            <p>{{ item.body }}</p>
          </div>
          <div class="card-actions">
            <NuxtLink class="button-link" :to="localizedSitePath(locale, item.site.slug)">
              {{ copy.detailCta }}
            </NuxtLink>
            <a
              class="button-link button-link--secondary"
              :href="item.site.temporaryUrl"
              @click="trackPublicSiteClick(item.site.slug, item.site.temporaryUrl, 'featured_tool')"
            >
              {{ copy.publicCta }}
            </a>
          </div>
        </article>
      </div>

      <div class="evidence-strip" :aria-label="copy.liveEvidenceTitle">
        <strong>{{ copy.liveEvidenceTitle }}</strong>
        <span>{{ copy.liveEvidenceBody }}</span>
      </div>
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

    <section class="controls" aria-label="Catalog controls">
      <div class="field">
        <label for="catalog-search">{{ copy.searchLabel }}</label>
        <input id="catalog-search" v-model="searchQuery" type="search" :placeholder="copy.searchPlaceholder">
      </div>
      <div class="field">
        <label for="catalog-category">{{ copy.categoryLabel }}</label>
        <select id="catalog-category" v-model="selectedCategory">
          <option value="all">{{ copy.allCategories }}</option>
          <option v-for="category in categoryCatalog" :key="category.key" :value="category.key">
            {{ category.labels[locale] }}
          </option>
        </select>
      </div>
    </section>

    <section class="category-tabs" aria-label="Category shortcuts">
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
    </section>

    <section class="catalog-grid" aria-label="SuperSites catalog">
      <article v-for="site in filteredSites" :key="site.slug" class="site-card">
        <div>
          <div class="site-card__topline">
            <span class="category">{{ getCategoryLabel(site.category, locale) }}</span>
            <span :class="getStatusBadgeClass(site.status)">
              {{ statusLabels[site.status][locale] }}
            </span>
          </div>
          <h2>{{ site.name }}</h2>
          <p>{{ site.localized[locale].headline }}</p>
          <ul class="site-card__signals" :aria-label="`${site.name} operating signals`">
            <li>{{ site.freeTools.length }} {{ copy.toolTracksLabel }}</li>
            <li>{{ localeCodes.length }} {{ copy.localesLabel }}</li>
            <li>{{ copy.gatedLabel }}</li>
          </ul>
          <dl>
            <div>
              <dt>{{ copy.freeLabel }}</dt>
              <dd>{{ site.localized[locale].freeValue }}</dd>
            </div>
            <div>
              <dt>{{ copy.upgradeLabel }}</dt>
              <dd>{{ site.localized[locale].upgrade }}</dd>
            </div>
            <div>
              <dt>{{ copy.launchOrderLabel }}</dt>
              <dd>#{{ site.launchOrder }}</dd>
            </div>
          </dl>
        </div>
        <div class="card-actions">
          <NuxtLink class="button-link" :to="localizedSitePath(locale, site.slug)">
            {{ copy.detailCta }}
          </NuxtLink>
          <a
            class="button-link button-link--secondary"
            :href="site.temporaryUrl"
            @click="trackPublicSiteClick(site.slug, site.temporaryUrl)"
          >
            {{ copy.publicCta }}
          </a>
        </div>
      </article>
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
