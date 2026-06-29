import { sanitizePublicCopy, type LocaleCode } from './locales'

export interface HomeCopy {
  eyebrow: string
  title: string
  lead: string
  launchDeskTitle: string
  launchDeskBody: string
  featuredToolsTitle: string
  previewTitle: string
  clustersTitle: string
  clusterCtaLabel: string
  liveEvidenceTitle: string
  liveEvidenceBody: string
  featuredTools: Array<{ siteSlug: string; label: string; body: string }>
  intentClusters: Array<{ title: string; body: string; siteSlugs: string[] }>
  searchLabel: string
  searchPlaceholder: string
  categoryLabel: string
  allCategories: string
  detailCta: string
  publicCta: string
  noResultsTitle: string
  noResultsBody: string
  freeLabel: string
  upgradeLabel: string
  statusLabel: string
  toolTracksLabel: string
  localesLabel: string
  gatedLabel: string
  launchOrderLabel: string
  networkRows: Array<{ title: string; body: string; tone: 'green' | 'amber' }>
  principlesTitle: string
  principles: Array<{ title: string; body: string }>
}

export interface DetailCopy {
  breadcrumbHome: string
  freeToolsTitle: string
  paidBenefitsTitle: string
  detailsTitle: string
  temporaryUrlLabel: string
  categoryLabel: string
  statusLabel: string
  launchOrderLabel: string
  methodologyTitle: string
  methodologyBody: string
  backToCatalog: string
  localDevCta: string
  publicCta: string
  relatedTitle: string
}

export interface FooterCopy {
  brandBody: string
  productNavLabel: string
  legalNavLabel: string
  groups: Array<{ title: string; siteSlugs: string[] }>
}

