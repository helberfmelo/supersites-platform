<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { LocaleCode } from '../data/locales'

const props = withDefaults(defineProps<{
  locale: LocaleCode
  variant?: 'header' | 'footer' | 'support'
  siteSlug?: string
}>(), {
  variant: 'header',
  siteSlug: 'timenexus',
})

type DonationCurrency = 'USD' | 'BRL' | 'EUR'

type DonationCopy = {
  label: string
  loadingLabel: string
  note: string
  error: string
  title: string
  panelEyebrow: string
  panelTitle: string
  panelSubtitle: string
  amountLabel: string
  currencyLabel: string
  continueLabel: string
  closeLabel: string
  cancelLabel: string
  securityTitle: string
  policyTitle: string
  footerPrefix: string
  poweredBy: string
  validation: string
  trustItems: string[]
  policyItems: string[]
  links: {
    terms: string
    privacy: string
    contact: string
  }
}

const checkoutEndpoint = '/supersites/control-plane/api/v1/billing/stripe/checkout-sessions'
const currencies: DonationCurrency[] = ['USD', 'BRL', 'EUR']
const defaultCurrencyByLocale: Record<LocaleCode, DonationCurrency> = {
  en: 'USD',
  'pt-br': 'BRL',
  es: 'EUR',
  fr: 'EUR',
  de: 'EUR',
}
const defaultMajorByCurrency: Record<DonationCurrency, number> = {
  USD: 20,
  BRL: 100,
  EUR: 20,
}
const minMajorByCurrency: Record<DonationCurrency, number> = {
  USD: 1,
  BRL: 5,
  EUR: 1,
}
const maxMajorByCurrency: Record<DonationCurrency, number> = {
  USD: 5000,
  BRL: 5000,
  EUR: 5000,
}

const isLoading = ref(false)
const checkoutVisible = ref(false)
const detailsVisible = ref(false)
const statusMessage = ref('')
const selectedCurrency = ref<DonationCurrency>(defaultCurrencyByLocale[props.locale])
const amountMajor = ref(String(defaultMajorByCurrency[selectedCurrency.value]))

