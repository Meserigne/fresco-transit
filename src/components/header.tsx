"use client";

import { EnvelopeSimple, List, Phone, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LanguageSwitch } from "@/components/language-switch";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locale";
import { company, cta, loginHref, nav } from "@/lib/site";

export function Header({
  locale,
  chrome,
  labels,
}: {
  locale: Locale;
  chrome: Dictionary["chrome"];
  labels: Dictionary["nav"];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <div>
      <div className="border-b border-line bg-white text-sm text-muted">
        <div className="mx-auto flex h-9 w-full max-w-7xl items-center justify-end gap-5 px-4 sm:px-6 lg:px-8">
          <a href={loginHref} className="hidden font-medium text-ink hover:text-accent lg:inline">
            {chrome.login}
          </a>
          <LanguageSwitch locale={locale} label={chrome.language} />
          <a
            href={`tel:${company.phoneTel}`}
            className="inline-flex items-center gap-2 whitespace-nowrap hover:text-accent"
          >
            <Phone size={16} weight="regular" aria-hidden />
            {company.phoneDisplay}
          </a>
          <a
            href={`mailto:${company.email}`}
            className="hidden items-center gap-2 hover:text-accent sm:inline-flex"
          >
            <EnvelopeSimple size={16} weight="regular" aria-hidden />
            {company.email}
          </a>
          <p className="whitespace-nowrap">{chrome.hours}</p>
        </div>
      </div>
      <header className="sticky top-0 z-30 border-b border-line bg-white">
        <div className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center" onClick={close}>
            <Image
              src="/logo.jpg"
              alt={company.name}
              width={458}
              height={393}
              className="h-20 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label={chrome.navLabel}>
            {nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium ${active ? "text-accent" : "text-ink hover:text-accent"}`}
                  aria-current={active ? "page" : undefined}
                >
                  {labels[item.key]}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={cta.href}
              className="hidden h-10 cursor-pointer items-center justify-center rounded-[8px] bg-accent px-4 text-sm font-semibold whitespace-nowrap text-white hover:bg-accent-deep active:scale-[0.98] lg:inline-flex"
            >
              {labels.contact}
            </Link>
            <button
              type="button"
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-[8px] text-ink hover:bg-surface lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={22} weight="regular" /> : <List size={22} weight="regular" />}
              <span className="sr-only">{open ? chrome.closeMenu : chrome.openMenu}</span>
            </button>
          </div>
        </div>

        {open ? (
          <nav
            id="menu-mobile"
            className="border-t border-line bg-white px-4 py-4 lg:hidden"
            aria-label={chrome.mobileLabel}
          >
            <ul className="flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block rounded-[8px] px-3 py-3 text-base font-medium text-ink hover:bg-accent-soft hover:text-accent"
                  >
                    {labels[item.key]}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={loginHref}
                  className="block rounded-[8px] px-3 py-3 text-base font-medium text-ink hover:bg-accent-soft hover:text-accent"
                >
                  {chrome.login}
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href={cta.href}
                  onClick={close}
                  className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-[8px] bg-accent text-sm font-semibold text-white"
                >
                  {labels.contact}
                </Link>
              </li>
            </ul>
          </nav>
        ) : null}
      </header>
    </div>
  );
}
