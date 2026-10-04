"use client";

import { ArrowUp } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label={label}
      className="fixed right-4 bottom-20 z-40 grid size-11 cursor-pointer place-items-center rounded-full bg-accent text-white shadow-[0_8px_24px_rgba(11,124,174,0.28)] hover:bg-accent-deep"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
    >
      <ArrowUp size={20} weight="regular" aria-hidden />
    </button>
  );
}
