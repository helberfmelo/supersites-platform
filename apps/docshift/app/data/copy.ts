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
  localBadgeLabel: string
  freeLabel: string
  upgradeLabel: string
  detailCta: string
  principlesTitle: string
  principles: Array<{ title: string; body: string }>
  statusRows: Array<{ title: string; body: string; tone: 'green' | 'amber' }>
  footerToolsTitle: string
  footerToolsBody: string
}

export interface ShellCopy {
  breadcrumbHome: string
  workbenchEyebrow: string
  workbenchTitle: string
  workbenchBody: string
  toolTabsLabel: string
  openGuideLabel: string
  previewEyebrow: string
  previewEmptyTitle: string
  processingTitle: string
  processingBody: string
  localTrustTitle: string
  runLabel: string
  resetLabel: string
  downloadLabel: string
  inputTitle: string
  resultTitle: string
  guideTitle: string
  relatedTitle: string
  faqTitle: string
  methodologyLabel: string
  editorialLabel: string
  freeCheckLabel: string
  upgradePathLabel: string
  contentQualityBody: string
  privacyNote: string
  invalidResultTitle: string
  pageStatusLabel: string
  liveTitle: string
  liveBody: string
  gatedTitle: string
  gatedBody: string
  fileLabel: string
  pagesLabel: string
  rotationLabel: string
  watermarkLabel: string
  metadataTitleLabel: string
  metadataAuthorLabel: string
  textLabel: string
  dropzoneTitle: string
  dropzoneBody: string
  fileStateTitle: string
  workflowSnapshotTitle: string
  workflowModeLabel: string
  workflowInputLabel: string
  workflowOutputLabel: string
  workflowProcessingLabel: string
  noFileSelectedLabel: string
  charactersInMemoryLabel: string
  outputPendingLabel: string
  workerPipelineLabel: string
  tabPipelineLabel: string
  actualOutputLabel: string
  workerLabel: string
  browserWorkerLabel: string
  localFallbackLabel: string
  processedPreviewTitle: string
  fileOrderTitle: string
  moveUpLabel: string
  moveDownLabel: string
  pageScopeLabel: string
  allPagesLabel: string
  pageRangeLabel: string
  pageRangeHelp: string
  rotateByLabel: string
  watermarkPositionLabel: string
  watermarkOpacityLabel: string
  watermarkSizeLabel: string
  positionDiagonalLabel: string
  positionCenterLabel: string
  positionTopLeftLabel: string
  positionTopRightLabel: string
  positionBottomLeftLabel: string
  positionBottomRightLabel: string
  pageNumberPositionLabel: string
  pageNumberStartLabel: string
  pageNumberFormatLabel: string
  pageNumberFormatNumberLabel: string
  pageNumberFormatPageLabel: string
  pageNumberFormatTotalLabel: string
  textTitleLabel: string
  pageSizeLabel: string
  fontSizeLabel: string
  currentMetadataTitleLabel: string
  currentMetadataAuthorLabel: string
  metadataUnknownLabel: string
  localCompressionBody: string
  originalSizeLabel: string
  savingsLabel: string
  reductionLabel: string
  privacyChecklistTitle: string
  privacyChecklistItems: string[]
  fileSafetyLabel: string
  fileSafetyBody: string
  heavyQueueTitle: string
  heavyQueueBody: string
  heavyQueueItems: string[]
  relatedToolsTitle: string
  relatedToolsBody: string
}

