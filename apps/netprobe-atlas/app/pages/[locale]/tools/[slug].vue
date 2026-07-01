<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, onMounted, ref } from 'vue'
import { getHomeCopy, getShellCopy } from '../../../data/copy'
import { localizedContentPath, localizedHomePath, localizedToolPath, normalizePublicLocale, sanitizePublicCopy, toHtmlLang, type LocaleCode } from '../../../data/locales'
import { absoluteUrl, localeAlternates } from '../../../data/routes'
import { createToolStructuredData, getCategoryLabel, getToolBySlug, getToolCopy, toolCatalog } from '../../../data/tools'
import { trackToolStarted } from '../../../utils/analytics'

const route = useRoute()
const locale = normalizePublicLocale(route.params.locale?.toString())
const tool = getToolBySlug(route.params.slug?.toString())

if (!locale || !tool) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Tool not found',
  })
}

const copy = getToolCopy(tool, locale)
const shellCopy = getShellCopy(locale)
const homeFooterCopy = getHomeCopy(locale)
const canonicalPath = localizedToolPath(locale, tool.slug)
const structuredData = createToolStructuredData(tool, locale, absoluteUrl(canonicalPath))
type FooterLink = ReturnType<typeof getHomeCopy>['footerGroups'][number]['links'][number]
const upgradePanelCopyByLocale = {
  en: {
    ariaLabel: 'Advanced workflow',
    eyebrow: 'Advanced workflow',
    title: 'Need monitoring, history or API access?',
    body: 'The free check answers the immediate question on this page. Larger workflows can add saved history, alerts, reports, API access and regional monitoring when they are enabled for your account.',
    cta: 'Review limits',
  },
  'pt-br': {
    ariaLabel: 'Fluxo avançado',
    eyebrow: 'Fluxo avançado',
    title: 'Precisa de monitoramento, histórico ou API?',
    body: 'A consulta gratuita responde a pergunta imediata nesta página. Fluxos maiores podem adicionar histórico salvo, alertas, relatórios, API e monitoramento regional quando estiverem disponíveis na conta.',
    cta: 'Revisar limites',
  },
  es: {
    ariaLabel: 'Flujo avanzado',
    eyebrow: 'Flujo avanzado',
    title: 'Necesitas monitoreo, historial o API?',
    body: 'La consulta gratuita responde la pregunta inmediata en esta pagina. Los flujos mayores pueden agregar historial, alertas, reportes, API y monitoreo regional cuando esten disponibles en la cuenta.',
    cta: 'Revisar limites',
  },
  fr: {
    ariaLabel: 'Workflow avance',
    eyebrow: 'Workflow avance',
    title: 'Besoin de surveillance, historique ou API ?',
    body: 'Le controle gratuit repond a la question immediate sur cette page. Des workflows plus larges peuvent ajouter historique, alertes, rapports, API et surveillance regionale lorsqu ils sont disponibles pour le compte.',
    cta: 'Revoir les limites',
  },
  de: {
    ariaLabel: 'Erweiterter Workflow',
    eyebrow: 'Erweiterter Workflow',
    title: 'Monitoring, Verlauf oder API noetig?',
    body: 'Die kostenlose Pruefung beantwortet die direkte Frage auf dieser Seite. Groessere Workflows koennen gespeicherten Verlauf, Alerts, Reports, API-Zugriff und regionale Ueberwachung ergaenzen, wenn sie fuer das Konto verfuegbar sind.',
    cta: 'Grenzen pruefen',
  },
} satisfies Record<LocaleCode, { ariaLabel: string; eyebrow: string; title: string; body: string; cta: string }>
const upgradePanelCopy = sanitizePublicCopy(locale, upgradePanelCopyByLocale[locale])
const formCopy = sanitizePublicCopy(locale, {
  expectedValueLabel: 'Expected value (optional)',
  expectedValuePlaceholder: '93.184.216.34 or ns1.example.com',
})
const benchmarkCopyByLocale = {
  en: {
    recordTabsLabel: 'DNS record type shortcuts',
    ipPanelTitle: 'Visible IP now',
    ipPanelBody: 'Use this answer to troubleshoot VPN, proxy, carrier NAT or IPv6 preference. It is not a precise identity or location proof.',
    ipMeaningTitle: 'How to use this IP',
    privacyTitle: 'Private by design',
    privacyBody: 'Inputs and returned values stay out of analytics. The IP result is shown to this browser session and the event only records the tool slug.',
    privacyLink: 'Read privacy details',
    coverageTitle: 'Coverage disclosure',
    coverageBody: 'Current propagation uses controlled resolver snapshots available to this check. It is not a worldwide propagation claim until regional checks are available and documented.',
    relatedTitle: 'Next checks',
    mapTitle: 'Resolver coverage map',
    resolverDetailsTitle: 'Resolver and locality table',
    distinctValuesTitle: 'Values seen by resolvers',
    copySummary: 'Copy safe summary',
  },
  'pt-br': {
    recordTabsLabel: 'Atalhos de tipo DNS',
    ipPanelTitle: 'IP visível agora',
    ipPanelBody: 'Use esta resposta para investigar VPN, proxy, NAT de operadora ou preferência IPv6. Ela não prova identidade nem localização exata.',
    ipMeaningTitle: 'Como usar este IP',
    privacyTitle: 'Privacidade por desenho',
    privacyBody: 'Entradas e valores retornados ficam fora de analytics. O IP aparece apenas nesta sessão do navegador e o evento registra só o slug da ferramenta.',
    privacyLink: 'Ler detalhes de privacidade',
    coverageTitle: 'Cobertura declarada',
    coverageBody: 'A propagação atual usa snapshots de resolvedores controlados disponíveis nesta consulta. Não é uma promessa mundial até checagens regionais reais estarem disponíveis e documentadas.',
    relatedTitle: 'Próximas checagens',
    mapTitle: 'Mapa de cobertura dos resolvedores',
    resolverDetailsTitle: 'Tabela de resolvedor e localidade',
    distinctValuesTitle: 'Valores vistos pelos resolvedores',
    copySummary: 'Copiar resumo seguro',
  },
  es: {
    recordTabsLabel: 'Atajos de tipo DNS',
    ipPanelTitle: 'IP visible ahora',
    ipPanelBody: 'Usa esta respuesta para investigar VPN, proxy, NAT del operador o preferencia IPv6. No prueba identidad ni ubicación exacta.',
    ipMeaningTitle: 'Cómo usar esta IP',
    privacyTitle: 'Privacidad por diseño',
    privacyBody: 'Entradas y valores devueltos quedan fuera de analytics. La IP se muestra solo en esta sesión y el evento registra solo el slug de herramienta.',
    privacyLink: 'Leer privacidad',
    coverageTitle: 'Cobertura declarada',
    coverageBody: 'La propagación actual usa snapshots de resolvers controlados disponibles en esta consulta. No es una promesa mundial hasta que existan chequeos regionales documentados.',
    relatedTitle: 'Siguientes chequeos',
    mapTitle: 'Mapa de cobertura de resolvers',
    resolverDetailsTitle: 'Tabla de resolver y localidad',
    distinctValuesTitle: 'Valores vistos por resolvers',
    copySummary: 'Copiar resumen seguro',
  },
  fr: {
    recordTabsLabel: 'Raccourcis de type DNS',
    ipPanelTitle: 'IP visible maintenant',
    ipPanelBody: 'Utilisez cette réponse pour analyser VPN, proxy, NAT opérateur ou préférence IPv6. Ce résultat ne prouve ni identité ni localisation exacte.',
    ipMeaningTitle: 'Comment utiliser cette IP',
    privacyTitle: 'Confidentialité par conception',
    privacyBody: 'Les entrées et valeurs retournées restent hors analytics. L’IP est affichée dans cette session et l’événement ne garde que le slug outil.',
    privacyLink: 'Lire la confidentialité',
    coverageTitle: 'Couverture déclarée',
    coverageBody: 'La propagation actuelle utilise les snapshots de résolveurs contrôlés disponibles pour ce contrôle. Ce résultat ne promet pas une couverture mondiale avant des contrôles régionaux documentés.',
    relatedTitle: 'Contrôles suivants',
    mapTitle: 'Carte de couverture des résolveurs',
    resolverDetailsTitle: 'Table résolveur et localité',
    distinctValuesTitle: 'Valeurs vues par les résolveurs',
    copySummary: 'Copier le résumé sécurisé',
  },
  de: {
    recordTabsLabel: 'DNS-Typ Kurzwege',
    ipPanelTitle: 'Jetzt sichtbare IP',
    ipPanelBody: 'Nutzen Sie diese Antwort für VPN-, Proxy-, Carrier-NAT- oder IPv6-Analyse. Sie ist kein Identitäts- oder exakter Standortnachweis.',
    ipMeaningTitle: 'So nutzen Sie diese IP',
    privacyTitle: 'Datenschutz im Design',
    privacyBody: 'Eingaben und Rückgabewerte bleiben aus Analytics heraus. Die IP wird nur in dieser Browsersitzung gezeigt; das Event speichert nur den Tool-Slug.',
    privacyLink: 'Datenschutz lesen',
    coverageTitle: 'Abgedeckter Umfang',
    coverageBody: 'Die aktuelle Propagation nutzt kontrollierte Resolver-Snapshots dieser Prüfung. Sie ist keine weltweite Aussage, bis dokumentierte regionale Prüfungen verfügbar sind.',
    relatedTitle: 'Nächste Prüfungen',
    mapTitle: 'Resolver-Abdeckung',
    resolverDetailsTitle: 'Resolver- und Standorttabelle',
    distinctValuesTitle: 'Von Resolvern gesehene Werte',
    copySummary: 'Sichere Zusammenfassung kopieren',
  },
} satisfies Record<LocaleCode, {
  recordTabsLabel: string
  ipPanelTitle: string
  ipPanelBody: string
  ipMeaningTitle: string
  privacyTitle: string
  privacyBody: string
  privacyLink: string
  coverageTitle: string
  coverageBody: string
  relatedTitle: string
  mapTitle: string
  resolverDetailsTitle: string
  distinctValuesTitle: string
  copySummary: string
}>
const benchmarkCopy = sanitizePublicCopy(locale, benchmarkCopyByLocale[locale])
const ipLookupCopyByLocale = {
  en: {
    automaticEyebrow: 'Automatic public IP check',
    publicIpTitle: 'Your public IP is',
    checkingTitle: 'Checking your public IP...',
    loadingBody: 'The page asks the NetProbe API as soon as it loads. No button is required.',
    refreshAction: 'Refresh',
    copyIpAction: 'Copy IP',
    showDetailsAction: 'Show details',
    hideDetailsAction: 'Hide details',
    visibleAddressLabel: 'Visible address',
    protocolLabel: 'Protocol',
    observedByLabel: 'Observed by',
    lastCheckedLabel: 'Last checked',
    publicRangeLabel: 'Public range',
    reviewRangeLabel: 'Review range',
    privacyStatusLabel: 'Privacy status',
    privacyStatusBody: 'Shown only in this browser response; analytics records only the tool slug.',
    ipCopied: 'IP copied locally.',
    copyUnavailable: 'Copy is unavailable in this browser session.',
    unavailable: 'Not available from the current trusted source',
    ispAsnLabel: 'ISP / ASN',
    reverseDnsLabel: 'Reverse DNS',
    locationLabel: 'Approximate location',
    proxyLabel: 'Proxy / VPN / Tor / data center',
    browserLabel: 'Browser',
    platformLabel: 'Platform',
    userAgentLabel: 'User agent summary',
    mapTitle: 'Approximate map',
    mapUnavailable: 'No approximate location was returned by the trusted source, so no map is shown.',
    locationLimit: 'Network location is approximate when available and is not proof of a person, device or exact address.',
    privacyCtaTitle: 'Review privacy options',
    privacyCtaBody: 'If you use VPNs, proxies or privacy tools, compare this visible address with your local connection before troubleshooting.',
    privacyCtaLink: 'Open privacy notes',
    methodologyAccordionTitle: 'Methodology, privacy and limits',
    methodologyAccordionBody: 'The check reports the address observed by the API edge for this browser request. Enrichment appears only when a trusted source provides it.',
    noTrustedDetection: 'No trusted detection source is connected for this signal.',
  },
  'pt-br': {
    automaticEyebrow: 'Consulta automática de IP público',
    publicIpTitle: 'Seu IP público é',
    checkingTitle: 'Verificando seu IP público...',
    loadingBody: 'A página consulta a API do NetProbe assim que carrega. Nenhum botão obrigatório.',
    refreshAction: 'Atualizar',
    copyIpAction: 'Copiar IP',
    showDetailsAction: 'Ver detalhes',
    hideDetailsAction: 'Ocultar detalhes',
    visibleAddressLabel: 'Endereço visível',
    protocolLabel: 'Protocolo',
    observedByLabel: 'Observado por',
    lastCheckedLabel: 'Última checagem',
    publicRangeLabel: 'Faixa pública',
    reviewRangeLabel: 'Revisar faixa',
    privacyStatusLabel: 'Status de privacidade',
    privacyStatusBody: 'Exibido somente nesta resposta do navegador; analytics registra apenas o slug da ferramenta.',
    ipCopied: 'IP copiado localmente.',
    copyUnavailable: 'Cópia indisponível nesta sessão do navegador.',
    unavailable: 'Indisponível na fonte confiável atual',
    ispAsnLabel: 'ISP / ASN',
    reverseDnsLabel: 'DNS reverso',
    locationLabel: 'Localização aproximada',
    proxyLabel: 'Proxy / VPN / Tor / data center',
    browserLabel: 'Navegador',
    platformLabel: 'Plataforma',
    userAgentLabel: 'Resumo do user agent',
    mapTitle: 'Mapa aproximado',
    mapUnavailable: 'Nenhuma localização aproximada foi retornada pela fonte confiável, então o mapa não é exibido.',
    locationLimit: 'Localização de rede é aproximada quando disponível e não prova pessoa, dispositivo ou endereço exato.',
    privacyCtaTitle: 'Revise opções de privacidade',
    privacyCtaBody: 'Se você usa VPNs, proxies ou ferramentas de privacidade, compare este endereço visível com sua conexão local antes de investigar.',
    privacyCtaLink: 'Abrir notas de privacidade',
    methodologyAccordionTitle: 'Metodologia, privacidade e limites',
    methodologyAccordionBody: 'A consulta mostra o endereço observado pela borda da API nesta requisição do navegador. Enriquecimento aparece apenas quando uma fonte confiável fornece o dado.',
    noTrustedDetection: 'Nenhuma fonte confiável de detecção está conectada para este sinal.',
  },
  es: {
    automaticEyebrow: 'Consulta automática de IP pública',
    publicIpTitle: 'Tu IP pública es',
    checkingTitle: 'Comprobando tu IP pública...',
    loadingBody: 'La página consulta la API de NetProbe al cargar. No se requiere botón.',
    refreshAction: 'Actualizar',
    copyIpAction: 'Copiar IP',
    showDetailsAction: 'Ver detalles',
    hideDetailsAction: 'Ocultar detalles',
    visibleAddressLabel: 'Dirección visible',
    protocolLabel: 'Protocolo',
    observedByLabel: 'Observado por',
    lastCheckedLabel: 'Última comprobación',
    publicRangeLabel: 'Rango público',
    reviewRangeLabel: 'Revisar rango',
    privacyStatusLabel: 'Estado de privacidad',
    privacyStatusBody: 'Se muestra solo en esta respuesta del navegador; analytics registra solo el slug de herramienta.',
    ipCopied: 'IP copiada localmente.',
    copyUnavailable: 'La copia no está disponible en esta sesión.',
    unavailable: 'No disponible desde la fuente confiable actual',
    ispAsnLabel: 'ISP / ASN',
    reverseDnsLabel: 'DNS inverso',
    locationLabel: 'Ubicación aproximada',
    proxyLabel: 'Proxy / VPN / Tor / data center',
    browserLabel: 'Navegador',
    platformLabel: 'Plataforma',
    userAgentLabel: 'Resumen de user agent',
    mapTitle: 'Mapa aproximado',
    mapUnavailable: 'La fuente confiable no devolvió ubicación aproximada, por eso no se muestra mapa.',
    locationLimit: 'La ubicación de red es aproximada cuando existe y no prueba persona, dispositivo ni dirección exacta.',
    privacyCtaTitle: 'Revisa opciones de privacidad',
    privacyCtaBody: 'Si usas VPN, proxy o herramientas de privacidad, compara esta dirección visible con tu conexión local antes de investigar.',
    privacyCtaLink: 'Abrir notas de privacidad',
    methodologyAccordionTitle: 'Metodología, privacidad y límites',
    methodologyAccordionBody: 'La consulta muestra la dirección observada por el borde de la API para esta solicitud del navegador. El enriquecimiento aparece solo cuando una fuente confiable lo provee.',
    noTrustedDetection: 'No hay una fuente confiable de detección conectada para esta señal.',
  },
  fr: {
    automaticEyebrow: 'Contrôle IP public automatique',
    publicIpTitle: 'Votre IP publique est',
    checkingTitle: 'Vérification de votre IP publique...',
    loadingBody: 'La page interroge l’API NetProbe dès le chargement. Aucun bouton obligatoire.',
    refreshAction: 'Actualiser',
    copyIpAction: 'Copier l’IP',
    showDetailsAction: 'Voir les détails',
    hideDetailsAction: 'Masquer les détails',
    visibleAddressLabel: 'Adresse visible',
    protocolLabel: 'Protocole',
    observedByLabel: 'Observé par',
    lastCheckedLabel: 'Dernier contrôle',
    publicRangeLabel: 'Plage publique',
    reviewRangeLabel: 'Plage à vérifier',
    privacyStatusLabel: 'Statut confidentialité',
    privacyStatusBody: 'Affiché uniquement dans cette réponse navigateur; analytics garde seulement le slug outil.',
    ipCopied: 'IP copiée localement.',
    copyUnavailable: 'Copie indisponible dans cette session.',
    unavailable: 'Indisponible depuis la source fiable actuelle',
    ispAsnLabel: 'FAI / ASN',
    reverseDnsLabel: 'DNS inverse',
    locationLabel: 'Localisation approximative',
    proxyLabel: 'Proxy / VPN / Tor / data center',
    browserLabel: 'Navigateur',
    platformLabel: 'Plateforme',
    userAgentLabel: 'Résumé user agent',
    mapTitle: 'Carte approximative',
    mapUnavailable: 'Aucune localisation approximative n’a été retournée par la source fiable, donc aucune carte n’est affichée.',
    locationLimit: 'La localisation réseau est approximative lorsqu’elle existe et ne prouve ni personne, ni appareil, ni adresse exacte.',
    privacyCtaTitle: 'Vérifier les options de confidentialité',
    privacyCtaBody: 'Si vous utilisez VPN, proxy ou outils de confidentialité, comparez cette adresse visible avec votre connexion locale avant diagnostic.',
    privacyCtaLink: 'Ouvrir les notes de confidentialité',
    methodologyAccordionTitle: 'Méthodologie, confidentialité et limites',
    methodologyAccordionBody: 'Le contrôle indique l’adresse observée par l’API pour cette requête navigateur. L’enrichissement apparaît seulement lorsqu’une source fiable le fournit.',
    noTrustedDetection: 'Aucune source fiable de détection n’est connectée pour ce signal.',
  },
  de: {
    automaticEyebrow: 'Automatische öffentliche IP-Prüfung',
    publicIpTitle: 'Ihre öffentliche IP ist',
    checkingTitle: 'Öffentliche IP wird geprüft...',
    loadingBody: 'Die Seite fragt die NetProbe API direkt beim Laden ab. Kein Pflichtbutton.',
    refreshAction: 'Aktualisieren',
    copyIpAction: 'IP kopieren',
    showDetailsAction: 'Details anzeigen',
    hideDetailsAction: 'Details ausblenden',
    visibleAddressLabel: 'Sichtbare Adresse',
    protocolLabel: 'Protokoll',
    observedByLabel: 'Beobachtet von',
    lastCheckedLabel: 'Zuletzt geprüft',
    publicRangeLabel: 'Öffentlicher Bereich',
    reviewRangeLabel: 'Bereich prüfen',
    privacyStatusLabel: 'Datenschutzstatus',
    privacyStatusBody: 'Nur in dieser Browserantwort sichtbar; Analytics speichert nur den Tool-Slug.',
    ipCopied: 'IP lokal kopiert.',
    copyUnavailable: 'Kopieren ist in dieser Sitzung nicht verfügbar.',
    unavailable: 'Aus der aktuellen vertrauenswürdigen Quelle nicht verfügbar',
    ispAsnLabel: 'ISP / ASN',
    reverseDnsLabel: 'Reverse DNS',
    locationLabel: 'Ungefährer Standort',
    proxyLabel: 'Proxy / VPN / Tor / Rechenzentrum',
    browserLabel: 'Browser',
    platformLabel: 'Plattform',
    userAgentLabel: 'User-Agent-Zusammenfassung',
    mapTitle: 'Ungefähre Karte',
    mapUnavailable: 'Die vertrauenswürdige Quelle lieferte keinen ungefähren Standort, daher wird keine Karte angezeigt.',
    locationLimit: 'Netzwerkstandort ist nur ungefähr, falls verfügbar, und kein Beweis für Person, Gerät oder exakte Adresse.',
    privacyCtaTitle: 'Datenschutzoptionen prüfen',
    privacyCtaBody: 'Wenn Sie VPNs, Proxys oder Datenschutztools nutzen, vergleichen Sie diese sichtbare Adresse mit Ihrer lokalen Verbindung.',
    privacyCtaLink: 'Datenschutzhinweise öffnen',
    methodologyAccordionTitle: 'Methodik, Datenschutz und Grenzen',
    methodologyAccordionBody: 'Die Prüfung meldet die Adresse, die die API-Kante für diese Browseranfrage sieht. Anreicherung erscheint nur, wenn eine vertrauenswürdige Quelle sie liefert.',
    noTrustedDetection: 'Für dieses Signal ist keine vertrauenswürdige Erkennungsquelle verbunden.',
  },
} satisfies Record<LocaleCode, Record<string, string>>
const ipLookupCopy = sanitizePublicCopy(locale, ipLookupCopyByLocale[locale])
const toolUiCopyByLocale = {
  en: {
    domain: 'Domain',
    hostname: 'Hostname',
    cache: 'Cache',
    cached: 'Cached',
    fresh: 'Fresh',
    checked: 'Checked',
    addressGuard: 'Public address guard',
    recordsReturned: 'Records returned',
    lowestTtl: 'Lowest TTL',
    resolverSource: 'Resolver / source',
    noRecords: 'No records returned.',
    answeredResolvers: 'Answered resolvers',
    expectedValueMatch: 'Expected-value match',
    distinctValues: 'Distinct values',
    differentAnswers: 'Different',
    noAnswerErrors: 'No answer / errors',
    checkedScope: 'Checked scope',
    resolverSnapshot: 'resolver snapshot',
    resolverSnapshots: 'resolver snapshots',
    resolver: 'Resolver',
    region: 'Region',
    ttlMin: 'TTL min',
    values: 'Values',
    noValuesReturned: 'No values returned',
    none: 'None',
    recordType: 'Record type',
    summary: 'Summary',
    type: 'Type',
    name: 'Name',
    value: 'Value',
    ttl: 'TTL',
    source: 'Source',
    fields: 'Fields',
    copyAll: 'Copy all',
    exportJson: 'Export JSON',
    checkPropagation: 'Check propagation',
    checkEmailRecords: 'Check email records',
    copySummary: 'Copy summary',
    shareReport: 'Share report summary',
    checkAnotherRecord: 'Check another record',
    copied: 'Summary copied locally.',
    copyUnavailable: 'Copy is unavailable in this browser session.',
    unavailableType: 'Not available in this public check',
    registrar: 'Registrar',
    registrationDate: 'Registration date',
    updatedDate: 'Updated date',
    expirationDate: 'Expiration date',
    status: 'Status',
    nameservers: 'Nameservers',
    dnssec: 'DNSSEC',
    redactionNotice: 'Redaction notice',
    redactionBody: 'Personal contact data is omitted when registries redact or restrict it.',
    monitorExpiration: 'Monitor expiration',
    checkDns: 'Check DNS',
    checkSsl: 'Check SSL',
    notProvided: 'Not provided',
    unknown: 'Unknown',
    issuer: 'Issuer',
    subject: 'Subject',
    validFrom: 'Valid from',
    validTo: 'Valid to',
    daysLeft: 'Days left',
    chain: 'Chain',
    protocolHints: 'Protocol hints',
    sans: 'Subject alternative names',
    certificateWindow: 'Certificate window',
    valid: 'Valid',
    expiring: 'Expiring soon',
    expired: 'Expired',
    mismatch: 'Hostname mismatch',
    monitorCertificate: 'Monitor certificate expiry',
    sitePulseHeaders: 'Check SitePulse security headers',
    portQuickChoices: 'Common ports',
    portStatus: 'Port status',
    latency: 'Latency',
    resolvedIp: 'Resolved IP',
    notScannerTitle: 'This is not a scanner',
    notScannerBody: 'The public check uses a small allowlist and does not scan ranges or arbitrary ports.',
    reachabilityStatus: 'Reachability status',
    reachable: 'Reachable',
    unreachable: 'Unreachable',
    partial: 'Partial',
    tcpReachability: 'TCP reachability',
    icmpLimit: 'ICMP ping',
    tracerouteLimit: 'Traceroute',
    hops: 'Hops',
    noRealHops: 'No real hops are returned until controlled traceroute probes are available.',
    nextChecks: 'Next checks',
    publicWarningTitle: 'Public-check limits',
    supportTitle: 'Support the free diagnostics',
    supportBody: 'Keep the free checks useful by sharing corrections and using the practical pages first. No payment provider is connected here.',
    supportCta: 'Send a correction',
    sponsorLabel: 'Reserved non-interactive sponsor space',
  },
  'pt-br': {
    domain: 'Domínio',
    hostname: 'Hostname',
    cache: 'Cache',
    cached: 'Em cache',
    fresh: 'Recente',
    checked: 'Checado',
    addressGuard: 'Guarda de endereço público',
    recordsReturned: 'Registros retornados',
    lowestTtl: 'Menor TTL',
    resolverSource: 'Resolvedor / fonte',
    noRecords: 'Nenhum registro retornado.',
    answeredResolvers: 'Resolvedores com resposta',
    expectedValueMatch: 'Match do valor esperado',
    distinctValues: 'Valores distintos',
    differentAnswers: 'Diferentes',
    noAnswerErrors: 'Sem resposta / erros',
    checkedScope: 'Escopo checado',
    resolverSnapshot: 'snapshot de resolvedor',
    resolverSnapshots: 'snapshots de resolvedores',
    resolver: 'Resolvedor',
    region: 'Região',
    ttlMin: 'TTL min',
    values: 'Valores',
    noValuesReturned: 'Nenhum valor retornado',
    none: 'Nenhum',
    recordType: 'Tipo de registro',
    summary: 'Resumo',
    type: 'Tipo',
    name: 'Nome',
    value: 'Valor',
    ttl: 'TTL',
    source: 'Fonte',
    fields: 'Campos',
    copyAll: 'Copiar tudo',
    exportJson: 'Exportar JSON',
    checkPropagation: 'Checar propagação',
    checkEmailRecords: 'Checar e-mail',
    copySummary: 'Copiar resumo',
    shareReport: 'Compartilhar resumo',
    checkAnotherRecord: 'Checar outro registro',
    copied: 'Resumo copiado localmente.',
    copyUnavailable: 'Cópia indisponível nesta sessão do navegador.',
    unavailableType: 'Indisponível nesta consulta pública',
    registrar: 'Registrar',
    registrationDate: 'Data de registro',
    updatedDate: 'Data de atualização',
    expirationDate: 'Data de expiração',
    status: 'Status',
    nameservers: 'Nameservers',
    dnssec: 'DNSSEC',
    redactionNotice: 'Aviso de redação',
    redactionBody: 'Dados pessoais de contato são omitidos quando registries redigem ou restringem essas informações.',
    monitorExpiration: 'Monitorar expiração',
    checkDns: 'Checar DNS',
    checkSsl: 'Checar SSL',
    notProvided: 'Não informado',
    unknown: 'Desconhecido',
    issuer: 'Emissor',
    subject: 'Assunto',
    validFrom: 'Válido desde',
    validTo: 'Válido até',
    daysLeft: 'Dias restantes',
    chain: 'Cadeia',
    protocolHints: 'Pistas de protocolo',
    sans: 'Nomes alternativos',
    certificateWindow: 'Janela do certificado',
    valid: 'Válido',
    expiring: 'Expira em breve',
    expired: 'Expirado',
    mismatch: 'Hostname divergente',
    monitorCertificate: 'Monitorar expiração do certificado',
    sitePulseHeaders: 'Checar headers de segurança no SitePulse',
    portQuickChoices: 'Portas comuns',
    portStatus: 'Status da porta',
    latency: 'Latência',
    resolvedIp: 'IP resolvido',
    notScannerTitle: 'Isto não é scanner',
    notScannerBody: 'A consulta pública usa uma allowlist pequena e não varre faixas nem portas arbitrárias.',
    reachabilityStatus: 'Status de alcance',
    reachable: 'Alcançável',
    unreachable: 'Inalcançável',
    partial: 'Parcial',
    tcpReachability: 'Alcance TCP',
    icmpLimit: 'Ping ICMP',
    tracerouteLimit: 'Traceroute',
    hops: 'Saltos',
    noRealHops: 'Nenhum salto real é retornado até existirem probes controlados de traceroute.',
    nextChecks: 'Próximas checagens',
    publicWarningTitle: 'Limites da consulta pública',
    supportTitle: 'Apoie os diagnósticos gratuitos',
    supportBody: 'Mantenha as consultas gratuitas úteis compartilhando correções e usando primeiro as páginas práticas. Nenhum provedor de pagamento está conectado aqui.',
    supportCta: 'Enviar correção',
    sponsorLabel: 'Espaço reservado não interativo para patrocínio',
  },
  es: {
    domain: 'Dominio',
    hostname: 'Hostname',
    cache: 'Cache',
    cached: 'En cache',
    fresh: 'Reciente',
    checked: 'Comprobado',
    addressGuard: 'Guarda de dirección pública',
    recordsReturned: 'Registros devueltos',
    lowestTtl: 'TTL menor',
    resolverSource: 'Resolver / fuente',
    noRecords: 'No se devolvieron registros.',
    answeredResolvers: 'Resolvers con respuesta',
    expectedValueMatch: 'Coincidencia con valor esperado',
    distinctValues: 'Valores distintos',
    differentAnswers: 'Diferentes',
    noAnswerErrors: 'Sin respuesta / errores',
    checkedScope: 'Alcance comprobado',
    resolverSnapshot: 'snapshot de resolver',
    resolverSnapshots: 'snapshots de resolvers',
    resolver: 'Resolver',
    region: 'Región',
    ttlMin: 'TTL min',
    values: 'Valores',
    noValuesReturned: 'No se devolvieron valores',
    none: 'Ninguno',
    recordType: 'Tipo de registro',
    summary: 'Resumen',
    type: 'Tipo',
    name: 'Nombre',
    value: 'Valor',
    ttl: 'TTL',
    source: 'Fuente',
    fields: 'Campos',
    copyAll: 'Copiar todo',
    exportJson: 'Exportar JSON',
    checkPropagation: 'Comprobar propagación',
    checkEmailRecords: 'Comprobar e-mail',
    copySummary: 'Copiar resumen',
    shareReport: 'Compartir resumen',
    checkAnotherRecord: 'Comprobar otro registro',
    copied: 'Resumen copiado localmente.',
    copyUnavailable: 'La copia no está disponible en esta sesión.',
    unavailableType: 'No disponible en esta consulta pública',
    registrar: 'Registrar',
    registrationDate: 'Fecha de registro',
    updatedDate: 'Fecha de actualización',
    expirationDate: 'Fecha de expiración',
    status: 'Estado',
    nameservers: 'Nameservers',
    dnssec: 'DNSSEC',
    redactionNotice: 'Aviso de redacción',
    redactionBody: 'Los datos personales de contacto se omiten cuando los registries los redactan o restringen.',
    monitorExpiration: 'Monitorear expiración',
    checkDns: 'Comprobar DNS',
    checkSsl: 'Comprobar SSL',
    notProvided: 'No informado',
    unknown: 'Desconocido',
    issuer: 'Emisor',
    subject: 'Sujeto',
    validFrom: 'Válido desde',
    validTo: 'Válido hasta',
    daysLeft: 'Días restantes',
    chain: 'Cadena',
    protocolHints: 'Pistas de protocolo',
    sans: 'Nombres alternativos',
    certificateWindow: 'Ventana del certificado',
    valid: 'Válido',
    expiring: 'Expira pronto',
    expired: 'Expirado',
    mismatch: 'Hostname no coincide',
    monitorCertificate: 'Monitorear expiración del certificado',
    sitePulseHeaders: 'Comprobar headers de seguridad en SitePulse',
    portQuickChoices: 'Puertos comunes',
    portStatus: 'Estado del puerto',
    latency: 'Latencia',
    resolvedIp: 'IP resuelta',
    notScannerTitle: 'Esto no es un escáner',
    notScannerBody: 'La consulta pública usa una allowlist pequeña y no escanea rangos ni puertos arbitrarios.',
    reachabilityStatus: 'Estado de alcance',
    reachable: 'Alcanzable',
    unreachable: 'Inalcanzable',
    partial: 'Parcial',
    tcpReachability: 'Alcance TCP',
    icmpLimit: 'Ping ICMP',
    tracerouteLimit: 'Traceroute',
    hops: 'Saltos',
    noRealHops: 'No se devuelven saltos reales hasta tener probes controlados de traceroute.',
    nextChecks: 'Siguientes chequeos',
    publicWarningTitle: 'Límites de la consulta pública',
    supportTitle: 'Apoya los diagnósticos gratuitos',
    supportBody: 'Mantén útiles las consultas gratuitas compartiendo correcciones y usando primero las páginas prácticas. Ningún proveedor de pago está conectado aquí.',
    supportCta: 'Enviar corrección',
    sponsorLabel: 'Espacio reservado no interactivo para patrocinio',
  },
  fr: {
    domain: 'Domaine',
    hostname: 'Hostname',
    cache: 'Cache',
    cached: 'En cache',
    fresh: 'Récent',
    checked: 'Contrôlé',
    addressGuard: 'Garde adresse publique',
    recordsReturned: 'Enregistrements retournés',
    lowestTtl: 'TTL le plus bas',
    resolverSource: 'Résolveur / source',
    noRecords: 'Aucun enregistrement retourné.',
    answeredResolvers: 'Résolveurs avec réponse',
    expectedValueMatch: 'Correspondance valeur attendue',
    distinctValues: 'Valeurs distinctes',
    differentAnswers: 'Différentes',
    noAnswerErrors: 'Sans réponse / erreurs',
    checkedScope: 'Périmètre contrôlé',
    resolverSnapshot: 'snapshot de résolveur',
    resolverSnapshots: 'snapshots de résolveurs',
    resolver: 'Résolveur',
    region: 'Région',
    ttlMin: 'TTL min',
    values: 'Valeurs',
    noValuesReturned: 'Aucune valeur retournée',
    none: 'Aucun',
    recordType: 'Type d’enregistrement',
    summary: 'Résumé',
    type: 'Type',
    name: 'Nom',
    value: 'Valeur',
    ttl: 'TTL',
    source: 'Source',
    fields: 'Champs',
    copyAll: 'Tout copier',
    exportJson: 'Exporter JSON',
    checkPropagation: 'Contrôler la propagation',
    checkEmailRecords: 'Contrôler l’e-mail',
    copySummary: 'Copier le résumé',
    shareReport: 'Partager le résumé',
    checkAnotherRecord: 'Contrôler un autre enregistrement',
    copied: 'Résumé copié localement.',
    copyUnavailable: 'Copie indisponible dans cette session.',
    unavailableType: 'Indisponible dans ce contrôle public',
    registrar: 'Registrar',
    registrationDate: 'Date d’enregistrement',
    updatedDate: 'Date de mise à jour',
    expirationDate: 'Date d’expiration',
    status: 'Statut',
    nameservers: 'Nameservers',
    dnssec: 'DNSSEC',
    redactionNotice: 'Avis de rédaction',
    redactionBody: 'Les données personnelles de contact sont omises lorsque les registres les rédigent ou les restreignent.',
    monitorExpiration: 'Surveiller l’expiration',
    checkDns: 'Contrôler DNS',
    checkSsl: 'Contrôler SSL',
    notProvided: 'Non fourni',
    unknown: 'Inconnu',
    issuer: 'Émetteur',
    subject: 'Sujet',
    validFrom: 'Valide depuis',
    validTo: 'Valide jusqu’au',
    daysLeft: 'Jours restants',
    chain: 'Chaîne',
    protocolHints: 'Indices protocole',
    sans: 'Noms alternatifs',
    certificateWindow: 'Fenêtre du certificat',
    valid: 'Valide',
    expiring: 'Expire bientôt',
    expired: 'Expiré',
    mismatch: 'Hostname différent',
    monitorCertificate: 'Surveiller l’expiration du certificat',
    sitePulseHeaders: 'Contrôler les headers sécurité dans SitePulse',
    portQuickChoices: 'Ports courants',
    portStatus: 'Statut du port',
    latency: 'Latence',
    resolvedIp: 'IP résolue',
    notScannerTitle: 'Ce n’est pas un scanner',
    notScannerBody: 'Le contrôle public utilise une petite allowlist et ne scanne ni plages ni ports arbitraires.',
    reachabilityStatus: 'Statut d’accessibilité',
    reachable: 'Accessible',
    unreachable: 'Inaccessible',
    partial: 'Partiel',
    tcpReachability: 'Accessibilité TCP',
    icmpLimit: 'Ping ICMP',
    tracerouteLimit: 'Traceroute',
    hops: 'Hops',
    noRealHops: 'Aucun hop réel n’est retourné avant disponibilité de probes traceroute contrôlés.',
    nextChecks: 'Contrôles suivants',
    publicWarningTitle: 'Limites du contrôle public',
    supportTitle: 'Soutenir les diagnostics gratuits',
    supportBody: 'Gardez les contrôles gratuits utiles en partageant des corrections et en utilisant d’abord les pages pratiques. Aucun fournisseur de paiement n’est connecté ici.',
    supportCta: 'Envoyer une correction',
    sponsorLabel: 'Espace réservé non interactif pour sponsoring',
  },
  de: {
    domain: 'Domain',
    hostname: 'Hostname',
    cache: 'Cache',
    cached: 'Aus Cache',
    fresh: 'Frisch',
    checked: 'Geprüft',
    addressGuard: 'Öffentliche Adressprüfung',
    recordsReturned: 'Einträge zurückgegeben',
    lowestTtl: 'Niedrigste TTL',
    resolverSource: 'Resolver / Quelle',
    noRecords: 'Keine Einträge zurückgegeben.',
    answeredResolvers: 'Resolver mit Antwort',
    expectedValueMatch: 'Abgleich mit erwartetem Wert',
    distinctValues: 'Unterschiedliche Werte',
    differentAnswers: 'Abweichend',
    noAnswerErrors: 'Keine Antwort / Fehler',
    checkedScope: 'Geprüfter Umfang',
    resolverSnapshot: 'Resolver-Snapshot',
    resolverSnapshots: 'Resolver-Snapshots',
    resolver: 'Resolver',
    region: 'Region',
    ttlMin: 'TTL min',
    values: 'Werte',
    noValuesReturned: 'Keine Werte zurückgegeben',
    none: 'Keine',
    recordType: 'Eintragstyp',
    summary: 'Zusammenfassung',
    type: 'Typ',
    name: 'Name',
    value: 'Wert',
    ttl: 'TTL',
    source: 'Quelle',
    fields: 'Felder',
    copyAll: 'Alles kopieren',
    exportJson: 'JSON exportieren',
    checkPropagation: 'Propagation prüfen',
    checkEmailRecords: 'E-Mail prüfen',
    copySummary: 'Zusammenfassung kopieren',
    shareReport: 'Zusammenfassung teilen',
    checkAnotherRecord: 'Anderen Eintrag prüfen',
    copied: 'Zusammenfassung lokal kopiert.',
    copyUnavailable: 'Kopieren ist in dieser Sitzung nicht verfügbar.',
    unavailableType: 'In dieser öffentlichen Prüfung nicht verfügbar',
    registrar: 'Registrar',
    registrationDate: 'Registrierungsdatum',
    updatedDate: 'Aktualisiert am',
    expirationDate: 'Ablaufdatum',
    status: 'Status',
    nameservers: 'Nameserver',
    dnssec: 'DNSSEC',
    redactionNotice: 'Redaktionshinweis',
    redactionBody: 'Persönliche Kontaktdaten werden ausgelassen, wenn Registries sie redigieren oder beschränken.',
    monitorExpiration: 'Ablauf überwachen',
    checkDns: 'DNS prüfen',
    checkSsl: 'SSL prüfen',
    notProvided: 'Nicht angegeben',
    unknown: 'Unbekannt',
    issuer: 'Aussteller',
    subject: 'Subject',
    validFrom: 'Gültig ab',
    validTo: 'Gültig bis',
    daysLeft: 'Tage übrig',
    chain: 'Kette',
    protocolHints: 'Protokollhinweise',
    sans: 'Alternative Namen',
    certificateWindow: 'Zertifikatsfenster',
    valid: 'Gültig',
    expiring: 'Läuft bald ab',
    expired: 'Abgelaufen',
    mismatch: 'Hostname passt nicht',
    monitorCertificate: 'Zertifikatsablauf überwachen',
    sitePulseHeaders: 'SitePulse Security Headers prüfen',
    portQuickChoices: 'Häufige Ports',
    portStatus: 'Portstatus',
    latency: 'Latenz',
    resolvedIp: 'Aufgelöste IP',
    notScannerTitle: 'Dies ist kein Scanner',
    notScannerBody: 'Die öffentliche Prüfung nutzt eine kleine Allowlist und scannt keine Bereiche oder beliebigen Ports.',
    reachabilityStatus: 'Erreichbarkeitsstatus',
    reachable: 'Erreichbar',
    unreachable: 'Nicht erreichbar',
    partial: 'Teilweise',
    tcpReachability: 'TCP-Erreichbarkeit',
    icmpLimit: 'ICMP-Ping',
    tracerouteLimit: 'Traceroute',
    hops: 'Hops',
    noRealHops: 'Reale Hops werden erst mit kontrollierten Traceroute-Probes zurückgegeben.',
    nextChecks: 'Nächste Prüfungen',
    publicWarningTitle: 'Grenzen der öffentlichen Prüfung',
    supportTitle: 'Kostenlose Diagnosen unterstützen',
    supportBody: 'Halten Sie die kostenlosen Prüfungen nützlich, indem Sie Korrekturen teilen und zuerst die praktischen Seiten nutzen. Hier ist kein Zahlungsanbieter verbunden.',
    supportCta: 'Korrektur senden',
    sponsorLabel: 'Reservierter nicht interaktiver Sponsoringbereich',
  },
} satisfies Record<LocaleCode, Record<string, string>>
const toolUiCopy = sanitizePublicCopy(locale, toolUiCopyByLocale[locale])
const dnsLookupRecordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SOA', 'CAA'] as const
const propagationRecordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS'] as const
const dnsVisualRecordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT', 'CAA'] as const
const quickPorts = [80, 443, 587, 993] as const
const runtimeConfig = useRuntimeConfig()
const previewSubmitted = ref(false)
const targetValue = ref(tool.slug === 'what-is-my-ip' ? '' : tool.exampleTarget)
const selectedRecordTypes = ref(['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SOA', 'CAA'])
const propagationRecordType = ref('A')
const expectedPropagationValue = ref('')
const selectedPort = ref(443)
const isLoading = ref(false)
const errorMessage = ref('')
const copyNotice = ref('')
const dnsResult = ref<DnsLookupData | null>(null)
const dnsMeta = ref<Record<string, unknown>>({})
const ipResult = ref<ClientIpData | null>(null)
const ipMeta = ref<Record<string, unknown>>({})
const showIpDetails = ref(false)
const browserDetails = ref({
  browser: ipLookupCopy.unavailable,
  platform: ipLookupCopy.unavailable,
  userAgent: ipLookupCopy.unavailable,
})
const rdapResult = ref<RdapLookupData | null>(null)
const rdapMeta = ref<Record<string, unknown>>({})
const sslResult = ref<SslCertificateData | null>(null)
const sslMeta = ref<Record<string, unknown>>({})
const propagationResult = ref<DnsPropagationData | null>(null)
const propagationMeta = ref<Record<string, unknown>>({})
const portResult = ref<PortCheckData | null>(null)
const portMeta = ref<Record<string, unknown>>({})
const reachabilityResult = ref<ReachabilityData | null>(null)
const reachabilityMeta = ref<Record<string, unknown>>({})
const isDnsLookup = computed(() => tool.slug === 'dns-lookup')
const isIpLookup = computed(() => tool.slug === 'what-is-my-ip')
const isRdapLookup = computed(() => tool.slug === 'rdap-domain-lookup')
const isSslLookup = computed(() => tool.slug === 'ssl-certificate-checker')
const isPropagationLookup = computed(() => tool.slug === 'dns-propagation')
const isPortCheck = computed(() => tool.slug === 'port-checker')
const isReachabilityCheck = computed(() => tool.slug === 'ping-traceroute')
const isLiveTool = computed(() => (
  isDnsLookup.value
  || isIpLookup.value
  || isRdapLookup.value
  || isSslLookup.value
  || isPropagationLookup.value
  || isPortCheck.value
  || isReachabilityCheck.value
))
const relatedTools = computed(() => toolCatalog
  .filter((candidate) => candidate.slug !== tool.slug)
  .filter((candidate) => candidate.category === tool.category || ['what-is-my-ip', 'dns-lookup', 'dns-propagation'].includes(candidate.slug))
  .slice(0, 3))

