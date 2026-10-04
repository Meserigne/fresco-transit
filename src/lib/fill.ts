import { company } from "@/lib/site";

export function fill(text: string) {
  return text
    .replaceAll("{email}", company.email)
    .replaceAll("{phone}", company.phoneDisplay);
}
