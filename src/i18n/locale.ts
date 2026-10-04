export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string | undefined): value is Locale {
  return value === "fr" || value === "en";
}
