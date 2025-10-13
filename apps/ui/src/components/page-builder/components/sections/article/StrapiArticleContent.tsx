import { Data } from "@repo/strapi"

import ArticleContent from "@/components/page-builder/components/sections/article/ArticleContent"

export function StrapiArticleContent({
  component,
  id,
}: {
  readonly component: Data.Component<"sections.article-content">
  readonly id: string
}) {
  if (!component) {
    return null
  }

  return <ArticleContent id={id} component={component} />
}

StrapiArticleContent.displayName = "StrapiArticleContent"

export default StrapiArticleContent
