<script setup lang="ts">
import { computed } from 'vue'
import { localizedHomePath, type LocaleCode } from '../data/locales'

const props = defineProps<{
  locale: LocaleCode
  pathForLocale?: (locale: LocaleCode) => string
}>()

const languagePathFactory = computed(() => props.pathForLocale ?? localizedHomePath)
</script>

<template>
  <header class="site-header">
    <NuxtLink class="brand-link" :to="localizedHomePath(locale)">
      <span class="brand-mark" aria-hidden="true">NA</span>
      <span>NetProbe Atlas</span>
    </NuxtLink>
    <LanguageNav :current-locale="locale" :path-for-locale="languagePathFactory" />
  </header>
</template>
