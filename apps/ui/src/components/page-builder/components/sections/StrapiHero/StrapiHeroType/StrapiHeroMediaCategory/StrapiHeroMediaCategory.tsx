"use client"

import { FC, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import CardMedia from "@/components/page-builder/components/sections/StrapiHero/StrapiHeroType/StrapiHeroMediaCategory/CardMedia"
import MapMedia from "@/components/page-builder/components/sections/StrapiHero/StrapiHeroType/StrapiHeroMediaCategory/MapMedia"
import { FilterTab } from "@/components/page-builder/components/sections/StrapiHero/StrapiHeroType/StrapiHeroMediaCategory/StrapiHeroWithFilter"

interface Props {
  dataMedia: { card: any; map: any }
}

const StrapiHeroMediaCategory: FC<Props> = ({ dataMedia }) => {
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    let tab = params.get("tab")

    if (!tab) {
      params.set("tab", FilterTab.Catalog)
      router.push(`${window.location.pathname}?${params.toString()}`)
      tab = FilterTab.Catalog
    }

    setCurrentTab(tab)
  }, [router])

  if (!currentTab) return null

  return currentTab === FilterTab.Catalog ? (
    <CardMedia card={dataMedia.card} />
  ) : (
    <MapMedia data={dataMedia.map} />
  )
}

export default StrapiHeroMediaCategory
