"use client"

import { FC } from "react"
import { useRouter } from "next/navigation"
import { Data } from "@repo/strapi"

import { Link } from "@/lib/navigation"
import { cn } from "@/lib/styles"
import { AuthorIcon } from "@/components/icons/AuthorIcon"
import { BannerIcon } from "@/components/icons/BannerIcon"
import { CalendarIcon } from "@/components/icons/CalendarIcon"
import { SizeIcon } from "@/components/icons/SizeIcon"
import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"
import StrapiButton from "@/components/page-builder/components/utilities/StrapiButton"

interface Props {
  image?: Data.Component<"utilities.basic-image"> | undefined | null
  leftPart: string
  rightPart: string
  title: string
  className?: string
  imageContainerClassName?: string
  subTitle?: string
  isAuthor?: boolean
  contactUsLabel?: string
  seeMoreLabel?: string
  seeMoreHref: string
  styleTitle?: string
}

const CardLocation: FC<Props> = ({
  image,
  leftPart,
  rightPart,
  title,
  className,
  imageContainerClassName,
  contactUsLabel,
  subTitle,
  isAuthor,
  styleTitle,
  seeMoreLabel,
  seeMoreHref,
}) => {
  const router = useRouter()
  return (
    <div
      className={cn(
        "relative flex h-full max-w-full flex-1 flex-col justify-start",
        "overflow-hidden rounded-[10px] bg-white shadow-[1px_3.5px_12.5px_0_rgba(0,0,0,0.15)]",
        className
      )}
    >
      {image ? (
        <div className={cn(imageContainerClassName)}>
          <StrapiBasicImage
            onClick={() => seeMoreHref && router.push(seeMoreHref)}
            component={image}
            className={cn(
              "!h-full !w-full cursor-pointer rounded-[10px] object-cover"
            )}
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-4 p-4">
        <button
          type="button"
          onClick={() => seeMoreHref && router.push(seeMoreHref)}
          className="flex cursor-pointer flex-wrap items-center gap-5"
        >
          <div className="text-dark-50 flex items-center gap-1 text-xs lg:text-base">
            {isAuthor ? <AuthorIcon /> : <BannerIcon />}
            {leftPart}
          </div>
          <div className="text-dark-50 flex items-center gap-1 text-xs lg:text-base">
            {isAuthor ? <CalendarIcon /> : <SizeIcon />}
            {rightPart}
          </div>
        </button>
        <button
          type="button"
          className="w-full cursor-pointer text-start"
          onClick={() => seeMoreHref && router.push(seeMoreHref)}
        >
          <div
            className={cn(
              styleTitle ? styleTitle : "text-xs lg:text-[20px]",
              "font-semibold"
            )}
          >
            {title}
          </div>
          {subTitle && (
            <div className="text-dark-50 text-xs font-medium lg:text-[20px]">
              {subTitle}
            </div>
          )}
        </button>

        {contactUsLabel || seeMoreLabel ? (
          <div className="flex flex-wrap gap-4">
            {seeMoreLabel && seeMoreHref ? (
              <StrapiButton
                className="!h-[33px] flex-1 lg:!h-[40px]"
                component={{
                  label: seeMoreLabel,
                  id: 2,
                  variant: "secondary",
                  href: seeMoreHref,
                }}
              />
            ) : null}

            {contactUsLabel ? (
              <StrapiButton
                className="!h-[33px] flex-1 lg:!h-[40px]"
                component={{
                  label: contactUsLabel,
                  id: 1,
                  variant: "primary",
                  href: `#contact-us`,
                }}
              />
            ) : null}
          </div>
        ) : (
          <Link href={seeMoreHref} className="absolute inset-0 z-10">
            <span className="sr-only">{title}</span>
          </Link>
        )}
      </div>
    </div>
  )
}

export default CardLocation
