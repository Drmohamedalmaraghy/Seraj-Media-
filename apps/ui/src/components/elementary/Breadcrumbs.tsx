import { BreadCrumb } from "@/types/api"

import { cn } from "@/lib/styles"
import AppLink from "@/components/elementary/AppLink"

interface Props {
  readonly breadcrumbs?: BreadCrumb[]
  readonly className?: string
}

export function Breadcrumbs({ breadcrumbs, className }: Props) {
  if (
    !breadcrumbs ||
    breadcrumbs.length === 0 ||
    (breadcrumbs.length === 1 && breadcrumbs[0]?.fullPath === "/")
  ) {
    return null
  }

  return (
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
  )
}
