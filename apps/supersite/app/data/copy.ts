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

export interface FooterCopy {
  brandBody: string
  productNavLabel: string
  legalNavLabel: string
  groups: Array<{ title: string; siteSlugs: string[] }>
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
      { title: 'Diagnostics', siteSlugs: ['netprobe-atlas'] },
      { title: 'Calculators', siteSlugs: ['calcharbor'] },
      { title: 'Developer tools', siteSlugs: ['devutility-lab'] },
      { title: 'Time', siteSlugs: ['timenexus'] },
      { title: 'QR and links', siteSlugs: ['qrroute'] },
      { title: 'Documents', siteSlugs: ['invoicecraft', 'docshift'] },
      { title: 'Email', siteSlugs: ['mailhealth'] },
      { title: 'Website', siteSlugs: ['sitepulse-lab'] },
      { title: 'Images', siteSlugs: ['pixelbatch'] },
    ],
  },
  'pt-br': {
    brandBody: 'Um portfólio de ferramentas web práticas com páginas públicas localizadas, fluxos gratuitos úteis e recursos de conta bem separados.',
    productNavLabel: 'Verticais de produto',
    legalNavLabel: 'Páginas legais e editoriais',
    groups: [
      { title: 'Diagnóstico', siteSlugs: ['netprobe-atlas'] },
      { title: 'Calculadoras', siteSlugs: ['calcharbor'] },
      { title: 'Ferramentas dev', siteSlugs: ['devutility-lab'] },
      { title: 'Tempo', siteSlugs: ['timenexus'] },
      { title: 'QR e links', siteSlugs: ['qrroute'] },
      { title: 'Documentos', siteSlugs: ['invoicecraft', 'docshift'] },
      { title: 'E-mail', siteSlugs: ['mailhealth'] },
      { title: 'Sites', siteSlugs: ['sitepulse-lab'] },
      { title: 'Imagens', siteSlugs: ['pixelbatch'] },
    ],
  },
  es: {
    brandBody: 'Un portafolio de herramientas web prácticas con páginas localizadas, flujos gratuitos útiles y funciones de cuenta bien separadas.',
    productNavLabel: 'Verticales de producto',
    legalNavLabel: 'Páginas legales y editoriales',
    groups: [
      { title: 'Diagnóstico', siteSlugs: ['netprobe-atlas'] },
      { title: 'Calculadoras', siteSlugs: ['calcharbor'] },
      { title: 'Herramientas dev', siteSlugs: ['devutility-lab'] },
      { title: 'Tiempo', siteSlugs: ['timenexus'] },
      { title: 'QR y enlaces', siteSlugs: ['qrroute'] },
      { title: 'Documentos', siteSlugs: ['invoicecraft', 'docshift'] },
      { title: 'Email', siteSlugs: ['mailhealth'] },
      { title: 'Sitio web', siteSlugs: ['sitepulse-lab'] },
      { title: 'Imágenes', siteSlugs: ['pixelbatch'] },
    ],
  },
  fr: {
    brandBody: 'Un portefeuille d’outils web pratiques avec pages localisées, parcours gratuits utiles et fonctions de compte clairement séparées.',
    productNavLabel: 'Verticales produit',
    legalNavLabel: 'Pages légales et éditoriales',
    groups: [
      { title: 'Diagnostic', siteSlugs: ['netprobe-atlas'] },
      { title: 'Calculateurs', siteSlugs: ['calcharbor'] },
      { title: 'Outils dev', siteSlugs: ['devutility-lab'] },
      { title: 'Temps', siteSlugs: ['timenexus'] },
      { title: 'QR et liens', siteSlugs: ['qrroute'] },
      { title: 'Documents', siteSlugs: ['invoicecraft', 'docshift'] },
      { title: 'E-mail', siteSlugs: ['mailhealth'] },
      { title: 'Site web', siteSlugs: ['sitepulse-lab'] },
      { title: 'Images', siteSlugs: ['pixelbatch'] },
    ],
  },
  de: {
    brandBody: 'Ein Portfolio praktischer Web-Tools mit lokalisierten öffentlichen Seiten, nützlichen kostenlosen Abläufen und klar getrennten Konto-Funktionen.',
    productNavLabel: 'Produktbereiche',
    legalNavLabel: 'Rechtliche und redaktionelle Seiten',
    groups: [
      { title: 'Diagnostik', siteSlugs: ['netprobe-atlas'] },
      { title: 'Rechner', siteSlugs: ['calcharbor'] },
      { title: 'Entwickler-Tools', siteSlugs: ['devutility-lab'] },
      { title: 'Zeit', siteSlugs: ['timenexus'] },
      { title: 'QR und Links', siteSlugs: ['qrroute'] },
      { title: 'Dokumente', siteSlugs: ['invoicecraft', 'docshift'] },
      { title: 'E-Mail', siteSlugs: ['mailhealth'] },
      { title: 'Website', siteSlugs: ['sitepulse-lab'] },
      { title: 'Bilder', siteSlugs: ['pixelbatch'] },
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
