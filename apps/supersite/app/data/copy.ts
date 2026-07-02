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

export type QrRouteCatalogCategoryKey = 'qr' | 'barcode' | 'campaign' | 'contact' | 'network' | 'preview'

export interface QrRouteCatalogToolLink {
  label: string
  body: string
  path: string
  glyph: string
  category: QrRouteCatalogCategoryKey
  featured: boolean
}

export interface QrRouteCatalogShortcutGroup {
  title: string
  body: string
  paths: string[]
}

export interface QrRouteCatalogFooterGroup {
  title: string
  links: Array<{ label: string; path: string }>
}

export interface QrRouteCatalogCopy {
  eyebrow: string
  title: string
  lead: string
  primaryCta: string
  secondaryCta: string
  previewTitle: string
  previewPayloadLabel: string
  previewPayload: string
  previewBody: string
  previewMeta: Array<{ label: string; value: string }>
  browseTitle: string
  browseBody: string
  featuredTitle: string
  featuredBody: string
  staticDynamicTitle: string
  staticDynamicBody: string
  dynamicNoteTitle: string
  dynamicNoteBody: string
  searchLabel: string
  searchPlaceholder: string
  allCategories: string
  noResultsTitle: string
  noResultsBody: string
  allTitle: string
  allBody: string
  privacyTitle: string
  privacyBody: string
  toolCta: string
  categories: Array<{ key: QrRouteCatalogCategoryKey; label: string }>
  tools: QrRouteCatalogToolLink[]
  shortcutGroups: QrRouteCatalogShortcutGroup[]
  footerGroups: QrRouteCatalogFooterGroup[]
}

export type InvoiceCraftCatalogCategoryKey = 'invoice' | 'quote' | 'receipt'

export interface InvoiceCraftCatalogToolLink {
  label: string
  body: string
  path: string
  glyph: string
  category: InvoiceCraftCatalogCategoryKey
  featured: boolean
}

export interface InvoiceCraftCatalogShortcutGroup {
  title: string
  body: string
  paths: string[]
}

export interface InvoiceCraftCatalogFooterGroup {
  title: string
  links: Array<{ label: string; path: string }>
}

export interface InvoiceCraftCatalogCopy {
  eyebrow: string
  title: string
  lead: string
  primaryCta: string
  secondaryCta: string
  previewTitle: string
  previewBadge: string
  previewDocumentLabel: string
  previewDocumentValue: string
  previewClientLabel: string
  previewClientValue: string
  previewRows: Array<{ label: string; value: string }>
  previewTotalLabel: string
  previewTotalValue: string
  browseTitle: string
  browseBody: string
  featuredTitle: string
  featuredBody: string
  reviewTitle: string
  reviewBody: string
  privacyTitle: string
  privacyBody: string
  searchLabel: string
  searchPlaceholder: string
  allCategories: string
  noResultsTitle: string
  noResultsBody: string
  allTitle: string
  allBody: string
  toolCta: string
  categories: Array<{ key: InvoiceCraftCatalogCategoryKey; label: string }>
  tools: InvoiceCraftCatalogToolLink[]
  shortcutGroups: InvoiceCraftCatalogShortcutGroup[]
  footerGroups: InvoiceCraftCatalogFooterGroup[]
}

export type MailHealthCatalogCategoryKey = 'authentication' | 'dns' | 'reputation' | 'transport' | 'headers'

export interface MailHealthCatalogToolLink {
  label: string
  body: string
  path: string
  glyph: string
  category: MailHealthCatalogCategoryKey
  featured: boolean
}

export interface MailHealthCatalogShortcutGroup {
  title: string
  body: string
  paths: string[]
}

export interface MailHealthCatalogFooterGroup {
  title: string
  links: Array<{ label: string; path: string }>
}

export interface MailHealthCatalogSignal {
  label: string
  status: string
  detail: string
}

export interface MailHealthCatalogCopy {
  eyebrow: string
  title: string
  lead: string
  primaryCta: string
  secondaryCta: string
  reportTitle: string
  reportDomainLabel: string
  reportDomainValue: string
  reportScoreLabel: string
  reportScoreValue: string
  reportGrade: string
  reportBody: string
  reportSignals: MailHealthCatalogSignal[]
  browseTitle: string
  browseBody: string
  featuredTitle: string
  featuredBody: string
  limitsTitle: string
  limitsBody: string
  privacyTitle: string
  privacyBody: string
  searchLabel: string
  searchPlaceholder: string
  allCategories: string
  noResultsTitle: string
  noResultsBody: string
  allTitle: string
  allBody: string
  toolCta: string
  categories: Array<{ key: MailHealthCatalogCategoryKey; label: string }>
  tools: MailHealthCatalogToolLink[]
  shortcutGroups: MailHealthCatalogShortcutGroup[]
  footerGroups: MailHealthCatalogFooterGroup[]
}

export type SitePulseCatalogCategoryKey = 'availability' | 'routing' | 'security' | 'crawlability' | 'performance'

export interface SitePulseCatalogToolLink {
  label: string
  body: string
  path: string
  glyph: string
  category: SitePulseCatalogCategoryKey
  featured: boolean
}

export interface SitePulseCatalogShortcutGroup {
  title: string
  body: string
  paths: string[]
}

export interface SitePulseCatalogFooterGroup {
  title: string
  links: Array<{ label: string; path: string }>
}

export interface SitePulseCatalogSignal {
  label: string
  status: string
  detail: string
}

export interface SitePulseCatalogCopy {
  eyebrow: string
  title: string
  lead: string
  primaryCta: string
  secondaryCta: string
  reportTitle: string
  reportUrlLabel: string
  reportUrlValue: string
  reportScoreLabel: string
  reportScoreValue: string
  reportGrade: string
  reportBody: string
  reportSignals: SitePulseCatalogSignal[]
  browseTitle: string
  browseBody: string
  featuredTitle: string
  featuredBody: string
  limitsTitle: string
  limitsBody: string
  privacyTitle: string
  privacyBody: string
  searchLabel: string
  searchPlaceholder: string
  allCategories: string
  noResultsTitle: string
  noResultsBody: string
  allTitle: string
  allBody: string
  toolCta: string
  categories: Array<{ key: SitePulseCatalogCategoryKey; label: string }>
  tools: SitePulseCatalogToolLink[]
  shortcutGroups: SitePulseCatalogShortcutGroup[]
  footerGroups: SitePulseCatalogFooterGroup[]
}

export type PixelBatchCatalogCategoryKey = 'optimize' | 'resize' | 'crop' | 'convert' | 'privacy' | 'presets'

export interface PixelBatchCatalogToolLink {
  label: string
  body: string
  path: string
  glyph: string
  category: PixelBatchCatalogCategoryKey
  featured: boolean
}

export interface PixelBatchCatalogShortcutGroup {
  title: string
  body: string
  paths: string[]
}

export interface PixelBatchCatalogFooterGroup {
  title: string
  links: Array<{ label: string; path: string }>
}

export interface PixelBatchCatalogPreviewRow {
  label: string
  value: string
}

export interface PixelBatchCatalogCopy {
  eyebrow: string
  title: string
  lead: string
  primaryCta: string
  secondaryCta: string
  dropTitle: string
  dropBody: string
  dropAction: string
  dropPrivacy: string
  dropFormatsLabel: string
  dropFormats: string
  previewTitle: string
  previewRows: PixelBatchCatalogPreviewRow[]
  browseTitle: string
  browseBody: string
  featuredTitle: string
  featuredBody: string
  limitsTitle: string
  limitsBody: string
  privacyTitle: string
  privacyBody: string
  searchLabel: string
  searchPlaceholder: string
  allCategories: string
  noResultsTitle: string
  noResultsBody: string
  allTitle: string
  allBody: string
  toolCta: string
  categories: Array<{ key: PixelBatchCatalogCategoryKey; label: string }>
  tools: PixelBatchCatalogToolLink[]
  shortcutGroups: PixelBatchCatalogShortcutGroup[]
  footerGroups: PixelBatchCatalogFooterGroup[]
}

export type DocShiftCatalogCategoryKey = 'organize' | 'pages' | 'optimize' | 'annotate' | 'privacy' | 'convert'

export interface DocShiftCatalogToolLink {
  label: string
  body: string
  path: string
  glyph: string
  category: DocShiftCatalogCategoryKey
  featured: boolean
}

export interface DocShiftCatalogShortcutGroup {
  title: string
  body: string
  paths: string[]
}

export interface DocShiftCatalogFooterGroup {
  title: string
  links: Array<{ label: string; path: string }>
}

export interface DocShiftCatalogPreviewRow {
  label: string
  value: string
}

