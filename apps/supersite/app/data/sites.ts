import type { LocaleCode } from './locales'

export type SiteStatus = 'planned' | 'foundation' | 'blocked'

export type SiteCategory =
  | 'network'
  | 'calculators'
  | 'developer'
  | 'time'
  | 'links'
  | 'documents'
  | 'email'
  | 'monitoring'
  | 'images'

export interface LocalizedText {
  headline: string
  summary: string
  freeValue: string
  upgrade: string
}

export interface SiteSummary {
  slug: string
  name: string
  category: SiteCategory
  launchOrder: number
  status: SiteStatus
  temporaryUrl: string
  freeTools: string[]
  paidBenefits: string[]
  localized: Record<LocaleCode, LocalizedText>
}

export interface CategorySummary {
  key: SiteCategory
  labels: Record<LocaleCode, string>
}

export const categoryCatalog: CategorySummary[] = [
  {
    key: 'network',
    labels: {
      en: 'Network diagnostics',
      'pt-br': 'Diagnóstico de rede',
      es: 'Diagnóstico de red',
      fr: 'Diagnostic réseau',
      de: 'Netzwerkdiagnose',
    },
  },
  {
    key: 'calculators',
    labels: {
      en: 'Calculators',
      'pt-br': 'Calculadoras',
      es: 'Calculadoras',
      fr: 'Calculatrices',
      de: 'Rechner',
    },
  },
  {
    key: 'developer',
    labels: {
      en: 'Developer utilities',
      'pt-br': 'Ferramentas dev',
      es: 'Herramientas dev',
      fr: 'Outils dev',
      de: 'Entwickler-Tools',
    },
  },
  {
    key: 'time',
    labels: {
      en: 'Time and dates',
      'pt-br': 'Tempo e datas',
      es: 'Tiempo y fechas',
      fr: 'Temps et dates',
      de: 'Zeit und Datum',
    },
  },
  {
    key: 'links',
    labels: {
      en: 'QR and links',
      'pt-br': 'QR e links',
      es: 'QR y enlaces',
      fr: 'QR et liens',
      de: 'QR und Links',
    },
  },
  {
    key: 'documents',
    labels: {
      en: 'Documents',
      'pt-br': 'Documentos',
      es: 'Documentos',
      fr: 'Documents',
      de: 'Dokumente',
    },
  },
  {
    key: 'email',
    labels: {
      en: 'Email deliverability',
      'pt-br': 'Entregabilidade de e-mail',
      es: 'Entregabilidad de correo',
      fr: 'Délivrabilité e-mail',
      de: 'E-Mail-Zustellung',
    },
  },
  {
    key: 'monitoring',
    labels: {
      en: 'Website monitoring',
      'pt-br': 'Monitoramento web',
      es: 'Monitoreo web',
      fr: 'Surveillance web',
      de: 'Website-Monitoring',
    },
  },
  {
    key: 'images',
    labels: {
      en: 'Images',
      'pt-br': 'Imagens',
      es: 'Imágenes',
      fr: 'Images',
      de: 'Bilder',
    },
  },
]

