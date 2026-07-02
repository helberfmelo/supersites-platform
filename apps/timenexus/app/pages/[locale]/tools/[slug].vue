<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { getShellCopy } from '../../../data/copy'
import {
  createTimeToolAnswerSummary,
  createTimeToolStructuredData,
  createTimeToolTimeline,
  getCategoryLabel,
  getRelatedTimeTools,
  getTimeToolBySlug,
  getTimeToolCopy,
  plannerSourceZones,
  type TimeToolResult,
} from '../../../data/tools'
import { localizedContentPath, localizedHomePath, localizedToolPath, normalizePublicLocale, toHtmlLang } from '../../../data/locales'
import { absoluteUrl, localeAlternates } from '../../../data/routes'
import { trackTimeNexusEvent } from '../../../utils/analytics'
import { runTimeToolInWorker } from '../../../utils/timeWorker'

const route = useRoute()
const locale = normalizePublicLocale(route.params.locale?.toString())
const tool = getTimeToolBySlug(route.params.slug?.toString())

if (!locale || !tool) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Tool not found',
  })
}

const copy = getTimeToolCopy(tool, locale)
const shellCopy = getShellCopy(locale)
const canonicalPath = localizedToolPath(locale, tool.slug)
const structuredData = createTimeToolStructuredData(tool, locale, absoluteUrl(canonicalPath))
const selectedMode = ref(tool.modes[0]?.value ?? '')
const primaryInput = ref(tool.samplePrimary)
const secondaryInput = ref(tool.sampleSecondary)
const sourceZoneInput = ref('America/New_York')
const targetZoneInput = ref('Europe/London')
const hasRun = ref(false)
const isRunning = ref(false)
const result = ref<TimeToolResult | null>(null)
const copyState = ref('')
const autoRunStarted = ref(false)
const currentDatetimePlaceholder = ref('')
let autoRunTimer: ReturnType<typeof setTimeout> | null = null
const resultTitle = computed(() => result.value?.ok === false ? shellCopy.invalidResultTitle : copy.resultLabel)
const answerSummary = computed(() => createTimeToolAnswerSummary(tool.slug, result.value))
const timelineItems = computed(() => createTimeToolTimeline(tool.slug, result.value))
const relatedTools = computed(() => getRelatedTimeTools(tool))
const isTimezoneTool = computed(() => tool.slug === 'timezone-converter')
const isTimestampTool = computed(() => tool.slug === 'timestamp-converter')
const isDateDifferenceTool = computed(() => tool.slug === 'date-difference')
const isBusinessDaysTool = computed(() => tool.slug === 'business-days')
const isAgeTool = computed(() => tool.slug === 'age-calculator')
const isPercentageTool = computed(() => tool.slug === 'percentage-calculator')
const isUnitTool = computed(() => tool.slug === 'unit-converter')
const shouldAutoRun = computed(() => isTimestampTool.value || isPercentageTool.value || isUnitTool.value)
const unitModeGroups = computed(() => [
  { label: 'Length', modes: tool.modes.filter((mode) => ['km-mi', 'mi-km'].includes(mode.value)) },
  { label: 'Weight', modes: tool.modes.filter((mode) => ['kg-lb', 'lb-kg'].includes(mode.value)) },
  { label: 'Temperature', modes: tool.modes.filter((mode) => ['c-f', 'f-c'].includes(mode.value)) },
].filter((group) => group.modes.length > 0))
const answerStateTitle = computed(() => {
  if (isRunning.value) {
    return shellCopy.answerRunningTitle
  }

  if (result.value?.ok === false) {
    return shellCopy.invalidResultTitle
  }

  if (answerSummary.value) {
    return shellCopy.answerReadyLabel
  }

  return shellCopy.answerEmptyTitle
})

const resultRows = computed(() => {
  if (!result.value?.ok) {
    return []
  }

  return result.value.output
    .split('\n')
    .map((line) => {
      const divider = line.indexOf(':')

      if (divider === -1) {
        return null
      }

      return {
        label: line.slice(0, divider).trim(),
        value: line.slice(divider + 1).trim(),
      }
    })
    .filter((row): row is { label: string; value: string } => Boolean(row && row.label && row.value))
})

