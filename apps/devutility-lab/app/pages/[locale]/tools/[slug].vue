<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, ref } from 'vue'
import { getShellCopy } from '../../../data/copy'
import {
  createToolStructuredData,
  getCategoryLabel,
  getRelatedTools,
  getToolBySlug,
  getToolCopy,
  type ToolResult,
} from '../../../data/tools'
import { localizedContentPath, localizedHomePath, localizedToolPath, normalizePublicLocale, toHtmlLang } from '../../../data/locales'
import { absoluteUrl, localeAlternates } from '../../../data/routes'
import { trackDevUtilityEvent } from '../../../utils/analytics'
import { runToolInWorker } from '../../../utils/toolWorker'

const route = useRoute()
const locale = normalizePublicLocale(route.params.locale?.toString())
const tool = getToolBySlug(route.params.slug?.toString())

if (!locale || !tool) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Tool not found',
  })
}

const copy = getToolCopy(tool, locale)
const shellCopy = getShellCopy(locale)
const canonicalPath = localizedToolPath(locale, tool.slug)
const structuredData = createToolStructuredData(tool, locale, absoluteUrl(canonicalPath))
const selectedMode = ref(tool.modes[0]?.value ?? '')
const primaryInput = ref(tool.samplePrimary)
const secondaryInput = ref(tool.sampleSecondary)
const hasRun = ref(false)
const isRunning = ref(false)
const copyState = ref<'idle' | 'copied' | 'failed'>('idle')
const result = ref<ToolResult | null>(null)
const relatedTools = getRelatedTools(tool)
const resultTitle = computed(() => {
  if (isRunning.value) {
    return shellCopy.runningResultTitle
  }

  if (!hasRun.value) {
    return shellCopy.emptyResultTitle
  }

  return result.value?.ok === false ? shellCopy.invalidResultTitle : shellCopy.successResultTitle
})
const resultBody = computed(() => {
  if (isRunning.value) {
    return shellCopy.runningResultBody
  }

  if (!hasRun.value) {
    return shellCopy.emptyResultBody
  }

  if (result.value?.ok) {
    return shellCopy.successResultBody
  }

  return result.value?.error ?? ''
})
const resultOutput = computed(() => result.value?.ok ? result.value.output : '')
const resultStats = computed(() => {
  const output = resultOutput.value
  if (!output) {
    return []
  }

  return [
    { label: 'Characters', value: output.length.toLocaleString('en-US') },
    { label: 'Lines', value: Math.max(output.split(/\r?\n/u).length, 1).toLocaleString('en-US') },
  ]
})
const workbenchStats = computed(() => {
  const inputCharacters = [primaryInput.value, secondaryInput.value]
    .filter(Boolean)
    .reduce((sum, value) => sum + value.length, 0)

  return [
    { label: 'Input characters', value: inputCharacters.toLocaleString('en-US') },
    { label: 'Mode', value: selectedMode.value || 'default' },
  ]
})

async function runTool(): Promise<void> {
  isRunning.value = true
  hasRun.value = true
  copyState.value = 'idle'
  trackDevUtilityEvent({
    toolSlug: tool.slug,
    locale,
    routePath: canonicalPath,
  }, 'tool_started')

  try {
    result.value = await runToolInWorker({
      slug: tool.slug,
      primaryInput: primaryInput.value,
      secondaryInput: secondaryInput.value,
      mode: selectedMode.value,
    })

    trackDevUtilityEvent({
      toolSlug: tool.slug,
      locale,
      routePath: canonicalPath,
    }, result.value.ok ? 'tool_completed' : 'tool_failed')
  } catch (error) {
    result.value = {
      ok: false,
      output: '',
      meta: [],
      error: error instanceof Error ? error.message : 'Tool execution failed.',
    }
    trackDevUtilityEvent({
      toolSlug: tool.slug,
      locale,
      routePath: canonicalPath,
    }, 'tool_failed')
  } finally {
    isRunning.value = false
  }
}

