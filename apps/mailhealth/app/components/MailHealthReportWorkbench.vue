<script setup lang="ts">
import { getButtonClass } from '@supersites/ui'
import { computed, onMounted, ref } from 'vue'
import { getShellCopy } from '../data/copy'
import { localizedHomePath, type LocaleCode } from '../data/locales'
import { analyzeMailHeaders, createMailHealthScoreCard } from '../data/tools'
import { trackMailHealthEvent } from '../utils/analytics'

type ReportKey = 'spf' | 'dkim' | 'dmarc' | 'mx' | 'blacklist' | 'smtp' | 'headers'
type ReportTone = 'pass' | 'warn' | 'fail'

interface MailHealthFinding {
  label: string
  status?: string
  detail: string
  value?: string | number | boolean | null
}

interface MailHealthApiData {
  check: string
  status: string
  summary: string
  findings: MailHealthFinding[]
  records?: Array<Record<string, unknown>>
  probes?: Array<Record<string, unknown>>
  warnings?: string[]
}

interface ApiResponse<T> {
  data: T
  meta: Record<string, unknown>
}

interface ReportSection {
  key: ReportKey
  label: string
  category: string
  status: string
  tone: ReportTone
  summary: string
  guidance: string
  findings: MailHealthFinding[]
  meta: Array<{ label: string; value: string }>
}

interface ReportCopy {
  eyebrow: string
  title: string
  body: string
  domainLabel: string
  selectorLabel: string
  portLabel: string
  headersLabel: string
  headersHint: string
  runLabel: string
  runningLabel: string
  resetLabel: string
  scoreLabel: string
  checklistLabel: string
  emptySummary: string
  healthySummary: string
  failedSummary: (count: number) => string
  warningSummary: (count: number) => string
  reportStatusLabel: string
  guidanceLabel: string
  safeguardsLabel: string
  safeguards: string[]
  categories: Record<ReportKey, string>
  guidance: Record<ReportKey, string>
  headerMissing: string
}

const props = defineProps<{
  locale: LocaleCode
}>()

