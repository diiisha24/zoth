// Recreates the perspective "room" grid and orange glow behind the hero.
// The lines are generated once at module load, so this ships as static SVG.

const W = 1698;
const H = 992;
const CX = W / 2;
const CY = 470;
const BACK_WALL = 0.3;
const DEPTHS = [0.3, 0.4, 0.53, 0.7, 0.92, 1.2, 1.6];

const edgePoints: Array<[number, number]> = [
  ...Array.from({ length: 17 }, (_, i): [number, number] => [(W / 16) * i, 0]),
  ...Array.from({ length: 17 }, (_, i): [number, number] => [(W / 16) * i, H]),
  ...Array.from({ length: 9 }, (_, i): [number, number] => [
    0,
    (H / 10) * (i + 1),
  ]),
  ...Array.from({ length: 9 }, (_, i): [number, number] => [
    W,
    (H / 10) * (i + 1),
  ]),
];

const radialLines = edgePoints.map(([x, y]) => ({
  x1: CX + (x - CX) * BACK_WALL,
  y1: CY + (y - CY) * BACK_WALL,
  x2: x,
  y2: y,
}));

const depthRects = DEPTHS.map((scale) => ({
  x: CX - CX * scale,
  y: CY - CY * scale,
  width: W * scale,
  height: 2 * CY * scale,
}));

export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[992px] overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMin slice"
      >
        <defs>
          <linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.7" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="grid-mask">
            <rect width={W} height={H} fill="url(#grid-fade)" />
          </mask>
        </defs>
        <g
          mask="url(#grid-mask)"
          stroke="#ffffff"
          strokeOpacity="0.09"
          fill="none"
        >
          {radialLines.map((line, i) => (
            <line key={`r-${i}`} {...line} vectorEffect="non-scaling-stroke" />
          ))}
          {depthRects.map((rect, i) => (
            <rect key={`d-${i}`} {...rect} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_58%_48%,rgba(255,69,9,0.16),transparent_70%)]" />
      <div className="absolute top-[345px] left-[63%] h-[339px] w-[215px] rotate-[19.22deg] rounded-[107.6px/169.68px] bg-brand opacity-70 blur-[160px]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
    </div>
  );
}
