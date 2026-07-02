<script setup lang="ts">
import { getStatusBadgeClass } from '@supersites/ui'
import { computed, ref } from 'vue'
import { getHomeCopy } from '../data/copy'
import { localizedCalculatorPath, localizedHomePath, toHtmlLang, type LocaleCode } from '../data/locales'
import { absoluteUrl, localeAlternates } from '../data/routes'
import {
  calculatorCatalog,
  filterCalculators,
  getCalculatorBySlug,
  getCalculatorCopy,
  getCategoryLabel,
  type CalculatorCategory,
  type CalculatorDefinition,
  type CalculatorSlug,
} from '../data/calculators'

const props = defineProps<{
  locale: LocaleCode
  xDefault?: boolean
}>()

type HomeCategoryKey = 'finance' | 'business' | 'marketing' | 'commerce' | 'timeDate' | 'units'

const popularSlugs = ['loan-payment', 'break-even-point', 'gross-margin', 'roi'] satisfies CalculatorSlug[]
const homeCategorySlugs: Record<HomeCategoryKey, CalculatorSlug[]> = {
  finance: ['loan-payment', 'compound-interest', 'savings-goal', 'roi'],
  business: ['break-even-point', 'gross-margin', 'cash-runway', 'roi'],
  marketing: ['roi', 'break-even-point', 'gross-margin'],
  commerce: ['discount-price', 'gross-margin', 'break-even-point'],
  timeDate: ['loan-payment', 'savings-goal', 'cash-runway'],
  units: ['break-even-point', 'discount-price', 'gross-margin'],
}
const homeCategoryLabels: Record<HomeCategoryKey, Record<LocaleCode, { title: string; body: string }>> = {
  finance: {
    en: { title: 'Finance', body: 'Loans, savings, growth and ROI.' },
    'pt-br': { title: 'Financas', body: 'Emprestimos, poupanca, crescimento e ROI.' },
    es: { title: 'Finanzas', body: 'Prestamos, ahorro, crecimiento y ROI.' },
    fr: { title: 'Finance', body: 'Prets, epargne, croissance et ROI.' },
    de: { title: 'Finanzen', body: 'Kredite, Sparen, Wachstum und ROI.' },
  },
  business: {
    en: { title: 'Business', body: 'Break-even, margin and cash runway.' },
    'pt-br': { title: 'Negocios', body: 'Equilibrio, margem e runway de caixa.' },
    es: { title: 'Negocio', body: 'Equilibrio, margen y runway de caja.' },
    fr: { title: 'Business', body: 'Seuil, marge et runway cash.' },
    de: { title: 'Business', body: 'Break-even, Marge und Cash runway.' },
  },
  marketing: {
    en: { title: 'Marketing', body: 'Return, margin and volume planning.' },
    'pt-br': { title: 'Marketing', body: 'Retorno, margem e planejamento de volume.' },
    es: { title: 'Marketing', body: 'Retorno, margen y planificacion de volumen.' },
    fr: { title: 'Marketing', body: 'Retour, marge et planification de volume.' },
    de: { title: 'Marketing', body: 'Rendite, Marge und Volumenplanung.' },
  },
  commerce: {
    en: { title: 'Commerce', body: 'Discount, price, unit cost and margin.' },
    'pt-br': { title: 'Comercio', body: 'Desconto, preco, custo unitario e margem.' },
    es: { title: 'Comercio', body: 'Descuento, precio, costo unitario y margen.' },
    fr: { title: 'Commerce', body: 'Remise, prix, cout unitaire et marge.' },
    de: { title: 'Handel', body: 'Rabatt, Preis, Stueckkosten und Marge.' },
  },
  timeDate: {
    en: { title: 'Time/Date', body: 'Terms, months to goal and runway windows.' },
    'pt-br': { title: 'Tempo/Data', body: 'Prazos, meses ate a meta e janelas de runway.' },
    es: { title: 'Tiempo/Fecha', body: 'Plazos, meses a meta y ventanas de runway.' },
    fr: { title: 'Temps/Date', body: 'Durees, mois vers objectif et fenetres de runway.' },
    de: { title: 'Zeit/Datum', body: 'Laufzeiten, Monate bis Ziel und Runway-Fenster.' },
  },
  units: {
    en: { title: 'Units', body: 'Unit volume, quantity and per-unit economics.' },
    'pt-br': { title: 'Unidades', body: 'Volume unitario, quantidade e economia por unidade.' },
    es: { title: 'Unidades', body: 'Volumen unitario, cantidad y economia por unidad.' },
    fr: { title: 'Unites', body: 'Volume, quantite et economie par unite.' },
    de: { title: 'Einheiten', body: 'Stueckvolumen, Menge und Einheitswirtschaft.' },
  },
}

