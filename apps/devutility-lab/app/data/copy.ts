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
    workbenchEyebrow: 'Local developer tools',
    workbenchTitle: 'Run a utility before choosing a tool page.',
    workbenchBody: 'Pick a tool, load the safe example, inspect output, tree view and errors, then continue to the full page when you need guidance.',
    quickToolsTitle: 'Dense tool navigation',
    recentToolsTitle: 'Recent in this session',
    emptyRecentBody: 'Run a tool to build an in-session recent list. Nothing is saved.',
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
    principlesTitle: 'Tool principles',
    principles: [
      { title: 'Local by default', body: 'The tools run transformations in the browser and use local processing when supported.' },
      { title: 'No content logging', body: 'Analytics events may include the tool slug and page path, never pasted snippets or generated results.' },
      { title: 'Account options', body: 'Advanced features belong in saved runs, team areas, batch jobs, larger files and API automation.' },
    ],
    statusRows: [
      { title: '9 browser tools', body: 'JSON/XML/YAML/CSV, Base64, JWT, regex, diff, cron, UUID, timestamp and hashes.', tone: 'green' },
      { title: '5 language route sets', body: 'English, Portuguese, Spanish, French and German pages are prerendered.', tone: 'green' },
      { title: 'Runs locally when possible', body: 'Current tools use browser processing when supported and need no account for the basic result.', tone: 'green' },
    ],
  },
  'pt-br': {
    eyebrow: 'DevUtility Lab',
    title: 'Ferramentas dev que mantem snippets locais primeiro.',
    lead: 'Formate, codifique, inspecione e compare trechos comuns sem cadastro obrigatorio ou envio para API de produto.',
    workbenchEyebrow: 'Ferramentas dev locais',
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
    principlesTitle: 'Principios das ferramentas',
    principles: [
      { title: 'Local por padrao', body: 'As ferramentas rodam transformacoes no navegador e usam processamento local quando suportado.' },
      { title: 'Sem log de conteudo', body: 'Eventos podem incluir slug e rota, nunca trechos colados ou resultados gerados.' },
      { title: 'Opcoes de conta', body: 'Valor de upgrade fica em execucoes salvas, areas de equipe, lotes, arquivos maiores e API.' },
    ],
    statusRows: [
      { title: '9 ferramentas no navegador', body: 'JSON/XML/YAML/CSV, Base64, JWT, regex, diff, cron, UUID, timestamp e hashes.', tone: 'green' },
      { title: '5 conjuntos de idioma', body: 'Paginas em ingles, portugues, espanhol, frances e alemao sao prerenderizadas.', tone: 'green' },
      { title: 'Roda localmente quando possivel', body: 'As ferramentas atuais usam processamento local quando suportado e nao exigem conta para o resultado basico.', tone: 'green' },
    ],
  },
  es: {
    eyebrow: 'DevUtility Lab',
    title: 'Herramientas dev que mantienen fragmentos locales primero.',
    lead: 'Formatea, codifica, inspecciona y compara fragmentos comunes sin registro obligatorio ni API de producto.',
    workbenchEyebrow: 'Herramientas dev locales',
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
    principlesTitle: 'Principios de herramientas',
    principles: [
      { title: 'Local por defecto', body: 'Las herramientas ejecutan transformaciones en el navegador y usan procesamiento local cuando existe soporte.' },
      { title: 'Sin logs de contenido', body: 'Eventos pueden incluir slug y ruta, nunca fragmentos pegados o resultados.' },
      { title: 'Opciones de cuenta', body: 'El valor de upgrade esta en ejecuciones guardadas, espacios de equipo, lotes, archivos mayores y API.' },
    ],
    statusRows: [
      { title: '9 herramientas browser', body: 'JSON/XML/YAML/CSV, Base64, JWT, regex, diff, cron, UUID, timestamp y hashes.', tone: 'green' },
      { title: '5 rutas de idioma', body: 'Paginas en ingles, portugues, espanol, frances y aleman se prerenderizan.', tone: 'green' },
      { title: 'Corre localmente cuando es posible', body: 'Las herramientas actuales usan procesamiento local cuando hay soporte y no exigen cuenta para el resultado basico.', tone: 'green' },
    ],
  },
  fr: {
    eyebrow: 'DevUtility Lab',
    title: 'Outils dev qui gardent les extraits locaux d abord.',
    lead: 'Formatez, encodez, inspectez et comparez des extraits courants sans compte obligatoire ni API produit.',
    workbenchEyebrow: 'Outils dev locaux',
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
    principlesTitle: 'Principes des outils',
    principles: [
      { title: 'Local par defaut', body: 'Les outils executent les transformations dans le navigateur et utilisent un traitement local si disponible.' },
      { title: 'Pas de log contenu', body: 'Les evenements peuvent inclure slug et chemin, jamais les extraits ou resultats.' },
      { title: 'Options de compte', body: 'La valeur upgrade se trouve dans executions sauvegardees, espaces equipe, lots, gros fichiers et API.' },
    ],
    statusRows: [
      { title: '9 outils navigateur', body: 'JSON/XML/YAML/CSV, Base64, JWT, regex, diff, cron, UUID, timestamp et hashes.', tone: 'green' },
      { title: '5 routes de langue', body: 'Pages anglaises, portugaises, espagnoles, francaises et allemandes prerenderisees.', tone: 'green' },
      { title: 'Local quand possible', body: 'Les outils actuels utilisent un traitement local si supporte et ne demandent pas de compte pour le resultat de base.', tone: 'green' },
    ],
  },
  de: {
    eyebrow: 'DevUtility Lab',
    title: 'Developer-Tools, die Ausschnitte zuerst lokal halten.',
    lead: 'Formatieren, codieren, pruefen und vergleichen Sie haeufige Entwickler-Ausschnitte ohne Pflichtkonto oder Produkt-API.',
    workbenchEyebrow: 'Lokale Developer-Tools',
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
    principlesTitle: 'Tool-Prinzipien',
    principles: [
      { title: 'Lokal zuerst', body: 'Die Tools fuehren Transformationen im Browser aus und nutzen lokale Verarbeitung, wenn moeglich.' },
      { title: 'Keine Inhaltslogs', body: 'Events duerfen Tool-Slug und Pfad enthalten, nie eingefuegte Ausschnitte oder Ergebnisse.' },
      { title: 'Kontooptionen', body: 'Upgrade-Wert liegt in gespeicherten Laeufen, Team-Bereichen, Stapeln, groesseren Dateien und API.' },
    ],
    statusRows: [
      { title: '9 Browser-Tools', body: 'JSON/XML/YAML/CSV, Base64, JWT, Regex, Diff, Cron, UUID, Timestamp und Hashes.', tone: 'green' },
      { title: '5 Sprachrouten', body: 'Englische, portugiesische, spanische, franzoesische und deutsche Seiten werden prerendered.', tone: 'green' },
      { title: 'Lokal wenn moeglich', body: 'Aktuelle Tools nutzen lokale Verarbeitung, wenn moeglich, und brauchen kein Konto fuer das Basisresultat.', tone: 'green' },
    ],
  },
}

