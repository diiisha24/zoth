const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const usdPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 3,
  maximumFractionDigits: 4,
});

const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const integer = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export const formatUsd = (value: number) => usd.format(value);
export const formatPrice = (value: number) => usdPrice.format(value);
export const formatCompact = (value: number) => compact.format(value);
export const formatInteger = (value: number) => integer.format(value);

export const toPercent = (part: number, whole: number) =>
  whole > 0 ? Math.min(100, (part / whole) * 100) : 0;

export const formatPercent = (value: number) => `${value.toFixed(1)}%`;

export const padTwo = (value: number) => String(value).padStart(2, "0");
