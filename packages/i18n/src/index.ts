export const localeCodes = ['en', 'pt-br', 'es', 'fr', 'de'] as const

export type LocaleCode = (typeof localeCodes)[number]

export interface LocaleDefinition {
  code: LocaleCode
  label: string
  shortLabel: string
  htmlLang: string
  hreflang: string
  intlLocale: string
  textDirection: 'ltr'
}

export interface LanguageOption {
  code: LocaleCode
  label: string
  shortLabel: string
  href: string
  current: boolean
}

export const defaultLocale: LocaleCode = 'en'

export const locales: readonly LocaleDefinition[] = [
  { code: 'en', label: 'English', shortLabel: 'EN', htmlLang: 'en', hreflang: 'en', intlLocale: 'en-US', textDirection: 'ltr' },
  { code: 'pt-br', label: 'Português', shortLabel: 'PT-BR', htmlLang: 'pt-BR', hreflang: 'pt-BR', intlLocale: 'pt-BR', textDirection: 'ltr' },
  { code: 'es', label: 'Español', shortLabel: 'ES', htmlLang: 'es', hreflang: 'es', intlLocale: 'es-ES', textDirection: 'ltr' },
  { code: 'fr', label: 'Français', shortLabel: 'FR', htmlLang: 'fr', hreflang: 'fr', intlLocale: 'fr-FR', textDirection: 'ltr' },
  { code: 'de', label: 'Deutsch', shortLabel: 'DE', htmlLang: 'de', hreflang: 'de', intlLocale: 'de-DE', textDirection: 'ltr' },
]

const localeSet = new Set<string>(localeCodes)
const localeDefinitionByCode = new Map(locales.map((locale) => [locale.code, locale]))

export function isLocaleCode(value: unknown): value is LocaleCode {
  return typeof value === 'string' && localeSet.has(value)
}

export function normalizeLocale(value: unknown): LocaleCode | null {
  if (typeof value !== 'string') {
    return null
  }

  const normalized = value.trim().replace('_', '-').toLowerCase()

  return isLocaleCode(normalized) ? normalized : null
}

export function getLocaleDefinition(locale: LocaleCode): LocaleDefinition {
  const definition = localeDefinitionByCode.get(locale)

  if (!definition) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  return definition
}

export function toHreflang(locale: LocaleCode): string {
  return getLocaleDefinition(locale).hreflang
}

export function toHtmlLang(locale: LocaleCode): string {
  return getLocaleDefinition(locale).htmlLang
}

export function toIntlLocale(locale: LocaleCode): string {
  return getLocaleDefinition(locale).intlLocale
}

function normalizePathSegment(segment: string | number): string {
  return String(segment).trim().replace(/^\/+|\/+$/g, '')
}

export function localizedPath(
  locale: LocaleCode,
  ...segments: Array<string | number | null | undefined>
): string {
  const path = segments
    .filter((segment): segment is string | number => segment !== null && segment !== undefined)
    .flatMap((segment) => normalizePathSegment(segment).split('/'))
    .map((segment) => normalizePathSegment(segment))
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  return path ? `/${locale}/${path}` : `/${locale}`
}

export function localizedHomePath(locale: LocaleCode): string {
  return localizedPath(locale)
}

export function localizedSitePath(locale: LocaleCode, slug: string): string {
  return localizedPath(locale, 'sites', slug)
}

export function localizedLegalPath(locale: LocaleCode, slug: string): string {
  return localizedPath(locale, slug)
}

export function buildLanguageOptions(
  currentLocale: LocaleCode,
  pathForLocale: (locale: LocaleCode) => string,
): LanguageOption[] {
  return locales.map((locale) => ({
    code: locale.code,
    label: locale.label,
    shortLabel: locale.shortLabel,
    href: pathForLocale(locale.code),
    current: locale.code === currentLocale,
  }))
}

export function formatDate(
  value: Date | string | number,
  locale: LocaleCode,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' },
): string {
  return new Intl.DateTimeFormat(toIntlLocale(locale), options).format(new Date(value))
}

export function formatNumber(
  value: number,
  locale: LocaleCode,
  options: Intl.NumberFormatOptions = {},
): string {
  return new Intl.NumberFormat(toIntlLocale(locale), options).format(value)
}

export function formatCurrency(
  value: number,
  locale: LocaleCode,
  currency: string,
  options: Intl.NumberFormatOptions = {},
): string {
  return formatNumber(value, locale, {
    style: 'currency',
    currency,
    ...options,
  })
}

type PublicCopyMap = Record<string, unknown>