const copyByLocale: Record<LocaleCode, DonationCopy> = {
  en: {
    label: 'Donate',
    loadingLabel: 'Opening...',
    note: 'Choose an amount before Stripe Checkout opens.',
    error: 'Could not open checkout right now. Please try again shortly.',
    title: 'Optional support for the free SuperSites tools',
    panelEyebrow: 'Secure optional support',
    panelTitle: 'Support the free SuperSites tools',
    panelSubtitle: 'Choose the amount and currency, then continue to Stripe for card details. The free tools stay available without donation.',
    amountLabel: 'Amount',
    currencyLabel: 'Currency',
    continueLabel: 'Continue to secure payment',
    closeLabel: 'Close donation checkout',
    cancelLabel: 'Back to page',
    securityTitle: 'Before you continue',
    policyTitle: 'Donation policy',
    footerPrefix: 'Open Tecnologia e Servicos Ltda.',
    poweredBy: 'Payment handled by Stripe. SuperSites does not receive card data.',
    validation: 'Enter an amount within the allowed range for this currency.',
    trustItems: [
      'No SuperSites account is required.',
      'Card data is collected only by Stripe.',
      'A donation does not buy priority, features, SLA or legal advice.',
    ],
    policyItems: [
      'Donations are voluntary support for maintaining free public tools.',
      'They are not tax-deductible unless local law and your own records say otherwise.',
      'If you sent the wrong amount or need help, contact us with the Stripe receipt id.',
    ],
    links: {
      terms: 'Terms',
      privacy: 'Privacy',
      contact: 'Contact',
    },
  },
  'pt-br': {
    label: 'Doar',
    loadingLabel: 'Abrindo...',
    note: 'Escolha valor e moeda antes de abrir o checkout da Stripe.',
    error: 'Nao foi possivel abrir o checkout agora. Tente novamente em instantes.',
    title: 'Apoio opcional para as ferramentas gratuitas SuperSites',
    panelEyebrow: 'Apoio opcional seguro',
    panelTitle: 'Apoie as ferramentas gratuitas SuperSites',
    panelSubtitle: 'Escolha o valor e a moeda, depois continue para a Stripe inserir os dados de pagamento. As ferramentas gratuitas continuam disponiveis sem doacao.',
    amountLabel: 'Valor',
    currencyLabel: 'Moeda',
    continueLabel: 'Continuar para pagamento seguro',
    closeLabel: 'Fechar checkout de doacao',
    cancelLabel: 'Voltar para a pagina',
    securityTitle: 'Antes de continuar',
    policyTitle: 'Politica de doacao',
    footerPrefix: 'Open Tecnologia e Servicos Ltda.',
    poweredBy: 'Pagamento processado pela Stripe. O SuperSites nao recebe dados do cartao.',
    validation: 'Informe um valor dentro do limite permitido para esta moeda.',
    trustItems: [
      'Nenhuma conta SuperSites e obrigatoria.',
      'Dados do cartao sao coletados somente pela Stripe.',
      'A doacao nao compra prioridade, recursos, SLA ou consultoria juridica.',
    ],
    policyItems: [
      'Doacoes sao apoio voluntario para manter ferramentas publicas gratuitas.',
      'Elas nao sao dedutiveis de imposto salvo quando sua lei local e seus registros permitirem.',
      'Se enviou valor errado ou precisa de ajuda, fale conosco com o id do recibo Stripe.',
    ],
    links: {
      terms: 'Termos',
      privacy: 'Privacidade',
      contact: 'Contato',
    },
  },
  es: {
    label: 'Donar',
    loadingLabel: 'Abriendo...',
    note: 'Elige importe y moneda antes de abrir Stripe Checkout.',
    error: 'No se pudo abrir el checkout ahora. Intentalo de nuevo en unos instantes.',
    title: 'Apoyo opcional para las herramientas gratis de SuperSites',
    panelEyebrow: 'Apoyo opcional seguro',
    panelTitle: 'Apoya las herramientas gratis de SuperSites',
    panelSubtitle: 'Elige importe y moneda, luego continua a Stripe para introducir los datos de pago. Las herramientas gratis siguen disponibles sin donar.',
    amountLabel: 'Importe',
    currencyLabel: 'Moneda',
    continueLabel: 'Continuar al pago seguro',
    closeLabel: 'Cerrar checkout de donacion',
    cancelLabel: 'Volver a la pagina',
    securityTitle: 'Antes de continuar',
    policyTitle: 'Politica de donacion',
    footerPrefix: 'Open Tecnologia e Servicos Ltda.',
    poweredBy: 'Pago procesado por Stripe. SuperSites no recibe datos de tarjeta.',
    validation: 'Introduce un importe dentro del rango permitido para esta moneda.',
    trustItems: [
      'No necesitas cuenta SuperSites.',
      'Los datos de tarjeta los recopila solo Stripe.',
      'La donacion no compra prioridad, funciones, SLA ni asesoria legal.',
    ],
    policyItems: [
      'Las donaciones son apoyo voluntario para mantener herramientas publicas gratis.',
      'No son deducibles de impuestos salvo que tu ley local y tus registros lo permitan.',
      'Si enviaste un importe incorrecto o necesitas ayuda, contactanos con el recibo de Stripe.',
    ],
    links: {
      terms: 'Terminos',
      privacy: 'Privacidad',
      contact: 'Contacto',
    },
  },
  fr: {
    label: 'Donner',
    loadingLabel: 'Ouverture...',
    note: 'Choisissez le montant et la devise avant Stripe Checkout.',
    error: 'Impossible d ouvrir le checkout maintenant. Reessayez dans un instant.',
    title: 'Soutien optionnel pour les outils gratuits SuperSites',
    panelEyebrow: 'Soutien optionnel securise',
    panelTitle: 'Soutenir les outils gratuits SuperSites',
    panelSubtitle: 'Choisissez montant et devise, puis continuez vers Stripe pour les donnees de paiement. Les outils gratuits restent disponibles sans don.',
    amountLabel: 'Montant',
    currencyLabel: 'Devise',
    continueLabel: 'Continuer vers le paiement securise',
    closeLabel: 'Fermer le checkout de don',
    cancelLabel: 'Retour a la page',
    securityTitle: 'Avant de continuer',
    policyTitle: 'Politique de don',
    footerPrefix: 'Open Tecnologia e Servicos Ltda.',
    poweredBy: 'Paiement traite par Stripe. SuperSites ne recoit pas les donnees de carte.',
    validation: 'Saisissez un montant dans la limite autorisee pour cette devise.',
    trustItems: [
      'Aucun compte SuperSites n est requis.',
      'Les donnees de carte sont collectees uniquement par Stripe.',
      'Le don n achete pas priorite, fonctions, SLA ou conseil juridique.',
    ],
    policyItems: [
      'Les dons soutiennent volontairement les outils publics gratuits.',
      'Ils ne sont pas deductibles fiscalement sauf si votre droit local et vos dossiers le permettent.',
      'Pour une erreur de montant ou une demande d aide, contactez-nous avec le recu Stripe.',
    ],
    links: {
      terms: 'Conditions',
      privacy: 'Confidentialite',
      contact: 'Contact',
    },
  },
  de: {
    label: 'Spenden',
    loadingLabel: 'Oeffnet...',
    note: 'Betrag und Waehrung vor Stripe Checkout waehlen.',
    error: 'Checkout konnte gerade nicht geoeffnet werden. Bitte versuchen Sie es gleich erneut.',
    title: 'Optionale Unterstuetzung fuer die kostenlosen SuperSites-Tools',
    panelEyebrow: 'Sichere optionale Unterstuetzung',
    panelTitle: 'Kostenlose SuperSites-Tools unterstuetzen',
    panelSubtitle: 'Waehlen Sie Betrag und Waehrung und fahren Sie dann mit Stripe fort. Die kostenlosen Tools bleiben ohne Spende verfuegbar.',
    amountLabel: 'Betrag',
    currencyLabel: 'Waehrung',
    continueLabel: 'Weiter zur sicheren Zahlung',
    closeLabel: 'Spenden-Checkout schliessen',
    cancelLabel: 'Zurueck zur Seite',
    securityTitle: 'Vor dem Fortfahren',
    policyTitle: 'Spendenrichtlinie',
    footerPrefix: 'Open Tecnologia e Servicos Ltda.',
    poweredBy: 'Zahlung ueber Stripe. SuperSites erhaelt keine Kartendaten.',
    validation: 'Geben Sie einen Betrag innerhalb des erlaubten Bereichs ein.',
    trustItems: [
      'Kein SuperSites-Konto erforderlich.',
      'Kartendaten werden nur von Stripe erfasst.',
      'Die Spende kauft keine Prioritaet, Funktionen, SLA oder Rechtsberatung.',
    ],
    policyItems: [
      'Spenden sind freiwillige Unterstuetzung fuer kostenlose oeffentliche Tools.',
      'Sie sind nicht steuerlich absetzbar, ausser lokales Recht und eigene Unterlagen erlauben es.',
      'Bei falschem Betrag oder Hilfebedarf kontaktieren Sie uns mit der Stripe-Quittung.',
    ],
    links: {
      terms: 'Bedingungen',
      privacy: 'Datenschutz',
      contact: 'Kontakt',
    },
  },
}

