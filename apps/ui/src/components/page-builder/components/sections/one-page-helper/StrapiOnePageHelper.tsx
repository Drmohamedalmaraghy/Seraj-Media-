import { Data } from "@repo/strapi"

import { buildPlaceJsonLd } from "@/lib/seo/place"
import { serializeJsonLd } from "@/lib/seo/urls"
import { PublicStrapiClient } from "@/lib/strapi-api"
import { fetchDefaultLocaleLocation } from "@/lib/strapi-api/content/server"
import BackButton from "@/components/elementary/BackButton"
import CkEditorSSRRenderer from "@/components/elementary/ck-editor/CkEditorSSRRenderer"
import { Container } from "@/components/elementary/Container"
import { Section } from "@/components/elementary/Section"
import { LocationIcon } from "@/components/icons/LocationIcon"
import { PlaySmallIcon } from "@/components/icons/PlaySmallIcon"
import { ResolutionIcon } from "@/components/icons/ResolutionIcon"
import { ScreenIcon } from "@/components/icons/ScreenIcon"
import { SizeIcon } from "@/components/icons/SizeIcon"
import OnePageHelperMedia from "@/components/page-builder/components/sections/one-page-helper/OnePageHelperMedia"
import OnePageLocationCarousel from "@/components/page-builder/components/sections/one-page-helper/OnePageLocationCarousel"
import StrapiButton from "@/components/page-builder/components/utilities/StrapiButton"

const CAROUSEL_LOCATIONS_COUNT = 10
const NEARBY_LOCATIONS_COUNT = 6

export async function StrapiOnePageHelper({
  component,
  page,
  pageParams,
}: {
  readonly component: Data.Component<"sections.one-page-helper">
  readonly page: {
    seo: Data.Component<"seo-utilities.seo">
    title: string | null | undefined
    documentId?: string | null
    fullPath?: string | null
    location: Data.ContentType<"api::location.location">
  }
  readonly pageParams: {
    locale: "ar" | "en"
  }
}) {
  if (!component) {
    return null
  }

  const { seo, title } = page

  // Some Arabic screen pages have no localized location linked in Strapi —
  // use the English one so the screen details still render.
  const location =
    page.location ??
    (page.documentId ? await fetchDefaultLocaleLocation(page.documentId) : null)

  if (!location) {
    return null
  }

  const {
    alsoInterested,
    contactUsLabel,
    next,
    prev,
    screenInfo,
    seeDetails,
    description,
  } = component

  const cardPopulate = {
    photo: { populate: { media: true } },
    page: true,
  }

  // Screens in the same city come first so every screen page links to its
  // neighbours (most screen pages had no internal links at all); the main
  // locations fill the remaining slots.
  const cityDocumentId = location.city?.documentId
  const [cityLocations, mainLocations] = await Promise.all([
    cityDocumentId
      ? PublicStrapiClient.fetchMany("api::location.location", {
          filters: {
            city: { documentId: { $eq: cityDocumentId } },
            documentId: { $ne: location.documentId },
            page: { fullPath: { $startsWith: "/" } },
          } as any,
          populate: cardPopulate,
          sort: ["name:asc"],
          pagination: {
            page: 1,
            pageSize: NEARBY_LOCATIONS_COUNT,
          },
        })
      : null,
    PublicStrapiClient.fetchMany("api::location.location", {
      filters: {
        isMainLocation: true,
      } as any,
      populate: cardPopulate,
      pagination: {
        page: 1,
        pageSize: CAROUSEL_LOCATIONS_COUNT,
      },
    }),
  ])

  const nearbyLocations = cityLocations?.data ?? []
  const locationsCards = [
    ...nearbyLocations,
    ...mainLocations.data.filter(
      (card) =>
        card.documentId !== location.documentId &&
        !nearbyLocations.some((nearby) => nearby.documentId === card.documentId)
    ),
  ].slice(0, CAROUSEL_LOCATIONS_COUNT)

  const heading = seo?.metaTitle || title || location.name

  return (
    <Section className="mt-5 flex-col gap-5 !pt-[80px] md:gap-10 lg:gap-15 lg:pt-0">
      <script
        id="placeJsonLd"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            buildPlaceJsonLd({
              location,
              name: heading ?? "",
              description: seo?.metaDescription,
              fullPath: page.fullPath,
              locale: pageParams.locale,
            })
          ),
        }}
      />
      {location.photo ? (
        <Container className="flex-col gap-5" size="3xl">
          <div className="flex flex-col gap-5 lg:gap-15 xl:flex-row">
            <div className="flex h-full flex-col gap-5 xl:max-w-2/3">
              <OnePageHelperMedia
                multimedia={location.multimedia}
                photo={location.photo}
              />

              <div className="flex flex-col gap-5 xl:hidden">
                {seo?.metaDescription ? (
                  <p className="text-dark-50 text-base leading-[132%] font-normal">
                    {seo.metaDescription}
                  </p>
                ) : null}

                <BackButton />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-5 md:gap-10">
              <div className="flex flex-col gap-4">
                {heading ? (
                  <h1 className="text-[40px] font-bold md:text-[60px]">
                    {heading}
                  </h1>
                ) : null}

                {title ? (
                  <div className="flex items-center gap-2 text-base font-medium sm:text-[24px]">
                    <LocationIcon className="w-[20px] sm:w-auto" />
                    <span>{location.name}</span>
                  </div>
                ) : null}
              </div>

              <div className="flex w-fit flex-col gap-6">
                {screenInfo ? (
                  <h3 className="text-3xl leading-[normal] font-semibold">
                    {screenInfo}
                  </h3>
                ) : null}

                <div className="bg-dark-5 text-dark-50 flex flex-wrap gap-8 rounded-xl px-6 py-5 text-xs lg:text-base">
                  {(location.width || location.height) &&
                  !location?.isSizesHidden ? (
                    <div className="flex items-center gap-2">
                      <ResolutionIcon />
                      {`${location.width ?? "00"}x${location.height ?? "00"}`}
                    </div>
                  ) : null}

                  {location.sizeFormFactor ? (
                    <div className="flex items-center gap-2 capitalize">
                      <PlaySmallIcon />
                      {location.sizeFormFactor}
                    </div>
                  ) : null}

                  {location.installationType ? (
                    <div className="flex items-center gap-2 capitalize">
                      <ScreenIcon />
                      {location.installationType}
                    </div>
                  ) : null}

                  {location.type ? (
                    <div className="flex items-center gap-2 capitalize">
                      <SizeIcon />
                      {location.type}
                    </div>
                  ) : null}
                </div>
                <StrapiButton
                  className="m-0 flex self-start"
                  size="lg"
                  component={{
                    label: contactUsLabel,
                    id: 1,
                    variant: "primary",
                    href: `#contact-us`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="hidden flex-col gap-5 xl:flex">
            <div className="flex items-center gap-2">
              <BackButton />
              {/* TODO add text for strapi */}
              <p>Back</p>
            </div>
            {description ? (
              <CkEditorSSRRenderer
                htmlContent={description?.content}
                className="text-dark-50 text-base leading-[132%] font-normal"
              />
            ) : null}
          </div>
        </Container>
      ) : null}

      <Container size="2xl" className="flex-col">
        <OnePageLocationCarousel
          alsoInterested={alsoInterested}
          next={next}
          prev={prev}
          locations={locationsCards}
          locale={pageParams.locale}
          contactUsLabel={contactUsLabel}
          seeMoreLabel={seeDetails}
        />
      </Container>
    </Section>
  )
}

StrapiOnePageHelper.displayName = "StrapiOnePageHelper"

export default StrapiOnePageHelper
