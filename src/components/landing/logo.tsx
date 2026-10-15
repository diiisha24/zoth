import Image from "next/image";

import { cn } from "@/lib/utils";

// Client-supplied logo mark (public/brand/logo-mark.svg, 21×19), shown
// unchanged inside a white 31px disc, followed by the wordmark.
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display text-[24px] font-semibold tracking-[-0.5px] text-white",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="flex size-[31px] shrink-0 items-center justify-center rounded-full bg-white"
      >
        <Image
          src="/brand/logo-mark.svg"
          alt=""
          width={21}
          height={19}
          unoptimized
          priority
        />
      </span>
      Demo
    </span>
  );
}
