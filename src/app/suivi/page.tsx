import type { Metadata } from "next";
import Link from "next/link";
import { TrackingForm } from "@/components/tracking-form";
import type { Dossier } from "@/data/dossiers";
import { getDictionary } from "@/i18n/get-dictionary";
import { findDossier } from "@/lib/tracking";
import { container, cta } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.meta.trackingTitle, description: dict.meta.trackingDescription };
}

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

export default async function TrackingPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const dict = await getDictionary();
  const copy = dict.trackingPage;
  const params = await searchParams;
  const query = typeof params.ref === "string" ? params.ref.slice(0, 40) : "";
  const dossier = query ? findDossier(query) : undefined;

  return (
    <>
      <header className="border-b border-line py-12 lg:py-16">
        <div className={container}>
          <h1 className="max-w-[16ch] text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-muted">{copy.lead}</p>
          <div className="mt-8 max-w-3xl">
            <TrackingForm copy={dict.trackingForm} initial={query} />
            <p className="mt-3 text-sm text-muted">{dict.trackingForm.example}</p>
          </div>
        </div>
      </header>

      {query ? (
        <section className={`${container} py-12 lg:py-16`}>
          {dossier ? (
            <DossierView dossier={dossier} locale={dict.locale} copy={copy} contact={dict.nav.contact} />
          ) : (
            <div className="max-w-[60ch]">
              <h2 className="text-2xl text-ink">{copy.notFoundTitle}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{copy.notFound}</p>
              <Link href={cta.href} className="mt-6 inline-flex text-sm font-semibold text-accent underline">
                {dict.nav.contact}
              </Link>
            </div>
          )}
        </section>
      ) : null}
    </>
  );
}

function DossierView({
  dossier,
  locale,
  copy,
  contact,
}: {
  dossier: Dossier;
  locale: "fr" | "en";
  copy: Awaited<ReturnType<typeof getDictionary>>["trackingPage"];
  contact: string;
}) {
  const fields = [
    [copy.fields.client, dossier.client],
    [copy.fields.direction, copy.direction[dossier.direction]],
    [copy.fields.mode, copy.mode[dossier.mode]],
    [copy.fields.goods, dossier.goods],
    [copy.fields.origin, dossier.origin],
    [copy.fields.destination, dossier.destination],
    [copy.fields.bl, dossier.bl || copy.emptyBl],
    [copy.fields.container, dossier.container || copy.emptyContainer],
    [copy.fields.updated, formatDate(dossier.updatedAt, locale)],
  ] as const;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">{dossier.reference}</p>
        <h2 className="mt-2 text-3xl text-ink">
          {dossier.origin} · {dossier.destination}
        </h2>
        <p className="mt-2 text-base text-muted">{copy.events[dossier.status]}</p>
        {dossier.sample ? <p className="mt-3 text-sm text-muted">{copy.sample}</p> : null}
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          {fields.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-line p-4">
              <dt className="text-sm text-muted">{label}</dt>
              <dd className="mt-1 text-base font-semibold text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        <Link href={cta.href} className="mt-6 inline-flex text-sm font-semibold text-accent underline">
          {contact}
        </Link>
      </div>
      <ol className="space-y-0" aria-label={copy.timeline}>
        {dossier.events.map((event, index) => {
          const last = index === dossier.events.length - 1;
          return (
            <li key={event.key} className="grid grid-cols-[1.25rem_1fr] gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={`mt-1 size-3 rounded-full ${
                    event.state === "upcoming" ? "bg-line" : "bg-accent"
                  }`}
                />
                {last ? null : <span className="w-px flex-1 bg-line" />}
              </div>
              <div className={last ? "" : "pb-6"}>
                <p className="text-base font-semibold text-ink">{copy.events[event.key]}</p>
                <p className="mt-1 text-sm text-accent">{copy.states[event.state]}</p>
                <p className="mt-1 text-sm text-muted">
                  {event.date ? formatDate(event.date, locale) : copy.noDate}
                  {" · "}
                  {event.place}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{event.note[locale]}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