const copy = computed(() => getHomeCopy(props.locale))
const searchQuery = ref('')
const selectedCategory = ref<CalculatorCategory | 'all'>('all')
const filteredCalculators = computed(() => filterCalculators(searchQuery.value, selectedCategory.value, props.locale))
const popularCalculators = computed(() => popularSlugs.map((slug) => getCalculatorBySlug(slug)).filter(Boolean) as CalculatorDefinition[])
const categoryGroups = computed(() => Object.entries(homeCategorySlugs).map(([key, slugs]) => ({
  key,
  ...homeCategoryLabels[key as HomeCategoryKey][props.locale],
  calculators: slugs.map((slug) => getCalculatorBySlug(slug)).filter(Boolean) as CalculatorDefinition[],
})))
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
    </section>

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

    <section class="popular-tools" :aria-labelledby="`popular-${locale}`">
      <div class="section-head">
        <div>
          <p class="eyebrow">CalcHarbor</p>
          <h2 :id="`popular-${locale}`">{{ copy.popularTitle }}</h2>
        </div>
        <p>{{ copy.popularBody }}</p>
      </div>

      <div class="popular-grid">
        <NuxtLink
          v-for="calculator in popularCalculators"
          :key="calculator.slug"
          class="popular-card"
          :to="localizedCalculatorPath(locale, calculator.slug)"
        >
          <span>{{ getCategoryLabel(calculator.category, locale) }}</span>
          <strong>{{ getCalculatorCopy(calculator, locale).title }}</strong>
          <small>{{ getCalculatorCopy(calculator, locale).headline }}</small>
        </NuxtLink>
      </div>
    </section>

    <CalcHarborWorkbench :locale="locale" />

    <section class="category-directory" :aria-labelledby="`category-directory-${locale}`">
      <div class="section-head">
        <div>
          <p class="eyebrow">Directory</p>
          <h2 :id="`category-directory-${locale}`">{{ copy.categoryDirectoryTitle }}</h2>
        </div>
        <p>{{ copy.categoryDirectoryBody }}</p>
      </div>

      <div class="category-directory__grid">
        <article v-for="group in categoryGroups" :key="group.key" class="category-group">
          <h3>{{ group.title }}</h3>
          <p>{{ group.body }}</p>
          <div class="inline-link-list">
            <NuxtLink
              v-for="calculator in group.calculators"
              :key="calculator.slug"
              :to="localizedCalculatorPath(locale, calculator.slug)"
            >
              {{ getCalculatorCopy(calculator, locale).shortName }}
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <section class="tool-catalog" :aria-labelledby="`all-calculators-${locale}`">
      <div class="section-head">
        <div>
          <p class="eyebrow">CalcHarbor</p>
          <h2 :id="`all-calculators-${locale}`">{{ copy.allCalculatorsTitle }}</h2>
        </div>
        <p>{{ copy.allCalculatorsBody }}</p>
      </div>

      <div class="tool-grid" aria-label="CalcHarbor calculators">
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
      </div>
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

    <section class="category-directory category-directory--footer" :aria-labelledby="`footer-categories-${locale}`">
      <h2 :id="`footer-categories-${locale}`">{{ copy.footerCategoryTitle }}</h2>
      <div class="category-directory__grid">
        <article v-for="group in categoryGroups" :key="`footer-${group.key}`" class="category-group">
          <h3>{{ group.title }}</h3>
          <div class="inline-link-list">
            <NuxtLink
              v-for="calculator in group.calculators"
              :key="`footer-${group.key}-${calculator.slug}`"
              :to="localizedCalculatorPath(locale, calculator.slug)"
            >
              {{ getCalculatorCopy(calculator, locale).shortName }}
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <MonetizationSafeBlock
      :locale="locale"
      site-slug="calcharbor"
      slot-id="calcharbor-home-footer-leaderboard"
    />

    <LegalFooter :locale="locale" />
  </main>
</template>
