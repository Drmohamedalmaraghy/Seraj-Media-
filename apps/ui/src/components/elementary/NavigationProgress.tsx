"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

/**
 * Thin bar at the top of the viewport while a client-side navigation is in
 * flight. Replaces the old [locale]/loading.tsx spinner, which can't be used:
 * a Suspense boundary above the page flushes a 200 before notFound() runs.
 */
export function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)

  // The new route has rendered
  useEffect(() => {
    setIsNavigating(false)
  }, [pathname, searchParams])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const anchor = (event.target as Element | null)?.closest?.("a")
      if (
        !anchor ||
        !anchor.href ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return
      }

      const url = new URL(anchor.href, window.location.href)
      const isSameDocument =
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      if (url.origin !== window.location.origin || isSameDocument) {
        return
      }

      setIsNavigating(true)
    }

    // Capture phase: next/link calls preventDefault() in its own handler.
    document.addEventListener("click", handleClick, true)
    return () => document.removeEventListener("click", handleClick, true)
  }, [])

  if (!isNavigating) {
    return null
  }

  return (
    <div
      role="progressbar"
      aria-label="Loading"
      className="fixed inset-x-0 top-0 z-[1000] h-0.5 animate-pulse bg-[#FF1414]"
    />
  )
}

NavigationProgress.displayName = "NavigationProgress"

export default NavigationProgress
