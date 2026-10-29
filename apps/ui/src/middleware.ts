import { NextRequest, NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"
import createMiddleware from "next-intl/middleware"

import { routing } from "./lib/navigation"

// https://next-intl-docs.vercel.app/docs/getting-started/app-router
const intlMiddleware = createMiddleware(routing)

// Exposes the current pathname to server components via request headers so
// RootLayout can decide whether to render the classic StrapiHeader/Footer or
// the Main* variants based on the matching Page's `isMainHeaderFooter` flag.
function attachPathname(response: NextResponse, pathname: string) {
  response.headers.set("x-middleware-override-headers", "x-pathname")
  response.headers.set("x-middleware-request-x-pathname", pathname)
  return response
}

// List all pages that require authentication (non-public)
const authPages = ["/auth/change-password", "/auth/signout"]

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  (req) => intlMiddleware(req),
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
)

// Normalizes a pathname by collapsing duplicate slashes, dropping the trailing
// slash (except for root), and lowercasing. Percent-escapes stay uppercase
// (the form Next/URL emit), so encoded Arabic paths aren't redirected.
function normalizePath(pathname: string): string {
  let normalized = pathname.replace(/\/+/g, "/")
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1)
  }
  return normalized
    .toLowerCase()
    .replace(/%[0-9a-f]{2}/g, (escape) => escape.toUpperCase())
}

// next-intl's default locale cookie name.
const LOCALE_COOKIE = "NEXT_LOCALE"

// Legacy/duplicate homepage paths that should funnel to the canonical homepage.
const HOMEPAGE_DUPLICATES = ["/home", "/index.html", "/index.php"]

// Applies every canonicalization rule in one pass, so a URL that needs several
// fixes (e.g. "/en/Home") redirects in a single 301 hop instead of a chain.
function getCanonicalPathname(pathname: string): string {
  let path = normalizePath(pathname)
  let localePrefix = ""

  for (const locale of routing.locales) {
    if (path === `/${locale}` || path.startsWith(`/${locale}/`)) {
      // With "as-needed" prefixes the default locale is served without one.
      // next-intl would redirect "/en/..." itself, but always with a 307.
      const keepPrefix =
        locale !== routing.defaultLocale || routing.localePrefix !== "as-needed"
      localePrefix = keepPrefix ? `/${locale}` : ""
      path = path.slice(locale.length + 1) || "/"
      break
    }
  }

  if (HOMEPAGE_DUPLICATES.includes(path)) {
    path = "/"
  }

  if (!localePrefix) {
    return path
  }
  return path === "/" ? localePrefix : `${localePrefix}${path}`
}

export default function middleware(req: NextRequest) {
  // SEO canonicalization (301): www → non-www, path normalization, homepage
  // duplicates and default-locale prefix removal.
  const host = req.headers.get("host") ?? ""
  const url = new URL(req.url)
  const canonicalPathname = getCanonicalPathname(url.pathname)
  if (host.startsWith("www.") || canonicalPathname !== url.pathname) {
    if (host.startsWith("www.")) {
      url.host = host.slice(4)
    }
    const hadDefaultLocalePrefix = new RegExp(
      `^/${routing.defaultLocale}(/|$)`,
      "i"
    ).test(url.pathname)
    url.pathname = canonicalPathname
    const response = NextResponse.redirect(url, 301)

    // The locale switchers navigate to "/en/..." so next-intl can store the
    // new locale in its cookie. This redirect answers before next-intl runs,
    // so set the cookie here — otherwise next-intl sends the user back to
    // "/ar/..." based on the old cookie. no-store keeps the browser from
    // replaying the cached 301 without the cookie.
    if (hadDefaultLocalePrefix) {
      response.cookies.set(LOCALE_COOKIE, routing.defaultLocale, {
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
      })
      response.headers.set("Cache-Control", "no-store")
    }

    return response
  }

  // Build regex for auth (non-public) pages
  const authPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${authPages.join("|")})/?$`,
    "i"
  )
  const isAuthPage = authPathnameRegex.test(req.nextUrl.pathname)

  // If the request is for a non-public (auth) page, require authentication
  if (isAuthPage) {
    return attachPathname((authMiddleware as any)(req), req.nextUrl.pathname)
  }

  // All other pages are public
  return attachPathname(intlMiddleware(req), req.nextUrl.pathname)
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    `/(ar|en)/:path*`,

    // Skip all paths that should not be internationalized
    "/((?!_next|_vercel|api|robots.txt|favicon.png|sitemap|.*\\..*).*)",

    // Homepage duplicates with a file extension, excluded by the rule above.
    "/index.html",
    "/index.php",
  ],
}
