"use client"

import { useCallback, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Data } from "@repo/strapi"
import useEmblaCarousel from "embla-carousel-react"

import { cn } from "@/lib/styles"
import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"
import { Carousel, CarouselContent } from "@/components/ui/carousel"
import VideoCSR from "@/components/ui/Video/VideoCSR"

export function OnePageHelperMedia({
  photo,
  multimedia,
}: {
  readonly photo: Data.Component<"utilities.basic-image">
  readonly multimedia:
    | Data.Component<"utilities.multi-media">[]
    | null
    | undefined
}) {
  const { locale } = useParams()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: locale === "ar" ? "rtl" : "ltr",
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect])

  const shadowGradient = (
    <div
      className={cn(
        "from-primary absolute rounded-b-[10px] bg-gradient-to-t to-transparent",
        "bottom-0 h-[30%] w-full transition-opacity duration-300"
      )}
    />
  )

  if (multimedia && multimedia?.length) {
    return (
      <Carousel className="mg:mt-3 relative mt-8 overflow-hidden rounded-[10px] lg:mt-0">
        <CarouselContent
          className="overflow-hidden rounded-[10px]"
          ref={emblaRef}
        >
          <div className="flex h-full">
            {[{ id: 0, image: photo }, ...multimedia].map((mediaItem) => {
              const { image, video } = mediaItem

              if (image) {
                return (
                  <div
                    key={`${mediaItem.id}-image`}
                    className="flex min-w-full cursor-pointer justify-center rounded-[10px]"
                  >
                    <StrapiBasicImage
                      className="!h-full !w-auto object-cover object-bottom"
                      component={image}
                    />
                  </div>
                )
              }

              if (video?.youtubeUrl || video?.uploadedVideo?.url) {
                return (
                  <div
                    key={`${video.id}-video`}
                    className="flex min-w-full cursor-pointer justify-center"
                  >
                    <VideoCSR
                      className="rounded-[10px]"
                      key={`${video.id}-video`}
                      src={video?.uploadedVideo?.url ?? video?.youtubeUrl}
                    />
                  </div>
                )
              }

              return null
            })}
          </div>
        </CarouselContent>

        {scrollSnaps.length > 1 ? (
          <div className="absolute right-0 bottom-8 flex w-full justify-center gap-3 sm:right-8 sm:w-fit">
            {scrollSnaps.map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-full border-2 transition",
                  "hover:bg-dark/10 z-1 cursor-pointer bg-white",
                  {
                    "scale-200 border-[1px] bg-inherit": selectedIndex === i,
                  }
                )}
              >
                {selectedIndex === i && (
                  <span className="h-2 w-2 rounded-full border border-[#C4C4C4] bg-white" />
                )}
              </button>
            ))}
          </div>
        ) : null}

        {shadowGradient}
      </Carousel>
    )
  }

  return (
    <div className="relative max-h-145 w-full rounded-[10px]">
      <StrapiBasicImage
        component={photo}
        className="!h-full !w-auto rounded-[10px] object-cover object-bottom"
      />
      {shadowGradient}
    </div>
  )
}

OnePageHelperMedia.displayName = "OnePageHelperMedia"

export default OnePageHelperMedia
