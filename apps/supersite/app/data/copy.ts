import type { LocaleCode } from './locales'

interface HomeCopy {
  eyebrow: string
  title: string
  lead: string
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
  launchOrderLabel: string
  networkRows: Array<{ title: string; body: string; tone: 'green' | 'amber' }>
  principlesTitle: string
  principles: Array<{ title: string; body: string }>
}

interface DetailCopy {
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

export const homeCopy: Record<LocaleCode, HomeCopy> = {
  en: {
    eyebrow: 'SuperSites Hub',
    title: 'A curated operating network for useful web tools.',
    lead: 'Explore ten planned utility sites, their free value, upgrade paths and launch order. The public catalog is built to stay useful before login, ads or paid plans are introduced.',
    searchLabel: 'Search the catalog',
    searchPlaceholder: 'Try DNS, PDF, QR, invoices...',
    categoryLabel: 'Category',
    allCategories: 'All categories',
    detailCta: 'View site page',
    publicCta: 'Open public placeholder',
    noResultsTitle: 'No matching site yet',
    noResultsBody: 'Try another keyword or category. The catalog will expand as each tool track moves from foundation to launch.',
    freeLabel: 'Free value',
    upgradeLabel: 'Upgrade path',
    statusLabel: 'Status',
    launchOrderLabel: 'Launch order',
    networkRows: [
      { title: '10 utility sites planned', body: 'One shared platform, independent product paths.', tone: 'green' },
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
    lead: 'Explore dez sites planejados, valor gratuito, caminhos de upgrade e ordem de lançamento. O catálogo público deve continuar útil antes de login, anúncios ou planos pagos.',
    searchLabel: 'Buscar no catálogo',
    searchPlaceholder: 'Tente DNS, PDF, QR, faturas...',
    categoryLabel: 'Categoria',
    allCategories: 'Todas as categorias',
    detailCta: 'Ver página do site',
    publicCta: 'Abrir placeholder público',
    noResultsTitle: 'Nenhum site encontrado',
    noResultsBody: 'Tente outra palavra ou categoria. O catálogo cresce conforme cada frente sai da fundação para o lançamento.',
    freeLabel: 'Valor gratuito',
    upgradeLabel: 'Caminho pago',
    statusLabel: 'Status',
    launchOrderLabel: 'Ordem de lançamento',
    networkRows: [
      { title: '10 sites úteis planejados', body: 'Uma plataforma compartilhada, produtos independentes.', tone: 'green' },
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
    lead: 'Explora diez sitios planificados, valor gratuito, rutas de upgrade y orden de lanzamiento. El catálogo público debe ser útil antes de login, anuncios o planes pagos.',
    searchLabel: 'Buscar en el catálogo',
    searchPlaceholder: 'Prueba DNS, PDF, QR, facturas...',
    categoryLabel: 'Categoría',
    allCategories: 'Todas las categorías',
    detailCta: 'Ver página del sitio',
    publicCta: 'Abrir placeholder público',
    noResultsTitle: 'No hay sitios coincidentes',
    noResultsBody: 'Prueba otra palabra o categoría. El catálogo crecerá cuando cada línea avance de fundación a lanzamiento.',
    freeLabel: 'Valor gratuito',
    upgradeLabel: 'Ruta de upgrade',
    statusLabel: 'Estado',
    launchOrderLabel: 'Orden de lanzamiento',
    networkRows: [
      { title: '10 sitios útiles planificados', body: 'Una plataforma compartida, productos independientes.', tone: 'green' },
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
    lead: 'Explorez dix sites prévus, leur valeur gratuite, leurs offres payantes et leur ordre de lancement. Le catalogue public doit rester utile avant compte, publicités ou plans payants.',
    searchLabel: 'Rechercher dans le catalogue',
    searchPlaceholder: 'Essayez DNS, PDF, QR, factures...',
    categoryLabel: 'Catégorie',
    allCategories: 'Toutes les catégories',
    detailCta: 'Voir la page du site',
    publicCta: 'Ouvrir le placeholder public',
    noResultsTitle: 'Aucun site correspondant',
    noResultsBody: 'Essayez un autre mot ou une autre catégorie. Le catalogue grandira quand chaque piste passera de fondation à lancement.',
    freeLabel: 'Valeur gratuite',
    upgradeLabel: 'Offre payante',
    statusLabel: 'Statut',
    launchOrderLabel: 'Ordre de lancement',
    networkRows: [
      { title: '10 sites utiles prévus', body: 'Une plateforme partagée, des produits indépendants.', tone: 'green' },
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
    lead: 'Entdecken Sie zehn geplante Utility-Sites, kostenlosen Nutzen, Upgrade-Pfade und Startreihenfolge. Der öffentliche Katalog bleibt vor Login, Anzeigen oder Bezahlplänen nützlich.',
    searchLabel: 'Katalog durchsuchen',
    searchPlaceholder: 'DNS, PDF, QR, Rechnungen...',
    categoryLabel: 'Kategorie',
    allCategories: 'Alle Kategorien',
    detailCta: 'Site-Seite öffnen',
    publicCta: 'Öffentlichen Platzhalter öffnen',
    noResultsTitle: 'Keine passende Site gefunden',
    noResultsBody: 'Versuchen Sie ein anderes Wort oder eine andere Kategorie. Der Katalog wächst, wenn Produktbereiche vom Fundament zum Launch wechseln.',
    freeLabel: 'Kostenloser Nutzen',
    upgradeLabel: 'Upgrade-Pfad',
    statusLabel: 'Status',
    launchOrderLabel: 'Startreihenfolge',
    networkRows: [
      { title: '10 Utility-Sites geplant', body: 'Eine gemeinsame Plattform, unabhängige Produkte.', tone: 'green' },
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
    freeToolsTitle: 'Free MVP scope',
    paidBenefitsTitle: 'Upgrade value',
    detailsTitle: 'Site details',
    temporaryUrlLabel: 'Temporary public URL',
    categoryLabel: 'Category',
    statusLabel: 'Status',
    launchOrderLabel: 'Launch order',
    methodologyTitle: 'Quality gate',
    methodologyBody: 'This working-name site should not be treated as AdSense-ready until tools, original content, legal pages, monitoring, backup and rollback pass the documented launch gate.',
    backToCatalog: 'Back to catalog',
    localDevCta: 'Open local NetProbe tools',
    publicCta: 'Open public placeholder',
    relatedTitle: 'Related operating notes',
  },
  'pt-br': {
    breadcrumbHome: 'Catálogo',
    freeToolsTitle: 'Escopo gratuito do MVP',
    paidBenefitsTitle: 'Valor do upgrade',
    detailsTitle: 'Detalhes do site',
    temporaryUrlLabel: 'URL pública temporária',
    categoryLabel: 'Categoria',
    statusLabel: 'Status',
    launchOrderLabel: 'Ordem de lançamento',
    methodologyTitle: 'Gate de qualidade',
    methodologyBody: 'Este site com nome de trabalho não deve ser tratado como pronto para AdSense até ferramentas, conteúdo original, páginas legais, monitoramento, backup e rollback passarem pelo gate documentado.',
    backToCatalog: 'Voltar ao catálogo',
    localDevCta: 'Abrir NetProbe local',
    publicCta: 'Abrir placeholder público',
    relatedTitle: 'Notas operacionais relacionadas',
  },
  es: {
    breadcrumbHome: 'Catálogo',
    freeToolsTitle: 'Alcance gratuito del MVP',
    paidBenefitsTitle: 'Valor del upgrade',
    detailsTitle: 'Detalles del sitio',
    temporaryUrlLabel: 'URL pública temporal',
    categoryLabel: 'Categoría',
    statusLabel: 'Estado',
    launchOrderLabel: 'Orden de lanzamiento',
    methodologyTitle: 'Gate de calidad',
    methodologyBody: 'Este sitio con nombre de trabajo no debe considerarse listo para AdSense hasta que herramientas, contenido original, páginas legales, monitoreo, backup y rollback pasen el gate documentado.',
    backToCatalog: 'Volver al catálogo',
    localDevCta: 'Abrir NetProbe local',
    publicCta: 'Abrir placeholder público',
    relatedTitle: 'Notas operativas relacionadas',
  },
  fr: {
    breadcrumbHome: 'Catalogue',
    freeToolsTitle: 'Portée gratuite du MVP',
    paidBenefitsTitle: 'Valeur payante',
    detailsTitle: 'Détails du site',
    temporaryUrlLabel: 'URL publique temporaire',
    categoryLabel: 'Catégorie',
    statusLabel: 'Statut',
    launchOrderLabel: 'Ordre de lancement',
    methodologyTitle: 'Gate qualité',
    methodologyBody: 'Ce site au nom de travail ne doit pas être considéré prêt pour AdSense avant que outils, contenu original, pages légales, surveillance, backup et rollback passent le gate documenté.',
    backToCatalog: 'Retour au catalogue',
    localDevCta: 'Ouvrir NetProbe local',
    publicCta: 'Ouvrir le placeholder public',
    relatedTitle: 'Notes opérationnelles liées',
  },
  de: {
    breadcrumbHome: 'Katalog',
    freeToolsTitle: 'Kostenloser MVP-Umfang',
    paidBenefitsTitle: 'Upgrade-Nutzen',
    detailsTitle: 'Site-Details',
    temporaryUrlLabel: 'Temporäre öffentliche URL',
    categoryLabel: 'Kategorie',
    statusLabel: 'Status',
    launchOrderLabel: 'Startreihenfolge',
    methodologyTitle: 'Quality Gate',
    methodologyBody: 'Diese Working-Name-Site gilt erst als AdSense-bereit, wenn Tools, Originalinhalte, Rechtstexte, Monitoring, Backup und Rollback das dokumentierte Launch-Gate bestehen.',
    backToCatalog: 'Zurück zum Katalog',
    localDevCta: 'Lokales NetProbe öffnen',
    publicCta: 'Öffentlichen Platzhalter öffnen',
    relatedTitle: 'Verwandte Betriebsnotizen',
  },
}
