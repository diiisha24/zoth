"use client";

import { useEffect, useState } from "react";

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function getCountdownParts(remainingMs: number): CountdownParts {
  const remaining = Math.max(0, remainingMs);
  return {
    days: Math.floor(remaining / DAY),
    hours: Math.floor((remaining % DAY) / HOUR),
    minutes: Math.floor((remaining % HOUR) / MINUTE),
    seconds: Math.floor((remaining % MINUTE) / SECOND),
    isExpired: remaining <= 0,
  };
}

/**
 * Ticks once per second toward `targetMs`.
 *
 * `clockOffsetMs` is (server time - client time). Adding it keeps the timer
 * correct when the visitor's device clock is wrong.
 *
 * Returns `null` until mounted. That avoids a hydration mismatch, because
 * server and client would otherwise render different seconds.
 */
export function useCountdown(
  targetMs: number | undefined,
  clockOffsetMs = 0,
): CountdownParts | null {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (targetMs === undefined) return;

    let intervalId: number | undefined;
    const tick = () => setNow(Date.now() + clockOffsetMs);
    tick();

    // Line up with the start of the next wall-clock second so the
    // display does not drift between neighbouring ticks.
    const timeoutId = window.setTimeout(() => {
      tick();
      intervalId = window.setInterval(tick, SECOND);
    }, SECOND - (Date.now() % SECOND));

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [targetMs, clockOffsetMs]);

  if (now === null || targetMs === undefined) return null;
  return getCountdownParts(targetMs - now);
}
