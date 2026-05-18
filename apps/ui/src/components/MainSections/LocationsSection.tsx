import Image from "next/image"
import { ArrowRight, MapPin } from "lucide-react"

const LOCATIONS = [
  {
    region: "Ad Dakhiliyah",
    city: "Nizwa",
    tag: "DOOH Megascreen",
    image: "/landing-new/brand-card.png",
  },
  {
    region: "Muscat Governorate",
    city: "Muscat",
    tag: "Premium OOH",
    image: "/landing-new/brand-card.png",
  },
  {
    region: "Al Batinah North",
    city: "Sohar",
    tag: "Highway Network",
    image: "/landing-new/brand-card.png",
  },
]

export default function LocationsSection() {
  return (
    <section
      id="locations"
      className="relative w-full px-6 py-32 lg:px-10"
    >
      <div className="mx-auto w-full max-w-[1352px]">
        {/* Heading row */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-[12px] font-medium tracking-[0.3em] text-[#F62828] uppercase">
              Our OOH Locations
            </p>
            <h2 className="mt-5 text-[clamp(32px,5vw,48px)] leading-[1.1] font-[700] tracking-[-0.01em] text-[#FAFAFA]">
              Prime spots.
              <br />
              <span className="bg-[linear-gradient(170deg,#F62828_0%,#FF4D4D_100%)] bg-clip-text text-transparent">
                Maximum eyes.
              </span>
            </h2>
          </div>
          <a
            href="#all-locations"
            className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-2xl border border-[#292929] bg-[#0D0D0D]/40 px-6 text-[14px] font-bold text-white backdrop-blur-md transition-colors hover:bg-[#1F1F1F]/60 lg:justify-self-end"
          >
            View all locations
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* 3 cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {LOCATIONS.map((loc) => (
            <article
              key={loc.city}
              className="group relative h-[480px] overflow-hidden rounded-3xl lg:h-[543px]"
            >
              <Image
                src={loc.image}
                alt={`${loc.city}, ${loc.region}`}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(13,13,13,0.9)_0%,rgba(13,13,13,0)_50%,rgba(13,13,13,0)_100%)]" />

              {/* Top pill */}
              <div className="absolute top-4 left-4 inline-flex items-center rounded-full border border-[#292929] bg-[#0D0D0D]/80 px-3 py-2 text-[10px] font-medium tracking-[0.2em] text-[#FAFAFA] uppercase backdrop-blur-md">
                {loc.tag}
              </div>

              {/* Bottom content */}
              <div className="absolute right-6 bottom-6 left-6">
                <div className="flex items-center gap-2 text-[12px] text-[#A6A6A6]">
                  <MapPin className="h-3 w-3 text-[#F62828]" />
                  {loc.region}
                </div>
                <h3 className="mt-2 text-[clamp(32px,4vw,48px)] leading-none font-[700] tracking-[-0.01em] text-[#FAFAFA]">
                  {loc.city}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
