"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

export function TrackingForm({
  copy,
  initial = "",
}: {
  copy: Dictionary["trackingForm"];
  initial?: string;
}) {
  const router = useRouter();
  const [reference, setReference] = useState(initial);
  const [error, setError] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = reference.trim();
    if (value.length < 3) {
      setError(copy.required);
      return;
    }
    setError("");
    router.push(`/suivi?ref=${encodeURIComponent(value)}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="grid w-full gap-2">
        <label className="sr-only" htmlFor="tracking-ref">
          {copy.label}
        </label>
        <input
          id="tracking-ref"
          name="ref"
          value={reference}
          onChange={(event) => {
            setReference(event.target.value);
            setError("");
          }}
          placeholder={copy.placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "tracking-error" : undefined}
          className="h-12 w-full rounded-[8px] border border-line bg-white px-3 text-base text-ink placeholder:text-placeholder"
        />
        {error ? (
          <p id="tracking-error" className="text-sm text-danger">
            {error}
          </p>
        ) : null}
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
