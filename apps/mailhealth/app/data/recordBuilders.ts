import { sanitizePublicCopy, type LocaleCode } from './locales'

export const recordBuilderToolSlugs = ['spf-checker', 'dmarc-checker'] as const

export type RecordBuilderToolSlug = (typeof recordBuilderToolSlugs)[number]
export type SpfAllMechanism = '-all' | '~all' | '?all'
export type DmarcPolicy = 'none' | 'quarantine' | 'reject'
export type DmarcSubdomainPolicy = 'inherit' | DmarcPolicy
export type DmarcAlignment = 'r' | 's'

export interface SpfRecordBuilderInput {
  includes: string
  ip4: string
  ip6: string
  useMx: boolean
  useA: boolean
  all: SpfAllMechanism
}

export interface DmarcRecordBuilderInput {
  policy: DmarcPolicy
  subdomainPolicy: DmarcSubdomainPolicy
  pct: number
  rua: string
  ruf: string
  adkim: DmarcAlignment
  aspf: DmarcAlignment
}

export interface RecordBuilderResult {
  recordName: string
  recordType: 'TXT'
  value: string
  warnings: string[]
  steps: string[]
}

export interface RecordBuilderCopy {
  title: string
  body: string
  unavailableTitle: string
  unavailableBody: string
  spfTitle: string
  dmarcTitle: string
  includesLabel: string
  includesHelp: string
  ip4Label: string
  ip6Label: string
  useMxLabel: string
  useALabel: string
  allLabel: string
  policyLabel: string
  subdomainPolicyLabel: string
  pctLabel: string
  ruaLabel: string
  rufLabel: string
  alignmentLabel: string
  relaxedLabel: string
  strictLabel: string
  recordNameLabel: string
  recordTypeLabel: string
  recordValueLabel: string
  copyValueLabel: string
  warningsTitle: string
  stepsTitle: string
  options: {
    softFail: string
    hardFail: string
    neutral: string
    inherit: string
    none: string
    quarantine: string
    reject: string
  }
}

