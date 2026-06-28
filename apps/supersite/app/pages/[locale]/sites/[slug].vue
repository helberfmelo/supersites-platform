<script setup lang="ts">
import { getStatusBadgeClass } from '@supersites/ui'
import { getDetailCopy } from '../../../data/copy'
import { localizedHomePath, localizedSitePath, normalizeLocale } from '../../../data/locales'
import { absoluteUrl, localeAlternates } from '../../../data/routes'
import { createSiteDetailStructuredData } from '../../../data/schema'
import { getCategoryLabel, getSiteBySlug, statusLabels } from '../../../data/sites'
import { trackOutboundSiteClick } from '../../../utils/analytics'

const route = useRoute()
const locale = normalizeLocale(route.params.locale?.toString())
const site = getSiteBySlug(route.params.slug?.toString())

if (!locale || !site) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Site not found',
  })
}

const copy = getDetailCopy(locale)
const siteText = site.localized[locale]
const canonicalPath = localizedSitePath(locale, site.slug)
const structuredData = createSiteDetailStructuredData(locale, site)
const isLocalBrowser = ref(false)
const localNetProbeToolsUrl = computed(() => {
  if (!isLocalBrowser.value || site.slug !== 'netprobe-atlas') {
    return ''
  }

  const hostname = window.location.hostname === 'localhost' ? 'localhost' : '127.0.0.1'

  return `http://${hostname}:3002/en/tools/dns-lookup`
})

onMounted(() => {
  isLocalBrowser.value = ['127.0.0.1', 'localhost'].includes(window.location.hostname)
})

function trackPublicSiteClick(): void {
  trackOutboundSiteClick({
    siteSlug: site.slug,
    targetUrl: site.temporaryUrl,
    locale,
    routePath: canonicalPath,
    surface: 'site_detail',
  })
}

useHead({
  htmlAttrs: {
    lang: locale,
  },
  title: `${site.name} | SuperSites`,
  meta: [
    {
      name: 'description',
      content: siteText.summary,
    },
    {
      property: 'og:title',
      content: `${site.name} | SuperSites`,
    },
    {
      property: 'og:description',
      content: siteText.summary,
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
  link: [
    { rel: 'canonical', href: absoluteUrl(canonicalPath) },
    ...localeAlternates((targetLocale) => localizedSitePath(targetLocale, site.slug)),
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
      :path-for-locale="(targetLocale) => localizedSitePath(targetLocale, site.slug)"
    />

    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink :to="localizedHomePath(locale)">{{ copy.breadcrumbHome }}</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ site.name }}</span>
    </nav>

    <section class="hero" :aria-labelledby="`${site.slug}-title`">
      <div>
        <div class="detail-topline">
          <p class="eyebrow">{{ getCategoryLabel(site.category, locale) }}</p>
          <span :class="getStatusBadgeClass(site.status)">
            {{ statusLabels[site.status][locale] }}
          </span>
        </div>
        <h1 :id="`${site.slug}-title`">{{ site.name }}</h1>
        <p class="lead">{{ siteText.headline }}</p>
      </div>

      <aside class="network-panel" :aria-label="copy.detailsTitle">
        <div class="network-panel__row">
          <div>
            <strong>{{ copy.categoryLabel }}</strong>
            <span>{{ getCategoryLabel(site.category, locale) }}</span>
          </div>
          <span class="signal" aria-hidden="true"></span>
        </div>
        <div class="network-panel__row">
          <div>
            <strong>{{ copy.launchOrderLabel }}</strong>
            <span>#{{ site.launchOrder }}</span>
          </div>
          <span class="signal signal--amber" aria-hidden="true"></span>
        </div>
        <div class="network-panel__row">
          <div>
            <strong>{{ copy.temporaryUrlLabel }}</strong>
            <span>{{ site.temporaryUrl }}</span>
          </div>
          <span class="signal" aria-hidden="true"></span>
        </div>
      </aside>
    </section>

    <section class="detail-layout">
      <div>
        <p class="detail-copy">{{ siteText.summary }}</p>

        <section class="detail-section" :aria-labelledby="`${site.slug}-free`">
          <h2 :id="`${site.slug}-free`">{{ copy.freeToolsTitle }}</h2>
          <ul class="check-list">
            <li v-for="tool in site.freeTools" :key="tool">{{ tool }}</li>
          </ul>
        </section>

        <section class="detail-section" :aria-labelledby="`${site.slug}-paid`">
          <h2 :id="`${site.slug}-paid`">{{ copy.paidBenefitsTitle }}</h2>
          <ul class="check-list">
            <li v-for="benefit in site.paidBenefits" :key="benefit">{{ benefit }}</li>
          </ul>
        </section>
      </div>

      <aside class="band" :aria-labelledby="`${site.slug}-quality`">
        <h2 :id="`${site.slug}-quality`">{{ copy.methodologyTitle }}</h2>
        <p>{{ copy.methodologyBody }}</p>
        <dl class="fact-list">
          <div>
            <dt>{{ copy.freeToolsTitle }}</dt>
            <dd>{{ siteText.freeValue }}</dd>
          </div>
          <div>
            <dt>{{ copy.paidBenefitsTitle }}</dt>
            <dd>{{ siteText.upgrade }}</dd>
          </div>
        </dl>
        <div class="detail-actions">
          <NuxtLink class="button-link" :to="localizedHomePath(locale)">
            {{ copy.backToCatalog }}
          </NuxtLink>
          <a
            v-if="localNetProbeToolsUrl"
            class="button-link button-link--secondary"
            :href="localNetProbeToolsUrl"
          >
            {{ copy.localDevCta }}
          </a>
          <a
            class="button-link button-link--secondary"
            :href="site.temporaryUrl"
            @click="trackPublicSiteClick"
          >
            {{ copy.publicCta }}
          </a>
        </div>
      </aside>
    </section>

    <LegalFooter :locale="locale" />
  </main>
</template>
