import { Data } from "@repo/strapi"
import { Play } from "lucide-react"

import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"
import StrapiButton from "@/components/page-builder/components/utilities/StrapiButton"
import StrapiLink from "@/components/page-builder/components/utilities/StrapiLink"

export function MainVideos({
  component,
}: {
  readonly component: Data.Component<"sections.main-videos">
}) {
  const { eyebrow, titleStart, titleAccent, viewAllButton, cards } = component
  const cardsList = cards ?? []

  return (
    <section id="videos" className="relative w-full px-6 py-32 lg:px-10">
      <div className="mx-auto w-full max-w-[1352px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            {eyebrow ? (
              <p className="text-[12px] font-medium tracking-[0.3em] text-[#F62828] uppercase">
                {eyebrow}
              </p>
            ) : null}
            {titleStart || titleAccent ? (
              <h2 className="mt-5 text-[clamp(32px,5vw,48px)] leading-[1.05] font-[700] tracking-[-0.01em] text-[#FAFAFA]">
                {titleStart ? <>{titleStart} </> : null}
                {titleAccent ? (
                  <span className="bg-[linear-gradient(150deg,#F62828_0%,#FF4D4D_100%)] bg-clip-text text-transparent">
                    {titleAccent}
                  </span>
                ) : null}
              </h2>
            ) : null}
          </div>
          {viewAllButton ? (
            <StrapiButton
              component={viewAllButton}
              className="inline-flex h-12 w-fit items-center gap-2 rounded-2xl border border-[#292929] bg-[#0D0D0D]/40 px-6 text-[14px] font-bold text-white backdrop-blur-md transition-colors hover:bg-[#1F1F1F]/60"
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
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0)_30%,rgba(13,13,13,0.95)_100%)]" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(155deg,#F62828_0%,#FF4D4D_100%)] shadow-[0_24px_60px_-15px_rgba(246,40,40,0.6)] transition-transform group-hover:scale-110">
                    <Play className="h-6 w-6 fill-white text-white" />
                  </div>
                </div>

                <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between gap-4">
                  <h3 className="max-w-[280px] text-[16px] leading-[1.4] font-[700] text-[#FAFAFA]">
                    {card.title}
                  </h3>
                  {card.duration ? (
                    <span className="rounded-full border border-[#292929] bg-[#0D0D0D]/80 px-3 py-1 text-[11px] tracking-wider text-[#FAFAFA] backdrop-blur-md">
                      {card.duration}
                    </span>
                  ) : null}
                </div>
              </>
            )

            return (
              <article
                key={card.id ?? i}
                className="group relative h-[260px] overflow-hidden rounded-3xl lg:h-[292px]"
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

MainVideos.displayName = "MainVideos"

export default MainVideos
