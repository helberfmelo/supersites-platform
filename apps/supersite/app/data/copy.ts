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

export function getFooterCopy(locale: LocaleCode): FooterCopy {
  return sanitizePublicCopy(locale, footerCopy[locale])
}
