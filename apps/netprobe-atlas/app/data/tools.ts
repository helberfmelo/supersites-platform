import { sanitizePublicCopy, type LocaleCode } from './locales'

export const toolSlugs = [
  'what-is-my-ip',
  'dns-lookup',
  'rdap-domain-lookup',
  'ssl-certificate-checker',
  'dns-propagation',
  'port-checker',
  'ping-traceroute',
] as const

export type ToolSlug = (typeof toolSlugs)[number]
export type ToolCategory = 'identity' | 'dns' | 'domain' | 'tls' | 'reachability'

export interface ToolContentSection {
  heading: string
  paragraphs: string[]
}

export interface ToolFaq {
  question: string
  answer: string
}

export interface ToolCopy {
  navLabel: string
  title: string
  headline: string
  description: string
  inputLabel: string
  inputPlaceholder: string
  primaryAction: string
  previewResult: string
  statusLabel: string
  freeScope: string
  upgradeScope: string
  exampleTarget: string
  reviewedLabel: string
  methodology: string[]
  contentSections: ToolContentSection[]
  faq: ToolFaq[]
}

interface ToolSeed {
  navLabel: string
  title: string
  headline: string
  description: string
  inputLabel: string
  inputPlaceholder: string
  primaryAction: string
  previewResult: string
  statusLabel: string
  freeScope: string
  upgradeScope: string
  exampleTarget: string
  measure: string
  interpret: string
  example: string
  commonIssue: string
  fix: string
  limitation: string
  faq: ToolFaq[]
}

export interface ToolDefinition {
  slug: ToolSlug
  category: ToolCategory
  shortName: string
  statusLabel: string
  freeScope: string
  upgradeScope: string
  exampleTarget: string
  localized: Record<LocaleCode, ToolCopy>
}

export const categoryLabels: Record<ToolCategory, string> = {
  identity: 'Connection identity',
  dns: 'DNS records',
  domain: 'Domain registration',
  tls: 'TLS and certificates',
  reachability: 'Reachability probes',
}

const localizedCategoryLabels: Record<LocaleCode, Record<ToolCategory, string>> = {
  en: categoryLabels,
  'pt-br': {
    identity: 'Identidade da conexão',
    dns: 'Registros DNS',
    domain: 'Registro de domínio',
    tls: 'TLS e certificados',
    reachability: 'Testes de alcance',
  },
  es: {
    identity: 'Identidad de conexión',
    dns: 'Registros DNS',
    domain: 'Registro de dominio',
    tls: 'TLS y certificados',
    reachability: 'Pruebas de alcance',
  },
  fr: {
    identity: 'Identité de connexion',
    dns: 'Enregistrements DNS',
    domain: 'Enregistrement de domaine',
    tls: 'TLS et certificats',
    reachability: 'Tests d’accessibilité',
  },
  de: {
    identity: 'Verbindungsidentität',
    dns: 'DNS-Einträge',
    domain: 'Domainregistrierung',
    tls: 'TLS und Zertifikate',
    reachability: 'Erreichbarkeitsprüfungen',
  },
}

const reviewedLabelByLocale: Record<LocaleCode, string> = {
  en: 'Reviewed June 26, 2026',
  'pt-br': 'Revisado em 26 de junho de 2026',
  es: 'Revisado el 26 de junio de 2026',
  fr: 'Révisé le 26 juin 2026',
  de: 'Geprüft am 26. Juni 2026',
}

const sectionLabelsByLocale: Record<LocaleCode, {
  use: string
  interpret: string
  example: string
  issues: string
  limits: string
}> = {
  en: {
    use: 'How to use this check',
    interpret: 'How to interpret the result',
    example: 'Example',
    issues: 'Common issues and next steps',
    limits: 'Methodology and limits',
  },
  'pt-br': {
    use: 'Como usar esta consulta',
    interpret: 'Como interpretar o resultado',
    example: 'Exemplo',
    issues: 'Problemas comuns e próximos passos',
    limits: 'Metodologia e limites',
  },
  es: {
    use: 'Cómo usar esta consulta',
    interpret: 'Cómo interpretar el resultado',
    example: 'Ejemplo',
    issues: 'Problemas comunes y próximos pasos',
    limits: 'Metodología y límites',
  },
  fr: {
    use: 'Comment utiliser ce contrôle',
    interpret: 'Comment interpréter le résultat',
    example: 'Exemple',
    issues: 'Problèmes courants et prochaines étapes',
    limits: 'Méthodologie et limites',
  },
  de: {
    use: 'So verwenden Sie diese Prüfung',
    interpret: 'So interpretieren Sie das Ergebnis',
    example: 'Beispiel',
    issues: 'Häufige Probleme und nächste Schritte',
    limits: 'Methodik und Grenzen',
  },
}

function buildToolCopy(locale: LocaleCode, seed: ToolSeed): ToolCopy {
  const labels = sectionLabelsByLocale[locale]

  return {
    navLabel: seed.navLabel,
    title: seed.title,
    headline: seed.headline,
    description: seed.description,
    inputLabel: seed.inputLabel,
    inputPlaceholder: seed.inputPlaceholder,
    primaryAction: seed.primaryAction,
    previewResult: seed.previewResult,
    statusLabel: seed.statusLabel,
    freeScope: seed.freeScope,
    upgradeScope: seed.upgradeScope,
    exampleTarget: seed.exampleTarget,
    reviewedLabel: reviewedLabelByLocale[locale],
    methodology: [seed.measure, seed.interpret, seed.limitation],
    contentSections: [
      {
        heading: labels.use,
        paragraphs: [seed.description, seed.measure],
      },
      {
        heading: labels.interpret,
        paragraphs: [seed.interpret],
      },
      {
        heading: labels.example,
        paragraphs: [seed.example],
      },
      {
        heading: labels.issues,
        paragraphs: [seed.commonIssue, seed.fix],
      },
      {
        heading: labels.limits,
        paragraphs: [seed.limitation],
      },
    ],
    faq: seed.faq,
  }
}

function makeLocalizedCopy(seeds: Record<LocaleCode, ToolSeed>): Record<LocaleCode, ToolCopy> {
  return {
    en: buildToolCopy('en', seeds.en),
    'pt-br': buildToolCopy('pt-br', seeds['pt-br']),
    es: buildToolCopy('es', seeds.es),
    fr: buildToolCopy('fr', seeds.fr),
    de: buildToolCopy('de', seeds.de),
  }
}

function makeTool(
  slug: ToolSlug,
  category: ToolCategory,
  shortName: string,
  seeds: Record<LocaleCode, ToolSeed>,
): ToolDefinition {
  const localized = makeLocalizedCopy(seeds)

  return {
    slug,
    category,
    shortName,
    statusLabel: localized.en.statusLabel,
    freeScope: localized.en.freeScope,
    upgradeScope: localized.en.upgradeScope,
    exampleTarget: localized.en.exampleTarget,
    localized,
  }
}

