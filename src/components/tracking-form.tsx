import type { Dictionary } from "@/i18n/dictionaries";

export function TrackingForm({
  copy,
  initial = "",
  action = "/suivi",
}: {
  copy: Dictionary["trackingForm"];
  initial?: string;
  action?: string;
}) {
  return (
    <form action={action} method="get" className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="grid w-full gap-2">
        <label className="sr-only" htmlFor="tracking-ref">
          {copy.label}
        </label>
        <input
          id="tracking-ref"
          name="ref"
          defaultValue={initial}
          required
          minLength={3}
          maxLength={40}
          placeholder={copy.placeholder}
          className="h-12 w-full rounded-[8px] border border-line bg-white px-3 text-base text-ink placeholder:text-placeholder"
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-12 shrink-0 cursor-pointer items-center justify-center rounded-[8px] bg-accent px-5 text-sm font-semibold whitespace-nowrap text-white hover:bg-accent-deep active:scale-[0.98]"
      >
        {copy.submit}
      </button>
    </form>
  );
}
