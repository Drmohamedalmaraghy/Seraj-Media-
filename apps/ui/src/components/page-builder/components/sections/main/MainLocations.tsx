import { Data } from "@repo/strapi"
import { MapPin } from "lucide-react"

import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"
import StrapiButton from "@/components/page-builder/components/utilities/StrapiButton"
import StrapiLink from "@/components/page-builder/components/utilities/StrapiLink"

export function MainLocations({
  component,
}: {
  readonly component: Data.Component<"sections.main-locations-grid">
}) {
  const { eyebrow, titleStart, titleAccent, viewAllButton, cards } = component
  const cardsList = cards ?? []

  return (
    <section id="locations" className="relative w-full px-6 py-32 lg:px-10">
      <div className="mx-auto w-full max-w-[1352px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            {eyebrow ? (
              <p className="text-[12px] font-medium tracking-[0.3em] text-[#F62828] uppercase">
                {eyebrow}
              </p>
            ) : null}
            {titleStart || titleAccent ? (
              <h2 className="mt-5 text-[clamp(32px,5vw,48px)] leading-[1.1] font-[700] tracking-[-0.01em] text-[#FAFAFA]">
                {titleStart ? <>{titleStart}</> : null}
                {titleStart && titleAccent ? <br /> : null}
                {titleAccent ? (
                  <span className="bg-[linear-gradient(170deg,#F62828_0%,#FF4D4D_100%)] bg-clip-text text-transparent">
                    {titleAccent}
                  </span>
                ) : null}
              </h2>
            ) : null}
          </div>
          {viewAllButton ? (
            <StrapiButton
              component={viewAllButton}
              className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-2xl border border-[#292929] bg-[#0D0D0D]/40 px-6 text-[14px] font-bold text-white backdrop-blur-md transition-colors hover:bg-[#1F1F1F]/60 lg:justify-self-end"
              withIconArrow={false}
            />
          ) : null}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {cardsList.map((card, i) => {
            const inner = (
              <>
                <StrapiBasicImage
                  component={card.image}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  useNativeNextImageOnly
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(13,13,13,0.9)_0%,rgba(13,13,13,0)_50%,rgba(13,13,13,0)_100%)]" />

                {card.tag ? (
                  <div className="absolute top-4 left-4 inline-flex items-center rounded-full border border-[#292929] bg-[#0D0D0D]/80 px-3 py-2 text-[10px] font-medium tracking-[0.2em] text-[#FAFAFA] uppercase backdrop-blur-md">
                    {card.tag}
                  </div>
                ) : null}

                <div className="absolute right-6 bottom-6 left-6">
                  {card.region ? (
                    <div className="flex items-center gap-2 text-[12px] text-[#A6A6A6]">
                      <MapPin className="h-3 w-3 text-[#F62828]" />
                      {card.region}
                    </div>
                  ) : null}
                  <h3 className="mt-2 text-[clamp(32px,4vw,48px)] leading-none font-[700] tracking-[-0.01em] text-[#FAFAFA]">
                    {card.city}
                  </h3>
                </div>
              </>
            )

            return (
              <article
                key={card.id ?? i}
                className="group relative h-[480px] overflow-hidden rounded-3xl lg:h-[543px]"
              >
                {card.link?.href ? (
                  <StrapiLink component={card.link} className="block h-full">
                    {inner}
                  </StrapiLink>
                ) : (
                  inner
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

MainLocations.displayName = "MainLocations"

export default MainLocations
