import { DynamicZoneValue, UID } from "@repo/strapi"

import StrapiArticleColumnContent from "@/components/page-builder/components/sections/article/StrapiArticleColumnContent"
import StrapiArticleContent from "@/components/page-builder/components/sections/article/StrapiArticleContent"
import StrapiArticlesCollection from "@/components/page-builder/components/sections/article/StrapiArticlesCollection"
import StrapiContacts from "@/components/page-builder/components/sections/contacts/StrapiContacts"
import StrapiLocationsView from "@/components/page-builder/components/sections/locations-view/StrapiLocationsView"
import StrapiOnePageHelper from "@/components/page-builder/components/sections/one-page-helper/StrapiOnePageHelper"
import StrapiBanner from "@/components/page-builder/components/sections/StrapiBanner"
import StrapiCarousel from "@/components/page-builder/components/sections/StrapiCarousel"
import StrapiHero from "@/components/page-builder/components/sections/StrapiHero"
import StrapiIdealLocations from "@/components/page-builder/components/sections/StrapiIdealLocations"
import StrapiIndustries from "@/components/page-builder/components/sections/StrapiIndustries"
import StrapiMainLocations from "@/components/page-builder/components/sections/StrapiMainLocations"
import StrapiNews from "@/components/page-builder/components/sections/StrapiNews"
import StrapiSolutions from "@/components/page-builder/components/sections/StrapiSolutions"
import StrapiStatistics from "@/components/page-builder/components/sections/StrapiStatistics"
import StrapiTeam from "@/components/page-builder/components/sections/StrapiTeam"
import StrapiText from "@/components/page-builder/components/sections/StrapiText"
import StrapiTextImage from "@/components/page-builder/components/sections/StrapiTextImage"
import StrapiTimeLine from "@/components/page-builder/components/sections/StrapiTimeLine"

export type Content = DynamicZoneValue<[keyof typeof PageContentComponents]>

export type ContentItem = Content[number]

/**
 * Mapping of Strapi Component UID to React Component
 * TODO: This should map Strapi component uid -> component path to reduce bundle size, however this became an issue with nextjs 15 update
 */

export const PageContentComponents: {
  // [K in UID.Component]?: string // TODO: Next.js 15 has issues with dynamic imports inside pages
  // eslint-disable-next-line no-unused-vars
  [K in UID.Component]?: React.ComponentType<any>
} = {
  // elements, seo-utilities, utilities
  // They are usually rendered or used deep inside other components or handlers
  // Add them here if they can be used on Page content level

  // Sections
  "sections.hero": StrapiHero,
  "sections.carousel": StrapiCarousel,
  "sections.statistics": StrapiStatistics,
  "sections.text-image": StrapiTextImage,
  "sections.main-locations": StrapiMainLocations,
  "sections.time-line": StrapiTimeLine,
  "sections.text": StrapiText,
  "sections.team": StrapiTeam,
  "sections.solutions": StrapiSolutions,
  "sections.news": StrapiNews,
  "sections.industries": StrapiIndustries,
  "sections.ideal-locations": StrapiIdealLocations,
  "sections.banner": StrapiBanner,
  "sections.articles-collection": StrapiArticlesCollection,
  "sections.article-content": StrapiArticleContent,
  "sections.article-column-content": StrapiArticleColumnContent,
  "sections.locations-view": StrapiLocationsView,
  "sections.one-page-helper": StrapiOnePageHelper,
  "sections.contacts": StrapiContacts,
  // Add more components here
}
