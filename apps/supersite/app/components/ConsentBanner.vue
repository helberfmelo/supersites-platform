<script setup lang="ts">
import {
  buildConsentModeCommand,
  buildTcfGate,
  consentStorageKey,
  createConsentState,
  parseConsentState,
  serializeConsentState,
  type ConsentState,
} from '@supersites/consent'
import { computed, onMounted, reactive, ref } from 'vue'
import { normalizeLocale, type LocaleCode } from '../data/locales'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

const copyByLocale: Record<LocaleCode, {
  title: string
  body: string
  essential: string
  customize: string
  accept: string
  save: string
  preferences: string
  analytics: string
  ads: string
  tcfNotice: string
}> = {
  en: {
    title: 'Privacy choices',
    body: 'SuperSites uses necessary storage for the service. Analytics and advertising stay off unless you allow them.',
    essential: 'Essential only',
    customize: 'Customize',
    accept: 'Accept optional',
    save: 'Save choices',
    preferences: 'Preference storage',
    analytics: 'Analytics storage',
    ads: 'Advertising storage',
    tcfNotice: 'Real ad requests remain blocked until a Google-certified CMP is approved for TCF regions.',
  },
  'pt-br': {
    title: 'Escolhas de privacidade',
    body: 'O SuperSites usa armazenamento necessario para o servico. Analytics e publicidade ficam desligados ate voce permitir.',
    essential: 'Somente essenciais',
    customize: 'Personalizar',
    accept: 'Aceitar opcionais',
    save: 'Salvar escolhas',
    preferences: 'Armazenamento de preferencias',
    analytics: 'Armazenamento de analytics',
    ads: 'Armazenamento de publicidade',
    tcfNotice: 'Requisicoes reais de anuncio seguem bloqueadas ate uma CMP certificada pelo Google ser aprovada para regioes TCF.',
  },
  es: {
    title: 'Opciones de privacidad',
    body: 'SuperSites usa almacenamiento necesario para el servicio. Analytics y publicidad quedan apagados hasta que los permitas.',
    essential: 'Solo esenciales',
    customize: 'Personalizar',
    accept: 'Aceptar opcionales',
    save: 'Guardar opciones',
    preferences: 'Almacenamiento de preferencias',
    analytics: 'Almacenamiento de analytics',
    ads: 'Almacenamiento de publicidad',
    tcfNotice: 'Las solicitudes reales de anuncios siguen bloqueadas hasta aprobar una CMP certificada por Google para regiones TCF.',
  },
  fr: {
    title: 'Choix de confidentialite',
    body: 'SuperSites utilise le stockage necessaire au service. Analytics et publicite restent desactives sauf accord.',
    essential: 'Essentiels seulement',
    customize: 'Personnaliser',
    accept: 'Accepter les options',
    save: 'Enregistrer',
    preferences: 'Stockage des preferences',
    analytics: 'Stockage analytics',
    ads: 'Stockage publicitaire',
    tcfNotice: 'Les appels publicitaires reels restent bloques jusqu a validation d une CMP certifiee Google pour les regions TCF.',
  },
  de: {
    title: 'Datenschutzauswahl',
    body: 'SuperSites nutzt notwendigen Speicher fur den Dienst. Analytics und Werbung bleiben aus, bis du zustimmst.',
    essential: 'Nur notwendige',
    customize: 'Anpassen',
    accept: 'Optionale akzeptieren',
    save: 'Auswahl speichern',
    preferences: 'Praferenzspeicher',
    analytics: 'Analytics-Speicher',
    ads: 'Werbespeicher',
    tcfNotice: 'Echte Anzeigenanfragen bleiben gesperrt, bis eine Google-zertifizierte CMP fur TCF-Regionen freigegeben ist.',
  },
}

const route = useRoute()
const locale = computed(() => normalizeLocale(route.params.locale?.toString()) ?? 'en')
const copy = computed(() => copyByLocale[locale.value])
const isMounted = ref(false)
const isOpen = ref(false)
const showCustomize = ref(false)
const state = ref<ConsentState>(createConsentState())
const draft = reactive({
  preferences: false,
  analytics: false,
  ads: false,
})
const tcfGate = computed(() => buildTcfGate({ region: {}, hasCertifiedCmp: false }))

onMounted(() => {
  const stored = parseConsentState(window.localStorage.getItem(consentStorageKey))
  state.value = stored ?? createConsentState()
  syncDraft(state.value)
  isOpen.value = !stored
  isMounted.value = true
  pushConsentMode(stored ? 'update' : 'default')
})

function syncDraft(next: ConsentState): void {
  draft.preferences = next.preferences
  draft.analytics = next.analytics
  draft.ads = next.ads
}

function makeState(values: Pick<ConsentState, 'preferences' | 'analytics' | 'ads'>): ConsentState {
  return createConsentState({
    preferences: values.preferences,
    analytics: values.analytics,
    ads: values.ads,
    updatedAt: new Date().toISOString(),
  })
}

function persist(next: ConsentState): void {
  state.value = next
  syncDraft(next)
  window.localStorage.setItem(consentStorageKey, serializeConsentState(next))
  isOpen.value = false
  showCustomize.value = false
  pushConsentMode('update')
  window.dispatchEvent(new CustomEvent('supersites-consent-change', { detail: next }))
}

function acceptEssential(): void {
  persist(makeState({ preferences: false, analytics: false, ads: false }))
}

function acceptOptional(): void {
  persist(makeState({ preferences: true, analytics: true, ads: true }))
}

function saveChoices(): void {
  persist(makeState(draft))
}

function pushConsentMode(commandName: 'default' | 'update'): void {
  const command = buildConsentModeCommand(state.value, commandName)
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({
    event: `supersites_consent_${command.command}`,
    consent_version: command.version,
    consent_mode: command.mode,
    tcf_applies: tcfGate.value.applies,
    tcf_certified_cmp_required: tcfGate.value.certifiedCmpRequired,
  })
}
</script>

<template>
  <section
    v-if="isMounted && isOpen"
    class="consent-banner"
    data-testid="consent-banner"
    aria-live="polite"
    aria-labelledby="consent-title"
  >
    <div class="consent-banner__panel">
      <div>
        <h2 id="consent-title">{{ copy.title }}</h2>
        <p>{{ copy.body }}</p>
        <p v-if="tcfGate.certifiedCmpRequired" class="consent-banner__note">{{ copy.tcfNotice }}</p>
      </div>

      <div v-if="showCustomize" class="consent-banner__choices">
        <label>
          <input v-model="draft.preferences" type="checkbox">
          <span>{{ copy.preferences }}</span>
        </label>
        <label>
          <input v-model="draft.analytics" type="checkbox">
          <span>{{ copy.analytics }}</span>
        </label>
        <label>
          <input v-model="draft.ads" type="checkbox">
          <span>{{ copy.ads }}</span>
        </label>
      </div>

      <div class="consent-banner__actions">
        <button type="button" class="button-link button-link--secondary" @click="acceptEssential">
          {{ copy.essential }}
        </button>
        <button
          v-if="!showCustomize"
          type="button"
          class="button-link button-link--secondary"
          @click="showCustomize = true"
        >
          {{ copy.customize }}
        </button>
        <button
          v-if="showCustomize"
          type="button"
          class="button-link button-link--secondary"
          @click="saveChoices"
        >
          {{ copy.save }}
        </button>
        <button type="button" class="button-link" @click="acceptOptional">
          {{ copy.accept }}
        </button>
      </div>
    </div>
  </section>
</template>
