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
  recordTypesLabel: string
  recordTypeLabel: string
  portLabel: string
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
    eyebrow: 'NetProbe Atlas',
    title: 'Network facts before assumptions.',
    lead: 'Point-in-time IP, DNS, domain, SSL and reachability diagnostics for public troubleshooting, with clear safety limits and no mandatory signup for basic checks.',
    searchLabel: 'Search tools',
    searchPlaceholder: 'Try DNS, SSL, port or RDAP',
    categoryLabel: 'Category',
    allCategories: 'All tools',
    noResultsTitle: 'No matching tools',
    noResultsBody: 'Clear the search or choose a different category.',
    freeLabel: 'Free check',
    upgradeLabel: 'Upgrade path',
    detailCta: 'Open tool',
    principlesTitle: 'Launch principles',
    principles: [
      {
        title: 'The free answer is complete',
        body: 'The basic lookup should answer the troubleshooting need before signup, billing or saved history.',
      },
      {
        title: 'Public targets only',
        body: 'Hostnames are validated and private, loopback, link-local and metadata ranges are blocked before probes run.',
      },
      {
        title: 'Limits are explicit',
        body: 'Each result names resolver context, cache, timeouts, registry limits and runtime boundaries.',
      },
    ],
    statusRows: [
      {
        title: '7 live checks',
        body: 'IP, DNS, RDAP, SSL, propagation, port and reachability checks are wired to the API.',
        tone: 'green',
      },
      {
        title: '5 language routes',
        body: 'English, Portuguese, Spanish, French and German pages are prerendered for the launch gate.',
        tone: 'green',
      },
      {
        title: 'No ads active',
        body: 'AdSense remains blocked until production launch, consent, monitoring, backup and rollback pass.',
        tone: 'amber',
      },
    ],
  },
  'pt-br': {
    eyebrow: 'NetProbe Atlas',
    title: 'Fatos de rede antes de suposições.',
    lead: 'Diagnósticos pontuais de IP, DNS, domínio, SSL e alcance para troubleshooting público, com limites de segurança claros e sem cadastro obrigatório para consultas básicas.',
    searchLabel: 'Buscar ferramentas',
    searchPlaceholder: 'Tente DNS, SSL, porta ou RDAP',
    categoryLabel: 'Categoria',
    allCategories: 'Todas as ferramentas',
    noResultsTitle: 'Nenhuma ferramenta encontrada',
    noResultsBody: 'Limpe a busca ou escolha outra categoria.',
    freeLabel: 'Consulta gratuita',
    upgradeLabel: 'Caminho de upgrade',
    detailCta: 'Abrir ferramenta',
    principlesTitle: 'Princípios de lançamento',
    principles: [
      {
        title: 'A resposta gratuita é completa',
        body: 'A consulta básica deve resolver a necessidade de troubleshooting antes de cadastro, cobrança ou histórico salvo.',
      },
      {
        title: 'Somente alvos públicos',
        body: 'Hostnames são validados e faixas privadas, loopback, link-local e metadata são bloqueadas antes dos probes.',
      },
      {
        title: 'Limites explícitos',
        body: 'Cada resultado informa contexto de resolvedor, cache, timeouts, limites de registry e fronteiras do runtime.',
      },
    ],
    statusRows: [
      {
        title: '7 consultas ativas',
        body: 'IP, DNS, RDAP, SSL, propagação, porta e alcance já estão ligados à API.',
        tone: 'green',
      },
      {
        title: '5 rotas de idioma',
        body: 'Páginas em inglês, português, espanhol, francês e alemão são prerenderizadas para o launch gate.',
        tone: 'green',
      },
      {
        title: 'Sem anúncios ativos',
        body: 'AdSense segue bloqueado até produção, consentimento, monitoramento, backup e rollback passarem.',
        tone: 'amber',
      },
    ],
  },
  es: {
    eyebrow: 'NetProbe Atlas',
    title: 'Datos de red antes de suposiciones.',
    lead: 'Diagnósticos puntuales de IP, DNS, dominio, SSL y alcance para troubleshooting público, con límites claros y sin registro obligatorio para consultas básicas.',
    searchLabel: 'Buscar herramientas',
    searchPlaceholder: 'Prueba DNS, SSL, puerto o RDAP',
    categoryLabel: 'Categoría',
    allCategories: 'Todas las herramientas',
    noResultsTitle: 'No hay herramientas coincidentes',
    noResultsBody: 'Borra la búsqueda o elige otra categoría.',
    freeLabel: 'Consulta gratuita',
    upgradeLabel: 'Ruta de upgrade',
    detailCta: 'Abrir herramienta',
    principlesTitle: 'Principios de lanzamiento',
    principles: [
      {
        title: 'La respuesta gratuita es completa',
        body: 'La consulta básica debe resolver el troubleshooting antes de registro, pago o historial guardado.',
      },
      {
        title: 'Solo objetivos públicos',
        body: 'Los hostnames se validan y se bloquean rangos privados, loopback, link-local y metadata antes de probar.',
      },
      {
        title: 'Límites explícitos',
        body: 'Cada resultado nombra resolver, caché, timeouts, límites de registry y fronteras del runtime.',
      },
    ],
    statusRows: [
      {
        title: '7 consultas activas',
        body: 'IP, DNS, RDAP, SSL, propagación, puerto y alcance están conectados a la API.',
        tone: 'green',
      },
      {
        title: '5 rutas de idioma',
        body: 'Páginas en inglés, portugués, español, francés y alemán se prerenderizan para el launch gate.',
        tone: 'green',
      },
      {
        title: 'Sin anuncios activos',
        body: 'AdSense queda bloqueado hasta producción, consentimiento, monitoreo, backup y rollback.',
        tone: 'amber',
      },
    ],
  },
  fr: {
    eyebrow: 'NetProbe Atlas',
    title: 'Des faits réseau avant les suppositions.',
    lead: 'Diagnostics ponctuels IP, DNS, domaine, SSL et accessibilité pour dépannage public, avec limites claires et sans compte obligatoire pour les contrôles de base.',
    searchLabel: 'Rechercher des outils',
    searchPlaceholder: 'Essayez DNS, SSL, port ou RDAP',
    categoryLabel: 'Catégorie',
    allCategories: 'Tous les outils',
    noResultsTitle: 'Aucun outil correspondant',
    noResultsBody: 'Effacez la recherche ou choisissez une autre catégorie.',
    freeLabel: 'Contrôle gratuit',
    upgradeLabel: 'Offre payante',
    detailCta: 'Ouvrir l’outil',
    principlesTitle: 'Principes de lancement',
    principles: [
      {
        title: 'La réponse gratuite est complète',
        body: 'Le contrôle de base doit répondre au besoin avant compte, paiement ou historique enregistré.',
      },
      {
        title: 'Cibles publiques seulement',
        body: 'Les noms d’hôte sont validés et les plages privées, loopback, link-local et metadata sont bloquées.',
      },
      {
        title: 'Limites explicites',
        body: 'Chaque résultat indique résolveur, cache, timeouts, limites de registre et frontières du runtime.',
      },
    ],
    statusRows: [
      {
        title: '7 contrôles actifs',
        body: 'IP, DNS, RDAP, SSL, propagation, port et accessibilité sont reliés à l’API.',
        tone: 'green',
      },
      {
        title: '5 routes de langue',
        body: 'Les pages anglaises, portugaises, espagnoles, françaises et allemandes sont prérendues.',
        tone: 'green',
      },
      {
        title: 'Aucune publicité active',
        body: 'AdSense reste bloqué jusqu’à production, consentement, surveillance, backup et rollback.',
        tone: 'amber',
      },
    ],
  },
  de: {
    eyebrow: 'NetProbe Atlas',
    title: 'Netzwerkfakten vor Annahmen.',
    lead: 'Punktuelle IP-, DNS-, Domain-, SSL- und Erreichbarkeitsdiagnosen für öffentliches Troubleshooting mit klaren Grenzen und ohne Pflichtkonto.',
    searchLabel: 'Tools suchen',
    searchPlaceholder: 'DNS, SSL, Port oder RDAP',
    categoryLabel: 'Kategorie',
    allCategories: 'Alle Tools',
    noResultsTitle: 'Keine passenden Tools',
    noResultsBody: 'Leeren Sie die Suche oder wählen Sie eine andere Kategorie.',
    freeLabel: 'Kostenlose Prüfung',
    upgradeLabel: 'Upgrade-Pfad',
    detailCta: 'Tool öffnen',
    principlesTitle: 'Launch-Prinzipien',
    principles: [
      {
        title: 'Die kostenlose Antwort ist vollständig',
        body: 'Der Basis-Lookup soll das Troubleshooting lösen, bevor Konto, Zahlung oder Verlauf nötig werden.',
      },
      {
        title: 'Nur öffentliche Ziele',
        body: 'Hostnamen werden validiert; private, Loopback-, Link-Local- und Metadata-Bereiche werden blockiert.',
      },
      {
        title: 'Grenzen sind sichtbar',
        body: 'Jedes Ergebnis nennt Resolver-Kontext, Cache, Timeouts, Registry-Limits und Runtime-Grenzen.',
      },
    ],
    statusRows: [
      {
        title: '7 Live-Prüfungen',
        body: 'IP, DNS, RDAP, SSL, Propagation, Port und Erreichbarkeit sind mit der API verbunden.',
        tone: 'green',
      },
      {
        title: '5 Sprachrouten',
        body: 'Englische, portugiesische, spanische, französische und deutsche Seiten werden prerendered.',
        tone: 'green',
      },
      {
        title: 'Keine Anzeigen aktiv',
        body: 'AdSense bleibt blockiert, bis Produktion, Consent, Monitoring, Backup und Rollback bestehen.',
        tone: 'amber',
      },
    ],
  },
}

