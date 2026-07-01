import { sanitizePublicCopy, type LocaleCode } from './locales'

export interface HomeCopy {
  eyebrow: string
  title: string
  lead: string
  workbenchEyebrow: string
  workbenchTitle: string
  workbenchBody: string
  quickToolsTitle: string
  recentToolsTitle: string
  emptyRecentBody: string
  outputViewLabel: string
  treeViewLabel: string
  errorViewLabel: string
  clearLabel: string
  openFullToolLabel: string
  inputMetricsLabel: string
  resultMetricsLabel: string
  searchLabel: string
  searchPlaceholder: string
  categoryLabel: string
  allCategories: string
  noResultsTitle: string
  noResultsBody: string
  freeLabel: string
  upgradeLabel: string
  detailCta: string
  localBadgeLabel: string
  principlesTitle: string
  principles: Array<{ title: string; body: string }>
  statusRows: Array<{ title: string; body: string; tone: 'green' | 'amber' }>
}

export interface ShellCopy {
  breadcrumbHome: string
  runLabel: string
  resetLabel: string
  workbenchTitle: string
  workbenchBody: string
  inputTitle: string
  resultTitle: string
  exampleTitle: string
  privacyTitle: string
  emptyResultTitle: string
  emptyResultBody: string
  runningResultTitle: string
  runningResultBody: string
  successResultTitle: string
  successResultBody: string
  resultActionsLabel: string
  copyResultLabel: string
  copiedResultLabel: string
  copyFailedLabel: string
  downloadResultLabel: string
  relatedTitle: string
  relatedBody: string
  openRelatedLabel: string
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
  gatedItems: string[]
}

