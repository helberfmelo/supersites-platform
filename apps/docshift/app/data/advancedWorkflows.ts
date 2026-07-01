import { sanitizePublicCopy, type LocaleCode } from './locales'

export interface DocShiftAdvancedWorkflowItem {
  title: string
  body: string
  current: string
  data: string
  gate: string
}

export interface DocShiftAdvancedWorkflowCopy {
  title: string
  body: string
  currentLabel: string
  dataLabel: string
  gateLabel: string
  items: DocShiftAdvancedWorkflowItem[]
}

const advancedWorkflowCopy: Record<LocaleCode, DocShiftAdvancedWorkflowCopy> = {
  en: {
    title: 'Advanced document workflow review',
    body: 'OCR, table extraction, Office conversion and server queues need privacy, retention and security review before files leave the browser. The free path remains browser-side.',
    currentLabel: 'Free path today',
    dataLabel: 'Data touched if enabled',
    gateLabel: 'Required review',
    items: [
      {
        title: 'OCR and table extraction',
        body: 'Text recognition can expose sensitive document content, so it is not part of the public free workflow.',
        current: 'Small PDF edits and text-to-PDF run in browser memory with pdf-lib.',
        data: 'PDF bytes, page images, extracted text, tables, language hints and confidence scores.',
        gate: 'Human approval of OCR terms, data transfer, retention, deletion, confidentiality and accuracy disclaimers.',
      },
      {
        title: 'Office and image conversion',
        body: 'DOCX, PPTX, spreadsheet and image conversions need a sandboxed server or approved file service before activation.',
        current: 'Plain text to PDF and browser-side PDF transforms only.',
        data: 'Uploaded files, embedded images, metadata, generated PDFs and conversion logs.',
        gate: 'File-type validation, sandboxing, antivirus where applicable, retention limit and export/delete controls.',
      },
      {
        title: 'Batch queue and API',
        body: 'Teams need batch folders, history and API jobs, but those features introduce account-backed storage and operational logs.',
        current: 'No upload API, saved history, team workspace, webhook or server queue is active.',
        data: 'Account identity, file payloads, job ids, status history, callbacks and audit events.',
        gate: 'Authentication, quotas, signed requests, webhook security, commercial entitlement, retention and privacy terms.',
      },
    ],
  },
  'pt-br': {
    title: 'Revisao de workflows documentais avancados',
    body: 'OCR, extracao de tabelas, conversao Office e filas no servidor precisam de revisao de privacidade, retencao e seguranca antes de arquivos sairem do navegador. O caminho gratuito segue no navegador.',
    currentLabel: 'Caminho gratuito hoje',
    dataLabel: 'Dados tocados se ativar',
    gateLabel: 'Revisao exigida',
    items: [
      {
        title: 'OCR e extracao de tabelas',
        body: 'Reconhecimento de texto pode expor conteudo sensivel do documento, entao nao faz parte do workflow publico gratuito.',
        current: 'Edicoes pequenas de PDF e texto para PDF rodam na memoria do navegador com pdf-lib.',
        data: 'Bytes de PDF, imagens de pagina, texto extraido, tabelas, idioma e scores de confianca.',
        gate: 'Aprovacao humana de termos OCR, transferencia, retencao, exclusao, confidencialidade e disclaimers de precisao.',
      },
      {
        title: 'Conversao Office e imagem',
        body: 'Conversoes DOCX, PPTX, planilha e imagem precisam de servidor em sandbox ou servico de arquivos aprovado antes da ativacao.',
        current: 'Texto simples para PDF e transformacoes PDF no navegador apenas.',
        data: 'Arquivos enviados, imagens embutidas, metadados, PDFs gerados e logs de conversao.',
        gate: 'Validacao de tipo de arquivo, sandbox, antivirus quando aplicavel, limite de retencao e exportacao/exclusao.',
      },
      {
        title: 'Fila em lote e API',
        body: 'Equipes precisam de pastas em lote, historico e jobs API, mas isso cria storage de conta e logs operacionais.',
        current: 'Nenhuma upload API, historico salvo, workspace de equipe, webhook ou fila de servidor esta ativa.',
        data: 'Identidade da conta, payloads de arquivo, ids de job, historico de status, callbacks e auditoria.',
        gate: 'Autenticacao, quotas, requests assinados, seguranca de webhook, entitlement, retencao e termos de privacidade.',
      },
    ],
  },
  es: {
    title: 'Revision de workflows documentales avanzados',
    body: 'OCR, tablas, conversion Office y colas servidor necesitan revision de privacidad, retencion y seguridad antes de que archivos salgan del navegador. La ruta gratis sigue en el navegador.',
    currentLabel: 'Ruta gratis hoy',
    dataLabel: 'Datos tocados si se activa',
    gateLabel: 'Revision requerida',
    items: [
      {
        title: 'OCR y extraccion de tablas',
        body: 'El reconocimiento de texto puede exponer contenido sensible, por eso no forma parte del workflow publico gratis.',
        current: 'Ediciones pequenas de PDF y texto a PDF corren en memoria del navegador con pdf-lib.',
        data: 'Bytes PDF, imagenes de pagina, texto extraido, tablas, idioma y scores de confianza.',
        gate: 'Aprobacion humana de terminos OCR, transferencia, retencion, borrado, confidencialidad y disclaimers de precision.',
      },
      {
        title: 'Conversion Office e imagen',
        body: 'Conversiones DOCX, PPTX, planillas e imagen requieren servidor sandbox o servicio de archivos aprobado antes de activarse.',
        current: 'Texto simple a PDF y transformaciones PDF en navegador solamente.',
        data: 'Archivos subidos, imagenes embebidas, metadatos, PDFs generados y logs de conversion.',
        gate: 'Validacion de tipo, sandbox, antivirus si aplica, limite de retencion y exportacion/borrado.',
      },
      {
        title: 'Cola batch y API',
        body: 'Equipos necesitan carpetas batch, historial y jobs API, pero eso introduce storage de cuenta y logs operativos.',
        current: 'No hay upload API, historial guardado, workspace, webhook ni cola servidor activa.',
        data: 'Identidad de cuenta, payloads, ids de job, historial de estado, callbacks y auditoria.',
        gate: 'Autenticacion, cuotas, requests firmados, seguridad webhook, entitlement, retencion y terminos de privacidad.',
      },
    ],
  },
  fr: {
    title: 'Revue des workflows documentaires avances',
    body: 'OCR, tableaux, conversion Office et queues serveur exigent une revue confidentialite, retention et securite avant que les fichiers quittent le navigateur. Le parcours gratuit reste navigateur.',
    currentLabel: 'Parcours gratuit actuel',
    dataLabel: 'Donnees touchees si active',
    gateLabel: 'Revue requise',
    items: [
      {
        title: 'OCR et extraction de tableaux',
        body: 'La reconnaissance texte peut exposer du contenu sensible, donc elle ne fait pas partie du workflow public gratuit.',
        current: 'Petites editions PDF et texte vers PDF tournent en memoire navigateur avec pdf-lib.',
        data: 'Octets PDF, images de page, texte extrait, tableaux, langue et scores de confiance.',
        gate: 'Approbation humaine des termes OCR, transfert, retention, suppression, confidentialite et disclaimers precision.',
      },
      {
        title: 'Conversion Office et image',
        body: 'Conversions DOCX, PPTX, tableurs et image exigent serveur sandbox ou service fichier approuve avant activation.',
        current: 'Texte simple vers PDF et transformations PDF navigateur seulement.',
        data: 'Fichiers charges, images integrees, metadonnees, PDFs generes et logs conversion.',
        gate: 'Validation type fichier, sandbox, antivirus si applicable, limite retention et export/suppression.',
      },
      {
        title: 'Queue batch et API',
        body: 'Les equipes ont besoin de dossiers batch, historique et jobs API, mais cela cree stockage compte et logs operationnels.',
        current: 'Aucune upload API, historique sauvegarde, workspace equipe, webhook ou queue serveur active.',
        data: 'Identite compte, payloads fichier, ids job, historique statut, callbacks et audit.',
        gate: 'Authentification, quotas, requetes signees, securite webhook, entitlement, retention et termes privacy.',
      },
    ],
  },
  de: {
    title: 'Review fuer erweiterte Dokument-Workflows',
    body: 'OCR, Tabellenextraktion, Office-Konvertierung und Server-Queues brauchen Privacy-, Retention- und Sicherheitsreview, bevor Dateien den Browser verlassen. Der freie Pfad bleibt im Browser.',
    currentLabel: 'Kostenloser Pfad heute',
    dataLabel: 'Daten bei Aktivierung',
    gateLabel: 'Erforderliches Review',
    items: [
      {
        title: 'OCR und Tabellenextraktion',
        body: 'Texterkennung kann sensible Dokumentinhalte offenlegen und ist deshalb nicht Teil des freien oeffentlichen Workflows.',
        current: 'Kleine PDF-Edits und Text-to-PDF laufen im Browser-Speicher mit pdf-lib.',
        data: 'PDF-Bytes, Seitenbilder, extrahierter Text, Tabellen, Sprache und Confidence Scores.',
        gate: 'Menschliche Freigabe von OCR-Terms, Datentransfer, Retention, Loeschung, Vertraulichkeit und Genauigkeits-Disclaimern.',
      },
      {
        title: 'Office- und Bildkonvertierung',
        body: 'DOCX-, PPTX-, Tabellen- und Bildkonvertierung braucht Sandbox-Server oder genehmigten Dateidienst vor Aktivierung.',
        current: 'Nur Plain Text zu PDF und browserseitige PDF-Transformationen.',
        data: 'Hochgeladene Dateien, eingebettete Bilder, Metadaten, generierte PDFs und Conversion Logs.',
        gate: 'Dateitypvalidierung, Sandbox, Antivirus falls noetig, Retention-Limit und Export/Loeschung.',
      },
      {
        title: 'Batch Queue und API',
        body: 'Teams brauchen Batch-Ordner, Verlauf und API-Jobs, aber das fuehrt Account-Speicher und Operationslogs ein.',
        current: 'Keine Upload API, kein gespeicherter Verlauf, Team Workspace, Webhook oder Server Queue aktiv.',
        data: 'Account-Identitaet, Datei-Payloads, Job-IDs, Statusverlauf, Callbacks und Audit Events.',
        gate: 'Authentifizierung, Quotas, signierte Requests, Webhook-Sicherheit, Entitlement, Retention und Privacy Terms.',
      },
    ],
  },
}

export function getDocShiftAdvancedWorkflowCopy(locale: LocaleCode): DocShiftAdvancedWorkflowCopy {
  return sanitizePublicCopy(locale, advancedWorkflowCopy[locale])
}
