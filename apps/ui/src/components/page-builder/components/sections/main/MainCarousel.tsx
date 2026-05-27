"use client"

import { useParams } from "next/navigation"
import { Data } from "@repo/strapi"
import AutoScroll from "embla-carousel-auto-scroll"
import useEmblaCarousel from "embla-carousel-react"

import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"

export function MainCarousel({
  component,
}: {
  readonly component: Data.Component<"sections.main-carousel">
}) {
  const { locale } = useParams()
  const items = component?.items ?? []
  const speed = component?.speed && component.speed > 0 ? component.speed : 0.5

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      direction: locale === "ar" ? "rtl" : "ltr",
    },
    [
      AutoScroll({
        speed,
        startDelay: 0,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  )

  if (!items.length) return null

  const looped = [...items, ...items]

  return (
    <section className="relative w-full overflow-hidden border-t border-b border-[#292929]/50 bg-[#0D0D0D] py-10">
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-[120px] bg-gradient-to-r from-[#0D0D0D] to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-[120px] bg-gradient-to-l from-[#0D0D0D] to-transparent" />

      <div ref={emblaRef} className="overflow-hidden">
        <ul className="m-0 flex list-none items-center p-0">
          {looped.map((item, index) => (
            <li
              key={`${item.id}-${index}`}
              className="flex-[0_0_auto] px-10 select-none"
            >
              <StrapiBasicImage
                component={item}
                forcedSizes={{ height: 40 }}
                className="h-10 w-auto object-contain opacity-70 transition-opacity hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

MainCarousel.displayName = "MainCarousel"

export default MainCarousel