export const homeCopy: Record<LocaleCode, HomeCopy> = {
  en: {
    eyebrow: 'SuperSites Hub',
    title: 'A curated operating network for useful web tools.',
    lead: 'Explore ten focused utility sites for diagnostics, documents, media, links, calculators, scheduling and developer work. Each product starts with a useful free tool before account features.',
    launchDeskTitle: 'Start with a tool',
    launchDeskBody: 'Open a practical public tool, compare product families and move into each focused site without hunting through a plain inventory.',
    featuredToolsTitle: 'Top public tools',
    previewTitle: 'Live product previews',
    clustersTitle: 'Choose by workflow',
    clusterCtaLabel: 'Open cluster',
    liveEvidenceTitle: 'Free tools first',
    liveEvidenceBody: 'Each listed site links to a public surface with localized pages, practical guidance and a free workflow before account-based features.',
    featuredTools: [
      { siteSlug: 'netprobe-atlas', label: 'DNS and IP checks', body: 'Public DNS, IP, SSL and RDAP checks with bounded abuse controls.' },
      { siteSlug: 'calcharbor', label: 'Scenario calculators', body: 'Browser-side formulas, scenarios and explanations before signup.' },
      { siteSlug: 'devutility-lab', label: 'Local code workbench', body: 'Formatter, diff, JWT, regex and hash utilities that keep snippets local.' },
      { siteSlug: 'timenexus', label: 'World clock planner', body: 'Meeting planner and curated city groups for global scheduling.' },
    ],
    intentClusters: [
      { title: 'Diagnose domains and sites', body: 'Check DNS, email health and web status before setting up monitoring.', siteSlugs: ['netprobe-atlas', 'mailhealth', 'sitepulse-lab'] },
      { title: 'Create client documents', body: 'Draft invoices, quotes, receipts and PDFs with browser-first workflows.', siteSlugs: ['invoicecraft', 'docshift'] },
      { title: 'Prepare launch assets', body: 'Generate QR links, optimize images and keep conversion assets tidy.', siteSlugs: ['qrroute', 'pixelbatch'] },
      { title: 'Plan operations', body: 'Model business numbers, schedule across time zones and inspect developer snippets.', siteSlugs: ['calcharbor', 'timenexus', 'devutility-lab'] },
    ],
    searchLabel: 'Search the catalog',
    searchPlaceholder: 'Try DNS, PDF, QR, invoices...',
    categoryLabel: 'Category',
    allCategories: 'All categories',
    detailCta: 'View site page',
    publicCta: 'Open public site',
    noResultsTitle: 'No matching site yet',
    noResultsBody: 'Try another keyword or category. The catalog groups tools by the workflow they help you complete.',
    freeLabel: 'Free value',
    upgradeLabel: 'Upgrade path',
    statusLabel: 'Status',
    toolTracksLabel: 'tool tracks',
    localesLabel: 'locales',
    gatedLabel: 'Free core workflow',
    launchOrderLabel: 'Product family',
    networkRows: [
      { title: '10 utility sites live', body: 'One shared platform, independent product paths.', tone: 'green' },
      { title: '5 initial languages', body: 'English, Portuguese, Spanish, French and German.', tone: 'green' },
      { title: 'Tool-first pages', body: 'Popular workflows open directly from the public catalog.', tone: 'amber' },
    ],
    principlesTitle: 'Product principles',
    principles: [
      { title: 'Free must work', body: 'The basic user need is solved without mandatory signup.' },
      { title: 'Privacy by default', body: 'Browser-side processing is preferred when it reduces collection.' },
      { title: 'Respectful growth', body: 'Commercial features stay separate from the free answer and never interrupt the core workflow.' },
    ],
  },
  'pt-br': {
    eyebrow: 'SuperSites Hub',
    title: 'Uma rede operacional curada para ferramentas web úteis.',
    lead: 'Explore dez sites focados em diagnóstico, documentos, mídia, links, calculadoras, agenda e trabalho de desenvolvimento. Cada produto começa com uma ferramenta gratuita útil antes de recursos de conta.',
    launchDeskTitle: 'Comece por uma ferramenta',
    launchDeskBody: 'Abra uma ferramenta pública prática, compare famílias de produto e entre em cada site sem passar por um inventário frio.',
    featuredToolsTitle: 'Principais ferramentas públicas',
    previewTitle: 'Previews vivos de produto',
    clustersTitle: 'Escolha por fluxo',
    clusterCtaLabel: 'Abrir grupo',
    liveEvidenceTitle: 'Ferramentas gratuitas primeiro',
    liveEvidenceBody: 'Cada site listado aponta para uma superfície pública com páginas localizadas, orientação prática e um fluxo gratuito antes de recursos de conta.',
    featuredTools: [
      { siteSlug: 'netprobe-atlas', label: 'DNS e IP', body: 'DNS, IP, SSL e RDAP públicos com controles antiabuso limitados.' },
      { siteSlug: 'calcharbor', label: 'Calculadoras de cenário', body: 'Fórmulas no navegador, cenários e explicações antes de cadastro.' },
      { siteSlug: 'devutility-lab', label: 'Workbench local de código', body: 'Formatter, diff, JWT, regex e hash mantendo trechos locais.' },
      { siteSlug: 'timenexus', label: 'Planejador mundial', body: 'Planejador de reunião e grupos de cidades para agenda global.' },
    ],
    intentClusters: [
      { title: 'Diagnosticar domínios e sites', body: 'Verifique DNS, e-mail e status web antes de configurar monitoramento.', siteSlugs: ['netprobe-atlas', 'mailhealth', 'sitepulse-lab'] },
      { title: 'Criar documentos de cliente', body: 'Monte faturas, orçamentos, recibos e PDFs com fluxos browser-first.', siteSlugs: ['invoicecraft', 'docshift'] },
      { title: 'Preparar ativos de lançamento', body: 'Gere QR links, otimize imagens e organize ativos de conversão.', siteSlugs: ['qrroute', 'pixelbatch'] },
      { title: 'Planejar operações', body: 'Modele números, agende entre fusos e inspecione snippets dev.', siteSlugs: ['calcharbor', 'timenexus', 'devutility-lab'] },
    ],
    searchLabel: 'Buscar no catálogo',
    searchPlaceholder: 'Tente DNS, PDF, QR, faturas...',
    categoryLabel: 'Categoria',
    allCategories: 'Todas as categorias',
    detailCta: 'Ver página do site',
    publicCta: 'Abrir site público',
    noResultsTitle: 'Nenhum site encontrado',
    noResultsBody: 'Tente outra palavra ou categoria. O catálogo agrupa ferramentas pelo fluxo que elas ajudam a concluir.',
    freeLabel: 'Valor gratuito',
    upgradeLabel: 'Caminho pago',
    statusLabel: 'Status',
    toolTracksLabel: 'frentes de ferramenta',
    localesLabel: 'idiomas',
    gatedLabel: 'Fluxo principal gratuito',
    launchOrderLabel: 'Família de produto',
    networkRows: [
      { title: '10 sites úteis no ar', body: 'Uma plataforma compartilhada, produtos independentes.', tone: 'green' },
      { title: '5 idiomas iniciais', body: 'Inglês, português, espanhol, francês e alemão.', tone: 'green' },
      { title: 'Páginas com ferramenta primeiro', body: 'Fluxos populares abrem direto pelo catálogo público.', tone: 'amber' },
    ],
    principlesTitle: 'Princípios de produto',
    principles: [
      { title: 'O gratuito precisa funcionar', body: 'A necessidade básica é resolvida sem cadastro obrigatório.' },
      { title: 'Privacidade por padrão', body: 'Processamento no navegador é preferido quando reduz coleta.' },
      { title: 'Crescimento respeitoso', body: 'Recursos comerciais ficam separados da resposta gratuita e não interrompem o fluxo principal.' },
    ],
  },
  es: {
    eyebrow: 'SuperSites Hub',
    title: 'Una red operativa curada para herramientas web útiles.',
    lead: 'Explora diez sitios enfocados en diagnóstico, documentos, medios, enlaces, calculadoras, agenda y trabajo de desarrollo. Cada producto empieza con una herramienta gratuita útil antes de funciones de cuenta.',
    launchDeskTitle: 'Empieza con una herramienta',
    launchDeskBody: 'Abre una herramienta pública práctica, compara familias de producto y entra en cada sitio sin navegar un inventario plano.',
    featuredToolsTitle: 'Herramientas públicas principales',
    previewTitle: 'Previews vivos de producto',
    clustersTitle: 'Elegir por flujo',
    clusterCtaLabel: 'Abrir grupo',
    liveEvidenceTitle: 'Herramientas gratuitas primero',
    liveEvidenceBody: 'Cada sitio listado enlaza una superficie pública con páginas localizadas, guía práctica y un flujo gratuito antes de funciones de cuenta.',
    featuredTools: [
      { siteSlug: 'netprobe-atlas', label: 'DNS e IP', body: 'DNS, IP, SSL y RDAP públicos con controles antiabuso acotados.' },
      { siteSlug: 'calcharbor', label: 'Calculadoras de escenarios', body: 'Fórmulas en navegador, escenarios y explicaciones antes del registro.' },
      { siteSlug: 'devutility-lab', label: 'Workbench local de código', body: 'Formatter, diff, JWT, regex y hash manteniendo fragmentos locales.' },
      { siteSlug: 'timenexus', label: 'Planificador mundial', body: 'Planificador de reuniones y grupos de ciudades para agenda global.' },
    ],
    intentClusters: [
      { title: 'Diagnosticar dominios y sitios', body: 'Revisa DNS, correo y estado web antes de configurar monitoreo.', siteSlugs: ['netprobe-atlas', 'mailhealth', 'sitepulse-lab'] },
      { title: 'Crear documentos de cliente', body: 'Crea facturas, presupuestos, recibos y PDF con flujos browser-first.', siteSlugs: ['invoicecraft', 'docshift'] },
      { title: 'Preparar activos de lanzamiento', body: 'Genera QR links, optimiza imágenes y ordena activos de conversión.', siteSlugs: ['qrroute', 'pixelbatch'] },
      { title: 'Planear operaciones', body: 'Modela números, agenda entre husos e inspecciona snippets dev.', siteSlugs: ['calcharbor', 'timenexus', 'devutility-lab'] },
    ],
    searchLabel: 'Buscar en el catálogo',
    searchPlaceholder: 'Prueba DNS, PDF, QR, facturas...',
    categoryLabel: 'Categoría',
    allCategories: 'Todas las categorías',
    detailCta: 'Ver página del sitio',
    publicCta: 'Abrir sitio público',
    noResultsTitle: 'No hay sitios coincidentes',
    noResultsBody: 'Prueba otra palabra o categoría. El catálogo agrupa herramientas por el flujo que ayudan a completar.',
    freeLabel: 'Valor gratuito',
    upgradeLabel: 'Ruta de upgrade',
    statusLabel: 'Estado',
    toolTracksLabel: 'líneas de herramienta',
    localesLabel: 'idiomas',
    gatedLabel: 'Flujo principal gratuito',
    launchOrderLabel: 'Familia de producto',
    networkRows: [
      { title: '10 sitios útiles activos', body: 'Una plataforma compartida, productos independientes.', tone: 'green' },
      { title: '5 idiomas iniciales', body: 'Inglés, portugués, español, francés y alemán.', tone: 'green' },
      { title: 'Páginas con herramienta primero', body: 'Los flujos populares abren directo desde el catálogo público.', tone: 'amber' },
    ],
    principlesTitle: 'Principios de producto',
    principles: [
      { title: 'Lo gratuito debe funcionar', body: 'La necesidad básica se resuelve sin registro obligatorio.' },
      { title: 'Privacidad por defecto', body: 'El navegador se prefiere cuando reduce recolección.' },
      { title: 'Crecimiento respetuoso', body: 'Las funciones comerciales quedan separadas de la respuesta gratuita y no interrumpen el flujo principal.' },
    ],
  },
  fr: {
    eyebrow: 'SuperSites Hub',
    title: 'Un réseau opérationnel organisé pour des outils web utiles.',
    lead: 'Explorez dix sites dedies au diagnostic, aux documents, aux medias, aux liens, aux calculateurs, a la planification et au travail developpeur. Chaque produit commence par un outil gratuit utile avant les fonctions de compte.',
    launchDeskTitle: 'Commencer par un outil',
    launchDeskBody: 'Ouvrez un outil public pratique, comparez les familles produit et entrez dans chaque site sans passer par un simple inventaire.',
    featuredToolsTitle: 'Outils publics prioritaires',
    previewTitle: 'Aperçus produit en ligne',
    clustersTitle: 'Choisir par workflow',
    clusterCtaLabel: 'Ouvrir le groupe',
    liveEvidenceTitle: 'Outils gratuits d abord',
    liveEvidenceBody: 'Chaque site liste pointe vers une surface publique avec pages localisees, guide pratique et workflow gratuit avant les fonctions de compte.',
    featuredTools: [
      { siteSlug: 'netprobe-atlas', label: 'DNS et IP', body: 'DNS, IP, SSL et RDAP publics avec contrôles anti-abus bornés.' },
      { siteSlug: 'calcharbor', label: 'Scénarios calculés', body: 'Formules navigateur, scénarios et explications avant compte.' },
      { siteSlug: 'devutility-lab', label: 'Workbench code local', body: 'Formatter, diff, JWT, regex et hash gardant les extraits locaux.' },
      { siteSlug: 'timenexus', label: 'Planificateur mondial', body: 'Planificateur de réunion et groupes de villes pour agenda global.' },
    ],
    intentClusters: [
      { title: 'Diagnostiquer domaines et sites', body: 'Vérifiez DNS, e-mail et statut web avant la surveillance.', siteSlugs: ['netprobe-atlas', 'mailhealth', 'sitepulse-lab'] },
      { title: 'Créer des documents client', body: 'Préparez factures, devis, reçus et PDF avec workflows browser-first.', siteSlugs: ['invoicecraft', 'docshift'] },
      { title: 'Préparer les assets de lancement', body: 'Générez QR links, optimisez images et organisez la conversion.', siteSlugs: ['qrroute', 'pixelbatch'] },
      { title: 'Planifier les opérations', body: 'Modelez les chiffres, planifiez les fuseaux et inspectez les snippets dev.', siteSlugs: ['calcharbor', 'timenexus', 'devutility-lab'] },
    ],
    searchLabel: 'Rechercher dans le catalogue',
    searchPlaceholder: 'Essayez DNS, PDF, QR, factures...',
    categoryLabel: 'Catégorie',
    allCategories: 'Toutes les catégories',
    detailCta: 'Voir la page du site',
    publicCta: 'Ouvrir le site public',
    noResultsTitle: 'Aucun site correspondant',
    noResultsBody: 'Essayez un autre mot ou une autre categorie. Le catalogue regroupe les outils par workflow a accomplir.',
    freeLabel: 'Valeur gratuite',
    upgradeLabel: 'Offre payante',
    statusLabel: 'Statut',
    toolTracksLabel: 'pistes outil',
    localesLabel: 'langues',
    gatedLabel: 'Workflow principal gratuit',
    launchOrderLabel: 'Famille de produit',
    networkRows: [
      { title: '10 sites utiles en ligne', body: 'Une plateforme partagée, des produits indépendants.', tone: 'green' },
      { title: '5 langues initiales', body: 'Anglais, portugais, espagnol, français et allemand.', tone: 'green' },
      { title: 'Pages outil d abord', body: 'Les workflows populaires s ouvrent directement depuis le catalogue public.', tone: 'amber' },
    ],
    principlesTitle: 'Principes produit',
    principles: [
      { title: 'Le gratuit doit fonctionner', body: 'Le besoin de base est résolu sans compte obligatoire.' },
      { title: 'Confidentialité par défaut', body: 'Le navigateur est préféré quand il réduit la collecte.' },
      { title: 'Croissance respectueuse', body: 'Les fonctions commerciales restent separees de la reponse gratuite et n interrompent pas le workflow principal.' },
    ],
  },
  de: {
    eyebrow: 'SuperSites Hub',
    title: 'Ein kuratiertes Betriebsnetzwerk für nützliche Web-Tools.',
    lead: 'Entdecken Sie zehn fokussierte Utility-Sites fuer Diagnosen, Dokumente, Medien, Links, Rechner, Planung und Entwicklerarbeit. Jedes Produkt beginnt mit einem hilfreichen kostenlosen Tool vor Konto-Funktionen.',
    launchDeskTitle: 'Mit einem Tool starten',
    launchDeskBody: 'Oeffnen Sie ein praktisches oeffentliches Tool, vergleichen Sie Produktfamilien und wechseln Sie ohne bloßes Inventar in jede Site.',
    featuredToolsTitle: 'Wichtige öffentliche Tools',
    previewTitle: 'Live-Produktvorschau',
    clustersTitle: 'Nach Workflow wählen',
    clusterCtaLabel: 'Gruppe öffnen',
    liveEvidenceTitle: 'Kostenlose Tools zuerst',
    liveEvidenceBody: 'Jede gelistete Site verlinkt eine oeffentliche Oberflaeche mit lokalisierten Seiten, praktischem Leitfaden und kostenlosem Workflow vor Konto-Funktionen.',
    featuredTools: [
      { siteSlug: 'netprobe-atlas', label: 'DNS und IP', body: 'Öffentliche DNS-, IP-, SSL- und RDAP-Prüfungen mit begrenztem Missbrauchsschutz.' },
      { siteSlug: 'calcharbor', label: 'Szenario-Rechner', body: 'Browser-Formeln, Szenarien und Erklärungen vor Registrierung.' },
      { siteSlug: 'devutility-lab', label: 'Lokaler Code-Workbench', body: 'Formatter, Diff, JWT, Regex und Hash mit lokalen Snippets.' },
      { siteSlug: 'timenexus', label: 'Weltplaner', body: 'Meeting-Planer und Stadtgruppen für globale Termine.' },
    ],
    intentClusters: [
      { title: 'Domains und Sites diagnostizieren', body: 'Prüfen Sie DNS, E-Mail und Webstatus vor Monitoring.', siteSlugs: ['netprobe-atlas', 'mailhealth', 'sitepulse-lab'] },
      { title: 'Kundendokumente erstellen', body: 'Erstellen Sie Rechnungen, Angebote, Belege und PDF-Workflows im Browser.', siteSlugs: ['invoicecraft', 'docshift'] },
      { title: 'Launch-Assets vorbereiten', body: 'Erzeugen Sie QR links, optimieren Sie Bilder und ordnen Sie Conversion-Assets.', siteSlugs: ['qrroute', 'pixelbatch'] },
      { title: 'Abläufe planen', body: 'Modellieren Sie Zahlen, planen Sie Zeitzonen und prüfen Sie Dev-Snippets.', siteSlugs: ['calcharbor', 'timenexus', 'devutility-lab'] },
    ],
    searchLabel: 'Katalog durchsuchen',
    searchPlaceholder: 'DNS, PDF, QR, Rechnungen...',
    categoryLabel: 'Kategorie',
    allCategories: 'Alle Kategorien',
    detailCta: 'Site-Seite öffnen',
    publicCta: 'Öffentliche Site öffnen',
    noResultsTitle: 'Keine passende Site gefunden',
    noResultsBody: 'Versuchen Sie ein anderes Wort oder eine andere Kategorie. Der Katalog gruppiert Tools nach dem Workflow, den sie erledigen helfen.',
    freeLabel: 'Kostenloser Nutzen',
    upgradeLabel: 'Upgrade-Pfad',
    statusLabel: 'Status',
    toolTracksLabel: 'Tool-Bereiche',
    localesLabel: 'Sprachen',
    gatedLabel: 'Kostenloser Kern-Workflow',
    launchOrderLabel: 'Produktfamilie',
    networkRows: [
      { title: '10 Utility-Sites live', body: 'Eine gemeinsame Plattform, unabhängige Produkte.', tone: 'green' },
      { title: '5 Startsprachen', body: 'Englisch, Portugiesisch, Spanisch, Französisch und Deutsch.', tone: 'green' },
      { title: 'Tool-first Seiten', body: 'Beliebte Workflows oeffnen direkt aus dem oeffentlichen Katalog.', tone: 'amber' },
    ],
    principlesTitle: 'Produktprinzipien',
    principles: [
      { title: 'Kostenlos muss funktionieren', body: 'Das Grundbedürfnis wird ohne Pflichtkonto gelöst.' },
      { title: 'Privacy by default', body: 'Browser-Verarbeitung wird bevorzugt, wenn sie Datenerhebung reduziert.' },
      { title: 'Respektvolles Wachstum', body: 'Kommerzielle Funktionen bleiben von der kostenlosen Antwort getrennt und unterbrechen den Kern-Workflow nicht.' },
    ],
  },
}