export const toolCatalog: ToolDefinition[] = [
  makeTool('what-is-my-ip', 'identity', 'IP check', {
    en: {
      navLabel: 'What is my IP',
      title: 'What is my IP',
      headline: 'Read the public address seen by the service and explain what it can and cannot prove.',
      description: 'Use this check to see the IPv4 or IPv6 address that reaches the NetProbe API edge from your current browser session.',
      inputLabel: 'Lookup target',
      inputPlaceholder: 'Current connection',
      primaryAction: 'Run IP check',
      previewResult: 'The IP result shows the address observed by the API edge and whether it is public.',
      statusLabel: 'Ready',
      freeScope: 'Public IPv4 or IPv6, network hints and privacy notes',
      upgradeScope: 'Saved baseline, change alerts and API access',
      exampleTarget: 'Current browser connection',
      measure: 'The API reports only the address it observes for this request, then classifies the version and public-range status.',
      interpret: 'A public IP identifies the network path visible to the service; it does not identify a person, exact device or precise location.',
      example: 'If a VPN is active, the visible address may belong to the VPN provider rather than the local internet connection.',
      commonIssue: 'Different websites can show different addresses when proxies, IPv6, carrier NAT or VPN split tunneling are involved.',
      fix: 'Compare the result with your router, VPN client and browser network settings before assuming an ISP or firewall problem.',
      limitation: 'NetProbe does not store the full observed IP in analytics events and does not treat geolocation or ownership estimates as proof.',
      faq: [
        {
          question: 'Why is my IP different from the one shown by my router?',
          answer: 'A router often shows the local WAN address, while this page shows the public address that reaches the API after NAT, proxies or VPNs.',
        },
        {
          question: 'Can this identify my exact location?',
          answer: 'No. The check reports the network address seen by the service, not a verified physical address or personal identity.',
        },
      ],
    },
    'pt-br': {
      navLabel: 'Qual é meu IP',
      title: 'Qual é meu IP',
      headline: 'Veja o endereço público observado pelo serviço e entenda o que ele prova e o que não prova.',
      description: 'Use esta consulta para ver o IPv4 ou IPv6 que chega à API do NetProbe a partir da sessão atual do navegador.',
      inputLabel: 'Alvo da consulta',
      inputPlaceholder: 'Conexão atual',
      primaryAction: 'Executar consulta de IP',
      previewResult: 'O resultado mostra o endereço observado pela API e se ele está em faixa pública.',
      statusLabel: 'Disponível',
      freeScope: 'IPv4 ou IPv6 público, pistas de rede e notas de privacidade',
      upgradeScope: 'Linha de base salva, alertas de mudança e acesso por API',
      exampleTarget: 'Conexão atual do navegador',
      measure: 'A API informa somente o endereço visto nesta requisição, com versão e classificação de faixa pública.',
      interpret: 'Um IP público identifica o caminho de rede visível ao serviço; não identifica pessoa, dispositivo exato ou localização precisa.',
      example: 'Com VPN ativa, o endereço visível pode pertencer ao provedor da VPN, não à conexão local de internet.',
      commonIssue: 'Sites diferentes podem mostrar IPs diferentes quando há proxy, IPv6, CGNAT ou túnel dividido de VPN.',
      fix: 'Compare com o roteador, o cliente VPN e as configurações de rede do navegador antes de assumir falha de provedor ou firewall.',
      limitation: 'O NetProbe não grava o IP completo em eventos de analytics e não trata geolocalização ou titularidade como prova.',
      faq: [
        {
          question: 'Por que meu IP difere do roteador?',
          answer: 'O roteador pode mostrar o endereço WAN local, enquanto esta página mostra o endereço público que chega à API após NAT, proxy ou VPN.',
        },
        {
          question: 'Isso identifica minha localização exata?',
          answer: 'Não. A consulta mostra o endereço de rede observado pelo serviço, não um endereço físico verificado nem identidade pessoal.',
        },
      ],
    },
    es: {
      navLabel: 'Cuál es mi IP',
      title: 'Cuál es mi IP',
      headline: 'Lee la dirección pública vista por el servicio y explica qué puede probar y qué no.',
      description: 'Usa esta consulta para ver el IPv4 o IPv6 que llega a la API de NetProbe desde la sesión actual del navegador.',
      inputLabel: 'Objetivo de consulta',
      inputPlaceholder: 'Conexión actual',
      primaryAction: 'Ejecutar consulta de IP',
      previewResult: 'El resultado muestra la dirección observada por la API y si pertenece a un rango público.',
      statusLabel: 'Disponible',
      freeScope: 'IPv4 o IPv6 público, pistas de red y notas de privacidad',
      upgradeScope: 'Línea base guardada, alertas de cambio y acceso API',
      exampleTarget: 'Conexión actual del navegador',
      measure: 'La API informa solo la dirección que observa para esta solicitud, con versión y clasificación pública.',
      interpret: 'Una IP pública identifica la ruta de red visible para el servicio; no identifica a una persona, dispositivo exacto o ubicación precisa.',
      example: 'Con una VPN activa, la dirección visible puede pertenecer al proveedor de VPN y no a la conexión local.',
      commonIssue: 'Distintos sitios pueden mostrar direcciones distintas por proxies, IPv6, CGNAT o túneles divididos de VPN.',
      fix: 'Compara el resultado con el router, el cliente VPN y la configuración de red antes de asumir un problema del ISP o firewall.',
      limitation: 'NetProbe no almacena la IP completa en analytics y no trata geolocalización o titularidad como prueba.',
      faq: [
        {
          question: 'Por qué mi IP no coincide con la del router?',
          answer: 'El router puede mostrar la WAN local, mientras esta página muestra la dirección pública que llega a la API tras NAT, proxy o VPN.',
        },
        {
          question: 'Puede identificar mi ubicación exacta?',
          answer: 'No. La consulta muestra la dirección de red vista por el servicio, no una dirección física verificada ni identidad personal.',
        },
      ],
    },
    fr: {
      navLabel: 'Quelle est mon IP',
      title: 'Quelle est mon IP',
      headline: 'Affichez l’adresse publique vue par le service et ce qu’elle prouve réellement.',
      description: 'Utilisez ce contrôle pour voir l’IPv4 ou l’IPv6 qui atteint l’API NetProbe depuis la session actuelle du navigateur.',
      inputLabel: 'Cible du contrôle',
      inputPlaceholder: 'Connexion actuelle',
      primaryAction: 'Lancer le contrôle IP',
      previewResult: 'Le résultat indique l’adresse observée par l’API et si elle appartient à une plage publique.',
      statusLabel: 'Disponible',
      freeScope: 'IPv4 ou IPv6 publique, indices réseau et notes de confidentialité',
      upgradeScope: 'Référence enregistrée, alertes de changement et accès API',
      exampleTarget: 'Connexion actuelle du navigateur',
      measure: 'L’API signale uniquement l’adresse observée pour cette requête, avec version et statut de plage publique.',
      interpret: 'Une IP publique décrit le chemin réseau visible du service; elle n’identifie pas une personne, un appareil exact ou une position précise.',
      example: 'Si un VPN est actif, l’adresse visible peut appartenir au fournisseur VPN plutôt qu’à la connexion locale.',
      commonIssue: 'Des sites différents peuvent afficher des adresses différentes avec proxy, IPv6, CGNAT ou tunnel VPN partagé.',
      fix: 'Comparez avec le routeur, le client VPN et les réglages réseau du navigateur avant de conclure à une panne FAI ou pare-feu.',
      limitation: 'NetProbe ne stocke pas l’IP complète dans les événements analytics et ne présente pas la géolocalisation comme preuve.',
      faq: [
        {
          question: 'Pourquoi mon IP diffère-t-elle de celle du routeur ?',
          answer: 'Le routeur peut afficher l’adresse WAN locale, tandis que cette page affiche l’adresse publique qui atteint l’API après NAT, proxy ou VPN.',
        },
        {
          question: 'Ce contrôle donne-t-il ma position exacte ?',
          answer: 'Non. Il indique l’adresse réseau vue par le service, pas une adresse physique vérifiée ni une identité personnelle.',
        },
      ],
    },
    de: {
      navLabel: 'Was ist meine IP',
      title: 'Was ist meine IP',
      headline: 'Lesen Sie die öffentliche Adresse, die der Dienst sieht, und was sie wirklich aussagt.',
      description: 'Diese Prüfung zeigt die IPv4- oder IPv6-Adresse, die von Ihrer aktuellen Browser-Sitzung an der NetProbe-API ankommt.',
      inputLabel: 'Prüfziel',
      inputPlaceholder: 'Aktuelle Verbindung',
      primaryAction: 'IP-Prüfung starten',
      previewResult: 'Das Ergebnis zeigt die von der API beobachtete Adresse und ob sie öffentlich ist.',
      statusLabel: 'Bereit',
      freeScope: 'Öffentliche IPv4 oder IPv6, Netzwerkhinweise und Datenschutzhinweise',
      upgradeScope: 'Gespeicherte Basislinie, Änderungsalarme und API-Zugang',
      exampleTarget: 'Aktuelle Browser-Verbindung',
      measure: 'Die API meldet nur die für diese Anfrage beobachtete Adresse sowie Version und öffentlichen Bereich.',
      interpret: 'Eine öffentliche IP beschreibt den für den Dienst sichtbaren Netzwerkpfad; sie beweist keine Person, kein exaktes Gerät und keinen genauen Standort.',
      example: 'Bei aktivem VPN kann die sichtbare Adresse zum VPN-Anbieter statt zum lokalen Internetanschluss gehören.',
      commonIssue: 'Unterschiedliche Websites können verschiedene Adressen zeigen, wenn Proxy, IPv6, CGNAT oder VPN-Split-Tunneling beteiligt sind.',
      fix: 'Vergleichen Sie Router, VPN-Client und Browser-Netzwerkdaten, bevor Sie ein ISP- oder Firewall-Problem annehmen.',
      limitation: 'NetProbe speichert die vollständige IP nicht in Analytics-Ereignissen und behandelt Geodaten nicht als Beweis.',
      faq: [
        {
          question: 'Warum unterscheidet sich meine IP von der Router-Anzeige?',
          answer: 'Der Router zeigt oft die lokale WAN-Adresse, diese Seite aber die öffentliche Adresse, die nach NAT, Proxy oder VPN an der API ankommt.',
        },
        {
          question: 'Kann das meinen genauen Standort bestimmen?',
          answer: 'Nein. Die Prüfung zeigt die vom Dienst gesehene Netzwerkadresse, keine verifizierte Anschrift oder persönliche Identität.',
        },
      ],
    },
  }),
  makeTool('dns-lookup', 'dns', 'DNS lookup', {
    en: {
      navLabel: 'DNS Lookup',
      title: 'DNS Lookup',
      headline: 'Inspect common public DNS records with clear TTL and resolver context.',
      description: 'Enter a hostname, choose record types and read the public DNS answers returned by the bounded resolver path.',
      inputLabel: 'Domain name',
      inputPlaceholder: 'example.com',
      primaryAction: 'Run DNS lookup',
      previewResult: 'Record rows show type, value, TTL and resolver notes from the safe DNS API.',
      statusLabel: 'Ready',
      freeScope: 'A, AAAA, CNAME, MX, TXT, NS, SOA and CAA records',
      upgradeScope: 'Monitoring, record history and API batches',
      exampleTarget: 'example.com',
      measure: 'NetProbe accepts hostnames only, normalizes the name, rejects private-resolution targets and caches public answers briefly.',
      interpret: 'TTL values show how long resolvers may reuse an answer; empty records are different from a domain that does not exist.',
      example: 'For example.com A, an answer such as 93.184.216.34 means the resolver found an IPv4 address for that name.',
      commonIssue: 'A typo, missing record, DNSSEC problem or delayed resolver cache can all look like “no record” from one location.',
      fix: 'Check the authoritative DNS zone, verify the selected record type and wait at least one TTL before assuming propagation failed.',
      limitation: 'This point-in-time lookup is not a global propagation audit and does not query arbitrary user-supplied resolvers.',
      faq: [
        {
          question: 'Why do I see no TXT or MX records?',
          answer: 'The domain may not publish that type, or the authoritative zone may not have propagated to the resolver path used by this check yet.',
        },
        {
          question: 'Does this replace my DNS provider dashboard?',
          answer: 'No. It verifies what a resolver can see publicly; your provider dashboard remains the source for intended zone configuration.',
        },
      ],
    },
    'pt-br': {
      navLabel: 'Consulta DNS',
      title: 'Consulta DNS',
      headline: 'Inspecione registros DNS públicos comuns com TTL e contexto de resolvedor claros.',
      description: 'Informe um hostname, escolha os tipos de registro e leia as respostas DNS públicas retornadas pelo caminho seguro do resolvedor.',
      inputLabel: 'Nome de domínio',
      inputPlaceholder: 'example.com',
      primaryAction: 'Executar consulta DNS',
      previewResult: 'As linhas mostram tipo, valor, TTL e notas do resolvedor vindas da API DNS segura.',
      statusLabel: 'Disponível',
      freeScope: 'Registros A, AAAA, CNAME, MX, TXT, NS, SOA e CAA',
      upgradeScope: 'Monitoramento, histórico de registros e lotes por API',
      exampleTarget: 'example.com',
      measure: 'O NetProbe aceita apenas hostnames, normaliza o nome, rejeita alvos que resolvem para redes privadas e usa cache curto.',
      interpret: 'O TTL indica por quanto tempo resolvedores podem reutilizar a resposta; registro vazio é diferente de domínio inexistente.',
      example: 'Para example.com A, uma resposta como 93.184.216.34 significa que o resolvedor encontrou um IPv4 para o nome.',
      commonIssue: 'Erro de digitação, registro ausente, DNSSEC ou cache atrasado podem parecer “sem registro” a partir de um ponto.',
      fix: 'Confira a zona autoritativa, confirme o tipo escolhido e aguarde pelo menos um TTL antes de concluir que a propagação falhou.',
      limitation: 'Esta consulta pontual não é auditoria global de propagação e não consulta resolvedores arbitrários fornecidos pelo usuário.',
      faq: [
        {
          question: 'Por que não vejo registros TXT ou MX?',
          answer: 'O domínio pode não publicar esse tipo, ou a zona autoritativa pode ainda não ter propagado para o caminho de resolvedor usado.',
        },
        {
          question: 'Isso substitui o painel do provedor DNS?',
          answer: 'Não. A consulta mostra o que um resolvedor público enxerga; o painel do provedor continua sendo a fonte da configuração desejada.',
        },
      ],
    },
    es: {
      navLabel: 'Consulta DNS',
      title: 'Consulta DNS',
      headline: 'Inspecciona registros DNS públicos comunes con TTL y contexto del resolver.',
      description: 'Introduce un hostname, elige tipos de registro y lee las respuestas DNS públicas devueltas por el camino seguro.',
      inputLabel: 'Nombre de dominio',
      inputPlaceholder: 'example.com',
      primaryAction: 'Ejecutar consulta DNS',
      previewResult: 'Las filas muestran tipo, valor, TTL y notas del resolver desde la API DNS segura.',
      statusLabel: 'Disponible',
      freeScope: 'Registros A, AAAA, CNAME, MX, TXT, NS, SOA y CAA',
      upgradeScope: 'Monitoreo, historial de registros y lotes por API',
      exampleTarget: 'example.com',
      measure: 'NetProbe acepta solo hostnames, normaliza el nombre, rechaza resoluciones privadas y cachea respuestas públicas por poco tiempo.',
      interpret: 'El TTL indica cuánto tiempo un resolver puede reutilizar una respuesta; no tener registros no es lo mismo que NXDOMAIN.',
      example: 'Para example.com A, una respuesta como 93.184.216.34 significa que el resolver encontró un IPv4 para ese nombre.',
      commonIssue: 'Un error de escritura, registro faltante, DNSSEC o caché demorada pueden parecer “sin registro” desde una ubicación.',
      fix: 'Revisa la zona autoritativa, confirma el tipo elegido y espera al menos un TTL antes de asumir que falló la propagación.',
      limitation: 'Esta consulta puntual no es una auditoría global de propagación ni usa resolvers arbitrarios del usuario.',
      faq: [
        {
          question: 'Por qué no veo registros TXT o MX?',
          answer: 'El dominio puede no publicar ese tipo, o la zona autoritativa aún no llegó al resolver usado por esta consulta.',
        },
        {
          question: 'Reemplaza el panel de mi proveedor DNS?',
          answer: 'No. Verifica lo que un resolver puede ver públicamente; el panel del proveedor sigue siendo la fuente de configuración deseada.',
        },
      ],
    },
    fr: {
      navLabel: 'Recherche DNS',
      title: 'Recherche DNS',
      headline: 'Inspectez les enregistrements DNS publics courants avec TTL et contexte de résolveur.',
      description: 'Saisissez un nom d’hôte, choisissez les types d’enregistrement et lisez les réponses DNS publiques du chemin contrôlé.',
      inputLabel: 'Nom de domaine',
      inputPlaceholder: 'example.com',
      primaryAction: 'Lancer la recherche DNS',
      previewResult: 'Les lignes affichent type, valeur, TTL et notes de résolveur depuis l’API DNS sécurisée.',
      statusLabel: 'Disponible',
      freeScope: 'Enregistrements A, AAAA, CNAME, MX, TXT, NS, SOA et CAA',
      upgradeScope: 'Surveillance, historique d’enregistrements et lots API',
      exampleTarget: 'example.com',
      measure: 'NetProbe accepte seulement des noms d’hôte, normalise le nom, bloque les résolutions privées et met les réponses publiques en cache court.',
      interpret: 'Le TTL indique combien de temps une réponse peut être réutilisée; une absence d’enregistrement diffère d’un domaine inexistant.',
      example: 'Pour example.com A, une réponse comme 93.184.216.34 signifie que le résolveur a trouvé une adresse IPv4.',
      commonIssue: 'Faute de frappe, enregistrement absent, DNSSEC ou cache retardé peuvent ressembler à “aucun enregistrement”.',
      fix: 'Vérifiez la zone autoritaire, le type choisi et attendez au moins un TTL avant de conclure à un échec de propagation.',
      limitation: 'Cette recherche ponctuelle n’est pas un audit mondial de propagation et n’interroge pas de résolveurs arbitraires.',
      faq: [
        {
          question: 'Pourquoi aucun TXT ou MX n’apparaît ?',
          answer: 'Le domaine peut ne pas publier ce type, ou la zone autoritaire peut ne pas être visible depuis le résolveur utilisé.',
        },
        {
          question: 'Cela remplace-t-il le tableau de bord DNS ?',
          answer: 'Non. Le contrôle montre ce qu’un résolveur public voit; le tableau de bord du fournisseur reste la source de configuration.',
        },
      ],
    },
    de: {
      navLabel: 'DNS-Lookup',
      title: 'DNS-Lookup',
      headline: 'Prüfen Sie öffentliche DNS-Einträge mit TTL und Resolver-Kontext.',
      description: 'Geben Sie einen Hostnamen ein, wählen Sie Eintragstypen und lesen Sie die öffentlichen DNS-Antworten des begrenzten Resolver-Pfads.',
      inputLabel: 'Domainname',
      inputPlaceholder: 'example.com',
      primaryAction: 'DNS-Lookup starten',
      previewResult: 'Die Zeilen zeigen Typ, Wert, TTL und Resolver-Hinweise aus der sicheren DNS-API.',
      statusLabel: 'Bereit',
      freeScope: 'A-, AAAA-, CNAME-, MX-, TXT-, NS-, SOA- und CAA-Einträge',
      upgradeScope: 'Monitoring, Eintragsverlauf und API-Batches',
      exampleTarget: 'example.com',
      measure: 'NetProbe akzeptiert nur Hostnamen, normalisiert den Namen, blockiert private Auflösungen und cached öffentliche Antworten kurz.',
      interpret: 'TTL-Werte zeigen, wie lange Resolver eine Antwort wiederverwenden können; leere Einträge sind nicht dasselbe wie NXDOMAIN.',
      example: 'Bei example.com A bedeutet 93.184.216.34, dass der Resolver eine IPv4-Adresse für diesen Namen gefunden hat.',
      commonIssue: 'Tippfehler, fehlende Einträge, DNSSEC-Probleme oder verzögerter Cache können wie “kein Eintrag” wirken.',
      fix: 'Prüfen Sie die autoritative Zone, den gewählten Typ und warten Sie mindestens eine TTL, bevor Sie Propagation als fehlgeschlagen werten.',
      limitation: 'Dieser punktuelle Lookup ist keine globale Propagationsprüfung und nutzt keine beliebigen Nutzer-Resolver.',
      faq: [
        {
          question: 'Warum sehe ich keine TXT- oder MX-Einträge?',
          answer: 'Die Domain veröffentlicht diesen Typ eventuell nicht, oder die autoritative Zone ist für den genutzten Resolver noch nicht sichtbar.',
        },
        {
          question: 'Ersetzt das mein DNS-Provider-Dashboard?',
          answer: 'Nein. Es zeigt, was ein öffentlicher Resolver sieht; das Provider-Dashboard bleibt die Quelle der gewünschten Zonenkonfiguration.',
        },
      ],
    },
  }),
  makeTool('rdap-domain-lookup', 'domain', 'RDAP lookup', {
    en: {
      navLabel: 'RDAP Domain Lookup',
      title: 'RDAP Domain Lookup',
      headline: 'Summarize public domain registration facts without exposing private contact data.',
      description: 'Enter a domain to read registry and registrar facts that are publicly available through RDAP.',
      inputLabel: 'Domain name',
      inputPlaceholder: 'example.com',
      primaryAction: 'Run RDAP lookup',
      previewResult: 'RDAP results separate registry facts, registrar facts, dates and limitation notices.',
      statusLabel: 'Ready',
      freeScope: 'Registrar, status, important dates and nameservers',
      upgradeScope: 'Expiration alerts, ownership change history and reports',
      exampleTarget: 'example.com',
      measure: 'NetProbe uses RDAP bootstrap data, normalizes registrar, status, dates and nameservers, then omits contact records.',
      interpret: 'Registration, update and expiration dates help spot renewal risk, but registry formatting and redaction vary by TLD.',
      example: 'A domain with less than 30 days until expiration should be checked against the registrar account before a service outage appears.',
      commonIssue: 'Privacy redaction, registry rate limits or unsupported TLD behavior can produce incomplete owner or date details.',
      fix: 'Use the registrar account for authoritative renewal and account data, then use NetProbe for external visibility and reminders.',
      limitation: 'RDAP summaries are informational and do not attempt to reveal personal contact data hidden by registry policy.',
      faq: [
        {
          question: 'Why are registrant contacts missing?',
          answer: 'Many registries redact personal contact data. NetProbe intentionally omits those fields from the summary.',
        },
        {
          question: 'Is domain age exact?',
          answer: 'It is calculated from the registration date returned by RDAP when that date is present and reliable.',
        },
      ],
    },
    'pt-br': {
      navLabel: 'Consulta RDAP de domínio',
      title: 'Consulta RDAP de domínio',
      headline: 'Resuma fatos públicos de registro sem expor dados privados de contato.',
      description: 'Informe um domínio para ler dados de registry e registrar disponíveis publicamente via RDAP.',
      inputLabel: 'Nome de domínio',
      inputPlaceholder: 'example.com',
      primaryAction: 'Executar consulta RDAP',
      previewResult: 'O resultado separa fatos de registry, registrar, datas e avisos de limitação.',
      statusLabel: 'Disponível',
      freeScope: 'Registrar, status, datas importantes e nameservers',
      upgradeScope: 'Alertas de expiração, histórico de mudança e relatórios',
      exampleTarget: 'example.com',
      measure: 'O NetProbe usa bootstrap RDAP, normaliza registrar, status, datas e nameservers, e omite registros de contato.',
      interpret: 'Datas de registro, atualização e expiração ajudam a ver risco de renovação, mas formato e redação variam por TLD.',
      example: 'Um domínio com menos de 30 dias para expirar deve ser conferido na conta do registrar antes de virar indisponibilidade.',
      commonIssue: 'Redação de privacidade, rate limit do registry ou TLD pouco suportado podem deixar dados incompletos.',
      fix: 'Use a conta do registrar para cobrança e renovação autoritativas, e o NetProbe para visibilidade externa e lembretes.',
      limitation: 'O resumo RDAP é informativo e não tenta revelar contatos pessoais ocultos por política do registry.',
      faq: [
        {
          question: 'Por que os contatos do registrante não aparecem?',
          answer: 'Muitos registries redigem dados pessoais. O NetProbe omite esses campos de propósito.',
        },
        {
          question: 'A idade do domínio é exata?',
          answer: 'Ela é calculada a partir da data de registro retornada pelo RDAP quando esse dado existe e é confiável.',
        },
      ],
    },
    es: {
      navLabel: 'Consulta RDAP de dominio',
      title: 'Consulta RDAP de dominio',
      headline: 'Resume datos públicos de registro sin exponer contacto privado.',
      description: 'Introduce un dominio para leer datos públicos de registry y registrar disponibles por RDAP.',
      inputLabel: 'Nombre de dominio',
      inputPlaceholder: 'example.com',
      primaryAction: 'Ejecutar consulta RDAP',
      previewResult: 'Los resultados separan datos de registry, registrar, fechas y avisos de limitación.',
      statusLabel: 'Disponible',
      freeScope: 'Registrar, estado, fechas importantes y nameservers',
      upgradeScope: 'Alertas de expiración, historial de cambios e informes',
      exampleTarget: 'example.com',
      measure: 'NetProbe usa bootstrap RDAP, normaliza registrar, estado, fechas y nameservers, y omite contactos.',
      interpret: 'Fechas de registro, actualización y expiración ayudan a detectar riesgo de renovación, pero cada TLD puede variar.',
      example: 'Un dominio con menos de 30 días para expirar debe revisarse en la cuenta del registrar antes de causar una caída.',
      commonIssue: 'Redacción de privacidad, límites del registry o TLD no soportado pueden producir datos incompletos.',
      fix: 'Usa la cuenta del registrar para datos autoritativos de pago y renovación, y NetProbe para visibilidad externa.',
      limitation: 'Los resúmenes RDAP son informativos y no intentan revelar datos personales ocultos por política del registry.',
      faq: [
        {
          question: 'Por qué faltan los contactos del registrante?',
          answer: 'Muchos registries redactan datos personales. NetProbe omite esos campos deliberadamente.',
        },
        {
          question: 'La edad del dominio es exacta?',
          answer: 'Se calcula desde la fecha de registro devuelta por RDAP cuando esa fecha existe y es confiable.',
        },
      ],
    },
    fr: {
      navLabel: 'Recherche RDAP de domaine',
      title: 'Recherche RDAP de domaine',
      headline: 'Résumez les faits publics d’un domaine sans exposer les contacts privés.',
      description: 'Saisissez un domaine pour lire les données publiques de registre et registrar disponibles via RDAP.',
      inputLabel: 'Nom de domaine',
      inputPlaceholder: 'example.com',
      primaryAction: 'Lancer la recherche RDAP',
      previewResult: 'Les résultats RDAP séparent registre, registrar, dates et avis de limitation.',
      statusLabel: 'Disponible',
      freeScope: 'Registrar, statuts, dates importantes et serveurs de noms',
      upgradeScope: 'Alertes d’expiration, historique de changements et rapports',
      exampleTarget: 'example.com',
      measure: 'NetProbe utilise le bootstrap RDAP, normalise registrar, statuts, dates et nameservers, puis omet les contacts.',
      interpret: 'Les dates d’enregistrement, mise à jour et expiration signalent un risque de renouvellement, mais varient selon les TLD.',
      example: 'Un domaine expirant dans moins de 30 jours doit être vérifié dans le compte registrar avant une interruption.',
      commonIssue: 'Rédaction de confidentialité, limites du registre ou TLD mal supporté peuvent rendre les données incomplètes.',
      fix: 'Utilisez le compte registrar pour la facturation et le renouvellement, puis NetProbe pour la visibilité externe.',
      limitation: 'Les résumés RDAP sont informatifs et ne cherchent pas à révéler des contacts personnels masqués.',
      faq: [
        {
          question: 'Pourquoi les contacts du titulaire manquent-ils ?',
          answer: 'De nombreux registres masquent les données personnelles. NetProbe omet volontairement ces champs.',
        },
        {
          question: 'L’âge du domaine est-il exact ?',
          answer: 'Il est calculé depuis la date d’enregistrement RDAP lorsque cette date est présente et fiable.',
        },
      ],
    },
    de: {
      navLabel: 'RDAP-Domain-Lookup',
      title: 'RDAP-Domain-Lookup',
      headline: 'Fassen Sie öffentliche Domain-Registrierungsdaten ohne private Kontaktdaten zusammen.',
      description: 'Geben Sie eine Domain ein, um öffentlich verfügbare Registry- und Registrar-Daten per RDAP zu lesen.',
      inputLabel: 'Domainname',
      inputPlaceholder: 'example.com',
      primaryAction: 'RDAP-Lookup starten',
      previewResult: 'RDAP-Ergebnisse trennen Registry-Daten, Registrar-Daten, Daten und Einschränkungen.',
      statusLabel: 'Bereit',
      freeScope: 'Registrar, Status, wichtige Daten und Nameserver',
      upgradeScope: 'Ablaufwarnungen, Änderungsverlauf und Berichte',
      exampleTarget: 'example.com',
      measure: 'NetProbe nutzt RDAP-Bootstrap-Daten, normalisiert Registrar, Status, Daten und Nameserver und lässt Kontaktdaten weg.',
      interpret: 'Registrierungs-, Änderungs- und Ablaufdaten zeigen Erneuerungsrisiken, doch Format und Redaktion variieren je TLD.',
      example: 'Eine Domain mit weniger als 30 Tagen Restlaufzeit sollte im Registrar-Konto geprüft werden, bevor Ausfälle entstehen.',
      commonIssue: 'Privacy-Redaktion, Registry-Limits oder TLD-Besonderheiten können unvollständige Angaben erzeugen.',
      fix: 'Nutzen Sie das Registrar-Konto für verbindliche Abrechnungs- und Verlängerungsdaten, NetProbe für externe Sichtbarkeit.',
      limitation: 'RDAP-Zusammenfassungen sind informativ und versuchen nicht, durch Richtlinien verborgene persönliche Kontaktdaten offenzulegen.',
      faq: [
        {
          question: 'Warum fehlen Registrantenkontakte?',
          answer: 'Viele Registries redigieren personenbezogene Daten. NetProbe lässt diese Felder absichtlich aus.',
        },
        {
          question: 'Ist das Domainalter exakt?',
          answer: 'Es wird aus dem RDAP-Registrierungsdatum berechnet, wenn dieses Datum vorhanden und belastbar ist.',
        },
      ],
    },
  }),
  makeTool('ssl-certificate-checker', 'tls', 'SSL check', {
    en: {
      navLabel: 'SSL Certificate Checker',
      title: 'SSL Certificate Checker',
      headline: 'Check certificate identity, expiry and chain context for public HTTPS endpoints.',
      description: 'Enter a hostname to inspect the certificate served on HTTPS port 443 after public address validation.',
      inputLabel: 'Hostname',
      inputPlaceholder: 'example.com',
      primaryAction: 'Run SSL check',
      previewResult: 'Certificate details show issuer, subject, validity dates, SANs and bounded probe limitations.',
      statusLabel: 'Ready',
      freeScope: 'Issuer, subject, SANs, validity dates and chain notes',
      upgradeScope: 'Expiry monitoring, alerts and change history',
      exampleTarget: 'example.com',
      measure: 'NetProbe resolves public A/AAAA answers first, blocks private ranges and then connects with SNI on port 443.',
      interpret: 'A valid certificate should match the hostname, include current dates and be issued by a chain trusted by modern clients.',
      example: 'If the certificate expires in 10 days, renew it and verify that the new certificate is actually served by the edge.',
      commonIssue: 'Load balancers, stale CDN edges or missing SAN entries can serve a certificate that differs from the one expected.',
      fix: 'Check each public edge, renew through the certificate authority and confirm deployment after cache or load balancer updates.',
      limitation: 'The initial probe reports certificate facts and chain hints; it is not a full browser trust or policy audit.',
      faq: [
        {
          question: 'Why does the certificate not match my domain?',
          answer: 'The server may be serving a default certificate, a stale CDN certificate or a certificate without the hostname in SAN values.',
        },
        {
          question: 'Does this check every subdomain?',
          answer: 'No. It checks the hostname you enter. Use monitoring later for multiple assets and recurring expiry alerts.',
        },
      ],
    },
    'pt-br': {
      navLabel: 'Verificador de certificado SSL',
      title: 'Verificador de certificado SSL',
      headline: 'Confira identidade, expiração e contexto de cadeia para endpoints HTTPS públicos.',
      description: 'Informe um hostname para inspecionar o certificado servido na porta HTTPS 443 após validação de endereço público.',
      inputLabel: 'Hostname',
      inputPlaceholder: 'example.com',
      primaryAction: 'Executar verificação SSL',
      previewResult: 'Os detalhes mostram emissor, sujeito, validade, SANs e limitações do probe.',
      statusLabel: 'Disponível',
      freeScope: 'Emissor, sujeito, SANs, validade e notas de cadeia',
      upgradeScope: 'Monitoramento de expiração, alertas e histórico de mudança',
      exampleTarget: 'example.com',
      measure: 'O NetProbe resolve A/AAAA públicos primeiro, bloqueia faixas privadas e conecta com SNI na porta 443.',
      interpret: 'Um certificado válido deve casar com o hostname, ter datas atuais e vir de uma cadeia confiável para clientes modernos.',
      example: 'Se o certificado expira em 10 dias, renove e confirme que o novo certificado está realmente servido no edge.',
      commonIssue: 'Balanceadores, CDNs atrasadas ou SAN ausente podem servir certificado diferente do esperado.',
      fix: 'Confira cada edge público, renove pela autoridade certificadora e confirme o deploy após cache ou load balancer.',
      limitation: 'O probe inicial mostra fatos e pistas de cadeia; não é uma auditoria completa de confiança de navegador.',
      faq: [
        {
          question: 'Por que o certificado não corresponde ao domínio?',
          answer: 'O servidor pode servir certificado padrão, certificado antigo de CDN ou certificado sem o hostname nos SANs.',
        },
        {
          question: 'Ele verifica todos os subdomínios?',
          answer: 'Não. Ele verifica o hostname informado. O monitoramento futuro cobre múltiplos ativos e alertas recorrentes.',
        },
      ],
    },
    es: {
      navLabel: 'Verificador de certificado SSL',
      title: 'Verificador de certificado SSL',
      headline: 'Revisa identidad, expiración y cadena para endpoints HTTPS públicos.',
      description: 'Introduce un hostname para inspeccionar el certificado servido en HTTPS 443 tras validar direcciones públicas.',
      inputLabel: 'Hostname',
      inputPlaceholder: 'example.com',
      primaryAction: 'Ejecutar verificación SSL',
      previewResult: 'Los detalles muestran emisor, sujeto, validez, SANs y límites del probe.',
      statusLabel: 'Disponible',
      freeScope: 'Emisor, sujeto, SANs, fechas de validez y notas de cadena',
      upgradeScope: 'Monitoreo de expiración, alertas e historial de cambios',
      exampleTarget: 'example.com',
      measure: 'NetProbe resuelve A/AAAA públicos, bloquea rangos privados y conecta con SNI en el puerto 443.',
      interpret: 'Un certificado válido debe coincidir con el hostname, tener fechas vigentes y una cadena confiable para clientes modernos.',
      example: 'Si el certificado expira en 10 días, renueva y verifica que el nuevo certificado sea servido por el edge.',
      commonIssue: 'Balanceadores, CDN antiguas o SANs faltantes pueden servir un certificado distinto al esperado.',
      fix: 'Revisa cada edge público, renueva con la autoridad certificadora y confirma el despliegue tras cachés o balanceadores.',
      limitation: 'El probe inicial informa datos y pistas de cadena; no es una auditoría completa de confianza de navegador.',
      faq: [
        {
          question: 'Por qué el certificado no coincide con mi dominio?',
          answer: 'El servidor puede servir un certificado por defecto, uno antiguo de CDN o uno sin el hostname en los SANs.',
        },
        {
          question: 'Comprueba todos los subdominios?',
          answer: 'No. Comprueba el hostname ingresado. El monitoreo futuro cubrirá múltiples activos y alertas recurrentes.',
        },
      ],
    },
    fr: {
      navLabel: 'Vérificateur de certificat SSL',
      title: 'Vérificateur de certificat SSL',
      headline: 'Vérifiez identité, expiration et chaîne pour les endpoints HTTPS publics.',
      description: 'Saisissez un nom d’hôte pour inspecter le certificat servi sur HTTPS 443 après validation des adresses publiques.',
      inputLabel: 'Nom d’hôte',
      inputPlaceholder: 'example.com',
      primaryAction: 'Lancer le contrôle SSL',
      previewResult: 'Les détails montrent émetteur, sujet, dates, SANs et limites du probe.',
      statusLabel: 'Disponible',
      freeScope: 'Émetteur, sujet, SANs, dates de validité et notes de chaîne',
      upgradeScope: 'Surveillance d’expiration, alertes et historique',
      exampleTarget: 'example.com',
      measure: 'NetProbe résout d’abord les A/AAAA publics, bloque les plages privées puis se connecte en SNI sur le port 443.',
      interpret: 'Un certificat valide doit correspondre au nom d’hôte, avoir des dates actuelles et une chaîne reconnue.',
      example: 'Si le certificat expire dans 10 jours, renouvelez-le et vérifiez que le nouveau certificat est servi en edge.',
      commonIssue: 'Load balancers, CDN obsolètes ou SAN manquant peuvent servir un certificat différent.',
      fix: 'Vérifiez chaque edge public, renouvelez auprès de l’autorité et confirmez le déploiement après cache ou load balancer.',
      limitation: 'Le probe initial rapporte des faits et indices de chaîne; ce n’est pas un audit complet de confiance navigateur.',
      faq: [
        {
          question: 'Pourquoi le certificat ne correspond-il pas au domaine ?',
          answer: 'Le serveur peut servir un certificat par défaut, un certificat CDN obsolète ou un certificat sans le nom dans les SANs.',
        },
        {
          question: 'Tous les sous-domaines sont-ils vérifiés ?',
          answer: 'Non. Seul le nom saisi est contrôlé. La surveillance future couvrira plusieurs actifs et alertes récurrentes.',
        },
      ],
    },
    de: {
      navLabel: 'SSL-Zertifikatsprüfung',
      title: 'SSL-Zertifikatsprüfung',
      headline: 'Prüfen Sie Identität, Ablauf und Kettenkontext öffentlicher HTTPS-Endpunkte.',
      description: 'Geben Sie einen Hostnamen ein, um das auf HTTPS-Port 443 ausgelieferte Zertifikat nach öffentlicher Adressprüfung zu prüfen.',
      inputLabel: 'Hostname',
      inputPlaceholder: 'example.com',
      primaryAction: 'SSL-Prüfung starten',
      previewResult: 'Zertifikatsdetails zeigen Aussteller, Subject, Gültigkeit, SANs und Probe-Grenzen.',
      statusLabel: 'Bereit',
      freeScope: 'Aussteller, Subject, SANs, Gültigkeitsdaten und Kettenhinweise',
      upgradeScope: 'Ablauf-Monitoring, Alarme und Änderungsverlauf',
      exampleTarget: 'example.com',
      measure: 'NetProbe löst zuerst öffentliche A/AAAA-Antworten auf, blockiert private Bereiche und verbindet per SNI auf Port 443.',
      interpret: 'Ein gültiges Zertifikat sollte zum Hostnamen passen, aktuelle Daten haben und von einer vertrauenswürdigen Kette stammen.',
      example: 'Wenn das Zertifikat in 10 Tagen abläuft, erneuern Sie es und prüfen Sie, ob das neue Zertifikat am Edge ausgeliefert wird.',
      commonIssue: 'Load Balancer, veraltete CDN-Edges oder fehlende SAN-Einträge können ein anderes Zertifikat ausliefern.',
      fix: 'Prüfen Sie jedes öffentliche Edge, erneuern Sie bei der CA und bestätigen Sie die Auslieferung nach Cache- oder LB-Updates.',
      limitation: 'Die erste Probe meldet Zertifikatsfakten und Kettenhinweise; sie ist kein vollständiges Browser-Trust-Audit.',
      faq: [
        {
          question: 'Warum passt das Zertifikat nicht zur Domain?',
          answer: 'Der Server liefert eventuell ein Standardzertifikat, ein altes CDN-Zertifikat oder ein Zertifikat ohne Hostname in den SANs.',
        },
        {
          question: 'Prüft das alle Subdomains?',
          answer: 'Nein. Geprüft wird der eingegebene Hostname. Monitoring kann später mehrere Assets und wiederkehrende Alarme abdecken.',
        },
      ],
    },
  }),
  makeTool('dns-propagation', 'dns', 'Propagation', {
    en: {
      navLabel: 'DNS Propagation',
      title: 'DNS Propagation',
      headline: 'Compare public DNS answers across controlled resolvers and explain differences.',
      description: 'Choose a hostname and record type to see the controlled resolver snapshot available in the current runtime.',
      inputLabel: 'Domain name',
      inputPlaceholder: 'example.com',
      primaryAction: 'Run propagation check',
      previewResult: 'Propagation rows show resolver scope, answer, TTL and limitation notes.',
      statusLabel: 'Ready',
      freeScope: 'Controlled resolver snapshots for selected DNS records',
      upgradeScope: 'Scheduled propagation watches and reports',
      exampleTarget: 'example.com',
      measure: 'The initial runtime uses a bounded resolver snapshot and labels the resolver scope instead of claiming global coverage.',
      interpret: 'Different answers can be normal while TTLs expire; the key signal is whether authoritative and public resolver answers converge.',
      example: 'After changing an A record, one resolver may still show the old IP until its previous TTL expires.',
      commonIssue: 'Propagation confusion often comes from stale local cache, wrong authoritative zone or checking the wrong record type.',
      fix: 'Flush local cache, verify the authoritative nameservers and compare again after the longest relevant TTL.',
      limitation: 'This version does not promise worldwide propagation until regional resolver probes are available and documented.',
      faq: [
        {
          question: 'Is this a worldwide propagation checker?',
          answer: 'Not yet. It reports controlled snapshots and labels resolver scope until regional resolver coverage is available.',
        },
        {
          question: 'How long should propagation take?',
          answer: 'Often one or more TTL windows, but registrar, registry and resolver behavior can add delay.',
        },
      ],
    },
    'pt-br': {
      navLabel: 'Propagação DNS',
      title: 'Propagação DNS',
      headline: 'Compare respostas DNS públicas em resolvedores controlados e explique diferenças.',
      description: 'Escolha hostname e tipo de registro para ver o snapshot de resolvedor controlado disponível no runtime atual.',
      inputLabel: 'Nome de domínio',
      inputPlaceholder: 'example.com',
      primaryAction: 'Executar propagação',
      previewResult: 'As linhas mostram escopo do resolvedor, resposta, TTL e limitações.',
      statusLabel: 'Disponível',
      freeScope: 'Snapshots de resolvedores controlados para registros selecionados',
      upgradeScope: 'Observação agendada de propagação e relatórios',
      exampleTarget: 'example.com',
      measure: 'O runtime inicial usa snapshot limitado e rotula o escopo do resolvedor em vez de prometer cobertura global.',
      interpret: 'Respostas diferentes podem ser normais enquanto TTLs expiram; o sinal é a convergência entre autoritativo e público.',
      example: 'Depois de alterar um A, um resolvedor pode mostrar o IP antigo até o TTL anterior expirar.',
      commonIssue: 'Confusão de propagação costuma vir de cache local, zona autoritativa errada ou tipo de registro incorreto.',
      fix: 'Limpe o cache local, confirme nameservers autoritativos e compare de novo após o maior TTL relevante.',
      limitation: 'Esta versão não promete propagação mundial até que probes regionais estejam publicados e documentados.',
      faq: [
        {
          question: 'É um verificador mundial de propagação?',
          answer: 'Ainda não. Ele mostra snapshots controlados e informa o escopo até existir cobertura regional de resolvedores.',
        },
        {
          question: 'Quanto tempo a propagação deve levar?',
          answer: 'Frequentemente uma ou mais janelas de TTL, mas registrar, registry e resolvedores podem acrescentar atraso.',
        },
      ],
    },
    es: {
      navLabel: 'Propagación DNS',
      title: 'Propagación DNS',
      headline: 'Compara respuestas DNS públicas en resolvers controlados y explica diferencias.',
      description: 'Elige hostname y tipo de registro para ver el snapshot de resolver disponible en el runtime actual.',
      inputLabel: 'Nombre de dominio',
      inputPlaceholder: 'example.com',
      primaryAction: 'Ejecutar propagación',
      previewResult: 'Las filas muestran alcance del resolver, respuesta, TTL y notas de limitación.',
      statusLabel: 'Disponible',
      freeScope: 'Snapshots de resolvers controlados para registros seleccionados',
      upgradeScope: 'Vigilancia programada de propagación e informes',
      exampleTarget: 'example.com',
      measure: 'El runtime inicial usa un snapshot limitado y etiqueta el alcance del resolver en vez de prometer cobertura global.',
      interpret: 'Respuestas distintas pueden ser normales mientras vencen TTLs; importa la convergencia entre autoritativo y público.',
      example: 'Tras cambiar un A, un resolver puede seguir mostrando la IP anterior hasta que expire el TTL previo.',
      commonIssue: 'La confusión suele venir de caché local, zona autoritativa equivocada o tipo de registro incorrecto.',
      fix: 'Limpia caché local, verifica nameservers autoritativos y compara de nuevo tras el TTL más largo relevante.',
      limitation: 'Esta versión no promete propagación mundial hasta que existan probes regionales documentados.',
      faq: [
        {
          question: 'Es un verificador mundial de propagación?',
          answer: 'Todavía no. Informa snapshots controlados y alcance del resolver hasta tener cobertura regional de resolvers.',
        },
        {
          question: 'Cuánto tarda la propagación?',
          answer: 'A menudo una o más ventanas de TTL, aunque registrar, registry y resolvers pueden agregar demora.',
        },
      ],
    },
    fr: {
      navLabel: 'Propagation DNS',
      title: 'Propagation DNS',
      headline: 'Comparez les réponses DNS publiques de résolveurs contrôlés et expliquez les écarts.',
      description: 'Choisissez un nom d’hôte et un type pour voir le snapshot de résolveur disponible dans le runtime actuel.',
      inputLabel: 'Nom de domaine',
      inputPlaceholder: 'example.com',
      primaryAction: 'Lancer le contrôle de propagation',
      previewResult: 'Les lignes montrent portée du résolveur, réponse, TTL et limites.',
      statusLabel: 'Disponible',
      freeScope: 'Snapshots de résolveurs contrôlés pour enregistrements choisis',
      upgradeScope: 'Surveillance planifiée de propagation et rapports',
      exampleTarget: 'example.com',
      measure: 'Le runtime initial utilise un snapshot borné et indique la portée du résolveur au lieu de promettre une couverture mondiale.',
      interpret: 'Des réponses différentes peuvent être normales pendant l’expiration des TTL; cherchez la convergence avec l’autoritatif.',
      example: 'Après modification d’un A, un résolveur peut garder l’ancienne IP jusqu’à expiration du TTL précédent.',
      commonIssue: 'Les confusions viennent souvent d’un cache local, d’une zone autoritaire erronée ou du mauvais type.',
      fix: 'Videz le cache local, vérifiez les nameservers autoritaires et comparez après le plus long TTL pertinent.',
      limitation: 'Cette version ne promet pas de propagation mondiale avant des probes régionaux documentés.',
      faq: [
        {
          question: 'Est-ce un vérificateur mondial ?',
          answer: 'Pas encore. Il rapporte des snapshots controles et leur portee jusqu a disponibilite d une couverture regionale de resolveurs.',
        },
        {
          question: 'Combien de temps dure la propagation ?',
          answer: 'Souvent une ou plusieurs fenêtres de TTL, mais registrar, registre et résolveurs peuvent ajouter du délai.',
        },
      ],
    },
    de: {
      navLabel: 'DNS-Propagation',
      title: 'DNS-Propagation',
      headline: 'Vergleichen Sie öffentliche DNS-Antworten kontrollierter Resolver und erklären Sie Unterschiede.',
      description: 'Wählen Sie Hostname und Eintragstyp, um den im aktuellen Runtime verfügbaren Resolver-Snapshot zu sehen.',
      inputLabel: 'Domainname',
      inputPlaceholder: 'example.com',
      primaryAction: 'Propagation prüfen',
      previewResult: 'Die Zeilen zeigen Resolver-Scope, Antwort, TTL und Einschränkungen.',
      statusLabel: 'Bereit',
      freeScope: 'Kontrollierte Resolver-Snapshots für ausgewählte DNS-Einträge',
      upgradeScope: 'Geplante Propagationswatches und Berichte',
      exampleTarget: 'example.com',
      measure: 'Die erste Runtime nutzt einen begrenzten Snapshot und kennzeichnet den Resolver-Scope, statt globale Abdeckung zu behaupten.',
      interpret: 'Unterschiedliche Antworten können normal sein, solange TTLs ablaufen; wichtig ist die Konvergenz zur autoritativen Antwort.',
      example: 'Nach Änderung eines A-Eintrags kann ein Resolver die alte IP zeigen, bis die vorherige TTL abläuft.',
      commonIssue: 'Verwirrung entsteht oft durch lokalen Cache, falsche autoritative Zone oder falschen Eintragstyp.',
      fix: 'Leeren Sie lokalen Cache, prüfen Sie autoritative Nameserver und vergleichen Sie nach der längsten relevanten TTL erneut.',
      limitation: 'Diese Version verspricht keine weltweite Propagation, bis regionale Resolver-Probes bereitstehen und dokumentiert sind.',
      faq: [
        {
          question: 'Ist das ein weltweiter Propagation-Checker?',
          answer: 'Noch nicht. Er zeigt kontrollierte Snapshots und deren Scope, bis regionale Resolver-Abdeckung verfuegbar ist.',
        },
        {
          question: 'Wie lange dauert Propagation?',
          answer: 'Oft eine oder mehrere TTL-Perioden, aber Registrar, Registry und Resolver können zusätzliche Verzögerung erzeugen.',
        },
      ],
    },
  }),
  makeTool('port-checker', 'reachability', 'Port checker', {
    en: {
      navLabel: 'Port Checker',
      title: 'Port Checker',
      headline: 'Test a small allowlisted set of public ports with anti-abuse boundaries.',
      description: 'Enter a public hostname and choose one of the allowed ports to test limited TCP reachability.',
      inputLabel: 'Hostname',
      inputPlaceholder: 'example.com',
      primaryAction: 'Run port check',
      previewResult: 'Port status appears after allowlist, private-range blocks and rate limits are validated.',
      statusLabel: 'Ready',
      freeScope: 'Limited public TCP reachability checks',
      upgradeScope: 'Monitoring, alerts and incident history',
      exampleTarget: 'example.com:443',
      measure: 'NetProbe resolves public A/AAAA answers first, tests only ports 80, 443, 587 and 993, and limits checked addresses.',
      interpret: 'Open means a TCP connection succeeded from the runtime; closed or timeout can reflect firewalls, service state or network path.',
      example: 'If 443 is open but 80 times out, HTTPS may work while plain HTTP is intentionally blocked.',
      commonIssue: 'A private DNS answer, unsupported port or firewall rule can block the check before any TCP connection is attempted.',
      fix: 'Confirm the public DNS answer, test an allowed service port and review firewall or load balancer rules.',
      limitation: 'This is not a port scanner; broad ranges, private targets and arbitrary ports are intentionally unsupported.',
      faq: [
        {
          question: 'Why are only a few ports available?',
          answer: 'The allowlist reduces abuse risk and keeps the free tool focused on common web and mail service diagnostics.',
        },
        {
          question: 'Does “closed” mean my server is down?',
          answer: 'Not always. It may mean the service is not listening, a firewall blocks the runtime or the chosen port is not meant to be public.',
        },
      ],
    },
    'pt-br': {
      navLabel: 'Verificador de porta',
      title: 'Verificador de porta',
      headline: 'Teste um conjunto pequeno de portas públicas permitidas com limites antiabuso.',
      description: 'Informe um hostname público e escolha uma porta permitida para testar alcance TCP limitado.',
      inputLabel: 'Hostname',
      inputPlaceholder: 'example.com',
      primaryAction: 'Executar porta',
      previewResult: 'O status aparece após validar allowlist, bloqueio de faixas privadas e rate limit.',
      statusLabel: 'Disponível',
      freeScope: 'Testes TCP públicos limitados',
      upgradeScope: 'Monitoramento, alertas e histórico de incidentes',
      exampleTarget: 'example.com:443',
      measure: 'O NetProbe resolve A/AAAA públicos primeiro, testa apenas 80, 443, 587 e 993, e limita endereços checados.',
      interpret: 'Aberta significa que uma conexão TCP funcionou no runtime; fechada ou timeout pode ser firewall, serviço ou rota.',
      example: 'Se 443 abre e 80 expira, HTTPS pode funcionar enquanto HTTP simples está bloqueado de propósito.',
      commonIssue: 'DNS privado, porta não suportada ou regra de firewall podem bloquear antes da conexão TCP.',
      fix: 'Confirme o DNS público, teste uma porta permitida e revise firewall ou load balancer.',
      limitation: 'Isto não é scanner de portas; faixas amplas, alvos privados e portas arbitrárias são bloqueados.',
      faq: [
        {
          question: 'Por que há poucas portas disponíveis?',
          answer: 'A allowlist reduz abuso e mantém a ferramenta gratuita focada em diagnósticos comuns de web e e-mail.',
        },
        {
          question: '“Fechada” quer dizer servidor fora?',
          answer: 'Nem sempre. Pode ser serviço sem escuta, firewall bloqueando o runtime ou porta que não deveria ser pública.',
        },
      ],
    },
    es: {
      navLabel: 'Verificador de puerto',
      title: 'Verificador de puerto',
      headline: 'Prueba un conjunto pequeño de puertos públicos permitidos con límites antiabuso.',
      description: 'Introduce un hostname público y elige un puerto permitido para probar alcance TCP limitado.',
      inputLabel: 'Hostname',
      inputPlaceholder: 'example.com',
      primaryAction: 'Ejecutar puerto',
      previewResult: 'El estado aparece tras validar allowlist, rangos privados y rate limits.',
      statusLabel: 'Disponible',
      freeScope: 'Pruebas públicas TCP limitadas',
      upgradeScope: 'Monitoreo, alertas e historial de incidentes',
      exampleTarget: 'example.com:443',
      measure: 'NetProbe resuelve A/AAAA públicos, prueba solo 80, 443, 587 y 993, y limita las direcciones revisadas.',
      interpret: 'Abierto significa que una conexión TCP tuvo éxito; cerrado o timeout puede ser firewall, servicio o ruta.',
      example: 'Si 443 está abierto y 80 expira, HTTPS puede funcionar mientras HTTP simple está bloqueado intencionalmente.',
      commonIssue: 'DNS privado, puerto no soportado o firewall pueden bloquear antes de intentar TCP.',
      fix: 'Confirma el DNS público, prueba un puerto permitido y revisa firewall o balanceador.',
      limitation: 'No es un escáner de puertos; rangos amplios, destinos privados y puertos arbitrarios no están soportados.',
      faq: [
        {
          question: 'Por qué hay pocos puertos disponibles?',
          answer: 'La allowlist reduce abuso y enfoca la herramienta gratuita en diagnósticos comunes de web y correo.',
        },
        {
          question: '“Cerrado” significa que el servidor cayó?',
          answer: 'No siempre. Puede ser servicio sin escucha, firewall o un puerto que no debe ser público.',
        },
      ],
    },
    fr: {
      navLabel: 'Vérificateur de port',
      title: 'Vérificateur de port',
      headline: 'Testez une petite liste de ports publics autorisés avec limites anti-abus.',
      description: 'Saisissez un nom d’hôte public et choisissez un port autorisé pour tester l’accessibilité TCP limitée.',
      inputLabel: 'Nom d’hôte',
      inputPlaceholder: 'example.com',
      primaryAction: 'Lancer le test de port',
      previewResult: 'Le statut apparaît après validation de la liste autorisée, des plages privées et des limites.',
      statusLabel: 'Disponible',
      freeScope: 'Tests TCP publics limités',
      upgradeScope: 'Surveillance, alertes et historique d’incident',
      exampleTarget: 'example.com:443',
      measure: 'NetProbe résout d’abord les A/AAAA publics, teste seulement 80, 443, 587 et 993, et limite les adresses.',
      interpret: 'Ouvert signifie qu’une connexion TCP a réussi; fermé ou timeout peut venir du pare-feu, du service ou du chemin réseau.',
      example: 'Si 443 est ouvert et 80 expire, HTTPS peut fonctionner tandis que HTTP est volontairement bloqué.',
      commonIssue: 'DNS privé, port non supporté ou règle pare-feu peuvent bloquer avant toute connexion TCP.',
      fix: 'Confirmez le DNS public, testez un port autorisé et vérifiez pare-feu ou load balancer.',
      limitation: 'Ce n’est pas un scanner de ports; plages larges, cibles privées et ports arbitraires sont exclus.',
      faq: [
        {
          question: 'Pourquoi si peu de ports ?',
          answer: 'La liste autorisée réduit l’abus et concentre l’outil gratuit sur les diagnostics web et e-mail courants.',
        },
        {
          question: '“Fermé” signifie-t-il serveur indisponible ?',
          answer: 'Pas toujours. Le service peut ne pas écouter, le pare-feu peut bloquer ou le port peut être privé.',
        },
      ],
    },
    de: {
      navLabel: 'Port-Prüfer',
      title: 'Port-Prüfer',
      headline: 'Testen Sie eine kleine erlaubte Liste öffentlicher Ports mit Anti-Abuse-Grenzen.',
      description: 'Geben Sie einen öffentlichen Hostnamen ein und wählen Sie einen erlaubten Port für begrenzte TCP-Erreichbarkeit.',
      inputLabel: 'Hostname',
      inputPlaceholder: 'example.com',
      primaryAction: 'Port prüfen',
      previewResult: 'Der Status erscheint nach Allowlist-, Privatbereichs- und Rate-Limit-Prüfung.',
      statusLabel: 'Bereit',
      freeScope: 'Begrenzte öffentliche TCP-Erreichbarkeitsprüfungen',
      upgradeScope: 'Monitoring, Alarme und Incident-Verlauf',
      exampleTarget: 'example.com:443',
      measure: 'NetProbe löst zuerst öffentliche A/AAAA-Antworten auf, testet nur 80, 443, 587 und 993 und begrenzt Adressen.',
      interpret: 'Offen bedeutet, dass eine TCP-Verbindung gelang; geschlossen oder Timeout kann Firewall, Dienststatus oder Netzwerkpfad sein.',
      example: 'Wenn 443 offen ist und 80 ausläuft, kann HTTPS funktionieren, während HTTP absichtlich blockiert wird.',
      commonIssue: 'Private DNS-Antwort, nicht unterstützter Port oder Firewall-Regel können die Prüfung vor TCP blockieren.',
      fix: 'Bestätigen Sie öffentliche DNS-Antworten, testen Sie einen erlaubten Port und prüfen Sie Firewall oder Load Balancer.',
      limitation: 'Dies ist kein Portscanner; breite Bereiche, private Ziele und beliebige Ports sind absichtlich nicht unterstützt.',
      faq: [
        {
          question: 'Warum sind nur wenige Ports verfügbar?',
          answer: 'Die Allowlist senkt Missbrauchsrisiko und fokussiert das kostenlose Tool auf häufige Web- und Mail-Diagnosen.',
        },
        {
          question: 'Heißt “geschlossen”, dass mein Server ausfällt?',
          answer: 'Nicht immer. Der Dienst hört eventuell nicht, eine Firewall blockiert oder der Port ist nicht öffentlich gedacht.',
        },
      ],
    },
  }),
  makeTool('ping-traceroute', 'reachability', 'Ping and trace', {
    en: {
      navLabel: 'Ping and Traceroute',
      title: 'Ping and Traceroute',
      headline: 'Run limited reachability diagnostics from controlled infrastructure.',
      description: 'Enter a public hostname to run the bounded reachability check available in the current web runtime.',
      inputLabel: 'Hostname',
      inputPlaceholder: 'example.com',
      primaryAction: 'Run reachability check',
      previewResult: 'Latency and hop summaries are limited to safe probes until controlled path diagnostics are available.',
      statusLabel: 'Ready',
      freeScope: 'Bounded TCP 443 reachability with ICMP and traceroute limits disclosed',
      upgradeScope: 'Multi-region checks, history and alerts',
      exampleTarget: 'example.com',
      measure: 'The current request path checks TCP 443 with fixed timeout limits and reports ICMP/traceroute as unavailable until controlled path diagnostics exist.',
      interpret: 'TCP latency is a practical availability signal, but it is not the same as ICMP ping or a full network path trace.',
      example: 'A host can block ICMP yet serve HTTPS normally, so a failed ping does not automatically mean the site is down.',
      commonIssue: 'Network devices often rate limit ICMP or hide hops, while firewalls may allow HTTPS from some regions and block others.',
      fix: 'Use TCP status first, then compare from another network or region when the result does not match user reports.',
      limitation: 'Traceroute requires controlled probe infrastructure; the browser-facing API does not run arbitrary packet path probes.',
      faq: [
        {
          question: 'Why is traceroute marked not supported?',
          answer: 'Traceroute needs controlled probe infrastructure and stricter abuse controls. The initial web runtime reports bounded TCP reachability first.',
        },
        {
          question: 'Is TCP latency the same as ping?',
          answer: 'No. TCP latency measures a connection attempt to a service port, while ICMP ping uses a different protocol.',
        },
      ],
    },
    'pt-br': {
      navLabel: 'Ping e traceroute',
      title: 'Ping e traceroute',
      headline: 'Execute diagnósticos limitados de alcance a partir de infraestrutura controlada.',
      description: 'Informe um hostname público para rodar o teste de alcance limitado disponível no runtime web atual.',
      inputLabel: 'Hostname',
      inputPlaceholder: 'example.com',
      primaryAction: 'Executar alcance',
      previewResult: 'Latência e caminho ficam limitados a probes seguros até existir diagnóstico controlado de rota.',
      statusLabel: 'Disponível',
      freeScope: 'Alcance TCP 443 limitado com limites de ICMP e traceroute declarados',
      upgradeScope: 'Checagens multirregião, histórico e alertas',
      exampleTarget: 'example.com',
      measure: 'O caminho atual testa TCP 443 com timeout fixo e informa ICMP/traceroute como indisponíveis até existir diagnóstico controlado de rota.',
      interpret: 'Latência TCP é sinal prático de disponibilidade, mas não é igual a ping ICMP nem a rota completa.',
      example: 'Um host pode bloquear ICMP e ainda servir HTTPS normalmente; ping falho não prova site fora.',
      commonIssue: 'Equipamentos de rede limitam ICMP ou escondem hops, e firewalls podem permitir HTTPS em uma região e bloquear em outra.',
      fix: 'Use o status TCP primeiro e compare de outra rede ou região quando o resultado divergir dos relatos.',
      limitation: 'Traceroute exige infraestrutura de probes controlados; a API web não executa probes arbitrários de caminho de pacotes.',
      faq: [
        {
          question: 'Por que traceroute aparece indisponível?',
          answer: 'Traceroute precisa de infraestrutura de probes controlados e controles antiabuso mais rígidos. O runtime inicial mostra TCP limitado primeiro.',
        },
        {
          question: 'Latência TCP é o mesmo que ping?',
          answer: 'Não. TCP mede tentativa de conexão a uma porta; ICMP ping usa outro protocolo.',
        },
      ],
    },
    es: {
      navLabel: 'Ping y traceroute',
      title: 'Ping y traceroute',
      headline: 'Ejecuta diagnósticos limitados de alcance desde infraestructura controlada.',
      description: 'Introduce un hostname público para ejecutar la prueba limitada disponible en el runtime web actual.',
      inputLabel: 'Hostname',
      inputPlaceholder: 'example.com',
      primaryAction: 'Ejecutar alcance',
      previewResult: 'Latencia y ruta quedan limitadas a probes seguros hasta tener diagnostico controlado de ruta.',
      statusLabel: 'Disponible',
      freeScope: 'Alcance TCP 443 limitado con límites de ICMP y traceroute declarados',
      upgradeScope: 'Pruebas multirregión, historial y alertas',
      exampleTarget: 'example.com',
      measure: 'El camino actual prueba TCP 443 con timeouts fijos e informa ICMP/traceroute como no disponibles hasta tener diagnostico controlado de ruta.',
      interpret: 'La latencia TCP es una señal práctica de disponibilidad, pero no equivale a ping ICMP ni a ruta completa.',
      example: 'Un host puede bloquear ICMP y servir HTTPS normalmente; ping fallido no prueba que el sitio esté caído.',
      commonIssue: 'Dispositivos de red limitan ICMP u ocultan saltos, y firewalls pueden permitir HTTPS desde unas regiones y bloquear otras.',
      fix: 'Usa primero el estado TCP y compara desde otra red o región cuando el resultado no coincida con reportes.',
      limitation: 'Traceroute requiere infraestructura de probes controlados; la API web no ejecuta probes arbitrarios de ruta de paquetes.',
      faq: [
        {
          question: 'Por qué traceroute aparece no soportado?',
          answer: 'Traceroute necesita infraestructura de probes controlados y controles antiabuso más estrictos. El runtime inicial informa TCP limitado.',
        },
        {
          question: 'La latencia TCP es igual a ping?',
          answer: 'No. TCP mide un intento de conexión a un puerto; ICMP ping usa otro protocolo.',
        },
      ],
    },
    fr: {
      navLabel: 'Ping et traceroute',
      title: 'Ping et traceroute',
      headline: 'Exécutez des diagnostics d’accessibilité limités depuis une infrastructure contrôlée.',
      description: 'Saisissez un nom d’hôte public pour lancer le contrôle limité disponible dans le runtime web actuel.',
      inputLabel: 'Nom d’hôte',
      inputPlaceholder: 'example.com',
      primaryAction: 'Lancer le contrôle d’accès',
      previewResult: 'Latence et chemin restent limites a des probes surs jusqu a disponibilite d un diagnostic de chemin controle.',
      statusLabel: 'Disponible',
      freeScope: 'Accessibilité TCP 443 bornée avec limites ICMP/traceroute déclarées',
      upgradeScope: 'Contrôles multirégion, historique et alertes',
      exampleTarget: 'example.com',
      measure: 'Le chemin actuel teste TCP 443 avec timeouts fixes et signale ICMP/traceroute indisponibles jusqu a disponibilite d un diagnostic de chemin controle.',
      interpret: 'La latence TCP est un signal pratique, mais elle n’est pas équivalente à ICMP ping ni à une trace complète.',
      example: 'Un hôte peut bloquer ICMP tout en servant HTTPS normalement; un ping échoué ne prouve pas une panne.',
      commonIssue: 'Les équipements limitent ICMP ou masquent les hops, et les pare-feu peuvent varier selon les régions.',
      fix: 'Utilisez d’abord le statut TCP, puis comparez depuis un autre réseau ou région si les retours utilisateurs divergent.',
      limitation: 'Traceroute exige une infrastructure de probes controles; l API web ne lance pas de probes arbitraires de chemin paquet.',
      faq: [
        {
          question: 'Pourquoi traceroute est-il non supporté ?',
          answer: 'Traceroute demande une infrastructure de probes controles et des controles anti-abus plus stricts. Le runtime initial rapporte TCP.',
        },
        {
          question: 'La latence TCP est-elle un ping ?',
          answer: 'Non. TCP mesure une tentative de connexion à un port; ICMP ping utilise un autre protocole.',
        },
      ],
    },
    de: {
      navLabel: 'Ping und Traceroute',
      title: 'Ping und Traceroute',
      headline: 'Führen Sie begrenzte Erreichbarkeitsdiagnosen aus kontrollierter Infrastruktur aus.',
      description: 'Geben Sie einen öffentlichen Hostnamen ein, um die im aktuellen Web-Runtime verfügbare begrenzte Prüfung zu starten.',
      inputLabel: 'Hostname',
      inputPlaceholder: 'example.com',
      primaryAction: 'Erreichbarkeit prüfen',
      previewResult: 'Latenz und Pfad bleiben auf sichere Probes begrenzt, bis kontrollierte Pfaddiagnosen verfuegbar sind.',
      statusLabel: 'Bereit',
      freeScope: 'Begrenzte TCP-443-Erreichbarkeit mit deklarierten ICMP- und Traceroute-Grenzen',
      upgradeScope: 'Multi-Region-Prüfungen, Verlauf und Alarme',
      exampleTarget: 'example.com',
      measure: 'Der aktuelle Pfad prüft TCP 443 mit festen Timeouts und meldet ICMP/Traceroute als nicht verfügbar, bis kontrollierte Pfaddiagnosen existieren.',
      interpret: 'TCP-Latenz ist ein praktisches Verfügbarkeitssignal, aber nicht identisch mit ICMP-Ping oder einer vollständigen Pfadspur.',
      example: 'Ein Host kann ICMP blockieren und trotzdem HTTPS normal ausliefern; ein fehlgeschlagener Ping beweist keinen Ausfall.',
      commonIssue: 'Netzwerkgeräte begrenzen ICMP oder verstecken Hops, Firewalls erlauben HTTPS teils regional unterschiedlich.',
      fix: 'Nutzen Sie zuerst den TCP-Status und vergleichen Sie aus einem anderen Netz oder einer Region, wenn Berichte abweichen.',
      limitation: 'Traceroute erfordert kontrollierte Probe-Infrastruktur; die Web-API führt keine beliebigen Paketpfad-Probes aus.',
      faq: [
        {
          question: 'Warum ist Traceroute nicht unterstützt?',
          answer: 'Traceroute benötigt kontrollierte Probe-Infrastruktur und strengere Abuse-Kontrollen. Die erste Runtime meldet begrenztes TCP zuerst.',
        },
        {
          question: 'Ist TCP-Latenz dasselbe wie Ping?',
          answer: 'Nein. TCP misst einen Verbindungsversuch zu einem Dienstport; ICMP-Ping nutzt ein anderes Protokoll.',
        },
      ],
    },
  }),
]

