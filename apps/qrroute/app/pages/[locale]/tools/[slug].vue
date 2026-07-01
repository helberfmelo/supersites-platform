<script setup lang="ts">
import { onMounted } from 'vue'
import { getShellCopy } from '../../../data/copy'
import {
  createQrRouteToolStructuredData,
  getCategoryLabel,
  getRelatedQrRouteTools,
  getQrRouteToolBySlug,
  getQrRouteToolCopy,
} from '../../../data/tools'
import { localizedContentPath, localizedHomePath, localizedToolPath, normalizePublicLocale, toHtmlLang } from '../../../data/locales'
import { absoluteUrl, localeAlternates } from '../../../data/routes'
import { trackQRRouteEvent } from '../../../utils/analytics'

const route = useRoute()
const locale = normalizePublicLocale(route.params.locale?.toString())
const tool = getQrRouteToolBySlug(route.params.slug?.toString())

if (!locale || !tool) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Tool not found',
  })
}

const copy = getQrRouteToolCopy(tool, locale)
const shellCopy = getShellCopy(locale)
const canonicalPath = localizedToolPath(locale, tool.slug)
const structuredData = createQrRouteToolStructuredData(tool, locale, absoluteUrl(canonicalPath))
const relatedTools = getRelatedQrRouteTools(tool)

onMounted(() => {
  trackQRRouteEvent({
    toolSlug: tool.slug,
    locale,
    routePath: canonicalPath,
  }, 'tool_viewed')
})

useHead({
  htmlAttrs: {
    lang: toHtmlLang(locale),
  },
  title: `${copy.title} | QRRoute`,
  meta: [
    {
      name: 'description',
      content: copy.headline,
    },
    {
      property: 'og:title',
      content: `${copy.title} | QRRoute`,
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
          <span class="status">{{ shellCopy.localBadgeLabel }}</span>
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
            <strong>{{ shellCopy.advancedTitle }}</strong>
            <span>{{ shellCopy.advancedBody }}</span>
          </div>
          <span class="signal signal--amber" aria-hidden="true"></span>
        </div>
      </aside>
    </section>

    <QRRouteWorkbench :locale="locale" :initial-slug="tool.slug" />

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
          <strong>{{ getQrRouteToolCopy(relatedTool, locale).title }}</strong>
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
