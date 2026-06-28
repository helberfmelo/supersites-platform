import { sanitizePublicCopy, type LocaleCode } from './locales'

export interface HomeCopy {
  eyebrow: string
  title: string
  lead: string
  searchLabel: string
  searchPlaceholder: string
  categoryLabel: string
  allCategories: string
  noResultsTitle: string
  noResultsBody: string
  freeLabel: string
  upgradeLabel: string
  detailCta: string
  principlesTitle: string
  principles: Array<{ title: string; body: string }>
  statusRows: Array<{ title: string; body: string; tone: 'green' | 'amber' }>
}

export interface ShellCopy {
  breadcrumbHome: string
  runLabel: string
  resetLabel: string
  inputTitle: string
  resultTitle: string
  modeTabsTitle: string
  payloadSummaryTitle: string
  payloadEmptyTitle: string
  payloadEmptyBody: string
  payloadRunningTitle: string
  payloadRunningBody: string
  payloadReadyLabel: string
  copyPayloadLabel: string
  copiedLabel: string
  copyUnavailableLabel: string
  downloadSvgLabel: string
  exampleTitle: string
  exampleBody: string
  relatedTitle: string
  relatedBody: string
  openRelatedLabel: string
  staticDynamicTitle: string
  staticDynamicBody: string
  guideTitle: string
  faqTitle: string
  methodologyLabel: string
  editorialLabel: string
  freeCheckLabel: string
  upgradePathLabel: string
  contentQualityBody: string
  privacyNote: string
  invalidResultTitle: string
  localBadgeLabel: string
  pageStatusLabel: string
  liveTitle: string
  liveBody: string
  gatedTitle: string
  gatedBody: string
  gatedItemsTitle: string
  gatedItems: string[]
  previewEmpty: string
  previewError: string
}

