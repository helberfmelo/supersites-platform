import type { LocaleCode } from './locales'

export const legalPageSlugs = [
  'about',
  'contact',
  'privacy',
  'cookies',
  'terms',
  'methodology',
  'editorial-policy',
  'status',
] as const

export type LegalPageSlug = (typeof legalPageSlugs)[number]

export interface LegalSection {
  heading: string
  paragraphs: string[]
}

export interface LocalizedLegalPage {
  navLabel: string
  title: string
  description: string
  updatedLabel: string
  sections: LegalSection[]
}

export interface LegalPage {
  slug: LegalPageSlug
  localized: Record<LocaleCode, LocalizedLegalPage>
}

export const legalShellCopy: Record<LocaleCode, {
  breadcrumbHome: string
  pageStatusLabel: string
  launchGateTitle: string
  launchGateBody: string
  relatedTitle: string
}> = {
  en: {
    breadcrumbHome: 'Catalog',
    pageStatusLabel: 'Page status',
    launchGateTitle: 'Launch gate',
    launchGateBody: 'Human legal review remains required before final public launch.',
    relatedTitle: 'Related pages',
  },
  'pt-br': {
    breadcrumbHome: 'Catálogo',
    pageStatusLabel: 'Status da página',
    launchGateTitle: 'Gate de lançamento',
    launchGateBody: 'Revisão jurídica humana continua obrigatória antes do lançamento público final.',
    relatedTitle: 'Páginas relacionadas',
  },
  es: {
    breadcrumbHome: 'Catálogo',
    pageStatusLabel: 'Estado de la página',
    launchGateTitle: 'Gate de lanzamiento',
    launchGateBody: 'La revisión legal humana sigue siendo obligatoria antes del lanzamiento público final.',
    relatedTitle: 'Páginas relacionadas',
  },
  fr: {
    breadcrumbHome: 'Catalogue',
    pageStatusLabel: 'Statut de la page',
    launchGateTitle: 'Gate de lancement',
    launchGateBody: 'Une révision juridique humaine reste obligatoire avant le lancement public final.',
    relatedTitle: 'Pages liées',
  },
  de: {
    breadcrumbHome: 'Katalog',
    pageStatusLabel: 'Seitenstatus',
    launchGateTitle: 'Launch Gate',
    launchGateBody: 'Eine menschliche Rechtsprüfung bleibt vor dem finalen öffentlichen Launch erforderlich.',
    relatedTitle: 'Verwandte Seiten',
  },
}

