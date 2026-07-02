<script setup lang="ts">
import { limitSeoText, SEO_DESCRIPTION_MAX_LENGTH, SEO_TITLE_MAX_LENGTH } from '@supersites/seo'
import { getStatusBadgeClass } from '@supersites/ui'
import { computed, ref } from 'vue'
import { getHomeCopy } from '../data/copy'
import { localizedContentPath, localizedHomePath, localizedToolPath, toHtmlLang, type LocaleCode } from '../data/locales'
import { absoluteUrl, localeAlternates } from '../data/routes'
import {
  filterQrRouteTools,
  getCategoryLabel,
  getQrRouteToolBySlug,
  getQrRouteToolCopy,
  qrRouteToolCatalog,
  type QrRouteToolCategory,
} from '../data/tools'

const props = defineProps<{
  locale: LocaleCode
  xDefault?: boolean
}>()

const copy = computed(() => getHomeCopy(props.locale))
const searchQuery = ref('')
const selectedCategory = ref<QrRouteToolCategory | 'all'>('all')
const filteredTools = computed(() => filterQrRouteTools(searchQuery.value, selectedCategory.value, props.locale))
const canonicalPath = computed(() => (props.xDefault ? '/' : localizedHomePath(props.locale)))
const categories = computed(() => Array.from(new Set(qrRouteToolCatalog.map((tool) => tool.category))))
const footerLabels: Record<LocaleCode, {
  qrTools: string
  barcodeTools: string
  utmTools: string
  guides: string
  methodology: string
  privacy: string
  terms: string
}> = {
  en: {
    qrTools: 'QR Tools',
    barcodeTools: 'Barcode Tools',
    utmTools: 'UTM Tools',
    guides: 'Guides',
    methodology: 'Methodology',
    privacy: 'Privacy',
    terms: 'Terms',
  },
  'pt-br': {
    qrTools: 'Ferramentas QR',
    barcodeTools: 'Ferramentas de barcode',
    utmTools: 'Ferramentas UTM',
    guides: 'Guias',
    methodology: 'Metodologia',
    privacy: 'Privacidade',
    terms: 'Termos',
  },
  es: {
    qrTools: 'Herramientas QR',
    barcodeTools: 'Herramientas de codigo',
    utmTools: 'Herramientas UTM',
    guides: 'Guias',
    methodology: 'Metodologia',
    privacy: 'Privacidad',
    terms: 'Terminos',
  },
  fr: {
    qrTools: 'Outils QR',
    barcodeTools: 'Outils code-barres',
    utmTools: 'Outils UTM',
    guides: 'Guides',
    methodology: 'Methodologie',
    privacy: 'Confidentialite',
    terms: 'Conditions',
  },
  de: {
    qrTools: 'QR-Tools',
    barcodeTools: 'Barcode-Tools',
    utmTools: 'UTM-Tools',
    guides: 'Leitfaeden',
    methodology: 'Methodik',
    privacy: 'Datenschutz',
    terms: 'Bedingungen',
  },
}
const footerCopy = computed(() => footerLabels[props.locale])
const seoTitle = computed(() =>
  props.xDefault ? 'QRRoute' : limitSeoText(`${copy.value.title} | QRRoute`, SEO_TITLE_MAX_LENGTH),
)
const seoDescription = computed(() => limitSeoText(copy.value.lead, SEO_DESCRIPTION_MAX_LENGTH))
const homeJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'QRRoute',
  description: copy.value.lead,
  inLanguage: props.locale,
  url: absoluteUrl(canonicalPath.value),
  publisher: {
    '@type': 'Organization',
    name: 'SuperSites',
  },
}))

