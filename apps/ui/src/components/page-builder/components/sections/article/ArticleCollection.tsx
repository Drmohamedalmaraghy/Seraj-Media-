"use client"

import { FC } from "react"

import { getFormattedDate } from "@/lib/dates"
import { TagsType } from "@/lib/strapi-api/content/tags"
import { cn } from "@/lib/styles"
import CardLocation from "@/components/elementary/CardLocation"
import Filters from "@/components/elementary/Filters"
import { EmptyDataIcon } from "@/components/icons/EmptyDataIcon"
import useArticleCollection from "@/components/page-builder/components/sections/article/useArticleCollection"

export enum ArticleCollectionTypes {
  News = "news",
  Blog = "blog",
}

interface Props {
  type: ArticleCollectionTypes
  infoContentFilter?: {
    searchPlaceholder?: string | null
    filterPlaceholder?: string | null
    tagsFilter: TagsType
  }
}

const ArticleCollection: FC<Props> = ({ infoContentFilter, type }) => {
  const {
    articles,
    totalPages,
    setPage,
    page,
    cardsRef,
    scrollToCards,
    setBlogTags,
    setSearch,
    search,
    blogTags,
  } = useArticleCollection({ type })

  return (
    <>
      {type !== ArticleCollectionTypes.Blog && (
        <Filters
          infoContentFilter={infoContentFilter}
          setBlogTags={setBlogTags}
          setSearch={setSearch}
          search={search}
          blogTags={blogTags}
        />
      )}

      <div
        className="mt-8 grid w-full grid-cols-1 justify-center gap-3 md:grid-cols-3 md:gap-6"
        ref={cardsRef}
      >
        {articles.map((item) => {
          return (
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
                item.updatedAt ? getFormattedDate(item.updatedAt, "en") : ""
              }
              title={item.seo?.metaTitle ?? ""}
              leftPart={item.author?.name ?? ""}
              isAuthor
            />
          )
        })}
      </div>
      {!articles.length && (
        <div className="mx-auto size-[150px]">
          <EmptyDataIcon />
        </div>
      )}

      <div className="flex w-full flex-wrap items-center justify-center gap-2">
        {Array.from({ length: totalPages })?.map((_, index) => (
          <button
            type="button"
            key={index}
            onClick={() => {
              setPage(index + 1)
              scrollToCards()
            }}
            className={cn(
              "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full",
              "border border-red-500 font-semibold text-red-500",
              page === index + 1 ? "bg-red-500 text-white" : "bg-white"
            )}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  )
}

ArticleCollection.displayName = "ArticleCollection"

export default ArticleCollection
