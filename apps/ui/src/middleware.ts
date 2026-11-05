import { NextRequest, NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"
import createMiddleware from "next-intl/middleware"

import { routing } from "./lib/navigation"

// https://next-intl-docs.vercel.app/docs/getting-started/app-router
const intlMiddleware = createMiddleware(routing)

// Internal route segment of the dynamic twin of the catch-all page
// (app/[locale]/query-view/[[...rest]]). Everything else is static/ISR.
const QUERY_VIEW_SEGMENT = "query-view"

// Listings whose server-rendered output depends on the query string
// (?page, ?search, ?tags). All their requests are served by the dynamic
// route — also without a query — so client-side filtering and paging stay
// within one route tree and keep component state (e.g. search input focus).
const QUERY_VIEW_PATHS = ["/blog", "/news"]

// Location filters live only in the URL and are handled client-side; the
// static page can't see them, so the noindex they used to get via metadata is
// sent as a header instead.
const LOCATION_FILTER_PARAMS = ["region", "city", "type", "sizes", "tab"]

const LOCALE_PATH_REGEX = new RegExp(
  `^(?:/(${routing.locales.join("|")}))?(/.*)?$`
)

function splitLocale(pathname: string) {
  const match = pathname.match(LOCALE_PATH_REGEX)
  return {
    locale: match?.[1] ?? routing.defaultLocale,
    path: match?.[2] || "/",
  }
}

function isRedirect(response: Response) {
  return response.status >= 300 && response.status < 400
}

// Re-targets the (possibly already rewritten) intl response to the dynamic
// query-view route, keeping the cookies and headers next-intl set.
function routeToQueryView(response: NextResponse, req: NextRequest) {
  if (isRedirect(response)) return response

  const { locale, path } = splitLocale(req.nextUrl.pathname)
  if (!QUERY_VIEW_PATHS.includes(path)) return response

  const target = req.nextUrl.clone()
  target.pathname = `/${locale}/${QUERY_VIEW_SEGMENT}${path}`
  response.headers.delete("x-middleware-next")
  response.headers.set("x-middleware-rewrite", target.toString())
  return response
}

function addLocationFiltersNoindex(response: NextResponse, req: NextRequest) {
  const { path } = splitLocale(req.nextUrl.pathname)
  const hasFilters = LOCATION_FILTER_PARAMS.some((param) =>
    req.nextUrl.searchParams.has(param)
  )
  if (path === "/locations" && hasFilters && !isRedirect(response)) {
    response.headers.set("X-Robots-Tag", "noindex, follow")
  }
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
// slash (except for root), and lowercasing. Returns null if no change needed.
function normalizePath(pathname: string): string | null {
  let normalized = pathname.replace(/\/+/g, "/")
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1)
  }
  normalized = normalized.toLowerCase()
  return normalized === pathname ? null : normalized
}

// Legacy/duplicate homepage paths that should funnel to the canonical homepage.
const HOMEPAGE_DUPLICATES = ["/home", "/index.html", "/index.php"]

// Returns the canonical homepage URL for a duplicate path (with optional locale
// prefix), or null if the path is not a homepage duplicate.
function getHomepageRedirect(pathname: string): string | null {
  for (const locale of routing.locales) {
    for (const dup of HOMEPAGE_DUPLICATES) {
      if (pathname === `/${locale}${dup}`) {
        return locale === routing.defaultLocale ? "/" : `/${locale}`
      }
    }
  }
  if (HOMEPAGE_DUPLICATES.includes(pathname)) {
    return "/"
  }
  return null
}

export default function middleware(req: NextRequest) {
  // 1. www → non-www (301 permanent redirect for SEO canonicalization)
  const host = req.headers.get("host") ?? ""
  if (host.startsWith("www.")) {
    const url = req.nextUrl.clone()
    url.host = host.slice(4)
    return NextResponse.redirect(url, 301)
  }

  // 2. Path normalization: collapse slashes, drop trailing slash, lowercase
  const normalized = normalizePath(req.nextUrl.pathname)
  if (normalized !== null) {
    const url = req.nextUrl.clone()
    url.pathname = normalized
    return NextResponse.redirect(url, 301)
  }

  // 3. Homepage duplicates: /home, /index.html, /index.php → canonical homepage
  const homeRedirect = getHomepageRedirect(req.nextUrl.pathname)
  if (homeRedirect !== null) {
    const url = req.nextUrl.clone()
    url.pathname = homeRedirect
    return NextResponse.redirect(url, 301)
  }

  // 4. Default-locale prefix removal (SEO canonicalization): next-intl's
  // redirect helper never sets a status, so this case defaults to 307 even
  // though it's a fixed mapping. Only fires when the pathname already has an
  // explicit "/en" prefix — never the Accept-Language negotiation redirect
  // for "/".
  if (routing.localePrefix === "as-needed") {
    const defaultPrefix = `/${routing.defaultLocale}`
    if (
      req.nextUrl.pathname === defaultPrefix ||
      req.nextUrl.pathname.startsWith(`${defaultPrefix}/`)
    ) {
      const url = req.nextUrl.clone()
      url.pathname = req.nextUrl.pathname.slice(defaultPrefix.length) || "/"
      return NextResponse.redirect(url, 301)
    }
  }

  // 5. The dynamic twin route is internal — send direct hits to the public URL.
  const { locale: reqLocale, path: reqPath } = splitLocale(
    req.nextUrl.pathname
  )
  if (
    reqPath === `/${QUERY_VIEW_SEGMENT}` ||
    reqPath.startsWith(`/${QUERY_VIEW_SEGMENT}/`)
  ) {
    const url = req.nextUrl.clone()
    const publicPath = reqPath.slice(QUERY_VIEW_SEGMENT.length + 1) || "/"
    url.pathname =
      reqLocale === routing.defaultLocale
        ? publicPath
        : `/${reqLocale}${publicPath === "/" ? "" : publicPath}`
    return NextResponse.redirect(url, 301)
  }

  // Build regex for auth (non-public) pages
  const authPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${authPages.join("|")})/?$`,
    "i"
  )
  const isAuthPage = authPathnameRegex.test(req.nextUrl.pathname)

  // If the request is for a non-public (auth) page, require authentication
  if (isAuthPage) {
    return (authMiddleware as any)(req)
  }

  // All other pages are public
  const response = intlMiddleware(req)
  return addLocationFiltersNoindex(routeToQueryView(response, req), req)
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
  ],
}
