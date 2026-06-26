<script setup lang="ts">
import { legalPageCatalog, type LegalPageSlug } from '../data/legal'
import { localizedLegalPath, type LocaleCode } from '../data/locales'

defineProps<{
  locale: LocaleCode
  currentSlug?: LegalPageSlug
}>()
</script>

<template>
  <footer class="page-footer">
    <NuxtLink class="page-footer__brand" :to="`/${locale}`">SuperSites</NuxtLink>
    <nav class="page-footer__links" aria-label="Legal and editorial pages">
      <NuxtLink
        v-for="page in legalPageCatalog"
        :key="page.slug"
        :to="localizedLegalPath(locale, page.slug)"
        :aria-current="currentSlug === page.slug ? 'page' : undefined"
      >
        {{ page.localized[locale].navLabel }}
      </NuxtLink>
    </nav>
  </footer>
</template>
