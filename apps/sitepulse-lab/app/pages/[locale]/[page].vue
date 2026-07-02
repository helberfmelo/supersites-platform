<script setup lang="ts">
import { getShellCopy } from '../../data/copy'
import { localizedContentPath, localizedHomePath, normalizePublicLocale, toHtmlLang } from '../../data/locales'
import { getContentPageBySlug, getContentPageCopy, contentPageCatalog } from '../../data/pages'
import { absoluteUrl, localeAlternates } from '../../data/routes'

const route = useRoute()
const locale = normalizePublicLocale(route.params.locale?.toString())
const page = getContentPageBySlug(route.params.page?.toString())

if (!locale || !page) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}

const copy = getContentPageCopy(page, locale)
const shellCopy = getShellCopy(locale)
const canonicalPath = localizedContentPath(locale, page.slug)
const relatedPages = contentPageCatalog.filter((candidate) => candidate.slug !== page.slug)
const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: copy.title,
  description: copy.description,
  inLanguage: locale,
  dateModified: '2026-06-26',
  url: absoluteUrl(canonicalPath),
  publisher: {
    '@type': 'Organization',
    name: 'SuperSites',
  },
}

useHead({
  htmlAttrs: {
    lang: toHtmlLang(locale),
  },
  title: `${copy.title} | SitePulse Lab`,
  meta: [
    {
      name: 'description',
      content: copy.description,
    },
    {
      property: 'og:title',
      content: `${copy.title} | SitePulse Lab`,
    },
    {
      property: 'og:description',
      content: copy.description,
    },
    {
      property: 'og:type',
      content: 'article',
    },
  ],
  link: [
    { rel: 'canonical', href: absoluteUrl(canonicalPath) },
    ...localeAlternates((targetLocale) => localizedContentPath(targetLocale, page.slug)),
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(articleJsonLd),
    },
  ],
})
</script>

<template>
  <main class="page-shell">
    <SiteHeader
      :locale="locale"
      :path-for-locale="(targetLocale) => localizedContentPath(targetLocale, page.slug)"
    />

    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink :to="localizedHomePath(locale)">{{ shellCopy.breadcrumbHome }}</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ copy.navLabel }}</span>
    </nav>

    <section class="hero content-hero" :aria-labelledby="`${page.slug}-title`">
      <div>
        <p class="eyebrow">SitePulse Lab</p>
        <h1 :id="`${page.slug}-title`">{{ copy.title }}</h1>
        <p class="lead">{{ copy.description }}</p>
      </div>
    </section>

    <section class="content-main" :aria-labelledby="`${page.slug}-content`">
      <div>
        <h2 :id="`${page.slug}-content`">{{ copy.navLabel }}</h2>
        <article v-for="section in copy.sections" :key="section.heading" class="content-section">
          <h3>{{ section.heading }}</h3>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </article>
      </div>
    </section>

    <section class="band content-related" :aria-label="shellCopy.relatedTitle">
      <h2>{{ shellCopy.relatedTitle }}</h2>
      <div class="inline-link-list">
        <NuxtLink
          v-for="relatedPage in relatedPages"
          :key="relatedPage.slug"
          :to="localizedContentPath(locale, relatedPage.slug)"
        >
          {{ getContentPageCopy(relatedPage, locale).navLabel }}
        </NuxtLink>
      </div>
    </section>

    <LegalFooter :locale="locale" :current-slug="page.slug" />
  </main>
</template>
