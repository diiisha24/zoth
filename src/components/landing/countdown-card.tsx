"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Hourglass } from "lucide-react";

import { saleQueryKey } from "@/hooks/use-sale";
import { useCountdown } from "@/hooks/use-countdown";
import { formatPrice, padTwo } from "@/lib/format";
import { Loadable } from "./loadable";

function TimerUnit({ value, label }: { value?: number; label: string }) {
  return (
    <div className="flex w-12 flex-col items-center justify-center gap-0.5 bg-[#340e0e80] px-1 py-2">
      <span className="font-display text-lg leading-5 font-medium tracking-[0.56px] text-white tabular-nums">
        {value === undefined ? "--" : padTwo(value)}
      </span>
      <span className="text-[9px] font-medium tracking-[0.56px] text-white/80">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span
      aria-hidden="true"
      className="font-mono text-sm leading-5 font-bold tracking-[0.56px] text-white"
    >
      :
    </span>
  );
}

export function CountdownCard({
  endsAt,
  nextPriceUsd,
  symbol,
  clockOffsetMs,
}: {
  endsAt?: string;
  nextPriceUsd?: number | null;
  symbol?: string;
  clockOffsetMs: number;
}) {
  const queryClient = useQueryClient();
  const targetMs = endsAt ? Date.parse(endsAt) : undefined;
  const countdown = useCountdown(targetMs, clockOffsetMs);
  const isExpired = countdown?.isExpired ?? false;

  // When the stage closes, refetch so the next stage and deadline load.
  useEffect(() => {
    if (isExpired) {
      void queryClient.invalidateQueries({ queryKey: saleQueryKey });
    }
  }, [isExpired, endsAt, queryClient]);

  const deadlineLabel = targetMs
    ? new Date(targetMs).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      })
    : undefined;

  return (
    <div className="flex flex-col gap-4 border border-brand-track bg-black px-3.5 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-1.5">
          <Hourglass aria-hidden="true" className="size-6 text-brand" />
          <h3 className="font-display text-lg leading-[23.4px] font-medium text-white">
            Price increases soon
          </h3>
        </div>
        <p className="text-sm leading-5 text-white/80">
          Next stage price:{" "}
          <Loadable
            value={
              nextPriceUsd === undefined
                ? undefined
                : nextPriceUsd === null
                  ? "final stage"
                  : `${formatPrice(nextPriceUsd)} per ${symbol}`
            }
            className="w-24"
          />
        </p>
      </div>

      <div role="timer" aria-label="Time left in the current stage">
        {deadlineLabel && (
          <span className="sr-only">Current stage ends {deadlineLabel}.</span>
        )}
        <div aria-hidden="true" className="flex items-center gap-1">
          <TimerUnit value={countdown?.days} label="DAYS" />
          <Separator />
          <TimerUnit value={countdown?.hours} label="HRS" />
          <Separator />
          <TimerUnit value={countdown?.minutes} label="MIN" />
          <Separator />
          <TimerUnit value={countdown?.seconds} label="SEC" />
        </div>
      </div>
    </div>
  );
}
