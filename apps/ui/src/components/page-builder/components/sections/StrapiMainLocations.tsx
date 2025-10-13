import { Data } from "@repo/strapi"

import { PublicStrapiClient } from "@/lib/strapi-api"
import { cn } from "@/lib/styles"
import CardLocation from "@/components/elementary/CardLocation"
import CkEditorSSRRenderer from "@/components/elementary/ck-editor/CkEditorSSRRenderer"
import { Container } from "@/components/elementary/Container"
import { Section } from "@/components/elementary/Section"
import StrapiButton from "@/components/page-builder/components/utilities/StrapiButton"

export async function StrapiMainLocations({
  component,
}: {
  readonly component: Data.Component<"sections.main-locations">
}) {
  if (!component) {
    return null
  }

  const {
    buttons,
    contactUsLabel,
    backgroundColor,
    description,
    seeDetailsLabel,
    title,
    itemsCount,
    note,
  } = component

  const { data: locationsCards } = await PublicStrapiClient.fetchMany(
    "api::location.location",
    {
      filters: {
        isMainLocation: true,
      } as any,
      populate: {
        photo: { populate: { media: true } },
        page: true,
      },
      pagination: {
        page: 1,
        pageSize: itemsCount ?? 3,
      },
    }
  )

  return (
    <Section backgroundColor={backgroundColor ?? ""}>
      <Container
        size="2xl"
        className="flex-col items-center justify-center gap-3 md:gap-12"
      >
        <div className="flex max-w-160 flex-col items-center text-center">
          {title ? (
            <CkEditorSSRRenderer
              htmlContent={title?.content}
              className={cn(
                "text-[27px] lg:text-[40px]",
                backgroundColor !== "#ffffff" ? "text-white" : "text-black"
              )}
            />
          ) : null}

          {description ? (
            <CkEditorSSRRenderer
              htmlContent={description?.content}
              className={cn(
                "w-full text-base text-white",
                backgroundColor !== "#ffffff" ? "text-white" : "text-dark-50"
              )}
            />
          ) : null}
        </div>

        {locationsCards.length ? (
          <div className="grid w-full grid-cols-1 justify-center gap-3 sm:gap-6 md:grid-cols-3 md:gap-12">
            {locationsCards.map((location) => {
              return (
                <CardLocation
                  imageContainerClassName="h-72"
                  image={location.photo}
                  leftPart={location.type ?? ""}
                  rightPart={`${location?.width}x${location?.height}${location?.sizeFormFactor && ` - ${location?.sizeFormFactor}`}`}
                  title={location.name ?? ""}
                  key={location.id}
                  contactUsLabel={contactUsLabel ?? ""}
                  seeMoreLabel={seeDetailsLabel ?? ""}
                  seeMoreHref={location.page?.fullPath ?? ""}
                />
              )
            })}
          </div>
        ) : null}

        {buttons ? (
          <div className="flex flex-col gap-5 md:flex-row md:gap-10">
            {buttons.map((button) => {
              return (
                <StrapiButton
                  withIconArrow
                  key={button.id}
                  size="lg"
                  component={button}
                />
              )
            })}
          </div>
        ) : null}

        {note ? (
          <CkEditorSSRRenderer
            htmlContent={note.content}
            className="text-dark-50 text-base leading-[150%] font-medium"
          />
        ) : null}
      </Container>
    </Section>
  )
}

StrapiMainLocations.displayName = "StrapiMainLocations"

export default StrapiMainLocations
