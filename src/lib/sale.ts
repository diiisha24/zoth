/**
 * Sale domain types plus a deterministic mock data source.
 *
 * The mock is a pure function of the current time:
 * - Every request in the same moment returns the same numbers.
 * - Figures grow during a stage, so polling shows the page updating live.
 * - The stage deadline rolls forward every STAGE_DURATION_MS, so the
 *   countdown never runs out on a long-lived deployment.
 */

export type StageStatus = "completed" | "active" | "upcoming";

export interface SaleStage {
  id: number;
  name: string;
  priceUsd: number;
  tokenAllocation: number;
  status: StageStatus;
}

export interface SaleSnapshot {
  token: {
    name: string;
    symbol: string;
    network: string;
    totalSupply: number;
  };
  currency: "USD";
  raisedUsd: number;
  hardCapUsd: number;
  tokensSold: number;
  tokensForSale: number;
  participants: number;
  currentStage: {
    id: number;
    name: string;
    priceUsd: number;
    nextPriceUsd: number | null;
    tokensSold: number;
    tokenAllocation: number;
    raisedUsd: number;
    targetUsd: number;
    startsAt: string;
    endsAt: string;
  };
  stages: SaleStage[];
  purchase: {
    minUsd: number;
    tgeUnlockPct: number;
    vestingMonths: number;
  };
  /** Server clock at response time, used by the client to correct clock skew. */
  serverTime: string;
}

const STAGE_DURATION_MS = 3 * 24 * 60 * 60 * 1000;
const ROLLING_ANCHOR_MS = Date.UTC(2026, 0, 1);
const STAGE_ALLOCATION = 60_000_000;
const CURRENT_STAGE_INDEX = 2;

const STAGE_PRICES = [0.018, 0.021, 0.024, 0.028] as const;

const roundTo = (value: number, decimals: number) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

export function getSaleSnapshot(now: number = Date.now()): SaleSnapshot {
  const cycle = Math.floor((now - ROLLING_ANCHOR_MS) / STAGE_DURATION_MS);
  const startsAt = ROLLING_ANCHOR_MS + cycle * STAGE_DURATION_MS;
  const endsAt = startsAt + STAGE_DURATION_MS;
  const elapsed = (now - startsAt) / STAGE_DURATION_MS; // 0..1

  const stages: SaleStage[] = STAGE_PRICES.map((priceUsd, index) => ({
    id: index + 1,
    name: `Stage ${index + 1}`,
    priceUsd,
    tokenAllocation: STAGE_ALLOCATION,
    status:
      index < CURRENT_STAGE_INDEX
        ? "completed"
        : index === CURRENT_STAGE_INDEX
          ? "active"
          : "upcoming",
  }));

  const current = stages[CURRENT_STAGE_INDEX];
  const next = stages[CURRENT_STAGE_INDEX + 1] ?? null;

  // The current stage starts 35% sold and reaches 90% by the deadline.
  const stageTokensSold = Math.floor(
    current.tokenAllocation * (0.35 + 0.55 * elapsed),
  );
  const stageRaisedUsd = roundTo(stageTokensSold * current.priceUsd, 2);

  const completed = stages.filter((stage) => stage.status === "completed");
  const completedTokens = completed.reduce(
    (sum, stage) => sum + stage.tokenAllocation,
    0,
  );
  const completedRaised = completed.reduce(
    (sum, stage) => sum + stage.tokenAllocation * stage.priceUsd,
    0,
  );

  const tokensForSale = stages.reduce(
    (sum, stage) => sum + stage.tokenAllocation,
    0,
  );
  const hardCapUsd = stages.reduce(
    (sum, stage) => sum + stage.tokenAllocation * stage.priceUsd,
    0,
  );

  return {
    token: {
      name: "Demo",
      symbol: "DEMO",
      network: "EVM",
      totalSupply: 1_000_000_000,
    },
    currency: "USD",
    raisedUsd: roundTo(completedRaised + stageRaisedUsd, 2),
    hardCapUsd: roundTo(hardCapUsd, 2),
    tokensSold: completedTokens + stageTokensSold,
    tokensForSale,
    participants: 12_480 + Math.floor(elapsed * 1_850),
    currentStage: {
      id: current.id,
      name: current.name,
      priceUsd: current.priceUsd,
      nextPriceUsd: next?.priceUsd ?? null,
      tokensSold: stageTokensSold,
      tokenAllocation: current.tokenAllocation,
      raisedUsd: stageRaisedUsd,
      targetUsd: roundTo(current.tokenAllocation * current.priceUsd, 2),
      startsAt: new Date(startsAt).toISOString(),
      endsAt: new Date(endsAt).toISOString(),
    },
    stages,
    purchase: {
      minUsd: 50,
      tgeUnlockPct: 20,
      vestingMonths: 12,
    },
    serverTime: new Date(now).toISOString(),
  };
}

/** Minimal runtime guard so a malformed response fails loudly, not silently. */
export function isSaleSnapshot(value: unknown): value is SaleSnapshot {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<SaleSnapshot>;
  return (
    typeof candidate.raisedUsd === "number" &&
    typeof candidate.hardCapUsd === "number" &&
    Array.isArray(candidate.stages) &&
    typeof candidate.currentStage?.endsAt === "string" &&
    typeof candidate.serverTime === "string"
  );
}
