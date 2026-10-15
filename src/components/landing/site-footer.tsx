import { NewsletterForm } from "./newsletter-form";
import {
  DiscordIcon,
  LinkedInIcon,
  MediumIcon,
  XIcon,
  YouTubeIcon,
} from "./social-icons";

const socials = [
  { label: "X", icon: XIcon },
  { label: "YouTube", icon: YouTubeIcon },
  { label: "Discord", icon: DiscordIcon },
  { label: "LinkedIn", icon: LinkedInIcon },
  { label: "Medium", icon: MediumIcon },
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
                      <Icon className="size-4" />
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
          <span className="text-sm leading-[18px] text-[#a8a8aa]">
            Lorem ipsum
          </span>
        </div>
      </div>
    </footer>
  );
}
