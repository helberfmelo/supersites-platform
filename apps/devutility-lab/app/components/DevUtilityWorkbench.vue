<script setup lang="ts">
import { getButtonClass, getStatusBadgeClass } from '@supersites/ui'
import { computed, ref, watch } from 'vue'
import { getHomeCopy, getShellCopy } from '../data/copy'
import { localizedToolPath, type LocaleCode } from '../data/locales'
import {
  getCategoryLabel,
  getToolBySlug,
  getToolCopy,
  toolCatalog,
  type ToolCategory,
  type ToolDefinition,
  type ToolResult,
  type ToolSlug,
} from '../data/tools'
import { runToolInWorker } from '../utils/toolWorker'

const props = defineProps<{
  locale: LocaleCode
}>()

const copy = computed(() => getHomeCopy(props.locale))
const shellCopy = computed(() => getShellCopy(props.locale))
const categories = computed(() => Array.from(new Set(toolCatalog.map((tool) => tool.category))))
const selectedCategory = ref<ToolCategory | 'all'>('all')
const selectedToolSlug = ref<ToolSlug>('structured-data-formatter')
const selectedMode = ref('')
const primaryInput = ref('')
const secondaryInput = ref('')
const hasRun = ref(false)
const isRunning = ref(false)
const copyState = ref<'idle' | 'copied' | 'failed'>('idle')
const result = ref<ToolResult | null>(null)
const viewMode = ref<'output' | 'tree' | 'error'>('output')
const recentTools = ref<ToolSlug[]>([])
const fallbackTool = toolCatalog[0]!

const selectedTool = computed(() => getToolBySlug(selectedToolSlug.value) ?? fallbackTool)
const selectedToolCopy = computed(() => getToolCopy(selectedTool.value, props.locale))
const filteredTools = computed(() => (
  selectedCategory.value === 'all'
    ? toolCatalog
    : toolCatalog.filter((tool) => tool.category === selectedCategory.value)
))
const resultOutput = computed(() => result.value?.ok ? result.value.output : '')
const inputStats = computed(() => {
  const values = [primaryInput.value, secondaryInput.value].filter(Boolean)
  const characters = values.reduce((sum, value) => sum + value.length, 0)
  const lines = values.reduce((sum, value) => sum + Math.max(value.split(/\r?\n/u).length, 1), 0)

  return [
    { label: 'Characters', value: characters.toLocaleString('en-US') },
    { label: 'Lines', value: lines.toLocaleString('en-US') },
    { label: 'Mode', value: selectedMode.value || 'default' },
  ]
})
const resultStats = computed(() => {
  if (!resultOutput.value) {
    return []
  }

  return [
    ...(result.value?.meta ?? []),
    { label: 'Characters', value: resultOutput.value.length.toLocaleString('en-US') },
    { label: 'Lines', value: Math.max(resultOutput.value.split(/\r?\n/u).length, 1).toLocaleString('en-US') },
  ]
})
const treeRows = computed(() => buildTreeRows(resultOutput.value))
const resultTitle = computed(() => {
  if (isRunning.value) {
    return shellCopy.value.runningResultTitle
  }

  if (!hasRun.value) {
    return shellCopy.value.emptyResultTitle
  }

  return result.value?.ok === false ? shellCopy.value.invalidResultTitle : shellCopy.value.successResultTitle
})
const resultBody = computed(() => {
  if (isRunning.value) {
    return shellCopy.value.runningResultBody
  }

  if (!hasRun.value) {
    return shellCopy.value.emptyResultBody
  }

  if (result.value?.ok) {
    return shellCopy.value.successResultBody
  }

  return result.value?.error ?? selectedToolCopy.value.commonErrorBody
})
const viewTabs = computed(() => [
  { value: 'output' as const, label: copy.value.outputViewLabel },
  { value: 'tree' as const, label: copy.value.treeViewLabel },
  { value: 'error' as const, label: copy.value.errorViewLabel },
])
const recentToolDefinitions = computed(() => recentTools.value
  .map((slug) => getToolBySlug(slug))
  .filter((tool): tool is ToolDefinition => Boolean(tool)))

watch(selectedToolSlug, () => loadExample(), { immediate: true })

function selectCategory(category: ToolCategory | 'all'): void {
  selectedCategory.value = category
  const firstTool = filteredTools.value[0]
  if (firstTool && !filteredTools.value.some((tool) => tool.slug === selectedToolSlug.value)) {
    selectedToolSlug.value = firstTool.slug
  }
}

function selectTool(slug: ToolSlug): void {
  selectedToolSlug.value = slug
}

function loadExample(): void {
  selectedMode.value = selectedTool.value.modes[0]?.value ?? ''
  primaryInput.value = selectedTool.value.samplePrimary
  secondaryInput.value = selectedTool.value.sampleSecondary
  hasRun.value = false
  isRunning.value = false
  result.value = null
  copyState.value = 'idle'
  viewMode.value = 'output'
}

