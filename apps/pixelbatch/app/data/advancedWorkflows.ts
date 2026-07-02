import { sanitizePublicCopy, type LocaleCode } from './locales'

export interface PixelBatchAdvancedWorkflowItem {
  title: string
  body: string
  current: string
  data: string
  gate: string
}

export interface PixelBatchAdvancedWorkflowCopy {
  title: string
  body: string
  currentLabel: string
  dataLabel: string
  gateLabel: string
  items: PixelBatchAdvancedWorkflowItem[]
}

const advancedWorkflowCopy: Record<LocaleCode, PixelBatchAdvancedWorkflowCopy> = {
  en: {
    title: 'Advanced image workflows',
    body: 'Background cleanup, large conversion queues and API integrations require explicit data and safety controls. The free tool remains a local one-image workflow.',
    currentLabel: 'Free path today',
    dataLabel: 'Data touched if enabled',
    gateLabel: 'Controls needed',
    items: [
      {
        title: 'Background cleanup',
        body: 'Subject masking or background removal would require AI or segmentation infrastructure, so the public tool does not send pixels out of the browser.',
        current: 'Resize, crop, compress, convert and metadata cleanup run locally for one image.',
        data: 'Image bytes, derived masks, previews and output files.',
        gate: 'Clear provider terms, data transfer notice, retention limits, deletion controls, disclosure and credit-cost limits.',
      },
      {
        title: 'High-volume conversion',
        body: 'Bulk folders and high-resolution queues need account upload controls for a paid workflow.',
        current: 'One selected image, browser memory and object URLs only.',
        data: 'File names, image bytes, job metadata, output format and delivery status.',
        gate: 'Authenticated account, quotas, upload validation, sandboxing, retention and export/delete controls.',
      },
      {
        title: 'API and integrations',
        body: 'Automation is useful for teams, but it changes the data boundary from browser-only to account-backed jobs.',
        current: 'No public upload API, webhook, connector or saved preset storage is active.',
        data: 'API identity, file payloads, job ids, callback URLs and audit events.',
        gate: 'Signed requests, rate limits, abuse review, webhook security, account entitlement and privacy terms.',
      },
    ],
  },
  'pt-br': {
    title: 'Workflows avancados de imagem',
    body: 'Remocao de fundo, filas grandes de conversao e integracoes API exigem controles explicitos de dados e seguranca. A ferramenta gratuita segue local para uma imagem.',
    currentLabel: 'Caminho gratuito hoje',
    dataLabel: 'Dados tocados se ativar',
    gateLabel: 'Controles necessarios',
    items: [
      {
        title: 'Remocao de fundo',
        body: 'Mascaras de sujeito ou remocao de fundo exigiriam IA ou infraestrutura de segmentacao, entao a ferramenta publica nao envia pixels para fora do navegador.',
        current: 'Redimensionar, cortar, comprimir, converter e limpar metadados rodam localmente para uma imagem.',
        data: 'Bytes da imagem, mascaras derivadas, previews e arquivos finais.',
        gate: 'Termos claros do provider, aviso de transferencia, limites de retencao, controles de exclusao, divulgacao e limite de custo de creditos.',
      },
      {
        title: 'Conversao em alto volume',
        body: 'Pastas em lote e filas de alta resolucao precisam de controles de upload em conta para um workflow pago.',
        current: 'Uma imagem selecionada, memoria do navegador e object URLs apenas.',
        data: 'Nomes de arquivo, bytes de imagem, metadata de job, formato de saida e status de entrega.',
        gate: 'Conta autenticada, quotas, validacao de upload, sandbox, retencao e exportacao/exclusao.',
      },
      {
        title: 'API e integracoes',
        body: 'Automacao ajuda equipes, mas muda a fronteira de dados de somente navegador para jobs de conta.',
        current: 'Nenhuma upload API publica, webhook, conector ou storage de preset esta ativo.',
        data: 'Identidade API, payloads de arquivo, ids de job, URLs de callback e auditoria.',
        gate: 'Requests assinados, rate limits, revisao antiabuso, seguranca de webhook, entitlement de conta e termos de privacidade.',
      },
    ],
  },
  es: {
    title: 'Workflows avanzados de imagen',
    body: 'Limpieza de fondo, colas grandes de conversion e integraciones API requieren controles explicitos de datos y seguridad. La herramienta gratis sigue local para una imagen.',
    currentLabel: 'Ruta gratis hoy',
    dataLabel: 'Datos tocados si se activa',
    gateLabel: 'Control requerido',
    items: [
      {
        title: 'Limpieza de fondo',
        body: 'Mascaras de sujeto o remocion de fondo requeririan IA o segmentacion, por eso la herramienta publica no envia pixeles fuera del navegador.',
        current: 'Resize, crop, compresion, conversion y metadata corren localmente para una imagen.',
        data: 'Bytes de imagen, mascaras derivadas, vistas previas y archivos finales.',
        gate: 'Terminos claros del provider, aviso de transferencia, limites de retencion, borrado, disclosure y limite de costo de creditos.',
      },
      {
        title: 'Conversion de alto volumen',
        body: 'Carpetas batch y colas de alta resolucion necesitan controles de upload con cuenta para un workflow pago.',
        current: 'Una imagen seleccionada, memoria del navegador y object URLs solamente.',
        data: 'Nombres de archivo, bytes de imagen, metadata de job, formato de salida y estado de entrega.',
        gate: 'Cuenta autenticada, cuotas, validacion de upload, sandbox, retencion y exportacion/borrado.',
      },
      {
        title: 'API e integraciones',
        body: 'La automatizacion sirve a equipos, pero cambia la frontera de datos de navegador a jobs con cuenta.',
        current: 'No hay upload API publica, webhook, conector ni storage de presets activo.',
        data: 'Identidad API, payloads de archivo, ids de job, callbacks y eventos de auditoria.',
        gate: 'Requests firmados, rate limits, revision antiabuso, seguridad webhook, entitlement de cuenta y terminos de privacidad.',
      },
    ],
  },
  fr: {
    title: 'Workflows image avances',
    body: 'Suppression de fond, grandes files de conversion et integrations API exigent des controles explicites de donnees et securite. L outil gratuit reste local pour une image.',
    currentLabel: 'Parcours gratuit actuel',
    dataLabel: 'Donnees touchees si active',
    gateLabel: 'Controles necessaires',
    items: [
      {
        title: 'Suppression de fond',
        body: 'Masques de sujet ou suppression de fond exigeraient IA ou segmentation; l outil public n envoie donc pas les pixels hors navigateur.',
        current: 'Resize, crop, compression, conversion et nettoyage metadata tournent localement pour une image.',
        data: 'Octets image, masques derives, apercus et fichiers de sortie.',
        gate: 'Termes provider clairs, avis de transfert, limites retention, suppression, disclosure et limite de cout credit.',
      },
      {
        title: 'Conversion haut volume',
        body: 'Dossiers batch et files haute resolution exigent des controles upload avec compte pour un workflow payant.',
        current: 'Une image choisie, memoire navigateur et object URLs seulement.',
        data: 'Noms de fichier, octets image, metadata de job, format sortie et statut livraison.',
        gate: 'Compte authentifie, quotas, validation upload, sandbox, retention et export/suppression.',
      },
      {
        title: 'API et integrations',
        body: 'L automatisation est utile aux equipes, mais deplace la frontiere des donnees vers des jobs avec compte.',
        current: 'Aucune upload API publique, webhook, connecteur ou stockage preset actif.',
        data: 'Identite API, payloads fichier, ids job, callbacks et evenements audit.',
        gate: 'Requetes signees, rate limits, revue antiabuse, securite webhook, entitlement et termes privacy.',
      },
    ],
  },
  de: {
    title: 'Erweiterte Bild-Workflows',
    body: 'Background Cleanup, grosse Conversion-Queues und API-Integrationen brauchen ausdrueckliche Daten- und Sicherheitskontrollen. Das freie Tool bleibt lokal fuer ein Bild.',
    currentLabel: 'Kostenloser Pfad heute',
    dataLabel: 'Daten bei Aktivierung',
    gateLabel: 'Noetige Kontrollen',
    items: [
      {
        title: 'Background Cleanup',
        body: 'Subject Masks oder Hintergrundentfernung wuerden KI oder Segmentierung brauchen; das oeffentliche Tool sendet keine Pixel aus dem Browser.',
        current: 'Groesse, Zuschnitt, Kompression, Konvertierung und Metadaten laufen lokal fuer ein Bild.',
        data: 'Bildbytes, abgeleitete Masken, Vorschauen und Ausgabedateien.',
        gate: 'Klare Provider-Bedingungen, Transferhinweis, Retention-Limits, Loeschkontrollen, Disclosure und Credit-Kostenlimit.',
      },
      {
        title: 'High-volume Conversion',
        body: 'Batch-Ordner und High-Res-Queues brauchen Upload-Kontrollen mit Konto fuer bezahlte Workflows.',
        current: 'Ein ausgewaehltes Bild, Browser-Speicher und Object URLs.',
        data: 'Dateinamen, Bildbytes, Job-Metadata, Ausgabeformat und Lieferstatus.',
        gate: 'Authentifiziertes Konto, Quotas, Upload-Validierung, Sandbox, Retention und Export/Loeschung.',
      },
      {
        title: 'API und Integrationen',
        body: 'Automatisierung ist fuer Teams nuetzlich, verschiebt die Datengrenze aber zu accountbasierten Jobs.',
        current: 'Keine oeffentliche Upload API, kein Webhook, Connector oder Preset-Speicher aktiv.',
        data: 'API-Identitaet, Datei-Payloads, Job-IDs, Callback-URLs und Audit-Events.',
        gate: 'Signierte Requests, Rate Limits, Abuse Review, Webhook-Sicherheit, Entitlement und Privacy Terms.',
      },
    ],
  },
}

export function getPixelBatchAdvancedWorkflowCopy(locale: LocaleCode): PixelBatchAdvancedWorkflowCopy {
  return sanitizePublicCopy(locale, advancedWorkflowCopy[locale])
}
