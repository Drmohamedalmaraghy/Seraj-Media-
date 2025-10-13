import { FC } from "react"
import Image from "next/image"

import type { Data } from "@repo/strapi"

import { cn } from "@/lib/styles"
import CkEditorSSRRenderer from "@/components/elementary/ck-editor/CkEditorSSRRenderer"
import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"

interface Props {
  image: Data.Component<"utilities.basic-image"> | undefined | null
  title: string
  icon?: Data.Component<"utilities.basic-image"> | undefined | null
  className?: string
  description?: Data.Component<"utilities.ck-editor-content"> | null | undefined
  gridSize?: "one" | "two" | "three" | "four"
  textDescription?: string
}

const CardIndustries: FC<Props> = ({
  image,
  title,
  icon,
  className,
  description,
  gridSize,
  textDescription,
}) => {
  return (
    <div
      className={cn(
        "group bg-stroke relative",
        "col-span-1 cursor-pointer overflow-hidden rounded-[10px]",
        gridSize === "two" && "sm:col-span-2",
        gridSize === "three" && "md:col-span-3",
        gridSize === "four" && "lg:col-span-4",
        className
      )}
    >
      {image ? (
        <StrapiBasicImage
          component={image}
          className={cn(
            "!h-auto !w-full scale-105 object-cover transition-transform",
            "duration-300 group-hover:scale-110"
          )}
        />
      ) : null}

      <div
        className={cn(
          "from-red-75 absolute inset-0 bg-gradient-to-t to-transparent",
          "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        )}
      />

      <div className="absolute bottom-5 left-5 z-10 flex w-[90%] flex-col gap-3 text-white">
        {icon && <StrapiBasicImage component={icon} height={35} width={35} />}
        <div className="text-[20px] font-medium">{title}</div>

        {description && (
          <CkEditorSSRRenderer
            htmlContent={description.content}
            className={cn(
              "max-h-0 overflow-hidden text-[14px] opacity-0 transition-all duration-300",
              "group-hover:max-h-40 group-hover:opacity-100"
            )}
          />
        )}
        {textDescription && (
          <div
            className={cn(
              "max-h-0 overflow-hidden text-[14px] opacity-0 transition-all duration-300",
              "group-hover:max-h-40 group-hover:opacity-100"
            )}
          >
            {textDescription}
          </div>
        )}
      </div>
    </div>
  )
}

export default CardIndustries
