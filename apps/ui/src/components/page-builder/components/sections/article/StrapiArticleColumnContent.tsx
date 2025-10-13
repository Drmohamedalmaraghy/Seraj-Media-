import { Data } from "@repo/strapi"

import ArticleContent from "@/components/page-builder/components/sections/article/ArticleContent"

export function StrapiArticleColumnContent({
  component,
  id,
}: {
  readonly component: Data.Component<"sections.article-column-content">
  id: string
}) {
  if (!component.columns?.length) {
    return null
  }

  return (
    <div id={id} className="gap grid grid-cols-1 gap-8 sm:grid-cols-2">
      {component.columns?.map((column) => {
        return <ArticleContent columnType key={column.id} component={column} />
      })}
    </div>
  )
}

StrapiArticleColumnContent.displayName = "StrapiArticleColumnContent"

export default StrapiArticleColumnContent
