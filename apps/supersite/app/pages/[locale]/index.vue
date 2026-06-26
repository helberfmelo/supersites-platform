<script setup lang="ts">
import { normalizeLocale } from '../../data/locales'

const route = useRoute()
const locale = normalizeLocale(route.params.locale?.toString())

if (!locale) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Locale not found',
  })
}
</script>

<template>
  <CatalogHome :locale="locale" />
</template>
