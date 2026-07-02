export const localeCodes = ['en', 'pt-br', 'es', 'fr', 'de'] as const

export type LocaleCode = (typeof localeCodes)[number]

export interface LocaleDefinition {
  code: LocaleCode
  label: string
  shortLabel: string
  htmlLang: string
  hreflang: string
  intlLocale: string
  textDirection: 'ltr'
}

export interface LanguageOption {
  code: LocaleCode
  label: string
  shortLabel: string
  href: string
  current: boolean
}

export const defaultLocale: LocaleCode = 'en'

export const locales: readonly LocaleDefinition[] = [
  { code: 'en', label: 'English', shortLabel: 'EN', htmlLang: 'en', hreflang: 'en', intlLocale: 'en-US', textDirection: 'ltr' },
  { code: 'pt-br', label: 'Português', shortLabel: 'PT-BR', htmlLang: 'pt-BR', hreflang: 'pt-BR', intlLocale: 'pt-BR', textDirection: 'ltr' },
  { code: 'es', label: 'Español', shortLabel: 'ES', htmlLang: 'es', hreflang: 'es', intlLocale: 'es-ES', textDirection: 'ltr' },
  { code: 'fr', label: 'Français', shortLabel: 'FR', htmlLang: 'fr', hreflang: 'fr', intlLocale: 'fr-FR', textDirection: 'ltr' },
  { code: 'de', label: 'Deutsch', shortLabel: 'DE', htmlLang: 'de', hreflang: 'de', intlLocale: 'de-DE', textDirection: 'ltr' },
]

const localeSet = new Set<string>(localeCodes)
const localeDefinitionByCode = new Map(locales.map((locale) => [locale.code, locale]))

export function isLocaleCode(value: unknown): value is LocaleCode {
  return typeof value === 'string' && localeSet.has(value)
}

export function normalizeLocale(value: unknown): LocaleCode | null {
  if (typeof value !== 'string') {
    return null
  }

  const normalized = value.trim().replace('_', '-').toLowerCase()

  return isLocaleCode(normalized) ? normalized : null
}

export function getLocaleDefinition(locale: LocaleCode): LocaleDefinition {
  const definition = localeDefinitionByCode.get(locale)

  if (!definition) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  return definition
}

export function toHreflang(locale: LocaleCode): string {
  return getLocaleDefinition(locale).hreflang
}

export function toHtmlLang(locale: LocaleCode): string {
  return getLocaleDefinition(locale).htmlLang
}

export function toIntlLocale(locale: LocaleCode): string {
  return getLocaleDefinition(locale).intlLocale
}

function normalizePathSegment(segment: string | number): string {
  return String(segment).trim().replace(/^\/+|\/+$/g, '')
}

export function localizedPath(
  locale: LocaleCode,
  ...segments: Array<string | number | null | undefined>
): string {
  const path = segments
    .filter((segment): segment is string | number => segment !== null && segment !== undefined)
    .flatMap((segment) => normalizePathSegment(segment).split('/'))
    .map((segment) => normalizePathSegment(segment))
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  return path ? `/${locale}/${path}` : `/${locale}`
}

export function localizedHomePath(locale: LocaleCode): string {
  return localizedPath(locale)
}

export function localizedSitePath(locale: LocaleCode, slug: string): string {
  return localizedPath(locale, 'sites', slug)
}

export function localizedLegalPath(locale: LocaleCode, slug: string): string {
  return localizedPath(locale, slug)
}

export function buildLanguageOptions(
  currentLocale: LocaleCode,
  pathForLocale: (locale: LocaleCode) => string,
): LanguageOption[] {
  return locales.map((locale) => ({
    code: locale.code,
    label: locale.label,
    shortLabel: locale.shortLabel,
    href: pathForLocale(locale.code),
    current: locale.code === currentLocale,
  }))
}

export function formatDate(
  value: Date | string | number,
  locale: LocaleCode,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' },
): string {
  return new Intl.DateTimeFormat(toIntlLocale(locale), options).format(new Date(value))
}

export function formatNumber(
  value: number,
  locale: LocaleCode,
  options: Intl.NumberFormatOptions = {},
): string {
  return new Intl.NumberFormat(toIntlLocale(locale), options).format(value)
}

export function formatCurrency(
  value: number,
  locale: LocaleCode,
  currency: string,
  options: Intl.NumberFormatOptions = {},
): string {
  return formatNumber(value, locale, {
    style: 'currency',
    currency,
    ...options,
  })
}

type PublicCopyMap = Record<string, unknown>

export type TrustPageSlug =
  | 'about'
  | 'contact'
  | 'privacy'
  | 'cookies'
  | 'terms'
  | 'methodology'
  | 'editorial-policy'
  | 'status'

export interface TrustContentSection {
  heading: string
  paragraphs: string[]
}

export interface TrustPageCopyShape {
  navLabel: string
  title: string
  description: string
  updatedLabel: string
  sections: TrustContentSection[]
}

export interface TrustSupportProfile {
  siteName: string
  publicPath: string
}

const trustNavLabels: Record<LocaleCode, Record<TrustPageSlug, string>> = {
  en: {
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy',
    cookies: 'Cookies',
    terms: 'Terms',
    methodology: 'Methodology',
    'editorial-policy': 'Editorial',
    status: 'Status',
  },
  'pt-br': {
    about: 'Sobre',
    contact: 'Contato',
    privacy: 'Privacidade',
    cookies: 'Cookies',
    terms: 'Termos',
    methodology: 'Metodologia',
    'editorial-policy': 'Editorial',
    status: 'Status',
  },
  es: {
    about: 'Acerca de',
    contact: 'Contacto',
    privacy: 'Privacidad',
    cookies: 'Cookies',
    terms: 'Términos',
    methodology: 'Metodología',
    'editorial-policy': 'Editorial',
    status: 'Estado',
  },
  fr: {
    about: 'À propos',
    contact: 'Contact',
    privacy: 'Confidentialité',
    cookies: 'Cookies',
    terms: 'Conditions',
    methodology: 'Méthodologie',
    'editorial-policy': 'Éditorial',
    status: 'Statut',
  },
  de: {
    about: 'Über',
    contact: 'Kontakt',
    privacy: 'Datenschutz',
    cookies: 'Cookies',
    terms: 'Bedingungen',
    methodology: 'Methodik',
    'editorial-policy': 'Redaktion',
    status: 'Status',
  },
}

function trustSection(heading: string, ...paragraphs: string[]): TrustContentSection {
  return { heading, paragraphs }
}

function localizedTrustTitle(locale: LocaleCode, slug: TrustPageSlug, siteName: string): string {
  const titles: Record<LocaleCode, Record<TrustPageSlug, string>> = {
    en: {
      about: `About ${siteName}`,
      contact: `Contact ${siteName}`,
      privacy: `${siteName} privacy`,
      cookies: `${siteName} cookies`,
      terms: `${siteName} terms of use`,
      methodology: `${siteName} methodology`,
      'editorial-policy': `${siteName} editorial policy`,
      status: `${siteName} public status`,
    },
    'pt-br': {
      about: `Sobre ${siteName}`,
      contact: `Contato de ${siteName}`,
      privacy: `Privacidade de ${siteName}`,
      cookies: `Cookies de ${siteName}`,
      terms: `Termos de uso de ${siteName}`,
      methodology: `Metodologia de ${siteName}`,
      'editorial-policy': `Política editorial de ${siteName}`,
      status: `Status público de ${siteName}`,
    },
    es: {
      about: `Acerca de ${siteName}`,
      contact: `Contacto de ${siteName}`,
      privacy: `Privacidad de ${siteName}`,
      cookies: `Cookies de ${siteName}`,
      terms: `Términos de uso de ${siteName}`,
      methodology: `Metodología de ${siteName}`,
      'editorial-policy': `Política editorial de ${siteName}`,
      status: `Estado público de ${siteName}`,
    },
    fr: {
      about: `À propos de ${siteName}`,
      contact: `Contact ${siteName}`,
      privacy: `Confidentialité de ${siteName}`,
      cookies: `Cookies de ${siteName}`,
      terms: `Conditions d’utilisation de ${siteName}`,
      methodology: `Méthodologie de ${siteName}`,
      'editorial-policy': `Politique éditoriale de ${siteName}`,
      status: `Statut public de ${siteName}`,
    },
    de: {
      about: `Über ${siteName}`,
      contact: `Kontakt zu ${siteName}`,
      privacy: `Datenschutz bei ${siteName}`,
      cookies: `Cookies bei ${siteName}`,
      terms: `Nutzungsbedingungen für ${siteName}`,
      methodology: `Methodik von ${siteName}`,
      'editorial-policy': `Redaktionelle Richtlinie von ${siteName}`,
      status: `Öffentlicher Status von ${siteName}`,
    },
  }

  return titles[locale][slug]
}

type LocalizedTrustText = Record<LocaleCode, string>

interface TrustProductCopy {
  action: LocalizedTrustText
  method: LocalizedTrustText
  review: LocalizedTrustText
  privacy: LocalizedTrustText
  limits: LocalizedTrustText
}

const genericTrustProductCopy: TrustProductCopy = {
  action: {
    en: 'complete a focused web task',
    'pt-br': 'concluir uma tarefa web específica',
    es: 'resolver una tarea web concreta',
    fr: 'terminer une tâche web précise',
    de: 'eine konkrete Webaufgabe zu erledigen',
  },
  method: {
    en: 'The tool uses the values you provide and shows the result directly on the page.',
    'pt-br': 'A ferramenta usa os valores informados e mostra o resultado diretamente na página.',
    es: 'La herramienta usa los valores ingresados y muestra el resultado directamente en la página.',
    fr: 'L outil utilise les valeurs fournies et affiche le résultat directement sur la page.',
    de: 'Das Tool nutzt die eingegebenen Werte und zeigt das Ergebnis direkt auf der Seite.',
  },
  review: {
    en: 'Check the input, the result and any warning before copying or using it.',
    'pt-br': 'Confira a entrada, o resultado e qualquer aviso antes de copiar ou usar.',
    es: 'Revisa la entrada, el resultado y cualquier aviso antes de copiar o usarlo.',
    fr: 'Vérifiez la saisie, le résultat et les avertissements avant de copier ou utiliser.',
    de: 'Prüfen Sie Eingabe, Ergebnis und Hinweise, bevor Sie es kopieren oder nutzen.',
  },
  privacy: {
    en: 'The basic workflow asks only for the data needed for the task.',
    'pt-br': 'O fluxo básico pede apenas os dados necessários para a tarefa.',
    es: 'El flujo básico solicita solo los datos necesarios para la tarea.',
    fr: 'Le flux de base demande uniquement les données nécessaires à la tâche.',
    de: 'Der Basisablauf fragt nur die Daten ab, die für die Aufgabe nötig sind.',
  },
  limits: {
    en: 'Results are informational and should be checked before important decisions.',
    'pt-br': 'Os resultados são informativos e devem ser conferidos antes de decisões importantes.',
    es: 'Los resultados son informativos y deben verificarse antes de decisiones importantes.',
    fr: 'Les résultats sont informatifs et doivent être vérifiés avant les décisions importantes.',
    de: 'Ergebnisse sind informativ und sollten vor wichtigen Entscheidungen geprüft werden.',
  },
}

