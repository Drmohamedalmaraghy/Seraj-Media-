import { notFound, permanentRedirect, redirect } from "next/navigation"
import { ROOT_PAGE_PATH } from "@repo/shared-data"
import { Data } from "@repo/strapi"
import { setRequestLocale } from "next-intl/server"

import type { PageProps } from "@/types/next"

import { isDevelopment } from "@/lib/general-helpers"
import { getMetadataFromStrapi } from "@/lib/metadata"
import { routing } from "@/lib/navigation"
import { buildArticleJsonLd, getArticleType } from "@/lib/seo/article"
import { serializeJsonLd } from "@/lib/seo/urls"
import {
  fetchAllPages,
  fetchPage,
  fetchRedirect,
} from "@/lib/strapi-api/content/server"
import { cn } from "@/lib/styles"
import { Breadcrumbs } from "@/components/elementary/Breadcrumbs"
import { ErrorBoundary } from "@/components/elementary/ErrorBoundary"
import {
  Content,
  ContentItem,
  PageContentComponents,
} from "@/components/page-builder"
import Article from "@/components/page-builder/components/sections/article/Article"
import ArticleHero from "@/components/page-builder/components/sections/article/ArticleHero"
import StrapiStructuredData from "@/components/page-builder/components/seo-utilities/StrapiStructuredData"

export async function generateStaticParams() {
  if (isDevelopment()) {
    return []
  }

  const promises = routing.locales.map((locale) =>
    fetchAllPages("api::page.page", locale)
  )

  const results = await Promise.allSettled(promises)

  const params = results
    .filter((result) => result.status === "fulfilled")
    .flatMap((result) => result.value.data)
    .map((page) => ({
      locale: page.locale,
      rest: [page.slug],
    }))

  return params
}

type Props = PageProps<{
  rest: string[]
}>

// Orphaned paths from the previous site structure that still get crawled
// (SEO audit 2026-09). Only used when no Strapi page or redirect record
// matches, so editors can still take these paths over from the CMS.
const LEGACY_REDIRECTS: Record<string, string> = {
  "/for-partners": "/partners",
  "/for-brands": "/brands",
  "/indoor-media": "/locations",
  "/outdoor-media": "/locations",
  "/services": "/brands",
}

export async function generateMetadata(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const fullPath = ROOT_PAGE_PATH + (params.rest ?? []).join("/")

  const base = await getMetadataFromStrapi({ fullPath, locale: params.locale })

  // Faceted/filtered URLs should not be indexed as separate pages — they are
  // views of the same underlying content. Crawler still follows links from
  // them via `follow`.
  const isArticleListing = fullPath === "/blog" || fullPath === "/news"
  const hasArticleFilters =
    isArticleListing &&
    (searchParams?.search != null || searchParams?.tags != null)

  const isLocationsListing = fullPath === "/locations"
  const hasLocationFilters =
    isLocationsListing &&
    (searchParams?.region != null ||
      searchParams?.city != null ||
      searchParams?.type != null ||
      searchParams?.sizes != null ||
      searchParams?.tab != null)

  if (hasArticleFilters || hasLocationFilters) {
    return {
      ...base,
      robots: { index: false, follow: true },
    }
  }

  // Each paginated listing page shows a different set of articles, so it is
  // canonical to itself rather than to page 1. No hreflang alternates: the
  // locales have different article counts, so page N doesn't correspond.
  // Out-of-range pages 404 in StrapiArticlesCollection.
  // Parsed like StrapiArticlesCollection does, so the canonical always matches
  // the page that is actually rendered.
  const rawPage = searchParams?.page
  const pageNumber = Number.parseInt(
    (Array.isArray(rawPage) ? rawPage[0] : rawPage) ?? "",
    10
  )
  if (isArticleListing && pageNumber > 1 && base?.alternates) {
    return {
      ...base,
      alternates: {
        ...base.alternates,
        canonical: `${String(base.alternates.canonical)}?page=${pageNumber}`,
        languages: undefined,
      },
    }
  }

  return base
}

