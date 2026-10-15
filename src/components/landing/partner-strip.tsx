// Partner logos were not included in the Figma export, so these are neutral
// "Demo" placeholder marks. Swap in approved partner assets before launch.

type Mark = "circle" | "triangle" | "diamond" | "rings" | "bars" | "hex";

const marks: Mark[] = [
  "circle",
  "triangle",
  "rings",
  "diamond",
  "bars",
  "hex",
  "diamond",
  "circle",
  "rings",
  "triangle",
];

function PartnerMark({ mark }: { mark: Mark }) {
  const common = {
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    className: "size-5 sm:size-6",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
  } as const;

  switch (mark) {
    case "circle":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3.5" fill="currentColor" />
        </svg>
      );
    case "triangle":
      return (
        <svg {...common}>
          <path d="M12 3l9 17H3z" />
        </svg>
      );
    case "diamond":
      return (
        <svg {...common}>
          <path d="M12 2.5l9.5 9.5-9.5 9.5L2.5 12z" />
        </svg>
      );
    case "rings":
      return (
        <svg {...common}>
          <circle cx="9" cy="12" r="6" />
          <circle cx="15" cy="12" r="6" />
        </svg>
      );
    case "bars":
      return (
        <svg {...common}>
          <path d="M5 20V10M10 20V4M15 20v-7M20 20V8" />
        </svg>
      );
    case "hex":
      return (
        <svg {...common}>
          <path d="M12 2.5l8.5 4.75v9.5L12 21.5l-8.5-4.75v-9.5z" />
        </svg>
      );
  }
}

/**
 * Full-height divider that meets the bottom border with a "┴". At the top it
 * shows a "+" (outer ends of the strip) or a "┬" (`top="tee"`, the divider
 * right of the label box), as in the design.
 */
function Divider({
  className,
  top = "plus",
}: {
  className: string;
  top?: "plus" | "tee";
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -inset-y-px z-10 w-px bg-strip-mark ${className}`}
    >
      {top === "plus" ? (
        <span className="absolute -top-[7px] left-1/2 size-3.5 -translate-x-1/2">
          <span className="absolute top-0 left-[5.5px] h-3.5 w-[3px] bg-strip-mark" />
          <span className="absolute top-[5.5px] left-0 h-[3px] w-3.5 bg-strip-mark" />
        </span>
      ) : (
        <span className="absolute -top-px left-1/2 h-[9px] w-3.5 -translate-x-1/2">
          <span className="absolute top-0 left-[5.5px] h-[9px] w-[3px] bg-strip-mark" />
          <span className="absolute top-0 left-0 h-[3px] w-3.5 bg-strip-mark" />
        </span>
      )}
      <span className="absolute -bottom-px left-1/2 h-[9px] w-3.5 -translate-x-1/2">
        <span className="absolute bottom-0 left-[5.5px] h-[9px] w-[3px] bg-strip-mark" />
        <span className="absolute bottom-0 left-0 h-[3px] w-3.5 bg-strip-mark" />
      </span>
    </span>
  );
}

export function PartnerStrip() {
  const loop = [...marks, ...marks];

  return (
    <section aria-label="Partners" className="relative pt-1.5">
      <div className="border-y border-strip-line bg-[#22030354] backdrop-blur-[11.73px]">
        <div className="container-page">
          <div className="relative flex h-[88px] items-stretch">
            {/* Label box (232px in the design), framed by two dividers */}
            <Divider className="left-0 hidden sm:block" />
            <Divider top="tee" className="left-[232px] hidden sm:block" />
            <div className="hidden w-[232px] shrink-0 items-center pl-9 sm:flex">
              <p className="font-display text-[15.7px] leading-tight text-white">
                DEMO
                <br />
                DEMO
              </p>
            </div>

            <div className="relative min-w-0 flex-1 self-center overflow-hidden">
              <ul className="flex h-16 w-max animate-marquee items-center gap-7 pl-7 hover:[animation-play-state:paused] sm:gap-10 sm:pl-10">
                {loop.map((mark, index) => (
                  <li
                    key={index}
                    aria-hidden={index >= marks.length}
                    className="flex h-[56px] w-[115px] items-center justify-center gap-1.5 sm:w-[143px] sm:gap-2 text-white/45 transition-colors hover:text-white/80"
                  >
                    <PartnerMark mark={mark} />
                    <span className="font-display text-base font-semibold tracking-tight sm:text-lg">
                      Demo
                    </span>
                  </li>
                ))}
              </ul>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r sm:w-[101px] from-[#0c0202] to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l sm:w-[101px] from-[#0d0202] to-transparent"
              />
            </div>

            <span
              aria-hidden="true"
              className="hidden w-px shrink-0 lg:block"
            />
            <Divider className="right-0 hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
