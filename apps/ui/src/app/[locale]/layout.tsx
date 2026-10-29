import "@/styles/globals.css"

import { Suspense } from "react"
import { Metadata } from "next"
import { headers } from "next/headers"
import { notFound } from "next/navigation"
import Script from "next/script"
import { ROOT_PAGE_PATH } from "@repo/shared-data"
import { setRequestLocale } from "next-intl/server"

import { LayoutProps } from "@/types/next"

import { geist } from "@/lib/fonts"
import { routing } from "@/lib/navigation"
import { buildOrganizationJsonLd } from "@/lib/seo/organization"
import { fetchPageLayout } from "@/lib/strapi-api/content/server"
import { ErrorBoundary } from "@/components/elementary/ErrorBoundary"
import { NavigationProgress } from "@/components/elementary/NavigationProgress"
import StrapiPreviewListener from "@/components/elementary/StrapiPreviewListener"
import { TailwindIndicator } from "@/components/elementary/TailwindIndicator"
import { WhatsAppButton } from "@/components/elementary/WhatsAppButton"
import StrapiFooter from "@/components/page-builder/single-types/footer/StrapiFooter"
import StrapiHeader from "@/components/page-builder/single-types/header/StrapiHeader"
import StrapiMainFooter from "@/components/page-builder/single-types/main-footer/StrapiMainFooter"
import StrapiMainHeader from "@/components/page-builder/single-types/main-header/StrapiMainHeader"
import { ClientProviders } from "@/components/providers/ClientProviders"
import { ServerProviders } from "@/components/providers/ServerProviders"
import TrackingScripts from "@/components/providers/TrackingScripts"
import { Toaster } from "@/components/ui/toaster"

function stripLocalePrefix(pathname: string, locale: string): string {
  if (pathname === `/${locale}`) return "/"
  if (pathname.startsWith(`/${locale}/`))
    return pathname.slice(locale.length + 1)
  return pathname
}

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

  const requestHeaders = await headers()
  const pathname = requestHeaders.get("x-pathname") ?? "/"
  const pathWithoutLocale = stripLocalePrefix(pathname, locale)
  const fullPath =
    ROOT_PAGE_PATH + (pathWithoutLocale.replace(/^\/+/, "") ?? "")

  const layoutResponse = await fetchPageLayout(fullPath, locale)
  const layoutData = layoutResponse?.data
  const useMain = Boolean(layoutData?.isMainHeaderFooter)

  return (
    <html
      dir={isArabic ? "rtl" : "ltr"}
      lang={locale}
      className={geist.variable}
      suppressHydrationWarning
    >
      <head>
        {/* Google Tag Manager Code Start*/}
        {/* Inline script (not next/script) so the snippet renders inside <head>
            in the server HTML — required for Search Console GTM verification. */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          id="gtm-script"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WTSSVK86');`,
          }}
        />
        {/* Google Tag Manager Code End*/}
        {/* ContentSquare Code Start*/}
        <Script
          id="contentsquare"
          src="https://t.contentsquare.net/uxa/9319dbb4e86f6.js"
          strategy="afterInteractive"
        />
        {/* ContentSquare Code End*/}
      </head>
      <body className="min-h-screen font-sans antialiased">
        <script
          id="organizationJsonLd"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildOrganizationJsonLd()),
          }}
        />

        {/* Google Tag Manager noscript Start*/}
        <noscript>
          <iframe
            title="gtm-no-script"
            src="https://www.googletagmanager.com/ns.html?id=GTM-WTSSVK86"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Google Tag Manager noscript End*/}

        <TrackingScripts />
        <ServerProviders params={params}>
          <StrapiPreviewListener />
          {/* Own Suspense boundary for useSearchParams — it must not wrap the
              page, or 404s would be sent with a 200 status. */}
          <Suspense fallback={null}>
            <NavigationProgress />
          </Suspense>
          <ClientProviders>
            <div className="bg-destructive relative flex min-h-screen flex-col">
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
                <div>{children}</div>
              </div>

              <TailwindIndicator />

              <Toaster />

              {useMain ? (
                <ErrorBoundary hideFallback>
                  <StrapiMainFooter locale={locale} />
                </ErrorBoundary>
              ) : (
                <ErrorBoundary hideFallback>
                  <StrapiFooter locale={locale} />
                </ErrorBoundary>
              )}
            </div>

            <WhatsAppButton isArabic={isArabic} />
          </ClientProviders>
        </ServerProviders>
      </body>
    </html>
  )
}
