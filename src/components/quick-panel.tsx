import Link from "next/link";
import { TrackingForm } from "@/components/tracking-form";
import type { Dossier } from "@/data/dossiers";
import type { Dictionary } from "@/i18n/dictionaries";

export function QuickPanel({
  copy,
  page,
  locale,
  query,
  dossier,
}: {
  copy: Dictionary["trackingForm"];
  page: Dictionary["trackingPage"];
  locale: "fr" | "en";
  query: string;
  dossier?: Dossier;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-[0_16px_40px_rgba(11,124,174,0.12)] sm:p-6">
      <h2 className="text-lg text-ink">{copy.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{copy.hint}</p>
      <div className="mt-4">
        <TrackingForm copy={copy} initial={query} action="/" />
      </div>
      <p className="mt-3 text-sm text-muted">{copy.example}</p>
      {query ? <Result query={query} dossier={dossier} page={page} locale={locale} /> : null}
    </div>
  );
}

function Result({
  query,
  dossier,
  page,
  locale,
}: {
  query: string;
  dossier?: Dossier;
  page: Dictionary["trackingPage"];
  locale: "fr" | "en";
}) {
  if (!dossier) {
    return (
      <div className="mt-5 rounded-xl border border-line bg-surface p-4">
        <p className="text-base font-semibold text-ink">{page.notFoundTitle}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{page.notFound}</p>
      </div>
    );
  }

  const invoices = dossier.invoices ?? [];
  return (
    <div className="mt-5 rounded-xl border border-line p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">{dossier.reference}</p>
          <p className="mt-1 text-base font-semibold text-ink">{dossier.client}</p>
          <p className="mt-1 text-sm text-muted">
            {dossier.situation ? dossier.situation[locale] : page.events[dossier.status]}
            {dossier.container ? ` · ${dossier.container}` : ""}
          </p>
        </div>
        <Link href={`/suivi?ref=${encodeURIComponent(query)}`} className="text-sm font-semibold text-accent underline">
          {page.title}
        </Link>
      </div>
      {dossier.sample ? <p className="mt-3 text-sm text-muted">{page.sample}</p> : null}
      {dossier.invoiceOnly ? <p className="mt-3 text-sm text-muted">{page.invoiceOnly}</p> : null}
      {invoices.length > 0 ? (
        <ul className="mt-4 divide-y divide-line text-sm">
          {invoices.map((invoice) => {
            const balance = Math.max(0, invoice.amount - invoice.discount - invoice.paid);
            return (
              <li key={invoice.number} className="flex flex-wrap items-center justify-between gap-2 py-2">
                <span className="font-semibold text-ink">
                  {invoice.number}
                  <span className="ml-2 font-normal text-muted">
                    {page.invoiceKind[invoice.kind]} · {page.invoiceStatus[invoice.status as keyof typeof page.invoiceStatus] ?? invoice.status}
                  </span>
                </span>
                <span className="text-ink">{money(balance)} {page.balance.toLowerCase()}</span>
              </li>
            );
          })}
        </ul>
      ) : dossier.invoices ? (
        <p className="mt-4 text-sm text-muted">{page.invoicesEmpty}</p>
      ) : null}
    </div>
  );
}

function money(value: number) {
  return `${new Intl.NumberFormat("fr-FR").format(value)} XOF`;
}