export const detailCopy: Record<LocaleCode, DetailCopy> = {
  en: {
    breadcrumbHome: 'Catalog',
    freeToolsTitle: 'Free tool scope',
    paidBenefitsTitle: 'Upgrade value',
    detailsTitle: 'Site details',
    temporaryUrlLabel: 'Public URL',
    categoryLabel: 'Category',
    statusLabel: 'Status',
    launchOrderLabel: 'Product family',
    methodologyTitle: 'Review notes',
    methodologyBody: 'This page summarizes what the free workflow does, what account features may add later and how the product keeps the core answer available without mandatory signup.',
    backToCatalog: 'Back to catalog',
    localDevCta: 'Open local NetProbe tools',
    publicCta: 'Open public site',
    relatedTitle: 'Related operating notes',
  },
  'pt-br': {
    breadcrumbHome: 'Catálogo',
    freeToolsTitle: 'Escopo gratuito da ferramenta',
    paidBenefitsTitle: 'Valor do upgrade',
    detailsTitle: 'Detalhes do site',
    temporaryUrlLabel: 'URL pública',
    categoryLabel: 'Categoria',
    statusLabel: 'Status',
    launchOrderLabel: 'Família de produto',
    methodologyTitle: 'Notas de revisão',
    methodologyBody: 'Esta página resume o que o fluxo gratuito faz, o que recursos de conta podem acrescentar depois e como o produto mantém a resposta principal disponível sem cadastro obrigatório.',
    backToCatalog: 'Voltar ao catálogo',
    localDevCta: 'Abrir NetProbe local',
    publicCta: 'Abrir site público',
    relatedTitle: 'Notas operacionais relacionadas',
  },
  es: {
    breadcrumbHome: 'Catálogo',
    freeToolsTitle: 'Alcance gratuito de la herramienta',
    paidBenefitsTitle: 'Valor del upgrade',
    detailsTitle: 'Detalles del sitio',
    temporaryUrlLabel: 'URL pública',
    categoryLabel: 'Categoría',
    statusLabel: 'Estado',
    launchOrderLabel: 'Familia de producto',
    methodologyTitle: 'Notas de revisión',
    methodologyBody: 'Esta página resume qué hace el flujo gratuito, qué pueden añadir luego las funciones de cuenta y cómo el producto mantiene la respuesta principal disponible sin registro obligatorio.',
    backToCatalog: 'Volver al catálogo',
    localDevCta: 'Abrir NetProbe local',
    publicCta: 'Abrir sitio público',
    relatedTitle: 'Notas operativas relacionadas',
  },
  fr: {
    breadcrumbHome: 'Catalogue',
    freeToolsTitle: 'Portée gratuite de l’outil',
    paidBenefitsTitle: 'Valeur payante',
    detailsTitle: 'Détails du site',
    temporaryUrlLabel: 'URL publique',
    categoryLabel: 'Catégorie',
    statusLabel: 'Statut',
    launchOrderLabel: 'Famille de produit',
    methodologyTitle: 'Notes de revue',
    methodologyBody: 'Cette page resume ce que le workflow gratuit fait, ce que les fonctions de compte peuvent ajouter ensuite et comment le produit garde la reponse principale disponible sans compte obligatoire.',
    backToCatalog: 'Retour au catalogue',
    localDevCta: 'Ouvrir NetProbe local',
    publicCta: 'Ouvrir le site public',
    relatedTitle: 'Notes opérationnelles liées',
  },
  de: {
    breadcrumbHome: 'Katalog',
    freeToolsTitle: 'Kostenloser Tool-Umfang',
    paidBenefitsTitle: 'Upgrade-Nutzen',
    detailsTitle: 'Site-Details',
    temporaryUrlLabel: 'Oeffentliche URL',
    categoryLabel: 'Kategorie',
    statusLabel: 'Status',
    launchOrderLabel: 'Produktfamilie',
    methodologyTitle: 'Review-Notizen',
    methodologyBody: 'Diese Seite fasst zusammen, was der kostenlose Workflow leistet, welche Konto-Funktionen spaeter ergaenzen koennen und wie die Kernantwort ohne Pflichtkonto verfuegbar bleibt.',
    backToCatalog: 'Zurück zum Katalog',
    localDevCta: 'Lokales NetProbe öffnen',
    publicCta: 'Öffentliche Site öffnen',
    relatedTitle: 'Verwandte Betriebsnotizen',
  },
}

