import React from "react"

import { cn, DEFAULT_PADDINGS } from "@/lib/styles"

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  readonly backgroundColor?: string
}

export const Section = ({
  children,
  className,
  backgroundColor,
  ...rest
}: SectionProps) => {
  return (
    <section
      style={{ backgroundColor: backgroundColor ? backgroundColor : "" }}
      className={cn("flex", DEFAULT_PADDINGS, className)}
      {...rest}
    >
      {children}
    </section>
  )
}