const internalTermReplacements: Record<LocaleCode, Array<[RegExp, string]>> = {
  en: [
    [/\bMVPs?\b/gu, 'free version'],
    [/\bpublic channel gate\b/giu, 'public channel readiness'],
    [/\blocalization gate\b/giu, 'localization review'],
    [/\bAdSense review gates?\b/giu, 'AdSense review checks'],
    [/\bquality gates?\b/giu, 'quality checks'],
    [/\blaunch gates?\b/giu, 'launch checks'],
    [/\bgated\b/giu, 'planned'],
    [/\bgates?\b/giu, 'checks'],
    [/\bQuality gate\b/gu, 'Quality check'],
    [/deploy smoke/giu, 'public release check'],
    [/rollback validation/giu, 'release recovery check'],
    [/placeholder/giu, 'preview'],
    [/HUMAN_ACTION_REQUIRED/gu, 'human review'],
    [/No ads active/gu, 'Advertising not active'],
    [/No file backend active/gu, 'No server upload backend active'],
    [/Monitoring gated/gu, 'Monitoring planned'],
    [/Commercial redirects gated/gu, 'Commercial redirects planned'],
  ],
  'pt-br': [
    [/\bMVPs?\b/gu, 'versão gratuita'],
    [/\bgated\b/giu, 'planejados'],
    [/\bGate de lançamento\b/giu, 'Revisão de lançamento'],
    [/\bGate de localiza(?:c|ç)ao\b/giu, 'Revisão de localização'],
    [/\bgates?\b/giu, 'revisões'],
    [/\bbloqueados\b/giu, 'planejados'],
    [/\bbloqueado\b/giu, 'planejado'],
    [/\bbloqueadas\b/giu, 'planejadas'],
    [/\bbloqueada\b/giu, 'planejada'],
    [/\bGate de qualidade\b/gu, 'Revisão de qualidade'],
    [/deploy smoke/giu, 'verificação pública de lançamento'],
    [/rollback validation/giu, 'verificação de recuperação do lançamento'],
    [/placeholder/giu, 'prévia'],
    [/HUMAN_ACTION_REQUIRED/gu, 'revisão humana'],
    [/No ads active/gu, 'Anúncios não ativos'],
    [/No file backend active/gu, 'Sem backend de upload no servidor'],
    [/Monitoring gated/gu, 'Monitoramento planejado'],
    [/Commercial redirects gated/gu, 'Redirecionamentos comerciais planejados'],
  ],
  es: [
    [/\bMVPs?\b/gu, 'versión gratuita'],
    [/\bgated\b/giu, 'planificados'],
    [/\bGate de lanzamiento\b/giu, 'Revisión de lanzamiento'],
    [/\bGate de localizaci(?:o|ó)n\b/giu, 'Revisión de localización'],
    [/\bgates?\b/giu, 'revisiones'],
    [/\bbloqueados\b/giu, 'planificados'],
    [/\bbloqueado\b/giu, 'planificado'],
    [/\bbloqueadas\b/giu, 'planificadas'],
    [/\bbloqueada\b/giu, 'planificada'],
    [/\bGate de calidad\b/gu, 'Revisión de calidad'],
    [/deploy smoke/giu, 'verificación pública de lanzamiento'],
    [/rollback validation/giu, 'verificación de recuperación del lanzamiento'],
    [/placeholder/giu, 'vista previa'],
    [/HUMAN_ACTION_REQUIRED/gu, 'revisión humana'],
    [/No ads active/gu, 'Anuncios no activos'],
    [/No file backend active/gu, 'Sin backend de subida en servidor'],
    [/Monitoring gated/gu, 'Monitoreo planificado'],
    [/Commercial redirects gated/gu, 'Redirecciones comerciales planificadas'],
  ],
  fr: [
    [/\bMVPs?\b/gu, 'version gratuite'],
    [/\bgated\b/giu, 'prévus'],
    [/\bGate de lancement\b/giu, 'Revue de lancement'],
    [/\bGate de localisation\b/giu, 'Revue de localisation'],
    [/\bGate localisation\b/giu, 'Revue de localisation'],
    [/\bgates\b/giu, 'revues'],
    [/\bgate\b/giu, 'prévu'],
    [/\bbloquees\b/giu, 'prévues'],
    [/\bbloquee\b/giu, 'prévue'],
    [/\bbloques\b/giu, 'prévus'],
    [/\bbloque\b/giu, 'prévu'],
    [/\bGate qualité\b/gu, 'Revue qualité'],
    [/deploy smoke/giu, 'vérification publique de lancement'],
    [/rollback validation/giu, 'vérification de reprise du lancement'],
    [/placeholder/giu, 'aperçu'],
    [/HUMAN_ACTION_REQUIRED/gu, 'revue humaine'],
    [/No ads active/gu, 'Publicités non actives'],
    [/No file backend active/gu, 'Aucun backend de téléversement serveur'],
    [/Monitoring gated/gu, 'Monitoring prévu'],
    [/Commercial redirects gated/gu, 'Redirections commerciales prévues'],
  ],
  de: [
    [/\bMVPs?\b/gu, 'kostenlose Version'],
    [/\bgated\b/giu, 'geplant'],
    [/\bLaunch Gates?\b/giu, 'Launch-Prüfungen'],
    [/\bRollout-Gates?\b/giu, 'Rollout-Prüfungen'],
    [/\bQuality Gates?\b/giu, 'Qualitätsprüfungen'],
    [/\bGates?\b/giu, 'Prüfungen'],
    [/\bgesperrt\b/giu, 'geplant'],
    [/\bQuality Gate\b/gu, 'Qualitätsprüfung'],
    [/deploy smoke/giu, 'öffentliche Release-Prüfung'],
    [/rollback validation/giu, 'Release-Wiederherstellungsprüfung'],
    [/placeholder/giu, 'Vorschau'],
    [/HUMAN_ACTION_REQUIRED/gu, 'menschliche Prüfung'],
    [/No ads active/gu, 'Anzeigen nicht aktiv'],
    [/No file backend active/gu, 'Kein serverseitiges Upload-Backend'],
    [/Monitoring gated/gu, 'Monitoring geplant'],
    [/Commercial redirects gated/gu, 'Kommerzielle Redirects geplant'],
  ],
}

