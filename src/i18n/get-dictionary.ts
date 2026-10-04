import { cookies } from "next/headers";
import { dictionaryFor, type Dictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/locale";

export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const value = jar.get("locale")?.value;
  return isLocale(value) ? value : "fr";
}

export async function getDictionary(): Promise<{ locale: Locale } & Dictionary> {
  const locale = await getLocale();
  return { locale, ...dictionaryFor(locale) };
}
