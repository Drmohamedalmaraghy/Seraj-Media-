import { env } from "@/env.mjs"

import type { AppLocale } from "@/types/general"

import { routing } from "@/lib/navigation"
import { buildOrganizationJsonLd } from "@/lib/seo/organization"

type ArticleType = "BlogPosting" | "NewsArticle" | "Article"

type DateValue = string | Date | null | undefined

type PageDataLike = {
  title?: string | null
  fullPath?: string | null
  articlePublicationDate?: DateValue
  createdAt?: DateValue
  updatedAt?: DateValue
  publishedAt?: DateValue
  author?: { name?: string | null } | null
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    metaImage?: { url?: string | null } | null
  } | null
}

function toIsoDate(value: DateValue): string | null {
  if (value == null) return null
  if (value instanceof Date) return value.toISOString()
  return value
}

export function getArticleType(fullPath: string): ArticleType | null {
  if (fullPath.startsWith("/blog/") && fullPath !== "/blog") {
    return "BlogPosting"
  }
  if (fullPath.startsWith("/news/") && fullPath !== "/news") {
    return "NewsArticle"
  }
  return null
}

function buildArticleUrl(fullPath: string, locale: AppLocale): string {
  const baseUrl = (env.APP_PUBLIC_URL ?? "").replace(/\/+$/, "")
  const localePrefix = locale === routing.defaultLocale ? "" : `/${locale}`
  return `${baseUrl}${localePrefix}${fullPath}`
}

function pickImageUrl(
  metaImage: { url?: string | null } | null | undefined
): string | null {
  const url = metaImage?.url
  if (!url) return null
  if (/^https?:\/\//.test(url)) return url
  const baseUrl = (env.APP_PUBLIC_URL ?? "").replace(/\/+$/, "")
  return `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`
}

export function buildArticleJsonLd(
  type: ArticleType,
  pageData: PageDataLike,
  locale: AppLocale
) {
  if (!pageData.fullPath) return null

  const headline = pageData.seo?.metaTitle ?? pageData.title ?? ""
  const description = pageData.seo?.metaDescription ?? undefined

  const datePublished =
    toIsoDate(pageData.articlePublicationDate) ??
    toIsoDate(pageData.publishedAt) ??
    toIsoDate(pageData.createdAt)
  const dateModified = toIsoDate(pageData.updatedAt) ?? datePublished

  const imageUrl = pickImageUrl(pageData.seo?.metaImage)

  const organization = buildOrganizationJsonLd()

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": buildArticleUrl(pageData.fullPath, locale),
    },
    headline,
    publisher: {
      "@type": "Organization",
      name: organization.name,
      logo: {
        "@type": "ImageObject",
        url: organization.logo,
      },
    },
  }

  if (imageUrl) {
    jsonLd.image = [imageUrl]
  }
  if (datePublished) {
    jsonLd.datePublished = datePublished
  }
  if (dateModified) {
    jsonLd.dateModified = dateModified
  }
  if (pageData.author?.name) {
    jsonLd.author = {
      "@type": "Person",
      name: pageData.author.name,
    }
  }
  if (description) {
    jsonLd.description = description
  }

  return jsonLd
}
