import { Data } from "@repo/strapi"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"
import StrapiLink from "@/components/page-builder/components/utilities/StrapiLink"

function formatRelativeDate(
  value: string | Date | null | undefined
): string | null {
  if (!value) return null
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return null

  const diffMs = Date.now() - date.getTime()
  const day = 24 * 60 * 60 * 1000

  if (diffMs < day) return "today"
  const days = Math.floor(diffMs / day)
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `${weeks} week${weeks === 1 ? "" : "s"} ago`
  return date.toLocaleDateString()
}

export function MainNews({
  component,
}: {
  readonly component: Data.Component<"sections.main-news">
}) {
  const { eyebrow, titleStart, titleAccent, viewAllLink, cards } = component
  const cardsList = cards ?? []

  return (
    <section
      id="news"
      className="relative w-full bg-[#1F1F1F]/40 px-6 py-32 lg:px-10"
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
                  <span className="bg-[linear-gradient(150deg,#F62828_0%,#FF4D4D_100%)] bg-clip-text text-transparent">
                    {titleAccent}
                  </span>
                ) : null}
              </h2>
            ) : null}
          </div>
          {viewAllLink ? (
            <StrapiLink
              component={viewAllLink}
              className="inline-flex h-5 items-center gap-2 text-[14px] tracking-[0.05em] text-white uppercase transition-colors hover:text-[#F62828] lg:justify-self-end"
            >
              {viewAllLink.label}
              <ArrowRight className="h-4 w-4" />
            </StrapiLink>
          ) : null}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {cardsList.map((card, i) => {
            const dateLabel = formatRelativeDate(card.publishedAt)
            const inner = (
              <>
                <div className="relative h-[220px] w-full shrink-0 overflow-hidden">
                  <StrapiBasicImage
                    component={card.image}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    useNativeNextImageOnly
                  />
                  {card.category ? (
                    <div className="absolute top-4 left-4 inline-flex items-center rounded-full border border-[#F62828]/40 bg-[#F62828]/20 px-3 py-1.5 text-[10px] font-medium tracking-[0.3em] text-[#F62828] uppercase">
                      {card.category}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <h3 className="text-[20px] leading-[1.3] font-[700] tracking-[-0.01em] text-[#FAFAFA] transition-colors group-hover:text-white">
                    {card.title}
                  </h3>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-[12px] text-[#A6A6A6]">
                      {dateLabel ?? ""}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#292929] bg-[#0D0D0D]/60 text-white transition-colors group-hover:border-[#F62828] group-hover:text-[#F62828]">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </>
            )

            return (
              <article
                key={card.id ?? i}
                className="group relative flex h-[420px] flex-col overflow-hidden rounded-3xl border border-[#292929] bg-[linear-gradient(180deg,#1A1A1A_0%,#0F0F0F_100%)] lg:h-[445px]"
              >
                {card.link?.href ? (
                  <StrapiLink
                    component={card.link}
                    className="flex h-full flex-col"
                  >
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

MainNews.displayName = "MainNews"

export default MainNews
