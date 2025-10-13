"use client"

import { FC, PropsWithChildren, useEffect, useState } from "react"

import { cn } from "@/lib/styles"
import { Container } from "@/components/elementary/Container"

const HeaderWrapper: FC<PropsWithChildren> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 z-300 w-full",
        "transition-colors duration-300",
        "px-5 md:px-10 lg:px-15",
        scrolled ? "bg-dark" : "bg-dark/40"
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
