"use client"

// Error boundaries must be Client Components - https://nextjs.org/docs/14/app/building-your-application/routing/error-handling
import { useEffect } from "react"
import Image from "next/image"
import * as Sentry from "@sentry/nextjs"
import { useTranslations } from "next-intl"

import { isDevelopment } from "@/lib/general-helpers"
import { Link } from "@/lib/navigation"
import { cn } from "@/lib/styles"

interface Props {
  readonly error: Error
  readonly reset: () => void
}

const BG_GRADIENT =
  "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,20,20,0.52)_0%,rgba(255,20,20,0)_100%)] z-50"

export default function Error({ error, reset }: Props) {
  const t = useTranslations("errors.global")

  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  const isDev = isDevelopment()

  return (
    <div className="bg-dark relative flex min-h-screen flex-col items-center justify-center gap-2 overflow-hidden pt-20">
      <div className="text-center text-[100px] leading-[200px] text-white/90 lg:text-[240px]">
        500
      </div>
      <div className="text-center">
        <h2 className="mb-4 text-[22px] font-semibold text-white/90 lg:text-[40px]">
          {t("title")}
        </h2>
        <p className="max-w-xl text-base text-white/70 lg:text-lg">
          {t("description")}
        </p>
      </div>

      <div className="ml-[-25%]">
        <Image
          src="/images/not-found.png"
          width={1200}
          height={300}
          alt="server-error"
          className="w-[100vw]"
        />
      </div>

      {isDev ? (
        <pre className="z-50 mt-2 max-w-2xl overflow-x-auto bg-white/10 p-3 text-xs text-white/80">
          {error.message}
          {"\n"}
          {error.stack?.split("\n").slice(0, 7).join("\n")}
        </pre>
      ) : null}

      <div className="z-50 mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-[10px] bg-red-600 px-9 py-2 text-white transition hover:bg-red-700"
        >
          {t("goHome")}
        </Link>
        <button
          type="button"
          onClick={reset}
          className="rounded-[10px] border border-white/30 px-9 py-2 text-white transition hover:bg-white/10"
        >
          {t("refresh")}
        </button>
      </div>

      <div
        className={cn(
          BG_GRADIENT,
          "absolute top-5 -right-75 h-110 w-110 md:-right-62"
        )}
      />
      <div
        className={cn(
          BG_GRADIENT,
          "absolute -bottom-15 -left-75 h-110 w-110 md:-left-62"
        )}
      />
    </div>
  )
}
