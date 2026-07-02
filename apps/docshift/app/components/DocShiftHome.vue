<script setup lang="ts">
import { limitSeoText, SEO_DESCRIPTION_MAX_LENGTH, SEO_TITLE_MAX_LENGTH } from '@supersites/seo'
import { getStatusBadgeClass } from '@supersites/ui'
import { computed, ref } from 'vue'
import { getDocShiftAdvancedWorkflowCopy } from '../data/advancedWorkflows'
import { getHomeCopy } from '../data/copy'
import { localizedHomePath, localizedToolPath, toHtmlLang, type LocaleCode } from '../data/locales'
import { absoluteUrl, localeAlternates } from '../data/routes'
import {
  filterDocShiftTools,
  getCategoryLabel,
  getDocShiftToolCopy,
  docShiftToolCatalog,
  type DocShiftToolCategory,
} from '../data/tools'

const props = defineProps<{
  locale: LocaleCode
  xDefault?: boolean
}>()

const copy = computed(() => getHomeCopy(props.locale))
const advancedCopy = computed(() => getDocShiftAdvancedWorkflowCopy(props.locale))
const searchQuery = ref('')
const selectedCategory = ref<DocShiftToolCategory | 'all'>('all')
const filteredTools = computed(() => filterDocShiftTools(searchQuery.value, selectedCategory.value, props.locale))
const canonicalPath = computed(() => (props.xDefault ? '/' : localizedHomePath(props.locale)))
const categories = computed(() => Array.from(new Set(docShiftToolCatalog.map((tool) => tool.category))))
const seoTitle = computed(() =>
  props.xDefault ? 'DocShift' : limitSeoText(`${copy.value.title} | DocShift`, SEO_TITLE_MAX_LENGTH),
)
const seoDescription = computed(() => limitSeoText(copy.value.lead, SEO_DESCRIPTION_MAX_LENGTH))
const homeJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DocShift',
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

    <section class="hero" aria-labelledby="docshift-title">
      <div>
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h1 id="docshift-title">{{ copy.title }}</h1>
        <p class="lead">{{ copy.lead }}</p>
      </div>
    </section>

    <DocShiftWorkbench :locale="locale" initial-slug="pdf-merge" />

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

    <section class="tool-grid" aria-label="DocShift tools">
      <article v-for="tool in filteredTools" :key="tool.slug" class="tool-card">
        <div>
          <div class="tool-card__topline">
            <span class="category">{{ getCategoryLabel(tool.category, locale) }}</span>
            <span :class="getStatusBadgeClass('foundation')">{{ copy.localBadgeLabel }}</span>
          </div>
          <h2>{{ getDocShiftToolCopy(tool, locale).title }}</h2>
          <p>{{ getDocShiftToolCopy(tool, locale).headline }}</p>
          <dl>
            <div>
              <dt>{{ copy.freeLabel }}</dt>
              <dd>{{ getDocShiftToolCopy(tool, locale).freeScope }}</dd>
            </div>
            <div>
              <dt>{{ copy.upgradeLabel }}</dt>
              <dd>{{ getDocShiftToolCopy(tool, locale).upgradeScope }}</dd>
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

    <section class="band advanced-workflow-band" aria-labelledby="docshift-advanced-title">
      <h2 id="docshift-advanced-title">{{ advancedCopy.title }}</h2>
      <p>{{ advancedCopy.body }}</p>
      <div class="readiness-grid">
        <article v-for="item in advancedCopy.items" :key="item.title" class="readiness-card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.body }}</p>
          <dl class="readiness-list">
            <div>
              <dt>{{ advancedCopy.currentLabel }}</dt>
              <dd>{{ item.current }}</dd>
            </div>
            <div>
              <dt>{{ advancedCopy.dataLabel }}</dt>
              <dd>{{ item.data }}</dd>
            </div>
            <div>
              <dt>{{ advancedCopy.gateLabel }}</dt>
              <dd>{{ item.gate }}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>

    <section class="band pdf-footer-tools" aria-labelledby="docshift-footer-tools">
      <div>
        <h2 id="docshift-footer-tools">{{ copy.footerToolsTitle }}</h2>
        <p>{{ copy.footerToolsBody }}</p>
      </div>
      <div class="pdf-footer-tools__links">
        <NuxtLink v-for="tool in docShiftToolCatalog" :key="tool.slug" :to="localizedToolPath(locale, tool.slug)">
          <strong>{{ getDocShiftToolCopy(tool, locale).title }}</strong>
          <span>{{ getDocShiftToolCopy(tool, locale).freeScope }}</span>
        </NuxtLink>
      </div>
    </section>

    <MonetizationSafeBlock
      :locale="locale"
      site-slug="docshift"
      slot-id="docshift-home-footer-leaderboard"
    />

    <LegalFooter :locale="locale" />
  </main>
</template>
