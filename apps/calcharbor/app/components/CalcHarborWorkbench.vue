<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, reactive, ref, watch } from 'vue'
import { getWorkbenchCopy } from '../data/copy'
import {
  buildCalculatorScenarioRows,
  calculatorCatalog,
  formatMetricValue,
  getCalculatorCopy,
  getFieldDefaultValue,
  getFieldPrefix,
  type CalculatorField,
  type CalculatorSlug,
  type CalculationResult,
  type CalculatorScenarioRow,
} from '../data/calculators'
import { localizedHomePath, type LocaleCode } from '../data/locales'
import { trackCalculatorEvent } from '../utils/analytics'

const props = defineProps<{
  locale: LocaleCode
}>()

const copy = computed(() => getWorkbenchCopy(props.locale))
const activeSlug = ref<CalculatorSlug>(calculatorCatalog[0].slug)
type CalculatorInputValue = number | ''
const inputs = reactive<Record<string, CalculatorInputValue>>({})
const hasCompared = ref(false)
const activeCalculator = computed(() => calculatorCatalog.find((calculator) => calculator.slug === activeSlug.value) ?? calculatorCatalog[0])
const activeCopy = computed(() => getCalculatorCopy(activeCalculator.value, props.locale))
const numericInputs = computed<Record<string, number>>(() => Object.fromEntries(
  activeCalculator.value.fields.map((field) => [field.key, Number(inputs[field.key]) || 0]),
))
const liveResult = computed<CalculationResult>(() => activeCalculator.value.calculate(numericInputs.value))
const primaryMetric = computed(() => liveResult.value.ok ? liveResult.value.metrics[0] : null)
const secondaryMetrics = computed(() => liveResult.value.ok ? liveResult.value.metrics.slice(1) : [])
const scenarioRows = computed(() => buildCalculatorScenarioRows(activeCalculator.value, numericInputs.value, props.locale))
const maxScenarioValue = computed(() => Math.max(...scenarioRows.value.map((row) => Math.abs(row.numericValue ?? 0)), 1))

function resetInputs(): void {
  for (const key of Object.keys(inputs)) {
    delete inputs[key]
  }

  for (const field of activeCalculator.value.fields) {
    inputs[field.key] = ''
  }

  hasCompared.value = false
}

function fieldPlaceholder(field: CalculatorField): string {
  return String(getFieldDefaultValue(field, props.locale))
}

function scenarioWidth(row: CalculatorScenarioRow): string {
  if (!row.ok || row.numericValue === null) {
    return '0%'
  }

  return `${Math.max(8, Math.round((Math.abs(row.numericValue) / maxScenarioValue.value) * 100))}%`
}

function compareScenario(): void {
  hasCompared.value = true

  trackCalculatorEvent({
    calculatorSlug: activeCalculator.value.slug,
    locale: props.locale,
    routePath: localizedHomePath(props.locale),
  }, 'tool_started')

  trackCalculatorEvent({
    calculatorSlug: activeCalculator.value.slug,
    locale: props.locale,
    routePath: localizedHomePath(props.locale),
  }, liveResult.value.ok ? 'tool_completed' : 'tool_failed')
}

watch(activeSlug, resetInputs, { immediate: true })
</script>

<template>
  <section class="calculator-workbench" aria-labelledby="workbench-title">
    <div class="workbench-heading">
      <div>
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h2 id="workbench-title">{{ copy.title }}</h2>
        <p>{{ copy.body }}</p>
      </div>
      <p class="privacy-strip">{{ copy.privacyNote }}</p>
    </div>

    <div class="workbench-tabs" role="tablist" :aria-label="copy.tabLabel">
      <button
        v-for="calculator in calculatorCatalog"
        :key="calculator.slug"
        type="button"
        role="tab"
        :aria-selected="activeSlug === calculator.slug"
        @click="activeSlug = calculator.slug"
      >
        {{ getCalculatorCopy(calculator, locale).shortName }}
      </button>
    </div>

    <div class="workbench-body">
      <form class="workbench-inputs" @submit.prevent="compareScenario">
        <div>
          <h3>{{ copy.inputsTitle }}</h3>
          <p>{{ activeCopy.description }}</p>
        </div>

        <div v-for="field in activeCalculator.fields" :key="field.key" class="field">
          <label :for="`workbench-${field.key}`">{{ field.label[locale] }}</label>
          <div class="number-input">
            <span v-if="getFieldPrefix(field, locale)" aria-hidden="true">{{ getFieldPrefix(field, locale) }}</span>
            <input
              :id="`workbench-${field.key}`"
              v-model.number="inputs[field.key]"
              type="number"
              :min="field.min"
              :step="field.step"
              inputmode="decimal"
              :placeholder="fieldPlaceholder(field)"
            >
            <span v-if="field.suffix" aria-hidden="true">{{ field.suffix }}</span>
          </div>
          <p>{{ field.help[locale] }}</p>
        </div>

        <div class="tool-actions">
          <button :class="getButtonClass()" type="submit">{{ copy.compareLabel }}</button>
        </div>

        <p class="planning-note">{{ copy.disclaimer }}</p>
      </form>

      <aside class="workbench-results" aria-live="polite">
        <div>
          <p class="result-kicker">{{ activeCopy.shortName }}</p>
          <h3>{{ copy.resultTitle }}</h3>
        </div>

        <p v-if="!hasCompared" class="privacy-strip">{{ copy.privacyNote }}</p>
        <p v-else-if="!liveResult.ok" class="result-error">{{ liveResult.error[locale] }}</p>

        <div v-else-if="hasCompared && primaryMetric" class="primary-result">
          <span>{{ primaryMetric.label[locale] }}</span>
          <strong>{{ formatMetricValue(primaryMetric, locale) }}</strong>
          <p>{{ activeCopy.interpretation }}</p>
        </div>

        <div v-if="hasCompared && secondaryMetrics.length > 0" class="metric-strip" :aria-label="copy.secondaryTitle">
          <div v-for="metric in secondaryMetrics" :key="metric.key">
            <span>{{ metric.label[locale] }}</span>
            <strong>{{ formatMetricValue(metric, locale) }}</strong>
          </div>
        </div>

        <section v-if="hasCompared" class="scenario-snapshot" :aria-labelledby="`workbench-${activeCalculator.slug}-scenario`">
          <div class="scenario-snapshot__head">
            <div>
              <h3 :id="`workbench-${activeCalculator.slug}-scenario`">{{ copy.scenarioTitle }}</h3>
              <p>{{ copy.scenarioBody }}</p>
            </div>
          </div>

          <div class="scenario-bars" :aria-label="copy.chartLabel">
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
                <th scope="col">{{ copy.scenarioColumnLabel }}</th>
                <th scope="col">{{ copy.assumptionColumnLabel }}</th>
                <th scope="col">{{ copy.resultColumnLabel }}</th>
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
      </aside>
    </div>
  </section>
</template>
