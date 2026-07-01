import { publicLocaleCodes, sanitizePublicCopy, type LocaleCode } from './locales'

export const qrRouteToolSlugs = [
  'static-qr-code',
  'barcode-generator',
  'utm-builder',
  'vcard-qr',
  'wifi-qr',
  'preview-lab',
] as const

export type QrRouteToolSlug = (typeof qrRouteToolSlugs)[number]
export type QrRouteToolCategory = 'qr' | 'barcode' | 'campaign' | 'contact' | 'network' | 'preview'
export type QrRouteToolMode = string
export type PreviewKind = 'qr' | 'barcode' | 'text'

export interface ContentSection {
  heading: string
  paragraphs: string[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface QrRouteToolCopy {
  title: string
  shortName: string
  headline: string
  description: string
  inputLabel: string
  secondaryInputLabel: string
  modeLabel: string
  resultLabel: string
  previewLabel: string
  freeScope: string
  upgradeScope: string
  reviewedLabel: string
  contentSections: ContentSection[]
  faq: FaqItem[]
}

export interface QrRouteToolOption {
  value: QrRouteToolMode
  label: string
}

export interface QrRouteToolDefinition {
  slug: QrRouteToolSlug
  category: QrRouteToolCategory
  modes: QrRouteToolOption[]
  localizedModes: Record<LocaleCode, QrRouteToolOption[]>
  acceptsSecondaryInput: boolean
  samplePrimary: string
  sampleSecondary: string
  localized: Record<LocaleCode, QrRouteToolCopy>
}

export interface ResultMeta {
  label: string
  value: string
}

export interface QrRouteToolResult {
  ok: boolean
  output: string
  meta: ResultMeta[]
  previewKind: PreviewKind
  previewPayload: string
  error?: string
}

export interface QrRoutePayloadSummary {
  label: string
  value: string
  details: ResultMeta[]
}

interface QrRouteToolSpec {
  slug: QrRouteToolSlug
  category: QrRouteToolCategory
  title: string
  shortName: string
  headline: string
  description: string
  inputLabel: string
  secondaryInputLabel: string
  freeScope: string
  upgradeScope: string
  modes: QrRouteToolOption[]
  acceptsSecondaryInput?: boolean
  samplePrimary: string
  sampleSecondary?: string
}

type LocalizedToolSpecCopy = Pick<
  QrRouteToolSpec,
  'title'
  | 'shortName'
  | 'headline'
  | 'description'
  | 'inputLabel'
  | 'secondaryInputLabel'
  | 'freeScope'
  | 'upgradeScope'
> & {
  modes: QrRouteToolOption[]
}

const reviewed: Record<LocaleCode, string> = {
  en: 'Reviewed June 26, 2026',
  'pt-br': 'Revisado em 26 de junho de 2026',
  es: 'Revisado el 26 de junio de 2026',
  fr: 'Revise le 26 juin 2026',
  de: 'Geprueft am 26. Juni 2026',
}

const localizedBasics: Record<LocaleCode, {
  modeLabel: string
  resultLabel: string
  previewLabel: string
  localSection: string
  localBody: string
  abuseSection: string
  abuseBody: string
  limitsSection: string
  limitsBody: string
  faqStorage: FaqItem
  faqDynamic: FaqItem
}> = {
  en: {
    modeLabel: 'Mode',
    resultLabel: 'Payload',
    previewLabel: 'Preview',
    localSection: 'Local generation',
    localBody: 'QRRoute generates static QR, barcode, campaign, vCard and Wi-Fi payloads in the browser without mandatory signup.',
    abuseSection: 'Abuse controls',
    abuseBody: 'The free builder blocks dangerous URL schemes, local hosts, credentialed URLs and oversized payloads before a preview is generated.',
    limitsSection: 'Limits',
    limitsBody: 'Static codes do not provide editable destinations, scans, analytics, branded domains, bulk jobs or redirect monitoring.',
    faqStorage: { question: 'Are destinations or contact details stored?', answer: 'No. QRRoute does not save inputs, create accounts, write browser storage or send payload contents to analytics.' },
    faqDynamic: { question: 'Can I edit a QR code after printing it?', answer: 'Not in the free static builder. Editable QR codes, short links, analytics and custom domains are advanced account features for a future account workflow.' },
  },
  'pt-br': {
    modeLabel: 'Modo',
    resultLabel: 'Payload',
    previewLabel: 'Preview',
    localSection: 'Geracao local',
    localBody: 'O QRRoute gera QR estatico, barcode, campanha, vCard e Wi-Fi no navegador sem cadastro obrigatorio.',
    abuseSection: 'Controles antiabuso',
    abuseBody: 'O construtor gratuito rejeita esquemas perigosos, hosts locais, URLs com credenciais e payloads grandes antes do preview.',
    limitsSection: 'Limites',
    limitsBody: 'Codigos estaticos nao oferecem destino editavel, scans, analytics, dominio proprio, lote ou monitoramento de redirect.',
    faqStorage: { question: 'Destinos ou contatos sao armazenados?', answer: 'Nao. O QRRoute nao salva entradas, nao cria conta, nao grava storage e nao envia payloads para analytics.' },
    faqDynamic: { question: 'Posso editar um QR depois de imprimir?', answer: 'Nao no construtor estatico gratuito. QR editavel, short links, analytics e dominio proprio sao recursos avancados de conta para uma versao futura.' },
  },
  es: {
    modeLabel: 'Modo',
    resultLabel: 'Payload',
    previewLabel: 'Vista previa',
    localSection: 'Generacion local',
    localBody: 'QRRoute genera QR estatico, barcode, campana, vCard y Wi-Fi en el navegador sin registro obligatorio.',
    abuseSection: 'Controles antiabuso',
    abuseBody: 'El builder gratis rechaza esquemas peligrosos, hosts locales, URLs con credenciales y payloads grandes antes de previsualizar.',
    limitsSection: 'Limites',
    limitsBody: 'Los codigos estaticos no incluyen destino editable, escaneos, analytics, dominio propio, lotes ni monitoreo de redirects.',
    faqStorage: { question: 'Se guardan destinos o contactos?', answer: 'No. QRRoute no guarda entradas, no crea cuentas, no escribe storage ni envia payloads a analytics.' },
    faqDynamic: { question: 'Puedo editar un QR despues de imprimir?', answer: 'No en el builder estatico gratis. QR editable, short links, analytics y dominio propio son funciones avanzadas de cuenta para una version futura.' },
  },
  fr: {
    modeLabel: 'Mode',
    resultLabel: 'Payload',
    previewLabel: 'Apercu',
    localSection: 'Generation locale',
    localBody: 'QRRoute genere QR statique, code-barres, campagne, vCard et Wi-Fi dans le navigateur sans compte obligatoire.',
    abuseSection: 'Controles anti-abus',
    abuseBody: 'Le builder gratuit refuse les schemas dangereux, hosts locaux, URLs avec identifiants et payloads trop grands avant apercu.',
    limitsSection: 'Limites',
    limitsBody: 'Les codes statiques n incluent pas destination editable, scans, analytics, domaine personnalise, lot ni monitoring redirect.',
    faqStorage: { question: 'Les destinations ou contacts sont-ils stockes?', answer: 'Non. QRRoute ne sauvegarde pas les entrees, ne cree pas de compte, n ecrit pas de storage et n envoie pas les payloads a analytics.' },
    faqDynamic: { question: 'Puis-je modifier un QR apres impression?', answer: 'Pas dans le builder statique gratuit. QR editable, short links, analytics et domaine propre sont des fonctions de compte avance pour une version future.' },
  },
  de: {
    modeLabel: 'Modus',
    resultLabel: 'Payload',
    previewLabel: 'Vorschau',
    localSection: 'Lokale Generierung',
    localBody: 'QRRoute erzeugt statische QR-Codes, Barcodes, Kampagnen, vCards und Wi-Fi-Payloads im Browser ohne Pflichtkonto.',
    abuseSection: 'Missbrauchsschutz',
    abuseBody: 'Der kostenlose Builder blockiert gefaehrliche URL-Schemata, lokale Hosts, URLs mit Zugangsdaten und zu grosse Payloads vor der Vorschau.',
    limitsSection: 'Grenzen',
    limitsBody: 'Statische Codes bieten keine editierbaren Ziele, Scans, Analytics, eigene Domains, Batch-Jobs oder Redirect-Ueberwachung.',
    faqStorage: { question: 'Werden Ziele oder Kontaktdaten gespeichert?', answer: 'Nein. QRRoute speichert keine Eingaben, erstellt keine Konten, nutzt kein Storage und sendet Payloads nicht an Analytics.' },
    faqDynamic: { question: 'Kann ich einen QR nach dem Druck aendern?', answer: 'Nicht im kostenlosen statischen Builder. Editierbare QR-Codes, Short Links, Analytics und eigene Domains sind erweiterte Kontofunktionen fuer eine spaetere Version.' },
  },
}

const specs: QrRouteToolSpec[] = [
  {
    slug: 'static-qr-code',
    category: 'qr',
    title: 'Static QR Code Generator',
    shortName: 'Static QR',
    headline: 'Create a scannable static QR code for a safe URL, plain text, email or phone payload.',
    description: 'Choose a payload type and generate an SVG preview locally. URL mode blocks risky schemes and local destinations.',
    inputLabel: 'URL, text, email or phone value',
    secondaryInputLabel: 'Optional label for your own notes',
    freeScope: 'One static QR payload with SVG preview and copyable encoded value.',
    upgradeScope: 'Dynamic QR, editable destinations, scan analytics, branded short links, custom domain, teams and bulk creation.',
    modes: [
      { value: 'url', label: 'Safe URL' },
      { value: 'text', label: 'Plain text' },
      { value: 'email', label: 'Email address' },
      { value: 'phone', label: 'Phone number' },
    ],
    samplePrimary: 'https://example.com/product-launch',
    sampleSecondary: 'Printed flyer QR',
  },
  {
    slug: 'barcode-generator',
    category: 'barcode',
    title: 'Barcode Generator',
    shortName: 'Barcode',
    headline: 'Generate a Code 128 barcode preview for short inventory, ticket or reference values.',
    description: 'Enter a short ASCII code. The browser renders a Code 128 SVG preview with label and size controls.',
    inputLabel: 'Barcode value',
    secondaryInputLabel: 'Optional human-readable label',
    freeScope: 'One Code 128 barcode preview for a short value with no server-side storage.',
    upgradeScope: 'Bulk barcode sheets, templates, labels, saved assets, API rendering and workspace history.',
    modes: [{ value: 'code128', label: 'Code 128' }],
    samplePrimary: 'INV-2026-0042',
    sampleSecondary: 'Sample inventory label',
  },
  {
    slug: 'utm-builder',
    category: 'campaign',
    title: 'UTM Builder',
    shortName: 'UTM',
    headline: 'Build a tagged campaign URL and QR preview without sending the destination to a server.',
    description: 'Start with an HTTPS URL and add source, medium, campaign, term or content fields as key-value lines.',
    inputLabel: 'Base campaign URL',
    secondaryInputLabel: 'UTM fields, one per line',
    freeScope: 'One tagged URL with standard UTM parameters, copyable output and local QR preview.',
    upgradeScope: 'Saved campaigns, naming rules, branded short links, scan/click analytics, approvals and bulk generation.',
    modes: [{ value: 'standard', label: 'Standard UTM tags' }],
    samplePrimary: 'https://example.com/pricing',
    sampleSecondary: 'source=newsletter\nmedium=email\ncampaign=summer-launch\ncontent=hero-cta',
  },
  {
    slug: 'vcard-qr',
    category: 'contact',
    title: 'vCard QR Builder',
    shortName: 'vCard',
    headline: 'Turn a small contact profile into a vCard payload and QR preview locally.',
    description: 'Enter name, organization, email, phone and website as lines. The output uses a compact vCard 4.0 payload.',
    inputLabel: 'Contact lines',
    secondaryInputLabel: 'Optional note',
    freeScope: 'One local vCard QR payload with no CRM, account or contact database.',
    upgradeScope: 'Saved contacts, branded cards, team directories, bulk QR batches, CRM export and scan analytics.',
    modes: [{ value: 'vcard4', label: 'vCard 4.0' }],
    samplePrimary: 'Alex Morgan\nExample Studio\nalex@example.com\n+1 555 0100\nhttps://example.com',
    sampleSecondary: 'Event badge',
  },
  {
    slug: 'wifi-qr',
    category: 'network',
    title: 'Wi-Fi QR Builder',
    shortName: 'Wi-Fi',
    headline: 'Create a Wi-Fi QR payload for WPA, WEP or open networks directly in the browser.',
    description: 'Enter the SSID and network options. The result follows the common WIFI QR payload format.',
    inputLabel: 'Network SSID',
    secondaryInputLabel: 'Network options',
    freeScope: 'One Wi-Fi QR payload and preview for a single network, with no account or saved secrets.',
    upgradeScope: 'Location templates, printable sheets, access rotation workflows, team permissions and audit history.',
    modes: [
      { value: 'WPA', label: 'WPA/WPA2/WPA3' },
      { value: 'WEP', label: 'WEP' },
      { value: 'nopass', label: 'Open network' },
    ],
    samplePrimary: 'Guest-WiFi',
    sampleSecondary: 'key=correct horse battery staple\nhidden=false',
  },
  {
    slug: 'preview-lab',
    category: 'preview',
    title: 'QR Preview Lab',
    shortName: 'Preview',
    headline: 'Inspect a static QR payload before printing and review scheme, size, destination and risk notes.',
    description: 'Paste a URL or text payload. QRRoute shows a static preview and local safety notes without fetching the URL.',
    inputLabel: 'Payload to preview',
    secondaryInputLabel: 'Optional context',
    freeScope: 'One local QR preview with scheme, length and safety notes when the payload is a URL.',
    upgradeScope: 'Managed redirect previews, abuse scanning, destination monitoring, scan analytics and custom domains.',
    modes: [{ value: 'inspect', label: 'Inspect locally' }],
    samplePrimary: 'https://example.com/help?ref=poster',
    sampleSecondary: 'Poster proof',
  },
]

const localizedToolSpecCopy: Partial<Record<QrRouteToolSlug, Partial<Record<LocaleCode, LocalizedToolSpecCopy>>>> = {
  'static-qr-code': {
    'pt-br': {
      title: 'Gerador de QR estatico',
      shortName: 'QR estatico',
      headline: 'Crie um QR estatico escaneavel para URL segura, texto simples, email ou telefone.',
      description: 'Escolha o tipo de payload e veja um preview SVG local. O modo URL rejeita esquemas arriscados e destinos locais.',
      inputLabel: 'URL, texto, email ou telefone',
      secondaryInputLabel: 'Rotulo opcional',
      freeScope: 'Um payload QR estatico com preview SVG e valor codificado copiavel.',
      upgradeScope: 'QR editavel, destinos alteraveis, metricas de scan, short links com marca, dominio proprio, equipes e criacao em lote.',
      modes: [
        { value: 'url', label: 'URL segura' },
        { value: 'text', label: 'Texto simples' },
        { value: 'email', label: 'Endereco de email' },
        { value: 'phone', label: 'Telefone' },
      ],
    },
    es: {
      title: 'Generador de QR estatico',
      shortName: 'QR estatico',
      headline: 'Crea un QR estatico escaneable para URL segura, texto simple, email o telefono.',
      description: 'Elige el tipo de payload y revisa una vista SVG local. El modo URL rechaza esquemas riesgosos y destinos locales.',
      inputLabel: 'URL, texto, email o telefono',
      secondaryInputLabel: 'Etiqueta opcional',
      freeScope: 'Un payload QR estatico con vista SVG y valor codificado copiable.',
      upgradeScope: 'QR editable, destinos modificables, metricas de escaneo, short links con marca, dominio propio, equipos y creacion por lote.',
      modes: [
        { value: 'url', label: 'URL segura' },
        { value: 'text', label: 'Texto simple' },
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Telefono' },
      ],
    },
    fr: {
      title: 'Generateur de QR statique',
      shortName: 'QR statique',
      headline: 'Creez un QR statique scannable pour URL sure, texte simple, email ou telephone.',
      description: 'Choisissez le type de payload et verifiez un apercu SVG local. Le mode URL refuse schemas risques et destinations locales.',
      inputLabel: 'URL, texte, email ou telephone',
      secondaryInputLabel: 'Libelle facultatif',
      freeScope: 'Un payload QR statique avec apercu SVG et valeur encodee copiable.',
      upgradeScope: 'QR editable, destinations modifiables, mesures de scan, short links marques, domaine propre, equipes et creation en lot.',
      modes: [
        { value: 'url', label: 'URL sure' },
        { value: 'text', label: 'Texte simple' },
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Telephone' },
      ],
    },
    de: {
      title: 'Generator fuer statische QR-Codes',
      shortName: 'Statischer QR',
      headline: 'Erstellen Sie einen scanbaren statischen QR-Code fuer sichere URL, Text, E-Mail oder Telefon.',
      description: 'Waehlen Sie den Payload-Typ und pruefen Sie eine lokale SVG-Vorschau. Der URL-Modus weist riskante Schemata und lokale Ziele ab.',
      inputLabel: 'URL, Text, E-Mail oder Telefon',
      secondaryInputLabel: 'Optionales Label',
      freeScope: 'Ein statischer QR-Payload mit SVG-Vorschau und kopierbarem codiertem Wert.',
      upgradeScope: 'Editierbare QR-Codes, aenderbare Ziele, Scan-Metriken, markennahe Short Links, eigene Domain, Teams und Batch-Erstellung.',
      modes: [
        { value: 'url', label: 'Sichere URL' },
        { value: 'text', label: 'Einfacher Text' },
        { value: 'email', label: 'E-Mail-Adresse' },
        { value: 'phone', label: 'Telefonnummer' },
      ],
    },
  },
  'barcode-generator': {
    'pt-br': {
      title: 'Gerador de barcode',
      shortName: 'Barcode',
      headline: 'Gere preview Code 128 para valores curtos de estoque, ticket ou referencia.',
      description: 'Digite um codigo ASCII curto. O navegador renderiza SVG Code 128 com controles de rotulo e tamanho.',
      inputLabel: 'Valor do barcode',
      secondaryInputLabel: 'Rotulo legivel opcional',
      freeScope: 'Um preview Code 128 para valor curto sem armazenamento no servidor.',
      upgradeScope: 'Folhas em lote, modelos, etiquetas, assets salvos, renderizacao por API e historico de workspace.',
      modes: [{ value: 'code128', label: 'Code 128' }],
    },
    es: {
      title: 'Generador de codigo de barras',
      shortName: 'Codigo',
      headline: 'Genera vista Code 128 para valores cortos de inventario, ticket o referencia.',
      description: 'Ingresa un codigo ASCII corto. El navegador renderiza SVG Code 128 con controles de etiqueta y tamano.',
      inputLabel: 'Valor del codigo',
      secondaryInputLabel: 'Etiqueta legible opcional',
      freeScope: 'Una vista Code 128 para un valor corto sin almacenamiento de servidor.',
      upgradeScope: 'Hojas por lote, plantillas, etiquetas, assets guardados, render por API e historial de workspace.',
      modes: [{ value: 'code128', label: 'Code 128' }],
    },
    fr: {
      title: 'Generateur de code-barres',
      shortName: 'Code-barres',
      headline: 'Generez un apercu Code 128 pour inventaire, ticket ou reference courte.',
      description: 'Saisissez un code ASCII court. Le navigateur rend un SVG Code 128 avec libelle et taille.',
      inputLabel: 'Valeur du code-barres',
      secondaryInputLabel: 'Libelle lisible facultatif',
      freeScope: 'Un apercu Code 128 pour une valeur courte sans stockage serveur.',
      upgradeScope: 'Planches en lot, modeles, etiquettes, assets sauvegardes, rendu API et historique de workspace.',
      modes: [{ value: 'code128', label: 'Code 128' }],
    },
    de: {
      title: 'Barcode-Generator',
      shortName: 'Barcode',
      headline: 'Erzeugen Sie eine Code-128-Vorschau fuer kurze Lager-, Ticket- oder Referenzwerte.',
      description: 'Geben Sie einen kurzen ASCII-Code ein. Der Browser rendert eine Code-128-SVG-Vorschau mit Label und Groesse.',
      inputLabel: 'Barcode-Wert',
      secondaryInputLabel: 'Optionales lesbares Label',
      freeScope: 'Eine Code-128-Vorschau fuer einen kurzen Wert ohne serverseitige Speicherung.',
      upgradeScope: 'Batch-Boegen, Vorlagen, Etiketten, gespeicherte Assets, API-Rendering und Workspace-Historie.',
      modes: [{ value: 'code128', label: 'Code 128' }],
    },
  },
  'utm-builder': {
    'pt-br': {
      title: 'Construtor de UTM',
      shortName: 'UTM',
      headline: 'Monte uma URL de campanha com tags e preview QR sem enviar o destino para servidor.',
      description: 'Comece com uma URL HTTPS e preencha source, medium, campaign, term e content em campos separados.',
      inputLabel: 'URL base da campanha',
      secondaryInputLabel: 'Campos UTM',
      freeScope: 'Uma URL com parametros UTM, saida copiavel e preview QR local.',
      upgradeScope: 'Campanhas salvas, regras de nomenclatura, short links com marca, metricas, aprovacoes e lote.',
      modes: [{ value: 'standard', label: 'Tags UTM padrao' }],
    },
    es: {
      title: 'Constructor UTM',
      shortName: 'UTM',
      headline: 'Construye una URL de campana con tags y vista QR sin enviar el destino a un servidor.',
      description: 'Empieza con una URL HTTPS y completa source, medium, campaign, term y content en campos separados.',
      inputLabel: 'URL base de campana',
      secondaryInputLabel: 'Campos UTM',
      freeScope: 'Una URL con parametros UTM, salida copiable y vista QR local.',
      upgradeScope: 'Campanas guardadas, reglas de nombres, short links con marca, metricas, aprobaciones y lote.',
      modes: [{ value: 'standard', label: 'Tags UTM estandar' }],
    },
    fr: {
      title: 'Constructeur UTM',
      shortName: 'UTM',
      headline: 'Construisez une URL campagne taguee et un apercu QR sans envoyer la destination au serveur.',
      description: 'Commencez par une URL HTTPS puis remplissez source, medium, campaign, term et content dans des champs separes.',
      inputLabel: 'URL de base campagne',
      secondaryInputLabel: 'Champs UTM',
      freeScope: 'Une URL avec parametres UTM, sortie copiable et apercu QR local.',
      upgradeScope: 'Campagnes sauvegardees, regles de nommage, short links marques, mesures, validations et lot.',
      modes: [{ value: 'standard', label: 'Tags UTM standard' }],
    },
    de: {
      title: 'UTM-Generator',
      shortName: 'UTM',
      headline: 'Erstellen Sie eine getaggte Kampagnen-URL und QR-Vorschau, ohne das Ziel an einen Server zu senden.',
      description: 'Starten Sie mit einer HTTPS-URL und fuellen Sie Source, Medium, Campaign, Term und Content in einzelnen Feldern aus.',
      inputLabel: 'Basis-URL der Kampagne',
      secondaryInputLabel: 'UTM-Felder',
      freeScope: 'Eine URL mit UTM-Parametern, kopierbarer Ausgabe und lokaler QR-Vorschau.',
      upgradeScope: 'Gespeicherte Kampagnen, Namensregeln, markennahe Short Links, Metriken, Freigaben und Batch-Erstellung.',
      modes: [{ value: 'standard', label: 'Standard-UTM-Tags' }],
    },
  },
  'vcard-qr': {
    'pt-br': {
      title: 'Construtor de QR vCard',
      shortName: 'vCard',
      headline: 'Transforme um perfil de contato pequeno em payload vCard e preview QR local.',
      description: 'Preencha nome, organizacao, email, telefone e site em campos estruturados. A saida usa vCard 4.0 compacta.',
      inputLabel: 'Dados de contato',
      secondaryInputLabel: 'Nota opcional',
      freeScope: 'Um payload QR vCard local sem CRM, conta ou banco de contatos.',
      upgradeScope: 'Contatos salvos, cartoes com marca, diretorios de equipe, lotes QR, exportacao CRM e metricas de scan.',
      modes: [{ value: 'vcard4', label: 'vCard 4.0' }],
    },
    es: {
      title: 'Constructor de QR vCard',
      shortName: 'vCard',
      headline: 'Convierte un perfil de contacto pequeno en payload vCard y vista QR local.',
      description: 'Completa nombre, organizacion, email, telefono y sitio en campos estructurados. La salida usa vCard 4.0 compacta.',
      inputLabel: 'Datos de contacto',
      secondaryInputLabel: 'Nota opcional',
      freeScope: 'Un payload QR vCard local sin CRM, cuenta o base de contactos.',
      upgradeScope: 'Contactos guardados, tarjetas con marca, directorios de equipo, lotes QR, export CRM y metricas de escaneo.',
      modes: [{ value: 'vcard4', label: 'vCard 4.0' }],
    },
    fr: {
      title: 'Constructeur de QR vCard',
      shortName: 'vCard',
      headline: 'Transformez un petit profil contact en payload vCard et apercu QR local.',
      description: 'Renseignez nom, organisation, email, telephone et site dans des champs structures. La sortie utilise vCard 4.0 compacte.',
      inputLabel: 'Donnees de contact',
      secondaryInputLabel: 'Note facultative',
      freeScope: 'Un payload QR vCard local sans CRM, compte ou base de contacts.',
      upgradeScope: 'Contacts sauvegardes, cartes marquees, annuaires equipe, lots QR, export CRM et mesures de scan.',
      modes: [{ value: 'vcard4', label: 'vCard 4.0' }],
    },
    de: {
      title: 'vCard-QR-Generator',
      shortName: 'vCard',
      headline: 'Wandeln Sie ein kleines Kontaktprofil lokal in einen vCard-Payload und eine QR-Vorschau um.',
      description: 'Fuellen Sie Name, Organisation, E-Mail, Telefon und Website in strukturierten Feldern aus. Die Ausgabe nutzt kompakte vCard 4.0.',
      inputLabel: 'Kontaktdaten',
      secondaryInputLabel: 'Optionale Notiz',
      freeScope: 'Ein lokaler vCard-QR-Payload ohne CRM, Konto oder Kontaktdatenbank.',
      upgradeScope: 'Gespeicherte Kontakte, markennahe Karten, Teamverzeichnisse, QR-Batches, CRM-Export und Scan-Metriken.',
      modes: [{ value: 'vcard4', label: 'vCard 4.0' }],
    },
  },
  'wifi-qr': {
    'pt-br': {
      title: 'Construtor de QR Wi-Fi',
      shortName: 'Wi-Fi',
      headline: 'Crie um payload QR Wi-Fi para redes WPA, WEP ou abertas direto no navegador.',
      description: 'Preencha SSID, senha, criptografia e rede oculta. O resultado segue o formato comum de QR Wi-Fi.',
      inputLabel: 'SSID da rede',
      secondaryInputLabel: 'Opcoes da rede',
      freeScope: 'Um payload QR Wi-Fi e preview para uma rede, sem conta ou segredos salvos.',
      upgradeScope: 'Modelos por local, folhas imprimiveis, rotacao de acesso, permissoes de equipe e historico de auditoria.',
      modes: [
        { value: 'WPA', label: 'WPA/WPA2/WPA3' },
        { value: 'WEP', label: 'WEP' },
        { value: 'nopass', label: 'Rede aberta' },
      ],
    },
    es: {
      title: 'Constructor de QR Wi-Fi',
      shortName: 'Wi-Fi',
      headline: 'Crea un payload QR Wi-Fi para redes WPA, WEP o abiertas directamente en el navegador.',
      description: 'Completa SSID, clave, cifrado y red oculta. El resultado sigue el formato comun de QR Wi-Fi.',
      inputLabel: 'SSID de red',
      secondaryInputLabel: 'Opciones de red',
      freeScope: 'Un payload QR Wi-Fi y vista para una red, sin cuenta ni secretos guardados.',
      upgradeScope: 'Plantillas por ubicacion, hojas imprimibles, rotacion de acceso, permisos de equipo e historial de auditoria.',
      modes: [
        { value: 'WPA', label: 'WPA/WPA2/WPA3' },
        { value: 'WEP', label: 'WEP' },
        { value: 'nopass', label: 'Red abierta' },
      ],
    },
    fr: {
      title: 'Constructeur de QR Wi-Fi',
      shortName: 'Wi-Fi',
      headline: 'Creez un payload QR Wi-Fi pour reseaux WPA, WEP ou ouverts directement dans le navigateur.',
      description: 'Renseignez SSID, mot de passe, chiffrement et reseau masque. Le resultat suit le format QR Wi-Fi courant.',
      inputLabel: 'SSID du reseau',
      secondaryInputLabel: 'Options reseau',
      freeScope: 'Un payload QR Wi-Fi et apercu pour un reseau, sans compte ni secret sauvegarde.',
      upgradeScope: 'Modeles par lieu, feuilles imprimables, rotation acces, permissions equipe et historique audit.',
      modes: [
        { value: 'WPA', label: 'WPA/WPA2/WPA3' },
        { value: 'WEP', label: 'WEP' },
        { value: 'nopass', label: 'Reseau ouvert' },
      ],
    },
    de: {
      title: 'Wi-Fi-QR-Generator',
      shortName: 'Wi-Fi',
      headline: 'Erstellen Sie einen Wi-Fi-QR-Payload fuer WPA-, WEP- oder offene Netzwerke direkt im Browser.',
      description: 'Fuellen Sie SSID, Passwort, Verschluesselung und verborgenes Netzwerk aus. Das Ergebnis nutzt das gaengige Wi-Fi-QR-Format.',
      inputLabel: 'Netzwerk-SSID',
      secondaryInputLabel: 'Netzwerkoptionen',
      freeScope: 'Ein Wi-Fi-QR-Payload und Vorschau fuer ein Netzwerk, ohne Konto oder gespeicherte Geheimnisse.',
      upgradeScope: 'Standortvorlagen, druckbare Boegen, Zugangsrotation, Teamberechtigungen und Audit-Historie.',
      modes: [
        { value: 'WPA', label: 'WPA/WPA2/WPA3' },
        { value: 'WEP', label: 'WEP' },
        { value: 'nopass', label: 'Offenes Netzwerk' },
      ],
    },
  },
  'preview-lab': {
    'pt-br': {
      title: 'Laboratorio de preview QR',
      shortName: 'Preview',
      headline: 'Inspecione um payload QR estatico antes de imprimir e revise esquema, tamanho, destino e risco.',
      description: 'Cole uma URL ou texto. O QRRoute mostra preview estatico e notas de seguranca locais sem buscar a URL.',
      inputLabel: 'Payload para preview',
      secondaryInputLabel: 'Contexto opcional',
      freeScope: 'Um preview QR local com esquema, tamanho e notas de seguranca quando o payload e URL.',
      upgradeScope: 'Previews gerenciados de redirect, analise antiabuso, monitoramento de destino, metricas de scan e dominio proprio.',
      modes: [{ value: 'inspect', label: 'Inspecionar localmente' }],
    },
    es: {
      title: 'Laboratorio de vista QR',
      shortName: 'Vista',
      headline: 'Inspecciona un payload QR estatico antes de imprimir y revisa esquema, tamano, destino y riesgo.',
      description: 'Pega una URL o texto. QRRoute muestra vista estatica y notas de seguridad locales sin consultar la URL.',
      inputLabel: 'Payload para vista',
      secondaryInputLabel: 'Contexto opcional',
      freeScope: 'Una vista QR local con esquema, tamano y notas de seguridad cuando el payload es URL.',
      upgradeScope: 'Vistas gestionadas de redirect, analisis antiabuso, monitoreo de destino, metricas de escaneo y dominio propio.',
      modes: [{ value: 'inspect', label: 'Inspeccionar localmente' }],
    },
    fr: {
      title: 'Laboratoire d apercu QR',
      shortName: 'Apercu',
      headline: 'Inspectez un payload QR statique avant impression et verifiez schema, taille, destination et risque.',
      description: 'Collez une URL ou un texte. QRRoute affiche un apercu statique et des notes securite locales sans interroger l URL.',
      inputLabel: 'Payload a previsualiser',
      secondaryInputLabel: 'Contexte facultatif',
      freeScope: 'Un apercu QR local avec schema, taille et notes securite lorsque le payload est une URL.',
      upgradeScope: 'Apercus de redirect geres, analyse anti-abus, surveillance destination, mesures de scan et domaine propre.',
      modes: [{ value: 'inspect', label: 'Inspecter localement' }],
    },
    de: {
      title: 'QR-Vorschaulabor',
      shortName: 'Vorschau',
      headline: 'Pruefen Sie einen statischen QR-Payload vor dem Druck mit Schema, Groesse, Ziel und Risikohinweisen.',
      description: 'Fuegen Sie eine URL oder Text ein. QRRoute zeigt statische Vorschau und lokale Sicherheitsnotizen, ohne die URL abzurufen.',
      inputLabel: 'Payload fuer Vorschau',
      secondaryInputLabel: 'Optionaler Kontext',
      freeScope: 'Eine lokale QR-Vorschau mit Schema, Groesse und Sicherheitsnotizen, wenn der Payload eine URL ist.',
      upgradeScope: 'Verwaltete Redirect-Vorschauen, Abuse-Analyse, Zielueberwachung, Scan-Metriken und eigene Domain.',
      modes: [{ value: 'inspect', label: 'Lokal pruefen' }],
    },
  },
}

function sections(locale: LocaleCode): ContentSection[] {
  const base = localizedBasics[locale]

  return [
    { heading: base.localSection, paragraphs: [base.localBody] },
    { heading: base.abuseSection, paragraphs: [base.abuseBody] },
    { heading: base.limitsSection, paragraphs: [base.limitsBody] },
  ]
}

function copyFor(spec: QrRouteToolSpec, locale: LocaleCode): QrRouteToolCopy {
  const base = localizedBasics[locale]
  const localized = localizedToolSpecCopy[spec.slug]?.[locale]

  return {
    title: localized?.title ?? spec.title,
    shortName: localized?.shortName ?? spec.shortName,
    headline: localized?.headline ?? spec.headline,
    description: localized?.description ?? spec.description,
    inputLabel: localized?.inputLabel ?? spec.inputLabel,
    secondaryInputLabel: localized?.secondaryInputLabel ?? spec.secondaryInputLabel,
    modeLabel: base.modeLabel,
    resultLabel: base.resultLabel,
    previewLabel: base.previewLabel,
    freeScope: localized?.freeScope ?? spec.freeScope,
    upgradeScope: localized?.upgradeScope ?? spec.upgradeScope,
    reviewedLabel: reviewed[locale],
    contentSections: sections(locale),
    faq: [base.faqStorage, base.faqDynamic],
  }
}

function qrRouteTool(spec: QrRouteToolSpec): QrRouteToolDefinition {
  return {
    slug: spec.slug,
    category: spec.category,
    modes: spec.modes,
    localizedModes: Object.fromEntries(
      publicLocaleCodes.map((locale) => [locale, localizedToolSpecCopy[spec.slug]?.[locale]?.modes ?? spec.modes]),
    ) as Record<LocaleCode, QrRouteToolOption[]>,
    acceptsSecondaryInput: spec.acceptsSecondaryInput ?? true,
    samplePrimary: spec.samplePrimary,
    sampleSecondary: spec.sampleSecondary ?? '',
    localized: Object.fromEntries(
      publicLocaleCodes.map((locale) => [locale, copyFor(spec, locale)]),
    ) as Record<LocaleCode, QrRouteToolCopy>,
  }
}

export const qrRouteToolCatalog: QrRouteToolDefinition[] = specs.map(qrRouteTool)
const qrRouteToolBySlug = new Map(qrRouteToolCatalog.map((candidate) => [candidate.slug, candidate]))

export function getQrRouteToolBySlug(slug: string | undefined): QrRouteToolDefinition | null {
  if (!qrRouteToolSlugs.includes(slug as QrRouteToolSlug)) {
    return null
  }

  return qrRouteToolBySlug.get(slug as QrRouteToolSlug) ?? null
}

export function getQrRouteToolCopy(toolDefinition: QrRouteToolDefinition, locale: LocaleCode): QrRouteToolCopy {
  return sanitizePublicCopy(locale, toolDefinition.localized[locale])
}

export function getQrRouteToolModes(toolDefinition: QrRouteToolDefinition, locale: LocaleCode): QrRouteToolOption[] {
  return sanitizePublicCopy(locale, toolDefinition.localizedModes[locale])
}

export function getCategoryLabel(category: QrRouteToolCategory, locale: LocaleCode): string {
  const labels: Record<QrRouteToolCategory, Record<LocaleCode, string>> = {
    qr: { en: 'QR codes', 'pt-br': 'QR codes', es: 'QR codes', fr: 'QR codes', de: 'QR-Codes' },
    barcode: { en: 'Barcodes', 'pt-br': 'Barcodes', es: 'Codigos de barras', fr: 'Codes-barres', de: 'Barcodes' },
    campaign: { en: 'Campaign links', 'pt-br': 'Links de campanha', es: 'Enlaces de campana', fr: 'Liens campagne', de: 'Kampagnenlinks' },
    contact: { en: 'Contact cards', 'pt-br': 'Cartoes de contato', es: 'Tarjetas de contacto', fr: 'Fiches contact', de: 'Kontaktkarten' },
    network: { en: 'Wi-Fi', 'pt-br': 'Wi-Fi', es: 'Wi-Fi', fr: 'Wi-Fi', de: 'Wi-Fi' },
    preview: { en: 'Preview', 'pt-br': 'Preview', es: 'Vista previa', fr: 'Apercu', de: 'Vorschau' },
  }

  return labels[category][locale]
}

export function filterQrRouteTools(query: string, category: QrRouteToolCategory | 'all', locale: LocaleCode): QrRouteToolDefinition[] {
  const normalizedQuery = query.trim().toLowerCase()

  return qrRouteToolCatalog.filter((toolDefinition) => {
    const copy = getQrRouteToolCopy(toolDefinition, locale)
    const matchesCategory = category === 'all' || toolDefinition.category === category
    const searchableText = [
      toolDefinition.slug,
      copy.title,
      copy.shortName,
      copy.headline,
      copy.description,
      copy.freeScope,
      copy.upgradeScope,
      getQrRouteToolModes(toolDefinition, locale).map((mode) => mode.label).join(' '),
    ].join(' ').toLowerCase()

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery))
  })
}

