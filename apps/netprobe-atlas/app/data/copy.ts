import { sanitizePublicCopy, type LocaleCode } from './locales'

export interface HomeCopy {
  eyebrow: string
  title: string
  lead: string
  universalLabel: string
  universalPlaceholder: string
  universalHint: string
  universalCta: string
  heroPanelTitle: string
  heroPanelBody: string
  quickEyebrow: string
  quickTitle: string
  quickLead: string
  finderEyebrow: string
  finderTitle: string
  finderLead: string
  searchLabel: string
  searchPlaceholder: string
  categoryLabel: string
  allCategories: string
  noResultsTitle: string
  noResultsBody: string
  checkLabel: string
  exampleLabel: string
  detailCta: string
  principlesTitle: string
  principles: Array<{ title: string; body: string }>
  supportTitle: string
  supportBody: string
  supportActions: Array<{ label: string; kind: 'home' | 'content' | 'tool'; slug?: string }>
  footerTitle: string
  footerLead: string
  footerNavLabel: string
  footerGroups: Array<{
    title: string
    links: Array<{ label: string; kind: 'content' | 'tool'; slug: string; query?: string }>
  }>
}

export interface ShellCopy {
  breadcrumbHome: string
  pageStatusLabel: string
  relatedTitle: string
  infoTitle: string
  infoBody: string
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
    eyebrow: 'Network diagnostics',
    title: 'Check IP, DNS and domain signals in seconds.',
    lead: 'Start with a public domain, hostname or IP and move straight into practical checks for DNS, propagation, RDAP, SSL, ports and reachability.',
    universalLabel: 'Diagnostic target',
    universalPlaceholder: 'Enter a domain, hostname or IP',
    universalHint: 'The target stays in your browser on this landing page. Open the matching tool when you are ready to run a check.',
    universalCta: 'Start DNS check',
    heroPanelTitle: 'Fast paths for common incidents',
    heroPanelBody: 'Confirm the visible IP, compare DNS answers, inspect domain records and test public reachability without opening an account.',
    quickEyebrow: 'Network checks',
    quickTitle: 'Run a network check',
    quickLead: 'Open the exact tool you need before reading the guide.',
    finderEyebrow: 'Tool finder',
    finderTitle: 'Browse diagnostics',
    finderLead: 'Filter the network toolkit by category or keyword.',
    searchLabel: 'Search diagnostics',
    searchPlaceholder: 'Try DNS, SSL, port or RDAP',
    categoryLabel: 'Category',
    allCategories: 'All tools',
    noResultsTitle: 'No matching tools',
    noResultsBody: 'Clear the search or choose a different category.',
    checkLabel: 'Checks',
    exampleLabel: 'Example',
    detailCta: 'Open tool',
    principlesTitle: 'Diagnostic principles',
    principles: [
      {
        title: 'The free answer is complete',
        body: 'The basic lookup should answer the troubleshooting need before signup, account features or saved history.',
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
    supportTitle: 'Support the free diagnostics',
    supportBody: 'The best support is practical: share useful checks, report corrections and keep the free workflows easy to find.',
    supportActions: [
      { label: 'Share NetProbe', kind: 'home' },
      { label: 'Send a correction', kind: 'content', slug: 'contact' },
      { label: 'Use the free checks', kind: 'tool', slug: 'dns-lookup' },
    ],
    footerTitle: 'Network lookup directory',
    footerLead: 'Jump to DNS, IP, domain, SSL and reachability pages from one public index.',
    footerNavLabel: 'Network diagnostic directories',
    footerGroups: [
      {
        title: 'DNS Tools',
        links: [
          { label: 'DNS Lookup', kind: 'tool', slug: 'dns-lookup' },
          { label: 'DNS Propagation', kind: 'tool', slug: 'dns-propagation' },
        ],
      },
      {
        title: 'DNS Guides',
        links: [
          { label: 'Methodology', kind: 'content', slug: 'methodology' },
          { label: 'Editorial Policy', kind: 'content', slug: 'editorial-policy' },
          { label: 'Public Status', kind: 'content', slug: 'status' },
        ],
      },
      {
        title: 'DNS Lookup by type',
        links: [
          { label: 'A Record Lookup', kind: 'tool', slug: 'dns-lookup', query: 'type=A' },
          { label: 'AAAA Record Lookup', kind: 'tool', slug: 'dns-lookup', query: 'type=AAAA' },
          { label: 'CNAME Record Lookup', kind: 'tool', slug: 'dns-lookup', query: 'type=CNAME' },
          { label: 'MX Record Lookup', kind: 'tool', slug: 'dns-lookup', query: 'type=MX' },
          { label: 'TXT Record Lookup', kind: 'tool', slug: 'dns-lookup', query: 'type=TXT' },
          { label: 'CAA Record Lookup', kind: 'tool', slug: 'dns-lookup', query: 'type=CAA' },
        ],
      },
      {
        title: 'IP Tools',
        links: [
          { label: 'What is my IP', kind: 'tool', slug: 'what-is-my-ip' },
          { label: 'Port Checker', kind: 'tool', slug: 'port-checker' },
          { label: 'Ping and Trace', kind: 'tool', slug: 'ping-traceroute' },
        ],
      },
      {
        title: 'Domain Tools',
        links: [
          { label: 'RDAP Domain Lookup', kind: 'tool', slug: 'rdap-domain-lookup' },
          { label: 'Nameserver Lookup', kind: 'tool', slug: 'dns-lookup', query: 'type=NS' },
          { label: 'Propagation Check', kind: 'tool', slug: 'dns-propagation' },
        ],
      },
      {
        title: 'SSL Tools',
        links: [
          { label: 'SSL Certificate Checker', kind: 'tool', slug: 'ssl-certificate-checker' },
          { label: 'HTTPS Port Check', kind: 'tool', slug: 'port-checker' },
        ],
      },
    ],
  },
  'pt-br': {
    eyebrow: 'Diagnóstico de rede',
    title: 'Verifique sinais de IP, DNS e domínio em segundos.',
    lead: 'Comece por um domínio, hostname ou IP público e vá direto para consultas práticas de DNS, propagação, RDAP, SSL, portas e alcance.',
    universalLabel: 'Alvo do diagnóstico',
    universalPlaceholder: 'Digite um domínio, hostname ou IP',
    universalHint: 'O alvo fica no seu navegador nesta página inicial. Abra a ferramenta adequada quando quiser executar a consulta.',
    universalCta: 'Iniciar DNS',
    heroPanelTitle: 'Caminhos rápidos para incidentes comuns',
    heroPanelBody: 'Confirme o IP visível, compare respostas DNS, inspecione domínio e teste alcance público sem abrir conta.',
    quickEyebrow: 'Consultas de rede',
    quickTitle: 'Execute um diagnóstico de rede',
    quickLead: 'Abra a ferramenta exata antes de ler o guia.',
    finderEyebrow: 'Localizador',
    finderTitle: 'Navegue pelos diagnósticos',
    finderLead: 'Filtre o kit de rede por categoria ou palavra-chave.',
    searchLabel: 'Buscar diagnósticos',
    searchPlaceholder: 'Tente DNS, SSL, porta ou RDAP',
    categoryLabel: 'Categoria',
    allCategories: 'Todas as ferramentas',
    noResultsTitle: 'Nenhuma ferramenta encontrada',
    noResultsBody: 'Limpe a busca ou escolha outra categoria.',
    checkLabel: 'Verifica',
    exampleLabel: 'Exemplo',
    detailCta: 'Abrir ferramenta',
    principlesTitle: 'Princípios do diagnóstico',
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
    supportTitle: 'Apoie os diagnósticos gratuitos',
    supportBody: 'O melhor apoio hoje é prático: compartilhe consultas úteis, envie correções e mantenha os fluxos gratuitos fáceis de encontrar.',
    supportActions: [
      { label: 'Compartilhar NetProbe', kind: 'home' },
      { label: 'Enviar correção', kind: 'content', slug: 'contact' },
      { label: 'Usar consultas gratuitas', kind: 'tool', slug: 'dns-lookup' },
    ],
    footerTitle: 'Diretório de consultas de rede',
    footerLead: 'Acesse páginas de DNS, IP, domínio, SSL e alcance a partir de um índice público.',
    footerNavLabel: 'Diretórios de diagnóstico de rede',
    footerGroups: [
      {
        title: 'Ferramentas DNS',
        links: [
          { label: 'Consulta DNS', kind: 'tool', slug: 'dns-lookup' },
          { label: 'Propagação DNS', kind: 'tool', slug: 'dns-propagation' },
        ],
      },
      {
        title: 'Guias DNS',
        links: [
          { label: 'Metodologia', kind: 'content', slug: 'methodology' },
          { label: 'Política editorial', kind: 'content', slug: 'editorial-policy' },
          { label: 'Status público', kind: 'content', slug: 'status' },
        ],
      },
      {
        title: 'Consulta DNS por tipo',
        links: [
          { label: 'Registro A', kind: 'tool', slug: 'dns-lookup', query: 'type=A' },
          { label: 'Registro AAAA', kind: 'tool', slug: 'dns-lookup', query: 'type=AAAA' },
          { label: 'Registro CNAME', kind: 'tool', slug: 'dns-lookup', query: 'type=CNAME' },
          { label: 'Registro MX', kind: 'tool', slug: 'dns-lookup', query: 'type=MX' },
          { label: 'Registro TXT', kind: 'tool', slug: 'dns-lookup', query: 'type=TXT' },
          { label: 'Registro CAA', kind: 'tool', slug: 'dns-lookup', query: 'type=CAA' },
        ],
      },
      {
        title: 'Ferramentas de IP',
        links: [
          { label: 'Qual é meu IP', kind: 'tool', slug: 'what-is-my-ip' },
          { label: 'Verificador de porta', kind: 'tool', slug: 'port-checker' },
          { label: 'Ping e rota', kind: 'tool', slug: 'ping-traceroute' },
        ],
      },
      {
        title: 'Ferramentas de domínio',
        links: [
          { label: 'Consulta RDAP', kind: 'tool', slug: 'rdap-domain-lookup' },
          { label: 'Consulta de nameserver', kind: 'tool', slug: 'dns-lookup', query: 'type=NS' },
          { label: 'Checagem de propagação', kind: 'tool', slug: 'dns-propagation' },
        ],
      },
      {
        title: 'Ferramentas SSL',
        links: [
          { label: 'Verificador de certificado SSL', kind: 'tool', slug: 'ssl-certificate-checker' },
          { label: 'Checagem de porta HTTPS', kind: 'tool', slug: 'port-checker' },
        ],
      },
    ],
  },
  es: {
    eyebrow: 'Diagnóstico de red',
    title: 'Comprueba señales de IP, DNS y dominio en segundos.',
    lead: 'Empieza con un dominio, hostname o IP público y abre checks prácticos de DNS, propagación, RDAP, SSL, puertos y alcance.',
    universalLabel: 'Objetivo del diagnóstico',
    universalPlaceholder: 'Ingresa un dominio, hostname o IP',
    universalHint: 'El objetivo permanece en tu navegador en esta página inicial. Abre la herramienta adecuada cuando quieras ejecutar la consulta.',
    universalCta: 'Iniciar DNS',
    heroPanelTitle: 'Rutas rápidas para incidentes comunes',
    heroPanelBody: 'Confirma la IP visible, compara respuestas DNS, inspecciona dominios y prueba alcance público sin crear cuenta.',
    quickEyebrow: 'Checks de red',
    quickTitle: 'Ejecuta un diagnóstico de red',
    quickLead: 'Abre la herramienta exacta antes de leer la guía.',
    finderEyebrow: 'Buscador',
    finderTitle: 'Explora diagnósticos',
    finderLead: 'Filtra el kit de red por categoría o palabra clave.',
    searchLabel: 'Buscar diagnósticos',
    searchPlaceholder: 'Prueba DNS, SSL, puerto o RDAP',
    categoryLabel: 'Categoría',
    allCategories: 'Todas las herramientas',
    noResultsTitle: 'No hay herramientas coincidentes',
    noResultsBody: 'Borra la búsqueda o elige otra categoría.',
    checkLabel: 'Verifica',
    exampleLabel: 'Ejemplo',
    detailCta: 'Abrir herramienta',
    principlesTitle: 'Principios del diagnóstico',
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
    supportTitle: 'Apoya los diagnósticos gratuitos',
    supportBody: 'El mejor apoyo es práctico: comparte checks útiles, envía correcciones y mantén los flujos gratuitos fáciles de encontrar.',
    supportActions: [
      { label: 'Compartir NetProbe', kind: 'home' },
      { label: 'Enviar corrección', kind: 'content', slug: 'contact' },
      { label: 'Usar checks gratuitos', kind: 'tool', slug: 'dns-lookup' },
    ],
    footerTitle: 'Directorio de consultas de red',
    footerLead: 'Salta a páginas de DNS, IP, dominio, SSL y alcance desde un índice público.',
    footerNavLabel: 'Directorios de diagnóstico de red',
    footerGroups: [
      {
        title: 'Herramientas DNS',
        links: [
          { label: 'Consulta DNS', kind: 'tool', slug: 'dns-lookup' },
          { label: 'Propagación DNS', kind: 'tool', slug: 'dns-propagation' },
        ],
      },
      {
        title: 'Guías DNS',
        links: [
          { label: 'Metodología', kind: 'content', slug: 'methodology' },
          { label: 'Política editorial', kind: 'content', slug: 'editorial-policy' },
          { label: 'Estado público', kind: 'content', slug: 'status' },
        ],
      },
      {
        title: 'Consulta DNS por tipo',
        links: [
          { label: 'Registro A', kind: 'tool', slug: 'dns-lookup', query: 'type=A' },
          { label: 'Registro AAAA', kind: 'tool', slug: 'dns-lookup', query: 'type=AAAA' },
          { label: 'Registro CNAME', kind: 'tool', slug: 'dns-lookup', query: 'type=CNAME' },
          { label: 'Registro MX', kind: 'tool', slug: 'dns-lookup', query: 'type=MX' },
          { label: 'Registro TXT', kind: 'tool', slug: 'dns-lookup', query: 'type=TXT' },
          { label: 'Registro CAA', kind: 'tool', slug: 'dns-lookup', query: 'type=CAA' },
        ],
      },
      {
        title: 'Herramientas IP',
        links: [
          { label: 'Cuál es mi IP', kind: 'tool', slug: 'what-is-my-ip' },
          { label: 'Verificador de puerto', kind: 'tool', slug: 'port-checker' },
          { label: 'Ping y ruta', kind: 'tool', slug: 'ping-traceroute' },
        ],
      },
      {
        title: 'Herramientas de dominio',
        links: [
          { label: 'Consulta RDAP', kind: 'tool', slug: 'rdap-domain-lookup' },
          { label: 'Consulta de nameserver', kind: 'tool', slug: 'dns-lookup', query: 'type=NS' },
          { label: 'Chequeo de propagación', kind: 'tool', slug: 'dns-propagation' },
        ],
      },
      {
        title: 'Herramientas SSL',
        links: [
          { label: 'Verificador de certificado SSL', kind: 'tool', slug: 'ssl-certificate-checker' },
          { label: 'Chequeo de puerto HTTPS', kind: 'tool', slug: 'port-checker' },
        ],
      },
    ],
  },
  fr: {
    eyebrow: 'Diagnostic reseau',
    title: 'Verifiez les signaux IP, DNS et domaine en quelques secondes.',
    lead: 'Commencez par un domaine, hostname ou IP public puis ouvrez les controles DNS, propagation, RDAP, SSL, port et accessibilite.',
    universalLabel: 'Cible du diagnostic',
    universalPlaceholder: 'Entrez un domaine, hostname ou IP',
    universalHint: 'La cible reste dans votre navigateur sur cette page. Ouvrez l outil adapte lorsque vous souhaitez lancer le controle.',
    universalCta: 'Lancer DNS',
    heroPanelTitle: 'Acces rapides pour incidents courants',
    heroPanelBody: 'Confirmez l IP visible, comparez les reponses DNS, inspectez le domaine et testez l accessibilite publique sans compte.',
    quickEyebrow: 'Controles reseau',
    quickTitle: 'Lancer un diagnostic reseau',
    quickLead: 'Ouvrez l outil exact avant de lire le guide.',
    finderEyebrow: 'Recherche d outils',
    finderTitle: 'Explorer les diagnostics',
    finderLead: 'Filtrez les outils reseau par categorie ou mot-cle.',
    searchLabel: 'Rechercher des diagnostics',
    searchPlaceholder: 'Essayez DNS, SSL, port ou RDAP',
    categoryLabel: 'Catégorie',
    allCategories: 'Tous les outils',
    noResultsTitle: 'Aucun outil correspondant',
    noResultsBody: 'Effacez la recherche ou choisissez une autre catégorie.',
    checkLabel: 'Controle',
    exampleLabel: 'Exemple',
    detailCta: 'Ouvrir l’outil',
    principlesTitle: 'Principes du diagnostic',
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
    supportTitle: 'Soutenir les diagnostics gratuits',
    supportBody: 'Le meilleur soutien est pratique: partagez les controles utiles, envoyez des corrections et gardez les parcours gratuits faciles a trouver.',
    supportActions: [
      { label: 'Partager NetProbe', kind: 'home' },
      { label: 'Envoyer une correction', kind: 'content', slug: 'contact' },
      { label: 'Utiliser les controles gratuits', kind: 'tool', slug: 'dns-lookup' },
    ],
    footerTitle: 'Repertoire de recherches reseau',
    footerLead: 'Accedez aux pages DNS, IP, domaine, SSL et accessibilite depuis un index public.',
    footerNavLabel: 'Repertoires de diagnostics reseau',
    footerGroups: [
      {
        title: 'Outils DNS',
        links: [
          { label: 'Recherche DNS', kind: 'tool', slug: 'dns-lookup' },
          { label: 'Propagation DNS', kind: 'tool', slug: 'dns-propagation' },
        ],
      },
      {
        title: 'Guides DNS',
        links: [
          { label: 'Methodologie', kind: 'content', slug: 'methodology' },
          { label: 'Politique editoriale', kind: 'content', slug: 'editorial-policy' },
          { label: 'Statut public', kind: 'content', slug: 'status' },
        ],
      },
      {
        title: 'Recherche DNS par type',
        links: [
          { label: 'Enregistrement A', kind: 'tool', slug: 'dns-lookup', query: 'type=A' },
          { label: 'Enregistrement AAAA', kind: 'tool', slug: 'dns-lookup', query: 'type=AAAA' },
          { label: 'Enregistrement CNAME', kind: 'tool', slug: 'dns-lookup', query: 'type=CNAME' },
          { label: 'Enregistrement MX', kind: 'tool', slug: 'dns-lookup', query: 'type=MX' },
          { label: 'Enregistrement TXT', kind: 'tool', slug: 'dns-lookup', query: 'type=TXT' },
          { label: 'Enregistrement CAA', kind: 'tool', slug: 'dns-lookup', query: 'type=CAA' },
        ],
      },
      {
        title: 'Outils IP',
        links: [
          { label: 'Quelle est mon IP', kind: 'tool', slug: 'what-is-my-ip' },
          { label: 'Verificateur de port', kind: 'tool', slug: 'port-checker' },
          { label: 'Ping et trace', kind: 'tool', slug: 'ping-traceroute' },
        ],
      },
      {
        title: 'Outils de domaine',
        links: [
          { label: 'Recherche RDAP', kind: 'tool', slug: 'rdap-domain-lookup' },
          { label: 'Recherche nameserver', kind: 'tool', slug: 'dns-lookup', query: 'type=NS' },
          { label: 'Controle de propagation', kind: 'tool', slug: 'dns-propagation' },
        ],
      },
      {
        title: 'Outils SSL',
        links: [
          { label: 'Verificateur de certificat SSL', kind: 'tool', slug: 'ssl-certificate-checker' },
          { label: 'Controle de port HTTPS', kind: 'tool', slug: 'port-checker' },
        ],
      },
    ],
  },
  de: {
    eyebrow: 'Netzwerkdiagnose',
    title: 'IP-, DNS- und Domain-Signale in Sekunden prüfen.',
    lead: 'Starten Sie mit einer öffentlichen Domain, einem Hostnamen oder einer IP und öffnen Sie DNS-, Propagation-, RDAP-, SSL-, Port- und Erreichbarkeitsprüfungen.',
    universalLabel: 'Diagnoseziel',
    universalPlaceholder: 'Domain, Hostname oder IP eingeben',
    universalHint: 'Das Ziel bleibt auf dieser Startseite im Browser. Öffnen Sie das passende Tool, wenn Sie die Prüfung starten möchten.',
    universalCta: 'DNS starten',
    heroPanelTitle: 'Schnelle Pfade für typische Vorfälle',
    heroPanelBody: 'Bestätigen Sie die sichtbare IP, vergleichen Sie DNS-Antworten, prüfen Sie Domains und testen Sie öffentliche Erreichbarkeit ohne Konto.',
    quickEyebrow: 'Netzwerkprüfungen',
    quickTitle: 'Netzwerkprüfung starten',
    quickLead: 'Öffnen Sie das passende Tool vor dem Leitfaden.',
    finderEyebrow: 'Tool-Finder',
    finderTitle: 'Diagnosen durchsuchen',
    finderLead: 'Filtern Sie das Netzwerk-Toolkit nach Kategorie oder Suchwort.',
    searchLabel: 'Diagnosen suchen',
    searchPlaceholder: 'DNS, SSL, Port oder RDAP',
    categoryLabel: 'Kategorie',
    allCategories: 'Alle Tools',
    noResultsTitle: 'Keine passenden Tools',
    noResultsBody: 'Leeren Sie die Suche oder wählen Sie eine andere Kategorie.',
    checkLabel: 'Prüft',
    exampleLabel: 'Beispiel',
    detailCta: 'Tool öffnen',
    principlesTitle: 'Diagnoseprinzipien',
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
    supportTitle: 'Kostenlose Diagnosen unterstützen',
    supportBody: 'Die beste Unterstützung ist praktisch: Teilen Sie hilfreiche Prüfungen, melden Sie Korrekturen und halten Sie die freien Workflows leicht auffindbar.',
    supportActions: [
      { label: 'NetProbe teilen', kind: 'home' },
      { label: 'Korrektur senden', kind: 'content', slug: 'contact' },
      { label: 'Freie Prüfungen nutzen', kind: 'tool', slug: 'dns-lookup' },
    ],
    footerTitle: 'Verzeichnis für Netzwerk-Lookups',
    footerLead: 'Springen Sie von einem öffentlichen Index zu DNS-, IP-, Domain-, SSL- und Erreichbarkeitsseiten.',
    footerNavLabel: 'Verzeichnisse für Netzwerkdiagnosen',
    footerGroups: [
      {
        title: 'DNS-Tools',
        links: [
          { label: 'DNS-Lookup', kind: 'tool', slug: 'dns-lookup' },
          { label: 'DNS-Propagation', kind: 'tool', slug: 'dns-propagation' },
        ],
      },
      {
        title: 'DNS-Guides',
        links: [
          { label: 'Methodik', kind: 'content', slug: 'methodology' },
          { label: 'Redaktionelle Richtlinie', kind: 'content', slug: 'editorial-policy' },
          { label: 'Öffentlicher Status', kind: 'content', slug: 'status' },
        ],
      },
      {
        title: 'DNS-Lookup nach Typ',
        links: [
          { label: 'A Record Lookup', kind: 'tool', slug: 'dns-lookup', query: 'type=A' },
          { label: 'AAAA Record Lookup', kind: 'tool', slug: 'dns-lookup', query: 'type=AAAA' },
          { label: 'CNAME Record Lookup', kind: 'tool', slug: 'dns-lookup', query: 'type=CNAME' },
          { label: 'MX Record Lookup', kind: 'tool', slug: 'dns-lookup', query: 'type=MX' },
          { label: 'TXT Record Lookup', kind: 'tool', slug: 'dns-lookup', query: 'type=TXT' },
          { label: 'CAA Record Lookup', kind: 'tool', slug: 'dns-lookup', query: 'type=CAA' },
        ],
      },
      {
        title: 'IP-Tools',
        links: [
          { label: 'What is my IP', kind: 'tool', slug: 'what-is-my-ip' },
          { label: 'Port Checker', kind: 'tool', slug: 'port-checker' },
          { label: 'Ping und Trace', kind: 'tool', slug: 'ping-traceroute' },
        ],
      },
      {
        title: 'Domain-Tools',
        links: [
          { label: 'RDAP Domain Lookup', kind: 'tool', slug: 'rdap-domain-lookup' },
          { label: 'Nameserver Lookup', kind: 'tool', slug: 'dns-lookup', query: 'type=NS' },
          { label: 'Propagation Check', kind: 'tool', slug: 'dns-propagation' },
        ],
      },
      {
        title: 'SSL-Tools',
        links: [
          { label: 'SSL Certificate Checker', kind: 'tool', slug: 'ssl-certificate-checker' },
          { label: 'HTTPS Port Check', kind: 'tool', slug: 'port-checker' },
        ],
      },
    ],
  },
}

export const shellCopy: Record<LocaleCode, ShellCopy> = {
  en: {
    breadcrumbHome: 'NetProbe Atlas',
    pageStatusLabel: 'Page status',
    relatedTitle: 'Related pages',
    infoTitle: 'Instant public check',
    infoBody: 'Run a point-in-time diagnostic from this page. Results appear above the guide, and methodology, privacy notes and limits stay below the tool.',
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
    contentQualityBody: 'This page combines the live tool, interpretation, examples, limits and FAQ for a clearer public diagnostic.',
  },
  'pt-br': {
    breadcrumbHome: 'NetProbe Atlas',
    pageStatusLabel: 'Status da página',
    relatedTitle: 'Páginas relacionadas',
    infoTitle: 'Consulta pública instantânea',
    infoBody: 'Execute um diagnóstico pontual nesta página. Os resultados aparecem acima do guia, e metodologia, privacidade e limites ficam abaixo da ferramenta.',
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
    contentQualityBody: 'Esta página combina ferramenta ativa, interpretação, exemplos, limites e perguntas frequentes para um diagnóstico público mais claro.',
  },
  es: {
    breadcrumbHome: 'NetProbe Atlas',
    pageStatusLabel: 'Estado de página',
    relatedTitle: 'Páginas relacionadas',
    infoTitle: 'Consulta pública instantánea',
    infoBody: 'Ejecuta un diagnóstico puntual desde esta página. Los resultados aparecen sobre la guía, y metodología, privacidad y límites quedan debajo de la herramienta.',
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
    contentQualityBody: 'Esta página combina herramienta activa, interpretación, ejemplos, límites y preguntas frecuentes para un diagnóstico público más claro.',
  },
  fr: {
    breadcrumbHome: 'NetProbe Atlas',
    pageStatusLabel: 'Statut de page',
    relatedTitle: 'Pages liées',
    infoTitle: 'Controle public instantane',
    infoBody: 'Lancez un diagnostic ponctuel depuis cette page. Les resultats apparaissent au-dessus du guide; methodologie, confidentialite et limites restent sous l outil.',
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
    contentQualityBody: 'Cette page réunit outil actif, interpretation, exemples, limites et questions frequentes pour un diagnostic public plus clair.',
  },
  de: {
    breadcrumbHome: 'NetProbe Atlas',
    pageStatusLabel: 'Seitenstatus',
    relatedTitle: 'Verwandte Seiten',
    infoTitle: 'Sofortige oeffentliche Pruefung',
    infoBody: 'Starten Sie eine punktuelle Diagnose auf dieser Seite. Ergebnisse erscheinen ueber dem Leitfaden; Methodik, Datenschutz und Grenzen stehen darunter.',
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
    contentQualityBody: 'Diese Seite kombiniert aktives Tool, Interpretation, Beispiele, Grenzen und haeufige Fragen fuer eine klarere oeffentliche Diagnose.',
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return sanitizePublicCopy(locale, homeCopy[locale])
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return sanitizePublicCopy(locale, shellCopy[locale])
}
