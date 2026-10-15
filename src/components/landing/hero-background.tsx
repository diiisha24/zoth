import Image from "next/image";

// Hero backdrop, as in the Figma export:
// - "background image": the client-supplied 3D grid SVG
//   (public/brand/hero-grid.svg), used unchanged at its native 1698×993 and
//   centred on the page, with its own fade mask.
// - "Ellipse 8": the blurred orange glow at x 1075 / y 345 of the 1698px frame.
//   Figma's layer blur is 250; CSS blur(210px) matches its rendered
//   brightness (measured against the Figma screenshot).
export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[993px] overflow-hidden"
    >
      <Image
        src="/brand/hero-grid.svg"
        alt=""
        width={1698}
        height={993}
        unoptimized
        priority
        className="absolute top-0 left-1/2 max-w-none -translate-x-1/2"
      />
      <div className="absolute top-[345px] left-[calc(50%+226px)] h-[339px] w-[215px] rotate-[19.22deg] rounded-[107.6px/169.68px] bg-brand blur-[210px]" />
    </div>
  );
}
