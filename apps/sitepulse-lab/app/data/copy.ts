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
  principlesTitle: string
  principles: Array<{ title: string; body: string }>
  statusRows: Array<{ title: string; body: string; tone: 'green' | 'amber' }>
}

export interface ShellCopy {
  breadcrumbHome: string
  pageStatusLabel: string
  relatedTitle: string
  relatedBody: string
  privacyTitle: string
  privacyBody: string
  pulseScoreTitle: string
  checklistTitle: string
  recommendationTitle: string
  recommendationEmpty: string
  monitoringTitle: string
  monitoringBody: string
  monitoringItems: string[]
  overviewTabLabel: string
  findingsTabLabel: string
  detailsTabLabel: string
  exampleLabel: string
  methodologyLabel: string
  editorialLabel: string
  resultTitle: string
  runningLabel: string
  copyReportLabel: string
  copiedReportLabel: string
  checkAgainLabel: string
  freeCheckLabel: string
  upgradePathLabel: string
  toolGuideTitle: string
  faqTitle: string
  contentQualityBody: string
}

const sharedPrinciples: HomeCopy['principles'] = [
  { title: 'Useful one-shot checks', body: 'A site owner can inspect public availability, redirects, headers, robots, sitemap and timing without creating an account.' },
  { title: 'Bounded probes', body: 'Every request validates public DNS, blocks private ranges, caps redirects, uses short timeouts and applies rate limits.' },
  { title: 'No PII analytics', body: 'URLs, hosts, response headers, redirects, timings and results stay out of product analytics events.' },
]

const localizedPrinciples: Record<LocaleCode, HomeCopy['principles']> = {
  en: sharedPrinciples,
  'pt-br': [
    { title: 'Verificacoes pontuais uteis', body: 'O dono do site inspeciona disponibilidade publica, redirecionamentos, cabecalhos, robots, sitemap e tempo sem criar conta.' },
    { title: 'Consultas limitadas', body: 'Cada requisicao valida DNS publico, bloqueia faixas privadas, limita redirecionamentos, usa timeout curto e aplica limite de taxa.' },
    { title: 'Analytics sem PII', body: 'URLs, hosts, cabecalhos, redirecionamentos, tempos e resultados ficam fora dos eventos de analytics do produto.' },
  ],
  es: [
    { title: 'Checks puntuales utiles', body: 'El dueno del sitio inspecciona disponibilidad publica, redirecciones, headers, robots, sitemap y tiempos sin crear cuenta.' },
    { title: 'Probes limitadas', body: 'Cada solicitud valida DNS publico, bloquea rangos privados, limita redirecciones, usa timeout corto y aplica rate limit.' },
    { title: 'Analytics sin PII', body: 'URLs, hosts, headers, redirecciones, tiempos y resultados quedan fuera de los eventos de analytics del producto.' },
  ],
  fr: [
    { title: 'Controles ponctuels utiles', body: 'Le proprietaire du site inspecte disponibilite publique, redirections, headers, robots, sitemap et temps sans creer de compte.' },
    { title: 'Probes limitees', body: 'Chaque requete valide DNS public, bloque les plages privees, limite les redirections, utilise timeout court et rate limit.' },
    { title: 'Analytics sans PII', body: 'URL, hosts, headers, redirections, timings et resultats restent hors des evenements analytics produit.' },
  ],
  de: [
    { title: 'Nuetzliche Einmal-Checks', body: 'Website-Betreiber pruefen oeffentliche Verfuegbarkeit, Redirects, Header, Robots, Sitemap und Timing ohne Konto.' },
    { title: 'Begrenzte Probes', body: 'Jeder Request validiert Public DNS, blockiert private Bereiche, begrenzt Redirects, nutzt kurze Timeouts und Rate Limits.' },
    { title: 'Analytics ohne PII', body: 'URLs, Hosts, Response-Header, Redirects, Timings und Ergebnisse bleiben aus Produkt-Analytics-Ereignissen heraus.' },
  ],
}

