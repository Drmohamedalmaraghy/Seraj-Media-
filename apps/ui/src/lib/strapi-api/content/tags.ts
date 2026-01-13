import { Data } from "@repo/strapi"

import type { AppLocale } from "@/types/general"
import type { Schema } from "@strapi/strapi"
import { APIResponseCollection } from "@/types/api"

import { PublicStrapiClient } from "@/lib/strapi-api"

export type TagsType = APIResponseCollection<{
  id: Data.ID
  documentId: Data.DocumentID
  locale?: string | null | undefined
  createdAt?: Schema.Attribute.DateTimeValue | null | undefined
  name?: string | null | undefined
  publishedAt?: Schema.Attribute.DateTimeValue | null | undefined
  updatedAt?: Schema.Attribute.DateTimeValue | null | undefined
}>

export async function FetchTags(locale: AppLocale, filters?: any) {
  // eslint-disable-next-line no-console
  console.log({ message: `Fetching tags: ${locale}` })

  try {
    return await PublicStrapiClient.fetchAll("api::tag.tag", {
      locale,
      filters,
    })
  } catch (e: any) {
    console.error({
      message: `Error fetching page: ${locale}`,
      data: JSON.stringify({
        error: e?.message,
        stack: e?.stack,
      }),
    })
  }
}
