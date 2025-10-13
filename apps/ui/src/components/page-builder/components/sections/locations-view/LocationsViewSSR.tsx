import { Data } from "@repo/strapi"

import { PublicStrapiClient } from "@/lib/strapi-api"
import LocationsViewCSR from "@/components/page-builder/components/sections/locations-view/LocationsViewCSR"

export async function LocationsViewSSR({
  component,
  pageParams,
}: {
  readonly component?: Data.Component<"sections.locations-view">
  readonly pageParams: {
    locale: "ar" | "en"
  }
}) {
  const regions = await PublicStrapiClient.fetchMany("api::region.region", {
    populate: {
      cities: {
        populate: {
          locations: {
            populate: {
              photo: { populate: { media: true } },
              mapIcon: { populate: { media: true } },
              page: true,
            },
          },
        },
      },
    },
    sort: ["createdAt:desc"],
    pagination: {
      page: 1,
      pageSize: 100,
    },
  })

  return (
    <section>
      <LocationsViewCSR
        regions={regions}
        component={component}
        locale={pageParams.locale}
      />
    </section>
  )
}
