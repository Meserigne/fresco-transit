"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setLocale } from "@/i18n/actions";
import type { Locale } from "@/i18n/locale";

export function LanguageSwitch({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function choose(next: Locale) {
    if (next === locale) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <div className="inline-flex items-center gap-2" role="group" aria-label={label}>
      {(["fr", "en"] as const).map((code) => {
        const selected = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => choose(code)}
            disabled={pending}
            aria-pressed={selected}
            className={`cursor-pointer text-sm font-semibold uppercase ${
              selected ? "text-accent" : "text-muted hover:text-ink"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
