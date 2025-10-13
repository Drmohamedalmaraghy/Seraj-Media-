import { PublicStrapiClient } from "@/lib/strapi-api"

export const PARENT_FULL_PATHS = {
  blog: "/blog",
  news: "/news",
}

export async function fetchArticle({
  page = 1,
  pageSize = 12,
  pathName,
  tagIds,
  search,
}: {
  page?: number
  pageSize?: number
  pathName?: string
  tagIds?: number[]
  search?: string
} = {}) {
  try {
    return await PublicStrapiClient.fetchMany("api::page.page", {
      filters: {
        parent: {
          fullPath: { $eq: pathName },
        },
        ...(tagIds?.length
          ? {
              tags: {
                id: { $in: tagIds },
              },
            }
          : {}),
        ...(search
          ? {
              $or: [
                {
                  seo: {
                    metaTitle: {
                      $containsi: search,
                    },
                  },
                },
                {
                  seo: {
                    metaDescription: {
                      $containsi: search,
                    },
                  },
                },
              ],
            }
          : {}),
      } as any,
      populate: {
        seo: { populate: { metaImage: true } },
        author: true,
        tags: true,
      },
      sort: ["createdAt:desc"],
      pagination: {
        page,
        pageSize,
      },
    })
  } catch (error) {
    console.error("Error fetching articles:", error)
    return null
  }
}
