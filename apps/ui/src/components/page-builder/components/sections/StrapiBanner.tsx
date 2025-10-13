import { Data } from "@repo/strapi"

import { cn } from "@/lib/styles"
import CkEditorSSRRenderer from "@/components/elementary/ck-editor/CkEditorSSRRenderer"
import { Container } from "@/components/elementary/Container"
import { Section } from "@/components/elementary/Section"
import StrapiButton from "@/components/page-builder/components/utilities/StrapiButton"

export function StrapiBanner({
  component,
}: {
  readonly component: Data.Component<"sections.banner">
}) {
  if (!component) {
    return null
  }

  const { backgroundImage, topDescription, title, button } = component

  return (
    <Section
      className={cn(
        "items-center bg-cover bg-center bg-no-repeat",
        "ltr:scale-x-100 ltr:justify-start",
        "rtl:-scale-x-100 rtl:justify-end"
      )}
      style={
        backgroundImage?.media?.url
          ? {
              backgroundImage: `url(${backgroundImage.media.url})`,
            }
          : {}
      }
    >
      <Container
        size="md"
        className={cn(
          "mx-0 flex-col gap-16 p-5 lg:pt-30",
          "ltr:scale-x-100 ltr:lg:pl-30",
          "rtl:-scale-x-100 rtl:lg:pr-30"
        )}
      >
        {topDescription ? (
          <CkEditorSSRRenderer
            htmlContent={topDescription.content}
            className="text-center text-base font-medium text-white lg:text-start"
          />
        ) : null}

        {title ? (
          <CkEditorSSRRenderer
            htmlContent={title.content}
            className={cn(
              "text-center text-[30px] leading-normal lg:leading-[60px]",
              "font-medium text-white lg:text-start lg:text-[50px]"
            )}
          />
        ) : null}

        {button && (
          <StrapiButton
            className="h-10 w-30 self-center lg:mt-10 lg:h-10 lg:w-10 lg:self-start"
            withIconArrow
            size="lg"
            component={button}
          />
        )}
      </Container>
    </Section>
  )
}

StrapiBanner.displayName = "StrapiBanner"

export default StrapiBanner