export const homeCopy: Record<LocaleCode, HomeCopy> = {
  en: {
    eyebrow: 'DevUtility Lab',
    title: 'Developer utilities that keep snippets local first.',
    lead: 'Format, encode, inspect and compare common developer snippets without mandatory signup or product API transfer.',
    workbenchEyebrow: 'Local developer workbench',
    workbenchTitle: 'Run a utility before choosing a tool page.',
    workbenchBody: 'Pick a tool, load the safe example, inspect output, tree view and errors, then continue to the full page when you need guidance.',
    quickToolsTitle: 'Dense tool navigation',
    recentToolsTitle: 'Recent in this session',
    emptyRecentBody: 'Run a tool to build a temporary in-memory recent list. Nothing is saved.',
    outputViewLabel: 'Output view',
    treeViewLabel: 'Tree view',
    errorViewLabel: 'Error view',
    clearLabel: 'Clear',
    openFullToolLabel: 'Open full tool page',
    inputMetricsLabel: 'Input metrics',
    resultMetricsLabel: 'Result metrics',
    searchLabel: 'Search tools',
    searchPlaceholder: 'Try JSON, JWT, regex, cron, UUID or hash',
    categoryLabel: 'Category',
    allCategories: 'All tools',
    noResultsTitle: 'No tools matched',
    noResultsBody: 'Clear the search or choose another category.',
    freeLabel: 'Free result',
    upgradeLabel: 'Upgrade path',
    detailCta: 'Open tool',
    localBadgeLabel: 'Runs locally when possible',
    principlesTitle: 'Workbench principles',
    principles: [
      { title: 'Local by default', body: 'The MVP runs transformations in the browser and uses a Web Worker when the browser supports it.' },
      { title: 'No content logging', body: 'Analytics events may include the tool slug and page path, never pasted snippets or generated results.' },
      { title: 'Workflow depth', body: 'Upgrade value belongs in saved runs, workspaces, batch jobs, larger files and API automation.' },
    ],
    statusRows: [
      { title: '9 browser tools', body: 'JSON/XML/YAML/CSV, Base64, JWT, regex, diff, cron, UUID, timestamp and hashes.', tone: 'green' },
      { title: '5 language route sets', body: 'English, Portuguese, Spanish, French and German pages are prerendered.', tone: 'green' },
      { title: 'Runs locally when possible', body: 'Current tools run in the browser worker when supported and need no account for the basic result.', tone: 'green' },
    ],
  },
  'pt-br': {
    eyebrow: 'DevUtility Lab',
    title: 'Ferramentas dev que mantem snippets locais primeiro.',
    lead: 'Formate, codifique, inspecione e compare trechos comuns sem cadastro obrigatorio ou envio para API de produto.',
    workbenchEyebrow: 'Workbench dev local',
    workbenchTitle: 'Execute um utilitario antes de escolher a pagina.',
    workbenchBody: 'Escolha a ferramenta, carregue o exemplo seguro, veja saida, arvore e erros, depois abra a pagina completa quando precisar de guia.',
    quickToolsTitle: 'Navegacao densa',
    recentToolsTitle: 'Recentes nesta sessao',
    emptyRecentBody: 'Execute uma ferramenta para criar uma lista temporaria em memoria. Nada e salvo.',
    outputViewLabel: 'Saida',
    treeViewLabel: 'Arvore',
    errorViewLabel: 'Erros',
    clearLabel: 'Limpar',
    openFullToolLabel: 'Abrir pagina completa',
    inputMetricsLabel: 'Metricas da entrada',
    resultMetricsLabel: 'Metricas do resultado',
    searchLabel: 'Buscar ferramentas',
    searchPlaceholder: 'Tente JSON, JWT, regex, cron, UUID ou hash',
    categoryLabel: 'Categoria',
    allCategories: 'Todas',
    noResultsTitle: 'Nenhuma ferramenta encontrada',
    noResultsBody: 'Limpe a busca ou escolha outra categoria.',
    freeLabel: 'Resultado gratuito',
    upgradeLabel: 'Caminho de upgrade',
    detailCta: 'Abrir ferramenta',
    localBadgeLabel: 'Roda localmente quando possivel',
    principlesTitle: 'Principios do workbench',
    principles: [
      { title: 'Local por padrao', body: 'O MVP roda transformacoes no navegador e usa Web Worker quando o browser suporta.' },
      { title: 'Sem log de conteudo', body: 'Eventos podem incluir slug e rota, nunca trechos colados ou resultados gerados.' },
      { title: 'Profundidade de workflow', body: 'Valor de upgrade fica em execucoes salvas, workspaces, lotes, arquivos maiores e API.' },
    ],
    statusRows: [
      { title: '9 ferramentas no navegador', body: 'JSON/XML/YAML/CSV, Base64, JWT, regex, diff, cron, UUID, timestamp e hashes.', tone: 'green' },
      { title: '5 conjuntos de idioma', body: 'Paginas em ingles, portugues, espanhol, frances e alemao sao prerenderizadas.', tone: 'green' },
      { title: 'Roda localmente quando possivel', body: 'As ferramentas atuais rodam no Web Worker quando suportado e nao exigem conta para o resultado basico.', tone: 'green' },
    ],
  },
  es: {
    eyebrow: 'DevUtility Lab',
    title: 'Herramientas dev que mantienen fragmentos locales primero.',
    lead: 'Formatea, codifica, inspecciona y compara fragmentos comunes sin registro obligatorio ni API de producto.',
    workbenchEyebrow: 'Workbench dev local',
    workbenchTitle: 'Ejecuta una utilidad antes de elegir pagina.',
    workbenchBody: 'Elige herramienta, carga el ejemplo seguro, revisa salida, arbol y errores, luego abre la pagina completa si necesitas guia.',
    quickToolsTitle: 'Navegacion densa',
    recentToolsTitle: 'Recientes en esta sesion',
    emptyRecentBody: 'Ejecuta una herramienta para crear una lista temporal en memoria. Nada se guarda.',
    outputViewLabel: 'Salida',
    treeViewLabel: 'Arbol',
    errorViewLabel: 'Errores',
    clearLabel: 'Limpiar',
    openFullToolLabel: 'Abrir pagina completa',
    inputMetricsLabel: 'Metricas de entrada',
    resultMetricsLabel: 'Metricas del resultado',
    searchLabel: 'Buscar herramientas',
    searchPlaceholder: 'Prueba JSON, JWT, regex, cron, UUID o hash',
    categoryLabel: 'Categoria',
    allCategories: 'Todas',
    noResultsTitle: 'No hay herramientas',
    noResultsBody: 'Borra la busqueda o elige otra categoria.',
    freeLabel: 'Resultado gratis',
    upgradeLabel: 'Ruta de upgrade',
    detailCta: 'Abrir herramienta',
    localBadgeLabel: 'Corre localmente cuando es posible',
    principlesTitle: 'Principios del workbench',
    principles: [
      { title: 'Local por defecto', body: 'El MVP ejecuta transformaciones en el navegador y usa Web Worker cuando existe soporte.' },
      { title: 'Sin logs de contenido', body: 'Eventos pueden incluir slug y ruta, nunca fragmentos pegados o resultados.' },
      { title: 'Profundidad de workflow', body: 'El valor de upgrade esta en ejecuciones guardadas, workspaces, lotes, archivos mayores y API.' },
    ],
    statusRows: [
      { title: '9 herramientas browser', body: 'JSON/XML/YAML/CSV, Base64, JWT, regex, diff, cron, UUID, timestamp y hashes.', tone: 'green' },
      { title: '5 rutas de idioma', body: 'Paginas en ingles, portugues, espanol, frances y aleman se prerenderizan.', tone: 'green' },
      { title: 'Corre localmente cuando es posible', body: 'Las herramientas actuales corren en Web Worker cuando hay soporte y no exigen cuenta para el resultado basico.', tone: 'green' },
    ],
  },
  fr: {
    eyebrow: 'DevUtility Lab',
    title: 'Outils dev qui gardent les extraits locaux d abord.',
    lead: 'Formatez, encodez, inspectez et comparez des extraits courants sans compte obligatoire ni API produit.',
    workbenchEyebrow: 'Workbench dev local',
    workbenchTitle: 'Lancez un utilitaire avant de choisir une page.',
    workbenchBody: 'Choisissez un outil, chargez l exemple sur, inspectez sortie, arbre et erreurs, puis ouvrez la page complete pour le guide.',
    quickToolsTitle: 'Navigation dense',
    recentToolsTitle: 'Recents dans cette session',
    emptyRecentBody: 'Lancez un outil pour creer une liste temporaire en memoire. Rien n est enregistre.',
    outputViewLabel: 'Sortie',
    treeViewLabel: 'Arbre',
    errorViewLabel: 'Erreurs',
    clearLabel: 'Effacer',
    openFullToolLabel: 'Ouvrir page complete',
    inputMetricsLabel: 'Metriques entree',
    resultMetricsLabel: 'Metriques resultat',
    searchLabel: 'Rechercher',
    searchPlaceholder: 'JSON, JWT, regex, cron, UUID ou hash',
    categoryLabel: 'Categorie',
    allCategories: 'Tous',
    noResultsTitle: 'Aucun outil',
    noResultsBody: 'Effacez la recherche ou choisissez une autre categorie.',
    freeLabel: 'Resultat gratuit',
    upgradeLabel: 'Offre payante',
    detailCta: 'Ouvrir',
    localBadgeLabel: 'Local quand possible',
    principlesTitle: 'Principes du workbench',
    principles: [
      { title: 'Local par defaut', body: 'Le MVP execute les transformations dans le navigateur et utilise un Web Worker si disponible.' },
      { title: 'Pas de log contenu', body: 'Les evenements peuvent inclure slug et chemin, jamais les extraits ou resultats.' },
      { title: 'Profondeur workflow', body: 'La valeur upgrade se trouve dans executions sauvegardees, workspaces, lots, gros fichiers et API.' },
    ],
    statusRows: [
      { title: '9 outils navigateur', body: 'JSON/XML/YAML/CSV, Base64, JWT, regex, diff, cron, UUID, timestamp et hashes.', tone: 'green' },
      { title: '5 routes de langue', body: 'Pages anglaises, portugaises, espagnoles, francaises et allemandes prerenderisees.', tone: 'green' },
      { title: 'Local quand possible', body: 'Les outils actuels tournent en Web Worker si supporte et ne demandent pas de compte pour le resultat de base.', tone: 'green' },
    ],
  },
  de: {
    eyebrow: 'DevUtility Lab',
    title: 'Developer-Tools, die Ausschnitte zuerst lokal halten.',
    lead: 'Formatieren, codieren, pruefen und vergleichen Sie haeufige Entwickler-Ausschnitte ohne Pflichtkonto oder Produkt-API.',
    workbenchEyebrow: 'Lokaler Developer-Workbench',
    workbenchTitle: 'Starten Sie ein Tool vor der Toolseite.',
    workbenchBody: 'Waehlen Sie ein Tool, laden Sie das sichere Beispiel, pruefen Sie Ausgabe, Baum und Fehler und oeffnen Sie danach die volle Seite.',
    quickToolsTitle: 'Dichte Tool-Navigation',
    recentToolsTitle: 'Zuletzt in dieser Sitzung',
    emptyRecentBody: 'Starten Sie ein Tool fuer eine temporaere Liste im Speicher. Nichts wird gespeichert.',
    outputViewLabel: 'Ausgabe',
    treeViewLabel: 'Baum',
    errorViewLabel: 'Fehler',
    clearLabel: 'Leeren',
    openFullToolLabel: 'Volle Toolseite oeffnen',
    inputMetricsLabel: 'Eingabemetriken',
    resultMetricsLabel: 'Ergebnismetriken',
    searchLabel: 'Tools suchen',
    searchPlaceholder: 'JSON, JWT, Regex, Cron, UUID oder Hash',
    categoryLabel: 'Kategorie',
    allCategories: 'Alle Tools',
    noResultsTitle: 'Keine Tools gefunden',
    noResultsBody: 'Leeren Sie die Suche oder waehlen Sie eine andere Kategorie.',
    freeLabel: 'Kostenloses Ergebnis',
    upgradeLabel: 'Upgrade-Pfad',
    detailCta: 'Tool oeffnen',
    localBadgeLabel: 'Lokal wenn moeglich',
    principlesTitle: 'Workbench-Prinzipien',
    principles: [
      { title: 'Lokal zuerst', body: 'Das MVP fuehrt Transformationen im Browser aus und nutzt Web Worker, wenn der Browser es unterstuetzt.' },
      { title: 'Keine Inhaltslogs', body: 'Events duerfen Tool-Slug und Pfad enthalten, nie eingefuegte Ausschnitte oder Ergebnisse.' },
      { title: 'Workflow-Tiefe', body: 'Upgrade-Wert liegt in gespeicherten Laeufen, Workspaces, Stapeln, groesseren Dateien und API.' },
    ],
    statusRows: [
      { title: '9 Browser-Tools', body: 'JSON/XML/YAML/CSV, Base64, JWT, Regex, Diff, Cron, UUID, Timestamp und Hashes.', tone: 'green' },
      { title: '5 Sprachrouten', body: 'Englische, portugiesische, spanische, franzoesische und deutsche Seiten werden prerendered.', tone: 'green' },
      { title: 'Lokal wenn moeglich', body: 'Aktuelle Tools laufen bei Support im Web Worker und brauchen kein Konto fuer das Basisresultat.', tone: 'green' },
    ],
  },
}