const localeAccentReplacements: Partial<Record<LocaleCode, Array<[RegExp, string]>>> = {
  'pt-br': [
    [/\bNao\b/g, 'Não'],
    [/\bnao\b/g, 'não'],
    [/\bSao\b/g, 'São'],
    [/\bsao\b/g, 'são'],
    [/\besta\b/g, 'está'],
    [/\bestao\b/g, 'estão'],
    [/\bha\b/g, 'há'],
    [/\butil\b/g, 'útil'],
    [/\buteis\b/g, 'úteis'],
    [/\bestatico\b/g, 'estático'],
    [/\bestaticos\b/g, 'estáticos'],
    [/\bdinamico\b/g, 'dinâmico'],
    [/\bdinamicos\b/g, 'dinâmicos'],
    [/\bcodigo\b/g, 'código'],
    [/\bcodigos\b/g, 'códigos'],
    [/\bconteudo\b/g, 'conteúdo'],
    [/\bpagina\b/g, 'página'],
    [/\bpublico\b/g, 'público'],
    [/\bdominio\b/g, 'domínio'],
    [/\bproprio\b/g, 'próprio'],
    [/\bproprios\b/g, 'próprios'],
    [/\bGeracao\b/g, 'Geração'],
    [/\bgeracao\b/g, 'geração'],
    [/\bpreco\b/g, 'preço'],
    [/\bvariavel\b/g, 'variável'],
    [/\bcontribuicao\b/g, 'contribuição'],
    [/\bequilibrio\b/g, 'equilíbrio'],
    [/\brevisao\b/g, 'revisão'],
    [/\bhistorico\b/g, 'histórico'],
    [/\brecorrencia\b/g, 'recorrência'],
    [/\baprovacao\b/g, 'aprovação'],
    [/\bnumeracao\b/g, 'numeração'],
    [/\bapos\b/g, 'após'],
    [/\bHistorico\b/g, 'Histórico'],
    [/\bcenarios\b/g, 'cenários'],
    [/\bexportacoes\b/g, 'exportações'],
    [/\banuncios\b/g, 'anúncios'],
  ],
  es: [
    [/\bestatico\b/g, 'estático'],
    [/\bestaticos\b/g, 'estáticos'],
    [/\bdinamico\b/g, 'dinámico'],
    [/\bdinamicos\b/g, 'dinámicos'],
    [/\bcodigo\b/g, 'código'],
    [/\bcodigos\b/g, 'códigos'],
    [/\bdespues\b/g, 'después'],
    [/\bmas\b/g, 'más'],
    [/\butil\b/g, 'útil'],
    [/\bsenal\b/g, 'señal'],
    [/\bplanificacion\b/g, 'planificación'],
    [/\brevision\b/g, 'revisión'],
    [/\brecoleccion\b/g, 'recolección'],
    [/\bcontribucion\b/g, 'contribución'],
    [/\binversion\b/g, 'inversión'],
    [/\bliquido\b/g, 'líquido'],
    [/\bnumeracion\b/g, 'numeración'],
    [/\bretencion\b/g, 'retención'],
    [/\bresolucion\b/g, 'resolución'],
    [/\bintegracion\b/g, 'integración'],
    [/\bestan\b/g, 'están'],
    [/\baun\b/g, 'aún'],
  ],
  fr: [
    [/\bRevise\b/g, 'Révisé'],
    [/\bApercu\b/g, 'Aperçu'],
    [/\bapercu\b/g, 'aperçu'],
    [/\bGeneration\b/g, 'Génération'],
    [/\bgeneration\b/g, 'génération'],
    [/\bDonnees\b/g, 'Données'],
    [/\bdonnees\b/g, 'données'],
    [/\bsecurite\b/g, 'sécurité'],
    [/\bscenario\b/g, 'scénario'],
    [/\bscenarios\b/g, 'scénarios'],
    [/\bcout\b/g, 'coût'],
    [/\bcouts\b/g, 'coûts'],
    [/\binterets\b/g, 'intérêts'],
    [/\bresultat\b/g, 'résultat'],
    [/\bresultats\b/g, 'résultats'],
    [/\butilisee\b/g, 'utilisée'],
    [/\bequipe\b/g, 'équipe'],
    [/\bequipes\b/g, 'équipes'],
    [/\bprevu\b/g, 'prévu'],
    [/\brecurrence\b/g, 'récurrence'],
    [/\breconciliation\b/g, 'réconciliation'],
    [/\bNumerotation\b/g, 'Numérotation'],
    [/\bnumerotation\b/g, 'numérotation'],
    [/\bapres\b/g, 'après'],
    [/\bteleversement\b/g, 'téléversement'],
    [/\bintegrations\b/g, 'intégrations'],
    [/\bresolution\b/g, 'résolution'],
  ],
  de: [
    [/\bGeprueft\b/g, 'Geprüft'],
    [/\bgeprueft\b/g, 'geprüft'],
    [/\bPruefung\b/g, 'Prüfung'],
    [/\bpruefung\b/g, 'prüfung'],
    [/\bPruefen\b/g, 'Prüfen'],
    [/\bpruefen\b/g, 'prüfen'],
    [/\bfuer\b/g, 'für'],
    [/\bgrosse\b/g, 'große'],
    [/\bgroessere\b/g, 'größere'],
    [/\bGebuehren\b/g, 'Gebühren'],
    [/\bRueckfluss\b/g, 'Rückfluss'],
    [/\bHoehere\b/g, 'Höhere'],
    [/\blaesst\b/g, 'lässt'],
    [/\berfuellt\b/g, 'erfüllt'],
  ],
}

