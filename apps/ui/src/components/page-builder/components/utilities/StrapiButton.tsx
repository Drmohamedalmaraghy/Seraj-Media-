import React from "react"
import { Data } from "@repo/strapi"

import { cn } from "@/lib/styles"
import { ArrowIcon } from "@/components/icons/ArrowIcon"
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
  return (
    <Button
      className={className}
      size={size}
      variant={component.variant}
      asChild
    >
      <StrapiLink component={component}>
        {component.label}
        {withIconArrow && (
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
        )}
      </StrapiLink>
    </Button>
  )
}

StrapiButton.displayName = "StrapiButton"

export default StrapiButton
