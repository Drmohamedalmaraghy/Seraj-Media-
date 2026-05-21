import { AppLocale } from "@/types/general"

import { PublicStrapiClient } from "@/lib/strapi-api"
import MainFooter from "@/components/page-builder/components/sections/main/MainFooter"

async function fetchData(locale: AppLocale) {
  try {
    return await PublicStrapiClient.fetchOne("api::footer.footer", undefined, {
      locale,
      populate: {
        mainFooter: {
          populate: {
            logo: { populate: { media: true } },
            socials: {
              populate: {
                image: { populate: { media: true } },
                link: true,
              },
            },
            columns: { populate: { links: true } },
          },
        },
      },
    })
  } catch (e: any) {
    console.error(
      `Data for "api::footer.footer" (mainFooter) wasn't fetched: `,
      e?.message
    )
    return undefined
  }
}

export async function StrapiMainFooter({
  locale,
}: {
  readonly locale: AppLocale
}) {
  const response = await fetchData(locale)
  const mainFooter = response?.data?.mainFooter

  return <MainFooter component={mainFooter} />
}

StrapiMainFooter.displayName = "StrapiMainFooter"

export default StrapiMainFooter
