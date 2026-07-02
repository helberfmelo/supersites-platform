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
      <span class="brand-mark" aria-hidden="true">TN</span>
      <span>TimeNexus</span>
    </NuxtLink>
    <div class="site-header__actions">
      <SupportDonationCta :locale="locale" variant="header" />
      <LanguageNav :current-locale="locale" :path-for-locale="languagePathFactory" />
    </div>
  </header>
</template>

<style scoped>
.site-header__actions {
  display: flex;
  min-width: 0;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
}

@media (max-width: 720px) {
  .site-header__actions {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
