"use client"

import { useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Data } from "@repo/strapi"
import { Menu, XIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/styles"
import StrapiButton from "@/components/page-builder/components/utilities/StrapiButton"
import StrapiLink from "@/components/page-builder/components/utilities/StrapiLink"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export const HeaderMobileMenu = ({
  links,
  button,
}: {
  readonly links: Data.Component<"utilities.link">[]
  readonly button: Data.Component<"utilities.button"> | null | undefined
}) => {
  const t = useTranslations("general")
  const [opened, setOpened] = useState(false)

  const pathname = usePathname()
  const searchParams = useSearchParams()

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
    <Sheet open={opened} onOpenChange={setOpened}>
      <SheetTrigger asChild>
        <button
          type="button"
          onClick={() => setOpened(true)}
          className="block cursor-pointer opacity-100 hover:opacity-90 md:hidden"
        >
          <Menu />
        </button>
      </SheetTrigger>

      <SheetContent className="bg-primary-75 z-2000 w-full border-none p-5 sm:max-w-full md:hidden">
        <SheetHeader className="flex-row-reverse p-0">
          <SheetTitle className="sr-only">
            {t("mobileNavigationMenu")}
          </SheetTitle>
          <SheetClose asChild>
            <Button
              variant="secondary"
              className="text-dark-50 h-10 w-10 p-0"
              onClick={() => setOpened(false)}
            >
              <XIcon />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="flex h-full flex-col items-start gap-3 overflow-y-auto">
          <button type="button" onClick={() => setOpened(false)}>
            {links.map((link) => {
              const linkActive = isLinkActive(link?.href)

              return (
                <StrapiLink
                  key={link.id}
                  component={link}
                  className={cn(
                    "rounded px-2 py-1 text-xl font-medium whitespace-nowrap",
                    "text-white underline-offset-4 hover:underline",
                    linkActive && "underline"
                  )}
                />
              )
            })}
          </button>
        </div>

        {button ? (
          <button type="button" onClick={() => setOpened(false)}>
            <StrapiButton
              className="md:h-10 md:rounded-[50px] md:px-5 md:text-base"
              size="lg"
              component={{ ...button, variant: "secondary" }}
            />
          </button>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}

HeaderMobileMenu.displayName = "HeaderMobileMenu"

export default HeaderMobileMenu