const trustProductCopies: Record<string, TrustProductCopy> = {
  'SuperSites Hub': {
    action: {
      en: 'find the right free tool in the SuperSites catalog',
      'pt-br': 'encontrar a ferramenta gratuita certa no catálogo SuperSites',
      es: 'encontrar la herramienta gratis adecuada en el catálogo SuperSites',
      fr: 'trouver le bon outil gratuit dans le catalogue SuperSites',
      de: 'das passende kostenlose Tool im SuperSites-Katalog zu finden',
    },
    method: {
      en: 'The catalog groups tools by task, category and site so you can start from the closest match.',
      'pt-br': 'O catálogo organiza ferramentas por tarefa, categoria e site para você começar pela opção mais próxima.',
      es: 'El catálogo organiza herramientas por tarea, categoría y sitio para empezar por la opción más cercana.',
      fr: 'Le catalogue organise les outils par tâche, catégorie et site pour démarrer par le meilleur choix.',
      de: 'Der Katalog ordnet Tools nach Aufgabe, Kategorie und Site, damit Sie passend starten können.',
    },
    review: {
      en: 'Compare the task card, language and destination before opening a tool.',
      'pt-br': 'Compare o card da tarefa, o idioma e o destino antes de abrir uma ferramenta.',
      es: 'Compara la tarjeta de tarea, el idioma y el destino antes de abrir una herramienta.',
      fr: 'Comparez la carte de tâche, la langue et la destination avant d ouvrir un outil.',
      de: 'Vergleichen Sie Aufgabenkarte, Sprache und Ziel, bevor Sie ein Tool öffnen.',
    },
    privacy: {
      en: 'Catalog browsing does not require an account, and tool inputs belong on the individual tool pages.',
      'pt-br': 'A navegação no catálogo não exige conta, e entradas de ferramenta pertencem às páginas de cada ferramenta.',
      es: 'La navegación del catálogo no requiere cuenta, y las entradas pertenecen a cada herramienta.',
      fr: 'La navigation du catalogue ne nécessite pas de compte, et les saisies appartiennent aux pages des outils.',
      de: 'Die Katalognavigation erfordert kein Konto; Eingaben gehören auf die jeweilige Toolseite.',
    },
    limits: {
      en: 'The hub points to available free workflows and does not replace each tool page.',
      'pt-br': 'O hub aponta para fluxos gratuitos disponíveis e não substitui a página de cada ferramenta.',
      es: 'El hub apunta a flujos gratis disponibles y no reemplaza la página de cada herramienta.',
      fr: 'Le hub pointe vers les flux gratuits disponibles et ne remplace pas chaque page outil.',
      de: 'Der Hub verweist auf verfügbare kostenlose Abläufe und ersetzt keine Toolseite.',
    },
  },
  'NetProbe Atlas': {
    action: {
      en: 'check IP, DNS, domains, certificates, ports and site reachability',
      'pt-br': 'consultar IP, DNS, domínios, certificados, portas e alcance de sites',
      es: 'consultar IP, DNS, dominios, certificados, puertos y disponibilidad de sitios',
      fr: 'vérifier IP, DNS, domaines, certificats, ports et disponibilité de sites',
      de: 'IP, DNS, Domains, Zertifikate, Ports und Erreichbarkeit von Websites zu prüfen',
    },
    method: {
      en: 'Network checks return point-in-time responses from the available resolvers or public endpoints.',
      'pt-br': 'As consultas de rede retornam respostas pontuais dos resolvedores ou endpoints públicos disponíveis.',
      es: 'Las consultas de red devuelven respuestas puntuales de los resolvers o endpoints públicos disponibles.',
      fr: 'Les contrôles réseau renvoient des réponses ponctuelles depuis les résolveurs ou endpoints publics disponibles.',
      de: 'Netzwerkprüfungen liefern Momentaufnahmen von verfügbaren Resolvern oder öffentlichen Endpunkten.',
    },
    review: {
      en: 'Compare returned records, resolver rows, timestamps and warnings before changing DNS or certificate settings.',
      'pt-br': 'Compare registros retornados, linhas de resolvedores, horários e avisos antes de mudar DNS ou certificados.',
      es: 'Compara registros, resolvers, horarios y avisos antes de cambiar DNS o certificados.',
      fr: 'Comparez enregistrements, résolveurs, horaires et avertissements avant de modifier DNS ou certificats.',
      de: 'Vergleichen Sie Records, Resolver, Zeitpunkte und Hinweise, bevor Sie DNS oder Zertifikate ändern.',
    },
    privacy: {
      en: 'Only the target needed for the diagnostic is sent for the check.',
      'pt-br': 'Somente o alvo necessário para o diagnóstico é enviado para a consulta.',
      es: 'Solo se envía el objetivo necesario para el diagnóstico.',
      fr: 'Seule la cible nécessaire au diagnostic est envoyée.',
      de: 'Nur das für die Diagnose nötige Ziel wird für die Prüfung gesendet.',
    },
    limits: {
      en: 'DNS and reachability results are snapshots and do not prove every resolver in the world has changed.',
      'pt-br': 'Resultados de DNS e alcance são retratos do momento e não provam que todos os resolvedores do mundo mudaram.',
      es: 'Los resultados DNS y de disponibilidad son capturas del momento y no prueban que todos los resolvers del mundo cambiaron.',
      fr: 'Les résultats DNS et de disponibilité sont des instantanés et ne prouvent pas que tous les résolveurs ont changé.',
      de: 'DNS- und Erreichbarkeitsergebnisse sind Momentaufnahmen und beweisen keine weltweite Änderung aller Resolver.',
    },
  },
  CalcHarbor: {
    action: {
      en: 'calculate loans, margins, break-even points, ROI and time value questions',
      'pt-br': 'calcular empréstimos, margens, ponto de equilíbrio, ROI e valor do dinheiro no tempo',
      es: 'calcular préstamos, márgenes, punto de equilibrio, ROI y valor del dinero en el tiempo',
      fr: 'calculer prêts, marges, seuil de rentabilité, ROI et valeur temps de l argent',
      de: 'Darlehen, Margen, Break-even, ROI und Zeitwertfragen zu berechnen',
    },
    method: {
      en: 'Calculators apply the shown formulas to the numbers you enter.',
      'pt-br': 'As calculadoras aplicam as fórmulas exibidas aos números informados.',
      es: 'Las calculadoras aplican las fórmulas mostradas a los números ingresados.',
      fr: 'Les calculateurs appliquent les formules affichées aux nombres saisis.',
      de: 'Die Rechner wenden die gezeigten Formeln auf Ihre Zahlen an.',
    },
    review: {
      en: 'Check units, period, currency and rounding before comparing scenarios.',
      'pt-br': 'Confira unidades, período, moeda e arredondamento antes de comparar cenários.',
      es: 'Revisa unidades, periodo, moneda y redondeo antes de comparar escenarios.',
      fr: 'Vérifiez unités, période, devise et arrondi avant de comparer les scénarios.',
      de: 'Prüfen Sie Einheiten, Zeitraum, Währung und Rundung vor dem Szenarienvergleich.',
    },
    privacy: {
      en: 'Basic calculator inputs stay in the browser workflow.',
      'pt-br': 'Entradas básicas das calculadoras ficam no fluxo do navegador.',
      es: 'Las entradas básicas de calculadoras quedan en el flujo del navegador.',
      fr: 'Les saisies de base des calculateurs restent dans le flux du navigateur.',
      de: 'Basis-Eingaben der Rechner bleiben im Browserablauf.',
    },
    limits: {
      en: 'Calculator results are estimates and not financial, tax or legal advice.',
      'pt-br': 'Resultados de calculadora são estimativas e não são aconselhamento financeiro, fiscal ou jurídico.',
      es: 'Los resultados son estimaciones y no son asesoría financiera, fiscal ni legal.',
      fr: 'Les résultats sont des estimations et non un conseil financier, fiscal ou juridique.',
      de: 'Rechenergebnisse sind Schätzungen und keine Finanz-, Steuer- oder Rechtsberatung.',
    },
  },
  'DevUtility Lab': {
    action: {
      en: 'format JSON, convert Base64, inspect JWTs, test regex and generate developer helpers',
      'pt-br': 'formatar JSON, converter Base64, inspecionar JWTs, testar regex e gerar utilidades de desenvolvimento',
      es: 'formatear JSON, convertir Base64, inspeccionar JWT, probar regex y generar utilidades de desarrollo',
      fr: 'formater JSON, convertir Base64, inspecter JWT, tester regex et générer des aides développeur',
      de: 'JSON zu formatieren, Base64 zu konvertieren, JWTs zu prüfen, Regex zu testen und Entwicklerhilfen zu erzeugen',
    },
    method: {
      en: 'Developer tools process the entered text and show formatted, decoded or generated output immediately.',
      'pt-br': 'As ferramentas processam o texto informado e mostram saída formatada, decodificada ou gerada na hora.',
      es: 'Las herramientas procesan el texto ingresado y muestran salida formateada, decodificada o generada al momento.',
      fr: 'Les outils traitent le texte saisi et affichent immédiatement la sortie formatée, décodée ou générée.',
      de: 'Die Tools verarbeiten eingegebenen Text und zeigen formatierte, dekodierte oder erzeugte Ausgaben sofort.',
    },
    review: {
      en: 'Review decoded values, validation messages and escaping before using output in code.',
      'pt-br': 'Revise valores decodificados, mensagens de validação e escapes antes de usar a saída em código.',
      es: 'Revisa valores decodificados, validaciones y escapes antes de usar la salida en código.',
      fr: 'Vérifiez valeurs décodées, validations et échappements avant d utiliser la sortie dans du code.',
      de: 'Prüfen Sie dekodierte Werte, Validierungen und Escaping, bevor Sie Ausgaben im Code nutzen.',
    },
    privacy: {
      en: 'Prefer local browser processing for pasted snippets and tokens.',
      'pt-br': 'O processamento local no navegador é preferido para snippets e tokens colados.',
      es: 'Se prefiere el procesamiento local en el navegador para snippets y tokens pegados.',
      fr: 'Le traitement local dans le navigateur est privilégié pour snippets et tokens collés.',
      de: 'Lokale Browserverarbeitung wird für eingefügte Snippets und Tokens bevorzugt.',
    },
    limits: {
      en: 'Do not paste secrets you would not share with a web page, even when a tool runs locally.',
      'pt-br': 'Não cole segredos que você não compartilharia com uma página web, mesmo quando a ferramenta roda localmente.',
      es: 'No pegues secretos que no compartirías con una página web, incluso si la herramienta corre localmente.',
      fr: 'Ne collez pas de secrets que vous ne partageriez pas avec une page web, même si l outil est local.',
      de: 'Fügen Sie keine Geheimnisse ein, die Sie keiner Webseite geben würden, auch wenn das Tool lokal läuft.',
    },
  },
  TimeNexus: {
    action: {
      en: 'convert times, compare time zones, plan meetings and check world clocks',
      'pt-br': 'converter horários, comparar fusos, planejar reuniões e consultar relógios mundiais',
      es: 'convertir horas, comparar husos, planificar reuniones y consultar relojes mundiales',
      fr: 'convertir les heures, comparer les fuseaux, planifier des réunions et consulter les horloges mondiales',
      de: 'Zeiten zu konvertieren, Zeitzonen zu vergleichen, Meetings zu planen und Weltuhren zu prüfen',
    },
    method: {
      en: 'Time tools use selected dates, cities and time zones to calculate equivalent times.',
      'pt-br': 'As ferramentas usam datas, cidades e fusos selecionados para calcular horários equivalentes.',
      es: 'Las herramientas usan fechas, ciudades y husos seleccionados para calcular horas equivalentes.',
      fr: 'Les outils utilisent dates, villes et fuseaux choisis pour calculer les heures équivalentes.',
      de: 'Zeittools nutzen ausgewählte Daten, Städte und Zeitzonen für entsprechende Zeiten.',
    },
    review: {
      en: 'Check date, daylight-saving changes and participant cities before sending a meeting time.',
      'pt-br': 'Confira data, horário de verão e cidades participantes antes de enviar um horário de reunião.',
      es: 'Revisa fecha, horario de verano y ciudades antes de enviar una hora de reunión.',
      fr: 'Vérifiez date, heure d été et villes participantes avant d envoyer un horaire.',
      de: 'Prüfen Sie Datum, Sommerzeit und Teilnehmerstädte vor dem Versenden einer Meetingzeit.',
    },
    privacy: {
      en: 'Planner inputs stay focused on time, place and schedule context.',
      'pt-br': 'Entradas do planejador ficam focadas em horário, local e contexto de agenda.',
      es: 'Las entradas se enfocan en hora, lugar y contexto de agenda.',
      fr: 'Les saisies restent centrées sur heure, lieu et contexte de planning.',
      de: 'Planereingaben konzentrieren sich auf Zeit, Ort und Terminkontext.',
    },
    limits: {
      en: 'Time-zone rules can change, so confirm critical travel, legal or broadcast times with official sources.',
      'pt-br': 'Regras de fuso podem mudar; confirme viagens, prazos legais ou transmissões críticas em fontes oficiais.',
      es: 'Las reglas de huso pueden cambiar; confirma viajes, plazos legales o emisiones críticas en fuentes oficiales.',
      fr: 'Les règles de fuseau peuvent changer; confirmez voyages, délais légaux ou diffusions critiques auprès de sources officielles.',
      de: 'Zeitzonenregeln können sich ändern; prüfen Sie Reisen, Fristen oder Sendetermine mit offiziellen Quellen.',
    },
  },
  QRRoute: {
    action: {
      en: 'create static QR codes, UTM links, barcodes and simple sharing assets',
      'pt-br': 'criar QR codes estáticos, links UTM, códigos de barras e materiais simples de compartilhamento',
      es: 'crear códigos QR estáticos, enlaces UTM, códigos de barras y piezas simples para compartir',
      fr: 'créer QR codes statiques, liens UTM, codes-barres et supports simples de partage',
      de: 'statische QR-Codes, UTM-Links, Barcodes und einfache Sharing-Assets zu erstellen',
    },
    method: {
      en: 'Generators turn the entered destination, text or code into a downloadable asset.',
      'pt-br': 'Os geradores transformam destino, texto ou código informado em um arquivo para baixar.',
      es: 'Los generadores convierten destino, texto o código en un archivo descargable.',
      fr: 'Les générateurs transforment destination, texte ou code en fichier téléchargeable.',
      de: 'Generatoren wandeln Ziel, Text oder Code in eine herunterladbare Datei um.',
    },
    review: {
      en: 'Test the final code with a scanner and verify the destination before printing or sharing.',
      'pt-br': 'Teste o código final com um leitor e confira o destino antes de imprimir ou compartilhar.',
      es: 'Prueba el código final con un lector y verifica el destino antes de imprimir o compartir.',
      fr: 'Testez le code final avec un lecteur et vérifiez la destination avant impression ou partage.',
      de: 'Testen Sie den fertigen Code mit einem Scanner und prüfen Sie das Ziel vor Druck oder Teilen.',
    },
    privacy: {
      en: 'Static generation can be completed without an account for the basic asset.',
      'pt-br': 'A geração estática pode ser concluída sem conta para o arquivo básico.',
      es: 'La generación estática puede completarse sin cuenta para el archivo básico.',
      fr: 'La génération statique peut être terminée sans compte pour le fichier de base.',
      de: 'Statische Erzeugung ist für die Basisdatei ohne Konto möglich.',
    },
    limits: {
      en: 'Static codes cannot be edited after printing unless the destination itself redirects.',
      'pt-br': 'Códigos estáticos não podem ser editados depois da impressão, salvo se o próprio destino redirecionar.',
      es: 'Los códigos estáticos no se editan después de imprimir, salvo que el destino redireccione.',
      fr: 'Les codes statiques ne se modifient pas après impression, sauf si la destination redirige.',
      de: 'Statische Codes sind nach dem Druck nicht änderbar, außer das Ziel leitet selbst weiter.',
    },
  },
  InvoiceCraft: {
    action: {
      en: 'create invoices, quotes and receipts in the browser',
      'pt-br': 'criar faturas, orçamentos e recibos no navegador',
      es: 'crear facturas, presupuestos y recibos en el navegador',
      fr: 'créer factures, devis et reçus dans le navigateur',
      de: 'Rechnungen, Angebote und Belege im Browser zu erstellen',
    },
    method: {
      en: 'Document totals are calculated from the fields, items, discounts and taxes you enter.',
      'pt-br': 'Os totais do documento são calculados a partir dos campos, itens, descontos e impostos informados.',
      es: 'Los totales se calculan con campos, ítems, descuentos e impuestos ingresados.',
      fr: 'Les totaux sont calculés depuis les champs, lignes, remises et taxes saisis.',
      de: 'Dokumentsummen werden aus Feldern, Positionen, Rabatten und Steuern berechnet.',
    },
    review: {
      en: 'Review client data, item descriptions, currency, taxes and numbering before downloading the PDF.',
      'pt-br': 'Revise cliente, descrição dos itens, moeda, impostos e numeração antes de baixar o PDF.',
      es: 'Revisa cliente, descripciones, moneda, impuestos y numeración antes de descargar el PDF.',
      fr: 'Vérifiez client, descriptions, devise, taxes et numérotation avant de télécharger le PDF.',
      de: 'Prüfen Sie Kunde, Positionen, Währung, Steuern und Nummerierung vor dem PDF-Download.',
    },
    privacy: {
      en: 'The basic document flow is designed for browser-side editing and download.',
      'pt-br': 'O fluxo básico foi pensado para edição e download no navegador.',
      es: 'El flujo básico está pensado para editar y descargar en el navegador.',
      fr: 'Le flux de base est prévu pour édition et téléchargement dans le navigateur.',
      de: 'Der Basisablauf ist für Bearbeitung und Download im Browser gedacht.',
    },
    limits: {
      en: 'InvoiceCraft does not validate tax compliance, payment status or legal numbering rules.',
      'pt-br': 'InvoiceCraft não valida conformidade fiscal, status de pagamento nem regras legais de numeração.',
      es: 'InvoiceCraft no valida cumplimiento fiscal, estado de pago ni reglas legales de numeración.',
      fr: 'InvoiceCraft ne valide pas conformité fiscale, statut de paiement ni règles légales de numérotation.',
      de: 'InvoiceCraft prüft keine Steuerkonformität, Zahlungsstatus oder rechtliche Nummerierungsregeln.',
    },
  },
  MailHealth: {
    action: {
      en: 'check SPF, DKIM, DMARC, MX records, headers and basic email deliverability signals',
      'pt-br': 'verificar SPF, DKIM, DMARC, MX, cabeçalhos e sinais básicos de entregabilidade',
      es: 'verificar SPF, DKIM, DMARC, MX, headers y señales básicas de entregabilidad',
      fr: 'vérifier SPF, DKIM, DMARC, MX, en-têtes et signaux de délivrabilité de base',
      de: 'SPF, DKIM, DMARC, MX, Header und Basis-Signale der Zustellbarkeit zu prüfen',
    },
    method: {
      en: 'Email checks read the provided domain, record or header and return a point-in-time interpretation.',
      'pt-br': 'Os checks leem domínio, registro ou cabeçalho informado e retornam uma interpretação pontual.',
      es: 'Los checks leen dominio, registro o header y devuelven una interpretación puntual.',
      fr: 'Les contrôles lisent domaine, enregistrement ou en-tête et renvoient une interprétation ponctuelle.',
      de: 'E-Mail-Prüfungen lesen Domain, Record oder Header und liefern eine Momentinterpretation.',
    },
    review: {
      en: 'Compare status, warnings and suggested records before changing DNS for email.',
      'pt-br': 'Compare status, avisos e registros sugeridos antes de mudar DNS de e-mail.',
      es: 'Compara estado, avisos y registros sugeridos antes de cambiar DNS de email.',
      fr: 'Comparez statut, avertissements et enregistrements suggérés avant de modifier le DNS email.',
      de: 'Vergleichen Sie Status, Hinweise und vorgeschlagene Records vor DNS-Änderungen für E-Mail.',
    },
    privacy: {
      en: 'Header analysis can stay local, while DNS checks need the domain or record being tested.',
      'pt-br': 'A análise de cabeçalhos pode ficar local, enquanto consultas DNS precisam do domínio ou registro testado.',
      es: 'El análisis de headers puede quedar local; las consultas DNS necesitan el dominio o registro probado.',
      fr: 'L analyse des en-têtes peut rester locale; les contrôles DNS nécessitent domaine ou enregistrement.',
      de: 'Headeranalyse kann lokal bleiben; DNS-Prüfungen benötigen Domain oder Record.',
    },
    limits: {
      en: 'Deliverability depends on sending behavior, reputation and providers, not only DNS records.',
      'pt-br': 'Entregabilidade depende de comportamento de envio, reputação e provedores, não só de DNS.',
      es: 'La entregabilidad depende de envío, reputación y proveedores, no solo de DNS.',
      fr: 'La délivrabilité dépend des envois, de la réputation et des fournisseurs, pas seulement du DNS.',
      de: 'Zustellbarkeit hängt von Versandverhalten, Reputation und Anbietern ab, nicht nur von DNS.',
    },
  },
  'SitePulse Lab': {
    action: {
      en: 'check whether a site is up, inspect HTTP status, redirects, headers, SSL and basic performance signals',
      'pt-br': 'verificar se um site está no ar e inspecionar HTTP, redirecionamentos, cabeçalhos, SSL e sinais básicos de performance',
      es: 'verificar si un sitio está online e inspeccionar HTTP, redirecciones, headers, SSL y señales básicas de rendimiento',
      fr: 'vérifier si un site répond et inspecter HTTP, redirections, en-têtes, SSL et signaux de performance',
      de: 'zu prüfen, ob eine Website erreichbar ist, sowie HTTP, Redirects, Header, SSL und Basis-Performance zu untersuchen',
    },
    method: {
      en: 'Site checks make bounded requests and summarize the current response.',
      'pt-br': 'Os checks fazem requisições controladas e resumem a resposta atual.',
      es: 'Los checks hacen solicitudes controladas y resumen la respuesta actual.',
      fr: 'Les contrôles font des requêtes limitées et résument la réponse actuelle.',
      de: 'Siteprüfungen senden begrenzte Anfragen und fassen die aktuelle Antwort zusammen.',
    },
    review: {
      en: 'Check status code, redirect target, certificate dates and recommendations before acting.',
      'pt-br': 'Confira código de status, destino do redirecionamento, datas do certificado e recomendações antes de agir.',
      es: 'Revisa código, destino de redirección, fechas del certificado y recomendaciones antes de actuar.',
      fr: 'Vérifiez code statut, cible de redirection, dates du certificat et recommandations avant action.',
      de: 'Prüfen Sie Statuscode, Redirectziel, Zertifikatsdaten und Empfehlungen vor Maßnahmen.',
    },
    privacy: {
      en: 'The check needs the URL you choose to test and does not require an account for the basic answer.',
      'pt-br': 'O check precisa da URL escolhida e não exige conta para a resposta básica.',
      es: 'El check necesita la URL elegida y no requiere cuenta para la respuesta básica.',
      fr: 'Le contrôle nécessite l URL choisie et pas de compte pour la réponse de base.',
      de: 'Die Prüfung benötigt die gewählte URL und kein Konto für die Basisantwort.',
    },
    limits: {
      en: 'A single check can miss regional outages, intermittent errors or authenticated user paths.',
      'pt-br': 'Um check pontual pode não detectar quedas regionais, erros intermitentes ou caminhos autenticados.',
      es: 'Un check puntual puede no detectar caídas regionales, errores intermitentes o rutas autenticadas.',
      fr: 'Un contrôle ponctuel peut manquer pannes régionales, erreurs intermittentes ou parcours authentifiés.',
      de: 'Eine Einzelprüfung kann regionale Ausfälle, sporadische Fehler oder Loginpfade übersehen.',
    },
  },
  PixelBatch: {
    action: {
      en: 'compress, resize, crop, convert and prepare images for common web and commerce uses',
      'pt-br': 'comprimir, redimensionar, cortar, converter e preparar imagens para web e comércio',
      es: 'comprimir, redimensionar, recortar, convertir y preparar imágenes para web y comercio',
      fr: 'compresser, redimensionner, recadrer, convertir et préparer des images pour le web et le commerce',
      de: 'Bilder für Web und Handel zu komprimieren, zu skalieren, zuzuschneiden, zu konvertieren und vorzubereiten',
    },
    method: {
      en: 'Image tools process selected files and show size, format or preview changes before download.',
      'pt-br': 'As ferramentas processam arquivos selecionados e mostram tamanho, formato ou prévia antes do download.',
      es: 'Las herramientas procesan archivos seleccionados y muestran tamaño, formato o vista previa antes de descargar.',
      fr: 'Les outils traitent les fichiers choisis et montrent taille, format ou aperçu avant téléchargement.',
      de: 'Bildtools verarbeiten gewählte Dateien und zeigen Größe, Format oder Vorschau vor dem Download.',
    },
    review: {
      en: 'Compare preview quality, dimensions, format and final file size before replacing original images.',
      'pt-br': 'Compare qualidade da prévia, dimensões, formato e tamanho final antes de substituir imagens originais.',
      es: 'Compara calidad de vista previa, dimensiones, formato y tamaño final antes de reemplazar originales.',
      fr: 'Comparez qualité, dimensions, format et taille finale avant de remplacer les originaux.',
      de: 'Vergleichen Sie Vorschauqualität, Maße, Format und Endgröße vor dem Ersetzen von Originalen.',
    },
    privacy: {
      en: 'Browser-side processing is preferred for the basic image workflow.',
      'pt-br': 'O processamento no navegador é preferido para o fluxo básico de imagem.',
      es: 'Se prefiere procesamiento en el navegador para el flujo básico de imagen.',
      fr: 'Le traitement dans le navigateur est privilégié pour le flux image de base.',
      de: 'Browserseitige Verarbeitung wird für den Basis-Bildablauf bevorzugt.',
    },
    limits: {
      en: 'Very large files, batches and advanced AI edits can require more memory or a different workflow.',
      'pt-br': 'Arquivos muito grandes, lotes e edições avançadas com IA podem exigir mais memória ou outro fluxo.',
      es: 'Archivos grandes, lotes y ediciones avanzadas con IA pueden requerir más memoria u otro flujo.',
      fr: 'Gros fichiers, lots et éditions IA avancées peuvent demander plus de mémoire ou un autre flux.',
      de: 'Sehr große Dateien, Stapel und KI-Bearbeitung können mehr Speicher oder andere Abläufe erfordern.',
    },
  },
  DocShift: {
    action: {
      en: 'merge, split, rotate, convert and prepare PDF documents',
      'pt-br': 'unir, dividir, girar, converter e preparar documentos PDF',
      es: 'unir, dividir, girar, convertir y preparar documentos PDF',
      fr: 'fusionner, diviser, pivoter, convertir et préparer des documents PDF',
      de: 'PDF-Dokumente zusammenzuführen, zu teilen, zu drehen, zu konvertieren und vorzubereiten',
    },
    method: {
      en: 'Document tools use the selected files and show the output action before download.',
      'pt-br': 'As ferramentas usam os arquivos selecionados e mostram a ação de saída antes do download.',
      es: 'Las herramientas usan archivos seleccionados y muestran la acción de salida antes de descargar.',
      fr: 'Les outils utilisent les fichiers choisis et affichent l action de sortie avant téléchargement.',
      de: 'Dokumenttools nutzen ausgewählte Dateien und zeigen die Ausgabeaktion vor dem Download.',
    },
    review: {
      en: 'Check page order, file names, orientation and document sensitivity before downloading or sharing.',
      'pt-br': 'Confira ordem das páginas, nomes, orientação e sensibilidade do documento antes de baixar ou compartilhar.',
      es: 'Revisa orden de páginas, nombres, orientación y sensibilidad antes de descargar o compartir.',
      fr: 'Vérifiez ordre des pages, noms, orientation et sensibilité avant téléchargement ou partage.',
      de: 'Prüfen Sie Seitenfolge, Namen, Ausrichtung und Sensibilität vor Download oder Teilen.',
    },
    privacy: {
      en: 'Browser-side handling is preferred when it can complete the basic document task.',
      'pt-br': 'O tratamento no navegador é preferido quando consegue concluir a tarefa básica do documento.',
      es: 'Se prefiere manejo en el navegador cuando completa la tarea básica del documento.',
      fr: 'Le traitement dans le navigateur est privilégié quand il suffit à la tâche de base.',
      de: 'Browserseitige Verarbeitung wird bevorzugt, wenn sie die Basisaufgabe erledigt.',
    },
    limits: {
      en: 'Encrypted, very large or damaged PDFs can need specialist software or manual review.',
      'pt-br': 'PDFs criptografados, muito grandes ou danificados podem exigir software especializado ou revisão manual.',
      es: 'PDF cifrados, muy grandes o dañados pueden requerir software especializado o revisión manual.',
      fr: 'PDF chiffrés, très volumineux ou endommagés peuvent nécessiter logiciel spécialisé ou revue manuelle.',
      de: 'Verschlüsselte, sehr große oder beschädigte PDFs können Spezialsoftware oder manuelle Prüfung erfordern.',
    },
  },
}

