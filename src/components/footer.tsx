import { FacebookLogo, InstagramLogo, TiktokLogo } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/i18n/get-dictionary";
import { company, container, cta, legalNav, loginHref, nav, socials } from "@/lib/site";

const socialIcons = {
  facebook: FacebookLogo,
  instagram: InstagramLogo,
  tiktok: TiktokLogo,
} as const;

export async function Footer() {
  const dict = await getDictionary();

  return (
    <footer className="border-t border-line bg-surface">
      <div className={`${container} grid gap-10 py-12 md:grid-cols-3`}>
        <div>
          <Link href="/" className="inline-flex">
            <Image
              src="/logo.png"
              alt={company.name}
              width={458}
              height={393}
              className="h-24 w-auto"
            />
          </Link>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{dict.chrome.office}</p>
          <address className="mt-2 text-sm leading-relaxed text-muted not-italic">
            {company.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{dict.chrome.reach}</p>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <a className="text-muted hover:text-accent" href={`tel:${company.phoneTel}`}>
                {company.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="text-muted hover:text-accent" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </li>
            <li className="text-muted">{dict.chrome.available}</li>
          </ul>
          <p className="mt-6 text-sm font-semibold text-ink">{dict.chrome.social}</p>
          <ul className="mt-2 flex gap-2">
            {socials.map((item) => {
              const Icon = socialIcons[item.key];
              return (
                <li key={item.key}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="grid size-10 place-items-center rounded-[8px] border border-line bg-white text-ink hover:border-accent hover:text-accent"
                  >
                    <Icon size={20} weight="regular" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={`${container} flex flex-col gap-4 border-t border-line py-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between`}>
        <nav aria-label={dict.chrome.footerNav} className="flex flex-wrap gap-x-5 gap-y-2">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-accent">
              {dict.nav[item.key]}
            </Link>
          ))}
          <Link href={cta.href} className="hover:text-accent">
            {dict.nav.contact}
          </Link>
          <a href={loginHref} className="hover:text-accent">
            {dict.chrome.login}
          </a>
        </nav>
      </div>
      <div className={`${container} border-t border-line py-5`}>
        <nav aria-label={dict.chrome.legalNav} className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          {legalNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-accent">
              {dict.legalNav[item.key]}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