export function getRelatedQrRouteTools(toolDefinition: QrRouteToolDefinition, limit = 3): QrRouteToolDefinition[] {
  const sameFamily = qrRouteToolCatalog.filter((candidate) => candidate.slug !== toolDefinition.slug && candidate.category === toolDefinition.category)
  const workflowNeighbors = qrRouteToolCatalog.filter((candidate) => {
    if (candidate.slug === toolDefinition.slug || sameFamily.includes(candidate)) {
      return false
    }

    if (toolDefinition.category === 'campaign') {
      return ['static-qr-code', 'preview-lab', 'barcode-generator'].includes(candidate.slug)
    }

    if (toolDefinition.category === 'qr') {
      return ['utm-builder', 'preview-lab', 'vcard-qr'].includes(candidate.slug)
    }

    return true
  })
  const fallback = qrRouteToolCatalog.filter((candidate) => candidate.slug !== toolDefinition.slug && !sameFamily.includes(candidate) && !workflowNeighbors.includes(candidate))

  return [...sameFamily, ...workflowNeighbors, ...fallback].slice(0, limit)
}

function outputLines(result: QrRouteToolResult): string[] {
  return result.output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function findLine(result: QrRouteToolResult, prefix: string): string | null {
  return outputLines(result).find((line) => line.startsWith(prefix)) ?? null
}

function firstResultLine(result: QrRouteToolResult): string {
  return outputLines(result)[0] ?? 'Payload ready.'
}

export function createQrRoutePayloadSummary(slug: QrRouteToolSlug, result: QrRouteToolResult | null): QrRoutePayloadSummary | null {
  if (!result?.ok) {
    return null
  }

  const preferredPrefixes: Partial<Record<QrRouteToolSlug, string[]>> = {
    'static-qr-code': ['Payload:', 'Type:'],
    'barcode-generator': ['Value:', 'Format:'],
    'utm-builder': ['Campaign URL:', 'UTM campaign:'],
    'vcard-qr': ['FN:', 'BEGIN:VCARD'],
    'wifi-qr': ['Payload:', 'SSID:'],
    'preview-lab': ['URL:', 'Payload type:'],
  }
  const lines = outputLines(result)
  const selected = preferredPrefixes[slug]
    ?.map((prefix) => findLine(result, prefix))
    .find(Boolean)

  return {
    label: result.previewKind === 'barcode' ? 'Barcode value' : 'Encoded payload',
    value: selected ?? firstResultLine(result),
    details: result.meta,
  }
}

export function createQrRouteToolStructuredData(toolDefinition: QrRouteToolDefinition, locale: LocaleCode, url: string): Record<string, unknown>[] {
  const copy = getQrRouteToolCopy(toolDefinition, locale)

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: copy.title,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      url,
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description: copy.headline,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: copy.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ]
}

