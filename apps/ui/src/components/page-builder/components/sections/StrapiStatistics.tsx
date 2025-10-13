import { Fragment } from "react"
import { Data } from "@repo/strapi"

import { Container } from "@/components/elementary/Container"
import { Section } from "@/components/elementary/Section"

export function StrapiStatistics({
  component,
}: {
  readonly component: Data.Component<"sections.statistics">
}) {
  if (!component.items?.length) {
    return null
  }

  return (
    <Section>
      <Container
        size="2xl"
        className="flex-wrap justify-center gap-y-4 text-center md:gap-y-8 lg:gap-y-12 xl:justify-between"
      >
        {component.items.map((item) => (
          <Fragment key={item.id}>
            <div className="flex flex-col justify-between px-2 md:px-8 lg:px-4">
              {item.title ? (
                <div className="text-dark-75 text-[20px] font-bold sm:text-[44px] md:text-[88px]">
                  {item.title}
                </div>
              ) : null}

              {item.description ? (
                <div className="text-primary text-[10px] font-medium whitespace-break-spaces md:text-sm">
                  {item.description}
                </div>
              ) : null}
            </div>
            <div className="bg-stroke w-px last-of-type:hidden" />
          </Fragment>
        ))}
      </Container>
    </Section>
  )
}

StrapiStatistics.displayName = "StrapiStatistics"

export default StrapiStatistics
