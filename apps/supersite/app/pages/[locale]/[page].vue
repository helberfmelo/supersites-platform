<script setup lang="ts">
import { legalPageCatalog, getLegalPageBySlug, getLegalPageCopy, getLegalShellCopy } from '../../data/legal'
import { localizedHomePath, localizedLegalPath, normalizeLocale } from '../../data/locales'
import { absoluteUrl, localeAlternates } from '../../data/routes'

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
const relatedPages = legalPageCatalog
  .filter((candidate) => candidate.slug !== page.slug)
  .map((candidate) => ({
    slug: candidate.slug,
    navLabel: getLegalPageCopy(candidate, locale).navLabel,
  }))

useHead({
  htmlAttrs: {
    lang: locale,
  },
  title: `${copy.title} | SuperSites`,
  meta: [
    {
      name: 'description',
      content: copy.description,
    },
    {
      property: 'og:title',
      content: `${copy.title} | SuperSites`,
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
    ...localeAlternates((targetLocale) => localizedLegalPath(targetLocale, page.slug)),
  ],
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
        <div class="network-panel__row">
          <div>
            <strong>{{ copy.updatedLabel }}</strong>
            <span>{{ copy.navLabel }}</span>
          </div>
          <span class="signal" aria-hidden="true"></span>
        </div>
        <div class="network-panel__row">
          <div>
            <strong>{{ shellCopy.launchGateTitle }}</strong>
            <span>{{ shellCopy.launchGateBody }}</span>
          </div>
          <span class="signal signal--amber" aria-hidden="true"></span>
        </div>
      </aside>
    </section>

    <section class="content-layout" :aria-labelledby="`${page.slug}-content`">
      <div>
        <h2 :id="`${page.slug}-content`">{{ copy.navLabel }}</h2>
        <article v-for="section in copy.sections" :key="section.heading" class="content-section">
          <h3>{{ section.heading }}</h3>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
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