export const legalPageCatalog: LegalPage[] = [
  {
    slug: 'about',
    localized: {
      en: {
        navLabel: 'About',
        title: 'About SuperSites',
        description: 'SuperSites is a planned network of practical web tools built around useful free access, clear upgrade value and careful launch gates.',
        updatedLabel: 'Reviewed June 26, 2026',
        sections: [
          {
            heading: 'What the network is for',
            paragraphs: [
              'SuperSites Hub catalogs a portfolio of utility sites for network diagnostics, calculators, developer tools, time conversion, QR workflows, invoices, email health, site checks, image work and documents.',
            ],
          },
          {
            heading: 'How sites launch',
            paragraphs: [
              'Each site starts with a working name and a documented quality gate. A site is not treated as launch-ready until its free tool, original guidance, privacy controls, monitoring, backup and rollback are validated.',
            ],
          },
          {
            heading: 'Free first',
            paragraphs: [
              'The basic task that brought a visitor to a tool should work without mandatory signup. Paid plans are reserved for extra volume, history, automation, collaboration, API access, branding or an ad-free experience.',
            ],
          },
        ],
      },
      'pt-br': {
        navLabel: 'Sobre',
        title: 'Sobre o SuperSites',
        description: 'SuperSites é uma rede planejada de ferramentas web práticas, com acesso gratuito útil, upgrades claros e gates de lançamento cuidadosos.',
        updatedLabel: 'Revisado em 26 de junho de 2026',
        sections: [
          {
            heading: 'Para que a rede existe',
            paragraphs: [
              'O SuperSites Hub cataloga um portfólio de sites úteis para diagnóstico de rede, calculadoras, ferramentas de desenvolvimento, tempo, QR, faturas, saúde de e-mail, checagens web, imagem e documentos.',
            ],
          },
          {
            heading: 'Como os sites são lançados',
            paragraphs: [
              'Cada site começa com um nome de trabalho e um gate de qualidade documentado. Um site só é tratado como pronto quando ferramenta gratuita, orientação original, privacidade, monitoramento, backup e rollback forem validados.',
            ],
          },
          {
            heading: 'Gratuito primeiro',
            paragraphs: [
              'A tarefa básica que trouxe a pessoa até a ferramenta deve funcionar sem cadastro obrigatório. Planos pagos ficam para volume, histórico, automação, colaboração, API, marca própria ou experiência sem anúncios.',
            ],
          },
        ],
      },
      es: {
        navLabel: 'Acerca de',
        title: 'Acerca de SuperSites',
        description: 'SuperSites es una red planificada de herramientas web prácticas con acceso gratuito útil, upgrades claros y controles de lanzamiento.',
        updatedLabel: 'Revisado el 26 de junio de 2026',
        sections: [
          {
            heading: 'Para qué existe la red',
            paragraphs: [
              'SuperSites Hub cataloga sitios de utilidad para diagnósticos de red, calculadoras, herramientas de desarrollo, tiempo, QR, facturas, salud de correo, revisiones web, imagen y documentos.',
            ],
          },
          {
            heading: 'Cómo se lanzan los sitios',
            paragraphs: [
              'Cada sitio empieza con un nombre de trabajo y un gate de calidad documentado. No se considera listo hasta validar la herramienta gratuita, contenido original, privacidad, monitoreo, backup y rollback.',
            ],
          },
          {
            heading: 'Gratis primero',
            paragraphs: [
              'La tarea básica que trae a una persona debe funcionar sin registro obligatorio. Los planes pagos agregan volumen, historial, automatización, colaboración, API, marca propia o una experiencia sin anuncios.',
            ],
          },
        ],
      },
      fr: {
        navLabel: 'À propos',
        title: 'À propos de SuperSites',
        description: 'SuperSites est un réseau prévu d’outils web pratiques avec accès gratuit utile, offres payantes claires et gates de lancement.',
        updatedLabel: 'Révisé le 26 juin 2026',
        sections: [
          {
            heading: 'Pourquoi le réseau existe',
            paragraphs: [
              'SuperSites Hub catalogue des sites utiles pour diagnostic réseau, calculateurs, outils développeur, temps, QR, factures, santé e-mail, contrôles web, image et documents.',
            ],
          },
          {
            heading: 'Comment les sites sont lancés',
            paragraphs: [
              'Chaque site commence avec un nom de travail et un gate qualité documenté. Il n’est prêt qu’après validation de l’outil gratuit, du contenu original, de la confidentialité, de la surveillance, du backup et du rollback.',
            ],
          },
          {
            heading: 'Le gratuit d’abord',
            paragraphs: [
              'La tâche de base qui amène une personne vers un outil doit fonctionner sans compte obligatoire. Les offres payantes ajoutent volume, historique, automatisation, collaboration, API, marque propre ou absence de publicité.',
            ],
          },
        ],
      },
      de: {
        navLabel: 'Über uns',
        title: 'Über SuperSites',
        description: 'SuperSites ist ein geplantes Netzwerk praktischer Web-Tools mit nützlichem Gratiszugang, klarem Upgrade-Wert und Launch-Gates.',
        updatedLabel: 'Geprüft am 26. Juni 2026',
        sections: [
          {
            heading: 'Wofür das Netzwerk gedacht ist',
            paragraphs: [
              'SuperSites Hub katalogisiert Utility-Sites für Netzwerkdiagnose, Rechner, Entwicklerwerkzeuge, Zeit, QR, Rechnungen, E-Mail-Gesundheit, Website-Checks, Bilder und Dokumente.',
            ],
          },
          {
            heading: 'Wie Sites starten',
            paragraphs: [
              'Jede Site beginnt mit einem Arbeitsnamen und einem dokumentierten Quality Gate. Startbereit ist sie erst nach validiertem Gratis-Tool, Originalinhalt, Datenschutz, Monitoring, Backup und Rollback.',
            ],
          },
          {
            heading: 'Kostenlos zuerst',
            paragraphs: [
              'Die grundlegende Aufgabe muss ohne Pflichtkonto funktionieren. Bezahlte Pläne liefern zusätzliches Volumen, Historie, Automatisierung, Zusammenarbeit, API, Branding oder eine werbefreie Nutzung.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'contact',
    localized: {
      en: {
        navLabel: 'Contact',
        title: 'Contact SuperSites',
        description: 'How to reach the SuperSites operator about product feedback, privacy requests, security reports and editorial corrections during the launch phase.',
        updatedLabel: 'Reviewed June 26, 2026',
        sections: [
          {
            heading: 'What to send',
            paragraphs: [
              'Send the site name, page URL, language, what happened and the expected result. Do not include passwords, API keys, payment data, private documents or sensitive personal data.',
            ],
          },
          {
            heading: 'Supported topics',
            paragraphs: [
              'The contact workflow covers product feedback, accessibility issues, privacy requests, security reports, broken links, translation problems and editorial corrections.',
            ],
          },
          {
            heading: 'Public mailbox status',
            paragraphs: [
              'A monitored public mailbox will be published before the first public launch. Until then, operational requests remain inside the project owner workflow and no sensitive data should be submitted through unfinished forms.',
            ],
          },
        ],
      },
      'pt-br': {
        navLabel: 'Contato',
        title: 'Contato SuperSites',
        description: 'Como falar com a operação do SuperSites sobre produto, privacidade, segurança e correções editoriais durante a fase de lançamento.',
        updatedLabel: 'Revisado em 26 de junho de 2026',
        sections: [
          {
            heading: 'O que enviar',
            paragraphs: [
              'Informe nome do site, URL da página, idioma, o que aconteceu e o resultado esperado. Não envie senhas, chaves de API, dados de pagamento, documentos privados ou dados pessoais sensíveis.',
            ],
          },
          {
            heading: 'Temas aceitos',
            paragraphs: [
              'O fluxo de contato cobre feedback de produto, acessibilidade, privacidade, segurança, links quebrados, tradução e correções editoriais.',
            ],
          },
          {
            heading: 'Status do e-mail público',
            paragraphs: [
              'Uma caixa pública monitorada será publicada antes do primeiro lançamento. Até lá, solicitações operacionais ficam no fluxo do proprietário do projeto e dados sensíveis não devem ser enviados por formulários inacabados.',
            ],
          },
        ],
      },
      es: {
        navLabel: 'Contacto',
        title: 'Contacto de SuperSites',
        description: 'Cómo contactar al operador de SuperSites sobre producto, privacidad, seguridad y correcciones editoriales durante la fase de lanzamiento.',
        updatedLabel: 'Revisado el 26 de junio de 2026',
        sections: [
          {
            heading: 'Qué enviar',
            paragraphs: [
              'Incluye el sitio, URL, idioma, qué ocurrió y el resultado esperado. No envíes contraseñas, claves API, datos de pago, documentos privados ni datos personales sensibles.',
            ],
          },
          {
            heading: 'Temas cubiertos',
            paragraphs: [
              'El flujo de contacto cubre producto, accesibilidad, privacidad, seguridad, enlaces rotos, traducción y correcciones editoriales.',
            ],
          },
          {
            heading: 'Estado del buzón público',
            paragraphs: [
              'Se publicará un buzón monitoreado antes del primer lanzamiento público. Hasta entonces, las solicitudes operativas permanecen en el flujo del propietario y no deben enviarse datos sensibles por formularios sin finalizar.',
            ],
          },
        ],
      },
      fr: {
        navLabel: 'Contact',
        title: 'Contacter SuperSites',
        description: 'Comment joindre l’opérateur SuperSites pour produit, confidentialité, sécurité et corrections éditoriales pendant la phase de lancement.',
        updatedLabel: 'Révisé le 26 juin 2026',
        sections: [
          {
            heading: 'Quoi envoyer',
            paragraphs: [
              'Indiquez le site, l’URL, la langue, ce qui s’est passé et le résultat attendu. N’envoyez pas de mots de passe, clés API, données de paiement, documents privés ou données sensibles.',
            ],
          },
          {
            heading: 'Sujets pris en charge',
            paragraphs: [
              'Le flux de contact couvre produit, accessibilité, confidentialité, sécurité, liens cassés, traduction et corrections éditoriales.',
            ],
          },
          {
            heading: 'Statut de la boîte publique',
            paragraphs: [
              'Une boîte publique surveillée sera publiée avant le premier lancement. D’ici là, les demandes opérationnelles restent dans le flux du propriétaire et aucune donnée sensible ne doit passer par des formulaires inachevés.',
            ],
          },
        ],
      },
      de: {
        navLabel: 'Kontakt',
        title: 'SuperSites kontaktieren',
        description: 'Kontaktwege für Produktfeedback, Datenschutzanfragen, Sicherheitsberichte und redaktionelle Korrekturen während der Launch-Phase.',
        updatedLabel: 'Geprüft am 26. Juni 2026',
        sections: [
          {
            heading: 'Was gesendet werden sollte',
            paragraphs: [
              'Nennen Sie Site, URL, Sprache, beobachtetes Verhalten und erwartetes Ergebnis. Senden Sie keine Passwörter, API-Schlüssel, Zahlungsdaten, privaten Dokumente oder sensiblen Personendaten.',
            ],
          },
          {
            heading: 'Unterstützte Themen',
            paragraphs: [
              'Der Kontaktprozess deckt Produktfeedback, Barrierefreiheit, Datenschutz, Sicherheit, defekte Links, Übersetzung und redaktionelle Korrekturen ab.',
            ],
          },
          {
            heading: 'Status der öffentlichen Mailbox',
            paragraphs: [
              'Eine überwachte öffentliche Mailbox wird vor dem ersten Launch veröffentlicht. Bis dahin bleiben operative Anfragen im Workflow des Projektinhabers und sensible Daten gehören nicht in unfertige Formulare.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'privacy',
    localized: {
      en: {
        navLabel: 'Privacy',
        title: 'Privacy Policy',
        description: 'The SuperSites privacy approach minimizes collection, prefers browser-side processing and blocks personal data from analytics and advertising events.',
        updatedLabel: 'Reviewed June 26, 2026',
        sections: [
          {
            heading: 'Data minimization',
            paragraphs: [
              'SuperSites should collect only what is needed to deliver the requested tool, protect the service, operate accounts or support paid features. Tool inputs are not used for training without explicit opt-in.',
            ],
          },
          {
            heading: 'Tool inputs and analytics',
            paragraphs: [
              'Developer text, uploaded files and private business content should stay in the browser when possible. Analytics events must not include email, phone, full name, full IP address, document content or file content.',
            ],
          },
          {
            heading: 'Retention and rights',
            paragraphs: [
              'Temporary files should be deleted automatically and paid history should be retained only as described by the relevant product terms. Access, export, correction and deletion workflows must exist before paid accounts launch.',
            ],
          },
        ],
      },
      'pt-br': {
        navLabel: 'Privacidade',
        title: 'Política de Privacidade',
        description: 'A abordagem de privacidade do SuperSites minimiza coleta, prefere processamento no navegador e bloqueia dados pessoais em analytics e anúncios.',
        updatedLabel: 'Revisado em 26 de junho de 2026',
        sections: [
          {
            heading: 'Minimização de dados',
            paragraphs: [
              'O SuperSites deve coletar apenas o necessário para entregar a ferramenta solicitada, proteger o serviço, operar contas ou viabilizar recursos pagos. Entradas de ferramentas não serão usadas para treinamento sem opt-in explícito.',
            ],
          },
          {
            heading: 'Entradas e analytics',
            paragraphs: [
              'Textos de ferramentas dev, arquivos enviados e conteúdo empresarial privado devem ficar no navegador quando possível. Eventos de analytics não podem incluir e-mail, telefone, nome completo, IP completo, conteúdo de documento ou arquivo.',
            ],
          },
          {
            heading: 'Retenção e direitos',
            paragraphs: [
              'Arquivos temporários devem ser apagados automaticamente e histórico pago deve seguir os termos do produto. Fluxos de acesso, exportação, correção e exclusão precisam existir antes de contas pagas em produção.',
            ],
          },
        ],
      },
      es: {
        navLabel: 'Privacidad',
        title: 'Política de Privacidad',
        description: 'La privacidad en SuperSites minimiza la recolección, favorece el procesamiento en el navegador y bloquea datos personales en analytics y anuncios.',
        updatedLabel: 'Revisado el 26 de junio de 2026',
        sections: [
          {
            heading: 'Minimización de datos',
            paragraphs: [
              'SuperSites debe recopilar solo lo necesario para entregar la herramienta, proteger el servicio, operar cuentas o habilitar funciones pagas. Las entradas no se usan para entrenamiento sin opt-in explícito.',
            ],
          },
          {
            heading: 'Entradas y analytics',
            paragraphs: [
              'Texto de herramientas dev, archivos y contenido privado deben quedarse en el navegador cuando sea posible. Los eventos no deben incluir email, teléfono, nombre completo, IP completa, documentos ni contenido de archivos.',
            ],
          },
          {
            heading: 'Retención y derechos',
            paragraphs: [
              'Los archivos temporales deben borrarse automáticamente y el historial pago debe seguir los términos del producto. Acceso, exportación, corrección y eliminación deben existir antes de cuentas pagas en producción.',
            ],
          },
        ],
      },
      fr: {
        navLabel: 'Confidentialité',
        title: 'Politique de confidentialité',
        description: 'L’approche SuperSites limite la collecte, préfère le traitement dans le navigateur et bloque les données personnelles dans analytics et publicité.',
        updatedLabel: 'Révisé le 26 juin 2026',
        sections: [
          {
            heading: 'Minimisation des données',
            paragraphs: [
              'SuperSites doit collecter seulement ce qui est nécessaire pour fournir l’outil, protéger le service, gérer les comptes ou activer des fonctions payantes. Les entrées ne servent pas à l’entraînement sans opt-in explicite.',
            ],
          },
          {
            heading: 'Entrées et analytics',
            paragraphs: [
              'Textes développeur, fichiers et contenus privés doivent rester dans le navigateur quand c’est possible. Les événements ne doivent pas inclure e-mail, téléphone, nom complet, IP complète, documents ou contenu de fichier.',
            ],
          },
          {
            heading: 'Rétention et droits',
            paragraphs: [
              'Les fichiers temporaires doivent être supprimés automatiquement et l’historique payant suivre les termes du produit. Accès, export, correction et suppression doivent exister avant les comptes payants en production.',
            ],
          },
        ],
      },
      de: {
        navLabel: 'Datenschutz',
        title: 'Datenschutzerklärung',
        description: 'SuperSites minimiert Datenerhebung, bevorzugt Verarbeitung im Browser und hält personenbezogene Daten aus Analytics- und Werbeereignissen heraus.',
        updatedLabel: 'Geprüft am 26. Juni 2026',
        sections: [
          {
            heading: 'Datenminimierung',
            paragraphs: [
              'SuperSites soll nur erfassen, was für das angefragte Tool, den Schutz des Dienstes, Konten oder bezahlte Funktionen nötig ist. Tool-Eingaben werden ohne ausdrückliches Opt-in nicht für Training genutzt.',
            ],
          },
          {
            heading: 'Eingaben und Analytics',
            paragraphs: [
              'Entwicklertexte, Dateien und private Inhalte sollen möglichst im Browser bleiben. Analytics-Ereignisse dürfen keine E-Mail, Telefonnummer, vollständigen Namen, vollständige IP, Dokumente oder Dateiinhalte enthalten.',
            ],
          },
          {
            heading: 'Aufbewahrung und Rechte',
            paragraphs: [
              'Temporäre Dateien sollen automatisch gelöscht werden; bezahlte Historie folgt den Produktbedingungen. Zugriff, Export, Berichtigung und Löschung müssen vor bezahlten Produktionskonten bereitstehen.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'cookies',
    localized: {
      en: {
        navLabel: 'Cookies',
        title: 'Cookie Policy',
        description: 'How SuperSites plans to use essential cookies, analytics storage, advertising storage and consent controls across the catalog and tools.',
        updatedLabel: 'Reviewed June 26, 2026',
        sections: [
          {
            heading: 'Essential storage',
            paragraphs: [
              'Essential cookies or local storage may remember language, consent choices, session security and basic preferences needed for the service to work.',
            ],
          },
          {
            heading: 'Analytics and ads',
            paragraphs: [
              'Analytics and advertising storage must wait for the proper consent mode and regional rules. Advertising placements should not appear until each site has passed quality and policy checks.',
            ],
          },
          {
            heading: 'Managing choices',
            paragraphs: [
              'A consent interface must allow supported regions to change choices before analytics or ads run. Browser settings can also delete or block cookies, but some preferences may reset.',
            ],
          },
        ],
      },
      'pt-br': {
        navLabel: 'Cookies',
        title: 'Política de Cookies',
        description: 'Como o SuperSites planeja usar cookies essenciais, analytics, publicidade e controles de consentimento no catálogo e nas ferramentas.',
        updatedLabel: 'Revisado em 26 de junho de 2026',
        sections: [
          {
            heading: 'Armazenamento essencial',
            paragraphs: [
              'Cookies essenciais ou armazenamento local podem guardar idioma, consentimento, segurança de sessão e preferências básicas necessárias para o serviço funcionar.',
            ],
          },
          {
            heading: 'Analytics e anúncios',
            paragraphs: [
              'Analytics e publicidade dependem de consent mode e regras regionais. Anúncios só devem aparecer quando cada site passar pelos checks de qualidade e política.',
            ],
          },
          {
            heading: 'Gerenciar escolhas',
            paragraphs: [
              'Uma interface de consentimento deve permitir mudar escolhas em regiões suportadas antes de analytics ou anúncios rodarem. O navegador também pode apagar ou bloquear cookies, mas preferências podem reiniciar.',
            ],
          },
        ],
      },
      es: {
        navLabel: 'Cookies',
        title: 'Política de Cookies',
        description: 'Cómo SuperSites planea usar cookies esenciales, analytics, publicidad y controles de consentimiento en el catálogo y las herramientas.',
        updatedLabel: 'Revisado el 26 de junio de 2026',
        sections: [
          {
            heading: 'Almacenamiento esencial',
            paragraphs: [
              'Cookies esenciales o almacenamiento local pueden recordar idioma, consentimiento, seguridad de sesión y preferencias básicas necesarias para el servicio.',
            ],
          },
          {
            heading: 'Analytics y anuncios',
            paragraphs: [
              'Analytics y publicidad deben esperar consent mode y reglas regionales. Los anuncios solo aparecen cuando cada sitio pasa los controles de calidad y política.',
            ],
          },
          {
            heading: 'Gestionar opciones',
            paragraphs: [
              'Una interfaz de consentimiento debe permitir cambiar opciones antes de analytics o anuncios. El navegador también puede borrar o bloquear cookies, aunque algunas preferencias se reinicien.',
            ],
          },
        ],
      },
      fr: {
        navLabel: 'Cookies',
        title: 'Politique de cookies',
        description: 'Comment SuperSites prévoit d’utiliser cookies essentiels, analytics, publicité et contrôles de consentement dans le catalogue et les outils.',
        updatedLabel: 'Révisé le 26 juin 2026',
        sections: [
          {
            heading: 'Stockage essentiel',
            paragraphs: [
              'Des cookies essentiels ou le stockage local peuvent mémoriser langue, consentement, sécurité de session et préférences nécessaires au fonctionnement.',
            ],
          },
          {
            heading: 'Analytics et publicité',
            paragraphs: [
              'Analytics et publicité doivent attendre le consent mode et les règles régionales. Les annonces n’apparaissent qu’après les contrôles qualité et politiques de chaque site.',
            ],
          },
          {
            heading: 'Gérer les choix',
            paragraphs: [
              'Une interface de consentement doit permettre de modifier les choix avant analytics ou publicités. Le navigateur peut aussi supprimer ou bloquer les cookies, mais certaines préférences peuvent être réinitialisées.',
            ],
          },
        ],
      },
      de: {
        navLabel: 'Cookies',
        title: 'Cookie-Richtlinie',
        description: 'Wie SuperSites essenzielle Cookies, Analytics-Speicher, Werbespeicher und Einwilligungskontrollen im Katalog und in Tools einsetzen soll.',
        updatedLabel: 'Geprüft am 26. Juni 2026',
        sections: [
          {
            heading: 'Essenzielle Speicherung',
            paragraphs: [
              'Essenzielle Cookies oder lokaler Speicher können Sprache, Einwilligung, Sitzungssicherheit und grundlegende Einstellungen speichern, damit der Dienst funktioniert.',
            ],
          },
          {
            heading: 'Analytics und Werbung',
            paragraphs: [
              'Analytics- und Werbespeicher warten auf Consent Mode und regionale Regeln. Anzeigen erscheinen erst nach Qualitäts- und Policy-Prüfungen der jeweiligen Site.',
            ],
          },
          {
            heading: 'Auswahl verwalten',
            paragraphs: [
              'Eine Einwilligungsoberfläche muss Änderungen erlauben, bevor Analytics oder Werbung laufen. Browser können Cookies löschen oder blockieren, wodurch manche Einstellungen zurückgesetzt werden.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'terms',
    localized: {
      en: {
        navLabel: 'Terms',
        title: 'Terms of Use',
        description: 'The baseline terms for lawful use, service limitations, responsible testing and future paid upgrades across the SuperSites portfolio.',
        updatedLabel: 'Reviewed June 26, 2026',
        sections: [
          {
            heading: 'Use the tools responsibly',
            paragraphs: [
              'Do not use SuperSites to attack systems, scan targets without authorization, upload illegal content, bypass rate limits, commit fraud or interfere with other users.',
            ],
          },
          {
            heading: 'Results are informational',
            paragraphs: [
              'Tool results, calculations and diagnostics are provided for practical guidance and can be affected by third-party data, network conditions, browser limits and incomplete inputs.',
            ],
          },
          {
            heading: 'Paid features',
            paragraphs: [
              'Paid plans are not active in this catalog phase. When launched, pricing, quotas, cancellation, refunds, entitlements and provider terms must be shown before checkout.',
            ],
          },
        ],
      },
      'pt-br': {
        navLabel: 'Termos',
        title: 'Termos de Uso',
        description: 'Termos básicos para uso lícito, limitações do serviço, testes responsáveis e futuros upgrades pagos no portfólio SuperSites.',
        updatedLabel: 'Revisado em 26 de junho de 2026',
        sections: [
          {
            heading: 'Use as ferramentas com responsabilidade',
            paragraphs: [
              'Não use o SuperSites para atacar sistemas, testar alvos sem autorização, enviar conteúdo ilegal, burlar limites, cometer fraude ou interferir em outros usuários.',
            ],
          },
          {
            heading: 'Resultados são informativos',
            paragraphs: [
              'Resultados, cálculos e diagnósticos servem como orientação prática e podem depender de dados de terceiros, rede, navegador e entradas incompletas.',
            ],
          },
          {
            heading: 'Recursos pagos',
            paragraphs: [
              'Planos pagos não estão ativos nesta fase do catálogo. Quando lançados, preços, cotas, cancelamento, reembolsos, direitos e termos do provedor devem aparecer antes do checkout.',
            ],
          },
        ],
      },
      es: {
        navLabel: 'Términos',
        title: 'Términos de Uso',
        description: 'Términos base para uso lícito, limitaciones del servicio, pruebas responsables y futuros upgrades pagos en SuperSites.',
        updatedLabel: 'Revisado el 26 de junio de 2026',
        sections: [
          {
            heading: 'Usa las herramientas responsablemente',
            paragraphs: [
              'No uses SuperSites para atacar sistemas, probar objetivos sin autorización, subir contenido ilegal, eludir límites, cometer fraude o interferir con otras personas.',
            ],
          },
          {
            heading: 'Resultados informativos',
            paragraphs: [
              'Resultados, cálculos y diagnósticos son orientación práctica y pueden depender de datos de terceros, red, navegador y entradas incompletas.',
            ],
          },
          {
            heading: 'Funciones pagas',
            paragraphs: [
              'Los planes pagos no están activos en esta fase. Cuando se lancen, precios, cuotas, cancelación, reembolsos, derechos y términos del proveedor deben aparecer antes del checkout.',
            ],
          },
        ],
      },
      fr: {
        navLabel: 'Conditions',
        title: 'Conditions d’utilisation',
        description: 'Conditions de base pour usage licite, limites du service, tests responsables et futures offres payantes dans SuperSites.',
        updatedLabel: 'Révisé le 26 juin 2026',
        sections: [
          {
            heading: 'Utiliser les outils de façon responsable',
            paragraphs: [
              'N’utilisez pas SuperSites pour attaquer des systèmes, tester sans autorisation, envoyer du contenu illégal, contourner les limites, frauder ou gêner d’autres utilisateurs.',
            ],
          },
          {
            heading: 'Résultats informatifs',
            paragraphs: [
              'Résultats, calculs et diagnostics sont une aide pratique et peuvent dépendre de données tierces, du réseau, du navigateur et d’entrées incomplètes.',
            ],
          },
          {
            heading: 'Fonctions payantes',
            paragraphs: [
              'Les plans payants ne sont pas actifs dans cette phase. Au lancement, prix, quotas, annulation, remboursements, droits et termes fournisseur devront être visibles avant le checkout.',
            ],
          },
        ],
      },
      de: {
        navLabel: 'Nutzungsbedingungen',
        title: 'Nutzungsbedingungen',
        description: 'Grundbedingungen für rechtmäßige Nutzung, Dienstgrenzen, verantwortliche Tests und künftige bezahlte Upgrades im SuperSites-Portfolio.',
        updatedLabel: 'Geprüft am 26. Juni 2026',
        sections: [
          {
            heading: 'Tools verantwortungsvoll nutzen',
            paragraphs: [
              'Nutzen Sie SuperSites nicht für Angriffe, Tests ohne Autorisierung, illegale Inhalte, Umgehung von Limits, Betrug oder Störungen anderer Nutzer.',
            ],
          },
          {
            heading: 'Ergebnisse sind informativ',
            paragraphs: [
              'Tool-Ergebnisse, Berechnungen und Diagnosen sind praktische Hinweise und können von Drittanbieterdaten, Netzwerk, Browsergrenzen und unvollständigen Eingaben abhängen.',
            ],
          },
          {
            heading: 'Bezahlte Funktionen',
            paragraphs: [
              'Bezahlte Pläne sind in dieser Katalogphase nicht aktiv. Bei Start müssen Preise, Quoten, Kündigung, Erstattungen, Ansprüche und Anbieterbedingungen vor dem Checkout sichtbar sein.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'methodology',
    localized: {
      en: {
        navLabel: 'Methodology',
        title: 'Methodology',
        description: 'How SuperSites plans to explain tool results, data sources, limitations, quality checks and launch readiness across the portfolio.',
        updatedLabel: 'Reviewed June 26, 2026',
        sections: [
          {
            heading: 'Explain the result',
            paragraphs: [
              'Each public tool should show the result, what it means, what may be wrong, how to improve it and what the tool cannot know.',
            ],
          },
          {
            heading: 'Use transparent sources',
            paragraphs: [
              'Network and domain tools should distinguish direct measurements from cached public records, third-party data and estimates. Calculators should expose formulas, assumptions and examples.',
            ],
          },
          {
            heading: 'Launch gate',
            paragraphs: [
              'A site should not be submitted to AdSense or treated as launched until free tools, useful content, legal pages, metadata, accessibility, monitoring, backup and rollback are validated.',
            ],
          },
        ],
      },
      'pt-br': {
        navLabel: 'Metodologia',
        title: 'Metodologia',
        description: 'Como o SuperSites deve explicar resultados, fontes, limitações, qualidade e prontidão de lançamento em todo o portfólio.',
        updatedLabel: 'Revisado em 26 de junho de 2026',
        sections: [
          {
            heading: 'Explicar o resultado',
            paragraphs: [
              'Cada ferramenta pública deve mostrar o resultado, o significado, o que pode estar errado, como melhorar e o que a ferramenta não consegue saber.',
            ],
          },
          {
            heading: 'Usar fontes transparentes',
            paragraphs: [
              'Ferramentas de rede e domínio devem separar medições diretas de registros públicos em cache, dados de terceiros e estimativas. Calculadoras devem exibir fórmulas, premissas e exemplos.',
            ],
          },
          {
            heading: 'Gate de lançamento',
            paragraphs: [
              'Um site não deve ir ao AdSense nem ser tratado como lançado antes de validar ferramentas gratuitas, conteúdo útil, páginas legais, metadata, acessibilidade, monitoramento, backup e rollback.',
            ],
          },
        ],
      },
      es: {
        navLabel: 'Metodología',
        title: 'Metodología',
        description: 'Cómo SuperSites explica resultados, fuentes, limitaciones, controles de calidad y preparación de lanzamiento en el portafolio.',
        updatedLabel: 'Revisado el 26 de junio de 2026',
        sections: [
          {
            heading: 'Explicar el resultado',
            paragraphs: [
              'Cada herramienta debe mostrar el resultado, su significado, qué puede estar mal, cómo mejorarlo y qué no puede saber la herramienta.',
            ],
          },
          {
            heading: 'Fuentes transparentes',
            paragraphs: [
              'Herramientas de red y dominio deben separar mediciones directas, registros públicos en caché, datos de terceros y estimaciones. Las calculadoras deben exponer fórmulas, supuestos y ejemplos.',
            ],
          },
          {
            heading: 'Gate de lanzamiento',
            paragraphs: [
              'Un sitio no debe enviarse a AdSense ni considerarse lanzado hasta validar herramientas gratuitas, contenido útil, páginas legales, metadata, accesibilidad, monitoreo, backup y rollback.',
            ],
          },
        ],
      },
      fr: {
        navLabel: 'Méthodologie',
        title: 'Méthodologie',
        description: 'Comment SuperSites explique résultats, sources, limites, contrôles qualité et préparation au lancement dans le portefeuille.',
        updatedLabel: 'Révisé le 26 juin 2026',
        sections: [
          {
            heading: 'Expliquer le résultat',
            paragraphs: [
              'Chaque outil public doit montrer le résultat, son sens, ce qui peut être faux, comment l’améliorer et ce que l’outil ne peut pas savoir.',
            ],
          },
          {
            heading: 'Sources transparentes',
            paragraphs: [
              'Les outils réseau et domaine doivent distinguer mesures directes, enregistrements publics en cache, données tierces et estimations. Les calculateurs doivent exposer formules, hypothèses et exemples.',
            ],
          },
          {
            heading: 'Gate de lancement',
            paragraphs: [
              'Un site ne doit pas être soumis à AdSense ni considéré lancé avant validation des outils gratuits, contenu utile, pages légales, métadonnées, accessibilité, surveillance, backup et rollback.',
            ],
          },
        ],
      },
      de: {
        navLabel: 'Methodik',
        title: 'Methodik',
        description: 'Wie SuperSites Ergebnisse, Quellen, Grenzen, Qualitätsprüfungen und Launch-Bereitschaft im Portfolio erklären soll.',
        updatedLabel: 'Geprüft am 26. Juni 2026',
        sections: [
          {
            heading: 'Ergebnis erklären',
            paragraphs: [
              'Jedes öffentliche Tool soll Ergebnis, Bedeutung, mögliche Fehler, Verbesserungen und Grenzen verständlich zeigen.',
            ],
          },
          {
            heading: 'Transparente Quellen',
            paragraphs: [
              'Netzwerk- und Domain-Tools müssen direkte Messungen, gecachte öffentliche Einträge, Drittanbieterdaten und Schätzungen trennen. Rechner zeigen Formeln, Annahmen und Beispiele.',
            ],
          },
          {
            heading: 'Launch Gate',
            paragraphs: [
              'Eine Site wird nicht bei AdSense eingereicht oder als gestartet behandelt, bis Gratis-Tools, hilfreicher Inhalt, Rechtstexte, Metadaten, Barrierefreiheit, Monitoring, Backup und Rollback validiert sind.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'editorial-policy',
    localized: {
      en: {
        navLabel: 'Editorial',
        title: 'Editorial Policy',
        description: 'The editorial rules for useful content, translations, review dates, corrections and avoidance of low-value mass pages across SuperSites.',
        updatedLabel: 'Reviewed June 26, 2026',
        sections: [
          {
            heading: 'Useful original pages',
            paragraphs: [
              'Pages should answer a real user need with a working tool, context, examples, limitations and next steps. SuperSites must not publish thin mass pages just to target search traffic.',
            ],
          },
          {
            heading: 'Translations',
            paragraphs: [
              'Localized pages should adapt wording, units and examples for the audience. Incomplete or low-quality translations should not be indexed.',
            ],
          },
          {
            heading: 'Corrections and review',
            paragraphs: [
              'Important pages should show a review date and accept corrections. Claims about data, policies, billing or legal obligations must be checked against current authoritative sources before publication.',
            ],
          },
        ],
      },
      'pt-br': {
        navLabel: 'Editorial',
        title: 'Política Editorial',
        description: 'Regras editoriais para conteúdo útil, traduções, revisão, correções e prevenção de páginas em massa sem valor no SuperSites.',
        updatedLabel: 'Revisado em 26 de junho de 2026',
        sections: [
          {
            heading: 'Páginas originais úteis',
            paragraphs: [
              'Páginas devem responder a uma necessidade real com ferramenta funcionando, contexto, exemplos, limitações e próximos passos. O SuperSites não deve publicar páginas rasas em massa apenas para capturar busca.',
            ],
          },
          {
            heading: 'Traduções',
            paragraphs: [
              'Páginas localizadas devem adaptar termos, unidades e exemplos ao público. Traduções incompletas ou fracas não devem ser indexadas.',
            ],
          },
          {
            heading: 'Correções e revisão',
            paragraphs: [
              'Páginas importantes devem mostrar data de revisão e aceitar correções. Afirmações sobre dados, políticas, billing ou obrigações legais precisam ser checadas em fontes atuais e oficiais antes da publicação.',
            ],
          },
        ],
      },
      es: {
        navLabel: 'Editorial',
        title: 'Política Editorial',
        description: 'Reglas editoriales para contenido útil, traducciones, revisiones, correcciones y prevención de páginas masivas de bajo valor.',
        updatedLabel: 'Revisado el 26 de junio de 2026',
        sections: [
          {
            heading: 'Páginas originales útiles',
            paragraphs: [
              'Las páginas deben responder a una necesidad real con una herramienta funcional, contexto, ejemplos, límites y próximos pasos. SuperSites no debe publicar páginas delgadas en masa para captar búsquedas.',
            ],
          },
          {
            heading: 'Traducciones',
            paragraphs: [
              'Las páginas localizadas deben adaptar términos, unidades y ejemplos al público. Traducciones incompletas o débiles no deben indexarse.',
            ],
          },
          {
            heading: 'Correcciones y revisión',
            paragraphs: [
              'Las páginas importantes deben mostrar fecha de revisión y aceptar correcciones. Afirmaciones sobre datos, políticas, billing u obligaciones legales deben verificarse en fuentes oficiales vigentes.',
            ],
          },
        ],
      },
      fr: {
        navLabel: 'Éditorial',
        title: 'Politique éditoriale',
        description: 'Règles éditoriales pour contenu utile, traductions, révisions, corrections et prévention des pages massives à faible valeur.',
        updatedLabel: 'Révisé le 26 juin 2026',
        sections: [
          {
            heading: 'Pages originales utiles',
            paragraphs: [
              'Les pages doivent répondre à un besoin réel avec outil fonctionnel, contexte, exemples, limites et prochaines étapes. SuperSites ne doit pas publier de pages faibles en masse pour capter la recherche.',
            ],
          },
          {
            heading: 'Traductions',
            paragraphs: [
              'Les pages localisées doivent adapter termes, unités et exemples au public. Les traductions incomplètes ou faibles ne doivent pas être indexées.',
            ],
          },
          {
            heading: 'Corrections et révision',
            paragraphs: [
              'Les pages importantes doivent afficher une date de révision et accepter les corrections. Les affirmations sur données, politiques, billing ou obligations légales doivent être vérifiées auprès de sources officielles actuelles.',
            ],
          },
        ],
      },
      de: {
        navLabel: 'Redaktion',
        title: 'Redaktionelle Richtlinie',
        description: 'Redaktionelle Regeln für nützliche Inhalte, Übersetzungen, Review-Daten, Korrekturen und Vermeidung minderwertiger Massen-Seiten.',
        updatedLabel: 'Geprüft am 26. Juni 2026',
        sections: [
          {
            heading: 'Nützliche Originalseiten',
            paragraphs: [
              'Seiten sollen ein echtes Nutzerbedürfnis mit funktionierendem Tool, Kontext, Beispielen, Grenzen und nächsten Schritten beantworten. SuperSites veröffentlicht keine dünnen Massen-Seiten für Suchtraffic.',
            ],
          },
          {
            heading: 'Übersetzungen',
            paragraphs: [
              'Lokalisierte Seiten sollen Begriffe, Einheiten und Beispiele an das Publikum anpassen. Unvollständige oder schwache Übersetzungen sollen nicht indexiert werden.',
            ],
          },
          {
            heading: 'Korrekturen und Review',
            paragraphs: [
              'Wichtige Seiten sollen ein Review-Datum zeigen und Korrekturen annehmen. Aussagen zu Daten, Policies, Billing oder rechtlichen Pflichten müssen vor Veröffentlichung mit aktuellen offiziellen Quellen geprüft werden.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'status',
    localized: {
      en: {
        navLabel: 'Status',
        title: 'Public Status',
        description: 'Current public availability summary for the SuperSites Hub and product tools on the transitional HostGator domain.',
        updatedLabel: 'Reviewed June 28, 2026',
        sections: [
          {
            heading: 'What is available',
            paragraphs: [
              'The Hub, NetProbe Atlas and the nine product apps are published under the temporary `/supersites/` URL family with HTTPS, localized pages, public sitemaps and static release rollback paths.',
            ],
          },
          {
            heading: 'Current operating limits',
            paragraphs: [
              'The public tools provide free, no-signup utility workflows first. Advanced accounts, paid upgrades, ad delivery, external analytics, recurring workers and automated provider imports are not active on public pages yet.',
            ],
          },
          {
            heading: 'What is checked',
            paragraphs: [
              'Public validation uses release artifacts, browser smoke checks, API health checks where applicable, crawler evidence and documentation records before a surface is treated as ready for wider traffic.',
            ],
          },
        ],
      },
      'pt-br': {
        navLabel: 'Status',
        title: 'Status Público',
        description: 'Resumo atual de disponibilidade pública do SuperSites Hub e das ferramentas no domínio transitório da HostGator.',
        updatedLabel: 'Revisado em 28 de junho de 2026',
        sections: [
          {
            heading: 'O que está disponível',
            paragraphs: [
              'O Hub, o NetProbe Atlas e os nove apps de produto estão publicados na família temporária de URLs `/supersites/`, com HTTPS, páginas localizadas, sitemaps públicos e caminhos de reversão por release estático.',
            ],
          },
          {
            heading: 'Limites operacionais atuais',
            paragraphs: [
              'As ferramentas públicas entregam primeiro fluxos gratuitos sem cadastro. Contas avançadas, upgrades pagos, anúncios, analytics externo, workers recorrentes e importações automatizadas de provedores ainda não estão ativos nas páginas públicas.',
            ],
          },
          {
            heading: 'O que é verificado',
            paragraphs: [
              'A validação pública usa artefatos de release, checagens de navegador, saúde de APIs quando aplicável, evidência de crawler e registros documentais antes de tratar uma superfície como pronta para mais tráfego.',
            ],
          },
        ],
      },
      es: {
        navLabel: 'Estado',
        title: 'Estado Público',
        description: 'Resumen actual de disponibilidad pública del SuperSites Hub y sus herramientas en el dominio transitorio de HostGator.',
        updatedLabel: 'Revisado el 28 de junio de 2026',
        sections: [
          {
            heading: 'Qué está disponible',
            paragraphs: [
              'El Hub, NetProbe Atlas y las nueve apps de producto están publicados bajo la familia temporal de URLs `/supersites/`, con HTTPS, páginas localizadas, sitemaps públicos y reversión por release estático.',
            ],
          },
          {
            heading: 'Límites operativos actuales',
            paragraphs: [
              'Las herramientas públicas entregan primero flujos gratuitos sin registro. Cuentas avanzadas, upgrades pagos, anuncios, analytics externo, workers recurrentes e importaciones automatizadas aún no están activos en páginas públicas.',
            ],
          },
          {
            heading: 'Qué se verifica',
            paragraphs: [
              'La validación pública usa artefactos de release, pruebas de navegador, salud de APIs cuando aplica, evidencia de crawler y registros documentales antes de tratar una superficie como lista para más tráfico.',
            ],
          },
        ],
      },
      fr: {
        navLabel: 'Statut',
        title: 'Statut public',
        description: 'Résumé de disponibilité publique du SuperSites Hub et des outils sur le domaine transitoire HostGator.',
        updatedLabel: 'Révisé le 28 juin 2026',
        sections: [
          {
            heading: 'Ce qui est disponible',
            paragraphs: [
              'Le Hub, NetProbe Atlas et les neuf applications produit sont publiés sous la famille temporaire `/supersites/`, avec HTTPS, pages localisées, sitemaps publics et chemins de retour par release statique.',
            ],
          },
          {
            heading: 'Limites opérationnelles actuelles',
            paragraphs: [
              'Les outils publics fournissent d’abord des workflows gratuits sans compte. Comptes avancés, offres payantes, publicité, analytics externe, workers récurrents et imports automatisés ne sont pas actifs sur les pages publiques.',
            ],
          },
          {
            heading: 'Ce qui est vérifié',
            paragraphs: [
              'La validation publique utilise artefacts de release, contrôles navigateur, santé API si applicable, preuves de crawler et dossiers documentés avant de considérer une surface prête pour plus de trafic.',
            ],
          },
        ],
      },
      de: {
        navLabel: 'Status',
        title: 'Öffentlicher Status',
        description: 'Aktuelle öffentliche Verfügbarkeitsübersicht für SuperSites Hub und Produkt-Tools auf der temporären HostGator-Domain.',
        updatedLabel: 'Geprüft am 28. Juni 2026',
        sections: [
          {
            heading: 'Was verfügbar ist',
            paragraphs: [
              'Hub, NetProbe Atlas und die neun Produkt-Apps sind unter der temporären URL-Familie `/supersites/` veröffentlicht, mit HTTPS, lokalisierten Seiten, öffentlichen Sitemaps und statischen Release-Rückwegen.',
            ],
          },
          {
            heading: 'Aktuelle Betriebsgrenzen',
            paragraphs: [
              'Die öffentlichen Tools liefern zuerst kostenlose Workflows ohne Pflichtkonto. Erweiterte Konten, bezahlte Upgrades, Anzeigen, externe Analytics, wiederkehrende Worker und automatisierte Provider-Imports sind auf öffentlichen Seiten noch nicht aktiv.',
            ],
          },
          {
            heading: 'Was geprüft wird',
            paragraphs: [
              'Öffentliche Validierung nutzt Release-Artefakte, Browser-Prüfungen, API-Gesundheit falls relevant, Crawler-Evidenz und Dokumentation, bevor eine Oberfläche für mehr Traffic bereit gilt.',
            ],
          },
        ],
      },
    },
  },
]

export function isLegalPageSlug(value: string | undefined): value is LegalPageSlug {
  return legalPageSlugs.includes(value as LegalPageSlug)
}

export function getLegalPageBySlug(value: string | undefined): LegalPage | null {
  if (!isLegalPageSlug(value)) {
    return null
  }

  return legalPageCatalog.find((page) => page.slug === value) ?? null
}
