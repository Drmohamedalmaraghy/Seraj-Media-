import { Data } from "@repo/strapi"

import { cn } from "@/lib/styles"
import CkEditorSSRRenderer from "@/components/elementary/ck-editor/CkEditorSSRRenderer"
import { InfoCarousel } from "@/components/elementary/InfoCarousel"
import StrapiButton from "@/components/page-builder/components/utilities/StrapiButton"

const BG_GRADIENT =
  "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,20,20,0.52)_0%,rgba(255,20,20,0)_100%)] z-50 opacity-80"

export function StrapiHero({
  component,
}: {
  readonly component: Data.Component<"sections.hero">
}) {
  if (!component) {
    return null
  }

  const {
    button,
    backgroundMedia,
    botDescription,
    titles,
    titlesSize,
    isWithFilters,
    topDescription,
  } = component
  return (
    <section
      className={cn(
        "relative isolate flex h-full w-full flex-col py-14 pt-25 lg:h-[100vh] lg:py-0",
        "items-center justify-center overflow-hidden bg-cover bg-center text-white",
        {
          "!h-auto !pt-12.5 !pb-125 lg:pt-12.5 lg:!pb-125": isWithFilters,
        }
      )}
      style={
        backgroundMedia?.image?.media?.url
          ? {
              background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${backgroundMedia.image.media.url}) lightgray 50% / cover no-repeat`,
            }
          : { background: "#000" }
      }
    >
      {topDescription ? (
        <CkEditorSSRRenderer
          htmlContent={topDescription.content}
          className="text-stroke max-w-9/10 px-6 text-center text-base lg:px-0"
        />
      ) : null}

      <div className="flex flex-col items-center justify-center px-3 text-center lg:px-0">
        {titles?.length ? (
          <div className="relative mx-auto max-w-[100vw] lg:max-w-225">
            <InfoCarousel textArray={titles} titlesSize={titlesSize} />
          </div>
        ) : null}

        {botDescription ? (
          <CkEditorSSRRenderer
            htmlContent={botDescription.content}
            className="text-stroke relative z-200 max-w-105 px-6 text-base md:max-w-195 lg:px-0"
          />
        ) : null}

        {button ? (
          <StrapiButton size="lg" component={button} className="mt-5" />
        ) : null}
      </div>

      {titles?.length ? (
        <>
          <div
            className={cn(
              BG_GRADIENT,
              "absolute top-10 -right-75 h-110 w-110 md:-right-62"
            )}
          />
          <div
            className={cn(
              BG_GRADIENT,
              "absolute bottom-0 -left-75 h-110 w-110 md:-left-62"
            )}
          />
        </>
      ) : null}

      <div id="portal-filters-location" className="mb-6 w-full px-4" />
    </section>
  )
}

StrapiHero.displayName = "StrapiHero"

export default StrapiHero
