import { dossiers, type Dossier } from "@/data/dossiers";
import { findLiveDossier } from "@/lib/live-tracking";

export function normalizeReference(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

export async function findDossier(query: string): Promise<Dossier | undefined> {
  const key = normalizeReference(query);
  if (key.length < 3) return undefined;
  return (
    (await findLiveDossier(key)) ??
    dossiers.find((dossier) =>
      [dossier.reference, dossier.bl, dossier.container].some(
        (value) => value.length > 0 && normalizeReference(value) === key,
      ),
    )
  );
}
