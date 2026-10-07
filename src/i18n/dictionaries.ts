import type { Locale } from "@/i18n/locale";

const dictionaries = {
  fr: {
    meta: {
      defaultTitle: "Fresco Transit | Transit, import et export à Abidjan",
      defaultDescription:
        "Fresco Transit assure le fret maritime et aérien, la douane, le groupage et la livraison depuis Abidjan, 24h/24.",
      contactTitle: "Nous contacter",
      contactDescription:
        "Contactez Fresco Transit à Treichville : téléphone, e-mail et formulaire. Équipe disponible 24h/24.",
      servicesTitle: "Services",
      servicesDescription:
        "Fret maritime, fret aérien, groupage, dégroupage, douane, transport et assistance. Les prestations de Fresco Transit à Abidjan.",
      aboutTitle: "À propos",
      aboutDescription:
        "Fresco Transit, société de transit basée à Treichville, Abidjan.",
      trackingTitle: "Suivi de dossier",
      trackingDescription:
        "Suivez un dossier Fresco Transit avec la référence, le connaissement ou le numéro de conteneur.",
    },
    chrome: {
      skip: "Aller au contenu",
      navLabel: "Principal",
      mobileLabel: "Mobile",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      footerNav: "Pied de page",
      legalNav: "Informations légales",
      office: "Siège",
      reach: "Joindre l’équipe",
      available: "Disponible 24h/24",
      hours: "24h/24",
      language: "Langue",
      login: "Connexion",
      social: "Réseaux sociaux",
      backToTop: "Retour en haut",
    },
    assistant: {
      open: "Assistant",
      close: "Fermer l’assistant",
      title: "Assistant Fresco Transit",
      lead: "Questions sur le fret, la douane, le suivi ou le contact.",
      placeholder: "Votre question",
      send: "Envoyer",
      greeting:
        "Bonjour. Je peux vous orienter sur les prestations, le siège et la page de suivi.",
      note: "Une réponse oriente. Elle ne vaut pas devis.",
      error: "La réponse n’a pas abouti. Appelez le +225 27 21 72 68 73 ou écrivez à infos@frescotransit.com.",
      pending: "Réponse en cours",
    },
    nav: {
      home: "Accueil",
      services: "Services",
      about: "À propos",
      tracking: "Suivi",
      contact: "Nous contacter",
    },
    legalNav: {
      terms: "Conditions générales",
      privacy: "Notification de confidentialité des données",
      cookies: "Politique relative aux cookies",
      cookiePrefs: "Préférences relatives aux cookies",
      unsolicited: "Politique relative aux soumissions non sollicitées",
    },
    home: {
      title: "Le transit, suivi jusqu’au bout.",
      lead: "Fret maritime et aérien, douane et livraison. Une équipe à Abidjan, joignable 24h/24.",
      heroAlt: "Porte-conteneurs à quai sous les portiques d’un terminal.",
      servicesTitle: "Les prestations",
      servicesLead:
        "Du fret à la douane, la prise en charge couvre l’import et l’export, en Côte d’Ivoire et à l’international.",
      worldTitle: "D’Abidjan vers l’international",
      worldLead:
        "Le siège est à Treichville. Les opérations s’étendent au-delà de la Côte d’Ivoire, avec des partenaires et des clients dans d’autres pays.",
      worldAlt: "Allées d’un entrepôt et rayonnages de marchandises.",
      steps: [
        {
          title: "Accueillir",
          text: "Vous êtes écouté, 24h/24, et le besoin est cadré avant toute mise en œuvre.",
          action: "Nous contacter",
        },
        {
          title: "Traiter",
          text: "Le fret, les pièces et les formalités sont préparés avec les partenaires de l’opération.",
          action: "Services",
        },
        {
          title: "Accompagner",
          text: "Vous êtes tenu informé jusqu’à la remise de la marchandise.",
          action: "À propos",
        },
      ],
      values: [
        ["Écoute", "Comprendre l’opération avant d’agir."],
        ["Efficacité", "Aligner pièces, fret et intervenants."],
        ["Rapidité", "Prendre le dossier sans délai inutile."],
        ["Professionnalisme", "Coordonner ports, transport et douane."],
        ["Rigueur", "Suivre le dossier jusqu’à la livraison."],
      ],
    },
    trackingForm: {
      title: "Suivi de dossier",
      hint: "Numéro de suivi, dossier, facture, connaissement ou conteneur.",
      placeholder: "Ex. FT-2026-0142",
      label: "Référence",
      submit: "Suivre",
      required: "Indiquez une référence.",
      example: "Exemples : FT-2026-0142, une facture ou un numéro de conteneur.",
    },
    trackingPage: {
      title: "Suivi de dossier",
      lead: "Retrouvez l’avancement de votre opération : fret, douane et livraison.",
      notFoundTitle: "Aucun dossier pour cette référence.",
      notFound:
        "Vérifiez la référence, le connaissement ou le conteneur. Si le dossier vient d’être ouvert, l’équipe peut le confirmer.",
      sample: "Dossier d’exemple, pour montrer le suivi en ligne.",
      fields: {
        client: "Client",
        direction: "Sens",
        mode: "Mode",
        goods: "Marchandise",
        origin: "Origine",
        destination: "Destination",
        bl: "Connaissement",
        container: "Conteneur",
        updated: "Dernière mise à jour",
        situation: "Situation",
        eta: "Arrivée prévue",
      },
      direction: { import: "Import", export: "Export" },
      mode: { sea: "Maritime", air: "Aérien", road: "Routier" },
      events: {
        opened: "Dossier ouvert",
        freight: "Fret",
        arrival: "Arrivée",
        customs: "Douane",
        delivery: "Livraison",
      },
      states: { done: "Fait", current: "En cours", upcoming: "À venir" },
      noDate: "Date à confirmer",
      timeline: "Étapes",
      emptyBl: "Non communiqué",
      emptyContainer: "Sans conteneur",
      invoicesTitle: "Factures et proformas",
      invoicesLead: "Pièces du client lié à cette référence.",
      invoicesEmpty: "Aucune facture n'est encore enregistrée pour ce client.",
      invoiceOnly: "Cette facture n'est pas encore liée à un dossier de suivi.",
      invoiceKind: { facture: "Facture", proforma: "Proforma" },
      invoiceStatus: {
        brouillon: "Brouillon",
        envoyee: "Envoyée",
        emise: "Émise",
        payee: "Payée",
        partielle: "Partiellement payée",
        retard: "En retard",
        annulee: "Annulée",
      },
      amount: "Montant",
      discount: "Remise",
      paid: "Déjà réglé",
      balance: "Reste à payer",
      issued: "Émise le",
      due: "Échéance",
    },
    services: {
      introTitle: "Ce que nous prenons en charge",
      intro:
        "Fresco Transit couvre le transit, la consignation, la manutention, l’emmagasinage, le fret et le transport de marchandises.",
      nav: "Prestations",
      close: "Pour confier un dossier, appelez le",
      closeOr: "ou écrivez à",
      items: {
        "fret-maritime": {
          title: "Fret maritime",
          summary:
            "Organisation et suivi des expéditions par mer, avec les compagnies et les terminaux.",
          detail:
            "Nous organisons et suivons les opérations d’importation et d’exportation par voie maritime. La coordination se fait avec les compagnies maritimes, les consignataires, les manutentionnaires et les terminaux portuaires.",
        },
        "fret-aerien": {
          title: "Fret aérien",
          summary: "Acheminement par avion lorsque le délai ne permet pas d’attendre le navire.",
          detail:
            "Le fret aérien concerne les envois pour lesquels le délai compte. Nous préparons le dossier et suivons l’acheminement jusqu’à l’arrivée de la marchandise.",
        },
        groupage: {
          title: "Groupage",
          summary: "Regroupement de marchandises pour un conteneur ou un vol partagé.",
          detail:
            "Le groupage réunit plusieurs envois dans un même conteneur ou sur un même vol. Il s’applique au fret maritime comme au fret aérien.",
        },
        "declaration-douane": {
          title: "Déclaration en douane",
          summary:
            "Suivi des formalités par l’intermédiaire d’un commissionnaire en douane agréé.",
          detail:
            "Les formalités douanières sont suivies par l’intermédiaire d’un commissionnaire en douane agréé. Nous préparons les pièces et tenons le dossier nécessaire aux opérateurs.",
        },
        transport: {
          title: "Transport et livraison",
          summary: "Acheminement routier et remise des marchandises au lieu convenu.",
          detail:
            "Le transport couvre l’acheminement des marchandises, y compris le transit routier, jusqu’au lieu convenu avec le client.",
        },
        degroupage: {
          title: "Dégroupage et livraison",
          summary: "Réception des lots groupés, puis ventilation vers chaque destinataire.",
          detail:
            "Au dégroupage, le lot commun est réceptionné, séparé, puis livré à chaque destinataire. Le suivi reste attaché au dossier d’origine.",
        },
        assistance: {
          title: "Assistance et conseils",
          summary: "Écoute, suivi du dossier et accompagnement à l’import comme à l’export.",
          detail:
            "L’équipe reste joignable pour expliquer l’avancement, répondre aux questions et accompagner le client pendant toute l’opération, à l’importation comme à l’exportation.",
        },
      },
    },
    images: {
      "fret-maritime": "Porte-conteneurs à quai sous les portiques d’un terminal.",
      "fret-aerien": "Aile d’un avion au-dessus des nuages.",
      groupage: "Palettes de cartons regroupées dans un entrepôt.",
      "declaration-douane": "Une femme consulte un dossier de documents.",
      transport: "Poids lourd sur une route, pour le transport de marchandises.",
      degroupage: "Allée d’entrepôt où les lots sont rangés avant livraison.",
      assistance: "Deux femmes échangent autour d’un ordinateur portable.",
      truck: "Poids lourd sur une route, pour le transport de marchandises.",
    },
    about: {
      title: "Une équipe à votre disposition",
      lead: "Spécialisée dans le transit, la manutention, la consignation et le transport, au niveau national comme à l’international, Fresco Transit met une équipe jeune et expérimentée à la disposition de ses clients, 24h/24.",
      p1: "L’équipe écoute, accueille, traite les dossiers et accompagne les démarches d’importation et d’exportation, avec un souci d’efficacité, de rapidité et de satisfaction.",
      p2: "En Côte d’Ivoire, la société a pour objet l’importation et l’exportation de produits, ainsi que la consignation, la manutention, l’emmagasinage, le fret et le transport de marchandises.",
      p3: "Des partenaires et des clients lui font confiance ici, et dans d’autres pays.",
      office: "Siège",
    },
    contact: {
      title: "Nous contacter",
      lead: "Décrivez votre opération. Vous pouvez aussi appeler ou écrire directement. L’équipe est disponible 24h/24.",
      office: "Siège",
      map: "Voir l’itinéraire",
    },
    contactForm: {
      name: "Nom",
      company: "Société",
      optional: "facultatif",
      email: "E-mail",
      emailHelp: "Nous répondons sur cette adresse.",
      phone: "Téléphone",
      message: "Message",
      placeholder: "Nature de l’envoi, sens import ou export, lieu de départ et d’arrivée.",
      submit: "Envoyer le message",
      sending: "Envoi en cours.",
      sent: "Votre message a été envoyé. Nous vous répondons à l’adresse indiquée.",
      error: "L’envoi n’a pas abouti. Écrivez directement à",
      nameError: "Indiquez votre nom.",
      emailError: "Indiquez une adresse e-mail valide.",
      messageError: "Décrivez votre opération en quelques mots.",
    },
    notFound: {
      title: "Cette page n’existe pas.",
      text: "L’adresse est introuvable. Revenez à l’accueil pour retrouver les prestations et le contact.",
      home: "Accueil",
    },
    legal: {
      terms: {
        title: "Conditions générales",
        intro:
          "Ces conditions régissent l’usage du site. Une prestation de transit n’est engagée qu’après accord écrit.",
        sections: [
          {
            title: "Éditeur",
            paragraphs: [
              "Le site est édité par Fresco Transit, dont le siège est à Treichville, Abidjan, Côte d’Ivoire. Contact : {email}, {phone}.",
            ],
          },
          {
            title: "Usage du site",
            paragraphs: [
              "Les pages présentent les activités de transit, d’import, d’export et de logistique. Elles ne constituent ni une offre ferme, ni un devis, ni un engagement de délai ou de tarif.",
            ],
          },
          {
            title: "Prestations",
            paragraphs: [
              "Toute opération est cadrée par écrit : nature de la marchandise, sens import ou export, lieux, et pièces à fournir. Les formalités douanières sont suivies par l’intermédiaire d’un commissionnaire en douane agréé.",
            ],
          },
          {
            title: "Suivi en ligne",
            paragraphs: [
              "La page Suivi affiche l’état d’un dossier à partir de la référence, du connaissement ou du conteneur. Elle informe sur l’avancement. Elle ne remplace pas les documents de transport.",
            ],
          },
          {
            title: "Demandes envoyées depuis le site",
            paragraphs: [
              "Le formulaire de contact ouvre la messagerie du visiteur. Le message n’est transmis que si cette messagerie l’envoie à {email}. Une réponse n’est pas un contrat.",
            ],
          },
          {
            title: "Droit applicable",
            paragraphs: [
              "Le site est soumis au droit de la Côte d’Ivoire. Pour une question, écrivez à {email}.",
            ],
          },
        ],
      },
      privacy: {
        title: "Notification de confidentialité des données",
        intro: "Cette page décrit les données liées au site, au suivi et aux demandes adressées à Fresco Transit.",
        sections: [
          {
            title: "Responsable",
            paragraphs: ["Fresco Transit, siège à Treichville, Abidjan. Contact : {email}, {phone}."],
          },
          {
            title: "Données concernées",
            paragraphs: [
              "Le site ne crée pas de compte. Le formulaire de contact ouvre un e-mail vers {email}. Les champs remplis ne sont reçus que si vous envoyez ce message.",
              "La recherche de suivi envoie la référence saisie afin d’afficher le dossier correspondant. Elle ne crée pas de compte.",
              "L’assistant du site envoie le texte de la question à un service d’intelligence artificielle pour rédiger une réponse. Fresco Transit ne conserve pas cet échange. N’y indiquez pas de données sensibles.",
            ],
          },
          {
            title: "Usage",
            paragraphs: [
              "Ces informations servent à répondre à une demande ou à afficher l’état d’un dossier. Elles ne sont pas vendues.",
            ],
          },
          {
            title: "Vos demandes",
            paragraphs: [
              "Vous pouvez demander l’accès, la rectification ou l’effacement des informations vous concernant, dans la limite de ce que la loi impose de garder. Écrivez à {email}.",
            ],
          },
        ],
      },
      cookies: {
        title: "Politique relative aux cookies",
        intro:
          "Un cookie est un petit fichier qu’un site peut enregistrer dans le navigateur. Ce site n’en dépose pas pour mesurer la visite.",
        sections: [
          {
            title: "Langue",
            paragraphs: [
              "Lorsque vous choisissez le français ou l’anglais, le site enregistre un cookie nommé locale. Il contient seulement fr ou en, pendant un an, afin de réafficher la même langue.",
            ],
          },
          {
            title: "Ce que le site ne dépose pas",
            paragraphs: [
              "Aucun cookie de mesure d’audience, de publicité ou de réseau social n’est utilisé. Le suivi de dossier ne dépose pas de cookie.",
            ],
          },
          {
            title: "Votre navigateur",
            paragraphs: [
              "Le navigateur peut garder l’historique ou le cache des pages. Vous pouvez l’effacer dans ses paramètres.",
            ],
          },
        ],
      },
      cookiePrefs: {
        title: "Préférences relatives aux cookies",
        intro: "Le seul cookie du site mémorise la langue. Il n’y a pas de mesure d’audience à accepter.",
        categories: [
          {
            name: "Langue",
            state: "Cookie locale, nécessaire",
            detail: "Enregistre fr ou en pour un an. Le bouton FR / EN le met à jour.",
          },
          {
            name: "Mesure d’audience",
            state: "Non utilisé",
            detail: "Aucune statistique de visite n’est collectée par un cookie.",
          },
          {
            name: "Publicité",
            state: "Non utilisé",
            detail: "Aucun cookie publicitaire n’est déposé.",
          },
        ],
        more: "Le détail est dans la politique relative aux cookies.",
      },
      unsolicited: {
        title: "Politique relative aux soumissions non sollicitées",
        intro:
          "Cette page concerne les idées, concepts ou documents envoyés sans que Fresco Transit les ait demandés.",
        sections: [
          {
            title: "Propositions spontanées",
            paragraphs: [
              "Une proposition commerciale spontanée, une idée de service, un concept ou un texte envoyé sans demande préalable n’ouvre aucun engagement. Fresco Transit n’est pas tenu d’y répondre, de le rémunérer, ni de le garder confidentiel.",
            ],
          },
          {
            title: "Une demande d’opération",
            paragraphs: [
              "Pour un fret, une formalité ou une livraison, utilisez la page Nous contacter, le {phone}, ou {email}. Le suivi d’un dossier déjà ouvert se fait avec sa référence.",
            ],
          },
        ],
      },
    },
  },
  en: {
    meta: {
      defaultTitle: "Fresco Transit | Freight forwarding in Abidjan",
      defaultDescription:
        "Fresco Transit handles sea and air freight, customs, groupage and delivery from Abidjan, around the clock.",
      contactTitle: "Contact us",
      contactDescription:
        "Contact Fresco Transit in Treichville by phone, email or form. The team is available around the clock.",
      servicesTitle: "Services",
      servicesDescription:
        "Sea freight, air freight, groupage, degroupage, customs, transport and support. Fresco Transit services in Abidjan.",
      aboutTitle: "About",
      aboutDescription:
        "Fresco Transit, a forwarding company based in Treichville, Abidjan.",
      trackingTitle: "Shipment tracking",
      trackingDescription:
        "Track a Fresco Transit file with the reference, bill of lading or container number.",
    },
    chrome: {
      skip: "Skip to content",
      navLabel: "Main",
      mobileLabel: "Mobile",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      footerNav: "Footer",
      legalNav: "Legal",
      office: "Office",
      reach: "Reach the team",
      available: "Available around the clock",
      hours: "24/7",
      language: "Language",
      login: "Sign in",
      social: "Social media",
      backToTop: "Back to top",
    },
    assistant: {
      open: "Assistant",
      close: "Close the assistant",
      title: "Fresco Transit assistant",
      lead: "Questions on freight, customs, tracking or contact.",
      placeholder: "Your question",
      send: "Send",
      greeting: "Hello. I can point you to the services, the office and the tracking page.",
      note: "A reply is guidance. It is not a quote.",
      error: "The reply did not come through. Call +225 27 21 72 68 73 or write to infos@frescotransit.com.",
      pending: "Reply in progress",
    },
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      tracking: "Tracking",
      contact: "Contact us",
    },
    legalNav: {
      terms: "Terms and conditions",
      privacy: "Data privacy notice",
      cookies: "Cookie policy",
      cookiePrefs: "Cookie preferences",
      unsolicited: "Unsolicited submissions policy",
    },
    home: {
      title: "Forwarding, followed through.",
      lead: "Sea and air freight, customs and delivery. A team in Abidjan, available around the clock.",
      heroAlt: "Container ship alongside the cranes of a terminal.",
      servicesTitle: "Services",
      servicesLead:
        "From freight to customs, the work covers import and export, in Côte d’Ivoire and abroad.",
      worldTitle: "From Abidjan to international trade",
      worldLead:
        "The office is in Treichville. Operations reach beyond Côte d’Ivoire, with partners and clients in other countries.",
      worldAlt: "Warehouse aisles and racks of goods.",
      steps: [
        {
          title: "Listen",
          text: "You are heard around the clock, and the need is framed before any work starts.",
          action: "Contact us",
        },
        {
          title: "Handle",
          text: "Freight, documents and formalities are prepared with the partners on the job.",
          action: "Services",
        },
        {
          title: "Stay with you",
          text: "You are kept informed until the goods are handed over.",
          action: "About",
        },
      ],
      values: [
        ["Listening", "Understand the job before acting."],
        ["Efficiency", "Line up documents, freight and partners."],
        ["Speed", "Take the file without wasted delay."],
        ["Professionalism", "Coordinate ports, transport and customs."],
        ["Care", "Follow the file through to delivery."],
      ],
    },
    trackingForm: {
      title: "Track a file",
      hint: "Tracking number, file, invoice, bill of lading or container.",
      placeholder: "e.g. FT-2026-0142",
      label: "Reference",
      submit: "Track",
      required: "Enter a reference.",
      example: "Examples: FT-2026-0142, an invoice or a container number.",
    },
    trackingPage: {
      title: "Track a file",
      lead: "See where your shipment stands: freight, customs and delivery.",
      notFoundTitle: "No file matches this reference.",
      notFound:
        "Check the reference, bill of lading or container number. If the file was just opened, the team can confirm it.",
      sample: "Sample file, shown so you can try online tracking.",
      fields: {
        client: "Client",
        direction: "Direction",
        mode: "Mode",
        goods: "Cargo",
        origin: "Origin",
        destination: "Destination",
        bl: "Bill of lading",
        container: "Container",
        updated: "Last update",
        situation: "Status",
        eta: "Expected arrival",
      },
      direction: { import: "Import", export: "Export" },
      mode: { sea: "Sea", air: "Air", road: "Road" },
      events: {
        opened: "File opened",
        freight: "Freight",
        arrival: "Arrival",
        customs: "Customs",
        delivery: "Delivery",
      },
      states: { done: "Done", current: "In progress", upcoming: "Upcoming" },
      noDate: "Date to be confirmed",
      timeline: "Milestones",
      emptyBl: "Not provided",
      emptyContainer: "No container",
      invoicesTitle: "Invoices and proformas",
      invoicesLead: "Documents for the client linked to this reference.",
      invoicesEmpty: "No invoice is recorded yet for this client.",
      invoiceOnly: "This invoice is not linked to a tracking file yet.",
      invoiceKind: { facture: "Invoice", proforma: "Proforma" },
      invoiceStatus: {
        brouillon: "Draft",
        envoyee: "Sent",
        emise: "Issued",
        payee: "Paid",
        partielle: "Partly paid",
        retard: "Overdue",
        annulee: "Cancelled",
      },
      amount: "Amount",
      discount: "Discount",
      paid: "Paid",
      balance: "Balance due",
      issued: "Issued on",
      due: "Due date",
    },
    services: {
      introTitle: "What we handle",
      intro:
        "Fresco Transit covers forwarding, ship agency, handling, warehousing, freight and the transport of goods.",
      nav: "Services",
      close: "To hand over a file, call",
      closeOr: "or write to",
      items: {
        "fret-maritime": {
          title: "Sea freight",
          summary: "Planning and follow-up of shipments by sea, with carriers and terminals.",
          detail:
            "We organise and follow import and export movements by sea. Coordination runs with shipping lines, agents, handlers and port terminals.",
        },
        "fret-aerien": {
          title: "Air freight",
          summary: "Carriage by air when the deadline cannot wait for a vessel.",
          detail:
            "Air freight is for shipments where time matters. We prepare the file and follow the movement until the cargo arrives.",
        },
        groupage: {
          title: "Groupage",
          summary: "Combining cargo into a shared container or flight.",
          detail:
            "Groupage brings several shipments into one container or one flight. It applies to sea freight and to air freight.",
        },
        "declaration-douane": {
          title: "Customs declaration",
          summary: "Formalities followed through a licensed customs broker.",
          detail:
            "Customs formalities are followed through a licensed customs broker. We prepare the papers and keep the file the operators need.",
        },
        transport: {
          title: "Transport and delivery",
          summary: "Road carriage and handover at the agreed place.",
          detail:
            "Transport covers moving the goods, including road transit, to the place agreed with the client.",
        },
        degroupage: {
          title: "Degroupage and delivery",
          summary: "Receiving grouped lots, then splitting them to each consignee.",
          detail:
            "On degroupage, the shared lot is received, separated, then delivered to each consignee. Follow-up stays tied to the original file.",
        },
        assistance: {
          title: "Support and advice",
          summary: "Listening, file follow-up and guidance on import and export.",
          detail:
            "The team stays reachable to explain progress, answer questions and stay with the client through the whole job, on import and on export.",
        },
      },
    },
    images: {
      "fret-maritime": "Container ship alongside the cranes of a terminal.",
      "fret-aerien": "Aircraft wing above the clouds.",
      groupage: "Pallets of cartons grouped in a warehouse.",
      "declaration-douane": "A woman reviewing a file of documents.",
      transport: "A truck on a road, for the carriage of goods.",
      degroupage: "Warehouse aisle where lots are stored before delivery.",
      assistance: "Two women talking through a file, with a laptop.",
      truck: "A truck on a road, for the carriage of goods.",
    },
    about: {
      title: "A team at your disposal",
      lead: "Specialised in forwarding, handling, ship agency and transport, in Côte d’Ivoire and abroad, Fresco Transit puts a young and experienced team at its clients’ disposal, around the clock.",
      p1: "The team listens, welcomes, handles files and stays with import and export steps, with care for efficiency, speed and satisfaction.",
      p2: "In Côte d’Ivoire, the company’s purpose is the import and export of goods, together with ship agency, handling, warehousing, freight and the transport of cargo.",
      p3: "Partners and clients trust the company here, and in other countries.",
      office: "Office",
    },
    contact: {
      title: "Contact us",
      lead: "Describe your shipment. You can also call or write directly. The team is available around the clock.",
      office: "Office",
      map: "See the route",
    },
    contactForm: {
      name: "Name",
      company: "Company",
      optional: "optional",
      email: "Email",
      emailHelp: "We reply to this address.",
      phone: "Phone",
      message: "Message",
      placeholder: "Type of cargo, import or export, place of departure and arrival.",
      submit: "Send the message",
      sending: "Sending.",
      sent: "Your message has been sent. We reply to the address you entered.",
      error: "The message could not be sent. Write directly to",
      nameError: "Enter your name.",
      emailError: "Enter a valid email address.",
      messageError: "Describe your shipment in a few words.",
    },
    notFound: {
      title: "This page does not exist.",
      text: "The address cannot be found. Go back home for the services and the contact details.",
      home: "Home",
    },
    legal: {
      terms: {
        title: "Terms and conditions",
        intro:
          "These terms govern use of the site. A forwarding job starts only after a written agreement.",
        sections: [
          {
            title: "Publisher",
            paragraphs: [
              "The site is published by Fresco Transit, with its office in Treichville, Abidjan, Côte d’Ivoire. Contact: {email}, {phone}.",
            ],
          },
          {
            title: "Use of the site",
            paragraphs: [
              "The pages present forwarding, import, export and logistics. They are not a firm offer, a quotation, or a promise of timing or price.",
            ],
          },
          {
            title: "Services",
            paragraphs: [
              "Every job is set out in writing: the goods, import or export, places, and the papers required. Customs formalities are followed through a licensed customs broker.",
            ],
          },
          {
            title: "Online tracking",
            paragraphs: [
              "The tracking page shows the status of a file from the reference, bill of lading or container number. It reports progress. It does not replace the transport documents.",
            ],
          },
          {
            title: "Messages sent from the site",
            paragraphs: [
              "The contact form opens the visitor’s mail app. The message is sent only if that app delivers it to {email}. A reply is not a contract.",
            ],
          },
          {
            title: "Governing law",
            paragraphs: ["The site is governed by the law of Côte d’Ivoire. For a question, write to {email}."],
          },
        ],
      },
      privacy: {
        title: "Data privacy notice",
        intro: "This page describes data linked to the site, to tracking and to messages sent to Fresco Transit.",
        sections: [
          {
            title: "Controller",
            paragraphs: ["Fresco Transit, office in Treichville, Abidjan. Contact: {email}, {phone}."],
          },
          {
            title: "Data involved",
            paragraphs: [
              "The site does not create an account. The contact form opens an email to {email}. The fields are received only if you send that message.",
              "A tracking search sends the reference you type so the matching file can be shown. It does not create an account.",
              "The site assistant sends the text of a question to an artificial intelligence service in order to draft a reply. Fresco Transit does not keep that exchange. Do not include sensitive data.",
            ],
          },
          {
            title: "Use",
            paragraphs: [
              "This information is used to answer a request or to show the status of a file. It is not sold.",
            ],
          },
          {
            title: "Your requests",
            paragraphs: [
              "You can ask for access, correction or deletion of information about you, within what the law requires us to keep. Write to {email}.",
            ],
          },
        ],
      },
      cookies: {
        title: "Cookie policy",
        intro:
          "A cookie is a small file a site can store in the browser. This site does not use one to measure visits.",
        sections: [
          {
            title: "Language",
            paragraphs: [
              "When you choose French or English, the site stores a cookie named locale. It holds only fr or en, for one year, so the same language is shown again.",
            ],
          },
          {
            title: "What the site does not store",
            paragraphs: [
              "No analytics, advertising or social-network cookie is used. File tracking does not set a cookie.",
            ],
          },
          {
            title: "Your browser",
            paragraphs: [
              "The browser may keep page history or cache on its own. You can clear that in its settings.",
            ],
          },
        ],
      },
      cookiePrefs: {
        title: "Cookie preferences",
        intro: "The only cookie on the site remembers the language. There is no analytics choice to accept.",
        categories: [
          {
            name: "Language",
            state: "locale cookie, required",
            detail: "Stores fr or en for one year. The FR / EN control updates it.",
          },
          {
            name: "Analytics",
            state: "Not used",
            detail: "No visit statistics are collected with a cookie.",
          },
          {
            name: "Advertising",
            state: "Not used",
            detail: "No advertising cookie is stored.",
          },
        ],
        more: "Details are in the cookie policy.",
      },
      unsolicited: {
        title: "Unsolicited submissions policy",
        intro: "This page covers ideas, concepts or documents sent without Fresco Transit having asked for them.",
        sections: [
          {
            title: "Unasked proposals",
            paragraphs: [
              "An unasked commercial proposal, service idea, concept or text does not create any duty. Fresco Transit does not have to answer, pay for it, or keep it confidential.",
            ],
          },
          {
            title: "A real shipment request",
            paragraphs: [
              "For freight, a formality or a delivery, use the Contact us page, {phone}, or {email}. An open file is tracked with its reference.",
            ],
          },
        ],
      },
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)["fr"];

export function dictionaryFor(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary;
}
