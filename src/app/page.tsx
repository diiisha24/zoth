import { AnnouncementBar } from "@/components/landing/announcement-bar";
import { Hero } from "@/components/landing/hero";
import { HeroBackground } from "@/components/landing/hero-background";
import { SiteHeader } from "@/components/landing/site-header";

export default function Home() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-black">
      <HeroBackground />
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <Hero />
      </main>
    </div>
  );
}