function trustText(text: LocalizedTrustText, locale: LocaleCode): string {
  return text[locale]
}

function getTrustProductCopy(siteName: string): TrustProductCopy {
  return trustProductCopies[siteName] ?? genericTrustProductCopy
}

function localizedTrustDescription(locale: LocaleCode, slug: TrustPageSlug, siteName: string): string {
  const action = trustText(getTrustProductCopy(siteName).action, locale)
  const descriptions: Record<LocaleCode, Record<TrustPageSlug, string>> = {
    en: {
      about: `${siteName} helps you ${action}, with the basic workflow available without mandatory signup.`,
      contact: `How to send feedback, corrections, privacy requests or accessibility notes for ${siteName}.`,
      privacy: `How ${siteName} handles inputs, local processing, diagnostics and consent in the free workflow.`,
      cookies: `How ${siteName} uses essential storage, preferences and consent choices.`,
      terms: `Rules for using ${siteName} responsibly and understanding the limits of free results.`,
      methodology: `How ${siteName} produces results, what to verify and where the practical limits are.`,
      'editorial-policy': `How ${siteName} keeps tool guidance useful, localized and correctable.`,
      status: `Availability information and troubleshooting steps for ${siteName}.`,
    },
    'pt-br': {
      about: `${siteName} ajuda você a ${action}, com fluxo básico disponível sem cadastro obrigatório.`,
      contact: `Como enviar feedback, correções, pedidos de privacidade ou notas de acessibilidade para ${siteName}.`,
      privacy: `Como ${siteName} lida com entradas, processamento local, diagnósticos e consentimento no fluxo gratuito.`,
      cookies: `Como ${siteName} usa armazenamento essencial, preferências e escolhas de consentimento.`,
      terms: `Regras para usar ${siteName} com responsabilidade e entender limites dos resultados gratuitos.`,
      methodology: `Como ${siteName} produz resultados, o que conferir e onde ficam os limites práticos.`,
      'editorial-policy': `Como ${siteName} mantém orientações úteis, localizadas e corrigíveis.`,
      status: `Informações de disponibilidade e passos de verificação para ${siteName}.`,
    },
    es: {
      about: `${siteName} te ayuda a ${action}, con flujo básico disponible sin registro obligatorio.`,
      contact: `Cómo enviar feedback, correcciones, solicitudes de privacidad o notas de accesibilidad para ${siteName}.`,
      privacy: `Cómo ${siteName} maneja entradas, procesamiento local, diagnósticos y consentimiento en el flujo gratis.`,
      cookies: `Cómo ${siteName} usa almacenamiento esencial, preferencias y opciones de consentimiento.`,
      terms: `Reglas para usar ${siteName} de forma responsable y entender los límites de resultados gratis.`,
      methodology: `Cómo ${siteName} produce resultados, qué revisar y dónde están los límites prácticos.`,
      'editorial-policy': `Cómo ${siteName} mantiene guías útiles, localizadas y corregibles.`,
      status: `Información de disponibilidad y pasos de verificación para ${siteName}.`,
    },
    fr: {
      about: `${siteName} vous aide à ${action}, avec un flux de base disponible sans compte obligatoire.`,
      contact: `Comment envoyer retours, corrections, demandes de confidentialité ou notes accessibilité pour ${siteName}.`,
      privacy: `Comment ${siteName} gère saisies, traitement local, diagnostics et consentement dans le flux gratuit.`,
      cookies: `Comment ${siteName} utilise stockage essentiel, préférences et choix de consentement.`,
      terms: `Règles pour utiliser ${siteName} de façon responsable et comprendre les limites des résultats gratuits.`,
      methodology: `Comment ${siteName} produit les résultats, quoi vérifier et où se trouvent les limites pratiques.`,
      'editorial-policy': `Comment ${siteName} garde les guides utiles, localisés et corrigibles.`,
      status: `Informations de disponibilité et étapes de vérification pour ${siteName}.`,
    },
    de: {
      about: `${siteName} hilft dabei, ${action}. Der Basisablauf ist ohne Pflichtkonto verfügbar.`,
      contact: `So senden Sie Feedback, Korrekturen, Datenschutzanfragen oder Hinweise zur Barrierefreiheit für ${siteName}.`,
      privacy: `Wie ${siteName} Eingaben, lokale Verarbeitung, Diagnosen und Einwilligung im kostenlosen Ablauf behandelt.`,
      cookies: `Wie ${siteName} essenziellen Speicher, Präferenzen und Einwilligungsoptionen nutzt.`,
      terms: `Regeln für die verantwortliche Nutzung von ${siteName} und die Grenzen kostenloser Ergebnisse.`,
      methodology: `Wie ${siteName} Ergebnisse erzeugt, was zu prüfen ist und wo praktische Grenzen liegen.`,
      'editorial-policy': `Wie ${siteName} Tool-Hinweise nützlich, lokalisiert und korrigierbar hält.`,
      status: `Verfügbarkeitsinformationen und Prüfschritte für ${siteName}.`,
    },
  }

  return descriptions[locale][slug]
}