interface DnsRecord {
  type: string
  ttl: number
  value: string
  fields: Record<string, unknown>
}

interface DnsLookupData {
  domain: string
  queried_types: string[]
  checked_addresses: string[]
  records: Record<string, DnsRecord[]>
}

interface ClientIpData {
  address: string
  version: string
  is_public: boolean
  source: string
}

interface RdapLookupData {
  domain: string
  handle: string | null
  registrar: {
    name: string | null
    handle: string | null
  }
  statuses: string[]
  registered_at: string | null
  updated_at: string | null
  expires_at: string | null
  age_days: number | null
  days_until_expiration: number | null
  nameservers: string[]
  limitations: string[]
}

interface SslCertificateData {
  hostname: string
  checked_addresses: string[]
  subject: {
    common_name?: string | null
    organization?: string | null
  }
  issuer: {
    common_name?: string | null
    organization?: string | null
  }
  serial_number: string | null
  valid_from: string | null
  valid_to: string | null
  days_until_expiration: number | null
  is_expired: boolean
  matches_hostname: boolean
  subject_alt_names: string[]
  chain_count: number
  fingerprint_sha256: string | null
}

interface DnsPropagationSnapshot {
  resolver_id: string
  region: string
  status: string
  ttl_min: number | null
  values: string[]
}

