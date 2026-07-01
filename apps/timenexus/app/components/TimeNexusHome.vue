<script setup lang="ts">
import { getStatusBadgeClass } from '@supersites/ui'
import { computed, ref } from 'vue'
import { cityTimePageCatalog, getCityTimePageCopy } from '../data/cityPages'
import { getHomeCopy } from '../data/copy'
import { localizedCityTimePath, localizedHomePath, localizedToolPath, localizedWorldClockPath, toHtmlLang, type LocaleCode } from '../data/locales'
import { absoluteUrl, localeAlternates } from '../data/routes'
import {
  filterTimeTools,
  getCategoryLabel,
  getTimeToolCopy,
  timeToolCatalog,
  type TimeToolCategory,
} from '../data/tools'

const props = defineProps<{
  locale: LocaleCode
  xDefault?: boolean
}>()

const directoryText: Record<LocaleCode, {
  title: string
  body: string
  sections: {
    worldClock: { title: string; body: string; americasEurope: string; globalProduct: string; tokyo: string }
    timeZones: { title: string; body: string }
    calendar: { title: string; body: string }
    calculators: { title: string; body: string }
    timers: { title: string; body: string; currentTime: string; meetingPlanner: string }
  }
  footer: {
    cities: string
    timeZones: string
    dates: string
    calendars: string
    converters: string
    businessFit: string
    holidayCalendars: string
  }
}> = {
  en: {
    title: 'World Clock, Time Zones, Calendar, Calculators and Timers',
    body: 'Jump directly into the time, date and converter workspace that matches the task.',
    sections: {
      worldClock: { title: 'World Clock', body: 'Live city clocks, business-hour badges and city group comparisons.', americasEurope: 'Americas + Europe', globalProduct: 'Global product team', tokyo: 'Tokyo city clock' },
      timeZones: { title: 'Time Zones', body: 'Meeting conversion, UTC views and timestamp formats.' },
      calendar: { title: 'Calendar', body: 'Date spans, weekday counts and birthday calculations.' },
      calculators: { title: 'Calculators', body: 'Percentage and unit helpers for quick browser-side math.' },
      timers: { title: 'Timers', body: 'Timer and countdown workflows are reserved for future product depth.', currentTime: 'Current time panel', meetingPlanner: 'Meeting planner' },
    },
    footer: { cities: 'Cities', timeZones: 'Time zones', dates: 'Dates', calendars: 'Calendars', converters: 'Converters', businessFit: 'Business-hour fit', holidayCalendars: 'Holiday calendars planned' },
  },
  'pt-br': {
    title: 'Relogio mundial, fusos horarios, calendario, calculadoras e temporizadores',
    body: 'Entre direto no espaco de tempo, datas ou conversores que combina com a tarefa.',
    sections: {
      worldClock: { title: 'Relogio mundial', body: 'Horarios por cidade, badges de expediente e comparacoes por grupo.', americasEurope: 'Americas + Europa', globalProduct: 'Time global de produto', tokyo: 'Relogio de Toquio' },
      timeZones: { title: 'Fusos horarios', body: 'Conversao de reunioes, visualizacao UTC e formatos de timestamp.' },
      calendar: { title: 'Calendario', body: 'Intervalos de datas, dias uteis e calculos de aniversario.' },
      calculators: { title: 'Calculadoras', body: 'Porcentagem e unidades para matematica rapida no navegador.' },
      timers: { title: 'Temporizadores', body: 'Fluxos de timer e contagem regressiva ficam para profundidade futura.', currentTime: 'Painel de hora atual', meetingPlanner: 'Planejador de reuniao' },
    },
    footer: { cities: 'Cidades', timeZones: 'Fusos horarios', dates: 'Datas', calendars: 'Calendarios', converters: 'Conversores', businessFit: 'Ajuste de expediente', holidayCalendars: 'Calendarios de feriados planejados' },
  },
  es: {
    title: 'Reloj mundial, zonas horarias, calendario, calculadoras y temporizadores',
    body: 'Entra directo al espacio de tiempo, fechas o conversiones que coincide con la tarea.',
    sections: {
      worldClock: { title: 'Reloj mundial', body: 'Horas por ciudad, badges de horario laboral y comparaciones por grupo.', americasEurope: 'Americas + Europa', globalProduct: 'Equipo global de producto', tokyo: 'Reloj de Tokio' },
      timeZones: { title: 'Zonas horarias', body: 'Conversion de reuniones, vistas UTC y formatos de timestamp.' },
      calendar: { title: 'Calendario', body: 'Rangos de fechas, dias laborables y calculos de edad.' },
      calculators: { title: 'Calculadoras', body: 'Porcentajes y unidades para matematica rapida en el navegador.' },
      timers: { title: 'Temporizadores', body: 'Flujos de timer y cuenta regresiva quedan para profundidad futura.', currentTime: 'Panel de hora actual', meetingPlanner: 'Planificador de reunion' },
    },
    footer: { cities: 'Ciudades', timeZones: 'Zonas horarias', dates: 'Fechas', calendars: 'Calendarios', converters: 'Conversores', businessFit: 'Ajuste de horario laboral', holidayCalendars: 'Calendarios de festivos planificados' },
  },
  fr: {
    title: 'Horloge mondiale, fuseaux horaires, calendrier, calculateurs et minuteurs',
    body: 'Accedez directement a l espace de temps, dates ou conversion qui correspond a la tache.',
    sections: {
      worldClock: { title: 'Horloge mondiale', body: 'Heures par ville, badges horaires ouvrables et comparaisons par groupe.', americasEurope: 'Ameriques + Europe', globalProduct: 'Equipe produit globale', tokyo: 'Horloge de Tokyo' },
      timeZones: { title: 'Fuseaux horaires', body: 'Conversion de reunion, vues UTC et formats timestamp.' },
      calendar: { title: 'Calendrier', body: 'Ecarts de dates, jours ouvrables et calculs d age.' },
      calculators: { title: 'Calculateurs', body: 'Pourcentages et unites pour calcul rapide dans le navigateur.' },
      timers: { title: 'Minuteurs', body: 'Minuteurs et comptes a rebours restent une profondeur produit future.', currentTime: 'Panneau heure actuelle', meetingPlanner: 'Planificateur de reunion' },
    },
    footer: { cities: 'Villes', timeZones: 'Fuseaux horaires', dates: 'Dates', calendars: 'Calendriers', converters: 'Convertisseurs', businessFit: 'Ajustement heures ouvrables', holidayCalendars: 'Calendriers feries prevus' },
  },
  de: {
    title: 'Weltuhr, Zeitzonen, Kalender, Rechner und Timer',
    body: 'Springen Sie direkt in den Zeit-, Datums- oder Konverterbereich fuer die Aufgabe.',
    sections: {
      worldClock: { title: 'Weltuhr', body: 'Stadtzeiten, Arbeitszeit-Badges und Gruppenvergleiche.', americasEurope: 'Amerika + Europa', globalProduct: 'Globales Produktteam', tokyo: 'Tokio-Uhr' },
      timeZones: { title: 'Zeitzonen', body: 'Meeting-Konvertierung, UTC-Ansichten und Timestamp-Formate.' },
      calendar: { title: 'Kalender', body: 'Datumsabstaende, Arbeitstage und Altersberechnungen.' },
      calculators: { title: 'Rechner', body: 'Prozent- und Einheitenhilfen fuer schnelle Browser-Rechnung.' },
      timers: { title: 'Timer', body: 'Timer- und Countdown-Workflows bleiben spaeterer Produkttiefe vorbehalten.', currentTime: 'Aktuelle-Zeit-Panel', meetingPlanner: 'Meeting-Planer' },
    },
    footer: { cities: 'Staedte', timeZones: 'Zeitzonen', dates: 'Daten', calendars: 'Kalender', converters: 'Konverter', businessFit: 'Arbeitszeit-Passung', holidayCalendars: 'Feiertagskalender geplant' },
  },
}

