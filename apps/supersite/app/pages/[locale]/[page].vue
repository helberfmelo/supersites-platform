<script setup lang="ts">
import { limitSeoText, SEO_DESCRIPTION_MAX_LENGTH, SEO_TITLE_MAX_LENGTH } from '@supersites/seo'
import {
  legalPageCatalog,
  getLegalPageBySlug,
  getLegalPageCopy,
  getLegalShellCopy,
  type LegalPanelRow,
} from '../../data/legal'
import { localizedHomePath, localizedLegalPath, normalizeLocale } from '../../data/locales'
import { absoluteUrl, localeAlternates } from '../../data/routes'
import { createLegalPageStructuredData } from '../../data/schema'

const route = useRoute()
const locale = normalizeLocale(route.params.locale?.toString())
const page = getLegalPageBySlug(route.params.page?.toString())

if (!locale || !page) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}

const copy = getLegalPageCopy(page, locale)
const shellCopy = getLegalShellCopy(locale)
const canonicalPath = localizedLegalPath(locale, page.slug)
const structuredData = createLegalPageStructuredData(locale, page, copy)
const seoTitle = limitSeoText(`${copy.title} | SuperSites`, SEO_TITLE_MAX_LENGTH)
const seoDescription = limitSeoText(copy.description, SEO_DESCRIPTION_MAX_LENGTH)
const panelRows: LegalPanelRow[] = copy.panelRows ?? [
  {
    title: copy.updatedLabel,
    body: copy.navLabel,
    tone: 'green',
  },
  {
    title: shellCopy.launchGateTitle,
    body: shellCopy.launchGateBody,
    tone: 'amber',
  },
]
const relatedPages = legalPageCatalog
  .filter((candidate) => candidate.slug !== page.slug)
  .map((candidate) => ({
    slug: candidate.slug,
    navLabel: getLegalPageCopy(candidate, locale).navLabel,
  }))

function handleContentLinkClick(href: string, event: MouseEvent): void {
  if (href !== '#consent-preferences') {
    return
  }

  event.preventDefault()

  if (import.meta.client) {
    window.dispatchEvent(new CustomEvent('supersites-open-consent-preferences'))
  }
}

useHead({
  htmlAttrs: {
    lang: locale,
  },
  title: seoTitle,
  meta: [
    {
      name: 'description',
      content: seoDescription,
    },
    {
      property: 'og:title',
      content: seoTitle,
    },
    {
      property: 'og:description',
      content: seoDescription,
    },
    {
      property: 'og:type',
      content: 'article',
    },
  ],
  link: [
    { rel: 'canonical', href: absoluteUrl(canonicalPath) },
    ...localeAlternates((targetLocale) => localizedLegalPath(targetLocale, page.slug)),
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
      :path-for-locale="(targetLocale) => localizedLegalPath(targetLocale, page.slug)"
    />

    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink :to="localizedHomePath(locale)">{{ shellCopy.breadcrumbHome }}</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ copy.navLabel }}</span>
    </nav>

    <section class="hero content-hero" :aria-labelledby="`${page.slug}-title`">
      <div>
        <p class="eyebrow">SuperSites</p>
        <h1 :id="`${page.slug}-title`">{{ copy.title }}</h1>
        <p class="lead">{{ copy.description }}</p>
      </div>

      <aside class="network-panel" :aria-label="shellCopy.pageStatusLabel">
        <div v-for="row in panelRows" :key="row.title" class="network-panel__row">
          <div>
            <strong>{{ row.title }}</strong>
            <span>{{ row.body }}</span>
          </div>
          <span :class="['signal', { 'signal--amber': row.tone === 'amber' }]" aria-hidden="true"></span>
        </div>
      </aside>
    </section>

    <section class="content-layout" :aria-labelledby="`${page.slug}-content`">
      <div>
        <h2 :id="`${page.slug}-content`">{{ copy.navLabel }}</h2>
        <article v-for="section in copy.sections" :key="section.heading" class="content-section">
          <h3>{{ section.heading }}</h3>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <div v-if="section.links?.length" class="content-link-list">
            <a
              v-for="link in section.links"
              :key="link.href"
              :href="link.href"
              @click="handleContentLinkClick(link.href, $event)"
            >
              <strong>{{ link.label }}</strong>
              <span>{{ link.note }}</span>
            </a>
          </div>
        </article>
      </div>

      <aside class="band content-side" :aria-label="shellCopy.relatedTitle">
        <h2>{{ shellCopy.relatedTitle }}</h2>
        <div class="inline-link-list">
          <NuxtLink
            v-for="relatedPage in relatedPages"
            :key="relatedPage.slug"
            :to="localizedLegalPath(locale, relatedPage.slug)"
          >
            {{ relatedPage.navLabel }}
          </NuxtLink>
        </div>
      </aside>
    </section>

    <LegalFooter :locale="locale" :current-slug="page.slug" />
  </main>
</template>
