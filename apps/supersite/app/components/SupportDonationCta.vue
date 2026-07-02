<script setup lang="ts">
import { computed, ref } from 'vue'
import type { LocaleCode } from '../data/locales'

const props = withDefaults(defineProps<{
  locale: LocaleCode
  variant?: 'header' | 'footer' | 'support'
  siteSlug?: string
}>(), {
  variant: 'header',
  siteSlug: 'supersite',
})

type DonationCopy = {
  label: string
  loadingLabel: string
  note: string
  error: string
  title: string
}

const checkoutEndpoint = '/supersites/control-plane/api/v1/billing/stripe/checkout-sessions'
const isLoading = ref(false)
const detailsVisible = ref(false)
const statusMessage = ref('')

const copyByLocale: Record<LocaleCode, DonationCopy> = {
  en: {
    label: 'Donate',
    loadingLabel: 'Opening...',
    note: 'Opening Stripe Checkout for an optional donation.',
    error: 'Could not open checkout right now. Please try again shortly.',
    title: 'Optional support for the free SuperSites tools',
  },
  'pt-br': {
    label: 'Doar',
    loadingLabel: 'Abrindo...',
    note: 'Abrindo o checkout da Stripe para uma doacao opcional.',
    error: 'Nao foi possivel abrir o checkout agora. Tente novamente em instantes.',
    title: 'Apoio opcional para as ferramentas gratuitas SuperSites',
  },
  es: {
    label: 'Donar',
    loadingLabel: 'Abriendo...',
    note: 'Abriendo Stripe Checkout para una donacion opcional.',
    error: 'No se pudo abrir el checkout ahora. Intentalo de nuevo en unos instantes.',
    title: 'Apoyo opcional para las herramientas gratis de SuperSites',
  },
  fr: {
    label: 'Donner',
    loadingLabel: 'Ouverture...',
    note: 'Ouverture du checkout Stripe pour un don optionnel.',
    error: 'Impossible d ouvrir le checkout maintenant. Reessayez dans un instant.',
    title: 'Soutien optionnel pour les outils gratuits SuperSites',
  },
  de: {
    label: 'Spenden',
    loadingLabel: 'Oeffnet...',
    note: 'Stripe Checkout fuer eine optionale Spende wird geoeffnet.',
    error: 'Checkout konnte gerade nicht geoeffnet werden. Bitte versuchen Sie es gleich erneut.',
    title: 'Optionale Unterstuetzung fuer die kostenlosen SuperSites-Tools',
  },
}

const defaultDonationByLocale: Record<LocaleCode, { amountMinor: number; currency: 'USD' | 'BRL' | 'EUR' }> = {
  en: { amountMinor: 1000, currency: 'USD' },
  'pt-br': { amountMinor: 2500, currency: 'BRL' },
  es: { amountMinor: 1000, currency: 'EUR' },
  fr: { amountMinor: 1000, currency: 'EUR' },
  de: { amountMinor: 1000, currency: 'EUR' },
}

const copy = computed(() => copyByLocale[props.locale])
const donation = computed(() => defaultDonationByLocale[props.locale])
const statusId = computed(() => `donation-cta-${props.siteSlug}-${props.variant}-${props.locale}`)
const shouldShowNote = computed(() => detailsVisible.value && statusMessage.value !== '')
const buttonLabel = computed(() => isLoading.value ? copy.value.loadingLabel : copy.value.label)
const donationStatus = computed(() => isLoading.value ? 'checkout-loading' : 'checkout-live')

function currentReturnPath(): string {
  if (typeof window === 'undefined') {
    return props.siteSlug === 'supersite'
      ? `/supersites/${props.locale}`
      : `/supersites/${props.siteSlug}/${props.locale}`
  }

  return `${window.location.pathname}${window.location.search}`
}

async function startDonation(): Promise<void> {
  if (isLoading.value) {
    return
  }

  isLoading.value = true
  detailsVisible.value = true
  statusMessage.value = copy.value.note

  try {
    const response = await fetch(checkoutEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        kind: 'donation',
        site_slug: props.siteSlug,
        locale: props.locale,
        amount_minor: donation.value.amountMinor,
        currency: donation.value.currency,
        return_path: currentReturnPath(),
      }),
    })
    const payload = await response.json().catch(() => null)
    const checkoutUrl = payload?.data?.checkout_url

    if (response.ok && typeof checkoutUrl === 'string' && checkoutUrl.startsWith('https://checkout.stripe.com/')) {
      window.location.assign(checkoutUrl)
      return
    }

    throw new Error('checkout_unavailable')
  } catch {
    statusMessage.value = copy.value.error
    isLoading.value = false
  }
}
</script>

<template>
  <div
    class="donation-cta"
    :class="`donation-cta--${variant}`"
    :data-donation-status="donationStatus"
  >
    <button
      type="button"
      class="donation-cta__button"
      :title="copy.title"
      :aria-busy="isLoading"
      :aria-controls="statusId"
      :disabled="isLoading"
      @click="startDonation"
    >
      <svg class="donation-cta__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 21s-7.1-4.35-9.25-8.4C.72 8.76 2.8 4.5 6.65 4.5c2.05 0 3.43 1.05 4.22 2.08C11.08 6.86 11.9 6.86 12.1 6.58 12.9 5.55 14.3 4.5 16.35 4.5c3.85 0 5.93 4.26 3.9 8.1C19.1 16.65 12 21 12 21Z" />
      </svg>
      <span>{{ buttonLabel }}</span>
    </button>
    <p v-if="shouldShowNote" :id="statusId" class="donation-cta__note">{{ statusMessage }}</p>
    <span v-else :id="statusId" class="donation-cta__sr-only">{{ copy.note }}</span>
  </div>
</template>

<style scoped>
.donation-cta {
  position: relative;
  display: inline-flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
}

.donation-cta__button {
  display: inline-flex;
  min-height: 36px;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.5rem 0.8rem;
  border: 1px solid #9a6a00;
  border-radius: 8px;
  color: #17211d;
  background: linear-gradient(180deg, #ffd76a 0%, #f3b21a 100%);
  box-shadow: 0 8px 18px rgba(154, 106, 0, 0.18);
  cursor: pointer;
  font-size: 0.86rem;
  font-weight: 900;
  line-height: 1;
  text-decoration: none;
}

.donation-cta__button:hover,
.donation-cta__button:focus-visible {
  border-color: #6f4b00;
  background: linear-gradient(180deg, #ffe08a 0%, #eaa409 100%);
}

.donation-cta__button:disabled {
  cursor: wait;
  opacity: 0.82;
}

.donation-cta__icon {
  width: 1rem;
  height: 1rem;
  flex: 0 0 auto;
  fill: currentColor;
}

.donation-cta__note {
  width: min(260px, calc(100vw - 48px));
  margin: 0;
  padding: 0.55rem 0.65rem;
  border: 1px solid rgba(154, 106, 0, 0.22);
  border-radius: 8px;
  color: #55410a;
  background: #fff8df;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1.35;
}

.donation-cta--header .donation-cta__note {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 20;
}

.donation-cta--footer,
.donation-cta--support {
  width: fit-content;
}

.donation-cta--support {
  margin-top: 1rem;
}

.donation-cta__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 720px) {
  .donation-cta__button {
    min-height: 34px;
    padding: 0.48rem 0.68rem;
    font-size: 0.82rem;
  }

  .donation-cta--header .donation-cta__note {
    right: auto;
    left: 0;
  }
}
</style>