useHead(() => ({
  htmlAttrs: {
    lang: toHtmlLang(props.locale),
  },
  title: seoTitle.value,
  meta: [
    {
      name: 'description',
      content: seoDescription.value,
    },
    {
      property: 'og:title',
      content: seoTitle.value,
    },
    {
      property: 'og:description',
      content: seoDescription.value,
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
  link: [
    { rel: 'canonical', href: absoluteUrl(canonicalPath.value) },
    ...localeAlternates(localizedHomePath),
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(homeJsonLd.value),
    },
  ],
}))

function toolLabel(slug: string): string {
  const tool = getQrRouteToolBySlug(slug)

  return tool ? getQrRouteToolCopy(tool, props.locale).title : slug
}
</script>

<template>
  <main class="page-shell">
    <SiteHeader :locale="locale" :path-for-locale="localizedHomePath" />

    <section class="hero" aria-labelledby="qrroute-title">
      <div>
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h1 id="qrroute-title">{{ copy.title }}</h1>
        <p class="lead">{{ copy.lead }}</p>
      </div>
    </section>

    <QRRouteWorkbench :locale="locale" initial-slug="static-qr-code" />

    <section class="controls" aria-label="Tool controls">
      <div class="field">
        <label for="tool-search">{{ copy.searchLabel }}</label>
        <input id="tool-search" v-model="searchQuery" type="search" :placeholder="copy.searchPlaceholder">
      </div>
      <div class="field">
        <label for="tool-category">{{ copy.categoryLabel }}</label>
        <select id="tool-category" v-model="selectedCategory">
          <option value="all">{{ copy.allCategories }}</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ getCategoryLabel(category, locale) }}
          </option>
        </select>
      </div>
    </section>

    <section class="category-tabs" aria-label="Tool categories">
      <button type="button" :aria-pressed="selectedCategory === 'all'" @click="selectedCategory = 'all'">
        {{ copy.allCategories }}
      </button>
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        :aria-pressed="selectedCategory === category"
        @click="selectedCategory = category"
      >
        {{ getCategoryLabel(category, locale) }}
      </button>
    </section>

    <section class="tool-grid" aria-label="QRRoute tools">
      <article v-for="tool in filteredTools" :key="tool.slug" class="tool-card">
        <div>
          <div class="tool-card__topline">
            <span class="category">{{ getCategoryLabel(tool.category, locale) }}</span>
            <span :class="getStatusBadgeClass('foundation')">{{ copy.localBadgeLabel }}</span>
          </div>
          <h2>{{ getQrRouteToolCopy(tool, locale).title }}</h2>
          <p>{{ getQrRouteToolCopy(tool, locale).headline }}</p>
          <dl>
            <div>
              <dt>{{ copy.freeLabel }}</dt>
              <dd>{{ getQrRouteToolCopy(tool, locale).freeScope }}</dd>
            </div>
            <div>
              <dt>{{ copy.upgradeLabel }}</dt>
              <dd>{{ getQrRouteToolCopy(tool, locale).upgradeScope }}</dd>
            </div>
          </dl>
        </div>
        <div class="card-actions">
          <NuxtLink class="button-link" :to="localizedToolPath(locale, tool.slug)">
            {{ copy.detailCta }}
          </NuxtLink>
        </div>
      </article>
    </section>

    <section v-if="filteredTools.length === 0" class="band" aria-live="polite">
      <h2>{{ copy.noResultsTitle }}</h2>
      <p>{{ copy.noResultsBody }}</p>
    </section>

    <section class="band" aria-labelledby="principles-title">
      <h2 id="principles-title">{{ copy.principlesTitle }}</h2>
      <div class="band-grid">
        <div v-for="principle in copy.principles" :key="principle.title">
          <h3>{{ principle.title }}</h3>
          <p>{{ principle.body }}</p>
        </div>
      </div>
    </section>

    <section class="band support-band" aria-labelledby="support-title">
      <div>
        <h2 id="support-title">{{ copy.supportTitle }}</h2>
        <p>{{ copy.supportBody }}</p>
      </div>
      <span class="button-link button-link--secondary" aria-disabled="true">{{ copy.supportCta }}</span>
    </section>

    <MonetizationSafeBlock
      :locale="locale"
      site-slug="qrroute"
      slot-id="qrroute-home-footer-leaderboard"
    />

    <section class="context-footer" aria-label="QRRoute workflow links">
      <div>
        <h2>{{ footerCopy.qrTools }}</h2>
        <NuxtLink :to="localizedToolPath(locale, 'static-qr-code')">
          {{ toolLabel('static-qr-code') }}
        </NuxtLink>
        <NuxtLink :to="localizedToolPath(locale, 'preview-lab')">
          {{ toolLabel('preview-lab') }}
        </NuxtLink>
        <NuxtLink :to="localizedToolPath(locale, 'vcard-qr')">
          {{ toolLabel('vcard-qr') }}
        </NuxtLink>
        <NuxtLink :to="localizedToolPath(locale, 'wifi-qr')">
          {{ toolLabel('wifi-qr') }}
        </NuxtLink>
      </div>
      <div>
        <h3>{{ footerCopy.barcodeTools }}</h3>
        <NuxtLink :to="localizedToolPath(locale, 'barcode-generator')">
          {{ toolLabel('barcode-generator') }}
        </NuxtLink>
      </div>
      <div>
        <h3>{{ footerCopy.utmTools }}</h3>
        <NuxtLink :to="localizedToolPath(locale, 'utm-builder')">
          {{ toolLabel('utm-builder') }}
        </NuxtLink>
      </div>
      <div>
        <h3>{{ footerCopy.guides }}</h3>
        <NuxtLink :to="localizedContentPath(locale, 'methodology')">
          {{ footerCopy.methodology }}
        </NuxtLink>
        <NuxtLink :to="localizedContentPath(locale, 'privacy')">
          {{ footerCopy.privacy }}
        </NuxtLink>
        <NuxtLink :to="localizedContentPath(locale, 'terms')">
          {{ footerCopy.terms }}
        </NuxtLink>
      </div>
    </section>

    <LegalFooter :locale="locale" />
  </main>
</template>