export const homeCopy: Record<LocaleCode, HomeCopy> = {
  en: {
    eyebrow: 'SitePulse Lab',
    title: 'Website health checks without mandatory signup.',
    lead: 'Run bounded status, redirect, header, robots, sitemap, TTFB and performance snapshot checks before paying for monitoring.',
    searchLabel: 'Search website checks',
    searchPlaceholder: 'Try status, redirects, headers or sitemap',
    categoryLabel: 'Category',
    allCategories: 'All checks',
    noResultsTitle: 'No matching website checks',
    noResultsBody: 'Clear the search or choose a different category.',
    freeLabel: 'Free check',
    upgradeLabel: 'Upgrade path',
    detailCta: 'Open check',
    localBadgeLabel: 'Free one-shot',
    principlesTitle: 'Operating principles',
    principles: localizedPrinciples.en,
    statusRows: [
      { title: '7 focused checks', body: 'Status, redirects, headers, robots, sitemap, TTFB and snapshot pages are represented.', tone: 'green' },
      { title: '5 language route sets', body: 'English, Portuguese, Spanish, French and German pages are prerendered.', tone: 'green' },
      { title: 'Point-in-time results', body: 'Each run is a bounded snapshot; use it to triage before changing DNS, CDN or server rules.', tone: 'amber' },
    ],
  },
  'pt-br': {
    eyebrow: 'SitePulse Lab',
    title: 'Verificacoes de saude web sem cadastro obrigatorio.',
    lead: 'Rode status, redirecionamentos, cabecalhos, robots, sitemap, TTFB e snapshot com limites claros antes de pagar por monitoramento.',
    searchLabel: 'Buscar verificacoes web',
    searchPlaceholder: 'Tente status, redirecionamentos, cabecalhos ou sitemap',
    categoryLabel: 'Categoria',
    allCategories: 'Todas as verificacoes',
    noResultsTitle: 'Nenhuma verificacao encontrada',
    noResultsBody: 'Limpe a busca ou escolha outra categoria.',
    freeLabel: 'Verificacao gratuita',
    upgradeLabel: 'Caminho de upgrade',
    detailCta: 'Abrir verificacao',
    localBadgeLabel: 'Verificacao pontual',
    principlesTitle: 'Principios operacionais',
    principles: localizedPrinciples['pt-br'],
    statusRows: [
      { title: '7 verificacoes focadas', body: 'Status, redirecionamentos, cabecalhos, robots, sitemap, TTFB e snapshot estao representados.', tone: 'green' },
      { title: '5 conjuntos de idioma', body: 'Paginas em ingles, portugues, espanhol, frances e alemao sao prerenderizadas.', tone: 'green' },
      { title: 'Resultados pontuais', body: 'Cada execucao e um snapshot limitado; use para triagem antes de mudar DNS, CDN ou servidor.', tone: 'amber' },
    ],
  },
  es: {
    eyebrow: 'SitePulse Lab',
    title: 'Checks de salud web sin registro obligatorio.',
    lead: 'Ejecuta status, redirecciones, headers, robots, sitemap, TTFB y snapshot antes de pagar por monitoreo.',
    searchLabel: 'Buscar checks web',
    searchPlaceholder: 'Status, redirects, headers o sitemap',
    categoryLabel: 'Categoria',
    allCategories: 'Todos',
    noResultsTitle: 'No hay checks',
    noResultsBody: 'Borra la busqueda o elige otra categoria.',
    freeLabel: 'Check gratis',
    upgradeLabel: 'Ruta de upgrade',
    detailCta: 'Abrir check',
    localBadgeLabel: 'Prueba puntual',
    principlesTitle: 'Principios operativos',
    principles: localizedPrinciples.es,
    statusRows: [
      { title: '7 checks enfocados', body: 'Status, redirects, headers, robots, sitemap, TTFB y snapshot estan representados.', tone: 'green' },
      { title: '5 rutas de idioma', body: 'Paginas en ingles, portugues, espanol, frances y aleman se prerenderizan.', tone: 'green' },
      { title: 'Resultados puntuales', body: 'Cada ejecucion es un snapshot limitado; usalo para triaje antes de cambiar DNS, CDN o servidor.', tone: 'amber' },
    ],
  },
  fr: {
    eyebrow: 'SitePulse Lab',
    title: 'Controles de sante web sans compte obligatoire.',
    lead: 'Verifiez statut, redirections, headers, robots, sitemap, TTFB et snapshot avant la surveillance payante.',
    searchLabel: 'Rechercher',
    searchPlaceholder: 'Statut, redirects, headers ou sitemap',
    categoryLabel: 'Categorie',
    allCategories: 'Tous',
    noResultsTitle: 'Aucun controle',
    noResultsBody: 'Effacez la recherche ou choisissez une autre categorie.',
    freeLabel: 'Controle gratuit',
    upgradeLabel: 'Offre payante',
    detailCta: 'Ouvrir',
    localBadgeLabel: 'Controle ponctuel',
    principlesTitle: 'Principes operationnels',
    principles: localizedPrinciples.fr,
    statusRows: [
      { title: '7 controles cibles', body: 'Statut, redirects, headers, robots, sitemap, TTFB et snapshot sont representes.', tone: 'green' },
      { title: '5 routes langue', body: 'Pages anglaises, portugaises, espagnoles, francaises et allemandes prerenderisees.', tone: 'green' },
      { title: 'Resultats ponctuels', body: 'Chaque execution est un snapshot borne; utilisez-le avant de changer DNS, CDN ou serveur.', tone: 'amber' },
    ],
  },
  de: {
    eyebrow: 'SitePulse Lab',
    title: 'Website-Health-Checks ohne Pflichtkonto.',
    lead: 'Pruefen Sie Status, Weiterleitungen, Header, robots.txt, Sitemap, TTFB und Snapshot vor bezahltem Monitoring.',
    searchLabel: 'Website-Checks suchen',
    searchPlaceholder: 'Status, Redirects, Header oder Sitemap',
    categoryLabel: 'Kategorie',
    allCategories: 'Alle Checks',
    noResultsTitle: 'Keine Checks',
    noResultsBody: 'Suche leeren oder andere Kategorie waehlen.',
    freeLabel: 'Kostenloser Check',
    upgradeLabel: 'Upgrade-Pfad',
    detailCta: 'Check oeffnen',
    localBadgeLabel: 'Einmal-Check',
    principlesTitle: 'Betriebsprinzipien',
    principles: localizedPrinciples.de,
    statusRows: [
      { title: '7 fokussierte Checks', body: 'Status, Redirects, Header, Robots, Sitemap, TTFB und Snapshot sind vertreten.', tone: 'green' },
      { title: '5 Sprachrouten', body: 'Englische, portugiesische, spanische, franzoesische und deutsche Seiten werden prerendered.', tone: 'green' },
      { title: 'Zeitpunkt-Ergebnisse', body: 'Jeder Lauf ist ein begrenzter Snapshot; nutzen Sie ihn vor DNS-, CDN- oder Serveraenderungen.', tone: 'amber' },
    ],
  },
}