const builderCopy: Record<LocaleCode, RecordBuilderCopy> = {
  en: {
    title: 'Record builders',
    body: 'Build SPF or DMARC TXT values locally before editing DNS. MailHealth does not publish records or store these inputs.',
    unavailableTitle: 'Record builder limits',
    unavailableBody: 'Builders are active for SPF and DMARC. DKIM, MX, SMTP, reputation and header pages stay guide-only because provider setup varies.',
    spfTitle: 'SPF record builder',
    dmarcTitle: 'DMARC record builder',
    includesLabel: 'Include domains',
    includesHelp: 'Separate include hosts with spaces, commas or new lines.',
    ip4Label: 'IPv4 senders',
    ip6Label: 'IPv6 senders',
    useMxLabel: 'Allow MX hosts',
    useALabel: 'Allow A/AAAA host',
    allLabel: 'Default result',
    policyLabel: 'Domain policy',
    subdomainPolicyLabel: 'Subdomain policy',
    pctLabel: 'Rollout percent',
    ruaLabel: 'Aggregate report emails',
    rufLabel: 'Failure report emails',
    alignmentLabel: 'Alignment',
    relaxedLabel: 'Relaxed',
    strictLabel: 'Strict',
    recordNameLabel: 'Name',
    recordTypeLabel: 'Type',
    recordValueLabel: 'Value',
    copyValueLabel: 'Copy TXT value',
    warningsTitle: 'Review before publishing',
    stepsTitle: 'Suggested DNS steps',
    options: {
      softFail: '~all soft fail',
      hardFail: '-all hard fail',
      neutral: '?all neutral',
      inherit: 'Inherit domain policy',
      none: 'none',
      quarantine: 'quarantine',
      reject: 'reject',
    },
  },
  'pt-br': {
    title: 'Builders de registro',
    body: 'Monte valores TXT de SPF ou DMARC localmente antes de editar o DNS. O MailHealth nao publica registros nem armazena esses campos.',
    unavailableTitle: 'Limites dos builders',
    unavailableBody: 'Builders estao ativos para SPF e DMARC. DKIM, MX, SMTP, reputacao e headers continuam como guia porque a configuracao varia por provedor.',
    spfTitle: 'Builder de registro SPF',
    dmarcTitle: 'Builder de registro DMARC',
    includesLabel: 'Dominios include',
    includesHelp: 'Separe hosts include com espacos, virgulas ou novas linhas.',
    ip4Label: 'Remetentes IPv4',
    ip6Label: 'Remetentes IPv6',
    useMxLabel: 'Permitir hosts MX',
    useALabel: 'Permitir host A/AAAA',
    allLabel: 'Resultado padrao',
    policyLabel: 'Politica do dominio',
    subdomainPolicyLabel: 'Politica de subdominios',
    pctLabel: 'Percentual de rollout',
    ruaLabel: 'Emails de relatorio agregado',
    rufLabel: 'Emails de relatorio de falha',
    alignmentLabel: 'Alinhamento',
    relaxedLabel: 'Relaxado',
    strictLabel: 'Estrito',
    recordNameLabel: 'Nome',
    recordTypeLabel: 'Tipo',
    recordValueLabel: 'Valor',
    copyValueLabel: 'Copiar valor TXT',
    warningsTitle: 'Revise antes de publicar',
    stepsTitle: 'Passos sugeridos no DNS',
    options: {
      softFail: '~all soft fail',
      hardFail: '-all hard fail',
      neutral: '?all neutro',
      inherit: 'Herdar politica do dominio',
      none: 'none',
      quarantine: 'quarantine',
      reject: 'reject',
    },
  },
  es: {
    title: 'Builders de registro',
    body: 'Crea valores TXT de SPF o DMARC localmente antes de editar DNS. MailHealth no publica registros ni guarda estos campos.',
    unavailableTitle: 'Limites de builders',
    unavailableBody: 'Los builders estan activos para SPF y DMARC. DKIM, MX, SMTP, reputacion y headers quedan como guia porque cada proveedor cambia.',
    spfTitle: 'Builder de registro SPF',
    dmarcTitle: 'Builder de registro DMARC',
    includesLabel: 'Dominios include',
    includesHelp: 'Separa hosts include con espacios, comas o nuevas lineas.',
    ip4Label: 'Remitentes IPv4',
    ip6Label: 'Remitentes IPv6',
    useMxLabel: 'Permitir hosts MX',
    useALabel: 'Permitir host A/AAAA',
    allLabel: 'Resultado por defecto',
    policyLabel: 'Politica del dominio',
    subdomainPolicyLabel: 'Politica de subdominios',
    pctLabel: 'Porcentaje de rollout',
    ruaLabel: 'Emails de reporte agregado',
    rufLabel: 'Emails de reporte de fallo',
    alignmentLabel: 'Alineacion',
    relaxedLabel: 'Relajada',
    strictLabel: 'Estricta',
    recordNameLabel: 'Nombre',
    recordTypeLabel: 'Tipo',
    recordValueLabel: 'Valor',
    copyValueLabel: 'Copiar valor TXT',
    warningsTitle: 'Revisa antes de publicar',
    stepsTitle: 'Pasos sugeridos en DNS',
    options: {
      softFail: '~all soft fail',
      hardFail: '-all hard fail',
      neutral: '?all neutral',
      inherit: 'Heredar politica del dominio',
      none: 'none',
      quarantine: 'quarantine',
      reject: 'reject',
    },
  },
  fr: {
    title: 'Builders de records',
    body: 'Creez des valeurs TXT SPF ou DMARC localement avant de modifier le DNS. MailHealth ne publie pas les records et ne stocke pas ces champs.',
    unavailableTitle: 'Limites des builders',
    unavailableBody: 'Les builders sont actifs pour SPF et DMARC. DKIM, MX, SMTP, reputation et headers restent en guide car chaque fournisseur varie.',
    spfTitle: 'Builder record SPF',
    dmarcTitle: 'Builder record DMARC',
    includesLabel: 'Domaines include',
    includesHelp: 'Separez les hosts include par espaces, virgules ou nouvelles lignes.',
    ip4Label: 'Expediteurs IPv4',
    ip6Label: 'Expediteurs IPv6',
    useMxLabel: 'Autoriser les hosts MX',
    useALabel: 'Autoriser le host A/AAAA',
    allLabel: 'Resultat par defaut',
    policyLabel: 'Politique domaine',
    subdomainPolicyLabel: 'Politique sous-domaines',
    pctLabel: 'Pourcentage rollout',
    ruaLabel: 'Emails rapports agreges',
    rufLabel: 'Emails rapports echec',
    alignmentLabel: 'Alignement',
    relaxedLabel: 'Relache',
    strictLabel: 'Strict',
    recordNameLabel: 'Nom',
    recordTypeLabel: 'Type',
    recordValueLabel: 'Valeur',
    copyValueLabel: 'Copier valeur TXT',
    warningsTitle: 'A revoir avant publication',
    stepsTitle: 'Etapes DNS suggerees',
    options: {
      softFail: '~all soft fail',
      hardFail: '-all hard fail',
      neutral: '?all neutre',
      inherit: 'Heriter la politique domaine',
      none: 'none',
      quarantine: 'quarantine',
      reject: 'reject',
    },
  },
  de: {
    title: 'Record Builder',
    body: 'Erstellen Sie SPF- oder DMARC-TXT-Werte lokal, bevor Sie DNS bearbeiten. MailHealth veroeffentlicht keine Records und speichert diese Eingaben nicht.',
    unavailableTitle: 'Builder-Grenzen',
    unavailableBody: 'Builder sind fuer SPF und DMARC aktiv. DKIM, MX, SMTP, Reputation und Header bleiben Leitfaden, weil Provider-Setups variieren.',
    spfTitle: 'SPF Record Builder',
    dmarcTitle: 'DMARC Record Builder',
    includesLabel: 'Include-Domains',
    includesHelp: 'Include-Hosts mit Leerzeichen, Kommas oder neuen Zeilen trennen.',
    ip4Label: 'IPv4-Sender',
    ip6Label: 'IPv6-Sender',
    useMxLabel: 'MX-Hosts erlauben',
    useALabel: 'A/AAAA-Host erlauben',
    allLabel: 'Standardergebnis',
    policyLabel: 'Domain-Policy',
    subdomainPolicyLabel: 'Subdomain-Policy',
    pctLabel: 'Rollout-Prozent',
    ruaLabel: 'Aggregate Report E-Mails',
    rufLabel: 'Failure Report E-Mails',
    alignmentLabel: 'Alignment',
    relaxedLabel: 'Relaxed',
    strictLabel: 'Strict',
    recordNameLabel: 'Name',
    recordTypeLabel: 'Typ',
    recordValueLabel: 'Wert',
    copyValueLabel: 'TXT-Wert kopieren',
    warningsTitle: 'Vor Veroeffentlichung pruefen',
    stepsTitle: 'Empfohlene DNS-Schritte',
    options: {
      softFail: '~all Soft Fail',
      hardFail: '-all Hard Fail',
      neutral: '?all Neutral',
      inherit: 'Domain-Policy uebernehmen',
      none: 'none',
      quarantine: 'quarantine',
      reject: 'reject',
    },
  },
}

