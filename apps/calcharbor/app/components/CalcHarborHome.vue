<script setup lang="ts">
import { getStatusBadgeClass } from '@supersites/ui'
import { computed, ref } from 'vue'
import { getHomeCopy } from '../data/copy'
import { localizedCalculatorPath, localizedHomePath, toHtmlLang, type LocaleCode } from '../data/locales'
import { absoluteUrl, localeAlternates } from '../data/routes'
import {
  calculatorCatalog,
  filterCalculators,
  getCalculatorCopy,
  getCategoryLabel,
  type CalculatorCategory,
} from '../data/calculators'

const props = defineProps<{
  locale: LocaleCode
  xDefault?: boolean
}>()

const copy = computed(() => getHomeCopy(props.locale))
const searchQuery = ref('')
const selectedCategory = ref<CalculatorCategory | 'all'>('all')
const filteredCalculators = computed(() => filterCalculators(searchQuery.value, selectedCategory.value, props.locale))
const canonicalPath = computed(() => (props.xDefault ? '/' : localizedHomePath(props.locale)))
const categories = computed(() => Array.from(new Set(calculatorCatalog.map((calculator) => calculator.category))))
const homeJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CalcHarbor',
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
  title: props.xDefault ? 'CalcHarbor' : `${copy.value.title} | CalcHarbor`,
  meta: [
    {
      name: 'description',
      content: copy.value.lead,
    },
    {
      property: 'og:title',
      content: 'CalcHarbor',
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

    <section class="hero" aria-labelledby="calcharbor-title">
      <div>
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h1 id="calcharbor-title">{{ copy.title }}</h1>
        <p class="lead">{{ copy.lead }}</p>
      </div>

      <aside class="status-panel" aria-label="CalcHarbor status">
        <div v-for="row in copy.statusRows" :key="row.title" class="status-panel__row">
          <div>
            <strong>{{ row.title }}</strong>
            <span>{{ row.body }}</span>
          </div>
          <span :class="['signal', row.tone === 'amber' ? 'signal--amber' : '']" aria-hidden="true"></span>
        </div>
      </aside>
    </section>

    <CalcHarborWorkbench :locale="locale" />

    <section class="controls" aria-label="Calculator controls">
      <div class="field">
        <label for="calculator-search">{{ copy.searchLabel }}</label>
        <input id="calculator-search" v-model="searchQuery" type="search" :placeholder="copy.searchPlaceholder">
      </div>
      <div class="field">
        <label for="calculator-category">{{ copy.categoryLabel }}</label>
        <select id="calculator-category" v-model="selectedCategory">
          <option value="all">{{ copy.allCategories }}</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ getCategoryLabel(category, locale) }}
          </option>
        </select>
      </div>
    </section>

    <section class="category-tabs" aria-label="Calculator categories">
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

    <section class="tool-grid" aria-label="CalcHarbor calculators">
      <article v-for="calculator in filteredCalculators" :key="calculator.slug" class="tool-card">
        <div>
          <div class="tool-card__topline">
            <span class="category">{{ getCategoryLabel(calculator.category, locale) }}</span>
            <span :class="getStatusBadgeClass('foundation')">{{ copy.browserSideLabel }}</span>
          </div>
          <h2>{{ getCalculatorCopy(calculator, locale).title }}</h2>
          <p>{{ getCalculatorCopy(calculator, locale).headline }}</p>
          <dl>
            <div>
              <dt>{{ copy.freeLabel }}</dt>
              <dd>{{ getCalculatorCopy(calculator, locale).freeScope }}</dd>
            </div>
            <div>
              <dt>{{ copy.upgradeLabel }}</dt>
              <dd>{{ getCalculatorCopy(calculator, locale).upgradeScope }}</dd>
            </div>
          </dl>
        </div>
        <div class="card-actions">
          <NuxtLink class="button-link" :to="localizedCalculatorPath(locale, calculator.slug)">
            {{ copy.detailCta }}
          </NuxtLink>
        </div>
      </article>
    </section>

    <section v-if="filteredCalculators.length === 0" class="band" aria-live="polite">
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