function localizedTrustSections(locale: LocaleCode, slug: TrustPageSlug, profile: TrustSupportProfile): TrustContentSection[] {
  const { siteName } = profile
  const product = getTrustProductCopy(siteName)
  const action = trustText(product.action, locale)
  const method = trustText(product.method, locale)
  const review = trustText(product.review, locale)
  const privacy = trustText(product.privacy, locale)
  const limits = trustText(product.limits, locale)

  if (locale === 'pt-br') {
    const sections: Record<TrustPageSlug, TrustContentSection[]> = {
      about: [
        trustSection('O que você pode fazer', `${siteName} ajuda você a ${action}. Comece pela ferramenta principal ou escolha uma tarefa relacionada; o resultado básico continua disponível sem cadastro obrigatório.`),
        trustSection('Como funciona', method),
        trustSection('Privacidade e limites', privacy, limits),
      ],
      contact: [
        trustSection('O que enviar', 'Inclua URL, idioma, ferramenta, comportamento observado, resultado esperado e contexto do navegador. Não envie senhas, documentos confidenciais, dados bancários, chaves de API ou dados pessoais sensíveis.'),
        trustSection('Correções prioritárias', 'Privacidade, segurança, acessibilidade, tradução incorreta, link quebrado e resultado enganoso têm prioridade sobre pedidos comerciais.'),
        trustSection('Como descrever o problema', 'Explique o passo a passo, copie mensagens de erro quando existirem e diga se o problema acontece em desktop, celular ou ambos.'),
      ],
      privacy: [
        trustSection('Dados usados pela ferramenta', privacy),
        trustSection('Entradas e resultados', 'Evite inserir dados sensíveis quando uma tarefa puder ser testada com exemplo ou valor fictício. Resultados devem ser conferidos antes de uso externo.'),
        trustSection('Consentimento e preferências', 'Preferências de idioma, consentimento e segurança de sessão podem usar armazenamento essencial; escolhas não essenciais devem ficar sob controle do usuário.'),
      ],
      cookies: [
        trustSection('Armazenamento essencial', 'Idioma, consentimento e segurança de sessão podem usar armazenamento local ou cookies necessários quando isso ajuda a manter a navegação.'),
        trustSection('Preferências', 'Preferências de interface podem ser lembradas para evitar que você configure a mesma opção a cada visita.'),
        trustSection('Controle do usuário', 'Quando houver escolhas de consentimento, elas devem ser fáceis de revisar e alterar.'),
      ],
      terms: [
        trustSection('Uso responsável', `Use ${siteName} como ferramenta informativa. Não use para fraude, abuso, phishing, malware, spam, violação de privacidade ou decisões críticas sem validação própria.`),
        trustSection('Resultado gratuito', 'O fluxo básico deve resolver a tarefa principal sem cadastro obrigatório, mas não substitui revisão profissional quando o tema exigir.'),
        trustSection('Limites do resultado', limits),
      ],
      methodology: [
        trustSection('Como os resultados são gerados', method),
        trustSection('O que conferir', review),
        trustSection('Limites importantes', limits),
      ],
      'editorial-policy': [
        trustSection('Conteúdo útil', 'Cada página deve ajudar o usuário a concluir uma tarefa real, entender o resultado e encontrar próximos passos sem depender de linguagem interna.'),
        trustSection('Correções', 'Correções de conteúdo, privacidade, acessibilidade ou tradução podem ser enviadas pelo contato com URL, idioma e resultado esperado.'),
        trustSection('Localização', 'Páginas localizadas devem preservar sentido, limites, exemplos e avisos de segurança no idioma da rota.'),
      ],
      status: [
        trustSection('Disponibilidade para visitantes', `${siteName} deve abrir suas ferramentas gratuitas e páginas de ajuda nos idiomas disponíveis. Se uma rota falhar, tente atualizar e envie a URL pelo contato.`),
        trustSection('Quando repetir o teste', 'Resultados de rede, site, documento, imagem, tempo ou cálculo podem mudar conforme entrada, horário, cache, navegador ou arquivo usado.'),
        trustSection('Limites importantes', limits),
      ],
    }

    return sections[slug]
  }

  if (locale === 'es') {
    const sections: Record<TrustPageSlug, TrustContentSection[]> = {
      about: [
        trustSection('Qué puedes hacer', `${siteName} te ayuda a ${action}. Empieza por la herramienta principal o elige una tarea relacionada; el resultado básico sigue disponible sin registro obligatorio.`),
        trustSection('Cómo funciona', method),
        trustSection('Privacidad y límites', privacy, limits),
      ],
      contact: [
        trustSection('Qué enviar', 'Incluye URL, idioma, herramienta, comportamiento observado, resultado esperado y navegador. No envíes contraseñas, documentos confidenciales, datos bancarios, claves API o datos personales sensibles.'),
        trustSection('Correcciones prioritarias', 'Privacidad, seguridad, accesibilidad, mala traducción, enlace roto y resultado engañoso tienen prioridad sobre solicitudes comerciales.'),
        trustSection('Cómo describir el problema', 'Explica los pasos, copia mensajes de error si existen y di si ocurre en escritorio, móvil o ambos.'),
      ],
      privacy: [
        trustSection('Datos usados por la herramienta', privacy),
        trustSection('Entradas y resultados', 'Evita ingresar datos sensibles cuando puedas probar con un ejemplo o valor ficticio. Revisa los resultados antes de usarlos fuera del sitio.'),
        trustSection('Consentimiento y preferencias', 'Idioma, consentimiento y seguridad de sesión pueden usar almacenamiento esencial; las opciones no esenciales deben quedar bajo control del usuario.'),
      ],
      cookies: [
        trustSection('Almacenamiento esencial', 'Idioma, consentimiento y seguridad de sesión pueden usar almacenamiento local o cookies necesarias cuando ayudan a mantener la navegación.'),
        trustSection('Preferencias', 'Las preferencias de interfaz pueden recordarse para evitar configurar la misma opción en cada visita.'),
        trustSection('Control del usuario', 'Cuando haya opciones de consentimiento, deben ser fáciles de revisar y cambiar.'),
      ],
      terms: [
        trustSection('Uso responsable', `Usa ${siteName} como herramienta informativa. No la uses para fraude, abuso, phishing, malware, spam, violación de privacidad o decisiones críticas sin validación propia.`),
        trustSection('Resultado gratis', 'El flujo básico debe resolver la tarea principal sin registro obligatorio, pero no reemplaza revisión profesional cuando el tema lo exige.'),
        trustSection('Límites del resultado', limits),
      ],
      methodology: [
        trustSection('Cómo se generan los resultados', method),
        trustSection('Qué revisar', review),
        trustSection('Límites importantes', limits),
      ],
      'editorial-policy': [
        trustSection('Contenido útil', 'Cada página debe ayudar a completar una tarea real, entender el resultado y encontrar próximos pasos sin lenguaje interno.'),
        trustSection('Correcciones', 'Las correcciones de contenido, privacidad, accesibilidad o traducción pueden enviarse por contacto con URL, idioma y resultado esperado.'),
        trustSection('Localización', 'Las páginas localizadas deben preservar sentido, límites, ejemplos y avisos de seguridad en el idioma de la ruta.'),
      ],
      status: [
        trustSection('Disponibilidad para visitantes', `${siteName} debe abrir sus herramientas gratis y páginas de ayuda en los idiomas disponibles. Si una ruta falla, actualiza y envía la URL por contacto.`),
        trustSection('Cuándo repetir el test', 'Resultados de red, sitio, documento, imagen, tiempo o cálculo pueden cambiar según entrada, hora, caché, navegador o archivo usado.'),
        trustSection('Límites importantes', limits),
      ],
    }

    return sections[slug]
  }

  if (locale === 'fr') {
    const sections: Record<TrustPageSlug, TrustContentSection[]> = {
      about: [
        trustSection('Ce que vous pouvez faire', `${siteName} vous aide à ${action}. Commencez par l outil principal ou choisissez une tâche liée; le résultat de base reste disponible sans compte obligatoire.`),
        trustSection('Fonctionnement', method),
        trustSection('Confidentialité et limites', privacy, limits),
      ],
      contact: [
        trustSection('Quoi envoyer', 'Indiquez URL, langue, outil, comportement observé, résultat attendu et navigateur. N envoyez pas mots de passe, documents confidentiels, données bancaires, clés API ou données personnelles sensibles.'),
        trustSection('Corrections prioritaires', 'Confidentialité, sécurité, accessibilité, mauvaise traduction, lien cassé et résultat trompeur priment sur les demandes commerciales.'),
        trustSection('Décrire le problème', 'Expliquez les étapes, copiez les messages d erreur si présents et dites si le problème apparaît sur ordinateur, mobile ou les deux.'),
      ],
      privacy: [
        trustSection('Données utilisées par l outil', privacy),
        trustSection('Saisies et résultats', 'Évitez les données sensibles quand un exemple ou une valeur fictive suffit. Vérifiez les résultats avant usage externe.'),
        trustSection('Consentement et préférences', 'Langue, consentement et sécurité de session peuvent utiliser un stockage essentiel; les choix non essentiels doivent rester sous contrôle utilisateur.'),
      ],
      cookies: [
        trustSection('Stockage essentiel', 'Langue, consentement et sécurité de session peuvent utiliser stockage local ou cookies nécessaires quand cela aide la navigation.'),
        trustSection('Préférences', 'Les préférences interface peuvent être mémorisées pour éviter de répéter la même configuration.'),
        trustSection('Contrôle utilisateur', 'Quand des choix de consentement existent, ils doivent être faciles à revoir et modifier.'),
      ],
      terms: [
        trustSection('Usage responsable', `Utilisez ${siteName} comme outil informatif. Ne l utilisez pas pour fraude, abus, phishing, malware, spam, atteinte à la vie privée ou décisions critiques sans validation propre.`),
        trustSection('Résultat gratuit', 'Le flux de base doit résoudre la tâche principale sans compte obligatoire, mais ne remplace pas une revue professionnelle quand le sujet l exige.'),
        trustSection('Limites du résultat', limits),
      ],
      methodology: [
        trustSection('Comment les résultats sont générés', method),
        trustSection('Quoi vérifier', review),
        trustSection('Limites importantes', limits),
      ],
      'editorial-policy': [
        trustSection('Contenu utile', 'Chaque page doit aider à accomplir une tâche réelle, comprendre le résultat et trouver les prochaines étapes sans langage interne.'),
        trustSection('Corrections', 'Les corrections de contenu, confidentialité, accessibilité ou traduction peuvent être envoyées par contact avec URL, langue et résultat attendu.'),
        trustSection('Localisation', 'Les pages localisées doivent préserver sens, limites, exemples et avertissements de sécurité dans la langue de la route.'),
      ],
      status: [
        trustSection('Disponibilité pour visiteurs', `${siteName} doit ouvrir ses outils gratuits et pages aide dans les langues disponibles. Si une route échoue, actualisez et envoyez l URL via contact.`),
        trustSection('Quand refaire le test', 'Les résultats réseau, site, document, image, temps ou calcul peuvent changer selon saisie, heure, cache, navigateur ou fichier utilisé.'),
        trustSection('Limites importantes', limits),
      ],
    }

    return sections[slug]
  }

  if (locale === 'de') {
    const sections: Record<TrustPageSlug, TrustContentSection[]> = {
      about: [
        trustSection('Was Sie tun können', `${siteName} hilft dabei, ${action}. Starten Sie mit dem Haupttool oder wählen Sie eine verwandte Aufgabe; das Basisergebnis bleibt ohne Pflichtkonto verfügbar.`),
        trustSection('So funktioniert es', method),
        trustSection('Datenschutz und Grenzen', privacy, limits),
      ],
      contact: [
        trustSection('Was senden', 'Senden Sie URL, Sprache, Tool, beobachtetes Verhalten, erwartetes Ergebnis und Browser. Senden Sie keine Passwörter, vertraulichen Dokumente, Bankdaten, API-Schlüssel oder sensiblen personenbezogenen Daten.'),
        trustSection('Priorisierte Korrekturen', 'Datenschutz, Sicherheit, Barrierefreiheit, falsche Übersetzung, defekter Link und irreführendes Ergebnis haben Vorrang vor kommerziellen Anfragen.'),
        trustSection('Problem beschreiben', 'Beschreiben Sie die Schritte, kopieren Sie Fehlermeldungen und sagen Sie, ob es auf Desktop, Mobilgerät oder beiden passiert.'),
      ],
      privacy: [
        trustSection('Vom Tool genutzte Daten', privacy),
        trustSection('Eingaben und Ergebnisse', 'Vermeiden Sie sensible Daten, wenn ein Beispiel oder Testwert reicht. Prüfen Sie Ergebnisse vor externer Nutzung.'),
        trustSection('Einwilligung und Präferenzen', 'Sprache, Einwilligung und Sitzungssicherheit können essenziellen Speicher nutzen; nicht essenzielle Optionen bleiben unter Nutzerkontrolle.'),
      ],
      cookies: [
        trustSection('Essentieller Speicher', 'Sprache, Einwilligung und Sitzungssicherheit können lokalen Speicher oder notwendige Cookies nutzen, wenn dies die Navigation unterstützt.'),
        trustSection('Präferenzen', 'Oberflächenpräferenzen können gespeichert werden, damit dieselbe Option nicht bei jedem Besuch neu gesetzt werden muss.'),
        trustSection('Nutzerkontrolle', 'Wenn Einwilligungsoptionen vorhanden sind, müssen sie leicht prüfbar und änderbar sein.'),
      ],
      terms: [
        trustSection('Verantwortliche Nutzung', `Nutzen Sie ${siteName} als informatives Tool. Nicht für Betrug, Missbrauch, Phishing, Malware, Spam, Datenschutzverletzung oder kritische Entscheidungen ohne eigene Prüfung nutzen.`),
        trustSection('Kostenloses Ergebnis', 'Der Basisablauf soll die Hauptaufgabe ohne Pflichtkonto lösen, ersetzt aber keine fachliche Prüfung, wenn das Thema sie verlangt.'),
        trustSection('Grenzen des Ergebnisses', limits),
      ],
      methodology: [
        trustSection('Wie Ergebnisse entstehen', method),
        trustSection('Was zu prüfen ist', review),
        trustSection('Wichtige Grenzen', limits),
      ],
      'editorial-policy': [
        trustSection('Nützlicher Inhalt', 'Jede Seite soll bei einer echten Aufgabe helfen, Ergebnisse erklären und nächste Schritte zeigen, ohne interne Sprache zu nutzen.'),
        trustSection('Korrekturen', 'Korrekturen zu Inhalt, Datenschutz, Barrierefreiheit oder Übersetzung können mit URL, Sprache und erwartetem Ergebnis gesendet werden.'),
        trustSection('Lokalisierung', 'Lokalisierte Seiten müssen Sinn, Grenzen, Beispiele und Sicherheitshinweise in der Routensprache bewahren.'),
      ],
      status: [
        trustSection('Verfügbarkeit für Besucher', `${siteName} soll kostenlose Tools und Hilfeseiten in den verfügbaren Sprachen öffnen. Wenn eine Route fehlschlägt, laden Sie neu und senden Sie die URL über Kontakt.`),
        trustSection('Wann erneut testen', 'Ergebnisse zu Netzwerk, Site, Dokument, Bild, Zeit oder Berechnung können sich je nach Eingabe, Uhrzeit, Cache, Browser oder Datei ändern.'),
        trustSection('Wichtige Grenzen', limits),
      ],
    }

    return sections[slug]
  }

  const sections: Record<TrustPageSlug, TrustContentSection[]> = {
    about: [
      trustSection('What you can do', `${siteName} helps you ${action}. Start from the main tool or choose a related task; the basic result stays available without mandatory signup.`),
      trustSection('How it works', method),
      trustSection('Privacy and limits', privacy, limits),
    ],
    contact: [
      trustSection('What to send', 'Include URL, language, tool name, observed behavior, expected result and browser context. Do not send passwords, confidential documents, bank data, API keys or sensitive personal data.'),
      trustSection('Priority corrections', 'Privacy, security, accessibility, translation errors, broken links and misleading results take priority over commercial requests.'),
      trustSection('Describe the issue', 'Share the steps, copy any error message and mention whether it happens on desktop, mobile or both.'),
    ],
    privacy: [
      trustSection('Data used by the tool', privacy),
      trustSection('Inputs and results', 'Avoid entering sensitive data when a sample or placeholder value can test the task. Review results before using them elsewhere.'),
      trustSection('Consent and preferences', 'Language, consent and session security may use essential storage; non-essential choices should stay under user control.'),
    ],
    cookies: [
      trustSection('Essential storage', 'Language, consent and session security may use local storage or necessary cookies when they help keep navigation usable.'),
      trustSection('Preferences', 'Interface preferences can be remembered so you do not need to set the same option on every visit.'),
      trustSection('User control', 'When consent choices exist, they should be easy to review and change.'),
    ],
    terms: [
      trustSection('Responsible use', `Use ${siteName} as an informational tool. Do not use it for fraud, abuse, phishing, malware, spam, privacy violations or critical decisions without your own validation.`),
      trustSection('Free result', 'The basic workflow should solve the main task without mandatory signup, but it does not replace professional review when the topic requires it.'),
      trustSection('Result limits', limits),
    ],
    methodology: [
      trustSection('How results are generated', method),
      trustSection('What to check', review),
      trustSection('Important limits', limits),
    ],
    'editorial-policy': [
      trustSection('Useful content', 'Each page should help visitors complete a real task, understand the result and find next steps without internal project language.'),
      trustSection('Corrections', 'Content, privacy, accessibility or translation corrections can be sent through contact with URL, language and expected result.'),
      trustSection('Localization', 'Localized pages should preserve meaning, limits, examples and safety notes in the route language.'),
    ],
    status: [
      trustSection('Availability for visitors', `${siteName} should open its free tools and help pages in the available languages. If a route fails, refresh and send the URL through contact.`),
      trustSection('When to repeat a check', 'Network, site, document, image, time or calculation results can change with the input, time, cache, browser or file used.'),
      trustSection('Important limits', limits),
    ],
  }

  return sections[slug]
}

