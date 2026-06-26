<script setup lang="ts">
import { normalizePublicLocale } from '../../data/locales'

const route = useRoute()
const locale = normalizePublicLocale(route.params.locale?.toString())

if (!locale) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Locale not found',
  })
}
</script>

<template>
  <TimeNexusHome :locale="locale" />
</template>
