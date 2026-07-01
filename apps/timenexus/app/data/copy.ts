import { sanitizePublicCopy, type LocaleCode } from './locales'

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
  localBadgeLabel: string
  citySectionTitle: string
  citySectionBody: string
  cityCtaLabel: string
  principlesTitle: string
  principles: Array<{ title: string; body: string }>
  statusRows: Array<{ title: string; body: string; tone: 'green' | 'amber' }>
}

export interface PlannerCopy {
  eyebrow: string
  title: string
  body: string
  privacyNote: string
  currentTitle: string
  currentBody: string
  meetingTitle: string
  meetingBody: string
  localDateTimeLabel: string
  sourceZoneLabel: string
  groupLabel: string
  durationLabel: string
  sourceLocalLabel: string
  utcLabel: string
  worldClockTitle: string
  suggestionsTitle: string
  slotColumnLabel: string
  fitColumnLabel: string
  zonesColumnLabel: string
  businessStatus: string
  earlyStatus: string
  lateStatus: string
  openWorldClockLabel: string
  openConverterLabel: string
  openTimestampLabel: string
}

export interface ShellCopy {
  breadcrumbHome: string
  runLabel: string
  resetLabel: string
  inputTitle: string
  resultTitle: string
  directAnswerTitle: string
  answerEmptyTitle: string
  answerEmptyBody: string
  answerRunningTitle: string
  answerRunningBody: string
  answerReadyLabel: string
  timelineTitle: string
  timelineBody: string
  exampleTitle: string
  exampleBody: string
  relatedTitle: string
  relatedBody: string
  openRelatedLabel: string
  guideTitle: string
  faqTitle: string
  methodologyLabel: string
  editorialLabel: string
  freeCheckLabel: string
  upgradePathLabel: string
  contentQualityBody: string
  privacyNote: string
  invalidResultTitle: string
  localBadgeLabel: string
  pageStatusLabel: string
  liveTitle: string
  liveBody: string
  gatedTitle: string
  gatedBody: string
  gatedItemsTitle: string
  gatedItems: string[]
  supportTitle: string
  supportBody: string
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
    localBadgeLabel: 'Browser-side',
    citySectionTitle: 'Curated city clocks',
    citySectionBody: 'Start with a reviewed city page, then open the planner for the same IANA time zone and related collaboration hubs.',
    cityCtaLabel: 'Open city guide',
    principlesTitle: 'Operating principles',
    principles: [
      { title: 'Immediate answer', body: 'Each page starts with a working calculator or converter that solves the basic task for free.' },
      { title: 'Locale aware', body: 'Outputs name UTC, local and selected zones clearly so date math stays readable across languages.' },
      { title: 'Workflow depth', body: 'Advanced workflows belong in widgets, API automation, presets and collaboration.' },
    ],
    statusRows: [
      { title: '7 browser tools', body: 'Time zones, date difference, business days, timestamp, age, percentage and units.', tone: 'green' },
      { title: '5 language route sets', body: 'English, Portuguese, Spanish, French and German pages are prerendered.', tone: 'green' },
      { title: 'Current time now', body: 'World clock and planner values render immediately in the browser.', tone: 'green' },
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
    localBadgeLabel: 'No navegador',
    citySectionTitle: 'Relogios de cidade curados',
    citySectionBody: 'Comece por uma pagina revisada de cidade, depois abra o planejador com o mesmo fuso IANA e hubs relacionados.',
    cityCtaLabel: 'Abrir guia da cidade',
    principlesTitle: 'Principios de operacao',
    principles: [
      { title: 'Resposta imediata', body: 'Cada pagina comeca com uma calculadora ou conversor funcional e gratuito.' },
      { title: 'Sensivel a locale', body: 'Resultados nomeiam UTC, local e fusos escolhidos para manter datas legiveis.' },
      { title: 'Profundidade de workflow', body: 'Valor de upgrade fica em widgets, automacao por API, presets e colaboracao.' },
    ],
    statusRows: [
      { title: '7 ferramentas no navegador', body: 'Fusos, diferenca de datas, dias uteis, timestamp, idade, porcentagem e unidades.', tone: 'green' },
      { title: '5 conjuntos de idioma', body: 'Paginas em ingles, portugues, espanhol, frances e alemao sao prerenderizadas.', tone: 'green' },
      { title: 'Hora atual imediata', body: 'Relogio mundial e planejador renderizam valores diretamente no navegador.', tone: 'green' },
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
    localBadgeLabel: 'En navegador',
    citySectionTitle: 'Relojes de ciudad curados',
    citySectionBody: 'Empieza con una pagina revisada de ciudad y abre el planificador con la misma zona IANA y hubs relacionados.',
    cityCtaLabel: 'Abrir guia de ciudad',
    principlesTitle: 'Principios operativos',
    principles: [
      { title: 'Respuesta inmediata', body: 'Cada pagina inicia con una calculadora o conversor gratis y funcional.' },
      { title: 'Con locale', body: 'Los resultados nombran UTC, local y zonas elegidas para que las fechas sean claras.' },
      { title: 'Profundidad de workflow', body: 'El valor de upgrade esta en widgets, automatizacion por API, presets y colaboracion.' },
    ],
    statusRows: [
      { title: '7 herramientas browser', body: 'Zonas, diferencia de fechas, dias laborables, timestamp, edad, porcentaje y unidades.', tone: 'green' },
      { title: '5 rutas de idioma', body: 'Paginas en ingles, portugues, espanol, frances y aleman se prerenderizan.', tone: 'green' },
      { title: 'Hora actual inmediata', body: 'Reloj mundial y planificador renderizan valores directamente en el navegador.', tone: 'green' },
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
    localBadgeLabel: 'Dans le navigateur',
    citySectionTitle: 'Horloges de ville selectionnees',
    citySectionBody: 'Commencez par une page ville relue, puis ouvrez le planificateur avec le meme fuseau IANA et les hubs lies.',
    cityCtaLabel: 'Ouvrir le guide ville',
    principlesTitle: 'Principes operationnels',
    principles: [
      { title: 'Reponse immediate', body: 'Chaque page commence par un calculateur ou convertisseur gratuit et fonctionnel.' },
      { title: 'Locale lisible', body: 'Les resultats nomment UTC, local et les fuseaux choisis pour clarifier les dates.' },
      { title: 'Profondeur workflow', body: 'La valeur upgrade se trouve dans widgets, automatisation API, presets et collaboration.' },
    ],
    statusRows: [
      { title: '7 outils navigateur', body: 'Fuseaux, ecart de dates, jours ouvrables, timestamp, age, pourcentage et unites.', tone: 'green' },
      { title: '5 routes de langue', body: 'Pages anglaises, portugaises, espagnoles, francaises et allemandes prerenderisees.', tone: 'green' },
      { title: 'Heure actuelle immediate', body: 'Horloge mondiale et planificateur affichent les valeurs directement dans le navigateur.', tone: 'green' },
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
    localBadgeLabel: 'Im Browser',
    citySectionTitle: 'Kuratierte Stadtuhren',
    citySectionBody: 'Starten Sie mit einer geprueften Stadtseite und oeffnen Sie dann den Planer mit derselben IANA-Zone und verbundenen Hubs.',
    cityCtaLabel: 'Stadtguide oeffnen',
    principlesTitle: 'Betriebsprinzipien',
    principles: [
      { title: 'Sofortige Antwort', body: 'Jede Seite startet mit einem kostenlosen funktionierenden Rechner oder Konverter.' },
      { title: 'Locale-bewusst', body: 'Ergebnisse nennen UTC, lokal und gewaehlte Zonen klar fuer lesbare Datumslogik.' },
      { title: 'Workflow-Tiefe', body: 'Upgrade-Wert liegt in Widgets, API-Automation, Presets und Zusammenarbeit.' },
    ],
    statusRows: [
      { title: '7 Browser-Tools', body: 'Zeitzonen, Datumsdifferenz, Arbeitstage, Timestamp, Alter, Prozent und Einheiten.', tone: 'green' },
      { title: '5 Sprachrouten', body: 'Englische, portugiesische, spanische, franzoesische und deutsche Seiten werden prerendered.', tone: 'green' },
      { title: 'Aktuelle Zeit sofort', body: 'Weltuhr und Planer zeigen Werte direkt im Browser.', tone: 'green' },
    ],
  },
}

export const plannerCopy: Record<LocaleCode, PlannerCopy> = {
  en: {
    eyebrow: 'World clock planner',
    title: 'Plan one meeting across cities before opening the catalog.',
    body: 'Set a local meeting time, compare it across common business zones and see which slots stay inside working hours.',
    privacyNote: 'Times are calculated in the browser. No city, date or time is saved by TimeNexus.',
    currentTitle: 'Current time panel',
    currentBody: 'A quick world clock for common collaboration hubs.',
    meetingTitle: 'Meeting planner',
    meetingBody: 'Use the local time and source zone as the anchor, then compare the same instant across the selected group.',
    localDateTimeLabel: 'Local meeting time',
    sourceZoneLabel: 'Source zone',
    groupLabel: 'City group',
    durationLabel: 'Duration',
    sourceLocalLabel: 'Source local',
    utcLabel: 'UTC instant',
    worldClockTitle: 'World clock',
    suggestionsTitle: 'Nearby slots',
    slotColumnLabel: 'Slot',
    fitColumnLabel: 'Business-hour fit',
    zonesColumnLabel: 'Zones in working hours',
    businessStatus: 'Business hours',
    earlyStatus: 'Early',
    lateStatus: 'Late',
    openWorldClockLabel: 'Open city comparison',
    openConverterLabel: 'Open time zone converter',
    openTimestampLabel: 'Open timestamp converter',
  },
  'pt-br': {
    eyebrow: 'Planejador de fusos',
    title: 'Planeje uma reuniao entre cidades antes do catalogo.',
    body: 'Defina um horario local, compare em fusos de negocio comuns e veja quais opcoes ficam dentro do expediente.',
    privacyNote: 'Os horarios sao calculados no navegador. Nenhuma cidade, data ou hora e salva pelo TimeNexus.',
    currentTitle: 'Painel de hora atual',
    currentBody: 'Um relogio mundial rapido para hubs comuns de colaboracao.',
    meetingTitle: 'Planejador de reuniao',
    meetingBody: 'Use o horario local e o fuso de origem como ancora, depois compare o mesmo instante no grupo selecionado.',
    localDateTimeLabel: 'Horario local da reuniao',
    sourceZoneLabel: 'Fuso de origem',
    groupLabel: 'Grupo de cidades',
    durationLabel: 'Duracao',
    sourceLocalLabel: 'Local de origem',
    utcLabel: 'Instante UTC',
    worldClockTitle: 'Relogio mundial',
    suggestionsTitle: 'Horarios proximos',
    slotColumnLabel: 'Horario',
    fitColumnLabel: 'Aderencia ao expediente',
    zonesColumnLabel: 'Fusos em horario comercial',
    businessStatus: 'Horario comercial',
    earlyStatus: 'Cedo',
    lateStatus: 'Tarde',
    openWorldClockLabel: 'Abrir comparacao de cidades',
    openConverterLabel: 'Abrir conversor de fusos',
    openTimestampLabel: 'Abrir conversor de timestamp',
  },
  es: {
    eyebrow: 'Planificador de zonas',
    title: 'Planifica una reunion entre ciudades antes del catalogo.',
    body: 'Define una hora local, compara zonas de negocio comunes y mira que opciones quedan dentro del horario laboral.',
    privacyNote: 'Los horarios se calculan en el navegador. TimeNexus no guarda ciudad, fecha ni hora.',
    currentTitle: 'Panel de hora actual',
    currentBody: 'Un reloj mundial rapido para hubs comunes de colaboracion.',
    meetingTitle: 'Planificador de reunion',
    meetingBody: 'Usa la hora local y zona origen como ancla, luego compara el mismo instante en el grupo elegido.',
    localDateTimeLabel: 'Hora local de reunion',
    sourceZoneLabel: 'Zona origen',
    groupLabel: 'Grupo de ciudades',
    durationLabel: 'Duracion',
    sourceLocalLabel: 'Local origen',
    utcLabel: 'Instante UTC',
    worldClockTitle: 'Reloj mundial',
    suggestionsTitle: 'Horarios cercanos',
    slotColumnLabel: 'Horario',
    fitColumnLabel: 'Encaje laboral',
    zonesColumnLabel: 'Zonas en horario laboral',
    businessStatus: 'Horario laboral',
    earlyStatus: 'Temprano',
    lateStatus: 'Tarde',
    openWorldClockLabel: 'Abrir comparacion de ciudades',
    openConverterLabel: 'Abrir conversor de zonas',
    openTimestampLabel: 'Abrir conversor de timestamp',
  },
  fr: {
    eyebrow: 'Planificateur de fuseaux',
    title: 'Planifiez une reunion entre villes avant le catalogue.',
    body: 'Definissez une heure locale, comparez les fuseaux business courants et voyez les options en heures ouvrables.',
    privacyNote: 'Les horaires sont calcules dans le navigateur. TimeNexus ne sauvegarde ni ville, ni date, ni heure.',
    currentTitle: 'Panneau heure actuelle',
    currentBody: 'Une horloge mondiale rapide pour les hubs de collaboration.',
    meetingTitle: 'Planificateur de reunion',
    meetingBody: 'Utilisez heure locale et fuseau source comme ancre, puis comparez le meme instant dans le groupe choisi.',
    localDateTimeLabel: 'Heure locale de reunion',
    sourceZoneLabel: 'Fuseau source',
    groupLabel: 'Groupe de villes',
    durationLabel: 'Duree',
    sourceLocalLabel: 'Local source',
    utcLabel: 'Instant UTC',
    worldClockTitle: 'Horloge mondiale',
    suggestionsTitle: 'Creneaux proches',
    slotColumnLabel: 'Creneau',
    fitColumnLabel: 'Compatibilite ouvrable',
    zonesColumnLabel: 'Fuseaux en heures ouvrables',
    businessStatus: 'Heures ouvrables',
    earlyStatus: 'Tot',
    lateStatus: 'Tard',
    openWorldClockLabel: 'Ouvrir comparaison de villes',
    openConverterLabel: 'Ouvrir le convertisseur de fuseaux',
    openTimestampLabel: 'Ouvrir le convertisseur timestamp',
  },
  de: {
    eyebrow: 'Zeitzonenplaner',
    title: 'Planen Sie ein Meeting zwischen Staedten vor dem Katalog.',
    body: 'Setzen Sie eine lokale Zeit, vergleichen Sie wichtige Arbeitszonen und sehen Sie passende Arbeitszeitfenster.',
    privacyNote: 'Zeiten werden im Browser berechnet. TimeNexus speichert keine Stadt, kein Datum und keine Uhrzeit.',
    currentTitle: 'Aktuelle-Zeit-Panel',
    currentBody: 'Eine schnelle Weltuhr fuer haeufige Kollaborations-Hubs.',
    meetingTitle: 'Meeting-Planer',
    meetingBody: 'Lokale Zeit und Quellzone dienen als Anker; derselbe Zeitpunkt wird in der Gruppe verglichen.',
    localDateTimeLabel: 'Lokale Meetingzeit',
    sourceZoneLabel: 'Quellzone',
    groupLabel: 'Staedtegruppe',
    durationLabel: 'Dauer',
    sourceLocalLabel: 'Quellzeit',
    utcLabel: 'UTC-Zeitpunkt',
    worldClockTitle: 'Weltuhr',
    suggestionsTitle: 'Nahe Zeitfenster',
    slotColumnLabel: 'Zeitfenster',
    fitColumnLabel: 'Arbeitszeit-Fit',
    zonesColumnLabel: 'Zonen in Arbeitszeit',
    businessStatus: 'Arbeitszeit',
    earlyStatus: 'Frueh',
    lateStatus: 'Spaet',
    openWorldClockLabel: 'Staedtevergleich oeffnen',
    openConverterLabel: 'Zeitzonen-Konverter oeffnen',
    openTimestampLabel: 'Timestamp-Konverter oeffnen',
  },
}

export const shellCopy: Record<LocaleCode, ShellCopy> = {
  en: {
    breadcrumbHome: 'TimeNexus',
    runLabel: 'Run tool',
    resetLabel: 'Reset example',
    inputTitle: 'Inputs',
    resultTitle: 'Result',
    directAnswerTitle: 'Direct answer',
    answerEmptyTitle: 'Example loaded',
    answerEmptyBody: 'Run the local tool to replace this panel with the converted time, span or calculation summary.',
    answerRunningTitle: 'Calculating locally',
    answerRunningBody: 'The browser is processing the current inputs without account storage.',
    answerReadyLabel: 'Ready',
    timelineTitle: 'Meeting timeline',
    timelineBody: 'Compare the same instant across UTC, source and target zones.',
    exampleTitle: 'Example',
    exampleBody: 'The form starts with a safe sample so the free workflow can be checked before entering private values.',
    relatedTitle: 'Related tools',
    relatedBody: 'Move to nearby time, date and conversion helpers without leaving the local workflow.',
    openRelatedLabel: 'Open',
    guideTitle: 'Guide and limits',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    freeCheckLabel: 'Free utility',
    upgradePathLabel: 'Upgrade path',
    contentQualityBody: 'This page combines the working tool, visible limits, FAQ and review date required before AdSense review.',
    privacyNote: 'The tool runs in this browser session. TimeNexus does not store inputs, use localStorage or send values to a product API.',
    invalidResultTitle: 'Check the input',
    localBadgeLabel: 'Browser-side',
    pageStatusLabel: 'Tool status',
    liveTitle: 'Client-side utility',
    liveBody: 'The free utility works without signup and runs in a browser worker when supported.',
    gatedTitle: 'Workflow options',
    gatedBody: 'Widgets, API automation, saved presets and team sharing are reserved for later product depth.',
    gatedItemsTitle: 'Repeat scheduling options',
    gatedItems: ['Embeddable widgets', 'Saved presets', 'Team sharing', 'API access', 'Calendar workflows'],
    supportTitle: 'Support path',
    supportBody: 'Use the free browser tools for the basic answer; support channels stay informational for now.',
  },
  'pt-br': {
    breadcrumbHome: 'TimeNexus',
    runLabel: 'Executar',
    resetLabel: 'Restaurar exemplo',
    inputTitle: 'Entradas',
    resultTitle: 'Resultado',
    directAnswerTitle: 'Resposta direta',
    answerEmptyTitle: 'Exemplo carregado',
    answerEmptyBody: 'Execute a ferramenta local para trocar este painel pelo resumo de horario, intervalo ou calculo.',
    answerRunningTitle: 'Calculando localmente',
    answerRunningBody: 'O navegador processa as entradas atuais sem storage de conta.',
    answerReadyLabel: 'Pronto',
    timelineTitle: 'Linha do tempo',
    timelineBody: 'Compare o mesmo instante em UTC, fuso de origem e fuso de destino.',
    exampleTitle: 'Exemplo',
    exampleBody: 'O formulario inicia com uma amostra segura para validar o fluxo gratuito antes de inserir valores privados.',
    relatedTitle: 'Ferramentas relacionadas',
    relatedBody: 'Acesse helpers proximos de tempo, datas e conversao sem sair do fluxo local.',
    openRelatedLabel: 'Abrir',
    guideTitle: 'Guia e limites',
    faqTitle: 'Perguntas frequentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Utilitario gratuito',
    upgradePathLabel: 'Caminho de upgrade',
    contentQualityBody: 'Esta pagina combina ferramenta funcional, limites, FAQ e revisao antes de AdSense.',
    privacyNote: 'A ferramenta roda nesta sessao do navegador. O TimeNexus nao armazena entradas, nao usa localStorage e nao envia valores para API.',
    invalidResultTitle: 'Confira a entrada',
    localBadgeLabel: 'No navegador',
    pageStatusLabel: 'Status da ferramenta',
    liveTitle: 'Utilitario client-side',
    liveBody: 'A ferramenta gratuita funciona sem cadastro e roda em Web Worker quando suportado.',
    gatedTitle: 'Opcoes de workflow',
    gatedBody: 'Widgets, automacao por API, presets salvos e compartilhamento em equipe ficam para profundidade futura do produto.',
    gatedItemsTitle: 'Opcoes para agendamento recorrente',
    gatedItems: ['Widgets incorporaveis', 'Presets salvos', 'Compartilhamento em equipe', 'Acesso por API', 'Fluxos de calendario'],
    supportTitle: 'Caminho de suporte',
    supportBody: 'Use as ferramentas gratuitas do navegador para a resposta basica; canais de suporte seguem informativos por enquanto.',
  },
  es: {
    breadcrumbHome: 'TimeNexus',
    runLabel: 'Ejecutar',
    resetLabel: 'Restaurar ejemplo',
    inputTitle: 'Entradas',
    resultTitle: 'Resultado',
    directAnswerTitle: 'Respuesta directa',
    answerEmptyTitle: 'Ejemplo cargado',
    answerEmptyBody: 'Ejecuta la herramienta local para reemplazar este panel por el resumen de horario, intervalo o calculo.',
    answerRunningTitle: 'Calculando localmente',
    answerRunningBody: 'El navegador procesa las entradas actuales sin storage de cuenta.',
    answerReadyLabel: 'Listo',
    timelineTitle: 'Linea de tiempo',
    timelineBody: 'Compara el mismo instante en UTC, zona origen y zona destino.',
    exampleTitle: 'Ejemplo',
    exampleBody: 'El formulario inicia con una muestra segura para revisar el flujo gratis antes de ingresar valores privados.',
    relatedTitle: 'Herramientas relacionadas',
    relatedBody: 'Abre helpers cercanos de tiempo, fechas y conversion sin salir del flujo local.',
    openRelatedLabel: 'Abrir',
    guideTitle: 'Guia y limites',
    faqTitle: 'Preguntas frecuentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Utilidad gratis',
    upgradePathLabel: 'Ruta de upgrade',
    contentQualityBody: 'Esta pagina combina herramienta funcional, limites, FAQ y revision antes de AdSense.',
    privacyNote: 'La herramienta corre en esta sesion del navegador. TimeNexus no almacena entradas, no usa localStorage y no envia valores a una API.',
    invalidResultTitle: 'Revisa la entrada',
    localBadgeLabel: 'En navegador',
    pageStatusLabel: 'Estado de herramienta',
    liveTitle: 'Utilidad client-side',
    liveBody: 'La utilidad gratis funciona sin registro y corre en Web Worker cuando hay soporte.',
    gatedTitle: 'Opciones de workflow',
    gatedBody: 'Widgets, automatizacion por API, presets guardados y compartir con equipo quedan para profundidad futura del producto.',
    gatedItemsTitle: 'Opciones para agenda recurrente',
    gatedItems: ['Widgets embebibles', 'Presets guardados', 'Compartir con equipo', 'Acceso API', 'Flujos de calendario'],
    supportTitle: 'Ruta de soporte',
    supportBody: 'Usa las herramientas gratis del navegador para la respuesta basica; los canales de soporte siguen informativos por ahora.',
  },
  fr: {
    breadcrumbHome: 'TimeNexus',
    runLabel: 'Executer',
    resetLabel: 'Restaurer exemple',
    inputTitle: 'Entrees',
    resultTitle: 'Resultat',
    directAnswerTitle: 'Reponse directe',
    answerEmptyTitle: 'Exemple charge',
    answerEmptyBody: 'Executez l outil local pour remplacer ce panneau par le resume horaire, intervalle ou calcul.',
    answerRunningTitle: 'Calcul local',
    answerRunningBody: 'Le navigateur traite les entrees actuelles sans stockage de compte.',
    answerReadyLabel: 'Pret',
    timelineTitle: 'Chronologie',
    timelineBody: 'Comparez le meme instant en UTC, fuseau source et fuseau cible.',
    exampleTitle: 'Exemple',
    exampleBody: 'Le formulaire commence avec un exemple sur pour verifier le flux gratuit avant des valeurs privees.',
    relatedTitle: 'Outils lies',
    relatedBody: 'Passez aux aides temps, dates et conversion proches sans quitter le flux local.',
    openRelatedLabel: 'Ouvrir',
    guideTitle: 'Guide et limites',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    freeCheckLabel: 'Utilitaire gratuit',
    upgradePathLabel: 'Offre payante',
    contentQualityBody: 'Cette page combine outil fonctionnel, limites, FAQ et date de revue avant AdSense.',
    privacyNote: 'L outil s execute dans cette session du navigateur. TimeNexus ne stocke pas les entrees, n utilise pas localStorage et n envoie pas de valeurs a une API.',
    invalidResultTitle: 'Verifiez l entree',
    localBadgeLabel: 'Dans le navigateur',
    pageStatusLabel: 'Statut outil',
    liveTitle: 'Utilitaire client-side',
    liveBody: 'L utilitaire gratuit fonctionne sans compte et s execute en Web Worker si supporte.',
    gatedTitle: 'Options workflow',
    gatedBody: 'Widgets, automatisation API, presets sauvegardes et partage equipe restent pour une profondeur produit future.',
    gatedItemsTitle: 'Options pour planification recurrente',
    gatedItems: ['Widgets integrables', 'Presets sauvegardes', 'Partage equipe', 'Acces API', 'Flux calendrier'],
    supportTitle: 'Parcours support',
    supportBody: 'Utilisez les outils gratuits du navigateur pour la reponse de base; les canaux support restent informatifs pour le moment.',
  },
  de: {
    breadcrumbHome: 'TimeNexus',
    runLabel: 'Ausfuehren',
    resetLabel: 'Beispiel zuruecksetzen',
    inputTitle: 'Eingaben',
    resultTitle: 'Ergebnis',
    directAnswerTitle: 'Direkte Antwort',
    answerEmptyTitle: 'Beispiel geladen',
    answerEmptyBody: 'Fuehren Sie das lokale Tool aus, um hier die Zeit-, Datums- oder Rechenzusammenfassung zu sehen.',
    answerRunningTitle: 'Lokale Berechnung',
    answerRunningBody: 'Der Browser verarbeitet die aktuellen Eingaben ohne Konto-Storage.',
    answerReadyLabel: 'Bereit',
    timelineTitle: 'Meeting-Timeline',
    timelineBody: 'Vergleichen Sie denselben Zeitpunkt in UTC, Quellzone und Zielzone.',
    exampleTitle: 'Beispiel',
    exampleBody: 'Das Formular startet mit einem sicheren Beispiel, bevor private Werte eingegeben werden.',
    relatedTitle: 'Verwandte Tools',
    relatedBody: 'Wechseln Sie zu nahen Zeit-, Datums- und Umrechnungshelfern im lokalen Ablauf.',
    openRelatedLabel: 'Oeffnen',
    guideTitle: 'Leitfaden und Grenzen',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    freeCheckLabel: 'Kostenloses Tool',
    upgradePathLabel: 'Upgrade-Pfad',
    contentQualityBody: 'Diese Seite kombiniert funktionierendes Tool, Grenzen, FAQ und Pruefdatum vor AdSense.',
    privacyNote: 'Das Tool laeuft in dieser Browser-Sitzung. TimeNexus speichert keine Eingaben, nutzt kein localStorage und sendet keine Werte an eine API.',
    invalidResultTitle: 'Eingabe pruefen',
    localBadgeLabel: 'Im Browser',
    pageStatusLabel: 'Toolstatus',
    liveTitle: 'Client-seitiges Tool',
    liveBody: 'Das kostenlose Tool funktioniert ohne Konto und laeuft bei Support in einem Web Worker.',
    gatedTitle: 'Workflow-Optionen',
    gatedBody: 'Widgets, API-Automation, gespeicherte Presets und Teamfreigabe bleiben spaeterer Produkttiefe vorbehalten.',
    gatedItemsTitle: 'Optionen fuer wiederholte Planung',
    gatedItems: ['Einbettbare Widgets', 'Gespeicherte Presets', 'Teamfreigabe', 'API-Zugriff', 'Kalender-Workflows'],
    supportTitle: 'Support-Pfad',
    supportBody: 'Nutzen Sie die kostenlosen Browser-Tools fuer die Basisantwort; Supportkanaele bleiben vorerst informativ.',
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return sanitizePublicCopy(locale, homeCopy[locale])
}

export function getPlannerCopy(locale: LocaleCode): PlannerCopy {
  return sanitizePublicCopy(locale, plannerCopy[locale])
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return sanitizePublicCopy(locale, shellCopy[locale])
}
