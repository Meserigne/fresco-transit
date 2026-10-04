import { container } from "@/lib/site";

export default function Loading() {
  return (
    <div className={`${container} py-16`} aria-hidden>
      <div className="h-10 w-48 animate-pulse rounded-[10px] bg-line" />
      <div className="mt-6 h-14 w-full max-w-xl animate-pulse rounded-[10px] bg-line" />
      <div className="mt-4 h-6 w-full max-w-lg animate-pulse rounded-[10px] bg-line" />
    </div>
  );
}
