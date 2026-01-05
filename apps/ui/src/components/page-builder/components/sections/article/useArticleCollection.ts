"use client"

import { RefObject, useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Data } from "@repo/strapi"
import { useLocale } from "next-intl"

import { AppLocale } from "@/types/general"

import { fetchArticle, PARENT_FULL_PATHS } from "@/lib/strapi-api/content/pages"
import { ArticleCollectionTypes } from "@/components/page-builder/components/sections/article/ArticleCollection"

interface Input {
  type: ArticleCollectionTypes
}

interface Output {
  articles: Data.ContentType<"api::page.page">[]
  setPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
  page: number
  scrollToCards: VoidFunction
  cardsRef?: RefObject<HTMLDivElement>
  setBlogTags: React.Dispatch<React.SetStateAction<number[]>>
  setSearch: React.Dispatch<React.SetStateAction<string>>
  search: string
  blogTags: number[]
}

const useArticleCollection = ({ type }: Input): Output => {
  const locale = useLocale() as AppLocale
  const router = useRouter()
  const params =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null

  const initialSearch = params?.get("search") ?? ""
  const initialTags = params?.get("tags")

  const [search, setSearch] = useState(initialSearch)
  const [blogTags, setBlogTags] = useState<number[]>(
    initialTags ? initialTags.split(",").map(Number).filter(Boolean) : []
  )

  const [articles, setArticles] = useState<
    Data.ContentType<"api::page.page">[]
  >([])
  const [page, setPage] = useState(1)
  const [pageSize] = useState(12)
  const [totalPages, setTotalPages] = useState(1)

  const cardsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const queryParts: string[] = []
    if (search) queryParts.push(`search=${encodeURIComponent(search)}`)
    if (blogTags.length) queryParts.push(`tags=${blogTags.join(",")}`)

    const queryString = queryParts.join("&")
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname

    router.replace(newUrl, { scroll: false })
  }, [search, blogTags, router])

  const fetchData = useCallback(
    async ({
      pageNumber = 1,
      tags = [],
      searchBlog = "",
    }: {
      pageNumber: number
      tags: number[]
      searchBlog: string
    }) => {
      try {
        const res = await fetchArticle({
          locale,
          page: pageNumber,
          pageSize,
          tagIds: tags,
          search: searchBlog,
          pathName:
            type === ArticleCollectionTypes.Blog
              ? PARENT_FULL_PATHS.blog
              : PARENT_FULL_PATHS.news,
        })

        setArticles(res?.data ?? [])
        setTotalPages(res?.meta?.pagination?.pageCount ?? 1)
      } catch (error) {
        console.error("Error fetching articles:", error)
        setArticles([])
        setTotalPages(1)
      }
    },
    [locale, pageSize, type]
  )

  useEffect(() => {
    fetchData({ pageNumber: page, tags: blogTags, searchBlog: search })
  }, [fetchData, page, blogTags, search])

  const scrollToCards = () => {
    if (!cardsRef.current) return
    const topPosition =
      cardsRef.current.getBoundingClientRect().top + window.scrollY - 60

    window.scrollTo({
      top: topPosition,
      behavior: "smooth",
    })
  }

  return {
    articles,
    setPage,
    totalPages,
    page,
    scrollToCards,
    cardsRef,
    setBlogTags,
    setSearch,
    search,
    blogTags,
  }
}

export default useArticleCollection