export const homeCopy: Record<LocaleCode, HomeCopy> = {
  en: {
    eyebrow: 'DocShift',
    title: 'Merge, split, rotate and clean PDFs in your browser.',
    lead: 'Run useful PDF workflows locally without mandatory signup: merge, split, rotate, compress, watermark, page numbers, metadata cleanup and plain text conversion.',
    searchLabel: 'Search document tools',
    searchPlaceholder: 'Try merge, split, watermark or metadata',
    categoryLabel: 'Document task',
    allCategories: 'All document tools',
    noResultsTitle: 'No document tools matched',
    noResultsBody: 'Clear the search or choose another document task.',
    localBadgeLabel: 'Browser local',
    freeLabel: 'Free result',
    upgradeLabel: 'Upgrade path',
    detailCta: 'Open tool',
    principlesTitle: 'Operating principles',
    principles: [
      { title: 'Basic need solved', body: 'The free browser tools can produce useful PDF output without an account.' },
      { title: 'Documents stay local', body: 'Selected PDFs are handled with browser memory, worker validation and pdf-lib output in the current session.' },
      { title: 'Advanced workflow boundary', body: 'Batch, larger files, OCR, table extraction, history, API and teams require sandbox, antivirus and retention rules first.' },
    ],
    statusRows: [
      { title: '8 document tools', body: 'Merge, split, rotate, compress, watermark, page numbers, metadata and text conversion are available locally.', tone: 'green' },
      { title: '5 language route sets', body: 'English, Portuguese, Spanish, French and German routes are prerendered.', tone: 'green' },
      { title: 'Files stay in this browser', body: 'Supported free tasks use local memory, object URLs and pdf-lib output for the current session.', tone: 'amber' },
    ],
    footerToolsTitle: 'PDF tools for the next step',
    footerToolsBody: 'Move from one local PDF task to the next: merge files, extract pages, rotate scans, add page numbers, clean metadata or turn plain text into a downloadable PDF.',
  },
  'pt-br': {
    eyebrow: 'DocShift',
    title: 'Una, divida, gire e limpe PDFs no navegador.',
    lead: 'Execute workflows uteis de PDF localmente: unir, dividir, girar, comprimir, marca d agua, numeros de pagina, metadados e conversao de texto.',
    searchLabel: 'Buscar ferramentas',
    searchPlaceholder: 'Tente unir, dividir, marca d agua ou metadados',
    categoryLabel: 'Tarefa de documento',
    allCategories: 'Todas',
    noResultsTitle: 'Nenhuma ferramenta encontrada',
    noResultsBody: 'Limpe a busca ou escolha outra tarefa.',
    localBadgeLabel: 'Local no navegador',
    freeLabel: 'Resultado gratuito',
    upgradeLabel: 'Caminho de upgrade',
    detailCta: 'Abrir ferramenta',
    principlesTitle: 'Principios operacionais',
    principles: [
      { title: 'Necessidade basica', body: 'As ferramentas gratuitas no navegador geram uma saida PDF util sem conta.' },
      { title: 'Documentos locais', body: 'PDFs selecionados usam memoria do navegador, validacao em worker e saida via pdf-lib na sessao.' },
      { title: 'Limite de workflow avancado', body: 'Lote, arquivos maiores, OCR, tabelas, historico, API e equipes exigem sandbox, antivirus e retencao antes.' },
    ],
    statusRows: [
      { title: '8 ferramentas', body: 'Unir, dividir, girar, comprimir, marca d agua, paginas, metadados e texto rodam localmente.', tone: 'green' },
      { title: '5 rotas de idioma', body: 'Rotas em ingles, portugues, espanhol, frances e alemao sao prerenderizadas.', tone: 'green' },
      { title: 'Arquivos ficam neste navegador', body: 'Tarefas gratuitas suportadas usam memoria local, object URLs e saida pdf-lib nesta sessao.', tone: 'amber' },
    ],
    footerToolsTitle: 'Ferramentas PDF para o proximo passo',
    footerToolsBody: 'Passe de uma tarefa local para outra: una arquivos, extraia paginas, gire digitalizacoes, numere paginas, limpe metadados ou transforme texto em PDF.',
  },
  es: {
    eyebrow: 'DocShift',
    title: 'Une, divide, rota y limpia PDFs en el navegador.',
    lead: 'Ejecuta flujos utiles de PDF localmente: unir, dividir, rotar, comprimir, marca de agua, numeros, metadata y conversion de texto.',
    searchLabel: 'Buscar herramientas',
    searchPlaceholder: 'Unir, dividir, marca de agua o metadata',
    categoryLabel: 'Tarea',
    allCategories: 'Todas',
    noResultsTitle: 'Sin herramientas',
    noResultsBody: 'Borra la busqueda o elige otra tarea.',
    localBadgeLabel: 'Local en navegador',
    freeLabel: 'Resultado gratis',
    upgradeLabel: 'Ruta de upgrade',
    detailCta: 'Abrir',
    principlesTitle: 'Principios operativos',
    principles: [
      { title: 'Necesidad basica', body: 'Las herramientas gratis en navegador generan una salida PDF util sin cuenta.' },
      { title: 'Documentos locales', body: 'Los PDFs usan memoria del navegador, validacion worker y salida pdf-lib en la sesion.' },
      { title: 'Limite de workflow avanzado', body: 'Lote, archivos grandes, OCR, tablas, historial, API y equipos requieren sandbox, antivirus y retencion primero.' },
    ],
    statusRows: [
      { title: '8 herramientas', body: 'Unir, dividir, rotar, comprimir, marca de agua, paginas, metadata y texto corren localmente.', tone: 'green' },
      { title: '5 idiomas', body: 'Rutas en ingles, portugues, espanol, frances y aleman se prerenderizan.', tone: 'green' },
      { title: 'Archivos en este navegador', body: 'Las tareas gratis soportadas usan memoria local, object URLs y salida pdf-lib en esta sesion.', tone: 'amber' },
    ],
    footerToolsTitle: 'Herramientas PDF para el siguiente paso',
    footerToolsBody: 'Pasa de una tarea local a otra: unir archivos, extraer paginas, rotar escaneos, numerar paginas, limpiar metadata o convertir texto a PDF.',
  },
  fr: {
    eyebrow: 'DocShift',
    title: 'Fusionnez, separez, pivotez et nettoyez les PDFs dans le navigateur.',
    lead: 'Executez des workflows PDF locaux: fusion, separation, rotation, compression, filigrane, numeros, metadonnees et conversion texte.',
    searchLabel: 'Rechercher',
    searchPlaceholder: 'Fusion, separation, filigrane ou metadata',
    categoryLabel: 'Tache',
    allCategories: 'Toutes',
    noResultsTitle: 'Aucun outil',
    noResultsBody: 'Effacez la recherche ou choisissez une autre tache.',
    localBadgeLabel: 'Local navigateur',
    freeLabel: 'Resultat gratuit',
    upgradeLabel: 'Offre payante',
    detailCta: 'Ouvrir',
    principlesTitle: 'Principes operationnels',
    principles: [
      { title: 'Besoin de base', body: 'Les outils gratuits du navigateur produisent un PDF utile sans compte.' },
      { title: 'Documents locaux', body: 'Les PDFs utilisent memoire navigateur, validation worker et sortie pdf-lib dans la session.' },
      { title: 'Limite workflow avance', body: 'Lots, gros fichiers, OCR, tableaux, historique, API et equipes exigent sandbox, antivirus et retention d abord.' },
    ],
    statusRows: [
      { title: '8 outils', body: 'Fusion, separation, rotation, compression, filigrane, pages, metadata et texte sont locaux.', tone: 'green' },
      { title: '5 langues', body: 'Routes anglaises, portugaises, espagnoles, francaises et allemandes prerenderisees.', tone: 'green' },
      { title: 'Fichiers dans ce navigateur', body: 'Les taches gratuites prises en charge utilisent memoire locale, object URLs et sortie pdf-lib dans cette session.', tone: 'amber' },
    ],
    footerToolsTitle: 'Outils PDF pour l etape suivante',
    footerToolsBody: 'Passez d une tache locale a l autre: fusionner, extraire des pages, pivoter des scans, numeroter, nettoyer les metadonnees ou convertir du texte en PDF.',
  },
  de: {
    eyebrow: 'DocShift',
    title: 'PDFs im Browser zusammenfuehren, teilen, drehen und bereinigen.',
    lead: 'Nutzen Sie lokale PDF-Workflows: Merge, Split, Rotation, Kompression, Wasserzeichen, Seitennummern, Metadaten und Text-Konvertierung.',
    searchLabel: 'Dokumenttools suchen',
    searchPlaceholder: 'Merge, Split, Wasserzeichen oder Metadaten',
    categoryLabel: 'Dokumentaufgabe',
    allCategories: 'Alle',
    noResultsTitle: 'Keine Tools',
    noResultsBody: 'Suche leeren oder andere Aufgabe waehlen.',
    localBadgeLabel: 'Lokal im Browser',
    freeLabel: 'Kostenloses Ergebnis',
    upgradeLabel: 'Upgrade-Pfad',
    detailCta: 'Tool oeffnen',
    principlesTitle: 'Betriebsprinzipien',
    principles: [
      { title: 'Basisbedarf geloest', body: 'Die kostenlosen Browser-Tools erzeugen ein brauchbares PDF ohne Konto.' },
      { title: 'Dokumente bleiben lokal', body: 'PDFs nutzen Browser-Speicher, Worker-Validierung und pdf-lib-Ausgabe in der Sitzung.' },
      { title: 'Grenze fuer erweiterte Workflows', body: 'Batch, grosse Dateien, OCR, Tabellen, Verlauf, API und Teams brauchen zuerst Sandbox, Antivirus und Retention.' },
    ],
    statusRows: [
      { title: '8 Dokumenttools', body: 'Merge, Split, Rotation, Kompression, Wasserzeichen, Seiten, Metadaten und Text laufen lokal.', tone: 'green' },
      { title: '5 Sprachrouten', body: 'Englische, portugiesische, spanische, franzoesische und deutsche Routen werden prerendered.', tone: 'green' },
      { title: 'Dateien bleiben in diesem Browser', body: 'Unterstuetzte kostenlose Aufgaben nutzen lokalen Speicher, Object URLs und pdf-lib-Ausgabe in dieser Sitzung.', tone: 'amber' },
    ],
    footerToolsTitle: 'PDF-Tools fuer den naechsten Schritt',
    footerToolsBody: 'Wechseln Sie zwischen lokalen PDF-Aufgaben: Dateien zusammenfuehren, Seiten extrahieren, Scans drehen, Seiten nummerieren, Metadaten bereinigen oder Text in PDF umwandeln.',
  },
}

