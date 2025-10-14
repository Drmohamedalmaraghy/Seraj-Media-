"use client"

import { MutableRefObject, useCallback, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Data } from "@repo/strapi"
import useEmblaCarousel from "embla-carousel-react"

import { cn } from "@/lib/styles"
import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"
import { Carousel, CarouselContent } from "@/components/ui/carousel"
import VideoCSR from "@/components/ui/Video/VideoCSR"

export function ArticleContentMedia({
  medias,
  className,
}: {
  readonly medias: Data.Component<"utilities.multi-media">[] | null | undefined
  readonly className?: string
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

  if (!medias?.length) {
    return null
  }

  if (medias?.length === 1) {
    const singleImage = medias[0]?.image
    const singleVideo = medias[0]?.video

    return (
      <ArticleContentMediaItem
        className={className}
        singleImage={singleImage}
        singleVideo={singleVideo}
      />
    )
  } else {
    return (
      <Carousel className={cn("flex flex-col gap-6", className)}>
        <CarouselContent className="gap-4 overflow-hidden" ref={emblaRef}>
          <div className="flex max-h-145 ps-5">
            {medias.map((mediaItem) => {
              return (
                <ArticleContentMediaItem
                  key={`${mediaItem.id}-media`}
                  singleImage={mediaItem.image}
                  singleVideo={mediaItem.video}
                />
              )
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
                  <span className="border-stroke h-2 w-2 rounded-full border bg-white" />
                )}
              </button>
            ))}
          </div>
        ) : null}
      </Carousel>
    )
  }
}

const ArticleContentMediaItem = ({
  singleImage,
  singleVideo,
}: {
  readonly singleImage:
    | Data.Component<"utilities.basic-image">
    | null
    | undefined
  readonly singleVideo:
    | Data.Component<"utilities.basic-video">
    | null
    | undefined
  readonly className?: string
  readonly carouselRef?: MutableRefObject<HTMLDivElement | null>
}) => {
  if (singleImage) {
    return (
      <div className="flex min-w-full cursor-pointer justify-center">
        <StrapiBasicImage
          key={`${singleImage.id}-image`}
          className={cn("!h-auto !w-full rounded-[10px]")}
          component={singleImage}
        />
      </div>
    )
  }

  if (
    singleVideo &&
    (singleVideo?.uploadedVideo?.url || singleVideo.youtubeUrl)
  ) {
    return (
      <div className="flex min-w-full cursor-pointer justify-center">
        <VideoCSR
          className="rounded-[10px]"
          key={`${singleVideo.id}-video`}
          src={singleVideo?.uploadedVideo?.url ?? singleVideo.youtubeUrl}
        />
      </div>
    )
  }

  return null
}
