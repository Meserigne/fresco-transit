import { company } from "@/lib/site";

export function fill(text: string) {
  return text
    .replaceAll("{legalName}", company.legalName)
    .replaceAll("{tradeName}", company.tradeName)
    .replaceAll("{initials}", company.initials)
    .replaceAll("{email}", company.email)
    .replaceAll("{phone}", company.phoneDisplay);
}
