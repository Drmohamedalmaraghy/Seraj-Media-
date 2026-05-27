"use client"

import { useEffect, useState } from "react"
import { Data } from "@repo/strapi"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"
import StrapiButton from "@/components/page-builder/components/utilities/StrapiButton"

export function MainHero({
  component,
}: {
  readonly component: Data.Component<"sections.main-hero">
}) {
  const {
    badgeText,
    titleStart,
    titleAccent,
    description,
    primaryButton,
    secondaryButton,
    slides,
    autoplayMs,
  } = component

  const [current, setCurrent] = useState(0)
  const slidesList = slides ?? []
  const interval = autoplayMs && autoplayMs > 0 ? autoplayMs : 6000

  useEffect(() => {
    if (slidesList.length < 2) return
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % slidesList.length)
    }, interval)
    return () => clearInterval(id)
  }, [slidesList.length, interval])

  return (
    <section
      id="hero"
      className="relative h-[100svh] min-h-[700px] w-full overflow-hidden"
    >
      {slidesList.map((slide, i) => (
        <div
          key={slide.id ?? i}
          aria-hidden={current !== i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: current === i ? 1 : 0 }}
        >
          <StrapiBasicImage
            component={slide.image}
            fill
            sizes="100vw"
            className="object-cover"
            useNativeNextImageOnly
          />
        </div>
      ))}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(246,40,40,0.25) 0%, rgba(13,13,13,0.95) 60%, rgba(13,13,13,1) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-[#0D0D0D]/40" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-[81px] pb-[170px] text-center lg:px-10 lg:pb-[200px]">
        {badgeText ? (
          <div className="mb-10 inline-flex items-center justify-center rounded-full border border-[#F62828]/30 bg-[#F62828]/10 px-[17px] py-[7px] text-[12px] tracking-[0.3em] uppercase">
            <span className="text-[#FAFAFA]">{badgeText}</span>
          </div>
        ) : null}

        {titleStart || titleAccent ? (
          <h1 className="text-[clamp(48px,9vw,96px)] leading-[1.05] font-[800] tracking-[-0.01em] text-[#FAFAFA]">
            {titleStart ? <>{titleStart} </> : null}
            {titleAccent ? (
              <span className="bg-[linear-gradient(155deg,#F62828_0%,#FF4D4D_100%)] bg-clip-text text-transparent">
                {titleAccent}
              </span>
            ) : null}
          </h1>
        ) : null}

        {description ? (
          <p className="mt-6 max-w-[640px] text-[16px] leading-[24px] text-white/90 lg:text-[18px] lg:leading-[28px]">
            {description}
          </p>
        ) : null}

        {primaryButton || secondaryButton ? (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {primaryButton ? (
              <StrapiButton
                component={primaryButton}
                className="inline-flex h-14 items-center justify-center rounded-[14px] bg-[linear-gradient(167deg,#F62828_0%,#FF4D4D_100%)] px-10 text-[16px] font-bold tracking-[0.025em] text-white shadow-[0_20px_60px_-20px_rgba(246,40,40,0.5)] transition-transform hover:scale-[1.02]"
              />
            ) : null}
            {secondaryButton ? (
              <StrapiButton
                component={secondaryButton}
                className="inline-flex h-14 items-center justify-center rounded-[14px] border border-[#292929] bg-[#0D0D0D]/40 px-10 text-[16px] font-medium text-white backdrop-blur-md transition-colors hover:bg-[#1F1F1F]/60"
              />
            ) : null}
          </div>
        ) : null}
      </div>

      {slidesList.length > 0 ? (
        <>
          {/* Mobile: floating cluster (arrows + tabs) at the bottom, no strip */}
          <div className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-3 lg:hidden">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setCurrent(
                    (c) => (c - 1 + slidesList.length) % slidesList.length
                  )
                }
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#292929]/60 bg-[#0D0D0D]/40 text-white backdrop-blur-md transition-colors hover:bg-[#1F1F1F]/60"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setCurrent((c) => (c + 1) % slidesList.length)}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#292929]/60 bg-[#0D0D0D]/40 text-white backdrop-blur-md transition-colors hover:bg-[#1F1F1F]/60"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="inline-flex h-[45px] items-center rounded-full border border-[#292929]/60 bg-[#0D0D0D]/60 px-[7px] backdrop-blur-md">
              {slidesList.map((slide, i) => {
                const isActive = current === i
                return (
                  <button
                    key={slide.id ?? i}
                    type="button"
                    onClick={() => setCurrent(i)}
                    className={`inline-flex h-[31px] cursor-pointer items-center justify-center rounded-full px-4 text-[10px] tracking-[0.25em] uppercase transition-colors ${
                      isActive
                        ? "bg-[#FF0000] text-white shadow-[0_20px_60px_-20px_rgba(246,40,40,0.5)]"
                        : "text-[#A6A6A6] hover:text-white"
                    }`}
                  >
                    {slide.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Desktop: arrows vertically centered on hero edges */}
          <button
            type="button"
            onClick={() =>
              setCurrent((c) => (c - 1 + slidesList.length) % slidesList.length)
            }
            className="absolute top-1/2 left-8 z-20 hidden h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#292929]/60 bg-[#0D0D0D]/40 text-white backdrop-blur-md transition-colors hover:bg-[#1F1F1F]/60 lg:flex"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setCurrent((c) => (c + 1) % slidesList.length)}
            className="absolute top-1/2 right-8 z-20 hidden h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#292929]/60 bg-[#0D0D0D]/40 text-white backdrop-blur-md transition-colors hover:bg-[#1F1F1F]/60 lg:flex"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Desktop: tab pill floating above the bottom strip */}
          <div className="absolute bottom-[128px] left-1/2 z-20 hidden -translate-x-1/2 lg:block">
            <div className="inline-flex h-[46px] items-center rounded-full border border-[#292929]/60 bg-[#0D0D0D]/60 px-[7px] backdrop-blur-md">
              {slidesList.map((slide, i) => {
                const isActive = current === i
                return (
                  <button
                    key={`d-${slide.id ?? i}`}
                    type="button"
                    onClick={() => setCurrent(i)}
                    className={`inline-flex h-8 cursor-pointer items-center justify-center rounded-full px-5 text-[12px] tracking-[0.25em] uppercase transition-colors ${
                      isActive
                        ? "bg-[#FF0000] text-white shadow-[0_20px_60px_-20px_rgba(246,40,40,0.5)]"
                        : "text-[#A6A6A6] hover:text-white"
                    }`}
                  >
                    {slide.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Desktop: bottom strip (visual band, reserved for brand logos) */}
          <div className="absolute right-0 bottom-0 left-0 z-10 hidden h-[113px] border-t border-[#292929]/50 bg-[#0D0D0D]/70 backdrop-blur-md lg:block" />
        </>
      ) : null}
    </section>
  )
}

MainHero.displayName = "MainHero"

export default MainHero
