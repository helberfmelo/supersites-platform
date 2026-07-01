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
    homeBody: 'The free tool stays available without signup. Bookmark the workflow, share it when useful or send corrections from the contact page.',
    toolBody: 'Use the result first. Support and promotional areas stay separate from the useful workflow.',
    items: ['Useful result first', 'No signup required', 'Promotions kept separate'],
    adTitle: 'Advertisement',
    adBody: 'Sponsored messages are kept separate from the free result.',
  },
  'pt-br': {
    eyebrow: 'Apoio',
    title: 'Ajude a manter este resultado gratuito',
    homeBody: 'A ferramenta gratuita continua disponivel sem cadastro. Salve o fluxo, compartilhe quando for util ou envie correcoes pela pagina de contato.',
    toolBody: 'Use o resultado primeiro. Areas de apoio e promocao ficam separadas do fluxo util.',
    items: ['Resultado util primeiro', 'Sem cadastro obrigatorio', 'Promocoes separadas'],
    adTitle: 'Publicidade',
    adBody: 'Mensagens patrocinadas ficam separadas do resultado gratuito.',
  },
  es: {
    eyebrow: 'Apoyo',
    title: 'Ayuda a mantener gratis este resultado',
    homeBody: 'La herramienta gratuita sigue disponible sin registro. Guarda el flujo, compartelo cuando sea util o envia correcciones desde la pagina de contacto.',
    toolBody: 'Usa primero el resultado. Las areas de apoyo y promocion quedan separadas del flujo util.',
    items: ['Resultado util primero', 'Sin registro obligatorio', 'Promociones separadas'],
    adTitle: 'Publicidad',
    adBody: 'Los mensajes patrocinados quedan separados del resultado gratis.',
  },
  fr: {
    eyebrow: 'Soutien',
    title: 'Aidez a garder ce resultat gratuit',
    homeBody: 'L outil gratuit reste disponible sans compte. Enregistrez le flux, partagez-le s il aide ou envoyez des corrections via la page de contact.',
    toolBody: 'Utilisez d abord le resultat. Les zones de soutien et de promotion restent separees du flux utile.',
    items: ['Resultat utile d abord', 'Pas de compte obligatoire', 'Promotions separees'],
    adTitle: 'Publicite',
    adBody: 'Les messages sponsorises restent separes du resultat gratuit.',
  },
  de: {
    eyebrow: 'Unterstuetzung',
    title: 'Dieses kostenlose Ergebnis erhalten',
    homeBody: 'Das kostenlose Tool bleibt ohne Konto verfuegbar. Speichern Sie den Ablauf, teilen Sie ihn bei Bedarf oder senden Sie Korrekturen ueber die Kontaktseite.',
    toolBody: 'Nutzen Sie zuerst das Ergebnis. Support- und Werbebereiche bleiben vom nuetzlichen Ablauf getrennt.',
    items: ['Nuetzliches Ergebnis zuerst', 'Kein Pflichtkonto', 'Werbung getrennt'],
    adTitle: 'Anzeige',
    adBody: 'Gesponserte Hinweise bleiben vom kostenlosen Ergebnis getrennt.',
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
  width: 100%;
  max-width: 100%;
  min-width: 0;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
  gap: 1rem;
  align-items: stretch;
  margin: 1.5rem 0;
}

.monetization-safe__support,
.monetization-safe__ad {
  min-width: 0;
  border: 1px solid rgba(15, 23, 42, 0.14);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

.monetization-safe__support {
  padding: 1.25rem;
  overflow-wrap: anywhere;
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
  width: 100%;
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

  .monetization-safe__ad {
    max-width: 100%;
    aspect-ratio: auto;
  }
}
</style>
