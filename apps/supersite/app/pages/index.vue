<script setup lang="ts">
import { onMounted } from 'vue'
import { localeCodes, localizedHomePath, type LocaleCode } from '../data/locales'

const router = useRouter()

onMounted(() => {
  const storedLocale = window.localStorage.getItem('supersites.preferredLocale') as LocaleCode | null

  if (storedLocale && storedLocale !== 'en' && localeCodes.includes(storedLocale)) {
    void router.replace(localizedHomePath(storedLocale))
  }
})
</script>

<template>
  <CatalogHome locale="en" x-default />
</template>
