"use client";

import {
  Blocks,
  CalendarClock,
  CircleDollarSign,
  Copy,
  HandCoins,
  Target,
  type LucideIcon,
} from "lucide-react";

import { useSale } from "@/hooks/use-sale";
import { formatPrice } from "@/lib/format";
import type { SaleSnapshot } from "@/lib/sale";
import { cn } from "@/lib/utils";
import { Loadable } from "./loadable";

const comparisonRows = ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"];

const milestoneTitles = ["Lorem ipsum", "DEMO", "Demo", "DEMO"];

function ComparisonCard() {
  return (
    <section
      id="docs"
      aria-labelledby="docs-title"
      className="flex min-h-[225px] w-full scroll-mt-6 flex-col justify-between border border-[#330e02] bg-[linear-gradient(0deg,rgba(0,0,0,0.8),rgba(0,0,0,0.8)),linear-gradient(0deg,#350f0f,#350f0f)] p-4 shadow-[0_0_122.6px_-50px_#ff45091c] sm:p-[22px]"
    >
      <h3
        id="docs-title"
        className="px-3 font-display text-lg leading-[23.4px] font-medium text-brand-cream"
      >
        Lorem ipsum dolor
      </h3>
      <ul className="flex flex-col pt-2.5">
        {comparisonRows.map((label, index) => (
          <li
            key={index}
            className="flex h-[52px] items-center justify-between px-3"
          >
            <span className="text-sm leading-5 text-[#f2f2f2]">{label}</span>
            <a
              href="#"
              className="text-base leading-5 tracking-[0.2px] text-white underline underline-offset-4 opacity-50 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Demo
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Milestones({ sale }: { sale?: SaleSnapshot }) {
  const activeIndex = sale?.stages.findIndex((s) => s.status === "active") ?? 0;

  return (
    <ol
      id="roadmap"
      aria-label="Milestones"
      className="flex scroll-mt-6 flex-col md:grid md:grid-cols-4 xl:grid-cols-[repeat(4,197.55px)]"
    >
      {milestoneTitles.map((title, index) => {
        // The first milestone carries the live "[XX]" value; it is the active one.
        const active = index === 0;
        const detail = active
          ? sale
            ? formatPrice(sale.stages[Math.max(activeIndex, 0)].priceUsd)
            : undefined
          : "Lorem ipsum";

        return (
          <li
            key={index}
            aria-current={active ? "step" : undefined}
            className="relative grid gap-0.5 pb-6 pl-8 md:pt-[30px] md:pr-4 md:pb-0 md:pl-0"
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-0.5 left-0 z-10 size-[18px] rounded-full border-2 bg-[#0b0807]",
                active ? "border-brand" : "border-[#ffe9dc3d]",
              )}
            />
            <span
              aria-hidden="true"
              className="absolute top-5 bottom-0 left-2 w-0.5 bg-[#ffe9dc1f] md:top-2 md:right-0 md:bottom-auto md:left-3.5 md:h-0.5 md:w-auto"
            />
            {/* 20px tag row (design grid: 20px / 23.4px / 21.7px). Only the
                active milestone shows a tag; the rest keep the row so titles align. */}
            <span className="h-5 text-xs leading-5 text-brand">
              {active ? "Demo" : null}
            </span>
            <strong className="font-display text-lg leading-[23.4px] font-medium text-brand-cream">
              {title}
            </strong>
            <span className="text-sm leading-[21.7px] text-brand-sand">
              <Loadable value={detail} className="w-16" />
            </span>
          </li>
        );
      })}
    </ol>
  );
}

interface DetailRow {
  icon: LucideIcon;
  iconClassName?: string;
  label: string;
  value?: React.ReactNode;
  secondary?: { label: string; value: string };
  action?: boolean;
}

function DetailList({ sale }: { sale?: SaleSnapshot }) {
  const rows: DetailRow[] = [
    { icon: Blocks, label: "Demo", value: "DEMO" },
    {
      icon: HandCoins,
      label: "Lorem ipsum",
      value: (
        <span className="inline-flex items-center gap-[5px]">
          <span
            aria-hidden="true"
            className="flex size-[18px] items-center justify-center rounded-full bg-white"
          >
            <CircleDollarSign
              className="size-3.5 text-black"
              strokeWidth={2.5}
            />
          </span>
          DEMO
        </span>
      ),
    },
    {
      icon: Copy,
      iconClassName: "-scale-y-100",
      label: "Lorem ipsum",
      value: sale ? formatPrice(sale.currentStage.priceUsd) : undefined,
    },
    {
      icon: Target,
      label: "Demo",
      value: sale ? `${sale.purchase.tgeUnlockPct}%` : undefined,
      secondary: { label: "Demo", value: "Lorem ipsum" },
    },
    { icon: CalendarClock, label: "Lorem ipsum", value: "Demo", action: true },
  ];

  return (
    <dl className="flex w-full flex-col">
      {rows.map((row, index) => (
        <div
          key={index}
          className={cn(
            index > 0 &&
              (index === rows.length - 1
                ? "border-t-2 border-white/15"
                : "border-t border-white/10"),
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between gap-4",
              index === rows.length - 1 ? "py-3" : "py-[8.5px]",
            )}
          >
            <dt className="inline-flex items-center gap-3 text-base leading-5 text-[#f2f2f2]">
              <row.icon
                aria-hidden="true"
                className={cn("size-[18px] text-white", row.iconClassName)}
              />
              {row.label}
            </dt>
            <dd className="text-base text-[#f2f2f2] tabular-nums">
              {row.action ? (
                <a
                  href="#"
                  className="underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  {row.value}
                </a>
              ) : (
                <Loadable value={row.value} />
              )}
            </dd>
          </div>
          {row.secondary && (
            <div className="flex items-start justify-between gap-4 pt-1 pb-3 pl-[30px] text-base leading-5 text-[#f2f2f2]">
              <dt>{row.secondary.label}</dt>
              <dd>{row.secondary.value}</dd>
            </div>
          )}
        </div>
      ))}
    </dl>
  );
}

export function SaleDetails() {
  const { data: sale } = useSale();

  return (
    <section
      aria-labelledby="details-title"
      className="bg-black py-16 lg:py-20"
    >
      <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-12 xl:grid-cols-[minmax(0,1fr)_790px] xl:gap-16 2xl:gap-[120px]">
        <div className="flex flex-col gap-10 lg:gap-[54px]">
          <div className="flex flex-col gap-4">
            <h2
              id="details-title"
              className="font-display text-[36px] leading-tight tracking-[-0.64px] text-white sm:text-5xl"
            >
              Lorem ipsum
            </h2>
            <p className="text-lg leading-[1.35] text-white/60 sm:text-[22px] sm:leading-[29.3px]">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
              eiusmod tempor
            </p>
          </div>
          <ComparisonCard />
        </div>

        <div className="flex min-w-0 flex-col gap-6">
          <Milestones sale={sale} />
          <DetailList sale={sale} />
        </div>
      </div>
    </section>
  );
}
