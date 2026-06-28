import { sanitizePublicCopy, type LocaleCode } from './locales'

export const contentPageSlugs = [
  'about',
  'contact',
  'privacy',
  'cookies',
  'terms',
  'methodology',
  'editorial-policy',
  'status',
] as const

export type ContentPageSlug = (typeof contentPageSlugs)[number]

export interface ContentSection {
  heading: string
  paragraphs: string[]
}

export interface ContentPageCopy {
  navLabel: string
  title: string
  description: string
  updatedLabel: string
  sections: ContentSection[]
}

export interface ContentPage {
  slug: ContentPageSlug
  localized: Record<LocaleCode, ContentPageCopy>
}

function page(slug: ContentPageSlug, localized: Record<LocaleCode, ContentPageCopy>): ContentPage {
  return { slug, localized }
}

function copy(
  navLabel: string,
  title: string,
  description: string,
  updatedLabel: string,
  sections: Array<[string, string]>,
): ContentPageCopy {
  return {
    navLabel,
    title,
    description,
    updatedLabel,
    sections: sections.map(([heading, paragraph]) => ({ heading, paragraphs: [paragraph] })),
  }
}

const reviewed = {
  en: 'Reviewed June 26, 2026',
  'pt-br': 'Revisado em 26 de junho de 2026',
  es: 'Revisado el 26 de junio de 2026',
  fr: 'Revise le 26 juin 2026',
  de: 'Geprueft am 26. Juni 2026',
} satisfies Record<LocaleCode, string>

