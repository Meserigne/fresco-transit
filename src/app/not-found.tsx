import { ButtonLink } from "@/components/button-link";
import { getDictionary } from "@/i18n/get-dictionary";
import { container } from "@/lib/site";

export default async function NotFound() {
  const dict = await getDictionary();
  return (
    <div className={`${container} py-24`}>
      <h1 className="text-4xl tracking-tight text-ink">{dict.notFound.title}</h1>
      <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-muted">{dict.notFound.text}</p>
      <div className="mt-8">
        <ButtonLink href="/">{dict.notFound.home}</ButtonLink>
      </div>
    </div>
  );
}