export const shellCopy: Record<LocaleCode, ShellCopy> = {
  en: {
    breadcrumbHome: 'DevUtility Lab',
    runLabel: 'Run tool',
    resetLabel: 'Reset example',
    workbenchTitle: 'Local tool',
    workbenchBody: 'Load the example, edit the snippet and run the transformation in this browser session.',
    inputTitle: 'Inputs',
    resultTitle: 'Result',
    exampleTitle: 'Example preset',
    privacyTitle: 'Privacy boundary',
    emptyResultTitle: 'Ready for a local run',
    emptyResultBody: 'Run the example or paste a redacted snippet. Results appear here and stay in the browser.',
    runningResultTitle: 'Processing locally',
    runningResultBody: 'The tool is running without sending snippet values to a product API.',
    successResultTitle: 'Result ready',
    successResultBody: 'Review the output before copying or downloading it as a local text file.',
    resultActionsLabel: 'Result actions',
    copyResultLabel: 'Copy result',
    copiedResultLabel: 'Copied',
    copyFailedLabel: 'Copy failed',
    downloadResultLabel: 'Download .txt',
    relatedTitle: 'Related tools',
    relatedBody: 'Move to nearby utilities without leaving the local-first tool set.',
    openRelatedLabel: 'Open',
    guideTitle: 'Guide and privacy',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    freeCheckLabel: 'Free utility',
    upgradePathLabel: 'Upgrade path',
    contentQualityBody: 'Use the utility, review validation messages and avoid pasting secrets into any web page.',
    privacyNote: 'The tool runs in this browser session. DevUtility Lab does not store snippets, use localStorage or send values to a product API.',
    invalidResultTitle: 'Check the input',
    pageStatusLabel: 'Tool status',
    liveTitle: 'Browser utility',
    liveBody: 'The free utility works without signup and uses browser processing when supported.',
    gatedTitle: 'Optional account features',
    gatedBody: 'Saved runs, team areas, batch jobs, API automation and larger files are reserved for later product depth.',
    gatedItems: ['Saved snippet runs', 'Team areas', 'Batch jobs and larger files', 'Developer API', 'Team controls'],
  },
  'pt-br': {
    breadcrumbHome: 'DevUtility Lab',
    runLabel: 'Executar',
    resetLabel: 'Restaurar exemplo',
    workbenchTitle: 'Ferramenta local',
    workbenchBody: 'Carregue o exemplo, edite o snippet e rode a transformacao nesta sessao do navegador.',
    inputTitle: 'Entradas',
    resultTitle: 'Resultado',
    exampleTitle: 'Exemplo pronto',
    privacyTitle: 'Fronteira de privacidade',
    emptyResultTitle: 'Pronto para execucao local',
    emptyResultBody: 'Execute o exemplo ou cole um snippet redigido. O resultado aparece aqui e fica no navegador.',
    runningResultTitle: 'Processando localmente',
    runningResultBody: 'A ferramenta roda sem enviar valores para API de produto.',
    successResultTitle: 'Resultado pronto',
    successResultBody: 'Revise a saida antes de copiar ou baixar como arquivo texto local.',
    resultActionsLabel: 'Acoes do resultado',
    copyResultLabel: 'Copiar resultado',
    copiedResultLabel: 'Copiado',
    copyFailedLabel: 'Falha ao copiar',
    downloadResultLabel: 'Baixar .txt',
    relatedTitle: 'Ferramentas relacionadas',
    relatedBody: 'Acesse utilitarios proximos sem sair do conjunto local.',
    openRelatedLabel: 'Abrir',
    guideTitle: 'Guia e privacidade',
    faqTitle: 'Perguntas frequentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Utilitario gratuito',
    upgradePathLabel: 'Caminho de upgrade',
    contentQualityBody: 'Use a utilidade, revise mensagens de validação e evite colar segredos em qualquer página web.',
    privacyNote: 'A ferramenta roda nesta sessao do navegador. O DevUtility Lab nao armazena snippets, nao usa localStorage e nao envia valores para API.',
    invalidResultTitle: 'Confira a entrada',
    pageStatusLabel: 'Status da ferramenta',
    liveTitle: 'Ferramenta no navegador',
    liveBody: 'A ferramenta gratuita funciona sem cadastro e usa processamento local quando suportado.',
    gatedTitle: 'Opcoes de conta',
    gatedBody: 'Execucoes salvas, areas de equipe, lotes, automacao por API e arquivos maiores ficam para profundidade futura do produto.',
    gatedItems: ['Execucoes salvas de snippets', 'Areas de equipe', 'Lotes e arquivos maiores', 'API para desenvolvedores', 'Controles de equipe'],
  },
  es: {
    breadcrumbHome: 'DevUtility Lab',
    runLabel: 'Ejecutar',
    resetLabel: 'Restaurar ejemplo',
    workbenchTitle: 'Herramienta local',
    workbenchBody: 'Carga el ejemplo, edita el fragmento y ejecuta la transformacion en esta sesion del navegador.',
    inputTitle: 'Entradas',
    resultTitle: 'Resultado',
    exampleTitle: 'Ejemplo listo',
    privacyTitle: 'Limite de privacidad',
    emptyResultTitle: 'Listo para una ejecucion local',
    emptyResultBody: 'Ejecuta el ejemplo o pega un fragmento redactado. El resultado aparece aqui y queda en el navegador.',
    runningResultTitle: 'Procesando localmente',
    runningResultBody: 'La herramienta se ejecuta sin enviar valores a una API de producto.',
    successResultTitle: 'Resultado listo',
    successResultBody: 'Revisa la salida antes de copiarla o descargarla como texto local.',
    resultActionsLabel: 'Acciones del resultado',
    copyResultLabel: 'Copiar resultado',
    copiedResultLabel: 'Copiado',
    copyFailedLabel: 'Error al copiar',
    downloadResultLabel: 'Descargar .txt',
    relatedTitle: 'Herramientas relacionadas',
    relatedBody: 'Salta a utilidades cercanas sin salir del conjunto local.',
    openRelatedLabel: 'Abrir',
    guideTitle: 'Guia y privacidad',
    faqTitle: 'Preguntas frecuentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Utilidad gratis',
    upgradePathLabel: 'Ruta de upgrade',
    contentQualityBody: 'Usa la utilidad, revisa validaciones y evita pegar secretos en cualquier página web.',
    privacyNote: 'La herramienta corre en esta sesion del navegador. DevUtility Lab no almacena fragmentos, no usa localStorage y no envia valores a una API.',
    invalidResultTitle: 'Revisa la entrada',
    pageStatusLabel: 'Estado de herramienta',
    liveTitle: 'Herramienta en navegador',
    liveBody: 'La utilidad gratis funciona sin registro y usa procesamiento local cuando hay soporte.',
    gatedTitle: 'Opciones de cuenta',
    gatedBody: 'Ejecuciones guardadas, espacios de equipo, lotes, automatizacion por API y archivos mayores quedan para profundidad futura del producto.',
    gatedItems: ['Ejecuciones guardadas de fragmentos', 'Espacios de equipo', 'Lotes y archivos mayores', 'API para desarrolladores', 'Controles de equipo'],
  },
  fr: {
    breadcrumbHome: 'DevUtility Lab',
    runLabel: 'Executer',
    resetLabel: 'Restaurer exemple',
    workbenchTitle: 'Outil local',
    workbenchBody: 'Chargez l exemple, modifiez l extrait et lancez la transformation dans cette session navigateur.',
    inputTitle: 'Entrees',
    resultTitle: 'Resultat',
    exampleTitle: 'Exemple pret',
    privacyTitle: 'Limite de confidentialite',
    emptyResultTitle: 'Pret pour une execution locale',
    emptyResultBody: 'Lancez l exemple ou collez un extrait masque. Le resultat apparait ici et reste dans le navigateur.',
    runningResultTitle: 'Traitement local',
    runningResultBody: 'L outil s execute sans envoyer les valeurs a une API produit.',
    successResultTitle: 'Resultat pret',
    successResultBody: 'Verifiez la sortie avant de la copier ou de la telecharger en texte local.',
    resultActionsLabel: 'Actions resultat',
    copyResultLabel: 'Copier resultat',
    copiedResultLabel: 'Copie',
    copyFailedLabel: 'Copie impossible',
    downloadResultLabel: 'Telecharger .txt',
    relatedTitle: 'Outils lies',
    relatedBody: 'Passez aux utilitaires proches sans quitter l ensemble local.',
    openRelatedLabel: 'Ouvrir',
    guideTitle: 'Guide et confidentialite',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    freeCheckLabel: 'Utilitaire gratuit',
    upgradePathLabel: 'Offre payante',
    contentQualityBody: 'Utilisez l outil, vérifiez les validations et évitez de coller des secrets sur une page web.',
    privacyNote: 'L outil s execute dans cette session du navigateur. DevUtility Lab ne stocke pas les extraits, n utilise pas localStorage et n envoie pas de valeurs a une API.',
    invalidResultTitle: 'Verifiez l entree',
    pageStatusLabel: 'Statut outil',
    liveTitle: 'Outil navigateur',
    liveBody: 'L utilitaire gratuit fonctionne sans compte et utilise un traitement local si supporte.',
    gatedTitle: 'Options de compte',
    gatedBody: 'Executions sauvegardees, espaces equipe, lots, automatisation API et gros fichiers restent pour une profondeur produit future.',
    gatedItems: ['Executions sauvegardees des extraits', 'Espaces equipe', 'Lots et gros fichiers', 'API developpeur', 'Controles equipe'],
  },
  de: {
    breadcrumbHome: 'DevUtility Lab',
    runLabel: 'Ausfuehren',
    resetLabel: 'Beispiel zuruecksetzen',
    workbenchTitle: 'Lokales Tool',
    workbenchBody: 'Laden Sie das Beispiel, bearbeiten Sie den Ausschnitt und starten Sie die Umwandlung in dieser Browser-Sitzung.',
    inputTitle: 'Eingaben',
    resultTitle: 'Ergebnis',
    exampleTitle: 'Beispielvorlage',
    privacyTitle: 'Datenschutzgrenze',
    emptyResultTitle: 'Bereit fuer lokale Ausfuehrung',
    emptyResultBody: 'Starten Sie das Beispiel oder fuegen Sie einen geschwaerzten Ausschnitt ein. Ergebnisse bleiben im Browser.',
    runningResultTitle: 'Lokale Verarbeitung',
    runningResultBody: 'Das Tool laeuft, ohne Werte an eine Produkt-API zu senden.',
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
    contentQualityBody: 'Nutzen Sie das Tool, prüfen Sie Validierungen und fügen Sie keine Geheimnisse in Webseiten ein.',
    privacyNote: 'Das Tool laeuft in dieser Browser-Sitzung. DevUtility Lab speichert keine Ausschnitte, nutzt kein localStorage und sendet keine Werte an eine API.',
    invalidResultTitle: 'Eingabe pruefen',
    pageStatusLabel: 'Toolstatus',
    liveTitle: 'Browser-Tool',
    liveBody: 'Das kostenlose Tool funktioniert ohne Konto und nutzt lokale Verarbeitung, wenn moeglich.',
    gatedTitle: 'Kontooptionen',
    gatedBody: 'Gespeicherte Laeufe, Team-Bereiche, Stapel, API-Automation und groessere Dateien bleiben spaeterer Produkttiefe vorbehalten.',
    gatedItems: ['Gespeicherte Ausschnittlaeufe', 'Team-Bereiche', 'Stapel und groessere Dateien', 'Developer API', 'Team-Kontrollen'],
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return sanitizePublicCopy(locale, homeCopy[locale])
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return sanitizePublicCopy(locale, shellCopy[locale])
}