function clearInputs(): void {
  primaryInput.value = ''
  secondaryInput.value = ''
  hasRun.value = false
  result.value = null
  copyState.value = 'idle'
  viewMode.value = 'output'
}

async function runTool(): Promise<void> {
  isRunning.value = true
  hasRun.value = true
  copyState.value = 'idle'

  try {
    result.value = await runToolInWorker({
      slug: selectedTool.value.slug,
      primaryInput: primaryInput.value,
      secondaryInput: secondaryInput.value,
      mode: selectedMode.value,
    })
    rememberTool(selectedTool.value.slug)
    viewMode.value = result.value.ok ? 'output' : 'error'
  } catch (error) {
    result.value = {
      ok: false,
      output: '',
      meta: [],
      error: error instanceof Error ? error.message : 'Tool execution failed.',
    }
    viewMode.value = 'error'
  } finally {
    isRunning.value = false
  }
}

function rememberTool(slug: ToolSlug): void {
  recentTools.value = [slug, ...recentTools.value.filter((candidate) => candidate !== slug)].slice(0, 4)
}

async function copyResult(): Promise<void> {
  if (!resultOutput.value) {
    return
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(resultOutput.value)
    } else {
      const scratch = document.createElement('textarea')
      scratch.value = resultOutput.value
      scratch.setAttribute('readonly', 'true')
      scratch.style.position = 'fixed'
      scratch.style.left = '-9999px'
      document.body.appendChild(scratch)
      scratch.select()
      document.execCommand('copy')
      document.body.removeChild(scratch)
    }
    copyState.value = 'copied'
  } catch {
    copyState.value = 'failed'
  }
}