export function buildTrustPageCopy<T extends TrustPageCopyShape>(
  locale: LocaleCode,
  slug: TrustPageSlug,
  baseCopy: T,
  profile: TrustSupportProfile,
): T {
  const trustSections = localizedTrustSections(locale, slug, profile)
  const localizedCopy = {
    ...baseCopy,
    navLabel: trustNavLabels[locale][slug],
    title: localizedTrustTitle(locale, slug, profile.siteName),
    description: localizedTrustDescription(locale, slug, profile.siteName),
    sections: trustSections,
  }

  return sanitizePublicCopy(locale, localizedCopy) as T
}

const internalTermReplacements: Record<LocaleCode, Array<[RegExp, string]>> = {
  en: [
    [/\bMVPs?\b/gu, 'free version'],
    [/\bWorkflow upgrade path\b/giu, 'Optional account features'],
    [/\bUpgrade path\b/giu, 'Optional account features'],
    [/\bAdvanced workflow review\b/giu, 'Optional account features'],
    [/\bAdvanced workflow boundary\b/giu, 'Optional account feature limits'],
    [/\bAdvanced [a-z ]+ workflows?\b/giu, 'Optional account features'],
    [/\bAdvanced workflows?\b/giu, 'Optional account features'],
    [/\bWorkflow is account value\b/giu, 'Account features are optional'],
    [/\bFuture workflow options\b/giu, 'Future account options'],
    [/\bWorkflow options\b/giu, 'Optional account features'],
    [/\bAccount workflows?\b/giu, 'Account features'],
    [/\baccount workflows?\b/giu, 'account features'],
    [/\bbilling review\b/giu, 'payment review'],
    [/\bbilling\b/giu, 'payment'],
    [/\bWorkflow snapshot\b/giu, 'Process steps'],
    [/\bBatch workflows?\b/giu, 'Batch options'],
    [/\bworkflow tabs\b/giu, 'task tabs'],
    [/\bWorkflow depth\b/giu, 'Optional account features'],
    [/\bowner workflow\b/giu, 'support queue'],
    [/\bworkbenches\b/giu, 'tool areas'],
    [/\bworkbench\b/giu, 'tool area'],
    [/\bworkspaces\b/giu, 'team areas'],
    [/\bworkspace\b/giu, 'team area'],
    [/\bweb worker\b/giu, 'browser processing'],
    [/\bbrowser-side worker\b/giu, 'browser processing'],
    [/\bbrowser worker\b/giu, 'browser processing'],
    [/\bworker\b/giu, 'processing'],
    [/\bworkflows\b/giu, 'features'],
    [/\bworkflow\b/giu, 'task'],
    [/\bbefore launch readiness\b/giu, 'before users rely on them'],
    [/\bbefore launch\b/giu, 'before public availability'],
    [/\bbefore activation\b/giu, 'before they are offered'],
    [/\bpublic channel gate\b/giu, 'public channel readiness'],
    [/\blocalization gate\b/giu, 'localization review'],
    [/\bAdSense review gates?\b/giu, 'AdSense review checks'],
    [/\bquality gates?\b/giu, 'quality checks'],
    [/\blaunch gates?\b/giu, 'launch checks'],
    [/\bgated\b/giu, 'planned'],
    [/\bgates?\b/giu, 'checks'],
    [/\bQuality gate\b/gu, 'Quality check'],
    [/deploy smoke/giu, 'public availability check'],
    [/rollback validation/giu, 'restore check'],
    [/\brelease recovery\b/giu, 'restore path'],
    [/\brollback\b/giu, 'restore'],
    [/placeholder/giu, 'preview'],
    [/HUMAN_ACTION_REQUIRED/gu, 'manual follow-up'],
    [/No ads active/gu, 'Advertising not active'],
    [/No file backend active/gu, 'No server upload backend active'],
    [/Monitoring gated/gu, 'Monitoring planned'],
    [/Commercial redirects gated/gu, 'Commercial redirects planned'],
  ],
  'pt-br': [
    [/\bMVPs?\b/gu, 'versão gratuita'],
    [/\bCaminho de upgrade workflow\b/giu, 'Opções com conta'],
    [/\bCaminho de upgrade\b/giu, 'Opções com conta'],
    [/\bRuta de upgrade\b/giu, 'Opções com conta'],
    [/\bUpgrade path\b/giu, 'Opções com conta'],
    [/\bAdvanced workflow review\b/giu, 'Recursos opcionais de conta'],
    [/\bAdvanced workflow boundary\b/giu, 'Limites de recursos opcionais de conta'],
    [/\bAdvanced [a-z ]+ workflows?\b/giu, 'Recursos opcionais de conta'],
    [/\bAdvanced workflows?\b/giu, 'Recursos opcionais de conta'],
    [/\bWorkflow is account value\b/giu, 'Recursos de conta são opcionais'],
    [/\bFuture workflow options\b/giu, 'Opções futuras de conta'],
    [/\bOpcoes futuras de workflow\b/giu, 'Opções futuras de conta'],
    [/\bOpções futuras de workflow\b/giu, 'Opções futuras de conta'],
    [/\bOpcoes de workflow\b/giu, 'Opções com conta'],
    [/\bOpções de workflow\b/giu, 'Opções com conta'],
    [/\bAccount workflows?\b/giu, 'Recursos de conta'],
    [/\baccount workflows?\b/giu, 'recursos de conta'],
    [/\bbilling\b/giu, 'cobrança'],
    [/\bWorkflow depth\b/giu, 'Recursos opcionais de conta'],
    [/\bResumo do workflow\b/giu, 'Resumo do processo'],
    [/\bWorkflow gratuito\b/giu, 'Resultado gratuito'],
    [/\bWorkflows documentais avancados\b/giu, 'Recursos documentais com conta'],
    [/\bWorkflows avancados de conta\b/giu, 'Recursos com conta'],
    [/\bWorkflow avancado no servidor\b/giu, 'Processamento opcional no servidor'],
    [/\bAbas de workflow\b/giu, 'Abas de tarefa'],
    [/\bAbas de workflow de imagem\b/giu, 'Abas de imagem'],
    [/\bWorkbench de PDF\b/giu, 'Ferramentas de PDF'],
    [/\bBancada de imagem\b/giu, 'Ferramentas de imagem'],
    [/\bworkbench\b/giu, 'área de ferramenta'],
    [/\bworkspaces\b/giu, 'áreas de equipe'],
    [/\bworkspace\b/giu, 'área de equipe'],
    [/\bWeb Worker\b/giu, 'processamento local'],
    [/\bworker do navegador\b/giu, 'processamento no navegador'],
    [/\bWorker\b/giu, 'Processamento'],
    [/\bworker\b/giu, 'processamento'],
    [/\bworkflows\b/giu, 'fluxos'],
    [/\bworkflow\b/giu, 'fluxo'],
    [/\bFluxos avan(?:c|ç)ados\b/giu, 'Recursos opcionais de conta'],
    [/\bfluxos avan(?:c|ç)ados\b/giu, 'recursos opcionais de conta'],
    [/\bfluxo do propriet(?:a|á)rio\b/giu, 'canal de suporte'],
    [/\bbefore launch readiness\b/giu, 'antes de usuários dependerem delas'],
    [/\bantes do lan(?:c|ç)amento\b/giu, 'antes da disponibilidade pública'],
    [/\bantes da ativa(?:c|ç)(?:a|ã)o\b/giu, 'antes de serem oferecidos'],
    [/\bgated\b/giu, 'planejados'],
    [/\bGate de lançamento\b/giu, 'Revisão de lançamento'],
    [/\bGate de localiza(?:c|ç)ao\b/giu, 'Revisão de localização'],
    [/\bgates?\b/giu, 'revisões'],
    [/\bbloqueados\b/giu, 'planejados'],
    [/\bbloqueado\b/giu, 'planejado'],
    [/\bbloqueadas\b/giu, 'planejadas'],
    [/\bbloqueada\b/giu, 'planejada'],
    [/\bGate de qualidade\b/gu, 'Revisão de qualidade'],
    [/deploy smoke/giu, 'verificação pública de disponibilidade'],
    [/rollback validation/giu, 'verificação de restauração'],
    [/\brelease recovery\b/giu, 'caminho de restauração'],
    [/\brollback\b/giu, 'restauração'],
    [/placeholder/giu, 'prévia'],
    [/HUMAN_ACTION_REQUIRED/gu, 'acompanhamento manual'],
    [/No ads active/gu, 'Anúncios não ativos'],
    [/No file backend active/gu, 'Sem backend de upload no servidor'],
    [/Monitoring gated/gu, 'Monitoramento planejado'],
    [/Commercial redirects gated/gu, 'Redirecionamentos comerciais planejados'],
  ],
  es: [
    [/\bMVPs?\b/gu, 'versión gratuita'],
    [/\bRuta de upgrade workflow\b/giu, 'Opciones de cuenta'],
    [/\bRuta de upgrade\b/giu, 'Opciones de cuenta'],
    [/\bUpgrade path\b/giu, 'Opciones de cuenta'],
    [/\bAdvanced workflow review\b/giu, 'Funciones opcionales de cuenta'],
    [/\bAdvanced workflow boundary\b/giu, 'Límites de funciones opcionales de cuenta'],
    [/\bAdvanced [a-z ]+ workflows?\b/giu, 'Funciones opcionales de cuenta'],
    [/\bAdvanced workflows?\b/giu, 'Funciones opcionales de cuenta'],
    [/\bWorkflow is account value\b/giu, 'Las funciones de cuenta son opcionales'],
    [/\bFuture workflow options\b/giu, 'Opciones futuras de cuenta'],
    [/\bOpciones futuras de workflow\b/giu, 'Opciones futuras de cuenta'],
    [/\bOpciones de workflow\b/giu, 'Opciones de cuenta'],
    [/\bAccount workflows?\b/giu, 'Funciones de cuenta'],
    [/\baccount workflows?\b/giu, 'funciones de cuenta'],
    [/\bbilling\b/giu, 'cobro'],
    [/\bWorkflow depth\b/giu, 'Funciones opcionales de cuenta'],
    [/\bResumen del workflow\b/giu, 'Resumen del proceso'],
    [/\bWorkflow gratis\b/giu, 'Resultado gratis'],
    [/\bWorkflows documentales avanzados\b/giu, 'Funciones documentales de cuenta'],
    [/\bWorkflows avanzados de cuenta\b/giu, 'Funciones de cuenta'],
    [/\bWorkflow avanzado en servidor\b/giu, 'Procesamiento opcional en servidor'],
    [/\bAbas de workflow\b/giu, 'Pestañas de tarea'],
    [/\bWorkbench PDF\b/giu, 'Herramientas PDF'],
    [/\bworkbench\b/giu, 'área de herramienta'],
    [/\bworkspaces\b/giu, 'espacios de equipo'],
    [/\bworkspace\b/giu, 'espacio de equipo'],
    [/\bWeb Worker\b/giu, 'procesamiento local'],
    [/\bbrowser worker\b/giu, 'procesamiento en navegador'],
    [/\bworker\b/giu, 'procesamiento'],
    [/\bworkflows\b/giu, 'flujos'],
    [/\bworkflow\b/giu, 'flujo'],
    [/\bFlujos avanzados\b/giu, 'Funciones opcionales de cuenta'],
    [/\bflujos avanzados\b/giu, 'funciones opcionales de cuenta'],
    [/\bflujo del propietario\b/giu, 'canal de soporte'],
    [/\bbefore launch readiness\b/giu, 'antes de que los usuarios dependan de ellas'],
    [/\bantes del lanzamiento\b/giu, 'antes de la disponibilidad pública'],
    [/\bantes de activarse\b/giu, 'antes de ofrecerse'],
    [/\bgated\b/giu, 'planificados'],
    [/\bGate de lanzamiento\b/giu, 'Revisión de lanzamiento'],
    [/\bGate de localizaci(?:o|ó)n\b/giu, 'Revisión de localización'],
    [/\bgates?\b/giu, 'revisiones'],
    [/\bbloqueados\b/giu, 'planificados'],
    [/\bbloqueado\b/giu, 'planificado'],
    [/\bbloqueadas\b/giu, 'planificadas'],
    [/\bbloqueada\b/giu, 'planificada'],
    [/\bGate de calidad\b/gu, 'Revisión de calidad'],
    [/deploy smoke/giu, 'verificación pública de disponibilidad'],
    [/rollback validation/giu, 'verificación de restauración'],
    [/\brelease recovery\b/giu, 'ruta de restauración'],
    [/\brollback\b/giu, 'restauración'],
    [/placeholder/giu, 'vista previa'],
    [/HUMAN_ACTION_REQUIRED/gu, 'seguimiento manual'],
    [/No ads active/gu, 'Anuncios no activos'],
    [/No file backend active/gu, 'Sin backend de subida en servidor'],
    [/Monitoring gated/gu, 'Monitoreo planificado'],
    [/Commercial redirects gated/gu, 'Redirecciones comerciales planificadas'],
  ],
  fr: [
    [/\bMVPs?\b/gu, 'version gratuite'],
    [/\bOffre payante\b/giu, 'Options de compte'],
    [/\bUpgrade path\b/giu, 'Options de compte'],
    [/\bAdvanced workflow review\b/giu, 'Fonctions optionnelles de compte'],
    [/\bAdvanced workflow boundary\b/giu, 'Limites des fonctions optionnelles de compte'],
    [/\bAdvanced [a-z ]+ workflows?\b/giu, 'Fonctions optionnelles de compte'],
    [/\bAdvanced workflows?\b/giu, 'Fonctions optionnelles de compte'],
    [/\bWorkflow is account value\b/giu, 'Les fonctions de compte sont optionnelles'],
    [/\bFuture workflow options\b/giu, 'Options futures de compte'],
    [/\bOptions futures de workflow\b/giu, 'Options futures de compte'],
    [/\bOptions de workflow\b/giu, 'Options de compte'],
    [/\bAccount workflows?\b/giu, 'Fonctions de compte'],
    [/\baccount workflows?\b/giu, 'fonctions de compte'],
    [/\bbilling\b/giu, 'paiement'],
    [/\bWorkflow depth\b/giu, 'Fonctions optionnelles de compte'],
    [/\bResume du workflow\b/giu, 'Resume du processus'],
    [/\bWorkflow gratuit\b/giu, 'Resultat gratuit'],
    [/\bWorkflows documentaires avances\b/giu, 'Fonctions documentaires de compte'],
    [/\bWorkflows avances de compte\b/giu, 'Fonctions de compte'],
    [/\bWorkflow avance serveur\b/giu, 'Traitement serveur optionnel'],
    [/\bWorkbench PDF\b/giu, 'Outils PDF'],
    [/\bworkbench\b/giu, 'zone outil'],
    [/\bworkspaces\b/giu, 'espaces equipe'],
    [/\bworkspace\b/giu, 'espace equipe'],
    [/\bWeb Worker\b/giu, 'traitement local'],
    [/\bbrowser worker\b/giu, 'traitement navigateur'],
    [/\bworker\b/giu, 'traitement'],
    [/\bworkflows\b/giu, 'flux'],
    [/\bworkflow\b/giu, 'flux'],
    [/\bFlux avances\b/giu, 'Fonctions optionnelles de compte'],
    [/\bflux avances\b/giu, 'fonctions optionnelles de compte'],
    [/\bflux propri(?:e|é)taire\b/giu, 'canal de support'],
    [/\bbefore launch readiness\b/giu, 'avant que les utilisateurs s y fient'],
    [/\bavant lancement\b/giu, 'avant disponibilité publique'],
    [/\bavant activation\b/giu, 'avant d etre proposées'],
    [/\bgated\b/giu, 'prévus'],
    [/\bGate de lancement\b/giu, 'Revue de lancement'],
    [/\bGate de localisation\b/giu, 'Revue de localisation'],
    [/\bGate localisation\b/giu, 'Revue de localisation'],
    [/\bgates\b/giu, 'revues'],
    [/\bgate\b/giu, 'prévu'],
    [/\bbloquees\b/giu, 'prévues'],
    [/\bbloquee\b/giu, 'prévue'],
    [/\bbloques\b/giu, 'prévus'],
    [/\bbloque\b/giu, 'prévu'],
    [/\bGate qualité\b/gu, 'Revue qualité'],
    [/deploy smoke/giu, 'vérification publique de disponibilité'],
    [/rollback validation/giu, 'vérification de restauration'],
    [/\brelease recovery\b/giu, 'chemin de restauration'],
    [/\brollback\b/giu, 'restauration'],
    [/placeholder/giu, 'aperçu'],
    [/HUMAN_ACTION_REQUIRED/gu, 'suivi manuel'],
    [/No ads active/gu, 'Publicités non actives'],
    [/No file backend active/gu, 'Aucun backend de téléversement serveur'],
    [/Monitoring gated/gu, 'Monitoring prévu'],
    [/Commercial redirects gated/gu, 'Redirections commerciales prévues'],
  ],
  de: [
    [/\bMVPs?\b/gu, 'kostenlose Version'],
    [/\bUpgrade-Pfad\b/giu, 'Kontofunktionen'],
    [/\bUpgrade path\b/giu, 'Kontofunktionen'],
    [/\bAdvanced workflow review\b/giu, 'Optionale Kontofunktionen'],
    [/\bAdvanced workflow boundary\b/giu, 'Grenzen optionaler Kontofunktionen'],
    [/\bAdvanced [a-z ]+ workflows?\b/giu, 'Optionale Kontofunktionen'],
    [/\bAdvanced workflows?\b/giu, 'Optionale Kontofunktionen'],
    [/\bWorkflow is account value\b/giu, 'Kontofunktionen sind optional'],
    [/\bFuture workflow options\b/giu, 'Zukünftige Kontooptionen'],
    [/\bKuenftige Workflow-Optionen\b/giu, 'Zukünftige Kontooptionen'],
    [/\bWorkflow-Optionen\b/giu, 'Optionale Kontofunktionen'],
    [/\bAccount workflows?\b/giu, 'Kontofunktionen'],
    [/\baccount workflows?\b/giu, 'Kontofunktionen'],
    [/\bBilling-Pruefung\b/giu, 'Zahlungspruefung'],
    [/\bBilling-Prüfung\b/giu, 'Zahlungspruefung'],
    [/\bBilling\b/giu, 'Zahlung'],
    [/\bWorkflow depth\b/giu, 'Optionale Kontofunktionen'],
    [/\bWorkflow-Tiefe\b/giu, 'Optionale Kontofunktionen'],
    [/\bKonto-Workflows\b/giu, 'Kontofunktionen'],
    [/\bKonto-Workflow\b/giu, 'Kontofunktion'],
    [/\bKontoworkflows\b/giu, 'Kontofunktionen'],
    [/\bKontoworkflow\b/giu, 'Kontofunktion'],
    [/\bErweiterte Konto-Workflows\b/giu, 'Kontofunktionen'],
    [/\bWorkflow-Snapshot\b/giu, 'Prozessschritte'],
    [/\bBildworkflow\b/giu, 'Bildaufgabe'],
    [/\bDokumentworkflow\b/giu, 'Dokumentaufgabe'],
    [/\bPDF-Workflows\b/giu, 'PDF-Aufgaben'],
    [/\bPDF-Workflow\b/giu, 'PDF-Aufgabe'],
    [/\bWorkbenches\b/giu, 'Toolbereiche'],
    [/\bWorkbench\b/giu, 'Toolbereich'],
    [/\bWorkflows\b/giu, 'Funktionen'],
    [/\bWorkflow\b/giu, 'Funktion'],
    [/\bworkspaces\b/giu, 'Team-Bereiche'],
    [/\bworkspace\b/giu, 'Team-Bereich'],
    [/\bWeb Worker\b/giu, 'lokale Verarbeitung'],
    [/\bBrowser-Worker\b/giu, 'Browser-Verarbeitung'],
    [/\bbrowser worker\b/giu, 'Browser-Verarbeitung'],
    [/\bworker\b/giu, 'Verarbeitung'],
    [/\bErweiterte Workflows\b/giu, 'Optionale Kontofunktionen'],
    [/\bBetreiber-Workflow\b/giu, 'Supportkanal'],
    [/\bbefore launch readiness\b/giu, 'bevor Nutzer sich darauf verlassen'],
    [/\bvor Launch\b/giu, 'vor öffentlicher Verfügbarkeit'],
    [/\bvor Aktivierung\b/giu, 'bevor sie angeboten werden'],
    [/\bgated\b/giu, 'geplant'],
    [/\bLaunch Gates?\b/giu, 'Launch-Prüfungen'],
    [/\bRollout-Gates?\b/giu, 'Rollout-Prüfungen'],
    [/\bQuality Gates?\b/giu, 'Qualitätsprüfungen'],
    [/\bGates?\b/giu, 'Prüfungen'],
    [/\bgesperrt\b/giu, 'geplant'],
    [/\bQuality Gate\b/gu, 'Qualitätsprüfung'],
    [/deploy smoke/giu, 'öffentliche Verfügbarkeitsprüfung'],
    [/rollback validation/giu, 'Wiederherstellungsprüfung'],
    [/\brelease recovery\b/giu, 'Wiederherstellungspfad'],
    [/\brollback\b/giu, 'Wiederherstellung'],
    [/placeholder/giu, 'Vorschau'],
    [/HUMAN_ACTION_REQUIRED/gu, 'manuelle Nachverfolgung'],
    [/No ads active/gu, 'Anzeigen nicht aktiv'],
    [/No file backend active/gu, 'Kein serverseitiges Upload-Backend'],
    [/Monitoring gated/gu, 'Monitoring geplant'],
    [/Commercial redirects gated/gu, 'Kommerzielle Redirects geplant'],
  ],
}

