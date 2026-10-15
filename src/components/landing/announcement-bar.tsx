import { ArrowUpRight, Sparkles } from "lucide-react";

export function AnnouncementBar() {
  return (
    <aside
      aria-label="Announcement"
      className="relative flex h-[43px] items-center justify-center bg-brand px-12"
    >
      <Sparkles
        aria-hidden="true"
        className="absolute left-4 size-4 text-white lg:left-[34px]"
      />
      <p className="flex items-center gap-1.5 text-center text-[13.8px] leading-[21px] whitespace-nowrap text-white/85">
        <span>Demo</span>
        <a
          href="#buy"
          className="inline-flex items-center gap-2 text-[14.2px] text-white underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
        >
          Demo
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      </p>
    </aside>
  );
}
