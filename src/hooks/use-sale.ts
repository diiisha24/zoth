"use client";

import { useQuery } from "@tanstack/react-query";

import { isSaleSnapshot, type SaleSnapshot } from "@/lib/sale";

export const saleQueryKey = ["sale"] as const;

async function fetchSale(): Promise<SaleSnapshot> {
  const response = await fetch("/api/sale", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Sale request failed with status ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!isSaleSnapshot(data)) {
    throw new Error("Sale response did not match the expected shape");
  }
  return data;
}

export function useSale() {
  return useQuery({
    queryKey: saleQueryKey,
    queryFn: fetchSale,
    // Poll so raised amounts and participant counts stay current.
    refetchInterval: 30_000,
  });
}
