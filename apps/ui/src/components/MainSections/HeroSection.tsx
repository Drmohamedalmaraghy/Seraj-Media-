"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const SLIDES = [
  {
    key: "ooh",
    label: "OOH · Out-of-Home",
    image: "/landing-new/hero-billboard.png",
  },
  {
    key: "news",
    label: "Seraj News",
    image: "/landing-new/hero-billboard.png",
  },
  {
    key: "podcast",
    label: "Seraj Podcast",
    image: "/landing-new/hero-billboard.png",
  },
  {
    key: "production",
    label: "Seraj Production",
    image: "/landing-new/hero-billboard.png",
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="hero"
      className="relative h-[100svh] min-h-[700px] w-full overflow-hidden"
    >
      {/* Cross-fade image slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.key}
          aria-hidden={current !== i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: current === i ? 1 : 0 }}
        >
          <Image
            src={slide.image}
            alt={slide.label}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Radial red glow overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(246,40,40,0.25) 0%, rgba(13,13,13,0.95) 60%, rgba(13,13,13,1) 100%)",
        }}
      />
      {/* Dimming overlay */}
      <div className="absolute inset-0 bg-[#0D0D0D]/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-[81px] text-center lg:px-10">
        {/* Top badge */}
        <div className="mb-10 inline-flex items-center justify-center rounded-full border border-[#F62828]/30 bg-[#F62828]/10 px-6 py-1.5 text-[11px] tracking-[0.2em] uppercase">
          <span className="text-[#FAFAFA]">
            Oman&apos;s #1 OOH Network · 350+ Screens
          </span>
        </div>

        <h1 className="font-[600] text-[clamp(48px,9vw,96px)] leading-[1.05] tracking-[-0.01em] text-[#FAFAFA]">
          TO BE{" "}
          <span className="bg-[linear-gradient(155deg,#F62828_0%,#FF4D4D_100%)] bg-clip-text text-transparent">
            SEEN.
          </span>
        </h1>

        <p className="mt-6 max-w-[640px] text-[16px] leading-[28px] text-white/90 lg:text-[18px]">
          SERAJ by ONEIC Media — featuring 350+ static and digital screens and
          12+ megascreens across the Sultanate.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#locations"
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-[linear-gradient(167deg,#F62828_0%,#FF4D4D_100%)] px-8 text-[15px] font-bold text-white shadow-[0_24px_70px_-20px_rgba(246,40,40,0.5)] transition-transform hover:scale-[1.02]"
          >
            Explore OOH Network
          </a>
          <a
            href="#contact"
            className="inline-flex h-14 items-center justify-center rounded-2xl border border-[#292929] bg-[#0D0D0D]/40 px-8 text-[15px] font-bold text-white backdrop-blur-md transition-colors hover:bg-[#1F1F1F]/60"
          >
            Plan a Campaign
          </a>
        </div>
      </div>

      {/* Bottom strip with carousel controls + indicator */}
      <div className="absolute right-0 bottom-0 left-0 z-10 h-[113px] border-t border-[#292929]/50 bg-[#0D0D0D]/70 backdrop-blur-md">
        <div className="relative mx-auto flex h-full max-w-[1920px] items-center justify-center px-4">
          {/* Prev */}
          <button
            type="button"
            onClick={() =>
              setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length)
            }
            className="absolute top-1/2 left-8 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#292929]/60 bg-[#0D0D0D]/40 text-white backdrop-blur-md transition-colors hover:bg-[#1F1F1F]/60"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Indicator capsule */}
          <div className="inline-flex h-[46px] items-center gap-4 rounded-full border border-[#292929]/60 bg-[#0D0D0D]/60 px-6 backdrop-blur-md">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.key}
                type="button"
                onClick={() => setCurrent(i)}
                className={`text-[11px] tracking-[0.2em] uppercase transition-colors ${
                  current === i ? "text-white" : "text-[#A6A6A6] hover:text-white"
                }`}
              >
                {slide.label}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={() => setCurrent((c) => (c + 1) % SLIDES.length)}
            className="absolute top-1/2 right-8 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-[#292929]/60 bg-[#0D0D0D]/40 text-white backdrop-blur-md transition-colors hover:bg-[#1F1F1F]/60"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
