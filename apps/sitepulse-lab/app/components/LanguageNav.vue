<script setup lang="ts">
import { computed } from 'vue'
import { buildLanguageOptions, publicLocaleCodes, type LocaleCode } from '../data/locales'

const props = defineProps<{
  currentLocale: LocaleCode
  pathForLocale: (locale: LocaleCode) => string
}>()

const languageOptions = computed(() => buildLanguageOptions(props.currentLocale, props.pathForLocale).filter((option) => publicLocaleCodes.includes(option.code)))
</script>

<template>
  <nav class="language-nav" aria-label="Language">
    <NuxtLink
      v-for="locale in languageOptions"
      :key="locale.code"
      :to="locale.href"
      :aria-label="locale.label"
      :aria-current="locale.current ? 'page' : undefined"
    >
      {{ locale.shortLabel }}
    </NuxtLink>
  </nav>
</template>
