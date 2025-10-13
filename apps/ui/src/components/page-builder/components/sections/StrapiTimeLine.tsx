import { Data } from "@repo/strapi"

import { cn } from "@/lib/styles"
import CkEditorSSRRenderer from "@/components/elementary/ck-editor/CkEditorSSRRenderer"
import { Container } from "@/components/elementary/Container"
import { Section } from "@/components/elementary/Section"

export function StrapiTimeLine({
  component,
}: {
  readonly component: Data.Component<"sections.time-line">
}) {
  if (!component?.items?.length) {
    return null
  }

  return (
    <Section className="bg-dark-5 overflow-y-auto">
      <Container className="lg:w-fit lg:flex-col">
        <div
          className={cn(
            "bg-dark-5 mb-20 flex w-full flex-col pb-20",
            "lg:mb-0 lg:flex-row lg:pb-0",
            "ltr:lg:pl-20",
            "rtl:lg:pr-20"
          )}
        >
          {component.items.map(({ id, title, description }, index) => {
            if (index % 2 === 1) {
              return
            }
            return (
              <div
                key={id}
                className={cn(
                  "border-b-dark relative flex min-h-40 flex-col items-start justify-end gap-3 border-b-2 px-4 py-6 md:gap-2",
                  "lg:h-full lg:min-h-[unset] lg:w-80 lg:justify-start lg:border-b-0",
                  "ltr:lg:border-l-dark ltr:lg:border-l-2",
                  "rtl:lg:border-r-dark rtl:lg:border-r-2",
                  "before:bg-dark before:absolute before:-bottom-1 before:h-1.5 before:w-1.5 before:rounded-full before:content-['']",
                  "lg:before:lg:top-0 lg:before:bottom-auto",
                  "ltr:before:right-auto ltr:before:left-0 ltr:lg:before:right-auto ltr:lg:before:-left-1",
                  "rtl:before:right-0 rtl:before:left-auto rtl:lg:before:-right-1 rtl:lg:before:left-auto"
                )}
              >
                {title ? (
                  <h3 className="text-[30px] leading-[normal] font-medium tracking-[-2px] md:text-[44px] md:leading-[100%] md:font-medium">
                    {title}
                  </h3>
                ) : null}
                {description ? (
                  <CkEditorSSRRenderer
                    htmlContent={description?.content}
                    className="text-xs leading-[normal] font-light md:leading-[120%] md:font-normal"
                  />
                ) : null}
              </div>
            )
          })}
        </div>

        <div
          className={cn(
            "from-red relative z-2 min-h-2 min-w-2 justify-end bg-linear-to-b to-transparent",
            "lg:min-h-2 lg:min-w-full",
            "ltr:lg:bg-linear-to-r",
            "rtl:lg:bg-linear-to-l",
            "before:border-red before:absolute before:-top-5 before:left-[50%] before:h-6 before:w-6 before:-translate-x-2/4 before:rounded-full before:border-6 before:content-['']",
            "lg:before:top-[50%] lg:before:translate-x-0 lg:before:-translate-y-2/4",
            "ltr:lg:before:right-auto ltr:lg:before:-left-5",
            "rtl:lg:before:-right-5 rtl:lg:before:left-auto"
          )}
        />

        <div
          className={cn(
            "bg-dark-5 mt-20 flex w-full flex-col pb-20",
            "lg:mt-0 lg:flex-row lg:pb-0",
            "ltr:lg:pl-60",
            "rtl:lg:pr-60"
          )}
        >
          {component.items.map(({ id, title, description }, index) => {
            if (index % 2 === 0) {
              return
            }
            return (
              <div
                key={id}
                className={cn(
                  "border-b-dark relative flex min-h-40 flex-col items-start justify-end gap-3 border-b-2 px-4 py-6 md:gap-2",
                  "lg:h-full lg:min-h-[unset] lg:w-80 lg:justify-start lg:border-b-0",
                  "ltr:lg:border-l-dark ltr:lg:border-l-2",
                  "rtl:lg:border-r-dark rtl:lg:border-r-2",
                  "before:bg-dark before:absolute before:-bottom-1 before:h-1.5 before:w-1.5 before:rounded-full before:content-['']",
                  "lg:before:top-auto lg:before:lg:bottom-0",
                  "rtl:before:right-auto rtl:before:left-0 rtl:lg:before:-right-1 rtl:lg:before:left-auto",
                  "ltr:before:right-0 ltr:before:left-auto ltr:lg:before:right-auto ltr:lg:before:-left-1"
                )}
              >
                {title ? (
                  <h3 className="text-[30px] leading-[normal] font-medium tracking-[-2px] md:text-[44px] md:leading-[100%] md:font-medium">
                    {title}
                  </h3>
                ) : null}
                {description ? (
                  <CkEditorSSRRenderer
                    htmlContent={description?.content}
                    className="text-xs leading-[normal] font-light md:leading-[120%] md:font-normal"
                  />
                ) : null}
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

StrapiTimeLine.displayName = "StrapiTimeLine"

export default StrapiTimeLine
