import { Suspense } from "react"
import { Data } from "@repo/strapi"

import { PublicStrapiClient } from "@/lib/strapi-api"
import LocationsViewCSR from "@/components/page-builder/components/sections/locations-view/LocationsViewCSR"

export async function StrapiLocationsView({
  component,
  pageParams,
}: {
  readonly component: Data.Component<"sections.locations-view">
  readonly pageParams: {
    locale: "ar" | "en"
  }
}) {
  if (!component) {
    return null
  }

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
      {/* LocationsViewCSR reads the filters from the URL (useSearchParams),
          which needs a Suspense boundary on this statically rendered page.
          It renders nothing on the server anyway (it mounts into a portal). */}
      <Suspense fallback={null}>
        <LocationsViewCSR
          regions={regions}
          component={component}
          locale={pageParams.locale}
        />
      </Suspense>
    </section>
  )
}

StrapiLocationsView.displayName = "StrapiLocationsView"

export default StrapiLocationsView
