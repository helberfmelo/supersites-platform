<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, reactive, ref } from 'vue'
import { getShellCopy } from '../../../data/copy'
import {
  createCalculatorStructuredData,
  formatMetricValue,
  getCalculatorBySlug,
  getCalculatorCopy,
  getCategoryLabel,
  type CalculationResult,
} from '../../../data/calculators'
import { localizedCalculatorPath, localizedContentPath, localizedHomePath, normalizePublicLocale, toHtmlLang } from '../../../data/locales'
import { absoluteUrl, localeAlternates } from '../../../data/routes'
import { trackCalculatorEvent } from '../../../utils/analytics'

const route = useRoute()
const locale = normalizePublicLocale(route.params.locale?.toString())
const calculator = getCalculatorBySlug(route.params.slug?.toString())

if (!locale || !calculator) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Calculator not found',
  })
}

const copy = getCalculatorCopy(calculator, locale)
const shellCopy = getShellCopy(locale)
const canonicalPath = localizedCalculatorPath(locale, calculator.slug)
const structuredData = createCalculatorStructuredData(calculator, locale, absoluteUrl(canonicalPath))
const inputs = reactive(Object.fromEntries(calculator.fields.map((field) => [field.key, field.defaultValue])) as Record<string, number>)
const hasCalculated = ref(false)
const result = ref<CalculationResult | null>(null)
const resultTitle = computed(() => result.value?.ok === false ? shellCopy.invalidResultTitle : shellCopy.resultTitle)

function calculate(): void {
  hasCalculated.value = true
  trackCalculatorEvent({
    calculatorSlug: calculator.slug,
    locale,
    routePath: canonicalPath,
  }, 'tool_started')

  result.value = calculator.calculate(inputs)

  trackCalculatorEvent({
    calculatorSlug: calculator.slug,
    locale,
    routePath: canonicalPath,
  }, result.value.ok ? 'tool_completed' : 'tool_failed')
}

function resetExample(): void {
  for (const field of calculator.fields) {
    inputs[field.key] = field.defaultValue
  }

  hasCalculated.value = false
  result.value = null
}

