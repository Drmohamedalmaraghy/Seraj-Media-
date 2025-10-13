"use client"

import React, { FC } from "react"
import { useParams } from "next/navigation"
import { Data } from "@repo/strapi"
import AutoScroll from "embla-carousel-auto-scroll"
import useEmblaCarousel from "embla-carousel-react"

import { cn } from "@/lib/styles"
import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"

interface InfoCarouselProps {
  readonly textArray?: {
    id: Data.ID
    text?: string | null | undefined
  }[]
  readonly imageArray?: Data.Component<"utilities.basic-image">[]
  readonly className?: string
  readonly titlesSize?: "small" | "medium" | "large" | null
}

enum SizeTitle {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

function getTextSizeClasses(size?: SizeTitle | null): string {
  switch (size) {
    case SizeTitle.Small:
      return "text-[22px] md:text-[40px]"
    case SizeTitle.Medium:
      return "text-[30px] md:text-[60px]"
    case SizeTitle.Large:
      return "text-[40px] md:text-[80px]"
    default:
      return ""
  }
}

export const InfoCarousel: FC<InfoCarouselProps> = ({
  imageArray,
  textArray,
  className,
  titlesSize,
}) => {
  const { locale } = useParams()
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      direction: locale === "ar" ? "rtl" : "ltr",
    },
    [
      AutoScroll({
        speed: 0.5,
        startDelay: 0,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  )
  const images = imageArray?.length ? [...imageArray, ...imageArray] : null
  const isArrayText = textArray && textArray?.length > 1

  const textShadow =
    isArrayText && !images ? (
      <>
        <div className="from-dark pointer-events-none absolute top-0 left-0 z-10 h-full w-[120px] bg-gradient-to-r to-transparent" />
        <div className="from-dark pointer-events-none absolute top-0 right-0 z-10 h-full w-[120px] bg-gradient-to-l to-transparent" />
      </>
    ) : null

  const imagesShadow =
    images?.length && !textArray ? (
      <>
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-[120px] bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-[120px] bg-gradient-to-l from-white to-transparent" />
      </>
    ) : null

  return (
    <div className={cn("relative w-full", className)}>
      {textShadow}
      {imagesShadow}

      <div
        className={cn(
          "cursor-pointer overflow-hidden pt-11 pb-8",
          imageArray?.length && "border-stroke border-t-[1px] border-b-[1px]"
        )}
        ref={emblaRef}
      >
        {imageArray?.length && !textArray ? (
          <ul className="m-0 flex list-none items-center p-0">
            {imageArray.map((image, index) => (
              <li
                key={`${image.id}${index}`}
                className="flex-[0_0_auto] px-10 select-none"
              >
                <StrapiBasicImage component={image} />
              </li>
            ))}
          </ul>
        ) : null}

        {isArrayText && !imageArray?.length ? (
          <ul className="pointer-events-none m-0 flex list-none items-center p-0">
            {textArray.map((textData, index) => (
              <li
                key={`${textData.id}${index}`}
                className="flex-[0_0_auto] px-10 select-none"
              >
                <h5
                  className={cn(
                    "font-medium text-white",
                    getTextSizeClasses(titlesSize as SizeTitle)
                  )}
                >
                  {textData.text}
                </h5>
              </li>
            ))}
          </ul>
        ) : null}

        {!isArrayText && textArray?.length === 1 ? (
          <h5
            className={cn(
              "font-medium uppercase",
              getTextSizeClasses(titlesSize as SizeTitle)
            )}
          >
            {textArray[0]?.text}
          </h5>
        ) : null}
      </div>
    </div>
  )
}
