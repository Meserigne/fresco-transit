import { container } from "@/lib/site";

export function LegalArticle({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <article>
      <header className="border-b border-line py-12 lg:py-16">
        <div className={container}>
          <h1 className="max-w-[18ch] text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-muted">{intro}</p>
        </div>
      </header>
      <div className={`${container} space-y-8 py-12 lg:py-16`}>
        <div className="max-w-[70ch] space-y-8 text-base leading-relaxed text-muted [&_h2]:text-xl [&_h2]:text-ink [&_a]:text-accent [&_a]:underline">
          {children}
        </div>
      </div>
    </article>
  );
}