export const homeCopy: Record<LocaleCode, HomeCopy> = {
  en: {
    eyebrow: 'QRRoute',
    title: 'QR, barcode and campaign link builders with local previews.',
    lead: 'Generate static QR codes, Code 128 barcodes, UTM links, vCard payloads and Wi-Fi QR payloads without mandatory signup.',
    searchLabel: 'Search tools',
    searchPlaceholder: 'Try QR, barcode, UTM, vCard or Wi-Fi',
    categoryLabel: 'Category',
    allCategories: 'All tools',
    noResultsTitle: 'No tools matched',
    noResultsBody: 'Clear the search or choose another category.',
    freeLabel: 'Free result',
    upgradeLabel: 'Upgrade path',
    detailCta: 'Open tool',
    principlesTitle: 'Operating principles',
    principles: [
      { title: 'Static first', body: 'The free MVP solves one-off QR, barcode and link payload creation without an account.' },
      { title: 'No hidden redirect', body: 'Static previews encode the visible payload directly; dynamic QR and short links stay gated.' },
      { title: 'Analytics without PII', body: 'Only tool slugs and safe route paths enter local events for this browser MVP.' },
    ],
    statusRows: [
      { title: '6 local workflow tools', body: 'Static QR, barcode, UTM, vCard, Wi-Fi and preview inspection.', tone: 'green' },
      { title: '5 language route sets', body: 'English, Portuguese, Spanish, French and German pages are prerendered.', tone: 'green' },
      { title: 'Commercial redirects gated', body: 'Dynamic QR, short links, analytics, domains, billing and ads are not active.', tone: 'amber' },
    ],
  },
  'pt-br': {
    eyebrow: 'QRRoute',
    title: 'QR, barcode e links de campanha com preview local.',
    lead: 'Gere QR estatico, Code 128, UTM, vCard e Wi-Fi sem cadastro obrigatorio.',
    searchLabel: 'Buscar ferramentas',
    searchPlaceholder: 'Tente QR, barcode, UTM, vCard ou Wi-Fi',
    categoryLabel: 'Categoria',
    allCategories: 'Todas',
    noResultsTitle: 'Nenhuma ferramenta encontrada',
    noResultsBody: 'Limpe a busca ou escolha outra categoria.',
    freeLabel: 'Resultado gratuito',
    upgradeLabel: 'Caminho de upgrade',
    detailCta: 'Abrir ferramenta',
    principlesTitle: 'Principios de operacao',
    principles: [
      { title: 'Estatico primeiro', body: 'O MVP gratuito resolve criacao pontual de QR, barcode e payloads sem conta.' },
      { title: 'Sem redirect oculto', body: 'Previews estaticos codificam o payload visivel; QR dinamico e short links seguem bloqueados.' },
      { title: 'Analytics sem PII', body: 'Apenas tool slug e rota segura entram nos eventos locais deste MVP.' },
    ],
    statusRows: [
      { title: '6 ferramentas locais', body: 'QR estatico, barcode, UTM, vCard, Wi-Fi e inspecao de preview.', tone: 'green' },
      { title: '5 conjuntos de idioma', body: 'Paginas em ingles, portugues, espanhol, frances e alemao sao prerenderizadas.', tone: 'green' },
      { title: 'Redirects comerciais bloqueados', body: 'QR dinamico, short links, analytics, dominios, billing e ads nao estao ativos.', tone: 'amber' },
    ],
  },
  es: {
    eyebrow: 'QRRoute',
    title: 'QR, barcode y enlaces de campana con vista previa local.',
    lead: 'Genera QR estatico, Code 128, UTM, vCard y Wi-Fi sin registro obligatorio.',
    searchLabel: 'Buscar herramientas',
    searchPlaceholder: 'Prueba QR, barcode, UTM, vCard o Wi-Fi',
    categoryLabel: 'Categoria',
    allCategories: 'Todas',
    noResultsTitle: 'No hay herramientas',
    noResultsBody: 'Borra la busqueda o elige otra categoria.',
    freeLabel: 'Resultado gratis',
    upgradeLabel: 'Ruta de upgrade',
    detailCta: 'Abrir herramienta',
    principlesTitle: 'Principios operativos',
    principles: [
      { title: 'Estatico primero', body: 'El MVP gratis resuelve creacion puntual de QR, barcode y payloads sin cuenta.' },
      { title: 'Sin redirect oculto', body: 'Las vistas estaticas codifican el payload visible; QR dinamico y short links quedan gated.' },
      { title: 'Analytics sin PII', body: 'Solo tool slug y ruta segura entran en eventos locales de este MVP.' },
    ],
    statusRows: [
      { title: '6 herramientas locales', body: 'QR estatico, barcode, UTM, vCard, Wi-Fi e inspeccion preview.', tone: 'green' },
      { title: '5 rutas de idioma', body: 'Paginas en ingles, portugues, espanol, frances y aleman se prerenderizan.', tone: 'green' },
      { title: 'Redirects comerciales gated', body: 'QR dinamico, short links, analytics, dominios, billing y ads no estan activos.', tone: 'amber' },
    ],
  },
  fr: {
    eyebrow: 'QRRoute',
    title: 'QR, code-barres et liens campagne avec apercu local.',
    lead: 'Generez QR statique, Code 128, UTM, vCard et Wi-Fi sans compte obligatoire.',
    searchLabel: 'Rechercher',
    searchPlaceholder: 'QR, barcode, UTM, vCard ou Wi-Fi',
    categoryLabel: 'Categorie',
    allCategories: 'Tous',
    noResultsTitle: 'Aucun outil',
    noResultsBody: 'Effacez la recherche ou choisissez une autre categorie.',
    freeLabel: 'Resultat gratuit',
    upgradeLabel: 'Offre payante',
    detailCta: 'Ouvrir',
    principlesTitle: 'Principes operationnels',
    principles: [
      { title: 'Statique d abord', body: 'Le MVP gratuit cree QR, barcode et payloads ponctuels sans compte.' },
      { title: 'Pas de redirect cache', body: 'Les apercus statiques encodent le payload visible; QR dynamique et short links restent gates.' },
      { title: 'Analytics sans PII', body: 'Seuls tool slug et route sure entrent dans le data layer local.' },
    ],
    statusRows: [
      { title: '6 outils locaux', body: 'QR statique, barcode, UTM, vCard, Wi-Fi et inspection preview.', tone: 'green' },
      { title: '5 routes de langue', body: 'Pages anglaises, portugaises, espagnoles, francaises et allemandes prerenderisees.', tone: 'green' },
      { title: 'Redirects commerciaux bloques', body: 'QR dynamique, short links, analytics, domaines, billing et ads non actifs.', tone: 'amber' },
    ],
  },
  de: {
    eyebrow: 'QRRoute',
    title: 'QR-, Barcode- und Kampagnenlink-Builder mit lokaler Vorschau.',
    lead: 'Erzeugen Sie statische QR-Codes, Code 128, UTM, vCard und Wi-Fi ohne Pflichtkonto.',
    searchLabel: 'Tools suchen',
    searchPlaceholder: 'QR, Barcode, UTM, vCard oder Wi-Fi',
    categoryLabel: 'Kategorie',
    allCategories: 'Alle Tools',
    noResultsTitle: 'Keine Tools gefunden',
    noResultsBody: 'Leeren Sie die Suche oder waehlen Sie eine andere Kategorie.',
    freeLabel: 'Kostenloses Ergebnis',
    upgradeLabel: 'Upgrade-Pfad',
    detailCta: 'Tool oeffnen',
    principlesTitle: 'Betriebsprinzipien',
    principles: [
      { title: 'Statisch zuerst', body: 'Das kostenlose MVP erstellt einzelne QR-, Barcode- und Payload-Werte ohne Konto.' },
      { title: 'Kein versteckter Redirect', body: 'Statische Vorschauen codieren den sichtbaren Payload; dynamische QR und Short Links bleiben gated.' },
      { title: 'Analytics ohne PII', body: 'Nur Tool-Slug und sichere Route gehen in den lokalen Data Layer.' },
    ],
    statusRows: [
      { title: '6 lokale Workflow-Tools', body: 'Statischer QR, Barcode, UTM, vCard, Wi-Fi und Preview-Inspektion.', tone: 'green' },
      { title: '5 Sprachrouten', body: 'Englische, portugiesische, spanische, franzoesische und deutsche Seiten werden prerendered.', tone: 'green' },
      { title: 'Kommerzielle Redirects gated', body: 'Dynamische QR, Short Links, Analytics, Domains, Billing und Ads sind nicht aktiv.', tone: 'amber' },
    ],
  },
}