export const siteCatalog: SiteSummary[] = [
  {
    slug: 'netprobe-atlas',
    name: 'NetProbe Atlas',
    category: 'network',
    launchOrder: 1,
    status: 'foundation',
    temporaryUrl: 'https://opentshost.com/supersites/netprobe-atlas/',
    freeTools: ['IP lookup', 'DNS records', 'RDAP and domain age', 'SSL certificate checks'],
    paidBenefits: ['Monitoring', 'Alerts', 'Change history', 'API access'],
    localized: {
      en: {
        headline: 'IP, DNS, domain and SSL diagnostics for public troubleshooting.',
        summary: 'The first product track focuses on complete point-in-time network checks with clear limits, safe anti-abuse controls and no mandatory signup for basic results.',
        freeValue: 'IP, DNS, RDAP and SSL checks',
        upgrade: 'Monitoring, alerts, history and API',
      },
      'pt-br': {
        headline: 'Diagnóstico de IP, DNS, domínio e SSL para investigação pública.',
        summary: 'A primeira frente de produto entrega consultas completas e pontuais de rede, com limites claros, controles antiabuso e sem cadastro obrigatório para resultados básicos.',
        freeValue: 'Consultas de IP, DNS, RDAP e SSL',
        upgrade: 'Monitoramento, alertas, histórico e API',
      },
      es: {
        headline: 'Diagnóstico de IP, DNS, dominio y SSL para resolver problemas públicos.',
        summary: 'La primera línea de producto cubre consultas de red completas y puntuales, con límites claros, controles antiabuso y sin registro obligatorio para resultados básicos.',
        freeValue: 'Consultas de IP, DNS, RDAP y SSL',
        upgrade: 'Monitoreo, alertas, historial y API',
      },
      fr: {
        headline: 'Diagnostics IP, DNS, domaine et SSL pour le dépannage public.',
        summary: 'Le premier produit couvre des vérifications réseau complètes et ponctuelles, avec limites claires, contrôles anti-abus et aucun compte obligatoire pour les résultats de base.',
        freeValue: 'Vérifications IP, DNS, RDAP et SSL',
        upgrade: 'Surveillance, alertes, historique et API',
      },
      de: {
        headline: 'IP-, DNS-, Domain- und SSL-Diagnosen für öffentliche Fehlersuche.',
        summary: 'Der erste Produktbereich liefert vollständige punktuelle Netzwerkprüfungen mit klaren Grenzen, Anti-Missbrauch-Kontrollen und ohne Pflichtkonto für Basisergebnisse.',
        freeValue: 'IP-, DNS-, RDAP- und SSL-Prüfungen',
        upgrade: 'Monitoring, Warnungen, Verlauf und API',
      },
    },
  },
  {
    slug: 'calcharbor',
    name: 'CalcHarbor',
    category: 'calculators',
    launchOrder: 2,
    status: 'foundation',
    temporaryUrl: 'https://opentshost.com/supersites/calcharbor/',
    freeTools: ['Business calculators', 'Finance formulas', 'Scenario comparison', 'Readable explanations'],
    paidBenefits: ['Saved scenarios', 'Exports', 'Team workspaces', 'Embeddable widgets'],
    localized: {
      en: {
        headline: 'Financial and business calculators with formulas users can inspect.',
        summary: 'CalcHarbor starts with transparent client-side calculations, examples and interpretation so the free result is useful without hiding the answer behind signup.',
        freeValue: 'Complete calculations with formulas',
        upgrade: 'Saved scenarios, exports, widgets and API',
      },
      'pt-br': {
        headline: 'Calculadoras financeiras e empresariais com fórmulas auditáveis.',
        summary: 'CalcHarbor comeca com calculos client-side transparentes, exemplos e interpretacao para que o resultado gratuito seja util sem esconder a resposta atras de cadastro.',
        freeValue: 'Cálculos completos com fórmulas',
        upgrade: 'Cenários salvos, exportações, widgets e API',
      },
      es: {
        headline: 'Calculadoras financieras y empresariales con fórmulas verificables.',
        summary: 'CalcHarbor empieza con calculos client-side transparentes, ejemplos e interpretacion para que el resultado gratuito sea util sin ocultar la respuesta detras de un registro.',
        freeValue: 'Cálculos completos con fórmulas',
        upgrade: 'Escenarios guardados, exportaciones, widgets y API',
      },
      fr: {
        headline: 'Calculatrices financières et professionnelles avec formules vérifiables.',
        summary: 'CalcHarbor commence avec des calculs client-side transparents, des exemples et une interpretation afin que le resultat gratuit reste utile sans compte obligatoire.',
        freeValue: 'Calculs complets avec formules',
        upgrade: 'Scénarios sauvegardés, exports, widgets et API',
      },
      de: {
        headline: 'Finanz- und Business-Rechner mit nachvollziehbaren Formeln.',
        summary: 'CalcHarbor startet mit transparenten client-side Berechnungen, Beispielen und Interpretation, damit das kostenlose Ergebnis ohne Registrierung nutzbar bleibt.',
        freeValue: 'Vollständige Berechnungen mit Formeln',
        upgrade: 'Gespeicherte Szenarien, Exporte, Widgets und API',
      },
    },
  },
  {
    slug: 'devutility-lab',
    name: 'DevUtility Lab',
    category: 'developer',
    launchOrder: 3,
    status: 'planned',
    temporaryUrl: 'https://opentshost.com/supersites/devutility-lab/',
    freeTools: ['JSON formatting', 'Base64', 'JWT inspection', 'Regex and diff utilities'],
    paidBenefits: ['Private history', 'Workspaces', 'Batch processing', 'Larger files'],
    localized: {
      en: {
        headline: 'Developer utilities designed to process sensitive snippets locally first.',
        summary: 'DevUtility Lab will favor browser-side processing for common developer tasks, reducing cost and avoiding unnecessary logging of user-provided content.',
        freeValue: 'JSON, YAML, CSV, Base64, JWT, regex and diff tools',
        upgrade: 'Private history, workspaces, batches and API',
      },
      'pt-br': {
        headline: 'Ferramentas dev pensadas para processar trechos sensíveis localmente.',
        summary: 'DevUtility Lab vai favorecer processamento no navegador para tarefas comuns, reduzindo custo e evitando logs desnecessários de conteúdo do usuário.',
        freeValue: 'JSON, YAML, CSV, Base64, JWT, regex e diff',
        upgrade: 'Histórico privado, workspaces, lotes e API',
      },
      es: {
        headline: 'Herramientas dev pensadas para procesar fragmentos sensibles localmente.',
        summary: 'DevUtility Lab favorecerá el procesamiento en el navegador para tareas comunes, reduciendo costo y evitando registros innecesarios de contenido del usuario.',
        freeValue: 'JSON, YAML, CSV, Base64, JWT, regex y diff',
        upgrade: 'Historial privado, workspaces, lotes y API',
      },
      fr: {
        headline: 'Outils dev conçus pour traiter localement les extraits sensibles.',
        summary: 'DevUtility Lab privilégiera le traitement dans le navigateur pour les tâches courantes, avec moins de coût et moins de journaux inutiles sur le contenu utilisateur.',
        freeValue: 'JSON, YAML, CSV, Base64, JWT, regex et diff',
        upgrade: 'Historique privé, espaces de travail, lots et API',
      },
      de: {
        headline: 'Entwickler-Tools, die sensible Ausschnitte zuerst lokal verarbeiten.',
        summary: 'DevUtility Lab bevorzugt Browser-Verarbeitung für häufige Aufgaben, senkt Kosten und vermeidet unnötige Logs von Nutzerinhalten.',
        freeValue: 'JSON, YAML, CSV, Base64, JWT, Regex und Diff',
        upgrade: 'Privater Verlauf, Workspaces, Stapel und API',
      },
    },
  },
  {
    slug: 'timenexus',
    name: 'TimeNexus',
    category: 'time',
    launchOrder: 4,
    status: 'planned',
    temporaryUrl: 'https://opentshost.com/supersites/timenexus/',
    freeTools: ['Time zones', 'Date differences', 'Business days', 'Timestamp conversion'],
    paidBenefits: ['Widgets', 'Presets', 'API access', 'History'],
    localized: {
      en: {
        headline: 'Time, date and unit helpers for everyday global coordination.',
        summary: 'TimeNexus will start with low-cost, high-demand utilities that can answer quickly in the browser while still rendering useful indexable guidance.',
        freeValue: 'Time zones, dates, business days and units',
        upgrade: 'Widgets, API, presets and history',
      },
      'pt-br': {
        headline: 'Auxiliares de tempo, data e unidades para coordenação global.',
        summary: 'TimeNexus começará com utilidades de alta demanda e baixo custo que respondem rápido no navegador sem abrir mão de orientação indexável.',
        freeValue: 'Fusos, datas, dias úteis e unidades',
        upgrade: 'Widgets, API, presets e histórico',
      },
      es: {
        headline: 'Ayudas de tiempo, fecha y unidades para coordinación global.',
        summary: 'TimeNexus empezará con utilidades de alta demanda y bajo costo que responden rápido en el navegador y mantienen guía indexable.',
        freeValue: 'Zonas horarias, fechas, días hábiles y unidades',
        upgrade: 'Widgets, API, presets e historial',
      },
      fr: {
        headline: 'Outils de temps, date et unités pour la coordination globale.',
        summary: 'TimeNexus commencera par des utilitaires très demandés et peu coûteux, rapides dans le navigateur et accompagnés de contenu indexable.',
        freeValue: 'Fuseaux, dates, jours ouvrés et unités',
        upgrade: 'Widgets, API, préréglages et historique',
      },
      de: {
        headline: 'Zeit-, Datums- und Einheitenhelfer für globale Koordination.',
        summary: 'TimeNexus startet mit stark nachgefragten, kostengünstigen Tools, die schnell im Browser antworten und indexierbare Hinweise liefern.',
        freeValue: 'Zeitzonen, Daten, Arbeitstage und Einheiten',
        upgrade: 'Widgets, API, Presets und Verlauf',
      },
    },
  },
  {
    slug: 'qrroute',
    name: 'QRRoute',
    category: 'links',
    launchOrder: 5,
    status: 'planned',
    temporaryUrl: 'https://opentshost.com/supersites/qrroute/',
    freeTools: ['Static QR codes', 'Barcodes', 'UTM builder', 'vCard and Wi-Fi QR'],
    paidBenefits: ['Dynamic QR', 'Short links', 'Analytics', 'Custom domains'],
    localized: {
      en: {
        headline: 'QR, barcode, UTM and link tools with clear abuse controls.',
        summary: 'QRRoute will make static generation useful for free while reserving analytics, dynamic routing and team controls for paid plans.',
        freeValue: 'Static QR, barcode, UTM, vCard and Wi-Fi codes',
        upgrade: 'Dynamic QR, short links, analytics and teams',
      },
      'pt-br': {
        headline: 'Ferramentas de QR, barcode, UTM e links com antiabuso claro.',
        summary: 'QRRoute tornará a geração estática útil gratuitamente e reservará analytics, rotas dinâmicas e controles de equipe para planos pagos.',
        freeValue: 'QR estático, barcode, UTM, vCard e Wi-Fi',
        upgrade: 'QR dinâmico, links curtos, analytics e equipes',
      },
      es: {
        headline: 'Herramientas de QR, barcode, UTM y enlaces con antiabuso claro.',
        summary: 'QRRoute hará útil la generación estática gratis y reservará analytics, rutas dinámicas y controles de equipo para planes pagos.',
        freeValue: 'QR estático, barcode, UTM, vCard y Wi-Fi',
        upgrade: 'QR dinámico, enlaces cortos, analytics y equipos',
      },
      fr: {
        headline: 'Outils QR, code-barres, UTM et liens avec contrôles anti-abus.',
        summary: 'QRRoute rendra la génération statique utile gratuitement et réservera l’analytics, les routes dynamiques et les équipes aux offres payantes.',
        freeValue: 'QR statique, code-barres, UTM, vCard et Wi-Fi',
        upgrade: 'QR dynamique, liens courts, analytics et équipes',
      },
      de: {
        headline: 'QR-, Barcode-, UTM- und Link-Tools mit klaren Missbrauchskontrollen.',
        summary: 'QRRoute macht statische Generierung kostenlos nützlich und reserviert Analytics, dynamische Routen und Teamkontrollen für bezahlte Pläne.',
        freeValue: 'Statische QR, Barcode, UTM, vCard und WLAN',
        upgrade: 'Dynamische QR, Kurzlinks, Analytics und Teams',
      },
    },
  },
  {
    slug: 'invoicecraft',
    name: 'InvoiceCraft',
    category: 'documents',
    launchOrder: 6,
    status: 'planned',
    temporaryUrl: 'https://opentshost.com/supersites/invoicecraft/',
    freeTools: ['Invoices', 'Quotes', 'Receipts', 'PDF downloads'],
    paidBenefits: ['Saved clients', 'Recurring documents', 'Branding', 'Payment workflows'],
    localized: {
      en: {
        headline: 'Invoices, quotes and receipts that work before account creation.',
        summary: 'InvoiceCraft will let visitors create and download basic documents first, while paid plans add saved records, teams and workflow automation.',
        freeValue: 'Create and download invoices, quotes and receipts',
        upgrade: 'Clients, products, recurrence, branding and payments',
      },
      'pt-br': {
        headline: 'Faturas, orçamentos e recibos que funcionam antes do cadastro.',
        summary: 'InvoiceCraft permitirá criar e baixar documentos básicos primeiro, enquanto planos pagos adicionam registros salvos, equipes e automação.',
        freeValue: 'Criar e baixar faturas, orçamentos e recibos',
        upgrade: 'Clientes, produtos, recorrência, marca e pagamentos',
      },
      es: {
        headline: 'Facturas, presupuestos y recibos que funcionan antes del registro.',
        summary: 'InvoiceCraft permitirá crear y descargar documentos básicos primero, mientras los planes pagos agregan registros, equipos y automatización.',
        freeValue: 'Crear y descargar facturas, presupuestos y recibos',
        upgrade: 'Clientes, productos, recurrencia, marca y pagos',
      },
      fr: {
        headline: 'Factures, devis et reçus utilisables avant la création de compte.',
        summary: 'InvoiceCraft permettra de créer et télécharger des documents de base, puis les offres payantes ajouteront historique, équipes et automatisation.',
        freeValue: 'Créer et télécharger factures, devis et reçus',
        upgrade: 'Clients, produits, récurrence, marque et paiements',
      },
      de: {
        headline: 'Rechnungen, Angebote und Belege, die vor dem Konto funktionieren.',
        summary: 'InvoiceCraft lässt Besucher einfache Dokumente zuerst erstellen und herunterladen; bezahlte Pläne ergänzen Daten, Teams und Automatisierung.',
        freeValue: 'Rechnungen, Angebote und Belege erstellen',
        upgrade: 'Kunden, Produkte, Wiederholung, Branding und Zahlungen',
      },
    },
  },
  {
    slug: 'mailhealth',
    name: 'MailHealth',
    category: 'email',
    launchOrder: 7,
    status: 'planned',
    temporaryUrl: 'https://opentshost.com/supersites/mailhealth/',
    freeTools: ['SPF checks', 'DKIM checks', 'DMARC checks', 'MX and SMTP checks'],
    paidBenefits: ['Monitoring', 'DMARC reports', 'Alerts', 'White-label reports'],
    localized: {
      en: {
        headline: 'Email authentication and deliverability checks for safer domains.',
        summary: 'MailHealth will combine DNS and SMTP checks with plain explanations so senders can fix authentication before paying for monitoring.',
        freeValue: 'SPF, DKIM, DMARC, MX, blacklist and SMTP checks',
        upgrade: 'Monitoring, alerts, DMARC reports and API',
      },
      'pt-br': {
        headline: 'Verificações de autenticação e entregabilidade para domínios.',
        summary: 'MailHealth combinará DNS e SMTP com explicações claras para que remetentes corrijam autenticação antes de pagar por monitoramento.',
        freeValue: 'SPF, DKIM, DMARC, MX, blacklist e SMTP',
        upgrade: 'Monitoramento, alertas, relatórios DMARC e API',
      },
      es: {
        headline: 'Verificaciones de autenticación y entregabilidad para dominios.',
        summary: 'MailHealth combinará DNS y SMTP con explicaciones claras para que remitentes corrijan autenticación antes de pagar monitoreo.',
        freeValue: 'SPF, DKIM, DMARC, MX, blacklist y SMTP',
        upgrade: 'Monitoreo, alertas, reportes DMARC y API',
      },
      fr: {
        headline: 'Vérifications d’authentification et de délivrabilité des domaines.',
        summary: 'MailHealth combinera DNS et SMTP avec des explications claires pour corriger l’authentification avant de payer la surveillance.',
        freeValue: 'SPF, DKIM, DMARC, MX, blacklist et SMTP',
        upgrade: 'Surveillance, alertes, rapports DMARC et API',
      },
      de: {
        headline: 'E-Mail-Authentifizierung und Zustellbarkeit für sicherere Domains.',
        summary: 'MailHealth kombiniert DNS- und SMTP-Prüfungen mit klaren Erklärungen, bevor Monitoring bezahlt werden muss.',
        freeValue: 'SPF, DKIM, DMARC, MX, Blacklist und SMTP',
        upgrade: 'Monitoring, Warnungen, DMARC-Berichte und API',
      },
    },
  },
  {
    slug: 'sitepulse-lab',
    name: 'SitePulse Lab',
    category: 'monitoring',
    launchOrder: 8,
    status: 'planned',
    temporaryUrl: 'https://opentshost.com/supersites/sitepulse-lab/',
    freeTools: ['Status checks', 'Redirect checks', 'Security headers', 'Robots and sitemap checks'],
    paidBenefits: ['Uptime monitoring', 'Incident pages', 'Multi-region history', 'Reports'],
    localized: {
      en: {
        headline: 'Website status, headers and performance checks for first response.',
        summary: 'SitePulse Lab will start with one-off public checks and grow into uptime monitoring, incident workflows and multi-region history.',
        freeValue: 'Status, redirects, headers, robots, sitemap and TTFB',
        upgrade: 'Uptime, incidents, status pages and multi-region history',
      },
      'pt-br': {
        headline: 'Status, headers e performance web para primeira resposta.',
        summary: 'SitePulse Lab começará com verificações pontuais públicas e evoluirá para uptime, incidentes e histórico multi-região.',
        freeValue: 'Status, redirects, headers, robots, sitemap e TTFB',
        upgrade: 'Uptime, incidentes, status pages e histórico multi-região',
      },
      es: {
        headline: 'Estado, headers y performance web para primera respuesta.',
        summary: 'SitePulse Lab empezará con verificaciones públicas puntuales y crecerá hacia uptime, incidentes e historial multi-región.',
        freeValue: 'Estado, redirects, headers, robots, sitemap y TTFB',
        upgrade: 'Uptime, incidentes, status pages e historial multi-región',
      },
      fr: {
        headline: 'Statut, en-têtes et performance web pour le premier diagnostic.',
        summary: 'SitePulse Lab commencera par des vérifications publiques ponctuelles avant la surveillance uptime, les incidents et l’historique multi-région.',
        freeValue: 'Statut, redirections, en-têtes, robots, sitemap et TTFB',
        upgrade: 'Uptime, incidents, pages de statut et historique multi-région',
      },
      de: {
        headline: 'Website-Status, Header und Performance für erste Diagnose.',
        summary: 'SitePulse Lab startet mit punktuellen öffentlichen Checks und wächst zu Uptime, Incidents und Multi-Region-Verlauf.',
        freeValue: 'Status, Redirects, Header, Robots, Sitemap und TTFB',
        upgrade: 'Uptime, Incidents, Statusseiten und Multi-Region-Verlauf',
      },
    },
  },
  {
    slug: 'pixelbatch',
    name: 'PixelBatch',
    category: 'images',
    launchOrder: 9,
    status: 'planned',
    temporaryUrl: 'https://opentshost.com/supersites/pixelbatch/',
    freeTools: ['Resize', 'Crop', 'Compress', 'Convert and remove metadata'],
    paidBenefits: ['Batch processing', 'Presets', 'Larger files', 'API access'],
    localized: {
      en: {
        headline: 'Image optimization tools for web and commerce workflows.',
        summary: 'PixelBatch will keep common image work in the browser where possible, with server-side processing reserved for scale, storage and advanced automation.',
        freeValue: 'Resize, crop, compress, convert and strip metadata',
        upgrade: 'Batch processing, presets, larger files and API',
      },
      'pt-br': {
        headline: 'Otimização de imagens para fluxos web e e-commerce.',
        summary: 'PixelBatch manterá tarefas comuns no navegador quando possível, reservando processamento servidor para escala, armazenamento e automação.',
        freeValue: 'Redimensionar, cortar, comprimir, converter e remover metadados',
        upgrade: 'Processamento em lote, presets, arquivos maiores e API',
      },
      es: {
        headline: 'Optimización de imágenes para flujos web y comercio.',
        summary: 'PixelBatch mantendrá tareas comunes en el navegador cuando sea posible, reservando servidor para escala, almacenamiento y automatización.',
        freeValue: 'Redimensionar, recortar, comprimir, convertir y quitar metadatos',
        upgrade: 'Procesamiento por lotes, presets, archivos mayores y API',
      },
      fr: {
        headline: 'Optimisation d’images pour le web et le commerce.',
        summary: 'PixelBatch gardera les tâches courantes dans le navigateur quand possible, avec serveur pour l’échelle, le stockage et l’automatisation.',
        freeValue: 'Redimensionner, recadrer, compresser, convertir et retirer les métadonnées',
        upgrade: 'Traitement par lots, préréglages, fichiers plus grands et API',
      },
      de: {
        headline: 'Bildoptimierung für Web- und Commerce-Workflows.',
        summary: 'PixelBatch hält gängige Bildaufgaben möglichst im Browser; Server-Verarbeitung bleibt für Skalierung, Speicher und Automatisierung.',
        freeValue: 'Größe ändern, zuschneiden, komprimieren, konvertieren und Metadaten entfernen',
        upgrade: 'Stapelverarbeitung, Presets, größere Dateien und API',
      },
    },
  },
  {
    slug: 'docshift',
    name: 'DocShift',
    category: 'documents',
    launchOrder: 10,
    status: 'planned',
    temporaryUrl: 'https://opentshost.com/supersites/docshift/',
    freeTools: ['Merge PDFs', 'Split PDFs', 'Rotate pages', 'Compress and watermark'],
    paidBenefits: ['Batch jobs', 'Larger files', 'OCR', 'Team workspaces'],
    localized: {
      en: {
        headline: 'PDF and document utilities with privacy-first processing rules.',
        summary: 'DocShift will focus on browser-side document tasks first, then add controlled server-side workflows for larger files, OCR and team history.',
        freeValue: 'Merge, split, rotate, compress and watermark PDFs',
        upgrade: 'Batch jobs, larger files, OCR, teams and API',
      },
      'pt-br': {
        headline: 'Ferramentas de PDF e documentos com regras de privacidade.',
        summary: 'DocShift focará primeiro em tarefas no navegador e depois adicionará fluxos servidor controlados para arquivos maiores, OCR e histórico de equipe.',
        freeValue: 'Juntar, dividir, girar, comprimir e marcar PDFs',
        upgrade: 'Lotes, arquivos maiores, OCR, equipes e API',
      },
      es: {
        headline: 'Herramientas de PDF y documentos con reglas de privacidad.',
        summary: 'DocShift se enfocará primero en tareas de navegador y luego sumará flujos servidor controlados para archivos mayores, OCR e historial de equipo.',
        freeValue: 'Unir, dividir, rotar, comprimir y marcar PDFs',
        upgrade: 'Lotes, archivos mayores, OCR, equipos y API',
      },
      fr: {
        headline: 'Outils PDF et documents avec règles de confidentialité fortes.',
        summary: 'DocShift privilégiera d’abord le navigateur, puis ajoutera des workflows serveur contrôlés pour gros fichiers, OCR et historique d’équipe.',
        freeValue: 'Fusionner, diviser, pivoter, compresser et filigraner des PDF',
        upgrade: 'Lots, fichiers plus grands, OCR, équipes et API',
      },
      de: {
        headline: 'PDF- und Dokumenten-Tools mit Privacy-first-Verarbeitung.',
        summary: 'DocShift fokussiert zuerst Browser-Aufgaben und ergänzt später kontrollierte Server-Workflows für große Dateien, OCR und Teamverlauf.',
        freeValue: 'PDFs zusammenführen, teilen, drehen, komprimieren und wasserzeichnen',
        upgrade: 'Stapel, größere Dateien, OCR, Teams und API',
      },
    },
  },
]