const keyResultRows = computed(() => {
  if (isTimezoneTool.value) {
    return resultRows.value.filter((row) => ['UTC', sourceZoneInput.value, targetZoneInput.value].includes(row.label))
  }

  if (isTimestampTool.value) {
    return resultRows.value.filter((row) => ['Unix seconds', 'Unix milliseconds', 'ISO', 'UTC', 'Local'].includes(row.label) || row.label === secondaryInput.value)
  }

  if (isDateDifferenceTool.value) {
    return resultRows.value.filter((row) => ['Calendar days', 'Weeks', 'Approx months'].includes(row.label))
  }

  if (isBusinessDaysTool.value) {
    return resultRows.value.filter((row) => ['Business days', 'Weekend days', 'Endpoints'].includes(row.label))
  }

  if (isAgeTool.value) {
    return resultRows.value.filter((row) => ['Age', 'Total days', 'Next birthday', 'Days until next birthday'].includes(row.label))
  }

  if (isPercentageTool.value) {
    return resultRows.value.filter((row) => ['Result', 'Percent change', 'Added amount'].includes(row.label) || row.label.includes('% of'))
  }

  if (isUnitTool.value) {
    return resultRows.value.filter((row) => ['Conversion', 'Result', 'Reverse'].includes(row.label))
  }

  return resultRows.value.slice(0, 4)
})

const formulaLine = computed(() => resultRows.value.find((row) => row.label === 'Formula')?.value ?? '')
const samplePrimaryDisplay = computed(() => {
  if (isTimezoneTool.value) {
    return currentDatetimePlaceholder.value || tool.samplePrimary
  }

  if (isTimestampTool.value) {
    return tool.samplePrimary
  }

  return tool.samplePrimary
})
const calendarRows = computed(() => resultRows.value.filter((row) => [
  'Start',
  'End',
  'Counting mode',
  'Calendar days',
  'Business days',
  'Weekend days',
  'Calendar days included',
].includes(row.label)))

function syncTimezoneSecondary(): void {
  if (isTimezoneTool.value) {
    secondaryInput.value = `${sourceZoneInput.value} -> ${targetZoneInput.value}`
  }
}

