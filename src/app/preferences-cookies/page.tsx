import type { Metadata } from "next";
import Link from "next/link";
import { LegalArticle } from "@/components/legal-article";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.legal.cookiePrefs.title, description: dict.legal.cookiePrefs.intro };
}

export default async function CookiePreferencesPage() {
  const dict = await getDictionary();
  const page = dict.legal.cookiePrefs;
  return (
    <LegalArticle title={page.title} intro={page.intro}>
      <ul className="space-y-4">
        {page.categories.map((item) => (
          <li key={item.name} className="rounded-2xl border border-line bg-white p-5">
            <p className="font-semibold text-ink">{item.name}</p>
            <p className="mt-1 text-sm text-accent">{item.state}</p>
            <p className="mt-2">{item.detail}</p>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/cookies">{page.more}</Link>
      </p>
    </LegalArticle>
  );
}
