import type { Metadata } from "next";
import { LegalArticle } from "@/components/legal-article";
import { LegalSections } from "@/components/legal-sections";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.legal.cookies.title, description: dict.legal.cookies.intro };
}

export default async function CookiesPage() {
  const dict = await getDictionary();
  const page = dict.legal.cookies;
  return (
    <LegalArticle title={page.title} intro={page.intro}>
      <LegalSections sections={page.sections} />
    </LegalArticle>
  );
}
