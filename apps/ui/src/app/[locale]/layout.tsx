import "@/styles/globals.css"

import { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import { setRequestLocale } from "next-intl/server"

import { LayoutProps } from "@/types/next"

import { geist } from "@/lib/fonts"
import { routing } from "@/lib/navigation"
import { ErrorBoundary } from "@/components/elementary/ErrorBoundary"
import StrapiPreviewListener from "@/components/elementary/StrapiPreviewListener"
import { TailwindIndicator } from "@/components/elementary/TailwindIndicator"
import { WhatsAppButton } from "@/components/elementary/WhatsAppButton"
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
    <html
      dir={isArabic ? "rtl" : "ltr"}
      lang={locale}
      className={geist.variable}
      suppressHydrationWarning
    >
      <head>
        {/* Google Tag Manager Code Start*/}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WTSSVK86');
          `}
        </Script>
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

            <WhatsAppButton isArabic={isArabic} />
          </ClientProviders>
        </ServerProviders>
      </body>
    </html>
  )
}
