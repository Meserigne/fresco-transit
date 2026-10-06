export const company = {
  name: "Fresco Transit",
  phoneDisplay: "+225 27 21 72 68 73",
  phoneTel: "+2252721726873",
  email: "infos@frescotransit.com",
  addressLines: [
    "Immeuble Balance, boulevard Giscard d’Estaing",
    "Face à Solibra, 2e étage, porte 4",
    "Treichville, Abidjan",
    "03 BPM 396 Abidjan 03",
    "Côte d’Ivoire",
  ],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Immeuble%20Balance%20boulevard%20Giscard%20d%27Estaing%20Treichville%20Abidjan",
} as const;

export const socials = [
  { key: "facebook", href: "https://www.facebook.com/frescotransit", label: "Facebook" },
  { key: "instagram", href: "https://www.instagram.com/frescotransit/", label: "Instagram" },
  { key: "tiktok", href: "https://www.tiktok.com/@frescotransit", label: "TikTok" },
] as const;

export const cta = {
  href: "/contact",
} as const;

export const loginHref = "/connexion";

export const nav = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/a-propos", key: "about" },
  { href: "/suivi", key: "tracking" },
] as const;

export const legalNav = [
  { href: "/conditions-generales", key: "terms" },
  { href: "/confidentialite", key: "privacy" },
  { href: "/cookies", key: "cookies" },
  { href: "/preferences-cookies", key: "cookiePrefs" },
  { href: "/soumissions-non-sollicitees", key: "unsolicited" },
] as const;

export const services = [
  { id: "fret-maritime" },
  { id: "fret-aerien" },
  { id: "groupage" },
  { id: "declaration-douane" },
  { id: "transport" },
  { id: "degroupage" },
  { id: "assistance" },
] as const;

export const serviceVisuals: Record<
  (typeof services)[number]["id"],
  { src: string; alt: string; position?: string }
> = {
  "fret-maritime": {
    src: "/images/port.jpg",
    alt: "Porte-conteneurs à quai sous les portiques d’un terminal.",
  },
  "fret-aerien": {
    src: "/images/air.jpg",
    alt: "Aile d’un avion au-dessus des nuages.",
  },
  groupage: {
    src: "/images/groupage.jpg",
    alt: "Palettes de cartons regroupées dans un entrepôt.",
  },
  "declaration-douane": {
    src: "/images/douane-dossier.jpg",
    alt: "Une femme consulte un dossier de documents.",
    position: "30% center",
  },
  transport: {
    src: "/images/truck.jpg",
    alt: "Poids lourd sur une route, pour le transport de marchandises.",
  },
  degroupage: {
    src: "/images/degroupage.jpg",
    alt: "Allée d’entrepôt où les lots sont rangés avant livraison.",
  },
  assistance: {
    src: "/images/assistance-echange.jpg",
    alt: "Deux femmes échangent autour d’un ordinateur portable.",
    position: "center 28%",
  },
};

export const values = [
  {
    title: "Écoute",
    text: "Chaque dossier commence par comprendre l’opération et le besoin du client.",
  },
  {
    title: "Efficacité",
    text: "Les pièces, le fret et les intervenants sont alignés pour faire avancer le dossier.",
  },
  {
    title: "Rapidité",
    text: "Les demandes sont prises en charge sans délai inutile, de jour comme de nuit.",
  },
  {
    title: "Professionnalisme",
    text: "La coordination se fait avec les ports, les transporteurs, les entrepôts et la douane.",
  },
  {
    title: "Rigueur",
    text: "Le suivi reste précis, de l’ouverture du dossier jusqu’à la livraison.",
  },
] as const;

export const steps = [
  {
    title: "Accueillir",
    text: "Vous êtes écouté, 24h/24, et le besoin est cadré avant toute mise en œuvre.",
  },
  {
    title: "Traiter",
    text: "Le fret, les pièces et les formalités sont préparés avec les partenaires de l’opération.",
  },
  {
    title: "Accompagner",
    text: "Vous êtes tenu informé jusqu’à la remise de la marchandise.",
  },
] as const;

export const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
