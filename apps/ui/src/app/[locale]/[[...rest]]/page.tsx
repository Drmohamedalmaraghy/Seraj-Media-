import { notFound } from "next/navigation"
import { ROOT_PAGE_PATH } from "@repo/shared-data"
import { Data } from "@repo/strapi"
import { setRequestLocale } from "next-intl/server"

import type { PageProps } from "@/types/next"

import { isDevelopment } from "@/lib/general-helpers"
import { getMetadataFromStrapi } from "@/lib/metadata"
import { routing } from "@/lib/navigation"
import { fetchAllPages, fetchPage } from "@/lib/strapi-api/content/server"
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

export async function generateMetadata(props: Props) {
  const params = await props.params
  const fullPath = ROOT_PAGE_PATH + (params.rest ?? []).join("/")

  return getMetadataFromStrapi({ fullPath, locale: params.locale })
}

export default async function StrapiPage(props: Props) {
  const params = await props.params

  setRequestLocale(params.locale)

  const fullPath = ROOT_PAGE_PATH + (params.rest ?? []).join("/")
  const response = await fetchPage(fullPath, params.locale)

  const data = response?.data

  if (data?.content == null) {
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

  return (
    <>
      <StrapiStructuredData structuredData={data?.seo?.structuredData} />

      <Breadcrumbs
        breadcrumbs={response?.meta?.breadcrumbs}
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
                page={restPageData}
              />
            </ErrorBoundary>
          )
        })}
      </main>
    </>
  )
}
