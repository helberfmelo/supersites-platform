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

export type TrustPageSlug =
  | 'about'
  | 'contact'
  | 'privacy'
  | 'cookies'
  | 'terms'
  | 'methodology'
  | 'editorial-policy'
  | 'status'

export interface TrustContentSection {
  heading: string
  paragraphs: string[]
}

export interface TrustPageCopyShape {
  navLabel: string
  title: string
  description: string
  updatedLabel: string
  sections: TrustContentSection[]
}

export interface TrustSupportProfile {
  siteName: string
  publicPath: string
}

const trustNavLabels: Record<LocaleCode, Record<TrustPageSlug, string>> = {
  en: {
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy',
    cookies: 'Cookies',
    terms: 'Terms',
    methodology: 'Methodology',
    'editorial-policy': 'Editorial',
    status: 'Status',
  },
  'pt-br': {
    about: 'Sobre',
    contact: 'Contato',
    privacy: 'Privacidade',
    cookies: 'Cookies',
    terms: 'Termos',
    methodology: 'Metodologia',
    'editorial-policy': 'Editorial',
    status: 'Status',
  },
  es: {
    about: 'Acerca de',
    contact: 'Contacto',
    privacy: 'Privacidad',
    cookies: 'Cookies',
    terms: 'Términos',
    methodology: 'Metodología',
    'editorial-policy': 'Editorial',
    status: 'Estado',
  },
  fr: {
    about: 'À propos',
    contact: 'Contact',
    privacy: 'Confidentialité',
    cookies: 'Cookies',
    terms: 'Conditions',
    methodology: 'Méthodologie',
    'editorial-policy': 'Éditorial',
    status: 'Statut',
  },
  de: {
    about: 'Über',
    contact: 'Kontakt',
    privacy: 'Datenschutz',
    cookies: 'Cookies',
    terms: 'Bedingungen',
    methodology: 'Methodik',
    'editorial-policy': 'Redaktion',
    status: 'Status',
  },
}

function trustSection(heading: string, ...paragraphs: string[]): TrustContentSection {
  return { heading, paragraphs }
}

function localizedTrustTitle(locale: LocaleCode, slug: TrustPageSlug, siteName: string): string {
  const titles: Record<LocaleCode, Record<TrustPageSlug, string>> = {
    en: {
      about: `About ${siteName}`,
      contact: `Contact ${siteName}`,
      privacy: `${siteName} privacy`,
      cookies: `${siteName} cookies`,
      terms: `${siteName} terms of use`,
      methodology: `${siteName} methodology`,
      'editorial-policy': `${siteName} editorial policy`,
      status: `${siteName} public status`,
    },
    'pt-br': {
      about: `Sobre ${siteName}`,
      contact: `Contato de ${siteName}`,
      privacy: `Privacidade de ${siteName}`,
      cookies: `Cookies de ${siteName}`,
      terms: `Termos de uso de ${siteName}`,
      methodology: `Metodologia de ${siteName}`,
      'editorial-policy': `Política editorial de ${siteName}`,
      status: `Status público de ${siteName}`,
    },
    es: {
      about: `Acerca de ${siteName}`,
      contact: `Contacto de ${siteName}`,
      privacy: `Privacidad de ${siteName}`,
      cookies: `Cookies de ${siteName}`,
      terms: `Términos de uso de ${siteName}`,
      methodology: `Metodología de ${siteName}`,
      'editorial-policy': `Política editorial de ${siteName}`,
      status: `Estado público de ${siteName}`,
    },
    fr: {
      about: `À propos de ${siteName}`,
      contact: `Contact ${siteName}`,
      privacy: `Confidentialité de ${siteName}`,
      cookies: `Cookies de ${siteName}`,
      terms: `Conditions d’utilisation de ${siteName}`,
      methodology: `Méthodologie de ${siteName}`,
      'editorial-policy': `Politique éditoriale de ${siteName}`,
      status: `Statut public de ${siteName}`,
    },
    de: {
      about: `Über ${siteName}`,
      contact: `Kontakt zu ${siteName}`,
      privacy: `Datenschutz bei ${siteName}`,
      cookies: `Cookies bei ${siteName}`,
      terms: `Nutzungsbedingungen für ${siteName}`,
      methodology: `Methodik von ${siteName}`,
      'editorial-policy': `Redaktionelle Richtlinie von ${siteName}`,
      status: `Öffentlicher Status von ${siteName}`,
    },
  }

  return titles[locale][slug]
}

