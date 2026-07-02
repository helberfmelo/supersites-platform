<script setup lang="ts">
import { computed } from 'vue'
import { buildLanguageOptions, type LocaleCode } from '../data/locales'

const props = defineProps<{
  currentLocale: LocaleCode
  pathForLocale: (locale: LocaleCode) => string
}>()

const options = computed(() => buildLanguageOptions(props.currentLocale, props.pathForLocale))

function rememberLocale(locale: LocaleCode): void {
  if (import.meta.client) {
    window.localStorage.setItem('supersites.preferredLocale', locale)
  }
}
</script>

<template>
  <nav class="language-nav" aria-label="Language">
    <NuxtLink
      v-for="option in options"
      :key="option.code"
      :to="option.href"
      :aria-current="option.current ? 'page' : undefined"
      @click="rememberLocale(option.code)"
    >
      {{ option.shortLabel }}
    </NuxtLink>
  </nav>
</template>

