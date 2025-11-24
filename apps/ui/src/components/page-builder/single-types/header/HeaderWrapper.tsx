"use client"

import { FC, PropsWithChildren } from "react"

import { cn } from "@/lib/styles"
import { Container } from "@/components/elementary/Container"

const HeaderWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <header
      className={cn(
        "fixed top-0 z-300 w-full",
        "transition-colors duration-300",
        "bg-dark px-5 md:px-10 lg:px-15"
      )}
    >
      <Container
        size="2xl"
        className="flex items-center justify-between py-2.5 text-white"
      >
        {children}
      </Container>
    </header>
  )
}

HeaderWrapper.displayName = "HeaderWrapper"

export default HeaderWrapper
