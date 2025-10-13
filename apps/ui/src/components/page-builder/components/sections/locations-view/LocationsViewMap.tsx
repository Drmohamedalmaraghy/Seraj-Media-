"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { env } from "@/env.mjs"
import { APIProvider, Map } from "@vis.gl/react-google-maps"

import { cn } from "@/lib/styles"
import MarkerWithInfoWindow from "@/components/page-builder/components/sections/locations-view/MarkerWithInfoWindow"
import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"
import StrapiButton from "@/components/page-builder/components/utilities/StrapiButton"

export const CardLocationFilter = ({
  image,
  type,
  size,
  title,
  contactUsLabel,
  className,
  seeDetailsButton,
  href,
  flexRowStyle,
}: any) => {
  const router = useRouter()
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-[8px] bg-white p-3",
        "shadow-[1px_3.5px_12.5px_0_rgba(0,0,0,0.15)] lg:flex-row",
        flexRowStyle ? "flex-row" : "lg:flex-row",
        className
      )}
    >
      <div className="max-h-full flex-1">
        <StrapiBasicImage
          onClick={() => href && router.push(href)}
          component={image}
          className={cn(
            "!h-full max-h-[200px] !w-full cursor-pointer rounded-[10px] object-cover"
          )}
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 md:gap-3">
        <button
          type="button"
          onClick={() => href && router.push(href)}
          className="flex flex-1 cursor-pointer flex-col gap-1 text-start md:gap-3"
        >
          <div className="text-base font-semibold">{title}</div>
          <div className="text-dark-50 text-xs">{size}</div>
          <div className="text-dark-50 text-xs">{type}</div>
        </button>
        <div className="flex flex-1 flex-col gap-1 md:gap-3">
          <div className="flex flex-col gap-4">
            {seeDetailsButton && href ? (
              <StrapiButton
                size="sm"
                className="w-full lg:h-[33px] lg:text-[14px]"
                component={{
                  label: seeDetailsButton.label,
                  id: 1,
                  variant: "secondary",
                  href,
                }}
              />
            ) : null}

            {contactUsLabel ? (
              <StrapiButton
                size="sm"
                className="w-full lg:h-[33px] lg:text-[14px]"
                component={{
                  label: contactUsLabel,
                  id: 1,
                  variant: "primary",
                  href: `#contact-us`,
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export function LocationsViewMap({
  renderCard,
  initialZoom,
  // center,
  // onCameraChange,
  defaultCenter,
  contactUsLabel,
  seeDetailsButton,
}: any) {
  const [infoWindowOpen, setInfoWindowOpen] = useState(null)
  return (
    <APIProvider apiKey={env.NEXT_PUBLIC_MAP_API_KEY}>
      <div
        className={cn(
          "backdrop:[20px] z-150 -mt-125 flex w-full",
          "flex-col-reverse gap-4 rounded-[20px] border-2",
          "border-white/10 p-3 shadow-[1px_3.5px_12.5px_0_rgba(0,0,0,0.15)]",
          "backdrop-blur-[20px] sm:flex-row sm:gap-2 sm:p-6"
        )}
      >
        <div className="flex max-h-fit flex-[45%] flex-col gap-4 overflow-y-auto px-2 sm:max-h-190">
          {renderCard?.length &&
            renderCard?.map((item: any, index: number) => {
              return (
                <CardLocationFilter
                  href={item?.page?.fullPath}
                  key={index}
                  image={item?.photo}
                  type={item?.type}
                  size={`${item?.width}x${item?.height}${item?.sizeFormFactor && ` - ${item?.sizeFormFactor}`}`}
                  title={item?.fullName}
                  contactUsLabel={contactUsLabel}
                  seeDetailsButton={seeDetailsButton}
                />
              )
            })}
        </div>
        <div
          className={cn(
            "relative max-h-[300px] min-h-[300px] flex-[55%] overflow-hidden rounded-[6px]",
            "shadow-[1px_3.5px_12.5px_0_rgba(0,0,0,0.15)] sm:max-h-[600px] sm:min-h-[760px]"
          )}
        >
          <Map
            // center={center}
            // onCameraChanged={onCameraChange}
            //
            defaultCenter={defaultCenter}
            defaultZoom={initialZoom}
            gestureHandling="greedy"
            disableDefaultUI
            mapId={env.NEXT_PUBLIC_MAP_ID}
            className="h-full w-full"
          >
            {renderCard.map((card: any) => (
              <MarkerWithInfoWindow
                key={card.id}
                card={card}
                contactUsLabel={contactUsLabel}
                seeDetailsButton={seeDetailsButton}
                open={infoWindowOpen}
                setInfoWindowOpen={setInfoWindowOpen}
              />
            ))}
          </Map>
        </div>
      </div>
    </APIProvider>
  )
}