const copy = computed(() => getHomeCopy(props.locale))
const directoryCopy = computed(() => directoryText[props.locale])
const searchQuery = ref('')
const selectedCategory = ref<TimeToolCategory | 'all'>('all')
const filteredTools = computed(() => filterTimeTools(searchQuery.value, selectedCategory.value, props.locale))
const canonicalPath = computed(() => (props.xDefault ? '/' : localizedHomePath(props.locale)))
const categories = computed(() => Array.from(new Set(timeToolCatalog.map((tool) => tool.category))))
const cityLinks = computed(() => cityTimePageCatalog.map((page) => ({
  page,
  copy: getCityTimePageCopy(page, props.locale),
})))
const catalogSections = computed(() => [
  {
    title: directoryCopy.value.sections.worldClock.title,
    body: directoryCopy.value.sections.worldClock.body,
    links: [
      { label: directoryCopy.value.sections.worldClock.americasEurope, to: localizedWorldClockPath(props.locale, 'americas-europe') },
      { label: directoryCopy.value.sections.worldClock.globalProduct, to: localizedWorldClockPath(props.locale, 'global-product') },
      { label: directoryCopy.value.sections.worldClock.tokyo, to: localizedCityTimePath(props.locale, 'tokyo') },
    ],
  },
  {
    title: directoryCopy.value.sections.timeZones.title,
    body: directoryCopy.value.sections.timeZones.body,
    links: [
      { label: getTimeToolCopy(timeToolCatalog.find((tool) => tool.slug === 'timezone-converter')!, props.locale).title, to: localizedToolPath(props.locale, 'timezone-converter') },
      { label: getTimeToolCopy(timeToolCatalog.find((tool) => tool.slug === 'timestamp-converter')!, props.locale).title, to: localizedToolPath(props.locale, 'timestamp-converter') },
    ],
  },
  {
    title: directoryCopy.value.sections.calendar.title,
    body: directoryCopy.value.sections.calendar.body,
    links: [
      { label: getTimeToolCopy(timeToolCatalog.find((tool) => tool.slug === 'date-difference')!, props.locale).title, to: localizedToolPath(props.locale, 'date-difference') },
      { label: getTimeToolCopy(timeToolCatalog.find((tool) => tool.slug === 'business-days')!, props.locale).title, to: localizedToolPath(props.locale, 'business-days') },
      { label: getTimeToolCopy(timeToolCatalog.find((tool) => tool.slug === 'age-calculator')!, props.locale).title, to: localizedToolPath(props.locale, 'age-calculator') },
    ],
  },
  {
    title: directoryCopy.value.sections.calculators.title,
    body: directoryCopy.value.sections.calculators.body,
    links: [
      { label: getTimeToolCopy(timeToolCatalog.find((tool) => tool.slug === 'percentage-calculator')!, props.locale).title, to: localizedToolPath(props.locale, 'percentage-calculator') },
      { label: getTimeToolCopy(timeToolCatalog.find((tool) => tool.slug === 'unit-converter')!, props.locale).title, to: localizedToolPath(props.locale, 'unit-converter') },
    ],
  },
  {
    title: directoryCopy.value.sections.timers.title,
    body: directoryCopy.value.sections.timers.body,
    links: [
      { label: directoryCopy.value.sections.timers.currentTime, to: localizedHomePath(props.locale) },
      { label: directoryCopy.value.sections.timers.meetingPlanner, to: localizedToolPath(props.locale, 'timezone-converter') },
    ],
  },
])
const footerGroups = computed(() => [
  {
    title: directoryCopy.value.footer.cities,
    links: cityLinks.value.slice(0, 4).map((item) => ({ label: item.page.city, to: localizedCityTimePath(props.locale, item.page.slug) })),
  },
  {
    title: directoryCopy.value.footer.timeZones,
    links: [
      { label: 'America/New_York', to: localizedWorldClockPath(props.locale, 'americas-europe') },
      { label: 'Europe/London', to: localizedWorldClockPath(props.locale, 'americas-europe') },
      { label: 'Asia/Tokyo', to: localizedWorldClockPath(props.locale, 'global-product') },
    ],
  },
  {
    title: directoryCopy.value.footer.dates,
    links: [
      { label: getTimeToolCopy(timeToolCatalog.find((tool) => tool.slug === 'date-difference')!, props.locale).title, to: localizedToolPath(props.locale, 'date-difference') },
      { label: getTimeToolCopy(timeToolCatalog.find((tool) => tool.slug === 'business-days')!, props.locale).title, to: localizedToolPath(props.locale, 'business-days') },
      { label: getTimeToolCopy(timeToolCatalog.find((tool) => tool.slug === 'age-calculator')!, props.locale).title, to: localizedToolPath(props.locale, 'age-calculator') },
    ],
  },
  {
    title: directoryCopy.value.footer.calendars,
    links: [
      { label: directoryCopy.value.footer.businessFit, to: localizedWorldClockPath(props.locale, 'global-product') },
      { label: directoryCopy.value.footer.holidayCalendars, to: localizedToolPath(props.locale, 'business-days') },
    ],
  },
  {
    title: directoryCopy.value.footer.converters,
    links: [
      { label: getTimeToolCopy(timeToolCatalog.find((tool) => tool.slug === 'timezone-converter')!, props.locale).title, to: localizedToolPath(props.locale, 'timezone-converter') },
      { label: getTimeToolCopy(timeToolCatalog.find((tool) => tool.slug === 'timestamp-converter')!, props.locale).title, to: localizedToolPath(props.locale, 'timestamp-converter') },
      { label: getTimeToolCopy(timeToolCatalog.find((tool) => tool.slug === 'unit-converter')!, props.locale).title, to: localizedToolPath(props.locale, 'unit-converter') },
    ],
  },
])
const homeJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TimeNexus',
  description: copy.value.lead,
  inLanguage: props.locale,
  url: absoluteUrl(canonicalPath.value),
  publisher: {
    '@type': 'Organization',
    name: 'SuperSites',
  },
}))

