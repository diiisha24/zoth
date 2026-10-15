import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** Shows `value`, or a same-height skeleton while the data is loading. */
export function Loadable({
  value,
  className,
}: {
  value: React.ReactNode | undefined;
  className?: string;
}) {
  if (value === undefined || value === null) {
    return (
      <Skeleton className={cn("h-[0.85em] w-16 align-middle", className)} />
    );
  }
  // Wrapped so neighbouring values stay separate flex items.
  return <span>{value}</span>;
}
