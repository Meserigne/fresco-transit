import { dossiers, type Dossier } from "@/data/dossiers";

export function normalizeReference(value: string) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

export function findDossier(query: string): Dossier | undefined {
  const key = normalizeReference(query);
  if (key.length < 3) return undefined;
  return dossiers.find((dossier) =>
    [dossier.reference, dossier.bl, dossier.container].some(
      (value) => value.length > 0 && normalizeReference(value) === key,
    ),
  );
}
