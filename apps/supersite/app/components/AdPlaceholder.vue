<script setup lang="ts">
import { createAdSlotPlan, type AdFormat, type AdPosition } from '@supersites/ads'
import {
  consentStorageKey,
  createConsentState,
  isConsentRequiredForRegion,
  parseConsentState,
  type ConsentState,
  type PageSurface,
} from '@supersites/consent'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { normalizeLocale, type LocaleCode } from '../data/locales'

const props = withDefaults(defineProps<{
  slotId: string
  siteSlug?: string
  pagePath: string
  surface?: PageSurface
  position?: AdPosition
  format?: AdFormat
  distanceToInteractivePx?: number
}>(), {
  siteSlug: 'supersite',
  surface: 'public-content',
  position: 'footer',
  format: 'leaderboard',
  distanceToInteractivePx: 160,
})

const copyByLocale: Record<LocaleCode, { label: string; title: string; body: string }> = {
  en: {
    label: 'Reserved advertising slot',
    title: 'Reserved ad space',
    body: 'Reserved space only. No ad request runs until consent, AdSense approval and launch checks are complete.',
  },
  'pt-br': {
    label: 'Espaço reservado para anúncio',
    title: 'Espaço de anúncio reservado',
    body: 'Apenas espaço reservado. Nenhuma requisição roda antes de consentimento, aprovação AdSense e revisões de lançamento.',
  },
  es: {
    label: 'Espacio publicitario reservado',
    title: 'Espacio de anuncio reservado',
    body: 'Solo espacio reservado. No se ejecuta ninguna solicitud antes de consentimiento, aprobación de AdSense y revisiones de lanzamiento.',
  },
  fr: {
    label: 'Emplacement publicitaire réservé',
    title: 'Espace publicitaire réservé',
    body: 'Espace réservé seulement. Aucun appel ne part avant consentement, approbation AdSense et revues de lancement.',
  },
  de: {
    label: 'Reservierter Anzeigenplatz',
    title: 'Reservierter Anzeigenbereich',
    body: 'Nur reservierter Platz. Keine Anfrage läuft vor Zustimmung, AdSense-Freigabe und Launch-Prüfungen.',
  },
}

const route = useRoute()
const locale = computed(() => normalizeLocale(route.params.locale?.toString()) ?? 'en')
const copy = computed(() => copyByLocale[locale.value])
const consentState = ref<ConsentState>(createConsentState())

const plan = computed(() => createAdSlotPlan({
  slotId: props.slotId,
  siteSlug: props.siteSlug,
  pagePath: props.pagePath,
  surface: props.surface,
  position: props.position,
  format: props.format,
  hasUsefulContent: true,
  featureFlagEnabled: false,
  deliveryEnabled: false,
  consentRequired: isConsentRequiredForRegion({}),
  hasAdsConsent: consentState.value.ads,
  isInternalTraffic: false,
  distanceToInteractivePx: props.distanceToInteractivePx,
}))

const reservedStyle = computed(() => ({
  minHeight: `${plan.value.reservedStyle.minHeight}px`,
  maxWidth: plan.value.reservedStyle.maxWidth ? `${plan.value.reservedStyle.maxWidth}px` : undefined,
  aspectRatio: plan.value.reservedStyle.aspectRatio,
}))

onMounted(() => {
  consentState.value = parseConsentState(window.localStorage.getItem(consentStorageKey)) ?? createConsentState()
  window.addEventListener('supersites-consent-change', handleConsentChange as EventListener)
})

onBeforeUnmount(() => {
  window.removeEventListener('supersites-consent-change', handleConsentChange as EventListener)
})

function handleConsentChange(event: CustomEvent<ConsentState>): void {
  consentState.value = event.detail
}
</script>

<template>
  <aside
    v-if="plan.shouldRenderPlaceholder"
    class="ad-placeholder"
    :style="reservedStyle"
    :aria-label="copy.label"
    :data-testid="`ad-placeholder-${plan.slotId}`"
    :data-ad-slot-id="plan.slotId"
    :data-ad-status="plan.status"
    :data-ad-policy-version="plan.policyVersion"
  >
    <div class="ad-placeholder__inner">
      <strong>{{ copy.title }}</strong>
      <span>{{ copy.body }}</span>
    </div>
  </aside>
</template>
