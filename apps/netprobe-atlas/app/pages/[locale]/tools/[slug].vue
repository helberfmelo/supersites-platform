<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { ref } from 'vue'
import { getShellCopy } from '../../../data/copy'
import { localizedContentPath, localizedHomePath, localizedToolPath, normalizePublicLocale } from '../../../data/locales'
import { absoluteUrl, localeAlternates } from '../../../data/routes'
import { categoryLabels, getToolBySlug, getToolCopy } from '../../../data/tools'
import { trackToolStarted } from '../../../utils/analytics'

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
const previewSubmitted = ref(false)

function previewResult(): void {
  previewSubmitted.value = true
  trackToolStarted({
    toolSlug: tool.slug,
    locale,
    routePath: canonicalPath,
  })
}

useHead({
  htmlAttrs: {
    lang: locale,
  },
  title: `${copy.title} | NetProbe Atlas`,
  meta: [
    {
      name: 'description',
      content: copy.headline,
    },
    {
      property: 'og:title',
      content: `${copy.title} | NetProbe Atlas`,
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
      <span>{{ copy.navLabel }}</span>
    </nav>

    <section class="hero" :aria-labelledby="`${tool.slug}-title`">
      <div>
        <div class="detail-topline">
          <p class="eyebrow">{{ categoryLabels[tool.category] }}</p>
          <span class="status">{{ tool.statusLabel }}</span>
        </div>
        <h1 :id="`${tool.slug}-title`">{{ copy.title }}</h1>
        <p class="lead">{{ copy.headline }}</p>
      </div>

      <aside class="status-panel" :aria-label="shellCopy.pageStatusLabel">
        <div class="status-panel__row">
          <div>
            <strong>{{ shellCopy.exampleLabel }}</strong>
            <span>{{ tool.exampleTarget }}</span>
          </div>
          <span class="signal" aria-hidden="true"></span>
        </div>
        <div class="status-panel__row">
          <div>
            <strong>{{ shellCopy.plannedTitle }}</strong>
            <span>{{ shellCopy.plannedBody }}</span>
          </div>
          <span class="signal signal--amber" aria-hidden="true"></span>
        </div>
      </aside>
    </section>

    <section class="tool-layout">
      <div>
        <section class="input-panel" :aria-labelledby="`${tool.slug}-input`">
          <h2 :id="`${tool.slug}-input`">{{ copy.navLabel }}</h2>
          <p>{{ copy.description }}</p>
          <form class="field" @submit.prevent="previewResult">
            <label :for="`${tool.slug}-target`">{{ copy.inputLabel }}</label>
            <input :id="`${tool.slug}-target`" type="text" :placeholder="copy.inputPlaceholder" autocomplete="off">
            <div class="tool-actions">
              <button :class="getButtonClass()" type="submit">
                {{ copy.primaryAction }}
              </button>
              <NuxtLink class="button-link button-link--secondary" :to="localizedContentPath(locale, 'methodology')">
                {{ shellCopy.methodologyLabel }}
              </NuxtLink>
            </div>
          </form>
        </section>

        <section class="result-panel" aria-live="polite" :aria-labelledby="`${tool.slug}-result`">
          <h2 :id="`${tool.slug}-result`">Result preview</h2>
          <p>{{ previewSubmitted ? copy.previewResult : shellCopy.plannedBody }}</p>
        </section>
      </div>

      <aside class="band" :aria-labelledby="`${tool.slug}-methodology`">
        <h2 :id="`${tool.slug}-methodology`">{{ shellCopy.methodologyLabel }}</h2>
        <ul class="method-list">
          <li v-for="item in copy.methodology" :key="item">{{ item }}</li>
        </ul>
        <dl class="fact-list">
          <div>
            <dt>Free check</dt>
            <dd>{{ tool.freeScope }}</dd>
          </div>
          <div>
            <dt>Upgrade path</dt>
            <dd>{{ tool.upgradeScope }}</dd>
          </div>
        </dl>
      </aside>
    </section>

    <LegalFooter :locale="locale" />
  </main>
</template>
