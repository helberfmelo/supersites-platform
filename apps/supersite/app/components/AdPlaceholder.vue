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
    label: 'Advertising space',
    title: 'Advertising space',
    body: 'Reserved placement. No ad is loaded from this page area.',
  },
  'pt-br': {
    label: 'Espaço publicitário',
    title: 'Espaço publicitário',
    body: 'Área reservada. Nenhum anúncio é carregado a partir deste espaço.',
  },
  es: {
    label: 'Espacio publicitario',
    title: 'Espacio publicitario',
    body: 'Área reservada. No se carga ningún anuncio desde este espacio.',
  },
  fr: {
    label: 'Espace publicitaire',
    title: 'Espace publicitaire',
    body: 'Emplacement réservé. Aucune annonce n’est chargée depuis cet espace.',
  },
  de: {
    label: 'Werbefläche',
    title: 'Werbefläche',
    body: 'Reservierter Bereich. Aus diesem Bereich wird keine Anzeige geladen.',
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