const toolBySlug = new Map(toolCatalog.map((tool) => [tool.slug, tool]))

export function isToolSlug(value: string | undefined): value is ToolSlug {
  return toolSlugs.includes(value as ToolSlug)
}

export function getToolBySlug(value: string | undefined): ToolDefinition | null {
  if (!isToolSlug(value)) {
    return null
  }

  return toolBySlug.get(value) ?? null
}

export function getToolCopy(tool: ToolDefinition, locale: LocaleCode): ToolCopy {
  return sanitizePublicCopy(locale, tool.localized[locale] ?? tool.localized.en)
}

export function getCategoryLabel(category: ToolCategory, locale: LocaleCode): string {
  return localizedCategoryLabels[locale]?.[category] ?? categoryLabels[category]
}

export function filterTools(query: string, category: ToolCategory | 'all', locale: LocaleCode = 'en'): ToolDefinition[] {
  const normalizedQuery = query.trim().toLowerCase()

  return toolCatalog.filter((tool) => {
    const copy = getToolCopy(tool, locale)
    const matchesCategory = category === 'all' || tool.category === category
    const searchableText = [
      tool.shortName,
      tool.slug,
      getCategoryLabel(tool.category, locale),
      copy.freeScope,
      copy.upgradeScope,
      copy.title,
      copy.headline,
      copy.description,
      ...copy.contentSections.flatMap((section) => [section.heading, ...section.paragraphs]),
      ...copy.faq.flatMap((faq) => [faq.question, faq.answer]),
    ].join(' ').toLowerCase()

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery))
  })
}

export function createToolStructuredData(tool: ToolDefinition, locale: LocaleCode, url: string): Record<string, unknown>[] {
  const copy = getToolCopy(tool, locale)

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: copy.title,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      inLanguage: locale,
      url,
      description: copy.headline,
      isAccessibleForFree: true,
      dateModified: '2026-06-26',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        copy.freeScope,
        ...copy.methodology,
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: locale,
      mainEntity: copy.faq.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ]
}
