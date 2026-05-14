import { Data } from "@repo/strapi"

import type { AppLocale } from "@/types/general"

import { getFormattedDate } from "@/lib/dates"
import { Link } from "@/lib/navigation"
import {
  fetchArticle,
  PARENT_FULL_PATHS,
} from "@/lib/strapi-api/content/pages"
import { PublicStrapiClient } from "@/lib/strapi-api"
import { cn } from "@/lib/styles"
import CardLocation from "@/components/elementary/CardLocation"
import { Container } from "@/components/elementary/Container"
import { Section } from "@/components/elementary/Section"
import { EmptyDataIcon } from "@/components/icons/EmptyDataIcon"
import ArticleFilters from "@/components/page-builder/components/sections/article/ArticleFilters"
import ScrollToCardsOnPageChange from "@/components/page-builder/components/sections/article/ScrollToCardsOnPageChange"

export enum ArticleCollectionTypes {
  News = "news",
  Blog = "blog",
}

type StrapiSearchParams = { [key: string]: string | string[] | undefined }

const readString = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) return value[0] ?? ""
  return value ?? ""
}

const parsePage = (raw: string): number => {
  const n = Number.parseInt(raw, 10)
  return Number.isFinite(n) && n > 0 ? n : 1
}

const parseTagIds = (raw: string): number[] => {
  if (!raw) return []
  return raw
    .split(",")
    .map((part) => Number.parseInt(part, 10))
    .filter((id) => Number.isFinite(id) && id > 0)
}

interface Props {
  readonly component: Data.Component<"sections.articles-collection">
  readonly pageParams: { locale: AppLocale }
  readonly searchParams?: StrapiSearchParams
}

const PAGE_SIZE = 12

export async function StrapiArticlesCollection({
  component,
  pageParams,
  searchParams,
}: Props) {
  if (!component) {
    return null
  }

  const { type, filterPlaceholder, searchPlaceholder } = component
  const collectionType = type as ArticleCollectionTypes

  const locale = pageParams.locale
  const page = parsePage(readString(searchParams?.page))
  const search = readString(searchParams?.search)
  const tagIds = parseTagIds(readString(searchParams?.tags))

  const [articlesRes, allTags] = await Promise.all([
    fetchArticle({
      locale,
      page,
      pageSize: PAGE_SIZE,
      tagIds,
      search,
      pathName:
        collectionType === ArticleCollectionTypes.Blog
          ? PARENT_FULL_PATHS.blog
          : PARENT_FULL_PATHS.news,
    }),
    PublicStrapiClient.fetchAll("api::tag.tag"),
  ])

  const articles = articlesRes?.data ?? []
  const totalPages = articlesRes?.meta?.pagination?.pageCount ?? 1
  const showFilters = collectionType !== ArticleCollectionTypes.Blog

  return (
    <Section className="pt-0 md:pt-0 lg:pt-0">
      <Container className="flex-col gap-10 lg:gap-15" size="2xl">
        {showFilters ? (
          <ArticleFilters
            searchPlaceholder={searchPlaceholder}
            filterPlaceholder={filterPlaceholder}
            tagsFilter={allTags}
            initialSearch={search}
            initialTagIds={tagIds}
          />
        ) : null}

        <ScrollToCardsOnPageChange />

        <div
          id="articles-cards"
          className="mt-8 grid w-full grid-cols-1 justify-center gap-3 md:grid-cols-3 md:gap-6"
        >
          {articles.map((item) => (
            <CardLocation
              seeMoreHref={item.fullPath ?? "/"}
              key={item.id}
              imageContainerClassName="p-4 pb-0 h-[250px]"
              image={{
                id: item.id,
                alt: item.seo?.metaTitle ?? "",
                media: item.seo?.metaImage,
              }}
              subTitle={item.seo?.metaDescription ?? ""}
              rightPart={
                item?.articlePublicationDate
                  ? getFormattedDate(
                      item?.articlePublicationDate,
                      (item?.locale as AppLocale) ?? "en"
                    )
                  : ""
              }
              title={item.seo?.metaTitle ?? ""}
              leftPart={item.author?.name ?? ""}
              isAuthor
            />
          ))}
        </div>

        {articles.length === 0 ? (
          <div className="mx-auto size-[150px]">
            <EmptyDataIcon />
          </div>
        ) : null}

        {totalPages > 1 ? (
          <ArticlesPagination
            totalPages={totalPages}
            currentPage={page}
            search={search}
            tagIds={tagIds}
            pathname={
              collectionType === ArticleCollectionTypes.Blog
                ? "/blog"
                : "/news"
            }
          />
        ) : null}
      </Container>
    </Section>
  )
}

interface PaginationProps {
  totalPages: number
  currentPage: number
  search: string
  tagIds: number[]
  pathname: "/blog" | "/news"
}

function buildQuery(
  pageNumber: number,
  search: string,
  tagIds: number[]
): Record<string, string> {
  const query: Record<string, string> = {}
  if (pageNumber > 1) query.page = String(pageNumber)
  if (search) query.search = search
  if (tagIds.length) query.tags = tagIds.join(",")
  return query
}

function ArticlesPagination({
  totalPages,
  currentPage,
  search,
  tagIds,
  pathname,
}: PaginationProps) {
  return (
    <nav
      aria-label="Pagination"
      className="flex w-full flex-wrap items-center justify-center gap-2"
    >
      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1
        const isActive = currentPage === pageNumber
        const query = buildQuery(pageNumber, search, tagIds)

        return (
          <Link
            key={pageNumber}
            href={{ pathname, query }}
            aria-current={isActive ? "page" : undefined}
            aria-label={`Page ${pageNumber}`}
            scroll={false}
            className={cn(
              "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full",
              "border border-red-500 font-semibold text-red-500",
              isActive ? "bg-red-500 text-white" : "bg-white"
            )}
          >
            {pageNumber}
          </Link>
        )
      })}
    </nav>
  )
}

StrapiArticlesCollection.displayName = "StrapiArticlesCollection"

export default StrapiArticlesCollection
