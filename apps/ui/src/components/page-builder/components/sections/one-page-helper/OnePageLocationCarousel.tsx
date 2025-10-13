"use client"

import { Data } from "@repo/strapi"

import { cn } from "@/lib/styles"
import CardLocation from "@/components/elementary/CardLocation"
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export const OnePageLocationCarousel = ({
  locations,
  next,
  prev,
  alsoInterested,
  locale,
  contactUsLabel,
  seeMoreLabel,
}: {
  readonly locations: Data.ContentType<"api::location.location">[]
  readonly next: string | null | undefined
  readonly prev: string | null | undefined
  readonly alsoInterested: string | null | undefined
  readonly locale: "ar" | "en"
  readonly contactUsLabel: string | null | undefined
  readonly seeMoreLabel: string | null | undefined
}) => {
  const isArabic = locale === "ar"

  return (
    <Carousel
      className={cn(
        "flex w-full max-w-384 flex-col",
        isArabic ? "me-auto" : "ms-auto"
      )}
    >
      <div className="flex items-end justify-between gap-4">
        {alsoInterested ? (
          <h3 className="max-w-1/2 text-xl leading-[normal] font-semibold md:text-2xl lg:text-3xl">
            {alsoInterested}
          </h3>
        ) : null}

        <div className="hidden gap-6 md:flex">
          <CarouselPrevious label={prev ?? ""} />
          <CarouselNext label={next ?? ""} />
        </div>
      </div>

      {locations ? (
        <CarouselContent className="ms-0 me-0 items-end gap-4 py-6 md:gap-6 lg:pt-9.5">
          {locations.map((location, index) => {
            return (
              <CardLocation
                image={location.photo}
                leftPart={`${location.longitude ?? "00"}x${location.latitude ?? "00"}`}
                rightPart={location.type ?? ""}
                title={location.name ?? ""}
                key={index}
                className="min-w-75 md:min-w-118"
                imageContainerClassName="h-60 lg:h-81"
                contactUsLabel={contactUsLabel ?? ""}
                seeMoreLabel={seeMoreLabel ?? ""}
                seeMoreHref={location.page?.fullPath ?? ""}
              />
            )
          })}
        </CarouselContent>
      ) : null}

      <div className="flex gap-6 md:hidden">
        <CarouselPrevious className="h-13 w-13" label={prev ?? ""} />
        <CarouselNext className="h-13 w-13" label={next ?? ""} />
      </div>
    </Carousel>
  )
}

OnePageLocationCarousel.displayName = "OnePageLocationCarousel"

export default OnePageLocationCarousel
