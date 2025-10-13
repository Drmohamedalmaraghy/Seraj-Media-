import React, { useState } from "react"

import "./markerWithInfoWindwo.css"

import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps"

import { CardLocationFilter } from "@/components/page-builder/components/sections/locations-view/LocationsViewMap"
import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"

const MarkerWithInfoWindow = ({
  card,
  contactUsLabel,
  seeDetailsButton,
  open,
  setInfoWindowOpen,
}: any) => {
  const [markerRef, marker] = useAdvancedMarkerRef()

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfoWindowOpen(card.id)}
        position={{ lat: card.latitude, lng: card.longitude }}
      >
        <div className="h-[35px] w-[35px]">
          <StrapiBasicImage
            component={card.mapIcon}
            className="!h-auto !w-full object-cover"
          />
        </div>
      </AdvancedMarker>

      {open === card.id && (
        <InfoWindow
          anchor={marker}
          onCloseClick={() => setInfoWindowOpen(false)}
        >
          <div className="h-auto min-h-[200px] max-w-[400px] sm:min-h-auto">
            <CardLocationFilter
              href={card?.page?.fullPath}
              image={card.photo}
              type={card.type}
              size={`${card?.width}x${card?.height}${card?.sizeFormFactor && ` - ${card?.sizeFormFactor}`}`}
              title={card.fullName}
              contactUsLabel={contactUsLabel}
              seeDetailsButton={seeDetailsButton}
              flexRowStyle
            />
          </div>
        </InfoWindow>
      )}
    </>
  )
}

export default MarkerWithInfoWindow
