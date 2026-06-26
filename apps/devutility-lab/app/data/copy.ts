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
}

export const homeCopy: Record<LocaleCode, HomeCopy> = {
  en: {
    eyebrow: 'DevUtility Lab',
    title: 'Developer utilities that keep snippets local first.',
    lead: 'Format, encode, inspect and compare common developer snippets without mandatory signup or product API transfer.',
    searchLabel: 'Search tools',
    searchPlaceholder: 'Try JSON, JWT, regex, cron, UUID or hash',
    categoryLabel: 'Category',
    allCategories: 'All tools',
    noResultsTitle: 'No tools matched',
    noResultsBody: 'Clear the search or choose another category.',
    freeLabel: 'Free result',
    upgradeLabel: 'Upgrade path',
    detailCta: 'Open tool',
    principlesTitle: 'Sprint 3.2 principles',
    principles: [
      { title: 'Local by default', body: 'The MVP runs transformations in the browser and uses a Web Worker when the browser supports it.' },
      { title: 'No content logging', body: 'Analytics events may include the tool slug and page path, never pasted snippets or generated results.' },
      { title: 'Paid value adds workflow', body: 'Upgrades are for private history, workspaces, batch jobs, larger files, API and no ads.' },
    ],
    statusRows: [
      { title: '9 browser tools', body: 'JSON/XML/YAML/CSV, Base64, JWT, regex, diff, cron, UUID, timestamp and hashes.', tone: 'green' },
      { title: '5 language route sets', body: 'English, Portuguese, Spanish, French and German pages are prerendered.', tone: 'green' },
      { title: 'No storage or logging', body: 'Accounts, history, billing, ads and external analytics remain gated.', tone: 'amber' },
    ],
  },
  'pt-br': {
    eyebrow: 'DevUtility Lab',
    title: 'Ferramentas dev que mantem snippets locais primeiro.',
    lead: 'Formate, codifique, inspecione e compare trechos comuns sem cadastro obrigatorio ou envio para API de produto.',
    searchLabel: 'Buscar ferramentas',
    searchPlaceholder: 'Tente JSON, JWT, regex, cron, UUID ou hash',
    categoryLabel: 'Categoria',
    allCategories: 'Todas',
    noResultsTitle: 'Nenhuma ferramenta encontrada',
    noResultsBody: 'Limpe a busca ou escolha outra categoria.',
    freeLabel: 'Resultado gratuito',
    upgradeLabel: 'Caminho de upgrade',
    detailCta: 'Abrir ferramenta',
    principlesTitle: 'Principios da Sprint 3.2',
    principles: [
      { title: 'Local por padrao', body: 'O MVP roda transformacoes no navegador e usa Web Worker quando o browser suporta.' },
      { title: 'Sem log de conteudo', body: 'Eventos podem incluir slug e rota, nunca trechos colados ou resultados gerados.' },
      { title: 'Upgrade e workflow', body: 'Planos pagos vendem historico privado, workspaces, lotes, arquivos maiores, API e ausencia de anuncios.' },
    ],
    statusRows: [
      { title: '9 ferramentas no navegador', body: 'JSON/XML/YAML/CSV, Base64, JWT, regex, diff, cron, UUID, timestamp e hashes.', tone: 'green' },
      { title: '5 conjuntos de idioma', body: 'Paginas em ingles, portugues, espanhol, frances e alemao sao prerenderizadas.', tone: 'green' },
      { title: 'Sem storage ou logs', body: 'Contas, historico, billing, ads e analytics externo seguem bloqueados.', tone: 'amber' },
    ],
  },
  es: {
    eyebrow: 'DevUtility Lab',
    title: 'Herramientas dev que mantienen fragmentos locales primero.',
    lead: 'Formatea, codifica, inspecciona y compara fragmentos comunes sin registro obligatorio ni API de producto.',
    searchLabel: 'Buscar herramientas',
    searchPlaceholder: 'Prueba JSON, JWT, regex, cron, UUID o hash',
    categoryLabel: 'Categoria',
    allCategories: 'Todas',
    noResultsTitle: 'No hay herramientas',
    noResultsBody: 'Borra la busqueda o elige otra categoria.',
    freeLabel: 'Resultado gratis',
    upgradeLabel: 'Ruta de upgrade',
    detailCta: 'Abrir herramienta',
    principlesTitle: 'Principios Sprint 3.2',
    principles: [
      { title: 'Local por defecto', body: 'El MVP ejecuta transformaciones en el navegador y usa Web Worker cuando existe soporte.' },
      { title: 'Sin logs de contenido', body: 'Eventos pueden incluir slug y ruta, nunca fragmentos pegados o resultados.' },
      { title: 'Upgrade como workflow', body: 'Planes pagos agregan historial privado, workspaces, lotes, archivos mayores, API y sin anuncios.' },
    ],
    statusRows: [
      { title: '9 herramientas browser', body: 'JSON/XML/YAML/CSV, Base64, JWT, regex, diff, cron, UUID, timestamp y hashes.', tone: 'green' },
      { title: '5 rutas de idioma', body: 'Paginas en ingles, portugues, espanol, frances y aleman se prerenderizan.', tone: 'green' },
      { title: 'Sin storage ni logs', body: 'Cuentas, historial, billing, ads y analytics externo siguen bloqueados.', tone: 'amber' },
    ],
  },
  fr: {
    eyebrow: 'DevUtility Lab',
    title: 'Outils dev qui gardent les extraits locaux d abord.',
    lead: 'Formatez, encodez, inspectez et comparez des extraits courants sans compte obligatoire ni API produit.',
    searchLabel: 'Rechercher',
    searchPlaceholder: 'JSON, JWT, regex, cron, UUID ou hash',
    categoryLabel: 'Categorie',
    allCategories: 'Tous',
    noResultsTitle: 'Aucun outil',
    noResultsBody: 'Effacez la recherche ou choisissez une autre categorie.',
    freeLabel: 'Resultat gratuit',
    upgradeLabel: 'Offre payante',
    detailCta: 'Ouvrir',
    principlesTitle: 'Principes Sprint 3.2',
    principles: [
      { title: 'Local par defaut', body: 'Le MVP execute les transformations dans le navigateur et utilise un Web Worker si disponible.' },
      { title: 'Pas de log contenu', body: 'Les evenements peuvent inclure slug et chemin, jamais les extraits ou resultats.' },
      { title: 'Upgrade workflow', body: 'Les offres payantes ajoutent historique prive, workspaces, lots, gros fichiers, API et absence de publicite.' },
    ],
    statusRows: [
      { title: '9 outils navigateur', body: 'JSON/XML/YAML/CSV, Base64, JWT, regex, diff, cron, UUID, timestamp et hashes.', tone: 'green' },
      { title: '5 routes de langue', body: 'Pages anglaises, portugaises, espagnoles, francaises et allemandes prerenderisees.', tone: 'green' },
      { title: 'Pas de stockage ni logs', body: 'Comptes, historique, billing, ads et analytics externe restent bloques.', tone: 'amber' },
    ],
  },
  de: {
    eyebrow: 'DevUtility Lab',
    title: 'Developer-Tools, die Ausschnitte zuerst lokal halten.',
    lead: 'Formatieren, codieren, pruefen und vergleichen Sie haeufige Entwickler-Ausschnitte ohne Pflichtkonto oder Produkt-API.',
    searchLabel: 'Tools suchen',
    searchPlaceholder: 'JSON, JWT, Regex, Cron, UUID oder Hash',
    categoryLabel: 'Kategorie',
    allCategories: 'Alle Tools',
    noResultsTitle: 'Keine Tools gefunden',
    noResultsBody: 'Leeren Sie die Suche oder waehlen Sie eine andere Kategorie.',
    freeLabel: 'Kostenloses Ergebnis',
    upgradeLabel: 'Upgrade-Pfad',
    detailCta: 'Tool oeffnen',
    principlesTitle: 'Sprint-3.2-Prinzipien',
    principles: [
      { title: 'Lokal zuerst', body: 'Das MVP fuehrt Transformationen im Browser aus und nutzt Web Worker, wenn der Browser es unterstuetzt.' },
      { title: 'Keine Inhaltslogs', body: 'Events duerfen Tool-Slug und Pfad enthalten, nie eingefuegte Ausschnitte oder Ergebnisse.' },
      { title: 'Bezahlwert ist Workflow', body: 'Upgrades sind privater Verlauf, Workspaces, Stapel, groessere Dateien, API und keine Anzeigen.' },
    ],
    statusRows: [
      { title: '9 Browser-Tools', body: 'JSON/XML/YAML/CSV, Base64, JWT, Regex, Diff, Cron, UUID, Timestamp und Hashes.', tone: 'green' },
      { title: '5 Sprachrouten', body: 'Englische, portugiesische, spanische, franzoesische und deutsche Seiten werden prerendered.', tone: 'green' },
      { title: 'Kein Storage oder Logging', body: 'Konten, Verlauf, Billing, Ads und externe Analytics bleiben gesperrt.', tone: 'amber' },
    ],
  },
}

