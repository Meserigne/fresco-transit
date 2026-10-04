import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { ServiceIcon } from "@/components/service-icon";
import { getDictionary } from "@/i18n/get-dictionary";
import { company, container, cta, serviceVisuals, services } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.meta.servicesTitle, description: dict.meta.servicesDescription };
}

export default async function ServicesPage() {
  const dict = await getDictionary();

  return (
    <>
      <header className="border-b border-line py-12 lg:py-16">
        <div className={container}>
          <h1 className="max-w-[16ch] text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl">
            {dict.services.introTitle}
          </h1>
          <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-muted">
            {company.tradeName} {dict.services.intro}
          </p>
        </div>
      </header>

      <div className={`${container} grid gap-10 py-12 lg:grid-cols-[220px_1fr] lg:gap-16 lg:py-16`}>
        <nav aria-label={dict.services.nav} className="lg:sticky lg:top-24 lg:self-start">
          <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {services.map((service) => (
              <li key={service.id} className="shrink-0">
                <a
                  href={`#${service.id}`}
                  className="inline-flex items-center rounded-[10px] px-3 py-2 text-sm font-medium whitespace-nowrap text-muted hover:bg-ink/5 hover:text-ink"
                >
                  {dict.services.items[service.id].title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          {services.map((service, index) => {
            const copy = dict.services.items[service.id];
            const visual = serviceVisuals[service.id];
            return (
              <article
                key={service.id}
                id={service.id}
                className={`scroll-mt-28 ${index === 0 ? "" : "mt-12 border-t border-line pt-12"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-accent text-white">
                    <ServiceIcon id={service.id} />
                  </span>
                  <h2 className="text-2xl tracking-tight text-ink sm:text-3xl">{copy.title}</h2>
                </div>
                <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
                  <p className="max-w-[65ch] text-base leading-relaxed text-muted">{copy.detail}</p>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-line">
                    <Image
                      src={visual.src}
                      alt={dict.images[service.id]}
                      fill
                      sizes="(min-width: 1024px) 280px, 100vw"
                      className="object-cover"
                      style={{ objectPosition: visual.position ?? "center" }}
                    />
                  </div>
                </div>
              </article>
            );
          })}

          <div className="mt-14 border-t border-line pt-10">
            <p className="max-w-[52ch] text-base leading-relaxed text-muted">
              {dict.services.close} {company.phoneDisplay} {dict.services.closeOr} {company.email}.
            </p>
            <div className="mt-6">
              <ButtonLink href={cta.href}>{dict.nav.contact}</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
