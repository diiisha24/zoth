// Three overlapping layers: a front square at the top right with two
// L-shaped layers stepping down to the bottom left, as in the design.
// Drawn in lucide's style (24px grid, round caps) so it sits with the other
// detail icons.
export function StackedSquaresIcon({
  className,
  strokeWidth = 2,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="11" y="2" width="11" height="11" rx="2" />
      <path d="M7 6.5V14a3 3 0 0 0 3 3h7.5" />
      <path d="M3 10.5V18a3 3 0 0 0 3 3h7.5" />
    </svg>
  );
}
