<script setup lang="ts">
import { getShellCopy } from '../../../../data/copy'
import {
  localizedCityTimePath,
  localizedContentPath,
  localizedHomePath,
  normalizePublicLocale,
  toHtmlLang,
} from '../../../../data/locales'
import {
  buildCityBusinessTimeline,
  buildCityOverlapSnapshot,
  getCityTimePageBySlug,
  getCityTimePageCopy,
} from '../../../../data/cityPages'
import { absoluteUrl, localeAlternates } from '../../../../data/routes'
import type { PlannerZoneResult } from '../../../../data/tools'

const route = useRoute()
const locale = normalizePublicLocale(route.params.locale?.toString())
const cityPage = getCityTimePageBySlug(route.params.city?.toString())

if (!locale || !cityPage) {
  throw createError({
    statusCode: 404,
    statusMessage: 'City time page not found',
  })
}

const copy = getCityTimePageCopy(cityPage, locale)
const shellCopy = getShellCopy(locale)
const canonicalPath = localizedCityTimePath(locale, cityPage.slug)
const timeline = buildCityBusinessTimeline(cityPage, locale)
const overlap = buildCityOverlapSnapshot(cityPage, locale)
const cityJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: copy.title,
  description: copy.description,
  url: absoluteUrl(canonicalPath),
  inLanguage: locale,
  about: {
    '@type': 'Place',
    name: cityPage.city,
    address: {
      '@type': 'PostalAddress',
      addressCountry: cityPage.country,
    },
  },
  publisher: {
    '@type': 'Organization',
    name: 'SuperSites',
  },
}

function statusLabel(status: PlannerZoneResult['businessStatus']): string {
  if (status === 'business') {
    return locale === 'pt-br'
      ? 'Horario comercial'
      : locale === 'es'
        ? 'Horario laboral'
        : locale === 'fr'
          ? 'Heures ouvrables'
          : locale === 'de'
            ? 'Arbeitszeit'
            : 'Business hours'
  }

  if (status === 'early') {
    return locale === 'pt-br'
      ? 'Cedo'
      : locale === 'es'
        ? 'Temprano'
        : locale === 'fr'
          ? 'Tot'
          : locale === 'de'
            ? 'Frueh'
            : 'Early'
  }

  return locale === 'pt-br'
    ? 'Tarde'
    : locale === 'es'
      ? 'Tarde'
      : locale === 'fr'
        ? 'Tard'
        : locale === 'de'
          ? 'Spaet'
          : 'Late'
}

function statusClass(status: PlannerZoneResult['businessStatus']): string {
  return `time-status time-status--${status}`
}

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
    ...localeAlternates((targetLocale) => localizedCityTimePath(targetLocale, cityPage.slug)),
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(cityJsonLd),
    },
  ],
})
</script>

<template>
  <main class="page-shell">
    <SiteHeader
      :locale="locale"
      :path-for-locale="(targetLocale) => localizedCityTimePath(targetLocale, cityPage.slug)"
    />

    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink :to="localizedHomePath(locale)">{{ shellCopy.breadcrumbHome }}</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ copy.navLabel }}</span>
    </nav>

    <section class="hero content-hero" :aria-labelledby="`${cityPage.slug}-title`">
      <div>
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h1 :id="`${cityPage.slug}-title`">{{ copy.title }}</h1>
        <p class="lead">{{ copy.description }}</p>
        <dl class="hero-facts" :aria-label="copy.navLabel">
          <div>
            <dt>{{ copy.zoneLabel }}</dt>
            <dd>{{ cityPage.timeZone }}</dd>
          </div>
          <div>
            <dt>{{ copy.countryLabel }}</dt>
            <dd>{{ cityPage.country }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <TimeNexusPlanner :locale="locale" :initial-group="cityPage.primaryGroup" />

    <section class="city-depth-grid" aria-labelledby="city-depth-title">
      <div>
        <h2 id="city-depth-title">{{ copy.timelineTitle }}</h2>
        <ol class="city-timeline">
          <li v-for="item in timeline" :key="`${item.label}-${item.utcTime}`" class="city-timeline__item">
            <div>
              <strong>{{ item.label }}</strong>
              <span>{{ item.note }}</span>
            </div>
            <div>
              <strong>{{ item.localTime }}</strong>
              <span>{{ item.utcTime }}</span>
            </div>
          </li>
        </ol>
      </div>

      <aside class="band" :aria-label="copy.overlapTitle">
        <h2>{{ copy.overlapTitle }}</h2>
        <div class="city-overlap-grid">
          <div v-for="zone in overlap" :key="zone.zone" class="city-overlap-card">
            <strong>{{ zone.label }}</strong>
            <span>{{ zone.localTime }}</span>
            <small>{{ zone.zone }}</small>
            <span :class="statusClass(zone.businessStatus)">
              {{ statusLabel(zone.businessStatus) }}
            </span>
          </div>
        </div>
      </aside>
    </section>

    <section class="content-layout">
      <div>
        <article v-for="section in copy.sections" :key="section.heading" class="content-section">
          <h2>{{ section.heading }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </article>
      </div>

      <aside class="band" aria-label="Related TimeNexus links">
        <h2>{{ shellCopy.guideTitle }}</h2>
        <p>{{ copy.plannerTitle }}</p>
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