type ShellControlCopy = Pick<ShellCopy,
  | 'fileOrderTitle'
  | 'moveUpLabel'
  | 'moveDownLabel'
  | 'pageScopeLabel'
  | 'allPagesLabel'
  | 'pageRangeLabel'
  | 'pageRangeHelp'
  | 'rotateByLabel'
  | 'watermarkPositionLabel'
  | 'watermarkOpacityLabel'
  | 'watermarkSizeLabel'
  | 'positionDiagonalLabel'
  | 'positionCenterLabel'
  | 'positionTopLeftLabel'
  | 'positionTopRightLabel'
  | 'positionBottomLeftLabel'
  | 'positionBottomRightLabel'
  | 'pageNumberPositionLabel'
  | 'pageNumberStartLabel'
  | 'pageNumberFormatLabel'
  | 'pageNumberFormatNumberLabel'
  | 'pageNumberFormatPageLabel'
  | 'pageNumberFormatTotalLabel'
  | 'textTitleLabel'
  | 'pageSizeLabel'
  | 'fontSizeLabel'
  | 'currentMetadataTitleLabel'
  | 'currentMetadataAuthorLabel'
  | 'metadataUnknownLabel'
  | 'localCompressionBody'
  | 'originalSizeLabel'
  | 'savingsLabel'
  | 'reductionLabel'
>

