import { Data } from "@repo/strapi"
import { ArrowUpRight } from "lucide-react"

import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"
import StrapiLink from "@/components/page-builder/components/utilities/StrapiLink"

export function MainBrands({
  component,
}: {
  readonly component: Data.Component<"sections.main-brands">
}) {
  const { eyebrow, titleStart, titleAccent, sideDescription, cards } = component
  const cardsList = cards ?? []

  return (
    <section
      id="brands"
      className="relative w-full bg-[#1F1F1F] px-6 py-32 lg:px-10"
    >
      <div className="mx-auto w-full max-w-[1352px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
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
                  <span className="bg-[linear-gradient(163deg,#F62828_0%,#FF4D4D_100%)] bg-clip-text text-transparent">
                    {titleAccent}
                  </span>
                ) : null}
              </h2>
            ) : null}
          </div>
          {sideDescription ? (
            <p className="max-w-[440px] text-[16px] leading-[1.5] text-[#A6A6A6] lg:justify-self-end">
              {sideDescription}
            </p>
          ) : null}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {cardsList.map((card, i) => {
            const cardInner = (
              <>
                <div className="absolute inset-px overflow-hidden rounded-[23px]">
                  <StrapiBasicImage
                    component={card.image}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
                    useNativeNextImageOnly
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,#0D0D0D_0%,rgba(13,13,13,0.4)_50%,rgba(13,13,13,0)_100%)]" />
                </div>

                {card.tag ? (
                  <div className="absolute top-8 left-8 inline-flex items-center rounded-full border border-[#F62828]/40 bg-[#F62828]/20 px-3 py-1.5 text-[10px] font-medium tracking-[0.3em] text-[#F62828] uppercase">
                    {card.tag}
                  </div>
                ) : null}

                <div className="absolute right-8 bottom-8 left-8 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-[clamp(28px,3.5vw,36px)] leading-[1.1] font-[700] tracking-[-0.01em] text-[#FAFAFA]">
                      {card.title}
                    </h3>
                    {card.description ? (
                      <p className="mt-3 max-w-[320px] text-[15px] leading-[1.5] whitespace-pre-line text-[#A6A6A6]">
                        {card.description}
                      </p>
                    ) : null}
                  </div>
                  <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#292929] bg-[#0D0D0D]/60 text-white sm:flex">
                    <ArrowUpRight className="h-4 w-4 text-[#F62828]" />
                  </div>
                </div>
              </>
            )

            return (
              <article
                key={card.id ?? i}
                className="group relative h-[420px] overflow-hidden rounded-3xl border border-[#292929] bg-[linear-gradient(180deg,#1A1A1A_0%,#0F0F0F_100%)] lg:h-[498px]"
              >
                {card.link?.href ? (
                  <StrapiLink component={card.link} className="block h-full">
                    {cardInner}
                  </StrapiLink>
                ) : (
                  cardInner
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

MainBrands.displayName = "MainBrands"

export default MainBrands
