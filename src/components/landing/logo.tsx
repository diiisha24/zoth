import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display text-[22px] font-semibold tracking-[-0.5px] text-white",
        className,
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 28 28"
        className="size-7"
        fill="none"
      >
        <circle cx="14" cy="14" r="13" fill="#fff" />
        <path
          d="M9 9l10 10M19 9L9 19"
          stroke="#000"
          strokeWidth="2.6"
          strokeLinecap="square"
        />
      </svg>
      Demo
    </span>
  );
}
