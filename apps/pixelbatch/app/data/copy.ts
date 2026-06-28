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
}

export interface ShellCopy {
  breadcrumbHome: string
  runLabel: string
  resetLabel: string
  downloadLabel: string
  inputTitle: string
  resultTitle: string
  guideTitle: string
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
  formatLabel: string
  qualityLabel: string
  widthLabel: string
  heightLabel: string
  cropLabel: string
  presetLabel: string
  dropzoneTitle: string
  dropzoneBody: string
  beforeAfterTitle: string
  sourcePreviewTitle: string
  outputPreviewTitle: string
  workflowSnapshotTitle: string
  privacyChecklistTitle: string
  batchQueueTitle: string
  batchQueueBody: string
  batchQueueItems: string[]
  relatedToolsTitle: string
  relatedToolsBody: string
  workbenchEyebrow: string
  workbenchTitle: string
  workbenchBody: string
  browserOnlyLabel: string
  noUploadLabel: string
  oneImageLabel: string
  toolTabsLabel: string
  openGuideLabel: string
  useCaseTitle: string
  useCaseBody: string
  useCaseWebLabel: string
  useCaseStorefrontLabel: string
  useCaseSocialLabel: string
  actualOutputLabel: string
  savingsLabel: string
  workerLabel: string
  browserWorkerLabel: string
  localFallbackLabel: string
  fileStateLabel: string
  noFileSelectedLabel: string
  renderStateLabel: string
  renderPendingLabel: string
  storageStateLabel: string
  storageStateBody: string
  upgradeGateBody: string
  previewEyebrow: string
  previewPendingLabel: string
  processingBody: string
  previewEmptyBody: string
  previewEmptyTitle: string
  fileSafetyLabel: string
  fileSafetyBody: string
  privacyImageBytesLabel: string
  privacyObjectUrlLabel: string
  privacyAnalyticsLabel: string
}

