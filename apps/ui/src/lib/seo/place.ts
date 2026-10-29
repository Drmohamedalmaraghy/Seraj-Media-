import type { AppLocale } from "@/types/general"

import { buildMediaUrl, buildPageUrl } from "@/lib/seo/urls"

type LocationLike = {
  name?: string | null
  latitude?: number | null
  longitude?: number | null
  photo?: { media?: { url?: string | null } | null } | null
  city?: {
    name?: string | null
    region?: { name?: string | null } | null
  } | null
}

// Schema.org Place for a single billboard/screen page.
export function buildPlaceJsonLd({
  location,
  name,
  description,
  fullPath,
  locale,
}: {
  location: LocationLike
  name: string
  description?: string | null
  fullPath?: string | null
  locale: AppLocale
}) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Place",
    name,
  }

  if (fullPath) {
    jsonLd.url = buildPageUrl(fullPath, locale)
  }
  if (description) {
    jsonLd.description = description
  }

  const imageUrl = buildMediaUrl(location.photo?.media?.url)
  if (imageUrl) {
    jsonLd.image = [imageUrl]
  }

  if (location.latitude != null && location.longitude != null) {
    jsonLd.geo = {
      "@type": "GeoCoordinates",
      latitude: location.latitude,
      longitude: location.longitude,
    }
  }

  const address = Object.fromEntries(
    Object.entries({
      addressLocality: location.city?.name,
      addressRegion: location.city?.region?.name,
      addressCountry: "OM",
    }).filter(([, value]) => value != null && value !== "")
  )
  jsonLd.address = { "@type": "PostalAddress", ...address }

  return jsonLd
}