interface DnsPropagationData {
  domain: string
  record_type: string
  checked_addresses: string[]
  snapshots: DnsPropagationSnapshot[]
}

interface TcpCheck {
  address: string
  status: string
  latency_ms: number | null
  error: string | null
}

interface PortCheckData {
  hostname: string
  port: number
  checked_addresses: string[]
  checks: TcpCheck[]
  overall_status: string
}

interface ReachabilityData {
  hostname: string
  checked_addresses: string[]
  tcp_443: TcpCheck
  icmp: {
    status: string
    reason: string
  }
  traceroute: {
    status: string
    reason: string
  }
}

interface ApiResponse<T> {
  data: T
  meta: Record<string, unknown>
}

interface SummaryCard {
  label: string
  value: string
  tone?: 'good' | 'warning' | 'neutral'
}

interface DetailCard {
  label: string
  value: string
  note?: string
}

function netprobeEndpoint(path: string): string {
  return `${String(runtimeConfig.public.netprobeApiBaseUrl).replace(/\/+$/g, '')}/${path}`
}

function formatMetaDate(meta: Record<string, unknown>): string {
  const generatedAt = typeof meta.generated_at === 'string' ? meta.generated_at : ''

  if (!generatedAt) {
    return 'Just now'
  }

  try {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(generatedAt))
  } catch {
    return generatedAt
  }
}

