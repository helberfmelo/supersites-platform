<script setup lang="ts">
import { limitSeoText, SEO_DESCRIPTION_MAX_LENGTH, SEO_TITLE_MAX_LENGTH } from '@supersites/seo'
import { getStatusBadgeClass } from '@supersites/ui'
import { computed, ref } from 'vue'
import { getHomeCopy } from '../data/copy'
import { localizedHomePath, localizedToolPath, toHtmlLang, type LocaleCode } from '../data/locales'
import { absoluteUrl, localeAlternates } from '../data/routes'
import {
  filterInvoiceCraftTools,
  getCategoryLabel,
  getInvoiceCraftToolCopy,
  invoiceCraftToolCatalog,
  type InvoiceCraftToolCategory,
} from '../data/tools'

const props = defineProps<{
  locale: LocaleCode
  xDefault?: boolean
}>()

const copy = computed(() => getHomeCopy(props.locale))
const searchQuery = ref('')
const selectedCategory = ref<InvoiceCraftToolCategory | 'all'>('all')
const filteredTools = computed(() => filterInvoiceCraftTools(searchQuery.value, selectedCategory.value, props.locale))
const canonicalPath = computed(() => (props.xDefault ? '/' : localizedHomePath(props.locale)))
const categories = computed(() => Array.from(new Set(invoiceCraftToolCatalog.map((tool) => tool.category))))
const seoTitle = computed(() =>
  props.xDefault ? 'InvoiceCraft' : limitSeoText(`${copy.value.title} | InvoiceCraft`, SEO_TITLE_MAX_LENGTH),
)
const seoDescription = computed(() => limitSeoText(copy.value.lead, SEO_DESCRIPTION_MAX_LENGTH))
const homeJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'InvoiceCraft',
  description: copy.value.lead,
  inLanguage: props.locale,
  url: absoluteUrl(canonicalPath.value),
  publisher: {
    '@type': 'Organization',
    name: 'SuperSites',
  },
}))

useHead(() => ({
  htmlAttrs: {
    lang: toHtmlLang(props.locale),
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
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(homeJsonLd.value),
    },
  ],
}))
</script>

<template>
  <main class="page-shell">
    <SiteHeader :locale="locale" :path-for-locale="localizedHomePath" />

    <section class="studio-entry" aria-labelledby="invoicecraft-title">
      <div>
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h1 id="invoicecraft-title">{{ copy.title }}</h1>
        <p class="lead">{{ copy.lead }}</p>
      </div>
    </section>

    <InvoiceCraftWorkbench :locale="locale" initial-slug="invoice-builder" />

    <section class="controls" aria-label="Tool controls">
      <div class="field">
        <label for="tool-search">{{ copy.searchLabel }}</label>
        <input id="tool-search" v-model="searchQuery" type="search" :placeholder="copy.searchPlaceholder">
      </div>
      <div class="field">
        <label for="tool-category">{{ copy.categoryLabel }}</label>
        <select id="tool-category" v-model="selectedCategory">
          <option value="all">{{ copy.allCategories }}</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ getCategoryLabel(category, locale) }}
          </option>
        </select>
      </div>
    </section>

    <section class="category-tabs" aria-label="Tool categories">
      <button type="button" :aria-pressed="selectedCategory === 'all'" @click="selectedCategory = 'all'">
        {{ copy.allCategories }}
      </button>
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        :aria-pressed="selectedCategory === category"
        @click="selectedCategory = category"
      >
        {{ getCategoryLabel(category, locale) }}
      </button>
    </section>

    <section class="tool-grid" aria-label="InvoiceCraft tools">
      <article v-for="tool in filteredTools" :key="tool.slug" class="tool-card">
        <div>
          <div class="tool-card__topline">
            <span class="category">{{ getCategoryLabel(tool.category, locale) }}</span>
            <span :class="getStatusBadgeClass('foundation')">{{ copy.localBadgeLabel }}</span>
          </div>
          <h2>{{ getInvoiceCraftToolCopy(tool, locale).title }}</h2>
          <p>{{ getInvoiceCraftToolCopy(tool, locale).headline }}</p>
          <dl>
            <div>
              <dt>{{ copy.freeLabel }}</dt>
              <dd>{{ getInvoiceCraftToolCopy(tool, locale).freeScope }}</dd>
            </div>
            <div>
              <dt>{{ copy.upgradeLabel }}</dt>
              <dd>{{ getInvoiceCraftToolCopy(tool, locale).upgradeScope }}</dd>
            </div>
          </dl>
        </div>
        <div class="card-actions">
          <NuxtLink class="button-link" :to="localizedToolPath(locale, tool.slug)">
            {{ copy.detailCta }}
          </NuxtLink>
        </div>
      </article>
    </section>

    <section v-if="filteredTools.length === 0" class="band" aria-live="polite">
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

    <MonetizationSafeBlock
      :locale="locale"
      site-slug="invoicecraft"
      slot-id="invoicecraft-home-footer-leaderboard"
    />

    <LegalFooter :locale="locale" />
  </main>
</template>
