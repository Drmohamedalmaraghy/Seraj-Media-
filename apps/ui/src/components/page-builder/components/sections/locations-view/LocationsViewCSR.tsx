"use client"

import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Data } from "@repo/strapi"
import { MapCameraChangedEvent } from "@vis.gl/react-google-maps"
import { createPortal } from "react-dom"

import { cn } from "@/lib/styles"
import { Section } from "@/components/elementary/Section"
import { UpScrollIcon } from "@/components/icons/UpScrollIcon"
import LocationsViewList from "@/components/page-builder/components/sections/locations-view/LocationsViewList"
import { LocationsViewMap } from "@/components/page-builder/components/sections/locations-view/LocationsViewMap"
import { FilterTab } from "@/components/page-builder/components/sections/StrapiHero/StrapiHeroType/constsn"
import FilterHeader from "@/components/page-builder/components/sections/StrapiHero/StrapiHeroType/StrapiHeroMediaCategory/StrapiHeroWithFilter"

interface Props {
  regions: any
  readonly component?: Data.Component<"sections.locations-view">
  readonly locale?: "ar" | "en"
}

const LocationsViewCSR: FC<Props> = ({ regions, component, locale }) => {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || FilterTab.Catalog
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)
  const [renderCard, setRenderCard] = useState<any[]>([])
  const [showScroll, setShowScroll] = useState(false)
  // const [center, setCenter] = useState<{ lat: number; lng: number }>({
  //   lat: component?.initialLatitude || 0,
  //   lng: component?.initialLongitude || 0,
  // })

  // const handleCameraChange = (ev: MapCameraChangedEvent) => {
  //   setCenter(ev.detail.center)
  // }

  // const onCapitalPickCameraChange = useCallback(
  //   ({ lat, lng }: { lat: number; lng: number }) => {
  //     setCenter({ lat, lng })
  //   },
  //   []
  // )

  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const el = document.getElementById("portal-filters-location")
      setPortalRoot(el)

      const handleScroll = () => {
        setShowScroll(window.scrollY > 900)
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  if (!portalRoot) return null

  return (
    <Section
      className={cn(
        "mg:!pt-4 relative mx-auto max-w-362 !pt-4 lg:!pt-4",
        tab === FilterTab.Catalog && "!-mt-125 backdrop-blur-[20px] lg:!-mt-125"
      )}
    >
      {createPortal(
        <FilterHeader
          ref={sectionRef}
          className="z-140 mt-6 w-full"
          regions={regions}
          setCardRender={setRenderCard}
          locale={locale}
          component={component}
          // onCapitalPickCameraChange={onCapitalPickCameraChange}
        />,
        portalRoot
      )}

      {tab === FilterTab.Catalog ? (
        <LocationsViewList
          contactUsLabel={component?.bookButton?.label ?? ""}
          seeDetailsLabel={component?.seeDetailsButton?.label ?? ""}
          renderCard={renderCard}
        />
      ) : (
        <LocationsViewMap
          // onCameraChange={handleCameraChange}
          // center={center}
          defaultCenter={{
            lat: component?.initialLatitude || 0,
            lng: component?.initialLongitude || 0,
          }}
          renderCard={renderCard}
          contactUsLabel={component?.bookButton?.label}
          seeDetailsButton={component?.seeDetailsButton}
          initialZoom={component?.initialZoom}
        />
      )}

      {showScroll &&
        createPortal(
          <button
            type="button"
            onClick={scrollToSection}
            className={cn(
              "fixed right-3 bottom-6 z-[1000] flex cursor-pointer items-center justify-center rounded-full",
              "bg-white p-3 shadow-[1px_3.5px_12.5px_0_rgba(0,0,0,0.15)] transition hover:scale-120"
            )}
          >
            <UpScrollIcon className="h-6 w-6" />
          </button>,
          document.body
        )}
    </Section>
  )
}

export default LocationsViewCSR
