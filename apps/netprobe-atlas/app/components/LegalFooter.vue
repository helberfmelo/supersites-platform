<script setup lang="ts">
import { contentPageCatalog, getContentPageCopy, type ContentPageSlug } from '../data/pages'
import { localizedContentPath, type LocaleCode } from '../data/locales'

defineProps<{
  locale: LocaleCode
  currentSlug?: ContentPageSlug
}>()

const superSitesHomeLabels: Record<LocaleCode, string> = {
  en: 'SuperSites home',
  'pt-br': 'Inicio SuperSites',
  es: 'Inicio SuperSites',
  fr: 'Accueil SuperSites',
  de: 'SuperSites Start',
}

function superSitesHomePath(locale: LocaleCode): string {
  return `/supersites/${locale}`
}
</script>

<template>
  <footer class="page-footer">
    <NuxtLink class="page-footer__brand" :to="`/${locale}`">NetProbe Atlas</NuxtLink>
    <nav class="page-footer__links" aria-label="Legal and editorial pages">
      <a :href="superSitesHomePath(locale)">{{ superSitesHomeLabels[locale] }}</a>
      <NuxtLink
        v-for="page in contentPageCatalog"
        :key="page.slug"
        :to="localizedContentPath(locale, page.slug)"
        :aria-current="currentSlug === page.slug ? 'page' : undefined"
      >
        {{ getContentPageCopy(page, locale).navLabel }}
      </NuxtLink>
    </nav>
  </footer>
</template>