export const shellCopy: Record<LocaleCode, ShellCopy> = {
  en: {
    breadcrumbHome: 'DevUtility Lab',
    runLabel: 'Run tool',
    resetLabel: 'Reset example',
    inputTitle: 'Inputs',
    resultTitle: 'Result',
    guideTitle: 'Guide and privacy',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    freeCheckLabel: 'Free utility',
    upgradePathLabel: 'Upgrade path',
    contentQualityBody: 'This page combines the working utility, privacy boundary, limits, FAQ and review date required before AdSense review.',
    privacyNote: 'The tool runs in this browser session. DevUtility Lab does not store snippets, use localStorage or send values to a product API in Sprint 3.2.',
    invalidResultTitle: 'Check the input',
    pageStatusLabel: 'Tool status',
    liveTitle: 'Client-side MVP',
    liveBody: 'The free utility works without signup and runs in a browser worker when supported.',
    gatedTitle: 'Commercial features gated',
    gatedBody: 'Private history, workspaces, batch jobs, API, billing and ads are not active yet.',
  },
  'pt-br': {
    breadcrumbHome: 'DevUtility Lab',
    runLabel: 'Executar',
    resetLabel: 'Restaurar exemplo',
    inputTitle: 'Entradas',
    resultTitle: 'Resultado',
    guideTitle: 'Guia e privacidade',
    faqTitle: 'Perguntas frequentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Utilitario gratuito',
    upgradePathLabel: 'Caminho de upgrade',
    contentQualityBody: 'Esta pagina combina utilitario funcional, fronteira de privacidade, limites, FAQ e revisao antes de AdSense.',
    privacyNote: 'A ferramenta roda nesta sessao do navegador. O DevUtility Lab nao armazena snippets, nao usa localStorage e nao envia valores para API na Sprint 3.2.',
    invalidResultTitle: 'Confira a entrada',
    pageStatusLabel: 'Status da ferramenta',
    liveTitle: 'MVP client-side',
    liveBody: 'A ferramenta gratuita funciona sem cadastro e roda em Web Worker quando suportado.',
    gatedTitle: 'Recursos comerciais bloqueados',
    gatedBody: 'Historico privado, workspaces, lotes, API, billing e anuncios ainda nao estao ativos.',
  },
  es: {
    breadcrumbHome: 'DevUtility Lab',
    runLabel: 'Ejecutar',
    resetLabel: 'Restaurar ejemplo',
    inputTitle: 'Entradas',
    resultTitle: 'Resultado',
    guideTitle: 'Guia y privacidad',
    faqTitle: 'Preguntas frecuentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Utilidad gratis',
    upgradePathLabel: 'Ruta de upgrade',
    contentQualityBody: 'Esta pagina combina utilidad funcional, privacidad, limites, FAQ y revision antes de AdSense.',
    privacyNote: 'La herramienta corre en esta sesion del navegador. DevUtility Lab no almacena fragmentos, no usa localStorage y no envia valores a una API en Sprint 3.2.',
    invalidResultTitle: 'Revisa la entrada',
    pageStatusLabel: 'Estado de herramienta',
    liveTitle: 'MVP client-side',
    liveBody: 'La utilidad gratis funciona sin registro y corre en Web Worker cuando hay soporte.',
    gatedTitle: 'Funciones comerciales bloqueadas',
    gatedBody: 'Historial privado, workspaces, lotes, API, billing y anuncios aun no estan activos.',
  },
  fr: {
    breadcrumbHome: 'DevUtility Lab',
    runLabel: 'Executer',
    resetLabel: 'Restaurer exemple',
    inputTitle: 'Entrees',
    resultTitle: 'Resultat',
    guideTitle: 'Guide et confidentialite',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    freeCheckLabel: 'Utilitaire gratuit',
    upgradePathLabel: 'Offre payante',
    contentQualityBody: 'Cette page combine outil fonctionnel, confidentialite, limites, FAQ et date de revue avant AdSense.',
    privacyNote: 'L outil s execute dans cette session du navigateur. DevUtility Lab ne stocke pas les extraits, n utilise pas localStorage et n envoie pas de valeurs a une API en Sprint 3.2.',
    invalidResultTitle: 'Verifiez l entree',
    pageStatusLabel: 'Statut outil',
    liveTitle: 'MVP client-side',
    liveBody: 'L utilitaire gratuit fonctionne sans compte et s execute en Web Worker si supporte.',
    gatedTitle: 'Fonctions commerciales bloquees',
    gatedBody: 'Historique prive, workspaces, lots, API, billing et publicites ne sont pas actifs.',
  },
  de: {
    breadcrumbHome: 'DevUtility Lab',
    runLabel: 'Ausfuehren',
    resetLabel: 'Beispiel zuruecksetzen',
    inputTitle: 'Eingaben',
    resultTitle: 'Ergebnis',
    guideTitle: 'Leitfaden und Datenschutz',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    freeCheckLabel: 'Kostenloses Tool',
    upgradePathLabel: 'Upgrade-Pfad',
    contentQualityBody: 'Diese Seite kombiniert funktionierendes Tool, Datenschutzgrenze, Limits, FAQ und Pruefdatum vor AdSense.',
    privacyNote: 'Das Tool laeuft in dieser Browser-Sitzung. DevUtility Lab speichert keine Ausschnitte, nutzt kein localStorage und sendet in Sprint 3.2 keine Werte an eine API.',
    invalidResultTitle: 'Eingabe pruefen',
    pageStatusLabel: 'Toolstatus',
    liveTitle: 'Client-seitiges MVP',
    liveBody: 'Das kostenlose Tool funktioniert ohne Konto und laeuft bei Support in einem Web Worker.',
    gatedTitle: 'Kommerzielle Funktionen gesperrt',
    gatedBody: 'Privater Verlauf, Workspaces, Stapel, API, Billing und Anzeigen sind noch nicht aktiv.',
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return homeCopy[locale]
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return shellCopy[locale]
}