const localeAccentReplacements: Partial<Record<LocaleCode, Array<[RegExp, string]>>> = {
  'pt-br': [
    [/\bNao\b/g, 'Não'],
    [/\bnao\b/g, 'não'],
    [/\bSao\b/g, 'São'],
    [/\bsao\b/g, 'são'],
    [/\besta\b/g, 'está'],
    [/\bestao\b/g, 'estão'],
    [/\bha\b/g, 'há'],
    [/\butil\b/g, 'útil'],
    [/\buteis\b/g, 'úteis'],
    [/\bestatico\b/g, 'estático'],
    [/\bestaticos\b/g, 'estáticos'],
    [/\bdinamico\b/g, 'dinâmico'],
    [/\bdinamicos\b/g, 'dinâmicos'],
    [/\bcodigo\b/g, 'código'],
    [/\bcodigos\b/g, 'códigos'],
    [/\bconteudo\b/g, 'conteúdo'],
    [/\bpagina\b/g, 'página'],
    [/\bpublico\b/g, 'público'],
    [/\bdominio\b/g, 'domínio'],
    [/\bproprio\b/g, 'próprio'],
    [/\bproprios\b/g, 'próprios'],
    [/\bGeracao\b/g, 'Geração'],
    [/\bgeracao\b/g, 'geração'],
    [/\bpreco\b/g, 'preço'],
    [/\bvariavel\b/g, 'variável'],
    [/\bcontribuicao\b/g, 'contribuição'],
    [/\bequilibrio\b/g, 'equilíbrio'],
    [/\brevisao\b/g, 'revisão'],
    [/\bhistorico\b/g, 'histórico'],
    [/\brecorrencia\b/g, 'recorrência'],
    [/\baprovacao\b/g, 'aprovação'],
    [/\bnumeracao\b/g, 'numeração'],
    [/\bapos\b/g, 'após'],
    [/\bHistorico\b/g, 'Histórico'],
    [/\bcenarios\b/g, 'cenários'],
    [/\bexportacoes\b/g, 'exportações'],
    [/\banuncios\b/g, 'anúncios'],
  ],
  es: [
    [/\bestatico\b/g, 'estático'],
    [/\bestaticos\b/g, 'estáticos'],
    [/\bdinamico\b/g, 'dinámico'],
    [/\bdinamicos\b/g, 'dinámicos'],
    [/\bcodigo\b/g, 'código'],
    [/\bcodigos\b/g, 'códigos'],
    [/\bdespues\b/g, 'después'],
    [/\bmas\b/g, 'más'],
    [/\butil\b/g, 'útil'],
    [/\bsenal\b/g, 'señal'],
    [/\bplanificacion\b/g, 'planificación'],
    [/\brevision\b/g, 'revisión'],
    [/\brecoleccion\b/g, 'recolección'],
    [/\bcontribucion\b/g, 'contribución'],
    [/\binversion\b/g, 'inversión'],
    [/\bliquido\b/g, 'líquido'],
    [/\bnumeracion\b/g, 'numeración'],
    [/\bretencion\b/g, 'retención'],
    [/\bresolucion\b/g, 'resolución'],
    [/\bintegracion\b/g, 'integración'],
    [/\bestan\b/g, 'están'],
    [/\baun\b/g, 'aún'],
  ],
  fr: [
    [/\bRevise\b/g, 'Révisé'],
    [/\bApercu\b/g, 'Aperçu'],
    [/\bapercu\b/g, 'aperçu'],
    [/\bGeneration\b/g, 'Génération'],
    [/\bgeneration\b/g, 'génération'],
    [/\bDonnees\b/g, 'Données'],
    [/\bdonnees\b/g, 'données'],
    [/\bsecurite\b/g, 'sécurité'],
    [/\bscenario\b/g, 'scénario'],
    [/\bscenarios\b/g, 'scénarios'],
    [/\bcout\b/g, 'coût'],
    [/\bcouts\b/g, 'coûts'],
    [/\binterets\b/g, 'intérêts'],
    [/\bresultat\b/g, 'résultat'],
    [/\bresultats\b/g, 'résultats'],
    [/\butilisee\b/g, 'utilisée'],
    [/\bequipe\b/g, 'équipe'],
    [/\bequipes\b/g, 'équipes'],
    [/\bprevu\b/g, 'prévu'],
    [/\brecurrence\b/g, 'récurrence'],
    [/\breconciliation\b/g, 'réconciliation'],
    [/\bNumerotation\b/g, 'Numérotation'],
    [/\bnumerotation\b/g, 'numérotation'],
    [/\bapres\b/g, 'après'],
    [/\bteleversement\b/g, 'téléversement'],
    [/\bintegrations\b/g, 'intégrations'],
    [/\bresolution\b/g, 'résolution'],
  ],
  de: [
    [/\bGeprueft\b/g, 'Geprüft'],
    [/\bgeprueft\b/g, 'geprüft'],
    [/\bPruefung\b/g, 'Prüfung'],
    [/\bpruefung\b/g, 'prüfung'],
    [/\bPruefen\b/g, 'Prüfen'],
    [/\bpruefen\b/g, 'prüfen'],
    [/\bfuer\b/g, 'für'],
    [/\bgrosse\b/g, 'große'],
    [/\bgroessere\b/g, 'größere'],
    [/\bGebuehren\b/g, 'Gebühren'],
    [/\bRueckfluss\b/g, 'Rückfluss'],
    [/\bHoehere\b/g, 'Höhere'],
    [/\blaesst\b/g, 'lässt'],
    [/\berfuellt\b/g, 'erfüllt'],
  ],
}

