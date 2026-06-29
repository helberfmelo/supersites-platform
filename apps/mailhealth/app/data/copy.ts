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
  plannedTitle: string
  plannedBody: string
  healthScoreTitle: string
  checklistTitle: string
  fixGuidanceTitle: string
  recordBuilderTitle: string
  recordBuilderBody: string
  recordBuilderItems: string[]
  exampleLabel: string
  methodologyLabel: string
  editorialLabel: string
  selectorLabel: string
  portLabel: string
  headersLabel: string
  resultTitle: string
  runningLabel: string
  freeCheckLabel: string
  upgradePathLabel: string
  toolGuideTitle: string
  faqTitle: string
  contentQualityBody: string
}

export const homeCopy: Record<LocaleCode, HomeCopy> = {
  en: {
    eyebrow: 'MailHealth',
    title: 'Email authentication checks without mandatory signup.',
    lead: 'Check SPF, DKIM, DMARC, MX, DNSBL reputation, SMTP reachability and raw headers with clear antiabuse limits and no account requirement.',
    searchLabel: 'Search email checks',
    searchPlaceholder: 'Try SPF, DMARC, SMTP or headers',
    categoryLabel: 'Category',
    allCategories: 'All checks',
    noResultsTitle: 'No matching email checks',
    noResultsBody: 'Clear the search or choose a different category.',
    freeLabel: 'Free check',
    upgradeLabel: 'Upgrade path',
    detailCta: 'Open check',
    localBadgeLabel: 'Local MVP',
    principlesTitle: 'Operating principles',
    principles: [
      { title: 'Useful free diagnostics', body: 'A domain owner can inspect core email records and headers before creating an account.' },
      { title: 'Bounded probes', body: 'DNS, DNSBL and SMTP checks use public-host validation, short timeouts, cache and rate limits.' },
      { title: 'No PII analytics', body: 'Domains, mail hosts, headers, message IDs and results are never sent to analytics events.' },
    ],
    statusRows: [
      { title: '7 focused checks', body: 'SPF, DKIM, DMARC, MX, blacklist, SMTP and header analysis are represented.', tone: 'green' },
      { title: '5 language route sets', body: 'English, Portuguese, Spanish, French and German pages are prerendered.', tone: 'green' },
      { title: 'Monitoring gated', body: 'Recurring checks, alerts, DMARC report processing, API, white-label and billing are not active.', tone: 'amber' },
    ],
  },
  'pt-br': {
    eyebrow: 'MailHealth',
    title: 'Checks de autenticacao de email sem cadastro obrigatorio.',
    lead: 'Verifique SPF, DKIM, DMARC, MX, reputacao DNSBL, SMTP e headers brutos com limites antiabuso claros.',
    searchLabel: 'Buscar checks de email',
    searchPlaceholder: 'Tente SPF, DMARC, SMTP ou headers',
    categoryLabel: 'Categoria',
    allCategories: 'Todos os checks',
    noResultsTitle: 'Nenhum check encontrado',
    noResultsBody: 'Limpe a busca ou escolha outra categoria.',
    freeLabel: 'Check gratuito',
    upgradeLabel: 'Caminho de upgrade',
    detailCta: 'Abrir check',
    localBadgeLabel: 'MVP local',
    principlesTitle: 'Principios operacionais',
    principles: [
      { title: 'Diagnostico gratuito util', body: 'O dono de dominio pode revisar registros e headers essenciais antes de criar conta.' },
      { title: 'Probes limitados', body: 'DNS, DNSBL e SMTP usam validacao de host publico, timeout curto, cache e rate limit.' },
      { title: 'Analytics sem PII', body: 'Dominios, hosts, headers, IDs de mensagem e resultados nao entram em analytics.' },
    ],
    statusRows: [
      { title: '7 checks focados', body: 'SPF, DKIM, DMARC, MX, blacklist, SMTP e headers estao representados.', tone: 'green' },
      { title: '5 conjuntos de idioma', body: 'Paginas em ingles, portugues, espanhol, frances e alemao sao prerenderizadas.', tone: 'green' },
      { title: 'Monitoramento bloqueado', body: 'Recorrencia, alertas, relatorios DMARC, API, white-label e billing nao estao ativos.', tone: 'amber' },
    ],
  },
  es: {
    eyebrow: 'MailHealth',
    title: 'Checks de autenticacion de email sin registro obligatorio.',
    lead: 'Revisa SPF, DKIM, DMARC, MX, reputacion DNSBL, SMTP y headers con limites antiabuso claros.',
    searchLabel: 'Buscar checks de email',
    searchPlaceholder: 'SPF, DMARC, SMTP o headers',
    categoryLabel: 'Categoria',
    allCategories: 'Todos',
    noResultsTitle: 'No hay checks',
    noResultsBody: 'Borra la busqueda o elige otra categoria.',
    freeLabel: 'Check gratis',
    upgradeLabel: 'Ruta de upgrade',
    detailCta: 'Abrir check',
    localBadgeLabel: 'MVP local',
    principlesTitle: 'Principios operativos',
    principles: [
      { title: 'Diagnostico gratis util', body: 'Un propietario puede revisar registros y headers esenciales antes de crear cuenta.' },
      { title: 'Probes limitados', body: 'DNS, DNSBL y SMTP usan host publico, timeout corto, cache y rate limit.' },
      { title: 'Analytics sin PII', body: 'Dominios, hosts, headers, IDs de mensaje y resultados no van a analytics.' },
    ],
    statusRows: [
      { title: '7 checks enfocados', body: 'SPF, DKIM, DMARC, MX, blacklist, SMTP y headers estan representados.', tone: 'green' },
      { title: '5 rutas de idioma', body: 'Paginas en ingles, portugues, espanol, frances y aleman se prerenderizan.', tone: 'green' },
      { title: 'Monitoreo bloqueado', body: 'Recurrencia, alertas, reportes DMARC, API, white-label y billing no estan activos.', tone: 'amber' },
    ],
  },
  fr: {
    eyebrow: 'MailHealth',
    title: 'Controles d authentification email sans compte obligatoire.',
    lead: 'Verifiez SPF, DKIM, DMARC, MX, reputation DNSBL, SMTP et headers avec limites anti-abus explicites.',
    searchLabel: 'Rechercher',
    searchPlaceholder: 'SPF, DMARC, SMTP ou headers',
    categoryLabel: 'Categorie',
    allCategories: 'Tous',
    noResultsTitle: 'Aucun controle',
    noResultsBody: 'Effacez la recherche ou choisissez une autre categorie.',
    freeLabel: 'Controle gratuit',
    upgradeLabel: 'Offre payante',
    detailCta: 'Ouvrir',
    localBadgeLabel: 'MVP local',
    principlesTitle: 'Principes operationnels',
    principles: [
      { title: 'Diagnostic gratuit utile', body: 'Le proprietaire de domaine peut verifier les enregistrements et headers avant compte.' },
      { title: 'Probes bornes', body: 'DNS, DNSBL et SMTP utilisent host public, timeouts courts, cache et rate limits.' },
      { title: 'Analytics sans PII', body: 'Domaines, hosts, headers, IDs message et resultats ne partent pas en analytics.' },
    ],
    statusRows: [
      { title: '7 controles cibles', body: 'SPF, DKIM, DMARC, MX, blacklist, SMTP et headers sont representes.', tone: 'green' },
      { title: '5 routes langue', body: 'Pages anglaises, portugaises, espagnoles, francaises et allemandes prerenderisees.', tone: 'green' },
      { title: 'Surveillance bloquee', body: 'Recurrence, alertes, rapports DMARC, API, white-label et billing inactifs.', tone: 'amber' },
    ],
  },
  de: {
    eyebrow: 'MailHealth',
    title: 'E-Mail-Authentifizierung ohne Pflichtkonto pruefen.',
    lead: 'Pruefen Sie SPF, DKIM, DMARC, MX, DNSBL-Reputation, SMTP und Header mit klaren Anti-Abuse-Grenzen.',
    searchLabel: 'E-Mail-Checks suchen',
    searchPlaceholder: 'SPF, DMARC, SMTP oder Header',
    categoryLabel: 'Kategorie',
    allCategories: 'Alle Checks',
    noResultsTitle: 'Keine Checks',
    noResultsBody: 'Suche leeren oder andere Kategorie waehlen.',
    freeLabel: 'Kostenloser Check',
    upgradeLabel: 'Upgrade-Pfad',
    detailCta: 'Check oeffnen',
    localBadgeLabel: 'Lokales MVP',
    principlesTitle: 'Betriebsprinzipien',
    principles: [
      { title: 'Nuetzliche kostenlose Diagnose', body: 'Domaininhaber pruefen zentrale Records und Header vor einem Konto.' },
      { title: 'Begrenzte Probes', body: 'DNS, DNSBL und SMTP nutzen Public-Host-Pruefung, kurze Timeouts, Cache und Rate Limits.' },
      { title: 'Analytics ohne PII', body: 'Domains, Mailhosts, Header, Message-IDs und Ergebnisse gehen nicht in Analytics.' },
    ],
    statusRows: [
      { title: '7 fokussierte Checks', body: 'SPF, DKIM, DMARC, MX, Blacklist, SMTP und Header sind vertreten.', tone: 'green' },
      { title: '5 Sprachrouten', body: 'Englische, portugiesische, spanische, franzoesische und deutsche Seiten werden prerendered.', tone: 'green' },
      { title: 'Monitoring gesperrt', body: 'Wiederholung, Alarme, DMARC-Reports, API, White-Label und Billing sind inaktiv.', tone: 'amber' },
    ],
  },
}