const reportCopy: Record<LocaleCode, ReportCopy> = {
  en: {
    eyebrow: 'Domain health report',
    title: 'Run one email health report across the signals receivers inspect.',
    body: 'Check SPF, DKIM, DMARC, MX, blacklist sample, SMTP reachability and optional headers in one point-in-time report.',
    domainLabel: 'Domain name',
    selectorLabel: 'DKIM selector',
    portLabel: 'SMTP port',
    headersLabel: 'Optional raw headers',
    headersHint: 'Headers stay in the browser and are never sent to the MailHealth API.',
    runLabel: 'Run domain report',
    runningLabel: 'Running bounded checks...',
    resetLabel: 'Reset report',
    scoreLabel: 'Unified score',
    checklistLabel: 'Report checklist',
    emptySummary: 'Run a report to score visible authentication, DNS, reputation, SMTP and header signals.',
    healthySummary: 'Visible signals in this point-in-time report look healthy.',
    failedSummary: (count: number) => `${count} checks need attention before this domain should be treated as healthy.`,
    warningSummary: (count: number) => `${count} checks returned warnings. Review the guidance before monitoring or changing DNS.`,
    reportStatusLabel: 'Report status',
    guidanceLabel: 'Provider-neutral guidance',
    safeguardsLabel: 'Report safeguards',
    safeguards: ['No saved domains', 'Rate-limited API calls', 'No SMTP message sent', 'Headers parsed locally'],
    categories: {
      spf: 'SPF',
      dkim: 'DKIM',
      dmarc: 'DMARC',
      mx: 'MX',
      blacklist: 'Blacklist',
      smtp: 'SMTP',
      headers: 'Headers',
    },
    guidance: {
      spf: 'Keep one SPF record, avoid permissive +all and review lookup-heavy includes before changing DNS.',
      dkim: 'Confirm the active selector publishes a key and rotate selectors through your mail provider, not inside this free check.',
      dmarc: 'Use reports to validate legitimate senders before moving from p=none toward quarantine or reject.',
      mx: 'Confirm MX priority, public host resolution and provider ownership before debugging mailbox delivery.',
      blacklist: 'Treat DNSBL listings as investigation pointers and confirm policy directly with the listing provider.',
      smtp: 'This is TCP reachability only; compare failures with provider status and firewall rules before changing records.',
      headers: 'Use Authentication-Results from the receiving system to compare SPF, DKIM, DMARC and visible alignment.',
    },
    headerMissing: 'Paste optional headers to include message-level authentication signals in the report.',
  },
  'pt-br': {
    eyebrow: 'Relatorio de dominio',
    title: 'Execute um relatorio de email nos sinais que provedores observam.',
    body: 'Verifique SPF, DKIM, DMARC, MX, amostra de blacklist, SMTP e headers opcionais em um fluxo pontual.',
    domainLabel: 'Nome de dominio',
    selectorLabel: 'Seletor DKIM',
    portLabel: 'Porta SMTP',
    headersLabel: 'Headers brutos opcionais',
    headersHint: 'Headers ficam no navegador e nunca sao enviados para a API do MailHealth.',
    runLabel: 'Executar relatorio',
    runningLabel: 'Executando checks limitados...',
    resetLabel: 'Limpar relatorio',
    scoreLabel: 'Score unificado',
    checklistLabel: 'Checklist do relatorio',
    emptySummary: 'Execute um relatorio para pontuar autenticacao, DNS, reputacao, SMTP e headers visiveis.',
    healthySummary: 'Os sinais visiveis neste relatorio pontual parecem saudaveis.',
    failedSummary: (count: number) => `${count} checks precisam de atencao antes de tratar este dominio como saudavel.`,
    warningSummary: (count: number) => `${count} checks retornaram avisos. Revise o guia antes de monitorar ou alterar DNS.`,
    reportStatusLabel: 'Status do relatorio',
    guidanceLabel: 'Guia neutro por provedor',
    safeguardsLabel: 'Protecoes do relatorio',
    safeguards: ['Sem dominios salvos', 'API com rate limit', 'Nenhum email SMTP enviado', 'Headers analisados localmente'],
    categories: {
      spf: 'SPF',
      dkim: 'DKIM',
      dmarc: 'DMARC',
      mx: 'MX',
      blacklist: 'Blacklist',
      smtp: 'SMTP',
      headers: 'Headers',
    },
    guidance: {
      spf: 'Mantenha um unico SPF, evite +all permissivo e revise includes pesados antes de mudar DNS.',
      dkim: 'Confirme que o seletor ativo publica chave e faca rotacao pelo provedor de email, fora deste check gratuito.',
      dmarc: 'Use relatorios para validar remetentes legitimos antes de sair de p=none para quarantine ou reject.',
      mx: 'Confirme prioridade MX, resolucao publica e provedor responsavel antes de depurar entrega.',
      blacklist: 'Trate listagens DNSBL como pistas de investigacao e confirme a politica com o provedor da lista.',
      smtp: 'Este teste e apenas TCP; compare falhas com status do provedor e firewall antes de mudar registros.',
      headers: 'Use Authentication-Results do sistema receptor para comparar SPF, DKIM, DMARC e alinhamento visivel.',
    },
    headerMissing: 'Cole headers opcionais para incluir sinais de autenticacao da mensagem no relatorio.',
  },
  es: {
    eyebrow: 'Reporte de dominio',
    title: 'Ejecuta un reporte de email con las senales que revisan los proveedores.',
    body: 'Verifica SPF, DKIM, DMARC, MX, muestra de blacklist, SMTP y headers opcionales en un flujo puntual.',
    domainLabel: 'Nombre de dominio',
    selectorLabel: 'Selector DKIM',
    portLabel: 'Puerto SMTP',
    headersLabel: 'Headers brutos opcionales',
    headersHint: 'Los headers quedan en el navegador y nunca se envian a la API de MailHealth.',
    runLabel: 'Ejecutar reporte',
    runningLabel: 'Ejecutando checks limitados...',
    resetLabel: 'Limpiar reporte',
    scoreLabel: 'Score unificado',
    checklistLabel: 'Checklist del reporte',
    emptySummary: 'Ejecuta un reporte para puntuar autenticacion, DNS, reputacion, SMTP y headers visibles.',
    healthySummary: 'Las senales visibles en este reporte puntual se ven saludables.',
    failedSummary: (count: number) => `${count} checks necesitan atencion antes de tratar este dominio como saludable.`,
    warningSummary: (count: number) => `${count} checks devolvieron avisos. Revisa la guia antes de monitorear o cambiar DNS.`,
    reportStatusLabel: 'Estado del reporte',
    guidanceLabel: 'Guia neutral por proveedor',
    safeguardsLabel: 'Protecciones del reporte',
    safeguards: ['Sin dominios guardados', 'API con rate limit', 'Sin mensaje SMTP enviado', 'Headers locales'],
    categories: {
      spf: 'SPF',
      dkim: 'DKIM',
      dmarc: 'DMARC',
      mx: 'MX',
      blacklist: 'Blacklist',
      smtp: 'SMTP',
      headers: 'Headers',
    },
    guidance: {
      spf: 'Mantene un solo SPF, evita +all permisivo y revisa includes pesados antes de cambiar DNS.',
      dkim: 'Confirma que el selector activo publique clave y rota selectores desde tu proveedor de correo.',
      dmarc: 'Usa reportes para validar remitentes legitimos antes de pasar de p=none a quarantine o reject.',
      mx: 'Confirma prioridad MX, resolucion publica y proveedor responsable antes de depurar entrega.',
      blacklist: 'Toma las listas DNSBL como pistas y confirma la politica con el proveedor de la lista.',
      smtp: 'Este test es solo TCP; compara fallas con estado del proveedor y firewall antes de cambiar registros.',
      headers: 'Usa Authentication-Results del receptor para comparar SPF, DKIM, DMARC y alineacion visible.',
    },
    headerMissing: 'Pega headers opcionales para incluir senales de autenticacion del mensaje en el reporte.',
  },
  fr: {
    eyebrow: 'Rapport domaine',
    title: 'Lancez un rapport email sur les signaux controles par les fournisseurs.',
    body: 'Verifiez SPF, DKIM, DMARC, MX, echantillon blacklist, SMTP et headers optionnels dans un flux ponctuel.',
    domainLabel: 'Nom de domaine',
    selectorLabel: 'Selecteur DKIM',
    portLabel: 'Port SMTP',
    headersLabel: 'Headers bruts optionnels',
    headersHint: 'Les headers restent dans le navigateur et ne sont jamais envoyes a l API MailHealth.',
    runLabel: 'Lancer le rapport',
    runningLabel: 'Controles bornes en cours...',
    resetLabel: 'Reinitialiser',
    scoreLabel: 'Score unifie',
    checklistLabel: 'Checklist rapport',
    emptySummary: 'Lancez un rapport pour noter authentification, DNS, reputation, SMTP et headers visibles.',
    healthySummary: 'Les signaux visibles dans ce rapport ponctuel semblent sains.',
    failedSummary: (count: number) => `${count} controles demandent attention avant de considerer ce domaine sain.`,
    warningSummary: (count: number) => `${count} controles retournent des avertissements. Verifiez les conseils avant DNS ou monitoring.`,
    reportStatusLabel: 'Statut rapport',
    guidanceLabel: 'Conseils neutres',
    safeguardsLabel: 'Protections du rapport',
    safeguards: ['Aucun domaine stocke', 'API rate-limited', 'Aucun message SMTP envoye', 'Headers locaux'],
    categories: {
      spf: 'SPF',
      dkim: 'DKIM',
      dmarc: 'DMARC',
      mx: 'MX',
      blacklist: 'Blacklist',
      smtp: 'SMTP',
      headers: 'Headers',
    },
    guidance: {
      spf: 'Gardez un seul SPF, evitez +all permissif et verifiez les includes lourds avant de changer DNS.',
      dkim: 'Confirmez que le selecteur actif publie une cle et faites la rotation chez le fournisseur mail.',
      dmarc: 'Utilisez les rapports pour valider les expediteurs legitimes avant quarantine ou reject.',
      mx: 'Confirmez priorite MX, resolution publique et fournisseur avant de diagnostiquer la livraison.',
      blacklist: 'Traitez les DNSBL comme indices et confirmez la politique chez le fournisseur de liste.',
      smtp: 'Ce test est seulement TCP; comparez les echecs avec statut fournisseur et firewall.',
      headers: 'Utilisez Authentication-Results du recepteur pour comparer SPF, DKIM, DMARC et alignement.',
    },
    headerMissing: 'Collez des headers optionnels pour inclure les signaux du message dans le rapport.',
  },
  de: {
    eyebrow: 'Domainbericht',
    title: 'Starten Sie einen E-Mail-Bericht ueber die Signale, die Anbieter pruefen.',
    body: 'Pruefen Sie SPF, DKIM, DMARC, MX, Blacklist-Sample, SMTP und optionale Header in einem einmaligen Ablauf.',
    domainLabel: 'Domainname',
    selectorLabel: 'DKIM-Selector',
    portLabel: 'SMTP-Port',
    headersLabel: 'Optionale Rohheader',
    headersHint: 'Header bleiben im Browser und werden nie an die MailHealth API gesendet.',
    runLabel: 'Domainbericht starten',
    runningLabel: 'Begrenzte Checks laufen...',
    resetLabel: 'Bericht zuruecksetzen',
    scoreLabel: 'Gesamtscore',
    checklistLabel: 'Berichtschecklist',
    emptySummary: 'Starten Sie einen Bericht fuer Authentifizierung, DNS, Reputation, SMTP und sichtbare Header.',
    healthySummary: 'Die sichtbaren Signale in diesem einmaligen Bericht wirken gesund.',
    failedSummary: (count: number) => `${count} Checks brauchen Aufmerksamkeit, bevor diese Domain als gesund gilt.`,
    warningSummary: (count: number) => `${count} Checks liefern Warnungen. Pruefen Sie Hinweise vor Monitoring oder DNS-Aenderung.`,
    reportStatusLabel: 'Berichtsstatus',
    guidanceLabel: 'Anbieterneutrale Hinweise',
    safeguardsLabel: 'Berichtsschutz',
    safeguards: ['Keine Domains gespeichert', 'Rate-limitierte API', 'Keine SMTP-Nachricht', 'Header lokal analysiert'],
    categories: {
      spf: 'SPF',
      dkim: 'DKIM',
      dmarc: 'DMARC',
      mx: 'MX',
      blacklist: 'Blacklist',
      smtp: 'SMTP',
      headers: 'Header',
    },
    guidance: {
      spf: 'Nutzen Sie einen SPF-Record, vermeiden Sie +all und pruefen Sie schwere Includes vor DNS-Aenderungen.',
      dkim: 'Pruefen Sie den aktiven Selector und rotieren Sie Selector beim Mailanbieter, nicht in diesem freien Check.',
      dmarc: 'Nutzen Sie Reports zur Validierung legitimer Sender vor quarantine oder reject.',
      mx: 'Pruefen Sie MX-Prioritaet, oeffentliche Aufloesung und Provider vor Zustellungsdiagnose.',
      blacklist: 'DNSBL-Treffer sind Hinweise; bestaetigen Sie Richtlinien direkt beim Listenanbieter.',
      smtp: 'Dies ist nur TCP-Reachability; vergleichen Sie Fehler mit Providerstatus und Firewall.',
      headers: 'Nutzen Sie Authentication-Results des Empfaengers fuer SPF, DKIM, DMARC und Alignment.',
    },
    headerMissing: 'Fuegen Sie optionale Header ein, um Nachrichten-Signale im Bericht einzubeziehen.',
  },
}

