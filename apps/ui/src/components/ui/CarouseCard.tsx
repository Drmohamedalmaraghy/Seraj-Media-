"use client"

import { ReactNode } from "react"
import { useParams } from "next/navigation"
import useEmblaCarousel from "embla-carousel-react"

interface CarouselProps {
  children: ReactNode
  options?: Parameters<typeof useEmblaCarousel>[0]
  className?: string
}

export default function CarouselCard({
  children,
  options,
  className,
}: CarouselProps) {
  const { locale } = useParams()
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
    direction: locale === "ar" ? "rtl" : "ltr",
    ...options,
  })

  return (
    <div className={className}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{children}</div>
      </div>
    </div>
  )
}
