"use client"

import React from "react"
import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/styles"
import { AppFormDescription } from "@/components/forms/AppFormDescription"
import { AppFormLabel } from "@/components/forms/AppFormLabel"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

type Props = {
  readonly name: string
  readonly label?: React.ReactNode
  readonly containerClassName?: string
  readonly fieldClassName?: string
  readonly textAreaWrapperClassName?: string
  readonly description?: React.ReactNode
  readonly placeholder?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">

export function AppTextArea({
  name,
  label,
  containerClassName,
  fieldClassName,
  description,
  textAreaWrapperClassName,
  placeholder,
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
          <AppFormLabel
            fieldState={fieldState}
            label={label}
            required={nativeProps.required}
          />

          <FormControl>
            <div
              className={cn(
                "relative flex items-stretch overflow-hidden",
                textAreaWrapperClassName
              )}
            >
              <Textarea
                {...field}
                placeholder={placeholder}
                value={field.value ?? ""}
                onChange={field.onChange}
                className={cn(
                  "w-full ease-in-out",
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