const copy = computed(() => reportCopy[props.locale])
const shellCopy = computed(() => getShellCopy(props.locale))
const domainValue = ref('example.com')
const selectorValue = ref('default')
const smtpPort = ref(25)
const headersValue = ref('Authentication-Results: mx.example; spf=pass smtp.mailfrom=example.com; dkim=pass header.d=example.com; dmarc=pass header.from=example.com\nFrom: Example Sender <sender@example.com>\nReturn-Path: <bounce@example.com>\nDKIM-Signature: v=1; a=rsa-sha256; d=example.com; s=default; bh=sample; b=sample')
const isRunning = ref(false)
const hasRun = ref(false)
const sections = ref<ReportSection[]>([])
const runtimeConfig = useRuntimeConfig()
const homePath = computed(() => localizedHomePath(props.locale))
const combinedFindings = computed(() => sections.value.flatMap((section) =>
  section.findings.map((finding) => ({
    label: `${section.label}: ${finding.label}`,
    status: finding.status,
    detail: finding.detail,
  })),
))
const scoreCard = computed(() => createMailHealthScoreCard(combinedFindings.value, copy.value.emptySummary))
const reportSummary = computed(() => {
  if (!hasRun.value) {
    return copy.value.emptySummary
  }

  const failed = sections.value.filter((section) => section.tone === 'fail').length
  const warnings = sections.value.filter((section) => section.tone === 'warn').length

  if (failed > 0) {
    return copy.value.failedSummary(failed)
  }

  if (warnings > 0) {
    return copy.value.warningSummary(warnings)
  }

  return copy.value.healthySummary
})

