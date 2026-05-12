import { env } from "@/env.mjs"

import type { MetadataRoute } from "next"

const baseUrl = env.APP_PUBLIC_URL

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("sitemap.xml", baseUrl).toString(),
  }
}