export const shellCopy: Record<LocaleCode, ShellCopy> = {
  en: {
    breadcrumbHome: 'SitePulse Lab',
    pageStatusLabel: 'Check status',
    relatedTitle: 'Related pages',
    relatedBody: 'Chain status, redirects, headers, robots, sitemap, TTFB and snapshot checks without saving the target.',
    privacyTitle: 'Privacy and limits',
    privacyBody: 'One-shot probes use short timeouts, capped redirects and no saved target history.',
    pulseScoreTitle: 'Pulse score',
    checklistTitle: 'Signal checklist',
    recommendationTitle: 'Recommended actions',
    recommendationEmpty: 'Keep this one-shot result as a baseline for the next check.',
    monitoringTitle: 'Advanced monitoring',
    monitoringBody: 'Recurring checks, alerts, status pages, incident history and multi-region monitoring belong below the free result.',
    monitoringItems: ['Uptime checks and incidents', 'Status page and alert routing', 'Historical trends and reports', 'Multi-region probes'],
    overviewTabLabel: 'Overview',
    findingsTabLabel: 'Findings',
    detailsTabLabel: 'Technical details',
    exampleLabel: 'Example',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    resultTitle: 'Result',
    runningLabel: 'Running check...',
    copyReportLabel: 'Copy report',
    copiedReportLabel: 'Report copied',
    checkAgainLabel: 'Check again',
    freeCheckLabel: 'Free check',
    upgradePathLabel: 'Upgrade path',
    toolGuideTitle: 'Guide and interpretation',
    faqTitle: 'FAQ',
    contentQualityBody: 'Run the check, read the status and review recommendations before changing the site.',
  },
  'pt-br': {
    breadcrumbHome: 'SitePulse Lab',
    pageStatusLabel: 'Status da verificacao',
    relatedTitle: 'Paginas relacionadas',
    relatedBody: 'Encadeie status, redirecionamentos, cabecalhos, robots, sitemap, TTFB e snapshot sem salvar o alvo.',
    privacyTitle: 'Privacidade e limites',
    privacyBody: 'Verificacoes pontuais usam timeout curto, redirecionamentos limitados e sem historico de alvo salvo.',
    pulseScoreTitle: 'Score Pulse',
    checklistTitle: 'Checklist de sinais',
    recommendationTitle: 'Acoes recomendadas',
    recommendationEmpty: 'Use este resultado pontual como linha de base para a proxima verificacao.',
    monitoringTitle: 'Recursos avancados',
    monitoringBody: 'Verificacoes recorrentes, alertas, pagina de status, historico e multi-regiao ficam abaixo do resultado gratuito.',
    monitoringItems: ['Uptime e incidentes', 'Pagina de status e alertas', 'Tendencias e relatorios', 'Verificacoes multi-regiao'],
    overviewTabLabel: 'Resumo',
    findingsTabLabel: 'Sinais',
    detailsTabLabel: 'Detalhes tecnicos',
    exampleLabel: 'Exemplo',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    resultTitle: 'Resultado',
    runningLabel: 'Executando verificacao...',
    copyReportLabel: 'Copiar relatorio',
    copiedReportLabel: 'Relatorio copiado',
    checkAgainLabel: 'Verificar de novo',
    freeCheckLabel: 'Verificacao gratuita',
    upgradePathLabel: 'Caminho de upgrade',
    toolGuideTitle: 'Guia e interpretacao',
    faqTitle: 'Perguntas frequentes',
    contentQualityBody: 'Rode a verificacao, leia o status e revise recomendacoes antes de mudar o site.',
  },
  es: {
    breadcrumbHome: 'SitePulse Lab',
    pageStatusLabel: 'Estado del check',
    relatedTitle: 'Paginas relacionadas',
    relatedBody: 'Encadena status, redirects, headers, robots, sitemap, TTFB y snapshot sin guardar el objetivo.',
    privacyTitle: 'Privacidad y limites',
    privacyBody: 'Las pruebas puntuales usan timeout corto, redirecciones limitadas y sin historial de objetivo guardado.',
    pulseScoreTitle: 'Score Pulse',
    checklistTitle: 'Checklist de senales',
    recommendationTitle: 'Acciones recomendadas',
    recommendationEmpty: 'Usa este resultado puntual como base para el proximo check.',
    monitoringTitle: 'Recursos avanzados',
    monitoringBody: 'Pruebas recurrentes, alertas, status page, historial y multi-region encajan en flujos de cuenta debajo del resultado gratis.',
    monitoringItems: ['Uptime e incidentes', 'Status page y alertas', 'Tendencias e informes', 'Probes multi-region'],
    overviewTabLabel: 'Resumen',
    findingsTabLabel: 'Senales',
    detailsTabLabel: 'Detalles tecnicos',
    exampleLabel: 'Ejemplo',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    resultTitle: 'Resultado',
    runningLabel: 'Ejecutando check...',
    copyReportLabel: 'Copiar informe',
    copiedReportLabel: 'Informe copiado',
    checkAgainLabel: 'Revisar de nuevo',
    freeCheckLabel: 'Check gratis',
    upgradePathLabel: 'Ruta de upgrade',
    toolGuideTitle: 'Guia e interpretacion',
    faqTitle: 'Preguntas frecuentes',
    contentQualityBody: 'Ejecuta el check, lee el estado y revisa recomendaciones antes de cambiar el sitio.',
  },
  fr: {
    breadcrumbHome: 'SitePulse Lab',
    pageStatusLabel: 'Statut',
    relatedTitle: 'Pages liees',
    relatedBody: 'Enchainez statut, redirects, headers, robots, sitemap, TTFB et snapshot sans stocker la cible.',
    privacyTitle: 'Confidentialite et limites',
    privacyBody: 'Les probes ponctuelles utilisent timeouts courts, redirects bornes et aucun historique de cible.',
    pulseScoreTitle: 'Score Pulse',
    checklistTitle: 'Checklist signaux',
    recommendationTitle: 'Actions recommandees',
    recommendationEmpty: 'Gardez ce resultat ponctuel comme base pour le prochain controle.',
    monitoringTitle: 'Fonctions avancees',
    monitoringBody: 'Controles recurrents, alertes, page de statut, historique et multi-region restent sous le resultat gratuit.',
    monitoringItems: ['Uptime et incidents', 'Status page et alertes', 'Tendances et rapports', 'Probes multi-region'],
    overviewTabLabel: 'Resume',
    findingsTabLabel: 'Signaux',
    detailsTabLabel: 'Details techniques',
    exampleLabel: 'Exemple',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    resultTitle: 'Resultat',
    runningLabel: 'Controle en cours...',
    copyReportLabel: 'Copier rapport',
    copiedReportLabel: 'Rapport copie',
    checkAgainLabel: 'Verifier encore',
    freeCheckLabel: 'Controle gratuit',
    upgradePathLabel: 'Offre payante',
    toolGuideTitle: 'Guide et interpretation',
    faqTitle: 'FAQ',
    contentQualityBody: 'Lancez le contrôle, lisez le statut et vérifiez les recommandations avant modification.',
  },
  de: {
    breadcrumbHome: 'SitePulse Lab',
    pageStatusLabel: 'Checkstatus',
    relatedTitle: 'Verwandte Seiten',
    relatedBody: 'Status, Redirects, Header, Robots, Sitemap, TTFB und Snapshot verbinden, ohne Ziele zu speichern.',
    privacyTitle: 'Datenschutz und Grenzen',
    privacyBody: 'Einmalige Probes nutzen kurze Timeouts, begrenzte Redirects und keinen gespeicherten Zielverlauf.',
    pulseScoreTitle: 'Pulse Score',
    checklistTitle: 'Signal-Checklist',
    recommendationTitle: 'Empfohlene Aktionen',
    recommendationEmpty: 'Dieses Einmal-Ergebnis als Basis fuer den naechsten Check nutzen.',
    monitoringTitle: 'Erweiterte Funktionen',
    monitoringBody: 'Wiederkehrende Probes, Alerts, Status Pages, Verlauf und Multi-Region passen zu Konto-Workflows unter dem freien Ergebnis.',
    monitoringItems: ['Uptime und Incidents', 'Status Page und Alerts', 'Trends und Reports', 'Multi-Region Probes'],
    overviewTabLabel: 'Uebersicht',
    findingsTabLabel: 'Signale',
    detailsTabLabel: 'Technische Details',
    exampleLabel: 'Beispiel',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    resultTitle: 'Ergebnis',
    runningLabel: 'Check laeuft...',
    copyReportLabel: 'Bericht kopieren',
    copiedReportLabel: 'Bericht kopiert',
    checkAgainLabel: 'Erneut pruefen',
    freeCheckLabel: 'Kostenloser Check',
    upgradePathLabel: 'Upgrade-Pfad',
    toolGuideTitle: 'Leitfaden und Interpretation',
    faqTitle: 'FAQ',
    contentQualityBody: 'Führen Sie die Prüfung aus, lesen Sie den Status und prüfen Sie Empfehlungen vor Änderungen.',
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return sanitizePublicCopy(locale, homeCopy[locale])
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return sanitizePublicCopy(locale, shellCopy[locale])
}