useHead({
  htmlAttrs: {
    lang: toHtmlLang(locale),
  },
  title: `${copy.title} | CalcHarbor`,
  meta: [
    {
      name: 'description',
      content: copy.headline,
    },
    {
      property: 'og:title',
      content: `${copy.title} | CalcHarbor`,
    },
    {
      property: 'og:description',
      content: copy.headline,
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
  link: [
    { rel: 'canonical', href: absoluteUrl(canonicalPath) },
    ...localeAlternates((targetLocale) => localizedCalculatorPath(targetLocale, calculator.slug)),
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
      :path-for-locale="(targetLocale) => localizedCalculatorPath(targetLocale, calculator.slug)"
    />

    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink :to="localizedHomePath(locale)">{{ shellCopy.breadcrumbHome }}</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ copy.shortName }}</span>
    </nav>

    <section class="hero" :aria-labelledby="`${calculator.slug}-title`">
      <div>
        <div class="detail-topline">
          <p class="eyebrow">{{ getCategoryLabel(calculator.category, locale) }}</p>
          <span class="status">Sprint 3.1</span>
        </div>
        <h1 :id="`${calculator.slug}-title`">{{ copy.title }}</h1>
        <p class="lead">{{ copy.headline }}</p>
      </div>

      <aside class="status-panel" :aria-label="shellCopy.pageStatusLabel">
        <div class="status-panel__row">
          <div>
            <strong>{{ shellCopy.liveTitle }}</strong>
            <span>{{ shellCopy.liveBody }}</span>
          </div>
          <span class="signal" aria-hidden="true"></span>
        </div>
        <div class="status-panel__row">
          <div>
            <strong>{{ shellCopy.gatedTitle }}</strong>
            <span>{{ shellCopy.gatedBody }}</span>
          </div>
          <span class="signal signal--amber" aria-hidden="true"></span>
        </div>
      </aside>
    </section>

    <section class="tool-layout">
      <div>
        <section class="input-panel" :aria-labelledby="`${calculator.slug}-input`">
          <h2 :id="`${calculator.slug}-input`">{{ shellCopy.inputTitle }}</h2>
          <p>{{ copy.description }}</p>
          <form class="calculator-form" @submit.prevent="calculate">
            <div v-for="field in calculator.fields" :key="field.key" class="field">
              <label :for="`${calculator.slug}-${field.key}`">{{ field.label[locale] }}</label>
              <div class="number-input">
                <span v-if="field.prefix" aria-hidden="true">{{ field.prefix }}</span>
                <input
                  :id="`${calculator.slug}-${field.key}`"
                  v-model.number="inputs[field.key]"
                  type="number"
                  :min="field.min"
                  :step="field.step"
                  inputmode="decimal"
                >
                <span v-if="field.suffix" aria-hidden="true">{{ field.suffix }}</span>
              </div>
              <p>{{ field.help[locale] }}</p>
            </div>

            <div class="tool-actions">
              <button :class="getButtonClass()" type="submit">{{ shellCopy.calculateLabel }}</button>
              <button :class="getButtonClass('secondary')" type="button" @click="resetExample">
                {{ shellCopy.resetLabel }}
              </button>
            </div>
          </form>
        </section>

        <section class="result-panel" aria-live="polite" :aria-labelledby="`${calculator.slug}-result`">
          <h2 :id="`${calculator.slug}-result`">{{ resultTitle }}</h2>

          <p v-if="!hasCalculated">{{ shellCopy.privacyNote }}</p>
          <p v-else-if="result && !result.ok" class="result-error">{{ result.error[locale] }}</p>

          <div v-else-if="result && result.ok" class="result-grid">
            <div v-for="metric in result.metrics" :key="metric.key">
              <strong>{{ metric.label[locale] }}</strong>
              <span>{{ formatMetricValue(metric, locale) }}</span>
            </div>
          </div>
        </section>
      </div>

      <aside class="band" :aria-labelledby="`${calculator.slug}-formula`">
        <h2 :id="`${calculator.slug}-formula`">{{ shellCopy.formulaTitle }}</h2>
        <code>{{ copy.formula }}</code>
        <p>{{ copy.example }}</p>
        <dl class="fact-list">
          <div>
            <dt>{{ shellCopy.freeCheckLabel }}</dt>
            <dd>{{ copy.freeScope }}</dd>
          </div>
          <div>
            <dt>{{ shellCopy.upgradePathLabel }}</dt>
            <dd>{{ copy.upgradeScope }}</dd>
          </div>
        </dl>
      </aside>
    </section>

    <section class="content-layout" :aria-labelledby="`${calculator.slug}-guide`">
      <div>
        <h2 :id="`${calculator.slug}-guide`">{{ shellCopy.guideTitle }}</h2>
        <article v-for="section in copy.contentSections" :key="section.heading" class="content-section">
          <h3>{{ section.heading }}</h3>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </article>
        <section class="content-section" :aria-labelledby="`${calculator.slug}-faq`">
          <h3 :id="`${calculator.slug}-faq`">{{ shellCopy.faqTitle }}</h3>
          <div class="faq-list">
            <details v-for="item in copy.faq" :key="item.question">
              <summary>{{ item.question }}</summary>
              <p>{{ item.answer }}</p>
            </details>
          </div>
        </section>
      </div>

      <aside class="band" :aria-label="copy.reviewedLabel">
        <h2>{{ copy.reviewedLabel }}</h2>
        <p>{{ shellCopy.contentQualityBody }}</p>
        <div class="inline-link-list">
          <NuxtLink :to="localizedContentPath(locale, 'methodology')">
            {{ shellCopy.methodologyLabel }}
          </NuxtLink>
          <NuxtLink :to="localizedContentPath(locale, 'editorial-policy')">
            {{ shellCopy.editorialLabel }}
          </NuxtLink>
        </div>
      </aside>
    </section>

    <LegalFooter :locale="locale" />
  </main>
</template>
