import { cn } from "@/lib/utils";

/**
 * Small L-shaped corner ticks around a box, as on the Figma nav pill and the
 * purchase option buttons. The box sits inside the frame, inset by the padding
 * passed in `className`.
 */
export function CornerFrame({
  children,
  className,
  tickClassName = "size-[5px] border-brand",
}: {
  children: React.ReactNode;
  className?: string;
  tickClassName?: string;
}) {
  const tick = cn("pointer-events-none absolute", tickClassName);

  return (
    <span className={cn("relative flex", className)}>
      <span
        aria-hidden="true"
        className={cn(tick, "top-0 left-0 border-t border-l")}
      />
      <span
        aria-hidden="true"
        className={cn(tick, "top-0 right-0 border-t border-r")}
      />
      <span
        aria-hidden="true"
        className={cn(tick, "bottom-0 left-0 border-b border-l")}
      />
      <span
        aria-hidden="true"
        className={cn(tick, "right-0 bottom-0 border-r border-b")}
      />
      {children}
    </span>
  );
}
