import type { LocaleCode } from './locales'

export interface HomeCopy {
  eyebrow: string
  title: string
  lead: string
  searchLabel: string
  searchPlaceholder: string
  categoryLabel: string
  allCategories: string
  noResultsTitle: string
  noResultsBody: string
  freeLabel: string
  upgradeLabel: string
  detailCta: string
  principlesTitle: string
  principles: Array<{ title: string; body: string }>
  statusRows: Array<{ title: string; body: string; tone: 'green' | 'amber' }>
}

export interface ShellCopy {
  breadcrumbHome: string
  runLabel: string
  resetLabel: string
  inputTitle: string
  resultTitle: string
  guideTitle: string
  faqTitle: string
  methodologyLabel: string
  editorialLabel: string
  freeCheckLabel: string
  upgradePathLabel: string
  contentQualityBody: string
  privacyNote: string
  invalidResultTitle: string
  pageStatusLabel: string
  liveTitle: string
  liveBody: string
  gatedTitle: string
  gatedBody: string
}

export const homeCopy: Record<LocaleCode, HomeCopy> = {
  en: {
    eyebrow: 'TimeNexus',
    title: 'Time, date and unit helpers that work in the browser.',
    lead: 'Convert time zones, date spans, business days, timestamps, ages, percentages and everyday units without mandatory signup.',
    searchLabel: 'Search tools',
    searchPlaceholder: 'Try timezone, timestamp, age, percent or units',
    categoryLabel: 'Category',
    allCategories: 'All tools',
    noResultsTitle: 'No tools matched',
    noResultsBody: 'Clear the search or choose another category.',
    freeLabel: 'Free result',
    upgradeLabel: 'Upgrade path',
    detailCta: 'Open tool',
    principlesTitle: 'Sprint 3.3 principles',
    principles: [
      { title: 'Immediate answer', body: 'Each page starts with a working calculator or converter that solves the basic task for free.' },
      { title: 'Locale aware', body: 'Outputs name UTC, local and selected zones clearly so date math stays readable across languages.' },
      { title: 'Upgrade adds workflow', body: 'Paid value is planned for widgets, API, presets, history, collaboration and no ads.' },
    ],
    statusRows: [
      { title: '7 browser tools', body: 'Time zones, date difference, business days, timestamp, age, percentage and units.', tone: 'green' },
      { title: '5 language route sets', body: 'English, Portuguese, Spanish, French and German pages are prerendered.', tone: 'green' },
      { title: 'No accounts or storage', body: 'History, widgets, billing, ads and external analytics remain gated.', tone: 'amber' },
    ],
  },
  'pt-br': {
    eyebrow: 'TimeNexus',
    title: 'Ferramentas de tempo, datas e unidades no navegador.',
    lead: 'Converta fusos, intervalos, dias uteis, timestamps, idade, porcentagens e unidades sem cadastro obrigatorio.',
    searchLabel: 'Buscar ferramentas',
    searchPlaceholder: 'Tente fuso, timestamp, idade, porcentagem ou unidades',
    categoryLabel: 'Categoria',
    allCategories: 'Todas',
    noResultsTitle: 'Nenhuma ferramenta encontrada',
    noResultsBody: 'Limpe a busca ou escolha outra categoria.',
    freeLabel: 'Resultado gratuito',
    upgradeLabel: 'Caminho de upgrade',
    detailCta: 'Abrir ferramenta',
    principlesTitle: 'Principios da Sprint 3.3',
    principles: [
      { title: 'Resposta imediata', body: 'Cada pagina comeca com uma calculadora ou conversor funcional e gratuito.' },
      { title: 'Sensivel a locale', body: 'Resultados nomeiam UTC, local e fusos escolhidos para manter datas legiveis.' },
      { title: 'Upgrade e workflow', body: 'Valor pago planejado: widgets, API, presets, historico, colaboracao e sem anuncios.' },
    ],
    statusRows: [
      { title: '7 ferramentas no navegador', body: 'Fusos, diferenca de datas, dias uteis, timestamp, idade, porcentagem e unidades.', tone: 'green' },
      { title: '5 conjuntos de idioma', body: 'Paginas em ingles, portugues, espanhol, frances e alemao sao prerenderizadas.', tone: 'green' },
      { title: 'Sem contas ou storage', body: 'Historico, widgets, billing, ads e analytics externo seguem bloqueados.', tone: 'amber' },
    ],
  },
  es: {
    eyebrow: 'TimeNexus',
    title: 'Herramientas de tiempo, fechas y unidades en el navegador.',
    lead: 'Convierte zonas horarias, fechas, dias laborables, timestamps, edad, porcentajes y unidades sin registro obligatorio.',
    searchLabel: 'Buscar herramientas',
    searchPlaceholder: 'Prueba zona, timestamp, edad, porcentaje o unidades',
    categoryLabel: 'Categoria',
    allCategories: 'Todas',
    noResultsTitle: 'No hay herramientas',
    noResultsBody: 'Borra la busqueda o elige otra categoria.',
    freeLabel: 'Resultado gratis',
    upgradeLabel: 'Ruta de upgrade',
    detailCta: 'Abrir herramienta',
    principlesTitle: 'Principios Sprint 3.3',
    principles: [
      { title: 'Respuesta inmediata', body: 'Cada pagina inicia con una calculadora o conversor gratis y funcional.' },
      { title: 'Con locale', body: 'Los resultados nombran UTC, local y zonas elegidas para que las fechas sean claras.' },
      { title: 'Upgrade como workflow', body: 'Valor pago planeado: widgets, API, presets, historial, colaboracion y sin anuncios.' },
    ],
    statusRows: [
      { title: '7 herramientas browser', body: 'Zonas, diferencia de fechas, dias laborables, timestamp, edad, porcentaje y unidades.', tone: 'green' },
      { title: '5 rutas de idioma', body: 'Paginas en ingles, portugues, espanol, frances y aleman se prerenderizan.', tone: 'green' },
      { title: 'Sin cuentas ni storage', body: 'Historial, widgets, billing, ads y analytics externo siguen bloqueados.', tone: 'amber' },
    ],
  },
  fr: {
    eyebrow: 'TimeNexus',
    title: 'Outils temps, dates et unites dans le navigateur.',
    lead: 'Convertissez fuseaux, ecarts de dates, jours ouvrables, timestamps, age, pourcentages et unites sans compte obligatoire.',
    searchLabel: 'Rechercher',
    searchPlaceholder: 'Fuseau, timestamp, age, pourcentage ou unites',
    categoryLabel: 'Categorie',
    allCategories: 'Tous',
    noResultsTitle: 'Aucun outil',
    noResultsBody: 'Effacez la recherche ou choisissez une autre categorie.',
    freeLabel: 'Resultat gratuit',
    upgradeLabel: 'Offre payante',
    detailCta: 'Ouvrir',
    principlesTitle: 'Principes Sprint 3.3',
    principles: [
      { title: 'Reponse immediate', body: 'Chaque page commence par un calculateur ou convertisseur gratuit et fonctionnel.' },
      { title: 'Locale lisible', body: 'Les resultats nomment UTC, local et les fuseaux choisis pour clarifier les dates.' },
      { title: 'Upgrade workflow', body: 'Valeur payante prevue: widgets, API, presets, historique, collaboration et sans publicite.' },
    ],
    statusRows: [
      { title: '7 outils navigateur', body: 'Fuseaux, ecart de dates, jours ouvrables, timestamp, age, pourcentage et unites.', tone: 'green' },
      { title: '5 routes de langue', body: 'Pages anglaises, portugaises, espagnoles, francaises et allemandes prerenderisees.', tone: 'green' },
      { title: 'Pas de comptes ni storage', body: 'Historique, widgets, billing, ads et analytics externe restent bloques.', tone: 'amber' },
    ],
  },
  de: {
    eyebrow: 'TimeNexus',
    title: 'Zeit-, Datums- und Einheitenhelfer im Browser.',
    lead: 'Konvertieren Sie Zeitzonen, Datumsabstaende, Arbeitstage, Timestamps, Alter, Prozentwerte und Einheiten ohne Pflichtkonto.',
    searchLabel: 'Tools suchen',
    searchPlaceholder: 'Zeitzone, Timestamp, Alter, Prozent oder Einheiten',
    categoryLabel: 'Kategorie',
    allCategories: 'Alle Tools',
    noResultsTitle: 'Keine Tools gefunden',
    noResultsBody: 'Leeren Sie die Suche oder waehlen Sie eine andere Kategorie.',
    freeLabel: 'Kostenloses Ergebnis',
    upgradeLabel: 'Upgrade-Pfad',
    detailCta: 'Tool oeffnen',
    principlesTitle: 'Sprint-3.3-Prinzipien',
    principles: [
      { title: 'Sofortige Antwort', body: 'Jede Seite startet mit einem kostenlosen funktionierenden Rechner oder Konverter.' },
      { title: 'Locale-bewusst', body: 'Ergebnisse nennen UTC, lokal und gewaehlte Zonen klar fuer lesbare Datumslogik.' },
      { title: 'Bezahlwert ist Workflow', body: 'Geplant sind Widgets, API, Presets, Verlauf, Zusammenarbeit und keine Anzeigen.' },
    ],
    statusRows: [
      { title: '7 Browser-Tools', body: 'Zeitzonen, Datumsdifferenz, Arbeitstage, Timestamp, Alter, Prozent und Einheiten.', tone: 'green' },
      { title: '5 Sprachrouten', body: 'Englische, portugiesische, spanische, franzoesische und deutsche Seiten werden prerendered.', tone: 'green' },
      { title: 'Keine Konten oder Storage', body: 'Verlauf, Widgets, Billing, Ads und externe Analytics bleiben gesperrt.', tone: 'amber' },
    ],
  },
}

