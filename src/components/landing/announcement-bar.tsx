import { ArrowUpRight, Sparkles } from "lucide-react";

export function AnnouncementBar() {
  return (
    <aside
      aria-label="Announcement"
      className="relative flex min-h-[43px] items-center justify-center bg-brand px-12 py-2.5 text-center"
    >
      <Sparkles
        aria-hidden="true"
        className="absolute left-4 hidden size-4 text-white sm:block lg:left-[34px]"
      />
      <p className="flex flex-wrap items-center justify-center gap-x-1.5 text-[13.8px] leading-[21px] text-white/85">
        <span>The presale is live.</span>
        <a
          href="#buy"
          className="inline-flex items-center gap-1 text-[14.2px] font-medium text-white underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
        >
          Join the sale
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      </p>
    </aside>
  );
}
