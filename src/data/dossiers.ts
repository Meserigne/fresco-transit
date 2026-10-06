export type EventKey = "opened" | "freight" | "arrival" | "customs" | "delivery";

export type DossierEvent = {
  key: EventKey;
  date: string | null;
  place: string;
  state: "done" | "current" | "upcoming";
  note: { fr: string; en: string };
};

export type PublicInvoice = {
  number: string;
  kind: "facture" | "proforma";
  title: string;
  amount: number;
  discount: number;
  paid: number;
  status: string;
  issuedOn: string;
  dueOn: string;
};

export type Dossier = {
  reference: string;
  bl: string;
  container: string;
  client: string;
  direction: "import" | "export";
  mode: "sea" | "air" | "road";
  goods: string;
  origin: string;
  destination: string;
  status: EventKey;
  updatedAt: string;
  sample: boolean;
  events: DossierEvent[];
  eta?: string;
  situation?: { fr: string; en: string };
  invoices?: PublicInvoice[];
  invoiceOnly?: boolean;
};

export const dossiers: Dossier[] = [
  {
    reference: "FT-2026-0142",
    bl: "HLCUABJ260142",
    container: "MSCU1234567",
    client: "Société exemple",
    direction: "import",
    mode: "sea",
    goods: "Pièces détachées",
    origin: "Le Havre",
    destination: "Abidjan",
    status: "customs",
    updatedAt: "2026-10-02",
    sample: true,
    events: [
      {
        key: "opened",
        date: "2026-09-12",
        place: "Abidjan",
        state: "done",
        note: {
          fr: "Dossier ouvert et pièces reçues.",
          en: "File opened and documents received.",
        },
      },
      {
        key: "freight",
        date: "2026-09-18",
        place: "Le Havre",
        state: "done",
        note: {
          fr: "Conteneur embarqué.",
          en: "Container loaded on the vessel.",
        },
      },
      {
        key: "arrival",
        date: "2026-10-01",
        place: "Abidjan",
        state: "done",
        note: {
          fr: "Navire arrivé au port.",
          en: "Vessel arrived at the port.",
        },
      },
      {
        key: "customs",
        date: "2026-10-02",
        place: "Abidjan",
        state: "current",
        note: {
          fr: "Formalités en cours avec un commissionnaire en douane agréé.",
          en: "Formalities in progress with a licensed customs broker.",
        },
      },
      {
        key: "delivery",
        date: null,
        place: "Abidjan",
        state: "upcoming",
        note: {
          fr: "Livraison après mainlevée.",
          en: "Delivery after customs release.",
        },
      },
    ],
  },
  {
    reference: "FT-2026-0208",
    bl: "125-98765421",
    container: "",
    client: "Société exemple",
    direction: "export",
    mode: "air",
    goods: "Échantillons",
    origin: "Abidjan",
    destination: "Paris",
    status: "freight",
    updatedAt: "2026-10-03",
    sample: true,
    events: [
      {
        key: "opened",
        date: "2026-10-01",
        place: "Abidjan",
        state: "done",
        note: {
          fr: "Dossier aérien ouvert.",
          en: "Air freight file opened.",
        },
      },
      {
        key: "freight",
        date: "2026-10-03",
        place: "Abidjan",
        state: "current",
        note: {
          fr: "Marchandise remise au fret aérien.",
          en: "Cargo handed over to air freight.",
        },
      },
      {
        key: "arrival",
        date: null,
        place: "Paris",
        state: "upcoming",
        note: { fr: "Arrivée prévue.", en: "Arrival expected." },
      },
      {
        key: "customs",
        date: null,
        place: "Paris",
        state: "upcoming",
        note: {
          fr: "Formalités à l’arrivée.",
          en: "Formalities on arrival.",
        },
      },
      {
        key: "delivery",
        date: null,
        place: "Paris",
        state: "upcoming",
        note: {
          fr: "Remise au destinataire.",
          en: "Handover to the consignee.",
        },
      },
    ],
  },
];
