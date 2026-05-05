import { env } from "@/env.mjs"
import { ROOT_PAGE_PATH } from "@repo/shared-data"

import type { AppLocale } from "@/types/general"
import { BreadCrumb } from "@/types/api"

import { routing } from "@/lib/navigation"
import { cn } from "@/lib/styles"
import AppLink from "@/components/elementary/AppLink"

interface Props {
  readonly breadcrumbs?: BreadCrumb[]
  readonly className?: string
  readonly locale: AppLocale
}

const baseUrl = (env.APP_PUBLIC_URL ?? "").replace(/\/+$/, "")

function buildAbsoluteUrl(fullPath: string, locale: AppLocale): string {
  const isDefaultLocale = locale === routing.defaultLocale
  const localePrefix = isDefaultLocale ? "" : `/${locale}`

  if (fullPath === ROOT_PAGE_PATH) {
    return `${baseUrl}${localePrefix}` || baseUrl
  }
  return `${baseUrl}${localePrefix}${fullPath}`
}

function buildBreadcrumbListJsonLd(
  breadcrumbs: BreadCrumb[],
  locale: AppLocale
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((bc, index) => {
      const isLast = index === breadcrumbs.length - 1
      const base = {
        "@type": "ListItem",
        position: index + 1,
        name: bc.title,
      }
      // Per BreadcrumbList spec, the last item omits `item` (it's the current page).
      return isLast
        ? base
        : { ...base, item: buildAbsoluteUrl(bc.fullPath, locale) }
    }),
  }
}

export function Breadcrumbs({ breadcrumbs, className, locale }: Props) {
  if (
    !breadcrumbs ||
    breadcrumbs.length === 0 ||
    (breadcrumbs.length === 1 && breadcrumbs[0]?.fullPath === ROOT_PAGE_PATH)
  ) {
    return null
  }

  const jsonLd = buildBreadcrumbListJsonLd(breadcrumbs, locale)

  return (
    <>
      <script id="breadcrumbsJsonLd" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      <div className={cn("max-w-screen-default mx-auto w-full", className)}>
        <div className="flex items-center justify-center gap-2">
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={breadcrumb.fullPath} className="flex items-center gap-2">
              {index !== 0 && <span className="text-[#9f9fa1]">/</span>}

              {index !== breadcrumbs.length - 1 ? (
                <AppLink href={breadcrumb.fullPath} className="p-0">
                  <span className="text-xs leading-none text-[#9f9fa1] underline md:text-sm">
                    {breadcrumb.title}
                  </span>
                </AppLink>
              ) : (
                <span className="text-xs leading-none break-words text-[#9f9fa1] md:text-sm">
                  {breadcrumb.title}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
