import "@/styles/globals.css"

import { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import { LayoutProps } from "@/types/next"

import { routing } from "@/lib/navigation"
import { ErrorBoundary } from "@/components/elementary/ErrorBoundary"
import StrapiPreviewListener from "@/components/elementary/StrapiPreviewListener"
import { TailwindIndicator } from "@/components/elementary/TailwindIndicator"
import StrapiFooter from "@/components/page-builder/single-types/footer/StrapiFooter"
import StrapiHeader from "@/components/page-builder/single-types/header/StrapiHeader"
import { ClientProviders } from "@/components/providers/ClientProviders"
import { ServerProviders } from "@/components/providers/ServerProviders"
import TrackingScripts from "@/components/providers/TrackingScripts"
import { Toaster } from "@/components/ui/toaster"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "",
  },
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params

  if (!routing.locales.includes(locale)) {
    notFound()
  }

  const isArabic = locale === "ar"

  // Enable static rendering
  // https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#static-rendering
  setRequestLocale(locale)

  return (
    <html dir={isArabic ? "rtl" : "ltr"} lang={locale} suppressHydrationWarning>
      <head />
      <body className="min-h-screen font-sans antialiased">
        <StrapiPreviewListener />
        <TrackingScripts />
        <ServerProviders params={params}>
          <ClientProviders>
            <div className="bg-destructive relative flex min-h-screen flex-col">
              <ErrorBoundary hideFallback>
                <StrapiHeader locale={locale} />
              </ErrorBoundary>

              <div className="flex-1">
                <div>{children}</div>
              </div>

              <TailwindIndicator />

              <Toaster />

              <ErrorBoundary hideFallback>
                <StrapiFooter locale={locale} />
              </ErrorBoundary>
            </div>
          </ClientProviders>
        </ServerProviders>
      </body>
    </html>
  )
}
