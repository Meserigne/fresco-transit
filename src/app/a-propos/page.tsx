import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { getDictionary } from "@/i18n/get-dictionary";
import { company, container, cta } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.meta.aboutTitle, description: dict.meta.aboutDescription };
}

export default async function AboutPage() {
  const dict = await getDictionary();
  const copy = dict.about;
  const identity = [
    {
      title: copy.company,
      lines: [
        `${copy.trade} : ${company.tradeName} (${company.initials})`,
        `${copy.legal} : ${company.legalName}`,
        copy.form,
        `${copy.manager} : ${company.manager}`,
      ],
    },
    {
      title: copy.office,
      lines: [...company.addressLines],
    },
  ];

  return (
    <>
      <header className="border-b border-line py-12 lg:py-16">
        <div className={container}>
          <h1 className="max-w-[14ch] text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-muted">
            {copy.lead} {company.tradeName} {copy.leadEnd}
          </p>
        </div>
      </header>

      <section className={`${container} py-14 lg:py-16`}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="max-w-[65ch] space-y-4 text-base leading-relaxed text-muted">
            <p>{copy.p1}</p>
            <p>{copy.p2}</p>
            <p>{copy.p3}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-line">
            <Image
              src="/images/truck.jpg"
              alt={dict.images.truck}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-14 lg:py-16">
        <div className={container}>
          <h2 className="text-3xl tracking-tight text-ink">{copy.identity}</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {identity.map((block) => (
              <section key={block.title}>
                <h3 className="text-lg text-ink">{block.title}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                  {block.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href={cta.href}>{dict.nav.contact}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
