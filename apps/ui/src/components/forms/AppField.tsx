"use client"

import React from "react"
import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/styles"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { AppFormDescription } from "./AppFormDescription"
import { AppFormLabel } from "./AppFormLabel"

type Props = {
  readonly name: string
  readonly label?: React.ReactNode
  readonly containerClassName?: string
  readonly fieldClassName?: string
  readonly description?: React.ReactNode
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">

export function AppField({
  name,
  label,
  containerClassName,
  fieldClassName,
  description,
  ...nativeProps
}: Props) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem
          className={cn("relative flex flex-col pb-5", containerClassName)}
        >
          <AppFormLabel label={label} required={nativeProps.required} />

          <FormControl>
            <div className="relative flex items-stretch overflow-hidden">
              <Input
                {...field}
                {...nativeProps}
                value={field.value ?? ""}
                onChange={(event) => {
                  const value = event.target.value
                  if (nativeProps.type === "number") {
                    field.onChange(parseFloat(value))
                  } else {
                    field.onChange(value)
                  }
                }}
                className={cn(
                  "border-gray w-full rounded-[10px] border",
                  {
                    "border-primary": fieldState.invalid,
                  },
                  fieldClassName
                )}
              />
            </div>
          </FormControl>

          <AppFormDescription description={description} />

          <FormMessage className="absolute bottom-0 left-0" />
        </FormItem>
      )}
    />
  )
}
