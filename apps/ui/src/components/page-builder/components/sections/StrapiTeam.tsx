"use client"

import { useEffect, useState } from "react"
import { Data } from "@repo/strapi"

import { cn } from "@/lib/styles"
import CkEditorCSRRenderer from "@/components/elementary/ck-editor/CkEditorCSRRenderer"
import { Section } from "@/components/elementary/Section"
import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function StrapiTeam({
  component,
}: {
  readonly component: Data.Component<"sections.team">
}) {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      const index = api.selectedScrollSnap()
      setSelectedIndex(index)
    }

    api.on("select", onSelect)

    onSelect()

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  if (!component) {
    return null
  }

  const { title, description, nextLabel, prevLabel, items } = component

  return (
    <Section
      className={cn(
        "from-dark-5 bg-linear-to-b from-65% to-white to-35%",
        "lg:from-75% lg:to-25%",
        "ltr:!pr-0",
        "rtl:-ms-5 rtl:md:-ms-10 rtl:lg:-ms-15"
      )}
    >
      <Carousel
        className={cn("mx-auto flex w-full max-w-384 flex-col gap-4 lg:gap-8")}
        setApi={setApi}
        opts={{ loop: true }}
      >
        <div
          className={cn(
            "flex flex-col gap-4",
            "lg:flex-row lg:items-end lg:justify-between",
            "ltr:lg:pr-15",
            "rtl:lg:pl-15"
          )}
        >
          <div className={cn("flex max-w-160 flex-col gap-5")}>
            {title ? (
              <h1
                className={cn(
                  "text-[25px] leading-[normal] font-medium",
                  "lg:text-4xl lg:leading-[150%]"
                )}
              >
                {title}
              </h1>
            ) : null}

            {description ? (
              <CkEditorCSRRenderer
                htmlContent={description?.content}
                className={cn(
                  "text-dark-50 text-sm leading-[150%] font-normal",
                  "lg:text-base"
                )}
              />
            ) : null}
          </div>

          <div className="flex gap-4">
            <CarouselPrevious label={prevLabel ?? ""} />
            <CarouselNext label={nextLabel ?? ""} />
          </div>
        </div>

        {items ? (
          <CarouselContent className="ms-0 me-0 items-end gap-4">
            {items.map((item, index, itemsArr) => {
              return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => api?.scrollTo(index)}
                  key={item.id}
                  className={cn(
                    "bg-stroke relative h-70 min-w-70 overflow-hidden rounded",
                    "lg:h-120 lg:min-w-120",
                    index === itemsArr.length - 1 && "me-4"
                  )}
                >
                  {item.photo ? (
                    <StrapiBasicImage
                      className="!h-auto !w-full"
                      component={item.photo}
                    />
                  ) : null}

                  <div
                    className={cn(
                      "absolute bottom-0 left-0 z-20 flex h-full w-full flex-col justify-end gap-3 p-6",
                      selectedIndex === index &&
                        "from-primary bg-linear-to-t to-transparent"
                    )}
                  >
                    {item.name ? (
                      <div
                        className={cn(
                          "text-2xl leading-[150%] font-medium text-white",
                          "lg:text-[40px]"
                        )}
                      >
                        {item.name}
                      </div>
                    ) : null}

                    {item.post ? (
                      <div className="w-fit rounded bg-white px-3 py-1">
                        {item.post}
                      </div>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </CarouselContent>
        ) : null}
      </Carousel>
    </Section>
  )
}

StrapiTeam.displayName = "StrapiTeam"

export default StrapiTeam