export const homeCopy: Record<LocaleCode, HomeCopy> = {
  en: {
    eyebrow: 'PixelBatch',
    title: 'Image resize, crop, compression and conversion in your browser.',
    lead: 'Process one PNG, JPEG, WebP or browser-supported AVIF image locally, preview the result and download a clean copy without mandatory signup.',
    searchLabel: 'Search image tools',
    searchPlaceholder: 'Try compress, crop, convert or metadata',
    categoryLabel: 'Image task',
    allCategories: 'All image tools',
    noResultsTitle: 'No image tools matched',
    noResultsBody: 'Clear the search or choose another image task.',
    localBadgeLabel: 'Local MVP',
    freeLabel: 'Free result',
    upgradeLabel: 'Upgrade path',
    detailCta: 'Open tool',
    principlesTitle: 'Operating principles',
    principles: [
      { title: 'Basic need solved', body: 'The free MVP can produce a useful optimized image without an account or upload endpoint.' },
      { title: 'Pixels stay local', body: 'Selected files are handled with object URLs, a worker plan and Canvas output in the browser session.' },
      { title: 'Workflow is paid value', body: 'Batch, folders, larger files, API, integrations, saved presets, high-res queues and AI credits stay gated.' },
    ],
    statusRows: [
      { title: '6 browser tools', body: 'Compress, resize, crop, convert, metadata removal and social presets are available locally.', tone: 'green' },
      { title: '5 language route sets', body: 'English, Portuguese, Spanish, French and German routes are prerendered.', tone: 'green' },
      { title: 'No file backend active', body: 'No upload API, batch worker, account, billing, ads or external analytics is active.', tone: 'amber' },
    ],
  },
  'pt-br': {
    eyebrow: 'PixelBatch',
    title: 'Redimensione, corte, comprima e converta imagens no navegador.',
    lead: 'Processe uma imagem PNG, JPEG, WebP ou AVIF suportada pelo navegador, veja o preview e baixe uma copia limpa sem cadastro obrigatorio.',
    searchLabel: 'Buscar ferramentas',
    searchPlaceholder: 'Tente comprimir, cortar, converter ou metadados',
    categoryLabel: 'Tarefa de imagem',
    allCategories: 'Todas',
    noResultsTitle: 'Nenhuma ferramenta encontrada',
    noResultsBody: 'Limpe a busca ou escolha outra tarefa.',
    localBadgeLabel: 'MVP local',
    freeLabel: 'Resultado gratuito',
    upgradeLabel: 'Caminho de upgrade',
    detailCta: 'Abrir ferramenta',
    principlesTitle: 'Principios operacionais',
    principles: [
      { title: 'Necessidade basica', body: 'O MVP gratuito gera uma imagem otimizada util sem conta nem endpoint de upload.' },
      { title: 'Pixels locais', body: 'Arquivos selecionados usam object URLs, plano em worker e Canvas apenas na sessao do navegador.' },
      { title: 'Workflow pago', body: 'Lotes, pastas, arquivos maiores, API, integracoes, presets salvos, alta resolucao e IA ficam bloqueados.' },
    ],
    statusRows: [
      { title: '6 ferramentas', body: 'Compressao, resize, crop, conversao, metadados e presets sociais rodam localmente.', tone: 'green' },
      { title: '5 rotas de idioma', body: 'Rotas em ingles, portugues, espanhol, frances e alemao sao prerenderizadas.', tone: 'green' },
      { title: 'Sem backend de arquivos', body: 'Sem upload API, worker de lote, conta, billing, ads ou analytics externo ativo.', tone: 'amber' },
    ],
  },
  es: {
    eyebrow: 'PixelBatch',
    title: 'Redimensiona, recorta, comprime y convierte imagenes en el navegador.',
    lead: 'Procesa una imagen PNG, JPEG, WebP o AVIF soportada, previsualiza y descarga una copia limpia sin registro obligatorio.',
    searchLabel: 'Buscar herramientas',
    searchPlaceholder: 'Comprimir, recortar, convertir o metadata',
    categoryLabel: 'Tarea',
    allCategories: 'Todas',
    noResultsTitle: 'Sin herramientas',
    noResultsBody: 'Borra la busqueda o elige otra tarea.',
    localBadgeLabel: 'MVP local',
    freeLabel: 'Resultado gratis',
    upgradeLabel: 'Ruta de upgrade',
    detailCta: 'Abrir',
    principlesTitle: 'Principios operativos',
    principles: [
      { title: 'Necesidad basica', body: 'El MVP gratis produce una imagen util sin cuenta ni endpoint de subida.' },
      { title: 'Pixeles locales', body: 'Los archivos usan object URLs, plan en worker y Canvas en la sesion del navegador.' },
      { title: 'Workflow pago', body: 'Lotes, carpetas, archivos grandes, API, integraciones, presets, alta resolucion e IA quedan gated.' },
    ],
    statusRows: [
      { title: '6 herramientas', body: 'Compresion, resize, crop, conversion, metadata y presets sociales corren localmente.', tone: 'green' },
      { title: '5 idiomas', body: 'Rutas en ingles, portugues, espanol, frances y aleman se prerenderizan.', tone: 'green' },
      { title: 'Sin backend de archivos', body: 'Sin upload API, worker batch, cuenta, billing, ads ni analytics externo.', tone: 'amber' },
    ],
  },
  fr: {
    eyebrow: 'PixelBatch',
    title: 'Redimensionnez, rognez, compressez et convertissez les images dans le navigateur.',
    lead: 'Traitez une image PNG, JPEG, WebP ou AVIF supportee, previsualisez et telechargez une copie propre sans compte obligatoire.',
    searchLabel: 'Rechercher',
    searchPlaceholder: 'Compresser, rogner, convertir ou metadata',
    categoryLabel: 'Tache',
    allCategories: 'Toutes',
    noResultsTitle: 'Aucun outil',
    noResultsBody: 'Effacez la recherche ou choisissez une autre tache.',
    localBadgeLabel: 'MVP local',
    freeLabel: 'Resultat gratuit',
    upgradeLabel: 'Offre payante',
    detailCta: 'Ouvrir',
    principlesTitle: 'Principes operationnels',
    principles: [
      { title: 'Besoin de base', body: 'Le MVP gratuit produit une image utile sans compte ni upload.' },
      { title: 'Pixels locaux', body: 'Les fichiers utilisent des object URLs, un plan worker et Canvas dans la session navigateur.' },
      { title: 'Workflow payant', body: 'Lots, dossiers, gros fichiers, API, integrations, presets, haute resolution et IA restent gates.' },
    ],
    statusRows: [
      { title: '6 outils', body: 'Compression, resize, crop, conversion, metadata et presets sociaux sont locaux.', tone: 'green' },
      { title: '5 langues', body: 'Routes anglaises, portugaises, espagnoles, francaises et allemandes prerenderisees.', tone: 'green' },
      { title: 'Pas de backend fichier', body: 'Pas d upload API, worker batch, compte, billing, ads ou analytics externe.', tone: 'amber' },
    ],
  },
  de: {
    eyebrow: 'PixelBatch',
    title: 'Bilder im Browser verkleinern, zuschneiden, komprimieren und konvertieren.',
    lead: 'Verarbeiten Sie ein PNG-, JPEG-, WebP- oder unterstuetztes AVIF-Bild lokal, sehen Sie die Vorschau und laden Sie eine saubere Kopie herunter.',
    searchLabel: 'Bildtools suchen',
    searchPlaceholder: 'Komprimieren, zuschneiden, konvertieren oder Metadaten',
    categoryLabel: 'Bildaufgabe',
    allCategories: 'Alle',
    noResultsTitle: 'Keine Tools',
    noResultsBody: 'Suche leeren oder andere Aufgabe waehlen.',
    localBadgeLabel: 'Lokales MVP',
    freeLabel: 'Kostenloses Ergebnis',
    upgradeLabel: 'Upgrade-Pfad',
    detailCta: 'Tool oeffnen',
    principlesTitle: 'Betriebsprinzipien',
    principles: [
      { title: 'Basisbedarf geloest', body: 'Das kostenlose MVP erzeugt ein brauchbares optimiertes Bild ohne Konto oder Upload-Endpunkt.' },
      { title: 'Pixel bleiben lokal', body: 'Dateien werden mit Object URLs, Worker-Plan und Canvas nur in der Browser-Sitzung verarbeitet.' },
      { title: 'Workflow als Bezahlwert', body: 'Batch, Ordner, grosse Dateien, API, Integrationen, Presets, High-Res und KI bleiben gated.' },
    ],
    statusRows: [
      { title: '6 Browser-Tools', body: 'Komprimieren, Groesse, Zuschnitt, Konvertierung, Metadaten und Social-Presets laufen lokal.', tone: 'green' },
      { title: '5 Sprachrouten', body: 'Englische, portugiesische, spanische, franzoesische und deutsche Routen werden prerendered.', tone: 'green' },
      { title: 'Kein Datei-Backend', body: 'Keine Upload API, Batch Worker, Konto, Billing, Ads oder externes Analytics aktiv.', tone: 'amber' },
    ],
  },
}

