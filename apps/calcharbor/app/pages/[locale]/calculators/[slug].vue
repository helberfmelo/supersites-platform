<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, reactive, ref } from 'vue'
import { getShellCopy } from '../../../data/copy'
import {
  buildCalculatorScenarioRows,
  buildCalculationMemory,
  getCalculatorInterpretationState,
  createCalculatorStructuredData,
  formatMetricValue,
  getCalculatorBySlug,
  getCalculatorCopy,
  getCategoryLabel,
  getFieldDefaultValue,
  getFieldPrefix,
  getRelatedCalculators,
  type CalculatorSlug,
  type CalculatorScenarioRow,
  type CalculationMetric,
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
const inputs = reactive(Object.fromEntries(calculator.fields.map((field) => [field.key, getFieldDefaultValue(field, locale)])) as Record<string, number>)
const hasCalculated = ref(false)
const actionMessage = ref('')
const scenarioSection = ref<HTMLElement | null>(null)
const liveResult = computed<CalculationResult>(() => calculator.calculate(inputs))
const resultTitle = computed(() => liveResult.value.ok === false ? shellCopy.invalidResultTitle : shellCopy.resultTitle)
const primaryMetricKeyBySlug: Partial<Record<CalculatorSlug, string>> = {
  'gross-margin': 'gross_margin',
  roi: 'roi',
}
const primaryMetric = computed(() => {
  if (!liveResult.value.ok) {
    return null
  }

  const preferredKey = primaryMetricKeyBySlug[calculator.slug]

  return liveResult.value.metrics.find((metric) => metric.key === preferredKey) ?? liveResult.value.metrics[0]
})
const secondaryMetrics = computed(() => {
  if (!liveResult.value.ok) {
    return []
  }

  return liveResult.value.metrics.filter((metric) => metric.key !== primaryMetric.value?.key)
})
const calculationMemory = computed(() => buildCalculationMemory(calculator, inputs, liveResult.value, locale))
const interpretationState = computed(() => getCalculatorInterpretationState(calculator.slug, liveResult.value, locale))
const relatedCalculators = computed(() => getRelatedCalculators(calculator))
const scenarioRows = computed(() => buildCalculatorScenarioRows(calculator, inputs, locale))
const maxScenarioValue = computed(() => Math.max(...scenarioRows.value.map((row) => Math.abs(row.numericValue ?? 0)), 1))
const metricByKey = computed<Map<string, CalculationMetric>>(() => {
  if (!liveResult.value.ok) {
    return new Map<string, CalculationMetric>()
  }

  return new Map(liveResult.value.metrics.map((metric) => [metric.key, metric]))
})
const resultSummaryLines = computed(() => [
  copy.title,
  copy.headline,
  '',
  ...calculator.fields.map((field) => `${field.label[locale]}: ${inputs[field.key]}`),
  '',
  ...(liveResult.value.ok
    ? liveResult.value.metrics.map((metric) => `${metric.label[locale]}: ${formatMetricValue(metric, locale)}`)
    : [liveResult.value.error[locale]]),
  '',
  `${shellCopy.formulaTitle}: ${copy.formula}`,
  shellCopy.planningNote,
])
const loanBreakdown = computed(() => {
  if (calculator.slug !== 'loan-payment' || !liveResult.value.ok) {
    return null
  }

  const principal = Math.max(Number(inputs.principal) || 0, 0)
  const interest = Math.max(metricByKey.value.get('total_interest')?.value ?? 0, 0)
  const total = Math.max(principal + interest, 1)

  return {
    principal,
    interest,
    principalShare: `${Math.max(4, Math.round((principal / total) * 100))}%`,
    interestShare: `${Math.max(4, Math.round((interest / total) * 100))}%`,
  }
})
const breakEvenChart = computed(() => {
  if (calculator.slug !== 'break-even-point' || !liveResult.value.ok) {
    return null
  }

  const breakEvenUnits = metricByKey.value.get('break_even_units')?.value ?? 0
  const fixedCosts = Number(inputs.fixedCosts) || 0
  const pricePerUnit = Number(inputs.pricePerUnit) || 0
  const variableCostPerUnit = Number(inputs.variableCostPerUnit) || 0
  const maxVolume = Math.max(breakEvenUnits * 1.5, 1)
  const rows = [
    { label: '0%', units: 0 },
    { label: '50%', units: breakEvenUnits * 0.5 },
    { label: '100%', units: breakEvenUnits },
    { label: '150%', units: breakEvenUnits * 1.5 },
  ].map((row) => {
    const profit = (row.units * pricePerUnit) - fixedCosts - (row.units * variableCostPerUnit)

    return {
      ...row,
      profit,
      formattedUnits: formatMetricValue({
        key: 'volume',
        label: { en: shellCopy.volumeLabel, 'pt-br': shellCopy.volumeLabel, es: shellCopy.volumeLabel, fr: shellCopy.volumeLabel, de: shellCopy.volumeLabel },
        value: row.units,
        format: 'number',
      }, locale),
      formattedProfit: formatMetricValue({
        key: 'profit',
        label: { en: shellCopy.profitLossTitle, 'pt-br': shellCopy.profitLossTitle, es: shellCopy.profitLossTitle, fr: shellCopy.profitLossTitle, de: shellCopy.profitLossTitle },
        value: profit,
        format: 'currency',
      }, locale),
    }
  })
  const maxAbsProfit = Math.max(...rows.map((row) => Math.abs(row.profit)), 1)
  const points = rows.map((row) => {
    const x = Math.min(100, Math.max(0, (row.units / maxVolume) * 100))
    const y = Math.min(96, Math.max(4, 50 - ((row.profit / maxAbsProfit) * 42)))

    return `${x.toFixed(2)},${y.toFixed(2)}`
  }).join(' ')

  return {
    rows,
    points,
    areaPoints: `0,50 ${points} 100,50`,
  }
})
const marginComparisonRows = computed(() => {
  if (calculator.slug !== 'gross-margin' || !liveResult.value.ok) {
    return []
  }

  const marginMetric = metricByKey.value.get('gross_margin')
  const markupMetric = metricByKey.value.get('markup')
  const maxValue = Math.max(marginMetric?.value ?? 0, markupMetric?.value ?? 0, 0.01)

  return [marginMetric, markupMetric].filter(Boolean).map((metric) => ({
    key: metric!.key,
    label: metric!.label[locale],
    value: formatMetricValue(metric!, locale),
    width: `${Math.max(8, Math.round((metric!.value / maxValue) * 100))}%`,
  }))
})
const marginCostRows = computed(() => {
  if (calculator.slug !== 'gross-margin') {
    return []
  }

  const scenarios = [
    { label: shellCopy.reducedCostLabel, multiplier: 0.9 },
    { label: shellCopy.currentCostLabel, multiplier: 1 },
    { label: shellCopy.increasedCostLabel, multiplier: 1.1 },
  ]

  return scenarios.map((scenario) => {
    const result = calculator.calculate({
      ...inputs,
      cost: Number((Number(inputs.cost) * scenario.multiplier).toFixed(2)),
    })
    const marginMetric = result.ok ? result.metrics.find((metric) => metric.key === 'gross_margin') : null
    const profitMetric = result.ok ? result.metrics.find((metric) => metric.key === 'gross_profit') : null

    return {
      label: scenario.label,
      margin: marginMetric ? formatMetricValue(marginMetric, locale) : shellCopy.invalidResultTitle,
      profit: profitMetric ? formatMetricValue(profitMetric, locale) : shellCopy.invalidResultTitle,
    }
  })
})
const roiScenarioRows = computed(() => {
  if (calculator.slug !== 'roi') {
    return []
  }

  const scenarios = [
    { label: shellCopy.conservativeLabel, multiplier: 0.9 },
    { label: shellCopy.baseLabel, multiplier: 1 },
    { label: shellCopy.aggressiveLabel, multiplier: 1.1 },
  ]

  return scenarios.map((scenario) => {
    const result = calculator.calculate({
      ...inputs,
      returnValue: Number((Number(inputs.returnValue) * scenario.multiplier).toFixed(2)),
    })
    const roiMetric = result.ok ? result.metrics.find((metric) => metric.key === 'roi') : null
    const netReturnMetric = result.ok ? result.metrics.find((metric) => metric.key === 'net_return') : null

    return {
      label: scenario.label,
      roi: roiMetric ? formatMetricValue(roiMetric, locale) : shellCopy.invalidResultTitle,
      netReturn: netReturnMetric ? formatMetricValue(netReturnMetric, locale) : shellCopy.invalidResultTitle,
    }
  })
})

function scenarioWidth(row: CalculatorScenarioRow): string {
  if (!row.ok || row.numericValue === null) {
    return '0%'
  }

  return `${Math.max(8, Math.round((Math.abs(row.numericValue) / maxScenarioValue.value) * 100))}%`
}

function formatDisplayValue(value: number, format: CalculationMetric['format']): string {
  return formatMetricValue({
    key: 'display',
    label: { en: 'Value', 'pt-br': 'Valor', es: 'Valor', fr: 'Valeur', de: 'Wert' },
    value,
    format,
  }, locale)
}

function getMetricLabel(key: string): string {
  return metricByKey.value.get(key)?.label[locale] ?? '-'
}

function formatMetricByKey(key: string): string {
  const metric = metricByKey.value.get(key)

  return metric ? formatMetricValue(metric, locale) : '-'
}

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
    inputs[field.key] = getFieldDefaultValue(field, locale)
  }

  hasCalculated.value = false
  actionMessage.value = ''
}

