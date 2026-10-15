import { AnnouncementBar } from "@/components/landing/announcement-bar";
import { Hero } from "@/components/landing/hero";
import { HeroBackground } from "@/components/landing/hero-background";
import { PartnerStrip } from "@/components/landing/partner-strip";
import { SaleDetails } from "@/components/landing/sale-details";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

export default function Home() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-black">
      <HeroBackground />
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <Hero />
        <div className="flex flex-col gap-[27px]">
          <PartnerStrip />
          <SaleDetails />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
