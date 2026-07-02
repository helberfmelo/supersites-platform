<script setup lang="ts">
import { getShellCopy } from '../../../data/copy'
import { localizedContentPath, localizedHomePath, localizedWorldClockPath, normalizePublicLocale, toHtmlLang } from '../../../data/locales'
import { getPlannerPageBySlug, getPlannerPageCopy } from '../../../data/plannerPages'
import { absoluteUrl, localeAlternates } from '../../../data/routes'

const route = useRoute()
const locale = normalizePublicLocale(route.params.locale?.toString())
const plannerPage = getPlannerPageBySlug(route.params.group?.toString())

if (!locale || !plannerPage) {
  throw createError({
    statusCode: 404,
    statusMessage: 'World clock page not found',
  })
}

const copy = getPlannerPageCopy(plannerPage, locale)
const shellCopy = getShellCopy(locale)
const canonicalPath = localizedWorldClockPath(locale, plannerPage.slug)

useHead({
  htmlAttrs: {
    lang: toHtmlLang(locale),
  },
  title: `${copy.title} | TimeNexus`,
  meta: [
    {
      name: 'description',
      content: copy.description,
    },
    {
      property: 'og:title',
      content: `${copy.title} | TimeNexus`,
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
    ...localeAlternates((targetLocale) => localizedWorldClockPath(targetLocale, plannerPage.slug)),
  ],
})
</script>

<template>
  <main class="page-shell">
    <SiteHeader
      :locale="locale"
      :path-for-locale="(targetLocale) => localizedWorldClockPath(targetLocale, plannerPage.slug)"
    />

    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink :to="localizedHomePath(locale)">{{ shellCopy.breadcrumbHome }}</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ copy.navLabel }}</span>
    </nav>

    <section class="hero content-hero" :aria-labelledby="`${plannerPage.slug}-title`">
      <div>
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h1 :id="`${plannerPage.slug}-title`">{{ copy.title }}</h1>
        <p class="lead">{{ copy.description }}</p>
      </div>
    </section>

    <TimeNexusPlanner :locale="locale" :initial-group="plannerPage.slug" />

    <section class="content-layout">
      <div>
        <article v-for="section in copy.sections" :key="section.heading" class="content-section">
          <h2>{{ section.heading }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </article>
      </div>

      <aside class="band" aria-label="Related TimeNexus links">
        <h2>{{ shellCopy.guideTitle }}</h2>
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