function localizedTrustDescription(locale: LocaleCode, slug: TrustPageSlug, siteName: string): string {
  const descriptions: Record<LocaleCode, Record<TrustPageSlug, string>> = {
    en: {
      about: `${siteName} explains its purpose, current public surface, free access boundary and review status.`,
      contact: `How to report feedback, privacy requests, security concerns, accessibility issues and corrections for ${siteName}.`,
      privacy: `${siteName} explains data minimization, tool input boundaries, analytics limits and future account rules.`,
      cookies: `${siteName} explains essential storage, consent, advertising storage and regional cookie choices.`,
      terms: `${siteName} sets baseline terms for responsible use, service limits and future paid features.`,
      methodology: `${siteName} explains how free tools, guidance, limits and corrections are reviewed.`,
      'editorial-policy': `${siteName} documents useful-content standards, localization review and correction handling.`,
      status: `${siteName} records public launch status, release recovery, monetization state and review checkpoints.`,
    },
    'pt-br': {
      about: `${siteName} explica propósito, superfície pública atual, limite gratuito e status de revisão.`,
      contact: `Como relatar feedback, privacidade, segurança, acessibilidade e correções de ${siteName}.`,
      privacy: `${siteName} explica minimização de dados, limites de entradas, analytics e regras futuras de conta.`,
      cookies: `${siteName} explica armazenamento essencial, consentimento, publicidade e escolhas regionais de cookies.`,
      terms: `${siteName} define termos base de uso responsável, limites do serviço e recursos pagos futuros.`,
      methodology: `${siteName} explica como ferramentas gratuitas, orientação, limites e correções são revisados.`,
      'editorial-policy': `${siteName} documenta padrões de conteúdo útil, revisão localizada e correções.`,
      status: `${siteName} registra status público, recuperação por release, monetização e pontos de revisão.`,
    },
    es: {
      about: `${siteName} explica propósito, superficie pública actual, límite gratis y estado de revisión.`,
      contact: `Cómo reportar feedback, privacidad, seguridad, accesibilidad y correcciones de ${siteName}.`,
      privacy: `${siteName} explica minimización de datos, límites de entradas, analytics y reglas futuras de cuenta.`,
      cookies: `${siteName} explica almacenamiento esencial, consentimiento, publicidad y opciones regionales de cookies.`,
      terms: `${siteName} define términos base de uso responsable, límites del servicio y funciones pagas futuras.`,
      methodology: `${siteName} explica cómo se revisan herramientas gratis, guía, límites y correcciones.`,
      'editorial-policy': `${siteName} documenta estándares de contenido útil, revisión localizada y correcciones.`,
      status: `${siteName} registra estado público, recuperación por release, monetización y puntos de revisión.`,
    },
    fr: {
      about: `${siteName} explique objectif, surface publique actuelle, limite gratuite et statut de revue.`,
      contact: `Comment signaler retours, confidentialité, sécurité, accessibilité et corrections pour ${siteName}.`,
      privacy: `${siteName} explique minimisation des données, limites des entrées, analytics et futures règles de compte.`,
      cookies: `${siteName} explique stockage essentiel, consentement, publicité et choix régionaux de cookies.`,
      terms: `${siteName} fixe les conditions de base pour usage responsable, limites du service et futures offres payantes.`,
      methodology: `${siteName} explique la revue des outils gratuits, guides, limites et corrections.`,
      'editorial-policy': `${siteName} documente standards de contenu utile, revue localisée et corrections.`,
      status: `${siteName} consigne statut public, récupération par release, monétisation et points de revue.`,
    },
    de: {
      about: `${siteName} erklärt Zweck, aktuelle öffentliche Oberfläche, kostenlosen Umfang und Prüfstatus.`,
      contact: `So melden Sie Feedback, Datenschutzanfragen, Sicherheitsfragen, Barrierefreiheit und Korrekturen zu ${siteName}.`,
      privacy: `${siteName} erklärt Datenminimierung, Eingabegrenzen, Analytics-Grenzen und künftige Kontoregeln.`,
      cookies: `${siteName} erklärt essenziellen Speicher, Einwilligung, Werbespeicher und regionale Cookie-Auswahl.`,
      terms: `${siteName} legt Basisbedingungen für verantwortliche Nutzung, Servicegrenzen und künftige Bezahlfunktionen fest.`,
      methodology: `${siteName} erklärt, wie kostenlose Tools, Hinweise, Grenzen und Korrekturen geprüft werden.`,
      'editorial-policy': `${siteName} dokumentiert Standards für nützliche Inhalte, Lokalisierung und Korrekturen.`,
      status: `${siteName} dokumentiert öffentlichen Status, Release-Wiederherstellung, Monetarisierung und Prüfpunkte.`,
    },
  }

  return descriptions[locale][slug]
}