const shellControlCopy: Record<LocaleCode, ShellControlCopy> = {
  en: {
    fileOrderTitle: 'Merge order',
    moveUpLabel: 'Move up',
    moveDownLabel: 'Move down',
    pageScopeLabel: 'Page scope',
    allPagesLabel: 'All pages',
    pageRangeLabel: 'Page range',
    pageRangeHelp: 'Use all or ranges like 1-3,5.',
    rotateByLabel: 'Rotate by',
    watermarkPositionLabel: 'Watermark position',
    watermarkOpacityLabel: 'Watermark opacity',
    watermarkSizeLabel: 'Watermark size',
    positionDiagonalLabel: 'Diagonal center',
    positionCenterLabel: 'Center',
    positionTopLeftLabel: 'Top left',
    positionTopRightLabel: 'Top right',
    positionBottomLeftLabel: 'Bottom left',
    positionBottomRightLabel: 'Bottom right',
    pageNumberPositionLabel: 'Number position',
    pageNumberStartLabel: 'Start number',
    pageNumberFormatLabel: 'Number format',
    pageNumberFormatNumberLabel: '1',
    pageNumberFormatPageLabel: 'Page 1',
    pageNumberFormatTotalLabel: '1 / total',
    textTitleLabel: 'PDF title',
    pageSizeLabel: 'Page size',
    fontSizeLabel: 'Font size',
    currentMetadataTitleLabel: 'Current title',
    currentMetadataAuthorLabel: 'Current author',
    metadataUnknownLabel: 'Not available',
    localCompressionBody: 'Local compression rewrites PDF structure and metadata. Image downsampling, OCR compression and large-file profiles require a reviewed server workflow first.',
    originalSizeLabel: 'Original size',
    savingsLabel: 'Savings',
    reductionLabel: 'Reduction',
  },
  'pt-br': {
    fileOrderTitle: 'Ordem da uniao',
    moveUpLabel: 'Subir',
    moveDownLabel: 'Descer',
    pageScopeLabel: 'Escopo de paginas',
    allPagesLabel: 'Todas as paginas',
    pageRangeLabel: 'Intervalo de paginas',
    pageRangeHelp: 'Use all ou intervalos como 1-3,5.',
    rotateByLabel: 'Girar em',
    watermarkPositionLabel: 'Posicao da marca',
    watermarkOpacityLabel: 'Opacidade da marca',
    watermarkSizeLabel: 'Tamanho da marca',
    positionDiagonalLabel: 'Diagonal central',
    positionCenterLabel: 'Centro',
    positionTopLeftLabel: 'Superior esquerda',
    positionTopRightLabel: 'Superior direita',
    positionBottomLeftLabel: 'Inferior esquerda',
    positionBottomRightLabel: 'Inferior direita',
    pageNumberPositionLabel: 'Posicao do numero',
    pageNumberStartLabel: 'Numero inicial',
    pageNumberFormatLabel: 'Formato do numero',
    pageNumberFormatNumberLabel: '1',
    pageNumberFormatPageLabel: 'Pagina 1',
    pageNumberFormatTotalLabel: '1 / total',
    textTitleLabel: 'Titulo do PDF',
    pageSizeLabel: 'Tamanho da pagina',
    fontSizeLabel: 'Tamanho da fonte',
    currentMetadataTitleLabel: 'Titulo atual',
    currentMetadataAuthorLabel: 'Autor atual',
    metadataUnknownLabel: 'Nao disponivel',
    localCompressionBody: 'A compressao local regrava a estrutura e os metadados do PDF. Reducao de imagens, OCR e perfis para arquivos grandes exigem workflow de servidor revisado primeiro.',
    originalSizeLabel: 'Tamanho original',
    savingsLabel: 'Economia',
    reductionLabel: 'Reducao',
  },
  es: {
    fileOrderTitle: 'Orden de union',
    moveUpLabel: 'Subir',
    moveDownLabel: 'Bajar',
    pageScopeLabel: 'Alcance de paginas',
    allPagesLabel: 'Todas las paginas',
    pageRangeLabel: 'Rango de paginas',
    pageRangeHelp: 'Usa all o rangos como 1-3,5.',
    rotateByLabel: 'Rotar',
    watermarkPositionLabel: 'Posicion de marca',
    watermarkOpacityLabel: 'Opacidad de marca',
    watermarkSizeLabel: 'Tamano de marca',
    positionDiagonalLabel: 'Diagonal centro',
    positionCenterLabel: 'Centro',
    positionTopLeftLabel: 'Arriba izquierda',
    positionTopRightLabel: 'Arriba derecha',
    positionBottomLeftLabel: 'Abajo izquierda',
    positionBottomRightLabel: 'Abajo derecha',
    pageNumberPositionLabel: 'Posicion del numero',
    pageNumberStartLabel: 'Numero inicial',
    pageNumberFormatLabel: 'Formato del numero',
    pageNumberFormatNumberLabel: '1',
    pageNumberFormatPageLabel: 'Pagina 1',
    pageNumberFormatTotalLabel: '1 / total',
    textTitleLabel: 'Titulo del PDF',
    pageSizeLabel: 'Tamano de pagina',
    fontSizeLabel: 'Tamano de fuente',
    currentMetadataTitleLabel: 'Titulo actual',
    currentMetadataAuthorLabel: 'Autor actual',
    metadataUnknownLabel: 'No disponible',
    localCompressionBody: 'La compresion local reescribe estructura y metadata del PDF. Reduccion de imagenes, OCR y perfiles para archivos grandes requieren workflow servidor revisado primero.',
    originalSizeLabel: 'Tamano original',
    savingsLabel: 'Ahorro',
    reductionLabel: 'Reduccion',
  },
  fr: {
    fileOrderTitle: 'Ordre de fusion',
    moveUpLabel: 'Monter',
    moveDownLabel: 'Descendre',
    pageScopeLabel: 'Portee des pages',
    allPagesLabel: 'Toutes les pages',
    pageRangeLabel: 'Plage de pages',
    pageRangeHelp: 'Utilisez all ou des plages comme 1-3,5.',
    rotateByLabel: 'Pivoter de',
    watermarkPositionLabel: 'Position filigrane',
    watermarkOpacityLabel: 'Opacite filigrane',
    watermarkSizeLabel: 'Taille filigrane',
    positionDiagonalLabel: 'Diagonal centre',
    positionCenterLabel: 'Centre',
    positionTopLeftLabel: 'Haut gauche',
    positionTopRightLabel: 'Haut droite',
    positionBottomLeftLabel: 'Bas gauche',
    positionBottomRightLabel: 'Bas droite',
    pageNumberPositionLabel: 'Position numero',
    pageNumberStartLabel: 'Numero initial',
    pageNumberFormatLabel: 'Format numero',
    pageNumberFormatNumberLabel: '1',
    pageNumberFormatPageLabel: 'Page 1',
    pageNumberFormatTotalLabel: '1 / total',
    textTitleLabel: 'Titre PDF',
    pageSizeLabel: 'Format page',
    fontSizeLabel: 'Taille police',
    currentMetadataTitleLabel: 'Titre actuel',
    currentMetadataAuthorLabel: 'Auteur actuel',
    metadataUnknownLabel: 'Non disponible',
    localCompressionBody: 'La compression locale reecrit la structure et les metadonnees du PDF. Reduction image, OCR et profils gros fichiers exigent d abord un workflow serveur revu.',
    originalSizeLabel: 'Taille originale',
    savingsLabel: 'Gain',
    reductionLabel: 'Reduction',
  },
  de: {
    fileOrderTitle: 'Reihenfolge',
    moveUpLabel: 'Nach oben',
    moveDownLabel: 'Nach unten',
    pageScopeLabel: 'Seitenumfang',
    allPagesLabel: 'Alle Seiten',
    pageRangeLabel: 'Seitenbereich',
    pageRangeHelp: 'Nutzen Sie all oder Bereiche wie 1-3,5.',
    rotateByLabel: 'Drehen um',
    watermarkPositionLabel: 'Wasserzeichenposition',
    watermarkOpacityLabel: 'Wasserzeichen-Deckkraft',
    watermarkSizeLabel: 'Wasserzeichengroesse',
    positionDiagonalLabel: 'Diagonal Mitte',
    positionCenterLabel: 'Mitte',
    positionTopLeftLabel: 'Oben links',
    positionTopRightLabel: 'Oben rechts',
    positionBottomLeftLabel: 'Unten links',
    positionBottomRightLabel: 'Unten rechts',
    pageNumberPositionLabel: 'Nummernposition',
    pageNumberStartLabel: 'Startnummer',
    pageNumberFormatLabel: 'Nummernformat',
    pageNumberFormatNumberLabel: '1',
    pageNumberFormatPageLabel: 'Seite 1',
    pageNumberFormatTotalLabel: '1 / gesamt',
    textTitleLabel: 'PDF-Titel',
    pageSizeLabel: 'Seitengroesse',
    fontSizeLabel: 'Schriftgroesse',
    currentMetadataTitleLabel: 'Aktueller Titel',
    currentMetadataAuthorLabel: 'Aktueller Autor',
    metadataUnknownLabel: 'Nicht verfuegbar',
    localCompressionBody: 'Lokale Kompression schreibt PDF-Struktur und Metadaten neu. Bildreduktion, OCR und Profile fuer grosse Dateien erfordern zuerst einen geprueften Server-Workflow.',
    originalSizeLabel: 'Originalgroesse',
    savingsLabel: 'Ersparnis',
    reductionLabel: 'Reduktion',
  },
}

