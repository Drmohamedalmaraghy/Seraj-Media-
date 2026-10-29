import { getTranslations } from "next-intl/server"

import type { AppLocale } from "@/types/general"

import { Link } from "@/lib/navigation"
import { Container } from "@/components/elementary/Container"
import { Section } from "@/components/elementary/Section"

type DirectoryLocation = {
  id: number | string
  name?: string | null
  page?: { fullPath?: string | null } | null
}

type DirectoryRegion = {
  id: number | string
  name?: string | null
  cities?: Array<{
    id: number | string
    name?: string | null
    locations?: DirectoryLocation[] | null
  }> | null
}

/**
 * Server-rendered index of every screen page, grouped by region and city.
 * The interactive catalog/map above it renders client-side only, so without
 * this list crawlers find no links from /locations to the screen pages.
 */
export async function LocationsDirectory({
  regions,
  locale,
}: {
  readonly regions: DirectoryRegion[] | null | undefined
  readonly locale: AppLocale
}) {
  const t = await getTranslations({
    locale,
    namespace: "comps.locationsDirectory",
  })

  const groups = (regions ?? [])
    .map((region) => {
      const cities = (region.cities ?? [])
        .map((city) => ({
          ...city,
          locations: (city.locations ?? [])
            // Malformed fullPaths (no leading slash) don't resolve to a page.
            .filter((location) => location.page?.fullPath?.startsWith("/"))
            .sort((a, b) =>
              (a.name ?? "").localeCompare(b.name ?? "", undefined, {
                numeric: true,
              })
            ),
        }))
        .filter((city) => city.locations.length > 0)
        .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""))

      const count = cities.reduce((sum, city) => sum + city.locations.length, 0)

      return { ...region, cities, count }
    })
    .filter((region) => region.count > 0)

  if (groups.length === 0) {
    return null
  }

  return (
    <Section className="!pt-0">
      <Container size="2xl" className="flex-col gap-6">
        <h2 className="text-2xl leading-[normal] font-semibold md:text-3xl">
          {t("title")}
        </h2>

        <div className="flex flex-col divide-y divide-black/10 border-y border-black/10">
          {groups.map((region) => (
            <details key={region.id} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold md:text-xl">
                <span>
                  {region.name}{" "}
                  <span className="text-dark-50 text-base font-normal">
                    ({t("screens", { count: region.count })})
                  </span>
                </span>
                <span
                  aria-hidden
                  className="text-2xl transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>

              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {region.cities.map((city) => (
                  <div key={city.id} className="flex flex-col gap-2">
                    <h3 className="text-base font-semibold">{city.name}</h3>
                    <ul className="flex list-none flex-col gap-1 ps-0">
                      {city.locations.map((location) => (
                        <li key={location.id}>
                          <Link
                            href={location.page!.fullPath!}
                            className="text-dark-50 text-sm hover:text-red-600 hover:underline"
                          >
                            {location.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  )
}

LocationsDirectory.displayName = "LocationsDirectory"

export default LocationsDirectory
