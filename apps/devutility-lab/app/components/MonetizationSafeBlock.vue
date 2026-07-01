<script setup lang="ts">
import { computed } from 'vue'
import type { LocaleCode } from '../data/locales'

const props = withDefaults(defineProps<{
  locale: LocaleCode
  siteSlug: string
  slotId: string
  variant?: 'home' | 'tool'
}>(), {
  variant: 'home',
})

const adPolicyVersion = '2026-06-27.1'
const copyByLocale: Record<LocaleCode, {
  eyebrow: string
  title: string
  homeBody: string
  toolBody: string
  items: string[]
  adTitle: string
  adBody: string
}> = {
  en: {
    eyebrow: 'Support',
    title: 'Keep this free result available',
    homeBody: 'The free tool stays available without signup. A contribution option will appear here only when payments are ready; no payment link is active on this page.',
    toolBody: 'Use the result first. A contribution option may appear below the useful flow later; no payment link is active on this page.',
    items: ['Useful result first', 'No payment widget loaded', 'No ad request is made'],
    adTitle: 'Reserved ad space',
    adBody: 'No ad is loaded from this page area.',
  },
  'pt-br': {
    eyebrow: 'Apoio',
    title: 'Ajude a manter este resultado gratuito',
    homeBody: 'A ferramenta gratuita continua disponivel sem cadastro. Uma opcao de contribuicao aparecera aqui somente quando pagamentos estiverem prontos; nao ha link de pagamento ativo nesta pagina.',
    toolBody: 'Use o resultado primeiro. Uma opcao de contribuicao pode aparecer abaixo do fluxo util depois; nao ha link de pagamento ativo nesta pagina.',
    items: ['Resultado util primeiro', 'Nenhum widget de pagamento carregado', 'Nenhuma requisicao de anuncio e feita'],
    adTitle: 'Espaco publicitario reservado',
    adBody: 'Nenhum anuncio e carregado a partir desta area.',
  },
  es: {
    eyebrow: 'Apoyo',
    title: 'Ayuda a mantener gratis este resultado',
    homeBody: 'La herramienta gratuita sigue disponible sin registro. Una opcion de contribucion aparecera aqui solo cuando los pagos esten listos; no hay enlace de pago activo en esta pagina.',
    toolBody: 'Usa primero el resultado. Una opcion de contribucion puede aparecer debajo del flujo util mas adelante; no hay enlace de pago activo en esta pagina.',
    items: ['Resultado util primero', 'No se carga ningun widget de pago', 'No se realiza ninguna solicitud de anuncio'],
    adTitle: 'Espacio publicitario reservado',
    adBody: 'No se carga ningun anuncio desde esta area.',
  },
  fr: {
    eyebrow: 'Soutien',
    title: 'Aidez a garder ce resultat gratuit',
    homeBody: 'L outil gratuit reste disponible sans compte. Une option de contribution apparaitra ici seulement quand les paiements seront prets; aucun lien de paiement n est actif sur cette page.',
    toolBody: 'Utilisez d abord le resultat. Une option de contribution pourra apparaitre sous le flux utile plus tard; aucun lien de paiement n est actif sur cette page.',
    items: ['Resultat utile d abord', 'Aucun widget de paiement charge', 'Aucune requete publicitaire n est envoyee'],
    adTitle: 'Espace publicitaire reserve',
    adBody: 'Aucune annonce n est chargee depuis cette zone.',
  },
  de: {
    eyebrow: 'Unterstuetzung',
    title: 'Dieses kostenlose Ergebnis erhalten',
    homeBody: 'Das kostenlose Tool bleibt ohne Konto verfuegbar. Eine Beitragsoption erscheint hier erst, wenn Zahlungen bereit sind; auf dieser Seite ist kein Zahlungslink aktiv.',
    toolBody: 'Nutzen Sie zuerst das Ergebnis. Eine Beitragsoption kann spaeter unter dem nuetzlichen Ablauf erscheinen; auf dieser Seite ist kein Zahlungslink aktiv.',
    items: ['Nuetzliches Ergebnis zuerst', 'Kein Zahlungswidget geladen', 'Keine Anzeigenanfrage wird gesendet'],
    adTitle: 'Reservierte Werbeflaeche',
    adBody: 'Aus diesem Bereich wird keine Anzeige geladen.',
  },
}

const copy = computed(() => copyByLocale[props.locale])
const headingId = computed(() => `${props.slotId}-support`)
</script>

<template>
  <section class="monetization-safe" :aria-labelledby="headingId">
    <div class="monetization-safe__support">
      <p class="monetization-safe__eyebrow">{{ copy.eyebrow }}</p>
      <h2 :id="headingId">{{ copy.title }}</h2>
      <p>{{ variant === 'tool' ? copy.toolBody : copy.homeBody }}</p>
      <ul>
        <li v-for="item in copy.items" :key="item">{{ item }}</li>
      </ul>
    </div>
    <aside
      class="monetization-safe__ad"
      aria-hidden="true"
      :data-ad-slot-id="slotId"
      data-ad-status="delivery-disabled"
      :data-ad-policy-version="adPolicyVersion"
      data-ad-format="leaderboard"
      :data-ad-site="siteSlug"
    >
      <strong>{{ copy.adTitle }}</strong>
      <span>{{ copy.adBody }}</span>
    </aside>
  </section>
</template>

<style scoped>
.monetization-safe {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
  gap: 1rem;
  align-items: stretch;
  margin: 1.5rem 0;
}

.monetization-safe__support,
.monetization-safe__ad {
  border: 1px solid rgba(15, 23, 42, 0.14);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

.monetization-safe__support {
  padding: 1.25rem;
}

.monetization-safe__support h2 {
  margin: 0 0 0.5rem;
  font-size: clamp(1.2rem, 1.4vw, 1.55rem);
}

.monetization-safe__support p {
  margin: 0;
  color: #475569;
}

.monetization-safe__support ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.monetization-safe__support li {
  border-radius: 999px;
  background: #f1f5f9;
  color: #334155;
  padding: 0.4rem 0.65rem;
  font-size: 0.85rem;
  font-weight: 700;
}

.monetization-safe__eyebrow {
  color: #0369a1;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

.monetization-safe__ad {
  display: flex;
  min-height: 100px;
  max-width: 728px;
  aspect-ratio: 728 / 100;
  align-items: center;
  justify-content: center;
  justify-self: stretch;
  padding: 1rem;
  color: #64748b;
  pointer-events: none;
  text-align: center;
}

.monetization-safe__ad strong,
.monetization-safe__ad span {
  display: block;
}

.monetization-safe__ad span {
  margin-top: 0.25rem;
  font-size: 0.85rem;
}

@media (max-width: 760px) {
  .monetization-safe {
    grid-template-columns: 1fr;
  }
}
</style>
