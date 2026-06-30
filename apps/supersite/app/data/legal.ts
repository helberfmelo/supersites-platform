import { buildTrustPageCopy, sanitizePublicCopy, type LocaleCode, type TrustSupportProfile } from './locales'

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

export interface LegalSectionLink {
  label: string
  href: string
  note: string
}

export interface LegalSection {
  heading: string
  paragraphs: string[]
  links?: LegalSectionLink[]
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

export interface LegalShellCopy {
  breadcrumbHome: string
  pageStatusLabel: string
  launchGateTitle: string
  launchGateBody: string
  relatedTitle: string
}

const trustProfile = {
  siteName: 'SuperSites Hub',
  publicPath: '/supersites/',
} satisfies TrustSupportProfile

export const legalShellCopy: Record<LocaleCode, LegalShellCopy> = {
  en: {
    breadcrumbHome: 'Catalog',
    pageStatusLabel: 'Page status',
    launchGateTitle: 'Page care',
    launchGateBody: 'This page is maintained as public guidance for the SuperSites network. Corrections and privacy requests can be sent through the contact page.',
    relatedTitle: 'Related pages',
  },
  'pt-br': {
    breadcrumbHome: 'Catálogo',
    pageStatusLabel: 'Status da página',
    launchGateTitle: 'Cuidado da página',
    launchGateBody: 'Esta página é mantida como orientação pública da rede SuperSites. Correções e pedidos de privacidade podem ser enviados pela página de contato.',
    relatedTitle: 'Páginas relacionadas',
  },
  es: {
    breadcrumbHome: 'Catálogo',
    pageStatusLabel: 'Estado de la página',
    launchGateTitle: 'Cuidado de la página',
    launchGateBody: 'Esta página se mantiene como orientación pública de la red SuperSites. Las correcciones y solicitudes de privacidad pueden enviarse desde la página de contacto.',
    relatedTitle: 'Páginas relacionadas',
  },
  fr: {
    breadcrumbHome: 'Catalogue',
    pageStatusLabel: 'Statut de la page',
    launchGateTitle: 'Suivi de la page',
    launchGateBody: 'Cette page est maintenue comme guide public du réseau SuperSites. Les corrections et demandes de confidentialité peuvent passer par la page de contact.',
    relatedTitle: 'Pages liées',
  },
  de: {
    breadcrumbHome: 'Katalog',
    pageStatusLabel: 'Seitenstatus',
    launchGateTitle: 'Seitenpflege',
    launchGateBody: 'Diese Seite wird als öffentliche Orientierung für das SuperSites-Netzwerk gepflegt. Korrekturen und Datenschutzanfragen können über die Kontaktseite gesendet werden.',
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
        description: 'SuperSites is a portfolio of practical web tools that helps people finish everyday web tasks with free, localized pages and clear privacy boundaries.',
        updatedLabel: 'Reviewed June 26, 2026',
        sections: [
          {
            heading: 'Mission',
            paragraphs: [
              'SuperSites makes common web tasks faster to finish: checking DNS and IP details, using business calculators, preparing documents, formatting code, working with images, planning time zones and checking websites.',
            ],
          },
          {
            heading: 'How the network works',
            paragraphs: [
              'The hub curates focused tool suites. Each product page starts with a practical free workflow, then links to deeper tools when a visitor needs a more specific task.',
            ],
          },
          {
            heading: 'Privacy by default',
            paragraphs: [
              'Browser-side processing is preferred when it reduces collection. Tool content is kept out of analytics events, and account or paid features stay separated from the basic free answer.',
            ],
          },
          {
            heading: 'Contact and corrections',
            paragraphs: [
              'Corrections, broken links, translation issues, accessibility problems and privacy requests should include the page URL, language and the expected result so the right surface can be fixed.',
            ],
          },
          {
            heading: 'Languages',
            paragraphs: [
              'The public hub supports English, Portuguese, Spanish, French and German routes with localized navigation, canonical URLs and hreflang alternates without forcing visitors by IP.',
            ],
          },
          {
            heading: 'Responsible growth',
            paragraphs: [
              'The free task remains usable without mandatory signup. Advertising, support options and upgrades must stay clearly separated from the result a visitor came to get.',
            ],
          },
        ],
      },
      'pt-br': {
        navLabel: 'Sobre',
        title: 'Sobre o SuperSites',
        description: 'SuperSites é um portfólio de ferramentas web práticas para concluir tarefas do dia a dia com páginas gratuitas, localizadas e limites claros de privacidade.',
        updatedLabel: 'Revisado em 26 de junho de 2026',
        sections: [
          {
            heading: 'Missão',
            paragraphs: [
              'O SuperSites torna tarefas comuns da web mais rápidas: consultar DNS e IP, usar calculadoras de negócio, preparar documentos, formatar código, trabalhar imagens, planejar fusos e checar sites.',
            ],
          },
          {
            heading: 'Como a rede funciona',
            paragraphs: [
              'O hub organiza conjuntos de ferramentas focados. Cada página de produto começa por um fluxo gratuito prático e aponta para ferramentas mais profundas quando a pessoa precisa de uma tarefa específica.',
            ],
          },
          {
            heading: 'Privacidade por padrão',
            paragraphs: [
              'Processamento no navegador é preferido quando reduz coleta. Conteúdo digitado nas ferramentas fica fora de eventos de analytics, e recursos de conta ou pagos permanecem separados da resposta gratuita básica.',
            ],
          },
          {
            heading: 'Contato e correções',
            paragraphs: [
              'Correções, links quebrados, problemas de tradução, acessibilidade e pedidos de privacidade devem trazer URL da página, idioma e resultado esperado para que a superfície certa seja corrigida.',
            ],
          },
          {
            heading: 'Idiomas',
            paragraphs: [
              'O hub público atende rotas em inglês, português, espanhol, francês e alemão, com navegação localizada, URLs canônicas e alternates hreflang sem forçar visitantes por IP.',
            ],
          },
          {
            heading: 'Crescimento responsável',
            paragraphs: [
              'A tarefa gratuita continua utilizável sem cadastro obrigatório. Publicidade, opções de apoio e upgrades devem ficar claramente separados do resultado que a pessoa veio buscar.',
            ],
          },
        ],
      },
      es: {
        navLabel: 'Acerca de',
        title: 'Acerca de SuperSites',
        description: 'SuperSites es un portafolio de herramientas web prácticas para completar tareas cotidianas con páginas gratuitas, localizadas y límites claros de privacidad.',
        updatedLabel: 'Revisado el 26 de junio de 2026',
        sections: [
          {
            heading: 'Misión',
            paragraphs: [
              'SuperSites hace más rápidas tareas comunes de la web: revisar DNS e IP, usar calculadoras de negocio, preparar documentos, formatear código, trabajar con imágenes, planear zonas horarias y comprobar sitios.',
            ],
          },
          {
            heading: 'Cómo funciona la red',
            paragraphs: [
              'El hub organiza suites de herramientas enfocadas. Cada página de producto empieza con un flujo gratuito práctico y enlaza herramientas más profundas cuando una persona necesita una tarea específica.',
            ],
          },
          {
            heading: 'Privacidad por defecto',
            paragraphs: [
              'Se prefiere el procesamiento en el navegador cuando reduce la recolección. El contenido de las herramientas queda fuera de analytics, y las funciones de cuenta o pagas se mantienen separadas de la respuesta gratuita básica.',
            ],
          },
          {
            heading: 'Contacto y correcciones',
            paragraphs: [
              'Correcciones, enlaces rotos, problemas de traducción, accesibilidad y solicitudes de privacidad deben incluir URL, idioma y resultado esperado para corregir la superficie adecuada.',
            ],
          },
          {
            heading: 'Idiomas',
            paragraphs: [
              'El hub público admite rutas en inglés, portugués, español, francés y alemán, con navegación localizada, URLs canónicas y hreflang alternates sin forzar visitantes por IP.',
            ],
          },
          {
            heading: 'Crecimiento responsable',
            paragraphs: [
              'La tarea gratuita sigue usable sin registro obligatorio. Publicidad, opciones de apoyo y upgrades deben mantenerse claramente separados del resultado que la persona vino a obtener.',
            ],
          },
        ],
      },
      fr: {
        navLabel: 'À propos',
        title: 'À propos de SuperSites',
        description: 'SuperSites est un portefeuille d outils web pratiques pour terminer des tâches courantes avec des pages gratuites, localisées et des limites de confidentialité claires.',
        updatedLabel: 'Révisé le 26 juin 2026',
        sections: [
          {
            heading: 'Mission',
            paragraphs: [
              'SuperSites accélère des tâches web courantes : vérifier DNS et IP, utiliser des calculateurs métier, préparer des documents, formater du code, travailler des images, planifier des fuseaux et contrôler des sites.',
            ],
          },
          {
            heading: 'Fonctionnement du réseau',
            paragraphs: [
              'Le hub organise des suites d outils ciblées. Chaque page produit commence par un flux gratuit pratique et renvoie vers des outils plus précis quand une personne a besoin d une tâche spécifique.',
            ],
          },
          {
            heading: 'Confidentialité par défaut',
            paragraphs: [
              'Le traitement dans le navigateur est préféré quand il réduit la collecte. Le contenu des outils reste hors des événements analytics, et les fonctions de compte ou payantes restent séparées de la réponse gratuite de base.',
            ],
          },
          {
            heading: 'Contact et corrections',
            paragraphs: [
              'Corrections, liens cassés, problèmes de traduction, accessibilité et demandes de confidentialité doivent inclure URL, langue et résultat attendu pour corriger la bonne surface.',
            ],
          },
          {
            heading: 'Langues',
            paragraphs: [
              'Le hub public prend en charge des routes en anglais, portugais, espagnol, français et allemand, avec navigation localisée, URLs canoniques et hreflang alternates sans forcer les visiteurs par IP.',
            ],
          },
          {
            heading: 'Croissance responsable',
            paragraphs: [
              'La tâche gratuite reste utilisable sans compte obligatoire. Publicité, options de soutien et upgrades doivent rester clairement séparés du résultat recherché par la personne.',
            ],
          },
        ],
      },
      de: {
        navLabel: 'Über uns',
        title: 'Über SuperSites',
        description: 'SuperSites ist ein Portfolio praktischer Web-Tools, mit denen Menschen alltägliche Webaufgaben über kostenlose, lokalisierte Seiten mit klaren Datenschutzgrenzen erledigen.',
        updatedLabel: 'Geprüft am 26. Juni 2026',
        sections: [
          {
            heading: 'Mission',
            paragraphs: [
              'SuperSites macht häufige Webaufgaben schneller: DNS- und IP-Daten prüfen, Geschäftsrechner nutzen, Dokumente vorbereiten, Code formatieren, Bilder bearbeiten, Zeitzonen planen und Websites prüfen.',
            ],
          },
          {
            heading: 'Wie das Netzwerk funktioniert',
            paragraphs: [
              'Der Hub kuratiert fokussierte Tool-Suites. Jede Produktseite beginnt mit einem praktischen kostenlosen Workflow und verlinkt tiefere Tools, wenn Besucher eine spezifischere Aufgabe haben.',
            ],
          },
          {
            heading: 'Datenschutz als Standard',
            paragraphs: [
              'Verarbeitung im Browser wird bevorzugt, wenn sie Datenerfassung reduziert. Tool-Inhalte bleiben aus Analytics-Ereignissen heraus, und Konto- oder Bezahlfunktionen bleiben von der kostenlosen Grundantwort getrennt.',
            ],
          },
          {
            heading: 'Kontakt und Korrekturen',
            paragraphs: [
              'Korrekturen, defekte Links, Übersetzungsprobleme, Barrierefreiheit und Datenschutzanfragen sollten URL, Sprache und erwartetes Ergebnis enthalten, damit die richtige Oberfläche korrigiert werden kann.',
            ],
          },
          {
            heading: 'Sprachen',
            paragraphs: [
              'Der öffentliche Hub unterstützt englische, portugiesische, spanische, französische und deutsche Routen mit lokalisierter Navigation, Canonical-URLs und hreflang-Alternates ohne IP-Zwang.',
            ],
          },
          {
            heading: 'Verantwortliches Wachstum',
            paragraphs: [
              'Die kostenlose Aufgabe bleibt ohne Pflichtkonto nutzbar. Werbung, Support-Optionen und Upgrades müssen klar vom Ergebnis getrennt bleiben, wegen dem eine Person gekommen ist.',
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
        description: 'Use the right SuperSites contact channel for product support, privacy requests, security or abuse reports, editorial corrections, partnerships and legal notices.',
        updatedLabel: 'Reviewed June 26, 2026',
        sections: [
          {
            heading: 'Choose a channel',
            paragraphs: [
              'Use the subject-specific links below so the message reaches the right queue. Include the site name, page URL, language, what happened and the result you expected.',
            ],
            links: [
              {
                label: 'Product support',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Product%20support',
                note: 'Questions, bugs, accessibility issues and general feedback.',
              },
              {
                label: 'Security or abuse',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Security%20or%20abuse',
                note: 'Vulnerabilities, phishing, malware reports, unsafe redirects or abuse concerns.',
              },
              {
                label: 'Editorial correction',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Editorial%20correction',
                note: 'Broken links, outdated facts, translation issues and page corrections.',
              },
              {
                label: 'Privacy request',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Privacy%20request',
                note: 'Access, correction, deletion, consent or data-handling questions.',
              },
              {
                label: 'Partnership or legal',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Partnership%20or%20legal',
                note: 'Responsible business, media, partnership or legal notices.',
              },
            ],
          },
          {
            heading: 'Security and abuse',
            paragraphs: [
              'For urgent security or abuse reports, include the affected URL, timestamps, reproduction steps, observed impact and whether any sensitive data may be involved. Do not send passwords, API keys or private documents; describe them safely first.',
            ],
          },
          {
            heading: 'Editorial corrections',
            paragraphs: [
              'Corrections should cite the affected page, current text or behavior, preferred correction and source when one is available. Translation fixes should mention the language route.',
            ],
          },
          {
            heading: 'Privacy requests',
            paragraphs: [
              'Privacy requests should identify the product, page and request type. Ask for a secure intake path before sending identity documents or sensitive personal data.',
            ],
          },
          {
            heading: 'Support',
            paragraphs: [
              'Free tools are designed to work without an account. Support messages are most useful when they include browser, device, language, steps to reproduce and whether the issue happens after refresh.',
            ],
          },
          {
            heading: 'Partnership and legal',
            paragraphs: [
              'Business, media and legal messages should explain the organization, request, jurisdiction if relevant and the best reply channel.',
            ],
          },
        ],
      },
      'pt-br': {
        navLabel: 'Contato',
        title: 'Contato SuperSites',
        description: 'Use o canal certo do SuperSites para suporte, privacidade, segurança ou abuso, correções editoriais, parcerias e avisos legais.',
        updatedLabel: 'Revisado em 26 de junho de 2026',
        sections: [
          {
            heading: 'Escolha um canal',
            paragraphs: [
              'Use os links por assunto para que a mensagem chegue à fila correta. Inclua nome do site, URL da página, idioma, o que aconteceu e o resultado esperado.',
            ],
            links: [
              {
                label: 'Suporte de produto',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Product%20support',
                note: 'Dúvidas, bugs, acessibilidade e feedback geral.',
              },
              {
                label: 'Segurança ou abuso',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Security%20or%20abuse',
                note: 'Vulnerabilidades, phishing, malware, redirecionamentos inseguros ou abuso.',
              },
              {
                label: 'Correção editorial',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Editorial%20correction',
                note: 'Links quebrados, fatos desatualizados, tradução e correções de página.',
              },
              {
                label: 'Pedido de privacidade',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Privacy%20request',
                note: 'Acesso, correção, exclusão, consentimento ou dúvidas sobre dados.',
              },
              {
                label: 'Parceria ou legal',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Partnership%20or%20legal',
                note: 'Mensagens comerciais responsáveis, imprensa, parcerias ou avisos legais.',
              },
            ],
          },
          {
            heading: 'Segurança e abuso',
            paragraphs: [
              'Para relatos urgentes de segurança ou abuso, inclua URL afetada, horários, passos para reproduzir, impacto observado e se algum dado sensível pode estar envolvido. Não envie senhas, chaves de API ou documentos privados; descreva com segurança primeiro.',
            ],
          },
          {
            heading: 'Correções editoriais',
            paragraphs: [
              'Correções devem citar a página afetada, texto ou comportamento atual, correção sugerida e fonte quando houver. Ajustes de tradução devem informar a rota de idioma.',
            ],
          },
          {
            heading: 'Pedidos de privacidade',
            paragraphs: [
              'Pedidos de privacidade devem identificar produto, página e tipo de solicitação. Peça um caminho seguro antes de enviar documentos de identidade ou dados pessoais sensíveis.',
            ],
          },
          {
            heading: 'Suporte',
            paragraphs: [
              'As ferramentas gratuitas são feitas para funcionar sem conta. Mensagens de suporte ajudam mais quando trazem navegador, dispositivo, idioma, passos para reproduzir e se o problema continua após atualizar a página.',
            ],
          },
          {
            heading: 'Parcerias e legal',
            paragraphs: [
              'Mensagens comerciais, imprensa e avisos legais devem explicar organização, solicitação, jurisdição quando relevante e melhor canal de resposta.',
            ],
          },
        ],
      },
      es: {
        navLabel: 'Contacto',
        title: 'Contacto de SuperSites',
        description: 'Usa el canal correcto de SuperSites para soporte, privacidad, seguridad o abuso, correcciones editoriales, alianzas y avisos legales.',
        updatedLabel: 'Revisado el 26 de junio de 2026',
        sections: [
          {
            heading: 'Elige un canal',
            paragraphs: [
              'Usa los enlaces por tema para que el mensaje llegue a la fila correcta. Incluye sitio, URL, idioma, qué ocurrió y el resultado esperado.',
            ],
            links: [
              {
                label: 'Soporte de producto',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Product%20support',
                note: 'Preguntas, errores, accesibilidad y comentarios generales.',
              },
              {
                label: 'Seguridad o abuso',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Security%20or%20abuse',
                note: 'Vulnerabilidades, phishing, malware, redirecciones inseguras o abuso.',
              },
              {
                label: 'Corrección editorial',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Editorial%20correction',
                note: 'Enlaces rotos, datos desactualizados, traducción y correcciones de página.',
              },
              {
                label: 'Solicitud de privacidad',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Privacy%20request',
                note: 'Acceso, corrección, eliminación, consentimiento o preguntas sobre datos.',
              },
              {
                label: 'Alianza o legal',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Partnership%20or%20legal',
                note: 'Negocios responsables, prensa, alianzas o avisos legales.',
              },
            ],
          },
          {
            heading: 'Seguridad y abuso',
            paragraphs: [
              'Para reportes urgentes de seguridad o abuso, incluye URL afectada, horarios, pasos para reproducir, impacto observado y si puede haber datos sensibles involucrados. No envíes contraseñas, claves API ni documentos privados; descríbelos de forma segura primero.',
            ],
          },
          {
            heading: 'Correcciones editoriales',
            paragraphs: [
              'Las correcciones deben citar la página afectada, texto o comportamiento actual, corrección sugerida y fuente cuando exista. Los ajustes de traducción deben mencionar la ruta de idioma.',
            ],
          },
          {
            heading: 'Solicitudes de privacidad',
            paragraphs: [
              'Las solicitudes de privacidad deben identificar producto, página y tipo de solicitud. Pide un canal seguro antes de enviar documentos de identidad o datos personales sensibles.',
            ],
          },
          {
            heading: 'Soporte',
            paragraphs: [
              'Las herramientas gratuitas están diseñadas para funcionar sin cuenta. Los mensajes de soporte son más útiles cuando incluyen navegador, dispositivo, idioma, pasos para reproducir y si el problema continúa tras actualizar.',
            ],
          },
          {
            heading: 'Alianzas y legal',
            paragraphs: [
              'Los mensajes comerciales, de prensa y legales deben explicar organización, solicitud, jurisdicción si aplica y mejor canal de respuesta.',
            ],
          },
        ],
      },
      fr: {
        navLabel: 'Contact',
        title: 'Contacter SuperSites',
        description: 'Utilisez le bon canal SuperSites pour support produit, confidentialité, sécurité ou abus, corrections éditoriales, partenariats et avis juridiques.',
        updatedLabel: 'Révisé le 26 juin 2026',
        sections: [
          {
            heading: 'Choisir un canal',
            paragraphs: [
              'Utilisez les liens par sujet pour que le message arrive dans la bonne file. Indiquez le site, l’URL, la langue, ce qui s’est passé et le résultat attendu.',
            ],
            links: [
              {
                label: 'Support produit',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Product%20support',
                note: 'Questions, bugs, accessibilité et retours généraux.',
              },
              {
                label: 'Sécurité ou abus',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Security%20or%20abuse',
                note: 'Vulnérabilités, phishing, malware, redirections non sûres ou abus.',
              },
              {
                label: 'Correction éditoriale',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Editorial%20correction',
                note: 'Liens cassés, informations obsolètes, traduction et corrections de page.',
              },
              {
                label: 'Demande de confidentialité',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Privacy%20request',
                note: 'Accès, correction, suppression, consentement ou questions sur les données.',
              },
              {
                label: 'Partenariat ou juridique',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Partnership%20or%20legal',
                note: 'Messages business responsables, presse, partenariats ou avis juridiques.',
              },
            ],
          },
          {
            heading: 'Sécurité et abus',
            paragraphs: [
              'Pour les signalements urgents de sécurité ou d’abus, indiquez URL concernée, horaires, étapes de reproduction, impact observé et si des données sensibles peuvent être impliquées. N’envoyez pas mots de passe, clés API ou documents privés; décrivez-les d’abord de manière sûre.',
            ],
          },
          {
            heading: 'Corrections éditoriales',
            paragraphs: [
              'Les corrections doivent citer la page concernée, le texte ou comportement actuel, la correction proposée et une source si disponible. Les corrections de traduction doivent mentionner la route de langue.',
            ],
          },
          {
            heading: 'Demandes de confidentialité',
            paragraphs: [
              'Les demandes de confidentialité doivent identifier le produit, la page et le type de demande. Demandez un canal sécurisé avant d’envoyer des documents d’identité ou des données personnelles sensibles.',
            ],
          },
          {
            heading: 'Support',
            paragraphs: [
              'Les outils gratuits sont conçus pour fonctionner sans compte. Les messages de support sont plus utiles avec navigateur, appareil, langue, étapes de reproduction et état après actualisation.',
            ],
          },
          {
            heading: 'Partenariats et juridique',
            paragraphs: [
              'Les messages commerciaux, presse et juridiques doivent expliquer organisation, demande, juridiction si pertinente et meilleur canal de réponse.',
            ],
          },
        ],
      },
      de: {
        navLabel: 'Kontakt',
        title: 'SuperSites kontaktieren',
        description: 'Nutzen Sie den passenden SuperSites-Kanal für Produktsupport, Datenschutz, Sicherheit oder Missbrauch, redaktionelle Korrekturen, Partnerschaften und rechtliche Hinweise.',
        updatedLabel: 'Geprüft am 26. Juni 2026',
        sections: [
          {
            heading: 'Kanal auswählen',
            paragraphs: [
              'Nutzen Sie die thematischen Links, damit die Nachricht in der richtigen Warteschlange landet. Nennen Sie Site, URL, Sprache, beobachtetes Verhalten und erwartetes Ergebnis.',
            ],
            links: [
              {
                label: 'Produktsupport',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Product%20support',
                note: 'Fragen, Fehler, Barrierefreiheit und allgemeines Feedback.',
              },
              {
                label: 'Sicherheit oder Missbrauch',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Security%20or%20abuse',
                note: 'Schwachstellen, Phishing, Malware, unsichere Weiterleitungen oder Missbrauch.',
              },
              {
                label: 'Redaktionelle Korrektur',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Editorial%20correction',
                note: 'Defekte Links, veraltete Fakten, Übersetzung und Seitenkorrekturen.',
              },
              {
                label: 'Datenschutzanfrage',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Privacy%20request',
                note: 'Auskunft, Korrektur, Löschung, Einwilligung oder Fragen zu Daten.',
              },
              {
                label: 'Partnerschaft oder Rechtliches',
                href: 'mailto:contact@opentshost.com?subject=%5BSuperSites%5D%20Partnership%20or%20legal',
                note: 'Verantwortliche Geschäfts-, Medien-, Partnerschafts- oder Rechtshinweise.',
              },
            ],
          },
          {
            heading: 'Sicherheit und Missbrauch',
            paragraphs: [
              'Für dringende Sicherheits- oder Missbrauchsmeldungen nennen Sie betroffene URL, Zeitpunkte, Reproduktionsschritte, beobachtete Auswirkungen und ob sensible Daten betroffen sein könnten. Senden Sie keine Passwörter, API-Schlüssel oder privaten Dokumente; beschreiben Sie diese zuerst sicher.',
            ],
          },
          {
            heading: 'Redaktionelle Korrekturen',
            paragraphs: [
              'Korrekturen sollten die betroffene Seite, aktuellen Text oder aktuelles Verhalten, vorgeschlagene Korrektur und Quelle nennen, sofern vorhanden. Übersetzungskorrekturen sollten die Sprachroute enthalten.',
            ],
          },
          {
            heading: 'Datenschutzanfragen',
            paragraphs: [
              'Datenschutzanfragen sollten Produkt, Seite und Art der Anfrage nennen. Fordern Sie zuerst einen sicheren Eingang an, bevor Ausweisdokumente oder sensible personenbezogene Daten gesendet werden.',
            ],
          },
          {
            heading: 'Support',
            paragraphs: [
              'Die kostenlosen Tools sind so konzipiert, dass sie ohne Konto funktionieren. Supportmeldungen helfen am meisten mit Browser, Gerät, Sprache, Reproduktionsschritten und ob das Problem nach Aktualisierung bestehen bleibt.',
            ],
          },
          {
            heading: 'Partnerschaften und Rechtliches',
            paragraphs: [
              'Geschäftliche, Medien- und Rechtsnachrichten sollten Organisation, Anliegen, relevante Gerichtsbarkeit und besten Antwortkanal erklären.',
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
        description: 'How SuperSites handles tool inputs, essential service data, analytics limits, advertising separation, cookies, retention and privacy requests across the public hub.',
        updatedLabel: 'Reviewed June 30, 2026',
        sections: [
          {
            heading: 'Data categories',
            paragraphs: [
              'SuperSites processes the information needed to deliver public pages and free tools: route, language, browser and device basics, consent choices, security signals and the input a visitor submits to a tool.',
            ],
          },
          {
            heading: 'Tool inputs',
            paragraphs: [
              'Inputs such as domains, URLs, text, files, dates, numbers and business details are used to produce the requested result. Browser-first tools keep supported inputs on the visitor device. Public diagnostics that require network checks send only a bounded target to the relevant public API.',
            ],
          },
          {
            heading: 'Analytics and advertising',
            paragraphs: [
              'Analytics is limited to sanitized product events such as route, locale, tool slug, action type and completion state. Events exclude full IP addresses, email addresses, phone numbers, names, document text, file content, DNS answers, URL query strings and submitted secrets. Legal pages do not display ad placements, and the public hub does not load real AdSense requests while monetization is off.',
            ],
          },
          {
            heading: 'Cookies and preferences',
            paragraphs: [
              'Essential storage keeps language, consent and basic service preferences. Optional analytics or advertising storage stays separated from tool inputs and follows the consent controls described on the Cookie Policy page.',
            ],
          },
          {
            heading: 'Retention and security',
            paragraphs: [
              'Browser-side results remain on the visitor device unless the visitor downloads or copies them. Server logs, cache entries and bounded diagnostic requests are kept only for security, abuse prevention, troubleshooting and operational reliability for the shortest practical period.',
            ],
          },
          {
            heading: 'Rights and contact',
            paragraphs: [
              'Visitors can request access, correction, deletion, consent review or a privacy explanation through the Contact page. Include the product, page URL, language, request type and reply address. Ask for a secure intake path before sending identity documents or sensitive personal data.',
            ],
          },
        ],
      },
      'pt-br': {
        navLabel: 'Privacidade',
        title: 'Política de Privacidade',
        description: 'Como o SuperSites trata entradas de ferramentas, dados essenciais de serviço, limites de analytics, separação de publicidade, cookies, retenção e pedidos de privacidade no hub público.',
        updatedLabel: 'Revisado em 30 de junho de 2026',
        sections: [
          {
            heading: 'Categorias de dados',
            paragraphs: [
              'O SuperSites trata as informações necessárias para entregar páginas públicas e ferramentas gratuitas: rota acessada, idioma, dados básicos de navegador e dispositivo, escolhas de consentimento, sinais de segurança e a entrada enviada pela pessoa em uma ferramenta.',
            ],
          },
          {
            heading: 'Entradas das ferramentas',
            paragraphs: [
              'Domínios, URLs, textos, arquivos, datas, números e detalhes de negócio são usados para gerar o resultado solicitado. Ferramentas browser-first mantêm entradas compatíveis no dispositivo da pessoa visitante. Diagnósticos públicos com consulta de rede enviam somente um alvo limitado para a API pública correspondente.',
            ],
          },
          {
            heading: 'Analytics e publicidade',
            paragraphs: [
              'Analytics fica limitado a eventos sanitizados de produto, como rota, idioma, slug da ferramenta, tipo de ação e estado de conclusão. Eventos excluem IP completo, e-mail, telefone, nome, texto de documento, conteúdo de arquivo, respostas DNS, query strings de URL e segredos enviados. Páginas legais não exibem placements de anúncio, e o hub público não carrega requests reais de AdSense enquanto a monetização está desligada.',
            ],
          },
          {
            heading: 'Cookies e preferências',
            paragraphs: [
              'Armazenamento essencial guarda idioma, consentimento e preferências básicas de serviço. Armazenamento opcional de analytics ou publicidade fica separado das entradas das ferramentas e segue os controles de consentimento descritos na Política de Cookies.',
            ],
          },
          {
            heading: 'Retenção e segurança',
            paragraphs: [
              'Resultados processados no navegador permanecem no dispositivo da pessoa visitante, exceto quando ela baixa ou copia o conteúdo. Logs de servidor, cache e solicitações diagnósticas limitadas são mantidos somente para segurança, prevenção de abuso, solução de problemas e confiabilidade operacional pelo menor período prático.',
            ],
          },
          {
            heading: 'Direitos e contato',
            paragraphs: [
              'Visitantes podem pedir acesso, correção, exclusão, revisão de consentimento ou explicação de privacidade pela página de Contato. Inclua produto, URL da página, idioma, tipo de pedido e endereço para resposta. Solicite um caminho seguro antes de enviar documentos de identidade ou dados pessoais sensíveis.',
            ],
          },
        ],
      },
      es: {
        navLabel: 'Privacidad',
        title: 'Política de Privacidad',
        description: 'Cómo SuperSites trata entradas de herramientas, datos esenciales del servicio, límites de analytics, separación de publicidad, cookies, retención y solicitudes de privacidad en el hub público.',
        updatedLabel: 'Revisado el 30 de junio de 2026',
        sections: [
          {
            heading: 'Categorías de datos',
            paragraphs: [
              'SuperSites trata la información necesaria para entregar páginas públicas y herramientas gratuitas: ruta visitada, idioma, datos básicos del navegador y dispositivo, opciones de consentimiento, señales de seguridad y la entrada que la persona envía a una herramienta.',
            ],
          },
          {
            heading: 'Entradas de herramientas',
            paragraphs: [
              'Dominios, URLs, texto, archivos, fechas, números y datos de negocio se usan para producir el resultado solicitado. Las herramientas browser-first mantienen entradas compatibles en el dispositivo de la persona visitante. Los diagnósticos públicos que requieren red envían solo un objetivo acotado a la API pública correspondiente.',
            ],
          },
          {
            heading: 'Analytics y publicidad',
            paragraphs: [
              'Analytics queda limitado a eventos sanitizados de producto, como ruta, idioma, slug de herramienta, tipo de acción y estado de finalización. Los eventos excluyen IP completa, email, teléfono, nombre, texto de documento, contenido de archivo, respuestas DNS, query strings de URL y secretos enviados. Las páginas legales no muestran placements de anuncio, y el hub público no carga requests reales de AdSense mientras la monetización está apagada.',
            ],
          },
          {
            heading: 'Cookies y preferencias',
            paragraphs: [
              'El almacenamiento esencial conserva idioma, consentimiento y preferencias básicas del servicio. El almacenamiento opcional de analytics o publicidad queda separado de las entradas de herramientas y sigue los controles de consentimiento descritos en la Política de Cookies.',
            ],
          },
          {
            heading: 'Retención y seguridad',
            paragraphs: [
              'Los resultados procesados en el navegador permanecen en el dispositivo de la persona visitante, salvo cuando ella descarga o copia el contenido. Logs de servidor, caché y solicitudes diagnósticas acotadas se conservan solo para seguridad, prevención de abuso, solución de problemas y confiabilidad operativa durante el periodo práctico más corto.',
            ],
          },
          {
            heading: 'Derechos y contacto',
            paragraphs: [
              'Las personas visitantes pueden pedir acceso, corrección, eliminación, revisión de consentimiento o una explicación de privacidad desde la página de Contacto. Incluye producto, URL de la página, idioma, tipo de solicitud y dirección de respuesta. Solicita una vía segura antes de enviar documentos de identidad o datos personales sensibles.',
            ],
          },
        ],
      },
      fr: {
        navLabel: 'Confidentialité',
        title: 'Politique de confidentialité',
        description: 'Comment SuperSites traite les entrées d’outils, les données essentielles du service, les limites analytics, la séparation publicitaire, les cookies, la conservation et les demandes de confidentialité dans le hub public.',
        updatedLabel: 'Révisé le 30 juin 2026',
        sections: [
          {
            heading: 'Catégories de données',
            paragraphs: [
              'SuperSites traite les informations nécessaires pour fournir les pages publiques et les outils gratuits : route visitée, langue, éléments de base du navigateur et de l’appareil, choix de consentement, signaux de sécurité et entrée envoyée par la personne dans un outil.',
            ],
          },
          {
            heading: 'Entrées des outils',
            paragraphs: [
              'Domaines, URLs, textes, fichiers, dates, nombres et détails métier servent à produire le résultat demandé. Les outils browser-first gardent les entrées compatibles sur l’appareil de la personne visiteuse. Les diagnostics publics nécessitant le réseau envoient seulement une cible limitée à l’API publique correspondante.',
            ],
          },
          {
            heading: 'Analytics et publicité',
            paragraphs: [
              'Analytics se limite à des événements produit assainis, comme route, langue, slug d’outil, type d’action et état de finalisation. Les événements excluent IP complète, e-mail, téléphone, nom, texte de document, contenu de fichier, réponses DNS, query strings d’URL et secrets envoyés. Les pages légales n’affichent pas de placements publicitaires, et le hub public ne charge pas de requêtes AdSense réelles tant que la monétisation est désactivée.',
            ],
          },
          {
            heading: 'Cookies et préférences',
            paragraphs: [
              'Le stockage essentiel conserve langue, consentement et préférences de service de base. Le stockage optionnel analytics ou publicitaire reste séparé des entrées d’outils et suit les contrôles de consentement décrits dans la Politique de cookies.',
            ],
          },
          {
            heading: 'Conservation et sécurité',
            paragraphs: [
              'Les résultats traités dans le navigateur restent sur l’appareil de la personne visiteuse, sauf téléchargement ou copie volontaire. Les logs serveur, caches et demandes diagnostiques limitées sont conservés seulement pour sécurité, prévention des abus, dépannage et fiabilité opérationnelle pendant la période pratique la plus courte.',
            ],
          },
          {
            heading: 'Droits et contact',
            paragraphs: [
              'Les personnes visiteuses peuvent demander accès, correction, suppression, revue du consentement ou explication de confidentialité via la page Contact. Indiquez produit, URL de page, langue, type de demande et adresse de réponse. Demandez un canal sécurisé avant d’envoyer documents d’identité ou données personnelles sensibles.',
            ],
          },
        ],
      },
      de: {
        navLabel: 'Datenschutz',
        title: 'Datenschutzerklärung',
        description: 'Wie SuperSites Tool-Eingaben, notwendige Servicedaten, Analytics-Grenzen, Werbetrennung, Cookies, Aufbewahrung und Datenschutzanfragen im öffentlichen Hub behandelt.',
        updatedLabel: 'Geprüft am 30. Juni 2026',
        sections: [
          {
            heading: 'Datenkategorien',
            paragraphs: [
              'SuperSites verarbeitet die Informationen, die für öffentliche Seiten und kostenlose Tools erforderlich sind: besuchte Route, Sprache, Browser- und Gerätebasisdaten, Einwilligungsoptionen, Sicherheitssignale und die Eingabe, die eine Person an ein Tool übermittelt.',
            ],
          },
          {
            heading: 'Tool-Eingaben',
            paragraphs: [
              'Domains, URLs, Text, Dateien, Datumswerte, Zahlen und Geschäftsdaten werden verwendet, um das angefragte Ergebnis zu erzeugen. Browser-first-Tools behalten unterstützte Eingaben auf dem Gerät der besuchenden Person. Öffentliche Diagnosen mit Netzwerkbedarf senden nur ein begrenztes Ziel an die passende öffentliche API.',
            ],
          },
          {
            heading: 'Analytics und Werbung',
            paragraphs: [
              'Analytics bleibt auf bereinigte Produktereignisse wie Route, Sprache, Tool-Slug, Aktionstyp und Abschlussstatus begrenzt. Ereignisse enthalten keine vollständigen IP-Adressen, E-Mail-Adressen, Telefonnummern, Namen, Dokumenttexte, Dateiinhalte, DNS-Antworten, URL-Query-Strings oder übermittelten Secrets. Rechtliche Seiten zeigen keine Anzeigenplacements, und der öffentliche Hub lädt keine echten AdSense-Requests, solange Monetarisierung ausgeschaltet ist.',
            ],
          },
          {
            heading: 'Cookies und Präferenzen',
            paragraphs: [
              'Essenzielle Speicherung hält Sprache, Einwilligung und grundlegende Servicepräferenzen fest. Optionale Analytics- oder Werbespeicherung bleibt von Tool-Eingaben getrennt und folgt den Einwilligungskontrollen in der Cookie-Richtlinie.',
            ],
          },
          {
            heading: 'Aufbewahrung und Sicherheit',
            paragraphs: [
              'Im Browser verarbeitete Ergebnisse bleiben auf dem Gerät der besuchenden Person, außer sie werden heruntergeladen oder kopiert. Serverlogs, Cache-Einträge und begrenzte Diagnoseanfragen werden nur für Sicherheit, Missbrauchsprävention, Fehlerbehebung und operative Zuverlässigkeit für den kürzesten praktikablen Zeitraum aufbewahrt.',
            ],
          },
          {
            heading: 'Rechte und Kontakt',
            paragraphs: [
              'Besuchende Personen können über die Kontaktseite Auskunft, Korrektur, Löschung, Einwilligungsprüfung oder eine Datenschutzerklärung anfragen. Geben Sie Produkt, Seiten-URL, Sprache, Anfragetyp und Antwortadresse an. Fragen Sie nach einem sicheren Kanal, bevor Ausweisdokumente oder sensible personenbezogene Daten gesendet werden.',
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
        description: 'How SuperSites uses necessary browser storage, local privacy choices, optional analytics signals and advertising controls across the catalog and tools.',
        updatedLabel: 'Reviewed June 26, 2026',
        sections: [
          {
            heading: 'Cookie categories',
            paragraphs: [
              'SuperSites separates necessary storage, preference storage, analytics storage and advertising storage. Necessary storage keeps the site usable; optional categories stay off until a visitor chooses them in this browser.',
            ],
          },
          {
            heading: 'Necessary storage',
            paragraphs: [
              'The Hub uses local storage for privacy choices and basic browser storage for language, route state and security-safe operation. Tool inputs and results are not stored in cookies by the Hub.',
            ],
          },
          {
            heading: 'Preference storage',
            paragraphs: [
              'Preference storage remembers voluntary choices such as language and consent settings on the same browser. Clearing site data resets those choices.',
            ],
          },
          {
            heading: 'Analytics storage',
            paragraphs: [
              'Analytics storage is off by default. When allowed, events are limited to page and interaction signals; tool content, raw inputs, emails and payment data stay out of analytics events.',
            ],
          },
          {
            heading: 'Advertising storage',
            paragraphs: [
              'Advertising storage is off by default. Public pages reserve inert advertising spaces only; no AdSense request, ad auction or third-party ad cookie is loaded from the Hub.',
            ],
          },
          {
            heading: 'Managing preferences',
            paragraphs: [
              'Use the privacy choices panel to change optional storage for this browser. Browser settings also clear or block cookies and local storage.',
            ],
            links: [
              {
                label: 'Manage privacy choices',
                href: '#consent-preferences',
                note: 'Open the local preferences panel for this browser.',
              },
            ],
          },
        ],
      },
      'pt-br': {
        navLabel: 'Cookies',
        title: 'Política de Cookies',
        description: 'Como o SuperSites usa armazenamento essencial do navegador, escolhas locais de privacidade, sinais opcionais de analytics e controles de publicidade no catálogo e nas ferramentas.',
        updatedLabel: 'Revisado em 26 de junho de 2026',
        sections: [
          {
            heading: 'Categorias de cookies',
            paragraphs: [
              'O SuperSites separa armazenamento necessário, preferências, analytics e publicidade. O necessário mantém o site utilizável; categorias opcionais ficam desligadas até a pessoa escolher neste navegador.',
            ],
          },
          {
            heading: 'Armazenamento necessário',
            paragraphs: [
              'O Hub usa armazenamento local para escolhas de privacidade e armazenamento básico do navegador para idioma, rota e operação segura. Entradas e resultados das ferramentas não são gravados em cookies pelo Hub.',
            ],
          },
          {
            heading: 'Preferências locais',
            paragraphs: [
              'O armazenamento de preferências lembra escolhas voluntárias, como idioma e consentimento, no mesmo navegador. Limpar dados do site reinicia essas escolhas.',
            ],
          },
          {
            heading: 'Armazenamento de analytics',
            paragraphs: [
              'Analytics fica desligado por padrão. Quando permitido, os eventos ficam limitados a páginas e interações; conteúdo das ferramentas, entradas brutas, e-mails e dados de pagamento ficam fora de analytics.',
            ],
          },
          {
            heading: 'Armazenamento de publicidade',
            paragraphs: [
              'Publicidade fica desligada por padrão. As páginas públicas reservam apenas espaços inertes; nenhum request AdSense, leilão de anúncio ou cookie de anúncio de terceiros é carregado pelo Hub.',
            ],
          },
          {
            heading: 'Gerenciar preferências',
            paragraphs: [
              'Use o painel de escolhas de privacidade para alterar armazenamento opcional neste navegador. As configurações do navegador também limpam ou bloqueiam cookies e armazenamento local.',
            ],
            links: [
              {
                label: 'Gerenciar escolhas de privacidade',
                href: '#consent-preferences',
                note: 'Abre o painel local de preferências deste navegador.',
              },
            ],
          },
        ],
      },
      es: {
        navLabel: 'Cookies',
        title: 'Política de Cookies',
        description: 'Cómo SuperSites usa almacenamiento necesario del navegador, opciones locales de privacidad, señales opcionales de analytics y controles de publicidad en el catálogo y las herramientas.',
        updatedLabel: 'Revisado el 26 de junio de 2026',
        sections: [
          {
            heading: 'Categorías de cookies',
            paragraphs: [
              'SuperSites separa almacenamiento necesario, preferencias, analytics y publicidad. Lo necesario mantiene el sitio usable; las categorías opcionales quedan apagadas hasta que la persona las elige en este navegador.',
            ],
          },
          {
            heading: 'Almacenamiento necesario',
            paragraphs: [
              'El Hub usa almacenamiento local para opciones de privacidad y almacenamiento básico del navegador para idioma, ruta y operación segura. Las entradas y resultados de herramientas no se guardan en cookies del Hub.',
            ],
          },
          {
            heading: 'Preferencias locales',
            paragraphs: [
              'El almacenamiento de preferencias recuerda opciones voluntarias, como idioma y consentimiento, en el mismo navegador. Borrar datos del sitio reinicia esas opciones.',
            ],
          },
          {
            heading: 'Almacenamiento de analytics',
            paragraphs: [
              'Analytics queda apagado por defecto. Cuando se permite, los eventos se limitan a páginas e interacciones; contenido de herramientas, entradas brutas, correos y datos de pago quedan fuera de analytics.',
            ],
          },
          {
            heading: 'Almacenamiento de publicidad',
            paragraphs: [
              'La publicidad queda apagada por defecto. Las páginas públicas reservan solo espacios inertes; el Hub no carga solicitudes AdSense, subastas de anuncios ni cookies publicitarias de terceros.',
            ],
          },
          {
            heading: 'Gestionar preferencias',
            paragraphs: [
              'Usa el panel de opciones de privacidad para cambiar almacenamiento opcional en este navegador. La configuración del navegador también borra o bloquea cookies y almacenamiento local.',
            ],
            links: [
              {
                label: 'Gestionar opciones de privacidad',
                href: '#consent-preferences',
                note: 'Abre el panel local de preferencias de este navegador.',
              },
            ],
          },
        ],
      },
      fr: {
        navLabel: 'Cookies',
        title: 'Politique de cookies',
        description: 'Comment SuperSites utilise le stockage nécessaire du navigateur, les choix locaux de confidentialité, les signaux analytics optionnels et les contrôles publicitaires dans le catalogue et les outils.',
        updatedLabel: 'Révisé le 26 juin 2026',
        sections: [
          {
            heading: 'Catégories de cookies',
            paragraphs: [
              "SuperSites sépare stockage nécessaire, préférences, analytics et publicité. Le stockage nécessaire garde le site utilisable; les catégories optionnelles restent désactivées jusqu'au choix exprimé dans ce navigateur.",
            ],
          },
          {
            heading: 'Stockage nécessaire',
            paragraphs: [
              'Le Hub utilise le stockage local pour les choix de confidentialité et le stockage de base du navigateur pour la langue, la route et une utilisation sûre. Les entrées et résultats des outils ne sont pas enregistrés dans les cookies du Hub.',
            ],
          },
          {
            heading: 'Préférences locales',
            paragraphs: [
              'Le stockage des préférences garde les choix volontaires, comme la langue et le consentement, dans le même navigateur. Effacer les données du site réinitialise ces choix.',
            ],
          },
          {
            heading: 'Stockage analytics',
            paragraphs: [
              'Analytics reste désactivé par défaut. Une fois autorisé, les événements restent limités aux pages et interactions; contenu des outils, entrées brutes, e-mails et données de paiement restent hors analytics.',
            ],
          },
          {
            heading: 'Stockage publicitaire',
            paragraphs: [
              'La publicité reste désactivée par défaut. Les pages publiques réservent seulement des espaces inertes; le Hub ne charge aucune requête AdSense, enchère publicitaire ni cookie publicitaire tiers.',
            ],
          },
          {
            heading: 'Gérer les préférences',
            paragraphs: [
              'Utilisez le panneau de choix de confidentialité pour modifier le stockage optionnel dans ce navigateur. Les paramètres du navigateur effacent ou bloquent aussi les cookies et le stockage local.',
            ],
            links: [
              {
                label: 'Gérer les choix de confidentialité',
                href: '#consent-preferences',
                note: 'Ouvre le panneau local de préférences de ce navigateur.',
              },
            ],
          },
        ],
      },
      de: {
        navLabel: 'Cookies',
        title: 'Cookie-Richtlinie',
        description: 'Wie SuperSites notwendigen Browserspeicher, lokale Datenschutzauswahl, optionale Analytics-Signale und Werbekontrollen im Katalog und in Tools nutzt.',
        updatedLabel: 'Geprüft am 26. Juni 2026',
        sections: [
          {
            heading: 'Cookie-Kategorien',
            paragraphs: [
              'SuperSites trennt notwendige Speicherung, Präferenzen, Analytics und Werbung. Notwendige Speicherung hält die Seite nutzbar; optionale Kategorien bleiben aus, bis eine Person sie in diesem Browser auswählt.',
            ],
          },
          {
            heading: 'Notwendige Speicherung',
            paragraphs: [
              'Der Hub nutzt lokalen Speicher für Datenschutzauswahl und einfachen Browserspeicher für Sprache, Route und sicheren Betrieb. Tool-Eingaben und Ergebnisse werden nicht in Hub-Cookies gespeichert.',
            ],
          },
          {
            heading: 'Lokale Präferenzen',
            paragraphs: [
              'Präferenzspeicher merkt sich freiwillige Auswahl wie Sprache und Einwilligung im selben Browser. Das Löschen von Websitedaten setzt diese Auswahl zurück.',
            ],
          },
          {
            heading: 'Analytics-Speicherung',
            paragraphs: [
              'Analytics ist standardmäßig aus. Nach Zustimmung bleiben Ereignisse auf Seiten und Interaktionen begrenzt; Tool-Inhalte, Rohdaten, E-Mails und Zahlungsdaten bleiben aus Analytics heraus.',
            ],
          },
          {
            heading: 'Werbespeicherung',
            paragraphs: [
              'Werbung ist standardmäßig aus. Öffentliche Seiten reservieren nur inerte Werbeflächen; der Hub lädt keine AdSense-Anfrage, Anzeigenauktion oder Werbe-Cookies Dritter.',
            ],
          },
          {
            heading: 'Präferenzen verwalten',
            paragraphs: [
              'Nutzen Sie das Datenschutzauswahl-Panel, um optionale Speicherung in diesem Browser zu ändern. Browsereinstellungen löschen oder blockieren Cookies und lokalen Speicher ebenfalls.',
            ],
            links: [
              {
                label: 'Datenschutzauswahl verwalten',
                href: '#consent-preferences',
                note: 'Öffnet das lokale Präferenz-Panel für diesen Browser.',
              },
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
        description: 'Public terms for lawful use, abuse prevention, free tool limits, informational results, future paid services and responsibility across SuperSites.',
        updatedLabel: 'Reviewed June 30, 2026',
        sections: [
          {
            heading: 'Permitted use',
            paragraphs: [
              'Use the public tools for lawful, practical tasks such as checking your own domains, formatting local files, preparing documents, comparing calculations and learning how a result was produced.',
              'The free public workflows remain available without mandatory account creation. Account features, saved history, automation and commercial volume are separate from the basic answer a visitor can get on the page.',
            ],
          },
          {
            heading: 'Abuse and prohibited activity',
            paragraphs: [
              'Do not use SuperSites to attack systems, test targets without authorization, submit illegal content, collect sensitive data, mislead people, infringe third-party rights, bypass limits, overload services, automate scraping, commit fraud or interfere with another person using the tools.',
              'Security reports, unsafe redirects, phishing, malware, impersonation, spam or other abuse concerns can be sent through the contact page with the affected URL and safe reproduction details.',
            ],
          },
          {
            heading: 'Tool limits',
            paragraphs: [
              'Free tools use fair limits so the public service stays available: browser memory, file size, request volume, network timeouts, record availability and regional resolver coverage can affect what a page can return.',
              'Results can be delayed, unavailable or incomplete when a browser blocks a feature, a network request fails, a public source is cached, a domain has no record, or a file is too large for local processing.',
            ],
          },
          {
            heading: 'Information and results',
            paragraphs: [
              'Diagnostics, calculators, document helpers and formatters provide informational output for everyday decisions. They are not legal, tax, financial, medical, security certification or professional advice.',
              'Verify important results with authoritative sources before changing DNS, sending invoices, making financial decisions, publishing documents, deleting metadata or relying on an uptime, email, IP or website signal.',
            ],
          },
          {
            heading: 'Future paid services',
            paragraphs: [
              'SuperSites currently presents the public tools here without checkout. Future paid services can cover higher limits, saved history, monitoring, batch work, API access, teams, automation, customization or removal of ads.',
              'When a paid service is offered, the payment surface presents price, renewal, quotas, taxes when applicable, cancellation, refund handling, support scope and provider terms before payment is accepted.',
            ],
          },
          {
            heading: 'Responsibility and contact',
            paragraphs: [
              'You remain responsible for the content you enter, the rights you have to test or process it, the decisions you make from the output and the local laws or third-party terms that apply to your work.',
              'SuperSites is maintained with reasonable care, but availability and accuracy can vary. Send corrections, privacy requests, accessibility issues, security reports or legal notices through the contact page.',
            ],
          },
        ],
      },
      'pt-br': {
        navLabel: 'Termos',
        title: 'Termos de Uso',
        description: 'Termos públicos para uso lícito, prevenção de abuso, limites gratuitos, resultados informativos, serviços pagos futuros e responsabilidade no SuperSites.',
        updatedLabel: 'Revisado em 30 de junho de 2026',
        sections: [
          {
            heading: 'Uso permitido',
            paragraphs: [
              'Use as ferramentas públicas para tarefas lícitas e práticas, como checar seus próprios domínios, formatar arquivos locais, preparar documentos, comparar cálculos e entender como um resultado foi produzido.',
              'Os fluxos gratuitos continuam disponíveis sem cadastro obrigatório. Recursos de conta, histórico salvo, automação e volume comercial ficam separados da resposta básica que a pessoa obtém na página.',
            ],
          },
          {
            heading: 'Abuso e atividades proibidas',
            paragraphs: [
              'Não use o SuperSites para atacar sistemas, testar alvos sem autorização, enviar conteúdo ilegal, coletar dados sensíveis, enganar pessoas, violar direitos de terceiros, burlar limites, sobrecarregar serviços, automatizar scraping, cometer fraude ou interferir no uso de outra pessoa.',
              'Relatos de segurança, redirecionamentos inseguros, phishing, malware, falsidade de identidade, spam ou outros abusos podem ser enviados pela página de contato com a URL afetada e detalhes seguros de reprodução.',
            ],
          },
          {
            heading: 'Limites das ferramentas',
            paragraphs: [
              'Ferramentas gratuitas usam limites justos para manter o serviço público disponível: memória do navegador, tamanho de arquivo, volume de solicitações, timeouts de rede, disponibilidade de registros e cobertura regional de resolvedores podem afetar a resposta.',
              'Resultados podem atrasar, falhar ou ficar incompletos quando o navegador bloqueia um recurso, uma requisição de rede falha, uma fonte pública está em cache, um domínio não tem registro ou um arquivo é grande demais para processamento local.',
            ],
          },
          {
            heading: 'Informações e resultados',
            paragraphs: [
              'Diagnósticos, calculadoras, auxiliares de documento e formatadores entregam saída informativa para decisões do dia a dia. Eles não substituem orientação jurídica, fiscal, financeira, médica, certificação de segurança ou aconselhamento profissional.',
              'Confirme resultados importantes em fontes oficiais antes de alterar DNS, enviar faturas, tomar decisões financeiras, publicar documentos, apagar metadados ou confiar em sinais de uptime, e-mail, IP ou website.',
            ],
          },
          {
            heading: 'Serviços pagos futuros',
            paragraphs: [
              'O SuperSites apresenta aqui as ferramentas públicas sem checkout. Serviços pagos futuros podem cobrir limites maiores, histórico salvo, monitoramento, lote, acesso por API, equipes, automação, personalização ou remoção de anúncios.',
              'Quando um serviço pago for oferecido, a superfície de pagamento apresenta preço, renovação, cotas, impostos quando aplicável, cancelamento, tratamento de reembolso, escopo de suporte e termos do provedor antes de aceitar pagamento.',
            ],
          },
          {
            heading: 'Responsabilidade e contato',
            paragraphs: [
              'Você continua responsável pelo conteúdo inserido, pelos direitos para testar ou processar esse conteúdo, pelas decisões tomadas a partir da saída e pelas leis locais ou termos de terceiros aplicáveis ao seu trabalho.',
              'O SuperSites é mantido com cuidado razoável, mas disponibilidade e precisão podem variar. Envie correções, pedidos de privacidade, problemas de acessibilidade, relatos de segurança ou avisos legais pela página de contato.',
            ],
          },
        ],
      },
      es: {
        navLabel: 'Términos',
        title: 'Términos de Uso',
        description: 'Términos públicos para uso lícito, prevención de abuso, límites gratuitos, resultados informativos, futuros servicios pagos y responsabilidad en SuperSites.',
        updatedLabel: 'Revisado el 30 de junio de 2026',
        sections: [
          {
            heading: 'Uso permitido',
            paragraphs: [
              'Usa las herramientas públicas para tareas lícitas y prácticas, como revisar tus propios dominios, formatear archivos locales, preparar documentos, comparar cálculos y entender cómo se produjo un resultado.',
              'Los flujos gratuitos siguen disponibles sin registro obligatorio. Funciones de cuenta, historial guardado, automatización y volumen comercial quedan separados de la respuesta básica que una persona obtiene en la página.',
            ],
          },
          {
            heading: 'Abuso y actividad prohibida',
            paragraphs: [
              'No uses SuperSites para atacar sistemas, probar objetivos sin autorización, enviar contenido ilegal, recolectar datos sensibles, engañar a personas, infringir derechos de terceros, eludir límites, sobrecargar servicios, automatizar scraping, cometer fraude o interferir con el uso de otra persona.',
              'Informes de seguridad, redirecciones inseguras, phishing, malware, suplantación, spam u otros abusos pueden enviarse desde la página de contacto con la URL afectada y detalles seguros de reproducción.',
            ],
          },
          {
            heading: 'Límites de las herramientas',
            paragraphs: [
              'Las herramientas gratuitas usan límites justos para mantener disponible el servicio público: memoria del navegador, tamaño de archivo, volumen de solicitudes, tiempos de espera de red, disponibilidad de registros y cobertura regional de resolvers pueden afectar la respuesta.',
              'Los resultados pueden retrasarse, fallar o quedar incompletos cuando el navegador bloquea una función, una solicitud de red falla, una fuente pública está en caché, un dominio no tiene registro o un archivo es demasiado grande para procesamiento local.',
            ],
          },
          {
            heading: 'Información y resultados',
            paragraphs: [
              'Diagnósticos, calculadoras, asistentes de documentos y formateadores entregan salida informativa para decisiones cotidianas. No sustituyen orientación legal, fiscal, financiera, médica, certificación de seguridad ni asesoría profesional.',
              'Verifica resultados importantes con fuentes oficiales antes de cambiar DNS, enviar facturas, tomar decisiones financieras, publicar documentos, borrar metadatos o confiar en señales de uptime, correo, IP o sitio web.',
            ],
          },
          {
            heading: 'Servicios pagos futuros',
            paragraphs: [
              'SuperSites presenta aquí las herramientas públicas sin checkout. Servicios pagos futuros pueden cubrir límites mayores, historial guardado, monitoreo, lote, acceso por API, equipos, automatización, personalización o eliminación de anuncios.',
              'Cuando se ofrezca un servicio pago, la superficie de pago presenta precio, renovación, cuotas, impuestos cuando apliquen, cancelación, tratamiento de reembolsos, alcance de soporte y términos del proveedor antes de aceptar el pago.',
            ],
          },
          {
            heading: 'Responsabilidad y contacto',
            paragraphs: [
              'Sigues siendo responsable por el contenido ingresado, los derechos para probarlo o procesarlo, las decisiones tomadas a partir de la salida y las leyes locales o términos de terceros aplicables a tu trabajo.',
              'SuperSites se mantiene con cuidado razonable, pero disponibilidad y precisión pueden variar. Envía correcciones, solicitudes de privacidad, problemas de accesibilidad, informes de seguridad o avisos legales desde la página de contacto.',
            ],
          },
        ],
      },
      fr: {
        navLabel: 'Conditions',
        title: 'Conditions d’utilisation',
        description: 'Conditions publiques pour usage licite, prévention des abus, limites gratuites, résultats informatifs, futurs services payants et responsabilité dans SuperSites.',
        updatedLabel: 'Révisé le 30 juin 2026',
        sections: [
          {
            heading: 'Utilisation autorisée',
            paragraphs: [
              'Utilisez les outils publics pour des tâches licites et pratiques, comme vérifier vos propres domaines, formater des fichiers locaux, préparer des documents, comparer des calculs et comprendre comment un résultat a été produit.',
              'Les flux gratuits restent disponibles sans compte obligatoire. Les fonctions de compte, historique enregistré, automatisation et volume commercial restent séparées de la réponse de base obtenue sur la page.',
            ],
          },
          {
            heading: 'Abus et activités interdites',
            paragraphs: [
              'N’utilisez pas SuperSites pour attaquer des systèmes, tester des cibles sans autorisation, envoyer du contenu illégal, collecter des données sensibles, tromper des personnes, porter atteinte aux droits de tiers, contourner les limites, surcharger les services, automatiser le scraping, frauder ou gêner l’usage d’une autre personne.',
              'Les signalements de sécurité, redirections dangereuses, phishing, malware, usurpation, spam ou autres abus peuvent être envoyés depuis la page de contact avec l’URL concernée et des détails de reproduction sûrs.',
            ],
          },
          {
            heading: 'Limites des outils',
            paragraphs: [
              'Les outils gratuits utilisent des limites équitables pour garder le service public disponible : mémoire du navigateur, taille de fichier, volume de requêtes, délais réseau, disponibilité des enregistrements et couverture régionale des résolveurs peuvent affecter la réponse.',
              'Les résultats peuvent être retardés, indisponibles ou incomplets quand une fonction du navigateur est indisponible, une requête réseau échoue, une source publique est en cache, un domaine n’a pas d’enregistrement ou un fichier dépasse le traitement local.',
            ],
          },
          {
            heading: 'Informations et résultats',
            paragraphs: [
              'Diagnostics, calculateurs, assistants de documents et formateurs fournissent une sortie informative pour les décisions courantes. Ils ne remplacent pas un conseil juridique, fiscal, financier, médical, une certification de sécurité ou un avis professionnel.',
              'Vérifiez les résultats importants auprès de sources officielles avant de modifier DNS, envoyer des factures, prendre des décisions financières, publier des documents, supprimer des métadonnées ou vous appuyer sur un signal uptime, e-mail, IP ou site web.',
            ],
          },
          {
            heading: 'Services payants futurs',
            paragraphs: [
              'SuperSites présente ici les outils publics sans checkout. De futurs services payants peuvent couvrir limites plus élevées, historique enregistré, surveillance, lots, accès API, équipes, automatisation, personnalisation ou suppression des annonces.',
              'Lorsqu’un service payant est proposé, la surface de paiement présente prix, renouvellement, quotas, taxes le cas échéant, annulation, traitement des remboursements, périmètre de support et termes fournisseur avant acceptation du paiement.',
            ],
          },
          {
            heading: 'Responsabilité et contact',
            paragraphs: [
              'Vous restez responsable du contenu saisi, des droits permettant de le tester ou le traiter, des décisions prises à partir de la sortie et des lois locales ou conditions tierces applicables à votre travail.',
              'SuperSites est maintenu avec un soin raisonnable, mais disponibilité et précision peuvent varier. Envoyez corrections, demandes de confidentialité, problèmes d’accessibilité, signalements de sécurité ou avis juridiques depuis la page de contact.',
            ],
          },
        ],
      },
      de: {
        navLabel: 'Nutzungsbedingungen',
        title: 'Nutzungsbedingungen',
        description: 'Öffentliche Bedingungen für rechtmäßige Nutzung, Missbrauchsschutz, kostenlose Tool-Grenzen, informative Ergebnisse, künftige bezahlte Dienste und Verantwortung bei SuperSites.',
        updatedLabel: 'Geprüft am 30. Juni 2026',
        sections: [
          {
            heading: 'Erlaubte Nutzung',
            paragraphs: [
              'Nutzen Sie die öffentlichen Tools für rechtmäßige, praktische Aufgaben wie das Prüfen eigener Domains, Formatieren lokaler Dateien, Vorbereiten von Dokumenten, Vergleichen von Berechnungen und Verstehen eines Ergebnisses.',
              'Die kostenlosen Workflows bleiben ohne Pflichtkonto verfügbar. Konto-Funktionen, gespeicherter Verlauf, Automatisierung und kommerzielles Volumen sind von der Grundantwort auf der Seite getrennt.',
            ],
          },
          {
            heading: 'Missbrauch und verbotene Aktivität',
            paragraphs: [
              'Nutzen Sie SuperSites nicht für Angriffe, Tests ohne Autorisierung, illegale Inhalte, Sammlung sensibler Daten, Irreführung, Verletzung von Rechten Dritter, Umgehung von Limits, Überlastung von Diensten, automatisiertes Scraping, Betrug oder Störung anderer Nutzer.',
              'Sicherheitsmeldungen, unsichere Weiterleitungen, Phishing, Malware, Identitätsmissbrauch, Spam oder andere Missbrauchshinweise können über die Kontaktseite mit betroffener URL und sicheren Reproduktionsdetails gesendet werden.',
            ],
          },
          {
            heading: 'Grenzen der Tools',
            paragraphs: [
              'Kostenlose Tools verwenden faire Grenzen, damit der öffentliche Dienst verfügbar bleibt: Browserspeicher, Dateigröße, Anfragevolumen, Netzwerk-Timeouts, Verfügbarkeit von Einträgen und regionale Resolver-Abdeckung können die Antwort beeinflussen.',
              'Ergebnisse können verzögert, nicht verfügbar oder unvollständig sein, wenn der Browser eine Funktion blockiert, eine Netzwerkanfrage fehlschlägt, eine öffentliche Quelle gecacht ist, eine Domain keinen Eintrag hat oder eine Datei für lokale Verarbeitung zu groß ist.',
            ],
          },
          {
            heading: 'Informationen und Ergebnisse',
            paragraphs: [
              'Diagnosen, Rechner, Dokumenthelfer und Formatter liefern informative Ausgaben für Alltagsentscheidungen. Sie ersetzen keine rechtliche, steuerliche, finanzielle, medizinische, sicherheitszertifizierende oder professionelle Beratung.',
              'Prüfen Sie wichtige Ergebnisse bei maßgeblichen Quellen, bevor Sie DNS ändern, Rechnungen senden, finanzielle Entscheidungen treffen, Dokumente veröffentlichen, Metadaten löschen oder sich auf Uptime-, E-Mail-, IP- oder Website-Signale verlassen.',
            ],
          },
          {
            heading: 'Künftige kostenpflichtige Dienste',
            paragraphs: [
              'SuperSites zeigt die öffentlichen Tools hier ohne Checkout. Künftige kostenpflichtige Dienste können höhere Limits, gespeicherten Verlauf, Monitoring, Stapelarbeit, API-Zugang, Teams, Automatisierung, Anpassung oder Entfernung von Werbung umfassen.',
              'Wenn ein kostenpflichtiger Dienst angeboten wird, zeigt die Zahlungsfläche Preis, Verlängerung, Quoten, Steuern falls anwendbar, Kündigung, Erstattungsabwicklung, Supportumfang und Anbieterbedingungen vor Annahme der Zahlung.',
            ],
          },
          {
            heading: 'Verantwortung und Kontakt',
            paragraphs: [
              'Sie bleiben verantwortlich für eingegebene Inhalte, die Rechte zum Testen oder Verarbeiten, Entscheidungen aus der Ausgabe und lokale Gesetze oder Drittbedingungen, die für Ihre Arbeit gelten.',
              'SuperSites wird mit angemessener Sorgfalt gepflegt, aber Verfügbarkeit und Genauigkeit können variieren. Senden Sie Korrekturen, Datenschutzanfragen, Barrierefreiheitsprobleme, Sicherheitsmeldungen oder rechtliche Hinweise über die Kontaktseite.',
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
        description: 'How SuperSites explains network checks, calculators, documents, images, email diagnostics and website results in practical public tools.',
        updatedLabel: 'Reviewed June 30, 2026',
        sections: [
          {
            heading: 'Network and DNS',
            paragraphs: [
              'Network tools combine the value entered by the visitor with DNS records, IP data, SSL certificate details, RDAP fields, response timing and resolver answers that are available during the request.',
              'Results explain the observed answer, the source used, the time of the check and the limits of the measurement. DNS propagation can vary by resolver, cache, record type, TTL and regional availability.',
            ],
          },
          {
            heading: 'Calculators',
            paragraphs: [
              'Calculator pages show the inputs used in the formula and keep the free answer visible before deeper scenario work. Rounding, currency labels and time periods are shown next to the result when they affect interpretation.',
              'Financial and business calculators provide informational estimates for planning. Important tax, legal, investment or credit decisions belong with qualified professionals and current official sources.',
            ],
          },
          {
            heading: 'Documents and PDF',
            paragraphs: [
              'Document tools favor browser-side processing when it reduces collection. Inputs, generated files, page counts, merge order and extraction choices are presented so the visitor can inspect the result before using it.',
              'Template helpers explain which fields were supplied by the visitor and which parts are examples. The output remains a draft until the visitor checks names, values, dates, taxes, signatures and local requirements.',
            ],
          },
          {
            heading: 'Images',
            paragraphs: [
              'Image tools display source dimensions, output format, size changes and processing choices such as compression, resizing, cropping and metadata removal.',
              'Visual quality depends on the original file, chosen format, compression level, transparency, color profile and browser support. The preview helps compare the output before download.',
            ],
          },
          {
            heading: 'Email deliverability',
            paragraphs: [
              'Email diagnostics read public DNS records such as SPF, DKIM, DMARC and MX, then explain the record found, missing pieces, syntax problems and common alignment issues.',
              'Deliverability depends on mailbox providers, sending reputation, authentication alignment, content, complaints and policy configuration. Record checks are one signal, not a guarantee that every message reaches an inbox.',
            ],
          },
          {
            heading: 'Website checks',
            paragraphs: [
              'Website tools inspect the public response available to the browser or service at check time: status code, redirects, headers, robots.txt, sitemap hints, timing and security-related signals.',
              'A single check can be affected by cache, hosting region, rate limits, firewall rules, CDN behavior and temporary network conditions. Repeating a check and comparing with authoritative dashboards gives a clearer picture.',
            ],
          },
        ],
      },
      'pt-br': {
        navLabel: 'Metodologia',
        title: 'Metodologia',
        description: 'Como o SuperSites explica diagnósticos de rede, calculadoras, documentos, imagens, e-mail e resultados de website em ferramentas públicas práticas.',
        updatedLabel: 'Revisado em 30 de junho de 2026',
        sections: [
          {
            heading: 'Rede e DNS',
            paragraphs: [
              'Ferramentas de rede combinam o valor informado pelo visitante com registros DNS, dados de IP, detalhes de certificado SSL, campos RDAP, tempo de resposta e respostas de resolvedores disponíveis durante a consulta.',
              'Os resultados explicam a resposta observada, a fonte usada, o horário da checagem e os limites da medição. Propagação DNS varia por resolvedor, cache, tipo de registro, TTL e disponibilidade regional.',
            ],
          },
          {
            heading: 'Calculadoras',
            paragraphs: [
              'Páginas de calculadora mostram as entradas usadas na fórmula e mantêm a resposta gratuita visível antes de cenários mais detalhados. Arredondamento, moeda e período aparecem junto do resultado quando mudam a interpretação.',
              'Calculadoras financeiras e empresariais entregam estimativas informativas para simulações. Decisões fiscais, jurídicas, de investimento ou crédito pertencem a profissionais qualificados e fontes oficiais atuais.',
            ],
          },
          {
            heading: 'Documentos e PDF',
            paragraphs: [
              'Ferramentas de documentos priorizam processamento no navegador quando isso reduz coleta. Entradas, arquivos gerados, contagem de páginas, ordem de união e escolhas de extração aparecem para inspeção antes do uso.',
              'Auxiliares de modelo explicam quais campos vieram do visitante e quais partes são exemplos. A saída continua sendo rascunho até a conferência de nomes, valores, datas, impostos, assinaturas e exigências locais.',
            ],
          },
          {
            heading: 'Imagens',
            paragraphs: [
              'Ferramentas de imagem exibem dimensões de origem, formato de saída, mudança de tamanho e escolhas de processamento como compressão, redimensionamento, corte e remoção de metadados.',
              'A qualidade visual depende do arquivo original, formato escolhido, nível de compressão, transparência, perfil de cor e suporte do navegador. O preview ajuda a comparar o resultado antes do download.',
            ],
          },
          {
            heading: 'Entregabilidade de e-mail',
            paragraphs: [
              'Diagnósticos de e-mail leem registros DNS públicos como SPF, DKIM, DMARC e MX, depois explicam o registro encontrado, partes ausentes, problemas de sintaxe e desalinhamentos comuns.',
              'Entregabilidade depende de provedores de caixa postal, reputação de envio, alinhamento de autenticação, conteúdo, reclamações e configuração de políticas. Checar registros é um sinal, não uma garantia de caixa de entrada.',
            ],
          },
          {
            heading: 'Checagens de website',
            paragraphs: [
              'Ferramentas de website inspecionam a resposta pública disponível ao navegador ou serviço no momento da checagem: status code, redirecionamentos, headers, robots.txt, pistas de sitemap, tempo e sinais de segurança.',
              'Uma checagem isolada pode sofrer efeito de cache, região da hospedagem, limites de taxa, regras de firewall, comportamento de CDN e condições temporárias de rede. Repetir e comparar com painéis oficiais dá uma visão mais clara.',
            ],
          },
        ],
      },
      es: {
        navLabel: 'Metodología',
        title: 'Metodología',
        description: 'Cómo SuperSites explica diagnósticos de red, calculadoras, documentos, imágenes, correo y resultados de sitios web en herramientas públicas prácticas.',
        updatedLabel: 'Revisado el 30 de junio de 2026',
        sections: [
          {
            heading: 'Red y DNS',
            paragraphs: [
              'Las herramientas de red combinan el valor ingresado por el visitante con registros DNS, datos de IP, detalles de certificados SSL, campos RDAP, tiempos de respuesta y respuestas de resolutores disponibles durante la consulta.',
              'Los resultados explican la respuesta observada, la fuente usada, la hora de la comprobación y los límites de la medición. La propagación DNS varía por resolutor, caché, tipo de registro, TTL y disponibilidad regional.',
            ],
          },
          {
            heading: 'Calculadoras',
            paragraphs: [
              'Las páginas de calculadora muestran las entradas usadas en la fórmula y mantienen la respuesta gratuita visible antes del trabajo con escenarios más detallados. Redondeo, moneda y período aparecen junto al resultado cuando afectan la interpretación.',
              'Las calculadoras financieras y empresariales entregan estimaciones informativas para planificación. Decisiones fiscales, legales, de inversión o crédito corresponden a profesionales calificados y fuentes oficiales actuales.',
            ],
          },
          {
            heading: 'Documentos y PDF',
            paragraphs: [
              'Las herramientas de documentos priorizan el procesamiento en el navegador cuando reduce la recolección. Entradas, archivos generados, conteo de páginas, orden de unión y opciones de extracción aparecen para inspección antes del uso.',
              'Los asistentes de plantillas explican qué campos aportó el visitante y qué partes son ejemplos. La salida sigue siendo un borrador hasta revisar nombres, valores, fechas, impuestos, firmas y requisitos locales.',
            ],
          },
          {
            heading: 'Imágenes',
            paragraphs: [
              'Las herramientas de imagen muestran dimensiones de origen, formato de salida, cambios de tamaño y decisiones de procesamiento como compresión, redimensionamiento, recorte y eliminación de metadatos.',
              'La calidad visual depende del archivo original, formato elegido, nivel de compresión, transparencia, perfil de color y soporte del navegador. La vista previa ayuda a comparar el resultado antes de descargar.',
            ],
          },
          {
            heading: 'Entregabilidad de correo',
            paragraphs: [
              'Los diagnósticos de correo leen registros DNS públicos como SPF, DKIM, DMARC y MX, luego explican el registro encontrado, piezas ausentes, problemas de sintaxis y desalineaciones comunes.',
              'La entregabilidad depende de proveedores de buzón, reputación de envío, alineación de autenticación, contenido, quejas y configuración de políticas. Revisar registros es una señal, no una garantía de llegada a la bandeja de entrada.',
            ],
          },
          {
            heading: 'Comprobaciones de sitios web',
            paragraphs: [
              'Las herramientas de sitios web inspeccionan la respuesta pública disponible para el navegador o servicio en el momento de la comprobación: código de estado, redirecciones, headers, robots.txt, pistas de sitemap, tiempos y señales de seguridad.',
              'Una comprobación aislada puede verse afectada por caché, región del hosting, límites de tasa, reglas de firewall, comportamiento de CDN y condiciones temporales de red. Repetir y comparar con paneles oficiales ofrece una imagen más clara.',
            ],
          },
        ],
      },
      fr: {
        navLabel: 'Méthodologie',
        title: 'Méthodologie',
        description: 'Comment SuperSites explique les diagnostics réseau, calculateurs, documents, images, e-mail et résultats de sites web dans des outils publics pratiques.',
        updatedLabel: 'Révisé le 30 juin 2026',
        sections: [
          {
            heading: 'Réseau et DNS',
            paragraphs: [
              'Les outils réseau combinent la valeur saisie par le visiteur avec les enregistrements DNS, données IP, détails de certificat SSL, champs RDAP, temps de réponse et réponses de résolveurs disponibles pendant la requête.',
              'Les résultats expliquent la réponse observée, la source utilisée, l’heure de la vérification et les limites de la mesure. La propagation DNS varie selon le résolveur, le cache, le type d’enregistrement, le TTL et la disponibilité régionale.',
            ],
          },
          {
            heading: 'Calculateurs',
            paragraphs: [
              'Les pages de calculateur affichent les entrées utilisées dans la formule et gardent la réponse gratuite visible avant les scénarios plus détaillés. Arrondi, devise et période accompagnent le résultat quand ils changent l’interprétation.',
              'Les calculateurs financiers et métiers fournissent des estimations informatives pour la planification. Les décisions fiscales, juridiques, d’investissement ou de crédit relèvent de professionnels qualifiés et de sources officielles actuelles.',
            ],
          },
          {
            heading: 'Documents et PDF',
            paragraphs: [
              'Les outils de documents privilégient le traitement dans le navigateur quand cela réduit la collecte. Entrées, fichiers générés, nombre de pages, ordre de fusion et choix d’extraction restent visibles pour inspection avant usage.',
              'Les assistants de modèles indiquent quels champs viennent du visiteur et quelles parties sont des exemples. La sortie reste un brouillon jusqu’à la vérification des noms, valeurs, dates, taxes, signatures et exigences locales.',
            ],
          },
          {
            heading: 'Images',
            paragraphs: [
              'Les outils d’image affichent dimensions source, format de sortie, changements de taille et choix de traitement comme compression, redimensionnement, recadrage et suppression de métadonnées.',
              'La qualité visuelle dépend du fichier original, du format choisi, du niveau de compression, de la transparence, du profil colorimétrique et du support du navigateur. L’aperçu aide à comparer le résultat avant téléchargement.',
            ],
          },
          {
            heading: 'Délivrabilité e-mail',
            paragraphs: [
              'Les diagnostics e-mail lisent les enregistrements DNS publics comme SPF, DKIM, DMARC et MX, puis expliquent l’enregistrement trouvé, les éléments absents, les erreurs de syntaxe et les problèmes d’alignement courants.',
              'La délivrabilité dépend des fournisseurs de boîtes mail, de la réputation d’envoi, de l’alignement d’authentification, du contenu, des plaintes et de la configuration des politiques. Le contrôle des enregistrements est un signal, pas une garantie d’arrivée en boîte de réception.',
            ],
          },
          {
            heading: 'Contrôles de sites web',
            paragraphs: [
              'Les outils de site web inspectent la réponse publique disponible pour le navigateur ou le service au moment du contrôle : code de statut, redirections, headers, robots.txt, indices de sitemap, temps et signaux de sécurité.',
              'Un contrôle isolé peut être affecté par le cache, la région d’hébergement, les limites de taux, les règles de pare-feu, le comportement CDN et les conditions réseau temporaires. Répéter et comparer avec des tableaux de bord officiels donne une image plus claire.',
            ],
          },
        ],
      },
      de: {
        navLabel: 'Methodik',
        title: 'Methodik',
        description: 'Wie SuperSites Netzwerkprüfungen, Rechner, Dokumente, Bilder, E-Mail-Diagnosen und Website-Ergebnisse in praktischen öffentlichen Tools erklärt.',
        updatedLabel: 'Geprüft am 30. Juni 2026',
        sections: [
          {
            heading: 'Netzwerk und DNS',
            paragraphs: [
              'Netzwerk-Tools verbinden die vom Besucher eingegebene Angabe mit DNS-Einträgen, IP-Daten, SSL-Zertifikatsdetails, RDAP-Feldern, Antwortzeiten und Resolver-Antworten, die während der Anfrage verfügbar sind.',
              'Die Ergebnisse erklären die beobachtete Antwort, die verwendete Quelle, den Zeitpunkt der Prüfung und die Grenzen der Messung. DNS-Propagation variiert nach Resolver, Cache, Eintragstyp, TTL und regionaler Verfügbarkeit.',
            ],
          },
          {
            heading: 'Rechner',
            paragraphs: [
              'Rechnerseiten zeigen die Eingaben der Formel und halten die kostenlose Antwort sichtbar, bevor detailliertere Szenarien folgen. Rundung, Währung und Zeitraum stehen beim Ergebnis, wenn sie die Interpretation verändern.',
              'Finanz- und Geschäftsrechner liefern informative Schätzungen für Planung. Steuerliche, rechtliche, Investment- oder Kreditentscheidungen gehören zu qualifizierten Fachleuten und aktuellen offiziellen Quellen.',
            ],
          },
          {
            heading: 'Dokumente und PDF',
            paragraphs: [
              'Dokument-Tools bevorzugen Verarbeitung im Browser, wenn dadurch weniger Daten gesammelt werden. Eingaben, erzeugte Dateien, Seitenanzahl, Zusammenführungsreihenfolge und Extraktionsauswahl bleiben vor der Nutzung sichtbar.',
              'Vorlagenhelfer zeigen, welche Felder vom Besucher stammen und welche Teile Beispiele sind. Das Ergebnis bleibt ein Entwurf, bis Namen, Werte, Daten, Steuern, Signaturen und lokale Anforderungen geprüft sind.',
            ],
          },
          {
            heading: 'Bilder',
            paragraphs: [
              'Bild-Tools zeigen Quelldimensionen, Ausgabeformat, Größenänderungen und Verarbeitungsauswahl wie Kompression, Skalierung, Zuschnitt und Entfernung von Metadaten.',
              'Visuelle Qualität hängt von Originaldatei, gewähltem Format, Kompressionsstufe, Transparenz, Farbprofil und Browserunterstützung ab. Die Vorschau hilft beim Vergleich vor dem Download.',
            ],
          },
          {
            heading: 'E-Mail-Zustellbarkeit',
            paragraphs: [
              'E-Mail-Diagnosen lesen öffentliche DNS-Einträge wie SPF, DKIM, DMARC und MX und erklären den gefundenen Eintrag, fehlende Teile, Syntaxprobleme und häufige Ausrichtungsfehler.',
              'Zustellbarkeit hängt von Mailbox-Anbietern, Senderreputation, Authentifizierungsausrichtung, Inhalt, Beschwerden und Richtlinieneinstellungen ab. Eintragsprüfungen sind ein Signal, keine Garantie für den Posteingang.',
            ],
          },
          {
            heading: 'Website-Prüfungen',
            paragraphs: [
              'Website-Tools prüfen die öffentliche Antwort, die Browser oder Dienst im Moment der Prüfung erreichen: Statuscode, Weiterleitungen, Header, robots.txt, Sitemap-Hinweise, Timing und sicherheitsbezogene Signale.',
              'Eine einzelne Prüfung kann durch Cache, Hosting-Region, Ratenlimits, Firewall-Regeln, CDN-Verhalten und vorübergehende Netzwerkbedingungen beeinflusst werden. Wiederholung und Vergleich mit offiziellen Dashboards ergeben ein klareres Bild.',
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
              'Important pages should show a review date and accept corrections. Claims about data, policies, account features or legal obligations must be checked against current authoritative sources before publication.',
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
              'Páginas importantes devem mostrar data de revisão e aceitar correções. Afirmações sobre dados, políticas, recursos de conta ou obrigações legais precisam ser checadas em fontes atuais e oficiais antes da publicação.',
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
              'Las páginas importantes deben mostrar fecha de revisión y aceptar correcciones. Afirmaciones sobre datos, políticas, funciones de cuenta u obligaciones legales deben verificarse en fuentes oficiales vigentes.',
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
              'Les pages importantes doivent afficher une date de revision et accepter les corrections. Les affirmations sur donnees, politiques, fonctions de compte ou obligations legales doivent etre verifiees aupres de sources officielles actuelles.',
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
              'Wichtige Seiten sollen ein Review-Datum zeigen und Korrekturen annehmen. Aussagen zu Daten, Policies, Konto-Funktionen oder rechtlichen Pflichten muessen vor Veroeffentlichung mit aktuellen offiziellen Quellen geprueft werden.',
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
              'The Hub, NetProbe Atlas and the nine product apps are published under the `/supersites/` URL family with HTTPS, localized pages, public sitemaps and stable static paths.',
            ],
          },
          {
            heading: 'Current operating limits',
            paragraphs: [
              'The public tools provide free, no-signup utility workflows first. Advanced accounts, paid upgrades, clearly labeled advertising, recurring automation and provider imports are not active on public pages yet.',
            ],
          },
          {
            heading: 'What is checked',
            paragraphs: [
              'Public validation uses release artifacts, browser checks, API health checks where applicable, crawler evidence and documentation records before a surface is treated as ready for wider traffic.',
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
              'O Hub, o NetProbe Atlas e os nove apps de produto estão publicados na família de URLs `/supersites/`, com HTTPS, páginas localizadas, sitemaps públicos e caminhos estáticos estáveis.',
            ],
          },
          {
            heading: 'Limites operacionais atuais',
            paragraphs: [
              'As ferramentas públicas entregam primeiro fluxos gratuitos sem cadastro. Contas avançadas, upgrades pagos, publicidade identificada, automação recorrente e importações de provedores ainda não estão ativos nas páginas públicas.',
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
              'El Hub, NetProbe Atlas y las nueve apps de producto están publicados bajo la familia de URLs `/supersites/`, con HTTPS, páginas localizadas, sitemaps públicos y rutas estáticas estables.',
            ],
          },
          {
            heading: 'Límites operativos actuales',
            paragraphs: [
              'Las herramientas públicas entregan primero flujos gratuitos sin registro. Cuentas avanzadas, upgrades pagos, publicidad identificada, automatización recurrente e importaciones de proveedores aún no están activos en páginas públicas.',
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
              'Le Hub, NetProbe Atlas et les neuf applications produit sont publies sous la famille `/supersites/`, avec HTTPS, pages localisees, sitemaps publics et chemins statiques stables.',
            ],
          },
          {
            heading: 'Limites opérationnelles actuelles',
            paragraphs: [
              'Les outils publics fournissent d abord des workflows gratuits sans compte. Comptes avances, offres payantes, publicite identifiee, automatisation recurrente et imports de fournisseurs ne sont pas actifs sur les pages publiques.',
            ],
          },
          {
            heading: 'Ce qui est vérifié',
            paragraphs: [
              'La validation publique utilise artefacts de release, controles navigateur, sante API si applicable, preuves de crawler et dossiers documentes avant de considerer une surface prete pour plus de trafic.',
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
              'Hub, NetProbe Atlas und die neun Produkt-Apps sind unter der URL-Familie `/supersites/` veroeffentlicht, mit HTTPS, lokalisierten Seiten, oeffentlichen Sitemaps und stabilen statischen Pfaden.',
            ],
          },
          {
            heading: 'Aktuelle Betriebsgrenzen',
            paragraphs: [
              'Die oeffentlichen Tools liefern zuerst kostenlose Workflows ohne Pflichtkonto. Erweiterte Konten, bezahlte Upgrades, gekennzeichnete Werbung, wiederkehrende Automatisierung und Provider-Imports sind auf oeffentlichen Seiten noch nicht aktiv.',
            ],
          },
          {
            heading: 'Was geprüft wird',
            paragraphs: [
              'Oeffentliche Validierung nutzt Pruef-Artefakte, Browser-Pruefungen, API-Gesundheit falls relevant, Crawler-Evidenz und Dokumentation, bevor eine Oberflaeche fuer mehr Traffic bereit gilt.',
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

export function getLegalShellCopy(locale: LocaleCode): LegalShellCopy {
  return sanitizePublicCopy(locale, legalShellCopy[locale])
}

export function getLegalPageCopy(page: LegalPage, locale: LocaleCode): LocalizedLegalPage {
  if (
    page.slug === 'about' ||
    page.slug === 'contact' ||
    page.slug === 'privacy' ||
    page.slug === 'cookies' ||
    page.slug === 'terms' ||
    page.slug === 'methodology'
  ) {
    return sanitizePublicCopy(locale, page.localized[locale])
  }

  return buildTrustPageCopy(locale, page.slug, sanitizePublicCopy(locale, page.localized[locale]), trustProfile)
}
