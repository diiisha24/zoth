import { Globe, Mail, MessageCircle, Rss, Send } from "lucide-react";

import { NewsletterForm } from "./newsletter-form";

const socials = [
  { label: "Demo channel", icon: Send },
  { label: "Demo chat", icon: MessageCircle },
  { label: "Demo website", icon: Globe },
  { label: "Demo feed", icon: Rss },
  { label: "Demo email", icon: Mail },
];

const columns = [
  { title: "DEMO", items: ["Demo", "Demo"] },
  { title: "DEMO", items: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"] },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-[37px] overflow-hidden bg-black pb-12 lg:pb-16">
      <div className="container-page">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex w-full max-w-[345px] flex-col gap-12 pb-8">
            <div className="flex flex-col gap-3">
              <p className="pr-[100px] text-[13.6px] leading-5 text-white/50">
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed
              </p>
              <ul className="flex items-center gap-4">
                {socials.map(({ label, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href="#"
                      aria-label={label}
                      className="block text-white/70 transition-colors hover:text-brand focus-visible:text-brand focus-visible:outline-none"
                    >
                      <Icon aria-hidden="true" className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <NewsletterForm />
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 lg:flex lg:gap-8"
          >
            {columns.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className="flex flex-col gap-6 lg:w-[293.67px]"
              >
                <h2 className="font-display text-[18.5px] leading-[20.7px] text-white">
                  {column.title}
                </h2>
                <ul className="flex flex-col gap-2">
                  {column.items.map((item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-[16.2px] leading-[20.7px] text-white/50 transition-colors hover:text-white"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-6 lg:mt-24 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[603px] text-xs leading-5 text-[#a8a8aa]">
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem
            ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
            tempor incididunt ut labore et dolore magna
          </p>
          <div className="flex flex-wrap items-center gap-3 text-[13.7px] text-[#a8a8aa]">
            <a href="#" className="hover:text-white">
              Lorem ipsum
            </a>
            <span aria-hidden="true" className="text-white/30">
              ·
            </span>
            <a href="#" className="hover:text-white">
              Lorem ipsum
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
