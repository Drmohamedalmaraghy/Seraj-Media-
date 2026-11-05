"use client"

import { useTransition } from "react"
import { useLocale } from "next-intl"

import { AppLocale } from "@/types/general"

import { routing, usePathname, useRouter } from "@/lib/navigation"
import { cn } from "@/lib/styles"

const LOCALE_LABEL: Record<AppLocale, string> = {
  en: "EN",
  ar: "ع",
}

export default function MainHeaderLocaleSwitcher() {
  const [, startTransition] = useTransition()
  const pathname = usePathname()
  const router = useRouter()
  const activeLocale = useLocale() as AppLocale

  const handleLocaleChange = (locale: AppLocale) => {
    if (locale === activeLocale) return
    // Read at click time instead of useSearchParams(), which would need a
    // Suspense boundary on statically rendered pages.
    const queryParams = window.location.search.slice(1)
    startTransition(() => {
      router.replace(
        queryParams.length > 0 ? `${pathname}?${queryParams}` : pathname,
        { locale }
      )
    })
  }

  return (
    <div
      className="flex h-9 items-center justify-center gap-1 rounded-full border border-[#292929] px-3 text-[12px] tracking-[0.2em] uppercase"
      role="group"
      aria-label="Language switcher"
    >
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleLocaleChange(loc as AppLocale)}
            className={cn(
              "cursor-pointer transition-colors",
              activeLocale === loc ? "text-[#F62828]" : "text-[#A6A6A6]"
            )}
          >
            {LOCALE_LABEL[loc as AppLocale] ?? loc.toUpperCase()}
          </button>
          {i < routing.locales.length - 1 ? (
            <span className="text-[#A6A6A6]">/</span>
          ) : null}
        </span>
      ))}
    </div>
  )
}
