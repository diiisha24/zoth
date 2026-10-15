import { cn } from "@/lib/utils";

/**
 * Small L-shaped corner ticks around a box, as on the Figma nav pill, hero
 * badge and purchase option buttons. The box sits inside the frame, inset by
 * the padding passed in `className`.
 *
 * - default: ticks wrap the frame corners ("┌ ┐ └ ┘").
 * - inverted: ticks point outward from the inner box corners ("┘ └ ┐ ┌").
 *   Set the frame padding equal to the tick size so the arms meet the box.
 */
export function CornerFrame({
  children,
  className,
  tickClassName = "size-[5px] border-brand",
  inverted = false,
}: {
  children: React.ReactNode;
  className?: string;
  tickClassName?: string;
  inverted?: boolean;
}) {
  const tick = cn("pointer-events-none absolute", tickClassName);
  const corners = inverted
    ? [
        "top-0 left-0 border-r border-b",
        "top-0 right-0 border-b border-l",
        "bottom-0 left-0 border-t border-r",
        "right-0 bottom-0 border-t border-l",
      ]
    : [
        "top-0 left-0 border-t border-l",
        "top-0 right-0 border-t border-r",
        "bottom-0 left-0 border-b border-l",
        "right-0 bottom-0 border-r border-b",
      ];

  return (
    <span className={cn("relative flex", className)}>
      {corners.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={cn(tick, position)}
        />
      ))}
      {children}
    </span>
  );
}