const copy = computed(() => copyByLocale[props.locale])
const statusId = computed(() => `donation-cta-${props.siteSlug}-${props.variant}-${props.locale}`)
const panelTitleId = computed(() => `${statusId.value}-title`)
const amountId = computed(() => `${statusId.value}-amount`)
const currencyId = computed(() => `${statusId.value}-currency`)
const errorId = computed(() => `${statusId.value}-error`)
const shouldShowNote = computed(() => detailsVisible.value && statusMessage.value !== '')
const buttonLabel = computed(() => isLoading.value ? copy.value.loadingLabel : copy.value.label)
const donationStatus = computed(() => isLoading.value ? 'checkout-loading' : 'checkout-live')
const amountMinor = computed(() => {
  const parsed = Number(String(amountMajor.value).replace(',', '.'))

  return Number.isFinite(parsed) ? Math.round(parsed * 100) : 0
})
const amountIsValid = computed(() => {
  const major = amountMinor.value / 100

  return major >= minMajorByCurrency[selectedCurrency.value]
    && major <= maxMajorByCurrency[selectedCurrency.value]
})
const amountHelp = computed(() => {
  const min = minMajorByCurrency[selectedCurrency.value]
  const max = maxMajorByCurrency[selectedCurrency.value]

  return `${copy.value.validation} ${selectedCurrency.value} ${min} - ${max}.`
})
const localeForFormatting = computed(() => props.locale === 'pt-br' ? 'pt-BR' : props.locale)
const formattedAmount = computed(() => new Intl.NumberFormat(localeForFormatting.value, {
  style: 'currency',
  currency: selectedCurrency.value,
  maximumFractionDigits: amountMinor.value % 100 === 0 ? 0 : 2,
}).format(amountMinor.value / 100))