async function copyResult(): Promise<void> {
  hasCalculated.value = true
  const summary = resultSummaryLines.value.join('\n')

  if (navigator.clipboard) {
    await navigator.clipboard.writeText(summary)
  }

  actionMessage.value = shellCopy.copiedLabel
}

function downloadSummary(): void {
  hasCalculated.value = true
  const blob = new Blob([resultSummaryLines.value.join('\n')], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = `calcharbor-${calculator.slug}-summary.txt`
  link.click()
  URL.revokeObjectURL(url)
}

function focusScenarioComparison(): void {
  hasCalculated.value = true
  scenarioSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
          <span class="status">{{ shellCopy.browserSideLabel }}</span>
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
                <span v-if="getFieldPrefix(field, locale)" aria-hidden="true">{{ getFieldPrefix(field, locale) }}</span>
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

          <section v-if="liveResult.ok" class="result-actions" :aria-labelledby="`${calculator.slug}-actions`">
            <strong :id="`${calculator.slug}-actions`">{{ shellCopy.summaryActionsTitle }}</strong>
            <div class="tool-actions">
              <button class="button-link button-link--secondary" type="button" @click="copyResult">
                {{ shellCopy.copyResultLabel }}
              </button>
              <button class="button-link button-link--secondary" type="button" @click="downloadSummary">
                {{ shellCopy.downloadSummaryLabel }}
              </button>
              <button class="button-link" type="button" @click="focusScenarioComparison">
                {{ shellCopy.compareScenariosLabel }}
              </button>
            </div>
            <p v-if="actionMessage" class="action-feedback" aria-live="polite">{{ actionMessage }}</p>
          </section>

          <section v-if="loanBreakdown" class="tool-insight" :aria-labelledby="`${calculator.slug}-loan-breakdown`">
            <h3 :id="`${calculator.slug}-loan-breakdown`">{{ shellCopy.loanBreakdownTitle }}</h3>
            <div class="breakdown-bars" aria-hidden="true">
              <div class="breakdown-bar">
                <span>{{ shellCopy.principalLabel }}</span>
                <div class="bar-track bar-track--principal">
                  <span :style="{ width: loanBreakdown.principalShare }"></span>
                </div>
                <strong>{{ formatDisplayValue(loanBreakdown.principal, 'currency') }}</strong>
              </div>
              <div class="breakdown-bar">
                <span>{{ shellCopy.interestLabel }}</span>
                <div class="bar-track bar-track--interest">
                  <span :style="{ width: loanBreakdown.interestShare }"></span>
                </div>
                <strong>{{ formatDisplayValue(loanBreakdown.interest, 'currency') }}</strong>
              </div>
            </div>

            <table class="summary-table">
              <caption>{{ shellCopy.loanAmortizationTitle }}</caption>
              <tbody>
                <tr>
                  <th scope="row">{{ shellCopy.principalLabel }}</th>
                  <td>{{ formatDisplayValue(loanBreakdown.principal, 'currency') }}</td>
                </tr>
                <tr v-for="metricKey in ['total_interest', 'total_paid']" :key="metricKey">
                  <th scope="row">{{ getMetricLabel(metricKey) }}</th>
                  <td>{{ formatMetricByKey(metricKey) }}</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section v-if="breakEvenChart" class="tool-insight" :aria-labelledby="`${calculator.slug}-profit-chart`">
            <h3 :id="`${calculator.slug}-profit-chart`">{{ shellCopy.breakEvenChartTitle }}</h3>
            <div class="profit-area">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" :aria-label="shellCopy.breakEvenChartTitle">
                <polygon :points="breakEvenChart.areaPoints" class="profit-area__fill"></polygon>
                <line x1="0" y1="50" x2="100" y2="50" class="profit-area__axis"></line>
                <polyline :points="breakEvenChart.points" class="profit-area__line"></polyline>
              </svg>
            </div>
            <table class="summary-table">
              <thead>
                <tr>
                  <th scope="col">{{ shellCopy.volumeLabel }}</th>
                  <th scope="col">{{ shellCopy.profitLossTitle }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in breakEvenChart.rows" :key="row.label">
                  <th scope="row">{{ row.formattedUnits }}</th>
                  <td>{{ row.formattedProfit }}</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section v-if="marginComparisonRows.length > 0" class="tool-insight" :aria-labelledby="`${calculator.slug}-margin-compare`">
            <h3 :id="`${calculator.slug}-margin-compare`">{{ shellCopy.marginComparisonTitle }}</h3>
            <div class="margin-bars">
              <div v-for="row in marginComparisonRows" :key="row.key" class="breakdown-bar">
                <span>{{ row.label }}</span>
                <div class="bar-track">
                  <span :style="{ width: row.width }"></span>
                </div>
                <strong>{{ row.value }}</strong>
              </div>
            </div>

            <table class="summary-table">
              <caption>{{ shellCopy.costScenarioTitle }}</caption>
              <thead>
                <tr>
                  <th scope="col">{{ shellCopy.assumptionColumnLabel }}</th>
                  <th scope="col">{{ getMetricLabel('gross_margin') }}</th>
                  <th scope="col">{{ getMetricLabel('gross_profit') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in marginCostRows" :key="row.label">
                  <th scope="row">{{ row.label }}</th>
                  <td>{{ row.margin }}</td>
                  <td>{{ row.profit }}</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section v-if="calculator.slug === 'roi'" class="tool-insight" :aria-labelledby="`${calculator.slug}-period-note`">
            <h3 :id="`${calculator.slug}-period-note`">{{ shellCopy.roiPeriodNoteTitle }}</h3>
            <p>{{ shellCopy.roiPeriodNoteBody }}</p>

            <table class="summary-table">
              <caption>{{ shellCopy.roiScenarioTitle }}</caption>
              <thead>
                <tr>
                  <th scope="col">{{ shellCopy.scenarioColumnLabel }}</th>
                  <th scope="col">{{ getMetricLabel('roi') }}</th>
                  <th scope="col">{{ getMetricLabel('net_return') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in roiScenarioRows" :key="row.label">
                  <th scope="row">{{ row.label }}</th>
                  <td>{{ row.roi }}</td>
                  <td>{{ row.netReturn }}</td>
                </tr>
              </tbody>
            </table>
          </section>

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

          <section ref="scenarioSection" class="scenario-snapshot" :aria-labelledby="`${calculator.slug}-scenario`">
            <div class="scenario-snapshot__head">
              <div>
                <h3 :id="`${calculator.slug}-scenario`">{{ shellCopy.scenarioTitle }}</h3>
                <p>{{ shellCopy.scenarioBody }}</p>
              </div>
            </div>

            <div class="scenario-bars" :aria-label="shellCopy.scenarioChartLabel">
              <div v-for="row in scenarioRows" :key="row.variant" class="scenario-bar-row">
                <span>{{ row.label }}</span>
                <div class="scenario-track">
                  <span :style="{ width: scenarioWidth(row) }"></span>
                </div>
                <strong>{{ row.resultValue }}</strong>
              </div>
            </div>

            <table class="scenario-table">
              <thead>
                <tr>
                  <th scope="col">{{ shellCopy.scenarioColumnLabel }}</th>
                  <th scope="col">{{ shellCopy.assumptionColumnLabel }}</th>
                  <th scope="col">{{ shellCopy.resultColumnLabel }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in scenarioRows" :key="`${row.variant}-table`">
                  <th scope="row">{{ row.label }}</th>
                  <td>{{ row.assumption }}</td>
                  <td>{{ row.resultValue }}</td>
                </tr>
              </tbody>
            </table>
          </section>
        </section>
      </div>

      <aside class="band" :aria-labelledby="`${calculator.slug}-formula`">
        <h2 :id="`${calculator.slug}-formula`">{{ shellCopy.formulaTitle }}</h2>
        <div class="formula-aside__intro">
          <h3>{{ shellCopy.formulaIntroTitle }}</h3>
          <p>{{ shellCopy.formulaIntroBody }}</p>
          <p>{{ copy.interpretation }}</p>
        </div>
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
