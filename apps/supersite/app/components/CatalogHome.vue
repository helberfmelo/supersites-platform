<script setup lang="ts">
import { getStatusBadgeClass } from '@supersites/ui'
import { computed, ref } from 'vue'
import { homeCopy } from '../data/copy'
import { absoluteUrl, localeAlternates } from '../data/routes'
import {
  categoryCatalog,
  filterSites,
  getCategoryLabel,
  statusLabels,
  type SiteCategory,
} from '../data/sites'
import { localizedHomePath, localizedSitePath, type LocaleCode } from '../data/locales'
import { trackOutboundSiteClick } from '../utils/analytics'

const props = defineProps<{
  locale: LocaleCode
  xDefault?: boolean
}>()

const copy = computed(() => homeCopy[props.locale])
const searchQuery = ref('')
const selectedCategory = ref<SiteCategory | 'all'>('all')
const filteredSites = computed(() => filterSites(searchQuery.value, selectedCategory.value))
const canonicalPath = computed(() => (props.xDefault ? '/' : localizedHomePath(props.locale)))

function trackPublicSiteClick(siteSlug: string, targetUrl: string): void {
  trackOutboundSiteClick({
    siteSlug,
    targetUrl,
    locale: props.locale,
    routePath: canonicalPath.value,
    surface: 'catalog_card',
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

    <LegalFooter :locale="locale" />
  </main>
</template>
