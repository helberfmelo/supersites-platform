<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, ref } from 'vue'
import { getShellCopy } from '../../../data/copy'
import {
  createToolStructuredData,
  getCategoryLabel,
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
const result = ref<ToolResult | null>(null)
const resultTitle = computed(() => result.value?.ok === false ? shellCopy.invalidResultTitle : copy.resultLabel)

async function runTool(): Promise<void> {
  isRunning.value = true
  hasRun.value = true
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
          <span class="status">Sprint 3.2</span>
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

    <section class="tool-layout">
      <div>
        <section class="input-panel" :aria-labelledby="`${tool.slug}-input`">
          <h2 :id="`${tool.slug}-input`">{{ shellCopy.inputTitle }}</h2>
          <p>{{ copy.description }}</p>
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

          <p v-if="!hasRun">{{ shellCopy.privacyNote }}</p>
          <p v-else-if="result && !result.ok" class="result-error">{{ result.error }}</p>

          <template v-else-if="result && result.ok">
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
