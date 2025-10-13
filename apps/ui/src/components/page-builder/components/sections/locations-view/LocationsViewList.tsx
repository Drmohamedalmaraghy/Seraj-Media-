"use client"

import { FC } from "react"

import CardLocation from "@/components/elementary/CardLocation"
import { EmptyDataIcon } from "@/components/icons/EmptyDataIcon"

interface Props {
  renderCard: any
  seeDetailsLabel: string
  contactUsLabel: string
}

const LocationsViewList: FC<Props> = ({
  renderCard,
  seeDetailsLabel,
  contactUsLabel,
}) => {
  if (!renderCard.length)
    return (
      <div className="mx-auto size-[150px]">
        <EmptyDataIcon />
      </div>
    )

  return (
    <div className="grid w-full grid-cols-1 justify-center gap-3 md:grid-cols-3 md:gap-6">
      {renderCard.map((item: any, index: number) => (
        <CardLocation
          contactUsLabel={contactUsLabel}
          key={index}
          imageContainerClassName="lg:!h-72 !h-50 [&>img]:!rounded-none"
          image={item?.photo}
          leftPart={item?.type}
          rightPart={`${item?.width}x${item?.height}${item?.sizeFormFactor && ` - ${item?.sizeFormFactor}`}`}
          title={item?.fullName}
          seeMoreHref={item?.page?.fullPath}
          seeMoreLabel={seeDetailsLabel}
        />
      ))}
    </div>
  )
}

export default LocationsViewList