export const shellCopy: Record<LocaleCode, ShellCopy> = {
  en: {
    breadcrumbHome: 'QRRoute',
    runLabel: 'Generate preview',
    resetLabel: 'Reset example',
    inputTitle: 'Inputs',
    resultTitle: 'Payload',
    modeTabsTitle: 'Type',
    payloadSummaryTitle: 'Final payload',
    payloadEmptyTitle: 'Example loaded',
    payloadEmptyBody: 'Generate a local preview to see the final encoded payload and safety summary.',
    payloadRunningTitle: 'Generating locally',
    payloadRunningBody: 'The browser is validating the payload and drawing the SVG preview.',
    payloadReadyLabel: 'Ready',
    copyPayloadLabel: 'Copy payload',
    copiedLabel: 'Copied',
    copyUnavailableLabel: 'Copy unavailable',
    downloadSvgLabel: 'Download SVG',
    exampleTitle: 'Example',
    exampleBody: 'The form starts with a safe sample payload so the static workflow can be checked before private values.',
    relatedTitle: 'Related tools',
    relatedBody: 'Switch between QR, UTM, barcode, contact and preview workflows while keeping processing local.',
    openRelatedLabel: 'Open',
    staticDynamicTitle: 'Static vs dynamic',
    staticDynamicBody: 'Free static codes encode the visible payload directly. Editable destinations, scan analytics, short links, custom domains and batch workflows remain gated.',
    guideTitle: 'Guide and limits',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    freeCheckLabel: 'Free utility',
    upgradePathLabel: 'Upgrade path',
    contentQualityBody: 'This page combines a working local tool, safety limits, FAQ and review date before any AdSense or paid launch.',
    privacyNote: 'The builder runs in this browser session. QRRoute does not store inputs, use localStorage or send payloads to a product API.',
    invalidResultTitle: 'Check the input',
    localBadgeLabel: 'Local MVP',
    pageStatusLabel: 'Tool status',
    liveTitle: 'Client-side MVP',
    liveBody: 'The free builder works without signup and renders static SVG previews locally.',
    gatedTitle: 'Redirect features gated',
    gatedBody: 'Dynamic QR, short links, analytics, custom domains, billing and ads are not active yet.',
    gatedItemsTitle: 'Planned paid workflow',
    gatedItems: ['Dynamic QR editing', 'Short links with abuse review', 'Scan and click analytics', 'Custom domains', 'Batch generation and API'],
    previewEmpty: 'Generate a payload to see the local SVG preview.',
    previewError: 'Preview rendering failed; the payload text remains available.',
  },
  'pt-br': {
    breadcrumbHome: 'QRRoute',
    runLabel: 'Gerar preview',
    resetLabel: 'Restaurar exemplo',
    inputTitle: 'Entradas',
    resultTitle: 'Payload',
    modeTabsTitle: 'Tipo',
    payloadSummaryTitle: 'Payload final',
    payloadEmptyTitle: 'Exemplo carregado',
    payloadEmptyBody: 'Gere um preview local para ver o payload codificado final e o resumo de seguranca.',
    payloadRunningTitle: 'Gerando localmente',
    payloadRunningBody: 'O navegador valida o payload e desenha o preview SVG.',
    payloadReadyLabel: 'Pronto',
    copyPayloadLabel: 'Copiar payload',
    copiedLabel: 'Copiado',
    copyUnavailableLabel: 'Copia indisponivel',
    downloadSvgLabel: 'Baixar SVG',
    exampleTitle: 'Exemplo',
    exampleBody: 'O formulario inicia com um payload seguro para validar o fluxo estatico antes de valores privados.',
    relatedTitle: 'Ferramentas relacionadas',
    relatedBody: 'Alterne entre QR, UTM, barcode, contato e preview mantendo o processamento local.',
    openRelatedLabel: 'Abrir',
    staticDynamicTitle: 'Estatico vs dinamico',
    staticDynamicBody: 'Codigos estaticos gratuitos codificam o payload visivel diretamente. Destinos editaveis, analytics, short links, dominios e lotes seguem bloqueados.',
    guideTitle: 'Guia e limites',
    faqTitle: 'Perguntas frequentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Utilitario gratuito',
    upgradePathLabel: 'Caminho de upgrade',
    contentQualityBody: 'Esta pagina combina ferramenta local, limites de seguranca, FAQ e revisao antes de AdSense ou pago.',
    privacyNote: 'O builder roda nesta sessao do navegador. O QRRoute nao armazena entradas, nao usa localStorage e nao envia payloads para API.',
    invalidResultTitle: 'Confira a entrada',
    localBadgeLabel: 'MVP local',
    pageStatusLabel: 'Status da ferramenta',
    liveTitle: 'MVP client-side',
    liveBody: 'O builder gratuito funciona sem cadastro e renderiza SVG estatico localmente.',
    gatedTitle: 'Redirects bloqueados',
    gatedBody: 'QR dinamico, short links, analytics, dominio proprio, billing e ads ainda nao estao ativos.',
    gatedItemsTitle: 'Workflow pago planejado',
    gatedItems: ['Edicao de QR dinamico', 'Short links com revisao antiabuso', 'Analytics de scans e cliques', 'Dominios proprios', 'Geracao em lote e API'],
    previewEmpty: 'Gere um payload para ver o preview SVG local.',
    previewError: 'Falha ao renderizar preview; o payload textual continua disponivel.',
  },
  es: {
    breadcrumbHome: 'QRRoute',
    runLabel: 'Generar vista',
    resetLabel: 'Restaurar ejemplo',
    inputTitle: 'Entradas',
    resultTitle: 'Payload',
    modeTabsTitle: 'Tipo',
    payloadSummaryTitle: 'Payload final',
    payloadEmptyTitle: 'Ejemplo cargado',
    payloadEmptyBody: 'Genera una vista local para ver el payload codificado final y el resumen de seguridad.',
    payloadRunningTitle: 'Generando localmente',
    payloadRunningBody: 'El navegador valida el payload y dibuja la vista SVG.',
    payloadReadyLabel: 'Listo',
    copyPayloadLabel: 'Copiar payload',
    copiedLabel: 'Copiado',
    copyUnavailableLabel: 'Copia no disponible',
    downloadSvgLabel: 'Descargar SVG',
    exampleTitle: 'Ejemplo',
    exampleBody: 'El formulario inicia con un payload seguro para revisar el flujo estatico antes de valores privados.',
    relatedTitle: 'Herramientas relacionadas',
    relatedBody: 'Cambia entre QR, UTM, barcode, contacto y preview manteniendo procesamiento local.',
    openRelatedLabel: 'Abrir',
    staticDynamicTitle: 'Estatico vs dinamico',
    staticDynamicBody: 'Los codigos estaticos gratis codifican el payload visible. Destinos editables, analytics, short links, dominios y lotes siguen bloqueados.',
    guideTitle: 'Guia y limites',
    faqTitle: 'Preguntas frecuentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Utilidad gratis',
    upgradePathLabel: 'Ruta de upgrade',
    contentQualityBody: 'Esta pagina combina herramienta local, limites de seguridad, FAQ y revision antes de AdSense o pago.',
    privacyNote: 'El builder corre en esta sesion del navegador. QRRoute no almacena entradas, no usa localStorage ni envia payloads a una API.',
    invalidResultTitle: 'Revisa la entrada',
    localBadgeLabel: 'MVP local',
    pageStatusLabel: 'Estado de herramienta',
    liveTitle: 'MVP client-side',
    liveBody: 'El builder gratis funciona sin registro y renderiza SVG estatico localmente.',
    gatedTitle: 'Redirects bloqueados',
    gatedBody: 'QR dinamico, short links, analytics, dominio propio, billing y ads no estan activos.',
    gatedItemsTitle: 'Workflow pago planificado',
    gatedItems: ['Edicion de QR dinamico', 'Short links con revision antiabuso', 'Analytics de scans y clics', 'Dominios propios', 'Generacion por lote y API'],
    previewEmpty: 'Genera un payload para ver la vista SVG local.',
    previewError: 'Fallo al renderizar la vista; el payload textual sigue disponible.',
  },
  fr: {
    breadcrumbHome: 'QRRoute',
    runLabel: 'Generer apercu',
    resetLabel: 'Restaurer exemple',
    inputTitle: 'Entrees',
    resultTitle: 'Payload',
    modeTabsTitle: 'Type',
    payloadSummaryTitle: 'Payload final',
    payloadEmptyTitle: 'Exemple charge',
    payloadEmptyBody: 'Generez un apercu local pour voir le payload encode final et le resume securite.',
    payloadRunningTitle: 'Generation locale',
    payloadRunningBody: 'Le navigateur valide le payload et dessine l apercu SVG.',
    payloadReadyLabel: 'Pret',
    copyPayloadLabel: 'Copier payload',
    copiedLabel: 'Copie',
    copyUnavailableLabel: 'Copie indisponible',
    downloadSvgLabel: 'Telecharger SVG',
    exampleTitle: 'Exemple',
    exampleBody: 'Le formulaire commence avec un payload sur pour verifier le flux statique avant des valeurs privees.',
    relatedTitle: 'Outils lies',
    relatedBody: 'Passez entre QR, UTM, barcode, contact et apercu en gardant le traitement local.',
    openRelatedLabel: 'Ouvrir',
    staticDynamicTitle: 'Statique vs dynamique',
    staticDynamicBody: 'Les codes statiques gratuits encodent directement le payload visible. Destinations editables, analytics, short links, domaines et lots restent bloques.',
    guideTitle: 'Guide et limites',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    freeCheckLabel: 'Utilitaire gratuit',
    upgradePathLabel: 'Offre payante',
    contentQualityBody: 'Cette page combine outil local, limites securite, FAQ et date de revue avant AdSense ou payant.',
    privacyNote: 'Le builder s execute dans cette session navigateur. QRRoute ne stocke pas les entrees, n utilise pas localStorage et n envoie pas les payloads a une API.',
    invalidResultTitle: 'Verifiez l entree',
    localBadgeLabel: 'MVP local',
    pageStatusLabel: 'Statut outil',
    liveTitle: 'MVP client-side',
    liveBody: 'Le builder gratuit fonctionne sans compte et rend des apercus SVG statiques localement.',
    gatedTitle: 'Redirects bloques',
    gatedBody: 'QR dynamique, short links, analytics, domaine propre, billing et ads ne sont pas actifs.',
    gatedItemsTitle: 'Workflow payant prevu',
    gatedItems: ['Edition QR dynamique', 'Short links avec revue anti-abus', 'Analytics scans et clics', 'Domaines personnalises', 'Generation lot et API'],
    previewEmpty: 'Generez un payload pour voir l apercu SVG local.',
    previewError: 'Echec de rendu; le payload texte reste disponible.',
  },
  de: {
    breadcrumbHome: 'QRRoute',
    runLabel: 'Vorschau erzeugen',
    resetLabel: 'Beispiel zuruecksetzen',
    inputTitle: 'Eingaben',
    resultTitle: 'Payload',
    modeTabsTitle: 'Typ',
    payloadSummaryTitle: 'Finaler Payload',
    payloadEmptyTitle: 'Beispiel geladen',
    payloadEmptyBody: 'Erzeugen Sie eine lokale Vorschau, um den codierten Payload und die Sicherheitsnotiz zu sehen.',
    payloadRunningTitle: 'Lokale Generierung',
    payloadRunningBody: 'Der Browser prueft den Payload und zeichnet die SVG-Vorschau.',
    payloadReadyLabel: 'Bereit',
    copyPayloadLabel: 'Payload kopieren',
    copiedLabel: 'Kopiert',
    copyUnavailableLabel: 'Kopie nicht verfuegbar',
    downloadSvgLabel: 'SVG herunterladen',
    exampleTitle: 'Beispiel',
    exampleBody: 'Das Formular startet mit einem sicheren Payload, bevor private Werte eingegeben werden.',
    relatedTitle: 'Verwandte Tools',
    relatedBody: 'Wechseln Sie zwischen QR, UTM, Barcode, Kontakt und Vorschau im lokalen Ablauf.',
    openRelatedLabel: 'Oeffnen',
    staticDynamicTitle: 'Statisch vs dynamisch',
    staticDynamicBody: 'Kostenlose statische Codes codieren den sichtbaren Payload direkt. Editierbare Ziele, Analytics, Short Links, Domains und Batch bleiben gesperrt.',
    guideTitle: 'Leitfaden und Grenzen',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    freeCheckLabel: 'Kostenloses Tool',
    upgradePathLabel: 'Upgrade-Pfad',
    contentQualityBody: 'Diese Seite kombiniert lokales Tool, Sicherheitsgrenzen, FAQ und Pruefdatum vor AdSense oder Zahlung.',
    privacyNote: 'Der Builder laeuft in dieser Browser-Sitzung. QRRoute speichert keine Eingaben, nutzt kein localStorage und sendet keine Payloads an eine API.',
    invalidResultTitle: 'Eingabe pruefen',
    localBadgeLabel: 'Lokales MVP',
    pageStatusLabel: 'Toolstatus',
    liveTitle: 'Client-seitiges MVP',
    liveBody: 'Der kostenlose Builder funktioniert ohne Konto und rendert statische SVG-Vorschauen lokal.',
    gatedTitle: 'Redirects gesperrt',
    gatedBody: 'Dynamische QR, Short Links, Analytics, eigene Domains, Billing und Ads sind noch nicht aktiv.',
    gatedItemsTitle: 'Geplanter bezahlter Workflow',
    gatedItems: ['Dynamische QR-Bearbeitung', 'Short Links mit Abuse-Pruefung', 'Scan- und Klick-Analytics', 'Eigene Domains', 'Batch-Generierung und API'],
    previewEmpty: 'Erzeugen Sie einen Payload, um die lokale SVG-Vorschau zu sehen.',
    previewError: 'Vorschau konnte nicht gerendert werden; der Text-Payload bleibt verfuegbar.',
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return sanitizePublicCopy(locale, homeCopy[locale])
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return sanitizePublicCopy(locale, shellCopy[locale])
}
