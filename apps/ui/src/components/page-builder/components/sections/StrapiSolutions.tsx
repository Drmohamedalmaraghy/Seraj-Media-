"use client"

import { useState } from "react"
import { Data } from "@repo/strapi"
import { useFormatter } from "next-intl"

import { cn } from "@/lib/styles"
import CkEditorCSRRenderer from "@/components/elementary/ck-editor/CkEditorCSRRenderer"
import { Container } from "@/components/elementary/Container"
import { Section } from "@/components/elementary/Section"
import { SolutionArrowIcon } from "@/components/icons/SolutionArrowIcon"
import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function StrapiSolutions({
  component,
}: {
  readonly component: Data.Component<"sections.solutions">
}) {
  const t = useFormatter()
  const [activeItem, setActiveItem] = useState(
    component.items?.[0]?.id ? `${component.items[0].id}` : ""
  )

  if (!component) {
    return null
  }

  const { items, title, description } = component

  return (
    <Section className="mx-auto w-full max-w-420 overflow-x-clip !pb-0">
      <Container className="max-w-[unset] flex-col gap-7">
        <div className="flex flex-col gap-7 lg:max-w-1/2">
          {title ? (
            <h1
              className={cn(
                "text-center text-[25px] leading-[normal] font-medium",
                "lg:text-start lg:text-4xl lg:leading-[150%]"
              )}
            >
              {title}
            </h1>
          ) : null}

          {description ? (
            <CkEditorCSRRenderer
              htmlContent={description.content}
              className={cn(
                "text-dark-50 text-center text-sm leading-[150%] font-normal",
                "lg:text-start lg:text-base"
              )}
            />
          ) : null}
        </div>

        {items ? (
          <Accordion
            onValueChange={(value) => setActiveItem(value)}
            value={activeItem}
            type="single"
            collapsible
            className="min-w-full"
            defaultValue={`${items[0]?.id}`}
          >
            {items.map((item, index) => {
              const isActive = activeItem === `${item.id}`
              const counter = index + 1

              return (
                <AccordionItem
                  className={cn(
                    "relative -mx-5 border-t border-b-0 md:-mx-10 lg:-mx-15",
                    isActive && "bg-primary"
                  )}
                  key={item.id}
                  value={`${item.id}`}
                >
                  <AccordionTrigger
                    className={cn(
                      "cursor-pointer flex-col p-5 hover:no-underline md:p-10 lg:flex-row lg:justify-start lg:gap-15 lg:px-15 [&[data-state=open]>svg]:rotate-0",
                      isActive && "text-white"
                    )}
                  >
                    <div className="flex w-full gap-5 text-start text-[25px] leading-[normal] font-medium lg:max-w-1/3 lg:gap-15 lg:text-[28px] lg:leading-[35px] lg:font-semibold">
                      <span>
                        {counter < 10
                          ? t.number(0) + t.number(counter)
                          : t.number(counter)}
                      </span>

                      {item.name}
                      <SolutionArrowIcon
                        className={cn(
                          "text-stroke ms-auto h-10 w-10 lg:hidden",
                          isActive && "text-white"
                        )}
                      />
                    </div>

                    <SolutionArrowIcon
                      className={cn(
                        "text-stroke hidden h-10 min-w-10 lg:block",
                        isActive && "text-white"
                      )}
                    />

                    <div
                      className={cn(
                        "text-dark-50 flex w-full flex-col text-start text-sm leading-5 tracking-[0.25px] lg:max-w-1/4",
                        isActive && "text-white"
                      )}
                    >
                      <span className="font-bold">{item.title}</span>

                      {item.description ? (
                        <CkEditorCSRRenderer
                          htmlContent={item.description.content}
                        />
                      ) : null}
                    </div>
                  </AccordionTrigger>

                  {item.image ? (
                    <div
                      className={cn(
                        "bg-red absolute top-1/2 z-20 hidden !h-auto !w-1/4 -translate-y-1/2 opacity-0 transition-all duration-300 ease-out lg:block",
                        "ltr:-right-130",
                        "rtl:-left-130",
                        isActive && "ltr:right-15 ltr:opacity-100",
                        isActive && "rtl:left-15 rtl:opacity-100"
                      )}
                    >
                      <StrapiBasicImage
                        className="!h-auto !w-full"
                        component={item.image}
                      />
                    </div>
                  ) : null}

                  {item.image ? (
                    <AccordionContent className="flex flex-col gap-4 px-5 pb-5 text-balance md:px-10 md:pb-10 lg:hidden">
                      <StrapiBasicImage
                        className="!h-full !w-full"
                        component={item.image}
                      />
                    </AccordionContent>
                  ) : null}
                </AccordionItem>
              )
            })}
          </Accordion>
        ) : null}
      </Container>
    </Section>
  )
}

StrapiSolutions.displayName = "StrapiSolutions"

export default StrapiSolutions
