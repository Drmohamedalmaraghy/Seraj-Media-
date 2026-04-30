import { env } from "@/env.mjs"
import { ROOT_PAGE_PATH } from "@repo/shared-data"

import type { MetadataRoute } from "next"
import { AppLocale } from "@/types/general"

import { isDevelopment, isProduction } from "@/lib/general-helpers"
import { routing } from "@/lib/navigation"
import { fetchAllPages } from "@/lib/strapi-api/content/server"

// The URL should be absolute, including the baseUrl (e.g. http://localhost:3000/some/nested-page)
const baseUrl = env.APP_PUBLIC_URL

type PageWithLocalizations = {
  fullPath?: string | null
  locale?: string | null
  updatedAt?: string | null
  createdAt?: string | null
  localizations?: Array<{ fullPath?: string | null; locale?: string | null }>
}

/**
 * Note: We could use generateSitemaps to separate the sitemaps, however that does not create the root sitemap.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isProduction() && !isDevelopment()) {
    return []
  }

  // Fetch pages for every locale in parallel
  const perLocale = await Promise.allSettled(
    routing.locales.map(async (locale) => {
      const res = await fetchAllPages("api::page.page", locale)
      return { locale, pages: res.data as PageWithLocalizations[] }
    })
  )

  const allPages: { locale: AppLocale; page: PageWithLocalizations }[] = []
  for (const result of perLocale) {
    if (result.status !== "fulfilled") continue
    for (const page of result.value.pages) {
      allPages.push({ locale: result.value.locale, page })
    }
  }

  // Cross-locale index: fullPath -> Map<locale, fullPath>.
  // Used as a fallback when Strapi's i18n localizations relation isn't linked.
  const fullPathIndex = new Map<string, Map<string, string>>()
  for (const { locale, page } of allPages) {
    if (!page.fullPath) continue
    if (!fullPathIndex.has(page.fullPath)) {
      fullPathIndex.set(page.fullPath, new Map())
    }
    fullPathIndex.get(page.fullPath)!.set(locale, page.fullPath)
  }

  return allPages.reduce<MetadataRoute.Sitemap>((acc, { locale, page }) => {
    if (!page.fullPath) return acc
    acc.push({
      url: generateSitemapEntryUrl(page.fullPath, locale),
      lastModified: page.updatedAt ?? page.createdAt ?? undefined,
      changeFrequency: "monthly",
      alternates: {
        languages: buildLanguagesMap(locale, page, fullPathIndex),
      },
    })
    return acc
  }, [])
}

const buildLanguagesMap = (
  currentLocale: AppLocale,
  page: PageWithLocalizations,
  fullPathIndex: Map<string, Map<string, string>>
) => {
  const languages: Record<string, string> = {}

  if (page.fullPath) {
    languages[currentLocale] = generateSitemapEntryUrl(
      page.fullPath,
      currentLocale
    )
  }

  // 1) Linked localizations (handles cases where slugs differ across locales)
  page.localizations?.forEach((loc) => {
    if (loc.fullPath && loc.locale && !languages[loc.locale]) {
      languages[loc.locale] = generateSitemapEntryUrl(loc.fullPath, loc.locale)
    }
  })

  // 2) Fallback by fullPath match across locales (handles broken i18n links)
  if (page.fullPath) {
    const siblings = fullPathIndex.get(page.fullPath)
    siblings?.forEach((siblingPath, siblingLocale) => {
      if (!languages[siblingLocale]) {
        languages[siblingLocale] = generateSitemapEntryUrl(
          siblingPath,
          siblingLocale
        )
      }
    })
  }

  return languages
}

const generateSitemapEntryUrl = (fullPath: string, locale: string) => {
  const isDefaultLocale = locale === routing.defaultLocale
  let url
  if (fullPath === ROOT_PAGE_PATH) {
    // If this is the default locale, return baseAppUrl
    // otherwise return the localized landing page
    url = isDefaultLocale ? baseUrl : new URL(locale, baseUrl)
  } else {
    url = new URL(
      [isDefaultLocale ? null : ["/", locale], fullPath]
        .flat()
        .filter(Boolean)
        .join(""),

      baseUrl
    )
  }

  return url.toString()
}
