<script setup lang="ts">
import { contentPageCatalog, getContentPageCopy, type ContentPageSlug } from '../data/pages'
import { localizedContentPath, type LocaleCode } from '../data/locales'

defineProps<{
  locale: LocaleCode
  currentSlug?: ContentPageSlug
}>()
</script>

<template>
  <footer class="page-footer">
    <NuxtLink class="page-footer__brand" :to="`/${locale}`">NetProbe Atlas</NuxtLink>
    <nav class="page-footer__links" aria-label="Legal and editorial pages">
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
