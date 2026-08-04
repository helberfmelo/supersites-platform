<script setup lang="ts">
import { limitSeoText, SEO_DESCRIPTION_MAX_LENGTH, SEO_TITLE_MAX_LENGTH } from '@supersites/seo'
import {
  guideCatalog,
  guideLandingCopy,
  guideLocales,
  isGuideLocale,
  localizedGuideIndexPath,
  localizedGuidePath,
} from '../../../data/guides'
import { localizedHomePath, normalizeLocale, toHreflang } from '../../../data/locales'
import { absoluteUrl } from '../../../data/routes'
import { createGuideLandingStructuredData } from '../../../data/schema'

const route = useRoute()
const normalizedLocale = normalizeLocale(route.params.locale?.toString())

if (!normalizedLocale || !isGuideLocale(normalizedLocale)) {
  throw createError({ statusCode: 404, statusMessage: 'Guides not available in this language' })
}

const locale = normalizedLocale
const copy = guideLandingCopy[locale]
const canonicalPath = localizedGuideIndexPath(locale)
const seoTitle = limitSeoText(`${copy.title} | SuperSites`, SEO_TITLE_MAX_LENGTH)
const seoDescription = limitSeoText(copy.description, SEO_DESCRIPTION_MAX_LENGTH)
const alternates = [
  { rel: 'alternate', hreflang: 'x-default', href: absoluteUrl(localizedGuideIndexPath('en')) },
  ...guideLocales.map((targetLocale) => ({
    rel: 'alternate',
    hreflang: toHreflang(targetLocale),
    href: absoluteUrl(localizedGuideIndexPath(targetLocale)),
  })),
]

useHead({
  htmlAttrs: { lang: locale },
  title: seoTitle,
  meta: [
    { name: 'description', content: seoDescription },
    { property: 'og:title', content: seoTitle },
    { property: 'og:description', content: seoDescription },
    { property: 'og:type', content: 'website' },
  ],
  link: [{ rel: 'canonical', href: absoluteUrl(canonicalPath) }, ...alternates],
  script: createGuideLandingStructuredData(locale, copy.title, copy.description).map((item) => ({
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
      :path-for-locale="(targetLocale) => localizedGuideIndexPath(isGuideLocale(targetLocale) ? targetLocale : 'en')"
    />

    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink :to="localizedHomePath(locale)">SuperSites</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ locale === 'pt-br' ? 'Guias' : 'Guides' }}</span>
    </nav>

    <section class="hero content-hero guide-landing-hero" aria-labelledby="guides-title">
      <div>
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h1 id="guides-title">{{ copy.title }}</h1>
        <p class="lead">{{ copy.intro }}</p>
      </div>
      <aside class="guide-principle-card">
        <strong>{{ locale === 'pt-br' ? 'Escolha pelo problema' : 'Choose by problem' }}</strong>
        <p>{{ locale === 'pt-br' ? 'Encontre orientações para DNS, e-mail, sites, desenvolvimento, QR codes, imagens e PDFs.' : 'Find practical help for DNS, email, websites, development, QR codes, images and PDFs.' }}</p>
      </aside>
    </section>

    <section class="guide-card-grid" :aria-label="copy.title">
      <article v-for="guide in guideCatalog" :key="guide.slug" class="guide-card">
        <p class="eyebrow">{{ guide.localized[locale].eyebrow }}</p>
        <h2>{{ guide.localized[locale].title }}</h2>
        <p>{{ guide.localized[locale].description }}</p>
        <div class="guide-meta">
          <span>{{ copy.reviewedLabel }} {{ guide.reviewedAt }}</span>
          <span>{{ guide.readingMinutes }} {{ copy.readingLabel }}</span>
        </div>
        <NuxtLink class="button-link" :to="localizedGuidePath(locale, guide.slug)">
          {{ copy.cardCta }}
        </NuxtLink>
      </article>
    </section>

    <LegalFooter :locale="locale" />
  </main>
</template>
