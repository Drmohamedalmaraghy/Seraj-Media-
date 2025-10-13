import { NextRequest } from "next/server"
import { withAuth } from "next-auth/middleware"
import createMiddleware from "next-intl/middleware"

import { routing } from "./lib/navigation"

// https://next-intl-docs.vercel.app/docs/getting-started/app-router
const intlMiddleware = createMiddleware(routing)

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

export default function middleware(req: NextRequest) {
  // Handle HTTPS redirection in production in Heroku servers
  // Comment this block when running locally (using `next start`)

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
  return intlMiddleware(req)
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
    "/((?!_next|_vercel|api|robots.txt|favicon.ico|sitemap|.*\\..*).*)",
  ],
}