export const shellCopy: Record<LocaleCode, ShellCopy> = {
  en: {
    breadcrumbHome: 'TimeNexus',
    runLabel: 'Run tool',
    resetLabel: 'Reset example',
    inputTitle: 'Inputs',
    resultTitle: 'Result',
    guideTitle: 'Guide and limits',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    freeCheckLabel: 'Free utility',
    upgradePathLabel: 'Upgrade path',
    contentQualityBody: 'This page combines the working tool, visible limits, FAQ and review date required before AdSense review.',
    privacyNote: 'The tool runs in this browser session. TimeNexus does not store inputs, use localStorage or send values to a product API in Sprint 3.3.',
    invalidResultTitle: 'Check the input',
    pageStatusLabel: 'Tool status',
    liveTitle: 'Client-side MVP',
    liveBody: 'The free utility works without signup and runs in a browser worker when supported.',
    gatedTitle: 'Commercial features gated',
    gatedBody: 'Widgets, API, presets, history, billing and ads are not active yet.',
  },
  'pt-br': {
    breadcrumbHome: 'TimeNexus',
    runLabel: 'Executar',
    resetLabel: 'Restaurar exemplo',
    inputTitle: 'Entradas',
    resultTitle: 'Resultado',
    guideTitle: 'Guia e limites',
    faqTitle: 'Perguntas frequentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Utilitario gratuito',
    upgradePathLabel: 'Caminho de upgrade',
    contentQualityBody: 'Esta pagina combina ferramenta funcional, limites, FAQ e revisao antes de AdSense.',
    privacyNote: 'A ferramenta roda nesta sessao do navegador. O TimeNexus nao armazena entradas, nao usa localStorage e nao envia valores para API na Sprint 3.3.',
    invalidResultTitle: 'Confira a entrada',
    pageStatusLabel: 'Status da ferramenta',
    liveTitle: 'MVP client-side',
    liveBody: 'A ferramenta gratuita funciona sem cadastro e roda em Web Worker quando suportado.',
    gatedTitle: 'Recursos comerciais bloqueados',
    gatedBody: 'Widgets, API, presets, historico, billing e anuncios ainda nao estao ativos.',
  },
  es: {
    breadcrumbHome: 'TimeNexus',
    runLabel: 'Ejecutar',
    resetLabel: 'Restaurar ejemplo',
    inputTitle: 'Entradas',
    resultTitle: 'Resultado',
    guideTitle: 'Guia y limites',
    faqTitle: 'Preguntas frecuentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Utilidad gratis',
    upgradePathLabel: 'Ruta de upgrade',
    contentQualityBody: 'Esta pagina combina herramienta funcional, limites, FAQ y revision antes de AdSense.',
    privacyNote: 'La herramienta corre en esta sesion del navegador. TimeNexus no almacena entradas, no usa localStorage y no envia valores a una API en Sprint 3.3.',
    invalidResultTitle: 'Revisa la entrada',
    pageStatusLabel: 'Estado de herramienta',
    liveTitle: 'MVP client-side',
    liveBody: 'La utilidad gratis funciona sin registro y corre en Web Worker cuando hay soporte.',
    gatedTitle: 'Funciones comerciales bloqueadas',
    gatedBody: 'Widgets, API, presets, historial, billing y anuncios aun no estan activos.',
  },
  fr: {
    breadcrumbHome: 'TimeNexus',
    runLabel: 'Executer',
    resetLabel: 'Restaurer exemple',
    inputTitle: 'Entrees',
    resultTitle: 'Resultat',
    guideTitle: 'Guide et limites',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    freeCheckLabel: 'Utilitaire gratuit',
    upgradePathLabel: 'Offre payante',
    contentQualityBody: 'Cette page combine outil fonctionnel, limites, FAQ et date de revue avant AdSense.',
    privacyNote: 'L outil s execute dans cette session du navigateur. TimeNexus ne stocke pas les entrees, n utilise pas localStorage et n envoie pas de valeurs a une API en Sprint 3.3.',
    invalidResultTitle: 'Verifiez l entree',
    pageStatusLabel: 'Statut outil',
    liveTitle: 'MVP client-side',
    liveBody: 'L utilitaire gratuit fonctionne sans compte et s execute en Web Worker si supporte.',
    gatedTitle: 'Fonctions commerciales bloquees',
    gatedBody: 'Widgets, API, presets, historique, billing et publicites ne sont pas actifs.',
  },
  de: {
    breadcrumbHome: 'TimeNexus',
    runLabel: 'Ausfuehren',
    resetLabel: 'Beispiel zuruecksetzen',
    inputTitle: 'Eingaben',
    resultTitle: 'Ergebnis',
    guideTitle: 'Leitfaden und Grenzen',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    freeCheckLabel: 'Kostenloses Tool',
    upgradePathLabel: 'Upgrade-Pfad',
    contentQualityBody: 'Diese Seite kombiniert funktionierendes Tool, Grenzen, FAQ und Pruefdatum vor AdSense.',
    privacyNote: 'Das Tool laeuft in dieser Browser-Sitzung. TimeNexus speichert keine Eingaben, nutzt kein localStorage und sendet in Sprint 3.3 keine Werte an eine API.',
    invalidResultTitle: 'Eingabe pruefen',
    pageStatusLabel: 'Toolstatus',
    liveTitle: 'Client-seitiges MVP',
    liveBody: 'Das kostenlose Tool funktioniert ohne Konto und laeuft bei Support in einem Web Worker.',
    gatedTitle: 'Kommerzielle Funktionen gesperrt',
    gatedBody: 'Widgets, API, Presets, Verlauf, Billing und Anzeigen sind noch nicht aktiv.',
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return homeCopy[locale]
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return shellCopy[locale]
}