const spfWarningCopy: Record<LocaleCode, Record<string, string>> = {
  en: {
    noSender: 'Add at least one approved sender before publishing.',
    hardFail: 'Use -all only after every legitimate sender is listed.',
    softFail: '~all is useful while migrating but weaker than -all.',
    neutral: '?all rarely protects delivery or spoofing posture.',
    ignored: 'Some entries were ignored because they were empty, duplicated or over the local limit.',
  },
  'pt-br': {
    noSender: 'Adicione ao menos um remetente aprovado antes de publicar.',
    hardFail: 'Use -all somente depois que todos os remetentes legitimos estiverem listados.',
    softFail: '~all ajuda em migracao, mas e mais fraco que -all.',
    neutral: '?all raramente protege entrega ou postura contra spoofing.',
    ignored: 'Algumas entradas foram ignoradas por estarem vazias, duplicadas ou acima do limite local.',
  },
  es: {
    noSender: 'Agrega al menos un remitente aprobado antes de publicar.',
    hardFail: 'Usa -all solo despues de listar todos los remitentes legitimos.',
    softFail: '~all ayuda durante migracion, pero es mas debil que -all.',
    neutral: '?all rara vez mejora entrega o postura contra spoofing.',
    ignored: 'Algunas entradas se ignoraron por estar vacias, duplicadas o sobre el limite local.',
  },
  fr: {
    noSender: 'Ajoutez au moins un expediteur approuve avant publication.',
    hardFail: 'Utilisez -all seulement quand tous les expediteurs legitimes sont listes.',
    softFail: '~all aide en migration mais reste plus faible que -all.',
    neutral: '?all protege rarement la deliverabilite ou l anti-spoofing.',
    ignored: 'Certaines entrees ont ete ignorees car vides, dupliquees ou au-dessus de la limite locale.',
  },
  de: {
    noSender: 'Vor der Veroeffentlichung mindestens einen erlaubten Sender eintragen.',
    hardFail: '-all erst nutzen, wenn alle legitimen Sender gelistet sind.',
    softFail: '~all hilft bei Migrationen, ist aber schwaecher als -all.',
    neutral: '?all schuetzt Zustellung oder Anti-Spoofing selten.',
    ignored: 'Einige Eintraege wurden ignoriert, weil sie leer, doppelt oder ueber dem lokalen Limit waren.',
  },
}