export const footerCopy: Record<LocaleCode, FooterCopy> = {
  en: {
    brandBody: 'A portfolio of useful browser-first tools with localized public pages, practical free workflows and clear paths for account features.',
    productNavLabel: 'Product verticals',
    legalNavLabel: 'Legal and editorial pages',
    groups: [
      { title: 'Diagnostics', siteSlugs: ['netprobe-atlas', 'mailhealth', 'sitepulse-lab'] },
      { title: 'Documents and media', siteSlugs: ['invoicecraft', 'docshift', 'pixelbatch'] },
      { title: 'Links and growth', siteSlugs: ['qrroute', 'calcharbor'] },
      { title: 'Developer operations', siteSlugs: ['devutility-lab', 'timenexus'] },
    ],
  },
  'pt-br': {
    brandBody: 'Um portfólio de ferramentas browser-first com páginas públicas localizadas, fluxos gratuitos práticos e caminhos claros para recursos de conta.',
    productNavLabel: 'Verticais de produto',
    legalNavLabel: 'Páginas legais e editoriais',
    groups: [
      { title: 'Diagnóstico', siteSlugs: ['netprobe-atlas', 'mailhealth', 'sitepulse-lab'] },
      { title: 'Documentos e mídia', siteSlugs: ['invoicecraft', 'docshift', 'pixelbatch'] },
      { title: 'Links e crescimento', siteSlugs: ['qrroute', 'calcharbor'] },
      { title: 'Operações dev', siteSlugs: ['devutility-lab', 'timenexus'] },
    ],
  },
  es: {
    brandBody: 'Un portafolio de herramientas browser-first con páginas localizadas, flujos gratuitos prácticos y caminos claros para funciones de cuenta.',
    productNavLabel: 'Verticales de producto',
    legalNavLabel: 'Páginas legales y editoriales',
    groups: [
      { title: 'Diagnóstico', siteSlugs: ['netprobe-atlas', 'mailhealth', 'sitepulse-lab'] },
      { title: 'Documentos y medios', siteSlugs: ['invoicecraft', 'docshift', 'pixelbatch'] },
      { title: 'Links y crecimiento', siteSlugs: ['qrroute', 'calcharbor'] },
      { title: 'Operaciones dev', siteSlugs: ['devutility-lab', 'timenexus'] },
    ],
  },
  fr: {
    brandBody: 'Un portefeuille d outils browser-first avec pages localisees, workflows gratuits pratiques et chemins clairs vers les fonctions de compte.',
    productNavLabel: 'Verticales produit',
    legalNavLabel: 'Pages légales et éditoriales',
    groups: [
      { title: 'Diagnostic', siteSlugs: ['netprobe-atlas', 'mailhealth', 'sitepulse-lab'] },
      { title: 'Documents et médias', siteSlugs: ['invoicecraft', 'docshift', 'pixelbatch'] },
      { title: 'Liens et croissance', siteSlugs: ['qrroute', 'calcharbor'] },
      { title: 'Opérations dev', siteSlugs: ['devutility-lab', 'timenexus'] },
    ],
  },
  de: {
    brandBody: 'Ein Portfolio browser-first Tools mit lokalisierten oeffentlichen Seiten, praktischen kostenlosen Workflows und klaren Wegen zu Konto-Funktionen.',
    productNavLabel: 'Produktbereiche',
    legalNavLabel: 'Rechtliche und redaktionelle Seiten',
    groups: [
      { title: 'Diagnostik', siteSlugs: ['netprobe-atlas', 'mailhealth', 'sitepulse-lab'] },
      { title: 'Dokumente und Medien', siteSlugs: ['invoicecraft', 'docshift', 'pixelbatch'] },
      { title: 'Links und Wachstum', siteSlugs: ['qrroute', 'calcharbor'] },
      { title: 'Dev-Betrieb', siteSlugs: ['devutility-lab', 'timenexus'] },
    ],
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return sanitizePublicCopy(locale, homeCopy[locale])
}

export function getDetailCopy(locale: LocaleCode): DetailCopy {
  return sanitizePublicCopy(locale, detailCopy[locale])
}

export function getFooterCopy(locale: LocaleCode): FooterCopy {
  return sanitizePublicCopy(locale, footerCopy[locale])
}
