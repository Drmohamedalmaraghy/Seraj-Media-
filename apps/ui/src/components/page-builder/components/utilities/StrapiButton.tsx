import React from "react"
import { Data } from "@repo/strapi"

import { cn } from "@/lib/styles"
import { ArrowIcon } from "@/components/icons/ArrowIcon"
import { StrapiBasicImage } from "@/components/page-builder/components/utilities/StrapiBasicImage"
import StrapiLink from "@/components/page-builder/components/utilities/StrapiLink"
import { Button } from "@/components/ui/button"

export interface StrapiButtonProps {
  readonly component: Data.Component<"utilities.button">
  readonly size?: "default" | "sm" | "lg"
  readonly className?: string
  readonly withIconArrow?: boolean
  readonly iconClassName?: string
}

export function StrapiButton({
  component,
  size = "default",
  withIconArrow,
  className,
  iconClassName,
}: StrapiButtonProps) {
  const strapiIcon = component.icon
  const hasStrapiIcon = strapiIcon?.media != null

  return (
    <Button
      className={className}
      size={size}
      variant={component.variant}
      asChild
    >
      <StrapiLink component={component}>
        {component.label}
        {hasStrapiIcon ? (
          <StrapiBasicImage
            component={strapiIcon}
            forcedSizes={{ width: 16, height: 16 }}
            className={cn(
              "ml-2 h-4 w-4 shrink-0 object-contain",
              iconClassName
            )}
          />
        ) : withIconArrow ? (
          <ArrowIcon
            className={cn(
              "w-0 transition-all duration-300 ease-out group-hover:w-6",
              "ltr:scale-x-100",
              "rtl:-scale-x-100",
              component.variant === "primary" && "text-white",
              component.variant === "secondary" && "text-dark",
              iconClassName
            )}
          />
        ) : null}
      </StrapiLink>
    </Button>
  )
}

StrapiButton.displayName = "StrapiButton"

export default StrapiButton
