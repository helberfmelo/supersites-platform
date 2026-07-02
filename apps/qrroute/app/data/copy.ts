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
  supportTitle: string
  supportBody: string
  supportCta: string
}

export interface ShellCopy {
  breadcrumbHome: string
  runLabel: string
  resetLabel: string
  inputTitle: string
  resultTitle: string
  modeTabsTitle: string
  toolTabsTitle: string
  workbenchEyebrow: string
  workbenchTitle: string
  workbenchBody: string
  privacyStripTitle: string
  privacyStripBody: string
  previewTrustTitle: string
  previewTrustBody: string
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
  downloadPngLabel: string
  printLabel: string
  printUnavailableLabel: string
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
  advancedTitle: string
  advancedBody: string
  advancedItemsTitle: string
  advancedItems: string[]
  previewEmpty: string
  previewError: string
  staticValueLabel: string
  staticOptionalLabel: string
  barcodeValueLabel: string
  barcodeLabelLabel: string
  barcodeSizeLabel: string
  barcodeSizeCompact: string
  barcodeSizeStandard: string
  barcodeSizeLarge: string
  utmBaseUrlLabel: string
  utmSourceLabel: string
  utmMediumLabel: string
  utmCampaignLabel: string
  utmTermLabel: string
  utmContentLabel: string
  utmPresetTitle: string
  utmPresetNewsletter: string
  utmPresetSocial: string
  utmPresetLaunch: string
  vcardNameLabel: string
  vcardOrgLabel: string
  vcardPhoneLabel: string
  vcardEmailLabel: string
  vcardWebsiteLabel: string
  wifiSsidLabel: string
  wifiPasswordLabel: string
  wifiEncryptionLabel: string
  wifiHiddenLabel: string
  wifiShowPasswordLabel: string
  wifiHidePasswordLabel: string
  previewPayloadLabel: string
  previewContextLabel: string
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
      { title: 'Static first', body: 'The free builder solves one-off QR, barcode and link payload creation without an account.' },
      { title: 'No hidden redirect', body: 'Static previews encode the visible payload directly; editable QR and short links are advanced account workflows.' },
      { title: 'Analytics without PII', body: 'Only tool slugs and safe route paths enter local events for this browser builder.' },
    ],
    statusRows: [
      { title: '6 local workflow tools', body: 'Static QR, barcode, UTM, vCard, Wi-Fi and preview inspection.', tone: 'green' },
      { title: '5 language route sets', body: 'English, Portuguese, Spanish, French and German pages are prerendered.', tone: 'green' },
      { title: 'Advanced link workflows', body: 'Editable destinations, scan insights, custom domains, batch and API belong to account workflows.', tone: 'amber' },
    ],
    supportTitle: 'Support QRRoute',
    supportBody: 'The static builder stays free. Bookmark QRRoute, share it when useful or send corrections from the contact page.',
    supportCta: 'Free builder available',
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
      { title: 'Estatico primeiro', body: 'O construtor gratuito resolve criacao pontual de QR, barcode e payloads sem conta.' },
      { title: 'Sem redirect oculto', body: 'Previews estaticos codificam o payload visivel; QR editavel e short links pertencem a workflows avancados de conta.' },
      { title: 'Analytics sem PII', body: 'Apenas tool slug e rota segura entram nos eventos locais deste construtor.' },
    ],
    statusRows: [
      { title: '6 ferramentas locais', body: 'QR estatico, barcode, UTM, vCard, Wi-Fi e inspecao de preview.', tone: 'green' },
      { title: '5 conjuntos de idioma', body: 'Paginas em ingles, portugues, espanhol, frances e alemao sao prerenderizadas.', tone: 'green' },
      { title: 'Workflows avancados de link', body: 'Destino editavel, metricas de scan, dominio proprio, lote e API pertencem a workflows de conta.', tone: 'amber' },
    ],
    supportTitle: 'Apoie o QRRoute',
    supportBody: 'O construtor estatico fica gratuito. Salve o QRRoute, compartilhe quando for util ou envie correcoes pela pagina de contato.',
    supportCta: 'Construtor gratuito disponivel',
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
      { title: 'Estatico primero', body: 'El builder gratis resuelve creacion puntual de QR, barcode y payloads sin cuenta.' },
      { title: 'Sin redirect oculto', body: 'Las vistas estaticas codifican el payload visible; QR editable y short links pertenecen a workflows avanzados de cuenta.' },
      { title: 'Analytics sin PII', body: 'Solo tool slug y ruta segura entran en eventos locales de este builder.' },
    ],
    statusRows: [
      { title: '6 herramientas locales', body: 'QR estatico, barcode, UTM, vCard, Wi-Fi e inspeccion preview.', tone: 'green' },
      { title: '5 rutas de idioma', body: 'Paginas en ingles, portugues, espanol, frances y aleman se prerenderizan.', tone: 'green' },
      { title: 'Workflows avanzados de enlace', body: 'Destino editable, metricas de escaneo, dominio propio, lote y API pertenecen a workflows de cuenta.', tone: 'amber' },
    ],
    supportTitle: 'Apoya QRRoute',
    supportBody: 'El builder estatico sigue gratis. Guarda QRRoute, compartelo cuando sea util o envia correcciones desde la pagina de contacto.',
    supportCta: 'Builder gratis disponible',
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
      { title: 'Statique d abord', body: 'Le builder gratuit cree QR, barcode et payloads ponctuels sans compte.' },
      { title: 'Pas de redirect cache', body: 'Les apercus statiques encodent le payload visible; QR editable et short links appartiennent aux workflows de compte avances.' },
      { title: 'Analytics sans PII', body: 'Seuls tool slug et route sure entrent dans le data layer local.' },
    ],
    statusRows: [
      { title: '6 outils locaux', body: 'QR statique, barcode, UTM, vCard, Wi-Fi et inspection preview.', tone: 'green' },
      { title: '5 routes de langue', body: 'Pages anglaises, portugaises, espagnoles, francaises et allemandes prerenderisees.', tone: 'green' },
      { title: 'Workflows lien avances', body: 'Destination editable, mesures de scan, domaine propre, lot et API appartiennent aux workflows de compte.', tone: 'amber' },
    ],
    supportTitle: 'Soutenir QRRoute',
    supportBody: 'Le builder statique reste gratuit. Enregistrez QRRoute, partagez-le s il aide ou envoyez des corrections via la page de contact.',
    supportCta: 'Builder gratuit disponible',
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
      { title: 'Statisch zuerst', body: 'Der kostenlose Builder erstellt einzelne QR-, Barcode- und Payload-Werte ohne Konto.' },
      { title: 'Kein versteckter Redirect', body: 'Statische Vorschauen codieren den sichtbaren Payload; editierbare QR-Codes und Short Links gehoeren zu erweiterten Kontoworkflows.' },
      { title: 'Analytics ohne PII', body: 'Nur Tool-Slug und sichere Route gehen in den lokalen Data Layer.' },
    ],
    statusRows: [
      { title: '6 lokale Workflow-Tools', body: 'Statischer QR, Barcode, UTM, vCard, Wi-Fi und Preview-Inspektion.', tone: 'green' },
      { title: '5 Sprachrouten', body: 'Englische, portugiesische, spanische, franzoesische und deutsche Seiten werden prerendered.', tone: 'green' },
      { title: 'Erweiterte Link-Workflows', body: 'Editierbare Ziele, Scan-Metriken, eigene Domain, Batch und API gehoeren zu Kontoworkflows.', tone: 'amber' },
    ],
    supportTitle: 'QRRoute unterstuetzen',
    supportBody: 'Der statische Builder bleibt kostenlos. Speichern Sie QRRoute, teilen Sie es bei Bedarf oder senden Sie Korrekturen ueber die Kontaktseite.',
    supportCta: 'Kostenloser Builder verfuegbar',
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
    toolTabsTitle: 'QRRoute workflow tabs',
    workbenchEyebrow: 'Create now',
    workbenchTitle: 'Build a QR, barcode, UTM, vCard or Wi-Fi code in one local workspace.',
    workbenchBody: 'Choose a workflow, edit the sample, preview the SVG and copy or download the output before moving into the guide.',
    privacyStripTitle: 'Private by design',
    privacyStripBody: 'Inputs stay in this browser session. No payload, URL, contact, Wi-Fi secret or barcode value is sent to a product API.',
    previewTrustTitle: 'Live preview',
    previewTrustBody: 'The preview is generated locally from the visible payload, with no hidden short link.',
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
    downloadPngLabel: 'Download PNG',
    printLabel: 'Print',
    printUnavailableLabel: 'Print unavailable',
    exampleTitle: 'Example',
    exampleBody: 'The form starts with a safe sample payload so the static workflow can be checked before private values.',
    relatedTitle: 'Related tools',
    relatedBody: 'Switch between QR, UTM, barcode, contact and preview workflows while keeping processing local.',
    openRelatedLabel: 'Open',
    staticDynamicTitle: 'Static vs dynamic',
    staticDynamicBody: 'Free static codes encode the visible payload directly. Editable destinations, scan analytics, short links, custom domains and batch workflows require an account workflow.',
    guideTitle: 'Guide and limits',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    freeCheckLabel: 'Free utility',
    upgradePathLabel: 'Upgrade path',
    contentQualityBody: 'Create the code, scan it once and verify the destination before printing or sharing.',
    privacyNote: 'The builder runs in this browser session. QRRoute does not store inputs, use localStorage or send payloads to a product API.',
    invalidResultTitle: 'Check the input',
    localBadgeLabel: 'Local tool',
    pageStatusLabel: 'Tool status',
    liveTitle: 'Client-side builder',
    liveBody: 'The free builder works without signup and renders static SVG previews locally.',
    advancedTitle: 'Advanced account links',
    advancedBody: 'Editable QR, short links, analytics, custom domains, batch jobs and API access require account, abuse and privacy controls.',
    advancedItemsTitle: 'Account workflow',
    advancedItems: ['Editable QR destination', 'Short links with abuse review', 'Scan and click analytics', 'Custom domains', 'Batch generation and API'],
    previewEmpty: 'Generate a payload to see the local SVG preview.',
    previewError: 'Preview rendering failed; the payload text remains available.',
    staticValueLabel: 'QR value',
    staticOptionalLabel: 'Optional label',
    barcodeValueLabel: 'Barcode value',
    barcodeLabelLabel: 'Human-readable label',
    barcodeSizeLabel: 'Barcode size',
    barcodeSizeCompact: 'Compact',
    barcodeSizeStandard: 'Standard',
    barcodeSizeLarge: 'Large',
    utmBaseUrlLabel: 'Base campaign URL',
    utmSourceLabel: 'Source',
    utmMediumLabel: 'Medium',
    utmCampaignLabel: 'Campaign',
    utmTermLabel: 'Term',
    utmContentLabel: 'Content',
    utmPresetTitle: 'Campaign presets',
    utmPresetNewsletter: 'Newsletter',
    utmPresetSocial: 'Social launch',
    utmPresetLaunch: 'Product launch',
    vcardNameLabel: 'Name',
    vcardOrgLabel: 'Organization',
    vcardPhoneLabel: 'Phone',
    vcardEmailLabel: 'Email',
    vcardWebsiteLabel: 'Website',
    wifiSsidLabel: 'SSID',
    wifiPasswordLabel: 'Password',
    wifiEncryptionLabel: 'Encryption',
    wifiHiddenLabel: 'Hidden network',
    wifiShowPasswordLabel: 'Show',
    wifiHidePasswordLabel: 'Hide',
    previewPayloadLabel: 'Payload to inspect',
    previewContextLabel: 'Optional context',
  },
  'pt-br': {
    breadcrumbHome: 'QRRoute',
    runLabel: 'Gerar preview',
    resetLabel: 'Restaurar exemplo',
    inputTitle: 'Entradas',
    resultTitle: 'Payload',
    modeTabsTitle: 'Tipo',
    toolTabsTitle: 'Abas de workflow do QRRoute',
    workbenchEyebrow: 'Crie agora',
    workbenchTitle: 'Gere QR, barcode, UTM, vCard ou Wi-Fi em um workspace local.',
    workbenchBody: 'Escolha um fluxo, edite o exemplo, veja o SVG e copie ou baixe a saida antes do guia.',
    privacyStripTitle: 'Privado por design',
    privacyStripBody: 'Entradas ficam nesta sessao do navegador. Nenhum payload, URL, contato, senha Wi-Fi ou barcode vai para API de produto.',
    previewTrustTitle: 'Preview ao vivo',
    previewTrustBody: 'O preview e gerado localmente a partir do payload visivel, sem short link oculto.',
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
    downloadPngLabel: 'Baixar PNG',
    printLabel: 'Imprimir',
    printUnavailableLabel: 'Impressao indisponivel',
    exampleTitle: 'Exemplo',
    exampleBody: 'O formulario inicia com um payload seguro para validar o fluxo estatico antes de valores privados.',
    relatedTitle: 'Ferramentas relacionadas',
    relatedBody: 'Alterne entre QR, UTM, barcode, contato e preview mantendo o processamento local.',
    openRelatedLabel: 'Abrir',
    staticDynamicTitle: 'Estatico vs dinamico',
    staticDynamicBody: 'Codigos estaticos gratuitos codificam o payload visivel diretamente. Destinos editaveis, analytics, short links, dominios e lotes exigem workflow de conta.',
    guideTitle: 'Guia e limites',
    faqTitle: 'Perguntas frequentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Utilitario gratuito',
    upgradePathLabel: 'Caminho de upgrade',
    contentQualityBody: 'Crie o código, teste com um leitor e confira o destino antes de imprimir ou compartilhar.',
    privacyNote: 'O builder roda nesta sessao do navegador. O QRRoute nao armazena entradas, nao usa localStorage e nao envia payloads para API.',
    invalidResultTitle: 'Confira a entrada',
    localBadgeLabel: 'Ferramenta local',
    pageStatusLabel: 'Status da ferramenta',
    liveTitle: 'Builder client-side',
    liveBody: 'O builder gratuito funciona sem cadastro e renderiza SVG estatico localmente.',
    advancedTitle: 'Links avancados de conta',
    advancedBody: 'QR editavel, short links, analytics, dominio proprio, lotes e API exigem controles de conta, abuso e privacidade.',
    advancedItemsTitle: 'Workflow de conta',
    advancedItems: ['Destino de QR editavel', 'Short links com revisao antiabuso', 'Analytics de scans e cliques', 'Dominios proprios', 'Geracao em lote e API'],
    previewEmpty: 'Gere um payload para ver o preview SVG local.',
    previewError: 'Falha ao renderizar preview; o payload textual continua disponivel.',
    staticValueLabel: 'Valor do QR',
    staticOptionalLabel: 'Rotulo opcional',
    barcodeValueLabel: 'Valor do barcode',
    barcodeLabelLabel: 'Rotulo legivel',
    barcodeSizeLabel: 'Tamanho do barcode',
    barcodeSizeCompact: 'Compacto',
    barcodeSizeStandard: 'Padrao',
    barcodeSizeLarge: 'Grande',
    utmBaseUrlLabel: 'URL base da campanha',
    utmSourceLabel: 'Origem',
    utmMediumLabel: 'Meio',
    utmCampaignLabel: 'Campanha',
    utmTermLabel: 'Termo',
    utmContentLabel: 'Conteudo',
    utmPresetTitle: 'Presets de campanha',
    utmPresetNewsletter: 'Newsletter',
    utmPresetSocial: 'Lancamento social',
    utmPresetLaunch: 'Lancamento de produto',
    vcardNameLabel: 'Nome',
    vcardOrgLabel: 'Organizacao',
    vcardPhoneLabel: 'Telefone',
    vcardEmailLabel: 'Email',
    vcardWebsiteLabel: 'Site',
    wifiSsidLabel: 'SSID',
    wifiPasswordLabel: 'Senha',
    wifiEncryptionLabel: 'Criptografia',
    wifiHiddenLabel: 'Rede oculta',
    wifiShowPasswordLabel: 'Mostrar',
    wifiHidePasswordLabel: 'Ocultar',
    previewPayloadLabel: 'Payload para inspecionar',
    previewContextLabel: 'Contexto opcional',
  },
  es: {
    breadcrumbHome: 'QRRoute',
    runLabel: 'Generar vista',
    resetLabel: 'Restaurar ejemplo',
    inputTitle: 'Entradas',
    resultTitle: 'Payload',
    modeTabsTitle: 'Tipo',
    toolTabsTitle: 'Pestanas de workflow QRRoute',
    workbenchEyebrow: 'Crear ahora',
    workbenchTitle: 'Crea QR, barcode, UTM, vCard o Wi-Fi en un workspace local.',
    workbenchBody: 'Elige un flujo, edita el ejemplo, revisa el SVG y copia o descarga la salida antes de la guia.',
    privacyStripTitle: 'Privado por diseno',
    privacyStripBody: 'Las entradas quedan en esta sesion del navegador. Ningun payload, URL, contacto, secreto Wi-Fi o barcode va a una API.',
    previewTrustTitle: 'Vista en vivo',
    previewTrustBody: 'La vista se genera localmente desde el payload visible, sin short link oculto.',
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
    downloadPngLabel: 'Descargar PNG',
    printLabel: 'Imprimir',
    printUnavailableLabel: 'Impresion no disponible',
    exampleTitle: 'Ejemplo',
    exampleBody: 'El formulario inicia con un payload seguro para revisar el flujo estatico antes de valores privados.',
    relatedTitle: 'Herramientas relacionadas',
    relatedBody: 'Cambia entre QR, UTM, barcode, contacto y preview manteniendo procesamiento local.',
    openRelatedLabel: 'Abrir',
    staticDynamicTitle: 'Estatico vs dinamico',
    staticDynamicBody: 'Los codigos estaticos gratis codifican el payload visible. Destinos editables, analytics, short links, dominios y lotes requieren workflow de cuenta.',
    guideTitle: 'Guia y limites',
    faqTitle: 'Preguntas frecuentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Utilidad gratis',
    upgradePathLabel: 'Ruta de upgrade',
    contentQualityBody: 'Crea el código, pruébalo con un lector y verifica el destino antes de imprimir o compartir.',
    privacyNote: 'El builder corre en esta sesion del navegador. QRRoute no almacena entradas, no usa localStorage ni envia payloads a una API.',
    invalidResultTitle: 'Revisa la entrada',
    localBadgeLabel: 'Herramienta local',
    pageStatusLabel: 'Estado de herramienta',
    liveTitle: 'Builder client-side',
    liveBody: 'El builder gratis funciona sin registro y renderiza SVG estatico localmente.',
    advancedTitle: 'Enlaces avanzados de cuenta',
    advancedBody: 'QR editable, short links, analytics, dominio propio, lotes y API requieren controles de cuenta, abuso y privacidad.',
    advancedItemsTitle: 'Workflow de cuenta',
    advancedItems: ['Destino QR editable', 'Short links con revision antiabuso', 'Analytics de escaneos y clics', 'Dominios propios', 'Generacion por lote y API'],
    previewEmpty: 'Genera un payload para ver la vista SVG local.',
    previewError: 'Fallo al renderizar la vista; el payload textual sigue disponible.',
    staticValueLabel: 'Valor del QR',
    staticOptionalLabel: 'Etiqueta opcional',
    barcodeValueLabel: 'Valor del codigo',
    barcodeLabelLabel: 'Etiqueta legible',
    barcodeSizeLabel: 'Tamano del codigo',
    barcodeSizeCompact: 'Compacto',
    barcodeSizeStandard: 'Estandar',
    barcodeSizeLarge: 'Grande',
    utmBaseUrlLabel: 'URL base de campana',
    utmSourceLabel: 'Origen',
    utmMediumLabel: 'Medio',
    utmCampaignLabel: 'Campana',
    utmTermLabel: 'Termino',
    utmContentLabel: 'Contenido',
    utmPresetTitle: 'Presets de campana',
    utmPresetNewsletter: 'Newsletter',
    utmPresetSocial: 'Lanzamiento social',
    utmPresetLaunch: 'Lanzamiento de producto',
    vcardNameLabel: 'Nombre',
    vcardOrgLabel: 'Organizacion',
    vcardPhoneLabel: 'Telefono',
    vcardEmailLabel: 'Email',
    vcardWebsiteLabel: 'Sitio web',
    wifiSsidLabel: 'SSID',
    wifiPasswordLabel: 'Clave',
    wifiEncryptionLabel: 'Cifrado',
    wifiHiddenLabel: 'Red oculta',
    wifiShowPasswordLabel: 'Mostrar',
    wifiHidePasswordLabel: 'Ocultar',
    previewPayloadLabel: 'Payload para inspeccionar',
    previewContextLabel: 'Contexto opcional',
  },
  fr: {
    breadcrumbHome: 'QRRoute',
    runLabel: 'Generer apercu',
    resetLabel: 'Restaurer exemple',
    inputTitle: 'Entrees',
    resultTitle: 'Payload',
    modeTabsTitle: 'Type',
    toolTabsTitle: 'Onglets workflow QRRoute',
    workbenchEyebrow: 'Creer maintenant',
    workbenchTitle: 'Creez QR, code-barres, UTM, vCard ou Wi-Fi dans un workspace local.',
    workbenchBody: 'Choisissez un flux, modifiez l exemple, verifiez le SVG puis copiez ou telechargez la sortie avant le guide.',
    privacyStripTitle: 'Prive par design',
    privacyStripBody: 'Les entrees restent dans cette session navigateur. Aucun payload, URL, contact, secret Wi-Fi ou barcode ne part vers une API.',
    previewTrustTitle: 'Apercu en direct',
    previewTrustBody: 'L apercu est genere localement depuis le payload visible, sans short link cache.',
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
    downloadPngLabel: 'Telecharger PNG',
    printLabel: 'Imprimer',
    printUnavailableLabel: 'Impression indisponible',
    exampleTitle: 'Exemple',
    exampleBody: 'Le formulaire commence avec un payload sur pour verifier le flux statique avant des valeurs privees.',
    relatedTitle: 'Outils lies',
    relatedBody: 'Passez entre QR, UTM, barcode, contact et apercu en gardant le traitement local.',
    openRelatedLabel: 'Ouvrir',
    staticDynamicTitle: 'Statique vs dynamique',
    staticDynamicBody: 'Les codes statiques gratuits encodent directement le payload visible. Destinations editables, analytics, short links, domaines et lots exigent un workflow de compte.',
    guideTitle: 'Guide et limites',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    freeCheckLabel: 'Utilitaire gratuit',
    upgradePathLabel: 'Offre payante',
    contentQualityBody: 'Créez le code, testez-le avec un lecteur et vérifiez la destination avant impression ou partage.',
    privacyNote: 'Le builder s execute dans cette session navigateur. QRRoute ne stocke pas les entrees, n utilise pas localStorage et n envoie pas les payloads a une API.',
    invalidResultTitle: 'Verifiez l entree',
    localBadgeLabel: 'Outil local',
    pageStatusLabel: 'Statut outil',
    liveTitle: 'Builder client-side',
    liveBody: 'Le builder gratuit fonctionne sans compte et rend des apercus SVG statiques localement.',
    advancedTitle: 'Liens avances de compte',
    advancedBody: 'QR editable, short links, analytics, domaine propre, lots et API exigent controles de compte, abus et confidentialite.',
    advancedItemsTitle: 'Workflow de compte',
    advancedItems: ['Destination QR editable', 'Short links avec revue anti-abus', 'Analytics scans et clics', 'Domaines personnalises', 'Generation lot et API'],
    previewEmpty: 'Generez un payload pour voir l apercu SVG local.',
    previewError: 'Echec de rendu; le payload texte reste disponible.',
    staticValueLabel: 'Valeur QR',
    staticOptionalLabel: 'Libelle facultatif',
    barcodeValueLabel: 'Valeur code-barres',
    barcodeLabelLabel: 'Libelle lisible',
    barcodeSizeLabel: 'Taille du code-barres',
    barcodeSizeCompact: 'Compact',
    barcodeSizeStandard: 'Standard',
    barcodeSizeLarge: 'Grand',
    utmBaseUrlLabel: 'URL de base campagne',
    utmSourceLabel: 'Source',
    utmMediumLabel: 'Medium',
    utmCampaignLabel: 'Campagne',
    utmTermLabel: 'Terme',
    utmContentLabel: 'Contenu',
    utmPresetTitle: 'Presets campagne',
    utmPresetNewsletter: 'Newsletter',
    utmPresetSocial: 'Lancement social',
    utmPresetLaunch: 'Lancement produit',
    vcardNameLabel: 'Nom',
    vcardOrgLabel: 'Organisation',
    vcardPhoneLabel: 'Telephone',
    vcardEmailLabel: 'Email',
    vcardWebsiteLabel: 'Site web',
    wifiSsidLabel: 'SSID',
    wifiPasswordLabel: 'Mot de passe',
    wifiEncryptionLabel: 'Chiffrement',
    wifiHiddenLabel: 'Reseau masque',
    wifiShowPasswordLabel: 'Afficher',
    wifiHidePasswordLabel: 'Masquer',
    previewPayloadLabel: 'Payload a inspecter',
    previewContextLabel: 'Contexte facultatif',
  },
  de: {
    breadcrumbHome: 'QRRoute',
    runLabel: 'Vorschau erzeugen',
    resetLabel: 'Beispiel zuruecksetzen',
    inputTitle: 'Eingaben',
    resultTitle: 'Payload',
    modeTabsTitle: 'Typ',
    toolTabsTitle: 'QRRoute Workflow-Tabs',
    workbenchEyebrow: 'Jetzt erstellen',
    workbenchTitle: 'Erstellen Sie QR, Barcode, UTM, vCard oder Wi-Fi in einem lokalen Workspace.',
    workbenchBody: 'Waehlen Sie einen Ablauf, bearbeiten Sie das Beispiel, pruefen Sie das SVG und kopieren oder laden Sie die Ausgabe herunter.',
    privacyStripTitle: 'Privat by design',
    privacyStripBody: 'Eingaben bleiben in dieser Browser-Sitzung. Kein Payload, keine URL, kein Kontakt, Wi-Fi-Geheimnis oder Barcode geht an eine API.',
    previewTrustTitle: 'Live-Vorschau',
    previewTrustBody: 'Die Vorschau entsteht lokal aus dem sichtbaren Payload, ohne versteckten Short Link.',
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
    downloadPngLabel: 'PNG herunterladen',
    printLabel: 'Drucken',
    printUnavailableLabel: 'Druck nicht verfuegbar',
    exampleTitle: 'Beispiel',
    exampleBody: 'Das Formular startet mit einem sicheren Payload, bevor private Werte eingegeben werden.',
    relatedTitle: 'Verwandte Tools',
    relatedBody: 'Wechseln Sie zwischen QR, UTM, Barcode, Kontakt und Vorschau im lokalen Ablauf.',
    openRelatedLabel: 'Oeffnen',
    staticDynamicTitle: 'Statisch vs dynamisch',
    staticDynamicBody: 'Kostenlose statische Codes codieren den sichtbaren Payload direkt. Editierbare Ziele, Analytics, Short Links, Domains und Batch erfordern einen Kontoworkflow.',
    guideTitle: 'Leitfaden und Grenzen',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    freeCheckLabel: 'Kostenloses Tool',
    upgradePathLabel: 'Upgrade-Pfad',
    contentQualityBody: 'Erstellen Sie den Code, scannen Sie ihn einmal und prüfen Sie das Ziel vor Druck oder Teilen.',
    privacyNote: 'Der Builder laeuft in dieser Browser-Sitzung. QRRoute speichert keine Eingaben, nutzt kein localStorage und sendet keine Payloads an eine API.',
    invalidResultTitle: 'Eingabe pruefen',
    localBadgeLabel: 'Lokales Tool',
    pageStatusLabel: 'Toolstatus',
    liveTitle: 'Client-seitiger Builder',
    liveBody: 'Der kostenlose Builder funktioniert ohne Konto und rendert statische SVG-Vorschauen lokal.',
    advancedTitle: 'Erweiterte Konto-Links',
    advancedBody: 'Editierbare QR-Codes, Short Links, Analytics, eigene Domains, Batch-Jobs und API-Zugriff erfordern Konto-, Abuse- und Datenschutzkontrollen.',
    advancedItemsTitle: 'Kontoworkflow',
    advancedItems: ['Editierbares QR-Ziel', 'Short Links mit Abuse-Pruefung', 'Scan- und Klick-Analytics', 'Eigene Domains', 'Batch-Generierung und API'],
    previewEmpty: 'Erzeugen Sie einen Payload, um die lokale SVG-Vorschau zu sehen.',
    previewError: 'Vorschau konnte nicht gerendert werden; der Text-Payload bleibt verfuegbar.',
    staticValueLabel: 'QR-Wert',
    staticOptionalLabel: 'Optionales Label',
    barcodeValueLabel: 'Barcode-Wert',
    barcodeLabelLabel: 'Lesbares Label',
    barcodeSizeLabel: 'Barcode-Groesse',
    barcodeSizeCompact: 'Kompakt',
    barcodeSizeStandard: 'Standard',
    barcodeSizeLarge: 'Gross',
    utmBaseUrlLabel: 'Basis-URL der Kampagne',
    utmSourceLabel: 'Quelle',
    utmMediumLabel: 'Medium',
    utmCampaignLabel: 'Kampagne',
    utmTermLabel: 'Begriff',
    utmContentLabel: 'Inhalt',
    utmPresetTitle: 'Kampagnen-Presets',
    utmPresetNewsletter: 'Newsletter',
    utmPresetSocial: 'Social Launch',
    utmPresetLaunch: 'Produktlaunch',
    vcardNameLabel: 'Name',
    vcardOrgLabel: 'Organisation',
    vcardPhoneLabel: 'Telefon',
    vcardEmailLabel: 'E-Mail',
    vcardWebsiteLabel: 'Website',
    wifiSsidLabel: 'SSID',
    wifiPasswordLabel: 'Passwort',
    wifiEncryptionLabel: 'Verschluesselung',
    wifiHiddenLabel: 'Verborgenes Netzwerk',
    wifiShowPasswordLabel: 'Zeigen',
    wifiHidePasswordLabel: 'Verbergen',
    previewPayloadLabel: 'Payload pruefen',
    previewContextLabel: 'Optionaler Kontext',
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return sanitizePublicCopy(locale, homeCopy[locale])
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return sanitizePublicCopy(locale, shellCopy[locale])
}
