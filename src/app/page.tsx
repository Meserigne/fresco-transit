import { Files, Handshake, Path } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { QuickPanel } from "@/components/quick-panel";
import { getDictionary } from "@/i18n/get-dictionary";
import { findDossier } from "@/lib/tracking";
import { container, cta, serviceVisuals, services } from "@/lib/site";

const stepMeta = [
  { icon: Handshake, href: "/contact" as const },
  { icon: Files, href: "/services" as const },
  { icon: Path, href: "/a-propos" as const },
];

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: { absolute: dict.meta.defaultTitle }, description: dict.meta.defaultDescription };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const dict = await getDictionary();
  const params = await searchParams;
  const query = typeof params.ref === "string" ? params.ref.slice(0, 40) : "";
  const dossier = query ? await findDossier(query) : undefined;

  return (
    <>
      <section className="relative bg-[#0b3a52]">
        <div className="relative min-h-[560px] lg:min-h-[640px]">
          <Image
            src="/images/port.jpg"
            alt={dict.home.heroAlt}
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#062433]/85 via-[#062433]/55 to-[#062433]/20" />
          <div className={`${container} relative z-10 pb-36 pt-14 lg:pt-20`}>
            <h1 className="max-w-[14ch] text-4xl leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {dict.home.title}
            </h1>
            <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-white">{dict.home.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={cta.href} variant="onPhoto">
                {dict.nav.contact}
              </ButtonLink>
              <ButtonLink href="/services" variant="onPhotoGhost">
                {dict.nav.services}
              </ButtonLink>
            </div>
          </div>
        </div>
        <div className={`${container} relative z-20 -mt-24 pb-6`}>
          <QuickPanel
            copy={dict.trackingForm}
            page={dict.trackingPage}
            locale={dict.locale}
            query={query}
            dossier={dossier}
          />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={`${container} grid gap-4 md:grid-cols-3`}>
          {dict.home.steps.map((step, index) => {
            const meta = stepMeta[index];
            const Icon = meta.icon;
            return (
              <article key={step.title} className="flex flex-col rounded-2xl border border-line bg-white p-6">
                <span className="grid size-11 place-items-center rounded-[8px] bg-accent-soft text-accent">
                  <Icon size={22} weight="regular" aria-hidden />
                </span>
                <h2 className="mt-5 text-xl text-ink">{step.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{step.text}</p>
                <div className="mt-6">
                  <ButtonLink href={meta.href}>{step.action}</ButtonLink>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className={container}>
          <h2 className="mx-auto max-w-[18ch] text-center text-3xl leading-[1.15] tracking-tight text-ink sm:text-4xl">
            {dict.home.servicesTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-[58ch] text-center text-base leading-relaxed text-muted">
            {dict.home.servicesLead}
          </p>
          <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {services.map((service) => {
              const visual = serviceVisuals[service.id];
              const copy = dict.services.items[service.id];
              return (
                <Link
                  key={service.id}
                  href={`/services#${service.id}`}
                  className="w-[260px] shrink-0 snap-start cursor-pointer"
                >
                  <div className="relative h-40 overflow-hidden rounded-2xl bg-line">
                    <Image
                      src={visual.src}
                      alt={dict.images[service.id]}
                      fill
                      sizes="260px"
                      className="object-cover"
                      style={{ objectPosition: visual.position ?? "center" }}
                    />
                  </div>
                  <h3 className="mt-4 text-base text-ink">{copy.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{copy.summary}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={container}>
          <h2 className="mx-auto max-w-[16ch] text-center text-3xl leading-[1.15] tracking-tight text-ink sm:text-4xl">
            {dict.home.worldTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-[62ch] text-center text-base leading-relaxed text-muted">
            {dict.home.worldLead}
          </p>
          <div className="relative mx-auto mt-10 aspect-[16/8] max-w-5xl overflow-hidden rounded-2xl bg-line">
            <Image
              src="/images/warehouse.jpg"
              alt={dict.home.worldAlt}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          </div>
          <ul className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {dict.home.values.map(([title, text]) => (
              <li key={title}>
                <h3 className="text-base text-accent">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