function normalizeCompareValue(value: string): string {
  return value.trim().toLowerCase().replace(/\.$/, '')
}

function summarizeUserAgent(userAgent: string): string {
  if (!userAgent) {
    return ipLookupCopy.unavailable
  }

  return userAgent.length > 118 ? `${userAgent.slice(0, 115)}...` : userAgent
}

function detectBrowserName(userAgent: string): string {
  if (/Edg\//.test(userAgent)) {
    return 'Microsoft Edge'
  }

  if (/Firefox\//.test(userAgent)) {
    return 'Firefox'
  }

  if (/Chrome\//.test(userAgent) && !/Chromium\//.test(userAgent)) {
    return 'Chrome'
  }

  if (/Safari\//.test(userAgent) && !/Chrome\//.test(userAgent)) {
    return 'Safari'
  }

  return ipLookupCopy.unavailable
}

function updateBrowserDetails(): void {
  if (typeof navigator === 'undefined') {
    return
  }

  browserDetails.value = {
    browser: detectBrowserName(navigator.userAgent),
    platform: navigator.platform || ipLookupCopy.unavailable,
    userAgent: summarizeUserAgent(navigator.userAgent),
  }
}

const ipSummaryCards = computed<SummaryCard[]>(() => {
  if (!ipResult.value) {
    return []
  }

  return [
    {
      label: ipLookupCopy.visibleAddressLabel,
      value: ipResult.value.address,
      tone: ipResult.value.is_public ? 'good' : 'warning',
    },
    {
      label: ipLookupCopy.protocolLabel,
      value: ipResult.value.version,
      tone: 'neutral',
    },
    {
      label: ipLookupCopy.observedByLabel,
      value: ipResult.value.source,
      tone: 'neutral',
    },
    {
      label: ipLookupCopy.lastCheckedLabel,
      value: formatMetaDate(ipMeta.value),
      tone: 'neutral',
    },
  ]
})

const ipDetailCards = computed<DetailCard[]>(() => [
  {
    label: ipLookupCopy.ispAsnLabel,
    value: ipLookupCopy.unavailable,
    note: ipLookupCopy.noTrustedDetection,
  },
  {
    label: ipLookupCopy.reverseDnsLabel,
    value: ipLookupCopy.unavailable,
    note: ipLookupCopy.noTrustedDetection,
  },
  {
    label: ipLookupCopy.locationLabel,
    value: ipLookupCopy.unavailable,
    note: ipLookupCopy.locationLimit,
  },
  {
    label: ipLookupCopy.proxyLabel,
    value: ipLookupCopy.unavailable,
    note: ipLookupCopy.noTrustedDetection,
  },
  {
    label: ipLookupCopy.browserLabel,
    value: browserDetails.value.browser,
  },
  {
    label: ipLookupCopy.platformLabel,
    value: browserDetails.value.platform,
  },
  {
    label: ipLookupCopy.userAgentLabel,
    value: browserDetails.value.userAgent,
  },
])

function isDnsLookupRecordTypeAvailable(recordType: string): boolean {
  return dnsLookupRecordTypes.includes(recordType as (typeof dnsLookupRecordTypes)[number])
}

function isPropagationRecordTypeAvailable(recordType: string): boolean {
  return propagationRecordTypes.includes(recordType as (typeof propagationRecordTypes)[number])
}

function metaNumber(meta: Record<string, unknown>, key: string): number | null {
  return typeof meta[key] === 'number' ? meta[key] : null
}

function metaBoolean(meta: Record<string, unknown>, key: string): boolean {
  return meta[key] === true
}

function metaMessages(meta: Record<string, unknown>): string[] {
  return ['warnings', 'limitations']
    .flatMap((key) => Array.isArray(meta[key]) ? meta[key] : [])
    .filter((item): item is string => typeof item === 'string')
    .filter((item) => !/Sprint|planned|worker|production|deploy|rollback|placeholder/i.test(item))
}

function formatCache(meta: Record<string, unknown>): string {
  const cacheTtl = metaNumber(meta, 'cache_ttl_seconds')
  const cacheState = metaBoolean(meta, 'cached') ? toolUiCopy.cached : toolUiCopy.fresh

  return cacheTtl ? `${cacheState} / ${cacheTtl}s` : cacheState
}

function formatNullable(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === '') {
    return toolUiCopy.notProvided
  }

  return String(value)
}

const selectedDnsTypesForRequest = computed(() => selectedRecordTypes.value.filter(isDnsLookupRecordTypeAvailable))

const dnsRecordRows = computed(() => {
  if (!dnsResult.value) {
    return []
  }

  return dnsResult.value.queried_types.flatMap((recordType) => (dnsResult.value?.records[recordType] ?? []).map((record) => ({
    ...record,
    name: dnsResult.value?.domain ?? '',
    source: 'NetProbe resolver',
  })))
})

const dnsSummaryCards = computed<SummaryCard[]>(() => {
  if (!dnsResult.value) {
    return []
  }

  const ttlValues = dnsRecordRows.value.map((record) => record.ttl).filter((ttl) => ttl > 0)

  return [
    {
      label: toolUiCopy.domain,
      value: dnsResult.value.domain,
      tone: 'neutral',
    },
    {
      label: toolUiCopy.recordsReturned,
      value: String(dnsRecordRows.value.length),
      tone: dnsRecordRows.value.length > 0 ? 'good' : 'warning',
    },
    {
      label: toolUiCopy.lowestTtl,
      value: ttlValues.length ? `${Math.min(...ttlValues)}s` : toolUiCopy.unknown,
      tone: 'neutral',
    },
    {
      label: toolUiCopy.resolverSource,
      value: 'NetProbe resolver',
      tone: 'neutral',
    },
  ]
})

