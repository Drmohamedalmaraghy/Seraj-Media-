import type { AppLocale } from "@/types/general"

import { buildOrganizationJsonLd } from "@/lib/seo/organization"
import { buildMediaUrl, buildPageUrl } from "@/lib/seo/urls"

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

  const imageUrl = buildMediaUrl(pageData.seo?.metaImage?.url)

  const organization = buildOrganizationJsonLd()

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": buildPageUrl(pageData.fullPath, locale),
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