function endpoint(path: string): string {
  return `${String(runtimeConfig.public.mailhealthApiBaseUrl).replace(/\/+$/g, '')}/${path}`
}

function toneFromStatus(status: string | undefined): ReportTone {
  if (status === 'pass') {
    return 'pass'
  }

  if (status === 'warn' || status === 'unknown' || status === 'neutral' || status === 'none' || status === 'softfail') {
    return 'warn'
  }

  return 'fail'
}

function statusClass(status: string | undefined): string {
  const tone = toneFromStatus(status)

  return `severity severity--${tone}`
}

async function parseApiError(response: Response): Promise<string> {
  try {
    const payload = await response.json() as { message?: string; errors?: Record<string, string[]> }
    const firstError = Object.values(payload.errors ?? {})[0]?.[0]

    return firstError ?? payload.message ?? `HTTP ${response.status}`
  } catch {
    return `HTTP ${response.status}`
  }
}

async function postCheck(path: string, body: Record<string, unknown>): Promise<ApiResponse<MailHealthApiData>> {
  const response = await fetch(endpoint(path), {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(await parseApiError(response))
  }

  return await response.json() as ApiResponse<MailHealthApiData>
}

async function runRemoteSection(key: Exclude<ReportKey, 'headers'>, path: string, body: Record<string, unknown>): Promise<ReportSection> {
  try {
    const payload = await postCheck(path, body)
    const status = payload.data.status

    return {
      key,
      label: copy.value.categories[key],
      category: payload.data.check.toUpperCase(),
      status,
      tone: toneFromStatus(status),
      summary: payload.data.summary,
      guidance: copy.value.guidance[key],
      findings: payload.data.findings,
      meta: [
        { label: 'Cache', value: payload.meta.cached ? 'cached' : 'fresh' },
        { label: 'TTL', value: String(payload.meta.cache_ttl_seconds ?? '-') },
        { label: 'Warnings', value: String(payload.data.warnings?.length ?? 0) },
      ],
    }
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'Check failed.'

    return {
      key,
      label: copy.value.categories[key],
      category: key.toUpperCase(),
      status: 'fail',
      tone: 'fail',
      summary: detail,
      guidance: copy.value.guidance[key],
      findings: [{ label: `${copy.value.categories[key]} check`, status: 'fail', detail }],
      meta: [
        { label: 'Cache', value: '-' },
        { label: 'TTL', value: '-' },
        { label: 'Warnings', value: '1' },
      ],
    }
  }
}

function runHeaderSection(): ReportSection {
  if (!headersValue.value.trim()) {
    return {
      key: 'headers',
      label: copy.value.categories.headers,
      category: 'LOCAL',
      status: 'warn',
      tone: 'warn',
      summary: copy.value.headerMissing,
      guidance: copy.value.guidance.headers,
      findings: [{ label: 'Header sample', status: 'warn', detail: copy.value.headerMissing }],
      meta: [
        { label: 'Mode', value: 'local' },
        { label: 'API calls', value: '0' },
        { label: 'Header bytes', value: '0' },
      ],
    }
  }

  const result = analyzeMailHeaders(headersValue.value)
  const tone = result.ok ? toneFromStatus(createMailHealthScoreCard(result.findings, result.summary).tone) : 'fail'

  return {
    key: 'headers',
    label: copy.value.categories.headers,
    category: 'LOCAL',
    status: result.ok ? tone : 'fail',
    tone,
    summary: result.ok ? result.summary : (result.error ?? copy.value.headerMissing),
    guidance: copy.value.guidance.headers,
    findings: result.ok ? result.findings : [{ label: 'Header analysis', status: 'fail', detail: result.error ?? copy.value.headerMissing }],
    meta: [
      { label: 'Mode', value: 'local' },
      { label: 'API calls', value: '0' },
      { label: 'Header bytes', value: String(headersValue.value.length) },
    ],
  }
}

function resetReport(): void {
  hasRun.value = false
  sections.value = []
}

async function runReport(): Promise<void> {
  isRunning.value = true
  hasRun.value = true
  sections.value = []
  trackMailHealthEvent({ toolSlug: 'domain-report', locale: props.locale, routePath: homePath.value }, 'tool_started')

  const domain = domainValue.value
  const selector = selectorValue.value.trim() || 'default'
  const port = smtpPort.value

  try {
    const results = await Promise.all([
      runRemoteSection('spf', 'dns', { domain, check: 'spf' }),
      runRemoteSection('dkim', 'dns', { domain, check: 'dkim', selector }),
      runRemoteSection('dmarc', 'dns', { domain, check: 'dmarc' }),
      runRemoteSection('mx', 'dns', { domain, check: 'mx' }),
      runRemoteSection('blacklist', 'blacklist', { domain }),
      runRemoteSection('smtp', 'smtp', { domain, port }),
    ])
    sections.value = [...results, runHeaderSection()]
    const failed = sections.value.every((section) => section.tone === 'fail')
    trackMailHealthEvent({ toolSlug: 'domain-report', locale: props.locale, routePath: homePath.value }, failed ? 'tool_failed' : 'tool_completed')
  } finally {
    isRunning.value = false
  }
}

onMounted(() => {
  trackMailHealthEvent({ toolSlug: 'domain-report', locale: props.locale, routePath: homePath.value }, 'tool_viewed')
})
</script>

<template>
  <section class="report-workbench" aria-labelledby="mailhealth-report-title">
    <div class="report-workbench__intro">
      <div>
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h2 id="mailhealth-report-title">{{ copy.title }}</h2>
        <p>{{ copy.body }}</p>
      </div>
      <div class="report-safeguards" :aria-label="copy.safeguardsLabel">
        <span v-for="item in copy.safeguards" :key="item">{{ item }}</span>
      </div>
    </div>

    <form class="report-form" @submit.prevent="runReport">
      <div class="field">
        <label for="mailhealth-report-domain">{{ copy.domainLabel }}</label>
        <input id="mailhealth-report-domain" v-model="domainValue" autocomplete="off" inputmode="url">
      </div>
      <div class="field">
        <label for="mailhealth-report-selector">{{ copy.selectorLabel }}</label>
        <input id="mailhealth-report-selector" v-model="selectorValue" autocomplete="off">
      </div>
      <div class="field">
        <label for="mailhealth-report-port">{{ copy.portLabel }}</label>
        <select id="mailhealth-report-port" v-model.number="smtpPort">
          <option v-for="port in [25, 465, 587]" :key="port" :value="port">{{ port }}</option>
        </select>
      </div>
      <div class="field report-form__headers">
        <label for="mailhealth-report-headers">{{ copy.headersLabel }}</label>
        <textarea id="mailhealth-report-headers" v-model="headersValue" spellcheck="false" rows="5"></textarea>
        <span>{{ copy.headersHint }}</span>
      </div>
      <div class="report-form__actions">
        <button :class="getButtonClass()" type="submit" :disabled="isRunning">
          {{ isRunning ? copy.runningLabel : copy.runLabel }}
        </button>
        <button :class="getButtonClass('secondary')" type="button" :disabled="isRunning" @click="resetReport">
          {{ copy.resetLabel }}
        </button>
      </div>
    </form>

    <section class="report-summary" :aria-labelledby="mailhealth-report-score">
      <div class="score-card" :class="`score-card--${hasRun ? scoreCard.tone : 'warn'}`">
        <span>{{ copy.scoreLabel }}</span>
        <strong id="mailhealth-report-score">{{ hasRun ? scoreCard.score : '--' }}</strong>
        <small>{{ hasRun ? scoreCard.grade : copy.reportStatusLabel }}</small>
      </div>
      <div>
        <h3>{{ copy.checklistLabel }}</h3>
        <p>{{ hasRun ? reportSummary : copy.emptySummary }}</p>
        <div v-if="sections.length" class="report-check-grid">
          <article v-for="section in sections" :key="section.key" class="report-check">
            <div class="report-check__topline">
              <strong>{{ section.label }}</strong>
              <span :class="statusClass(section.status)">{{ section.status }}</span>
            </div>
            <p>{{ section.summary }}</p>
            <dl>
              <div v-for="item in section.meta" :key="`${section.key}-${item.label}`">
                <dt>{{ item.label }}</dt>
                <dd>{{ item.value }}</dd>
              </div>
            </dl>
            <details>
              <summary>{{ copy.guidanceLabel }}</summary>
              <p>{{ section.guidance }}</p>
              <ul class="result-list">
                <li v-for="finding in section.findings.slice(0, 4)" :key="`${section.key}-${finding.label}-${finding.detail}`">
                  <span :class="statusClass(finding.status)">{{ finding.status ?? 'unknown' }}</span>
                  <strong>{{ finding.label }}</strong>
                  <span>{{ finding.value ? `${finding.detail} (${finding.value})` : finding.detail }}</span>
                </li>
              </ul>
            </details>
          </article>
        </div>
      </div>
    </section>

    <p class="report-note">{{ shellCopy.infoBody }}</p>
  </section>
</template>