function localizedTrustSections(locale: LocaleCode, slug: TrustPageSlug, profile: TrustSupportProfile): TrustContentSection[] {
  const { siteName, publicPath } = profile

  if (locale === 'pt-br') {
    const common = [
      trustSection('Revisão humana e escopo', `Estas páginas explicam o estado público de ${siteName}, mas políticas finais, suporte pago, doações e claims jurídicos ainda exigem revisão humana antes de monetização real.`),
    ]
    const sections: Record<TrustPageSlug, TrustContentSection[]> = {
      about: [
        trustSection('Superfície pública', `${siteName} faz parte do portfólio SuperSites e fica publicado temporariamente em ${publicPath} com HTTPS, sitemap, páginas localizadas e rollback por release.`),
        trustSection('Gratuito primeiro', 'A necessidade básica deve funcionar sem cadastro obrigatório. Conta, histórico, colaboração, automação, API, branding ou experiência sem anúncios pertencem a ofertas futuras.'),
        ...common,
      ],
      contact: [
        trustSection('O que enviar', 'Envie URL, idioma, ferramenta, comportamento observado, resultado esperado e contexto do navegador. Não envie senhas, documentos confidenciais, dados bancários, chaves de API ou dados pessoais sensíveis.'),
        trustSection('Suporte e doações', 'O bloco de apoio é informativo e inerte: não há link de pagamento, PIX, PayPal, Stripe, Buy Me a Coffee, carteira, checkout ou webhook ativo. Qualquer doação real exige aprovação humana, conta, impostos e termos.'),
        trustSection('Prioridade de correções', 'Privacidade, segurança, acessibilidade, tradução incorreta, link quebrado e resultado enganoso têm prioridade sobre pedidos comerciais.'),
      ],
      privacy: [
        trustSection('Minimização de dados', 'Entradas de ferramentas ficam no navegador ou em APIs públicas limitadas ao mínimo necessário. Eventos permitidos devem usar slugs, rota e locale, sem valores digitados ou arquivos.'),
        trustSection('Direitos e retenção', 'Contas, histórico salvo, exportação, exclusão e retenção precisam de regras visíveis antes de qualquer recurso pago.'),
        ...common,
      ],
      cookies: [
        trustSection('Armazenamento essencial', 'Idioma, consentimento e segurança de sessão podem usar armazenamento essencial quando existirem.'),
        trustSection('Analytics e anúncios', 'Tags externas, publicidade personalizada e armazenamento não essencial não são habilitados sem consentimento regional e revisão de posicionamento.'),
        ...common,
      ],
      terms: [
        trustSection('Uso responsável', `Use ${siteName} como ferramenta informativa. Não use para fraude, abuso, phishing, malware, spam, violação de privacidade ou decisões críticas sem validação própria.`),
        trustSection('Recursos pagos futuros', 'Preço, quotas, cancelamento, reembolso, impostos, termos do provedor e suporte precisam aparecer antes de qualquer checkout.'),
        ...common,
      ],
      methodology: [
        trustSection('Ferramenta antes de conteúdo', 'Cada página deve resolver uma tarefa real com ferramenta gratuita, exemplo, limite, interpretação e links relacionados antes de ser tratada como madura.'),
        trustSection('Correções e evidência', 'Afirmações sobre dados, privacidade, billing, anúncios, limites técnicos ou leis devem ser corrigidas quando evidência melhor estiver disponível.'),
        ...common,
      ],
      'editorial-policy': [
        trustSection('Conteúdo útil', 'Não publicar páginas em massa sem valor. Cada página precisa ter utilidade própria, contexto, limites, data de revisão e caminho de correção.'),
        trustSection('Localização', 'Páginas localizadas devem preservar sentido, limites, exemplos e avisos de segurança no idioma da rota.'),
        ...common,
      ],
      status: [
        trustSection('Produção atual', `${siteName} está publicado em ${publicPath} por release versionado, com smoke público e recuperação por release ou placeholder controlado.`),
        trustSection('Monetização e suporte', 'Anúncios reais, checkout, doações, afiliados, analytics externo, workers recorrentes e API paga não estão habilitados nesta superfície pública.'),
        ...common,
      ],
    }

    return sections[slug]
  }

  if (locale === 'es') {
    const common = [
      trustSection('Revisión humana y alcance', `Estas páginas explican el estado público de ${siteName}, pero políticas finales, soporte pago, donaciones y claims legales aún requieren revisión humana antes de monetización real.`),
    ]
    const sections: Record<TrustPageSlug, TrustContentSection[]> = {
      about: [
        trustSection('Superficie pública', `${siteName} forma parte del portafolio SuperSites y se publica temporalmente en ${publicPath} con HTTPS, sitemap, páginas localizadas y recuperación por release.`),
        trustSection('Gratis primero', 'La necesidad básica debe funcionar sin registro obligatorio. Cuenta, historial, colaboración, automatización, API, branding o experiencia sin anuncios pertenecen a ofertas futuras.'),
        ...common,
      ],
      contact: [
        trustSection('Qué enviar', 'Envía URL, idioma, herramienta, comportamiento observado, resultado esperado y navegador. No envíes contraseñas, documentos confidenciales, datos bancarios, claves API o datos personales sensibles.'),
        trustSection('Soporte y donaciones', 'La sección de apoyo es informativa e inerte: no hay enlace de pago, PIX, PayPal, Stripe, Buy Me a Coffee, wallet, checkout o webhook activo. Cualquier donación real requiere aprobación humana, cuenta, impuestos y términos.'),
        trustSection('Prioridad de correcciones', 'Privacidad, seguridad, accesibilidad, mala traducción, enlace roto y resultado engañoso tienen prioridad sobre pedidos comerciales.'),
      ],
      privacy: [
        trustSection('Minimización de datos', 'Las entradas quedan en el navegador o en APIs públicas limitadas al mínimo necesario. Eventos permitidos deben usar slugs, ruta y locale, sin valores ingresados ni archivos.'),
        trustSection('Derechos y retención', 'Cuentas, historial guardado, exportación, eliminación y retención necesitan reglas visibles antes de cualquier función paga.'),
        ...common,
      ],
      cookies: [
        trustSection('Almacenamiento esencial', 'Idioma, consentimiento y seguridad de sesión pueden usar almacenamiento esencial cuando existan.'),
        trustSection('Analytics y anuncios', 'Tags externas, publicidad personalizada y almacenamiento no esencial no se habilitan sin consentimiento regional y revisión de ubicación.'),
        ...common,
      ],
      terms: [
        trustSection('Uso responsable', `Usa ${siteName} como herramienta informativa. No la uses para fraude, abuso, phishing, malware, spam, violación de privacidad o decisiones críticas sin validación propia.`),
        trustSection('Funciones pagas futuras', 'Precio, cuotas, cancelación, reembolso, impuestos, términos del proveedor y soporte deben mostrarse antes de cualquier checkout.'),
        ...common,
      ],
      methodology: [
        trustSection('Herramienta antes que contenido', 'Cada página debe resolver una tarea real con herramienta gratis, ejemplo, límite, interpretación y enlaces relacionados antes de considerarse madura.'),
        trustSection('Correcciones y evidencia', 'Claims sobre datos, privacidad, billing, anuncios, límites técnicos o leyes deben corregirse cuando haya mejor evidencia.'),
        ...common,
      ],
      'editorial-policy': [
        trustSection('Contenido útil', 'No publicar páginas masivas sin valor. Cada página necesita utilidad propia, contexto, límites, fecha de revisión y vía de corrección.'),
        trustSection('Localización', 'Las páginas localizadas deben preservar sentido, límites, ejemplos y avisos de seguridad en el idioma de la ruta.'),
        ...common,
      ],
      status: [
        trustSection('Producción actual', `${siteName} está publicado en ${publicPath} por release versionado, con smoke público y recuperación por release o placeholder controlado.`),
        trustSection('Monetización y soporte', 'Anuncios reales, checkout, donaciones, afiliados, analytics externo, workers recurrentes y API paga no están habilitados en esta superficie pública.'),
        ...common,
      ],
    }

    return sections[slug]
  }

  if (locale === 'fr') {
    const common = [
      trustSection('Revue humaine et portée', `Ces pages expliquent l’état public de ${siteName}, mais politiques finales, support payant, dons et affirmations juridiques exigent encore une revue humaine avant toute monétisation réelle.`),
    ]
    const sections: Record<TrustPageSlug, TrustContentSection[]> = {
      about: [
        trustSection('Surface publique', `${siteName} fait partie du portefeuille SuperSites et est publié temporairement sur ${publicPath} avec HTTPS, sitemap, pages localisées et récupération par release.`),
        trustSection('Gratuit d’abord', 'Le besoin de base doit fonctionner sans inscription obligatoire. Compte, historique, collaboration, automatisation, API, branding ou expérience sans publicité relèvent d’offres futures.'),
        ...common,
      ],
      contact: [
        trustSection('Quoi envoyer', 'Envoyez URL, langue, outil, comportement observé, résultat attendu et navigateur. N’envoyez pas mots de passe, documents confidentiels, données bancaires, clés API ou données personnelles sensibles.'),
        trustSection('Support et dons', 'Le bloc de soutien est informatif et inerte : aucun lien de paiement, PIX, PayPal, Stripe, Buy Me a Coffee, wallet, checkout ou webhook n’est actif. Tout don réel exige approbation humaine, compte, taxes et conditions.'),
        trustSection('Priorité des corrections', 'Confidentialité, sécurité, accessibilité, mauvaise traduction, lien cassé et résultat trompeur priment sur les demandes commerciales.'),
      ],
      privacy: [
        trustSection('Minimisation des données', 'Les entrées restent dans le navigateur ou dans des APIs publiques limitées au minimum nécessaire. Les événements autorisés utilisent slugs, route et locale, sans valeurs saisies ni fichiers.'),
        trustSection('Droits et conservation', 'Comptes, historique sauvegardé, export, suppression et conservation nécessitent des règles visibles avant toute offre payante.'),
        ...common,
      ],
      cookies: [
        trustSection('Stockage essentiel', 'Langue, consentement et sécurité de session peuvent utiliser un stockage essentiel quand ces fonctions existent.'),
        trustSection('Analytics et publicités', 'Tags externes, publicité personnalisée et stockage non essentiel ne sont pas activés sans consentement régional et revue du placement.'),
        ...common,
      ],
      terms: [
        trustSection('Usage responsable', `Utilisez ${siteName} comme outil informatif. Ne l’utilisez pas pour fraude, abus, phishing, malware, spam, atteinte à la vie privée ou décisions critiques sans validation propre.`),
        trustSection('Fonctions payantes futures', 'Prix, quotas, annulation, remboursement, taxes, conditions fournisseur et support doivent être visibles avant tout checkout.'),
        ...common,
      ],
      methodology: [
        trustSection('Outil avant contenu', 'Chaque page doit résoudre une tâche réelle avec outil gratuit, exemple, limite, interprétation et liens connexes avant d’être considérée mature.'),
        trustSection('Corrections et preuves', 'Les affirmations sur données, confidentialité, billing, publicités, limites techniques ou lois doivent être corrigées si de meilleures preuves existent.'),
        ...common,
      ],
      'editorial-policy': [
        trustSection('Contenu utile', 'Ne pas publier de pages massives sans valeur. Chaque page doit avoir utilité propre, contexte, limites, date de revue et voie de correction.'),
        trustSection('Localisation', 'Les pages localisées doivent préserver sens, limites, exemples et avertissements de sécurité dans la langue de la route.'),
        ...common,
      ],
      status: [
        trustSection('Production actuelle', `${siteName} est publié sur ${publicPath} par release versionné, avec smoke public et récupération par release ou placeholder contrôlé.`),
        trustSection('Monétisation et support', 'Publicités réelles, checkout, dons, affiliation, analytics externe, workers récurrents et API payante ne sont pas activés sur cette surface publique.'),
        ...common,
      ],
    }

    return sections[slug]
  }

  if (locale === 'de') {
    const common = [
      trustSection('Menschliche Prüfung und Umfang', `Diese Seiten erklären den öffentlichen Stand von ${siteName}; finale Richtlinien, bezahlter Support, Spenden und rechtliche Aussagen benötigen vor realer Monetarisierung weiter menschliche Prüfung.`),
    ]
    const sections: Record<TrustPageSlug, TrustContentSection[]> = {
      about: [
        trustSection('Öffentliche Oberfläche', `${siteName} gehört zum SuperSites-Portfolio und ist vorübergehend unter ${publicPath} mit HTTPS, Sitemap, lokalisierten Seiten und Release-Wiederherstellung veröffentlicht.`),
        trustSection('Kostenlos zuerst', 'Die Grundaufgabe muss ohne Pflichtkonto funktionieren. Konto, Verlauf, Zusammenarbeit, Automatisierung, API, Branding oder werbefreie Nutzung gehören zu künftigen Angeboten.'),
        ...common,
      ],
      contact: [
        trustSection('Was senden', 'Senden Sie URL, Sprache, Tool, beobachtetes Verhalten, erwartetes Ergebnis und Browser. Senden Sie keine Passwörter, vertraulichen Dokumente, Bankdaten, API-Schlüssel oder sensiblen personenbezogenen Daten.'),
        trustSection('Support und Spenden', 'Der Unterstützungsblock ist informativ und inaktiv: Es gibt keinen Zahlungslink, kein PIX, PayPal, Stripe, Buy Me a Coffee, Wallet, Checkout oder Webhook. Jede echte Spende braucht menschliche Freigabe, Konto, Steuern und Bedingungen.'),
        trustSection('Priorität von Korrekturen', 'Datenschutz, Sicherheit, Barrierefreiheit, falsche Übersetzung, defekter Link und irreführendes Ergebnis haben Vorrang vor kommerziellen Anfragen.'),
      ],
      privacy: [
        trustSection('Datenminimierung', 'Eingaben bleiben im Browser oder in öffentlichen APIs mit minimal nötigem Umfang. Erlaubte Events nutzen Slugs, Route und Locale, keine eingegebenen Werte oder Dateien.'),
        trustSection('Rechte und Aufbewahrung', 'Konten, gespeicherter Verlauf, Export, Löschung und Aufbewahrung brauchen sichtbare Regeln vor jeder Bezahlfunktion.'),
        ...common,
      ],
      cookies: [
        trustSection('Essentieller Speicher', 'Sprache, Einwilligung und Sitzungssicherheit können essenziellen Speicher nutzen, wenn diese Funktionen existieren.'),
        trustSection('Analytics und Anzeigen', 'Externe Tags, personalisierte Werbung und nicht essenzieller Speicher werden ohne regionale Einwilligung und Platzierungsprüfung nicht aktiviert.'),
        ...common,
      ],
      terms: [
        trustSection('Verantwortliche Nutzung', `Nutzen Sie ${siteName} als informatives Tool. Nicht für Betrug, Missbrauch, Phishing, Malware, Spam, Datenschutzverletzung oder kritische Entscheidungen ohne eigene Prüfung nutzen.`),
        trustSection('Künftige Bezahlfunktionen', 'Preis, Quoten, Kündigung, Erstattung, Steuern, Anbieterbedingungen und Support müssen vor jedem Checkout sichtbar sein.'),
        ...common,
      ],
      methodology: [
        trustSection('Tool vor Inhalt', 'Jede Seite muss eine echte Aufgabe mit kostenlosem Tool, Beispiel, Grenze, Interpretation und verwandten Links lösen, bevor sie als reif gilt.'),
        trustSection('Korrekturen und Nachweise', 'Aussagen zu Daten, Datenschutz, Billing, Anzeigen, technischen Grenzen oder Gesetzen werden korrigiert, wenn bessere Nachweise vorliegen.'),
        ...common,
      ],
      'editorial-policy': [
        trustSection('Nützliche Inhalte', 'Keine massenhaften Seiten ohne Wert veröffentlichen. Jede Seite braucht eigenen Nutzen, Kontext, Grenzen, Prüfdatum und Korrekturweg.'),
        trustSection('Lokalisierung', 'Lokalisierte Seiten müssen Sinn, Grenzen, Beispiele und Sicherheitshinweise in der Routensprache bewahren.'),
        ...common,
      ],
      status: [
        trustSection('Aktuelle Produktion', `${siteName} ist unter ${publicPath} als versioniertes Release veröffentlicht, mit öffentlichem Smoke und Wiederherstellung per Release oder kontrolliertem Placeholder.`),
        trustSection('Monetarisierung und Support', 'Reale Anzeigen, Checkout, Spenden, Affiliate-Links, externe Analytics, wiederkehrende Worker und bezahlte API sind auf dieser öffentlichen Oberfläche nicht aktiviert.'),
        ...common,
      ],
    }

    return sections[slug]
  }

  const common = [
    trustSection('Human review and scope', `These pages explain the current public state of ${siteName}, but final legal policies, paid support, donations and legal claims still require human review before real monetization.`),
  ]
  const sections: Record<TrustPageSlug, TrustContentSection[]> = {
    about: [
      trustSection('Public surface', `${siteName} is part of the SuperSites portfolio and is temporarily published at ${publicPath} with HTTPS, localized pages, public sitemap and release recovery.`),
      trustSection('Free first', 'The basic task must work without mandatory signup. Accounts, history, collaboration, automation, API, branding and ad-free use belong to future offers.'),
      ...common,
    ],
    contact: [
      trustSection('What to send', 'Include URL, language, tool name, observed behavior, expected result and browser context. Do not send passwords, confidential documents, bank data, API keys or sensitive personal data.'),
      trustSection('Support and donations', 'The support block is informational and inert: no payment link, PIX, PayPal, Stripe, Buy Me a Coffee, wallet, checkout or webhook is active. Any real donation requires human approval, account setup, taxes and terms.'),
      trustSection('Correction priority', 'Privacy, security, accessibility, translation errors, broken links and misleading results take priority over commercial requests.'),
    ],
    privacy: [
      trustSection('Input and event boundaries', 'Tool inputs stay in the browser or in public APIs limited to what the task requires. Allowed events use slugs, route and locale, not entered values or files.'),
      trustSection('Rights and retention', 'Accounts, saved history, export, deletion and retention need visible rules before any paid feature launches.'),
      ...common,
    ],
    cookies: [
      trustSection('Essential storage', 'Language, consent and session security may use essential storage when those features exist.'),
      trustSection('Analytics and ads', 'External tags, personalized advertising and non-essential storage are not enabled without regional consent and placement review.'),
      ...common,
    ],
    terms: [
      trustSection('Responsible use', `Use ${siteName} as an informational tool. Do not use it for fraud, abuse, phishing, malware, spam, privacy violations or critical decisions without your own validation.`),
      trustSection('Future paid features', 'Pricing, quotas, cancellation, refunds, taxes, provider terms and support must be visible before any checkout launches.'),
      ...common,
    ],
    methodology: [
      trustSection('Tool before content', 'Each page should solve a real task with a free tool, example, limitation, interpretation and related links before it is treated as mature.'),
      trustSection('Corrections and evidence', 'Claims about data, privacy, billing, advertising, technical limits or law should be corrected when better evidence is available.'),
      ...common,
    ],
    'editorial-policy': [
      trustSection('Useful content', 'Do not publish low-value mass pages. Each page needs its own utility, context, limits, review date and correction path.'),
      trustSection('Localization', 'Localized pages must preserve meaning, limits, examples and safety notices in the route language.'),
      ...common,
    ],
    status: [
      trustSection('Current production', `${siteName} is published at ${publicPath} as a versioned release, with public smoke checks and recovery by release or controlled placeholder.`),
      trustSection('Monetization and support', 'Real ads, checkout, donations, affiliates, external analytics, recurring workers and paid API are not enabled on this public surface.'),
      ...common,
    ],
  }

  return sections[slug]
}