function ok(output: string, meta: ResultMeta[], previewPayload: string, previewKind: PreviewKind = 'qr'): QrRouteToolResult {
  return { ok: true, output, meta, previewKind, previewPayload }
}

function fail(error: string): QrRouteToolResult {
  return { ok: false, output: '', meta: [], previewKind: 'text', previewPayload: '', error }
}

function ensureInputLimit(...values: string[]): void {
  const totalLength = values.reduce((sum, value) => sum + value.length, 0)

  if (totalLength > 8_000) {
    throw new Error('Free QRRoute tools accept short payloads. Bulk and large payload workflows require an account workflow.')
  }
}

function sanitizeText(value: string, label: string, maxLength = 2000): string {
  const normalized = value.replace(/\r\n/g, '\n').trim()

  if (!normalized) {
    throw new Error(`${label} is required.`)
  }

  if (normalized.length > maxLength) {
    throw new Error(`${label} is too long for the free static preview.`)
  }

  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(normalized)) {
    throw new Error(`${label} contains unsupported control characters.`)
  }

  return normalized
}

function sanitizeOptionalText(value: string, label: string, maxLength = 160): string {
  const normalized = value.replace(/\r\n/g, '\n').trim()

  if (!normalized) {
    return ''
  }

  return sanitizeText(normalized, label, maxLength)
}

