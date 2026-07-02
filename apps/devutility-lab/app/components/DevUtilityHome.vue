<script setup lang="ts">
import { limitSeoText, SEO_DESCRIPTION_MAX_LENGTH, SEO_TITLE_MAX_LENGTH } from '@supersites/seo'
import { getStatusBadgeClass } from '@supersites/ui'
import { computed, ref } from 'vue'
import { getHomeCopy } from '../data/copy'
import { localizedHomePath, localizedToolPath, toHtmlLang, type LocaleCode } from '../data/locales'
import { absoluteUrl, localeAlternates } from '../data/routes'
import {
  filterTools,
  getCategoryLabel,
  getToolCopy,
  toolCatalog,
  type ToolCategory,
  type ToolDefinition,
  type ToolSlug,
} from '../data/tools'

const props = defineProps<{
  locale: LocaleCode
  xDefault?: boolean
}>()

const copy = computed(() => getHomeCopy(props.locale))
const searchQuery = ref('')
const selectedCategory = ref<ToolCategory | 'all'>('all')
const filteredTools = computed(() => filterTools(searchQuery.value, selectedCategory.value, props.locale))
const canonicalPath = computed(() => (props.xDefault ? '/' : localizedHomePath(props.locale)))
const categories = computed(() => Array.from(new Set(toolCatalog.map((tool) => tool.category))))
const popularToolSlugs = [
  'structured-data-formatter',
  'base64-converter',
  'jwt-inspector',
  'regex-tester',
  'text-diff',
] satisfies ToolSlug[]
const popularTools = computed(() => toolsBySlug(popularToolSlugs))
const footerGroups = computed(() => [
  { title: 'Developer Tools', tools: toolsBySlug(['structured-data-formatter', 'jwt-inspector', 'cron-helper', 'timestamp-converter']) },
  { title: 'Formatters', tools: toolsBySlug(['structured-data-formatter', 'text-diff']) },
  { title: 'Encoders', tools: toolsBySlug(['base64-converter', 'hash-generator']) },
  { title: 'Validators', tools: toolsBySlug(['structured-data-formatter', 'jwt-inspector', 'regex-tester', 'cron-helper']) },
  { title: 'Generators', tools: toolsBySlug(['uuid-generator', 'hash-generator']) },
  { title: 'Security', tools: toolsBySlug(['jwt-inspector', 'hash-generator', 'base64-converter']) },
])
const seoTitle = computed(() =>
  props.xDefault ? 'DevUtility Lab' : limitSeoText(`${copy.value.title} | DevUtility Lab`, SEO_TITLE_MAX_LENGTH),
)
const seoDescription = computed(() => limitSeoText(copy.value.lead, SEO_DESCRIPTION_MAX_LENGTH))
const homeJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DevUtility Lab',
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

function toolsBySlug(slugs: ToolSlug[]): ToolDefinition[] {
  return slugs
    .map((slug) => toolCatalog.find((tool) => tool.slug === slug))
    .filter((tool): tool is ToolDefinition => Boolean(tool))
}
</script>

<template>
  <main class="page-shell">
    <SiteHeader :locale="locale" :path-for-locale="localizedHomePath" />

    <section class="hero" aria-labelledby="devutility-title">
      <div>
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h1 id="devutility-title">{{ copy.title }}</h1>
        <p class="lead">{{ copy.lead }}</p>
      </div>
    </section>

    <section class="dense-directory" aria-label="Developer utility navigation">
      <div>
        <p class="eyebrow">Popular tools</p>
        <div class="quick-link-grid">
          <NuxtLink
            v-for="tool in popularTools"
            :key="tool.slug"
            :to="localizedToolPath(locale, tool.slug)"
          >
            <strong>{{ getToolCopy(tool, locale).shortName }}</strong>
            <span>{{ getCategoryLabel(tool.category, locale) }}</span>
          </NuxtLink>
        </div>
      </div>
      <div>
        <p class="eyebrow">Find by task</p>
        <div class="quick-link-grid quick-link-grid--compact">
          <button type="button" @click="selectedCategory = 'data'">JSON/XML/YAML/CSV</button>
          <button type="button" @click="selectedCategory = 'encoding'">Base64</button>
          <button type="button" @click="selectedCategory = 'inspection'">JWT</button>
          <button type="button" @click="selectedCategory = 'text'">Regex and diff</button>
          <button type="button" @click="selectedCategory = 'time'">Cron and timestamps</button>
          <button type="button" @click="selectedCategory = 'security'">Hashes</button>
        </div>
      </div>
    </section>

    <DevUtilityWorkbench :locale="locale" />

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

    <section class="tool-grid" aria-label="DevUtility Lab tools">
      <article v-for="tool in filteredTools" :key="tool.slug" class="tool-card">
        <div>
          <div class="tool-card__topline">
            <span class="category">{{ getCategoryLabel(tool.category, locale) }}</span>
            <span :class="getStatusBadgeClass('foundation')">{{ copy.localBadgeLabel }}</span>
          </div>
          <h2>{{ getToolCopy(tool, locale).title }}</h2>
          <p>{{ getToolCopy(tool, locale).headline }}</p>
          <dl>
            <div>
              <dt>{{ copy.freeLabel }}</dt>
              <dd>{{ getToolCopy(tool, locale).freeScope }}</dd>
            </div>
            <div>
              <dt>{{ copy.upgradeLabel }}</dt>
              <dd>{{ getToolCopy(tool, locale).upgradeScope }}</dd>
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

    <section class="tool-footer-groups" aria-label="DevUtility Lab footer tool groups">
      <div v-for="group in footerGroups" :key="group.title">
        <h2>{{ group.title }}</h2>
        <NuxtLink
          v-for="tool in group.tools"
          :key="tool.slug"
          :to="localizedToolPath(locale, tool.slug)"
        >
          {{ getToolCopy(tool, locale).shortName }}
        </NuxtLink>
      </div>
    </section>

    <MonetizationSafeBlock
      :locale="locale"
      site-slug="devutility-lab"
      slot-id="devutility-home-footer-leaderboard"
    />

    <LegalFooter :locale="locale" />
  </main>
</template>