export function buildTrustPageCopy<T extends TrustPageCopyShape>(
  locale: LocaleCode,
  slug: TrustPageSlug,
  baseCopy: T,
  profile: TrustSupportProfile,
): T {
  const trustSections = localizedTrustSections(locale, slug, profile)
  const localizedCopy = {
    ...baseCopy,
    navLabel: trustNavLabels[locale][slug],
    title: locale === 'en' ? baseCopy.title : localizedTrustTitle(locale, slug, profile.siteName),
    description: locale === 'en'
      ? baseCopy.description
      : localizedTrustDescription(locale, slug, profile.siteName),
    sections: locale === 'en' ? [...baseCopy.sections, ...trustSections] : trustSections,
  }

  return sanitizePublicCopy(locale, localizedCopy) as T
}

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
    'Lookup target': 'Alvo da consulta',
    'Domain name': 'Nome de domínio',
    'Website URL': 'URL do site',
    'Expected value (optional)': 'Valor esperado (opcional)',
    'Current connection': 'Conexão atual',
    'Raw headers': 'Headers brutos',
    'Run IP check': 'Executar consulta de IP',
    'Run DNS lookup': 'Executar consulta DNS',
    'Run RDAP lookup': 'Executar consulta RDAP',
    'Run SSL check': 'Executar verificação SSL',
    'Run propagation check': 'Executar propagação',
    'Run port check': 'Executar teste de porta',
    'Run reachability check': 'Executar teste de alcance',
    'Run SPF check': 'Executar verificação SPF',
    'Run DKIM check': 'Executar verificação DKIM',
    'Run DMARC check': 'Executar verificação DMARC',
    'Run MX check': 'Executar verificação MX',
    'Run blacklist check': 'Consultar blacklist',
    'Run SMTP check': 'Executar teste SMTP',
    'Analyze headers': 'Analisar headers',
    'Check status': 'Verificar status',
    'Trace redirects': 'Rastrear redirecionamentos',
    'Check headers': 'Verificar headers',
    'Check robots.txt': 'Verificar robots.txt',
    'Validate sitemap': 'Validar sitemap',
    'Measure TTFB': 'Medir TTFB',
    'Run snapshot': 'Executar snapshot',
    'Final URL': 'URL final',
    'Check': 'Verificação',
    'Status': 'Status',
    'Cache': 'Cache',
    'cached': 'em cache',
    'fresh': 'novo',
    'The result shows': 'O resultado mostra',
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
    'Lookup target': 'Objetivo de consulta',
    'Domain name': 'Nombre de dominio',
    'Website URL': 'URL del sitio',
    'Expected value (optional)': 'Valor esperado (opcional)',
    'Current connection': 'Conexión actual',
    'Raw headers': 'Headers brutos',
    'Run IP check': 'Ejecutar consulta de IP',
    'Run DNS lookup': 'Ejecutar consulta DNS',
    'Run RDAP lookup': 'Ejecutar consulta RDAP',
    'Run SSL check': 'Ejecutar verificación SSL',
    'Run propagation check': 'Ejecutar propagación',
    'Run port check': 'Ejecutar prueba de puerto',
    'Run reachability check': 'Ejecutar prueba de alcance',
    'Run SPF check': 'Ejecutar verificación SPF',
    'Run DKIM check': 'Ejecutar verificación DKIM',
    'Run DMARC check': 'Ejecutar verificación DMARC',
    'Run MX check': 'Ejecutar verificación MX',
    'Run blacklist check': 'Consultar blacklist',
    'Run SMTP check': 'Ejecutar prueba SMTP',
    'Analyze headers': 'Analizar headers',
    'Check status': 'Verificar estado',
    'Trace redirects': 'Rastrear redirecciones',
    'Check headers': 'Verificar headers',
    'Check robots.txt': 'Verificar robots.txt',
    'Validate sitemap': 'Validar sitemap',
    'Measure TTFB': 'Medir TTFB',
    'Run snapshot': 'Ejecutar snapshot',
    'Final URL': 'URL final',
    'Check': 'Verificación',
    'Status': 'Estado',
    'Cache': 'Cache',
    'cached': 'en cache',
    'fresh': 'nuevo',
    'The result shows': 'El resultado muestra',
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
    'Lookup target': 'Cible du contrôle',
    'Domain name': 'Nom de domaine',
    'Website URL': 'URL du site',
    'Expected value (optional)': 'Valeur attendue (facultatif)',
    'Current connection': 'Connexion actuelle',
    'Raw headers': 'Headers bruts',
    'Run IP check': 'Lancer le contrôle IP',
    'Run DNS lookup': 'Lancer la recherche DNS',
    'Run RDAP lookup': 'Lancer la recherche RDAP',
    'Run SSL check': 'Lancer le contrôle SSL',
    'Run propagation check': 'Lancer le contrôle de propagation',
    'Run port check': 'Lancer le test de port',
    'Run reachability check': 'Lancer le contrôle d’accès',
    'Run SPF check': 'Lancer le contrôle SPF',
    'Run DKIM check': 'Lancer le contrôle DKIM',
    'Run DMARC check': 'Lancer le contrôle DMARC',
    'Run MX check': 'Lancer le contrôle MX',
    'Run blacklist check': 'Vérifier la blacklist',
    'Run SMTP check': 'Lancer le test SMTP',
    'Analyze headers': 'Analyser les headers',
    'Check status': 'Vérifier le statut',
    'Trace redirects': 'Tracer les redirections',
    'Check headers': 'Vérifier les headers',
    'Check robots.txt': 'Vérifier robots.txt',
    'Validate sitemap': 'Valider le sitemap',
    'Measure TTFB': 'Mesurer le TTFB',
    'Run snapshot': 'Lancer le snapshot',
    'Final URL': 'URL finale',
    'Check': 'Contrôle',
    'Status': 'Statut',
    'Cache': 'Cache',
    'cached': 'en cache',
    'fresh': 'récent',
    'The result shows': 'Le résultat affiche',
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
    'Lookup target': 'Prüfziel',
    'Domain name': 'Domainname',
    'Website URL': 'Website-URL',
    'Expected value (optional)': 'Erwarteter Wert (optional)',
    'Current connection': 'Aktuelle Verbindung',
    'Raw headers': 'Rohheader',
    'Run IP check': 'IP-Prüfung starten',
    'Run DNS lookup': 'DNS-Lookup starten',
    'Run RDAP lookup': 'RDAP-Lookup starten',
    'Run SSL check': 'SSL-Prüfung starten',
    'Run propagation check': 'Propagation prüfen',
    'Run port check': 'Port prüfen',
    'Run reachability check': 'Erreichbarkeit prüfen',
    'Run SPF check': 'SPF prüfen',
    'Run DKIM check': 'DKIM prüfen',
    'Run DMARC check': 'DMARC prüfen',
    'Run MX check': 'MX prüfen',
    'Run blacklist check': 'Blacklist prüfen',
    'Run SMTP check': 'SMTP prüfen',
    'Analyze headers': 'Header analysieren',
    'Check status': 'Status prüfen',
    'Trace redirects': 'Weiterleitungen verfolgen',
    'Check headers': 'Header prüfen',
    'Check robots.txt': 'robots.txt prüfen',
    'Validate sitemap': 'Sitemap validieren',
    'Measure TTFB': 'TTFB messen',
    'Run snapshot': 'Snapshot starten',
    'Final URL': 'Finale URL',
    'Check': 'Prüfung',
    'Status': 'Status',
    'Cache': 'Cache',
    'cached': 'aus Cache',
    'fresh': 'neu',
    'The result shows': 'Das Ergebnis zeigt',
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

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function replaceEnglishFallbackPhrase(value: string, source: string, replacement: string): string {
  const startsWithWord = /^[A-Za-z0-9]/.test(source)
  const endsWithWord = /[A-Za-z0-9]$/.test(source)
  const prefixPattern = startsWithWord ? '(^|[^A-Za-z0-9])' : ''
  const suffixPattern = endsWithWord ? '(?![A-Za-z0-9])' : ''
  const pattern = new RegExp(`${prefixPattern}${escapeRegExp(source)}${suffixPattern}`, 'g')

  return value.replace(pattern, (...args: unknown[]) => {
    const prefix = startsWithWord ? String(args[1] ?? '') : ''

    return `${prefix}${replacement}`
  })
}

function applyEnglishFallbackPhraseReplacements(locale: LocaleCode, value: string): string {
  const replacements = englishFallbackPhraseReplacements[locale]

  if (!replacements) {
    return value
  }

  return Object.entries(replacements).reduce(
    (current, [source, replacement]) => replaceEnglishFallbackPhrase(current, source, replacement),
    value,
  )
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