export const statusLabels: Record<SiteStatus, Record<LocaleCode, string>> = {
  foundation: {
    en: 'Foundation',
    'pt-br': 'Fundação',
    es: 'Fundación',
    fr: 'Fondation',
    de: 'Fundament',
  },
  planned: {
    en: 'Planned',
    'pt-br': 'Planejado',
    es: 'Planificado',
    fr: 'Planifié',
    de: 'Geplant',
  },
  blocked: {
    en: 'Blocked',
    'pt-br': 'Bloqueado',
    es: 'Bloqueado',
    fr: 'Bloqué',
    de: 'Blockiert',
  },
}

export function getCategoryLabel(category: SiteCategory, locale: LocaleCode): string {
  return categoryCatalog.find((item) => item.key === category)?.labels[locale] ?? category
}

export function getSiteBySlug(slug: string | undefined): SiteSummary | null {
  return siteCatalog.find((site) => site.slug === slug) ?? null
}

export function filterSites(query: string, category: SiteCategory | 'all'): SiteSummary[] {
  const normalizedQuery = query.trim().toLowerCase()

  return siteCatalog.filter((site) => {
    const matchesCategory = category === 'all' || site.category === category
    const searchableText = [
      site.name,
      site.slug,
      site.localized.en.headline,
      site.localized.en.summary,
      site.localized.en.freeValue,
      site.localized.en.upgrade,
      ...site.freeTools,
      ...site.paidBenefits,
    ]
      .join(' ')
      .toLowerCase()

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery))
  })
}
