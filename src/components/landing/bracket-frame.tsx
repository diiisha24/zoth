import { cn } from "@/lib/utils";

/**
 * Square-bracket end caps ("[ ... ]"). The Figma file uses these on the nav
 * pill and the purchase option buttons. Here they are drawn with borders
 * instead of the exported PNG slices.
 */
export function BracketFrame({
  children,
  className,
  capClassName,
}: {
  children: React.ReactNode;
  className?: string;
  capClassName?: string;
}) {
  return (
    <span className={cn("flex items-stretch", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "w-[7.6px] shrink-0 border-y border-l border-brand",
          capClassName,
        )}
      />
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "w-[7.6px] shrink-0 border-y border-r border-brand",
          capClassName,
        )}
      />
    </span>
  );
}