const dmarcWarningCopy: Record<LocaleCode, Record<string, string>> = {
  en: {
    none: 'p=none observes traffic but does not ask receivers to quarantine or reject spoofed mail.',
    reports: 'Add a rua address before moving beyond observation.',
    pct: 'A pct below 100 is a staged rollout; revisit it after review.',
    ruf: 'ruf failure reports can contain message samples; use only with an address prepared for sensitive data.',
  },
  'pt-br': {
    none: 'p=none observa o trafego, mas nao pede quarentena ou rejeicao de spoofing.',
    reports: 'Adicione um endereco rua antes de sair da fase de observacao.',
    pct: 'pct abaixo de 100 e rollout gradual; revise depois da analise.',
    ruf: 'Relatorios ruf podem conter amostras da mensagem; use apenas com endereco preparado para dados sensiveis.',
  },
  es: {
    none: 'p=none observa trafico, pero no pide cuarentena ni rechazo de spoofing.',
    reports: 'Agrega una direccion rua antes de salir de observacion.',
    pct: 'pct menor que 100 es rollout gradual; revisalo despues del analisis.',
    ruf: 'Reportes ruf pueden contener muestras del mensaje; usa solo una direccion preparada para datos sensibles.',
  },
  fr: {
    none: 'p=none observe le trafic mais ne demande pas quarantaine ou rejet du spoofing.',
    reports: 'Ajoutez une adresse rua avant de sortir de l observation.',
    pct: 'pct sous 100 indique un rollout progressif; a revoir apres analyse.',
    ruf: 'Les rapports ruf peuvent contenir des extraits de message; utilisez une adresse preparee aux donnees sensibles.',
  },
  de: {
    none: 'p=none beobachtet Traffic, fordert aber keine Quarantaene oder Ablehnung fuer Spoofing an.',
    reports: 'Vor dem Wechsel aus Beobachtung eine rua-Adresse ergaenzen.',
    pct: 'pct unter 100 ist ein gestaffelter Rollout; nach Review erneut pruefen.',
    ruf: 'ruf-Fehlerberichte koennen Nachrichtenauszuege enthalten; nur mit geeigneter Adresse nutzen.',
  },
}

