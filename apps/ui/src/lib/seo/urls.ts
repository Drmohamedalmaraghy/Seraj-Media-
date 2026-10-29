import { env } from "@/env.mjs"

import type { AppLocale } from "@/types/general"

import { routing } from "@/lib/navigation"

const trimTrailingSlashes = (url: string) => url.replace(/\/+$/, "")

// Absolute URL of a page, with the locale prefix omitted for the default
// locale. The root of a prefixed locale is "/ar", never "/ar/".
export function buildPageUrl(
  fullPath: string | null | undefined,
  locale: AppLocale,
  siteUrl: string = env.APP_PUBLIC_URL ?? ""
): string {
  const localePrefix = locale === routing.defaultLocale ? "" : `/${locale}`
  const pathSuffix = fullPath && fullPath !== "/" ? fullPath : ""
  return `${trimTrailingSlashes(siteUrl)}${localePrefix}${pathSuffix}`
}

// Absolute URL of a Strapi media file for structured data. Relative uploads
// point straight at Strapi: the site's own /api/asset proxy is disallowed in
// robots.txt, so crawlers couldn't fetch images through it.
export function buildMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null
  if (/^https?:\/\//.test(url)) return url
  return `${trimTrailingSlashes(env.STRAPI_URL)}${url.startsWith("/") ? url : `/${url}`}`
}

// JSON.stringify for inline <script type="application/ld+json">: escapes "<"
// so CMS text containing "</script>" can't close the tag early.
export function serializeJsonLd(jsonLd: unknown): string {
  return JSON.stringify(jsonLd).replace(/</g, "\\u003c")
}