export const shellCopy: Record<LocaleCode, ShellCopy> = {
  en: {
    breadcrumbHome: 'DocShift',
    workbenchEyebrow: 'PDF workbench',
    workbenchTitle: 'Choose a PDF task and process it locally.',
    workbenchBody: 'Start with merge, split, rotate, compress, watermark, page numbers, metadata cleanup or text-to-PDF. Files stay in this browser for supported free tasks.',
    toolTabsLabel: 'PDF tools',
    openGuideLabel: 'Open guide',
    previewEyebrow: 'Preview and download',
    previewEmptyTitle: 'Your output preview appears here',
    processingTitle: 'Processing locally',
    processingBody: 'DocShift is validating the document and creating a downloadable PDF in the browser.',
    localTrustTitle: 'Browser-only',
    runLabel: 'Process document',
    resetLabel: 'Reset settings',
    downloadLabel: 'Download PDF',
    inputTitle: 'Document settings',
    resultTitle: 'Preview',
    guideTitle: 'How to use this PDF tool',
    relatedTitle: 'Related pages',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    freeCheckLabel: 'Free document workflow',
    upgradePathLabel: 'Upgrade path',
    contentQualityBody: 'Choose the PDF action, review the preview and download the result from this browser.',
    privacyNote: 'Choose a small PDF or paste text. DocShift does not upload files, store document content, use localStorage, use sessionStorage or send document values to analytics.',
    invalidResultTitle: 'Check the document settings',
    pageStatusLabel: 'Document tool status',
    liveTitle: 'Browser document tools',
    liveBody: 'Worker validation and pdf-lib processing run in the browser without mandatory signup.',
    gatedTitle: 'Advanced workflows require review',
    gatedBody: 'Batch, larger files, OCR, table extraction, history, API, teams and server queues require approval before activation.',
    fileLabel: 'PDF file',
    pagesLabel: 'Pages',
    rotationLabel: 'Rotation',
    watermarkLabel: 'Watermark text',
    metadataTitleLabel: 'Metadata title',
    metadataAuthorLabel: 'Metadata author',
    textLabel: 'Plain text',
    dropzoneTitle: 'Drop or choose local documents',
    dropzoneBody: 'Small PDFs stay in this tab. Text-to-PDF uses only the pasted text in browser memory.',
    fileStateTitle: 'File state',
    workflowSnapshotTitle: 'Workflow snapshot',
    workflowModeLabel: 'Mode',
    workflowInputLabel: 'Input',
    workflowOutputLabel: 'Output',
    workflowProcessingLabel: 'Processing',
    noFileSelectedLabel: 'No PDF selected yet',
    charactersInMemoryLabel: 'characters in browser memory',
    outputPendingLabel: 'PDF created after processing',
    workerPipelineLabel: 'browser worker + pdf-lib',
    tabPipelineLabel: 'browser tab + pdf-lib',
    actualOutputLabel: 'Actual output',
    workerLabel: 'Worker',
    browserWorkerLabel: 'browser worker',
    localFallbackLabel: 'local fallback',
    processedPreviewTitle: 'Processed PDF preview',
    ...shellControlCopy.en,
    privacyChecklistTitle: 'Privacy checklist',
    privacyChecklistItems: [
      'Files and pasted text stay in browser memory.',
      'No upload API, localStorage or sessionStorage is used.',
      'Analytics records only sanitized tool slug and route path.',
    ],
    fileSafetyLabel: 'File safety',
    fileSafetyBody: 'Server-side batch, OCR, API and history require upload validation, sandboxing, antivirus where applicable, retention and deletion checks before activation.',
    heavyQueueTitle: 'Advanced server workflow',
    heavyQueueBody: 'The upgrade path is reserved for batch folders, OCR, table extraction, history, teams and API after sandbox, antivirus and retention review.',
    heavyQueueItems: ['Batch folders and larger files', 'OCR and table extraction', 'History, teams and API access', 'Server queues with retention/deletion rules'],
    relatedToolsTitle: 'Related document tools',
    relatedToolsBody: 'Continue with another local PDF workflow without uploading the document.',
  },
  'pt-br': {
    breadcrumbHome: 'DocShift',
    workbenchEyebrow: 'Workbench de PDF',
    workbenchTitle: 'Escolha uma tarefa de PDF e processe localmente.',
    workbenchBody: 'Comece por unir, dividir, girar, comprimir, marca d agua, numerar paginas, limpar metadados ou converter texto em PDF. Arquivos ficam neste navegador nas tarefas gratuitas suportadas.',
    toolTabsLabel: 'Ferramentas de PDF',
    openGuideLabel: 'Abrir guia',
    previewEyebrow: 'Preview e download',
    previewEmptyTitle: 'O preview do resultado aparece aqui',
    processingTitle: 'Processando localmente',
    processingBody: 'O DocShift valida o documento e cria um PDF baixavel no navegador.',
    localTrustTitle: 'Somente navegador',
    runLabel: 'Processar documento',
    resetLabel: 'Restaurar ajustes',
    downloadLabel: 'Baixar PDF',
    inputTitle: 'Ajustes do documento',
    resultTitle: 'Preview',
    guideTitle: 'Como usar esta ferramenta de PDF',
    relatedTitle: 'Páginas úteis',
    faqTitle: 'Perguntas frequentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Workflow gratuito',
    upgradePathLabel: 'Caminho de upgrade',
    contentQualityBody: 'Escolha a ação de PDF, revise o preview e baixe o resultado neste navegador.',
    privacyNote: 'Escolha um PDF pequeno ou cole texto. O DocShift nao faz upload, nao armazena conteudo, nao usa storage e nao envia valores a analytics.',
    invalidResultTitle: 'Confira os ajustes',
    pageStatusLabel: 'Status da ferramenta',
    liveTitle: 'Ferramentas no navegador',
    liveBody: 'Validacao em worker e pdf-lib rodam no navegador sem cadastro obrigatorio.',
    gatedTitle: 'Workflows avancados exigem revisao',
    gatedBody: 'Lotes, arquivos maiores, OCR, tabelas, historico, API, equipes e filas no servidor exigem aprovacao antes da ativacao.',
    fileLabel: 'Arquivo PDF',
    pagesLabel: 'Paginas',
    rotationLabel: 'Rotacao',
    watermarkLabel: 'Texto da marca d agua',
    metadataTitleLabel: 'Titulo metadata',
    metadataAuthorLabel: 'Autor metadata',
    textLabel: 'Texto simples',
    dropzoneTitle: 'Solte ou escolha documentos locais',
    dropzoneBody: 'PDFs pequenos ficam nesta aba. Texto para PDF usa apenas o texto colado na memoria do navegador.',
    fileStateTitle: 'Estado do arquivo',
    workflowSnapshotTitle: 'Resumo do workflow',
    workflowModeLabel: 'Modo',
    workflowInputLabel: 'Entrada',
    workflowOutputLabel: 'Saida',
    workflowProcessingLabel: 'Processamento',
    noFileSelectedLabel: 'Nenhum PDF selecionado ainda',
    charactersInMemoryLabel: 'caracteres na memoria do navegador',
    outputPendingLabel: 'PDF criado apos processar',
    workerPipelineLabel: 'worker do navegador + pdf-lib',
    tabPipelineLabel: 'aba do navegador + pdf-lib',
    actualOutputLabel: 'Saida real',
    workerLabel: 'Worker',
    browserWorkerLabel: 'worker do navegador',
    localFallbackLabel: 'fallback local',
    processedPreviewTitle: 'Preview do PDF processado',
    ...shellControlCopy['pt-br'],
    privacyChecklistTitle: 'Checklist de privacidade',
    privacyChecklistItems: [
      'Arquivos e texto colado ficam na memoria do navegador.',
      'Nenhuma API de upload, localStorage ou sessionStorage e usada.',
      'Analytics registra apenas ferramenta e rota sanitizadas.',
    ],
    fileSafetyLabel: 'Seguranca de arquivo',
    fileSafetyBody: 'Lote server-side, OCR, API e historico exigem validacao de upload, sandbox, antivirus quando aplicavel, retencao e exclusao antes da ativacao.',
    heavyQueueTitle: 'Workflow avancado no servidor',
    heavyQueueBody: 'O caminho de upgrade fica para lotes, OCR, tabelas, historico, equipes e API apos revisao de sandbox, antivirus e retencao.',
    heavyQueueItems: ['Pastas em lote e arquivos maiores', 'OCR e extracao de tabelas', 'Historico, equipes e API', 'Filas server-side com retencao/exclusao'],
    relatedToolsTitle: 'Ferramentas relacionadas',
    relatedToolsBody: 'Continue com outro workflow local de PDF sem fazer upload.',
  },
  es: {
    breadcrumbHome: 'DocShift',
    workbenchEyebrow: 'Workbench PDF',
    workbenchTitle: 'Elige una tarea PDF y procesa localmente.',
    workbenchBody: 'Empieza con unir, dividir, rotar, comprimir, marca de agua, numeros de pagina, metadata o texto a PDF. Los archivos quedan en este navegador para tareas gratis soportadas.',
    toolTabsLabel: 'Herramientas PDF',
    openGuideLabel: 'Abrir guia',
    previewEyebrow: 'Vista y descarga',
    previewEmptyTitle: 'La vista del resultado aparece aqui',
    processingTitle: 'Procesando localmente',
    processingBody: 'DocShift valida el documento y crea un PDF descargable en el navegador.',
    localTrustTitle: 'Solo navegador',
    runLabel: 'Procesar documento',
    resetLabel: 'Restaurar ajustes',
    downloadLabel: 'Descargar PDF',
    inputTitle: 'Ajustes',
    resultTitle: 'Vista previa',
    guideTitle: 'Como usar esta herramienta de PDF',
    relatedTitle: 'Páginas útiles',
    faqTitle: 'Preguntas frecuentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Workflow gratis',
    upgradePathLabel: 'Ruta de upgrade',
    contentQualityBody: 'Elige la acción PDF, revisa la vista previa y descarga el resultado en este navegador.',
    privacyNote: 'Elige un PDF pequeno o pega texto. DocShift no sube archivos, no almacena contenido, no usa storage ni envia valores a analytics.',
    invalidResultTitle: 'Revisa los ajustes',
    pageStatusLabel: 'Estado',
    liveTitle: 'Herramientas en navegador',
    liveBody: 'Validacion worker y pdf-lib corren en el navegador sin registro obligatorio.',
    gatedTitle: 'Workflows avanzados requieren revision',
    gatedBody: 'Lotes, archivos grandes, OCR, tablas, historial, API, equipos y colas servidor requieren aprobacion antes de activarse.',
    fileLabel: 'Archivo PDF',
    pagesLabel: 'Paginas',
    rotationLabel: 'Rotacion',
    watermarkLabel: 'Texto de marca de agua',
    metadataTitleLabel: 'Titulo metadata',
    metadataAuthorLabel: 'Autor metadata',
    textLabel: 'Texto simple',
    dropzoneTitle: 'Suelta o elige documentos locales',
    dropzoneBody: 'PDFs pequenos quedan en esta pestana. Texto a PDF usa solo el texto pegado en memoria del navegador.',
    fileStateTitle: 'Estado del archivo',
    workflowSnapshotTitle: 'Resumen del workflow',
    workflowModeLabel: 'Modo',
    workflowInputLabel: 'Entrada',
    workflowOutputLabel: 'Salida',
    workflowProcessingLabel: 'Procesamiento',
    noFileSelectedLabel: 'Ningun PDF seleccionado todavia',
    charactersInMemoryLabel: 'caracteres en memoria del navegador',
    outputPendingLabel: 'PDF creado despues de procesar',
    workerPipelineLabel: 'worker del navegador + pdf-lib',
    tabPipelineLabel: 'pestana del navegador + pdf-lib',
    actualOutputLabel: 'Salida real',
    workerLabel: 'Worker',
    browserWorkerLabel: 'worker del navegador',
    localFallbackLabel: 'fallback local',
    processedPreviewTitle: 'Vista del PDF procesado',
    ...shellControlCopy.es,
    privacyChecklistTitle: 'Checklist de privacidad',
    privacyChecklistItems: [
      'Archivos y texto pegado quedan en memoria del navegador.',
      'No se usa API de subida, localStorage ni sessionStorage.',
      'Analytics registra solo herramienta y ruta sanitizadas.',
    ],
    fileSafetyLabel: 'Seguridad de archivo',
    fileSafetyBody: 'Batch servidor, OCR, API e historial requieren validacion de subida, sandbox, antivirus cuando aplique, retencion y borrado antes de activacion.',
    heavyQueueTitle: 'Workflow avanzado servidor',
    heavyQueueBody: 'El camino de upgrade queda para lotes, OCR, tablas, historial, equipos y API tras revision de sandbox, antivirus y retencion.',
    heavyQueueItems: ['Carpetas batch y archivos mayores', 'OCR y extraccion de tablas', 'Historial, equipos y API', 'Colas servidor con retencion/borrado'],
    relatedToolsTitle: 'Herramientas relacionadas',
    relatedToolsBody: 'Continua con otro workflow PDF local sin subir el documento.',
  },
  fr: {
    breadcrumbHome: 'DocShift',
    workbenchEyebrow: 'Workbench PDF',
    workbenchTitle: 'Choisissez une tache PDF et traitez-la localement.',
    workbenchBody: 'Commencez par fusionner, separer, pivoter, compresser, filigrane, numeros de page, metadonnees ou texte vers PDF. Les fichiers restent dans ce navigateur pour les taches gratuites prises en charge.',
    toolTabsLabel: 'Outils PDF',
    openGuideLabel: 'Ouvrir le guide',
    previewEyebrow: 'Apercu et telechargement',
    previewEmptyTitle: 'L apercu du resultat apparait ici',
    processingTitle: 'Traitement local',
    processingBody: 'DocShift valide le document et cree un PDF telechargeable dans le navigateur.',
    localTrustTitle: 'Navigateur seul',
    runLabel: 'Traiter document',
    resetLabel: 'Reinitialiser',
    downloadLabel: 'Telecharger PDF',
    inputTitle: 'Reglages',
    resultTitle: 'Apercu',
    guideTitle: 'Comment utiliser cet outil PDF',
    relatedTitle: 'Pages utiles',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    freeCheckLabel: 'Workflow gratuit',
    upgradePathLabel: 'Offre payante',
    contentQualityBody: 'Choisissez l action PDF, vérifiez l aperçu et téléchargez le résultat dans ce navigateur.',
    privacyNote: 'Choisissez un petit PDF ou collez du texte. DocShift ne charge pas, ne stocke pas le contenu, n utilise pas storage et n envoie pas les valeurs a analytics.',
    invalidResultTitle: 'Verifiez les reglages',
    pageStatusLabel: 'Statut',
    liveTitle: 'Outils dans le navigateur',
    liveBody: 'Validation worker et pdf-lib fonctionnent dans le navigateur sans compte obligatoire.',
    gatedTitle: 'Workflows avances a reviser',
    gatedBody: 'Lots, gros fichiers, OCR, tableaux, historique, API, equipes et queues serveur exigent approbation avant activation.',
    fileLabel: 'Fichier PDF',
    pagesLabel: 'Pages',
    rotationLabel: 'Rotation',
    watermarkLabel: 'Texte filigrane',
    metadataTitleLabel: 'Titre metadata',
    metadataAuthorLabel: 'Auteur metadata',
    textLabel: 'Texte simple',
    dropzoneTitle: 'Deposez ou choisissez des documents locaux',
    dropzoneBody: 'Les petits PDFs restent dans cet onglet. Texte vers PDF utilise seulement le texte colle en memoire navigateur.',
    fileStateTitle: 'Etat du fichier',
    workflowSnapshotTitle: 'Resume du workflow',
    workflowModeLabel: 'Mode',
    workflowInputLabel: 'Entree',
    workflowOutputLabel: 'Sortie',
    workflowProcessingLabel: 'Traitement',
    noFileSelectedLabel: 'Aucun PDF selectionne',
    charactersInMemoryLabel: 'caracteres en memoire navigateur',
    outputPendingLabel: 'PDF cree apres traitement',
    workerPipelineLabel: 'worker navigateur + pdf-lib',
    tabPipelineLabel: 'onglet navigateur + pdf-lib',
    actualOutputLabel: 'Sortie reelle',
    workerLabel: 'Worker',
    browserWorkerLabel: 'worker navigateur',
    localFallbackLabel: 'fallback local',
    processedPreviewTitle: 'Apercu du PDF traite',
    ...shellControlCopy.fr,
    privacyChecklistTitle: 'Checklist confidentialite',
    privacyChecklistItems: [
      'Fichiers et texte colle restent en memoire navigateur.',
      'Aucune API upload, localStorage ou sessionStorage n est utilisee.',
      'Analytics enregistre seulement outil et route sanitises.',
    ],
    fileSafetyLabel: 'Securite fichier',
    fileSafetyBody: 'Lots serveur, OCR, API et historique exigent validation upload, sandbox, antivirus si applicable, retention et suppression avant activation.',
    heavyQueueTitle: 'Workflow serveur avance',
    heavyQueueBody: 'Le parcours upgrade couvre lots, OCR, tableaux, historique, equipes et API apres revue sandbox, antivirus et retention.',
    heavyQueueItems: ['Dossiers batch et gros fichiers', 'OCR et extraction de tableaux', 'Historique, equipes et API', 'Queues serveur avec retention/suppression'],
    relatedToolsTitle: 'Outils document lies',
    relatedToolsBody: 'Continuez avec un autre workflow PDF local sans upload.',
  },
  de: {
    breadcrumbHome: 'DocShift',
    workbenchEyebrow: 'PDF-Workbench',
    workbenchTitle: 'PDF-Aufgabe waehlen und lokal verarbeiten.',
    workbenchBody: 'Starten Sie mit Zusammenfuehren, Teilen, Drehen, Kompression, Wasserzeichen, Seitennummern, Metadaten oder Text zu PDF. Dateien bleiben fuer unterstuetzte kostenlose Aufgaben in diesem Browser.',
    toolTabsLabel: 'PDF-Tools',
    openGuideLabel: 'Leitfaden oeffnen',
    previewEyebrow: 'Vorschau und Download',
    previewEmptyTitle: 'Die Ergebnisvorschau erscheint hier',
    processingTitle: 'Lokale Verarbeitung',
    processingBody: 'DocShift validiert das Dokument und erstellt ein herunterladbares PDF im Browser.',
    localTrustTitle: 'Nur Browser',
    runLabel: 'Dokument verarbeiten',
    resetLabel: 'Einstellungen zuruecksetzen',
    downloadLabel: 'PDF herunterladen',
    inputTitle: 'Dokumenteinstellungen',
    resultTitle: 'Vorschau',
    guideTitle: 'So nutzen Sie dieses PDF-Tool',
    relatedTitle: 'Verwandte Seiten',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    freeCheckLabel: 'Kostenloser Dokumentworkflow',
    upgradePathLabel: 'Upgrade-Pfad',
    contentQualityBody: 'Wählen Sie die PDF-Aktion, prüfen Sie die Vorschau und laden Sie das Ergebnis im Browser herunter.',
    privacyNote: 'Waehlen Sie ein kleines PDF oder fuegen Sie Text ein. DocShift laedt nicht hoch, speichert keine Inhalte, nutzt kein Storage und sendet keine Werte an Analytics.',
    invalidResultTitle: 'Einstellungen pruefen',
    pageStatusLabel: 'Toolstatus',
    liveTitle: 'Browser-Dokumenttools',
    liveBody: 'Worker-Validierung und pdf-lib laufen im Browser ohne Pflichtkonto.',
    gatedTitle: 'Erweiterte Workflows brauchen Review',
    gatedBody: 'Batch, grosse Dateien, OCR, Tabellen, Verlauf, API, Teams und Server-Queues brauchen Freigabe vor Aktivierung.',
    fileLabel: 'PDF-Datei',
    pagesLabel: 'Seiten',
    rotationLabel: 'Rotation',
    watermarkLabel: 'Wasserzeichen-Text',
    metadataTitleLabel: 'Metadaten-Titel',
    metadataAuthorLabel: 'Metadaten-Autor',
    textLabel: 'Plain Text',
    dropzoneTitle: 'Lokale Dokumente ablegen oder waehlen',
    dropzoneBody: 'Kleine PDFs bleiben in diesem Tab. Text-to-PDF nutzt nur eingefuegten Text im Browser-Speicher.',
    fileStateTitle: 'Dateistatus',
    workflowSnapshotTitle: 'Workflow-Snapshot',
    workflowModeLabel: 'Modus',
    workflowInputLabel: 'Eingabe',
    workflowOutputLabel: 'Ausgabe',
    workflowProcessingLabel: 'Verarbeitung',
    noFileSelectedLabel: 'Noch kein PDF ausgewaehlt',
    charactersInMemoryLabel: 'Zeichen im Browser-Speicher',
    outputPendingLabel: 'PDF nach Verarbeitung erstellt',
    workerPipelineLabel: 'Browser-Worker + pdf-lib',
    tabPipelineLabel: 'Browser-Tab + pdf-lib',
    actualOutputLabel: 'Tatsaechliche Ausgabe',
    workerLabel: 'Worker',
    browserWorkerLabel: 'Browser-Worker',
    localFallbackLabel: 'lokaler Fallback',
    processedPreviewTitle: 'Vorschau des verarbeiteten PDFs',
    ...shellControlCopy.de,
    privacyChecklistTitle: 'Datenschutz-Checkliste',
    privacyChecklistItems: [
      'Dateien und eingefuegter Text bleiben im Browser-Speicher.',
      'Keine Upload-API, kein localStorage und kein sessionStorage.',
      'Analytics speichert nur sanitisiertes Tool und Route.',
    ],
    fileSafetyLabel: 'Dateisicherheit',
    fileSafetyBody: 'Server-Batch, OCR, API und Verlauf erfordern Upload-Validierung, Sandbox, Antivirus falls noetig, Retention und Loeschung vor Aktivierung.',
    heavyQueueTitle: 'Erweiterter Server-Workflow',
    heavyQueueBody: 'Der Upgrade-Pfad ist fuer Batch, OCR, Tabellen, Verlauf, Teams und API nach Sandbox-, Antivirus- und Retention-Review reserviert.',
    heavyQueueItems: ['Batch-Ordner und groessere Dateien', 'OCR und Tabellenextraktion', 'Verlauf, Teams und API', 'Server-Queues mit Retention/Loeschung'],
    relatedToolsTitle: 'Verwandte Dokumenttools',
    relatedToolsBody: 'Mit einem weiteren lokalen PDF-Workflow ohne Upload fortfahren.',
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return sanitizePublicCopy(locale, homeCopy[locale])
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return sanitizePublicCopy(locale, shellCopy[locale])
}