const englishFallbackPhraseReplacements: Partial<Record<LocaleCode, Record<string, string>>> = {
  'pt-br': {
    'Structured Data Formatter': 'Formatador de dados estruturados',
    'Format JSON, XML, YAML and CSV snippets in the browser.': 'Formate trechos JSON, XML, YAML e CSV no navegador.',
    'Base64 Converter': 'Conversor Base64',
    'Encode or decode UTF-8 text without sending the text to a server.': 'Codifique ou decodifique texto UTF-8 sem enviar o conteúdo a um servidor.',
    'JWT Inspector': 'Inspetor JWT',
    'Decode JWT header and payload locally without verifying the signature.': 'Decodifique cabeçalho e payload JWT localmente, sem verificar assinatura.',
    'Regex Tester': 'Testador de Regex',
    'Run JavaScript regular expressions against sample text in a browser worker.': 'Execute expressões regulares JavaScript contra texto de exemplo em um worker do navegador.',
    'Text Diff': 'Comparador de texto',
    'Compare two text blocks and produce a compact line diff locally.': 'Compare dois blocos de texto e gere um diff compacto de linhas localmente.',
    'Cron Helper': 'Assistente Cron',
    'Explain a five-field cron expression and list the next UTC runs.': 'Explique uma expressão cron de cinco campos e liste as próximas execuções em UTC.',
    'UUID Generator': 'Gerador de UUID',
    'Generate version 4 UUIDs locally for development fixtures.': 'Gere UUIDs versão 4 localmente para dados de desenvolvimento.',
    'Timestamp Converter': 'Conversor de timestamp',
    'Convert Unix timestamps, milliseconds and date strings into readable UTC values.': 'Converta timestamps Unix, milissegundos e datas em valores UTC legíveis.',
    'Hash Generator': 'Gerador de hash',
    'Generate SHA digests for small text snippets with browser crypto.': 'Gere digests SHA de pequenos textos com criptografia do navegador.',
    'Time Zone Converter': 'Conversor de fusos horários',
    'Convert an ISO or UTC date-time instant across two named IANA time zones.': 'Converta um instante ISO ou UTC entre dois fusos IANA.',
    'Date Difference Calculator': 'Calculadora de diferença entre datas',
    'Measure days, weeks and approximate months between two dates.': 'Meça dias, semanas e meses aproximados entre duas datas.',
    'Business Days Calculator': 'Calculadora de dias úteis',
    'Count Monday to Friday business days between two dates.': 'Conte dias úteis de segunda a sexta entre duas datas.',
    'Convert Unix seconds, Unix milliseconds and date strings into readable time values.': 'Converta segundos Unix, milissegundos Unix e datas em horários legíveis.',
    'Age Calculator': 'Calculadora de idade',
    'Calculate age in years, months and days on a reference date.': 'Calcule idade em anos, meses e dias em uma data de referência.',
    'Percentage Calculator': 'Calculadora de porcentagem',
    'Calculate percent-of, percent change and add-percent scenarios.': 'Calcule porcentagem de um valor, variação percentual e acréscimos percentuais.',
    'Unit Converter': 'Conversor de unidades',
    'Convert common length, weight and temperature units locally.': 'Converta unidades comuns de comprimento, peso e temperatura localmente.',
    'Static QR Code Generator': 'Gerador de QR Code estático',
    'Create a scannable static QR code for a safe URL, plain text, email or phone payload.': 'Crie um QR Code estático escaneável para URL segura, texto, email ou telefone.',
    'Barcode Generator': 'Gerador de código de barras',
    'Generate a Code 128 barcode preview for short inventory, ticket or reference values.': 'Gere uma prévia de código Code 128 para inventário, ingresso ou referência curta.',
    'UTM Builder': 'Construtor UTM',
    'Build a tagged campaign URL and QR preview without sending the destination to a server.': 'Monte uma URL de campanha com tags e prévia de QR sem enviar o destino a um servidor.',
    'vCard QR Builder': 'Construtor de QR vCard',
    'Turn a small contact profile into a vCard payload and QR preview locally.': 'Transforme um contato simples em payload vCard e prévia de QR localmente.',
    'Wi-Fi QR Builder': 'Construtor de QR Wi-Fi',
    'Create a Wi-Fi QR payload for WPA, WEP or open networks directly in the browser.': 'Crie um payload QR de Wi-Fi para redes WPA, WEP ou abertas direto no navegador.',
    'QR Preview Lab': 'Laboratório de prévia QR',
    'Inspect a static QR payload before printing and see why dynamic redirects stay planned.': 'Inspecione um payload QR estático antes de imprimir e entenda por que redirecionamentos dinâmicos ficam planejados.',
    'Invoice Builder': 'Construtor de faturas',
    'Create an invoice preview and download a PDF in the browser without mandatory signup.': 'Crie uma prévia de fatura e baixe o PDF no navegador sem cadastro obrigatório.',
    'Quote Builder': 'Construtor de orçamentos',
    'Prepare a quote or estimate with itemized totals and local PDF export.': 'Prepare um orçamento com itens, totais e exportação local em PDF.',
    'Receipt Builder': 'Construtor de recibos',
    'Draft a simple receipt with paid date, itemized total and local PDF download.': 'Crie um recibo simples com data de pagamento, total por itens e PDF local.',
    'SPF Checker': 'Verificador SPF',
    'Find the SPF TXT record for a domain and flag risky all, duplicate or lookup-heavy policies.': 'Encontre o registro TXT SPF de um domínio e sinalize políticas arriscadas, duplicadas ou pesadas.',
    'DKIM Checker': 'Verificador DKIM',
    'Check a selector._domainkey TXT record and confirm that a DKIM public key is published.': 'Verifique o TXT selector._domainkey e confirme se a chave pública DKIM está publicada.',
    'DMARC Checker': 'Verificador DMARC',
    'Inspect the _dmarc TXT record and identify policy, alignment and reporting readiness.': 'Inspecione o TXT _dmarc e identifique política, alinhamento e prontidão de relatórios.',
    'MX Checker': 'Verificador MX',
    'Inspect mail exchanger priority, host shape and public resolution before debugging delivery.': 'Inspecione prioridade MX, formato dos hosts e resolução pública antes de depurar entrega.',
    'Blacklist Check': 'Consulta de blacklist',
    'Run a small DNSBL sample against public mail-related addresses with strict query limits.': 'Execute uma pequena amostra DNSBL para endereços públicos de email com limites rígidos.',
    'SMTP Check': 'Teste SMTP',
    'Test bounded TCP reachability to a domain mail exchanger without sending a message.': 'Teste alcance TCP limitado até um MX sem enviar mensagem.',
    'Header Analyzer': 'Analisador de headers',
    'Parse raw message headers locally to summarize SPF, DKIM, DMARC and alignment clues.': 'Analise headers brutos localmente para resumir pistas de SPF, DKIM, DMARC e alinhamento.',
    'HTTP Status Checker': 'Verificador de status HTTP',
    'Check whether a public page answers with a healthy HTTP status and bounded timing data.': 'Verifique se uma página pública responde com status HTTP saudável e tempo limitado.',
    'Redirect Chain Checker': 'Verificador de cadeia de redirecionamentos',
    'Follow a short redirect chain and flag loops, cross-host hops and slow handoffs.': 'Siga uma cadeia curta de redirecionamentos e sinalize loops, saltos de host e lentidão.',
    'Security Headers Checker': 'Verificador de headers de segurança',
    'Inspect response headers for baseline browser security and caching signals.': 'Inspecione headers de resposta para sinais básicos de segurança e cache.',
    'Robots.txt Checker': 'Verificador de robots.txt',
    'Fetch the origin robots.txt file and identify basic crawl directives and sitemap hints.': 'Busque o robots.txt da origem e identifique diretivas básicas e pistas de sitemap.',
    'Sitemap Validator': 'Validador de sitemap',
    'Fetch a same-origin sitemap and summarize XML validity, URL count and basic size limits.': 'Busque um sitemap da mesma origem e resuma validade XML, contagem de URLs e limites.',
    'TTFB Checker': 'Verificador de TTFB',
    'Measure bounded first-byte timing for a public URL from one probe runtime.': 'Meça tempo até o primeiro byte para uma URL pública a partir de uma execução controlada.',
    'Performance Snapshot': 'Snapshot de performance',
    'Combine status, redirect count, headers, byte size and timing into a quick web health snapshot.': 'Combine status, redirecionamentos, headers, tamanho e tempo em um snapshot rápido de saúde web.',
    'Image Compressor': 'Compressor de imagens',
    'Compress a PNG, JPEG, WebP or AVIF image in the browser and download a lighter copy.': 'Comprima uma imagem PNG, JPEG, WebP ou AVIF no navegador e baixe uma cópia mais leve.',
    'Image Resizer': 'Redimensionador de imagens',
    'Resize an image to exact or proportional dimensions without uploading it to a server.': 'Redimensione uma imagem para medidas exatas ou proporcionais sem upload para servidor.',
    'Image Cropper': 'Recortador de imagens',
    'Create centered square, portrait or landscape crops from a selected browser-side image.': 'Crie cortes centralizados quadrados, verticais ou horizontais a partir de uma imagem local.',
    'Image Converter': 'Conversor de imagens',
    'Convert PNG, JPEG, WebP and browser-supported AVIF images to another common format.': 'Converta PNG, JPEG, WebP e AVIF suportado pelo navegador para outro formato comum.',
    'Metadata Remover': 'Removedor de metadados',
    'Strip camera metadata by drawing pixels to a clean Canvas and downloading a re-encoded copy.': 'Remova metadados de câmera redesenhando pixels em Canvas limpo e baixando uma cópia recodificada.',
    'Social Preset Generator': 'Gerador de presets sociais',
    'Generate square, story, Open Graph or marketplace-ready image sizes from one original.': 'Gere tamanhos quadrado, story, Open Graph ou marketplace a partir de uma imagem original.',
    'PDF Merge': 'Unir PDFs',
    'Combine up to five small PDFs in the browser and download one merged file.': 'Una até cinco PDFs pequenos no navegador e baixe um arquivo combinado.',
    'PDF Split': 'Dividir PDF',
    'Extract selected pages from one PDF locally and download a smaller PDF.': 'Extraia páginas selecionadas de um PDF localmente e baixe um PDF menor.',
    'PDF Rotate': 'Girar PDF',
    'Rotate all pages or a selected page range by 90, 180 or 270 degrees.': 'Gire todas as páginas ou um intervalo selecionado em 90, 180 ou 270 graus.',
    'PDF Compressor': 'Compressor de PDF',
    'Rewrite a PDF with object streams and clean metadata for a lightweight local copy.': 'Regrave um PDF com streams de objeto e metadados limpos para uma cópia local mais leve.',
    'PDF Watermark': 'Marca dágua em PDF',
    'Add a light text watermark to every page or a selected page range locally.': 'Adicione uma marca dágua textual leve em todas as páginas ou em um intervalo selecionado.',
    'PDF Page Numbers': 'Numeração de páginas PDF',
    'Add simple page numbers to a PDF in the browser without uploading it.': 'Adicione numeração simples a um PDF no navegador sem fazer upload.',
    'PDF Metadata Cleaner': 'Limpador de metadados PDF',
    'Text to PDF': 'Texto para PDF',
  },
  es: {
    'Structured Data Formatter': 'Formateador de datos estructurados',
    'Base64 Converter': 'Conversor Base64',
    'JWT Inspector': 'Inspector JWT',
    'Regex Tester': 'Probador de Regex',
    'Text Diff': 'Comparador de texto',
    'Cron Helper': 'Asistente Cron',
    'UUID Generator': 'Generador UUID',
    'Timestamp Converter': 'Conversor de timestamp',
    'Hash Generator': 'Generador de hash',
    'Time Zone Converter': 'Conversor de zonas horarias',
    'Date Difference Calculator': 'Calculadora de diferencia de fechas',
    'Business Days Calculator': 'Calculadora de días laborables',
    'Age Calculator': 'Calculadora de edad',
    'Percentage Calculator': 'Calculadora de porcentaje',
    'Unit Converter': 'Conversor de unidades',
    'Static QR Code Generator': 'Generador de QR estático',
    'Barcode Generator': 'Generador de código de barras',
    'UTM Builder': 'Constructor UTM',
    'vCard QR Builder': 'Constructor de QR vCard',
    'Wi-Fi QR Builder': 'Constructor de QR Wi-Fi',
    'QR Preview Lab': 'Laboratorio de vista previa QR',
    'Invoice Builder': 'Constructor de facturas',
    'Quote Builder': 'Constructor de presupuestos',
    'Receipt Builder': 'Constructor de recibos',
    'SPF Checker': 'Verificador SPF',
    'DKIM Checker': 'Verificador DKIM',
    'DMARC Checker': 'Verificador DMARC',
    'MX Checker': 'Verificador MX',
    'Blacklist Check': 'Consulta de blacklist',
    'SMTP Check': 'Prueba SMTP',
    'Header Analyzer': 'Analizador de headers',
    'HTTP Status Checker': 'Verificador de estado HTTP',
    'Redirect Chain Checker': 'Verificador de cadena de redirecciones',
    'Security Headers Checker': 'Verificador de headers de seguridad',
    'Robots.txt Checker': 'Verificador de robots.txt',
    'Sitemap Validator': 'Validador de sitemap',
    'TTFB Checker': 'Verificador de TTFB',
    'Performance Snapshot': 'Snapshot de rendimiento',
    'Image Compressor': 'Compresor de imágenes',
    'Image Resizer': 'Redimensionador de imágenes',
    'Image Cropper': 'Recortador de imágenes',
    'Image Converter': 'Conversor de imágenes',
    'Metadata Remover': 'Eliminador de metadatos',
    'Social Preset Generator': 'Generador de presets sociales',
    'PDF Merge': 'Unir PDFs',
    'PDF Split': 'Dividir PDF',
    'PDF Rotate': 'Girar PDF',
    'PDF Compressor': 'Compresor de PDF',
    'PDF Watermark': 'Marca de agua en PDF',
    'PDF Page Numbers': 'Números de página PDF',
    'PDF Metadata Cleaner': 'Limpiador de metadatos PDF',
    'Text to PDF': 'Texto a PDF',
    'Rotate all pages or a selected page range by 90, 180 or 270 degrees.': 'Gira todas las páginas o un rango seleccionado en 90, 180 o 270 grados.',
    'Create a scannable static QR code for a safe URL, plain text, email or phone payload.': 'Crea un QR estático escaneable para URL segura, texto, email o teléfono.',
    'Compress a PNG, JPEG, WebP or AVIF image in the browser and download a lighter copy.': 'Comprime una imagen PNG, JPEG, WebP o AVIF en el navegador y descarga una copia más ligera.',
    'Combine up to five small PDFs in the browser and download one merged file.': 'Une hasta cinco PDFs pequeños en el navegador y descarga un archivo combinado.',
    'Find the SPF TXT record for a domain and flag risky all, duplicate or lookup-heavy policies.': 'Encuentra el registro TXT SPF de un dominio y señala políticas riesgosas, duplicadas o pesadas.',
  },
  fr: {
    'Structured Data Formatter': 'Formateur de données structurées',
    'Base64 Converter': 'Convertisseur Base64',
    'JWT Inspector': 'Inspecteur JWT',
    'Regex Tester': 'Testeur Regex',
    'Text Diff': 'Comparateur de texte',
    'Cron Helper': 'Assistant Cron',
    'UUID Generator': 'Générateur UUID',
    'Timestamp Converter': 'Convertisseur de timestamp',
    'Hash Generator': 'Générateur de hash',
    'Time Zone Converter': 'Convertisseur de fuseaux horaires',
    'Date Difference Calculator': 'Calculateur de différence de dates',
    'Business Days Calculator': 'Calculateur de jours ouvrés',
    'Age Calculator': "Calculateur d'âge",
    'Percentage Calculator': 'Calculateur de pourcentage',
    'Unit Converter': "Convertisseur d'unités",
    'Static QR Code Generator': 'Générateur de QR statique',
    'Barcode Generator': 'Générateur de code-barres',
    'UTM Builder': 'Constructeur UTM',
    'vCard QR Builder': 'Constructeur de QR vCard',
    'Wi-Fi QR Builder': 'Constructeur de QR Wi-Fi',
    'QR Preview Lab': 'Laboratoire d’aperçu QR',
    'Invoice Builder': 'Générateur de factures',
    'Quote Builder': 'Générateur de devis',
    'Receipt Builder': 'Générateur de reçus',
    'SPF Checker': 'Vérificateur SPF',
    'DKIM Checker': 'Vérificateur DKIM',
    'DMARC Checker': 'Vérificateur DMARC',
    'MX Checker': 'Vérificateur MX',
    'Blacklist Check': 'Vérification blacklist',
    'SMTP Check': 'Test SMTP',
    'Header Analyzer': 'Analyseur de headers',
    'HTTP Status Checker': 'Vérificateur de statut HTTP',
    'Redirect Chain Checker': 'Vérificateur de chaîne de redirections',
    'Security Headers Checker': 'Vérificateur de headers de sécurité',
    'Robots.txt Checker': 'Vérificateur robots.txt',
    'Sitemap Validator': 'Validateur de sitemap',
    'TTFB Checker': 'Vérificateur TTFB',
    'Performance Snapshot': 'Snapshot performance',
    'Image Compressor': 'Compresseur d’images',
    'Image Resizer': 'Redimensionneur d’images',
    'Image Cropper': 'Recadrage d’images',
    'Image Converter': 'Convertisseur d’images',
    'Metadata Remover': 'Suppresseur de métadonnées',
    'Social Preset Generator': 'Générateur de presets sociaux',
    'PDF Merge': 'Fusionner des PDF',
    'PDF Split': 'Diviser un PDF',
    'PDF Rotate': 'Faire pivoter un PDF',
    'PDF Compressor': 'Compresseur de PDF',
    'PDF Watermark': 'Filigrane PDF',
    'PDF Page Numbers': 'Numéros de page PDF',
    'PDF Metadata Cleaner': 'Nettoyeur de métadonnées PDF',
    'Text to PDF': 'Texte vers PDF',
    'Rotate all pages or a selected page range by 90, 180 or 270 degrees.': 'Faites pivoter toutes les pages ou une plage sélectionnée de 90, 180 ou 270 degrés.',
    'Create a scannable static QR code for a safe URL, plain text, email or phone payload.': 'Créez un QR statique scannable pour URL sûre, texte, email ou téléphone.',
    'Compress a PNG, JPEG, WebP or AVIF image in the browser and download a lighter copy.': 'Compressez une image PNG, JPEG, WebP ou AVIF dans le navigateur et téléchargez une copie plus légère.',
    'Combine up to five small PDFs in the browser and download one merged file.': 'Fusionnez jusqu’à cinq petits PDF dans le navigateur et téléchargez un fichier unique.',
    'Find the SPF TXT record for a domain and flag risky all, duplicate or lookup-heavy policies.': 'Trouvez le TXT SPF d’un domaine et signalez les politiques risquées, dupliquées ou trop lourdes.',
  },
  de: {
    'Structured Data Formatter': 'Formatierer für strukturierte Daten',
    'Base64 Converter': 'Base64-Konverter',
    'JWT Inspector': 'JWT-Inspektor',
    'Regex Tester': 'Regex-Tester',
    'Text Diff': 'Textvergleich',
    'Cron Helper': 'Cron-Assistent',
    'UUID Generator': 'UUID-Generator',
    'Timestamp Converter': 'Timestamp-Konverter',
    'Hash Generator': 'Hash-Generator',
    'Time Zone Converter': 'Zeitzonen-Konverter',
    'Date Difference Calculator': 'Datumsdifferenz-Rechner',
    'Business Days Calculator': 'Arbeitstage-Rechner',
    'Age Calculator': 'Altersrechner',
    'Percentage Calculator': 'Prozentrechner',
    'Unit Converter': 'Einheiten-Konverter',
    'Static QR Code Generator': 'Generator für statische QR-Codes',
    'Barcode Generator': 'Barcode-Generator',
    'UTM Builder': 'UTM-Generator',
    'vCard QR Builder': 'vCard-QR-Generator',
    'Wi-Fi QR Builder': 'Wi-Fi-QR-Generator',
    'QR Preview Lab': 'QR-Vorschaulabor',
    'Invoice Builder': 'Rechnungsgenerator',
    'Quote Builder': 'Angebotsgenerator',
    'Receipt Builder': 'Beleggenerator',
    'SPF Checker': 'SPF-Prüfer',
    'DKIM Checker': 'DKIM-Prüfer',
    'DMARC Checker': 'DMARC-Prüfer',
    'MX Checker': 'MX-Prüfer',
    'Blacklist Check': 'Blacklist-Prüfung',
    'SMTP Check': 'SMTP-Test',
    'Header Analyzer': 'Header-Analyse',
    'HTTP Status Checker': 'HTTP-Statusprüfer',
    'Redirect Chain Checker': 'Redirect-Kettenprüfer',
    'Security Headers Checker': 'Sicherheitsheader-Prüfer',
    'Robots.txt Checker': 'Robots.txt-Prüfer',
    'Sitemap Validator': 'Sitemap-Validator',
    'TTFB Checker': 'TTFB-Prüfer',
    'Performance Snapshot': 'Performance-Snapshot',
    'Image Compressor': 'Bildkompressor',
    'Image Resizer': 'Bildgrößen-Tool',
    'Image Cropper': 'Bildzuschnitt',
    'Image Converter': 'Bildkonverter',
    'Metadata Remover': 'Metadaten-Entferner',
    'Social Preset Generator': 'Generator für Social-Presets',
    'PDF Merge': 'PDFs zusammenführen',
    'PDF Split': 'PDF teilen',
    'PDF Rotate': 'PDF drehen',
    'PDF Compressor': 'PDF-Kompressor',
    'PDF Watermark': 'PDF-Wasserzeichen',
    'PDF Page Numbers': 'PDF-Seitenzahlen',
    'PDF Metadata Cleaner': 'PDF-Metadatenreiniger',
    'Text to PDF': 'Text zu PDF',
    'Rotate all pages or a selected page range by 90, 180 or 270 degrees.': 'Drehen Sie alle Seiten oder einen ausgewählten Seitenbereich um 90, 180 oder 270 Grad.',
    'Create a scannable static QR code for a safe URL, plain text, email or phone payload.': 'Erstellen Sie einen scanbaren statischen QR-Code für sichere URL, Text, E-Mail oder Telefon.',
    'Compress a PNG, JPEG, WebP or AVIF image in the browser and download a lighter copy.': 'Komprimieren Sie PNG, JPEG, WebP oder AVIF im Browser und laden Sie eine leichtere Kopie herunter.',
    'Combine up to five small PDFs in the browser and download one merged file.': 'Führen Sie bis zu fünf kleine PDFs im Browser zusammen und laden Sie eine Datei herunter.',
    'Find the SPF TXT record for a domain and flag risky all, duplicate or lookup-heavy policies.': 'Finden Sie den SPF-TXT-Eintrag einer Domain und markieren Sie riskante, doppelte oder lookup-lastige Regeln.',
  },
}

function applyEnglishFallbackPhraseReplacements(locale: LocaleCode, value: string): string {
  const replacements = englishFallbackPhraseReplacements[locale]

  if (!replacements) {
    return value
  }

  return Object.entries(replacements).reduce((current, [source, replacement]) => current.split(source).join(replacement), value)
}

function sanitizePublicString(locale: LocaleCode, value: string): string {
  const replacements = [...internalTermReplacements[locale], ...(localeAccentReplacements[locale] ?? [])]

  const sanitized = replacements.reduce((current, [pattern, replacement]) => current.replace(pattern, replacement), value)

  return applyEnglishFallbackPhraseReplacements(locale, sanitized)
}

function isPlainObject(value: unknown): value is PublicCopyMap {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function sanitizePublicCopy<T>(locale: LocaleCode, value: T): T {
  if (typeof value === 'string') {
    return sanitizePublicString(locale, value) as T
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizePublicCopy(locale, item)) as T
  }

  if (value && isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, sanitizePublicCopy(locale, item)]),
    ) as T
  }

  return value
}
