<script setup lang="ts">
import { getStatusBadgeClass } from '@supersites/ui'
import { computed, ref } from 'vue'
import { getHomeCopy } from '../data/copy'
import { localizedHomePath, localizedToolPath, type LocaleCode } from '../data/locales'
import { absoluteUrl, localeAlternates } from '../data/routes'
import { categoryLabels, filterTools, getToolCopy, toolCatalog, type ToolCategory } from '../data/tools'

const props = defineProps<{
  locale: LocaleCode
  xDefault?: boolean
}>()

const copy = computed(() => getHomeCopy(props.locale))
const searchQuery = ref('')
const selectedCategory = ref<ToolCategory | 'all'>('all')
const filteredTools = computed(() => filterTools(searchQuery.value, selectedCategory.value))
const canonicalPath = computed(() => (props.xDefault ? '/' : localizedHomePath(props.locale)))
const categories = computed(() => Array.from(new Set(toolCatalog.map((tool) => tool.category))))

useHead(() => ({
  htmlAttrs: {
    lang: props.locale,
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
      </div>

      <aside class="status-panel" aria-label="Launch status">
        <div v-for="row in copy.statusRows" :key="row.title" class="status-panel__row">
          <div>
            <strong>{{ row.title }}</strong>
            <span>{{ row.body }}</span>
          </div>
          <span :class="['signal', row.tone === 'amber' ? 'signal--amber' : '']" aria-hidden="true"></span>
        </div>
      </aside>
    </section>

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
            {{ categoryLabels[category] }}
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
        {{ categoryLabels[category] }}
      </button>
    </section>

    <section class="tool-grid" aria-label="NetProbe tools">
      <article v-for="tool in filteredTools" :key="tool.slug" class="tool-card">
        <div>
          <div class="tool-card__topline">
            <span class="category">{{ categoryLabels[tool.category] }}</span>
            <span :class="[...getStatusBadgeClass('foundation'), tool.statusLabel === 'Planned' ? 'status--info' : '']">
              {{ tool.statusLabel }}
            </span>
          </div>
          <h2>{{ getToolCopy(tool, locale).title }}</h2>
          <p>{{ getToolCopy(tool, locale).headline }}</p>
          <dl>
            <div>
              <dt>{{ copy.freeLabel }}</dt>
              <dd>{{ tool.freeScope }}</dd>
            </div>
            <div>
              <dt>{{ copy.upgradeLabel }}</dt>
              <dd>{{ tool.upgradeScope }}</dd>
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

    <LegalFooter :locale="locale" />
  </main>
</template>
