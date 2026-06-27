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
    principlesTitle: 'Sprint 4.1 principles',
    principles: [
      { title: 'Static first', body: 'The free MVP solves one-off QR, barcode and link payload creation without an account.' },
      { title: 'No hidden redirect', body: 'Static previews encode the visible payload directly; dynamic QR and short links stay gated.' },
      { title: 'Analytics without PII', body: 'Only tool slugs and safe route paths enter the local data layer in this sprint.' },
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
    principlesTitle: 'Principios da Sprint 4.1',
    principles: [
      { title: 'Estatico primeiro', body: 'O MVP gratuito resolve criacao pontual de QR, barcode e payloads sem conta.' },
      { title: 'Sem redirect oculto', body: 'Previews estaticos codificam o payload visivel; QR dinamico e short links seguem bloqueados.' },
      { title: 'Analytics sem PII', body: 'Apenas tool slug e rota segura entram no data layer local nesta sprint.' },
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
    principlesTitle: 'Principios Sprint 4.1',
    principles: [
      { title: 'Estatico primero', body: 'El MVP gratis resuelve creacion puntual de QR, barcode y payloads sin cuenta.' },
      { title: 'Sin redirect oculto', body: 'Las vistas estaticas codifican el payload visible; QR dinamico y short links quedan gated.' },
      { title: 'Analytics sin PII', body: 'Solo tool slug y ruta segura entran al data layer local en esta sprint.' },
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
    principlesTitle: 'Principes Sprint 4.1',
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
    principlesTitle: 'Sprint-4.1-Prinzipien',
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
    guideTitle: 'Guide and limits',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    freeCheckLabel: 'Free utility',
    upgradePathLabel: 'Upgrade path',
    contentQualityBody: 'This page combines a working local tool, safety limits, FAQ and review date before any AdSense or paid launch.',
    privacyNote: 'The builder runs in this browser session. QRRoute does not store inputs, use localStorage or send payloads to a product API in Sprint 4.1.',
    invalidResultTitle: 'Check the input',
    pageStatusLabel: 'Tool status',
    liveTitle: 'Client-side MVP',
    liveBody: 'The free builder works without signup and renders static SVG previews locally.',
    gatedTitle: 'Redirect features gated',
    gatedBody: 'Dynamic QR, short links, analytics, custom domains, billing and ads are not active yet.',
    previewEmpty: 'Generate a payload to see the local SVG preview.',
    previewError: 'Preview rendering failed; the payload text remains available.',
  },
  'pt-br': {
    breadcrumbHome: 'QRRoute',
    runLabel: 'Gerar preview',
    resetLabel: 'Restaurar exemplo',
    inputTitle: 'Entradas',
    resultTitle: 'Payload',
    guideTitle: 'Guia e limites',
    faqTitle: 'Perguntas frequentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Utilitario gratuito',
    upgradePathLabel: 'Caminho de upgrade',
    contentQualityBody: 'Esta pagina combina ferramenta local, limites de seguranca, FAQ e revisao antes de AdSense ou pago.',
    privacyNote: 'O builder roda nesta sessao do navegador. O QRRoute nao armazena entradas, nao usa localStorage e nao envia payloads para API na Sprint 4.1.',
    invalidResultTitle: 'Confira a entrada',
    pageStatusLabel: 'Status da ferramenta',
    liveTitle: 'MVP client-side',
    liveBody: 'O builder gratuito funciona sem cadastro e renderiza SVG estatico localmente.',
    gatedTitle: 'Redirects bloqueados',
    gatedBody: 'QR dinamico, short links, analytics, dominio proprio, billing e ads ainda nao estao ativos.',
    previewEmpty: 'Gere um payload para ver o preview SVG local.',
    previewError: 'Falha ao renderizar preview; o payload textual continua disponivel.',
  },
  es: {
    breadcrumbHome: 'QRRoute',
    runLabel: 'Generar vista',
    resetLabel: 'Restaurar ejemplo',
    inputTitle: 'Entradas',
    resultTitle: 'Payload',
    guideTitle: 'Guia y limites',
    faqTitle: 'Preguntas frecuentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Utilidad gratis',
    upgradePathLabel: 'Ruta de upgrade',
    contentQualityBody: 'Esta pagina combina herramienta local, limites de seguridad, FAQ y revision antes de AdSense o pago.',
    privacyNote: 'El builder corre en esta sesion del navegador. QRRoute no almacena entradas, no usa localStorage ni envia payloads a una API en Sprint 4.1.',
    invalidResultTitle: 'Revisa la entrada',
    pageStatusLabel: 'Estado de herramienta',
    liveTitle: 'MVP client-side',
    liveBody: 'El builder gratis funciona sin registro y renderiza SVG estatico localmente.',
    gatedTitle: 'Redirects bloqueados',
    gatedBody: 'QR dinamico, short links, analytics, dominio propio, billing y ads no estan activos.',
    previewEmpty: 'Genera un payload para ver la vista SVG local.',
    previewError: 'Fallo al renderizar la vista; el payload textual sigue disponible.',
  },
  fr: {
    breadcrumbHome: 'QRRoute',
    runLabel: 'Generer apercu',
    resetLabel: 'Restaurer exemple',
    inputTitle: 'Entrees',
    resultTitle: 'Payload',
    guideTitle: 'Guide et limites',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    freeCheckLabel: 'Utilitaire gratuit',
    upgradePathLabel: 'Offre payante',
    contentQualityBody: 'Cette page combine outil local, limites securite, FAQ et date de revue avant AdSense ou payant.',
    privacyNote: 'Le builder s execute dans cette session navigateur. QRRoute ne stocke pas les entrees, n utilise pas localStorage et n envoie pas les payloads a une API en Sprint 4.1.',
    invalidResultTitle: 'Verifiez l entree',
    pageStatusLabel: 'Statut outil',
    liveTitle: 'MVP client-side',
    liveBody: 'Le builder gratuit fonctionne sans compte et rend des apercus SVG statiques localement.',
    gatedTitle: 'Redirects bloques',
    gatedBody: 'QR dynamique, short links, analytics, domaine propre, billing et ads ne sont pas actifs.',
    previewEmpty: 'Generez un payload pour voir l apercu SVG local.',
    previewError: 'Echec de rendu; le payload texte reste disponible.',
  },
  de: {
    breadcrumbHome: 'QRRoute',
    runLabel: 'Vorschau erzeugen',
    resetLabel: 'Beispiel zuruecksetzen',
    inputTitle: 'Eingaben',
    resultTitle: 'Payload',
    guideTitle: 'Leitfaden und Grenzen',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    freeCheckLabel: 'Kostenloses Tool',
    upgradePathLabel: 'Upgrade-Pfad',
    contentQualityBody: 'Diese Seite kombiniert lokales Tool, Sicherheitsgrenzen, FAQ und Pruefdatum vor AdSense oder Zahlung.',
    privacyNote: 'Der Builder laeuft in dieser Browser-Sitzung. QRRoute speichert keine Eingaben, nutzt kein localStorage und sendet in Sprint 4.1 keine Payloads an eine API.',
    invalidResultTitle: 'Eingabe pruefen',
    pageStatusLabel: 'Toolstatus',
    liveTitle: 'Client-seitiges MVP',
    liveBody: 'Der kostenlose Builder funktioniert ohne Konto und rendert statische SVG-Vorschauen lokal.',
    gatedTitle: 'Redirects gesperrt',
    gatedBody: 'Dynamische QR, Short Links, Analytics, eigene Domains, Billing und Ads sind noch nicht aktiv.',
    previewEmpty: 'Erzeugen Sie einen Payload, um die lokale SVG-Vorschau zu sehen.',
    previewError: 'Vorschau konnte nicht gerendert werden; der Text-Payload bleibt verfuegbar.',
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return homeCopy[locale]
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return shellCopy[locale]
}
