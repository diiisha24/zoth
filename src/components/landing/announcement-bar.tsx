"use client";

import { useState } from "react";
import { ArrowRight, X } from "lucide-react";

// Matches the Figma export: a close "×" on the left; the link text sits in a
// 72px centred box with the → arrow 8px after it.
export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Announcement"
      className="relative flex h-[43px] items-center justify-center bg-brand px-12"
    >
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setDismissed(true)}
        className="absolute left-4 flex size-[17px] items-center justify-center text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none lg:left-[34px]"
      >
        <X aria-hidden="true" className="size-4" />
      </button>
      <p className="flex items-center gap-1.5 text-center text-[13.8px] leading-[21px] whitespace-nowrap text-white/85">
        <span>Demo</span>
        <a
          href="#buy"
          className="inline-flex items-center text-[14.2px] text-white underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
        >
          <span className="w-[72px] text-center">Demo</span>
          <ArrowRight aria-hidden="true" className="ml-2 size-[17px]" />
        </a>
      </p>
    </aside>
  );
}