function normalizeHttpUrl(value: string): URL {
  const raw = sanitizeText(value, 'URL', 2048)
  let parsed: URL

  try {
    parsed = new URL(raw)
  } catch {
    throw new Error('Enter a valid absolute HTTP or HTTPS URL.')
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Only HTTP and HTTPS URLs are allowed for QRRoute URL previews.')
  }

  if (parsed.username || parsed.password) {
    throw new Error('URLs with embedded credentials are blocked.')
  }

  const hostname = parsed.hostname.toLowerCase()
  if (
    hostname === 'localhost'
    || hostname.endsWith('.localhost')
    || hostname.endsWith('.local')
    || hostname.endsWith('.internal')
    || hostname.endsWith('.lan')
  ) {
    throw new Error('Local or private hostnames are blocked.')
  }

  if (isBlockedIpLiteral(hostname)) {
    throw new Error('Private, loopback and reserved IP destinations are blocked.')
  }

  parsed.hash = ''

  return parsed
}

function isBlockedIpLiteral(hostname: string): boolean {
  const ipv4Match = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/u)
  if (ipv4Match) {
    const octets = ipv4Match.slice(1).map(Number)
    if (octets.some((octet) => octet < 0 || octet > 255)) {
      return true
    }

    const [a, b] = octets
    return (
      a === 0
      || a === 10
      || a === 127
      || (a === 169 && b === 254)
      || (a === 172 && b >= 16 && b <= 31)
      || (a === 192 && b === 168)
      || a >= 224
    )
  }

  const unwrappedIpv6 = hostname.replace(/^\[|\]$/gu, '')
  if (unwrappedIpv6.includes(':')) {
    return (
      unwrappedIpv6 === '::1'
      || unwrappedIpv6.startsWith('fc')
      || unwrappedIpv6.startsWith('fd')
      || unwrappedIpv6.startsWith('fe80')
      || unwrappedIpv6 === '::'
    )
  }

  return false
}

