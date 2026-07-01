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
  futureTitle: string
  futureBody: string
  useCaseTitle: string
  relatedTitle: string
  relatedBody: string
  futureListTitle: string
  futureItems: string[]
}

export const homeCopy: Record<LocaleCode, HomeCopy> = {
  en: {
    eyebrow: 'InvoiceCraft',
    title: 'Invoices, quotes and receipts without mandatory signup.',
    lead: 'Start with the invoice editor, preview itemized totals and download a local PDF while client and amount data stays in the browser.',
    searchLabel: 'Search document tools',
    searchPlaceholder: 'Try invoice, quote or receipt',
    categoryLabel: 'Document type',
    allCategories: 'All documents',
    noResultsTitle: 'No document tools matched',
    noResultsBody: 'Clear the search or choose another document type.',
    freeLabel: 'Free result',
    upgradeLabel: 'Upgrade path',
    detailCta: 'Open builder',
    localBadgeLabel: 'Free PDF',
    principlesTitle: 'Operating principles',
    principles: [
      { title: 'Basic need solved', body: 'The free flow creates a useful document and PDF without requiring an account.' },
      { title: 'Data stays local', body: 'Issuer, client, item and amount fields stay in this browser session and are not sent to product analytics.' },
      { title: 'Workflow is paid value', body: 'Saved clients, recurrence, branding, teams, payments and history stay behind later gates.' },
    ],
    statusRows: [
      { title: '3 document studios', body: 'Invoice, quote and receipt pages open with an editor, preview and PDF download.', tone: 'green' },
      { title: '5 language route sets', body: 'English, Portuguese, Spanish, French and German pages are prerendered.', tone: 'green' },
      { title: 'Browser PDF export', body: 'The free document is generated locally without mandatory signup.', tone: 'green' },
    ],
  },
  'pt-br': {
    eyebrow: 'InvoiceCraft',
    title: 'Faturas, orcamentos e recibos sem cadastro obrigatorio.',
    lead: 'Comece pelo editor de fatura, confira totais itemizados e baixe um PDF local mantendo cliente e valores no navegador.',
    searchLabel: 'Buscar documentos',
    searchPlaceholder: 'Tente fatura, orcamento ou recibo',
    categoryLabel: 'Tipo de documento',
    allCategories: 'Todos',
    noResultsTitle: 'Nenhum documento encontrado',
    noResultsBody: 'Limpe a busca ou escolha outro tipo.',
    freeLabel: 'Resultado gratuito',
    upgradeLabel: 'Caminho de upgrade',
    detailCta: 'Abrir builder',
    localBadgeLabel: 'PDF gratis',
    principlesTitle: 'Principios operacionais',
    principles: [
      { title: 'Necessidade basica', body: 'O fluxo gratuito cria um documento util e PDF sem exigir conta.' },
      { title: 'Dados locais', body: 'Emissor, cliente, itens e valores ficam nesta sessao do navegador e nao sao enviados a analytics.' },
      { title: 'Workflow e valor pago', body: 'Clientes salvos, recorrencia, branding, equipe, pagamentos e historico ficam em gates futuros.' },
    ],
    statusRows: [
      { title: '3 estudios de documento', body: 'Fatura, orcamento e recibo abrem com editor, preview e PDF.', tone: 'green' },
      { title: '5 conjuntos de idioma', body: 'Paginas em ingles, portugues, espanhol, frances e alemao sao prerenderizadas.', tone: 'green' },
      { title: 'PDF no navegador', body: 'O documento gratuito e gerado localmente sem cadastro obrigatorio.', tone: 'green' },
    ],
  },
  es: {
    eyebrow: 'InvoiceCraft',
    title: 'Facturas, presupuestos y recibos sin registro obligatorio.',
    lead: 'Empieza en el editor de factura, revisa totales itemizados y descarga un PDF local con datos en el navegador.',
    searchLabel: 'Buscar documentos',
    searchPlaceholder: 'Factura, presupuesto o recibo',
    categoryLabel: 'Tipo',
    allCategories: 'Todos',
    noResultsTitle: 'No hay documentos',
    noResultsBody: 'Borra la busqueda o elige otro tipo.',
    freeLabel: 'Resultado gratis',
    upgradeLabel: 'Ruta de upgrade',
    detailCta: 'Abrir builder',
    localBadgeLabel: 'PDF gratis',
    principlesTitle: 'Principios operativos',
    principles: [
      { title: 'Necesidad basica', body: 'El flujo gratis crea un documento util y PDF sin exigir cuenta.' },
      { title: 'Datos locales', body: 'Emisor, cliente, items e importes quedan en esta sesion del navegador y no se envian a analytics.' },
      { title: 'Workflow pago', body: 'Clientes guardados, recurrencia, marca, equipos, pagos e historial quedan para flujos futuros de cuenta.' },
    ],
    statusRows: [
      { title: '3 estudios de documento', body: 'Factura, presupuesto y recibo abren con editor, vista previa y PDF.', tone: 'green' },
      { title: '5 rutas de idioma', body: 'Paginas en ingles, portugues, espanol, frances y aleman se prerenderizan.', tone: 'green' },
      { title: 'PDF en navegador', body: 'El documento gratis se genera localmente sin registro obligatorio.', tone: 'green' },
    ],
  },
  fr: {
    eyebrow: 'InvoiceCraft',
    title: 'Factures, devis et recus sans compte obligatoire.',
    lead: 'Commencez dans l editeur de facture, verifiez les totaux et telechargez un PDF local avec les donnees dans le navigateur.',
    searchLabel: 'Rechercher',
    searchPlaceholder: 'Facture, devis ou recu',
    categoryLabel: 'Type',
    allCategories: 'Tous',
    noResultsTitle: 'Aucun document',
    noResultsBody: 'Effacez la recherche ou choisissez un autre type.',
    freeLabel: 'Resultat gratuit',
    upgradeLabel: 'Offre payante',
    detailCta: 'Ouvrir',
    localBadgeLabel: 'PDF gratuit',
    principlesTitle: 'Principes operationnels',
    principles: [
      { title: 'Besoin de base', body: 'Le flux gratuit cree un document utile et un PDF sans compte obligatoire.' },
      { title: 'Donnees locales', body: 'Emetteur, client, lignes et montants restent dans cette session navigateur et ne sont pas envoyes a analytics.' },
      { title: 'Workflow payant', body: 'Clients sauvegardes, recurrence, marque, equipes, paiements et historique restent pour des futurs flux de compte.' },
    ],
    statusRows: [
      { title: '3 studios document', body: 'Facture, devis et recu ouvrent avec editeur, apercu et PDF.', tone: 'green' },
      { title: '5 routes langue', body: 'Pages anglaises, portugaises, espagnoles, francaises et allemandes prerenderisees.', tone: 'green' },
      { title: 'PDF dans le navigateur', body: 'Le document gratuit est genere localement sans compte obligatoire.', tone: 'green' },
    ],
  },
  de: {
    eyebrow: 'InvoiceCraft',
    title: 'Rechnungen, Angebote und Belege ohne Pflichtkonto.',
    lead: 'Starten Sie im Rechnungseditor, pruefen Sie Summen und laden Sie lokal ein PDF herunter.',
    searchLabel: 'Dokumente suchen',
    searchPlaceholder: 'Rechnung, Angebot oder Beleg',
    categoryLabel: 'Typ',
    allCategories: 'Alle',
    noResultsTitle: 'Keine Dokumente',
    noResultsBody: 'Suche leeren oder anderen Typ waehlen.',
    freeLabel: 'Kostenloses Ergebnis',
    upgradeLabel: 'Upgrade-Pfad',
    detailCta: 'Builder oeffnen',
    localBadgeLabel: 'Kostenloses PDF',
    principlesTitle: 'Betriebsprinzipien',
    principles: [
      { title: 'Basisbedarf geloest', body: 'Der kostenlose Flow erstellt ein brauchbares Dokument und PDF ohne Konto.' },
      { title: 'Daten bleiben lokal', body: 'Aussteller, Kunde, Positionen und Betraege bleiben in dieser Browser-Sitzung und werden nicht an Analytics gesendet.' },
      { title: 'Workflow als Bezahlwert', body: 'Kunden, Wiederholung, Branding, Teams, Zahlungen und Verlauf bleiben fuer kuenftige Konto-Workflows.' },
    ],
    statusRows: [
      { title: '3 Dokumentstudios', body: 'Rechnung, Angebot und Beleg oeffnen mit Editor, Vorschau und PDF.', tone: 'green' },
      { title: '5 Sprachrouten', body: 'Englische, portugiesische, spanische, franzoesische und deutsche Seiten werden prerendered.', tone: 'green' },
      { title: 'PDF im Browser', body: 'Das kostenlose Dokument wird lokal ohne Pflichtkonto erstellt.', tone: 'green' },
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
    documentSnapshotEmpty: 'The live preview calculates totals, verifies dates and keeps the PDF action ready.',
    downloadHint: 'Download a local PDF after the preview calculates the document.',
    resultTitle: 'Preview',
    guideTitle: 'Guide and limits',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    freeCheckLabel: 'Free document',
    upgradePathLabel: 'Upgrade path',
    contentQualityBody: 'This page combines a working document builder, FAQ, review date and clear free-document limits.',
    privacyNote: 'The builder runs in this browser session. InvoiceCraft does not save document fields or send document values to analytics.',
    invalidResultTitle: 'Check the document fields',
    pageStatusLabel: 'Builder status',
    liveTitle: 'Browser PDF builder',
    liveBody: 'Preview and PDF generation run in the browser without mandatory signup.',
    futureTitle: 'Advanced account workflows',
    futureBody: 'Saved data, recurrence, branding, team access, payments and fiscal templates belong to future account workflows.',
    useCaseTitle: 'Use case',
    relatedTitle: 'Related documents',
    relatedBody: 'Switch between document types without saving client, item or amount data.',
    futureListTitle: 'Future workflow options',
    futureItems: ['Saved clients and products', 'Recurring invoices and reminders', 'Branding and team approval', 'Payment links and reconciliation', 'Fiscal numbering after legal review'],
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
    documentSnapshotEmpty: 'O preview ao vivo calcula totais, confere datas e mantem a acao de PDF pronta.',
    downloadHint: 'Baixe um PDF local depois que o preview calcular o documento.',
    resultTitle: 'Preview',
    guideTitle: 'Guia e limites',
    faqTitle: 'Perguntas frequentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Documento gratuito',
    upgradePathLabel: 'Caminho de upgrade',
    contentQualityBody: 'Esta pagina combina builder funcional, FAQ, data de revisao e limites claros do documento gratuito.',
    privacyNote: 'O builder roda nesta sessao do navegador. O InvoiceCraft nao salva campos do documento nem envia valores a analytics.',
    invalidResultTitle: 'Confira os campos',
    pageStatusLabel: 'Status do builder',
    liveTitle: 'Builder de PDF no navegador',
    liveBody: 'Preview e PDF rodam no navegador sem cadastro obrigatorio.',
    futureTitle: 'Workflows avancados de conta',
    futureBody: 'Dados salvos, recorrencia, branding, equipe, pagamentos e modelos fiscais pertencem a fluxos futuros de conta.',
    useCaseTitle: 'Caso de uso',
    relatedTitle: 'Documentos relacionados',
    relatedBody: 'Alterne entre tipos sem salvar cliente, itens ou valores.',
    futureListTitle: 'Opcoes futuras de workflow',
    futureItems: ['Clientes e produtos salvos', 'Recorrencia e lembretes', 'Branding e aprovacao em equipe', 'Links de pagamento e conciliacao', 'Numeracao fiscal apos revisao juridica'],
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
    documentSnapshotEmpty: 'La vista en vivo calcula totales, revisa fechas y mantiene lista la accion de PDF.',
    downloadHint: 'Descarga un PDF local despues de que la vista calcule el documento.',
    resultTitle: 'Vista previa',
    guideTitle: 'Guia y limites',
    faqTitle: 'Preguntas frecuentes',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Documento gratis',
    upgradePathLabel: 'Ruta de upgrade',
    contentQualityBody: 'Esta pagina combina builder funcional, FAQ, fecha de revision y limites claros del documento gratis.',
    privacyNote: 'El builder corre en esta sesion del navegador. InvoiceCraft no guarda campos del documento ni envia valores a analytics.',
    invalidResultTitle: 'Revisa los campos',
    pageStatusLabel: 'Estado',
    liveTitle: 'Builder de PDF en navegador',
    liveBody: 'Vista previa y PDF corren en el navegador sin registro obligatorio.',
    futureTitle: 'Workflows avanzados de cuenta',
    futureBody: 'Datos guardados, recurrencia, marca, equipos, pagos y plantillas fiscales pertenecen a flujos futuros de cuenta.',
    useCaseTitle: 'Caso de uso',
    relatedTitle: 'Documentos relacionados',
    relatedBody: 'Cambia de tipo sin guardar cliente, items o importes.',
    futureListTitle: 'Opciones futuras de workflow',
    futureItems: ['Clientes y productos guardados', 'Recurrencia y recordatorios', 'Marca y aprobacion de equipo', 'Links de pago y conciliacion', 'Numeracion fiscal tras revision legal'],
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
    documentSnapshotEmpty: 'L apercu live calcule les totaux, verifie les dates et garde l action PDF prete.',
    downloadHint: 'Telechargez un PDF local apres le calcul du document.',
    resultTitle: 'Apercu',
    guideTitle: 'Guide et limites',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    freeCheckLabel: 'Document gratuit',
    upgradePathLabel: 'Offre payante',
    contentQualityBody: 'Cette page combine builder fonctionnel, FAQ, date de revue et limites claires du document gratuit.',
    privacyNote: 'Le builder s execute dans cette session navigateur. InvoiceCraft ne sauvegarde pas les champs du document et n envoie pas les valeurs a analytics.',
    invalidResultTitle: 'Verifiez les champs',
    pageStatusLabel: 'Statut',
    liveTitle: 'Builder PDF navigateur',
    liveBody: 'Apercu et PDF fonctionnent dans le navigateur sans compte obligatoire.',
    futureTitle: 'Workflows avances de compte',
    futureBody: 'Donnees sauvegardees, recurrence, marque, equipes, paiements et modeles fiscaux appartiennent aux futurs flux de compte.',
    useCaseTitle: 'Cas d usage',
    relatedTitle: 'Documents lies',
    relatedBody: 'Changez de type sans sauvegarder client, lignes ou montants.',
    futureListTitle: 'Options futures de workflow',
    futureItems: ['Clients et produits sauvegardes', 'Recurrence et rappels', 'Marque et approbation equipe', 'Liens paiement et reconciliation', 'Numerotation fiscale apres revue juridique'],
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
    documentSnapshotEmpty: 'Die Live-Vorschau berechnet Summen, prueft Daten und haelt die PDF-Aktion bereit.',
    downloadHint: 'Laden Sie ein lokales PDF herunter, nachdem die Vorschau das Dokument berechnet hat.',
    resultTitle: 'Vorschau',
    guideTitle: 'Leitfaden und Grenzen',
    faqTitle: 'FAQ',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    freeCheckLabel: 'Kostenloses Dokument',
    upgradePathLabel: 'Upgrade-Pfad',
    contentQualityBody: 'Diese Seite kombiniert Builder, FAQ, Pruefdatum und klare Grenzen des kostenlosen Dokuments.',
    privacyNote: 'Der Builder laeuft in dieser Browser-Sitzung. InvoiceCraft speichert keine Dokumentfelder und sendet keine Werte an Analytics.',
    invalidResultTitle: 'Felder pruefen',
    pageStatusLabel: 'Builderstatus',
    liveTitle: 'PDF-Builder im Browser',
    liveBody: 'Vorschau und PDF laufen im Browser ohne Pflichtkonto.',
    futureTitle: 'Erweiterte Konto-Workflows',
    futureBody: 'Gespeicherte Daten, Wiederholung, Branding, Teams, Zahlungen und Steuervorlagen gehoeren zu kuenftigen Konto-Workflows.',
    useCaseTitle: 'Anwendungsfall',
    relatedTitle: 'Verwandte Dokumente',
    relatedBody: 'Zwischen Dokumenttypen wechseln, ohne Kunden, Positionen oder Betraege zu speichern.',
    futureListTitle: 'Kuenftige Workflow-Optionen',
    futureItems: ['Gespeicherte Kunden und Produkte', 'Wiederkehrende Rechnungen und Erinnerungen', 'Branding und Teamfreigabe', 'Zahlungslinks und Abgleich', 'Steuernummerierung nach Rechtspruefung'],
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return sanitizePublicCopy(locale, homeCopy[locale])
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return sanitizePublicCopy(locale, shellCopy[locale])
}
