<script setup lang="ts">
import { onMounted } from 'vue'
import { localizedHomePath, publicLocaleCodes, type LocaleCode } from '../data/locales'

const router = useRouter()

onMounted(() => {
  const storedLocale = window.localStorage.getItem('supersites.preferredLocale') as LocaleCode | null

  if (storedLocale && storedLocale !== 'en' && publicLocaleCodes.includes(storedLocale)) {
    void router.replace(localizedHomePath(storedLocale))
  }
})
</script>

<template>
  <PixelBatchHome locale="en" x-default />
</template>

