"use client"

import { useEffect, useState } from "react"
import { useLocale } from "next-intl"

import { cn } from "@/lib/styles"
import { processLinkHrefAttribute } from "@/components/elementary/ck-editor/utils"

import "@/styles/CkEditorDefaultStyles.css"

const CkEditorCSRRenderer = ({
  htmlContent,
  className,
}: {
  htmlContent?: string | null
  className?: string
}) => {
  const locale = useLocale()
  const [processedHtmlContent, setProcessedHtmlContent] = useState("")

  useEffect(() => {
    if (!htmlContent) {
      setProcessedHtmlContent("")
      return
    }

    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlContent, "text/html")

    const links = doc.getElementsByTagName("a")
    for (const link of links) {
      const href = link.getAttribute("href")
      if (href?.startsWith("/")) {
        link.setAttribute("href", processLinkHrefAttribute(href, locale))
      }
    }

    const tagNames = ["h1", "h2", "h3", "h4", "h5", "h6", "p"]
    for (const tagName of tagNames) {
      const elements = doc.getElementsByTagName(tagName)
      for (const element of elements) {
        element.classList.add(`typo-${tagName}`)
      }
    }

    setProcessedHtmlContent(doc.body.innerHTML)
  }, [htmlContent, locale])

  return htmlContent ? (
    <div
      className={cn(className)}
      // Content is coming from Strapi, i.e. from employees, not users
      dangerouslySetInnerHTML={{
        __html: processedHtmlContent,
      }}
    />
  ) : null
}

export default CkEditorCSRRenderer
