import { TrackingForm } from "@/components/tracking-form";
import type { Dictionary } from "@/i18n/dictionaries";

export function QuickPanel({ copy }: { copy: Dictionary["trackingForm"] }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-[0_16px_40px_rgba(11,124,174,0.12)] sm:p-6">
      <h2 className="text-lg text-ink">{copy.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{copy.hint}</p>
      <div className="mt-4">
        <TrackingForm copy={copy} />
      </div>
      <p className="mt-3 text-sm text-muted">{copy.example}</p>
    </div>
  );
}
