import type { AppLocale } from "@/types/general"
import type { Metadata } from "next"
import type { getTranslations } from "next-intl/server"

import { routing } from "@/lib/navigation"
import { buildPageUrl } from "@/lib/seo/urls"

type TranslateFn = Awaited<ReturnType<typeof getTranslations>>

export function getDefaultMetadata(
  customMetadata: Metadata | undefined,
  siteUrl: string,
  t: TranslateFn,
  locale: AppLocale,
  fullPath: string | undefined
) {
  const baseUrl = siteUrl.replace(/\/+$/, "")
  const buildUrl = (loc: AppLocale) => buildPageUrl(fullPath, loc, siteUrl)

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: t("keywords"),
    robots: t("metaRobots"),
    applicationName: t("applicationName"),

    // Icons are provided by the Next.js App Router file convention
    // (src/app/favicon.ico), which emits a correct absolute <link rel="icon">
    // on every route. No manual `icons` entry needed.

    alternates: {
      canonical: buildUrl(locale),
      languages: {
        ...Object.fromEntries(
          routing.locales.map((loc) => [loc, buildUrl(loc)])
        ),
        "x-default": buildUrl(routing.defaultLocale),
      },
    },

    metadataBase: new URL(baseUrl),

    ...customMetadata,
  } as Metadata
}

export function getDefaultOgMeta(
  locale: AppLocale | undefined,
  fullPath: string | undefined,
  t: TranslateFn
): Metadata["openGraph"] {
  return {
    type: "website",
    locale: locale,
    siteName: t("siteName"),
    title: t("metaTitle"),
    description: t("metaDescription"),
    emails: [t("email")],
    images: [t("metaImageUrl")],
    // Same URL as the canonical — "/en/..." would be a redirect.
    url: buildPageUrl(fullPath, locale ?? routing.defaultLocale),
  }
}

export function getDefaultTwitterMeta(t: TranslateFn): Metadata["twitter"] {
  return {
    card: t("twitter.card"),
    title: t("twitter.title"),
    description: t("twitter.description"),
    siteId: t("twitter.siteId"),
    creator: t("twitter.creator"),
    creatorId: t("twitter.creatorId"),
    images: [t("twitter.imageUrl")],
  } as Metadata["twitter"]
}
