import "server-only"

import { draftMode } from "next/headers"
import { UID } from "@repo/strapi"

import type { AppLocale, CustomFetchOptions } from "@/types/general"

import { PublicStrapiClient } from "@/lib/strapi-api"

// ------ Page fetching functions

// Everything a screen page renders from its location.
const LOCATION_POPULATE = {
  city: {
    populate: {
      region: true,
    },
  },
  photo: {
    populate: {
      media: true,
    },
  },
  multimedia: {
    populate: {
      video: { populate: { uploadedVideo: true } },
      image: {
        populate: {
          media: true,
        },
      },
    },
  },
} as const

export async function fetchPage(
  fullPath: string,
  locale: AppLocale,
  requestInit?: RequestInit,
  options?: CustomFetchOptions
) {
  const dm = await draftMode()

  try {
    return await PublicStrapiClient.fetchOneByFullPath(
      "api::page.page",
      fullPath,
      {
        locale,
        status: dm.isEnabled ? "draft" : "published",
        populate: {
          content: true, // ensures typing is valid on the resulting object
          seo: true,
          author: {
            populate: {
              avatar: {
                populate: {
                  media: true,
                },
              },
              pages: true,
            },
          },
          location: {
            populate: LOCATION_POPULATE,
          },
        },
        middlewarePopulate: ["content", "seo"], // ensures the middleware is triggered and the populate object is replaced
      },
      requestInit,
      options
    )
  } catch (e: any) {
    console.error({
      message: `Error fetching page '${fullPath}' for locale '${locale}'`,
      error: {
        error: e?.message,
        stack: e?.stack,
      },
    })
  }
}

// Default-locale location of a page, matched by the page's documentId (shared
// by all its localizations, unlike fullPath). Used when a localized screen
// page has no localized location linked in Strapi.
export async function fetchDefaultLocaleLocation(pageDocumentId: string) {
  try {
    const response = await PublicStrapiClient.fetchMany(
      "api::location.location",
      {
        filters: { page: { documentId: { $eq: pageDocumentId } } } as any,
        populate: LOCATION_POPULATE,
        pagination: { page: 1, pageSize: 1 },
      }
    )
    return response?.data?.[0] ?? null
  } catch (e: any) {
    console.error({
      message: `Error fetching location for page '${pageDocumentId}'`,
      error: {
        error: e?.message,
        stack: e?.stack,
      },
    })
    return null
  }
}

// Lightweight fetch used by RootLayout to decide whether to render the Main*
// header/footer variants for the current page. The Main* content itself lives
// on the Header/Footer single types — here we only need the flag.
export async function fetchPageLayout(fullPath: string, locale: AppLocale) {
  const dm = await draftMode()

  try {
    return await PublicStrapiClient.fetchOneByFullPath(
      "api::page.page",
      fullPath,
      {
        locale,
        status: dm.isEnabled ? "draft" : "published",
        fields: ["isMainHeaderFooter"],
      }
    )
  } catch (e: any) {
    console.error({
      message: `Error fetching page layout '${fullPath}' for locale '${locale}'`,
      error: { error: e?.message, stack: e?.stack },
    })
  }
}

// Looks up a permanent/temporary redirect record for a legacy path that no
// longer resolves to a page (Strapi auto-creates these when a page's
// fullPath changes, see hierarchyService.ts's CREATE_REDIRECT).
export async function fetchRedirect(source: string) {
  try {
    const response = await PublicStrapiClient.fetchMany(
      "api::redirect.redirect",
      {
        filters: { source: { $eq: source } },
        pagination: { page: 1, pageSize: 1 },
        status: "published",
      },
      { next: { revalidate: 300 } }
    )
    return response?.data?.[0] ?? null
  } catch (e: any) {
    console.error({
      message: `Error fetching redirect for source '${source}'`,
      error: {
        error: e?.message,
        stack: e?.stack,
      },
    })
    return null
  }
}

export async function fetchAllPages(
  uid: Extract<UID.ContentType, "api::page.page"> = "api::page.page",
  locale: AppLocale
) {
  try {
    return await PublicStrapiClient.fetchAll(uid, {
      locale,
      fields: ["fullPath", "locale", "updatedAt", "createdAt", "slug"],
      populate: {
        // Only top-level blocks — enough to tell pages that would 404 apart.
        content: true,
        localizations: { fields: ["fullPath", "locale"] },
      },
      status: "published",
    })
  } catch (e: any) {
    console.error({
      message: `Error fetching all pages for locale '${locale}'`,
      error: {
        error: e?.message,
        stack: e?.stack,
      },
    })
    return { data: [] }
  }
}

// ------ SEO fetching functions

export async function fetchSeo(
  uid: Extract<UID.ContentType, "api::page.page"> = "api::page.page",
  fullPath: string | null,
  locale: AppLocale
) {
  try {
    return await PublicStrapiClient.fetchOneByFullPath(uid, fullPath, {
      locale,
      populate: {
        seo: {
          populate: {
            metaImage: true,
            twitter: { populate: { images: true } },
          },
        },
      },
      fields: ["title"],
    })
  } catch (e: any) {
    console.error({
      message: `Error fetching SEO for '${uid}' with fullPath '${fullPath}' for locale '${locale}'`,
      error: {
        error: e?.message,
        stack: e?.stack,
      },
    })
  }
}

// ------ Navbar fetching functions

// export async function fetchNavbar(locale: AppLocale) {
//   try {
//     return await PublicStrapiClient.fetchOne("api::navbar.navbar", undefined, {
//       locale,
//       populate: {
//         links: true,
//         logoImage: { populate: { image: true, link: true } },
//       },
//     })
//   } catch (e: any) {
//     console.error({
//       message: `Error fetching navbar for locale '${locale}'`,
//       error: {
//         error: e?.message,
//         stack: e?.stack,
//       },
//     })
//   }
// }

// ------ Footer fetching functions

export async function fetchFooter(locale: AppLocale) {
  try {
    return await PublicStrapiClient.fetchOne("api::footer.footer", undefined, {
      locale,
      populate: {
        // sections: { populate: { links: true } },
        // logoImage: { populate: { image: true, link: true } },
        // links: true,
      },
    })
  } catch (e: any) {
    console.error({
      message: `Error fetching footer for locale '${locale}'`,
      error: {
        error: e?.message,
        stack: e?.stack,
      },
    })
  }
}
