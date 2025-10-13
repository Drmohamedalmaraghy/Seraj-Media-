"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/styles"
import { ContentItem } from "@/components/page-builder"

export function ArticleNavigation({
  block,
}: {
  readonly block: ContentItem[]
}) {
  const t = useTranslations("general")
  const [activeItem, setActiveItem] = useState(0)

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-8 gap-y-4",
        "md:grid-cols-2",
        "lg:flex lg:w-[22%] lg:min-w-60 lg:flex-col"
      )}
    >
      {block.map((comp: ContentItem, index) => {
        const isActive = activeItem === index

        let anchorTitle = ""

        if (comp?.__component === "sections.article-content") {
          anchorTitle = comp.anchorTitle ?? t("article")
        }

        if (comp?.__component === "sections.article-column-content") {
          anchorTitle = comp.columns?.[0]?.anchorTitle ?? t("article")
        }

        return (
          <a
            onClick={() => setActiveItem(index)}
            key={comp.id}
            href={`#article-anchor-${index}`}
            className={cn(
              "flex items-start gap-1 underline-offset-2",
              "text-dark-50 text-xs leading-[120%] font-normal",
              "hover:text-primary hover:underline",
              "md:text-base md:font-medium",
              "lg:bg-primary-5 lg:text-dark-50 lg:h-12.5 lg:items-center lg:rounded-[10px] lg:px-5 lg:text-center lg:no-underline",
              "lg:hover:bg-primary lg:hover:text-white lg:hover:no-underline",
              isActive && "text-primary lg:bg-primary underline lg:text-white"
            )}
          >
            <span className="lg:hidden">{index + 1}. </span>
            {anchorTitle}
          </a>
        )
      })}
    </div>
  )
}

ArticleNavigation.displayName = "ArticleNavigation"

export default ArticleNavigation
