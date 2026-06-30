import { sanitizePublicCopy, type LocaleCode } from './locales'

export interface HomeCopy {
  eyebrow: string
  title: string
  lead: string
  launchDeskTitle: string
  launchDeskBody: string
  featuredToolsTitle: string
  previewTitle: string
  popularToolsTitle: string
  popularToolsBody: string
  popularToolsCta: string
  clustersTitle: string
  clusterCtaLabel: string
  liveEvidenceTitle: string
  liveEvidenceBody: string
  featuredTools: Array<{ siteSlug: string; label: string; body: string }>
  popularTools: Array<{ siteSlug: string; label: string; body: string; path: string }>
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
  supportEyebrow: string
  supportTitle: string
  supportBody: string
  supportActions: string[]
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

export interface NetProbeCatalogToolLink {
  label: string
  body: string
  path: string
  glyph: string
}

export interface NetProbeCatalogFooterGroup {
  title: string
  links: Array<{ label: string; path: string }>
}

export interface NetProbeCatalogCopy {
  eyebrow: string
  title: string
  lead: string
  primaryCta: string
  secondaryCta: string
  startTitle: string
  startBody: string
  toolsTitle: string
  toolsBody: string
  toolCta: string
  levelsTitle: string
  levels: Array<{ title: string; body: string }>
  footerTitle: string
  footerBody: string
  toolLinks: NetProbeCatalogToolLink[]
  footerGroups: NetProbeCatalogFooterGroup[]
}

export type CalcHarborCatalogCategoryKey = 'finance' | 'business' | 'pricing' | 'planning'

export interface CalcHarborCatalogCalculatorLink {
  label: string
  body: string
  path: string
  glyph: string
  category: CalcHarborCatalogCategoryKey
  featured: boolean
}

export interface CalcHarborCatalogFooterGroup {
  title: string
  links: Array<{ label: string; path: string }>
}

export interface CalcHarborCatalogCopy {
  eyebrow: string
  title: string
  lead: string
  primaryCta: string
  secondaryCta: string
  finderTitle: string
  finderBody: string
  searchLabel: string
  searchPlaceholder: string
  allCategories: string
  noResultsTitle: string
  noResultsBody: string
  popularTitle: string
  popularBody: string
  allTitle: string
  allBody: string
  futureTitle: string
  futureBody: string
  toolCta: string
  categories: Array<{ key: CalcHarborCatalogCategoryKey; label: string }>
  calculators: CalcHarborCatalogCalculatorLink[]
  futureTopics: Array<{ title: string; body: string }>
  footerGroups: CalcHarborCatalogFooterGroup[]
}

export type DevUtilityCatalogCategoryKey = 'data' | 'encoding' | 'inspection' | 'text' | 'time' | 'identity' | 'security'

export interface DevUtilityCatalogToolLink {
  label: string
  body: string
  path: string
  glyph: string
  category: DevUtilityCatalogCategoryKey
  featured: boolean
}

export interface DevUtilityCatalogShortcutGroup {
  title: string
  body: string
  paths: string[]
}

export interface DevUtilityCatalogFooterGroup {
  title: string
  links: Array<{ label: string; path: string }>
}

export interface DevUtilityCatalogCopy {
  eyebrow: string
  title: string
  lead: string
  primaryCta: string
  secondaryCta: string
  finderTitle: string
  finderBody: string
  searchLabel: string
  searchPlaceholder: string
  allCategories: string
  noResultsTitle: string
  noResultsBody: string
  workbenchTitle: string
  workbenchBody: string
  allTitle: string
  allBody: string
  privacyTitle: string
  privacyBody: string
  toolCta: string
  categories: Array<{ key: DevUtilityCatalogCategoryKey; label: string }>
  tools: DevUtilityCatalogToolLink[]
  shortcutGroups: DevUtilityCatalogShortcutGroup[]
  footerGroups: DevUtilityCatalogFooterGroup[]
}

export type TimeNexusCatalogCategoryKey = 'world' | 'zones' | 'calendar' | 'calculators'

export interface TimeNexusCatalogLink {
  label: string
  body: string
  path: string
  glyph: string
  category: TimeNexusCatalogCategoryKey
  featured: boolean
}

export interface TimeNexusCatalogShortcutGroup {
  title: string
  body: string
  paths: string[]
}

export interface TimeNexusCatalogFooterGroup {
  title: string
  links: Array<{ label: string; path: string }>
}

export interface TimeNexusCatalogCopy {
  eyebrow: string
  title: string
  lead: string
  primaryCta: string
  secondaryCta: string
  clockTitle: string
  clockFallback: string
  clockDateFallback: string
  clockBody: string
  finderTitle: string
  finderBody: string
  searchLabel: string
  searchPlaceholder: string
  allCategories: string
  noResultsTitle: string
  noResultsBody: string
  browseTitle: string
  browseBody: string
  featuredTitle: string
  featuredBody: string
  allTitle: string
  allBody: string
  privacyTitle: string
  privacyBody: string
  toolCta: string
  categories: Array<{ key: TimeNexusCatalogCategoryKey; label: string }>
  links: TimeNexusCatalogLink[]
  shortcutGroups: TimeNexusCatalogShortcutGroup[]
  footerGroups: TimeNexusCatalogFooterGroup[]
}

export interface FooterCopy {
  brandBody: string
  productNavLabel: string
  legalNavLabel: string
  groups: Array<{
    title: string
    links: Array<{ label: string; siteSlug: string; path: string }>
  }>
}

export const homeCopy: Record<LocaleCode, HomeCopy> = {
  en: {
    eyebrow: 'Free web tools',
    title: 'Find the right web tool in seconds.',
    lead: 'Search practical tools for IP, DNS, PDFs, QR codes, JSON, images, invoices, time zones and website checks. Open the free workflow directly, no account required.',
    launchDeskTitle: 'Tool finder',
    launchDeskBody: 'Browse each focused site when you want a fuller workspace around one task family.',
    featuredToolsTitle: 'Network sites',
    previewTitle: 'Explore focused tool suites',
    popularToolsTitle: 'Free tools ready to use',
    popularToolsBody: 'Start with a direct tool page. The cards below filter as you type or choose a category.',
    popularToolsCta: 'Open tool',
    clustersTitle: 'Choose by workflow',
    clusterCtaLabel: 'Open cluster',
    liveEvidenceTitle: 'No account required',
    liveEvidenceBody: 'Open useful public tools before any account workflow.',
    featuredTools: [
      { siteSlug: 'netprobe-atlas', label: 'DNS and IP checks', body: 'Public DNS, IP, SSL and RDAP checks with bounded abuse controls.' },
      { siteSlug: 'calcharbor', label: 'Scenario calculators', body: 'Browser-side formulas, scenarios and explanations before signup.' },
      { siteSlug: 'devutility-lab', label: 'Local code workbench', body: 'Formatter, diff, JWT, regex and hash utilities that keep snippets local.' },
      { siteSlug: 'timenexus', label: 'World clock planner', body: 'Meeting planner and curated city groups for global scheduling.' },
    ],
    popularTools: [
      { siteSlug: 'netprobe-atlas', label: 'What is my IP', body: 'See the public IP observed by the service without signing in.', path: '/tools/what-is-my-ip' },
      { siteSlug: 'netprobe-atlas', label: 'DNS Propagation', body: 'Check DNS values and compare them with an expected answer.', path: '/tools/dns-propagation' },
      { siteSlug: 'calcharbor', label: 'Loan Payment', body: 'Estimate a payment, total interest and scenario range in the browser.', path: '/calculators/loan-payment' },
      { siteSlug: 'devutility-lab', label: 'JSON Formatter', body: 'Format, validate and inspect structured data locally.', path: '/tools/structured-data-formatter' },
      { siteSlug: 'timenexus', label: 'Time Zone Converter', body: 'Translate a meeting time across cities and zones.', path: '/tools/timezone-converter' },
      { siteSlug: 'qrroute', label: 'Static QR', body: 'Create a static QR code preview for a public-safe payload.', path: '/tools/static-qr-code' },
      { siteSlug: 'invoicecraft', label: 'Invoice Builder', body: 'Draft a basic invoice and prepare a browser-side document.', path: '/tools/invoice-builder' },
      { siteSlug: 'mailhealth', label: 'SPF Checker', body: 'Inspect a domain SPF record and understand the next fix.', path: '/tools/spf-checker' },
      { siteSlug: 'sitepulse-lab', label: 'Website Status', body: 'Check whether a site is reachable and see the first status details.', path: '/tools/status-checker' },
      { siteSlug: 'pixelbatch', label: 'Image Compressor', body: 'Compress an image locally and compare output basics.', path: '/tools/image-compressor' },
      { siteSlug: 'docshift', label: 'PDF Merge', body: 'Combine PDFs with a simple browser-first workflow.', path: '/tools/pdf-merge' },
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
    upgradeLabel: 'Advanced options',
    statusLabel: 'Status',
    toolTracksLabel: 'tool tracks',
    localesLabel: 'locales',
    gatedLabel: 'Useful free workflow',
    launchOrderLabel: 'Product family',
    networkRows: [
      { title: 'No account required', body: 'Open practical pages before any account workflow.', tone: 'green' },
      { title: 'Free answer first', body: 'Tool pages prioritize the input and result before background reading.', tone: 'green' },
      { title: 'Localized navigation', body: 'Browse the same tool families in five public languages.', tone: 'amber' },
    ],
    principlesTitle: 'Product principles',
    principles: [
      { title: 'Free must work', body: 'The basic user need is solved without mandatory signup.' },
      { title: 'Privacy by default', body: 'Browser-side processing is preferred when it reduces collection.' },
      { title: 'Respectful growth', body: 'Advanced options stay separate from the free answer and never interrupt the core workflow.' },
    ],
    supportEyebrow: 'Community support',
    supportTitle: 'Support the free network',
    supportBody: 'The best support today is practical: share useful tools, report corrections and bookmark the workflows you use most.',
    supportActions: ['Share a tool', 'Send a correction', 'Use the free workflows'],
  },
  'pt-br': {
    eyebrow: 'Ferramentas web gratuitas',
    title: 'Encontre a ferramenta certa em segundos.',
    lead: 'Busque ferramentas práticas para IP, DNS, PDFs, QR, JSON, imagens, faturas, fusos horários e status de sites. Abra o fluxo gratuito direto, sem cadastro obrigatório.',
    launchDeskTitle: 'Buscador de ferramentas',
    launchDeskBody: 'Abra cada site quando quiser um espaço focado em uma família de tarefas.',
    featuredToolsTitle: 'Sites da rede',
    previewTitle: 'Explore suítes de ferramentas',
    popularToolsTitle: 'Ferramentas gratuitas prontas para uso',
    popularToolsBody: 'Comece por uma página de ferramenta direta. Os cartões abaixo filtram enquanto você digita ou escolhe uma categoria.',
    popularToolsCta: 'Abrir ferramenta',
    clustersTitle: 'Escolha por fluxo',
    clusterCtaLabel: 'Abrir grupo',
    liveEvidenceTitle: 'Sem cadastro obrigatório',
    liveEvidenceBody: 'Abra ferramentas públicas úteis antes de qualquer fluxo de conta.',
    featuredTools: [
      { siteSlug: 'netprobe-atlas', label: 'DNS e IP', body: 'DNS, IP, SSL e RDAP públicos com controles antiabuso limitados.' },
      { siteSlug: 'calcharbor', label: 'Calculadoras de cenário', body: 'Fórmulas no navegador, cenários e explicações antes de cadastro.' },
      { siteSlug: 'devutility-lab', label: 'Workbench local de código', body: 'Formatter, diff, JWT, regex e hash mantendo trechos locais.' },
      { siteSlug: 'timenexus', label: 'Planejador mundial', body: 'Planejador de reunião e grupos de cidades para agenda global.' },
    ],
    popularTools: [
      { siteSlug: 'netprobe-atlas', label: 'Qual é meu IP', body: 'Veja o IP público observado pelo serviço sem entrar em uma conta.', path: '/tools/what-is-my-ip' },
      { siteSlug: 'netprobe-atlas', label: 'Propagação DNS', body: 'Verifique valores DNS e compare com uma resposta esperada.', path: '/tools/dns-propagation' },
      { siteSlug: 'calcharbor', label: 'Pagamento de empréstimo', body: 'Estime parcela, juros totais e faixa de cenário no navegador.', path: '/calculators/loan-payment' },
      { siteSlug: 'devutility-lab', label: 'Formatador JSON', body: 'Formate, valide e inspecione dados estruturados localmente.', path: '/tools/structured-data-formatter' },
      { siteSlug: 'timenexus', label: 'Conversor de fuso horário', body: 'Traduza um horário de reunião entre cidades e fusos.', path: '/tools/timezone-converter' },
      { siteSlug: 'qrroute', label: 'QR estático', body: 'Crie uma prévia de QR estático para um conteúdo público seguro.', path: '/tools/static-qr-code' },
      { siteSlug: 'invoicecraft', label: 'Gerador de fatura', body: 'Monte uma fatura básica e prepare um documento no navegador.', path: '/tools/invoice-builder' },
      { siteSlug: 'mailhealth', label: 'Verificador SPF', body: 'Inspecione o SPF de um domínio e entenda a próxima correção.', path: '/tools/spf-checker' },
      { siteSlug: 'sitepulse-lab', label: 'Status de site', body: 'Confira se um site responde e veja os primeiros detalhes.', path: '/tools/status-checker' },
      { siteSlug: 'pixelbatch', label: 'Compressor de imagem', body: 'Comprima uma imagem localmente e compare o resultado básico.', path: '/tools/image-compressor' },
      { siteSlug: 'docshift', label: 'Unir PDFs', body: 'Combine PDFs com um fluxo simples no navegador.', path: '/tools/pdf-merge' },
    ],
    intentClusters: [
      { title: 'Diagnosticar domínios e sites', body: 'Verifique DNS, e-mail e status web antes de configurar monitoramento.', siteSlugs: ['netprobe-atlas', 'mailhealth', 'sitepulse-lab'] },
      { title: 'Criar documentos de cliente', body: 'Monte faturas, orçamentos, recibos e PDFs com fluxos no navegador.', siteSlugs: ['invoicecraft', 'docshift'] },
      { title: 'Preparar ativos de lançamento', body: 'Gere códigos QR, otimize imagens e organize ativos de conversão.', siteSlugs: ['qrroute', 'pixelbatch'] },
      { title: 'Planejar operações', body: 'Modele números, agende entre fusos e inspecione trechos de código.', siteSlugs: ['calcharbor', 'timenexus', 'devutility-lab'] },
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
    upgradeLabel: 'Opções avançadas',
    statusLabel: 'Status',
    toolTracksLabel: 'frentes de ferramenta',
    localesLabel: 'idiomas',
    gatedLabel: 'Fluxo gratuito útil',
    launchOrderLabel: 'Família de produto',
    networkRows: [
      { title: 'Sem cadastro obrigatório', body: 'Abra páginas práticas antes de qualquer fluxo de conta.', tone: 'green' },
      { title: 'Resposta gratuita primeiro', body: 'As páginas priorizam a entrada e o resultado antes da leitura de apoio.', tone: 'green' },
      { title: 'Navegação localizada', body: 'Use as mesmas famílias de ferramentas em cinco idiomas públicos.', tone: 'amber' },
    ],
    principlesTitle: 'Princípios de produto',
    principles: [
      { title: 'O gratuito precisa funcionar', body: 'A necessidade básica é resolvida sem cadastro obrigatório.' },
      { title: 'Privacidade por padrão', body: 'Processamento no navegador é preferido quando reduz coleta.' },
      { title: 'Crescimento respeitoso', body: 'Opções avançadas ficam separadas da resposta gratuita e não interrompem o fluxo principal.' },
    ],
    supportEyebrow: 'Apoio da comunidade',
    supportTitle: 'Apoie a rede gratuita',
    supportBody: 'O melhor apoio hoje é prático: compartilhe ferramentas úteis, envie correções e salve os fluxos que você mais usa.',
    supportActions: ['Compartilhar uma ferramenta', 'Enviar uma correção', 'Usar os fluxos gratuitos'],
  },
  es: {
    eyebrow: 'Herramientas web gratuitas',
    title: 'Encuentra la herramienta correcta en segundos.',
    lead: 'Busca herramientas prácticas para IP, DNS, PDF, QR, JSON, imágenes, facturas, zonas horarias y estado de sitios. Abre el flujo gratuito directo, sin registro obligatorio.',
    launchDeskTitle: 'Buscador de herramientas',
    launchDeskBody: 'Abre cada sitio cuando quieras un espacio enfocado en una familia de tareas.',
    featuredToolsTitle: 'Sitios de la red',
    previewTitle: 'Explora suites de herramientas',
    popularToolsTitle: 'Herramientas gratuitas listas para usar',
    popularToolsBody: 'Empieza por una página de herramienta directa. Las tarjetas se filtran mientras escribes o eliges una categoría.',
    popularToolsCta: 'Abrir herramienta',
    clustersTitle: 'Elegir por flujo',
    clusterCtaLabel: 'Abrir grupo',
    liveEvidenceTitle: 'Sin registro obligatorio',
    liveEvidenceBody: 'Abre herramientas públicas útiles antes de cualquier flujo de cuenta.',
    featuredTools: [
      { siteSlug: 'netprobe-atlas', label: 'DNS e IP', body: 'DNS, IP, SSL y RDAP públicos con controles antiabuso acotados.' },
      { siteSlug: 'calcharbor', label: 'Calculadoras de escenarios', body: 'Fórmulas en navegador, escenarios y explicaciones antes del registro.' },
      { siteSlug: 'devutility-lab', label: 'Workbench local de código', body: 'Formatter, diff, JWT, regex y hash manteniendo fragmentos locales.' },
      { siteSlug: 'timenexus', label: 'Planificador mundial', body: 'Planificador de reuniones y grupos de ciudades para agenda global.' },
    ],
    popularTools: [
      { siteSlug: 'netprobe-atlas', label: 'Cuál es mi IP', body: 'Ve la IP pública observada por el servicio sin iniciar sesión.', path: '/tools/what-is-my-ip' },
      { siteSlug: 'netprobe-atlas', label: 'Propagación DNS', body: 'Revisa valores DNS y compáralos con una respuesta esperada.', path: '/tools/dns-propagation' },
      { siteSlug: 'calcharbor', label: 'Pago de préstamo', body: 'Estima cuota, interés total y rango de escenarios en el navegador.', path: '/calculators/loan-payment' },
      { siteSlug: 'devutility-lab', label: 'Formateador JSON', body: 'Formatea, valida e inspecciona datos estructurados localmente.', path: '/tools/structured-data-formatter' },
      { siteSlug: 'timenexus', label: 'Conversor de zona horaria', body: 'Convierte una reunión entre ciudades y zonas horarias.', path: '/tools/timezone-converter' },
      { siteSlug: 'qrroute', label: 'QR estático', body: 'Crea una vista previa de QR estático para un contenido público seguro.', path: '/tools/static-qr-code' },
      { siteSlug: 'invoicecraft', label: 'Generador de facturas', body: 'Prepara una factura básica y un documento en el navegador.', path: '/tools/invoice-builder' },
      { siteSlug: 'mailhealth', label: 'Verificador SPF', body: 'Inspecciona el SPF de un dominio y entiende la próxima corrección.', path: '/tools/spf-checker' },
      { siteSlug: 'sitepulse-lab', label: 'Estado del sitio', body: 'Comprueba si un sitio responde y ve los primeros detalles.', path: '/tools/status-checker' },
      { siteSlug: 'pixelbatch', label: 'Compresor de imagen', body: 'Comprime una imagen localmente y compara lo básico del resultado.', path: '/tools/image-compressor' },
      { siteSlug: 'docshift', label: 'Unir PDF', body: 'Combina PDF con un flujo simple en el navegador.', path: '/tools/pdf-merge' },
    ],
    intentClusters: [
      { title: 'Diagnosticar dominios y sitios', body: 'Revisa DNS, correo y estado web antes de configurar monitoreo.', siteSlugs: ['netprobe-atlas', 'mailhealth', 'sitepulse-lab'] },
      { title: 'Crear documentos de cliente', body: 'Crea facturas, presupuestos, recibos y PDF con flujos en el navegador.', siteSlugs: ['invoicecraft', 'docshift'] },
      { title: 'Preparar activos de lanzamiento', body: 'Genera códigos QR, optimiza imágenes y ordena activos de conversión.', siteSlugs: ['qrroute', 'pixelbatch'] },
      { title: 'Planear operaciones', body: 'Modela números, agenda entre husos e inspecciona fragmentos de código.', siteSlugs: ['calcharbor', 'timenexus', 'devutility-lab'] },
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
    upgradeLabel: 'Opciones avanzadas',
    statusLabel: 'Estado',
    toolTracksLabel: 'líneas de herramienta',
    localesLabel: 'idiomas',
    gatedLabel: 'Flujo gratuito útil',
    launchOrderLabel: 'Familia de producto',
    networkRows: [
      { title: 'Sin registro obligatorio', body: 'Abre páginas prácticas antes de cualquier flujo de cuenta.', tone: 'green' },
      { title: 'Respuesta gratuita primero', body: 'Las páginas priorizan entrada y resultado antes de la lectura de apoyo.', tone: 'green' },
      { title: 'Navegación localizada', body: 'Usa las mismas familias de herramientas en cinco idiomas públicos.', tone: 'amber' },
    ],
    principlesTitle: 'Principios de producto',
    principles: [
      { title: 'Lo gratuito debe funcionar', body: 'La necesidad básica se resuelve sin registro obligatorio.' },
      { title: 'Privacidad por defecto', body: 'El navegador se prefiere cuando reduce recolección.' },
      { title: 'Crecimiento respetuoso', body: 'Las opciones avanzadas quedan separadas de la respuesta gratuita y no interrumpen el flujo principal.' },
    ],
    supportEyebrow: 'Apoyo de la comunidad',
    supportTitle: 'Apoya la red gratuita',
    supportBody: 'El mejor apoyo hoy es práctico: comparte herramientas útiles, envía correcciones y guarda los flujos que más usas.',
    supportActions: ['Compartir una herramienta', 'Enviar una corrección', 'Usar los flujos gratuitos'],
  },
  fr: {
    eyebrow: 'Outils web gratuits',
    title: 'Trouvez le bon outil en quelques secondes.',
    lead: 'Recherchez des outils pratiques pour IP, DNS, PDF, QR, JSON, images, factures, fuseaux horaires et statut de sites. Ouvrez directement l’usage gratuit, sans compte obligatoire.',
    launchDeskTitle: 'Recherche d’outils',
    launchDeskBody: 'Ouvrez chaque site quand vous voulez un espace centré sur une famille de tâches.',
    featuredToolsTitle: 'Sites du réseau',
    previewTitle: 'Explorer les suites d’outils',
    popularToolsTitle: 'Outils gratuits prêts à utiliser',
    popularToolsBody: 'Commencez par une page d’outil directe. Les cartes ci-dessous se filtrent pendant la saisie ou le choix d’une catégorie.',
    popularToolsCta: 'Ouvrir l’outil',
    clustersTitle: 'Choisir par tâche',
    clusterCtaLabel: 'Ouvrir le groupe',
    liveEvidenceTitle: 'Sans compte obligatoire',
    liveEvidenceBody: 'Ouvrez des outils publics utiles avant tout parcours de compte.',
    featuredTools: [
      { siteSlug: 'netprobe-atlas', label: 'DNS et IP', body: 'DNS, IP, SSL et RDAP publics avec contrôles anti-abus bornés.' },
      { siteSlug: 'calcharbor', label: 'Scénarios calculés', body: 'Formules navigateur, scénarios et explications avant compte.' },
      { siteSlug: 'devutility-lab', label: 'Workbench code local', body: 'Formatter, diff, JWT, regex et hash gardant les extraits locaux.' },
      { siteSlug: 'timenexus', label: 'Planificateur mondial', body: 'Planificateur de réunion et groupes de villes pour agenda global.' },
    ],
    popularTools: [
      { siteSlug: 'netprobe-atlas', label: 'Quelle est mon IP', body: 'Voir l’IP publique observée par le service sans connexion.', path: '/tools/what-is-my-ip' },
      { siteSlug: 'netprobe-atlas', label: 'Propagation DNS', body: 'Vérifier des valeurs DNS et les comparer à une réponse attendue.', path: '/tools/dns-propagation' },
      { siteSlug: 'calcharbor', label: 'Paiement de prêt', body: 'Estimer mensualité, intérêts et scénarios dans le navigateur.', path: '/calculators/loan-payment' },
      { siteSlug: 'devutility-lab', label: 'Formateur JSON', body: 'Formater, valider et inspecter les données structurées localement.', path: '/tools/structured-data-formatter' },
      { siteSlug: 'timenexus', label: 'Convertisseur de fuseau horaire', body: 'Convertir une réunion entre villes et fuseaux horaires.', path: '/tools/timezone-converter' },
      { siteSlug: 'qrroute', label: 'QR statique', body: 'Créer un aperçu QR statique pour un contenu public sûr.', path: '/tools/static-qr-code' },
      { siteSlug: 'invoicecraft', label: 'Générateur de facture', body: 'Préparer une facture simple et un document dans le navigateur.', path: '/tools/invoice-builder' },
      { siteSlug: 'mailhealth', label: 'Vérificateur SPF', body: 'Inspecter le SPF d’un domaine et comprendre la prochaine correction.', path: '/tools/spf-checker' },
      { siteSlug: 'sitepulse-lab', label: 'Statut du site', body: 'Vérifier si un site répond et voir les premiers détails.', path: '/tools/status-checker' },
      { siteSlug: 'pixelbatch', label: 'Compresseur d’image', body: 'Compresser une image localement et comparer le résultat de base.', path: '/tools/image-compressor' },
      { siteSlug: 'docshift', label: 'Fusionner des PDF', body: 'Combinez des PDF avec un parcours simple dans le navigateur.', path: '/tools/pdf-merge' },
    ],
    intentClusters: [
      { title: 'Diagnostiquer domaines et sites', body: 'Vérifiez DNS, e-mail et statut web avant la surveillance.', siteSlugs: ['netprobe-atlas', 'mailhealth', 'sitepulse-lab'] },
      { title: 'Créer des documents client', body: 'Préparez factures, devis, reçus et PDF avec des parcours dans le navigateur.', siteSlugs: ['invoicecraft', 'docshift'] },
      { title: 'Préparer les contenus de lancement', body: 'Générez des codes QR, optimisez les images et organisez la conversion.', siteSlugs: ['qrroute', 'pixelbatch'] },
      { title: 'Planifier les opérations', body: 'Modelez les chiffres, planifiez les fuseaux et inspectez des extraits de code.', siteSlugs: ['calcharbor', 'timenexus', 'devutility-lab'] },
    ],
    searchLabel: 'Rechercher dans le catalogue',
    searchPlaceholder: 'Essayez DNS, PDF, QR, factures...',
    categoryLabel: 'Catégorie',
    allCategories: 'Toutes les catégories',
    detailCta: 'Voir la page du site',
    publicCta: 'Ouvrir le site public',
    noResultsTitle: 'Aucun site correspondant',
    noResultsBody: 'Essayez un autre mot ou une autre catégorie. Le catalogue regroupe les outils par tâche à accomplir.',
    freeLabel: 'Valeur gratuite',
    upgradeLabel: 'Options avancées',
    statusLabel: 'Statut',
    toolTracksLabel: 'pistes outil',
    localesLabel: 'langues',
    gatedLabel: 'Usage gratuit utile',
    launchOrderLabel: 'Famille de produit',
    networkRows: [
      { title: 'Sans compte obligatoire', body: 'Ouvrez des pages pratiques avant tout parcours de compte.', tone: 'green' },
      { title: 'Réponse gratuite d’abord', body: 'Les pages priorisent la saisie et le résultat avant la lecture de soutien.', tone: 'green' },
      { title: 'Navigation localisée', body: 'Utilisez les mêmes familles d’outils dans cinq langues publiques.', tone: 'amber' },
    ],
    principlesTitle: 'Principes produit',
    principles: [
      { title: 'Le gratuit doit fonctionner', body: 'Le besoin de base est résolu sans compte obligatoire.' },
      { title: 'Confidentialité par défaut', body: 'Le navigateur est préféré quand il réduit la collecte.' },
      { title: 'Croissance respectueuse', body: 'Les fonctions avancées restent séparées de la réponse gratuite et n’interrompent pas le parcours principal.' },
    ],
    supportEyebrow: 'Soutien communautaire',
    supportTitle: 'Soutenir le réseau gratuit',
    supportBody: 'Le meilleur soutien aujourd’hui est pratique : partagez les outils utiles, envoyez des corrections et gardez les parcours que vous utilisez le plus.',
    supportActions: ['Partager un outil', 'Envoyer une correction', 'Utiliser les parcours gratuits'],
  },
  de: {
    eyebrow: 'Kostenlose Web-Tools',
    title: 'Finden Sie das passende Web-Tool in Sekunden.',
    lead: 'Suchen Sie praktische Tools für IP, DNS, PDFs, QR, JSON, Bilder, Rechnungen, Zeitzonen und Website-Status. Öffnen Sie die kostenlose Aufgabe direkt, ohne Pflichtkonto.',
    launchDeskTitle: 'Tool-Suche',
    launchDeskBody: 'Öffnen Sie jede Site, wenn Sie einen fokussierten Bereich für eine Aufgabenfamilie brauchen.',
    featuredToolsTitle: 'Netzwerk-Sites',
    previewTitle: 'Fokussierte Tool-Suiten entdecken',
    popularToolsTitle: 'Kostenlose Tools zum direkten Nutzen',
    popularToolsBody: 'Starten Sie mit einer direkten Tool-Seite. Die Karten filtern sich beim Tippen oder nach Kategorie.',
    popularToolsCta: 'Tool öffnen',
    clustersTitle: 'Nach Aufgabe wählen',
    clusterCtaLabel: 'Gruppe öffnen',
    liveEvidenceTitle: 'Kein Pflichtkonto',
    liveEvidenceBody: 'Öffnen Sie nützliche öffentliche Tools vor jedem Kontoablauf.',
    featuredTools: [
      { siteSlug: 'netprobe-atlas', label: 'DNS und IP', body: 'Öffentliche DNS-, IP-, SSL- und RDAP-Prüfungen mit begrenztem Missbrauchsschutz.' },
      { siteSlug: 'calcharbor', label: 'Szenario-Rechner', body: 'Browser-Formeln, Szenarien und Erklärungen vor Registrierung.' },
      { siteSlug: 'devutility-lab', label: 'Lokaler Code-Workbench', body: 'Formatter, Diff, JWT, Regex und Hash mit lokalen Snippets.' },
      { siteSlug: 'timenexus', label: 'Weltplaner', body: 'Meeting-Planer und Stadtgruppen für globale Termine.' },
    ],
    popularTools: [
      { siteSlug: 'netprobe-atlas', label: 'Was ist meine IP', body: 'Sehen Sie die öffentliche IP, die der Dienst ohne Anmeldung beobachtet.', path: '/tools/what-is-my-ip' },
      { siteSlug: 'netprobe-atlas', label: 'DNS-Propagation', body: 'Prüfen Sie DNS-Werte und vergleichen Sie eine erwartete Antwort.', path: '/tools/dns-propagation' },
      { siteSlug: 'calcharbor', label: 'Kreditrate', body: 'Schätzen Sie Rate, Gesamtzins und Szenariobereich im Browser.', path: '/calculators/loan-payment' },
      { siteSlug: 'devutility-lab', label: 'JSON-Formatierer', body: 'Formatieren, validieren und prüfen Sie strukturierte Daten lokal.', path: '/tools/structured-data-formatter' },
      { siteSlug: 'timenexus', label: 'Zeitzonen-Konverter', body: 'Übersetzen Sie eine Meeting-Zeit zwischen Städten und Zonen.', path: '/tools/timezone-converter' },
      { siteSlug: 'qrroute', label: 'Statischer QR', body: 'Erstellen Sie eine statische QR-Ansicht für einen sicheren öffentlichen Inhalt.', path: '/tools/static-qr-code' },
      { siteSlug: 'invoicecraft', label: 'Rechnungsgenerator', body: 'Erstellen Sie eine einfache Rechnung und ein Browser-Dokument.', path: '/tools/invoice-builder' },
      { siteSlug: 'mailhealth', label: 'SPF-Prüfer', body: 'Prüfen Sie den SPF einer Domain und verstehen Sie den nächsten Fix.', path: '/tools/spf-checker' },
      { siteSlug: 'sitepulse-lab', label: 'Website-Status', body: 'Prüfen Sie, ob eine Website antwortet, und sehen Sie erste Details.', path: '/tools/status-checker' },
      { siteSlug: 'pixelbatch', label: 'Bildkompressor', body: 'Komprimieren Sie ein Bild lokal und vergleichen Sie die Basisdaten.', path: '/tools/image-compressor' },
      { siteSlug: 'docshift', label: 'PDF zusammenführen', body: 'Kombinieren Sie PDFs mit einem einfachen Ablauf im Browser.', path: '/tools/pdf-merge' },
    ],
    intentClusters: [
      { title: 'Domains und Sites diagnostizieren', body: 'Prüfen Sie DNS, E-Mail und Webstatus vor Monitoring.', siteSlugs: ['netprobe-atlas', 'mailhealth', 'sitepulse-lab'] },
      { title: 'Kundendokumente erstellen', body: 'Erstellen Sie Rechnungen, Angebote, Belege und PDF-Abläufe im Browser.', siteSlugs: ['invoicecraft', 'docshift'] },
      { title: 'Startmaterial vorbereiten', body: 'Erzeugen Sie QR-Codes, optimieren Sie Bilder und ordnen Sie Conversion-Material.', siteSlugs: ['qrroute', 'pixelbatch'] },
      { title: 'Abläufe planen', body: 'Modellieren Sie Zahlen, planen Sie Zeitzonen und prüfen Sie Code-Auszüge.', siteSlugs: ['calcharbor', 'timenexus', 'devutility-lab'] },
    ],
    searchLabel: 'Katalog durchsuchen',
    searchPlaceholder: 'DNS, PDF, QR, Rechnungen...',
    categoryLabel: 'Kategorie',
    allCategories: 'Alle Kategorien',
    detailCta: 'Site-Seite öffnen',
    publicCta: 'Öffentliche Site öffnen',
    noResultsTitle: 'Keine passende Site gefunden',
    noResultsBody: 'Versuchen Sie ein anderes Wort oder eine andere Kategorie. Der Katalog gruppiert Tools nach der Aufgabe, die sie erledigen helfen.',
    freeLabel: 'Kostenloser Nutzen',
    upgradeLabel: 'Erweiterte Optionen',
    statusLabel: 'Status',
    toolTracksLabel: 'Tool-Bereiche',
    localesLabel: 'Sprachen',
    gatedLabel: 'Nützliche kostenlose Aufgabe',
    launchOrderLabel: 'Produktfamilie',
    networkRows: [
      { title: 'Kein Pflichtkonto', body: 'Öffnen Sie praktische Seiten vor jedem Kontoablauf.', tone: 'green' },
      { title: 'Kostenlose Antwort zuerst', body: 'Die Seiten priorisieren Eingabe und Ergebnis vor Hintergrundtext.', tone: 'green' },
      { title: 'Lokalisierte Navigation', body: 'Nutzen Sie dieselben Tool-Familien in fünf öffentlichen Sprachen.', tone: 'amber' },
    ],
    principlesTitle: 'Produktprinzipien',
    principles: [
      { title: 'Kostenlos muss funktionieren', body: 'Das Grundbedürfnis wird ohne Pflichtkonto gelöst.' },
      { title: 'Datenschutz als Standard', body: 'Browser-Verarbeitung wird bevorzugt, wenn sie Datenerhebung reduziert.' },
      { title: 'Respektvolles Wachstum', body: 'Erweiterte Funktionen bleiben von der kostenlosen Antwort getrennt und unterbrechen den Kernablauf nicht.' },
    ],
    supportEyebrow: 'Community-Unterstützung',
    supportTitle: 'Das kostenlose Netzwerk unterstützen',
    supportBody: 'Die beste Unterstützung ist heute praktisch: Teilen Sie nützliche Tools, senden Sie Korrekturen und speichern Sie die Abläufe, die Sie am häufigsten verwenden.',
    supportActions: ['Tool teilen', 'Korrektur senden', 'Kostenlose Abläufe nutzen'],
  },
}

export const netProbeCatalogCopy: Record<LocaleCode, NetProbeCatalogCopy> = {
  en: {
    eyebrow: 'Network, DNS and IP tools',
    title: 'Network diagnostics you can start now.',
    lead: 'Open a public IP, DNS, domain, SSL, port or reachability check directly. Each free tool gives the first answer without account signup.',
    primaryCta: 'Check my IP',
    secondaryCta: 'Check DNS propagation',
    startTitle: 'Start a network check',
    startBody: 'Choose the question you need answered and go straight to the matching tool.',
    toolsTitle: 'NetProbe tools',
    toolsBody: 'Use these public checks for one-time troubleshooting, DNS changes, domain facts and TLS checks.',
    toolCta: 'Open tool',
    levelsTitle: 'Use the result at the right depth',
    levels: [
      { title: 'For everyone', body: 'Confirm the public address, domain answer or certificate state in plain language before changing settings.' },
      { title: 'For technical teams', body: 'Inspect DNS records, RDAP details, TLS facts, open ports and reachability signals with focused outputs.' },
      { title: 'For ongoing monitoring', body: 'Use the same checks as the basis for alert rules, history and API workflows when repeated evidence matters.' },
    ],
    footerTitle: 'Explore DNS, IP and domain references',
    footerBody: 'Deep links keep related checks close without sending you back to a generic catalog.',
    toolLinks: [
      { label: 'What is my IP', body: 'See the public address this service observes from your browser.', path: '/tools/what-is-my-ip', glyph: 'IP' },
      { label: 'DNS Propagation', body: 'Compare DNS answers for a domain and expected value.', path: '/tools/dns-propagation', glyph: 'DNS' },
      { label: 'DNS Lookup', body: 'Read A, AAAA, CNAME, MX, NS, TXT and other records.', path: '/tools/dns-lookup', glyph: 'REC' },
      { label: 'RDAP Domain Lookup', body: 'Inspect public registration facts for a domain.', path: '/tools/rdap-domain-lookup', glyph: 'RDAP' },
      { label: 'SSL Certificate Checker', body: 'Check certificate issuer, validity window and domain fit.', path: '/tools/ssl-certificate-checker', glyph: 'SSL' },
      { label: 'Port Checker', body: 'Test whether a public TCP port responds from the service.', path: '/tools/port-checker', glyph: 'PORT' },
      { label: 'Ping and Traceroute', body: 'Check basic reachability and path evidence for a host.', path: '/tools/ping-traceroute', glyph: 'PING' },
    ],
    footerGroups: [
      {
        title: 'DNS Tools',
        links: [
          { label: 'DNS Propagation', path: '/tools/dns-propagation' },
          { label: 'DNS Lookup', path: '/tools/dns-lookup' },
          { label: 'A and AAAA Lookup', path: '/tools/dns-lookup' },
          { label: 'MX and TXT Lookup', path: '/tools/dns-lookup' },
        ],
      },
      {
        title: 'IP Tools',
        links: [
          { label: 'What is my IP', path: '/tools/what-is-my-ip' },
          { label: 'Public IP Check', path: '/tools/what-is-my-ip' },
          { label: 'Reachability Check', path: '/tools/ping-traceroute' },
          { label: 'Port Checker', path: '/tools/port-checker' },
        ],
      },
      {
        title: 'Domain Tools',
        links: [
          { label: 'RDAP Domain Lookup', path: '/tools/rdap-domain-lookup' },
          { label: 'Domain Registration Facts', path: '/tools/rdap-domain-lookup' },
          { label: 'Nameserver Check', path: '/tools/dns-lookup' },
          { label: 'DNS Propagation', path: '/tools/dns-propagation' },
        ],
      },
      {
        title: 'SSL Tools',
        links: [
          { label: 'SSL Certificate Checker', path: '/tools/ssl-certificate-checker' },
          { label: 'TLS Certificate Facts', path: '/tools/ssl-certificate-checker' },
          { label: 'HTTPS Port Check', path: '/tools/port-checker' },
          { label: 'Domain to Certificate Check', path: '/tools/ssl-certificate-checker' },
        ],
      },
      {
        title: 'Guides',
        links: [
          { label: 'DNS TTL Basics', path: '/tools/dns-propagation' },
          { label: 'DNS Records Explained', path: '/tools/dns-lookup' },
          { label: 'Public IP Privacy', path: '/tools/what-is-my-ip' },
          { label: 'Safe Port Testing', path: '/tools/port-checker' },
        ],
      },
    ],
  },
  'pt-br': {
    eyebrow: 'Ferramentas de rede, DNS e IP',
    title: 'Diagnósticos de rede para começar agora.',
    lead: 'Abra direto uma consulta de IP público, DNS, domínio, SSL, porta ou alcance. Cada ferramenta gratuita entrega a primeira resposta sem cadastro.',
    primaryCta: 'Ver meu IP',
    secondaryCta: 'Ver propagação DNS',
    startTitle: 'Comece uma verificação de rede',
    startBody: 'Escolha a pergunta que precisa responder e vá direto para a ferramenta certa.',
    toolsTitle: 'Ferramentas NetProbe',
    toolsBody: 'Use estas consultas públicas para investigação pontual, mudanças de DNS, dados de domínio e checagens TLS.',
    toolCta: 'Abrir ferramenta',
    levelsTitle: 'Use o resultado no nível certo',
    levels: [
      { title: 'Para qualquer pessoa', body: 'Confirme o IP público, a resposta do domínio ou o estado do certificado em linguagem direta antes de mudar configurações.' },
      { title: 'Para equipes técnicas', body: 'Inspecione registros DNS, dados RDAP, fatos TLS, portas abertas e sinais de alcance com saídas focadas.' },
      { title: 'Para monitoramento contínuo', body: 'Use as mesmas checagens como base para alertas, histórico e fluxos de API quando evidência recorrente for necessária.' },
    ],
    footerTitle: 'Explore referências de DNS, IP e domínio',
    footerBody: 'Links profundos deixam consultas relacionadas próximas sem voltar para um catálogo genérico.',
    toolLinks: [
      { label: 'Qual é meu IP', body: 'Veja o endereço público observado por este serviço a partir do navegador.', path: '/tools/what-is-my-ip', glyph: 'IP' },
      { label: 'Propagação DNS', body: 'Compare respostas DNS de um domínio com um valor esperado.', path: '/tools/dns-propagation', glyph: 'DNS' },
      { label: 'Consulta DNS', body: 'Leia registros A, AAAA, CNAME, MX, NS, TXT e outros.', path: '/tools/dns-lookup', glyph: 'REG' },
      { label: 'Consulta RDAP de domínio', body: 'Inspecione dados públicos de registro de um domínio.', path: '/tools/rdap-domain-lookup', glyph: 'RDAP' },
      { label: 'Verificador de certificado SSL', body: 'Confira emissor, validade e compatibilidade do certificado.', path: '/tools/ssl-certificate-checker', glyph: 'SSL' },
      { label: 'Teste de porta', body: 'Teste se uma porta TCP pública responde a partir do serviço.', path: '/tools/port-checker', glyph: 'PORT' },
      { label: 'Ping e Traceroute', body: 'Cheque alcance básico e evidências de rota para um host.', path: '/tools/ping-traceroute', glyph: 'PING' },
    ],
    footerGroups: [
      {
        title: 'Ferramentas DNS',
        links: [
          { label: 'Propagação DNS', path: '/tools/dns-propagation' },
          { label: 'Consulta DNS', path: '/tools/dns-lookup' },
          { label: 'Consulta A e AAAA', path: '/tools/dns-lookup' },
          { label: 'Consulta MX e TXT', path: '/tools/dns-lookup' },
        ],
      },
      {
        title: 'Ferramentas IP',
        links: [
          { label: 'Qual é meu IP', path: '/tools/what-is-my-ip' },
          { label: 'Consulta de IP público', path: '/tools/what-is-my-ip' },
          { label: 'Teste de alcance', path: '/tools/ping-traceroute' },
          { label: 'Teste de porta', path: '/tools/port-checker' },
        ],
      },
      {
        title: 'Ferramentas de domínio',
        links: [
          { label: 'Consulta RDAP de domínio', path: '/tools/rdap-domain-lookup' },
          { label: 'Dados de registro do domínio', path: '/tools/rdap-domain-lookup' },
          { label: 'Checagem de nameserver', path: '/tools/dns-lookup' },
          { label: 'Propagação DNS', path: '/tools/dns-propagation' },
        ],
      },
      {
        title: 'Ferramentas SSL',
        links: [
          { label: 'Verificador de certificado SSL', path: '/tools/ssl-certificate-checker' },
          { label: 'Dados de certificado TLS', path: '/tools/ssl-certificate-checker' },
          { label: 'Teste de porta HTTPS', path: '/tools/port-checker' },
          { label: 'Domínio e certificado', path: '/tools/ssl-certificate-checker' },
        ],
      },
      {
        title: 'Guias',
        links: [
          { label: 'Noções de TTL DNS', path: '/tools/dns-propagation' },
          { label: 'Registros DNS explicados', path: '/tools/dns-lookup' },
          { label: 'Privacidade do IP público', path: '/tools/what-is-my-ip' },
          { label: 'Teste seguro de portas', path: '/tools/port-checker' },
        ],
      },
    ],
  },
  es: {
    eyebrow: 'Herramientas de red, DNS e IP',
    title: 'Diagnósticos de red para empezar ahora.',
    lead: 'Abre directamente una consulta de IP pública, DNS, dominio, SSL, puerto o alcance. Cada herramienta gratuita entrega la primera respuesta sin registro.',
    primaryCta: 'Ver mi IP',
    secondaryCta: 'Ver propagación DNS',
    startTitle: 'Empieza una revisión de red',
    startBody: 'Elige la pregunta que necesitas responder y entra directo a la herramienta correcta.',
    toolsTitle: 'Herramientas NetProbe',
    toolsBody: 'Usa estas consultas públicas para resolución puntual, cambios DNS, datos de dominio y revisiones TLS.',
    toolCta: 'Abrir herramienta',
    levelsTitle: 'Usa el resultado en el nivel correcto',
    levels: [
      { title: 'Para todos', body: 'Confirma la IP pública, la respuesta del dominio o el estado del certificado en lenguaje claro antes de cambiar ajustes.' },
      { title: 'Para equipos técnicos', body: 'Inspecciona registros DNS, datos RDAP, hechos TLS, puertos abiertos y señales de alcance con salidas enfocadas.' },
      { title: 'Para monitoreo continuo', body: 'Usa las mismas revisiones como base para alertas, historial y flujos de API cuando importe la evidencia repetida.' },
    ],
    footerTitle: 'Explora referencias de DNS, IP y dominio',
    footerBody: 'Los enlaces profundos mantienen cerca las revisiones relacionadas sin volver a un catálogo genérico.',
    toolLinks: [
      { label: 'Cuál es mi IP', body: 'Ve la dirección pública observada por este servicio desde el navegador.', path: '/tools/what-is-my-ip', glyph: 'IP' },
      { label: 'Propagación DNS', body: 'Compara respuestas DNS de un dominio con un valor esperado.', path: '/tools/dns-propagation', glyph: 'DNS' },
      { label: 'Consulta DNS', body: 'Lee registros A, AAAA, CNAME, MX, NS, TXT y otros.', path: '/tools/dns-lookup', glyph: 'REG' },
      { label: 'Consulta RDAP de dominio', body: 'Inspecciona datos públicos de registro de un dominio.', path: '/tools/rdap-domain-lookup', glyph: 'RDAP' },
      { label: 'Verificador de certificado SSL', body: 'Revisa emisor, vigencia y compatibilidad del certificado.', path: '/tools/ssl-certificate-checker', glyph: 'SSL' },
      { label: 'Prueba de puerto', body: 'Comprueba si un puerto TCP público responde desde el servicio.', path: '/tools/port-checker', glyph: 'PORT' },
      { label: 'Ping y Traceroute', body: 'Revisa alcance básico y evidencia de ruta para un host.', path: '/tools/ping-traceroute', glyph: 'PING' },
    ],
    footerGroups: [
      {
        title: 'Herramientas DNS',
        links: [
          { label: 'Propagación DNS', path: '/tools/dns-propagation' },
          { label: 'Consulta DNS', path: '/tools/dns-lookup' },
          { label: 'Consulta A y AAAA', path: '/tools/dns-lookup' },
          { label: 'Consulta MX y TXT', path: '/tools/dns-lookup' },
        ],
      },
      {
        title: 'Herramientas IP',
        links: [
          { label: 'Cuál es mi IP', path: '/tools/what-is-my-ip' },
          { label: 'Consulta de IP pública', path: '/tools/what-is-my-ip' },
          { label: 'Prueba de alcance', path: '/tools/ping-traceroute' },
          { label: 'Prueba de puerto', path: '/tools/port-checker' },
        ],
      },
      {
        title: 'Herramientas de dominio',
        links: [
          { label: 'Consulta RDAP de dominio', path: '/tools/rdap-domain-lookup' },
          { label: 'Datos de registro del dominio', path: '/tools/rdap-domain-lookup' },
          { label: 'Revisión de nameserver', path: '/tools/dns-lookup' },
          { label: 'Propagación DNS', path: '/tools/dns-propagation' },
        ],
      },
      {
        title: 'Herramientas SSL',
        links: [
          { label: 'Verificador de certificado SSL', path: '/tools/ssl-certificate-checker' },
          { label: 'Datos de certificado TLS', path: '/tools/ssl-certificate-checker' },
          { label: 'Prueba de puerto HTTPS', path: '/tools/port-checker' },
          { label: 'Dominio y certificado', path: '/tools/ssl-certificate-checker' },
        ],
      },
      {
        title: 'Guías',
        links: [
          { label: 'Conceptos de TTL DNS', path: '/tools/dns-propagation' },
          { label: 'Registros DNS explicados', path: '/tools/dns-lookup' },
          { label: 'Privacidad de IP pública', path: '/tools/what-is-my-ip' },
          { label: 'Prueba segura de puertos', path: '/tools/port-checker' },
        ],
      },
    ],
  },
  fr: {
    eyebrow: 'Outils réseau, DNS et IP',
    title: 'Diagnostics réseau à lancer maintenant.',
    lead: 'Ouvrez directement une vérification IP publique, DNS, domaine, SSL, port ou joignabilité. Chaque outil gratuit donne une première réponse sans compte.',
    primaryCta: 'Vérifier mon IP',
    secondaryCta: 'Vérifier la propagation DNS',
    startTitle: 'Lancer une vérification réseau',
    startBody: 'Choisissez la question à résoudre et ouvrez directement l’outil adapté.',
    toolsTitle: 'Outils NetProbe',
    toolsBody: 'Utilisez ces vérifications publiques pour dépanner ponctuellement, suivre un changement DNS, lire un domaine ou contrôler TLS.',
    toolCta: 'Ouvrir l’outil',
    levelsTitle: 'Utilisez le résultat au bon niveau',
    levels: [
      { title: 'Pour tout le monde', body: 'Confirmez l’adresse IP publique, la réponse du domaine ou l’état du certificat en langage clair avant de modifier des réglages.' },
      { title: 'Pour les équipes techniques', body: 'Inspectez les enregistrements DNS, les données RDAP, les faits TLS, les ports ouverts et la joignabilité avec des sorties ciblées.' },
      { title: 'Pour le suivi continu', body: 'Utilisez les mêmes vérifications comme base d’alertes, d’historique et de flux API lorsque des preuves répétées comptent.' },
    ],
    footerTitle: 'Explorer les références DNS, IP et domaine',
    footerBody: 'Les liens profonds gardent les vérifications liées à portée sans retour à un catalogue générique.',
    toolLinks: [
      { label: 'Quelle est mon IP', body: 'Voyez l’adresse publique observée par ce service depuis votre navigateur.', path: '/tools/what-is-my-ip', glyph: 'IP' },
      { label: 'Propagation DNS', body: 'Comparez les réponses DNS d’un domaine avec une valeur attendue.', path: '/tools/dns-propagation', glyph: 'DNS' },
      { label: 'Recherche DNS', body: 'Lisez les enregistrements A, AAAA, CNAME, MX, NS, TXT et autres.', path: '/tools/dns-lookup', glyph: 'REC' },
      { label: 'Recherche RDAP de domaine', body: 'Inspectez les données publiques d’enregistrement d’un domaine.', path: '/tools/rdap-domain-lookup', glyph: 'RDAP' },
      { label: 'Vérificateur de certificat SSL', body: 'Contrôlez l’émetteur, la période de validité et le domaine du certificat.', path: '/tools/ssl-certificate-checker', glyph: 'SSL' },
      { label: 'Test de port', body: 'Testez si un port TCP public répond depuis le service.', path: '/tools/port-checker', glyph: 'PORT' },
      { label: 'Ping et Traceroute', body: 'Vérifiez la joignabilité de base et les preuves de route d’un hôte.', path: '/tools/ping-traceroute', glyph: 'PING' },
    ],
    footerGroups: [
      {
        title: 'Outils DNS',
        links: [
          { label: 'Propagation DNS', path: '/tools/dns-propagation' },
          { label: 'Recherche DNS', path: '/tools/dns-lookup' },
          { label: 'Recherche A et AAAA', path: '/tools/dns-lookup' },
          { label: 'Recherche MX et TXT', path: '/tools/dns-lookup' },
        ],
      },
      {
        title: 'Outils IP',
        links: [
          { label: 'Quelle est mon IP', path: '/tools/what-is-my-ip' },
          { label: 'Vérification IP publique', path: '/tools/what-is-my-ip' },
          { label: 'Test de joignabilité', path: '/tools/ping-traceroute' },
          { label: 'Test de port', path: '/tools/port-checker' },
        ],
      },
      {
        title: 'Outils domaine',
        links: [
          { label: 'Recherche RDAP de domaine', path: '/tools/rdap-domain-lookup' },
          { label: 'Données d’enregistrement', path: '/tools/rdap-domain-lookup' },
          { label: 'Vérification nameserver', path: '/tools/dns-lookup' },
          { label: 'Propagation DNS', path: '/tools/dns-propagation' },
        ],
      },
      {
        title: 'Outils SSL',
        links: [
          { label: 'Vérificateur de certificat SSL', path: '/tools/ssl-certificate-checker' },
          { label: 'Données de certificat TLS', path: '/tools/ssl-certificate-checker' },
          { label: 'Test de port HTTPS', path: '/tools/port-checker' },
          { label: 'Domaine et certificat', path: '/tools/ssl-certificate-checker' },
        ],
      },
      {
        title: 'Guides',
        links: [
          { label: 'Bases du TTL DNS', path: '/tools/dns-propagation' },
          { label: 'Enregistrements DNS expliqués', path: '/tools/dns-lookup' },
          { label: 'Confidentialité de l’IP publique', path: '/tools/what-is-my-ip' },
          { label: 'Test de ports sûr', path: '/tools/port-checker' },
        ],
      },
    ],
  },
  de: {
    eyebrow: 'Netzwerk-, DNS- und IP-Tools',
    title: 'Netzwerkdiagnosen, die sofort starten.',
    lead: 'Öffnen Sie direkt eine öffentliche IP-, DNS-, Domain-, SSL-, Port- oder Erreichbarkeitsprüfung. Jedes kostenlose Tool liefert die erste Antwort ohne Konto.',
    primaryCta: 'Meine IP prüfen',
    secondaryCta: 'DNS-Propagation prüfen',
    startTitle: 'Netzwerkprüfung starten',
    startBody: 'Wählen Sie die Frage aus und öffnen Sie direkt das passende Tool.',
    toolsTitle: 'NetProbe-Tools',
    toolsBody: 'Nutzen Sie diese öffentlichen Prüfungen für einzelne Analysen, DNS-Änderungen, Domain-Fakten und TLS-Kontrollen.',
    toolCta: 'Tool öffnen',
    levelsTitle: 'Ergebnis in der passenden Tiefe nutzen',
    levels: [
      { title: 'Für alle', body: 'Bestätigen Sie öffentliche IP, Domain-Antwort oder Zertifikatsstatus in klarer Sprache, bevor Sie Einstellungen ändern.' },
      { title: 'Für technische Teams', body: 'Prüfen Sie DNS-Records, RDAP-Daten, TLS-Fakten, offene Ports und Erreichbarkeit mit fokussierten Ausgaben.' },
      { title: 'Für laufende Überwachung', body: 'Nutzen Sie dieselben Prüfungen als Basis für Alerts, Historie und API-Abläufe, wenn wiederholte Nachweise wichtig sind.' },
    ],
    footerTitle: 'DNS-, IP- und Domain-Referenzen erkunden',
    footerBody: 'Direkte Links halten verwandte Prüfungen nah, ohne zurück in einen allgemeinen Katalog zu führen.',
    toolLinks: [
      { label: 'Was ist meine IP', body: 'Sehen Sie die öffentliche Adresse, die dieser Dienst aus Ihrem Browser erkennt.', path: '/tools/what-is-my-ip', glyph: 'IP' },
      { label: 'DNS-Propagation', body: 'Vergleichen Sie DNS-Antworten einer Domain mit einem erwarteten Wert.', path: '/tools/dns-propagation', glyph: 'DNS' },
      { label: 'DNS-Lookup', body: 'Lesen Sie A-, AAAA-, CNAME-, MX-, NS-, TXT- und weitere Records.', path: '/tools/dns-lookup', glyph: 'REC' },
      { label: 'RDAP-Domain-Lookup', body: 'Prüfen Sie öffentliche Registrierungsdaten einer Domain.', path: '/tools/rdap-domain-lookup', glyph: 'RDAP' },
      { label: 'SSL-Zertifikat prüfen', body: 'Kontrollieren Sie Aussteller, Gültigkeit und Domain-Bezug des Zertifikats.', path: '/tools/ssl-certificate-checker', glyph: 'SSL' },
      { label: 'Port-Checker', body: 'Testen Sie, ob ein öffentlicher TCP-Port aus Sicht des Dienstes antwortet.', path: '/tools/port-checker', glyph: 'PORT' },
      { label: 'Ping und Traceroute', body: 'Prüfen Sie grundlegende Erreichbarkeit und Routenhinweise für einen Host.', path: '/tools/ping-traceroute', glyph: 'PING' },
    ],
    footerGroups: [
      {
        title: 'DNS Tools',
        links: [
          { label: 'DNS-Propagation', path: '/tools/dns-propagation' },
          { label: 'DNS-Lookup', path: '/tools/dns-lookup' },
          { label: 'A- und AAAA-Lookup', path: '/tools/dns-lookup' },
          { label: 'MX- und TXT-Lookup', path: '/tools/dns-lookup' },
        ],
      },
      {
        title: 'IP Tools',
        links: [
          { label: 'Was ist meine IP', path: '/tools/what-is-my-ip' },
          { label: 'Öffentliche IP prüfen', path: '/tools/what-is-my-ip' },
          { label: 'Erreichbarkeit prüfen', path: '/tools/ping-traceroute' },
          { label: 'Port-Checker', path: '/tools/port-checker' },
        ],
      },
      {
        title: 'Domain Tools',
        links: [
          { label: 'RDAP-Domain-Lookup', path: '/tools/rdap-domain-lookup' },
          { label: 'Domain-Registrierungsdaten', path: '/tools/rdap-domain-lookup' },
          { label: 'Nameserver-Prüfung', path: '/tools/dns-lookup' },
          { label: 'DNS-Propagation', path: '/tools/dns-propagation' },
        ],
      },
      {
        title: 'SSL Tools',
        links: [
          { label: 'SSL-Zertifikat prüfen', path: '/tools/ssl-certificate-checker' },
          { label: 'TLS-Zertifikatdaten', path: '/tools/ssl-certificate-checker' },
          { label: 'HTTPS-Port prüfen', path: '/tools/port-checker' },
          { label: 'Domain und Zertifikat', path: '/tools/ssl-certificate-checker' },
        ],
      },
      {
        title: 'Guides',
        links: [
          { label: 'DNS-TTL Grundlagen', path: '/tools/dns-propagation' },
          { label: 'DNS-Records erklärt', path: '/tools/dns-lookup' },
          { label: 'Privatsphäre öffentlicher IPs', path: '/tools/what-is-my-ip' },
          { label: 'Sichere Porttests', path: '/tools/port-checker' },
        ],
      },
    ],
  },
}

export const calcHarborCatalogCopy: Record<LocaleCode, CalcHarborCatalogCopy> = {
  en: {
    eyebrow: 'Business and finance calculators',
    title: 'Find the right calculator before the spreadsheet.',
    lead: 'Search practical formulas for payments, margins, break-even, ROI, runway, savings and pricing. Open the free calculator that answers the first question without an account.',
    primaryCta: 'Open loan calculator',
    secondaryCta: 'Browse all calculators',
    finderTitle: 'Calculator finder',
    finderBody: 'Search by task or choose a category. The popular calculators stay visible while the full list filters below.',
    searchLabel: 'Search calculators',
    searchPlaceholder: 'Try loan, margin, ROI, break-even...',
    allCategories: 'All calculators',
    noResultsTitle: 'No matching calculator',
    noResultsBody: 'Try another keyword or category. Only calculators with tested formulas are linked here.',
    popularTitle: 'Popular business calculators',
    popularBody: 'Start with high-intent tools that show the formula, example and scenario context.',
    allTitle: 'All published calculators',
    allBody: 'Dense categories make it easy to move between finance, business, pricing and planning tasks.',
    futureTitle: 'Next calculator areas',
    futureBody: 'Topics stay here as editorial direction until formula, examples, localization and tests are complete.',
    toolCta: 'Open calculator',
    categories: [
      { key: 'finance', label: 'Finance' },
      { key: 'business', label: 'Business' },
      { key: 'pricing', label: 'Pricing' },
      { key: 'planning', label: 'Planning' },
    ],
    calculators: [
      { label: 'Loan Payment', body: 'Estimate payment, total interest and payoff range.', path: '/calculators/loan-payment', glyph: 'LOAN', category: 'finance', featured: true },
      { label: 'Compound Interest', body: 'Project balance, contributions and interest earned.', path: '/calculators/compound-interest', glyph: 'CMPD', category: 'finance', featured: false },
      { label: 'Savings Goal', body: 'Estimate time to reach a goal with contributions and growth.', path: '/calculators/savings-goal', glyph: 'SAVE', category: 'planning', featured: false },
      { label: 'Break-even Point', body: 'Find units and revenue needed to cover fixed costs.', path: '/calculators/break-even-point', glyph: 'BE', category: 'business', featured: true },
      { label: 'Gross Margin', body: 'Calculate gross profit, margin and markup from revenue and cost.', path: '/calculators/gross-margin', glyph: 'M%', category: 'business', featured: true },
      { label: 'Cash Runway', body: 'Estimate how many months cash covers net monthly burn.', path: '/calculators/cash-runway', glyph: 'RUN', category: 'planning', featured: false },
      { label: 'Discount Price', body: 'Compare final unit price, order total and savings.', path: '/calculators/discount-price', glyph: 'SALE', category: 'pricing', featured: false },
      { label: 'ROI Calculator', body: 'Calculate net return and return on investment.', path: '/calculators/roi', glyph: 'ROI', category: 'finance', featured: true },
    ],
    futureTopics: [
      { title: 'Operating ratios', body: 'Profitability, burn and efficiency topics wait for tested formulas and original explanations.' },
      { title: 'Marketing math', body: 'Campaign calculators need clear attribution limits before they become public pages.' },
      { title: 'Commerce fees', body: 'Marketplace and payment-fee topics require localized examples before linking.' },
      { title: 'Team workflows', body: 'Saved comparisons and exports remain separate from the free one-off answer.' },
    ],
    footerGroups: [
      {
        title: 'Finance calculators',
        links: [
          { label: 'Loan Payment', path: '/calculators/loan-payment' },
          { label: 'Compound Interest', path: '/calculators/compound-interest' },
          { label: 'Savings Goal', path: '/calculators/savings-goal' },
          { label: 'ROI Calculator', path: '/calculators/roi' },
        ],
      },
      {
        title: 'Business calculators',
        links: [
          { label: 'Break-even Point', path: '/calculators/break-even-point' },
          { label: 'Gross Margin', path: '/calculators/gross-margin' },
          { label: 'Cash Runway', path: '/calculators/cash-runway' },
        ],
      },
      {
        title: 'Pricing calculators',
        links: [
          { label: 'Discount Price', path: '/calculators/discount-price' },
          { label: 'Gross Margin', path: '/calculators/gross-margin' },
          { label: 'Break-even Point', path: '/calculators/break-even-point' },
        ],
      },
      {
        title: 'Planning calculators',
        links: [
          { label: 'Savings Goal', path: '/calculators/savings-goal' },
          { label: 'Cash Runway', path: '/calculators/cash-runway' },
          { label: 'Loan Payment', path: '/calculators/loan-payment' },
        ],
      },
      {
        title: 'Popular calculators',
        links: [
          { label: 'Loan Payment', path: '/calculators/loan-payment' },
          { label: 'Break-even Point', path: '/calculators/break-even-point' },
          { label: 'Gross Margin', path: '/calculators/gross-margin' },
          { label: 'ROI Calculator', path: '/calculators/roi' },
        ],
      },
    ],
  },
  'pt-br': {
    eyebrow: 'Calculadoras financeiras e empresariais',
    title: 'Encontre a calculadora certa antes da planilha.',
    lead: 'Busque fórmulas práticas para parcelas, margem, ponto de equilíbrio, ROI, runway, poupança e preços. Abra a calculadora gratuita que responde à primeira pergunta sem cadastro.',
    primaryCta: 'Abrir cálculo de empréstimo',
    secondaryCta: 'Ver todas as calculadoras',
    finderTitle: 'Buscador de calculadoras',
    finderBody: 'Busque por tarefa ou escolha uma categoria. As calculadoras populares continuam visíveis enquanto a lista completa filtra abaixo.',
    searchLabel: 'Buscar calculadoras',
    searchPlaceholder: 'Tente empréstimo, margem, ROI, equilíbrio...',
    allCategories: 'Todas as calculadoras',
    noResultsTitle: 'Nenhuma calculadora encontrada',
    noResultsBody: 'Tente outra palavra ou categoria. Só entram links para calculadoras com fórmulas testadas.',
    popularTitle: 'Calculadoras empresariais populares',
    popularBody: 'Comece por ferramentas de alta intenção com fórmula, exemplo e contexto de cenário.',
    allTitle: 'Todas as calculadoras publicadas',
    allBody: 'Categorias densas facilitam alternar entre finanças, negócios, preços e planejamento.',
    futureTitle: 'Próximas áreas de cálculo',
    futureBody: 'Tópicos ficam aqui como direção editorial até fórmula, exemplos, localização e testes estarem completos.',
    toolCta: 'Abrir calculadora',
    categories: [
      { key: 'finance', label: 'Finanças' },
      { key: 'business', label: 'Negócios' },
      { key: 'pricing', label: 'Preços' },
      { key: 'planning', label: 'Planejamento' },
    ],
    calculators: [
      { label: 'Pagamento de empréstimo', body: 'Estime parcela, juros totais e faixa de pagamento.', path: '/calculators/loan-payment', glyph: 'PARC', category: 'finance', featured: true },
      { label: 'Juros compostos', body: 'Projete saldo, aportes e juros acumulados.', path: '/calculators/compound-interest', glyph: 'JUR', category: 'finance', featured: false },
      { label: 'Meta de poupança', body: 'Estime prazo para atingir uma meta com aportes e crescimento.', path: '/calculators/savings-goal', glyph: 'META', category: 'planning', featured: false },
      { label: 'Ponto de equilíbrio', body: 'Encontre unidades e receita para cobrir custos fixos.', path: '/calculators/break-even-point', glyph: 'EQ', category: 'business', featured: true },
      { label: 'Margem bruta', body: 'Calcule lucro bruto, margem e markup por receita e custo.', path: '/calculators/gross-margin', glyph: 'M%', category: 'business', featured: true },
      { label: 'Runway de caixa', body: 'Estime por quantos meses o caixa cobre a queima líquida.', path: '/calculators/cash-runway', glyph: 'RUN', category: 'planning', featured: false },
      { label: 'Preço com desconto', body: 'Compare preço final, total do pedido e economia.', path: '/calculators/discount-price', glyph: 'DESC', category: 'pricing', featured: false },
      { label: 'Calculadora de ROI', body: 'Calcule retorno líquido e retorno sobre investimento.', path: '/calculators/roi', glyph: 'ROI', category: 'finance', featured: true },
    ],
    futureTopics: [
      { title: 'Índices operacionais', body: 'Lucratividade, burn e eficiência aguardam fórmulas testadas e explicações originais.' },
      { title: 'Matemática de marketing', body: 'Calculadoras de campanha precisam declarar limites de atribuição antes de virar página pública.' },
      { title: 'Taxas de comércio', body: 'Temas de marketplace e taxas de pagamento exigem exemplos localizados antes de links.' },
      { title: 'Fluxos de equipe', body: 'Comparações salvas e exportações ficam separadas da resposta gratuita pontual.' },
    ],
    footerGroups: [
      {
        title: 'Calculadoras financeiras',
        links: [
          { label: 'Pagamento de empréstimo', path: '/calculators/loan-payment' },
          { label: 'Juros compostos', path: '/calculators/compound-interest' },
          { label: 'Meta de poupança', path: '/calculators/savings-goal' },
          { label: 'Calculadora de ROI', path: '/calculators/roi' },
        ],
      },
      {
        title: 'Calculadoras de negócio',
        links: [
          { label: 'Ponto de equilíbrio', path: '/calculators/break-even-point' },
          { label: 'Margem bruta', path: '/calculators/gross-margin' },
          { label: 'Runway de caixa', path: '/calculators/cash-runway' },
        ],
      },
      {
        title: 'Calculadoras de preço',
        links: [
          { label: 'Preço com desconto', path: '/calculators/discount-price' },
          { label: 'Margem bruta', path: '/calculators/gross-margin' },
          { label: 'Ponto de equilíbrio', path: '/calculators/break-even-point' },
        ],
      },
      {
        title: 'Planejamento',
        links: [
          { label: 'Meta de poupança', path: '/calculators/savings-goal' },
          { label: 'Runway de caixa', path: '/calculators/cash-runway' },
          { label: 'Pagamento de empréstimo', path: '/calculators/loan-payment' },
        ],
      },
      {
        title: 'Populares',
        links: [
          { label: 'Pagamento de empréstimo', path: '/calculators/loan-payment' },
          { label: 'Ponto de equilíbrio', path: '/calculators/break-even-point' },
          { label: 'Margem bruta', path: '/calculators/gross-margin' },
          { label: 'Calculadora de ROI', path: '/calculators/roi' },
        ],
      },
    ],
  },
  es: {
    eyebrow: 'Calculadoras financieras y de negocio',
    title: 'Encuentra la calculadora correcta antes de la hoja.',
    lead: 'Busca fórmulas prácticas para pagos, margen, equilibrio, ROI, runway, ahorro y precios. Abre la calculadora gratuita que responde la primera pregunta sin registro.',
    primaryCta: 'Abrir pago de préstamo',
    secondaryCta: 'Ver todas las calculadoras',
    finderTitle: 'Buscador de calculadoras',
    finderBody: 'Busca por tarea o elige una categoría. Las calculadoras populares siguen visibles mientras la lista se filtra.',
    searchLabel: 'Buscar calculadoras',
    searchPlaceholder: 'Prueba préstamo, margen, ROI, equilibrio...',
    allCategories: 'Todas las calculadoras',
    noResultsTitle: 'No hay calculadora coincidente',
    noResultsBody: 'Prueba otra palabra o categoría. Solo se enlazan calculadoras con fórmulas probadas.',
    popularTitle: 'Calculadoras de negocio populares',
    popularBody: 'Empieza por herramientas de alta intención con fórmula, ejemplo y contexto de escenario.',
    allTitle: 'Todas las calculadoras publicadas',
    allBody: 'Categorías densas ayudan a moverse entre finanzas, negocio, precios y planificación.',
    futureTitle: 'Próximas áreas de cálculo',
    futureBody: 'Los temas quedan como dirección editorial hasta completar fórmula, ejemplos, localización y pruebas.',
    toolCta: 'Abrir calculadora',
    categories: [
      { key: 'finance', label: 'Finanzas' },
      { key: 'business', label: 'Negocio' },
      { key: 'pricing', label: 'Precios' },
      { key: 'planning', label: 'Planificación' },
    ],
    calculators: [
      { label: 'Pago de préstamo', body: 'Estima cuota, interés total y rango de pago.', path: '/calculators/loan-payment', glyph: 'PRE', category: 'finance', featured: true },
      { label: 'Interés compuesto', body: 'Proyecta saldo, aportes e interés ganado.', path: '/calculators/compound-interest', glyph: 'INT', category: 'finance', featured: false },
      { label: 'Meta de ahorro', body: 'Estima plazo para alcanzar una meta con aportes y crecimiento.', path: '/calculators/savings-goal', glyph: 'META', category: 'planning', featured: false },
      { label: 'Punto de equilibrio', body: 'Encuentra unidades e ingresos para cubrir costos fijos.', path: '/calculators/break-even-point', glyph: 'EQ', category: 'business', featured: true },
      { label: 'Margen bruto', body: 'Calcula ganancia bruta, margen y markup desde ingresos y costo.', path: '/calculators/gross-margin', glyph: 'M%', category: 'business', featured: true },
      { label: 'Runway de caja', body: 'Estima cuántos meses el efectivo cubre la quema neta.', path: '/calculators/cash-runway', glyph: 'RUN', category: 'planning', featured: false },
      { label: 'Precio con descuento', body: 'Compara precio final, total del pedido y ahorro.', path: '/calculators/discount-price', glyph: 'DESC', category: 'pricing', featured: false },
      { label: 'Calculadora ROI', body: 'Calcula retorno neto y retorno sobre inversión.', path: '/calculators/roi', glyph: 'ROI', category: 'finance', featured: true },
    ],
    futureTopics: [
      { title: 'Ratios operativos', body: 'Rentabilidad, burn y eficiencia esperan fórmulas probadas y explicaciones originales.' },
      { title: 'Matemática de marketing', body: 'Las calculadoras de campaña necesitan límites de atribución claros antes de publicarse.' },
      { title: 'Costos de comercio', body: 'Marketplace y pagos requieren ejemplos localizados antes de tener enlaces.' },
      { title: 'Flujos de equipo', body: 'Comparaciones guardadas y exportes permanecen separados de la respuesta gratuita puntual.' },
    ],
    footerGroups: [
      {
        title: 'Calculadoras financieras',
        links: [
          { label: 'Pago de préstamo', path: '/calculators/loan-payment' },
          { label: 'Interés compuesto', path: '/calculators/compound-interest' },
          { label: 'Meta de ahorro', path: '/calculators/savings-goal' },
          { label: 'Calculadora ROI', path: '/calculators/roi' },
        ],
      },
      {
        title: 'Calculadoras de negocio',
        links: [
          { label: 'Punto de equilibrio', path: '/calculators/break-even-point' },
          { label: 'Margen bruto', path: '/calculators/gross-margin' },
          { label: 'Runway de caja', path: '/calculators/cash-runway' },
        ],
      },
      {
        title: 'Calculadoras de precio',
        links: [
          { label: 'Precio con descuento', path: '/calculators/discount-price' },
          { label: 'Margen bruto', path: '/calculators/gross-margin' },
          { label: 'Punto de equilibrio', path: '/calculators/break-even-point' },
        ],
      },
      {
        title: 'Planificación',
        links: [
          { label: 'Meta de ahorro', path: '/calculators/savings-goal' },
          { label: 'Runway de caja', path: '/calculators/cash-runway' },
          { label: 'Pago de préstamo', path: '/calculators/loan-payment' },
        ],
      },
      {
        title: 'Populares',
        links: [
          { label: 'Pago de préstamo', path: '/calculators/loan-payment' },
          { label: 'Punto de equilibrio', path: '/calculators/break-even-point' },
          { label: 'Margen bruto', path: '/calculators/gross-margin' },
          { label: 'Calculadora ROI', path: '/calculators/roi' },
        ],
      },
    ],
  },
  fr: {
    eyebrow: 'Calculatrices finance et entreprise',
    title: 'Trouvez la bonne calculatrice avant la feuille de calcul.',
    lead: 'Recherchez des formules pratiques pour prêt, marge, seuil, ROI, trésorerie, épargne et prix. Ouvrez la calculatrice gratuite qui répond à la première question sans compte.',
    primaryCta: 'Ouvrir paiement de prêt',
    secondaryCta: 'Voir toutes les calculatrices',
    finderTitle: 'Recherche de calculatrices',
    finderBody: 'Cherchez par tâche ou choisissez une catégorie. Les calculatrices populaires restent visibles pendant le filtrage.',
    searchLabel: 'Rechercher',
    searchPlaceholder: 'Prêt, marge, ROI, seuil...',
    allCategories: 'Toutes les calculatrices',
    noResultsTitle: 'Aucune calculatrice trouvée',
    noResultsBody: 'Essayez un autre mot ou une autre catégorie. Seules les calculatrices avec formules testées sont liées.',
    popularTitle: 'Calculatrices business populaires',
    popularBody: 'Commencez par les outils à forte intention avec formule, exemple et contexte de scénario.',
    allTitle: 'Toutes les calculatrices publiées',
    allBody: 'Des catégories denses facilitent le passage entre finance, entreprise, prix et planification.',
    futureTitle: 'Prochaines familles de calcul',
    futureBody: 'Les sujets restent ici comme direction éditoriale jusqu’à formule, exemples, localisation et tests complets.',
    toolCta: 'Ouvrir',
    categories: [
      { key: 'finance', label: 'Finance' },
      { key: 'business', label: 'Entreprise' },
      { key: 'pricing', label: 'Prix' },
      { key: 'planning', label: 'Planification' },
    ],
    calculators: [
      { label: 'Paiement de prêt', body: 'Estimez mensualité, intérêts et plage de paiement.', path: '/calculators/loan-payment', glyph: 'PRT', category: 'finance', featured: true },
      { label: 'Intérêts composés', body: 'Projetez solde, versements et intérêts gagnés.', path: '/calculators/compound-interest', glyph: 'INT', category: 'finance', featured: false },
      { label: 'Objectif épargne', body: 'Estimez le délai pour atteindre un objectif avec versements et croissance.', path: '/calculators/savings-goal', glyph: 'OBJ', category: 'planning', featured: false },
      { label: 'Seuil de rentabilité', body: 'Trouvez unités et revenus nécessaires pour couvrir les coûts fixes.', path: '/calculators/break-even-point', glyph: 'SR', category: 'business', featured: true },
      { label: 'Marge brute', body: 'Calculez profit brut, marge et markup depuis revenus et coûts.', path: '/calculators/gross-margin', glyph: 'M%', category: 'business', featured: true },
      { label: 'Runway de trésorerie', body: 'Estimez combien de mois la trésorerie couvre le burn net.', path: '/calculators/cash-runway', glyph: 'RUN', category: 'planning', featured: false },
      { label: 'Prix remisé', body: 'Comparez prix final, total de commande et économie.', path: '/calculators/discount-price', glyph: 'REM', category: 'pricing', featured: false },
      { label: 'Calculateur ROI', body: 'Calculez retour net et retour sur investissement.', path: '/calculators/roi', glyph: 'ROI', category: 'finance', featured: true },
    ],
    futureTopics: [
      { title: 'Ratios opérationnels', body: 'Rentabilité, burn et efficacité attendent formules testées et explications originales.' },
      { title: 'Math marketing', body: 'Les calculatrices de campagne exigent des limites d’attribution claires avant publication.' },
      { title: 'Frais commerce', body: 'Marketplace et frais de paiement demandent des exemples localisés avant liens.' },
      { title: 'Flux équipe', body: 'Comparaisons sauvegardées et exports restent séparés de la réponse gratuite ponctuelle.' },
    ],
    footerGroups: [
      {
        title: 'Calculatrices finance',
        links: [
          { label: 'Paiement de prêt', path: '/calculators/loan-payment' },
          { label: 'Intérêts composés', path: '/calculators/compound-interest' },
          { label: 'Objectif épargne', path: '/calculators/savings-goal' },
          { label: 'Calculateur ROI', path: '/calculators/roi' },
        ],
      },
      {
        title: 'Calculatrices entreprise',
        links: [
          { label: 'Seuil de rentabilité', path: '/calculators/break-even-point' },
          { label: 'Marge brute', path: '/calculators/gross-margin' },
          { label: 'Runway de trésorerie', path: '/calculators/cash-runway' },
        ],
      },
      {
        title: 'Calculatrices prix',
        links: [
          { label: 'Prix remisé', path: '/calculators/discount-price' },
          { label: 'Marge brute', path: '/calculators/gross-margin' },
          { label: 'Seuil de rentabilité', path: '/calculators/break-even-point' },
        ],
      },
      {
        title: 'Planification',
        links: [
          { label: 'Objectif épargne', path: '/calculators/savings-goal' },
          { label: 'Runway de trésorerie', path: '/calculators/cash-runway' },
          { label: 'Paiement de prêt', path: '/calculators/loan-payment' },
        ],
      },
      {
        title: 'Populaires',
        links: [
          { label: 'Paiement de prêt', path: '/calculators/loan-payment' },
          { label: 'Seuil de rentabilité', path: '/calculators/break-even-point' },
          { label: 'Marge brute', path: '/calculators/gross-margin' },
          { label: 'Calculateur ROI', path: '/calculators/roi' },
        ],
      },
    ],
  },
  de: {
    eyebrow: 'Finanz- und Business-Rechner',
    title: 'Finden Sie den passenden Rechner vor der Tabelle.',
    lead: 'Suchen Sie praktische Formeln für Rate, Marge, Break-even, ROI, Runway, Sparziel und Preis. Öffnen Sie den kostenlosen Rechner ohne Pflichtkonto.',
    primaryCta: 'Kreditrate öffnen',
    secondaryCta: 'Alle Rechner ansehen',
    finderTitle: 'Rechner-Finder',
    finderBody: 'Suchen Sie nach Aufgabe oder Kategorie. Beliebte Rechner bleiben sichtbar, während die Liste filtert.',
    searchLabel: 'Rechner suchen',
    searchPlaceholder: 'Kredit, Marge, ROI, Break-even...',
    allCategories: 'Alle Rechner',
    noResultsTitle: 'Kein passender Rechner',
    noResultsBody: 'Versuchen Sie ein anderes Wort oder eine Kategorie. Verlinkt sind nur Rechner mit getesteten Formeln.',
    popularTitle: 'Beliebte Business-Rechner',
    popularBody: 'Starten Sie mit stark nachgefragten Tools mit Formel, Beispiel und Szenario-Kontext.',
    allTitle: 'Alle veröffentlichten Rechner',
    allBody: 'Dichte Kategorien erleichtern den Wechsel zwischen Finanzen, Business, Preisen und Planung.',
    futureTitle: 'Nächste Rechnerbereiche',
    futureBody: 'Themen bleiben hier redaktionelle Richtung, bis Formel, Beispiele, Lokalisierung und Tests komplett sind.',
    toolCta: 'Rechner öffnen',
    categories: [
      { key: 'finance', label: 'Finanzen' },
      { key: 'business', label: 'Business' },
      { key: 'pricing', label: 'Preise' },
      { key: 'planning', label: 'Planung' },
    ],
    calculators: [
      { label: 'Kreditrate', body: 'Schätzen Sie Rate, Gesamtzins und Zahlungsbereich.', path: '/calculators/loan-payment', glyph: 'KRD', category: 'finance', featured: true },
      { label: 'Zinseszins', body: 'Projizieren Sie Saldo, Beiträge und Zinsertrag.', path: '/calculators/compound-interest', glyph: 'ZNS', category: 'finance', featured: false },
      { label: 'Sparziel', body: 'Schätzen Sie Zeit bis zum Ziel mit Beiträgen und Wachstum.', path: '/calculators/savings-goal', glyph: 'ZIEL', category: 'planning', featured: false },
      { label: 'Break-even Point', body: 'Finden Sie Einheiten und Umsatz zur Deckung fixer Kosten.', path: '/calculators/break-even-point', glyph: 'BE', category: 'business', featured: true },
      { label: 'Bruttomarge', body: 'Berechnen Sie Bruttogewinn, Marge und Markup aus Umsatz und Kosten.', path: '/calculators/gross-margin', glyph: 'M%', category: 'business', featured: true },
      { label: 'Cash Runway', body: 'Schätzen Sie, wie viele Monate Bargeld den Netto-Burn deckt.', path: '/calculators/cash-runway', glyph: 'RUN', category: 'planning', featured: false },
      { label: 'Rabattpreis', body: 'Vergleichen Sie Endpreis, Bestellsumme und Ersparnis.', path: '/calculators/discount-price', glyph: 'RAB', category: 'pricing', featured: false },
      { label: 'ROI-Rechner', body: 'Berechnen Sie Nettoertrag und Return on Investment.', path: '/calculators/roi', glyph: 'ROI', category: 'finance', featured: true },
    ],
    futureTopics: [
      { title: 'Operative Kennzahlen', body: 'Profitabilität, Burn und Effizienz warten auf getestete Formeln und eigene Erklärungen.' },
      { title: 'Marketing-Mathematik', body: 'Kampagnenrechner brauchen klare Attributionsgrenzen, bevor sie öffentlich werden.' },
      { title: 'Commerce-Gebühren', body: 'Marketplace- und Zahlungsgebühren brauchen lokalisierte Beispiele vor Links.' },
      { title: 'Team-Abläufe', body: 'Gespeicherte Vergleiche und Exporte bleiben von der kostenlosen Einzelantwort getrennt.' },
    ],
    footerGroups: [
      {
        title: 'Finanzrechner',
        links: [
          { label: 'Kreditrate', path: '/calculators/loan-payment' },
          { label: 'Zinseszins', path: '/calculators/compound-interest' },
          { label: 'Sparziel', path: '/calculators/savings-goal' },
          { label: 'ROI-Rechner', path: '/calculators/roi' },
        ],
      },
      {
        title: 'Business-Rechner',
        links: [
          { label: 'Break-even Point', path: '/calculators/break-even-point' },
          { label: 'Bruttomarge', path: '/calculators/gross-margin' },
          { label: 'Cash Runway', path: '/calculators/cash-runway' },
        ],
      },
      {
        title: 'Preisrechner',
        links: [
          { label: 'Rabattpreis', path: '/calculators/discount-price' },
          { label: 'Bruttomarge', path: '/calculators/gross-margin' },
          { label: 'Break-even Point', path: '/calculators/break-even-point' },
        ],
      },
      {
        title: 'Planung',
        links: [
          { label: 'Sparziel', path: '/calculators/savings-goal' },
          { label: 'Cash Runway', path: '/calculators/cash-runway' },
          { label: 'Kreditrate', path: '/calculators/loan-payment' },
        ],
      },
      {
        title: 'Beliebt',
        links: [
          { label: 'Kreditrate', path: '/calculators/loan-payment' },
          { label: 'Break-even Point', path: '/calculators/break-even-point' },
          { label: 'Bruttomarge', path: '/calculators/gross-margin' },
          { label: 'ROI-Rechner', path: '/calculators/roi' },
        ],
      },
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

export const devUtilityCatalogCopy: Record<LocaleCode, DevUtilityCatalogCopy> = {
  en: {
    eyebrow: 'Local developer tools',
    title: 'Format, inspect and compare code snippets locally.',
    lead: 'Search focused browser tools for JSON, Base64, JWT, regex, diff, cron, UUID, timestamp and hashes. Open the utility you need without an account or upload step.',
    primaryCta: 'Open JSON Formatter',
    secondaryCta: 'Browse all tools',
    finderTitle: 'Developer workbench finder',
    finderBody: 'Search by task, choose a category or jump through the dense local shortcuts. Tools open on real public pages.',
    searchLabel: 'Search developer tools',
    searchPlaceholder: 'Try JSON, Base64, JWT, regex, cron...',
    allCategories: 'All developer tools',
    noResultsTitle: 'No matching tool',
    noResultsBody: 'Try another keyword or category. Only public tools that already exist are linked here.',
    workbenchTitle: 'Pinned local shortcuts',
    workbenchBody: 'Favorites and recents are presented as quick local entry points; snippets are not stored by this catalog route.',
    allTitle: 'All published developer tools',
    allBody: 'A dense tool directory helps you jump between formatting, encoding, inspection, text, time, identifiers and hashes.',
    privacyTitle: 'Privacy cue',
    privacyBody: 'Use short snippets and redact secrets. The linked free tools run in the browser and the catalog does not collect pasted content.',
    toolCta: 'Open tool',
    categories: [
      { key: 'data', label: 'Data' },
      { key: 'encoding', label: 'Encoding' },
      { key: 'inspection', label: 'Inspection' },
      { key: 'text', label: 'Text' },
      { key: 'time', label: 'Time' },
      { key: 'identity', label: 'IDs' },
      { key: 'security', label: 'Security' },
    ],
    tools: [
      { label: 'JSON Formatter', body: 'Format and inspect JSON, XML, YAML and CSV snippets.', path: '/tools/structured-data-formatter', glyph: 'JSON', category: 'data', featured: true },
      { label: 'Base64 Converter', body: 'Encode or decode UTF-8 text snippets in the browser.', path: '/tools/base64-converter', glyph: 'B64', category: 'encoding', featured: true },
      { label: 'JWT Inspector', body: 'Decode JWT header and payload without claiming signature verification.', path: '/tools/jwt-inspector', glyph: 'JWT', category: 'inspection', featured: true },
      { label: 'Regex Tester', body: 'Run JavaScript regex patterns against sample text locally.', path: '/tools/regex-tester', glyph: 'RX', category: 'text', featured: true },
      { label: 'Text Diff', body: 'Compare two text blocks and see a compact line diff.', path: '/tools/text-diff', glyph: 'DIFF', category: 'text', featured: true },
      { label: 'Cron Helper', body: 'Explain five-field cron expressions and preview UTC runs.', path: '/tools/cron-helper', glyph: 'CRON', category: 'time', featured: true },
      { label: 'UUID Generator', body: 'Generate browser-side UUID v4 values for fixtures and tests.', path: '/tools/uuid-generator', glyph: 'UUID', category: 'identity', featured: true },
      { label: 'Timestamp Converter', body: 'Convert Unix seconds, milliseconds and date strings.', path: '/tools/timestamp-converter', glyph: 'TIME', category: 'time', featured: true },
      { label: 'Hash Generator', body: 'Create SHA digests for small text snippets with Web Crypto.', path: '/tools/hash-generator', glyph: 'HASH', category: 'security', featured: true },
    ],
    shortcutGroups: [
      { title: 'Favorite formatters', body: 'High-frequency transforms for pasted data and tokens.', paths: ['/tools/structured-data-formatter', '/tools/base64-converter', '/tools/jwt-inspector', '/tools/regex-tester'] },
      { title: 'Recent session set', body: 'Quick jumps for comparison, schedules and time conversion.', paths: ['/tools/text-diff', '/tools/cron-helper', '/tools/timestamp-converter'] },
      { title: 'Identifiers and hashes', body: 'Local helpers for IDs, digests and test fixtures.', paths: ['/tools/uuid-generator', '/tools/hash-generator'] },
    ],
    footerGroups: [
      { title: 'Formatters', links: [{ label: 'JSON Formatter', path: '/tools/structured-data-formatter' }, { label: 'Text Diff', path: '/tools/text-diff' }] },
      { title: 'Encoding and tokens', links: [{ label: 'Base64 Converter', path: '/tools/base64-converter' }, { label: 'JWT Inspector', path: '/tools/jwt-inspector' }] },
      { title: 'Text testing', links: [{ label: 'Regex Tester', path: '/tools/regex-tester' }, { label: 'Text Diff', path: '/tools/text-diff' }] },
      { title: 'Time utilities', links: [{ label: 'Cron Helper', path: '/tools/cron-helper' }, { label: 'Timestamp Converter', path: '/tools/timestamp-converter' }] },
      { title: 'IDs and hashes', links: [{ label: 'UUID Generator', path: '/tools/uuid-generator' }, { label: 'Hash Generator', path: '/tools/hash-generator' }] },
    ],
  },
  'pt-br': {
    eyebrow: 'Ferramentas dev locais',
    title: 'Formate, inspecione e compare snippets localmente.',
    lead: 'Busque ferramentas de navegador para JSON, Base64, JWT, regex, diff, cron, UUID, timestamp e hashes. Abra o utilitário que precisa sem cadastro nem upload.',
    primaryCta: 'Abrir Formatador JSON',
    secondaryCta: 'Ver todas as ferramentas',
    finderTitle: 'Buscador de workbench dev',
    finderBody: 'Busque por tarefa, escolha uma categoria ou use atalhos locais densos. Os links abrem páginas públicas reais.',
    searchLabel: 'Buscar ferramentas dev',
    searchPlaceholder: 'Tente JSON, Base64, JWT, regex, cron...',
    allCategories: 'Todas as ferramentas dev',
    noResultsTitle: 'Nenhuma ferramenta encontrada',
    noResultsBody: 'Tente outra palavra ou categoria. Só entram links para ferramentas públicas existentes.',
    workbenchTitle: 'Atalhos locais fixos',
    workbenchBody: 'Favoritos e recentes aparecem como entradas rápidas locais; esta rota de catálogo não armazena snippets.',
    allTitle: 'Todas as ferramentas dev publicadas',
    allBody: 'Um diretório denso ajuda a alternar entre formatação, codificação, inspeção, texto, tempo, identificadores e hashes.',
    privacyTitle: 'Sinal de privacidade',
    privacyBody: 'Use snippets curtos e remova segredos. As ferramentas gratuitas rodam no navegador e o catálogo não coleta conteúdo colado.',
    toolCta: 'Abrir ferramenta',
    categories: [
      { key: 'data', label: 'Dados' },
      { key: 'encoding', label: 'Codificação' },
      { key: 'inspection', label: 'Inspeção' },
      { key: 'text', label: 'Texto' },
      { key: 'time', label: 'Tempo' },
      { key: 'identity', label: 'IDs' },
      { key: 'security', label: 'Segurança' },
    ],
    tools: [
      { label: 'Formatador JSON', body: 'Formate e inspecione JSON, XML, YAML e CSV.', path: '/tools/structured-data-formatter', glyph: 'JSON', category: 'data', featured: true },
      { label: 'Conversor Base64', body: 'Codifique ou decodifique texto UTF-8 no navegador.', path: '/tools/base64-converter', glyph: 'B64', category: 'encoding', featured: true },
      { label: 'Inspetor JWT', body: 'Decodifique header e payload sem prometer verificação de assinatura.', path: '/tools/jwt-inspector', glyph: 'JWT', category: 'inspection', featured: true },
      { label: 'Teste de regex', body: 'Rode padrões JavaScript contra texto de exemplo localmente.', path: '/tools/regex-tester', glyph: 'RX', category: 'text', featured: true },
      { label: 'Comparador de texto', body: 'Compare dois blocos e veja um diff compacto por linha.', path: '/tools/text-diff', glyph: 'DIFF', category: 'text', featured: true },
      { label: 'Helper de cron', body: 'Explique expressões cron de cinco campos e próximas execuções UTC.', path: '/tools/cron-helper', glyph: 'CRON', category: 'time', featured: true },
      { label: 'Gerador de UUID', body: 'Gere UUID v4 no navegador para fixtures e testes.', path: '/tools/uuid-generator', glyph: 'UUID', category: 'identity', featured: true },
      { label: 'Conversor de timestamp', body: 'Converta Unix seconds, milliseconds e datas.', path: '/tools/timestamp-converter', glyph: 'TIME', category: 'time', featured: true },
      { label: 'Gerador de hash', body: 'Crie digests SHA para textos curtos com Web Crypto.', path: '/tools/hash-generator', glyph: 'HASH', category: 'security', featured: true },
    ],
    shortcutGroups: [
      { title: 'Formatadores favoritos', body: 'Transformações frequentes para dados colados e tokens.', paths: ['/tools/structured-data-formatter', '/tools/base64-converter', '/tools/jwt-inspector', '/tools/regex-tester'] },
      { title: 'Recentes da sessão', body: 'Atalhos para comparação, agendas e conversão de tempo.', paths: ['/tools/text-diff', '/tools/cron-helper', '/tools/timestamp-converter'] },
      { title: 'Identificadores e hashes', body: 'Ajudantes locais para IDs, digests e fixtures.', paths: ['/tools/uuid-generator', '/tools/hash-generator'] },
    ],
    footerGroups: [
      { title: 'Formatadores', links: [{ label: 'Formatador JSON', path: '/tools/structured-data-formatter' }, { label: 'Comparador de texto', path: '/tools/text-diff' }] },
      { title: 'Codificação e tokens', links: [{ label: 'Conversor Base64', path: '/tools/base64-converter' }, { label: 'Inspetor JWT', path: '/tools/jwt-inspector' }] },
      { title: 'Teste de texto', links: [{ label: 'Teste de regex', path: '/tools/regex-tester' }, { label: 'Comparador de texto', path: '/tools/text-diff' }] },
      { title: 'Utilitários de tempo', links: [{ label: 'Helper de cron', path: '/tools/cron-helper' }, { label: 'Conversor de timestamp', path: '/tools/timestamp-converter' }] },
      { title: 'IDs e hashes', links: [{ label: 'Gerador de UUID', path: '/tools/uuid-generator' }, { label: 'Gerador de hash', path: '/tools/hash-generator' }] },
    ],
  },
  es: {
    eyebrow: 'Herramientas dev locales',
    title: 'Formatea, inspecciona y compara snippets localmente.',
    lead: 'Busca herramientas de navegador para JSON, Base64, JWT, regex, diff, cron, UUID, timestamp y hashes. Abre la utilidad sin registro ni upload.',
    primaryCta: 'Abrir Formateador JSON',
    secondaryCta: 'Ver todas las herramientas',
    finderTitle: 'Buscador de workbench dev',
    finderBody: 'Busca por tarea, elige categoría o usa atajos locales densos. Los enlaces abren páginas públicas reales.',
    searchLabel: 'Buscar herramientas dev',
    searchPlaceholder: 'Prueba JSON, Base64, JWT, regex, cron...',
    allCategories: 'Todas las herramientas dev',
    noResultsTitle: 'No hay herramienta coincidente',
    noResultsBody: 'Prueba otra palabra o categoría. Solo se enlazan herramientas públicas existentes.',
    workbenchTitle: 'Atajos locales fijos',
    workbenchBody: 'Favoritos y recientes aparecen como entradas rápidas locales; esta ruta de catálogo no guarda snippets.',
    allTitle: 'Todas las herramientas dev publicadas',
    allBody: 'Un directorio denso ayuda a saltar entre formato, codificación, inspección, texto, tiempo, IDs y hashes.',
    privacyTitle: 'Señal de privacidad',
    privacyBody: 'Usa snippets cortos y elimina secretos. Las herramientas gratuitas corren en el navegador y el catálogo no recopila contenido pegado.',
    toolCta: 'Abrir herramienta',
    categories: [
      { key: 'data', label: 'Datos' },
      { key: 'encoding', label: 'Codificación' },
      { key: 'inspection', label: 'Inspección' },
      { key: 'text', label: 'Texto' },
      { key: 'time', label: 'Tiempo' },
      { key: 'identity', label: 'IDs' },
      { key: 'security', label: 'Seguridad' },
    ],
    tools: [
      { label: 'Formateador JSON', body: 'Formatea e inspecciona JSON, XML, YAML y CSV.', path: '/tools/structured-data-formatter', glyph: 'JSON', category: 'data', featured: true },
      { label: 'Conversor Base64', body: 'Codifica o decodifica texto UTF-8 en el navegador.', path: '/tools/base64-converter', glyph: 'B64', category: 'encoding', featured: true },
      { label: 'Inspector JWT', body: 'Decodifica header y payload sin prometer verificación de firma.', path: '/tools/jwt-inspector', glyph: 'JWT', category: 'inspection', featured: true },
      { label: 'Probador regex', body: 'Ejecuta patrones JavaScript contra texto de ejemplo localmente.', path: '/tools/regex-tester', glyph: 'RX', category: 'text', featured: true },
      { label: 'Comparador de texto', body: 'Compara dos fragmentos y ve un diff compacto por línea.', path: '/tools/text-diff', glyph: 'DIFF', category: 'text', featured: true },
      { label: 'Ayuda cron', body: 'Explica cron de cinco campos y próximas ejecuciones UTC.', path: '/tools/cron-helper', glyph: 'CRON', category: 'time', featured: true },
      { label: 'Generador UUID', body: 'Genera UUID v4 en el navegador para fixtures y tests.', path: '/tools/uuid-generator', glyph: 'UUID', category: 'identity', featured: true },
      { label: 'Conversor timestamp', body: 'Convierte Unix seconds, milliseconds y fechas.', path: '/tools/timestamp-converter', glyph: 'TIME', category: 'time', featured: true },
      { label: 'Generador hash', body: 'Crea digests SHA para textos cortos con Web Crypto.', path: '/tools/hash-generator', glyph: 'HASH', category: 'security', featured: true },
    ],
    shortcutGroups: [
      { title: 'Formateadores favoritos', body: 'Transformaciones frecuentes para datos pegados y tokens.', paths: ['/tools/structured-data-formatter', '/tools/base64-converter', '/tools/jwt-inspector', '/tools/regex-tester'] },
      { title: 'Recientes de sesión', body: 'Atajos para comparación, agendas y conversión de tiempo.', paths: ['/tools/text-diff', '/tools/cron-helper', '/tools/timestamp-converter'] },
      { title: 'IDs y hashes', body: 'Ayudas locales para identificadores, digests y fixtures.', paths: ['/tools/uuid-generator', '/tools/hash-generator'] },
    ],
    footerGroups: [
      { title: 'Formateadores', links: [{ label: 'Formateador JSON', path: '/tools/structured-data-formatter' }, { label: 'Comparador de texto', path: '/tools/text-diff' }] },
      { title: 'Codificación y tokens', links: [{ label: 'Conversor Base64', path: '/tools/base64-converter' }, { label: 'Inspector JWT', path: '/tools/jwt-inspector' }] },
      { title: 'Pruebas de texto', links: [{ label: 'Probador regex', path: '/tools/regex-tester' }, { label: 'Comparador de texto', path: '/tools/text-diff' }] },
      { title: 'Utilidades de tiempo', links: [{ label: 'Ayuda cron', path: '/tools/cron-helper' }, { label: 'Conversor timestamp', path: '/tools/timestamp-converter' }] },
      { title: 'IDs y hashes', links: [{ label: 'Generador UUID', path: '/tools/uuid-generator' }, { label: 'Generador hash', path: '/tools/hash-generator' }] },
    ],
  },
  fr: {
    eyebrow: 'Outils dev locaux',
    title: 'Formatez, inspectez et comparez des extraits localement.',
    lead: 'Cherchez des outils navigateur pour JSON, Base64, JWT, regex, diff, cron, UUID, timestamp et hashes. Ouvrez l’utilitaire sans compte ni upload.',
    primaryCta: 'Ouvrir le formateur JSON',
    secondaryCta: 'Voir tous les outils',
    finderTitle: 'Recherche de workbench dev',
    finderBody: 'Cherchez par tâche, catégorie ou raccourcis locaux denses. Les liens ouvrent des pages publiques réelles.',
    searchLabel: 'Rechercher des outils dev',
    searchPlaceholder: 'JSON, Base64, JWT, regex, cron...',
    allCategories: 'Tous les outils dev',
    noResultsTitle: 'Aucun outil trouvé',
    noResultsBody: 'Essayez un autre mot ou une autre catégorie. Seuls les outils publics existants sont liés.',
    workbenchTitle: 'Raccourcis locaux épinglés',
    workbenchBody: 'Favoris et récents servent d’entrées rapides locales; cette route catalogue ne stocke pas les extraits.',
    allTitle: 'Tous les outils dev publiés',
    allBody: 'Un répertoire dense aide à passer entre formatage, encodage, inspection, texte, temps, IDs et hashes.',
    privacyTitle: 'Signal de confidentialité',
    privacyBody: 'Utilisez de courts extraits et masquez les secrets. Les outils gratuits tournent dans le navigateur et le catalogue ne collecte pas le contenu collé.',
    toolCta: 'Ouvrir l’outil',
    categories: [
      { key: 'data', label: 'Données' },
      { key: 'encoding', label: 'Encodage' },
      { key: 'inspection', label: 'Inspection' },
      { key: 'text', label: 'Texte' },
      { key: 'time', label: 'Temps' },
      { key: 'identity', label: 'IDs' },
      { key: 'security', label: 'Sécurité' },
    ],
    tools: [
      { label: 'Formateur JSON', body: 'Formatez et inspectez JSON, XML, YAML et CSV.', path: '/tools/structured-data-formatter', glyph: 'JSON', category: 'data', featured: true },
      { label: 'Convertisseur Base64', body: 'Encodez ou décodez du texte UTF-8 dans le navigateur.', path: '/tools/base64-converter', glyph: 'B64', category: 'encoding', featured: true },
      { label: 'Inspecteur JWT', body: 'Décodez header et payload sans promettre la vérification de signature.', path: '/tools/jwt-inspector', glyph: 'JWT', category: 'inspection', featured: true },
      { label: 'Testeur regex', body: 'Exécutez des motifs JavaScript sur un texte local.', path: '/tools/regex-tester', glyph: 'RX', category: 'text', featured: true },
      { label: 'Comparateur texte', body: 'Comparez deux blocs et voyez un diff compact par ligne.', path: '/tools/text-diff', glyph: 'DIFF', category: 'text', featured: true },
      { label: 'Assistant cron', body: 'Expliquez un cron à cinq champs et les prochaines exécutions UTC.', path: '/tools/cron-helper', glyph: 'CRON', category: 'time', featured: true },
      { label: 'Générateur UUID', body: 'Générez des UUID v4 côté navigateur pour fixtures et tests.', path: '/tools/uuid-generator', glyph: 'UUID', category: 'identity', featured: true },
      { label: 'Convertisseur timestamp', body: 'Convertissez Unix seconds, milliseconds et dates.', path: '/tools/timestamp-converter', glyph: 'TIME', category: 'time', featured: true },
      { label: 'Générateur hash', body: 'Créez des digests SHA pour courts textes avec Web Crypto.', path: '/tools/hash-generator', glyph: 'HASH', category: 'security', featured: true },
    ],
    shortcutGroups: [
      { title: 'Formateurs favoris', body: 'Transformations fréquentes pour données collées et tokens.', paths: ['/tools/structured-data-formatter', '/tools/base64-converter', '/tools/jwt-inspector', '/tools/regex-tester'] },
      { title: 'Récents de session', body: 'Raccourcis pour comparaison, calendriers et conversion de temps.', paths: ['/tools/text-diff', '/tools/cron-helper', '/tools/timestamp-converter'] },
      { title: 'IDs et hashes', body: 'Aides locales pour identifiants, digests et fixtures.', paths: ['/tools/uuid-generator', '/tools/hash-generator'] },
    ],
    footerGroups: [
      { title: 'Formateurs', links: [{ label: 'Formateur JSON', path: '/tools/structured-data-formatter' }, { label: 'Comparateur texte', path: '/tools/text-diff' }] },
      { title: 'Encodage et tokens', links: [{ label: 'Convertisseur Base64', path: '/tools/base64-converter' }, { label: 'Inspecteur JWT', path: '/tools/jwt-inspector' }] },
      { title: 'Tests texte', links: [{ label: 'Testeur regex', path: '/tools/regex-tester' }, { label: 'Comparateur texte', path: '/tools/text-diff' }] },
      { title: 'Temps', links: [{ label: 'Assistant cron', path: '/tools/cron-helper' }, { label: 'Convertisseur timestamp', path: '/tools/timestamp-converter' }] },
      { title: 'IDs et hashes', links: [{ label: 'Générateur UUID', path: '/tools/uuid-generator' }, { label: 'Générateur hash', path: '/tools/hash-generator' }] },
    ],
  },
  de: {
    eyebrow: 'Lokale Entwickler-Tools',
    title: 'Formatieren, pruefen und vergleichen Sie Snippets lokal.',
    lead: 'Suchen Sie Browser-Tools fuer JSON, Base64, JWT, Regex, Diff, Cron, UUID, Timestamp und Hashes. Oeffnen Sie das passende Tool ohne Konto oder Upload.',
    primaryCta: 'JSON-Formatter öffnen',
    secondaryCta: 'Alle Tools ansehen',
    finderTitle: 'Developer-Workbench-Finder',
    finderBody: 'Suchen Sie nach Aufgabe, Kategorie oder dichten lokalen Kurzwegen. Links fuehren zu echten oeffentlichen Seiten.',
    searchLabel: 'Developer-Tools suchen',
    searchPlaceholder: 'JSON, Base64, JWT, Regex, Cron...',
    allCategories: 'Alle Developer-Tools',
    noResultsTitle: 'Kein passendes Tool',
    noResultsBody: 'Versuchen Sie ein anderes Wort oder eine Kategorie. Verlinkt sind nur vorhandene oeffentliche Tools.',
    workbenchTitle: 'Lokale Kurzwege',
    workbenchBody: 'Favoriten und letzte Tools dienen als schnelle lokale Einstiege; diese Katalogroute speichert keine Snippets.',
    allTitle: 'Alle veroeffentlichten Developer-Tools',
    allBody: 'Ein dichtes Verzeichnis erleichtert den Wechsel zwischen Formatierung, Codierung, Pruefung, Text, Zeit, IDs und Hashes.',
    privacyTitle: 'Datenschutz-Hinweis',
    privacyBody: 'Nutzen Sie kurze Snippets und entfernen Sie Secrets. Die kostenlosen Tools laufen im Browser; der Katalog sammelt keine eingefuegten Inhalte.',
    toolCta: 'Tool oeffnen',
    categories: [
      { key: 'data', label: 'Daten' },
      { key: 'encoding', label: 'Codierung' },
      { key: 'inspection', label: 'Pruefung' },
      { key: 'text', label: 'Text' },
      { key: 'time', label: 'Zeit' },
      { key: 'identity', label: 'IDs' },
      { key: 'security', label: 'Sicherheit' },
    ],
    tools: [
      { label: 'JSON-Formatter', body: 'Formatieren und pruefen Sie JSON, XML, YAML und CSV.', path: '/tools/structured-data-formatter', glyph: 'JSON', category: 'data', featured: true },
      { label: 'Base64-Konverter', body: 'Codieren oder decodieren Sie UTF-8-Text im Browser.', path: '/tools/base64-converter', glyph: 'B64', category: 'encoding', featured: true },
      { label: 'JWT-Inspector', body: 'Decodiert Header und Payload ohne Signaturpruefung zu behaupten.', path: '/tools/jwt-inspector', glyph: 'JWT', category: 'inspection', featured: true },
      { label: 'Regex-Tester', body: 'Fuehren Sie JavaScript-Regex lokal gegen Beispieltext aus.', path: '/tools/regex-tester', glyph: 'RX', category: 'text', featured: true },
      { label: 'Textvergleich', body: 'Vergleichen Sie zwei Textbloecke als kompakten Zeilendiff.', path: '/tools/text-diff', glyph: 'DIFF', category: 'text', featured: true },
      { label: 'Cron-Helfer', body: 'Erklaert fuenfteilige Cron-Ausdruecke und naechste UTC-Laeufe.', path: '/tools/cron-helper', glyph: 'CRON', category: 'time', featured: true },
      { label: 'UUID-Generator', body: 'Erzeugt UUID v4 im Browser fuer Fixtures und Tests.', path: '/tools/uuid-generator', glyph: 'UUID', category: 'identity', featured: true },
      { label: 'Timestamp-Konverter', body: 'Konvertiert Unix seconds, milliseconds und Datumswerte.', path: '/tools/timestamp-converter', glyph: 'TIME', category: 'time', featured: true },
      { label: 'Hash-Generator', body: 'Erstellt SHA-Digests fuer kurze Texte mit Web Crypto.', path: '/tools/hash-generator', glyph: 'HASH', category: 'security', featured: true },
    ],
    shortcutGroups: [
      { title: 'Favorisierte Formatter', body: 'Haeufige Umwandlungen fuer eingefuegte Daten und Tokens.', paths: ['/tools/structured-data-formatter', '/tools/base64-converter', '/tools/jwt-inspector', '/tools/regex-tester'] },
      { title: 'Letzte Sitzung', body: 'Kurzwege fuer Vergleich, Zeitplaene und Zeitkonvertierung.', paths: ['/tools/text-diff', '/tools/cron-helper', '/tools/timestamp-converter'] },
      { title: 'IDs und Hashes', body: 'Lokale Helfer fuer Kennungen, Digests und Fixtures.', paths: ['/tools/uuid-generator', '/tools/hash-generator'] },
    ],
    footerGroups: [
      { title: 'Formatter', links: [{ label: 'JSON-Formatter', path: '/tools/structured-data-formatter' }, { label: 'Textvergleich', path: '/tools/text-diff' }] },
      { title: 'Codierung und Tokens', links: [{ label: 'Base64-Konverter', path: '/tools/base64-converter' }, { label: 'JWT-Inspector', path: '/tools/jwt-inspector' }] },
      { title: 'Texttests', links: [{ label: 'Regex-Tester', path: '/tools/regex-tester' }, { label: 'Textvergleich', path: '/tools/text-diff' }] },
      { title: 'Zeittools', links: [{ label: 'Cron-Helfer', path: '/tools/cron-helper' }, { label: 'Timestamp-Konverter', path: '/tools/timestamp-converter' }] },
      { title: 'IDs und Hashes', links: [{ label: 'UUID-Generator', path: '/tools/uuid-generator' }, { label: 'Hash-Generator', path: '/tools/hash-generator' }] },
    ],
  },
}

export const timeNexusCatalogCopy: Record<LocaleCode, TimeNexusCatalogCopy> = {
  en: {
    eyebrow: 'World clock, time zones and date tools',
    title: 'Plan time across cities, dates and calendars.',
    lead: 'See the current time automatically, jump to world clocks, convert zones, count dates and open practical calculators without an account.',
    primaryCta: 'Open time zone converter',
    secondaryCta: 'Browse all time tools',
    clockTitle: 'Current time now',
    clockFallback: 'Loading current time',
    clockDateFallback: 'Browser time',
    clockBody: 'Updates in your browser. Use the links below for curated city groups and meeting windows.',
    finderTitle: 'Time tool finder',
    finderBody: 'Search by task or choose a category. World clocks, time zones, calendars and calculators stay close together.',
    searchLabel: 'Search time tools',
    searchPlaceholder: 'Try world clock, timestamp, business days...',
    allCategories: 'All time tools',
    noResultsTitle: 'No matching time tool',
    noResultsBody: 'Try another keyword or category. Only public TimeNexus pages that already exist are linked here.',
    browseTitle: 'Browse by time task',
    browseBody: 'The directory follows the familiar world clock, time zone, calendar and calculator mental model.',
    featuredTitle: 'Start with time planning',
    featuredBody: 'High-intent pages open directly from here: current clocks, zone conversion, timestamps and date spans.',
    allTitle: 'All published TimeNexus tools',
    allBody: 'Move between current time, meeting planning, calendar math, timestamps, percentages and units.',
    privacyTitle: 'Local time inputs',
    privacyBody: 'Dates, zones, age inputs and numeric values stay in the browser. The catalog links to free pages without storing entries.',
    toolCta: 'Open tool',
    categories: [
      { key: 'world', label: 'World Clock' },
      { key: 'zones', label: 'Time Zones' },
      { key: 'calendar', label: 'Calendar' },
      { key: 'calculators', label: 'Calculators' },
    ],
    links: [
      { label: 'World Clock Americas + Europe', body: 'Compare New York, Sao Paulo, London and Berlin.', path: '/world-clock/americas-europe', glyph: 'WC', category: 'world', featured: true },
      { label: 'Global Product Team Clock', body: 'Check San Francisco, New York, London and Tokyo together.', path: '/world-clock/global-product', glyph: 'TEAM', category: 'world', featured: true },
      { label: 'Time Zone Converter', body: 'Convert one instant across IANA time zones.', path: '/tools/timezone-converter', glyph: 'TZ', category: 'zones', featured: true },
      { label: 'Timestamp Converter', body: 'Inspect Unix seconds, milliseconds, ISO, UTC and local time.', path: '/tools/timestamp-converter', glyph: 'TS', category: 'zones', featured: true },
      { label: 'Date Difference Calculator', body: 'Measure days, weeks and approximate months between dates.', path: '/tools/date-difference', glyph: 'DAYS', category: 'calendar', featured: true },
      { label: 'Business Days Calculator', body: 'Count Monday-Friday days and disclose weekend days.', path: '/tools/business-days', glyph: 'BIZ', category: 'calendar', featured: true },
      { label: 'Age Calculator', body: 'Calculate years, months, days and total days on a reference date.', path: '/tools/age-calculator', glyph: 'AGE', category: 'calendar', featured: false },
      { label: 'Percentage Calculator', body: 'Calculate percent-of, change and add-percent cases.', path: '/tools/percentage-calculator', glyph: 'PCT', category: 'calculators', featured: false },
      { label: 'Unit Converter', body: 'Convert common length, weight and temperature units locally.', path: '/tools/unit-converter', glyph: 'UNIT', category: 'calculators', featured: false },
      { label: 'Tokyo City Clock', body: 'Open a maintained city page with overlap context.', path: '/world-clock/cities/tokyo', glyph: 'TYO', category: 'world', featured: false },
    ],
    shortcutGroups: [
      { title: 'World Clock', body: 'Curated city groups for meetings across regions.', paths: ['/world-clock/americas-europe', '/world-clock/global-product', '/world-clock/apac-europe', '/world-clock/cities/tokyo'] },
      { title: 'Time Zones', body: 'Current time, UTC, timestamps and named zones.', paths: ['/tools/timezone-converter', '/tools/timestamp-converter'] },
      { title: 'Calendar', body: 'Date spans, business days and age references.', paths: ['/tools/date-difference', '/tools/business-days', '/tools/age-calculator'] },
      { title: 'Calculators', body: 'Percent and unit helpers for everyday planning.', paths: ['/tools/percentage-calculator', '/tools/unit-converter'] },
    ],
    footerGroups: [
      { title: 'World Clock', links: [{ label: 'Americas + Europe', path: '/world-clock/americas-europe' }, { label: 'Global Product Team', path: '/world-clock/global-product' }, { label: 'APAC + Europe', path: '/world-clock/apac-europe' }, { label: 'Tokyo time', path: '/world-clock/cities/tokyo' }] },
      { title: 'Time Zones', links: [{ label: 'Time Zone Converter', path: '/tools/timezone-converter' }, { label: 'Timestamp Converter', path: '/tools/timestamp-converter' }, { label: 'New York time', path: '/world-clock/cities/new-york' }, { label: 'Sao Paulo time', path: '/world-clock/cities/sao-paulo' }] },
      { title: 'Calendar', links: [{ label: 'Date Difference', path: '/tools/date-difference' }, { label: 'Business Days', path: '/tools/business-days' }, { label: 'Age Calculator', path: '/tools/age-calculator' }] },
      { title: 'Calculators', links: [{ label: 'Percentage Calculator', path: '/tools/percentage-calculator' }, { label: 'Unit Converter', path: '/tools/unit-converter' }] },
      { title: 'Meeting Planning', links: [{ label: 'London time', path: '/world-clock/cities/london' }, { label: 'Berlin time', path: '/world-clock/cities/berlin' }, { label: 'San Francisco time', path: '/world-clock/cities/san-francisco' }, { label: 'Tokyo time', path: '/world-clock/cities/tokyo' }] },
    ],
  },
  'pt-br': {
    eyebrow: 'Relogio mundial, fusos e datas',
    title: 'Planeje horarios entre cidades, datas e calendarios.',
    lead: 'Veja a hora atual automaticamente, abra relogios mundiais, converta fusos, conte datas e use calculadoras praticas sem cadastro.',
    primaryCta: 'Abrir conversor de fuso',
    secondaryCta: 'Ver ferramentas de tempo',
    clockTitle: 'Hora atual agora',
    clockFallback: 'Carregando hora atual',
    clockDateFallback: 'Hora do navegador',
    clockBody: 'Atualiza no navegador. Use os links abaixo para grupos de cidades e janelas de reuniao.',
    finderTitle: 'Buscador de tempo',
    finderBody: 'Busque por tarefa ou escolha uma categoria. Relogios, fusos, calendarios e calculadoras ficam juntos.',
    searchLabel: 'Buscar ferramentas de tempo',
    searchPlaceholder: 'Tente relogio mundial, timestamp, dias uteis...',
    allCategories: 'Todas as ferramentas de tempo',
    noResultsTitle: 'Nenhuma ferramenta encontrada',
    noResultsBody: 'Tente outra palavra ou categoria. So entram links para paginas TimeNexus publicas existentes.',
    browseTitle: 'Escolha por tarefa de tempo',
    browseBody: 'O diretorio segue o modelo conhecido de relogio mundial, fusos, calendario e calculadoras.',
    featuredTitle: 'Comece pelo planejamento',
    featuredBody: 'Paginas de alta intencao abrem direto: relogios atuais, conversao de fuso, timestamps e intervalos de datas.',
    allTitle: 'Todas as ferramentas TimeNexus publicadas',
    allBody: 'Alterne entre hora atual, planejamento de reuniao, contas de calendario, timestamps, porcentagens e unidades.',
    privacyTitle: 'Entradas locais de tempo',
    privacyBody: 'Datas, fusos, idade e valores numericos ficam no navegador. O catalogo abre paginas gratuitas sem armazenar entradas.',
    toolCta: 'Abrir ferramenta',
    categories: [
      { key: 'world', label: 'Relogio mundial' },
      { key: 'zones', label: 'Fusos horarios' },
      { key: 'calendar', label: 'Calendario' },
      { key: 'calculators', label: 'Calculadoras' },
    ],
    links: [
      { label: 'Relogio Americas + Europa', body: 'Compare Nova York, Sao Paulo, Londres e Berlim.', path: '/world-clock/americas-europe', glyph: 'REL', category: 'world', featured: true },
      { label: 'Relogio do time global', body: 'Veja San Francisco, Nova York, Londres e Toquio juntos.', path: '/world-clock/global-product', glyph: 'TIME', category: 'world', featured: true },
      { label: 'Conversor de fuso horario', body: 'Converta um instante entre fusos IANA.', path: '/tools/timezone-converter', glyph: 'FUSO', category: 'zones', featured: true },
      { label: 'Conversor de timestamp', body: 'Inspecione Unix seconds, milliseconds, ISO, UTC e hora local.', path: '/tools/timestamp-converter', glyph: 'TS', category: 'zones', featured: true },
      { label: 'Diferenca entre datas', body: 'Meça dias, semanas e meses aproximados entre datas.', path: '/tools/date-difference', glyph: 'DIAS', category: 'calendar', featured: true },
      { label: 'Calculadora de dias uteis', body: 'Conte dias de segunda a sexta e mostre fins de semana.', path: '/tools/business-days', glyph: 'UTEIS', category: 'calendar', featured: true },
      { label: 'Calculadora de idade', body: 'Calcule anos, meses, dias e dias totais em uma data.', path: '/tools/age-calculator', glyph: 'IDADE', category: 'calendar', featured: false },
      { label: 'Calculadora de porcentagem', body: 'Calcule porcentagem de, variacao e acrescimo percentual.', path: '/tools/percentage-calculator', glyph: 'PCT', category: 'calculators', featured: false },
      { label: 'Conversor de unidades', body: 'Converta unidades comuns de comprimento, peso e temperatura.', path: '/tools/unit-converter', glyph: 'UNID', category: 'calculators', featured: false },
      { label: 'Horario em Toquio', body: 'Abra uma pagina de cidade mantida com contexto de sobreposicao.', path: '/world-clock/cities/tokyo', glyph: 'TYO', category: 'world', featured: false },
    ],
    shortcutGroups: [
      { title: 'Relogio mundial', body: 'Grupos de cidades para reunioes entre regioes.', paths: ['/world-clock/americas-europe', '/world-clock/global-product', '/world-clock/apac-europe', '/world-clock/cities/tokyo'] },
      { title: 'Fusos horarios', body: 'Hora atual, UTC, timestamps e fusos nomeados.', paths: ['/tools/timezone-converter', '/tools/timestamp-converter'] },
      { title: 'Calendario', body: 'Intervalos, dias uteis e referencias de idade.', paths: ['/tools/date-difference', '/tools/business-days', '/tools/age-calculator'] },
      { title: 'Calculadoras', body: 'Porcentagem e unidades para planejamento diario.', paths: ['/tools/percentage-calculator', '/tools/unit-converter'] },
    ],
    footerGroups: [
      { title: 'Relogio mundial', links: [{ label: 'Americas + Europa', path: '/world-clock/americas-europe' }, { label: 'Time global', path: '/world-clock/global-product' }, { label: 'APAC + Europa', path: '/world-clock/apac-europe' }, { label: 'Horario em Toquio', path: '/world-clock/cities/tokyo' }] },
      { title: 'Fusos horarios', links: [{ label: 'Conversor de fuso', path: '/tools/timezone-converter' }, { label: 'Conversor de timestamp', path: '/tools/timestamp-converter' }, { label: 'Horario em Nova York', path: '/world-clock/cities/new-york' }, { label: 'Horario em Sao Paulo', path: '/world-clock/cities/sao-paulo' }] },
      { title: 'Calendario', links: [{ label: 'Diferenca entre datas', path: '/tools/date-difference' }, { label: 'Dias uteis', path: '/tools/business-days' }, { label: 'Calculadora de idade', path: '/tools/age-calculator' }] },
      { title: 'Calculadoras', links: [{ label: 'Porcentagem', path: '/tools/percentage-calculator' }, { label: 'Unidades', path: '/tools/unit-converter' }] },
      { title: 'Reunioes', links: [{ label: 'Horario em Londres', path: '/world-clock/cities/london' }, { label: 'Horario em Berlim', path: '/world-clock/cities/berlin' }, { label: 'Horario em San Francisco', path: '/world-clock/cities/san-francisco' }, { label: 'Horario em Toquio', path: '/world-clock/cities/tokyo' }] },
    ],
  },
  es: {
    eyebrow: 'Reloj mundial, zonas y fechas',
    title: 'Planifica horarios entre ciudades, fechas y calendarios.',
    lead: 'Ve la hora actual automaticamente, abre relojes mundiales, convierte zonas, cuenta fechas y usa calculadoras practicas sin registro.',
    primaryCta: 'Abrir conversor de zona',
    secondaryCta: 'Ver herramientas de tiempo',
    clockTitle: 'Hora actual ahora',
    clockFallback: 'Cargando hora actual',
    clockDateFallback: 'Hora del navegador',
    clockBody: 'Se actualiza en tu navegador. Usa los enlaces para grupos de ciudades y ventanas de reunion.',
    finderTitle: 'Buscador de tiempo',
    finderBody: 'Busca por tarea o elige una categoria. Relojes, zonas, calendarios y calculadoras quedan juntos.',
    searchLabel: 'Buscar herramientas de tiempo',
    searchPlaceholder: 'Prueba reloj mundial, timestamp, dias laborables...',
    allCategories: 'Todas las herramientas',
    noResultsTitle: 'No hay herramienta coincidente',
    noResultsBody: 'Prueba otra palabra o categoria. Solo enlazamos paginas publicas TimeNexus existentes.',
    browseTitle: 'Elige por tarea de tiempo',
    browseBody: 'El directorio sigue el modelo conocido de reloj mundial, zonas horarias, calendario y calculadoras.',
    featuredTitle: 'Empieza por planificar',
    featuredBody: 'Paginas de alta intencion abren directo: relojes actuales, conversion de zona, timestamps e intervalos.',
    allTitle: 'Todas las herramientas TimeNexus publicadas',
    allBody: 'Alterna entre hora actual, planificacion de reuniones, calculos de calendario, timestamps, porcentajes y unidades.',
    privacyTitle: 'Entradas locales de tiempo',
    privacyBody: 'Fechas, zonas, edad y valores numericos permanecen en el navegador. El catalogo abre paginas gratis sin almacenar entradas.',
    toolCta: 'Abrir herramienta',
    categories: [
      { key: 'world', label: 'Reloj mundial' },
      { key: 'zones', label: 'Zonas horarias' },
      { key: 'calendar', label: 'Calendario' },
      { key: 'calculators', label: 'Calculadoras' },
    ],
    links: [
      { label: 'Reloj Americas + Europa', body: 'Compara Nueva York, Sao Paulo, Londres y Berlin.', path: '/world-clock/americas-europe', glyph: 'REL', category: 'world', featured: true },
      { label: 'Reloj de equipo global', body: 'Consulta San Francisco, Nueva York, Londres y Tokio juntos.', path: '/world-clock/global-product', glyph: 'EQU', category: 'world', featured: true },
      { label: 'Conversor de zona horaria', body: 'Convierte un instante entre zonas IANA.', path: '/tools/timezone-converter', glyph: 'ZONA', category: 'zones', featured: true },
      { label: 'Conversor de timestamp', body: 'Inspecciona Unix seconds, milliseconds, ISO, UTC y hora local.', path: '/tools/timestamp-converter', glyph: 'TS', category: 'zones', featured: true },
      { label: 'Diferencia entre fechas', body: 'Mide dias, semanas y meses aproximados entre fechas.', path: '/tools/date-difference', glyph: 'DIAS', category: 'calendar', featured: true },
      { label: 'Calculadora de dias laborables', body: 'Cuenta lunes a viernes y muestra dias de fin de semana.', path: '/tools/business-days', glyph: 'LAB', category: 'calendar', featured: true },
      { label: 'Calculadora de edad', body: 'Calcula anos, meses, dias y dias totales en una fecha.', path: '/tools/age-calculator', glyph: 'EDAD', category: 'calendar', featured: false },
      { label: 'Calculadora de porcentaje', body: 'Calcula porcentaje de, cambio y suma porcentual.', path: '/tools/percentage-calculator', glyph: 'PCT', category: 'calculators', featured: false },
      { label: 'Conversor de unidades', body: 'Convierte unidades comunes de longitud, peso y temperatura.', path: '/tools/unit-converter', glyph: 'UNID', category: 'calculators', featured: false },
      { label: 'Hora en Tokio', body: 'Abre una pagina de ciudad mantenida con contexto de solape.', path: '/world-clock/cities/tokyo', glyph: 'TYO', category: 'world', featured: false },
    ],
    shortcutGroups: [
      { title: 'Reloj mundial', body: 'Grupos de ciudades para reuniones entre regiones.', paths: ['/world-clock/americas-europe', '/world-clock/global-product', '/world-clock/apac-europe', '/world-clock/cities/tokyo'] },
      { title: 'Zonas horarias', body: 'Hora actual, UTC, timestamps y zonas nombradas.', paths: ['/tools/timezone-converter', '/tools/timestamp-converter'] },
      { title: 'Calendario', body: 'Intervalos, dias laborables y referencias de edad.', paths: ['/tools/date-difference', '/tools/business-days', '/tools/age-calculator'] },
      { title: 'Calculadoras', body: 'Porcentajes y unidades para planificacion diaria.', paths: ['/tools/percentage-calculator', '/tools/unit-converter'] },
    ],
    footerGroups: [
      { title: 'Reloj mundial', links: [{ label: 'Americas + Europa', path: '/world-clock/americas-europe' }, { label: 'Equipo global', path: '/world-clock/global-product' }, { label: 'APAC + Europa', path: '/world-clock/apac-europe' }, { label: 'Hora en Tokio', path: '/world-clock/cities/tokyo' }] },
      { title: 'Zonas horarias', links: [{ label: 'Conversor de zona', path: '/tools/timezone-converter' }, { label: 'Conversor de timestamp', path: '/tools/timestamp-converter' }, { label: 'Hora en Nueva York', path: '/world-clock/cities/new-york' }, { label: 'Hora en Sao Paulo', path: '/world-clock/cities/sao-paulo' }] },
      { title: 'Calendario', links: [{ label: 'Diferencia entre fechas', path: '/tools/date-difference' }, { label: 'Dias laborables', path: '/tools/business-days' }, { label: 'Calculadora de edad', path: '/tools/age-calculator' }] },
      { title: 'Calculadoras', links: [{ label: 'Porcentaje', path: '/tools/percentage-calculator' }, { label: 'Unidades', path: '/tools/unit-converter' }] },
      { title: 'Reuniones', links: [{ label: 'Hora en Londres', path: '/world-clock/cities/london' }, { label: 'Hora en Berlin', path: '/world-clock/cities/berlin' }, { label: 'Hora en San Francisco', path: '/world-clock/cities/san-francisco' }, { label: 'Hora en Tokio', path: '/world-clock/cities/tokyo' }] },
    ],
  },
  fr: {
    eyebrow: 'Horloge mondiale, fuseaux et dates',
    title: 'Planifiez horaires, villes, dates et calendriers.',
    lead: 'Voyez l heure actuelle automatiquement, ouvrez des horloges mondiales, convertissez les fuseaux, comptez les dates et utilisez des calculateurs sans compte.',
    primaryCta: 'Ouvrir le convertisseur de fuseau',
    secondaryCta: 'Voir les outils de temps',
    clockTitle: 'Heure actuelle',
    clockFallback: 'Chargement de l heure',
    clockDateFallback: 'Heure du navigateur',
    clockBody: 'Mise a jour dans le navigateur. Utilisez les liens pour groupes de villes et creneaux de reunion.',
    finderTitle: 'Recherche d outils temps',
    finderBody: 'Cherchez par tache ou categorie. Horloges, fuseaux, calendriers et calculateurs restent ensemble.',
    searchLabel: 'Chercher des outils de temps',
    searchPlaceholder: 'Essayez horloge mondiale, timestamp, jours ouvrables...',
    allCategories: 'Tous les outils de temps',
    noResultsTitle: 'Aucun outil trouve',
    noResultsBody: 'Essayez un autre mot ou une categorie. Seules les pages TimeNexus publiques existantes sont liees.',
    browseTitle: 'Choisir par tache de temps',
    browseBody: 'Le repertoire suit le modele horloge mondiale, fuseaux, calendrier et calculateurs.',
    featuredTitle: 'Commencer par planifier',
    featuredBody: 'Les pages a forte intention ouvrent directement: horloges, conversion de fuseau, timestamps et ecarts de dates.',
    allTitle: 'Tous les outils TimeNexus publies',
    allBody: 'Passez entre heure actuelle, planification de reunion, calculs calendrier, timestamps, pourcentages et unites.',
    privacyTitle: 'Entrees locales de temps',
    privacyBody: 'Dates, fuseaux, age et valeurs numeriques restent dans le navigateur. Le catalogue ouvre des pages gratuites sans stocker les entrees.',
    toolCta: 'Ouvrir l outil',
    categories: [
      { key: 'world', label: 'Horloge mondiale' },
      { key: 'zones', label: 'Fuseaux horaires' },
      { key: 'calendar', label: 'Calendrier' },
      { key: 'calculators', label: 'Calculateurs' },
    ],
    links: [
      { label: 'Horloge Ameriques + Europe', body: 'Compare New York, Sao Paulo, Londres et Berlin.', path: '/world-clock/americas-europe', glyph: 'HOR', category: 'world', featured: true },
      { label: 'Horloge equipe globale', body: 'Consulte San Francisco, New York, Londres et Tokyo ensemble.', path: '/world-clock/global-product', glyph: 'EQ', category: 'world', featured: true },
      { label: 'Convertisseur de fuseau', body: 'Convertit un instant entre fuseaux IANA.', path: '/tools/timezone-converter', glyph: 'FUS', category: 'zones', featured: true },
      { label: 'Convertisseur timestamp', body: 'Inspecte secondes Unix, millisecondes, ISO, UTC et heure locale.', path: '/tools/timestamp-converter', glyph: 'TS', category: 'zones', featured: true },
      { label: 'Difference entre dates', body: 'Mesure jours, semaines et mois approximatifs entre dates.', path: '/tools/date-difference', glyph: 'JRS', category: 'calendar', featured: true },
      { label: 'Calculateur de jours ouvrables', body: 'Compte lundi a vendredi et indique les week-ends.', path: '/tools/business-days', glyph: 'OUV', category: 'calendar', featured: true },
      { label: 'Calculateur d age', body: 'Calcule annees, mois, jours et jours totaux a une date.', path: '/tools/age-calculator', glyph: 'AGE', category: 'calendar', featured: false },
      { label: 'Calculateur de pourcentage', body: 'Calcule pourcentage de, variation et ajout en pourcentage.', path: '/tools/percentage-calculator', glyph: 'PCT', category: 'calculators', featured: false },
      { label: 'Convertisseur d unites', body: 'Convertit longueur, poids et temperature courants.', path: '/tools/unit-converter', glyph: 'UNIT', category: 'calculators', featured: false },
      { label: 'Heure a Tokyo', body: 'Ouvre une page ville maintenue avec contexte de chevauchement.', path: '/world-clock/cities/tokyo', glyph: 'TYO', category: 'world', featured: false },
    ],
    shortcutGroups: [
      { title: 'Horloge mondiale', body: 'Groupes de villes pour reunions interregionales.', paths: ['/world-clock/americas-europe', '/world-clock/global-product', '/world-clock/apac-europe', '/world-clock/cities/tokyo'] },
      { title: 'Fuseaux horaires', body: 'Heure actuelle, UTC, timestamps et fuseaux nommes.', paths: ['/tools/timezone-converter', '/tools/timestamp-converter'] },
      { title: 'Calendrier', body: 'Ecarts, jours ouvrables et references d age.', paths: ['/tools/date-difference', '/tools/business-days', '/tools/age-calculator'] },
      { title: 'Calculateurs', body: 'Pourcentages et unites pour planification quotidienne.', paths: ['/tools/percentage-calculator', '/tools/unit-converter'] },
    ],
    footerGroups: [
      { title: 'Horloge mondiale', links: [{ label: 'Ameriques + Europe', path: '/world-clock/americas-europe' }, { label: 'Equipe globale', path: '/world-clock/global-product' }, { label: 'APAC + Europe', path: '/world-clock/apac-europe' }, { label: 'Heure a Tokyo', path: '/world-clock/cities/tokyo' }] },
      { title: 'Fuseaux horaires', links: [{ label: 'Convertisseur de fuseau', path: '/tools/timezone-converter' }, { label: 'Convertisseur timestamp', path: '/tools/timestamp-converter' }, { label: 'Heure a New York', path: '/world-clock/cities/new-york' }, { label: 'Heure a Sao Paulo', path: '/world-clock/cities/sao-paulo' }] },
      { title: 'Calendrier', links: [{ label: 'Difference entre dates', path: '/tools/date-difference' }, { label: 'Jours ouvrables', path: '/tools/business-days' }, { label: 'Calculateur d age', path: '/tools/age-calculator' }] },
      { title: 'Calculateurs', links: [{ label: 'Pourcentage', path: '/tools/percentage-calculator' }, { label: 'Unites', path: '/tools/unit-converter' }] },
      { title: 'Reunions', links: [{ label: 'Heure a Londres', path: '/world-clock/cities/london' }, { label: 'Heure a Berlin', path: '/world-clock/cities/berlin' }, { label: 'Heure a San Francisco', path: '/world-clock/cities/san-francisco' }, { label: 'Heure a Tokyo', path: '/world-clock/cities/tokyo' }] },
    ],
  },
  de: {
    eyebrow: 'Weltuhr, Zeitzonen und Datum',
    title: 'Planen Sie Zeiten, Staedte, Daten und Kalender.',
    lead: 'Sehen Sie die aktuelle Uhrzeit automatisch, oeffnen Sie Weltuhren, konvertieren Sie Zeitzonen, zaehlen Sie Daten und nutzen Sie Rechner ohne Konto.',
    primaryCta: 'Zeitzonen-Konverter oeffnen',
    secondaryCta: 'Alle Zeittools ansehen',
    clockTitle: 'Aktuelle Uhrzeit',
    clockFallback: 'Uhrzeit wird geladen',
    clockDateFallback: 'Browserzeit',
    clockBody: 'Aktualisiert im Browser. Nutzen Sie die Links fuer Stadtgruppen und Meeting-Zeitfenster.',
    finderTitle: 'Zeittool-Finder',
    finderBody: 'Suchen Sie nach Aufgabe oder Kategorie. Weltuhren, Zeitzonen, Kalender und Rechner bleiben zusammen.',
    searchLabel: 'Zeittools suchen',
    searchPlaceholder: 'Versuchen Sie Weltuhr, Timestamp, Arbeitstage...',
    allCategories: 'Alle Zeittools',
    noResultsTitle: 'Kein passendes Zeittool',
    noResultsBody: 'Versuchen Sie ein anderes Wort oder eine Kategorie. Nur vorhandene oeffentliche TimeNexus-Seiten sind verlinkt.',
    browseTitle: 'Nach Zeitaufgabe waehlen',
    browseBody: 'Das Verzeichnis folgt dem bekannten Modell Weltuhr, Zeitzonen, Kalender und Rechner.',
    featuredTitle: 'Mit Zeitplanung starten',
    featuredBody: 'Seiten mit hoher Absicht oeffnen direkt: aktuelle Uhren, Zeitzonen, Timestamps und Datumsabstaende.',
    allTitle: 'Alle veroeffentlichten TimeNexus-Tools',
    allBody: 'Wechseln Sie zwischen aktueller Zeit, Meetingplanung, Kalenderlogik, Timestamps, Prozenten und Einheiten.',
    privacyTitle: 'Lokale Zeiteingaben',
    privacyBody: 'Daten, Zeitzonen, Alter und Zahlenwerte bleiben im Browser. Der Katalog oeffnet kostenlose Seiten ohne Eingaben zu speichern.',
    toolCta: 'Tool oeffnen',
    categories: [
      { key: 'world', label: 'Weltuhr' },
      { key: 'zones', label: 'Zeitzonen' },
      { key: 'calendar', label: 'Kalender' },
      { key: 'calculators', label: 'Rechner' },
    ],
    links: [
      { label: 'Weltuhr Amerika + Europa', body: 'Vergleichen Sie New York, Sao Paulo, London und Berlin.', path: '/world-clock/americas-europe', glyph: 'WELT', category: 'world', featured: true },
      { label: 'Uhr fuer globales Produktteam', body: 'Sehen Sie San Francisco, New York, London und Tokio zusammen.', path: '/world-clock/global-product', glyph: 'TEAM', category: 'world', featured: true },
      { label: 'Zeitzonen-Konverter', body: 'Konvertiert einen Zeitpunkt zwischen IANA-Zeitzonen.', path: '/tools/timezone-converter', glyph: 'TZ', category: 'zones', featured: true },
      { label: 'Timestamp-Konverter', body: 'Prueft Unix-Sekunden, Millisekunden, ISO, UTC und lokale Zeit.', path: '/tools/timestamp-converter', glyph: 'TS', category: 'zones', featured: true },
      { label: 'Datumsdifferenz-Rechner', body: 'Misst Tage, Wochen und ungefaehre Monate zwischen Daten.', path: '/tools/date-difference', glyph: 'TAG', category: 'calendar', featured: true },
      { label: 'Arbeitstage-Rechner', body: 'Zaehlt Montag bis Freitag und zeigt Wochenendtage.', path: '/tools/business-days', glyph: 'ARB', category: 'calendar', featured: true },
      { label: 'Altersrechner', body: 'Berechnet Jahre, Monate, Tage und Gesamttage zu einem Datum.', path: '/tools/age-calculator', glyph: 'ALT', category: 'calendar', featured: false },
      { label: 'Prozentrechner', body: 'Berechnet Prozent von, Veraenderung und Prozentaufschlag.', path: '/tools/percentage-calculator', glyph: 'PCT', category: 'calculators', featured: false },
      { label: 'Einheiten-Konverter', body: 'Konvertiert haeufige Laengen, Gewichte und Temperaturen.', path: '/tools/unit-converter', glyph: 'EINH', category: 'calculators', featured: false },
      { label: 'Tokio-Uhrzeit', body: 'Oeffnet eine gepflegte Stadtseite mit Ueberschneidungs-Kontext.', path: '/world-clock/cities/tokyo', glyph: 'TYO', category: 'world', featured: false },
    ],
    shortcutGroups: [
      { title: 'Weltuhr', body: 'Stadtgruppen fuer Meetings ueber Regionen hinweg.', paths: ['/world-clock/americas-europe', '/world-clock/global-product', '/world-clock/apac-europe', '/world-clock/cities/tokyo'] },
      { title: 'Zeitzonen', body: 'Aktuelle Zeit, UTC, Timestamps und benannte Zonen.', paths: ['/tools/timezone-converter', '/tools/timestamp-converter'] },
      { title: 'Kalender', body: 'Abstaende, Arbeitstage und Altersreferenzen.', paths: ['/tools/date-difference', '/tools/business-days', '/tools/age-calculator'] },
      { title: 'Rechner', body: 'Prozente und Einheiten fuer Alltagsplanung.', paths: ['/tools/percentage-calculator', '/tools/unit-converter'] },
    ],
    footerGroups: [
      { title: 'Weltuhr', links: [{ label: 'Amerika + Europa', path: '/world-clock/americas-europe' }, { label: 'Globales Team', path: '/world-clock/global-product' }, { label: 'APAC + Europa', path: '/world-clock/apac-europe' }, { label: 'Tokio-Uhrzeit', path: '/world-clock/cities/tokyo' }] },
      { title: 'Zeitzonen', links: [{ label: 'Zeitzonen-Konverter', path: '/tools/timezone-converter' }, { label: 'Timestamp-Konverter', path: '/tools/timestamp-converter' }, { label: 'New-York-Uhrzeit', path: '/world-clock/cities/new-york' }, { label: 'Sao-Paulo-Uhrzeit', path: '/world-clock/cities/sao-paulo' }] },
      { title: 'Kalender', links: [{ label: 'Datumsdifferenz', path: '/tools/date-difference' }, { label: 'Arbeitstage', path: '/tools/business-days' }, { label: 'Altersrechner', path: '/tools/age-calculator' }] },
      { title: 'Rechner', links: [{ label: 'Prozentrechner', path: '/tools/percentage-calculator' }, { label: 'Einheiten', path: '/tools/unit-converter' }] },
      { title: 'Meetings', links: [{ label: 'London-Uhrzeit', path: '/world-clock/cities/london' }, { label: 'Berlin-Uhrzeit', path: '/world-clock/cities/berlin' }, { label: 'San-Francisco-Uhrzeit', path: '/world-clock/cities/san-francisco' }, { label: 'Tokio-Uhrzeit', path: '/world-clock/cities/tokyo' }] },
    ],
  },
}

export const footerCopy: Record<LocaleCode, FooterCopy> = {
  en: {
    brandBody: 'A portfolio of practical web tools with localized public pages, useful free workflows and clearly separated account features.',
    productNavLabel: 'Product verticals',
    legalNavLabel: 'Legal and editorial pages',
    groups: [
      {
        title: 'Network and DNS',
        links: [
          { label: 'What is my IP', siteSlug: 'netprobe-atlas', path: '/tools/what-is-my-ip' },
          { label: 'DNS Propagation', siteSlug: 'netprobe-atlas', path: '/tools/dns-propagation' },
          { label: 'DNS Lookup', siteSlug: 'netprobe-atlas', path: '/tools/dns-lookup' },
          { label: 'RDAP Lookup', siteSlug: 'netprobe-atlas', path: '/tools/rdap-domain-lookup' },
          { label: 'SSL Certificate Checker', siteSlug: 'netprobe-atlas', path: '/tools/ssl-certificate-checker' },
          { label: 'Port Checker', siteSlug: 'netprobe-atlas', path: '/tools/port-checker' },
        ],
      },
      {
        title: 'Email and website',
        links: [
          { label: 'SPF Checker', siteSlug: 'mailhealth', path: '/tools/spf-checker' },
          { label: 'DKIM Checker', siteSlug: 'mailhealth', path: '/tools/dkim-checker' },
          { label: 'DMARC Checker', siteSlug: 'mailhealth', path: '/tools/dmarc-checker' },
          { label: 'MX Checker', siteSlug: 'mailhealth', path: '/tools/mx-checker' },
          { label: 'Website Status', siteSlug: 'sitepulse-lab', path: '/tools/status-checker' },
          { label: 'Redirect Chain', siteSlug: 'sitepulse-lab', path: '/tools/redirect-chain' },
          { label: 'Security Headers', siteSlug: 'sitepulse-lab', path: '/tools/security-headers' },
        ],
      },
      {
        title: 'Calculators and time',
        links: [
          { label: 'Loan Payment', siteSlug: 'calcharbor', path: '/calculators/loan-payment' },
          { label: 'Break-even Point', siteSlug: 'calcharbor', path: '/calculators/break-even-point' },
          { label: 'Gross Margin', siteSlug: 'calcharbor', path: '/calculators/gross-margin' },
          { label: 'ROI Calculator', siteSlug: 'calcharbor', path: '/calculators/roi' },
          { label: 'Time Zone Converter', siteSlug: 'timenexus', path: '/tools/timezone-converter' },
          { label: 'World Clock', siteSlug: 'timenexus', path: '/world-clock/americas-europe' },
        ],
      },
      {
        title: 'Developer and QR',
        links: [
          { label: 'JSON Formatter', siteSlug: 'devutility-lab', path: '/tools/structured-data-formatter' },
          { label: 'Base64 Converter', siteSlug: 'devutility-lab', path: '/tools/base64-converter' },
          { label: 'JWT Inspector', siteSlug: 'devutility-lab', path: '/tools/jwt-inspector' },
          { label: 'Regex Tester', siteSlug: 'devutility-lab', path: '/tools/regex-tester' },
          { label: 'Static QR Code', siteSlug: 'qrroute', path: '/tools/static-qr-code' },
          { label: 'UTM Builder', siteSlug: 'qrroute', path: '/tools/utm-builder' },
          { label: 'Barcode Generator', siteSlug: 'qrroute', path: '/tools/barcode-generator' },
        ],
      },
      {
        title: 'Documents and PDF',
        links: [
          { label: 'Invoice Builder', siteSlug: 'invoicecraft', path: '/tools/invoice-builder' },
          { label: 'Quote Builder', siteSlug: 'invoicecraft', path: '/tools/quote-builder' },
          { label: 'Receipt Builder', siteSlug: 'invoicecraft', path: '/tools/receipt-builder' },
          { label: 'PDF Merge', siteSlug: 'docshift', path: '/tools/pdf-merge' },
          { label: 'PDF Split', siteSlug: 'docshift', path: '/tools/pdf-split' },
          { label: 'PDF Rotate', siteSlug: 'docshift', path: '/tools/pdf-rotate' },
        ],
      },
      {
        title: 'Images',
        links: [
          { label: 'Image Compressor', siteSlug: 'pixelbatch', path: '/tools/image-compressor' },
          { label: 'Image Resizer', siteSlug: 'pixelbatch', path: '/tools/image-resizer' },
          { label: 'Image Cropper', siteSlug: 'pixelbatch', path: '/tools/image-cropper' },
          { label: 'Image Converter', siteSlug: 'pixelbatch', path: '/tools/image-converter' },
          { label: 'Metadata Remover', siteSlug: 'pixelbatch', path: '/tools/metadata-remover' },
          { label: 'Social Presets', siteSlug: 'pixelbatch', path: '/tools/social-preset-generator' },
        ],
      },
    ],
  },
  'pt-br': {
    brandBody: 'Um portfólio de ferramentas web práticas com páginas públicas localizadas, fluxos gratuitos úteis e recursos de conta bem separados.',
    productNavLabel: 'Verticais de produto',
    legalNavLabel: 'Páginas legais e editoriais',
    groups: [
      {
        title: 'Rede e DNS',
        links: [
          { label: 'Qual é meu IP', siteSlug: 'netprobe-atlas', path: '/tools/what-is-my-ip' },
          { label: 'Propagação DNS', siteSlug: 'netprobe-atlas', path: '/tools/dns-propagation' },
          { label: 'Consulta DNS', siteSlug: 'netprobe-atlas', path: '/tools/dns-lookup' },
          { label: 'Consulta RDAP', siteSlug: 'netprobe-atlas', path: '/tools/rdap-domain-lookup' },
          { label: 'Certificado SSL', siteSlug: 'netprobe-atlas', path: '/tools/ssl-certificate-checker' },
          { label: 'Teste de porta', siteSlug: 'netprobe-atlas', path: '/tools/port-checker' },
        ],
      },
      {
        title: 'E-mail e sites',
        links: [
          { label: 'Verificador SPF', siteSlug: 'mailhealth', path: '/tools/spf-checker' },
          { label: 'Verificador DKIM', siteSlug: 'mailhealth', path: '/tools/dkim-checker' },
          { label: 'Verificador DMARC', siteSlug: 'mailhealth', path: '/tools/dmarc-checker' },
          { label: 'Verificador MX', siteSlug: 'mailhealth', path: '/tools/mx-checker' },
          { label: 'Status de site', siteSlug: 'sitepulse-lab', path: '/tools/status-checker' },
          { label: 'Cadeia de redirecionamento', siteSlug: 'sitepulse-lab', path: '/tools/redirect-chain' },
          { label: 'Cabeçalhos de segurança', siteSlug: 'sitepulse-lab', path: '/tools/security-headers' },
        ],
      },
      {
        title: 'Calculadoras e tempo',
        links: [
          { label: 'Pagamento de empréstimo', siteSlug: 'calcharbor', path: '/calculators/loan-payment' },
          { label: 'Ponto de equilíbrio', siteSlug: 'calcharbor', path: '/calculators/break-even-point' },
          { label: 'Margem bruta', siteSlug: 'calcharbor', path: '/calculators/gross-margin' },
          { label: 'Calculadora de ROI', siteSlug: 'calcharbor', path: '/calculators/roi' },
          { label: 'Conversor de fuso horário', siteSlug: 'timenexus', path: '/tools/timezone-converter' },
          { label: 'Relógio mundial', siteSlug: 'timenexus', path: '/world-clock/americas-europe' },
        ],
      },
      {
        title: 'Desenvolvimento e QR',
        links: [
          { label: 'Formatador JSON', siteSlug: 'devutility-lab', path: '/tools/structured-data-formatter' },
          { label: 'Conversor Base64', siteSlug: 'devutility-lab', path: '/tools/base64-converter' },
          { label: 'Inspetor JWT', siteSlug: 'devutility-lab', path: '/tools/jwt-inspector' },
          { label: 'Teste de regex', siteSlug: 'devutility-lab', path: '/tools/regex-tester' },
          { label: 'QR estático', siteSlug: 'qrroute', path: '/tools/static-qr-code' },
          { label: 'Gerador UTM', siteSlug: 'qrroute', path: '/tools/utm-builder' },
          { label: 'Gerador de código de barras', siteSlug: 'qrroute', path: '/tools/barcode-generator' },
        ],
      },
      {
        title: 'Documentos e PDF',
        links: [
          { label: 'Gerador de fatura', siteSlug: 'invoicecraft', path: '/tools/invoice-builder' },
          { label: 'Gerador de orçamento', siteSlug: 'invoicecraft', path: '/tools/quote-builder' },
          { label: 'Gerador de recibo', siteSlug: 'invoicecraft', path: '/tools/receipt-builder' },
          { label: 'Unir PDFs', siteSlug: 'docshift', path: '/tools/pdf-merge' },
          { label: 'Dividir PDF', siteSlug: 'docshift', path: '/tools/pdf-split' },
          { label: 'Girar PDF', siteSlug: 'docshift', path: '/tools/pdf-rotate' },
        ],
      },
      {
        title: 'Imagens',
        links: [
          { label: 'Compressor de imagem', siteSlug: 'pixelbatch', path: '/tools/image-compressor' },
          { label: 'Redimensionador de imagem', siteSlug: 'pixelbatch', path: '/tools/image-resizer' },
          { label: 'Cortador de imagem', siteSlug: 'pixelbatch', path: '/tools/image-cropper' },
          { label: 'Conversor de imagem', siteSlug: 'pixelbatch', path: '/tools/image-converter' },
          { label: 'Removedor de metadados', siteSlug: 'pixelbatch', path: '/tools/metadata-remover' },
          { label: 'Formatos sociais', siteSlug: 'pixelbatch', path: '/tools/social-preset-generator' },
        ],
      },
    ],
  },
  es: {
    brandBody: 'Un portafolio de herramientas web prácticas con páginas localizadas, flujos gratuitos útiles y funciones de cuenta bien separadas.',
    productNavLabel: 'Verticales de producto',
    legalNavLabel: 'Páginas legales y editoriales',
    groups: [
      {
        title: 'Red y DNS',
        links: [
          { label: 'Cuál es mi IP', siteSlug: 'netprobe-atlas', path: '/tools/what-is-my-ip' },
          { label: 'Propagación DNS', siteSlug: 'netprobe-atlas', path: '/tools/dns-propagation' },
          { label: 'Consulta DNS', siteSlug: 'netprobe-atlas', path: '/tools/dns-lookup' },
          { label: 'Consulta RDAP', siteSlug: 'netprobe-atlas', path: '/tools/rdap-domain-lookup' },
          { label: 'Certificado SSL', siteSlug: 'netprobe-atlas', path: '/tools/ssl-certificate-checker' },
          { label: 'Prueba de puerto', siteSlug: 'netprobe-atlas', path: '/tools/port-checker' },
        ],
      },
      {
        title: 'Email y sitios',
        links: [
          { label: 'Verificador SPF', siteSlug: 'mailhealth', path: '/tools/spf-checker' },
          { label: 'Verificador DKIM', siteSlug: 'mailhealth', path: '/tools/dkim-checker' },
          { label: 'Verificador DMARC', siteSlug: 'mailhealth', path: '/tools/dmarc-checker' },
          { label: 'Verificador MX', siteSlug: 'mailhealth', path: '/tools/mx-checker' },
          { label: 'Estado del sitio', siteSlug: 'sitepulse-lab', path: '/tools/status-checker' },
          { label: 'Cadena de redirección', siteSlug: 'sitepulse-lab', path: '/tools/redirect-chain' },
          { label: 'Encabezados de seguridad', siteSlug: 'sitepulse-lab', path: '/tools/security-headers' },
        ],
      },
      {
        title: 'Calculadoras y tiempo',
        links: [
          { label: 'Pago de préstamo', siteSlug: 'calcharbor', path: '/calculators/loan-payment' },
          { label: 'Punto de equilibrio', siteSlug: 'calcharbor', path: '/calculators/break-even-point' },
          { label: 'Margen bruto', siteSlug: 'calcharbor', path: '/calculators/gross-margin' },
          { label: 'Calculadora ROI', siteSlug: 'calcharbor', path: '/calculators/roi' },
          { label: 'Conversor de zona horaria', siteSlug: 'timenexus', path: '/tools/timezone-converter' },
          { label: 'Reloj mundial', siteSlug: 'timenexus', path: '/world-clock/americas-europe' },
        ],
      },
      {
        title: 'Dev y QR',
        links: [
          { label: 'Formateador JSON', siteSlug: 'devutility-lab', path: '/tools/structured-data-formatter' },
          { label: 'Conversor Base64', siteSlug: 'devutility-lab', path: '/tools/base64-converter' },
          { label: 'Inspector JWT', siteSlug: 'devutility-lab', path: '/tools/jwt-inspector' },
          { label: 'Probador regex', siteSlug: 'devutility-lab', path: '/tools/regex-tester' },
          { label: 'QR estático', siteSlug: 'qrroute', path: '/tools/static-qr-code' },
          { label: 'Generador UTM', siteSlug: 'qrroute', path: '/tools/utm-builder' },
          { label: 'Generador de código de barras', siteSlug: 'qrroute', path: '/tools/barcode-generator' },
        ],
      },
      {
        title: 'Documentos y PDF',
        links: [
          { label: 'Generador de facturas', siteSlug: 'invoicecraft', path: '/tools/invoice-builder' },
          { label: 'Generador de presupuestos', siteSlug: 'invoicecraft', path: '/tools/quote-builder' },
          { label: 'Generador de recibos', siteSlug: 'invoicecraft', path: '/tools/receipt-builder' },
          { label: 'Unir PDF', siteSlug: 'docshift', path: '/tools/pdf-merge' },
          { label: 'Dividir PDF', siteSlug: 'docshift', path: '/tools/pdf-split' },
          { label: 'Rotar PDF', siteSlug: 'docshift', path: '/tools/pdf-rotate' },
        ],
      },
      {
        title: 'Imágenes',
        links: [
          { label: 'Compresor de imagen', siteSlug: 'pixelbatch', path: '/tools/image-compressor' },
          { label: 'Redimensionar imagen', siteSlug: 'pixelbatch', path: '/tools/image-resizer' },
          { label: 'Recortar imagen', siteSlug: 'pixelbatch', path: '/tools/image-cropper' },
          { label: 'Convertir imagen', siteSlug: 'pixelbatch', path: '/tools/image-converter' },
          { label: 'Eliminar metadatos', siteSlug: 'pixelbatch', path: '/tools/metadata-remover' },
          { label: 'Formatos sociales', siteSlug: 'pixelbatch', path: '/tools/social-preset-generator' },
        ],
      },
    ],
  },
  fr: {
    brandBody: 'Un portefeuille d’outils web pratiques avec pages localisées, parcours gratuits utiles et fonctions de compte clairement séparées.',
    productNavLabel: 'Verticales produit',
    legalNavLabel: 'Pages légales et éditoriales',
    groups: [
      {
        title: 'Réseau et DNS',
        links: [
          { label: 'Quelle est mon IP', siteSlug: 'netprobe-atlas', path: '/tools/what-is-my-ip' },
          { label: 'Propagation DNS', siteSlug: 'netprobe-atlas', path: '/tools/dns-propagation' },
          { label: 'Recherche DNS', siteSlug: 'netprobe-atlas', path: '/tools/dns-lookup' },
          { label: 'Recherche RDAP', siteSlug: 'netprobe-atlas', path: '/tools/rdap-domain-lookup' },
          { label: 'Certificat SSL', siteSlug: 'netprobe-atlas', path: '/tools/ssl-certificate-checker' },
          { label: 'Test de port', siteSlug: 'netprobe-atlas', path: '/tools/port-checker' },
        ],
      },
      {
        title: 'E-mail et sites',
        links: [
          { label: 'Vérificateur SPF', siteSlug: 'mailhealth', path: '/tools/spf-checker' },
          { label: 'Vérificateur DKIM', siteSlug: 'mailhealth', path: '/tools/dkim-checker' },
          { label: 'Vérificateur DMARC', siteSlug: 'mailhealth', path: '/tools/dmarc-checker' },
          { label: 'Vérificateur MX', siteSlug: 'mailhealth', path: '/tools/mx-checker' },
          { label: 'Statut du site', siteSlug: 'sitepulse-lab', path: '/tools/status-checker' },
          { label: 'Chaîne de redirection', siteSlug: 'sitepulse-lab', path: '/tools/redirect-chain' },
          { label: 'En-têtes de sécurité', siteSlug: 'sitepulse-lab', path: '/tools/security-headers' },
        ],
      },
      {
        title: 'Calculateurs et temps',
        links: [
          { label: 'Paiement de prêt', siteSlug: 'calcharbor', path: '/calculators/loan-payment' },
          { label: 'Seuil de rentabilité', siteSlug: 'calcharbor', path: '/calculators/break-even-point' },
          { label: 'Marge brute', siteSlug: 'calcharbor', path: '/calculators/gross-margin' },
          { label: 'Calculateur ROI', siteSlug: 'calcharbor', path: '/calculators/roi' },
          { label: 'Convertisseur de fuseau', siteSlug: 'timenexus', path: '/tools/timezone-converter' },
          { label: 'Horloge mondiale', siteSlug: 'timenexus', path: '/world-clock/americas-europe' },
        ],
      },
      {
        title: 'Dev et QR',
        links: [
          { label: 'Formateur JSON', siteSlug: 'devutility-lab', path: '/tools/structured-data-formatter' },
          { label: 'Convertisseur Base64', siteSlug: 'devutility-lab', path: '/tools/base64-converter' },
          { label: 'Inspecteur JWT', siteSlug: 'devutility-lab', path: '/tools/jwt-inspector' },
          { label: 'Testeur regex', siteSlug: 'devutility-lab', path: '/tools/regex-tester' },
          { label: 'QR statique', siteSlug: 'qrroute', path: '/tools/static-qr-code' },
          { label: 'Générateur UTM', siteSlug: 'qrroute', path: '/tools/utm-builder' },
          { label: 'Générateur de code-barres', siteSlug: 'qrroute', path: '/tools/barcode-generator' },
        ],
      },
      {
        title: 'Documents et PDF',
        links: [
          { label: 'Générateur de facture', siteSlug: 'invoicecraft', path: '/tools/invoice-builder' },
          { label: 'Générateur de devis', siteSlug: 'invoicecraft', path: '/tools/quote-builder' },
          { label: 'Générateur de reçu', siteSlug: 'invoicecraft', path: '/tools/receipt-builder' },
          { label: 'Fusion PDF', siteSlug: 'docshift', path: '/tools/pdf-merge' },
          { label: 'Division PDF', siteSlug: 'docshift', path: '/tools/pdf-split' },
          { label: 'Rotation PDF', siteSlug: 'docshift', path: '/tools/pdf-rotate' },
        ],
      },
      {
        title: 'Images',
        links: [
          { label: 'Compresseur d’image', siteSlug: 'pixelbatch', path: '/tools/image-compressor' },
          { label: 'Redimensionner image', siteSlug: 'pixelbatch', path: '/tools/image-resizer' },
          { label: 'Recadrer image', siteSlug: 'pixelbatch', path: '/tools/image-cropper' },
          { label: 'Convertir image', siteSlug: 'pixelbatch', path: '/tools/image-converter' },
          { label: 'Supprimer métadonnées', siteSlug: 'pixelbatch', path: '/tools/metadata-remover' },
          { label: 'Formats sociaux', siteSlug: 'pixelbatch', path: '/tools/social-preset-generator' },
        ],
      },
    ],
  },
  de: {
    brandBody: 'Ein Portfolio praktischer Web-Tools mit lokalisierten öffentlichen Seiten, nützlichen kostenlosen Abläufen und klar getrennten Konto-Funktionen.',
    productNavLabel: 'Produktbereiche',
    legalNavLabel: 'Rechtliche und redaktionelle Seiten',
    groups: [
      {
        title: 'Netzwerk und DNS',
        links: [
          { label: 'Was ist meine IP', siteSlug: 'netprobe-atlas', path: '/tools/what-is-my-ip' },
          { label: 'DNS-Propagation', siteSlug: 'netprobe-atlas', path: '/tools/dns-propagation' },
          { label: 'DNS-Lookup', siteSlug: 'netprobe-atlas', path: '/tools/dns-lookup' },
          { label: 'RDAP-Lookup', siteSlug: 'netprobe-atlas', path: '/tools/rdap-domain-lookup' },
          { label: 'SSL-Zertifikat', siteSlug: 'netprobe-atlas', path: '/tools/ssl-certificate-checker' },
          { label: 'Port-Checker', siteSlug: 'netprobe-atlas', path: '/tools/port-checker' },
        ],
      },
      {
        title: 'E-Mail und Website',
        links: [
          { label: 'SPF-Checker', siteSlug: 'mailhealth', path: '/tools/spf-checker' },
          { label: 'DKIM-Checker', siteSlug: 'mailhealth', path: '/tools/dkim-checker' },
          { label: 'DMARC-Checker', siteSlug: 'mailhealth', path: '/tools/dmarc-checker' },
          { label: 'MX-Checker', siteSlug: 'mailhealth', path: '/tools/mx-checker' },
          { label: 'Website-Status', siteSlug: 'sitepulse-lab', path: '/tools/status-checker' },
          { label: 'Redirect-Kette', siteSlug: 'sitepulse-lab', path: '/tools/redirect-chain' },
          { label: 'Sicherheits-Header', siteSlug: 'sitepulse-lab', path: '/tools/security-headers' },
        ],
      },
      {
        title: 'Rechner und Zeit',
        links: [
          { label: 'Kreditrate', siteSlug: 'calcharbor', path: '/calculators/loan-payment' },
          { label: 'Break-even Point', siteSlug: 'calcharbor', path: '/calculators/break-even-point' },
          { label: 'Bruttomarge', siteSlug: 'calcharbor', path: '/calculators/gross-margin' },
          { label: 'ROI-Rechner', siteSlug: 'calcharbor', path: '/calculators/roi' },
          { label: 'Zeitzonen-Konverter', siteSlug: 'timenexus', path: '/tools/timezone-converter' },
          { label: 'Weltuhr', siteSlug: 'timenexus', path: '/world-clock/americas-europe' },
        ],
      },
      {
        title: 'Dev und QR',
        links: [
          { label: 'JSON-Formatter', siteSlug: 'devutility-lab', path: '/tools/structured-data-formatter' },
          { label: 'Base64-Konverter', siteSlug: 'devutility-lab', path: '/tools/base64-converter' },
          { label: 'JWT-Inspector', siteSlug: 'devutility-lab', path: '/tools/jwt-inspector' },
          { label: 'Regex-Tester', siteSlug: 'devutility-lab', path: '/tools/regex-tester' },
          { label: 'Statischer QR-Code', siteSlug: 'qrroute', path: '/tools/static-qr-code' },
          { label: 'UTM-Builder', siteSlug: 'qrroute', path: '/tools/utm-builder' },
          { label: 'Barcode-Generator', siteSlug: 'qrroute', path: '/tools/barcode-generator' },
        ],
      },
      {
        title: 'Dokumente und PDF',
        links: [
          { label: 'Rechnung erstellen', siteSlug: 'invoicecraft', path: '/tools/invoice-builder' },
          { label: 'Angebot erstellen', siteSlug: 'invoicecraft', path: '/tools/quote-builder' },
          { label: 'Quittung erstellen', siteSlug: 'invoicecraft', path: '/tools/receipt-builder' },
          { label: 'PDF zusammenführen', siteSlug: 'docshift', path: '/tools/pdf-merge' },
          { label: 'PDF teilen', siteSlug: 'docshift', path: '/tools/pdf-split' },
          { label: 'PDF drehen', siteSlug: 'docshift', path: '/tools/pdf-rotate' },
        ],
      },
      {
        title: 'Bilder',
        links: [
          { label: 'Bild komprimieren', siteSlug: 'pixelbatch', path: '/tools/image-compressor' },
          { label: 'Bild skalieren', siteSlug: 'pixelbatch', path: '/tools/image-resizer' },
          { label: 'Bild zuschneiden', siteSlug: 'pixelbatch', path: '/tools/image-cropper' },
          { label: 'Bild konvertieren', siteSlug: 'pixelbatch', path: '/tools/image-converter' },
          { label: 'Metadaten entfernen', siteSlug: 'pixelbatch', path: '/tools/metadata-remover' },
          { label: 'Social-Media-Formate', siteSlug: 'pixelbatch', path: '/tools/social-preset-generator' },
        ],
      },
    ],
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return sanitizePublicCopy(locale, homeCopy[locale])
}

export function getDetailCopy(locale: LocaleCode): DetailCopy {
  return sanitizePublicCopy(locale, detailCopy[locale])
}

export function getNetProbeCatalogCopy(locale: LocaleCode): NetProbeCatalogCopy {
  return sanitizePublicCopy(locale, netProbeCatalogCopy[locale])
}

export function getCalcHarborCatalogCopy(locale: LocaleCode): CalcHarborCatalogCopy {
  return sanitizePublicCopy(locale, calcHarborCatalogCopy[locale])
}

export function getDevUtilityCatalogCopy(locale: LocaleCode): DevUtilityCatalogCopy {
  return sanitizePublicCopy(locale, devUtilityCatalogCopy[locale])
}

export function getTimeNexusCatalogCopy(locale: LocaleCode): TimeNexusCatalogCopy {
  return sanitizePublicCopy(locale, timeNexusCatalogCopy[locale])
}

export function getFooterCopy(locale: LocaleCode): FooterCopy {
  return sanitizePublicCopy(locale, footerCopy[locale])
}
