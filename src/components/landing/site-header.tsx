"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CornerFrame } from "./corner-frame";
import { Logo } from "./logo";

const navigation = [
  { label: "Demo", href: "#sale" },
  { label: "Demo", href: "#buy" },
  { label: "Demo", href: "#roadmap" },
  { label: "Demo", href: "#docs" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="relative z-20">
      <div className="container-page flex h-20 items-center justify-between gap-6 lg:h-[122px]">
        <Link href="/" aria-label="Demo home" className="shrink-0 lg:w-[228px]">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <CornerFrame className="h-[46px] w-[474px] px-[2.5px] py-[3px]">
            <ul className="flex flex-1 items-center justify-center gap-[60px] bg-secondary">
              {navigation.map((item, index) => (
                <li key={`${item.href}-${index}`}>
                  <a
                    href={item.href}
                    className="font-display text-sm leading-[17.5px] tracking-[-0.28px] text-white opacity-70 transition-opacity hover:opacity-100 focus-visible:underline focus-visible:opacity-100 focus-visible:outline-none"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </CornerFrame>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Button asChild variant="outline" className="w-[181px]">
            <a href="#docs">Lorem ipsum</a>
          </Button>
          <Button asChild className="w-[164px]">
            <a href="#buy">Lorem ipsum</a>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-y border-brand-line bg-black/95 backdrop-blur-md lg:hidden"
        >
          <nav aria-label="Mobile" className="container-page py-4">
            <ul className="flex flex-col">
              {navigation.map((item, index) => (
                <li key={`${item.href}-${index}`}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-lg text-white/80 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Button asChild variant="outline">
                <a href="#docs" onClick={() => setOpen(false)}>
                  Lorem ipsum
                </a>
              </Button>
              <Button asChild>
                <a href="#buy" onClick={() => setOpen(false)}>
                  Lorem ipsum
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
