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
  pageStatusLabel: string
  relatedTitle: string
  plannedTitle: string
  plannedBody: string
  exampleLabel: string
  methodologyLabel: string
  editorialLabel: string
  resultTitle: string
  runningLabel: string
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
    principlesTitle: 'Sprint 4.4 principles',
    principles: sharedPrinciples,
    statusRows: [
      { title: '7 focused checks', body: 'Status, redirects, headers, robots, sitemap, TTFB and snapshot pages are represented.', tone: 'green' },
      { title: '5 language route sets', body: 'English, Portuguese, Spanish, French and German pages are prerendered.', tone: 'green' },
      { title: 'Monitoring gated', body: 'Recurring uptime, incidents, status pages, alerts, history, multi-region probes and billing are not active.', tone: 'amber' },
    ],
  },
  'pt-br': {
    eyebrow: 'SitePulse Lab',
    title: 'Checks de saude web sem cadastro obrigatorio.',
    lead: 'Rode status, redirects, headers, robots, sitemap, TTFB e snapshot com limites claros antes de pagar por monitoramento.',
    searchLabel: 'Buscar checks web',
    searchPlaceholder: 'Tente status, redirects, headers ou sitemap',
    categoryLabel: 'Categoria',
    allCategories: 'Todos os checks',
    noResultsTitle: 'Nenhum check encontrado',
    noResultsBody: 'Limpe a busca ou escolha outra categoria.',
    freeLabel: 'Check gratuito',
    upgradeLabel: 'Caminho de upgrade',
    detailCta: 'Abrir check',
    principlesTitle: 'Principios da Sprint 4.4',
    principles: sharedPrinciples,
    statusRows: [
      { title: '7 checks focados', body: 'Status, redirects, headers, robots, sitemap, TTFB e snapshot estao representados.', tone: 'green' },
      { title: '5 conjuntos de idioma', body: 'Paginas em ingles, portugues, espanhol, frances e alemao sao prerenderizadas.', tone: 'green' },
      { title: 'Monitoramento bloqueado', body: 'Uptime recorrente, incidentes, status page, alertas, historico, multi-regiao e billing nao estao ativos.', tone: 'amber' },
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
    principlesTitle: 'Principios Sprint 4.4',
    principles: sharedPrinciples,
    statusRows: [
      { title: '7 checks enfocados', body: 'Status, redirects, headers, robots, sitemap, TTFB y snapshot estan representados.', tone: 'green' },
      { title: '5 rutas de idioma', body: 'Paginas en ingles, portugues, espanol, frances y aleman se prerenderizan.', tone: 'green' },
      { title: 'Monitoreo bloqueado', body: 'Uptime recurrente, incidentes, status page, alertas, historico, multi-region y billing no estan activos.', tone: 'amber' },
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
    principlesTitle: 'Principes Sprint 4.4',
    principles: sharedPrinciples,
    statusRows: [
      { title: '7 controles cibles', body: 'Statut, redirects, headers, robots, sitemap, TTFB et snapshot sont representes.', tone: 'green' },
      { title: '5 routes langue', body: 'Pages anglaises, portugaises, espagnoles, francaises et allemandes prerenderisees.', tone: 'green' },
      { title: 'Surveillance bloquee', body: 'Uptime recurrent, incidents, status page, alertes, historique, multi-region et billing inactifs.', tone: 'amber' },
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
    principlesTitle: 'Sprint-4.4-Prinzipien',
    principles: sharedPrinciples,
    statusRows: [
      { title: '7 fokussierte Checks', body: 'Status, Redirects, Header, Robots, Sitemap, TTFB und Snapshot sind vertreten.', tone: 'green' },
      { title: '5 Sprachrouten', body: 'Englische, portugiesische, spanische, franzoesische und deutsche Seiten werden prerendered.', tone: 'green' },
      { title: 'Monitoring gesperrt', body: 'Uptime, Incidents, Status Page, Alerts, History, Multi-Region und Billing sind inaktiv.', tone: 'amber' },
    ],
  },
}

export const shellCopy: Record<LocaleCode, ShellCopy> = {
  en: {
    breadcrumbHome: 'SitePulse Lab',
    pageStatusLabel: 'Check status',
    relatedTitle: 'Related pages',
    plannedTitle: 'Bounded public API',
    plannedBody: 'One-shot probes use a dedicated rate limit, short timeouts and no stored history.',
    exampleLabel: 'Example',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    resultTitle: 'Result',
    runningLabel: 'Running check...',
    freeCheckLabel: 'Free check',
    upgradePathLabel: 'Upgrade path',
    toolGuideTitle: 'Guide and interpretation',
    faqTitle: 'FAQ',
    contentQualityBody: 'This page combines a working check, interpretation, examples, antiabuse limits and upgrade boundaries.',
  },
  'pt-br': {
    breadcrumbHome: 'SitePulse Lab',
    pageStatusLabel: 'Status do check',
    relatedTitle: 'Paginas relacionadas',
    plannedTitle: 'API publica limitada',
    plannedBody: 'Probes pontuais usam rate limit dedicado, timeout curto e sem historico salvo.',
    exampleLabel: 'Exemplo',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    resultTitle: 'Resultado',
    runningLabel: 'Executando check...',
    freeCheckLabel: 'Check gratuito',
    upgradePathLabel: 'Caminho de upgrade',
    toolGuideTitle: 'Guia e interpretacao',
    faqTitle: 'Perguntas frequentes',
    contentQualityBody: 'Esta pagina combina check funcional, interpretacao, exemplos, limites antiabuso e limites de upgrade.',
  },
  es: {
    breadcrumbHome: 'SitePulse Lab',
    pageStatusLabel: 'Estado del check',
    relatedTitle: 'Paginas relacionadas',
    plannedTitle: 'API publica limitada',
    plannedBody: 'Probes puntuales usan rate limit dedicado, timeout corto y sin historial guardado.',
    exampleLabel: 'Ejemplo',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    resultTitle: 'Resultado',
    runningLabel: 'Ejecutando check...',
    freeCheckLabel: 'Check gratis',
    upgradePathLabel: 'Ruta de upgrade',
    toolGuideTitle: 'Guia e interpretacion',
    faqTitle: 'Preguntas frecuentes',
    contentQualityBody: 'Esta pagina combina check funcional, interpretacion, ejemplos, antiabuso y limites.',
  },
  fr: {
    breadcrumbHome: 'SitePulse Lab',
    pageStatusLabel: 'Statut',
    relatedTitle: 'Pages liees',
    plannedTitle: 'API publique bornee',
    plannedBody: 'Les probes ponctuels utilisent rate limit dedie, timeouts courts et aucun historique.',
    exampleLabel: 'Exemple',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    resultTitle: 'Resultat',
    runningLabel: 'Controle en cours...',
    freeCheckLabel: 'Controle gratuit',
    upgradePathLabel: 'Offre payante',
    toolGuideTitle: 'Guide et interpretation',
    faqTitle: 'FAQ',
    contentQualityBody: 'Cette page combine controle fonctionnel, interpretation, exemples, anti-abus et limites.',
  },
  de: {
    breadcrumbHome: 'SitePulse Lab',
    pageStatusLabel: 'Checkstatus',
    relatedTitle: 'Verwandte Seiten',
    plannedTitle: 'Begrenzte Public API',
    plannedBody: 'Einmalige Probes nutzen eigenes Rate Limit, kurze Timeouts und keinen Verlauf.',
    exampleLabel: 'Beispiel',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    resultTitle: 'Ergebnis',
    runningLabel: 'Check laeuft...',
    freeCheckLabel: 'Kostenloser Check',
    upgradePathLabel: 'Upgrade-Pfad',
    toolGuideTitle: 'Leitfaden und Interpretation',
    faqTitle: 'FAQ',
    contentQualityBody: 'Diese Seite kombiniert Check, Interpretation, Beispiele, Anti-Abuse-Grenzen und Upgrade-Limits.',
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return homeCopy[locale]
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return shellCopy[locale]
}
