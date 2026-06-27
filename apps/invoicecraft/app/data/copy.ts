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
}

export const homeCopy: Record<LocaleCode, HomeCopy> = {
  en: {
    eyebrow: 'InvoiceCraft',
    title: 'Invoices, quotes and receipts without mandatory signup.',
    lead: 'Create a one-off document, preview itemized totals and download a local PDF while client and amount data stays in the browser.',
    searchLabel: 'Search document tools',
    searchPlaceholder: 'Try invoice, quote or receipt',
    categoryLabel: 'Document type',
    allCategories: 'All documents',
    noResultsTitle: 'No document tools matched',
    noResultsBody: 'Clear the search or choose another document type.',
    freeLabel: 'Free result',
    upgradeLabel: 'Upgrade path',
    detailCta: 'Open builder',
    principlesTitle: 'Sprint 4.2 principles',
    principles: [
      { title: 'Basic need solved', body: 'The free flow creates a useful document and PDF without requiring an account.' },
      { title: 'Data stays local', body: 'Issuer, client, item and amount fields are not stored, synced or sent to product analytics.' },
      { title: 'Workflow is paid value', body: 'Saved clients, recurrence, branding, teams, payments and history stay behind later gates.' },
    ],
    statusRows: [
      { title: '3 local builders', body: 'Invoice, quote and receipt pages are available as browser-side MVPs.', tone: 'green' },
      { title: '5 language route sets', body: 'English, Portuguese, Spanish, French and German pages are prerendered.', tone: 'green' },
      { title: 'Payments and taxes gated', body: 'No payment collection, fiscal invoice claim, account or storage is active.', tone: 'amber' },
    ],
  },
  'pt-br': {
    eyebrow: 'InvoiceCraft',
    title: 'Faturas, orcamentos e recibos sem cadastro obrigatorio.',
    lead: 'Crie um documento unico, confira totais itemizados e baixe um PDF local mantendo cliente e valores no navegador.',
    searchLabel: 'Buscar documentos',
    searchPlaceholder: 'Tente fatura, orcamento ou recibo',
    categoryLabel: 'Tipo de documento',
    allCategories: 'Todos',
    noResultsTitle: 'Nenhum documento encontrado',
    noResultsBody: 'Limpe a busca ou escolha outro tipo.',
    freeLabel: 'Resultado gratuito',
    upgradeLabel: 'Caminho de upgrade',
    detailCta: 'Abrir builder',
    principlesTitle: 'Principios da Sprint 4.2',
    principles: [
      { title: 'Necessidade basica', body: 'O fluxo gratuito cria um documento util e PDF sem exigir conta.' },
      { title: 'Dados locais', body: 'Emissor, cliente, itens e valores nao sao armazenados, sincronizados ou enviados a analytics.' },
      { title: 'Workflow e valor pago', body: 'Clientes salvos, recorrencia, branding, equipe, pagamentos e historico ficam em gates futuros.' },
    ],
    statusRows: [
      { title: '3 builders locais', body: 'Fatura, orcamento e recibo estao disponiveis como MVP no navegador.', tone: 'green' },
      { title: '5 conjuntos de idioma', body: 'Paginas em ingles, portugues, espanhol, frances e alemao sao prerenderizadas.', tone: 'green' },
      { title: 'Pagamentos e impostos bloqueados', body: 'Sem cobranca, nota fiscal oficial, conta ou storage ativo.', tone: 'amber' },
    ],
  },
  es: {
    eyebrow: 'InvoiceCraft',
    title: 'Facturas, presupuestos y recibos sin registro obligatorio.',
    lead: 'Crea un documento unico, revisa totales itemizados y descarga un PDF local con datos en el navegador.',
    searchLabel: 'Buscar documentos',
    searchPlaceholder: 'Factura, presupuesto o recibo',
    categoryLabel: 'Tipo',
    allCategories: 'Todos',
    noResultsTitle: 'No hay documentos',
    noResultsBody: 'Borra la busqueda o elige otro tipo.',
    freeLabel: 'Resultado gratis',
    upgradeLabel: 'Ruta de upgrade',
    detailCta: 'Abrir builder',
    principlesTitle: 'Principios Sprint 4.2',
    principles: [
      { title: 'Necesidad basica', body: 'El flujo gratis crea un documento util y PDF sin exigir cuenta.' },
      { title: 'Datos locales', body: 'Emisor, cliente, items e importes no se guardan, sincronizan ni envian a analytics.' },
      { title: 'Workflow pago', body: 'Clientes guardados, recurrencia, marca, equipos, pagos e historial quedan gates.' },
    ],
    statusRows: [
      { title: '3 builders locales', body: 'Factura, presupuesto y recibo funcionan como MVP en navegador.', tone: 'green' },
      { title: '5 rutas de idioma', body: 'Paginas en ingles, portugues, espanol, frances y aleman se prerenderizan.', tone: 'green' },
      { title: 'Pagos e impuestos bloqueados', body: 'Sin cobro, factura fiscal oficial, cuenta ni storage activo.', tone: 'amber' },
    ],
  },
  fr: {
    eyebrow: 'InvoiceCraft',
    title: 'Factures, devis et recus sans compte obligatoire.',
    lead: 'Creez un document unique, verifiez les totaux et telechargez un PDF local avec les donnees dans le navigateur.',
    searchLabel: 'Rechercher',
    searchPlaceholder: 'Facture, devis ou recu',
    categoryLabel: 'Type',
    allCategories: 'Tous',
    noResultsTitle: 'Aucun document',
    noResultsBody: 'Effacez la recherche ou choisissez un autre type.',
    freeLabel: 'Resultat gratuit',
    upgradeLabel: 'Offre payante',
    detailCta: 'Ouvrir',
    principlesTitle: 'Principes Sprint 4.2',
    principles: [
      { title: 'Besoin de base', body: 'Le flux gratuit cree un document utile et un PDF sans compte obligatoire.' },
      { title: 'Donnees locales', body: 'Emetteur, client, lignes et montants ne sont ni stockes ni envoyes a analytics.' },
      { title: 'Workflow payant', body: 'Clients sauvegardes, recurrence, marque, equipes, paiements et historique restent gates.' },
    ],
    statusRows: [
      { title: '3 builders locaux', body: 'Facture, devis et recu fonctionnent comme MVP navigateur.', tone: 'green' },
      { title: '5 routes langue', body: 'Pages anglaises, portugaises, espagnoles, francaises et allemandes prerenderisees.', tone: 'green' },
      { title: 'Paiements et taxes gates', body: 'Pas de paiement, facture fiscale officielle, compte ou storage actif.', tone: 'amber' },
    ],
  },
  de: {
    eyebrow: 'InvoiceCraft',
    title: 'Rechnungen, Angebote und Belege ohne Pflichtkonto.',
    lead: 'Erstellen Sie ein einzelnes Dokument, pruefen Sie Summen und laden Sie lokal ein PDF herunter.',
    searchLabel: 'Dokumente suchen',
    searchPlaceholder: 'Rechnung, Angebot oder Beleg',
    categoryLabel: 'Typ',
    allCategories: 'Alle',
    noResultsTitle: 'Keine Dokumente',
    noResultsBody: 'Suche leeren oder anderen Typ waehlen.',
    freeLabel: 'Kostenloses Ergebnis',
    upgradeLabel: 'Upgrade-Pfad',
    detailCta: 'Builder oeffnen',
    principlesTitle: 'Sprint-4.2-Prinzipien',
    principles: [
      { title: 'Basisbedarf geloest', body: 'Der kostenlose Flow erstellt ein brauchbares Dokument und PDF ohne Konto.' },
      { title: 'Daten bleiben lokal', body: 'Aussteller, Kunde, Positionen und Betraege werden nicht gespeichert oder an Analytics gesendet.' },
      { title: 'Workflow als Bezahlwert', body: 'Kunden, Wiederholung, Branding, Teams, Zahlungen und Verlauf bleiben gated.' },
    ],
    statusRows: [
      { title: '3 lokale Builder', body: 'Rechnung, Angebot und Beleg laufen als Browser-MVP.', tone: 'green' },
      { title: '5 Sprachrouten', body: 'Englische, portugiesische, spanische, franzoesische und deutsche Seiten werden prerendered.', tone: 'green' },
      { title: 'Zahlungen und Steuern gated', body: 'Keine Zahlung, offizielle Steuerrechnung, Konto oder Storage aktiv.', tone: 'amber' },
    ],
  },
}