const stepCopy: Record<LocaleCode, { spf: string[]; dmarc: string[] }> = {
  en: {
    spf: ['Create or replace one TXT record at the root host.', 'Keep only one SPF record for the domain.', 'Run the SPF check again after DNS propagation.'],
    dmarc: ['Create a TXT record at _dmarc.', 'Start with observation if reports are not reviewed yet.', 'Run the DMARC check again after DNS propagation.'],
  },
  'pt-br': {
    spf: ['Crie ou substitua um registro TXT no host raiz.', 'Mantenha apenas um registro SPF no dominio.', 'Rode o check SPF novamente apos a propagacao DNS.'],
    dmarc: ['Crie um registro TXT em _dmarc.', 'Comece em observacao se os relatorios ainda nao forem revisados.', 'Rode o check DMARC novamente apos a propagacao DNS.'],
  },
  es: {
    spf: ['Crea o reemplaza un registro TXT en el host raiz.', 'Manten solo un registro SPF en el dominio.', 'Ejecuta el check SPF otra vez despues de la propagacion DNS.'],
    dmarc: ['Crea un registro TXT en _dmarc.', 'Empieza en observacion si los reportes aun no se revisan.', 'Ejecuta el check DMARC otra vez despues de la propagacion DNS.'],
  },
  fr: {
    spf: ['Creez ou remplacez un record TXT sur le host racine.', 'Gardez un seul record SPF pour le domaine.', 'Relancez le controle SPF apres propagation DNS.'],
    dmarc: ['Creez un record TXT sur _dmarc.', 'Commencez en observation si les rapports ne sont pas encore revus.', 'Relancez le controle DMARC apres propagation DNS.'],
  },
  de: {
    spf: ['Einen TXT-Record am Root-Host erstellen oder ersetzen.', 'Nur einen SPF-Record fuer die Domain behalten.', 'SPF-Check nach DNS-Propagation erneut ausfuehren.'],
    dmarc: ['Einen TXT-Record bei _dmarc erstellen.', 'Mit Beobachtung starten, wenn Reports noch nicht ausgewertet werden.', 'DMARC-Check nach DNS-Propagation erneut ausfuehren.'],
  },
}

const MAX_TERMS = 8

export function getRecordBuilderCopy(locale: LocaleCode): RecordBuilderCopy {
  return sanitizePublicCopy(locale, builderCopy[locale])
}

export function isRecordBuilderTool(slug: string): slug is RecordBuilderToolSlug {
  return recordBuilderToolSlugs.includes(slug as RecordBuilderToolSlug)
}

function parseLimitedTerms(value: string, prefix: 'include' | 'ip4' | 'ip6'): { terms: string[]; ignored: boolean } {
  const seen = new Set<string>()
  const terms: string[] = []
  let ignored = false

  for (const rawTerm of value.split(/[\s,;]+/g)) {
    const normalized = rawTerm.trim().replace(new RegExp(`^${prefix}:`, 'i'), '')

    if (!normalized) {
      continue
    }

    const safeTerm = normalized.replace(/[^a-zA-Z0-9:./_-]/g, '')
    const key = safeTerm.toLowerCase()

    if (!safeTerm || seen.has(key) || terms.length >= MAX_TERMS) {
      ignored = true
      continue
    }

    seen.add(key)
    terms.push(`${prefix}:${safeTerm}`)
  }

  return { terms, ignored }
}

function uniqueMessages(messages: string[]): string[] {
  return [...new Set(messages.filter(Boolean))]
}

