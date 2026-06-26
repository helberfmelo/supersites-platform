import type { LocaleCode } from './locales'

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
  principlesTitle: string
  principles: Array<{ title: string; body: string }>
  statusRows: Array<{ title: string; body: string; tone: 'green' | 'amber' }>
}

export interface ShellCopy {
  breadcrumbHome: string
  inputTitle: string
  formulaTitle: string
  resultTitle: string
  calculateLabel: string
  resetLabel: string
  exampleLabel: string
  methodologyLabel: string
  editorialLabel: string
  freeCheckLabel: string
  upgradePathLabel: string
  guideTitle: string
  faqTitle: string
  contentQualityBody: string
  invalidResultTitle: string
  privacyNote: string
  pageStatusLabel: string
  liveTitle: string
  liveBody: string
  gatedTitle: string
  gatedBody: string
}

export const homeCopy: Record<LocaleCode, HomeCopy> = {
  en: {
    eyebrow: 'CalcHarbor',
    title: 'Financial calculators with the math in view.',
    lead: 'Business and finance calculators that show the formula, explain the result and solve the basic question without signup.',
    searchLabel: 'Search calculators',
    searchPlaceholder: 'Try loan, margin, ROI or break-even',
    categoryLabel: 'Category',
    allCategories: 'All calculators',
    noResultsTitle: 'No calculators matched',
    noResultsBody: 'Clear the search or choose another category.',
    freeLabel: 'Free result',
    upgradeLabel: 'Upgrade path',
    detailCta: 'Open calculator',
    principlesTitle: 'MVP principles',
    principles: [
      {
        title: 'Transparent formulas',
        body: 'Each calculator exposes the formula and labels assumptions so the answer is auditable.',
      },
      {
        title: 'Client-side by default',
        body: 'Sprint 3.1 runs calculations in the browser and does not store inputs or results.',
      },
      {
        title: 'Paid value adds workflow',
        body: 'Upgrades are for saved scenarios, exports, widgets, teams, API and no ads, not for revealing the answer.',
      },
    ],
    statusRows: [
      {
        title: '4 live calculators',
        body: 'Loan payment, break-even, gross margin and ROI run in the browser.',
        tone: 'green',
      },
      {
        title: '5 language routes',
        body: 'English, Portuguese, Spanish, French and German pages are prerendered.',
        tone: 'green',
      },
      {
        title: 'No ads or billing',
        body: 'AdSense, checkout, saved scenarios and external integrations remain gated.',
        tone: 'amber',
      },
    ],
  },
  'pt-br': {
    eyebrow: 'CalcHarbor',
    title: 'Calculadoras financeiras com a matematica visivel.',
    lead: 'Calculadoras de negocios e financas que mostram a formula, explicam o resultado e resolvem a pergunta basica sem cadastro.',
    searchLabel: 'Buscar calculadoras',
    searchPlaceholder: 'Tente emprestimo, margem, ROI ou equilibrio',
    categoryLabel: 'Categoria',
    allCategories: 'Todas',
    noResultsTitle: 'Nenhuma calculadora encontrada',
    noResultsBody: 'Limpe a busca ou escolha outra categoria.',
    freeLabel: 'Resultado gratuito',
    upgradeLabel: 'Caminho de upgrade',
    detailCta: 'Abrir calculadora',
    principlesTitle: 'Principios do MVP',
    principles: [
      { title: 'Formulas transparentes', body: 'Cada calculadora mostra a formula e as premissas para que a resposta seja auditavel.' },
      { title: 'Cliente por padrao', body: 'A Sprint 3.1 calcula no navegador e nao armazena entradas ou resultados.' },
      { title: 'Upgrade e workflow', body: 'Planos pagos vendem cenarios, exportacoes, widgets, equipes, API e ausencia de anuncios.' },
    ],
    statusRows: [
      { title: '4 calculadoras ativas', body: 'Parcela, ponto de equilibrio, margem bruta e ROI rodam no navegador.', tone: 'green' },
      { title: '5 rotas de idioma', body: 'Paginas em ingles, portugues, espanhol, frances e alemao sao prerenderizadas.', tone: 'green' },
      { title: 'Sem anuncios ou billing', body: 'AdSense, checkout, cenarios salvos e integracoes externas seguem bloqueados.', tone: 'amber' },
    ],
  },
  es: {
    eyebrow: 'CalcHarbor',
    title: 'Calculadoras financieras con la matematica visible.',
    lead: 'Calculadoras de negocio y finanzas que muestran formula, explican el resultado y resuelven la pregunta basica sin registro.',
    searchLabel: 'Buscar calculadoras',
    searchPlaceholder: 'Prueba prestamo, margen, ROI o equilibrio',
    categoryLabel: 'Categoria',
    allCategories: 'Todas',
    noResultsTitle: 'No hay calculadoras',
    noResultsBody: 'Borra la busqueda o elige otra categoria.',
    freeLabel: 'Resultado gratis',
    upgradeLabel: 'Ruta de upgrade',
    detailCta: 'Abrir calculadora',
    principlesTitle: 'Principios del MVP',
    principles: [
      { title: 'Formulas transparentes', body: 'Cada calculadora muestra formula y supuestos para que la respuesta sea auditable.' },
      { title: 'Cliente por defecto', body: 'Sprint 3.1 calcula en el navegador y no almacena entradas o resultados.' },
      { title: 'Upgrade como workflow', body: 'Los planes pagos venden escenarios, exportes, widgets, equipos, API y sin anuncios.' },
    ],
    statusRows: [
      { title: '4 calculadoras activas', body: 'Prestamo, equilibrio, margen bruto y ROI corren en el navegador.', tone: 'green' },
      { title: '5 rutas de idioma', body: 'Paginas en ingles, portugues, espanol, frances y aleman se prerenderizan.', tone: 'green' },
      { title: 'Sin anuncios ni billing', body: 'AdSense, checkout, escenarios guardados e integraciones externas quedan bloqueados.', tone: 'amber' },
    ],
  },
  fr: {
    eyebrow: 'CalcHarbor',
    title: 'Calculatrices financieres avec la formule visible.',
    lead: 'Calculatrices business et finance qui affichent la formule, expliquent le resultat et resolvent la question de base sans compte.',
    searchLabel: 'Rechercher',
    searchPlaceholder: 'Pret, marge, ROI ou seuil',
    categoryLabel: 'Categorie',
    allCategories: 'Toutes',
    noResultsTitle: 'Aucune calculatrice',
    noResultsBody: 'Effacez la recherche ou choisissez une autre categorie.',
    freeLabel: 'Resultat gratuit',
    upgradeLabel: 'Offre payante',
    detailCta: 'Ouvrir',
    principlesTitle: 'Principes MVP',
    principles: [
      { title: 'Formules transparentes', body: 'Chaque calculatrice montre formule et hypotheses pour rendre la reponse verifiable.' },
      { title: 'Client par defaut', body: 'Sprint 3.1 calcule dans le navigateur et ne stocke ni entrees ni resultats.' },
      { title: 'Upgrade workflow', body: 'Les offres payantes ajoutent scenarios, exports, widgets, equipes, API et absence de publicite.' },
    ],
    statusRows: [
      { title: '4 calculatrices actives', body: 'Pret, seuil, marge brute et ROI fonctionnent dans le navigateur.', tone: 'green' },
      { title: '5 routes de langue', body: 'Pages anglaises, portugaises, espagnoles, francaises et allemandes prerenderisees.', tone: 'green' },
      { title: 'Pas de publicite ni billing', body: 'AdSense, checkout, scenarios sauvegardes et integrations externes restent bloques.', tone: 'amber' },
    ],
  },
  de: {
    eyebrow: 'CalcHarbor',
    title: 'Finanzrechner mit sichtbarer Mathematik.',
    lead: 'Business- und Finanzrechner zeigen Formel, erklaeren Ergebnisse und beantworten die Grundfrage ohne Pflichtkonto.',
    searchLabel: 'Rechner suchen',
    searchPlaceholder: 'Kredit, Marge, ROI oder Break-even',
    categoryLabel: 'Kategorie',
    allCategories: 'Alle Rechner',
    noResultsTitle: 'Keine Rechner gefunden',
    noResultsBody: 'Leeren Sie die Suche oder waehlen Sie eine andere Kategorie.',
    freeLabel: 'Kostenloses Ergebnis',
    upgradeLabel: 'Upgrade-Pfad',
    detailCta: 'Rechner oeffnen',
    principlesTitle: 'MVP-Prinzipien',
    principles: [
      { title: 'Transparente Formeln', body: 'Jeder Rechner zeigt Formel und Annahmen, damit die Antwort pruefbar bleibt.' },
      { title: 'Client-seitig zuerst', body: 'Sprint 3.1 rechnet im Browser und speichert keine Eingaben oder Ergebnisse.' },
      { title: 'Bezahlwert ist Workflow', body: 'Upgrades sind Szenarien, Exporte, Widgets, Teams, API und keine Anzeigen.' },
    ],
    statusRows: [
      { title: '4 Live-Rechner', body: 'Kreditrate, Break-even, Bruttomarge und ROI laufen im Browser.', tone: 'green' },
      { title: '5 Sprachrouten', body: 'Englische, portugiesische, spanische, franzoesische und deutsche Seiten werden prerendered.', tone: 'green' },
      { title: 'Keine Anzeigen oder Billing', body: 'AdSense, Checkout, gespeicherte Szenarien und externe Integrationen bleiben gesperrt.', tone: 'amber' },
    ],
  },
}

