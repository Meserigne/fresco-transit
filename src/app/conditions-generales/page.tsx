import type { Metadata } from "next";
import { LegalArticle } from "@/components/legal-article";
import { LegalSections } from "@/components/legal-sections";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.legal.terms.title, description: dict.legal.terms.intro };
}

export default async function TermsPage() {
  const dict = await getDictionary();
  const page = dict.legal.terms;
  return (
    <LegalArticle title={page.title} intro={page.intro}>
      <LegalSections sections={page.sections} />
    </LegalArticle>
  );
}
