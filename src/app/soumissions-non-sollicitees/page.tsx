import type { Metadata } from "next";
import { LegalArticle } from "@/components/legal-article";
import { LegalSections } from "@/components/legal-sections";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.legal.unsolicited.title, description: dict.legal.unsolicited.intro };
}

export default async function UnsolicitedPage() {
  const dict = await getDictionary();
  const page = dict.legal.unsolicited;
  return (
    <LegalArticle title={page.title} intro={page.intro}>
      <LegalSections sections={page.sections} />
    </LegalArticle>
  );
}