export const shellCopy: Record<LocaleCode, ShellCopy> = {
  en: {
    breadcrumbHome: 'NetProbe Atlas',
    pageStatusLabel: 'Page status',
    relatedTitle: 'Related pages',
    plannedTitle: 'Public API live',
    plannedBody: 'Production IP and DNS checks are live on HTTPS after deploy smoke and rollback validation; ads and paid upgrades remain gated.',
    exampleLabel: 'Example',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    recordTypesLabel: 'Record types',
    recordTypeLabel: 'Record type',
    portLabel: 'Port',
    resultTitle: 'Result',
    runningLabel: 'Running lookup...',
    freeCheckLabel: 'Free check',
    upgradePathLabel: 'Upgrade path',
    toolGuideTitle: 'Guide and interpretation',
    faqTitle: 'FAQ',
    contentQualityBody: 'This page combines the live tool, interpretation, examples, limits and FAQ required before AdSense review.',
  },
  'pt-br': {
    breadcrumbHome: 'NetProbe Atlas',
    pageStatusLabel: 'Status da página',
    relatedTitle: 'Páginas relacionadas',
    plannedTitle: 'API pública ativa',
    plannedBody: 'Consultas de IP e DNS estão ativas em produção via HTTPS após smoke de deploy e validação de rollback; anúncios e upgrades seguem bloqueados.',
    exampleLabel: 'Exemplo',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Política editorial',
    recordTypesLabel: 'Tipos de registro',
    recordTypeLabel: 'Tipo de registro',
    portLabel: 'Porta',
    resultTitle: 'Resultado',
    runningLabel: 'Executando consulta...',
    freeCheckLabel: 'Consulta gratuita',
    upgradePathLabel: 'Caminho de upgrade',
    toolGuideTitle: 'Guia e interpretação',
    faqTitle: 'Perguntas frequentes',
    contentQualityBody: 'Esta página combina ferramenta live, interpretação, exemplos, limites e FAQ exigidos antes da revisão AdSense.',
  },
  es: {
    breadcrumbHome: 'NetProbe Atlas',
    pageStatusLabel: 'Estado de página',
    relatedTitle: 'Páginas relacionadas',
    plannedTitle: 'API pública activa',
    plannedBody: 'Las consultas de IP y DNS están activas en producción con HTTPS después de smoke de deploy y validación de rollback; anuncios y upgrades siguen bloqueados.',
    exampleLabel: 'Ejemplo',
    methodologyLabel: 'Metodología',
    editorialLabel: 'Política editorial',
    recordTypesLabel: 'Tipos de registro',
    recordTypeLabel: 'Tipo de registro',
    portLabel: 'Puerto',
    resultTitle: 'Resultado',
    runningLabel: 'Ejecutando consulta...',
    freeCheckLabel: 'Consulta gratuita',
    upgradePathLabel: 'Ruta de upgrade',
    toolGuideTitle: 'Guía e interpretación',
    faqTitle: 'Preguntas frecuentes',
    contentQualityBody: 'Esta página combina herramienta live, interpretación, ejemplos, límites y FAQ requeridos antes de AdSense.',
  },
  fr: {
    breadcrumbHome: 'NetProbe Atlas',
    pageStatusLabel: 'Statut de page',
    relatedTitle: 'Pages liées',
    plannedTitle: 'API publique active',
    plannedBody: 'Les contrôles IP et DNS sont actifs en production sur HTTPS après smoke de déploiement et validation rollback; publicités et upgrades restent bloqués.',
    exampleLabel: 'Exemple',
    methodologyLabel: 'Méthodologie',
    editorialLabel: 'Politique éditoriale',
    recordTypesLabel: 'Types d’enregistrement',
    recordTypeLabel: 'Type d’enregistrement',
    portLabel: 'Port',
    resultTitle: 'Résultat',
    runningLabel: 'Recherche en cours...',
    freeCheckLabel: 'Contrôle gratuit',
    upgradePathLabel: 'Offre payante',
    toolGuideTitle: 'Guide et interprétation',
    faqTitle: 'FAQ',
    contentQualityBody: 'Cette page réunit outil live, interprétation, exemples, limites et FAQ nécessaires avant AdSense.',
  },
  de: {
    breadcrumbHome: 'NetProbe Atlas',
    pageStatusLabel: 'Seitenstatus',
    relatedTitle: 'Verwandte Seiten',
    plannedTitle: 'Public API live',
    plannedBody: 'IP- und DNS-Pruefungen laufen in Produktion per HTTPS nach Deploy-Smoke und Rollback-Validierung; Anzeigen und Upgrades bleiben gesperrt.',
    exampleLabel: 'Beispiel',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    recordTypesLabel: 'Eintragstypen',
    recordTypeLabel: 'Eintragstyp',
    portLabel: 'Port',
    resultTitle: 'Ergebnis',
    runningLabel: 'Lookup läuft...',
    freeCheckLabel: 'Kostenlose Prüfung',
    upgradePathLabel: 'Upgrade-Pfad',
    toolGuideTitle: 'Leitfaden und Interpretation',
    faqTitle: 'FAQ',
    contentQualityBody: 'Diese Seite kombiniert Live-Tool, Interpretation, Beispiele, Grenzen und FAQ für die AdSense-Prüfung.',
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return sanitizePublicCopy(locale, homeCopy[locale])
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return sanitizePublicCopy(locale, shellCopy[locale])
}
