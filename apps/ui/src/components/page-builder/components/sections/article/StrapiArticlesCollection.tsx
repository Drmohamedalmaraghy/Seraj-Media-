import dynamic from "next/dynamic"
import { Data } from "@repo/strapi"

import { PublicStrapiClient } from "@/lib/strapi-api"
import { Container } from "@/components/elementary/Container"
import { Section } from "@/components/elementary/Section"
import { ArticleCollectionTypes } from "@/components/page-builder/components/sections/article/ArticleCollection"

const ArticleCollection = dynamic(
  () =>
    import(
      "@/components/page-builder/components/sections/article/ArticleCollection"
    )
)

export async function StrapiArticlesCollection({
  component,
}: {
  readonly component: Data.Component<"sections.articles-collection">
}) {
  if (!component) {
    return null
  }
  const { type, filterPlaceholder, searchPlaceholder } = component
  const allTags = await PublicStrapiClient.fetchAll("api::tag.tag")

  return (
    <Section className="pt-0 md:pt-0 lg:pt-0">
      <Container className="flex-col gap-10 lg:gap-15" size="2xl">
        <ArticleCollection
          type={type as ArticleCollectionTypes}
          infoContentFilter={{
            searchPlaceholder,
            filterPlaceholder,
            tagsFilter: allTags,
          }}
        />
      </Container>
    </Section>
  )
}

StrapiArticlesCollection.displayName = "StrapiArticlesCollection"

export default StrapiArticlesCollection
