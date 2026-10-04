import { fill } from "@/lib/fill";

export function LegalSections({
  sections,
}: {
  sections: readonly { title: string; paragraphs: readonly string[] }[];
}) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.title} className="space-y-3">
          <h2>{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{fill(paragraph)}</p>
          ))}
        </section>
      ))}
    </>
  );
}
