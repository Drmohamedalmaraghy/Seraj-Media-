import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/styles"
import { Spinner } from "@/components/elementary/Spinner"

const buttonVariants = cva(
  "inline-flex h-auto self-center cursor-pointer items-center justify-center transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-dark disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-red-75",
        secondary: "bg-white border border-stroke text-dark hover:bg-gray",
        disabled: "bg-gray border border-stroke text-dark/45",
      },
      size: {
        default:
          "min-h-6.5 text-[10px] min-w-fit rounded px-3 font-medium leading-[0%] md:min-h-12.5 md:text-sm md:px-8 md:min-w-47.5 md:rounded-[10px]",
        sm: "min-h-6.5 min-w-fit text-[10px] rounded px-3 font-medium leading-[0%]",
        lg: "min-h-12.5 rounded-[10px] text-sm px-8 min-w-47.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    if (isLoading) {
      props.children = <Spinner className="h-4 w-4 border-2" />
    }

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant: props.disabled ? "disabled" : variant,
            size,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
