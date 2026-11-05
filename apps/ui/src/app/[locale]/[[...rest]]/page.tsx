import {
  buildCatchAllMetadata,
  CatchAllPage,
  type CatchAllProps,
  generateCatchAllStaticParams,
} from "./catch-all"

// Static/ISR route: pages are rendered once and cached, then regenerated in
// the background as the Strapi fetches revalidate (see BaseStrapiClient).
// It must not read `searchParams` — that would opt every page back into
// per-request rendering. Query-dependent listings go through query-view.

// Same freshness as before: Strapi fetches already revalidate every 60s.
export const revalidate = 60

export const generateStaticParams = generateCatchAllStaticParams

export async function generateMetadata(props: CatchAllProps) {
  return buildCatchAllMetadata(await props.params)
}

export default async function StrapiPage(props: CatchAllProps) {
  return CatchAllPage({ params: await props.params })
}
