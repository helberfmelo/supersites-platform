<script setup lang="ts">
import { getShellCopy } from '../../data/copy'
import { getContentPageBySlug, getContentPageCopy } from '../../data/pages'
import { localizedContentPath, localizedHomePath, normalizePublicLocale, toHtmlLang } from '../../data/locales'
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
const pageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: copy.title,
  description: copy.description,
  inLanguage: locale,
  dateModified: '2026-06-28',
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
  title: `${copy.title} | InvoiceCraft`,
  meta: [
    {
      name: 'description',
      content: copy.description,
    },
    {
      property: 'og:title',
      content: `${copy.title} | InvoiceCraft`,
    },
    {
      property: 'og:description',
      content: copy.description,
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
  link: [
    { rel: 'canonical', href: absoluteUrl(canonicalPath) },
    ...localeAlternates((targetLocale) => localizedContentPath(targetLocale, page.slug)),
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(pageJsonLd),
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
        <p class="eyebrow">{{ copy.navLabel }}</p>
        <h1 :id="`${page.slug}-title`">{{ copy.title }}</h1>
        <p class="lead">{{ copy.description }}</p>
      </div>
    </section>

    <section class="content-main">
      <div>
        <article v-for="section in copy.sections" :key="section.heading" class="content-section">
          <h2>{{ section.heading }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </article>
      </div>
    </section>

    <section class="band content-related" aria-label="Related policy links">
      <h2>{{ shellCopy.relatedTitle }}</h2>
      <div class="inline-link-list">
        <NuxtLink v-if="page.slug !== 'methodology'" :to="localizedContentPath(locale, 'methodology')">
          {{ shellCopy.methodologyLabel }}
        </NuxtLink>
        <NuxtLink v-if="page.slug !== 'editorial-policy'" :to="localizedContentPath(locale, 'editorial-policy')">
          {{ shellCopy.editorialLabel }}
        </NuxtLink>
      </div>
    </section>

    <LegalFooter :locale="locale" :current-slug="page.slug" />
  </main>
</template>
