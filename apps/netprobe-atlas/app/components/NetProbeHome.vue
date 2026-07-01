<script setup lang="ts">
import { computed, ref } from 'vue'
import { getHomeCopy, type HomeCopy } from '../data/copy'
import { localizedContentPath, localizedHomePath, localizedToolPath, toHtmlLang, type LocaleCode } from '../data/locales'
import { absoluteUrl, localeAlternates } from '../data/routes'
import {
  filterTools,
  getCategoryLabel,
  getToolBySlug,
  getToolCopy,
  toolCatalog,
  type ToolCategory,
  type ToolSlug,
} from '../data/tools'

const props = defineProps<{
  locale: LocaleCode
  xDefault?: boolean
}>()

type SupportAction = HomeCopy['supportActions'][number]
type FooterLink = HomeCopy['footerGroups'][number]['links'][number]

const quickToolSlugs: ToolSlug[] = [
  'what-is-my-ip',
  'dns-lookup',
  'dns-propagation',
  'rdap-domain-lookup',
  'ssl-certificate-checker',
  'port-checker',
  'ping-traceroute',
]

const copy = computed(() => getHomeCopy(props.locale))
const router = useRouter()
const diagnosticTarget = ref('')
const searchQuery = ref('')
const selectedCategory = ref<ToolCategory | 'all'>('all')
const filteredTools = computed(() => filterTools(searchQuery.value, selectedCategory.value, props.locale))
const quickTools = computed(() => quickToolSlugs
  .map((slug) => getToolBySlug(slug))
  .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool))
  .map((tool) => ({
    ...tool,
    copy: getToolCopy(tool, props.locale),
    href: localizedToolPath(props.locale, tool.slug),
  })))
const heroTools = computed(() => quickTools.value.slice(0, 4))
const canonicalPath = computed(() => (props.xDefault ? '/' : localizedHomePath(props.locale)))
const categories = computed(() => Array.from(new Set(toolCatalog.map((tool) => tool.category))))
const homeJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'NetProbe Atlas',
  description: copy.value.lead,
  inLanguage: props.locale,
  url: absoluteUrl(canonicalPath.value),
  publisher: {
    '@type': 'Organization',
    name: 'SuperSites',
  },
}))

function openUniversalCheck() {
  void router.push(localizedToolPath(props.locale, 'dns-lookup'))
}

function supportActionPath(action: SupportAction): string {
  if (action.kind === 'content' && action.slug) {
    return localizedContentPath(props.locale, action.slug)
  }

  if (action.kind === 'tool' && action.slug) {
    return localizedToolPath(props.locale, action.slug)
  }

  return localizedHomePath(props.locale)
}

function footerLinkPath(link: FooterLink): string {
  const path = link.kind === 'content'
    ? localizedContentPath(props.locale, link.slug)
    : localizedToolPath(props.locale, link.slug)

  return link.query ? `${path}?${link.query}` : path
}

