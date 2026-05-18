import { setRequestLocale } from "next-intl/server"

import type { PageProps } from "@/types/next"

import AboutSection from "@/components/MainSections/AboutSection"
import BrandsSection from "@/components/MainSections/BrandsSection"
import HeroSection from "@/components/MainSections/HeroSection"
import LocationsSection from "@/components/MainSections/LocationsSection"
import MainFooter from "@/components/MainSections/MainFooter"
import MainHeader from "@/components/MainSections/MainHeader"
import NewsSection from "@/components/MainSections/NewsSection"
import VideoSection from "@/components/MainSections/VideoSection"

export const metadata = {
  title: "Seraj Media — Preview (Landing New)",
  description: "Hardcoded preview of the redesigned main page.",
}

export default async function LandingNewPage(props: PageProps) {
  const params = await props.params
  setRequestLocale(params.locale)

  return (
    <div className="relative w-full bg-[#0D0D0D] text-white">
      <MainHeader />
      <main className="overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <BrandsSection />
        <LocationsSection />
        <NewsSection />
        <VideoSection />
      </main>
      <MainFooter />
    </div>
  )
}