const rdapSummaryCards = computed<SummaryCard[]>(() => {
  if (!rdapResult.value) {
    return []
  }

  return [
    {
      label: toolUiCopy.domain,
      value: rdapResult.value.domain,
      tone: 'neutral',
    },
    {
      label: toolUiCopy.registrar,
      value: rdapResult.value.registrar.name || toolUiCopy.notProvided,
      tone: rdapResult.value.registrar.name ? 'good' : 'warning',
    },
    {
      label: toolUiCopy.expirationDate,
      value: rdapResult.value.expires_at || toolUiCopy.notProvided,
      tone: typeof rdapResult.value.days_until_expiration === 'number' && rdapResult.value.days_until_expiration < 30 ? 'warning' : 'neutral',
    },
    {
      label: toolUiCopy.status,
      value: rdapResult.value.statuses[0] ?? toolUiCopy.notProvided,
      tone: 'neutral',
    },
  ]
})

const sslStatus = computed<SummaryCard>(() => {
  if (!sslResult.value) {
    return {
      label: toolUiCopy.status,
      value: toolUiCopy.unknown,
      tone: 'neutral',
    }
  }

  if (sslResult.value.is_expired) {
    return {
      label: toolUiCopy.status,
      value: toolUiCopy.expired,
      tone: 'warning',
    }
  }

  if (!sslResult.value.matches_hostname) {
    return {
      label: toolUiCopy.status,
      value: toolUiCopy.mismatch,
      tone: 'warning',
    }
  }

  if (typeof sslResult.value.days_until_expiration === 'number' && sslResult.value.days_until_expiration <= 14) {
    return {
      label: toolUiCopy.status,
      value: toolUiCopy.expiring,
      tone: 'warning',
    }
  }

  return {
    label: toolUiCopy.status,
    value: toolUiCopy.valid,
    tone: 'good',
  }
})

const sslSummaryCards = computed<SummaryCard[]>(() => {
  if (!sslResult.value) {
    return []
  }

  return [
    sslStatus.value,
    {
      label: toolUiCopy.issuer,
      value: sslResult.value.issuer.common_name || sslResult.value.issuer.organization || toolUiCopy.notProvided,
      tone: 'neutral',
    },
    {
      label: toolUiCopy.daysLeft,
      value: formatNullable(sslResult.value.days_until_expiration),
      tone: typeof sslResult.value.days_until_expiration === 'number' && sslResult.value.days_until_expiration <= 14 ? 'warning' : 'neutral',
    },
    {
      label: toolUiCopy.chain,
      value: String(sslResult.value.chain_count),
      tone: 'neutral',
    },
  ]
})

const sslExpiryPercent = computed(() => {
  if (!sslResult.value || typeof sslResult.value.days_until_expiration !== 'number') {
    return 0
  }

  if (sslResult.value.days_until_expiration <= 0) {
    return 100
  }

  return Math.max(0, Math.min(100, 100 - Math.round((sslResult.value.days_until_expiration / 90) * 100)))
})

const portSummaryCards = computed<SummaryCard[]>(() => {
  if (!portResult.value) {
    return []
  }

  const firstCheck = portResult.value.checks[0]
  const open = portResult.value.overall_status === 'open'

  return [
    {
      label: toolUiCopy.portStatus,
      value: portResult.value.overall_status,
      tone: open ? 'good' : 'warning',
    },
    {
      label: toolUiCopy.hostname,
      value: portResult.value.hostname,
      tone: 'neutral',
    },
    {
      label: toolUiCopy.resolvedIp,
      value: firstCheck?.address ?? toolUiCopy.notProvided,
      tone: 'neutral',
    },
    {
      label: toolUiCopy.latency,
      value: typeof firstCheck?.latency_ms === 'number' ? `${firstCheck.latency_ms}ms` : toolUiCopy.unknown,
      tone: 'neutral',
    },
  ]
})

const reachabilityStatus = computed<SummaryCard>(() => {
  const tcpStatus = reachabilityResult.value?.tcp_443.status

  if (tcpStatus === 'open') {
    return {
      label: toolUiCopy.reachabilityStatus,
      value: toolUiCopy.reachable,
      tone: 'good',
    }
  }

  if (tcpStatus) {
    return {
      label: toolUiCopy.reachabilityStatus,
      value: toolUiCopy.partial,
      tone: 'warning',
    }
  }

  return {
    label: toolUiCopy.reachabilityStatus,
    value: toolUiCopy.unreachable,
    tone: 'warning',
  }
})

const reachabilitySummaryCards = computed<SummaryCard[]>(() => {
  if (!reachabilityResult.value) {
    return []
  }

  return [
    reachabilityStatus.value,
    {
      label: 'TCP 443',
      value: reachabilityResult.value.tcp_443.status,
      tone: reachabilityResult.value.tcp_443.status === 'open' ? 'good' : 'warning',
    },
    {
      label: toolUiCopy.latency,
      value: typeof reachabilityResult.value.tcp_443.latency_ms === 'number' ? `${reachabilityResult.value.tcp_443.latency_ms} ms` : toolUiCopy.unknown,
      tone: 'neutral',
    },
    {
      label: toolUiCopy.resolvedIp,
      value: reachabilityResult.value.tcp_443.address,
      tone: 'neutral',
    },
  ]
})

const propagationSummaryCards = computed<SummaryCard[]>(() => {
  if (!propagationResult.value) {
    return []
  }

  const snapshots = propagationResult.value.snapshots
  const expectedValue = normalizeCompareValue(expectedPropagationValue.value)
  const total = snapshots.length
  const answered = snapshots.filter((snapshot) => snapshot.status === 'answered' && snapshot.values.length > 0).length
  const matched = expectedValue
    ? snapshots.filter((snapshot) => snapshot.values.some((value) => normalizeCompareValue(value) === expectedValue)).length
    : answered
  const different = expectedValue
    ? snapshots.filter((snapshot) => snapshot.values.length > 0 && !snapshot.values.some((value) => normalizeCompareValue(value) === expectedValue)).length
    : 0
  const noAnswer = snapshots.filter((snapshot) => snapshot.values.length === 0 || snapshot.status === 'empty').length
  const errors = snapshots.filter((snapshot) => !['answered', 'empty'].includes(snapshot.status)).length
  const distinctValues = new Set(snapshots.flatMap((snapshot) => snapshot.values.map((value) => normalizeCompareValue(value))).filter(Boolean))
  const ttlValues = snapshots.map((snapshot) => snapshot.ttl_min).filter((value): value is number => typeof value === 'number')
  const percent = total > 0 ? Math.round((matched / total) * 100) : 0

  return [
    {
      label: expectedValue ? toolUiCopy.expectedValueMatch : toolUiCopy.answeredResolvers,
      value: total > 0 ? `${matched}/${total} (${percent}%)` : '0/0',
      tone: percent >= 80 ? 'good' : percent > 0 ? 'warning' : 'neutral',
    },
    {
      label: toolUiCopy.distinctValues,
      value: String(distinctValues.size),
      tone: distinctValues.size <= 1 ? 'good' : 'warning',
    },
    {
      label: toolUiCopy.differentAnswers,
      value: String(different),
      tone: different === 0 ? 'good' : 'warning',
    },
    {
      label: toolUiCopy.noAnswerErrors,
      value: `${noAnswer} / ${errors}`,
      tone: noAnswer === 0 && errors === 0 ? 'good' : 'warning',
    },
    {
      label: toolUiCopy.checkedScope,
      value: `${total} ${total === 1 ? toolUiCopy.resolverSnapshot : toolUiCopy.resolverSnapshots}`,
      tone: 'neutral',
    },
    {
      label: toolUiCopy.checked,
      value: formatMetaDate(propagationMeta.value),
      tone: 'neutral',
    },
  ]
})

const propagationDistinctValues = computed(() => {
  if (!propagationResult.value) {
    return []
  }

  return Array.from(new Set(propagationResult.value.snapshots.flatMap((snapshot) => snapshot.values))).slice(0, 6)
})

function buildSafeSummary(): string {
  if (ipResult.value) {
    return [
      'NetProbe Atlas IP check',
      `Version: ${ipResult.value.version}`,
      `Public range: ${ipResult.value.is_public ? 'yes' : 'no'}`,
      `Observed source: ${ipResult.value.source}`,
      `Checked: ${formatMetaDate(ipMeta.value)}`,
    ].join('\n')
  }

  if (dnsResult.value) {
    return [
      'NetProbe Atlas DNS lookup',
      `${toolUiCopy.domain}: ${dnsResult.value.domain}`,
      `${toolUiCopy.recordsReturned}: ${dnsRecordRows.value.length}`,
      `${toolUiCopy.type}: ${dnsResult.value.queried_types.join(', ')}`,
      `${toolUiCopy.checked}: ${formatMetaDate(dnsMeta.value)}`,
      ...dnsRecordRows.value.map((record) => `${record.type} ${record.name} ${record.value} TTL ${record.ttl}`),
    ].join('\n')
  }

  if (rdapResult.value) {
    return [
      'NetProbe Atlas RDAP lookup',
      `${toolUiCopy.domain}: ${rdapResult.value.domain}`,
      `${toolUiCopy.registrar}: ${rdapResult.value.registrar.name || toolUiCopy.notProvided}`,
      `${toolUiCopy.registrationDate}: ${formatNullable(rdapResult.value.registered_at)}`,
      `${toolUiCopy.updatedDate}: ${formatNullable(rdapResult.value.updated_at)}`,
      `${toolUiCopy.expirationDate}: ${formatNullable(rdapResult.value.expires_at)}`,
      `${toolUiCopy.status}: ${rdapResult.value.statuses.join(', ') || toolUiCopy.notProvided}`,
      `${toolUiCopy.nameservers}: ${rdapResult.value.nameservers.join(', ') || toolUiCopy.notProvided}`,
    ].join('\n')
  }

  if (sslResult.value) {
    return [
      'NetProbe Atlas SSL certificate check',
      `${toolUiCopy.hostname}: ${sslResult.value.hostname}`,
      `${toolUiCopy.status}: ${sslStatus.value.value}`,
      `${toolUiCopy.issuer}: ${sslResult.value.issuer.common_name || sslResult.value.issuer.organization || toolUiCopy.notProvided}`,
      `${toolUiCopy.subject}: ${sslResult.value.subject.common_name || sslResult.value.subject.organization || toolUiCopy.notProvided}`,
      `${toolUiCopy.validTo}: ${formatNullable(sslResult.value.valid_to)}`,
      `${toolUiCopy.daysLeft}: ${formatNullable(sslResult.value.days_until_expiration)}`,
      `${toolUiCopy.chain}: ${sslResult.value.chain_count}`,
    ].join('\n')
  }

  if (propagationResult.value) {
    return [
      'NetProbe Atlas DNS propagation snapshot',
      `${toolUiCopy.recordType}: ${propagationResult.value.record_type}`,
      `${toolUiCopy.summary}: ${propagationSummaryCards.value.map((card) => `${card.label} ${card.value}`).join('; ')}`,
      `${toolUiCopy.distinctValues}: ${propagationDistinctValues.value.join(', ') || toolUiCopy.none}`,
      `${toolUiCopy.checked}: ${formatMetaDate(propagationMeta.value)}`,
    ].join('\n')
  }

  if (portResult.value) {
    return [
      'NetProbe Atlas port check',
      `${toolUiCopy.hostname}: ${portResult.value.hostname}`,
      `${shellCopy.portLabel}: ${portResult.value.port}`,
      `${toolUiCopy.portStatus}: ${portResult.value.overall_status}`,
      ...portResult.value.checks.map((check) => `${check.address} ${check.status} ${check.latency_ms ?? 'n/a'} ms`),
    ].join('\n')
  }

  if (reachabilityResult.value) {
    return [
      'NetProbe Atlas reachability check',
      `${toolUiCopy.hostname}: ${reachabilityResult.value.hostname}`,
      `${toolUiCopy.reachabilityStatus}: ${reachabilityStatus.value.value}`,
      `${toolUiCopy.tcpReachability}: ${reachabilityResult.value.tcp_443.status} ${reachabilityResult.value.tcp_443.latency_ms ?? 'n/a'} ms`,
      `${toolUiCopy.icmpLimit}: ${reachabilityResult.value.icmp.status}`,
      `${toolUiCopy.tracerouteLimit}: ${reachabilityResult.value.traceroute.status}`,
    ].join('\n')
  }

  return 'NetProbe Atlas result summary is available after a live check.'
}

async function copySafeSummary(): Promise<void> {
  copyNotice.value = ''
  const summary = buildSafeSummary()

  try {
    await navigator.clipboard.writeText(summary)
    copyNotice.value = toolUiCopy.copied
  } catch {
    copyNotice.value = toolUiCopy.copyUnavailable
  }
}

function currentResultPayload(): Record<string, unknown> | null {
  if (dnsResult.value) return { data: dnsResult.value, meta: dnsMeta.value }
  if (rdapResult.value) return { data: rdapResult.value, meta: rdapMeta.value }
  if (sslResult.value) return { data: sslResult.value, meta: sslMeta.value }
  if (propagationResult.value) return { data: propagationResult.value, meta: propagationMeta.value }
  if (portResult.value) return { data: portResult.value, meta: portMeta.value }
  if (reachabilityResult.value) return { data: reachabilityResult.value, meta: reachabilityMeta.value }

  return null
}

function exportResultJson(): void {
  if (typeof window === 'undefined') {
    return
  }

  const payload = currentResultPayload()

  if (!payload) {
    return
  }

  const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `netprobe-${tool.slug}-result.json`
  anchor.rel = 'noopener'
  anchor.click()
  URL.revokeObjectURL(url)
}

