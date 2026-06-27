import type { LocaleCode } from './locales'

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
  privacyChecklistTitle: string
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
    localBadgeLabel: 'Local MVP',
    freeLabel: 'Free result',
    upgradeLabel: 'Upgrade path',
    detailCta: 'Open tool',
    principlesTitle: 'Operating principles',
    principles: [
      { title: 'Basic need solved', body: 'The free MVP can produce a useful PDF output without an account, checkout or upload endpoint.' },
      { title: 'Documents stay local', body: 'Selected PDFs are handled with browser memory, worker validation and pdf-lib output in the current session.' },
      { title: 'Heavy workflow gated', body: 'Batch, larger files, OCR, table extraction, history, API and teams stay gated until sandbox, antivirus and retention rules exist.' },
    ],
    statusRows: [
      { title: '8 document tools', body: 'Merge, split, rotate, compress, watermark, page numbers, metadata and text conversion are available locally.', tone: 'green' },
      { title: '5 language route sets', body: 'English, Portuguese, Spanish, French and German routes are prerendered.', tone: 'green' },
      { title: 'No file backend active', body: 'No upload API, server-side worker, account, billing, ads or external analytics is active.', tone: 'amber' },
    ],
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
    localBadgeLabel: 'MVP local',
    freeLabel: 'Resultado gratuito',
    upgradeLabel: 'Caminho de upgrade',
    detailCta: 'Abrir ferramenta',
    principlesTitle: 'Principios operacionais',
    principles: [
      { title: 'Necessidade basica', body: 'O MVP gratuito gera uma saida PDF util sem conta, checkout ou endpoint de upload.' },
      { title: 'Documentos locais', body: 'PDFs selecionados usam memoria do navegador, validacao em worker e saida via pdf-lib na sessao.' },
      { title: 'Workflow pesado bloqueado', body: 'Lote, arquivos maiores, OCR, tabelas, historico, API e equipes dependem de sandbox, antivirus e retencao.' },
    ],
    statusRows: [
      { title: '8 ferramentas', body: 'Unir, dividir, girar, comprimir, marca d agua, paginas, metadados e texto rodam localmente.', tone: 'green' },
      { title: '5 rotas de idioma', body: 'Rotas em ingles, portugues, espanhol, frances e alemao sao prerenderizadas.', tone: 'green' },
      { title: 'Sem backend de arquivos', body: 'Sem upload API, worker server-side, conta, billing, ads ou analytics externo ativo.', tone: 'amber' },
    ],
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
    localBadgeLabel: 'MVP local',
    freeLabel: 'Resultado gratis',
    upgradeLabel: 'Ruta de upgrade',
    detailCta: 'Abrir',
    principlesTitle: 'Principios operativos',
    principles: [
      { title: 'Necesidad basica', body: 'El MVP gratis genera una salida PDF util sin cuenta, checkout ni endpoint de subida.' },
      { title: 'Documentos locales', body: 'Los PDFs usan memoria del navegador, validacion worker y salida pdf-lib en la sesion.' },
      { title: 'Workflow pesado gated', body: 'Lote, archivos grandes, OCR, tablas, historial, API y equipos requieren sandbox, antivirus y retencion.' },
    ],
    statusRows: [
      { title: '8 herramientas', body: 'Unir, dividir, rotar, comprimir, marca de agua, paginas, metadata y texto corren localmente.', tone: 'green' },
      { title: '5 idiomas', body: 'Rutas en ingles, portugues, espanol, frances y aleman se prerenderizan.', tone: 'green' },
      { title: 'Sin backend de archivos', body: 'Sin upload API, worker servidor, cuenta, billing, ads ni analytics externo.', tone: 'amber' },
    ],
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
    localBadgeLabel: 'MVP local',
    freeLabel: 'Resultat gratuit',
    upgradeLabel: 'Offre payante',
    detailCta: 'Ouvrir',
    principlesTitle: 'Principes operationnels',
    principles: [
      { title: 'Besoin de base', body: 'Le MVP gratuit produit un PDF utile sans compte, checkout ni endpoint upload.' },
      { title: 'Documents locaux', body: 'Les PDFs utilisent memoire navigateur, validation worker et sortie pdf-lib dans la session.' },
      { title: 'Workflow lourd gate', body: 'Lots, gros fichiers, OCR, tableaux, historique, API et equipes exigent sandbox, antivirus et retention.' },
    ],
    statusRows: [
      { title: '8 outils', body: 'Fusion, separation, rotation, compression, filigrane, pages, metadata et texte sont locaux.', tone: 'green' },
      { title: '5 langues', body: 'Routes anglaises, portugaises, espagnoles, francaises et allemandes prerenderisees.', tone: 'green' },
      { title: 'Pas de backend fichier', body: 'Pas d upload API, worker serveur, compte, billing, ads ou analytics externe.', tone: 'amber' },
    ],
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
    localBadgeLabel: 'Lokales MVP',
    freeLabel: 'Kostenloses Ergebnis',
    upgradeLabel: 'Upgrade-Pfad',
    detailCta: 'Tool oeffnen',
    principlesTitle: 'Betriebsprinzipien',
    principles: [
      { title: 'Basisbedarf geloest', body: 'Das kostenlose MVP erzeugt ein brauchbares PDF ohne Konto, Checkout oder Upload-Endpunkt.' },
      { title: 'Dokumente bleiben lokal', body: 'PDFs nutzen Browser-Speicher, Worker-Validierung und pdf-lib-Ausgabe in der Sitzung.' },
      { title: 'Schwere Workflows gesperrt', body: 'Batch, grosse Dateien, OCR, Tabellen, Verlauf, API und Teams brauchen Sandbox, Antivirus und Retention.' },
    ],
    statusRows: [
      { title: '8 Dokumenttools', body: 'Merge, Split, Rotation, Kompression, Wasserzeichen, Seiten, Metadaten und Text laufen lokal.', tone: 'green' },
      { title: '5 Sprachrouten', body: 'Englische, portugiesische, spanische, franzoesische und deutsche Routen werden prerendered.', tone: 'green' },
      { title: 'Kein Datei-Backend', body: 'Keine Upload API, Server Worker, Konto, Billing, Ads oder externes Analytics aktiv.', tone: 'amber' },
    ],
  },
}

