"use client"

import { useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Data } from "@repo/strapi"

import { cn } from "@/lib/styles"
import { OtherIcon } from "@/components/icons/OtherIcon"
import StrapiLink from "@/components/page-builder/components/utilities/StrapiLink"
import useHeaderItems from "@/components/page-builder/single-types/header/HeaderItems/useHeaderItems"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const HeaderItems = ({
  links,
}: {
  readonly links: Data.Component<"utilities.link">[]
}) => {
  const { visibleItemsCount, navRef, isClient } = useHeaderItems({ links })
  const hiddenItems = links.slice(visibleItemsCount)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const currentFullPath =
    pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")

  const normalize = (url: string) => url.replace(/^\/(ar|en|ua)(\/|$)/, "/")
  const currentNorm = normalize(currentFullPath)

  const isLinkActive = (href?: string | null) => {
    if (!href) return false
    const hrefNorm = normalize(href)
    if (hrefNorm === "/") return currentNorm === "/"
    return currentNorm.startsWith(hrefNorm)
  }

  return (
    <div
      className={cn(
        "relative hidden w-full flex-nowrap justify-center gap-1 md:flex",
        {
          "overflow-hidden": !isClient,
        }
      )}
      ref={navRef}
    >
      {links.map((item, index) => {
        const linkActive = isLinkActive(item?.href)

        return (
          <div
            className={cn("flex", index >= visibleItemsCount && "hidden")}
            id="nav-bar"
            key={item.id}
          >
            <StrapiLink
              component={item}
              className={cn(
                "px-3 whitespace-nowrap underline-offset-4 hover:underline",
                !isClient ? "!text-black/0" : "text-white",
                linkActive && "font-bold text-[#FF1414] underline"
              )}
            />
          </div>
        )
      })}
      {hiddenItems.length > 0 && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="flex cursor-pointer items-center justify-center text-sm hover:opacity-50">
              <OtherIcon />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="bg-dark/70 w-auto min-w-30 border border-white p-2 shadow-lg"
            sideOffset={20}
          >
            <div className="flex flex-col gap-1">
              {hiddenItems.map((item) => {
                const linkActive = isLinkActive(item?.href)

                return (
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    key={item.id}
                  >
                    <StrapiLink
                      component={item}
                      className={cn(
                        "rounded px-2 py-1 whitespace-nowrap text-white hover:bg-white/30",
                        linkActive && "bg-white/30"
                      )}
                    />
                  </button>
                )
              })}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}

HeaderItems.displayName = "HeaderItems"

export default HeaderItems
