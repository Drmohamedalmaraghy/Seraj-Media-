import { Data } from "@repo/strapi"

import { AppLocale } from "@/types/general"

import { getFormattedDate } from "@/lib/dates"
import { PublicStrapiClient } from "@/lib/strapi-api"
import CardLocation from "@/components/elementary/CardLocation"
import { Container } from "@/components/elementary/Container"
import { Section } from "@/components/elementary/Section"
import StrapiButton from "@/components/page-builder/components/utilities/StrapiButton"

export async function StrapiNews({
  component,
}: {
  readonly component: Data.Component<"sections.news">
}) {
  if (!component) {
    return null
  }

  const { button, title, itemsCount } = component

  const { data: newsCards } = await PublicStrapiClient.fetchMany(
    "api::page.page",
    {
      filters: {
        parent: {
          fullPath: { $eq: "/news" },
        },
      } as any,
      populate: {
        seo: { populate: { metaImage: true } },
        author: true,
      },
      sort: ["createdAt:desc"],
      pagination: {
        page: 1,
        pageSize: itemsCount ?? 3,
      },
    }
  )

  return (
    <Section className="bg-black-5">
      <Container
        size="2xl"
        className="flex-col items-center justify-center gap-3 md:gap-12"
      >
        {title ? (
          <h1 className="text-center text-[40px] text-black">{title}</h1>
        ) : null}

        {newsCards.length ? (
          <div className="grid w-full grid-cols-1 justify-center gap-3 sm:gap-6 md:grid-cols-3 md:gap-12">
            {newsCards.map((item) => {
              return (
                <CardLocation
                  seeMoreHref={item.fullPath ?? "/"}
                  imageContainerClassName="h-60 p-3 pb-0"
                  image={{
                    id: item.id,
                    alt: item.seo?.metaTitle ?? "",
                    media: item.seo?.metaImage,
                  }}
                  subTitle={item.seo?.metaDescription ?? ""}
                  rightPart={
                    item.updatedAt
                      ? getFormattedDate(
                          item.updatedAt,
                          (item.locale as AppLocale) ?? "en"
                        )
                      : ""
                  }
                  title={item.seo?.metaTitle ?? ""}
                  leftPart={item.author?.name ?? ""}
                  key={item.id}
                  isAuthor
                />
              )
            })}
          </div>
        ) : null}

        {button ? (
          <StrapiButton size="lg" withIconArrow component={button} />
        ) : null}
      </Container>
    </Section>
  )
}

StrapiNews.displayName = "StrapiNews"

export default StrapiNews