export const shellCopy: Record<LocaleCode, ShellCopy> = {
  en: {
    breadcrumbHome: 'CalcHarbor',
    inputTitle: 'Inputs',
    formulaTitle: 'Formula',
    resultTitle: 'Result',
    calculateLabel: 'Calculate',
    resetLabel: 'Reset example',
    exampleLabel: 'Example',
    methodologyLabel: 'Methodology',
    editorialLabel: 'Editorial policy',
    freeCheckLabel: 'Free calculation',
    upgradePathLabel: 'Upgrade path',
    guideTitle: 'Guide and interpretation',
    faqTitle: 'FAQ',
    contentQualityBody: 'This page combines the working calculator, formula, interpretation, example, limits and FAQ required before AdSense review.',
    invalidResultTitle: 'Check the inputs',
    privacyNote: 'Calculations run in this browser session. CalcHarbor does not store entered values in Sprint 3.1.',
    pageStatusLabel: 'Calculator status',
    liveTitle: 'Client-side MVP',
    liveBody: 'The free calculator works without signup and without sending values to an API.',
    gatedTitle: 'Commercial features gated',
    gatedBody: 'Saved scenarios, exports, widgets, API, billing and ads are not active yet.',
  },
  'pt-br': {
    breadcrumbHome: 'CalcHarbor',
    inputTitle: 'Entradas',
    formulaTitle: 'Formula',
    resultTitle: 'Resultado',
    calculateLabel: 'Calcular',
    resetLabel: 'Restaurar exemplo',
    exampleLabel: 'Exemplo',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Calculo gratuito',
    upgradePathLabel: 'Caminho de upgrade',
    guideTitle: 'Guia e interpretacao',
    faqTitle: 'Perguntas frequentes',
    contentQualityBody: 'Esta pagina combina calculadora funcional, formula, interpretacao, exemplo, limites e FAQ exigidos antes da revisao AdSense.',
    invalidResultTitle: 'Confira as entradas',
    privacyNote: 'Os calculos rodam neste navegador. O CalcHarbor nao armazena valores digitados na Sprint 3.1.',
    pageStatusLabel: 'Status da calculadora',
    liveTitle: 'MVP client-side',
    liveBody: 'A calculadora gratuita funciona sem cadastro e sem enviar valores para API.',
    gatedTitle: 'Recursos comerciais bloqueados',
    gatedBody: 'Cenarios salvos, exportacoes, widgets, API, billing e anuncios ainda nao estao ativos.',
  },
  es: {
    breadcrumbHome: 'CalcHarbor',
    inputTitle: 'Entradas',
    formulaTitle: 'Formula',
    resultTitle: 'Resultado',
    calculateLabel: 'Calcular',
    resetLabel: 'Restaurar ejemplo',
    exampleLabel: 'Ejemplo',
    methodologyLabel: 'Metodologia',
    editorialLabel: 'Politica editorial',
    freeCheckLabel: 'Calculo gratis',
    upgradePathLabel: 'Ruta de upgrade',
    guideTitle: 'Guia e interpretacion',
    faqTitle: 'Preguntas frecuentes',
    contentQualityBody: 'Esta pagina combina calculadora, formula, interpretacion, ejemplo, limites y FAQ requeridos antes de AdSense.',
    invalidResultTitle: 'Revisa las entradas',
    privacyNote: 'Los calculos corren en este navegador. CalcHarbor no guarda valores en Sprint 3.1.',
    pageStatusLabel: 'Estado de calculadora',
    liveTitle: 'MVP client-side',
    liveBody: 'La calculadora gratis funciona sin registro y sin enviar valores a una API.',
    gatedTitle: 'Funciones comerciales bloqueadas',
    gatedBody: 'Escenarios, exportes, widgets, API, billing y anuncios aun no estan activos.',
  },
  fr: {
    breadcrumbHome: 'CalcHarbor',
    inputTitle: 'Entrees',
    formulaTitle: 'Formule',
    resultTitle: 'Resultat',
    calculateLabel: 'Calculer',
    resetLabel: 'Restaurer exemple',
    exampleLabel: 'Exemple',
    methodologyLabel: 'Methodologie',
    editorialLabel: 'Politique editoriale',
    freeCheckLabel: 'Calcul gratuit',
    upgradePathLabel: 'Offre payante',
    guideTitle: 'Guide et interpretation',
    faqTitle: 'FAQ',
    contentQualityBody: 'Cette page combine calculatrice, formule, interpretation, exemple, limites et FAQ avant revue AdSense.',
    invalidResultTitle: 'Verifiez les entrees',
    privacyNote: 'Les calculs s executent dans ce navigateur. CalcHarbor ne stocke pas les valeurs en Sprint 3.1.',
    pageStatusLabel: 'Statut calculatrice',
    liveTitle: 'MVP client-side',
    liveBody: 'La calculatrice gratuite fonctionne sans compte et sans envoyer les valeurs a une API.',
    gatedTitle: 'Fonctions commerciales bloquees',
    gatedBody: 'Scenarios, exports, widgets, API, billing et publicites ne sont pas actifs.',
  },
  de: {
    breadcrumbHome: 'CalcHarbor',
    inputTitle: 'Eingaben',
    formulaTitle: 'Formel',
    resultTitle: 'Ergebnis',
    calculateLabel: 'Berechnen',
    resetLabel: 'Beispiel zuruecksetzen',
    exampleLabel: 'Beispiel',
    methodologyLabel: 'Methodik',
    editorialLabel: 'Redaktionelle Richtlinie',
    freeCheckLabel: 'Kostenlose Berechnung',
    upgradePathLabel: 'Upgrade-Pfad',
    guideTitle: 'Leitfaden und Interpretation',
    faqTitle: 'FAQ',
    contentQualityBody: 'Diese Seite kombiniert Rechner, Formel, Interpretation, Beispiel, Grenzen und FAQ fuer die AdSense-Pruefung.',
    invalidResultTitle: 'Eingaben pruefen',
    privacyNote: 'Berechnungen laufen in diesem Browser. CalcHarbor speichert in Sprint 3.1 keine Werte.',
    pageStatusLabel: 'Rechnerstatus',
    liveTitle: 'Client-seitiges MVP',
    liveBody: 'Der kostenlose Rechner funktioniert ohne Konto und ohne API-Uebertragung der Werte.',
    gatedTitle: 'Kommerzielle Funktionen gesperrt',
    gatedBody: 'Szenarien, Exporte, Widgets, API, Billing und Anzeigen sind noch nicht aktiv.',
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return homeCopy[locale]
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return shellCopy[locale]
}