watch(() => props.locale, (locale) => {
  selectedCurrency.value = defaultCurrencyByLocale[locale]
  amountMajor.value = String(defaultMajorByCurrency[selectedCurrency.value])
})

watch(selectedCurrency, (currency, previousCurrency) => {
  const previousDefault = String(defaultMajorByCurrency[previousCurrency])

  if (amountMajor.value.trim() === previousDefault) {
    amountMajor.value = String(defaultMajorByCurrency[currency])
  }
})

function legalPath(page: 'terms' | 'privacy' | 'contact'): string {
  const base = props.siteSlug === 'supersite'
    ? '/supersites'
    : `/supersites/${props.siteSlug}`

  return `${base}/${props.locale}/${page}`
}

function currentReturnPath(): string {
  if (typeof window === 'undefined') {
    return props.siteSlug === 'supersite'
      ? `/supersites/${props.locale}`
      : `/supersites/${props.siteSlug}/${props.locale}`
  }

  return window.location.pathname
}

function openCheckoutPanel(): void {
  checkoutVisible.value = true
  detailsVisible.value = false
  statusMessage.value = ''
}

function closeCheckoutPanel(): void {
  if (isLoading.value) {
    return
  }

  checkoutVisible.value = false
}

async function startDonation(): Promise<void> {
  if (isLoading.value) {
    return
  }

  if (!amountIsValid.value) {
    detailsVisible.value = true
    statusMessage.value = amountHelp.value
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
        amount_minor: amountMinor.value,
        currency: selectedCurrency.value,
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
      @click="openCheckoutPanel"
    >
      <svg class="donation-cta__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 21s-7.1-4.35-9.25-8.4C.72 8.76 2.8 4.5 6.65 4.5c2.05 0 3.43 1.05 4.22 2.08C11.08 6.86 11.9 6.86 12.1 6.58 12.9 5.55 14.3 4.5 16.35 4.5c3.85 0 5.93 4.26 3.9 8.1C19.1 16.65 12 21 12 21Z" />
      </svg>
      <span>{{ buttonLabel }}</span>
    </button>
    <p v-if="shouldShowNote" :id="statusId" class="donation-cta__note">{{ statusMessage }}</p>
    <span v-else :id="statusId" class="donation-cta__sr-only">{{ copy.note }}</span>

    <Teleport to="body">
      <div
        v-if="checkoutVisible"
        class="donation-checkout"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="panelTitleId"
        @click.self="closeCheckoutPanel"
      >
        <section class="donation-checkout__panel">
          <header class="donation-checkout__header">
            <div class="donation-checkout__brand">
              <span class="donation-checkout__mark">SS</span>
              <span>SuperSites</span>
            </div>
            <button
              type="button"
              class="donation-checkout__close"
              :aria-label="copy.closeLabel"
              :disabled="isLoading"
              @click="closeCheckoutPanel"
            >
              x
            </button>
          </header>

          <div class="donation-checkout__grid">
            <section class="donation-checkout__summary">
              <p class="donation-checkout__eyebrow">{{ copy.panelEyebrow }}</p>
              <h2 :id="panelTitleId">{{ copy.panelTitle }}</h2>
              <p class="donation-checkout__subtitle">{{ copy.panelSubtitle }}</p>
              <div class="donation-checkout__amount-preview">
                <span>{{ formattedAmount }}</span>
                <small>{{ selectedCurrency }}</small>
              </div>
              <section class="donation-checkout__trust" :aria-label="copy.securityTitle">
                <h3>{{ copy.securityTitle }}</h3>
                <ul>
                  <li v-for="item in copy.trustItems" :key="item">{{ item }}</li>
                </ul>
              </section>
            </section>

            <form class="donation-checkout__form" @submit.prevent="startDonation">
              <div class="donation-checkout__fields">
                <label :for="amountId">
                  <span>{{ copy.amountLabel }}</span>
                  <input
                    :id="amountId"
                    v-model="amountMajor"
                    type="number"
                    inputmode="decimal"
                    :min="minMajorByCurrency[selectedCurrency]"
                    :max="maxMajorByCurrency[selectedCurrency]"
                    step="1"
                    :aria-describedby="errorId"
                    :aria-invalid="!amountIsValid"
                  >
                </label>
                <label :for="currencyId">
                  <span>{{ copy.currencyLabel }}</span>
                  <select :id="currencyId" v-model="selectedCurrency">
                    <option v-for="currency in currencies" :key="currency" :value="currency">
                      {{ currency }}
                    </option>
                  </select>
                </label>
              </div>

              <p v-if="!amountIsValid" :id="errorId" class="donation-checkout__validation">
                {{ amountHelp }}
              </p>
              <p v-else :id="errorId" class="donation-checkout__powered">
                {{ copy.poweredBy }}
              </p>

              <section class="donation-checkout__policy">
                <h3>{{ copy.policyTitle }}</h3>
                <ul>
                  <li v-for="item in copy.policyItems" :key="item">{{ item }}</li>
                </ul>
              </section>

              <div class="donation-checkout__actions">
                <button
                  type="submit"
                  class="donation-checkout__submit"
                  :disabled="isLoading || !amountIsValid"
                >
                  <svg class="donation-cta__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M12 21s-7.1-4.35-9.25-8.4C.72 8.76 2.8 4.5 6.65 4.5c2.05 0 3.43 1.05 4.22 2.08C11.08 6.86 11.9 6.86 12.1 6.58 12.9 5.55 14.3 4.5 16.35 4.5c3.85 0 5.93 4.26 3.9 8.1C19.1 16.65 12 21 12 21Z" />
                  </svg>
                  <span>{{ buttonLabel === copy.label ? copy.continueLabel : buttonLabel }}</span>
                </button>
                <button
                  type="button"
                  class="donation-checkout__secondary"
                  :disabled="isLoading"
                  @click="closeCheckoutPanel"
                >
                  {{ copy.cancelLabel }}
                </button>
              </div>

              <p v-if="shouldShowNote" class="donation-checkout__status" role="status">
                {{ statusMessage }}
              </p>
            </form>
          </div>

          <footer class="donation-checkout__footer">
            <span>{{ copy.footerPrefix }}</span>
            <a :href="legalPath('terms')">{{ copy.links.terms }}</a>
            <a :href="legalPath('privacy')">{{ copy.links.privacy }}</a>
            <a :href="legalPath('contact')">{{ copy.links.contact }}</a>
          </footer>
        </section>
      </div>
    </Teleport>
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

.donation-checkout {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  overflow-y: auto;
  background: rgba(15, 23, 42, 0.48);
}

.donation-checkout__panel {
  width: min(920px, 100%);
  overflow: hidden;
  border: 1px solid rgba(40, 65, 57, 0.18);
  border-radius: 8px;
  background: #fbfcf8;
  box-shadow: 0 26px 80px rgba(15, 23, 42, 0.28);
}

.donation-checkout__header,
.donation-checkout__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.15rem;
  border-bottom: 1px solid rgba(40, 65, 57, 0.14);
}

.donation-checkout__footer {
  flex-wrap: wrap;
  border-top: 1px solid rgba(40, 65, 57, 0.14);
  border-bottom: 0;
  color: #4b5b55;
  font-size: 0.82rem;
}

.donation-checkout__footer a {
  color: #1f6f69;
  font-weight: 800;
  text-decoration: none;
}

.donation-checkout__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  color: #17211d;
  font-weight: 900;
}