function resetCurrentTool(): void {
  previewSubmitted.value = false
  errorMessage.value = ''
  copyNotice.value = ''
  dnsResult.value = null
  rdapResult.value = null
  sslResult.value = null
  propagationResult.value = null
  portResult.value = null
  reachabilityResult.value = null
}

function useEmailRecordTypes(): void {
  selectedRecordTypes.value = ['MX', 'TXT']
}

function footerLinkPath(link: FooterLink): string {
  const path = link.kind === 'content'
    ? localizedContentPath(locale, link.slug)
    : localizedToolPath(locale, link.slug)

  return link.query ? `${path}?${link.query}` : path
}

async function copyIpAddress(): Promise<void> {
  copyNotice.value = ''

  if (!ipResult.value) {
    return
  }

  try {
    await navigator.clipboard.writeText(ipResult.value.address)
    copyNotice.value = ipLookupCopy.ipCopied
  } catch {
    copyNotice.value = ipLookupCopy.copyUnavailable
  }
}

async function parseApiError(response: Response): Promise<string> {
  try {
    const payload = await response.json() as { message?: string; errors?: Record<string, string[]> }
    const firstError = Object.values(payload.errors ?? {})[0]?.[0]

    return firstError ?? payload.message ?? `Lookup failed with HTTP ${response.status}.`
  } catch {
    return `Lookup failed with HTTP ${response.status}.`
  }
}

async function previewResult(): Promise<void> {
  previewSubmitted.value = true
  errorMessage.value = ''
  copyNotice.value = ''
  dnsResult.value = null
  ipResult.value = null
  rdapResult.value = null
  sslResult.value = null
  propagationResult.value = null
  portResult.value = null
  reachabilityResult.value = null

  trackToolStarted({
    toolSlug: tool.slug,
    locale,
    routePath: canonicalPath,
  })

  if (!isLiveTool.value) {
    return
  }

  isLoading.value = true

  try {
    if (isIpLookup.value) {
      const response = await fetch(netprobeEndpoint('ip'), {
        headers: {
          accept: 'application/json',
        },
      })

      if (!response.ok) {
        errorMessage.value = await parseApiError(response)
        return
      }

      const payload = await response.json() as ApiResponse<ClientIpData>
      ipResult.value = payload.data
      ipMeta.value = payload.meta
      return
    }

    if (isDnsLookup.value) {
      const response = await fetch(netprobeEndpoint('dns'), {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          domain: targetValue.value,
          types: selectedDnsTypesForRequest.value,
        }),
      })

      if (!response.ok) {
        errorMessage.value = await parseApiError(response)
        return
      }

      const payload = await response.json() as ApiResponse<DnsLookupData>
      dnsResult.value = payload.data
      dnsMeta.value = payload.meta
      return
    }

    if (isRdapLookup.value) {
      const response = await fetch(netprobeEndpoint('rdap'), {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          domain: targetValue.value,
        }),
      })

      if (!response.ok) {
        errorMessage.value = await parseApiError(response)
        return
      }

      const payload = await response.json() as ApiResponse<RdapLookupData>
      rdapResult.value = payload.data
      rdapMeta.value = payload.meta
      return
    }

    if (isSslLookup.value) {
      const response = await fetch(netprobeEndpoint('ssl'), {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          hostname: targetValue.value,
        }),
      })

      if (!response.ok) {
        errorMessage.value = await parseApiError(response)
        return
      }

      const payload = await response.json() as ApiResponse<SslCertificateData>
      sslResult.value = payload.data
      sslMeta.value = payload.meta
      return
    }

    if (isPropagationLookup.value) {
      const response = await fetch(netprobeEndpoint('propagation'), {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          domain: targetValue.value,
          type: propagationRecordType.value,
        }),
      })

      if (!response.ok) {
        errorMessage.value = await parseApiError(response)
        return
      }

      const payload = await response.json() as ApiResponse<DnsPropagationData>
      propagationResult.value = payload.data
      propagationMeta.value = payload.meta
      return
    }

    if (isPortCheck.value) {
      const response = await fetch(netprobeEndpoint('port'), {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          hostname: targetValue.value,
          port: selectedPort.value,
        }),
      })

      if (!response.ok) {
        errorMessage.value = await parseApiError(response)
        return
      }

      const payload = await response.json() as ApiResponse<PortCheckData>
      portResult.value = payload.data
      portMeta.value = payload.meta
      return
    }

    if (isReachabilityCheck.value) {
      const response = await fetch(netprobeEndpoint('reachability'), {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          hostname: targetValue.value,
        }),
      })

      if (!response.ok) {
        errorMessage.value = await parseApiError(response)
        return
      }

      const payload = await response.json() as ApiResponse<ReachabilityData>
      reachabilityResult.value = payload.data
      reachabilityMeta.value = payload.meta
    }
  } catch {
    errorMessage.value = 'The lookup API is not reachable from this browser session.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  updateBrowserDetails()

  if (isIpLookup.value && !previewSubmitted.value && !isLoading.value) {
    void previewResult()
  }
})

