"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { CornerFrame } from "./corner-frame";

type Option = "first" | "second";

const options: Array<{ id: Option; label: string }> = [
  { id: "first", label: "Lorem ipsum" },
  { id: "second", label: "Lorem ipsum" },
];

export function BuyPanel() {
  const [selected, setSelected] = useState<Option>("first");

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
            className="text-base font-medium tracking-[0.2px] text-white"
          >
            LOREM IPSUM
          </h2>
          <p className="text-base tracking-[0.2px] text-white/80 sm:text-lg">
            Lorem ipsum dolor sit amet consectetur adipiscing
          </p>
        </div>

        <div
          role="group"
          aria-label="Options"
          className="flex flex-col gap-4 pt-4"
        >
          {options.map((option, index) => {
            const isSelected = selected === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isSelected}
                aria-label={`${option.label} ${index + 1}`}
                onClick={() => setSelected(option.id)}
                className="group w-full outline-none"
              >
                <CornerFrame
                  inverted
                  className="h-[75px] p-2"
                  tickClassName="size-2 border-brand"
                >
                  <span
                    className={cn(
                      "flex flex-1 items-center justify-center px-6 py-2 font-display text-[17.4px] leading-[30.4px] font-medium tracking-[-0.22px] text-white transition-colors group-focus-visible:ring-2 group-focus-visible:ring-white",
                      isSelected
                        ? "bg-brand group-hover:bg-[#ff5d2b]"
                        : "border border-brand group-hover:bg-brand/10",
                    )}
                  >
                    {option.label}
                  </span>
                </CornerFrame>
              </button>
            );
          })}
        </div>

        <p className="text-center text-sm tracking-[0.2px] text-white/80">
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
        </p>
      </div>
    </section>
  );
}