function resetExample(): void {
  selectedMode.value = tool.modes[0]?.value ?? ''
  primaryInput.value = tool.samplePrimary
  secondaryInput.value = tool.sampleSecondary
  hasRun.value = false
  result.value = null
  copyState.value = 'idle'
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
  anchor.download = `${tool.slug}-${selectedMode.value || 'result'}.txt`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

useHead({
  htmlAttrs: {
    lang: toHtmlLang(locale),
  },
  title: `${copy.title} | DevUtility Lab`,
  meta: [
    {
      name: 'description',
      content: copy.headline,
    },
    {
      property: 'og:title',
      content: `${copy.title} | DevUtility Lab`,
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

    <section class="hero" :aria-labelledby="`${tool.slug}-title`">
      <div>
        <div class="detail-topline">
          <p class="eyebrow">{{ getCategoryLabel(tool.category, locale) }}</p>
          <span class="status">Local tool</span>
        </div>
        <h1 :id="`${tool.slug}-title`">{{ copy.title }}</h1>
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

    <section class="workbench" :aria-labelledby="`${tool.slug}-workbench`">
      <div class="workbench__header">
        <div>
          <p class="eyebrow">{{ shellCopy.workbenchTitle }}</p>
          <h2 :id="`${tool.slug}-workbench`">{{ copy.shortName }} {{ shellCopy.resultTitle }}</h2>
          <p>{{ shellCopy.workbenchBody }}</p>
        </div>
        <aside class="privacy-callout" :aria-label="shellCopy.privacyTitle">
          <strong>{{ shellCopy.privacyTitle }}</strong>
          <span>{{ shellCopy.privacyNote }}</span>
        </aside>
      </div>

      <div class="workbench-grid">
        <section class="input-panel" :aria-labelledby="`${tool.slug}-input`">
          <div class="panel-heading">
            <div>
              <h2 :id="`${tool.slug}-input`">{{ shellCopy.inputTitle }}</h2>
              <p>{{ copy.description }}</p>
            </div>
            <div class="mini-metrics" aria-label="Input metrics">
              <div v-for="item in workbenchStats" :key="item.label">
                <strong>{{ item.label }}</strong>
                <span>{{ item.value }}</span>
              </div>
            </div>
          </div>

          <div class="example-box">
            <strong>{{ shellCopy.exampleTitle }}</strong>
            <p>{{ copy.exampleBody }}</p>
          </div>

          <form class="utility-form" @submit.prevent="runTool">
            <div class="field">
              <label :for="`${tool.slug}-mode`">{{ copy.modeLabel }}</label>
              <select :id="`${tool.slug}-mode`" v-model="selectedMode">
                <option v-for="mode in tool.modes" :key="mode.value" :value="mode.value">
                  {{ mode.label }}
                </option>
              </select>
            </div>

            <div v-if="tool.acceptsPrimaryInput" class="field">
              <label :for="`${tool.slug}-primary`">{{ copy.inputLabel }}</label>
              <textarea :id="`${tool.slug}-primary`" v-model="primaryInput" spellcheck="false"></textarea>
            </div>

            <div v-if="tool.requiresSecondaryInput" class="field">
              <label :for="`${tool.slug}-secondary`">{{ copy.secondaryInputLabel }}</label>
              <textarea :id="`${tool.slug}-secondary`" v-model="secondaryInput" spellcheck="false"></textarea>
            </div>

            <div class="tool-actions">
              <button :class="getButtonClass()" type="submit" :disabled="isRunning">
                {{ shellCopy.runLabel }}
              </button>
              <button :class="getButtonClass('secondary')" type="button" @click="resetExample">
                {{ shellCopy.resetLabel }}
              </button>
            </div>
          </form>
        </section>

        <section class="result-panel" aria-live="polite" :aria-busy="isRunning" :aria-labelledby="`${tool.slug}-result`">
          <h2 :id="`${tool.slug}-result`">{{ resultTitle }}</h2>
          <p :class="result && !result.ok ? 'result-error' : ''">{{ resultBody }}</p>

          <template v-if="result && result.ok && !isRunning">
            <div v-if="result.meta.length || resultStats.length" class="result-meta">
              <div v-for="item in result.meta" :key="`${item.label}-${item.value}`">
                <strong>{{ item.label }}</strong>
                <span>{{ item.value }}</span>
              </div>
              <div v-for="item in resultStats" :key="item.label">
                <strong>{{ item.label }}</strong>
                <span>{{ item.value }}</span>
              </div>
            </div>
            <pre class="result-output">{{ result.output }}</pre>
            <div class="tool-actions" :aria-label="shellCopy.resultActionsLabel">
              <button :class="getButtonClass('secondary')" type="button" @click="copyResult">
                {{ copyState === 'copied' ? shellCopy.copiedResultLabel : copyState === 'failed' ? shellCopy.copyFailedLabel : shellCopy.copyResultLabel }}
              </button>
              <button :class="getButtonClass('secondary')" type="button" @click="downloadResult">
                {{ shellCopy.downloadResultLabel }}
              </button>
            </div>
          </template>
        </section>
      </div>
    </section>

    <section class="tool-layout">
      <aside class="band" :aria-labelledby="`${tool.slug}-scope`">
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
      </aside>

      <aside class="band upgrade-band" :aria-labelledby="`${tool.slug}-upgrade`">
        <h2 :id="`${tool.slug}-upgrade`">{{ shellCopy.gatedTitle }}</h2>
        <p>{{ shellCopy.gatedBody }}</p>
        <ul>
          <li v-for="item in shellCopy.gatedItems" :key="item">{{ item }}</li>
        </ul>
      </aside>
    </section>

    <section class="content-layout" :aria-labelledby="`${tool.slug}-guide`">
      <div>
        <h2 :id="`${tool.slug}-guide`">{{ shellCopy.guideTitle }}</h2>
        <article class="content-section">
          <h3>{{ shellCopy.exampleTitle }}</h3>
          <p>{{ copy.exampleBody }}</p>
        </article>
        <article class="content-section">
          <h3>{{ shellCopy.invalidResultTitle }}</h3>
          <p>{{ copy.commonErrorBody }}</p>
        </article>
        <article v-for="section in copy.contentSections" :key="section.heading" class="content-section">
          <h3>{{ section.heading }}</h3>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </article>
        <section class="content-section" :aria-labelledby="`${tool.slug}-related`">
          <h3 :id="`${tool.slug}-related`">{{ shellCopy.relatedTitle }}</h3>
          <p>{{ shellCopy.relatedBody }}</p>
          <div class="related-grid">
            <NuxtLink
              v-for="related in relatedTools"
              :key="related.slug"
              class="related-card"
              :to="localizedToolPath(locale, related.slug)"
            >
              <strong>{{ getToolCopy(related, locale).title }}</strong>
              <span>{{ getToolCopy(related, locale).headline }}</span>
              <em>{{ shellCopy.openRelatedLabel }}</em>
            </NuxtLink>
          </div>
        </section>
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
