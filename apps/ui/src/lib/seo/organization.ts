import { env } from "@/env.mjs"

// Organization-level data used for Schema.org Organization JSON-LD.
// Update these values when content team confirms the canonical company info.
// Optional fields can be left empty / null - they'll be omitted from the output.
const ORGANIZATION = {
  name: "Seraj Media",
  email: "info@serajmedia.com",
  telephone: "+96891118616",
  // Path under APP_PUBLIC_URL; resolved to absolute URL at build time.
  logoPath: "/meta-image.jpg",
  // PostalAddress fields. Set to null to omit.
  address: {
    addressCountry: "OM",
    addressLocality: "Muscat",
    addressRegion: null as string | null,
    streetAddress: null as string | null,
    postalCode: null as string | null,
  },
  // GeoCoordinates (WGS 84). Set to null to omit the geo block entirely.
  geo: null as { latitude: number; longitude: number } | null,
  // Social media profile URLs. Empty array → sameAs is omitted.
  sameAs: [
    "https://www.facebook.com/profile.php?id=61571693621440",
    "https://www.linkedin.com/company/79741093",
    "https://www.instagram.com/serajmedia.om",
  ] as string[],
}

function absolutizeUrl(path: string): string {
  const base = (env.APP_PUBLIC_URL ?? "").replace(/\/+$/, "")
  if (/^https?:\/\//.test(path)) return path
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export function buildOrganizationJsonLd() {
  const baseUrl = (env.APP_PUBLIC_URL ?? "").replace(/\/+$/, "")

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION.name,
    url: baseUrl,
    logo: absolutizeUrl(ORGANIZATION.logoPath),
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.telephone,
  }

  const addressEntries = Object.entries(ORGANIZATION.address).filter(
    ([, value]) => value != null && value !== ""
  )
  if (addressEntries.length > 0) {
    jsonLd.address = {
      "@type": "PostalAddress",
      ...Object.fromEntries(addressEntries),
    }
  }

  if (ORGANIZATION.geo) {
    jsonLd.geo = {
      "@type": "GeoCoordinates",
      latitude: ORGANIZATION.geo.latitude,
      longitude: ORGANIZATION.geo.longitude,
    }
  }

  if (ORGANIZATION.sameAs.length > 0) {
    jsonLd.sameAs = ORGANIZATION.sameAs
  }

  return jsonLd
}
