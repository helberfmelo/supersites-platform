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
    lead: 'Explore ten utility sites, their free value, upgrade paths and launch order. The public catalog is built to stay useful before login, ads or paid plans are introduced.',
    launchDeskTitle: 'Launch desk',
    launchDeskBody: 'Start from a live tool surface, compare product tracks and move into each focused site without hunting through a plain inventory.',
    featuredToolsTitle: 'Top public tools',
    previewTitle: 'Live product previews',
    clustersTitle: 'Choose by workflow',
    clusterCtaLabel: 'Open cluster',
    liveEvidenceTitle: 'Production evidence',
    liveEvidenceBody: 'Each listed site links to a published public surface, localized routes and documented gates before ads, billing or external analytics.',
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
    noResultsBody: 'Try another keyword or category. The catalog will expand as each tool track moves from foundation to launch.',
    freeLabel: 'Free value',
    upgradeLabel: 'Upgrade path',
    statusLabel: 'Status',
    toolTracksLabel: 'tool tracks',
    localesLabel: 'locales',
    gatedLabel: 'Ads and paid upgrades prepared safely',
    launchOrderLabel: 'Launch order',
    networkRows: [
      { title: '10 utility sites live', body: 'One shared platform, independent product paths.', tone: 'green' },
      { title: '5 initial languages', body: 'English, Portuguese, Spanish, French and German.', tone: 'green' },
      { title: 'NetProbe Atlas first', body: 'Network diagnostics leads the product sequence.', tone: 'amber' },
    ],
    principlesTitle: 'Operating principles',
    principles: [
      { title: 'Free must work', body: 'The basic user need is solved without mandatory signup.' },
      { title: 'Privacy by default', body: 'Browser-side processing is preferred when it reduces collection.' },
      { title: 'AdSense-safe growth', body: 'Ads wait for quality gates, useful content and safe placement.' },
    ],
  },
  'pt-br': {
    eyebrow: 'SuperSites Hub',
    title: 'Uma rede operacional curada para ferramentas web úteis.',
    lead: 'Explore dez sites úteis, valor gratuito, caminhos de upgrade e ordem de lançamento. O catálogo público deve continuar útil antes de login, anúncios ou planos pagos.',
    launchDeskTitle: 'Mesa de lançamento',
    launchDeskBody: 'Comece por uma superfície de ferramenta no ar, compare frentes de produto e entre em cada site sem passar por um inventário frio.',
    featuredToolsTitle: 'Principais ferramentas públicas',
    previewTitle: 'Previews vivos de produto',
    clustersTitle: 'Escolha por fluxo',
    clusterCtaLabel: 'Abrir grupo',
    liveEvidenceTitle: 'Evidência de produção',
    liveEvidenceBody: 'Cada site listado aponta para uma superfície pública publicada, rotas localizadas e gates documentados antes de anúncios, billing ou analytics externo.',
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
    noResultsBody: 'Tente outra palavra ou categoria. O catálogo cresce conforme cada frente sai da fundação para o lançamento.',
    freeLabel: 'Valor gratuito',
    upgradeLabel: 'Caminho pago',
    statusLabel: 'Status',
    toolTracksLabel: 'frentes de ferramenta',
    localesLabel: 'idiomas',
    gatedLabel: 'Ads e upgrades pagos preparados com segurança',
    launchOrderLabel: 'Ordem de lançamento',
    networkRows: [
      { title: '10 sites úteis no ar', body: 'Uma plataforma compartilhada, produtos independentes.', tone: 'green' },
      { title: '5 idiomas iniciais', body: 'Inglês, português, espanhol, francês e alemão.', tone: 'green' },
      { title: 'NetProbe Atlas primeiro', body: 'Diagnóstico de rede abre a sequência de produto.', tone: 'amber' },
    ],
    principlesTitle: 'Princípios operacionais',
    principles: [
      { title: 'O gratuito precisa funcionar', body: 'A necessidade básica é resolvida sem cadastro obrigatório.' },
      { title: 'Privacidade por padrão', body: 'Processamento no navegador é preferido quando reduz coleta.' },
      { title: 'Crescimento seguro para AdSense', body: 'Anúncios esperam qualidade, conteúdo útil e posicionamento seguro.' },
    ],
  },
  es: {
    eyebrow: 'SuperSites Hub',
    title: 'Una red operativa curada para herramientas web útiles.',
    lead: 'Explora diez sitios útiles, valor gratuito, rutas de upgrade y orden de lanzamiento. El catálogo público debe ser útil antes de login, anuncios o planes pagos.',
    launchDeskTitle: 'Mesa de lanzamiento',
    launchDeskBody: 'Empieza por una herramienta activa, compara líneas de producto y entra en cada sitio sin navegar un inventario plano.',
    featuredToolsTitle: 'Herramientas públicas principales',
    previewTitle: 'Previews vivos de producto',
    clustersTitle: 'Elegir por flujo',
    clusterCtaLabel: 'Abrir grupo',
    liveEvidenceTitle: 'Evidencia de producción',
    liveEvidenceBody: 'Cada sitio listado enlaza una superficie pública publicada, rutas localizadas y controles documentados antes de anuncios, billing o analytics externo.',
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
    noResultsBody: 'Prueba otra palabra o categoría. El catálogo crecerá cuando cada línea avance de fundación a lanzamiento.',
    freeLabel: 'Valor gratuito',
    upgradeLabel: 'Ruta de upgrade',
    statusLabel: 'Estado',
    toolTracksLabel: 'líneas de herramienta',
    localesLabel: 'idiomas',
    gatedLabel: 'Ads y upgrades pagos preparados con seguridad',
    launchOrderLabel: 'Orden de lanzamiento',
    networkRows: [
      { title: '10 sitios útiles activos', body: 'Una plataforma compartida, productos independientes.', tone: 'green' },
      { title: '5 idiomas iniciales', body: 'Inglés, portugués, español, francés y alemán.', tone: 'green' },
      { title: 'NetProbe Atlas primero', body: 'Diagnóstico de red lidera la secuencia.', tone: 'amber' },
    ],
    principlesTitle: 'Principios operativos',
    principles: [
      { title: 'Lo gratuito debe funcionar', body: 'La necesidad básica se resuelve sin registro obligatorio.' },
      { title: 'Privacidad por defecto', body: 'El navegador se prefiere cuando reduce recolección.' },
      { title: 'Crecimiento seguro para AdSense', body: 'Los anuncios esperan calidad, contenido útil y ubicación segura.' },
    ],
  },
  fr: {
    eyebrow: 'SuperSites Hub',
    title: 'Un réseau opérationnel organisé pour des outils web utiles.',
    lead: 'Explorez dix sites utiles, leur valeur gratuite, leurs offres payantes et leur ordre de lancement. Le catalogue public doit rester utile avant compte, publicités ou plans payants.',
    launchDeskTitle: 'Table de lancement',
    launchDeskBody: 'Commencez par une surface outil en ligne, comparez les pistes produit et ouvrez chaque site sans passer par un simple inventaire.',
    featuredToolsTitle: 'Outils publics prioritaires',
    previewTitle: 'Aperçus produit en ligne',
    clustersTitle: 'Choisir par workflow',
    clusterCtaLabel: 'Ouvrir le groupe',
    liveEvidenceTitle: 'Preuve de production',
    liveEvidenceBody: 'Chaque site listé pointe vers une surface publique publiée, des routes localisées et des contrôles documentés avant publicités, billing ou analytics externe.',
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
    noResultsBody: 'Essayez un autre mot ou une autre catégorie. Le catalogue grandira quand chaque piste passera de fondation à lancement.',
    freeLabel: 'Valeur gratuite',
    upgradeLabel: 'Offre payante',
    statusLabel: 'Statut',
    toolTracksLabel: 'pistes outil',
    localesLabel: 'langues',
    gatedLabel: 'Ads et offres payantes préparées prudemment',
    launchOrderLabel: 'Ordre de lancement',
    networkRows: [
      { title: '10 sites utiles en ligne', body: 'Une plateforme partagée, des produits indépendants.', tone: 'green' },
      { title: '5 langues initiales', body: 'Anglais, portugais, espagnol, français et allemand.', tone: 'green' },
      { title: 'NetProbe Atlas d’abord', body: 'Le diagnostic réseau ouvre la séquence produit.', tone: 'amber' },
    ],
    principlesTitle: 'Principes opérationnels',
    principles: [
      { title: 'Le gratuit doit fonctionner', body: 'Le besoin de base est résolu sans compte obligatoire.' },
      { title: 'Confidentialité par défaut', body: 'Le navigateur est préféré quand il réduit la collecte.' },
      { title: 'Croissance sûre pour AdSense', body: 'Les annonces attendent qualité, contenu utile et placement sûr.' },
    ],
  },
  de: {
    eyebrow: 'SuperSites Hub',
    title: 'Ein kuratiertes Betriebsnetzwerk für nützliche Web-Tools.',
    lead: 'Entdecken Sie zehn Utility-Sites, kostenlosen Nutzen, Upgrade-Pfade und Startreihenfolge. Der öffentliche Katalog bleibt vor Login, Anzeigen oder Bezahlplänen nützlich.',
    launchDeskTitle: 'Launch-Desk',
    launchDeskBody: 'Starten Sie mit einer live Tool-Oberfläche, vergleichen Sie Produktbereiche und öffnen Sie jede Site ohne bloßes Inventar.',
    featuredToolsTitle: 'Wichtige öffentliche Tools',
    previewTitle: 'Live-Produktvorschau',
    clustersTitle: 'Nach Workflow wählen',
    clusterCtaLabel: 'Gruppe öffnen',
    liveEvidenceTitle: 'Produktionsnachweis',
    liveEvidenceBody: 'Jede gelistete Site verlinkt eine veröffentlichte Oberfläche, lokalisierte Routen und dokumentierte Kontrollen vor Anzeigen, Billing oder externer Analytics.',
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
    noResultsBody: 'Versuchen Sie ein anderes Wort oder eine andere Kategorie. Der Katalog wächst, wenn Produktbereiche vom Fundament zum Launch wechseln.',
    freeLabel: 'Kostenloser Nutzen',
    upgradeLabel: 'Upgrade-Pfad',
    statusLabel: 'Status',
    toolTracksLabel: 'Tool-Bereiche',
    localesLabel: 'Sprachen',
    gatedLabel: 'Ads und bezahlte Upgrades sicher vorbereitet',
    launchOrderLabel: 'Startreihenfolge',
    networkRows: [
      { title: '10 Utility-Sites live', body: 'Eine gemeinsame Plattform, unabhängige Produkte.', tone: 'green' },
      { title: '5 Startsprachen', body: 'Englisch, Portugiesisch, Spanisch, Französisch und Deutsch.', tone: 'green' },
      { title: 'NetProbe Atlas zuerst', body: 'Netzwerkdiagnose führt die Produktsequenz an.', tone: 'amber' },
    ],
    principlesTitle: 'Betriebsprinzipien',
    principles: [
      { title: 'Kostenlos muss funktionieren', body: 'Das Grundbedürfnis wird ohne Pflichtkonto gelöst.' },
      { title: 'Privacy by default', body: 'Browser-Verarbeitung wird bevorzugt, wenn sie Datenerhebung reduziert.' },
      { title: 'AdSense-sicheres Wachstum', body: 'Anzeigen warten auf Qualität, nützliche Inhalte und sichere Platzierung.' },
    ],
  },
}

