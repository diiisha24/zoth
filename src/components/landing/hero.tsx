"use client";

import { RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useSale } from "@/hooks/use-sale";
import {
  formatCompact,
  formatInteger,
  formatPercent,
  formatPrice,
  formatUsd,
  toPercent,
} from "@/lib/format";
import { BuyPanel } from "./buy-panel";
import { CountdownCard } from "./countdown-card";
import { Loadable } from "./loadable";

// Copy is the Figma placeholder text ("Demo" / "Lorem ipsum"). Every "[XX]"
// slot in the design is filled with live values from /api/sale.

function StatCard({
  title,
  percent,
  left,
  right,
}: {
  title?: string;
  percent?: number;
  left?: string;
  right?: string;
}) {
  return (
    <article className="flex flex-1 flex-col gap-4 border border-brand bg-black/40 p-2.5">
      <div className="flex items-center justify-between gap-2 border-b border-brand-line pb-2">
        <h3 className="font-display text-xs font-medium text-white">
          <Loadable value={title} className="w-12" />
        </h3>
        <span className="text-sm text-brand tabular-nums">
          <Loadable
            value={percent === undefined ? undefined : formatPercent(percent)}
            className="w-10"
          />
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Progress value={percent} aria-label={`${title ?? "Demo"} progress`} />
        <div className="flex items-center justify-between gap-2 text-sm text-white/80 tabular-nums">
          <Loadable value={left} />
          <Loadable value={right} />
        </div>
      </div>
    </article>
  );
}

export function Hero() {
  const { data: sale, isError, refetch, isFetching, dataUpdatedAt } = useSale();

  const clockOffsetMs = sale ? Date.parse(sale.serverTime) - dataUpdatedAt : 0;
  const raisedPct = sale
    ? toPercent(sale.raisedUsd, sale.hardCapUsd)
    : undefined;
  const stagePct = sale
    ? toPercent(sale.currentStage.tokensSold, sale.currentStage.tokenAllocation)
    : undefined;
  const supplyPct = sale
    ? toPercent(sale.tokensSold, sale.tokensForSale)
    : undefined;

  return (
    <section
      id="sale"
      aria-labelledby="hero-title"
      className="container-page scroll-mt-6 pt-4 pb-20 lg:pt-5 lg:pb-[130px]"
    >
      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,560px)] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_1px_680px]">
        <div className="flex min-w-0 flex-col gap-10 pt-2">
          <div className="flex flex-col gap-[27px]">
            <span className="relative flex h-7 w-[207px] items-center justify-center border border-white/10 bg-[#02060b42] text-base tracking-[1.92px] text-brand backdrop-blur-[4.35px]">
              {/* "[ ]" bracket end caps, as in the design */}
              <span
                aria-hidden="true"
                className="absolute -top-px -bottom-px -left-px w-2 border-y border-l border-brand"
              />
              <span
                aria-hidden="true"
                className="absolute -top-px -right-px -bottom-px w-2 border-y border-r border-brand"
              />
              Lorem ipsum
            </span>
            <div className="flex flex-col gap-5">
              <h1
                id="hero-title"
                className="font-display text-[44px] leading-[1.05] font-medium tracking-[-1.32px] text-white sm:text-[56px] lg:text-[64px] lg:leading-[67.2px] lg:tracking-[-1.92px]"
              >
                Lorem ipsum dolor
              </h1>
              <p className="text-lg leading-[26.6px] text-white/60 sm:text-xl">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                eiusmod tempor incididunt ut labore et
              </p>
            </div>
          </div>

          {isError && !sale && (
            <div
              role="alert"
              className="flex items-center justify-between gap-4 border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-white"
            >
              <span>Live data could not be loaded.</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => void refetch()}
                disabled={isFetching}
              >
                <RotateCw aria-hidden="true" className="size-4" />
                Retry
              </Button>
            </div>
          )}

          <div
            aria-busy={!sale}
            className="flex flex-col gap-8 shadow-[0_0_122.6px_-50px_#ff45091c]"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-end justify-between gap-4 text-base tracking-[0.2px] text-white/80">
                  <span className="font-medium">Demo</span>
                  <span>Lorem ipsum</span>
                </div>
                <div className="flex items-end justify-between gap-4 font-display text-[26px] tabular-nums sm:text-[32px]">
                  <strong className="font-medium text-brand-cream">
                    <Loadable
                      value={sale ? formatUsd(sale.raisedUsd) : undefined}
                      className="w-40"
                    />
                  </strong>
                  <strong className="font-medium text-brand">
                    <Loadable
                      value={sale ? formatUsd(sale.hardCapUsd) : undefined}
                      className="w-40"
                    />
                  </strong>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Progress value={raisedPct} aria-label="Demo progress" />
                <div className="flex items-center justify-between gap-4 text-sm text-white/80 tabular-nums">
                  <Loadable
                    value={
                      raisedPct === undefined
                        ? undefined
                        : formatPercent(raisedPct)
                    }
                  />
                  <Loadable
                    value={sale ? formatInteger(sale.participants) : undefined}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 sm:flex-row">
                <StatCard
                  title={sale?.currentStage.name}
                  percent={stagePct}
                  left={
                    sale
                      ? formatCompact(sale.currentStage.tokensSold)
                      : undefined
                  }
                  right={
                    sale
                      ? formatCompact(sale.currentStage.tokenAllocation)
                      : undefined
                  }
                />
                <StatCard
                  title={sale?.token.symbol}
                  percent={supplyPct}
                  left={sale ? formatCompact(sale.tokensSold) : undefined}
                  right={sale ? formatCompact(sale.tokensForSale) : undefined}
                />
              </div>

              <div className="flex flex-col gap-1.5 border border-brand-track bg-black px-3.5 py-4">
                <span className="text-base font-medium tracking-[0.2px] text-white/80">
                  Demo
                </span>
                <strong className="font-display text-[26px] font-medium text-white tabular-nums sm:text-[32px]">
                  <Loadable
                    value={
                      sale ? formatPrice(sale.currentStage.priceUsd) : undefined
                    }
                    className="w-28"
                  />
                </strong>
              </div>

              <CountdownCard
                endsAt={sale?.currentStage.endsAt}
                clockOffsetMs={clockOffsetMs}
              />
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="hidden w-px bg-gradient-to-b from-brand-line via-brand-line/60 to-transparent lg:block"
        />

        <div className="pt-2 lg:sticky lg:top-6 lg:self-start">
          <BuyPanel />
        </div>
      </div>
    </section>
  );
}