const englishFallbackPhraseReplacements: Partial<Record<LocaleCode, Record<string, string>>> = {
  'pt-br': {
    'Lookup target': 'Alvo da consulta',
    'Domain name': 'Nome de domínio',
    'Website URL': 'URL do site',
    'Expected value (optional)': 'Valor esperado (opcional)',
    'Current connection': 'Conexão atual',
    'Raw headers': 'Headers brutos',
    'Run IP check': 'Executar consulta de IP',
    'Run DNS lookup': 'Executar consulta DNS',
    'Run RDAP lookup': 'Executar consulta RDAP',
    'Run SSL check': 'Executar verificação SSL',
    'Run propagation check': 'Executar propagação',
    'Run port check': 'Executar teste de porta',
    'Run reachability check': 'Executar teste de alcance',
    'Run SPF check': 'Executar verificação SPF',
    'Run DKIM check': 'Executar verificação DKIM',
    'Run DMARC check': 'Executar verificação DMARC',
    'Run MX check': 'Executar verificação MX',
    'Run blacklist check': 'Consultar blacklist',
    'Run SMTP check': 'Executar teste SMTP',
    'Analyze headers': 'Analisar headers',
    'Check status': 'Verificar status',
    'Trace redirects': 'Rastrear redirecionamentos',
    'Check headers': 'Verificar headers',
    'Check robots.txt': 'Verificar robots.txt',
    'Validate sitemap': 'Validar sitemap',
    'Measure TTFB': 'Medir TTFB',
    'Run snapshot': 'Executar snapshot',
    'Final URL': 'URL final',
    'Check': 'Verificação',
    'Status': 'Status',
    'Cache': 'Cache',
    'cached': 'em cache',
    'fresh': 'novo',
    'The result shows': 'O resultado mostra',
    'Structured Data Formatter': 'Formatador de dados estruturados',
    'Format JSON, XML, YAML and CSV snippets in the browser.': 'Formate trechos JSON, XML, YAML e CSV no navegador.',
    'Base64 Converter': 'Conversor Base64',
    'Encode or decode UTF-8 text without sending the text to a server.': 'Codifique ou decodifique texto UTF-8 sem enviar o conteúdo a um servidor.',
    'JWT Inspector': 'Inspetor JWT',
    'Decode JWT header and payload locally without verifying the signature.': 'Decodifique cabeçalho e payload JWT localmente, sem verificar assinatura.',
    'Regex Tester': 'Testador de Regex',
    'Run JavaScript regular expressions against sample text in a browser worker.': 'Execute expressões regulares JavaScript contra texto de exemplo em um worker do navegador.',
    'Text Diff': 'Comparador de texto',
    'Compare two text blocks and produce a compact line diff locally.': 'Compare dois blocos de texto e gere um diff compacto de linhas localmente.',
    'Cron Helper': 'Assistente Cron',
    'Explain a five-field cron expression and list the next UTC runs.': 'Explique uma expressão cron de cinco campos e liste as próximas execuções em UTC.',
    'UUID Generator': 'Gerador de UUID',
    'Generate version 4 UUIDs locally for development fixtures.': 'Gere UUIDs versão 4 localmente para dados de desenvolvimento.',
    'Timestamp Converter': 'Conversor de timestamp',
    'Convert Unix timestamps, milliseconds and date strings into readable UTC values.': 'Converta timestamps Unix, milissegundos e datas em valores UTC legíveis.',
    'Hash Generator': 'Gerador de hash',
    'Generate SHA digests for small text snippets with browser crypto.': 'Gere digests SHA de pequenos textos com criptografia do navegador.',
    'Time Zone Converter': 'Conversor de fusos horários',
    'Convert an ISO or UTC date-time instant across two named IANA time zones.': 'Converta um instante ISO ou UTC entre dois fusos IANA.',
    'Date Difference Calculator': 'Calculadora de diferença entre datas',
    'Measure days, weeks and approximate months between two dates.': 'Meça dias, semanas e meses aproximados entre duas datas.',
    'Business Days Calculator': 'Calculadora de dias úteis',
    'Count Monday to Friday business days between two dates.': 'Conte dias úteis de segunda a sexta entre duas datas.',
    'Convert Unix seconds, Unix milliseconds and date strings into readable time values.': 'Converta segundos Unix, milissegundos Unix e datas em horários legíveis.',
    'Age Calculator': 'Calculadora de idade',
    'Calculate age in years, months and days on a reference date.': 'Calcule idade em anos, meses e dias em uma data de referência.',
    'Percentage Calculator': 'Calculadora de porcentagem',
    'Calculate percent-of, percent change and add-percent scenarios.': 'Calcule porcentagem de um valor, variação percentual e acréscimos percentuais.',
    'Unit Converter': 'Conversor de unidades',
    'Convert common length, weight and temperature units locally.': 'Converta unidades comuns de comprimento, peso e temperatura localmente.',
    'Static QR Code Generator': 'Gerador de QR Code estático',
    'Create a scannable static QR code for a safe URL, plain text, email or phone payload.': 'Crie um QR Code estático escaneável para URL segura, texto, email ou telefone.',
    'Barcode Generator': 'Gerador de código de barras',
    'Generate a Code 128 barcode preview for short inventory, ticket or reference values.': 'Gere uma prévia de código Code 128 para inventário, ingresso ou referência curta.',
    'UTM Builder': 'Construtor UTM',
    'Build a tagged campaign URL and QR preview without sending the destination to a server.': 'Monte uma URL de campanha com tags e prévia de QR sem enviar o destino a um servidor.',
    'vCard QR Builder': 'Construtor de QR vCard',
    'Turn a small contact profile into a vCard payload and QR preview locally.': 'Transforme um contato simples em payload vCard e prévia de QR localmente.',
    'Wi-Fi QR Builder': 'Construtor de QR Wi-Fi',
    'Create a Wi-Fi QR payload for WPA, WEP or open networks directly in the browser.': 'Crie um payload QR de Wi-Fi para redes WPA, WEP ou abertas direto no navegador.',
    'QR Preview Lab': 'Laboratório de prévia QR',
    'Inspect a static QR payload before printing and see why dynamic redirects stay planned.': 'Inspecione um payload QR estático antes de imprimir e entenda por que redirecionamentos dinâmicos ficam planejados.',
    'Invoice Builder': 'Construtor de faturas',
    'Create an invoice preview and download a PDF in the browser without mandatory signup.': 'Crie uma prévia de fatura e baixe o PDF no navegador sem cadastro obrigatório.',
    'Quote Builder': 'Construtor de orçamentos',
    'Prepare a quote or estimate with itemized totals and local PDF export.': 'Prepare um orçamento com itens, totais e exportação local em PDF.',
    'Receipt Builder': 'Construtor de recibos',
    'Draft a simple receipt with paid date, itemized total and local PDF download.': 'Crie um recibo simples com data de pagamento, total por itens e PDF local.',
    'SPF Checker': 'Verificador SPF',
    'Find the SPF TXT record for a domain and flag risky all, duplicate or lookup-heavy policies.': 'Encontre o registro TXT SPF de um domínio e sinalize políticas arriscadas, duplicadas ou pesadas.',
    'DKIM Checker': 'Verificador DKIM',
    'Check a selector._domainkey TXT record and confirm that a DKIM public key is published.': 'Verifique o TXT selector._domainkey e confirme se a chave pública DKIM está publicada.',
    'DMARC Checker': 'Verificador DMARC',
    'Inspect the _dmarc TXT record and identify policy, alignment and reporting readiness.': 'Inspecione o TXT _dmarc e identifique política, alinhamento e prontidão de relatórios.',
    'MX Checker': 'Verificador MX',
    'Inspect mail exchanger priority, host shape and public resolution before debugging delivery.': 'Inspecione prioridade MX, formato dos hosts e resolução pública antes de depurar entrega.',
    'Blacklist Check': 'Consulta de blacklist',
    'Run a small DNSBL sample against public mail-related addresses with strict query limits.': 'Execute uma pequena amostra DNSBL para endereços públicos de email com limites rígidos.',
    'SMTP Check': 'Teste SMTP',
    'Test bounded TCP reachability to a domain mail exchanger without sending a message.': 'Teste alcance TCP limitado até um MX sem enviar mensagem.',
    'Header Analyzer': 'Analisador de headers',
    'Parse raw message headers locally to summarize SPF, DKIM, DMARC and alignment clues.': 'Analise headers brutos localmente para resumir pistas de SPF, DKIM, DMARC e alinhamento.',
    'HTTP Status Checker': 'Verificador de status HTTP',
    'Check whether a public page answers with a healthy HTTP status and bounded timing data.': 'Verifique se uma página pública responde com status HTTP saudável e tempo limitado.',
    'Redirect Chain Checker': 'Verificador de cadeia de redirecionamentos',
    'Follow a short redirect chain and flag loops, cross-host hops and slow handoffs.': 'Siga uma cadeia curta de redirecionamentos e sinalize loops, saltos de host e lentidão.',
    'Security Headers Checker': 'Verificador de headers de segurança',
    'Inspect response headers for baseline browser security and caching signals.': 'Inspecione headers de resposta para sinais básicos de segurança e cache.',
    'Robots.txt Checker': 'Verificador de robots.txt',
    'Fetch the origin robots.txt file and identify basic crawl directives and sitemap hints.': 'Busque o robots.txt da origem e identifique diretivas básicas e pistas de sitemap.',
    'Sitemap Validator': 'Validador de sitemap',
    'Fetch a same-origin sitemap and summarize XML validity, URL count and basic size limits.': 'Busque um sitemap da mesma origem e resuma validade XML, contagem de URLs e limites.',
    'TTFB Checker': 'Verificador de TTFB',
    'Measure bounded first-byte timing for a public URL from one probe runtime.': 'Meça tempo até o primeiro byte para uma URL pública a partir de uma execução controlada.',
    'Performance Snapshot': 'Snapshot de performance',
    'Combine status, redirect count, headers, byte size and timing into a quick web health snapshot.': 'Combine status, redirecionamentos, headers, tamanho e tempo em um snapshot rápido de saúde web.',
    'Image Compressor': 'Compressor de imagens',
    'Compress a PNG, JPEG, WebP or AVIF image in the browser and download a lighter copy.': 'Comprima uma imagem PNG, JPEG, WebP ou AVIF no navegador e baixe uma cópia mais leve.',
    'Image Resizer': 'Redimensionador de imagens',
    'Resize an image to exact or proportional dimensions without uploading it to a server.': 'Redimensione uma imagem para medidas exatas ou proporcionais sem upload para servidor.',
    'Image Cropper': 'Recortador de imagens',
    'Create centered square, portrait or landscape crops from a selected browser-side image.': 'Crie cortes centralizados quadrados, verticais ou horizontais a partir de uma imagem local.',
    'Image Converter': 'Conversor de imagens',
    'Convert PNG, JPEG, WebP and browser-supported AVIF images to another common format.': 'Converta PNG, JPEG, WebP e AVIF suportado pelo navegador para outro formato comum.',
    'Metadata Remover': 'Removedor de metadados',
    'Strip camera metadata by drawing pixels to a clean Canvas and downloading a re-encoded copy.': 'Remova metadados de câmera redesenhando pixels em Canvas limpo e baixando uma cópia recodificada.',
    'Social Preset Generator': 'Gerador de presets sociais',
    'Generate square, story, Open Graph or marketplace-ready image sizes from one original.': 'Gere tamanhos quadrado, story, Open Graph ou marketplace a partir de uma imagem original.',
    'PDF Merge': 'Unir PDFs',
    'Combine up to five small PDFs in the browser and download one merged file.': 'Una até cinco PDFs pequenos no navegador e baixe um arquivo combinado.',
    'PDF Split': 'Dividir PDF',
    'Extract selected pages from one PDF locally and download a smaller PDF.': 'Extraia páginas selecionadas de um PDF localmente e baixe um PDF menor.',
    'PDF Rotate': 'Girar PDF',
    'Rotate all pages or a selected page range by 90, 180 or 270 degrees.': 'Gire todas as páginas ou um intervalo selecionado em 90, 180 ou 270 graus.',
    'PDF Compressor': 'Compressor de PDF',
    'Rewrite a PDF with object streams and clean metadata for a lightweight local copy.': 'Regrave um PDF com streams de objeto e metadados limpos para uma cópia local mais leve.',
    'PDF Watermark': 'Marca dágua em PDF',
    'Add a light text watermark to every page or a selected page range locally.': 'Adicione uma marca dágua textual leve em todas as páginas ou em um intervalo selecionado.',
    'PDF Page Numbers': 'Numeração de páginas PDF',
    'Add simple page numbers to a PDF in the browser without uploading it.': 'Adicione numeração simples a um PDF no navegador sem fazer upload.',
    'PDF Metadata Cleaner': 'Limpador de metadados PDF',
    'Text to PDF': 'Texto para PDF',
  },
  es: {
    'Lookup target': 'Objetivo de consulta',
    'Domain name': 'Nombre de dominio',
    'Website URL': 'URL del sitio',
    'Expected value (optional)': 'Valor esperado (opcional)',
    'Current connection': 'Conexión actual',
    'Raw headers': 'Headers brutos',
    'Run IP check': 'Ejecutar consulta de IP',
    'Run DNS lookup': 'Ejecutar consulta DNS',
    'Run RDAP lookup': 'Ejecutar consulta RDAP',
    'Run SSL check': 'Ejecutar verificación SSL',
    'Run propagation check': 'Ejecutar propagación',
    'Run port check': 'Ejecutar prueba de puerto',
    'Run reachability check': 'Ejecutar prueba de alcance',
    'Run SPF check': 'Ejecutar verificación SPF',
    'Run DKIM check': 'Ejecutar verificación DKIM',
    'Run DMARC check': 'Ejecutar verificación DMARC',
    'Run MX check': 'Ejecutar verificación MX',
    'Run blacklist check': 'Consultar blacklist',
    'Run SMTP check': 'Ejecutar prueba SMTP',
    'Analyze headers': 'Analizar headers',
    'Check status': 'Verificar estado',
    'Trace redirects': 'Rastrear redirecciones',
    'Check headers': 'Verificar headers',
    'Check robots.txt': 'Verificar robots.txt',
    'Validate sitemap': 'Validar sitemap',
    'Measure TTFB': 'Medir TTFB',
    'Run snapshot': 'Ejecutar snapshot',
    'Final URL': 'URL final',
    'Check': 'Verificación',
    'Status': 'Estado',
    'Cache': 'Cache',
    'cached': 'en cache',
    'fresh': 'nuevo',
    'The result shows': 'El resultado muestra',
    'Structured Data Formatter': 'Formateador de datos estructurados',
    'Base64 Converter': 'Conversor Base64',
    'JWT Inspector': 'Inspector JWT',
    'Regex Tester': 'Probador de Regex',
    'Text Diff': 'Comparador de texto',
    'Cron Helper': 'Asistente Cron',
    'UUID Generator': 'Generador UUID',
    'Timestamp Converter': 'Conversor de timestamp',
    'Hash Generator': 'Generador de hash',
    'Time Zone Converter': 'Conversor de zonas horarias',
    'Date Difference Calculator': 'Calculadora de diferencia de fechas',
    'Business Days Calculator': 'Calculadora de días laborables',
    'Age Calculator': 'Calculadora de edad',
    'Percentage Calculator': 'Calculadora de porcentaje',
    'Unit Converter': 'Conversor de unidades',
    'Static QR Code Generator': 'Generador de QR estático',
    'Barcode Generator': 'Generador de código de barras',
    'UTM Builder': 'Constructor UTM',
    'vCard QR Builder': 'Constructor de QR vCard',
    'Wi-Fi QR Builder': 'Constructor de QR Wi-Fi',
    'QR Preview Lab': 'Laboratorio de vista previa QR',
    'Invoice Builder': 'Constructor de facturas',
    'Quote Builder': 'Constructor de presupuestos',
    'Receipt Builder': 'Constructor de recibos',
    'SPF Checker': 'Verificador SPF',
    'DKIM Checker': 'Verificador DKIM',
    'DMARC Checker': 'Verificador DMARC',
    'MX Checker': 'Verificador MX',
    'Blacklist Check': 'Consulta de blacklist',
    'SMTP Check': 'Prueba SMTP',
    'Header Analyzer': 'Analizador de headers',
    'HTTP Status Checker': 'Verificador de estado HTTP',
    'Redirect Chain Checker': 'Verificador de cadena de redirecciones',
    'Security Headers Checker': 'Verificador de headers de seguridad',
    'Robots.txt Checker': 'Verificador de robots.txt',
    'Sitemap Validator': 'Validador de sitemap',
    'TTFB Checker': 'Verificador de TTFB',
    'Performance Snapshot': 'Snapshot de rendimiento',
    'Image Compressor': 'Compresor de imágenes',
    'Image Resizer': 'Redimensionador de imágenes',
    'Image Cropper': 'Recortador de imágenes',
    'Image Converter': 'Conversor de imágenes',
    'Metadata Remover': 'Eliminador de metadatos',
    'Social Preset Generator': 'Generador de presets sociales',
    'PDF Merge': 'Unir PDFs',
    'PDF Split': 'Dividir PDF',
    'PDF Rotate': 'Girar PDF',
    'PDF Compressor': 'Compresor de PDF',
    'PDF Watermark': 'Marca de agua en PDF',
    'PDF Page Numbers': 'Números de página PDF',
    'PDF Metadata Cleaner': 'Limpiador de metadatos PDF',
    'Text to PDF': 'Texto a PDF',
    'Rotate all pages or a selected page range by 90, 180 or 270 degrees.': 'Gira todas las páginas o un rango seleccionado en 90, 180 o 270 grados.',
    'Create a scannable static QR code for a safe URL, plain text, email or phone payload.': 'Crea un QR estático escaneable para URL segura, texto, email o teléfono.',
    'Compress a PNG, JPEG, WebP or AVIF image in the browser and download a lighter copy.': 'Comprime una imagen PNG, JPEG, WebP o AVIF en el navegador y descarga una copia más ligera.',
    'Combine up to five small PDFs in the browser and download one merged file.': 'Une hasta cinco PDFs pequeños en el navegador y descarga un archivo combinado.',
    'Find the SPF TXT record for a domain and flag risky all, duplicate or lookup-heavy policies.': 'Encuentra el registro TXT SPF de un dominio y señala políticas riesgosas, duplicadas o pesadas.',
  },
  fr: {
    'Lookup target': 'Cible du contrôle',
    'Domain name': 'Nom de domaine',
    'Website URL': 'URL du site',
    'Expected value (optional)': 'Valeur attendue (facultatif)',
    'Current connection': 'Connexion actuelle',
    'Raw headers': 'Headers bruts',
    'Run IP check': 'Lancer le contrôle IP',
    'Run DNS lookup': 'Lancer la recherche DNS',
    'Run RDAP lookup': 'Lancer la recherche RDAP',
    'Run SSL check': 'Lancer le contrôle SSL',
    'Run propagation check': 'Lancer le contrôle de propagation',
    'Run port check': 'Lancer le test de port',
    'Run reachability check': 'Lancer le contrôle d’accès',
    'Run SPF check': 'Lancer le contrôle SPF',
    'Run DKIM check': 'Lancer le contrôle DKIM',
    'Run DMARC check': 'Lancer le contrôle DMARC',
    'Run MX check': 'Lancer le contrôle MX',
    'Run blacklist check': 'Vérifier la blacklist',
    'Run SMTP check': 'Lancer le test SMTP',
    'Analyze headers': 'Analyser les headers',
    'Check status': 'Vérifier le statut',
    'Trace redirects': 'Tracer les redirections',
    'Check headers': 'Vérifier les headers',
    'Check robots.txt': 'Vérifier robots.txt',
    'Validate sitemap': 'Valider le sitemap',
    'Measure TTFB': 'Mesurer le TTFB',
    'Run snapshot': 'Lancer le snapshot',
    'Final URL': 'URL finale',
    'Check': 'Contrôle',
    'Status': 'Statut',
    'Cache': 'Cache',
    'cached': 'en cache',
    'fresh': 'récent',
    'The result shows': 'Le résultat affiche',
    'Structured Data Formatter': 'Formateur de données structurées',
    'Base64 Converter': 'Convertisseur Base64',
    'JWT Inspector': 'Inspecteur JWT',
    'Regex Tester': 'Testeur Regex',
    'Text Diff': 'Comparateur de texte',
    'Cron Helper': 'Assistant Cron',
    'UUID Generator': 'Générateur UUID',
    'Timestamp Converter': 'Convertisseur de timestamp',
    'Hash Generator': 'Générateur de hash',
    'Time Zone Converter': 'Convertisseur de fuseaux horaires',
    'Date Difference Calculator': 'Calculateur de différence de dates',
    'Business Days Calculator': 'Calculateur de jours ouvrés',
    'Age Calculator': "Calculateur d'âge",
    'Percentage Calculator': 'Calculateur de pourcentage',
    'Unit Converter': "Convertisseur d'unités",
    'Static QR Code Generator': 'Générateur de QR statique',
    'Barcode Generator': 'Générateur de code-barres',
    'UTM Builder': 'Constructeur UTM',
    'vCard QR Builder': 'Constructeur de QR vCard',
    'Wi-Fi QR Builder': 'Constructeur de QR Wi-Fi',
    'QR Preview Lab': 'Laboratoire d’aperçu QR',
    'Invoice Builder': 'Générateur de factures',
    'Quote Builder': 'Générateur de devis',
    'Receipt Builder': 'Générateur de reçus',
    'SPF Checker': 'Vérificateur SPF',
    'DKIM Checker': 'Vérificateur DKIM',
    'DMARC Checker': 'Vérificateur DMARC',
    'MX Checker': 'Vérificateur MX',
    'Blacklist Check': 'Vérification blacklist',
    'SMTP Check': 'Test SMTP',
    'Header Analyzer': 'Analyseur de headers',
    'HTTP Status Checker': 'Vérificateur de statut HTTP',
    'Redirect Chain Checker': 'Vérificateur de chaîne de redirections',
    'Security Headers Checker': 'Vérificateur de headers de sécurité',
    'Robots.txt Checker': 'Vérificateur robots.txt',
    'Sitemap Validator': 'Validateur de sitemap',
    'TTFB Checker': 'Vérificateur TTFB',
    'Performance Snapshot': 'Snapshot performance',
    'Image Compressor': 'Compresseur d’images',
    'Image Resizer': 'Redimensionneur d’images',
    'Image Cropper': 'Recadrage d’images',
    'Image Converter': 'Convertisseur d’images',
    'Metadata Remover': 'Suppresseur de métadonnées',
    'Social Preset Generator': 'Générateur de presets sociaux',
    'PDF Merge': 'Fusionner des PDF',
    'PDF Split': 'Diviser un PDF',
    'PDF Rotate': 'Faire pivoter un PDF',
    'PDF Compressor': 'Compresseur de PDF',
    'PDF Watermark': 'Filigrane PDF',
    'PDF Page Numbers': 'Numéros de page PDF',
    'PDF Metadata Cleaner': 'Nettoyeur de métadonnées PDF',
    'Text to PDF': 'Texte vers PDF',
    'Rotate all pages or a selected page range by 90, 180 or 270 degrees.': 'Faites pivoter toutes les pages ou une plage sélectionnée de 90, 180 ou 270 degrés.',
    'Create a scannable static QR code for a safe URL, plain text, email or phone payload.': 'Créez un QR statique scannable pour URL sûre, texte, email ou téléphone.',
    'Compress a PNG, JPEG, WebP or AVIF image in the browser and download a lighter copy.': 'Compressez une image PNG, JPEG, WebP ou AVIF dans le navigateur et téléchargez une copie plus légère.',
    'Combine up to five small PDFs in the browser and download one merged file.': 'Fusionnez jusqu’à cinq petits PDF dans le navigateur et téléchargez un fichier unique.',
    'Find the SPF TXT record for a domain and flag risky all, duplicate or lookup-heavy policies.': 'Trouvez le TXT SPF d’un domaine et signalez les politiques risquées, dupliquées ou trop lourdes.',
  },
  de: {
    'Lookup target': 'Prüfziel',
    'Domain name': 'Domainname',
    'Website URL': 'Website-URL',
    'Expected value (optional)': 'Erwarteter Wert (optional)',
    'Current connection': 'Aktuelle Verbindung',
    'Raw headers': 'Rohheader',
    'Run IP check': 'IP-Prüfung starten',
    'Run DNS lookup': 'DNS-Lookup starten',
    'Run RDAP lookup': 'RDAP-Lookup starten',
    'Run SSL check': 'SSL-Prüfung starten',
    'Run propagation check': 'Propagation prüfen',
    'Run port check': 'Port prüfen',
    'Run reachability check': 'Erreichbarkeit prüfen',
    'Run SPF check': 'SPF prüfen',
    'Run DKIM check': 'DKIM prüfen',
    'Run DMARC check': 'DMARC prüfen',
    'Run MX check': 'MX prüfen',
    'Run blacklist check': 'Blacklist prüfen',
    'Run SMTP check': 'SMTP prüfen',
    'Analyze headers': 'Header analysieren',
    'Check status': 'Status prüfen',
    'Trace redirects': 'Weiterleitungen verfolgen',
    'Check headers': 'Header prüfen',
    'Check robots.txt': 'robots.txt prüfen',
    'Validate sitemap': 'Sitemap validieren',
    'Measure TTFB': 'TTFB messen',
    'Run snapshot': 'Snapshot starten',
    'Final URL': 'Finale URL',
    'Check': 'Prüfung',
    'Status': 'Status',
    'Cache': 'Cache',
    'cached': 'aus Cache',
    'fresh': 'neu',
    'The result shows': 'Das Ergebnis zeigt',
    'Structured Data Formatter': 'Formatierer für strukturierte Daten',
    'Base64 Converter': 'Base64-Konverter',
    'JWT Inspector': 'JWT-Inspektor',
    'Regex Tester': 'Regex-Tester',
    'Text Diff': 'Textvergleich',
    'Cron Helper': 'Cron-Assistent',
    'UUID Generator': 'UUID-Generator',
    'Timestamp Converter': 'Timestamp-Konverter',
    'Hash Generator': 'Hash-Generator',
    'Time Zone Converter': 'Zeitzonen-Konverter',
    'Date Difference Calculator': 'Datumsdifferenz-Rechner',
    'Business Days Calculator': 'Arbeitstage-Rechner',
    'Age Calculator': 'Altersrechner',
    'Percentage Calculator': 'Prozentrechner',
    'Unit Converter': 'Einheiten-Konverter',
    'Static QR Code Generator': 'Generator für statische QR-Codes',
    'Barcode Generator': 'Barcode-Generator',
    'UTM Builder': 'UTM-Generator',
    'vCard QR Builder': 'vCard-QR-Generator',
    'Wi-Fi QR Builder': 'Wi-Fi-QR-Generator',
    'QR Preview Lab': 'QR-Vorschaulabor',
    'Invoice Builder': 'Rechnungsgenerator',
    'Quote Builder': 'Angebotsgenerator',
    'Receipt Builder': 'Beleggenerator',
    'SPF Checker': 'SPF-Prüfer',
    'DKIM Checker': 'DKIM-Prüfer',
    'DMARC Checker': 'DMARC-Prüfer',
    'MX Checker': 'MX-Prüfer',
    'Blacklist Check': 'Blacklist-Prüfung',
    'SMTP Check': 'SMTP-Test',
    'Header Analyzer': 'Header-Analyse',
    'HTTP Status Checker': 'HTTP-Statusprüfer',
    'Redirect Chain Checker': 'Redirect-Kettenprüfer',
    'Security Headers Checker': 'Sicherheitsheader-Prüfer',
    'Robots.txt Checker': 'Robots.txt-Prüfer',
    'Sitemap Validator': 'Sitemap-Validator',
    'TTFB Checker': 'TTFB-Prüfer',
    'Performance Snapshot': 'Performance-Snapshot',
    'Image Compressor': 'Bildkompressor',
    'Image Resizer': 'Bildgrößen-Tool',
    'Image Cropper': 'Bildzuschnitt',
    'Image Converter': 'Bildkonverter',
    'Metadata Remover': 'Metadaten-Entferner',
    'Social Preset Generator': 'Generator für Social-Presets',
    'PDF Merge': 'PDFs zusammenführen',
    'PDF Split': 'PDF teilen',
    'PDF Rotate': 'PDF drehen',
    'PDF Compressor': 'PDF-Kompressor',
    'PDF Watermark': 'PDF-Wasserzeichen',
    'PDF Page Numbers': 'PDF-Seitenzahlen',
    'PDF Metadata Cleaner': 'PDF-Metadatenreiniger',
    'Text to PDF': 'Text zu PDF',
    'Rotate all pages or a selected page range by 90, 180 or 270 degrees.': 'Drehen Sie alle Seiten oder einen ausgewählten Seitenbereich um 90, 180 oder 270 Grad.',
    'Create a scannable static QR code for a safe URL, plain text, email or phone payload.': 'Erstellen Sie einen scanbaren statischen QR-Code für sichere URL, Text, E-Mail oder Telefon.',
    'Compress a PNG, JPEG, WebP or AVIF image in the browser and download a lighter copy.': 'Komprimieren Sie PNG, JPEG, WebP oder AVIF im Browser und laden Sie eine leichtere Kopie herunter.',
    'Combine up to five small PDFs in the browser and download one merged file.': 'Führen Sie bis zu fünf kleine PDFs im Browser zusammen und laden Sie eine Datei herunter.',
    'Find the SPF TXT record for a domain and flag risky all, duplicate or lookup-heavy policies.': 'Finden Sie den SPF-TXT-Eintrag einer Domain und markieren Sie riskante, doppelte oder lookup-lastige Regeln.',
  },
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function replaceEnglishFallbackPhrase(value: string, source: string, replacement: string): string {
  const startsWithWord = /^[A-Za-z0-9]/.test(source)
  const endsWithWord = /[A-Za-z0-9]$/.test(source)
  const prefixPattern = startsWithWord ? '(^|[^A-Za-z0-9])' : ''
  const suffixPattern = endsWithWord ? '(?![A-Za-z0-9])' : ''
  const pattern = new RegExp(`${prefixPattern}${escapeRegExp(source)}${suffixPattern}`, 'g')

  return value.replace(pattern, (...args: unknown[]) => {
    const prefix = startsWithWord ? String(args[1] ?? '') : ''

    return `${prefix}${replacement}`
  })
}

function applyEnglishFallbackPhraseReplacements(locale: LocaleCode, value: string): string {
  const replacements = englishFallbackPhraseReplacements[locale]

  if (!replacements) {
    return value
  }

  return Object.entries(replacements).reduce(
    (current, [source, replacement]) => replaceEnglishFallbackPhrase(current, source, replacement),
    value,
  )
}

function sanitizePublicString(locale: LocaleCode, value: string): string {
  const replacements = [...internalTermReplacements[locale], ...(localeAccentReplacements[locale] ?? [])]

  const sanitized = replacements.reduce((current, [pattern, replacement]) => current.replace(pattern, replacement), value)

  return applyEnglishFallbackPhraseReplacements(locale, sanitized)
}

function isPlainObject(value: unknown): value is PublicCopyMap {
  return Object.prototype.toString.call(value) === '[object Object]'
}

const technicalCopyKeys = new Set([
  'apiBase',
  'apiPath',
  'asset',
  'assetUrl',
  'basePath',
  'canonical',
  'canonicalPath',
  'href',
  'hreflang',
  'htmlLang',
  'id',
  'locale',
  'locales',
  'path',
  'paths',
  'publicPath',
  'route',
  'routes',
  'siteSlug',
  'siteSlugs',
  'slug',
  'slugs',
  'timeZone',
  'url',
  'urls',
  'zone',
  'zones',
])

function sanitizePublicCopyValue<T>(locale: LocaleCode, value: T, key?: string): T {
  if (key && technicalCopyKeys.has(key)) {
    return value
  }

  if (typeof value === 'string') {
    return sanitizePublicString(locale, value) as T
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizePublicCopyValue(locale, item)) as T
  }

  if (value && isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([childKey, item]) => [childKey, sanitizePublicCopyValue(locale, item, childKey)]),
    ) as T
  }

  return value
}

export function sanitizePublicCopy<T>(locale: LocaleCode, value: T): T {
  return sanitizePublicCopyValue(locale, value)
}
