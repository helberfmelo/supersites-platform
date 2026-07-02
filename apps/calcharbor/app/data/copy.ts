import { sanitizePublicCopy, type LocaleCode } from './locales'

export interface HomeCopy {
  eyebrow: string
  title: string
  lead: string
  searchLabel: string
  searchPlaceholder: string
  categoryLabel: string
  allCategories: string
  popularTitle: string
  popularBody: string
  categoryDirectoryTitle: string
  categoryDirectoryBody: string
  allCalculatorsTitle: string
  allCalculatorsBody: string
  footerCategoryTitle: string
  noResultsTitle: string
  noResultsBody: string
  freeLabel: string
  upgradeLabel: string
  detailCta: string
  browserSideLabel: string
  principlesTitle: string
  principles: Array<{ title: string; body: string }>
  statusRows: Array<{ title: string; body: string; tone: 'green' | 'amber' }>
}

export interface WorkbenchCopy {
  eyebrow: string
  title: string
  body: string
  tabLabel: string
  inputsTitle: string
  compareLabel: string
  resultTitle: string
  secondaryTitle: string
  scenarioTitle: string
  scenarioBody: string
  scenarioColumnLabel: string
  assumptionColumnLabel: string
  resultColumnLabel: string
  chartLabel: string
  privacyNote: string
  disclaimer: string
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
  answerTitle: string
  calculationMemoryTitle: string
  interpretationTitle: string
  relatedTitle: string
  workflowUpgradeTitle: string
  workflowUpgradeBody: string
  workflowUpgradeItems: string[]
  summaryActionsTitle: string
  copyResultLabel: string
  copiedLabel: string
  downloadSummaryLabel: string
  compareScenariosLabel: string
  loanBreakdownTitle: string
  loanAmortizationTitle: string
  principalLabel: string
  interestLabel: string
  breakEvenChartTitle: string
  profitLossTitle: string
  volumeLabel: string
  profitLabel: string
  lossLabel: string
  formulaIntroTitle: string
  formulaIntroBody: string
  marginComparisonTitle: string
  costScenarioTitle: string
  reducedCostLabel: string
  currentCostLabel: string
  increasedCostLabel: string
  roiPeriodNoteTitle: string
  roiPeriodNoteBody: string
  roiScenarioTitle: string
  conservativeLabel: string
  baseLabel: string
  aggressiveLabel: string
  planningNote: string
  contentQualityBody: string
  invalidResultTitle: string
  privacyNote: string
  pageStatusLabel: string
  liveTitle: string
  liveBody: string
  gatedTitle: string
  gatedBody: string
  browserSideLabel: string
  scenarioTitle: string
  scenarioBody: string
  scenarioColumnLabel: string
  assumptionColumnLabel: string
  resultColumnLabel: string
  scenarioChartLabel: string
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
    popularTitle: 'Popular calculators',
    popularBody: 'Open the calculators people use most for loan cost, break-even volume, gross margin and ROI checks.',
    categoryDirectoryTitle: 'Browse by category',
    categoryDirectoryBody: 'Use the directory to jump from finance math to business, commerce, time-based and unit-based planning calculators.',
    allCalculatorsTitle: 'All calculators',
    allCalculatorsBody: 'Every calculator below gives a complete free answer, formula, interpretation and scenario range.',
    footerCategoryTitle: 'Calculators by category',
    noResultsTitle: 'No calculators matched',
    noResultsBody: 'Clear the search or choose another category.',
    freeLabel: 'Free result',
    upgradeLabel: 'Upgrade path',
    detailCta: 'Open calculator',
    browserSideLabel: 'Browser-side',
    principlesTitle: 'Operating principles',
    principles: [
      {
        title: 'Transparent formulas',
        body: 'Each calculator exposes the formula and labels assumptions so the answer is auditable.',
      },
      {
        title: 'In-browser by default',
        body: 'Calculations run in the browser and do not store inputs or results.',
      },
      {
        title: 'Paid value adds workflow',
        body: 'Upgrades are for saved scenarios, exports, widgets, teams, API and no ads, not for revealing the answer.',
      },
    ],
    statusRows: [
      {
        title: '8 calculator workspaces',
        body: 'Finance, business and commerce calculators include formulas, examples and scenario ranges.',
        tone: 'green',
      },
      {
        title: '5 language routes',
        body: 'English, Portuguese, Spanish, French and German pages are prerendered.',
        tone: 'green',
      },
      {
        title: 'No signup for the basic answer',
        body: 'Each calculator runs in the browser and shows the working result before any account workflow.',
        tone: 'green',
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
    popularTitle: 'Calculadoras populares',
    popularBody: 'Abra os calculos mais usados para custo de emprestimo, ponto de equilibrio, margem bruta e ROI.',
    categoryDirectoryTitle: 'Navegue por categoria',
    categoryDirectoryBody: 'Use o diretorio para ir de financas a negocios, comercio, prazos e calculos por unidade.',
    allCalculatorsTitle: 'Todas as calculadoras',
    allCalculatorsBody: 'Cada calculadora abaixo entrega resposta gratuita completa, formula, interpretacao e faixa de cenarios.',
    footerCategoryTitle: 'Calculadoras por categoria',
    noResultsTitle: 'Nenhuma calculadora encontrada',
    noResultsBody: 'Limpe a busca ou escolha outra categoria.',
    freeLabel: 'Resultado gratuito',
    upgradeLabel: 'Caminho de upgrade',
    detailCta: 'Abrir calculadora',
    browserSideLabel: 'No navegador',
    principlesTitle: 'Principios operacionais',
    principles: [
      { title: 'Formulas transparentes', body: 'Cada calculadora mostra a formula e as premissas para que a resposta seja auditavel.' },
      { title: 'Cliente por padrao', body: 'Os calculos rodam no navegador e nao armazenam entradas ou resultados.' },
      { title: 'Upgrade e workflow', body: 'Planos pagos vendem cenarios, exportacoes, widgets, equipes, API e ausencia de anuncios.' },
    ],
    statusRows: [
      { title: '8 areas de calculo', body: 'Calculadoras de financas, negocios e comercio incluem formulas, exemplos e cenarios.', tone: 'green' },
      { title: '5 rotas de idioma', body: 'Paginas em ingles, portugues, espanhol, frances e alemao sao prerenderizadas.', tone: 'green' },
      { title: 'Sem cadastro na resposta basica', body: 'Cada calculadora roda no navegador e mostra o resultado antes de qualquer fluxo de conta.', tone: 'green' },
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
    popularTitle: 'Calculadoras populares',
    popularBody: 'Abre los calculos mas usados para prestamo, equilibrio, margen bruto y ROI.',
    categoryDirectoryTitle: 'Explora por categoria',
    categoryDirectoryBody: 'Usa el directorio para pasar de finanzas a negocio, comercio, plazos y calculos por unidad.',
    allCalculatorsTitle: 'Todas las calculadoras',
    allCalculatorsBody: 'Cada calculadora abajo entrega respuesta gratis completa, formula, interpretacion y rango de escenarios.',
    footerCategoryTitle: 'Calculadoras por categoria',
    noResultsTitle: 'No hay calculadoras',
    noResultsBody: 'Borra la busqueda o elige otra categoria.',
    freeLabel: 'Resultado gratis',
    upgradeLabel: 'Ruta de upgrade',
    detailCta: 'Abrir calculadora',
    browserSideLabel: 'En navegador',
    principlesTitle: 'Principios operativos',
    principles: [
      { title: 'Formulas transparentes', body: 'Cada calculadora muestra formula y supuestos para que la respuesta sea auditable.' },
      { title: 'Cliente por defecto', body: 'Los calculos corren en el navegador y no almacenan entradas o resultados.' },
      { title: 'Upgrade como workflow', body: 'Los planes pagos venden escenarios, exportes, widgets, equipos, API y sin anuncios.' },
    ],
    statusRows: [
      { title: '8 espacios de calculo', body: 'Calculadoras de finanzas, negocio y comercio incluyen formulas, ejemplos y escenarios.', tone: 'green' },
      { title: '5 rutas de idioma', body: 'Paginas en ingles, portugues, espanol, frances y aleman se prerenderizan.', tone: 'green' },
      { title: 'Sin registro para la respuesta basica', body: 'Cada calculadora corre en el navegador y muestra el resultado antes de cualquier flujo de cuenta.', tone: 'green' },
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
    popularTitle: 'Calculatrices populaires',
    popularBody: 'Ouvrez les calculs les plus utiles pour pret, seuil de rentabilite, marge brute et ROI.',
    categoryDirectoryTitle: 'Parcourir par categorie',
    categoryDirectoryBody: 'Passez de la finance au business, commerce, delais et calculs par unite.',
    allCalculatorsTitle: 'Toutes les calculatrices',
    allCalculatorsBody: 'Chaque calculatrice donne une reponse gratuite complete, formule, interpretation et plage de scenarios.',
    footerCategoryTitle: 'Calculatrices par categorie',
    noResultsTitle: 'Aucune calculatrice',
    noResultsBody: 'Effacez la recherche ou choisissez une autre categorie.',
    freeLabel: 'Resultat gratuit',
    upgradeLabel: 'Offre payante',
    detailCta: 'Ouvrir',
    browserSideLabel: 'Dans le navigateur',
    principlesTitle: 'Principes operationnels',
    principles: [
      { title: 'Formules transparentes', body: 'Chaque calculatrice montre formule et hypotheses pour rendre la reponse verifiable.' },
      { title: 'Client par defaut', body: 'Les calculs s executent dans le navigateur et ne stockent ni entrees ni resultats.' },
      { title: 'Upgrade workflow', body: 'Les offres payantes ajoutent scenarios, exports, widgets, equipes, API et absence de publicite.' },
    ],
    statusRows: [
      { title: '8 espaces de calcul', body: 'Finance, business et commerce incluent formules, exemples et scenarios.', tone: 'green' },
      { title: '5 routes de langue', body: 'Pages anglaises, portugaises, espagnoles, francaises et allemandes prerenderisees.', tone: 'green' },
      { title: 'Pas de compte pour la reponse de base', body: 'Chaque calculatrice fonctionne dans le navigateur et montre le resultat avant tout flux de compte.', tone: 'green' },
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
    popularTitle: 'Beliebte Rechner',
    popularBody: 'Oeffnen Sie haeufig genutzte Rechner fuer Kreditkosten, Break-even, Bruttomarge und ROI.',
    categoryDirectoryTitle: 'Nach Kategorie suchen',
    categoryDirectoryBody: 'Wechseln Sie zwischen Finanzen, Business, Handel, Zeitplanung und einheitenbasierten Rechnungen.',
    allCalculatorsTitle: 'Alle Rechner',
    allCalculatorsBody: 'Jeder Rechner liefert eine komplette kostenlose Antwort, Formel, Interpretation und Szenario-Spanne.',
    footerCategoryTitle: 'Rechner nach Kategorie',
    noResultsTitle: 'Keine Rechner gefunden',
    noResultsBody: 'Leeren Sie die Suche oder waehlen Sie eine andere Kategorie.',
    freeLabel: 'Kostenloses Ergebnis',
    upgradeLabel: 'Upgrade-Pfad',
    detailCta: 'Rechner oeffnen',
    browserSideLabel: 'Im Browser',
    principlesTitle: 'Betriebsprinzipien',
    principles: [
      { title: 'Transparente Formeln', body: 'Jeder Rechner zeigt Formel und Annahmen, damit die Antwort pruefbar bleibt.' },
      { title: 'Client-seitig zuerst', body: 'Berechnungen laufen im Browser und speichern keine Eingaben oder Ergebnisse.' },
      { title: 'Bezahlwert ist Workflow', body: 'Upgrades sind Szenarien, Exporte, Widgets, Teams, API und keine Anzeigen.' },
    ],
    statusRows: [
      { title: '8 Rechner-Arbeitsbereiche', body: 'Finanz-, Business- und Handelsrechner enthalten Formeln, Beispiele und Szenarien.', tone: 'green' },
      { title: '5 Sprachrouten', body: 'Englische, portugiesische, spanische, franzoesische und deutsche Seiten werden prerendered.', tone: 'green' },
      { title: 'Kein Konto fuer die Basisantwort', body: 'Jeder Rechner laeuft im Browser und zeigt das Ergebnis vor jedem Konto-Workflow.', tone: 'green' },
    ],
  },
}

export const workbenchCopy: Record<LocaleCode, WorkbenchCopy> = {
  en: {
    eyebrow: 'Scenario planner',
    title: 'Compare one calculator across three assumptions.',
    body: 'Pick a calculator, adjust inputs and see the live result, scenario range and audit trail before opening the full guide.',
    tabLabel: 'Calculator workbench tabs',
    inputsTitle: 'Inputs',
    compareLabel: 'Compare scenario',
    resultTitle: 'Live result',
    secondaryTitle: 'Supporting metrics',
    scenarioTitle: 'Scenario range',
    scenarioBody: 'The low, base and high rows reuse the same formula with one core assumption shifted by ten percent.',
    scenarioColumnLabel: 'Scenario',
    assumptionColumnLabel: 'Assumption',
    resultColumnLabel: 'Result',
    chartLabel: 'Scenario chart',
    privacyNote: 'Values stay in this browser session and are not saved by CalcHarbor.',
    disclaimer: 'Planning calculator only. Confirm tax, legal, credit and accounting treatment before acting.',
  },
  'pt-br': {
    eyebrow: 'Planejador de cenarios',
    title: 'Compare uma calculadora em tres premissas.',
    body: 'Escolha uma calculadora, ajuste entradas e veja resultado ao vivo, faixa de cenarios e trilha auditavel antes do guia completo.',
    tabLabel: 'Abas da bancada de calculadoras',
    inputsTitle: 'Entradas',
    compareLabel: 'Comparar cenario',
    resultTitle: 'Resultado ao vivo',
    secondaryTitle: 'Metricas de apoio',
    scenarioTitle: 'Faixa de cenarios',
    scenarioBody: 'As linhas menor, base e maior usam a mesma formula com uma premissa central variando dez por cento.',
    scenarioColumnLabel: 'Cenario',
    assumptionColumnLabel: 'Premissa',
    resultColumnLabel: 'Resultado',
    chartLabel: 'Grafico de cenarios',
    privacyNote: 'Os valores ficam nesta sessao do navegador e nao sao salvos pelo CalcHarbor.',
    disclaimer: 'Calculadora de planejamento. Confirme impostos, juridico, credito e contabilidade antes de agir.',
  },
  es: {
    eyebrow: 'Planificador de escenarios',
    title: 'Compara una calculadora con tres supuestos.',
    body: 'Elige una calculadora, ajusta entradas y mira resultado en vivo, rango de escenarios y rastro auditable antes de abrir la guia.',
    tabLabel: 'Pestanas de calculadoras',
    inputsTitle: 'Entradas',
    compareLabel: 'Comparar escenario',
    resultTitle: 'Resultado en vivo',
    secondaryTitle: 'Metricas de apoyo',
    scenarioTitle: 'Rango de escenarios',
    scenarioBody: 'Las filas baja, base y alta usan la misma formula con un supuesto central variando diez por ciento.',
    scenarioColumnLabel: 'Escenario',
    assumptionColumnLabel: 'Supuesto',
    resultColumnLabel: 'Resultado',
    chartLabel: 'Grafico de escenarios',
    privacyNote: 'Los valores quedan en esta sesion del navegador y CalcHarbor no los guarda.',
    disclaimer: 'Calculadora de planificacion. Confirma impuestos, legal, credito y contabilidad antes de actuar.',
  },
  fr: {
    eyebrow: 'Planificateur de scenarios',
    title: 'Comparez une calculatrice avec trois hypotheses.',
    body: 'Choisissez une calculatrice, ajustez les entrees et voyez resultat, plage de scenarios et trace de calcul avant le guide.',
    tabLabel: 'Onglets des calculatrices',
    inputsTitle: 'Entrees',
    compareLabel: 'Comparer le scenario',
    resultTitle: 'Resultat instantane',
    secondaryTitle: 'Metriques de soutien',
    scenarioTitle: 'Plage de scenarios',
    scenarioBody: 'Les lignes basse, base et haute reutilisent la formule avec une hypothese centrale variee de dix pour cent.',
    scenarioColumnLabel: 'Scenario',
    assumptionColumnLabel: 'Hypothese',
    resultColumnLabel: 'Resultat',
    chartLabel: 'Graphique des scenarios',
    privacyNote: 'Les valeurs restent dans cette session du navigateur et CalcHarbor ne les sauvegarde pas.',
    disclaimer: 'Calculatrice de planification. Confirmez taxes, droit, credit et comptabilite avant decision.',
  },
  de: {
    eyebrow: 'Szenario-Planer',
    title: 'Vergleichen Sie einen Rechner mit drei Annahmen.',
    body: 'Waehlen Sie einen Rechner, passen Sie Eingaben an und sehen Sie Live-Ergebnis, Szenario-Spanne und Rechenpfad.',
    tabLabel: 'Rechner-Arbeitsbereich Tabs',
    inputsTitle: 'Eingaben',
    compareLabel: 'Szenario vergleichen',
    resultTitle: 'Live-Ergebnis',
    secondaryTitle: 'Weitere Kennzahlen',
    scenarioTitle: 'Szenario-Spanne',
    scenarioBody: 'Niedrig, Basis und Hoch nutzen dieselbe Formel, waehrend eine zentrale Annahme um zehn Prozent variiert.',
    scenarioColumnLabel: 'Szenario',
    assumptionColumnLabel: 'Annahme',
    resultColumnLabel: 'Ergebnis',
    chartLabel: 'Szenario-Diagramm',
    privacyNote: 'Werte bleiben in dieser Browser-Sitzung und werden von CalcHarbor nicht gespeichert.',
    disclaimer: 'Planungsrechner. Pruefen Sie Steuern, Recht, Kredit und Buchhaltung vor Entscheidungen.',
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
    answerTitle: 'Live answer',
    calculationMemoryTitle: 'Calculation memory',
    interpretationTitle: 'Interpretation',
    relatedTitle: 'Related calculators',
    workflowUpgradeTitle: 'Save and export for repeat work',
    workflowUpgradeBody: 'The one-time answer stays free. Account features can add history, spreadsheet exports, embedded widgets and API access for recurring workflows.',
    workflowUpgradeItems: ['Scenario history', 'Spreadsheet-ready exports', 'Embeddable widgets and API'],
    summaryActionsTitle: 'Use this result',
    copyResultLabel: 'Copy result',
    copiedLabel: 'Result copied',
    downloadSummaryLabel: 'Download summary',
    compareScenariosLabel: 'Compare scenarios',
    loanBreakdownTitle: 'Principal vs interest',
    loanAmortizationTitle: 'Amortization summary',
    principalLabel: 'Principal',
    interestLabel: 'Interest',
    breakEvenChartTitle: 'Loss and profit by volume',
    profitLossTitle: 'Profit / loss',
    volumeLabel: 'Volume',
    profitLabel: 'Profit',
    lossLabel: 'Loss',
    formulaIntroTitle: 'Plain-English readout',
    formulaIntroBody: 'Read the result first, then use the formula below to audit how the answer was produced.',
    marginComparisonTitle: 'Margin vs markup',
    costScenarioTitle: 'Cost change scenarios',
    reducedCostLabel: 'Reduced cost',
    currentCostLabel: 'Current cost',
    increasedCostLabel: 'Increased cost',
    roiPeriodNoteTitle: 'Period note',
    roiPeriodNoteBody: 'This calculator does not annualize. Treat the ROI as covering the same period used in your return and cost inputs.',
    roiScenarioTitle: 'Conservative, base and aggressive cases',
    conservativeLabel: 'Conservative',
    baseLabel: 'Base',
    aggressiveLabel: 'Aggressive',
    planningNote: 'Planning calculator only. Confirm taxes, legal terms, credit rules and accounting treatment with qualified professionals.',
    contentQualityBody: 'Use the calculator, review the formula and compare scenarios before acting on the result.',
    invalidResultTitle: 'Check the inputs',
    privacyNote: 'Calculations run in this browser session. CalcHarbor does not store entered values.',
    pageStatusLabel: 'Calculator status',
    liveTitle: 'Browser calculator',
    liveBody: 'The free calculator works without signup and without sending values to an API.',
    gatedTitle: 'Repeat-work options',
    gatedBody: 'Use the free answer now; account features can add history, exports, widgets or API access when you need repeated work.',
    browserSideLabel: 'Browser-side',
    scenarioTitle: 'Scenario snapshot',
    scenarioBody: 'Compare the current answer with a lower and higher assumption before relying on one number.',
    scenarioColumnLabel: 'Scenario',
    assumptionColumnLabel: 'Assumption',
    resultColumnLabel: 'Result',
    scenarioChartLabel: 'Scenario comparison',
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
    answerTitle: 'Resposta ao vivo',
    calculationMemoryTitle: 'Memoria de calculo',
    interpretationTitle: 'Interpretacao',
    relatedTitle: 'Calculadoras relacionadas',
    workflowUpgradeTitle: 'Salvar e exportar para trabalho recorrente',
    workflowUpgradeBody: 'A resposta pontual continua gratuita. Recursos de conta podem adicionar historico, exportacao em planilha, widgets e acesso por API para fluxos recorrentes.',
    workflowUpgradeItems: ['Historico de cenarios', 'Exportacoes prontas para planilha', 'Widgets embutidos e API'],
    summaryActionsTitle: 'Usar este resultado',
    copyResultLabel: 'Copiar resultado',
    copiedLabel: 'Resultado copiado',
    downloadSummaryLabel: 'Baixar resumo',
    compareScenariosLabel: 'Comparar cenarios',
    loanBreakdownTitle: 'Principal vs juros',
    loanAmortizationTitle: 'Resumo de amortizacao',
    principalLabel: 'Principal',
    interestLabel: 'Juros',
    breakEvenChartTitle: 'Prejuizo e lucro por volume',
    profitLossTitle: 'Lucro / prejuizo',
    volumeLabel: 'Volume',
    profitLabel: 'Lucro',
    lossLabel: 'Prejuizo',
    formulaIntroTitle: 'Leitura simples',
    formulaIntroBody: 'Leia o resultado primeiro e use a formula abaixo para auditar como a resposta foi produzida.',
    marginComparisonTitle: 'Margem vs markup',
    costScenarioTitle: 'Cenarios de mudanca de custo',
    reducedCostLabel: 'Custo reduzido',
    currentCostLabel: 'Custo atual',
    increasedCostLabel: 'Custo aumentado',
    roiPeriodNoteTitle: 'Nota de periodo',
    roiPeriodNoteBody: 'Esta calculadora nao anualiza. Trate o ROI como relativo ao mesmo periodo usado nas entradas de retorno e custo.',
    roiScenarioTitle: 'Casos conservador, base e agressivo',
    conservativeLabel: 'Conservador',
    baseLabel: 'Base',
    aggressiveLabel: 'Agressivo',
    planningNote: 'Calculadora de planejamento. Confirme impostos, termos juridicos, regras de credito e tratamento contabil com profissionais qualificados.',
    contentQualityBody: 'Use a calculadora, revise a fórmula e compare cenários antes de agir com o resultado.',
    invalidResultTitle: 'Confira as entradas',
    privacyNote: 'Os calculos rodam neste navegador. O CalcHarbor nao armazena valores digitados.',
    pageStatusLabel: 'Status da calculadora',
    liveTitle: 'Calculadora local',
    liveBody: 'A calculadora gratuita funciona sem cadastro e sem enviar valores para API.',
    gatedTitle: 'Opcoes para trabalho recorrente',
    gatedBody: 'Use a resposta gratuita agora; recursos de conta podem adicionar historico, exportacoes, widgets ou API quando houver trabalho repetido.',
    browserSideLabel: 'No navegador',
    scenarioTitle: 'Retrato de cenarios',
    scenarioBody: 'Compare a resposta atual com uma premissa menor e outra maior antes de depender de um numero.',
    scenarioColumnLabel: 'Cenario',
    assumptionColumnLabel: 'Premissa',
    resultColumnLabel: 'Resultado',
    scenarioChartLabel: 'Comparacao de cenarios',
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
    answerTitle: 'Respuesta en vivo',
    calculationMemoryTitle: 'Memoria de calculo',
    interpretationTitle: 'Interpretacion',
    relatedTitle: 'Calculadoras relacionadas',
    workflowUpgradeTitle: 'Guardar y exportar para trabajo repetido',
    workflowUpgradeBody: 'La respuesta puntual sigue gratis. Las funciones de cuenta pueden agregar historial, exportes para hoja de calculo, widgets y API para flujos repetidos.',
    workflowUpgradeItems: ['Historial de escenarios', 'Exportes listos para hoja de calculo', 'Widgets embebidos y API'],
    summaryActionsTitle: 'Usar este resultado',
    copyResultLabel: 'Copiar resultado',
    copiedLabel: 'Resultado copiado',
    downloadSummaryLabel: 'Descargar resumen',
    compareScenariosLabel: 'Comparar escenarios',
    loanBreakdownTitle: 'Principal vs interes',
    loanAmortizationTitle: 'Resumen de amortizacion',
    principalLabel: 'Principal',
    interestLabel: 'Interes',
    breakEvenChartTitle: 'Perdida y ganancia por volumen',
    profitLossTitle: 'Ganancia / perdida',
    volumeLabel: 'Volumen',
    profitLabel: 'Ganancia',
    lossLabel: 'Perdida',
    formulaIntroTitle: 'Lectura simple',
    formulaIntroBody: 'Lee el resultado primero y usa la formula abajo para auditar como se produjo la respuesta.',
    marginComparisonTitle: 'Margen vs markup',
    costScenarioTitle: 'Escenarios de cambio de costo',
    reducedCostLabel: 'Costo reducido',
    currentCostLabel: 'Costo actual',
    increasedCostLabel: 'Costo aumentado',
    roiPeriodNoteTitle: 'Nota de periodo',
    roiPeriodNoteBody: 'Esta calculadora no anualiza. Trata el ROI como relativo al mismo periodo usado en retorno y costo.',
    roiScenarioTitle: 'Casos conservador, base y agresivo',
    conservativeLabel: 'Conservador',
    baseLabel: 'Base',
    aggressiveLabel: 'Agresivo',
    planningNote: 'Calculadora de planificacion. Confirma impuestos, terminos legales, credito y contabilidad con profesionales calificados.',
    contentQualityBody: 'Usa la calculadora, revisa la fórmula y compara escenarios antes de actuar con el resultado.',
    invalidResultTitle: 'Revisa las entradas',
    privacyNote: 'Los calculos corren en este navegador. CalcHarbor no guarda valores.',
    pageStatusLabel: 'Estado de calculadora',
    liveTitle: 'Calculadora local',
    liveBody: 'La calculadora gratis funciona sin registro y sin enviar valores a una API.',
    gatedTitle: 'Opciones para trabajo repetido',
    gatedBody: 'Usa la respuesta gratis ahora; las funciones de cuenta pueden agregar historial, exportes, widgets o API cuando el trabajo se repite.',
    browserSideLabel: 'En navegador',
    scenarioTitle: 'Resumen de escenarios',
    scenarioBody: 'Compara la respuesta actual con un supuesto menor y otro mayor antes de depender de un numero.',
    scenarioColumnLabel: 'Escenario',
    assumptionColumnLabel: 'Supuesto',
    resultColumnLabel: 'Resultado',
    scenarioChartLabel: 'Comparacion de escenarios',
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
    answerTitle: 'Reponse instantanee',
    calculationMemoryTitle: 'Memoire de calcul',
    interpretationTitle: 'Interpretation',
    relatedTitle: 'Calculatrices liees',
    workflowUpgradeTitle: 'Sauvegarder et exporter pour usage repete',
    workflowUpgradeBody: 'La reponse ponctuelle reste gratuite. Les fonctions de compte peuvent ajouter historique, exports tableur, widgets et API pour les usages repetes.',
    workflowUpgradeItems: ['Historique de scenarios', 'Exports prets pour tableur', 'Widgets integres et API'],
    summaryActionsTitle: 'Utiliser ce resultat',
    copyResultLabel: 'Copier le resultat',
    copiedLabel: 'Resultat copie',
    downloadSummaryLabel: 'Telecharger le resume',
    compareScenariosLabel: 'Comparer scenarios',
    loanBreakdownTitle: 'Capital vs interets',
    loanAmortizationTitle: 'Resume d amortissement',
    principalLabel: 'Capital',
    interestLabel: 'Interets',
    breakEvenChartTitle: 'Perte et profit par volume',
    profitLossTitle: 'Profit / perte',
    volumeLabel: 'Volume',
    profitLabel: 'Profit',
    lossLabel: 'Perte',
    formulaIntroTitle: 'Lecture simple',
    formulaIntroBody: 'Lisez le resultat d abord, puis utilisez la formule ci-dessous pour verifier le calcul.',
    marginComparisonTitle: 'Marge vs markup',
    costScenarioTitle: 'Scenarios de changement de cout',
    reducedCostLabel: 'Cout reduit',
    currentCostLabel: 'Cout actuel',
    increasedCostLabel: 'Cout augmente',
    roiPeriodNoteTitle: 'Note de periode',
    roiPeriodNoteBody: 'Cette calculatrice n annualise pas. Interpretez le ROI sur la meme periode que vos entrees de retour et de cout.',
    roiScenarioTitle: 'Cas conservateur, base et agressif',
    conservativeLabel: 'Conservateur',
    baseLabel: 'Base',
    aggressiveLabel: 'Agressif',
    planningNote: 'Calculatrice de planification. Confirmez taxes, cadre juridique, credit et comptabilite avec des professionnels qualifies.',
    contentQualityBody: 'Utilisez la calculatrice, vérifiez la formule et comparez les scénarios avant décision.',
    invalidResultTitle: 'Verifiez les entrees',
    privacyNote: 'Les calculs s executent dans ce navigateur. CalcHarbor ne stocke pas les valeurs.',
    pageStatusLabel: 'Statut calculatrice',
    liveTitle: 'Calculatrice locale',
    liveBody: 'La calculatrice gratuite fonctionne sans compte et sans envoyer les valeurs a une API.',
    gatedTitle: 'Options pour usage repete',
    gatedBody: 'Utilisez la reponse gratuite maintenant; les fonctions de compte peuvent ajouter historique, exports, widgets ou API pour les usages repetes.',
    browserSideLabel: 'Dans le navigateur',
    scenarioTitle: 'Apercu des scenarios',
    scenarioBody: 'Comparez la reponse actuelle avec une hypothese basse et haute avant de retenir un seul nombre.',
    scenarioColumnLabel: 'Scenario',
    assumptionColumnLabel: 'Hypothese',
    resultColumnLabel: 'Resultat',
    scenarioChartLabel: 'Comparaison des scenarios',
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
    answerTitle: 'Live-Ergebnis',
    calculationMemoryTitle: 'Rechenspeicher',
    interpretationTitle: 'Interpretation',
    relatedTitle: 'Verwandte Rechner',
    workflowUpgradeTitle: 'Speichern und exportieren fuer wiederholte Arbeit',
    workflowUpgradeBody: 'Die einmalige Antwort bleibt kostenlos. Konto-Funktionen koennen Verlauf, Tabellenexporte, Widgets und API-Zugriff fuer wiederkehrende Workflows ergaenzen.',
    workflowUpgradeItems: ['Szenario-Verlauf', 'Tabellenfertige Exporte', 'Einbettbare Widgets und API'],
    summaryActionsTitle: 'Dieses Ergebnis nutzen',
    copyResultLabel: 'Ergebnis kopieren',
    copiedLabel: 'Ergebnis kopiert',
    downloadSummaryLabel: 'Zusammenfassung laden',
    compareScenariosLabel: 'Szenarien vergleichen',
    loanBreakdownTitle: 'Kapital vs Zinsen',
    loanAmortizationTitle: 'Tilgungsuebersicht',
    principalLabel: 'Kapital',
    interestLabel: 'Zinsen',
    breakEvenChartTitle: 'Verlust und Gewinn nach Volumen',
    profitLossTitle: 'Gewinn / Verlust',
    volumeLabel: 'Volumen',
    profitLabel: 'Gewinn',
    lossLabel: 'Verlust',
    formulaIntroTitle: 'Einfache Einordnung',
    formulaIntroBody: 'Lesen Sie zuerst das Ergebnis und nutzen Sie danach die Formel zur Pruefung der Berechnung.',
    marginComparisonTitle: 'Marge vs Markup',
    costScenarioTitle: 'Kostenaenderungs-Szenarien',
    reducedCostLabel: 'Geringere Kosten',
    currentCostLabel: 'Aktuelle Kosten',
    increasedCostLabel: 'Hoehere Kosten',
    roiPeriodNoteTitle: 'Zeitraum-Hinweis',
    roiPeriodNoteBody: 'Dieser Rechner annualisiert nicht. Verstehen Sie den ROI fuer denselben Zeitraum wie Rueckfluss und Kosten.',
    roiScenarioTitle: 'Konservativ, Basis und aggressiv',
    conservativeLabel: 'Konservativ',
    baseLabel: 'Basis',
    aggressiveLabel: 'Aggressiv',
    planningNote: 'Planungsrechner. Pruefen Sie Steuern, Recht, Kreditregeln und Buchhaltung mit qualifizierten Fachleuten.',
    contentQualityBody: 'Nutzen Sie den Rechner, prüfen Sie die Formel und vergleichen Sie Szenarien vor Entscheidungen.',
    invalidResultTitle: 'Eingaben pruefen',
    privacyNote: 'Berechnungen laufen in diesem Browser. CalcHarbor speichert keine Werte.',
    pageStatusLabel: 'Rechnerstatus',
    liveTitle: 'Lokaler Rechner',
    liveBody: 'Der kostenlose Rechner funktioniert ohne Konto und ohne API-Uebertragung der Werte.',
    gatedTitle: 'Optionen fuer wiederholte Arbeit',
    gatedBody: 'Nutzen Sie die kostenlose Antwort jetzt; Konto-Funktionen koennen Verlauf, Exporte, Widgets oder API fuer wiederholte Arbeit ergaenzen.',
    browserSideLabel: 'Im Browser',
    scenarioTitle: 'Szenario-Ueberblick',
    scenarioBody: 'Vergleichen Sie die aktuelle Antwort mit niedrigerer und hoeherer Annahme, bevor Sie eine Zahl nutzen.',
    scenarioColumnLabel: 'Szenario',
    assumptionColumnLabel: 'Annahme',
    resultColumnLabel: 'Ergebnis',
    scenarioChartLabel: 'Szenario-Vergleich',
  },
}

export function getHomeCopy(locale: LocaleCode): HomeCopy {
  return sanitizePublicCopy(locale, homeCopy[locale])
}

export function getWorkbenchCopy(locale: LocaleCode): WorkbenchCopy {
  return sanitizePublicCopy(locale, workbenchCopy[locale])
}

export function getShellCopy(locale: LocaleCode): ShellCopy {
  return sanitizePublicCopy(locale, shellCopy[locale])
}