function formatDatetimeInput(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day}T${hour}:${minute}`
}

function setCurrentTimezoneExample(): void {
  currentDatetimePlaceholder.value = formatDatetimeInput(new Date())

  if (isTimezoneTool.value) {
    primaryInput.value = currentDatetimePlaceholder.value
  }
}

function buildPageUrl(): string {
  if (typeof window === 'undefined') {
    return absoluteUrl(canonicalPath)
  }

  return `${window.location.origin}${canonicalPath}`
}

async function copyText(value: string, label = 'Copied'): Promise<void> {
  if (!value) {
    return
  }

  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(value)
      copyState.value = label
      return
    }
  } catch {
    // The UI still exposes the value if clipboard permissions are unavailable.
  }

  copyState.value = 'Copy unavailable'
}

async function copyResult(): Promise<void> {
  await copyText(result.value?.ok ? result.value.output : '', 'Result copied')
}

async function copyPageLink(): Promise<void> {
  await copyText(buildPageUrl(), 'Link copied')
}

async function runTool(options: { track: boolean } = { track: true }): Promise<void> {
  if (options.track && autoRunTimer) {
    clearTimeout(autoRunTimer)
    autoRunTimer = null
  }

  syncTimezoneSecondary()
  isRunning.value = true
  hasRun.value = true
  if (options.track) {
    trackTimeNexusEvent({
      toolSlug: tool.slug,
      locale,
      routePath: canonicalPath,
    }, 'tool_started')
  }

  try {
    result.value = await runTimeToolInWorker({
      slug: tool.slug,
      primaryInput: primaryInput.value,
      secondaryInput: secondaryInput.value,
      mode: selectedMode.value,
    })

    if (options.track) {
      trackTimeNexusEvent({
        toolSlug: tool.slug,
        locale,
        routePath: canonicalPath,
      }, result.value.ok ? 'tool_completed' : 'tool_failed')
    }
  } catch (error) {
    result.value = {
      ok: false,
      output: '',
      meta: [],
      error: error instanceof Error ? error.message : 'Tool execution failed.',
    }
    if (options.track) {
      trackTimeNexusEvent({
        toolSlug: tool.slug,
        locale,
        routePath: canonicalPath,
      }, 'tool_failed')
    }
  } finally {
    isRunning.value = false
  }
}

function resetExample(): void {
  selectedMode.value = tool.modes[0]?.value ?? ''
  primaryInput.value = tool.samplePrimary
  secondaryInput.value = tool.sampleSecondary
  sourceZoneInput.value = 'America/New_York'
  targetZoneInput.value = 'Europe/London'
  if (isTimestampTool.value) {
    primaryInput.value = Math.floor(Date.now() / 1000).toString()
  }
  if (isTimezoneTool.value) {
    setCurrentTimezoneExample()
  }
  hasRun.value = false
  result.value = null
  scheduleAutoRun()
}

function scheduleAutoRun(): void {
  if (!shouldAutoRun.value && !isTimezoneTool.value) {
    return
  }

  if (!autoRunStarted.value) {
    return
  }

  if (autoRunTimer) {
    clearTimeout(autoRunTimer)
  }

  autoRunTimer = setTimeout(() => {
    void runTool({ track: false })
  }, 220)
}

onMounted(() => {
  trackTimeNexusEvent({
    toolSlug: tool.slug,
    locale,
    routePath: canonicalPath,
  }, 'tool_viewed')

  if (isTimestampTool.value) {
    primaryInput.value = Math.floor(Date.now() / 1000).toString()
  }
  if (isTimezoneTool.value) {
    setCurrentTimezoneExample()
  }

  syncTimezoneSecondary()
  autoRunStarted.value = true
  void runTool({ track: false })
})

onBeforeUnmount(() => {
  if (autoRunTimer) {
    clearTimeout(autoRunTimer)
  }
})

watch([primaryInput, secondaryInput, selectedMode, sourceZoneInput, targetZoneInput], scheduleAutoRun)

useHead({
  htmlAttrs: {
    lang: toHtmlLang(locale),
  },
  title: `${copy.title} | TimeNexus`,
  meta: [
    {
      name: 'description',
      content: copy.headline,
    },
    {
      property: 'og:title',
      content: `${copy.title} | TimeNexus`,
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
    ...localeAlternates((targetLocale) => localizedToolPath(targetLocale, tool.slug)),
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
      :path-for-locale="(targetLocale) => localizedToolPath(targetLocale, tool.slug)"
    />

    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink :to="localizedHomePath(locale)">{{ shellCopy.breadcrumbHome }}</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ copy.shortName }}</span>
    </nav>

    <section class="hero hero--single" :aria-labelledby="`${tool.slug}-title`">
      <div>
        <div class="detail-topline">
          <p class="eyebrow">{{ getCategoryLabel(tool.category, locale) }}</p>
          <span class="status">{{ shellCopy.localBadgeLabel }}</span>
        </div>
        <h1 :id="`${tool.slug}-title`">{{ copy.title }}</h1>
        <p class="lead">{{ copy.headline }}</p>
      </div>

    </section>

    <section class="tool-layout">
      <div>
        <section class="answer-panel" aria-live="polite" :aria-busy="isRunning" :aria-labelledby="`${tool.slug}-answer`">
          <div class="answer-panel__topline">
            <h2 :id="`${tool.slug}-answer`">{{ shellCopy.directAnswerTitle }}</h2>
            <span class="status">{{ answerStateTitle }}</span>
          </div>

          <p v-if="isRunning">{{ shellCopy.answerRunningBody }}</p>
          <p v-else-if="result && !result.ok" class="result-error">{{ result.error }}</p>
          <template v-else-if="answerSummary">
            <strong class="answer-primary">{{ answerSummary.primary }}</strong>
            <p v-if="answerSummary.secondary" class="answer-secondary">{{ answerSummary.secondary }}</p>
            <dl v-if="answerSummary.details.length" class="answer-details">
              <div v-for="item in answerSummary.details" :key="`${item.label}-${item.value}`">
                <dt>{{ item.label }}</dt>
                <dd>{{ item.value }}</dd>
              </div>
            </dl>
          </template>
          <p v-else>{{ shellCopy.answerEmptyBody }}</p>
        </section>

        <section v-if="timelineItems.length" class="timeline-panel" :aria-labelledby="`${tool.slug}-timeline`">
          <div>
            <h2 :id="`${tool.slug}-timeline`">{{ shellCopy.timelineTitle }}</h2>
            <p>{{ shellCopy.timelineBody }}</p>
          </div>
          <ol class="timeline-list">
            <li v-for="item in timelineItems" :key="`${item.label}-${item.value}`">
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
            </li>
          </ol>
        </section>

        <section class="input-panel" :aria-labelledby="`${tool.slug}-input`">
          <h2 :id="`${tool.slug}-input`">{{ shellCopy.inputTitle }}</h2>
          <p>{{ copy.description }}</p>
          <form class="utility-form" @submit.prevent="runTool()">
            <div v-if="tool.modes.length > 1 && !isUnitTool" class="mode-tabs" :aria-label="copy.modeLabel">
              <button
                v-for="mode in tool.modes"
                :key="mode.value"
                type="button"
                :aria-pressed="selectedMode === mode.value"
                @click="selectedMode = mode.value"
              >
                {{ mode.label }}
              </button>
            </div>

            <template v-if="isTimezoneTool">
              <div class="form-grid form-grid--three">
                <div class="field">
                  <label :for="`${tool.slug}-primary`">{{ copy.inputLabel }}</label>
                  <input
                    :id="`${tool.slug}-primary`"
                    v-model="primaryInput"
                    type="text"
                    inputmode="numeric"
                    spellcheck="false"
                    :placeholder="currentDatetimePlaceholder"
                  >
                </div>
                <div class="field">
                  <label :for="`${tool.slug}-source`">Source zone</label>
                  <select :id="`${tool.slug}-source`" v-model="sourceZoneInput">
                    <option v-for="zone in plannerSourceZones" :key="zone.zone" :value="zone.zone">
                      {{ zone.label }} - {{ zone.zone }}
                    </option>
                  </select>
                </div>
                <div class="field">
                  <label :for="`${tool.slug}-target`">Target zone</label>
                  <select :id="`${tool.slug}-target`" v-model="targetZoneInput">
                    <option v-for="zone in plannerSourceZones" :key="zone.zone" :value="zone.zone">
                      {{ zone.label }} - {{ zone.zone }}
                    </option>
                  </select>
                </div>
              </div>
            </template>

            <template v-else-if="isTimestampTool">
              <div class="form-grid form-grid--two">
                <div class="field">
                  <label :for="`${tool.slug}-primary`">{{ copy.inputLabel }}</label>
                  <input :id="`${tool.slug}-primary`" v-model="primaryInput" type="text" inputmode="numeric" spellcheck="false">
                </div>
                <div class="field">
                  <label :for="`${tool.slug}-secondary`">{{ copy.secondaryInputLabel }}</label>
                  <select :id="`${tool.slug}-secondary`" v-model="secondaryInput">
                    <option value="">UTC only</option>
                    <option v-for="zone in plannerSourceZones" :key="zone.zone" :value="zone.zone">
                      {{ zone.label }} - {{ zone.zone }}
                    </option>
                  </select>
                </div>
              </div>
            </template>

            <template v-else-if="isDateDifferenceTool || isBusinessDaysTool || isAgeTool">
              <div class="form-grid form-grid--two">
                <div class="field">
                  <label :for="`${tool.slug}-primary`">{{ copy.inputLabel }}</label>
                  <input :id="`${tool.slug}-primary`" v-model="primaryInput" type="date">
                </div>
                <div class="field">
                  <label :for="`${tool.slug}-secondary`">{{ copy.secondaryInputLabel }}</label>
                  <input :id="`${tool.slug}-secondary`" v-model="secondaryInput" type="date">
                </div>
              </div>
            </template>

            <template v-else-if="isPercentageTool">
              <div class="form-grid form-grid--two">
                <div class="field">
                  <label :for="`${tool.slug}-primary`">{{ copy.inputLabel }}</label>
                  <input :id="`${tool.slug}-primary`" v-model="primaryInput" type="number" step="any">
                </div>
                <div class="field">
                  <label :for="`${tool.slug}-secondary`">{{ copy.secondaryInputLabel }}</label>
                  <input :id="`${tool.slug}-secondary`" v-model="secondaryInput" type="number" step="any">
                </div>
              </div>
            </template>

            <template v-else-if="isUnitTool">
              <div class="unit-mode-groups">
                <section v-for="group in unitModeGroups" :key="group.label" class="unit-mode-group">
                  <h3>{{ group.label }}</h3>
                  <div class="mode-tabs" :aria-label="`${group.label} conversions`">
                    <button
                      v-for="mode in group.modes"
                      :key="mode.value"
                      type="button"
                      :aria-pressed="selectedMode === mode.value"
                      @click="selectedMode = mode.value"
                    >
                      {{ mode.label }}
                    </button>
                  </div>
                </section>
              </div>
              <div class="field">
                <label :for="`${tool.slug}-primary`">{{ copy.inputLabel }}</label>
                <input :id="`${tool.slug}-primary`" v-model="primaryInput" type="number" step="any">
              </div>
            </template>

            <template v-else>
              <div class="field">
                <label :for="`${tool.slug}-primary`">{{ copy.inputLabel }}</label>
                <textarea :id="`${tool.slug}-primary`" v-model="primaryInput" spellcheck="false"></textarea>
              </div>
              <div v-if="tool.acceptsSecondaryInput" class="field">
                <label :for="`${tool.slug}-secondary`">{{ copy.secondaryInputLabel }}</label>
                <textarea :id="`${tool.slug}-secondary`" v-model="secondaryInput" spellcheck="false"></textarea>
              </div>
            </template>

            <div class="tool-actions">
              <button :class="getButtonClass()" type="submit" :disabled="isRunning">
                {{ isTimezoneTool ? 'Convert time' : shellCopy.runLabel }}
              </button>
              <button :class="getButtonClass('secondary')" type="button" :disabled="!result?.ok" @click="copyResult">
                Copy result
              </button>
              <button v-if="isTimezoneTool" :class="getButtonClass('secondary')" type="button" @click="copyPageLink">
                Copy link
              </button>
              <button :class="getButtonClass('secondary')" type="button" @click="resetExample">
                {{ shellCopy.resetLabel }}
              </button>
            </div>
            <p v-if="copyState" class="copy-status">{{ copyState }}</p>
          </form>
        </section>

        <section class="result-panel" aria-live="polite" :aria-busy="isRunning" :aria-labelledby="`${tool.slug}-result`">
          <h2 :id="`${tool.slug}-result`">{{ resultTitle }}</h2>

          <p v-if="!hasRun">{{ shellCopy.privacyNote }}</p>
          <p v-else-if="result && !result.ok" class="result-error">{{ result.error }}</p>

          <template v-else-if="result && result.ok">
            <div v-if="keyResultRows.length" class="result-card-grid">
              <button
                v-for="row in keyResultRows"
                :key="`${row.label}-${row.value}`"
                type="button"
                class="copy-card"
                @click="copyText(row.value, `${row.label} copied`)"
              >
                <span>{{ row.label }}</span>
                <strong>{{ row.value }}</strong>
              </button>
            </div>
            <dl v-if="calendarRows.length && (isDateDifferenceTool || isBusinessDaysTool)" class="mini-timeline">
              <div v-for="row in calendarRows" :key="`${row.label}-${row.value}`">
                <dt>{{ row.label }}</dt>
                <dd>{{ row.value }}</dd>
              </div>
            </dl>
            <p v-if="isBusinessDaysTool" class="notice-panel">
              Holiday calendars are not applied here; regional holiday calendars are future workflow depth.
            </p>
            <p v-if="formulaLine" class="formula-line">
              <strong>Formula:</strong> {{ formulaLine }}
            </p>
            <div v-if="result.meta.length" class="result-meta">
              <div v-for="item in result.meta" :key="`${item.label}-${item.value}`">
                <strong>{{ item.label }}</strong>
                <span>{{ item.value }}</span>
              </div>
            </div>
            <pre class="result-output">{{ result.output }}</pre>
          </template>
        </section>
      </div>

      <aside class="tool-sidebar">
        <section class="band" :aria-labelledby="`${tool.slug}-scope`">
          <h2 :id="`${tool.slug}-scope`">{{ shellCopy.freeCheckLabel }}</h2>
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
        </section>

        <section class="band" :aria-labelledby="`${tool.slug}-example`">
          <h2 :id="`${tool.slug}-example`">{{ shellCopy.exampleTitle }}</h2>
          <p>{{ shellCopy.exampleBody }}</p>
          <dl class="fact-list">
            <div>
              <dt>{{ copy.inputLabel }}</dt>
              <dd>{{ samplePrimaryDisplay }}</dd>
            </div>
            <div v-if="tool.acceptsSecondaryInput">
              <dt>{{ copy.secondaryInputLabel }}</dt>
              <dd>{{ tool.sampleSecondary }}</dd>
            </div>
          </dl>
        </section>

        <section class="band" :aria-labelledby="`${tool.slug}-gated`">
          <h2 :id="`${tool.slug}-gated`">{{ shellCopy.gatedTitle }}</h2>
          <p>{{ shellCopy.gatedBody }}</p>
          <h3>{{ shellCopy.gatedItemsTitle }}</h3>
          <ul class="gated-list">
            <li v-for="item in shellCopy.gatedItems" :key="item">{{ item }}</li>
          </ul>
        </section>
      </aside>
    </section>

    <MonetizationSafeBlock
      :locale="locale"
      site-slug="timenexus"
      :slot-id="`timenexus-${tool.slug}-after-result`"
      variant="tool"
    />

    <section class="related-panel" :aria-labelledby="`${tool.slug}-related`">
      <div>
        <h2 :id="`${tool.slug}-related`">{{ shellCopy.relatedTitle }}</h2>
        <p>{{ shellCopy.relatedBody }}</p>
      </div>
      <div class="related-grid">
        <NuxtLink
          v-for="relatedTool in relatedTools"
          :key="relatedTool.slug"
          class="related-card"
          :to="localizedToolPath(locale, relatedTool.slug)"
        >
          <span>{{ getCategoryLabel(relatedTool.category, locale) }}</span>
          <strong>{{ getTimeToolCopy(relatedTool, locale).title }}</strong>
          <small>{{ shellCopy.openRelatedLabel }}</small>
        </NuxtLink>
      </div>
    </section>

    <section class="content-layout" :aria-labelledby="`${tool.slug}-guide`">
      <div>
        <h2 :id="`${tool.slug}-guide`">{{ shellCopy.guideTitle }}</h2>
        <article v-for="section in copy.contentSections" :key="section.heading" class="content-section">
          <h3>{{ section.heading }}</h3>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </article>
        <section class="content-section" :aria-labelledby="`${tool.slug}-faq`">
          <h3 :id="`${tool.slug}-faq`">{{ shellCopy.faqTitle }}</h3>
          <div class="faq-list">
            <details v-for="item in copy.faq" :key="item.question">
              <summary>{{ item.question }}</summary>
              <p>{{ item.answer }}</p>
            </details>
          </div>
        </section>
      </div>

      <aside class="band" :aria-label="shellCopy.methodologyLabel">
        <h2>{{ shellCopy.methodologyLabel }}</h2>
        <p>{{ shellCopy.contentQualityBody }}</p>
        <h3>{{ shellCopy.supportTitle }}</h3>
        <p>{{ shellCopy.supportBody }}</p>
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