.donation-checkout__mark {
  display: inline-grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 8px;
  color: #fff;
  background: #255473;
  font-size: 0.78rem;
  letter-spacing: 0;
}

.donation-checkout__close {
  display: inline-grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border: 1px solid rgba(40, 65, 57, 0.2);
  border-radius: 8px;
  color: #17211d;
  background: #fff;
  cursor: pointer;
  font-size: 1.15rem;
  font-weight: 900;
  line-height: 1;
}

.donation-checkout__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1fr);
  gap: 1.25rem;
  padding: 1.25rem;
}

.donation-checkout__summary,
.donation-checkout__form {
  min-width: 0;
}

.donation-checkout__eyebrow {
  margin: 0 0 0.55rem;
  color: #955015;
  font-size: 0.76rem;
  font-weight: 900;
  text-transform: uppercase;
}

.donation-checkout h2,
.donation-checkout h3,
.donation-checkout p {
  margin-top: 0;
}

.donation-checkout h2 {
  margin-bottom: 0.75rem;
  color: #17211d;
  font-size: clamp(1.65rem, 3vw, 2.6rem);
  line-height: 1.02;
}

.donation-checkout__subtitle {
  margin-bottom: 1rem;
  color: #435750;
  font-size: 0.98rem;
  line-height: 1.45;
}

