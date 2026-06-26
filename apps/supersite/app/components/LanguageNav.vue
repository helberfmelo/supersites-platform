<script setup lang="ts">
import { locales, type LocaleCode } from '../data/locales'

const props = defineProps<{
  currentLocale: LocaleCode
  pathForLocale: (locale: LocaleCode) => string
}>()
</script>

<template>
  <nav class="language-nav" aria-label="Language">
    <NuxtLink
      v-for="locale in locales"
      :key="locale.code"
      :to="props.pathForLocale(locale.code)"
      :aria-current="locale.code === props.currentLocale ? 'page' : undefined"
    >
      {{ locale.shortLabel }}
    </NuxtLink>
  </nav>
</template>