export function buildSpfRecord(input: SpfRecordBuilderInput, locale: LocaleCode = 'en'): RecordBuilderResult {
  const copy = spfWarningCopy[locale]
  const includes = parseLimitedTerms(input.includes, 'include')
  const ip4 = parseLimitedTerms(input.ip4, 'ip4')
  const ip6 = parseLimitedTerms(input.ip6, 'ip6')
  const mechanisms = [
    ...includes.terms,
    ...ip4.terms,
    ...ip6.terms,
    input.useMx ? 'mx' : '',
    input.useA ? 'a' : '',
  ].filter(Boolean)
  const all = ['-all', '~all', '?all'].includes(input.all) ? input.all : '~all'
  const warnings: string[] = []

  if (!mechanisms.length) {
    warnings.push(copy.noSender)
  }

  if (all === '-all') {
    warnings.push(copy.hardFail)
  } else if (all === '~all') {
    warnings.push(copy.softFail)
  } else {
    warnings.push(copy.neutral)
  }

  if (includes.ignored || ip4.ignored || ip6.ignored) {
    warnings.push(copy.ignored)
  }

  return {
    recordName: '@',
    recordType: 'TXT',
    value: ['v=spf1', ...mechanisms, all].join(' '),
    warnings: uniqueMessages(warnings),
    steps: stepCopy[locale].spf,
  }
}

function parseMailtoList(value: string): { emails: string[]; ignored: boolean } {
  const seen = new Set<string>()
  const emails: string[] = []
  let ignored = false

  for (const rawEmail of value.split(/[\s,;]+/g)) {
    const trimmed = rawEmail.trim().replace(/^mailto:/i, '')

    if (!trimmed) {
      continue
    }

    const safeEmail = trimmed.replace(/[^a-zA-Z0-9._%+-@]/g, '')
    const key = safeEmail.toLowerCase()

    if (!safeEmail.includes('@') || seen.has(key) || emails.length >= 4) {
      ignored = true
      continue
    }

    seen.add(key)
    emails.push(`mailto:${safeEmail}`)
  }

  return { emails, ignored }
}

function clampPct(value: number): number {
  if (!Number.isFinite(value)) {
    return 100
  }

  return Math.min(100, Math.max(1, Math.round(value)))
}

export function buildDmarcRecord(input: DmarcRecordBuilderInput, locale: LocaleCode = 'en'): RecordBuilderResult {
  const copy = dmarcWarningCopy[locale]
  const policy = ['none', 'quarantine', 'reject'].includes(input.policy) ? input.policy : 'none'
  const subdomainPolicy = ['inherit', 'none', 'quarantine', 'reject'].includes(input.subdomainPolicy) ? input.subdomainPolicy : 'inherit'
  const pct = clampPct(input.pct)
  const rua = parseMailtoList(input.rua)
  const ruf = parseMailtoList(input.ruf)
  const adkim = input.adkim === 's' ? 's' : 'r'
  const aspf = input.aspf === 's' ? 's' : 'r'
  const parts = ['v=DMARC1', `p=${policy}`]
  const warnings: string[] = []

  if (subdomainPolicy !== 'inherit') {
    parts.push(`sp=${subdomainPolicy}`)
  }

  if (pct < 100) {
    parts.push(`pct=${pct}`)
    warnings.push(copy.pct)
  }

  if (rua.emails.length) {
    parts.push(`rua=${rua.emails.join(',')}`)
  }

  if (ruf.emails.length) {
    parts.push(`ruf=${ruf.emails.join(',')}`)
    warnings.push(copy.ruf)
  }

  parts.push(`adkim=${adkim}`, `aspf=${aspf}`)

  if (policy === 'none') {
    warnings.push(copy.none)
  }

  if (!rua.emails.length) {
    warnings.push(copy.reports)
  }

  if (rua.ignored || ruf.ignored) {
    warnings.push(copy.reports)
  }

  return {
    recordName: '_dmarc',
    recordType: 'TXT',
    value: parts.join('; '),
    warnings: uniqueMessages(warnings),
    steps: stepCopy[locale].dmarc,
  }
}