.donation-checkout__amount-preview {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin: 1rem 0;
  padding: 0.9rem 1rem;
  border: 1px solid rgba(31, 111, 105, 0.18);
  border-radius: 8px;
  color: #17211d;
  background: #eef7f2;
}

.donation-checkout__amount-preview span {
  font-size: clamp(1.55rem, 3vw, 2.25rem);
  font-weight: 900;
}

.donation-checkout__amount-preview small {
  color: #1f6f69;
  font-weight: 900;
}

.donation-checkout__trust,
.donation-checkout__policy {
  padding: 0.95rem;
  border: 1px solid rgba(40, 65, 57, 0.14);
  border-radius: 8px;
  background: #fff;
}

.donation-checkout__trust h3,
.donation-checkout__policy h3 {
  margin-bottom: 0.55rem;
  color: #17211d;
  font-size: 1rem;
}

.donation-checkout__trust ul,
.donation-checkout__policy ul {
  display: grid;
  gap: 0.45rem;
  margin: 0;
  padding-left: 1.1rem;
  color: #435750;
  font-size: 0.88rem;
  line-height: 1.38;
}

.donation-checkout__form {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid rgba(40, 65, 57, 0.14);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.08);
}

.donation-checkout__fields {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(120px, 0.45fr);
  gap: 0.75rem;
}

.donation-checkout__fields label {
  display: grid;
  gap: 0.35rem;
  color: #17211d;
  font-size: 0.82rem;
  font-weight: 900;
}

.donation-checkout__fields input,
.donation-checkout__fields select {
  width: 100%;
  min-height: 44px;
  border: 1px solid rgba(40, 65, 57, 0.22);
  border-radius: 8px;
  color: #17211d;
  background: #fbfcf8;
  font: inherit;
  font-size: 1rem;
  font-weight: 800;
}

.donation-checkout__fields input {
  padding: 0.65rem 0.75rem;
}

.donation-checkout__fields select {
  padding: 0.65rem 0.55rem;
}

.donation-checkout__fields input:focus,
.donation-checkout__fields select:focus,
.donation-checkout__submit:focus,
.donation-checkout__secondary:focus,
.donation-checkout__close:focus {
  outline: 3px solid rgba(243, 178, 26, 0.45);
  outline-offset: 2px;
}

.donation-checkout__validation,
.donation-checkout__status {
  margin: 0;
  color: #8a3a14;
  font-size: 0.84rem;
  font-weight: 800;
  line-height: 1.35;
}

.donation-checkout__powered {
  margin: 0;
  color: #4b5b55;
  font-size: 0.84rem;
  font-weight: 700;
  line-height: 1.35;
}

.donation-checkout__actions {
  display: grid;
  gap: 0.6rem;
}

.donation-checkout__submit,
.donation-checkout__secondary {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 900;
}

.donation-checkout__submit {
  border: 1px solid #116b63;
  color: #fff;
  background: #1f6f69;
  box-shadow: 0 10px 22px rgba(31, 111, 105, 0.2);
}

.donation-checkout__submit:disabled,
.donation-checkout__secondary:disabled {
  cursor: wait;
  opacity: 0.72;
}

.donation-checkout__secondary {
  border: 1px solid rgba(40, 65, 57, 0.2);
  color: #17211d;
  background: #fbfcf8;
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

  .donation-checkout {
    align-items: start;
    padding: 0.75rem;
  }

  .donation-checkout__grid {
    grid-template-columns: 1fr;
    padding: 0.85rem;
  }

  .donation-checkout__fields {
    grid-template-columns: 1fr;
  }

  .donation-checkout h2 {
    font-size: 1.8rem;
  }
}
</style>
