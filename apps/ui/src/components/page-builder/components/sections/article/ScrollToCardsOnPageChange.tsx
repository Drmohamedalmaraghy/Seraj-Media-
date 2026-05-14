"use client"

import { FC, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"

// Scrolls the page so the article list lands ~60px below the viewport top
// whenever the `?page=` query changes. Runs only on client.
const ScrollToCardsOnPageChange: FC = () => {
  const searchParams = useSearchParams()
  const page = searchParams?.get("page") ?? "1"
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const anchor = document.getElementById("articles-cards")
    if (!anchor) return

    const topPosition =
      anchor.getBoundingClientRect().top + window.scrollY - 60
    window.scrollTo({ top: topPosition, behavior: "smooth" })
  }, [page])

  return null
}

ScrollToCardsOnPageChange.displayName = "ScrollToCardsOnPageChange"

export default ScrollToCardsOnPageChange