export interface DocShiftCatalogCopy {
  eyebrow: string
  title: string
  lead: string
  primaryCta: string
  secondaryCta: string
  dropTitle: string
  dropBody: string
  dropAction: string
  dropPrivacy: string
  dropFormatsLabel: string
  dropFormats: string
  previewTitle: string
  previewRows: DocShiftCatalogPreviewRow[]
  browseTitle: string
  browseBody: string
  featuredTitle: string
  featuredBody: string
  limitsTitle: string
  limitsBody: string
  privacyTitle: string
  privacyBody: string
  searchLabel: string
  searchPlaceholder: string
  allCategories: string
  noResultsTitle: string
  noResultsBody: string
  allTitle: string
  allBody: string
  toolCta: string
  categories: Array<{ key: DocShiftCatalogCategoryKey; label: string }>
  tools: DocShiftCatalogToolLink[]
  shortcutGroups: DocShiftCatalogShortcutGroup[]
  footerGroups: DocShiftCatalogFooterGroup[]
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
      { title: 'Marketing math', body: 'Campaign calculators need clear attribution limits before they are useful for public comparison.' },
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
      { title: 'Matemática de marketing', body: 'Calculadoras de campanha precisam declarar limites de atribuição para comparação pública útil.' },
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
    paidBenefitsTitle: 'Advanced workflows',
    detailsTitle: 'How this tool family helps',
    temporaryUrlLabel: 'Public URL',
    categoryLabel: 'Category',
    statusLabel: 'Status',
    launchOrderLabel: 'Product family',
    methodologyTitle: 'Result-first method',
    methodologyBody: 'This page summarizes the free workflow, the result a visitor receives first and the practical next step after the tool finishes.',
    backToCatalog: 'Back to catalog',
    localDevCta: 'Open local NetProbe tools',
    publicCta: 'Open public site',
    relatedTitle: 'Related operating notes',
  },
  'pt-br': {
    breadcrumbHome: 'Catálogo',
    freeToolsTitle: 'Escopo gratuito da ferramenta',
    paidBenefitsTitle: 'Fluxos avançados',
    detailsTitle: 'Como esta família ajuda',
    temporaryUrlLabel: 'URL pública',
    categoryLabel: 'Categoria',
    statusLabel: 'Status',
    launchOrderLabel: 'Família de produto',
    methodologyTitle: 'Método com resultado primeiro',
    methodologyBody: 'Esta página resume o fluxo gratuito, o resultado que a pessoa recebe primeiro e o próximo passo prático depois que a ferramenta termina.',
    backToCatalog: 'Voltar ao catálogo',
    localDevCta: 'Abrir NetProbe local',
    publicCta: 'Abrir site público',
    relatedTitle: 'Notas operacionais relacionadas',
  },
  es: {
    breadcrumbHome: 'Catálogo',
    freeToolsTitle: 'Alcance gratuito de la herramienta',
    paidBenefitsTitle: 'Flujos avanzados',
    detailsTitle: 'Cómo ayuda esta familia',
    temporaryUrlLabel: 'URL pública',
    categoryLabel: 'Categoría',
    statusLabel: 'Estado',
    launchOrderLabel: 'Familia de producto',
    methodologyTitle: 'Método con resultado primero',
    methodologyBody: 'Esta página resume el flujo gratuito, el resultado que recibe la persona primero y el siguiente paso práctico cuando termina la herramienta.',
    backToCatalog: 'Volver al catálogo',
    localDevCta: 'Abrir NetProbe local',
    publicCta: 'Abrir sitio público',
    relatedTitle: 'Notas operativas relacionadas',
  },
  fr: {
    breadcrumbHome: 'Catalogue',
    freeToolsTitle: 'Portée gratuite de l’outil',
    paidBenefitsTitle: 'Flux avancés',
    detailsTitle: 'Comment cette famille aide',
    temporaryUrlLabel: 'URL publique',
    categoryLabel: 'Catégorie',
    statusLabel: 'Statut',
    launchOrderLabel: 'Famille de produit',
    methodologyTitle: 'Méthode résultat d’abord',
    methodologyBody: 'Cette page résume le flux gratuit, le résultat reçu en premier et l’action pratique à suivre lorsque l’outil termine.',
    backToCatalog: 'Retour au catalogue',
    localDevCta: 'Ouvrir NetProbe local',
    publicCta: 'Ouvrir le site public',
    relatedTitle: 'Notes opérationnelles liées',
  },
  de: {
    breadcrumbHome: 'Katalog',
    freeToolsTitle: 'Kostenloser Tool-Umfang',
    paidBenefitsTitle: 'Erweiterte Workflows',
    detailsTitle: 'Wie diese Tool-Familie hilft',
    temporaryUrlLabel: 'Oeffentliche URL',
    categoryLabel: 'Kategorie',
    statusLabel: 'Status',
    launchOrderLabel: 'Produktfamilie',
    methodologyTitle: 'Ergebnis zuerst',
    methodologyBody: 'Diese Seite fasst den kostenlosen Ablauf, das erste Ergebnis fuer Besucher und den praktischen naechsten Schritt nach dem Tool zusammen.',
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

export const qrRouteCatalogCopy: Record<LocaleCode, QrRouteCatalogCopy> = {
  en: {
    eyebrow: 'QR codes, barcodes and campaign links',
    title: 'Generate a QR code or campaign asset with a live preview.',
    lead: 'Start with static QR, Wi-Fi, vCard, UTM, barcode and payload preview tools. The free workflow runs in the browser before any account path.',
    primaryCta: 'Open static QR generator',
    secondaryCta: 'Browse QRRoute tools',
    previewTitle: 'Live static preview',
    previewPayloadLabel: 'Sample payload',
    previewPayload: 'https://example.com/product-launch',
    previewBody: 'A fixed payload is enough for flyers, labels, event tables and simple campaign links when the destination is final.',
    previewMeta: [
      { label: 'Code type', value: 'Static QR' },
      { label: 'Generated in', value: 'Browser' },
      { label: 'Output', value: 'SVG preview' },
    ],
    browseTitle: 'Choose by asset type',
    browseBody: 'QRRoute follows the common generator mental model: QR first, then campaign URL, contact, Wi-Fi, barcode and inspection flows.',
    featuredTitle: 'Start with the common QRRoute jobs',
    featuredBody: 'Open the exact public tool for one-off QR creation, Wi-Fi sharing, vCard contact codes, tagged URLs or short barcode values.',
    staticDynamicTitle: 'Static first, dynamic later',
    staticDynamicBody: 'Static codes keep the encoded payload fixed. Managed dynamic redirects need account, abuse and privacy controls before they can be offered.',
    dynamicNoteTitle: 'No scan tracking in the free builder',
    dynamicNoteBody: 'The public tools create and inspect local payloads. Scan analytics, editable destinations, custom domains and bulk jobs stay outside the free static flow.',
    searchLabel: 'Search QRRoute tools',
    searchPlaceholder: 'Try QR, UTM, Wi-Fi, vCard, barcode...',
    allCategories: 'All QRRoute tools',
    noResultsTitle: 'No matching QRRoute tool',
    noResultsBody: 'Try another keyword or category. Only public QRRoute pages that already exist are linked here.',
    allTitle: 'All published QRRoute tools',
    allBody: 'Move between static QR, barcode, campaign URL, contact card, Wi-Fi and payload inspection pages.',
    privacyTitle: 'Local payloads',
    privacyBody: 'URLs, contact details, Wi-Fi values and barcode text stay in this browser session. The catalog links to free pages without storing entries.',
    toolCta: 'Open tool',
    categories: [
      { key: 'qr', label: 'QR Codes' },
      { key: 'barcode', label: 'Barcodes' },
      { key: 'campaign', label: 'Campaign Links' },
      { key: 'contact', label: 'Contact Cards' },
      { key: 'network', label: 'Wi-Fi' },
      { key: 'preview', label: 'Preview' },
    ],
    tools: [
      { label: 'Static QR Code', body: 'Create a scannable static QR for a safe URL, text, email or phone payload.', path: '/tools/static-qr-code', glyph: 'QR', category: 'qr', featured: true },
      { label: 'Barcode Generator', body: 'Render a Code 128 preview for inventory, ticket or reference values.', path: '/tools/barcode-generator', glyph: 'BAR', category: 'barcode', featured: true },
      { label: 'UTM Builder', body: 'Build a tagged campaign URL and QR preview without sending the URL to a server.', path: '/tools/utm-builder', glyph: 'UTM', category: 'campaign', featured: true },
      { label: 'vCard QR Builder', body: 'Turn a compact contact profile into a QR-ready vCard payload.', path: '/tools/vcard-qr', glyph: 'VCF', category: 'contact', featured: true },
      { label: 'Wi-Fi QR Builder', body: 'Create a local Wi-Fi payload for WPA, WEP or open networks.', path: '/tools/wifi-qr', glyph: 'WIFI', category: 'network', featured: true },
      { label: 'QR Preview Lab', body: 'Inspect a static payload before printing and check basic URL safety notes.', path: '/tools/preview-lab', glyph: 'VIEW', category: 'preview', featured: false },
    ],
    shortcutGroups: [
      { title: 'Make a scannable code', body: 'Start with QR payloads people can use from a phone camera.', paths: ['/tools/static-qr-code', '/tools/wifi-qr', '/tools/vcard-qr'] },
      { title: 'Prepare campaign assets', body: 'Tag a destination, create a barcode or inspect a payload before sharing.', paths: ['/tools/utm-builder', '/tools/barcode-generator', '/tools/preview-lab'] },
      { title: 'Check before printing', body: 'Review what will be encoded before flyers, labels or cards are produced.', paths: ['/tools/preview-lab', '/tools/static-qr-code', '/tools/barcode-generator'] },
    ],
    footerGroups: [
      { title: 'QR Codes', links: [{ label: 'Static QR Code', path: '/tools/static-qr-code' }, { label: 'QR Preview Lab', path: '/tools/preview-lab' }] },
      { title: 'Campaign Links', links: [{ label: 'UTM Builder', path: '/tools/utm-builder' }, { label: 'Static QR for URLs', path: '/tools/static-qr-code' }] },
      { title: 'Cards and Wi-Fi', links: [{ label: 'vCard QR Builder', path: '/tools/vcard-qr' }, { label: 'Wi-Fi QR Builder', path: '/tools/wifi-qr' }] },
      { title: 'Barcodes', links: [{ label: 'Barcode Generator', path: '/tools/barcode-generator' }, { label: 'Preview a payload', path: '/tools/preview-lab' }] },
      { title: 'Before printing', links: [{ label: 'Inspect QR payload', path: '/tools/preview-lab' }, { label: 'Create flyer QR', path: '/tools/static-qr-code' }, { label: 'Campaign URL', path: '/tools/utm-builder' }] },
    ],
  },
  'pt-br': {
    eyebrow: 'QR, códigos de barras e links de campanha',
    title: 'Gere um QR ou ativo de campanha com prévia ao vivo.',
    lead: 'Comece por QR estático, Wi-Fi, vCard, UTM, código de barras e inspeção de payload. O fluxo gratuito roda no navegador antes de qualquer caminho de conta.',
    primaryCta: 'Abrir gerador de QR estático',
    secondaryCta: 'Ver ferramentas QRRoute',
    previewTitle: 'Prévia estática ao vivo',
    previewPayloadLabel: 'Payload de exemplo',
    previewPayload: 'https://example.com/lancamento-produto',
    previewBody: 'Um payload fixo resolve folhetos, etiquetas, mesas de evento e links simples quando o destino já está definido.',
    previewMeta: [
      { label: 'Tipo de código', value: 'QR estático' },
      { label: 'Gerado no', value: 'Navegador' },
      { label: 'Saída', value: 'Prévia SVG' },
    ],
    browseTitle: 'Escolha por tipo de ativo',
    browseBody: 'O QRRoute segue o modelo comum de geradores: QR primeiro, depois URL de campanha, contato, Wi-Fi, código de barras e inspeção.',
    featuredTitle: 'Comece pelos trabalhos comuns do QRRoute',
    featuredBody: 'Abra a ferramenta pública exata para QR pontual, Wi-Fi, contato vCard, URL com tags ou valores curtos de código de barras.',
    staticDynamicTitle: 'Estático primeiro, dinâmico depois',
    staticDynamicBody: 'Códigos estáticos mantêm o payload fixo. Redirecionamentos dinâmicos gerenciados exigem conta, antiabuso e privacidade antes de serem oferecidos.',
    dynamicNoteTitle: 'Sem rastreamento de scans no gerador gratuito',
    dynamicNoteBody: 'As ferramentas públicas criam e inspecionam payloads locais. Analytics de scan, destinos editáveis, domínios próprios e lote ficam fora do fluxo estático gratuito.',
    searchLabel: 'Buscar ferramentas QRRoute',
    searchPlaceholder: 'Tente QR, UTM, Wi-Fi, vCard, código de barras...',
    allCategories: 'Todas as ferramentas QRRoute',
    noResultsTitle: 'Nenhuma ferramenta QRRoute encontrada',
    noResultsBody: 'Tente outra palavra ou categoria. Só entram links para páginas QRRoute públicas existentes.',
    allTitle: 'Todas as ferramentas QRRoute publicadas',
    allBody: 'Alterne entre QR estático, código de barras, URL de campanha, cartão de contato, Wi-Fi e inspeção de payload.',
    privacyTitle: 'Payloads locais',
    privacyBody: 'URLs, contatos, valores Wi-Fi e texto de código de barras ficam nesta sessão do navegador. O catálogo abre páginas gratuitas sem armazenar entradas.',
    toolCta: 'Abrir ferramenta',
    categories: [
      { key: 'qr', label: 'QR codes' },
      { key: 'barcode', label: 'Códigos de barras' },
      { key: 'campaign', label: 'Links de campanha' },
      { key: 'contact', label: 'Cartões de contato' },
      { key: 'network', label: 'Wi-Fi' },
      { key: 'preview', label: 'Prévia' },
    ],
    tools: [
      { label: 'QR estático', body: 'Crie um QR escaneável para URL segura, texto, e-mail ou telefone.', path: '/tools/static-qr-code', glyph: 'QR', category: 'qr', featured: true },
      { label: 'Gerador de código de barras', body: 'Renderize uma prévia Code 128 para estoque, ingresso ou referência.', path: '/tools/barcode-generator', glyph: 'BAR', category: 'barcode', featured: true },
      { label: 'Gerador UTM', body: 'Monte uma URL de campanha com tags e prévia QR sem enviar a URL ao servidor.', path: '/tools/utm-builder', glyph: 'UTM', category: 'campaign', featured: true },
      { label: 'Gerador de vCard QR', body: 'Transforme um contato compacto em payload vCard pronto para QR.', path: '/tools/vcard-qr', glyph: 'VCF', category: 'contact', featured: true },
      { label: 'Gerador de QR Wi-Fi', body: 'Crie um payload Wi-Fi local para WPA, WEP ou redes abertas.', path: '/tools/wifi-qr', glyph: 'WIFI', category: 'network', featured: true },
      { label: 'Laboratório de prévia QR', body: 'Inspecione um payload estático antes de imprimir e veja notas básicas de segurança.', path: '/tools/preview-lab', glyph: 'VER', category: 'preview', featured: false },
    ],
    shortcutGroups: [
      { title: 'Criar um código escaneável', body: 'Comece por payloads QR que podem ser usados pela câmera do celular.', paths: ['/tools/static-qr-code', '/tools/wifi-qr', '/tools/vcard-qr'] },
      { title: 'Preparar ativos de campanha', body: 'Marque um destino, gere código de barras ou inspecione payload antes do lançamento.', paths: ['/tools/utm-builder', '/tools/barcode-generator', '/tools/preview-lab'] },
      { title: 'Conferir antes de imprimir', body: 'Revise o que será codificado antes de produzir folhetos, etiquetas ou cartões.', paths: ['/tools/preview-lab', '/tools/static-qr-code', '/tools/barcode-generator'] },
    ],
    footerGroups: [
      { title: 'QR codes', links: [{ label: 'QR estático', path: '/tools/static-qr-code' }, { label: 'Prévia QR', path: '/tools/preview-lab' }] },
      { title: 'Links de campanha', links: [{ label: 'Gerador UTM', path: '/tools/utm-builder' }, { label: 'QR para URLs', path: '/tools/static-qr-code' }] },
      { title: 'Contato e Wi-Fi', links: [{ label: 'vCard QR', path: '/tools/vcard-qr' }, { label: 'QR Wi-Fi', path: '/tools/wifi-qr' }] },
      { title: 'Códigos de barras', links: [{ label: 'Gerador de código de barras', path: '/tools/barcode-generator' }, { label: 'Inspecionar payload', path: '/tools/preview-lab' }] },
      { title: 'Antes de imprimir', links: [{ label: 'Inspecionar QR', path: '/tools/preview-lab' }, { label: 'QR para folheto', path: '/tools/static-qr-code' }, { label: 'URL de campanha', path: '/tools/utm-builder' }] },
    ],
  },
  es: {
    eyebrow: 'QR, códigos de barras y enlaces de campaña',
    title: 'Genera un QR o activo de campaña con vista previa.',
    lead: 'Empieza con QR estático, Wi-Fi, vCard, UTM, código de barras e inspección de payload. El flujo gratis corre en el navegador antes de cualquier cuenta.',
    primaryCta: 'Abrir generador QR estático',
    secondaryCta: 'Ver herramientas QRRoute',
    previewTitle: 'Vista previa estática',
    previewPayloadLabel: 'Payload de ejemplo',
    previewPayload: 'https://example.com/lanzamiento-producto',
    previewBody: 'Un payload fijo sirve para folletos, etiquetas, mesas de evento y enlaces simples cuando el destino ya está definido.',
    previewMeta: [
      { label: 'Tipo de código', value: 'QR estático' },
      { label: 'Generado en', value: 'Navegador' },
      { label: 'Salida', value: 'Vista SVG' },
    ],
    browseTitle: 'Elige por tipo de activo',
    browseBody: 'QRRoute sigue el modelo común de generadores: QR primero, luego URL de campaña, contacto, Wi-Fi, código de barras e inspección.',
    featuredTitle: 'Empieza por trabajos comunes de QRRoute',
    featuredBody: 'Abre la herramienta pública exacta para QR puntual, Wi-Fi, contacto vCard, URL etiquetada o códigos de barras cortos.',
    staticDynamicTitle: 'Estático primero, dinámico después',
    staticDynamicBody: 'Los códigos estáticos mantienen el payload fijo. Redirecciones dinámicas gestionadas necesitan cuenta, antiabuso y privacidad antes de ofrecerse.',
    dynamicNoteTitle: 'Sin seguimiento de escaneos en el generador gratis',
    dynamicNoteBody: 'Las herramientas públicas crean e inspeccionan payloads locales. Analytics de escaneo, destinos editables, dominios propios y lotes quedan fuera del flujo estático gratis.',
    searchLabel: 'Buscar herramientas QRRoute',
    searchPlaceholder: 'Prueba QR, UTM, Wi-Fi, vCard, código de barras...',
    allCategories: 'Todas las herramientas QRRoute',
    noResultsTitle: 'No hay herramienta QRRoute coincidente',
    noResultsBody: 'Prueba otra palabra o categoría. Solo enlazamos páginas públicas QRRoute existentes.',
    allTitle: 'Todas las herramientas QRRoute publicadas',
    allBody: 'Alterna entre QR estático, código de barras, URL de campaña, tarjeta de contacto, Wi-Fi e inspección de payload.',
    privacyTitle: 'Payloads locales',
    privacyBody: 'URLs, contactos, valores Wi-Fi y texto de código de barras quedan en esta sesión del navegador. El catálogo abre páginas gratis sin almacenar entradas.',
    toolCta: 'Abrir herramienta',
    categories: [
      { key: 'qr', label: 'QR codes' },
      { key: 'barcode', label: 'Códigos de barras' },
      { key: 'campaign', label: 'Enlaces de campaña' },
      { key: 'contact', label: 'Tarjetas de contacto' },
      { key: 'network', label: 'Wi-Fi' },
      { key: 'preview', label: 'Vista previa' },
    ],
    tools: [
      { label: 'QR estático', body: 'Crea un QR escaneable para URL segura, texto, email o teléfono.', path: '/tools/static-qr-code', glyph: 'QR', category: 'qr', featured: true },
      { label: 'Generador de código de barras', body: 'Renderiza una vista Code 128 para inventario, ticket o referencia.', path: '/tools/barcode-generator', glyph: 'BAR', category: 'barcode', featured: true },
      { label: 'Generador UTM', body: 'Crea una URL de campaña con etiquetas y vista QR sin enviar la URL al servidor.', path: '/tools/utm-builder', glyph: 'UTM', category: 'campaign', featured: true },
      { label: 'Generador vCard QR', body: 'Convierte un contacto compacto en payload vCard listo para QR.', path: '/tools/vcard-qr', glyph: 'VCF', category: 'contact', featured: true },
      { label: 'Generador QR Wi-Fi', body: 'Crea un payload Wi-Fi local para WPA, WEP o redes abiertas.', path: '/tools/wifi-qr', glyph: 'WIFI', category: 'network', featured: true },
      { label: 'Laboratorio de vista QR', body: 'Inspecciona un payload estático antes de imprimir y revisa notas básicas de seguridad.', path: '/tools/preview-lab', glyph: 'VER', category: 'preview', featured: false },
    ],
    shortcutGroups: [
      { title: 'Crear un código escaneable', body: 'Empieza por payloads QR que se usan desde la cámara del móvil.', paths: ['/tools/static-qr-code', '/tools/wifi-qr', '/tools/vcard-qr'] },
      { title: 'Preparar activos de campaña', body: 'Etiqueta un destino, genera código de barras o inspecciona payload antes del lanzamiento.', paths: ['/tools/utm-builder', '/tools/barcode-generator', '/tools/preview-lab'] },
      { title: 'Revisar antes de imprimir', body: 'Comprueba lo codificado antes de producir folletos, etiquetas o tarjetas.', paths: ['/tools/preview-lab', '/tools/static-qr-code', '/tools/barcode-generator'] },
    ],
    footerGroups: [
      { title: 'QR codes', links: [{ label: 'QR estático', path: '/tools/static-qr-code' }, { label: 'Vista QR', path: '/tools/preview-lab' }] },
      { title: 'Campañas', links: [{ label: 'Generador UTM', path: '/tools/utm-builder' }, { label: 'QR para URLs', path: '/tools/static-qr-code' }] },
      { title: 'Contacto y Wi-Fi', links: [{ label: 'vCard QR', path: '/tools/vcard-qr' }, { label: 'QR Wi-Fi', path: '/tools/wifi-qr' }] },
      { title: 'Códigos de barras', links: [{ label: 'Generador de código de barras', path: '/tools/barcode-generator' }, { label: 'Inspeccionar payload', path: '/tools/preview-lab' }] },
      { title: 'Antes de imprimir', links: [{ label: 'Inspeccionar QR', path: '/tools/preview-lab' }, { label: 'QR para folleto', path: '/tools/static-qr-code' }, { label: 'URL de campaña', path: '/tools/utm-builder' }] },
    ],
  },
  fr: {
    eyebrow: 'QR, codes-barres et liens de campagne',
    title: 'Générez un QR ou contenu de campagne avec aperçu.',
    lead: 'Commencez par QR statique, Wi-Fi, vCard, UTM, code-barres et inspection de payload. Le parcours gratuit reste dans le navigateur avant tout compte.',
    primaryCta: 'Ouvrir le générateur QR statique',
    secondaryCta: 'Voir les outils QRRoute',
    previewTitle: 'Aperçu statique',
    previewPayloadLabel: 'Payload exemple',
    previewPayload: 'https://example.com/lancement-produit',
    previewBody: 'Un payload fixe suffit pour flyers, étiquettes, tables événement et liens simples quand la destination est définitive.',
    previewMeta: [
      { label: 'Type de code', value: 'QR statique' },
      { label: 'Généré dans', value: 'Navigateur' },
      { label: 'Sortie', value: 'Aperçu SVG' },
    ],
    browseTitle: 'Choisir par type de contenu',
    browseBody: 'QRRoute suit le modèle courant des générateurs: QR, puis URL de campagne, contact, Wi-Fi, code-barres et inspection.',
    featuredTitle: 'Commencer par les usages QRRoute courants',
    featuredBody: 'Ouvrez l outil public exact pour QR ponctuel, Wi-Fi, contact vCard, URL taguée ou valeur courte de code-barres.',
    staticDynamicTitle: 'Statique d abord, dynamique ensuite',
    staticDynamicBody: 'Les codes statiques gardent le payload fixe. Les redirections dynamiques gérées exigent compte, anti-abus et confidentialité avant publication.',
    dynamicNoteTitle: 'Aucun suivi de scans dans le générateur gratuit',
    dynamicNoteBody: 'Les outils publics créent et inspectent des payloads locaux. Analytics de scan, destinations éditables, domaines propres et lots restent hors du flux statique gratuit.',
    searchLabel: 'Chercher des outils QRRoute',
    searchPlaceholder: 'Essayez QR, UTM, Wi-Fi, vCard, code-barres...',
    allCategories: 'Tous les outils QRRoute',
    noResultsTitle: 'Aucun outil QRRoute trouvé',
    noResultsBody: 'Essayez un autre mot ou une catégorie. Seules les pages QRRoute publiques existantes sont liées.',
    allTitle: 'Tous les outils QRRoute publiés',
    allBody: 'Passez entre QR statique, code-barres, URL de campagne, fiche contact, Wi-Fi et inspection de payload.',
    privacyTitle: 'Payloads locaux',
    privacyBody: 'URLs, contacts, valeurs Wi-Fi et texte de code-barres restent dans cette session navigateur. Le catalogue ouvre des pages gratuites sans stocker les entrées.',
    toolCta: 'Ouvrir l outil',
    categories: [
      { key: 'qr', label: 'QR codes' },
      { key: 'barcode', label: 'Codes-barres' },
      { key: 'campaign', label: 'Liens campagne' },
      { key: 'contact', label: 'Fiches contact' },
      { key: 'network', label: 'Wi-Fi' },
      { key: 'preview', label: 'Aperçu' },
    ],
    tools: [
      { label: 'QR statique', body: 'Créez un QR scannable pour URL sûre, texte, e-mail ou téléphone.', path: '/tools/static-qr-code', glyph: 'QR', category: 'qr', featured: true },
      { label: 'Générateur de code-barres', body: 'Rendez un aperçu Code 128 pour inventaire, billet ou référence.', path: '/tools/barcode-generator', glyph: 'BAR', category: 'barcode', featured: true },
      { label: 'Générateur UTM', body: 'Créez une URL de campagne taguée et un aperçu QR sans envoyer l URL au serveur.', path: '/tools/utm-builder', glyph: 'UTM', category: 'campaign', featured: true },
      { label: 'Générateur vCard QR', body: 'Transformez un contact compact en payload vCard prêt pour QR.', path: '/tools/vcard-qr', glyph: 'VCF', category: 'contact', featured: true },
      { label: 'Générateur QR Wi-Fi', body: 'Créez un payload Wi-Fi local pour WPA, WEP ou réseau ouvert.', path: '/tools/wifi-qr', glyph: 'WIFI', category: 'network', featured: true },
      { label: 'Laboratoire aperçu QR', body: 'Inspectez un payload statique avant impression et vérifiez des notes de sécurité.', path: '/tools/preview-lab', glyph: 'VOIR', category: 'preview', featured: false },
    ],
    shortcutGroups: [
      { title: 'Créer un code scannable', body: 'Commencez par des payloads QR utilisables depuis la caméra mobile.', paths: ['/tools/static-qr-code', '/tools/wifi-qr', '/tools/vcard-qr'] },
      { title: 'Préparer des contenus campagne', body: 'Taguez une destination, générez un code-barres ou inspectez le payload avant lancement.', paths: ['/tools/utm-builder', '/tools/barcode-generator', '/tools/preview-lab'] },
      { title: 'Vérifier avant impression', body: 'Revoyez ce qui sera encodé avant flyers, étiquettes ou cartes.', paths: ['/tools/preview-lab', '/tools/static-qr-code', '/tools/barcode-generator'] },
    ],
    footerGroups: [
      { title: 'QR codes', links: [{ label: 'QR statique', path: '/tools/static-qr-code' }, { label: 'Aperçu QR', path: '/tools/preview-lab' }] },
      { title: 'Campagnes', links: [{ label: 'Générateur UTM', path: '/tools/utm-builder' }, { label: 'QR pour URLs', path: '/tools/static-qr-code' }] },
      { title: 'Contact et Wi-Fi', links: [{ label: 'vCard QR', path: '/tools/vcard-qr' }, { label: 'QR Wi-Fi', path: '/tools/wifi-qr' }] },
      { title: 'Codes-barres', links: [{ label: 'Générateur code-barres', path: '/tools/barcode-generator' }, { label: 'Inspecter payload', path: '/tools/preview-lab' }] },
      { title: 'Avant impression', links: [{ label: 'Inspecter QR', path: '/tools/preview-lab' }, { label: 'QR flyer', path: '/tools/static-qr-code' }, { label: 'URL campagne', path: '/tools/utm-builder' }] },
    ],
  },
  de: {
    eyebrow: 'QR-Codes, Barcodes und Kampagnenlinks',
    title: 'Erstellen Sie QR- oder Kampagnenmaterial mit Vorschau.',
    lead: 'Starten Sie mit statischem QR, Wi-Fi, vCard, UTM, Barcode und Payload-Prüfung. Der kostenlose Ablauf läuft im Browser vor jedem Konto-Pfad.',
    primaryCta: 'Statischen QR-Generator öffnen',
    secondaryCta: 'QRRoute-Tools ansehen',
    previewTitle: 'Statische Live-Vorschau',
    previewPayloadLabel: 'Beispiel-Payload',
    previewPayload: 'https://example.com/produktstart',
    previewBody: 'Ein fester Payload reicht für Flyer, Etiketten, Event-Tische und einfache Links, wenn das Ziel final ist.',
    previewMeta: [
      { label: 'Code-Typ', value: 'Statischer QR' },
      { label: 'Erzeugt im', value: 'Browser' },
      { label: 'Ausgabe', value: 'SVG-Vorschau' },
    ],
    browseTitle: 'Nach Asset-Typ wählen',
    browseBody: 'QRRoute folgt dem bekannten Generator-Modell: QR zuerst, dann Kampagnen-URL, Kontakt, Wi-Fi, Barcode und Prüfung.',
    featuredTitle: 'Mit häufigen QRRoute-Aufgaben starten',
    featuredBody: 'Öffnen Sie das passende öffentliche Tool für QR, Wi-Fi, vCard-Kontakt, getaggte URL oder kurze Barcode-Werte.',
    staticDynamicTitle: 'Erst statisch, später dynamisch',
    staticDynamicBody: 'Statische Codes behalten den Payload fest. Verwaltete dynamische Redirects brauchen Konto-, Missbrauchs- und Datenschutzkontrollen vor dem Angebot.',
    dynamicNoteTitle: 'Kein Scan-Tracking im kostenlosen Generator',
    dynamicNoteBody: 'Die öffentlichen Tools erstellen und prüfen lokale Payloads. Scan-Analytics, editierbare Ziele, eigene Domains und Batch-Jobs bleiben außerhalb des kostenlosen statischen Ablaufs.',
    searchLabel: 'QRRoute-Tools suchen',
    searchPlaceholder: 'Versuchen Sie QR, UTM, Wi-Fi, vCard, Barcode...',
    allCategories: 'Alle QRRoute-Tools',
    noResultsTitle: 'Kein passendes QRRoute-Tool',
    noResultsBody: 'Versuchen Sie ein anderes Wort oder eine Kategorie. Nur vorhandene öffentliche QRRoute-Seiten sind verlinkt.',
    allTitle: 'Alle veröffentlichten QRRoute-Tools',
    allBody: 'Wechseln Sie zwischen statischem QR, Barcode, Kampagnen-URL, Kontaktkarte, Wi-Fi und Payload-Prüfung.',
    privacyTitle: 'Lokale Payloads',
    privacyBody: 'URLs, Kontakte, Wi-Fi-Werte und Barcode-Text bleiben in dieser Browser-Sitzung. Der Katalog öffnet kostenlose Seiten ohne Eingaben zu speichern.',
    toolCta: 'Tool öffnen',
    categories: [
      { key: 'qr', label: 'QR-Codes' },
      { key: 'barcode', label: 'Barcodes' },
      { key: 'campaign', label: 'Kampagnenlinks' },
      { key: 'contact', label: 'Kontaktkarten' },
      { key: 'network', label: 'Wi-Fi' },
      { key: 'preview', label: 'Vorschau' },
    ],
    tools: [
      { label: 'Statischer QR-Code', body: 'Erstellen Sie einen scannbaren QR für sichere URL, Text, E-Mail oder Telefon.', path: '/tools/static-qr-code', glyph: 'QR', category: 'qr', featured: true },
      { label: 'Barcode-Generator', body: 'Rendern Sie eine Code-128-Vorschau für Inventar, Ticket oder Referenz.', path: '/tools/barcode-generator', glyph: 'BAR', category: 'barcode', featured: true },
      { label: 'UTM-Builder', body: 'Erstellen Sie eine getaggte Kampagnen-URL und QR-Vorschau ohne Server-Upload.', path: '/tools/utm-builder', glyph: 'UTM', category: 'campaign', featured: true },
      { label: 'vCard-QR-Generator', body: 'Wandeln Sie ein kompaktes Kontaktprofil in einen QR-fähigen vCard-Payload um.', path: '/tools/vcard-qr', glyph: 'VCF', category: 'contact', featured: true },
      { label: 'Wi-Fi-QR-Generator', body: 'Erstellen Sie einen lokalen Wi-Fi-Payload für WPA, WEP oder offene Netzwerke.', path: '/tools/wifi-qr', glyph: 'WIFI', category: 'network', featured: true },
      { label: 'QR-Vorschau-Labor', body: 'Prüfen Sie einen statischen Payload vor dem Druck und sehen Sie Sicherheitsnotizen.', path: '/tools/preview-lab', glyph: 'VIEW', category: 'preview', featured: false },
    ],
    shortcutGroups: [
      { title: 'Scannbaren Code erstellen', body: 'Starten Sie mit QR-Payloads für Smartphone-Kameras.', paths: ['/tools/static-qr-code', '/tools/wifi-qr', '/tools/vcard-qr'] },
      { title: 'Kampagnenmaterial vorbereiten', body: 'Taggen Sie ein Ziel, erzeugen Sie Barcode oder prüfen Sie Payload vor dem Start.', paths: ['/tools/utm-builder', '/tools/barcode-generator', '/tools/preview-lab'] },
      { title: 'Vor dem Druck prüfen', body: 'Kontrollieren Sie, was in Flyern, Etiketten oder Karten codiert wird.', paths: ['/tools/preview-lab', '/tools/static-qr-code', '/tools/barcode-generator'] },
    ],
    footerGroups: [
      { title: 'QR-Codes', links: [{ label: 'Statischer QR-Code', path: '/tools/static-qr-code' }, { label: 'QR-Vorschau', path: '/tools/preview-lab' }] },
      { title: 'Kampagnenlinks', links: [{ label: 'UTM-Builder', path: '/tools/utm-builder' }, { label: 'QR für URLs', path: '/tools/static-qr-code' }] },
      { title: 'Kontakt und Wi-Fi', links: [{ label: 'vCard QR', path: '/tools/vcard-qr' }, { label: 'Wi-Fi QR', path: '/tools/wifi-qr' }] },
      { title: 'Barcodes', links: [{ label: 'Barcode-Generator', path: '/tools/barcode-generator' }, { label: 'Payload prüfen', path: '/tools/preview-lab' }] },
      { title: 'Vor dem Druck', links: [{ label: 'QR prüfen', path: '/tools/preview-lab' }, { label: 'Flyer-QR', path: '/tools/static-qr-code' }, { label: 'Kampagnen-URL', path: '/tools/utm-builder' }] },
    ],
  },
}

export const invoiceCraftCatalogCopy: Record<LocaleCode, InvoiceCraftCatalogCopy> = {
  en: {
    eyebrow: 'Invoices, quotes and receipts',
    title: 'Create a client document and download a local PDF.',
    lead: 'Start with an invoice, quote or receipt builder that keeps names, items and amounts in the browser. The free workflow creates one polished PDF without an account.',
    primaryCta: 'Open invoice builder',
    secondaryCta: 'Browse document builders',
    previewTitle: 'Live document preview',
    previewBadge: 'Local PDF',
    previewDocumentLabel: 'Document',
    previewDocumentValue: 'Invoice IC-2026-018',
    previewClientLabel: 'Bill to',
    previewClientValue: 'Acme Studio',
    previewRows: [
      { label: 'Design sprint', value: '$1,250.00' },
      { label: 'Hosting setup', value: '$180.00' },
      { label: 'Manual adjustment', value: '$35.00' },
    ],
    previewTotalLabel: 'Total due',
    previewTotalValue: '$1,465.00',
    browseTitle: 'Choose the document flow',
    browseBody: 'InvoiceCraft mirrors the common invoice-generator pattern: document type first, then itemized preview, totals and PDF export.',
    featuredTitle: 'Start with the right client document',
    featuredBody: 'Open the exact public builder for a billable invoice, pre-work estimate or paid receipt without passing through an account wall.',
    reviewTitle: 'Review before sending',
    reviewBody: 'The free builder formats visible fields and totals. Official fiscal numbering, jurisdiction-specific tax rules and payment collection stay outside this public document flow.',
    privacyTitle: 'Local document data',
    privacyBody: 'Issuer, client, item, note and amount fields stay in the browser session. The catalog only links to public builders and does not store document entries.',
    searchLabel: 'Search InvoiceCraft tools',
    searchPlaceholder: 'Try invoice, quote, receipt, PDF...',
    allCategories: 'All document tools',
    noResultsTitle: 'No matching document builder',
    noResultsBody: 'Try another keyword or category. Only public InvoiceCraft pages that already exist are linked here.',
    allTitle: 'All published InvoiceCraft tools',
    allBody: 'Move between the invoice, quote and receipt builders for one-off browser-side document creation.',
    toolCta: 'Open builder',
    categories: [
      { key: 'invoice', label: 'Invoices' },
      { key: 'quote', label: 'Quotes' },
      { key: 'receipt', label: 'Receipts' },
    ],
    tools: [
      { label: 'Invoice Builder', body: 'Create an itemized invoice preview and download a local PDF.', path: '/tools/invoice-builder', glyph: 'INV', category: 'invoice', featured: true },
      { label: 'Quote Builder', body: 'Prepare a scoped estimate with validity details and itemized totals.', path: '/tools/quote-builder', glyph: 'QT', category: 'quote', featured: true },
      { label: 'Receipt Builder', body: 'Draft a paid receipt with date, payer and itemized record.', path: '/tools/receipt-builder', glyph: 'RCT', category: 'receipt', featured: true },
    ],
    shortcutGroups: [
      { title: 'Bill for completed work', body: 'Use an invoice when the client needs a document for payable work.', paths: ['/tools/invoice-builder', '/tools/receipt-builder'] },
      { title: 'Estimate before approval', body: 'Use a quote when scope, validity and pricing need review before work starts.', paths: ['/tools/quote-builder', '/tools/invoice-builder'] },
      { title: 'Record a payment', body: 'Use a receipt after payment so the payer gets a simple downloadable record.', paths: ['/tools/receipt-builder', '/tools/quote-builder'] },
    ],
    footerGroups: [
      { title: 'Invoices', links: [{ label: 'Invoice Builder', path: '/tools/invoice-builder' }, { label: 'Invoice PDF', path: '/tools/invoice-builder' }] },
      { title: 'Quotes', links: [{ label: 'Quote Builder', path: '/tools/quote-builder' }, { label: 'Estimate PDF', path: '/tools/quote-builder' }] },
      { title: 'Receipts', links: [{ label: 'Receipt Builder', path: '/tools/receipt-builder' }, { label: 'Paid receipt', path: '/tools/receipt-builder' }] },
      { title: 'Document checks', links: [{ label: 'Review totals', path: '/tools/invoice-builder' }, { label: 'Record payment', path: '/tools/receipt-builder' }] },
    ],
  },
  'pt-br': {
    eyebrow: 'Faturas, orçamentos e recibos',
    title: 'Crie um documento de cliente e baixe um PDF local.',
    lead: 'Comece por gerador de fatura, orçamento ou recibo mantendo nomes, itens e valores no navegador. O fluxo gratuito cria um PDF limpo sem conta.',
    primaryCta: 'Abrir gerador de fatura',
    secondaryCta: 'Ver geradores de documentos',
    previewTitle: 'Prévia de documento ao vivo',
    previewBadge: 'PDF local',
    previewDocumentLabel: 'Documento',
    previewDocumentValue: 'Fatura IC-2026-018',
    previewClientLabel: 'Cliente',
    previewClientValue: 'Acme Studio',
    previewRows: [
      { label: 'Sprint de design', value: 'R$ 1.250,00' },
      { label: 'Setup de hospedagem', value: 'R$ 180,00' },
      { label: 'Ajuste manual', value: 'R$ 35,00' },
    ],
    previewTotalLabel: 'Total',
    previewTotalValue: 'R$ 1.465,00',
    browseTitle: 'Escolha o fluxo de documento',
    browseBody: 'O InvoiceCraft segue o padrão mental dos geradores de fatura: tipo de documento primeiro, depois prévia, totais e exportação PDF.',
    featuredTitle: 'Comece pelo documento certo',
    featuredBody: 'Abra o gerador público exato para fatura, orçamento prévio ou recibo pago sem passar por uma parede de conta.',
    reviewTitle: 'Revise antes de enviar',
    reviewBody: 'O gerador gratuito formata campos visíveis e totais. Numeração fiscal oficial, regras tributárias por jurisdição e cobrança ficam fora deste fluxo público.',
    privacyTitle: 'Dados locais do documento',
    privacyBody: 'Emissor, cliente, itens, notas e valores ficam na sessão do navegador. O catálogo apenas abre geradores públicos e não armazena entradas.',
    searchLabel: 'Buscar ferramentas InvoiceCraft',
    searchPlaceholder: 'Tente fatura, orçamento, recibo, PDF...',
    allCategories: 'Todas as ferramentas de documento',
    noResultsTitle: 'Nenhum gerador encontrado',
    noResultsBody: 'Tente outra palavra ou categoria. Só entram links para páginas InvoiceCraft públicas existentes.',
    allTitle: 'Todas as ferramentas InvoiceCraft publicadas',
    allBody: 'Alterne entre geradores de fatura, orçamento e recibo para criar documentos pontuais no navegador.',
    toolCta: 'Abrir gerador',
    categories: [
      { key: 'invoice', label: 'Faturas' },
      { key: 'quote', label: 'Orçamentos' },
      { key: 'receipt', label: 'Recibos' },
    ],
    tools: [
      { label: 'Gerador de fatura', body: 'Crie uma prévia de fatura itemizada e baixe um PDF local.', path: '/tools/invoice-builder', glyph: 'FAT', category: 'invoice', featured: true },
      { label: 'Gerador de orçamento', body: 'Prepare uma estimativa com validade, escopo e totais itemizados.', path: '/tools/quote-builder', glyph: 'ORC', category: 'quote', featured: true },
      { label: 'Gerador de recibo', body: 'Monte um recibo pago com data, pagador e registro itemizado.', path: '/tools/receipt-builder', glyph: 'REC', category: 'receipt', featured: true },
    ],
    shortcutGroups: [
      { title: 'Cobrar trabalho concluído', body: 'Use fatura quando o cliente precisa de um documento para trabalho a pagar.', paths: ['/tools/invoice-builder', '/tools/receipt-builder'] },
      { title: 'Estimar antes da aprovação', body: 'Use orçamento quando escopo, validade e preço precisam de revisão antes do início.', paths: ['/tools/quote-builder', '/tools/invoice-builder'] },
      { title: 'Registrar pagamento', body: 'Use recibo depois do pagamento para entregar um comprovante simples em PDF.', paths: ['/tools/receipt-builder', '/tools/quote-builder'] },
    ],
    footerGroups: [
      { title: 'Faturas', links: [{ label: 'Gerador de fatura', path: '/tools/invoice-builder' }, { label: 'PDF de fatura', path: '/tools/invoice-builder' }] },
      { title: 'Orçamentos', links: [{ label: 'Gerador de orçamento', path: '/tools/quote-builder' }, { label: 'PDF de orçamento', path: '/tools/quote-builder' }] },
      { title: 'Recibos', links: [{ label: 'Gerador de recibo', path: '/tools/receipt-builder' }, { label: 'Recibo pago', path: '/tools/receipt-builder' }] },
      { title: 'Conferência', links: [{ label: 'Revisar totais', path: '/tools/invoice-builder' }, { label: 'Registrar pagamento', path: '/tools/receipt-builder' }] },
    ],
  },
  es: {
    eyebrow: 'Facturas, presupuestos y recibos',
    title: 'Crea un documento de cliente y descarga un PDF local.',
    lead: 'Empieza con factura, presupuesto o recibo manteniendo nombres, items e importes en el navegador. El flujo gratis crea un PDF limpio sin cuenta.',
    primaryCta: 'Abrir generador de facturas',
    secondaryCta: 'Ver generadores de documentos',
    previewTitle: 'Vista previa del documento',
    previewBadge: 'PDF local',
    previewDocumentLabel: 'Documento',
    previewDocumentValue: 'Factura IC-2026-018',
    previewClientLabel: 'Cliente',
    previewClientValue: 'Acme Studio',
    previewRows: [
      { label: 'Sprint de diseño', value: '1250,00 €' },
      { label: 'Configuración hosting', value: '180,00 €' },
      { label: 'Ajuste manual', value: '35,00 €' },
    ],
    previewTotalLabel: 'Total',
    previewTotalValue: '1465,00 €',
    browseTitle: 'Elige el flujo de documento',
    browseBody: 'InvoiceCraft sigue el patrón de generadores de facturas: tipo de documento, vista previa, totales y exportación PDF.',
    featuredTitle: 'Empieza por el documento correcto',
    featuredBody: 'Abre el generador público exacto para factura, presupuesto previo o recibo pagado sin pasar por una cuenta.',
    reviewTitle: 'Revisar antes de enviar',
    reviewBody: 'El generador gratis formatea campos visibles y totales. Numeración fiscal oficial, reglas tributarias y cobro quedan fuera del flujo público.',
    privacyTitle: 'Datos locales del documento',
    privacyBody: 'Emisor, cliente, items, notas e importes quedan en la sesión del navegador. El catálogo solo abre generadores públicos.',
    searchLabel: 'Buscar herramientas InvoiceCraft',
    searchPlaceholder: 'Prueba factura, presupuesto, recibo, PDF...',
    allCategories: 'Todas las herramientas de documento',
    noResultsTitle: 'No hay generador coincidente',
    noResultsBody: 'Prueba otra palabra o categoría. Solo enlazamos páginas públicas InvoiceCraft existentes.',
    allTitle: 'Todas las herramientas InvoiceCraft publicadas',
    allBody: 'Alterna entre generadores de factura, presupuesto y recibo para documentos puntuales en el navegador.',
    toolCta: 'Abrir generador',
    categories: [
      { key: 'invoice', label: 'Facturas' },
      { key: 'quote', label: 'Presupuestos' },
      { key: 'receipt', label: 'Recibos' },
    ],
    tools: [
      { label: 'Generador de facturas', body: 'Crea una vista de factura itemizada y descarga un PDF local.', path: '/tools/invoice-builder', glyph: 'FAC', category: 'invoice', featured: true },
      { label: 'Generador de presupuestos', body: 'Prepara una estimación con validez, alcance y totales.', path: '/tools/quote-builder', glyph: 'PRE', category: 'quote', featured: true },
      { label: 'Generador de recibos', body: 'Crea un recibo pagado con fecha, pagador y registro itemizado.', path: '/tools/receipt-builder', glyph: 'REC', category: 'receipt', featured: true },
    ],
    shortcutGroups: [
      { title: 'Cobrar trabajo terminado', body: 'Usa factura cuando el cliente necesita un documento pagable.', paths: ['/tools/invoice-builder', '/tools/receipt-builder'] },
      { title: 'Estimar antes de aprobar', body: 'Usa presupuesto cuando alcance, validez y precio requieren revisión.', paths: ['/tools/quote-builder', '/tools/invoice-builder'] },
      { title: 'Registrar un pago', body: 'Usa recibo después del pago para entregar un PDF simple.', paths: ['/tools/receipt-builder', '/tools/quote-builder'] },
    ],
    footerGroups: [
      { title: 'Facturas', links: [{ label: 'Generador de facturas', path: '/tools/invoice-builder' }, { label: 'PDF de factura', path: '/tools/invoice-builder' }] },
      { title: 'Presupuestos', links: [{ label: 'Generador de presupuestos', path: '/tools/quote-builder' }, { label: 'PDF de presupuesto', path: '/tools/quote-builder' }] },
      { title: 'Recibos', links: [{ label: 'Generador de recibos', path: '/tools/receipt-builder' }, { label: 'Recibo pagado', path: '/tools/receipt-builder' }] },
      { title: 'Revisión', links: [{ label: 'Revisar totales', path: '/tools/invoice-builder' }, { label: 'Registrar pago', path: '/tools/receipt-builder' }] },
    ],
  },
  fr: {
    eyebrow: 'Factures, devis et reçus',
    title: 'Créez un document client et téléchargez un PDF local.',
    lead: 'Commencez par facture, devis ou reçu en gardant noms, lignes et montants dans le navigateur. Le flux gratuit crée un PDF propre sans compte.',
    primaryCta: 'Ouvrir le générateur de facture',
    secondaryCta: 'Voir les générateurs',
    previewTitle: 'Aperçu du document',
    previewBadge: 'PDF local',
    previewDocumentLabel: 'Document',
    previewDocumentValue: 'Facture IC-2026-018',
    previewClientLabel: 'Client',
    previewClientValue: 'Acme Studio',
    previewRows: [
      { label: 'Sprint design', value: '1 250,00 €' },
      { label: 'Configuration hébergement', value: '180,00 €' },
      { label: 'Ajustement manuel', value: '35,00 €' },
    ],
    previewTotalLabel: 'Total',
    previewTotalValue: '1 465,00 €',
    browseTitle: 'Choisir le flux document',
    browseBody: 'InvoiceCraft suit le modèle des générateurs de facture: type de document, aperçu, totaux puis export PDF.',
    featuredTitle: 'Commencer par le bon document',
    featuredBody: 'Ouvrez le générateur public exact pour facture, devis préalable ou reçu payé sans passage par compte.',
    reviewTitle: 'Revoir avant envoi',
    reviewBody: 'Le générateur gratuit formate les champs visibles et totaux. Numérotation fiscale officielle, règles de taxe et paiement restent hors du flux public.',
    privacyTitle: 'Données locales',
    privacyBody: 'Émetteur, client, lignes, notes et montants restent dans la session du navigateur. Le catalogue ouvre seulement des générateurs publics.',
    searchLabel: 'Chercher des outils InvoiceCraft',
    searchPlaceholder: 'Essayez facture, devis, reçu, PDF...',
    allCategories: 'Tous les outils document',
    noResultsTitle: 'Aucun générateur trouvé',
    noResultsBody: 'Essayez un autre mot ou une catégorie. Seules les pages publiques InvoiceCraft existantes sont liées.',
    allTitle: 'Tous les outils InvoiceCraft publiés',
    allBody: 'Passez entre facture, devis et reçu pour créer des documents ponctuels dans le navigateur.',
    toolCta: 'Ouvrir',
    categories: [
      { key: 'invoice', label: 'Factures' },
      { key: 'quote', label: 'Devis' },
      { key: 'receipt', label: 'Reçus' },
    ],
    tools: [
      { label: 'Générateur de facture', body: 'Créez un aperçu de facture détaillée et téléchargez un PDF local.', path: '/tools/invoice-builder', glyph: 'FAC', category: 'invoice', featured: true },
      { label: 'Générateur de devis', body: 'Préparez une estimation avec validité, périmètre et totaux.', path: '/tools/quote-builder', glyph: 'DEV', category: 'quote', featured: true },
      { label: 'Générateur de reçu', body: 'Rédigez un reçu payé avec date, payeur et lignes.', path: '/tools/receipt-builder', glyph: 'REC', category: 'receipt', featured: true },
    ],
    shortcutGroups: [
      { title: 'Facturer un travail terminé', body: 'Utilisez une facture quand le client a besoin d un document payable.', paths: ['/tools/invoice-builder', '/tools/receipt-builder'] },
      { title: 'Estimer avant accord', body: 'Utilisez un devis quand périmètre, validité et prix doivent être relus.', paths: ['/tools/quote-builder', '/tools/invoice-builder'] },
      { title: 'Enregistrer un paiement', body: 'Utilisez un reçu après paiement pour donner une trace PDF simple.', paths: ['/tools/receipt-builder', '/tools/quote-builder'] },
    ],
    footerGroups: [
      { title: 'Factures', links: [{ label: 'Générateur de facture', path: '/tools/invoice-builder' }, { label: 'PDF facture', path: '/tools/invoice-builder' }] },
      { title: 'Devis', links: [{ label: 'Générateur de devis', path: '/tools/quote-builder' }, { label: 'PDF devis', path: '/tools/quote-builder' }] },
      { title: 'Reçus', links: [{ label: 'Générateur de reçu', path: '/tools/receipt-builder' }, { label: 'Reçu payé', path: '/tools/receipt-builder' }] },
      { title: 'Contrôles', links: [{ label: 'Revoir les totaux', path: '/tools/invoice-builder' }, { label: 'Enregistrer paiement', path: '/tools/receipt-builder' }] },
    ],
  },
  de: {
    eyebrow: 'Rechnungen, Angebote und Belege',
    title: 'Erstellen Sie ein Kundendokument und laden Sie ein lokales PDF.',
    lead: 'Starten Sie mit Rechnung, Angebot oder Beleg. Namen, Positionen und Beträge bleiben im Browser, und der kostenlose Ablauf erstellt ein PDF ohne Konto.',
    primaryCta: 'Rechnung erstellen',
    secondaryCta: 'Dokument-Builder ansehen',
    previewTitle: 'Live-Dokumentvorschau',
    previewBadge: 'Lokales PDF',
    previewDocumentLabel: 'Dokument',
    previewDocumentValue: 'Rechnung IC-2026-018',
    previewClientLabel: 'Kunde',
    previewClientValue: 'Acme Studio',
    previewRows: [
      { label: 'Design-Sprint', value: '1.250,00 €' },
      { label: 'Hosting-Setup', value: '180,00 €' },
      { label: 'Manuelle Anpassung', value: '35,00 €' },
    ],
    previewTotalLabel: 'Gesamt',
    previewTotalValue: '1.465,00 €',
    browseTitle: 'Dokumentablauf wählen',
    browseBody: 'InvoiceCraft folgt dem bekannten Muster: Dokumenttyp, Vorschau, Summen und PDF-Export.',
    featuredTitle: 'Mit dem passenden Dokument starten',
    featuredBody: 'Öffnen Sie den passenden öffentlichen Builder für Rechnung, Angebot oder Zahlungsbeleg ohne Konto-Pflicht.',
    reviewTitle: 'Vor dem Senden prüfen',
    reviewBody: 'Der kostenlose Builder formatiert sichtbare Felder und Summen. Offizielle Steuernummern, länderspezifische Steuerregeln und Zahlung bleiben außerhalb dieses öffentlichen Ablaufs.',
    privacyTitle: 'Lokale Dokumentdaten',
    privacyBody: 'Aussteller, Kunde, Positionen, Notizen und Beträge bleiben in der Browser-Sitzung. Der Katalog öffnet nur öffentliche Builder.',
    searchLabel: 'InvoiceCraft-Tools suchen',
    searchPlaceholder: 'Rechnung, Angebot, Beleg, PDF...',
    allCategories: 'Alle Dokument-Tools',
    noResultsTitle: 'Kein passender Builder',
    noResultsBody: 'Versuchen Sie ein anderes Wort oder eine Kategorie. Es werden nur bestehende öffentliche InvoiceCraft-Seiten verlinkt.',
    allTitle: 'Alle veröffentlichten InvoiceCraft-Tools',
    allBody: 'Wechseln Sie zwischen Rechnung, Angebot und Beleg für einmalige Browser-Dokumente.',
    toolCta: 'Öffnen',
    categories: [
      { key: 'invoice', label: 'Rechnungen' },
      { key: 'quote', label: 'Angebote' },
      { key: 'receipt', label: 'Belege' },
    ],
    tools: [
      { label: 'Rechnung erstellen', body: 'Erstellen Sie eine Positionsvorschau und laden Sie ein lokales PDF.', path: '/tools/invoice-builder', glyph: 'INV', category: 'invoice', featured: true },
      { label: 'Angebot erstellen', body: 'Bereiten Sie Schätzung, Gültigkeit, Umfang und Summen vor.', path: '/tools/quote-builder', glyph: 'ANG', category: 'quote', featured: true },
      { label: 'Beleg erstellen', body: 'Erstellen Sie einen Zahlungsbeleg mit Datum, Zahler und Positionen.', path: '/tools/receipt-builder', glyph: 'BEL', category: 'receipt', featured: true },
    ],
    shortcutGroups: [
      { title: 'Fertige Arbeit abrechnen', body: 'Nutzen Sie eine Rechnung, wenn der Kunde ein zahlbares Dokument braucht.', paths: ['/tools/invoice-builder', '/tools/receipt-builder'] },
      { title: 'Vor Freigabe schätzen', body: 'Nutzen Sie ein Angebot, wenn Umfang, Gültigkeit und Preis geprüft werden.', paths: ['/tools/quote-builder', '/tools/invoice-builder'] },
      { title: 'Zahlung dokumentieren', body: 'Nutzen Sie einen Beleg nach Zahlung für einen einfachen PDF-Nachweis.', paths: ['/tools/receipt-builder', '/tools/quote-builder'] },
    ],
    footerGroups: [
      { title: 'Rechnungen', links: [{ label: 'Rechnung erstellen', path: '/tools/invoice-builder' }, { label: 'Rechnungs-PDF', path: '/tools/invoice-builder' }] },
      { title: 'Angebote', links: [{ label: 'Angebot erstellen', path: '/tools/quote-builder' }, { label: 'Angebots-PDF', path: '/tools/quote-builder' }] },
      { title: 'Belege', links: [{ label: 'Beleg erstellen', path: '/tools/receipt-builder' }, { label: 'Zahlungsbeleg', path: '/tools/receipt-builder' }] },
      { title: 'Prüfung', links: [{ label: 'Summen prüfen', path: '/tools/invoice-builder' }, { label: 'Zahlung erfassen', path: '/tools/receipt-builder' }] },
    ],
  },
}

export const mailHealthCatalogCopy: Record<LocaleCode, MailHealthCatalogCopy> = {
  en: {
    eyebrow: 'Email authentication and domain health',
    title: "Check a domain's email health before changing DNS.",
    lead: 'Start with SPF, DKIM, DMARC, MX, blacklist, SMTP and header checks from one public page. The free flow gives a point-in-time answer before any account path.',
    primaryCta: 'Run SPF check',
    secondaryCta: 'Browse email checks',
    reportTitle: 'Domain health report',
    reportDomainLabel: 'Domain',
    reportDomainValue: 'example.com',
    reportScoreLabel: 'Sample score',
    reportScoreValue: '82',
    reportGrade: 'Review',
    reportBody: 'A useful report starts with authentication, receiving path, sender reputation and message evidence. Open each check for a real result on your own domain.',
    reportSignals: [
      { label: 'SPF', status: 'Pass', detail: 'One TXT policy with strict all handling.' },
      { label: 'DKIM', status: 'Review', detail: 'Selector evidence depends on the sending provider.' },
      { label: 'DMARC', status: 'Improve', detail: 'Policy can move toward enforcement after alignment is healthy.' },
      { label: 'MX', status: 'Pass', detail: 'Public exchanger records and host resolution are visible.' },
    ],
    browseTitle: 'Choose an email diagnostic',
    browseBody: 'MailHealth follows the common toolbox model: enter a domain, choose the exact check, read the signal and fix the responsible DNS or mail setting.',
    featuredTitle: 'Start with the checks senders expect',
    featuredBody: 'Open SPF, DKIM, DMARC, MX, blacklist, SMTP or header analysis directly. Each page keeps the free answer first and the limits below it.',
    limitsTitle: 'Point-in-time checks',
    limitsBody: 'Public tools inspect current records, selected public hosts or pasted headers. Recurring alerts, history, report ingestion, exports and team workflows are separate account features.',
    privacyTitle: 'Targets stay out of analytics',
    privacyBody: 'Domains, selectors, mail hosts, headers and results are not sent to product analytics events. Header analysis runs in the browser.',
    searchLabel: 'Search MailHealth checks',
    searchPlaceholder: 'Try SPF, DMARC, SMTP, blacklist...',
    allCategories: 'All email checks',
    noResultsTitle: 'No matching email check',
    noResultsBody: 'Try another keyword or category. Only public MailHealth pages that already exist are linked here.',
    allTitle: 'All published MailHealth checks',
    allBody: 'Move between authentication, DNS routing, reputation, SMTP reachability and message header analysis.',
    toolCta: 'Open check',
    categories: [
      { key: 'authentication', label: 'Authentication' },
      { key: 'dns', label: 'DNS and MX' },
      { key: 'reputation', label: 'Reputation' },
      { key: 'transport', label: 'SMTP' },
      { key: 'headers', label: 'Headers' },
    ],
    tools: [
      { label: 'SPF Check', body: 'Inspect the SPF TXT record and flag duplicate, permissive or lookup-heavy policies.', path: '/tools/spf-checker', glyph: 'SPF', category: 'authentication', featured: true },
      { label: 'DKIM Check', body: 'Check a selector._domainkey record and confirm that a public key is visible.', path: '/tools/dkim-checker', glyph: 'DKIM', category: 'authentication', featured: true },
      { label: 'DMARC Check', body: 'Read policy, alignment and reporting tags from the _dmarc TXT record.', path: '/tools/dmarc-checker', glyph: 'DM', category: 'authentication', featured: true },
      { label: 'MX Check', body: 'Review mail exchanger priority and public host resolution before delivery debugging.', path: '/tools/mx-checker', glyph: 'MX', category: 'dns', featured: true },
      { label: 'Blacklist Check', body: 'Run a bounded DNSBL sample for public mail-related addresses.', path: '/tools/blacklist-check', glyph: 'BL', category: 'reputation', featured: true },
      { label: 'SMTP Check', body: 'Test bounded TCP reachability to a selected domain mail exchanger.', path: '/tools/smtp-check', glyph: 'SMTP', category: 'transport', featured: true },
      { label: 'Header Analysis', body: 'Parse raw message headers locally for SPF, DKIM, DMARC and alignment clues.', path: '/tools/header-analyzer', glyph: 'HDR', category: 'headers', featured: true },
    ],
    shortcutGroups: [
      { title: 'Authenticate outbound mail', body: 'Start with records receivers use to trust a sender domain.', paths: ['/tools/spf-checker', '/tools/dkim-checker', '/tools/dmarc-checker'] },
      { title: 'Check receiving path', body: 'Review exchanger records and SMTP reachability before blaming content or reputation.', paths: ['/tools/mx-checker', '/tools/smtp-check'] },
      { title: 'Investigate evidence', body: 'Compare reputation signals with pasted message headers when a real message looks suspicious.', paths: ['/tools/blacklist-check', '/tools/header-analyzer', '/tools/dmarc-checker'] },
    ],
    footerGroups: [
      { title: 'Authentication', links: [{ label: 'SPF check', path: '/tools/spf-checker' }, { label: 'DKIM check', path: '/tools/dkim-checker' }, { label: 'DMARC check', path: '/tools/dmarc-checker' }] },
      { title: 'DNS and routing', links: [{ label: 'MX check', path: '/tools/mx-checker' }, { label: 'SMTP check', path: '/tools/smtp-check' }] },
      { title: 'Reputation', links: [{ label: 'Blacklist check', path: '/tools/blacklist-check' }, { label: 'DMARC policy', path: '/tools/dmarc-checker' }] },
      { title: 'Message evidence', links: [{ label: 'Header analysis', path: '/tools/header-analyzer' }, { label: 'SPF from headers', path: '/tools/header-analyzer' }] },
      { title: 'Fix sequence', links: [{ label: 'Start with SPF', path: '/tools/spf-checker' }, { label: 'Then DKIM', path: '/tools/dkim-checker' }, { label: 'Then DMARC', path: '/tools/dmarc-checker' }] },
    ],
  },
  'pt-br': {
    eyebrow: 'Autenticação de e-mail e saúde do domínio',
    title: 'Verifique a saúde de e-mail antes de alterar DNS.',
    lead: 'Comece por SPF, DKIM, DMARC, MX, blacklist, SMTP e headers em uma página pública. O fluxo gratuito entrega uma resposta pontual antes de qualquer caminho de conta.',
    primaryCta: 'Verificar SPF',
    secondaryCta: 'Ver checks de e-mail',
    reportTitle: 'Relatório de saúde do domínio',
    reportDomainLabel: 'Domínio',
    reportDomainValue: 'example.com',
    reportScoreLabel: 'Score exemplo',
    reportScoreValue: '82',
    reportGrade: 'Revisar',
    reportBody: 'Um relatório útil começa por autenticação, rota de recebimento, reputação e evidências da mensagem. Abra cada check para resultado real no seu domínio.',
    reportSignals: [
      { label: 'SPF', status: 'Ok', detail: 'Uma política TXT com tratamento all restrito.' },
      { label: 'DKIM', status: 'Revisar', detail: 'A evidência de selector depende do provedor de envio.' },
      { label: 'DMARC', status: 'Melhorar', detail: 'A política pode avançar depois que o alinhamento estiver saudável.' },
      { label: 'MX', status: 'Ok', detail: 'Registros de exchanger e resolução pública estão visíveis.' },
    ],
    browseTitle: 'Escolha um diagnóstico de e-mail',
    browseBody: 'O MailHealth segue o modelo de toolbox: informe um domínio, escolha o check exato, leia o sinal e corrija o DNS ou ajuste de e-mail responsável.',
    featuredTitle: 'Comece pelos checks esperados',
    featuredBody: 'Abra SPF, DKIM, DMARC, MX, blacklist, SMTP ou análise de headers diretamente. Cada página deixa a resposta gratuita primeiro e os limites abaixo.',
    limitsTitle: 'Checks pontuais',
    limitsBody: 'As ferramentas públicas inspecionam registros atuais, hosts públicos selecionados ou headers colados. Alertas recorrentes, histórico, ingestão de relatórios, exportações e fluxos de equipe ficam separados em conta.',
    privacyTitle: 'Alvos fora do analytics',
    privacyBody: 'Domínios, selectors, hosts de e-mail, headers e resultados não entram em eventos de analytics. A análise de headers roda no navegador.',
    searchLabel: 'Buscar checks MailHealth',
    searchPlaceholder: 'Tente SPF, DMARC, SMTP, blacklist...',
    allCategories: 'Todos os checks de e-mail',
    noResultsTitle: 'Nenhum check encontrado',
    noResultsBody: 'Tente outra palavra ou categoria. Só entram links para páginas MailHealth públicas existentes.',
    allTitle: 'Todos os checks MailHealth publicados',
    allBody: 'Alterne entre autenticação, roteamento DNS, reputação, alcance SMTP e análise de headers.',
    toolCta: 'Abrir check',
    categories: [
      { key: 'authentication', label: 'Autenticação' },
      { key: 'dns', label: 'DNS e MX' },
      { key: 'reputation', label: 'Reputação' },
      { key: 'transport', label: 'SMTP' },
      { key: 'headers', label: 'Headers' },
    ],
    tools: [
      { label: 'Verificador SPF', body: 'Inspecione o TXT SPF e sinalize políticas duplicadas, permissivas ou com muitas consultas.', path: '/tools/spf-checker', glyph: 'SPF', category: 'authentication', featured: true },
      { label: 'Verificador DKIM', body: 'Confira selector._domainkey e confirme se uma chave pública está visível.', path: '/tools/dkim-checker', glyph: 'DKIM', category: 'authentication', featured: true },
      { label: 'Verificador DMARC', body: 'Leia policy, alinhamento e tags de relatório no TXT _dmarc.', path: '/tools/dmarc-checker', glyph: 'DM', category: 'authentication', featured: true },
      { label: 'Verificador MX', body: 'Revise prioridade dos exchangers e resolução pública antes de depurar entrega.', path: '/tools/mx-checker', glyph: 'MX', category: 'dns', featured: true },
      { label: 'Consulta de blacklist', body: 'Execute uma amostra DNSBL limitada para endereços públicos ligados ao e-mail.', path: '/tools/blacklist-check', glyph: 'BL', category: 'reputation', featured: true },
      { label: 'Teste SMTP', body: 'Teste alcance TCP limitado até um exchanger do domínio.', path: '/tools/smtp-check', glyph: 'SMTP', category: 'transport', featured: true },
      { label: 'Analisador de headers', body: 'Analise headers brutos localmente em busca de SPF, DKIM, DMARC e alinhamento.', path: '/tools/header-analyzer', glyph: 'HDR', category: 'headers', featured: true },
    ],
    shortcutGroups: [
      { title: 'Autenticar envio', body: 'Comece pelos registros que receptores usam para confiar no domínio remetente.', paths: ['/tools/spf-checker', '/tools/dkim-checker', '/tools/dmarc-checker'] },
      { title: 'Checar recebimento', body: 'Revise exchangers e alcance SMTP antes de culpar conteúdo ou reputação.', paths: ['/tools/mx-checker', '/tools/smtp-check'] },
      { title: 'Investigar evidências', body: 'Compare reputação com headers colados quando uma mensagem real parecer suspeita.', paths: ['/tools/blacklist-check', '/tools/header-analyzer', '/tools/dmarc-checker'] },
    ],
    footerGroups: [
      { title: 'Autenticação', links: [{ label: 'Verificar SPF', path: '/tools/spf-checker' }, { label: 'Verificar DKIM', path: '/tools/dkim-checker' }, { label: 'Verificar DMARC', path: '/tools/dmarc-checker' }] },
      { title: 'DNS e rota', links: [{ label: 'Verificar MX', path: '/tools/mx-checker' }, { label: 'Teste SMTP', path: '/tools/smtp-check' }] },
      { title: 'Reputação', links: [{ label: 'Consulta blacklist', path: '/tools/blacklist-check' }, { label: 'Policy DMARC', path: '/tools/dmarc-checker' }] },
      { title: 'Mensagem', links: [{ label: 'Analisar headers', path: '/tools/header-analyzer' }, { label: 'SPF nos headers', path: '/tools/header-analyzer' }] },
      { title: 'Sequência de ajuste', links: [{ label: 'Comece por SPF', path: '/tools/spf-checker' }, { label: 'Depois DKIM', path: '/tools/dkim-checker' }, { label: 'Depois DMARC', path: '/tools/dmarc-checker' }] },
    ],
  },
  es: {
    eyebrow: 'Autenticación de email y salud del dominio',
    title: 'Revisa la salud de email antes de cambiar DNS.',
    lead: 'Empieza con SPF, DKIM, DMARC, MX, blacklist, SMTP y headers desde una página pública. El flujo gratis da una respuesta puntual antes de cualquier cuenta.',
    primaryCta: 'Revisar SPF',
    secondaryCta: 'Ver controles de email',
    reportTitle: 'Reporte de salud del dominio',
    reportDomainLabel: 'Dominio',
    reportDomainValue: 'example.com',
    reportScoreLabel: 'Score ejemplo',
    reportScoreValue: '82',
    reportGrade: 'Revisar',
    reportBody: 'Un reporte útil empieza por autenticación, ruta de recepción, reputación y evidencia del mensaje. Abre cada control para resultado real en tu dominio.',
    reportSignals: [
      { label: 'SPF', status: 'Ok', detail: 'Una política TXT con manejo all estricto.' },
      { label: 'DKIM', status: 'Revisar', detail: 'La evidencia de selector depende del proveedor de envío.' },
      { label: 'DMARC', status: 'Mejorar', detail: 'La política puede avanzar después de tener alineación sana.' },
      { label: 'MX', status: 'Ok', detail: 'Exchangers y resolución pública son visibles.' },
    ],
    browseTitle: 'Elige un diagnóstico de email',
    browseBody: 'MailHealth sigue el modelo toolbox: ingresa dominio, elige el control exacto, lee la señal y corrige DNS o correo responsable.',
    featuredTitle: 'Empieza por los controles esperados',
    featuredBody: 'Abre SPF, DKIM, DMARC, MX, blacklist, SMTP o análisis de headers directamente. Cada página pone la respuesta gratis primero y los límites después.',
    limitsTitle: 'Controles puntuales',
    limitsBody: 'Las herramientas públicas inspeccionan registros actuales, hosts públicos seleccionados o headers pegados. Alertas recurrentes, historial, ingestión de reportes, exportaciones y equipos quedan separados en cuenta.',
    privacyTitle: 'Objetivos fuera de analytics',
    privacyBody: 'Dominios, selectors, hosts de email, headers y resultados no entran en eventos de analytics. El análisis de headers corre en el navegador.',
    searchLabel: 'Buscar controles MailHealth',
    searchPlaceholder: 'Prueba SPF, DMARC, SMTP, blacklist...',
    allCategories: 'Todos los controles',
    noResultsTitle: 'No hay control coincidente',
    noResultsBody: 'Prueba otra palabra o categoría. Solo enlazamos páginas públicas MailHealth existentes.',
    allTitle: 'Todos los controles MailHealth publicados',
    allBody: 'Alterna entre autenticación, ruteo DNS, reputación, alcance SMTP y análisis de headers.',
    toolCta: 'Abrir control',
    categories: [
      { key: 'authentication', label: 'Autenticación' },
      { key: 'dns', label: 'DNS y MX' },
      { key: 'reputation', label: 'Reputación' },
      { key: 'transport', label: 'SMTP' },
      { key: 'headers', label: 'Headers' },
    ],
    tools: [
      { label: 'Revisión SPF', body: 'Inspecciona el TXT SPF y señala políticas duplicadas, permisivas o pesadas.', path: '/tools/spf-checker', glyph: 'SPF', category: 'authentication', featured: true },
      { label: 'Revisión DKIM', body: 'Consulta selector._domainkey y confirma que la clave pública sea visible.', path: '/tools/dkim-checker', glyph: 'DKIM', category: 'authentication', featured: true },
      { label: 'Revisión DMARC', body: 'Lee policy, alineación y tags de reporte en el TXT _dmarc.', path: '/tools/dmarc-checker', glyph: 'DM', category: 'authentication', featured: true },
      { label: 'Revisión MX', body: 'Revisa prioridad de exchangers y resolución pública antes de depurar entrega.', path: '/tools/mx-checker', glyph: 'MX', category: 'dns', featured: true },
      { label: 'Consulta blacklist', body: 'Ejecuta una muestra DNSBL limitada para direcciones públicas de email.', path: '/tools/blacklist-check', glyph: 'BL', category: 'reputation', featured: true },
      { label: 'Prueba SMTP', body: 'Prueba alcance TCP limitado hacia un exchanger del dominio.', path: '/tools/smtp-check', glyph: 'SMTP', category: 'transport', featured: true },
      { label: 'Análisis de headers', body: 'Analiza headers brutos localmente para SPF, DKIM, DMARC y alineación.', path: '/tools/header-analyzer', glyph: 'HDR', category: 'headers', featured: true },
    ],
    shortcutGroups: [
      { title: 'Autenticar envío', body: 'Empieza por registros que receptores usan para confiar en el dominio remitente.', paths: ['/tools/spf-checker', '/tools/dkim-checker', '/tools/dmarc-checker'] },
      { title: 'Revisar recepción', body: 'Revisa exchangers y alcance SMTP antes de culpar contenido o reputación.', paths: ['/tools/mx-checker', '/tools/smtp-check'] },
      { title: 'Investigar evidencia', body: 'Compara reputación con headers pegados cuando un mensaje real parece sospechoso.', paths: ['/tools/blacklist-check', '/tools/header-analyzer', '/tools/dmarc-checker'] },
    ],
    footerGroups: [
      { title: 'Autenticación', links: [{ label: 'Revisar SPF', path: '/tools/spf-checker' }, { label: 'Revisar DKIM', path: '/tools/dkim-checker' }, { label: 'Revisar DMARC', path: '/tools/dmarc-checker' }] },
      { title: 'DNS y ruta', links: [{ label: 'Revisar MX', path: '/tools/mx-checker' }, { label: 'Prueba SMTP', path: '/tools/smtp-check' }] },
      { title: 'Reputación', links: [{ label: 'Consulta blacklist', path: '/tools/blacklist-check' }, { label: 'Policy DMARC', path: '/tools/dmarc-checker' }] },
      { title: 'Mensaje', links: [{ label: 'Analizar headers', path: '/tools/header-analyzer' }, { label: 'SPF en headers', path: '/tools/header-analyzer' }] },
      { title: 'Secuencia', links: [{ label: 'Primero SPF', path: '/tools/spf-checker' }, { label: 'Luego DKIM', path: '/tools/dkim-checker' }, { label: 'Luego DMARC', path: '/tools/dmarc-checker' }] },
    ],
  },
  fr: {
    eyebrow: 'Authentification email et santé domaine',
    title: 'Vérifiez la santé email avant de changer DNS.',
    lead: 'Commencez par SPF, DKIM, DMARC, MX, blacklist, SMTP et headers depuis une page publique. Le flux gratuit donne une réponse ponctuelle avant tout compte.',
    primaryCta: 'Vérifier SPF',
    secondaryCta: 'Voir les contrôles email',
    reportTitle: 'Rapport santé domaine',
    reportDomainLabel: 'Domaine',
    reportDomainValue: 'example.com',
    reportScoreLabel: 'Score exemple',
    reportScoreValue: '82',
    reportGrade: 'Revoir',
    reportBody: 'Un rapport utile commence par authentification, réception, réputation et preuves message. Ouvrez chaque contrôle pour un vrai résultat.',
    reportSignals: [
      { label: 'SPF', status: 'Ok', detail: 'Une politique TXT avec mécanisme all strict.' },
      { label: 'DKIM', status: 'Revoir', detail: "La preuve selector dépend du fournisseur d'envoi." },
      { label: 'DMARC', status: 'Améliorer', detail: 'La politique peut avancer après alignement sain.' },
      { label: 'MX', status: 'Ok', detail: 'Exchangers publics et résolution host visibles.' },
    ],
    browseTitle: 'Choisir un diagnostic email',
    browseBody: 'MailHealth suit le modèle toolbox: saisissez un domaine, choisissez le contrôle exact, lisez le signal et corrigez DNS ou réglage mail.',
    featuredTitle: 'Commencer par les contrôles attendus',
    featuredBody: 'Ouvrez SPF, DKIM, DMARC, MX, blacklist, SMTP ou analyse headers directement. Chaque page place la réponse gratuite avant les limites.',
    limitsTitle: 'Contrôles ponctuels',
    limitsBody: 'Les outils publics inspectent registres actuels, hosts publics sélectionnés ou headers collés. Alertes récurrentes, historique, rapports, exports et flux équipe restent séparés dans un compte.',
    privacyTitle: 'Cibles hors analytics',
    privacyBody: "Domaines, selectors, hosts mail, headers et résultats ne partent pas dans les événements analytics. L'analyse headers tourne dans le navigateur.",
    searchLabel: 'Chercher contrôles MailHealth',
    searchPlaceholder: 'Essayez SPF, DMARC, SMTP, blacklist...',
    allCategories: 'Tous les contrôles email',
    noResultsTitle: 'Aucun contrôle correspondant',
    noResultsBody: 'Essayez un autre mot ou une catégorie. Seules les pages publiques MailHealth existantes sont liées.',
    allTitle: 'Tous les contrôles MailHealth publiés',
    allBody: 'Passez entre authentification, routage DNS, réputation, portée SMTP et analyse headers.',
    toolCta: 'Ouvrir',
    categories: [
      { key: 'authentication', label: 'Authentification' },
      { key: 'dns', label: 'DNS et MX' },
      { key: 'reputation', label: 'Réputation' },
      { key: 'transport', label: 'SMTP' },
      { key: 'headers', label: 'Headers' },
    ],
    tools: [
      { label: 'Contrôle SPF', body: 'Inspectez le TXT SPF et signalez politiques dupliquées, permissives ou lourdes.', path: '/tools/spf-checker', glyph: 'SPF', category: 'authentication', featured: true },
      { label: 'Contrôle DKIM', body: "Vérifiez selector._domainkey et confirmez qu'une clé publique est visible.", path: '/tools/dkim-checker', glyph: 'DKIM', category: 'authentication', featured: true },
      { label: 'Contrôle DMARC', body: 'Lisez policy, alignement et tags rapport dans le TXT _dmarc.', path: '/tools/dmarc-checker', glyph: 'DM', category: 'authentication', featured: true },
      { label: 'Contrôle MX', body: 'Revoyez priorité exchanger et résolution publique avant debug livraison.', path: '/tools/mx-checker', glyph: 'MX', category: 'dns', featured: true },
      { label: 'Contrôle blacklist', body: 'Lancez un échantillon DNSBL borné pour adresses publiques liées au mail.', path: '/tools/blacklist-check', glyph: 'BL', category: 'reputation', featured: true },
      { label: 'Test SMTP', body: 'Testez une portée TCP bornée vers un exchanger du domaine.', path: '/tools/smtp-check', glyph: 'SMTP', category: 'transport', featured: true },
      { label: 'Analyse headers', body: 'Analysez des headers bruts localement pour SPF, DKIM, DMARC et alignement.', path: '/tools/header-analyzer', glyph: 'HDR', category: 'headers', featured: true },
    ],
    shortcutGroups: [
      { title: "Authentifier l'envoi", body: 'Commencez par les registres que les récepteurs utilisent pour faire confiance.', paths: ['/tools/spf-checker', '/tools/dkim-checker', '/tools/dmarc-checker'] },
      { title: 'Vérifier réception', body: 'Revoyez exchangers et portée SMTP avant contenu ou réputation.', paths: ['/tools/mx-checker', '/tools/smtp-check'] },
      { title: 'Enquêter preuves', body: 'Comparez réputation et headers quand un message réel semble suspect.', paths: ['/tools/blacklist-check', '/tools/header-analyzer', '/tools/dmarc-checker'] },
    ],
    footerGroups: [
      { title: 'Authentification', links: [{ label: 'Vérifier SPF', path: '/tools/spf-checker' }, { label: 'Vérifier DKIM', path: '/tools/dkim-checker' }, { label: 'Vérifier DMARC', path: '/tools/dmarc-checker' }] },
      { title: 'DNS et route', links: [{ label: 'Vérifier MX', path: '/tools/mx-checker' }, { label: 'Test SMTP', path: '/tools/smtp-check' }] },
      { title: 'Réputation', links: [{ label: 'Contrôle blacklist', path: '/tools/blacklist-check' }, { label: 'Policy DMARC', path: '/tools/dmarc-checker' }] },
      { title: 'Message', links: [{ label: 'Analyser headers', path: '/tools/header-analyzer' }, { label: 'SPF dans headers', path: '/tools/header-analyzer' }] },
      { title: 'Séquence', links: [{ label: 'Commencer SPF', path: '/tools/spf-checker' }, { label: 'Puis DKIM', path: '/tools/dkim-checker' }, { label: 'Puis DMARC', path: '/tools/dmarc-checker' }] },
    ],
  },
  de: {
    eyebrow: 'E-Mail-Authentifizierung und Domain-Gesundheit',
    title: 'Prüfen Sie E-Mail-Gesundheit vor DNS-Änderungen.',
    lead: 'Starten Sie mit SPF, DKIM, DMARC, MX, Blacklist, SMTP und Headern auf einer öffentlichen Seite. Der kostenlose Ablauf liefert eine Punktprüfung vor jedem Konto.',
    primaryCta: 'SPF prüfen',
    secondaryCta: 'E-Mail-Prüfungen ansehen',
    reportTitle: 'Domain-Health-Bericht',
    reportDomainLabel: 'Domain',
    reportDomainValue: 'example.com',
    reportScoreLabel: 'Beispielscore',
    reportScoreValue: '82',
    reportGrade: 'Prüfen',
    reportBody: 'Ein nützlicher Bericht beginnt mit Authentifizierung, Empfangspfad, Reputation und Nachrichtenbelegen. Öffnen Sie jede Prüfung für echte Ergebnisse.',
    reportSignals: [
      { label: 'SPF', status: 'Ok', detail: 'Eine TXT-Policy mit strengem all-Mechanismus.' },
      { label: 'DKIM', status: 'Prüfen', detail: 'Selector-Nachweis hängt vom Sendeanbieter ab.' },
      { label: 'DMARC', status: 'Verbessern', detail: 'Policy kann nach gesundem Alignment verschärft werden.' },
      { label: 'MX', status: 'Ok', detail: 'Öffentliche Exchanger und Hostauflösung sind sichtbar.' },
    ],
    browseTitle: 'E-Mail-Diagnose wählen',
    browseBody: 'MailHealth folgt dem Toolbox-Modell: Domain eingeben, exakte Prüfung wählen, Signal lesen und verantwortliche DNS- oder Mail-Einstellung korrigieren.',
    featuredTitle: 'Mit erwarteten Prüfungen starten',
    featuredBody: 'Öffnen Sie SPF, DKIM, DMARC, MX, Blacklist, SMTP oder Headeranalyse direkt. Jede Seite stellt die kostenlose Antwort vor die Grenzen.',
    limitsTitle: 'Punktuelle Prüfungen',
    limitsBody: 'Öffentliche Tools prüfen aktuelle Records, ausgewählte Public Hosts oder eingefügte Header. Wiederkehrende Alarme, Historie, Reports, Exporte und Teamabläufe bleiben getrennte Kontofunktionen.',
    privacyTitle: 'Ziele bleiben aus Analytics',
    privacyBody: 'Domains, Selectors, Mailhosts, Header und Ergebnisse gehen nicht in Produkt-Analytics. Headeranalyse läuft im Browser.',
    searchLabel: 'MailHealth-Prüfungen suchen',
    searchPlaceholder: 'SPF, DMARC, SMTP, Blacklist...',
    allCategories: 'Alle E-Mail-Prüfungen',
    noResultsTitle: 'Keine passende Prüfung',
    noResultsBody: 'Versuchen Sie ein anderes Wort oder eine Kategorie. Nur bestehende öffentliche MailHealth-Seiten werden verlinkt.',
    allTitle: 'Alle veröffentlichten MailHealth-Prüfungen',
    allBody: 'Wechseln Sie zwischen Authentifizierung, DNS-Routing, Reputation, SMTP-Erreichbarkeit und Headeranalyse.',
    toolCta: 'Öffnen',
    categories: [
      { key: 'authentication', label: 'Authentifizierung' },
      { key: 'dns', label: 'DNS und MX' },
      { key: 'reputation', label: 'Reputation' },
      { key: 'transport', label: 'SMTP' },
      { key: 'headers', label: 'Header' },
    ],
    tools: [
      { label: 'SPF-Prüfung', body: 'Prüft TXT-SPF und markiert doppelte, zu offene oder lookup-starke Policies.', path: '/tools/spf-checker', glyph: 'SPF', category: 'authentication', featured: true },
      { label: 'DKIM-Prüfung', body: 'Prüft selector._domainkey und ob ein öffentlicher Schlüssel sichtbar ist.', path: '/tools/dkim-checker', glyph: 'DKIM', category: 'authentication', featured: true },
      { label: 'DMARC-Prüfung', body: 'Liest Policy, Alignment und Report-Tags im TXT _dmarc.', path: '/tools/dmarc-checker', glyph: 'DM', category: 'authentication', featured: true },
      { label: 'MX-Prüfung', body: 'Prüft Exchanger-Priorität und öffentliche Hostauflösung vor Delivery-Debugging.', path: '/tools/mx-checker', glyph: 'MX', category: 'dns', featured: true },
      { label: 'Blacklist-Prüfung', body: 'Führt eine begrenzte DNSBL-Stichprobe für öffentliche Mail-Adressen aus.', path: '/tools/blacklist-check', glyph: 'BL', category: 'reputation', featured: true },
      { label: 'SMTP-Test', body: 'Testet begrenzte TCP-Erreichbarkeit zu einem Domain-Exchanger.', path: '/tools/smtp-check', glyph: 'SMTP', category: 'transport', featured: true },
      { label: 'Headeranalyse', body: 'Analysiert rohe Header lokal für SPF, DKIM, DMARC und Alignment.', path: '/tools/header-analyzer', glyph: 'HDR', category: 'headers', featured: true },
    ],
    shortcutGroups: [
      { title: 'Ausgehende Mail absichern', body: 'Starten Sie mit Records, die Empfänger für Vertrauen nutzen.', paths: ['/tools/spf-checker', '/tools/dkim-checker', '/tools/dmarc-checker'] },
      { title: 'Empfangspfad prüfen', body: 'Prüfen Sie Exchanger und SMTP-Erreichbarkeit vor Content oder Reputation.', paths: ['/tools/mx-checker', '/tools/smtp-check'] },
      { title: 'Belege untersuchen', body: 'Vergleichen Sie Reputation und Header, wenn eine echte Nachricht auffällig wirkt.', paths: ['/tools/blacklist-check', '/tools/header-analyzer', '/tools/dmarc-checker'] },
    ],
    footerGroups: [
      { title: 'Authentifizierung', links: [{ label: 'SPF prüfen', path: '/tools/spf-checker' }, { label: 'DKIM prüfen', path: '/tools/dkim-checker' }, { label: 'DMARC prüfen', path: '/tools/dmarc-checker' }] },
      { title: 'DNS und Route', links: [{ label: 'MX prüfen', path: '/tools/mx-checker' }, { label: 'SMTP-Test', path: '/tools/smtp-check' }] },
      { title: 'Reputation', links: [{ label: 'Blacklist prüfen', path: '/tools/blacklist-check' }, { label: 'DMARC Policy', path: '/tools/dmarc-checker' }] },
      { title: 'Nachricht', links: [{ label: 'Header analysieren', path: '/tools/header-analyzer' }, { label: 'SPF in Headern', path: '/tools/header-analyzer' }] },
      { title: 'Reihenfolge', links: [{ label: 'Start mit SPF', path: '/tools/spf-checker' }, { label: 'Dann DKIM', path: '/tools/dkim-checker' }, { label: 'Dann DMARC', path: '/tools/dmarc-checker' }] },
    ],
  },
}

export const sitePulseCatalogCopy: Record<LocaleCode, SitePulseCatalogCopy> = {
  en: {
    eyebrow: 'Website status and page health',
    title: 'Check if a website is reachable before you debug deeper.',
    lead: 'Start with HTTP status, redirects, security headers, robots.txt, sitemap, TTFB and a bounded performance snapshot from one practical public page.',
    primaryCta: 'Check website status',
    secondaryCta: 'Browse website checks',
    reportTitle: 'Website status report',
    reportUrlLabel: 'URL',
    reportUrlValue: 'https://example.com',
    reportScoreLabel: 'Sample score',
    reportScoreValue: '92',
    reportGrade: 'Online',
    reportBody: 'A useful web check answers the first question quickly, then separates routing, headers, crawl files and timing so the next fix is obvious.',
    reportSignals: [
      { label: 'Status', status: 'Online', detail: 'Final response is reachable with a healthy status class.' },
      { label: 'Redirects', status: 'Clean', detail: 'The path reaches the final URL without a long chain.' },
      { label: 'Headers', status: 'Review', detail: 'Security headers are visible for quick baseline checks.' },
      { label: 'Timing', status: 'Fast', detail: 'TTFB sample stays inside the first troubleshooting band.' },
    ],
    browseTitle: 'Choose a website check',
    browseBody: 'Use SitePulse like a compact operations toolbox: enter one public URL, choose the exact check, read the status and move to the responsible layer.',
    featuredTitle: 'Start with the signals teams check first',
    featuredBody: 'Open status, redirect chain, security headers, robots.txt, sitemap, TTFB or performance snapshot directly. Each page keeps the free answer before deeper methodology.',
    limitsTitle: 'Point-in-time diagnostics',
    limitsBody: 'Public checks inspect one URL, selected response headers and same-origin crawl files with bounded requests. Recurring checks, history, incidents and reports stay separate from the free answer.',
    privacyTitle: 'Targets stay out of analytics',
    privacyBody: 'Submitted URLs, redirect targets, headers, timing and result details are not sent to product analytics events.',
    searchLabel: 'Search SitePulse checks',
    searchPlaceholder: 'Try status, redirects, headers, sitemap...',
    allCategories: 'All website checks',
    noResultsTitle: 'No matching website check',
    noResultsBody: 'Try another keyword or category. Only public SitePulse pages that already exist are linked here.',
    allTitle: 'All published SitePulse checks',
    allBody: 'Move between availability, routing, security headers, crawlability and performance snapshots without leaving the public toolbox.',
    toolCta: 'Open check',
    categories: [
      { key: 'availability', label: 'Availability' },
      { key: 'routing', label: 'Redirects' },
      { key: 'security', label: 'Headers' },
      { key: 'crawlability', label: 'Crawlability' },
      { key: 'performance', label: 'Performance' },
    ],
    tools: [
      { label: 'Website Status', body: 'Check whether a public URL answers and see final status, response class and first timing notes.', path: '/tools/status-checker', glyph: '200', category: 'availability', featured: true },
      { label: 'Redirect Chain', body: 'Follow bounded redirects and spot loops, cross-host hops or slow handoffs before changing canonicals.', path: '/tools/redirect-chain', glyph: '301', category: 'routing', featured: true },
      { label: 'Security Headers', body: 'Inspect HSTS, CSP, frame, referrer and content headers from the public response.', path: '/tools/security-headers', glyph: 'HDR', category: 'security', featured: true },
      { label: 'Robots.txt Checker', body: 'Fetch the same-origin robots.txt file and review crawl directives and sitemap hints.', path: '/tools/robots-checker', glyph: 'BOT', category: 'crawlability', featured: true },
      { label: 'Sitemap Validator', body: 'Check the same-origin sitemap.xml shape, status and URL count summary.', path: '/tools/sitemap-validator', glyph: 'XML', category: 'crawlability', featured: true },
      { label: 'TTFB Checker', body: 'Measure a single first-byte timing sample from the bounded SitePulse probe runtime.', path: '/tools/ttfb-check', glyph: 'MS', category: 'performance', featured: true },
      { label: 'Performance Snapshot', body: 'Combine status, redirects, headers, crawl files and timing into a quick triage view.', path: '/tools/performance-snapshot', glyph: 'PERF', category: 'performance', featured: true },
    ],
    shortcutGroups: [
      { title: 'Is the site up?', body: 'Start with reachability and timing before digging through application logs.', paths: ['/tools/status-checker', '/tools/ttfb-check'] },
      { title: 'Did routing change?', body: 'Trace redirects and final status when a domain, CDN or canonical rule changed.', paths: ['/tools/redirect-chain', '/tools/status-checker', '/tools/performance-snapshot'] },
      { title: 'Can crawlers read it?', body: 'Review robots.txt, sitemap.xml and headers that influence discovery and rendering.', paths: ['/tools/robots-checker', '/tools/sitemap-validator', '/tools/security-headers'] },
      { title: 'Is the page slow?', body: 'Use a bounded snapshot to separate redirect, header, byte and timing symptoms.', paths: ['/tools/performance-snapshot', '/tools/ttfb-check'] },
    ],
    footerGroups: [
      { title: 'Availability', links: [{ label: 'Website status', path: '/tools/status-checker' }, { label: 'TTFB check', path: '/tools/ttfb-check' }, { label: 'Performance snapshot', path: '/tools/performance-snapshot' }] },
      { title: 'Redirects', links: [{ label: 'Redirect chain', path: '/tools/redirect-chain' }, { label: 'Final status', path: '/tools/status-checker' }] },
      { title: 'Headers', links: [{ label: 'Security headers', path: '/tools/security-headers' }, { label: 'Response headers', path: '/tools/security-headers' }] },
      { title: 'Crawl files', links: [{ label: 'Robots.txt', path: '/tools/robots-checker' }, { label: 'Sitemap.xml', path: '/tools/sitemap-validator' }] },
      { title: 'Triage sequence', links: [{ label: 'Check status', path: '/tools/status-checker' }, { label: 'Trace redirects', path: '/tools/redirect-chain' }, { label: 'Review performance', path: '/tools/performance-snapshot' }] },
    ],
  },
  'pt-br': {
    eyebrow: 'Status de site e saúde da página',
    title: 'Verifique se um site responde antes de investigar mais.',
    lead: 'Comece por status HTTP, redirecionamentos, cabeçalhos de segurança, robots.txt, sitemap, TTFB e um resumo de desempenho limitado em uma página pública prática.',
    primaryCta: 'Verificar status do site',
    secondaryCta: 'Ver checks de site',
    reportTitle: 'Relatório de status do site',
    reportUrlLabel: 'URL',
    reportUrlValue: 'https://example.com',
    reportScoreLabel: 'Score exemplo',
    reportScoreValue: '92',
    reportGrade: 'Online',
    reportBody: 'Um check web útil responde a primeira pergunta rápido e separa rota, headers, arquivos de crawl e tempo para deixar claro onde agir.',
    reportSignals: [
      { label: 'Status', status: 'Online', detail: 'A resposta final está acessível com uma classe saudável.' },
      { label: 'Redirects', status: 'Limpo', detail: 'A rota chega à URL final sem cadeia longa.' },
      { label: 'Headers', status: 'Revisar', detail: 'Headers de segurança ficam visíveis para checagem de base.' },
      { label: 'Tempo', status: 'Rápido', detail: 'A amostra de TTFB fica na primeira faixa de triagem.' },
    ],
    browseTitle: 'Escolha um check de site',
    browseBody: 'Use o SitePulse como uma toolbox operacional compacta: informe uma URL pública, escolha o check exato, leia o status e vá para a camada responsável.',
    featuredTitle: 'Comece pelos sinais que equipes checam primeiro',
    featuredBody: 'Abra status, cadeia de redirecionamentos, cabeçalhos de segurança, robots.txt, sitemap, TTFB ou resumo de desempenho diretamente. Cada página deixa a resposta gratuita antes da metodologia.',
    limitsTitle: 'Diagnóstico pontual',
    limitsBody: 'Os checks públicos inspecionam uma URL, headers selecionados e arquivos de crawl same-origin com requisições limitadas. Checks recorrentes, histórico, incidentes e relatórios ficam separados da resposta gratuita.',
    privacyTitle: 'Alvos fora do analytics',
    privacyBody: 'URLs enviadas, destinos de redirect, headers, tempos e detalhes de resultado não entram em eventos de analytics do produto.',
    searchLabel: 'Buscar checks SitePulse',
    searchPlaceholder: 'Tente status, redirects, headers, sitemap...',
    allCategories: 'Todos os checks de site',
    noResultsTitle: 'Nenhum check encontrado',
    noResultsBody: 'Tente outra palavra ou categoria. Só entram links para páginas SitePulse públicas existentes.',
    allTitle: 'Todos os checks SitePulse publicados',
    allBody: 'Alterne entre disponibilidade, rota, cabeçalhos de segurança, rastreamento e resumo de desempenho sem sair da toolbox pública.',
    toolCta: 'Abrir check',
    categories: [
      { key: 'availability', label: 'Disponibilidade' },
      { key: 'routing', label: 'Redirecionamentos' },
      { key: 'security', label: 'Headers' },
      { key: 'crawlability', label: 'Rastreamento' },
      { key: 'performance', label: 'Desempenho' },
    ],
    tools: [
      { label: 'Status de site', body: 'Confira se uma URL pública responde e veja status final, classe da resposta e primeiros tempos.', path: '/tools/status-checker', glyph: '200', category: 'availability', featured: true },
      { label: 'Cadeia de redirecionamento', body: 'Siga redirects limitados e encontre loops, troca de host ou handoffs lentos antes de mexer em canonicals.', path: '/tools/redirect-chain', glyph: '301', category: 'routing', featured: true },
      { label: 'Headers de segurança', body: 'Inspecione HSTS, CSP, frame, referrer e content headers na resposta pública.', path: '/tools/security-headers', glyph: 'HDR', category: 'security', featured: true },
      { label: 'Verificador robots.txt', body: 'Busque o robots.txt same-origin e revise diretivas de crawl e pistas de sitemap.', path: '/tools/robots-checker', glyph: 'BOT', category: 'crawlability', featured: true },
      { label: 'Validador de sitemap', body: 'Confira formato, status e resumo de URLs do sitemap.xml same-origin.', path: '/tools/sitemap-validator', glyph: 'XML', category: 'crawlability', featured: true },
      { label: 'Verificador TTFB', body: 'Meça uma amostra pontual de first byte no runtime limitado do SitePulse.', path: '/tools/ttfb-check', glyph: 'MS', category: 'performance', featured: true },
      { label: 'Resumo de desempenho', body: 'Combine status, redirecionamentos, cabeçalhos, arquivos de rastreamento e tempo em uma visão de triagem.', path: '/tools/performance-snapshot', glyph: 'PERF', category: 'performance', featured: true },
    ],
    shortcutGroups: [
      { title: 'O site está no ar?', body: 'Comece por alcance e tempo antes de vasculhar logs da aplicação.', paths: ['/tools/status-checker', '/tools/ttfb-check'] },
      { title: 'A rota mudou?', body: 'Trace redirects e status final quando domínio, CDN ou regra canonical mudar.', paths: ['/tools/redirect-chain', '/tools/status-checker', '/tools/performance-snapshot'] },
      { title: 'Crawlers conseguem ler?', body: 'Revise robots.txt, sitemap.xml e headers que afetam descoberta e renderização.', paths: ['/tools/robots-checker', '/tools/sitemap-validator', '/tools/security-headers'] },
      { title: 'A página está lenta?', body: 'Use um resumo limitado para separar sintomas de redirecionamento, cabeçalho, bytes e tempo.', paths: ['/tools/performance-snapshot', '/tools/ttfb-check'] },
    ],
    footerGroups: [
      { title: 'Disponibilidade', links: [{ label: 'Status de site', path: '/tools/status-checker' }, { label: 'Check TTFB', path: '/tools/ttfb-check' }, { label: 'Resumo de desempenho', path: '/tools/performance-snapshot' }] },
      { title: 'Redirects', links: [{ label: 'Cadeia de redirect', path: '/tools/redirect-chain' }, { label: 'Status final', path: '/tools/status-checker' }] },
      { title: 'Headers', links: [{ label: 'Headers de segurança', path: '/tools/security-headers' }, { label: 'Headers da resposta', path: '/tools/security-headers' }] },
      { title: 'Arquivos de crawl', links: [{ label: 'Robots.txt', path: '/tools/robots-checker' }, { label: 'Sitemap.xml', path: '/tools/sitemap-validator' }] },
      { title: 'Sequência de triagem', links: [{ label: 'Verificar status', path: '/tools/status-checker' }, { label: 'Traçar redirecionamentos', path: '/tools/redirect-chain' }, { label: 'Revisar desempenho', path: '/tools/performance-snapshot' }] },
    ],
  },
  es: {
    eyebrow: 'Estado del sitio y salud de pagina',
    title: 'Comprueba si un sitio responde antes de investigar mas.',
    lead: 'Empieza con estado HTTP, redirecciones, headers de seguridad, robots.txt, sitemap, TTFB y un snapshot de rendimiento acotado desde una pagina publica practica.',
    primaryCta: 'Comprobar estado',
    secondaryCta: 'Ver controles web',
    reportTitle: 'Reporte de estado del sitio',
    reportUrlLabel: 'URL',
    reportUrlValue: 'https://example.com',
    reportScoreLabel: 'Score ejemplo',
    reportScoreValue: '92',
    reportGrade: 'Online',
    reportBody: 'Un control web util responde rapido la primera pregunta y separa ruta, headers, archivos de rastreo y tiempo para indicar donde actuar.',
    reportSignals: [
      { label: 'Estado', status: 'Online', detail: 'La respuesta final es accesible con una clase saludable.' },
      { label: 'Redirects', status: 'Limpio', detail: 'La ruta llega a la URL final sin cadena larga.' },
      { label: 'Headers', status: 'Revisar', detail: 'Los headers de seguridad quedan visibles para base rapida.' },
      { label: 'Tiempo', status: 'Rapido', detail: 'La muestra TTFB queda en la primera franja de triage.' },
    ],
    browseTitle: 'Elige un control de sitio',
    browseBody: 'Usa SitePulse como una toolbox operativa compacta: ingresa una URL publica, elige el control exacto, lee el estado y pasa a la capa responsable.',
    featuredTitle: 'Empieza por las senales que los equipos revisan primero',
    featuredBody: 'Abre estado, cadena de redirects, headers de seguridad, robots.txt, sitemap, TTFB o snapshot de rendimiento directamente.',
    limitsTitle: 'Diagnostico puntual',
    limitsBody: 'Los controles publicos inspeccionan una URL, headers seleccionados y archivos same-origin con solicitudes acotadas. Controles recurrentes, historial, incidentes e informes quedan separados de la respuesta gratis.',
    privacyTitle: 'Objetivos fuera de analytics',
    privacyBody: 'URLs enviadas, destinos de redirect, headers, tiempos y detalles de resultado no entran en eventos de analytics del producto.',
    searchLabel: 'Buscar controles SitePulse',
    searchPlaceholder: 'Prueba estado, redirects, headers, sitemap...',
    allCategories: 'Todos los controles web',
    noResultsTitle: 'No hay control coincidente',
    noResultsBody: 'Prueba otra palabra o categoria. Solo enlazamos paginas publicas SitePulse existentes.',
    allTitle: 'Todos los controles SitePulse publicados',
    allBody: 'Alterna entre disponibilidad, ruta, headers de seguridad, rastreo y snapshot de rendimiento sin salir de la toolbox publica.',
    toolCta: 'Abrir control',
    categories: [
      { key: 'availability', label: 'Disponibilidad' },
      { key: 'routing', label: 'Redirecciones' },
      { key: 'security', label: 'Headers' },
      { key: 'crawlability', label: 'Rastreo' },
      { key: 'performance', label: 'Rendimiento' },
    ],
    tools: [
      { label: 'Estado del sitio', body: 'Comprueba si una URL publica responde y ve estado final, clase de respuesta y primeros tiempos.', path: '/tools/status-checker', glyph: '200', category: 'availability', featured: true },
      { label: 'Cadena de redireccion', body: 'Sigue redirects acotados y detecta loops, cambios de host o saltos lentos.', path: '/tools/redirect-chain', glyph: '301', category: 'routing', featured: true },
      { label: 'Headers de seguridad', body: 'Inspecciona HSTS, CSP, frame, referrer y content headers en la respuesta publica.', path: '/tools/security-headers', glyph: 'HDR', category: 'security', featured: true },
      { label: 'Verificador robots.txt', body: 'Obtiene robots.txt same-origin y revisa directivas de rastreo y pistas de sitemap.', path: '/tools/robots-checker', glyph: 'BOT', category: 'crawlability', featured: true },
      { label: 'Validador sitemap', body: 'Comprueba forma, estado y resumen de URLs del sitemap.xml same-origin.', path: '/tools/sitemap-validator', glyph: 'XML', category: 'crawlability', featured: true },
      { label: 'Verificador TTFB', body: 'Mide una muestra puntual de first byte desde el runtime acotado de SitePulse.', path: '/tools/ttfb-check', glyph: 'MS', category: 'performance', featured: true },
      { label: 'Snapshot de rendimiento', body: 'Combina estado, redirects, headers, archivos de rastreo y tiempo en una vista de triage.', path: '/tools/performance-snapshot', glyph: 'PERF', category: 'performance', featured: true },
    ],
    shortcutGroups: [
      { title: 'Esta arriba el sitio?', body: 'Empieza por alcance y tiempo antes de revisar logs de aplicacion.', paths: ['/tools/status-checker', '/tools/ttfb-check'] },
      { title: 'Cambio la ruta?', body: 'Traza redirects y estado final cuando cambie dominio, CDN o canonical.', paths: ['/tools/redirect-chain', '/tools/status-checker', '/tools/performance-snapshot'] },
      { title: 'Pueden leer los crawlers?', body: 'Revisa robots.txt, sitemap.xml y headers que influyen en descubrimiento.', paths: ['/tools/robots-checker', '/tools/sitemap-validator', '/tools/security-headers'] },
      { title: 'La pagina esta lenta?', body: 'Usa un snapshot acotado para separar sintomas de redirect, header, bytes y tiempo.', paths: ['/tools/performance-snapshot', '/tools/ttfb-check'] },
    ],
    footerGroups: [
      { title: 'Disponibilidad', links: [{ label: 'Estado del sitio', path: '/tools/status-checker' }, { label: 'Check TTFB', path: '/tools/ttfb-check' }, { label: 'Snapshot rendimiento', path: '/tools/performance-snapshot' }] },
      { title: 'Redirects', links: [{ label: 'Cadena redirect', path: '/tools/redirect-chain' }, { label: 'Estado final', path: '/tools/status-checker' }] },
      { title: 'Headers', links: [{ label: 'Headers seguridad', path: '/tools/security-headers' }, { label: 'Headers respuesta', path: '/tools/security-headers' }] },
      { title: 'Archivos crawl', links: [{ label: 'Robots.txt', path: '/tools/robots-checker' }, { label: 'Sitemap.xml', path: '/tools/sitemap-validator' }] },
      { title: 'Secuencia triage', links: [{ label: 'Comprobar estado', path: '/tools/status-checker' }, { label: 'Trazar redirects', path: '/tools/redirect-chain' }, { label: 'Revisar rendimiento', path: '/tools/performance-snapshot' }] },
    ],
  },
  fr: {
    eyebrow: 'Statut site et sante page',
    title: 'Verifiez si un site repond avant de creuser.',
    lead: 'Commencez par statut HTTP, redirections, en-tetes securite, robots.txt, sitemap, TTFB et snapshot performance borne depuis une page publique pratique.',
    primaryCta: 'Verifier le statut',
    secondaryCta: 'Voir controles site',
    reportTitle: 'Rapport statut site',
    reportUrlLabel: 'URL',
    reportUrlValue: 'https://example.com',
    reportScoreLabel: 'Score exemple',
    reportScoreValue: '92',
    reportGrade: 'Online',
    reportBody: 'Un controle web utile repond vite puis separe route, en-tetes, fichiers crawl et timing pour montrer la prochaine action.',
    reportSignals: [
      { label: 'Statut', status: 'Online', detail: 'La reponse finale est joignable avec une classe saine.' },
      { label: 'Redirects', status: 'Propre', detail: 'La route atteint URL finale sans longue chaine.' },
      { label: 'Headers', status: 'Revoir', detail: 'Les en-tetes securite sont visibles pour controle de base.' },
      { label: 'Timing', status: 'Rapide', detail: 'L echantillon TTFB reste dans la premiere bande de triage.' },
    ],
    browseTitle: 'Choisir un controle site',
    browseBody: 'Utilisez SitePulse comme toolbox operations compacte: entrez une URL publique, choisissez le controle exact, lisez le statut et passez a la couche responsable.',
    featuredTitle: 'Commencer par les signaux verifies en premier',
    featuredBody: 'Ouvrez statut, chaine redirects, en-tetes securite, robots.txt, sitemap, TTFB ou snapshot performance directement.',
    limitsTitle: 'Diagnostic ponctuel',
    limitsBody: 'Les controles publics inspectent une URL, des en-tetes selectionnes et fichiers same-origin avec requetes bornees. Controles recurrents, historique, incidents et rapports restent separes de la reponse gratuite.',
    privacyTitle: 'Cibles hors analytics',
    privacyBody: 'URLs soumises, destinations redirect, en-tetes, timings et details resultat ne partent pas dans les evenements analytics produit.',
    searchLabel: 'Chercher controles SitePulse',
    searchPlaceholder: 'Essayez statut, redirects, headers, sitemap...',
    allCategories: 'Tous les controles site',
    noResultsTitle: 'Aucun controle correspondant',
    noResultsBody: 'Essayez un autre mot ou une categorie. Seules les pages publiques SitePulse existantes sont liees.',
    allTitle: 'Tous les controles SitePulse publies',
    allBody: 'Passez entre disponibilite, route, en-tetes securite, crawl et snapshot performance sans quitter la toolbox publique.',
    toolCta: 'Ouvrir',
    categories: [
      { key: 'availability', label: 'Disponibilite' },
      { key: 'routing', label: 'Redirections' },
      { key: 'security', label: 'Headers' },
      { key: 'crawlability', label: 'Crawl' },
      { key: 'performance', label: 'Vitesse' },
    ],
    tools: [
      { label: 'Statut du site', body: 'Verifiez si une URL publique repond et voyez statut final, classe reponse et premiers timings.', path: '/tools/status-checker', glyph: '200', category: 'availability', featured: true },
      { label: 'Chaine de redirection', body: 'Suivez redirects bornes et reperez boucles, changements host ou relais lents.', path: '/tools/redirect-chain', glyph: '301', category: 'routing', featured: true },
      { label: 'En-tetes securite', body: 'Inspectez HSTS, CSP, frame, referrer et content headers dans la reponse publique.', path: '/tools/security-headers', glyph: 'HDR', category: 'security', featured: true },
      { label: 'Controle robots.txt', body: 'Recuperez robots.txt same-origin et revoyez directives crawl et pistes sitemap.', path: '/tools/robots-checker', glyph: 'BOT', category: 'crawlability', featured: true },
      { label: 'Validateur sitemap', body: 'Controlez forme, statut et resume URL du sitemap.xml same-origin.', path: '/tools/sitemap-validator', glyph: 'XML', category: 'crawlability', featured: true },
      { label: 'Controle TTFB', body: 'Mesurez un echantillon first byte ponctuel depuis le runtime borne SitePulse.', path: '/tools/ttfb-check', glyph: 'MS', category: 'performance', featured: true },
      { label: 'Resume performance', body: 'Combinez statut, redirections, en-tetes, fichiers crawl et timing dans une vue triage.', path: '/tools/performance-snapshot', glyph: 'PERF', category: 'performance', featured: true },
    ],
    shortcutGroups: [
      { title: 'Le site repond?', body: 'Commencez par disponibilite et timing avant les logs application.', paths: ['/tools/status-checker', '/tools/ttfb-check'] },
      { title: 'La route a change?', body: 'Tracez redirects et statut final lors de changement domaine, CDN ou canonical.', paths: ['/tools/redirect-chain', '/tools/status-checker', '/tools/performance-snapshot'] },
      { title: 'Les crawlers peuvent lire?', body: 'Revoyez robots.txt, sitemap.xml et headers qui influencent decouverte.', paths: ['/tools/robots-checker', '/tools/sitemap-validator', '/tools/security-headers'] },
      { title: 'La page est lente?', body: 'Utilisez un snapshot borne pour separer redirect, header, octets et timing.', paths: ['/tools/performance-snapshot', '/tools/ttfb-check'] },
    ],
    footerGroups: [
      { title: 'Disponibilite', links: [{ label: 'Statut site', path: '/tools/status-checker' }, { label: 'Controle TTFB', path: '/tools/ttfb-check' }, { label: 'Resume performance', path: '/tools/performance-snapshot' }] },
      { title: 'Redirects', links: [{ label: 'Chaine redirect', path: '/tools/redirect-chain' }, { label: 'Statut final', path: '/tools/status-checker' }] },
      { title: 'Headers', links: [{ label: 'En-tetes securite', path: '/tools/security-headers' }, { label: 'En-tetes reponse', path: '/tools/security-headers' }] },
      { title: 'Fichiers crawl', links: [{ label: 'Robots.txt', path: '/tools/robots-checker' }, { label: 'Sitemap.xml', path: '/tools/sitemap-validator' }] },
      { title: 'Sequence triage', links: [{ label: 'Verifier statut', path: '/tools/status-checker' }, { label: 'Tracer redirects', path: '/tools/redirect-chain' }, { label: 'Revoir performance', path: '/tools/performance-snapshot' }] },
    ],
  },
  de: {
    eyebrow: 'Website-Status und Seitengesundheit',
    title: 'Pruefen Sie, ob eine Website antwortet, bevor Sie tiefer suchen.',
    lead: 'Starten Sie mit HTTP-Status, Weiterleitungen, Sicherheits-Headern, robots.txt, Sitemap, TTFB und begrenztem Performance-Snapshot auf einer praktischen oeffentlichen Seite.',
    primaryCta: 'Website-Status pruefen',
    secondaryCta: 'Website-Checks ansehen',
    reportTitle: 'Website-Statusbericht',
    reportUrlLabel: 'URL',
    reportUrlValue: 'https://example.com',
    reportScoreLabel: 'Beispielscore',
    reportScoreValue: '92',
    reportGrade: 'Online',
    reportBody: 'Ein nuetzlicher Webcheck beantwortet die erste Frage schnell und trennt Route, Header, Crawldateien und Timing fuer den naechsten Schritt.',
    reportSignals: [
      { label: 'Status', status: 'Online', detail: 'Die finale Antwort ist mit gesunder Statusklasse erreichbar.' },
      { label: 'Redirects', status: 'Sauber', detail: 'Der Pfad erreicht die finale URL ohne lange Kette.' },
      { label: 'Header', status: 'Pruefen', detail: 'Sicherheits-Header sind fuer Basischecks sichtbar.' },
      { label: 'Timing', status: 'Schnell', detail: 'Die TTFB-Probe bleibt im ersten Triage-Bereich.' },
    ],
    browseTitle: 'Website-Check waehlen',
    browseBody: 'Nutzen Sie SitePulse als kompakte Operations-Toolbox: oeffentliche URL eingeben, exakten Check waehlen, Status lesen und zur verantwortlichen Schicht wechseln.',
    featuredTitle: 'Mit den zuerst geprueften Signalen starten',
    featuredBody: 'Oeffnen Sie Status, Redirect-Kette, Sicherheits-Header, robots.txt, Sitemap, TTFB oder Performance-Snapshot direkt.',
    limitsTitle: 'Punktuelle Diagnose',
    limitsBody: 'Oeffentliche Checks pruefen eine URL, ausgewaehlte Header und Same-Origin-Crawldateien mit begrenzten Requests. Wiederkehrende Checks, Historie, Incidents und Reports bleiben von der kostenlosen Antwort getrennt.',
    privacyTitle: 'Ziele bleiben aus Analytics',
    privacyBody: 'Gesendete URLs, Redirect-Ziele, Header, Timings und Ergebnisdetails gehen nicht in Produkt-Analytics.',
    searchLabel: 'SitePulse-Checks suchen',
    searchPlaceholder: 'Status, Redirects, Header, Sitemap...',
    allCategories: 'Alle Website-Checks',
    noResultsTitle: 'Kein passender Website-Check',
    noResultsBody: 'Versuchen Sie ein anderes Wort oder eine Kategorie. Nur bestehende oeffentliche SitePulse-Seiten werden verlinkt.',
    allTitle: 'Alle veroeffentlichten SitePulse-Checks',
    allBody: 'Wechseln Sie zwischen Verfuegbarkeit, Routing, Sicherheits-Headern, Crawlbarkeit und Performance-Snapshots in der oeffentlichen Toolbox.',
    toolCta: 'Oeffnen',
    categories: [
      { key: 'availability', label: 'Verfuegbarkeit' },
      { key: 'routing', label: 'Weiterleitungen' },
      { key: 'security', label: 'Header' },
      { key: 'crawlability', label: 'Crawlbarkeit' },
      { key: 'performance', label: 'Performance' },
    ],
    tools: [
      { label: 'Website-Status', body: 'Prueft, ob eine oeffentliche URL antwortet, mit finalem Status, Antwortklasse und ersten Timings.', path: '/tools/status-checker', glyph: '200', category: 'availability', featured: true },
      { label: 'Redirect-Kette', body: 'Folgt begrenzten Redirects und findet Schleifen, Hostwechsel oder langsame Uebergaben.', path: '/tools/redirect-chain', glyph: '301', category: 'routing', featured: true },
      { label: 'Sicherheits-Header', body: 'Prueft HSTS, CSP, Frame, Referrer und Content Header in der oeffentlichen Antwort.', path: '/tools/security-headers', glyph: 'HDR', category: 'security', featured: true },
      { label: 'Robots.txt-Pruefung', body: 'Ruft same-origin robots.txt ab und prueft Crawl-Regeln und Sitemap-Hinweise.', path: '/tools/robots-checker', glyph: 'BOT', category: 'crawlability', featured: true },
      { label: 'Sitemap-Validator', body: 'Prueft Form, Status und URL-Zusammenfassung der same-origin sitemap.xml.', path: '/tools/sitemap-validator', glyph: 'XML', category: 'crawlability', featured: true },
      { label: 'TTFB-Pruefung', body: 'Misst eine punktuelle First-Byte-Probe aus der begrenzten SitePulse-Laufzeit.', path: '/tools/ttfb-check', glyph: 'MS', category: 'performance', featured: true },
      { label: 'Performance-Snapshot', body: 'Kombiniert Status, Redirects, Header, Crawldateien und Timing in einer Triage-Ansicht.', path: '/tools/performance-snapshot', glyph: 'PERF', category: 'performance', featured: true },
    ],
    shortcutGroups: [
      { title: 'Ist die Site erreichbar?', body: 'Starten Sie mit Erreichbarkeit und Timing vor Applikationslogs.', paths: ['/tools/status-checker', '/tools/ttfb-check'] },
      { title: 'Hat sich die Route geaendert?', body: 'Pruefen Sie Redirects und finalen Status bei Domain-, CDN- oder Canonical-Aenderungen.', paths: ['/tools/redirect-chain', '/tools/status-checker', '/tools/performance-snapshot'] },
      { title: 'Koennen Crawler lesen?', body: 'Pruefen Sie robots.txt, sitemap.xml und Header fuer Discovery.', paths: ['/tools/robots-checker', '/tools/sitemap-validator', '/tools/security-headers'] },
      { title: 'Ist die Seite langsam?', body: 'Nutzen Sie einen begrenzten Snapshot fuer Redirect-, Header-, Byte- und Timing-Symptome.', paths: ['/tools/performance-snapshot', '/tools/ttfb-check'] },
    ],
    footerGroups: [
      { title: 'Verfuegbarkeit', links: [{ label: 'Website-Status', path: '/tools/status-checker' }, { label: 'TTFB-Check', path: '/tools/ttfb-check' }, { label: 'Performance-Snapshot', path: '/tools/performance-snapshot' }] },
      { title: 'Redirects', links: [{ label: 'Redirect-Kette', path: '/tools/redirect-chain' }, { label: 'Finaler Status', path: '/tools/status-checker' }] },
      { title: 'Header', links: [{ label: 'Sicherheits-Header', path: '/tools/security-headers' }, { label: 'Antwort-Header', path: '/tools/security-headers' }] },
      { title: 'Crawldateien', links: [{ label: 'Robots.txt', path: '/tools/robots-checker' }, { label: 'Sitemap.xml', path: '/tools/sitemap-validator' }] },
      { title: 'Triagefolge', links: [{ label: 'Status pruefen', path: '/tools/status-checker' }, { label: 'Redirects verfolgen', path: '/tools/redirect-chain' }, { label: 'Performance pruefen', path: '/tools/performance-snapshot' }] },
    ],
  },
}

export const pixelBatchCatalogCopy: Record<LocaleCode, PixelBatchCatalogCopy> = {
  en: {
    eyebrow: 'Browser image tools',
    title: 'Drop an image and make it web-ready in this browser.',
    lead: 'Start with one image, choose compression, resize, crop, conversion, metadata cleanup or social presets, and download a local result without creating an account.',
    primaryCta: 'Compress an image',
    secondaryCta: 'Browse image tools',
    dropTitle: 'Drop or choose one image',
    dropBody: 'PNG, JPEG, WebP and browser-supported AVIF files can be previewed locally before you decide the output.',
    dropAction: 'Choose image',
    dropPrivacy: 'Your image stays in this browser',
    dropFormatsLabel: 'Input formats',
    dropFormats: 'PNG, JPEG, WebP, AVIF',
    previewTitle: 'Local preview plan',
    previewRows: [
      { label: 'Original', value: '2400 x 1600 PNG' },
      { label: 'Target', value: 'WebP, 72% quality' },
      { label: 'Expected result', value: 'Smaller web copy' },
    ],
    browseTitle: 'Choose an image workflow',
    browseBody: 'Open the exact PixelBatch tool you need: optimize a product photo, resize a hero image, crop for a channel, convert a format, clean metadata or create social dimensions.',
    featuredTitle: 'Start with visible image tasks',
    featuredBody: 'Each published PixelBatch page starts with a browser-side file workflow, preview, privacy checklist and download path before deeper notes.',
    limitsTitle: 'One local image at a time',
    limitsBody: 'The public tools process one image in browser memory with size limits and supported Canvas encoders. Batch folders, saved presets, larger files, API and automation stay separate from the free answer.',
    privacyTitle: 'File values stay out of analytics',
    privacyBody: 'File names, pixels, dimensions, metadata, selected settings and generated bytes are not sent to product analytics events.',
    searchLabel: 'Search PixelBatch tools',
    searchPlaceholder: 'Try compress, resize, crop, convert...',
    allCategories: 'All image tools',
    noResultsTitle: 'No matching image tool',
    noResultsBody: 'Try another keyword or category. Only public PixelBatch pages that already exist are linked here.',
    allTitle: 'All published PixelBatch tools',
    allBody: 'Move between compression, resizing, crop, conversion, metadata cleanup and social presets without leaving the public image toolbox.',
    toolCta: 'Open tool',
    categories: [
      { key: 'optimize', label: 'Optimize' },
      { key: 'resize', label: 'Resize' },
      { key: 'crop', label: 'Crop' },
      { key: 'convert', label: 'Convert' },
      { key: 'privacy', label: 'Privacy' },
      { key: 'presets', label: 'Presets' },
    ],
    tools: [
      { label: 'Image Compressor', body: 'Re-encode one image with quality control and compare the lighter local output.', path: '/tools/image-compressor', glyph: 'ZIP', category: 'optimize', featured: true },
      { label: 'Image Resizer', body: 'Set width, height or proportional dimensions and download a browser-side resized copy.', path: '/tools/image-resizer', glyph: 'SIZE', category: 'resize', featured: true },
      { label: 'Image Cropper', body: 'Create centered square, portrait or landscape crops from a selected image.', path: '/tools/image-cropper', glyph: 'CROP', category: 'crop', featured: true },
      { label: 'Image Converter', body: 'Convert PNG, JPEG, WebP and browser-supported AVIF to another common format.', path: '/tools/image-converter', glyph: 'TYPE', category: 'convert', featured: true },
      { label: 'Metadata Remover', body: 'Draw visible pixels to a clean Canvas and download a re-encoded copy without EXIF carryover.', path: '/tools/metadata-remover', glyph: 'EXIF', category: 'privacy', featured: true },
      { label: 'Social Preset Generator', body: 'Create square, story, Open Graph and marketplace dimensions from one original.', path: '/tools/social-preset-generator', glyph: 'SOC', category: 'presets', featured: true },
    ],
    shortcutGroups: [
      { title: 'Make a product image lighter', body: 'Compress first, then convert or remove metadata before publishing.', paths: ['/tools/image-compressor', '/tools/image-converter', '/tools/metadata-remover'] },
      { title: 'Prepare a launch visual', body: 'Resize and crop one asset into channel-ready dimensions.', paths: ['/tools/image-resizer', '/tools/image-cropper', '/tools/social-preset-generator'] },
      { title: 'Clean a public share', body: 'Create a web copy that keeps visible pixels and removes hidden camera fields where supported.', paths: ['/tools/metadata-remover', '/tools/image-compressor'] },
    ],
    footerGroups: [
      { title: 'Optimize', links: [{ label: 'Compress image', path: '/tools/image-compressor' }, { label: 'Convert image', path: '/tools/image-converter' }] },
      { title: 'Dimensions', links: [{ label: 'Resize image', path: '/tools/image-resizer' }, { label: 'Crop image', path: '/tools/image-cropper' }] },
      { title: 'Privacy', links: [{ label: 'Remove metadata', path: '/tools/metadata-remover' }, { label: 'Clean web copy', path: '/tools/metadata-remover' }] },
      { title: 'Channels', links: [{ label: 'Social presets', path: '/tools/social-preset-generator' }, { label: 'Open Graph size', path: '/tools/social-preset-generator' }] },
      { title: 'Quick sequence', links: [{ label: 'Compress first', path: '/tools/image-compressor' }, { label: 'Resize next', path: '/tools/image-resizer' }, { label: 'Clean metadata', path: '/tools/metadata-remover' }] },
    ],
  },
  'pt-br': {
    eyebrow: 'Ferramentas de imagem no navegador',
    title: 'Solte uma imagem e deixe-a pronta para web neste navegador.',
    lead: 'Comece com uma imagem, escolha compressão, redimensionamento, corte, conversão, limpeza de metadados ou presets sociais e baixe um resultado local sem criar conta.',
    primaryCta: 'Comprimir imagem',
    secondaryCta: 'Ver ferramentas de imagem',
    dropTitle: 'Solte ou escolha uma imagem',
    dropBody: 'Arquivos PNG, JPEG, WebP e AVIF aceitos pelo navegador podem ser pré-visualizados localmente antes da saída.',
    dropAction: 'Escolher imagem',
    dropPrivacy: 'Sua imagem fica neste navegador',
    dropFormatsLabel: 'Formatos de entrada',
    dropFormats: 'PNG, JPEG, WebP, AVIF',
    previewTitle: 'Plano de prévia local',
    previewRows: [
      { label: 'Original', value: '2400 x 1600 PNG' },
      { label: 'Destino', value: 'WebP, qualidade 72%' },
      { label: 'Resultado esperado', value: 'Cópia web menor' },
    ],
    browseTitle: 'Escolha um fluxo de imagem',
    browseBody: 'Abra a ferramenta PixelBatch exata: otimize foto de produto, redimensione hero, corte para um canal, converta formato, limpe metadados ou gere tamanhos sociais.',
    featuredTitle: 'Comece pelas tarefas visuais',
    featuredBody: 'Cada página publicada do PixelBatch abre com fluxo de arquivo no navegador, prévia, checklist de privacidade e download antes de notas profundas.',
    limitsTitle: 'Uma imagem local por vez',
    limitsBody: 'As ferramentas públicas processam uma imagem na memória do navegador com limites de tamanho e encoders Canvas suportados. Lotes, presets salvos, arquivos maiores, API e automação ficam separados da resposta gratuita.',
    privacyTitle: 'Valores do arquivo fora do analytics',
    privacyBody: 'Nomes de arquivo, pixels, dimensões, metadados, opções escolhidas e bytes gerados não entram em eventos de analytics do produto.',
    searchLabel: 'Buscar ferramentas PixelBatch',
    searchPlaceholder: 'Tente comprimir, redimensionar, cortar, converter...',
    allCategories: 'Todas as ferramentas de imagem',
    noResultsTitle: 'Nenhuma ferramenta encontrada',
    noResultsBody: 'Tente outra palavra ou categoria. Só entram links para páginas PixelBatch públicas existentes.',
    allTitle: 'Todas as ferramentas PixelBatch publicadas',
    allBody: 'Alterne entre compressão, redimensionamento, corte, conversão, limpeza de metadados e presets sociais sem sair da toolbox pública de imagem.',
    toolCta: 'Abrir ferramenta',
    categories: [
      { key: 'optimize', label: 'Otimizar' },
      { key: 'resize', label: 'Redimensionar' },
      { key: 'crop', label: 'Cortar' },
      { key: 'convert', label: 'Converter' },
      { key: 'privacy', label: 'Privacidade' },
      { key: 'presets', label: 'Presets' },
    ],
    tools: [
      { label: 'Compressor de imagem', body: 'Recodifique uma imagem com controle de qualidade e compare a saída local mais leve.', path: '/tools/image-compressor', glyph: 'ZIP', category: 'optimize', featured: true },
      { label: 'Redimensionador de imagem', body: 'Defina largura, altura ou dimensões proporcionais e baixe uma cópia local redimensionada.', path: '/tools/image-resizer', glyph: 'SIZE', category: 'resize', featured: true },
      { label: 'Cortador de imagem', body: 'Crie cortes centralizados quadrados, verticais ou horizontais a partir da imagem selecionada.', path: '/tools/image-cropper', glyph: 'CROP', category: 'crop', featured: true },
      { label: 'Conversor de imagem', body: 'Converta PNG, JPEG, WebP e AVIF aceito pelo navegador para outro formato comum.', path: '/tools/image-converter', glyph: 'TYPE', category: 'convert', featured: true },
      { label: 'Removedor de metadados', body: 'Redesenhe pixels visíveis em Canvas limpo e baixe uma cópia recodificada sem carregar EXIF.', path: '/tools/metadata-remover', glyph: 'EXIF', category: 'privacy', featured: true },
      { label: 'Gerador de presets sociais', body: 'Crie dimensões quadradas, story, Open Graph e marketplace a partir de um original.', path: '/tools/social-preset-generator', glyph: 'SOC', category: 'presets', featured: true },
    ],
    shortcutGroups: [
      { title: 'Deixar produto mais leve', body: 'Comprima primeiro, depois converta ou remova metadados antes de publicar.', paths: ['/tools/image-compressor', '/tools/image-converter', '/tools/metadata-remover'] },
      { title: 'Preparar ativo de lançamento', body: 'Redimensione e corte um asset para dimensões prontas por canal.', paths: ['/tools/image-resizer', '/tools/image-cropper', '/tools/social-preset-generator'] },
      { title: 'Limpar compartilhamento público', body: 'Crie uma cópia web com pixels visíveis e sem campos ocultos de câmera quando suportado.', paths: ['/tools/metadata-remover', '/tools/image-compressor'] },
    ],
    footerGroups: [
      { title: 'Otimizar', links: [{ label: 'Comprimir imagem', path: '/tools/image-compressor' }, { label: 'Converter imagem', path: '/tools/image-converter' }] },
      { title: 'Dimensões', links: [{ label: 'Redimensionar imagem', path: '/tools/image-resizer' }, { label: 'Cortar imagem', path: '/tools/image-cropper' }] },
      { title: 'Privacidade', links: [{ label: 'Remover metadados', path: '/tools/metadata-remover' }, { label: 'Cópia web limpa', path: '/tools/metadata-remover' }] },
      { title: 'Canais', links: [{ label: 'Presets sociais', path: '/tools/social-preset-generator' }, { label: 'Tamanho Open Graph', path: '/tools/social-preset-generator' }] },
      { title: 'Sequência rápida', links: [{ label: 'Comprimir primeiro', path: '/tools/image-compressor' }, { label: 'Redimensionar depois', path: '/tools/image-resizer' }, { label: 'Limpar metadados', path: '/tools/metadata-remover' }] },
    ],
  },
  es: {
    eyebrow: 'Herramientas de imagen en el navegador',
    title: 'Suelta una imagen y déjala lista para la web en este navegador.',
    lead: 'Empieza con una imagen, elige compresión, redimensionado, recorte, conversión, limpieza de metadatos o presets sociales y descarga un resultado local sin crear cuenta.',
    primaryCta: 'Comprimir imagen',
    secondaryCta: 'Ver herramientas de imagen',
    dropTitle: 'Suelta o elige una imagen',
    dropBody: 'Archivos PNG, JPEG, WebP y AVIF admitidos por el navegador se pueden previsualizar localmente antes de la salida.',
    dropAction: 'Elegir imagen',
    dropPrivacy: 'Tu imagen se queda en este navegador',
    dropFormatsLabel: 'Formatos de entrada',
    dropFormats: 'PNG, JPEG, WebP, AVIF',
    previewTitle: 'Plan de vista previa local',
    previewRows: [
      { label: 'Original', value: '2400 x 1600 PNG' },
      { label: 'Destino', value: 'WebP, calidad 72%' },
      { label: 'Resultado esperado', value: 'Copia web menor' },
    ],
    browseTitle: 'Elige un flujo de imagen',
    browseBody: 'Abre la herramienta PixelBatch exacta: optimiza una foto de producto, redimensiona un hero, recorta para un canal, convierte formato, limpia metadatos o crea tamaños sociales.',
    featuredTitle: 'Empieza por tareas visuales',
    featuredBody: 'Cada página publicada de PixelBatch empieza con archivo en navegador, vista previa, checklist de privacidad y descarga antes de notas profundas.',
    limitsTitle: 'Una imagen local por vez',
    limitsBody: 'Las herramientas públicas procesan una imagen en memoria del navegador con límites de tamaño y encoders Canvas admitidos. Lotes, presets guardados, archivos mayores, API y automatización quedan separados de la respuesta gratis.',
    privacyTitle: 'Valores del archivo fuera de analytics',
    privacyBody: 'Nombres de archivo, píxeles, dimensiones, metadatos, opciones elegidas y bytes generados no entran en eventos de analytics del producto.',
    searchLabel: 'Buscar herramientas PixelBatch',
    searchPlaceholder: 'Prueba comprimir, redimensionar, recortar...',
    allCategories: 'Todas las herramientas de imagen',
    noResultsTitle: 'No hay herramienta coincidente',
    noResultsBody: 'Prueba otra palabra o categoría. Solo enlazamos páginas públicas PixelBatch existentes.',
    allTitle: 'Todas las herramientas PixelBatch publicadas',
    allBody: 'Alterna entre compresión, redimensionado, recorte, conversión, limpieza de metadatos y presets sociales sin salir de la toolbox pública de imagen.',
    toolCta: 'Abrir herramienta',
    categories: [
      { key: 'optimize', label: 'Optimizar' },
      { key: 'resize', label: 'Redimensionar' },
      { key: 'crop', label: 'Recortar' },
      { key: 'convert', label: 'Convertir' },
      { key: 'privacy', label: 'Privacidad' },
      { key: 'presets', label: 'Presets' },
    ],
    tools: [
      { label: 'Compresor de imagen', body: 'Recodifica una imagen con control de calidad y compara la salida local más ligera.', path: '/tools/image-compressor', glyph: 'ZIP', category: 'optimize', featured: true },
      { label: 'Redimensionador de imagen', body: 'Define ancho, alto o dimensiones proporcionales y descarga una copia local redimensionada.', path: '/tools/image-resizer', glyph: 'SIZE', category: 'resize', featured: true },
      { label: 'Recortador de imagen', body: 'Crea recortes centrados cuadrados, verticales u horizontales desde una imagen.', path: '/tools/image-cropper', glyph: 'CROP', category: 'crop', featured: true },
      { label: 'Conversor de imagen', body: 'Convierte PNG, JPEG, WebP y AVIF admitido por el navegador a otro formato común.', path: '/tools/image-converter', glyph: 'TYPE', category: 'convert', featured: true },
      { label: 'Eliminador de metadatos', body: 'Dibuja píxeles visibles en Canvas limpio y descarga una copia recodificada sin EXIF.', path: '/tools/metadata-remover', glyph: 'EXIF', category: 'privacy', featured: true },
      { label: 'Generador de presets sociales', body: 'Crea dimensiones cuadradas, story, Open Graph y marketplace desde un original.', path: '/tools/social-preset-generator', glyph: 'SOC', category: 'presets', featured: true },
    ],
    shortcutGroups: [
      { title: 'Aligerar imagen de producto', body: 'Comprime primero, luego convierte o elimina metadatos antes de publicar.', paths: ['/tools/image-compressor', '/tools/image-converter', '/tools/metadata-remover'] },
      { title: 'Preparar activo de lanzamiento', body: 'Redimensiona y recorta un asset para dimensiones listas por canal.', paths: ['/tools/image-resizer', '/tools/image-cropper', '/tools/social-preset-generator'] },
      { title: 'Limpiar un compartido público', body: 'Crea una copia web con píxeles visibles y sin campos ocultos de cámara cuando sea compatible.', paths: ['/tools/metadata-remover', '/tools/image-compressor'] },
    ],
    footerGroups: [
      { title: 'Optimizar', links: [{ label: 'Comprimir imagen', path: '/tools/image-compressor' }, { label: 'Convertir imagen', path: '/tools/image-converter' }] },
      { title: 'Dimensiones', links: [{ label: 'Redimensionar imagen', path: '/tools/image-resizer' }, { label: 'Recortar imagen', path: '/tools/image-cropper' }] },
      { title: 'Privacidad', links: [{ label: 'Eliminar metadatos', path: '/tools/metadata-remover' }, { label: 'Copia web limpia', path: '/tools/metadata-remover' }] },
      { title: 'Canales', links: [{ label: 'Presets sociales', path: '/tools/social-preset-generator' }, { label: 'Tamaño Open Graph', path: '/tools/social-preset-generator' }] },
      { title: 'Secuencia rápida', links: [{ label: 'Comprimir primero', path: '/tools/image-compressor' }, { label: 'Redimensionar después', path: '/tools/image-resizer' }, { label: 'Limpiar metadatos', path: '/tools/metadata-remover' }] },
    ],
  },
  fr: {
    eyebrow: 'Outils image dans le navigateur',
    title: 'Déposez une image et préparez-la pour le web dans ce navigateur.',
    lead: 'Commencez avec une image, choisissez compression, redimensionnement, recadrage, conversion, nettoyage métadonnées ou formats sociaux, puis téléchargez un résultat local sans compte.',
    primaryCta: 'Compresser une image',
    secondaryCta: 'Voir outils image',
    dropTitle: 'Déposer ou choisir une image',
    dropBody: 'Les fichiers PNG, JPEG, WebP et AVIF pris en charge par le navigateur peuvent être prévisualisés localement avant la sortie.',
    dropAction: 'Choisir image',
    dropPrivacy: 'Votre image reste dans ce navigateur',
    dropFormatsLabel: 'Formats entrée',
    dropFormats: 'PNG, JPEG, WebP, AVIF',
    previewTitle: 'Plan de prévisualisation locale',
    previewRows: [
      { label: 'Original', value: '2400 x 1600 PNG' },
      { label: 'Cible', value: 'WebP, qualité 72%' },
      { label: 'Résultat attendu', value: 'Copie web plus légère' },
    ],
    browseTitle: 'Choisir un flux image',
    browseBody: 'Ouvrez le bon outil PixelBatch: optimiser une photo produit, redimensionner un hero, recadrer pour un canal, convertir, nettoyer les métadonnées ou créer des tailles sociales.',
    featuredTitle: 'Commencer par les tâches visuelles',
    featuredBody: 'Chaque page PixelBatch publiée commence par un fichier dans le navigateur, une prévisualisation, une checklist confidentialité et un téléchargement avant les notes détaillées.',
    limitsTitle: 'Une image locale à la fois',
    limitsBody: 'Les outils publics traitent une image en mémoire navigateur avec limites de taille et encodeurs Canvas pris en charge. Lots, presets sauvegardés, gros fichiers, API et automatisation restent séparés de la réponse gratuite.',
    privacyTitle: 'Valeurs fichier hors analytics',
    privacyBody: 'Noms de fichier, pixels, dimensions, métadonnées, options choisies et octets générés ne partent pas dans les événements analytics produit.',
    searchLabel: 'Chercher outils PixelBatch',
    searchPlaceholder: 'Essayez compresser, redimensionner, recadrer...',
    allCategories: 'Tous les outils image',
    noResultsTitle: 'Aucun outil correspondant',
    noResultsBody: 'Essayez un autre mot ou une catégorie. Seules les pages publiques PixelBatch existantes sont liées.',
    allTitle: 'Tous les outils PixelBatch publiés',
    allBody: 'Passez entre compression, redimensionnement, recadrage, conversion, nettoyage métadonnées et formats sociaux sans quitter la toolbox image publique.',
    toolCta: 'Ouvrir',
    categories: [
      { key: 'optimize', label: 'Optimiser' },
      { key: 'resize', label: 'Redimensionner' },
      { key: 'crop', label: 'Recadrer' },
      { key: 'convert', label: 'Convertir' },
      { key: 'privacy', label: 'Confidentialité' },
      { key: 'presets', label: 'Formats' },
    ],
    tools: [
      { label: 'Compresseur image', body: 'Réencodez une image avec contrôle qualité et comparez la sortie locale plus légère.', path: '/tools/image-compressor', glyph: 'ZIP', category: 'optimize', featured: true },
      { label: 'Redimensionneur image', body: 'Définissez largeur, hauteur ou dimensions proportionnelles et téléchargez une copie locale.', path: '/tools/image-resizer', glyph: 'SIZE', category: 'resize', featured: true },
      { label: 'Recadreur image', body: 'Créez des recadrages centrés carrés, verticaux ou horizontaux depuis une image.', path: '/tools/image-cropper', glyph: 'CROP', category: 'crop', featured: true },
      { label: 'Convertisseur image', body: 'Convertissez PNG, JPEG, WebP et AVIF pris en charge vers un autre format courant.', path: '/tools/image-converter', glyph: 'TYPE', category: 'convert', featured: true },
      { label: 'Suppression métadonnées', body: 'Dessinez les pixels visibles dans un Canvas propre et téléchargez une copie sans EXIF.', path: '/tools/metadata-remover', glyph: 'EXIF', category: 'privacy', featured: true },
      { label: 'Générateur formats sociaux', body: 'Créez des dimensions carré, story, Open Graph et marketplace depuis un original.', path: '/tools/social-preset-generator', glyph: 'SOC', category: 'presets', featured: true },
    ],
    shortcutGroups: [
      { title: 'Alléger une image produit', body: 'Compressez d abord, puis convertissez ou supprimez les métadonnées avant publication.', paths: ['/tools/image-compressor', '/tools/image-converter', '/tools/metadata-remover'] },
      { title: 'Préparer un visuel de lancement', body: 'Redimensionnez et recadrez un asset pour des dimensions prêtes par canal.', paths: ['/tools/image-resizer', '/tools/image-cropper', '/tools/social-preset-generator'] },
      { title: 'Nettoyer un partage public', body: 'Créez une copie web avec pixels visibles et sans champs caméra cachés quand possible.', paths: ['/tools/metadata-remover', '/tools/image-compressor'] },
    ],
    footerGroups: [
      { title: 'Optimiser', links: [{ label: 'Compresser image', path: '/tools/image-compressor' }, { label: 'Convertir image', path: '/tools/image-converter' }] },
      { title: 'Dimensions', links: [{ label: 'Redimensionner image', path: '/tools/image-resizer' }, { label: 'Recadrer image', path: '/tools/image-cropper' }] },
      { title: 'Confidentialité', links: [{ label: 'Supprimer métadonnées', path: '/tools/metadata-remover' }, { label: 'Copie web propre', path: '/tools/metadata-remover' }] },
      { title: 'Canaux', links: [{ label: 'Formats sociaux', path: '/tools/social-preset-generator' }, { label: 'Taille Open Graph', path: '/tools/social-preset-generator' }] },
      { title: 'Séquence rapide', links: [{ label: 'Compresser d abord', path: '/tools/image-compressor' }, { label: 'Redimensionner ensuite', path: '/tools/image-resizer' }, { label: 'Nettoyer métadonnées', path: '/tools/metadata-remover' }] },
    ],
  },
  de: {
    eyebrow: 'Bildwerkzeuge im Browser',
    title: 'Bild ablegen und direkt in diesem Browser webfertig machen.',
    lead: 'Starten Sie mit einem Bild, wählen Sie Komprimierung, Skalierung, Zuschnitt, Konvertierung, Metadaten-Bereinigung oder Social-Presets und laden Sie ein lokales Ergebnis ohne Konto herunter.',
    primaryCta: 'Bild komprimieren',
    secondaryCta: 'Bildtools ansehen',
    dropTitle: 'Bild ablegen oder auswählen',
    dropBody: 'PNG, JPEG, WebP und browserunterstützte AVIF-Dateien können lokal geprüft werden, bevor Sie die Ausgabe wählen.',
    dropAction: 'Bild wählen',
    dropPrivacy: 'Ihr Bild bleibt in diesem Browser',
    dropFormatsLabel: 'Eingabeformate',
    dropFormats: 'PNG, JPEG, WebP, AVIF',
    previewTitle: 'Lokaler Vorschauplan',
    previewRows: [
      { label: 'Original', value: '2400 x 1600 PNG' },
      { label: 'Ziel', value: 'WebP, Qualität 72%' },
      { label: 'Erwartetes Ergebnis', value: 'Kleinere Web-Kopie' },
    ],
    browseTitle: 'Bildworkflow wählen',
    browseBody: 'Öffnen Sie das passende PixelBatch-Tool: Produktfoto optimieren, Hero-Bild skalieren, Kanalzuschnitt erstellen, Format konvertieren, Metadaten bereinigen oder Social-Größen erzeugen.',
    featuredTitle: 'Mit sichtbaren Bildaufgaben starten',
    featuredBody: 'Jede veröffentlichte PixelBatch-Seite startet mit Browser-Dateiablauf, Vorschau, Datenschutz-Checkliste und Download vor tieferen Notizen.',
    limitsTitle: 'Ein lokales Bild pro Durchgang',
    limitsBody: 'Die öffentlichen Tools verarbeiten ein Bild im Browserspeicher mit Größenlimits und unterstützten Canvas-Encodern. Ordnerbatches, gespeicherte Presets, größere Dateien, API und Automatisierung bleiben getrennt von der kostenlosen Antwort.',
    privacyTitle: 'Dateiwerte bleiben aus Analytics',
    privacyBody: 'Dateinamen, Pixel, Dimensionen, Metadaten, gewählte Einstellungen und erzeugte Bytes werden nicht an Produkt-Analytics gesendet.',
    searchLabel: 'PixelBatch-Tools suchen',
    searchPlaceholder: 'Komprimieren, skalieren, zuschneiden...',
    allCategories: 'Alle Bildtools',
    noResultsTitle: 'Kein passendes Bildtool',
    noResultsBody: 'Versuchen Sie ein anderes Wort oder eine Kategorie. Nur bestehende öffentliche PixelBatch-Seiten werden verlinkt.',
    allTitle: 'Alle veröffentlichten PixelBatch-Tools',
    allBody: 'Wechseln Sie zwischen Komprimierung, Skalierung, Zuschnitt, Konvertierung, Metadaten-Bereinigung und Social-Presets.',
    toolCta: 'Öffnen',
    categories: [
      { key: 'optimize', label: 'Optimieren' },
      { key: 'resize', label: 'Skalieren' },
      { key: 'crop', label: 'Zuschneiden' },
      { key: 'convert', label: 'Konvertieren' },
      { key: 'privacy', label: 'Datenschutz' },
      { key: 'presets', label: 'Presets' },
    ],
    tools: [
      { label: 'Bildkompressor', body: 'Codieren Sie ein Bild mit Qualitätskontrolle neu und vergleichen Sie die leichtere lokale Ausgabe.', path: '/tools/image-compressor', glyph: 'ZIP', category: 'optimize', featured: true },
      { label: 'Bild skalieren', body: 'Setzen Sie Breite, Höhe oder proportionale Maße und laden Sie eine lokale Kopie herunter.', path: '/tools/image-resizer', glyph: 'SIZE', category: 'resize', featured: true },
      { label: 'Bild zuschneiden', body: 'Erstellen Sie zentrierte quadratische, Hoch- oder Querformat-Zuschnitte.', path: '/tools/image-cropper', glyph: 'CROP', category: 'crop', featured: true },
      { label: 'Bildkonverter', body: 'Konvertieren Sie PNG, JPEG, WebP und unterstütztes AVIF in ein anderes Format.', path: '/tools/image-converter', glyph: 'TYPE', category: 'convert', featured: true },
      { label: 'Metadaten entfernen', body: 'Zeichnen Sie sichtbare Pixel in ein sauberes Canvas und laden Sie eine Kopie ohne EXIF mit.', path: '/tools/metadata-remover', glyph: 'EXIF', category: 'privacy', featured: true },
      { label: 'Social-Preset-Generator', body: 'Erzeugen Sie Quadrat-, Story-, Open-Graph- und Marketplace-Größen aus einem Original.', path: '/tools/social-preset-generator', glyph: 'SOC', category: 'presets', featured: true },
    ],
    shortcutGroups: [
      { title: 'Produktbild verkleinern', body: 'Zuerst komprimieren, dann konvertieren oder Metadaten vor Veröffentlichung entfernen.', paths: ['/tools/image-compressor', '/tools/image-converter', '/tools/metadata-remover'] },
      { title: 'Launch-Asset vorbereiten', body: 'Ein Asset für kanalbereite Dimensionen skalieren und zuschneiden.', paths: ['/tools/image-resizer', '/tools/image-cropper', '/tools/social-preset-generator'] },
      { title: 'Öffentliche Freigabe bereinigen', body: 'Eine Web-Kopie mit sichtbaren Pixeln und ohne versteckte Kamerafelder erstellen.', paths: ['/tools/metadata-remover', '/tools/image-compressor'] },
    ],
    footerGroups: [
      { title: 'Optimieren', links: [{ label: 'Bild komprimieren', path: '/tools/image-compressor' }, { label: 'Bild konvertieren', path: '/tools/image-converter' }] },
      { title: 'Dimensionen', links: [{ label: 'Bild skalieren', path: '/tools/image-resizer' }, { label: 'Bild zuschneiden', path: '/tools/image-cropper' }] },
      { title: 'Datenschutz', links: [{ label: 'Metadaten entfernen', path: '/tools/metadata-remover' }, { label: 'Saubere Web-Kopie', path: '/tools/metadata-remover' }] },
      { title: 'Kanäle', links: [{ label: 'Social-Presets', path: '/tools/social-preset-generator' }, { label: 'Open-Graph-Größe', path: '/tools/social-preset-generator' }] },
      { title: 'Schnellfolge', links: [{ label: 'Zuerst komprimieren', path: '/tools/image-compressor' }, { label: 'Danach skalieren', path: '/tools/image-resizer' }, { label: 'Metadaten reinigen', path: '/tools/metadata-remover' }] },
    ],
  },
}

export const docShiftCatalogCopy: Record<LocaleCode, DocShiftCatalogCopy> = {
  en: {
    eyebrow: 'PDF tools in the browser',
    title: 'Choose a PDF task and handle the file in this browser.',
    lead: 'Merge, split, rotate, compress, watermark, number pages, clean metadata or turn text into a PDF with a practical local workflow and no account requirement.',
    primaryCta: 'Merge PDFs',
    secondaryCta: 'Browse PDF tools',
    dropTitle: 'Drop or choose PDF files',
    dropBody: 'Start with a small PDF task. The public tools open a local workbench before any account step.',
    dropAction: 'Choose PDF task',
    dropPrivacy: 'Files stay in this browser for supported free tasks',
    dropFormatsLabel: 'Supported inputs',
    dropFormats: 'PDF and plain text',
    previewTitle: 'PDF workflow snapshot',
    previewRows: [
      { label: 'Input', value: '2 small PDFs' },
      { label: 'Task', value: 'Merge in order' },
      { label: 'Output', value: 'Downloadable PDF' },
    ],
    browseTitle: 'Choose a PDF workflow',
    browseBody: 'Open the exact DocShift tool you need: combine documents, extract pages, rotate scans, reduce size, add a watermark, add page numbers, clean metadata or convert plain text.',
    featuredTitle: 'Start with visible PDF tasks',
    featuredBody: 'Every published DocShift page opens with a practical file or text workflow, a result panel and privacy guidance before deeper notes.',
    limitsTitle: 'Small document tasks first',
    limitsBody: 'Public tools are designed for practical browser-side jobs with file-size and memory limits. Larger document pipelines, OCR, shared history and automation stay separate from the free task.',
    privacyTitle: 'Document values stay out of analytics',
    privacyBody: 'File names, page ranges, document text, metadata fields and generated bytes are not sent to product analytics events.',
    searchLabel: 'Search DocShift tools',
    searchPlaceholder: 'Try merge, split, rotate, watermark...',
    allCategories: 'All PDF tools',
    noResultsTitle: 'No matching PDF tool',
    noResultsBody: 'Try another keyword or category. Only public DocShift pages that already exist are linked here.',
    allTitle: 'All published DocShift tools',
    allBody: 'Move between merge, split, rotate, compression, watermark, page numbers, metadata cleanup and text conversion without leaving the public PDF toolbox.',
    toolCta: 'Open tool',
    categories: [
      { key: 'organize', label: 'Organize' },
      { key: 'pages', label: 'Pages' },
      { key: 'optimize', label: 'Optimize' },
      { key: 'annotate', label: 'Mark' },
      { key: 'privacy', label: 'Privacy' },
      { key: 'convert', label: 'Convert' },
    ],
    tools: [
      { label: 'PDF Merge', body: 'Combine multiple PDFs into one local output with a clear file order.', path: '/tools/pdf-merge', glyph: 'MERGE', category: 'organize', featured: true },
      { label: 'PDF Split', body: 'Choose page ranges and create a smaller PDF from the selected pages.', path: '/tools/pdf-split', glyph: 'SPLIT', category: 'organize', featured: true },
      { label: 'PDF Rotate', body: 'Rotate all pages or a range so scanned pages face the right direction.', path: '/tools/pdf-rotate', glyph: 'ROT', category: 'pages', featured: true },
      { label: 'PDF Compressor', body: 'Rewrite a PDF for a lighter browser-side copy when the file allows it.', path: '/tools/pdf-compressor', glyph: 'ZIP', category: 'optimize', featured: true },
      { label: 'PDF Watermark', body: 'Add a simple text watermark to a document before sharing a draft.', path: '/tools/pdf-watermark', glyph: 'MARK', category: 'annotate', featured: true },
      { label: 'Page Numbers', body: 'Add page numbers with a simple position and starting number.', path: '/tools/page-numbers', glyph: '123', category: 'pages', featured: true },
      { label: 'Metadata Cleaner', body: 'Review and replace basic title and author metadata for a cleaner copy.', path: '/tools/metadata-cleaner', glyph: 'META', category: 'privacy', featured: true },
      { label: 'Text to PDF', body: 'Paste plain text and download a simple PDF document from the browser.', path: '/tools/text-to-pdf', glyph: 'TXT', category: 'convert', featured: true },
    ],
    shortcutGroups: [
      { title: 'Combine and organize documents', body: 'Merge files, split a range and rotate pages before sending a clean copy.', paths: ['/tools/pdf-merge', '/tools/pdf-split', '/tools/pdf-rotate'] },
      { title: 'Prepare a draft for sharing', body: 'Reduce size, add a watermark and include page numbers for review rounds.', paths: ['/tools/pdf-compressor', '/tools/pdf-watermark', '/tools/page-numbers'] },
      { title: 'Create a cleaner PDF', body: 'Clean metadata or convert plain text into a simple downloadable document.', paths: ['/tools/metadata-cleaner', '/tools/text-to-pdf'] },
    ],
    footerGroups: [
      { title: 'Organize PDF', links: [{ label: 'Merge PDF', path: '/tools/pdf-merge' }, { label: 'Split PDF', path: '/tools/pdf-split' }, { label: 'Rotate PDF', path: '/tools/pdf-rotate' }] },
      { title: 'Optimize PDF', links: [{ label: 'Compress PDF', path: '/tools/pdf-compressor' }, { label: 'Reduce file copy', path: '/tools/pdf-compressor' }] },
      { title: 'Edit pages', links: [{ label: 'Add page numbers', path: '/tools/page-numbers' }, { label: 'Watermark PDF', path: '/tools/pdf-watermark' }] },
      { title: 'Clean document', links: [{ label: 'Clean metadata', path: '/tools/metadata-cleaner' }, { label: 'Edit title and author', path: '/tools/metadata-cleaner' }] },
      { title: 'Create PDF', links: [{ label: 'Text to PDF', path: '/tools/text-to-pdf' }, { label: 'Merge after text', path: '/tools/pdf-merge' }, { label: 'Clean PDF metadata', path: '/tools/metadata-cleaner' }] },
    ],
  },
  'pt-br': {
    eyebrow: 'Ferramentas de PDF no navegador',
    title: 'Escolha uma tarefa de PDF e trate o arquivo neste navegador.',
    lead: 'Una, divida, gire, comprima, aplique marca d água, numere páginas, limpe metadados ou transforme texto em PDF com um fluxo local prático e sem cadastro obrigatório.',
    primaryCta: 'Unir PDFs',
    secondaryCta: 'Ver ferramentas de PDF',
    dropTitle: 'Solte ou escolha arquivos PDF',
    dropBody: 'Comece por uma tarefa pequena de PDF. As ferramentas públicas abrem uma área local de trabalho antes de qualquer etapa de conta.',
    dropAction: 'Escolher tarefa de PDF',
    dropPrivacy: 'Os arquivos ficam neste navegador nas tarefas gratuitas compatíveis',
    dropFormatsLabel: 'Entradas aceitas',
    dropFormats: 'PDF e texto simples',
    previewTitle: 'Resumo do fluxo PDF',
    previewRows: [
      { label: 'Entrada', value: '2 PDFs pequenos' },
      { label: 'Tarefa', value: 'Unir em ordem' },
      { label: 'Saída', value: 'PDF para baixar' },
    ],
    browseTitle: 'Escolha um fluxo de PDF',
    browseBody: 'Abra a ferramenta DocShift exata: combine documentos, extraia páginas, gire digitalizações, reduza tamanho, aplique marca d água, numere páginas, limpe metadados ou converta texto simples.',
    featuredTitle: 'Comece pelas tarefas de PDF visíveis',
    featuredBody: 'Cada página publicada do DocShift abre com fluxo prático de arquivo ou texto, painel de resultado e orientação de privacidade antes das notas profundas.',
    limitsTitle: 'Tarefas pequenas de documento primeiro',
    limitsBody: 'As ferramentas públicas foram desenhadas para trabalhos práticos no navegador, com limites de tamanho e memória. Pipelines maiores, OCR, histórico compartilhado e automação ficam separados da tarefa gratuita.',
    privacyTitle: 'Valores do documento fora das métricas',
    privacyBody: 'Nomes de arquivo, intervalos de páginas, texto do documento, campos de metadados e bytes gerados não entram em eventos de métricas do produto.',
    searchLabel: 'Buscar ferramentas DocShift',
    searchPlaceholder: 'Tente unir, dividir, girar, marca d água...',
    allCategories: 'Todas as ferramentas de PDF',
    noResultsTitle: 'Nenhuma ferramenta de PDF encontrada',
    noResultsBody: 'Tente outra palavra ou categoria. Só entram links para páginas DocShift públicas existentes.',
    allTitle: 'Todas as ferramentas DocShift publicadas',
    allBody: 'Alterne entre unir, dividir, girar, comprimir, marca d água, numeração, metadados e conversão de texto sem sair da caixa pública de PDF.',
    toolCta: 'Abrir ferramenta',
    categories: [
      { key: 'organize', label: 'Organizar' },
      { key: 'pages', label: 'Páginas' },
      { key: 'optimize', label: 'Otimizar' },
      { key: 'annotate', label: 'Marcar' },
      { key: 'privacy', label: 'Privacidade' },
      { key: 'convert', label: 'Converter' },
    ],
    tools: [
      { label: 'Unir PDFs', body: 'Combine vários PDFs em uma saída local com ordem clara dos arquivos.', path: '/tools/pdf-merge', glyph: 'MERGE', category: 'organize', featured: true },
      { label: 'Dividir PDF', body: 'Escolha intervalos de páginas e crie um PDF menor com as páginas selecionadas.', path: '/tools/pdf-split', glyph: 'SPLIT', category: 'organize', featured: true },
      { label: 'Girar PDF', body: 'Gire todas as páginas ou um intervalo para corrigir digitalizações.', path: '/tools/pdf-rotate', glyph: 'ROT', category: 'pages', featured: true },
      { label: 'Compressor de PDF', body: 'Reescreva um PDF para uma cópia local mais leve quando o arquivo permitir.', path: '/tools/pdf-compressor', glyph: 'ZIP', category: 'optimize', featured: true },
      { label: 'Marca d água em PDF', body: 'Adicione uma marca d água simples de texto antes de compartilhar um rascunho.', path: '/tools/pdf-watermark', glyph: 'MARK', category: 'annotate', featured: true },
      { label: 'Números de página', body: 'Adicione numeração com posição e número inicial simples.', path: '/tools/page-numbers', glyph: '123', category: 'pages', featured: true },
      { label: 'Limpador de metadados', body: 'Revise e substitua metadados básicos de título e autor em uma cópia limpa.', path: '/tools/metadata-cleaner', glyph: 'META', category: 'privacy', featured: true },
      { label: 'Texto para PDF', body: 'Cole texto simples e baixe um documento PDF criado no navegador.', path: '/tools/text-to-pdf', glyph: 'TXT', category: 'convert', featured: true },
    ],
    shortcutGroups: [
      { title: 'Combinar e organizar documentos', body: 'Una arquivos, divida um intervalo e gire páginas antes de enviar uma cópia limpa.', paths: ['/tools/pdf-merge', '/tools/pdf-split', '/tools/pdf-rotate'] },
      { title: 'Preparar rascunho para compartilhar', body: 'Reduza tamanho, aplique marca d água e inclua números de página para revisão.', paths: ['/tools/pdf-compressor', '/tools/pdf-watermark', '/tools/page-numbers'] },
      { title: 'Criar um PDF mais limpo', body: 'Limpe metadados ou converta texto simples em um documento para baixar.', paths: ['/tools/metadata-cleaner', '/tools/text-to-pdf'] },
    ],
    footerGroups: [
      { title: 'Organizar PDF', links: [{ label: 'Unir PDF', path: '/tools/pdf-merge' }, { label: 'Dividir PDF', path: '/tools/pdf-split' }, { label: 'Girar PDF', path: '/tools/pdf-rotate' }] },
      { title: 'Otimizar PDF', links: [{ label: 'Comprimir PDF', path: '/tools/pdf-compressor' }, { label: 'Reduzir cópia', path: '/tools/pdf-compressor' }] },
      { title: 'Editar páginas', links: [{ label: 'Adicionar números', path: '/tools/page-numbers' }, { label: 'Marca d água', path: '/tools/pdf-watermark' }] },
      { title: 'Limpar documento', links: [{ label: 'Limpar metadados', path: '/tools/metadata-cleaner' }, { label: 'Editar título e autor', path: '/tools/metadata-cleaner' }] },
      { title: 'Criar PDF', links: [{ label: 'Texto para PDF', path: '/tools/text-to-pdf' }, { label: 'Unir depois do texto', path: '/tools/pdf-merge' }, { label: 'Limpar metadados PDF', path: '/tools/metadata-cleaner' }] },
    ],
  },
  es: {
    eyebrow: 'Herramientas PDF en el navegador',
    title: 'Elige una tarea PDF y procesa el archivo en este navegador.',
    lead: 'Une, divide, rota, comprime, marca, numera páginas, limpia metadatos o convierte texto en PDF con un flujo local práctico y sin registro obligatorio.',
    primaryCta: 'Unir PDF',
    secondaryCta: 'Ver herramientas PDF',
    dropTitle: 'Suelta o elige archivos PDF',
    dropBody: 'Empieza con una tarea PDF pequeña. Las herramientas públicas abren un área local de trabajo antes de cualquier paso de cuenta.',
    dropAction: 'Elegir tarea PDF',
    dropPrivacy: 'Los archivos quedan en este navegador en tareas gratis compatibles',
    dropFormatsLabel: 'Entradas admitidas',
    dropFormats: 'PDF y texto simple',
    previewTitle: 'Resumen del flujo PDF',
    previewRows: [
      { label: 'Entrada', value: '2 PDF pequeños' },
      { label: 'Tarea', value: 'Unir en orden' },
      { label: 'Salida', value: 'PDF descargable' },
    ],
    browseTitle: 'Elige un flujo PDF',
    browseBody: 'Abre la herramienta DocShift exacta: combina documentos, extrae páginas, rota escaneos, reduce tamaño, agrega marca de agua, numera páginas, limpia metadatos o convierte texto.',
    featuredTitle: 'Empieza por tareas PDF visibles',
    featuredBody: 'Cada página publicada de DocShift empieza con un flujo práctico de archivo o texto, panel de resultado y guía de privacidad antes de notas profundas.',
    limitsTitle: 'Primero tareas pequeñas de documento',
    limitsBody: 'Las herramientas públicas están diseñadas para trabajos prácticos en el navegador, con límites de tamaño y memoria. Flujos mayores, OCR, historial compartido y automatización quedan separados de la tarea gratis.',
    privacyTitle: 'Valores del documento fuera de métricas',
    privacyBody: 'Nombres de archivo, rangos de páginas, texto del documento, campos de metadatos y bytes generados no entran en eventos de métricas del producto.',
    searchLabel: 'Buscar herramientas DocShift',
    searchPlaceholder: 'Prueba unir, dividir, rotar, marca...',
    allCategories: 'Todas las herramientas PDF',
    noResultsTitle: 'No hay herramienta PDF coincidente',
    noResultsBody: 'Prueba otra palabra o categoría. Solo enlazamos páginas públicas DocShift existentes.',
    allTitle: 'Todas las herramientas DocShift publicadas',
    allBody: 'Alterna entre unir, dividir, rotar, comprimir, marca de agua, numeración, metadatos y conversión de texto sin salir de la caja pública PDF.',
    toolCta: 'Abrir herramienta',
    categories: [
      { key: 'organize', label: 'Organizar' },
      { key: 'pages', label: 'Páginas' },
      { key: 'optimize', label: 'Optimizar' },
      { key: 'annotate', label: 'Marcar' },
      { key: 'privacy', label: 'Privacidad' },
      { key: 'convert', label: 'Convertir' },
    ],
    tools: [
      { label: 'Unir PDF', body: 'Combina varios PDF en una salida local con orden claro de archivos.', path: '/tools/pdf-merge', glyph: 'MERGE', category: 'organize', featured: true },
      { label: 'Dividir PDF', body: 'Elige rangos de páginas y crea un PDF menor con las páginas seleccionadas.', path: '/tools/pdf-split', glyph: 'SPLIT', category: 'organize', featured: true },
      { label: 'Rotar PDF', body: 'Rota todas las páginas o un rango para corregir escaneos.', path: '/tools/pdf-rotate', glyph: 'ROT', category: 'pages', featured: true },
      { label: 'Compresor PDF', body: 'Reescribe un PDF para una copia local más ligera cuando el archivo lo permita.', path: '/tools/pdf-compressor', glyph: 'ZIP', category: 'optimize', featured: true },
      { label: 'Marca de agua PDF', body: 'Agrega una marca de agua simple de texto antes de compartir un borrador.', path: '/tools/pdf-watermark', glyph: 'MARK', category: 'annotate', featured: true },
      { label: 'Números de página', body: 'Agrega numeración con posición y número inicial simples.', path: '/tools/page-numbers', glyph: '123', category: 'pages', featured: true },
      { label: 'Limpiador de metadatos', body: 'Revisa y reemplaza título y autor básicos para una copia más limpia.', path: '/tools/metadata-cleaner', glyph: 'META', category: 'privacy', featured: true },
      { label: 'Texto a PDF', body: 'Pega texto simple y descarga un documento PDF creado en el navegador.', path: '/tools/text-to-pdf', glyph: 'TXT', category: 'convert', featured: true },
    ],
    shortcutGroups: [
      { title: 'Combinar y organizar documentos', body: 'Une archivos, divide un rango y rota páginas antes de enviar una copia limpia.', paths: ['/tools/pdf-merge', '/tools/pdf-split', '/tools/pdf-rotate'] },
      { title: 'Preparar borrador para compartir', body: 'Reduce tamaño, agrega marca de agua e incluye números de página para revisión.', paths: ['/tools/pdf-compressor', '/tools/pdf-watermark', '/tools/page-numbers'] },
      { title: 'Crear un PDF más limpio', body: 'Limpia metadatos o convierte texto simple en un documento descargable.', paths: ['/tools/metadata-cleaner', '/tools/text-to-pdf'] },
    ],
    footerGroups: [
      { title: 'Organizar PDF', links: [{ label: 'Unir PDF', path: '/tools/pdf-merge' }, { label: 'Dividir PDF', path: '/tools/pdf-split' }, { label: 'Rotar PDF', path: '/tools/pdf-rotate' }] },
      { title: 'Optimizar PDF', links: [{ label: 'Comprimir PDF', path: '/tools/pdf-compressor' }, { label: 'Reducir copia', path: '/tools/pdf-compressor' }] },
      { title: 'Editar páginas', links: [{ label: 'Agregar números', path: '/tools/page-numbers' }, { label: 'Marca de agua', path: '/tools/pdf-watermark' }] },
      { title: 'Limpiar documento', links: [{ label: 'Limpiar metadatos', path: '/tools/metadata-cleaner' }, { label: 'Editar título y autor', path: '/tools/metadata-cleaner' }] },
      { title: 'Crear PDF', links: [{ label: 'Texto a PDF', path: '/tools/text-to-pdf' }, { label: 'Unir después del texto', path: '/tools/pdf-merge' }, { label: 'Limpiar metadatos PDF', path: '/tools/metadata-cleaner' }] },
    ],
  },
  fr: {
    eyebrow: 'Outils PDF dans le navigateur',
    title: 'Choisissez une tâche PDF et traitez le fichier dans ce navigateur.',
    lead: 'Fusionnez, séparez, pivotez, compressez, filigranez, numérotez les pages, nettoyez les métadonnées ou transformez du texte en PDF avec un flux local pratique sans compte obligatoire.',
    primaryCta: 'Fusionner PDF',
    secondaryCta: 'Voir outils PDF',
    dropTitle: 'Déposer ou choisir des PDF',
    dropBody: 'Commencez avec une petite tâche PDF. Les outils publics ouvrent un espace local avant toute étape de compte.',
    dropAction: 'Choisir tâche PDF',
    dropPrivacy: 'Les fichiers restent dans ce navigateur pour les tâches gratuites compatibles',
    dropFormatsLabel: 'Entrées prises en charge',
    dropFormats: 'PDF et texte simple',
    previewTitle: 'Résumé du flux PDF',
    previewRows: [
      { label: 'Entrée', value: '2 petits PDF' },
      { label: 'Tâche', value: 'Fusion en ordre' },
      { label: 'Sortie', value: 'PDF téléchargeable' },
    ],
    browseTitle: 'Choisir un flux PDF',
    browseBody: 'Ouvrez le bon outil DocShift: combiner des documents, extraire des pages, pivoter des scans, réduire la taille, ajouter un filigrane, numéroter, nettoyer les métadonnées ou convertir du texte.',
    featuredTitle: 'Commencer par les tâches PDF visibles',
    featuredBody: 'Chaque page DocShift publiée commence par un flux pratique fichier ou texte, un panneau de résultat et des repères confidentialité avant les notes détaillées.',
    limitsTitle: 'Petites tâches documentaires d abord',
    limitsBody: 'Les outils publics sont conçus pour des travaux pratiques dans le navigateur, avec limites de taille et mémoire. Les flux plus grands, OCR, historique partagé et automatisation restent séparés de la tâche gratuite.',
    privacyTitle: 'Valeurs du document hors métriques',
    privacyBody: 'Noms de fichier, plages de pages, texte du document, champs de métadonnées et octets générés ne partent pas dans les événements métriques produit.',
    searchLabel: 'Chercher outils DocShift',
    searchPlaceholder: 'Essayez fusion, séparation, rotation, filigrane...',
    allCategories: 'Tous les outils PDF',
    noResultsTitle: 'Aucun outil PDF correspondant',
    noResultsBody: 'Essayez un autre mot ou une catégorie. Seules les pages publiques DocShift existantes sont liées.',
    allTitle: 'Tous les outils DocShift publiés',
    allBody: 'Passez entre fusion, séparation, rotation, compression, filigrane, numérotation, métadonnées et conversion texte sans quitter la boîte PDF publique.',
    toolCta: 'Ouvrir',
    categories: [
      { key: 'organize', label: 'Organiser' },
      { key: 'pages', label: 'Pages' },
      { key: 'optimize', label: 'Optimiser' },
      { key: 'annotate', label: 'Marquer' },
      { key: 'privacy', label: 'Confidentialité' },
      { key: 'convert', label: 'Convertir' },
    ],
    tools: [
      { label: 'Fusion PDF', body: 'Combinez plusieurs PDF en une sortie locale avec ordre clair des fichiers.', path: '/tools/pdf-merge', glyph: 'MERGE', category: 'organize', featured: true },
      { label: 'Séparation PDF', body: 'Choisissez des plages de pages et créez un PDF plus petit.', path: '/tools/pdf-split', glyph: 'SPLIT', category: 'organize', featured: true },
      { label: 'Rotation PDF', body: 'Pivotez toutes les pages ou une plage pour corriger des scans.', path: '/tools/pdf-rotate', glyph: 'ROT', category: 'pages', featured: true },
      { label: 'Compresseur PDF', body: 'Réécrivez un PDF pour une copie locale plus légère quand le fichier le permet.', path: '/tools/pdf-compressor', glyph: 'ZIP', category: 'optimize', featured: true },
      { label: 'Filigrane PDF', body: 'Ajoutez un filigrane texte simple avant de partager un brouillon.', path: '/tools/pdf-watermark', glyph: 'MARK', category: 'annotate', featured: true },
      { label: 'Numéros de page', body: 'Ajoutez une numérotation avec position et numéro initial simples.', path: '/tools/page-numbers', glyph: '123', category: 'pages', featured: true },
      { label: 'Nettoyage métadonnées', body: 'Révisez et remplacez titre et auteur basiques pour une copie plus propre.', path: '/tools/metadata-cleaner', glyph: 'META', category: 'privacy', featured: true },
      { label: 'Texte vers PDF', body: 'Collez du texte simple et téléchargez un PDF créé dans le navigateur.', path: '/tools/text-to-pdf', glyph: 'TXT', category: 'convert', featured: true },
    ],
    shortcutGroups: [
      { title: 'Combiner et organiser documents', body: 'Fusionnez, séparez une plage et pivotez des pages avant d envoyer une copie propre.', paths: ['/tools/pdf-merge', '/tools/pdf-split', '/tools/pdf-rotate'] },
      { title: 'Préparer un brouillon à partager', body: 'Réduisez la taille, ajoutez un filigrane et incluez des numéros pour revue.', paths: ['/tools/pdf-compressor', '/tools/pdf-watermark', '/tools/page-numbers'] },
      { title: 'Créer un PDF plus propre', body: 'Nettoyez les métadonnées ou convertissez du texte simple en document téléchargeable.', paths: ['/tools/metadata-cleaner', '/tools/text-to-pdf'] },
    ],
    footerGroups: [
      { title: 'Organiser PDF', links: [{ label: 'Fusionner PDF', path: '/tools/pdf-merge' }, { label: 'Séparer PDF', path: '/tools/pdf-split' }, { label: 'Pivoter PDF', path: '/tools/pdf-rotate' }] },
      { title: 'Optimiser PDF', links: [{ label: 'Compresser PDF', path: '/tools/pdf-compressor' }, { label: 'Réduire copie', path: '/tools/pdf-compressor' }] },
      { title: 'Modifier pages', links: [{ label: 'Ajouter numéros', path: '/tools/page-numbers' }, { label: 'Filigrane', path: '/tools/pdf-watermark' }] },
      { title: 'Nettoyer document', links: [{ label: 'Nettoyer métadonnées', path: '/tools/metadata-cleaner' }, { label: 'Modifier titre auteur', path: '/tools/metadata-cleaner' }] },
      { title: 'Créer PDF', links: [{ label: 'Texte vers PDF', path: '/tools/text-to-pdf' }, { label: 'Fusion après texte', path: '/tools/pdf-merge' }, { label: 'Nettoyer métadonnées PDF', path: '/tools/metadata-cleaner' }] },
    ],
  },
  de: {
    eyebrow: 'PDF-Tools im Browser',
    title: 'PDF-Aufgabe wählen und Datei in diesem Browser bearbeiten.',
    lead: 'PDFs zusammenführen, teilen, drehen, komprimieren, mit Wasserzeichen versehen, Seiten nummerieren, Metadaten bereinigen oder Text in PDF umwandeln, ohne Pflichtkonto.',
    primaryCta: 'PDFs zusammenführen',
    secondaryCta: 'PDF-Tools ansehen',
    dropTitle: 'PDF-Dateien ablegen oder auswählen',
    dropBody: 'Beginnen Sie mit einer kleinen PDF-Aufgabe. Die öffentlichen Tools öffnen zuerst einen lokalen Arbeitsbereich.',
    dropAction: 'PDF-Aufgabe wählen',
    dropPrivacy: 'Dateien bleiben bei unterstützten kostenlosen Aufgaben in diesem Browser',
    dropFormatsLabel: 'Unterstützte Eingaben',
    dropFormats: 'PDF und Klartext',
    previewTitle: 'PDF-Ablauf im Überblick',
    previewRows: [
      { label: 'Eingabe', value: '2 kleine PDFs' },
      { label: 'Aufgabe', value: 'In Reihenfolge zusammenführen' },
      { label: 'Ausgabe', value: 'PDF zum Herunterladen' },
    ],
    browseTitle: 'PDF-Workflow wählen',
    browseBody: 'Öffnen Sie das passende DocShift-Tool: Dokumente kombinieren, Seiten extrahieren, Scans drehen, Größe reduzieren, Wasserzeichen setzen, Seiten nummerieren, Metadaten bereinigen oder Text konvertieren.',
    featuredTitle: 'Mit sichtbaren PDF-Aufgaben starten',
    featuredBody: 'Jede veröffentlichte DocShift-Seite startet mit einem praktischen Datei- oder Textablauf, Ergebnisbereich und Datenschutzhinweisen vor den Detailnotizen.',
    limitsTitle: 'Kleine Dokumentaufgaben zuerst',
    limitsBody: 'Die öffentlichen Tools sind für praktische Browser-Aufgaben mit Größen- und Speichergrenzen ausgelegt. Größere Dokumentabläufe, OCR, gemeinsamer Verlauf und Automatisierung bleiben von der kostenlosen Aufgabe getrennt.',
    privacyTitle: 'Dokumentwerte bleiben aus Metriken',
    privacyBody: 'Dateinamen, Seitenbereiche, Dokumenttext, Metadatenfelder und erzeugte Bytes werden nicht an Produktmetriken gesendet.',
    searchLabel: 'DocShift-Tools suchen',
    searchPlaceholder: 'Zusammenführen, teilen, drehen, Wasserzeichen...',
    allCategories: 'Alle PDF-Tools',
    noResultsTitle: 'Kein passendes PDF-Tool',
    noResultsBody: 'Versuchen Sie ein anderes Wort oder eine Kategorie. Nur bestehende öffentliche DocShift-Seiten werden verlinkt.',
    allTitle: 'Alle veröffentlichten DocShift-Tools',
    allBody: 'Wechseln Sie zwischen Zusammenführen, Teilen, Drehen, Kompression, Wasserzeichen, Seitennummern, Metadaten und Textkonvertierung.',
    toolCta: 'Öffnen',
    categories: [
      { key: 'organize', label: 'Organisieren' },
      { key: 'pages', label: 'Seiten' },
      { key: 'optimize', label: 'Optimieren' },
      { key: 'annotate', label: 'Markieren' },
      { key: 'privacy', label: 'Datenschutz' },
      { key: 'convert', label: 'Konvertieren' },
    ],
    tools: [
      { label: 'PDF zusammenführen', body: 'Mehrere PDFs zu einer lokalen Ausgabe mit klarer Reihenfolge kombinieren.', path: '/tools/pdf-merge', glyph: 'MERGE', category: 'organize', featured: true },
      { label: 'PDF teilen', body: 'Seitenbereiche wählen und ein kleineres PDF aus gewählten Seiten erstellen.', path: '/tools/pdf-split', glyph: 'SPLIT', category: 'organize', featured: true },
      { label: 'PDF drehen', body: 'Alle Seiten oder einen Bereich drehen, damit Scans korrekt ausgerichtet sind.', path: '/tools/pdf-rotate', glyph: 'ROT', category: 'pages', featured: true },
      { label: 'PDF komprimieren', body: 'Ein PDF neu schreiben, um eine leichtere lokale Kopie zu erstellen.', path: '/tools/pdf-compressor', glyph: 'ZIP', category: 'optimize', featured: true },
      { label: 'PDF-Wasserzeichen', body: 'Ein einfaches Textwasserzeichen vor dem Teilen eines Entwurfs hinzufügen.', path: '/tools/pdf-watermark', glyph: 'MARK', category: 'annotate', featured: true },
      { label: 'Seitennummern', body: 'Seitennummern mit einfacher Position und Startnummer hinzufügen.', path: '/tools/page-numbers', glyph: '123', category: 'pages', featured: true },
      { label: 'Metadaten bereinigen', body: 'Basistitel und Autor prüfen und für eine sauberere Kopie ersetzen.', path: '/tools/metadata-cleaner', glyph: 'META', category: 'privacy', featured: true },
      { label: 'Text zu PDF', body: 'Klartext einfügen und ein einfaches PDF im Browser herunterladen.', path: '/tools/text-to-pdf', glyph: 'TXT', category: 'convert', featured: true },
    ],
    shortcutGroups: [
      { title: 'Dokumente kombinieren und ordnen', body: 'Dateien zusammenführen, Bereiche teilen und Seiten vor dem Versand drehen.', paths: ['/tools/pdf-merge', '/tools/pdf-split', '/tools/pdf-rotate'] },
      { title: 'Entwurf zum Teilen vorbereiten', body: 'Größe reduzieren, Wasserzeichen setzen und Seitennummern für Reviews ergänzen.', paths: ['/tools/pdf-compressor', '/tools/pdf-watermark', '/tools/page-numbers'] },
      { title: 'Saubereres PDF erstellen', body: 'Metadaten bereinigen oder Klartext in ein herunterladbares Dokument wandeln.', paths: ['/tools/metadata-cleaner', '/tools/text-to-pdf'] },
    ],
    footerGroups: [
      { title: 'PDF organisieren', links: [{ label: 'PDF zusammenführen', path: '/tools/pdf-merge' }, { label: 'PDF teilen', path: '/tools/pdf-split' }, { label: 'PDF drehen', path: '/tools/pdf-rotate' }] },
      { title: 'PDF optimieren', links: [{ label: 'PDF komprimieren', path: '/tools/pdf-compressor' }, { label: 'Kopie reduzieren', path: '/tools/pdf-compressor' }] },
      { title: 'Seiten bearbeiten', links: [{ label: 'Nummern hinzufügen', path: '/tools/page-numbers' }, { label: 'Wasserzeichen', path: '/tools/pdf-watermark' }] },
      { title: 'Dokument reinigen', links: [{ label: 'Metadaten bereinigen', path: '/tools/metadata-cleaner' }, { label: 'Titel und Autor', path: '/tools/metadata-cleaner' }] },
      { title: 'PDF erstellen', links: [{ label: 'Text zu PDF', path: '/tools/text-to-pdf' }, { label: 'Danach zusammenführen', path: '/tools/pdf-merge' }, { label: 'PDF-Metadaten bereinigen', path: '/tools/metadata-cleaner' }] },
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

export function getQrRouteCatalogCopy(locale: LocaleCode): QrRouteCatalogCopy {
  return sanitizePublicCopy(locale, qrRouteCatalogCopy[locale])
}

export function getInvoiceCraftCatalogCopy(locale: LocaleCode): InvoiceCraftCatalogCopy {
  return sanitizePublicCopy(locale, invoiceCraftCatalogCopy[locale])
}

export function getMailHealthCatalogCopy(locale: LocaleCode): MailHealthCatalogCopy {
  return sanitizePublicCopy(locale, mailHealthCatalogCopy[locale])
}

export function getSitePulseCatalogCopy(locale: LocaleCode): SitePulseCatalogCopy {
  return sanitizePublicCopy(locale, sitePulseCatalogCopy[locale])
}

export function getPixelBatchCatalogCopy(locale: LocaleCode): PixelBatchCatalogCopy {
  return sanitizePublicCopy(locale, pixelBatchCatalogCopy[locale])
}

export function getDocShiftCatalogCopy(locale: LocaleCode): DocShiftCatalogCopy {
  return sanitizePublicCopy(locale, docShiftCatalogCopy[locale])
}

export function getFooterCopy(locale: LocaleCode): FooterCopy {
  return sanitizePublicCopy(locale, footerCopy[locale])
}