export const shellCopy: Record<LocaleCode, ShellCopy> = {
  en: {
    breadcrumbHome: 'MailHealth',
    pageStatusLabel: 'Check status',
    relatedTitle: 'Related checks',
    relatedBody: 'Chain SPF, DKIM, DMARC, MX, SMTP, reputation and header checks without storing the target.',
    plannedTitle: 'Bounded public API',
    plannedBody: 'DNS, DNSBL and SMTP checks use a dedicated rate limit and do not store query targets in product analytics.',
    healthScoreTitle: 'Health score',
    checklistTitle: 'Signal checklist',
    fixGuidanceTitle: 'Fix guidance',
    recordBuilderTitle: 'Record builders',
    recordBuilderBody: 'SPF and DMARC helpers run locally in the browser. Nothing is published to DNS and record values are not sent to analytics.',
    recordBuilderItems: ['SPF include and all-mechanism builder', 'DMARC policy and rua/ruf planner', 'DKIM selector rotation checklist', 'MX migration checklist'],
    exampleLabel: 'Example',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    selectorLabel: 'DKIM selector',
    portLabel: 'SMTP port',
    headersLabel: 'Paste raw message headers',
    resultTitle: 'Result',
    runningLabel: 'Running check...',
    freeCheckLabel: 'Free check',
    upgradePathLabel: 'Upgrade path',
    toolGuideTitle: 'Guide and interpretation',
    faqTitle: 'FAQ',
    contentQualityBody: 'This page combines a working check, interpretation, examples, privacy boundaries and upgrade limits.',
  },
  'pt-br': {
    breadcrumbHome: 'MailHealth',
    pageStatusLabel: 'Status do check',
    relatedTitle: 'Checks relacionados',
    relatedBody: 'Encadeie SPF, DKIM, DMARC, MX, SMTP, reputacao e headers sem armazenar o alvo.',
    plannedTitle: 'API publica limitada',
    plannedBody: 'DNS, DNSBL e SMTP usam rate limit dedicado e nao armazenam alvos em analytics.',
    healthScoreTitle: 'Score de saude',
    checklistTitle: 'Checklist de sinais',
    fixGuidanceTitle: 'Guia de correcao',
    recordBuilderTitle: 'Builders de registro',
    recordBuilderBody: 'Helpers SPF e DMARC rodam localmente no navegador. Nada e publicado no DNS e valores nao entram em analytics.',
    recordBuilderItems: ['Builder SPF de include e all', 'Planejador DMARC de policy e rua/ruf', 'Checklist de rotacao DKIM', 'Checklist de migracao MX'],
    exampleLabel: 'Exemplo',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    selectorLabel: 'Seletor DKIM',
    portLabel: 'Porta SMTP',
    headersLabel: 'Cole headers brutos da mensagem',
    resultTitle: 'Resultado',
    runningLabel: 'Executando check...',
    freeCheckLabel: 'Check gratuito',
    upgradePathLabel: 'Caminho de upgrade',
    toolGuideTitle: 'Guia e interpretacao',
    faqTitle: 'Perguntas frequentes',
    contentQualityBody: 'Esta pagina combina check funcional, interpretacao, exemplos, privacidade e limites de upgrade.',
  },
  es: {
    breadcrumbHome: 'MailHealth',
    pageStatusLabel: 'Estado del check',
    relatedTitle: 'Checks relacionados',
    relatedBody: 'Encadena SPF, DKIM, DMARC, MX, SMTP, reputacion y headers sin guardar el objetivo.',
    plannedTitle: 'API publica limitada',
    plannedBody: 'DNS, DNSBL y SMTP usan rate limit dedicado y no guardan objetivos en analytics.',
    healthScoreTitle: 'Score de salud',
    checklistTitle: 'Checklist de senales',
    fixGuidanceTitle: 'Guia de correccion',
    recordBuilderTitle: 'Builders de registro',
    recordBuilderBody: 'Helpers SPF y DMARC corren localmente en el navegador. Nada se publica en DNS y los valores no van a analytics.',
    recordBuilderItems: ['Builder SPF de include y all', 'Planificador DMARC de policy y rua/ruf', 'Checklist de rotacion DKIM', 'Checklist de migracion MX'],
    exampleLabel: 'Ejemplo',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    selectorLabel: 'Selector DKIM',
    portLabel: 'Puerto SMTP',
    headersLabel: 'Pega headers brutos',
    resultTitle: 'Resultado',
    runningLabel: 'Ejecutando check...',
    freeCheckLabel: 'Check gratis',
    upgradePathLabel: 'Ruta de upgrade',
    toolGuideTitle: 'Guia e interpretacion',
    faqTitle: 'Preguntas frecuentes',
    contentQualityBody: 'Esta pagina combina check funcional, interpretacion, ejemplos, privacidad y limites.',
  },
  fr: {
    breadcrumbHome: 'MailHealth',
    pageStatusLabel: 'Statut',
    relatedTitle: 'Controles lies',
    relatedBody: 'Enchainez SPF, DKIM, DMARC, MX, SMTP, reputation et headers sans stocker la cible.',
    plannedTitle: 'API publique bornee',
    plannedBody: 'DNS, DNSBL et SMTP utilisent rate limit dedie et ne stockent pas les cibles en analytics.',
    healthScoreTitle: 'Score de sante',
    checklistTitle: 'Checklist signaux',
    fixGuidanceTitle: 'Guide correction',
    recordBuilderTitle: 'Builders DNS',
    recordBuilderBody: 'Les helpers SPF et DMARC tournent localement dans le navigateur. Rien n est publie en DNS et les valeurs ne vont pas en analytics.',
    recordBuilderItems: ['Builder SPF include/all', 'Plan DMARC policy et rua/ruf', 'Checklist rotation DKIM', 'Checklist migration MX'],
    exampleLabel: 'Exemple',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    selectorLabel: 'Selecteur DKIM',
    portLabel: 'Port SMTP',
    headersLabel: 'Collez les headers bruts',
    resultTitle: 'Resultat',
    runningLabel: 'Controle en cours...',
    freeCheckLabel: 'Controle gratuit',
    upgradePathLabel: 'Offre payante',
    toolGuideTitle: 'Guide et interpretation',
    faqTitle: 'FAQ',
    contentQualityBody: 'Cette page combine controle fonctionnel, interpretation, exemples, confidentialite et limites.',
  },
  de: {
    breadcrumbHome: 'MailHealth',
    pageStatusLabel: 'Checkstatus',
    relatedTitle: 'Verwandte Checks',
    relatedBody: 'SPF, DKIM, DMARC, MX, SMTP, Reputation und Header verbinden, ohne Ziele zu speichern.',
    plannedTitle: 'Begrenzte Public API',
    plannedBody: 'DNS, DNSBL und SMTP nutzen eigenes Rate Limit und speichern Ziele nicht in Analytics.',
    healthScoreTitle: 'Health Score',
    checklistTitle: 'Signal-Checklist',
    fixGuidanceTitle: 'Korrekturhinweise',
    recordBuilderTitle: 'Record Builder',
    recordBuilderBody: 'SPF- und DMARC-Hilfen laufen lokal im Browser. Nichts wird in DNS veroeffentlicht und Werte gehen nicht in Analytics.',
    recordBuilderItems: ['SPF Include/All Builder', 'DMARC Policy und rua/ruf Planer', 'DKIM-Rotation-Checklist', 'MX-Migration-Checklist'],
    exampleLabel: 'Beispiel',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    selectorLabel: 'DKIM-Selector',
    portLabel: 'SMTP-Port',
    headersLabel: 'Rohe Header einfuegen',
    resultTitle: 'Ergebnis',
    runningLabel: 'Check laeuft...',
    freeCheckLabel: 'Kostenloser Check',
    upgradePathLabel: 'Upgrade-Pfad',
    toolGuideTitle: 'Leitfaden und Interpretation',
    faqTitle: 'FAQ',
    contentQualityBody: 'Diese Seite kombiniert Check, Interpretation, Beispiele, Datenschutzgrenzen und Upgrade-Limits.',
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return sanitizePublicCopy(locale, homeCopy[locale])
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return sanitizePublicCopy(locale, shellCopy[locale])
}
