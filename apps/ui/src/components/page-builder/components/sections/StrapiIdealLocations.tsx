import { Data } from "@repo/strapi"

import CardIndustries from "@/components/elementary/CardIndustries"
import CkEditorSSRRenderer from "@/components/elementary/ck-editor/CkEditorSSRRenderer"
import { Container } from "@/components/elementary/Container"
import { Section } from "@/components/elementary/Section"
import CarouselCard from "@/components/ui/CarouseCard"
import VideoCSR from "@/components/ui/Video/VideoCSR"

export function StrapiIdealLocations({
  component,
}: {
  readonly component: Data.Component<"sections.ideal-locations">
}) {
  if (!component) {
    return null
  }

  const { description, items, note, title, video } = component

  return (
    <Section>
      <Container size="2xl" className="flex-col gap-6 md:gap-8">
        {title ? (
          <div className="text-center text-[48px] font-semibold text-black">
            {title}
          </div>
        ) : null}

        {description ? (
          <CkEditorSSRRenderer
            htmlContent={description?.content}
            className="text-dark-50 mx-auto max-w-160 text-center text-base"
          />
        ) : null}

        {items?.length ? (
          <>
            <div className="hidden w-full grid-cols-1 gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {items.map((item) => (
                <CardIndustries
                  image={item.image}
                  title={item.title ?? ""}
                  gridSize={item.gridSize ?? "one"}
                  description={item.description}
                  key={item.id}
                />
              ))}
            </div>

            <CarouselCard className="block sm:hidden">
              {items.map((item) => (
                <div
                  key={`carousel-${item.id}`}
                  className="min-w-0 flex-[0_0_80%] px-2 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%]"
                >
                  <CardIndustries
                    image={item.image}
                    title={item.title ?? ""}
                    description={item.description}
                  />
                </div>
              ))}
            </CarouselCard>
          </>
        ) : null}

        <div className="flex flex-col gap-7">
          {video?.youtubeUrl ? (
            <div className="h-80 w-full sm:h-100 lg:h-148">
              <VideoCSR src={video.youtubeUrl} />
            </div>
          ) : null}

          {note ? (
            <CkEditorSSRRenderer
              htmlContent={note.content}
              className="mx-auto max-w-256 text-center text-base"
            />
          ) : null}
        </div>
      </Container>
    </Section>
  )
}

StrapiIdealLocations.displayName = "StrapiIdealLocations"

export default StrapiIdealLocations
