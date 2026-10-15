"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Hourglass } from "lucide-react";

import { saleQueryKey } from "@/hooks/use-sale";
import { useCountdown } from "@/hooks/use-countdown";
import { padTwo } from "@/lib/format";

function TimerUnit({ value }: { value?: number }) {
  return (
    <div className="flex w-12 flex-col items-center justify-center gap-0.5 bg-[#340e0e80] px-1 py-2">
      <span className="font-display text-lg leading-5 font-medium tracking-[0.56px] text-white tabular-nums">
        {value === undefined ? "--" : padTwo(value)}
      </span>
      <span className="text-[9px] font-medium tracking-[0.56px] text-white/80">
        DEMO
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
  clockOffsetMs,
}: {
  endsAt?: string;
  clockOffsetMs: number;
}) {
  const queryClient = useQueryClient();
  const targetMs = endsAt ? Date.parse(endsAt) : undefined;
  const countdown = useCountdown(targetMs, clockOffsetMs);
  const isExpired = countdown?.isExpired ?? false;

  // When the stage closes, refetch so the next deadline is loaded.
  useEffect(() => {
    if (isExpired) {
      void queryClient.invalidateQueries({ queryKey: saleQueryKey });
    }
  }, [isExpired, endsAt, queryClient]);

  const srLabel = countdown
    ? `${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes left`
    : "Loading";

  return (
    <div className="flex flex-col gap-4 border border-brand-track bg-black px-3.5 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-1.5">
          <Hourglass aria-hidden="true" className="size-6 text-brand" />
          <h3 className="font-display text-lg leading-[23.4px] font-medium text-white">
            Lorem ipsum dolor
          </h3>
        </div>
        <p className="text-sm leading-5 text-white/80">
          Lorem ipsum dolor sit amet consectetur
        </p>
      </div>

      <div role="timer" aria-label="Demo timer">
        {/* Announce minutes, not every second, to avoid screen-reader noise. */}
        <span className="sr-only">{srLabel}</span>
        <div aria-hidden="true" className="flex items-center gap-1">
          <TimerUnit value={countdown?.days} />
          <Separator />
          <TimerUnit value={countdown?.hours} />
          <Separator />
          <TimerUnit value={countdown?.minutes} />
          <Separator />
          <TimerUnit value={countdown?.seconds} />
        </div>
      </div>
    </div>
  );
}
