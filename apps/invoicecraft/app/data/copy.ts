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
  localBadgeLabel: string
  principlesTitle: string
  principles: Array<{ title: string; body: string }>
  statusRows: Array<{ title: string; body: string; tone: 'green' | 'amber' }>
}

export interface ShellCopy {
  breadcrumbHome: string
  modeLabel: string
  runLabel: string
  resetLabel: string
  downloadLabel: string
  copySummaryLabel: string
  copiedSummaryLabel: string
  inputTitle: string
  documentSnapshotTitle: string
  documentSnapshotEmpty: string
  downloadHint: string
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
  useCaseTitle: string
  relatedTitle: string
  relatedBody: string
  gatedListTitle: string
  gatedItems: string[]
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
    localBadgeLabel: 'Local MVP',
    principlesTitle: 'Operating principles',
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
    localBadgeLabel: 'MVP local',
    principlesTitle: 'Principios operacionais',
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
    localBadgeLabel: 'MVP local',
    principlesTitle: 'Principios operativos',
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
    localBadgeLabel: 'MVP local',
    principlesTitle: 'Principes operationnels',
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
    localBadgeLabel: 'Lokales MVP',
    principlesTitle: 'Betriebsprinzipien',
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
    modeLabel: 'Template style',
    runLabel: 'Update preview',
    resetLabel: 'Reset example',
    downloadLabel: 'Download PDF',
    copySummaryLabel: 'Copy text summary',
    copiedSummaryLabel: 'Copied',
    inputTitle: 'Document fields',
    documentSnapshotTitle: 'Document snapshot',
    documentSnapshotEmpty: 'Update the preview to calculate totals, verify dates and unlock PDF download.',
    downloadHint: 'Preview first, then download a local PDF from the snapshot panel.',
    resultTitle: 'Preview',
    guideTitle: 'Guide and limits',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    freeCheckLabel: 'Free document',
    upgradePathLabel: 'Upgrade path',
    contentQualityBody: 'This page combines a working document builder, visible fiscal/payment gates, FAQ and review date.',
    privacyNote: 'The builder runs in this browser session. InvoiceCraft does not store fields, use localStorage, use sessionStorage or send document values to analytics.',
    invalidResultTitle: 'Check the document fields',
    pageStatusLabel: 'Builder status',
    liveTitle: 'Client-side MVP',
    liveBody: 'Preview and PDF generation run in the browser without mandatory signup.',
    gatedTitle: 'Commercial workflow gated',
    gatedBody: 'Saved data, recurrence, branding, team access, payments and fiscal tax rules are not active.',
    useCaseTitle: 'Use case',
    relatedTitle: 'Related documents',
    relatedBody: 'Switch between document types without saving client, item or amount data.',
    gatedListTitle: 'Planned paid workflow',
    gatedItems: ['Saved clients and products', 'Recurring invoices and reminders', 'Branding and team approval', 'Payment links and reconciliation', 'Fiscal numbering after legal review'],
  },
  'pt-br': {
    breadcrumbHome: 'InvoiceCraft',
    modeLabel: 'Estilo do template',
    runLabel: 'Atualizar preview',
    resetLabel: 'Restaurar exemplo',
    downloadLabel: 'Baixar PDF',
    copySummaryLabel: 'Copiar resumo',
    copiedSummaryLabel: 'Copiado',
    inputTitle: 'Campos do documento',
    documentSnapshotTitle: 'Resumo do documento',
    documentSnapshotEmpty: 'Atualize o preview para calcular totais, conferir datas e liberar o PDF local.',
    downloadHint: 'Confira o preview primeiro e depois baixe o PDF local no painel de resumo.',
    resultTitle: 'Preview',
    guideTitle: 'Guia e limites',
    faqTitle: 'Perguntas frequentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Documento gratuito',
    upgradePathLabel: 'Caminho de upgrade',
    contentQualityBody: 'Esta pagina combina builder funcional, gates fiscais/pagamento, FAQ e data de revisao.',
    privacyNote: 'O builder roda nesta sessao do navegador. O InvoiceCraft nao armazena campos, nao usa localStorage, nao usa sessionStorage e nao envia valores a analytics.',
    invalidResultTitle: 'Confira os campos',
    pageStatusLabel: 'Status do builder',
    liveTitle: 'MVP client-side',
    liveBody: 'Preview e PDF rodam no navegador sem cadastro obrigatorio.',
    gatedTitle: 'Workflow comercial bloqueado',
    gatedBody: 'Dados salvos, recorrencia, branding, equipe, pagamentos e regras fiscais nao estao ativos.',
    useCaseTitle: 'Caso de uso',
    relatedTitle: 'Documentos relacionados',
    relatedBody: 'Alterne entre tipos sem salvar cliente, itens ou valores.',
    gatedListTitle: 'Workflow pago planejado',
    gatedItems: ['Clientes e produtos salvos', 'Recorrencia e lembretes', 'Branding e aprovacao em equipe', 'Links de pagamento e conciliacao', 'Numeracao fiscal apos revisao juridica'],
  },
  es: {
    breadcrumbHome: 'InvoiceCraft',
    modeLabel: 'Estilo de plantilla',
    runLabel: 'Actualizar vista',
    resetLabel: 'Restaurar ejemplo',
    downloadLabel: 'Descargar PDF',
    copySummaryLabel: 'Copiar resumen',
    copiedSummaryLabel: 'Copiado',
    inputTitle: 'Campos',
    documentSnapshotTitle: 'Resumen del documento',
    documentSnapshotEmpty: 'Actualiza la vista para calcular totales, revisar fechas y liberar el PDF local.',
    downloadHint: 'Revisa la vista primero y descarga el PDF local desde el resumen.',
    resultTitle: 'Vista previa',
    guideTitle: 'Guia y limites',
    faqTitle: 'Preguntas frecuentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Documento gratis',
    upgradePathLabel: 'Ruta de upgrade',
    contentQualityBody: 'Esta pagina combina builder funcional, gates fiscales/pago, FAQ y fecha de revision.',
    privacyNote: 'El builder corre en esta sesion del navegador. InvoiceCraft no almacena campos, no usa localStorage, no usa sessionStorage y no envia valores a analytics.',
    invalidResultTitle: 'Revisa los campos',
    pageStatusLabel: 'Estado',
    liveTitle: 'MVP client-side',
    liveBody: 'Vista previa y PDF corren en el navegador sin registro obligatorio.',
    gatedTitle: 'Workflow comercial bloqueado',
    gatedBody: 'Datos guardados, recurrencia, marca, equipos, pagos y reglas fiscales no estan activos.',
    useCaseTitle: 'Caso de uso',
    relatedTitle: 'Documentos relacionados',
    relatedBody: 'Cambia de tipo sin guardar cliente, items o importes.',
    gatedListTitle: 'Workflow pago planeado',
    gatedItems: ['Clientes y productos guardados', 'Recurrencia y recordatorios', 'Marca y aprobacion de equipo', 'Links de pago y conciliacion', 'Numeracion fiscal tras revision legal'],
  },
  fr: {
    breadcrumbHome: 'InvoiceCraft',
    modeLabel: 'Style de modele',
    runLabel: 'Actualiser apercu',
    resetLabel: 'Restaurer exemple',
    downloadLabel: 'Telecharger PDF',
    copySummaryLabel: 'Copier resume',
    copiedSummaryLabel: 'Copie',
    inputTitle: 'Champs',
    documentSnapshotTitle: 'Resume document',
    documentSnapshotEmpty: 'Actualisez l apercu pour calculer les totaux, verifier les dates et debloquer le PDF local.',
    downloadHint: 'Verifiez l apercu puis telechargez le PDF local depuis le resume.',
    resultTitle: 'Apercu',
    guideTitle: 'Guide et limites',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    freeCheckLabel: 'Document gratuit',
    upgradePathLabel: 'Offre payante',
    contentQualityBody: 'Cette page combine builder fonctionnel, gates fiscal/paiement, FAQ et date de revue.',
    privacyNote: 'Le builder s execute dans cette session navigateur. InvoiceCraft ne stocke pas les champs, n utilise pas localStorage ni sessionStorage et n envoie pas les valeurs a analytics.',
    invalidResultTitle: 'Verifiez les champs',
    pageStatusLabel: 'Statut',
    liveTitle: 'MVP client-side',
    liveBody: 'Apercu et PDF fonctionnent dans le navigateur sans compte obligatoire.',
    gatedTitle: 'Workflow commercial gate',
    gatedBody: 'Donnees sauvegardees, recurrence, marque, equipes, paiements et regles fiscales ne sont pas actifs.',
    useCaseTitle: 'Cas d usage',
    relatedTitle: 'Documents lies',
    relatedBody: 'Changez de type sans sauvegarder client, lignes ou montants.',
    gatedListTitle: 'Workflow payant prevu',
    gatedItems: ['Clients et produits sauvegardes', 'Recurrence et rappels', 'Marque et approbation equipe', 'Liens paiement et reconciliation', 'Numerotation fiscale apres revue juridique'],
  },
  de: {
    breadcrumbHome: 'InvoiceCraft',
    modeLabel: 'Vorlagenstil',
    runLabel: 'Vorschau aktualisieren',
    resetLabel: 'Beispiel zuruecksetzen',
    downloadLabel: 'PDF herunterladen',
    copySummaryLabel: 'Textzusammenfassung kopieren',
    copiedSummaryLabel: 'Kopiert',
    inputTitle: 'Dokumentfelder',
    documentSnapshotTitle: 'Dokument-Snapshot',
    documentSnapshotEmpty: 'Vorschau aktualisieren, um Summen, Daten und lokalen PDF-Download zu pruefen.',
    downloadHint: 'Erst Vorschau pruefen, dann lokales PDF im Snapshot herunterladen.',
    resultTitle: 'Vorschau',
    guideTitle: 'Leitfaden und Grenzen',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    freeCheckLabel: 'Kostenloses Dokument',
    upgradePathLabel: 'Upgrade-Pfad',
    contentQualityBody: 'Diese Seite kombiniert Builder, sichtbare Steuer-/Zahlungsgates, FAQ und Pruefdatum.',
    privacyNote: 'Der Builder laeuft in dieser Browser-Sitzung. InvoiceCraft speichert keine Felder, nutzt kein localStorage oder sessionStorage und sendet keine Werte an Analytics.',
    invalidResultTitle: 'Felder pruefen',
    pageStatusLabel: 'Builderstatus',
    liveTitle: 'Client-seitiges MVP',
    liveBody: 'Vorschau und PDF laufen im Browser ohne Pflichtkonto.',
    gatedTitle: 'Kommerzieller Workflow gesperrt',
    gatedBody: 'Gespeicherte Daten, Wiederholung, Branding, Teams, Zahlungen und Steuerregeln sind nicht aktiv.',
    useCaseTitle: 'Anwendungsfall',
    relatedTitle: 'Verwandte Dokumente',
    relatedBody: 'Zwischen Dokumenttypen wechseln, ohne Kunden, Positionen oder Betraege zu speichern.',
    gatedListTitle: 'Geplanter Bezahl-Workflow',
    gatedItems: ['Gespeicherte Kunden und Produkte', 'Wiederkehrende Rechnungen und Erinnerungen', 'Branding und Teamfreigabe', 'Zahlungslinks und Abgleich', 'Steuernummerierung nach Rechtspruefung'],
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return sanitizePublicCopy(locale, homeCopy[locale])
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return sanitizePublicCopy(locale, shellCopy[locale])
}