export const shellCopy: Record<LocaleCode, ShellCopy> = {
  en: {
    breadcrumbHome: 'InvoiceCraft',
    runLabel: 'Update preview',
    resetLabel: 'Reset example',
    downloadLabel: 'Download PDF',
    inputTitle: 'Document fields',
    resultTitle: 'Preview',
    guideTitle: 'Guide and limits',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    freeCheckLabel: 'Free document',
    upgradePathLabel: 'Upgrade path',
    contentQualityBody: 'This page combines a working document builder, visible fiscal/payment gates, FAQ and review date.',
    privacyNote: 'The builder runs in this browser session. InvoiceCraft does not store fields, use localStorage, use sessionStorage or send document values to analytics in Sprint 4.2.',
    invalidResultTitle: 'Check the document fields',
    pageStatusLabel: 'Builder status',
    liveTitle: 'Client-side MVP',
    liveBody: 'Preview and PDF generation run in the browser without mandatory signup.',
    gatedTitle: 'Commercial workflow gated',
    gatedBody: 'Saved data, recurrence, branding, team access, payments and fiscal tax rules are not active.',
  },
  'pt-br': {
    breadcrumbHome: 'InvoiceCraft',
    runLabel: 'Atualizar preview',
    resetLabel: 'Restaurar exemplo',
    downloadLabel: 'Baixar PDF',
    inputTitle: 'Campos do documento',
    resultTitle: 'Preview',
    guideTitle: 'Guia e limites',
    faqTitle: 'Perguntas frequentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Documento gratuito',
    upgradePathLabel: 'Caminho de upgrade',
    contentQualityBody: 'Esta pagina combina builder funcional, gates fiscais/pagamento, FAQ e data de revisao.',
    privacyNote: 'O builder roda nesta sessao do navegador. O InvoiceCraft nao armazena campos, nao usa localStorage, nao usa sessionStorage e nao envia valores a analytics na Sprint 4.2.',
    invalidResultTitle: 'Confira os campos',
    pageStatusLabel: 'Status do builder',
    liveTitle: 'MVP client-side',
    liveBody: 'Preview e PDF rodam no navegador sem cadastro obrigatorio.',
    gatedTitle: 'Workflow comercial bloqueado',
    gatedBody: 'Dados salvos, recorrencia, branding, equipe, pagamentos e regras fiscais nao estao ativos.',
  },
  es: {
    breadcrumbHome: 'InvoiceCraft',
    runLabel: 'Actualizar vista',
    resetLabel: 'Restaurar ejemplo',
    downloadLabel: 'Descargar PDF',
    inputTitle: 'Campos',
    resultTitle: 'Vista previa',
    guideTitle: 'Guia y limites',
    faqTitle: 'Preguntas frecuentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Documento gratis',
    upgradePathLabel: 'Ruta de upgrade',
    contentQualityBody: 'Esta pagina combina builder funcional, gates fiscales/pago, FAQ y fecha de revision.',
    privacyNote: 'El builder corre en esta sesion del navegador. InvoiceCraft no almacena campos, no usa localStorage, no usa sessionStorage y no envia valores a analytics en Sprint 4.2.',
    invalidResultTitle: 'Revisa los campos',
    pageStatusLabel: 'Estado',
    liveTitle: 'MVP client-side',
    liveBody: 'Vista previa y PDF corren en el navegador sin registro obligatorio.',
    gatedTitle: 'Workflow comercial bloqueado',
    gatedBody: 'Datos guardados, recurrencia, marca, equipos, pagos y reglas fiscales no estan activos.',
  },
  fr: {
    breadcrumbHome: 'InvoiceCraft',
    runLabel: 'Actualiser apercu',
    resetLabel: 'Restaurer exemple',
    downloadLabel: 'Telecharger PDF',
    inputTitle: 'Champs',
    resultTitle: 'Apercu',
    guideTitle: 'Guide et limites',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    freeCheckLabel: 'Document gratuit',
    upgradePathLabel: 'Offre payante',
    contentQualityBody: 'Cette page combine builder fonctionnel, gates fiscal/paiement, FAQ et date de revue.',
    privacyNote: 'Le builder s execute dans cette session navigateur. InvoiceCraft ne stocke pas les champs, n utilise pas localStorage ni sessionStorage et n envoie pas les valeurs a analytics en Sprint 4.2.',
    invalidResultTitle: 'Verifiez les champs',
    pageStatusLabel: 'Statut',
    liveTitle: 'MVP client-side',
    liveBody: 'Apercu et PDF fonctionnent dans le navigateur sans compte obligatoire.',
    gatedTitle: 'Workflow commercial gate',
    gatedBody: 'Donnees sauvegardees, recurrence, marque, equipes, paiements et regles fiscales ne sont pas actifs.',
  },
  de: {
    breadcrumbHome: 'InvoiceCraft',
    runLabel: 'Vorschau aktualisieren',
    resetLabel: 'Beispiel zuruecksetzen',
    downloadLabel: 'PDF herunterladen',
    inputTitle: 'Dokumentfelder',
    resultTitle: 'Vorschau',
    guideTitle: 'Leitfaden und Grenzen',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    freeCheckLabel: 'Kostenloses Dokument',
    upgradePathLabel: 'Upgrade-Pfad',
    contentQualityBody: 'Diese Seite kombiniert Builder, sichtbare Steuer-/Zahlungsgates, FAQ und Pruefdatum.',
    privacyNote: 'Der Builder laeuft in dieser Browser-Sitzung. InvoiceCraft speichert keine Felder, nutzt kein localStorage oder sessionStorage und sendet in Sprint 4.2 keine Werte an Analytics.',
    invalidResultTitle: 'Felder pruefen',
    pageStatusLabel: 'Builderstatus',
    liveTitle: 'Client-seitiges MVP',
    liveBody: 'Vorschau und PDF laufen im Browser ohne Pflichtkonto.',
    gatedTitle: 'Kommerzieller Workflow gesperrt',
    gatedBody: 'Gespeicherte Daten, Wiederholung, Branding, Teams, Zahlungen und Steuerregeln sind nicht aktiv.',
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return homeCopy[locale]
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return shellCopy[locale]
}