export const shellCopy: Record<LocaleCode, ShellCopy> = {
  en: {
    breadcrumbHome: 'PixelBatch',
    runLabel: 'Process image',
    resetLabel: 'Reset settings',
    downloadLabel: 'Download image',
    inputTitle: 'Image settings',
    resultTitle: 'Preview',
    guideTitle: 'Guide and limits',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    freeCheckLabel: 'Free image workflow',
    upgradePathLabel: 'Upgrade path',
    contentQualityBody: 'This page combines a working browser-side image tool, visible file limits, FAQ and review date.',
    privacyNote: 'Choose one image. PixelBatch does not upload files, store pixels, use localStorage, use sessionStorage or send image values to analytics.',
    invalidResultTitle: 'Check the image settings',
    pageStatusLabel: 'Image tool status',
    liveTitle: 'Client-side MVP',
    liveBody: 'Worker planning and Canvas rendering run in the browser without mandatory signup.',
    gatedTitle: 'Batch workflow gated',
    gatedBody: 'Folders, larger files, API, saved presets, integrations, high-res queues and AI features are not active.',
    fileLabel: 'Image file',
    formatLabel: 'Output format',
    qualityLabel: 'Quality',
    widthLabel: 'Width',
    heightLabel: 'Height',
    cropLabel: 'Crop profile',
    presetLabel: 'Social preset',
    dropzoneTitle: 'Drop or choose one image',
    dropzoneBody: 'PNG, JPEG, WebP or browser-supported AVIF up to 10 MB. The file stays in this tab.',
    beforeAfterTitle: 'Before and after',
    sourcePreviewTitle: 'Source image',
    outputPreviewTitle: 'Output image',
    workflowSnapshotTitle: 'Workflow snapshot',
    privacyChecklistTitle: 'Privacy checklist',
    batchQueueTitle: 'Batch queue gated',
    batchQueueBody: 'The paid path is designed for folders, queues, saved presets and automation after upload, retention and billing gates.',
    batchQueueItems: ['Folders and multi-file queues', 'Saved presets and naming rules', 'API, integrations and high-resolution jobs', 'AI/background-removal providers'],
    relatedToolsTitle: 'Related image tools',
    relatedToolsBody: 'Continue with another local transform without uploading the file.',
    workbenchEyebrow: 'Image workbench',
    workbenchTitle: 'Drag, tune, preview and download.',
    workbenchBody: 'Choose an image task, drop one local file, tune format or quality and compare the output before downloading.',
    browserOnlyLabel: 'Browser-only',
    noUploadLabel: 'No upload',
    oneImageLabel: 'One image free',
    toolTabsLabel: 'Image workflow tabs',
    openGuideLabel: 'Open guide',
    useCaseTitle: 'Use-case presets',
    useCaseBody: 'Start from common web, storefront or social settings, then adjust the controls.',
    useCaseWebLabel: 'Web speed',
    useCaseStorefrontLabel: 'Storefront',
    useCaseSocialLabel: 'Social post',
    actualOutputLabel: 'Actual output',
    savingsLabel: 'Savings',
    workerLabel: 'Worker',
    browserWorkerLabel: 'browser worker',
    localFallbackLabel: 'local fallback',
    fileStateLabel: 'File',
    noFileSelectedLabel: 'Waiting for one local image',
    renderStateLabel: 'Render',
    renderPendingLabel: 'Canvas output planned after processing',
    storageStateLabel: 'Storage',
    storageStateBody: 'No upload endpoint, localStorage, sessionStorage or account.',
    upgradeGateBody: 'Batch, API, high-res queues and AI remain inactive.',
    previewEyebrow: 'Preview and output',
    previewPendingLabel: 'Output pending',
    processingBody: 'Processing the selected image locally...',
    previewEmptyBody: 'Choose one image to see source preview, output metrics and download controls.',
    previewEmptyTitle: 'Drop an image to start',
    fileSafetyLabel: 'File safety',
    fileSafetyBody: 'Server-side batch, API and AI processing require upload validation, sandboxing, retention and antivirus checks before activation.',
    privacyImageBytesLabel: 'No image bytes leave the browser session.',
    privacyObjectUrlLabel: 'Object URLs are revoked when the page resets or unloads.',
    privacyAnalyticsLabel: 'Analytics keeps only the tool slug, locale and route.',
  },
  'pt-br': {
    breadcrumbHome: 'PixelBatch',
    runLabel: 'Processar imagem',
    resetLabel: 'Restaurar ajustes',
    downloadLabel: 'Baixar imagem',
    inputTitle: 'Ajustes da imagem',
    resultTitle: 'Preview',
    guideTitle: 'Guia e limites',
    faqTitle: 'Perguntas frequentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Workflow gratuito',
    upgradePathLabel: 'Caminho de upgrade',
    contentQualityBody: 'Esta pagina combina ferramenta local, limites de arquivo, FAQ e data de revisao.',
    privacyNote: 'Escolha uma imagem. O PixelBatch nao faz upload, nao armazena pixels, nao usa localStorage/sessionStorage e nao envia valores a analytics.',
    invalidResultTitle: 'Confira os ajustes',
    pageStatusLabel: 'Status da ferramenta',
    liveTitle: 'MVP client-side',
    liveBody: 'Worker e Canvas rodam no navegador sem cadastro obrigatorio.',
    gatedTitle: 'Workflow em lote bloqueado',
    gatedBody: 'Pastas, arquivos maiores, API, presets salvos, integracoes, alta resolucao e IA nao estao ativos.',
    fileLabel: 'Arquivo de imagem',
    formatLabel: 'Formato de saida',
    qualityLabel: 'Qualidade',
    widthLabel: 'Largura',
    heightLabel: 'Altura',
    cropLabel: 'Perfil de corte',
    presetLabel: 'Preset social',
    dropzoneTitle: 'Solte ou escolha uma imagem',
    dropzoneBody: 'PNG, JPEG, WebP ou AVIF suportado ate 10 MB. O arquivo fica nesta aba.',
    beforeAfterTitle: 'Antes e depois',
    sourcePreviewTitle: 'Imagem original',
    outputPreviewTitle: 'Imagem final',
    workflowSnapshotTitle: 'Resumo do workflow',
    privacyChecklistTitle: 'Checklist de privacidade',
    batchQueueTitle: 'Fila em lote bloqueada',
    batchQueueBody: 'O caminho pago cobre pastas, filas, presets salvos e automacao apos gates de upload, retencao e billing.',
    batchQueueItems: ['Pastas e filas multi-arquivo', 'Presets salvos e regras de nome', 'API, integracoes e jobs em alta resolucao', 'Provedores de IA/remocao de fundo'],
    relatedToolsTitle: 'Ferramentas relacionadas',
    relatedToolsBody: 'Continue com outra transformacao local sem fazer upload.',
    workbenchEyebrow: 'Bancada de imagem',
    workbenchTitle: 'Arraste, ajuste, compare e baixe.',
    workbenchBody: 'Escolha uma tarefa, solte um arquivo local, ajuste formato ou qualidade e compare a saida antes de baixar.',
    browserOnlyLabel: 'So navegador',
    noUploadLabel: 'Sem upload',
    oneImageLabel: 'Uma imagem gratis',
    toolTabsLabel: 'Abas de workflow de imagem',
    openGuideLabel: 'Abrir guia',
    useCaseTitle: 'Presets de uso',
    useCaseBody: 'Comece por ajustes para web, loja ou social e refine os controles.',
    useCaseWebLabel: 'Web rapida',
    useCaseStorefrontLabel: 'Loja',
    useCaseSocialLabel: 'Post social',
    actualOutputLabel: 'Saida real',
    savingsLabel: 'Economia',
    workerLabel: 'Worker',
    browserWorkerLabel: 'worker do navegador',
    localFallbackLabel: 'fallback local',
    fileStateLabel: 'Arquivo',
    noFileSelectedLabel: 'Aguardando uma imagem local',
    renderStateLabel: 'Render',
    renderPendingLabel: 'Saida Canvas planejada apos processar',
    storageStateLabel: 'Storage',
    storageStateBody: 'Sem upload endpoint, localStorage, sessionStorage ou conta.',
    upgradeGateBody: 'Lotes, API, alta resolucao e IA continuam inativos.',
    previewEyebrow: 'Preview e saida',
    previewPendingLabel: 'Saida pendente',
    processingBody: 'Processando a imagem localmente...',
    previewEmptyBody: 'Escolha uma imagem para ver preview original, metricas de saida e download.',
    previewEmptyTitle: 'Solte uma imagem para comecar',
    fileSafetyLabel: 'Seguranca de arquivo',
    fileSafetyBody: 'Batch server-side, API e IA exigem validacao de upload, sandbox, retencao e antivirus antes da ativacao.',
    privacyImageBytesLabel: 'Nenhum byte da imagem sai da sessao do navegador.',
    privacyObjectUrlLabel: 'Object URLs sao revogados ao resetar ou sair da pagina.',
    privacyAnalyticsLabel: 'Analytics guarda apenas slug da ferramenta, locale e rota.',
  },
  es: {
    breadcrumbHome: 'PixelBatch',
    runLabel: 'Procesar imagen',
    resetLabel: 'Restaurar ajustes',
    downloadLabel: 'Descargar imagen',
    inputTitle: 'Ajustes',
    resultTitle: 'Vista previa',
    guideTitle: 'Guia y limites',
    faqTitle: 'Preguntas frecuentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Workflow gratis',
    upgradePathLabel: 'Ruta de upgrade',
    contentQualityBody: 'Esta pagina combina herramienta local, limites, FAQ y fecha de revision.',
    privacyNote: 'Elige una imagen. PixelBatch no sube archivos, no almacena pixeles, no usa storage ni envia valores a analytics.',
    invalidResultTitle: 'Revisa los ajustes',
    pageStatusLabel: 'Estado',
    liveTitle: 'MVP client-side',
    liveBody: 'Worker y Canvas corren en el navegador sin registro obligatorio.',
    gatedTitle: 'Workflow batch bloqueado',
    gatedBody: 'Carpetas, archivos grandes, API, presets, integraciones, alta resolucion e IA no estan activos.',
    fileLabel: 'Archivo de imagen',
    formatLabel: 'Formato',
    qualityLabel: 'Calidad',
    widthLabel: 'Ancho',
    heightLabel: 'Alto',
    cropLabel: 'Perfil de recorte',
    presetLabel: 'Preset social',
    dropzoneTitle: 'Suelta o elige una imagen',
    dropzoneBody: 'PNG, JPEG, WebP o AVIF soportado hasta 10 MB. El archivo queda en esta pestana.',
    beforeAfterTitle: 'Antes y despues',
    sourcePreviewTitle: 'Imagen original',
    outputPreviewTitle: 'Imagen final',
    workflowSnapshotTitle: 'Resumen del workflow',
    privacyChecklistTitle: 'Checklist de privacidad',
    batchQueueTitle: 'Cola batch bloqueada',
    batchQueueBody: 'El camino pago cubre carpetas, colas, presets guardados y automatizacion tras gates de upload, retencion y billing.',
    batchQueueItems: ['Carpetas y colas multiarchivo', 'Presets guardados y reglas de nombre', 'API, integraciones y jobs de alta resolucion', 'Proveedores de IA/remocion de fondo'],
    relatedToolsTitle: 'Herramientas relacionadas',
    relatedToolsBody: 'Continua con otra transformacion local sin subir el archivo.',
    workbenchEyebrow: 'Banco de imagen',
    workbenchTitle: 'Arrastra, ajusta, compara y descarga.',
    workbenchBody: 'Elige una tarea, suelta un archivo local, ajusta formato o calidad y compara la salida antes de descargar.',
    browserOnlyLabel: 'Solo navegador',
    noUploadLabel: 'Sin upload',
    oneImageLabel: 'Una imagen gratis',
    toolTabsLabel: 'Pestanas de workflow de imagen',
    openGuideLabel: 'Abrir guia',
    useCaseTitle: 'Presets de uso',
    useCaseBody: 'Empieza con ajustes para web, tienda o social y luego refina los controles.',
    useCaseWebLabel: 'Web rapida',
    useCaseStorefrontLabel: 'Tienda',
    useCaseSocialLabel: 'Post social',
    actualOutputLabel: 'Salida real',
    savingsLabel: 'Ahorro',
    workerLabel: 'Worker',
    browserWorkerLabel: 'worker del navegador',
    localFallbackLabel: 'fallback local',
    fileStateLabel: 'Archivo',
    noFileSelectedLabel: 'Esperando una imagen local',
    renderStateLabel: 'Render',
    renderPendingLabel: 'Salida Canvas planeada despues de procesar',
    storageStateLabel: 'Storage',
    storageStateBody: 'Sin upload endpoint, localStorage, sessionStorage ni cuenta.',
    upgradeGateBody: 'Lotes, API, alta resolucion e IA siguen inactivos.',
    previewEyebrow: 'Preview y salida',
    previewPendingLabel: 'Salida pendiente',
    processingBody: 'Procesando la imagen localmente...',
    previewEmptyBody: 'Elige una imagen para ver preview original, metricas de salida y descarga.',
    previewEmptyTitle: 'Suelta una imagen para empezar',
    fileSafetyLabel: 'Seguridad de archivo',
    fileSafetyBody: 'Batch server-side, API e IA requieren validacion de upload, sandbox, retencion y antivirus antes de activarse.',
    privacyImageBytesLabel: 'Ningun byte de imagen sale de la sesion del navegador.',
    privacyObjectUrlLabel: 'Las object URLs se revocan al resetear o salir de la pagina.',
    privacyAnalyticsLabel: 'Analytics conserva solo slug de herramienta, locale y ruta.',
  },
  fr: {
    breadcrumbHome: 'PixelBatch',
    runLabel: 'Traiter image',
    resetLabel: 'Reinitialiser',
    downloadLabel: 'Telecharger image',
    inputTitle: 'Reglages',
    resultTitle: 'Apercu',
    guideTitle: 'Guide et limites',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    freeCheckLabel: 'Workflow gratuit',
    upgradePathLabel: 'Offre payante',
    contentQualityBody: 'Cette page combine outil local, limites fichier, FAQ et date de revue.',
    privacyNote: 'Choisissez une image. PixelBatch ne charge pas, ne stocke pas les pixels, n utilise pas storage et n envoie pas les valeurs a analytics.',
    invalidResultTitle: 'Verifiez les reglages',
    pageStatusLabel: 'Statut',
    liveTitle: 'MVP client-side',
    liveBody: 'Worker et Canvas fonctionnent dans le navigateur sans compte obligatoire.',
    gatedTitle: 'Workflow lot gate',
    gatedBody: 'Dossiers, gros fichiers, API, presets, integrations, haute resolution et IA ne sont pas actifs.',
    fileLabel: 'Fichier image',
    formatLabel: 'Format',
    qualityLabel: 'Qualite',
    widthLabel: 'Largeur',
    heightLabel: 'Hauteur',
    cropLabel: 'Profil de crop',
    presetLabel: 'Preset social',
    dropzoneTitle: 'Deposez ou choisissez une image',
    dropzoneBody: 'PNG, JPEG, WebP ou AVIF supporte jusqu a 10 MB. Le fichier reste dans cet onglet.',
    beforeAfterTitle: 'Avant et apres',
    sourcePreviewTitle: 'Image source',
    outputPreviewTitle: 'Image finale',
    workflowSnapshotTitle: 'Resume du workflow',
    privacyChecklistTitle: 'Checklist confidentialite',
    batchQueueTitle: 'File de lots gatee',
    batchQueueBody: 'Le chemin payant couvre dossiers, files, presets sauvegardes et automatisation apres gates upload, retention et billing.',
    batchQueueItems: ['Dossiers et files multi-fichiers', 'Presets sauvegardes et regles de nom', 'API, integrations et jobs haute resolution', 'Fournisseurs IA/suppression de fond'],
    relatedToolsTitle: 'Outils image lies',
    relatedToolsBody: 'Continuez avec une autre transformation locale sans upload.',
    workbenchEyebrow: 'Atelier image',
    workbenchTitle: 'Deposer, regler, comparer et telecharger.',
    workbenchBody: 'Choisissez une tache, deposez un fichier local, ajustez format ou qualite et comparez la sortie avant telechargement.',
    browserOnlyLabel: 'Navigateur seul',
    noUploadLabel: 'Sans upload',
    oneImageLabel: 'Une image gratuite',
    toolTabsLabel: 'Onglets de workflow image',
    openGuideLabel: 'Ouvrir guide',
    useCaseTitle: 'Presets d usage',
    useCaseBody: 'Commencez avec web, boutique ou social puis ajustez les controles.',
    useCaseWebLabel: 'Web rapide',
    useCaseStorefrontLabel: 'Boutique',
    useCaseSocialLabel: 'Post social',
    actualOutputLabel: 'Sortie reelle',
    savingsLabel: 'Gain',
    workerLabel: 'Worker',
    browserWorkerLabel: 'worker navigateur',
    localFallbackLabel: 'fallback local',
    fileStateLabel: 'Fichier',
    noFileSelectedLabel: 'En attente d une image locale',
    renderStateLabel: 'Rendu',
    renderPendingLabel: 'Sortie Canvas prevue apres traitement',
    storageStateLabel: 'Stockage',
    storageStateBody: 'Sans upload endpoint, localStorage, sessionStorage ou compte.',
    upgradeGateBody: 'Lots, API, haute resolution et IA restent inactifs.',
    previewEyebrow: 'Apercu et sortie',
    previewPendingLabel: 'Sortie en attente',
    processingBody: 'Traitement local de l image...',
    previewEmptyBody: 'Choisissez une image pour voir l original, les mesures de sortie et le telechargement.',
    previewEmptyTitle: 'Deposez une image pour commencer',
    fileSafetyLabel: 'Securite fichier',
    fileSafetyBody: 'Le batch server-side, API et IA exigent validation upload, sandbox, retention et antivirus avant activation.',
    privacyImageBytesLabel: 'Aucun octet image ne quitte la session navigateur.',
    privacyObjectUrlLabel: 'Les object URLs sont revoquees au reset ou a la sortie de page.',
    privacyAnalyticsLabel: 'Analytics garde seulement slug d outil, locale et route.',
  },
  de: {
    breadcrumbHome: 'PixelBatch',
    runLabel: 'Bild verarbeiten',
    resetLabel: 'Einstellungen zuruecksetzen',
    downloadLabel: 'Bild herunterladen',
    inputTitle: 'Bildeinstellungen',
    resultTitle: 'Vorschau',
    guideTitle: 'Leitfaden und Grenzen',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    freeCheckLabel: 'Kostenloser Bildworkflow',
    upgradePathLabel: 'Upgrade-Pfad',
    contentQualityBody: 'Diese Seite kombiniert ein lokales Bildtool, Dateilimits, FAQ und Pruefdatum.',
    privacyNote: 'Waehlen Sie ein Bild. PixelBatch laedt nicht hoch, speichert keine Pixel, nutzt kein Storage und sendet keine Werte an Analytics.',
    invalidResultTitle: 'Einstellungen pruefen',
    pageStatusLabel: 'Toolstatus',
    liveTitle: 'Client-seitiges MVP',
    liveBody: 'Worker und Canvas laufen im Browser ohne Pflichtkonto.',
    gatedTitle: 'Batch-Workflow gesperrt',
    gatedBody: 'Ordner, grosse Dateien, API, Presets, Integrationen, High-Res und KI sind nicht aktiv.',
    fileLabel: 'Bilddatei',
    formatLabel: 'Ausgabeformat',
    qualityLabel: 'Qualitaet',
    widthLabel: 'Breite',
    heightLabel: 'Hoehe',
    cropLabel: 'Zuschnittprofil',
    presetLabel: 'Social Preset',
    dropzoneTitle: 'Bild ablegen oder waehlen',
    dropzoneBody: 'PNG, JPEG, WebP oder unterstuetztes AVIF bis 10 MB. Die Datei bleibt in diesem Tab.',
    beforeAfterTitle: 'Vorher und nachher',
    sourcePreviewTitle: 'Quellbild',
    outputPreviewTitle: 'Ausgabebild',
    workflowSnapshotTitle: 'Workflow-Snapshot',
    privacyChecklistTitle: 'Datenschutz-Checkliste',
    batchQueueTitle: 'Batch-Warteschlange gesperrt',
    batchQueueBody: 'Der Bezahlpfad deckt Ordner, Queues, gespeicherte Presets und Automatisierung nach Upload-, Retention- und Billing-Gates ab.',
    batchQueueItems: ['Ordner und Mehrdatei-Queues', 'Gespeicherte Presets und Namensregeln', 'API, Integrationen und High-Res-Jobs', 'KI/Hintergrundentfernung-Provider'],
    relatedToolsTitle: 'Verwandte Bildtools',
    relatedToolsBody: 'Mit einer weiteren lokalen Transformation ohne Upload fortfahren.',
    workbenchEyebrow: 'Bild-Workbench',
    workbenchTitle: 'Ablegen, einstellen, vergleichen und laden.',
    workbenchBody: 'Waehlen Sie eine Aufgabe, legen Sie eine lokale Datei ab, justieren Sie Format oder Qualitaet und vergleichen Sie die Ausgabe.',
    browserOnlyLabel: 'Nur Browser',
    noUploadLabel: 'Kein Upload',
    oneImageLabel: 'Ein Bild frei',
    toolTabsLabel: 'Bildworkflow-Tabs',
    openGuideLabel: 'Guide oeffnen',
    useCaseTitle: 'Use-Case-Presets',
    useCaseBody: 'Starten Sie mit Web-, Shop- oder Social-Einstellungen und passen Sie die Kontrollen an.',
    useCaseWebLabel: 'Web-Speed',
    useCaseStorefrontLabel: 'Shop',
    useCaseSocialLabel: 'Social Post',
    actualOutputLabel: 'Echte Ausgabe',
    savingsLabel: 'Ersparnis',
    workerLabel: 'Worker',
    browserWorkerLabel: 'Browser-Worker',
    localFallbackLabel: 'lokaler Fallback',
    fileStateLabel: 'Datei',
    noFileSelectedLabel: 'Wartet auf ein lokales Bild',
    renderStateLabel: 'Render',
    renderPendingLabel: 'Canvas-Ausgabe nach Verarbeitung geplant',
    storageStateLabel: 'Speicher',
    storageStateBody: 'Kein Upload-Endpunkt, localStorage, sessionStorage oder Konto.',
    upgradeGateBody: 'Batch, API, High-Res-Queues und KI bleiben inaktiv.',
    previewEyebrow: 'Vorschau und Ausgabe',
    previewPendingLabel: 'Ausgabe ausstehend',
    processingBody: 'Das Bild wird lokal verarbeitet...',
    previewEmptyBody: 'Waehlen Sie ein Bild fuer Quellvorschau, Ausgabemetriken und Download.',
    previewEmptyTitle: 'Bild ablegen, um zu starten',
    fileSafetyLabel: 'Dateisicherheit',
    fileSafetyBody: 'Serverseitiger Batch, API und KI brauchen Upload-Validierung, Sandbox, Retention und Antivirus vor Aktivierung.',
    privacyImageBytesLabel: 'Keine Bildbytes verlassen die Browser-Sitzung.',
    privacyObjectUrlLabel: 'Object URLs werden beim Reset oder Verlassen der Seite widerrufen.',
    privacyAnalyticsLabel: 'Analytics speichert nur Tool-Slug, Locale und Route.',
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return sanitizePublicCopy(locale, homeCopy[locale])
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return sanitizePublicCopy(locale, shellCopy[locale])
}
