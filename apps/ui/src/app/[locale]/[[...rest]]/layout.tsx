import { ROOT_PAGE_PATH } from "@repo/shared-data"

import { LayoutProps } from "@/types/next"

import { fetchPageLayout } from "@/lib/strapi-api/content/server"
import { ErrorBoundary } from "@/components/elementary/ErrorBoundary"
import StrapiFooter from "@/components/page-builder/single-types/footer/StrapiFooter"
import StrapiHeader from "@/components/page-builder/single-types/header/StrapiHeader"
import StrapiMainFooter from "@/components/page-builder/single-types/main-footer/StrapiMainFooter"
import StrapiMainHeader from "@/components/page-builder/single-types/main-header/StrapiMainHeader"

// Picks the classic or Main* header/footer from the page's
// `isMainHeaderFooter` flag. Lives here rather than in the root layout because
// the page path comes from route params — reading it from request headers
// would force every page into per-request (uncached) rendering.
export default async function Layout({
  children,
  params,
}: LayoutProps<{ rest?: string[] }>) {
  const { locale, rest } = await params
  const fullPath = ROOT_PAGE_PATH + (rest ?? []).join("/")

  const layoutResponse = await fetchPageLayout(fullPath, locale)
  const useMain = Boolean(layoutResponse?.data?.isMainHeaderFooter)

  return (
    <>
      {useMain ? (
        <ErrorBoundary hideFallback>
          <StrapiMainHeader locale={locale} />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary hideFallback>
          <StrapiHeader locale={locale} />
        </ErrorBoundary>
      )}

      <div className="flex-1">
        <div>
          <div className="flex items-center">{children}</div>
        </div>
      </div>

      {useMain ? (
        <ErrorBoundary hideFallback>
          <StrapiMainFooter locale={locale} />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary hideFallback>
          <StrapiFooter locale={locale} />
        </ErrorBoundary>
      )}
    </>
  )
}
