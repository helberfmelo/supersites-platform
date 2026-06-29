<script setup lang="ts">
import { getPixelBatchAdvancedWorkflowCopy } from '../../../data/advancedWorkflows'
import { getShellCopy } from '../../../data/copy'
import {
  createPixelBatchToolStructuredData,
  getCategoryLabel,
  getPixelBatchToolBySlug,
  getPixelBatchToolCopy,
} from '../../../data/tools'
import { localizedContentPath, localizedHomePath, localizedToolPath, normalizePublicLocale, toHtmlLang } from '../../../data/locales'
import { absoluteUrl, localeAlternates } from '../../../data/routes'

const route = useRoute()
const locale = normalizePublicLocale(route.params.locale?.toString())
const tool = getPixelBatchToolBySlug(route.params.slug?.toString())

if (!locale || !tool) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Tool not found',
  })
}

const copy = getPixelBatchToolCopy(tool, locale)
const shellCopy = getShellCopy(locale)
const advancedCopy = getPixelBatchAdvancedWorkflowCopy(locale)
const canonicalPath = localizedToolPath(locale, tool.slug)
const structuredData = createPixelBatchToolStructuredData(tool, locale, absoluteUrl(canonicalPath))

useHead({
  htmlAttrs: {
    lang: toHtmlLang(locale),
  },
  title: `${copy.title} | PixelBatch`,
  meta: [
    {
      name: 'description',
      content: copy.headline,
    },
    {
      property: 'og:title',
      content: `${copy.title} | PixelBatch`,
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

    <section class="hero hero--compact" :aria-labelledby="`${tool.slug}-title`">
      <div>
        <div class="detail-topline">
          <p class="eyebrow">{{ getCategoryLabel(tool.category, locale) }}</p>
          <span class="status">{{ shellCopy.liveTitle }}</span>
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

    <PixelBatchWorkbench :locale="locale" :initial-slug="tool.slug" track-view />

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

    <section class="band advanced-workflow-band" :aria-labelledby="`${tool.slug}-advanced`">
      <h2 :id="`${tool.slug}-advanced`">{{ advancedCopy.title }}</h2>
      <p>{{ advancedCopy.body }}</p>
      <div class="readiness-grid">
        <article v-for="item in advancedCopy.items" :key="item.title" class="readiness-card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.body }}</p>
          <dl class="readiness-list">
            <div>
              <dt>{{ advancedCopy.currentLabel }}</dt>
              <dd>{{ item.current }}</dd>
            </div>
            <div>
              <dt>{{ advancedCopy.dataLabel }}</dt>
              <dd>{{ item.data }}</dd>
            </div>
            <div>
              <dt>{{ advancedCopy.gateLabel }}</dt>
              <dd>{{ item.gate }}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>

    <LegalFooter :locale="locale" />
  </main>
</template>