export const detailCopy: Record<LocaleCode, DetailCopy> = {
  en: {
    breadcrumbHome: 'Catalog',
    freeToolsTitle: 'Free tool scope',
    paidBenefitsTitle: 'Upgrade value',
    detailsTitle: 'Site details',
    temporaryUrlLabel: 'Temporary public URL',
    categoryLabel: 'Category',
    statusLabel: 'Status',
    launchOrderLabel: 'Launch order',
    methodologyTitle: 'Quality check',
    methodologyBody: 'This site is published with documented quality checks. Ads, billing and external analytics stay disabled until the public content, monitoring, backup and rollback checks are complete.',
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
    temporaryUrlLabel: 'URL pública temporária',
    categoryLabel: 'Categoria',
    statusLabel: 'Status',
    launchOrderLabel: 'Ordem de lançamento',
    methodologyTitle: 'Verificação de qualidade',
    methodologyBody: 'Este site está publicado com verificações documentadas. Anúncios, billing e analytics externo seguem desligados até conteúdo público, monitoramento, backup e rollback passarem pelos checks.',
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
    temporaryUrlLabel: 'URL pública temporal',
    categoryLabel: 'Categoría',
    statusLabel: 'Estado',
    launchOrderLabel: 'Orden de lanzamiento',
    methodologyTitle: 'Verificación de calidad',
    methodologyBody: 'Este sitio está publicado con verificaciones documentadas. Anuncios, billing y analytics externo siguen desactivados hasta completar contenido público, monitoreo, backup y rollback.',
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
    temporaryUrlLabel: 'URL publique temporaire',
    categoryLabel: 'Catégorie',
    statusLabel: 'Statut',
    launchOrderLabel: 'Ordre de lancement',
    methodologyTitle: 'Vérification qualité',
    methodologyBody: 'Ce site est publié avec des contrôles documentés. Publicités, billing et analytics externe restent désactivés jusqu’aux contrôles contenu public, surveillance, backup et rollback.',
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
    temporaryUrlLabel: 'Temporäre öffentliche URL',
    categoryLabel: 'Kategorie',
    statusLabel: 'Status',
    launchOrderLabel: 'Startreihenfolge',
    methodologyTitle: 'Qualitätsprüfung',
    methodologyBody: 'Diese Site ist mit dokumentierten Prüfungen veröffentlicht. Anzeigen, Billing und externe Analytics bleiben deaktiviert, bis Inhalte, Monitoring, Backup und Rollback geprüft sind.',
    backToCatalog: 'Zurück zum Katalog',
    localDevCta: 'Lokales NetProbe öffnen',
    publicCta: 'Öffentliche Site öffnen',
    relatedTitle: 'Verwandte Betriebsnotizen',
  },
}

export const footerCopy: Record<LocaleCode, FooterCopy> = {
  en: {
    brandBody: 'A portfolio of useful browser-first tools with localized public pages, transparent upgrade paths and monetization held behind quality checks.',
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
    brandBody: 'Um portfólio de ferramentas browser-first com páginas públicas localizadas, upgrades transparentes e monetização segurada por checks de qualidade.',
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
    brandBody: 'Un portafolio de herramientas browser-first con páginas localizadas, upgrades transparentes y monetización retenida por verificaciones de calidad.',
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
    brandBody: 'Un portefeuille d’outils browser-first avec pages localisées, offres transparentes et monétisation retenue par contrôles qualité.',
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
    brandBody: 'Ein Portfolio browser-first Tools mit lokalisierten öffentlichen Seiten, transparenten Upgrades und Monetarisierung hinter Qualitätsprüfungen.',
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
