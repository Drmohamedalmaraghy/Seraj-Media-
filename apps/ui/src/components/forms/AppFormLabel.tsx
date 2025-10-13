import React from "react"
import { ControllerFieldState } from "react-hook-form"

import { cn } from "@/lib/styles"
import { FormLabel } from "@/components/ui/form"

type Props = {
  readonly label?: React.ReactNode
  readonly fieldState?: ControllerFieldState
  readonly required?: boolean
  readonly className?: string
}

export function AppFormLabel({ label, required, className }: Props) {
  if (label == null) {
    return null
  }

  return (
    <FormLabel
      className={cn("text-sm leading-[normal] font-medium", className)}
    >
      {label}
      {required && <span className="text-primary">*</span>}
    </FormLabel>
  )
}
