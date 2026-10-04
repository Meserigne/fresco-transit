import Link from "next/link";

const styles = {
  primary: "bg-accent text-white border border-accent hover:bg-accent-deep",
  secondary: "bg-white text-ink border border-ink/15 hover:bg-surface",
  onPhoto: "bg-white text-ink border border-white hover:bg-accent-soft",
  onPhotoGhost: "bg-white/10 text-white border border-white hover:bg-white/20",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: "/contact" | "/services" | "/" | "/a-propos" | "/suivi";
  children: React.ReactNode;
  variant?: keyof typeof styles;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex h-11 cursor-pointer items-center justify-center rounded-[8px] px-5 text-sm font-semibold whitespace-nowrap transition-[color,background-color,transform] duration-200 active:scale-[0.98] ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