export const contentPageCatalog: ContentPage[] = [
  page('about', {
    en: copy('About', 'About CalcHarbor', 'CalcHarbor is the SuperSites product for finance and business calculators with transparent formulas.', reviewed.en, [
      ['Purpose', 'The site helps people answer common planning questions quickly while keeping formulas visible and assumptions clear.'],
      ['What is live now', 'CalcHarbor provides four browser-side calculators: loan payment, break-even point, gross margin and ROI.'],
      ['Upgrade boundary', 'Paid value is planned around saved scenarios, exports, widgets, team workflows, API access and no ads.'],
    ]),
    'pt-br': copy('Sobre', 'Sobre o CalcHarbor', 'CalcHarbor e o produto SuperSites de calculadoras financeiras e empresariais com formulas transparentes.', reviewed['pt-br'], [
      ['Proposito', 'O site ajuda a responder perguntas comuns de planejamento mantendo formulas e premissas visiveis.'],
      ['O que esta ativo', 'O CalcHarbor oferece quatro calculadoras no navegador: parcela, ponto de equilibrio, margem bruta e ROI.'],
      ['Fronteira do upgrade', 'O valor pago planejado esta em cenarios salvos, exportacoes, widgets, equipes, API e ausencia de anuncios.'],
    ]),
    es: copy('Acerca de', 'Acerca de CalcHarbor', 'CalcHarbor es el producto SuperSites de calculadoras financieras y de negocio con formulas transparentes.', reviewed.es, [
      ['Proposito', 'El sitio responde preguntas comunes de planificacion con formulas y supuestos visibles.'],
      ['Que esta activo', 'CalcHarbor ofrece cuatro calculadoras en el navegador: prestamo, equilibrio, margen bruto y ROI.'],
      ['Limite de upgrade', 'El valor pago se planea para escenarios, exportes, widgets, equipos, API y sin anuncios.'],
    ]),
    fr: copy('A propos', 'A propos de CalcHarbor', 'CalcHarbor est le produit SuperSites de calculatrices finance et business avec formules transparentes.', reviewed.fr, [
      ['Objectif', 'Le site repond aux questions de planification courantes avec formules et hypotheses visibles.'],
      ['Actif maintenant', 'CalcHarbor propose quatre calculatrices navigateur: pret, seuil de rentabilite, marge brute et ROI.'],
      ['Limite upgrade', 'La valeur payante vise scenarios, exports, widgets, equipes, API et absence de publicite.'],
    ]),
    de: copy('Ueber', 'Ueber CalcHarbor', 'CalcHarbor ist das SuperSites-Produkt fuer Finanz- und Business-Rechner mit transparenten Formeln.', reviewed.de, [
      ['Zweck', 'Die Seite beantwortet Planungsfragen schnell und zeigt Formeln sowie Annahmen sichtbar an.'],
      ['Jetzt live', 'CalcHarbor bietet vier Browser-Rechner: Kreditrate, Break-even, Bruttomarge und ROI.'],
      ['Upgrade-Grenze', 'Bezahlwert ist fuer Szenarien, Exporte, Widgets, Teams, API und keine Anzeigen geplant.'],
    ]),
  }),
  page('contact', {
    en: copy('Contact', 'Contact CalcHarbor', 'How to reach the SuperSites operator about CalcHarbor corrections, privacy, security and calculator feedback.', reviewed.en, [
      ['Useful reports', 'Include the page URL, language, calculator name, observed behavior, expected result and browser context.'],
      ['Do not send secrets', 'Do not send bank data, tax identifiers, card numbers, passwords or confidential company files through feedback.'],
      ['Public channel gate', 'A monitored public mailbox is required before independent launch; until then feedback remains in the owner workflow.'],
    ]),
    'pt-br': copy('Contato', 'Contato do CalcHarbor', 'Como falar com o operador SuperSites sobre correcoes, privacidade, seguranca e feedback de calculadoras.', reviewed['pt-br'], [
      ['Relatos uteis', 'Inclua URL, idioma, calculadora, comportamento observado, resultado esperado e contexto do navegador.'],
      ['Nao envie segredos', 'Nao envie dados bancarios, fiscais, cartao, senhas ou arquivos confidenciais de empresa.'],
      ['Gate de canal publico', 'Uma caixa publica monitorada e exigida antes do lancamento independente; ate la o feedback fica no fluxo do proprietario.'],
    ]),
    es: copy('Contacto', 'Contacto de CalcHarbor', 'Como contactar al operador SuperSites sobre correcciones, privacidad, seguridad y feedback.', reviewed.es, [
      ['Reportes utiles', 'Incluye URL, idioma, calculadora, comportamiento observado, resultado esperado y navegador.'],
      ['No envies secretos', 'No envies datos bancarios, fiscales, tarjetas, contrasenas o archivos confidenciales.'],
      ['Gate de canal publico', 'Se requiere buzón publico monitoreado antes del lanzamiento independiente; hasta entonces queda en el flujo del propietario.'],
    ]),
    fr: copy('Contact', 'Contacter CalcHarbor', 'Comment joindre l operateur SuperSites pour corrections, confidentialite, securite et retours.', reviewed.fr, [
      ['Rapports utiles', 'Indiquez URL, langue, calculatrice, comportement observe, resultat attendu et navigateur.'],
      ['Pas de secrets', 'N envoyez pas donnees bancaires, fiscales, cartes, mots de passe ou fichiers confidentiels.'],
      ['Gate canal public', 'Une boite publique surveillee est requise avant lancement independant; les retours restent dans le flux proprietaire.'],
    ]),
    de: copy('Kontakt', 'Kontakt zu CalcHarbor', 'So erreichen Sie den SuperSites-Betreiber fuer Korrekturen, Datenschutz, Sicherheit und Feedback.', reviewed.de, [
      ['Nuetzliche Meldungen', 'Nennen Sie URL, Sprache, Rechner, beobachtetes Verhalten, erwartetes Ergebnis und Browser.'],
      ['Keine Geheimnisse', 'Senden Sie keine Bankdaten, Steuerdaten, Karten, Passwoerter oder vertrauliche Firmenunterlagen.'],
      ['Gate fuer Kontaktkanal', 'Ein ueberwachtes Postfach ist vor eigenem Launch noetig; bis dahin bleibt Feedback im Betreiberfluss.'],
    ]),
  }),
  page('privacy', {
    en: copy('Privacy', 'Privacy Policy', 'CalcHarbor minimizes collection by running calculators locally in the browser.', reviewed.en, [
      ['Data minimization', 'Calculator inputs and results are not sent to a product API or stored by CalcHarbor in this MVP.'],
      ['Analytics boundary', 'Allowed analytics events may record calculator slugs and page paths, but not entered amounts, rates or results.'],
      ['Future accounts', 'Saved scenarios and exports require account, retention, export and deletion rules before launch.'],
    ]),
    'pt-br': copy('Privacidade', 'Politica de Privacidade', 'CalcHarbor minimiza coleta rodando as calculadoras localmente no navegador.', reviewed['pt-br'], [
      ['Minimizacao', 'Entradas e resultados nao sao enviados a API de produto nem armazenados pelo CalcHarbor neste MVP.'],
      ['Fronteira de analytics', 'Eventos permitidos podem registrar slug e rota, mas nao valores, taxas ou resultados digitados.'],
      ['Contas futuras', 'Cenarios salvos e exportacoes exigem regras de conta, retencao, exportacao e exclusao antes do lancamento.'],
    ]),
    es: copy('Privacidad', 'Politica de Privacidad', 'CalcHarbor minimiza recoleccion ejecutando calculadoras localmente en el navegador.', reviewed.es, [
      ['Minimizacion', 'Entradas y resultados no se envian a una API de producto ni se almacenan en este MVP.'],
      ['Limite analytics', 'Eventos permitidos pueden registrar slug y ruta, pero no montos, tasas o resultados.'],
      ['Cuentas futuras', 'Escenarios y exportes requieren reglas de cuenta, retencion, exportacion y eliminacion antes del lanzamiento.'],
    ]),
    fr: copy('Confidentialite', 'Politique de confidentialite', 'CalcHarbor minimise la collecte en executant les calculatrices localement.', reviewed.fr, [
      ['Minimisation', 'Entrees et resultats ne sont pas envoyes a une API produit ni stockes dans ce MVP.'],
      ['Limite analytics', 'Les evenements peuvent enregistrer slug et chemin, pas montants, taux ou resultats.'],
      ['Comptes futurs', 'Scenarios et exports exigent compte, retention, export et suppression avant lancement.'],
    ]),
    de: copy('Datenschutz', 'Datenschutzerklaerung', 'CalcHarbor minimiert Erhebung, indem Sprint-3.1-Rechner lokal im Browser laufen.', reviewed.de, [
      ['Datenminimierung', 'Eingaben und Ergebnisse werden in diesem MVP nicht an eine Produkt-API gesendet oder gespeichert.'],
      ['Analytics-Grenze', 'Erlaubte Events duerfen Rechner-Slug und Pfad enthalten, aber keine Betraege, Saetze oder Ergebnisse.'],
      ['Zukuenftige Konten', 'Gespeicherte Szenarien und Exporte brauchen Regeln fuer Konto, Aufbewahrung, Export und Loeschung.'],
    ]),
  }),
  page('cookies', {
    en: copy('Cookies', 'Cookie Policy', 'How CalcHarbor plans essential storage, consent-aware analytics and advertising controls after gates.', reviewed.en, [
      ['Essential storage', 'Language, consent and session security may use essential storage when those features are enabled.'],
      ['Analytics and ads', 'External analytics and advertising storage remain blocked until consent mode and regional rules are implemented.'],
      ['Choices', 'A consent interface must exist before non-essential storage is used. Browser settings can clear local data.'],
    ]),
    'pt-br': copy('Cookies', 'Politica de Cookies', 'Como o CalcHarbor planeja armazenamento essencial, analytics com consentimento e controles de anuncios.', reviewed['pt-br'], [
      ['Essencial', 'Idioma, consentimento e seguranca de sessao podem usar armazenamento essencial quando ativos.'],
      ['Analytics e ads', 'Analytics externo e anuncios seguem bloqueados ate consent mode e regras regionais.'],
      ['Escolhas', 'Uma interface de consentimento deve existir antes de armazenamento nao essencial.'],
    ]),
    es: copy('Cookies', 'Politica de Cookies', 'Como CalcHarbor planea almacenamiento esencial, analytics con consentimiento y anuncios.', reviewed.es, [
      ['Esencial', 'Idioma, consentimiento y seguridad de sesion pueden usar almacenamiento esencial cuando esten activos.'],
      ['Analytics y ads', 'Analytics externo y anuncios siguen bloqueados hasta consent mode y reglas regionales.'],
      ['Opciones', 'Debe existir interfaz de consentimiento antes de almacenamiento no esencial.'],
    ]),
    fr: copy('Cookies', 'Politique cookies', 'Comment CalcHarbor prevoit stockage essentiel, analytics avec consentement et publicites.', reviewed.fr, [
      ['Essentiel', 'Langue, consentement et securite de session peuvent utiliser du stockage essentiel.'],
      ['Analytics et pubs', 'Analytics externe et publicites restent bloques jusqu au consent mode et aux regles regionales.'],
      ['Choix', 'Une interface de consentement doit exister avant tout stockage non essentiel.'],
    ]),
    de: copy('Cookies', 'Cookie-Richtlinie', 'Wie CalcHarbor essenziellen Speicher, Consent-Analytics und Anzeigenkontrollen plant.', reviewed.de, [
      ['Essenziell', 'Sprache, Consent und Sitzungssicherheit koennen essenziellen Speicher nutzen, wenn aktiv.'],
      ['Analytics und Anzeigen', 'Externe Analytics und Anzeigen bleiben bis Consent Mode und regionale Regeln gesperrt.'],
      ['Auswahl', 'Eine Consent-Oberflaeche muss vor nicht essenziellem Speicher existieren.'],
    ]),
  }),
  page('terms', {
    en: copy('Terms', 'Terms of Use', 'Baseline terms for responsible use of CalcHarbor calculators and future commercial features.', reviewed.en, [
      ['Informational planning', 'Calculator outputs are planning aids and not financial, legal, tax, accounting or credit advice.'],
      ['Responsible use', 'Do not use the service to mislead others, generate deceptive offers or hide material assumptions.'],
      ['Paid features', 'Commercial features require visible pricing, quotas, cancellation rules and provider terms before checkout.'],
    ]),
    'pt-br': copy('Termos', 'Termos de Uso', 'Termos base para uso responsavel das calculadoras CalcHarbor e recursos comerciais futuros.', reviewed['pt-br'], [
      ['Planejamento informativo', 'Resultados sao apoio de planejamento, nao aconselhamento financeiro, juridico, fiscal, contabil ou de credito.'],
      ['Uso responsavel', 'Nao use o servico para enganar pessoas, criar ofertas enganosas ou esconder premissas relevantes.'],
      ['Recursos pagos', 'Recursos comerciais exigem preco, quotas, cancelamento e termos visiveis antes do checkout.'],
    ]),
    es: copy('Terminos', 'Terminos de Uso', 'Terminos base para uso responsable de calculadoras CalcHarbor y funciones comerciales futuras.', reviewed.es, [
      ['Planificacion informativa', 'Los resultados ayudan a planificar; no son consejo financiero, legal, fiscal, contable o crediticio.'],
      ['Uso responsable', 'No uses el servicio para enganar, crear ofertas enganosas u ocultar supuestos relevantes.'],
      ['Funciones pagas', 'Las funciones comerciales requieren precios, cuotas, cancelacion y terminos visibles antes de checkout.'],
    ]),
    fr: copy('Conditions', 'Conditions d utilisation', 'Conditions de base pour usage responsable des calculatrices et futures offres.', reviewed.fr, [
      ['Planification informative', 'Les resultats aident a planifier; ils ne sont pas conseil financier, juridique, fiscal, comptable ou credit.'],
      ['Usage responsable', 'N utilisez pas le service pour tromper, creer des offres trompeuses ou cacher des hypotheses.'],
      ['Fonctions payantes', 'Les offres commerciales exigent prix, quotas, annulation et conditions visibles avant checkout.'],
    ]),
    de: copy('Bedingungen', 'Nutzungsbedingungen', 'Basisbedingungen fuer verantwortliche Nutzung der Rechner und zukuenftiger Angebote.', reviewed.de, [
      ['Informative Planung', 'Ergebnisse sind Planungshilfen, keine Finanz-, Rechts-, Steuer-, Buchhaltungs- oder Kreditberatung.'],
      ['Verantwortliche Nutzung', 'Nutzen Sie den Dienst nicht fuer Taeuschung, irrefuehrende Angebote oder versteckte Annahmen.'],
      ['Bezahlfunktionen', 'Kommerzielle Funktionen brauchen sichtbare Preise, Quoten, Kuendigung und Bedingungen vor Checkout.'],
    ]),
  }),
  page('methodology', {
    en: copy('Methodology', 'Methodology', 'How CalcHarbor keeps formulas visible, examples practical and uncertainty explicit.', reviewed.en, [
      ['Formula first', 'Each tool states the formula and uses deterministic client-side arithmetic for the displayed result.'],
      ['Assumption labels', 'Inputs name the unit, period or rate basis so users can avoid mixing monthly and annual values.'],
      ['Uncertainty', 'Results exclude taxes, fees, risk, inflation and accounting choices unless those are explicitly entered.'],
    ]),
    'pt-br': copy('Metodologia', 'Metodologia', 'Como o CalcHarbor mantem formulas visiveis, exemplos praticos e incerteza explicita.', reviewed['pt-br'], [
      ['Formula primeiro', 'Cada ferramenta declara a formula e usa aritmetica client-side deterministica para o resultado.'],
      ['Premissas', 'Campos indicam unidade, periodo ou base de taxa para evitar mistura de mensal e anual.'],
      ['Incerteza', 'Resultados excluem impostos, tarifas, risco, inflacao e escolhas contabeis se nao forem informados.'],
    ]),
    es: copy('Metodologia', 'Metodologia', 'Como CalcHarbor mantiene formulas visibles, ejemplos practicos e incertidumbre explicita.', reviewed.es, [
      ['Formula primero', 'Cada herramienta declara formula y usa aritmetica client-side deterministica.'],
      ['Supuestos', 'Campos nombran unidad, periodo o base de tasa para evitar mezclar mensual y anual.'],
      ['Incertidumbre', 'Resultados excluyen impuestos, cargos, riesgo, inflacion y decisiones contables si no se ingresan.'],
    ]),
    fr: copy('Methodologie', 'Methodologie', 'Comment CalcHarbor garde formules visibles, exemples pratiques et incertitude explicite.', reviewed.fr, [
      ['Formule d abord', 'Chaque outil affiche la formule et utilise une arithmetique client-side deterministe.'],
      ['Hypotheses', 'Les champs nomment unite, periode ou base de taux pour eviter les melanges.'],
      ['Incertitude', 'Resultats excluent taxes, frais, risque, inflation et choix comptables si non saisis.'],
    ]),
    de: copy('Methodik', 'Methodik', 'Wie CalcHarbor Formeln sichtbar, Beispiele praktisch und Unsicherheit klar haelt.', reviewed.de, [
      ['Formel zuerst', 'Jedes Tool nennt die Formel und nutzt deterministische Client-Rechnung.'],
      ['Annahmen', 'Felder nennen Einheit, Zeitraum oder Zinsbasis, damit Monats- und Jahreswerte nicht vermischt werden.'],
      ['Unsicherheit', 'Ergebnisse schliessen Steuern, Gebuehren, Risiko, Inflation und Buchhaltungswahl aus, wenn nicht eingegeben.'],
    ]),
  }),
  page('editorial-policy', {
    en: copy('Editorial', 'Editorial Policy', 'Editorial rules for useful CalcHarbor pages, corrections and avoiding shallow calculator content.', reviewed.en, [
      ['Useful pages', 'Each calculator page must include a working tool, formula, interpretation, example, limits, FAQ and review date.'],
      ['Corrections', 'Corrections are prioritized when a formula, unit, assumption or interpretation could mislead decisions.'],
      ['Localization gate', 'Localized pages must preserve formula meaning, units and cautions before launch readiness.'],
    ]),
    'pt-br': copy('Editorial', 'Politica Editorial', 'Regras editoriais para paginas uteis do CalcHarbor, correcoes e prevencao de conteudo raso.', reviewed['pt-br'], [
      ['Paginas uteis', 'Cada pagina deve ter ferramenta funcional, formula, interpretacao, exemplo, limites, FAQ e revisao.'],
      ['Correcoes', 'Correcoes sao priorizadas quando formula, unidade, premissa ou interpretacao puder induzir erro.'],
      ['Gate de localizacao', 'Paginas localizadas devem preservar formula, unidades e cautelas antes do lancamento.'],
    ]),
    es: copy('Editorial', 'Politica Editorial', 'Reglas para paginas utiles de CalcHarbor, correcciones y evitar contenido superficial.', reviewed.es, [
      ['Paginas utiles', 'Cada pagina debe incluir herramienta, formula, interpretacion, ejemplo, limites, FAQ y revision.'],
      ['Correcciones', 'Se priorizan si formula, unidad, supuesto o interpretacion puede inducir error.'],
      ['Gate de localizacion', 'Las paginas localizadas deben preservar formula, unidades y cautelas antes del lanzamiento.'],
    ]),
    fr: copy('Editorial', 'Politique editoriale', 'Regles pour pages CalcHarbor utiles, corrections et prevention du contenu superficiel.', reviewed.fr, [
      ['Pages utiles', 'Chaque page inclut outil, formule, interpretation, exemple, limites, FAQ et date de revue.'],
      ['Corrections', 'Priorite si formule, unite, hypothese ou interpretation peut tromper.'],
      ['Gate localisation', 'Les pages localisees doivent garder formule, unites et prudence avant lancement.'],
    ]),
    de: copy('Redaktion', 'Redaktionelle Richtlinie', 'Redaktionsregeln fuer nuetzliche CalcHarbor-Seiten, Korrekturen und flache Inhalte.', reviewed.de, [
      ['Nuetzliche Seiten', 'Jede Rechnerseite braucht Tool, Formel, Interpretation, Beispiel, Grenzen, FAQ und Pruefdatum.'],
      ['Korrekturen', 'Prioritaet besteht, wenn Formel, Einheit, Annahme oder Interpretation irrefuehren koennte.'],
      ['Lokalisierung', 'Lokale Seiten muessen Formel, Einheiten und Hinweise vor Launch bewahren.'],
    ]),
  }),
  page('status', {
    en: copy('Status', 'Launch Status', 'CalcHarbor launch status for public web readiness, ads, billing, deploy and gates.', reviewed.en, [
      ['MVP surface', 'The local/CI MVP contains four calculators, five language route sets, sitemap, canonical, hreflang and structured data.'],
      ['Production', 'CalcHarbor is live at `/supersites/calcharbor/` as a versioned HostGator static app with public smoke and rollback workflow validated.'],
      ['Gates', 'AdSense, billing, external analytics, saved scenarios, widgets and API remain blocked until documented gates pass.'],
    ]),
    'pt-br': copy('Status', 'Status de Lancamento', 'Status de lancamento do CalcHarbor para web publica, ads, billing, deploy e gates.', reviewed['pt-br'], [
      ['Superficie MVP', 'O MVP local/CI contem quatro calculadoras, cinco idiomas, sitemap, canonical, hreflang e dados estruturados.'],
      ['Producao', 'O CalcHarbor esta no ar em `/supersites/calcharbor/` como app estatico versionado no HostGator, com smoke publico e rollback validados.'],
      ['Gates', 'AdSense, billing, analytics externo, cenarios salvos, widgets e API seguem bloqueados ate os gates passarem.'],
    ]),
    es: copy('Estado', 'Estado de lanzamiento', 'Estado de lanzamiento de CalcHarbor para web publica, ads, billing, deploy y gates.', reviewed.es, [
      ['Superficie MVP', 'El MVP local/CI contiene cuatro calculadoras, cinco idiomas, sitemap, canonical, hreflang y datos estructurados.'],
      ['Produccion', 'CalcHarbor esta activo en `/supersites/calcharbor/` como app estatico versionado en HostGator, con smoke publico y rollback validados.'],
      ['Gates', 'AdSense, billing, analytics externo, escenarios, widgets y API siguen bloqueados hasta pasar gates.'],
    ]),
    fr: copy('Statut', 'Statut de lancement', 'Statut de lancement CalcHarbor pour web public, ads, billing, deploy et gates.', reviewed.fr, [
      ['Surface MVP', 'Le MVP local/CI contient quatre calculatrices, cinq langues, sitemap, canonical, hreflang et donnees structurees.'],
      ['Production', 'CalcHarbor est en ligne sur `/supersites/calcharbor/` comme app statique HostGator versionnee, avec smoke public et rollback valides.'],
      ['Gates', 'AdSense, billing, analytics externe, scenarios, widgets et API restent bloques jusqu aux gates.'],
    ]),
    de: copy('Status', 'Launch-Status', 'CalcHarbor Sprint-3.1-Status fuer Public Web, Ads, Billing, Deploy und Gates.', reviewed.de, [
      ['MVP-Oberflaeche', 'Das lokale/CI-MVP enthaelt vier Rechner, fuenf Sprachen, Sitemap, Canonical, Hreflang und strukturierte Daten.'],
      ['Produktion', 'CalcHarbor ist unter `/supersites/calcharbor/` als versionierte statische HostGator-App live; Public Smoke und Rollback sind validiert.'],
      ['Gates', 'AdSense, Billing, externe Analytics, Szenarien, Widgets und API bleiben bis zu Gates gesperrt.'],
    ]),
  }),
]

const contentPageBySlug = new Map(contentPageCatalog.map((candidate) => [candidate.slug, candidate]))

export function isContentPageSlug(value: string | undefined): value is ContentPageSlug {
  return contentPageSlugs.includes(value as ContentPageSlug)
}

export function getContentPageBySlug(value: string | undefined): ContentPage | null {
  if (!isContentPageSlug(value)) {
    return null
  }

  return contentPageBySlug.get(value) ?? null
}

export function getContentPageCopy(page: ContentPage, locale: LocaleCode): ContentPageCopy {
  return sanitizePublicCopy(locale, page.localized[locale])
}
