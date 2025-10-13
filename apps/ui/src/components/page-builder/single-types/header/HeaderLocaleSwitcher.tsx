"use client"

import React, { Fragment, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { Globe } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { AppLocale } from "@/types/general"

import { routing, usePathname, useRouter } from "@/lib/navigation"
import { cn } from "@/lib/styles"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const HeaderLocaleSwitcher = () => {
  const t = useTranslations("general")
  const [, startTransition] = useTransition()

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeLocale = useLocale()

  const handleLocaleChange = (locale: AppLocale) => {
    const queryParams = searchParams.toString()

    startTransition(() => {
      router.replace(
        queryParams.length > 0 ? `${pathname}?${queryParams}` : pathname,
        { locale }
      )
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild className="min-w-6">
        <Globe className="cursor-pointer opacity-100 hover:fill-[#FF1414] hover:opacity-90" />
      </PopoverTrigger>
      <PopoverContent
        className="z-150 w-auto min-w-30 border-none bg-white p-2 shadow-lg"
        sideOffset={20}
      >
        <div className="flex h-9 items-center justify-center text-center text-xs font-semibold">
          {t("language")}
        </div>
        {routing.locales.map((routingLocale) => (
          <Fragment key={routingLocale}>
            <div className="bg-dark/10 h-px w-full" />
            <button
              type="button"
              onClick={() => handleLocaleChange(routingLocale)}
              className={cn(
                "hover:bg-dark/10 flex h-9 w-full cursor-pointer items-center justify-center text-xs uppercase focus-visible:outline-none",
                activeLocale === routingLocale &&
                  "bg-dark/10 font-bold text-[#FF1414]"
              )}
            >
              {routingLocale}
            </button>
          </Fragment>
        ))}
      </PopoverContent>
    </Popover>
  )
}

HeaderLocaleSwitcher.displayName = "HeaderLocaleSwitcher"

export default HeaderLocaleSwitcher
