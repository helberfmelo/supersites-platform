import { buildTrustPageCopy, sanitizePublicCopy, type LocaleCode, type TrustSupportProfile } from './locales'

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

const trustProfile = {
  siteName: 'NetProbe Atlas',
  publicPath: '/supersites/netprobe-atlas/',
} satisfies TrustSupportProfile

function page(slug: ContentPageSlug, localized: Record<LocaleCode, ContentPageCopy>): ContentPage {
  return { slug, localized }
}

export const contentPageCatalog: ContentPage[] = [
  page('about', {
    en: {
      navLabel: 'About',
      title: 'About NetProbe Atlas',
      description: 'NetProbe Atlas is the SuperSites network diagnostics product for public IP, DNS, domain, SSL and reachability checks.',
      updatedLabel: 'Reviewed June 26, 2026',
      sections: [
        {
          heading: 'Free diagnostic focus',
          paragraphs: ['The basic lookup path works without mandatory signup. Paid features are reserved for monitoring, history, alerts, reports and API access.'],
        },
        {
          heading: 'What is live now',
          paragraphs: ['The public application runs point-in-time IP, DNS, RDAP, SSL, propagation, port and reachability checks through bounded SuperSites control-plane APIs. Monitoring, history and API workflows are separate from the free result.'],
        },
        {
          heading: 'Safety boundary',
          paragraphs: ['Network probes use input validation, private-range blocking, rate limits, timeouts, cache policy and abuse-aware limits before connecting to public targets.'],
        },
      ],
    },
    'pt-br': {
      navLabel: 'Sobre',
      title: 'Sobre o NetProbe Atlas',
      description: 'NetProbe Atlas é o produto SuperSites de diagnóstico de IP, DNS, domínio, SSL e alcance para alvos públicos.',
      updatedLabel: 'Revisado em 26 de junho de 2026',
      sections: [
        {
          heading: 'Foco do diagnóstico gratuito',
          paragraphs: ['O caminho básico de consulta funciona sem cadastro obrigatório. Recursos pagos ficam para monitoramento, histórico, alertas, relatórios e API.'],
        },
        {
          heading: 'O que já funciona',
          paragraphs: ['A aplicação pública executa consultas pontuais de IP, DNS, RDAP, SSL, propagação, porta e alcance por APIs limitadas do control-plane SuperSites. Monitoramento, histórico e API ficam separados do resultado gratuito.'],
        },
        {
          heading: 'Fronteira de segurança',
          paragraphs: ['Os probes usam validação de entrada, bloqueio de faixas privadas, rate limit, timeouts, cache e limites antiabuso antes de conectar a alvos públicos.'],
        },
      ],
    },
    es: {
      navLabel: 'Acerca de',
      title: 'Acerca de NetProbe Atlas',
      description: 'NetProbe Atlas es el producto SuperSites para diagnósticos públicos de IP, DNS, dominio, SSL y alcance.',
      updatedLabel: 'Revisado el 26 de junio de 2026',
      sections: [
        {
          heading: 'Foco del diagnóstico gratuito',
          paragraphs: ['La consulta básica funciona sin registro obligatorio. Las funciones pagas se reservan para monitoreo, historial, alertas, informes y API.'],
        },
        {
          heading: 'Qué está activo',
          paragraphs: ['La aplicación pública ejecuta consultas puntuales de IP, DNS, RDAP, SSL, propagación, puerto y alcance mediante APIs acotadas del control-plane SuperSites. Monitoreo, historial y API quedan separados del resultado gratuito.'],
        },
        {
          heading: 'Límite de seguridad',
          paragraphs: ['Los probes usan validación de entrada, bloqueo de rangos privados, rate limits, timeouts, caché y límites antiabuso antes de conectar a objetivos públicos.'],
        },
      ],
    },
    fr: {
      navLabel: 'À propos',
      title: 'À propos de NetProbe Atlas',
      description: 'NetProbe Atlas est le produit SuperSites pour diagnostics publics IP, DNS, domaine, SSL et accessibilité.',
      updatedLabel: 'Révisé le 26 juin 2026',
      sections: [
        {
          heading: 'Diagnostic gratuit',
          paragraphs: ['Le parcours de base fonctionne sans compte obligatoire. Les offres payantes couvrent surveillance, historique, alertes, rapports et API.'],
        },
        {
          heading: 'Ce qui est actif',
          paragraphs: ['L’application publique exécute des contrôles ponctuels IP, DNS, RDAP, SSL, propagation, port et accessibilité via des API bornées du control-plane SuperSites. Surveillance, historique et API restent séparés du résultat gratuit.'],
        },
        {
          heading: 'Cadre de sécurité',
          paragraphs: ['Les probes utilisent validation, blocage de plages privées, limites de débit, timeouts, cache et contrôles anti-abus avant toute connexion publique.'],
        },
      ],
    },
    de: {
      navLabel: 'Über',
      title: 'Über NetProbe Atlas',
      description: 'NetProbe Atlas ist das SuperSites-Produkt für öffentliche IP-, DNS-, Domain-, SSL- und Erreichbarkeitsdiagnosen.',
      updatedLabel: 'Geprüft am 26. Juni 2026',
      sections: [
        {
          heading: 'Kostenloser Diagnosefokus',
          paragraphs: ['Der Basis-Lookup funktioniert ohne Pflichtkonto. Bezahlfunktionen bleiben Monitoring, Verlauf, Alarmen, Berichten und API-Zugang vorbehalten.'],
        },
        {
          heading: 'Was bereits aktiv ist',
          paragraphs: ['Die oeffentliche Anwendung fuehrt punktuelle IP-, DNS-, RDAP-, SSL-, Propagation-, Port- und Erreichbarkeitspruefungen ueber begrenzte SuperSites-Control-Plane-APIs aus. Monitoring, Verlauf und API-Workflows sind vom kostenlosen Ergebnis getrennt.'],
        },
        {
          heading: 'Sicherheitsgrenze',
          paragraphs: ['Probes nutzen Eingabevalidierung, Blockade privater Bereiche, Rate Limits, Timeouts, Cache und Anti-Abuse-Grenzen vor öffentlichen Verbindungen.'],
        },
      ],
    },
  }),
  page('contact', {
    en: {
      navLabel: 'Contact',
      title: 'Contact NetProbe Atlas',
      description: 'How to reach the SuperSites operator about NetProbe feedback, corrections, privacy requests and security reports.',
      updatedLabel: 'Reviewed June 26, 2026',
      sections: [
        {
          heading: 'What to include',
          paragraphs: ['Include the page URL, language, observed behavior, expected result and browser or network context. Do not send passwords, tokens or sensitive personal data.'],
        },
        {
          heading: 'Security reports',
          paragraphs: ['Reports about SSRF, rate-limit bypass, private network access or data leakage should include enough detail to reproduce without harming third-party systems.'],
        },
        {
          heading: 'Public mailbox status',
          paragraphs: ['A monitored public mailbox is required before full launch. Until then, operational feedback remains inside the project owner workflow.'],
        },
      ],
    },
    'pt-br': {
      navLabel: 'Contato',
      title: 'Contato do NetProbe Atlas',
      description: 'Como falar com o operador SuperSites sobre feedback, correções, privacidade e segurança do NetProbe.',
      updatedLabel: 'Revisado em 26 de junho de 2026',
      sections: [
        {
          heading: 'O que enviar',
          paragraphs: ['Inclua URL, idioma, comportamento observado, resultado esperado e contexto de navegador ou rede. Não envie senhas, tokens ou dados pessoais sensíveis.'],
        },
        {
          heading: 'Relatos de segurança',
          paragraphs: ['Relatos de SSRF, bypass de rate limit, acesso a rede privada ou vazamento devem permitir reprodução sem prejudicar sistemas de terceiros.'],
        },
        {
          heading: 'Status do canal público',
          paragraphs: ['Uma caixa pública monitorada é necessária antes do lançamento completo. Até lá, feedback operacional segue no fluxo do proprietário do projeto.'],
        },
      ],
    },
    es: {
      navLabel: 'Contacto',
      title: 'Contacto de NetProbe Atlas',
      description: 'Cómo contactar al operador SuperSites sobre feedback, correcciones, privacidad y seguridad de NetProbe.',
      updatedLabel: 'Revisado el 26 de junio de 2026',
      sections: [
        {
          heading: 'Qué incluir',
          paragraphs: ['Incluye URL, idioma, comportamiento observado, resultado esperado y contexto de navegador o red. No envíes contraseñas, tokens o datos sensibles.'],
        },
        {
          heading: 'Reportes de seguridad',
          paragraphs: ['Reportes sobre SSRF, bypass de límites, acceso a redes privadas o filtración deben permitir reproducción sin dañar sistemas de terceros.'],
        },
        {
          heading: 'Estado del buzón público',
          paragraphs: ['Se requiere un buzón público monitoreado antes del lanzamiento completo. Hasta entonces, el feedback queda en el flujo del propietario.'],
        },
      ],
    },
    fr: {
      navLabel: 'Contact',
      title: 'Contacter NetProbe Atlas',
      description: 'Comment joindre l’opérateur SuperSites pour retours, corrections, confidentialité et sécurité NetProbe.',
      updatedLabel: 'Révisé le 26 juin 2026',
      sections: [
        {
          heading: 'À inclure',
          paragraphs: ['Indiquez URL, langue, comportement observé, résultat attendu et contexte navigateur ou réseau. N’envoyez pas mots de passe, tokens ou données sensibles.'],
        },
        {
          heading: 'Signalements sécurité',
          paragraphs: ['Les rapports SSRF, contournement de limites, accès réseau privé ou fuite doivent permettre reproduction sans nuire à des tiers.'],
        },
        {
          heading: 'Statut de la boîte publique',
          paragraphs: ['Une boîte publique surveillée est requise avant lancement complet. D’ici là, les retours restent dans le flux du propriétaire.'],
        },
      ],
    },
    de: {
      navLabel: 'Kontakt',
      title: 'Kontakt zu NetProbe Atlas',
      description: 'So erreichen Sie den SuperSites-Betreiber zu Feedback, Korrekturen, Datenschutz und Sicherheit von NetProbe.',
      updatedLabel: 'Geprüft am 26. Juni 2026',
      sections: [
        {
          heading: 'Was anzugeben ist',
          paragraphs: ['Nennen Sie URL, Sprache, beobachtetes Verhalten, erwartetes Ergebnis und Browser- oder Netzwerk-Kontext. Senden Sie keine Passwörter, Tokens oder sensiblen Daten.'],
        },
        {
          heading: 'Sicherheitsmeldungen',
          paragraphs: ['Meldungen zu SSRF, Rate-Limit-Bypass, privatem Netzwerkzugriff oder Datenabfluss sollen reproduzierbar sein, ohne Dritte zu schädigen.'],
        },
        {
          heading: 'Status des öffentlichen Postfachs',
          paragraphs: ['Ein überwachtes öffentliches Postfach ist vor dem vollständigen Launch erforderlich. Bis dahin bleibt Feedback im Betreiber-Workflow.'],
        },
      ],
    },
  }),
  page('privacy', {
    en: {
      navLabel: 'Privacy',
      title: 'Privacy Policy',
      description: 'NetProbe Atlas minimizes collection, avoids sensitive probe input in analytics and starts without accounts, ads or external integrations.',
      updatedLabel: 'Reviewed June 26, 2026',
      sections: [
        {
          heading: 'Data minimization',
          paragraphs: ['Point-in-time checks should collect only the input needed to answer the requested diagnostic and protect the service.'],
        },
        {
          heading: 'Analytics boundary',
          paragraphs: ['Analytics may record tool usage and safe surface names, but must not include IP addresses, private hostnames, query strings or raw probe results.'],
        },
        {
          heading: 'Retention',
          paragraphs: ['Unauthenticated checks should not create user history. Paid monitoring history and exports require clear retention rules before launch.'],
        },
      ],
    },
    'pt-br': {
      navLabel: 'Privacidade',
      title: 'Política de Privacidade',
      description: 'NetProbe Atlas minimiza coleta, evita entradas sensíveis em analytics e inicia sem contas, anúncios ou integrações externas.',
      updatedLabel: 'Revisado em 26 de junho de 2026',
      sections: [
        {
          heading: 'Minimização de dados',
          paragraphs: ['Consultas pontuais devem coletar apenas o necessário para responder ao diagnóstico solicitado e proteger o serviço.'],
        },
        {
          heading: 'Fronteira de analytics',
          paragraphs: ['Analytics pode registrar uso da ferramenta e nomes seguros, mas não IPs, hostnames privados, query strings ou resultados brutos.'],
        },
        {
          heading: 'Retenção',
          paragraphs: ['Consultas sem login não devem criar histórico de usuário. Histórico pago e exportações exigem regras claras antes do lançamento.'],
        },
      ],
    },
    es: {
      navLabel: 'Privacidad',
      title: 'Política de Privacidad',
      description: 'NetProbe Atlas minimiza recolección, evita entradas sensibles en analytics y comienza sin cuentas, anuncios o integraciones externas.',
      updatedLabel: 'Revisado el 26 de junio de 2026',
      sections: [
        {
          heading: 'Minimización de datos',
          paragraphs: ['Las consultas puntuales deben recolectar solo lo necesario para responder el diagnóstico y proteger el servicio.'],
        },
        {
          heading: 'Límite de analytics',
          paragraphs: ['Analytics puede registrar uso de herramienta y nombres seguros, pero no IPs, hostnames privados, query strings o resultados brutos.'],
        },
        {
          heading: 'Retención',
          paragraphs: ['Las consultas sin login no deben crear historial de usuario. Historial pago y exportaciones requieren reglas claras antes del lanzamiento.'],
        },
      ],
    },
    fr: {
      navLabel: 'Confidentialité',
      title: 'Politique de confidentialité',
      description: 'NetProbe Atlas minimise la collecte, évite les entrées sensibles en analytics et démarre sans comptes, pubs ou intégrations externes.',
      updatedLabel: 'Révisé le 26 juin 2026',
      sections: [
        {
          heading: 'Minimisation des données',
          paragraphs: ['Les contrôles ponctuels ne doivent collecter que ce qui est nécessaire au diagnostic demandé et à la protection du service.'],
        },
        {
          heading: 'Limite analytics',
          paragraphs: ['Analytics peut enregistrer l’usage d’outil et des noms sûrs, mais pas IPs, noms privés, query strings ou résultats bruts.'],
        },
        {
          heading: 'Rétention',
          paragraphs: ['Les contrôles sans compte ne doivent pas créer d’historique utilisateur. L’historique payant exige des règles de rétention avant lancement.'],
        },
      ],
    },
    de: {
      navLabel: 'Datenschutz',
      title: 'Datenschutzerklärung',
      description: 'NetProbe Atlas minimiert Erhebung, vermeidet sensible Probe-Eingaben in Analytics und startet ohne Konten, Anzeigen oder externe Integrationen.',
      updatedLabel: 'Geprüft am 26. Juni 2026',
      sections: [
        {
          heading: 'Datenminimierung',
          paragraphs: ['Punktuelle Prüfungen sollen nur Eingaben erfassen, die für Diagnose und Schutz des Dienstes nötig sind.'],
        },
        {
          heading: 'Analytics-Grenze',
          paragraphs: ['Analytics darf Tool-Nutzung und sichere Oberflächennamen erfassen, aber keine IPs, privaten Hostnamen, Query Strings oder Rohergebnisse.'],
        },
        {
          heading: 'Aufbewahrung',
          paragraphs: ['Nicht angemeldete Prüfungen sollen keinen Nutzerverlauf erzeugen. Bezahlter Verlauf benötigt klare Regeln vor dem Launch.'],
        },
      ],
    },
  }),
  page('cookies', {
    en: {
      navLabel: 'Cookies',
      title: 'Cookie Policy',
      description: 'How NetProbe Atlas uses essential storage, consent-aware analytics choices and advertising controls.',
      updatedLabel: 'Reviewed June 26, 2026',
      sections: [
        {
          heading: 'Essential storage',
          paragraphs: ['Essential cookies or local storage may keep language, consent, session security and basic preferences when those features are active.'],
        },
        {
          heading: 'Analytics and ads',
          paragraphs: ['Analytics and advertising storage follow consent mode, regional rules and page-level consent choices.'],
        },
        {
          heading: 'Changing choices',
          paragraphs: ['A consent interface must exist before analytics or advertising storage is used. Browser controls can also clear or block cookies.'],
        },
      ],
    },
    'pt-br': {
      navLabel: 'Cookies',
      title: 'Política de Cookies',
      description: 'Como o NetProbe Atlas usa armazenamento essencial, escolhas de analytics com consentimento e controles de publicidade.',
      updatedLabel: 'Revisado em 26 de junho de 2026',
      sections: [
        {
          heading: 'Armazenamento essencial',
          paragraphs: ['Cookies essenciais ou local storage podem guardar idioma, consentimento, segurança de sessão e preferências básicas quando ativos.'],
        },
        {
          heading: 'Analytics e anúncios',
          paragraphs: ['Analytics e armazenamento publicitario seguem consent mode, regras regionais e escolhas de consentimento por pagina.'],
        },
        {
          heading: 'Alterar escolhas',
          paragraphs: ['Uma interface de consentimento deve existir antes de analytics ou anúncios. O navegador também pode limpar ou bloquear cookies.'],
        },
      ],
    },
    es: {
      navLabel: 'Cookies',
      title: 'Política de Cookies',
      description: 'Cómo NetProbe Atlas usa almacenamiento esencial, opciones de analytics con consentimiento y controles de publicidad.',
      updatedLabel: 'Revisado el 26 de junio de 2026',
      sections: [
        {
          heading: 'Almacenamiento esencial',
          paragraphs: ['Cookies esenciales o local storage pueden guardar idioma, consentimiento, seguridad de sesión y preferencias básicas cuando estén activos.'],
        },
        {
          heading: 'Analytics y anuncios',
          paragraphs: ['Analytics y almacenamiento publicitario siguen consent mode, reglas regionales y elecciones de consentimiento por pagina.'],
        },
        {
          heading: 'Cambiar elecciones',
          paragraphs: ['Debe existir una interfaz de consentimiento antes de usar analytics o anuncios. El navegador también puede borrar o bloquear cookies.'],
        },
      ],
    },
    fr: {
      navLabel: 'Cookies',
      title: 'Politique cookies',
      description: 'Comment NetProbe Atlas utilise stockage essentiel, choix analytics avec consentement et controles publicitaires.',
      updatedLabel: 'Révisé le 26 juin 2026',
      sections: [
        {
          heading: 'Stockage essentiel',
          paragraphs: ['Cookies essentiels ou stockage local peuvent garder langue, consentement, sécurité de session et préférences quand ces fonctions sont actives.'],
        },
        {
          heading: 'Analytics et publicités',
          paragraphs: ['Analytics et stockage publicitaire suivent consent mode, regles regionales et choix de consentement par page.'],
        },
        {
          heading: 'Modifier les choix',
          paragraphs: ['Une interface de consentement doit exister avant analytics ou publicités. Le navigateur peut aussi effacer ou bloquer les cookies.'],
        },
      ],
    },
    de: {
      navLabel: 'Cookies',
      title: 'Cookie-Richtlinie',
      description: 'Wie NetProbe Atlas essenziellen Speicher, consent-bewusste Analytics-Auswahl und Anzeigenkontrollen nutzt.',
      updatedLabel: 'Geprüft am 26. Juni 2026',
      sections: [
        {
          heading: 'Essenzieller Speicher',
          paragraphs: ['Essenzielle Cookies oder Local Storage können Sprache, Consent, Sitzungssicherheit und Grundpräferenzen speichern, wenn aktiv.'],
        },
        {
          heading: 'Analytics und Anzeigen',
          paragraphs: ['Analytics- und Werbespeicher folgen Consent Mode, regionalen Regeln und den Zustimmungseinstellungen der Seite.'],
        },
        {
          heading: 'Auswahl ändern',
          paragraphs: ['Eine Consent-Oberfläche muss vor Analytics oder Anzeigen existieren. Browser können Cookies ebenfalls löschen oder blockieren.'],
        },
      ],
    },
  }),
  page('terms', {
    en: {
      navLabel: 'Terms',
      title: 'Terms of Use',
      description: 'Baseline terms for responsible use of NetProbe network diagnostics, result limitations and future paid upgrades.',
      updatedLabel: 'Reviewed June 26, 2026',
      sections: [
        {
          heading: 'Responsible testing',
          paragraphs: ['Do not use NetProbe Atlas to attack systems, scan without authorization, bypass limits, disrupt networks or collect data unlawfully.'],
        },
        {
          heading: 'Informational results',
          paragraphs: ['Results depend on resolver behavior, registry limits, network conditions, certificate configuration and inputs. They are signals, not guarantees.'],
        },
        {
          heading: 'Paid features',
          paragraphs: ['Monitoring and API workflows require visible pricing, quotas, cancellation rules and provider terms before checkout or account activation.'],
        },
      ],
    },
    'pt-br': {
      navLabel: 'Termos',
      title: 'Termos de Uso',
      description: 'Termos base para uso responsável dos diagnósticos NetProbe, limitações de resultado e upgrades futuros.',
      updatedLabel: 'Revisado em 26 de junho de 2026',
      sections: [
        {
          heading: 'Teste responsável',
          paragraphs: ['Não use o NetProbe Atlas para atacar sistemas, varrer sem autorização, burlar limites, interromper redes ou coletar dados ilegalmente.'],
        },
        {
          heading: 'Resultados informativos',
          paragraphs: ['Resultados dependem de resolvedores, limites de registry, rede, certificado e entradas. São sinais práticos, não garantias.'],
        },
        {
          heading: 'Recursos pagos',
          paragraphs: ['Monitoramento e API exigem preços, quotas, regras de cancelamento e termos de provedor visíveis antes de checkout ou ativação de conta.'],
        },
      ],
    },
    es: {
      navLabel: 'Términos',
      title: 'Términos de Uso',
      description: 'Términos base para uso responsable de diagnósticos NetProbe, límites de resultados y upgrades futuros.',
      updatedLabel: 'Revisado el 26 de junio de 2026',
      sections: [
        {
          heading: 'Pruebas responsables',
          paragraphs: ['No uses NetProbe Atlas para atacar sistemas, escanear sin autorización, evadir límites, interrumpir redes o recolectar datos ilegalmente.'],
        },
        {
          heading: 'Resultados informativos',
          paragraphs: ['Los resultados dependen de resolvers, límites de registry, red, certificados y entradas. Son señales, no garantías.'],
        },
        {
          heading: 'Funciones pagas',
          paragraphs: ['Monitoreo y API requieren precios, cuotas, reglas de cancelación y términos de proveedor visibles antes de checkout o activación de cuenta.'],
        },
      ],
    },
    fr: {
      navLabel: 'Conditions',
      title: 'Conditions d’utilisation',
      description: 'Conditions de base pour usage responsable des diagnostics NetProbe, limites de résultats et futures offres payantes.',
      updatedLabel: 'Révisé le 26 juin 2026',
      sections: [
        {
          heading: 'Tests responsables',
          paragraphs: ['N’utilisez pas NetProbe Atlas pour attaquer, scanner sans autorisation, contourner les limites, perturber des réseaux ou collecter illégalement.'],
        },
        {
          heading: 'Résultats informatifs',
          paragraphs: ['Les résultats dépendent des résolveurs, registres, conditions réseau, certificats et entrées. Ce sont des signaux, pas des garanties.'],
        },
        {
          heading: 'Fonctions payantes',
          paragraphs: ['Surveillance et API exigent prix, quotas, règles d’annulation et conditions fournisseur visibles avant checkout ou activation de compte.'],
        },
      ],
    },
    de: {
      navLabel: 'Nutzungsbedingungen',
      title: 'Nutzungsbedingungen',
      description: 'Basisbedingungen für verantwortliche NetProbe-Diagnosen, Ergebnisgrenzen und zukünftige Bezahlfunktionen.',
      updatedLabel: 'Geprüft am 26. Juni 2026',
      sections: [
        {
          heading: 'Verantwortliche Tests',
          paragraphs: ['Nutzen Sie NetProbe Atlas nicht für Angriffe, Scans ohne Autorisierung, Umgehung von Limits, Störungen oder unrechtmäßige Datenerhebung.'],
        },
        {
          heading: 'Informative Ergebnisse',
          paragraphs: ['Ergebnisse hängen von Resolvern, Registry-Limits, Netzwerk, Zertifikaten und Eingaben ab. Sie sind Signale, keine Garantien.'],
        },
        {
          heading: 'Bezahlfunktionen',
          paragraphs: ['Monitoring und API brauchen sichtbare Preise, Quoten, Kündigungsregeln und Anbieterbedingungen vor Checkout oder Kontoaktivierung.'],
        },
      ],
    },
  }),
  page('methodology', {
    en: {
      navLabel: 'Methodology',
      title: 'Methodology',
      description: 'How NetProbe explains IP, DNS, RDAP, SSL and reachability results with safety limits and transparent uncertainty.',
      updatedLabel: 'Reviewed June 26, 2026',
      sections: [
        {
          heading: 'Separate measurement from interpretation',
          paragraphs: ['Pages distinguish direct measurements, resolver answers, registry data, certificate facts, cached responses and estimates.'],
        },
        {
          heading: 'Explain failure modes',
          paragraphs: ['Timeouts, NXDOMAIN, empty records, registry throttling, blocked ICMP and certificate errors need separate messages.'],
        },
        {
          heading: 'Bounded probes',
          paragraphs: ['Network probes require hostname validation, DNS checks, private-range blocking, fixed timeouts, request limits and structured abuse signals.'],
        },
      ],
    },
    'pt-br': {
      navLabel: 'Metodologia',
      title: 'Metodologia',
      description: 'Como o NetProbe explica resultados de IP, DNS, RDAP, SSL e alcance com limites de segurança e incerteza transparente.',
      updatedLabel: 'Revisado em 26 de junho de 2026',
      sections: [
        {
          heading: 'Separar medição de interpretação',
          paragraphs: ['As páginas distinguem medições diretas, respostas de resolvedor, dados de registry, fatos de certificado, cache e estimativas.'],
        },
        {
          heading: 'Explicar modos de falha',
          paragraphs: ['Timeout, NXDOMAIN, registro vazio, rate limit de registry, ICMP bloqueado e erro de certificado precisam de mensagens próprias.'],
        },
        {
          heading: 'Probes limitados',
          paragraphs: ['Probes exigem validação de hostname, DNS, bloqueio de faixas privadas, timeouts fixos, limites de requisição e sinais antiabuso.'],
        },
      ],
    },
    es: {
      navLabel: 'Metodología',
      title: 'Metodología',
      description: 'Cómo NetProbe explica IP, DNS, RDAP, SSL y alcance con límites de seguridad e incertidumbre transparente.',
      updatedLabel: 'Revisado el 26 de junio de 2026',
      sections: [
        {
          heading: 'Separar medición e interpretación',
          paragraphs: ['Las páginas distinguen mediciones directas, respuestas de resolver, datos de registry, certificados, caché y estimaciones.'],
        },
        {
          heading: 'Explicar fallas',
          paragraphs: ['Timeouts, NXDOMAIN, registros vacíos, throttling de registry, ICMP bloqueado y errores de certificado requieren mensajes separados.'],
        },
        {
          heading: 'Probes acotados',
          paragraphs: ['Los probes requieren validación de hostname, DNS, bloqueo de rangos privados, timeouts fijos, límites y señales antiabuso.'],
        },
      ],
    },
    fr: {
      navLabel: 'Méthodologie',
      title: 'Méthodologie',
      description: 'Comment NetProbe explique IP, DNS, RDAP, SSL et accessibilité avec limites de sécurité et incertitude transparente.',
      updatedLabel: 'Révisé le 26 juin 2026',
      sections: [
        {
          heading: 'Séparer mesure et interprétation',
          paragraphs: ['Les pages distinguent mesures directes, réponses de résolveur, données registre, certificats, cache et estimations.'],
        },
        {
          heading: 'Expliquer les échecs',
          paragraphs: ['Timeouts, NXDOMAIN, réponses vides, limites registre, ICMP bloqué et erreurs certificat nécessitent des messages distincts.'],
        },
        {
          heading: 'Probes bornés',
          paragraphs: ['Les probes exigent validation de nom, DNS, blocage de plages privées, timeouts fixes, limites de requête et signaux anti-abus.'],
        },
      ],
    },
    de: {
      navLabel: 'Methodik',
      title: 'Methodik',
      description: 'Wie NetProbe IP-, DNS-, RDAP-, SSL- und Erreichbarkeitsergebnisse mit Sicherheitsgrenzen und transparenter Unsicherheit erklärt.',
      updatedLabel: 'Geprüft am 26. Juni 2026',
      sections: [
        {
          heading: 'Messung von Interpretation trennen',
          paragraphs: ['Seiten unterscheiden direkte Messungen, Resolver-Antworten, Registry-Daten, Zertifikatsfakten, Cache und Schätzungen.'],
        },
        {
          heading: 'Fehlermodi erklären',
          paragraphs: ['Timeouts, NXDOMAIN, leere Einträge, Registry-Limits, blockiertes ICMP und Zertifikatsfehler brauchen eigene Meldungen.'],
        },
        {
          heading: 'Begrenzte Probes',
          paragraphs: ['Probes brauchen Hostname-Validierung, DNS-Prüfung, private Bereichsblockade, feste Timeouts, Limits und Abuse-Signale.'],
        },
      ],
    },
  }),
  page('editorial-policy', {
    en: {
      navLabel: 'Editorial',
      title: 'Editorial Policy',
      description: 'Editorial rules for useful NetProbe pages, corrections, review dates and avoiding low-value mass network content.',
      updatedLabel: 'Reviewed June 26, 2026',
      sections: [
        {
          heading: 'Useful pages',
          paragraphs: ['Each tool page combines a working diagnostic, plain result interpretation, limitations, examples and next steps.'],
        },
        {
          heading: 'Corrections',
          paragraphs: ['Corrections are prioritized when a page gives misleading security, domain, DNS or certificate guidance.'],
        },
        {
          heading: 'Localization gate',
          paragraphs: ['Multilingual pages must keep meaning, examples and safety boundaries in each language before they are treated as launch-ready.'],
        },
      ],
    },
    'pt-br': {
      navLabel: 'Editorial',
      title: 'Política Editorial',
      description: 'Regras editoriais para páginas úteis do NetProbe, correções, datas de revisão e prevenção de conteúdo em massa sem valor.',
      updatedLabel: 'Revisado em 26 de junho de 2026',
      sections: [
        {
          heading: 'Páginas úteis',
          paragraphs: ['Cada página combina diagnóstico funcional, interpretação clara, limitações, exemplos e próximos passos.'],
        },
        {
          heading: 'Correções',
          paragraphs: ['Correções são priorizadas quando uma página dá orientação enganosa sobre segurança, domínio, DNS ou certificado.'],
        },
        {
          heading: 'Gate de localização',
          paragraphs: ['Páginas multilíngues precisam manter sentido, exemplos e limites de segurança em cada idioma antes do lançamento.'],
        },
      ],
    },
    es: {
      navLabel: 'Editorial',
      title: 'Política Editorial',
      description: 'Reglas editoriales para páginas útiles de NetProbe, correcciones, fechas de revisión y evitar contenido masivo sin valor.',
      updatedLabel: 'Revisado el 26 de junio de 2026',
      sections: [
        {
          heading: 'Páginas útiles',
          paragraphs: ['Cada página combina diagnóstico funcional, interpretación clara, limitaciones, ejemplos y próximos pasos.'],
        },
        {
          heading: 'Correcciones',
          paragraphs: ['Las correcciones se priorizan cuando una página da orientación engañosa sobre seguridad, dominio, DNS o certificado.'],
        },
        {
          heading: 'Gate de localización',
          paragraphs: ['Las páginas multilingües deben mantener significado, ejemplos y límites de seguridad en cada idioma antes del lanzamiento.'],
        },
      ],
    },
    fr: {
      navLabel: 'Éditorial',
      title: 'Politique éditoriale',
      description: 'Règles éditoriales pour pages NetProbe utiles, corrections, dates de révision et évitement du contenu massif sans valeur.',
      updatedLabel: 'Révisé le 26 juin 2026',
      sections: [
        {
          heading: 'Pages utiles',
          paragraphs: ['Chaque page combine diagnostic fonctionnel, interprétation claire, limites, exemples et prochaines étapes.'],
        },
        {
          heading: 'Corrections',
          paragraphs: ['Les corrections sont prioritaires si une page donne des conseils trompeurs sur sécurité, domaine, DNS ou certificat.'],
        },
        {
          heading: 'Gate de localisation',
          paragraphs: ['Les pages multilingues doivent garder sens, exemples et limites de sécurité dans chaque langue avant lancement.'],
        },
      ],
    },
    de: {
      navLabel: 'Redaktion',
      title: 'Redaktionelle Richtlinie',
      description: 'Redaktionelle Regeln für nützliche NetProbe-Seiten, Korrekturen, Prüfdatum und Vermeidung wertarmer Masseninhalte.',
      updatedLabel: 'Geprüft am 26. Juni 2026',
      sections: [
        {
          heading: 'Nützliche Seiten',
          paragraphs: ['Jede Toolseite kombiniert funktionierende Diagnose, klare Interpretation, Grenzen, Beispiele und nächste Schritte.'],
        },
        {
          heading: 'Korrekturen',
          paragraphs: ['Korrekturen haben Priorität, wenn eine Seite irreführende Hinweise zu Sicherheit, Domain, DNS oder Zertifikat gibt.'],
        },
        {
          heading: 'Lokalisierungs-Gate',
          paragraphs: ['Mehrsprachige Seiten müssen Bedeutung, Beispiele und Sicherheitsgrenzen in jeder Sprache vor dem Launch bewahren.'],
        },
      ],
    },
  }),
  page('status', {
    en: {
      navLabel: 'Status',
      title: 'Public Status',
      description: 'Current public availability summary for NetProbe Atlas web tools, diagnostics and account features.',
      updatedLabel: 'Reviewed June 26, 2026',
      sections: [
        {
          heading: 'Public web',
          paragraphs: ['The NetProbe Atlas public site is available over HTTPS with localized tool pages, canonical URLs, a sitemap and practical diagnostic workflows.'],
        },
        {
          heading: 'Lookup API',
          paragraphs: ['IP, DNS, RDAP, SSL, propagation, port and reachability tools return point-in-time answers from controlled request paths. Regional probes are disclosed separately when they are available.'],
        },
        {
          heading: 'Advanced features',
          paragraphs: ['The free checks answer immediate questions without mandatory signup. Larger workflows such as saved history, alerts, reports, API access and regional monitoring are separate account features.'],
        },
      ],
    },
    'pt-br': {
      navLabel: 'Status',
      title: 'Status publico',
      description: 'Resumo atual de disponibilidade publica das ferramentas web, diagnosticos e recursos de conta do NetProbe Atlas.',
      updatedLabel: 'Revisado em 26 de junho de 2026',
      sections: [
        {
          heading: 'Web publica',
          paragraphs: ['O site publico do NetProbe Atlas esta disponivel em HTTPS, com paginas localizadas, canonical, sitemap e fluxos praticos de diagnostico.'],
        },
        {
          heading: 'API de consultas',
          paragraphs: ['Ferramentas de IP, DNS, RDAP, SSL, propagacao, porta e alcance retornam respostas pontuais por caminhos controlados. Probes regionais sao declarados separadamente quando estiverem disponiveis.'],
        },
        {
          heading: 'Recursos avancados',
          paragraphs: ['As consultas gratuitas respondem perguntas imediatas sem cadastro obrigatorio. Fluxos maiores como historico salvo, alertas, relatorios, API e monitoramento regional sao recursos separados de conta.'],
        },
      ],
    },
    es: {
      navLabel: 'Estado',
      title: 'Estado publico',
      description: 'Resumen actual de disponibilidad publica de herramientas web, diagnosticos y funciones de cuenta de NetProbe Atlas.',
      updatedLabel: 'Revisado el 26 de junio de 2026',
      sections: [
        {
          heading: 'Web publica',
          paragraphs: ['El sitio publico de NetProbe Atlas esta disponible con HTTPS, paginas localizadas, canonical, sitemap y flujos practicos de diagnostico.'],
        },
        {
          heading: 'API de consultas',
          paragraphs: ['Las herramientas de IP, DNS, RDAP, SSL, propagacion, puerto y alcance devuelven respuestas puntuales desde rutas controladas. Los probes regionales se declaran por separado cuando estan disponibles.'],
        },
        {
          heading: 'Funciones avanzadas',
          paragraphs: ['Las consultas gratuitas responden preguntas inmediatas sin registro obligatorio. Flujos mayores como historial, alertas, reportes, API y monitoreo regional son funciones separadas de cuenta.'],
        },
      ],
    },
    fr: {
      navLabel: 'Statut',
      title: 'Statut public',
      description: 'Resume de disponibilite publique des outils web, diagnostics et fonctions de compte NetProbe Atlas.',
      updatedLabel: 'Revise le 26 juin 2026',
      sections: [
        {
          heading: 'Web public',
          paragraphs: ['Le site public NetProbe Atlas est disponible en HTTPS, avec pages localisees, canonical, sitemap et workflows de diagnostic pratiques.'],
        },
        {
          heading: 'API de controles',
          paragraphs: ['Les outils IP, DNS, RDAP, SSL, propagation, port et accessibilite retournent des reponses ponctuelles depuis des chemins controles. Les probes regionaux sont annonces separement lorsqu ils sont disponibles.'],
        },
        {
          heading: 'Fonctions avancees',
          paragraphs: ['Les controles gratuits repondent aux questions immediates sans compte obligatoire. Les workflows plus larges comme historique, alertes, rapports, API et surveillance regionale sont des fonctions separees de compte.'],
        },
      ],
    },
    de: {
      navLabel: 'Status',
      title: 'Oeffentlicher Status',
      description: 'Aktuelle oeffentliche Verfuegbarkeit der NetProbe Atlas Web-Tools, Diagnosen und Konto-Funktionen.',
      updatedLabel: 'Geprueft am 26. Juni 2026',
      sections: [
        {
          heading: 'Public Web',
          paragraphs: ['Die oeffentliche NetProbe Atlas Site ist per HTTPS verfuegbar, mit lokalisierten Tool-Seiten, Canonical URLs, Sitemap und praktischen Diagnose-Workflows.'],
        },
        {
          heading: 'Lookup API',
          paragraphs: ['IP-, DNS-, RDAP-, SSL-, Propagation-, Port- und Erreichbarkeitstools liefern punktuelle Antworten aus kontrollierten Anfragepfaden. Regionale Probes werden separat beschrieben, sobald sie verfuegbar sind.'],
        },
        {
          heading: 'Erweiterte Funktionen',
          paragraphs: ['Die kostenlosen Pruefungen beantworten direkte Fragen ohne Pflichtkonto. Groessere Workflows wie Verlauf, Alerts, Reports, API-Zugriff und regionales Monitoring sind separate Konto-Funktionen.'],
        },
      ],
    },
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
  return buildTrustPageCopy(locale, page.slug, sanitizePublicCopy(locale, page.localized[locale]), trustProfile)
}
