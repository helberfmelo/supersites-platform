<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, reactive, ref } from 'vue'
import { getShellCopy } from '../../../data/copy'
import {
  buildCalculationMemory,
  getCalculatorInterpretationState,
  createCalculatorStructuredData,
  formatMetricValue,
  getCalculatorBySlug,
  getCalculatorCopy,
  getCategoryLabel,
  getRelatedCalculators,
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
const liveResult = computed<CalculationResult>(() => calculator.calculate(inputs))
const resultTitle = computed(() => liveResult.value.ok === false ? shellCopy.invalidResultTitle : shellCopy.resultTitle)
const primaryMetric = computed(() => liveResult.value.ok ? liveResult.value.metrics[0] : null)
const secondaryMetrics = computed(() => liveResult.value.ok ? liveResult.value.metrics.slice(1) : [])
const calculationMemory = computed(() => buildCalculationMemory(calculator, inputs, liveResult.value, locale))
const interpretationState = computed(() => getCalculatorInterpretationState(calculator.slug, liveResult.value, locale))
const relatedCalculators = computed(() => getRelatedCalculators(calculator))

function calculate(): void {
  hasCalculated.value = true
  trackCalculatorEvent({
    calculatorSlug: calculator.slug,
    locale,
    routePath: canonicalPath,
  }, 'tool_started')

  trackCalculatorEvent({
    calculatorSlug: calculator.slug,
    locale,
    routePath: canonicalPath,
  }, liveResult.value.ok ? 'tool_completed' : 'tool_failed')
}

function resetExample(): void {
  for (const field of calculator.fields) {
    inputs[field.key] = field.defaultValue
  }

  hasCalculated.value = false
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
          <span class="status">Local result</span>
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

        <section class="result-panel result-panel--live" aria-live="polite" :aria-labelledby="`${calculator.slug}-result`">
          <p class="result-kicker">{{ shellCopy.answerTitle }}</p>
          <h2 :id="`${calculator.slug}-result`">{{ resultTitle }}</h2>

          <p v-if="!hasCalculated" class="privacy-strip">{{ shellCopy.privacyNote }}</p>
          <p v-if="!liveResult.ok" class="result-error">{{ liveResult.error[locale] }}</p>

          <div v-else>
            <div v-if="primaryMetric" class="primary-result">
              <span>{{ primaryMetric.label[locale] }}</span>
              <strong>{{ formatMetricValue(primaryMetric, locale) }}</strong>
              <p>{{ copy.interpretation }}</p>
            </div>

            <div class="result-grid">
              <div v-for="metric in secondaryMetrics" :key="metric.key">
                <strong>{{ metric.label[locale] }}</strong>
                <span>{{ formatMetricValue(metric, locale) }}</span>
              </div>
            </div>
          </div>

          <div class="interpretation-card" :class="`interpretation-card--${interpretationState.tone}`">
            <span>{{ shellCopy.interpretationTitle }}</span>
            <strong>{{ interpretationState.label }}</strong>
            <p>{{ interpretationState.body }}</p>
          </div>

          <div class="calculation-memory">
            <h3>{{ shellCopy.calculationMemoryTitle }}</h3>
            <dl>
              <div v-for="line in calculationMemory" :key="`${line.label}-${line.value}`">
                <dt>{{ line.label }}</dt>
                <dd>{{ line.value }}</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>

      <aside class="band" :aria-labelledby="`${calculator.slug}-formula`">
        <h2 :id="`${calculator.slug}-formula`">{{ shellCopy.formulaTitle }}</h2>
        <code>{{ copy.formula }}</code>
        <p>{{ copy.example }}</p>
        <p class="planning-note">{{ shellCopy.planningNote }}</p>
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

        <section class="upgrade-panel" :aria-labelledby="`${calculator.slug}-upgrade`">
          <h3 :id="`${calculator.slug}-upgrade`">{{ shellCopy.workflowUpgradeTitle }}</h3>
          <p>{{ shellCopy.workflowUpgradeBody }}</p>
          <ul>
            <li v-for="item in shellCopy.workflowUpgradeItems" :key="item">{{ item }}</li>
          </ul>
        </section>
      </aside>
    </section>

    <section class="related-calculators" :aria-labelledby="`${calculator.slug}-related`">
      <div>
        <p class="eyebrow">{{ getCategoryLabel(calculator.category, locale) }}</p>
        <h2 :id="`${calculator.slug}-related`">{{ shellCopy.relatedTitle }}</h2>
      </div>

      <div class="related-calculator-list">
        <NuxtLink
          v-for="related in relatedCalculators"
          :key="related.slug"
          :to="localizedCalculatorPath(locale, related.slug)"
        >
          <strong>{{ getCalculatorCopy(related, locale).shortName }}</strong>
          <span>{{ getCalculatorCopy(related, locale).headline }}</span>
        </NuxtLink>
      </div>
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