function downloadResult(): void {
  if (!resultOutput.value) {
    return
  }

  const blob = new Blob([resultOutput.value], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${selectedTool.value.slug}-${selectedMode.value || 'result'}.txt`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

function buildTreeRows(output: string): string[] {
  if (!output.trim()) {
    return []
  }

  try {
    return flattenJson(JSON.parse(output)).slice(0, 18)
  } catch {
    return output
      .split(/\r?\n/u)
      .filter(Boolean)
      .slice(0, 18)
      .map((line, index) => `line ${index + 1}: ${line}`)
  }
}

function flattenJson(value: unknown, path = '$', rows: string[] = []): string[] {
  if (rows.length >= 18) {
    return rows
  }

  if (Array.isArray(value)) {
    rows.push(`${path}: array(${value.length})`)
    value.slice(0, 8).forEach((item, index) => flattenJson(item, `${path}[${index}]`, rows))
    return rows
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
    rows.push(`${path}: object(${entries.length})`)
    entries.slice(0, 8).forEach(([key, item]) => flattenJson(item, `${path}.${key}`, rows))
    return rows
  }

  rows.push(`${path}: ${String(value)}`)
  return rows
}
</script>

<template>
  <section class="workbench home-workbench" aria-labelledby="devutility-workbench-title">
    <div class="workbench__header">
      <div>
        <p class="eyebrow">{{ copy.workbenchEyebrow }}</p>
        <h2 id="devutility-workbench-title">{{ copy.workbenchTitle }}</h2>
        <p>{{ copy.workbenchBody }}</p>
      </div>
      <aside class="privacy-callout" :aria-label="shellCopy.privacyTitle">
        <strong>{{ shellCopy.privacyTitle }}</strong>
        <span>{{ shellCopy.privacyNote }}</span>
      </aside>
    </div>

    <div class="dev-workbench-layout">
      <aside class="tool-rail" :aria-label="copy.quickToolsTitle">
        <h3>{{ copy.quickToolsTitle }}</h3>
        <div class="category-tabs category-tabs--compact" aria-label="Workbench categories">
          <button type="button" :aria-pressed="selectedCategory === 'all'" @click="selectCategory('all')">
            {{ copy.allCategories }}
          </button>
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            :aria-pressed="selectedCategory === category"
            @click="selectCategory(category)"
          >
            {{ getCategoryLabel(category, locale) }}
          </button>
        </div>

        <div class="tool-rail__list">
          <button
            v-for="tool in filteredTools"
            :key="tool.slug"
            type="button"
            :aria-pressed="selectedToolSlug === tool.slug"
            @click="selectTool(tool.slug)"
          >
            <span>{{ getToolCopy(tool, locale).shortName }}</span>
            <small>{{ getCategoryLabel(tool.category, locale) }}</small>
          </button>
        </div>

        <section class="recent-box" :aria-labelledby="'recent-tools-title'">
          <h3 id="recent-tools-title">{{ copy.recentToolsTitle }}</h3>
          <p v-if="recentToolDefinitions.length === 0">{{ copy.emptyRecentBody }}</p>
          <div v-else class="recent-box__links">
            <button
              v-for="tool in recentToolDefinitions"
              :key="tool.slug"
              type="button"
              @click="selectTool(tool.slug)"
            >
              {{ getToolCopy(tool, locale).shortName }}
            </button>
          </div>
        </section>
      </aside>

      <div class="home-workbench-main">
        <div class="detail-topline">
          <span class="category">{{ getCategoryLabel(selectedTool.category, locale) }}</span>
          <span :class="getStatusBadgeClass('foundation')">{{ copy.localBadgeLabel }}</span>
        </div>
        <h3>{{ selectedToolCopy.title }}</h3>
        <p>{{ selectedToolCopy.headline }}</p>

        <div class="workbench-grid">
          <section class="input-panel" aria-labelledby="home-workbench-input">
            <div class="panel-heading">
              <div>
                <h2 id="home-workbench-input">{{ shellCopy.inputTitle }}</h2>
                <p>{{ selectedToolCopy.description }}</p>
              </div>
              <div class="mini-metrics" :aria-label="copy.inputMetricsLabel">
                <div v-for="item in inputStats" :key="item.label">
                  <strong>{{ item.label }}</strong>
                  <span>{{ item.value }}</span>
                </div>
              </div>
            </div>

            <div class="example-box">
              <strong>{{ shellCopy.exampleTitle }}</strong>
              <p>{{ selectedToolCopy.exampleBody }}</p>
            </div>

            <form class="utility-form" @submit.prevent="runTool">
              <div class="field">
                <label for="home-workbench-mode">{{ selectedToolCopy.modeLabel }}</label>
                <select id="home-workbench-mode" v-model="selectedMode">
                  <option v-for="mode in selectedTool.modes" :key="mode.value" :value="mode.value">
                    {{ mode.label }}
                  </option>
                </select>
              </div>

              <div v-if="selectedTool.acceptsPrimaryInput" class="field">
                <label for="home-workbench-primary">{{ selectedToolCopy.inputLabel }}</label>
                <textarea id="home-workbench-primary" v-model="primaryInput" spellcheck="false"></textarea>
              </div>

              <div v-if="selectedTool.requiresSecondaryInput" class="field">
                <label for="home-workbench-secondary">{{ selectedToolCopy.secondaryInputLabel }}</label>
                <textarea id="home-workbench-secondary" v-model="secondaryInput" spellcheck="false"></textarea>
              </div>

              <div class="tool-actions">
                <button :class="getButtonClass()" type="submit" :disabled="isRunning">
                  {{ shellCopy.runLabel }}
                </button>
                <button :class="getButtonClass('secondary')" type="button" @click="loadExample">
                  {{ shellCopy.resetLabel }}
                </button>
                <button :class="getButtonClass('secondary')" type="button" @click="clearInputs">
                  {{ copy.clearLabel }}
                </button>
              </div>
            </form>
          </section>

          <section class="result-panel" aria-live="polite" :aria-busy="isRunning" aria-labelledby="home-workbench-result">
            <div class="result-panel__heading">
              <div>
                <h2 id="home-workbench-result">{{ resultTitle }}</h2>
                <p :class="result && !result.ok ? 'result-error' : ''">{{ resultBody }}</p>
              </div>
              <div class="result-view-tabs" aria-label="Result views">
                <button
                  v-for="tab in viewTabs"
                  :key="tab.value"
                  type="button"
                  :aria-pressed="viewMode === tab.value"
                  @click="viewMode = tab.value"
                >
                  {{ tab.label }}
                </button>
              </div>
            </div>

            <template v-if="result && result.ok && !isRunning">
              <div v-if="resultStats.length" class="result-meta" :aria-label="copy.resultMetricsLabel">
                <div v-for="item in resultStats" :key="`${item.label}-${item.value}`">
                  <strong>{{ item.label }}</strong>
                  <span>{{ item.value }}</span>
                </div>
              </div>

              <pre v-if="viewMode === 'output'" class="result-output">{{ result.output }}</pre>
              <ul v-else-if="viewMode === 'tree'" class="tree-output">
                <li v-for="row in treeRows" :key="row">{{ row }}</li>
              </ul>
              <div v-else class="error-output">
                <strong>{{ shellCopy.invalidResultTitle }}</strong>
                <p>{{ selectedToolCopy.commonErrorBody }}</p>
              </div>

              <div class="tool-actions" :aria-label="shellCopy.resultActionsLabel">
                <button :class="getButtonClass('secondary')" type="button" @click="copyResult">
                  {{ copyState === 'copied' ? shellCopy.copiedResultLabel : copyState === 'failed' ? shellCopy.copyFailedLabel : shellCopy.copyResultLabel }}
                </button>
                <button :class="getButtonClass('secondary')" type="button" @click="downloadResult">
                  {{ shellCopy.downloadResultLabel }}
                </button>
                <NuxtLink class="button-link" :to="localizedToolPath(locale, selectedTool.slug)">
                  {{ copy.openFullToolLabel }}
                </NuxtLink>
              </div>
            </template>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