useHead({
  htmlAttrs: {
    lang: toHtmlLang(locale),
  },
  title: `${copy.title} | NetProbe Atlas`,
  meta: [
    {
      name: 'description',
      content: copy.headline,
    },
    {
      property: 'og:title',
      content: `${copy.title} | NetProbe Atlas`,
    },
    {
      property: 'og:description',
      content: copy.headline,
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
  link: [
    { rel: 'canonical', href: absoluteUrl(canonicalPath) },
    ...localeAlternates((targetLocale) => localizedToolPath(targetLocale, tool.slug)),
  ],
  script: structuredData.map((item) => ({
    type: 'application/ld+json',
    innerHTML: JSON.stringify(item),
  })),
})
</script>

<template>
  <main class="page-shell">
    <SiteHeader
      :locale="locale"
      :path-for-locale="(targetLocale) => localizedToolPath(targetLocale, tool.slug)"
    />

    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink :to="localizedHomePath(locale)">{{ shellCopy.breadcrumbHome }}</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ copy.navLabel }}</span>
    </nav>

    <section :class="['hero', isIpLookup ? 'hero--ip' : '']" :aria-labelledby="`${tool.slug}-title`">
      <div>
        <div class="detail-topline">
          <p class="eyebrow">{{ getCategoryLabel(tool.category, locale) }}</p>
          <span v-if="!isIpLookup" class="status">{{ copy.statusLabel }}</span>
        </div>
        <h1 :id="`${tool.slug}-title`">{{ copy.title }}</h1>
        <p class="lead">{{ copy.headline }}</p>
      </div>

      <aside v-if="!isIpLookup" class="status-panel" :aria-label="shellCopy.pageStatusLabel">
        <div class="status-panel__row">
          <div>
            <strong>{{ shellCopy.exampleLabel }}</strong>
            <span>{{ copy.exampleTarget }}</span>
          </div>
          <span class="signal" aria-hidden="true"></span>
        </div>
        <div class="status-panel__row">
          <div>
            <strong>{{ shellCopy.plannedTitle }}</strong>
            <span>{{ shellCopy.plannedBody }}</span>
          </div>
          <span class="signal signal--amber" aria-hidden="true"></span>
        </div>
      </aside>
    </section>

    <section :class="['tool-layout', isIpLookup ? 'tool-layout--ip' : (isPropagationLookup ? 'tool-layout--diagnostic' : '')]">
      <div class="tool-workbench">
        <section v-if="!isIpLookup" class="input-panel" :aria-labelledby="`${tool.slug}-input`">
          <h2 :id="`${tool.slug}-input`">{{ copy.navLabel }}</h2>
          <p>{{ copy.description }}</p>
          <form class="field" @submit.prevent="previewResult">
            <template v-if="isDnsLookup">
              <label :for="`${tool.slug}-target`">{{ copy.inputLabel }}</label>
              <input
                :id="`${tool.slug}-target`"
                v-model="targetValue"
                type="text"
                :placeholder="copy.inputPlaceholder"
                autocomplete="off"
              >
              <fieldset class="checkbox-grid">
                <legend>{{ shellCopy.recordTypesLabel }}</legend>
                <label
                  v-for="recordType in dnsVisualRecordTypes"
                  :key="recordType"
                  :class="{ 'record-choice--disabled': !isDnsLookupRecordTypeAvailable(recordType) }"
                >
                  <input
                    v-model="selectedRecordTypes"
                    type="checkbox"
                    :value="recordType"
                    :disabled="!isDnsLookupRecordTypeAvailable(recordType)"
                    :aria-label="recordType"
                  >
                  <span>{{ recordType }}</span>
                  <small v-if="!isDnsLookupRecordTypeAvailable(recordType)" aria-hidden="true">{{ toolUiCopy.unavailableType }}</small>
                </label>
              </fieldset>
            </template>
            <template v-else-if="isPropagationLookup">
              <label :for="`${tool.slug}-target`">{{ copy.inputLabel }}</label>
              <input
                :id="`${tool.slug}-target`"
                v-model="targetValue"
                type="text"
                :placeholder="copy.inputPlaceholder"
                autocomplete="off"
              >
              <p :id="`${tool.slug}-record-type-label`" class="field-label">{{ benchmarkCopy.recordTabsLabel }}</p>
              <div class="record-tabs" role="tablist" :aria-labelledby="`${tool.slug}-record-type-label`">
                <button
                  v-for="recordType in dnsVisualRecordTypes"
                  :key="recordType"
                  type="button"
                  role="tab"
                  :aria-selected="propagationRecordType === recordType"
                  :disabled="!isPropagationRecordTypeAvailable(recordType)"
                  @click="isPropagationRecordTypeAvailable(recordType) ? propagationRecordType = recordType : undefined"
                >
                  {{ recordType }}
                  <small v-if="!isPropagationRecordTypeAvailable(recordType)" aria-hidden="true">{{ toolUiCopy.unavailableType }}</small>
                </button>
              </div>
              <label :for="`${tool.slug}-expected`">{{ formCopy.expectedValueLabel }}</label>
              <input
                :id="`${tool.slug}-expected`"
                v-model="expectedPropagationValue"
                type="text"
                :placeholder="formCopy.expectedValuePlaceholder"
                autocomplete="off"
              >
            </template>
            <template v-else-if="isPortCheck">
              <label :for="`${tool.slug}-target`">{{ copy.inputLabel }}</label>
              <input
                :id="`${tool.slug}-target`"
                v-model="targetValue"
                type="text"
                :placeholder="copy.inputPlaceholder"
                autocomplete="off"
              >
              <label :for="`${tool.slug}-port`">{{ shellCopy.portLabel }}</label>
              <select :id="`${tool.slug}-port`" v-model.number="selectedPort">
                <option v-for="port in quickPorts" :key="port" :value="port">
                  {{ port }}
                </option>
              </select>
              <p class="field-label">{{ toolUiCopy.portQuickChoices }}</p>
              <div class="quick-port-grid" role="group" :aria-label="toolUiCopy.portQuickChoices">
                <button
                  v-for="port in quickPorts"
                  :key="port"
                  type="button"
                  :aria-pressed="selectedPort === port"
                  @click="selectedPort = port"
                >
                  {{ port }}
                </button>
              </div>
            </template>
            <template v-else-if="!isIpLookup">
              <label :for="`${tool.slug}-target`">{{ copy.inputLabel }}</label>
              <input
                :id="`${tool.slug}-target`"
                v-model="targetValue"
                type="text"
                :placeholder="copy.inputPlaceholder"
                autocomplete="off"
              >
            </template>
            <div class="tool-actions">
              <button :class="getButtonClass()" type="submit" :disabled="isLoading || (isDnsLookup && selectedDnsTypesForRequest.length === 0)">
                {{ copy.primaryAction }}
              </button>
              <NuxtLink class="button-link button-link--secondary" :to="localizedContentPath(locale, 'methodology')">
                {{ shellCopy.methodologyLabel }}
              </NuxtLink>
            </div>
          </form>
        </section>

        <section :class="['result-panel', isIpLookup ? 'result-panel--ip' : '']" aria-live="polite" :aria-labelledby="`${tool.slug}-result`">
          <template v-if="isIpLookup">
            <div class="ip-answer-shell">
              <div class="ip-answer-main">
                <p class="eyebrow">{{ ipLookupCopy.automaticEyebrow }}</p>
                <h2 :id="`${tool.slug}-result`">
                  <span v-if="ipResult">{{ ipLookupCopy.publicIpTitle }}</span>
                  <span v-else>{{ ipLookupCopy.checkingTitle }}</span>
                </h2>

                <p v-if="isLoading" class="ip-loading-copy">{{ ipLookupCopy.loadingBody }}</p>
                <p v-else-if="errorMessage" class="result-error">{{ errorMessage }}</p>

                <template v-if="ipResult">
                  <strong class="ip-address-value">{{ ipResult.address }}</strong>
                  <div class="ip-visual-panel__meta">
                    <span>{{ ipResult.version }}</span>
                    <span>{{ ipResult.is_public ? ipLookupCopy.publicRangeLabel : ipLookupCopy.reviewRangeLabel }}</span>
                    <span>{{ ipLookupCopy.lastCheckedLabel }}: {{ formatMetaDate(ipMeta) }}</span>
                  </div>
                  <p>{{ benchmarkCopy.ipPanelBody }}</p>
                </template>

                <div class="result-actions result-actions--ip">
                  <button class="button-link" type="button" :disabled="isLoading" @click="previewResult">
                    {{ ipLookupCopy.refreshAction }}
                  </button>
                  <button class="button-link button-link--secondary" type="button" :disabled="!ipResult" @click="copyIpAddress">
                    {{ ipLookupCopy.copyIpAction }}
                  </button>
                  <button class="button-link button-link--secondary" type="button" :aria-expanded="showIpDetails" @click="showIpDetails = !showIpDetails">
                    {{ showIpDetails ? ipLookupCopy.hideDetailsAction : ipLookupCopy.showDetailsAction }}
                  </button>
                  <span v-if="copyNotice" role="status">{{ copyNotice }}</span>
                </div>
              </div>

              <aside class="ip-privacy-card" :aria-label="ipLookupCopy.privacyStatusLabel">
                <strong>{{ ipLookupCopy.privacyStatusLabel }}</strong>
                <span>{{ ipLookupCopy.privacyStatusBody }}</span>
              </aside>
            </div>

            <div v-if="ipResult" class="answer-strip" aria-label="IP answer summary">
              <div v-for="card in ipSummaryCards" :key="card.label" :class="['answer-card', card.tone ? `answer-card--${card.tone}` : '']">
                <strong>{{ card.label }}</strong>
                <span>{{ card.value }}</span>
              </div>
            </div>

            <section v-if="showIpDetails" class="ip-detail-section" :aria-labelledby="`${tool.slug}-details`">
              <h3 :id="`${tool.slug}-details`">{{ ipLookupCopy.showDetailsAction }}</h3>
              <div class="ip-detail-grid">
                <article v-for="detail in ipDetailCards" :key="detail.label" class="ip-detail-card">
                  <strong>{{ detail.label }}</strong>
                  <span>{{ detail.value }}</span>
                  <p v-if="detail.note">{{ detail.note }}</p>
                </article>
              </div>
              <div class="ip-map-panel" :aria-label="ipLookupCopy.mapTitle">
                <strong>{{ ipLookupCopy.mapTitle }}</strong>
                <p>{{ ipLookupCopy.mapUnavailable }}</p>
                <p>{{ ipLookupCopy.locationLimit }}</p>
              </div>
            </section>
          </template>

          <template v-else>
            <h2 :id="`${tool.slug}-result`">{{ shellCopy.resultTitle }}</h2>
            <p v-if="isLoading">{{ shellCopy.runningLabel }}</p>
            <p v-else-if="errorMessage" class="result-error">{{ errorMessage }}</p>

            <div v-else-if="ipResult">
            <section class="ip-visual-panel" :aria-label="benchmarkCopy.ipPanelTitle">
              <p class="eyebrow">{{ benchmarkCopy.ipPanelTitle }}</p>
              <strong>{{ ipResult.address }}</strong>
              <div class="ip-visual-panel__meta">
                <span>{{ ipResult.version }}</span>
                <span>{{ ipResult.is_public ? 'Public range' : 'Review range' }}</span>
                <span>{{ ipResult.source }}</span>
              </div>
              <p>{{ benchmarkCopy.ipPanelBody }}</p>
            </section>

            <div class="answer-strip" aria-label="IP answer summary">
              <div v-for="card in ipSummaryCards" :key="card.label" :class="['answer-card', card.tone ? `answer-card--${card.tone}` : '']">
                <strong>{{ card.label }}</strong>
                <span>{{ card.value }}</span>
              </div>
            </div>
            <div class="result-actions">
              <button class="button-link button-link--secondary" type="button" @click="copySafeSummary">
                {{ toolUiCopy.copySummary }}
              </button>
              <button class="button-link button-link--secondary" type="button" @click="copySafeSummary">
                {{ toolUiCopy.shareReport }}
              </button>
              <button class="button-link button-link--secondary" type="button" @click="resetCurrentTool">
                {{ toolUiCopy.checkAnotherRecord }}
              </button>
              <span v-if="copyNotice" role="status">{{ copyNotice }}</span>
            </div>
            <section class="result-callout">
              <h3>{{ benchmarkCopy.ipMeaningTitle }}</h3>
              <p>{{ benchmarkCopy.ipPanelBody }}</p>
              <p>{{ ipMeta.retention }}</p>
            </section>
          </div>

          <div v-else-if="dnsResult">
            <div class="answer-strip" aria-label="DNS lookup summary">
              <div v-for="card in dnsSummaryCards" :key="card.label" :class="['answer-card', card.tone ? `answer-card--${card.tone}` : '']">
                <strong>{{ card.label }}</strong>
                <span>{{ card.value }}</span>
              </div>
            </div>

            <div class="result-actions">
              <button class="button-link button-link--secondary" type="button" @click="copySafeSummary">
                {{ toolUiCopy.copyAll }}
              </button>
              <button class="button-link button-link--secondary" type="button" @click="exportResultJson">
                {{ toolUiCopy.exportJson }}
              </button>
              <NuxtLink class="button-link button-link--secondary" :to="localizedToolPath(locale, 'dns-propagation')">
                {{ toolUiCopy.checkPropagation }}
              </NuxtLink>
              <button class="button-link button-link--secondary" type="button" @click="useEmailRecordTypes">
                {{ toolUiCopy.checkEmailRecords }}
              </button>
              <span v-if="copyNotice" role="status">{{ copyNotice }}</span>
            </div>

            <div class="result-table-wrap">
              <table class="result-table">
                <thead>
                  <tr>
                    <th>{{ toolUiCopy.type }}</th>
                    <th>{{ toolUiCopy.name }}</th>
                    <th>{{ toolUiCopy.value }}</th>
                    <th>{{ toolUiCopy.ttl }}</th>
                    <th>{{ toolUiCopy.source }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="record in dnsRecordRows" :key="`${record.type}-${record.value}-${record.ttl}`">
                    <td>{{ record.type }}</td>
                    <td>{{ record.name }}</td>
                    <td>{{ record.value || JSON.stringify(record.fields) }}</td>
                    <td>{{ record.ttl }}</td>
                    <td>{{ record.source }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p v-if="dnsRecordRows.length === 0" class="result-empty">{{ toolUiCopy.noRecords }}</p>

            <section class="result-callout">
              <h3>{{ toolUiCopy.addressGuard }}</h3>
              <p>{{ dnsResult.checked_addresses.length }} {{ toolUiCopy.checked.toLowerCase() }}. {{ toolUiCopy.cache }}: {{ formatCache(dnsMeta) }}.</p>
            </section>

            <section v-if="metaMessages(dnsMeta).length > 0" class="content-section">
              <h3>{{ toolUiCopy.publicWarningTitle }}</h3>
              <ul class="result-list">
                <li v-for="message in metaMessages(dnsMeta)" :key="message">{{ message }}</li>
              </ul>
            </section>
          </div>

          <div v-else-if="rdapResult">
            <div class="answer-strip" aria-label="RDAP summary">
              <div v-for="card in rdapSummaryCards" :key="card.label" :class="['answer-card', card.tone ? `answer-card--${card.tone}` : '']">
                <strong>{{ card.label }}</strong>
                <span>{{ card.value }}</span>
              </div>
            </div>

            <div class="result-actions">
              <button class="button-link button-link--secondary" type="button" @click="copySafeSummary">
                {{ toolUiCopy.copySummary }}
              </button>
              <button class="button-link button-link--secondary" type="button" disabled>
                {{ toolUiCopy.monitorExpiration }}
              </button>
              <NuxtLink class="button-link button-link--secondary" :to="localizedToolPath(locale, 'dns-lookup')">
                {{ toolUiCopy.checkDns }}
              </NuxtLink>
              <NuxtLink class="button-link button-link--secondary" :to="localizedToolPath(locale, 'ssl-certificate-checker')">
                {{ toolUiCopy.checkSsl }}
              </NuxtLink>
              <span v-if="copyNotice" role="status">{{ copyNotice }}</span>
            </div>

            <div class="result-card-grid">
              <article>
                <strong>{{ toolUiCopy.registrationDate }}</strong>
                <span>{{ formatNullable(rdapResult.registered_at) }}</span>
              </article>
              <article>
                <strong>{{ toolUiCopy.updatedDate }}</strong>
                <span>{{ formatNullable(rdapResult.updated_at) }}</span>
              </article>
              <article>
                <strong>{{ toolUiCopy.daysLeft }}</strong>
                <span>{{ formatNullable(rdapResult.days_until_expiration) }}</span>
              </article>
              <article>
                <strong>{{ toolUiCopy.dnssec }}</strong>
                <span>{{ toolUiCopy.notProvided }}</span>
              </article>
            </div>

            <section class="content-section">
              <h3>{{ toolUiCopy.status }}</h3>
              <ul class="pill-list">
                <li v-for="status in rdapResult.statuses" :key="status">{{ status }}</li>
              </ul>
              <p v-if="rdapResult.statuses.length === 0">{{ toolUiCopy.notProvided }}</p>
            </section>

            <section class="content-section">
              <h3>{{ toolUiCopy.nameservers }}</h3>
              <ul class="result-list">
                <li v-for="nameserver in rdapResult.nameservers" :key="nameserver">{{ nameserver }}</li>
              </ul>
              <p v-if="rdapResult.nameservers.length === 0">{{ toolUiCopy.notProvided }}</p>
            </section>

            <section class="result-callout">
              <h3>{{ toolUiCopy.redactionNotice }}</h3>
              <p>{{ toolUiCopy.redactionBody }}</p>
              <p>{{ toolUiCopy.cache }}: {{ formatCache(rdapMeta) }}.</p>
            </section>

            <section v-if="rdapResult.limitations.length > 0 || metaMessages(rdapMeta).length > 0" class="content-section">
              <h3>{{ toolUiCopy.publicWarningTitle }}</h3>
              <ul class="result-list">
                <li v-for="limitation in rdapResult.limitations" :key="limitation">{{ limitation }}</li>
                <li v-for="message in metaMessages(rdapMeta)" :key="message">{{ message }}</li>
              </ul>
            </section>
          </div>

          <div v-else-if="sslResult">
            <div class="answer-strip" aria-label="SSL certificate summary">
              <div v-for="card in sslSummaryCards" :key="card.label" :class="['answer-card', card.tone ? `answer-card--${card.tone}` : '']">
                <strong>{{ card.label }}</strong>
                <span>{{ card.value }}</span>
              </div>
            </div>

            <div class="expiry-meter" :style="{ '--expiry-fill': `${sslExpiryPercent}%` }">
              <div>
                <strong>{{ toolUiCopy.certificateWindow }}</strong>
                <span>{{ formatNullable(sslResult.valid_from) }} - {{ formatNullable(sslResult.valid_to) }}</span>
              </div>
              <i aria-hidden="true"></i>
            </div>

            <div class="result-actions">
              <button class="button-link button-link--secondary" type="button" @click="copySafeSummary">
                {{ toolUiCopy.copySummary }}
              </button>
              <button class="button-link button-link--secondary" type="button" disabled>
                {{ toolUiCopy.monitorCertificate }}
              </button>
              <a class="button-link button-link--secondary" :href="`/supersites/sitepulse-lab/${locale}/tools/security-headers-checker`">
                {{ toolUiCopy.sitePulseHeaders }}
              </a>
              <span v-if="copyNotice" role="status">{{ copyNotice }}</span>
            </div>

            <div class="result-card-grid">
              <article>
                <strong>{{ toolUiCopy.hostname }}</strong>
                <span>{{ sslResult.hostname }}</span>
              </article>
              <article>
                <strong>{{ toolUiCopy.subject }}</strong>
                <span>{{ sslResult.subject.common_name || sslResult.subject.organization || toolUiCopy.notProvided }}</span>
              </article>
              <article>
                <strong>{{ toolUiCopy.validFrom }}</strong>
                <span>{{ formatNullable(sslResult.valid_from) }}</span>
              </article>
              <article>
                <strong>{{ toolUiCopy.validTo }}</strong>
                <span>{{ formatNullable(sslResult.valid_to) }}</span>
              </article>
            </div>

            <section class="content-section">
              <h3>{{ toolUiCopy.sans }}</h3>
              <ul class="result-list">
                <li v-for="name in sslResult.subject_alt_names" :key="name">{{ name }}</li>
              </ul>
              <p v-if="sslResult.subject_alt_names.length === 0">{{ toolUiCopy.notProvided }}</p>
            </section>

            <section class="content-section">
              <h3>{{ toolUiCopy.protocolHints }}</h3>
              <ul class="result-list">
                <li>{{ sslResult.checked_addresses.length }} public address checks before TLS.</li>
                <li>{{ sslResult.chain_count }} certificate chain entries returned.</li>
                <li>{{ toolUiCopy.cache }}: {{ formatCache(sslMeta) }}.</li>
              </ul>
            </section>

            <section v-if="metaMessages(sslMeta).length > 0" class="content-section">
              <h3>{{ toolUiCopy.publicWarningTitle }}</h3>
              <ul class="result-list">
                <li v-for="message in metaMessages(sslMeta)" :key="message">{{ message }}</li>
              </ul>
            </section>
          </div>

          <div v-else-if="propagationResult">
            <div class="answer-strip" aria-label="Propagation summary">
              <div v-for="card in propagationSummaryCards" :key="card.label" :class="['answer-card', card.tone ? `answer-card--${card.tone}` : '']">
                <strong>{{ card.label }}</strong>
                <span>{{ card.value }}</span>
              </div>
            </div>

            <div class="result-actions">
              <button class="button-link button-link--secondary" type="button" @click="copySafeSummary">
                {{ benchmarkCopy.copySummary }}
              </button>
              <span v-if="copyNotice" role="status">{{ copyNotice }}</span>
            </div>

            <section class="result-callout">
              <h3>{{ benchmarkCopy.coverageTitle }}</h3>
              <p>{{ benchmarkCopy.coverageBody }}</p>
              <p>
                {{ toolUiCopy.cache }}: {{ formatCache(propagationMeta) }}.
                Checked: {{ formatMetaDate(propagationMeta) }}.
              </p>
            </section>

            <section class="resolver-map" :aria-label="benchmarkCopy.mapTitle">
              <h3>{{ benchmarkCopy.mapTitle }}</h3>
              <div class="resolver-grid">
                <div v-for="snapshot in propagationResult.snapshots" :key="`${snapshot.resolver_id}-pin`" :class="['resolver-pin', snapshot.status === 'answered' ? 'resolver-pin--good' : 'resolver-pin--warning']">
                  <strong>{{ snapshot.region }}</strong>
                  <span>{{ snapshot.status }}</span>
                </div>
              </div>
            </section>

            <section class="content-section">
              <h3>{{ benchmarkCopy.resolverDetailsTitle }}</h3>
              <div class="result-table-wrap">
                <table class="result-table">
                  <thead>
                    <tr>
                      <th>{{ toolUiCopy.resolver }}</th>
                      <th>{{ toolUiCopy.region }}</th>
                      <th>{{ toolUiCopy.status }}</th>
                      <th>{{ toolUiCopy.ttlMin }}</th>
                      <th>{{ toolUiCopy.latency }}</th>
                      <th>{{ toolUiCopy.values }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="snapshot in propagationResult.snapshots" :key="snapshot.resolver_id">
                      <td>{{ snapshot.resolver_id }}</td>
                      <td>{{ snapshot.region }}</td>
                      <td>{{ snapshot.status }}</td>
                      <td>{{ snapshot.ttl_min ?? toolUiCopy.none }}</td>
                      <td>{{ toolUiCopy.notProvided }}</td>
                      <td>
                        <span v-if="snapshot.values.length > 0">{{ snapshot.values.join(', ') }}</span>
                        <span v-else>{{ toolUiCopy.noValuesReturned }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section v-if="propagationDistinctValues.length > 0" class="content-section">
              <h3>{{ benchmarkCopy.distinctValuesTitle }}</h3>
              <ul class="pill-list">
                <li v-for="value in propagationDistinctValues" :key="value">{{ value }}</li>
              </ul>
            </section>

            <p v-if="Array.isArray(propagationMeta.warnings) && propagationMeta.warnings.length > 0">
              {{ benchmarkCopy.coverageBody }}
            </p>
          </div>

          <div v-else-if="portResult">
            <div class="answer-strip" aria-label="Port check summary">
              <div v-for="card in portSummaryCards" :key="card.label" :class="['answer-card', card.tone ? `answer-card--${card.tone}` : '']">
                <strong>{{ card.label }}</strong>
                <span>{{ card.value }}</span>
              </div>
            </div>

            <div class="result-actions">
              <button class="button-link button-link--secondary" type="button" @click="copySafeSummary">
                {{ toolUiCopy.copySummary }}
              </button>
              <button class="button-link button-link--secondary" type="button" @click="exportResultJson">
                {{ toolUiCopy.exportJson }}
              </button>
              <NuxtLink class="button-link button-link--secondary" :to="localizedToolPath(locale, 'ping-traceroute')">
                {{ toolUiCopy.tcpReachability }}
              </NuxtLink>
              <span v-if="copyNotice" role="status">{{ copyNotice }}</span>
            </div>

            <div class="result-table-wrap">
              <table class="result-table">
                <thead>
                  <tr>
                    <th>{{ toolUiCopy.resolvedIp }}</th>
                    <th>{{ toolUiCopy.status }}</th>
                    <th>{{ toolUiCopy.latency }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="check in portResult.checks" :key="`${check.address}-${check.status}`">
                    <td>{{ check.address }}</td>
                    <td>{{ check.status }}</td>
                    <td>{{ check.latency_ms ?? 'n/a' }} ms</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <section class="result-callout">
              <h3>{{ toolUiCopy.notScannerTitle }}</h3>
              <p>{{ toolUiCopy.notScannerBody }}</p>
              <p>{{ toolUiCopy.cache }}: {{ formatCache(portMeta) }}.</p>
            </section>

            <section v-if="metaMessages(portMeta).length > 0" class="content-section">
              <h3>{{ toolUiCopy.publicWarningTitle }}</h3>
              <ul class="result-list">
                <li v-for="message in metaMessages(portMeta)" :key="message">{{ message }}</li>
              </ul>
            </section>
          </div>

          <div v-else-if="reachabilityResult">
            <div class="answer-strip" aria-label="Reachability summary">
              <div v-for="card in reachabilitySummaryCards" :key="card.label" :class="['answer-card', card.tone ? `answer-card--${card.tone}` : '']">
                <strong>{{ card.label }}</strong>
                <span>{{ card.value }}</span>
              </div>
            </div>

            <div class="result-actions">
              <button class="button-link button-link--secondary" type="button" @click="copySafeSummary">
                {{ toolUiCopy.copySummary }}
              </button>
              <button class="button-link button-link--secondary" type="button" @click="exportResultJson">
                {{ toolUiCopy.exportJson }}
              </button>
              <NuxtLink class="button-link button-link--secondary" :to="localizedToolPath(locale, 'port-checker')">
                {{ toolUiCopy.portStatus }}
              </NuxtLink>
              <NuxtLink class="button-link button-link--secondary" :to="localizedToolPath(locale, 'dns-lookup')">
                {{ toolUiCopy.checkDns }}
              </NuxtLink>
              <span v-if="copyNotice" role="status">{{ copyNotice }}</span>
            </div>

            <section class="content-section">
              <h3>{{ toolUiCopy.tcpReachability }}</h3>
              <ul class="result-list">
                <li>{{ reachabilityResult.tcp_443.address }} checked for TCP 443.</li>
                <li>{{ toolUiCopy.icmpLimit }}: {{ reachabilityResult.icmp.status }} - {{ reachabilityResult.icmp.reason }}</li>
                <li>{{ toolUiCopy.tracerouteLimit }}: {{ reachabilityResult.traceroute.status }} - {{ reachabilityResult.traceroute.reason }}</li>
              </ul>
            </section>

            <section class="result-callout">
              <h3>{{ toolUiCopy.hops }}</h3>
              <p>{{ toolUiCopy.noRealHops }}</p>
              <p>{{ toolUiCopy.cache }}: {{ formatCache(reachabilityMeta) }}.</p>
            </section>

            <section v-if="metaMessages(reachabilityMeta).length > 0" class="content-section">
              <h3>{{ toolUiCopy.publicWarningTitle }}</h3>
              <ul class="result-list">
                <li v-for="message in metaMessages(reachabilityMeta)" :key="message">{{ message }}</li>
              </ul>
            </section>
          </div>

            <p v-else>{{ previewSubmitted ? copy.previewResult : shellCopy.plannedBody }}</p>
          </template>
        </section>

        <section
          v-if="!isIpLookup"
          class="sponsor-reserve"
          :aria-label="toolUiCopy.sponsorLabel"
          aria-hidden="true"
          data-ad-status="delivery-disabled"
          data-ad-policy-version="2026-06-27.1"
          :data-ad-slot-id="`netprobe-${tool.slug}-after-result`"
        ></section>

        <section v-if="!isIpLookup" class="upgrade-panel" :aria-label="upgradePanelCopy.ariaLabel">
          <div>
            <p class="eyebrow">{{ upgradePanelCopy.eyebrow }}</p>
            <h2>{{ upgradePanelCopy.title }}</h2>
            <p>{{ upgradePanelCopy.body }}</p>
          </div>
          <NuxtLink class="button-link button-link--secondary" :to="localizedContentPath(locale, 'methodology')">
            {{ upgradePanelCopy.cta }}
          </NuxtLink>
        </section>

        <section v-else class="privacy-option-panel" :aria-labelledby="`${tool.slug}-privacy-options`">
          <div>
            <p class="eyebrow">{{ benchmarkCopy.privacyTitle }}</p>
            <h2 :id="`${tool.slug}-privacy-options`">{{ ipLookupCopy.privacyCtaTitle }}</h2>
            <p>{{ ipLookupCopy.privacyCtaBody }}</p>
          </div>
          <NuxtLink class="button-link button-link--secondary" :to="localizedContentPath(locale, 'privacy')">
            {{ ipLookupCopy.privacyCtaLink }}
          </NuxtLink>
        </section>

        <section v-if="!isIpLookup && isPropagationLookup" class="privacy-strip" :aria-labelledby="`${tool.slug}-privacy-cta`">
          <div>
            <h2 :id="`${tool.slug}-privacy-cta`">{{ benchmarkCopy.privacyTitle }}</h2>
            <p>{{ benchmarkCopy.privacyBody }}</p>
          </div>
          <NuxtLink class="button-link button-link--secondary" :to="localizedContentPath(locale, 'privacy')">
            {{ benchmarkCopy.privacyLink }}
          </NuxtLink>
        </section>

        <section v-if="isLiveTool" class="quick-related" :aria-labelledby="`${tool.slug}-next-checks`">
          <h2 :id="`${tool.slug}-next-checks`">{{ isIpLookup || isPropagationLookup ? benchmarkCopy.relatedTitle : toolUiCopy.nextChecks }}</h2>
          <div class="related-tool-list related-tool-list--inline">
            <NuxtLink v-for="relatedTool in relatedTools" :key="relatedTool.slug" :to="localizedToolPath(locale, relatedTool.slug)">
              {{ getToolCopy(relatedTool, locale).navLabel }}
            </NuxtLink>
          </div>
        </section>

        <section v-if="isIpLookup" class="methodology-accordion" :aria-labelledby="`${tool.slug}-methodology`">
          <details>
            <summary :id="`${tool.slug}-methodology`">{{ ipLookupCopy.methodologyAccordionTitle }}</summary>
            <p>{{ ipLookupCopy.methodologyAccordionBody }}</p>
            <ul class="method-list">
              <li v-for="item in copy.methodology" :key="item">{{ item }}</li>
            </ul>
            <dl class="fact-list">
              <div>
                <dt>{{ shellCopy.freeCheckLabel }}</dt>
                <dd>{{ copy.freeScope }}</dd>
              </div>
              <div>
                <dt>{{ shellCopy.methodologyLabel }}</dt>
                <dd>{{ copy.limitation }}</dd>
              </div>
            </dl>
          </details>
        </section>
      </div>

      <aside v-if="!isIpLookup" class="band" :aria-labelledby="`${tool.slug}-methodology`">
        <h2 :id="`${tool.slug}-methodology`">{{ shellCopy.methodologyLabel }}</h2>
        <ul class="method-list">
          <li v-for="item in copy.methodology" :key="item">{{ item }}</li>
        </ul>
        <dl class="fact-list">
          <div>
            <dt>{{ shellCopy.freeCheckLabel }}</dt>
            <dd>{{ copy.freeScope }}</dd>
          </div>
          <div>
            <dt>{{ shellCopy.upgradePathLabel }}</dt>
            <dd>{{ copy.upgradeScope }}</dd>
          </div>
        </dl>
      </aside>
    </section>

    <section class="content-layout" :aria-labelledby="`${tool.slug}-guide`">
      <div>
        <h2 :id="`${tool.slug}-guide`">{{ shellCopy.toolGuideTitle }}</h2>
        <article v-for="section in copy.contentSections" :key="section.heading" class="content-section">
          <h3>{{ section.heading }}</h3>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </article>
        <section class="content-section" :aria-labelledby="`${tool.slug}-faq`">
          <h3 :id="`${tool.slug}-faq`">{{ shellCopy.faqTitle }}</h3>
          <div class="faq-list">
            <details v-for="faq in copy.faq" :key="faq.question">
              <summary>{{ faq.question }}</summary>
              <p>{{ faq.answer }}</p>
            </details>
          </div>
        </section>
      </div>

      <aside class="band" :aria-label="copy.reviewedLabel">
        <h2>{{ copy.reviewedLabel }}</h2>
        <p>{{ shellCopy.contentQualityBody }}</p>
        <div class="inline-link-list">
          <NuxtLink :to="localizedContentPath(locale, 'methodology')">
            {{ shellCopy.methodologyLabel }}
          </NuxtLink>
          <NuxtLink :to="localizedContentPath(locale, 'editorial-policy')">
            {{ shellCopy.editorialLabel }}
          </NuxtLink>
        </div>

        <section class="content-section">
          <h3>{{ shellCopy.relatedTitle }}</h3>
          <div class="related-tool-list">
            <NuxtLink v-for="relatedTool in relatedTools" :key="relatedTool.slug" :to="localizedToolPath(locale, relatedTool.slug)">
              {{ getToolCopy(relatedTool, locale).navLabel }}
            </NuxtLink>
          </div>
        </section>
      </aside>
    </section>

    <section class="support-band" aria-labelledby="tool-support-title">
      <div>
        <h2 id="tool-support-title">{{ toolUiCopy.supportTitle }}</h2>
        <p>{{ toolUiCopy.supportBody }}</p>
      </div>
      <div class="support-band__actions">
        <NuxtLink :to="localizedContentPath(locale, 'contact')">
          {{ toolUiCopy.supportCta }}
        </NuxtLink>
        <NuxtLink :to="localizedContentPath(locale, 'editorial-policy')">
          {{ shellCopy.editorialLabel }}
        </NuxtLink>
      </div>
    </section>

    <section class="diagnostic-footer" aria-labelledby="diagnostic-footer-title">
      <div class="diagnostic-footer__intro">
        <h2 id="diagnostic-footer-title">{{ homeFooterCopy.footerTitle }}</h2>
        <p>{{ homeFooterCopy.footerLead }}</p>
      </div>
      <nav class="diagnostic-footer__grid" :aria-label="homeFooterCopy.footerNavLabel">
        <div v-for="group in homeFooterCopy.footerGroups" :key="group.title" class="diagnostic-footer__group">
          <h3>{{ group.title }}</h3>
          <NuxtLink v-for="link in group.links" :key="`${group.title}-${link.label}`" :to="footerLinkPath(link)">
            {{ link.label }}
          </NuxtLink>
        </div>
      </nav>
    </section>

    <LegalFooter :locale="locale" />
  </main>
</template>
