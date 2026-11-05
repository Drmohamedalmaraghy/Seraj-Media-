"use client"

import { ReactNode, Suspense } from "react"
import { useSearchParams } from "next/navigation"

// eslint-disable-next-line no-unused-vars
type Render = (search: string) => ReactNode

function SearchParamsReader({ render }: { readonly render: Render }) {
  const searchParams = useSearchParams()
  return render(searchParams.toString())
}

/**
 * Renders `render(search)` with the current query string (without "?").
 *
 * On statically rendered pages `useSearchParams` needs a Suspense boundary.
 * The fallback renders the same UI with an empty query, so the server HTML
 * still contains the full markup (e.g. navigation links); the real query is
 * applied on the client right after hydration.
 */
export function WithSearchParams({ render }: { readonly render: Render }) {
  return (
    <Suspense fallback={render("")}>
      <SearchParamsReader render={render} />
    </Suspense>
  )
}
