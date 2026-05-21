import { AppLocale } from "@/types/general"

import { PublicStrapiClient } from "@/lib/strapi-api"
import MainHeader from "@/components/page-builder/components/sections/main/MainHeader"

async function fetchData(locale: AppLocale) {
  try {
    return await PublicStrapiClient.fetchOne("api::header.header", undefined, {
      locale,
      populate: {
        mainHeader: {
          populate: {
            desktopLogo: { populate: { media: true } },
            navLinks: true,
            ctaButton: {
              populate: { icon: { populate: { media: true } } },
            },
          },
        },
      },
    })
  } catch (e: any) {
    console.error(
      `Data for "api::header.header" (mainHeader) wasn't fetched: `,
      e?.message
    )
    return undefined
  }
}

export async function StrapiMainHeader({
  locale,
}: {
  readonly locale: AppLocale
}) {
  const response = await fetchData(locale)
  const mainHeader = response?.data?.mainHeader

  return <MainHeader component={mainHeader} />
}

StrapiMainHeader.displayName = "StrapiMainHeader"

export default StrapiMainHeader