useHead(() => ({
  htmlAttrs: {
    lang: toHtmlLang(props.locale),
  },
  title: props.xDefault ? 'NetProbe Atlas' : `${copy.value.title} | NetProbe Atlas`,
  meta: [
    {
      name: 'description',
      content: copy.value.lead,
    },
    {
      property: 'og:title',
      content: 'NetProbe Atlas',
    },
    {
      property: 'og:description',
      content: copy.value.lead,
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
</script>

<template>
  <main class="page-shell">
    <SiteHeader :locale="locale" :path-for-locale="localizedHomePath" />

    <section class="hero" aria-labelledby="netprobe-title">
      <div>
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h1 id="netprobe-title">{{ copy.title }}</h1>
        <p class="lead">{{ copy.lead }}</p>
        <form class="diagnostic-search" aria-label="Network diagnostic search" @submit.prevent="openUniversalCheck">
          <label for="diagnostic-target">{{ copy.universalLabel }}</label>
          <div class="diagnostic-search__row">
            <input
              id="diagnostic-target"
              v-model="diagnosticTarget"
              type="search"
              autocomplete="off"
              spellcheck="false"
              :placeholder="copy.universalPlaceholder"
            >
            <button type="submit">{{ copy.universalCta }}</button>
          </div>
          <p>{{ copy.universalHint }}</p>
        </form>
      </div>

      <aside class="diagnostic-panel" aria-labelledby="diagnostic-panel-title">
        <h2 id="diagnostic-panel-title">{{ copy.heroPanelTitle }}</h2>
        <p>{{ copy.heroPanelBody }}</p>
        <div class="diagnostic-panel__links">
          <NuxtLink v-for="tool in heroTools" :key="tool.slug" :to="tool.href">
            {{ tool.copy.navLabel }}
          </NuxtLink>
        </div>
      </aside>
    </section>

    <section class="home-section" aria-labelledby="quick-tools-title">
      <div class="section-heading">
        <p class="eyebrow">{{ copy.quickEyebrow }}</p>
        <h2 id="quick-tools-title">{{ copy.quickTitle }}</h2>
        <p>{{ copy.quickLead }}</p>
      </div>
      <div class="quick-tool-grid">
        <article v-for="tool in quickTools" :key="tool.slug" class="quick-tool-card">
          <span class="quick-tool-card__mark">{{ tool.shortName }}</span>
          <h3>{{ tool.copy.title }}</h3>
          <p>{{ tool.copy.headline }}</p>
          <NuxtLink :to="tool.href">{{ copy.detailCta }}</NuxtLink>
        </article>
      </div>
    </section>

    <section class="home-section" aria-labelledby="diagnostic-finder-title">
      <div class="section-heading">
        <p class="eyebrow">{{ copy.finderEyebrow }}</p>
        <h2 id="diagnostic-finder-title">{{ copy.finderTitle }}</h2>
        <p>{{ copy.finderLead }}</p>
      </div>

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

    <section class="category-tabs" aria-label="Category shortcuts">
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

    <section class="tool-grid" aria-label="NetProbe tools">
      <article v-for="tool in filteredTools" :key="tool.slug" class="tool-card">
        <div>
          <div class="tool-card__topline">
            <span class="category">{{ getCategoryLabel(tool.category, locale) }}</span>
          </div>
          <h2>{{ getToolCopy(tool, locale).title }}</h2>
          <p>{{ getToolCopy(tool, locale).headline }}</p>
          <dl>
            <div>
              <dt>{{ copy.checkLabel }}</dt>
              <dd>{{ getToolCopy(tool, locale).freeScope }}</dd>
            </div>
            <div>
              <dt>{{ copy.exampleLabel }}</dt>
              <dd>{{ getToolCopy(tool, locale).exampleTarget }}</dd>
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

    <section class="support-band" aria-labelledby="support-title">
      <div>
        <h2 id="support-title">{{ copy.supportTitle }}</h2>
        <p>{{ copy.supportBody }}</p>
      </div>
      <div class="support-band__actions">
        <NuxtLink v-for="action in copy.supportActions" :key="action.label" :to="supportActionPath(action)">
          {{ action.label }}
        </NuxtLink>
      </div>
    </section>

    <section class="diagnostic-footer" aria-labelledby="diagnostic-footer-title">
      <div class="diagnostic-footer__intro">
        <h2 id="diagnostic-footer-title">{{ copy.footerTitle }}</h2>
        <p>{{ copy.footerLead }}</p>
      </div>
      <nav class="diagnostic-footer__grid" :aria-label="copy.footerNavLabel">
        <div v-for="group in copy.footerGroups" :key="group.title" class="diagnostic-footer__group">
          <h3>{{ group.title }}</h3>
          <NuxtLink v-for="link in group.links" :key="`${group.title}-${link.label}`" :to="footerLinkPath(link)">
            {{ link.label }}
          </NuxtLink>
        </div>
      </nav>
    </section>

    <MonetizationSafeBlock
      :locale="locale"
      site-slug="netprobe-atlas"
      slot-id="netprobe-home-footer-leaderboard"
    />

    <LegalFooter :locale="locale" />
  </main>
</template>
