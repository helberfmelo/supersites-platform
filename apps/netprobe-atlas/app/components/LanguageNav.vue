<script setup lang="ts">
import { computed } from 'vue'
import { buildLanguageOptions, publicLocaleCodes, type LocaleCode } from '../data/locales'

const props = defineProps<{
  currentLocale: LocaleCode
  pathForLocale: (locale: LocaleCode) => string
}>()

const languageOptions = computed(() => buildLanguageOptions(props.currentLocale, props.pathForLocale).filter((option) => publicLocaleCodes.includes(option.code)))

function languageAriaLabel(locale: { label: string; shortLabel: string }): string {
  return `${locale.label} (${locale.shortLabel})`
}

function rememberLocale(locale: LocaleCode): void {
  if (import.meta.client) {
    window.localStorage.setItem('supersites.preferredLocale', locale)
  }
}
</script>

<template>
  <nav class="language-nav" aria-label="Language">
    <NuxtLink
      v-for="locale in languageOptions"
      :key="locale.code"
      :to="locale.href"
      :aria-label="languageAriaLabel(locale)"
      :aria-current="locale.current ? 'page' : undefined"
      @click="rememberLocale(locale.code)"
    >
      {{ locale.shortLabel }}
    </NuxtLink>
  </nav>
</template>
