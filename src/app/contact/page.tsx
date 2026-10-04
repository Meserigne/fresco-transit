import type { Metadata } from "next";
import { MapPin } from "@phosphor-icons/react/ssr";
import { ContactForm } from "@/components/contact-form";
import { getDictionary } from "@/i18n/get-dictionary";
import { company, container } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.meta.contactTitle, description: dict.meta.contactDescription };
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const dict = await getDictionary();
  const params = await searchParams;
  const initialMessage = typeof params.message === "string" ? params.message.slice(0, 500) : "";

  return (
    <>
      <header className="border-b border-line py-12 lg:py-16">
        <div className={container}>
          <h1 className="max-w-[14ch] text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl">
            {dict.contact.title}
          </h1>
          <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-muted">{dict.contact.lead}</p>
        </div>
      </header>

      <div className={`${container} grid gap-12 py-12 lg:grid-cols-12 lg:py-16`}>
        <aside className="lg:col-span-4">
          <h2 className="text-lg text-ink">{dict.contact.office}</h2>
          <address className="mt-3 text-sm leading-relaxed text-muted not-italic">
            {company.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a className="font-semibold text-ink hover:text-accent-text" href={`tel:${company.phoneTel}`}>
                {company.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="font-semibold text-ink hover:text-accent-text" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </li>
            <li className="text-muted">{dict.chrome.available}</li>
          </ul>
          <a
            href={company.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-text underline decoration-accent-text/40 underline-offset-4 hover:decoration-accent-text"
          >
            <MapPin size={18} weight="regular" aria-hidden />
            {dict.contact.map}
          </a>
        </aside>
        <div className="lg:col-span-8">
          <ContactForm copy={dict.contactForm} initialMessage={initialMessage} />
        </div>
      </div>
    </>
  );
}