useHead(() => ({
  htmlAttrs: {
    lang: toHtmlLang(props.locale),
  },
  title: props.xDefault ? 'TimeNexus' : `${copy.value.title} | TimeNexus`,
  meta: [
    {
      name: 'description',
      content: copy.value.lead,
    },
    {
      property: 'og:title',
      content: 'TimeNexus',
    },
    {
      property: 'og:description',
      content: copy.value.lead,
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
  link: [
    { rel: 'canonical', href: absoluteUrl(canonicalPath.value) },
    ...localeAlternates(localizedHomePath),
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(homeJsonLd.value),
    },
  ],
}))
</script>

<template>
  <main class="page-shell">
    <SiteHeader :locale="locale" :path-for-locale="localizedHomePath" />

    <section class="hero" aria-labelledby="timenexus-title">
      <div>
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h1 id="timenexus-title">{{ copy.title }}</h1>
        <p class="lead">{{ copy.lead }}</p>
      </div>

      <aside class="status-panel" aria-label="TimeNexus status">
        <div v-for="row in copy.statusRows" :key="row.title" class="status-panel__row">
          <div>
            <strong>{{ row.title }}</strong>
            <span>{{ row.body }}</span>
          </div>
          <span :class="['signal', row.tone === 'amber' ? 'signal--amber' : '']" aria-hidden="true"></span>
        </div>
      </aside>
    </section>

    <TimeNexusPlanner :locale="locale" />

    <section class="directory-band" aria-labelledby="time-directory-title">
      <div class="section-heading">
        <div>
          <h2 id="time-directory-title">{{ directoryCopy.title }}</h2>
          <p>{{ directoryCopy.body }}</p>
        </div>
      </div>
      <div class="directory-grid">
        <article v-for="section in catalogSections" :key="section.title" class="directory-card">
          <h3>{{ section.title }}</h3>
          <p>{{ section.body }}</p>
          <div class="inline-link-list">
            <NuxtLink v-for="link in section.links" :key="link.label" :to="link.to">
              {{ link.label }}
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <section class="band city-link-band" aria-labelledby="city-clocks-title">
      <div class="section-heading">
        <div>
          <h2 id="city-clocks-title">{{ copy.citySectionTitle }}</h2>
          <p>{{ copy.citySectionBody }}</p>
        </div>
      </div>
      <div class="city-link-grid">
        <NuxtLink
          v-for="item in cityLinks"
          :key="item.page.slug"
          class="city-card"
          :to="localizedCityTimePath(locale, item.page.slug)"
        >
          <span>{{ item.copy.eyebrow }}</span>
          <strong>{{ item.page.city }}</strong>
          <small>{{ item.page.timeZone }}</small>
          <em>{{ copy.cityCtaLabel }}</em>
        </NuxtLink>
      </div>
    </section>

    <section class="controls" aria-label="Tool controls">
      <div class="field">
        <label for="tool-search">{{ copy.searchLabel }}</label>
        <input id="tool-search" v-model="searchQuery" type="search" :placeholder="copy.searchPlaceholder">
      </div>
      <div class="field">
        <label for="tool-category">{{ copy.categoryLabel }}</label>
        <select id="tool-category" v-model="selectedCategory">
          <option value="all">{{ copy.allCategories }}</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ getCategoryLabel(category, locale) }}
          </option>
        </select>
      </div>
    </section>

    <section class="category-tabs" aria-label="Tool categories">
      <button type="button" :aria-pressed="selectedCategory === 'all'" @click="selectedCategory = 'all'">
        {{ copy.allCategories }}
      </button>
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        :aria-pressed="selectedCategory === category"
        @click="selectedCategory = category"
      >
        {{ getCategoryLabel(category, locale) }}
      </button>
    </section>

    <section class="tool-grid" aria-label="TimeNexus tools">
      <article v-for="tool in filteredTools" :key="tool.slug" class="tool-card">
        <div>
          <div class="tool-card__topline">
            <span class="category">{{ getCategoryLabel(tool.category, locale) }}</span>
            <span :class="getStatusBadgeClass('foundation')">{{ copy.localBadgeLabel }}</span>
          </div>
          <h2>{{ getTimeToolCopy(tool, locale).title }}</h2>
          <p>{{ getTimeToolCopy(tool, locale).headline }}</p>
          <dl>
            <div>
              <dt>{{ copy.freeLabel }}</dt>
              <dd>{{ getTimeToolCopy(tool, locale).freeScope }}</dd>
            </div>
            <div>
              <dt>{{ copy.upgradeLabel }}</dt>
              <dd>{{ getTimeToolCopy(tool, locale).upgradeScope }}</dd>
            </div>
          </dl>
        </div>
        <div class="card-actions">
          <NuxtLink class="button-link" :to="localizedToolPath(locale, tool.slug)">
            {{ copy.detailCta }}
          </NuxtLink>
        </div>
      </article>
    </section>

    <section v-if="filteredTools.length === 0" class="band" aria-live="polite">
      <h2>{{ copy.noResultsTitle }}</h2>
      <p>{{ copy.noResultsBody }}</p>
    </section>

    <section class="band" aria-labelledby="principles-title">
      <h2 id="principles-title">{{ copy.principlesTitle }}</h2>
      <div class="band-grid">
        <div v-for="principle in copy.principles" :key="principle.title">
          <h3>{{ principle.title }}</h3>
          <p>{{ principle.body }}</p>
        </div>
      </div>
    </section>

    <section class="directory-footer" aria-label="TimeNexus directory">
      <div v-for="group in footerGroups" :key="group.title">
        <h2>{{ group.title }}</h2>
        <NuxtLink v-for="link in group.links" :key="link.label" :to="link.to">
          {{ link.label }}
        </NuxtLink>
      </div>
    </section>

    <LegalFooter :locale="locale" />
  </main>
</template>
