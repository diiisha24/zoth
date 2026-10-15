"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { formatPrice, formatUsd } from "@/lib/format";
import type { SaleSnapshot } from "@/lib/sale";
import { BracketFrame } from "./bracket-frame";
import { Loadable } from "./loadable";

type PaymentMethod = "crypto" | "card";

const methods: Array<{ id: PaymentMethod; label: string }> = [
  { id: "crypto", label: "Pay with crypto" },
  { id: "card", label: "Pay with card" },
];

export function BuyPanel({ sale }: { sale?: SaleSnapshot }) {
  const [method, setMethod] = useState<PaymentMethod>("crypto");

  const minimum = sale ? formatUsd(sale.purchase.minUsd) : undefined;
  const note = !sale
    ? undefined
    : method === "crypto"
      ? `Connect a wallet to pay with ETH or USDT. Minimum purchase ${minimum}.`
      : `Pay by debit or credit card. Minimum purchase ${minimum}.`;

  return (
    <section
      id="buy"
      aria-labelledby="buy-title"
      className="scroll-mt-6 border border-brand bg-[linear-gradient(0deg,rgba(0,0,0,0.8),rgba(0,0,0,0.8)),linear-gradient(0deg,#350f0f,#350f0f)] p-4 shadow-[0_0_122.6px_-50px_#ff45091c] sm:p-[22px]"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2
            id="buy-title"
            className="text-base font-medium tracking-[0.2px] text-white uppercase"
          >
            Buy {sale?.token.symbol ?? "DEMO"}
          </h2>
          <p className="text-base tracking-[0.2px] text-white/80 sm:text-lg">
            {sale?.currentStage.name ?? "Current stage"} price:{" "}
            <Loadable
              value={sale ? formatPrice(sale.currentStage.priceUsd) : undefined}
            />{" "}
            per token
          </p>
        </div>

        <fieldset className="flex flex-col gap-4 pt-4">
          <legend className="sr-only">Payment method</legend>
          {methods.map((option) => {
            const selected = method === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setMethod(option.id)}
                className="group w-full text-left outline-none"
              >
                <BracketFrame
                  className="h-[78px]"
                  capClassName={cn(!selected && "border-brand/60")}
                >
                  <span
                    className={cn(
                      "my-[9.5px] flex flex-1 items-center justify-center px-6 py-2 font-display text-[17.4px] leading-[30.4px] font-medium tracking-[-0.22px] text-white transition-colors group-focus-visible:ring-2 group-focus-visible:ring-white",
                      selected
                        ? "bg-brand group-hover:bg-[#ff5d2b]"
                        : "border border-brand group-hover:bg-brand/10",
                    )}
                  >
                    {option.label}
                  </span>
                </BracketFrame>
              </button>
            );
          })}
        </fieldset>

        <p
          aria-live="polite"
          className="text-center text-sm tracking-[0.2px] text-white/80"
        >
          <Loadable value={note} className="w-64" />
        </p>
      </div>
    </section>
  );
}
