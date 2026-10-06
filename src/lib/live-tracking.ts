import { existsSync } from "node:fs";
import path from "node:path";
import type { Dossier, DossierEvent, EventKey, PublicInvoice } from "@/data/dossiers";

const steps: EventKey[] = ["opened", "freight", "arrival", "customs", "delivery"];

const notes: Record<EventKey, { fr: string; en: string }> = {
  opened: { fr: "Dossier ouvert.", en: "File opened." },
  freight: { fr: "Fret pris en charge.", en: "Freight in hand." },
  arrival: { fr: "Arrivée enregistrée.", en: "Arrival recorded." },
  customs: {
    fr: "Formalités suivies avec un commissionnaire en douane agréé.",
    en: "Formalities followed with a licensed customs broker.",
  },
  delivery: { fr: "Remise de la marchandise.", en: "Goods handed over." },
};

function normalize(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

function managerSuiviUrl() {
  const configured = process.env.MANAGER_URL?.trim() || process.env.TRACKING_API_URL?.trim();
  if (configured) {
    const base = configured.replace(/\/$/, "");
    return base.endsWith("/api/suivi") ? base : `${base}/api/suivi`;
  }
  if (process.env.NODE_ENV === "production") return "https://fresco-transit-manager.onrender.com/api/suivi";
  return "http://127.0.0.1:4010/api/suivi";
}

async function findRemoteDossier(query: string): Promise<Dossier | undefined> {
  const remote = managerSuiviUrl();
  if (!remote) return undefined;
  try {
    const response = await fetch(`${remote}?ref=${encodeURIComponent(query)}`, { cache: "no-store" });
    if (!response.ok) return undefined;
    const body = (await response.json()) as { dossier?: Dossier | null };
    if (!body.dossier || body.dossier.sample) return undefined;
    return body.dossier;
  } catch {
    return undefined;
  }
}

export async function findLiveDossier(query: string): Promise<Dossier | undefined> {
  const key = normalize(query);
  if (key.length < 3) return undefined;
  const remote = await findRemoteDossier(key);
  if (remote) return remote;
  const file = path.join(process.cwd(), "manager", "data", "transit.db");
  if (!existsSync(file)) return undefined;
  try {
    const { DatabaseSync } = await import("node:sqlite");
    const db = new DatabaseSync(file);
    const dossiers = db.prepare(`
      SELECT d.id, d.client_id, d.number, d.title, d.workflow_status, d.operational_status, d.shipment, d.mode,
             d.origin, d.destination, d.goods, d.bl, d.container, d.eta, d.created_at, c.name AS client_name
      FROM dossiers d
      JOIN clients c ON c.id = d.client_id
    `).all() as Array<Record<string, unknown>>;
    const cargo = db.prepare("SELECT dossier_id, container_number, bl_ref FROM cargo").all() as Array<Record<string, unknown>>;
    const shipments = db.prepare(`
      SELECT dossier_id, bl_ref, reference, origin, final_destination, depart_planned, depart_actual,
             arrival_planned, arrival_actual, delivery_planned, delivery_actual
      FROM shipments
    `).all() as Array<Record<string, unknown>>;
    const invoices = db.prepare(`
      SELECT i.client_id, i.dossier_id, i.number, i.kind, i.title, i.amount, i.discount, i.status, i.issued_on, i.due_on,
             c.name AS client_name,
             COALESCE((SELECT SUM(p.amount) FROM payments p WHERE p.invoice_id = i.id AND (p.status = 'recu' OR p.status = '' OR p.status IS NULL)), 0) AS paid
      FROM invoices i
      JOIN clients c ON c.id = i.client_id
    `).all() as Array<Record<string, unknown>>;
    const quotes = db.prepare(`
      SELECT q.client_id, q.dossier_id, q.number, q.title, q.issued_on, c.name AS client_name
      FROM quotes q
      JOIN clients c ON c.id = q.client_id
    `).all() as Array<Record<string, unknown>>;
    const match = dossiers.find((row) => keysFor(row, cargo, shipments).includes(key));
    if (match) return toPublicDossier(match, cargo, shipments, invoicesOf(invoices, Number(match.client_id)));
    const paper = invoices.find((row) => normalize(text(row.number)) === key)
      ?? quotes.find((row) => normalize(text(row.number)) === key);
    if (!paper) return undefined;
    return documentFile(paper, dossiers, cargo, shipments, invoices);
  } catch {
    return undefined;
  }
}

function keysFor(row: Record<string, unknown>, cargo: Array<Record<string, unknown>>, shipments: Array<Record<string, unknown>>) {
  const id = Number(row.id);
  const values = [row.number, row.bl, row.container];
  for (const item of cargo) {
    if (Number(item.dossier_id) === id) values.push(item.container_number, item.bl_ref);
  }
  for (const item of shipments) {
    if (Number(item.dossier_id) === id) values.push(item.bl_ref, item.reference);
  }
  return values.map((value) => normalize(String(value ?? ""))).filter((value) => value.length >= 3);
}

function documentFile(
  row: Record<string, unknown>,
  dossiers: Array<Record<string, unknown>>,
  cargo: Array<Record<string, unknown>>,
  shipments: Array<Record<string, unknown>>,
  invoices: Array<Record<string, unknown>>,
) {
  const clientId = Number(row.client_id);
  const linked = dossiers.find((item) => Number(item.id) === Number(row.dossier_id) && text(item.workflow_status) !== "annule");
  const owned = linked ?? dossiers
    .filter((item) => Number(item.client_id) === clientId && text(item.workflow_status) !== "annule")
    .sort((left, right) => text(right.created_at).localeCompare(text(left.created_at)))[0];
  const bills = invoicesOf(invoices, clientId);
  if (owned) return toPublicDossier(owned, cargo, shipments, bills);
  return invoiceFile(row, bills);
}

function invoicesOf(rows: Array<Record<string, unknown>>, clientId: number): PublicInvoice[] {
  return rows
    .filter((row) => Number(row.client_id) === clientId)
    .map((row) => ({
      number: text(row.number),
      kind: text(row.kind) === "proforma" ? "proforma" : "facture",
      title: text(row.title),
      amount: Number(row.amount) || 0,
      discount: Number(row.discount) || 0,
      paid: Number(row.paid) || 0,
      status: text(row.status) || "brouillon",
      issuedOn: text(row.issued_on).slice(0, 10),
      dueOn: text(row.due_on).slice(0, 10),
    }));
}

function invoiceFile(row: Record<string, unknown>, invoices: PublicInvoice[]): Dossier {
  const issued = text(row.issued_on).slice(0, 10);
  return {
    reference: text(row.number),
    bl: "",
    container: "",
    client: text(row.client_name),
    direction: "import",
    mode: "sea",
    goods: text(row.title) || "Facture",
    origin: "À confirmer",
    destination: "À confirmer",
    status: "opened",
    updatedAt: issued || new Date().toISOString().slice(0, 10),
    sample: false,
    events: [],
    invoices,
    invoiceOnly: true,
  };
}

function toPublicDossier(row: Record<string, unknown>, cargo: Array<Record<string, unknown>>, shipments: Array<Record<string, unknown>>, invoices: PublicInvoice[]): Dossier {
  const id = Number(row.id);
  const boxes = cargo.filter((item) => Number(item.dossier_id) === id);
  const moves = shipments.filter((item) => Number(item.dossier_id) === id);
  const bl = text(row.bl) || text(boxes.find((item) => text(item.bl_ref))?.bl_ref) || text(moves.find((item) => text(item.bl_ref))?.bl_ref);
  const container = text(row.container) || text(boxes.find((item) => text(item.container_number))?.container_number);
  const origin = text(row.origin) || text(moves.find((item) => text(item.origin))?.origin) || "À confirmer";
  const destination = text(row.destination) || text(moves.find((item) => text(item.final_destination))?.final_destination) || "À confirmer";
  const stage = stageIndex(text(row.operational_status), text(row.workflow_status));
  const opened = text(row.created_at).slice(0, 10);
  const arrival = dateOf(moves, "arrival_actual") || dateOf(moves, "arrival_planned") || text(row.eta).slice(0, 10);
  const freight = dateOf(moves, "depart_actual") || dateOf(moves, "depart_planned");
  const delivery = dateOf(moves, "delivery_actual") || dateOf(moves, "delivery_planned");
  const cancelled = text(row.workflow_status) === "annule";
  const events: DossierEvent[] = steps.map((key, index) => ({
    key,
    date: index === 0 ? opened : index === 1 ? freight || null : index === 2 ? arrival || null : index === 4 ? delivery || null : null,
    place: index <= 1 ? origin : destination,
    state: index < stage ? "done" : index === stage ? "current" : "upcoming",
    note: index === stage && cancelled
      ? { fr: "Dossier annulé.", en: "File cancelled." }
      : notes[key],
  }));
  return {
    reference: text(row.number),
    bl,
    container,
    client: text(row.client_name),
    direction: /export/i.test(`${text(row.shipment)} ${text(row.title)}`) ? "export" : "import",
    mode: modeOf(text(row.mode), text(row.title)),
    goods: text(row.goods) || text(row.title) || "Non renseignée",
    origin,
    destination,
    status: steps[Math.min(stage, steps.length - 1)],
    updatedAt: opened || new Date().toISOString().slice(0, 10),
    sample: false,
    events,
    eta: text(row.eta).slice(0, 10),
    situation: {
      fr: `${label(operationalFr, text(row.operational_status), "Non renseigné")} - ${label(workflowFr, text(row.workflow_status), "Brouillon")}`,
      en: `${label(operationalEn, text(row.operational_status), "Not set")} - ${label(workflowEn, text(row.workflow_status), "Draft")}`,
    },
    invoices,
  };
}

const operationalFr: Record<string, string> = {
  dossier_ouvert: "Dossier ouvert",
  documents_attente: "Documents en attente",
  documents_recus: "Documents reçus",
  en_traitement: "En traitement",
  arrivee_navire: "Arrivée navire",
  visite: "Visite",
  recevabilite: "Recevabilité",
  declaration: "Déclaration en cours",
  bae: "BAE obtenu",
  enlevement: "Enlèvement",
  livraison: "Livraison en cours",
  livre: "Livré",
  cloture: "Clôturé",
  suspendu: "Suspendu",
};

const operationalEn: Record<string, string> = {
  dossier_ouvert: "File opened",
  documents_attente: "Documents pending",
  documents_recus: "Documents received",
  en_traitement: "In process",
  arrivee_navire: "Vessel arrival",
  visite: "Inspection",
  recevabilite: "Accepted",
  declaration: "Declaration in progress",
  bae: "Release obtained",
  enlevement: "Pickup",
  livraison: "Delivery in progress",
  livre: "Delivered",
  cloture: "Closed",
  suspendu: "Suspended",
};

const workflowFr: Record<string, string> = {
  brouillon: "Brouillon",
  en_cours: "En cours",
  attente_documents: "En attente documents",
  en_douane: "En douane",
  en_livraison: "En livraison",
  termine: "Terminé",
  annule: "Annulé",
};

const workflowEn: Record<string, string> = {
  brouillon: "Draft",
  en_cours: "In progress",
  attente_documents: "Waiting for documents",
  en_douane: "At customs",
  en_livraison: "Out for delivery",
  termine: "Completed",
  annule: "Cancelled",
};

function label(map: Record<string, string>, key: string, fallback: string) {
  return map[key] || fallback;
}

function stageIndex(operational: string, workflow: string) {
  if (workflow === "termine" || operational === "livre" || operational === "cloture") return 5;
  if (["enlevement", "livraison"].includes(operational)) return 4;
  if (["visite", "recevabilite", "declaration", "bae", "suspendu"].includes(operational)) return 3;
  if (operational === "arrivee_navire") return 2;
  if (operational === "en_traitement") return 1;
  return 0;
}

function modeOf(mode: string, title: string): Dossier["mode"] {
  const value = `${mode} ${title}`.toLowerCase();
  if (value.includes("air") || value.includes("aérien") || value.includes("aerien")) return "air";
  if (value.includes("route") || value.includes("road") || value.includes("terrestre")) return "road";
  return "sea";
}

function dateOf(rows: Array<Record<string, unknown>>, field: string) {
  return text(rows.find((item) => text(item[field]))?.[field]).slice(0, 10);
}

function text(value: unknown) {
  return String(value ?? "").trim();
}
