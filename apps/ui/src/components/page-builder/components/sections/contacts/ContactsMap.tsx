"use client"

import { useState } from "react"
import { env } from "@/env.mjs"
import { Data } from "@repo/strapi"
import {
  AdvancedMarker,
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps"

import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"

export function ContactsMap({
  initialCenter,
  mapZoom,
  mapPin,
}: {
  readonly initialCenter: { lat: number; lng: number }
  readonly mapZoom: number
  readonly mapPin: Data.Component<"utilities.basic-image"> | undefined | null
}) {
  const [center, setCenter] = useState<{ lat: number; lng: number }>(
    initialCenter
  )

  const handleCameraChange = (ev: MapCameraChangedEvent) => {
    setCenter(ev.detail.center)
  }

  return (
    <APIProvider apiKey={env.NEXT_PUBLIC_MAP_API_KEY}>
      <Map
        center={center}
        onCameraChanged={handleCameraChange}
        defaultZoom={mapZoom}
        gestureHandling="greedy"
        disableDefaultUI
        mapId={env.NEXT_PUBLIC_MAP_ID}
        className="h-full w-full"
      >
        {mapPin ? (
          <AdvancedMarker position={initialCenter}>
            <div className="h-9 w-9">
              <StrapiBasicImage
                component={mapPin}
                className="!h-auto !w-full object-cover"
              />
            </div>
          </AdvancedMarker>
        ) : null}
      </Map>
    </APIProvider>
  )
}

ContactsMap.displayName = "ContactsMap"

export default ContactsMap