export const shellCopy: Record<LocaleCode, ShellCopy> = {
  en: {
    breadcrumbHome: 'DevUtility Lab',
    runLabel: 'Run tool',
    resetLabel: 'Reset example',
    workbenchTitle: 'Local workbench',
    workbenchBody: 'Load the example, edit the snippet and run the transformation in this browser session.',
    inputTitle: 'Inputs',
    resultTitle: 'Result',
    exampleTitle: 'Example preset',
    privacyTitle: 'Privacy boundary',
    emptyResultTitle: 'Ready for a local run',
    emptyResultBody: 'Run the example or paste a redacted snippet. Results appear here and stay in the browser.',
    runningResultTitle: 'Processing locally',
    runningResultBody: 'The workbench is running the tool without sending snippet values to a product API.',
    successResultTitle: 'Result ready',
    successResultBody: 'Review the output before copying or downloading it as a local text file.',
    resultActionsLabel: 'Result actions',
    copyResultLabel: 'Copy result',
    copiedResultLabel: 'Copied',
    copyFailedLabel: 'Copy failed',
    downloadResultLabel: 'Download .txt',
    relatedTitle: 'Related tools',
    relatedBody: 'Move to nearby utilities without leaving the local-first workflow.',
    openRelatedLabel: 'Open',
    guideTitle: 'Guide and privacy',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    freeCheckLabel: 'Free utility',
    upgradePathLabel: 'Upgrade path',
    contentQualityBody: 'This page combines the working utility, privacy boundary, limits, FAQ and review date required before AdSense review.',
    privacyNote: 'The tool runs in this browser session. DevUtility Lab does not store snippets, use localStorage or send values to a product API.',
    invalidResultTitle: 'Check the input',
    pageStatusLabel: 'Tool status',
    liveTitle: 'Client-side MVP',
    liveBody: 'The free utility works without signup and runs in a browser worker when supported.',
    gatedTitle: 'Workflow options',
    gatedBody: 'Saved runs, workspaces, batch jobs, API automation and larger files are reserved for later product depth.',
    gatedItems: ['Saved snippet runs', 'Team workspaces', 'Batch jobs and larger files', 'Developer API', 'Workspace controls'],
  },
  'pt-br': {
    breadcrumbHome: 'DevUtility Lab',
    runLabel: 'Executar',
    resetLabel: 'Restaurar exemplo',
    workbenchTitle: 'Workbench local',
    workbenchBody: 'Carregue o exemplo, edite o snippet e rode a transformacao nesta sessao do navegador.',
    inputTitle: 'Entradas',
    resultTitle: 'Resultado',
    exampleTitle: 'Exemplo pronto',
    privacyTitle: 'Fronteira de privacidade',
    emptyResultTitle: 'Pronto para execucao local',
    emptyResultBody: 'Execute o exemplo ou cole um snippet redigido. O resultado aparece aqui e fica no navegador.',
    runningResultTitle: 'Processando localmente',
    runningResultBody: 'O workbench roda a ferramenta sem enviar valores para API de produto.',
    successResultTitle: 'Resultado pronto',
    successResultBody: 'Revise a saida antes de copiar ou baixar como arquivo texto local.',
    resultActionsLabel: 'Acoes do resultado',
    copyResultLabel: 'Copiar resultado',
    copiedResultLabel: 'Copiado',
    copyFailedLabel: 'Falha ao copiar',
    downloadResultLabel: 'Baixar .txt',
    relatedTitle: 'Ferramentas relacionadas',
    relatedBody: 'Acesse utilitarios proximos sem sair do fluxo local-first.',
    openRelatedLabel: 'Abrir',
    guideTitle: 'Guia e privacidade',
    faqTitle: 'Perguntas frequentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Utilitario gratuito',
    upgradePathLabel: 'Caminho de upgrade',
    contentQualityBody: 'Esta pagina combina utilitario funcional, fronteira de privacidade, limites, FAQ e revisao antes de AdSense.',
    privacyNote: 'A ferramenta roda nesta sessao do navegador. O DevUtility Lab nao armazena snippets, nao usa localStorage e nao envia valores para API.',
    invalidResultTitle: 'Confira a entrada',
    pageStatusLabel: 'Status da ferramenta',
    liveTitle: 'MVP client-side',
    liveBody: 'A ferramenta gratuita funciona sem cadastro e roda em Web Worker quando suportado.',
    gatedTitle: 'Opcoes de workflow',
    gatedBody: 'Execucoes salvas, workspaces, lotes, automacao por API e arquivos maiores ficam para profundidade futura do produto.',
    gatedItems: ['Execucoes salvas de snippets', 'Workspaces de equipe', 'Lotes e arquivos maiores', 'API para desenvolvedores', 'Controles de workspace'],
  },
  es: {
    breadcrumbHome: 'DevUtility Lab',
    runLabel: 'Ejecutar',
    resetLabel: 'Restaurar ejemplo',
    workbenchTitle: 'Workbench local',
    workbenchBody: 'Carga el ejemplo, edita el fragmento y ejecuta la transformacion en esta sesion del navegador.',
    inputTitle: 'Entradas',
    resultTitle: 'Resultado',
    exampleTitle: 'Ejemplo listo',
    privacyTitle: 'Limite de privacidad',
    emptyResultTitle: 'Listo para una ejecucion local',
    emptyResultBody: 'Ejecuta el ejemplo o pega un fragmento redactado. El resultado aparece aqui y queda en el navegador.',
    runningResultTitle: 'Procesando localmente',
    runningResultBody: 'El workbench ejecuta la herramienta sin enviar valores a una API de producto.',
    successResultTitle: 'Resultado listo',
    successResultBody: 'Revisa la salida antes de copiarla o descargarla como texto local.',
    resultActionsLabel: 'Acciones del resultado',
    copyResultLabel: 'Copiar resultado',
    copiedResultLabel: 'Copiado',
    copyFailedLabel: 'Error al copiar',
    downloadResultLabel: 'Descargar .txt',
    relatedTitle: 'Herramientas relacionadas',
    relatedBody: 'Salta a utilidades cercanas sin salir del flujo local-first.',
    openRelatedLabel: 'Abrir',
    guideTitle: 'Guia y privacidad',
    faqTitle: 'Preguntas frecuentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Utilidad gratis',
    upgradePathLabel: 'Ruta de upgrade',
    contentQualityBody: 'Esta pagina combina utilidad funcional, privacidad, limites, FAQ y revision antes de AdSense.',
    privacyNote: 'La herramienta corre en esta sesion del navegador. DevUtility Lab no almacena fragmentos, no usa localStorage y no envia valores a una API.',
    invalidResultTitle: 'Revisa la entrada',
    pageStatusLabel: 'Estado de herramienta',
    liveTitle: 'MVP client-side',
    liveBody: 'La utilidad gratis funciona sin registro y corre en Web Worker cuando hay soporte.',
    gatedTitle: 'Opciones de workflow',
    gatedBody: 'Ejecuciones guardadas, workspaces, lotes, automatizacion por API y archivos mayores quedan para profundidad futura del producto.',
    gatedItems: ['Ejecuciones guardadas de fragmentos', 'Workspaces de equipo', 'Lotes y archivos mayores', 'API para desarrolladores', 'Controles de workspace'],
  },
  fr: {
    breadcrumbHome: 'DevUtility Lab',
    runLabel: 'Executer',
    resetLabel: 'Restaurer exemple',
    workbenchTitle: 'Workbench local',
    workbenchBody: 'Chargez l exemple, modifiez l extrait et lancez la transformation dans cette session navigateur.',
    inputTitle: 'Entrees',
    resultTitle: 'Resultat',
    exampleTitle: 'Exemple pret',
    privacyTitle: 'Limite de confidentialite',
    emptyResultTitle: 'Pret pour une execution locale',
    emptyResultBody: 'Lancez l exemple ou collez un extrait masque. Le resultat apparait ici et reste dans le navigateur.',
    runningResultTitle: 'Traitement local',
    runningResultBody: 'Le workbench execute l outil sans envoyer les valeurs a une API produit.',
    successResultTitle: 'Resultat pret',
    successResultBody: 'Verifiez la sortie avant de la copier ou de la telecharger en texte local.',
    resultActionsLabel: 'Actions resultat',
    copyResultLabel: 'Copier resultat',
    copiedResultLabel: 'Copie',
    copyFailedLabel: 'Copie impossible',
    downloadResultLabel: 'Telecharger .txt',
    relatedTitle: 'Outils lies',
    relatedBody: 'Passez aux utilitaires proches sans quitter le flux local-first.',
    openRelatedLabel: 'Ouvrir',
    guideTitle: 'Guide et confidentialite',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    freeCheckLabel: 'Utilitaire gratuit',
    upgradePathLabel: 'Offre payante',
    contentQualityBody: 'Cette page combine outil fonctionnel, confidentialite, limites, FAQ et date de revue avant AdSense.',
    privacyNote: 'L outil s execute dans cette session du navigateur. DevUtility Lab ne stocke pas les extraits, n utilise pas localStorage et n envoie pas de valeurs a une API.',
    invalidResultTitle: 'Verifiez l entree',
    pageStatusLabel: 'Statut outil',
    liveTitle: 'MVP client-side',
    liveBody: 'L utilitaire gratuit fonctionne sans compte et s execute en Web Worker si supporte.',
    gatedTitle: 'Options workflow',
    gatedBody: 'Executions sauvegardees, workspaces, lots, automatisation API et gros fichiers restent pour une profondeur produit future.',
    gatedItems: ['Executions sauvegardees des extraits', 'Workspaces equipe', 'Lots et gros fichiers', 'API developpeur', 'Controles de workspace'],
  },
  de: {
    breadcrumbHome: 'DevUtility Lab',
    runLabel: 'Ausfuehren',
    resetLabel: 'Beispiel zuruecksetzen',
    workbenchTitle: 'Lokaler Workbench',
    workbenchBody: 'Laden Sie das Beispiel, bearbeiten Sie den Ausschnitt und starten Sie die Umwandlung in dieser Browser-Sitzung.',
    inputTitle: 'Eingaben',
    resultTitle: 'Ergebnis',
    exampleTitle: 'Beispielvorlage',
    privacyTitle: 'Datenschutzgrenze',
    emptyResultTitle: 'Bereit fuer lokale Ausfuehrung',
    emptyResultBody: 'Starten Sie das Beispiel oder fuegen Sie einen geschwaerzten Ausschnitt ein. Ergebnisse bleiben im Browser.',
    runningResultTitle: 'Lokale Verarbeitung',
    runningResultBody: 'Der Workbench fuehrt das Tool aus, ohne Werte an eine Produkt-API zu senden.',
    successResultTitle: 'Ergebnis bereit',
    successResultBody: 'Pruefen Sie die Ausgabe vor dem Kopieren oder lokalen Text-Download.',
    resultActionsLabel: 'Ergebnisaktionen',
    copyResultLabel: 'Ergebnis kopieren',
    copiedResultLabel: 'Kopiert',
    copyFailedLabel: 'Kopieren fehlgeschlagen',
    downloadResultLabel: '.txt laden',
    relatedTitle: 'Verwandte Tools',
    relatedBody: 'Wechseln Sie zu nahen Tools, ohne den lokal-zuerst Ablauf zu verlassen.',
    openRelatedLabel: 'Oeffnen',
    guideTitle: 'Leitfaden und Datenschutz',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    freeCheckLabel: 'Kostenloses Tool',
    upgradePathLabel: 'Upgrade-Pfad',
    contentQualityBody: 'Diese Seite kombiniert funktionierendes Tool, Datenschutzgrenze, Limits, FAQ und Pruefdatum vor AdSense.',
    privacyNote: 'Das Tool laeuft in dieser Browser-Sitzung. DevUtility Lab speichert keine Ausschnitte, nutzt kein localStorage und sendet keine Werte an eine API.',
    invalidResultTitle: 'Eingabe pruefen',
    pageStatusLabel: 'Toolstatus',
    liveTitle: 'Client-seitiges MVP',
    liveBody: 'Das kostenlose Tool funktioniert ohne Konto und laeuft bei Support in einem Web Worker.',
    gatedTitle: 'Workflow-Optionen',
    gatedBody: 'Gespeicherte Laeufe, Workspaces, Stapel, API-Automation und groessere Dateien bleiben spaeterer Produkttiefe vorbehalten.',
    gatedItems: ['Gespeicherte Ausschnittlaeufe', 'Team-Workspaces', 'Stapel und groessere Dateien', 'Developer API', 'Workspace-Kontrollen'],
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return sanitizePublicCopy(locale, homeCopy[locale])
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return sanitizePublicCopy(locale, shellCopy[locale])
}
