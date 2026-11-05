import {
  buildCatchAllMetadata,
  CatchAllPage,
  type CatchAllProps,
} from "../../[[...rest]]/catch-all"

// Dynamic twin of [locale]/[[...rest]]/page.tsx for pages whose server output
// depends on the query string (blog/news listings: ?page, ?search, ?tags).
// Never linked directly — middleware rewrites those URLs here and redirects
// direct requests for /query-view/* back to the public path.

export const dynamic = "force-dynamic"

export async function generateMetadata(props: CatchAllProps) {
  return buildCatchAllMetadata(await props.params, await props.searchParams)
}

export default async function StrapiQueryViewPage(props: CatchAllProps) {
  return CatchAllPage({
    params: await props.params,
    searchParams: await props.searchParams,
  })
}
