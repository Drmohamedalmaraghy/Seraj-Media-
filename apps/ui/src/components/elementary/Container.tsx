import React from "react"

import { cn } from "@/lib/styles"

export const Container = ({
  children,
  className,
  size = "lg",
}: {
  readonly children: React.ReactNode
  readonly className?: string
  readonly size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
}) => {
  return (
    <div
      className={cn(
        "mx-auto flex w-full",
        // (640px)
        size === "sm" && "max-w-160",
        // (768px)
        size === "md" && "max-w-192",
        // (1024px)
        size === "lg" && "max-w-256",
        // (1280px)
        size === "xl" && "max-w-320",
        // (1536px)
        size === "2xl" && "max-w-384",
        // (1792px)
        size === "3xl" && "max-w-448",
        className
      )}
    >
      {children}
    </div>
  )
}