function normalizeStaticPayload(primaryInput: string, mode: QrRouteToolMode): { payload: string; label: string } {
  if (mode === 'text') {
    return { payload: sanitizeText(primaryInput, 'Text payload'), label: 'Plain text' }
  }

  if (mode === 'email') {
    const email = sanitizeText(primaryInput, 'Email address', 320)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) {
      throw new Error('Enter a valid email address.')
    }

    return { payload: `mailto:${email}`, label: 'Email' }
  }

  if (mode === 'phone') {
    const phone = sanitizeText(primaryInput, 'Phone number', 80).replace(/[^\d+]/gu, '')
    if (!/^\+?\d{7,20}$/u.test(phone)) {
      throw new Error('Enter a phone number with 7 to 20 digits.')
    }

    return { payload: `tel:${phone}`, label: 'Phone' }
  }

  const url = normalizeHttpUrl(primaryInput)
  return { payload: url.toString(), label: 'Safe URL' }
}

function createStaticQr(primaryInput: string, secondaryInput: string, mode: QrRouteToolMode): QrRouteToolResult {
  const { payload, label } = normalizeStaticPayload(primaryInput, mode)
  const optionalLabel = sanitizeOptionalText(secondaryInput, 'Optional label', 120)

  return ok([
    `Type: ${label}`,
    optionalLabel ? `Label: ${optionalLabel}` : '',
    `Payload: ${payload}`,
    'Storage: not stored by QRRoute',
    'Redirects: not used for static QR codes',
  ].filter(Boolean).join('\n'), [
    { label: 'Payload type', value: label },
    ...(optionalLabel ? [{ label: 'Label', value: optionalLabel }] : []),
    { label: 'Characters', value: String(payload.length) },
  ], payload)
}