export default async function StrapiPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams

  setRequestLocale(params.locale)

  const fullPath = ROOT_PAGE_PATH + (params.rest ?? []).join("/")
  let response = await fetchPage(fullPath, params.locale)
  let data = response?.data

  if (data?.content == null && params.locale !== "en") {
    const fallbackResponse = await fetchPage(fullPath, "en")

    if (fallbackResponse?.data?.content != null) {
      response = fallbackResponse
      data = fallbackResponse.data
    }
  }

  if (data == null || !data.content || data.content.length === 0) {
    // notFound()/redirect() only set the HTTP status while the response shell
    // hasn't been flushed yet. A Suspense boundary above this page (e.g. a
    // [locale]/loading.tsx) would flush a 200 first and turn every 404 into a
    // soft 404, so don't add one.
    const redirectMatch = await fetchRedirect(fullPath)
    const target = redirectMatch?.destination ?? LEGACY_REDIRECTS[fullPath]

    if (target) {
      const destination =
        params.locale === routing.defaultLocale
          ? target
          : `/${params.locale}${target}`

      if (redirectMatch?.destination && !redirectMatch.permanent) {
        redirect(destination) // 307
      }
      permanentRedirect(destination) // 308
    }

    notFound()
  }

  const { content, ...restPageData } = data

  function groupContentBlocks(
    content: Content
  ): (ContentItem | ContentItem[])[] {
    const result: (ContentItem | ContentItem[])[] = []

    let i = 0
    while (i < content.length) {
      const item = content[i]
      const isArticle =
        item?.__component === "sections.article-content" ||
        item?.__component === "sections.article-column-content"

      if (!isArticle) {
        if (item !== undefined) {
          result.push(item)
        }
        i++
      } else {
        const group: ContentItem[] = []

        while (
          i < content.length &&
          (content[i]?.__component === "sections.article-content" ||
            content[i]?.__component === "sections.article-column-content")
        ) {
          group.push(content[i]!)
          i++
        }

        result.push(group)
      }
    }

    return result
  }

  const pageData = data as Data.ContentType<"api::page.page">

  const isBlogNewsChild =
    (fullPath?.startsWith("/blog") && fullPath !== "/blog") ||
    (fullPath?.startsWith("/news") && fullPath !== "/news")

  const articleType = fullPath ? getArticleType(fullPath) : null
  const articleJsonLd = articleType
    ? buildArticleJsonLd(articleType, pageData, params.locale)
    : null

  return (
    <>
      <StrapiStructuredData structuredData={data?.seo?.structuredData} />

      {articleJsonLd ? (
        <script
          id="articleJsonLd"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
        />
      ) : null}

      <Breadcrumbs
        breadcrumbs={response?.meta?.breadcrumbs}
        locale={params.locale}
        className={cn(
          "absolute top-16 z-1 w-fit text-white",
          "ltr:left-5 ltr:md:left-10 ltr:lg:left-15",
          "rtl:right-5 rtl:md:right-10 rtl:lg:right-15"
        )}
      />
      <main className={cn("flex w-full flex-col")}>
        {isBlogNewsChild ? (
          <ArticleHero
            image={{
              id: pageData?.id ?? "",
              alt: pageData?.seo?.metaTitle,
              media: pageData?.seo?.metaImage,
            }}
            title={pageData?.seo?.metaTitle}
            author={pageData?.author}
            articlePublicationDate={pageData?.articlePublicationDate}
          />
        ) : null}

        {groupContentBlocks(content).map((block, index) => {
          // === group sections.ArticleContent ===

          if (Array.isArray(block)) {
            return <Article key={`article-group-${index}`} block={block} />
          }

          // === Single component ===
          const comp = block
          const name = comp.__component
          const id = comp.id
          const key = `${name}-${id}`
          const Component = PageContentComponents[name]

          if (!Component) {
            return (
              <div key={key} className="text-primary font-medium">
                Component &quot;{key}&quot; is not implemented on the frontend.
              </div>
            )
          }

          return (
            <ErrorBoundary key={key}>
              <Component
                component={comp}
                pageParams={params}
                searchParams={searchParams}
                page={restPageData}
              />
            </ErrorBoundary>
          )
        })}
      </main>
    </>
  )
}
