import { Data } from "@repo/strapi"

import { cn } from "@/lib/styles"
import CkEditorSSRRenderer from "@/components/elementary/ck-editor/CkEditorSSRRenderer"
import { ArticleContentMedia } from "@/components/page-builder/components/sections/article/ArticleContentMedia"

export function ArticleContent({
  component,
  id,
  columnType = false,
}: {
  readonly component: Data.Component<"sections.article-content">
  readonly id?: string
  readonly columnType?: boolean
}) {
  const { description, mediaPosition, medias, anchorTitle } = component

  return (
    <div id={id} className="flex flex-col gap-8">
      {mediaPosition === "before_title" && medias?.length ? (
        <ArticleContentMedia className="mx-auto" medias={medias} />
      ) : null}

      {anchorTitle ? (
        <h4
          className={cn(
            "text-[20px] leading-[132%] font-normal text-black",
            "md:text-[30px]",
            "lg:text-[40px]",
            !columnType && "text-center"
          )}
        >
          {anchorTitle}
        </h4>
      ) : null}

      {mediaPosition === "after_title" && medias?.length ? (
        <ArticleContentMedia className="mx-auto" medias={medias} />
      ) : null}

      {description?.content && (
        <CkEditorSSRRenderer
          htmlContent={description?.content}
          className="text-dark-50 text-base leading-[132%] font-normal"
        />
      )}

      {mediaPosition === "bottom" && medias?.length ? (
        <ArticleContentMedia className="mx-auto" medias={medias} />
      ) : null}
    </div>
  )
}

ArticleContent.displayName = "ArticleContent"

export default ArticleContent