function createBarcode(primaryInput: string, secondaryInput: string): QrRouteToolResult {
  const value = sanitizeText(primaryInput, 'Barcode value', 80)
  const options = parseOptions(secondaryInput)
  const label = sanitizeOptionalText(options.label ?? '', 'Barcode label', 80)
  const rawSize = options.size ?? 'standard'
  const size = ['compact', 'standard', 'large'].includes(rawSize) ? rawSize : 'standard'

  if (!/^[\x20-\x7e]+$/u.test(value)) {
    throw new Error('Code 128 preview accepts printable ASCII characters only.')
  }

  return ok([
    `Format: Code 128`,
    `Value: ${value}`,
    label ? `Label: ${label}` : '',
    `Size: ${size}`,
    'Rendering: browser-side SVG preview',
  ].filter(Boolean).join('\n'), [
    { label: 'Format', value: 'Code 128' },
    { label: 'Size', value: size },
    ...(label ? [{ label: 'Label', value: label }] : []),
    { label: 'Characters', value: String(value.length) },
  ], value, 'barcode')
}

function parseUtmFields(value: string): Record<string, string> {
  const allowed = new Set(['source', 'medium', 'campaign', 'term', 'content', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'])
  const result: Record<string, string> = {}

  for (const rawLine of value.split(/\n|&/u)) {
    const line = rawLine.trim()
    if (!line) {
      continue
    }

    const [rawKey, ...rawValueParts] = line.split('=')
    const key = rawKey.trim().toLowerCase()
    const fieldValue = rawValueParts.join('=').trim()

    if (!allowed.has(key)) {
      throw new Error(`Unsupported UTM field: ${rawKey}`)
    }

    if (!fieldValue || fieldValue.length > 120) {
      throw new Error(`UTM field ${rawKey} needs a short value.`)
    }

    if (/[\u0000-\u001f\u007f]/u.test(fieldValue)) {
      throw new Error(`UTM field ${rawKey} contains unsupported characters.`)
    }

    const normalizedKey = key.startsWith('utm_') ? key : `utm_${key}`
    result[normalizedKey] = fieldValue
  }

  if (!result.utm_source || !result.utm_medium || !result.utm_campaign) {
    throw new Error('UTM source, medium and campaign are required.')
  }

  return result
}

function buildUtm(primaryInput: string, secondaryInput: string): QrRouteToolResult {
  const url = normalizeHttpUrl(primaryInput)
  const fields = parseUtmFields(secondaryInput)

  Object.entries(fields).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  return ok([
    `Campaign URL: ${url.toString()}`,
    `UTM source: ${fields.utm_source}`,
    `UTM medium: ${fields.utm_medium}`,
    `UTM campaign: ${fields.utm_campaign}`,
    'Analytics note: QRRoute records only tool_slug events in this browser builder.',
  ].join('\n'), [
    { label: 'UTM fields', value: String(Object.keys(fields).length) },
    { label: 'URL host', value: url.hostname },
  ], url.toString())
}

function escapeVcardValue(value: string): string {
  return value.replace(/\\/gu, '\\\\').replace(/\n/gu, '\\n').replace(/,/gu, '\\,').replace(/;/gu, '\\;')
}

function buildVcard(primaryInput: string): QrRouteToolResult {
  const lines = sanitizeText(primaryInput, 'Contact lines', 1200)
    .split('\n')
    .map((line) => line.trim())

  const [name, organization = '', email = '', phone = '', website = ''] = lines
  if (!name) {
    throw new Error('Contact name is required.')
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) {
    throw new Error('Contact email is not valid.')
  }

  if (website) {
    normalizeHttpUrl(website)
  }

  const payloadLines = [
    'BEGIN:VCARD',
    'VERSION:4.0',
    `FN:${escapeVcardValue(name)}`,
    organization ? `ORG:${escapeVcardValue(organization)}` : '',
    email ? `EMAIL:${escapeVcardValue(email)}` : '',
    phone ? `TEL:${escapeVcardValue(phone)}` : '',
    website ? `URL:${escapeVcardValue(website)}` : '',
    'END:VCARD',
  ].filter(Boolean)
  const payload = payloadLines.join('\n')

  return ok([
    payload,
    '',
    'Storage: not stored by QRRoute',
  ].join('\n'), [
    { label: 'Contact', value: name },
    { label: 'Fields', value: String(payloadLines.length - 3) },
  ], payload)
}

function escapeWifiValue(value: string): string {
  return value.replace(/\\/gu, '\\\\').replace(/;/gu, '\\;').replace(/,/gu, '\\,').replace(/:/gu, '\\:')
}

function parseOptions(value: string): Record<string, string> {
  const result: Record<string, string> = {}

  for (const rawLine of value.split(/\n|;/u)) {
    const line = rawLine.trim()
    if (!line) {
      continue
    }

    const [rawKey, ...rawValueParts] = line.split('=')
    const key = rawKey.trim().toLowerCase()
    const fieldValue = rawValueParts.join('=').trim()
    if (!key) {
      continue
    }

    result[key] = fieldValue
  }

  return result
}

function buildWifi(primaryInput: string, secondaryInput: string, mode: QrRouteToolMode): QrRouteToolResult {
  const ssid = sanitizeText(primaryInput, 'Network SSID', 120)
  const options = parseOptions(secondaryInput)
  const networkKey = options.key ?? options.passphrase ?? ''
  const hidden = ['true', '1', 'yes'].includes((options.hidden ?? 'false').toLowerCase()) ? 'true' : 'false'
  const security = ['WPA', 'WEP', 'nopass'].includes(mode) ? mode : 'WPA'

  if (security !== 'nopass' && !networkKey) {
    throw new Error('Network key is required for WPA or WEP Wi-Fi QR payloads.')
  }

  const payload = `WIFI:T:${security};S:${escapeWifiValue(ssid)};P:${escapeWifiValue(networkKey)};H:${hidden};;`

  return ok([
    `SSID: ${ssid}`,
    `Security: ${security}`,
    `Hidden: ${hidden}`,
    'Network key display: included only inside the local QR payload output.',
    `Payload: ${payload}`,
  ].join('\n'), [
    { label: 'Security', value: security },
    { label: 'Hidden', value: hidden },
  ], payload)
}

function inspectPreview(primaryInput: string): QrRouteToolResult {
  const value = sanitizeText(primaryInput, 'Preview payload')
  const size = value.length

  try {
    const url = normalizeHttpUrl(value)
    const risk = url.protocol === 'https:' ? 'Lower risk web URL' : 'Review before print'

    return ok([
      `URL: ${url.toString()}`,
      `Scheme: ${url.protocol.replace(':', '')}`,
      `Host: ${url.hostname}`,
      `Destination: ${url.pathname || '/'}`,
      `Size: ${size} characters`,
      `Risk: ${risk}`,
      'Fetch performed: no',
      'Redirect service: not active for free static preview',
    ].join('\n'), [
      { label: 'Payload type', value: 'URL' },
      { label: 'Scheme', value: url.protocol.replace(':', '') },
      { label: 'Host', value: url.hostname },
      { label: 'Destination', value: url.pathname || '/' },
      { label: 'Size', value: `${size} characters` },
      { label: 'Risk', value: risk },
    ], url.toString())
  } catch (error) {
    const risk = value.length > 900 ? 'Dense QR for print' : 'Text payload'

    return ok([
      'Payload type: text',
      `Characters: ${value.length}`,
      'Scheme: none',
      'Destination: none',
      `Risk: ${risk}`,
      'Fetch performed: no',
      `URL safety note: ${error instanceof Error ? error.message : 'not a URL'}`,
    ].join('\n'), [
      { label: 'Payload type', value: 'Text' },
      { label: 'Scheme', value: 'none' },
      { label: 'Destination', value: 'none' },
      { label: 'Characters', value: String(value.length) },
      { label: 'Risk', value: risk },
    ], value)
  }
}

export async function executeQrRouteTool(
  slug: QrRouteToolSlug,
  primaryInput: string,
  secondaryInput: string,
  mode: QrRouteToolMode,
): Promise<QrRouteToolResult> {
  try {
    ensureInputLimit(primaryInput, secondaryInput)

    if (slug === 'static-qr-code') {
      return createStaticQr(primaryInput, secondaryInput, mode)
    }

    if (slug === 'barcode-generator') {
      return createBarcode(primaryInput, secondaryInput)
    }

    if (slug === 'utm-builder') {
      return buildUtm(primaryInput, secondaryInput)
    }

    if (slug === 'vcard-qr') {
      return buildVcard(primaryInput)
    }

    if (slug === 'wifi-qr') {
      return buildWifi(primaryInput, secondaryInput, mode)
    }

    if (slug === 'preview-lab') {
      return inspectPreview(primaryInput)
    }

    return fail('Tool not found.')
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Tool execution failed.')
  }
}
