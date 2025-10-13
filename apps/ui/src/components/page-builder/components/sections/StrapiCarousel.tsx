import { Data } from "@repo/strapi"

import { InfoCarousel } from "@/components/elementary/InfoCarousel"

export function StrapiCarousel({
  component,
}: {
  readonly component: Data.Component<"sections.carousel">
}) {
  if (!component?.images) {
    return null
  }

  return (
    <InfoCarousel imageArray={[...component.images, ...component.images]} />
  )
}

StrapiCarousel.displayName = "StrapiCarousel"

export default StrapiCarousel
