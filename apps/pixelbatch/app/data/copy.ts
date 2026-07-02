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
  footerToolsTitle: string
  footerToolsBody: string
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
  accountTitle: string
  accountBody: string
  fileLabel: string
  formatLabel: string
  qualityLabel: string
  widthLabel: string
  heightLabel: string
  maintainAspectRatioLabel: string
  cropLabel: string
  presetLabel: string
  allSocialPresetsLabel: string
  dropzoneTitle: string
  dropzoneBody: string
  avifSupportBody: string
  beforeAfterTitle: string
  sourcePreviewTitle: string
  outputPreviewTitle: string
  socialOutputsTitle: string
  socialOutputsBody: string
  downloadPresetLabel: string
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
  originalSizeLabel: string
  inputDimensionsLabel: string
  outputDimensionsLabel: string
  estimatedOutputLabel: string
  actualOutputLabel: string
  savingsLabel: string
  reductionLabel: string
  workerLabel: string
  browserWorkerLabel: string
  localFallbackLabel: string
  outputFormatMetaLabel: string
  qualityMetaLabel: string
  metadataHandlingLabel: string
  metadataHandlingBody: string
  centeredCropNotice: string
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
    localBadgeLabel: 'Browser local',
    freeLabel: 'Free result',
    upgradeLabel: 'Upgrade path',
    detailCta: 'Open tool',
    principlesTitle: 'Operating principles',
    footerToolsTitle: 'Image tools for every asset step',
    footerToolsBody: 'Compress first, resize or crop for the channel, convert the format, clean metadata and generate social dimensions from the same local workflow.',
    principles: [
      { title: 'Basic need solved', body: 'The free browser tool can produce a useful optimized image without an account or upload endpoint.' },
      { title: 'Pixels stay local', body: 'Selected files are handled with object URLs, a worker plan and Canvas output in the browser session.' },
      { title: 'Workflow is account value', body: 'Batch, folders, larger files, API, integrations, saved presets, high-res queues and AI credits stay in account workflows.' },
    ],
    statusRows: [
      { title: '6 browser tools', body: 'Compress, resize, crop, convert, metadata removal and social presets are available locally.', tone: 'green' },
      { title: '5 language route sets', body: 'English, Portuguese, Spanish, French and German routes are prerendered.', tone: 'green' },
      { title: 'Your image stays in this browser', body: 'One selected file is decoded and re-encoded locally; account workflows remain separate.', tone: 'amber' },
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
    localBadgeLabel: 'Local no navegador',
    freeLabel: 'Resultado gratuito',
    upgradeLabel: 'Caminho de upgrade',
    detailCta: 'Abrir ferramenta',
    principlesTitle: 'Principios operacionais',
    footerToolsTitle: 'Ferramentas de imagem para cada etapa',
    footerToolsBody: 'Comprima primeiro, redimensione ou corte para o canal, converta formato, limpe metadados e gere dimensoes sociais no mesmo fluxo local.',
    principles: [
      { title: 'Necessidade basica', body: 'A ferramenta gratuita do navegador gera uma imagem otimizada util sem conta nem endpoint de upload.' },
      { title: 'Pixels locais', body: 'Arquivos selecionados usam object URLs, plano em worker e Canvas apenas na sessao do navegador.' },
      { title: 'Workflow de conta', body: 'Lotes, pastas, arquivos maiores, API, integracoes, presets salvos, alta resolucao e IA ficam nos fluxos de conta.' },
    ],
    statusRows: [
      { title: '6 ferramentas', body: 'Compressao, resize, crop, conversao, metadados e presets sociais rodam localmente.', tone: 'green' },
      { title: '5 rotas de idioma', body: 'Rotas em ingles, portugues, espanhol, frances e alemao sao prerenderizadas.', tone: 'green' },
      { title: 'Sua imagem fica neste navegador', body: 'Um arquivo selecionado e decodificado e reencodeado localmente; fluxos de conta ficam separados.', tone: 'amber' },
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
    localBadgeLabel: 'Local en navegador',
    freeLabel: 'Resultado gratis',
    upgradeLabel: 'Ruta de upgrade',
    detailCta: 'Abrir',
    principlesTitle: 'Principios operativos',
    footerToolsTitle: 'Herramientas de imagen para cada paso',
    footerToolsBody: 'Comprime primero, redimensiona o recorta para el canal, convierte formato, limpia metadatos y crea dimensiones sociales en el mismo flujo local.',
    principles: [
      { title: 'Necesidad basica', body: 'La herramienta gratis del navegador produce una imagen util sin cuenta ni endpoint de subida.' },
      { title: 'Pixeles locales', body: 'Los archivos usan object URLs, plan en worker y Canvas en la sesion del navegador.' },
      { title: 'Workflow de cuenta', body: 'Lotes, carpetas, archivos grandes, API, integraciones, presets, alta resolucion e IA quedan en flujos de cuenta.' },
    ],
    statusRows: [
      { title: '6 herramientas', body: 'Compresion, resize, crop, conversion, metadata y presets sociales corren localmente.', tone: 'green' },
      { title: '5 idiomas', body: 'Rutas en ingles, portugues, espanol, frances y aleman se prerenderizan.', tone: 'green' },
      { title: 'Tu imagen queda en este navegador', body: 'Un archivo seleccionado se decodifica y re-codifica localmente; los flujos de cuenta quedan separados.', tone: 'amber' },
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
    localBadgeLabel: 'Local navigateur',
    freeLabel: 'Resultat gratuit',
    upgradeLabel: 'Offre payante',
    detailCta: 'Ouvrir',
    principlesTitle: 'Principes operationnels',
    footerToolsTitle: 'Outils image pour chaque etape',
    footerToolsBody: 'Compressez, redimensionnez ou rognez pour le canal, convertissez le format, nettoyez les metadonnees et creez des dimensions sociales dans le meme flux local.',
    principles: [
      { title: 'Besoin de base', body: 'L outil gratuit du navigateur produit une image utile sans compte ni upload.' },
      { title: 'Pixels locaux', body: 'Les fichiers utilisent des object URLs, un plan worker et Canvas dans la session navigateur.' },
      { title: 'Workflow compte', body: 'Lots, dossiers, gros fichiers, API, integrations, presets, haute resolution et IA restent dans les workflows de compte.' },
    ],
    statusRows: [
      { title: '6 outils', body: 'Compression, resize, crop, conversion, metadata et presets sociaux sont locaux.', tone: 'green' },
      { title: '5 langues', body: 'Routes anglaises, portugaises, espagnoles, francaises et allemandes prerenderisees.', tone: 'green' },
      { title: 'Votre image reste dans ce navigateur', body: 'Un fichier choisi est decode et reencode localement; les workflows de compte restent separes.', tone: 'amber' },
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
    localBadgeLabel: 'Lokal im Browser',
    freeLabel: 'Kostenloses Ergebnis',
    upgradeLabel: 'Upgrade-Pfad',
    detailCta: 'Tool oeffnen',
    principlesTitle: 'Betriebsprinzipien',
    footerToolsTitle: 'Bildtools fuer jeden Asset-Schritt',
    footerToolsBody: 'Erst komprimieren, dann fuer den Kanal skalieren oder zuschneiden, Format wechseln, Metadaten bereinigen und Social-Groessen im selben lokalen Ablauf erzeugen.',
    principles: [
      { title: 'Basisbedarf geloest', body: 'Das kostenlose Browser-Tool erzeugt ein brauchbares optimiertes Bild ohne Konto oder Upload-Endpunkt.' },
      { title: 'Pixel bleiben lokal', body: 'Dateien werden mit Object URLs, Worker-Plan und Canvas nur in der Browser-Sitzung verarbeitet.' },
      { title: 'Workflow als Kontowert', body: 'Batch, Ordner, grosse Dateien, API, Integrationen, Presets, High-Res und KI bleiben Konto-Workflows.' },
    ],
    statusRows: [
      { title: '6 Browser-Tools', body: 'Komprimieren, Groesse, Zuschnitt, Konvertierung, Metadaten und Social-Presets laufen lokal.', tone: 'green' },
      { title: '5 Sprachrouten', body: 'Englische, portugiesische, spanische, franzoesische und deutsche Routen werden prerendered.', tone: 'green' },
      { title: 'Ihr Bild bleibt in diesem Browser', body: 'Eine ausgewaehlte Datei wird lokal decodiert und neu encodiert; Konto-Workflows bleiben getrennt.', tone: 'amber' },
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
    guideTitle: 'How to use this image tool',
    relatedTitle: 'Related pages',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    freeCheckLabel: 'Free image workflow',
    upgradePathLabel: 'Upgrade path',
    contentQualityBody: 'Choose an image action, compare the preview and download the version you want to keep.',
    privacyNote: 'Choose one image. PixelBatch does not upload files, store pixels, use localStorage, use sessionStorage or send image values to analytics.',
    invalidResultTitle: 'Check the image settings',
    pageStatusLabel: 'Image tool status',
    liveTitle: 'Browser-side tool',
    liveBody: 'Worker planning and Canvas rendering run in the browser without mandatory signup.',
    accountTitle: 'Account workflows',
    accountBody: 'Folders, larger files, API, saved presets, integrations, high-res queues and AI features stay outside the free local flow.',
    fileLabel: 'Image file',
    formatLabel: 'Output format',
    qualityLabel: 'Quality',
    widthLabel: 'Width',
    heightLabel: 'Height',
    maintainAspectRatioLabel: 'Maintain aspect ratio',
    cropLabel: 'Crop profile',
    presetLabel: 'Social preset',
    allSocialPresetsLabel: 'All social presets',
    dropzoneTitle: 'Drop or choose one image',
    dropzoneBody: 'PNG, JPEG, WebP or browser-supported AVIF up to 10 MB. The file stays in this tab.',
    avifSupportBody: 'AVIF export depends on this browser. If export fails, use WebP or JPEG.',
    beforeAfterTitle: 'Before and after',
    sourcePreviewTitle: 'Source image',
    outputPreviewTitle: 'Output image',
    socialOutputsTitle: 'Generated social outputs',
    socialOutputsBody: 'Each preset is rendered locally with its own preview and download button.',
    downloadPresetLabel: 'Download preset',
    workflowSnapshotTitle: 'Workflow snapshot',
    privacyChecklistTitle: 'Privacy checklist',
    batchQueueTitle: 'Batch workflows',
    batchQueueBody: 'Folders, queues, saved presets and automation need account controls, upload validation and retention rules.',
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
    originalSizeLabel: 'Original size',
    inputDimensionsLabel: 'Original dimensions',
    outputDimensionsLabel: 'Output dimensions',
    estimatedOutputLabel: 'Estimated output',
    actualOutputLabel: 'Actual output',
    savingsLabel: 'Savings',
    reductionLabel: 'Reduction',
    workerLabel: 'Worker',
    browserWorkerLabel: 'browser worker',
    localFallbackLabel: 'local fallback',
    outputFormatMetaLabel: 'Output format',
    qualityMetaLabel: 'Quality',
    metadataHandlingLabel: 'Metadata handling',
    metadataHandlingBody: 'Canvas re-encode keeps visible pixels and drops common embedded metadata.',
    centeredCropNotice: 'This uses a centered crop. Manual subject-aware cropping is not active in the free browser flow.',
    fileStateLabel: 'File',
    noFileSelectedLabel: 'Waiting for one local image',
    renderStateLabel: 'Render',
    renderPendingLabel: 'Canvas output appears after processing',
    storageStateLabel: 'Storage',
    storageStateBody: 'No upload endpoint, localStorage, sessionStorage or account.',
    upgradeGateBody: 'Use the single-image browser workflow now; batch, API, high-resolution queues and AI workflows are separate from the free result.',
    previewEyebrow: 'Preview and output',
    previewPendingLabel: 'Output pending',
    processingBody: 'Processing the selected image locally...',
    previewEmptyBody: 'Choose one image to see source preview, output metrics and download controls.',
    previewEmptyTitle: 'Drop an image to start',
    fileSafetyLabel: 'File safety',
    fileSafetyBody: 'Server-side batch, API and AI processing require upload validation, sandboxing, retention and antivirus checks.',
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
    guideTitle: 'Como usar esta ferramenta de imagem',
    relatedTitle: 'Páginas úteis',
    faqTitle: 'Perguntas frequentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Workflow gratuito',
    upgradePathLabel: 'Caminho de upgrade',
    contentQualityBody: 'Escolha uma ação de imagem, compare o preview e baixe a versão que deseja manter.',
    privacyNote: 'Escolha uma imagem. O PixelBatch nao faz upload, nao armazena pixels, nao usa localStorage/sessionStorage e nao envia valores a analytics.',
    invalidResultTitle: 'Confira os ajustes',
    pageStatusLabel: 'Status da ferramenta',
    liveTitle: 'Ferramenta no navegador',
    liveBody: 'Worker e Canvas rodam no navegador sem cadastro obrigatorio.',
    accountTitle: 'Fluxos de conta',
    accountBody: 'Pastas, arquivos maiores, API, presets salvos, integracoes, alta resolucao e IA ficam fora do fluxo local gratuito.',
    fileLabel: 'Arquivo de imagem',
    formatLabel: 'Formato de saida',
    qualityLabel: 'Qualidade',
    widthLabel: 'Largura',
    heightLabel: 'Altura',
    maintainAspectRatioLabel: 'Manter proporcao',
    cropLabel: 'Perfil de corte',
    presetLabel: 'Preset social',
    allSocialPresetsLabel: 'Todos os presets sociais',
    dropzoneTitle: 'Solte ou escolha uma imagem',
    dropzoneBody: 'PNG, JPEG, WebP ou AVIF suportado ate 10 MB. O arquivo fica nesta aba.',
    avifSupportBody: 'Exportar AVIF depende deste navegador. Se falhar, use WebP ou JPEG.',
    beforeAfterTitle: 'Antes e depois',
    sourcePreviewTitle: 'Imagem original',
    outputPreviewTitle: 'Imagem final',
    socialOutputsTitle: 'Saidas sociais geradas',
    socialOutputsBody: 'Cada preset e renderizado localmente com preview e botao de download.',
    downloadPresetLabel: 'Baixar preset',
    workflowSnapshotTitle: 'Resumo do workflow',
    privacyChecklistTitle: 'Checklist de privacidade',
    batchQueueTitle: 'Fluxos em lote',
    batchQueueBody: 'Pastas, filas, presets salvos e automacao precisam de controles de conta, validacao de upload e regras de retencao.',
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
    originalSizeLabel: 'Tamanho original',
    inputDimensionsLabel: 'Dimensoes originais',
    outputDimensionsLabel: 'Dimensoes de saida',
    estimatedOutputLabel: 'Saida estimada',
    actualOutputLabel: 'Saida real',
    savingsLabel: 'Economia',
    reductionLabel: 'Reducao',
    workerLabel: 'Worker',
    browserWorkerLabel: 'worker do navegador',
    localFallbackLabel: 'fallback local',
    outputFormatMetaLabel: 'Formato de saida',
    qualityMetaLabel: 'Qualidade',
    metadataHandlingLabel: 'Tratamento de metadados',
    metadataHandlingBody: 'O reencode via Canvas mantem pixels visiveis e remove metadados comuns embutidos.',
    centeredCropNotice: 'Este corte e centralizado. Corte manual por sujeito nao esta ativo no fluxo gratuito do navegador.',
    fileStateLabel: 'Arquivo',
    noFileSelectedLabel: 'Aguardando uma imagem local',
    renderStateLabel: 'Render',
    renderPendingLabel: 'Saida Canvas aparece apos processar',
    storageStateLabel: 'Storage',
    storageStateBody: 'Sem upload endpoint, localStorage, sessionStorage ou conta.',
    upgradeGateBody: 'Use o fluxo de uma imagem no navegador agora; lotes, API, filas de alta resolução e IA ficam separados do resultado gratuito.',
    previewEyebrow: 'Preview e saida',
    previewPendingLabel: 'Saida pendente',
    processingBody: 'Processando a imagem localmente...',
    previewEmptyBody: 'Escolha uma imagem para ver preview original, metricas de saida e download.',
    previewEmptyTitle: 'Solte uma imagem para comecar',
    fileSafetyLabel: 'Seguranca de arquivo',
    fileSafetyBody: 'Batch server-side, API e IA exigem validacao de upload, sandbox, retencao e antivirus.',
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
    guideTitle: 'Como usar esta herramienta de imagen',
    relatedTitle: 'Páginas útiles',
    faqTitle: 'Preguntas frecuentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Workflow gratis',
    upgradePathLabel: 'Ruta de upgrade',
    contentQualityBody: 'Elige una acción de imagen, compara la vista previa y descarga la versión que quieres conservar.',
    privacyNote: 'Elige una imagen. PixelBatch no sube archivos, no almacena pixeles, no usa storage ni envia valores a analytics.',
    invalidResultTitle: 'Revisa los ajustes',
    pageStatusLabel: 'Estado',
    liveTitle: 'Herramienta en navegador',
    liveBody: 'Worker y Canvas corren en el navegador sin registro obligatorio.',
    accountTitle: 'Flujos de cuenta',
    accountBody: 'Carpetas, archivos grandes, API, presets, integraciones, alta resolucion e IA quedan fuera del flujo local gratis.',
    fileLabel: 'Archivo de imagen',
    formatLabel: 'Formato',
    qualityLabel: 'Calidad',
    widthLabel: 'Ancho',
    heightLabel: 'Alto',
    maintainAspectRatioLabel: 'Mantener proporcion',
    cropLabel: 'Perfil de recorte',
    presetLabel: 'Preset social',
    allSocialPresetsLabel: 'Todos los presets sociales',
    dropzoneTitle: 'Suelta o elige una imagen',
    dropzoneBody: 'PNG, JPEG, WebP o AVIF soportado hasta 10 MB. El archivo queda en esta pestana.',
    avifSupportBody: 'Exportar AVIF depende de este navegador. Si falla, usa WebP o JPEG.',
    beforeAfterTitle: 'Antes y despues',
    sourcePreviewTitle: 'Imagen original',
    outputPreviewTitle: 'Imagen final',
    socialOutputsTitle: 'Salidas sociales generadas',
    socialOutputsBody: 'Cada preset se renderiza localmente con vista previa y boton de descarga.',
    downloadPresetLabel: 'Descargar preset',
    workflowSnapshotTitle: 'Resumen del workflow',
    privacyChecklistTitle: 'Checklist de privacidad',
    batchQueueTitle: 'Flujos batch',
    batchQueueBody: 'Carpetas, colas, presets guardados y automatizacion necesitan controles de cuenta, validacion de upload y reglas de retencion.',
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
    originalSizeLabel: 'Tamano original',
    inputDimensionsLabel: 'Dimensiones originales',
    outputDimensionsLabel: 'Dimensiones de salida',
    estimatedOutputLabel: 'Salida estimada',
    actualOutputLabel: 'Salida real',
    savingsLabel: 'Ahorro',
    reductionLabel: 'Reduccion',
    workerLabel: 'Worker',
    browserWorkerLabel: 'worker del navegador',
    localFallbackLabel: 'fallback local',
    outputFormatMetaLabel: 'Formato de salida',
    qualityMetaLabel: 'Calidad',
    metadataHandlingLabel: 'Tratamiento de metadatos',
    metadataHandlingBody: 'El re-encode via Canvas conserva pixeles visibles y elimina metadatos comunes embebidos.',
    centeredCropNotice: 'Este recorte es centrado. El recorte manual por sujeto no esta activo en el flujo gratis del navegador.',
    fileStateLabel: 'Archivo',
    noFileSelectedLabel: 'Esperando una imagen local',
    renderStateLabel: 'Render',
    renderPendingLabel: 'La salida Canvas aparece despues de procesar',
    storageStateLabel: 'Storage',
    storageStateBody: 'Sin upload endpoint, localStorage, sessionStorage ni cuenta.',
    upgradeGateBody: 'Usa el flujo de una imagen en el navegador; lotes, API, colas de alta resolución e IA quedan separados del resultado gratuito.',
    previewEyebrow: 'Preview y salida',
    previewPendingLabel: 'Salida pendiente',
    processingBody: 'Procesando la imagen localmente...',
    previewEmptyBody: 'Elige una imagen para ver preview original, metricas de salida y descarga.',
    previewEmptyTitle: 'Suelta una imagen para empezar',
    fileSafetyLabel: 'Seguridad de archivo',
    fileSafetyBody: 'Batch server-side, API e IA requieren validacion de upload, sandbox, retencion y antivirus.',
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
    guideTitle: 'Comment utiliser cet outil image',
    relatedTitle: 'Pages utiles',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    freeCheckLabel: 'Workflow gratuit',
    upgradePathLabel: 'Offre payante',
    contentQualityBody: 'Choisissez une action image, comparez l aperçu et téléchargez la version à conserver.',
    privacyNote: 'Choisissez une image. PixelBatch ne charge pas, ne stocke pas les pixels, n utilise pas storage et n envoie pas les valeurs a analytics.',
    invalidResultTitle: 'Verifiez les reglages',
    pageStatusLabel: 'Statut',
    liveTitle: 'Outil navigateur',
    liveBody: 'Worker et Canvas fonctionnent dans le navigateur sans compte obligatoire.',
    accountTitle: 'Workflows compte',
    accountBody: 'Dossiers, gros fichiers, API, presets, integrations, haute resolution et IA restent hors du flux local gratuit.',
    fileLabel: 'Fichier image',
    formatLabel: 'Format',
    qualityLabel: 'Qualite',
    widthLabel: 'Largeur',
    heightLabel: 'Hauteur',
    maintainAspectRatioLabel: 'Conserver proportion',
    cropLabel: 'Profil de crop',
    presetLabel: 'Preset social',
    allSocialPresetsLabel: 'Tous les presets sociaux',
    dropzoneTitle: 'Deposez ou choisissez une image',
    dropzoneBody: 'PNG, JPEG, WebP ou AVIF supporte jusqu a 10 MB. Le fichier reste dans cet onglet.',
    avifSupportBody: 'L export AVIF depend de ce navigateur. Si cela echoue, utilisez WebP ou JPEG.',
    beforeAfterTitle: 'Avant et apres',
    sourcePreviewTitle: 'Image source',
    outputPreviewTitle: 'Image finale',
    socialOutputsTitle: 'Sorties sociales generees',
    socialOutputsBody: 'Chaque preset est rendu localement avec apercu et bouton de telechargement.',
    downloadPresetLabel: 'Telecharger preset',
    workflowSnapshotTitle: 'Resume du workflow',
    privacyChecklistTitle: 'Checklist confidentialite',
    batchQueueTitle: 'Workflows de lots',
    batchQueueBody: 'Dossiers, files, presets sauvegardes et automatisation exigent controles de compte, validation upload et regles de retention.',
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
    originalSizeLabel: 'Taille originale',
    inputDimensionsLabel: 'Dimensions originales',
    outputDimensionsLabel: 'Dimensions sortie',
    estimatedOutputLabel: 'Sortie estimee',
    actualOutputLabel: 'Sortie reelle',
    savingsLabel: 'Gain',
    reductionLabel: 'Reduction',
    workerLabel: 'Worker',
    browserWorkerLabel: 'worker navigateur',
    localFallbackLabel: 'fallback local',
    outputFormatMetaLabel: 'Format sortie',
    qualityMetaLabel: 'Qualite',
    metadataHandlingLabel: 'Traitement metadata',
    metadataHandlingBody: 'Le reencodage Canvas garde les pixels visibles et retire les metadonnees communes integrees.',
    centeredCropNotice: 'Ce crop est centre. Le recadrage manuel par sujet n est pas actif dans le flux navigateur gratuit.',
    fileStateLabel: 'Fichier',
    noFileSelectedLabel: 'En attente d une image locale',
    renderStateLabel: 'Rendu',
    renderPendingLabel: 'La sortie Canvas apparait apres traitement',
    storageStateLabel: 'Stockage',
    storageStateBody: 'Sans upload endpoint, localStorage, sessionStorage ou compte.',
    upgradeGateBody: 'Utilisez le flux navigateur pour une image; lots, API, files haute résolution et IA restent séparés du résultat gratuit.',
    previewEyebrow: 'Apercu et sortie',
    previewPendingLabel: 'Sortie en attente',
    processingBody: 'Traitement local de l image...',
    previewEmptyBody: 'Choisissez une image pour voir l original, les mesures de sortie et le telechargement.',
    previewEmptyTitle: 'Deposez une image pour commencer',
    fileSafetyLabel: 'Securite fichier',
    fileSafetyBody: 'Le batch server-side, API et IA exigent validation upload, sandbox, retention et antivirus.',
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
    guideTitle: 'So nutzen Sie dieses Bild-Tool',
    relatedTitle: 'Verwandte Seiten',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    freeCheckLabel: 'Kostenloser Bildworkflow',
    upgradePathLabel: 'Upgrade-Pfad',
    contentQualityBody: 'Wählen Sie eine Bildaktion, vergleichen Sie die Vorschau und laden Sie die gewünschte Version herunter.',
    privacyNote: 'Waehlen Sie ein Bild. PixelBatch laedt nicht hoch, speichert keine Pixel, nutzt kein Storage und sendet keine Werte an Analytics.',
    invalidResultTitle: 'Einstellungen pruefen',
    pageStatusLabel: 'Toolstatus',
    liveTitle: 'Browserseitiges Tool',
    liveBody: 'Worker und Canvas laufen im Browser ohne Pflichtkonto.',
    accountTitle: 'Konto-Workflows',
    accountBody: 'Ordner, grosse Dateien, API, Presets, Integrationen, High-Res und KI bleiben ausserhalb des freien lokalen Ablaufs.',
    fileLabel: 'Bilddatei',
    formatLabel: 'Ausgabeformat',
    qualityLabel: 'Qualitaet',
    widthLabel: 'Breite',
    heightLabel: 'Hoehe',
    maintainAspectRatioLabel: 'Seitenverhaeltnis halten',
    cropLabel: 'Zuschnittprofil',
    presetLabel: 'Social Preset',
    allSocialPresetsLabel: 'Alle Social Presets',
    dropzoneTitle: 'Bild ablegen oder waehlen',
    dropzoneBody: 'PNG, JPEG, WebP oder unterstuetztes AVIF bis 10 MB. Die Datei bleibt in diesem Tab.',
    avifSupportBody: 'AVIF-Export haengt von diesem Browser ab. Falls er fehlschlaegt, WebP oder JPEG nutzen.',
    beforeAfterTitle: 'Vorher und nachher',
    sourcePreviewTitle: 'Quellbild',
    outputPreviewTitle: 'Ausgabebild',
    socialOutputsTitle: 'Erzeugte Social-Ausgaben',
    socialOutputsBody: 'Jedes Preset wird lokal mit eigener Vorschau und eigenem Download gerendert.',
    downloadPresetLabel: 'Preset herunterladen',
    workflowSnapshotTitle: 'Workflow-Snapshot',
    privacyChecklistTitle: 'Datenschutz-Checkliste',
    batchQueueTitle: 'Batch-Workflows',
    batchQueueBody: 'Ordner, Queues, gespeicherte Presets und Automatisierung brauchen Konto-Kontrollen, Upload-Validierung und Retention-Regeln.',
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
    originalSizeLabel: 'Originalgroesse',
    inputDimensionsLabel: 'Originalabmessungen',
    outputDimensionsLabel: 'Ausgabeabmessungen',
    estimatedOutputLabel: 'Geschaetzte Ausgabe',
    actualOutputLabel: 'Echte Ausgabe',
    savingsLabel: 'Ersparnis',
    reductionLabel: 'Reduktion',
    workerLabel: 'Worker',
    browserWorkerLabel: 'Browser-Worker',
    localFallbackLabel: 'lokaler Fallback',
    outputFormatMetaLabel: 'Ausgabeformat',
    qualityMetaLabel: 'Qualitaet',
    metadataHandlingLabel: 'Metadatenbehandlung',
    metadataHandlingBody: 'Canvas-Neuencoding behaelt sichtbare Pixel und entfernt uebliche eingebettete Metadaten.',
    centeredCropNotice: 'Dieser Zuschnitt ist zentriert. Manueller subject-aware Zuschnitt ist im freien Browserablauf nicht aktiv.',
    fileStateLabel: 'Datei',
    noFileSelectedLabel: 'Wartet auf ein lokales Bild',
    renderStateLabel: 'Render',
    renderPendingLabel: 'Canvas-Ausgabe erscheint nach Verarbeitung',
    storageStateLabel: 'Speicher',
    storageStateBody: 'Kein Upload-Endpunkt, localStorage, sessionStorage oder Konto.',
    upgradeGateBody: 'Nutzen Sie jetzt den Ein-Bild-Browserflow; Batch, API, High-Resolution-Queues und KI sind vom kostenlosen Ergebnis getrennt.',
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
