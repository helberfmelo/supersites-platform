<script setup lang="ts">
import { limitSeoText, SEO_DESCRIPTION_MAX_LENGTH, SEO_TITLE_MAX_LENGTH } from '@supersites/seo'
import {
  getGuideBySlug,
  guideCatalog,
  guideLocales,
  guideLandingCopy,
  isGuideLocale,
  localizedGuideIndexPath,
  localizedGuidePath,
} from '../../../data/guides'
import { localizedHomePath, normalizeLocale, toHreflang } from '../../../data/locales'
import { absoluteUrl } from '../../../data/routes'
import { createGuideStructuredData } from '../../../data/schema'

const route = useRoute()
const normalizedLocale = normalizeLocale(route.params.locale?.toString())
const guide = getGuideBySlug(route.params.slug?.toString() ?? '')

if (!normalizedLocale || !isGuideLocale(normalizedLocale) || !guide) {
  throw createError({ statusCode: 404, statusMessage: 'Guide not found' })
}

const locale = normalizedLocale
const copy = guide.localized[locale]
const landingCopy = guideLandingCopy[locale]
const canonicalPath = localizedGuidePath(locale, guide.slug)
const seoTitle = limitSeoText(`${copy.title} | SuperSites`, SEO_TITLE_MAX_LENGTH)
const seoDescription = limitSeoText(copy.description, SEO_DESCRIPTION_MAX_LENGTH)
const relatedGuides = guideCatalog.filter((candidate) => candidate.slug !== guide.slug).slice(0, 3)
const alternates = [
  { rel: 'alternate', hreflang: 'x-default', href: absoluteUrl(localizedGuidePath('en', guide.slug)) },
  ...guideLocales.map((targetLocale) => ({
    rel: 'alternate',
    hreflang: toHreflang(targetLocale),
    href: absoluteUrl(localizedGuidePath(targetLocale, guide.slug)),
  })),
]

useHead({
  htmlAttrs: { lang: locale },
  title: seoTitle,
  meta: [
    { name: 'description', content: seoDescription },
    { property: 'og:title', content: seoTitle },
    { property: 'og:description', content: seoDescription },
    { property: 'og:type', content: 'article' },
    { property: 'article:modified_time', content: guide.reviewedAt },
  ],
  link: [{ rel: 'canonical', href: absoluteUrl(canonicalPath) }, ...alternates],
  script: createGuideStructuredData(locale, guide, copy).map((item) => ({
    type: 'application/ld+json',
    innerHTML: JSON.stringify(item),
  })),
})
</script>

<template>
  <main class="page-shell">
    <SiteHeader
      :locale="locale"
      :available-locales="guideLocales"
      :path-for-locale="(targetLocale) => localizedGuidePath(isGuideLocale(targetLocale) ? targetLocale : 'en', guide.slug)"
    />

    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink :to="localizedHomePath(locale)">SuperSites</NuxtLink>
      <span aria-hidden="true">/</span>
      <NuxtLink :to="localizedGuideIndexPath(locale)">{{ locale === 'pt-br' ? 'Guias' : 'Guides' }}</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ copy.eyebrow }}</span>
    </nav>

    <article class="guide-article">
      <header class="hero content-hero guide-hero">
        <div>
          <p class="eyebrow">{{ copy.eyebrow }}</p>
          <h1>{{ copy.title }}</h1>
          <p class="lead">{{ copy.description }}</p>
          <div class="guide-byline">
            <strong>SuperSites Editorial</strong>
            <span>{{ landingCopy.reviewedLabel }} {{ guide.reviewedAt }}</span>
            <span>{{ guide.readingMinutes }} {{ landingCopy.readingLabel }}</span>
          </div>
        </div>
      </header>

      <section class="guide-summary" :aria-label="locale === 'pt-br' ? 'Resumo' : 'Summary'">
        <h2>{{ locale === 'pt-br' ? 'Em resumo' : 'In short' }}</h2>
        <p>{{ copy.summary }}</p>
        <ul class="check-list">
          <li v-for="takeaway in copy.takeaways" :key="takeaway">{{ takeaway }}</li>
        </ul>
      </section>

      <section class="guide-body">
        <section v-for="section in copy.sections" :key="section.heading" class="content-section">
          <h2>{{ section.heading }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <ul v-if="section.checklist" class="check-list guide-checklist">
            <li v-for="item in section.checklist" :key="item">{{ item }}</li>
          </ul>
        </section>
      </section>

      <section class="guide-resources" :aria-labelledby="`tools-${guide.slug}`">
        <div class="section-heading">
          <p class="eyebrow">{{ locale === 'pt-br' ? 'Próximo passo' : 'Next step' }}</p>
          <h2 :id="`tools-${guide.slug}`">{{ locale === 'pt-br' ? 'Verifique o seu caso' : 'Check your own case' }}</h2>
        </div>
        <div class="content-link-list">
          <a v-for="tool in copy.relatedTools" :key="tool.href" :href="tool.href">
            <strong>{{ tool.label }}</strong>
            <span>{{ tool.note }}</span>
          </a>
        </div>
      </section>

      <section class="guide-faq" :aria-labelledby="`faq-${guide.slug}`">
        <h2 :id="`faq-${guide.slug}`">{{ locale === 'pt-br' ? 'Perguntas frequentes' : 'Frequently asked questions' }}</h2>
        <details v-for="item in copy.faq" :key="item.question">
          <summary>{{ item.question }}</summary>
          <p>{{ item.answer }}</p>
        </details>
      </section>

      <section class="guide-sources" :aria-labelledby="`sources-${guide.slug}`">
        <h2 :id="`sources-${guide.slug}`">{{ locale === 'pt-br' ? 'Fontes primárias e referência' : 'Primary sources and reference' }}</h2>
        <p>{{ locale === 'pt-br' ? 'Fontes consultadas na revisão editorial. Links externos abrem a publicação responsável pelo padrão ou orientação.' : 'Sources consulted during editorial review. External links open the organization responsible for the standard or guidance.' }}</p>
        <div class="content-link-list">
          <a v-for="source in copy.sources" :key="source.href" :href="source.href" rel="noopener noreferrer">
            <strong>{{ source.label }}</strong>
            <span>{{ source.publisher }} — {{ source.note }}</span>
          </a>
        </div>
      </section>
    </article>

    <section class="band content-related" :aria-label="locale === 'pt-br' ? 'Guias relacionados' : 'Related guides'">
      <h2>{{ locale === 'pt-br' ? 'Continue aprendendo' : 'Keep learning' }}</h2>
      <div class="inline-link-list">
        <NuxtLink v-for="related in relatedGuides" :key="related.slug" :to="localizedGuidePath(locale, related.slug)">
          {{ related.localized[locale].title }}
        </NuxtLink>
      </div>
    </section>

    <LegalFooter :locale="locale" />
  </main>
</template>
