import Image from "next/image"
import { getLocale, getTranslations } from "next-intl/server"

import { cn } from "@/lib/styles"
import StrapiLink from "@/components/page-builder/components/utilities/StrapiLink"

const BG_GRADIENT =
  "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,20,20,0.52)_0%,rgba(255,20,20,0)_100%)] z-50"

export default async function NotFound() {
  const t = await getTranslations("errors.notFound")
  const locale = await getLocale()
  return (
    <div className="bg-dark relative flex min-h-screen flex-col items-center justify-center gap-2 overflow-hidden">
      <div className="text-center text-[100px] leading-[200px] text-white/90 lg:text-[240px]">
        404
      </div>
      <div className="text-center">
        <h2 className="le mb-4 text-[22px] font-semibold text-white/90 lg:text-[40px]">
          {t("title")}
        </h2>
      </div>
      <div className="ml-[-25%]">
        <Image
          src="/images/not-found.png"
          width={1200}
          height={300}
          alt="not-found"
          className="w-[100vw]"
        />
      </div>
      <StrapiLink
        component={{
          href: "#contact-us",
          label: locale === "en" ? "Contact us" : "اتصل بنا",
          id: 0,
        }}
        className="mt-10 rounded-[10px] bg-red-600 px-9 py-2 text-white"
      />

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
