import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="skeleton"
      aria-hidden="true"
      className={cn("inline-block animate-pulse bg-white/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
