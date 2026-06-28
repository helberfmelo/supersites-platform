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
    en: copy('About', 'About DevUtility Lab', 'DevUtility Lab is the SuperSites product for browser-side developer utilities.', reviewed.en, [
      ['Purpose', 'The site helps developers format, encode, inspect and compare common snippets while reducing unnecessary transfer of sensitive content.'],
      ['What is live now', 'The current MVP includes nine local tools covering structured data, Base64, JWT, regex, diff, cron, UUID, timestamp and hashes.'],
      ['Upgrade boundary', 'Paid value is planned around private history, workspaces, batch processing, larger files, API access and no ads.'],
    ]),
    'pt-br': copy('Sobre', 'Sobre o DevUtility Lab', 'DevUtility Lab e o produto SuperSites de utilitarios dev no navegador.', reviewed['pt-br'], [
      ['Proposito', 'O site ajuda devs a formatar, codificar, inspecionar e comparar snippets reduzindo envio desnecessario de conteudo sensivel.'],
      ['O que esta ativo', 'O MVP atual entrega nove ferramentas locais para dados estruturados, Base64, JWT, regex, diff, cron, UUID, timestamp e hashes.'],
      ['Fronteira do upgrade', 'O valor pago planejado esta em historico privado, workspaces, lotes, arquivos maiores, API e ausencia de anuncios.'],
    ]),
    es: copy('Acerca de', 'Acerca de DevUtility Lab', 'DevUtility Lab es el producto SuperSites de utilidades dev en el navegador.', reviewed.es, [
      ['Proposito', 'El sitio ayuda a formatear, codificar, inspeccionar y comparar fragmentos reduciendo transferencias innecesarias.'],
      ['Que esta activo', 'El MVP actual entrega nueve herramientas locales para datos, Base64, JWT, regex, diff, cron, UUID, timestamp y hashes.'],
      ['Limite de upgrade', 'El valor pago se planea para historial privado, workspaces, lotes, archivos mayores, API y sin anuncios.'],
    ]),
    fr: copy('A propos', 'A propos de DevUtility Lab', 'DevUtility Lab est le produit SuperSites pour utilitaires dev cote navigateur.', reviewed.fr, [
      ['Objectif', 'Le site aide a formater, encoder, inspecter et comparer des extraits en limitant les transferts inutiles.'],
      ['Actif maintenant', 'Le MVP actuel propose neuf outils locaux pour donnees, Base64, JWT, regex, diff, cron, UUID, timestamp et hashes.'],
      ['Limite upgrade', 'La valeur payante vise historique prive, workspaces, lots, gros fichiers, API et absence de publicite.'],
    ]),
    de: copy('Ueber', 'Ueber DevUtility Lab', 'DevUtility Lab ist das SuperSites-Produkt fuer Browser-Developer-Tools.', reviewed.de, [
      ['Zweck', 'Die Seite hilft beim Formatieren, Codieren, Pruefen und Vergleichen von Ausschnitten mit weniger unnoetiger Uebertragung.'],
      ['Jetzt live', 'Das aktuelle MVP liefert neun lokale Tools fuer Daten, Base64, JWT, Regex, Diff, Cron, UUID, Timestamp und Hashes.'],
      ['Upgrade-Grenze', 'Bezahlwert ist fuer privaten Verlauf, Workspaces, Stapel, groessere Dateien, API und keine Anzeigen geplant.'],
    ]),
  }),
  page('contact', {
    en: copy('Contact', 'Contact DevUtility Lab', 'How to reach the SuperSites operator about corrections, privacy, security and tool feedback.', reviewed.en, [
      ['Useful reports', 'Include the page URL, language, tool name, observed behavior, expected result and browser context.'],
      ['Do not send secrets', 'Do not send access tokens, API keys, passwords, customer data, private certificates or confidential source files through feedback.'],
      ['Public channel gate', 'A monitored public mailbox is required before independent launch; until then feedback remains in the owner workflow.'],
    ]),
    'pt-br': copy('Contato', 'Contato do DevUtility Lab', 'Como falar com o operador SuperSites sobre correcoes, privacidade, seguranca e feedback.', reviewed['pt-br'], [
      ['Relatos uteis', 'Inclua URL, idioma, ferramenta, comportamento observado, resultado esperado e contexto do navegador.'],
      ['Nao envie segredos', 'Nao envie tokens, chaves de API, senhas, dados de clientes, certificados privados ou codigo confidencial.'],
      ['Gate de canal publico', 'Uma caixa publica monitorada e exigida antes do lancamento independente; ate la o feedback fica no fluxo do proprietario.'],
    ]),
    es: copy('Contacto', 'Contacto de DevUtility Lab', 'Como contactar al operador SuperSites sobre correcciones, privacidad, seguridad y feedback.', reviewed.es, [
      ['Reportes utiles', 'Incluye URL, idioma, herramienta, comportamiento observado, resultado esperado y navegador.'],
      ['No envies secretos', 'No envies tokens, claves API, contrasenas, datos de clientes, certificados privados o codigo confidencial.'],
      ['Gate de canal publico', 'Se requiere un buzon publico monitoreado antes del lanzamiento independiente.'],
    ]),
    fr: copy('Contact', 'Contacter DevUtility Lab', 'Comment joindre l operateur SuperSites pour corrections, confidentialite, securite et retours.', reviewed.fr, [
      ['Rapports utiles', 'Indiquez URL, langue, outil, comportement observe, resultat attendu et navigateur.'],
      ['Pas de secrets', 'N envoyez pas tokens, cles API, mots de passe, donnees client, certificats prives ou code confidentiel.'],
      ['Gate canal public', 'Une boite publique surveillee est requise avant lancement independant.'],
    ]),
    de: copy('Kontakt', 'Kontakt zu DevUtility Lab', 'So erreichen Sie den SuperSites-Betreiber fuer Korrekturen, Datenschutz, Sicherheit und Feedback.', reviewed.de, [
      ['Nuetzliche Meldungen', 'Nennen Sie URL, Sprache, Tool, beobachtetes Verhalten, erwartetes Ergebnis und Browser.'],
      ['Keine Geheimnisse', 'Senden Sie keine Tokens, API-Keys, Passwoerter, Kundendaten, privaten Zertifikate oder vertraulichen Quellcode.'],
      ['Gate fuer Kontaktkanal', 'Ein ueberwachtes Postfach ist vor eigenem Launch noetig.'],
    ]),
  }),
  page('privacy', {
    en: copy('Privacy', 'Privacy Policy', 'DevUtility Lab minimizes collection by processing snippets locally in the browser.', reviewed.en, [
      ['Data minimization', 'Tool inputs and results are not sent to a product API, not stored in account history and not written to browser storage in this MVP.'],
      ['Analytics boundary', 'Allowed analytics events may record tool slugs and page paths, but not pasted snippets, tokens, hashes, regex samples or generated results.'],
      ['Future accounts', 'Private history, workspaces and batch jobs require account, retention, export, deletion and consent rules before launch.'],
    ]),
    'pt-br': copy('Privacidade', 'Politica de Privacidade', 'DevUtility Lab minimiza coleta processando snippets localmente.', reviewed['pt-br'], [
      ['Minimizacao', 'Entradas e resultados nao sao enviados para API, nao entram em historico de conta e nao sao escritos em storage neste MVP.'],
      ['Fronteira de analytics', 'Eventos podem registrar slug e rota, mas nao snippets, tokens, hashes, amostras regex ou resultados.'],
      ['Contas futuras', 'Historico privado, workspaces e lotes exigem regras de conta, retencao, exportacao, exclusao e consentimento.'],
    ]),
    es: copy('Privacidad', 'Politica de Privacidad', 'DevUtility Lab minimiza recoleccion procesando fragmentos localmente.', reviewed.es, [
      ['Minimizacion', 'Entradas y resultados no se envian a API, no se guardan en historial y no se escriben en storage en este MVP.'],
      ['Limite analytics', 'Eventos pueden registrar slug y ruta, pero no fragmentos, tokens, hashes, muestras regex o resultados.'],
      ['Cuentas futuras', 'Historial privado, workspaces y lotes requieren reglas de cuenta, retencion, exportacion, eliminacion y consentimiento.'],
    ]),
    fr: copy('Confidentialite', 'Politique de confidentialite', 'DevUtility Lab minimise la collecte en traitant les extraits localement.', reviewed.fr, [
      ['Minimisation', 'Entrees et resultats ne sont pas envoyes a une API, pas stockes en compte et pas ecrits en stockage navigateur dans ce MVP.'],
      ['Limite analytics', 'Les evenements peuvent enregistrer slug et chemin, pas extraits, tokens, hashes, exemples regex ou resultats.'],
      ['Comptes futurs', 'Historique prive, workspaces et lots exigent regles de compte, retention, export, suppression et consentement.'],
    ]),
    de: copy('Datenschutz', 'Datenschutzerklaerung', 'DevUtility Lab minimiert Erhebung, indem Ausschnitte lokal verarbeitet werden.', reviewed.de, [
      ['Datenminimierung', 'Eingaben und Ergebnisse gehen nicht an eine Produkt-API, keinen Kontoverlauf und keinen Browser-Speicher in diesem MVP.'],
      ['Analytics-Grenze', 'Events duerfen Tool-Slug und Pfad enthalten, aber keine Ausschnitte, Tokens, Hashes, Regex-Beispiele oder Ergebnisse.'],
      ['Zukuenftige Konten', 'Privater Verlauf, Workspaces und Stapel brauchen Regeln fuer Konto, Aufbewahrung, Export, Loeschung und Consent.'],
    ]),
  }),
  page('cookies', {
    en: copy('Cookies', 'Cookie Policy', 'How DevUtility Lab plans essential storage, consent-aware analytics and advertising controls after gates.', reviewed.en, [
      ['Essential storage', 'Language, consent and session security may use essential storage when those features are enabled.'],
      ['Analytics and ads', 'External analytics and advertising storage remain blocked until consent mode and regional rules are implemented.'],
      ['Choices', 'A consent interface must exist before non-essential storage is used. Browser settings can clear local data.'],
    ]),
    'pt-br': copy('Cookies', 'Politica de Cookies', 'Como o DevUtility Lab planeja armazenamento essencial, analytics com consentimento e controles de anuncios.', reviewed['pt-br'], [
      ['Essencial', 'Idioma, consentimento e seguranca de sessao podem usar armazenamento essencial quando ativos.'],
      ['Analytics e ads', 'Analytics externo e anuncios seguem bloqueados ate consent mode e regras regionais.'],
      ['Escolhas', 'Uma interface de consentimento deve existir antes de armazenamento nao essencial.'],
    ]),
    es: copy('Cookies', 'Politica de Cookies', 'Como DevUtility Lab planea almacenamiento esencial, analytics con consentimiento y anuncios.', reviewed.es, [
      ['Esencial', 'Idioma, consentimiento y seguridad de sesion pueden usar almacenamiento esencial cuando esten activos.'],
      ['Analytics y ads', 'Analytics externo y anuncios siguen bloqueados hasta consent mode y reglas regionales.'],
      ['Opciones', 'Debe existir interfaz de consentimiento antes de almacenamiento no esencial.'],
    ]),
    fr: copy('Cookies', 'Politique cookies', 'Comment DevUtility Lab prevoit stockage essentiel, analytics avec consentement et publicites.', reviewed.fr, [
      ['Essentiel', 'Langue, consentement et securite de session peuvent utiliser du stockage essentiel.'],
      ['Analytics et pubs', 'Analytics externe et publicites restent bloques jusqu au consent mode et aux regles regionales.'],
      ['Choix', 'Une interface de consentement doit exister avant tout stockage non essentiel.'],
    ]),
    de: copy('Cookies', 'Cookie-Richtlinie', 'Wie DevUtility Lab essenziellen Speicher, Consent-Analytics und Anzeigenkontrollen plant.', reviewed.de, [
      ['Essenziell', 'Sprache, Consent und Sitzungssicherheit koennen essenziellen Speicher nutzen, wenn aktiv.'],
      ['Analytics und Anzeigen', 'Externe Analytics und Anzeigen bleiben bis Consent Mode und regionale Regeln gesperrt.'],
      ['Auswahl', 'Eine Consent-Oberflaeche muss vor nicht essenziellem Speicher existieren.'],
    ]),
  }),
  page('terms', {
    en: copy('Terms', 'Terms of Use', 'Baseline terms for responsible use of DevUtility Lab tools and future commercial features.', reviewed.en, [
      ['Developer assistance', 'Tool outputs are developer aids and not security, legal, compliance or production approval.'],
      ['Responsible use', 'Do not use the service to expose secrets, bypass controls, mislead users or process data you are not allowed to handle.'],
      ['Paid features', 'Commercial features require visible pricing, quotas, cancellation rules and provider terms before checkout.'],
    ]),
    'pt-br': copy('Termos', 'Termos de Uso', 'Termos base para uso responsavel das ferramentas DevUtility Lab e recursos comerciais futuros.', reviewed['pt-br'], [
      ['Apoio dev', 'Resultados sao apoio de desenvolvimento, nao aprovacao de seguranca, juridica, compliance ou producao.'],
      ['Uso responsavel', 'Nao use o servico para expor segredos, burlar controles, enganar usuarios ou processar dados sem permissao.'],
      ['Recursos pagos', 'Recursos comerciais exigem preco, quotas, cancelamento e termos visiveis antes do checkout.'],
    ]),
    es: copy('Terminos', 'Terminos de Uso', 'Terminos base para uso responsable de herramientas DevUtility Lab y funciones comerciales futuras.', reviewed.es, [
      ['Ayuda dev', 'Los resultados son apoyo de desarrollo, no aprobacion de seguridad, legal, compliance o produccion.'],
      ['Uso responsable', 'No uses el servicio para exponer secretos, saltar controles, enganar usuarios o procesar datos sin permiso.'],
      ['Funciones pagas', 'Las funciones comerciales requieren precios, cuotas, cancelacion y terminos visibles antes de checkout.'],
    ]),
    fr: copy('Conditions', 'Conditions d utilisation', 'Conditions de base pour usage responsable des outils DevUtility Lab et futures offres.', reviewed.fr, [
      ['Assistance dev', 'Les resultats aident au developpement, sans approbation securite, juridique, conformite ou production.'],
      ['Usage responsable', 'N utilisez pas le service pour exposer des secrets, contourner des controles ou traiter des donnees sans droit.'],
      ['Fonctions payantes', 'Les offres commerciales exigent prix, quotas, annulation et conditions visibles avant checkout.'],
    ]),
    de: copy('Bedingungen', 'Nutzungsbedingungen', 'Basisbedingungen fuer verantwortliche Nutzung der DevUtility-Lab-Tools und zukuenftiger Angebote.', reviewed.de, [
      ['Developer-Hilfe', 'Ergebnisse sind Entwicklungshilfen, keine Sicherheits-, Rechts-, Compliance- oder Produktionsfreigabe.'],
      ['Verantwortliche Nutzung', 'Nutzen Sie den Dienst nicht, um Geheimnisse offenzulegen, Kontrollen zu umgehen oder Daten ohne Erlaubnis zu verarbeiten.'],
      ['Bezahlfunktionen', 'Kommerzielle Funktionen brauchen sichtbare Preise, Quoten, Kuendigung und Bedingungen vor Checkout.'],
    ]),
  }),
  page('methodology', {
    en: copy('Methodology', 'Methodology', 'How DevUtility Lab keeps tools useful, privacy-first and honest about limits.', reviewed.en, [
      ['Working tool first', 'Each page must include a functioning free utility before it can be treated as launch-ready content.'],
      ['Local processing', 'Snippet transformations run client-side and use a Web Worker when supported so the UI remains responsive.'],
      ['Security caveat', 'Local processing reduces transfer, but users should still redact secrets and verify production-critical output independently.'],
    ]),
    'pt-br': copy('Metodologia', 'Metodologia', 'Como o DevUtility Lab mantem ferramentas uteis, privadas e honestas sobre limites.', reviewed['pt-br'], [
      ['Ferramenta primeiro', 'Cada pagina precisa ter utilitario gratuito funcional antes de ser considerada pronta para lancamento.'],
      ['Processamento local', 'Transformacoes rodam client-side e usam Web Worker quando suportado para manter a UI responsiva.'],
      ['Cautela de seguranca', 'Processamento local reduz transferencia, mas usuarios devem redigir segredos e verificar resultados criticos.'],
    ]),
    es: copy('Metodologia', 'Metodologia', 'Como DevUtility Lab mantiene herramientas utiles, privadas y claras sobre limites.', reviewed.es, [
      ['Herramienta primero', 'Cada pagina debe incluir una utilidad gratis funcional antes de considerarse lista.'],
      ['Procesamiento local', 'Las transformaciones corren client-side y usan Web Worker cuando existe soporte.'],
      ['Cautela seguridad', 'Procesar localmente reduce transferencia, pero conviene redactar secretos y verificar salidas criticas.'],
    ]),
    fr: copy('Methodologie', 'Methodologie', 'Comment DevUtility Lab garde les outils utiles, prives et clairs sur leurs limites.', reviewed.fr, [
      ['Outil d abord', 'Chaque page doit inclure un utilitaire gratuit fonctionnel avant d etre prete au lancement.'],
      ['Traitement local', 'Les transformations sont client-side et utilisent un Web Worker si disponible.'],
      ['Prudence securite', 'Le traitement local reduit le transfert, mais les secrets doivent etre masques et les resultats critiques verifies.'],
    ]),
    de: copy('Methodik', 'Methodik', 'Wie DevUtility Lab Tools nuetzlich, privat und ehrlich ueber Grenzen haelt.', reviewed.de, [
      ['Tool zuerst', 'Jede Seite braucht ein funktionierendes kostenloses Tool, bevor sie launchbereit ist.'],
      ['Lokale Verarbeitung', 'Transformationen laufen client-seitig und nutzen Web Worker, wenn verfuegbar.'],
      ['Sicherheitshinweis', 'Lokale Verarbeitung reduziert Uebertragung, dennoch sollten Geheimnisse geschwaerzt und kritische Ergebnisse geprueft werden.'],
    ]),
  }),
  page('editorial-policy', {
    en: copy('Editorial', 'Editorial Policy', 'Editorial rules for useful DevUtility Lab pages and avoiding shallow tool content.', reviewed.en, [
      ['Useful pages', 'Each tool page must include the working utility, input labels, local-processing note, limits, FAQ and review date.'],
      ['Corrections', 'Corrections are prioritized when a transformation, explanation, security caveat or privacy claim could mislead users.'],
      ['Localization gate', 'Localized pages must preserve tool behavior, privacy cautions and commercial boundaries before launch readiness.'],
    ]),
    'pt-br': copy('Editorial', 'Politica Editorial', 'Regras editoriais para paginas uteis do DevUtility Lab e prevencao de conteudo raso.', reviewed['pt-br'], [
      ['Paginas uteis', 'Cada pagina deve ter ferramenta funcional, rotulos de entrada, nota local, limites, FAQ e revisao.'],
      ['Correcoes', 'Correcoes sao priorizadas quando transformacao, explicacao, cautela ou privacidade puder induzir erro.'],
      ['Gate de localizacao', 'Paginas localizadas devem preservar comportamento, cautelas e limites comerciais.'],
    ]),
    es: copy('Editorial', 'Politica Editorial', 'Reglas para paginas utiles de DevUtility Lab y evitar contenido superficial.', reviewed.es, [
      ['Paginas utiles', 'Cada pagina debe incluir herramienta, etiquetas, nota local, limites, FAQ y revision.'],
      ['Correcciones', 'Se priorizan si transformacion, explicacion, cautela o privacidad puede inducir error.'],
      ['Gate de localizacion', 'Las paginas localizadas deben preservar comportamiento, cautelas y limites comerciales.'],
    ]),
    fr: copy('Editorial', 'Politique editoriale', 'Regles pour pages DevUtility Lab utiles et prevention du contenu superficiel.', reviewed.fr, [
      ['Pages utiles', 'Chaque page inclut outil, libelles, note locale, limites, FAQ et date de revue.'],
      ['Corrections', 'Priorite si transformation, explication, prudence ou confidentialite peut tromper.'],
      ['Gate localisation', 'Les pages localisees doivent garder comportement, prudence et limites commerciales.'],
    ]),
    de: copy('Redaktion', 'Redaktionelle Richtlinie', 'Redaktionsregeln fuer nuetzliche DevUtility-Lab-Seiten und gegen flache Inhalte.', reviewed.de, [
      ['Nuetzliche Seiten', 'Jede Toolseite braucht Tool, Labels, lokale Verarbeitung, Grenzen, FAQ und Pruefdatum.'],
      ['Korrekturen', 'Prioritaet besteht, wenn Transformation, Erklaerung, Sicherheitshinweis oder Datenschutz irrefuehren koennte.'],
      ['Lokalisierung', 'Lokale Seiten muessen Verhalten, Hinweise und kommerzielle Grenzen bewahren.'],
    ]),
  }),
  page('status', {
    en: copy('Status', 'Launch Status', 'DevUtility Lab status for public web readiness, ads, billing, deploy and gates.', reviewed.en, [
      ['MVP surface', 'The local/CI MVP contains nine tools, five language route sets, sitemap, canonical, hreflang and structured data.'],
      ['Production', 'DevUtility Lab is live at `/supersites/devutility-lab/` as a versioned HostGator static app with public smoke and rollback workflow validated.'],
      ['Gates', 'AdSense, billing, external analytics, accounts, private history, workspaces, batch processing and API remain blocked until documented gates pass.'],
    ]),
    'pt-br': copy('Status', 'Status de Lancamento', 'Status do DevUtility Lab para web publica, ads, billing, deploy e gates.', reviewed['pt-br'], [
      ['Superficie MVP', 'O MVP local/CI contem nove ferramentas, cinco idiomas, sitemap, canonical, hreflang e dados estruturados.'],
      ['Producao', 'O DevUtility Lab esta no ar em `/supersites/devutility-lab/` como app estatico versionado no HostGator, com smoke publico e rollback validados.'],
      ['Gates', 'AdSense, billing, analytics externo, contas, historico privado, workspaces, lotes e API seguem bloqueados.'],
    ]),
    es: copy('Estado', 'Estado de lanzamiento', 'Estado de DevUtility Lab para web publica, ads, billing, deploy y gates.', reviewed.es, [
      ['Superficie MVP', 'El MVP local/CI contiene nueve herramientas, cinco idiomas, sitemap, canonical, hreflang y datos estructurados.'],
      ['Produccion', 'DevUtility Lab esta activo en `/supersites/devutility-lab/` como app estatico versionado en HostGator, con smoke publico y rollback validados.'],
      ['Gates', 'AdSense, billing, analytics externo, cuentas, historial privado, workspaces, lotes y API siguen bloqueados.'],
    ]),
    fr: copy('Statut', 'Statut de lancement', 'Statut DevUtility Lab pour web public, ads, billing, deploy et gates.', reviewed.fr, [
      ['Surface MVP', 'Le MVP local/CI contient neuf outils, cinq langues, sitemap, canonical, hreflang et donnees structurees.'],
      ['Production', 'DevUtility Lab est en ligne sur `/supersites/devutility-lab/` comme app statique HostGator versionnee, avec smoke public et rollback valides.'],
      ['Gates', 'AdSense, billing, analytics externe, comptes, historique prive, workspaces, lots et API restent bloques.'],
    ]),
    de: copy('Status', 'Launch-Status', 'DevUtility Lab Status fuer Public Web, Ads, Billing, Deploy und Gates.', reviewed.de, [
      ['MVP-Oberflaeche', 'Das lokale/CI-MVP enthaelt neun Tools, fuenf Sprachen, Sitemap, Canonical, Hreflang und strukturierte Daten.'],
      ['Produktion', 'DevUtility Lab ist unter `/supersites/devutility-lab/` als versionierte statische HostGator-App live; Public Smoke und Rollback sind validiert.'],
      ['Gates', 'AdSense, Billing, externe Analytics, Konten, privater Verlauf, Workspaces, Stapel und API bleiben gesperrt.'],
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