export const shellCopy: Record<LocaleCode, ShellCopy> = {
  en: {
    breadcrumbHome: 'DocShift',
    runLabel: 'Process document',
    resetLabel: 'Reset settings',
    downloadLabel: 'Download PDF',
    inputTitle: 'Document settings',
    resultTitle: 'Preview',
    guideTitle: 'Guide and limits',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    freeCheckLabel: 'Free document workflow',
    upgradePathLabel: 'Upgrade path',
    contentQualityBody: 'This page combines a working browser-side PDF tool, visible file limits, FAQ and review date.',
    privacyNote: 'Choose a small PDF or paste text. DocShift does not upload files, store document content, use localStorage, use sessionStorage or send document values to analytics.',
    invalidResultTitle: 'Check the document settings',
    pageStatusLabel: 'Document tool status',
    liveTitle: 'Client-side MVP',
    liveBody: 'Worker validation and pdf-lib processing run in the browser without mandatory signup.',
    gatedTitle: 'Heavy processing gated',
    gatedBody: 'Batch, larger files, OCR, table extraction, history, API, teams and server queues are not active.',
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
    privacyChecklistTitle: 'Privacy checklist',
    heavyQueueTitle: 'Server workflow gated',
    heavyQueueBody: 'The paid path is reserved for batch folders, OCR, table extraction, history, teams and API after sandbox, antivirus, retention and billing gates.',
    heavyQueueItems: ['Batch folders and larger files', 'OCR and table extraction', 'History, teams and API access', 'Server queues with retention/deletion rules'],
    relatedToolsTitle: 'Related document tools',
    relatedToolsBody: 'Continue with another local PDF workflow without uploading the document.',
  },
  'pt-br': {
    breadcrumbHome: 'DocShift',
    runLabel: 'Processar documento',
    resetLabel: 'Restaurar ajustes',
    downloadLabel: 'Baixar PDF',
    inputTitle: 'Ajustes do documento',
    resultTitle: 'Preview',
    guideTitle: 'Guia e limites',
    faqTitle: 'Perguntas frequentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Workflow gratuito',
    upgradePathLabel: 'Caminho de upgrade',
    contentQualityBody: 'Esta pagina combina ferramenta local de PDF, limites, FAQ e data de revisao.',
    privacyNote: 'Escolha um PDF pequeno ou cole texto. O DocShift nao faz upload, nao armazena conteudo, nao usa storage e nao envia valores a analytics.',
    invalidResultTitle: 'Confira os ajustes',
    pageStatusLabel: 'Status da ferramenta',
    liveTitle: 'MVP client-side',
    liveBody: 'Validacao em worker e pdf-lib rodam no navegador sem cadastro obrigatorio.',
    gatedTitle: 'Processamento pesado bloqueado',
    gatedBody: 'Lotes, arquivos maiores, OCR, tabelas, historico, API, equipes e filas no servidor nao estao ativos.',
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
    privacyChecklistTitle: 'Checklist de privacidade',
    heavyQueueTitle: 'Workflow server-side bloqueado',
    heavyQueueBody: 'O caminho pago fica para lotes, OCR, tabelas, historico, equipes e API apos gates de sandbox, antivirus, retencao e billing.',
    heavyQueueItems: ['Pastas em lote e arquivos maiores', 'OCR e extracao de tabelas', 'Historico, equipes e API', 'Filas server-side com retencao/exclusao'],
    relatedToolsTitle: 'Ferramentas relacionadas',
    relatedToolsBody: 'Continue com outro workflow local de PDF sem fazer upload.',
  },
  es: {
    breadcrumbHome: 'DocShift',
    runLabel: 'Procesar documento',
    resetLabel: 'Restaurar ajustes',
    downloadLabel: 'Descargar PDF',
    inputTitle: 'Ajustes',
    resultTitle: 'Vista previa',
    guideTitle: 'Guia y limites',
    faqTitle: 'Preguntas frecuentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Workflow gratis',
    upgradePathLabel: 'Ruta de upgrade',
    contentQualityBody: 'Esta pagina combina herramienta PDF local, limites, FAQ y fecha de revision.',
    privacyNote: 'Elige un PDF pequeno o pega texto. DocShift no sube archivos, no almacena contenido, no usa storage ni envia valores a analytics.',
    invalidResultTitle: 'Revisa los ajustes',
    pageStatusLabel: 'Estado',
    liveTitle: 'MVP client-side',
    liveBody: 'Validacion worker y pdf-lib corren en el navegador sin registro obligatorio.',
    gatedTitle: 'Procesamiento pesado bloqueado',
    gatedBody: 'Lotes, archivos grandes, OCR, tablas, historial, API, equipos y colas servidor no estan activos.',
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
    privacyChecklistTitle: 'Checklist de privacidad',
    heavyQueueTitle: 'Workflow servidor bloqueado',
    heavyQueueBody: 'El camino pago queda para lotes, OCR, tablas, historial, equipos y API tras gates de sandbox, antivirus, retencion y billing.',
    heavyQueueItems: ['Carpetas batch y archivos mayores', 'OCR y extraccion de tablas', 'Historial, equipos y API', 'Colas servidor con retencion/borrado'],
    relatedToolsTitle: 'Herramientas relacionadas',
    relatedToolsBody: 'Continua con otro workflow PDF local sin subir el documento.',
  },
  fr: {
    breadcrumbHome: 'DocShift',
    runLabel: 'Traiter document',
    resetLabel: 'Reinitialiser',
    downloadLabel: 'Telecharger PDF',
    inputTitle: 'Reglages',
    resultTitle: 'Apercu',
    guideTitle: 'Guide et limites',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    freeCheckLabel: 'Workflow gratuit',
    upgradePathLabel: 'Offre payante',
    contentQualityBody: 'Cette page combine outil PDF local, limites, FAQ et date de revue.',
    privacyNote: 'Choisissez un petit PDF ou collez du texte. DocShift ne charge pas, ne stocke pas le contenu, n utilise pas storage et n envoie pas les valeurs a analytics.',
    invalidResultTitle: 'Verifiez les reglages',
    pageStatusLabel: 'Statut',
    liveTitle: 'MVP client-side',
    liveBody: 'Validation worker et pdf-lib fonctionnent dans le navigateur sans compte obligatoire.',
    gatedTitle: 'Traitement lourd gate',
    gatedBody: 'Lots, gros fichiers, OCR, tableaux, historique, API, equipes et queues serveur ne sont pas actifs.',
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
    privacyChecklistTitle: 'Checklist confidentialite',
    heavyQueueTitle: 'Workflow serveur gate',
    heavyQueueBody: 'Le chemin payant couvre lots, OCR, tableaux, historique, equipes et API apres gates sandbox, antivirus, retention et billing.',
    heavyQueueItems: ['Dossiers batch et gros fichiers', 'OCR et extraction de tableaux', 'Historique, equipes et API', 'Queues serveur avec retention/suppression'],
    relatedToolsTitle: 'Outils document lies',
    relatedToolsBody: 'Continuez avec un autre workflow PDF local sans upload.',
  },
  de: {
    breadcrumbHome: 'DocShift',
    runLabel: 'Dokument verarbeiten',
    resetLabel: 'Einstellungen zuruecksetzen',
    downloadLabel: 'PDF herunterladen',
    inputTitle: 'Dokumenteinstellungen',
    resultTitle: 'Vorschau',
    guideTitle: 'Leitfaden und Grenzen',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    freeCheckLabel: 'Kostenloser Dokumentworkflow',
    upgradePathLabel: 'Upgrade-Pfad',
    contentQualityBody: 'Diese Seite kombiniert ein lokales PDF-Tool, Dateilimits, FAQ und Pruefdatum.',
    privacyNote: 'Waehlen Sie ein kleines PDF oder fuegen Sie Text ein. DocShift laedt nicht hoch, speichert keine Inhalte, nutzt kein Storage und sendet keine Werte an Analytics.',
    invalidResultTitle: 'Einstellungen pruefen',
    pageStatusLabel: 'Toolstatus',
    liveTitle: 'Client-seitiges MVP',
    liveBody: 'Worker-Validierung und pdf-lib laufen im Browser ohne Pflichtkonto.',
    gatedTitle: 'Schwere Verarbeitung gesperrt',
    gatedBody: 'Batch, grosse Dateien, OCR, Tabellen, Verlauf, API, Teams und Server-Queues sind nicht aktiv.',
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
    privacyChecklistTitle: 'Datenschutz-Checkliste',
    heavyQueueTitle: 'Server-Workflow gesperrt',
    heavyQueueBody: 'Der Bezahlpfad ist fuer Batch, OCR, Tabellen, Verlauf, Teams und API nach Sandbox-, Antivirus-, Retention- und Billing-Gates reserviert.',
    heavyQueueItems: ['Batch-Ordner und groessere Dateien', 'OCR und Tabellenextraktion', 'Verlauf, Teams und API', 'Server-Queues mit Retention/Loeschung'],
    relatedToolsTitle: 'Verwandte Dokumenttools',
    relatedToolsBody: 'Mit einem weiteren lokalen PDF-Workflow ohne Upload fortfahren.',
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return homeCopy[locale]
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return shellCopy[locale]
}
